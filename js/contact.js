document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.querySelector('.dark-mode-toggle .material-icons');

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = 'light_mode';
            darkModeToggle.classList.add('sun-icon');
        } else {
            darkModeToggle.textContent = 'dark_mode';
            darkModeToggle.classList.remove('sun-icon');
        }
    });
});
