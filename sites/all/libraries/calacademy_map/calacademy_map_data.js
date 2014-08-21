var CalAcademyMapData = function () {
	var $ = jQuery;

	var _jsonRequest = function (path, myData, onSuccessCallback, onErrorCallback) {
		$.ajax({
			dataType: 'jsonp',
			url: path,
			cache: false,
			data: myData,
			success: function (data, textStatus, XMLHttpRequest) {
				if (typeof(onSuccessCallback) == 'function') {
					onSuccessCallback(data);
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				if (typeof(onErrorCallback) == 'function') {
					onErrorCallback();
				}
			}
		});
	}

	this.getFloors = function (onSuccess, onError) {
		_jsonRequest('/rest/floors', null, onSuccess, onError);
	}

	this.initialize = function () {
	}

	this.initialize();
}
