(function($) {
  "use strict"; // Start of use strict

  var getScrollOffset = function() {
    return $("#mainNav").outerHeight() || 57;
  };

  // Dampen wheel/trackpad scroll so the page moves with more control.
  var scrollDamping = 0.75;
  var pendingWheelDelta = 0;
  var wheelFrame = null;
  var shouldDampenWheel = function(event) {
    return event.deltaY &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey &&
      !$(event.target).closest('input, textarea, select, [contenteditable="true"], .mfp-wrap').length;
  };
  var normalizeWheelDelta = function(event) {
    var delta = event.deltaY;
    if (event.deltaMode === 1) {
      delta = delta * 16;
    } else if (event.deltaMode === 2) {
      delta = delta * window.innerHeight;
    }
    return delta * scrollDamping;
  };
  window.addEventListener('wheel', function(event) {
    if (!shouldDampenWheel(event)) {
      return;
    }
    event.preventDefault();
    pendingWheelDelta += normalizeWheelDelta(event);
    if (!wheelFrame) {
      wheelFrame = window.requestAnimationFrame(function() {
        window.scrollBy(0, pendingWheelDelta);
        pendingWheelDelta = 0;
        wheelFrame = null;
      });
    }
  }, { passive: false });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - getScrollOffset())
        }, 760, "easeInOutCubic");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: getScrollOffset() + 1
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  var ticking = false;
  $(window).scroll(function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        navbarCollapse();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll reveal calls
  window.sr = ScrollReveal({
    distance: '24px',
    duration: 700,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    viewFactor: 0.18
  });
  sr.reveal('.sr-icons', {
    scale: 0.92,
    distance: '16px'
  }, 200);
  sr.reveal('.skill-panel', {
    interval: 90,
    origin: 'bottom'
  });
  sr.reveal('.sr-button', {
    delay: 200
  });
  sr.reveal('.sr-contact', {
    scale: 0.94,
    distance: '16px'
  }, 300);

  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

})(jQuery); // End of use strict
