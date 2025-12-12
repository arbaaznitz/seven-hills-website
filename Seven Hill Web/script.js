// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
        } else {
            document.body.style.overflow = 'auto';
            document.body.classList.remove('menu-open');
        }
    });
}

// Services dropdown toggle for mobile
const servicesDropdown = document.querySelector('.dropdown');
if (servicesDropdown) {
    const servicesLink = servicesDropdown.querySelector('.nav-link');
    
    servicesLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            servicesDropdown.classList.toggle('active');
        }
    });
}

// Close mobile menu when clicking on a link (except services dropdown)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close menu if clicking on services dropdown
        if (link.closest('.dropdown')) {
            return;
        }
        
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-open');
    });
});

// Close mobile menu when clicking outside or on backdrop
document.addEventListener('click', (e) => {
    if (nav && mobileMenuBtn) {
        // Check if click is outside nav and menu button
        const isClickInsideNav = nav.contains(e.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnMenuBtn && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Close services dropdown if open
            const servicesDropdown = document.querySelector('.dropdown');
            if (servicesDropdown) {
                servicesDropdown.classList.remove('active');
            }
        }
    }
});

// Smooth scrolling for navigation links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .product-card, .blog-card, .stat');
    animateElements.forEach(el => observer.observe(el));
    
    // Gallery filtering
    const galleryFilterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilterButtons.length > 0) {
        galleryFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                    }
                });
            });
        });
    }
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
    const searchTerm = prompt('Enter search term:');
    if (searchTerm) {
        // Simple search implementation
        const searchableText = document.body.textContent.toLowerCase();
        if (searchableText.includes(searchTerm.toLowerCase())) {
            alert(`Found results for "${searchTerm}"`);
        } else {
            alert(`No results found for "${searchTerm}"`);
        }
    }
});

// WhatsApp button click tracking
document.querySelectorAll('.whatsapp-btn, .whatsapp-float').forEach(btn => {
    btn.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('WhatsApp button clicked');
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h4');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Clients carousel
function initClientsCarousel() {
    const clientsWrap = document.getElementById('clientsWrap');
    const track = document.getElementById('clientsTrack');

    if (!clientsWrap || !track) {
        return;
    }

    const logos = [
        'asset/logo/proviso_group-removebg.png',
        'asset/logo/sai rama black.png',
        'asset/logo/manoj infra.png',
        'asset/logo/neel group.png',
        'asset/logo/juhi developers.png',
        'asset/logo/proviso_group-removebg.png',
        'asset/logo/sbw logistics.png',
        'asset/logo/shubham floors.png',
        'asset/logo/tulsi construction.png',
        
    ];

    const VISIBLE = 5;
    const ITEM_WIDTH = 150;
    const GAP = 20;
    const INTERVAL = 1500;

    const makeLogo = (src) => {
        const box = document.createElement('div');
        box.className = 'clients-logo';

        const img = document.createElement('img');
        img.src = src;
        img.alt = `Client logo ${src.replace('.png', '')}`;
        box.appendChild(img);

        return box;
    };

    const visibleSlots = Math.min(VISIBLE, logos.length);

    for (let i = 0; i < visibleSlots; i++) {
        track.appendChild(makeLogo(logos[i]));
    }

    if (logos.length <= visibleSlots) {
        return;
    }

    let pointer = visibleSlots % logos.length;
    let busy = false;

    const getShift = () => {
        const firstChild = track.firstElementChild;
        return (firstChild ? firstChild.getBoundingClientRect().width : ITEM_WIDTH) + GAP;
    };

    const shiftOnce = () => {
        if (busy) return;
        busy = true;

        const shiftValue = getShift();
        track.style.transition = 'transform 450ms ease';
        track.style.transform = `translateX(-${shiftValue}px)`;

        const onTransitionEnd = () => {
            track.removeEventListener('transitionend', onTransitionEnd);

            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';

            const first = track.firstElementChild;
            if (!first) {
                busy = false;
                return;
            }

            const nextLogo = logos[pointer % logos.length];
            pointer = (pointer + 1) % logos.length;

            const img = first.querySelector('img');
            if (img) {
                img.src = nextLogo;
            }

            track.appendChild(first);
            void track.offsetWidth;
            busy = false;
        };

        track.addEventListener('transitionend', onTransitionEnd);
    };

    let timer = setInterval(shiftOnce, INTERVAL);

    const pause = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };

    const resume = () => {
        if (!timer) {
            timer = setInterval(shiftOnce, INTERVAL);
        }
    };

    clientsWrap.addEventListener('mouseenter', pause);
    clientsWrap.addEventListener('mouseleave', resume);
}

document.addEventListener('DOMContentLoaded', initClientsCarousel);

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .service-card, .product-card, .blog-card, .stat {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.animate, .product-card.animate, .blog-card.animate, .stat.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style); 