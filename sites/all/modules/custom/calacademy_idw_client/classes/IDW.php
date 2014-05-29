<?php

class IDW {
	private $_serviceBaseUrl = 'http://japp1.prod.calacademy.org:8080/api/academy';
	private $_timeoutSeconds = 20;
	
	public function __construct () {
	}

	public function registerContact ($contact = array()) {	
		// not implemented yet
	}

	public function registerNewsletterInterests ($contact = array()) {
		if (!empty($contact['interests'])) {
			$contact['interests'] = implode(',', $contact['interests']);
		}

		$arr = $this->_getCleanData($contact, array(
			'firstname',
			'lastname',
			'email',
			'phone',
			'zip',
			'source',
			'interests'
		));

		return $this->_getResponse('registerNewsletterInterests', $arr);	
	}

	public function isSuccess ($response) {
		if (!isset($response->result)) return false;
		return ($response->result == 'success');
	}

	private function _getCleanData ($source, $fields) {
		$arr = array();

		foreach ($source as $key => $val) {
			if (in_array($key, $fields)) {
				$arr[$key] = $val;
			}
		}

		return $arr;
	}
	
	private function _getResponse ($path, $getData = array()) {
		$getData['callback'] = '_callback';
		$url = $this->_serviceBaseUrl . '/' . $path;
		$url .= '?' . http_build_query($getData);

		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_TIMEOUT, $this->_timeoutSeconds);

		$output = curl_exec($curl);
		curl_close($curl);

		if ($output === false) {
			error_log('cURL request failed');
			return false;
		} else {
			$output = trim($output);
		}

		// JSONP -> JSON
		$output = preg_replace('/.+?({.+}).+/', '$1', $output);
		$data = json_decode($output);
		
		if ($data === NULL) {
			error_log('JSON decode failed');
			return false;
		} else {
			return $data;
		}
	}
}

?>
