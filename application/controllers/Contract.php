<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Contract extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('contract_model');
		$this->load->model('service_model');
		$this->load->model('settings_model');
		$this->load->model('client_model');
		$this->load->model('cancelations_model');
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

	public function reconnect(){
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

	public function getCancelation() {
		authenticate();
		$data = json_decode($_POST['data'],true);
		if($data) {
			$res['tableHTML'] = $this->cancelations_model->get_cancelations($data['first_date'],$data['second_date']);
			echo json_encode($res);
		}
	}

}