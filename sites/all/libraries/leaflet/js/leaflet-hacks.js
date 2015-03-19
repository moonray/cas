// add scale to img tiles to mitigate border animation artifacts on certain browsers
(function ($) {
    var isSafariDesktop = !L.Browser.mobile && !L.Browser.chrome && L.Browser.webkit3d;

    if (isSafariDesktop) {
      L.DomUtil.setPosition = function (el, point, disable3D) {
        el._leaflet_pos = point;

        if (!disable3D && L.Browser.any3d) {
          var transformString = L.DomUtil.getTranslateString(point);

          if ($(el).hasClass('leaflet-tile')) {         
            transformString += ' scale(1.005)';
          }

          $(el).css('transform', transformString);
        } else {
          el.style.left = point.x + 'px';
          el.style.top = point.y + 'px';
        }
      }
    }
})(jQuery);
