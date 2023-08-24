$(document).ready(function () {
    let firstButton = $('<input/>').attr({ type: 'button', name: 'firstButton', value: 'Click here' });
    $('body').append(firstButton);
    let clicks = 0;
    firstButton.click(function () {
        if (clicks == 0) {
            let textDisplayed = $('<p/>');
            textDisplayed.text("Welcome to Assignment 3.");
            $('body').append(textDisplayed);
        } else {
            let imageDisplayed = $('<img/>').attr({ src: 'images/img1.jpg' });;
            $('body').append(imageDisplayed);
            let nextButton = $('<input/>').attr({ type: 'button', name: 'nextButton', value: 'Next' });;
            $('body').append(nextButton);
            nextButton.click(function () {
                imageDisplayed.attr( 'src', 'images/img2.jpg' );
            });
        }
        ++clicks;
    });
});