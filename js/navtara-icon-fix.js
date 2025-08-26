// Navtara International - Icon Fix Script
document.addEventListener('DOMContentLoaded', function() {
    // Function to fix missing icons
    function fixMissingIcons() {
        // Find all icon elements that might be missing
        const iconElements = document.querySelectorAll('.elementor-icon, .eicon, .fa, .fas, .fab, .far');
        
        iconElements.forEach(function(icon) {
            // Check if icon is empty or showing as square
            if (icon.innerHTML.trim() === '' || icon.offsetWidth < 5) {
                // Add fallback icon based on context
                const parent = icon.closest('.elementor-widget');
                let fallbackIcon = 'fas fa-star'; // default icon
                
                // Determine appropriate icon based on context
                if (parent) {
                    const widgetType = parent.getAttribute('data-widget_type');
                    if (widgetType && widgetType.includes('heading')) {
                        fallbackIcon = 'fas fa-industry';
                    } else if (widgetType && widgetType.includes('button')) {
                        fallbackIcon = 'fas fa-arrow-right';
                    } else if (widgetType && widgetType.includes('icon')) {
                        fallbackIcon = 'fas fa-cog';
                    }
                }
                
                // Check content for textile/manufacturing keywords
                const textContent = icon.closest('.elementor-widget')?.textContent?.toLowerCase() || '';
                if (textContent.includes('textile') || textContent.includes('fabric')) {
                    fallbackIcon = 'fas fa-tshirt';
                } else if (textContent.includes('factory') || textContent.includes('manufacturing')) {
                    fallbackIcon = 'fas fa-industry';
                } else if (textContent.includes('quality') || textContent.includes('inspection')) {
                    fallbackIcon = 'fas fa-check-circle';
                } else if (textContent.includes('design') || textContent.includes('development')) {
                    fallbackIcon = 'fas fa-pencil-ruler';
                }
                
                icon.className = `elementor-icon ${fallbackIcon}`;
                icon.innerHTML = '';
            }
        });
        
        // Fix navigation icons
        const navIcons = document.querySelectorAll('.elementor-nav-menu .menu-item');
        navIcons.forEach(function(item) {
            const icon = item.querySelector('.elementor-icon, .fa');
            if (icon && (icon.innerHTML.trim() === '' || icon.offsetWidth < 5)) {
                icon.className = 'elementor-icon fas fa-chevron-right';
            }
        });
    }
    
    // Run the fix
    fixMissingIcons();
    
    // Run again after a delay for dynamic content
    setTimeout(fixMissingIcons, 1000);
    setTimeout(fixMissingIcons, 3000);
});

// Add CSS for icon styling
const iconCSS = `
<style>
.elementor-icon {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 1em !important;
    color: var(--navtara-primary, #1e3a8a) !important;
}

.elementor-icon:before {
    font-family: "Font Awesome 5 Free", "Font Awesome 5 Brands" !important;
    font-weight: 900 !important;
    display: inline-block !important;
}

.missing-icon-placeholder {
    width: 40px;
    height: 40px;
    background: var(--navtara-primary, #1e3a8a);
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: bold;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', iconCSS);
