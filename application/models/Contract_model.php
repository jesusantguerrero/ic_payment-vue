<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Contract_model extends CI_MODEL{
  
  public $id_contrato = null;
  public $id_empleado;
  public $id_cliente;
  public $id_servicio;
  public $fecha;
  public $duracion;
  public $observaciones;
  public $monto_total;
  public $monto_pagado;
  public $ultimo_pago;
  public $proximo_pago;
  public $estado;


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
      $this->id_contrato = $data['id_contrato'];
    }
    $this->id_cliente      = $data['id_cliente'];      
    $this->id_empleado     = $data['id_empleado'];     
    $this->id_servicio     = $data['id_servicio'];
    $this->fecha           = $data['fecha'];
    $this->duracion       = $data['duracion'];
    $this->observaciones  = $data['observaciones'] ;
    $this->monto_total    = $data['monto_total'] ;
    $this->monto_pagado   = $data['monto_pagado'] ;
    $this->ultimo_pago    = $data['ultimo_pago'] ;
    $this->proximo_pago   = $data['proximo_pago'] ;
    $this->estado         = $data['estado']; 
  }

  public function add($data){
    $this->organize_data($data,"normal");
      if($this->db->insert('contratos',$this)){
         echo "&#10004; Nuevo contrato agregado con exito";
      }else{
        echo "No pudo guardarse el contrato";
      } 
  }

  public function get_last_id(){
    $sql = "SELECT id_contrato FROM contratos ORDER BY id_contrato DESC LIMIT 1";
    $result = $this->db->query($sql); 
    return $result->row_array()['id_contrato'];
  }  
   

 

  //functions
}