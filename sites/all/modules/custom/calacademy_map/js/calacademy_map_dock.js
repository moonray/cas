var CalAcademyMapDock = function (data, options) {
	var $ = jQuery;
	var _data = data;
	var _container;
	var _inst = this;

 	var _options = $.extend({}, {
		onSelect: function (val) {}
	}, options);

	this.getItemSummary = function (obj) {
		var item = $('<div />');
		item.addClass('map-item-container');

		var title = obj.name;
		var desc = obj.description;
		var url = false;
		var img = false;

		// check if we have details
		if (!calacademy.Utils.isArray(obj.detail)) {
			var deets = obj.detail;

			if (_isValidProperty(deets.title)) {
				title = deets.title;
			}
			if (_isValidProperty(deets.summary)) {
				desc = deets.summary;
			}
			if (_isValidProperty(deets.url)) {
				url = deets.url;
			}

			if (typeof(deets.thumbnail) == 'object') {
				if (_isValidProperty(deets.thumbnail.src)) {
					img = deets.thumbnail.src;
				}
			}
		}

		// thumbnail
		if (img !== false) {
			var thumbContainer = $('<div />');
			thumbContainer.addClass('thumb-container');
			var thumb = $('<img />');

			thumb.on('load', function () {
				$(this).addClass('loaded');
			});

			// add cache buster for iOS bug
			if (Modernizr.touch) {
				img += (img.indexOf('?') > 0) ? '&' : '?';
				img += 'nocache=' + Math.random();
			}

			thumb.attr('src', img);
			thumbContainer.append(thumb);
			item.append(thumbContainer);
		}

		// title
		item.append('<div class="text-container" />');

		var titleEl = $('<div />');
		titleEl.addClass('title');
		titleEl.html(title);
		$('.text-container', item).append(titleEl);

		// description
		if (desc != '') {
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

		return item;
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
			var li = $('<li />');
			li.data('val', val);
			li.addClass('tid-' + val.tid);

			li.append(_inst.getItemSummary(val));

			// add special class if no details
			if ($('.title a', li).length == 0) {
				li.addClass('no-details');
			}

			// add special class if no types
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
