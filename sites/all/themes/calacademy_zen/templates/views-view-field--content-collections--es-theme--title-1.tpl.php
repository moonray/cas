<?php
// If this is the first article then it is "Featured" - alter the label accordingly.
if (($view->row_index) == 0) {
  print "Featured";
} else {
  print $view->field['title_1']->advanced_render($row);
}
?>
