var CalAcademyGigamacroViewer = function (specimenData) {
	var $ = jQuery;
	var _map;
	var _tiles;
	var _tilesLocation = '//s3-us-west-1.amazonaws.com/tiles.gigamacro.calacademy.org/';
	var _specimenData = specimenData;
	var _pinsData;
	var _pinSvg;
	var _pins = [];
	
	var _timeoutHighlight;
	var _timeoutLegendContent;

	var _initMap = function (tiles) {
		_tiles = tiles.replace(/\s+/g, '-').toLowerCase();

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

		var tilesUrl = _tilesLocation;
		tilesUrl += _tiles + '/{z}/{x}/{y}.png';

		var tiles = L.tileLayer(tilesUrl, {
			minZoom: 0,
			maxZoom: 7,
			noWrap: true
		});

		_map.addLayer(tiles);
		_map.on('click', _setDefaultLegendContent);
		
		_addMiniMap(tilesUrl);
		_addRefreshUI();
	}

	var _addMiniMap = function (tilesUrl) {
		return;
		
		$('#content').append('<div id="minimap" />');
		$('#content').append('<div id="minimap-bg" />');
		
		var img = $('<img />');
		img.attr('src', _tilesLocation + _tiles + '/0/0/0.png');
		$('#minimap').html(img);

		var _onMove = function () {
			var z = (_map.getZoom() < 1) ? '.5' : _map.getZoom();
			var b = _map.getBounds();

			img.css('transform', 'translateZ(0) translateY(-50%) scale(' + z / 2 + ')');
			// img.css('left', '-' + c.lng + 'px');
		}

		_map.on('move', _onMove);
		_onMove();

		// _map.on('move', function () {
		// 	calacademy.Utils.log('on move');
		// });

		// var creature = new L.TileLayer(tilesUrl, {
		// 	minZoom: 0,
		// 	maxZoom: 7,
		// 	noWrap: true
		// });
		
		// var miniMap = new L.Control.MiniMap(creature, {
		// 	width: 300,
		// 	height: 200
		// }).addTo(_map);
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
				iconAnchor: [31, 58],
				html: '<div class="svg-container">' + _pinSvg + '</div><div class="shadow">shadow</div>'
			});

			var marker = L.marker(loc, {
				icon: myIcon
			});

			marker.pinData = obj;
			marker.on('touchend click', _onMarkerClick);

			_pins.push(marker);
		});		
	}

	var _animateLegend = function (originalHeight) {
		// still working on this
		if ($('html').hasClass('prototype') && !$('html').hasClass('animate')) return;

		clearTimeout(_timeoutLegendContent);
		$('#legend, #legend #dynamic').addClass('no-animation');
		
		// height
		$('#legend').height('auto');
		var newHeight = $('#legend').height();
	    $('#legend').height(originalHeight);	

	    // opacity
		$('#legend #dynamic').css('opacity', 0);

		_timeoutLegendContent = setTimeout(function () {
			$('#legend, #legend #dynamic').removeClass('no-animation');
			$('#legend #dynamic').css('opacity', 1);

			var dur = 600;

			if (Math.abs(newHeight - originalHeight) < 100) {
				dur = 400;
			}

			$('#legend').css('transition-duration', dur + 'ms')
			$('#legend').height(newHeight);
		}, 10);
	}

	var _onMarkerClick = function (e) {
		// prevent redundant clicks
		if ($('.calacademy-pin-id-' + this.pinData.nid).hasClass('selected')) return;

		var originalHeight = $('#legend').height();

		$('#legend').addClass('pin-details');
		$('.calacademy-pin.selected').removeClass('selected');
		$('.calacademy-pin-id-' + this.pinData.nid).addClass('selected');
		
		clearTimeout(_timeoutHighlight);
		
		$('#legend').removeClass('highlight');
		$('#legend').addClass('highlight');

		_timeoutHighlight = setTimeout(function () {
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

		_animateLegend(originalHeight);
	}

	var _setDefaultLegendContent = function () {
		var doAnimation = ($('#legend').hasClass('pin-details'));

		var originalHeight = $('#legend').height();

		$('.calacademy-pin').removeClass('selected');
		$('#legend').removeClass('pin-details');
		$('#legend .common_name').html(_specimenData.title);

		var s = _getField('field_scientific_name');
		if (s) $('#legend .scientific_name').html(s.safe_value);

		var b = _getField('body');
		if (b) $('#legend .details').html(b.value);

		if (doAnimation) _animateLegend(originalHeight);
	}

	var _initLegend = function () {
		$('#content').prepend('<div id="legend" />');
		$('#legend').html('<div class="return"><a href="/gigamacro">Return to Gallery</a></div><h1 class="common_name"></h1><h2 class="scientific_name"></h2><div id="dynamic"><h3 class="pin_title pin_stuff"></h3><div class="details"></div><div class="commenter pin_stuff"><div class="name"></div><div class="title"></div><div class="institution"></div></div></div>');
		
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

		// get pin svg, then load pin data
		var foo = $('<div />');

		foo.load('/sites/all/themes/calacademy_zen/images/gigamacro/pin.svg', function () {
			_pinSvg = $(this).html();
			_jsonRequest('gigamacro-pins', { tid: spec.tid }, _onPinsData);
		});
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
