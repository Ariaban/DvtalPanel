
$(window).scroll(function() {
    if ($(this).scrollTop() > 32){  
        $('.uiBlockMenuWrap').addClass("sticky");
    }
    else{
        $('.uiBlockMenuWrap').removeClass("sticky");
    }
});



//$(window).scroll(function() {
//    if ($(this).scrollTop() > 32){  
//        $('.uiBlockMenuPlace').addClass("full");
//        $('.uiBlockMenuPlace').removeClass("limit");
//        $('.uiBlockMenuWrap').removeClass("row");
//        $('.uiBlockMenu').addClass("sticky");
//    }
//    else{
//        $('.uiBlockMenuPlace').removeClass("full");
//        $('.uiBlockMenuPlace').addClass("limit");
//        $('.uiBlockMenuWrap').addClass("row");
//        $('.uiBlockMenu').removeClass("sticky");
//    }
//});
