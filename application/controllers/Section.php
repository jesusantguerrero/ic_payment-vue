<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Section extends MY_Controller {
  public function __construct() {
    parent::__construct();
    $this->load->model('section_model');
    $this->my_auth->authenticate();
  }

  public function add() {
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
      $res['sections'] = $this->section_model->get_sections($mode);
      $this->response_json($res);
  }

  public function get_ips($mode = false) {
    $data = $this->get_post_data('data');
    if ($data) {
      if (!$mode) {
        $res['ips'] = $this->section_model->get_all_of_section($data['id_section']);
      } else {
        $res['ips'] = $this->section_model->get_ip_list_of_section($data['sectionId']);
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

  public function update_ip(){
    $data = $this->get_post_data('data');
    if ($data) {
      if ($this->section_model->update_ip_state($data['code'], $data['state'])){
        $this->set_message('direccion ip actualizada');
      } else {
        $this->set_message('Error al actualizar ip', 'error');
      }
      $this->response_json();
    }
  }

}
