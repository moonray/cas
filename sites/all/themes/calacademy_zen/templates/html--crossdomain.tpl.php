<?php

	http_response_code(200);
	header('Content-type: text/xml');

?>
<!DOCTYPE cross-domain-policy SYSTEM
"http://www.adobe.com/xml/dtds/cross-domain-policy.dtd">
<cross-domain-policy>
	<site-control permitted-cross-domain-policies="all" />
	<allow-access-from domain="*.brightcove.com" />
	<allow-access-from domain="*.google-analytics.com" />
	<allow-access-from domain="*.calacademy.org" />
	<allow-access-from domain="*.calacademy.com" />
	<allow-access-from domain="*.calacademy.net" />
</cross-domain-policy>
