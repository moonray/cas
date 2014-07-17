<?php
/**
 * @file
 * cas_slideshow_hero.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function cas_slideshow_hero_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance: 'field_collection_item-field_slideshow_frame-field_bg_color'
  $field_instances['field_collection_item-field_slideshow_frame-field_bg_color'] = array(
    'bundle' => 'field_slideshow_frame',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Use this widget to select a solid background color for this slideshow frame.',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'color_field',
        'settings' => array(),
        'type' => 'color_field_default_formatter',
        'weight' => 7,
      ),
      'secondary_display' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'field_collection_item',
    'field_name' => 'field_bg_color',
    'label' => 'Background Color',
    'required' => 0,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'color_field',
      'settings' => array(
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
      ),
      'type' => 'color_field_spectrum_widget',
      'weight' => 7,
    ),
  );

  // Exported field_instance: 'node-slideshow_hero-field_slideshow_frame'
  $field_instances['node-slideshow_hero-field_slideshow_frame'] = array(
    'bundle' => 'slideshow_hero',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'contact_info' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
      'default' => array(
        'label' => 'hidden',
        'module' => 'field_collection',
        'settings' => array(
          'add' => '',
          'delete' => '',
          'description' => 0,
          'edit' => '',
          'view_mode' => 'full',
        ),
        'type' => 'field_collection_view',
        'weight' => 1,
      ),
      'exhibit_teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
      'secondary_display' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
      'teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'field_slideshow_frame',
    'label' => 'Slideshow Frame',
    'required' => 1,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'field_collection',
      'settings' => array(
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
      ),
      'type' => 'field_collection_embed',
      'weight' => 2,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Background Color');
  t('Slideshow Frame');
  t('Use this widget to select a solid background color for this slideshow frame.');

  return $field_instances;
}
