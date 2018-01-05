<?php
class Payment extends MY_Controller {
  public function __construct(){
		parent::__construct();
		$this->load->model('report_model');
		$this->load->model('payment_model');
		$this->load->model('settings_model');
	}

  public function get_payments($mode){
		authenticate();
		if ($data = $this->get_post_data('data')){
			$res['payments'] = $this->payment_model->get_payments($data['id_contrato'], $mode);
			$this->response_json($res);
		}
  }

	public function get_payment(){
		authenticate();
		if ($data = $this->get_post_data('data')) {
      $res["payment"] = $this->payment_model->get_payment($data["id_pago"]);
      $res['settings'] = $this->settings_model->get_settings();
      $this->response_json($res);
    }
  }

  public function delete_payment(){
    if(!$this->is_day_closed() && $data = $this->get_post_data('data')){
      if(!$this->payment_model->is_paid($data['id_pago'])){
        $this->db->trans_start();
        cancel_payment($data['id_pago'],$this);
        $this->db->trans_complete();
        if($this->db->trans_status() === false){
          $this->db->trans_rollback();
          $this->set_message("No Pudo deshacerse el Pago");
        }
      }else{
        $this->set_message("Este pago no ha sido realizado para deshacerse");
      }
      $this->response_json();
    }
  }

  public function get_receipts() {
		authenticate();
		$data = $this->get_post_data('data');
		if($data) {
			$res = $this->report_model->get_receipts($data['text'],$data['first_date'],$data['second_date']);
      echo json_encode($res);
		}
	}

	public function delete_extra() {
    authenticate();
    $data = $this->get_post_data('data');
		if ($data && !$this->payment_model->is_paid($data['id_pago']) && $data['id_servicio']) {
      if ($this->payment_model->delete_extra($data['id_servicio'], $data['id_pago'])) {
        $this->payment_model->reorganize_values($data['id_pago']);
        $this->set_message("Monto extra Eliminado");
			} else {
				$this->set_message("Error al eliminar este servicio");
			}
      $this->response_json();
		}
	}

	public function set_extra() {
    authenticate();
    $data = $this->get_post_data('data');
    $settings = $this->settings_model->get_settings();
    $not_paid = !$this->payment_model->is_paid($data['id_pago']);

		if ($data && $this->validate_extra($data['service']) && $not_paid) {
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
			$this->response_json();
		}
	}

	public function set_mora() {
		authenticate();
		$data = $this->get_post_data('data');
		if ($data && $this->payment_model->update(["mora" => $data['mora']], $data['id_pago'])) {
			$this->payment_model->reorganize_values($data['id_pago']);
			$res['mensaje'] = MESSAGE_SUCCESS . "Mora actualizada";
		} else {
			$res['mensaje'] = MESSAGE_ERROR . "Error al cambiar mora";
		}
		echo json_encode($res);
  }

  public function validate_extra($service) {
    return (($service['id_servicio'] || $service['id_servicio'] = 0) && $service['nombre'] && $service['mensualidad']);
  }

}
