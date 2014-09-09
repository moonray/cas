<?php

class LeadService {
	private $_config = array();
	private $_timeoutSeconds = 20;
	private $_marketoAccessToken = false;

	public function __construct ($config) {
		$this->_config = $config;
	}

	public function registerContact ($contact = array()) {
		// not implemented yet
	}

	public function registerNewsletterInterests ($contact = array()) {
		$arr = $this->_getCleanData($contact, array(
			'firstName',
			'lastName',
			'email',
			'phone',
			'postalCode',
			'leadSource'
		));

		// add interest fields
		if (is_array($contact['interests'])) {
			foreach ($contact['interests'] as $interest) {
				$arr[$interest] = 'yes';
			}
		}

		// another default value
		$arr['unsubscribed'] = 'false';

		return $this->_getRestResponse('leads.json', array(
			'input' => array($arr)
		));
	}

	public function isSuccess ($response) {
		if (!isset($response->success)) return false;
		return $response->success;
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

	private function _setAccessToken () {
		$getVars = $this->_config;
		$getVars['grant_type'] = 'client_credentials';

		$response = $this->_getResponse('identity/oauth/token', false, $getVars);

		if (!is_object($response)) return false;
		if (!isset($response->access_token)) return false;

		$this->_marketoAccessToken = $response->access_token;
	}

	private function _getRestResponse ($path, $postData = array()) {
		if (!is_string($this->_marketoAccessToken)) {
			$this->_setAccessToken();
		}

		return $this->_getResponse('rest/v1/' . $path, $postData, array(
			'access_token' => $this->_marketoAccessToken
		));
	}

	private function _getResponse ($path, $postData = false, $getData = false) {
		if (!isset($this->_config['endpoint']) || empty($this->_config['endpoint'])) return false;

		$url = $this->_config['endpoint'] . '/' . $path;
		if (is_array($getData)) $url .= '?' . http_build_query($getData);

		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_TIMEOUT, $this->_timeoutSeconds);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $this->_timeoutSeconds);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

		$postDataString = '';

		if (is_array($postData)) {
			$postDataString = json_encode($postData);

			curl_setopt($curl, CURLOPT_POST, true);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $postDataString);
			curl_setopt($curl, CURLOPT_HTTPHEADER, array(
			    'Content-Type: application/json',
			    'Content-Length: ' . strlen($postDataString)
			));
		}

		$output = curl_exec($curl);
		curl_close($curl);

		if ($output === false) {
			error_log('cURL request failed');
			return false;
		} else {
			$output = trim($output);
		}

		$data = json_decode($output);

		if ($data === NULL) {
			error_log('JSON decode failed');
			return false;
		} else {
            $data->debug = array(
                'request' => $postDataString,
                'response' => $output
            );

			return $data;
		}
	}
}

?>
