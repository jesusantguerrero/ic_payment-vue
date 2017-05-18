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
  
  public $id_cliente = null;
  public $nombres;
  public $apellidos;
  public $cedula;
  public $provincia;
  public $sector;
  public $calle;
  public $casa;
  public $telefono;
  public $celular;
  public $lugar_trabajo;
  public $tel_trabajo;
  public $ingresos;
  public $fecha_registro;
  public $estado;

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
      $this->id_cliente = $data['id_cliente'];
    }
    $this->nombres         = $data['nombres'];      
    $this->apellidos       = $data['apellidos'];     
    $this->cedula          = $data['cedula'];
    $this->provincia       = $data['provincia'];
    $this->sector          = $data['sector'];
    $this->calle           = $data['calle'];
    $this->casa            = $data['casa'];
    $this->telefono        = $data['telefono'];
    $this->celular         = $data['celular'];
    $this->lugar_trabajo   = $data['lugar_trabajo'];
    $this->tel_trabajo     = $data['tel_trabajo'];
    $this->ingresos        = $data['ingresos'];
    $this->fecha_registro  = $data['fecha_registro'];
    $this->estado          = $data['estado'];

  }

  public function add($data){
    $this->organize_data($data,"normal");
    $result = $this->db->query("SELECT * FROM clientes WHERE cedula = '". $this->cedula . "'");
    $result = $result->result_array();
    $result = count($result);
    if($result){
      echo "&#10006; Este cedula ya está registrada";
    }else{
      if($this->db->insert('clientes',$this)){
        echo "&#10004; Ciente Agregado con exito";
      }else{
       echo "No pudo guardarse el cliente";
      } 
    }  
  }

  public function update_user($data){
    $this->organize_data($data,"normal");
    $sql = "UPDATE users SET name ='".$this->name."', lastname ='".$this->lastname."', password ='".$this->password."',";
    $sql .= " dni ='".$this->dni."', type=".$this->type." WHERE nickname ='".$this->nickname."'";

    if($result = $this->db->query($sql)){
      return "&#10004; Usuario Actualizado Con Exito!";
    }else{
     return "&#10006; No pudo guardarse el usuario " . $sql;
    }   
  }

  public function get_all_clients(){
    $sql = "SELECT * FROM clientes LIMIT 5";
    $result = $this->db->query($sql);
    $result = make_client_table($result->result_array(),0);
    echo $result;
  }

  public function count_clients(){
    $result = $this->db->count_all("clientes");
    echo $result;
  }

  public function get_clients_paginate($offset,$perpage){
    $sql = "SELECT * FROM clientes LIMIT ".$offset.", ".$perpage;
    $result = $this->db->query($sql);
    $result = make_client_table($result->result_array(),$offset);
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
  
  public function get_client($id){
    $sql = "SELECT * FROM clientes WHERE id_cliente=". $id;
    $result = $this->db->query($sql);
    $result =$result->row_array();
    return $result;
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