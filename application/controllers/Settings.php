<?php
  Class settings extends MY_Controller {
    public function __construct(){
      parent::__construct();
      $this->load->model('settings_model');
    }

    public function update(){
      authenticate();
      $data = $this->get_post_data('data');

      if ($data) {
        $res['message'] = ['type' => 'error', 'text' => 'Error al Actualizar'];
        if ($this->settings_model->update_settings($data)) {
          $res['message'] = ['type' => 'success', 'text' => 'Datos actualizados con exito'];
        }
        $this->response_json($res);
      }

    }

    public function get(){
      authenticate();
      $res = $this->settings_model->get_settings();
      $this->response_json($res);
    }

  }