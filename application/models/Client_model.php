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
    $this->load->database();
    $this->load->helper('users_helper');
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
    $this->cols['nombres']         = $data['nombres'];      
    $this->cols['apellidos']       = $data['apellidos'];     
    $this->cols['cedula']          = $data['cedula'];
    $this->cols['provincia']       = $data['provincia'];
    $this->cols['sector']          = $data['sector'];
    $this->cols['calle']           = $data['calle'];
    $this->cols['casa']            = $data['casa'];
    $this->cols['telefono']        = $data['telefono'];
    $this->cols['celular']         = $data['celular'];
    $this->cols['lugar_trabajo']   = $data['lugar_trabajo'];
    $this->cols['tel_trabajo']     = $data['tel_trabajo'];
    $this->cols['ingresos']        = $data['ingresos'];
    $this->cols['fecha_registro']  = $data['fecha_registro'];
    $this->cols['estado']          = $data['estado'];
    $this->cols['observaciones']   = null;
  }

  public function add($data){
    $this->organize_data($data,"normal");
    $result = $this->db->query("SELECT * FROM clientes WHERE cedula = '".$this->cols['cedula']."'");
    $result = $result->result_array();
    $result = count($result);
    if($result > 0){
      echo "&#10006; Esta cedula ya está registrada";
    }else{
      if($this->db->insert('clientes',$this->cols)){
        echo "&#10004; Ciente Agregado con exito";
      }else{
       echo "No pudo guardarse el cliente";
      } 
    }  
  }

  public function update_client($data){
    $sql = "UPDATE clientes SET nombres ='".$data['nombres']."', apellidos ='".$data['apellidos']."', cedula ='".$data['cedula'];
    $sql .="',provincia = '".$data['provincia']."', sector = '".$data['sector']."', calle = '".$data['calle']."' , casa = '".$data['casa']."', telefono ="; 
    $sql .="'".$data['telefono']."', celular = '".$data['celular']."' ";
    $sql .= ", lugar_trabajo ='".$data['lugar_trabajo']."', ingresos=".$data['ingresos']." WHERE id_cliente =".$data['id'];

    if($result = $this->db->query($sql)){
      echo "&#10004; Usuario Actualizado Con Exito!";
    }else{
     echo "&#10006; No pudo guardarse el usuario ";
    }   
  }

  public function is_active($is_active,$data){
    if($is_active){
      $state = "activo";
    }else{
      $state = "no activo";
    }
    $sql = "UPDATE clientes SET estado='$state' WHERE id_cliente =".$data['id_cliente']; 
    $this->db->query($sql);
  }

  public function get_all_clients(){
    $sql = "SELECT * FROM clientes";
    set_last_query($sql);
    $sql .= " LIMIT 5";
    $result = $this->db->query($sql);
    $result = make_client_table($result->result_array(),0);
    echo $result;
  }

  public function count_clients(){
    $result = $this->db->query(get_last_query());
    $result = $result->result_array();
    if($result){
      echo count($result);
    }else{
      echo 0;
    }
  }

  public function get_clients_paginate($offset,$perpage){
    $sql = get_last_query()." LIMIT ".$offset.", ".$perpage;
    $result = $this->db->query($sql);
    if($result){
      $result = make_client_table($result->result_array(),$offset);
      echo $result;
    }else{
      echo $sql;
    }
    
  }

public function search_clients($word){
    $word = "'%".$word."%'";
    $sql = "SELECT * FROM clientes WHERE id_cliente LIKE $word || cedula LIKE $word || nombres LIKE $word || apellidos LIKE $word";
    $sql .= "|| sector LIKE $word || concat(clientes.nombres,' ',clientes.apellidos) LIKE $word";
    set_last_query($sql);
    $sql .= "LIMIT 5";
    if($result = $this->db->query($sql)){
      $result = make_client_table($result->result_array(),0);
      echo $result;
    }
  }
  
  public function get_client($id,$is_echo = false){
    $sql = "SELECT * FROM clientes WHERE id_cliente=". $id;
    $result = $this->db->query($sql);
    $result =$result->row_array();
    if($is_echo){
      $result = client_to_xml_format($result);
      echo $result;
    }else{
      return $result;
    }
  }

  public function delete_client($id){
    $sql = "DELETE FROM clientes WHERE id_cliente= $id";
    if($this->db->query($sql)){
      echo "&#10004; Usuario Eliminado";
    }else{
      echo "error";
    }
  }

  //functions
}