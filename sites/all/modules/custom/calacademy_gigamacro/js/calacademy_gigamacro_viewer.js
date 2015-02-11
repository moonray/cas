var CalAcademyGigamacroViewer = function (specimenData) {
	var $ = jQuery;
	var _specimenData = specimenData;
	var _pinsData;
	var _map;

	var _initMap = function (tiles) {
		// create container
		$('#content').html('<div id="leaflet-map" />');
		
		// create map
		_map = L.map('leaflet-map');

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
	}

	var _initPins = function () {
		L.Icon.Default.imagePath = '/sites/all/libraries/leaflet/images';

		$.each(_pinsData, function (i, obj) {
			var loc = [
				parseFloat(obj.geolocation.lat),
				parseFloat(obj.geolocation.lng)
			];

			var marker = L.marker(loc).addTo(_map);
		});
	}

	var _onPinsData = function (data) {
		_pinsData = data;
		_initMap(_specimenData.field_gigamacro_specimen.und[0].taxonomy_term.name);
		_initPins();
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

	this.initialize = function () {
		var myTid = parseInt(_specimenData.field_gigamacro_specimen.und[0].tid);
		_jsonRequest('gigamacro-pins', { tid: myTid }, _onPinsData);
	}

	this.initialize();
}
