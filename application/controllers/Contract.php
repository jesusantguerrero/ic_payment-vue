<?php

use PHPUnit\Framework\MockObject\Stub\Exception;
defined('BASEPATH') OR exit('No direct script access allowed');

class Contract extends MY_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('contract_model');
		$this->load->model('contract_view_model');
		$this->load->model('service_model');
		$this->load->model('extra_model');
		$this->load->model('settings_model');
		$this->load->model('client_model');
    $this->load->model('cancelations_model');
    $this->my_auth->authenticate();
  }

  public function add() {
    $data = $this->get_post_data('data');
    if ($data) {
      if ($contract_id = $this->contract_model->add($data)) {
        $this->set_message('Contrato creado');

        try {
          $contract = $this->contract_model->get_contract_view($contract_id, true);
          $this->event->trigger('contract', 1, (array) $contract);
        } catch(Exception $e) {
          die("hola");
          $this->set_message($e->getMessage(), 'error');
        }

        $this->res['payments'] = $this->payment_model->get_payments($contract_id, 'list');
        $this->res['contract'] = $contract_id;
      } else {
        $this->set_message('El contrato no pudo ser creado correctamente', 'error');
      }
      $this->response_json();
    }
	}

	public function get_contracts($id = null, $mode = null) {
		if ($mode && $id) {
				$res['contracts'] = $this->contract_model->get_contracts($id, $mode);
			} else {
				$res['contracts'] = $this->contract_view_model->get_contract_view('activo', 'full');
    }
    $this->response_json($res);
  }

  public function get_contract() {
    $data = $this->get_post_data('data');
    if ($data) {
      $res['contract'] = $this->contract_model->get_contract_view($data['id'],true);
      $this->response_json($res);
    }
  }

  public function update() {
    $data = $this->get_post_data('data');
    $event_message = "";

    if ($data) {
      $contract = $this->contract_model->get_contract_view($data['id_contrato']);
      $data_for_update = [
        'nombre_equipo' => $data['nombre_equipo'],
        'mac_equipo'		=> $data['mac_equipo'],
        'router'				=> $data['router'],
        'mac_router'    => $data['mac_router'],
        'modelo'				=> $data['modelo'],
      ];

      if(isset($data['codigo'])){
          $this->section_model->update_ip_state($contract['codigo'],'disponible');
          $data_for_update['ip']     = $data['ip'];
          $data_for_update['codigo'] = $data['codigo'];
          $this->section_model->update_ip_state($data['codigo'],'ocupado');
          $event_message = "nueva codigo IP {$data['codigo']}";
      }

      if ($this->contract_model->update($data_for_update,$data['id_contrato'])) {

        $this->event->trigger('contract', 2, $contract, $event_message);

        $this->set_message('Contrato Actualizado');
      } else {
        $this.set_message('error al actualizar contrato');
      }
      $this->response_json();
    }
  }

  public function upgrade(){
		if ($data = $this->get_post_data('data')) {
      if ($this->contract_model->upgrade_contract($data)) {
        $this->set_message(' contrato mejorado');

        $service = $this->service_model->get_service($data['id_servicio']);
        $contract = $this->contract_model->get_contract_view($data['id_contrato']);
        $this->event->trigger('contract', 2, $contract, "Cambio a plan {$service['nombre']}");
      } else {
        $this->set_message('error al mejorar contrato', 'error');
      }
      $this->response_json();
    }
	}

	public function suspend() {
    if ($data = $this->get_post_data('data')) {
      $contract = $this->contract_model->get_contract_view($data['id_contrato']);
      $result = suspender_contrato($data['id_contrato'], $contract['id_cliente'], $this);
      if ($result) {
        $this->set_message('Contrato suspendido');
        $this->event->trigger('contract', 6, $contract);
      } else {
        $this->set_message('El contrato no pudo ser suspendido', 'error');
      }
      $this->response_json();
    }
  }

  public function extend() {
		if ($data = $this->get_post_data('data')) {
      $this->db->trans_start();
      extend_contract($data, $this);
      $this->db->trans_complete();
      if($this->db->trans_status()){
        $this->set_message("Contrato extendido con exito");
        $contract = $this->contract_model->get_contract_view($data['id_contrato']);
        $this->event->trigger('contract', 7, $contract, "+ {$data['duracion']} meses");
      }
      else{
        $this->set_message("error al extender el contrato", " error");
      }
      $this->response_json();
    }
	}


  public function cancel() {
    $data = $this->get_post_data('data');
		if (!$this->is_day_closed() && $data) {
			$pendents = $this->contract_view_model->get_pendent_payments($data['id_contrato']);
			if ($pendents == false) {
				if ($result = cancel_contract($this, $data)) {
          $message = isset($result['message']) ? $result['message'] : 'contrato cancelado';

          if ($message == 'contrato cancelado') {
            $contract = $this->contract_model->get_contract_view($data['id_contrato']);
            $this->event->trigger('contract', 5, $contract, " |Motivo: {$data['motivo']}");
          }

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
    if ($data = $this->get_post_data('data')) {
      $this->db->where("id_contrato",$data['id_contrato']);
      $this->db->where('fecha_limite',$data['fecha']);
      $number = $this->db->count_all_results('ic_pagos');

      if($number == 0){
        $this->db->trans_start();
        reconnect_contract($data,$this);
        $this->db->trans_complete();

        if ($this->db->trans_status() === false){
           $this->set_message("El contrato/cliente no pudo ser reconectado");
        } else {
          $this->set_message("El contrato/cliente ha sido reconectado", "info");
          $this->contract_model->delete_cancelation($data['id_contrato']);
        }
      }else{
          $this->set_message("ya hay pagos para esta fecha", 'info');
      }
      $this->response_json();
    }
	}

	public function get_cancelations() {
		$data = json_decode($_POST['data'], true);
		if ($data) {
			$res['content'] = $this->cancelations_model->get_cancelations($data['first_date'], $data['second_date']);
			echo json_encode($res);
		}
  }

  public function add_extra(){
		if ($data = $this->get_post_data('data')) {
      switch ($data['modo_pago']) {
        case 1:
          $result = $this->contract_model->add_next_payment_extra($data);
          break;
        case 2:
          $result = $this->extra_model->add_extra($data);
          break;
        case 3:
          $result = $this->add_fixed_extra($data);
          break;
      }

      if ($result) {
        $this->set_message($result['message']);
      } else {
        $this->set_message('error en la transaccion', 'error');
      }
      $this->response_json();
    }
  }

  public function add_fixed_extra($data) {
    $service = $this->service_model->get_service($data['id_servicio']);
    if ($this->contract_model->update(['extras_fijos' => $data['id_servicio']], $data['id_contrato'])) {
      // event
      $contract = $this->contract_model->get_contract_view($data['id_contrato']);
      $this->event->trigger('contract', 2, $contract, "Nuevo Seguro {$service['nombre']}");

      return ['message' => 'Seguro Agregado'];
    }
  }

	public function delete_extra() {
		$data = $this->get_post_data('data');
		if ($data) {
      if ($this->contract_model->update(['extras_fijos' => null], $data['id_contrato'])){
        $this->set_message("Extra eliminado con exito");
        $contract = $this->contract_model->get_contract_view($data['id_contrato']);
        $this->event->trigger('contract', 2, $contract, "Elimino Extra");
      } else {
        $this->set_message("Error al eliminar servicio adicional");
      }
      $this->response_json();
		}
  }

  public function up_to_date(){
    $data = $this->get_post_data('data');
    if ($data) {
      if(!$this->is_day_closed()) {
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

  // installation

  public function update_installation_state($contract_id){
    $this->load->model('report_model');
		if ($this->report_model->update_installation($contract_id)) {
      $this->set_message('Estado de instalacion cambiado');
      $contract = $this->contract_model->get_contract_view($contract_id);
      $this->event->trigger('contract', 2, $contract, "Cambio estado de instalacion");
    } else {
      $this->set_message('No se pudo cambiar el estado');
    }
    $this->response_json();
  }

	public function get_installations($state){
    $this->load->model('report_model');
    $state =str_replace('%20', ' ', $state);
    $res['installations'] = $this->report_model->get_installations_list($state);
    $this->response_json($res);
	}

  // documents
  public function get_requirements($id,$type = "cliente"){
		if($type == "cliente"){
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

	public function get_requirement($client_id, $service_id){
		$requirement_info['cliente'] 	= $this->client_model->get_client($client_id);
		$requirement_info['servicio'] = $this->service_model->get_service($service_id);
		$this->session->set_flashdata('requirement_info', $requirement_info);
		redirect(base_url('app/imprimir/requerimiento'));
	}

	public function get_cancel_contract($contract_id, $end = false){ // or end of contract
		$contract = $this->contract_model->get_contract_view($contract_id);
		$requirement_info['contrato'] = $contract;
		$requirement_info['cliente'] 	= $this->client_model->get_client($contract['id_cliente']);
		$requirement_info['pago']	= $this->payment_model->get_last_paid($contract_id);
		if (!$end) {
			$requirement_info['cancelacion']	= $this->contract_model->get_cancelation($contract_id);
			$endpoint = 'app/imprimir/cancelacion';
		} else {
			$endpoint = 'app/imprimir/termino';
		}
		$this->session->set_flashdata('requirement_info', $requirement_info);
		redirect(base_url($endpoint));
  }

  public function print_page(){
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
