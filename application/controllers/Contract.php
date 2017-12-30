<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Contract extends MY_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('contract_model');
		$this->load->model('service_model');
		$this->load->model('settings_model');
		$this->load->model('client_model');
		$this->load->model('cancelations_model');
  }

  public function add() {
    authenticate();
    $data = $this->get_post_data('data');
    if ($data) {
      if ($contract_id = $this->contract_model->add($data)) {
        $this->set_message('Contrato creado');
        $this->res['payments'] = $this->payment_model->get_payments_of_contract($contract_id, 'list');
        $this->res['contract'] = $contract_id;
      } else {
        $this->set_message('El contrato no pudo ser creado correctamente');
      }
      $this->response_json();
    }
	}
	
	public function get_contracts($mode, $id) {
		authenticate();
		if ($mode && $id) {
				$this->contract_model->get_all_of_client($_POST['id']);
			} else {
				$this->contract_view_model->get_contract_view('activo');
		}
	}

	public function suspend(){
		authenticate();
		$data = json_decode($_POST['data'],true);
		$contract = $this->contract_model->get_contract_view($data['id_contrato']);
		$result = suspender_contrato($data['id_contrato'],$contract['id_cliente'],$this);
		if($result){
			$res['mensaje'] = MESSAGE_SUCCESS." Contrato suspendido";
		}else{
			$res['mensaje'] = MESSAGE_ERROR." El contrato no pudo ser suspendido";
		}
		echo json_encode($res);
	}

	public function reconnect() {
		authenticate();
		$data = json_decode($_POST['data'],true);
		$this->db->where("id_contrato",$data['id_contrato'])
							->where('fecha_limite',$data['fecha']);
		$number = $this->db->count_all_results('ic_pagos');

		if($number == 0){
			$this->db->trans_start();
			reconnect_contract($data,$this);
			$this->db->trans_complete();

			if ($this->db->trans_status() === false){
		 		$res['mensaje']	= MESSAGE_ERROR. " El contrato/cliente no pudo ser reconectado";
			} else {
				$res['mensaje'] = MESSAGE_SUCCESS." El contrato/cliente ha sido reconectado";
			$this->contract_model->delete_cancelation($data['id_contrato']);
			}
		}else{
			  $res['mensaje'] = MESSAGE_INFO." ya hay pagos para esta fecha";
		}
		 echo json_encode($res);
	}

	public function getCancelations() {
		authenticate();
		$data = json_decode($_POST['data'], true);
		if ($data) {
			$res['content'] = $this->cancelations_model->get_cancelations($data['first_date'], $data['second_date']);
			echo json_encode($res);
		}
	}

	public function delete_extra() {
		authenticate();
		$data = $this->get_post_data('data');
		if ($data) {
			$res['mensaje'] = MESSAGE_ERROR . " Error al eliminar servicio adicional";
			if ($this->contract_model->update(['extras_fijos' => null], $data['id_contrato'])){
				$res['mensaje'] = MESSAGE_SUCCESS . " Extra eliminado con exito";
			}
			echo json_encode($res);
		}
  }

  public function up_to_date(){
    authenticate();
    $data = $this->get_post_data('data');
    if ($data) {
      if(!is_day_closed()) {
         if ($this->contract_model->payments_up_to_date($data)) {
          $this->set_message(' Pagos Actualizados');
         } else {
          $this->set_message(' Error al actualizar los pagos', 'error');
         }
      } else {
        $this->set_message('No puede realizar transacciones luego del cierre de caja', 'info');
      }
      $this->response_json();
    }
  }
}
