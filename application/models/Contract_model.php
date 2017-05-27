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
  public $monto_total;
  public $monto_pagado;
  public $ultimo_pago;
  public $proximo_pago;
  public $estado;
  public $nombre_equipo;
  public $mac_equipo;
  public $router;
  public $mac_router;


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
    $this->id_cliente     = $data['id_cliente'];      
    $this->id_empleado    = $data['id_empleado'];     
    $this->id_servicio    = $data['id_servicio'];
    $this->fecha          = $data['fecha'];
    $this->duracion       = $data['duracion'];
    $this->monto_total    = $data['monto_total'] ;
    $this->monto_pagado   = $data['monto_pagado'] ;
    $this->ultimo_pago    = $data['ultimo_pago'] ;
    $this->proximo_pago   = $data['proximo_pago'] ;
    $this->estado         = $data['estado']; 
    $this->nombre_equipo  = $data['nombre_equipo'];
    $this->mac_equipo     = $data['mac_equipo'];
    $this->router         = $data['router'];
    $this->mac_router     = $data['mac_router'];

  }

  public function add($data){
    $this->organize_data($data,"normal");
      if($this->db->insert('contratos',$this)){
         echo "&#10004; Nuevo contrato agregado con exito";
         return true;
      }else{
        
        echo "No pudo guardarse el contrato ";
        echo $this->db->last_query();
        return false;
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

  public function get_contracts_dropdown($id_cliente){
    $sql = "SELECT * FROM contratos WHERE id_cliente = $id_cliente and estado='activo'";
    $result = $this->db->query($sql);
    $result = make_contract_dropdown($result->result_array(),0);
    echo $result;
  }  

  public function get_active_contracts(){
    $sql = "SELECT COUNT(*) FROM contratos WHERE estado= 'activo'";
    $result = $this->db->query($sql);
    echo $result->row_array()['COUNT(*)'];
  }

  public function get_active_clients(){
    $sql = "SELECT COUNT(*) FROM v_contratos WHERE estado= 'activo' GROUP BY cliente";
    $result = $this->db->query($sql);
    $result = $result->result_array();
    if($result){
      echo count($result);
    }else{
      echo 0;
    }
  }

  public function get_contract_view($id){
    $sql = "SELECT * FROM v_contratos where id_contrato = $id";
    $result = $this->db->query($sql); 
    return $result->row_array();
  }

  public function refresh_contract($data_pago,$data_contrato,$current_contract){ 
    $sql1 = " UPDATE pagos SET estado='".$data_pago['estado']."', fecha_pago='".$data_pago['fecha_pago']."', complete_date=now() WHERE id_pago=".$data_pago['id'];
    
    $sql2 = " UPDATE contratos SET monto_pagado='".$data_contrato['monto_pagado']."', ultimo_pago='".$data_contrato['ultimo_pago']."', proximo_pago='".$data_contrato['proximo_pago']."'";
    $sql2 .=",estado = '".$data_contrato['estado']."' WHERE id_contrato=".$data_contrato['id_contrato'];

    $sql3 = "SELECT * FROM contratos where estado = 'activo' and id_cliente = ".$current_contract['id_cliente'];
    $sql4 = " UPDATE clientes SET estado = 'no activo' WHERE id_cliente = ".$current_contract['id_cliente'];


    $this->db->trans_start();
    $this->db->query($sql1);
    $this->db->query($sql2);
    $this->db->trans_complete();

    if($this->db->trans_status() === false){
      echo "No pudo guardarse el pago $sql ";
    } else{
      echo "Pago Registrado";
      $has_contracts = $this->db->query($sql3);
      $has_contracts = $has_contracts->result_array();
      $has_contracts = count($has_contracts);
      if($has_contracts == 0){
        $this->db->query($sql4);
      }
    }
  }
   
  //functions
}