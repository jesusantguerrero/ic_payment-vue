<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Messages extends MY_Controller {
  public function __construct(){
    parent::__construct();
    $this->load->model("company_model");
    $this->load->model('message_model');
    $this->load->model('client_model');
    $this->load->library('messagegate');
  }

  public function send_message(){
    authenticate();
    $data = $this->get_post_data('data');

    if ($data) {
      $status = $this->messagegate->send_message($data);
      if(!isset($status['error']) && $status['response']){
        $res['menssage'] = ['type' => 'success', 'text' => 'Mensajes enviados correctamente'];
      }else{
        $res['menssage'] = ['type' => 'error', 'text' => 'Mensajes no enviados, revise la configuracion de mensajes'];
      }
      $res['status'] = $status;
      $this->response_json($res);
    }
  }

  public function save_config(){
    authenticate();
    $data = $this->get_post_data('data');
    if ($data) {
      $status = $this->message_model->add_config($data);
      if ($status ){
        $res['menssage'] = ['type' => 'success', 'text' => 'Configuracion Agregada'];
      } else{
        $res['menssage'] = ['type' => 'error', 'text' => 'No se ha guardar la configuracion, revise los datos'];
      }
      $this->response_json($res);
    }
  }

  public function get_config(){
    authenticate();
    $res['config'] = $this->message_model->get_config();
    $this->response_json($res);
  }

  public function search_clients(){
    authenticate();
    $query = $_GET['q'];
    if($query){
      $res['items'] = $this->client_model->search_clients_for_message($query);
      $this->response_json($res);
    }
  }
}
