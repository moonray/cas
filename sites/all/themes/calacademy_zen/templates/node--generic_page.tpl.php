<?php
/**
 * @file
 * Zen theme's implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct url of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type, i.e., "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   - view-mode-[mode]: The view mode, e.g. 'full', 'teaser'...
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 *   The following applies only to viewers who are registered users:
 *   - node-by-viewer: Node is authored by the user currently viewing the page.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type, i.e. story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $pubdate: Formatted date and time for when the node was published wrapped
 *   in a HTML5 time element.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode, e.g. 'full', 'teaser'...
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content. Currently broken; see http://drupal.org/node/823380
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined, e.g. $node->body becomes $body. When needing to access
 * a field's raw values, developers/themers are strongly encouraged to use these
 * variables. Otherwise they will have to explicitly specify the desired field
 * language, e.g. $node->body['en'], thus overriding any language negotiation
 * rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see zen_preprocess_node()
 * @see template_process()
 */
?>
<article class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>


	<?php // print '<pre>'; print_r($node); print '</pre>'; ?>

  <?php if ($title_prefix || $title_suffix || $display_submitted || $unpublished || !$page && $title): ?>
    <header>
      <?php print render($title_prefix); ?>
      <?php if (!$page && $title): ?>
        <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
      <?php endif; ?>
      <?php print render($title_suffix); ?>

      <?php if ($display_submitted): ?>
        <p class="submitted">
          <?php print $user_picture; ?>
          <?php print $submitted; ?>
        </p>
      <?php endif; ?>

      <?php if ($unpublished): ?>
        <p class="unpublished"><?php print t('Unpublished'); ?></p>
      <?php endif; ?>
    </header>
  <?php endif; ?>

  <?php
    
	// hide comments and links
    hide($content['comments']);
    hide($content['links']);
    
  	hide($content['field_generic_page_hero_image']);
	$hero_image = field_get_items('node', $node, 'field_generic_page_hero_image');
	if(!empty($hero_image[0]['field_image_source_credit'])) {
		$hero_image_source = $hero_image[0]['field_image_source_credit']['und'][0]['safe_value'];
		$hero_image_source = '<span class="hero_image_source">' . $hero_image_source . '</span>';
	}
	else {
		$hero_image_source = '';
	}
	
	if (!empty($hero_image)) {
		
		if (isset($hero_image[0]['field_file_image_alt_text']['und'][0]['safe_value'])) {
			$alt = $hero_image[0]['field_file_image_alt_text']['und'][0]['safe_value'];
		} else {
			$alt = '';
		}
		
		$hero_image_mu = '';
		$hero_image_mu .= theme_image(array(
			'path' => image_style_url('hero', $hero_image[0]['uri']),
			'alt' => $alt,
			'attributes' => array(
				'class' => 'hero'
			)
		));
		print '<div class="hero_image_container">';
		print '<span class="hero_image">' . $hero_image_mu . '</span>';
		print $hero_image_source;
		print '</div>';
	}

	hide($content['field_testimonial_pick']);
	//get the desired testimonial tags into an array
	$testimonial_tids = field_get_items('node', $node, 'field_testimonial_pick');
	//if there is an array of testimonial tags present...
	if(!empty($testimonial_tids)) {
		$tids = array();
		
		foreach($testimonial_tids AS $t) {
			$ttids[] = $t['tid'];
		}

		//select nodes with corresponding tag
		$nids = taxonomy_select_nodes($ttids);
		
		if (!empty($nids)) {
			// randomize
			shuffle($nids);
			
			// get data
			$testimonial = node_load($nids[0]);
			
			// display
			$testimonial_author_arr = field_get_items('node', $testimonial, 'field_reviewer_name');
			$testimonial_author = $testimonial_author_arr[0]['safe_value'];
			$testimonial_source_arr = field_get_items('node', $testimonial, 'field_source');
			$testimonial_source_tid = $testimonial_source_arr[0]['tid'];
			$testimonial_arr = field_get_items('node', $testimonial, 'field_testimonial_summary');
			$testimonial = $testimonial_arr[0]['safe_value'];

			//now let's have a different icon for each source of testimonial (facebook, twitter, zuberance etc...)
			// we know that certain tid correspond to certain sources:
			//520 -> facebook
			//521 -> twitter
			//522 -> yelp
			//523 ->zuberance

			$term = taxonomy_term_load($testimonial_source_tid);
			$name = strtolower($term->name);
			$path = $_SERVER['DOCUMENT_ROOT'] . '/sites/all/themes/calacademy_zen/images/testimonial-icons/' . $name . '.png';
			
			if(file_exists($path)) {
				$source = 'source-' . $name;
			} else {
				$source = 'source-default';
			}

			$testimonial_box = '<div class="testimonial ' . $source . '"><p class="testimonial-body">"' . $testimonial . '"</p><p class="testimonial-author">' . $testimonial_author . '</p></div>';
		}		
	}
			
	// main content
	print '<div class="article-content">';
	
	print render($content['field_generic_page_hero_copy']);
	
	// format the sections
	if (!empty($content['field_article_section'])) {
		hide($content['field_article_section']);
		
		$s = 0;
		foreach ($content['field_article_section']['#items'] as $entityRef) {
			$section = entity_load('field_collection_item', $entityRef);
			
			print '<section>';
			
			foreach ($section as $sectionObj) {
				$field_wrapper = entity_metadata_wrapper('field_collection_item', $sectionObj);

				
				$subtitle = $field_wrapper->field_subtitle->value();
				$img = $field_wrapper->field_inline_image->value();
				$sectionBody = $field_wrapper->field_body->value();

				if (isset($img['field_image_source_credit']['und'][0]['safe_value'])) {
					$source = '<span class="inline-image-source">' . $img['field_image_source_credit']['und'][0]['safe_value'] . '</span>';
				} else {
					$source = '';
				}

				if (isset($img['field_image_caption_text']['und'][0]['safe_value'])) {
					$caption = '<span class="inline-image-caption">' . $img['field_image_caption_text']['und'][0]['safe_value'] . '</span>';
				} else {
					$caption = '';
				}
				
				if (isset($img['field_file_image_alt_text']['und'][0]['safe_value'])) {
					$alt = $img['field_file_image_alt_text']['und'][0]['safe_value'];
				} else {
					$alt = '';
				}
				
				if (!empty($subtitle)) print '<h2>' . $subtitle . '</h2>';
				
				if (!empty($img)) {
					$img_arr = theme_image(array(
						'path' => image_style_url('square', $img['uri']),
						'alt' => $alt,
						'attributes' => array(
							'class' => 'secondary square inline'
						)
					));
					
					print '<div class="inline-image-container"><span class="inline-image-img">' . $img_arr . '</span>' . $caption . '<br />' . $source . '</div>'; 
				}

				// adding testimonial to second paragraph of first section if more than one paragraph exists.
				if (isset($testimonial_box)) {
					$safeBody = $sectionBody['safe_value'];
					$safeBody_combined = '';
					if ($s == 0) {
						$parts = explode("</p>",$safeBody);
						$n = 0;
						foreach($parts AS $p) {
							if($n == 1) {
								$safeBody_combined .= $testimonial_box;
							}
							$safeBody_combined .= $p;
							$n++;
						}
						print $safeBody_combined;
					} else {
						print $safeBody;
					}
				} else {
					print $sectionBody['safe_value'];
				}

			}
			
			print '</section>';
			$s++;
		}
	} 
	
	// create a list of secondary images
	hide($content['field_image_secondary']);
	$secondary_images = field_get_items('node', $node, 'field_image_secondary');
	
	if (is_array($secondary_images)) {
		$ul = '<ul class="secondary-images">';
		
		foreach ($secondary_images as $img) {

			if (isset($img['field_image_source_credit']['und'][0]['safe_value'])) {
				$source = '<span class="secondary-image-source">' . $img['field_image_source_credit']['und'][0]['safe_value'] . '</span>';
			} else {
				$source = '';
			}

			if (isset($img['field_image_caption_text']['und'][0]['safe_value'])) {
				$caption = '<span class="secondary-image-caption">' . $img['field_image_caption_text']['und'][0]['safe_value'] . '</span>';
			} else {
				$caption = '';
			}
			
			if (isset($img['field_file_image_alt_text']['und'][0]['safe_value'])) {
				$alt = $img['field_file_image_alt_text']['und'][0]['safe_value'];
			} else {
				$alt = '';
			}
			
			$ul .= '<li>';
			
			$img_arr = theme_image(array(
				'path' => image_style_url('large', $img['uri']),
				'alt' => $alt,
				'attributes' => array(
					'class' => 'secondary large'
				)
			));

			$ul .= '<div class="secondary-image-container"><span class="secondary-image-img">' . $img_arr . '</span>' . $source . ' ' . $caption . '</div>';
			
			$ul .= '</li>';
		}
		
		$ul .= '</ul>';
		
		print $ul;
	}
	
	// 3 tangentially related call-to-action items
	// related page nodes by tags
	$tags = field_get_items('node', $node, 'field_generic_page_tags');
	if (is_array($tags)) {
		foreach($tags as $tag) {
			$tids[] = $tag['tid'];	
		}
	}
	// EntityFieldQuery for tag taxonomy id array
	if (is_array($tids)) {
	  $query = new EntityFieldQuery();
	  $relatedPages = $query
	    ->entityCondition('entity_type', 'node')
	    ->fieldCondition('field_generic_page_tags', 'tid', $tids, 'IN')
	    ->propertyCondition('nid', $node->nid, '<>')
	    ->propertyOrderBy('changed', 'DESC')
	    ->execute();
	}
	$relatedPagesNids = array_keys($relatedPages['node']);
	$relatedPagesNids = array_slice($relatedPagesNids, 0, 3);
	// 3 of the related pages
	if (is_array($relatedPagesNids)) {
	  $ul = '<ul class="related-pages-ctas">';
	  $i = 1;
	  foreach($relatedPagesNids as $relatedPagesNid) {
	  	$relatedNode = node_load($relatedPagesNid);
	  	$img = $relatedNode->field_generic_page_hero_image['und'][0]['uri'];
	  	
	  	if (isset($relatedNode->field_generic_page_hero_image['und'][0]['field_file_image_alt_text']['und'][0]['safe_value'])) {
				$alt = $relatedNode->field_generic_page_hero_image['und'][0]['field_file_image_alt_text']['und'][0]['safe_value'];
			} else {
				$alt = '';
			}
	  	
	  	$options = array('absolute' => TRUE);
			$url = url('node/' . $relatedPagesNid, $options);
	  	$url = str_replace('/content', '', $url);
	  	// ie8 last-child hack
	  	if ($i==3) {
	  		$ul .= '<li class="last-child">';
	  	} else {
	  		$ul .= '<li>';
	  	}
	  	$ul .= '<a href="'.$url.'">';
	  	$ul .= theme_image(array(
				'path' => image_style_url('square', $img),
				'alt' => $alt,
				'attributes' => array(
					'class' => 'square'
				)
			));
	  	$ul .= '<h3>'.$relatedNode->title.'</h3>';
	  	$ul .= '<p>'.$relatedNode->field_teaser_text['und'][0]['safe_value'].'</p>';
	  	$ul .= '</a>';
	  	$ul .= '</li>';
	  	$i++;
	  }
	  $ul .= '</ul>';
	  print '<aside>'.$ul.'</aside>';
	}
	
	print '</div>';
	
	// create asides markup if we have any
	$asidesMarkup = '';
	
	// pricing
	hide($content['field_pricing']);
	$prices = field_get_items('node', $node, 'field_pricing');
	
	if (is_array($prices)) {
		// we have a pricing entity
		if (!empty($prices[0]['entity']))  {
			$priceFieldCollections = $prices[0]['entity']->field_pricing_item['und'];
			$asidesMarkup .= '<aside class="pricing"><h3>Pricing</h3><table>';
			
			foreach ($priceFieldCollections as $priceFieldCollection) {
				$priceData = field_collection_item_load($priceFieldCollection['value']);
				$field_wrapper = entity_metadata_wrapper('field_collection_item', $priceData);
				
				$title = $field_wrapper->field_title->value();
				$price = $field_wrapper->field_price->value();
				$note = $field_wrapper->field_note->value();
				
				$asidesMarkup .= '<tr><td>' . $title . '</td>' . '<td><p class="price">$' . $price  . '</p>' . $note['safe_value'] . '</td></tr>'; 
			}
			
			$asidesMarkup .= '</table><p><a href="#" class="lozenge">Get Tickets</a></p></aside>';
		}
	}
	
	// blurbs
	hide($content['field_blurb']);
	$blurbs = field_get_items('node', $node, 'field_blurb');
	
	if (is_array($blurbs)) {
		foreach ($blurbs as $blurb) {
			$blurbData = field_collection_item_load($blurb['value']);
			$field_wrapper = entity_metadata_wrapper('field_collection_item', $blurbData);
			
			$title = $field_wrapper->field_blurb_title->value();
			$desc = $field_wrapper->field_blurb_description->value();
			
			$asidesMarkup .= '<aside><h3>' . $title . '</h3>' . $desc['safe_value'] . '</aside>';
		}
	}
	    
	// print out the asides if we have any
	if (!empty($asidesMarkup)) {
		print '<div class="asides">' . $asidesMarkup . '</div>';
	}
	
  ?>

</article><!-- /.node -->
