<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Payment_model extends CI_MODEL{
  
  public $id_pago = null;
  public $id_contrato;
  public $fecha_pago;
  public $concepto;
  public $cuota;
  public $mora;
  public $total;
  public $estado;
  public $fecha_limite;

  public function __construct(){
    parent::__construct();
    $this->load->database();
    $this->load->helper('users_helper');
  }

  /**
  *
  *@param array $data array with the data of the user
  *@param string $mode "normal" for save it in an insert, "full" to storage all the data
  *@return void
  */

  function organize_data($data,$mode){

    if($mode == "full"){
      $this->id_pago = $data['id_pago'];
    }
    $this->id_contrato  = $data['id_contrato'];
    $this->fecha_pago   = $data['fecha_pago'];
    $this->concepto     = $data['concepto'];
    $this->cuota        = $data['cuota'];
    $this->mora         = $data['mora'];
    $this->total        = $data['total'];
    $this->estado       = $data['estado'];
    $this->fecha_limite = $data['fecha_limite'];
  }

  public function add($data){
    $this->organize_data($data,"normal");
      if($this->db->insert('pagos',$this)){
         
      }else{
        echo "No pudo guardarse el pago";
      } 
  }

  public function check_for_update($data){
    $sql = "SELECT estado from pagos where id_pago =".$data['id'];
    $result = $this->db->query($sql);
    $result = $result->row_array()['estado'];
    if($result == "no pagado"){
        return true;
      }else{
        echo "Este pago ya ha sido realizado";
    }
    
  }

  public function get_all_of_contract($id){
    $sql = "SELECT * FROM pagos WHERE id_contrato = $id";
    $result = $this->db->query($sql);
    if($result){
      $result = make_payment_table($result->result_array(),0);
      echo $result;
    }
    
  }  


  public function year_income(){
    $sql = "SELECT sum(total) FROM pagos WHERE estado= 'pagado' and year(fecha_pago)=year(now())";
    $result = $this->db->query($sql);
    $result = $result->row_array()['sum(total)'];
    if($result){
      echo $result;
    }else{
      echo 0;
    }
  }

  public function month_income($mes){
    $sql = "SELECT sum(total) FROM pagos WHERE estado= 'pagado' and year(fecha_pago)=year(now()) and month(fecha_pago)=$mes";
    $result = $this->db->query($sql);
    $result->row_array()['sum(total)'];
    if ($result != null){
      return $result->row_array()['sum(total)'];
    }else{
      return 0;
    }
  }
   

 

  //functions
}