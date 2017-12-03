<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Company_model extends CI_MODEL{


  public function __construct(){
    parent::__construct();

  }

  public function update($data){
    $this->db->where('id_empresa',1);
    return $this->db->update('ic_empresa',$data);
  }

  public function get_empresa(){
    $result = $this->db->get('ic_empresa',1);
    return $result->row_array();
  }

}
