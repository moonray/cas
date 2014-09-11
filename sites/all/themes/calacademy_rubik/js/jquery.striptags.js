/**
 * jquery.striptags.js
 * @author Greg Rotter
 *
 */

;(function($){
	$.fn.stripTags = function (whitelist) {
	    // remove tags not in our whitelist
	    $('*', this).not(whitelist).each(function () {
			var content = $(this).contents();
			$(this).replaceWith(content);
		});

	    // remove attributes
		$('*', this).each(function () {
			var attributes = $.map(this.attributes, function (item) {
				return item.name;
			});

			var inst = $(this);

			$.each(attributes, function (i, item) {
		    	if (item != 'href') {
		    		inst.removeAttr(item);
		    	}
		    });
		});

	    return this;
	}
})(jQuery);
