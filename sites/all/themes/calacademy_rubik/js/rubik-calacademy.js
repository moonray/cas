// disable sticky headers
Drupal.behaviors.tableHeader = function () {};

// only a single error should display for image fields
jQuery(document).ajaxComplete(function (e) {
	var $ = jQuery;

	$('.field-type-image').each(function () {
		var errors = $('.messages.error', this);

		if (errors.length > 1) {
			// remove the first
			errors.eq(0).remove();
		}
	});
});

jQuery(document).ready(function ($) {
	/**
	* Sanitize on paste into WYSIWYG
	* @author Greg Rotter
	*/
	try {
		CKEDITOR.on('instanceReady', function (ev) {
			ev.editor.on('paste', function (e) {
				var str = e.data.dataValue;

				// replace nbsps with whitespace
				str = str.replace(/&nbsp;/g, ' ');

				// replace all multi-spaces with a single space
				str = str.replace(/\s+/g, ' ');

				// create a dummy container
				var container = $('<div />');
				container.html(str);

				// remove bad stuff
				$('script, style, :empty', container).remove();

				// remove anything that just contains whitespace
				$('*', container).filter(function () {
					return $.trim($(this).text()).length == 0;
				}).remove();

				// strip tags
				container.stripTags('p, strong, em, i, li, ul, ol, a, sup, sub');

				e.data.dataValue = container.html();
			});
		});
	} catch (e) {}

	/**
	* Show / hide certain hero options per node type
	*
	*/

 	// Hide "no hero media" option, i.e. images req'd everywhere!
 	$('#edit-field-hero-region-und-0-field-hero-type-und > div:first').hide();

 	// Hide "standard image", "standard slideshow" and youtube video
 	var arr = [
 		'es_landing_page',
 		'landing_page',
 		'exhibit'
 	];

 	var i = arr.length;

 	while (i--) {
 		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-image-standard').parent().hide();
 		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-slideshow-standard').parent().hide();
 		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-video-youtube').parent().hide();
 	}

 	// Hide "large image", "large slideshow"
 	var arr = [
		'base_page',
		'content_page',
		'event',
		'field_trip',
		'lesson_plan',
		'event_nightlife',
		'press_release',
		'explore_science_article',
		'ibss_project',
		'blog'
 	];

 	var i = arr.length;

 	while (i--) {
    	$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-image-large').parent().hide();
		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-slideshow-large').parent().hide();
	}

	// Hide everything except "standard image" (replaces primary image) for People and users
 	var arr = [
 		'#person-node-form',
 		'#user-profile-form'
 	];

 	var i = arr.length;

 	while (i--) {
 		$(arr[i] + ' #edit-field-hero-region-und-0-field-hero-type-und > div').hide();
	  	$(arr[i] + ' #edit-field-hero-region-und-0-field-hero-type-und-image-standard').parent().show();
	}

	// hero region logic done, display parent that was hidden with css
	$('.field-name-field-hero-region').show();

	/**
	* misc
	*
	*/

	// prevent selection of term reference taxonomy parents "Regular" and "Rock Program" in field trip content edit form
	$('#edit-field-field-trip-type-und').children('option').each(function () {
		if (($(this).text() == "Regular") || ($(this).text() == "Rock Program")) {
			$(this).attr('disabled','disabled');
		}
	});

	// hide repeat event checkbox from nightlife content editor
	$('.node-event_nightlife-form #edit-field-date-und-0-show-repeat-settings').parent().hide();

	// remove NightLife option from Event category selection in event content editor
	$('#edit-field-category-und').children('option').each(function () {
		if ($(this).text() == "NightLife") {
			$(this).remove();
		}
	});

	// hide Tags field on Right Rail Standard content editor
	$('.node-right_rail_standard-form #edit-field-tags-und').parent().hide();

	/**
	* prevent selection of term reference taxonomy parents "Hands-On-Science",
	* "Our Work", and "Science News" in Explore Science Article content edit form
	*/
	$('.node-explore_science_article-form #edit-field-es-category-und').children('option').each(function () {
		if (($(this).text() == "Hands-On-Science") || ($(this).text() == "Our Work") || ($(this).text() == "Science News")) {
			$(this).attr('disabled','disabled');
		}
	});

});
