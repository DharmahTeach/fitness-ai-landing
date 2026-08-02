// FitnessAI Bot — landing scripts

document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initSmoothScrolling();
    initFAQ();
    initScrollReveal();
    initHeaderState();
    initAnalytics();
    initBotNameCopy();
});

// ---- Mobile menu ----
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    function close() {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Открыть меню');
    }

    toggle.addEventListener('click', function () {
        const open = menu.classList.toggle('active');
        toggle.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });

    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

    window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 768) close(); });
}

// ---- Smooth scrolling for in-page anchors ----
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const headerH = document.querySelector('.header')?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

// ---- FAQ accordion ----
function initFAQ() {
    const items = document.querySelectorAll('.faq__item');
    items.forEach(item => {
        const question = item.querySelector('.faq__question');
        if (!question) return;
        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');
            items.forEach(other => {
                other.classList.remove('active');
                other.querySelector('.faq__question')?.setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ---- Scroll reveal (gentle, respects reduced motion) ----
function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.feature-card, .step, .pricing-card, .review-card, .faq__item, .section-header, .partner-promo__content, .partner-promo__card'
    );
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('animate-in'));
        return;
    }

    targets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
}

// ---- Header background on scroll ----
function initHeaderState() {
    const header = document.querySelector('.header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

// ---- Analytics ----
function initAnalytics() {
    document.querySelectorAll('.btn, .pricing-plan').forEach(el => {
        el.addEventListener('click', function () {
            const text = (this.textContent || '').trim();
            const href = this.getAttribute('href') || '';
            if (href.includes('t.me')) {
                trackEvent('telegram_click', { button_text: text, button_href: href });
            } else if (text.toLowerCase().includes('бесплатно')) {
                trackEvent('free_trial_click', { button_text: text });
            }
        });
    });

    const milestones = [25, 50, 75, 90, 100];
    const tracked = new Set();
    window.addEventListener('scroll', function () {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        const percent = Math.round((window.pageYOffset / docHeight) * 100);
        milestones.forEach(m => {
            if (percent >= m && !tracked.has(m)) {
                tracked.add(m);
                trackEvent('scroll_depth', { depth: m });
            }
        });
    }, { passive: true });
}

function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') gtag('event', eventName, parameters);
    if (typeof ym !== 'undefined') ym(106247373, 'reachGoal', eventName, parameters);
}

// ---- Copy bot name ----
function initBotNameCopy() {
    document.querySelectorAll('.bot-name').forEach(el => {
        el.addEventListener('click', function () {
            const bot = this.getAttribute('data-bot');
            if (!bot) return;
            copyToClipboard(bot);
            trackEvent('bot_name_copy', { bot_name: bot });
        });
    });
}

function copyToClipboard(text) {
    const done = () => showNotification('Скопировано: ' + text);
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
        fallbackCopy(text, done);
    }
}

function fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); cb(); } catch (e) { /* noop */ }
    document.body.removeChild(ta);
}

// ---- Toast ----
function showNotification(message, type = 'success') {
    const note = document.createElement('div');
    note.className = `notification notification--${type}`;
    note.textContent = message;
    document.body.appendChild(note);
    requestAnimationFrame(() => note.classList.add('show'));
    setTimeout(() => {
        note.classList.remove('show');
        setTimeout(() => note.remove(), 300);
    }, 2600);
}
