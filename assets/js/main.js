$(document).ready(function () {
    // ======= Announcement bar
    $('.announcement-close').click(function() {
        $('.announcement-bar').fadeOut(300);
    });

    // ======= Header scroll fixed

    var header = $("header");
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

    // ======= Mobile menu 

    const mobileMenu = $('#mobileMenu');
    const mainMenu = $('.mobile-menu');

    $('.mobile-bar-icon').click(function () {
        mobileMenu.addClass('show-menu-mobile');

        setTimeout(function () {
            mainMenu.addClass('slide-left');
        }, 50);
    });

    $('.mobile-menu-close-icon, .overlay').click(function () {
        mainMenu.removeClass('slide-left');

        setTimeout(function () {
            mobileMenu.removeClass('show-menu-mobile');
        }, 300);
    });


    $('.mobile-menu .dropdown').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.dropdown').toggleClass('open');
    });



    // ======= Testimonial slider

    $('.testimonial-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: false,
        autoplaySpeed: 3000,
        infinite: true,
        prevArrow: '<span class="slick-prev"><i class="fa-sharp fa-solid fa-chevron-left"></i></span>',
        nextArrow: '<span class="slick-next"><i class="fa-sharp fa-solid fa-chevron-right"></i></span>',
        responsive: [
            {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2
                }
            },
            {
            breakpoint: 768,
            settings: {
                slidesToShow: 1
                }
            },
            {
            breakpoint: 640,
            settings: {
                arrows: false,
                slidesToShow: 1
                }
            }
        ]
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

    // Intersection Observer
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

const countdownElements = document.querySelectorAll('.counter');

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

// ======= Animation

document.querySelectorAll('.animate-group').forEach(section => {
    const lines = section.querySelectorAll('.animate-me');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lines.forEach((line, i) => {
                setTimeout(() => {
                    line.classList.add('visible');
                }, i * 200); 
                });
                observer.unobserve(entry.target);
            } else {
                lines.forEach(line => {
                line.classList.remove('visible'); // reset when out of view
                });
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
});


window.addEventListener('DOMContentLoaded', () => {
    const animatedSections = document.querySelectorAll('.scroll-animated-section');

    window.addEventListener('scroll', () => {
        animatedSections.forEach(section => {
            // if (window.innerWidth <= 768) return;

            const downs = section.querySelectorAll('.scroll-down');
            const ups = section.querySelectorAll('.scroll-up');
            const ups2 = section.querySelectorAll('.scroll-up2');
            const spread = section.querySelectorAll('.spread');

            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            

            // only animate when section is in viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                const sectionHeight = rect.height + windowHeight;
                const scrolled = windowHeight - rect.top;
                const progress = Math.min(Math.max(0, scrolled / sectionHeight), 1);

                // move all "down" images
                downs.forEach(img => {
                    const move = parseFloat(img.dataset.move) || 700;
                    img.style.transform = `translateY(${progress * move}px)`;
                });

                // move all "up" images
                ups.forEach(img => {
                    const move = parseFloat(img.dataset.move) || 700;
                    img.style.transform = `translateY(${-progress * move}px)`;
                });

                // move all "up" images with condition
               

                // move all "horizontal" images
                spread.forEach(img => {
                    const move = parseFloat(img.dataset.move) || 50;

                    if (progress < 0.2) {
                        img.style.transform = `translateX(0px)`;
                    } else if (progress > 0.4) {
                        // Freeze at value at 0.4
                        const value = lastTransformValues.get(img) ?? -(0.4 * move);
                        img.style.transform = `translateX(${value}px)`;
                    } else {
                        img.style.transform = `translateX(${-progress * move}px)`;
                    }
                });
            }
        });
    });
});


let lastScrollY = window.scrollY;
const imageOffsets = new WeakMap();

window.addEventListener('scroll', () => {
    const scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
    const scrollDelta = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;

    const section = document.querySelector('.templates-area');
    const ups2 = section.querySelectorAll('.scroll-up2');

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
        const sectionHeight = rect.height;
        const sectionVisibleHeight = Math.min(windowHeight, windowHeight - rect.top, rect.bottom);
        const visibleRatio = sectionVisibleHeight / sectionHeight;

        const baseTop = Math.min(...Array.from(ups2).map(img => img.offsetTop));

        ups2.forEach(img => {
            let currentY = imageOffsets.get(img) || 0;
            const moveSpeed = parseFloat(img.dataset.move) || 1.2;
            const rowOffset = img.offsetTop - baseTop;
            const delayFactor = rowOffset / 8000;
            const moveAmount = moveSpeed * (1 - delayFactor);

            if (scrollDirection === 'down' && visibleRatio > 0.4) {
                currentY += moveAmount;
            } else if (scrollDirection === 'up' && visibleRatio > 0.8) {
                currentY -= moveAmount;
            }

            // Clamp to prevent drifting too far
            currentY = Math.max(Math.min(currentY, 100), -100);

            img.style.transform = `translateY(${-currentY}px)`;
            imageOffsets.set(img, currentY);
        });
    }
});
