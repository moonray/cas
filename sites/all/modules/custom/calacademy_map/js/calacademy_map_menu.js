var CalAcademyMapMenu = function (data, options) {
	var $ = jQuery;
	var _data = data;
	var _container;

 	var _options = $.extend({}, {
 		onSelect: function (val) {},
 		checkbox: false,
 		title: 'Select',
 		keyProp: 'tid',
 		labelProp: 'name'
	}, options);

	var _addOptions = function () {
		var menu = $('<ul />');

		$.each(_data, function (i, obj) {
			menu.append($('<li><a data-val="' + obj[_options.keyProp] + '" href="#">' + obj[_options.labelProp] + '</a></li>'));
		});

		_container.append(menu);
	}

	var _select = function () {
		if (_options.checkbox) {
			$(this).toggleClass('selected');

			var arr = [];

			$('a.selected', _container).each(function () {
				arr.push($(this).data('val'));
			});

			_options.onSelect.call(this, arr);
		} else {
			// only fire callback if selecting
			if (!$(this).hasClass('selected')) {
				_options.onSelect.call(this, $(this).data('val'));
			}

			$('a', _container).removeClass('selected');
			$(this).addClass('selected');
		}

		return false;
	}

	var _initEvents = function () {
		if (Modernizr.touch) {
			$('a', _container).hammer().on('tap', _select);
		} else {
			$('a', _container).on('click', _select);
		}
	}

	this.trigger = function (val) {
		$('a', _container).each(function () {
			if ($(this).data('val') == val) {
				if (Modernizr.touch) {
					$(this).hammer().trigger('tap');
				} else {
					$(this).trigger('click');
				}

				return false;
			}
		});
	}

	this.get = function () {
		return _container;
	}

	this.setTitle = function (title) {
		if ($('h2', _container).length == 0) {
			_container.prepend('<h2>' + title + '</h2>');
		} else {
			$('h2', _container).html(title);
		}
	}

	this.initialize = function () {
		_container = $('<div />');
		_container.addClass('map-menu-container');

		_addOptions();
		_initEvents();

		this.setTitle(_options.title);
	}

	this.initialize();
}
