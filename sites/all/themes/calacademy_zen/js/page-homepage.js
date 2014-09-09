var PageHomepage = function () {
	var $ = jQuery;
	var _device;
	var _injectPlaceholderContentTimeout;
	var _navStuckClass = 'scroll-to-fixed-fixed';

	var _placeUnder = function (anchor, target) {
		if (anchor.length == 0 || target.length == 0) return;

		target.addClass('dynamic-css');
		target.css('position', 'absolute');
		target.css('top', anchor.position().top + anchor.outerHeight(true) + 'px');
		target.css('left', anchor.position().left + 'px');
	}

	var _getTestimonial = function () {
		return $('.pane-testimonials-related .views-row .testimonial').eq(0);
	}

	var _injectPlaceholderContent = function () {
		// #people panel description
		$('#people .pane-title').after($('#people-description').html());

		// testimonials
		$('#events').append(_getTestimonial());
		$('#people').append(_getTestimonial());

		_layout();
	}

	var _layout = function () {
		if (_device.indexOf('smartphone') >= 0) return;

		// #events testimonial
		var testimonial = $('#events .testimonial');
		var target = $('#events .views-row-5');

		if (testimonial.length == 1 && target.length == 1) {
			testimonial.addClass('dynamic-css');
			testimonial.css('position', 'absolute');
			testimonial.css('top', parseInt(target.css('marginTop')) + parseInt(target.position().top) + parseInt($('.views-field-field-hero-region, .views-field-field-image-primary, .views-field-field-slideshow-frame-bg-image', target).width()) + 'px');
		}

		// #people testimonial
		testimonial = $('#people .testimonial');

		// @debug
		// $('p', testimonial).html('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.');
		// $('p', testimonial).html('Lorem ipsum dolor sit amet');

		target = $('#people .views-row-4');

		if (testimonial.length == 1 && target.length == 1) {
			testimonial.addClass('dynamic-css');
			testimonial.css('position', 'absolute');
			testimonial.css('left', parseInt(target.position().left) + 'px');

			var t = calacademy.Utils.getRowHeight(target);
			t += parseInt(target.css('marginBottom'));

			testimonial.css('top', t + 'px');
		}

		// does the testimonial extend past the bottom boundry of its container?
		var testimonialPos = $('#people .testimonial').position();
		if (!testimonialPos) return;

		$('#people').css('height', 'inherit');

		var testimonialTop = testimonialPos.top;
		var containerHeight = $('#people').outerHeight(true);
		var testimonialHeight = $('#people .testimonial').outerHeight(true);

		if (containerHeight < (testimonialHeight + testimonialTop)) {
			$('#people').addClass('dynamic-css');
			$('#people').css('height', (containerHeight + (testimonialHeight - testimonialTop)) + 'px');
		}
	}

	this.layout = _layout;

	var _mlens = function () {
		PageHomepageStatic.mlens();
	}

	this.onBreakpoint = function (device) {
		_device = device;
		_layout();
		_mlens();
	}

	this.onFontLoad = function () {
		clearTimeout(_injectPlaceholderContentTimeout);
		_injectPlaceholderContentTimeout = setTimeout(_injectPlaceholderContent, 1000);
	}

	var _windowScroll = function (e) {
		// already handled by ScrollToFixed
		if (!Modernizr.csspositionsticky) return;

		var scroll = $(window).scrollTop();
		var navTop = $('nav').offset().top;

		// elastic scrolling
		if (scroll > navTop) return;

		if (scroll == navTop) {
			$('nav').addClass(_navStuckClass);
		} else {
			$('nav').removeClass(_navStuckClass);
		}
	}

	var _windowResize = function (e) {
		var aspect = 630 / 1500;
		var w = $('body').outerWidth();
		var h = Math.floor(w * aspect);

		$('.slideshow-hero-large, .slideshow-hero-large .flexslider').css('height', h + 'px');

		_windowScroll();
	}

	this.initialize = function () {
		$(window).on('resize.home-check-scroll', _windowResize);
		$(window).on('scroll.home-check-scroll', _windowScroll);
		$(window).trigger('resize.home-check-scroll');
	}

	this.initialize();
}

var PageHomepageStatic = {
	onPageLoad: function () {
		var $ = jQuery;

		$('html').addClass('page-loaded');

		$('img.delay-load').each(function () {
			var src = $(this).data('src');
			$(this).attr('src', src);
			$(this).removeAttr('data-src');
		});

		PageHomepageStatic.mlens();
	},
	mlens: function () {
		var $ = jQuery;

		if (!$('html').hasClass('page-loaded')) return;

		var img = $('#animal-ambassadors img').eq(0);

		// img not found
		if (img.length != 1) return;

		// plugin not found
		if (typeof($.fn.mlens) != 'function') return;

		var myZoomLevel;
		var myLensSize;

		switch (calacademy.Statics.device) {
			case 'smartphone':
				myZoomLevel = .4;
				myLensSize = 175;
				break;
			case 'tablet':
				myZoomLevel = .6;
				myLensSize = 225;
				break;
			default:
				myZoomLevel = .75;
				myLensSize = 300;
		}

		img.each(function () {
			// skip invisible images
			if (!$(this).is(':visible')) return;

			PageHomepageStatic.destroyMlens($(this));

			// init mlens
			$(this).mlens({
				imgSrc: $(this).attr('src'),
				imgSrc2x: $(this).attr('src'),
				lensShape: 'circle',
				lensCss: 'zoom-lens',
				lensShowClass: 'zoom-lens-show',
				lensHideClass: 'zoom-lens-hide',
				lensSize: myLensSize,
				borderSize: 1,
				borderColor: '#dfdfdf',
				wrapperClass: 'zoom-wrapper',
				zoomLevel: myZoomLevel
			});
		});
	},
	// native mlens destroy method removes the entire image
	destroyMlens: function (img) {
		var $ = jQuery;

		$('.zoom-lens').remove();
		img.removeAttr('data-id');
		if (img.parent().hasClass('zoom-wrapper')) img.unwrap();
		img.next('img').remove();
	}
};

jQuery(window).load(function () {
	if (jQuery('body').hasClass('page-homepage')) {
		PageHomepageStatic.onPageLoad();
	}
});
