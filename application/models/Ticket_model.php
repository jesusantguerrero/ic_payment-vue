<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2018 Jesus Guerrero
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Ticket_model extends CI_MODEL{
  # named averias in the database because of version beta is in production
  #$id_averia = null;
  #id_cliente
  #descripcion
  #fecha
  #estado

  public function __construct(){
    parent::__construct();

  }

  public function add($data){
    $rows = [
      'id_averia'   => null,
      'id_cliente'  => $data['id_cliente'],
      'id_contrato' => $data['id_contrato'],
      'descripcion' => $data['descripcion'],
      'fecha'       => null,
      'estado'      => 'por reparar',
    ];
    return $this->db->insert('ic_averias',$rows);
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
    return $this->db->update('ic_averias',array("estado" => $status,"fecha_reparacion" => $fecha_reparacion));
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
    if($result = $this->db->get('v_averias')){
      return $result->result_array();
    }
  }

  public function search($word, $status){
    if ($status != "todo") {
      $this->db->where('estado',$status);
    }
    $this->db->like('cliente',$word);
    $this->db->order_by('fecha','DESC');
    if ($result = $this->db->get('v_averias')) {
      return $result->result_array();
    }
    return false;
  }

  public function get_ticket($id_averia){
    $this->db->select('v_averias.* , v_contratos.codigo',false);
    $this->db->where('id_averia',$id_averia);
    $this->db->join('v_contratos','id_cliente','LEFT');

    if ($averia = $this->db->get('v_averias',1)) {
      return $averia->row_array();
    }
    return false;
  }
}
