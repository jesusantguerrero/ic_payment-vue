<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Event_model extends CI_MODEL{

 public function __construct() {
   parent::__construct();
 }

 public function add() {

 }

 public function get($event_id = null, $first_date = '2001-01-01', $second_date = null) {
  if ($result = $this->db->get('ic_eventos')) {
    return $result->result_array();
  }
 }
}
