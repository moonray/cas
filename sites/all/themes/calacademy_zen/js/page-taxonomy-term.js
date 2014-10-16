var PageTaxonomyTerm = function () {
	var $ = jQuery;
	var _device;

	this.onBreakpoint = function (device) {
		_device = device;
	}

	var _addSidebarBg = function (offset, tabletOffset, yOffset, yOffsetTablet) {
		setTimeout(function () {
			var rail = $('.right-rail');

			// do nothing since the right rail doesn't exist
			if (rail.length == 0) return;
			rail = rail.eq(0);

			$(window).on('resize.secondary-bg', function () {
				var railX = rail.offset().left - offset;
				var railY = rail.offset().top;
				var railHeight = rail.height() - yOffset;

				if ($('html').hasClass('tablet')) {
					railHeight += yOffsetTablet;
					railX += tabletOffset;
				}

				// @note
				// background-position-x and background-position-y don't work in FF
				$('#page').css('background-position', Math.round(railX) + 'px ' + Math.round(railY + railHeight) + 'px');
			});

			$(window).trigger('resize.secondary-bg');
			$('body').addClass('secondary-bg');
		}, 500)
	}

	this.initialize = function () {
		calacademy.Utils.log('PageTaxonomyTerm.initialize');

		if ($('body').hasClass('section-events')) {
			_addSidebarBg(150, 50, 25, 75);
		}
		if ($('body').hasClass('section-audience')) {
			var yOffset = 25;
			var yOffsetTablet = 75;

			if ($('body').hasClass('page-taxonomy-term-545')) {
				yOffset = 250;
				yOffsetTablet = -120;
			}
			if ($('body').hasClass('page-taxonomy-term-547')) {
				yOffset = 100;
				yOffsetTablet = -60;
			}

			_addSidebarBg(0, -20, yOffset, yOffsetTablet);
		}
	}

	this.initialize();
}
