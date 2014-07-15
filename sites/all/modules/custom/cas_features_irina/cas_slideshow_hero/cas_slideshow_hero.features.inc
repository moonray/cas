<?php
/**
 * @file
 * cas_slideshow_hero.features.inc
 */

/**
 * Implements hook_node_info().
 */
function cas_slideshow_hero_node_info() {
  $items = array(
    'slideshow_hero' => array(
      'name' => t('Slideshow - Hero'),
      'base' => 'node_content',
      'description' => t('A <strong>Slideshow</strong> with dynamic image style detection for flexible use across the site.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => t('This slideshow has the capability for multiple image cropping styles, it is <strong>very important</strong> that you use the same cropping style for all <em>Slideshow Frame</em> images when creating or editing this content.'),
    ),
  );
  return $items;
}
