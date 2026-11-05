(function () {
    'use strict';

    const posts = document.querySelectorAll('section');
    const figure = document.querySelector('figure');
    let postTops = [];
    let pageTop;
    let counter = 1;
    let previousCounter = 1;
    let doneResizing;

    resetPagePosition();

    window.addEventListener('scroll', function () {
        pageTop = window.pageYOffset + 300;

        if (pageTop > postTops[counter]) {
            counter++;
            console.log(`scrolling down ${counter}`);
        } else if (counter > 1 && pageTop < postTops[counter - 1]) {
            counter--;
            console.log(`scrolling up ${counter}`);
        }

        if (counter != previousCounter) {
            figure.className = 'photo' + counter;
            previousCounter = counter;
        }
    });

    window.addEventListener('resize', function () {
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function () {
            resetPagePosition();
        }, 500);
    });

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

    const enterLink = document.querySelector('header a');

    enterLink.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('#section1').scrollIntoView({ behavior: 'smooth' });
    });
})();