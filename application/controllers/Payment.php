<?php
class Payment extends CI_controller {
  public function __construct(){
		parent::__construct();
		$this->load->model('report_model');
	}

  public function get_receipts() {
		authenticate();
		$data = json_decode($_POST['data'],true);
		if($data) {
			$res = $this->report_model->get_receipts($data['text'],$data['first_date'],$data['second_date']);
      echo json_encode($res);
		}
	}
}