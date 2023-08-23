$(document).ready(function () {

    $("#button1").click(function(){
        let currentSlide = $(".activeSlide");
        currentSlide.removeClass('activeSlide');
        imageSelected = $("#img1")
        imageSelected.addClass('activeSlide');
        let currentButton = $(".active-button");
        currentButton.removeClass('active-button');
        imageSelected = $("#button1")
        imageSelected.addClass('active-button');
      });

    $("#button2").click(function(){
        let currentSlide = $(".activeSlide");
        currentSlide.removeClass('activeSlide');
        imageSelected = $("#img2")
        imageSelected.addClass('activeSlide');
        let currentButton = $(".active-button");
        currentButton.removeClass('active-button');
        imageSelected = $("#button2")
        imageSelected.addClass('active-button');
      });

    $("#button3").click(function(){
        let currentSlide = $(".activeSlide");
        currentSlide.removeClass('activeSlide');
        imageSelected = $("#img3")
        imageSelected.addClass('activeSlide');
        let currentButton = $(".active-button");
        currentButton.removeClass('active-button');
        imageSelected = $("#button3")
        imageSelected.addClass('active-button');
      });

    $("#button4").click(function(){
        let currentSlide = $(".activeSlide");
        currentSlide.removeClass('activeSlide');
        imageSelected = $("#img4")
        imageSelected.addClass('activeSlide');
        let currentButton = $(".active-button");
        currentButton.removeClass('active-button');
        imageSelected = $("#button4")
        imageSelected.addClass('active-button');
      });

    $("#button5").click(function(){
        let currentSlide = $(".activeSlide");
        currentSlide.removeClass('activeSlide');
        imageSelected = $("#img5")
        imageSelected.addClass('activeSlide');
        let currentButton = $(".active-button");
        currentButton.removeClass('active-button');
        imageSelected = $("#button5")
        imageSelected.addClass('active-button');
      });


    setInterval(function(){
        let currentSlide = $(".activeSlide");
        let next = currentSlide.next();
        let currentButton = $(".active-button");
        let nextButton = currentButton.next();
        if (next.length){
            currentSlide.removeClass('activeSlide');
            next.addClass('activeSlide');
            currentButton.removeClass('active-button');
            nextButton.addClass('active-button');
        }
        else{
            currentSlide.removeClass('activeSlide');
            $('.slide:first-child').addClass('activeSlide')
            currentButton.removeClass('active-button');
            $('.btn:first-child').addClass('active-button')
        }

    }, 2000)

}); 