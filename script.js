document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }

    const closeMenu = () => {
        if(mobileMenu) mobileMenu.classList.remove('active');
    };

    if(closeBtn) closeBtn.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});