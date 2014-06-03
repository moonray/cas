(function ($, Drupal, window, document, undefined) {

	var _pageDailyCalendar = function () {
		// suppress iOS keyboard
		$('.form-item-field-date-value-value-date input').attr('readonly', 'true');

		// fix pagination that broke randomly
		$('#date-pager a').off('click');

		$('#date-pager a').on('click', function () {
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
		var arr = [
			'.view .views-field-field-hero-region',
			'.view .views-field-field-image-primary'
		];

		$(arr.join(', ')).each(function () {
			calacademy.Utils.fixHeroField($('.field-content', this), $('.field-content > a', this));
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
