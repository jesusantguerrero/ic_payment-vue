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

  public function get_last_id(){
    $sql = "SELECT id_contrato FROM contratos ORDER BY id_contrato DESC LIMIT 1";
    $result = $this->db->query($sql); 
    return $result->row_array()['id_contrato'];
  }

  public function get_all_of_client($id){
    $sql = "SELECT * FROM contratos WHERE id_cliente = $id LIMIT 5";
    $result = $this->db->query($sql);
    $result = make_contract_table($result->result_array(),0);
    echo $result;
  }  

  public function get_active_contracts(){
    $sql = "SELECT COUNT(*) FROM contratos WHERE estado= 'activo'";
    $result = $this->db->query($sql);
    echo $result->row_array()['COUNT(*)'];
  }
   

 

  //functions
}