(function ($, Drupal, window, document, undefined) {
	Drupal.behaviors.calacademy_zen = {   
		'attach': function(context, settings) {
			if (!$('body').hasClass('page-field-trips-landing')) return;

			// change the -Any- option on exposed forms
			// to match the associated label
			$('.view-field-trips label').each(function () {
				var str = $.trim($(this).text());
				var select = $('#' + $(this).attr('for'));
				$('option', select).first().text(str);	
			});
		}
	}

})(jQuery, Drupal, this, this.document);

var PageFieldTripsLanding = function () {
	var $ = jQuery;

	this.initialize = function () {
		calacademy.Utils.log('PageFieldTripsLanding.initialize');
	}

	this.initialize();
}
