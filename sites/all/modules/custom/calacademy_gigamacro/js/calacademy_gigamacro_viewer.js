var CalAcademyGigamacroViewer = function (specimenData) {
	var $ = jQuery;
	var _specimenData = specimenData;
	var _map;
	var _pinsData;
	var _pins = [];

	var _initMap = function (tiles) {
		tiles = tiles.replace(/\s+/g, '-');

		// create container
		$('#content').append('<div id="leaflet-map" />');

		// create map
		_map = L.map('leaflet-map', {
			zoomControl: false
		});

		var zoomControl = new L.Control.Zoom({
			position: 'topright'
		}).addTo(_map);

		_map.setView([0, 0], 1, {
			pan: {
				animate: false
			}
		});

		var tilesUrl = '//s3-us-west-1.amazonaws.com/tiles.gigamacro.calacademy.org/';
		tilesUrl += tiles.toLowerCase() + '/{z}/{x}/{y}.png';

		var tiles = L.tileLayer(tilesUrl, {
			minZoom: 0,
			maxZoom: 7,
			noWrap: true
		});

		_map.addLayer(tiles);
		_map.on('click', _setDefaultLegendContent);
	}

	var _onMarkerClick = function () {
		$('#legend').addClass('pin-details');
		$('#legend .pin_title').html(this.pinData.title);

		if (this.pinData.description) {
			if (this.pinData.description.value) {
				$('#legend .details').html(this.pinData.description.value);
			}	
		}

		$('#legend .commenter_name').html(this.pinData.commenter_name);
		$('#legend .commenter_title').html(this.pinData.commenter_title);
		$('#legend .commenter_institution').html(this.pinData.commenter_institution);
	}

	var _togglePins = function (boo) {
		$.each(_pins, function (i, pin) {
			if (boo) {
				_map.addLayer(pin);	
			} else {
				_map.removeLayer(pin);
			}
		});
	}

	var _initPins = function () {
		L.Icon.Default.imagePath = '/sites/all/libraries/leaflet/images';

		$.each(_pinsData, function (i, obj) {
			var loc = [
				parseFloat(obj.geolocation.lat),
				parseFloat(obj.geolocation.lng)
			];

			var marker = L.marker(loc);
			marker.pinData = obj;
			marker.on('click', _onMarkerClick);

			_pins.push(marker);
		});		
	}

	var _setDefaultLegendContent = function () {
		$('#legend').removeClass('pin-details');
		$('#legend .common_name').html(_specimenData.title);

		var s = _getField('field_scientific_name');
		if (s) $('#legend .scientific_name').html(s.safe_value);

		var b = _getField('body');
		if (b) $('#legend .details').html(b.value);
	}

	var _initLegend = function () {
		$('#content').prepend('<div id="legend" />');
		$('#legend').html('<div class="return"><a href="/gigamacro">Return to Gallery</a></div><h1 class="common_name"></h1><h2 class="scientific_name"></h2><h2 class="pin_title"></h2><div class="details"></div><div class="commenter_name"></div><div class="commenter_title"></div><div class="commenter_institution"></div>');
		
		// go back if prototype
		if ($('html').hasClass('prototype')) {
			var e = Modernizr.touch ? 'touchend' : 'click';

			$('#legend .return a').on(e, function () {
				window.history.back();
				return false;
			});
		}

		_setDefaultLegendContent();
	}

	var _onZoomEnd = function () {
		_map.off('zoomend', _onZoomEnd);
		_togglePins(true);
	}

	var _onPinsData = function (data) {
		_pinsData = data;
		_initLegend();
		_initMap(_specimenData.field_gigamacro_specimen.und[0].taxonomy_term.name);
		_initPins();

		if ($('html').hasClass('pins-on-zoom')) {
			// defer showing pins until first zoom
			_map.on('zoomend', _onZoomEnd);
		} else {
			_togglePins(true);
		}
	}

	var _jsonRequest = function (path, myData, onSuccessCallback, onErrorCallback) {
		$.ajax({
			dataType: 'jsonp',
			url: '/rest/' + path,
			data: myData,
			cache: false,
			success: function (data, textStatus, XMLHttpRequest) {
				if (typeof(onSuccessCallback) == 'function') {
					onSuccessCallback(data);
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				if (typeof(onErrorCallback) == 'function') {
					onErrorCallback();
				}
			}
		});
	}

	var _getField = function (key) {
		if (_specimenData[key]) {
			if ($.isArray(_specimenData[key].und)) {
				if (_specimenData[key].und.length == 1) {
					return _specimenData[key].und[0];
				}
			}
		}

		return false;
	}

	this.initialize = function () {
		$('#content').empty();

		var spec = _getField('field_gigamacro_specimen');
		if (!spec) return;

		_jsonRequest('gigamacro-pins', { tid: spec.tid }, _onPinsData);
	}

	this.initialize();
}
