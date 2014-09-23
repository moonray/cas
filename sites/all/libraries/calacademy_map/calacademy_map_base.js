var CalAcademyMapBase = function () {
	var $ = jQuery;
	var _map;
	var _mapStyle;
	var _mapDom;
	var _mapTiler;
	var _zoomMin = 16;
	var _zoomMax = 23;
	var _tileSize = 256;
	var _tilesPath = '//s3.amazonaws.com/tiles.google-maps.calacademy.org';
	var _inst = this;
	var _fieldMarker;
	var _listeners = [];

	var _bounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(37.768673, -122.467924),
		new google.maps.LatLng(37.771387, -122.464491)
	);

	var _center = new google.maps.LatLng(37.770030, -122.466208);

	var _setMapStyle = function () {
	  	_mapStyle = new google.maps.StyledMapType([
		    {
		      stylers: [
		       	{ visibility: 'simplified' },
		        { hue: '#00ffe6' },
		        { saturation: -20 }
		      ]
		    },
		    {
		      featureType: 'landscape.man_made',
		      elementType: 'all',
		      stylers: [
		        { visibility: 'off' }
		      ]
		    },
		    {
		      featureType: 'road',
		      elementType: 'geometry',
		      stylers: [
		        { lightness: 100 },
		        { visibility: 'simplified' }
		      ]
		    },
		    {
		      featureType: 'road',
		      elementType: 'labels',
		      stylers: [
		        { visibility: 'off' }
		      ]
		    }
	  	], {
			name: 'CalAcademy Map Style',
			maxZoom: _zoomMax
		});
	}

	var _setTiles = function (floor) {
		_mapTiler = new google.maps.ImageMapType({
		    getTileUrl: function (coord, zoom) {
		        var proj = _map.getProjection();
		        var z2 = Math.pow(2, zoom);
		        var tileXSize = _tileSize / z2;
		        var tileYSize = _tileSize / z2;
		        var y = coord.y;
		        var tileBounds = new google.maps.LatLngBounds(
		            proj.fromPointToLatLng(new google.maps.Point(coord.x * tileXSize, (coord.y + 1) * tileYSize)),
		            proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * tileXSize, coord.y * tileYSize))
		        );

		        if (_bounds.intersects(tileBounds) && (_zoomMin <= zoom) && (zoom <= _zoomMax)) {
		        	return _tilesPath + '/' + floor + '/' + zoom + '/' + coord.x + '/' + y + '.png';
		        } else {
		        	return 'http://www.maptiler.org/img/none.png';
		        }
		    },
		    maxZoom: _zoomMax,
		    tileSize: new google.maps.Size(_tileSize, _tileSize)
		});
	}

	var _setMap = function () {
		_map = new google.maps.Map(_mapDom.get(0), {
	        streetViewControl: false,
	        backgroundColor: '#ffffff',
	        mapTypeControl: false,
	        panControl: false,
	        zoomControl: true,
	        zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
			},
	        center: _center,
	        mapTypeControlOptions: {
		    	mapTypeIds: [
		    		google.maps.MapTypeId.ROADMAP,
		    		google.maps.MapTypeId.SATELLITE,
		    		google.maps.MapTypeId.HYBRID,
		    		google.maps.MapTypeId.TERRAIN,
		    		'map_style'
		    	],
		    	position: google.maps.ControlPosition.TOP_CENTER
		    },
	        zoom: 20
	    });

		_map.mapTypes.set('map_style', _mapStyle);
		_map.setMapTypeId('map_style');

		// @todo
		// restrict bounds
		// var lastValidCenter = _map.getCenter();

		// google.maps.event.addListener(_map, 'center_changed', function () {
		//     if (_bounds.contains(_map.getCenter())) {
		//         // still within valid bounds, so save the last valid position
		//         lastValidCenter = map.getCenter();
		//         return;
		//     }

		//     // not valid anymore => return to last valid position
		//     _map.panTo(lastValidCenter);
		// });
	}

	var _onFieldPinMove = function () {
		if (!_fieldMarker) return;

		var pos = _fieldMarker.getPosition();

		var i = _listeners.length;

		while (i--) {
			if (typeof(_listeners[i].onFieldPinMove) == 'function') {
				_listeners[i].onFieldPinMove(pos);
			}
		}
	}

	this.switchFloor = function (floor) {
		_setTiles(floor);
		_map.overlayMapTypes.setAt(0, _mapTiler);
	}

	this.injectMap = function (container) {
		container.append(_mapDom);

		// init API if not already done
		if (!_map) _setMap();
	}

	this.addListener = function (obj) {
		_listeners.push(obj);
	}

	this.getMapObject = function () {
		return _map;
	}

	this.setCenter = function (obj) {
		if (!_map) return;

		_map.setCenter(obj);
	}

	this.addFieldPin = function (obj, updateOnInit) {
		if (typeof(updateOnInit) == 'undefined') {
			updateOnInit = false;
		}

		_fieldMarker = this.addPin(obj);
		_fieldMarker.setDraggable(true);

		google.maps.event.addListener(_fieldMarker, 'position_changed', _onFieldPinMove);
		if (updateOnInit) _onFieldPinMove();
	}

	this.addPin = function (obj) {
		var pos = !obj ? _center : obj;

		return new google.maps.Marker({
			position: pos,
			map: _map
		});
	}

	this.initialize = function () {
		_setMapStyle();
		_mapDom = $('<div />');
		_mapDom.addClass('calacademy_geolocation_map');
	}

	this.initialize();
}
