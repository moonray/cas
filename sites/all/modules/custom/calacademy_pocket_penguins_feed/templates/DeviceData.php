<?php

	class DeviceData {
		protected $_incapableDevices = array('iPod', 'iPad');
		protected $_capableDevices = array('iPhone');

		public function __construct () {
		}

		public function getCapability ($code) {
			if (!isset($_REQUEST['capabilities'])
				|| empty($_REQUEST['capabilities'])) return false;

			parse_str($_REQUEST['capabilities'], $results);

			if (!isset($results[$code])
				|| empty($results[$code])) return false;

			return $results[$code];
		}

		public function getScreenWidth () {
			$res = $this->getCapability('R');
			if (!$res) return false;

			$arr = explode('x', $res);
			if (count($arr) != 2) return false;

			// return the highest val
			return intval(max($arr));
		}

		public function isSmsCapable () {
			$os = $this->getCapability('OS');

			// no os string available, assume incapable
			if (!$os) return false;

			// check if os string contains one of the incapable
			// device strings
			foreach ($this->_incapableDevices as $device) {
				if (stripos($os, $device) !== false) {
					return false;
				}
			}

			// check if os string contains one of the capable
			// device strings
			foreach ($this->_capableDevices as $device) {
				if (stripos($os, $device) !== false) {
					return true;
				}
			}

			// last resort, base off screen dimensions
			$w = $this->getScreenWidth();
			if (!$w) return false;

			// ...probably a tablet
			if ($w >= 1000) return false;

			// ...otherwise, assume capable
			return true;
		}
	}

?>
