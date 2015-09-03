<?php
/**
 * @file
 * calacademy_workbench_settings.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function calacademy_workbench_settings_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'access workbench'.
  $permissions['access workbench'] = array(
    'name' => 'access workbench',
    'roles' => array(
      'Content Editor base' => 'Content Editor base',
      'Content Publisher base' => 'Content Publisher base',
      'High level publisher' => 'High level publisher',
      'developer' => 'developer',
    ),
    'module' => 'workbench',
  );

  // Exported permission: 'administer workbench'.
  $permissions['administer workbench'] = array(
    'name' => 'administer workbench',
    'roles' => array(
      'developer' => 'developer',
    ),
    'module' => 'workbench',
  );

  // Exported permission: 'administer workbench moderation'.
  $permissions['administer workbench moderation'] = array(
    'name' => 'administer workbench moderation',
    'roles' => array(
      'developer' => 'developer',
    ),
    'module' => 'workbench_moderation',
  );

  // Exported permission: 'bypass workbench moderation'.
  $permissions['bypass workbench moderation'] = array(
    'name' => 'bypass workbench moderation',
    'roles' => array(
      'developer' => 'developer',
    ),
    'module' => 'workbench_moderation',
  );

  // Exported permission: 'moderate content from draft to needs_review'.
  $permissions['moderate content from draft to needs_review'] = array(
    'name' => 'moderate content from draft to needs_review',
    'roles' => array(
      'Content Editor base' => 'Content Editor base',
      'Content Publisher base' => 'Content Publisher base',
      'High level publisher' => 'High level publisher',
      'developer' => 'developer',
    ),
    'module' => 'workbench_moderation',
  );

  // Exported permission: 'moderate content from needs_review to draft'.
  $permissions['moderate content from needs_review to draft'] = array(
    'name' => 'moderate content from needs_review to draft',
    'roles' => array(
      'Content Editor base' => 'Content Editor base',
      'Content Publisher base' => 'Content Publisher base',
      'High level publisher' => 'High level publisher',
      'developer' => 'developer',
    ),
    'module' => 'workbench_moderation',
  );

  // Exported permission: 'moderate content from needs_review to published'.
  $permissions['moderate content from needs_review to published'] = array(
    'name' => 'moderate content from needs_review to published',
    'roles' => array(
      'Content Publisher base' => 'Content Publisher base',
      'High level publisher' => 'High level publisher',
      'developer' => 'developer',
    ),
    'module' => 'workbench_moderation',
  );

  // Exported permission: 'use workbench_moderation my drafts tab'.
  $permissions['use workbench_moderation my drafts tab'] = array(
    'name' => 'use workbench_moderation my drafts tab',
    'roles' => array(
      'Content Editor base' => 'Content Editor base',
      'Content Publisher base' => 'Content Publisher base',
      'High level publisher' => 'High level publisher',
      'developer' => 'developer',
    ),
    'module' => 'workbench_moderation',
  );

  // Exported permission: 'use workbench_moderation needs review tab'.
  $permissions['use workbench_moderation needs review tab'] = array(
    'name' => 'use workbench_moderation needs review tab',
    'roles' => array(
      'Content Publisher base' => 'Content Publisher base',
      'High level publisher' => 'High level publisher',
      'developer' => 'developer',
    ),
    'module' => 'workbench_moderation',
  );

  // Exported permission: 'view all unpublished content'.
  $permissions['view all unpublished content'] = array(
    'name' => 'view all unpublished content',
    'roles' => array(
      'Content Editor base' => 'Content Editor base',
      'Content Publisher base' => 'Content Publisher base',
      'High level publisher' => 'High level publisher',
      'developer' => 'developer',
    ),
    'module' => 'workbench_moderation',
  );

  // Exported permission: 'view moderation history'.
  $permissions['view moderation history'] = array(
    'name' => 'view moderation history',
    'roles' => array(
      'Content Editor base' => 'Content Editor base',
      'Content Publisher base' => 'Content Publisher base',
      'High level publisher' => 'High level publisher',
      'developer' => 'developer',
    ),
    'module' => 'workbench_moderation',
  );

  // Exported permission: 'view moderation messages'.
  $permissions['view moderation messages'] = array(
    'name' => 'view moderation messages',
    'roles' => array(
      'Content Editor base' => 'Content Editor base',
      'Content Publisher base' => 'Content Publisher base',
      'High level publisher' => 'High level publisher',
      'developer' => 'developer',
    ),
    'module' => 'workbench_moderation',
  );

  return $permissions;
}
