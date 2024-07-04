document.addEventListener('DOMContentLoaded', function() {
    const selectedLang = document.querySelector('.selected-lang');
    const langOptions = document.querySelectorAll('.lang-menu ul li a');
    const langMenu = document.querySelector('.lang-menu ul');
    let isHovering = false;

    selectedLang.addEventListener('click', function(event) {
        event.stopPropagation();
        langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
    });

    langOptions.forEach(option => {
        option.addEventListener('click', function(event) {
            event.preventDefault();
            const language = this.classList[0];
            selectedLang.innerHTML = `${this.textContent} <img src="${this.querySelector('img').src}" alt="${this.textContent}">`;
            switchLanguage(language);
            langMenu.style.display = 'none';
        });
    });

    document.addEventListener('click', function() {
        if (!isHovering) {
            langMenu.style.display = 'none';
        }
    });

    selectedLang.addEventListener('mouseenter', function() {
        isHovering = true;
        langMenu.style.display = 'block';
    });

    selectedLang.addEventListener('mouseleave', function() {
        isHovering = false;
        setTimeout(() => {
            if (!isHovering) {
                langMenu.style.display = 'none';
            }
        }, 300);
    });

    langMenu.addEventListener('mouseenter', function() {
        isHovering = true;
        langMenu.style.display = 'block';
    });

    langMenu.addEventListener('mouseleave', function() {
        isHovering = false;
        setTimeout(() => {
            if (!isHovering) {
                langMenu.style.display = 'none';
            }
        }, 300);
    });

    function switchLanguage(language) {
        const welcomeMessage = document.getElementById('welcome-message');
        const homePageMessage = document.getElementById('home-page-message');
        const aboutMessage = document.getElementById('about-message');
        const aboutPageMessage = document.getElementById('about-page-message');

        if (language === 'en') {
            if (welcomeMessage) welcomeMessage.textContent = 'Welcome to My Personal Website';
            if (homePageMessage) homePageMessage.textContent = 'This is the home page.';
            if (aboutMessage) aboutMessage.textContent = 'About Me';
            if (aboutPageMessage) aboutPageMessage.textContent = 'This is the about page.';
        } else if (language === 'ar') {
            if (welcomeMessage) welcomeMessage.textContent = 'حياكم بصفحتي الخاصة';
            if (homePageMessage) homePageMessage.textContent = '.هذه هي الصفحة الرئيسية';
            if (aboutMessage) aboutMessage.textContent = 'السيرة الذاتية';
            if (aboutPageMessage) aboutPageMessage.textContent = '.معلومات عني';
        } else if (language === 'jp') {
            if (welcomeMessage) welcomeMessage.textContent = '私の個人サイトへようこそ';
            if (homePageMessage) homePageMessage.textContent = 'これはホームページです。';
            if (aboutMessage) aboutMessage.textContent = '私について';
            if (aboutPageMessage) aboutPageMessage.textContent = 'これはアバウトページです。';
        }
    }

    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        // Load skill colors from skills.json and then load projects
        fetch('json/skills.json')
            .then(response => response.json())
            .then(skillColors => {
                console.log('Skill colors loaded:', skillColors);  // Add logging for skill colors
                // Load projects.json and populate project cards
                fetch('json/projects.json')
                    .then(response => response.json())
                    .then(projects => {
                        console.log('Projects loaded:', projects);  // Add logging for projects
                        const limitedProjects = projects.slice(0, 3); // Limit to the first 3 projects
                        limitedProjects.forEach(project => {
                            const projectCard = document.createElement('div');
                            projectCard.className = 'project-card';

                            const skillsHTML = project.skillsUsed.map(skill => {
                                const skillColor = skillColors[skill] || '#000';  // Default to black if no color is defined
                                return `<span class="skill-pill" style="background-color:${skillColor};">${skill}</span>`;
                            }).join(' ');

                            projectCard.innerHTML = `
                                <img src="images/placeholder.png" alt="${project.name}">
                                <div class="card-content">
                                    <h3>${project.name}</h3>
                                    <p>${project.conciseDescription}</p>
                                    <div class="skills">${skillsHTML}</div>
                                    <div class="date">${project.dateStarted} - ${project.dateConcluded}</div>
                                </div>
                            `;

                            let isLongPress = false;
                            let pressTimer;

                            projectCard.addEventListener('mousedown', () => {
                                pressTimer = setTimeout(() => {
                                    isLongPress = true;
                                }, 250);
                            });

                            projectCard.addEventListener('mouseup', () => {
                                clearTimeout(pressTimer);
                                if (!isLongPress) {
                                    window.location.href = `project-detail.html?id=${project.id}`;
                                }
                                isLongPress = false;
                            });

                            projectCard.querySelectorAll('.skill-pill').forEach(skillPill => {
                                skillPill.addEventListener('mousedown', (event) => {
                                    event.stopPropagation();
                                });
                                skillPill.addEventListener('mouseup', (event) => {
                                    event.stopPropagation();
                                });
                                skillPill.addEventListener('click', (event) => {
                                    event.stopPropagation();
                                });
                            });

                            projectsSection.appendChild(projectCard);
                        });
                    })
                    .catch(error => {
                        console.error('Error loading projects:', error);  // Log errors
                        alert('Failed to load projects: ' + error.message);  // Show alert on error
                    });
            })
            .catch(error => {
                console.error('Error loading skills:', error);  // Log errors
                alert('Failed to load skill colors: ' + error.message);  // Show alert on error
            });
    }

        // Dark mode toggle
        const darkModeToggle = document.querySelector('.dark-mode-toggle .material-icons');

        darkModeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                darkModeToggle.textContent = 'light_mode';
                darkModeToggle.style.color = 'yellow';
            } else {
                darkModeToggle.textContent = 'dark_mode';
                darkModeToggle.style.color = '';
            }
        });
});
// Pop up functions -- Remove once website reaches completion
document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.querySelector(".dark-mode-toggle");

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const darkModeEnabled = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", darkModeEnabled);
    });

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("close-popup");
    const overlay = document.getElementById("overlay");

    function showPopup() {
        popup.style.display = "flex";
        overlay.style.display = "block"; // Show the overlay
        document.body.style.overflow = "hidden"; // Prevent scrolling on the body
    }

    function hidePopup() {
        popup.style.display = "none";
        overlay.style.display = "none"; // Hide the overlay
        document.body.style.overflow = "auto"; // Restore scrolling on the body
    }

    closePopup.addEventListener("click", hidePopup);

    // Check if popup should be shown
    if (!sessionStorage.getItem("popupClosed")) {
        showPopup(); // Call your function to show the popup

        // Set a click event listener on the close button inside the popup
        document.getElementById("popupCloseButton").addEventListener("click", function() {
            // Mark the popup as closed in sessionStorage
            sessionStorage.setItem("popupClosed", "true");
            hidePopup();
        });
    }

    // Reset popupShown if the session has ended or the page is refreshed
    if (!sessionStorage.getItem("popupShown")) {
        sessionStorage.setItem("popupShown", "true");
    } else {
        sessionStorage.removeItem("popupClosed");
    }
});

