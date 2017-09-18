<?php defined('BASEPATH') OR exit('No direct script access allowed');

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
         return true;
      }else{
        echo MESSAGE_ERROR."No pudo guardarse el contrato ";
        return false;
      } 
  }

  public function update($data_for_update,$contract_id,$echo = false){
    $this->db->where('id_contrato',$contract_id);
    if($this->db->update('ic_contratos',$data_for_update)):
      if($echo) echo MESSAGE_SUCCESS." Contrato Actualizado ";
      $this->get_next_payment_for_contract($contract_id);
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

  public function get_last_id(){
    $this->db->select('id_contrato');
    $this->db->order_by('id_contrato',"DESC");
    if($result = $this->db->get('ic_contratos',1)){
      return $result->row_array()['id_contrato'];
    }
  }

   public function get_last_id_of($client_id){
    $this->db->select('id_contrato');
    $this->db->where('id_cliente',$client_id);
    $this->db->order_by('id_contrato',"DESC");
    if($result = $this->db->get('ic_contratos',1)){
      return $result->row_array()['id_contrato'];
    }
  }

  public function get_all_of_client($id_cliente){
    $this->db->where('id_cliente',$id_cliente);
    $this->db->order_by('id_contrato');
    $result = $this->db->get('v_contratos');
    echo make_contract_table($result->result_array(),0);
  }

  public function get_all_of_clientjson($id){
    $sql = "SELECT * FROM v_contratos WHERE id_cliente = $id and  (estado='activo' || estado = 'saldado')";
    $result = $this->db->query($sql);
    $result = $result->result();
    return $result;
  } 

  public function get_contracts_dropdown($id_cliente){
    $sql = "SELECT * FROM ic_contratos WHERE id_cliente = $id_cliente ORDER BY id_contrato desc";
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
    $update_pago = array(
      'id_empleado' => $id_empleado,
      'estado'      => $data_pago['estado'],
      'fecha_pago'  => $data_pago['fecha_pago']
    );

    $this->db->trans_start();
    $this->db->set('complete_date','NOW()',false);
    $this->db->update('ic_pagos',$update_pago,array('id_pago' => $data_pago['id']));

    $contract_debt = $this->get_debt_of($current_contract['id_contrato']);
    $data_contrato = array_merge($data_contrato,$contract_debt);
    $data_contrato['estado'] = $this->get_status_for($current_contract,$contract_debt);

    $this->db->where('id_contrato',$current_contract['id_contrato']);
    $this->db->update('ic_contratos',$data_contrato);

    $this->get_next_payment_for_contract($current_contract['id_contrato']);
    $this->db->trans_complete();

    if($this->db->trans_status() === false){
      $this->db->trans_rollback();
      echo MESSAGE_ERROR." No pudo guardarse el pago";
    } else{
      $this->check_is_active_client($current_contract);
      echo MESSAGE_SUCCESS." Pago Registrado";
    }
  }

  public function upgrade_contract($data_pago,$data_contrato){ 
    // TODO: Pasar esto a active record
    $sql1 = " UPDATE ic_contratos SET monto_total='".$data_contrato['monto_total']."', id_servicio='".$data_contrato['id_servicio']."'";
    $sql1 .=" WHERE id_contrato=".$data_contrato['id_contrato'];

    $sql2 = " UPDATE ic_pagos SET id_servicio='".$data_pago['id_servicio']."', cuota='".$data_pago['cuota']."',total='".$data_pago['monto_total']."'";
    $sql2 .=" WHERE estado= 'no pagado' AND id_contrato=".$data_contrato['id_contrato']; 

    $this->db->trans_start();
    $this->db->query($sql1);
    $this->db->query($sql2);
    $this->db->trans_complete();

    if($this->db->trans_status() === false){
      	$this->db->trans_rollback();
      echo MESSAGE_ERROR." No pudo guardarse la actualizacion ".$sql1." ".$sql2." "." Error";
    } else{
      echo MESSAGE_SUCCESS." Contrato actualizado";
    }
  }

  public function cancel_contract($data_pago,$data_contrato,$current_contract,$data_cancel){
    
    $update_contract = array(
      'estado'        => 'cancelado',
      'ultimo_pago'   => $data_contrato['ultimo_pago'],
      'proximo_pago'  => null,
    );
    
    $this->db->select('estado');
    $this->db->where('id_contrato',$data_contrato['id_contrato']);
    $estado = $this->db->get('ic_contratos')->row_array()['estado'];

    if($estado != 'activo'){
      echo MESSAGE_INFO." Este contrato ya ha sido cancelado o Saldado";
    }else{
      $this->db->trans_start();
      // borrando los pagos restantes
      $this->db->where('estado','no pagado');
      $this->db->where('id_contrato',$data_contrato['id_contrato']);
      $this->db->delete('ic_pagos');
      // agregando el pago de la cancelacion
      $this->db->insert('ic_pagos',$data_pago);
      // agregando la cancelacion a la tabla de cancelaciones
      $this->db->insert('ic_cancelaciones',$data_cancel);
      $this->section_model->update_ip_state($current_contract['codigo'],'disponible');

      // actualizando el contrato con los nuevos datos de cancelacion
      $contract_debt = $this->get_debt_of($data_contrato['id_contrato']);
      $update_contract = array_merge($update_contract,$contract_debt);
      $this->db->where('id_contrato',$data_contrato['id_contrato']);
      $this->db->update('ic_contratos',$update_contract);

      $this->db->trans_complete();
      if($this->db->trans_status() === false){
        $this->db->trans_rollback();
        echo MESSAGE_ERROR. "No se pudo concretar la trasaccion, verifique de nuevo";
      } else{
        $this->check_is_active_client($current_contract); 
        echo MESSAGE_SUCCESS." Contrato Cancelado";
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
      $this->db->trans_rollback();
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
  
  public function get_next_payment_for_contract($id_contrato){
    $proximo_pago = $this->payment_model->get_next_payment_of($id_contrato);
    if($proximo_pago == 0){
      $proximo_pago['fecha_limite'] = null;
    } 
    $data_contrato['proximo_pago'] = $proximo_pago['fecha_limite'];
    $this->db->where('id_contrato',$id_contrato);
    $this->db->update('ic_contratos',$data_contrato);
  }

  public function check_is_active_client($current_contract){
    $this->db->where('estado','activo');
    $this->db->where('id_cliente',$current_contract['id_cliente']);
    $has_contracts = $this->db->count_all_results('ic_contratos');
    $contract = $this->get_contract_view($current_contract['id_contrato']);

    if(!$has_contracts || $has_contracts == 0){
      $this->db->where('id_cliente',$current_contract['id_cliente']);
      $this->db->update('ic_clientes',array('estado' => 'no activo'));
    }

    if($contract['proximo_pago'] >= date('Y-m-d') and $contract['estado'] != 'suspendido'){
      $this->db->where('id_cliente',$current_contract['id_cliente']);
      $this->db->update('ic_clientes',array('estado' => 'activo'));
    }
  }

  public function delete_cancelation($contract_id){
    $this->db->where('id_contrato',$contract_id);
    if($this->db->delete('ic_cancelaciones')){
      return true;
    }
    return false;
  }

  public function get_debt_of($id_contrato){
    $this->db->where('id_contrato',$id_contrato);
    $this->db->select_sum('cuota');
    $to_pay = $this->db->get('ic_pagos',1)->row_array()['cuota'];
    
    $this->db->where('id_contrato',$id_contrato);
    $this->db->select_sum('mensualidad');
    $paid = $this->db->get('v_recibos',1)->row_array()['mensualidad'];

    return array('monto_pagado' => $paid, 'monto_total' => $to_pay);
  }

  public function get_status_for($contract,$debt){
    if($debt['monto_pagado'] == $debt['monto_total']){
      $estado = "saldado";
      $this->section_model->update_ip_state($contract['codigo'],'disponible');
    }else{
      if($contract['estado'] == 'suspendido'){
        $estado = "suspendido";
      }else{
        $estado = "activo";
      }
    }
    return $estado;
  }
}