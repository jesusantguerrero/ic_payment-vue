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
  private $table;
  public function __construct() {
    parent::__construct();
  }

  public function add($event) {
    return $this->db->insert('ic_eventos', $event);
  }

  public function get($event_id = null, $first_date = '2001-01-01', $second_date = null) {
    if ($first_date && $second_date) {
      $this->db->where("date(fecha) > $first_date", null, false);
    }

    if ($second_date) {
      $this->db->where("date(fecha) < $second_date", null, false);
    }

    if ($result = $this->db->get('ic_eventos')) {
      return $result->result_array();
    }
  }

  public function free_space($months) {
    $this->db->where("period_diff(DATE_FORMAT(fecha, %Y%m),DATE_FORMAT(NOW(), %Y%m) > $months )", null, false);
    return $this->db->delete('ic_eventos');
  }

}
