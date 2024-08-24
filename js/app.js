/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 */

/**
 * Define Global Variables
 */
const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');

/**
 * Build the navigation menu
 */
function buildNav() {
    sections.forEach(section => {
        const sectionId = section.id;
        const sectionData = section.getAttribute('data-nav');
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a class="menu__link" href="#${sectionId}">${sectionData}</a>`;
        navbarList.appendChild(listItem);
    });
}

/**
 * Add class 'active' to section when near top of viewport
 */
function setActiveSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            section.classList.add('your-active-class');
            document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
        } else {
            section.classList.remove('your-active-class');
            document.querySelector(`a[href="#${sectionId}"]`).classList.remove('active');
        }
    });
}

/**
 * Scroll to anchor ID using scrollTO event
 */
function scrollToSection(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Initialize the app
 */
function init() {
    buildNav();
    setActiveSection(); // Set initial active state
}

// Set up event listeners
window.addEventListener('scroll', setActiveSection);
navbarList.addEventListener('click', scrollToSection);

// Add scroll timer for navbar hiding
let scrollTimer;
window.addEventListener('scroll', () => {
    document.querySelector('.page__header').classList.add('scrolled');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        document.querySelector('.page__header').classList.remove('scrolled');
    }, 1000);
});

// Initialize the app
init();
