export function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navCenter = document.getElementById('navCenter');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (hamburger && navCenter) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navCenter.classList.toggle('mobile-open');
            if (mobileOverlay) {
                mobileOverlay.classList.toggle('active');
                mobileOverlay.style.display = mobileOverlay.classList.contains('active') ? 'block' : 'none';
            }
            document.body.style.overflow = navCenter.classList.contains('mobile-open') ? 'hidden' : '';
        });

        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navCenter.classList.remove('mobile-open');
                mobileOverlay.classList.remove('active');
                mobileOverlay.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
