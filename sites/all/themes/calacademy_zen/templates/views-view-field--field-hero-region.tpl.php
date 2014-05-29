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
// Save the original output for later use.
$originalOutput = $output;
/**
 * PHP in templates is clunky but was done in the interest of time.
 */
//Only get the hero region if it is an array.
if (count($row->field_field_hero_region) > 0 && is_array($row->field_field_hero_region[0]['rendered']['entity']))
{
  // Get the Hero Region object to avoid two array_shift/value calls.
  $heroRegion = $row->field_field_hero_region[0]['rendered']['entity']['field_collection_item'][$row->field_field_hero_region[0]['raw']['value']];
}

// Only perform the output modification on items set to use a slideshow.
if (isset($heroRegion['field_hero_slideshow']) || isset($heroRegion['field_hero_slideshow_large']) || isset($heroRegion['field_youtube_video']))
{
  // Get the thumbnail output for the slideshow field.
  $output = _hero_media_thumbnail_output($row->field_field_hero_region[0]['rendered']['entity']['field_collection_item'][$row->field_field_hero_region[0]['raw']['value']], $output);
}
// If there's a node id then use it.
if (isset($row->nid))
{
  $nodeID = $row->nid;
}// If there is a Content Collection node id then use that instead.
elseif (isset($row->node_field_data_field_content_collection_items_nid))
{
  $nodeID = $row->node_field_data_field_content_collection_items_nid;
}// If the item is the representative node of a term then use that.
elseif (isset($row->node_taxonomy_term_data_nid))
{
  $nodeID = $row->node_taxonomy_term_data_nid;
}
// Link the thumbnail image to its respective node.
$output = '<a href="/' . drupal_get_path_alias('node/' . $nodeID) . '">' . $output . '</a>';
?>
<?php 
// embiggen the image rendition for the first row in Explore Science Theme views
if ($view->current_display == 'es_theme') {
  if ($view->row_index == 0) {
    $search = 'styles/manual_crop_square_460px';

    if (strpos($output, $search) !== false) {
      print '<!-- ' . basename(__FILE__) . ' //-->';
      print '<!-- changing image rendition //-->';

      $output = str_replace($search, 'styles/manual_crop_square_900px', $output);
    }
  }
}

print $output;