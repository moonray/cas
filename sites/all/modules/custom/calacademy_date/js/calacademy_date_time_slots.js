(function ($) {

	Drupal.behaviors.calacademy_date_time_slots = {
		attach: function (context, settings) {
			$("#edit-field-time-slots input.text-full").timePicker({
				step: 5
			});
		}
	}; 

})(jQuery);
