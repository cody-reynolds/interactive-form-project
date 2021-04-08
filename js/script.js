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


//An event listener on the T-shirt design input box.
//Once a design is selected, loops through each of the options in the color box
//Logs to the console which design is selected (event.target.value) 
//and the data theme of the options in the color box.
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


//Form validation variables
const emailField = document.getElementById('email');
const cardNumberField = document.getElementById('cc-num');
const zipCodeField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const form = document.querySelector('form');

//FORM VALIDATION

//Helper functions
function nameValidator(event) {
    let userName = nameField.value;
    let namePattern = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/;
    let isNameValid = namePattern.test(userName);

    if (!isNameValid){
        nameField.parentElement.classList.add("not-valid");
        nameField.parentElement.classList.remove("valid");
        nameField.parentElement.lastElementChild.style.display = 'block';
        event.preventDefault();

    } else if (isNameValid){
        nameField.parentElement.classList.add("valid");
        nameField.parentElement.classList.remove("not-valid");
        nameField.parentElement.lastElementChild.style.display = 'none';
    }
    return isNameValid;
}


function emailValidator(event) {
    let userEmail = emailField.value;
    let emailPattern = /^[^@]+@[^@.]+\.[a-z]+$/i;
    let isEmailValid = emailPattern.test(userEmail);

    if (!isEmailValid){
        emailField.parentElement.classList.add("not-valid");
        emailField.parentElement.classList.remove("valid");
        emailField.parentElement.lastElementChild.style.display = 'block';
        event.preventDefault();
    } else if (isEmailValid){
        emailField.parentElement.classList.add("valid");
        emailField.parentElement.classList.remove("not-valid");
        emailField.parentElement.lastElementChild.style.display = 'none';
    }

    return isEmailValid;
}


function activitiesValidator(event) {
    let areActivitiesValid = (totalCost > 0);

    if (!areActivitiesValid){
        activitiesSection.classList.add("not-valid");
        activitiesSection.classList.remove("valid");
        activitiesSection.lastElementChild.style.display = 'block';
        event.preventDefault();
    } else if (areActivitiesValid){
        activitiesSection.classList.add("valid");
        activitiesSection.classList.remove("not-valid");
        activitiesSection.lastElementChild.style.display = 'none';
    }
    return areActivitiesValid;
}


function cardNumberValidator(event) {
    let userCardNumber = cardNumberField.value;
    let cardNumberPattern = /\d{13,16}/
    let isCardNumberValid = cardNumberPattern.test(userCardNumber);

    if (!isCardNumberValid){
        cardNumberField.parentElement.classList.add("not-valid");
        cardNumberField.parentElement.classList.remove("valid");
        cardNumberField.parentElement.lastElementChild.style.display = 'block';
        event.preventDefault();
    } else if (isCardNumberValid) {
        cardNumberField.parentElement.classList.add("valid");
        cardNumberField.parentElement.classList.remove("not-valid");
        cardNumberField.parentElement.lastElementChild.style.display = 'none';
    }
    return isCardNumberValid;
}


function zipValidator(event) {
    let userZip = zipCodeField.value;
    let zipPattern = /^\d{5}$/;
    let isZipValid = zipPattern.test(userZip);

    if (!isZipValid){
        zipCodeField.parentElement.classList.add("not-valid");
        zipCodeField.parentElement.classList.remove("valid");
        zipCodeField.parentElement.lastElementChild.style.display = 'block';
        event.preventDefault();
    } else if (isZipValid){
        zipCodeField.parentElement.classList.add("valid");
        zipCodeField.parentElement.classList.remove("not-valid");
        zipCodeField.parentElement.lastElementChild.style.display = 'none';
    }
    return isZipValid;
}


function cvvValidator(event) {
    let userCvv = cvvField.value;
    let cvvPattern = /^\d{3}$/;
    let isCvvValid = cvvPattern.test(userCvv);

    if (!isCvvValid){
        cvvField.parentElement.classList.add("not-valid");
        cvvField.parentElement.classList.remove("valid");
        cvvField.parentElement.lastElementChild.style.display = 'block';
        event.preventDefault();
    } else if (isCvvValid){
        cvvField.parentElement.classList.add("valid");
        cvvField.parentElement.classList.remove("not-valid");
        cvvField.parentElement.lastElementChild.style.display = 'none';
    }
    return isCvvValid;
}

//Event listener on submit button, validates all of user's input
form.addEventListener('submit', (e) => {
    nameValidator(e);
    emailValidator(e);
    activitiesValidator(e);

    //Only applicable if the user selects credit card as payment method
    if (paymentOptions[1].selected) {
    cardNumberValidator(e);
    zipValidator(e);
    cvvValidator(e);
    }
});

//ACCESSIBILITY

//Makes the active checkbox activities more visible as the user tabs through options
for (i = 0; i < activities.length; i++) {
    let parentLabel = activities[i].parentElement;

    activities[i].addEventListener('focus', () =>{
        parentLabel.classList.add('focus');
    })

    activities[i].addEventListener('blur', () =>{
        parentLabel.classList.remove('focus');
    })
};