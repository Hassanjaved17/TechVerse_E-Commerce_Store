

// ===== MOBILE NAVIGATION TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Change icon
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Cart Functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart span');
const addToCartButtons = document.querySelectorAll('.product-card button');

if (addToCartButtons) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            alert('Product added to cart!');
            // Increment cart
            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }

            // Visual feedback
            this.textContent = 'Added!';
            this.style.background = '#4aa3df';
            this.style.color = '#fff';
            this.style.borderColor = '#4aa3df';

            // Reset button after 1.5 seconds
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '';
                this.style.color = '';
                this.style.borderColor = '';
            }, 1500);

            // Animate cart icon
            const cartIcon = document.querySelector('.cart');
            if (cartIcon) {
                cartIcon.style.animation = 'bounce 0.5s';
                setTimeout(() => {
                    cartIcon.style.animation = '';
                }, 500);
            }
        });
    });
}

// ===== Add Bounce Animation For Cart
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);


// Search Icon Functionality
const searchIcon = document.querySelector('.fa-search');
if (searchIcon) {
    searchIcon.addEventListener('click', () => {
        alert('Search functionality coming soon!');
    });
}

// User Icon Functionality
const userIcon = document.querySelector('.fa-user');
if (userIcon) {
    userIcon.addEventListener('click', () => {
        alert('Login/Register functionality coming soon!');
    });
}

// Swap Product Images on Hover For Desktop and Tap for Mobile
document.querySelectorAll('.product-image img').forEach(img => {
    const mainSrc = img.dataset.main;
    const hoverSrc = img.dataset.hover;

    let animating = false;
    img.classList.add('center');

    function getDirection(e) {
        const rect = img.getBoundingClientRect();
        return (e.clientX - rect.left) < rect.width / 2 ? 'left' : 'right';
    }

    function slideSwap(newSrc, direction) {
        if (animating || img.src.includes(newSrc)) return;
        animating = true;

        const outClass = direction === 'left' ? 'out-right' : 'out-left';
        const inClass = direction === 'left' ? 'in-left' : 'in-right';

        img.classList.remove('center');
        img.classList.add(outClass);

        setTimeout(() => {
            img.src = newSrc;

            img.classList.remove(outClass);
            img.classList.add(inClass);

            img.offsetHeight;

            img.classList.remove(inClass);
            img.classList.add('center');

            setTimeout(() => animating = false, 450);
        }, 220);
    }

    img.addEventListener('mouseenter', e => {
        slideSwap(hoverSrc, getDirection(e));
    });

    img.addEventListener('mouseleave', e => {
        slideSwap(mainSrc, getDirection(e));
    });

    // Mobile tap support
    img.addEventListener('click', () => {
        const showingHover = img.src.includes(hoverSrc);
        slideSwap(showingHover ? mainSrc : hoverSrc, 'right');
    });
});

// Read More / Read Less Functionality
function toggleReadMore() {
    const moreText = document.querySelector('.more-text');
    const btn = document.querySelector('.read-more-btn');

    if (moreText.classList.contains('show')) {
        moreText.classList.remove('show');
        btn.textContent = 'Read More';
    } else {
        moreText.classList.add('show');
        btn.textContent = 'Read Less';
    }
}

// Testimonial Slider Functionality
const testimonials = [
    {
        text: "TechVerse has completely transformed my tech shopping experience. Their selection of gadgets is unmatched, and the customer service is exceptional. I recently purchased a smart watch and wireless earbuds, and both products exceeded my expectations.",
        moreText: " The free delivery was incredibly fast, and the quality guarantee gave me peace of mind. I've recommended TechVerse to all my friends and family. The daily offers keep me coming back, and I love how secure their payment system is.",
        name: "SARAH JOHNSON",
        rating: 4.5
    },
    {
        text: "As a tech enthusiast, I'm always looking for the latest gadgets. TechVerse never disappoints! The VR headset I bought was amazing, and their prices are unbeatable. The website is easy to navigate, and checkout was seamless.",
        moreText: " Customer support answered all my questions promptly. The product arrived perfectly packaged and works flawlessly. I'll definitely be shopping here again for all my tech needs!",
        name: "MICHAEL CHEN",
        rating: 5
    },
    {
        text: "I was hesitant to shop online for electronics, but TechVerse made it so easy! The quality guarantee and secure payment options gave me confidence. My smart speaker arrived in perfect condition, and the sound quality is incredible.",
        moreText: " The daily deals helped me save money on accessories too. TechVerse has become my go-to store for all things tech. Highly recommend to anyone looking for reliable gadgets!",
        name: "EMILY RODRIGUEZ",
        rating: 4.5
    }
];

let currentTestimonial = 0;

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    const textElement = document.getElementById('testimonialText');
    const nameElement = document.querySelector('.customer-name');
    const btn = document.querySelector('.read-more-btn');

    // Update text
    textElement.innerHTML = `
        ${testimonial.text}
        <span class="more-text">${testimonial.moreText}</span>
    `;

    // Update name
    nameElement.textContent = testimonial.name;

    // Reset read more button
    btn.textContent = 'Read More';

    // Update star rating
    updateStarRating(testimonial.rating);
}

function updateStarRating(rating) {
    const starContainer = document.querySelector('.star-rating');
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    let starsHTML = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fa fa-star"></i>';
    }

    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fa fa-star-half-alt"></i>';
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    starContainer.innerHTML = starsHTML;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();

    // Animation effect
    const content = document.querySelector('.testimonial-content');
    content.style.opacity = '0';
    content.style.transform = 'translateX(30px)';

    setTimeout(() => {
        content.style.transition = 'all 0.5s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateX(0)';
    }, 50);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();

    // Animation effect
    const content = document.querySelector('.testimonial-content');
    content.style.opacity = '0';
    content.style.transform = 'translateX(-30px)';

    setTimeout(() => {
        content.style.transition = 'all 0.5s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateX(0)';
    }, 50);
}

// Newsletter Subscription Functionality

function handleSubscribe(event) {
    event.preventDefault();

    const input = event.target.querySelector('input');
    const email = input.value;

    if (email) {
        // Show success message
        alert(`Thank you for subscribing! We'll send updates to ${email}`);

        // Show notification
        showNotification('Successfully subscribed!');

        // Clear input
        input.value = '';
    }
}

//  Better notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4aa3df;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize first testimonial
    updateTestimonial();
});

// Banner Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.slider-dots .dot');

// Show specific slide
function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto slide every 5 seconds
let autoSlideInterval = setInterval(nextSlide, 5000);

// Pause auto-slide on hover
const bannerSlider = document.querySelector('.banner-slider');

if (bannerSlider) {
    bannerSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    bannerSlider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        // Reset auto-slide timer
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        // Reset auto-slide timer
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (bannerSlider) {
    bannerSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    bannerSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous slide
        prevSlide();
    }
    // Reset auto-slide timer
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Initialize first slide
document.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        showSlide(0);
    }
});


// Scroll Spy Functionality
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove("active"));

            const activeLink = document.querySelector(
                `.nav-links a[href="#${sectionId}"]`
            );

            if (activeLink) activeLink.classList.add("active");
        }
    });
});

// ===== END OF SCRIPT =====


/*
  Project : TechVerse
  Author  : Hassan Javed
  Role    : Frontend Design & Development
  Year    : 2026
*/
