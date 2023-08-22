/* eslint-disable no-console */

/*Question:

Create a form with 5 fields 
Name: text
Address: text area
DOB: date
Age: dropdown
Gender: radio button
Agree to terms: checkbox

Implement validation for each input field in the form using jQuery
Customize the validation error messages for each input field to provide meaningful feedback to users.

Test your form with different input scenarios to ensure that validation works as expected. */

$(document).ready(function () {

  function validateForm() {

    const name = $("#name").val();
    const address = $('#address').val();
    const dob = $("#dob").val();
    const age = $('#age').val();
    const gender = $('input[name="gender"]:checked').val();
    let isChecked = $('#terms').is(':checked');

    console.log(name);
    console.log(address);
    console.log(dob);
    console.log(age);
    console.log(gender);
    console.log(isChecked);

    valid = true;
    if (name === '' || name == null) {
      $('#nameErrorContainer').text('This field is required.');
      valid = false;
    }else if(!/^[A-Za-z]*$/.test(name)){
      $('#nameErrorContainer').text('Enter only alphabets.');
    }
    if (address === '' || address == null) {
      $('#addressErrorContainer').text('This field is required.');
      valid = false;
    }
    if (dob === '' || dob == null) {
      $('#dateErrorContainer').text('This field is required.');
      valid = false;
    }
    if (gender === '' || gender == null) {
      $('#genderErrorContainer').text('This field is required.');
      valid = false;
    }
    if (isChecked === false) {
      $('#termsErrorContainer').text('Agree to terms and conditions to continue.');
      valid = false;
    }
  }

  $('button').click(function () {
    validateForm();
  });

});