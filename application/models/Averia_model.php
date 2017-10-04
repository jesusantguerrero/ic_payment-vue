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

  public function update_all($id_averia,$data) {
    $this->db->where('id_averia',$id_averia);
    return (bool) $this->db->update('ic_averias',$data);
  }
  public function get($status = 'por reparar'){
    if($status != 'todos'){
      $this->db->where('estado',$status);
    }
    $this->db->order_by('fecha','DESC');
    $result = $this->db->get('v_averias');
    
    if($result and count($result) > 0){
      $result = $result->result_array();
      $_SESSION['averias'] = $result;
      echo make_averias_list($result);
    }else{
      echo "<h3>No hay Datos Para Esta Busqueda</h3>";
    }
    
  }

  public function count(){
    $result = $_SESSION['averias'];
    if($result){
      $result = count($result);
      echo $result;
    }else{
      echo 0;
    }
    
  }

  public function search($word,$status){
    if ($status != "todo") {
      $this->db->where('estado',$status);
    }
    $this->db->like('cliente',$word);
    if ($result = $this->db->get('v_averias')) {
      return make_averias_list($result->result_array());
    }
    return false;
  }

  public function get_averia($id_averia){
    $this->db->select('v_averias.* , v_contratos.codigo',false);
    $this->db->where('id_averia',$id_averia);
    $this->db->join('v_contratos','id_cliente','LEFT');
    
    if ($averia = $this->db->get('v_averias',1)) {
      return $averia->row_array();
    }
    return false;
  }
}