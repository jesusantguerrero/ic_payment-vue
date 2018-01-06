<?php
class Payment extends MY_Controller {
  public function __construct(){
		parent::__construct();
		$this->load->model('report_model');
		$this->load->model('payment_model');
    $this->load->model('settings_model');
    $this->my_auth->authenticate();
	}

  public function get_payments($mode){
		if ($data = $this->get_post_data('data')){
			$res['payments'] = $this->payment_model->get_payments($data['id_contrato'], $mode);
			$this->response_json($res);
		}
  }

	public function get_payment(){
    $this->load->model('service_model');
		if ($data = $this->get_post_data('data')) {
      $res["payment"] = $this->payment_model->get_payment($data["id_pago"]);
      $res['service'] = $this->service_model->get_service($res['payment']['id_servicio']);
      $this->response_json($res);
    }
  }

  public function apply_payment() {
    $data = $this->get_post_data('data');
    if (!$this->is_day_closed() && $data) {
      $not_paid = !$this->payment_model->is_paid($data['id']);
      if($not_paid){
        $contract_id = $data['id_contrato'];
        if ($this->contract_model->refresh_contract($contract_id, $data)) {
          $this->set_message('Pago realizado');
        } else {
          $this->set_message('Error al realizar pago', 'error');
        }
      }else{
        $this->set_message('Este pago ya ha sido realizado');
      }
      $this->response_json();
    }
  }

  public function abono() {
    $data = $this->get_post_data('data');
    if (!$this->is_day_closed() && $data) {
      if ($result = set_abono($data, $this)) {
        if ($result === 'bigger') {
          $this->set_message('El saldo que intenta abonar es mayor a la cuota', 'info');
        } else {
          $this->set_message('Abono Acreditado');
        }
      } else {
        $this->set_message('No se pudo completar el abono');
      }
      $this->response_json();
    }
  }

  public function apply_discount() {
    if (!$this->is_day_closed()) {
      $not_paid = !$this->payment_model->is_paid($data['id_pago']);
      if($not_paid){
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
 }

  public function delete_payment(){
    if(!$this->is_day_closed() && $data = $this->get_post_data('data')){

      if($this->payment_model->is_paid($data['id_pago'])){

        $this->db->trans_start();
          $result = cancel_payment($data['id_pago'], $this);
        $this->db->trans_complete();

        if($this->db->trans_status() === false){
          $this->db->trans_rollback();
          $this->set_message("No Pudo deshacerse el Pago");
        } else {
          $this->set_message("Pago deshecho");
        }

      }else{
        $this->set_message("Este pago no ha sido realizado para deshacerse");
      }
      $this->response_json();
    }
  }

  public function get_receipts() {
		$data = $this->get_post_data('data');
		if($data) {
			$res = $this->report_model->get_receipts($data['text'], $data['first_date'], $data['second_date']);
      echo json_encode($res);
		}
  }

	public function get_receipt($id){
		$recibo_info = $this->payment_model->get_payment($id, true);
		$this->session->set_flashdata('recibo_info',$recibo_info);
    if(str_contains('abono',$recibo_info['concepto'])){
      redirect(base_url('app/imprimir/recibo_abono'));
    }
		redirect(base_url('app/imprimir/recibo'));
	}

	public function delete_extra() {

    $data = $this->get_post_data('data');
		if ($data && ($data['id_servicio'] || $data['id_servicio'] == 0)) {
      $is_paid = $this->payment_model->is_paid($data['id_pago']);
      if ($is_paid) {
        $this->set_message( 'este pago ya ha sido realizado', 'info');
      } else {
        if ($this->payment_model->delete_extra($data['id_servicio'], $data['id_pago'])) {
          $this->payment_model->reorganize_values($data['id_pago']);
          $this->set_message("Monto extra Eliminado");
			  } else {
				  $this->set_message("Error al eliminar este servicio");
			  }
      }
      $this->response_json();
    }
  }

	public function set_extra() {
    $data = $this->get_post_data('data');
    $settings = $this->settings_model->get_settings();
		if ($data && $this->validate_extra($data['service'])) {
        $is_paid = $this->payment_model->is_paid($data['id_pago']);
      if ($is_paid) {
        $this->set_message( 'este pago ya ha sido realizado', 'info');
      } else {
        if ($data['service'] == 0) {
          $service_name = 'Reconexion';
          $new_extra = [0 => ["servicio" => "Reconexion", "precio" => $settings['reconexion']]];
        } else {
          $service = $data['service'];
          $service_name = $service['nombre'];
          $new_extra = [$service['id_servicio'] => ['servicio' => $service['nombre'], 'precio' => $service['mensualidad']]];
        }
        if ($this->payment_model->set_extra($new_extra, $data['id_pago'])) {
          $this->payment_model->reorganize_values($data['id_pago']);
          $this->set_message("$service_name Aplicada(o)");
        } else {
          $this->set_message('Error al eliminar este servicio y/o reconexion, quiza ya esta pago', 'error');
        }
      }
			$this->response_json();
		}
	}

	public function set_mora() {
    $data = $this->get_post_data('data');
    if ($data) {
      $is_paid = $this->payment_model->is_paid($data['id_pago']);
      if ($is_paid) {
        $this->set_message( 'este pago ya ha sido realizado', 'info');
      } else {
        $mora = $this->settings_model->get_settings()['cargo_mora'];
        $mora = ($mora / 100) * $data['cuota'];
        $mora = ($data['mora'] == 0 ? 0 : $mora);
        if ($this->payment_model->update(["mora" => $mora], $data['id_pago'])) {
          $this->payment_model->reorganize_values($data['id_pago']);
          $this->set_message("Mora actualizada");
        } else {
          $this->set_message("Error al cambiar mora", 'error');
        }
      }
      $this->response_json();
    }
  }

  public function validate_extra($service) {
    if ($service == 0) {
      return true;
    }
    return (($service['id_servicio'] || $service['id_servicio'] = 0) && $service['nombre'] && $service['mensualidad']);
  }

}
