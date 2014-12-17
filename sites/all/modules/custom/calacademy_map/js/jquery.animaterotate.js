jQuery.fn.animateRotate = function (angle, duration, easing, complete) {
    var args = jQuery.speed(duration, easing, complete);
    var step = args.step;

    return this.each(function (i, e) {
        args.step = function (now) {
            jQuery.style(e, '-moz-transform', 'rotate(' + now + 'deg)');
            jQuery.style(e, '-ms-transform', 'rotate(' + now + 'deg)');
            jQuery.style(e, '-o-transform', 'rotate(' + now + 'deg)');
            jQuery.style(e, '-webkit-transform', 'rotate(' + now + 'deg)');
            jQuery.style(e, 'transform', 'rotate(' + now + 'deg)');

            if (step) {
            	return step.apply(this, arguments);
            }
        };

        jQuery({deg: 0}).animate({deg: angle}, args);
    });
};
