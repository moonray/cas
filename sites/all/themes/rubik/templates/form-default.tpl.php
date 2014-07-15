<div class='form form-layout-default clearfix'>


  <div class='column-main'> main starts here
    <div class='column-wrapper clearfix'> 
		<?php print drupal_render_children($form); ?>
        buttons after?
      	<?php if(!empty($actions)) print rubik_render_clone($actions); ?>
    </div>
    main ends here
  </div>
  
  <div class='column-side' style="background-color:red;"> sidebar content should be here
    <div class='column-wrapper clearfix'> 
	<?php print drupal_render($actions); ?> 
	<?php print drupal_render($sidebar); ?> 
    </div>
  </div>
  
  
  <?php if (!empty($footer)): ?>
  <div class='column-footer'>
    <div class='column-wrapper clearfix'><?php print drupal_render($footer); ?></div>
  </div>
  <?php endif; ?>
</div>
