class BlogManager {
    constructor() {
        // Blog post data structure
        this.blogPosts = [
            {
                id: 1,
                title: "The Illusion of Thinking: How close are we to AGI?",
                excerpt: "Artificial General Intelligence (AGI) is a topic of great interest and debate in the tech community. This article largely discusses the recent paper by Apple: 'The Illusion of Thinking: Understanding the Strengths and Limitations of Reasoning Models via the Lens of Problem Complexity'",
                content: "",
                image: "images/agi.png",
                category: "artificial-intelligence",
                date: "Jun. 8, 2025",
                readTime: "5 min read",
                featured: false,
                url: "blog/agi-illusion-of-thinking.html",
                popularity: 7
            },
            {
                id: 2,
                title: "Design Patterns in a Nutshell",
                excerpt: "A beginner-friendly handbook that serves as a guide/quick reference for most design patterns covered by the Gang of Four, with a companion repository containing code examples in Java.",
                content: "",
                image: "images/dpn.png",
                category: "tutorials",
                date: "Jan. 10, 2025",
                readTime: "1.4 hr read",
                featured: false,
                url: "https://drive.google.com/file/d/19qE0GULc0QBZ7pHO0XIFj_GkTRuBpd5v/view",
                externalLinks: {
                    book: "https://drive.google.com/file/d/19qE0GULc0QBZ7pHO0XIFj_GkTRuBpd5v/view",
                    repo: "https://github.com/ashmod/DesignPatternsNutshell"
                },
                popularity: 24
            },
            {
                id: 3,
                title: "Open Your Eyes",
                excerpt: "How many more thousands of children have to die? How many more families need to be torn apart? How long will the world stay silent? How long will you keep your eyes closed?",
                content: "",
                image: "images/palestinebanner.png",
                category: "thoughts",
                date: "May 15, 2024",
                readTime: "7 min read",
                featured: true,
                url: "blog/open-your-eyes.html",
                popularity: 18
            },
            {
                id: 4,
                title: "𝚜𝚔𝚖𝚋𝚕",
                excerpt: "A really simple arcade-style game with great personality ^_^ , you play as that green fella dodging the red fellas falling from the sky, but it gets trickier! How long can you skimble?",
                content: "",
                image: "images/skimblegif.gif",
                category: "coding",
                date: "Sept. 29, 2023",
                readTime: "Interactive",
                featured: false,
                url: "https://ashmod.github.io/skimble",
                externalLinks: {
                    play: "https://ashmod.github.io/skimble",
                    repo: "https://github.com/ashmod/skimble"
                },
                popularity: 12
            },
            {
                id: 5,
                title: "Tell your story, your way.",
                excerpt: "Have you ever wanted to showcase yourself in a few simple steps? Look no further! With basic HTML knowledge, you can edit this website to act as your own simple portfolio, fully customizable to your needs!",
                content: "",
                image: "images/portfoliod.png",
                category: "design",
                date: "Aug. 16, 2023",
                readTime: "5 min read",
                featured: false,
                url: "https://ashmod.github.io/portfoliod",
                externalLinks: {
                    site: "https://ashmod.github.io/portfoliod",
                    repo: "https://github.com/ashmod/portfoliod"
                },
                popularity: 8
            },
            {
                id: 6,
                title: "In quoting others, we cite ourselves..",
                excerpt: "This simple website generates random quotes everytime you visit it, so there's always something new to digest! If you're lucky enough, you'll even find my personal favorite quotes in there, labeled!",
                content: "",
                image: "images/quotes.png",
                category: "coding",
                date: "May 26, 2023",
                readTime: "Interactive",
                featured: false,
                url: "https://ashmod.github.io/quotes",
                externalLinks: {
                    site: "https://ashmod.github.io/quotes",
                    repo: "https://www.github.com/ashmod/quotes"
                },
                popularity: 6
            },
            {
                id: 7,
                title: "Earth is what we all have in common..",
                excerpt: "Celebrating Earth Day 2023! Get to know more about our planet and how to protect it, check out EarthDay's website and take this quiz to test your knowledge about our planet!",
                content: "",
                image: "images/earthday.png",
                category: "thoughts",
                date: "Apr. 22, 2023",
                readTime: "Interactive",
                featured: false,
                url: "https://ashmod.github.io/earth-day-quiz",
                externalLinks: {
                    quiz: "https://ashmod.github.io/earth-day-quiz",
                    repo: "https://github.com/ashmod/earth-day-quiz"
                },
                popularity: 4
            }
        ];
        
        this.currentPage = 1;
        this.postsPerPage = 3;
        this.filteredPosts = [...this.blogPosts];
        this.sortMethod = 'newest';
        this.currentCategory = 'all';
        this.searchTerm = '';
        
        this.init();
    }
    
    init() {
        this.renderFeaturedPost();
        this.setupCategoryFilter();
        this.setupSearchFunctionality();
        this.setupSortingDropdown();
        this.renderPosts();
        this.setupPagination();
    }
      
    renderFeaturedPost() {
        const featuredPost = this.blogPosts.find(post => post.featured);
        if (!featuredPost) return;
        
        // Check if we have a featured section or create one
        let featuredSection = document.querySelector('.featured-post-section');
        if (!featuredSection) {
            // Create featured section before the blog grid
            const blogContent = document.querySelector('.blog-content .container');
            const blogGrid = document.querySelector('.blog-grid');
            
            if (blogContent && blogGrid) {
                featuredSection = document.createElement('div');
                featuredSection.className = 'featured-post-section';
                blogContent.insertBefore(featuredSection, blogGrid);
            } else {
                return;
            }
        }
        
        // Create featured post HTML with new design
        const featuredPostHTML = `
            <div class="featured-post" onclick="window.open('${featuredPost.url}', '_blank')">
                <div class="featured-post-image">
                    <img src="${featuredPost.image}" alt="${featuredPost.title}" class="featured-post-img" loading="lazy">
                </div>
                <div class="featured-post-content">
                    <div class="featured-tag">
                        <i data-lucide="star"></i>
                        <span>Featured</span>
                    </div>
                    <h2 class="featured-title">${featuredPost.title}</h2>
                    <p class="featured-excerpt">${featuredPost.excerpt}</p>
                    <div class="featured-meta">
                        <i data-lucide="calendar"></i>
                        <span>${featuredPost.date}</span>
                        <i data-lucide="clock"></i>
                        <span>${featuredPost.readTime}</span>
                    </div>
                </div>
            </div>
        `;
        
        featuredSection.innerHTML = featuredPostHTML;
        
        // Initialize Lucide icons for the featured post
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(featuredSection, {
                strokeWidth: 2,
                fill: 'none'
            });
        }
    }
    
    renderPosts() {
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        
        // Filter posts based on category and search term
        this.filteredPosts = this.blogPosts.filter(post => {
            // Skip featured post in the grid
            if (post.featured) return false;
            
            // Apply category filter
            const categoryMatch = this.currentCategory === 'all' || post.category === this.currentCategory;
            
            // Apply search filter
            const searchMatch = this.searchTerm === '' || 
                post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                this.getCategoryName(post.category).toLowerCase().includes(this.searchTerm.toLowerCase());
                
            return categoryMatch && searchMatch;
        });
        
        // Sort filtered posts
        this.sortPosts();
        
        // Get current page posts
        const currentPagePosts = this.filteredPosts.slice(startIndex, endIndex);
        
        // Get container
        const postsContainer = document.getElementById('dynamic-blog');
        if (!postsContainer) return;
        
        // Clear container
        postsContainer.innerHTML = '';
        
        // If no posts match filters
        if (currentPagePosts.length === 0) {
            postsContainer.innerHTML = `
                <div class="no-posts-message">
                    <i data-lucide="search"></i>
                    <h3>No posts found</h3>
                    <p>Try adjusting your search or filter to find what you're looking for.</p>
                </div>
            `;
            this.updatePagination();
            // Initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons(postsContainer, {
                    strokeWidth: 2,
                    fill: 'none'
                });
            }
            return;
        }
        
        // Render posts
        currentPagePosts.forEach(post => {
            const postHTML = this.createPostHTML(post);
            postsContainer.innerHTML += postHTML;
        });
        
        // Initialize Lucide icons for new posts
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(postsContainer, {
                strokeWidth: 2,
                fill: 'none'
            });
        }
        
        this.updatePagination();
    }
    
    createPostHTML(post) {
        // Determine the appropriate action/link
        let actionHTML = '';
        let repoHTML = '';
        let iconName = 'arrow-right';
        let actionText = 'Read More';
        
        if (post.externalLinks) {
            if (post.externalLinks.play) {
                iconName = 'gamepad-2';
                actionText = 'Play Game';
                actionHTML = `<a href="${post.externalLinks.play}" class="blog-link primary" target="_blank" rel="noopener">`;
            } else if (post.externalLinks.site) {
                iconName = 'external-link';
                actionText = 'Visit Site';
                actionHTML = `<a href="${post.externalLinks.site}" class="blog-link primary" target="_blank" rel="noopener">`;
            } else if (post.externalLinks.quiz) {
                iconName = 'help-circle';
                actionText = 'Take Quiz';
                actionHTML = `<a href="${post.externalLinks.quiz}" class="blog-link primary" target="_blank" rel="noopener">`;
            } else if (post.externalLinks.book) {
                iconName = 'external-link';
                actionText = 'Read Book';
                actionHTML = `<a href="${post.externalLinks.book}" class="blog-link primary" target="_blank" rel="noopener">`;
            }
            
            // Add repo button if repo exists
            if (post.externalLinks.repo) {
                repoHTML = `<a href="${post.externalLinks.repo}" class="blog-link secondary" target="_blank" rel="noopener">
                    <span>View Repo</span>
                    <i data-lucide="github"></i>
                </a>`;
            }
        } else {
            actionHTML = `<a href="${post.url}" class="blog-link primary">`;
        }
        
        return `
            <article class="blog-card" data-category="${post.category}" data-date="${post.date}">
                <img src="${post.image}" alt="${post.title}" class="blog-card-image" loading="lazy">
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <i data-lucide="calendar"></i>
                        <span>${post.date}</span>
                        <i data-lucide="clock"></i>
                        <span>${post.readTime}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-tags">
                        <span class="blog-tag">${this.getCategoryName(post.category)}</span>
                    </div>
                    <div class="blog-footer">
                        <div class="blog-actions">
                            ${actionHTML}
                                <span>${actionText}</span>
                                <i data-lucide="${iconName}"></i>
                            </a>
                            ${repoHTML}
                        </div>
                    </div>
                </div>
            </article>
        `;
    }
    
    getCategoryName(categorySlug) {
        const categories = {
            'coding': 'Coding',
            'design': 'Design',
            'tutorials': 'Tutorials',
            'tools': 'Dev Tools',
            'thoughts': 'Thoughts',
            'artificial-intelligence': 'AI',
            'cybersecurity': 'Security'
        };
        
        return categories[categorySlug] || categorySlug;
    }
    
    setupCategoryFilter() {
        const categoryTags = document.querySelectorAll('.category-tag');
        
        categoryTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // Remove active class from all tags
                categoryTags.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tag
                tag.classList.add('active');
                
                // Update current category
                this.currentCategory = tag.getAttribute('data-category');
                
                // Reset to first page
                this.currentPage = 1;
                
                // Render posts with new filter
                this.renderPosts();
            });
        });
    }
    
    setupSearchFunctionality() {
        const searchInput = document.getElementById('blog-search-input');
        
        if (searchInput) {
            // Search on input with debounce
            searchInput.addEventListener('input', this.debounce(() => {
                this.searchTerm = searchInput.value.trim();
                this.currentPage = 1;
                this.renderPosts();
            }, 300));
            
            // Search on enter key
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.searchTerm = searchInput.value.trim();
                    this.currentPage = 1;
                    this.renderPosts();
                }
            });
        }
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    setupSortingDropdown() {
        const sortBtn = document.getElementById('sort-filter-btn');
        const sortDropdown = document.getElementById('sort-dropdown');
        const dropdownItems = document.querySelectorAll('.filter-option');
        
        if (sortBtn && sortDropdown) {
            // Toggle dropdown
            sortBtn.addEventListener('click', () => {
                sortDropdown.parentElement.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (event) => {
                if (!event.target.closest('.filter-dropdown')) {
                    sortDropdown.parentElement.classList.remove('active');
                }
            });
            
            // Sort posts
            dropdownItems.forEach(item => {
                item.addEventListener('click', () => {
                    const sortValue = item.getAttribute('data-value');
                    this.sortMethod = sortValue;
                    
                    sortDropdown.parentElement.classList.remove('active');
                    
                    // Update button text
                    sortBtn.querySelector('span').textContent = item.textContent;
                    
                    // Render posts with new sort
                    this.renderPosts();
                });
            });
        }
    }
    
    sortPosts() {
        switch (this.sortMethod) {
            case 'newest':
                this.filteredPosts.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
                break;
            case 'oldest':
                this.filteredPosts.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
                break;
            case 'popular':
                this.filteredPosts.sort((a, b) => {
                    return b.popularity - a.popularity;
                });
                break;
        }
    }
    
    setupPagination() {
        this.updatePagination();
    }
    
    updatePagination() {
        const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
        const paginationContainer = document.querySelector('.pagination');
        
        if (!paginationContainer || totalPages <= 1) {
            if (paginationContainer) {
                paginationContainer.style.display = 'none';
            }
            return;
        }
        
        paginationContainer.style.display = 'flex';
        paginationContainer.innerHTML = '';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = `pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '<i data-lucide="chevron-left"></i>';
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderPosts();
            }
        });
        paginationContainer.appendChild(prevBtn);
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-btn ${i === this.currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                this.currentPage = i;
                this.renderPosts();
            });
            paginationContainer.appendChild(pageBtn);
        }
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = `pagination-btn ${this.currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = '<i data-lucide="chevron-right"></i>';
        nextBtn.disabled = this.currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderPosts();
            }
        });
        paginationContainer.appendChild(nextBtn);
        
        // Initialize Lucide icons for pagination
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(paginationContainer, {
                strokeWidth: 2,
                fill: 'none'
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the blog page
    if (document.querySelector('.blog-content')) {
        new BlogManager();
    }
});
