(function ($, Drupal, window, document, undefined) {
	Drupal.behaviors.calacademy_zen = {   
		'attach': function(context, settings) {
			if (!$('body').hasClass('page-daily-calendar')) return;

			// suppress iOS keyboard
			// this selector doesn't work (race condition with datepicker js)
			// $('.date-popup-init').attr('readonly', 'true');

			$('.form-item-field-date-value-value-date input').attr('readonly', 'true');

			// add some weird style stuff once
			if ($('.js-clone').length > 0) return;

			var orig = $('.view-daily-calendar table');
			var clone = orig.clone();

			clone.addClass('js-clone');

			orig.after(clone);
		}
	}

})(jQuery, Drupal, this, this.document);

var PageDailyCalendar = function () {
	var $ = jQuery;
	var _viewDate;
	var _lastSelectedDate;
	var _html5Picker;

	var _initHtml5Picker = function () {
		// create the picker
		_html5Picker = $('<input />');
		
		_html5Picker.attr({
			'id': 'html5-date-picker',
			'type': 'date',
			'value': _viewDate
		});

		// some style stuff
		_html5Picker.on('focus', function () {
			$('.panel-col-first .view-header').addClass('active');
		});

		// listen for a value change and trigger AJAX
		var myEvent = calacademy.Utils.isMobile.Android() ? 'change keypress paste textInput input' : 'blur';

		_html5Picker.on(myEvent, function () {
			var val = $(this).val();
			$('.panel-col-first .view-header').removeClass('active');

			if (val != _lastSelectedDate) {
				calacademy.Utils.log('triggering AJAX: ' + val);

				// set and trigger the real picker
				var realPicker = $('.views-widget-filter-field_date_value input');
				realPicker.val(val);
				realPicker.trigger('change');
				
				_lastSelectedDate = val;	
			}
		});

		// insert into the DOM
		_html5Picker.insertBefore('.pane-daily-calendar .view');
	}

	this.initialize = function () {
		calacademy.Utils.log('PageDailyCalendar.initialize');

		// the 'page' date
		_viewDate = $('.view-header h3').data('date');
		_lastSelectedDate = _viewDate;

		// setup our fancy new picker and tell it to trigger the real one
		_initHtml5Picker();
	}

	this.initialize();
}
