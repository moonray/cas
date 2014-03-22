(function ($, Drupal, window, document, undefined) {

	var _pageDailyCalendar = function () {
		// suppress iOS keyboard
		$('.form-item-field-date-value-value-date input').attr('readonly', 'true');

		// add some weird style stuff once
		if ($('.js-clone').length > 0) return;

		var orig = $('.view-daily-calendar table');
		var clone = orig.clone();

		clone.addClass('js-clone');

		orig.after(clone);
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
		}
	}

})(jQuery, Drupal, this, this.document);
