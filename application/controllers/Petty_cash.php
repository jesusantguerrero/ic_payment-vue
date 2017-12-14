<?php
  defined('BASEPATH') OR exit('No direct script access allowed');
  class Petty_cash extends MY_Controller {
    public function __construct(){
      parent::__construct();
      $this->load->model('caja_chica_model');
    }

    public function add_money() {
      authenticate();
      $data = $this->get_post_data('data');
      if ($data) {
        $data = $this->transaction_format('entrada', $data);
        $result	= $this->caja_chica_model->add_money($data);
        if ($result) {
          $this->set_message('Monto registrado');
        } else {
          $this->set_message('Error al registrar la transaccion', 'error');
        }
        $this->response_json();
      }
    }

    public function retire_money(){
      authenticate();
      $data = $this->get_post_data('data');
      if ($data) {
        $data = $this->transaction_format('salida', $data);
        $result	= $this->caja_chica_model->retire_money($data);
        if ($result) {
          $this->set_message('Monto registrado');
        } else {
          $this->set_message('Error al registrar la transaccion', 'error');
        }
        $this->response_json();
      }
    }

    public function get_trasactions() {
      authenticate();
      $rows = $this->caja_chica_model->get_rows();
      $this->response_json($rows);
    }

    public function search_trasactions(){
      authenticate();
      $this->caja_chica_model->search_in_rows($data['id_empleado'],$data['fecha']);
    }

    public function get_current_balance() {
      authenticate();
      $balance = $this->caja_chica_model->get_last_saldo();
      $this->response_json($balance);
    }

    private function transaction_format($type, $data){
      return [
        $type => $data['amount'],
        'descripcion' => $data['description']
      ];
    }
  }
