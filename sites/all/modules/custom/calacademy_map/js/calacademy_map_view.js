var CalAcademyMapView = function () {
	var $ = jQuery;
	var _mapData = new CalAcademyMapData();
	var _map = new CalAcademyMap();
	var _floors = new Object();

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
		});

		select.trigger('change');

		// inject UI
		$('.calacademy_geolocation_map').append(select);
	}

	var _initMap = function () {
		_map.injectMap($('#content'));
		_createFloorSwitchUI();
	}

	this.initialize = function () {
		// get floor data, then init
		_mapData.getFloors(function (data) {
			_floors = data;
			_initMap();
		});
	}

	this.initialize();
}
