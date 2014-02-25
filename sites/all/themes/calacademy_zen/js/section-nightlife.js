var SectionNightLife = function () {
	var $ = jQuery;
	var _device;

	this.onBreakpoint = function (device) {
		_device = device;
		this.layout();
	}

	this.layout = function () {
		calacademy.Utils.log('SectionNightLife.layout');
		calacademy.Utils.clearClusterHeights($('.page-nightlife-landing #upcoming'));	
	}

	var _addDynamicJelly = function () {
		$(window).load(function () {
			setTimeout(function () {
				var rail = $('.right-rail');
				
				// do nothing since the right rail doesn't exist
				if (rail.length == 0) return;

				// apply secondary bg
				$('body').addClass('secondary-bg-jelly');

				$(window).on('resize.secondary-bg-jelly', function () {
					var x = Math.round($('#page').outerWidth() / 2) - 100;
					var y = 600;

					if (_device.indexOf('tablet') >= 0) {
						x -= 75;
						y -= 50;
					}

					// @note
					// background-position-x and background-position-y don't work in FF
					$('#page').css('background-position', x + 'px ' + y + 'px');
				});

				$(window).trigger('resize.secondary-bg-jelly');
			}, 500);
		});
	}

	this.initialize = function () {
		calacademy.Utils.log('SectionNightLife.initialize');
		_addDynamicJelly();
	}

	this.initialize();
}
