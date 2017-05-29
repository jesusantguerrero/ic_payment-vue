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
  
  // public $id = null;
  #id_empresa 
  #nombre 
  #lema 
  #descripcion 
  #direccion 
  #telefono1 
  #telefonos 
  

  public function __construct(){
    parent::__construct();
    $this->load->database();
  }


  public function update($data){
    $rows = array(
      'nombre'      => data['nombre'],
      'lema'        => data['lema'],
      'descripcion' => data['descripcion'], 
      'direccion'   => data['direccion'],
      'telefono1'   => data['telefono1'],
      'telefonos'   => data['telefonos']
    );
    $this->db->where('id_empresa',$data['id_empresa']);
    $result = $this->db->update('empresa',$rows);
    if($result){
      echo "Actualizado con exito";
    }else{
      return "error " .$sql;
    }  
  }

  public function get_empresa(){
    $sql = "SELECT * FROM empresa limit 1";
    $result = $this->db->query($sql);
    return $result->row_array();
  }

}