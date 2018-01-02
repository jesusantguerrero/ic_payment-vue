<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Client_model extends CI_MODEL{


  private $table;
  private $view;
  public $cols;
  public $lastquery;

  public function __construct(){
    parent::__construct();
    $this->load->helper('lib_helper');
    $this->table = 'ic_clientes';
  }

  /**
  *
  *@param array $data array with the data of the user
  *@param string $mode "normal" for save it in an insert, "full" to storage all the data
  *@return void
  */

  private function organize_data($data,$for_insert = false){
    if ($for_insert) {
      $this->cols['id_cliente']       = null;
      $this->cols['estado']           = $data['estado'];
      $this->cols['fecha_registro']   = $data['fecha_registro'];
    }
    $this->cols['nombres']            = strtoupper(trim($data['nombres']));
    $this->cols['apellidos']          = strtoupper(trim($data['apellidos']));
    $this->cols['cedula']             = $data['cedula'];
    $this->cols['provincia']          = $data['provincia'];
    $this->cols['sector']             = $data['sector'];
    $this->cols['calle']              = $data['calle'];
    $this->cols['casa']               = $data['casa'];
    $this->cols['telefono']           = $data['telefono'];
    $this->cols['celular']            = $data['celular'];
    $this->cols['lugar_trabajo']      = $data['lugar_trabajo'];
    $this->cols['tel_trabajo']        = $data['tel_trabajo'];
    $this->cols['ingresos']           = $data['ingresos'] ? $data['ingresos'] : 0 ;
    $this->cols['observaciones']      = '';
    $this->cols['detalles_direccion'] = $data['detalles_direccion'];

  }

  public function add($data){
    $this->organize_data($data, true);
    return $this->db->insert($this->table, $this->cols);
  }

  public function update_client($data, $row = false, $id = false){
    if ($id && $row) {
      $this->db->where('id_cliente', $id);
      return $this->db->update($this->table, [$row => $data]);
    } else {
      $this->organize_data($data);
      $this->db->where('id_cliente',$data['id_cliente']);
      return $this->db->update($this->table,$this->cols);
    }
  }

  public function get_column($columnName,$id_cliente){
    $this->db->select($columnName);
    $this->db->where('id_cliente',$id_cliente);;
    if($result = $this->db->get($this->table)){
      return $result->row_array();
    }else{
      return " Error";
    }

  }

  public function is_active($is_active,$data){
    if($is_active){
      $state = "activo";
    }else{
      $state = "no activo";
    }
    $sql = "UPDATE ic_clientes SET estado='$state' WHERE id_cliente =".$data['id_cliente'];
    $this->db->query($sql);
  }

  public function get_all_clients(){
    $this->db->order_by('apellidos');
    if ($result = $this->db->get($this->table)) {
      return make_client_table($result->result_array(),0);
    }
  }

  public function count_all(){
    $this->db->select('count(id_cliente) as count, estado');
    $this->db->group_by('estado');
    if ($result = $this->db->get($this->table)) {
      return $result->result_array();
    }
  }

  public function search_clients($word,$is_status = false){
    if (!$is_status) {
      $fields = array(
        'id_cliente' => $word,
        'cedula'     => $word,
        'nombres'    => $word,
        'apellidos'  => $word,
        'sector'     => $word,
        "concat(ic_clientes.nombres,' ',ic_clientes.apellidos)" => $word
       );
      $this->db->or_like($fields);
    }

    $this->db->or_where('estado',$word);
    if ($result = $this->db->get($this->table)) {
      return make_client_table($result->result_array(), 0);
    }
    return false;
  }

  public function search_clients_for_message($word,$id_field = 'celular'){
    $fields = array(
     'id_cliente' => $word,
     'cedula'     => $word,
     'nombres'    => $word,
     'apellidos'  => $word,
     "concat(ic_clientes.nombres,' ',ic_clientes.apellidos)" => $word
    );

    $this->db->select("concat(nombres,' ',apellidos) as text, $id_field as id");
    $this->db->or_like($fields);
    if($result = $this->db->get($this->table)){
      return $result->result_array();
    }
  }

  public function get_client($id, $json = false){
    $this->db->where('cedula',$id)->or_where('id_cliente',$id);
    if($result = $this->db->get($this->table)){
      return ($json) ? $result->row() : $result->row_array();
    }
  }

  public function delete_client($id){
    $this->db->where('id_cliente',$id);
    return $this->db->delete($this->table);
  }

  public function has_dni($dni){
    $this->db->where('cedula',$dni);
    return  $this->db->count_all_results($this->table);
  }
}
