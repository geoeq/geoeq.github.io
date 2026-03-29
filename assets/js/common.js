document.addEventListener('DOMContentLoaded', () => {
    // ---- THEME TOGGLE ----
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('svg');

    // Sun Icon SVG path
    const sunIcon = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    
    // Moon Icon SVG path
    const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeIcon.innerHTML = savedTheme === 'dark' ? sunIcon : moonIcon;

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        themeIcon.innerHTML = nextTheme === 'dark' ? sunIcon : moonIcon;
    });

    // ---- SEARCH FUNCTIONALITY ----
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const sidebarLinks = document.querySelectorAll('.sidebar-links a');
            
            sidebarLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                if (text.includes(query)) {
                    link.style.display = 'block';
                    link.closest('.sidebar-section').style.display = 'block';
                } else {
                    link.style.display = 'none';
                    // Check if other links in this section are visible
                    const section = link.closest('.sidebar-section');
                    const visibleLinks = section.querySelectorAll('.sidebar-links a[style="display: block;"]');
                    if (visibleLinks.length === 0) {
                        section.style.display = 'none';
                    }
                }
            });
            
            if (query === '') {
                sidebarLinks.forEach(link => {
                    link.style.display = 'block';
                    link.closest('.sidebar-section').style.display = 'block';
                });
            }
        });
    }

    // ---- MOBILE NAV ----
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // ---- COPY CODE ----
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Find the <pre> element within the same .code-container
            const container = btn.closest('.code-container');
            const pre = container.querySelector('pre');
            const code = pre.textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });
});
