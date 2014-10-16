var CalAcademyMap = function () {
	var $ = jQuery;
	var _mapObject;
	var _dockSmartphone = false;
	var _dock;
	var _mapData = new CalAcademyMapData();
	var _map = new CalAcademyMapBase();
	var _floors = {};
	var _floorLookup = {};
	var _markers = {};
	var _markerLookup = {};
	var _smartphoneDockOnClass = 'map-dock-smartphone-on';
	var _imagePath = '/sites/all/modules/custom/calacademy_map/images/';
	var _currentFloor = 'main';
	var _selectedMarker;
	var _filterView;
	var _floorView;
	var _selectedTypeTids = [0];
	var _zoomControls;
	var _isSvgCapable = false;

	var _addMarker = function (obj) {
		// basic marker options
		var pinPath = _imagePath + 'icons/';
		pinPath += _isSvgCapable ? 'pin.svg' : 'pin.png';

		var options = {
			position: new google.maps.LatLng(
				parseFloat(obj.geolocation.lat),
				parseFloat(obj.geolocation.lng)
			),
			labelAnchor: new google.maps.Point(50, -3),
			labelClass: 'markerLabels label-' + obj.tid,
			icon: pinPath,
			data: obj
		};

		// label
		var hasLabel = (_isValidProperty(obj.showlabel) && parseInt(obj.showlabel));

		if (hasLabel) {
			options.labelContent = obj.name;
		}

		var hasIcon = _isValidProperty(obj.icon);

		if (hasIcon) {
			// set path to custom icon
			var icon = obj.icon.toLowerCase();
			icon = icon.replace(/\s+/g, '-');

			options.icon = _imagePath + 'icons/' + icon;
			options.icon += _isSvgCapable ? '.svg' : '.png';
		} else if (hasLabel) {
			// no icon, but we have a label, remove pin
			options.icon = _imagePath + 'empty.gif';
		}

		options.icon += '#' + obj.tid;

		return new MarkerWithLabel(options);
	}

	var _isValidProperty = function (prop) {
		return (typeof(prop) == 'string' && prop != '');
	}

	var _truncate = function (el, delay) {
		if (typeof($.fn.dotdotdot) != 'function') return;

		var _doTruncate = function () {
			el.dotdotdot({
				height: 75
			});
		}

		if (typeof(delay) == 'number') {
			setTimeout(_doTruncate, delay);
		} else {
			_doTruncate();
		}
	}

	var _toggleSmartphoneDock = function (boo) {
		if (!_dockSmartphone || !_dockSmartphone.is(':visible')) return;

		var wH = $(window).height();

		var _setHeight = function (h) {
			if ($('html').hasClass('csstransforms3d')) {
				_dockSmartphone.css('top', '0');
				_dockSmartphone.css('-webkit-transform', 'translate3d(0, ' + h + 'px, 0)');
				_dockSmartphone.css('transform', 'translate3d(0, ' + h + 'px, 0)');
			} else {
				_dockSmartphone.css('top', h + 'px');
			}
		}

		if (boo) {
			_truncate($('.details-desc', _dockSmartphone));
			_setHeight(wH - _dockSmartphone.outerHeight(true));
			_dockSmartphone.addClass(_smartphoneDockOnClass);
		} else {
			_setHeight(wH);
			_dockSmartphone.removeClass(_smartphoneDockOnClass);
		}
	}

	var _onMarkerSelect = function (markerData, source) {
		// populate and display smartphone dock
		var itemSummary = _dock.getItemSummary(markerData);

		_dockSmartphone.html(itemSummary);
		_dockSmartphone.append($('<div class="shim">&nbsp;</div>'));
		_toggleSmartphoneDock(true);

		// dock highlight
		_dock.select(markerData.tid);

		// marker highlight
		_toggleMarkerSelect(markerData.tid);

		switch (source) {
			case 'pin':
				// scroll to appropriate dock item
				if (typeof($.fn.scrollTo) == 'function') {
					var target = $('.map-dock .tid-' + markerData.tid);

					// calculate scroll animation speed
					var dur = Math.round(Math.abs(target.position().top));

					if (dur < 300) dur = 300;
					if (dur > 800) dur = 800;

					$('.map-dock').scrollTo(target, dur);
				}
				break;
			case 'dock':
				// center to pin
				_map.setCenter({
					lat: parseFloat(markerData.geolocation.lat),
					lng: parseFloat(markerData.geolocation.lng)
				});
				break;
		}
	}

	var _onDockSelect = function (val) {
		// trigger marker select
		_onMarkerSelect(val, 'dock');
	}

	var _highlightMarker = function (marker, boo) {
		if (typeof(marker) == 'undefined') return;

		var img = $('.calacademy_geolocation_map img[src="' + marker.getIcon() + '"]');
		var label = $('.label-' + marker.data.tid);

		if (boo) {
			marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
		} else {
			marker.setZIndex(google.maps.Marker.MAX_ZINDEX - 1);
		}

		// bounce animation fallback
		if (!_isSvgCapable) {
			var anim = boo ? google.maps.Animation.BOUNCE : null;
			marker.setAnimation(anim);
			return;
		}

		// scale icon
		img.parent().css('overflow', 'visible');
		img.parent().css('width', 'auto');
		img.parent().css('height', 'auto');

		if (boo) {
			img.addClass('marker-highlight');
		} else {
			img.removeClass('marker-highlight');
		}
	}

	var _toggleMarkerSelect = function (tid) {
		// deselect last marker
		if (_selectedMarker) {
			_highlightMarker(_selectedMarker, false);
		}

		if (typeof(tid) != 'undefined') {
			// highlight selected marker
			_selectedMarker = _markerLookup[tid];
			_highlightMarker(_selectedMarker, true);
		}
	}

	var _createMarkers = function (data) {
		$.each(data, function (i, obj) {
			if (!obj.geolocation) return;
			if (calacademy.Utils.isArray(obj.geolocation)) return;

			if (!obj.floor) return;
			if (calacademy.Utils.isArray(obj.floor)) return;

			// flatten type array
			var typeTids = false;

			if (calacademy.Utils.isArray(obj.type) && obj.type.length > 0) {
				typeTids = [];

				$.each(obj.type, function (j, val) {
					typeTids.push(val.tid);
				});
			}

			obj.type = typeTids;

			var marker = _addMarker(obj);

			google.maps.event.addListener(marker, 'click', function () {
				_onMarkerSelect(this.data, 'pin');
			});

			var floorId = _floorLookup[obj.floor.tid];
			_markers[floorId].push(marker);
			_markerLookup[obj.tid] = marker;
		});

		_showMarkers();
	}

	var _showMarkers = function () {
		$.each(_markers, function (floor, arr) {
			$.each(arr, function (i, marker) {
				var onFloor = floor == _currentFloor;
				var inFilter = false;

				if (onFloor) {
					if (parseInt(_selectedTypeTids[0]) === 0) {
						// showing all
						inFilter = true;
					} else {
						// on this floor, check if it meets filter criteria
						$.each(marker.data.type, function (j, tid) {
							if (_selectedTypeTids.indexOf(parseInt(tid)) != -1) {
								inFilter = true;
								return false;
							}
						});
					}
				}

				if (onFloor && inFilter) {
					marker.setMap(_mapObject);
				} else {
					marker.setMap(null);
				}
			});
		});
	}

	var _initSmartphoneDock = function () {
		_dockSmartphone = $('<div />');
		_dockSmartphone.addClass('map-dock-smartphone');
		_dockSmartphone.css('top', $(window).height() + 'px');

		$('#content').append(_dockSmartphone);
	}

	var _isSmartphone = function () {
		return $(window).width() < 768;
	}

	var _collapseMenus = function () {
		// collapse menus
		if (_filterView.collapse) _filterView.collapse();
		if (_floorView.collapse) _floorView.collapse();
		_onResize();
	}

	var _zoom = function (e) {
		var offset = $(this).hasClass('zoom-in') ? 1 : -1;
		_mapObject.setZoom(_mapObject.getZoom() + offset);

		e.preventDefault();
		return false;
	}

	var _initZoomControls = function () {
		// remove default zoom controls
		_mapObject.setOptions({
			zoomControl: false
		});

		_zoomControls = $('<ul><li class="zoom-in">+</li><li class="zoom-out">-</li></ul>');
		_zoomControls.addClass('map-zoom-controls');

		if (Modernizr.touch) {
			$('li', _zoomControls).on('touchend', _zoom);
		} else {
			$('li', _zoomControls).on('click', _zoom);
		}

		$('.calacademy_geolocation_map').prepend(_zoomControls);
	}

	var _initMap = function () {
		_map.injectMap($('#content'));
		_mapObject = _map.getMapObject();

		// diff default zoom for smartphones
		var defaultZoom = _isSmartphone() ? 19 : 20;
		_mapObject.setZoom(defaultZoom);

		_initZoomControls();
		_initSmartphoneDock();

		google.maps.event.addListener(_mapObject, 'click', function () {
			_toggleSmartphoneDock(false);
			if (_dock) _dock.deselectAll();
			_toggleMarkerSelect();
			_collapseMenus();
		});

		google.maps.event.addListener(_mapObject, 'dragstart', _collapseMenus);
	}

	var _onFilterSelect = function (vals) {
		_selectedTypeTids = [vals];

		if (parseInt(_selectedTypeTids[0]) === 0) {
			// show all
			$('.map-dock li').removeClass('not-in-filter-selection');
		} else {
			// toggle dock items per type
			$('.map-dock li').each(function () {
				var types = [];

				$.each($(this).data('val').type, function (i, obj) {
					var tid;

					if (typeof(obj) == 'string') {
						tid = parseInt(obj);
					} else {
						tid = parseInt(obj.tid);
					}

					if (!isNaN(tid) && tid > 0) types.push(tid);
				});

				// if item contains at least one of the selected types, show
				var containsType = false;

				$.each(types, function (i, val) {
					if ($.inArray(val, _selectedTypeTids) >= 0) {
						containsType = true;
						return false;
					}
				});

				if (containsType) {
					$(this).removeClass('not-in-filter-selection');
				} else {
					$(this).addClass('not-in-filter-selection');
				}
			});
		}

		_showMarkers();
	}

	var _onFloorSelect = function (val) {
		// remove all floor classes
		$.each(_floors, function (i, obj) {
			$('html').removeClass('map-floor-' + obj.machine_id);
		});

		// add selected
		$('html').addClass('map-floor-' + val);

		_currentFloor = val;
		_map.switchFloor(_currentFloor);
		_showMarkers();
		_toggleSmartphoneDock(false);
	}

	var _createMenuContainers = function () {
		var menuContainer = $('<div class="map-menus" />');
		var titles = $('<div class="titles" />');
		var options = $('<div class="options" />');

		$('.map-ui').prepend(menuContainer);
		menuContainer.append(titles);
		menuContainer.append(options);
	}

	var _initFloorView = function () {
		_floorView = new CalAcademyMapMenu(_floors, {
			idSuffix: 'floor',
			collapseOnSelect: true,
			keyProp: 'machine_id',
			onSelect: _onFloorSelect
		});

		$('.map-menus .titles').append(_floorView.get().title);
		$('.map-menus .options').append(_floorView.get().options);

		// start with 'main'
		_floorView.trigger(_currentFloor);
	}

	var _initFilterView = function (data) {
		data.unshift({
			'name': 'All',
			'tid': 0
		});

		_filterView = new CalAcademyMapMenu(data, {
			idSuffix: 'filter',
			collapseOnSelect: true,
			onSelect: _onFilterSelect
		});

		_filterView.setTitle('Filter');

		$('.map-menus .titles').append(_filterView.get().title);
		$('.map-menus .options').append(_filterView.get().options);

		// add pin svg
		$('a', _filterView.get().options).before($('<span />'));

		$('span', _filterView.get().options).load(_imagePath + 'icons/pin-hollow.svg svg', function () {
			// cleanup
			$('svg', _filterView.get().options).removeAttr('id');
			$('svg', _filterView.get().options).removeAttr('width');
			$('svg', _filterView.get().options).removeAttr('height');
			$('svg path', _filterView.get().options).removeAttr('fill');
		});

		// start with 'All'
		_filterView.trigger(0);
	}

	var _initListSwitchUI = function () {
		var container = $('<div id="title-list-toggle" />');
		container.html('<span>List</span>');

		$('.map-menus .titles').append(container);

		var _onListSelect = function () {
			$('.calacademy_geolocation_map').attr('style', '');

			var listClass = 'map-list-selected';
			$('html').toggleClass(listClass);

			var str = $('html').hasClass(listClass) ? 'Map' : 'List';
			$('span', this).html(str);

			_collapseMenus();

			return false;
		}

		var myEvent = Modernizr.touch ? 'touchend' : 'click';
		container.on(myEvent, _onListSelect);
	}

	var _initDock = function (locations) {
		_dock = new CalAcademyMapDock(locations, {onSelect: _onDockSelect});
		$('.map-ui').prepend(_dock.get());

		// add a floor class to each item
		$('.map-dock li').each(function () {
			var floorTid = $(this).data('val').floor.tid;
			$(this).addClass(_floorLookup[floorTid]);
		});

		if (Modernizr.touch) {
			$('.map-dock li').on('touchstart', _collapseMenus);
		} else {
			$('.map-dock').on('scroll', _collapseMenus);
		}

		// _truncate($('.map-dock .details-desc'), 50);
	}

	var _setFloorData = function () {
		$.each(_floors, function (i, obj) {
			_markers[obj.machine_id] = [];
			_floorLookup[obj.tid] = obj.machine_id;
		});
	}

	var _setDockHeight = function () {
		var colHeight = $('.calacademy_geolocation_map').outerHeight();
		var menuHeight = $('.map-menus').outerHeight();
		var h = colHeight - menuHeight;

		if (_isSmartphone()) {
			// smartphone map is shorter by title height
			h += $('.map-menus .titles').outerHeight();
		}

		_dock.get().height(h);
	}

	var _onResize = function () {
		_setDockHeight();

		var isDocked = _dockSmartphone.hasClass(_smartphoneDockOnClass);
		_toggleSmartphoneDock(isDocked);
	}

	var _svg = function () {
		if (!Modernizr.svg) return false;
		if ($.browser.msie) return false;
		if (isMSIE) return false;
		if ('ActiveXObject' in window) return false;

		return true;
	}

	this.initialize = function () {
		_isSvgCapable = _svg();

		_mapData.getAll(function (data) {
			_floors = data.floors;
			_setFloorData();

			var mapUI = $('<div />');
			mapUI.addClass('map-ui');
			$('#content').prepend(mapUI);

			_initDock(data.locations);
			_initMap();

			_createMenuContainers();
			_initFloorView();
			_initListSwitchUI();
			_initFilterView(data.locationtypes);
			_createMarkers(data.locations);

			$(window).on('resize', _onResize);
			$(window).trigger('resize');

			// trigger resize on menu toggle
			var menuTitles = $('.map-menus .titles div, #options-floor a');
			var myEvent = Modernizr.touch ? 'touchend' : 'click';
			menuTitles.on(myEvent, _onResize);
		});
	}

	this.initialize();
}
