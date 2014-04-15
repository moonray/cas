jQuery(document).ready(function ($) {
	/*
	* Fix an issue with CKEditor adding a bunch of non-breaking spaces on paste
	* @author Greg Rotter
	*/
	CKEDITOR.on('instanceReady', function (ev) {
		ev.editor.on('paste', function (e) {
		  var str = e.data.dataValue;
		  e.data.dataValue = str.replace(/&nbsp;/g, ' ');
		});
	});

 	// Hide "no hero media" option, e.g. images req'd everywhere!
 	$('#edit-field-hero-region-und-0-field-hero-type-und > div:first').hide();

 	// Hide "standard image" and "standard slideshow"
 	var arr = [
 		'landing_page',
 		'exhibit'
 	];
 	
 	var i = arr.length;
 	
 	while (i--) {
 		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-image-standard').parent().hide();
 		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-slideshow-standard').parent().hide();
 	}

 	// Hide "large image" and "large slideshow"
 	var arr = [
 		'base_page',
 		'content_page',
 		'event',
 		'field_trip',
 		'lesson_plan',
 		'event_nightlife',
 		'press_release'
 	];
 	
 	var i = arr.length;
 	
 	while (i--) {
	  	$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-image-large').parent().hide();
		$('.node-' + arr[i] + '-form #edit-field-hero-region-und-0-field-hero-type-und-slideshow-large').parent().hide();
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
