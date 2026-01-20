// ============================================
// TECHVERSE - JavaScript Functionality
// ============================================

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

// ===== CART FUNCTIONALITY =====
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

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

// ===== STICKY NAVBAR SHADOW ON SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// ===== ADD BOUNCE ANIMATION FOR CART =====
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

// ===== PRODUCT CARD ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';

            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all product cards
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// ===== SEARCH FUNCTIONALITY (BASIC) =====
const searchIcon = document.querySelector('.fa-search');
if (searchIcon) {
    searchIcon.addEventListener('click', () => {
        alert('Search functionality coming soon!');
    });
}

// ===== USER ICON FUNCTIONALITY =====
const userIcon = document.querySelector('.fa-user');
if (userIcon) {
    userIcon.addEventListener('click', () => {
        alert('Login/Register functionality coming soon!');
    });
}

// ===== CONSOLE LOG =====
console.log('%c🚀 TechVerse Website Loaded Successfully!', 'color: #4aa3df; font-size: 16px; font-weight: bold;');
console.log('%cCart Items:', 'color: #4aa3df; font-weight: bold;', cartCount);



// Product Image Swap for Mobile
const productImages = document.querySelectorAll('.product-image');
const isTouchDevice = 'ontouchstart' in window;

if (isTouchDevice) {
    productImages.forEach(image => {
        image.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.product-image')) {
            productImages.forEach(img => img.classList.remove('active'));
        }
    });
}

// ===== END OF SCRIPT =====
