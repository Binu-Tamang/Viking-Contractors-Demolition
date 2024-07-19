(function ($) {
	
	"use strict";

	// Window Resize Mobile Menu Fix
	mobileNav();
	welcomeFix();


	// Scroll animation init
	window.sr = new scrollReveal();


	// // Welcome area init
	if($('.owl-carousel').length){
		var welcomeSlider = $(".owl-carousel");
		welcomeSlider.owlCarousel({
			loop:true,
			margin:10,
			nav:false,
			margin: 30,
			responsive:{
				0:{
					items: 1.5
				},
				600:{
					items: 2.5
				},
				1000:{
					items: 2.5
				}
			}
		});

		checkClasses();
		welcomeSlider.on('translated.owl.carousel', function(event) {
			checkClasses();
		});

		function checkClasses(){
			var total = $('.owl-carousel .owl-stage .owl-item.active').length;

			$('.owl-carousel .owl-stage .owl-item').removeClass('firstActiveItem');

			$('.owl-carousel .owl-stage .owl-item.active').each(function(index){
				if (index === 0) {
					$(this).addClass('firstActiveItem');
				}
			});
		}	

		$('.base .prev').on('click', function(){
			welcomeSlider.trigger('prev.owl.carousel');
		});

		$('.base .next').on('click', function(){
			welcomeSlider.trigger('next.owl.carousel');
		});
	}


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// About me progressbar
	if($('.skill-wrapper').length){
		$('.skill-wrapper .skill-item').each(function(index){
			var val = $(this).find('.line').data('value');
			$(this).find('.line').css('width', val);
		});
	}


	// Home number counterup
	if($('.count-item').length){
		$('.count-item strong').counterUp({
			delay: 10,
			time: 1000
		});
	}


	// Blog cover image
	if($('.blog-post-single').length){
		$('.blog-post-single').imgfix();
	}


	// Blog grid cover image
	if($('.blog-post-grid').length){
		$('.blog-post-grid').imgfix();
	}


	// Sidebar contact banner image
	if($('.sidebar .box').length) {
		$('.sidebar .box').imgfix();
	}


	// Project grid cover image
	if($('.project-grid-item').length){
		$('.project-grid-item .img').imgfix();
	}


	// Project list cover image
	if($('.project-list-item').length){
		$('.project-list-item .img').imgfix();
	}


	// Page standard gallery
	if($('.page-gallery').length && $('.page-gallery-wrapper').length){
		$('.page-gallery').imgfix({
			scale: 1.1
		});

		$('.page-gallery').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300,
				easing: 'ease-in-out',
			}
		});
	}



	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$(".preloader-wrapper").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				// Home Parallax
				if($('.parallax-image').length){
					$('.parallax-image').parallax({
						imageSrc: 'assets/images/photos/parallax/contractor-1.jpg',
						zIndex: '1'
					});
				}

				// Home Parallax Counterup
				if($('.parallax-counter').length){
					$('.parallax-counter').parallax({
						imageSrc: 'assets/images/photos/parallax/demolition-2.jpg',
						zIndex: '1'
					});
				}
				$(".preloader-wrapper").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
		welcomeFix();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 992) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


	// Welcome area set position
	function welcomeFix() {
		if($('.welcome').length){
			var height = $(window).height();
			var wwidth = $(window).width();

			if(wwidth > 992) {	
				$('.welcome').css('height', height);
				var sliderPosition = ($('.slider-position').offset().left);

				$('.slider-wrapper').css({
					'left': sliderPosition,
					'width': wwidth - sliderPosition,
					'position': 'absolute'
				});
			}else{
				$('.welcome').css('height', 'auto');
				$('.slider-wrapper').css({
					'left': '0px',
					'width': '100%',
					'position': 'relative'
				});
			}
		}
	}


})(window.jQuery);

/*=========================================================================
	Main Slider
=========================================================================*/ 
$(document).ready(function () {

	$('#main-slider').on('init', function(e, slick) {
		var $firstAnimatingElements = $('div.single-slide:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);    
	});
	$('#main-slider').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
			  var $animatingElements = $('div.single-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			  doAnimations($animatingElements);    
	});
	$('#main-slider').slick({
	   autoplay: true,
	   autoplaySpeed: 10000,
	   dots: true,
	   fade: true,
	   prevArrow: '<div class="slick-prev"><i class="fa fa-chevron-left"></i></div>',
			nextArrow: '<div class="slick-next"><i class="fa fa-chevron-right"></i></div>'
	});
	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function() {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function() {
				$this.removeClass($animationType);
			});
		});
	}
});


// projects owl carasoul 
$(document).ready(function(){
	$('.owl-carousel.project-box').owlCarousel({
		loop: false,
        margin: 5,
        autoplay: true,
        // smartSpeed: 500,
        nav: false,
        navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
        dots: false,
        responsive : {
            0 : {
                items: 1
            },
            580 : {
                items: 2,
            },
            768 : {
                items: 2,
            },
            992 : {
                items: 4,
            }
        }
	});
});

/*=========================================================================
    Active venobox
=========================================================================*/
$(document).ready(function() {
    $('.img-popup').venobox({
        numeratio: true,
        infinigall: true
    });
});


// TESTIMONIAL JS 
$(document).ready(function(){
    $(".owl-carousel.testimonial-owl").owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:2
            }
        }
    });
});
