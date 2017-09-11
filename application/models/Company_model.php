<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Company_model extends CI_MODEL{

  
  public function __construct(){
    parent::__construct();
     
  }

  public function update($data){
    $rows = array(
      'nombre'      => $data['nombre'],
      'lema'        => $data['lema'],
      'descripcion' => $data['descripcion'], 
      'direccion'   => $data['direccion'],
      'telefono1'   => $data['telefono1'],
      'telefonos'   => $data['telefonos']
    );
    $this->db->where('id_empresa',1);
    $result = $this->db->update('ic_empresa',$rows);
    if($result){
      echo MESSAGE_SUCCESS." Datos actualizados con exito";
    }else{
      return MESSAGE_ERROR."error " .$sql;
    }  
  }

  public function get_empresa(){
    $result = $this->db->get('ic_empresa',1);
    return $result->row_array();
  }

}