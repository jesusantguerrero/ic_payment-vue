<?php
  Class settings extends MY_Controller {
    public function __construct(){
      parent::__construct();
      $this->load->model('settings_model');
      $this->my_auth->authenticate();
    }

    public function update(){
      $data = $this->get_post_data('data');
      if ($data) {
        $this->set_message('Error al Actualizar');
        if ($this->settings_model->update_settings($data)) {
          $this->set_message('Datos actualizados con exito');
        }
        $this->response_json($res);
      }

    }

    public function get(){
      $res = $this->settings_model->get_settings();
      $this->response_json($res);
    }

  }
