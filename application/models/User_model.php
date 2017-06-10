<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_MODEL{
  
  public $user_id = null;
  public $nickname;
  public $password;
  public $name;
  public $lastname;
  public $dni;
  public $type;

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
      $this->user_id = $data['user_id'];
      $this->password = $data['password'];
    }else{
      $this->password = password_hash($data['password'], PASSWORD_DEFAULT);
    }
    $this->nickname = $data['nickname'];
    $this->name     = $data['name'];
    $this->lastname = $data['lastname'];
    $this->dni      = $data['dni'];
    $this->type     = $data['type'];
  }

  public function add_new_user($data){
    $this->organize_data($data,"normal");
    $result = $this->db->query("SELECT * FROM ic_users WHERE nickname = '". $this->nickname . "'");
    $result = $result->result_array();
    $result = count($result);
    if($result){
      echo MESSAGE_ERROR." Este nombre de usuario ya está registrado";
    }else{
      if($this->db->insert('ic_users',$this)){
        echo MESSAGE_SUCCESS." Usuario agregado con exito";
      }else{
       echo "No pudo guardarse el usuario";
      } 

    }  
  }

  public function update_user($data){
    $data_for_update = array(
      'name' => $data['name'],
      'lastname' => $data['lastname'],
      'dni' => $data['dni'],
      'type' => $data['type']
    );
    $this->db->where('nickname',$data['nickname']);
    $result = $this->db->update('ic_users',$data_for_update);
    if($result){
      echo MESSAGE_SUCCESS." Usuario Actualizado Con Exito!";
    }else{
     echo MESSAGE_ERROR." No pudo guardarse el usuario " . $sql;
    }   
  }

  public function get_all_users(){
    $sql = "SELECT * FROM ic_users LIMIT 5";
    $result = $this->db->query($sql);
    $result = make_table($result->result_array(),0);
    echo $result;
  }

  public function count_users(){
    $result = $this->db->count_all("ic_users");
    echo $result;
  }

  public function get_users_paginate($offset,$perpage){
    $sql = "SELECT * FROM ic_users LIMIT ".$offset.", ".$perpage;
    $result = $this->db->query($sql);
    $result = make_table($result->result_array(),$offset);
    echo $result;
  }
  
  public function get_user($id){
    $sql = "SELECT * FROM ic_users WHERE user_id=". $id;
    $this->db->where('user_id',$id);
    $result =$this->db->get('users',1);
    if($result){
     return $result->row_array();
    }  
  }

  public function delete_user($id){
    $this->db->where('user_id',$id);
    $result = $this->db->delete('ic_users');
    if($result){
      echo MESSAGE_SUCCESS." Usuario Eliminado";
    }else{
      echo MESSAGE_ERROR." El Usuario No Pudo Ser Eliminado";
    }
  }

  public function login($nickname,$password){
    $respuesta;
    $sql = "SELECT * FROM ic_users where nickname = '$nickname' limit 1";
    $this->db->where('nickname',$nickname);
    $result = $this->db->get('ic_users',1);

    if($result != false){
      $result = $result->row_array();
      if(password_verify($password,$result['password'])){
        $_SESSION['user_data'] = $result;
        $_SESSION['lastquery'] = "Select * from ic_clientes";
        return true;
      }
      return false;
    }else{
     return false;
    }
  }

  public function get_users_list(){
    $sql    = "SELECT user_id, name,lastname FROM ic_users";
    $result = $this->db->query($sql);
    $result = make_users_list($result->result_array());
    echo $result;
  }
  //functions
}