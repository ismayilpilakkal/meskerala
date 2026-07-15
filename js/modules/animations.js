export function initAnimations() {
    // Elegant Scroll Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'is-visible', 'active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all our animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-up, .reveal, .reveal-children');
    animatedElements.forEach(el => animationObserver.observe(el));

    // Initialize Smooth Parallax Animations
    initSpeedAnimations();
}

function initSpeedAnimations() {
    const mosaicSection = document.getElementById('mosaic-gallery');
    const tiles = document.querySelectorAll('.mosaic .tile');
    
    if (!mosaicSection || tiles.length === 0) return;

    // We'll set a target Y and a current Y for smooth interpolation (lerping)
    const speedPattern = [0.08, 0.02, 0.1, 0.04]; 
    const tileData = Array.from(tiles).map((tile, index) => {
        return {
            el: tile,
            speed: speedPattern[index % speedPattern.length],
            targetY: 0,
            currentY: 0
        };
    });

    function render() {
        const sectionRect = mosaicSection.getBoundingClientRect();
        
        // Only compute if section is roughly in viewport
        if (sectionRect.top < window.innerHeight && sectionRect.bottom > -500) {
            const centerOffset = window.innerHeight / 2 - (sectionRect.top + sectionRect.height / 2);
            
            tileData.forEach(data => {
                data.targetY = centerOffset * data.speed;
                // Lerp formula for smooth follow
                data.currentY += (data.targetY - data.currentY) * 0.08;
                
                // Use css variable so hover transform can calc against it
                data.el.style.setProperty('--scroll-offset', `${data.currentY}px`);
            });
        }
        
        requestAnimationFrame(render);
    }

    // Start render loop
    requestAnimationFrame(render);
}
