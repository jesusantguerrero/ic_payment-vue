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

  public function update_user($data, $id, $echo = true){
    $this->db->where('nickname',$id);
    $this->db->or_where('user_id',$id);
    return $this->db->update('ic_users',$data);
  }

  public function update_field($field,$credentials, $data){
    $this->db->where('user_id',$credentials['id']);
    $result = $this->db->get('ic_users',1);
    if($result != false){
      $result = $result->row_array();
      if(password_verify($credentials['password'],$result['password'])){
        $this->db->where('user_id', $credentials['id']);
        return $this->db->update('ic_users',[$field => $data]);
      }
    }
  }

  public function get_all_users(){
    $sql = "SELECT * FROM ic_users LIMIT 5";
    $result = $this->db->query($sql);
    $result = make_table($result->result_array(),0);
    echo $result;
  }

  public function get_user($id){
    $this->db->where('user_id',$id);
    $result =$this->db->get('ic_users',1);
    if($result){
     return $result->row_array();
    }
  }

  public function get_users_list(){
    $sql    = "SELECT user_id, name,lastname FROM ic_users";
    $result = $this->db->query($sql);
    $result = make_users_list($result->result_array());
    echo $result;
  }

  public function delete_user($id){
    $this->db->where('user_id',$id);
    if($result = $this->db->delete('ic_users')){
      echo MESSAGE_SUCCESS." Usuario Eliminado";
    }else{
      $this->update_user(['active' => false], $id);
    }
  }

  public function login($nickname,$password){
    $this->db->where('nickname',$nickname);
    $result = $this->db->get('ic_users',1);
    if ($result != false){
      $result = $result->row_array();
      if(password_verify($password,$result['password']) && $result['active']){
        $_SESSION['user_data'] = $result;
        $_SESSION['user_data']['password'] = '';
        $this->update_user(['last_login' => date('Y-m-d H:i:s')],$result['user_id'],false);
        return true;
      }
      return false;
    }else{
     return false;
    }
  }

  public function confirm_password($user_id,$password){
    $this->db->where('user_id',$user_id);
    $result = $this->db->get('ic_users',1);
    if($result != false){
      $result = $result->row_array();
      if(password_verify($password,$result['password'])){
        return true;
      }
      return false;
    }else{
     return false;
    }
  }

  public function update_password($user_id,$current_password,$new_password){
    $this->db->where('user_id',$user_id);
    $result = $this->db->get('ic_users',1);

    if($result != false){
      $result = $result->row_array();
      if(password_verify($current_password,$result['password'])){

        $new_password =  password_hash($new_password, PASSWORD_DEFAULT);
        $where = array('user_id' => $user_id);
        $set   = array('password' => $new_password);
        $this->db->update('ic_users',$set,$where);
        return true;
      }
      return false;
    }else{
     return false;
    }
  }
  //functions
}
