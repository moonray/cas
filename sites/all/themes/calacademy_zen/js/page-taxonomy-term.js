var PageTaxonomyTerm = function () {
	var $ = jQuery;
	var _device;

	this.onBreakpoint = function (device) {
		_device = device;
	}

	var _addSidebarFrog = function () {
		$(window).load(function () {
			setTimeout(function () {
				var rail = $('.right-rail');
				
				// do nothing since the right rail doesn't exist
				if (rail.length == 0) return;

				// apply secondary bg
				$('body').addClass('secondary-bg-frog');

				$(window).on('resize.secondary-bg', function () {
					var railX = rail.offset().left - 150;
					var railY = rail.offset().top;
					var railHeight = rail.height() - 25;

					if (_device.indexOf('tablet') >= 0) {
						railHeight += 75;
						railX += 50;
					}

					// @note
					// background-position-x and background-position-y don't work in FF
					$('#page').css('background-position', Math.round(railX) + 'px ' + Math.round(railY + railHeight) + 'px');
				});

				$(window).trigger('resize.secondary-bg');
			}, 500);
		});
	}

	this.initialize = function () {
		calacademy.Utils.log('PageTaxonomyTerm.initialize');
		
		if ($('body').hasClass('section-events')) {
			_addSidebarFrog();	
		}
	}

	this.initialize();
}
