(function ($) {
  "use strict";

  // Window Resize Mobile Menu Fix
  mobileNav();
  welcomeFix();

  // Scroll animation init
  window.sr = new scrollReveal();

  // // Welcome area init
  if ($(".owl-carousel.contractor").length) {
    var welcomeSlider = $(".owl-carousel.contractor");
    welcomeSlider.owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      responsive: {
        0: {
          items: 1.5,
        },
        600: {
          items: 2.5,
        },
        1000: {
          items: 2.5,
        },
      },
    });
  
    checkClasses();
    welcomeSlider.on("translated.owl.carousel", function (event) {
      checkClasses();
    });
  
    function checkClasses() {
      var total = $(".owl-carousel.contractor .owl-stage .owl-item.active").length;
  
      $(".owl-carousel.contractor .owl-stage .owl-item").removeClass("firstActiveItem");
  
      $(".owl-carousel.contractor .owl-stage .owl-item.active").each(function (index) {
        if (index === 0) {
          $(this).addClass("firstActiveItem");
        }
      });
    }
  
    $(".base .prev").on("click", function () {
      welcomeSlider.trigger("prev.owl.carousel");
    });
  
    $(".base .next").on("click", function () {
      welcomeSlider.trigger("next.owl.carousel");
    });
  }
  

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function () {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  // About me progressbar
  if ($(".skill-wrapper").length) {
    $(".skill-wrapper .skill-item").each(function (index) {
      var val = $(this).find(".line").data("value");
      $(this).find(".line").css("width", val);
    });
  }



  /*=========================================================================
	Counter Up Active
    =========================================================================*/
  var counterSelector = $(".counter");
  counterSelector.counterUp({
    delay: 10,
    time: 1000,
  });

  // Blog cover image
  if ($(".blog-post-single").length) {
    $(".blog-post-single").imgfix();
  }

  // Blog grid cover image
  if ($(".blog-post-grid").length) {
    $(".blog-post-grid").imgfix();
  }

  // Sidebar contact banner image
  if ($(".sidebar .box").length) {
    $(".sidebar .box").imgfix();
  }

  // Project grid cover image
  if ($(".project-grid-item").length) {
    $(".project-grid-item .img").imgfix();
  }

  // Project list cover image
  if ($(".project-list-item").length) {
    $(".project-list-item .img").imgfix();
  }
  // $(".parallax-image").parallax({
  //   imageSrc: "assets/images/photos/parallax/contractor-1.jpg",
  //   zIndex: "1",
  // });

  // Page standard gallery
  if ($(".page-gallery").length && $(".page-gallery-wrapper").length) {
    $(".page-gallery").imgfix({
      scale: 1.1,
    });

    $(".page-gallery").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true,
        duration: 300,
        easing: "ease-in-out",
      },
    });
  }

  // Page loading animation
  $(window).on("load", function () {
    if ($(".cover").length) {
      $(".cover").parallax({
        imageSrc: $(".cover").data("image"),
        zIndex: "1",
      });
    }

    $(".preloader-wrapper").animate(
      {
        opacity: "0",
      },
      600,
      function () {
        setTimeout(function () {
          // Home Parallax
       

          // Home Parallax Counterup
          // if ($(".parallax-counter").length) {
          //   $(".parallax-counter").parallax({
          //     imageSrc: "assets/images/photos/parallax/demolition-2.jpg",
          //     zIndex: "1",
          //   });
          // }
          $(".preloader-wrapper").css("visibility", "hidden").fadeOut();
        }, 300);
      }
    );
  });
  $(window).on("resize", function () {
    mobileNav();
    welcomeFix();
  });

  // Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $(".submenu").on("click", function () {
      if (width < 992) {
        $(".submenu ul").removeClass("active");
        $(this).find("ul").toggleClass("active");
      }
    });
  }

  // Welcome area set position
  function welcomeFix() {
    if ($(".welcome").length) {
      var height = $(window).height();
      var wwidth = $(window).width();

      if (wwidth > 992) {
        $(".welcome").css("height", height);
        var sliderPosition = $(".slider-position").offset().left;

        $(".slider-wrapper").css({
          left: sliderPosition,
          width: wwidth - sliderPosition,
          position: "absolute",
        });
      } else {
        $(".welcome").css("height", "auto");
        $(".slider-wrapper").css({
          left: "0px",
          width: "100%",
          position: "relative",
        });
      }
    }
  }
})(window.jQuery);

/*=========================================================================
	Main Slider
=========================================================================*/
$(document).ready(function () {
  $("#main-slider").on("init", function (e, slick) {
    var $firstAnimatingElements = $("div.single-slide:first-child").find(
      "[data-animation]"
    );
    doAnimations($firstAnimatingElements);
  });
  $("#main-slider").on(
    "beforeChange",
    function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $(
        'div.single-slide[data-slick-index="' + nextSlide + '"]'
      ).find("[data-animation]");
      doAnimations($animatingElements);
    }
  );
  $("#main-slider").slick({
    autoplay: true,
    autoplaySpeed: 20000,
    dots: true,
    fade: true,
    prevArrow:
      '<div class="slick-prev"><i class="fa fa-chevron-left"></i></div>',
    nextArrow:
      '<div class="slick-next"><i class="fa fa-chevron-right"></i></div>',
  });
  function doAnimations(elements) {
    var animationEndEvents =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    elements.each(function () {
      var $this = $(this);
      var $animationDelay = $this.data("delay");
      var $animationType = "animated " + $this.data("animation");
      $this.css({
        "animation-delay": $animationDelay,
        "-webkit-animation-delay": $animationDelay,
      });
      $this.addClass($animationType).one(animationEndEvents, function () {
        $this.removeClass($animationType);
      });
    });
  }
});

// projects owl carasoul
$(document).ready(function () {
  $(".owl-carousel.project-box").owlCarousel({
    loop: false,
    margin: 5,
    autoplay: true,
    // smartSpeed: 500,
    nav: true,
    // navText: [
    //   '<i class="fa fa-caret-left"></i>',
    //   '<i class="fa fa-caret-right"></i>',
    // ],
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      580: {
        items: 2,
      },
      768: {
        items: 2,
      },
      992: {
        items: 4,
      },
    },
  });
});

/*=========================================================================
    Active venobox
=========================================================================*/
$(document).ready(function () {
	$(".img-popup").venobox({
	  numeratio: true,
	  infinigall: true,
	});
  });

// TESTIMONIAL JS
$(document).ready(function () {
  $(".owl-carousel.testimonial-owl").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 5000,
    nav: true,
    dots: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});

if ($(".owl-carousel.defac-list-owl").length) {
    var welcomeSlider = $(".owl-carousel.defac-list-owl");
    welcomeSlider.owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        responsive: {
            0: {
                items: 1, // Show 1 item on screens 0px to 599px wide
            },
            600: {
                items: 2, // Show 1 item on screens 600px to 999px wide
            },
            1000: {
                items: 2, // Show 1 item on screens 1000px and wider
            },
        },
    });
}


// ==============for the dropdown click 
document.addEventListener('DOMContentLoaded', function() {
  var submenuToggle = document.querySelectorAll('.submenu-toggle');
  
  submenuToggle.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
          var submenu = this.nextElementSibling;
          
          // Toggle the display of the submenu
          if (submenu.style.display === 'block') {
              submenu.style.display = 'none';
          } else {
              submenu.style.display = 'block';
          }
          
          // Toggle the 'open' class on the parent li
          this.parentElement.classList.toggle('open');
      });
  });
});



$(document).ready(function() {
  $(".ba-slider").each(function() {
      $(this).beforeAfter();
  });
});

/*====================================
        // Isotop Active
        ======================================*/
       // Ensure Isotope is loaded before initializing
  if ($.fn.isotope) {
    $(".isotop-active").isotope({
      filter: "*",
    });

    $(".gallery-nav ul li").on("click", function () {
      $(".gallery-nav ul li").removeClass("active");
      $(this).addClass("active");

      var selector = $(this).attr("data-filter");
      $(".isotop-active").isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: "easeInOutQuart",
          queue: false,
        },
      });
      return false;
    });
  }
