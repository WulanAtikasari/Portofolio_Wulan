        const hamburgerBtn = document.getElementById('hamburger-btn');
        const navLinks = document.getElementById('nav-links');
        const drawerOverlay = document.getElementById('drawer-overlay');

        function toggleDrawer() {
            const isOpen = navLinks.classList.toggle('open');
            drawerOverlay.classList.toggle('show', isOpen);
            document.body.classList.toggle('drawer-open', isOpen);
            
            const icon = hamburgerBtn.querySelector('i');
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-xmark', isOpen);
        }

        hamburgerBtn.addEventListener('click', toggleDrawer);
        drawerOverlay.addEventListener('click', toggleDrawer);

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    toggleDrawer();
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
                toggleDrawer();
            }
        });

        // Theme Switcher
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeIcon = themeToggleBtn.querySelector('i');
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        });

        // Project Filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card[data-category]');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });

        // Copy Text Helper
        window.copyText = function copyText(text, btn) {
            navigator.clipboard.writeText(text).then(() => {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
                btn.style.color = '#166534';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.color = '';
                }, 2000);
            });
        }

        // FormSubmit Email API Connector
        const contactForm = document.getElementById('contact-form');
        const formAlert = document.getElementById('form-alert');
        const btnSubmit = document.getElementById('btn-submit');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            fetch('https://formsubmit.co/ajax/atikasari904@gmail.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _subject: `New Portfolio Message from ${name}`
                })
            })
            .then(response => response.json())
            .then(data => {
                formAlert.style.display = 'block';
                formAlert.style.background = '#dcfce7';
                formAlert.style.color = '#166534';
                formAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent directly to Wulan\'s email.';
                contactForm.reset();
            })
            .catch(error => {
                window.location.href = `mailto:atikasari904@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
                
                formAlert.style.display = 'block';
                formAlert.style.background = '#fef3c7';
                formAlert.style.color = '#92400e';
                formAlert.innerHTML = '<i class="fa-solid fa-envelope"></i> Opening your default email app to send...';
            })
            .finally(() => {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
                setTimeout(() => { formAlert.style.display = 'none'; }, 5000);
            });
        });

        // Scrollspy & Back to Top Button
        const backToTopBtn = document.getElementById('back-to-top');
        const sections = document.querySelectorAll('section');
        const navAnchorLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }

            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 110;
                if (window.scrollY >= sectionTop) {
                    currentSection = section.getAttribute('id');
                }
            });

            // Competencies and Skills share one nav link
            const sectionAliases = { skills: 'competencies' };
            const activeSection = sectionAliases[currentSection] || currentSection;

            navAnchorLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeSection}`) {
                    link.classList.add('active');
                }
            });
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
