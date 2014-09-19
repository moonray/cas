var PageDailyCalendar = function () {
	var $ = jQuery;
	var _viewDate;
	var _lastSelectedDate;
	var _html5Picker;

	var _getOption = function (i) {
		var myFormat = 'YYYY-MM-DD';
		var option = $('<option />');
		var date = moment(_lastSelectedDate, myFormat).add(i, 'days');

		option.val(date.format(myFormat));
		option.html(date.format('dddd, MMMM Do'));

		return option;
	}

	var _createPseudoPicker = function () {
		_html5Picker = $('<select />');

		_html5Picker.attr({
			'id': 'html5-date-picker'
		});

		_html5Picker.addClass('pseudo-picker');
		_setPseudoOptions();
	}

	var _setPseudoOptions = function () {
		if (!_html5Picker.hasClass('pseudo-picker')) return;

		_html5Picker.empty();

		var i = 0;

		while (i < 60) {
			var future = _getOption(i);

			if (i == 0) {
				future.attr('selected', 'true');
			}

			_html5Picker.append(future);

			if (i > 0) {
				var past = _getOption(i * -1);
				_html5Picker.prepend(past);
			}

			i++;
		}
	}

	var _initHtml5Picker = function () {
		if (Modernizr.inputtypes.date && Modernizr.touch) {
			_html5Picker = $('<input />');

			_html5Picker.attr({
				'id': 'html5-date-picker',
				'type': 'date',
				'value': _viewDate
			});
		} else {
			_createPseudoPicker();
		}

		// some style stuff
		_html5Picker.on('focus', function () {
			$('.panel-col-first .view-header').addClass('active');
		});

		// listen for a value change and trigger AJAX
		var myEvent = calacademy.Utils.isMobile.Android() ? 'change keypress paste textInput input' : 'blur';
		if (!Modernizr.touch) myEvent = 'change';

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

				if ($(this).hasClass('pseudo-picker')) {
					_setPseudoOptions();
				}
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
