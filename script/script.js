document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', function () {
    /* ---------- Disclaimer popup (Bar Council of India) ---------- */
    const popupContainer = document.getElementById('popup-container');
    const agreeBtn = document.getElementById('agree-btn');
    const disagreeBtn = document.getElementById('disagree-btn');

    if (popupContainer && agreeBtn && disagreeBtn) {
        let hasAgreedRecently = null;
        try { hasAgreedRecently = localStorage.getItem('agreedTimestamp'); } catch (e) { }
        const currentTime = new Date().getTime();

        // Show the popup if the user hasn't agreed in the last 15 minutes
        if (!hasAgreedRecently || (currentTime - hasAgreedRecently > 15 * 60 * 1000)) {
            popupContainer.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        agreeBtn.addEventListener('click', function () {
            popupContainer.style.display = 'none';
            document.body.style.overflow = '';
            try { localStorage.setItem('agreedTimestamp', new Date().getTime()); } catch (e) { }
        });

        disagreeBtn.addEventListener('click', function () {
            window.location.href = 'https://www.google.com/maps/place/Chandigarh+Arbitration+Consultants/@30.696343,76.713463,19z/data=!4m6!3m5!1s0x390feff82ed3593b:0xd2a021ae84f84680!8m2!3d30.6963425!4d76.7134631!16s%2Fg%2F11lcljc3kv?hl=en&entry=ttu';
        });
    }

    /* ---------- Header: solid on scroll ---------- */
    const header = document.querySelector('.site-header');
    const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Mobile menu ---------- */
    const toggle = document.querySelector('.nav-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const open = document.body.classList.toggle('nav-open');
            toggle.setAttribute('aria-expanded', open);
        });
        document.querySelectorAll('.nav-links a').forEach(a =>
            a.addEventListener('click', () => {
                document.body.classList.remove('nav-open');
                toggle.setAttribute('aria-expanded', 'false');
            })
        );
    }

    /* ---------- Reveal on scroll ---------- */
    const items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        items.forEach(el => io.observe(el));
    } else {
        items.forEach(el => el.classList.add('in'));
    }

    /* ---------- Card glow follows cursor ---------- */
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            card.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
    });

    /* ---------- Count-up stats ---------- */
    const counters = document.querySelectorAll('[data-count]');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (counters.length && 'IntersectionObserver' in window && !reduce) {
        const co = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const end = parseInt(el.dataset.count, 10);
                const suffix = el.dataset.suffix || '';
                const start = performance.now();
                const dur = 1400;
                const step = (t) => {
                    const p = Math.min((t - start) / dur, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.round(end * eased) + suffix;
                    if (p < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
                co.unobserve(el);
            });
        }, { threshold: 0.5 });
        counters.forEach(el => co.observe(el));
    }
});
