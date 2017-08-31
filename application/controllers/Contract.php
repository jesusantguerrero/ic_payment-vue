<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Contract extends Process {

	public function __construct(){
		parent::__construct();
	}

	public function suspend(){
		authenticate();
		$data = json_decode($_POST['data'],true);
		$contract = $this->contract_model->get_contract_view($data['id_contrato']);
		$result = suspender_contracto($data['id_contrato'],$contract['id_cliente'],$this);
		if($result){
			$res['mensaje'] = SUCCESS_MESSAGE." Contrato suspendido"; 
		}else{
			$res['mensaje'] = ERROR_MESSAGE." El contrato no pudo ser suspendido";
		}
		echo json_encode($res);
	}



}