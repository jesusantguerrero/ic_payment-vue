<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Cancelations_model extends CI_MODEL{

  public function __construct(){
    parent::__construct();
    $this->load->helper('lib_helper');
  }

  public function get_cancelations($first_date='2000-01-01',$second_date = null){
    $second_date = ($second_date) ? $second_date : date('Y-m-d');
    $this->db->select('v_contratos.* , ic_cancelaciones.*, ic_clientes.celular',false);
    $this->db->join('v_contratos','id_contrato','LEFT');
    $this->db->join('ic_clientes','id_cliente','INNER');
    $this->db->where("ultimo_pago between '$first_date' and '$second_date'",'',false);
    if($result = $this->db->get('ic_cancelaciones')){
       $result = $result->result_array();
       $_SESSION['cancelations_last_call'] = $result;
       return make_cancelations_table($result,0);
      }
  }

  public function print_report(){
    if($_SESSION['cancelations_last_call']){
      $header = ['No.','Contrato','Cliente','Direccion', 'celular', 'IP'];
      $fields = ['id_contrato','cliente', 'direccion', 'celular',['data' => 'Direccion IP', 'width' => '200px']];
      $result = $_SESSION['cancelations_last_call'];
      echo make_general_report($result,"Reporte de Retiros",$this,$fields, $header);
    }
  }
}