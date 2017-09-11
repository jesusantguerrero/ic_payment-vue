<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Messages extends CI_Controller {	
  public function __construct(){
    parent::__construct();
    $this->load->model("company_model");
    $this->load->model('message_model');
    $this->load->model('client_model');
    $this->load->library('messagegate');
  }
    
  public function send_message(){  
    $data = json_decode($_POST['data'],true);
    $status = $this->messagegate->send_message($data);
    
    if(!isset($status['error'])){
      $res['mensaje'] = MESSAGE_SUCCESS ." Mensajes enviados correctamente";
    }else{
      $res['mensaje'] = MESSAGE_ERROR . " Mensajes no enviados, revise la configuracion de mensajes";
    }

    $res['status'] = $status;
    echo json_encode($res);
  }

  public function save_config(){
    $data = $_POST['data'];
    $status = $this->message_model->add_config($data);
    if ($status ){
      $res['mensaje'] = MESSAGE_SUCCESS . 'Configuracion Agregada';
    } else{
      $res['mensaje'] = MESSAGE_ERROR .'No se ha guardar la configuracion, revise los datos';
    }
    echo json_encode($res);
  }
  
  public function get_config(){
    $res['config'] = $this->message_model->get_config();
    $res['mensaje'] = MESSAGE_INFO . 'Configuracion de Mensajes';
    echo json_encode($res);
  }
  
  public function search_clients(){
    $query = $_GET['q'];
    $res['items'] = $this->client_model->search_clients_for_message($query);
    echo json_encode($res);
  }

}