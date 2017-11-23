<?php defined('BASEPATH') OR exit('No direct script access allowed');
class MY_Controller extends CI_Controller
{

  public function __construct(){
    parent::__construct();
  }

  protected function get_post_data($field = null){
		if ($field) {
			return json_decode($this->input->post($field), true);
		}else {
			return json_decode($this->input->post(), true);
		}
	}

	protected function do_upload($dir) {
		$config = [
			"upload_path" => "./assets/uploads/$dir/",
			"alowed_types" => "svg|png|jpeg",
			"max_size" => 200
		];

		$this->load->library('upload', $config);

		if ($this->upload->do_upload('userfile')) {
			return $this->upload->data();
		}
	}
}
