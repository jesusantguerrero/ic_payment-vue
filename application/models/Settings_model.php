<?php
/**
* Payment Plus
*@author Jesus Guerrero
*@copyright Copyright (c) 2018 Jesus Guerrero
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings_model extends CI_MODEL{

  private $table;
  public $last_check_moras;

  public function __construct(){
    parent::__construct();
    $this->table = 'ic_settings';

  }

  public function update($col_name, $data){
    $sql = "UPDATE ic_settings SET $col_name ='".$data."'";
    if($col_name == "last_check_moras")
      $sql .= ", next_check= DATE_ADD('".$data."', INTERVAL 1 DAY) WHERE id=1";

    if($result = $this->db->query($sql)){
      return true;
    }else{
      return "error " .$sql;
    }
  }

  public function get_settings(){
    if ($result = $this->db->get($this->table, 1)) {
      return $result->row_array();

    }
  }

  public function update_settings($data){
    $this->db->where('id',1);
    return $this->db->update($this->table, $data);
  }

}
