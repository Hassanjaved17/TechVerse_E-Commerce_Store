// TECHVERSE - JavaScript Functionality

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

// ===== ADD BOUNCE ANIMATION FOR CART =====
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);


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

// Product Image Swap for Mobile
// const productImages = document.querySelectorAll('.product-image');
// const isTouchDevice = 'ontouchstart' in window;

// if (isTouchDevice) {
//     productImages.forEach(image => {
//         image.addEventListener('click', function (e) {
//             e.stopPropagation();
//             this.classList.toggle('active');
//         });
//     });

//     document.addEventListener('click', function (e) {
//         if (!e.target.closest('.product-image')) {
//             productImages.forEach(img => img.classList.remove('active'));
//         }
//     });
// }


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

            img.offsetHeight; // force reflow

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


// ===== END OF SCRIPT =====
