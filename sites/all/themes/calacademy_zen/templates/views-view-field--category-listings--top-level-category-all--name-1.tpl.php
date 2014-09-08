<?php
if ($view->field['name']->advanced_render($row) == "") {
  print $view->field['name_1']->advanced_render($row);
}
?>
