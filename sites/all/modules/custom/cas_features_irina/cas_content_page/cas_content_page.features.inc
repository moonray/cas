<?php
/**
 * @file
 * cas_content_page.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function cas_content_page_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function cas_content_page_node_info() {
  $items = array(
    'content_page' => array(
      'name' => t('Content Page'),
      'base' => 'node_content',
      'description' => t('This content type is set to handle content rich pages.  Lots of opportunity to add text and images, good for long form articles.  Any fields that aren\'t filled out will not be displayed, allowing for a wide amount of expression.'),
      'has_title' => '1',
      'title_label' => t('Page Title'),
      'help' => '',
    ),
  );
  return $items;
}
