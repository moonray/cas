<?php
/**
 * PHP Error reporting -- Comment out to disable.
 * - DO NOT DELETE -
 */
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
//errpr_reporting(-1);
error_reporting(E_ALL ^ E_WARNING);

/**
 * @file
 * The PHP page that serves all page requests on a Drupal installation.
 *
 * The routines here dispatch control to the appropriate handler, which then
 * prints the appropriate page.
 *
 * All Drupal code is released under the GNU General Public License.
 * See COPYRIGHT.txt and LICENSE.txt.
 */

/**
 * Root directory of Drupal installation.
 */
define('DRUPAL_ROOT', getcwd());

require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
menu_execute_active_handler();
