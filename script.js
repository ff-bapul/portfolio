/* ============================================================
   script.js — Portfolio Interactivity
   Edit nothing here unless you want new behavior.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. CURSOR GLOW — follows mouse
    ---------------------------------------------------------- */
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    // Smooth cursor glow follow (lerp)
    function animateCursor() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top  = `${glowY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* ----------------------------------------------------------
       2. ACTIVE NAV on scroll (IntersectionObserver)
    ---------------------------------------------------------- */
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => navObserver.observe(s));

    /* ----------------------------------------------------------
       3. FADE-IN on scroll
    ---------------------------------------------------------- */
    const fadeEls = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Slight stagger per element
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 60);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    fadeEls.forEach(el => fadeObserver.observe(el));

    /* ----------------------------------------------------------
       4. SMOOTH SCROLL for nav links
    ---------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ----------------------------------------------------------
       5. EXPERIENCE CARD — dim siblings on hover
         (pure CSS handles most of this, JS adds class for control)
    ---------------------------------------------------------- */
    const expList = document.querySelector('.exp-list');
    if (expList) {
        expList.addEventListener('mouseenter', () => expList.classList.add('hovering'));
        expList.addEventListener('mouseleave', () => expList.classList.remove('hovering'));
    }

});
