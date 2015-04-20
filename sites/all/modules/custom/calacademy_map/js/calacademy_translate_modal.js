var CalAcademyTranslateModal = function (controller) {
	var $ = jQuery;
	var that = this;
	var _controller = controller;
	var _select;
	var _modal;
	var _closeTimeout;

	this.hide = function () {
		$(document).off('touchend click', _onDocClick);
		_modal.hide();
		_select.removeClass('highlight');
		$(window).off('resize', _center);
	}

	this.setDefault = function () {
		$('.custom-translate-modal .selected').removeClass('selected');
		$('.custom-translate-modal .default').addClass('selected');
	}

	var _center = function () {
		var pos = ($(window).height() / 2) - (_modal.outerHeight(true) / 2) - 10;
		_modal.css('top', pos + 'px');
	}

	var _toggleModal = function () {
		if (_modal.is(':visible')) {
			that.hide();
		} else {
			_modal.show();
			_select.addClass('highlight');
			_center();
			$(window).on('resize', _center);

			clearTimeout(_closeTimeout);

			_closeTimeout = setTimeout(function () {
				$(document).on('touchend click', _onDocClick);
			}, 100);
		}
	}

	var _onDocClick = function (e) {
		if (_modal.is(':visible')) {
			if (!$(e.target).closest(_modal).length) {
		        that.hide();
		    }
		}    
	}

	var _onLangSelect = function (e) {
		$('.custom-translate-modal .selected').removeClass('selected');
		$(this).parent().addClass('selected');
		_controller.setLanguage($(this).data('lang'));
		that.hide();
		return false;
	}

	var _initModal = function () {
		_modal = $('<div />');

		_modal.addClass('custom-translate-modal');
		_modal.addClass('notranslate');

		_modal.append('<a class="close" href="#">Close</a><h2>Select Language</h2>');
		var ul = $('<ul />');

		var hasEnglish = false;

		$('option', _select).each(function () {
			if (!$(this).attr('value')) return true;

			var val = $(this).attr('value');
			var li = $('<li />');
			var a = $('<a href="#" />');

			if (_select.val() == val) {
				li.addClass('selected');
			}

			a.html($(this).html());
			a.data('lang', val);
			a.on('click touchend', _onLangSelect);

			li.append(a);
			ul.append(li);

			if (val == 'en') {
				li.addClass('default');
				hasEnglish = true;
			}
		});

		// add en option if there isn't one already
		if (!hasEnglish) {
			var li = $('<li class="default"><a href="#">English</a></li>');

			$('a', li).data('lang', 'en');
			$('a', li).on('click touchend', _onLangSelect);
			
			if (_select.val() == 'en' || !_select.val()) {
				li.addClass('selected');
			}

			ul.prepend(li);
		}

		$('.close', _modal).on('click touchend', function () {
			that.hide();
			return false;
		});

		_modal.append(ul);
		$('body').append(_modal);

		_center();
		that.hide();
	}

	this.initialize = function () {
		$('body').on('focus', '.google-translate select', function () {
			_select = $(this);
			_select.off('focus');
			_select.attr('disabled', 'true');
			_select.css('pointer-events', 'none');
			
			_initModal();
			$('#footer').on('click', _toggleModal);
			$('#footer').trigger('click');
		});
	}

	this.initialize();	
}
