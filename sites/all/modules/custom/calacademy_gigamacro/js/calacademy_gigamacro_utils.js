var gigamacro = {
	assetsPath: '/sites/all/themes/calacademy_zen/images/gigamacro/',
	tilesLocation: '//s3-us-west-1.amazonaws.com/tiles.gigamacro.calacademy.org/',
	coords: [{"specimen":"comet-moth","left":"1532px","top":"662px","name_left":"87px","name_top":"-512px"},{"specimen":"damselfly","left":"502px","top":"759px","name_left":"23px","name_top":"-38px"},{"specimen":"egg-grid","left":"-59px","top":"438px","name_left":"-171px","name_top":"25px"},{"specimen":"feather-grid","left":"-1043px","top":"669px","name_left":"107px","name_top":"-442px"},{"specimen":"glory-bush","left":"86px","top":"24px","name_left":"148px","name_top":"-106px"},{"specimen":"grasshopper","left":"993px","top":"-62px","name_left":"-185px","name_top":"44px"},{"specimen":"scarab-beetle","left":"123px","top":"218px","name_left":"59px","name_top":"7px"},{"specimen":"shell-grid","left":"-397px","top":"-59px","name_left":"-320px","name_top":"-155px"},{"specimen":"spur-flower","left":"85px","top":"-388px","name_left":"22px","name_top":"-39px"},{"specimen":"sunset-moth","left":"-112px","top":"-60px","name_left":"15px","name_top":"-7px"},{"specimen":"urchin-grid","left":"750px","top":"-937px","name_left":"-90px","name_top":"-84px"},{"specimen":"weevils","left":"802px","top":"-282px","name_left":"77px","name_top":"13px"}],
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
		},
		getCoords: function () {
			var $ = jQuery;
			var arr = [];

			$('#gigamacro-menu li').each(function () {
				arr.push({
					specimen: $.trim($(this).attr('class').replace('ui-draggable ui-draggable-handle', '')),
					left: $(this).css('left'),
					top: $(this).css('top'),
					name_left: $('.name_container', this).css('left'),
					name_top: $('.name_container', this).css('top'),
				});
			});

			return JSON.stringify(arr);
		}
	}
};
