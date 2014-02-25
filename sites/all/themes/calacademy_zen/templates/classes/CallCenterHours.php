<?php

class CallCenterHours {
	// set this to true to override the hours check and suppress chat,
	// e.g. if the server is down during open hours
	private $_manualOverrideIsClosed = false;
	
	private $_now; 
	private $_timeOpen = '08:00';
	private $_timeClose = '17:00';
	private $_timezone = 'America/Los_Angeles';
	
	public function __construct ($timeString = '') {
		$this->_now = (isset($timeString) && !empty($timeString)) ? strtotime($timeString) : $this->getNow();
	}
	
	public function getNow () {
		if (date_default_timezone_get() == $this->_timezone) return time();
		
		$timestamp = time();
		
		$dt = DateTime::createFromFormat('U', $timestamp);
		$dt->setTimeZone(new DateTimeZone($this->_timezone));
		$adjusted_timestamp = $dt->format('U') + $dt->getOffset();
		
		return $adjusted_timestamp;
	}
	
	public function isOpen () {		
		if ($this->_manualOverrideIsClosed) return false;
		
		$monthDay = date('n/d', $this->_now);
		$year = date('Y', $this->_now);

		$open = $this->_timeOpen . ' ' . $monthDay . '/' . $year;
		$close = $this->_timeClose . ' ' . $monthDay . '/' . $year;

		$isHoliday = false;

		// xmas
		if ($monthDay == '12/25') $isHoliday = true;

		// thanksgiving
		$thanksgiving = strtotime('thursday, november ' . $year . ' + 3 weeks');	
		if ($monthDay == date('n/d', $thanksgiving)) $isHoliday = true;

		return ($this->_now > strtotime($open) && $this->_now < strtotime($close) && !$isHoliday);
	}
}

?>
