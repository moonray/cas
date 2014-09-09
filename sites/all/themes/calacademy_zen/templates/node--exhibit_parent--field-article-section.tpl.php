<?php

/**
 * @file field.tpl.php
 * Default template implementation to display the value of a field.
 *
 * This file is not used and is here as a starting point for customization only.
 * @see theme_field()
 *
 * Available variables:
 * - $items: An array of field values. Use render() to output them.
 * - $label: The item label.
 * - $label_hidden: Whether the label display is set to 'hidden'.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - field: The current template type, i.e., "theming hook".
 *   - field-name-[field_name]: The current field name. For example, if the
 *     field name is "field_description" it would result in
 *     "field-name-field-description".
 *   - field-type-[field_type]: The current field type. For example, if the
 *     field type is "text" it would result in "field-type-text".
 *   - field-label-[label_display]: The current label position. For example, if
 *     the label position is "above" it would result in "field-label-above".
 *
 * Other variables:
 * - $element['#object']: The entity to which the field is attached.
 * - $element['#view_mode']: View mode, e.g. 'full', 'teaser'...
 * - $element['#field_name']: The field name.
 * - $element['#field_type']: The field type.
 * - $element['#field_language']: The field language.
 * - $element['#field_translatable']: Whether the field is translatable or not.
 * - $element['#label_display']: Position of label display, inline, above, or
 *   hidden.
 * - $field_name_css: The css-compatible field name.
 * - $field_type_css: The css-compatible field type.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 *
 * @see template_preprocess_field()
 * @see theme_field()
 *
 * @ingroup themeable
 */
?>


<?php


//print '<pre>'; print_r($items); print '</pre>';
//print render($items);

$fields = array();
$i = 0;

foreach($items as $item) {
	$fcis[] = $item['entity']['field_collection_item'];
	foreach($fcis AS $fci) {

		foreach($fci AS $coll) {
			$fields[$i]['subtitle'] = $coll['field_subtitle']['#items'][0]['safe_value'];
			$fields[$i]['body'] = $coll['field_body']['#items'][0]['safe_value'];
			$fields[$i]['image'] = $coll['field_inline_image']['#items'][0]['uri'];
			$fields[$i]['imagealt'] = $coll['field_inline_image']['#items'][0]['field_file_image_alt_text']['und'][0]['safe_value'];		
		}
		
	}

	$i++;

}

foreach($fields AS &$field) {
	$field['image'] = file_create_url($field['image']);
}

$sections = '';
$sections .= '<div class="field-name-field-article-section">';
$sections .= '<div class="field-items">';

$sections .= '<div class="field-item">';
$sections .= '<div class="field-name-field-subtitle">' . $fields[0]['subtitle'] .'</div><div class="field-name-field-body">' . $fields[0]['body'] .'</div>' . '<div class="field-name-field-inline-image"><img src="' . $fields[0]['image'] . '" alt="' . $fields[0]['imagealt'] . '" /></div>';
$sections .= '</div>';

$sections .= '<div class="field-item">';
$sections .= '<div class="field-name-field-inline-image"><img src="' . $fields[1]['image'] . '" alt="' . $fields[1]['imagealt'] . '" /></div>' . '<div class="field-name-field-subtitle">' . $fields[1]['subtitle'] .'</div><div class="field-name-field-body">' . $fields[1]['body'] .'</div>';
$sections .= '</div>';

$sections .= '<div class="field-item">';
$sections .= '<div class="field-name-field-inline-image"><img src="' . $fields[2]['image'] . '" alt="' . $fields[2]['imagealt'] . '" /></div>' . '<div class="field-name-field-subtitle">' . $fields[2]['subtitle'] .'</div><div class="field-name-field-body">' . $fields[2]['body'] .'</div>';
$sections .= '</div>';


$sections .= '</div>';
$sections .= '</div>';



print $sections;


?>


