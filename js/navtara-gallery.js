// Navtara Gallery JavaScript - Clean simplified implementation

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    setupFilterButtons();
    setupLazyLoading();
    setupImageErrorHandling();
    setupLoadMoreButton();
});

// Initialize AOS (Animate On Scroll) — lightweight observer
function initializeAOS() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('aos-animate');
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
        const delay = el.getAttribute('data-aos-delay');
        if (delay) el.style.transitionDelay = delay + 'ms';
    });
}

// Setup filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterGalleryItems(filter, galleryItems);
        });
    });
}

// Filter gallery items with a small stagger
function filterGalleryItems(filter, items) {
    items.forEach((item, index) => {
        const category = item.getAttribute('data-category') || '';
        const shouldShow = filter === 'all' || category === filter;

        setTimeout(() => {
            if (shouldShow) {
                item.classList.remove('filter-out');
                item.style.display = '';
                // trigger AOS animate class
                item.classList.add('aos-animate');
            } else {
                item.classList.add('filter-out');
                // hide after animation
                setTimeout(() => { item.style.display = 'none'; }, 420);
            }
        }, index * 45);
    });
}

// Lazy loading setup for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loading');
                    img.onload = () => { img.classList.remove('loading'); img.classList.add('loaded'); };
                    obs.unobserve(img);
                }
            });
        }, { rootMargin: '100px 0px' });
        images.forEach(img => io.observe(img));
    }
}

// Replace broken images with a placeholder
function setupImageErrorHandling() {
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            this.alt = 'Image not available';
        });
    });
}

// Setup load more button (keeps behavior but simplified)
function setupLoadMoreButton() {
    const btn = document.querySelector('.load-more-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        btn.disabled = true; btn.querySelector('span')?.textContent = 'Loading...';
        setTimeout(() => {
            // In this simplified setup we just hide the button after simulated load
            btn.style.display = 'none';
        }, 1200);
    });
}

