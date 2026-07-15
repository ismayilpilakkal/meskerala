document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Ensure elements are initially visible to GSAP by clearing conflicting styles
    gsap.set(".animate-fade-up", { clearProps: "all" });

    // Hero Reveal Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".creative-bg-shapes", {
        opacity: 0,
        duration: 1.2
    })
    // 2. Large text reveal from bottom using mask effect
    .from(".hero-title-text", {
        yPercent: 100,
        opacity: 0, // Fallback for browsers that don't clip well
        duration: 1,
        stagger: 0.1
    }, "-=0.6")
    // 3. Left card fade in and move up 60px
    .from(".hero-left-card", {
        y: 60,
        opacity: 0,
        duration: 0.9
    }, "-=0.6")
    // 4. Right card fade in and slide from right 80px
    .from(".hero-right-card", {
        x: 80,
        opacity: 0,
        duration: 0.9
    }, "-=0.7")
    // Description text
    .from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 0.6
    }, "-=0.5")
    // 7. CTA button fades in last
    .from(".hero-btn", {
        y: 20,
        opacity: 0,
        duration: 0.5
    }, "-=0.3")
    .from(".scroll-indicator", {
        opacity: 0,
        y: 10,
        duration: 0.5
    }, "-=0.2")
    // 5. Very subtle floating animation after appearance
    .add(() => {
        gsap.to(".floating-img-card", {
            y: -6,
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut" // sine is very smooth for floating
        });
    });

    // 8. Small Mouse Parallax
    const hero = document.querySelector(".creative-hero");
    if (hero) {
        hero.addEventListener("mousemove", (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const x = (e.clientX / window.innerWidth - 0.5);
            const y = (e.clientY / window.innerHeight - 0.5);

            // Heading: 5px
            gsap.to(".hero-title", {
                x: x * 5,
                y: y * 5,
                duration: 1.2,
                ease: "power2.out"
            });

            // Left Card: 8px
            gsap.to(".hero-left-card", {
                x: x * 8,
                // We only animate X here for parallax to avoid clashing with the continuous Y float animation
                duration: 1.2,
                ease: "power2.out"
            });

            // Right Card: 12px
            gsap.to(".hero-right-card", {
                x: x * 12,
                duration: 1.2,
                ease: "power2.out"
            });

            // Background: 3px
            gsap.to(".creative-bg-shapes", {
                x: x * -3, 
                y: y * -3,
                duration: 2,
                ease: "power2.out"
            });
        });

        // 9. Scroll Parallax
        // Heading moves slightly slower than the page
        gsap.to(".hero-title", {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
                trigger: ".creative-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Background moves even slower
        gsap.to(".creative-bg-shapes", {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
                trigger: ".creative-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
        
        // Cards remain fixed (no scroll trigger needed if they stay exactly where they are in the natural flow, 
        // but if they need to be fixed relative to viewport, they would be position: fixed. The natural scroll 
        // makes them move with the page, so to make them move slower, we can push them down slightly).
        // The prompt says "remain almost fixed".
    }
});
