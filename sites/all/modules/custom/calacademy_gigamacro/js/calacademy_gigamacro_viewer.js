var CalAcademyGigamacroViewer = function (specimenData) {
	var $ = jQuery;
	var that = this;
	var _map;
	var _tiles;
	var _index = false;
	var _specimenData = specimenData;
	var _pinsData;
	var _pinSvg;
	var _pins = [];
	var _lastPin;
	var _slider;
	var _mapCollapseEvents = 'click zoomstart';
	
	var _timeoutHighlight;
	var _timeoutBubbleContent;
	var _timeoutDisableMoveListener;
	var _timeoutAnimation;

	var _isAnimating = false;
	var _fingerString = 'Use your fingers to zoom';

	var _timeouts = [
		_timeoutHighlight,
		_timeoutBubbleContent,
		_timeoutDisableMoveListener,
		_timeoutAnimation
	];

	var _hackLeaflet = function () {
		// prevent leaflet from prematurely killing animations
		L.Map.include({
			_catchTransitionEnd: function (e) {
				if (_isAnimating) return;

				if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
					this._onZoomTransitionEnd();
				}
			}
		});
	}

	var _initMap = function (tiles) {
		_tiles = gigamacro.utils.getTilesMachineName(tiles);

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

		var tilesUrl = gigamacro.tilesLocation;
		tilesUrl += _tiles + '/{z}/{x}/{y}.png';

		var tiles = L.tileLayer(tilesUrl, {
			minZoom: 0,
			maxZoom: 7,
			noWrap: true
		});

		_map.addLayer(tiles);
		_addMiniMap(tilesUrl);
	}

	var _removeFingers = function () {
		_map.off('click move', _removeFingers);
		
		$('#fingers').css('opacity', 0);

		setTimeout(function () {
			$('#fingers').remove();
		}, 395);
	}

	var _setRemoveFingersListener = function () {
		$('.leaflet-map-pane').off('touchstart', _setRemoveFingersListener);
		_map.off('mousedown zoomstart', _setRemoveFingersListener);
		
		_map.on('click move', _removeFingers);
	}

	var _addFingers = function () {
		$('#content').append('<div id="fingers"><div>' + _fingerString + '</div></div>');

		setTimeout(function () {
			$('#fingers').css('opacity', 1);
		}, 10);

		setTimeout(function () {
			$('#fingers div').addClass('pulse');
		}, 410);

		// remove fingers on any kind of movement
		$('.leaflet-map-pane').on('touchstart', _setRemoveFingersListener);
		_map.on('mousedown zoomstart', _setRemoveFingersListener);
	}

	var _addMiniMap = function (tilesUrl) {
		var creature = new L.TileLayer(tilesUrl, {
			minZoom: _map.getMinZoom(),
			maxZoom: _map.getMaxZoom(),
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
		_pin = [];

		var iconWidth = 82;
		var iconHeight = 82;

		var mySize = [iconWidth, iconHeight];
		var myAnchor = [iconWidth / 2, 65];

		$.each(_pinsData, function (i, obj) {
			var loc = [
				parseFloat(obj.geolocation.lat),
				parseFloat(obj.geolocation.lng)
			];

			var myIcon = L.divIcon({
				className: 'calacademy-pin calacademy-pin-id-' + obj.nid,
				iconSize: mySize,
				iconAnchor: myAnchor,
				html: '<div class="svg-container">' + _pinSvg + '</div><div class="shadow">shadow</div>'
			});

			var pin = L.marker(loc, {
				icon: myIcon,
				clickable: false
			});

			pin.pinData = obj;

			// add interaction
			pin.on('add', function (e) {
				var start = Modernizr.touch ? 'touchstart' : 'mousedown';
				var end = Modernizr.touch ? 'touchend' : 'click';

				$('.calacademy-pin-id-' + obj.nid).on(start, function () {
					if (!$(this).hasClass('selected')) {
						_map.off(_mapCollapseEvents, _setDefaultLegendContent);
					}

					return false;
				});
				$('.calacademy-pin-id-' + obj.nid).on(end + ' dblclick', function () {
					_onPinClick(obj, loc);
					return false;
				});
			});

			_pins.push(pin);
		});

		// collapse pins on any kind of movement
		_map.on(_mapCollapseEvents, _setDefaultLegendContent);
	}

	var _closeBubble = function () {
		$('#bubble').removeClass('show');
		
		if (_lastPin) {
			_lastPin.removeClass('selected');
			_lastPin = false;
		}
	}

	var _animateBubbleContent = function () {
		clearTimeout(_timeoutBubbleContent);
		
		var d = $('#bubble .dynamic');
		d.addClass('no-animation');	
	    d.css('opacity', 0);

		_timeoutBubbleContent = setTimeout(function () {
			d.removeClass('no-animation');
			d.css('opacity', 1);
		}, 10);
	}

	var _updateBubbleContent = function (pinData) {
		clearTimeout(_timeoutHighlight);

		if ($('#bubble').hasClass('show')) {
			// fade content
			_animateBubbleContent();
		} else {
			// no content fade
			var d = $('#bubble .dynamic');
			d.addClass('no-animation');	
	    	d.css('opacity', 1);
		}

		$('#bubble').removeClass('highlight');
		$('#bubble').addClass('highlight');
		$('#bubble').addClass('show');

		_timeoutHighlight = setTimeout(function () {
			$('#bubble').removeClass('highlight');
		}, 1000);

		$('#bubble .details').empty();

		if (pinData.description) {
			if (pinData.description.value) {
				$('#bubble .details').html(pinData.description.value);
			}	
		}

		$('#bubble .commenter .name').html(pinData.commenter_name);
		$('#bubble .commenter .title').html(pinData.commenter_title);
		$('#bubble .commenter .institution').html(pinData.commenter_institution);

		if ($.trim($('#bubble .commenter').text()) == '') {
			$('#bubble .commenter').addClass('empty');
		} else {
			$('#bubble .commenter').removeClass('empty');
		}
	}

	var _onPinClick = function (pinData, latlng) {
		var selectedPin = $('.calacademy-pin-id-' + pinData.nid);

		// prevent redundant clicks
		if (selectedPin.hasClass('selected')) return;

		// new pin selection
		selectedPin.addClass('selected');
		
		// keep track of selected pin
		if (_lastPin) _lastPin.removeClass('selected');
		_lastPin = selectedPin;
		
		// populate and style the bubble
		_updateBubbleContent(pinData);

		// some special map panning stuff
		var point = _map.latLngToContainerPoint(latlng);
		
		if ($('html').hasClass('floor')) {
			point.y += 125;
		} else {
			point.y += 50;
		}

		var targetLoc = _map.containerPointToLatLng(point);
		var doingSlowPanZoom = false;
		
		if ($('html').hasClass('zoom-on-pin-click')) {
			var pinZoom = _getPinZoom(pinData);
			
			if (pinZoom !== false) {
				if (pinZoom > _map.getZoom()) {
					_slowPanZoom(latlng, pinZoom);
					doingSlowPanZoom = true;			
				}
			}
		}

		if (!doingSlowPanZoom) {
			// if bubble overlaps pin, center the map
			if (_isBubbleCollide()) {
				_map.setView(targetLoc);
			}

			_map.on(_mapCollapseEvents, _setDefaultLegendContent);
		}
	}

	var _slowPanZoom = function (targetLocation, targetZoom) {			
		_removeFingers();

		// temporarily disable auto pin collapsing
		_map.off(_mapCollapseEvents, _setDefaultLegendContent);
		clearTimeout(_timeoutDisableMoveListener);
		
		_timeoutDisableMoveListener = setTimeout(function () {
			_map.on(_mapCollapseEvents, _setDefaultLegendContent);
		}, 1500);

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
		if (_lastPin) _closeBubble();

		if (_index) {
			$('#legend .common_name').html(_specimenData.common_name);
			$('#legend .scientific_name').html(_specimenData.scientific_name);
			$('#legend .details').html(_specimenData.body.value);
		} else {
			$('#legend .common_name').html(_specimenData.title);

			var s = _getField('field_scientific_name');
			if (s) $('#legend .scientific_name').html(s.safe_value);

			var b = _getField('body');
			if (b) $('#legend .details').html(b.value);
		}
	}

	var _initLegend = function () {
		$('#content').prepend('<div id="legend" />');
		$('#legend').html('<div class="return"><a href="/gigamacro">Return to Gallery</a></div><h1 class="common_name"></h1><h2 class="scientific_name"></h2><div class="dynamic"><h3 class="pin_title pin_stuff"></h3><div class="details"></div><div class="commenter pin_stuff"><div class="name"></div><div class="title"></div><div class="institution"></div></div></div>');

		if (_index) {
			$('#legend .return a').on('touchend click', _index.onReturn);
		}

		_setDefaultLegendContent();
	}

	var _initBubble = function () {
		$('#content').prepend('<div id="bubble" />');
		$('#bubble').html('<a class="close">Close</a><div class="dynamic"><h3 class="pin_title pin_stuff"></h3><div class="details"></div><div class="commenter pin_stuff"><div class="name"></div><div class="title"></div><div class="institution"></div></div></div>');
	
		$('#bubble .close').on('touchend click', _closeBubble);
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
		that.setPinData(data);
		that.initMap();
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

	var _isBubbleCollide = function () {
		var collides = $('.calacademy-pin.selected .svg-container').overlaps($('#bubble.show'));
		
		if ($.isArray(collides.hits)) {
			if (collides.hits.length > 0) {
				return true;		
			}
		}

		return false;
	}

	this.setSpecimenData = function (data) {
		_specimenData = data;
	} 

	this.setPinData = function (data) {
		_pinsData = data;
	}

	this.initMap = function () {
		_initLegend();
		_initBubble();

		if (_index) {
			_initMap(_specimenData.tiles);
		} else {
			_initMap(_specimenData.field_gigamacro_specimen.und[0].taxonomy_term.name);	
		}
		
		_addRefreshUI();
		
		_slider = new CalAcademyGigamacroSlider(_map);
		_slider.add();

		_initPins();
		_addFingers();

		_map.on('zoomend', _togglePins);
		
		// not waiting until user zooms to show pins
		if (!$('html').hasClass('defer-pin-view')) {
			_togglePins();
		}
	}

	this.destroy = function () {
		if (_slider) _slider.destroy();

		if (_map) {
			// accomodate leaflet hack
			try {
				_map._onZoomTransitionEnd();
			} catch (e) {}

			_map.remove();
		}
		
		$.each(_timeouts, function (i, t) {
			if (t) clearTimeout(t);
		});

		_lastPin = false;
		_isAnimating = false;

		$('#content').empty();
	}

	this.initialize = function () {
		_hackLeaflet();

		$('#content').empty();

		// load pin svg
		var foo = $('<div />');

		foo.load(gigamacro.assetsPath + 'pin.svg', function () {
			_pinSvg = $(this).html();
			
			if (typeof(_specimenData) == 'undefined') {
				// display index
				_index = new CalAcademyGigamacroIndex(that);
			} else {
				// load pins and immediately load specimen
				var spec = _getField('field_gigamacro_specimen');
				if (!spec) return;

				gigamacro.utils.jsonRequest('gigamacro-pins', { tid: spec.tid }, _onPinsData);
			}
		});

		if ($('html').hasClass('trace-hits')) {
			setInterval(function () {
				if (_isBubbleCollide()) {
					calacademy.Utils.log('bubble collide!');
				}
			}, 500);
		}
	}

	this.initialize();

	// account for weird bfcaching (back-forward cache) behavior
	$(window).bind('pageshow', function (e) {
	    try {
		    if (e.originalEvent.persisted) {
		    	calacademy.Utils.log('persisted');
		    	that.initialize();    
		    }
	    } catch (err) {}
	});
}
