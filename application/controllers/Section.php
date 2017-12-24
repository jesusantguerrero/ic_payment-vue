<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Section extends MY_Controller {
  public function __construct() {
    parent::__construct();
    $this->load->model('section_model');
  }

  public function add() {
    authenticate();
    $data = $this->get_post_data('data');
    if ($data) {
      switch ($this->section_model->add($data)) {
        case -1:
          $this->set_message("Este sector o codigo ha sido guardado anteriormente", 'info');
          break;
        case 0:
          $this->set_message("No se ha podido Guardar el sector", 'error');
          break;
        case 1:
          $section_id = $this->section_model->get_section_id($data['codigo_area']);
          if ($this->create_ips($section_id,$data)) {
            $this->set_message("Ips Creadas");
          }
      }
      $this->response_json();
    }
  }

  public function get_sections($mode = false) {
    authenticate();
      $res['sections'] = $this->section_model->get_sections($mode);
      $this->response_json($res);
  }

  public function get_ips($mode = false) {
    authenticate();
    $data = $this->get_post_data('data');
    if ($data) {
      if (!$mode) {
        $res['ips'] = $this->section_model->get_all_of_section($data['id_section']);
      } else {
        $res['ips'] = $this->section_model->get_ip_list_of_section($data['id_section']);
      }
      $this->response_json($res);
    }
  }

  private function create_ips($section_id, $data){
    for ($i=2; $i <= 250; $i++) {
      $row = array(
        'id_ip'        => null,
        'id_seccion'   => $section_id,
        'codigo_final' => $i
        );
        $this->section_model->add_ip($row);
    }
    return true;
  }

}
