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
	var _imagePath = '/sites/all/modules/custom/calacademy_map/images/';
	var _currentFloor = 'main';
	var _selectedMarker;
	var _filterView;
	var _floorView;
	var _selectedTypeTids;

	var _addMarker = function (obj) {
		// basic marker options
		var options = {
			position: new google.maps.LatLng(
				parseFloat(obj.geolocation.lat),
				parseFloat(obj.geolocation.lng)
			),
			icon: _imagePath + 'icons/pin.svg',
			map: _mapObject,
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

			options.icon = _imagePath + 'icons/' + icon + '.svg';
		} else if (hasLabel) {
			// no icon, but we have a label, remove pin
			options.icon = _imagePath + 'empty.gif';
		}

		return new MarkerWithLabel(options);
	}

	var _isValidProperty = function (prop) {
		return (typeof(prop) == 'string' && prop != '');
	}

	var _onMarkerSelect = function (markerData, source) {
		// populate and display smartphone dock
		var itemSummary = _dock.getItemSummary(markerData);

		_dockSmartphone.html(itemSummary);
		_dockSmartphone.show();

		// dock highlight
		_dock.select(markerData.tid);

		// marker highlight
		_toggleMarkerSelect(markerData.tid);

		switch (source) {
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

	var _toggleMarkerSelect = function (tid) {
		// deselect last marker
		if (_selectedMarker) {
			_selectedMarker.setAnimation(null);
		}

		if (typeof(tid) != 'undefined') {
			// highlight selected marker
			_selectedMarker = _markerLookup[tid];
			_selectedMarker.setAnimation(google.maps.Animation.BOUNCE);
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
			marker.setVisible(false);

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
				if (calacademy.Utils.isArray(marker.data.type)) {
					var onFloor = floor == _currentFloor;
					var inFilter = false;

					if (onFloor) {
						// on this floor, check if it meets filter criteria
						$.each(marker.data.type, function (j, tid) {
							if (_selectedTypeTids.indexOf(parseInt(tid)) != -1) {
								inFilter = true;
								return false;
							}
						});
					}

					marker.setVisible(onFloor && inFilter);
				} else {
					// @todo
					// no type specified, show it regardless of filter
					marker.setVisible(floor == _currentFloor);
				}
			});
		});
	}

	var _initSmartphoneDock = function () {
		_dockSmartphone = $('<div />');
		_dockSmartphone.addClass('map-dock-smartphone');
		$('#content').append(_dockSmartphone);
	}

	var _initMap = function () {
		_map.injectMap($('#content'));
		_mapObject = _map.getMapObject();
		_initSmartphoneDock();

		google.maps.event.addListener(_mapObject, 'click', function () {
			if (_dockSmartphone != false) _dockSmartphone.hide();
			if (_dock) _dock.deselectAll();
			_toggleMarkerSelect();
		});
	}

	var _onFilterSelect = function (vals) {
		_selectedTypeTids = vals;
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
		if (_dockSmartphone != false) _dockSmartphone.hide();
	}

	var _initFloorView = function () {
		_floorView = new CalAcademyMapMenu(_floors, {id: 'map-menu-floor', keyProp: 'machine_id', onSelect: _onFloorSelect});
		$('.map-ui').prepend(_floorView.get());

		// start with 'main'
		_floorView.trigger(_currentFloor);
	}

	var _initFilterView = function (data) {
		_filterView = new CalAcademyMapMenu(data, {id: 'map-menu-filter', checkbox: true, onSelect: _onFilterSelect});
		_filterView.setTitle('Filter');
		_filterView.get().insertAfter(_floorView.get());

		// start with everything
		$.each(data, function (i, obj) {
			_filterView.trigger(obj.tid);
		});
	}

	var _initListSwitchUI = function () {
		var container = $('<div id="map-menu-list-toggle" />');
		container.addClass('map-menu-container');
		container.append('<div class="title">List</div>');
		container.insertAfter(_filterView.get());

		var _onListSelect = function () {
			var listClass = 'map-list-selected';
			$('html').toggleClass(listClass);

			var str = $('html').hasClass(listClass) ? 'Map' : 'List';
			$('.title', this).html(str);

			return false;
		}

		if (Modernizr.touch) {
			container.hammer().on('tap', _onListSelect);
		} else {
			container.on('click', _onListSelect);
		}
	}

	var _initDock = function (locations) {
		_dock = new CalAcademyMapDock(locations, {onSelect: _onDockSelect});
		$('.map-ui').prepend(_dock.get());

		// add a floor class to each item
		$('.map-dock li').each(function () {
			var floorTid = $(this).data('val').floor.tid;
			$(this).addClass(_floorLookup[floorTid]);
		});
	}

	var _setFloorData = function () {
		$.each(_floors, function (i, obj) {
			_markers[obj.machine_id] = [];
			_floorLookup[obj.tid] = obj.machine_id;
		});
	}

	var _setDockHeight = function () {
		var colHeight = $('.calacademy_geolocation_map').height();
		var menuHeight = _dock.get().parent().outerHeight() - _dock.get().outerHeight();

		_dock.get().height(colHeight - menuHeight);
	}

	var _onResize = function () {
		_setDockHeight();
	}

	this.initialize = function () {
		_mapData.getAll(function (data) {
			_floors = data.floors;
			_setFloorData();

			var mapUI = $('<div />');
			mapUI.addClass('map-ui');
			$('#content').prepend(mapUI);

			_initDock(data.locations);
			_initMap();

			_initFloorView();
			_initFilterView(data.locationtypes);
			_initListSwitchUI();
			_createMarkers(data.locations);

			$(window).on('resize', _onResize);
			$(window).trigger('resize');

			// trigger resize on menu toggle
			var menuTitles = $('.map-menu-container .title');

			if (Modernizr.touch) {
				menuTitles.hammer().on('tap', _onResize);
			} else {
				menuTitles.on('click', _onResize);
			}
		});
	}

	this.initialize();
}
