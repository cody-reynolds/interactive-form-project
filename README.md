# Interactive Form Project
This project is a demo of HTML form validation using JavaScript regular expressions.

Details on form validation:
The name and email fields are validated upon blur (user moves on to another field).

The credit card fields (card number, ZIP, and CVV) are validated on keyup. The error message displays automatically until the user satisfies the validation criteria.

A few fields have multiple error "hints" that display depending on why the input could not be validated:

Email:
- If blank, the error message displays: "Please enter an email address"
- If the user's input does not contain an @ symbol, the error message reads "Email must contain an @ symbol"
- If the user enters anything else that causes validation to fail, the error message displays: "Email must follow correct format (ex: name@example.com)"

Credit Card:
- If the field is left blank, the messsage reads: "Card number is required"
- If the user enters any letters or special characters, the message reads: "Please enter numbers only."
- If the user enters a space, the message reads: "Card number cannot contain any spaces"
- If the field contains fewer than 13 digits, the message reads: "Card number must contain at least 13 digits"
- If the field contains greater than 16 digits, the message reads: "Card number must contain a maximum of 16 digits"

All required input fields are validated upon clicking the submit button. Any required fields that fail validation will prevent the form from submitting.

This project was created as part of the [Treehouse Full Stack JavaScript Techdegree](https://teamtreehouse.com/techdegree/full-stack-javascript).
