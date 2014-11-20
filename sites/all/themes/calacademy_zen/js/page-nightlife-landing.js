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
		//calacademy.Utils.addSecondaryBg('secondary-bg-jelly', $('.pane-nightlife-upcoming-next-upcoming-nl .views-row-2'));
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
