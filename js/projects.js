document.addEventListener('DOMContentLoaded', function () {
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
