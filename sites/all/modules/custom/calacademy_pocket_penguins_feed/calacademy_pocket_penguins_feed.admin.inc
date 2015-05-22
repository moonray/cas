<?php

define('CALACADEMY_POCKET_PENGUINS_FEED_NUM_FEEDS', 3);

function calacademy_pocket_penguins_feed_admin_settings() {
  $val = variable_get('calacademy_pocket_penguins_feed_streams');

  $form['calacademy_pocket_penguins_feed_streams'] = array(
    '#type' => 'container',
    '#tree' => TRUE,
  );

  $i = 0;
  
  while ($i < CALACADEMY_POCKET_PENGUINS_FEED_NUM_FEEDS) {
    $defaultStreamName = '';
    $defaultStreamId = '';

    if (isset($val[$i])) {
      if (isset($val[$i]['label'])) {
        $defaultStreamName = $val[$i]['label'];
      }
      if (isset($val[$i]['id'])) {
        $defaultStreamId = $val[$i]['id'];
      }
    } 

    $form['calacademy_pocket_penguins_feed_streams'][$i] = array(
      '#type' => 'fieldset',
      '#tree' => TRUE,
    );

    $form['calacademy_pocket_penguins_feed_streams'][$i]['label'] = array(
      '#title' => t('Label'),
      '#type' => 'textfield',
      '#default_value' => $defaultStreamName,
    );
    $form['calacademy_pocket_penguins_feed_streams'][$i]['id'] = array(
      '#title' => t('YouTube ID'),
      '#type' => 'textfield',
      '#default_value' => $defaultStreamId,
    );

    $i++;
  }

  return system_settings_form($form);
}
