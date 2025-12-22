const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const CONFIG = {
    contentDir: path.join(__dirname, '../content'),
    templatesDir: path.join(__dirname, '../templates'),
    publicDir: path.join(__dirname, '../'), // Build to Root
    assetsDir: path.join(__dirname, '../assets'),
    siteTitle: 'ashmod.dev',
    domain: 'https://www.ashmod.dev'
};

function escapeXml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}

function wrapCdata(value) {
    const safe = String(value ?? '').replaceAll(']]>', ']]]]><![CDATA[>');
    return `<![CDATA[${safe}]]>`;
}

function formatDate(date) {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
}

async function loadJsonArrayIfExists(filePath) {
    const exists = await fs.pathExists(filePath);
    if (!exists) return [];

    const raw = await fs.readFile(filePath, 'utf-8');
    let data;
    try {
        data = JSON.parse(raw);
    } catch (err) {
        throw new Error(`Failed to parse JSON: ${filePath}\n${err.message}`);
    }

    if (!Array.isArray(data)) {
        throw new Error(`Expected a JSON array in: ${filePath}`);
    }

    return data;
}

function generateProjectListHtml(projects) {
    const getCategory = (p) => String(p?.category ?? '').toUpperCase();
    const toYearNumber = (p) => {
        const value = Number(p?.year);
        return Number.isFinite(value) ? value : 0;
    };
    const toTitle = (p) => String(p?.title ?? '');
    const getOssIndex = (p) => (Number.isInteger(p?.oss_index) ? p.oss_index : null);

    const compareYearDescThenTitle = (a, b) => {
        const diff = toYearNumber(b) - toYearNumber(a);
        if (diff !== 0) return diff;
        return toTitle(a).localeCompare(toTitle(b));
    };

    const compareOpenSourceOrder = (a, b) => {
        const aIndex = getOssIndex(a);
        const bIndex = getOssIndex(b);
        if (aIndex !== null || bIndex !== null) {
            if (aIndex === null) return 1;
            if (bIndex === null) return -1;
            return aIndex - bIndex;
        }
        return compareYearDescThenTitle(a, b);
    };

    const isAcademic = (p) => getCategory(p) === 'ACADEMIC';

    const groups = {
        'OPEN SOURCE': projects
            .filter(p => getCategory(p) === 'OPEN SOURCE')
            .sort(compareOpenSourceOrder),
        'PROJECTS': projects
            .filter(p => !['OPEN SOURCE', 'MISC'].includes(getCategory(p)))
            .sort((a, b) => {
                const aAcademic = isAcademic(a);
                const bAcademic = isAcademic(b);
                if (aAcademic !== bAcademic) return aAcademic ? 1 : -1; // Academic projects at bottom
                return compareYearDescThenTitle(a, b);
            }),
        'MISC': projects
            .filter(p => getCategory(p) === 'MISC')
            .sort(compareYearDescThenTitle),
    };

    let html = '<div class="project-list-container">';

    for (const [groupName, groupProjects] of Object.entries(groups)) {
        if (groupProjects.length === 0) continue;

        html += `<h2 class="project-group-title">${groupName}</h2>`;
        html += `<div class="project-list" data-group="${groupName}">`;

        groupProjects.forEach(p => {
            const isOpenSourceGroup = groupName === 'OPEN SOURCE';
            const isMiscGroup = groupName === 'MISC';
            const titleHtml = p.link
                ? `<a href="${p.link}" target="_blank" class="project-title-link">${p.title}</a>`
                : `<span class="project-title-static">${p.title}</span>`;

            const categoryLabel = getCategory(p);
            const category = categoryLabel ? `<span class="project-category">[${categoryLabel}]</span>` : '';

            let logoHtml = '';
            if (groupName === 'OPEN SOURCE' && p.org_logo) {
                const logoPath = p.org_logo.startsWith('/') ? '..' + p.org_logo : '../' + p.org_logo;
                logoHtml = `<img src="${logoPath}" alt="${p.title} logo" class="project-org-logo">`;
            }

            const description = String(p.description ?? '').trim();
            const descriptionHtml = description ? `<span class="project-desc">${description}</span>` : '';

            const hideMeta = isOpenSourceGroup || isMiscGroup;
            const yearHtml = hideMeta ? '' : `<span class="project-year">${p.year || '----'}</span>`;
            const categoryHtml = hideMeta ? '' : category;
            const rowClass = isOpenSourceGroup
                ? 'project-row project-row-oss'
                : isMiscGroup
                    ? 'project-row project-row-misc'
                    : 'project-row';

            html += `
            <div class="${rowClass}">
                ${yearHtml}
                <div class="project-info">
                    <div class="project-title-row">
                        ${logoHtml}
                        ${titleHtml}
                    </div>
                    ${descriptionHtml}
                </div>
                ${categoryHtml}
            </div>`;
        });
        html += '</div>';
    }

    html += '</div>';
    return html;
}

function generateBlogListHtml(posts) {
    let html = `
    <div class="blog-actions">
        <a href="../rss.xml" class="rss-link" aria-label="RSS feed">
            <i class="fas fa-rss" aria-hidden="true"></i>
        </a>
    </div>
    <div class="blog-list">`;

    posts.forEach(p => {
        html += `
        <div class="blog-row">
            <span class="blog-date">${formatDate(p.date)}</span>
            <a href="/blog/${p.slug}" class="blog-title">${p.title}</a>
        </div>`;
    });

    html += '</div>';
    return html;
}

function generateRssXml(posts) {
    const siteTitle = CONFIG.siteTitle;
    const feedUrl = `${CONFIG.domain}/rss.xml`;
    const siteUrl = `${CONFIG.domain}/blog`;
    const lastBuildDate = new Date().toUTCString();

    const items = posts.map(post => {
        const postUrl = `${CONFIG.domain}/blog/${post.slug}`;
        const pubDate = post.date ? new Date(post.date).toUTCString() : lastBuildDate;
        const description = wrapCdata(post.description || '');
        const contentHtml = wrapCdata(marked.parse(post.content || ''));
        const categories = Array.isArray(post.tags) ? post.tags : [];

        return `
    <item>
        <title>${escapeXml(post.title || '')}</title>
        <link>${escapeXml(postUrl)}</link>
        <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
        <pubDate>${escapeXml(pubDate)}</pubDate>
        <description>${description}</description>
        <content:encoded>${contentHtml}</content:encoded>
        ${categories.map(t => `<category>${escapeXml(t)}</category>`).join('\n        ')}
    </item>`;
    }).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>${escapeXml(siteTitle)}</title>
        <link>${escapeXml(siteUrl)}</link>
        <description>${escapeXml('Blog posts from ashmod.dev')}</description>
        <language>en</language>
        <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
        <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
        ${items}
    </channel>
</rss>
`;
}

async function build() {
    console.log('🚧 Starting build...');


    await fs.ensureDir(path.join(CONFIG.publicDir, 'blog'));

    const templates = {
        default: await fs.readFile(path.join(CONFIG.templatesDir, 'layout-default.html'), 'utf-8'),
        home: await fs.readFile(path.join(CONFIG.templatesDir, 'layout-home.html'), 'utf-8'),
    };

    const blogFiles = await fs.glob(path.join(CONFIG.contentDir, 'blog/*.md'));
    const posts = [];
    for (const file of blogFiles) {
        const raw = await fs.readFile(file, 'utf-8');
        const { data, content } = matter(raw);
        posts.push({
            ...data,
            content,
            slug: path.basename(file, '.md')
        });
    }
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const projectFiles = await fs.glob(path.join(CONFIG.contentDir, 'projects/*.md'));
    const projects = [];
    for (const file of projectFiles) {
        const raw = await fs.readFile(file, 'utf-8');
        const { data, content } = matter(raw);
        projects.push({
            ...data,
            content,
            slug: path.basename(file, '.md')
        });
    }
    const openSourceContributionsPath = path.join(CONFIG.contentDir, 'projects/open-source.json');
    const openSourceContributions = await loadJsonArrayIfExists(openSourceContributionsPath);
    for (const [oss_index, entry] of openSourceContributions.entries()) {
        projects.push({
            ...entry,
            category: entry.category || 'OPEN SOURCE',
            oss_index,
        });
    }

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const prevPost = i > 0 ? posts[i - 1] : null;
        const nextPost = i < posts.length - 1 ? posts[i + 1] : null;

        const htmlContent = marked.parse(post.content);
        let template = templates.default;

        // Relative Root for Blog Posts (they are in /blog/slug/, so root is ../..)
        const rootPath = '../..';

        const ogImage = post.image ? `${rootPath}/${post.image}` : `${rootPath}/assets/images/banner.png`;
        const rssFeedLink = `<link rel="alternate" type="application/rss+xml" title="${CONFIG.siteTitle} RSS" href="${rootPath}/rss.xml">`;

        let postNavHtml = '<nav class="post-nav">';
        postNavHtml += `<a href="../" class="post-nav-back"><i class="fas fa-arrow-left"></i> All Posts</a>`;
        postNavHtml += '<div class="post-nav-links">';
        if (nextPost) {
            postNavHtml += `<a href="../${nextPost.slug}" class="post-nav-link post-nav-prev"><i class="fas fa-chevron-left"></i> ${nextPost.title}</a>`;
        } else {
            postNavHtml += '<span class="post-nav-link post-nav-disabled"></span>';
        }
        if (prevPost) {
            postNavHtml += `<a href="../${prevPost.slug}" class="post-nav-link post-nav-next">${prevPost.title} <i class="fas fa-chevron-right"></i></a>`;
        } else {
            postNavHtml += '<span class="post-nav-link post-nav-disabled"></span>';
        }
        postNavHtml += '</div></nav>';

        const giscusHtml = `
                    <section class="post-comments">
                        <div class="giscus"></div>
                        <script>
                            (function() {
                                const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
                                const script = document.createElement('script');
                                script.src = 'https://giscus.app/client.js';
                                script.setAttribute('data-repo', 'ashmod/ashmod.github.io');
                                script.setAttribute('data-repo-id', 'R_kgDOJXyyjg');
                                script.setAttribute('data-category', 'Announcements');
                                script.setAttribute('data-category-id', 'DIC_kwDOJXyyjs4C0JOP');
                                script.setAttribute('data-mapping', 'pathname');
                                script.setAttribute('data-strict', '0');
                                script.setAttribute('data-reactions-enabled', '1');
                                script.setAttribute('data-emit-metadata', '0');
                                script.setAttribute('data-input-position', 'bottom');
                                script.setAttribute('data-theme', theme);
                                script.setAttribute('data-lang', 'en');
                                script.crossOrigin = 'anonymous';
                                script.async = true;
                                document.querySelector('.giscus').appendChild(script);

                                // Sync theme on toggle
                                new MutationObserver(function() {
                                    const iframe = document.querySelector('iframe.giscus-frame');
                                    if (iframe) {
                                        const newTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
                                        iframe.contentWindow.postMessage(
                                            { giscus: { setConfig: { theme: newTheme } } },
                                            'https://giscus.app'
                                        );
                                    }
                                }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
                            })();
                        </script>
                    </section>`;

        let finalHtml = template
            .replaceAll('{{TITLE}}', `${post.title} | ${CONFIG.siteTitle}`)
            .replaceAll('{{DESCRIPTION}}', post.description || '')
            .replaceAll('{{CANONICAL}}', `${CONFIG.domain}/blog/${post.slug}`)
            .replaceAll('{{OG_IMAGE}}', ogImage)
            .replace('{{RSS_FEED_LINK}}', rssFeedLink)
            .replaceAll('{{ROOT}}', rootPath)
            .replace('{{CONTENT}}', `
                <article class="blog-post">
                    <header class="post-header">
                        <h1>${post.title}</h1>
                        <div class="post-meta">
                            <time>${formatDate(post.date)}</time>
                            <a href="${rootPath}/rss.xml" class="rss-link" aria-label="RSS feed">
                                <i class="fas fa-rss" aria-hidden="true"></i>
                            </a>
                        </div>
                    </header>
                    <div class="post-content">
                        ${htmlContent}
                    </div>
                    ${giscusHtml}
                    ${postNavHtml}
                </article>
            `);

        await fs.outputFile(path.join(CONFIG.publicDir, `blog/${post.slug}/index.html`), finalHtml);
    }
    console.log(`✅ Generated ${posts.length} blog posts.`);

    const rss = generateRssXml(posts);
    await fs.outputFile(path.join(CONFIG.publicDir, 'rss.xml'), rss);
    console.log('✅ Generated rss.xml');

    const pageFiles = await fs.glob(path.join(CONFIG.contentDir, 'pages/*.md'));

    for (const file of pageFiles) {
        const raw = await fs.readFile(file, 'utf-8');
        const { data, content } = matter(raw);
        const slug = path.basename(file, '.md');

        let htmlContent = marked.parse(content);
        let layout = data.layout || 'default';
        let template = (layout === 'home') ? templates.home : templates.default;

        const isHome = slug === 'home';
        const rootPath = isHome ? '.' : '..';
        const rssFeedLink = (layout === 'blog-index')
            ? `<link rel="alternate" type="application/rss+xml" title="${CONFIG.siteTitle} RSS" href="${rootPath}/rss.xml">`
            : '';

        if (layout === 'projects-index') {
            htmlContent += generateProjectListHtml(projects);
        } else if (layout === 'blog-index') {
            htmlContent += generateBlogListHtml(posts);
        }

        const outPath = isHome ? 'index.html' : `${slug}/index.html`;
        const canonicalPath = isHome ? '' : slug;
        const pageTitle = isHome ? CONFIG.siteTitle : `${data.title} | ${CONFIG.siteTitle}`;

        let finalHtml = template
            .replaceAll('{{TITLE}}', pageTitle)
            .replaceAll('{{DESCRIPTION}}', data.description || '')
            .replaceAll('{{CANONICAL}}', `${CONFIG.domain}/${canonicalPath}`)
            .replaceAll('{{OG_IMAGE}}', `${rootPath}/assets/images/banner.png`)
            .replace('{{RSS_FEED_LINK}}', rssFeedLink)
            .replaceAll('{{ROOT}}', rootPath)
            .replace('{{CONTENT}}', htmlContent);

        await fs.outputFile(path.join(CONFIG.publicDir, outPath), finalHtml);
    }
    console.log(`✅ Generated ${pageFiles.length} pages.`);

    const urls = [
        ...pageFiles.map(f => {
            const s = path.basename(f, '.md');
            return (s === 'home') ? '' : s;
        }),
        'rss.xml',
        ...posts.map(p => `blog/${p.slug}`)
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(url => `
    <url>
        <loc>${CONFIG.domain}/${url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    </url>`).join('')}
</urlset>`;

    await fs.outputFile(path.join(CONFIG.publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Generated sitemap.xml');

    console.log('🎉 Build complete!');
}

build().catch(err => {
    console.error('❌ Build failed:', err);
    process.exit(1);
});
