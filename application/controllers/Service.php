<?php

 class Service extends MY_Controller {
    public function __construct(){
      parent::__construct();
      $this->load->model('service_model');
      $this->load->model('contract_model');
      $this->my_auth->authenticate();
    }

    public function add() {
      $data = $this->get_post_data('data');
      if ($data) {
        if ($result = $this->service_model->add($data)) {
          if (isset($result['message'])) {
            $this->set_message($result['message'], 'info');
          } else {
            $this->set_message('Servicio agregado');
            $this->event->trigger('service', 1, $data);
          }
        } else {
          $this->set_message('Error al agregar servicio', 'error');
        }
        $this->response_json();
      }
    }

    public function get_services($type = null){
      if (!$type) {
        $res['services'] = $this->service_model->get_all_services();
      } else {
        $res['services'] = $this->service_model->get_services($type);
      }
      $this->response_json($res);
    }

    public function get_service(){
      $data = $this->get_post_data('data');
      if ($data) {
        $res['service'] = $this->service_model->get_service($data['id']);
        $this->response_json($res);
      }
    }

    public function update(){
      $data = $this->get_post_data('data');
      if ($data) {
				$this->db->trans_start();
				$result = $this->service_model->update_service($data);
				$this->db->trans_complete();
				if ($this->db->trans_status() === false) {
					$this->db->trans_rollback();
					$this->set_message("No pudo completarse la accion correctamente", 'error');
        } else {
          $this->set_message($result);
          $this->event->trigger('service', 2, $data, " precio {$data['mensualidad']}");
        }
        $this->response_json();
      }
    }

    public function delete(){
      $data = $this->get_post_data('data');
      if ($data && isset($data['id'])) {
        $service = $this->service_model->get_service($data['id']);
        if ($this->service_model->delete_service($data['id'])) {
          $this->set_message(' Servicio eliminado');
          $this->event->trigger('service', 4, $service);
        } else {
          $this->set_message('El servicio no se ha podido eliminar', 'error');
        }
        $this->response_json();
      }
    }
 }
