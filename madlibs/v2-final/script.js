(function () {
    'use strict';
    console.log('Reading JS');

    const myForm = document.querySelector('form');
    const formData = document.querySelectorAll('input[type=text]');
    const parts = document.querySelectorAll('#part1, #part2, #part3, #part4');
    const errorOverlay = document.querySelector('#error');
    const errorCount = document.querySelector('#errorCount');
    const errorButton = document.querySelector('#error button');

    let firstEmptyField;

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();
        processFormData(formData);
    });

    function processFormData(formData) {
        const emptyFields = [];
        let counter = 0;

        for (const eachField of formData) {
            if (eachField.value) {
                eachField.className = '';
            } else {
                eachField.className = 'missing';
                emptyFields.push(counter);
            }
            counter++;
        }
        if (emptyFields.length > 0) {
            showErrors(formData, emptyFields);
        } else {
            makeMadlib(formData);
        }
    }

    function makeMadlib(formData) {
        for (const eachField of formData) {
            const spans = document.querySelectorAll(`.${eachField.id}`);

            for (const eachSpan of spans) {
                eachSpan.innerHTML = eachField.value;
            }
        }

        for (const eachField of formData) {
            eachField.value = '';
        }
        parts[0].className = 'overlay showing';
    }

    function showErrors(formData, emptyFields) {
        firstEmptyField = formData[emptyFields[0]];
        errorCount.innerHTML = emptyFields.length;
        errorOverlay.className = 'overlay showing';
    }

    errorButton.addEventListener('click', function (){
        errorOverlay.className = 'overlay';
        firstEmptyField.focus();
    });

    document.querySelector('#part1 button').addEventListener('click', function(){
        document.querySelector('#part1').className = 'overlay';
        document.querySelector('#part2').className = 'overlay showing';
    });

    document.querySelector('#part2 button').addEventListener('click', function(){
        document.querySelector('#part2').className = 'overlay';
        document.querySelector('#part3').className = 'overlay showing';
    });

    document.querySelector('#part3 button').addEventListener('click', function(){
        document.querySelector('#part3').className = 'overlay';
        document.querySelector('#part4').className = 'overlay showing';
    });

    document.querySelector('#part4 button').addEventListener('click', function(){
        document.querySelector('#part4').className = 'overlay';
        formData[0].focus();
    });

})();
