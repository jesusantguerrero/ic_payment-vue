<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings_model extends CI_MODEL{
  
  // public $id = null;
  public $last_check_moras;

  public function __construct(){
    parent::__construct();
    $this->load->database();
  }


  public function update($col_name,$data){
    $sql = "UPDATE settings SET $col_name ='".$data."'";
    if($col_name == "last_check_moras")
      $sql .= ", next_check= DATE_ADD('".$data."', INTERVAL 1 DAY) WHERE id=1";

    if($result = $this->db->query($sql)){
      return true;
    }else{
      return "error " .$sql;
    }  
  }

  public function get_settings(){
    $sql = "SELECT * FROM settings limit 1";
    $result = $this->db->query($sql);
    return $result->row_array();
  }

}