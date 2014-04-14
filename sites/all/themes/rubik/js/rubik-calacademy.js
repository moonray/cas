/*
* Fix an issue with CKEditor adding a bunch of non-breaking spaces on paste
* @author Greg Rotter
*/
jQuery(document).ready(function() {
  CKEDITOR.on('instanceReady', function (ev) {
    ev.editor.on('paste', function (e) {
      var str = e.data.dataValue;
      e.data.dataValue = str.replace(/&nbsp;/g, ' ');
    });
  });

 	/* Hide "no hero media" option from hero region in cms create/edit for various content types */
 	jQuery('#edit-field-hero-region-und-0-field-hero-type-und div:first').css('visibility','hidden');
 	jQuery('#edit-field-hero-region-und-0-field-hero-type-und div:first').css('height','0');

 	/* Hide "standard image" and "standard slideshow" options from hero region in cms create/edit for landing page content */
 	jQuery('.node-landing_page-form #edit-field-hero-region-und-0-field-hero-type-und-image-standard').closest('div').css('visibility','hidden');
 	jQuery('.node-landing_page-form #edit-field-hero-region-und-0-field-hero-type-und-image-standard').closest('div').css('height','0');
 	jQuery('.node-landing_page-form #edit-field-hero-region-und-0-field-hero-type-und-slideshow-standard').closest('div').css('visibility','hidden');
 	jQuery('.node-landing_page-form #edit-field-hero-region-und-0-field-hero-type-und-slideshow-standard').closest('div').css('height','0');

 	/*
 	* Hide "large image" and "large slideshow" options from hero region in cms create/edit for:
 	* base page, content page, event, field trip, lesson plan, event nightlife, and press release content.
 	*/
 	var standardPages = new Array('base_page', 'content_page', 'event', 'field_trip', 'lesson_plan', 'event_nightlife', 'press_release');
 	var i = 0;
 	while (i < standardPages.length) {
	  jQuery('.node-'+standardPages[i]+'-form #edit-field-hero-region-und-0-field-hero-type-und-image-large').closest('div').css('visibility','hidden');
 		jQuery('.node-'+standardPages[i]+'-form #edit-field-hero-region-und-0-field-hero-type-und-image-large').closest('div').css('height','0');
 		jQuery('.node-'+standardPages[i]+'-form #edit-field-hero-region-und-0-field-hero-type-und-slideshow-large').closest('div').css('visibility','hidden');
 		jQuery('.node-'+standardPages[i]+'-form #edit-field-hero-region-und-0-field-hero-type-und-slideshow-large').closest('div').css('height','0');
	  i++;
	}

});
