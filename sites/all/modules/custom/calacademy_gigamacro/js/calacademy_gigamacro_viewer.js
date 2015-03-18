var CalAcademyGigamacroViewer = function (specimenData) {
	var $ = jQuery;
	var _map;
	var _tiles;
	var _specimenData = specimenData;
	var _pinsData;
	var _pinSvg;
	var _pins = [];
	var _lastPin;
	
	var _timeoutHighlight;
	var _timeoutLegendContent;
	
	var _timeoutDisableMoveListener;
	var _timeoutAnimation;
	var _isAnimating = false;
	var _fingerString = 'Use your fingers to zoom';

	var _hackUISlider = function () {
		// use a more performant transform animation when possible
		if (!Modernizr.csstransforms3d) return;

		$.ui.slider.prototype._refreshValue = function () {
			var lastValPercent, valPercent, value, valueMin, valueMax,
			oRange = this.options.range,
			o = this.options,
			that = this,
			animate = ( !this._animateOff ) ? o.animate : false,
			_set = {};

			if ( this.options.values && this.options.values.length ) {
				this.handles.each(function( i ) {
					valPercent = ( that.values(i) - that._valueMin() ) / ( that._valueMax() - that._valueMin() ) * 100;
					_set[ that.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
					
					$( this ).stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );
					
					if ( that.options.range === true ) {
						if ( that.orientation === "horizontal" ) {
							if ( i === 0 ) {
								that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { left: valPercent + "%" }, o.animate );
							}
							if ( i === 1 ) {
								that.range[ animate ? "animate" : "css" ]( { width: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
							}
						} else {
							if ( i === 0 ) {
								that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { bottom: ( valPercent ) + "%" }, o.animate );
							}
							if ( i === 1 ) {
								that.range[ animate ? "animate" : "css" ]( { height: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
							}
						}
					}
					lastValPercent = valPercent;
				});
			} else {
				value = this.value();
				valueMin = this._valueMin();
				valueMax = this._valueMax();
				valPercent = ( valueMax !== valueMin ) ?
						( value - valueMin ) / ( valueMax - valueMin ) * 100 :
						0;
				
				// _set[ this.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
				//
				var xPos = Math.ceil((valPercent / 100) * $('#slider').width());
				var w = $('#slider span div').width();

				if (xPos < w) xPos = w;
				_set[ this.orientation === "horizontal" ? "transform" : "bottom" ] = "translate3d(" + xPos + "px, 0, 0)";
				//

				this.handle.stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );

				if ( oRange === "min" && this.orientation === "horizontal" ) {
					this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { width: valPercent + "%" }, o.animate );
				}
				if ( oRange === "max" && this.orientation === "horizontal" ) {
					this.range[ animate ? "animate" : "css" ]( { width: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
				}
				if ( oRange === "min" && this.orientation === "vertical" ) {
					this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { height: valPercent + "%" }, o.animate );
				}
				if ( oRange === "max" && this.orientation === "vertical" ) {
					this.range[ animate ? "animate" : "css" ]( { height: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
				}
			}
		};
	}

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

	var _cloneZoomButtons = function () {
		// clone zoom buttons into container
		var zoomIn = $('.leaflet-control-zoom-in').clone();
		var zoomOut = $('.leaflet-control-zoom-out').clone();
		
		$('.slider-container').prepend(zoomOut);
		$('.slider-container').append(zoomIn);

		$('.slider-container .leaflet-control-zoom-in').on('click touchend', function () {
			_map.zoomIn(1);
			return false;
		});

		$('.slider-container .leaflet-control-zoom-out').on('click touchend', function () {
			_map.zoomOut(1);
			return false;
		});

		_map.on('zoomend zoomlevelschange', function () {
			if (_map.getZoom() == _map.getMinZoom()) {
				$('.slider-container .leaflet-control-zoom-out').addClass('leaflet-disabled');
			} else {
				$('.slider-container .leaflet-control-zoom-out').removeClass('leaflet-disabled');
			}
			
			if (_map.getZoom() == _map.getMaxZoom()) {
				$('.slider-container .leaflet-control-zoom-in').addClass('leaflet-disabled');
			} else {
				$('.slider-container .leaflet-control-zoom-in').removeClass('leaflet-disabled');
			}
		});
	}

	var _onTouchMove = function (e) {
		$(this).addClass('no-animation');

		var t = e.originalEvent.touches[0];
		var s = $('#slider');
		var l = t.clientX - s.offset().left;

		if (l < $('div', this).outerWidth()) {
			l = $('div', this).outerWidth();
		}

		if (l > s.outerWidth()) {
			l = s.outerWidth();
		}

		$(this).data('target-position', l);
		$(this).css('transform', 'translate3d(' + l + 'px, 0, 0)');

		return false;
	}

	var _onTouchEnd = function (e) {
		$(this).removeClass('no-animation');

		var per = $(this).data('target-position') / $('#slider').width();
		var z = Math.round(per * _map.getMaxZoom());
		_map.setZoom(z);

		return false;
	}

	var _addZoomSlider = function () {
		_hackUISlider();

		$('#content').append('<div class="slider-container"><div id="slider" /><div id="slider-bg" /></div>');

		_cloneZoomButtons();

		// init slider
		$('#slider').slider({
			min: _map.getMinZoom(),
			max: _map.getMaxZoom(),
			stop: function (e, ui) {
				_map.setZoom(ui.value);
			}
		});

		$('#slider span').html('<div />');

		// touch-optimized event handlers
		if (Modernizr.touch && Modernizr.csstransforms3d) {
			$('#slider').off('mousedown click');

			$('#slider').on('touchend', function (e) {
				var t = e.originalEvent.changedTouches[0];
				var per = (t.clientX - $(this).offset().left) / $(this).width();
				var z = Math.round(per * _map.getMaxZoom());
				
				_map.setZoom(z);
				return false;
			});

			$('#slider span').off('mouseover mouseout focusin focusout');
			$('#slider span').on('touchmove', _onTouchMove);
			$('#slider span').on('touchend', _onTouchEnd);
		}

		// @see
		// https://github.com/Leaflet/Leaflet/pull/1600#issuecomment-77186793
		_map.on('zoomend', function () {
			$('#slider').slider('value', _map.getZoom());
		});

		$(window).on('resize.slider-reset', function () {
			$('#slider').slider('value', _map.getZoom());	
		});
		
		$(window).trigger('resize.slider-reset');
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

			var marker = L.marker(loc, {
				icon: myIcon,
				clickable: false
			});

			marker.pinData = obj;

			// add interaction
			marker.on('add', function (e) {
				var ev = Modernizr.touch ? 'touchend' : 'click';

				$('.calacademy-pin-id-' + obj.nid).on(ev, function () {
					_onMarkerClick(obj, loc);
					return false;
				});
			});

			_pins.push(marker);
		});

		// collapse pins on any kind of movement
		_map.on('click move', _setDefaultLegendContent);
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

	var _onMarkerClick = function (pinData, latlng) {
		// prevent redundant clicks
		if ($('.calacademy-pin-id-' + pinData.nid).hasClass('selected')) return;

		var originalHeight = $('#legend').height();

		$('#legend').addClass('pin-details');
		$('.calacademy-pin-id-' + pinData.nid).addClass('selected');
		
		clearTimeout(_timeoutHighlight);
		
		$('#legend').removeClass('highlight');
		$('#legend').addClass('highlight');

		_timeoutHighlight = setTimeout(function () {
			$('#legend').removeClass('highlight');
		}, 1000);

		$('#legend .pin_title').html(pinData.title);

		$('#legend .details').empty();

		if (pinData.description) {
			if (pinData.description.value) {
				$('#legend .details').html(pinData.description.value);
			}	
		}

		$('#legend .commenter .name').html(pinData.commenter_name);
		$('#legend .commenter .title').html(pinData.commenter_title);
		$('#legend .commenter .institution').html(pinData.commenter_institution);

		if ($.trim($('#legend .commenter').text()) == '') {
			$('#legend .commenter').addClass('empty');
		} else {
			$('#legend .commenter').removeClass('empty');
		}

		_animateLegend(originalHeight);

		if ($('html').hasClass('zoom-on-pin-click')) {
			var pinZoom = _getPinZoom(pinData);
			
			if (pinZoom !== false) {
				if (pinZoom > _map.getZoom()) {
					_slowPanZoom(latlng, pinZoom);			
				}
			}
		}

		if (_lastPin) _lastPin.removeClass('selected');
		_lastPin = $('.calacademy-pin-id-' + pinData.nid);
	}

	var _slowPanZoom = function (targetLocation, targetZoom) {			
		_removeFingers();

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

		if (_lastPin) _lastPin.removeClass('selected');
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
		_addRefreshUI();
		_addZoomSlider();
		_initPins();
		_addFingers();

		_map.on('zoomend', _togglePins);
		
		// not waiting until user zooms to show pins
		if (!$('html').hasClass('defer-pin-view')) {
			_togglePins();
		}
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
		
		if (typeof(_specimenData) == 'undefined') {
			var index = CalAcademyGigamacroIndex(this);
			return;
		}

		var spec = _getField('field_gigamacro_specimen');
		if (!spec) return;

		// get pin svg, then load pin data
		var foo = $('<div />');

		foo.load(gigamacro.assetsPath + 'pin.svg', function () {
			_pinSvg = $(this).html();
			gigamacro.utils.jsonRequest('gigamacro-pins', { tid: spec.tid }, _onPinsData);
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
