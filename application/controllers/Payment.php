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
		if ($data && $this->payment_model->delete_extra($data['key'], $data['id_pago'])) {
			$this->payment_model->reorganize_values($data['id_pago']);
			$res['mensaje'] = MESSAGE_SUCCESS . "Reconexion Eliminado";
		} else {
			$pago = $this->payment_model->get_payment($data['id_pago']);
			if (str_contains('Reconexion', $pago['detalles_extra'])){
				//@hack: para los pagos que no tienen la nueva forma de pago
				$reconexion = $pago['monto_extra'] - 300;
				$detalles_extra = str_replace("Reconexion --", "", $pago["detalles_extra"]);
				$total = $pago['monto_extra'] - 300 + $pago['mora'] + $pago['cuota'];
				$this->payment_model->update(["detalles_extra" => $detalles_extra, "monto_extra" => $reconexion, "total" => $total]);
				$res['mensaje'] = MESSAGE_SUCCESS . "Reconexion Eliminado";
			} else {
				$res['mensaje'] = MESSAGE_ERROR . "Error al eliminar este servicio y/o reconexion";
			}
		}
		echo json_encode($res);
	}

	public function set_extra() {
		authenticate();
		$data = $this->get_post_data('data');
		if ($data) {
			$settings = $this->settings_model->get_settings();
			if ($data['key'] == 0) {
				$new_extra = [0 => ["servicio" => "Reconexion", "precio" => $settings['reconexion']]];
			}
			if ($this->payment_model->set_extra($new_extra, $data['id_pago'])) {
				$this->payment_model->reorganize_values($data['id_pago']);
				$res['mensaje'] = MESSAGE_SUCCESS . "Reconexion Aplicada(o)";
			} else {
				$res['mensaje'] = MESSAGE_ERROR . "Error al eliminar este servicio y/o reconexion";
			}
			echo json_encode($res);
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

}
