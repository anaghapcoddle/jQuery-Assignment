$(document).ready(function () {

    $("#button1").click(function(){
        let currentSlide = $(".activeSlide");
        currentSlide.removeClass('activeSlide');
        buttonClicked = $("#img1")
        buttonClicked.addClass('activeSlide');
      });

    $("#button2").click(function(){
        let currentSlide = $(".activeSlide");
        currentSlide.removeClass('activeSlide');
        buttonClicked = $("#img2")
        buttonClicked.addClass('activeSlide');
      });

    $("#button3").click(function(){
        let currentSlide = $(".activeSlide");
        currentSlide.removeClass('activeSlide');
        buttonClicked = $("#img3")
        buttonClicked.addClass('activeSlide');
      });

    $("#button4").click(function(){
        let currentSlide = $(".activeSlide");
        currentSlide.removeClass('activeSlide');
        buttonClicked = $("#img4")
        buttonClicked.addClass('activeSlide');
      });

    $("#button5").click(function(){
        let currentSlide = $(".activeSlide");
        currentSlide.removeClass('activeSlide');
        buttonClicked = $("#img5")
        buttonClicked.addClass('activeSlide');
      });


    setInterval(function(){
        let currentSlide = $(".activeSlide");
        let next = currentSlide.next();
        if (next.length){
            currentSlide.removeClass('activeSlide');
            next.addClass('activeSlide');
        }
        else{
            currentSlide.removeClass('activeSlide');
            $('.slide:first-child').addClass('activeSlide')
        }
    }, 2000)

}); 