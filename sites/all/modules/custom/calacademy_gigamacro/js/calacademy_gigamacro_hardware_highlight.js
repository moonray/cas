var CalAcademyGigamacroHardwareHighlight = function () {
	var $ = jQuery;
	var _iframe;
	
	var _url = '//localhost/?id=';
	// var _url = '//playground.rotter.org/?key=';

	var _lookup = {
		'reset': 66,
		'egg-grid': 4,
		'feather-grid': 7,
		'shell-grid': 3,
		'comet-moth': 11,
		'weevils': 10,
		'glory-bush': 2,
		'urchin-grid': 0,
		'scarab-beetle': 8,
		'grasshopper': 5,
		'spur-flower': 1,
		'damselfly': 9,
		'sunset-moth': 6 
	};

	this.select = function (val) {
		if (typeof(_lookup[val]) == 'undefined') return;

		_iframe.attr('src', _url + _lookup[val] + '&nocache=' + Math.random());
	}

	this.clear = function () {
		this.select('reset');	
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
