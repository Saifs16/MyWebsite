document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    fetch('json/projects.json')
        .then(response => response.json())
        .then(projects => {
            const project = projects.find(p => p.id === projectId);
            if (project) {
                const projectDetail = document.getElementById('project-detail');
                projectDetail.innerHTML = `
                    <h2>${project.name}</h2>
                    <p><strong>Worked on by:</strong> ${project.teamMembers.join(', ')}<br>
                    <strong>Supervised by:</strong> ${project.supervisedBy}<br>
                    <strong>Sponsored by:</strong> ${project.sponsoredBy}</p>
                    <p>${project.detailedDescription}</p>
                    <p><strong>Skills used:</strong> ${project.skillsUsed.join(', ')}</p>
                    <p><strong>Hardware components:</strong> ${project.components.hardware.join(', ')}</p>
                    <p><strong>Software components:</strong> ${project.components.software.join(', ')}</p>
                    <p><strong>Purpose:</strong> ${project.purpose}</p>
                    <p><strong>Date started:</strong> ${project.dateStarted}<br>
                    <strong>Date concluded:</strong> ${project.dateConcluded}</p>
                `;
            } else {
                document.getElementById('project-detail').innerHTML = '<p>Project not found.</p>';
            }
        })
        .catch(error => console.error('Error loading project details:', error));
});
