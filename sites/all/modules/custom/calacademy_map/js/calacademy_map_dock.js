var CalAcademyMapDock = function (data, events, options) {
	var $ = jQuery;
	var _data = data;
	var _events = events;
	var _container;
	var _inst = this;
	var _touchMoving = false;
	var _imagePath = '/sites/all/modules/custom/calacademy_map/images/';

 	var _options = $.extend({}, {
		onSelect: function (val) {}
	}, options);

	this.getItemSummary = function (obj) {
		var container = $('<div />');
		container.addClass('map-item-container');

		var item = $('<div />');
		item.addClass('location-info');

		var title = obj.name;
		var desc = obj.description;
		var url = false;
		var img = false;

		// check if we have details
		if (calacademy.Utils.isArray(obj.detail)) {
			item.addClass('no-details');
		} else {
			var deets = obj.detail;

			if (_isValidProperty(deets.summary)) {
				desc = deets.summary;
			}
			if (_isValidProperty(deets.url)) {
				url = deets.url;
			}
			if (_hasImage(obj)) {
				img = deets.thumbnail.src;
			}
		}

		// thumbnail
		var thumbContainer = $('<div />');
		thumbContainer.addClass('thumb-container');
		thumbContainer.html(title);

		if (img !== false) {
			thumbContainer.css('background-image', 'url(' + img + ')');
			item.addClass('pic');
			item.append(thumbContainer);
		} else {
			// if (_isValidProperty(obj.icon)) {
			// 	var icon = obj.icon.toLowerCase();
			// 	icon = icon.replace(/\s+/g, '-');

			// 	if (icon != 'pin') {
			// 		item.addClass('icon');

			// 		var iconPath = _imagePath + 'icons/' + icon;
			// 		iconPath += Modernizr.svg ? '.svg' : '.png';

			// 		thumbContainer.html('<img src="' + iconPath + '" />');

			// 		item.append(thumbContainer);
			// 	}
			// }
		}

		// title
		item.append('<div class="text-container" />');

		var titleEl = $('<div />');
		titleEl.addClass('title');
		titleEl.html(title);
		$('.text-container', item).append(titleEl);

		// description
		if (desc == '') {
			item.addClass('no-desc');
		} else {
			var descEl = $('<div class="details-desc" />');
			descEl.html(desc);

			// remove empty p tags
			$('p', descEl).each(function () {
				if ($.trim($(this).text()) == '') {
					$(this).remove();
				}
			});

			$('.text-container', item).append(descEl);
		}

		// link
		if (url !== false) {
			var a = $('<a />');
			a.attr('href', url);
			a.html(title);

			titleEl.html(a);
		}

		container.append(item);

		// events
		if (calacademy.Utils.isArray(_events[obj.tid])) {
			var events = $('<div />');
			events.addClass('events');

			$.each(_events[obj.tid], function (i, event) {
				var eventEl = $('<div />');
				eventEl.html('<div class="event-title">' + event.title + '</div><div class="time-slots"></div>');

				// format time
				var slots = [];
				
				$.each(event.time_slots, function (j, slot) {
					var m = moment(slot, 'HH:mm');
					slots.push(m.format('h:mma'));
				});

				// pipe delimited
				$('.time-slots', eventEl).html(slots.join(' <span>|</span> '));

				events.append(eventEl);
			});

			container.append(events);
			
			// toggle UI
			container.append('<div class="event-toggle"><a href="#"><span>See Events</span><div class="chevron">&gt;</div></a></div>');

			var myEvent = Modernizr.touch ? 'touchend' : 'click';

			$('.event-toggle a', container).on(myEvent, function () {
				var events = $(this).parent().siblings('.events');
				events.toggleClass('show-events');

				if (events.hasClass('show-events')) {
					
					$(this).addClass('open');
					$('span', this).html('Close Events');
				} else {
					
					$(this).removeClass('open');
					$('span', this).html('See Events');
				}

				return false;
			});
		}
		
		return container;
	}

	this.get = function () {
		return _container;
	}

	this.deselectAll = function () {
		$('li', _container).removeClass('selected');
	}

	this.select = function (tid) {
		this.deselectAll();
		$('.tid-' + tid, _container).addClass('selected');
	}

	var _isLabelOnly = function (obj) {
		var hasIcon = _isValidProperty(obj.icon);
		var hasLabel = (_isValidProperty(obj.showlabel) && parseInt(obj.showlabel));
		return (hasLabel && !hasIcon);
	}

	var _hasImage = function (obj) {
		if (calacademy.Utils.isArray(obj.detail)) return false;

		var deets = obj.detail;

		if (typeof(deets.thumbnail) != 'object') return false;
		if (!_isValidProperty(deets.thumbnail.src)) return false;

		return true;
	}

	var _select = function (e) {
		var data = $(this).data('val');

		// UI stuff
		_inst.select(data.tid);

		// trigger callback
		_options.onSelect.call(this, data);
	}

	var _initEvents = function () {
		var el = $('li', _container);

		if (Modernizr.touch) {
			el.hammer().on('tap', _select);
		} else {
			el.on('click', _select);
		}
	}

	var _addItemSummaries = function () {
		$.each(_data, function (i, val) {
			// exclude from dock if explicitly specified
			if (_isValidProperty(val.hideinlegend) && parseInt(val.hideinlegend)) return;

			// exclude from dock if no image or icon and no description
			if (_isLabelOnly(val) && !_hasImage(val) && $.trim(val.description) == '') return;

			var li = $('<li />');
			li.data('val', val);
			li.addClass('tid-' + val.tid);

			li.append(_inst.getItemSummary(val));

			// add special class for no type
			if (val.type.length == 0) {
				li.addClass('no-type');
			}

			_container.append(li);
		});
	}

	var _isValidProperty = function (prop) {
		return (typeof(prop) == 'string' && prop != '');
	}

	this.initialize = function () {
		_container = $('<ul />');
		_container.addClass('map-dock');
		_addItemSummaries();
		_initEvents();
	}

	this.initialize();
}
