var CalAcademyGeolocation = function () {
	var $ = jQuery;
	var _map;
	var _floorLookup = new Object();
	var _mapData = new CalAcademyMapData();

	var _injectMap = function () {
		_map = new CalAcademyMap();
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
		// check if we have existing, valid values
		var isSet = true;

		var vals = {
			lat: $('#edit-field-geolocation-und-0-lat').val(),
			lng: $('#edit-field-geolocation-und-0-lng').val(),
			floor: $('.field-name-field-building-floor select').val()
		};

		for (var i in vals) {
			if (isNaN(parseInt(vals[i]))) {
				isSet = false;
				break;
			}
		}

		if (isSet) {
			// preexisting values
			var loc = new google.maps.LatLng(
				parseFloat(vals.lat),
				parseFloat(vals.lng)
			);

			_map.addPin(loc, true);
			_map.setCenter(loc);
		} else {
			// nothing set, create a pin and drop it in the middle
			_map.addPin();
		}
	}

	var _initMap = function () {
		_injectMap();
		_createFloorSwitchUI();
		_addPinListener();
		_initPin();
	}

	this.initialize = function () {
		// geoloc fields should be readonly
		var fields = $('.field-name-field-geolocation input, .field-name-field-building-floor select');
		fields.attr('readonly', 'true');

		// get floor data, then init
		_mapData.getFloors(function (data) {
			var i = 0;

			while (i < data.length) {
				var obj = data[i];
				i++;

				if (!obj) continue;
				if (isNaN(parseInt(obj.tid))) continue;

				_floorLookup[obj.machine_id] = parseInt(obj.tid);
			}

			_initMap();
		});
	}

	this.initialize();
}