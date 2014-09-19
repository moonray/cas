var CalAcademyMapView = function () {
	var $ = jQuery;
	var _mapObject;
	var _dock = false;
	var _mapData = new CalAcademyMapData();
	var _map = new CalAcademyMap();
	var _floors = new Object();
	var _floorLookup = new Object();
	var _markers = new Object();
	var _imagePath = '/sites/all/modules/custom/calacademy_map/images/';

	var _createFloorSwitchUI = function () {
		var select = $('<select />');
		$('.calacademy_geolocation_map').append(select);

		select.addClass('floor-switcher');

		// add options from floor data
		$.each(_floors, function (i, obj) {
			var opt = $('<option />');
			opt.html(obj.name);
			opt.attr('value', obj.machine_id);

			select.append(opt);
		});

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
		// basic marker options
		var options = {
			position: new google.maps.LatLng(
				parseFloat(obj.geolocation.lat),
				parseFloat(obj.geolocation.lng)
			),
			map: _mapObject,
			data: obj
		};

		// label
		var hasLabel = (_isValidProperty(obj.showlabel) && parseInt(obj.showlabel));

		if (hasLabel) {
			options.labelContent = obj.name;
		}

		var hasIcon = _isValidProperty(obj.icon);

		if (hasIcon) {
			if (obj.icon.toLowerCase() != 'pin') {
				// set path to custom icon
				var icon = obj.icon.toLowerCase();
				icon = icon.replace(/\s+/g, '-');

				options.icon = _imagePath + 'icons/' + icon + '.svg';
			}
		} else if (hasLabel) {
			// no icon, but we have a label, remove pin
			options.icon = _imagePath + 'empty.gif';
		}

		return new MarkerWithLabel(options);
	}

	var _isValidProperty = function (prop) {
		return (typeof(prop) == 'string' && prop != '');
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

			if (_isValidProperty(deets.title)) {
				title = deets.title;
			}
			if (_isValidProperty(deets.summary)) {
				desc = deets.summary;
			}
			if (_isValidProperty(deets.url)) {
				url = deets.url;
			}

			if (typeof(deets.thumbnail) == 'object') {
				if (_isValidProperty(deets.thumbnail.src)) {
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
		$.each(data, function (i, obj) {
			if (!obj.geolocation) return;
			if (calacademy.Utils.isArray(obj.geolocation)) return;

			if (!obj.floor) return;
			if (calacademy.Utils.isArray(obj.floor)) return;

			var marker = _addMarker(obj);
			marker.setVisible(false);
			google.maps.event.addListener(marker, 'click', _onMarkerSelect);

			var floorId = _floorLookup[obj.floor.tid];
			_markers[floorId].push(marker);
		});

		_showMarkers();
	}

	var _showMarkers = function () {
		var currentFloor = $('.floor-switcher').val();

		$.each(_markers, function (floor, arr) {
			$.each(arr, function (i, marker) {
				marker.setVisible(floor == currentFloor);
			});
		});
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
		$.each(_floors, function (i, obj) {
			_markers[obj.machine_id] = [];
			_floorLookup[obj.tid] = obj.machine_id;
		});
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
