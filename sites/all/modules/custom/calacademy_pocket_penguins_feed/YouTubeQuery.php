<?php

	class YouTubeQuery {
		protected $_endpoint = 'http://youtube.com/get_video_info';
		protected $_hlsKey = 'hlsvp';
		protected $_timeoutSecs = 6;

		public function __construct () {}

		public function getHLS ($id) {
			$ctx = stream_context_create(
				array( 
				    'http' => array( 
			        	'timeout' => $this->_timeoutSecs 
			        ) 
			    ) 
			); 

			$content = file_get_contents($this->_endpoint . '?video_id=' . $id, false, $ctx);
			if ($content === false) return false;

			parse_str($content, $arr);

			if (!is_array($arr)) return false;
			if (!is_string($arr[$this->_hlsKey])) return false;
			if (empty($arr[$this->_hlsKey])) return false;

			return $arr[$this->_hlsKey];
		}
	}

?>
