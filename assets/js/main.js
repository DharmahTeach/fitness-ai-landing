// Main JavaScript for FitnessAI Bot Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScrolling();
    initFAQ();
    initMobileMenu();
    initAnimations();
    initAnalytics();
    initBotNameCopy();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    // Create mobile menu button if it doesn't exist
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav__menu');
    
    if (nav && navMenu && window.innerWidth <= 768) {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        nav.appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuButton.classList.remove('active');
            });
        });
    }
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .step, .pricing-card, .review-card, .faq__item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Analytics tracking
function initAnalytics() {
    // Track button clicks
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href');
            
            // Track different types of clicks
            if (buttonHref && buttonHref.includes('t.me')) {
                trackEvent('telegram_click', {
                    button_text: buttonText,
                    button_href: buttonHref
                });
            } else if (buttonText.toLowerCase().includes('бесплатно')) {
                trackEvent('free_trial_click', {
                    button_text: buttonText
                });
            } else if (buttonText.toLowerCase().includes('премиум')) {
                trackEvent('premium_click', {
                    button_text: buttonText
                });
            }
        });
    });
    
    // Track scroll depth
    let maxScrollDepth = 0;
    const scrollDepthMilestones = [25, 50, 75, 90, 100];
    const trackedMilestones = new Set();
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > maxScrollDepth) {
            maxScrollDepth = scrollPercent;
        }
        
        scrollDepthMilestones.forEach(milestone => {
            if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
                trackedMilestones.add(milestone);
                trackEvent('scroll_depth', {
                    depth: milestone
                });
            }
        });
    });
    
    // Track time on page
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', {
            seconds: timeOnPage
        });
    });
}

// Event tracking function
function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Yandex Metrica
    if (typeof ym !== 'undefined') {
        ym(12345678, 'reachGoal', eventName, parameters);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, parameters);
}

// Utility functions
function debounce(func, wait) {
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

// Header scroll effect
window.addEventListener('scroll', debounce(function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 10));

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Form validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Скопировано в буфер обмена!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Скопировано в буфер обмена!');
    }
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        trackEvent('page_load_time', {
            load_time: loadTime
        });
    });
    
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        getCLS(trackEvent);
        getFID(trackEvent);
        getFCP(trackEvent);
        getLCP(trackEvent);
        getTTFB(trackEvent);
    }
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Bot name copy functionality
function initBotNameCopy() {
    const botNameElements = document.querySelectorAll('.bot-name');
    
    botNameElements.forEach(element => {
        element.addEventListener('click', function() {
            const botName = this.getAttribute('data-bot');
            
            if (botName) {
                copyToClipboard(botName);
                
                // Visual feedback
                this.style.background = 'rgba(16, 185, 129, 0.2)';
                this.style.borderColor = '#10b981';
                this.style.color = '#10b981';
                
                // Reset after animation
                setTimeout(() => {
                    this.style.background = '';
                    this.style.borderColor = '';
                    this.style.color = '';
                }, 1000);
                
                // Track the copy event
                trackEvent('bot_name_copy', {
                    bot_name: botName
                });
            }
        });
    });
}
