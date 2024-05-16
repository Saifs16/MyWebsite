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
            if (welcomeMessage) welcomeMessage.textContent = 'مرحبا بكم في موقعي الشخصي';
            if (homePageMessage) homePageMessage.textContent = 'هذه هي الصفحة الرئيسية.';
            if (aboutMessage) aboutMessage.textContent = 'عني';
            if (aboutPageMessage) aboutPageMessage.textContent = 'هذه هي صفحة حول.';
        } else if (language === 'jp') {
            if (welcomeMessage) welcomeMessage.textContent = '私の個人サイトへようこそ';
            if (homePageMessage) homePageMessage.textContent = 'これはホームページです。';
            if (aboutMessage) aboutMessage.textContent = '私について';
            if (aboutPageMessage) aboutPageMessage.textContent = 'これはアバウトページです。';
        }
    }


    // Initial flag display
    const initialFlag = selectedLang.querySelector('img') || document.createElement('img');
    initialFlag.src = 'https://flagsapi.com/US/flat/64.png';
    initialFlag.alt = 'English';
    initialFlag.width = 20;
    initialFlag.height = 20;
    selectedLang.appendChild(initialFlag);
});