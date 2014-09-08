var CalAcademyMapView = function () {
	var $ = jQuery;
	var _mapObject;
	var _dock = false;
	var _mapData = new CalAcademyMapData();
	var _map = new CalAcademyMap();
	var _floors = new Object();
	var _floorLookup = new Object();
	var _markers = new Object();

	var _createFloorSwitchUI = function () {
		var select = $('<select />');
		$('.calacademy_geolocation_map').append(select);

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
			_showMarkers();
			if (_dock != false) _dock.hide();
		});

		select.trigger('change');
	}

	var _addMarker = function (obj) {
		return new MarkerWithLabel({
			position: new google.maps.LatLng(
				parseFloat(obj.geolocation.lat),
				parseFloat(obj.geolocation.lng)
			),
			map: _mapObject,
			data: obj
		});
	}

	var _onMarkerSelect = function () {
		_dock.empty();

		var title = this.data.name;
		var desc = this.data.description;
		var url = false;
		var img = false;

		// check if we have details
		if (!calacademy.Utils.isArray(this.data.detail)) {
			var deets = this.data.detail;

			var _isValid = function (prop) {
				return (typeof(prop) == 'string' && prop != '');
			}

			if (_isValid(deets.title)) {
				title = deets.title;
			}
			if (_isValid(deets.summary)) {
				desc = deets.summary;
			}
			if (_isValid(deets.url)) {
				url = deets.url;
			}

			if (typeof(deets.thumbnail) == 'object') {
				if (_isValid(deets.thumbnail.src)) {
					img = deets.thumbnail.src;
				}
			}
		}

		// thumbnail
		if (img !== false) {
			var thumb = $('<img />');
			thumb.attr('src', img);
			_dock.append(thumb);
		}

		// title
		var h2 = $('<h2 />');
		h2.html(title);
		_dock.append(h2);

		// description
		if (desc != '') {
			var descEl = $('<div class="details-desc" />');
			descEl.html(desc);
			_dock.append(descEl);
		}

		// link
		if (url !== false) {
			var link = $('<div class="details-link" />');
			var a = $('<a />');
			a.html('View details');
			a.attr('href', url);
			link.append(a);

			_dock.append(link);
		}

		_dock.show();
	}

	var _createMarkers = function (data) {
		var i = data.length;

		while (i--) {
			var obj = data[i];

			if (!obj.geolocation) continue;
			if (calacademy.Utils.isArray(obj.geolocation)) continue;

			if (!obj.floor) continue;
			if (calacademy.Utils.isArray(obj.floor)) continue;

			var marker = _addMarker(obj);
			marker.setVisible(false);
			google.maps.event.addListener(marker, 'click', _onMarkerSelect);

			var floorId = _floorLookup[obj.floor.tid];
			_markers[floorId].push(marker);
		}

		_showMarkers();
	}

	var _showMarkers = function () {
		var currentFloor = $('.floor-switcher').val();

		for (var i in _markers) {
			var arr = _markers[i];
			var j = arr.length;

			while (j--) {
				var marker = arr[j];
				marker.setVisible(i == currentFloor);
			}
		}
	}

	var _initDock = function () {
		_dock = $('<div id="map-dock" />');
		$('.calacademy_geolocation_map').append(_dock);
	}

	var _initMap = function () {
		_map.injectMap($('#content'));
		_mapObject = _map.getMapObject();
		_createFloorSwitchUI();
		_initDock();

		google.maps.event.addListener(_mapObject, 'click', function () {
			if (_dock != false) _dock.hide();
		});
	}

	var _setFloorData = function () {
		var i = _floors.length;

		while (i--) {
			var obj = _floors[i];
			_markers[obj.machine_id] = [];
			_floorLookup[obj.tid] = obj.machine_id;
		}
	}

	this.initialize = function () {
		_mapData.getAll(function (data) {
			_floors = data.floors;
			_setFloorData();

			_initMap();
			_createMarkers(data.locations);
		});
	}

	this.initialize();
}
