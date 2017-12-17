<?php
  defined('BASEPATH') OR exit('No direct script access allowed');
  class Petty_cash extends MY_Controller {
    public function __construct(){
      parent::__construct();
      $this->load->model('petty_cash_model');
    }

    public function add() {
      authenticate();
      if ($data) {
        if ($data['entrada'] <= 0) {
          $this->set_message("El monto está en cero o es menor");
        } else {
          $result	= $this->petty_cash_model->add_transaction($data);
          if ($result) {
            $this->set_message('Monto registrado');
          } else {
            $this->set_message('Error al registrar la transaccion', 'error');
          }
        }
        $this->response_json();
      }
    }

    public function retire(){
      authenticate();
      $data = $this->get_post_data('data');
      if ($data) {
        $balance = $this->petty_cash_model->get_balance();
        if ( $data['salida'] > $balance && $data['salida'] <= 0) {
          $this->set_message('El registro de salida que intenta ingresar es mayor a balance actual o menor a cero', 'error');
        } else {
          $result	= $this->petty_cash_model->add_transaction($data);
          if ($result) {
            $this->set_message('Monto registrado');
          } else {
            $this->set_message('Error al registrar la transaccion', 'error');
          }
        }
        $this->response_json();
      }
    }

    public function edit(){
      authenticate();
      $data = $this->get_post_data('data');
      if ($data) {
        $balance = $this->petty_cash_model->get_balance();
        if ( $data['salida'] > $balance && $data['salida'] <= 0) {
          $this->set_message('El registro de salida que intenta ingresar es mayor a balance actual o menor a cero', 'error');
        } else if ($data['salida'] <= 0 && $data['entrada'] <= 0) {
          $this->set_message('no puede hacer una transaccion en blanco', 'error');
        } else if (!$this->is_today($data['fecha'])) {
          $this->set_message('no puede editar una transaccion anterior al dia de hoy');
        } else {
          $id = $data['id'];
          unset($data['id']);
          $result	= $this->petty_cash_model->edit($data, $id);
          if ($result) {
            $this->set_message('Monto editado');
          } else {
            $this->set_message('Error al registrar la transaccion', 'error');
          }
        }
        $this->response_json();
      }
    }

    public function delete() {
      authenticate();
      $data = $this->get_post_data('data');
      if ($data['id'] ) {
        if (!$this->is_today($data['date'])) {
          $this->set_message('no puede eliminar una transaccion anterior al dia de hoy', 'error');
        } else {
          if ( $this->petty_cash_model->delete_transaction($data['id'])) {
            $this->set_message('Monto eliminado');
          } else {
            $this->set_message('Error al eliminar la transaccion'.$this->db->last_query(),'error');
          }
        }
        $this->response_json();
      }
    }

    public function get_transactions($user_id = '', $start_date = '') {
      authenticate();
      $res['transactions'] = $this->petty_cash_model->get_rows($user_id, $start_date);
      $res['balance'] = $this->petty_cash_model->get_balance();;
      $this->response_json($res);
    }

    public function get_transaction() {

    }

    public function get_balance() {
      authenticate();
      $balance = $this->petty_cash_model->get_balance();
      $this->response_json($balance);
    }

    public function is_today($original_date) {
      $date = substr($original_date, 0, 10);
      $date = new DateTime($date);
      $today = new DateTime('today');

      return ($date == $today);

    }
  }
