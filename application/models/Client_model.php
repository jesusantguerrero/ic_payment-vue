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

  
  public $cols;
  public $lastquery;

  public function __construct(){
    parent::__construct();
     
    $this->load->helper('lib_helper');
  }

  /**
  *
  *@param array $data array with the data of the user
  *@param string $mode "normal" for save it in an insert, "full" to storage all the data
  *@return void
  */

  function organize_data($data,$mode){

    if($mode == "full"){
      $this->cols['id_cliente'] = $data['id_cliente'];
    }else{
      $this->cols['id_cliente'] = null;
    }
    $this->cols['nombres']         = strtoupper(trim($data['nombres']));  
    $this->cols['apellidos']       = strtoupper(trim($data['apellidos']));     
    $this->cols['cedula']          = $data['cedula'];
    $this->cols['provincia']       = $data['provincia'];
    $this->cols['sector']          = $data['sector'];
    $this->cols['calle']           = $data['calle'];
    $this->cols['casa']            = $data['casa'];
    $this->cols['telefono']        = $data['telefono'];
    $this->cols['celular']         = $data['celular'];
    $this->cols['lugar_trabajo']   = $data['lugar_trabajo'];
    $this->cols['tel_trabajo']     = $data['tel_trabajo'];
    $this->cols['ingresos']        = $data['ingresos'] ? $data['ingresos'] : 0 ;
    $this->cols['fecha_registro']  = $data['fecha_registro'];
    $this->cols['estado']          = $data['estado'];
    $this->cols['observaciones']   = '';
    $this->cols['abonos']          = 0;
    $this->cols['contrato_abono']  = 0;
  }

  public function add($data){
    $this->organize_data($data,"normal");
    // $result = $this->db->query("SELECT * FROM ic_clientes WHERE cedula = '".$this->cols['cedula']."'");
    // $result = $result->result_array();
    $result = $this->has_dni($this->cols['cedula']);
    if($result > 0){
      echo MESSAGE_ERROR." Esta cedula ya está registrada";
    }else{
      if($this->db->insert('ic_clientes',$this->cols)){
        echo MESSAGE_SUCCESS." Ciente Agregado con exito";
      }else{
       echo MESSAGE_ERROR."No pudo guardarse el cliente ". " Error";
      } 
    }  
  }

  public function update_client($data){
    
    $data_for_update = array(
      'nombres'      => strtoupper(trim($data['nombres'])),
      'apellidos'    => strtoupper(trim($data['apellidos'])),
      'cedula'       => $data['cedula'],
      'provincia'    => $data['provincia'],
      'sector'       => $data['sector'],
      'calle'        => $data['calle'],
      'casa'         => $data['casa'],
      'telefono'     => $data['telefono'],
      'celular'      => $data['celular'],
      'lugar_trabajo'=> $data['lugar_trabajo'],
      'ingresos'     => $data['ingresos'],
    );

    $this->db->where('id_cliente',$data['id']);

    if($result = $this->db->update('ic_clientes',$data_for_update)){
      echo MESSAGE_SUCCESS." Cliente Actualizado Con Exito!";
    }else{
     echo MESSAGE_ERROR."No pudo guardarse el cliente ".$sql;
    }   
  }

  public function update($data,$echo = true){
      $this->db->where('id_cliente',$data['id']);
      unset($data['id']);
      $result = $this->db->update('ic_clientes',$data);
      if(!$result){
        $message =  MESSAGE_ERROR."No pudo guardarse el cliente ";
        $return = true;
      }else{
        $message = MESSAGE_SUCCESS." Estado actualizado";
        $return = false;
      }
      if($echo){
        echo $message;
      }
      return $return;
  }
 
  public function update_observations($data){

    $rows = array('observaciones' => $data['observaciones']);
    $this->db->where('id_cliente',$data['id_cliente']);

    if($this->db->update('ic_clientes',$rows)){
     echo MESSAGE_INFO." Observación Agregada";
    }else{
     echo MESSAGE_ERROR." No pudo guardarse la observacion";
    }   
  }

  public function get_column($columnName,$id_cliente){
    $this->db->select($columnName);
    $this->db->where('id_cliente',$id_cliente);;
    if($result = $this->db->get('ic_clientes')){
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
    $result = $this->db->get('ic_clientes');
    $result = make_client_table($result->result_array(),0);
    echo $result;
  }

  public function count_all_clients(){
    $result = $this->db->count_all('ic_clientes');
    if($result){
      echo $result;
    }else{
      echo 0;
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
    if ($result = $this->db->get('ic_clientes')) {
      return $result->result_array();
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
    if($result = $this->db->get('ic_clientes')){
      return $result->result_array();
    }
  }
  
  public function get_client($id){
    $sql = "SELECT * FROM ic_clientes WHERE id_cliente = $id || cedula ='$id'";
    if($result = $this->db->query($sql)){
      $result = $result->row_array();
      return $result;
    }
  }

  public function get_clientjson($id){
    $this->db->where('cedula',$id)->or_where('id_cliente',$id);
    if($result = $this->db->get('ic_clientes')){
      $result = $result->row();
      return $result; 
    }
  }

  public function delete_client($id){
    $sql = "DELETE FROM ic_clientes WHERE id_cliente= $id";
    if($this->db->query($sql)){
      echo MESSAGE_SUCCESS." Cliente Eliminado";
    }else{
      echo MESSAGE_ERROR." No se ha podido eliminar el cliente";
    }
  }

  private function has_dni($dni){
    $this->db->where('cedula',$dni);
    return  $this->db->count_all_results('ic_clientes');
  }

  //functions
}