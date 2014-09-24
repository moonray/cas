var CalAcademyMapMenu = function (data, options) {
	var $ = jQuery;
	var _data = data;
	var _container;
	var _inst = this;

 	var _options = $.extend({}, {
 		id: false,
 		onSelect: function (val) {},
 		checkbox: false,
 		containerClass: 'map-menu-container',
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
			_inst.setTitle($(this).html());
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

	var _onTitleClick = function () {
		// remove other -menu-open classes
		var menuClass = _options.id + '-menu-open';
		var classList = $('html').attr('class').split(/\s+/);

		$.each(classList, function(i, val) {
			if (val.indexOf('-menu-open') != -1) {
				if (val != menuClass) {
					$('html').removeClass(val);
				}
			}
		});

		// toggle selected class
		if (typeof(_options.id) == 'string') {
			$('html').toggleClass(menuClass);
		}

		return false;
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
		if ($('.title', _container).length == 0) {
			_container.prepend('<div class="title">' + title + '</div>');

			if (Modernizr.touch) {
				$('.title', _container).hammer().on('tap', _onTitleClick);
			} else {
				$('.title', _container).on('click', _onTitleClick);
			}
		} else {
			$('.title', _container).html(title);
		}
	}

	this.initialize = function () {
		_container = $('<div />');

		if (typeof(_options.id) == 'string') {
			_container.attr('id', _options.id);
		}

		_container.addClass(_options.containerClass);
		_addOptions();
		_initEvents();
	}

	this.initialize();
}
