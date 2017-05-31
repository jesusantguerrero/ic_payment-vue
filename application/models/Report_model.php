<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Report_model extends CI_MODEL{

  public function __construct(){
    parent::__construct();
    $this->load->database();
    $this->load->helper('reports_helper');
    $this->load->library('table');
  }


  public function get_payments_report($status){
    $sql = "SELECT id_pago,id_contrato,cliente,concepto,servicio ,total, time(complete_date) as hora FROM v_recibos where day(fecha_pago) = day(now())";
    if($result = $this->db->query($sql)):
      $result = $result->result_array();
      make_payment_report($result,"Reporte De Pagos Del Dia",$this);
    else:
      echo $this->db->last_query();
    endif;
  }

  
}