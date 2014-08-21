var CalAcademyMapView = function () {
	var $ = jQuery;
	var _mapData = new CalAcademyMapData();
	var _map = new CalAcademyMap();
	var _floors = new Object();
	var _floorLookup = new Object();
	var _pins = new Object();

	var _createFloorSwitchUI = function () {
		var select = $('<select />');
		select.addClass('floor-switcher');

		// add options from floor data
		var i = 0;

		while (i < _floors.length) {
			var obj = _floors[i];

			var opt = $('<option />');
			opt.html(obj.name);
			opt.attr('value', obj.machine_id);

			select.append(opt);

			i++;
		}

		// preselect main
		select.val('main');

		// add switching interaction
		select.on('change', function () {
			_map.switchFloor($(this).val());
			_showPins();
		});

		select.trigger('change');

		// inject UI
		$('.calacademy_geolocation_map').append(select);
	}

	var _createPins = function (data) {
		var i = data.length;

		while (i--) {
			var obj = data[i];

			if (!obj.geolocation) continue;
			if (calacademy.Utils.isArray(obj.geolocation)) continue;

			if (!obj.floor) continue;
			if (calacademy.Utils.isArray(obj.floor)) continue;

			var pin = _map.addPin(new google.maps.LatLng(
				parseFloat(obj.geolocation.lat),
				parseFloat(obj.geolocation.lng)
			));

			pin.setVisible(false);

			var floorId = _floorLookup[obj.floor.tid];
			_pins[floorId].push(pin);
		}

		_showPins();
	}

	var _showPins = function () {
		var currentFloor = $('.floor-switcher').val();

		for (var i in _pins) {
			var arr = _pins[i];
			var j = arr.length;

			while (j--) {
				var pin = arr[j];
				pin.setVisible(i == currentFloor);
			}
		}
	}

	var _initDock = function () {
		var div = $('<div id="map-dock" />');
		div.html('<h2>Map Dock</h2><p>Lorem ipsum</p>');

		$('.calacademy_geolocation_map').append(div);
	}

	var _initMap = function () {
		_map.injectMap($('#content'));
		_createFloorSwitchUI();
		_initDock();
		_mapData.getLocations(_createPins);
	}

	var _setFloorData = function () {
		var i = _floors.length;

		while (i--) {
			var obj = _floors[i];
			_pins[obj.machine_id] = [];
			_floorLookup[obj.tid] = obj.machine_id;
		}
	}

	this.initialize = function () {
		_mapData.getFloors(function (data) {
			_floors = data;
			_setFloorData();
			_initMap();
		});
	}

	this.initialize();
}
