<?php defined('BASEPATH') OR exit('No direct script access allowed');
class MY_controller extends CI_controller
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

}
