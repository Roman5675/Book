//Слайдер swiper
new Swiper('.price-slider', {
    slidesPerView: 3,
    simulateTouch: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    spaceBetween: 87,
    loop: true,
    loopedSlides: 0,
    breakpoints: {
        1400: {
            slidesPerView: 3
        },
        993: {
            slidesPerView: 2
        },
        0: {
            slidesPerView: 1
        },

    },
});

//Всплывающий header при scroll
window.onscroll = function showHeader () {

    let header = document.querySelector('.header');

    if(window.pageYOffset > 80) {
        header.classList.add('header__fixed')
    } else{
        header.classList.remove('header__fixed')
    }
}

//Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

//Прокрутка при клике на меню header
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            
            if(iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

//Прокрутка при клике на меню footer
const footerLinks = document.querySelectorAll('.footer__link[data-goto]');
if(footerLinks.length > 0) {
    footerLinks.forEach(footerLink => {
        footerLink.addEventListener("click", onFooterLinkClick);
    });
    function onFooterLinkClick(e) {
        const footerLink = e.target;
        if (footerLink.dataset.goto && document.querySelector(footerLink.dataset.goto)) {
            const gotoBlock = document.querySelector(footerLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

//Прокрутка при клике на Sign up
const signUp = document.querySelectorAll('.intro__link[data-goto]');
if(signUp.length > 0) {
    signUp.forEach(signUp => {
        signUp.addEventListener("click", onSignUpLinkClick);
    });
    function onSignUpLinkClick(e) {
        const signUp = e.target;
        if (signUp.dataset.goto && document.querySelector(signUp.dataset.goto)) {
            const gotoBlock = document.querySelector(signUp.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}