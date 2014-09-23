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
			var thumb = $('<img />');
			thumb.attr('src', img);
			item.append(thumb);
		}

		// title
		var h2 = $('<h2 />');
		h2.html(title);
		item.append(h2);

		// description
		if (desc != '') {
			var descEl = $('<div class="details-desc" />');
			descEl.html(desc);
			item.append(descEl);
		}

		// link
		if (url !== false) {
			var link = $('<div class="details-link" />');
			var a = $('<a />');
			a.html('View details');
			a.attr('href', url);
			link.append(a);

			item.append(link);
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

	var _select = function () {
		// UI stuff
		_inst.select($(this).data('val').tid);

		// trigger callback
		_options.onSelect.call(this, $(this).data('val'));

		return false;
	}

	var _initEvents = function () {
		if (Modernizr.touch) {
			$('li', _container).hammer().on('tap', _select);
		} else {
			$('li', _container).on('click', _select);
		}
	}

	var _addItemSummaries = function () {
		$.each(_data, function (i, val) {
			var li = $('<li />');
			li.data('val', val);
			li.addClass('tid-' + val.tid);

			li.append(_inst.getItemSummary(val));
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
