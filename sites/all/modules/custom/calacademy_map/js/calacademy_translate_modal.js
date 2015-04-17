var CalAcademyTranslateModal = function (controller) {
	var $ = jQuery;
	var _controller = controller;
	var _select;
	var _modal;

	var _toggleModal = function () {
		_modal.toggle();
	}

	var _onLangSelect = function (e) {
		$('.custom-translate-modal .selected').removeClass('selected');
		$(this).parent().addClass('selected');
		_controller.setLanguage($(this).data('lang'));
		_toggleModal();
		return false;
	}

	var _initModal = function () {
		_modal = $('<div />');

		_modal.addClass('custom-translate-modal');
		_modal.addClass('notranslate');

		_modal.append('<h2>Select a language</h2>');
		var ul = $('<ul />');

		$('option', _select).each(function () {
			if (!$(this).attr('value')) return true;

			var li = $('<li />');
			var a = $('<a href="#" />');

			if (_select.val() == $(this).attr('value')) {
				li.addClass('selected');
			}

			a.html($(this).html());
			a.data('lang', $(this).attr('value'));
			a.on('click', _onLangSelect);

			li.append(a);
			ul.append(li);
		});

		_modal.append(ul);
		$('body').append(_modal);
		_toggleModal();
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
