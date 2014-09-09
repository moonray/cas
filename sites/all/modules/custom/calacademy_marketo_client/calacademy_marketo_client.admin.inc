<?php

/**
 * Form builder; administration settings.
 */

function calacademy_marketo_client_admin_settings() {
  $form['help'] = array(
    '#markup' => '<p>' . t('Marketo REST API Credentials') . '</p>',
  );

  require_once(dirname(__FILE__) . '/calacademy_marketo_client.config.inc');

  foreach ($calacademy_marketo_client_config as $key => $val) {
    $form['calacademy_marketo_client_' . $key] = array(
      '#type' => 'textfield',
      '#title' => t($val),
      '#default_value' => variable_get('calacademy_marketo_client_' . $key),
    );
  }

  return system_settings_form($form);
}
