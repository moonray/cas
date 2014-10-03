var delay=2000
setTimeout(function() {
	$('input[value="UnLink Account"]').remove();
	$('input[value = "Unlink Account From Pass"]').trigger('click', function() {
		$(this).remove();
	});
	$( 'input[value="Link Contact To Billing/Membership"]' ).trigger('click');
	$.get("https://www.calacademy.org/images/cas/js/linkAccountsForMembers.js");
},delay);
