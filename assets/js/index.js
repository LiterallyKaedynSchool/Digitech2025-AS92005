        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });

        // Mode toggle functionality
        document.querySelectorAll('.mode-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                // Add your theme switching logic here
                console.log('Theme toggle clicked');
            });
        });