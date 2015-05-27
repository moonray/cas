// more than two pointers for pinch/zoom/pan
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

        map.stop();

        L.DomEvent
            .on(document, 'touchmove', this._onTouchMove, this)
            .on(document, 'touchend', this._onTouchEnd, this);

        L.DomEvent.preventDefault(e);
  },

  _onTouchMove: function (e) {
        if (!e.touches || e.touches.length < 2 || !this._zooming) { return; }

        var map = this._map,
            p1 = map.mouseEventToLayerPoint(e.touches[0]),
            p2 = map.mouseEventToLayerPoint(e.touches[e.touches.length - 1]);

        this._scale = p1.distanceTo(p2) / this._startDist;
        this._delta = p1._add(p2)._divideBy(2)._subtract(this._startCenter);

        if (!map.options.bounceAtZoomLimits) {
            var currentZoom = map.getScaleZoom(this._scale);
            if ((currentZoom <= map.getMinZoom() && this._scale < 1) ||
             (currentZoom >= map.getMaxZoom() && this._scale > 1)) { return; }
        }

        if (!this._moved) {
            map
                .fire('movestart')
                .fire('zoomstart');

            this._moved = true;
        }

        L.Util.cancelAnimFrame(this._animRequest);
        this._animRequest = L.Util.requestAnimFrame(this._updateOnMove, this, true, this._map._container);

        L.DomEvent.preventDefault(e); 
  }
});
