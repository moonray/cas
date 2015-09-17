var CalAcademyPeopleFinder = function () {
	var $ = jQuery;
	var that = this;
	
	var _map;
	var _maxAutocompleteResponses = 10;
	var _tiles;
	var _defaultFloor = 'L2';
	var _floors = ['B2', 'B1', 'L1', 'L2', 'L3'];
	var _currentFloor;
	var _pins;
	var _pinsData;
	var _peopleData;
	var _svgs = {};
	var _lastPin;
	var _mapBounds;
	var _mapCollapseEvents = 'click zoomstart';

	var _timeoutFloorSwitch;
	var _timeoutHiddenTiles;

	var _setMapBounds = function () {
		var tileSize = 512;

		var	offsets = {
			x: 30,
			y: 30
		};

		var sw = _map.unproject([offsets.x, tileSize - offsets.y], 1);
		var ne = _map.unproject([tileSize - offsets.x, offsets.y], 1);
		
		_mapBounds = [[sw.lat, sw.lng], [ne.lat, ne.lng]];

		if ($('html').hasClass('show-bounds')) {
			L.rectangle(_mapBounds, {
				color: '#ff7800',
				weight: 1
			}).addTo(_map);
		}
	}

	var _onMoveEnd = function (e) {
		if (!_map.getBounds().intersects(_mapBounds)) {
			_map.panTo([0, 0], {
				animate: false
			});

			_fixHiddenTiles();
		}
	}

	var _fixHiddenTiles = function () {
		clearTimeout(_timeoutHiddenTiles);

		_timeoutHiddenTiles = setTimeout(function () {
			$('.leaflet-tile').addClass('leaflet-tile-loaded');
		}, 500);
	}

	var _initMap = function () {
		// create container
		$('#content').prepend('<div id="leaflet-map-container"><div id="leaflet-map" /></div>');

		// create map
		_map = L.map('leaflet-map', {
			zoomControl: false,
			fadeAnimation: true,
			zoomAnimation: true,
			inertiaMaxSpeed: 500,
			crs: L.extend({}, L.CRS.EPSG3857, {wrapLat: null, wrapLng: null})
		});

		var zoomControl = new L.Control.Zoom({
			position: 'topright'
		}).addTo(_map);

		_map.setView([0, 0], 2, {
			pan: {
				animate: false
			}
		});

		_setMapBounds();
		_map.on('moveend', _onMoveEnd);
	}
	
	var _initFloorSwitcher = function () {
		$('.leaflet-bottom.leaflet-right').append('<div class="floor-indicator" />');

		var select = $('<select />');
		select.addClass('floor-switcher');
		
		$.each(_floors, function (i, val) {
			var option = $('<option value="' + val + '">' + val + '</option>');

			// default
			if (val == _defaultFloor) {
				option.attr('selected', 'selected');
			}

			select.append(option);
		});

		// add interaction
		select.on('change', function () {
			$('.leaflet-bottom.leaflet-left').empty();
			$('.floor-indicator').html('Floor <strong>' + $(this).val() + '</strong>');
			_setTiles($(this).val().toLowerCase());
			_setPins($(this).val().toLowerCase());
			_currentFloor = $(this).val();
		});

		select.trigger('change');

		// inject into DOM
		$('.people-search').append(select);
	}

	var _initSearch = function () {
		var form = $('<form />');
		form.addClass('people-search');
		form.append('<input type="text" id="person" placeholder="' + peopleFinder.defaultSearchString + '" />');
		form.append('<input type="hidden" id="nid" />');
		
		// inject into DOM
		$('.leaflet-top.leaflet-left').append(form);

		form.on('submit', function () {
			return false;
		});
	}

	var _initAutocomplete = function () {
		$('.people-search').append('<div class="autocomplete-container" />');

		$('#person').autocomplete({
			source: _peopleData,
			appendTo: '.autocomplete-container',
			delay: 0,
			position: {
				using: function (pos) {
					$(this).css('width', '100%');
				}
			},
			response: function (event, ui) {
				// truncate array if too long
				if (ui.content.length > _maxAutocompleteResponses) {
					ui.content.length = _maxAutocompleteResponses;
				}
			},
			focus: function (event, ui) {
				$('#person').val(ui.item.label);
				return false;
			},
			select: function (event, ui) {
				$('#person').val(ui.item.label);
				$('#nid').val(ui.item.value);
				
				_onPersonFound(ui.item.row);

				return false;
			}
		});

		// special formatting for autocomplete dropdown
		$('#person').autocomplete('instance')._renderItem = function (ul, item) {
			var li = $('<li />');
			
			// name
			li.append('<div class="name"></div>');
			$('.name', li).append($('.views-field-name a', item.row).clone());
			$('.name a', li).html(_getNameFromRow(item.row));

			// dept
			if ($('.views-field-field-department .field-content', item.row).length) {
				li.append('<div class="dept">' + $('.views-field-field-department .field-content', item.row).html() + '</div>');
			}

			return li.appendTo(ul);
		};
	}

	var _setTiles = function (floor) {
		var tilesUrl = peopleFinder.tilesLocation;
		tilesUrl += floor + '/{z}/{x}/{y}.png';

		// certain browsers don't layout smartphone stuff correctly
		// without this
		/*
		var onTilesLoad = function () {
			_tiles.off('load', onTilesLoad);

			$('#smartphone-legend').addClass('smartphone-stuff');
			
			$('#smartphone-legend').addClass('no-animation');
			_setSmartphoneDockPosition(false);

			setTimeout(function () {
				$('#smartphone-legend').removeClass('no-animation');
			}, 25);
		}

		_tiles.on('load', onTilesLoad);
		*/

		// refreshing with a diff tileset
		if (_tiles) _map.removeLayer(_tiles);

		_tiles = L.tileLayer(tilesUrl, {
			minZoom: peopleFinder.minZoom,
			maxZoom: peopleFinder.maxZoom,
			noWrap: true
		});

		_map.addLayer(_tiles);
	}

	var _setPins = function (floor) {
		_lastPin = null;

		// @todo
		// optimize with partitioned object
		$.each(_pins, function (i, pin) {
			if (pin.floor == floor) {
				_map.addLayer(pin);
			} else {
				_map.removeLayer(pin);
			}
		});

		_map.on(_mapCollapseEvents, _collapsePins);
	}

	var _setData = function () {
		_pinsData = [];
		_peopleData = [];

		$('.views-field-field-geolocation').each(function () {
			var row = $(this).closest('.views-row');
			
			_pinsData.push({
				lat: $('.views-field-field-geolocation .field-content', row).html(),
				lng: $('.views-field-field-geolocation-1 .field-content', row).html(),
				row: row
			});

			_peopleData.push({
				label: _getNameFromRow(row),
				value: parseInt($('.views-field-uid', row).text()),
				row: row
			});
		});
	}

	var _getNameFromRow = function (row) {
		if ($('.views-field-field-person-name-first', row).length && $('.views-field-field-person-name-last', row).length) {
			return $.trim($('.views-field-field-person-name-first', row).text()) + ' ' + $.trim($('.views-field-field-person-name-last', row).text());
		}

		return $.trim($('.views-field-name a', row).text());
	}

	var _onPinClick = function (row) {
		var uid = parseInt($('.views-field-uid', row).text());
		var selectedPin = $('.calacademy-pin-id-' + uid);

		// prevent redundant clicks
		if (selectedPin.hasClass('selected')) return;

		// new pin selection
		selectedPin.addClass('selected');

		// keep track of selected pin
		if (_lastPin) _lastPin.removeClass('selected');
		_lastPin = selectedPin;

		_map.on(_mapCollapseEvents, _collapsePins);

		_showPersonPopup(row);
		$('#person').blur();
	}

	var _collapsePins = function () {
		if (_lastPin) {
			_lastPin.removeClass('selected');
			_lastPin = null;
		}

		$('.person-popup').remove();
		$('form input').val('');
	}

	var _initPins = function () {
		_pins = [];

		var iconWidth = 82;
		var iconHeight = 82;

		var mySize = [iconWidth, iconHeight];
		var myAnchor = [iconWidth / 2, 65];

		$.each(_pinsData, function (i, obj) {
			var loc = [
				parseFloat(obj.lat),
				parseFloat(obj.lng)
			];

			var nid = $.trim($('.views-field-uid', obj.row).text());

			var myIcon = L.divIcon({
				className: 'calacademy-pin calacademy-pin-id-' + nid,
				iconSize: mySize,
				iconAnchor: myAnchor,
				html: '<div class="svg-container">' + _svgs.pin + '</div><div class="shadow">shadow</div>'
			});

			var pin = L.marker(loc, {
				icon: myIcon,
				clickable: false
			});

			pin.pinData = obj;
			pin.floor = $.trim($('.views-field-field-floorplan-floor', obj.row).text()).toLowerCase();

			// // add interaction
			pin.on('add', function (e) {
				var start = Modernizr.touch ? 'touchstart' : 'mousedown';
				var end = Modernizr.touch ? 'touchend' : 'click';

				$('.calacademy-pin-id-' + nid).on(start, function () {
					if (!$(this).hasClass('selected')) {
						_map.off(_mapCollapseEvents, _collapsePins);
					}

					return false;
				});

				$('.calacademy-pin-id-' + nid).on(end + ' dblclick', function () {
					_onPinClick(obj.row);
					return false;
				});
			});

			_pins.push(pin);
		});
	}

	var _onPersonFound = function (row) {
		// switch floors if necessary
		var personFloor = $.trim($('.views-field-field-floorplan-floor', row).text());
		var switchingFloors = (personFloor != _currentFloor);

		var func = function () {
			// expand pin
			_onPinClick(row);

			// center map
			_map.panTo([
				parseFloat($('.views-field-field-geolocation', row).text()),
				parseFloat($('.views-field-field-geolocation-1', row).text())
			]);
		}

		if (_timeoutFloorSwitch) {
			clearTimeout(_timeoutFloorSwitch);
		}

		if (switchingFloors) {
			$('.floor-switcher').val(personFloor);
			$('.floor-switcher').trigger('change');
			_timeoutFloorSwitch = setTimeout(func, 100);
		} else {
			func();
		}
	}

	var _showPersonPopup = function (row) {
		var alreadyInDOM = ($('.leaflet-bottom.leaflet-left .person-popup').length > 0);
		var div;

		if ($('.person-popup').length) {
			// already in DOM
			div = $('.person-popup');
		} else {
			// create
			div = $('<div />');
			div.addClass('person-popup');
		}

		// empty
		div.empty();

		// add info
		var container = $('<div />');
		container.addClass('container');
		if (alreadyInDOM) container.addClass('transition-in');

		div.append(container);
		
		// pic
		if ($('.views-field-field-image-primary', row).length) {
			var src = $.trim($('.views-field-field-image-primary .field-content', row).text());
			container.append('<div class="img-container"><img src="' + src + '" /></div>');
		}

		// name
		if ($('a.username', row).length) {
			container.append('<h2><a href="' + $('a.username', row).attr('href') + '">' + _getNameFromRow(row) + '</a></h2>');
		} else {
			container.append('<h2>' + _getNameFromRow(row) + '</h2>');	
		}

		var subtitle = $('<h3 />');

		// title
		if ($('.views-field-field-title .field-content', row).length) {
			subtitle.append($('.views-field-field-title .field-content', row).html());
		}

		// dept
		if ($('.views-field-field-department .field-content', row).length) {
			if ($('.views-field-field-title .field-content', row).length) subtitle.append(', ');
			subtitle.append($('.views-field-field-department .field-content', row).html());
		}

		if (!subtitle.is(':empty')) container.append(subtitle);

		// bio
		if ($('.views-field-field-body .field-content', row).length) {
			container.append('<div class="bio">' + $('.views-field-field-body .field-content', row).html() + '</div>');
		} else {
			container.addClass('no-bio');
		}

		// email
		if ($('.views-field-mail .field-content', row).length) {
			container.append('<div class="mail">' + $('.views-field-mail .field-content', row).html() + '</div>');
		}

		// phone
		if ($('.views-field-field-phone .field-content', row).length) {
			var phone = $.trim($('.views-field-field-phone .field-content', row).text());
			container.append('<div class="phone"><a href="tel:' + phone.replace(/[^0-9]/gmi, '') + '">' + phone + '</a></div>');
		}

		// clear search box
		$('#person').val('');

		// add to DOM if not already present
		if (!alreadyInDOM) {
			$('.leaflet-bottom.leaflet-left').append(div);
		}
	}

	var _onSvgsLoaded = function () {
		_initMap();
		_setData();
		_initPins();
		_initSearch();
		_initFloorSwitcher();
		_initAutocomplete();
	}

	var _loadSvgs = function (i, arr) {
		if (i == arr.length) {
			_onSvgsLoaded();
			return;
		}

		var str = arr[i];
		var foo = $('<div />');

		foo.load(peopleFinder.assetsPath + str + '.svg', function () {
			_svgs[str] = $(this).html();
			_loadSvgs(i + 1, arr);
		});
	}

	this.initialize = function () {
		_loadSvgs(0, [
			'pin'
		]);
	}

	this.initialize();

	// account for weird bfcaching (back-forward cache) behavior
	$(window).bind('pageshow', function (e) {
	    try {
		    if (e.originalEvent.persisted) {
		    	that.initialize();
		    }
	    } catch (err) {}
	});
}
