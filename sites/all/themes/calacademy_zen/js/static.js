if (typeof(jQuery) != 'undefined') {
	jQuery.fn.cleanWhitespace = function () {
		textNodes = this.contents().filter(
		  function() { return (this.nodeType == 3 && !/\S/.test(this.nodeValue)); })
		  .remove();
		return this;
	};

	jQuery.fn.touchFix = function (options) {
	    if (!Modernizr.touch) return this;

	    var $ = jQuery;
	    var $parent = $(this);

	    $(document)
	    .on('focus', options.inputElements, function (e) {
	        $parent.addClass(options.addClass);
	    })
	    .on('blur', options.inputElements, function (e) {
	        $parent.removeClass(options.addClass);

	        // Fix for some scenarios where you need to start scrolling
	        // setTimeout(function() {
	        //     $(document).scrollTop($(document).scrollTop());
	        // }, 1);
	    });

	    return this;
	};
}

var calacademy = {
	Statics: {
		pageObjects: []
	},
	Constants: {
		defaultSearchText: 'Search the Academy',
		breakpoints: {
			smartphone: 320,
			tablet: 768,
			desktop: 1000
		},
		popUpProfiles: {
			chat: {
				width: 430,
				height: 450,
				resizable: 0,
				center: 1,
				createnew: 0
			}
		}
	},
	Utils: {
		log: function (obj) {
			if (typeof(console) == 'undefined') {
				if (typeof(dump) == 'function') {
					dump(obj);
				} else {
					// alert(obj);
				}
			} else {
				console.log(obj);
			}
		},
		getRowHeight: function (row) {
			// this only works for "portrait" style views
			var $ = jQuery;
			var h = parseInt(row.css('marginTop')) + parseInt(row.css('marginBottom'));

			$('.views-field', row).each(function () {
				// don't calculate hidden fields
				if (!$(this).is(':visible')) return;

				// use width for primary image cuz sometimes height is miscalculated or absent
				if ($(this).hasClass('views-field-field-image-primary')
					|| $(this).hasClass('views-field-field-hero-region')
					|| $(this).hasClass('views-field-field-slideshow-frame-bg-image')) {
					h += $(this).width() + parseInt($(this).css('marginBottom')) + parseInt($(this).css('marginTop'));
				} else {
					h += $(this).outerHeight(true);
				}	
			});

			return h;	
		},
		getClusterHeight: function (cluster) {
			var $ = jQuery;

			// iterate all rows and record bottom positions
			var bottoms = [];

			$('.views-row', cluster).each(function () {
				var rowTop = $(this).position().top;
				bottoms.push(rowTop + calacademy.Utils.getRowHeight($(this)));
			});

			// return the bottom-most value
			return Math.max.apply(Math, bottoms);
		},
		clearClusterHeights: function (viewElement) {
			var $ = jQuery;
			
			viewElement.each(function () {
				$('.view', this).addClass('dynamic-css');
				$('.view', this).css('height', calacademy.Utils.getClusterHeight($(this)) + 'px');
			});
		},
		removeEmptyElements: function (selector, container) {
			var $ = jQuery;
			
			// remove empty a tags
			$(selector, container).each(function () {
				if ($('img, iframe', this).length > 0) return;

				if ($.trim($(this).text()) == '') {
					$(this).remove();
				}
			});
		},
		fixHeroField: function (container, link) {
			var $ = jQuery;

			// skip if irrelevant
			if (container.length == 0) return;
			if (container.hasClass('js-hero-dom-processed')) return;

			// remove empty a tags
			calacademy.Utils.removeEmptyElements('a', this);
			
			var img = $('img', container);
		
			if (img.length == 0) {
				// no image, remove
				container.remove();
			} else {
				if (link.length == 0) {
					// no link, just use img
					container.html(img);
				} else {
					// add link
					var newA = $('<a />');
					newA.attr('href', link.attr('href'));

					// add video class to link if necessary
					if ($('.video', container).length == 1) {
						newA.addClass('video');
					}

					newA.html(img);
					container.html(newA);
				}

				container.addClass('js-hero-dom-processed');
			}	
		},
		isMobile: {
	        Android: function () {
	            return navigator.userAgent.match(/Android/i) ? true : false;
	        },
	        BlackBerry: function () {
	            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	        },
	        iOS: function () {
	            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	        },
	        Opera: function () {
	            return navigator.userAgent.match(/Opera Mini/i) ? true : false;
	        },
	        Windows: function () {
	            return navigator.userAgent.match(/IEMobile/i) ? true : false;
	        }
	    }
	}
};
