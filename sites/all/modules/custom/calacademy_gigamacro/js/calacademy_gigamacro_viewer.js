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
	
	var _timeoutDisableMoveListener;
	var _timeoutAnimation;
	var _isAnimating = false;

	var _hackLeaflet = function () {
		L.Map.include({
			_catchTransitionEnd: function (e) {
				// prevent leaflet from prematurely killing animations
				if (_isAnimating) return;

				if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
					this._onZoomTransitionEnd();
				}
			}
		});
	}

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

		// collapse pins on any kind of map interaction
		_map.on('click', _setDefaultLegendContent);
		_map.on('move', _setDefaultLegendContent);
		
		_addMiniMap(tilesUrl);
		_addRefreshUI();
	}

	var _getArrayFromMatrix = function (str) {
		return str.match(/(-?[0-9\.]+)/g);
	}

	var _addMiniMap = function (tilesUrl) {
		var creature = new L.TileLayer(tilesUrl, {
			minZoom: 0,
			maxZoom: 7,
			noWrap: true
		});
		
		var d = _getMinimapDimensions();
		
		var miniMap = new L.Control.MiniMap(creature, {
			width: d.w,
			height: d.h,
			zoomLevelOffset: -4,
			aimingRectOptions: {
				stroke: false,
				fillColor: '#ff7800'
			},
			shadowRectOptions: {
				color: 'rgba(0,0,0,0)'
			}
		}).addTo(_map);
		
		$('#leaflet-map').append('<div id="minimap-bg" />');

		$(window).on('resize.minimap', function () {
			var d = _getMinimapDimensions();

			$('.leaflet-control-minimap').css('width', d.w);
			$('.leaflet-control-minimap').css('height', d.h);

			$('#minimap-bg').css('width', d.w / 2);
			$('#minimap-bg').css('height', d.h / 2);

			$('.leaflet-control-minimap svg').attr('shape-rendering', 'crispEdges');
		});

		$(window).trigger('resize.minimap');
	}

	var _getMinimapDimensions = function () {
		var w = Math.round($('#content').width() / 2.5);
		if (w % 2) w++;
		
		var h = Math.round($('#content').height() / 2.5);
		if (h % 2) h++;

		return {
			w: w,
			h: h
		};
	}

	var _addRefreshUI = function () {
		$('.leaflet-control-zoom').prepend('<a class="control-refresh" href="#">Refresh</a>');

		$('.control-refresh').on('click dblclick touchend', function () {
			if (_isAnimating) return false;

			_map.setView([0, 0], 1, {
				pan: {
					animate: false
				}
			});

			_setDefaultLegendContent();
			return false;
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

		if ($('html').hasClass('zoom-on-pin-click')) {
			var pinZoom = _getPinZoom(this.pinData);
			
			if (pinZoom !== false) {
				if (pinZoom > _map.getZoom()) {
					_slowPanZoom(this.getLatLng(), pinZoom);			
				}
			}
		}
	}

	var _slowPanZoom = function (targetLocation, targetZoom) {			
		// temporarily disable auto pin collapsing
		_map.off('move', _setDefaultLegendContent);
		clearTimeout(_timeoutDisableMoveListener);
		
		_timeoutDisableMoveListener = setTimeout(function () {
			_map.on('move', _setDefaultLegendContent);
		}, 1200);

		// do animation
		var transitionDuration = .9;
		$('html').addClass('slow-zoom');

		_isAnimating = true;
		clearTimeout(_timeoutAnimation);

		_timeoutAnimation = setTimeout(function () {
			_isAnimating = false;
			$('html').removeClass('slow-zoom');
		}, transitionDuration * 1000);

		_map.setView(targetLocation, targetZoom, {
			pan: {
				animate: true,
				duration: transitionDuration
			},
			zoom: {
				animate: true
			}
		});
	}

	var _setDefaultLegendContent = function () {
		if (_isAnimating) return;

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

	var _togglePins = function () {
		var selective = $('html').hasClass('toggle-specified-pins-on-zoom');

		// we're not doing selective zooming.
		// just show all pins and unbind the zoom event. 
		if (!selective) {
			_map.off('zoomend', _togglePins);

			$.each(_pins, function (i, pin) {
				_map.addLayer(pin);
			});

			return;
		}

		// selective zoom
		var mapZoom = _map.getZoom();

		$.each(_pins, function (i, pin) {
			var show = true;
			var pinZoom = _getPinZoom(pin.pinData);

			if (pinZoom !== false) {
				// pin zoom is greater than map zoom, hide
				if (pinZoom > mapZoom) {
					show = false;
				}	
			}
			
			if (show) {
				_map.addLayer(pin);	
			} else {
				_map.removeLayer(pin);
			}
		});
	}

	var _getPinZoom = function (pinData) {
		var z = pinData.appears_at_zoom;
			
		if (typeof(z) != 'undefined' && !$.isArray(z)) {
			var myInt = parseInt(z);

			if (isNaN(myInt)) {
				return false;
			} else {
				return myInt;
			}
		}
		
		return false; 	
	}

	var _onPinsData = function (data) {
		_pinsData = data;
		_initLegend();
		_initMap(_specimenData.field_gigamacro_specimen.und[0].taxonomy_term.name);
		_initPins();

		_map.on('zoomend', _togglePins);
		
		// not waiting until user zooms to show pins
		if (!$('html').hasClass('defer-pin-view')) {
			_togglePins();
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
		_hackLeaflet();

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
