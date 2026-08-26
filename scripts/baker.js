const fs = require("fs-extra");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const CONFIG = {
    contentDir: path.join(__dirname, "../content"),
    templatesDir: path.join(__dirname, "../templates"),
    publicDir: path.join(__dirname, "../"), // Build to Root
    assetsDir: path.join(__dirname, "../assets"),
    siteTitle: "ashmod.dev",
    domain: "https://www.ashmod.dev",
};

function escapeXml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

function serializeJsonForHtml(value) {
    return JSON.stringify(value)
        .replaceAll("&", "\\u0026")
        .replaceAll("<", "\\u003c")
        .replaceAll(">", "\\u003e")
        .replaceAll("\u2028", "\\u2028")
        .replaceAll("\u2029", "\\u2029");
}

function wrapCdata(value) {
    const safe = String(value ?? "").replaceAll("]]>", "]]]]><![CDATA[>");
    return `<![CDATA[${safe}]]>`;
}

function formatDate(date) {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
}

async function loadJsonArrayIfExists(filePath) {
    const exists = await fs.pathExists(filePath);
    if (!exists) return [];

    const raw = await fs.readFile(filePath, "utf-8");
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

function generateWorkListHtml(projects, rootPath = "..") {
    const getCategory = (p) => String(p?.category ?? "").toUpperCase();
    const toYearNumber = (p) => {
        const value = Number(p?.year);
        return Number.isFinite(value) ? value : 0;
    };
    const toTitle = (p) => String(p?.title ?? "");
    const getOssIndex = (p) =>
        Number.isInteger(p?.oss_index) ? p.oss_index : null;

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

    const isAcademic = (p) => getCategory(p) === "ACADEMIC";

    const groups = {
        "OPEN SOURCE": projects
            .filter((p) => getCategory(p) === "OPEN SOURCE")
            .sort(compareOpenSourceOrder),
        PROJECTS: projects
            .filter((p) => !["OPEN SOURCE", "MISC"].includes(getCategory(p)))
            .sort((a, b) => {
                const aAcademic = isAcademic(a);
                const bAcademic = isAcademic(b);
                if (aAcademic !== bAcademic) return aAcademic ? 1 : -1;
                return compareYearDescThenTitle(a, b);
            }),
        MISC: projects
            .filter((p) => getCategory(p) === "MISC")
            .sort(compareYearDescThenTitle),
    };

    const ITEMS_PER_PAGE = 8;
    const projectsCount = groups.PROJECTS.length;
    const totalPages = Math.ceil(projectsCount / ITEMS_PER_PAGE);

    let html = '<div class="project-list-container">';

    const generateRow = (p, groupName, index = null) => {
        const isOpenSourceGroup = groupName === "OPEN SOURCE";
        const isMiscGroup = groupName === "MISC";
        const titleHtml = p.link
            ? `<a href="${p.link}" target="_blank" class="project-title-link">${p.title}</a>`
            : `<span class="project-title-static">${p.title}</span>`;

        let logoHtml = "";
        if (groupName === "OPEN SOURCE" && p.org_logo) {
            const logoPath = p.org_logo.startsWith("/")
                ? rootPath + p.org_logo
                : rootPath + "/" + p.org_logo;
            logoHtml = `<img src="${logoPath}" alt="${p.title} logo" class="project-org-logo">`;
        }

        const description = String(p.description ?? "").trim();
        const descriptionHtml = description
            ? `<span class="project-desc">${description}</span>`
            : "";

        const tagsHtml = Array.isArray(p.tags) && p.tags.length > 0
            ? `<div class="project-tags">${p.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}</div>`
            : "";

        const hideMeta = isOpenSourceGroup || isMiscGroup;
        const yearHtml = hideMeta
            ? ""
            : `<span class="project-year">${p.year || "----"}</span>`;
        const rowClass = isOpenSourceGroup
            ? "project-row project-row-oss"
            : isMiscGroup
              ? "project-row project-row-misc"
              : "project-row";

        const dataIndex = index !== null ? ` data-index="${index}"` : "";

        return `
            <div class="${rowClass}"${dataIndex}>
                ${yearHtml}
                <div class="project-info">
                    <div class="project-title-row">
                        ${logoHtml}
                        ${titleHtml}
                    </div>
                    ${descriptionHtml}
                    ${tagsHtml}
                </div>
            </div>`;
    };

    if (groups["OPEN SOURCE"].length > 0) {
        html += `<h2 class="project-group-title">OPEN SOURCE</h2>`;
        html += `<div class="project-list" data-group="OPEN SOURCE">`;
        groups["OPEN SOURCE"].forEach((p) => {
            html += generateRow(p, "OPEN SOURCE");
        });
        html += "</div>";
    }

    if (groups.PROJECTS.length > 0) {
        html += `<h2 class="project-group-title">PROJECTS</h2>`;
        html += `<div class="project-list" data-group="PROJECTS" data-page="1" data-total-pages="${totalPages}" data-items-per-page="${ITEMS_PER_PAGE}">`;
        groups.PROJECTS.forEach((p, index) => {
            html += generateRow(p, "PROJECTS", index);
        });
        html += "</div>";
        if (totalPages > 1) {
            html += `<div class="projects-pagination">`;
            html += `<button class="pagination-btn pagination-prev" disabled>&lt;&lt;</button>`;
            html += `<span class="pagination-info"><span class="pagination-current">1</span> / ${totalPages}</span>`;
            html += `<button class="pagination-btn pagination-next">&gt;&gt;</button>`;
            html += `</div>`;
        }
    }

    if (groups.MISC.length > 0) {
        html += `<h2 class="project-group-title">MISC</h2>`;
        html += `<div class="project-list" data-group="MISC">`;
        groups.MISC.forEach((p) => {
            html += generateRow(p, "MISC");
        });
        html += "</div>";
    }

    html += "</div>";

    if (totalPages > 1) {
        html += `
<script>
(function() {
    const container = document.querySelector('.project-list[data-group="PROJECTS"]');
    if (!container) return;

    const itemsPerPage = parseInt(container.dataset.itemsPerPage, 10);
    const totalPages = parseInt(container.dataset.totalPages, 10);
    const items = container.querySelectorAll('.project-row[data-index]');
    const prevBtn = document.querySelector('.projects-pagination .pagination-prev');
    const nextBtn = document.querySelector('.projects-pagination .pagination-next');
    const currentSpan = document.querySelector('.projects-pagination .pagination-current');

    let currentPage = 1;

    function showPage(page) {
        currentPage = page;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        items.forEach((item, index) => {
            item.style.display = (index >= start && index < end) ? '' : 'none';
        });

        currentSpan.textContent = page;
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) showPage(currentPage - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) showPage(currentPage + 1);
    });

    showPage(1);
})();
<\/script>`;
    }

    return html;
}

function generateShelfHtml(now, latestPost, quotes = []) {
    if (!now) return "";

    const reading = now.reading || {};
    const playing = now.playing || {};
    const pokemon =
        typeof now.pokemon === "string"
            ? { title: now.pokemon }
            : now.pokemon || {};
    const wrote = latestPost
        ? { title: latestPost.title, url: `blog/${latestPost.slug}` }
        : { title: "" };
    const closeButton =
        '<button type="button" class="shelf-caption-close" aria-label="Close shelf details">&times;</button>';

    const caption = (slug, label, item, sub) => {
        const subHtml = sub
            ? ` <span class="caption-sub">${escapeXml(sub)}</span>`
            : "";
        const valueInner = `${escapeXml(item.title || "")}${subHtml}`;
        const external = /^https?:/.test(item.url || "");
        const valueHtml = item.url
            ? `<a class="caption-value" href="${escapeXml(item.url)}"${external ? ' target="_blank" rel="noopener"' : ""}>${valueInner}</a>`
            : `<span class="caption-value">${valueInner}</span>`;
        return `<div class="shelf-caption" id="shelf-caption-${slug}" hidden>${closeButton}<span class="caption-key">${escapeXml(label)}</span>${valueHtml}</div>`;
    };

    const object = (slug, ariaLabel, inner) =>
        `<button class="shelf-group" data-shelf="${slug}" aria-expanded="false" aria-controls="shelf-caption-${slug}" aria-label="${escapeXml(ariaLabel)}">${inner}</button>`;

    const invalidQuoteIndex = quotes.findIndex(
        (quote) =>
            !quote ||
            typeof quote.text !== "string" ||
            !quote.text.trim() ||
            typeof quote.source !== "string" ||
            !/^https?:\/\//.test(quote.source),
    );
    if (invalidQuoteIndex !== -1) {
        throw new Error(
            `Quote ${invalidQuoteIndex + 1} must have text and an HTTP(S) source`,
        );
    }
    const quoteBank = quotes;
    const dicePips = Array.from(
        { length: 9 },
        () => '<span class="dice-pip"></span>',
    ).join("");
    const quoteObject = quoteBank.length
        ? object(
              "quote",
              "Roll for a programming quote",
              `<span class="dice" data-face="5" aria-hidden="true">${dicePips}</span>`,
          )
        : "";
    const quoteCaption = quoteBank.length
        ? `<div class="shelf-caption quote-caption" id="shelf-caption-quote" hidden>${closeButton}<span class="caption-key">random access</span><span class="caption-value" id="shelf-quote-text" role="status" aria-live="polite"></span><span class="quote-meta"><span class="caption-sub quote-attribution" id="shelf-quote-attribution" hidden></span><a class="quote-source" id="shelf-quote-source" target="_blank" rel="noopener noreferrer">source&nbsp;↗</a></span></div><script type="application/json" id="shelf-quote-bank">${serializeJsonForHtml(quoteBank)}</script>`
        : "";

    return `
                <section class="home-shelf" aria-label="A little shelf of things I'm reading, playing, and doing">
                    <div class="shelf-objects">
                        ${quoteObject}
                        ${object("reading", "What I'm reading", `<span class="book book-current"></span><span class="book book-1"></span><span class="book book-2"></span>`)}
                        ${object("playing", "What I'm playing", `<span class="cartridge"></span>`)}
                        ${object("pokemon", "Favorite Pokémon", `<span class="pokeball"></span>`)}
                        ${object("wrote", "Latest blog post", `<span class="newspaper"></span>`)}
                    </div>
                    <div class="shelf-board"></div>
                    <div class="shelf-captions">
                        ${quoteCaption}
                        ${caption("reading", "reading", reading, reading.author || "")}
                        ${caption("playing", "playing", playing, playing.platform || "")}
                        ${caption("pokemon", "favourite pokémon", pokemon)}
                        ${caption("wrote", "recently wrote", wrote)}
                    </div>
                </section>`;
}

function generateBlogListHtml(posts) {
    let html = `
    <div class="blog-actions">
        <a href="../rss.xml" class="rss-link" aria-label="RSS feed">
            <i class="fas fa-rss" aria-hidden="true"></i>
        </a>
    </div>
    <div class="blog-list">`;

    posts.forEach((p) => {
        html += `
        <div class="blog-row">
            <span class="blog-date">${formatDate(p.date)}</span>
            <a href="/blog/${p.slug}" class="blog-title">${p.title}</a>
        </div>`;
    });

    html += "</div>";
    return html;
}

function generateRssXml(posts) {
    const siteTitle = CONFIG.siteTitle;
    const feedUrl = `${CONFIG.domain}/rss.xml`;
    const siteUrl = `${CONFIG.domain}/blog`;
    const lastBuildDate = new Date().toUTCString();

    const items = posts
        .map((post) => {
            const postUrl = `${CONFIG.domain}/blog/${post.slug}`;
            const pubDate = post.date
                ? new Date(post.date).toUTCString()
                : lastBuildDate;
            const description = wrapCdata(post.description || "");
            const contentHtml = wrapCdata(marked.parse(post.content || ""));
            const categories = Array.isArray(post.tags) ? post.tags : [];

            return `
    <item>
        <title>${escapeXml(post.title || "")}</title>
        <link>${escapeXml(postUrl)}</link>
        <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
        <pubDate>${escapeXml(pubDate)}</pubDate>
        <description>${description}</description>
        <content:encoded>${contentHtml}</content:encoded>
        ${categories.map((t) => `<category>${escapeXml(t)}</category>`).join("\n        ")}
    </item>`;
        })
        .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>${escapeXml(siteTitle)}</title>
        <link>${escapeXml(siteUrl)}</link>
        <description>${escapeXml("Blog posts from ashmod.dev")}</description>
        <language>en</language>
        <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
        <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
        ${items}
    </channel>
</rss>
`;
}

async function build() {
    console.log("Starting build...");

    await fs.ensureDir(path.join(CONFIG.publicDir, "blog"));

    const templates = {
        default: await fs.readFile(
            path.join(CONFIG.templatesDir, "layout-default.html"),
            "utf-8",
        ),
        home: await fs.readFile(
            path.join(CONFIG.templatesDir, "layout-home.html"),
            "utf-8",
        ),
    };

    const blogFiles = await fs.glob(path.join(CONFIG.contentDir, "blog/*.md"));
    const posts = [];
    for (const file of blogFiles) {
        const raw = await fs.readFile(file, "utf-8");
        const { data, content } = matter(raw);
        posts.push({
            ...data,
            content,
            slug: path.basename(file, ".md"),
        });
    }
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const projectFiles = await fs.glob(
        path.join(CONFIG.contentDir, "projects/*.md"),
    );
    const projects = [];
    for (const file of projectFiles) {
        const raw = await fs.readFile(file, "utf-8");
        const { data, content } = matter(raw);
        projects.push({
            ...data,
            content,
            slug: path.basename(file, ".md"),
        });
    }
    const openSourceContributionsPath = path.join(
        CONFIG.contentDir,
        "projects/open-source.json",
    );
    const openSourceContributions = await loadJsonArrayIfExists(
        openSourceContributionsPath,
    );
    for (const [oss_index, entry] of openSourceContributions.entries()) {
        projects.push({
            ...entry,
            category: entry.category || "OPEN SOURCE",
            oss_index,
        });
    }

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const prevPost = i > 0 ? posts[i - 1] : null;
        const nextPost = i < posts.length - 1 ? posts[i + 1] : null;

        const htmlContent = marked.parse(post.content);
        let template = templates.default;

        // relative root for Blog Posts (they are in /blog/slug/, so root is ../..)
        const rootPath = "../..";

        const ogImage = post.image
            ? `${rootPath}/${post.image}`
            : `${rootPath}/assets/images/banner.png`;
        const rssFeedLink = `<link rel="alternate" type="application/rss+xml" title="${CONFIG.siteTitle} RSS" href="${rootPath}/rss.xml">`;

        let postNavHtml = '<nav class="post-nav">';
        postNavHtml += `<a href="../" class="post-nav-back"><i class="fas fa-arrow-left"></i> All Posts</a>`;
        postNavHtml += '<div class="post-nav-links">';
        if (nextPost) {
            postNavHtml += `<a href="../${nextPost.slug}" class="post-nav-link post-nav-prev"><i class="fas fa-chevron-left"></i> ${nextPost.title}</a>`;
        } else {
            postNavHtml +=
                '<span class="post-nav-link post-nav-disabled"></span>';
        }
        if (prevPost) {
            postNavHtml += `<a href="../${prevPost.slug}" class="post-nav-link post-nav-next">${prevPost.title} <i class="fas fa-chevron-right"></i></a>`;
        } else {
            postNavHtml +=
                '<span class="post-nav-link post-nav-disabled"></span>';
        }
        postNavHtml += "</div></nav>";

        const giscusHtml = `
                    <section class="post-comments">
                        <div class="giscus"></div>
                        <script>
                            (function() {
                                function isThemeDark() {
                                    const darkThemes = ['default_dark', 'serika_dark', 'dracula', 'nord', 'gruvbox_dark', 'monokai',
                                        'catppuccin', 'rose_pine', 'solarized_dark', 'carbon', 'vscode', 'terminal', 'matrix',
                                        'onedark', 'sonokai', 'eighties_after_dark', 'github', 'everblush', 'arch', 'alexine'];
                                    const saved = localStorage.getItem('theme');
                                    return darkThemes.includes(saved);
                                }

                                const theme = isThemeDark() ? 'dark' : 'light';
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

                                new MutationObserver(function() {
                                    const iframe = document.querySelector('iframe.giscus-frame');
                                    if (iframe) {
                                        const newTheme = isThemeDark() ? 'dark' : 'light';
                                        iframe.contentWindow.postMessage(
                                            { giscus: { setConfig: { theme: newTheme } } },
                                            'https://giscus.app'
                                        );
                                    }
                                }).observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
                            })();
                        <\/script>
                    </section>`;

        let finalHtml = template
            .replaceAll("{{TITLE}}", `${post.title} | ${CONFIG.siteTitle}`)
            .replaceAll("{{DESCRIPTION}}", post.description || "")
            .replaceAll("{{CANONICAL}}", `${CONFIG.domain}/blog/${post.slug}`)
            .replaceAll("{{OG_IMAGE}}", ogImage)
            .replace("{{RSS_FEED_LINK}}", rssFeedLink)
            .replaceAll("{{ROOT}}", rootPath)
            .replace(
                "{{CONTENT}}",
                `
                <article class="blog-post">
                    <header class="post-header">
                        <h1>${post.title}</h1>
                        <div class="post-meta">
                            <time><i class="fas fa-calendar-alt" aria-hidden="true"></i> ${formatDate(post.date)}</time>
                            ${Array.isArray(post.tags) && post.tags.length > 0 ? `<div class="post-tags">${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}</div>` : ''}
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
            `,
            );

        await fs.outputFile(
            path.join(CONFIG.publicDir, `blog/${post.slug}/index.html`),
            finalHtml,
        );
    }
    console.log(`√ Generated ${posts.length} blog posts.`);

    const rss = generateRssXml(posts);
    await fs.outputFile(path.join(CONFIG.publicDir, "rss.xml"), rss);
    console.log("√ Generated rss.xml");

    const nowPath = path.join(CONFIG.contentDir, "now.json");
    const now = (await fs.pathExists(nowPath))
        ? await fs.readJson(nowPath)
        : null;
    const quotes = await loadJsonArrayIfExists(
        path.join(CONFIG.contentDir, "quotes.json"),
    );

    const pageFiles = await fs.glob(path.join(CONFIG.contentDir, "pages/*.md"));

    for (const file of pageFiles) {
        const raw = await fs.readFile(file, "utf-8");
        const { data, content } = matter(raw);
        const slug = path.basename(file, ".md");

        let htmlContent = marked.parse(content);
        let layout = data.layout || "default";
        let template = layout === "home" ? templates.home : templates.default;

        const isHome = slug === "home";
        const rootPath = isHome ? "." : "..";
        const rssFeedLink =
            layout === "blog-index"
                ? `<link rel="alternate" type="application/rss+xml" title="${CONFIG.siteTitle} RSS" href="${rootPath}/rss.xml">`
                : "";

        if (layout === "work-index") {
            htmlContent += generateWorkListHtml(projects, rootPath);
        } else if (layout === "blog-index") {
            htmlContent += generateBlogListHtml(posts);
        }

        const outPath = isHome ? "index.html" : `${slug}/index.html`;
        const canonicalPath = isHome ? "" : slug;
        const pageTitle = isHome
            ? CONFIG.siteTitle
            : `${data.title} | ${CONFIG.siteTitle}`;

        let finalHtml = template
            .replaceAll("{{TITLE}}", pageTitle)
            .replaceAll("{{DESCRIPTION}}", data.description || "")
            .replaceAll("{{CANONICAL}}", `${CONFIG.domain}/${canonicalPath}`)
            .replaceAll("{{OG_IMAGE}}", `${rootPath}/assets/images/banner.png`)
            .replace("{{RSS_FEED_LINK}}", rssFeedLink)
            .replaceAll("{{ROOT}}", rootPath)
            .replace(
                "{{SHELF}}",
                layout === "home"
                    ? generateShelfHtml(now, posts[0], quotes)
                    : "",
            )
            .replace("{{CONTENT}}", htmlContent);

        await fs.outputFile(path.join(CONFIG.publicDir, outPath), finalHtml);
    }
    console.log(`√ Generated ${pageFiles.length} pages.`);

    const urls = [
        ...pageFiles.map((f) => {
            const s = path.basename(f, ".md");
            return s === "home" ? "" : s;
        }),
        "rss.xml",
        ...posts.map((p) => `blog/${p.slug}`),
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
        .map(
            (url) => `
    <url>
        <loc>${CONFIG.domain}/${url}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    </url>`,
        )
        .join("")}
</urlset>`;

    await fs.outputFile(path.join(CONFIG.publicDir, "sitemap.xml"), sitemap);
    console.log("√ Generated sitemap.xml");

    console.log("i Build complete!");
}

build().catch((err) => {
    console.error("⚠ Build failed:", err);
    process.exit(1);
});
