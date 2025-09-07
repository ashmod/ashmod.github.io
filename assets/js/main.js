// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeNavigation();
    initializePersonaModal();
    initializeTerminalAnimation();
    initializeStatAnimations();
    initializeScrollEffects();
    initializeLucideIcons();
    initializeContactForm();
    initializeNewsletterForm();
}

// Navigation functionality
function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Persona modal functionality
function initializePersonaModal() {
    const personaToggle = document.querySelector('.persona-toggle');
    const modal = document.getElementById('persona-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    if (personaToggle && modal) {
        personaToggle.addEventListener('click', () => {
            openModal(modal);
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            closeModal(modal);
        });
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', () => {
            closeModal(modal);
        });
    }
}

function openModal(modal) {
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstFocusable = modal.querySelector('button, a, input, [tabindex]');
    if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
    }
}

function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Terminal typing animation
function initializeTerminalAnimation() {
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    
    // Initialize terminal buttons
    initializeTerminalButtons();
    
    // No fade effect - terminal content loads normally via personas.js
}

// Initialize terminal buttons functionality
function initializeTerminalButtons() {
    const terminal = document.getElementById('hero-terminal');
    if (!terminal) return;
    
    const closeButton = terminal.querySelector('.control.close');
    const minimizeButton = terminal.querySelector('.control.minimize');
    const maximizeButton = terminal.querySelector('.control.maximize');
    
    // Close button - minimizes the terminal
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            terminal.style.transform = 'scale(0.8)';
            terminal.style.opacity = '0.3';
            terminal.style.transition = 'all 0.3s ease';
            
            // Restore after 2 seconds
            setTimeout(() => {
                terminal.style.transform = 'scale(1)';
                terminal.style.opacity = '1';
            }, 2000);
        });
        
        // Add hover effect
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.backgroundColor = '#ff5f57';
        });
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.backgroundColor = '';
        });
    }
    
    // Minimize button - shrinks the terminal temporarily
    if (minimizeButton) {
        minimizeButton.addEventListener('click', () => {
            terminal.style.transform = 'scaleY(0.1)';
            terminal.style.transformOrigin = 'top';
            terminal.style.transition = 'all 0.3s ease';
            
            // Restore after 1.5 seconds
            setTimeout(() => {
                terminal.style.transform = 'scaleY(1)';
            }, 1500);
        });
        
        // Add hover effect
        minimizeButton.style.cursor = 'pointer';
        minimizeButton.addEventListener('mouseenter', () => {
            minimizeButton.style.backgroundColor = '#ffbd2e';
        });
        minimizeButton.addEventListener('mouseleave', () => {
            minimizeButton.style.backgroundColor = '';
        });
    }
    
    // Maximize button - enlarges the terminal temporarily
    if (maximizeButton) {
        let isMaximized = false;
        
        maximizeButton.addEventListener('click', () => {
            if (!isMaximized) {
                terminal.style.transform = 'scale(1.2)';
                terminal.style.zIndex = '1000';
                terminal.style.transition = 'all 0.3s ease';
                isMaximized = true;
                
                // Restore after 3 seconds
                setTimeout(() => {
                    terminal.style.transform = 'scale(1)';
                    terminal.style.zIndex = '';
                    isMaximized = false;
                }, 3000);
            }
        });
        
        // Add hover effect
        maximizeButton.style.cursor = 'pointer';
        maximizeButton.addEventListener('mouseenter', () => {
            maximizeButton.style.backgroundColor = '#28ca42';
        });
        maximizeButton.addEventListener('mouseleave', () => {
            maximizeButton.style.backgroundColor = '';
        });
    }
}

// Animate statistics counters
function initializeStatAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const suffix = element.textContent.replace(/\d+/g, '');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Initialize Lucide icons
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons({
            strokeWidth: 2,
            fill: 'none'
        });
    }
}

// Initialize contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Submit form to Web3Forms
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span>Sending...</span><i data-lucide="loader-2"></i>';
            submitButton.disabled = true;
            
            // Re-initialize icons for the loader
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
            
            // Prepare form data for Web3Forms
            const formDataToSend = new FormData();
            formDataToSend.append('access_key', '0c92db70-79b4-4ced-8ce3-1c1d96e0335a');
            formDataToSend.append('name', data.name);
            formDataToSend.append('email', data.email);
            formDataToSend.append('subject', data.subject);
            formDataToSend.append('message', data.message);
            formDataToSend.append('from_name', data.name);
            formDataToSend.append('to', 'shehab@ashmod.dev');
            
            // Send to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formDataToSend
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Sorry, there was an error sending your message. Please try again or email me directly at shehab@ashmod.dev', 'error');
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Re-initialize icons
                if (typeof lucide !== 'undefined' && lucide.createIcons) {
                    lucide.createIcons();
                }
            });
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--persona-primary)' : type === 'error' ? '#ef4444' : 'var(--bg-secondary)'};
        color: ${type === 'success' || type === 'error' ? 'white' : 'var(--text-primary)'};
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        border: 1px solid ${type === 'success' ? 'var(--persona-primary)' : type === 'error' ? '#ef4444' : 'var(--border-color)'};
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Initialize newsletter form functionality
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(newsletterForm);
            const email = formData.get('email');
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Submit button state
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span>Subscribing...</span><i data-lucide="loader-2"></i>';
            submitButton.disabled = true;
            
            // Re-initialize icons for the loader
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
            
            // Prepare form data for Web3Forms
            const formDataToSend = new FormData();
            formDataToSend.append('access_key', '0c92db70-79b4-4ced-8ce3-1c1d96e0335a');
            formDataToSend.append('email', email);
            formDataToSend.append('subject', 'New Newsletter Subscription');
            formDataToSend.append('from_name', 'Newsletter Signup');
            formDataToSend.append('subscription_type', 'newsletter');
            formDataToSend.append('message', `New newsletter subscription from: ${email}`);
            
            // Send to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formDataToSend
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showNotification('🎉 Thanks for subscribing! You\'ll be notified when I publish new posts.', 'success');
                    newsletterForm.reset();
                } else {
                    throw new Error(result.message || 'Subscription failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Sorry, there was an error with your subscription. Please try again or contact me directly.', 'error');
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Re-initialize icons
                if (typeof lucide !== 'undefined' && lucide.createIcons) {
                    lucide.createIcons();
                }
            });
        });
    }
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modal on Escape
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[aria-hidden="false"]');
        if (openModal) {
            closeModal(openModal);
        }
    }
    
    // Toggle mobile menu on menu key
    if (e.key === 'Menu') {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.click();
        }
    }
});

// Handle reduced motion preferences
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// Scroll effects for navbar
function initializeScrollEffects() {
    const navbar = document.querySelector('.main-nav');
    let isScrolled = false;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const shouldBeScrolled = scrollTop > 50;
        
        if (shouldBeScrolled !== isScrolled) {
            isScrolled = shouldBeScrolled;
            navbar.classList.toggle('scrolled', isScrolled);
        }
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    handleScroll();
}

// Export functions for use in other modules
window.PortfolioApp = {
    openModal,
    closeModal,
    initializeLucideIcons,
    initializeTerminalButtons,
    initializeContactForm,
    initializeNewsletterForm,
    showNotification,
    removeNotification
};
