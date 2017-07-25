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
  public $codigo;
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
     
    $this->load->model('payment_model');
    $this->load->helper('lib_helper');
    $this->load->model('section_model');
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
    $this->codigo         = $data['codigo'];
    $this->fecha          = $data['fecha'];
    $this->duracion       = $data['duracion'];
    $this->monto_total    = $data['monto_total'] ;
    $this->monto_pagado   = $data['monto_pagado'] ;
    $this->ultimo_pago    = $data['ultimo_pago'] ;
    $this->proximo_pago   = $data['proximo_pago'] ;
    $this->estado         = $data['estado']; 
    $this->nombre_equipo  = $data['nombre_equipo'];
    $this->modelo         = $data['modelo'];
    $this->mac_equipo     = $data['mac_equipo'];
    $this->router         = $data['router'];
    $this->mac_router     = $data['mac_router'];
    $this->ip             = $data['ip'];

  }

  public function add($data){
    $this->organize_data($data,"normal");
      if($this->db->insert('ic_contratos',$this)){
         echo MESSAGE_SUCCESS." Nuevo contrato agregado con exito";
         return true;
      }else{
        
        echo MESSAGE_ERROR."No pudo guardarse el contrato ";
        echo " Error";
        return false;
      } 
  }

  public function update($data_for_update,$contract_id,$echo = false){
   
    $this->db->where('id_contrato',$contract_id);
    if($this->db->update('ic_contratos',$data_for_update)):
      if($echo) echo MESSAGE_SUCCESS." Contrato Actualizado";
      return true;
    else:
      if($echo) echo MESSAGE_ERROR."El Contrato No Pudo Ser Actualizado";
      return false;
    endif;
    
  } 

  public function update_amount($contract_id){
    $sql = "SELECT SUM(cuota) FROM ic_pagos WHERE id_contrato = $contract_id";
    $result = $this->db->query($sql);
    $amount = $result->row_array()['SUM(cuota)'];
    $this->update(array('monto_total' => $amount),$contract_id);
  }

  public function get_last_id($id_cliente){
    $sql = "SELECT id_contrato FROM ic_contratos where id_cliente =$id_cliente ORDER BY id_contrato DESC LIMIT 1";
    $result = $this->db->query($sql); 
    return $result->row_array()['id_contrato'];
  }

  public function get_all_of_client($id){
    $sql = "SELECT * FROM ic_contratos WHERE id_cliente = $id LIMIT 5";
    $result = $this->db->query($sql);
    $result = make_contract_table($result->result_array(),0);
    echo $result;
  } 

  public function get_all_of_clientjson($id){
    $sql = "SELECT * FROM v_contratos WHERE id_cliente = $id and estado = 'activo'";
    $result = $this->db->query($sql);
    $result = $result->result();
    return $result;
  } 

  public function get_contracts_dropdown($id_cliente){
    $sql = "SELECT * FROM ic_contratos WHERE id_cliente = $id_cliente and (estado='activo' || estado = 'cancelado') ORDER BY id_contrato desc";
    $result = $this->db->query($sql);
    $result = make_contract_dropdown($result->result_array(),0);
    echo $result;
  }  

  public function get_active_contracts(){
    $sql = "SELECT COUNT(*) FROM ic_contratos WHERE estado= 'activo'";
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
    if($result = $this->db->query($sql)){
      return $result->row_array();
    }else{
      return false;
    }
  }

  public function refresh_contract($data_pago,$data_contrato,$current_contract){ 
    $id_empleado = $_SESSION['user_data']['user_id'];
    $sql1 = " UPDATE ic_pagos SET id_empleado = $id_empleado, estado='".$data_pago['estado']."', fecha_pago='".$data_pago['fecha_pago']."', complete_date=now() WHERE id_pago=".$data_pago['id'];

    $sql3 = "SELECT * FROM ic_contratos where estado = 'activo' and id_cliente = ".$current_contract['id_cliente'];
    $sql4 = "UPDATE ic_clientes SET estado = 'no activo' WHERE id_cliente = ".$current_contract['id_cliente'];


    $this->db->trans_start();
    $this->db->query($sql1);

    $proximo_pago = $this->payment_model->get_next_payment_of($current_contract['id_contrato']);
    if($proximo_pago == 0) $proximo_pago['fecha_limite'] = null;
    $data_contrato['proximo_pago'] = $proximo_pago['fecha_limite'];

    $this->db->where('id_contrato',$current_contract['id_contrato']);
    $this->db->update('ic_contratos',$data_contrato);
    $this->db->trans_complete();

    if($this->db->trans_status() === false){
      echo MESSAGE_ERROR." No pudo guardarse el pago";
    } else{
      echo MESSAGE_SUCCESS." Pago Registrado";
      $has_contracts = $this->db->query($sql3);
      $has_contracts = $has_contracts->result_array();
      $has_contracts = count($has_contracts);
      if($has_contracts == 0){
        $this->db->query($sql4);
        $this->section_model->update_ip_state($current_contract['codigo'],'disponible');
      }
    }
  }

  public function upgrade_contract($data_pago,$data_contrato){ 
    $sql1 = " UPDATE ic_contratos SET monto_total='".$data_contrato['monto_total']."', id_servicio='".$data_contrato['id_servicio']."'";
    $sql1 .=" WHERE id_contrato=".$data_contrato['id_contrato'];

    $sql2 = " UPDATE ic_pagos SET id_servicio='".$data_pago['id_servicio']."', cuota='".$data_pago['cuota']."',total='".$data_pago['monto_total']."'";
    $sql2 .=" WHERE estado= 'no pagado' AND id_contrato=".$data_contrato['id_contrato']; 

    $this->db->trans_start();
    $this->db->query($sql1);
    $this->db->query($sql2);
    $this->db->trans_complete();

    if($this->db->trans_status() === false){
      echo MESSAGE_ERROR." No pudo guardarse la actualizacion ".$sql1." ".$sql2." "." Error";
    } else{
      echo MESSAGE_SUCCESS." Contrato actualizado";
    }
  }

  public function cancel_contract($data_pago,$data_contrato,$current_contract,$data_cancel){ 
    $sql1 = " UPDATE ic_contratos SET monto_total='".$data_contrato['monto_total']."',monto_pagado='".$data_contrato['monto_total']."', estado='cancelado',";
    $sql1 .=" ultimo_pago='".$data_contrato['ultimo_pago']."',proximo_pago=null WHERE id_contrato=".$data_contrato['id_contrato'];

    $sql2 = " DELETE FROM ic_pagos WHERE estado= 'no pagado' AND id_contrato=".$data_contrato['id_contrato']; 
    $sql3 = "SELECT * FROM ic_contratos where estado = 'activo' and id_cliente = ".$current_contract['id_cliente'];
    $sql4 = " UPDATE ic_clientes SET estado = 'no activo' WHERE id_cliente = ".$current_contract['id_cliente'];
    
    
    $this->db->select('estado');
    $this->db->where('id_contrato',$data_contrato['id_contrato']);
    $estado = $this->db->get('ic_contratos')->row_array()['estado'];
    if($estado != 'activo'){
      echo MESSAGE_INFO." Este contrato ya ha sido cancelado o Saldado";
    }else{
      $this->db->trans_start();
      $this->db->query($sql1);
      $this->db->query($sql2);
      $this->db->insert('ic_pagos',$data_pago);
      $this->db->insert('ic_cancelaciones',$data_cancel);
      $this->db->trans_complete();
      if($this->db->trans_status() === false){
        echo MESSAGE_ERROR." No pudo guardarse la actualizacion ";
      } else{
        echo MESSAGE_SUCCESS." Contrato Cancelado";
        $this->section_model->update_ip_state($current_contract['codigo'],'disponible');
        $has_contracts = $this->db->query($sql3);
        $has_contracts = $has_contracts->result_array();
        $has_contracts = count($has_contracts);
        if($has_contracts == 0){
          $this->db->query($sql4);
        }     
      }
    }
    
  }

  public function add_extra_service($data_contract,$id_contrato,$data_pago,$id_pago){     
    $this->db->trans_start();
    $this->db->where('id_contrato',$id_contrato);
    $this->db->update('ic_contratos',$data_contract);
    $this->db->where('id_pago',$id_pago);
    $this->db->update('ic_pagos',$data_pago);
    $this->db->trans_complete();
    if($this->db->trans_status() === false){
      echo MESSAGE_ERROR." No pudo guardarse la actualizacion "." Error";
    } else{
      echo MESSAGE_SUCCESS." Servicio ExtraAgregado";
    }
    
  }
   
  public function get_cancelation($id_contrato){
    $this->db->where('id_contrato',$id_contrato);
    $result = $this->db->get('ic_cancelaciones',1);
    if($result){
      return $result->row_array();
    }
  }
  //functions
}