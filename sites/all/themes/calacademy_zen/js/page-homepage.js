var PageHomepage = function () {
	var $ = jQuery;
	var _device;
	var _injectPlaceholderContentTimeout;

	var _placeUnder = function (anchor, target) {
		if (anchor.length == 0 || target.length == 0) return;

		target.addClass('dynamic-css');
		target.css('position', 'absolute');
		target.css('top', anchor.position().top + anchor.outerHeight(true) + 'px');
		target.css('left', anchor.position().left + 'px');
	}

	var _injectPlaceholderContent = function () {
		// #people panel description
		var p = $('<p>Learn about our current initiatives, and access tools and resources to support your work.</p>');
		$('#people .pane-title').after(p);

		// #events testimonial
		var t = $('<div><p>It&rsquo;s amazing to be a member of such an adventurous and fun community. Every week brings something new and exciting.</p><div class="views-field-field-reviewer-name"><h3>Wilburn Burchette</h3><h4>Academy of Science Friend</h4></div></div>');
		t.addClass('testimonial');
		$('#events').append(t);

		// #people testimonial
		var t = $('<div><p>It&rsquo;s amazing to be a member of such an adventurous and fun community. Every week brings something new and exciting.</p><div class="views-field-field-reviewer-name"><h3>Wilburn Burchette</h3><h4>Academy of Science Friend</h4></div></div>');
		t.addClass('testimonial');
		$('#people').append(t);

		_layout();
	}

	var _layout = function () {
		if (_device.indexOf('smartphone') >= 0) return;

		// #people panel description
		var p = $('#people > p');
		_placeUnder($('#people .pane-title'), p);

		// #events testimonial
		var testimonial = $('#events .testimonial');
		var target = $('#events .views-row-5');

		if (testimonial.length == 1 && target.length == 1) {
			testimonial.addClass('dynamic-css');
			testimonial.css('position', 'absolute');
			testimonial.css('top', parseInt(target.css('marginTop')) + parseInt(target.position().top) + parseInt($('.views-field-field-image-primary', target).width()) + 'px');	
		}
	
		// #people testimonial
		testimonial = $('#people .testimonial');
		target = $('#people .views-row-4');
		
		if (testimonial.length == 1 && target.length == 1) {
			testimonial.addClass('dynamic-css');
			testimonial.css('position', 'absolute');
			testimonial.css('left', parseInt(target.position().left) + 'px');
			testimonial.css('top', calacademy.Utils.getRowHeight(target) + 'px');
		}	
	}

	this.layout = _layout;

	this.onBreakpoint = function (device) {
		_device = device;
		_layout();
	}

	this.onFontLoad = function () {
		clearTimeout(_injectPlaceholderContentTimeout);
		_injectPlaceholderContentTimeout = setTimeout(_injectPlaceholderContent, 1000);
	}

	this.initialize = function () {
	}

	this.initialize();
}
