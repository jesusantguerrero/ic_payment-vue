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
      echo MESSAGE_ERROR."error". " Error";
    }  
  }
  public function update($id_averia){
    $this->db->where('id_averia',$id_averia);
    $result = $this->db->get('v_averias',1);
    $status = $result->row_array()['estado'];
    switch ($status) {
      case 'por reparar':
        $status = 'reparado';
        $fecha_reparacion = date('Y-m-d');
        break;
      default: 
        $status =  'por reparar';
        $fecha_reparacion = '';
    }
    $this->db->where('id_averia',$id_averia);
    if($this->db->update('ic_averias',array("estado" => $status,"fecha_reparacion" => $fecha_reparacion))){
      echo MESSAGE_SUCCESS." Estado de averia cambiado a ". $status;
    }

  }

  public function get($status = 'por reparar'){
    $sql = "SELECT * FROM v_averias";
    if($status != 'todos'){
       $sql .= " WHERE estado ='$status'";
    }
    $_SESSION['averias'] = $sql;
    $result = $this->db->query($sql);
    if($result and count($result) > 0){
      $result = make_averias_list($result->result_array());
      echo $result;
    }else{
      echo "<h3>No hay Datos Para Esta Busqueda</h3>";
    }
    
  }

  public function count(){
    $result = $this->db->query($_SESSION['averias']);
    if($result){
      $result = count($result->result_array());
      echo $result;
    }else{
      echo 0;
    }
    
  }
}