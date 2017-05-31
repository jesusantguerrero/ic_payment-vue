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
    $result = $this->db->query("SELECT * FROM users WHERE nickname = '". $this->nickname . "'");
    $result = $result->result_array();
    $result = count($result);
    if($result){
      echo MESSAGE_ERROR." Este nombre de usuario ya está registrado";
    }else{
      if($this->db->insert('users',$this)){
        echo MESSAGE_SUCCESS." Usuario agregado con exito";
      }else{
       echo "No pudo guardarse el usuario";
      } 

    }  
  }

  public function update_user($data){
    $this->organize_data($data,"normal");
    $sql = "UPDATE users SET name ='".$this->name."', lastname ='".$this->lastname."', password ='".$this->password."',";
    $sql .= " dni ='".$this->dni."', type=".$this->type." WHERE nickname ='".$this->nickname."'";

    if($result = $this->db->query($sql)){
      echo MESSAGE_SUCCESS." Usuario Actualizado Con Exito!";
    }else{
     echo MESSAGE_ERROR." No pudo guardarse el usuario " . $sql;
    }   
  }

  public function get_all_users(){
    $sql = "SELECT * FROM users LIMIT 5";
    $result = $this->db->query($sql);
    $result = make_table($result->result_array(),0);
    echo $result;
  }

  public function count_users(){
    $result = $this->db->count_all("users");
    echo $result;
  }

  public function get_users_paginate($offset,$perpage){
    $sql = "SELECT * FROM users LIMIT ".$offset.", ".$perpage;
    $result = $this->db->query($sql);
    $result = make_table($result->result_array(),$offset);
    echo "hola";
  }
  
  public function get_user($id){
    $sql = "SELECT * FROM users WHERE user_id=". $id;
    if($this->db->query($sql)){
      echo MESSAGE_SUCCESS." Usuario Eliminado";
    }  
  }

  public function delete_user($id){
    $sql = "DELETE FROM users WHERE user_id=". $id;
    if($this->db->query($sql)){
      echo MESSAGE_SUCCESS." Usuario Eliminado";
    }  
  }

  public function login($nickname,$password){
    $respuesta;
    $sql = "SELECT * FROM users where nickname = '$nickname' limit 1";
    $result = $this->db->query($sql);
    $result =$result->row_array();
    if($result != false){
     if(password_verify($password,$result['password'])){
        $_SESSION['user_data'] = $result;
        $_SESSION['lastquery'] = "Select * from clients";
        return true;
      }
        return false;
    }else{
     return false;
    }
  }
  //functions
}