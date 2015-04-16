var CalAcademyMapMenu = function (data, settings) {
	var $ = jQuery;
	var _inst = this;
	var _data = data;
	var _title;
	var _options;

 	var _settings = $.extend({}, {
 		idSuffix: 'menu',
 		collapseOnSelect: false,
 		onSelect: function (val) {},
 		checkbox: false,
 		title: 'Select',
 		keyProp: 'tid',
 		labelProp: 'name'
	}, settings);

	var _addOptions = function () {
		$.each(_data, function (i, obj) {
			_options.append($('<li><a data-val="' + obj[_settings.keyProp] + '" href="#">' + obj[_settings.labelProp] + '</a></li>'));
		});
	}

	var _select = function (e) {
		var stuff = $(this).parent().children();

		if (_settings.checkbox) {
			stuff.toggleClass('selected');

			var arr = [];

			$('a.selected', _options).each(function () {
				arr.push($(this).data('val'));
			});

			_settings.onSelect.call(this, arr);
		} else {
			// only fire callback if selecting
			if (!$(this).hasClass('selected')) {
				_settings.onSelect.call(this, $(this).data('val'));
			}

			$('li', _options).children().removeClass('selected');
			stuff.addClass('selected');
			_inst.setTitle($(this).html());
		}

		if (_settings.collapseOnSelect) {
			_inst.collapse();
		}

		e.preventDefault();
		return false;
	}

	var _initEvents = function () {
		if (Modernizr.touch) {
			$('a', _options).on('touchend', _select);
			_title.on('touchend', _onTitleClick);
		} else {
			$('a', _options).on('click', _select);
			_title.on('click', _onTitleClick);
		}
	}

	var _onTitleClick = function () {
		// remove other -menu-open classes
		var menuClass = _settings.idSuffix + '-menu-open';
		var classList = $('html').attr('class').split(/\s+/);

		$.each(classList, function(i, val) {
			if (val.indexOf('-menu-open') != -1) {
				if (val != menuClass) {
					$('html').removeClass(val);
				}
			}
		});

		// toggle selected class
		$('html').toggleClass(menuClass);

		return false;
	}

	this.collapse = function () {
		$('html').removeClass(_settings.idSuffix + '-menu-open');
	}

	this.trigger = function (val) {
		$('a', _options).each(function () {
			if ($(this).data('val') == val) {
				if (Modernizr.touch) {
					$(this).trigger('touchend');
				} else {
					$(this).trigger('click');
				}

				return false;
			}
		});
	}

	this.get = function () {
		return {
			title: _title,
			options: _options
		};
	}

	this.setTitle = function (title) {
		$('span', _title).html(title);
	}

	this.initialize = function () {
		_title = $('<div />');
		_title.html($('<span />'));

		_options = $('<ul />');

		_title.attr('id', 'title-' + _settings.idSuffix);
		_options.attr('id', 'options-' + _settings.idSuffix);

		_addOptions();
		_initEvents();
	}

	this.initialize();
}
