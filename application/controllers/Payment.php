<?php
class Payment extends MY_controller {
  public function __construct(){
		parent::__construct();
		$this->load->model('report_model');
		$this->load->model('payment_model');
		$this->load->model('settings_model');
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
			$res['mensaje'] = MESSAGE_ERROR . "Error al eliminar este servicio y/o reconexion";
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


}