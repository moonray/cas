<div class="container">
	<?php foreach ($fields as $id => $field): ?>
	  <?php if ($id == 'field_slideshow_frame_bg_image') continue; ?>

	  <?php if (!empty($field->separator)): ?>
	    <?php print $field->separator; ?>
	  <?php endif; ?>

	  <?php print $field->wrapper_prefix; ?>
	    <?php print $field->label_html; ?>
	    <?php print $field->content; ?>
	  <?php print $field->wrapper_suffix; ?>
	<?php endforeach; ?>
</div>
<?php print $fields['field_slideshow_frame_bg_image']->content; ?>
