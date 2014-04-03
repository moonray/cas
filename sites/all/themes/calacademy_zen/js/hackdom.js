var HackDOM = function () {
	var $ = jQuery;

	var _removeCruft = function () {
		// remove bogus styles
		$('p, p *').attr('style', '');

		// remove empty p tags
		$('p').each(function () {
			if ($.trim($(this).text()) == '') {
				$(this).remove();
			}
		});
	}

	var _getViewsFieldClass = function (classList) {
		var prefix = 'field-name';
		var myClass;

		$.each(classList, function (index, item) {
			if (item.indexOf(prefix) === 0) {
				myClass = item.replace(prefix, 'views-field');
			}
		});

		return myClass;
	} 

	var _addViewsFieldClasses = function (el) {
		$('.field', el).each(function () {
			var classList = $(this).attr('class').split(/\s+/);
			
			$(this).addClass(_getViewsFieldClass(classList));
			$(this).addClass('views-field');	
		});
	}

	var _getPseudoRows = function (obj, startIndex, myMax) {
		var i = (typeof(startIndex) == 'undefined') ? 0 : startIndex;
		var max = (typeof(myMax) == 'undefined') ? 0 : myMax;
		var rows = [];

		obj.each(function () {
			i++;
			if (max > 0 && i > max) return;

			// add some additional classes to each field
			_addViewsFieldClasses($(this));

			// derive title from header
			if ($('header', this).length == 1) {
				var title = $('<div />');
				title.addClass('views-field');
				title.addClass('views-field-title');
				title.html($('header .node-title', this).html());

				var img = $('.views-field-field-hero-region, .views-field-field-image-primary, .views-field-field-slideshow-frame-bg-image', this);

				if (img.length == 0) {
					// prepend
					$(this).prepend(title);	
				} else {
					// put the title after the primary image
					img.after(title);
				}

				// ok, now remove the header
				$('header', this).remove();
			}

			// all set, now create a phony view row
			var row = $('<div />');
			row.addClass('views-row');
			row.addClass('views-row-' + i);

			// clone the content
			row.html($(this).html());
			rows.push(row);
		});

		return rows;
	}

	var _convertNLGalleryToPseudoRows = function () {
		_addViewsFieldClasses($('.view-display-id-past_nl_gallery'));
		$('.view-display-id-past_nl_gallery .views-field-field-links').addClass('views-field-title');
	}

	var _alterNightLife = function () {
		// NightLife Landing (gallery)
		_convertNLGalleryToPseudoRows();
		
		// NightLife Landing (tri grid / people)
		var peeps = $('.page-nightlife-landing .views-field .field-name-field-featured-people > .field-items > .field-item > .node');
		var rows = _getPseudoRows(peeps, 1, 3);
		
		// add
		$.each(rows, function (index, item) {
			peeps.parents('.view-content').first().append(item);	
		});

		// remove
		peeps.parents('.views-field').remove();

		// NightLife Detail (people)
		var sec = $('.node-type-event-nightlife #music');
		var peeps = $('.field-name-field-featured-people > .field-items > .field-item > .node', sec);
		var rows = _getPseudoRows(peeps);
		
		// remove
		$('.field', sec).remove();

		var view = $('<div class="view"><div class="view-content"></div></div>');
		sec.append(view);

		// add
		$.each(rows, function (index, item) {
			$('.view-content', view).append(item);	
		});

		// NightLife Detail (events)
		var sec = $('.node-type-event-nightlife #events');
		var events = $('.field-name-field-article-section .content', sec);
		var rows = _getPseudoRows(events);
		
		// remove
		$('.field', sec).remove();

		var view = $('<div class="view"><div class="view-content"></div></div>');
		sec.append(view);

		// add
		$.each(rows, function (index, item) {
			$('.view-content', view).append(item);	
		});
	}
	
	var _removeEmptySlideshows = function () {
		var arr = [
			'.pane-hero-media-slideshow-large',
			'.pane-hero-media-slideshow-standard',
			'.pane-hero-media-standard-hero-image-pane',
			'.pane-hero-media-large-hero-image-pane',
			'.pane-slideshows-large-hero-image-pane',
			'.pane-slideshows-slideshow-large-bridge-pane',
			'.pane-slideshows-standard-hero-image-pane',
			'.pane-slideshows-slideshow-standard-bridge-pane'
		];

		$(arr.join(', ')).each(function () {
			if ($('img', this).length == 0) {
				$(this).remove();
			}
		});
	}

	var _alterLandingPage = function () {
		// alter people article sections to mimic views styles 
		var sec = $('.node-type-landing-page #people');
		var peeps = $('.field-name-field-featured-people > .field-items > .field-item > .node', sec);
		var rows = _getPseudoRows(peeps);
		
		// remove
		$('.field', sec).remove();

		var view = $('<div class="view"><div class="view-content"></div></div>');
		sec.append(view);

		// add
		$.each(rows, function (index, item) {
			$('.view-content', view).append(item);	
		});

		// drop some article sections in weird places
		// make a clone and put it under the blurb if there's more than two sections
		var numArticles = $('.pane-node-field-article-section > .field > .field-items > .field-item').length;
		
		if (numArticles > 2) {
			var orig = $('.pane-node-field-article-section');
			var clone = orig.clone();

			orig.addClass('article-section-orig');
			clone.addClass('article-section-clone');
			clone.appendTo(orig.parent());

			var origArticleSelector = '.article-section-orig > .field > .field-items > .field-item';
			var cloneArticleSelector = '.article-section-clone > .field > .field-items > .field-item';

			if (numArticles == 3) {
				// remove the first article from the clone
				$(cloneArticleSelector).first().remove();

				// remove everything but the first from the original
				var i = 0;

				$(origArticleSelector).each(function () {
					if (i > 0) $(this).addClass('cloned');
					i++;
				});
			} else {
				// remove the first two articles from the clone
				$(cloneArticleSelector).first().remove();
				$(cloneArticleSelector).first().remove();

				// remove everything but the first two from the original
				var i = 0;

				$(origArticleSelector).each(function () {
					if (i > 1) $(this).addClass('cloned');
					i++;
				});
			}
		}	
	}

	var _cloneMenuGarnish = function () {
		var clone = $('.block-menu-garnish').clone();
		clone.addClass('clone');
		clone.attr('id', 'block-views-menu-garnish-block-clone');

		$('.tb-megamenu-main-menu .nav.level-0 > li:first-child').after(clone);
	}

	var _fixColumnFields = function () {
		$('.column-fields').each(function () {
			var numColumns = $(this).children('.field').children('.field-items').children('.field-item').length;
			
			if (numColumns < 2) {
				$(this).removeClass('column-fields');
				$(this).addClass('floated-fields');
			}
		});
	}

	var _addFileClasses = function () {
		$('.file-icon').each(function () {
			var type = $(this).attr('title');
			var src = $(this).attr('src');
			var link = $(this).next();

			link.addClass(type);
			link.css('background-image', 'url("'+ src +'")');
		});
	}

	this.initialize = function () {
		calacademy.Utils.log('HackDOM.initialize');

		_removeCruft();
		_removeEmptySlideshows();
		_cloneMenuGarnish();
		_fixColumnFields();
		_addFileClasses();
		
		if ($('body').hasClass('section-nightlife')) {
			_alterNightLife();
		}

		if ($('body').hasClass('node-type-landing-page')) {
			_alterLandingPage();
		}
	}

	this.initialize();
}
