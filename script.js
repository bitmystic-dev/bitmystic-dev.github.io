// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
        const cursor = document.getElementById('cursor');
        const cursorRing = document.getElementById('cursor-ring');
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX; mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function animRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animRing);
        }
        animRing();

        // ─── PARALLAX ───────────────────────────────────────────────────────────────
        const orb1 = document.querySelector('.orb1');
        const orb2 = document.querySelector('.orb2');
        const orb3 = document.querySelector('.orb3');
        const slowEls = document.querySelectorAll('.parallax-slow');

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const sy = window.scrollY;
                    orb1.style.transform = `translate(${sy * 0.04}px, ${sy * 0.12}px)`;
                    orb2.style.transform = `translate(${sy * -0.06}px, ${sy * 0.08}px)`;
                    orb3.style.transform = `translate(${sy * 0.03}px, ${sy * -0.1}px)`;
                    slowEls.forEach(el => {
                        el.style.transform = `translateY(${sy * 0.03}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Mouse-parallax for orbs
        document.addEventListener('mousemove', e => {
            const cx = (e.clientX / window.innerWidth - 0.5) * 2;
            const cy = (e.clientY / window.innerHeight - 0.5) * 2;
            orb1.style.transform = `translate(${cx * 20}px, ${cy * 20}px)`;
            orb2.style.transform = `translate(${cx * -15}px, ${cy * -15}px)`;
            orb3.style.transform = `translate(${cx * 10}px, ${cy * 25}px)`;
        });

        // ─── SCROLL REVEAL ──────────────────────────────────────────────────────────
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(r => observer.observe(r));

        // ─── TYPED TEXT ─────────────────────────────────────────────────────────────
        // (Simple typing effect for hero subtitle if desired)
        const subtitleEl = document.querySelector('.hero-subtitle');
        if (subtitleEl) {
            subtitleEl.style.opacity = '1'; // already animated via CSS
        }

        // ─── NAVBAR ACTIVE STATE ────────────────────────────────────────────────────
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section[id], #home');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(s => {
                if (window.scrollY >= s.offsetTop - 100) current = s.id;
            });
            navLinks.forEach(a => {
                a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
            });
        });

        // ─── CARD TILT ──────────────────────────────────────────────────────────────
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rx = (-y / rect.height) * 6;
                const ry = (x / rect.width) * 6;
                card.style.transform = `translateY(-10px) rotateX(${rx}deg) rotateY(${ry}deg)`;
                card.style.perspective = '1000px';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // ─── STAT CARDS TILT ────────────────────────────────────────────────────────
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                card.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(77,255,195,0.12), var(--glass))`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.background = '';
            });
        });
