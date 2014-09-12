/**
 * jquery.sanitize.js
 * @author Greg Rotter
 *
 */

;(function($){
	$.fn.stripTags = function (whitelist) {
	    $('*', this).not(whitelist).each(function () {
			var content = $(this).contents();
			$(this).replaceWith(content);
		});

	    return this;
	}

	$.fn.stripAttributes = function () {
		$('*', this).each(function () {
			var inst = $(this);
			var tagName = $(this).prop('tagName').toLowerCase();

			var attributes = $.map(this.attributes, function (item) {
				return item.name;
			});

			$.each(attributes, function (i, item) {
		    	// allow href, name and id for a tags
		    	if (tagName == 'a') {
		    		if (item == 'href' || item == 'id' || item == 'name') {
		    			return;
		    		}
		    	}

		    	inst.removeAttr(item);
		    });
		});

	    return this;
	}
})(jQuery);
