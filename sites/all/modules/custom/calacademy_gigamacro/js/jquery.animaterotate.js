jQuery.fn.animateRotate = function (angle, duration, easing, complete) {
    var _getCurrentAngle = function (el) {
        var st = window.getComputedStyle(el, null);
        var tr = st.getPropertyValue('-webkit-transform') ||
                 st.getPropertyValue('-moz-transform') ||
                 st.getPropertyValue('-ms-transform') ||
                 st.getPropertyValue('-o-transform') ||
                 st.getPropertyValue('transform') ||
                 false;

        if (tr === false) return false;

        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt((a * a) + (b * b)); 
        var sin = b / scale;

        return Math.atan2(b, a) * (180 / Math.PI);
    }

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

        var currentAngle = _getCurrentAngle(this);
        if (!currentAngle) currentAngle = 0;

        jQuery({deg: currentAngle}).animate({deg: angle}, args);
    });
};
