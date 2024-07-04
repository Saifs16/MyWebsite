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

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Collect form data using FormData API
        const formData = new FormData(contactForm);

        // Example: Log form data to console
        console.log({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        });

        // Here you can send formData to your backend for processing
        // Replace 'your-server-endpoint-url' with your actual backend endpoint
        fetch('your-server-endpoint-url', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Handle success
                console.log('Message sent successfully!');
                // Optionally clear the form
                contactForm.reset();
            } else {
                // Handle error
                console.error('Failed to send message');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
