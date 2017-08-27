<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Caja extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("caja_mayor");
	}

	public function add_gasto(){
		$data = json_decode($_POST['data'],true);
		$this->caja_mayor->add_gasto($data);
	}

	public function get_gastos(){
		$data = json_decode($_POST['data'],true);
		$this->caja_mayor->mostrar_gastos($data['fecha'],"full");
	}

	public function delete_gasto(){
		$data = json_decode($_POST['data'],true);
		$this->caja_mayor->delete_gasto($data);
	}

	public function get_ingresos(){
		if(isset($_POST['data'])){
			$data = json_decode($_POST['data'],true);
		}else{
			$data = json_decode($_POST,true);
		}
		$response['pagos_efectivo'] = $this->caja_mayor->get_ingresos($data['fecha'],'efectivo');
		$response['pagos_banco'] 		= $this->caja_mayor->get_ingresos($data['fecha'],'banco','efectivo');
		$response['pagos_facturas'] = $this->caja_mayor->get_extras_or_recibos($data['fecha'],'','extra');
		$response['pagos_extras'] 	= $this->caja_mayor->get_extras_or_recibos($data['fecha'],'extra');
		echo json_encode($response);
	}

	public function getjson() {
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
		$data = json_decode($_POST['data'],true);
		$this->caja_mayor->add_cierre($data);

	}

	public function get_last_cierre(){
		$this->caja_mayor->get_last_cierre();
	}


}