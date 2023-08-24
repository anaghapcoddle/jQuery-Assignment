/* Question: Make sure that there is no content within the body tag initially.Upon the page being loaded,
a button will be visible.Once the button is clicked, a title will be displayed.With a second click,
 an image along with a next button will appear.When the next button is clicked subsequently,
the image should transition to a different one. */

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
                    imageDisplayed.attr('src', 'images/img2.jpg');
                });
            }
            ++clicks;
        });
    });