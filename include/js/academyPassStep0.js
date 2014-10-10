$('#pass-step-0').load(function () {
    var giftOptions = $('#pass-step-0').find('.form-field').eq(12);
	var packetOptions = $('#pass-step-0').find('.form-field').eq(13);
	$(giftOptions).remove();
	$(packetOptions).remove();
});
