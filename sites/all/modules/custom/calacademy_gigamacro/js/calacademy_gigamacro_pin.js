var CalAcademyGigamacroPin = function () {
	var $ = jQuery;
	var _tiles;
	var _map = false;
	var _marker = false;

	var _injectMap = function (specimen) {
		if (!_map) {
			var mapDom = $('<div id="leaflet-map" />');
			$('.field-type-geolocation-latlng fieldset').append(mapDom);

			_map = L.map('leaflet-map');

			_map.setView([0, 0], 1, {
				pan: {
					animate: false
				}
			});	
		}
		
		var tilesUrl = '//s3-us-west-1.amazonaws.com/tiles.gigamacro.calacademy.org/';
		tilesUrl += specimen + '/{z}/{x}/{y}.png';

		// refreshing with a diff tileset
		if (_tiles) _map.removeLayer(_tiles);

		_tiles = L.tileLayer(tilesUrl, {
			minZoom: 0,
			maxZoom: 7,
			noWrap: true
		});

		_map.addLayer(_tiles);
	}

	var _onMarkerMove = function (e) {
		var coords = e.target.getLatLng();

		$('#edit-field-geolocation-und-0-lat').val(coords.lat);
		$('#edit-field-geolocation-und-0-lng').val(coords.lng);
	}

	var _initPin = function () {
		var markerOptions = {
			draggable: true
		};

		// check if we have existing, valid values
		var isSet = true;

		var vals = {
			lat: $('#edit-field-geolocation-und-0-lat').val(),
			lng: $('#edit-field-geolocation-und-0-lng').val()
		};

		for (var i in vals) {
			if (isNaN(parseInt(vals[i]))) {
				isSet = false;
				break;
			}
		}

		if (isSet) {
			// preexisting values
			var loc = [
				parseFloat(vals.lat),
				parseFloat(vals.lng)
			];

			_marker = L.marker(loc, markerOptions).addTo(_map);
		} else {
			// nothing set, create a pin and drop it in the middle
			_marker = L.marker(_map.getCenter(), markerOptions).addTo(_map);
		}

		// add listener
		_marker.on('drag', _onMarkerMove);
	}

	var _onSpecimenSelect = function () {
		var v = $(this).val();

		if (v == '_none') {
			// destroy map
			if (_map) {
				_map.remove();
				$('#leaflet-map').remove();
				_map = false;
				_marker = false;
			}

			return;
		}

		// init the map
		var selected = $('#edit-field-gigamacro-specimen select option[value="' + v + '"]');
		_injectMap(selected.html().toLowerCase());
		
		// init pin
		if (!_marker) _initPin();
	}

	this.initialize = function () {
		// geoloc fields should be readonly
		var fields = $('.field-name-field-geolocation input');
		fields.attr('readonly', 'true');

		// icon image path
		L.Icon.Default.imagePath = '/sites/all/libraries/leaflet/images';

		// init speciment select
		$('#edit-field-gigamacro-specimen select').on('change', _onSpecimenSelect);
		$('#edit-field-gigamacro-specimen select').trigger('change');
	}

	this.initialize();
}
