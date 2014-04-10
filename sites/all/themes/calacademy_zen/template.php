<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * A QUICK OVERVIEW OF DRUPAL THEMING
 *
 *   The default HTML for all of Drupal's markup is specified by its modules.
 *   For example, the comment.module provides the default HTML markup and CSS
 *   styling that is wrapped around each comment. Fortunately, each piece of
 *   markup can optionally be overridden by the theme.
 *
 *   Drupal deals with each chunk of content using a "theme hook". The raw
 *   content is placed in PHP variables and passed through the theme hook, which
 *   can either be a template file (which you should already be familiary with)
 *   or a theme function. For example, the "comment" theme hook is implemented
 *   with a comment.tpl.php template file, but the "breadcrumb" theme hooks is
 *   implemented with a theme_breadcrumb() theme function. Regardless if the
 *   theme hook uses a template file or theme function, the template or function
 *   does the same kind of work; it takes the PHP variables passed to it and
 *   wraps the raw content with the desired HTML markup.
 *
 *   Most theme hooks are implemented with template files. Theme hooks that use
 *   theme functions do so for performance reasons - theme_field() is faster
 *   than a field.tpl.php - or for legacy reasons - theme_breadcrumb() has "been
 *   that way forever."
 *
 *   The variables used by theme functions or template files come from a handful
 *   of sources:
 *   - the contents of other theme hooks that have already been rendered into
 *     HTML. For example, the HTML from theme_breadcrumb() is put into the
 *     $breadcrumb variable of the page.tpl.php template file.
 *   - raw data provided directly by a module (often pulled from a database)
 *   - a "render element" provided directly by a module. A render element is a
 *     nested PHP array which contains both content and meta data with hints on
 *     how the content should be rendered. If a variable in a template file is a
 *     render element, it needs to be rendered with the render() function and
 *     then printed using:
 *       <?php print render($variable); ?>
 *
 * ABOUT THE TEMPLATE.PHP FILE
 *
 *   The template.php file is one of the most useful files when creating or
 *   modifying Drupal themes. With this file you can do three things:
 *   - Modify any theme hooks variables or add your own variables, using
 *     preprocess or process functions.
 *   - Override any theme function. That is, replace a module's default theme
 *     function with one you write.
 *   - Call hook_*_alter() functions which allow you to alter various parts of
 *     Drupal's internals, including the render elements in forms. The most
 *     useful of which include hook_form_alter(), hook_form_FORM_ID_alter(),
 *     and hook_page_alter(). See api.drupal.org for more information about
 *     _alter functions.
 *
 * OVERRIDING THEME FUNCTIONS
 *
 *   If a theme hook uses a theme function, Drupal will use the default theme
 *   function unless your theme overrides it. To override a theme function, you
 *   have to first find the theme function that generates the output. (The
 *   api.drupal.org website is a good place to find which file contains which
 *   function.) Then you can copy the original function in its entirety and
 *   paste it in this template.php file, changing the prefix from theme_ to
 *   calacademy_zen_. For example:
 *
 *     original, found in modules/field/field.module: theme_field()
 *     theme override, found in template.php: calacademy_zen_field()
 *
 *   where calacademy_zen is the name of your sub-theme. For example, the
 *   zen_classic theme would define a zen_classic_field() function.
 *
 *   Note that base themes can also override theme functions. And those
 *   overrides will be used by sub-themes unless the sub-theme chooses to
 *   override again.
 *
 *   Zen core only overrides one theme function. If you wish to override it, you
 *   should first look at how Zen core implements this function:
 *     theme_breadcrumbs()      in zen/template.php
 *
 *   For more information, please visit the Theme Developer's Guide on
 *   Drupal.org: http://drupal.org/node/173880
 *
 * CREATE OR MODIFY VARIABLES FOR YOUR THEME
 *
 *   Each tpl.php template file has several variables which hold various pieces
 *   of content. You can modify those variables (or add new ones) before they
 *   are used in the template files by using preprocess functions.
 *
 *   This makes THEME_preprocess_HOOK() functions the most powerful functions
 *   available to themers.
 *
 *   It works by having one preprocess function for each template file or its
 *   derivatives (called theme hook suggestions). For example:
 *     THEME_preprocess_page    alters the variables for page.tpl.php
 *     THEME_preprocess_node    alters the variables for node.tpl.php or
 *                              for node--forum.tpl.php
 *     THEME_preprocess_comment alters the variables for comment.tpl.php
 *     THEME_preprocess_block   alters the variables for block.tpl.php
 *
 *   For more information on preprocess functions and theme hook suggestions,
 *   please visit the Theme Developer's Guide on Drupal.org:
 *   http://drupal.org/node/223440 and http://drupal.org/node/1089656
 */

/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
function calacademy_zen_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  calacademy_zen_preprocess_html($variables, $hook);
  calacademy_zen_preprocess_page($variables, $hook);
}
// */

function calacademy_zen_views_pre_render (&$view){
  switch ($view->name) {
    case 'taxonomy_terms':
      // if the upcoming lecture series has nothing upcoming,
      // suppress view output
      _calacademy_zen_remove_empty_lecture_series($view);
      break;


  }
}

function _calacademy_zen_remove_empty_lecture_series (&$view) {
  foreach ($view->result as $key => $val) {
    $events = views_get_view_result('event_list_of_parent_type', 'panel_pane_1', $val->tid);

    if (empty($events)) {
      unset($view->result[$key]);
    }
  }
}

/**
* Alter panel content programmatically
* @author grotter
*/
function calacademy_zen_preprocess_panels_pane(&$variables) {
  switch ($variables['pane']->subtype) {
    case 'nightlife_upcoming-next_upcoming_nl':
    
      // Switch title from "This Week" to "Our Next NightLife" on Fridays and Saturdays
      if (date('w') >= 5) {
        $variables['title'] = '<!--  calacademy_zen_preprocess_panels_pane //-->Our Next NightLife';
      }

      break;
  }
}

/**
* Add unique class to all menu items.
* with Menu title as class
* @author grotter
*/
function calacademy_zen_menu_link(array $variables) {
  $name_id = strtolower(strip_tags($variables['element']['#title']));
  $name_id = preg_replace('/[^a-z]+/', '', $name_id);
  $class = 'calacademy-menu-' . $name_id;

  //add class for li
  $variables['element']['#attributes']['class'][] = $class;
  
  //add class for a
  $variables['element']['#localized_options']['attributes']['class'][] = $class;
  
  return theme_menu_link($variables);
}

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */

function calacademy_zen_preprocess_html(&$variables, $hook) {
  $google_webmasters_verification = array(
		'#type' => 'html_tag',
		'#tag' => 'meta',
		'#attributes' => array(
			'name' => 'google-site-verification',
			'content' => 'a65a6201b7d6ad73-b5620e5f636351da-gc6e124f28931b910-12',
		)
	);

	drupal_add_html_head($google_webmasters_verification, 'google_webmasters_verification');
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */

function calacademy_zen_preprocess_page(&$variables, $hook) {
  drupal_add_css('http://cloud.typography.com/6161652/769662/css/fonts.css', array(
    'type' => 'external'
  ));

  // @todo
	// load these conditionally

  $cssOptions = array('group' => CSS_THEME);

  drupal_add_css(path_to_theme() . '/css/calacademy/admin-menu.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/global.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/backgrounds.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/datepicker.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/nav.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/alerts.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/menu-garnish.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/footer.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/right-rail.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/components.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/social-buttons.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/clusters-field-collections.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/clusters-views.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/hero-system.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/webforms.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/slideshow.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/faq.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/views-exposed-filters.css', $cssOptions);

  drupal_add_css(path_to_theme() . '/css/calacademy/section-educators.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/section-nightlife.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/section-contact.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/section-field-trips.css', $cssOptions);

  drupal_add_css(path_to_theme() . '/css/calacademy/page-generic-landing.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-nightlife-landing.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-daily-calendar.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-exhibits.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-kids.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-taxonomy-term.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-events.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-homepage.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-audience.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-search-results.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-simple-form.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-field-trips-landing.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-lesson-plans-landing.css', $cssOptions);

  drupal_add_css(path_to_theme() . '/css/calacademy/node-exhibit-parent.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-event.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-event-nightlife.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-person.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-content-page.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-press-release.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-landing-page.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-field-trip.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-lesson-plan.css', $cssOptions);

  // this would typically be added with load-scripts.js, but is needed
  // in a Drupal.behaviors call, so needs to be added here
  drupal_add_js(path_to_theme() . '/js/jquery.defaultvalue.js');

  drupal_add_js(path_to_theme() . '/js/modernizr.calacademy.js');
  drupal_add_js(path_to_theme() . '/js/static.js');  
  drupal_add_js(path_to_theme() . '/js/load-scripts.js');
  drupal_add_js(path_to_theme() . '/js/calacademy-global-behaviors.js');

  drupal_add_js(path_to_theme() . '/js/page-homepage.js');
  drupal_add_js(path_to_theme() . '/js/page-nightlife-landing.js');
  drupal_add_js(path_to_theme() . '/js/page-daily-calendar.js');
  drupal_add_js(path_to_theme() . '/js/page-taxonomy-term.js');

  // Remove the "Repeats" tab from event pages.
  _removetabs(array("node/%/repeats"), $variables, REMOVETAB_PRIMARY);

}

define("REMOVETAB_PRIMARY", 0);
define("REMOVETAB_SECONDARY", 1);
define("REMOVETAB_BOTH", 2);
define("TABS_PRIMARY", 0);
define("TABS_SECONDARY", 1);

/**
 * Remove a tab by label.
 * @author Rob Davidson
 *
 * @param $label: The label of the tab to remove.
 * @param $variables: The $variables argument.
 * @param $removeFrom: Usuable values are:
 *        - REMOVETAB_PRIMARY   (0)
 *        - REMOVETAB_SECONDARY (1)
 *        - REMOVETAB_BOTH      (2)
 */
function _removetabs($paths = array(), &$vars, $removeFrom) {
  // Loop through the labels and remove them from the specified scope.
  foreach ($paths as $path) {
    // Handle scope filter.
    switch ($removeFrom) {
      case 0:
        _remove_tab($path, $vars, TABS_PRIMARY);
        break;

      case 1:
        _remove_tab($path, $vars, TABS_SECONDARY);
        break;

      case 2:
        _remove_tab($path, $vars, TABS_PRIMARY);
        _remove_tab($path, $vars, TABS_SECONDARY);
        break;
    }
  }
}
/**
 *
 * @param type $vars
 */
function _remove_tab($path, &$vars, $scope) {
  $i = 0;
  $scopeValue = NULL;

  switch ($scope) {

    case 0:
      $scopeValue = '#primary';
      break;

    case 1:
      $scopeValue = '#secondary';
      break;
  }
  // Make sure there is a tabs array before we continue.
  if (is_array($vars['tabs'][$scopeValue])) {
    // Loop through the tabs array.
    foreach ($vars['tabs'][$scopeValue] as $tab) {
      // If the lables match (not case sensitive) then remove it from the array.
      if (strtolower($tab['#link']['path']) == strtolower($path)) {
        unset($vars['tabs'][$scopeValue][$i]);
      }
      $i ++;
    }
  }
}

/**
 * Change default date popup settings
 * @see modules/contrib/date/date_popup/date_popup.module
 */

function calacademy_zen_date_popup_process_alter(&$element, &$form_state, &$context) {
  $element['#datepicker_options'] = array(
    'changeMonth' => false,
    'changeYear' => false,
    'dayNamesMin' => array('S', 'M', 'T', 'W', 'T', 'F', 'S')
  );

  $element['date'] = date_popup_process_date_part($element);

}

// */


/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function calacademy_zen_preprocess_node(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // Optionally, run node-type-specific preprocess functions, like
  // calacademy_zen_preprocess_node_page() or calacademy_zen_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function calacademy_zen_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
function calacademy_zen_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--sidebar.tpl.php template for sidebars.
  //if (strpos($variables['region'], 'sidebar_') === 0) {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
  //}
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
function calacademy_zen_preprocess_block(&$variables, $hook) {
  // Add a count to all the blocks in the region.
  // $variables['classes_array'][] = 'count-' . $variables['block_id'];

  // By default, Zen will use the block--no-wrapper.tpl.php for the main
  // content. This optional bit of code undoes that:
  //if ($variables['block_html_id'] == 'block-system-main') {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('block__no_wrapper'));
  //}
}
// */
