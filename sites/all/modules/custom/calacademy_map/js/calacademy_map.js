var CalAcademyMap = function () {
	var $ = jQuery;
	var that = this;
	var _defaultMarker;
	var _mapObject;
	var _dockSmartphone = false;
	var _smartphoneEventsToggle;
	var _dock;
	var _mapData = new CalAcademyMapData();
	var _map = new CalAcademyMapBase();
	var _customTranslateModal;
	var _floors = {};
	var _events = {};
	var _floorLookup = {};
	var _markers = {};
	var _markerLookup = {};
	var _smartphoneDockOnClass = 'map-dock-smartphone-on';
	var _imagePath = '/sites/all/modules/custom/calacademy_map/images/';
	var _defaultFloor = 'main';
	var _currentFloor = _defaultFloor;
	var _selectedMarker;
	var _filterView;
	var _floorView;
	var _selectedTypeTids = [0];
	var _zoomControls;
	var _zoomTimeout;
	var _translateTimeout;
	var _zoomedOutLevel = 16;
	var _zoomLevel;
	var _markersOnMap = [];

	this.setLanguage = function (lng) {
		$('.google-translate select').val(lng);
		
		// hack to fix wonkiness after auto-firing
		_triggerHtmlEvent($('.google-translate select'), 'change');
		_triggerHtmlEvent($('.google-translate select'), 'change');

		// force the menu to refresh
		clearTimeout(_translateTimeout);

		_translateTimeout = setTimeout(function () {
			_floorView.trigger(_currentFloor);
		}, 100);
	}

	var _triggerHtmlEvent = function (el, eventName) {
		var element = el.get(0);
		var event;
		
		if (document.createEvent) {
		    event = document.createEvent('HTMLEvents');
		    event.initEvent(eventName, true, true);
		    element.dispatchEvent(event);
		} else {
		    event = document.createEventObject();
		    event.eventType = eventName;
		    element.fireEvent('on' + event.eventType, event);
		}
	}

	var _initIdleTimer = function () {
		$(document).idleTimer({
			timeout: 30000
		});

		$(document).on('idle.idleTimer', function (event, elem, obj) {
			// scroll dock
			$('.map-dock').scrollTo(0, 500);

			// main floor
			if (_currentFloor != _defaultFloor) {
				_floorView.trigger(_defaultFloor);
			}

			// filters
			_filterView.trigger(0);

			// collapse smartphone list
			if ($('html').hasClass('map-list-selected')) {
				var myEvent = Modernizr.touch ? 'touchend' : 'click';
				$('#title-list-toggle').trigger(myEvent);
			} else {
				_collapseMenus();
			}

			// center
			_map.setCenter(_map.getCenter());

			// default zoom
			_mapObject.setZoom(_getDefaultZoom());

			// unselect
			_toggleSmartphoneDock(false);
			if (_dock) _dock.deselectAll();
			_toggleMarkerSelect(null, true);

			if ($('html').hasClass('show-translate') && $('.google-translate select').length == 1) {
				var currentVal = $.trim($('.google-translate select').val());
				
				if (currentVal != 'en' && currentVal != '') {
					that.setLanguage('en');
				}

				$('.google-translate select').blur();	
			}

			// custom translate modal
			if (_customTranslateModal) {
				_customTranslateModal.hide();
				_customTranslateModal.setDefault();
			}
    	});
	}

	var _addMarker = function (obj, noClick) {
		if (typeof(noClick) == 'undefined') noClick = false;

		var options = {
			position: new google.maps.LatLng(
				parseFloat(obj.geolocation.lat),
				parseFloat(obj.geolocation.lng)
			),
			labelClass: 'calacademy-marker calacademy-marker-' + obj.tid,
			icon: _imagePath + 'empty.gif',
			clickable: false,
			data: obj
		};

		var markerHtml = '<div class="marker-container">';
		var hasIcon = _isValidProperty(obj.icon);
		var hasLabel = (_isValidProperty(obj.showlabel) && parseInt(obj.showlabel));

		// suppress clicks if not in dock
		var notInDock = (_isValidProperty(obj.hideinlegend) && parseInt(obj.hideinlegend));
		if (notInDock) noClick = true;

		var eventAttr = Modernizr.touch ? 'ontouchend' : 'onclick';
		eventAttr += "='myMap.onMarkerSelect(" + obj.tid + "); return false;'";

		if (hasLabel && !hasIcon) {
			// add label only class
			options.labelClass += ' label-only';

			// remove interaction events
			eventAttr = '';
		}

		if (noClick) {
			eventAttr = '';
			options.labelClass += ' no-click';
		}

		var displayIcon = (hasIcon || !hasLabel);
		var icon = 'pin';

		if (hasIcon) {
			// define custom icon
			icon = obj.icon.toLowerCase().replace(/\s+/g, '-');
		}

		if (displayIcon) {
			// icon markup
			var iconPath = _imagePath + 'icons/' + icon;
			iconPath += Modernizr.svg ? '.svg' : '.png';
			options.labelClass += ' icon-' + icon;

			markerHtml += '<img ' + eventAttr + ' src="' + iconPath + '" />';
		}

		if (hasLabel) {
			// label markup
			markerHtml += '<div class="label" ' + eventAttr + '>' + obj.name + '</div>';
		}

		options.labelContent = markerHtml + '</div>';

		// coordinates
		switch (icon) {
			case 'trex':
				options.labelAnchor = new google.maps.Point(80, 65);
				break;
			default:
				if (displayIcon) {
					// pin or otherwise unspecified
					options.labelAnchor = new google.maps.Point(50, 65);
				} else {
					// label-only
					options.labelAnchor = new google.maps.Point(50, 5);
				}
		}

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
		$('.smartphone-events-toggle').removeClass('no-delay');

		if (boo) {
			_truncate($('.details-desc', _dockSmartphone));
			_dock.setSmartphoneDockPosition(_dockSmartphone, true);
			_dockSmartphone.addClass(_smartphoneDockOnClass);

			// if we have events in the dock, show events toggle
			if ($('.events', _dockSmartphone).length > 0) {
				_smartphoneEventsToggle.addClass(_smartphoneDockOnClass);
			} else {
				_smartphoneEventsToggle.removeClass(_smartphoneDockOnClass);
			}
		} else {
			_dock.setSmartphoneDockPosition(_dockSmartphone, false);
			_dockSmartphone.removeClass(_smartphoneDockOnClass);
			_smartphoneEventsToggle.removeClass(_smartphoneDockOnClass);
		}
	}

	var _onMarkerSelect = function (markerData, source, zooming) {
		if (typeof(zooming) == 'undefined') zooming = false;

		// check if already selected
		if (_selectedMarker) {
			if (_selectedMarker.data.tid == markerData.tid) {
				return;
			}
		}

		// populate and display smartphone dock
		var itemSummary = _dock.getItemSummary(markerData);

		_dockSmartphone.html(itemSummary);
		_dockSmartphone.removeClass('show-events');
		$('.smartphone-events-toggle').removeClass('no-delay');
		_dockSmartphone.append($('<div class="shim">&nbsp;</div>'));
		_toggleSmartphoneDock(true);

		// fade in
		$('.thumb-container', _dockSmartphone).addClass('processed');

		// set events toggle
		_dock.setSmartphoneEventsToggle();

		// dock highlight
		_dock.select(markerData.tid);

		switch (source) {
			case 'pin':
				// scroll to appropriate dock item
				if (typeof($.fn.scrollTo) == 'function') {
					var target = $('.map-dock .tid-' + markerData.tid);

					// calculate scroll animation speed
					var dur = Math.round(Math.abs(target.position().top));

					if (dur < 300) dur = 300;
					if (dur > 800) dur = 800;

					if ($('html').hasClass('flip')) {
						var pos = target.position();
						var dockH = $('.map-dock').outerHeight();
						var targetScroll = dockH - pos.top - target.outerHeight() + $('.map-dock').scrollTop();

						$('.map-dock').scrollTo(Math.round(targetScroll), dur);
					} else {
						$('.map-dock').scrollTo(target, dur);
					}
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

		// marker highlight
		_toggleMarkerSelect(markerData.tid, zooming);
	}

	this.onMarkerSelect = function (tid) {
		_onMarkerSelect(_markerLookup[tid].data, 'pin');
	}

	var _onDockSelect = function (val) {
		var zooming = false;

		// zoom if necessary
		if (!_isMarkerImportant(val)) {
			_selectedMarker = null;
			_mapObject.setZoom(_getMinimumZoomLevel(val));
			zooming = true;
		}

		// trigger marker select
		_onMarkerSelect(val, 'dock', zooming);
	}

	var _highlightMarker = function (marker, boo) {
		if (typeof(marker) == 'undefined') return;

		// swap to front
		if (boo) {
			marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
		} else {
			marker.setZIndex(google.maps.Marker.MAX_ZINDEX - 1);
		}

		// highlight
		var myMarker = $('.calacademy-marker-' + marker.data.tid);
		myMarker.css('overflow', 'visible');

		if (boo) {
			myMarker.addClass('marker-highlight');
		} else {
			myMarker.removeClass('marker-highlight');
		}
	}

	var _toggleMarkerSelect = function (tid, zooming) {
		if (typeof(zooming) == 'undefined') zooming = false;

		// deselect last marker
		if (_selectedMarker) {
			_highlightMarker(_selectedMarker, false);
			_selectedMarker = null;
		}

		if (typeof(tid) != 'undefined') {
			// highlight selected marker
			_selectedMarker = _markerLookup[tid];

			if (zooming) {
				clearTimeout(_zoomTimeout);

				_zoomTimeout = setTimeout(function () {
					_highlightMarker(_selectedMarker, true);
				}, 500);
			} else {
				_highlightMarker(_selectedMarker, true);
			}
		}
	}

	var _createMarkers = function (data) {
		$.each(data, function (i, obj) {
			if (!obj.geolocation) return;
			if ($.isArray(obj.geolocation)) return;

			if (!obj.floor) return;
			if ($.isArray(obj.floor)) return;

			// flatten type array
			var typeTids = false;

			if ($.isArray(obj.type) && obj.type.length > 0) {
				typeTids = [];

				$.each(obj.type, function (j, val) {
					typeTids.push(val.tid);
				});
			}

			obj.type = typeTids;

			var marker = _addMarker(obj);
			var floorId = _floorLookup[obj.floor.tid];

			_markers[floorId].push(marker);
			_markerLookup[obj.tid] = marker;
		});
	}

	var _showMarkers = function () {
		_markersOnMap = [];

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
					_markersOnMap.push(marker);

					// hide if not important
					var boo = _isMarkerImportant(marker.data);
					marker.setVisible(boo);

					marker.setMap(_mapObject);
				} else {
					marker.setMap(null);
				}
			});
		});
	}

	var _getMinimumZoomLevel = function (data) {
		var priority = data.priority;
		if (isNaN(priority)) return _map.getZoomMax();

		var min = _zoomedOutLevel + parseInt(priority);
		if (min > _map.getZoomMax()) return _map.getZoomMax();

		return min;
	}

	var _isMarkerImportant = function (data) {
		// hide everything
		if (_zoomLevel <= _zoomedOutLevel) return false;

		// show everything
		if (_zoomLevel >= 21) return true;

		var priority = data.priority;
		if (isNaN(priority)) return false;

		var diff = _zoomLevel - _zoomedOutLevel;
		return (parseInt(priority) <= diff);
	}

	var _onMapZoom = function () {
		_zoomLevel = _mapObject.getZoom();
		calacademy.Utils.log('zoom: ' + _zoomLevel);

		// toggle default marker
		if (_zoomLevel <= _zoomedOutLevel) {
			_defaultMarker.setMap(_mapObject);
		} else {
			_defaultMarker.setMap(null);
		}

		// hide unimportant markers
		$.each(_markersOnMap, function (i, marker) {
			var boo = _isMarkerImportant(marker.data);
			marker.setVisible(boo);
		});

		// handle selected marker
		if (_selectedMarker) {
			var tid = _selectedMarker.data.tid;
			var isImportant = _isMarkerImportant(_selectedMarker.data);

			// smartphone dock
			_toggleSmartphoneDock(isImportant);

			// dock item highlighting
			if (_dock) {
				if (isImportant) {
					_dock.select(tid);
				} else {
					_dock.deselectAll();
				}
			}

			// marker DOMs get rebuilt on zoom, so trigger a highlight
			_toggleMarkerSelect(tid, true);
		}
	}

	var _initSmartphoneDock = function () {
		_dockSmartphone = $('<div />');
		_dockSmartphone.addClass('map-dock-smartphone');
		_dockSmartphone.css('top', $(window).height() + 'px');

		$('#content').append(_dockSmartphone);

		_smartphoneEventsToggle = $('<div />');
		_smartphoneEventsToggle.addClass('smartphone-events-toggle');
		_smartphoneEventsToggle.html('<a href="#"><span></span><div class="chevron">&gt;</div></a>');
		$('#content').prepend(_smartphoneEventsToggle);
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
		var newZoom = _zoomLevel + offset;

		if (newZoom <= _map.getZoomMax()) {
			_mapObject.setZoom(newZoom);
		}

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

	var _getDefaultZoom = function () {
		return _isSmartphone() ? 19 : 20;
	}

	var _initMap = function () {
		_map.injectMap($('#content'));
		_mapObject = _map.getMapObject();

		// diff default zoom for smartphones
		var defaultZoom = _getDefaultZoom();
		_mapObject.setZoom(defaultZoom);
		_zoomLevel = defaultZoom;

		// disable zooming
		if ($('html').hasClass('no-zoom')) {
			_mapObject.setOptions({
				disableDoubleClickZoom: true,
				scrollwheel: false,
				maxZoom: _zoomLevel,
				minZoom: _zoomLevel
			});

			if ($('html').hasClass('touch')) {
				// disable pinch / zoom
				// @see http://stackoverflow.com/questions/15059041/disabling-pinch-zoom-on-google-maps-desktop
				document.body.addEventListener('touchmove', function (e) {
					if (e.touches.length > 1) {
					    e.preventDefault()
					}

					return false;
				}, true);
			}
		}

		_initZoomControls();
		_initSmartphoneDock();

		google.maps.event.addListener(_mapObject, 'click', function () {
			_toggleSmartphoneDock(false);
			if (_dock) _dock.deselectAll();
			_toggleMarkerSelect();
			_collapseMenus();
		});

		google.maps.event.addListener(_mapObject, 'dragstart', _collapseMenus);
		google.maps.event.addListener(_mapObject, 'zoom_changed', _onMapZoom);
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

		_selectedMarker = null;
		if (_dock) _dock.deselectAll();
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

	var _onListSelect = function (e) {
		$('.calacademy_geolocation_map').attr('style', '');

		var listClass = 'map-list-selected';
		$('html').toggleClass(listClass);

		var str = $('html').hasClass(listClass) ? 'Map' : 'List';
		$('span', this).html(str);

		if ($('html').hasClass(listClass)) {
			$('.smartphone-events-toggle').removeClass('no-delay');
		} else {
			$('.smartphone-events-toggle.map-dock-smartphone-on').addClass('no-delay');
		}

		_collapseMenus();

		return false;
	}

	var _initListSwitchUI = function () {
		var container = $('<div id="title-list-toggle" />');
		container.html('<span>List</span>');

		$('.map-menus .titles').append(container);

		var myEvent = Modernizr.touch ? 'touchend' : 'click';
		container.on(myEvent, _onListSelect);
	}

	var _initDock = function (locations) {
		_dock = new CalAcademyMapDock(locations, _events, {onSelect: _onDockSelect});
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

	var _setEventsData = function (data) {
		$.each(data, function (i, obj) {
			if (!$.isArray(_events[obj.location_tid])) {
				_events[obj.location_tid] = [];
			}

			_events[obj.location_tid].push(obj);
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

		if ($('html').hasClass('unsupported')) {
			var h = parseInt($(window).height() - $('.unsupported-msg').outerHeight(true));
			$('#content').height(h);
		}
	}

	var _initBreaks = function () {
		var b = calacademy.Constants.breakpoints;

		enquire
		.register('screen and (min-width: ' + b.smartphone + 'px) and (max-width: ' + (b.tablet - 1) + 'px)', {
			match: function () {
				// unselect
				_toggleSmartphoneDock(false);
				if (_dock) _dock.deselectAll();
				_toggleMarkerSelect(null, true);
			}
		});
	}

	this.initialize = function () {
		if ($('html').hasClass('calacademy-map-init')) return;
		$('html').addClass('calacademy-map-init');
		$('body').css('top', 0);

		_defaultMarker = _addMarker({
			showlabel: false,
			tid: 0,
			icon: 'pin',
			name: 'default',
			geolocation: _map.getCenter()
		}, true);

		_mapData.getAll(function (data) {
			_floors = data.floors;
			_setFloorData();
			_setEventsData(data.events);

			var mapUI = $('<div />');
			mapUI.addClass('map-ui');
			$('#content').prepend(mapUI);

			_initDock(data.locations);
			_initMap();

			// iOS 8 fix
			setTimeout(function () {
				$('html').addClass('make-scrolly');
			}, 500);

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

			_showMarkers();
			_initBreaks();

			if ($('html').hasClass('kiosk')) {
				_initIdleTimer();
			}

			if ($('html').hasClass('show-translate')) {
				setInterval(function () {
					$('body').css('top', 0);
				}, 50);

				// rotation requires custom UI
				if ($('html').hasClass('flip')) {
					$('html').addClass('custom-translate')
				}

				if ($('html').hasClass('custom-translate')) {
					_customTranslateModal = new CalAcademyTranslateModal(that);
				}
			}
		});
	}

	this.initialize();
}
