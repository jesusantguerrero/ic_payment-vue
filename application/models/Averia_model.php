<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Averia_model extends CI_MODEL{
  
  #$id_averia = null;
  #id_cliente 
  #descripcion 
  #fecha
  #estado
  
  public function __construct(){
    parent::__construct();
    $this->load->database();
  }

  public function add($data){
    $rows = array(
      'id_averia'   => null,
      'id_cliente'  => $data['id_cliente'],
      'descripcion' => $data['descripcion'],
      'fecha'       => null,
      'estado'      => 'por reparar',
    );
    if($this->db->insert('ic_averias',$rows)){
      echo MESSAGE_SUCCESS."Averia Guardada";
    }else{
      echo MESSAGE_ERROR."error". $this->db->last_query();
    }  
  }
}