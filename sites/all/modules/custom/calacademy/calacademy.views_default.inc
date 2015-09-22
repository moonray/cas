<?php
/**
 * @file
 * calacademy.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function calacademy_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'hero_media_revision';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node_revision';
  $view->human_name = 'Hero Media (Revision)';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'role';
  $handler->display->display_options['access']['role'] = array(
    4 => '4',
    1 => '1',
    2 => '2',
    5 => '5',
    8 => '8',
    6 => '6',
    3 => '3',
  );
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'flexslider';
  $handler->display->display_options['style_options']['optionset'] = 'midfeature_slideshow';
  $handler->display->display_options['style_options']['captionfield'] = 'nothing';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['format'] = 'filtered_html';
  /* Relationship: Content (historical data): Hero Region (field_hero_region:revision_id) */
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['id'] = 'field_hero_region_revision_id';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['table'] = 'field_revision_field_hero_region';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['field'] = 'field_hero_region_revision_id';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['required'] = TRUE;
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['delta'] = '-1';
  /* Field: Content revision: Title */
  $handler->display->display_options['fields']['title_1']['id'] = 'title_1';
  $handler->display->display_options['fields']['title_1']['table'] = 'node_revision';
  $handler->display->display_options['fields']['title_1']['field'] = 'title';
  /* Contextual filter: Content revision: Vid */
  $handler->display->display_options['arguments']['vid']['id'] = 'vid';
  $handler->display->display_options['arguments']['vid']['table'] = 'node_revision';
  $handler->display->display_options['arguments']['vid']['field'] = 'vid';
  $handler->display->display_options['arguments']['vid']['default_action'] = 'empty';
  $handler->display->display_options['arguments']['vid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['vid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['vid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['vid']['summary_options']['items_per_page'] = '25';

  /* Display: Image - Standard */
  $handler = $view->new_display('panel_pane', 'Image - Standard', 'standard_hero_image_pane');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content (historical data): Hero Region (field_hero_region:revision_id) */
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['id'] = 'field_hero_region_revision_id';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['table'] = 'field_revision_field_hero_region';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['field'] = 'field_hero_region_revision_id';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['delta'] = '0';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field (historical data): Primary Image */
  $handler->display->display_options['fields']['field_image_primary-revision_id']['id'] = 'field_image_primary-revision_id';
  $handler->display->display_options['fields']['field_image_primary-revision_id']['table'] = 'field_revision_field_image_primary';
  $handler->display->display_options['fields']['field_image_primary-revision_id']['field'] = 'field_image_primary-revision_id';
  $handler->display->display_options['fields']['field_image_primary-revision_id']['relationship'] = 'field_hero_region_revision_id';
  $handler->display->display_options['fields']['field_image_primary-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_image_primary-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_image_primary-revision_id']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_image_primary-revision_id']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_image_primary-revision_id']['settings'] = array(
    'image_style' => 'manual_crop_standard_960x540',
    'image_link' => '',
  );
  /* Field: Image field caption (historical data): Primary Image (caption) */
  $handler->display->display_options['fields']['caption']['id'] = 'caption';
  $handler->display->display_options['fields']['caption']['table'] = 'field_image_primary_field_image_field_caption_revision';
  $handler->display->display_options['fields']['caption']['field'] = 'caption';
  $handler->display->display_options['fields']['caption']['relationship'] = 'field_hero_region_revision_id';
  $handler->display->display_options['fields']['caption']['label'] = '';
  $handler->display->display_options['fields']['caption']['exclude'] = TRUE;
  $handler->display->display_options['fields']['caption']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['caption']['hide_empty'] = TRUE;
  $handler->display->display_options['argument_input'] = array(
    'vid' => array(
      'type' => 'user',
      'context' => 'entity:node.vid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content revision: VID',
    ),
  );

  /* Display: Image - Large */
  $handler = $view->new_display('panel_pane', 'Image - Large', 'large_hero_image_pane');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content (historical data): Hero Region (field_hero_region:revision_id) */
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['id'] = 'field_hero_region_revision_id';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['table'] = 'field_revision_field_hero_region';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['field'] = 'field_hero_region_revision_id';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['delta'] = '0';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field collection item (historical data): Large Image */
  $handler->display->display_options['fields']['field_image_primary_large-revision_id']['id'] = 'field_image_primary_large-revision_id';
  $handler->display->display_options['fields']['field_image_primary_large-revision_id']['table'] = 'field_revision_field_image_primary_large';
  $handler->display->display_options['fields']['field_image_primary_large-revision_id']['field'] = 'field_image_primary_large-revision_id';
  $handler->display->display_options['fields']['field_image_primary_large-revision_id']['relationship'] = 'field_hero_region_revision_id';
  $handler->display->display_options['fields']['field_image_primary_large-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_image_primary_large-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_image_primary_large-revision_id']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_image_primary_large-revision_id']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_image_primary_large-revision_id']['settings'] = array(
    'image_style' => 'manual_crop_large_1920x970',
    'image_link' => '',
  );
  /* Field: Image field caption (historical data): Large Image (caption) */
  $handler->display->display_options['fields']['caption_1']['id'] = 'caption_1';
  $handler->display->display_options['fields']['caption_1']['table'] = 'field_image_primary_large_field_image_field_caption_revision';
  $handler->display->display_options['fields']['caption_1']['field'] = 'caption';
  $handler->display->display_options['fields']['caption_1']['relationship'] = 'field_hero_region_revision_id';
  $handler->display->display_options['fields']['caption_1']['label'] = '';
  $handler->display->display_options['fields']['caption_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['caption_1']['hide_empty'] = TRUE;
  $handler->display->display_options['argument_input'] = array(
    'vid' => array(
      'type' => 'user',
      'context' => 'entity:comment.author',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content revision: VID',
    ),
  );

  /* Display: Slideshow - Standard */
  $handler = $view->new_display('panel_pane', 'Slideshow - Standard', 'slideshow_standard');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content (historical data): Hero Region (field_hero_region:revision_id) */
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['id'] = 'field_hero_region_revision_id';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['table'] = 'field_revision_field_hero_region';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['field'] = 'field_hero_region_revision_id';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['required'] = TRUE;
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['delta'] = '0';
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_hero_slideshow_target_id']['id'] = 'field_hero_slideshow_target_id';
  $handler->display->display_options['relationships']['field_hero_slideshow_target_id']['table'] = 'field_revision_field_hero_slideshow';
  $handler->display->display_options['relationships']['field_hero_slideshow_target_id']['field'] = 'field_hero_slideshow_target_id';
  $handler->display->display_options['relationships']['field_hero_slideshow_target_id']['relationship'] = 'field_hero_region_revision_id';
  $handler->display->display_options['relationships']['field_hero_slideshow_target_id']['required'] = TRUE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['relationship'] = 'field_hero_slideshow_target_id';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  $handler->display->display_options['argument_input'] = array(
    'vid' => array(
      'type' => 'user',
      'context' => 'entity:comment.author',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content revision: VID',
    ),
  );

  /* Display: Slideshow - Large */
  $handler = $view->new_display('panel_pane', 'Slideshow - Large', 'slideshow_large');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content (historical data): Hero Region (field_hero_region:revision_id) */
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['id'] = 'field_hero_region_revision_id';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['table'] = 'field_revision_field_hero_region';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['field'] = 'field_hero_region_revision_id';
  $handler->display->display_options['relationships']['field_hero_region_revision_id']['delta'] = '0';
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_hero_slideshow_large_target_id']['id'] = 'field_hero_slideshow_large_target_id';
  $handler->display->display_options['relationships']['field_hero_slideshow_large_target_id']['table'] = 'field_revision_field_hero_slideshow_large';
  $handler->display->display_options['relationships']['field_hero_slideshow_large_target_id']['field'] = 'field_hero_slideshow_large_target_id';
  $handler->display->display_options['relationships']['field_hero_slideshow_large_target_id']['relationship'] = 'field_hero_region_revision_id';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['relationship'] = 'field_hero_slideshow_large_target_id';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['element_type'] = '0';
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nid']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['nid']['hide_empty'] = TRUE;
  $handler->display->display_options['argument_input'] = array(
    'vid' => array(
      'type' => 'user',
      'context' => 'entity:comment.author',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content revision: VID',
    ),
  );

  /* Display: Image - Standard (Thumbnail) */
  $handler = $view->new_display('panel_pane', 'Image - Standard (Thumbnail)', 'standard_hero_image_pane_thumbnail');
  $handler->display->display_options['display_description'] = 'Thumbnail rendition of image standard for use in certain node variants, e.g. Person';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content: Hero Region (field_hero_region) */
  $handler->display->display_options['relationships']['field_hero_region_value']['id'] = 'field_hero_region_value';
  $handler->display->display_options['relationships']['field_hero_region_value']['table'] = 'field_data_field_hero_region';
  $handler->display->display_options['relationships']['field_hero_region_value']['field'] = 'field_hero_region_value';
  $handler->display->display_options['relationships']['field_hero_region_value']['delta'] = '0';
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_hero_slideshow_target_id']['id'] = 'field_hero_slideshow_target_id';
  $handler->display->display_options['relationships']['field_hero_slideshow_target_id']['table'] = 'field_data_field_hero_slideshow';
  $handler->display->display_options['relationships']['field_hero_slideshow_target_id']['field'] = 'field_hero_slideshow_target_id';
  $handler->display->display_options['relationships']['field_hero_slideshow_target_id']['relationship'] = 'field_hero_region_value';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Primary Image */
  $handler->display->display_options['fields']['field_image_primary']['id'] = 'field_image_primary';
  $handler->display->display_options['fields']['field_image_primary']['table'] = 'field_data_field_image_primary';
  $handler->display->display_options['fields']['field_image_primary']['field'] = 'field_image_primary';
  $handler->display->display_options['fields']['field_image_primary']['relationship'] = 'field_hero_region_value';
  $handler->display->display_options['fields']['field_image_primary']['label'] = '';
  $handler->display->display_options['fields']['field_image_primary']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_image_primary']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_image_primary']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_image_primary']['settings'] = array(
    'image_style' => 'manual_crop_square_460px',
    'image_link' => '',
  );
  $handler->display->display_options['argument_input'] = array(
    'vid' => array(
      'type' => 'user',
      'context' => 'entity:comment.author',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content revision: VID',
    ),
  );

  /* Display: Slideshow - Standard (Thumbnail) */
  $handler = $view->new_display('panel_pane', 'Slideshow - Standard (Thumbnail)', 'standard_slideshow_thumbnail');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content (historical data): Slideshow Frame (field_slideshow_frame:revision_id) */
  $handler->display->display_options['relationships']['field_slideshow_frame_revision_id']['id'] = 'field_slideshow_frame_revision_id';
  $handler->display->display_options['relationships']['field_slideshow_frame_revision_id']['table'] = 'field_revision_field_slideshow_frame';
  $handler->display->display_options['relationships']['field_slideshow_frame_revision_id']['field'] = 'field_slideshow_frame_revision_id';
  $handler->display->display_options['relationships']['field_slideshow_frame_revision_id']['delta'] = '0';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field collection item (historical data): Background image */
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['id'] = 'field_slideshow_frame_bg_image-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['table'] = 'field_revision_field_slideshow_frame_bg_image';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['field'] = 'field_slideshow_frame_bg_image-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['relationship'] = 'field_slideshow_frame_revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_type'] = '0';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['settings'] = array(
    'image_style' => 'automatic_square_460px',
    'image_link' => '',
  );
  $handler->display->display_options['argument_input'] = array(
    'vid' => array(
      'type' => 'user',
      'context' => 'entity:comment.author',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content revision: VID',
    ),
  );

  /* Display: Slideshow - Large (Thumbnail) */
  $handler = $view->new_display('panel_pane', 'Slideshow - Large (Thumbnail)', 'large_slideshow_thumbnail');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content (historical data): Slideshow Frame (field_slideshow_frame_large:revision_id) */
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['id'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['table'] = 'field_revision_field_slideshow_frame_large';
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['field'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['delta'] = '0';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field collection item (historical data): Background image */
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['id'] = 'field_slideshow_frame_bg_image-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['table'] = 'field_revision_field_slideshow_frame_bg_image';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['field'] = 'field_slideshow_frame_bg_image-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['relationship'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_type'] = '0';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['settings'] = array(
    'image_style' => 'manual_crop_square_460px',
    'image_link' => '',
  );
  $handler->display->display_options['argument_input'] = array(
    'vid' => array(
      'type' => 'user',
      'context' => 'entity:comment.author',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content revision: VID',
    ),
  );

  /* Display: Slideshow - Standard (Token) */
  $handler = $view->new_display('panel_pane', 'Slideshow - Standard (Token)', 'standard_slideshow_token');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['empty'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content (historical data): Slideshow Frame (field_slideshow_frame:revision_id) */
  $handler->display->display_options['relationships']['field_slideshow_frame_revision_id']['id'] = 'field_slideshow_frame_revision_id';
  $handler->display->display_options['relationships']['field_slideshow_frame_revision_id']['table'] = 'field_revision_field_slideshow_frame';
  $handler->display->display_options['relationships']['field_slideshow_frame_revision_id']['field'] = 'field_slideshow_frame_revision_id';
  $handler->display->display_options['relationships']['field_slideshow_frame_revision_id']['delta'] = '0';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field collection item (historical data): Background image */
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['id'] = 'field_slideshow_frame_bg_image-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['table'] = 'field_revision_field_slideshow_frame_bg_image';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['field'] = 'field_slideshow_frame_bg_image-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['relationship'] = 'field_slideshow_frame_revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_type'] = '0';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['settings'] = array(
    'image_style' => '',
    'image_link' => '',
  );
  $handler->display->display_options['argument_input'] = array(
    'vid' => array(
      'type' => 'user',
      'context' => 'entity:comment.author',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content revision: VID',
    ),
  );

  /* Display: Slideshow - Large (Token) */
  $handler = $view->new_display('panel_pane', 'Slideshow - Large (Token)', 'large_slideshow_token');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['empty'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content (historical data): Slideshow Frame (field_slideshow_frame_large:revision_id) */
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['id'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['table'] = 'field_revision_field_slideshow_frame_large';
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['field'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['delta'] = '0';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field collection item (historical data): Background image */
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['id'] = 'field_slideshow_frame_bg_image-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['table'] = 'field_revision_field_slideshow_frame_bg_image';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['field'] = 'field_slideshow_frame_bg_image-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['relationship'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_type'] = '0';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['settings'] = array(
    'image_style' => '',
    'image_link' => '',
  );
  $handler->display->display_options['argument_input'] = array(
    'vid' => array(
      'type' => 'user',
      'context' => 'entity:comment.author',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content revision: VID',
    ),
  );

  /* Display: Slideshow - Large (Block) */
  $handler = $view->new_display('block', 'Slideshow - Large (Block)', 'block_1');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'slideshow-hero-large';
  $handler->display->display_options['display_description'] = 'To be used as one-off blocks, dropped into pages as-needed.';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'flexslider';
  $handler->display->display_options['style_options']['optionset'] = 'hero_large';
  $handler->display->display_options['style_options']['captionfield'] = 'nothing';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['empty'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content (historical data): Slideshow Frame (field_slideshow_frame_large:revision_id) */
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['id'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['table'] = 'field_revision_field_slideshow_frame_large';
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['field'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['relationships']['field_slideshow_frame_large_revision_id']['delta'] = '-1';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field collection item (historical data): Background image */
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['id'] = 'field_slideshow_frame_bg_image-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['table'] = 'field_revision_field_slideshow_frame_bg_image';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['field'] = 'field_slideshow_frame_bg_image-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['relationship'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_slideshow_frame_bg_image-revision_id']['settings'] = array(
    'image_style' => 'manual_crop_large_1920x970',
    'image_link' => '',
  );
  /* Field: Field collection item (historical data): Frame Title */
  $handler->display->display_options['fields']['field_slideshow_frame_title-revision_id']['id'] = 'field_slideshow_frame_title-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_title-revision_id']['table'] = 'field_revision_field_slideshow_frame_title';
  $handler->display->display_options['fields']['field_slideshow_frame_title-revision_id']['field'] = 'field_slideshow_frame_title-revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_title-revision_id']['relationship'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['fields']['field_slideshow_frame_title-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_slideshow_frame_title-revision_id']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_slideshow_frame_title-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_slideshow_frame_title-revision_id']['hide_empty'] = TRUE;
  /* Field: Field collection item (historical data): Slideshow Text Display Style */
  $handler->display->display_options['fields']['field_slideshow_large_text_displ-revision_id']['id'] = 'field_slideshow_large_text_displ-revision_id';
  $handler->display->display_options['fields']['field_slideshow_large_text_displ-revision_id']['table'] = 'field_revision_field_slideshow_large_text_displ';
  $handler->display->display_options['fields']['field_slideshow_large_text_displ-revision_id']['field'] = 'field_slideshow_large_text_displ-revision_id';
  $handler->display->display_options['fields']['field_slideshow_large_text_displ-revision_id']['relationship'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['fields']['field_slideshow_large_text_displ-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_slideshow_large_text_displ-revision_id']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_slideshow_large_text_displ-revision_id']['element_label_colon'] = FALSE;
  /* Field: Field (historical data): Link */
  $handler->display->display_options['fields']['field_link-revision_id']['id'] = 'field_link-revision_id';
  $handler->display->display_options['fields']['field_link-revision_id']['table'] = 'field_revision_field_link';
  $handler->display->display_options['fields']['field_link-revision_id']['field'] = 'field_link-revision_id';
  $handler->display->display_options['fields']['field_link-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_link-revision_id']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_link-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_link-revision_id']['click_sort_column'] = 'url';
  /* Field: Field collection item (historical data): Link Color */
  $handler->display->display_options['fields']['field_highlight_color-revision_id']['id'] = 'field_highlight_color-revision_id';
  $handler->display->display_options['fields']['field_highlight_color-revision_id']['table'] = 'field_revision_field_highlight_color';
  $handler->display->display_options['fields']['field_highlight_color-revision_id']['field'] = 'field_highlight_color-revision_id';
  $handler->display->display_options['fields']['field_highlight_color-revision_id']['relationship'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['fields']['field_highlight_color-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_highlight_color-revision_id']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_highlight_color-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_highlight_color-revision_id']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<div class="[field_highlight_color]">
<div class="field_slideshow_frame_title">[field_slideshow_frame_title-revision_id]</div>
<div class="field_link">[field_link-revision_id]</div>
<div class="field_slideshow_large_text_displ">[field_slideshow_large_text_displ-revision_id]</div>
</div>';
  $handler->display->display_options['fields']['nothing']['element_type'] = 'div';
  $handler->display->display_options['fields']['nothing']['element_class'] = 'slide-text';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['nothing']['hide_empty'] = TRUE;
  /* Field: Field collection item (historical data): SVG file */
  $handler->display->display_options['fields']['field_svg_overlay-revision_id']['id'] = 'field_svg_overlay-revision_id';
  $handler->display->display_options['fields']['field_svg_overlay-revision_id']['table'] = 'field_revision_field_svg_overlay';
  $handler->display->display_options['fields']['field_svg_overlay-revision_id']['field'] = 'field_svg_overlay-revision_id';
  $handler->display->display_options['fields']['field_svg_overlay-revision_id']['relationship'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['fields']['field_svg_overlay-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_svg_overlay-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_svg_overlay-revision_id']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_svg_overlay-revision_id']['type'] = 'file_url_plain';
  /* Field: Field collection item (historical data): Link */
  $handler->display->display_options['fields']['field_title_link-revision_id']['id'] = 'field_title_link-revision_id';
  $handler->display->display_options['fields']['field_title_link-revision_id']['table'] = 'field_revision_field_title_link';
  $handler->display->display_options['fields']['field_title_link-revision_id']['field'] = 'field_title_link-revision_id';
  $handler->display->display_options['fields']['field_title_link-revision_id']['relationship'] = 'field_slideshow_frame_large_revision_id';
  $handler->display->display_options['fields']['field_title_link-revision_id']['label'] = '';
  $handler->display->display_options['fields']['field_title_link-revision_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_title_link-revision_id']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_title_link-revision_id']['type'] = 'link_plain';
  $export['hero_media_revision'] = $view;

  return $export;
}
