<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Caja extends MY_Controller {

	public function __construct(){
		parent::__construct();
    $this->load->model("caja_mayor");
    $this->my_auth->authenticate();
	}

	public function add_expense(){
    $data = $this->get_post_data('data');
    if ($data) {
      $data['fecha'] = date('Y-m-d');
      if ($this->caja_mayor->add_expense($data)) {
        $this->set_message('Gasto agregado');
        $this->event->trigger('expense', 1, $data);
      } else {
        $this->set_message('Error al agregar gasto', 'error');
      }
      $this->response_json();
    }
	}

	public function get_expenses($full = false){
		$data = $this->get_post_data('data');
		if (!$full) {
      $this->res = $this->caja_mayor->get_expenses(date('Y-m-d'), 'full');
		}else {
			if($data) {
				$this->res = $this->caja_mayor->show_expenses($data['text'], $data['first_date'], $data['second_date']);
			}
		}
    $this->response_json();
	}

	public function delete_expense() {
		if ($data = $this->get_post_data('data')) {
      $expense = $this->caja_mayor->get_expense($data['id']);
      if ($this->caja_mayor->delete_expense($data)) {
        $this->set_message('Gasto eliminado');
        $this->event->trigger('expense', 4, $expense);
      } else {
        $this->set_message('No se puso eliminar este gasto', 'error');
      }
      $this->response_json();
    }
	}

	public function get_ingresos($date = null){
    if ($data = $this->get_post_data('data')) {
      $date = ($date ? $date : date('Y-m-d'));

      $res['pagos_efectivo'] = $this->caja_mayor->get_ingresos($date, 'efectivo');
      $res['pagos_banco'] 	 = $this->caja_mayor->get_ingresos($date, 'banco');

      $res['pagos_facturas'] = $this->caja_mayor->get_extras_or_recibos($date, 'facturas');
      $res['pagos_extras'] 	 = $this->caja_mayor->get_extras_or_recibos($date, 'extras');
      $this->response_json($res);
    }

	}

	public function add_cierre() {
	  if($data = $this->get_post_data('data')) {
      if ($this->caja_mayor->add_cierre($data)) {
        $this->set_message('Cierre realizado exitosamente');
        $this->event->trigger('closing', 3 , $data);
      } else {
        $this->set_message('No se pudo realizar el cierre: probablemente ya hay cierre en esa fecha', 'error');
      }
      $this->response_json();
    }
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
