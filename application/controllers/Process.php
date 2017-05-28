<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Process extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('user_model');
		$this->load->model("client_model");
		$this->load->model("service_model");
		$this->load->model("contract_model");
		$this->load->model("payment_model");
	}

	public function add(){ 
		$data = $_POST;
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "clientes":
				$this->client_model->add($data);
				break;
			case "servicios":
				$this->service_model->add($data);
				break;
			case "contratos":
				 $is_saved = $this->contract_model->add($data);
				 if($is_saved){
					$this->client_model->is_active(true,$data);
				 	$contract_id = $this->contract_model->get_last_Id();
				 	create_payments($contract_id,$data,$this);
				 }
				break;
		}

	}

	public function update(){
		$data = $_POST;
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "clientes":
				$this->client_model->update_client($data);
				break;
			case "servicios":
				$this->service_model->update_service($data);
				break;
			case "pagos":
				$was_correct = $this->payment_model->check_for_update($data);
				if($was_correct){
					$id_contrato = $data['id_contrato'];
					refresh_contract($id_contrato,$this,$data);
				}
				break;
		}
	}

	public function getall(){
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "users":
				$this->user_model->get_all_users();
				break;
			case "clientes":
				$this->client_model->get_all_clients();
				break;
			case "servicios":
				$this->service_model->get_all_services();
				break;
			case "pagos":
				$this->payment_model->get_all_of_contract($_POST['id']);
				break;
			case "v_proximos_pagos":
				$this->payment_model->get_next_payments($_POST);
				break;
			case "v_pagos_pendientes":
				$this->payment_model->get_moras_home();
				break;
		}
	}

	public function getone(){
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "clientes":
				$this->client_model->get_client($_POST['id'],true);
			break;
		}
	}

	public function paginate(){
		$offset = $_POST['offset'];
		$perpage = $_POST['perpage'];
		$table = $_POST['table'];
		if($offset == 1) $offset = 0;
		if($table == "clientes"):
			$this->client_model->get_clients_paginate($offset,$perpage);
		else:
			$this->service_model->get_services_paginate($offset,$perpage);
		endif;
	}

	public function delete(){
		$id = $_POST['id'];
		$tabla = $_POST['tabla'];

		switch ($tabla) {
			case 'clientes':
				$this->client_model->delete_client($id);
				break;
			case 'servicios':
				$this->service_model->delete_service($id);
				break;
			default:
				# code...
				break;
		}
	}

	public function count(){
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case 'users':
				$this->user_model->count_users();
				break;
			case 'clientes':
				$this->client_model->count_clients();
				break;
			case 'servicios':
				$this->service_model->count_services();
				break;
			case 'pagos':
				$this->payment_model->count_payments();
				break;
			default:
				# code...
				break;
		}
	}

	public function search(){
		$tabla = $_POST['tabla'];
		$word = $_POST['word'];
		if($tabla == "clientes"){
			$result = $this->client_model->search_clients($word);
		} 
	}

	public function details($id,$active_window){

		$_SESSION['client_data'] = $this->client_model->get_client($id);
		$this->session->set_flashdata('active_window',$active_window);
		redirect(base_url('app/admin/detalles'));
	}

	public function newcontract($id){

		$_SESSION['client_data'] = $this->client_model->get_client($id);
		redirect(base_url('app/admin/nuevo_contrato'));
	}

	public function getrecibo($id){
		$recibo_info = $this->payment_model->get_recibo($id);
		$this->session->set_flashdata('recibo_info',$recibo_info);
		redirect(base_url('app/imprimir/recibo'));
	}


}