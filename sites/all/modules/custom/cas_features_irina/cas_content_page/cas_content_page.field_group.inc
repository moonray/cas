<?php
/**
 * @file
 * cas_content_page.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function cas_content_page_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_columns_with_context|node|content_page|form';
  $field_group->group_name = 'group_columns_with_context';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'content_page';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Columns With Context',
    'weight' => '8',
    'children' => array(
      0 => 'field_content_column',
      1 => 'field_tertiary_subhead',
      2 => 'field_summary',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Columns With Context',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => 'group-columns-with-context field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_columns_with_context|node|content_page|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_cta_links|field_collection_item|field_article_section|form';
  $field_group->group_name = 'group_cta_links';
  $field_group->entity_type = 'field_collection_item';
  $field_group->bundle = 'field_article_section';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_article_content';
  $field_group->data = array(
    'label' => 'Call To Action Links',
    'weight' => '4',
    'children' => array(
      0 => 'field_cta_link',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Call To Action Links',
      'instance_settings' => array(
        'required_fields' => 0,
        'classes' => 'group-cta-links field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'collapsed',
    ),
  );
  $export['group_cta_links|field_collection_item|field_article_section|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_related_content_section|node|content_page|form';
  $field_group->group_name = 'group_related_content_section';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'content_page';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Related Content Section',
    'weight' => '7',
    'children' => array(
      0 => 'field_related_content_tags',
      1 => 'field_related_content_subtitle',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Related Content Section',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => 'group-related-content-section field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_related_content_section|node|content_page|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_related_pages|node|content_page|form';
  $field_group->group_name = 'group_related_pages';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'content_page';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Related Pages Section',
    'weight' => '9',
    'children' => array(
      0 => 'field_related_pages_tags',
      1 => 'field_related_pages_subtitle',
      2 => 'field_related_pages_description',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Related Pages Section',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => 'group-related-pages field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_related_pages|node|content_page|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_title_settings|node|content_page|form';
  $field_group->group_name = 'group_title_settings';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'content_page';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Title & Description',
    'weight' => '0',
    'children' => array(
      0 => 'field_tags',
      1 => 'body',
      2 => 'field_hero_region',
      3 => 'field_cta_buttons',
      4 => 'title',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Title & Description',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => 'group-title-settings field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_title_settings|node|content_page|form'] = $field_group;

  return $export;
}
