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

// map touchiness
L.Map.mergeOptions({
  touchExtend: true
});

L.Map.TouchExtend = L.Handler.extend({
  initialize: function(map) {
    this._map = map;
    this._container = map._container;
    return this._pane = map._panes.overlayPane;
  },
  addHooks: function() {
    L.DomEvent.on(this._container, 'touchstart', this._onTouchStart, this);
    L.DomEvent.on(this._container, 'touchend', this._onTouchEnd, this);
    return L.DomEvent.on(this._container, 'touchmove', this._onTouchMove, this);
  },
  removeHooks: function() {
    L.DomEvent.off(this._container, 'touchstart', this._onTouchStart);
    L.DomEvent.off(this._container, 'touchend', this._onTouchEnd);
    return L.DomEvent.off(this._container, 'touchmove', this._onTouchMove);
  },
  _onTouchEvent: function(e, type) {
    var containerPoint, latlng, layerPoint, touch;
    if (!this._map._loaded) {
      return;
    }
    touch = e.touches[0];
    containerPoint = L.point(touch.clientX, touch.clientY);
    layerPoint = this._map.containerPointToLayerPoint(containerPoint);
    latlng = this._map.layerPointToLatLng(layerPoint);
    return this._map.fire(type, {
      latlng: latlng,
      layerPoint: layerPoint,
      containerPoint: containerPoint,
      originalEvent: e
    });
  },
  _onTouchStart: function(e) {
    return this._onTouchEvent(e, 'touchstart');
  },
  _onTouchEnd: function(e) {
    if (!this._map._loaded) {
      return;
    }
    return this._map.fire('touchend', {
      originalEvent: e
    });
  },
  _onTouchMove: function(e) {
    return this._onTouchEvent(e, 'touchmove');
  }
});

L.Map.addInitHook('addHandler', 'touchExtend', L.Map.TouchExtend);
