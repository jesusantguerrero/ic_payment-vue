<?php

class Section extends MY_Controller {
  public function __construct() {
    parent:__construct();
    $this->load->model('section_model');
  }

  public function get_sections($mode = false) {
    authenticate();
    $data = $this->get_post_data();
    if ($data) {
      $res['sections'] = $this->section_model->get_sections_dropdown();
    }
  }

  public function get_ips($mode = false){
    authenticate();
    $data = $this->get_post_data();
    if ($data) {
      if (!$mode) {
        $res['ips'] = $this->section_model->get_all_of_section($data['id_section']);
      } else {
        $res['ips'] = $this->section_model->get_ip_list_of_section($data['id_section']);
      }
      $this->response_json($data);
    }
  }
}
