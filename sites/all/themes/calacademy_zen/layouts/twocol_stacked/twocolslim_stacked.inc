<?php

// Plugin definition
$plugin = array(
  'title' => t('Two column stacked - slim right col'),
  'category' => t('Columns: 2'),
  'icon' => 'twocolslim_stacked.png',
  'theme' => 'twocolslim_stacked',
  'css' => 'twocolslim_stacked.css',
  'regions' => array(
    'top' => t('Top'),
    'left' => t('Left side'),
    'right' => t('Right side'),
    'bottom' => t('Bottom')
  ),
);
