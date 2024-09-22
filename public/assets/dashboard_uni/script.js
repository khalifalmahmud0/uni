"use strict";
jQuery(document).ready(function(){
    jQuery(".mobile-toggle").click(function(){
        jQuery(".nav-menus").toggleClass("open");
    });
    jQuery(".mobile-search").click(function(){
        jQuery(".form-control-plaintext").toggleClass("open");
    });
});

jQuery(window).on('load',function(){
    // jQuery('.loader-wrapper').fadeOut('slow', function() {
    //     jQuery(this).remove();
    // });
    window.jQuery('.loader-wrapper').fadeOut('slow', function () {});
})

jQuery(window).on('scroll', function() {
    if (jQuery(this).scrollTop() > 600) {
        jQuery('.tap-top').fadeIn();
    } else {
        jQuery('.tap-top').fadeOut();
    }
});
jQuery('.tap-top').click( function() {
    jQuery("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});
jQuery(document).ready(function(){
    if(jQuery( window ).width() <= 991 ) {
        jQuery("#sidebar-toggle").prop('checked', false);
        jQuery(".page-body-wrapper").addClass("sidebar-close");
    }
    jQuery("#sidebar-toggle").change(function(){
        if(jQuery("#sidebar-toggle").attr('checked', true))
        {
            jQuery(".page-sidebar").addClass("page-sidebar-open");
        }
    });
});
function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}
(function(jQuery, window, document, undefined) {
    "use strict";
    var jQueryripple = jQuery(".js-ripple");
    jQueryripple.on("click.ui.ripple", function(e) {
        var jQuerythis = jQuery(this);
        var jQueryoffset = jQuerythis.parent().offset();
        var jQuerycircle = jQuerythis.find(".c-ripple__circle");
        var x = e.pageX - jQueryoffset.left;
        var y = e.pageY - jQueryoffset.top;
        jQuerycircle.css({
            top: y + "px",
            left: x + "px"
        });
        jQuerythis.addClass("is-active");
    });
    jQueryripple.on(
        "animationend webkitAnimationEnd oanimationend MSAnimationEnd",
        function(e) {
            jQuery(this).removeClass("is-active");
        });
})(jQuery, window, document);

jQuery(".chat-menu-icons .toogle-bar").click(function(){
    jQuery(".chat-menu").toggleClass("show");
});