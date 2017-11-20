<?php
class Payment extends MY_controller {
  public function __construct(){
		parent::__construct();
		$this->load->model('report_model');
		$this->load->model('payment_model');
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
			$res['mensaje'] = MESSAGE_SUCCESS . "{$data['key']} Eliminado";
			$this->payment_model->reorganize_values($data['id_pago']);
		} else {
			$res['mensaje'] = MESSAGE_SUCCESS . "Error al eliminar este servicio y/o reconexion";
		}
		echo json_encode($res);
	}


}