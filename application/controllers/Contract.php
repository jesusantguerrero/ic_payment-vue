<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Contract extends MY_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('contract_model');
		$this->load->model('contract_view_model');
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

	public function get_contracts($mode = null, $id = null) {
    authenticate();

		if ($mode && $id) {
				$res['contracts'] = $this->contract_model->get_all_of_client($id);
			} else {
				$res['contracts'] = $this->contract_view_model->get_contract_view('activo');
    }
    $this->response_json($res);
  }

  public function get_contract() {
    authenticate();
    $data = $this->get_post_data('data');
    if ($data) {
      $res['contract'] = $this->contract_model->get_contract_view($data['id'],true);
      $this->response_json($res);
    }
  }

  public function update() {
    authenticate();
    $data = $this->get_post_data('data');
    if ($data) {
      $data_for_update = array(
        'nombre_equipo' => $data['nombre_equipo'],
        'mac_equipo'		=> $data['mac_equipo'],
        'router'				=> $data['router'],
        'mac_router'    => $data['mac_router'],
        'modelo'				=> $data['modelo'],
      );

      if(isset($data['codigo'])){
          $contract = $this->contract_model->get_contract_view($data['id_contrato']);
          $this->section_model->update_ip_state($contract['codigo'],'disponible');
          $data_for_update['ip'] = $data['ip'];
          $data_for_update['codigo'] = $data['codigo'];
          $this->section_model->update_ip_state($data['codigo'],'ocupado');
      }
      if ($this->contract_model->update($data_for_update,$data['id_contrato'])) {
        $this->set_message('Contrato Actualizado');
      } else {
        $this.set_message('error al actualizar contrato');
      }
      $this->response_json();
    }
  }

  public function upgrade(){
		authenticate();
		if ($data = $this->get_post_data('data')) {
      upgrade_contract($this,$data);
    }
	}

	public function suspend() {
		authenticate();
    $data = $this->get_post_data('data');
    if ($data) {
      $contract = $this->contract_model->get_contract_view($data['id_contrato']);
      $result = suspender_contrato($data['id_contrato'],$contract['id_cliente'],$this);
      if($result){
        $this->set_message('Contrato suspendido');
      }else{
        $this->set_message('El contrato no pudo ser suspendido', 'error');
      }
      $this->response_json();
    }
  }

  public function cancel() {
    authenticate();
    $data = $this->get_post_data('data');
		if (!$this->is_day_closed() && $data) {
			$pendents = $this->contract_view_model->get_pendent_payments($data['id_contrato']);
			if ($pendents == false) {
				if ($result = cancel_contract($this, $data)) {
          $message = (isset($result['message']) ? $result['message'] : 'contrato cancelado');
          $this->set_message($message);
        } else {
          $this->set_message('Error al cancelar contrato');
        }
			} else {
				$this->set_message('El cliente tiene pagos pendientes, debe hacer el pago antes de cancelar', 'info');
      }
      $this->response_json();
		}
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

  public function add_extra(){
		authenticate();
		if ($data = $this->get_post_data('data')) {
      if ($result = add_extra($this, $data)) {
        $this->set_message($result['message']);
      }
      $this->response_json();
    }
	}

	public function delete_extra() {
		authenticate();
		$data = $this->get_post_data('data');
		if ($data) {
      if ($this->contract_model->update(['extras_fijos' => null], $data['id_contrato'])){
        $this->set_message("Extra eliminado con exito");
      } else {
        $this->set_message("Error al eliminar servicio adicional");
      }
      $this->response_json();
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
