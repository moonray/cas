var CalAcademyGigamacroViewer = function (specimenData) {
	var $ = jQuery;
	var _specimenData = specimenData;
	var _pinsData;
	var _map;
	var _pins = [];
	var _highlightTimeout;
	var _heightTimeout;

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
		_addRefreshUI();
	}

	var _addRefreshUI = function () {
		$('.leaflet-control-zoom').prepend('<a class="control-refresh" href="#">Refresh</a>');

		$('.control-refresh').on('click dblclick touchend', function () {
			_map.setView([0, 0], 1, {
				pan: {
					animate: false
				}
			});

			_setDefaultLegendContent();
			return false;
		});
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

			var myIcon = L.divIcon({
				className: 'calacademy-pin calacademy-pin-id-' + obj.nid,
				iconSize: [62, 68],
				iconAnchor: [31, 48],
				html: '<div>pin</div>'
			});

			var marker = L.marker(loc, {
				icon: myIcon
			});

			marker.pinData = obj;
			marker.on('click', _onMarkerClick);

			_pins.push(marker);
		});		
	}

	var _animateLegned = function (originalHeight) {
		if ($('html').hasClass('prototype')) return;

		var newHeight = $('#legend').height();
	    
	    $('#legend').height(originalHeight);		
		$('#legend').height(newHeight);

		clearTimeout(_heightTimeout);
		
		_heightTimeout = setTimeout(function () {
			$('#legend').height('auto');
		}, 600);
	}

	var _onMarkerClick = function (e) {
		var originalHeight = $('#legend').height();

		$('#legend').addClass('pin-details');
		$('.calacademy-pin').removeClass('selected');
		$('.calacademy-pin-id-' + this.pinData.nid).addClass('selected');
		
		clearTimeout(_highlightTimeout);
		
		$('#legend').removeClass('highlight');
		$('#legend').addClass('highlight');

		_highlightTimeout = setTimeout(function () {
			$('#legend').removeClass('highlight');
		}, 1000);

		$('#legend .pin_title').html(this.pinData.title);

		$('#legend .details').empty();

		if (this.pinData.description) {
			if (this.pinData.description.value) {
				$('#legend .details').html(this.pinData.description.value);
			}	
		}

		$('#legend .commenter .name').html(this.pinData.commenter_name);
		$('#legend .commenter .title').html(this.pinData.commenter_title);
		$('#legend .commenter .institution').html(this.pinData.commenter_institution);

		if ($.trim($('#legend .commenter').text()) == '') {
			$('#legend .commenter').addClass('empty');
		} else {
			$('#legend .commenter').removeClass('empty');
		}

		_animateLegned(originalHeight);
	}

	var _setDefaultLegendContent = function () {
		var originalHeight = $('#legend').height();

		$('.calacademy-pin').removeClass('selected');
		$('#legend').removeClass('pin-details');
		$('#legend .common_name').html(_specimenData.title);

		var s = _getField('field_scientific_name');
		if (s) $('#legend .scientific_name').html(s.safe_value);

		var b = _getField('body');
		if (b) $('#legend .details').html(b.value);

		_animateLegned(originalHeight);
	}

	var _initLegend = function () {
		$('#content').prepend('<div id="legend" />');
		$('#legend').html('<div class="return"><a href="/gigamacro">Return to Gallery</a></div><h1 class="common_name"></h1><h2 class="scientific_name"></h2><h2 class="pin_title pin_stuff"></h2><div class="details"></div><div class="commenter pin_stuff"><div class="name"></div><div class="title"></div><div class="institution"></div></div>');
		
		// go back if prototype
		if ($('html').hasClass('prototype')) {
			$('#legend .return a').on('touchend click', function () {
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

	var inst = this;
	this.initialize();

	// account for weird bfcaching (back-forward cache) behavior
	$(window).bind('pageshow', function (event) {
	    try {
		    if (event.originalEvent.persisted) {
		    	calacademy.Utils.log('persisted');
		    	inst.initialize();    
		    }
	    } catch (err) {}
	});
}
