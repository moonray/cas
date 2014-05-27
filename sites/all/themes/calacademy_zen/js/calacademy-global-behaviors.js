(function ($, Drupal, window, document, undefined) {

	var _pageDailyCalendar = function () {
		// suppress iOS keyboard
		$('.form-item-field-date-value-value-date input').attr('readonly', 'true');

		// fix pagination that broke randomly
		$('#date-pager a').off('click');

		$('#date-pager a').on('click', function () {
			var arr = $(this).attr('href').split('/');
			var date = arr[arr.length - 1];

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
		var arr = [
			'.view .views-field-field-hero-region',
			'.view .views-field-field-image-primary'
		];

		$(arr.join(', ')).each(function () {
			calacademy.Utils.removeEmptyElements('a', this);

			if ($('img', this).length == 0) {
				// remove empty
				$(this).remove();
			} else {
				// simplify the DOM
				var img = $('img', this);
				var a = $('.field-content > a', this);
				
				if (a.length > 0) {
					a.html(img);
				} else {
					$('.field-content', this).html(img);
				}
			}
		});	
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

	Drupal.behaviors.calacademy_zen = {   
		'attach': function(context, settings) {
			if ($('body').hasClass('page-daily-calendar')) {
				_pageDailyCalendar();	
			}

			_exposedFilters();
			_fixHeroViewsImages();

			// remove whitespace in view DOM to account
			// for Android inline-block margin issue
			// @see http://davidwalsh.name/remove-whitespace-inline-block
			$('.view-content').cleanWhitespace();
		}
	}

})(jQuery, Drupal, this, this.document);
