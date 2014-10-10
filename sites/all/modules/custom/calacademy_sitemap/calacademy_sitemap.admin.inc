<?php

/**
 * @file
 * Administrative page callbacks for the calacademy_sitemap module.
 */

/**
 * Administration settings form.
 *
 * @see system_settings_form()
 */
function calacademy_sitemap_admin_settings() {
  $form['calacademy_sitemap'] = array(
    '#type' => 'textarea',
    '#title' => t('Contents of sitemap.xml'),
    '#default_value' => variable_get('calacademy_sitemap', ''),
    '#cols' => 60,
    '#rows' => 20,
    '#wysiwyg' => FALSE,
  );

  return system_settings_form($form);
}
