/* ========================================
   مؤسسة سلام للإعلان والتسويق
   JavaScript Functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // Preloader
    // ========================================
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function () {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    });

    // ========================================
    // Language Switcher
    // ========================================
    const langSwitcher = document.getElementById('langSwitcher');
    const langText = document.getElementById('langText');
    let currentLang = localStorage.getItem('lang') || 'ar';

    // Initialize language on page load
    setLanguage(currentLang);

    langSwitcher.addEventListener('click', function () {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(currentLang);
        localStorage.setItem('lang', currentLang);
    });

    function setLanguage(lang) {
        const html = document.documentElement;

        if (lang === 'en') {
            html.setAttribute('lang', 'en');
            html.setAttribute('dir', 'ltr');
            langText.textContent = 'عربي';
        } else {
            html.setAttribute('lang', 'ar');
            html.setAttribute('dir', 'rtl');
            langText.textContent = 'EN';
        }

        // Update all elements with data-ar and data-en attributes
        document.querySelectorAll('[data-ar][data-en]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                el.textContent = text;
            }
        });
    }

    // ========================================
    // Navigation Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveNavLink();
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Stats Counter Animation
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });

        statsAnimated = true;
    }

    // Trigger stats animation when section is in view
    const statsSection = document.getElementById('stats');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ========================================
    // Testimonials Slider
    // ========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i].classList.remove('active');
        });

        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(next);
    }

    // Auto-slide testimonials
    function startTestimonialSlider() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    startTestimonialSlider();

    // Click on dots to navigate
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            clearInterval(testimonialInterval);
            showTestimonial(index);
            startTestimonialSlider();
        });
    });

    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ========================================
    // Portfolio Data & Gallery Logic
    // ========================================
    const portfolioData = {
        designs: [
            'أعمالنا بالتصاميم/IMG-20250616-WA0007.jpg',
            'أعمالنا بالتصاميم/IMG-20250616-WA0008.jpg',
            'أعمالنا بالتصاميم/IMG-20250616-WA0009.jpg',
            'أعمالنا بالتصاميم/IMG-20250616-WA0010.jpg',
            'أعمالنا بالتصاميم/IMG-20250616-WA0011.jpg',
            'أعمالنا بالتصاميم/IMG-20250616-WA0012.jpg',
            'أعمالنا بالتصاميم/IMG-20250617-WA0000.jpg',
            'أعمالنا بالتصاميم/IMG-20250617-WA0001.jpg',
            'أعمالنا بالتصاميم/IMG-20250617-WA0002.jpg',
            'أعمالنا بالتصاميم/IMG-20250617-WA0003.jpg',
            'أعمالنا بالتصاميم/IMG-20250617-WA0004.jpg',
            'أعمالنا بالتصاميم/IMG-20250617-WA0005.jpg',
            'أعمالنا بالتصاميم/IMG-20251016-WA0009.jpg',
            'أعمالنا بالتصاميم/IMG-20251016-WA0010.jpg',
            'أعمالنا بالتصاميم/IMG-20251016-WA0011.jpg',
            'أعمالنا بالتصاميم/IMG-20251016-WA0012.jpg',
            'أعمالنا بالتصاميم/IMG-20251016-WA0013.jpg',
            'أعمالنا بالتصاميم/جمعة مباركة 1 copy.jpg'
        ],
        hajj: [
            'اعمالنا فيديو الحج/البشائر-1.mp4',
            'اعمالنا فيديو الحج/الزعم-3.mp4',
            'اعمالنا فيديو الحج/المتحدون بلاسك.mp4',
            'اعمالنا فيديو الحج/ايوب للسفريات-1.mp4',
            'اعمالنا فيديو الحج/بن وهاس-1.mp4',
            'اعمالنا فيديو الحج/حسان-1.mp4',
            'اعمالنا فيديو الحج/عامري 3-1.mp4',
            'اعمالنا فيديو الحج/عامري كاش-5.mp4',
            'اعمالنا فيديو الحج/عامري.mp4'
        ],
        congrats: [
            'تصاميم التهاني/IMG-20251214-WA0035.jpg',
            'تصاميم التهاني/IMG-20251214-WA0075.jpg',
            'تصاميم التهاني/IMG-20251214-WA0078.jpg',
            'تصاميم التهاني/IMG-20251214-WA0237.jpg',
            'تصاميم التهاني/IMG-20251215-WA0013.jpg',
            'تصاميم التهاني/IMG-20251217-WA0039.jpg',
            'تصاميم التهاني/IMG-20251218-WA0000.jpg',
            'تصاميم التهاني/IMG-20251218-WA0093.jpg'
        ],
        friday: [
            'تصاميم الدينيه (الجمعه)/IMG-20251211-WA0054.jpg',
            'تصاميم الدينيه (الجمعه)/IMG-20251211-WA0066.jpg',
            'تصاميم الدينيه (الجمعه)/IMG-20251211-WA0213.jpg',
            'تصاميم الدينيه (الجمعه)/IMG-20251211-WA0226.jpg',
            'تصاميم الدينيه (الجمعه)/IMG-20251212-WA0001.jpg',
            'تصاميم الدينيه (الجمعه)/IMG-20251212-WA0081.jpg'
        ],
        logos: [
            'شعارات/IMG-20240212-WA0005.jpg',
            'شعارات/IMG-20240227-WA0000.jpg',
            'شعارات/IMG-20240227-WA0001.jpg',
            'شعارات/IMG-20240227-WA0002.jpg',
            'شعارات/IMG-20240302-WA0000.jpg',
            'شعارات/IMG-20250126-WA0004.jpg',
            'شعارات/IMG-20250128-WA0003.jpg',
            'شعارات/IMG-20250128-WA0004.jpg',
            'شعارات/IMG-20250131-WA0002.jpg',
            'شعارات/IMG-20250131-WA0004.jpg',
            'شعارات/IMG-20250203-WA0001.jpg',
            'شعارات/IMG-20250211-WA0006.jpg'
        ],
        motion: [
            'فيديو الميوشن/AMERI.mp4',
            'فيديو الميوشن/العامري-1.mp4',
            'فيديو الميوشن/سلام للتسويق.mp4',
            'فيديو الميوشن/عامري-7.mp4',
            'فيديو الميوشن/كاش.mp4'
        ],
        montage: [
            'فيديوهات المنتاج/اركاديا.mp4',
            'فيديوهات المنتاج/اغرب عادات بولندا.mp4',
            'فيديوهات المنتاج/اغرب.mp4',
            'فيديوهات المنتاج/السلام للاعلان والتسويق.mp4',
            'فيديوهات المنتاج/بوارسوو.mp4',
            'فيديوهات المنتاج/سمرقند.mp4',
            'فيديوهات المنتاج/كازاخستان.mp4'
        ],
        ads: [
            'منشورات اعلانيه/FB_IMG_1761944781432.jpg',
            'منشورات اعلانيه/IMG-20251208-WA0002.jpg',
            'منشورات اعلانيه/IMG-20251208-WA0005.jpg',
            'منشورات اعلانيه/IMG-20251210-WA0028.jpg',
            'منشورات اعلانيه/تساعد (1).jpg',
            'منشورات اعلانيه/رغدان.png',
            'منشورات اعلانيه/مؤسسة-جود-للاثاث6.png'
        ]
    };

    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentGalleryItems = [];
    let currentIndex = 0;

    // ImageKit Base URL
    const IMAGEKIT_BASE_URL = 'https://ik.imagekit.io/anzznaqya/';

    // Expose openGallery to window for onclick events
    window.openGallery = function (category) {
        if (portfolioData[category]) {
            currentGalleryItems = portfolioData[category];
            currentIndex = 0;
            openLightbox();
        }
    };

    function openLightbox() {
        showLightboxItem();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxContent.innerHTML = '';
    }

    function showLightboxItem() {
        // Prepend Base URL to the relative path
        let itemPath = currentGalleryItems[currentIndex];

        // Encode the path to handle Arabic characters and spaces correctly
        // We split by '/' to encode each segment individually, avoiding encoding the '/' separators
        if (!itemPath.startsWith('http')) {
            itemPath = itemPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
            itemPath = IMAGEKIT_BASE_URL + itemPath;
        }

        const itemSrc = itemPath;
        const isVideo = itemSrc.toLowerCase().endsWith('.mp4');

        lightboxContent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'lightbox-media-container';

        if (isVideo) {
            const video = document.createElement('video');
            video.src = itemSrc;
            video.controls = true;
            video.autoplay = true;
            video.style.maxWidth = '100%';
            video.style.maxHeight = '85vh';
            container.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = itemSrc;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '85vh';
            img.style.objectFit = 'contain';
            container.appendChild(img);
        }

        // Add counter
        const counter = document.createElement('div');
        counter.className = 'lightbox-counter';
        counter.textContent = `${currentIndex + 1} / ${currentGalleryItems.length}`;
        counter.style.cssText = 'color: white; margin-top: 10px; font-size: 1.1rem;';

        lightboxContent.appendChild(container);
        lightboxContent.appendChild(counter);
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % currentGalleryItems.length;
        showLightboxItem();
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
        showLightboxItem();
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextItem);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevItem);

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                // In RTL, right arrow should go to previous item visually if we want natural feel, 
                // but usually right means next in logic. Let's stick to logical next/prev.
                // Or check direction? For simplicity, Right = Next.
                nextItem();
                break;
            case 'ArrowLeft':
                prevItem();
                break;
        }
    });

    // ========================================
    // Video Hover Play
    // ========================================
    const videoItems = document.querySelectorAll('.video-item');

    videoItems.forEach(item => {
        const video = item.querySelector('video');

        item.addEventListener('mouseenter', function () {
            video.play().catch(() => { });
        });

        item.addEventListener('mouseleave', function () {
            video.pause();
            video.currentTime = 0;
        });
    });

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll(
        '.about-card, .service-card, .package-card, .why-card, .management-option, .contact-card, .portfolio-item, .stat-card, .faq-item'
    );

    function reveal() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('reveal', 'active');
            }
        });
    }

    revealElements.forEach(element => {
        element.classList.add('reveal');
    });

    window.addEventListener('scroll', reveal);
    reveal();

    // ========================================
    // Parallax Effect for Hero Background
    // ========================================
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }

    // ========================================
    // Button Ripple Effect
    // ========================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #38b2ac 0%, #48bb78 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 5px 20px rgba(56, 178, 172, 0.3);
    `;
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    backToTopBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
    });

    backToTopBtn.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });

    console.log('🚀 مؤسسة سلام للإعلان والتسويق - الموقع جاهز!');
    console.log('📸 تم تحميل ' + portfolioItems.length + ' عمل في معرض الأعمال');
    console.log('🌐 اللغة الحالية: ' + currentLang);
});
