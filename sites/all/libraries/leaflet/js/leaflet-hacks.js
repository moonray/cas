// add scale to img tiles to mitigate border animation artifacts on certain browsers
(function ($) {
    var isSafariDesktop = !L.Browser.mobile && !L.Browser.chrome && L.Browser.webkit3d;

    if (isSafariDesktop) {
      L.DomUtil.setPosition = function (el, point, disable3D) {
        el._leaflet_pos = point;

        if (!disable3D && L.Browser.any3d) {
          var transformString = L.DomUtil.getTranslateString(point);

          if ($(el).hasClass('leaflet-tile') && !$('html').hasClass('bypass-tile-scaling')) {         
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

// fixing a bug in getTranslateString
L.DomUtil.getTranslateString = function (point) {
    if (!point) point = {x: 0, y: 0};
    if (!point.x) point.x = 0;
    if (!point.y) point.y = 0;

    var is3d = L.Browser.webkit3d,
        open = 'translate' + (is3d ? '3d' : '') + '(',
        close = (is3d ? ',0' : '') + ')';
    
    // @see
    // https://github.com/Leaflet/Leaflet/issues/2693#issuecomment-45146332
    point.x += Math.random() / 10000;
    // point.y += Math.random() / 10000;

    return open + point.x + 'px,' + point.y + 'px' + close;
}

// fixing a bug in _onDragEnd
L.Map.Drag.include({
  _onDragEnd: function (e) {
    var map = this._map,
        options = map.options,
        delay = +new Date() - this._lastTime,

        // noInertia = !options.inertia || delay > options.inertiaThreshold || !this._positions[0];
        noInertia = !options.inertia || delay > options.inertiaThreshold || !jQuery.isArray(this._positions) || (jQuery.isArray(this._positions) && this._positions.length == 0);

    map.fire('dragend', e);

    if (noInertia) {
      map.fire('moveend');

    } else {

      var direction = this._lastPos.subtract(this._positions[0]),
          duration = (this._lastTime + delay - this._times[0]) / 1000,
          ease = options.easeLinearity,

          speedVector = direction.multiplyBy(ease / duration),
          speed = speedVector.distanceTo([0, 0]),

          limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
          limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

          decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
          offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

      if (!offset.x || !offset.y) {
        map.fire('moveend');

      } else {
        offset = map._limitOffset(offset, map.options.maxBounds);

        L.Util.requestAnimFrame(function () {
          map.panBy(offset, {
            duration: decelerationDuration,
            easeLinearity: ease,
            noMoveStart: true
          });
        });
      }
    }
  }
});

// more than two pointers for pinch/zoom
L.Map.TouchZoom.include({
  _onTouchStart: function (e) {
    var map = this._map;

    if (!e.touches || e.touches.length < 2 || map._animatingZoom || this._zooming) { return; }

    var p1 = map.mouseEventToLayerPoint(e.touches[0]),
        p2 = map.mouseEventToLayerPoint(e.touches[e.touches.length - 1]),
        viewCenter = map._getCenterLayerPoint();

    this._startCenter = p1.add(p2)._divideBy(2);
    this._startDist = p1.distanceTo(p2);

    this._moved = false;
    this._zooming = true;

    this._centerOffset = viewCenter.subtract(this._startCenter);

    if (map._panAnim) {
      map._panAnim.stop();
    }

    L.DomEvent
        .on(document, 'touchmove', this._onTouchMove, this)
        .on(document, 'touchend', this._onTouchEnd, this);

    L.DomEvent.preventDefault(e);
  },

  _onTouchMove: function (e) {
    var map = this._map;

    if (!e.touches || e.touches.length < 2 || !this._zooming) { return; }

    var p1 = map.mouseEventToLayerPoint(e.touches[0]),
        p2 = map.mouseEventToLayerPoint(e.touches[e.touches.length - 1]);

    this._scale = p1.distanceTo(p2) / this._startDist;
    this._delta = p1._add(p2)._divideBy(2)._subtract(this._startCenter);

    if (this._scale === 1) { return; }

    if (!map.options.bounceAtZoomLimits) {
      if ((map.getZoom() === map.getMinZoom() && this._scale < 1) ||
          (map.getZoom() === map.getMaxZoom() && this._scale > 1)) { return; }
    }

    if (!this._moved) {
      L.DomUtil.addClass(map._mapPane, 'leaflet-touching');

      map
          .fire('movestart')
          .fire('zoomstart');

      this._moved = true;
    }

    L.Util.cancelAnimFrame(this._animRequest);
    this._animRequest = L.Util.requestAnimFrame(
            this._updateOnMove, this, true, this._map._container);

    L.DomEvent.preventDefault(e);
  }
});
