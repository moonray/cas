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
// Get the Hero Region object to avoid two array_shift/value calls.
$heroRegion = array_shift(array_values($row->field_field_hero_region[0]['rendered']['entity']['field_collection_item']));
// Only perform the output modification on items set to use a slideshow.
if (isset($heroRegion['field_hero_slideshow']) || isset($heroRegion['field_hero_slideshow_large']))
{
  // Get the thumbnail output.
  $output = _hero_media_output(array_pop($row->field_field_hero_region[0]['rendered']['entity']['field_collection_item']), $output);
}
?>
<?php print $output; ?>
