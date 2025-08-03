document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navButtons.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            if (menuToggle.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navButtons.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonialSlider && testimonials.length > 0) {
        let currentIndex = 0;
        const testimonialWidth = testimonials[0].offsetWidth + 30; // Width + gap
        
        // Auto-scroll testimonials on larger screens
        if (window.innerWidth > 768) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                testimonialSlider.scrollTo({
                    left: currentIndex * testimonialWidth,
                    behavior: 'smooth'
                });
            }, 5000);
        }
    }
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.step, .benefit-card, .testimonial, .use-case, .pricing-card');
    
    const animateOnScroll = () => {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .step, .benefit-card, .testimonial, .use-case, .pricing-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .step.animate, .benefit-card.animate, .testimonial.animate, .use-case.animate, .pricing-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-links.active, .nav-buttons.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: var(--background-white);
            padding: 20px;
            box-shadow: var(--shadow-light);
            z-index: 999;
        }
        
        .nav-links.active {
            gap: 15px;
        }
        
        .nav-buttons.active {
            top: calc(70px + 40px + 15px * 4); /* Header height + padding + links height */
            gap: 10px;
        }
        
        header.sticky {
            box-shadow: var(--shadow-medium);
            animation: slideDown 0.3s ease-in-out;
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-100%);
            }
            to {
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
});