<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Contract extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('contract_model');
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



}