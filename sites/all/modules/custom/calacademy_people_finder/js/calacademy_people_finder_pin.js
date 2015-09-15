var CalAcademyPeopleFinderPin = function () {
	var $ = jQuery;
	var _tiles;
	var _defaultZoom = 4;
	var _defaultFloor = 'L1';
	var _map = false;
	var _marker = false;

	var _injectMap = function (floor) {
		if (!_map) {
			var mapDom = $('<div id="leaflet-map" />');
			$('.field-type-geolocation-latlng fieldset').append(mapDom);

			_map = L.map('leaflet-map', {
				crs: L.extend({}, L.CRS.EPSG3857, {wrapLat: null, wrapLng: null})
			});

			// center to preset pin if we have one
			var loc = [0, 0];
			var vals = _getPresetPinCoords();

			if (vals !== false) {
				loc = [
					parseFloat(vals.lat),
					parseFloat(vals.lng)
				];
			}

			_map.setView(loc, _defaultZoom, {
				pan: {
					animate: false
				}
			});
		}

		var tilesUrl = peopleFinder.tilesLocation;
		tilesUrl += floor.toLowerCase() + '/{z}/{x}/{y}.png';

		// refreshing with a diff tileset
		if (_tiles) _map.removeLayer(_tiles);

		_tiles = L.tileLayer(tilesUrl, {
			minZoom: peopleFinder.minZoom,
			maxZoom: peopleFinder.maxZoom
		});

		_map.addLayer(_tiles);
	}

	var _onMarkerMove = function (e) {
		var coords = e.target.getLatLng();

		$('#edit-field-geolocation-und-0-lat').val(coords.lat);
		$('#edit-field-geolocation-und-0-lng').val(coords.lng);
	}

	var _getPresetPinCoords = function () {
		var isSet = true;

		var vals = {
			lat: $('#edit-field-geolocation-und-0-lat').val(),
			lng: $('#edit-field-geolocation-und-0-lng').val()
		};

		for (var i in vals) {
			if (isNaN(parseFloat(vals[i]))) {
				isSet = false;
				break;
			}
		}

		if (!isSet) return false;
		return vals;
	}

	var _initPin = function () {
		var markerOptions = {
			draggable: true
		};

		// put pin in the center if no coordinates specified
		var loc = _map.getCenter();
		var vals = _getPresetPinCoords();

		if (vals !== false) {
			loc = [
				parseFloat(vals.lat),
				parseFloat(vals.lng)
			];
		}

		_marker = L.marker(loc, markerOptions).addTo(_map);

		// add listener
		_marker.on('drag', _onMarkerMove);
	}

	var _createFloorSwitchUI = function () {
		// create element and add options from the real one
		var realSelect = $('#edit-field-floorplan-floor select');
		var defaultVal = $("option:contains('" + _defaultFloor + "')", realSelect).attr('value');

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
				$(this).val(defaultVal);
			}

			var v = $(this).val();

			// match real field so it gets recorded
			realSelect.val(v);

			// set map tiles
			_injectMap($('option[value="' + v + '"]', this).html());

			// init pin
			if (!_marker) _initPin();
		});

		select.trigger('change');

		// inject UI
		$('.leaflet-top.leaflet-right').append(select);
	}

	this.initialize = function () {
		// geoloc fields should be readonly
		var fields = $('.field-name-field-geolocation input');
		fields.attr('readonly', 'true');

		// icon image path
		L.Icon.Default.imagePath = '/sites/all/libraries/leaflet/images';

		_createFloorSwitchUI();
	}

	this.initialize();
}
