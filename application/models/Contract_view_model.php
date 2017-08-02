<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Contract_view_model extends CI_MODEL{

  public function __construct(){
    parent::__construct();
     
    $this->load->helper('lib_helper');
  }

  public function get_contract_view($status){
    $this->db->where('estado',$status);
    if($result = $this->db->get('v_contratos')){
        echo make_main_contract_table($result->result_array(),0);
    }
  }

  public function last_page(){
    $result = $this->db->query(get_last_page());
    if($result){
      $result = make_main_contract_table($result->result_array(),0);
      echo $result;
    }
  }

  public function get_contract_view_of_service($service_id){
    $this->db->where('id_servicio',$service_id);
    $this->db->where('estado','activo');
    if($result = $this->db->get('v_contratos')){
      return $result->result_array();
    }else{
      return false;
    }
  }

  public function count_contracts(){
    $result = $this->db->query(get_last_query());
    $result = $result->result_array();
    if($result){
      echo count($result);
    }else{
      echo 0;
    }
  }

  public function get_contracts_paginate($offset,$perpage){
    $sql = get_last_query()." ORDER BY id_contrato LIMIT ".$offset.", ".$perpage;
    $result = $this->db->query($sql);
    set_last_page($sql);
    if($result){
      $result = make_main_contract_table($result->result_array(),$offset);
      echo $result;
    }else{
      
    }
  }

  public function search_contracts($word){
    $word = "'%".$this->db->escape_like_str($word)."%'";
    $sql = "SELECT * FROM v_contratos WHERE (codigo LIKE $word || cliente LIKE $word || id_contrato LIKE $word) AND estado = 'activo'";
    set_last_query($sql);
    $sql .= "LIMIT 5";
    set_last_page($sql);
    if($result = $this->db->query($sql)){
      $result = make_main_contract_table($result->result_array(),0);
      echo $result;
    }
  }

  public function get_statics_of_services($field = 'count(*)'){
    $sql = "select servicio,$field from v_contratos where estado = 'activo' group by servicio";
    $valores = array();
    $servicios = array();
    $result = $this->db->query($sql)->result_array();
    foreach ($result as $row) {
      array_push($valores,$row[$field]);
      array_push($servicios,$row['servicio']);
    }
    return array('valores' => $valores, 'nombres' => $servicios);
  }

  public function get_technical_report(){
    $sql = "SELECT id_contrato, cliente, codigo,ip FROM v_contratos WHERE estado='activo' ORDER BY id_contrato";
    $result = $this->db->query($sql);
    return array(
      'header'    => array('Contrato','Nombre de Cliente','Codigo IP','Dirección IP'),
      'dimensions'=> array(50,100,50,100),
      'data'     => $result->result_array(),
      'start'    =>'B5',
      'end'     => 'E5'
    );
  }

}