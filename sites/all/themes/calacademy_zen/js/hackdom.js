var HackDOM = function () {
	var $ = jQuery;
	var _imageFieldSelector = '.views-field-field-hero-region, .views-field-field-image-primary, .views-field-field-slideshow-frame-bg-image';

	var _removeCruft = function () {
		// remove bogus styles
		$('p, p *').attr('style', '');

		// remove empty p tags
		$('p').each(function () {
			if ($.trim($(this).text()) == '' && $('img, iframe', this).length == 0) {
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

				var img = $(_imageFieldSelector, this);

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

		// switch href on img link
		$('.view-display-id-past_nl_gallery .views-row').each(function () {
			var img = $('img', this);

			if (img.length == 1) {
				var a = $('.views-field-title a', this);

				if (a.length == 1) {
					var parentA = img.parents('a').first();
					parentA.attr('href', a.attr('href'));
				}
			}
		});
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

		// remove non-image fields from hero region
		$('.view-nightlife-upcoming .field-name-field-hero-region').each(function () {
			calacademy.Utils.fixHeroField($(this), $('.views-field-title a', $(this).parent()));
		});

		// NightLife Detail (people / music)
		var sec = $('.node-type-event-nightlife #music');
		var peeps = $('.field-name-field-featured-people > .field-items > .field-item > .node', sec);
		var rows = _getPseudoRows(peeps);

		var view = $('<div class="view"><div class="view-content"></div></div>');
		sec.append(view);

		var originalView = $('.view', sec).first();

		// add
		$.each(rows, function (index, item) {
			var originalRow = $('.item-list li', originalView).eq(index);

			$('.views-field-title', item).before($('.field-name-field-location', originalRow));
			$('.views-field-title', item).after($('.field-name-field-time-slots', originalRow));
			calacademy.Utils.fixHeroField($('.field-name-field-hero-region', item), $('.views-field-title a', item));

			$('.view-content', view).append(item);
		});

		// remove
		originalView.remove();

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
			'.pane-node-field-hero-region',
			'.pane-hero-media-slideshow-large',
			'.pane-hero-media-slideshow-standard',
			'.pane-hero-media-standard-hero-image-pane',
			'.pane-hero-media-large-hero-image-pane',
			'.pane-slideshows-large-hero-image-pane',
			'.pane-slideshows-slideshow-large-bridge-pane',
			'.pane-slideshows-standard-hero-image-pane',
			'.pane-slideshows-slideshow-standard-bridge-pane'
		];

		calacademy.Utils.removeEmptyElements(arr.join(', '), $('body'));
	}

	var _alterESLandingPage = function () {
		// remove empty panels
		calacademy.Utils.removeEmptyElements('.panel-pane, .panel-panel, .center-wrapper', $('body'));

		// remove empty a tags
		$('.es-categories a').each(function () {
			if ($('img', this).length == 1) return;

			if ($.trim($(this).text()) == '') {
				$(this).remove();
			}
		});

		// concatenate "blog pseudo" and "selected" category views
		var pseudoRows = $('.es-categories > .view > .attachment > .view > .view-content > .views-row');

		if (pseudoRows.length > 0) {
			pseudoRows.each(function () {
				// alter these rows to match the DOM of the other categories
				$(this).prepend($('.link-block', this));
				$('.views-field-title-1', this).remove();

				$('.es-categories > .view > .view-content').append($(this));
			});

			$('.es-categories > .view > .attachment').remove();
		}

		var categories = $('.es-categories > .view > .view-content > .views-row');

		// do nothing if less than or equal to three
		if (categories.length <= 3) return;

		// create container
		var container = $('<div />');
		container.addClass('clone-container');
		container.addClass('smartphone-hide');
		container.addClass('image-top');
		container.addClass('es-categories');

		// place container directly after the callout box
		$('.body-box > .field').after(container);

		// populate container
		var i = 1;

		categories.each(function () {
			if (i > 3) {
				if (i % 2 == 0) {
					// clone into container
					var clone = $(this).clone();
					container.append(clone);

					$('img', clone).off('load');
					calacademy.Utils.addImageLoadEvent(clone, 'js-load-processed-clone');

					// original should be hidden on non-smartphones
					$(this).addClass('smartphone-only');
				}
			}

			i++;
		});
	}

	var _alterLandingAndExhibitsPage = function () {
		// alter people article sections to mimic views styles
		var sec = $('#people');
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

		// simplify hero region
		var link = $('.views-field-title a', sec);
		var heroRegion = $('.field-name-field-hero-region', sec);
		calacademy.Utils.fixHeroField(heroRegion, link);

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

		$('.tb-megamenu .nav.level-0 > li:first-child').after(clone);
	}

	var _cloneAlerts = function () {
		var clone = $('.alerts').clone();
		clone.addClass('clone');

		// clear some stuff
		$('*', clone).off();
		$('*', clone).removeClass();
		$('li', clone).attr('style', '');

		$('#block-views-menu-garnish-block-clone .menu-garnish-hours').after(clone);
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

	var _alterMegaMenuFeaturedItems = function () {
		$('.tb-megamenu .featured').each(function () {
			var featured = $(this);
			var rows = $('.field-name-field-megamenu-featured-item > .field-items > .field-item', this);
			var html = '';

			featured.empty();

			rows.each(function () {
				var row = $('<div />');
				row.addClass('featured-item');

				var title = $('.node-title a', this).addClass('title');
				var subtitle = $('.field-name-field-subtitle .field-item', this).addClass('subtitle');

				if ($('img', this).length == 1) {
					// create container
					var imgContainer = $('<div />');
					imgContainer.addClass('image-container');

					// fix hero field then add to container
					calacademy.Utils.fixHeroField($(this), title);
					imgContainer.html($(this).html());

					// add container to row
					row.append(imgContainer);
				}

				row.append(subtitle);

				title.html('<span>' + title.text() + '</span>');
				row.append(title);

				featured.prepend(row);
			});
		});
	}

	var _alterClusters = function () {
		// add non-image fields to a seperate container so they can be styled properly
		$('.tri-large > .view > .view-content > .views-row').each(function () {
			// create container
			var container = $('<div />');
			container.addClass('field-container');

			// add non-image fields to container
			var fields = $(this).children().not(_imageFieldSelector);
			container.html(fields);

			$(this).append(container);
		});
	}

	var _alterScienceTodayLanding = function () {
		// add sci today logo image inset element to top story image
		var logoSciToday = $('<div />');
		logoSciToday.addClass('science-today-logo-inset');
		$('.view-es-science-today-featured-articles > .view-content > .views-row-first > .views-field-field-hero-region > .field-content').append(logoSciToday);

		// hide hero region on cant miss items that are not first item
		var countCantMiss = 0;
		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row').each(function () {
			if (countCantMiss != 0) {
				$(this).children('.views-field-field-hero-region').hide();
			}
			countCantMiss++;
		});

		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row:nth-child(1)').addClass('cant-miss-right-column');
		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row:nth-child(2)').addClass('cant-miss-left-column');
		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row:nth-child(3)').addClass('cant-miss-left-column');
		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row:nth-child(4)').addClass('cant-miss-right-column');
		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row:nth-child(5)').addClass('cant-miss-right-column');
		$('.pane-astronomical-events-panel-pane-1').addClass('cant-miss-left-column');

		$('.cant-miss-left-column').wrapAll('<div class="cant-miss-container-left" />');
		$('.cant-miss-right-column').wrapAll('<div class="cant-miss-container-right" />');

		// replace link on cant miss hero - custom req. - std hero img fix not working here
		var titleLinkHref = $('.cant-miss-container-right > .views-row:nth-child(1) > .views-field-title > .field-content > a').attr('href');
		$('.cant-miss-container-right > .views-row:nth-child(1) > .views-field-field-hero-region > .field-content > a').attr('href', titleLinkHref);

		// add astro-event non-image fields to a seperate container so they can be styled properly
		$('.pane-astronomical-events-panel-pane-1 > .view > .view-content > .views-row').each(function () {
			// create container
			var container = $('<div />');
			container.addClass('field-container');
			// add non-image fields to container
			var fields = $(this).children().not(_imageFieldSelector);
			container.html(fields);
			$(this).append(container);
		});

		// add creature of the week non-image fields to a seperate container so they can be styled properly
		$('.pane-es-science-today-featured-articles-panel-pane-creature-week > .pane-title').insertBefore('.pane-es-science-today-featured-articles-panel-pane-creature-week > .view > .view-content > .views-row > .views-field-title');
		$('.pane-es-science-today-featured-articles-panel-pane-creature-week > .view > .view-content > .views-row').each(function () {
			// create container
			var container = $('<div />');
			container.addClass('creature-field-container');
			// add non-image fields to container
			var fields = $(this).children().not(_imageFieldSelector);
			container.html(fields);
			$(this).append(container);
		});

		// add link to cant miss hero
		var sec = $('.pane-es-science-today-featured-articles-panel-pane-creature-week > .view > .view-content > .views-row');
		var link = $('.creature-field-container. > .views-field-title > span > a', sec);
		var heroRegion = $('.views-field-field-hero-region', sec);
		calacademy.Utils.fixHeroField(heroRegion, link);

		// browse by topic
		$('.es-categories > .view-category-listings > .view-content > .views-row').each(function () {
			var catLinkName = $(this).children('.views-field-name').children('span').children('a').text();
			var catLinkBlock = $('<a />');
			catLinkBlock.attr('href', $(this).children('.views-field-name').children('span').children('a').attr('href'));
			catLinkBlock.addClass('link-block');
			catLinkBlock.append('<span>' + catLinkName + '</span>');
			$(this).append(catLinkBlock);
			$(this).children('.views-field-name').css('display', 'none');
		});

	}

	this.initialize = function () {
		calacademy.Utils.log('HackDOM.initialize');

		_removeCruft();
		_removeEmptySlideshows();
		_cloneMenuGarnish();
		_cloneAlerts();
		_fixColumnFields();
		_addFileClasses();
		_alterMegaMenuFeaturedItems();
		_alterClusters();

		if ($('body').hasClass('section-nightlife')) {
			_alterNightLife();
		}

		if ($('body').hasClass('node-type-landing-page')
			|| $('body').hasClass('node-type-exhibit')) {
			_alterLandingAndExhibitsPage();
		}

		if ($('body').hasClass('node-type-es-landing-page')) {
			_alterESLandingPage();
		}

		if ($('body').hasClass('node-type-landing-page-science-today')) {
			_alterScienceTodayLanding();
		}
	}

	this.initialize();
}
