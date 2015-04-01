var gigamacro = {
	assetsPath: '/sites/all/themes/calacademy_zen/images/gigamacro/',
	tilesLocation: '//s3-us-west-1.amazonaws.com/tiles.gigamacro.calacademy.org/',
	coords: [{"specimen":"comet-moth","left":"1525px","top":"641px","img_left":"-123.81591796875px","img_top":"-108.81591796875px","name_left":"99px","name_top":"-57px"},{"specimen":"damselfly","left":"897px","top":"770px","img_left":"-204.911743164063px","img_top":"-203.911743164063px","name_left":"22px","name_top":"209px"},{"specimen":"egg-grid","left":"645px","top":"445px","img_left":"-209.393127441406px","img_top":"-215.393127441406px","name_left":"50px","name_top":"204px"},{"specimen":"feather-grid","left":"38px","top":"666px","img_left":"-117.35676574707px","img_top":"-126.356750488281px","name_left":"117px","name_top":"-49px"},{"specimen":"glory-bush","left":"1524px","top":"35px","img_left":"-179.884521484375px","img_top":"-91.8844680786133px","name_left":"131px","name_top":"408px"},{"specimen":"grasshopper","left":"965px","top":"441px","img_left":"-212.687744140625px","img_top":"-212.687744140625px","name_left":"13px","name_top":"206px"},{"specimen":"scarab-beetle","left":"488px","top":"719px","img_left":"-165.887939453125px","img_top":"-170.887939453125px","name_left":"52px","name_top":"296px"},{"specimen":"shell-grid","left":"332px","top":"448px","img_left":"-210.751739501953px","img_top":"-209.751739501953px","name_left":"-108px","name_top":"32px"},{"specimen":"spur-flower","left":"1176px","top":"115px","img_left":"-206.491455078125px","img_top":"-220.491394042969px","name_left":"19px","name_top":"207px"},{"specimen":"sunset-moth","left":"1301px","top":"446px","img_left":"-206.17431640625px","img_top":"-219.174377441406px","name_left":"18px","name_top":"206px"},{"specimen":"urchin-grid","left":"742px","top":"64px","img_left":"-169.698303222656px","img_top":"-167.698303222656px","name_left":"-88px","name_top":"242px"},{"specimen":"weevils","left":"1194px","top":"718px","img_left":"-167.950439453125px","img_top":"-169.950439453125px","name_left":"78px","name_top":"300px"}],
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
					img_left: $('img', this).css('left'),
					img_top: $('img', this).css('top'),
					name_left: $('.name_container', this).css('left'),
					name_top: $('.name_container', this).css('top'),
				});
			});

			return JSON.stringify(arr);
		}
	}
};
