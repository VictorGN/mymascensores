/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function($) {
    "use strict";

    /* global google: false */

    /* ==============================================
        Full height home-section
    =============================================== */
    
        var windowHeight = $(window).height(),
              topSection = $('#hero-section'),
              headerHeight = $(".navbar").outerHeight(),
              calculatedHeight = windowHeight - headerHeight;
        topSection.css('height', calculatedHeight);
    
            $(window).resize(function(){
                var windowHeight = $(window).height(),
              headerHeight = $(".navbar").outerHeight(),
              calculatedHeight = windowHeight - headerHeight;
              topSection.css('height', calculatedHeight);      
        });

    /* ==============================================
        Hero slider
    =============================================== */  

        $('#slides').superslides({
            play: 10000,
            animation_speed: 800,
            pagination: true,
        });

    /* ==============================================
    superslider swipe on mobile devices
    =============================================== */

        $('#slides').swipe( {
            swipeLeft:function() {
                $(this).superslides('animate', 'next');
            },

            swiperight:function() {
                $(this).superslides('animate', 'prev');
            }
        });

    /* ==============================================
        Hero Contnet-slider
    =============================================== */ 

        $(".hero-content-slider").bxSlider({
            auto: true,          // Boolean:  (true/false)
            pause: 5000,         // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
            adaptiveHeight: true,
            controls: false,
            mode: 'fade',
            useCSS: false        // Boolean:  (true/false)
        });

    /* ==============================================
        Scrollspy
    =============================================== */

        $('body').scrollspy({
           target: '#navigation-nav',
           offset: 140      //px/
        });


    /* ==============================================
        Parallax
    =============================================== */
    
        $.stellar({
            responsive: true,
            horizontalScrolling: false,
            verticalOffset: 0
        });

    /* ==============================================
        Smooth Scroll on anchors
    =============================================== */  

        $('.section-scroll').on('click', function(e) {
            var anchor = $(this),
                anchorAttr = anchor.attr('href');

            $('html, body').stop().animate({
                scrollTop: $(anchorAttr).offset().top -62
            }, 1000);

            e.preventDefault();
        });


    /* =============================================== 
        Header animate after scroll
    =============================================== */

    (function() {

        var docElem = document.documentElement,
            didScroll = false,
            changeHeaderOn = 50;
            document.querySelector( 'header' );
            
        function init() {
            window.addEventListener( 'scroll', function() {
                if( !didScroll ) {
                    didScroll = true;
                    setTimeout( scrollPage, 100 );
                }
            }, false );
        }
        
        function scrollPage() {
            var sy = scrollY();
            if ( sy >= changeHeaderOn ) {
                $( 'header' ).addClass('active');
            }
            else {
                $( 'header' ).removeClass('active');
            }
            didScroll = false;
        }
        
        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }
        
        init();
        
    })();


    /* ==============================================
        BxSlider Testimonial
    =============================================== */ 

        $(".testimonials-slider").bxSlider({
            auto: true,          // Boolean:  (true/false)
            pause: 5000,         // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
            adaptiveHeight: true,
            controls: false,
            useCSS: false        // Boolean:  (true/false)
        });

    /* ==============================================
     BX-Slider Tweet
    =============================================== */

        $('.tweet-slider').bxSlider({
          adaptiveHeight: true,
          controls: false,
          auto: true,
          pager: false
        });

    /* ==============================================
     Project slider
    =============================================== */

        $('.project-slider').bxSlider({
          mode: 'fade',
          pager: false,
          auto: true
        });


    /* ==============================================
        Collapse menu on click
    =============================================== */

        $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
            if($(window).width() < 768 )
                $('.navbar-collapse').collapse('hide');
        });


    /* ==============================================
     accordion
    =============================================== */

        var allPanels = $(".accordion > dd").hide();

        allPanels.first().slideDown("easeOutExpo");

        $(".accordion").each(function () {
            $(this).find("dt > a").first().addClass("active").parent().next().css({display: "block"});
        });

        $(".accordion > dt > a").click(function () {

            var current = $(this).parent().next("dd");
            $(this).parents(".accordion").find("dt > a").removeClass("active");
            $(this).addClass("active");
            $(this).parents(".accordion").find("dd").slideUp("easeInExpo");
            $(this).parent().next().slideDown("easeOutExpo");

            return false;

        });

    /* ---------------------------------------------------------------------------
     * TABS
     * --------------------------------------------------------------------------- */
     
        var $tabNavigation = $(".tabs-navigation a");
            $tabNavigation.on("click", function (e) {
                $(this).tab("show"), e.preventDefault();
                return false;
            });


    /* ==============================================
        Animated content
    =============================================== */

        $('.animated').appear(function(){
            var el = $(this);
            var anim = el.data('animation');
            var animDelay = el.data('delay');
            if (animDelay) {

                setTimeout(function(){
                    el.addClass( anim + " in" );
                    el.removeClass('out');
                }, animDelay);

            }
            else {
                el.addClass( anim + " in" );
                el.removeClass('out');
            }    
        },{accY: -150});  


    /* ==============================================
        Counter increment
    =============================================== */

        function countUp() {   
            var dataperc;   
            $('.statistic-percent').each(function(){
                dataperc = $(this).attr('data-perc'),
                $(this).find('.percentfactor').delay(6000).countTo({
                    from: 0,                 // number to begin counting
                    to: dataperc,      
                    speed: 1000,             // ms
                    refreshInterval: 10,
                });  
            });
        }   
        
        $('.statistic-percent').waypoint(function() {
            countUp();
        },
        {
            offset: '95%',                 
            triggerOnce: true
        });

    /* ==============================================
        Placeholder
    =============================================== */ 

    $('input, textarea').placeholder();


    /* ==============================================
        MailChip
    =============================================== */

    $('.mailchimp').ajaxChimp({
        callback: mailchimpCallback,
        url: "http://clas-design.us10.list-manage.com/subscribe/post?u=5ca5eb87ff7cef4f18d05e127&amp;id=9c23c46672" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
    });

    function mailchimpCallback(resp) {
         if (resp.result === 'success') {
            $('.subscription-success').html('<span class="icon-happy"></span><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);
        
        } else if(resp.result === 'error') {
            $('.subscription-error').html('<span class="icon-sad"></span><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-success').fadeOut(500);
        }  
    }

    /* ==============================================
        Google Map
    =============================================== */

        var mapLocation = new google.maps.LatLng(34.031428,-118.2071542,17); //change coordinates map here
        var $mapis = $('#map');
        if ($mapis.length > 0) {
            var map;
            map = new GMaps({
                streetViewControl : true,
                overviewMapControl: true,
                mapTypeControl: true,
                zoomControl : true,
                panControl : true,
                scrollwheel: false,
                center: mapLocation,
                el: '#map',
                zoom: 16,
                styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
            });
            var image = new google.maps.MarkerImage('assets/images/map-icon.png');
            map.addMarker({
                position: mapLocation,
                icon: image,
                title: 'Vortex',
                infoWindow: {
                    content: '<p><strong>Vortex</strong><br/>121 Somewhere Ave, Suite 123<br/>P: (123) 456-7890<br/>Australia</p>'
                }
            });
        }

    /* ==============================================
        clients carousel
    =============================================== */

        $("#clients-carousel").owlCarousel({
 
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items : 7,
            pagination: false,
            itemsDesktop : [1199,3], //number of items displayed on resolution less then 1199px
            itemsDesktopSmall : [979,5], //number of items displayed on resolution less then 979px
            itemsTablet : [768, 3]
 
        });

    /* ==============================================
        Contact Form
    =============================================== */

    $('#contactform').submit(function(){

        var action = $(this).attr('action');

        $("#alert").slideUp(750,function() {
            $('#alert').hide();

        $('#submit')
            .after('<img src="assets/images/ajax-loader.GIF" class="contactloader" />')
            .attr('disabled','disabled');

        $.post(action, {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        },
            function(data){
                document.getElementById('alert').innerHTML = data;
                $('#alert').slideDown('slow');
                $('#contactform img.contactloader').fadeOut('slow',function(){$(this).remove();});
                $('#submit').removeAttr('disabled');
                if(data.match('success') !== null) {
                    $('#name').val('');
                    $('#email').val('');
                    $('#message').val('');
                }
            }
        );

        });

        return false;

    });


    /* ==============================================
        Responsive video
    =============================================== */
    
        $(".project-video, .responsive-vid").fitVids();


    /* ==============================================
        MagnificPopup - lightbox effect
    =============================================== */

        $('.video-pop-up').magnificPopup({
            type: 'iframe',
        });

        // Example with multiple objects
        $('.zoom-gallery').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
             mainClass: 'mfp-with-zoom', // this class is for CSS animation below
               zoom: {
                 enabled: true, // By default it's false, so don't forget to enable it
                 duration: 300, // duration of the effect, in milliseconds
                 easing: 'ease-in-out', // CSS transition easing function
                 opener: function(openerElement) {
                   return openerElement.is('img') ? openerElement : openerElement.find('img');
                 }
               }
        });

        // Example with multiple objects
        $('.zoom').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },

        });


    /* ==============================================
        owl-related-portfolio
    =============================================== */

        $(".related-carousel").owlCarousel({
 
            autoPlay: 10000, //Set AutoPlay to 3 seconds
            items : 4,
            itemsDesktop : [1199,3], //number of items displayed on resolution less then 1199px
            itemsDesktopSmall : [979,3] //number of items displayed on resolution less then 979px
 
        });

    /* ==============================================
        OWL Carousel (initialize screenshot carousel)
    =============================================== */
    
    $(".screenshots-carousel").owlCarousel({
 
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items : 3,
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [979,3],
        itemsTablet : [768, 3]
 
    });


    /* ==============================================
    Fade In .back-to-top
    =============================================== */

    $(window).scroll(function () {

        if (

            $(this).scrollTop() > 500) 

        {
            $('.back-to-top').fadeIn();
        } 

        else {
            $('.back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0,
            easing: 'swing'
        }, 750);
        return false;
    });

});

$(window).load(function(){
    "use strict";

    /* ==============================================
    Preloader
    =============================================== */

    // will first fade out the loading animation
    $("#loading-animation").fadeOut();
    // will fade out the whole DIV that covers the website.
    $("#preloader").delay(600).fadeOut("slow");
    
    /* ==============================================
    Isotope
    =============================================== */

        // FIlter
        if( $("#filter").length>0 ) {
            var container = $('#filter');
            container.isotope({
                itemSelector: '.gallery-item',
                transitionDuration: '0.8s'
            });
            $(".filter").click(function(){
                $(".filter.active").removeClass("active");
                $(this).addClass("active");
                var selector = $(this).attr('data-filter');
                container.isotope({ 
                    filter: selector
                });
                return false;
            });

            $(window).resize(function(){
                setTimeout(function(){
                    container.isotope();
                },1000);
            }).trigger('resize');
        }

            if ( $('#type-masory').length ) {

            var $container = $('#type-masory');

            $container.imagesLoaded( function(){
              $container.fadeIn(1000).isotope({
                itemSelector : '.masonry-item'
              });
            });
        }
});