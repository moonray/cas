<?php

/**
 * @file
 * Implementation for the two column bricked layout
 */

// Plugin definition
$plugin = array(
  'title' => t('Two column bricks - Irregular Widths'),
  'category' => t('Columns: 2'),
  'icon' => 'twocol_irregular.png',
  'theme' => 'twocol_irregular',
  'css' => 'twocol_irregular.css',
  'regions' => array(
    'top' => t('Top'),
    'left_above' => t('Left above'),
    'right_above' => t('Right above'),
    'left_below' => t('Left below'),
    'right_below' => t('Right below'),
    'bottom' => t('Bottom'),
  ),
);

