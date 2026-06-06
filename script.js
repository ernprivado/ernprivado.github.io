(function () {
    'use strict';

    /*--------- Footer year ------- */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /*--------- Sticky nav shadow --------*/
    const nav = document.getElementById('nav');
    const onscroll = () => {
        if (!nav) return;
        nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    document.addEventListener('scroll', onscroll, { passive: true });

    /*-- Mobile menu toggle --*/
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const open = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(open));
        });

        // Close on link click (mobile)
        menu.querySelectorAll('a').forEach((a) =>
            a.addEventListener('click', () => {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            })
        );
    }

    /*---------- Active link on scroll -----------*/
    const links = Array.from(document.querySelectorAll('.nav__link'));
    const sections = links
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = `#${entry.target.id}`;
                        links.forEach((link) =>
                            link.classList.toggle('is-active', link.getAttribute('href') === id)
                        );
                    }
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
    }

    /*---------- Reveal-on-scroll animations -----*/
    const revealTargets = document.querySelectorAll(
        '.card, .timeline__item, .tech-card, .faq__item, .skill, .contact__form, .contact__aside, .about__summary'
    );

    revealTargets.forEach((el) => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealTargets.forEach((el) => revealObserver.observe(el));
    } else {
        revealTargets.forEach((el) => el.classList.add('is-visible'));
    }

    /*-- Animate skill bars when visible ------- */
    const fills = document.querySelectorAll('.skill__fill');

    if ('IntersectionObserver' in window && fills.length) {
        const skillObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const value = Math.min(100, Math.max(0, Number(target.dataset.value) || 0));
                        target.style.width = `${value}%`;
                        skillObserver.unobserve(target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        fills.forEach((fill) => skillObserver.observe(fill));
    } else {
        fills.forEach((fill) => {
            fill.style.width = `${Math.min(100, Math.max(0, Number(fill.dataset.value) || 0))}%`;
        });
    }

    /*-------------- contact form -------------------*/
    const form = document.getElementById('contactform');
    const status = document.getElementById('formstatus');

    if (form && status) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            status.className = 'form__status';
            status.textContent = '';

            const data = new FormData(form);
            const firstName = String(data.get('firstName') || '').trim();
            const lastName = String(data.get('lastName') || '').trim();
            const email = String(data.get('email') || '').trim();
            const message = String(data.get('message') || '').trim();

            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!firstName || !lastName || !email || !message) {
                status.textContent = 'Please fill out all required fields.';
                status.classList.add('is-error');
                return;
            }

            if (!emailRe.test(email)) {
                status.textContent = 'Please enter a valid email address.';
                status.classList.add('is-error');
                return;
            }

            // No backend wired - simulate success
            status.textContent = 'Thanks for reaching out! I will get back to you soon.';
            status.classList.add('is-success');
            form.reset();
        });
    }

    /*-------- Smooth internal navigation without preserving hash -----------*/
    const sectionLinks = document.querySelectorAll('a[href^="#"]');
    sectionLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href === '#!') return;

        const target = document.querySelector(href);
        if (!target) return;

        link.addEventListener('click', (event) => {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', window.location.pathname + window.location.search);
        });
    });

})();
