<cams
	rtmphost="rtmp://bcove156.fc.llnwd.net/bcove156/"
	fcsubscribe="1"
	optimalkbps="1500"
	restartduration="5000"
	checksoundduration="10000"
	width="1280"
	height="720">

	<cam>
		<title><![CDATA[Wide View]]></title>
		<shorttitle><![CDATA[Main]]></shorttitle>
		<prefix><![CDATA[penguins-main]]></prefix>
		<streams>
			<stream bitrate="2000" level="1" />
			<stream bitrate="500" level="2" />
		</streams>
	</cam>
	<cam>
		<title><![CDATA[Underwater]]></title>
		<shorttitle><![CDATA[Underwater]]></shorttitle>
		<prefix><![CDATA[penguins-underwater]]></prefix>
		<streams>
			<stream bitrate="2000" level="1" />
			<stream bitrate="500" level="2" />
		</streams>
	</cam>
	<cam>
		<title><![CDATA[Biologist View]]></title>
		<shorttitle><![CDATA[Biologist]]></shorttitle>
		<prefix><![CDATA[penguins-biologist]]></prefix>
		<streams>
			<stream bitrate="2000" level="1" />
			<stream bitrate="500" level="2" />
		</streams>
	</cam>

	<?php

		require('DeviceData.php');

		// log device
		$deviceData = new DeviceData();

		// set SMS var
		$sms = $deviceData->isSmsCapable() ? '1' : '0';

	?>

	<constants>
		<trackingpulse><![CDATA[10000]]></trackingpulse>
		<timeoutduration><![CDATA[12000]]></timeoutduration>
		<connectattempts><![CDATA[3]]></connectattempts>
		<reconnectinterval><![CDATA[3000]]></reconnectinterval>
		<idletimeoutminutes><![CDATA[30]]></idletimeoutminutes>

		<buffertime><![CDATA[6]]></buffertime>
		<idlethreshold><![CDATA[5000]]></idlethreshold>
	    <smsurl><![CDATA[sms://20222]]></smsurl>
		<issmscapable><![CDATA[<?php echo $sms; ?>]]></issmscapable>
		<logourl><![CDATA[http://www.calacademy.org/apps/penguins/]]></logourl>

		<!-- <moneyaltframelabel><![CDATA[buy-tickets]]></moneyaltframelabel> -->
		<!-- <moneyalturl><![CDATA[http://www.calacademy.org/tickets/]]></moneyalturl> -->

		<moneyaltframelabel><![CDATA[donate-online]]></moneyaltframelabel>
		<moneyalturl><![CDATA[http://www.calacademy.org/donate]]></moneyalturl>

	</constants>

	<messages>

		<message id="logo-click">
			<title><![CDATA[Visit Us Online]]></title>
			<body><![CDATA[For general Academy information, purchasing tickets, feedback on this app, terms of service and more!]]></body>
		</message>

		<!-- <message id="alt-money">
			<title><![CDATA[Purchase Tickets]]></title>
			<body><![CDATA[Would you like to visit our<br>website to purchase museum tickets?]]></body>
		</message> -->

		<message id="alt-money">
			<title><![CDATA[Help Advance Our Mission]]></title>
			<body><![CDATA[Would you like to visit our<br>website to make a donation?]]></body>
		</message>

        <message id="sms">
			<title><![CDATA[Help Advance Our Mission]]></title>
			<body><![CDATA[Text PENGUINS to 20222<br>to donate $5. A charge will appear on your phone bill.]]></body>
		</message>
	</messages>
</cams>
