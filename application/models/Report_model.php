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
    $this->load->library('table');
   
  }


  public function get_payments_report($status){
    $sql = "SELECT id_pago,id_contrato,cliente,concepto,servicio ,total, complete_date,time(complete_date) as hora FROM v_recibos where day(fecha_pago) = day(now()) order by complete_date";
    if($result = $this->db->query($sql)):
      $result = $result->result_array();
      make_payment_report($result,"Reporte De Pagos Del Dia",$this);
    else:
      echo $this->db->last_query();
    endif;
  }

   public function get_recibos(){
    $sql = "SELECT id_pago,id_contrato,cliente,concepto,servicio ,total, complete_date,date(complete_date) as fecha,time(complete_date) as hora FROM v_recibos  order by complete_date";
    if($result = $this->db->query($sql)):
      $result = $result->result_array();
      $result = make_recibos_table($result,0);
      echo $result;
    endif;
  }

  public  function get_total_payments($date){
    $sql = "SELECT SUM(total) as total from v_recibos where fecha_pago = $date";
    if($result = $this->db->query($sql)):
      $result = $result->row_array()['total'];
      return $result;
    else:
      echo $this->db->last_query();
    endif;
  }

  public function get_installations($date = '',$is_print = false){
    $result = $this->db->get('v_instalaciones');
    if($result){
      $result = $result->result_array();
      echo make_installation_report($result,"Instalaciones del Dia",$this,$is_print);
    }
  }

  public function get_moras_view($is_print = false){
    $result = $this->db->get('v_morosos');
    if($result){
      $result = $result->result_array();
      echo make_moras_report($result," Con Moras",$this,$is_print);
    }
  }

  # Instalaciones 

  public function count_installations(){
    $result = $this->db->count_all('v_instalaciones');
    if($result){
     return $result;
    }else{
      return 0;
    }
  }

  public function get_installations_per_month(){
    $resultado_por_mes = array();
    
    for ($i=1; $i <= 12 ; $i++) { 
      $sql = "SELECT count(*) from v_instalaciones where year(fecha) = year(now()) and month(fecha)= $i";
      $result = $this->db->query($sql)->row_array()["count(*)"];
      if($result){
        $value = $result; 
      }else{
        $value = "0";
      }
      array_push($resultado_por_mes,$value);
    }
    return $resultado_por_mes;
  }

  public function count_moras_view(){
    $result = $this->db->count_all('v_morosos');
    if($result){
     return $result;
    }else{
      return 0;
    }
  }

  public function get_averias_report($is_print = true){
    $result = $this->db->query(get_last_query());
     if($result){
      $result = $result->result_array();
      echo make_averias_report($result," Reporte De Averias",$this,$is_print);
    }
  }

  
}