$(document).ready(function () {
    // ======= Header scroll fixed
    var header = $(".header-area");
    var scrollPoint = 200;

    $(window).scroll(function () {
        if ($(this).scrollTop() > scrollPoint) {
            if (!header.hasClass("header-fixed")) {
                header.addClass("header-fixed").hide().slideDown(300).addClass("slide-down");
            }
        } else {
            header.removeClass("header-fixed slide-down");
        }
    });
});

// ======= Hero animation
document.addEventListener("DOMContentLoaded", () => {
    const animationDelay = 500;
    const additionalDelay = 700;

    const heroArea = document.querySelector('.hero-area');
    const groups = [
        {
            element: document.querySelector('g [mask="url(#__lottie_element_88)"]'),
            animationClass: 'hero-biography-animate',
        },
        {
            element: document.querySelector('g[transform="matrix(0.9999995231628418,0,0,0.9999995231628418,428.9996032714844,383.0000305175781)"]'),
            animationClass: 'rectangle-border-animate',
        },
        {
            element: document.querySelector('g[transform="matrix(1,0,0,1,620.4340209960938,293.6239929199219)"]'),
            animationClass: 'arrow-blue-line-animate',
        },
        {
            element: document.querySelector('g[transform="matrix(0,1,-1,0,654.8489990234375,259.1239929199219)"]'),
            animationClass: 'border-line-arrow-animate',
        },
        {
            element: document.querySelector('g[transform="matrix(1,0,0,1,503.2540283203125,360.6080017089844)"]'),
            animationClass: 'body-except-right-hand-animate',
        },
        {
            element: document.querySelector('g[transform="matrix(0.3333300054073334,0,0,0.3333300054073334,510.50152587890625,377.50128173828125)"]'),
            animationClass: 'right-hand-animate',
        },
        {
            element: document.querySelector('g[transform="matrix(0.9700000286102295,0,0,0.9700000286102295,143.05999755859375,41.204986572265625)"]'),
            animationClass: 'bubbles-animate',
        },
    ];

    const delayedGroups = [
        {
            element: document.querySelector('.hero-T'),
            animationClass: 'hero-T-animate',
        },
        {
            element: document.querySelector('.hero-catus'),
            animationClass: 'hero-catus-animate',
        },
        {
            element: document.querySelector('.hero-sidebar'),
            animationClass: 'hero-sidebar-animate',
        },
    ];

    if (!heroArea) return;

    // IntersectionObserver to detect the section in the viewport
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        delayedGroups.forEach(({ element, animationClass }) => {
                            if (element) {
                                element.classList.add(animationClass);
                            }
                        });
                    }, additionalDelay);

                    setTimeout(() => {
                        groups.forEach(({ element, animationClass }) => {
                            if (element) {
                                element.classList.add(animationClass);
                            }
                        });
                    }, animationDelay);
                } else {
                    [...groups, ...delayedGroups].forEach(({ element, animationClass }) => {
                        if (element) {
                            element.classList.remove(animationClass);
                        }
                    });
                }
            });
        },
        { threshold: 0.3 } // Trigger when 30% of the hero area is visible
    );

    observer.observe(heroArea);
});



// ======= Counter animation
function animateCounter(element, startNumber, targetNumber, duration) {
    let startTime;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const increment = Math.ceil((targetNumber - startNumber) * (progress / duration));
        const currentValue = startNumber + increment;
        element.innerText = currentValue;
        if (currentValue < targetNumber) {
            requestAnimationFrame(step);
        } else {
            element.innerText = targetNumber;
        }
    }
    requestAnimationFrame(step);
}

const countdownElements = document.querySelectorAll('.counter'); // Retrieve countdown elements from the DOM

// Intersection Observer to each countdown
countdownElements.forEach(element => {
    const startNumber = parseInt(element.dataset.start);
    const targetNumber = parseInt(element.dataset.target);
    const duration = parseInt(element.dataset.duration);

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                animateCounter(element, startNumber, targetNumber, duration);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(element);
});

// ======= Cookie consent
document.addEventListener("DOMContentLoaded", () => {
    // Check if cookie_consent is set
    if (!document.cookie.includes("cookie_consent=accepted")) {
        document.getElementById("cookie-consent").style.display = "block";
    }

    // Set cookie on accept
    document.getElementById("accept-cookie").addEventListener("click", () => {
        // fetch('/set-cookie', { method: 'POST' })
        //     .then(response => {
        //         if (response.ok) {
        //             document.getElementById("cookie-consent").style.display = "none";
        //         }
        //     });
        document.getElementById("cookie-consent").style.display = "none";
    });
});

