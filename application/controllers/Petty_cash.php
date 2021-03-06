<?php
  defined('BASEPATH') OR exit('No direct script access allowed');
  class Petty_cash extends MY_Controller {
    public function __construct(){
      parent::__construct();
      $this->load->model('petty_cash_model');
      $this->my_auth->authenticate();
    }

    public function add() {
      $data = $this->get_post_data('data');
      if ($data) {
        if ($data['entrada'] <= 0) {
          $this->set_message('El monto está en cero o es menor', 'error');
        } else {
          $result	= $this->petty_cash_model->add_transaction($data);
          if ($result) {
            $this->set_message('Monto registrado');
            $this->event->trigger('petty_cash', 3, [], "entrada en caja chica de \$RD". CurrencyFormat($data['entrada']));
          } else {
            $this->set_message('Error al registrar la transaccion', 'error');
          }
        }
        $this->response_json();
      }
    }

    public function retire(){
      $data = $this->get_post_data('data');
      if ($data) {
        $balance = $this->petty_cash_model->get_balance();
        if ( $data['salida'] > $balance || $data['salida'] <= 0) {
          $this->set_message('El registro de salida que intenta ingresar es mayor a balance actual o menor a cero', 'error');
        } else {
          $result	= $this->petty_cash_model->add_transaction($data);
          if ($result) {
            $this->set_message('Monto registrado');
            $this->event->trigger('petty_cash', 3, [], "retiro en caja chica de \$RD ". CurrencyFormat($data['entrada']));
          } else {
            $this->set_message('Error al registrar la transaccion', 'error');
          }
        }
        $this->response_json();
      }
    }

    public function edit(){
      $data = $this->get_post_data('data');
      if ($data) {
        $balance = $this->petty_cash_model->get_balance();
        if ( $data['salida'] > $balance && $data['salida'] <= 0) {
          $this->set_message('El registro de salida que intenta ingresar es mayor a balance actual o menor a cero', 'error');
        } else if ($data['salida'] <= 0 && $data['entrada'] <= 0) {
          $this->set_message('no puede hacer una transaccion en blanco', 'error');
        } else if (!$this->is_today($data['fecha'])) {
          $this->set_message('no puede editar una transaccion anterior al dia de hoy', 'info');
        } else {
          $id = $data['id'];
          unset($data['id']);
          $result	= $this->petty_cash_model->edit_transaction($data, $id);
          if ($result) {
            $this->set_message('Monto editado');
          } else {
            $this->set_message('Error al registrar la transaccion '.$this->db->last_query(), 'error');
          }
        }
        $this->response_json();
      }
    }

    public function delete() {
      $data = $this->get_post_data('data');
      if ($data['id'] ) {
        if (!$this->is_today($data['date'])) {
          $this->set_message('no puede eliminar una transaccion anterior al dia de hoy', 'error');
        } else {
          if ( $this->petty_cash_model->delete_transaction($data['id'])) {
            $this->set_message('Monto eliminado');
            $this->event->trigger('petty_cash', 4, [], "transaccion en caja chica");
          } else {
            $this->set_message('Error al eliminar la transaccion'.$this->db->last_query(),'error');
          }
        }
        $this->response_json();
      }
    }

    public function get_transactions() {
      $data = $this->get_post_data('data');
      $res['transactions'] = $this->petty_cash_model->get_transactions($data['user_id'], $data['date']);
      $res['balance'] = $this->petty_cash_model->get_balance();;
      $this->response_json($res);
    }

    public function get_transaction() {

    }

    public function get_balance() {
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
