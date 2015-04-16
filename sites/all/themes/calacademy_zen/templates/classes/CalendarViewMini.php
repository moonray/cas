<?php 
	
	require_once('CalendarView.php');

	class CalendarViewMini extends CalendarView {
		protected $_hoursTitleStrings = array(
			'Museum Opens',
			'Museum Closes'
		);

		public function __construct ($eventData) {
			parent::__construct($eventData);
			$this->_displayFormat = 'g:i a';
		}

		protected function _isHoursEvent ($title) {
			foreach ($this->_hoursTitleStrings as $str) {
				if (stripos($title, $str) !== false) return true;
			}

			return false;
		}

		protected function _getEndTimeForToday () {
			foreach ($this->_data as $event) {
				if (strtolower($event->title) == 'museum closes') {
					return date($this->_displayFormat, strtotime($event->datetime_start));
				}	
			}

			// unknown
			return '5:00 pm';
		}

		public function getMarkup () {
			if (empty($this->_data)) return '<div>No Events Found</div>';

			$html = '<ul>';

			if (empty($this->_data)) {
				$html .= <<<end
					<li>
						<h4>Regular Hours</h4>
						<p>9:00 am - 5:00 pm</p>
					</li>
end;
			} else {
				foreach ($this->_data as $event) {
					if (!$this->_isHoursEvent($event->title)) continue;

					$title = false;
					$hours = date($this->_displayFormat, strtotime($event->datetime_start));

					switch (strtolower($event->title)) {
						case 'museum opens':
							$title = 'Regular Hours';
							$hours .= ' - ' . $this->_getEndTimeForToday();
							break;
						case 'museum opens for nightlife':
							$title = 'Thursday NightLife (21+)';
							$hours .= ' - ' . date($this->_displayFormat, strtotime($event->datetime_end)); 
							break;
					}

					if (!$title) continue;

					$html .= <<<end
						<li>
							<h4>$title</h4>
							<p>$hours</p>
						</li>
end;
				}	
			}
			

			$html .= '</ul>';

			return $html;
		}
	}

?>