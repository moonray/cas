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
	$nodeID = false;
  // Resolve the node id from the predefined id elements.
	if (isset($row->nid)) {
		// If there's a node id then use it
		$nodeID = $row->nid;
	} else if (isset($row->node_field_data_field_content_collection_items_nid)) {
		// If there is a Content Collection node id then use that instead
		$nodeID = $row->node_field_data_field_content_collection_items_nid;
	} else if (isset($row->node_taxonomy_term_data_nid)) {
		// If the item is the representative node of a term then use that
		$nodeID = $row->node_taxonomy_term_data_nid;
	}
	/**
	* Use an embedded view if necessary
	*/
//	if (count($row->field_field_hero_region) > 0 && is_array($row->field_field_hero_region[0]['rendered']['entity']))
	if (count($row->field_field_hero_region) > 0 && is_array($row->field_field_hero_region[0]['rendered']['entity']))
  {
		$output = _hero_media_thumbnail_output($row->field_field_hero_region[0]['rendered']['entity']['field_collection_item'][$row->field_field_hero_region[0]['raw']['value']], $output);
		$output = str_replace('square_900px/', 'square_460px/', $output);
	}
  else
  {
    // The Hero field is not set so let's handle some stuff manually.
    $myNode = node_load($nodeID);

    switch ($myNode->type)
    {
      case 'blog':
        $output = '<img src="' . file_create_url(image_style_path('manual_crop_square_460px', 'public://system/images/blog.jpg')) . '" />';
        break;
      // special handling of imported legacy Science Today WordPress posts 
      case 'explore_science_article':
      	$myBody = $myNode->body['und'][0]['value'];
      	$myPos1 = strpos($myBody, '"/sites/default/files/sciencetoday/');
	      $myPos2 = strpos($myBody, 'alt');
	      $myLength = $myPos2 - $myPos1;
	      if (($myPos1 !== false) && ($myPos2 !== false)) {
	      	$myImage = substr($myBody, $myPos1 + 22, $myLength - 24);
	      	$myImage = "public://" . $myImage;
	      	$output = '<img src="' . file_create_url(image_style_path('automatic_square_460px', $myImage)) . '" />';
	      }
        break;
    }
  }

	/**
	* Wrap image in a link
	*/
  if ($nodeID !== false) {
		$output = '<a href="/' . drupal_get_path_alias('node/' . $nodeID) . '">' . $output . '</a>';
	}

	/**
	* Embiggen the image rendition for the first row in
	* Explore Science Theme views
	*/
	if ($view->current_display == 'es_theme') {
		if ($view->row_index == 0) {
			$search = 'square_460px/';

			if (strpos($output, $search) !== false) {
				$output = str_replace($search, 'square_900px/', $output);
			}
		}
	}

	print '<!-- ' . basename(__FILE__) . ' //-->';
	print $output;
