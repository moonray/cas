<?php

/**
 * @file
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
// only showing blog category callout on ES Landing Page main (nid 1550)
$nodeid = '';
if (arg(0) == 'node' && is_numeric(arg(1))) $nodeid = arg(1);
if ($nodeid == '1550') {
?>

  <div class="container">
    <?php foreach ($fields as $key => $field): ?>
      <?php if (!empty($field->separator)): ?>
        <?php print $field->separator; ?>
      <?php endif; ?>

      <?php print $field->wrapper_prefix; ?>
        <?php print $field->label_html; ?>
        <?php print $field->content; ?>
      <?php print $field->wrapper_suffix; ?>
    <?php endforeach; ?>
  </div>

<?php } ?>
