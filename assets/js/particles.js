// Clean, CSP-safe JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // PARTICLES CREATION
    function createParticles() {
        const particlesContainer = document.getElementById('body-particles');
        if (!particlesContainer) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // Create particles immediately
    createParticles();

    // FIXED DARK MODE TOGGLE
    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('jss-theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
        }

        modeToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark-mode');
            
            // Save preference
            if (document.documentElement.classList.contains('dark-mode')) {
                localStorage.setItem('jss-theme', 'dark');
            } else {
                localStorage.setItem('jss-theme', 'light');
            }
        });
    }

    // CLICK-BASED DROPDOWN FUNCTIONALITY
    const navItems = document.querySelectorAll('.nav-item.has-dropdown');
    let activeDropdown = null;

    navItems.forEach(function(item) {
        const dropdown = item.querySelector('.fullscreen-dropdown');
        const navLink = item.querySelector('.nav-link');
        
        if (dropdown && navLink) {
            // Add close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'dropdown-close';
            closeBtn.textContent = '×';
            dropdown.appendChild(closeBtn);
            
            // Show dropdown on click
            navLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (activeDropdown === dropdown) {
                    hideDropdown(dropdown);
                } else {
                    closeAllDropdowns();
                    showDropdown(dropdown);
                }
            });
            
            // Close button functionality
            closeBtn.addEventListener('click', function() {
                hideDropdown(dropdown);
            });
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && activeDropdown) {
            hideDropdown(activeDropdown);
        }
    });
    
    // Close when clicking overlay
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('dropdown-overlay')) {
            hideDropdown(activeDropdown);
        }
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.fullscreen-dropdown')) {
            closeAllDropdowns();
        }
    });
    
    function showDropdown(dropdown) {
        activeDropdown = dropdown;
        dropdown.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function hideDropdown(dropdown) {
        if (dropdown) {
            dropdown.classList.remove('active');
            activeDropdown = null;
            document.body.style.overflow = '';
        }
    }
    
    function closeAllDropdowns() {
        navItems.forEach(function(item) {
            const dropdown = item.querySelector('.fullscreen-dropdown');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
        });
        document.body.style.overflow = '';
        activeDropdown = null;
    }
});