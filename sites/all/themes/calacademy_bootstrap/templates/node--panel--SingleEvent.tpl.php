<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
	  
	<?php
        
		$display = array(
			'label' => 'hidden',
			'settings' => array(
				'image_style' => 'square'
			 )
		);
		
		print render(field_view_field('node', $node, 'field_image_primary', $display));

	?> 

</article> <!-- /.node -->
