(function () {
    'use strict';

    // setting variables
    const posts = document.querySelectorAll('section');
    const figure = document.querySelector('figure');
    let postTops = [];
    let pageTop;
    let counter = 1;
    let previousCounter = 1;
    let doneResizing;

    // variables for image slider
    const slider = document.querySelector('.slider');
    const sliderContent = document.querySelector('.a');
    let root = document.querySelector(':root');


    // film strip set up
    // copy the film
    const cloned = sliderContent.cloneNode(true);
    cloned.className = 'b';
    slider.appendChild(cloned);

    // measure film and tell CSS how far to slide
    function setSliderWidth() {
        const sliderWidth = sliderContent.offsetWidth;
        root.style.setProperty('--sliderwidth', `-${sliderWidth}px`);
    }

    setSliderWidth();

    // start the sliding animation
    slider.classList.add('animate');

    // find where each section starts when the page loads
    resetPagePosition();

    // creative scrolling functions
    window.addEventListener('scroll', function () {
        pageTop = window.pageYOffset + 300;

        // scrolling down
        if (pageTop > postTops[counter]) {
            counter++;
            console.log(`scrolling down ${counter}`);
            // scrolling up
        } else if (counter > 1 && pageTop < postTops[counter - 1]) {
            counter--;
            console.log(`scrolling up ${counter}`);
        }
        // when section changes, change the photo
        if (counter != previousCounter) {
            figure.className = 'photo' + counter;
            previousCounter = counter;
        }
    });


    // when the window is resized, wait until it stops and then it remeasures the sections and film strips
    window.addEventListener('resize', function () {
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function () {
            resetPagePosition();
            setSliderWidth();
        }, 500);
    });


    //records where each section starts and which section the user is currently in
    function resetPagePosition() {
        postTops = [];
        posts.forEach(function (post) {
            postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
        });

        const pagePosition = window.pageYOffset + 300;
        counter = 0;

        postTops.forEach(function (post) {
            if (pagePosition > post) {
                counter++;
            }
        });
    }

    // smooth scrolling
    const enterLink = document.querySelector('header a');
    enterLink.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('#section1').scrollIntoView({ behavior: 'smooth' });
    });

    // full screen button
    const fullScreenBtn = document.querySelector('button');

    fullScreenBtn.addEventListener('click', function () {
        // if not full screen, make it full screen
        if (!document.fullscreenElement) {
            var elem = document.documentElement;
            elem.requestFullscreen();
            // if already full screen, exit it
        } else if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });
})();