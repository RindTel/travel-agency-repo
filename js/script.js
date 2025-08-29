// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // Create dot indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        // Add click event listener to each dot
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Function to go to a specific slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Next slide function
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide function
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Add event listeners to buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Auto slide every 10 seconds
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 10000);
    }

    // Start the slideshow
    startSlideShow();
});

// Mouse follower
const cursor = document.querySelector('.cursor');
const cursorInner = document.querySelector('.cursor-inner');
let isHovering = false;

// Elements that should trigger the cursor effect
const interactiveElements = document.querySelectorAll('a, button, .search-container, .nav-toggle, .nav-menu a, .cta-button, .hero-slider, .slider-dots, .dot');

// Initialize cursor position
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorInner.style.left = e.clientX + 'px';
    cursorInner.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        isHovering = true;
        cursor.classList.add('cursor-hover');
        cursorInner.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
        isHovering = false;
        cursor.classList.remove('cursor-hover');
        cursorInner.classList.remove('cursor-hover');
    });
});

// Hide cursor when leaving the window
document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
    cursorInner.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
    cursorInner.style.display = 'block';
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Preload images to prevent white flashes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
    
    // Ensure sections have background color before they're visible
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Force a repaint to ensure background is applied
        section.style.display = 'none';
        section.offsetHeight; // Trigger reflow
        section.style.display = '';
    });
}); 