var PageNightlifeLanding = function () {
	var $ = jQuery;
	var _device;

	this.onBreakpoint = function (device) {
		_device = device;
		this.layout();
	}

	this.layout = function () {
		calacademy.Utils.log('PageNightlifeLanding.layout');
		calacademy.Utils.clearClusterHeights($('.page-nightlife-landing #upcoming'));	
	}

	var _addDynamicJelly = function () {
		var rail = $('.right-rail');
				
		// do nothing since the right rail doesn't exist
		if (rail.length == 0) return;

		// apply secondary bg
		$('body').addClass('secondary-bg-jelly');

		$(window).on('resize.secondary-bg-jelly', function () {
			var x = Math.round($('#page').outerWidth() / 2) - 100;
			
			var y;
			var anchor = $('.pane-nightlife-upcoming-next-upcoming-nl .views-row-2');
			
			if (anchor.length != 1) {
				y = rail.offset().top;	
			} else {
				y = anchor.offset().top + anchor.outerHeight();
			}
			
			y -= $('#page').offset().top;
			y -= 200;

			if (_device.indexOf('tablet') >= 0) {
				x -= 75;
			}

			// @note
			// background-position-x and background-position-y don't work in FF
			$('#page').css('background-position', x + 'px ' + y + 'px');
		});

		$(window).trigger('resize.secondary-bg-jelly');	
	}

	this.initialize = function () {
		calacademy.Utils.log('PageNightlifeLanding.initialize');
		
		$(window).load(function () {
			setTimeout(_addDynamicJelly, 500);
		});

		// sometimes load event doesn't fire
		setInterval(_addDynamicJelly, 2000);
	}

	this.initialize();
}
