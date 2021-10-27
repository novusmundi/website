/*!
* Start Bootstrap - New Age v6.0.4 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
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

});

function validateAndSendform(){
    const email = document.getElementById("email").value
    const valid = RegExp( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)
    const alert = document.getElementById("alert")
    if(valid){
        axios.post("https://trib3.app/newsletter",{email:email}).then((response) => {
            
            if(response && response.data){
                console.log(response.data)
                alert.innerHTML = `
                    <p class="text-white">
                        ${response.data}
                    </p>
                `
            }
        }).catch((err) => {
            if(err && err.response && err.response.data){
                alert.innerHTML = `
                <p class="text-warning">
                    ${err.response.data}
                </p>
              `
            }
        })
    }else{
        alert.innerHTML = `
        <p class="text-warning">
            This is not a valid email. 
        </p>
      `    }
}