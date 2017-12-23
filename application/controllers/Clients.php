<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class Clients extends MY_Controller{
    public function __construct(){
      parent::__construct();
      $this->load->model('client_model');
    }

    public function add(){
      authenticate();
      $data = $this->get_post_data('data');
      if ($data) {
        if (!$this->client_model->has_dni($data['cedula'])) {
          $data['fecha_registro'] = date('Y-m-d');
          $data['estado'] = 'no activo';
          if ($this->client_model->add($data)) {
            $this->set_message('Cliente agregado');
          } else {
            $this->set_message('El cliente no pudo ser agregado, revise los datos e intente', 'error');
          }
        } else {
          $this->set_message('Esta cedula ya está registrada', 'error');
        }

        $this->response_json();
      }
    }

    public function get_clients($mode = false){
      authenticate();
      if (!$mode) {
        $res['clients'] = $this->client_model->get_all_clients();
      } else if ($mode == 'dropdown'){
				$res['items'] = $this->client_model->search_clients_for_message($query,'id_cliente');
      } else {
        $word = $this->get_post_data('word');
        $res['clients'] = $this->client_model->search_clients($word);
      }
      echo json_encode($res);
    }

    public function get_client(){
      authenticate();
      $data = $this->get_post_data('data');
      if ($data) {
        $res['client'] = $this->client_model->get_client($data['id'], true);
        $this->response_json($res);
      }
    }

    public function update(){
      authenticate();
      $data = $this->get_post_data('data');
      if ($data) {
        if ($this->client_model->update_client($data)){
          $this->set_message('Cliente actualizado');
        } else {
          $this->set_message('Error al actualizar cliente', 'error');
        }
        $this->response_json();
      }
    }

    public function update_row(){
      authenticate();
      $data = $this->get_post_data('data');
      if ($data) {
        if ($this->client_model->update_client($data['value'], $data['row'], $data['id'])){
          $this->set_message('Cliente actualizado');
        } else {
          $this->set_message('Error al actualizar cliente', 'error');
        }
        $this->response_json();
      }
    }

    public function delete(){
      authenticate();
      $data = $this->get_post_data('data');
      if ($data && isset($data['id'])) {
				if ($this->client_model->delete_client($data['id'])) {
          $this->set_message('Cliente Eliminado correctamente');
        } else {
          $this->set_message('Error al eliminar cliente','error');
        }
				$this->response_json();
      }
    }

  }
