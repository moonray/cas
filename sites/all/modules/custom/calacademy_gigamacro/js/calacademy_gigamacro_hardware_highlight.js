var CalAcademyGigamacroHardwareHighlight = function () {
	var $ = jQuery;
	var _iframe;
	var _url = '//playground.rotter.org/?key=';

	this.select = function (val) {
		_iframe.attr('src', _url + val + '&nocache=' + Math.random());
	}

	this.clear = function () {
		this.select('0');	
	}

	this.initialize = function () {
		_iframe = $('<iframe />');
		
		_iframe.css({
			width: '500px',
			height: '500px',
			position: 'absolute',
    		left: '-5000px'
		});

		$('body').append(_iframe);
	}

	this.initialize();
}
