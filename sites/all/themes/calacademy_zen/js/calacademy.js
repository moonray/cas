var CalAcademy = function () {
	var $ = jQuery;
	var _isFontLoaded = false;
	var _device;
	var _orientationChangeTimeout;
	var _pages = calacademy.Statics.pageObjects;
	var _breakpoints = calacademy.Constants.breakpoints;

	var _placeUnder = function (anchor, target) {
		if (anchor.length === 0 || target.length === 0) return;

		target.addClass('dynamic-css');
		target.css('position', 'absolute');
		target.css('top', anchor.position().top + calacademy.Utils.getRowHeight(anchor) + 'px');
		target.css('left', anchor.position().left + 'px');
	}

	var _clearClusterHeights = function () {
		calacademy.Utils.clearClusterHeights($('.skewed-tri-grid, .tri-col-highlight, .skewed-four-col'));
	}

	var _clusterLayout = function () {
		// put things in special places
		$('.skewed-tri-grid').each(function () {
			_placeUnder($('.views-row-1', this), $('.views-row-4', this));
		});

		$('.skewed-four-col').each(function () {
			_placeUnder($('.views-row-2', this), $('.views-row-5', this));
			_placeUnder($('.views-row-3', this), $('.views-row-6', this));
			_placeUnder($('.views-row-6', this), $('.views-row-7', this));
		});

		$('.tri-col-highlight').each(function () {
			var h = calacademy.Utils.getRowHeight($('.views-row-1', this)) + calacademy.Utils.getRowHeight($('.views-row-2', this)) + calacademy.Utils.getRowHeight($('.views-row-3', this));
			h -= $('.views-row-1 .views-field-field-hero-region, .views-row-1 .views-field-field-image-primary, .views-row-1 .views-field-field-slideshow-frame-bg-image', this).height();
			h += 75;

			$('.views-row-5', this).addClass('dynamic-css');
			$('.views-row-5', this).css('marginTop', '-' + h + 'px');
		});

		_clearClusterHeights();
	}

	var _getBgDimensions = function (containerHeight) {
		// var maxBgHeight = (_device == 'smartphone') ? 450 : 630;
		var maxBgHeight = containerHeight;
		var bgImgWidth = 1920;
		var bgImgHeight = 970;

		return {
			width: bgImgWidth,
			height: bgImgHeight,
			minWidth: Math.round((maxBgHeight / bgImgHeight) * bgImgWidth),
			maxWidth: Math.round(.7 * bgImgWidth)
		}
	}

	var _setSlideshowLayout = function () {
		$(window).on('resize.slideshow-layout', function () {
			$('.slideshow-hero .slides > li').each(function () {
				var img = $('.views-field-field-slideshow-frame-bg-image, .field-name-field-slideshow-frame-bg-image', this);
				var caption = $('.views-field-field-slideshow-frame-title, .field-name-field-slideshow-frame-title', this);

				if ($.trim(caption.text()) == '') {
					$('.field-content, .field-item', caption).html('&nbsp;');
				}

				caption.css('top', (-1 * caption.outerHeight()) + 'px');
				$(this).css('height', img.outerHeight() + 'px');
			});

			$('.slideshow-midfeature').each(function () {
				var w = $('.slides li', this).outerWidth();

				$('.slides li', this).css('height', 'auto');
				var slideHeights = [];

				$('.slides li', this).each(function () {
					slideHeights.push($(this).outerHeight());

					// background positioning per field
					var per = .5;
					var el = $('.views-field-field-horizontal-offset-percenta, .field-name-field-horizontal-offset-percenta', this);

					if (el.length == 1 && !isNaN(el.text())) {
						per = parseInt(el.text()) / 100;
					}

					$(this).css('background-position', Math.round(per * w) + 'px' + ' 0px');
				});

				// heighten slides to tallest
				$('.slides li', this).css('height', Math.max.apply(Math, slideHeights) + 'px');

				var height = $(this).outerHeight();

				// force next element below absolutely positioned slideshow
				if ($(this).parent().css('position') == 'absolute') {
					if ($(this).parent().next('.midfeature-shim').length == 0) {
						// insert a shim if we haven't already
						var shim = $('<div>.</div>');
						shim.css('background-color', '#ffffff');
						shim.addClass('midfeature-shim');

						$(this).parent().after(shim);
					}

					$(this).parent().next('.midfeature-shim').height(height);
				}

				// background sizing
				var bgW = Math.round(.7 * w);
				var dimensions = _getBgDimensions(height);

				if (bgW < dimensions.minWidth) bgW = dimensions.minWidth;
				if (bgW > dimensions.maxWidth) bgW = dimensions.maxWidth;

				var bgH = Math.round((bgW / dimensions.width) * dimensions.height);
				$('.slides li').css('background-size', bgW + 'px ' + bgH + 'px');
			});
		});

		$(window).trigger('resize.slideshow-layout');

		setTimeout(function () {
			$(window).trigger('resize.slideshow-layout');
		}, 100);
	}

	var _layout = function () {
		_setSmartphoneSubnavHeight();
		_clusterLayout();
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
		calacademy.Statics.device = device;
		calacademy.Utils.log('break! (' + _device + ')');

		// remove all device classes
		$.each(['smartphone', 'tablet', 'desktop'], function (i, val) {
			$('html').removeClass(val);
		});

		// add the new one
		$('html').addClass(_device);

		_setSlideshowLayout();
		_initDropDirectionSwitch();

		$.each(_pages, function (i, obj) {
			if (typeof(obj.onBreakpoint) == 'function') {
				obj.onBreakpoint(device);
			}
		});
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

	var _initDefaultText = function () {
		var field = $('.block-search-form #search-field, #search-field-404');
		var label = field.siblings('label');

		if (label.length > 0) {
			calacademy.Constants.defaultSearchText = $.trim(label.eq(0).text());
		}

		field.attr('placeholder', calacademy.Constants.defaultSearchText);
		field.attr('length', calacademy.Constants.defaultSearchText.length);
		field.defaultValue();
	}

	var _initSearchUI = function () {
		var btn = $('.block-search-form .form-submit');
		var form = $('.block-search-form form');
		var field = $('.block-search-form .form-type-textfield input');
		var myEvent = Modernizr.touch ? 'touchend' : 'click';

		field.val('');

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
			// collapse search on homepage scroll if search doesn't have focus
			if ($('html').hasClass('search-open')
				&& $('body').hasClass('page-homepage')
				&& !$('.block-search-form .form-type-textfield input').is(':focus')) {
				field.val('');
				btn.trigger(myEvent);
			}

			// collapse smartphone nav
			// _collapseSmartphoneNav();

			_setSmartphoneSubnavHeight();
		});

		if (Modernizr.touch) {
			$('body').on('touchmove', '*', function (e) {
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
			$('nav:visible .tb-megamenu-nav').css('height', 'auto');
			$('nav:visible .level-0').parent().css('height', '0px');
			return;
		}

		// start with viewport height
		var h = window.innerHeight ? window.innerHeight : $(window).height();

		// subtract fixed item height
		h -= $('nav:visible .btn-navbar').outerHeight();

		// account for page offset
		h -= $('nav:visible').position().top - window.pageYOffset;

		$('nav:visible .tb-megamenu-nav').css('height', h + 'px');
		$('nav:visible .level-0').parent().css('height', 'auto');
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
		$('.level-0 > li > a').off(myEvent);

		_switchDropDirection(false);

		// do nothing if smartphone
		if (_device == 'smartphone') return;

		// add hover events
		$('.level-0 > li > a').on(myEvent, function () {
			// do nothing if smartphone
			if (_device == 'smartphone') return false;

			// skip if no menu items
			if ($('.dropdown-menu', $(this).parent()).length == 0) return false;

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
				if ($(window).scrollTop() !== 0 && !_isNavOpen()) {
					$('html, body').animate({
						scrollTop: 0
					}, 390);
				}
			}
		});
	}

	var _collapseSmartphoneNav = function () {
		if ($('html').hasClass('smartphone-nav-open')) {
			var myEvent = Modernizr.touch ? 'touchend' : 'click';
			$('.tb-megamenu button').trigger(myEvent);

			$('html').removeClass('smartphone-nav-open');
		}
	}

	var _initNav = function () {
		if (!Modernizr.csspositionsticky) {
			// no native support for sticky positioning, use JS
			$('nav:visible').scrollToFixed();

			// also fix top level nav on homepage
			if ($('body').hasClass('page-homepage')) {
				$('#top-level-nav-wrapper').scrollToFixed();
			}
		}

		$('nav .suppress-link > a').attr('href', '#');

		// toggle a class on the responsive nav hamburger on click
		var myEvent = Modernizr.touch ? 'touchend' : 'click';

		$('.tb-megamenu-button').on(myEvent, function (e) {
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

		_fixTouchNav();
		_addNavInteraction();
	}

	var _addNavInteraction = function () {
		if ($('#main-nav .level-0 > li:last-child').hasClass('active')) {
			$('#main-nav .level-0').addClass('last-over');
		}

		if (Modernizr.touch) {
			$('#main-nav .level-0 > li > a').on('touchend touchstart click', function (e) {
				// doubletap required for top level links except for
				// those without a dropdown or if smartphone
				if ($(this).parent().hasClass('suppress-link') || ($(this).siblings().length > 0 && _device != 'smartphone')) {
					e.preventDefault();
					return false;
				}
			});

			$('#main-nav .level-0 > li > a').hammer().on('doubletap', function (e) {
				if (!$(this).parent().hasClass('suppress-link')) {
					window.location.href = $(this).attr('href');
				}

				e.preventDefault();
			});

			$('#main-nav .level-0 > li').hammer().on('tap', function (e) {
				_removeMenuBorder();

				if ($(this).is(':last-child')) {
					$(this).parent().addClass('last-over');
				}

				$('#main-nav .level-0 > li').removeClass('open');
				$(this).addClass('open');

				e.preventDefault();
			});
		} else {
			$('#main-nav .level-0 > li').on('mouseover', function () {
				if ($(this).is(':last-child')) {
					$(this).parent().addClass('last-over');
				}

				$(this).addClass('open');
			});

			$('#main-nav .level-0 > li').on('mouseout', function () {
				_removeMenuBorder();
				$(this).removeClass('open');
			});

			$('#main-nav .level-0 > li.suppress-link > a').on('click', function (e) {
				return false;
			});
		}
	}

	var _removeMenuBorder = function () {
		if ($('#main-nav .level-0 > li:last-child').hasClass('active')) return;
		$('#main-nav .level-0').removeClass('last-over');
	}

	var _isNavOpen = function () {
		return $('nav .tb-megamenu-item').hasClass('open');
	}

	var _fixTouchNav = function () {
		if (!Modernizr.touch) return;

		// close the nav when touching anything other than itself
		$('body').on('touchstart', '*', function (e) {
			var nav = $(e.target).parents('nav');

			if (nav.length == 0) {
				$('nav a').removeClass('tb-megamenu-clicked');
				$('nav .tb-megamenu-item').removeClass('open');
				_removeMenuBorder();
			}
		});

		// account for weird bfcaching (back-forward cache) behavior
		$(window).bind('pageshow', function (event) {
		    try {
			    if (event.originalEvent.persisted) {
			        $('body').trigger('touchstart');
			        $('.block-search-form .form-type-textfield input').val('');
			        _collapseSmartphoneNav();
			    }
		    } catch (err) {}
		});
	}

	var _initSlideshow = function () {
		$('.slideshow-midfeature .flexslider .slides li').each(function () {
			// set the highlight color
			var highlight = $('.container > .views-field-field-highlight-color, .container > .field-name-field-highlight-color', this);

			if (highlight.length == 1) {
				var colorTerm = $.trim(highlight.text());
				$(this).addClass('highlight-' + colorTerm.toLowerCase());
			}

			// set the background color
			var colorData = $('.container > .views-field-field-bg-color, .container > .field-name-field-bg-color', this);

			if (colorData.length == 1) {
				var hex = $.trim(colorData.text());
				$(this).css('background-color', hex);
			}

			// bg img gets set onload
		});
	}

	var _initDatepicker = function () {
		// close desktop datepicker on scroll, nav hover and outside touch
		$(window).on('scroll.datepicker-collapse', function () {
			if (_device != 'smartphone') {
				try {
					$('.date-popup-init').datepicker('hide');
				} catch (e) {}
			}
		});

		var myEvent = Modernizr.touch ? 'touchend.datepicker-collapse' : 'mouseover.datepicker-collapse';

		$('.level-0 > li > a').on(myEvent, function () {
			$(window).trigger('scroll.datepicker-collapse');
		});

		// iPad fix, clicking outside the datepicker doesn't collapse
		if (Modernizr.touch) {
			$('body').on('touchstart', '*', function (e) {
				var cal = $(e.target).parents('.ui-datepicker');

				if (cal.length == 0) {
					$(window).trigger('scroll.datepicker-collapse');
				}
			});
		}
	}

	var _initWebforms = function () {
		// fix css nav bug on ios focus
		$('html').touchFix({
			inputElements: '.webform-client-form input, .webform-client-form textarea, .webform-client-form select',
        	addClass: 'fixfixed'
		});

		// if showing a form response, add a class for styling
		if ($('.messages--status').length > 0) {
			$('body').addClass('webform-response');
		}

		// default values
		$(".webform-client-form input[type='text'], .webform-client-form input[type='email'], .webform-client-form textarea").each(function () {
			$(this).attr('placeholder', $(this).val());
			$(this).val('');
			$(this).defaultValue();
		});

		// redefine some validator stuff with additional functionality
		$('.webform-client-form').each(function () {
			if (typeof($(this).validate) != 'function') return;

			var settings = $(this).validate().settings;
			var highlight = settings.highlight;
			var unhighlight = settings.unhighlight;

			settings.highlight = function (element, errorClass, validClass) {
				var parent = $(element).parents('.form-item').first();
				parent.addClass('calacademy-' + errorClass).removeClass('calacademy-' + validClass);

				highlight(element, errorClass, validClass);
			}

			settings.unhighlight = function (element, errorClass, validClass) {
				var parent = $(element).parents('.form-item').first();
				parent.removeClass('calacademy-' + errorClass).addClass('calacademy-' + validClass);

				unhighlight(element, errorClass, validClass);
			}
		});

		// parse checkbox options and add some markup for styling
		$('.webform-component-checkboxes label.option').each(function () {
			var str = $(this).text();

			if (str.indexOf(': ') >= 0) {
				str = str.replace(': ', '<p>');
				str += '</p>';

				$(this).html(str);
			}
		});
	}

	var _initPopups = function () {
		if (typeof($.fn.popupwindow) != 'function') return;
		$('.popup-trigger').popupwindow(calacademy.Constants.popUpProfiles);
	}

	var _initFAQ = function () {
		var e = Modernizr.touch ? 'touchend' : 'click';

		$('.faq > .field > .field-items > .field-item .field-name-field-question').on(e, function () {
			$(this).parent().toggleClass('open');
		});
	}

	var _addSectionClasses = function () {
		if ($('.nav-educators').length > 0) {
			$('body').addClass('section-educators');
		}
	}

	var _addChatLinkClasses = function () {
		var selector = 'a[href="/chat"], a[href="http://www.calacademy.org/chat"], a[href="https://www.calacademy.org/chat"], ';
		selector += 'a[href="/chat/"], a[href="http://www.calacademy.org/chat/"], a[href="https://www.calacademy.org/chat/"]';

		// add popup functionality
		$(selector).attr('rel', 'chat');
		$(selector).addClass('popup-trigger');

		// hide when call center not open
		var standaloneChatLinks = $(selector, '.field-type-link-field').addClass('call-center-link');
	}

	var _clearEmptyRightRail = function () {
		if ($('.right-rail #ibss-downloadables .view-content').length == 0) return;

		var str = $.trim($('.right-rail #ibss-downloadables .view-content').text());
		if (str != '') return;

		// remove the panel
		$('.right-rail #ibss-downloadables').remove();

		// some compensatory styles
		$('.right-rail article').eq(0).css({
			'border': 0,
			'padding-top': 0
		});
	}

	this.initialize = function () {
		calacademy.Utils.log('CalAcademy.initialize');

		// add / remove classes for AJAX events
		$(document).ajaxStart(function (e) {
			$('html').addClass('ajax-loading');
		});

		$(document).ajaxComplete(function (e) {
			$('html').removeClass('ajax-loading');
		});

		var foo = new HackDOM();

		_addMSIEClasses();
		_initNav();
		_initSearchUI();
		_initSlideshow();
		_initDatepicker();
		_initWebforms();
		_addChatLinkClasses();
		_initPopups();
		_initFAQ();
		_initDefaultText();
		_addSectionClasses();
		_clearEmptyRightRail();

		// make stuff touchy
		if (Modernizr.touch) {
			document.addEventListener('touchstart', function () {}, true);
		}

		// listen for web font load
		$.webFontListener({
			onFontLoad: function () {
				calacademy.Utils.log('onFontLoad');
				$('html').removeClass('wf-error');
				_onFontLoad();
			},
			onFontLoadError: function () {
				calacademy.Utils.log('onFontLoadError');
				$('html').addClass('wf-error');
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
