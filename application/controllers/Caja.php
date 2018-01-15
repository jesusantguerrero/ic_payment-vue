<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Caja extends MY_Controller {

	public function __construct(){
		parent::__construct();
    $this->load->model("caja_mayor");
    $this->my_auth->authenticate();
	}

	public function add_gasto(){
		$data = $this->get_post_data('data');
		$this->caja_mayor->add_gasto($data);
	}

	public function get_gastos($full = false){
		$data = $this->get_post_data('data');
		if (!$full){
			$this->caja_mayor->mostrar_gastos($data['fecha'], 'full');
		}else {
			if($data) {
				$res = $this->caja_mayor->get_expenses($data['text'], $data['first_date'], $data['second_date']);
				$this->response_json($res);
			}
		}
	}

	public function delete_gasto(){
		$data = $this->get_post_data('data');
		$this->caja_mayor->delete_gasto($data);
	}

	public function get_ingresos(){
		if(isset($_POST['data'])){
			$data = $this->get_post_data('data');
		}else{
			$data = json_decode($_POST, true);
    }

		$res['pagos_efectivo'] = $this->caja_mayor->get_ingresos($data['fecha'],'efectivo');
		$res['pagos_banco'] 	 = $this->caja_mayor->get_ingresos($data['fecha'],'banco', 'efectivo');
		$res['pagos_facturas'] = $this->caja_mayor->get_extras_or_recibos($data['fecha'],'facturas');
		$res['pagos_extras'] 	 = $this->caja_mayor->get_extras_or_recibos($data['fecha'],'extras');
		$this->response_json($res);
	}

	public function getjson() {
		$data = $this->get_post_data('data');
		$action = $_POST['action'];
		$module = $_POST['module'];

			switch ($action) {
				case 'add':
						if($module == "gastos"){
							$this->caja_mayor->add_gasto($data);
						}else{

						}
					break;
				case 'getAll':
						if($module == "gastos"){
							$this->caja_mayor->mostrar_gastos($data['fecha']);
						}else{

						}
					break;
				case 'get_total_day':
					$this->caja_mayor->get_total_gastos_of($data['fecha']);
					break;
				case 'delete':
					$this->caja_mayor->delete_gasto($data['id']);
					break;
				default:
					# code...
					break;
			}
	}

	public function add_cierre(){
		$data = $this->get_post_data('data');
		$this->caja_mayor->add_cierre($data);
	}

	public function get_cierres() {
			$data = $this->get_post_data('data');
			if($data) {
				$res = $this->caja_mayor->get_cierres($data['text'], $data['first_date'], $data['second_date']);
				$this->response_json($res);
			}
	}

	public function get_last_cierre(){
    $res = $this->caja_mayor->get_last_cierre();
    $this->response_json($res);
	}
}
