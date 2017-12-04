<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Company extends MY_Controller
{
  public function __construct() {
    parent::__construct();
    $this->load->model('company_model');
  }

  public function update(){
    authenticate();
    $data = $this->get_post_data('data');
    if ($data) {
      unset($data['id_empresa']);
      $res['message'] = 'Error al Actualizar';
      if ($this->company_model->update($data)) {
        $res['message'] = 'Datos actualizados con exito';
        $res['company'] = $this->company_model->get_empresa();
      }
      $this->response_json($res);
    }

  }

  public function get(){
    authenticate();
    $res = $this->company_model->get_empresa();
    $this->response_json($res);
  }

  public function upload() {
    authenticate();
    $result = $this->do_upload('company', 'picture');
    if (isset($result['error'])) {
      $res['message'] = $result['error'];
    } else {
      $data['logo'] = "company/{$result['success']['file_name']}";
      $this->company_model->update($data);
      $res['message'] = 'Perfil Actualizado';
      $res['company'] = $this->company_model->get_empresa();
    }
    $this->response_json($res);
  }

}
