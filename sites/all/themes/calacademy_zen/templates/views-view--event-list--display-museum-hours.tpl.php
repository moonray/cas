<?php

	print '<h3>' . date('l F j') . '</h3>';

	$events = calacademy_date_normalize_view_result($view);
	require_once('classes/CalendarViewMini.php');
	$foo = new CalendarViewMini($events);
	print $foo->getMarkup();

?>
