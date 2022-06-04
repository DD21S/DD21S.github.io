//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const validateEmail = function (email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    const contactForm = document.querySelector('#contactForm');

    const handlingForm = function (e) {
        e.preventDefault();

        document.querySelector("#success-message").style.display = "none";
        document.querySelector("#error-message").style.display = "none";

        let name = contactForm['fname'].value
        let email = contactForm['femail'].value
        let message = contactForm['ftext'].value

        if (name == "") {
            document.querySelector("#name-message").style.display = "block";
        } else if (email == "" || !validateEmail(email)) {
            document.querySelector("#name-message").style.display = "none";
            document.querySelector("#email-message").style.display = "block";
        } else if (message == "") {
            document.querySelector("#name-message").style.display = "none";
            document.querySelector("#email-message").style.display = "none";
            document.querySelector("#text-message").style.display = "block";
        } else {

            document.querySelector("#name-message").style.display = "none";
            document.querySelector("#email-message").style.display = "none";
            document.querySelector("#text-message").style.display = "none";

            const data = {name, email, message}

            fetch('https://contact-backed.herokuapp.com', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            }).then(response => response.json()).then(data => {    
                contactForm.reset();
                document.querySelector("#success-message").style.display = "block";
            }).catch(error => {
                document.querySelector("#error-message").style.display = "block"
            });

        }
    }

    contactForm.addEventListener('submit', handlingForm)

});
