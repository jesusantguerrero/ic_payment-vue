<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Company extends MY_Controller
{
  public function __construct() {
    parent::__construct();
    $this->load->model('company_model');
    $this->my_auth->authenticate();
  }

  public function update(){
    $data = $this->get_post_data('data');
    if ($data) {
      unset($data['id_empresa']);
      $res['message'] = ['type' => 'error', 'text' => 'Error al Actualizar'];

      if ($this->company_model->update($data)) {
        $res['message'] = ['type' => 'success', 'text' => 'Datos actualizados con exito'];
        $res['company'] = $this->company_model->get_company();
      }

      $this->response_json($res);
    }
  }

  public function get(){
    $res = $this->company_model->get_company();
    $this->response_json($res);
  }

  public function upload() {
    $result = $this->do_upload('company', 'picture');
    if (isset($result['error'])) {
      $res['message'] = ['type' => 'error', 'text' => $result['error']];
    } else {
      $data['logo'] = "company/{$result['success']['file_name']}";
      $this->company_model->update($data);
      $res['message'] = ['type' => 'success', 'text' => 'Perfil Actualizado'];
      $res['company'] = $this->company_model->get_company();
    }
    $this->response_json($res);
  }

}
