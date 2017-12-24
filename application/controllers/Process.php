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

	public function add(){
		authenticate();
		$data = $_POST;
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "servicios":
				$this->service_model->add($data);
				break;
			case "contratos":
				 $this->db->trans_start();
				 $is_saved = $this->contract_model->add($data);
				 if($is_saved){
					$this->client_model->is_active(true, $data);
					$contract_id = $this->contract_model->get_last_id_of($data['id_cliente']);
				 	create_payments($contract_id,$data,$this);
					$this->section_model->update_ip_state($data['codigo'],'ocupado');
					$this->contract_model->update_amount($contract_id);
				 }
				 $this->db->trans_complete();
				 if($this->db->trans_status()){
					$res['mensaje'] =  MESSAGE_SUCCESS." Nuevo contrato agregado con exito";
					$res['tabla_pagos'] = $this->payment_model->list_all_of_contract($contract_id);
				 }
				 else{
					 $this->db->trans_rollback();
					 $res['mensaje'] = MESSAGE_ERROR." El Contrato No Pudo ser guardado";
					 $res['tabla_pagos'] = null;
				 }
				 echo json_encode($res);
				break;
		}

	}

	public function getjson() {
    $data = json_decode($_POST['data']);
    $data = json_decode($_POST['data'],true);
    $action = $_POST['action'];
		$module = $_POST['module'];
      switch ($action) {
				case 'update':
          $this->client_model->update($data);
					break;
      }
  }

	public function update(){
		authenticate();
		$data  = $_POST;
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "observaciones":
				$this->client_model->update_observations($data);
				break;
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
			case "servicios":
				$this->db->trans_start();
				$this->service_model->update_service($data);
				update_contract_from_service($data);
				$this->db->trans_complete();
				if($this->db->trans_status() === false):
					$this->db->trans_rollback();
					echo MESSAGE_ERROR." No pudo completarse la accion correctamente";
				else:
					echo " proceso completo";
				endif;
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

			case "pagos_al_dia":
				if(!$this->is_day_closed()){
					$this->db->trans_start();
					payments_up_to_date($data);
					$this->db->trans_complete();
					if($this->db->trans_status() === false){
							$this->db->trans_rollback();
						echo MESSAGE_ERROR." No pudo completarse la accion correctamente";
					}else{
						echo " Proceso Completo";
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

	public function upgrade(){
		authenticate();
		$data_cambio = $_POST;
		upgrade_contract($this,$data_cambio);
	}

	public function getall(){
		authenticate();
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "servicios":
				$this->service_model->get_all_services();
				break;
			case "contratos":
				$this->contract_view_model->get_contract_view('activo');
				break;
			case "contratos_cliente":
				$this->contract_model->get_all_of_client($_POST['id']);
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
		}
	}

	public function getlist(){
		authenticate();
		$tabla = $_POST['tabla'];
		if($tabla == "pagos"){
				$id_contrato = $this->contract_model->get_last_id();
				echo $this->payment_model->list_all_of_contract($id_contrato);
		}
	}

	public function getone(){
		authenticate();
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "contratos":
				$result = $this->contract_model->get_contract_view($_POST['id_contrato'],true);
				if($result){
					 $dataJson = json_encode($result);
					 echo $dataJson;
				}else{
					echo "nada";
				}
				break;
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

	public function delete(){
		authenticate();
		$id = $_POST['id'];
		$tabla = $_POST['tabla'];

		switch ($tabla) {
			case 'servicios':
				$this->service_model->delete_service($id);
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

	public function getrecibo($id){
		authenticate();
		$recibo_info = $this->payment_model->get_payment($id, true);
		$this->session->set_flashdata('recibo_info',$recibo_info);
    if(str_contains('abono',$recibo_info['concepto'])){
      redirect(base_url('app/imprimir/recibo_abono'));
    }
		redirect(base_url('app/imprimir/recibo'));
	}

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

	public function cancel(){
		authenticate();
		if(!$this->is_day_closed()){
			$data_cancel = $_POST;
			$pendents = $this->contract_view_model->get_pendent_payments($data_cancel['id_contrato']);
			$estado   = $this->client_model->get_client($data_cancel['id_cliente'])['estado'];
			if($pendents == false and $estado != 'mora'){
				cancel_contract($this,$data_cancel);
			}else{
				echo 'El cliente tiene pagos pendientes, debe hacer el pago antes de cancelar';
			}
		}
	}

	public function data_for_extra(){
		authenticate();
		$dni = $_POST['dni'];
		$dni = str_replace('-','',$dni);
		$data;
		$client = $this->client_model->get_client($dni, true);
		if($client){
			$data['cliente'] = $client;
			$data["contratos"]  = $this->contract_model->get_all_of_client($client->id_cliente,true);
			$dataJson = json_encode($data);
			echo $dataJson;
		}else{
			echo "nada";
		}

	}

	public function extend_contract(){
		authenticate();
		$data = $_POST;
		$this->db->trans_start();
		extend_contract($data,$this);
		$this->db->trans_complete();
		if($this->db->trans_status()){
			echo MESSAGE_SUCCESS." Contrato extendido con exito";
		}
		else{
			echo MESSAGE_ERROR."No guardado"." Error";
		}
	}

	public function addextra(){
		authenticate();
		$data = $_POST;
		add_extra($this,$data);
	}

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

	private function is_day_closed($mode = 'break'){
		$this->load->model('caja_mayor');
		$last_close_date =$this->caja_mayor->get_last_close_date();
		$today = date('Y-m-d');
		if ($last_close_date == $today){
			echo MESSAGE_INFO.'No puede realizar transacciones luego del cierre de caja';
			return true;
		}
	}
}
