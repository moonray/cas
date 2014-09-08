<!-- views-view--menu-garnish--block.tpl.php //-->
<div class="menu-garnish-container">
	<div class="menu-garnish-subcontainer">
		<?php
			
			// default to system time
			$time = time();

			// timewarp for testing
			if (isset($_GET['timewarp'])) {
				$warp = strtotime(trim($_GET['timewarp']));
				
				if ($warp !== false) {
					$time = $warp;
				}
			}

		?>
		<div class="menu-garnish-current-date">
			<?php
				echo '<div>' . date('l,\<\b\r \/\>F', $time) . '</div>';
				echo '<div class="day">' . date('d', $time) . '</div>';
			?>
		</div>
		<div class="menu-garnish-hours">
		<?php
			
			// today's date
			$now = date('Y-m-d', $time);
			$arr = views_get_view_result('event_list', 'menu_garnish_hours', $now);

			if (empty($arr)) {
				echo '<h3>Check the <a href="/daily-calendar">calendar</a></h3>for today&rsquo;s hours';
			} else {
				echo '<h3>Today We&rsquo;re Open</h3>';
				echo $arr[0]->field_field_date[0]['rendered']['#markup'];
				
				if (isset($arr[1])) {
					echo ' - ';
					echo $arr[1]->field_field_date[0]['rendered']['#markup'];
				}
			}

		?>
		</div>
		<?php if ($rows): ?>
		<div class="view-content">
		  <?php print $rows; ?>
		</div>
		<?php elseif ($empty): ?>
		<div class="view-empty">
		  <?php print $empty; ?>
		</div>
		<?php endif; ?>
	</div>
</div>
