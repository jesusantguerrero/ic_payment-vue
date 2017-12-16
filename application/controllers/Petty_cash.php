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
        $balance = $this->caja_chica_model->get_balance();

        if ( $data['salida'] > $balance) {
          $this->set_message('El registro de salida que intenta ingresar es mayor a balance actual', 'error');
        } else {
          $result	= $this->caja_chica_model->retire_money($data);
          if ($result) {
            $this->set_message('Monto registrado');
          } else {
            $this->set_message('Error al registrar la transaccion', 'error');
          }
        }
        $this->response_json();
      }
    }

    public function get_transactions() {
      authenticate();
      $res['transactions'] = $this->caja_chica_model->get_rows();
      $res['balance'] = $this->caja_chica_model->get_balance();;
      $this->response_json($res);
    }

    public function search_trasactions(){
      authenticate();
      $this->caja_chica_model->search_in_rows($data['id_empleado'],$data['fecha']);
    }

    public function get_balance() {
      authenticate();
      $balance = $this->caja_chica_model->get_balance();
      $this->response_json($balance);
    }

    private function transaction_format($type, $data){
      return [
        $type => $data['amount'],
        'descripcion' => $data['description']
      ];
    }
  }
