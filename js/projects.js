document.addEventListener('DOMContentLoaded', function () {
    const selectedLang = document.querySelector('.selected-lang');
    const langOptions = document.querySelectorAll('.lang-menu ul li a');
    const langMenu = document.querySelector('.lang-menu ul');
    let isHovering = false;

    selectedLang.addEventListener('click', function (event) {
        event.stopPropagation();
        langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
    });

    langOptions.forEach(option => {
        option.addEventListener('click', function (event) {
            event.preventDefault();
            const language = this.classList[0];
            selectedLang.innerHTML = `${this.textContent} <img src="${this.querySelector('img').src}" alt="${this.textContent}">`;
            switchLanguage(language);
            langMenu.style.display = 'none';
        });
    });

    document.addEventListener('click', function () {
        if (!isHovering) {
            langMenu.style.display = 'none';
        }
    });

    selectedLang.addEventListener('mouseenter', function () {
        isHovering = true;
        langMenu.style.display = 'block';
    });

    selectedLang.addEventListener('mouseleave', function () {
        isHovering = false;
        setTimeout(() => {
            if (!isHovering) {
                langMenu.style.display = 'none';
            }
        }, 300);
    });

    langMenu.addEventListener('mouseenter', function () {
        isHovering = true;
        langMenu.style.display = 'block';
    });

    langMenu.addEventListener('mouseleave', function () {
        isHovering = false;
        setTimeout(() => {
            if (!isHovering) {
                langMenu.style.display = 'none';
            }
        }, 300);
    });

    function switchLanguage(language) {
        const projectsMessage = document.getElementById('projects-message');
        const projectsPageMessage = document.getElementById('projects-page-message');

        if (language === 'en') {
            if (projectsMessage) projectsMessage.textContent = 'Projects';
            if (projectsPageMessage) projectsPageMessage.textContent = 'Here are some of my projects.';
        } else if (language === 'ar') {
            if (projectsMessage) projectsMessage.textContent = 'المشاريع';
            if (projectsPageMessage) projectsPageMessage.textContent = '.سجل مشاريعي';
        } else if (language === 'jp') {
            if (projectsMessage) projectsMessage.textContent = 'プロジェクト';
            if (projectsPageMessage) projectsPageMessage.textContent = 'ここに私のプロジェクトのいくつかがあります。';
        }
    }

    // Load skill colors from skills.json and then load projects
    fetch('json/skills.json')
        .then(response => response.json())
        .then(skillColors => {
            fetch('json/projects.json')
                .then(response => response.json())
                .then(projects => {
                    const projectsSection = document.getElementById('projects-section');
                    projects.forEach(project => {
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
                .catch(error => console.error('Error loading projects:', error));
        })
        .catch(error => console.error('Error loading skills:', error));
});
