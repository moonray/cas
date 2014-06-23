<?php

	if (empty($output)) {
		// no slots, do some trickery
		$startTime = strtotime($row->_field_data['nid']['entity']->field_date[LANGUAGE_NONE][0]['value']);
		$startTime += _calacademy_date_get_timezone_offset($startTime);

		$output = date('g:i a', $startTime);

		// all day
		if ($output == '12:00 am') $output = '';
	} else {
		$arr = explode(', ', $output);

		array_walk($arr, function (&$item) {
			$time = strtotime($item);
			$item = date('g:i a', $time);
		});

		$output = implode(', ', $arr);
	}

	print $output;

?>
