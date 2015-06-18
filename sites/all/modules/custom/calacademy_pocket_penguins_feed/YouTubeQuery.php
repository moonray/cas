<?php

	class YouTubeQuery {
		protected $_endpoint = 'http://youtube.com/get_video_info';
		protected $_hlsKey = 'hlsvp';
		protected $_timeoutSeconds = 6;

		public function __construct () {}

		private function _getCtx () {
			return stream_context_create(
				array(
					'http' => array(
						'timeout' => $this->_timeoutSeconds
					)
				)
			);
		}

		private function _isHLSValid ($hlsPath) {
			$hls = file_get_contents($hlsPath, false, $this->_getCtx());
			if ($hls === false) return false;

			// @todo
			// validate stream
			// var_dump($hls);

			return true;
		}

		public function getHLS ($id) {
			// parse data
			$content = file_get_contents($this->_endpoint . '?video_id=' . $id, false, $this->_getCtx());
			if ($content === false) return false;

			parse_str($content, $arr);

			if (!is_array($arr)) return false;
			if (!is_string($arr[$this->_hlsKey])) return false;
			if (empty($arr[$this->_hlsKey])) return false;

			// check if HLS is valid
			$hlsPath = $arr[$this->_hlsKey];
			if (!$this->_isHLSValid($hlsPath)) return false;

			return $hlsPath;
		}
	}

?>
