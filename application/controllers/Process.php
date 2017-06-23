<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Process extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('user_model');
		$this->load->model("client_model");
		$this->load->model("service_model");
		$this->load->model("contract_model");
		$this->load->model("contract_view_model");
		$this->load->model("payment_model");
		$this->load->model("company_model");
		$this->load->model("report_model");
		$this->load->model("settings_model");
		$this->load->model("averia_model");
		$this->load->model("caja_chica_model");
		$this->load->model("section_model");
		$this->load->helper(array('report','payment','section'));
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
			case "averias":
				$this->averia_model->add($data);
				break;
			case "caja":
				$this->caja_chica_model->add_money($data);
				break;
			case "secciones":
				$is_saved = $this->section_model->add($data);
				switch ($is_saved) {
					case -1:
						echo MESSAGE_INFO." Este sector o codigo ha sido guardado anteriormente";
						break;
					case 0:
						echo MESSAGE_ERROR." No se ha podido Guardar el sector";
						break;
					case 1:
						$section_id = $this->section_model->get_section_id($data['codigo_area']);
						create_ips($section_id,$data);
						break;
					default:
						# code...
						break;
				}
				break;
			case "contratos":
				 $this->db->trans_start();
				 $is_saved = $this->contract_model->add($data);
				 if($is_saved){
					$this->client_model->is_active(true,$data);
				 	$contract_id = $this->contract_model->get_last_Id($data['id_cliente']);
				 	create_payments($contract_id,$data,$this);
					$this->section_model->update_ip_state($data['codigo'],'ocupado');
					$this->contract_model->update_amount($contract_id);
				 }
				 $this->db->trans_complete();
				 if($this->db->trans_status()){

				 }
				 else{
					 echo "No guardado";
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
			case "observaciones":
				$this->client_model->update_observations($data);
				break;
			case "servicios":
				$this->db->trans_start();
				$this->service_model->update_service($data);
				update_contract_from_service($data);
				$this->db->trans_complete();
				if($this->db->trans_status() === false):
					echo MESSAGE_ERROR." error en el status";
				else:
					echo " proceso completo";
				endif;
				break;
			case "pagos":
				$was_correct = $this->payment_model->check_for_update($data);
				if($was_correct){
					$id_contrato = $data['id_contrato'];
					refresh_contract($id_contrato,$this,$data);
				}
				break;
			case "empresa":
				$this->company_model->update($data);
				break;
			case "settings":
				$this->settings_model->update_settings($data);
				break;
			case "averias":
				$this->averia_model->update($data['id_averia']);
				break;
			case "instalaciones":
				$this->report_model->update_installation($data['id_pago']);
				break;
			case "contratos":
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
				$this->contract_model->update($data_for_update,$data['id_contrato'],true);
				break;
			
		}
	}

	public function retire(){
		$data = $_POST;
		$this->caja_chica_model->retire_money($data);
	}

	public function upgrade(){
		$data_cambio = $_POST;
		upgrade_contract($this,$data_cambio);
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
			case "averias":
				$this->averia_model->get($_POST['estado']);
				break;
			case "instalaciones":
				$this->report_model->get_installations_list($_POST['estado']);
				break;
			case "ips":
				$this->section_model->get_all_of_section($_POST['id']);
				break;
			case "ip_list":
				$this->section_model->get_ip_list_of_section($_POST['id_seccion']);
				break;
			case "secciones":
				$this->section_model->get_sections_dropdown();
				break;
		}
	}

	public function lastpage(){
				$tabla = $_POST['tabla'];
		switch ($tabla){
			case "pagos":
				$this->payment_model->last_page();
				break;
			case "clientes":
				$this->client_model->last_page();
				break;
			case "contratos":
				$this->contract_view_model->last_page();
				break;
			case "caja":
				$this->caja_chica_model->last_page();
				break;

		}

	}

	public function getone(){
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "clientes":
				$result = $this->client_model->get_clientjson($_POST['id'],true);
				if($result){
					 $dataJson = json_encode($result);
					 echo $dataJson;
				}else{
					echo "nada";
				}
				break;
			case "contratos":
				$result = $this->contract_model->get_contract_view($_POST['id_contrato'],true);
				if($result){
					 $dataJson = json_encode($result);
					 echo $dataJson;
				}else{
					echo "nada";
				}
				break;
				case "caja":
					$result = $this->caja_chica_model->get_last_saldo();
					echo $result;
					break;
		}
	}

	public function paginate(){
		$offset = $_POST['offset'];
		$perpage = $_POST['perpage'];
		$table = $_POST['table'];
		if($offset == 1) $offset = 0;
		switch ($table) {
			case "clientes":
				$this->client_model->get_clients_paginate($offset,$perpage);
				break;
			case "servicios":
				$this->service_model->get_services_paginate($offset,$perpage);
				break;
			case "v_contratos":
				$this->contract_view_model->get_contracts_paginate($offset,$perpage);
			break;
			case "pagos_por_contrato":
				$this->payment_model->get_payments_paginate($offset,$perpage);
			break;
			case "caja":
				$this->caja_chica_model->paginate($offset,$perpage);
			break;
		}
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
			case 'contratos':
				$this->contract_view_model->count_contracts();
				break;
			case 'servicios':
				$this->service_model->count_services();
				break;
			case 'pagos':
				$this->payment_model->count_payments();
				break;
			case 'pagos_por_contratos':
				$this->payment_model->count_of_contract();
			case 'caja':
				$this->caja_chica_model->count();
				case 'averias':
				$this->averia_model->count();
				break;
		}
	}

	public function search(){
		$data = $_POST;
		$tabla = $data['tabla'];
		if(isset($_POST['word'])):
			$word = $_POST['word'];
		endif;

		switch ($tabla) {
			case 'clientes':
				$this->client_model->search_clients($word);
				break;
			case 'servicios':
				 $this->service_model->search_services($word);
				break;
			case 'v_contratos':
				 $this->contract_view_model->search_contracts($word);
				break;
			case 'caja':
				 $this->caja_chica_model->search_in_rows($data['id_empleado'],$data['fecha']);
				break;
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

	public function getrequirements($client_id){
		$requirement_info['cliente'] = $this->client_model->get_client($client_id);
		$contract_id = $this->contract_model->get_last_id($client_id);
		$requirement_info['contrato'] = $this->contract_model->get_contract_view($contract_id);
		$this->session->set_flashdata('requirement_info', $requirement_info);
		redirect(base_url('app/imprimir/requerimientos'));
	}
	// just one
	public function getrequirement($client_id){
		$requirement_info['cliente'] = $this->client_model->get_client($client_id);
		$this->session->set_flashdata('requirement_info', $requirement_info);
		redirect(base_url('app/imprimir/requerimiento'));
	}

	public function getcancelcontract($client_id,$contract_id){
		$requirement_info['contrato'] = $this->contract_model->get_contract_view($contract_id);
		$requirement_info['cliente'] 	= $this->client_model->get_client($client_id);
		$requirement_info['pago']	= $this->payment_model->get_last_pay_of($contract_id);
		$requirement_info['cancelacion']	= $this->contract_model->get_cancelation($contract_id);
		$this->session->set_flashdata('requirement_info', $requirement_info);
		redirect(base_url('app/imprimir/cancelacion'));
	}

	public function getreport($table,$type){
		switch ($table) {
			case 'payment':
					$this->report_model->get_payments_report($type);
				break;
			case 'installations':
					$this->report_model->get_installations(null,true);
				break;
			case 'deudores':
					$this->report_model->get_moras_view(true);
				break;
			case 'averias':
					$this->report_model->get_averias_report();
				break;
			
			default:
				# code...
				break;
		}
			redirect(base_url('app/imprimir/reporte'));
	
	}
	
	public function cancel(){
		$data_cancel = $_POST;
		cancel_contract($this,$data_cancel);
	}

	public function data_for_extra(){
		$dni = $_POST['dni'];
		$data;
		$client = $this->client_model->get_clientjson($dni);
		if($client){
			$data['cliente'] = $client;
			$data["contratos"]  = $this->contract_model->get_all_of_clientjson($client->id_cliente);
			$dataJson = json_encode($data);
			echo $dataJson;
		}else{
			echo "nada";
		}
		
	}

	public function extend_contract(){
		$data = $_POST;
		$this->db->trans_start();
		extend_contract($data,$this);
		$this->db->trans_complete();
		if($this->db->trans_status()){
			echo MESSAGE_SUCCESS." Contrato extendido con exito";
		}
		else{
			echo MESSAGE_ERROR."No guardado".$this->db->last_query();
		}
	}

	public function addextra(){
		$data = $_POST;
		add_extra($this,$data);
	}

	public function print_page(){
		$page = $this->caja_chica_model->get_for_print();
		header("Content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=iso-8859-1");
		header("Content-Disposition: attachment; filename=Reporte".date('d-m-Y').".xlsx");
		header("Pragma: no-cache");
		header("Expires: 0");
		echo $page;
	}
}