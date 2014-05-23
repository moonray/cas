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
$nodePath = drupal_lookup_path('alias', 'node/' . $fields['field_es_category_link']->content);
?>
<?php if (count($fields) > 0): ?>

  <?php if (isset($fields['field_es_category_link']) && isset($fields['field_es_category_link']->raw)): ?>
    <a class="link-block" href="/<?php print $nodePath ?>">
  <?php endif; ?>

    <?php foreach ($fields as $id => $field): ?>

        <?php if ($id != 'tid' && $id == 'name'): ?>

          <?php if (!empty($field->separator)): ?>
            <?php print $field->separator; ?>
          <?php endif; ?>

         
            <?php print $field->label_html; ?>
            <?php print $field->content; ?>
            <?php print views_embed_view('es_explore_science', 'selected_category_node', $fields['tid']->raw); ?>
          

        <?php endif; ?>
    <?php endforeach; ?>

  <?php if (isset($fields['field_es_category_link']->raw)): ?>
    </a>
  <?php endif; ?>

<?php endif; ?>