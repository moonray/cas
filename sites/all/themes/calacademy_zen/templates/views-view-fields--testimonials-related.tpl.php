<?php

	$source = trim(strip_tags($fields['field_source']->content));
	$sourceClass = 'source-' . strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $source));

?>
<div class="testimonial">
	<p><?php print $fields['body']->content; ?></p>
	<div class="views-field-field-reviewer-name <?php print $sourceClass; ?>">
		<div class="name"><?php print $fields['field_reviewer_name']->content; ?></div>
		<div class="source"><?php print $fields['field_source']->content; ?></div>
	</div>
</div>
