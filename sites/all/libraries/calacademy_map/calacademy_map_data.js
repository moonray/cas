var CalAcademyMapData = function () {
	var $ = jQuery;
	var _numTypes = 3;
	var _i = 0;
	var _data = new Object();
	var _onSuccess;
	var _inst = this;

	var _jsonRequest = function (path, myData, onSuccessCallback, onErrorCallback) {
		$.ajax({
			dataType: 'jsonp',
			url: '/rest/' + path,
			cache: false,
			data: myData,
			success: function (data, textStatus, XMLHttpRequest) {
				if (typeof(onSuccessCallback) == 'function') {
					onSuccessCallback(data);
				}

				_i++;
				_data[path] = data;

				if (_i == _numTypes) {
					if (typeof(_onSuccess) == 'function') {
						_onSuccess(_data);
					}

					_inst.reset();
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				if (typeof(onErrorCallback) == 'function') {
					onErrorCallback();
				}
			}
		});
	}

	this.reset = function () {
		_i = 0;
		_data = new Object();
		_onSuccess = false;
	}

	this.getFloors = function (onSuccess, onError) {
		_jsonRequest('floors', null, onSuccess, onError);
	}

	this.getLocations = function (onSuccess, onError) {
		_jsonRequest('locations', null, onSuccess, onError);
	}

	this.getLocationTypes = function (onSuccess, onError) {
		_jsonRequest('locationtypes', null, onSuccess, onError);
	}

	this.getAll = function (onSuccess, onError) {
		this.reset();

		_onSuccess = onSuccess;
		this.getFloors(null, onError);
		this.getLocations(null, onError);
		this.getLocationTypes(null, onError);
	}

	this.initialize = function () {
	}

	this.initialize();
}
