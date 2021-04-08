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
function nameValidator() {
    let userName = nameField.value;
    let namePattern = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/;
    let isNameValid = namePattern.test(userName);
    return isNameValid;
    }


function emailValidator() {
    let userEmail = emailField.value;
    let emailPattern = /^[^@]+@[^@.]+\.[a-z]+$/i;
    let isEmailValid = emailPattern.test(userEmail);
    return isEmailValid;
}


function activitiesValidator() {
    let areActivitiesValid = (totalCost > 0);
    return areActivitiesValid;
}


function cardNumberValidator() {
    let userCardNumber = cardNumberField.value;
    let cardNumberPattern = /\d{13,16}/
    let isCardNumberValid = cardNumberPattern.test(userCardNumber);
    return isCardNumberValid;
}


function zipValidator() {
    let userZip = zipCodeField.value;
    let zipPattern = /\d{5}$/;
    let isZipValid = zipPattern.test(userZip);
    return isZipValid;
}


function cvvValidator() {
    let userCvv = cvvField.value;
    let cvvPattern = /\d{3}$/;
    let isCvvValid = cvvPattern.test(userCvv);
    return isCvvValid;
}

//Event listener on submit button, validates all of user's input
form.addEventListener('submit', (e) => {
    e.preventDefault();
    activitiesValidator();
    
    if (!nameValidator() ||
        !emailValidator() ||
        !activitiesValidator()) {
            e.preventDefault();
    }

    //Only applicable if the user selects credit card as payment method
    if(paymentOptions[1].selected === true) {
        if(!cardNumberValidator() ||
           !zipValidator() ||
           !cvvValidator()) {
               e.preventDefault();
           }
    }

    nameHint();
    emailHint();
    activitiesHint();
    cardNumberHint();
    zipHint();
    cvvHint();
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


function nameHint() {
    if(!nameValidator()){
        nameField.parentElement.classList.add("not-valid");
        nameField.parentElement.classList.remove("valid");
        nameField.parentElement.lastElementChild.style.display = 'block';
    } else if (nameValidator()){
        nameField.parentElement.classList.add("valid");
        nameField.parentElement.classList.remove("not-valid");
        nameField.parentElement.lastElementChild.style.display = 'none';
    }
}

function emailHint() {
    if(!emailValidator()){
        emailField.parentElement.classList.add("not-valid");
        emailField.parentElement.classList.remove("valid");
        emailField.parentElement.lastElementChild.style.display = 'block';
    } else if (nameValidator()){
        emailField.parentElement.classList.add("valid");
        emailField.parentElement.classList.remove("not-valid");
        emailField.parentElement.lastElementChild.style.display = 'none';
    }
}

function activitiesHint() {
    if(!activitiesValidator()){
        activitiesSection.classList.add("not-valid");
        activitiesSection.classList.remove("valid");
        activitiesSection.lastElementChild.style.display = 'block';
    } else if (nameValidator()){
        activitiesSection.classList.add("valid");
        activitiesSection.classList.remove("not-valid");
        activitiesSection.lastElementChild.style.display = 'none';
    }
}

function cardNumberHint() {
    if(!cardNumberValidator()){
        cardNumberField.parentElement.classList.add("not-valid");
        cardNumberField.parentElement.classList.remove("valid");
        cardNumberField.parentElement.lastElementChild.style.display = 'block';
    } else if (cardNumberValidator()){
        cardNumberField.parentElement.classList.add("valid");
        cardNumberField.parentElement.classList.remove("not-valid");
        cardNumberField.parentElement.lastElementChild.style.display = 'none';
    }
}

function zipHint() {
    if(!zipValidator()){
        zipCodeField.parentElement.classList.add("not-valid");
        zipCodeField.parentElement.classList.remove("valid");
        zipCodeField.parentElement.lastElementChild.style.display = 'block';
    } else if (zipValidator()){
        zipCodeField.parentElement.classList.add("valid");
        zipCodeField.parentElement.classList.remove("not-valid");
        zipCodeField.parentElement.lastElementChild.style.display = 'none';
    }
}

function cvvHint() {
    if(!cvvValidator()){
        cvvField.parentElement.classList.add("not-valid");
        cvvField.parentElement.classList.remove("valid");
        cvvField.parentElement.lastElementChild.style.display = 'block';
    } else if (cvvValidator()){
        cvvField.parentElement.classList.add("valid");
        cvvField.parentElement.classList.remove("not-valid");
        cvvField.parentElement.lastElementChild.style.display = 'none';
    }
}