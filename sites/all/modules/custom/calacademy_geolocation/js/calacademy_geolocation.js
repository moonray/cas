var CalAcademyGeolocation = function () {
	var $ = jQuery;
	var _map;
	var _floorLookup = {
		aq: 1733,
		main: 1735
	};

	var _injectMap = function () {
		_map = new CalAcademyGeolocationMap({
			lat: $('#edit-field-geolocation-und-0-lat').val(),
			lng: $('#edit-field-geolocation-und-0-lng').val(),
			floor: $('.field-name-field-building-floor select').val()
		});

		_map.injectMap($('.field-type-geolocation-latlng fieldset'));
	}

	var _createFloorSwitchUI = function () {
		// create element and add options from the real one
		var realSelect = $('.field-name-field-building-floor select');

		var select = $('<select />');
		select.addClass('floor-switcher');
		select.html(realSelect.html());

		// remove "none"
		$('option', select).each(function () {
			if (isNaN(parseInt($(this).attr('value')))) {
				$(this).remove();
			}
		});

		// add floor-switching interaction
		select.on('change', function () {
			if (isNaN(parseInt(realSelect.val()))) {
				// value not a number, set default
				$(this).val(_floorLookup.main);
				_map.switchFloor('main');
			} else {
				var v = parseInt($(this).val());

				// we have a selection
				for (var i in _floorLookup) {
					if (_floorLookup[i] == v) {
						_map.switchFloor(i);
						break;
					}
				}
			}

			// match real field so it gets recorded
			realSelect.val($(this).val());
		});

		select.trigger('change');

		// inject UI
		$('.calacademy_geolocation_map').append(select);
	}

	var _addPinListener = function () {
		// add pin move listener and alter field values
		var foo = new Object();

		foo.onPinMove = function (obj) {
			$('#edit-field-geolocation-und-0-lat').val(obj.lat());
			$('#edit-field-geolocation-und-0-lng').val(obj.lng());
		}

		_map.addListener(foo);
	}

	var _initPin = function () {
		if (_map.isSet()) {
			var loc = new google.maps.LatLng(
				parseFloat($('#edit-field-geolocation-und-0-lat').val()),
				parseFloat($('#edit-field-geolocation-und-0-lng').val())
			);

			_map.addPin(loc, true);
			_map.setCenter(loc);
		} else {
			// nothing set, create a pin and drop it in the middle
			_map.addPin();
		}
	}

	this.initialize = function () {
		// geoloc fields should be readonly
		var fields = $('.field-name-field-geolocation input, .field-name-field-building-floor select');
		fields.attr('readonly', 'true');

		// hide the "real" building floor dropdown
		$('.field-name-field-building-floor').hide();

		_injectMap();
		_createFloorSwitchUI();
		_addPinListener();
		_initPin();
	}

	this.initialize();
}
