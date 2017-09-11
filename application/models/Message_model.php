<?php defined('BASEPATH') OR exit('No direct script access allowed');

Class Message_model extends CI_Model {
  private $route_code;

  function __construct(){
    parent::__construct();
    $this->load->library('my_firebase');
  }

  function add_config($data){
    return $this->my_firebase->save('message_settings',$data);
  }

  function get_config(){
    return $this->my_firebase->read('message_settings');
  }

}