<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Caja extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("caja_mayor");
	}

	public function add_gasto(){
		authenticate();
		$data = json_decode($_POST['data'],true);
		$this->caja_mayor->add_gasto($data);
	}

	public function get_gastos($full = false){
		authenticate();
		$data = json_decode($_POST['data'],true);
		if (!$full){
			$this->caja_mayor->mostrar_gastos($data['fecha'], 'full');
		}else {
			if($data) {
				$res = $this->caja_mayor->get_expenses($data['text'], $data['first_date'], $data['second_date']);
				echo json_encode($res);
			}
		}
	}

	public function delete_gasto(){
		authenticate();
		$data = json_decode($_POST['data'],true);
		$this->caja_mayor->delete_gasto($data);
	}

	public function get_ingresos(){
		authenticate();
		if(isset($_POST['data'])){
			$data = json_decode($_POST['data'],true);
		}else{
			$data = json_decode($_POST,true);
		}
		$response['pagos_efectivo'] = $this->caja_mayor->get_ingresos($data['fecha'],'efectivo');
		$response['pagos_banco'] 		= $this->caja_mayor->get_ingresos($data['fecha'],'banco','efectivo');
		$response['pagos_facturas'] = $this->caja_mayor->get_extras_or_recibos($data['fecha'],'facturas');
		$response['pagos_extras'] 	= $this->caja_mayor->get_extras_or_recibos($data['fecha'],'extras');
		echo json_encode($response);
	}

	public function getjson() {
		authenticate();
		$data = json_decode($_POST['data'],true);
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
		authenticate();
		$data = json_decode($_POST['data'],true);
		$this->caja_mayor->add_cierre($data);
	}

	public function get_cierres() {
			authenticate();
			$data = json_decode($_POST['data'],true);
			if($data) {
				$res = $this->caja_mayor->get_cierres($data['text'], $data['first_date'], $data['second_date']);
				echo json_encode($res);
			}
	}

	public function get_last_cierre(){
		authenticate();
		$this->caja_mayor->get_last_cierre();
	}

	public function get_year_info(){
		authenticate();
		$data = json_decode($_POST['data'],true);
		$ganancias = array();
		$gastos = array();
		$meses = array_values($GLOBALS['spanish_months']);

		foreach ($meses as $mes) {
			$result = $this->caja_mayor->get_banco_of_month($mes);
			array_push($ganancias,$result['banco']);
			$result = $this->caja_mayor->get_gastos_of_month($mes);
			array_push($gastos,$result['monto']);
		}
		$response['gastos'] 	= $gastos;
		$response['ganancias'] = $ganancias;
		echo json_encode($response);
	}

}
