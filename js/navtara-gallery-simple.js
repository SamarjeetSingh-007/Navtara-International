// Navtara Gallery JavaScript - Simplified Version

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    setupFilterButtons();
});

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    // Simple AOS implementation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
        
        // Add delay if specified
        const delay = el.getAttribute('data-aos-delay');
        if (delay) {
            el.style.transitionDelay = delay + 'ms';
        }
    });
}

// Setup filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            filterGalleryItems(filter, galleryItems);
        });
    });
}

// Filter gallery items with animation
function filterGalleryItems(filter, items) {
    items.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        // Add staggered animation delay
        setTimeout(() => {
            if (shouldShow) {
                item.classList.remove('filter-out', 'hidden');
                item.style.display = 'block';
                
                // Trigger reflow and add animation
                setTimeout(() => {
                    item.classList.add('aos-animate');
                }, 50);
            } else {
                item.classList.add('filter-out');
                
                // Hide after animation
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        }, index * 50);
    });
}
