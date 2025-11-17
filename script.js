// Burger Menu Toggle
const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav');

if (burgerMenu && nav) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        nav.classList.toggle('active');

        // Update aria-expanded
        const isExpanded = nav.classList.contains('active');
        burgerMenu.setAttribute('aria-expanded', isExpanded);

        // Prevent body scroll when menu is open
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
            burgerMenu.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burgerMenu.contains(e.target) && nav.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
            burgerMenu.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Header Background on Scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0, 243, 255, 0.1)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateElements = document.querySelectorAll('.about-card, .price-card, .review-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form Handling (not used anymore, but kept for compatibility)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Get the submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <h4 style="color: var(--neon-blue); margin-bottom: 10px;">Заявка отправлена!</h4>
            <p style="color: var(--text-secondary);">Мы свяжемся с вами в течение 15 минут</p>
        `;

        // Insert success message before form
        contactForm.insertAdjacentElement('beforebegin', successMessage);

        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => successMessage.remove(), 300);
        }, 5000);

        // Log form data (in production, send to server)
        console.log('Form submitted:', data);

        // You can add actual form submission here:
        /*
        fetch('/api/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // Handle success
        })
        .catch(error => {
            // Handle error
        });
        */
    }, 1500);
    });
}

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic Neon Glow Effect
function createNeonEffect() {
    const neonElements = document.querySelectorAll('.neon-text');

    neonElements.forEach(element => {
        let intensity = 0;
        let increasing = true;

        setInterval(() => {
            if (increasing) {
                intensity += 0.05;
                if (intensity >= 1) increasing = false;
            } else {
                intensity -= 0.05;
                if (intensity <= 0.3) increasing = true;
            }

            element.style.textShadow = `
                0 0 ${10 * intensity}px rgba(0, 243, 255, ${0.5 * intensity}),
                0 0 ${20 * intensity}px rgba(0, 243, 255, ${0.3 * intensity}),
                0 0 ${30 * intensity}px rgba(0, 243, 255, ${0.2 * intensity})
            `;
        }, 100);
    });
}

// Initialize neon effect after page load
window.addEventListener('load', () => {
    createNeonEffect();
});

// Mobile Menu Toggle (if needed in future)
function initMobileMenu() {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');

    if (window.innerWidth <= 768) {
        // Mobile menu logic can be added here if needed
    }
}

window.addEventListener('resize', initMobileMenu);
initMobileMenu();

// Preloader Animation (Optional)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Price Card Hover Effect Enhancement
const priceCards = document.querySelectorAll('.price-card');

priceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Review Cards Animation
const reviewCards = document.querySelectorAll('.review-card');

reviewCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Scroll Progress Indicator (Optional Enhancement)
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--neon-blue), var(--neon-pink));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Count Animation for Numbers
function animateCount(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observe info boxes and animate numbers
const infoBoxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.info-number');
            if (numberElement && !numberElement.dataset.animated) {
                const text = numberElement.textContent;
                const number = parseInt(text);

                if (!isNaN(number)) {
                    numberElement.dataset.animated = 'true';
                    animateCount(numberElement, number);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.info-box').forEach(box => {
    infoBoxObserver.observe(box);
});

// Cursor Trail Effect (Optional - can be CPU intensive)
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced scroll handler
const debouncedScroll = debounce(() => {
    // Your scroll logic here
}, 10);

window.addEventListener('scroll', debouncedScroll);

console.log('%c👋 Привет, диджей!', 'font-size: 20px; color: #00f3ff; font-weight: bold;');
console.log('%cЗаинтересован в обучении? Записывайся на сайте! 🎧', 'font-size: 14px; color: #ff00ff;');

// Cookie Consent Banner
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookiesBtn = document.getElementById('acceptCookies');

// Check if user has already accepted cookies
if (!localStorage.getItem('cookiesAccepted')) {
    // Show banner after 1 second
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 1000);
}

// Handle accept button click
acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.classList.remove('show');
});
