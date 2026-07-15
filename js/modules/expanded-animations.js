document.addEventListener("DOMContentLoaded", () => {
    // 1. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.height = '0px';
                faq.querySelector('svg').style.transform = 'rotate(0deg)';
            });

            // Open clicked
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.height = answer.scrollHeight + 'px';
                item.querySelector('svg').style.transform = 'rotate(180deg)';
                item.querySelector('svg').style.transition = 'transform 0.4s ease';
            }
        });
    });

    // 2. Timeline Animation via GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const timelineContainer = document.getElementById('admission-timeline');
        if (timelineContainer) {
            const progressLine = document.getElementById('timeline-progress');
            const dots = gsap.utils.toArray('.timeline-dot');
            const contents = gsap.utils.toArray('.timeline-content');

            // Animate line
            gsap.to(progressLine, {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: timelineContainer,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1
                }
            });

            // Animate dots and content
            dots.forEach((dot, i) => {
                gsap.from(dot, {
                    scale: 0,
                    opacity: 0,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: dot,
                        start: "top 60%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
            
            contents.forEach((content, i) => {
                const xOffset = i % 2 === 0 ? 50 : -50;
                gsap.from(content, {
                    x: xOffset,
                    opacity: 0,
                    ease: "power3.out",
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: content,
                        start: "top 60%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        }
    }
});
