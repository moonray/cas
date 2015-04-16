//a script for appending mobile=true parameter to the end of ticketing URLs so that gateway can more easily detect/direct mobile visitors
jQuery(document).ready(function($) {
	//check for mobile browser
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		//iterate through anchors
		$('a[href*="ticketing.calacademy.org"]').each(function () {
			var orig = $(this).attr('href');
			$(this).attr('href', orig + '&mobile=true');
		});
	}
});