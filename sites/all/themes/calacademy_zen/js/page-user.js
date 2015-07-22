var PageUser = function () {
	this.initialize = function() {
		var injectHTML = '<p><div class="views-row"><div class="views-field-title"><!--<a href="https://sso.calacademy.org/adfs/ls/IdpInitiatedSignon.aspx">Use Academy authentication</a>--><a href="/user/password">Reset password</a></div></div></p>';
		jQuery('#user-login').before(injectHTML);
	};
	this.initialize();
};
