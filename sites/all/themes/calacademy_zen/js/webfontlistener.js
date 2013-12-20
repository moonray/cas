(function ($) {
 
    $.webFontListener = function (callbacks) {
		// config
		var defaults = {
			timeout: 8000,
            onFontLoad: function () {},
            onFontLoadError: function () {}          
        };

        callbacks = $.extend({}, defaults, callbacks);

        // private
        var _testElement = $('<span />');
        var _testElementText = 'QW@HhsXJ';
        var _initialWidth;
        var _pollInterval;
        var _pollDuration = 50;
        var _startTime;
        var _instance = this;

		var _checkFont = function () {
			var currentTime = (new Date()).getTime();
			
			if ((currentTime - _startTime) >= defaults.timeout) {
				// timeout failure
				_instance.destroy();

				if ($.isFunction(callbacks.onFontLoadError)) {
					callbacks.onFontLoadError.call(_instance);	
				}

				return;
			}

			var w = _testElement.width();

			// nothing has changed or we have a bogus measurement
			if (isNaN(w) || w <= 0) return;
			if (w == _initialWidth) return;

			// success
			_instance.destroy();
			
			if ($.isFunction(callbacks.onFontLoad)) {
				callbacks.onFontLoad.call(_instance);	
			}
		}

		// public
		this.destroy = function () {
			clearInterval(_pollInterval);
			_testElement.remove();	
		}

	    this.initialize = function () {
		    // init test element
			_testElement.html(_testElementText);
			_testElement.addClass('font-load-test');
			_testElement.addClass('monospace');
			
			// add it to the DOM and measure
			$('body').append(_testElement);
			_initialWidth = _testElement.width();
			
			// remove ref font
			_testElement.removeClass('monospace');

			// start polling for custom font
			_startTime = (new Date()).getTime();
			
			clearInterval(_pollInterval);
	        _pollInterval = setInterval(_checkFont, _pollDuration);
			_checkFont();

	        return this;
	    };

    	return this.initialize();
	};
 
}(jQuery));
