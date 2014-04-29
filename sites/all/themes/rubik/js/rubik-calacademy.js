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
	/*
	* Fix an issue with CKEditor adding a bunch of non-breaking spaces on paste
	* @author Greg Rotter
	*/
	try {
		CKEDITOR.on('instanceReady', function (ev) {
			ev.editor.on('paste', function (e) {
			  var str = e.data.dataValue;
			  e.data.dataValue = str.replace(/&nbsp;/g, ' ');
			});
		});
	} catch (e) {}

 	// Hide "no hero media" option, i.e. images req'd everywhere!
 	$('#edit-field-hero-region-und-0-field-hero-type-und > div:first').hide();

 	// Hide "standard image" and "standard slideshow"
 	var arr = [
 		'landing_page',
 		'exhibit',
    'es-landing-page'
 	];
 	
 	var i = arr.length;
 	
 	while (i--) {
 		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-image-standard').parent().hide();
 		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-slideshow-standard').parent().hide();
 		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-video-standard').parent().hide();
 	}

 	// Hide "large image", "large slideshow", and "large video"
 	var arr = [
 		'base_page',
 		'content_page',
 		'event',
 		'field_trip',
 		'lesson_plan',
 		'event_nightlife',
 		'press_release',
    'explore-science-article'
 	];
 	
 	var i = arr.length;
 	
 	while (i--) {
    $('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-image-large').parent().hide();
		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-slideshow-large').parent().hide();
		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-video-large').parent().hide();
	}

	// Hide everything except "standard image" (replaces primary image)
 	var arr = [
 		'person'
 	];
 	
 	var i = arr.length;
 	
 	while (i--) {
 		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und > div').hide();
	  $('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-image-standard').parent().show();

	  	// preselect it as well
	  	// $('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-image-standard').click();
	}
});
