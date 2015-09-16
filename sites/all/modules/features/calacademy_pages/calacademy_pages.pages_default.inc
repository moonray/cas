<?php
/**
 * @file
 * calacademy_pages.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function calacademy_pages_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_10';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -14;
  $handler->conf = array(
    'title' => 'NightLife Landing',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'page-nightlife-landing',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '1',
            'paths' => 'nightlife
nl',
          ),
          'context' => 'empty',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocol_irregular';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
      'left_above' => NULL,
      'right_above' => NULL,
      'left_below' => NULL,
      'right_below' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'e12e2f9e-ed93-4ebe-9012-3e2232453c8f';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-396ea004-37e0-417d-8121-4122f27b1215';
  $pane->panel = 'left_above';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '396ea004-37e0-417d-8121-4122f27b1215';
  $display->content['new-396ea004-37e0-417d-8121-4122f27b1215'] = $pane;
  $display->panels['left_above'][0] = 'new-396ea004-37e0-417d-8121-4122f27b1215';
  $pane = new stdClass();
  $pane->pid = 'new-5c4661b1-9bd5-4c78-ac60-d8efadb0d666';
  $pane->panel = 'left_above';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '5c4661b1-9bd5-4c78-ac60-d8efadb0d666';
  $display->content['new-5c4661b1-9bd5-4c78-ac60-d8efadb0d666'] = $pane;
  $display->panels['left_above'][1] = 'new-5c4661b1-9bd5-4c78-ac60-d8efadb0d666';
  $pane = new stdClass();
  $pane->pid = 'new-2b33d421-e773-4a56-a909-1d459747bbc4';
  $pane->panel = 'left_above';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'edit' => 'Edit',
      'delete' => 'Delete',
      'add' => 'Add',
      'description' => 1,
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '2b33d421-e773-4a56-a909-1d459747bbc4';
  $display->content['new-2b33d421-e773-4a56-a909-1d459747bbc4'] = $pane;
  $display->panels['left_above'][2] = 'new-2b33d421-e773-4a56-a909-1d459747bbc4';
  $pane = new stdClass();
  $pane->pid = 'new-fca22d7d-bf9c-44a6-bb8b-23fed8f35898';
  $pane->panel = 'left_above';
  $pane->type = 'views_panes';
  $pane->subtype = 'nightlife_upcoming-next_upcoming_nl';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'skewed-tri-grid',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'fca22d7d-bf9c-44a6-bb8b-23fed8f35898';
  $display->content['new-fca22d7d-bf9c-44a6-bb8b-23fed8f35898'] = $pane;
  $display->panels['left_above'][3] = 'new-fca22d7d-bf9c-44a6-bb8b-23fed8f35898';
  $pane = new stdClass();
  $pane->pid = 'new-c4a03c06-5f84-4d3b-808f-ab56f4b3b883';
  $pane->panel = 'left_below';
  $pane->type = 'views_panes';
  $pane->subtype = 'nightlife_upcoming-upcoming_nl_teasers';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => 'upcoming',
    'css_class' => 'image-top-two-columns',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'c4a03c06-5f84-4d3b-808f-ab56f4b3b883';
  $display->content['new-c4a03c06-5f84-4d3b-808f-ab56f4b3b883'] = $pane;
  $display->panels['left_below'][0] = 'new-c4a03c06-5f84-4d3b-808f-ab56f4b3b883';
  $pane = new stdClass();
  $pane->pid = 'new-e7854487-22bf-4c13-a0e4-806b651776fd';
  $pane->panel = 'left_below';
  $pane->type = 'views';
  $pane->subtype = 'testimonials_related';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'override_pager_settings' => 0,
    'use_pager' => 0,
    'nodes_per_page' => '1',
    'pager_id' => '0',
    'offset' => '0',
    'more_link' => 0,
    'feed_icons' => 0,
    'panel_args' => 0,
    'link_to_view' => 0,
    'args' => '',
    'url' => '',
    'display' => 'default',
    'context' => array(
      0 => '',
    ),
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'e7854487-22bf-4c13-a0e4-806b651776fd';
  $display->content['new-e7854487-22bf-4c13-a0e4-806b651776fd'] = $pane;
  $display->panels['left_below'][1] = 'new-e7854487-22bf-4c13-a0e4-806b651776fd';
  $pane = new stdClass();
  $pane->pid = 'new-9c360a08-b04d-4d39-a0da-6b06c8b49de1';
  $pane->panel = 'right_above';
  $pane->type = 'node';
  $pane->subtype = 'node';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'nid' => '1880',
    'links' => 0,
    'leave_node_title' => 0,
    'identifier' => '',
    'build_mode' => 'full',
    'link_node_title' => 0,
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '9c360a08-b04d-4d39-a0da-6b06c8b49de1';
  $display->content['new-9c360a08-b04d-4d39-a0da-6b06c8b49de1'] = $pane;
  $display->panels['right_above'][0] = 'new-9c360a08-b04d-4d39-a0da-6b06c8b49de1';
  $pane = new stdClass();
  $pane->pid = 'new-30b8eef5-bceb-4650-80f5-e71bea4979ea';
  $pane->panel = 'right_above';
  $pane->type = 'block';
  $pane->subtype = 'block-5';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Connect With NightLife<br>#CASNightLife',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '30b8eef5-bceb-4650-80f5-e71bea4979ea';
  $display->content['new-30b8eef5-bceb-4650-80f5-e71bea4979ea'] = $pane;
  $display->panels['right_above'][1] = 'new-30b8eef5-bceb-4650-80f5-e71bea4979ea';
  $pane = new stdClass();
  $pane->pid = 'new-b140c6fd-41cb-419e-b35f-d2ca26455f53';
  $pane->panel = 'right_above';
  $pane->type = 'node';
  $pane->subtype = 'node';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'nid' => '1879',
    'links' => 0,
    'leave_node_title' => 0,
    'identifier' => '',
    'build_mode' => 'full',
    'link_node_title' => 0,
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'b140c6fd-41cb-419e-b35f-d2ca26455f53';
  $display->content['new-b140c6fd-41cb-419e-b35f-d2ca26455f53'] = $pane;
  $display->panels['right_above'][2] = 'new-b140c6fd-41cb-419e-b35f-d2ca26455f53';
  $pane = new stdClass();
  $pane->pid = 'new-ce659dc8-2149-481b-ab22-3463f81a5ad5';
  $pane->panel = 'right_above';
  $pane->type = 'node';
  $pane->subtype = 'node';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'nid' => '5344',
    'links' => 0,
    'leave_node_title' => 0,
    'identifier' => '',
    'build_mode' => 'full',
    'link_node_title' => 0,
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'ce659dc8-2149-481b-ab22-3463f81a5ad5';
  $display->content['new-ce659dc8-2149-481b-ab22-3463f81a5ad5'] = $pane;
  $display->panels['right_above'][3] = 'new-ce659dc8-2149-481b-ab22-3463f81a5ad5';
  $pane = new stdClass();
  $pane->pid = 'new-4e2fbdc4-2195-404f-88e3-67caa8bd795b';
  $pane->panel = 'right_below';
  $pane->type = 'views_panes';
  $pane->subtype = 'nightlife_upcoming-past_nl_gallery';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-top-two-columns',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '4e2fbdc4-2195-404f-88e3-67caa8bd795b';
  $display->content['new-4e2fbdc4-2195-404f-88e3-67caa8bd795b'] = $pane;
  $display->panels['right_below'][0] = 'new-4e2fbdc4-2195-404f-88e3-67caa8bd795b';
  $pane = new stdClass();
  $pane->pid = 'new-9a80c86a-c618-48cf-a78f-568ac8bf839b';
  $pane->panel = 'right_below';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'See Past Event Albums',
    'title' => '',
    'body' => '<h3><a href="https://www.facebook.com/calacademy-nightlife/photos_stream?tab=photos_albums">See Past Event Albums</a></h3>
',
    'format' => 'full_html_developer_mode',
    'substitute' => 0,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'cta-block',
  );
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '9a80c86a-c618-48cf-a78f-568ac8bf839b';
  $display->content['new-9a80c86a-c618-48cf-a78f-568ac8bf839b'] = $pane;
  $display->panels['right_below'][1] = 'new-9a80c86a-c618-48cf-a78f-568ac8bf839b';
  $pane = new stdClass();
  $pane->pid = 'new-9a146895-96aa-41c3-a839-fb84b8f981e1';
  $pane->panel = 'top';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '9a146895-96aa-41c3-a839-fb84b8f981e1';
  $display->content['new-9a146895-96aa-41c3-a839-fb84b8f981e1'] = $pane;
  $display->panels['top'][0] = 'new-9a146895-96aa-41c3-a839-fb84b8f981e1';
  $pane = new stdClass();
  $pane->pid = 'new-fb6464c5-ef90-45ac-b784-92800af87ab4';
  $pane->panel = 'top';
  $pane->type = 'node_body';
  $pane->subtype = 'node_body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'fb6464c5-ef90-45ac-b784-92800af87ab4';
  $display->content['new-fb6464c5-ef90-45ac-b784-92800af87ab4'] = $pane;
  $display->panels['top'][1] = 'new-fb6464c5-ef90-45ac-b784-92800af87ab4';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_10'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_11';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -15;
  $handler->conf = array(
    'title' => 'Exhibit Detail',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'exhibit' => 'exhibit',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'c9907b97-f889-4366-aba4-dbd0a172cb2a';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-62dfbb64-4f1c-4f04-9aba-4b293b2d43af';
  $pane->panel = 'bottom';
  $pane->type = 'views_panes';
  $pane->subtype = 'midfeature_content-slideshow_midfeature';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'slideshow-midfeature-container',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '62dfbb64-4f1c-4f04-9aba-4b293b2d43af';
  $display->content['new-62dfbb64-4f1c-4f04-9aba-4b293b2d43af'] = $pane;
  $display->panels['bottom'][0] = 'new-62dfbb64-4f1c-4f04-9aba-4b293b2d43af';
  $pane = new stdClass();
  $pane->pid = 'new-28b51075-ebc7-4514-9776-13c4f77c505e';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_subtitle';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '28b51075-ebc7-4514-9776-13c4f77c505e';
  $display->content['new-28b51075-ebc7-4514-9776-13c4f77c505e'] = $pane;
  $display->panels['bottom'][1] = 'new-28b51075-ebc7-4514-9776-13c4f77c505e';
  $pane = new stdClass();
  $pane->pid = 'new-2150f9e3-bbd4-4bc9-a68e-c3e376166b79';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_summary';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '2150f9e3-bbd4-4bc9-a68e-c3e376166b79';
  $display->content['new-2150f9e3-bbd4-4bc9-a68e-c3e376166b79'] = $pane;
  $display->panels['bottom'][2] = 'new-2150f9e3-bbd4-4bc9-a68e-c3e376166b79';
  $pane = new stdClass();
  $pane->pid = 'new-5bad1d2f-6937-4bc1-b52a-0e86c6aa42ce';
  $pane->panel = 'bottom';
  $pane->type = 'views_panes';
  $pane->subtype = 'staff-panel_pane_4';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => 'people',
    'css_class' => 'image-top',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '5bad1d2f-6937-4bc1-b52a-0e86c6aa42ce';
  $display->content['new-5bad1d2f-6937-4bc1-b52a-0e86c6aa42ce'] = $pane;
  $display->panels['bottom'][3] = 'new-5bad1d2f-6937-4bc1-b52a-0e86c6aa42ce';
  $pane = new stdClass();
  $pane->pid = 'new-f5f74b9d-916c-415a-b028-ac7f03826257';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_q_a';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'faq',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = 'f5f74b9d-916c-415a-b028-ac7f03826257';
  $display->content['new-f5f74b9d-916c-415a-b028-ac7f03826257'] = $pane;
  $display->panels['bottom'][4] = 'new-f5f74b9d-916c-415a-b028-ac7f03826257';
  $pane = new stdClass();
  $pane->pid = 'new-9c4d9b16-7666-41b8-b20c-db0633295e58';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '9c4d9b16-7666-41b8-b20c-db0633295e58';
  $display->content['new-9c4d9b16-7666-41b8-b20c-db0633295e58'] = $pane;
  $display->panels['bottom'][5] = 'new-9c4d9b16-7666-41b8-b20c-db0633295e58';
  $pane = new stdClass();
  $pane->pid = 'new-8b875c4f-50a7-4c11-abe5-d9a53a5f2b50';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content_descriptio';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = '8b875c4f-50a7-4c11-abe5-d9a53a5f2b50';
  $display->content['new-8b875c4f-50a7-4c11-abe5-d9a53a5f2b50'] = $pane;
  $display->panels['bottom'][6] = 'new-8b875c4f-50a7-4c11-abe5-d9a53a5f2b50';
  $pane = new stdClass();
  $pane->pid = 'new-d50f4422-f809-4bac-9870-de8b56507fb6';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_link';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'link_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 7;
  $pane->locks = array();
  $pane->uuid = 'd50f4422-f809-4bac-9870-de8b56507fb6';
  $display->content['new-d50f4422-f809-4bac-9870-de8b56507fb6'] = $pane;
  $display->panels['bottom'][7] = 'new-d50f4422-f809-4bac-9870-de8b56507fb6';
  $pane = new stdClass();
  $pane->pid = 'new-e4a82bad-fe50-458b-8276-d959c0af2d4a';
  $pane->panel = 'bottom';
  $pane->type = 'views_panes';
  $pane->subtype = 'related_content-random__field_related_content_tags';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link_to_view' => 0,
    'use_pager' => 0,
    'pager_id' => '0',
    'items_per_page' => '8',
    'offset' => '0',
    'fields_override' => array(
      'edit_node' => 1,
      'field_hero_region' => 1,
      'title' => 1,
      'body' => 1,
    ),
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'skewed-four-col',
  );
  $pane->extras = array();
  $pane->position = 8;
  $pane->locks = array();
  $pane->uuid = 'e4a82bad-fe50-458b-8276-d959c0af2d4a';
  $display->content['new-e4a82bad-fe50-458b-8276-d959c0af2d4a'] = $pane;
  $display->panels['bottom'][8] = 'new-e4a82bad-fe50-458b-8276-d959c0af2d4a';
  $pane = new stdClass();
  $pane->pid = 'new-fe2292c4-d8b4-403f-8b36-9f0456664c51';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content_title_2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 9;
  $pane->locks = array();
  $pane->uuid = 'fe2292c4-d8b4-403f-8b36-9f0456664c51';
  $display->content['new-fe2292c4-d8b4-403f-8b36-9f0456664c51'] = $pane;
  $display->panels['bottom'][9] = 'new-fe2292c4-d8b4-403f-8b36-9f0456664c51';
  $pane = new stdClass();
  $pane->pid = 'new-b4e8f22e-e4e8-4f80-98b3-bac63f6a88d0';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content2_descripti';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 10;
  $pane->locks = array();
  $pane->uuid = 'b4e8f22e-e4e8-4f80-98b3-bac63f6a88d0';
  $display->content['new-b4e8f22e-e4e8-4f80-98b3-bac63f6a88d0'] = $pane;
  $display->panels['bottom'][10] = 'new-b4e8f22e-e4e8-4f80-98b3-bac63f6a88d0';
  $pane = new stdClass();
  $pane->pid = 'new-f8c55516-212a-444e-95cd-368e2e43e134';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_link_content_2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'link_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 11;
  $pane->locks = array();
  $pane->uuid = 'f8c55516-212a-444e-95cd-368e2e43e134';
  $display->content['new-f8c55516-212a-444e-95cd-368e2e43e134'] = $pane;
  $display->panels['bottom'][11] = 'new-f8c55516-212a-444e-95cd-368e2e43e134';
  $pane = new stdClass();
  $pane->pid = 'new-c58f698c-421f-40b7-8d90-c053b1dcd7b9';
  $pane->panel = 'bottom';
  $pane->type = 'views_panes';
  $pane->subtype = 'related_content-random__field_related_content_tags_2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link_to_view' => 0,
    'use_pager' => 0,
    'pager_id' => '0',
    'items_per_page' => '8',
    'offset' => '0',
    'fields_override' => array(
      'edit_node' => 1,
      'field_hero_region' => 1,
      'title' => 1,
      'body' => 1,
    ),
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'skewed-four-col',
  );
  $pane->extras = array();
  $pane->position = 12;
  $pane->locks = array();
  $pane->uuid = 'c58f698c-421f-40b7-8d90-c053b1dcd7b9';
  $display->content['new-c58f698c-421f-40b7-8d90-c053b1dcd7b9'] = $pane;
  $display->panels['bottom'][12] = 'new-c58f698c-421f-40b7-8d90-c053b1dcd7b9';
  $pane = new stdClass();
  $pane->pid = 'new-35d9b03b-28a8-4d18-84ff-36ed21742f06';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_blurb_description';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '35d9b03b-28a8-4d18-84ff-36ed21742f06';
  $display->content['new-35d9b03b-28a8-4d18-84ff-36ed21742f06'] = $pane;
  $display->panels['left'][0] = 'new-35d9b03b-28a8-4d18-84ff-36ed21742f06';
  $pane = new stdClass();
  $pane->pid = 'new-c70557b6-2f52-4191-8618-53fcfde98cfa';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'c70557b6-2f52-4191-8618-53fcfde98cfa';
  $display->content['new-c70557b6-2f52-4191-8618-53fcfde98cfa'] = $pane;
  $display->panels['left'][1] = 'new-c70557b6-2f52-4191-8618-53fcfde98cfa';
  $pane = new stdClass();
  $pane->pid = 'new-9bc8fc05-130b-45b2-852c-82f6c9ec1a1b';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '9bc8fc05-130b-45b2-852c-82f6c9ec1a1b';
  $display->content['new-9bc8fc05-130b-45b2-852c-82f6c9ec1a1b'] = $pane;
  $display->panels['left'][2] = 'new-9bc8fc05-130b-45b2-852c-82f6c9ec1a1b';
  $pane = new stdClass();
  $pane->pid = 'new-c49608e0-79ee-4a94-a2b0-aec702b435e8';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-2';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:exhibit:field_hide_share_buttons',
        'settings' => array(
          'field_hide_share_buttons' => array(
            'und' => array(
              0 => array(
                'value' => 1,
              ),
            ),
          ),
          'field_hide_share_buttons_value' => '1',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => TRUE,
      ),
    ),
  );
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Share This',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'c49608e0-79ee-4a94-a2b0-aec702b435e8';
  $display->content['new-c49608e0-79ee-4a94-a2b0-aec702b435e8'] = $pane;
  $display->panels['right'][0] = 'new-c49608e0-79ee-4a94-a2b0-aec702b435e8';
  $pane = new stdClass();
  $pane->pid = 'new-c4d69559-c107-4639-b606-6166c1fb5cee';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_collection';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'full',
      'links' => 0,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'c4d69559-c107-4639-b606-6166c1fb5cee';
  $display->content['new-c4d69559-c107-4639-b606-6166c1fb5cee'] = $pane;
  $display->panels['right'][1] = 'new-c4d69559-c107-4639-b606-6166c1fb5cee';
  $pane = new stdClass();
  $pane->pid = 'new-817df886-2578-4c8c-95ce-f954681dc609';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_items';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'default',
      'links' => 1,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '  ',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '817df886-2578-4c8c-95ce-f954681dc609';
  $display->content['new-817df886-2578-4c8c-95ce-f954681dc609'] = $pane;
  $display->panels['right'][2] = 'new-817df886-2578-4c8c-95ce-f954681dc609';
  $pane = new stdClass();
  $pane->pid = 'new-02319785-0e5d-401b-9043-758eb1ec7500';
  $pane->panel = 'top';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '02319785-0e5d-401b-9043-758eb1ec7500';
  $display->content['new-02319785-0e5d-401b-9043-758eb1ec7500'] = $pane;
  $display->panels['top'][0] = 'new-02319785-0e5d-401b-9043-758eb1ec7500';
  $pane = new stdClass();
  $pane->pid = 'new-808c329d-7b20-4334-805f-2d67b354ce35';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-large_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '808c329d-7b20-4334-805f-2d67b354ce35';
  $display->content['new-808c329d-7b20-4334-805f-2d67b354ce35'] = $pane;
  $display->panels['top'][1] = 'new-808c329d-7b20-4334-805f-2d67b354ce35';
  $pane = new stdClass();
  $pane->pid = 'new-e1fb8197-d2ec-45dd-9c0a-563428dc66e1';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_large';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'e1fb8197-d2ec-45dd-9c0a-563428dc66e1';
  $display->content['new-e1fb8197-d2ec-45dd-9c0a-563428dc66e1'] = $pane;
  $display->panels['top'][2] = 'new-e1fb8197-d2ec-45dd-9c0a-563428dc66e1';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_11'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_12';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -6;
  $handler->conf = array(
    'title' => 'Person Detail',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'logic' => 'and',
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'person' => 'person',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = '2afaae24-533f-48f1-888e-8921b62fd73d';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-69b0c3e9-1779-4da3-9dec-3fe6c9dc43b5';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane_thumbnail';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '69b0c3e9-1779-4da3-9dec-3fe6c9dc43b5';
  $display->content['new-69b0c3e9-1779-4da3-9dec-3fe6c9dc43b5'] = $pane;
  $display->panels['left'][0] = 'new-69b0c3e9-1779-4da3-9dec-3fe6c9dc43b5';
  $pane = new stdClass();
  $pane->pid = 'new-bc6377b6-92f9-4907-bed8-300e7c545699';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'bc6377b6-92f9-4907-bed8-300e7c545699';
  $display->content['new-bc6377b6-92f9-4907-bed8-300e7c545699'] = $pane;
  $display->panels['left'][1] = 'new-bc6377b6-92f9-4907-bed8-300e7c545699';
  $pane = new stdClass();
  $pane->pid = 'new-c9746949-f3c8-4cbf-b61f-47072ff919e1';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'events_related-panel_pane_3';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-top-three-columns',
  );
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'c9746949-f3c8-4cbf-b61f-47072ff919e1';
  $display->content['new-c9746949-f3c8-4cbf-b61f-47072ff919e1'] = $pane;
  $display->panels['left'][2] = 'new-c9746949-f3c8-4cbf-b61f-47072ff919e1';
  $pane = new stdClass();
  $pane->pid = 'new-7fdf3875-3886-43e5-bed8-5cceacc64bec';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'events_related-events_related_to_person';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-top-three-columns',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '7fdf3875-3886-43e5-bed8-5cceacc64bec';
  $display->content['new-7fdf3875-3886-43e5-bed8-5cceacc64bec'] = $pane;
  $display->panels['left'][3] = 'new-7fdf3875-3886-43e5-bed8-5cceacc64bec';
  $pane = new stdClass();
  $pane->pid = 'new-fe668f45-bfdf-4968-aa71-94899472e9bf';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-2';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:person:field_hide_share_buttons',
        'settings' => array(
          'field_hide_share_buttons' => array(
            'und' => array(
              0 => array(
                'value' => 1,
              ),
            ),
          ),
          'field_hide_share_buttons_value' => '1',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => TRUE,
      ),
    ),
  );
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Share This',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'fe668f45-bfdf-4968-aa71-94899472e9bf';
  $display->content['new-fe668f45-bfdf-4968-aa71-94899472e9bf'] = $pane;
  $display->panels['right'][0] = 'new-fe668f45-bfdf-4968-aa71-94899472e9bf';
  $pane = new stdClass();
  $pane->pid = 'new-552d1296-6f94-47a2-b47f-8a2ff7cd4835';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_person_name_first';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '552d1296-6f94-47a2-b47f-8a2ff7cd4835';
  $display->content['new-552d1296-6f94-47a2-b47f-8a2ff7cd4835'] = $pane;
  $display->panels['top'][0] = 'new-552d1296-6f94-47a2-b47f-8a2ff7cd4835';
  $pane = new stdClass();
  $pane->pid = 'new-a1678bbc-258c-43b7-80b5-b096f237a3cd';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_person_name_last';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'a1678bbc-258c-43b7-80b5-b096f237a3cd';
  $display->content['new-a1678bbc-258c-43b7-80b5-b096f237a3cd'] = $pane;
  $display->panels['top'][1] = 'new-a1678bbc-258c-43b7-80b5-b096f237a3cd';
  $pane = new stdClass();
  $pane->pid = 'new-cf0c7a58-8ef6-4e54-b244-d34c78f2e291';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_subtitle';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_trimmed',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'trim_length' => '200',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'cf0c7a58-8ef6-4e54-b244-d34c78f2e291';
  $display->content['new-cf0c7a58-8ef6-4e54-b244-d34c78f2e291'] = $pane;
  $display->panels['top'][2] = 'new-cf0c7a58-8ef6-4e54-b244-d34c78f2e291';
  $pane = new stdClass();
  $pane->pid = 'new-5ff4c961-1d18-40b8-8695-314c36f24dd6';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_email';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'email_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '5ff4c961-1d18-40b8-8695-314c36f24dd6';
  $display->content['new-5ff4c961-1d18-40b8-8695-314c36f24dd6'] = $pane;
  $display->panels['top'][3] = 'new-5ff4c961-1d18-40b8-8695-314c36f24dd6';
  $pane = new stdClass();
  $pane->pid = 'new-de206398-081b-4ba0-a58c-ccf652d3ff35';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_phone';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'phone',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = 'de206398-081b-4ba0-a58c-ccf652d3ff35';
  $display->content['new-de206398-081b-4ba0-a58c-ccf652d3ff35'] = $pane;
  $display->panels['top'][4] = 'new-de206398-081b-4ba0-a58c-ccf652d3ff35';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_12'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_13';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -9;
  $handler->conf = array(
    'title' => 'Field Trip Detail',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'field_trip' => 'field_trip',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'febfcbdd-94de-4ce2-ae6f-e0bc6999ea21';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-6a4feb8b-6baa-480a-97b4-c98133070570';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '6a4feb8b-6baa-480a-97b4-c98133070570';
  $display->content['new-6a4feb8b-6baa-480a-97b4-c98133070570'] = $pane;
  $display->panels['left'][0] = 'new-6a4feb8b-6baa-480a-97b4-c98133070570';
  $pane = new stdClass();
  $pane->pid = 'new-beb16945-beba-4840-9528-d2c7e2494958';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'beb16945-beba-4840-9528-d2c7e2494958';
  $display->content['new-beb16945-beba-4840-9528-d2c7e2494958'] = $pane;
  $display->panels['left'][1] = 'new-beb16945-beba-4840-9528-d2c7e2494958';
  $pane = new stdClass();
  $pane->pid = 'new-d7e53e1a-acfc-45f2-9e7b-3f3693e2ae80';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'd7e53e1a-acfc-45f2-9e7b-3f3693e2ae80';
  $display->content['new-d7e53e1a-acfc-45f2-9e7b-3f3693e2ae80'] = $pane;
  $display->panels['left'][2] = 'new-d7e53e1a-acfc-45f2-9e7b-3f3693e2ae80';
  $pane = new stdClass();
  $pane->pid = 'new-77a4b606-574b-4b66-b010-a9be4735236a';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_cta_buttons';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '77a4b606-574b-4b66-b010-a9be4735236a';
  $display->content['new-77a4b606-574b-4b66-b010-a9be4735236a'] = $pane;
  $display->panels['left'][3] = 'new-77a4b606-574b-4b66-b010-a9be4735236a';
  $pane = new stdClass();
  $pane->pid = 'new-e2fd529f-2fa8-4da8-97f0-5d1ad16bc4c2';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'section',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = 'e2fd529f-2fa8-4da8-97f0-5d1ad16bc4c2';
  $display->content['new-e2fd529f-2fa8-4da8-97f0-5d1ad16bc4c2'] = $pane;
  $display->panels['left'][4] = 'new-e2fd529f-2fa8-4da8-97f0-5d1ad16bc4c2';
  $pane = new stdClass();
  $pane->pid = 'new-d65b89bd-9a0b-40ee-a586-f1bafa92507c';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'subtitle_image_body',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'floated-fields',
  );
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = 'd65b89bd-9a0b-40ee-a586-f1bafa92507c';
  $display->content['new-d65b89bd-9a0b-40ee-a586-f1bafa92507c'] = $pane;
  $display->panels['left'][5] = 'new-d65b89bd-9a0b-40ee-a586-f1bafa92507c';
  $pane = new stdClass();
  $pane->pid = 'new-cb41ad21-6537-4bf9-a50b-52b27c40173e';
  $pane->panel = 'right';
  $pane->type = 'views_panes';
  $pane->subtype = 'field_trips-field_trips_additional_info_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'cb41ad21-6537-4bf9-a50b-52b27c40173e';
  $display->content['new-cb41ad21-6537-4bf9-a50b-52b27c40173e'] = $pane;
  $display->panels['right'][0] = 'new-cb41ad21-6537-4bf9-a50b-52b27c40173e';
  $pane = new stdClass();
  $pane->pid = 'new-d4cdf274-fddb-4ade-a719-4913e7a6f3cd';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'field_trips-panel_pane_5';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '723',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '723',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      1 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '726',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '726',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      2 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '727',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '727',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      3 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '728',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '728',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      4 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '729',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '729',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
    ),
    'logic' => 'or',
  );
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'd4cdf274-fddb-4ade-a719-4913e7a6f3cd';
  $display->content['new-d4cdf274-fddb-4ade-a719-4913e7a6f3cd'] = $pane;
  $display->panels['top'][0] = 'new-d4cdf274-fddb-4ade-a719-4913e7a6f3cd';
  $pane = new stdClass();
  $pane->pid = 'new-144a4d33-0c48-4f48-a335-77e00ce50ab6';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'field_trips-panel_pane_6';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '730',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '730',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      1 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '731',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '731',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      2 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '732',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '732',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      3 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '733',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '733',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
    ),
    'logic' => 'or',
  );
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '144a4d33-0c48-4f48-a335-77e00ce50ab6';
  $display->content['new-144a4d33-0c48-4f48-a335-77e00ce50ab6'] = $pane;
  $display->panels['top'][1] = 'new-144a4d33-0c48-4f48-a335-77e00ce50ab6';
  $pane = new stdClass();
  $pane->pid = 'new-58abf210-ebe0-493f-ae75-b28f171926df';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'field_trips-panel_pane_10';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '2078',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '2078',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      1 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '2079',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '2079',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      2 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '2080',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '2080',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      3 => array(
        'name' => 'entity_field_value:node:field_trip:field_field_trip_type',
        'settings' => array(
          'field_field_trip_type' => array(
            'und' => array(
              0 => array(
                'tid' => '2081',
              ),
            ),
          ),
          'field_field_trip_type_tid' => '2081',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
    ),
    'logic' => 'or',
  );
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '58abf210-ebe0-493f-ae75-b28f171926df';
  $display->content['new-58abf210-ebe0-493f-ae75-b28f171926df'] = $pane;
  $display->panels['top'][2] = 'new-58abf210-ebe0-493f-ae75-b28f171926df';
  $pane = new stdClass();
  $pane->pid = 'new-86266b11-c667-482c-87ff-cfc00f120f4c';
  $pane->panel = 'top';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '86266b11-c667-482c-87ff-cfc00f120f4c';
  $display->content['new-86266b11-c667-482c-87ff-cfc00f120f4c'] = $pane;
  $display->panels['top'][3] = 'new-86266b11-c667-482c-87ff-cfc00f120f4c';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_13'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_14';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -10;
  $handler->conf = array(
    'title' => 'Field Trip Landing Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'page-field-trips-landing',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '1',
            'paths' => 'educators/field-trips
educators/field-trips/rock-program
educators/field-trips/connect-to-classrooms',
          ),
          'context' => 'empty',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = '9b05e8d7-eaf6-44b4-a193-b14504f792f0';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-c90360cc-7043-4be3-8280-ff2556d26742';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'c90360cc-7043-4be3-8280-ff2556d26742';
  $display->content['new-c90360cc-7043-4be3-8280-ff2556d26742'] = $pane;
  $display->panels['left'][0] = 'new-c90360cc-7043-4be3-8280-ff2556d26742';
  $pane = new stdClass();
  $pane->pid = 'new-aba4a66a-a422-44d6-9991-b99dc7dc6a6a';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'aba4a66a-a422-44d6-9991-b99dc7dc6a6a';
  $display->content['new-aba4a66a-a422-44d6-9991-b99dc7dc6a6a'] = $pane;
  $display->panels['left'][1] = 'new-aba4a66a-a422-44d6-9991-b99dc7dc6a6a';
  $pane = new stdClass();
  $pane->pid = 'new-1c989a90-83f9-46fd-bde5-139359f5b598';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '1c989a90-83f9-46fd-bde5-139359f5b598';
  $display->content['new-1c989a90-83f9-46fd-bde5-139359f5b598'] = $pane;
  $display->panels['left'][2] = 'new-1c989a90-83f9-46fd-bde5-139359f5b598';
  $pane = new stdClass();
  $pane->pid = 'new-a1832cba-7a8a-4618-8289-76b81bfb4436';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'section',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'a1832cba-7a8a-4618-8289-76b81bfb4436';
  $display->content['new-a1832cba-7a8a-4618-8289-76b81bfb4436'] = $pane;
  $display->panels['left'][3] = 'new-a1832cba-7a8a-4618-8289-76b81bfb4436';
  $pane = new stdClass();
  $pane->pid = 'new-f003215a-700a-44d6-a9e2-058d0f49c51c';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_cta_link';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'link_default',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = 'f003215a-700a-44d6-a9e2-058d0f49c51c';
  $display->content['new-f003215a-700a-44d6-a9e2-058d0f49c51c'] = $pane;
  $display->panels['left'][4] = 'new-f003215a-700a-44d6-a9e2-058d0f49c51c';
  $pane = new stdClass();
  $pane->pid = 'new-0a255ec6-d149-4af7-aa5a-d1f059589f9e';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'edit' => 'Edit',
      'delete' => 'Delete',
      'add' => 'Add',
      'description' => 0,
      'view_mode' => 'subtitle_image_body',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'section',
  );
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '0a255ec6-d149-4af7-aa5a-d1f059589f9e';
  $display->content['new-0a255ec6-d149-4af7-aa5a-d1f059589f9e'] = $pane;
  $display->panels['left'][5] = 'new-0a255ec6-d149-4af7-aa5a-d1f059589f9e';
  $pane = new stdClass();
  $pane->pid = 'new-66411063-2a82-4b93-bd2d-15ea2304a61a';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'field_trips-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'path_visibility',
        'settings' => array(
          'visibility_setting' => '1',
          'paths' => 'educators/field-trips',
        ),
        'context' => 'empty',
        'not' => FALSE,
      ),
    ),
  );
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'exposed-filters image-floated',
  );
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = '66411063-2a82-4b93-bd2d-15ea2304a61a';
  $display->content['new-66411063-2a82-4b93-bd2d-15ea2304a61a'] = $pane;
  $display->panels['left'][6] = 'new-66411063-2a82-4b93-bd2d-15ea2304a61a';
  $pane = new stdClass();
  $pane->pid = 'new-2776b4ba-8733-45fc-bb3a-b7984c57c25d';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'field_trips-panel_pane_9';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'path_visibility',
        'settings' => array(
          'visibility_setting' => '1',
          'paths' => 'educators/field-trips/rock-program',
        ),
        'context' => 'empty',
        'not' => FALSE,
      ),
    ),
  );
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'exposed-filters image-floated',
  );
  $pane->extras = array();
  $pane->position = 7;
  $pane->locks = array();
  $pane->uuid = '2776b4ba-8733-45fc-bb3a-b7984c57c25d';
  $display->content['new-2776b4ba-8733-45fc-bb3a-b7984c57c25d'] = $pane;
  $display->panels['left'][7] = 'new-2776b4ba-8733-45fc-bb3a-b7984c57c25d';
  $pane = new stdClass();
  $pane->pid = 'new-8951bc57-3ea6-4e02-9027-b96ea353e965';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'field_trips-panel_pane_11';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'path_visibility',
        'settings' => array(
          'visibility_setting' => '1',
          'paths' => 'educators/field-trips/connect-to-classrooms',
        ),
        'context' => 'empty',
        'not' => FALSE,
      ),
    ),
  );
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'exposed-filters image-floated',
  );
  $pane->extras = array();
  $pane->position = 8;
  $pane->locks = array();
  $pane->uuid = '8951bc57-3ea6-4e02-9027-b96ea353e965';
  $display->content['new-8951bc57-3ea6-4e02-9027-b96ea353e965'] = $pane;
  $display->panels['left'][8] = 'new-8951bc57-3ea6-4e02-9027-b96ea353e965';
  $pane = new stdClass();
  $pane->pid = 'new-96dd33d6-ed14-4f02-8f91-f27ff26bfc29';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_collection';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'default',
      'links' => 0,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '96dd33d6-ed14-4f02-8f91-f27ff26bfc29';
  $display->content['new-96dd33d6-ed14-4f02-8f91-f27ff26bfc29'] = $pane;
  $display->panels['right'][0] = 'new-96dd33d6-ed14-4f02-8f91-f27ff26bfc29';
  $pane = new stdClass();
  $pane->pid = 'new-7c895e47-44ff-4ade-b725-61e9fd2735df';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_items';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'default',
      'links' => 1,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '7c895e47-44ff-4ade-b725-61e9fd2735df';
  $display->content['new-7c895e47-44ff-4ade-b725-61e9fd2735df'] = $pane;
  $display->panels['right'][1] = 'new-7c895e47-44ff-4ade-b725-61e9fd2735df';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_14'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_15';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -4;
  $handler->conf = array(
    'title' => 'Lesson Plan Detail',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'lesson_plan' => 'lesson_plan',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = '45009a50-7764-4c49-b2ae-2096d277810f';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-ea420ad0-09d6-47c9-ab5f-f43caedb18c6';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'ea420ad0-09d6-47c9-ab5f-f43caedb18c6';
  $display->content['new-ea420ad0-09d6-47c9-ab5f-f43caedb18c6'] = $pane;
  $display->panels['left'][0] = 'new-ea420ad0-09d6-47c9-ab5f-f43caedb18c6';
  $pane = new stdClass();
  $pane->pid = 'new-9407c22e-532b-471b-abfd-204475b9efb8';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '9407c22e-532b-471b-abfd-204475b9efb8';
  $display->content['new-9407c22e-532b-471b-abfd-204475b9efb8'] = $pane;
  $display->panels['left'][1] = 'new-9407c22e-532b-471b-abfd-204475b9efb8';
  $pane = new stdClass();
  $pane->pid = 'new-256a28c9-8154-44f1-9963-35b2e15b9024';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '256a28c9-8154-44f1-9963-35b2e15b9024';
  $display->content['new-256a28c9-8154-44f1-9963-35b2e15b9024'] = $pane;
  $display->panels['left'][2] = 'new-256a28c9-8154-44f1-9963-35b2e15b9024';
  $pane = new stdClass();
  $pane->pid = 'new-9fe6c432-1051-418a-878e-23f71e1c1dff';
  $pane->panel = 'left';
  $pane->type = 'node_body';
  $pane->subtype = 'node_body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '9fe6c432-1051-418a-878e-23f71e1c1dff';
  $display->content['new-9fe6c432-1051-418a-878e-23f71e1c1dff'] = $pane;
  $display->panels['left'][3] = 'new-9fe6c432-1051-418a-878e-23f71e1c1dff';
  $pane = new stdClass();
  $pane->pid = 'new-d0165da4-1529-4e62-a220-e87b4058b20f';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'edit' => '',
      'delete' => '',
      'add' => '',
      'description' => 0,
      'view_mode' => 'subtitle_image_body',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'floated-fields',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = 'd0165da4-1529-4e62-a220-e87b4058b20f';
  $display->content['new-d0165da4-1529-4e62-a220-e87b4058b20f'] = $pane;
  $display->panels['left'][4] = 'new-d0165da4-1529-4e62-a220-e87b4058b20f';
  $pane = new stdClass();
  $pane->pid = 'new-d94c9c17-fc4b-4fde-96c0-e7e21ca82b35';
  $pane->panel = 'right';
  $pane->type = 'views_panes';
  $pane->subtype = 'lesson_plan_content-additional_info_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'd94c9c17-fc4b-4fde-96c0-e7e21ca82b35';
  $display->content['new-d94c9c17-fc4b-4fde-96c0-e7e21ca82b35'] = $pane;
  $display->panels['right'][0] = 'new-d94c9c17-fc4b-4fde-96c0-e7e21ca82b35';
  $pane = new stdClass();
  $pane->pid = 'new-9f494b36-ad73-4e53-85e0-1356b80a7825';
  $pane->panel = 'right';
  $pane->type = 'views_panes';
  $pane->subtype = 'file_listings-attached_files_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '9f494b36-ad73-4e53-85e0-1356b80a7825';
  $display->content['new-9f494b36-ad73-4e53-85e0-1356b80a7825'] = $pane;
  $display->panels['right'][1] = 'new-9f494b36-ad73-4e53-85e0-1356b80a7825';
  $pane = new stdClass();
  $pane->pid = 'new-a0887d13-41d7-4d14-ab27-168184b4eabd';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_collection';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'secondary_display',
      'links' => 0,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'a0887d13-41d7-4d14-ab27-168184b4eabd';
  $display->content['new-a0887d13-41d7-4d14-ab27-168184b4eabd'] = $pane;
  $display->panels['right'][2] = 'new-a0887d13-41d7-4d14-ab27-168184b4eabd';
  $pane = new stdClass();
  $pane->pid = 'new-f8bee429-3306-4795-a4b9-5db770900d0b';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_items';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'default',
      'links' => 1,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '  ',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'f8bee429-3306-4795-a4b9-5db770900d0b';
  $display->content['new-f8bee429-3306-4795-a4b9-5db770900d0b'] = $pane;
  $display->panels['right'][3] = 'new-f8bee429-3306-4795-a4b9-5db770900d0b';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_15'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_17';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -8;
  $handler->conf = array(
    'title' => 'Content Page',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(
      0 => array(
        'identifier' => 'Taxonomy term from Node (on Node: Ticketing Links [field_ticketing_links])',
        'keyword' => 'taxonomy_term',
        'name' => 'entity_from_field:field_ticketing_links-node-taxonomy_term',
        'delta' => '0',
        'context' => 'argument_entity_id:node_1',
        'id' => 1,
      ),
    ),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'content_page' => 'content_page',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = '87f814a3-30f8-491d-90a8-6b2b6c6d1e4e';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-0b672e27-c807-4c0b-9068-7b85e8b787a4';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '0b672e27-c807-4c0b-9068-7b85e8b787a4';
  $display->content['new-0b672e27-c807-4c0b-9068-7b85e8b787a4'] = $pane;
  $display->panels['left'][0] = 'new-0b672e27-c807-4c0b-9068-7b85e8b787a4';
  $pane = new stdClass();
  $pane->pid = 'new-c8f919f7-c841-4444-8fb8-b237ed43f69b';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'c8f919f7-c841-4444-8fb8-b237ed43f69b';
  $display->content['new-c8f919f7-c841-4444-8fb8-b237ed43f69b'] = $pane;
  $display->panels['left'][1] = 'new-c8f919f7-c841-4444-8fb8-b237ed43f69b';
  $pane = new stdClass();
  $pane->pid = 'new-5849989c-4cfe-46b7-b276-a423724f662b';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '5849989c-4cfe-46b7-b276-a423724f662b';
  $display->content['new-5849989c-4cfe-46b7-b276-a423724f662b'] = $pane;
  $display->panels['left'][2] = 'new-5849989c-4cfe-46b7-b276-a423724f662b';
  $pane = new stdClass();
  $pane->pid = 'new-ebcac5d2-5ee2-4101-80dc-a95965afb398';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_cta_buttons';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'ebcac5d2-5ee2-4101-80dc-a95965afb398';
  $display->content['new-ebcac5d2-5ee2-4101-80dc-a95965afb398'] = $pane;
  $display->panels['left'][3] = 'new-ebcac5d2-5ee2-4101-80dc-a95965afb398';
  $pane = new stdClass();
  $pane->pid = 'new-008356e4-4901-4fe7-a034-661b4aa3ed3f';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'section',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '008356e4-4901-4fe7-a034-661b4aa3ed3f';
  $display->content['new-008356e4-4901-4fe7-a034-661b4aa3ed3f'] = $pane;
  $display->panels['left'][4] = 'new-008356e4-4901-4fe7-a034-661b4aa3ed3f';
  $pane = new stdClass();
  $pane->pid = 'new-8e447deb-257d-4871-919b-2474a0336905';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'ticketing_displays-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '8e447deb-257d-4871-919b-2474a0336905';
  $display->content['new-8e447deb-257d-4871-919b-2474a0336905'] = $pane;
  $display->panels['left'][5] = 'new-8e447deb-257d-4871-919b-2474a0336905';
  $pane = new stdClass();
  $pane->pid = 'new-5eac8f7b-5afa-43dd-a599-4b557efdb4cf';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_google_map';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'link_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = '5eac8f7b-5afa-43dd-a599-4b557efdb4cf';
  $display->content['new-5eac8f7b-5afa-43dd-a599-4b557efdb4cf'] = $pane;
  $display->panels['left'][6] = 'new-5eac8f7b-5afa-43dd-a599-4b557efdb4cf';
  $pane = new stdClass();
  $pane->pid = 'new-b6ad631f-eb2f-4d59-b8d3-d6200538a5ae';
  $pane->panel = 'left';
  $pane->type = 'views';
  $pane->subtype = 'testimonials_related';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:content_page:field_include_testimonial',
        'settings' => array(
          'field_include_testimonial' => array(
            'und' => array(
              0 => array(
                'value' => 1,
              ),
            ),
          ),
          'field_include_testimonial_value' => '1',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
    ),
  );
  $pane->configuration = array(
    'override_pager_settings' => 0,
    'use_pager' => 0,
    'nodes_per_page' => '1',
    'pager_id' => '0',
    'offset' => '0',
    'more_link' => 0,
    'feed_icons' => 0,
    'panel_args' => 0,
    'link_to_view' => 0,
    'args' => '',
    'url' => '',
    'display' => 'default',
    'context' => array(
      0 => '',
    ),
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 7;
  $pane->locks = array();
  $pane->uuid = 'b6ad631f-eb2f-4d59-b8d3-d6200538a5ae';
  $display->content['new-b6ad631f-eb2f-4d59-b8d3-d6200538a5ae'] = $pane;
  $display->panels['left'][7] = 'new-b6ad631f-eb2f-4d59-b8d3-d6200538a5ae';
  $pane = new stdClass();
  $pane->pid = 'new-001cf5a5-55e2-4d52-9cf1-1ad030c08454';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'subtitle_image_body',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'floated-fields',
  );
  $pane->extras = array();
  $pane->position = 8;
  $pane->locks = array();
  $pane->uuid = '001cf5a5-55e2-4d52-9cf1-1ad030c08454';
  $display->content['new-001cf5a5-55e2-4d52-9cf1-1ad030c08454'] = $pane;
  $display->panels['left'][8] = 'new-001cf5a5-55e2-4d52-9cf1-1ad030c08454';
  $pane = new stdClass();
  $pane->pid = 'new-e29da093-bec2-4666-a21d-d84e1da43d32';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content_subtitle';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 9;
  $pane->locks = array();
  $pane->uuid = 'e29da093-bec2-4666-a21d-d84e1da43d32';
  $display->content['new-e29da093-bec2-4666-a21d-d84e1da43d32'] = $pane;
  $display->panels['left'][9] = 'new-e29da093-bec2-4666-a21d-d84e1da43d32';
  $pane = new stdClass();
  $pane->pid = 'new-be5be7c1-feb9-45ce-8ee3-6e63b06b9a16';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'related_content-new_tagged_content_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'more_link' => 0,
    'use_pager' => 0,
    'pager_id' => '0',
    'items_per_page' => '25',
    'offset' => '0',
    'fields_override' => array(
      'edit_node' => 1,
      'field_hero_region' => 1,
      'title' => 1,
      'body' => 1,
      'field_cta_link' => 1,
    ),
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
    'override_title' => 0,
    'override_title_text' => 'Related Content',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-floated',
  );
  $pane->extras = array();
  $pane->position = 10;
  $pane->locks = array();
  $pane->uuid = 'be5be7c1-feb9-45ce-8ee3-6e63b06b9a16';
  $display->content['new-be5be7c1-feb9-45ce-8ee3-6e63b06b9a16'] = $pane;
  $display->panels['left'][10] = 'new-be5be7c1-feb9-45ce-8ee3-6e63b06b9a16';
  $pane = new stdClass();
  $pane->pid = 'new-e2373436-27a0-4c93-beed-15a34221c269';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_tertiary_subhead';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 11;
  $pane->locks = array();
  $pane->uuid = 'e2373436-27a0-4c93-beed-15a34221c269';
  $display->content['new-e2373436-27a0-4c93-beed-15a34221c269'] = $pane;
  $display->panels['left'][11] = 'new-e2373436-27a0-4c93-beed-15a34221c269';
  $pane = new stdClass();
  $pane->pid = 'new-76255c59-929c-4cc3-815a-a8b09b6d2165';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_summary';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 12;
  $pane->locks = array();
  $pane->uuid = '76255c59-929c-4cc3-815a-a8b09b6d2165';
  $display->content['new-76255c59-929c-4cc3-815a-a8b09b6d2165'] = $pane;
  $display->panels['left'][12] = 'new-76255c59-929c-4cc3-815a-a8b09b6d2165';
  $pane = new stdClass();
  $pane->pid = 'new-17ebace4-608f-4d47-b784-b4ce1a607425';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_content_column';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'column-fields',
  );
  $pane->extras = array();
  $pane->position = 13;
  $pane->locks = array();
  $pane->uuid = '17ebace4-608f-4d47-b784-b4ce1a607425';
  $display->content['new-17ebace4-608f-4d47-b784-b4ce1a607425'] = $pane;
  $display->panels['left'][13] = 'new-17ebace4-608f-4d47-b784-b4ce1a607425';
  $pane = new stdClass();
  $pane->pid = 'new-2e898c39-ac5a-43d8-9e2b-d01139c31ff1';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'content_pages_related-panel_pane_1';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'empty',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 14;
  $pane->locks = array();
  $pane->uuid = '2e898c39-ac5a-43d8-9e2b-d01139c31ff1';
  $display->content['new-2e898c39-ac5a-43d8-9e2b-d01139c31ff1'] = $pane;
  $display->panels['left'][14] = 'new-2e898c39-ac5a-43d8-9e2b-d01139c31ff1';
  $pane = new stdClass();
  $pane->pid = 'new-21db1381-bada-4608-9095-4fbfe9de9667';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_pages_subtitle';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 15;
  $pane->locks = array();
  $pane->uuid = '21db1381-bada-4608-9095-4fbfe9de9667';
  $display->content['new-21db1381-bada-4608-9095-4fbfe9de9667'] = $pane;
  $display->panels['left'][15] = 'new-21db1381-bada-4608-9095-4fbfe9de9667';
  $pane = new stdClass();
  $pane->pid = 'new-b6f37a17-2145-47b7-a07f-40902039ba67';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_pages_description';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'text_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 16;
  $pane->locks = array();
  $pane->uuid = 'b6f37a17-2145-47b7-a07f-40902039ba67';
  $display->content['new-b6f37a17-2145-47b7-a07f-40902039ba67'] = $pane;
  $display->panels['left'][16] = 'new-b6f37a17-2145-47b7-a07f-40902039ba67';
  $pane = new stdClass();
  $pane->pid = 'new-a169d236-fe1f-42c2-a610-53b131b1c2f2';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'related_content-related_content_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'more_link' => 0,
    'use_pager' => 0,
    'pager_id' => '0',
    'items_per_page' => '6',
    'offset' => '0',
    'fields_override' => array(
      'edit_node' => 1,
      'field_hero_region' => 1,
      'title' => 1,
      'body' => 1,
    ),
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
    'override_title' => 1,
    'override_title_text' => '',
    'link_to_view' => 0,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-top-three-columns',
  );
  $pane->extras = array();
  $pane->position = 17;
  $pane->locks = array();
  $pane->uuid = 'a169d236-fe1f-42c2-a610-53b131b1c2f2';
  $display->content['new-a169d236-fe1f-42c2-a610-53b131b1c2f2'] = $pane;
  $display->panels['left'][17] = 'new-a169d236-fe1f-42c2-a610-53b131b1c2f2';
  $pane = new stdClass();
  $pane->pid = 'new-68af1d39-e57f-4d7f-b79e-0dc7ed7e3d2e';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-2';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:content_page:field_hide_share_buttons',
        'settings' => array(
          'field_hide_share_buttons' => array(
            'und' => array(
              0 => array(
                'value' => 1,
              ),
            ),
          ),
          'field_hide_share_buttons_value' => '1',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => TRUE,
      ),
    ),
  );
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Share This',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '68af1d39-e57f-4d7f-b79e-0dc7ed7e3d2e';
  $display->content['new-68af1d39-e57f-4d7f-b79e-0dc7ed7e3d2e'] = $pane;
  $display->panels['right'][0] = 'new-68af1d39-e57f-4d7f-b79e-0dc7ed7e3d2e';
  $pane = new stdClass();
  $pane->pid = 'new-e9c744ad-df7d-4de5-98e3-91e092b399d2';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_collection';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'full',
      'links' => 1,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'e9c744ad-df7d-4de5-98e3-91e092b399d2';
  $display->content['new-e9c744ad-df7d-4de5-98e3-91e092b399d2'] = $pane;
  $display->panels['right'][1] = 'new-e9c744ad-df7d-4de5-98e3-91e092b399d2';
  $pane = new stdClass();
  $pane->pid = 'new-570aa529-1590-4e96-a546-7577cc93398b';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_items';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'default',
      'links' => 1,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => ' ',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '570aa529-1590-4e96-a546-7577cc93398b';
  $display->content['new-570aa529-1590-4e96-a546-7577cc93398b'] = $pane;
  $display->panels['right'][2] = 'new-570aa529-1590-4e96-a546-7577cc93398b';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_17'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_19';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -21;
  $handler->conf = array(
    'title' => 'ES Landing Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'es_landing_page' => 'es_landing_page',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'threecol_25_50_25_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'middle' => array(
        'content' => array(
          'prefix' => '<div class="panel-col-middle">',
          'suffix' => '</div>',
        ),
        'theme' => 0,
      ),
      'top' => NULL,
      'bottom' => NULL,
      'left' => NULL,
      'right' => NULL,
    ),
    'left' => array(
      'style' => '-1',
    ),
    'right' => array(
      'style' => '-1',
    ),
    'middle' => array(
      'style' => 'wrapper_raw',
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = '55f1d04f-ebe6-4ced-89eb-9a8df0d040ac';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-565eb247-9806-4e66-b4f9-b0b81bec0b8f';
  $pane->panel = 'bottom';
  $pane->type = 'views_panes';
  $pane->subtype = 'es_explore_science-callout_strip';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-top-four-columns',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '565eb247-9806-4e66-b4f9-b0b81bec0b8f';
  $display->content['new-565eb247-9806-4e66-b4f9-b0b81bec0b8f'] = $pane;
  $display->panels['bottom'][0] = 'new-565eb247-9806-4e66-b4f9-b0b81bec0b8f';
  $pane = new stdClass();
  $pane->pid = 'new-8ce52fb2-2f62-453b-ab29-8ac44410bda3';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '8ce52fb2-2f62-453b-ab29-8ac44410bda3';
  $display->content['new-8ce52fb2-2f62-453b-ab29-8ac44410bda3'] = $pane;
  $display->panels['left'][0] = 'new-8ce52fb2-2f62-453b-ab29-8ac44410bda3';
  $pane = new stdClass();
  $pane->pid = 'new-2e5bc88f-697e-4dbf-b206-3189c80169e1';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'es_explore_science-academy_voices';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '2e5bc88f-697e-4dbf-b206-3189c80169e1';
  $display->content['new-2e5bc88f-697e-4dbf-b206-3189c80169e1'] = $pane;
  $display->panels['left'][1] = 'new-2e5bc88f-697e-4dbf-b206-3189c80169e1';
  $pane = new stdClass();
  $pane->pid = 'new-f5adb568-daf2-4f57-beb4-07f259b27779';
  $pane->panel = 'middle';
  $pane->type = 'views_panes';
  $pane->subtype = 'miscellaneous_content-editors_choice';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'f5adb568-daf2-4f57-beb4-07f259b27779';
  $display->content['new-f5adb568-daf2-4f57-beb4-07f259b27779'] = $pane;
  $display->panels['middle'][0] = 'new-f5adb568-daf2-4f57-beb4-07f259b27779';
  $pane = new stdClass();
  $pane->pid = 'new-06f7a980-32f4-4e04-a3c8-1b2a530d8b30';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_subtitle';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '06f7a980-32f4-4e04-a3c8-1b2a530d8b30';
  $display->content['new-06f7a980-32f4-4e04-a3c8-1b2a530d8b30'] = $pane;
  $display->panels['right'][0] = 'new-06f7a980-32f4-4e04-a3c8-1b2a530d8b30';
  $pane = new stdClass();
  $pane->pid = 'new-ddb5a7ff-7823-476d-8e20-4ff71adebe59';
  $pane->panel = 'right';
  $pane->type = 'views_panes';
  $pane->subtype = 'es_explore_science-most_recent';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'ddb5a7ff-7823-476d-8e20-4ff71adebe59';
  $display->content['new-ddb5a7ff-7823-476d-8e20-4ff71adebe59'] = $pane;
  $display->panels['right'][1] = 'new-ddb5a7ff-7823-476d-8e20-4ff71adebe59';
  $pane = new stdClass();
  $pane->pid = 'new-a424e72d-f378-4554-bffb-4eb1eb5d030e';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-large_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'a424e72d-f378-4554-bffb-4eb1eb5d030e';
  $display->content['new-a424e72d-f378-4554-bffb-4eb1eb5d030e'] = $pane;
  $display->panels['top'][0] = 'new-a424e72d-f378-4554-bffb-4eb1eb5d030e';
  $pane = new stdClass();
  $pane->pid = 'new-196560d1-4efa-48bf-bd7f-6342ef9b2793';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_large';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '196560d1-4efa-48bf-bd7f-6342ef9b2793';
  $display->content['new-196560d1-4efa-48bf-bd7f-6342ef9b2793'] = $pane;
  $display->panels['top'][1] = 'new-196560d1-4efa-48bf-bd7f-6342ef9b2793';
  $pane = new stdClass();
  $pane->pid = 'new-d709f57a-4b47-4c0a-a935-f255fb527069';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => array(
      'title' => array(
        'prefix' => '',
        'suffix' => '',
      ),
      'content' => array(
        'prefix' => '<div id="body-category-wrapper">
<div class="body-box">',
        'suffix' => '</div>',
      ),
      'theme' => 0,
    ),
    'style' => 'wrapper_raw',
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'd709f57a-4b47-4c0a-a935-f255fb527069';
  $display->content['new-d709f57a-4b47-4c0a-a935-f255fb527069'] = $pane;
  $display->panels['top'][2] = 'new-d709f57a-4b47-4c0a-a935-f255fb527069';
  $pane = new stdClass();
  $pane->pid = 'new-135e49f5-1395-4d0a-9f65-4d355b48e730';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'es_explore_science-selected_categories';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => array(
      'title' => array(
        'prefix' => '',
        'suffix' => '',
      ),
      'content' => array(
        'prefix' => '<div class="es-categories image-top">',
        'suffix' => '</div>
</div>',
      ),
      'theme' => 0,
    ),
    'style' => 'wrapper_raw',
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => '',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '135e49f5-1395-4d0a-9f65-4d355b48e730';
  $display->content['new-135e49f5-1395-4d0a-9f65-4d355b48e730'] = $pane;
  $display->panels['top'][3] = 'new-135e49f5-1395-4d0a-9f65-4d355b48e730';
  $pane = new stdClass();
  $pane->pid = 'new-3ddaedc4-c39f-4878-b2c7-23bf4e7b2aaf';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'content_collections-es_theme';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'delta' => '0',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'tri-large',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '3ddaedc4-c39f-4878-b2c7-23bf4e7b2aaf';
  $display->content['new-3ddaedc4-c39f-4878-b2c7-23bf4e7b2aaf'] = $pane;
  $display->panels['top'][4] = 'new-3ddaedc4-c39f-4878-b2c7-23bf4e7b2aaf';
  $pane = new stdClass();
  $pane->pid = 'new-07d2dc84-549e-4b41-adf0-d7739d9b3755';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'content_collections-es_theme';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'delta' => '1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'tri-large',
  );
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '07d2dc84-549e-4b41-adf0-d7739d9b3755';
  $display->content['new-07d2dc84-549e-4b41-adf0-d7739d9b3755'] = $pane;
  $display->panels['top'][5] = 'new-07d2dc84-549e-4b41-adf0-d7739d9b3755';
  $pane = new stdClass();
  $pane->pid = 'new-0bb2d4c2-bb92-44e5-a6e4-54ec4caa3b29';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'content_collections-es_theme';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'delta' => '2',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'tri-large',
  );
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = '0bb2d4c2-bb92-44e5-a6e4-54ec4caa3b29';
  $display->content['new-0bb2d4c2-bb92-44e5-a6e4-54ec4caa3b29'] = $pane;
  $display->panels['top'][6] = 'new-0bb2d4c2-bb92-44e5-a6e4-54ec4caa3b29';
  $pane = new stdClass();
  $pane->pid = 'new-676a8911-d0c3-405a-807b-3f8ae16fa681';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'content_collections-es_theme';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'delta' => '3',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'tri-large',
  );
  $pane->extras = array();
  $pane->position = 7;
  $pane->locks = array();
  $pane->uuid = '676a8911-d0c3-405a-807b-3f8ae16fa681';
  $display->content['new-676a8911-d0c3-405a-807b-3f8ae16fa681'] = $pane;
  $display->panels['top'][7] = 'new-676a8911-d0c3-405a-807b-3f8ae16fa681';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_19'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_2';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -17;
  $handler->conf = array(
    'title' => 'Event Detail',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(
      0 => array(
        'identifier' => 'Node from Node (on Node: Featured People [field_featured_people])',
        'keyword' => 'node_2',
        'name' => 'entity_from_field:field_featured_people-node-node',
        'delta' => '0',
        'context' => 'argument_entity_id:node_1',
        'id' => 1,
      ),
      1 => array(
        'identifier' => 'Taxonomy term from Node (on Node: Category [field_category])',
        'keyword' => 'taxonomy_term',
        'name' => 'entity_from_field:field_category-node-taxonomy_term',
        'delta' => 0,
        'context' => 'argument_entity_id:node_1',
        'id' => 1,
      ),
      2 => array(
        'identifier' => 'Taxonomy term from Node (on Node: Tags [field_tags])',
        'keyword' => 'taxonomy_term_2',
        'name' => 'entity_from_field:field_tags-node-taxonomy_term',
        'delta' => '0',
        'context' => 'argument_entity_id:node_1',
        'id' => 1,
      ),
    ),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'event' => 'event',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '3ad3b08a-a77e-4f52-828f-933fc273f406';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-71485415-2867-4c26-aec4-9269536b0d98';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '71485415-2867-4c26-aec4-9269536b0d98';
  $display->content['new-71485415-2867-4c26-aec4-9269536b0d98'] = $pane;
  $display->panels['left'][0] = 'new-71485415-2867-4c26-aec4-9269536b0d98';
  $pane = new stdClass();
  $pane->pid = 'new-51393f6b-de14-4a17-855d-9eb86a5e47c0';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '51393f6b-de14-4a17-855d-9eb86a5e47c0';
  $display->content['new-51393f6b-de14-4a17-855d-9eb86a5e47c0'] = $pane;
  $display->panels['left'][1] = 'new-51393f6b-de14-4a17-855d-9eb86a5e47c0';
  $pane = new stdClass();
  $pane->pid = 'new-6fa2c601-7701-47d3-bbac-0d3270939dc5';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '6fa2c601-7701-47d3-bbac-0d3270939dc5';
  $display->content['new-6fa2c601-7701-47d3-bbac-0d3270939dc5'] = $pane;
  $display->panels['left'][2] = 'new-6fa2c601-7701-47d3-bbac-0d3270939dc5';
  $pane = new stdClass();
  $pane->pid = 'new-f3ac2ce8-2fbc-4328-89ec-daa1565d3ba7';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_cta_buttons';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'f3ac2ce8-2fbc-4328-89ec-daa1565d3ba7';
  $display->content['new-f3ac2ce8-2fbc-4328-89ec-daa1565d3ba7'] = $pane;
  $display->panels['left'][3] = 'new-f3ac2ce8-2fbc-4328-89ec-daa1565d3ba7';
  $pane = new stdClass();
  $pane->pid = 'new-24bc1e62-828c-4d32-99dc-a02e501c6a84';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'section',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '24bc1e62-828c-4d32-99dc-a02e501c6a84';
  $display->content['new-24bc1e62-828c-4d32-99dc-a02e501c6a84'] = $pane;
  $display->panels['left'][4] = 'new-24bc1e62-828c-4d32-99dc-a02e501c6a84';
  $pane = new stdClass();
  $pane->pid = 'new-4dd6e55a-f048-4941-a1e9-126a5ee11bdc';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'featured_person_related-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'relationship_entity_from_field:field_featured_people-node-node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => 'featured-people',
    'css_class' => 'image-floated',
  );
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '4dd6e55a-f048-4941-a1e9-126a5ee11bdc';
  $display->content['new-4dd6e55a-f048-4941-a1e9-126a5ee11bdc'] = $pane;
  $display->panels['left'][5] = 'new-4dd6e55a-f048-4941-a1e9-126a5ee11bdc';
  $pane = new stdClass();
  $pane->pid = 'new-7f4fedd1-3601-47f2-a018-c0734927ba8a';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'staff-panel_pane_4';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-floated',
  );
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = '7f4fedd1-3601-47f2-a018-c0734927ba8a';
  $display->content['new-7f4fedd1-3601-47f2-a018-c0734927ba8a'] = $pane;
  $display->panels['left'][6] = 'new-7f4fedd1-3601-47f2-a018-c0734927ba8a';
  $pane = new stdClass();
  $pane->pid = 'new-ebbe6438-4ebf-44ac-b0c4-e98fe942893f';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'More About the Event',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'section column-fields',
  );
  $pane->extras = array();
  $pane->position = 7;
  $pane->locks = array();
  $pane->uuid = 'ebbe6438-4ebf-44ac-b0c4-e98fe942893f';
  $display->content['new-ebbe6438-4ebf-44ac-b0c4-e98fe942893f'] = $pane;
  $display->panels['left'][7] = 'new-ebbe6438-4ebf-44ac-b0c4-e98fe942893f';
  $pane = new stdClass();
  $pane->pid = 'new-3b6f54e5-3958-45f3-9cf2-95079fd3b9c9';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-2';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      1 => array(
        'name' => 'entity_field_value:node:event:field_hide_share_buttons',
        'settings' => array(
          'field_hide_share_buttons' => array(
            'und' => array(
              0 => array(
                'value' => 1,
              ),
            ),
          ),
          'field_hide_share_buttons_value' => '1',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => TRUE,
      ),
    ),
    'logic' => 'or',
  );
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => 'Share Button',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '3b6f54e5-3958-45f3-9cf2-95079fd3b9c9';
  $display->content['new-3b6f54e5-3958-45f3-9cf2-95079fd3b9c9'] = $pane;
  $display->panels['right'][0] = 'new-3b6f54e5-3958-45f3-9cf2-95079fd3b9c9';
  $pane = new stdClass();
  $pane->pid = 'new-e9eb375c-4460-41e6-8595-17caa67757f1';
  $pane->panel = 'right';
  $pane->type = 'views_panes';
  $pane->subtype = 'events_related-panel_pane_2';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'relationship_entity_from_field:field_category-node-taxonomy_term_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'e9eb375c-4460-41e6-8595-17caa67757f1';
  $display->content['new-e9eb375c-4460-41e6-8595-17caa67757f1'] = $pane;
  $display->panels['right'][1] = 'new-e9eb375c-4460-41e6-8595-17caa67757f1';
  $pane = new stdClass();
  $pane->pid = 'new-cd9d8499-4a61-45f5-885a-c8e666e9647e';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_collection';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'full',
      'links' => 0,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'cd9d8499-4a61-45f5-885a-c8e666e9647e';
  $display->content['new-cd9d8499-4a61-45f5-885a-c8e666e9647e'] = $pane;
  $display->panels['right'][2] = 'new-cd9d8499-4a61-45f5-885a-c8e666e9647e';
  $pane = new stdClass();
  $pane->pid = 'new-f2601941-156c-4908-82d1-9841f55c0243';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_items';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'default',
      'links' => 1,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '  ',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'f2601941-156c-4908-82d1-9841f55c0243';
  $display->content['new-f2601941-156c-4908-82d1-9841f55c0243'] = $pane;
  $display->panels['right'][3] = 'new-f2601941-156c-4908-82d1-9841f55c0243';
  $pane = new stdClass();
  $pane->pid = 'new-092977e1-b8e1-4228-a185-a6c1423a022d';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_category';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'taxonomy_term_reference_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '092977e1-b8e1-4228-a185-a6c1423a022d';
  $display->content['new-092977e1-b8e1-4228-a185-a6c1423a022d'] = $pane;
  $display->panels['top'][0] = 'new-092977e1-b8e1-4228-a185-a6c1423a022d';
  $pane = new stdClass();
  $pane->pid = 'new-2c55d804-1d5e-4cc9-aaa4-626c501fee09';
  $pane->panel = 'top';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '2c55d804-1d5e-4cc9-aaa4-626c501fee09';
  $display->content['new-2c55d804-1d5e-4cc9-aaa4-626c501fee09'] = $pane;
  $display->panels['top'][1] = 'new-2c55d804-1d5e-4cc9-aaa4-626c501fee09';
  $pane = new stdClass();
  $pane->pid = 'new-5f8793fc-9f7c-4816-8310-e73194040e6d';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'event_detail-primary_person_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '5f8793fc-9f7c-4816-8310-e73194040e6d';
  $display->content['new-5f8793fc-9f7c-4816-8310-e73194040e6d'] = $pane;
  $display->panels['top'][2] = 'new-5f8793fc-9f7c-4816-8310-e73194040e6d';
  $pane = new stdClass();
  $pane->pid = 'new-beb9e9b6-78d8-4712-851b-f86211ecad2e';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'event_detail-date_location_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'beb9e9b6-78d8-4712-851b-f86211ecad2e';
  $display->content['new-beb9e9b6-78d8-4712-851b-f86211ecad2e'] = $pane;
  $display->panels['top'][3] = 'new-beb9e9b6-78d8-4712-851b-f86211ecad2e';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_2'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_24';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -28;
  $handler->conf = array(
    'title' => 'Failover Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'page-failover',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'explore_science_article' => 'explore_science_article',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '1',
            'paths' => 'failover',
          ),
          'context' => 'empty',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'California Academy of Sciences';
  $display->uuid = '23810fd7-4d8a-4112-99a5-32c1a0f67ea4';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-ae2d490c-7e81-485c-9f85-edc69fd96d30';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'ae2d490c-7e81-485c-9f85-edc69fd96d30';
  $display->content['new-ae2d490c-7e81-485c-9f85-edc69fd96d30'] = $pane;
  $display->panels['left'][0] = 'new-ae2d490c-7e81-485c-9f85-edc69fd96d30';
  $pane = new stdClass();
  $pane->pid = 'new-5b511035-990a-46ce-bd09-09725e96ce7e';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '5b511035-990a-46ce-bd09-09725e96ce7e';
  $display->content['new-5b511035-990a-46ce-bd09-09725e96ce7e'] = $pane;
  $display->panels['left'][1] = 'new-5b511035-990a-46ce-bd09-09725e96ce7e';
  $pane = new stdClass();
  $pane->pid = 'new-b7c83937-5810-4847-8bcf-ef23aeacb291';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'b7c83937-5810-4847-8bcf-ef23aeacb291';
  $display->content['new-b7c83937-5810-4847-8bcf-ef23aeacb291'] = $pane;
  $display->panels['left'][2] = 'new-b7c83937-5810-4847-8bcf-ef23aeacb291';
  $pane = new stdClass();
  $pane->pid = 'new-d1e0f8b4-21da-4697-b01c-7c163daed461';
  $pane->panel = 'left';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Failover CTA Buttons',
    'title' => '',
    'body' => '<ul>
<li class="button"><a href="https://ticketing.calacademy.org/webstore/shop/viewitems.aspx?&cg=generaladmission&c=generaladmission">Buy Tickets</a></li>
<li class="button"><a href="https://ticketing.calacademy.org/webstore/shop/ViewItems.aspx?CG=NIGHTLIFE&C=NIGHTLIFE">Buy NightLife Tickets</a></li>
<li><a href="https://ticketing.calacademy.org/webstore/shop/ViewItems.aspx?CG=CASCTGP&C=MEMBERS">Become a Member</a></li>
</ul>
',
    'format' => 'full_html_developer_mode',
    'substitute' => 1,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'ctas',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'd1e0f8b4-21da-4697-b01c-7c163daed461';
  $display->content['new-d1e0f8b4-21da-4697-b01c-7c163daed461'] = $pane;
  $display->panels['left'][3] = 'new-d1e0f8b4-21da-4697-b01c-7c163daed461';
  $pane = new stdClass();
  $pane->pid = 'new-c763c051-ceac-4562-aa6b-69e259245270';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'section',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = 'c763c051-ceac-4562-aa6b-69e259245270';
  $display->content['new-c763c051-ceac-4562-aa6b-69e259245270'] = $pane;
  $display->panels['left'][4] = 'new-c763c051-ceac-4562-aa6b-69e259245270';
  $pane = new stdClass();
  $pane->pid = 'new-489bb50c-fb02-4de0-b06a-4ea244aeb6d5';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_google_map';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'link_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '489bb50c-fb02-4de0-b06a-4ea244aeb6d5';
  $display->content['new-489bb50c-fb02-4de0-b06a-4ea244aeb6d5'] = $pane;
  $display->panels['left'][5] = 'new-489bb50c-fb02-4de0-b06a-4ea244aeb6d5';
  $pane = new stdClass();
  $pane->pid = 'new-fe9318b8-286c-4b53-bc92-67660628bb4a';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'floated-fields',
  );
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = 'fe9318b8-286c-4b53-bc92-67660628bb4a';
  $display->content['new-fe9318b8-286c-4b53-bc92-67660628bb4a'] = $pane;
  $display->panels['left'][6] = 'new-fe9318b8-286c-4b53-bc92-67660628bb4a';
  $pane = new stdClass();
  $pane->pid = 'new-d0c37db0-2f52-4a01-877a-9b8a510ec82d';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_collection';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'link' => 0,
      'view_mode' => 'default',
      'links' => 0,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'd0c37db0-2f52-4a01-877a-9b8a510ec82d';
  $display->content['new-d0c37db0-2f52-4a01-877a-9b8a510ec82d'] = $pane;
  $display->panels['right'][0] = 'new-d0c37db0-2f52-4a01-877a-9b8a510ec82d';
  $pane = new stdClass();
  $pane->pid = 'new-61866132-1766-469e-a945-1a3a6be1bc4b';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_subtitle';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '61866132-1766-469e-a945-1a3a6be1bc4b';
  $display->content['new-61866132-1766-469e-a945-1a3a6be1bc4b'] = $pane;
  $display->panels['top'][0] = 'new-61866132-1766-469e-a945-1a3a6be1bc4b';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_24'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_26';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -22;
  $handler->conf = array(
    'title' => 'Blog Detail',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'logic' => 'and',
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'blog' => 'blog',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'df024790-35d5-417e-9883-3e6eb147a9ca';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-ab6f0acd-1f62-4ca2-ae4b-cd515b33a264';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'ab6f0acd-1f62-4ca2-ae4b-cd515b33a264';
  $display->content['new-ab6f0acd-1f62-4ca2-ae4b-cd515b33a264'] = $pane;
  $display->panels['left'][0] = 'new-ab6f0acd-1f62-4ca2-ae4b-cd515b33a264';
  $pane = new stdClass();
  $pane->pid = 'new-ca703862-b678-4cf5-8fa1-a243ba466f3a';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'ca703862-b678-4cf5-8fa1-a243ba466f3a';
  $display->content['new-ca703862-b678-4cf5-8fa1-a243ba466f3a'] = $pane;
  $display->panels['left'][1] = 'new-ca703862-b678-4cf5-8fa1-a243ba466f3a';
  $pane = new stdClass();
  $pane->pid = 'new-650abcac-8780-4211-b87c-41bed52d0219';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '650abcac-8780-4211-b87c-41bed52d0219';
  $display->content['new-650abcac-8780-4211-b87c-41bed52d0219'] = $pane;
  $display->panels['left'][2] = 'new-650abcac-8780-4211-b87c-41bed52d0219';
  $pane = new stdClass();
  $pane->pid = 'new-30f9eac9-3dd2-4df6-bf4a-10b8730bd68c';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '30f9eac9-3dd2-4df6-bf4a-10b8730bd68c';
  $display->content['new-30f9eac9-3dd2-4df6-bf4a-10b8730bd68c'] = $pane;
  $display->panels['left'][3] = 'new-30f9eac9-3dd2-4df6-bf4a-10b8730bd68c';
  $pane = new stdClass();
  $pane->pid = 'new-794d1941-4a7f-44ee-8476-9fb16f688729';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'floated-fields',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '794d1941-4a7f-44ee-8476-9fb16f688729';
  $display->content['new-794d1941-4a7f-44ee-8476-9fb16f688729'] = $pane;
  $display->panels['left'][4] = 'new-794d1941-4a7f-44ee-8476-9fb16f688729';
  $pane = new stdClass();
  $pane->pid = 'new-814cb013-6330-420d-af20-9b02aa94451c';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'blogs-panel_pane_blog_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '814cb013-6330-420d-af20-9b02aa94451c';
  $display->content['new-814cb013-6330-420d-af20-9b02aa94451c'] = $pane;
  $display->panels['left'][5] = 'new-814cb013-6330-420d-af20-9b02aa94451c';
  $pane = new stdClass();
  $pane->pid = 'new-db930167-d3ed-4eef-a10d-62f014569069';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-2';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:blog:field_hide_share_buttons',
        'settings' => array(
          'field_hide_share_buttons' => array(
            'und' => array(
              0 => array(
                'value' => 1,
              ),
            ),
          ),
          'field_hide_share_buttons_value' => '1',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => TRUE,
      ),
    ),
  );
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Share This',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'db930167-d3ed-4eef-a10d-62f014569069';
  $display->content['new-db930167-d3ed-4eef-a10d-62f014569069'] = $pane;
  $display->panels['right'][0] = 'new-db930167-d3ed-4eef-a10d-62f014569069';
  $pane = new stdClass();
  $pane->pid = 'new-a37d2cea-d3a5-409b-b5de-bceaaadfb311';
  $pane->panel = 'right';
  $pane->type = 'views_panes';
  $pane->subtype = 'taxonomy_terms-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'a37d2cea-d3a5-409b-b5de-bceaaadfb311';
  $display->content['new-a37d2cea-d3a5-409b-b5de-bceaaadfb311'] = $pane;
  $display->panels['right'][1] = 'new-a37d2cea-d3a5-409b-b5de-bceaaadfb311';
  $pane = new stdClass();
  $pane->pid = 'new-784ff3d3-b13d-4110-a958-216882e084eb';
  $pane->panel = 'top';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '784ff3d3-b13d-4110-a958-216882e084eb';
  $display->content['new-784ff3d3-b13d-4110-a958-216882e084eb'] = $pane;
  $display->panels['top'][0] = 'new-784ff3d3-b13d-4110-a958-216882e084eb';
  $pane = new stdClass();
  $pane->pid = 'new-bfcc9947-d1c4-49ca-a285-b692670def0c';
  $pane->panel = 'top';
  $pane->type = 'node_created';
  $pane->subtype = 'node_created';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'format' => 'calacademy_press_release',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'bfcc9947-d1c4-49ca-a285-b692670def0c';
  $display->content['new-bfcc9947-d1c4-49ca-a285-b692670def0c'] = $pane;
  $display->panels['top'][1] = 'new-bfcc9947-d1c4-49ca-a285-b692670def0c';
  $pane = new stdClass();
  $pane->pid = 'new-ab0cc2f8-4d20-4e59-8a4a-5c71072053c6';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_blog_name';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'taxonomy_term_reference_link',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'ab0cc2f8-4d20-4e59-8a4a-5c71072053c6';
  $display->content['new-ab0cc2f8-4d20-4e59-8a4a-5c71072053c6'] = $pane;
  $display->panels['top'][2] = 'new-ab0cc2f8-4d20-4e59-8a4a-5c71072053c6';
  $pane = new stdClass();
  $pane->pid = 'new-e136a404-9717-40b5-a1ff-cc6084cd3e92';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'content_authors-full_name';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'e136a404-9717-40b5-a1ff-cc6084cd3e92';
  $display->content['new-e136a404-9717-40b5-a1ff-cc6084cd3e92'] = $pane;
  $display->panels['top'][3] = 'new-e136a404-9717-40b5-a1ff-cc6084cd3e92';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_26'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_28';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -24;
  $handler->conf = array(
    'title' => 'IBSS Project Detail',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'ibss_project' => 'ibss_project',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left_above' => NULL,
      'right_above' => NULL,
      'middle' => NULL,
      'left_below' => NULL,
      'right_below' => NULL,
      'bottom' => NULL,
      'left' => NULL,
      'right' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = 'fb1ea7dd-03e0-4ca8-9b18-8cabf7ca8762';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-91244933-ba66-4821-bdc7-b60a76304075';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '91244933-ba66-4821-bdc7-b60a76304075';
  $display->content['new-91244933-ba66-4821-bdc7-b60a76304075'] = $pane;
  $display->panels['left'][0] = 'new-91244933-ba66-4821-bdc7-b60a76304075';
  $pane = new stdClass();
  $pane->pid = 'new-15efac06-a937-422e-8b10-0404b33538c9';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '15efac06-a937-422e-8b10-0404b33538c9';
  $display->content['new-15efac06-a937-422e-8b10-0404b33538c9'] = $pane;
  $display->panels['left'][1] = 'new-15efac06-a937-422e-8b10-0404b33538c9';
  $pane = new stdClass();
  $pane->pid = 'new-7611a849-53e4-4e8b-9bef-0339f14cc00a';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '7611a849-53e4-4e8b-9bef-0339f14cc00a';
  $display->content['new-7611a849-53e4-4e8b-9bef-0339f14cc00a'] = $pane;
  $display->panels['left'][2] = 'new-7611a849-53e4-4e8b-9bef-0339f14cc00a';
  $pane = new stdClass();
  $pane->pid = 'new-dbedb7c7-47be-46d6-a549-1ccd062a3f58';
  $pane->panel = 'left';
  $pane->type = 'node_body';
  $pane->subtype = 'node_body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'dbedb7c7-47be-46d6-a549-1ccd062a3f58';
  $display->content['new-dbedb7c7-47be-46d6-a549-1ccd062a3f58'] = $pane;
  $display->panels['left'][3] = 'new-dbedb7c7-47be-46d6-a549-1ccd062a3f58';
  $pane = new stdClass();
  $pane->pid = 'new-aeec8053-95e4-4f2f-b970-f484f3f780ae';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_google_map';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'link_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = 'aeec8053-95e4-4f2f-b970-f484f3f780ae';
  $display->content['new-aeec8053-95e4-4f2f-b970-f484f3f780ae'] = $pane;
  $display->panels['left'][4] = 'new-aeec8053-95e4-4f2f-b970-f484f3f780ae';
  $pane = new stdClass();
  $pane->pid = 'new-3c19eced-f300-4ec7-8ae2-5016a5d18837';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-floated',
  );
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '3c19eced-f300-4ec7-8ae2-5016a5d18837';
  $display->content['new-3c19eced-f300-4ec7-8ae2-5016a5d18837'] = $pane;
  $display->panels['left'][5] = 'new-3c19eced-f300-4ec7-8ae2-5016a5d18837';
  $pane = new stdClass();
  $pane->pid = 'new-dda671b8-1778-4bb5-84ca-97bf030e32ac';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'ibss_project-panel_pane_ibss_project_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = 'dda671b8-1778-4bb5-84ca-97bf030e32ac';
  $display->content['new-dda671b8-1778-4bb5-84ca-97bf030e32ac'] = $pane;
  $display->panels['left'][6] = 'new-dda671b8-1778-4bb5-84ca-97bf030e32ac';
  $pane = new stdClass();
  $pane->pid = 'new-235145f6-65f3-4108-9f8d-9328c85f7a9f';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 7;
  $pane->locks = array();
  $pane->uuid = '235145f6-65f3-4108-9f8d-9328c85f7a9f';
  $display->content['new-235145f6-65f3-4108-9f8d-9328c85f7a9f'] = $pane;
  $display->panels['left'][7] = 'new-235145f6-65f3-4108-9f8d-9328c85f7a9f';
  $pane = new stdClass();
  $pane->pid = 'new-cb22f24d-aaee-4b1c-bf9a-8554c8229cd0';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'related_content-random__field_related_content_tags';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link_to_view' => 0,
    'use_pager' => 0,
    'pager_id' => '0',
    'items_per_page' => '3',
    'offset' => '0',
    'fields_override' => array(
      'edit_node' => 1,
      'field_hero_region' => 1,
      'title' => 1,
      'body' => 1,
    ),
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-floated',
  );
  $pane->extras = array();
  $pane->position = 8;
  $pane->locks = array();
  $pane->uuid = 'cb22f24d-aaee-4b1c-bf9a-8554c8229cd0';
  $display->content['new-cb22f24d-aaee-4b1c-bf9a-8554c8229cd0'] = $pane;
  $display->panels['left'][8] = 'new-cb22f24d-aaee-4b1c-bf9a-8554c8229cd0';
  $pane = new stdClass();
  $pane->pid = 'new-432e5bf5-9a8d-458f-8fbc-142c3f105ca2';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'staff-panel_pane_2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-top-three-columns',
  );
  $pane->extras = array();
  $pane->position = 9;
  $pane->locks = array();
  $pane->uuid = '432e5bf5-9a8d-458f-8fbc-142c3f105ca2';
  $display->content['new-432e5bf5-9a8d-458f-8fbc-142c3f105ca2'] = $pane;
  $display->panels['left'][9] = 'new-432e5bf5-9a8d-458f-8fbc-142c3f105ca2';
  $pane = new stdClass();
  $pane->pid = 'new-18b78d27-3222-466a-8e32-3502ef358163';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_non_cas_contributors';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Other Contributors',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 10;
  $pane->locks = array();
  $pane->uuid = '18b78d27-3222-466a-8e32-3502ef358163';
  $display->content['new-18b78d27-3222-466a-8e32-3502ef358163'] = $pane;
  $display->panels['left'][10] = 'new-18b78d27-3222-466a-8e32-3502ef358163';
  $pane = new stdClass();
  $pane->pid = 'new-bc4470b9-c8fa-47a7-b066-2d8a85666348';
  $pane->panel = 'right';
  $pane->type = 'views_panes';
  $pane->subtype = 'file_listings-attached_files_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Downloadables',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => 'ibss-downloadables',
    'css_class' => '',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'bc4470b9-c8fa-47a7-b066-2d8a85666348';
  $display->content['new-bc4470b9-c8fa-47a7-b066-2d8a85666348'] = $pane;
  $display->panels['right'][0] = 'new-bc4470b9-c8fa-47a7-b066-2d8a85666348';
  $pane = new stdClass();
  $pane->pid = 'new-35d0f34d-3b8c-4978-abb8-2b537fae8b52';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_collection';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'default',
      'links' => 0,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '35d0f34d-3b8c-4978-abb8-2b537fae8b52';
  $display->content['new-35d0f34d-3b8c-4978-abb8-2b537fae8b52'] = $pane;
  $display->panels['right'][1] = 'new-35d0f34d-3b8c-4978-abb8-2b537fae8b52';
  $pane = new stdClass();
  $pane->pid = 'new-508f7776-747e-435e-b501-a6c6de130366';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_items';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'default',
      'links' => 1,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '  ',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '508f7776-747e-435e-b501-a6c6de130366';
  $display->content['new-508f7776-747e-435e-b501-a6c6de130366'] = $pane;
  $display->panels['right'][2] = 'new-508f7776-747e-435e-b501-a6c6de130366';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_28'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_29';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -1;
  $handler->conf = array(
    'title' => 'ES Article Detail',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'explore_science_article' => 'explore_science_article',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => array(
        'content' => array(
          'prefix' => '<header id="header">',
          'suffix' => '</header>',
        ),
        'theme' => 0,
      ),
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
    'top' => array(
      'style' => 'wrapper_raw',
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = '23810fd7-4d8a-4112-99a5-32c1a0f67ea4';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-f8d92cb0-0fa6-434c-af25-87f36f8fd0c6';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'f8d92cb0-0fa6-434c-af25-87f36f8fd0c6';
  $display->content['new-f8d92cb0-0fa6-434c-af25-87f36f8fd0c6'] = $pane;
  $display->panels['left'][0] = 'new-f8d92cb0-0fa6-434c-af25-87f36f8fd0c6';
  $pane = new stdClass();
  $pane->pid = 'new-86e967ca-8a4a-485e-8e4a-309316d44acf';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '86e967ca-8a4a-485e-8e4a-309316d44acf';
  $display->content['new-86e967ca-8a4a-485e-8e4a-309316d44acf'] = $pane;
  $display->panels['left'][1] = 'new-86e967ca-8a4a-485e-8e4a-309316d44acf';
  $pane = new stdClass();
  $pane->pid = 'new-b7c83937-5810-4847-8bcf-ef23aeacb291';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'b7c83937-5810-4847-8bcf-ef23aeacb291';
  $display->content['new-b7c83937-5810-4847-8bcf-ef23aeacb291'] = $pane;
  $display->panels['left'][2] = 'new-b7c83937-5810-4847-8bcf-ef23aeacb291';
  $pane = new stdClass();
  $pane->pid = 'new-c763c051-ceac-4562-aa6b-69e259245270';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'section',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'c763c051-ceac-4562-aa6b-69e259245270';
  $display->content['new-c763c051-ceac-4562-aa6b-69e259245270'] = $pane;
  $display->panels['left'][3] = 'new-c763c051-ceac-4562-aa6b-69e259245270';
  $pane = new stdClass();
  $pane->pid = 'new-489bb50c-fb02-4de0-b06a-4ea244aeb6d5';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_google_map';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'link_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '489bb50c-fb02-4de0-b06a-4ea244aeb6d5';
  $display->content['new-489bb50c-fb02-4de0-b06a-4ea244aeb6d5'] = $pane;
  $display->panels['left'][4] = 'new-489bb50c-fb02-4de0-b06a-4ea244aeb6d5';
  $pane = new stdClass();
  $pane->pid = 'new-fe9318b8-286c-4b53-bc92-67660628bb4a';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'floated-fields',
  );
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = 'fe9318b8-286c-4b53-bc92-67660628bb4a';
  $display->content['new-fe9318b8-286c-4b53-bc92-67660628bb4a'] = $pane;
  $display->panels['left'][5] = 'new-fe9318b8-286c-4b53-bc92-67660628bb4a';
  $pane = new stdClass();
  $pane->pid = 'new-ef4280ae-cda0-4a3a-afa5-25b127a733b3';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'related_content-random__field_related_content_tags';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link_to_view' => 0,
    'use_pager' => 0,
    'pager_id' => '0',
    'items_per_page' => '3',
    'offset' => '0',
    'fields_override' => array(
      'edit_node' => 1,
      'field_hero_region' => 1,
      'title' => 1,
      'body' => 1,
    ),
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
    'override_title' => 1,
    'override_title_text' => 'Related Science News',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-floated',
  );
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = 'ef4280ae-cda0-4a3a-afa5-25b127a733b3';
  $display->content['new-ef4280ae-cda0-4a3a-afa5-25b127a733b3'] = $pane;
  $display->panels['left'][6] = 'new-ef4280ae-cda0-4a3a-afa5-25b127a733b3';
  $pane = new stdClass();
  $pane->pid = 'new-59b62ae5-7513-4e96-b7ed-9a64673c0728';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'related_content-explore_science';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'more_link' => 0,
    'use_pager' => 0,
    'pager_id' => '0',
    'items_per_page' => '3',
    'offset' => '0',
    'fields_override' => array(
      'edit_node' => 1,
      'field_hero_region' => 1,
      'title' => 1,
      'body' => 1,
      'field_cta_link' => 1,
    ),
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
    'override_title' => 1,
    'override_title_text' => 'Related Explore Science',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-top-three-columns',
  );
  $pane->extras = array();
  $pane->position = 7;
  $pane->locks = array();
  $pane->uuid = '59b62ae5-7513-4e96-b7ed-9a64673c0728';
  $display->content['new-59b62ae5-7513-4e96-b7ed-9a64673c0728'] = $pane;
  $display->panels['left'][7] = 'new-59b62ae5-7513-4e96-b7ed-9a64673c0728';
  $pane = new stdClass();
  $pane->pid = 'new-2cfd1e73-a173-4507-a056-2c586a96914c';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-2';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_hide_share_buttons',
        'settings' => array(
          'field_hide_share_buttons' => array(
            'und' => array(
              0 => array(
                'value' => 1,
              ),
            ),
          ),
          'field_hide_share_buttons_value' => '1',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => TRUE,
      ),
    ),
  );
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => 'Share This',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '2cfd1e73-a173-4507-a056-2c586a96914c';
  $display->content['new-2cfd1e73-a173-4507-a056-2c586a96914c'] = $pane;
  $display->panels['right'][0] = 'new-2cfd1e73-a173-4507-a056-2c586a96914c';
  $pane = new stdClass();
  $pane->pid = 'new-d0c37db0-2f52-4a01-877a-9b8a510ec82d';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_collection';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'link' => 0,
      'view_mode' => 'default',
      'links' => 0,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'd0c37db0-2f52-4a01-877a-9b8a510ec82d';
  $display->content['new-d0c37db0-2f52-4a01-877a-9b8a510ec82d'] = $pane;
  $display->panels['right'][1] = 'new-d0c37db0-2f52-4a01-877a-9b8a510ec82d';
  $pane = new stdClass();
  $pane->pid = 'new-b3ec0832-8389-46b2-8957-9fd8ab5033f0';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_items';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'default',
      'links' => 1,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '  ',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'b3ec0832-8389-46b2-8957-9fd8ab5033f0';
  $display->content['new-b3ec0832-8389-46b2-8957-9fd8ab5033f0'] = $pane;
  $display->panels['right'][2] = 'new-b3ec0832-8389-46b2-8957-9fd8ab5033f0';
  $pane = new stdClass();
  $pane->pid = 'new-58b020a1-ea46-4448-a7f5-afade00f7ec0';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'category_listings-top_level_category_all';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '58b020a1-ea46-4448-a7f5-afade00f7ec0';
  $display->content['new-58b020a1-ea46-4448-a7f5-afade00f7ec0'] = $pane;
  $display->panels['top'][0] = 'new-58b020a1-ea46-4448-a7f5-afade00f7ec0';
  $pane = new stdClass();
  $pane->pid = 'new-aef06e3c-59dd-472f-b3da-af66d54f6be6';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'category_listings-top_level_category_parent';
  $pane->shown = FALSE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '768',
              ),
            ),
          ),
          'field_es_category_tid' => '768',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      1 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '769',
              ),
            ),
          ),
          'field_es_category_tid' => '769',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      2 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '770',
              ),
            ),
          ),
          'field_es_category_tid' => '770',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      3 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '772',
              ),
            ),
          ),
          'field_es_category_tid' => '772',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      4 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '773',
              ),
            ),
          ),
          'field_es_category_tid' => '773',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      5 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '777',
              ),
            ),
          ),
          'field_es_category_tid' => '777',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      6 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '778',
              ),
            ),
          ),
          'field_es_category_tid' => '778',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      7 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '780',
              ),
            ),
          ),
          'field_es_category_tid' => '780',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      8 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '781',
              ),
            ),
          ),
          'field_es_category_tid' => '781',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      9 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '782',
              ),
            ),
          ),
          'field_es_category_tid' => '782',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      10 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '783',
              ),
            ),
          ),
          'field_es_category_tid' => '783',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      11 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '784',
              ),
            ),
          ),
          'field_es_category_tid' => '784',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      12 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '785',
              ),
            ),
          ),
          'field_es_category_tid' => '785',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
    ),
    'logic' => 'or',
  );
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'aef06e3c-59dd-472f-b3da-af66d54f6be6';
  $display->content['new-aef06e3c-59dd-472f-b3da-af66d54f6be6'] = $pane;
  $display->panels['top'][1] = 'new-aef06e3c-59dd-472f-b3da-af66d54f6be6';
  $pane = new stdClass();
  $pane->pid = 'new-91a5a610-378e-4ecf-a156-ec842b0d9335';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'category_listings-top_level_category_grandparent';
  $pane->shown = FALSE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '774',
              ),
            ),
          ),
          'field_es_category_tid' => '774',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      1 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '775',
              ),
            ),
          ),
          'field_es_category_tid' => '775',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      2 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '776',
              ),
            ),
          ),
          'field_es_category_tid' => '776',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
    ),
    'logic' => 'or',
  );
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '91a5a610-378e-4ecf-a156-ec842b0d9335';
  $display->content['new-91a5a610-378e-4ecf-a156-ec842b0d9335'] = $pane;
  $display->panels['top'][2] = 'new-91a5a610-378e-4ecf-a156-ec842b0d9335';
  $pane = new stdClass();
  $pane->pid = 'new-6247e751-3b9f-4f3c-b681-1792bdae655b';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'category_listings-top_level_category';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '6247e751-3b9f-4f3c-b681-1792bdae655b';
  $display->content['new-6247e751-3b9f-4f3c-b681-1792bdae655b'] = $pane;
  $display->panels['top'][3] = 'new-6247e751-3b9f-4f3c-b681-1792bdae655b';
  $pane = new stdClass();
  $pane->pid = 'new-1fbff686-cdda-4c1e-b954-88a92b55a722';
  $pane->panel = 'top';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => 'page-title',
    'class' => 'title',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '1fbff686-cdda-4c1e-b954-88a92b55a722';
  $display->content['new-1fbff686-cdda-4c1e-b954-88a92b55a722'] = $pane;
  $display->panels['top'][4] = 'new-1fbff686-cdda-4c1e-b954-88a92b55a722';
  $pane = new stdClass();
  $pane->pid = 'new-c9219429-f86f-4414-b022-b4bcf14638c6';
  $pane->panel = 'top';
  $pane->type = 'node_created';
  $pane->subtype = 'node_created';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:explore_science_article:field_es_category',
        'settings' => array(
          'field_es_category' => array(
            'und' => array(
              0 => array(
                'tid' => '780',
              ),
              1 => array(
                'tid' => '781',
              ),
              2 => array(
                'tid' => '782',
              ),
              3 => array(
                'tid' => '783',
              ),
              4 => array(
                'tid' => '784',
              ),
              5 => array(
                'tid' => '785',
              ),
            ),
          ),
          'field_es_category_tid' => array(
            0 => '780',
            1 => '781',
            2 => '782',
            3 => '783',
            4 => '784',
            5 => '785',
          ),
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
    ),
    'logic' => 'or',
  );
  $pane->configuration = array(
    'format' => 'calacademy_press_release',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = 'c9219429-f86f-4414-b022-b4bcf14638c6';
  $display->content['new-c9219429-f86f-4414-b022-b4bcf14638c6'] = $pane;
  $display->panels['top'][5] = 'new-c9219429-f86f-4414-b022-b4bcf14638c6';
  $pane = new stdClass();
  $pane->pid = 'new-61866132-1766-469e-a945-1a3a6be1bc4b';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_subtitle';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = '61866132-1766-469e-a945-1a3a6be1bc4b';
  $display->content['new-61866132-1766-469e-a945-1a3a6be1bc4b'] = $pane;
  $display->panels['top'][6] = 'new-61866132-1766-469e-a945-1a3a6be1bc4b';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_29'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_3';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -13;
  $handler->conf = array(
    'title' => 'NightLife Detail',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'event_nightlife' => 'event_nightlife',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Nightlife:';
  $display->uuid = '9527c3dc-196d-47ef-a780-3662c8c14f3c';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-c8b2f953-94d7-4e9e-b14e-4b43234dfaae';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'c8b2f953-94d7-4e9e-b14e-4b43234dfaae';
  $display->content['new-c8b2f953-94d7-4e9e-b14e-4b43234dfaae'] = $pane;
  $display->panels['left'][0] = 'new-c8b2f953-94d7-4e9e-b14e-4b43234dfaae';
  $pane = new stdClass();
  $pane->pid = 'new-76bb021e-8a64-469d-b502-7d441e0f0a98';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '76bb021e-8a64-469d-b502-7d441e0f0a98';
  $display->content['new-76bb021e-8a64-469d-b502-7d441e0f0a98'] = $pane;
  $display->panels['left'][1] = 'new-76bb021e-8a64-469d-b502-7d441e0f0a98';
  $pane = new stdClass();
  $pane->pid = 'new-4f8fcc17-670f-4dc3-a550-9df6f3004d12';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '4f8fcc17-670f-4dc3-a550-9df6f3004d12';
  $display->content['new-4f8fcc17-670f-4dc3-a550-9df6f3004d12'] = $pane;
  $display->panels['left'][2] = 'new-4f8fcc17-670f-4dc3-a550-9df6f3004d12';
  $pane = new stdClass();
  $pane->pid = 'new-bd28f26c-6625-453f-951d-98a4555563ea';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_cta_buttons';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'bd28f26c-6625-453f-951d-98a4555563ea';
  $display->content['new-bd28f26c-6625-453f-951d-98a4555563ea'] = $pane;
  $display->panels['left'][3] = 'new-bd28f26c-6625-453f-951d-98a4555563ea';
  $pane = new stdClass();
  $pane->pid = 'new-9040837d-789b-4ef4-b3fa-0321a8733a0c';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'ticket_links-panel_pane_1';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '9040837d-789b-4ef4-b3fa-0321a8733a0c';
  $display->content['new-9040837d-789b-4ef4-b3fa-0321a8733a0c'] = $pane;
  $display->panels['left'][4] = 'new-9040837d-789b-4ef4-b3fa-0321a8733a0c';
  $pane = new stdClass();
  $pane->pid = 'new-8d43cb50-6efb-469a-98db-366fc7ddc5a8';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'section',
  );
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '8d43cb50-6efb-469a-98db-366fc7ddc5a8';
  $display->content['new-8d43cb50-6efb-469a-98db-366fc7ddc5a8'] = $pane;
  $display->panels['left'][5] = 'new-8d43cb50-6efb-469a-98db-366fc7ddc5a8';
  $pane = new stdClass();
  $pane->pid = 'new-2703745d-4114-4267-901c-6382e0f9206b';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'nightlife_schedule_items-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => 'music',
    'css_class' => 'section image-floated',
  );
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = '2703745d-4114-4267-901c-6382e0f9206b';
  $display->content['new-2703745d-4114-4267-901c-6382e0f9206b'] = $pane;
  $display->panels['left'][6] = 'new-2703745d-4114-4267-901c-6382e0f9206b';
  $pane = new stdClass();
  $pane->pid = 'new-20838ff5-6214-4b80-a735-efcc8f2ec51d';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Event Details',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => 'events',
    'css_class' => 'section image-top-three-columns',
  );
  $pane->extras = array();
  $pane->position = 7;
  $pane->locks = array();
  $pane->uuid = '20838ff5-6214-4b80-a735-efcc8f2ec51d';
  $display->content['new-20838ff5-6214-4b80-a735-efcc8f2ec51d'] = $pane;
  $display->panels['left'][7] = 'new-20838ff5-6214-4b80-a735-efcc8f2ec51d';
  $pane = new stdClass();
  $pane->pid = 'new-62266cbf-f875-4e7f-886c-9acec8aa7ae8';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'nightlife_planetarium_shows-nightlife_events_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'section image-top-three-columns',
  );
  $pane->extras = array();
  $pane->position = 8;
  $pane->locks = array();
  $pane->uuid = '62266cbf-f875-4e7f-886c-9acec8aa7ae8';
  $display->content['new-62266cbf-f875-4e7f-886c-9acec8aa7ae8'] = $pane;
  $display->panels['left'][8] = 'new-62266cbf-f875-4e7f-886c-9acec8aa7ae8';
  $pane = new stdClass();
  $pane->pid = 'new-351e44c7-9a11-49f7-bebf-01b03f757734';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-2';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:event_nightlife:field_hide_share_buttons',
        'settings' => array(
          'field_hide_share_buttons' => array(
            'und' => array(
              0 => array(
                'value' => 1,
              ),
            ),
          ),
          'field_hide_share_buttons_value' => '1',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => TRUE,
      ),
    ),
  );
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Share This',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '351e44c7-9a11-49f7-bebf-01b03f757734';
  $display->content['new-351e44c7-9a11-49f7-bebf-01b03f757734'] = $pane;
  $display->panels['right'][0] = 'new-351e44c7-9a11-49f7-bebf-01b03f757734';
  $pane = new stdClass();
  $pane->pid = 'new-c4457bdf-6b16-4980-9239-f86b576be1b7';
  $pane->panel = 'right';
  $pane->type = 'node';
  $pane->subtype = 'node';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'nid' => '1879',
    'links' => 0,
    'leave_node_title' => 0,
    'identifier' => '',
    'build_mode' => 'full',
    'link_node_title' => 0,
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'c4457bdf-6b16-4980-9239-f86b576be1b7';
  $display->content['new-c4457bdf-6b16-4980-9239-f86b576be1b7'] = $pane;
  $display->panels['right'][1] = 'new-c4457bdf-6b16-4980-9239-f86b576be1b7';
  $pane = new stdClass();
  $pane->pid = 'new-50495510-ecd5-4cd4-bbf8-949bee9ae800';
  $pane->panel = 'right';
  $pane->type = 'views_panes';
  $pane->subtype = 'nightlife_upcoming-panel_pane_2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '50495510-ecd5-4cd4-bbf8-949bee9ae800';
  $display->content['new-50495510-ecd5-4cd4-bbf8-949bee9ae800'] = $pane;
  $display->panels['right'][2] = 'new-50495510-ecd5-4cd4-bbf8-949bee9ae800';
  $pane = new stdClass();
  $pane->pid = 'new-c18c67f1-6d9e-4ffd-8de1-9570ca0a1d47';
  $pane->panel = 'top';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'NightLife:',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'c18c67f1-6d9e-4ffd-8de1-9570ca0a1d47';
  $display->content['new-c18c67f1-6d9e-4ffd-8de1-9570ca0a1d47'] = $pane;
  $display->panels['top'][0] = 'new-c18c67f1-6d9e-4ffd-8de1-9570ca0a1d47';
  $pane = new stdClass();
  $pane->pid = 'new-d9df7b0e-7790-4833-889b-ab46673064da';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_date';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'date_default',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'format_type' => 'short',
      'multiple_number' => '1',
      'multiple_from' => '',
      'multiple_to' => '',
      'fromto' => 'value',
      'show_repeat_rule' => 'hide',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'd9df7b0e-7790-4833-889b-ab46673064da';
  $display->content['new-d9df7b0e-7790-4833-889b-ab46673064da'] = $pane;
  $display->panels['top'][1] = 'new-d9df7b0e-7790-4833-889b-ab46673064da';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_3'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_5';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -11;
  $handler->conf = array(
    'title' => 'Press Release Detail',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(
      0 => array(
        'identifier' => 'User from Node (on Node: Press Contacts [field_users])',
        'keyword' => 'user',
        'name' => 'entity_from_field:field_users-node-user',
        'delta' => '0',
        'context' => 'argument_entity_id:node_1',
        'id' => 1,
      ),
    ),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'press_release' => 'press_release',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = 'f1be4d45-0609-43be-8187-5fd25ab4d47a';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-9a417379-3671-4561-93bf-b86b99cec301';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '9a417379-3671-4561-93bf-b86b99cec301';
  $display->content['new-9a417379-3671-4561-93bf-b86b99cec301'] = $pane;
  $display->panels['left'][0] = 'new-9a417379-3671-4561-93bf-b86b99cec301';
  $pane = new stdClass();
  $pane->pid = 'new-1cb7470e-7d4a-4d61-a656-2629c6bd8539';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '1cb7470e-7d4a-4d61-a656-2629c6bd8539';
  $display->content['new-1cb7470e-7d4a-4d61-a656-2629c6bd8539'] = $pane;
  $display->panels['left'][1] = 'new-1cb7470e-7d4a-4d61-a656-2629c6bd8539';
  $pane = new stdClass();
  $pane->pid = 'new-19ffaa9d-0552-44d4-9eb2-69910533dba5';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '19ffaa9d-0552-44d4-9eb2-69910533dba5';
  $display->content['new-19ffaa9d-0552-44d4-9eb2-69910533dba5'] = $pane;
  $display->panels['left'][2] = 'new-19ffaa9d-0552-44d4-9eb2-69910533dba5';
  $pane = new stdClass();
  $pane->pid = 'new-e9673f57-d116-4d09-a025-dc19c73e815c';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'section',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'e9673f57-d116-4d09-a025-dc19c73e815c';
  $display->content['new-e9673f57-d116-4d09-a025-dc19c73e815c'] = $pane;
  $display->panels['left'][3] = 'new-e9673f57-d116-4d09-a025-dc19c73e815c';
  $pane = new stdClass();
  $pane->pid = 'new-6cb10817-a9cb-4d89-af50-4a559860b83e';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_press_release_paragraph';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'subtitle_image_body',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'floated-fields',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '6cb10817-a9cb-4d89-af50-4a559860b83e';
  $display->content['new-6cb10817-a9cb-4d89-af50-4a559860b83e'] = $pane;
  $display->panels['left'][4] = 'new-6cb10817-a9cb-4d89-af50-4a559860b83e';
  $pane = new stdClass();
  $pane->pid = 'new-60b880fa-c542-4a87-8b9d-2f92bf3ba7d3';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-4';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Press Contacts',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '60b880fa-c542-4a87-8b9d-2f92bf3ba7d3';
  $display->content['new-60b880fa-c542-4a87-8b9d-2f92bf3ba7d3'] = $pane;
  $display->panels['right'][0] = 'new-60b880fa-c542-4a87-8b9d-2f92bf3ba7d3';
  $pane = new stdClass();
  $pane->pid = 'new-fcc62329-724b-440a-b132-a03a4ac7c677';
  $pane->panel = 'right';
  $pane->type = 'views_panes';
  $pane->subtype = 'staff-panel_pane_6';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'fcc62329-724b-440a-b132-a03a4ac7c677';
  $display->content['new-fcc62329-724b-440a-b132-a03a4ac7c677'] = $pane;
  $display->panels['right'][1] = 'new-fcc62329-724b-440a-b132-a03a4ac7c677';
  $pane = new stdClass();
  $pane->pid = 'new-a1de1cad-5071-494e-a390-51cf0439bbd9';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-6';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Digital Assets',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'a1de1cad-5071-494e-a390-51cf0439bbd9';
  $display->content['new-a1de1cad-5071-494e-a390-51cf0439bbd9'] = $pane;
  $display->panels['right'][2] = 'new-a1de1cad-5071-494e-a390-51cf0439bbd9';
  $pane = new stdClass();
  $pane->pid = 'new-33f984e3-299f-489f-999e-1ae4f6628061';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_subtitle';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '33f984e3-299f-489f-999e-1ae4f6628061';
  $display->content['new-33f984e3-299f-489f-999e-1ae4f6628061'] = $pane;
  $display->panels['top'][0] = 'new-33f984e3-299f-489f-999e-1ae4f6628061';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_5'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_6';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -12;
  $handler->conf = array(
    'title' => 'Press Center Landing',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'page-press-releases-landing',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '1',
            'paths' => 'press
press-center',
          ),
          'context' => 'empty',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Press Center';
  $display->uuid = '20a5ff13-93aa-4b2e-a3bd-24edc3edc231';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-d0a98705-9986-4478-90ae-56e2b1a9dcc1';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'd0a98705-9986-4478-90ae-56e2b1a9dcc1';
  $display->content['new-d0a98705-9986-4478-90ae-56e2b1a9dcc1'] = $pane;
  $display->panels['left'][0] = 'new-d0a98705-9986-4478-90ae-56e2b1a9dcc1';
  $pane = new stdClass();
  $pane->pid = 'new-b1334e4d-c3a1-4f2d-ad71-e60d4ad61de8';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'b1334e4d-c3a1-4f2d-ad71-e60d4ad61de8';
  $display->content['new-b1334e4d-c3a1-4f2d-ad71-e60d4ad61de8'] = $pane;
  $display->panels['left'][1] = 'new-b1334e4d-c3a1-4f2d-ad71-e60d4ad61de8';
  $pane = new stdClass();
  $pane->pid = 'new-c4ebf46e-0e13-4c4b-bad4-f7be0dc9fb03';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'c4ebf46e-0e13-4c4b-bad4-f7be0dc9fb03';
  $display->content['new-c4ebf46e-0e13-4c4b-bad4-f7be0dc9fb03'] = $pane;
  $display->panels['left'][2] = 'new-c4ebf46e-0e13-4c4b-bad4-f7be0dc9fb03';
  $pane = new stdClass();
  $pane->pid = 'new-70f67abb-90f5-4d3f-88c3-265c86000ceb';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'press_release_content-listing_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-floated exposed-filters',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '70f67abb-90f5-4d3f-88c3-265c86000ceb';
  $display->content['new-70f67abb-90f5-4d3f-88c3-265c86000ceb'] = $pane;
  $display->panels['left'][3] = 'new-70f67abb-90f5-4d3f-88c3-265c86000ceb';
  $pane = new stdClass();
  $pane->pid = 'new-5b671aeb-c163-4652-a932-2b95df654a95';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-4';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Press Contacts',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '5b671aeb-c163-4652-a932-2b95df654a95';
  $display->content['new-5b671aeb-c163-4652-a932-2b95df654a95'] = $pane;
  $display->panels['right'][0] = 'new-5b671aeb-c163-4652-a932-2b95df654a95';
  $pane = new stdClass();
  $pane->pid = 'new-d89a341a-ede0-4248-87af-bf4bdf631a54';
  $pane->panel = 'right';
  $pane->type = 'views_panes';
  $pane->subtype = 'staff-panel_pane_5';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'field_department_tid' => '2088',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'd89a341a-ede0-4248-87af-bf4bdf631a54';
  $display->content['new-d89a341a-ede0-4248-87af-bf4bdf631a54'] = $pane;
  $display->panels['right'][1] = 'new-d89a341a-ede0-4248-87af-bf4bdf631a54';
  $pane = new stdClass();
  $pane->pid = 'new-302584e0-aaab-4cf3-b70a-5d9074ed7cab';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-6';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Digital Assets',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '302584e0-aaab-4cf3-b70a-5d9074ed7cab';
  $display->content['new-302584e0-aaab-4cf3-b70a-5d9074ed7cab'] = $pane;
  $display->panels['right'][2] = 'new-302584e0-aaab-4cf3-b70a-5d9074ed7cab';
  $pane = new stdClass();
  $pane->pid = 'new-2f422b3b-fd31-4b80-a545-a90fa4a6de5c';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-13';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Experts Database',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '2f422b3b-fd31-4b80-a545-a90fa4a6de5c';
  $display->content['new-2f422b3b-fd31-4b80-a545-a90fa4a6de5c'] = $pane;
  $display->panels['right'][3] = 'new-2f422b3b-fd31-4b80-a545-a90fa4a6de5c';
  $pane = new stdClass();
  $pane->pid = 'new-15fcdb8d-8afd-49ac-9cde-511e02b0168f';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-7';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Location Shoots',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '15fcdb8d-8afd-49ac-9cde-511e02b0168f';
  $display->content['new-15fcdb8d-8afd-49ac-9cde-511e02b0168f'] = $pane;
  $display->panels['right'][4] = 'new-15fcdb8d-8afd-49ac-9cde-511e02b0168f';
  $pane = new stdClass();
  $pane->pid = 'new-62daf4ca-86e9-456a-b5ef-f12cbf64b343';
  $pane->panel = 'top';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => 'page-title',
    'class' => 'title',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '62daf4ca-86e9-456a-b5ef-f12cbf64b343';
  $display->content['new-62daf4ca-86e9-456a-b5ef-f12cbf64b343'] = $pane;
  $display->panels['top'][0] = 'new-62daf4ca-86e9-456a-b5ef-f12cbf64b343';
  $pane = new stdClass();
  $pane->pid = 'new-7127ff4b-3dc6-4c4b-98a1-88ca7adc1321';
  $pane->panel = 'top';
  $pane->type = 'node_content';
  $pane->subtype = 'node_content';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'links' => 0,
    'no_extras' => 1,
    'override_title' => 1,
    'override_title_text' => '',
    'identifier' => '',
    'link' => 0,
    'leave_node_title' => 0,
    'build_mode' => 'full',
    'context' => 'argument_entity_id:node_1',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '7127ff4b-3dc6-4c4b-98a1-88ca7adc1321';
  $display->content['new-7127ff4b-3dc6-4c4b-98a1-88ca7adc1321'] = $pane;
  $display->panels['top'][1] = 'new-7127ff4b-3dc6-4c4b-98a1-88ca7adc1321';
  $pane = new stdClass();
  $pane->pid = 'new-038fd534-903b-480c-a331-bc4e92595606';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'press_release_content-featured_listing_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-top-four-columns',
  );
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '038fd534-903b-480c-a331-bc4e92595606';
  $display->content['new-038fd534-903b-480c-a331-bc4e92595606'] = $pane;
  $display->panels['top'][2] = 'new-038fd534-903b-480c-a331-bc4e92595606';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_6'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_7';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -18;
  $handler->conf = array(
    'title' => 'Event Landing',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'bg-frog page-events',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '1',
            'paths' => 'events
events/*',
          ),
          'context' => 'empty',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'event' => 'event',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => TRUE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Events';
  $display->uuid = '78ea63a4-fc49-428a-af17-c422424ad265';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-f9de1a21-e286-4039-9225-0429984b05b0';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'events_promoted-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'skewed-tri-grid',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'f9de1a21-e286-4039-9225-0429984b05b0';
  $display->content['new-f9de1a21-e286-4039-9225-0429984b05b0'] = $pane;
  $display->panels['left'][0] = 'new-f9de1a21-e286-4039-9225-0429984b05b0';
  $pane = new stdClass();
  $pane->pid = 'new-9d75970e-0bac-4f71-99af-48d97ff93546';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'event_categories-event_categories_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'image-top-three-columns',
  );
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '9d75970e-0bac-4f71-99af-48d97ff93546';
  $display->content['new-9d75970e-0bac-4f71-99af-48d97ff93546'] = $pane;
  $display->panels['left'][1] = 'new-9d75970e-0bac-4f71-99af-48d97ff93546';
  $pane = new stdClass();
  $pane->pid = 'new-00b916dc-84b3-4dd6-b6ba-28ad42f6f3e6';
  $pane->panel = 'left';
  $pane->type = 'views';
  $pane->subtype = 'testimonials_related';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_pager_settings' => 0,
    'use_pager' => 0,
    'nodes_per_page' => '1',
    'pager_id' => '0',
    'offset' => '0',
    'more_link' => 0,
    'feed_icons' => 0,
    'panel_args' => 0,
    'link_to_view' => 0,
    'args' => '557',
    'url' => '',
    'display' => 'default',
    'override_title' => 1,
    'override_title_text' => '',
    'context' => array(
      0 => '',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '00b916dc-84b3-4dd6-b6ba-28ad42f6f3e6';
  $display->content['new-00b916dc-84b3-4dd6-b6ba-28ad42f6f3e6'] = $pane;
  $display->panels['left'][2] = 'new-00b916dc-84b3-4dd6-b6ba-28ad42f6f3e6';
  $pane = new stdClass();
  $pane->pid = 'new-b0db98e9-2125-4b5f-87ed-102eb0feeaec';
  $pane->panel = 'right';
  $pane->type = 'views_panes';
  $pane->subtype = 'event_list_of_parent_type-upcoming_events_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'empty',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'b0db98e9-2125-4b5f-87ed-102eb0feeaec';
  $display->content['new-b0db98e9-2125-4b5f-87ed-102eb0feeaec'] = $pane;
  $display->panels['right'][0] = 'new-b0db98e9-2125-4b5f-87ed-102eb0feeaec';
  $pane = new stdClass();
  $pane->pid = 'new-40528433-1d9d-4629-9564-2e8a6d45cec5';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-large_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '40528433-1d9d-4629-9564-2e8a6d45cec5';
  $display->content['new-40528433-1d9d-4629-9564-2e8a6d45cec5'] = $pane;
  $display->panels['top'][0] = 'new-40528433-1d9d-4629-9564-2e8a6d45cec5';
  $pane = new stdClass();
  $pane->pid = 'new-638bf197-526f-4a77-a5b1-4f50ee4de95c';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_large';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '638bf197-526f-4a77-a5b1-4f50ee4de95c';
  $display->content['new-638bf197-526f-4a77-a5b1-4f50ee4de95c'] = $pane;
  $display->panels['top'][1] = 'new-638bf197-526f-4a77-a5b1-4f50ee4de95c';
  $pane = new stdClass();
  $pane->pid = 'new-3473b058-aadd-4059-8960-e7747118e5ac';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '3473b058-aadd-4059-8960-e7747118e5ac';
  $display->content['new-3473b058-aadd-4059-8960-e7747118e5ac'] = $pane;
  $display->panels['top'][2] = 'new-3473b058-aadd-4059-8960-e7747118e5ac';
  $pane = new stdClass();
  $pane->pid = 'new-89fc32b6-ff0b-4ad1-8312-63e89ff0eb57';
  $pane->panel = 'top';
  $pane->type = 'node_content';
  $pane->subtype = 'node_content';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'links' => 0,
    'no_extras' => 1,
    'override_title' => 1,
    'override_title_text' => '',
    'identifier' => '',
    'link' => 0,
    'leave_node_title' => 0,
    'build_mode' => 'full',
    'context' => 'argument_entity_id:node_1',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '89fc32b6-ff0b-4ad1-8312-63e89ff0eb57';
  $display->content['new-89fc32b6-ff0b-4ad1-8312-63e89ff0eb57'] = $pane;
  $display->panels['top'][3] = 'new-89fc32b6-ff0b-4ad1-8312-63e89ff0eb57';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_7'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_8';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -2;
  $handler->conf = array(
    'title' => 'Base Page (Non-specific)',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        1 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'base_page' => 'base_page',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
        2 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '1',
            'paths' => 'blogs/*',
          ),
          'context' => 'empty',
          'not' => TRUE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = '4e9a9d95-f14e-4037-9688-a399b272fc81';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-7cd671bd-85a2-47af-a60a-57e740853e25';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-standard_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '7cd671bd-85a2-47af-a60a-57e740853e25';
  $display->content['new-7cd671bd-85a2-47af-a60a-57e740853e25'] = $pane;
  $display->panels['left'][0] = 'new-7cd671bd-85a2-47af-a60a-57e740853e25';
  $pane = new stdClass();
  $pane->pid = 'new-7e009db7-8a7c-48a4-8eed-3db1a60c9a65';
  $pane->panel = 'left';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_standard';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '7e009db7-8a7c-48a4-8eed-3db1a60c9a65';
  $display->content['new-7e009db7-8a7c-48a4-8eed-3db1a60c9a65'] = $pane;
  $display->panels['left'][1] = 'new-7e009db7-8a7c-48a4-8eed-3db1a60c9a65';
  $pane = new stdClass();
  $pane->pid = 'new-8f842571-bad2-4abd-9c2b-eec3b7a9b049';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '8f842571-bad2-4abd-9c2b-eec3b7a9b049';
  $display->content['new-8f842571-bad2-4abd-9c2b-eec3b7a9b049'] = $pane;
  $display->panels['left'][2] = 'new-8f842571-bad2-4abd-9c2b-eec3b7a9b049';
  $pane = new stdClass();
  $pane->pid = 'new-81d43e8c-b925-48e2-8991-1ed8acf7fc4e';
  $pane->panel = 'left';
  $pane->type = 'node_content';
  $pane->subtype = 'node_content';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'links' => 0,
    'no_extras' => 1,
    'override_title' => 1,
    'override_title_text' => '',
    'identifier' => '',
    'link' => 0,
    'leave_node_title' => 0,
    'build_mode' => 'full',
    'context' => 'argument_entity_id:node_1',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '81d43e8c-b925-48e2-8991-1ed8acf7fc4e';
  $display->content['new-81d43e8c-b925-48e2-8991-1ed8acf7fc4e'] = $pane;
  $display->panels['left'][3] = 'new-81d43e8c-b925-48e2-8991-1ed8acf7fc4e';
  $pane = new stdClass();
  $pane->pid = 'new-81bc2b63-d1e8-4b6f-b2d3-a7773ea2a3ae';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-2';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:base_page:field_hide_share_buttons',
        'settings' => array(
          'field_hide_share_buttons' => array(
            'und' => array(
              0 => array(
                'value' => 1,
              ),
            ),
          ),
          'field_hide_share_buttons_value' => '1',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => TRUE,
      ),
    ),
  );
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Share This',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '81bc2b63-d1e8-4b6f-b2d3-a7773ea2a3ae';
  $display->content['new-81bc2b63-d1e8-4b6f-b2d3-a7773ea2a3ae'] = $pane;
  $display->panels['right'][0] = 'new-81bc2b63-d1e8-4b6f-b2d3-a7773ea2a3ae';
  $pane = new stdClass();
  $pane->pid = 'new-e2526d99-fb7d-491b-9f7b-ddae62799e9d';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_collection';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'full',
      'links' => 1,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'e2526d99-fb7d-491b-9f7b-ddae62799e9d';
  $display->content['new-e2526d99-fb7d-491b-9f7b-ddae62799e9d'] = $pane;
  $display->panels['right'][1] = 'new-e2526d99-fb7d-491b-9f7b-ddae62799e9d';
  $pane = new stdClass();
  $pane->pid = 'new-4e25572c-5b4d-411d-8961-48ca2804d7fd';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_items';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'default',
      'links' => 1,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '  ',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '4e25572c-5b4d-411d-8961-48ca2804d7fd';
  $display->content['new-4e25572c-5b4d-411d-8961-48ca2804d7fd'] = $pane;
  $display->panels['right'][2] = 'new-4e25572c-5b4d-411d-8961-48ca2804d7fd';
  $pane = new stdClass();
  $pane->pid = 'new-76f4916b-ea17-4f07-8ce1-4c1c34714bb5';
  $pane->panel = 'top';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'none',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '76f4916b-ea17-4f07-8ce1-4c1c34714bb5';
  $display->content['new-76f4916b-ea17-4f07-8ce1-4c1c34714bb5'] = $pane;
  $display->panels['top'][0] = 'new-76f4916b-ea17-4f07-8ce1-4c1c34714bb5';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_8'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_9';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -7;
  $handler->conf = array(
    'title' => 'Landing Page',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'landing_page' => 'landing_page',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'twocolslim_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'c9907b97-f889-4366-aba4-dbd0a172cb2a';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-62dfbb64-4f1c-4f04-9aba-4b293b2d43af';
  $pane->panel = 'bottom';
  $pane->type = 'views_panes';
  $pane->subtype = 'midfeature_content-slideshow_midfeature';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'slideshow-midfeature-container',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '62dfbb64-4f1c-4f04-9aba-4b293b2d43af';
  $display->content['new-62dfbb64-4f1c-4f04-9aba-4b293b2d43af'] = $pane;
  $display->panels['bottom'][0] = 'new-62dfbb64-4f1c-4f04-9aba-4b293b2d43af';
  $pane = new stdClass();
  $pane->pid = 'new-28b51075-ebc7-4514-9776-13c4f77c505e';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_subtitle';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '28b51075-ebc7-4514-9776-13c4f77c505e';
  $display->content['new-28b51075-ebc7-4514-9776-13c4f77c505e'] = $pane;
  $display->panels['bottom'][1] = 'new-28b51075-ebc7-4514-9776-13c4f77c505e';
  $pane = new stdClass();
  $pane->pid = 'new-2150f9e3-bbd4-4bc9-a68e-c3e376166b79';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_summary';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '2150f9e3-bbd4-4bc9-a68e-c3e376166b79';
  $display->content['new-2150f9e3-bbd4-4bc9-a68e-c3e376166b79'] = $pane;
  $display->panels['bottom'][2] = 'new-2150f9e3-bbd4-4bc9-a68e-c3e376166b79';
  $pane = new stdClass();
  $pane->pid = 'new-8a80b324-2eb6-43b1-85ac-83367f7da1af';
  $pane->panel = 'bottom';
  $pane->type = 'views_panes';
  $pane->subtype = 'staff-panel_pane_4';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => 'people',
    'css_class' => 'image-top',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '8a80b324-2eb6-43b1-85ac-83367f7da1af';
  $display->content['new-8a80b324-2eb6-43b1-85ac-83367f7da1af'] = $pane;
  $display->panels['bottom'][3] = 'new-8a80b324-2eb6-43b1-85ac-83367f7da1af';
  $pane = new stdClass();
  $pane->pid = 'new-f5f74b9d-916c-415a-b028-ac7f03826257';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_q_a';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'faq',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = 'f5f74b9d-916c-415a-b028-ac7f03826257';
  $display->content['new-f5f74b9d-916c-415a-b028-ac7f03826257'] = $pane;
  $display->panels['bottom'][4] = 'new-f5f74b9d-916c-415a-b028-ac7f03826257';
  $pane = new stdClass();
  $pane->pid = 'new-9c4d9b16-7666-41b8-b20c-db0633295e58';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '9c4d9b16-7666-41b8-b20c-db0633295e58';
  $display->content['new-9c4d9b16-7666-41b8-b20c-db0633295e58'] = $pane;
  $display->panels['bottom'][5] = 'new-9c4d9b16-7666-41b8-b20c-db0633295e58';
  $pane = new stdClass();
  $pane->pid = 'new-8b875c4f-50a7-4c11-abe5-d9a53a5f2b50';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content_descriptio';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = '8b875c4f-50a7-4c11-abe5-d9a53a5f2b50';
  $display->content['new-8b875c4f-50a7-4c11-abe5-d9a53a5f2b50'] = $pane;
  $display->panels['bottom'][6] = 'new-8b875c4f-50a7-4c11-abe5-d9a53a5f2b50';
  $pane = new stdClass();
  $pane->pid = 'new-d50f4422-f809-4bac-9870-de8b56507fb6';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_link';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'link_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 7;
  $pane->locks = array();
  $pane->uuid = 'd50f4422-f809-4bac-9870-de8b56507fb6';
  $display->content['new-d50f4422-f809-4bac-9870-de8b56507fb6'] = $pane;
  $display->panels['bottom'][7] = 'new-d50f4422-f809-4bac-9870-de8b56507fb6';
  $pane = new stdClass();
  $pane->pid = 'new-e4a82bad-fe50-458b-8276-d959c0af2d4a';
  $pane->panel = 'bottom';
  $pane->type = 'views_panes';
  $pane->subtype = 'related_content-random__field_related_content_tags';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link_to_view' => 0,
    'use_pager' => 0,
    'pager_id' => '0',
    'items_per_page' => '8',
    'offset' => '0',
    'fields_override' => array(
      'edit_node' => 1,
      'field_hero_region' => 1,
      'title' => 1,
      'body' => 1,
    ),
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'skewed-four-col',
  );
  $pane->extras = array();
  $pane->position = 8;
  $pane->locks = array();
  $pane->uuid = 'e4a82bad-fe50-458b-8276-d959c0af2d4a';
  $display->content['new-e4a82bad-fe50-458b-8276-d959c0af2d4a'] = $pane;
  $display->panels['bottom'][8] = 'new-e4a82bad-fe50-458b-8276-d959c0af2d4a';
  $pane = new stdClass();
  $pane->pid = 'new-fe2292c4-d8b4-403f-8b36-9f0456664c51';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content_title_2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 9;
  $pane->locks = array();
  $pane->uuid = 'fe2292c4-d8b4-403f-8b36-9f0456664c51';
  $display->content['new-fe2292c4-d8b4-403f-8b36-9f0456664c51'] = $pane;
  $display->panels['bottom'][9] = 'new-fe2292c4-d8b4-403f-8b36-9f0456664c51';
  $pane = new stdClass();
  $pane->pid = 'new-b4e8f22e-e4e8-4f80-98b3-bac63f6a88d0';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content2_descripti';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 10;
  $pane->locks = array();
  $pane->uuid = 'b4e8f22e-e4e8-4f80-98b3-bac63f6a88d0';
  $display->content['new-b4e8f22e-e4e8-4f80-98b3-bac63f6a88d0'] = $pane;
  $display->panels['bottom'][10] = 'new-b4e8f22e-e4e8-4f80-98b3-bac63f6a88d0';
  $pane = new stdClass();
  $pane->pid = 'new-f8c55516-212a-444e-95cd-368e2e43e134';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_link_content_2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'link_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 11;
  $pane->locks = array();
  $pane->uuid = 'f8c55516-212a-444e-95cd-368e2e43e134';
  $display->content['new-f8c55516-212a-444e-95cd-368e2e43e134'] = $pane;
  $display->panels['bottom'][11] = 'new-f8c55516-212a-444e-95cd-368e2e43e134';
  $pane = new stdClass();
  $pane->pid = 'new-c58f698c-421f-40b7-8d90-c053b1dcd7b9';
  $pane->panel = 'bottom';
  $pane->type = 'views_panes';
  $pane->subtype = 'related_content-random__field_related_content_tags_2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link_to_view' => 0,
    'use_pager' => 0,
    'pager_id' => '0',
    'items_per_page' => '8',
    'offset' => '0',
    'fields_override' => array(
      'edit_node' => 1,
      'field_hero_region' => 1,
      'title' => 1,
      'body' => 1,
    ),
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'skewed-four-col',
  );
  $pane->extras = array();
  $pane->position = 12;
  $pane->locks = array();
  $pane->uuid = 'c58f698c-421f-40b7-8d90-c053b1dcd7b9';
  $display->content['new-c58f698c-421f-40b7-8d90-c053b1dcd7b9'] = $pane;
  $display->panels['bottom'][12] = 'new-c58f698c-421f-40b7-8d90-c053b1dcd7b9';
  $pane = new stdClass();
  $pane->pid = 'new-d1f10a94-f784-4f96-a6a9-5fd49658901d';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content_title_3';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_plain',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 13;
  $pane->locks = array();
  $pane->uuid = 'd1f10a94-f784-4f96-a6a9-5fd49658901d';
  $display->content['new-d1f10a94-f784-4f96-a6a9-5fd49658901d'] = $pane;
  $display->panels['bottom'][13] = 'new-d1f10a94-f784-4f96-a6a9-5fd49658901d';
  $pane = new stdClass();
  $pane->pid = 'new-651504d9-672b-4b3e-88d9-36d8967aff39';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_related_content3_descripti';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 14;
  $pane->locks = array();
  $pane->uuid = '651504d9-672b-4b3e-88d9-36d8967aff39';
  $display->content['new-651504d9-672b-4b3e-88d9-36d8967aff39'] = $pane;
  $display->panels['bottom'][14] = 'new-651504d9-672b-4b3e-88d9-36d8967aff39';
  $pane = new stdClass();
  $pane->pid = 'new-57cbb7df-a49b-4054-80dd-c96358492518';
  $pane->panel = 'bottom';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_link_content_3';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'link_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 15;
  $pane->locks = array();
  $pane->uuid = '57cbb7df-a49b-4054-80dd-c96358492518';
  $display->content['new-57cbb7df-a49b-4054-80dd-c96358492518'] = $pane;
  $display->panels['bottom'][15] = 'new-57cbb7df-a49b-4054-80dd-c96358492518';
  $pane = new stdClass();
  $pane->pid = 'new-4abdba77-cd31-43b6-9a19-fb3b8f3da491';
  $pane->panel = 'bottom';
  $pane->type = 'views_panes';
  $pane->subtype = 'related_content-random__field_related_content_tags_3';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'more_link' => 0,
    'use_pager' => 0,
    'pager_id' => '0',
    'items_per_page' => '8',
    'offset' => '0',
    'fields_override' => array(
      'edit_node' => 1,
      'field_hero_region' => 1,
      'title' => 1,
      'body' => 1,
    ),
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'skewed-four-col',
  );
  $pane->extras = array();
  $pane->position = 16;
  $pane->locks = array();
  $pane->uuid = '4abdba77-cd31-43b6-9a19-fb3b8f3da491';
  $display->content['new-4abdba77-cd31-43b6-9a19-fb3b8f3da491'] = $pane;
  $display->panels['bottom'][16] = 'new-4abdba77-cd31-43b6-9a19-fb3b8f3da491';
  $pane = new stdClass();
  $pane->pid = 'new-35d9b03b-28a8-4d18-84ff-36ed21742f06';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_blurb_description';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '35d9b03b-28a8-4d18-84ff-36ed21742f06';
  $display->content['new-35d9b03b-28a8-4d18-84ff-36ed21742f06'] = $pane;
  $display->panels['left'][0] = 'new-35d9b03b-28a8-4d18-84ff-36ed21742f06';
  $pane = new stdClass();
  $pane->pid = 'new-c70557b6-2f52-4191-8618-53fcfde98cfa';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'c70557b6-2f52-4191-8618-53fcfde98cfa';
  $display->content['new-c70557b6-2f52-4191-8618-53fcfde98cfa'] = $pane;
  $display->panels['left'][1] = 'new-c70557b6-2f52-4191-8618-53fcfde98cfa';
  $pane = new stdClass();
  $pane->pid = 'new-9bc8fc05-130b-45b2-852c-82f6c9ec1a1b';
  $pane->panel = 'left';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_article_section';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '9bc8fc05-130b-45b2-852c-82f6c9ec1a1b';
  $display->content['new-9bc8fc05-130b-45b2-852c-82f6c9ec1a1b'] = $pane;
  $display->panels['left'][2] = 'new-9bc8fc05-130b-45b2-852c-82f6c9ec1a1b';
  $pane = new stdClass();
  $pane->pid = 'new-9f3a06a8-482f-488b-a51d-7cf4f255a8fa';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'block-2';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'entity_field_value:node:landing_page:field_hide_share_buttons',
        'settings' => array(
          'field_hide_share_buttons' => array(
            'und' => array(
              0 => array(
                'value' => 1,
              ),
            ),
          ),
          'field_hide_share_buttons_value' => '1',
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => TRUE,
      ),
    ),
  );
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Share This',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '9f3a06a8-482f-488b-a51d-7cf4f255a8fa';
  $display->content['new-9f3a06a8-482f-488b-a51d-7cf4f255a8fa'] = $pane;
  $display->panels['right'][0] = 'new-9f3a06a8-482f-488b-a51d-7cf4f255a8fa';
  $pane = new stdClass();
  $pane->pid = 'new-c4d69559-c107-4639-b606-6166c1fb5cee';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_collection';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'full',
      'links' => 0,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'c4d69559-c107-4639-b606-6166c1fb5cee';
  $display->content['new-c4d69559-c107-4639-b606-6166c1fb5cee'] = $pane;
  $display->panels['right'][1] = 'new-c4d69559-c107-4639-b606-6166c1fb5cee';
  $pane = new stdClass();
  $pane->pid = 'new-3cce7a67-ceab-4ca3-8c22-48b081ebe95e';
  $pane->panel = 'right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_right_rail_items';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'entityreference_entity_view',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'default',
      'links' => 1,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '  ',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '3cce7a67-ceab-4ca3-8c22-48b081ebe95e';
  $display->content['new-3cce7a67-ceab-4ca3-8c22-48b081ebe95e'] = $pane;
  $display->panels['right'][2] = 'new-3cce7a67-ceab-4ca3-8c22-48b081ebe95e';
  $pane = new stdClass();
  $pane->pid = 'new-02319785-0e5d-401b-9043-758eb1ec7500';
  $pane->panel = 'top';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '02319785-0e5d-401b-9043-758eb1ec7500';
  $display->content['new-02319785-0e5d-401b-9043-758eb1ec7500'] = $pane;
  $display->panels['top'][0] = 'new-02319785-0e5d-401b-9043-758eb1ec7500';
  $pane = new stdClass();
  $pane->pid = 'new-3b9e3997-5d71-448d-a2cf-ae9fa201e0ca';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-large_hero_image_pane';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '3b9e3997-5d71-448d-a2cf-ae9fa201e0ca';
  $display->content['new-3b9e3997-5d71-448d-a2cf-ae9fa201e0ca'] = $pane;
  $display->panels['top'][1] = 'new-3b9e3997-5d71-448d-a2cf-ae9fa201e0ca';
  $pane = new stdClass();
  $pane->pid = 'new-968bc936-2b57-4e35-9ec3-90a4a0bc82dc';
  $pane->panel = 'top';
  $pane->type = 'views_panes';
  $pane->subtype = 'hero_media_revision-slideshow_large';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'vid' => '%node:vid',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '968bc936-2b57-4e35-9ec3-90a4a0bc82dc';
  $display->content['new-968bc936-2b57-4e35-9ec3-90a4a0bc82dc'] = $pane;
  $display->panels['top'][2] = 'new-968bc936-2b57-4e35-9ec3-90a4a0bc82dc';
  $pane = new stdClass();
  $pane->pid = 'new-5dc68a35-8e9f-46fe-9512-539eb45f59d9';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_hero_region';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'field_collection_fields',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'view_mode' => 'youtube_video_responsive',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '5dc68a35-8e9f-46fe-9512-539eb45f59d9';
  $display->content['new-5dc68a35-8e9f-46fe-9512-539eb45f59d9'] = $pane;
  $display->panels['top'][3] = 'new-5dc68a35-8e9f-46fe-9512-539eb45f59d9';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_9'] = $handler;

  return $export;
}
