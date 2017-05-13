<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_MODEL{
  
  public $user_id = null;
  public $nickname;
  public $password;
  public $name;
  public $lastname;
  public $dni;
  public $type;


  //constructor
  public function __construct(){
    parent::__construct();
    $this->load->database();
    $this->load->helper('users_helper');
  }

  function organize_data($data){

    $this->nickname = $data['nickname'];
    $this->password = password_hash($data['password'], PASSWORD_DEFAULT);
    $this->name     = $data['name'];
    $this->lastname = $data['lastname'];
    $this->dni      = $data['dni'];
    $this->type     = $data['type'];
  }

  public function add_new_user($data){
    $this->organize_data($data);
    $result = $this->db->query("SELECT * FROM users WHERE nickname = '". $this->nickname . "'");
    $result = $result->result_array();
    $result = count($result);
    if($result){
      return "&#10006; Este nombre de usuario ya está registrado";
    }else{
      if($this->db->insert('users',$this)){
        return "&#10004; Usuario agregado con exito";
      }else{
       return "No pudo guardarse el usuario";
      } 

    }  
  }

    public function update_user($data){
    $this->organize_data($data);
    $sql = "UPDATE users SET name ='".$this->name."', lastname ='".$this->lastname."', password ='".$this->password."',";
    $sql .= " dni ='".$this->dni."', type=".$this->type." WHERE nickname ='".$this->nickname."'";

    if($result = $this->db->query($sql)){
      return "&#10004; Usuario Actualizado Con Exito!";
    }else{
     return "&#10006; No pudo guardarse el usuario " . $sql;
    }   
  }

  public function get_all_users(){
    $sql = "SELECT * FROM users";
    $result = $this->db->query($sql);
    $result = make_table($result->result_array());
    echo $result;
  }
  
  public function get_user($id){
    $sql = "SELECT * FROM users WHERE user_id=". $id;
    if($this->db->query($sql)){
      echo "&#10004; Usuario Eliminado";
    }  
  }

  public function delete_user($id){
    $sql = "DELETE FROM users WHERE user_id=". $id;
    if($this->db->query($sql)){
      echo "&#10004; Usuario Eliminado";
    }  
  }

  

  //functions
}