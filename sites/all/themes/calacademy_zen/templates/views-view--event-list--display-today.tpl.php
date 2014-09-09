<?php print '<h3><a href="/daily-calendar/">' . date('l F j') . '</a></h3>'; ?>

<?php if ($rows): ?>
<div class="view-content">
  <?php print $rows; ?>
</div>
<?php elseif ($empty): ?>
<div class="view-empty">
  <?php print $empty; ?>
</div>
<?php endif; ?>
