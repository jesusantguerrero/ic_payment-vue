<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Extra extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("extra_model");
		$this->load->model("payment_model");
	}

	public function delete_extra(){
		$data = json_decode($_POST['data'],true);
		$this->extra_model->delete_extra($data);
	}

	public function get_extra_payment_of(){
		if(isset($_POST['data'])){
			$data = json_decode($_POST['data'],true);
		}else{
			$data = json_decode($_POST,true);
		}
		$response['pagos'] = $this->extra_model->get_all_of_extra($data['id_extra']);
		echo json_encode($response);
	}

	public function get_payment(){
		$data = json_decode($_POST['data'],true);
		$response["recibo"] = $this->payment_model->get_payment($data["id_pago"]);
		echo json_encode($response);
	}
	
	public function apply_payment(){
		$data = json_decode($_POST['data'],true);
		$info = json_decode($_POST['info'],true);
		$this->extra_model->apply_payment($data,$info);
	}
	
	public function delete_payment(){
		$data = json_decode($_POST['data'],true);
		$this->extra_model->delete_payment($data);
	}
	
	public function generate_extra_payment(){
		$data = json_decode($_POST['data'],true);
		$this->extra_model->generate_extra_payment($data);
	}

}