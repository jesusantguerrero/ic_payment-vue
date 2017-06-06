<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Service_model extends CI_MODEL{
  
  public $id_servicio = null;
  public $nombre;
  public $descripcion;
  public $mensualidad;
  public $tipo;


  public function __construct(){
    parent::__construct();
    $this->load->database();
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
      $this->id_servicio = $data['id_servicio'];
    }
    $this->nombre          = $data['nombre'];      
    $this->descripcion     = $data['descripcion'];     
    $this->mensualidad     = $data['mensualidad'];
    $this->tipo            = $data['tipo'];
  }

  public function add($data){
    $this->organize_data($data,"normal");
    $result = $this->db->query("SELECT * FROM servicios WHERE nombre = '". $this->nombre . "'");
    $result = $result->result_array();
    $result = count($result);
    if($result){
      echo MESSAGE_ERROR." Este nombre ya está registrado";
    }else{
      if($this->db->insert('servicios',$this)){
        echo MESSAGE_SUCCESS." Servicio Agregado con exito";
      }else{
       echo "No pudo guardarse el servicio";
      } 
    }  
   
  }

  public function update_service($data){
    $this->organize_data($data,"full");
    $sql = "UPDATE servicios SET nombre = '$this->nombre', descripcion ='$this->descripcion', mensualidad ='$this->mensualidad',";
    $sql .= "tipo ='$this->tipo' WHERE id_servicio = $this->id_servicio";
    if($result = $this->db->query($sql)){
      echo MESSAGE_SUCCESS." Servicio Actualizado Con Exito!";
    }else{
      echo MESSAGE_ERROR." No pudo actualizarse el servicio " . $sql;
    }   
  }

  public function get_all_services(){
    $sql = "SELECT * FROM servicios LIMIT 5";
    $result = $this->db->query($sql);
    $result = make_service_table($result->result_array(),0);
    echo $result;
  }

  public function get_services_shortcuts(){
    $sql = "SELECT * FROM servicios WHERE tipo= 'internet'";
    $result = $this->db->query($sql);
    $result = make_service_shortcuts($result->result_array());
    echo $result;
  }

  public function get_services_dropdown(){
    $sql = "SELECT * FROM servicios WHERE tipo= 'reparacion'";
    $result = $this->db->query($sql);
    $result = make_other_services_dropdown($result->result_array());
    echo $result;
  }

  public function count_services(){
    $result = $this->db->count_all("servicios");
    echo $result;
  }

  public function get_services_paginate($offset,$perpage){
    $sql = "SELECT * FROM servicios LIMIT ".$offset.", ".$perpage;
    $result = $this->db->query($sql);
    $result = make_service_table($result->result_array(),$offset);
    echo $result;
  }

  public function search_clients($word){
    $word = "'%".$word."%'";
    $sql = "SELECT * FROM clientes WHERE id_cliente LIKE $word || cedula LIKE $word || nombres LIKE $word || apellidos LIKE $word";
    $sql .= "|| sector LIKE $word LIMIT 5";
    $result = $this->db->query($sql);
    $result = make_client_table($result->result_array(),0);
    echo $result;

  }
  
  public function get_service($id){
    $sql = "SELECT * FROM servicios WHERE id_servicio=". $id;
    $result = $this->db->query($sql);
    $result =$result->row_array();
    return $result;
  }

  public function delete_service($id){
    $sql = "DELETE FROM servicios WHERE id_servicio= $id";
    if($this->db->query($sql)){
      echo MESSAGE_SUCCESS." Servicio Eliminado";
    }else{
      echo "error";
    }
  }

  //functions
}