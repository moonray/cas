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
 * Returns HTML for an image with an appropriate icon for the given file.
 *
 * @param $variables
 *   An associative array containing:
 *   - file: A file object for which to make an icon.
 *   - icon_directory: (optional) A path to a directory of icons to be used for
 *     files. Defaults to the value of the "file_icon_directory" variable.
 *
 * @ingroup themeable
 */
function calacademy_zen_file_icon($variables) {
  $file = $variables['file'];
  $icon_directory = path_to_theme() . '/images/file-type-icons/';;

  $mime = check_plain($file->filemime);
  $icon_url = file_icon_url($file, $icon_directory);

  return '<img class="file-icon" alt="" title="' . $mime . '" src="' . $icon_url . '" />';
}

function calacademy_zen_preprocess_field(&$variables, $hook) {
  if ($variables['element']['#view_mode'] != 'megamenu_feature') return;
  if ($variables['element']['#field_name'] != 'field_hero_region') return;

  // add variable
  $vals = array_values($variables['element'][0]['entity']['field_collection_item']);
  $variables['field_hero_region_item'] = $vals[0];

  // add template hint
  $variables['theme_hook_suggestions'][] = 'field__megamenu_feature__hero_region';
}

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
* Remove shortlinks from header since we don't want to surface
* invalid URLs.
*
* @see https://drupal.org/node/1304038#comment-7411014
* @author grotter
*/
function calacademy_zen_html_head_alter(&$head_elements) {
  $remove = array(
    '/^drupal_add_html_head_link:shortlink:/'
  );

  foreach ($remove as $item) {
    foreach (preg_grep($item, array_keys($head_elements)) as $key) {
      unset($head_elements[$key]);
    }
  }
}

/**
* Alter panel content programmatically
* @author grotter
*/
function calacademy_zen_preprocess_panels_pane(&$variables) {
  switch ($variables['pane']->subtype) {
    case 'custom':
      // this used to depend on PHP filter
      if (strip_tags($variables['content']) == 'midfeature_slideshow_preview') {
        $nid = arg(1);
        $variables['content'] = views_embed_view('midfeature_content', 'midfeature_slideshow_block', $nid);
      }

      break;
    case 'block-11':
      // add search term to search results page
      $searchTerm = '<h2 class="search-term">';

      if (isset($_GET['gq']) && !empty($_GET['gq'])) {
        $searchTerm .= '&ldquo;' . strip_tags($_GET['gq']) . '&rdquo;';
      } else {
        $searchTerm .= 'No query specified';
      }

      $searchTerm .= '</h2>';

      if (isset($_GET['gq'])) {
        // don't do anything if no query specified
        $variables['content'] = $searchTerm . $variables['content'];
      }

      break;
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
  // chat redirect
  if (request_path() == 'chat') {
    require(dirname(__FILE__) . '/templates/classes/CallCenterHours.php');
    $foo = new CallCenterHours();

    if ($foo->isOpen()) {
      header('location: http://chat.calacademy.org/Code/webchatLogin.php', true, 301);
      die;
    } else {
      ob_start();
      include 'templates/call-center-closed.tpl.php';
      die(ob_get_clean());
    }
  }

  // webmaster meta tag
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

function _calacademy_zen_is_ssl() {
    if ( isset($_SERVER['HTTPS']) ) {
        if ( 'on' == strtolower($_SERVER['HTTPS']) )
            return true;
        if ( '1' == $_SERVER['HTTPS'] )
            return true;
    } elseif ( isset($_SERVER['SERVER_PORT']) && ( '443' == $_SERVER['SERVER_PORT'] ) ) {
        return true;
    }
    return false;
}

/**
 * Override some js from TB Megamenu module
 *
 */
function _calacademy_zen_replace_js($prefix, $replace, &$js) {
    foreach ($replace as $r) {
      $old = $prefix . $r;
      $new = path_to_theme() . '/js/' . $r;

      // not found
      if (!isset($js[$old])) continue;

      // remove original
      $orig = $js[$old];
      unset($js[$old]);

      // alter and append
      $orig['data'] = $new;
      $js[$new] = $orig;
    }
}

function calacademy_zen_js_alter(&$js) {
  _calacademy_zen_replace_js('sites/all/modules/contrib/tb_megamenu/js/', array(
    'tb-megamenu-frontend.js',
    'tb-megamenu-touch.js'
  ), $js);

  _calacademy_zen_replace_js('sites/all/libraries/flexslider/', array(
    'jquery.flexslider-min.js'
  ), $js);
}

/**
 * Override some css from TB Megamenu module
 *
 */
function calacademy_zen_css_alter(&$css) {
  $prefix = 'sites/all/modules/contrib/tb_megamenu/css/';
  $replace = array('bootstrap.css', 'default.css');

  foreach ($replace as $r) {
    $old = $prefix . $r;
    $new = path_to_theme() . '/css/calacademy/megamenu/' . $r;

    // not found
    if (!isset($css[$old])) continue;

    // remove original
    $orig = $css[$old];
    unset($css[$old]);

    // alter and append
    $orig['data'] = $new;
    $css[$new] = $orig;
  }
}

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
function calacademy_zen_preprocess_page(&$variables, $hook) {
  $whitney = '//cloud.typography.com/6161652/764904/css/fonts.css';

  // switch to the SSL typography.com project
  if (_calacademy_zen_is_ssl()) $whitney = '//cloud.typography.com/6161652/769662/css/fonts.css';

  drupal_add_css($whitney, array(
    'type' => 'external'
  ));

  // @todo
	// load these conditionally
  $cssOptions = array('group' => CSS_THEME);

  drupal_add_css(path_to_theme() . '/css/calacademy/admin-menu.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/animations.css', $cssOptions);
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
  drupal_add_css(path_to_theme() . '/css/calacademy/custom-translate-modal.css', $cssOptions);

  drupal_add_css(path_to_theme() . '/css/calacademy/section-blogs.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/section-educators.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/section-members.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/section-researchers.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/section-nightlife.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/section-field-trips.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/section-audience.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/section-page-not-found.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/section-supported-browsers.css', $cssOptions);

  drupal_add_css(path_to_theme() . '/css/calacademy/page-failover.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-exhibits-landing-and-more.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-generic-landing.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-nightlife-landing.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-daily-calendar.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-kids.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-taxonomy-term.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-events.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-homepage.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-search-results.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-simple-form.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-field-trips-landing.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-lesson-plans-landing-and-more.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/page-user.css', $cssOptions);

  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-slideshow-midfeature.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-exhibit-parent.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-event.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-event-nightlife.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-person.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-content-page-and-more.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-press-release.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-landing-page-or-exhibit.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-field-trip.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-lesson-plan.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-es-landing-page.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-landing-page-science-today.css', $cssOptions);
  drupal_add_css(path_to_theme() . '/css/calacademy/node-type-curated-list-page.css', $cssOptions);

  drupal_add_js(path_to_theme() . '/js/jquery.defaultvalue.js');
  drupal_add_js(path_to_theme() . '/js/jquery.dotdotdot.min.js');
  drupal_add_js(path_to_theme() . '/js/hammer.min.js');
  drupal_add_js(path_to_theme() . '/js/jquery.hammer.js');

  drupal_add_js(path_to_theme() . '/js/modernizr.calacademy.js');
  drupal_add_js(path_to_theme() . '/js/static.js');
  drupal_add_js(path_to_theme() . '/js/jquery-scrolltofixed-min.js');
  drupal_add_js(path_to_theme() . '/js/media.match.min.js');
  drupal_add_js(path_to_theme() . '/js/enquire.min.js');
  drupal_add_js(path_to_theme() . '/js/jquery.popupwindow.js');
  drupal_add_js(path_to_theme() . '/js/webfontlistener.js');
  drupal_add_js(path_to_theme() . '/js/hackdom.js');
  drupal_add_js(path_to_theme() . '/js/jquery.mlens-1.4.js');
  drupal_add_js(path_to_theme() . '/js/moment.min.js');
  drupal_add_js(path_to_theme() . '/js/jquery.cookie.js');
  drupal_add_js(path_to_theme() . '/js/calacademy.js');
  drupal_add_js(path_to_theme() . '/js/calacademy-global-behaviors.js');

  drupal_add_js(path_to_theme() . '/js/page-homepage.js');
  drupal_add_js(path_to_theme() . '/js/page-nightlife-landing.js');
  drupal_add_js(path_to_theme() . '/js/page-daily-calendar.js');
  drupal_add_js(path_to_theme() . '/js/page-taxonomy-term.js');
  //adding tiny script to append mobile state to ticketing URLs
  drupal_add_js(path_to_theme() . '/js/mobilizer.js');

  $myJs = <<<END
  jQuery(document).ready(function ($) {
    var pages = calacademy.Statics.pageObjects;

    if ($('body').hasClass('page-homepage')) {
      pages.push(new PageHomepage());
    }
    if ($('body').hasClass('page-taxonomy-term')) {
      pages.push(new PageTaxonomyTerm());
    }
    if ($('body').hasClass('page-daily-calendar')) {
      pages.push(new PageDailyCalendar());
    }
    if ($('body').hasClass('page-nightlife-landing')) {
      pages.push(new PageNightlifeLanding());
    }

    var foo = new CalAcademy();
  });
END;
  drupal_add_js($myJs, 'inline');

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
