<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2018 Jesus Guerrero
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Company_model extends CI_MODEL{

  private $table;

  public function __construct(){
    parent::__construct();
    $this->table = 'ic_empresa';

  }

  public function update($data){
    $this->db->where('id_empresa',1);
    return $this->db->update($this->table, $data);
  }

  public function get_company(){
    $result = $this->db->get($this->table, 1);
    return $result->row_array();
  }

}
