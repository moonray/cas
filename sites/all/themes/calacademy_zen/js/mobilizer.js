jQuery(document).ready(function($) {
	//check for mobile browser
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		//iterate through anchors
		$("a").each(function(index) {
			var str = this.href;
			//check if it's a ticketing link
  		if (str.toLowerCase().indexOf("ticketing.calacademy.org") >= 0) {
  			//append a mobile=true parameter to the end
  			this.href = str + "&mobile=true";
  		}
		});
	}
});