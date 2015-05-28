var CalAcademyGigamacroIndex = function (viewer) {
	var $ = jQuery;
	var that = this;
	var _viewer = viewer;
	var _pinData;
	var _arrowSvg;
	var _topZ = 100;
	var _selected;
	var _headerString = 'Zoom to Explore at Microscale';
	var _transitionEndEvents = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';
	var _attractFadeoutClass = 'attract-fade-out';
	var _timeoutCenterAnimation;
	var _timeoutTransition;
	var _timeoutAttract;
	var _hardwareHighlight;

	var _initIdleTimer = function () {
		// default to 30 secs
		var dur = 30000;
		var idleTime = $.getQueryString('idle-time');

		if (typeof(idleTime) == 'string') {
			dur = parseInt(idleTime);
		}

		$(document).idleTimer({
			timeout: dur
		});

		$(document).on('idle.idleTimer', function (event, elem, obj) {
			// switch to index if in viewer
			if (!$('#index-container').is(':visible')) {
				that.onReturn(null);
				
				clearTimeout(_timeoutAttract);
				_timeoutAttract = setTimeout(_attract, 1500);
			} else {
				_attract();	
			}
    	});

    	$(document).on('active.idleTimer', function (event, elem, obj, triggerevent) {
        	_clearAttract();
    	});
	}

	var _clearAttract = function () {
		clearTimeout(_timeoutAttract);
        $('#gigamacro-menu li').off(_transitionEndEvents);
        
        $('#gigamacro-menu li').css({
        	'transition-delay': '',
        	'transition-duration': '.6s'
        });
        
        $('#gigamacro-menu li').removeClass(_attractFadeoutClass);
        $('#index-container').removeClass('attracting');
	}

	var _attract = function () {
		_clearAttract();

		// first round, randomize duration and delay
		$('#gigamacro-menu li').each(function () {
			$(this).css({
				'transition-delay': calacademy.Utils.randomRange(0, 4) + 's',
				'transition-duration': calacademy.Utils.randomRange(3, 5) + 's'
			});
		});

		$('#index-container').addClass('attracting');
		$('#gigamacro-menu li').addClass(_attractFadeoutClass);

		// randomize transition duration on toggle
		$('#gigamacro-menu li').off(_transitionEndEvents);

		$('#gigamacro-menu li').on(_transitionEndEvents, function () {
			var d = calacademy.Utils.randomRange(3, 5);

			if (!$(this).hasClass(_attractFadeoutClass)) {
				d = calacademy.Utils.randomRange(4, 6);	
			}

			$(this).css({
				'transition-duration': d + 's',
				'transition-delay': ''
			});

			$(this).toggleClass(_attractFadeoutClass);
		});
	}

	var _toggleIndex = function (boo) {
		if (boo) {
			_hardwareHighlight.clear();

			// show index
			$('#content').hide();
			$('#index-container li').addClass('outro');
			$('#index-container').show();

			clearTimeout(_timeoutTransition);

			_timeoutTransition = setTimeout(function () {
				$('#index-container').addClass('intro');
				$('.outro').removeClass('outro');
			}, 5);

		} else {
			// hide index
			$('#index-container').removeClass('intro');
			$('#index-container').hide();
			_clearAttract();
		}
	}

	var _makeDraggable = function () {
		$('.circle, .name_container').off('click touchend');

		if ($('html').hasClass('img-placement')) {
			$('.circle, .name_container').off('mouseover touchstart');
			$('#gigamacro-menu li img').css('pointer-events', 'inherit');
			$('#gigamacro-menu li img').draggable();
		} else {
			$('#gigamacro-menu li, #gigamacro-menu li img, .name_container').draggable();
		}

		$('body').keyup(function (e) {
			if (e.keyCode == 32) {
				alert(gigamacro.utils.getCoords());
			}
		});
	}

	var _setCoords = function () {
		$('img, .img-container, .circle', '#index-container').attr('style', '');

		$.each(gigamacro.coords, function (i, obj) {
			$('.' + obj.specimen).css({
				left: obj.left,
				top: obj.top,
				zIndex: 'auto'
			});

			$('.' + obj.specimen + ' .name_container').css({
				left: obj.name_left,
				top: obj.name_top
			});

			$('.' + obj.specimen + ' img').css({
				marginLeft: obj.img_left,
				marginTop: obj.img_top
			});
		});
	}

	var _fadeOutIndex = function () {
		$('#index-container').removeClass('intro');

		var fadeThese = $('#index-container, #index-container h1, #index-container li').not(_selected);
		fadeThese = fadeThese.add($('.circle, .name_container', _selected));

		fadeThese.each(function () {
			$(this).css({
				'transition-duration': calacademy.Utils.randomRange(.4, 1.6) + 's'
			});
		});

		fadeThese.addClass('outro');
	}

	var _centerAnimation = function () {
		var s = 612;
    	var img = $('img', _selected);

    	_topZ++;
		_selected.css('z-index', _topZ);

  		var centerX = Math.round($('#index-container').width() / 2);
  		var centerY = Math.round($('#index-container').height() / 2);

    	centerX -= _selected.position().left;
    	centerY -= _selected.position().top;

    	centerX -= (s / 2) + 1;
    	centerY -= (s / 2) + 1;

    	centerX -= parseFloat(img.css('margin-left'));
    	centerY -= parseFloat(img.css('margin-top'));

    	if (Modernizr.csstransforms3d) {
			img.css({
	    		'transform': 'translate3d(' + centerX + 'px, 0, 0)'
	    	});
	    	img.parent().css({
	    		'transform': 'translate3d(0, ' + centerY + 'px, 0)'
	    	});
    	} else {
    		img.css({
    			'transform': 'scale(1)',
    			'left': centerX + 'px'
	    	});
	    	img.parent().css({
	    		'top': centerY + 'px'
	    	});
    	}
	}

	var _removeMapBackground = function (e) {
		_viewer.getMap().off('zoomstart move', _removeMapBackground);
		$('#leaflet-map').css('background-image', 'none');
	}

	var _initMap = function () {
		$('#content').show();

		_viewer.initMap();
		$('#leaflet-map').css('background-image', 'url(' + $('img', _selected).attr('src') + ')');
		_viewer.getMap().on('zoomstart move', _removeMapBackground);

		_toggleIndex(false);
		_setCoords();

		$('#index-container').removeClass('outro');
		$('html').removeClass('disable-interaction');

		var data = _selected.data('specimen-data');
		_hardwareHighlight.select(data.tiles_clean);
	}

	var _onSpecimenSelect = function (e) {
		if (!$(this).parent().hasClass('over')) return;

		$('html').addClass('disable-interaction');

		_selected = $(this).parent();
		_selected.removeClass('over');
		$('img', _selected).removeClass('img-over');

		var data = _selected.data('specimen-data');
		_viewer.setSpecimenData(data);
		_viewer.setPinData(data.pins);

		if ($('html').hasClass('center-animation')) {
			_fadeOutIndex();
			_centerAnimation();

			clearTimeout(_timeoutCenterAnimation);
			_timeoutCenterAnimation = setTimeout(_initMap, 1000);
		} else {
			_initMap();
		}

		return false;
	}

	var _initEvents = function () {
		var _onOver = function (e) {
			var li = $(this).parent();

			// unhiglight everything else
			$('#gigamacro-menu li').not(li).each(function () {
				$(this).removeClass('over');
				$('img', this).removeClass('img-over');
			});

			// highlight selected
			li.addClass('over');
			$('img', li).addClass('img-over');

			return false;
		}

		var _onOut = function (e) {
			$(this).parent().removeClass('over');
			$('img', $(this).parent()).removeClass('img-over');
			return false;
		}

		var el = $('.circle, .name_container');

		if (Modernizr.touch) {
			el.touchleave(_onOut);
			el.on('touchstart', _onOver);
			el.on('touchend', _onSpecimenSelect);
		} else {
			el.on('mouseout', _onOut);
			el.on('mouseover', _onOver);
			el.on('click', _onSpecimenSelect);
		}
	}

	var _onSpecimenData = function (data) {
		var ul = $('<ul id="gigamacro-menu" />');
		ul.hide();

		$.each(data, function (i, obj) {
			var li = $('<li />');
			var tiles = gigamacro.utils.getTilesMachineName(obj.tiles);

			obj.tiles_clean = tiles;
			obj.pins = [];

			li.data('specimen-data', obj);
			li.addClass(tiles);

			li.append('<div class="img-container"><img src="' + gigamacro.assetsPath + 'index-thumbs/' + tiles + '.png" /></div>');
			li.append('<div class="circle" />');
			li.append('<div class="name_container">' + _arrowSvg + '<div class="common_name">' + obj.common_name + '</div></div>');

			ul.append(li);
		});

		$('#index-container').append(ul);

		// iterate pin data and append to specimen data
		$.each(_pinData, function (i, obj) {
			var tiles = gigamacro.utils.getTilesMachineName(obj.tiles);
			var li = $('#gigamacro-menu .' + tiles);

			if (li.length == 1) {
				li.data('specimen-data').pins.push(obj);
			}
		});

		_setCoords();
		_initEvents();
		_initIdleTimer();

		setTimeout(function () {
			ul.show();
		}, 100);

		// recording coordinates
		if ($('html').hasClass('draggable')) {
			_makeDraggable();
		}
	}

	var _onPinData = function (data) {
		_pinData = data;
		gigamacro.utils.jsonRequest('gigamacro-specimens', {}, _onSpecimenData);
	}

	this.onReturn = function (e) {
		_viewer.destroy();
		_toggleIndex(true);
	}

	this.initialize = function () {
		_hardwareHighlight = new CalAcademyGigamacroHardwareHighlight();

		// suppress right clicks on touch devices
		if (Modernizr.touch) {
			window.addEventListener('contextmenu', function (e) {
				e.preventDefault();
			});
		}

		$('body').addClass('node-type-gigamacro-specimen');
		$('html').addClass('floor');
		$('html').addClass('center-animation');

		$('#content').before('<div id="index-container"><h1>' + _headerString + '</h1></div>');
		_toggleIndex(true);

		var foo = $('<div />');

		foo.load(gigamacro.assetsPath + 'arrow.svg', function () {
			_arrowSvg = $(this).html();
			gigamacro.utils.jsonRequest('gigamacro-pins', {}, _onPinData);
		});
	}

	this.initialize();
}
