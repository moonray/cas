<?php

	class CalendarView {
		protected $_data;
		protected $_locations;
		protected $_categories;
		protected $_timeslots;
		protected $_displayFormat = 'g:ia';

		protected $_noImageCategories = array(
			'peak-day',
			'free-day',
			'museum-hours',
			'alert',
			'museum-closure'
		);

		public function __construct ($eventData) {
			$this->_data = $eventData;

			$this->_locations = $this->_getTaxonomyLookup('location');
			$this->_categories = $this->_getTaxonomyLookup('category');
		}

		public function isAllDay ($event) {
			$timestamp = strtotime($event->datetime_start);
			$time = date('H:i:s', $timestamp);
			$threshold = strtotime('03:00');

			return (strtotime($time) < $threshold);
		}

		protected function _getTaxonomyLookup ($machine_name) {
			$arr = array();
			$vocab = taxonomy_vocabulary_machine_name_load($machine_name);

			if ($vocab !== false) {
				// $data = taxonomy_get_tree($vocab->vid, 0, NULL, true);
				$data = taxonomy_get_tree($vocab->vid);

				foreach ($data as $term) {
					$arr[$term->tid] = $term->name;
				}
			}

			return $arr;
		}

		public function getTimeslotsForEvent ($event) {
			if ($this->isAllDay($event)) return 'All Day';

			$arr = array(date($this->_displayFormat, strtotime($event->datetime_start)));

			if (isset($event->field_time_slots['und'])) {
				// loop through slots
				foreach ($event->field_time_slots['und'] as $slot) {
					$slotStamp = strtotime($slot['safe_value']);
					$arr[] = date($this->_displayFormat, $slotStamp);
				}
			}

			return implode(array_unique($arr), ', ');
		}

		protected function _setTimeslots () {
			$this->_timeslots = array();

			foreach ($this->_data as $event) {
				if ($this->isAllDay($event)) {
					$this->_timeslots['All Day']['events'][] = $event;
					$this->_timeslots['All Day']['timestamp'] = 0;
					continue;
				}

				$timestamp = strtotime($event->datetime_start);

				if (isset($event->field_time_slots['und'])) {
					// loop through slots
					foreach ($event->field_time_slots['und'] as $slot) {
						$slotStamp = strtotime($slot['safe_value']);
						$time = date($this->_displayFormat, $slotStamp);
						$this->_timeslots[$time]['events'][] = $event;
						$this->_timeslots[$time]['timestamp'] = intval(strtotime($time));
					}
				} else {
					// use the start time
					$time = date($this->_displayFormat, $timestamp);
					$this->_timeslots[$time]['events'][] = $event;
					$this->_timeslots[$time]['timestamp'] = intval(strtotime($time));
				}
			}

			function cmp ($a, $b) {
				return $a['timestamp'] - $b['timestamp'];
			}

			uasort($this->_timeslots, 'cmp');
		}

		public function getLocation ($event) {
			if (!isset($event->field_location['und'])) return false;
			if (count($event->field_location['und']) !== 1) return false;

			$tid = $event->field_location['und'][0]['tid'];
			return isset($this->_locations[$tid]) ? $this->_locations[$tid] : false;
		}

		public function getCategoryClasses ($event, $asArray = false) {
			if (!isset($event->field_category['und'])) {
				return $asArray ? array() : '';
			}

			$classes = array();

			foreach ($event->field_category['und'] as $category) {
				$cat = strtolower($this->_categories[$category['tid']]);
				$cat = str_replace(' ', '-', $cat);
				$classes[] = preg_replace('/[^A-Za-z0-9\-]/', '', $cat);
			}

			if ($asArray) return $classes;
			return implode(' ', $classes);
		}

		/*
		public function getPrimaryImage ($event) {
			if (!isset($event->field_image_primary['und'])) return false;
			if (count($event->field_image_primary['und']) !== 1) return false;

			// debug($event->field_image_primary);
			$img = $event->field_image_primary['und'][0];
			$src = image_style_url('square_-_460', $img['uri']);

			return "<a href=\"{$event->url}\"><img src='$src' alt='{$img['alt']}' /></a>";
		}
		*/

		public function getPrimaryImage ($event) {
			if (!isset($event->hero_img_src)) return false;

			$class = $event->is_video ? 'class="video"' : '';

			return "<a $class href=\"{$event->url}\"><img src='{$event->hero_img_src}' /></a>";
		}

		protected function _hasImage ($event) {
			$classes = $this->getCategoryClasses($event, true);
			$arr = array_intersect($classes, $this->_noImageCategories);

			return (count($arr) == 0);
		}

		public function getMarkup () {
			if (empty($this->_data)) return '<div class="empty-result">No Events Found</div>';
			$itemsPerRow = 3;

			$this->_setTimeslots();
			$html = '<table><tbody>';

			foreach ($this->_timeslots as $key => $val) {
				// divide non-image and image events onto seperate rows
				$rows = array(
					'withoutImage' => array(),
					'withImage' => array()
				);

				foreach ($val['events'] as $event) {
					if ($this->_hasImage($event)) {
						$rows['withImage'][] = $event;
					} else {
						$rows['withoutImage'][] = $event;
					}
				}

				foreach ($rows as $row) {
					if (empty($row)) continue;

					$html .= '<tr>';
					$html .= "<th><span>$key</span></th>";
					$html .= '<td>';

					$html .= '<div class="events-container">';

					$lastEventUrl = "";

					foreach ($row as $event) {

						if ($event->url == $lastEventUrl) {
							continue;
						}

						$image = $this->getPrimaryImage($event);
						$imageStr = !$image ? '' : $image;

						$loc = $this->getLocation($event);
						$locString = !$loc ? '' : '<div class="location">' . $loc . '</div>';

						$classes = $this->getCategoryClasses($event);

						if (empty($imageStr)) $classes .= ' no-image';
						if (count($row) == 1) $classes .= ' solo';

						// title links by default
						$title = "<a href=\"{$event->url}\">{$event->title}</a>";

						if (!$this->_hasImage($event)) {
							// boring categories aren't linked and get a special class
							$classes .= ' boring';
							$title = $event->title;
						}

						$summary = '';

						if (!empty($event->body['und'][0]['safe_summary'])) {
							$summary = "<a class='summary' href='{$event->url}'>{$event->body['und'][0]['safe_summary']}</a>";
						}

						$html .= "<div class='$classes'>";
						$html .= <<<end

							<div class="info-box">
								$summary
								$imageStr
							</div>

							<div class="event-title">{$title}</div>

							$locString
end;

						$html .= '</div>';

						$lastEventUrl = $event->url;

					}

					$html .= '</div>';

					$html .= '</td>';
					$html .= '</tr>';
				}
			}

			return $html . '</tbody></table>';
		}
	}

?>
