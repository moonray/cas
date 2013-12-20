var CalAcademy = function () {
	var $ = jQuery;
	var _isFontLoaded = false;
	var _device;
	var _orientationChangeTimeout;
	var _pages = calacademy.Statics.pageObjects;
	var _breakpoints = calacademy.Constants.breakpoints;

	var _getClusterHeight = function (cluster) {
		// iterate all rows and record bottom positions
		var bottoms = [];
		
		$('.views-row', cluster).each(function () {
			var rowTop = $(this).position().top;
			bottoms.push(rowTop + calacademy.Utils.getRowHeight($(this)));
		});

		// return the bottom-most value
		return Math.max.apply(Math, bottoms);
	}

	var _placeUnder = function (anchor, target) {
		if (anchor.length == 0 || target.length == 0) return;

		target.addClass('dynamic-css');
		target.css('position', 'absolute');
		target.css('top', anchor.position().top + calacademy.Utils.getRowHeight(anchor) + 'px');
		target.css('left', anchor.position().left + 'px');
	}

	var _clearClusterHeights = function () {
		$('.skewed-tri-grid, .tri-col-highlight, .skewed-four-col').each(function () {
			$('.view', this).addClass('dynamic-css');
			$('.view', this).css('height', _getClusterHeight($(this)) + 'px');	
		});
	}

	var _layout = function () {
		_setSmartphoneSubnavHeight();

		// put things in special places
		_placeUnder($('.skewed-four-col .views-row-2'), $('.skewed-four-col .views-row-5'));
		_placeUnder($('.skewed-four-col .views-row-3'), $('.skewed-four-col .views-row-6'));
		_placeUnder($('.skewed-four-col .views-row-6'), $('.skewed-four-col .views-row-7'));

		$('.tri-col-highlight').each(function () {
			var h = calacademy.Utils.getRowHeight($('.views-row-1', this)) + calacademy.Utils.getRowHeight($('.views-row-2', this)) + calacademy.Utils.getRowHeight($('.views-row-3', this));
			h -= $('.views-row-1 .views-field-field-image-primary', this).height();
			h += 75;

			$('.views-row-5', this).addClass('dynamic-css');
			$('.views-row-5', this).css('marginTop', '-' + h + 'px');
		});

		_clearClusterHeights();
	}

	var _registerBreakpoints = function () {
		enquire
		.register('screen and (min-width: ' + _breakpoints.smartphone + 'px) and (max-width: ' + (_breakpoints.tablet - 1) + 'px)', {
			match: function () {
				$('.dynamic-css').attr('style', '');
				_onBreakpoint('smartphone');
			}  
		})
		.register('screen and (min-width: ' + _breakpoints.tablet + 'px) and (max-width: ' + _breakpoints.desktop + 'px)', {
			match: function () {
				_layout();
				_onBreakpoint('tablet');
			}  
		})
		.register('screen and (min-width: ' + (_breakpoints.desktop + 1) + 'px)', {
			match: function () {
				_layout();
				_onBreakpoint('desktop');
			}  
		});
	}

	var _onBreakpoint = function (device) {
		_device = device;
		calacademy.Utils.log('break! (' + _device + ')');

		// remove all device classes
		var devices = ['smartphone', 'tablet', 'desktop'];

		var j = devices.length;

		while (j--) {
			$('html').removeClass(devices[j]);
		}

		// add the new one
		$('html').addClass(_device);
		
		_initDropDirectionSwitch();

		var i = _pages.length;
		
		while (i--) {
			var obj = _pages[i];
			
			if (typeof(obj.onBreakpoint) == 'function') {
				obj.onBreakpoint(device);
			}
		}	
	}

	var _onFontLoad = function () {
		// do the layout once on the first font load
		if (_isFontLoaded) return;
		_isFontLoaded = true;
		
		$('html').addClass('wf-active');

		// _layout gets fired
		_registerBreakpoints();
		
		// trigger page object callbacks
		var i = _pages.length;
		
		while (i--) {
			var obj = _pages[i];
			
			if (typeof(obj.onFontLoad) == 'function') {
				obj.onFontLoad();
			}
		}
	}

	var _onOrientationChange = function () {
		_layout();

		var i = _pages.length;
		
		while (i--) {
			var obj = _pages[i];
			
			if (typeof(obj.layout) == 'function') {
				obj.layout();
			}
		}	
	}

	var _removeBogusStyles = function () {
		$('.view p, .view p *').attr('style', '');
	}

	var _fixTabletNav = function () {
		if (!Modernizr.touch) return;
		
		// close the nav when touching anything other than itself
		$('*').on('touchstart', function (e) {
			var nav = $(e.target).parents('nav');
			
			if (nav.length == 0) {
				$('nav a').removeClass('tb-megamenu-clicked');
				$('nav .tb-megamenu-item').removeClass('open');
			}
		});

		// account for weird bfcaching (back-forward cache) behavior
		$(window).bind('pageshow', function (event) {
		    try {
			    if (event.originalEvent.persisted) {
			        $('body').trigger('touchstart');
			        _collapseSmartphoneNav();
			    }	
		    } catch (err) {}
		});
	}

	var _addMSIEClasses = function () {
		calacademy.Utils.log('isMSIE: ' + isMSIE);

		if (isMSIE) {
			$('html').addClass('ie');	
		} else {
			$('html').addClass('not-ie');	
		}
	}

	var _isValidSearchInput = function (str) {
		str = $.trim(str);

		if (str == '') return false;
		if (str == calacademy.Constants.defaultSearchText) return false;

		return true;
	}

	var _initSearchUI = function () {
		var btn = $('#block-search-form .form-submit');
		var form = $('#block-search-form form');
		var field = $('#block-search-form .form-type-textfield input');

		// set up default text
		field.attr('placeholder', calacademy.Constants.defaultSearchText);
		field.attr('length', calacademy.Constants.defaultSearchText.length);
		field.defaultValue();

		var myEvent = Modernizr.touch ? 'touchend' : 'click';

		btn.on(myEvent, function () {
			if ($('html').hasClass('search-open')) {
				// if open but invalid input, assume
				// user is toggling
				if (!_isValidSearchInput(field.val())) {
					$('html').removeClass('search-open');
					_setSmartphoneSubnavHeight();
				}
			} else {
				$('html').addClass('search-open');
				_setSmartphoneSubnavHeight();
				return false;
			}
		});

		$(window).on('scroll.nav-ui', function () {	
			// collapse search on homepage scroll
			if ($('html').hasClass('search-open')
				&& $('body').hasClass('page-homepage')) {
				field.val('');
				btn.trigger(myEvent);	
			}

			// collapse smartphone nav
			// _collapseSmartphoneNav();

			_setSmartphoneSubnavHeight();
		});

		if (Modernizr.touch) {
			$('*').on('touchmove', function (e) {
				var nav = $(e.target).parents('nav, #top-level-nav-wrapper');
				
				if (nav.length == 0) {
					$(window).trigger('scroll.nav-ui');
				}
			});	
		}

		form.submit(function () {
			if (!_isValidSearchInput(field.val())) {
				field.val('');
				return false;
			}	

			return true;
		});
	}

	var _setSmartphoneSubnavHeight = function () {
		// just set to auto since the nav isn't open
		if (!$('html').hasClass('smartphone-nav-open') || _device != 'smartphone') {
			$('.tb-megamenu-nav').css('height', 'auto');
			return;	
		} 

		// start with viewport height
		var h = window.innerHeight ? window.innerHeight : $(window).height();

		// subtract fixed item height
		h -= $('nav .btn-navbar').outerHeight();

		// account for page offset
		h -= $('nav').position().top - window.pageYOffset;

		$('.tb-megamenu-nav').css('height', h + 'px');	
	}

	var _switchDropDirection = function (up) {
		// skip this madness if not on homepage
		if (!$('body').hasClass('page-homepage')) return;

		if (up) {
			// dropup
			$('.tb-megamenu .dropdown-menu').each(function () {
				var top = -($(this).outerHeight());
				$(this).css('top', top + 'px');
			});
		} else {
			// dropdown (default)
			$('.tb-megamenu .dropdown-menu').attr('style', '');	
		}
	}

	var _initDropDirectionSwitch = function () {
		if (!$('body').hasClass('page-homepage')) return;
		
		// clear some stuff
		var myEvent = Modernizr.touch ? 'touchend.nav-drop' : 'mouseover.nav-drop';
		$('.level-0 > li').off(myEvent);

		_switchDropDirection(false);

		// do nothing if smartphone
		if (_device == 'smartphone') return;

		// add hover events
		$('.level-0 > li').on(myEvent, function () {
			// skip if no menu items
			if ($('.dropdown-menu', this).length == 0) return false;

			var currentPosition = $('nav').position().top;
			var prev = $('nav').prev();
			var initialNavPos = prev.position().top + prev.outerHeight();

			if (currentPosition > initialNavPos) {
				// nav is stuck, switch to dropdown
				_switchDropDirection(false);	
			} else {
				// nav not stuck, switch to dropup
				_switchDropDirection(true);

				// scroll to top if not already
				if ($(window).scrollTop() !== 0) {
					$('html, body').animate({
						scrollTop: 0
					}, 390);	
				}
			}
		});
	}

	var _collapseSmartphoneNav = function () {
		if ($('html').hasClass('smartphone-nav-open')) {
			// this should really use touchend, but tb megamenu js blows
			$('.tb-megamenu button').click();
			$('html').removeClass('smartphone-nav-open');	
		}	
	}

	var _initNav = function () {
		if (!Modernizr.csspositionsticky) {
			// no native support for sticky positioning, use JS
			$('nav').scrollToFixed();

			// also fix top level nav on homepage
			if ($('body').hasClass('page-homepage')) {
				$('#top-level-nav-wrapper').scrollToFixed();
			}
		}

		// toggle a class on the responsive nav hamburger on click
		// var myEvent = Modernizr.touch ? 'touchend' : 'click';
		
		// @note
		// this should really be touchend for touch devices,
		// but megamenu js blows
		var myEvent = 'click';

		$('.tb-megamenu button').on(myEvent, function (e) {
		    if ($('html').hasClass('smartphone-nav-open')) {
		    	$('html').removeClass('smartphone-nav-open');
		    } else {
		    	$('html').addClass('smartphone-nav-open');
		    }

		    _setSmartphoneSubnavHeight();
		});

		// collapse nav on window resize if open
		$(window).on('resize.smartphone-nav', function (e) {
			// _collapseSmartphoneNav();
			_setSmartphoneSubnavHeight();		
		});
	}

	this.initialize = function () {
		calacademy.Utils.log('CalAcademy.initialize');

		_addMSIEClasses();
		_removeBogusStyles();
		_fixTabletNav();
		_initNav();
		_initSearchUI();

		// remove whitespace in view DOM to account
		// for Android inline-block margin issue
		// @see http://davidwalsh.name/remove-whitespace-inline-block
		$('.view-content').cleanWhitespace();

		// make stuff touchy
		if (Modernizr.touch) {
			document.addEventListener('touchstart', function () {}, true);
		}

		// listen for web font load
		$.webFontListener({
			onFontLoad: function () {
				calacademy.Utils.log('onFontLoad');
				_onFontLoad();
			},
			onFontLoadError: function () {
				calacademy.Utils.log('onFontLoadError');
				_onFontLoad();
			}
		});

		// orientation change listener
		$(window).on('orientationchange', function () {
			clearTimeout(_orientationChangeTimeout);
			_orientationChangeTimeout = setTimeout(_onOrientationChange, 100);
		});
	}

	this.initialize();
}
