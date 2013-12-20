(function ($, Drupal, window, document, undefined) {
	var jsPath = '/sites/all/themes/calacademy_zen/js/';
	
	// load enquire and instantiate our main controller class
	// (polyfill IE9 and earlier)
	Modernizr.load([
		{
	        test: window.matchMedia,
	        nope: jsPath + 'media.match.min.js',
	        both: [jsPath + 'enquire.min.js', jsPath + 'calacademy.js'],
	        complete: function () {
				$(document).ready(function () {
					var pages = calacademy.Statics.pageObjects;

					if ($('body').hasClass('page-homepage')) {
						pages.push(new PageHomepage());
					}
					if ($('body').hasClass('page-taxonomy-term')) {
						pages.push(new PageTaxonomyTerm());
					}

					var foo = new CalAcademy();
				});		
	        }
	    } 
	]);

})(jQuery, Drupal, this, this.document);
