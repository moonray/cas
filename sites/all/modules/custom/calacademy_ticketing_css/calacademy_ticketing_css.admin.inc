<?php

/**
 * Administration settings form.
 *
 * @see system_settings_form()
 */
function calacademy_ticketing_css_admin_settings() {
  global $base_url;

  $form['calacademy_ticketing_css_url'] = array(
    '#type' => 'textfield',
    '#field_prefix' => $base_url . '/',
    '#title' => t('Path to css'),
    '#default_value' => variable_get('calacademy_ticketing_css_url', CALACADEMY_TICKETING_CSS_DEFAULT_URL),
  );

  $form['calacademy_ticketing_css'] = array(
    '#type' => 'textarea',
    '#title' => t('Contents of ticketing css'),
    '#default_value' => variable_get('calacademy_ticketing_css', ''),
    '#cols' => 60,
    '#rows' => 20,
    '#wysiwyg' => FALSE,
  );

  $form['#submit'][] = 'calacademy_ticketing_css_admin_settings_submit';

  return system_settings_form($form);
}

/**
 * FormAPI submission callback for googlenews_admin_settings.
 */
function calacademy_ticketing_css_admin_settings_submit(&$form, &$form_state) {
  cache_clear_all('calacademy_ticketing_css', 'cache');

  // register new URL if specified
  variable_set('calacademy_ticketing_css_url', $form['calacademy_ticketing_css_url']['#value']);
  menu_rebuild();
}
