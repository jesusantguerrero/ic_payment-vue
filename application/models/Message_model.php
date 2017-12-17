<?php defined('BASEPATH') OR exit('No direct script access allowed');

Class Message_model extends CI_Model {
  private $route_code;
  private $table;

  function __construct(){
    parent::__construct();
    $this->load->library('my_firebase');
    $this->table = 'message_settings';
  }

  function add_config($data){
    return $this->my_firebase->save($this->table,$data);
  }

  function get_config(){
    return $this->my_firebase->read($this->table);
  }

}
