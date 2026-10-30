window.addEventListener('load', function () {
    'use strict';
    const sliderContent = document.querySelector('.a');
    const slider = document.querySelector('.slider');
    const pauseBtn = document.querySelector('#pauseButton');
    const tripBtn = document.querySelector('#trip');

    const sliderWidth = sliderContent.offsetWidth;


    const cloned = sliderContent.cloneNode(true);
    cloned.className = "b";
    slider.appendChild(cloned);

    const films = document.querySelectorAll('.film');


    let root = document.querySelector(':root');
    const endLeftPos = `-${sliderWidth}px`;
    root.style.setProperty('--sliderwidth', endLeftPos);

    document.querySelector('.slider').classList.add("animate");


    pauseBtn.addEventListener('click', function () {
        if (slider.style.animationPlayState === 'paused') {
            slider.style.animationPlayState = 'running';
            pauseBtn.innerHTML = 'Pause';
        } else {
            slider.style.animationPlayState = 'paused';
            pauseBtn.innerHTML = 'Play';
        }
    })

    const blendModes = ['multiply','overlay', 'hard-light', 'color', 'screen', 'difference'];
    let level = 0;

    tripBtn.addEventListener('click', function () {
        level++;

        if (level === blendModes.length) {
            level = 0;
        }

        films.forEach(function (film) {
            film.style.mixBlendMode = blendModes[level];
        });

        tripBtn.innerHTML = `Trippiness: ${level + 1}`
    })

});