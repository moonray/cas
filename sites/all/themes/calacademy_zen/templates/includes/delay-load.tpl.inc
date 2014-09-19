<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
?>
<?php

	$doc = new DOMDocument();
	$doc->loadHTML($output);
	$imgs = $doc->getElementsByTagName('img');

	foreach ($imgs as $img) {
		// reset source
		$img->setAttribute('data-src', $img->getAttribute('src'));
		$img->setAttribute('src', '/' . path_to_theme() . '/images/empty.gif');

		// add class
		$img->setAttribute('class', 'delay-load');
	}

	print preg_replace('/^<!DOCTYPE.+?>/', '', str_replace( array('<html>', '</html>', '<body>', '</body>'), array('', '', '', ''), $doc->saveHTML()));

?>
