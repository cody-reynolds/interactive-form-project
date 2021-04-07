//Treehouse FSJS Techdegree Project 3: Interactive Form
//By Cody Reynolds


//Placing focus on name field on page load
const nameField = document.querySelector('input[type="text"]');
nameField.focus();


//Hiding 'other' job role unless the user selects that option
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
otherJobRole.style.display = 'none';

jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
});

//T-shirt Info Section
const designSelectElement = document.getElementById('design');
const colorSelectElement = document.getElementById('color');
const colorOptionElements = colorSelectElement.children;
colorSelectElement.disabled = true;


//An event listener on the T-shirt design input box. Listens for changes.
//Once a design is selected, a loop begins, looping through each of the options in the color box
//Logs to the console which design is selected (event.target.value) and the data theme of the
//Options in the color box.
designSelectElement.addEventListener('change', (e) => {
    colorSelectElement.disabled = false;
    for (let i = 0; i < colorOptionElements.length; i++) {
        let activeDesign = e.target.value;
        let colorDesignTheme = colorOptionElements[i].getAttribute("data-theme");
        if(activeDesign === colorDesignTheme) {
            colorOptionElements[i].hidden = false;
            colorOptionElements[i].selected = true;
        } else {
            colorOptionElements[i].hidden = true;
            colorOptionElements[i].selected = false;
        }
    }
});


//Register for activities section
const activitiesSection = document.getElementById('activities');
const activities = document.querySelectorAll('#activities input');
const totalBox = document.getElementById('activities-cost');
let totalCost = 0;

activitiesSection.addEventListener('change', (e) => {
    let cost = +e.target.getAttribute('data-cost');
    if(e.target.checked) {
        totalCost += cost;
        totalBox.innerHTML = `Total: $${totalCost}`;
    } else if (e.target.checked === false) {
        totalCost -= cost;
        totalBox.innerHTML = `Total: $${totalCost}`;
    }
});


//Payment Section
const paymentBox = document.getElementById('payment');
const paymentOptions = paymentBox.children;
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

paypal.style.display = 'none';
bitcoin.style.display = 'none';

paymentOptions[1].selected = true;

paymentBox.addEventListener('change', (e) => {
    let selectedPaymentType = e.target.value;
    console.log(selectedPaymentType);
    if (selectedPaymentType === 'paypal') {
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
        paypal.style.display = '';
    } else if (selectedPaymentType === 'bitcoin') {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = '';
    } else {
        creditCard.style.display = '';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    }
});


//Form input validation
const emailField = document.getElementById('email');
const cardNumberField = document.getElementById('cc-num');
const zipCodeField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const form = document.querySelector('form');


//Validation helper functions
//In this section

function nameValidation() {
    let userName = nameField.value;
    let namePattern = /[a-z]+/i;
    let nameTest = namePattern.test(userName);
    return nameTest;
    }


function emailValidation() {
    let userEmail = emailField.value;
    let emailPattern = /\w+@\w+\.\w+/i;
    let emailTest = emailPattern.test(userEmail);
    return emailTest;
}


function checkBoxCount() {
    let checkBoxCounter = 0;
    for (i = 0; i < activities.length; i++) {
        if (activities[i].checked) {
            checkBoxCounter += 1;
        }
    }
    return checkBoxCounter;
}


function cardNumberValidation() {
    let userCardNumber = cardNumberField.value;
    let cardNumberPattern = /\d{13,16}/
    let cardNumberTest = cardNumberPattern.test(userCardNumber);
    return cardNumberTest;
}


function zipValidation() {
    let userZip = zipCodeField.value;
    let zipPattern = /\d{5}$/;
    let zipTest = zipPattern.test(userZip);
    return zipTest;
}


function cvvValidation() {
    let userCvv = cvvField.value;
    let cvvPattern = /\d{3}$/;
    let cvvTest = cvvPattern.test(userCvv);
    return cvvTest;
}


form.addEventListener('submit', (e) => {
    if (nameValidation() === false ||
        emailValidation() === false ||
        checkBoxCount() === 0) {
            e.preventDefault();
    }

    if(paymentOptions[1].selected === true) {
        if(cardNumberValidation() === false ||
           zipValidation() === false ||
           cvvValidation() === false) {
               e.preventDefault();
           }
}
});