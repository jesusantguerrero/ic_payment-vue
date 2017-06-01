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
    $this->load->database();
    $this->load->helper('users_helper');
  }


  public function get_contract_view($status){
    $this->db->where('estado',$status);
    $this->db->order_by('id_contrato');
    $result = $this->db->get('v_contratos'); 
    $result = $result->result_array();
    set_last_query($this->db->last_query());
    echo make_main_contract_table($result,0);
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
    $sql = get_last_query()." LIMIT ".$offset.", ".$perpage;
    $result = $this->db->query($sql);
    if($result){
      $result = make_main_contract_table($result->result_array(),$offset);
      echo $result;
    }else{
      echo $sql;
    }
  }

  public function search_contracts($word){
    $word = "'%".$word."%'";
    $sql = "SELECT * FROM v_contratos WHERE (id_cliente LIKE $word || cliente LIKE $word || id_contrato LIKE $word) AND estado = 'activo'";
    set_last_query($sql);
    $sql .= "LIMIT 5";
    if($result = $this->db->query($sql)){
      $result = make_main_contract_table($result->result_array(),0);
      echo $result;
    }
  }

}