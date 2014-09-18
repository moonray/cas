/**
 * jquery.sanitize.js
 *
 * @author Greg Rotter
 * @todo Add tests
 */
;(function($){
	/**
	 * Strip all tags except those specified in a whitelist
	 *
	 * @param {string} whitelist A jQuery selector of tags not to be stripped
	 */
	$.fn.stripTags = function (whitelist) {
	    $('*', this).not(whitelist).each(function () {
			var content = $(this).contents();
			$(this).replaceWith(content);
		});

	    return this;
	}

	/**
	 * Strip all attributes except those specified in a whitelist
	 *
	 * @param {array} whitelist An array of objects that define whitelisted
	 * attributes and what tag types they apply to
	 * @example
	 * // strip all attributes except for href, name and id on anchor tags.
	 * $('#container').stripAttributes([{tag: 'a', allowedAttributes: ['href', 'name', 'id']}]);
	 */
	$.fn.stripAttributes = function (whitelist) {
		$('*', this).each(function () {
			var inst = $(this);
			var tagName = $(this).prop('tagName').toLowerCase();

			var attributes = $.map(this.attributes, function (item) {
				return item.name;
			});

			// strip everything by default
			var _strip = function (i, item) {
				inst.removeAttr(item);
			}

			// we have a whitelist defined
			if (typeof(whitelist) != 'undefined') {
				$.each(whitelist, function (index, value) {
					if (value.tag == tagName) {
						// redefine strip routine to apply to selected tag
						_strip = function (i, item) {
							// if found attribute is NOT contained in whitelist, remove it
							if ($.inArray(item, value.allowedAttributes) == -1) {
								inst.removeAttr(item);
							}
						}

						return false;
					}
				});
			}

			$.each(attributes, _strip);
		});

	    return this;
	}
})(jQuery);
