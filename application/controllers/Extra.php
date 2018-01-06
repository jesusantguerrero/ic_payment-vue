<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Extra extends MY_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("extra_model");
    $this->load->model("payment_model");
    $this->my_auth->authenticate();
  }

  public function add_extra() {
    $this->extra_model->add_extra($data_extra);
  }

	public function delete_extra(){

		if ($data = $this->get_post_data('data')) {
      if ($this->extra_model->delete_extra($data)) {
        $this->set_message('Exta Eliminado');
      } else {
        $this->set_message('Error al eliminar extra','error');
      }
      $this->response_json();
    }
	}

	public function get_all($client_id = null) {

		$data = $this->get_post_data('data');
    if (!$client_id) {
      $res = $this->extra_model->get_all($data['state'], $data['text']);
    } else {
      $res['extras'] = $this->extra_model->get_all_of_client($client_id);
      $res['actives']  = $this->extra_model->count_active_extras($client_id);
    }
    $this->response_json($res);
  }

  // extra payments

  public function get_extra_payments(){
		if ($data = $this->get_post_data('data')){
			$res['payments'] = $this->extra_model->get_all_of_extra($data['id_extra'], 'id_pago, concepto');
			$this->response_json($res);
		}
  }

	public function get_payment(){
		if ($data = $this->get_post_data('data')) {
      $res["payment"] = $this->payment_model->get_payment($data["id_pago"]);
      $this->response_json($res);
    }
	}

	public function apply_payment(){
    $info = $this->get_post_data('info');
    $data = $this->get_post_data('data');
    if ($info && $data ) {
      if ($this->payment_model->is_paid($info['id_pago'])) {
        $this->set_message('Este pago ya ha sido realizado', 'info');
      } else if (!$this->extra_model->is_valid_amount($data, $info)) {
        $this->set_message('este monto es mayor a la deuda o igual a cero', 'info');
      } else {
        if ($this->extra_model->apply_payment($data, $info)) {
          $this->set_message('Pagado');
          $this->res['id_pago'] = $info['id_pago'];
        } else {
          $this->set_message('error al realizar pago', '');
        }
      }
      $this->response_json();
    }
	}

	public function edit_payment() {
		$info = $this->get_post_data('info');
    $data = $this->get_post_data('data');
    if ($info && $data ) {
      if (!$this->payment_model->is_paid($info['id_pago']) && $data){
        $this->set_message('Este pago aun no se ha realizado para editarse', 'info');
      } else if (!$this->extra_model->is_valid_amount($data, $info, 'edit')) {
        $this->set_message('este monto es mayor a la deuda o igual a cero', 'info');
      } else {
			   if ($this->extra_model->apply_payment($data,$info)) {
          $this->set_message('Editado');
          $this->res['id_pago'] = $info['id_pago'];
         } else {
          $this->set_message('error al editar pago', '');
         }
      }
      $this->response_json();
    }
	}

	public function delete_payment() {
    if ($data = $this->get_post_data('data')) {
      if ($this->extra_model->delete_payment($data)) {
        $this->set_message('eliminado');
      } else {
        $this->set_message('error al eliminar pago', 'error');
      }
      $this->response_json();
    }
	}

	public function generate_extra_payment() {
    if ($data = $this->get_post_data('data')) {
      if ($this->extra_model->generate_extra_payment($data)) {
        $this->set_message('Pago generado');
      } else {
        $this->set_message('error al generar pago', 'error');
      }
      $this->response_json();
    }
	}
}
