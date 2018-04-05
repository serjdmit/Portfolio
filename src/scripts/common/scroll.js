$('.hero__scroll-button').on('click', function(){
    $('html, body').animate({
        scrollTop: $('#waypoint').offset().top
    }, 1000);
});