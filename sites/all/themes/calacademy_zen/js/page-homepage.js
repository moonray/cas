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
		target = $('#people .views-row-4');

		if (testimonial.length == 1 && target.length == 1) {
			testimonial.addClass('dynamic-css');
			testimonial.css('position', 'absolute');
			testimonial.css('left', parseInt(target.position().left) + 'px');

			var t = calacademy.Utils.getRowHeight(target);
			t += parseInt(target.css('marginBottom'));

			testimonial.css('top', t + 'px');
		}
	}

	this.layout = _layout;

	var _mlens = function () {
		// just a prototype
		if (!$('html').hasClass('macro')) return;

		var img = $('#animal-ambassadors img, #explore-library img');

		// img not found
		if (img.length == 0) return;

		// plugin not found
		if (typeof($.fn.mlens) != 'function') return;

		img.each(function () {
			// skip invisible images
			if (!$(this).is(':visible')) return;

			if (typeof($(this).data('mlens')) == 'undefined') {
				// init mlens
				var myZoomLevel = 1;

				switch ($(this).attr('id')) {
					case 'tarantula':
						myZoomLevel = 1.2;
						break;
					case 'frog':
						myZoomLevel = 1.5;
						break;
				}

				$(this).mlens({
					imgSrc: $(this).attr('src'),
					imgSrc2x: $(this).attr('src'),
					lensShape: 'circle',
					lensCss: 'zoom-lens',
					lensShowClass: 'zoom-lens-show',
					lensHideClass: 'zoom-lens-hide',
					lensSize: 300,
					borderSize: 1,
					borderColor: '#dfdfdf',
					wrapperClass: 'zoom-wrapper',
					zoomLevel: myZoomLevel
				});
			} else {
				/*
				// alter mlens options on the fly
				$(this).mlens('update', {
					borderColor: 'green'
				});
				*/
			}
		});
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
