<?php
/**
 * @file
 * Returns the HTML for the basic html structure of a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728208
 */

  require('classes/CallCenterHours.php');
  $foo = new CallCenterHours();
  $callCenterClass = $foo->isOpen() ? 'call-center-open' : 'call-center-closed';

  $extraMetaTag = '';
  if (isset($minimalUI) && $minimalUI) $extraMetaTag = ', minimal-ui';

?><!DOCTYPE html>
<!--[if lt IE 9]>
<html class="lt-ie9 lt-ie10 lt-ie11 <?php print $callCenterClass; ?>" <?php print $html_attributes . $rdf_namespaces; ?>>
<![endif]-->
<!--[if IE 9]>
<html class="lt-ie10 lt-ie11 <?php print $callCenterClass; ?>" <?php print $html_attributes . $rdf_namespaces; ?>>
<![endif]-->
<!--[if (!IE)|(gt IE 9)]> -->
<html class="<?php print $callCenterClass; ?>" <?php print $html_attributes . $rdf_namespaces; ?>>
<!-- <![endif]-->

<head>
  <?php print $head; ?>
  <title><?php if (function_exists('htmlEntitytoASCII')) { print htmlEntitytoASCII($head_title); } else { print $head_title; } ?></title>

  <?php if ($default_mobile_metatags): ?>
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, maximum-scale=1.0<?php print $extraMetaTag; ?>">
    <meta name="apple-touch-fullscreen" content="yes">
  <?php endif; ?>
  <meta http-equiv="cleartype" content="on">

  <script type="text/javascript">
    var isMSIE = /*@cc_on!@*/false;
  </script>

  <?php print $styles; ?>
  <?php print $scripts; ?>
  <?php if ($add_html5_shim and !$add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5.js"></script>
    <![endif]-->
  <?php elseif ($add_html5_shim and $add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5-respond.js"></script>
    <![endif]-->
  <?php elseif ($add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/respond.js"></script>
    <![endif]-->
  <?php endif; ?>

</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <!--googleoff: all-->
  <noscript>
    <div class="unsupported-msg">
      <p>
        It seems JavaScript is either disabled or not supported by your browser. To view this site, enable JavaScript by changing your browser options and try again.
      </p>
    </div>
  </noscript>
  <!--googleon: all-->
  <?php if ($skip_link_text && $skip_link_anchor): ?>
    <p id="skip-link">
      <a href="#<?php print $skip_link_anchor; ?>" class="element-invisible element-focusable"><?php print $skip_link_text; ?></a>
    </p>
  <?php endif; ?>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</body>
</html>
