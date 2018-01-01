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
		$this->load->model("section_model");
		$this->load->model("extra_model");
		$this->load->model("cancelations_model");
	}


	public function update(){
		authenticate();
		$data  = $_POST;
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "abonos":
				if (!$this->is_day_closed()) {
					$this->db->trans_start();
					set_abono($data,$this);
					$this->db->trans_complete();
					if($this->db->trans_status() === false){
						$this->db->trans_rollback();
						echo MESSAGE_ERROR." No se pudo completar el abono";
					}
				}
				break;
			case "pagos":
				if (!$this->is_day_closed()) {
					$was_correct = $this->payment_model->check_for_update($data['id']);
					if($was_correct){
						$id_contrato = $data['id_contrato'];
						refresh_contract($id_contrato,$this,$data);
					}else{
						echo MESSAGE_INFO." Este pago ya ha sido realizado";
					}
				}
				break;

			case "deshacer_pago":
			  if(!$this->is_day_closed()){
					$was_correct = $this->payment_model->check_for_update($data['id_pago']);
					if(!$was_correct){
						$this->db->trans_start();
						cancel_payment($data['id_pago'],$this);
						$this->db->trans_complete();
						if($this->db->trans_status() === false){
							$this->db->trans_rollback();
							echo MESSAGE_ERROR." No Pudo deshacerse el Pago";
						}
					}else{
						echo MESSAGE_INFO." Este pago no ha sido realizado para deshacerse";
					}
				}
        break;

			case "discount_pagos":
			  if (!$this->is_day_closed()) {
					$was_correct = $this->payment_model->check_for_update($data['id_pago']);
					if($was_correct){
						$this->db->trans_start();
						payment_discount($data,$this);
						$this->db->trans_complete();
						if($this->db->trans_status() === false){
							$this->db->trans_rollback();
							echo MESSAGE_ERROR." error en la operacion";
						}else{
							echo " Proceso Completo";
						}
					}
				}
				break;

			case "averias":
				$this->averia_model->update($data['id_averia']);
				break;
			case "instalaciones":
				$this->report_model->update_installation($data['id_pago']);
				break;
    }
  }

	public function axiosupdate(){
		authenticate();
		$data   = json_decode($_POST['data'], true);
		$info   = json_decode($_POST['extra_info'], true);
		$response['mensaje'] = '';

		switch ($info['module']) {
			case 'pagos':
				if($data['tipo'] == '') $data['tipo'] = 'efectivo';

				if($this->payment_model->update($data,$info['id'])){
					$response['mensaje'] = MESSAGE_SUCCESS." procesando cambios";
					echo json_encode($response);
				}
				break;
			case 'ip':
				if ($this->section_model->update_ip_state($data['codigo'],$data['estado'])) {
					$response['mensaje'] = MESSAGE_SUCCESS." Estado de ip cambiado";
					echo json_encode($response);
				}
		}
	}

	public function getall(){
		authenticate();
		$tabla = $_POST['tabla'];
		switch ($tabla) {
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
		}
	}

	public function getone(){
		authenticate();
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "pagos":
				$result['pago'] 		= $this->payment_model->get_payment($_POST['id_pago']);
				$result['settings'] = $this->settings_model->get_settings();
				if($result){
					echo json_encode($result);
				}else{
					echo "nada";
				}
				break;
		}
	}

	public function count(){
		authenticate();
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case 'clientes':
				$this->client_model->count_clients();
				break;
			case 'contratos':
				$this->contract_view_model->count_contracts();
				break;
			case 'servicios':
				$this->service_model->count_services();
				break;
			case 'pagos_por_contratos':
				$this->payment_model->count_of_contract();
			case 'averias':
				$this->averia_model->count();
				break;
		}
  }

  // TODO: move to payment
	public function getrecibo($id){
		authenticate();
		$recibo_info = $this->payment_model->get_payment($id, true);
		$this->session->set_flashdata('recibo_info',$recibo_info);
    if(str_contains('abono',$recibo_info['concepto'])){
      redirect(base_url('app/imprimir/recibo_abono'));
    }
		redirect(base_url('app/imprimir/recibo'));
	}

  // TODO: move to contract controller
	public function getrequirements($id,$type = "cliente"){
		authenticate();
		$requirement_info['cliente'] = $this->client_model->get_client($id);
		if($type == "cliente"){
			$contract_id = $this->contract_model->get_last_id_of($id);
		}else{
			$contract_id = $id;
		}
		$requirement_info['contrato'] = $this->contract_model->get_contract_view($contract_id);
		$requirement_info['servicio'] = $this->service_model->get_service($requirement_info['contrato']['id_servicio']);
		if(!$requirement_info['cliente'])
			$requirement_info['cliente'] = $this->client_model->get_client($requirement_info['contrato']['id_cliente']);
		$this->session->set_flashdata('requirement_info',$requirement_info);
		redirect(base_url('app/imprimir/requerimientos'));
	}

	public function getrequirement($client_id,$service_id){
		authenticate();
		$requirement_info['cliente'] 	= $this->client_model->get_client($client_id);
		$requirement_info['servicio'] = $this->service_model->get_service($service_id);
		$this->session->set_flashdata('requirement_info', $requirement_info);
		redirect(base_url('app/imprimir/requerimiento'));
	}

	public function getcancelcontract($contract_id, $end = false){ // or end of contract
		authenticate();
		$contract = $this->contract_model->get_contract_view($contract_id);
		$requirement_info['contrato'] = $contract;
		$requirement_info['cliente'] 	= $this->client_model->get_client($contract['id_cliente']);
		$requirement_info['pago']	= $this->payment_model->get_last_pay_of($contract_id);
		if (!$end) {
			$requirement_info['cancelacion']	= $this->contract_model->get_cancelation($contract_id);
			$endpoint = 'app/imprimir/cancelacion';
		} else {
			$endpoint = 'app/imprimir/termino';
		}
		$this->session->set_flashdata('requirement_info', $requirement_info);
		redirect(base_url($endpoint));
	}

  // TODO: move to report controller
	public function getreport($table,$type = 'nada'){
		authenticate();

		switch ($table) {
			case 'payment':
					$this->report_model->get_payments_report($type);
				break;
			case 'recibos':
					$this->report_model->get_receipts_report();
					break;
			case 'installations':
					$this->report_model->get_installations(true);
				break;
			case 'deudores':
					$this->report_model->get_moras_view(true);
				break;
			case 'averias':
					$this->report_model->get_averias_report();
				break;
			case 'clientes':
				$type = str_replace('%20',' ',$type);
				$this->report_model->get_client_report($type);
				break;
			case 'secciones':
				$type = str_replace('%20',' ',$type);
				$this->report_model->get_sections_report($type);
				break;
			case 'retiros':
				$this->cancelations_model->print_report();
				break;
			case 'gastos':
			  $this->load->model('caja_mayor');
				$this->caja_mayor->expenses_report();
				break;
			case 'cierres':
			  $this->load->model('caja_mayor');
				$this->caja_mayor->cierres_report();
				break;
		}
			redirect(base_url('app/imprimir/reporte'));

	}
  // TODO: move to contract controller
	public function print_page(){
		authenticate();
		$report = $this->contract_view_model->get_technical_report();
		if(!$report) echo "No hay datos";

		$this->load->library('PHPExcel');
		$this->load->library('PHPExcel/IOFactory');

		$myreport_sheet = create_excel_file($report);
		$file = "reporte_tecnico.xlsx";

		header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;");
		header("Content-Disposition: attachment; filename= $file");
		header("Cache-Control: max-age=0");
		header("Expires: 0");
		$objWriter = IOFactory::createWriter($myreport_sheet, 'Excel2007');
		$objWriter->save('php://output');

		print_r($myreport_sheet);
	}
}
