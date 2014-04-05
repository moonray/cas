<?php

	$source = trim(strip_tags($fields['field_source']->content));
	$sourceClass = 'source-' . strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $source));

?>
<div class="testimonial">
	<p><?php print $fields['body']->content; ?></p>
	<div class="views-field-field-reviewer-name <?php print $sourceClass; ?>">
		<h3><?php print $fields['field_reviewer_name']->content; ?></h3>
		<h4><?php print $fields['field_source']->content; ?></h4>
	</div>
</div>
