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

  private $table;
  private $view;

  public function __construct(){
    parent::__construct();
    $this->table = 'ic_users';
  }

  function organize_data($data,$mode){
    $organized_data = [];

    if($mode == "full"){
      $organized_data['user_id'] = $data['user_id'];
      $organized_data['password'] = $data['password'];
    }else{
      $organized_data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
    }
    $organized_data['nickname'] = $data['nickname'];
    $organized_data['name']     = $data['name'];
    $organized_data['lastname'] = $data['lastname'];
    $organized_data['dni']      = $data['dni'];
    $organized_data['type']     = $data['type'];

    return $organized_data;
  }

  public function add_new_user($data){
    $this->db->where('nickname', $data['nickname']);
    $result = $this->db->count_all_results($this->table);
    if($result > 0){
      return 3;
    }
    $organized_data = $this->organize_data($data, "normal");
    return $this->db->insert($this->table, $organized_data);
  }

  public function update_user($data, $id){
    $this->db->where('nickname', $id);
    $this->db->or_where('user_id', $id);
    return $this->db->update($this->table,$data);
  }

  public function update_field($field,$credentials, $data){
    $this->db->where('user_id',$credentials['id']);
    $result = $this->db->get($this->table,1);
    if($result != false){
      $result = $result->row_array();
      if(password_verify($credentials['password'],$result['password'])){
        $this->db->where('user_id', $credentials['id']);
        return $this->db->update($this->table,[$field => $data]);
      }
    }
  }

  public function get_all_users($table = true){
    $result = $this->db->get($this->table);
    if ($result && $table) {
      return make_user_table($result->result_array(),0);
    }
    return $result->result_array();
  }

  public function get_user($id){
    $this->db->where('user_id', $id);
    $this->db->or_where('nickname', $id);
    $result =$this->db->get($this->table, 1);
    if($result){
     return $result->row_array();
    }
  }

  public function get_users_list(){
    $this->db->select('user_id, name, lastname');
    if ($users = $this->db->get($this->table)) {
      return make_users_list($users->result_array());
    }
  }

  public function delete_user($id){
    $this->db->where('user_id',$id);
    if($result = $this->db->delete($this->table)){
      $code = 1;
    }else{
      $this->update_user(['active' => false], $id);
      $code = 2;
    }
    return $code;
  }

  public function update_password($user_id,$current_password,$new_password){
    $this->db->where('user_id',$user_id);
    $result = $this->db->get($this->table,1);

    if($result != false){
      $result = $result->row_array();
      if(password_verify($current_password,$result['password'])){

        $new_password =  password_hash($new_password, PASSWORD_DEFAULT);
        $where = array('user_id' => $user_id);
        $set   = array('password' => $new_password);
        $this->db->update($this->table,$set,$where);
        return true;
      }
      return false;
    }else{
     return false;
    }
  }

}
