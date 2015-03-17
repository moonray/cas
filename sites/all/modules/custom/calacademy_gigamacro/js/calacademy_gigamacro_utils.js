var gigamacro = {
	assetsPath: '/sites/all/themes/calacademy_zen/images/gigamacro/',
	tilesLocation: '//s3-us-west-1.amazonaws.com/tiles.gigamacro.calacademy.org/',
	utils: {
		getTilesMachineName: function (str) {
			return str.replace(/\s+/g, '-').toLowerCase();
		},
		jsonRequest: function (path, myData, onSuccessCallback, onErrorCallback) {
			jQuery.ajax({
				dataType: 'jsonp',
				url: '/rest/' + path,
				data: myData,
				cache: false,
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
	}
};
