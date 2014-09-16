(function ($, Drupal, window, document, undefined) {
	var jsPath = '/sites/all/themes/calacademy_zen/js/';

	Modernizr.load([
		{
			test: Modernizr.csspositionsticky,
			nope: jsPath + 'jquery-scrolltofixed-min.js'
		},
		{
	        test: window.matchMedia,
	        nope: jsPath + 'media.match.min.js',
	        both: [
	        	jsPath + 'enquire.min.js',
	        	jsPath + 'jquery.popupwindow.js',
	        	jsPath + 'webfontlistener.js',
	        	jsPath + 'hackdom.js',
	        	jsPath + 'jquery.mlens-1.4.js',
	        	jsPath + 'moment.min.js',
	        	jsPath + 'calacademy.js'
	        ],
	        complete: function () {
				$(document).ready(function () {
					var pages = calacademy.Statics.pageObjects;

					if ($('body').hasClass('page-homepage')) {
						pages.push(new PageHomepage());
					}
					if ($('body').hasClass('page-taxonomy-term')) {
						pages.push(new PageTaxonomyTerm());
					}
					if ($('body').hasClass('page-daily-calendar')) {
						pages.push(new PageDailyCalendar());
					}
					if ($('body').hasClass('page-nightlife-landing')) {
						pages.push(new PageNightlifeLanding());
					}

					var foo = new CalAcademy();
				});
	        }
	    }
	]);
})(jQuery, Drupal, this, this.document);
