(function ($, Drupal, window, document, undefined) {

	var _pageDailyCalendar = function () {
		// suppress iOS keyboard
		$('.form-item-field-date-value-value-date input').prop('readonly', true);

		// suppress typing
		$('.form-item-field-date-value-value-date input').on('focus', function () {
			$(this).trigger('blur');
		});

		// fix pagination that broke randomly
		$('#date-pager a').off('click');

		$('#date-pager a').on('click', function () {
			// suppress crazy clicks
			if ($('html').hasClass('ajax-loading')) return false;

			var arr = $(this).attr('href').split('/');
			var date = false;

			// weird views issue that appends the node id to the end
			// of the pagination href ala...
			// http://calacademy-local.calacademy.org/daily-calendar-view/2014-06-04//1876
			// ...so just find the first with a dash, starting at the end
			var i = arr.length;

			while (i--) {
				var d = arr[i];

				if (d.indexOf('-') >= 0) {
					date = d;
					break;
				}
			}

			if (date == false) return false;

			// set and trigger the real picker
			var realPicker = $('.views-widget-filter-field_date_value input');
			realPicker.val(date);
			realPicker.trigger('change');

			return false;
		});

		// add some weird style stuff once
		if ($('.js-clone').length > 0) return;

		var orig = $('.view-daily-calendar table');
		var clone = orig.clone();

		clone.addClass('js-clone');

		orig.after(clone);
	}

	var _fixHeroViewsImages = function () {
		// views
		var arr = [
			'.view .views-field-field-hero-region',
			'.view .views-field-field-image-primary'
		];

		$(arr.join(', ')).each(function () {
			calacademy.Utils.fixHeroField($('.field-content', this), $('.field-content > a', this));
		});

		// load effects
		calacademy.Utils.addImageLoadEvent($(arr.join(', ')));

		// user page
		calacademy.Utils.fixHeroField($('.pane-user-field-hero-region'), []);
	}

	var _exposedFilters = function () {
		// change the first option on exposed form selects to match the associated label
		$('.exposed-filters form label').each(function () {
			var str = $.trim($(this).text());
			var select = $('#' + $(this).attr('for'));

			if ($('option', select).length > 0) {
				$('option', select).first().text(str);
			}
		});

		// default text
		$('.exposed-filters input[type="text"]').each(function () {
			var label = $('label', $(this).parents('.views-exposed-widget'));
			$(this).attr('placeholder', $.trim(label.text()));
			$(this).defaultValue();
		});
	}

	var _addExtraClasses = function () {
		var classes = $.getQueryString('classes');

		if (typeof(classes) == 'string') {
			var arr = classes.split(',');

			$.each(arr, function (i, val) {
				$('html').addClass($.trim(val));
			});
		}
	}

	Drupal.behaviors.calacademy_zen = {
		'attach': function(context, settings) {
			_addExtraClasses();
			_exposedFilters();
			_fixHeroViewsImages();

			// remove whitespace in view DOM to account
			// for Android inline-block margin issue
			// @see http://davidwalsh.name/remove-whitespace-inline-block
			$('.view-content').cleanWhitespace();

			if ($('body').hasClass('page-daily-calendar')) {
				_pageDailyCalendar();
			}
		}
	}

	// load slideshow images
	var _calacademyLoad = function () {
		// make sure this only runs once
		if ($('html').hasClass('calacademy-has-loaded')) return;
		$('html').addClass('calacademy-has-loaded');

		// giant slideshows crash older touch devices
		// Android seems ok
		if (Modernizr.touch && !Modernizr.csspositionsticky && !calacademy.Utils.isMobile.Android()) {
			// remove everything but the first slide (offset by one per looping)
			var firstSlide = $('.slideshow-hero-large li').eq(1);
			$('.slideshow-hero-large').html(firstSlide.html());
		}

		$('img.delay-load').each(function () {
			// skip midfeature, see below
			if ($(this).parents('.slideshow-midfeature').length > 0) return;
			
			// homepage gets a special, shorter rendition
			if ($('body').hasClass('page-homepage')) {
				$(this).data('src', $(this).data('short-hero-src'));
			}

			var src = $(this).data('src');
			$(this).removeAttr('src');

			$(this).load(function () {
				$(window).trigger('resize.slideshow-layout');

				if ($(this).parents('.slideshow-hero-large').length > 0) {
					$(this).parents('li').addClass('slide-loaded');
					// $('.flex-caption', $(this).parents('li')).addClass('slide-loaded');
				}
			});

			if ($(this).parents('.slideshow-hero-large').length > 0 && $(window).width() < calacademy.Constants.breakpoints.tablet) {
				$(this).attr('src', $(this).data('smartphone-src'));
			} else {
				$(this).attr('src', src);
			}
		});

		// background img for midfeature
		$('.slideshow-midfeature .flexslider .slides li').each(function () {
			var img = $('.container > .views-field-field-slideshow-frame-bg-image img, .container > .field-name-field-slideshow-frame-bg-image img', this);

			if (img.length == 1) {
				$(this).css('background-image', 'url(' + img.data('src') + ')');
				img.removeAttr('data-src');
			}
		});

		// other homepage stuff
		if ($('body').hasClass('page-homepage')) {
			PageHomepageStatic.onPageLoad();
		}

		$(window).trigger('resize.slideshow-layout');

		setTimeout(function () {
			$(window).trigger('resize.slideshow-layout');
		}, 100);
	}

	// whichever runs first...
	$(window).load(_calacademyLoad);
	setTimeout(_calacademyLoad, 5000);

})(jQuery, Drupal, this, this.document);

