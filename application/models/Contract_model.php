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
    $this->load->model('settings_model');
    $this->load->model('section_model');
  }

  function organize_data($data,$mode){

    if($mode == "full"){
      $this->id_contrato = $data['id_contrato'];
    }
    $this->id_cliente     = $data['id_cliente'];
    $this->id_empleado    = get_user_data()['user_id'];
    $this->id_servicio    = $data['id_servicio'];
    $this->codigo         = $data['codigo'];
    $this->fecha          = $data['fecha'];
    $this->duracion       = $data['duracion'];
    $this->ultimo_pago    = $data['fecha'];
    $this->estado         = 'activo';
    $this->nombre_equipo  = $data['nombre_equipo'];
    $this->modelo         = $data['modelo'];
    $this->mac_equipo     = $data['mac_equipo'];
    $this->router         = $data['router'];
    $this->mac_router     = $data['mac_router'];
    $this->ip             = $data['ip'];

  }

  public function add($data){
    $this->organize_data($data,"normal");
    $this->db->trans_start();
    $this->db->insert('ic_contratos',$this);
    $this->client_model->is_active(true, $data);
    $contract_id = $this->get_last_id_of($data['id_cliente']);
    $this->create_payments($contract_id,$data,$this);
    $this->section_model->update_ip_state($data['codigo'],'ocupado');
    $this->update_amount($contract_id);
    $this->db->trans_complete();

    if ($this->db->trans_status()){
      return $contract_id;
    }
    else{
      $this->db->trans_rollback();
      return false;
    }
  }

  public function update($data_for_update, $contract_id){
    $this->db->where('id_contrato', $contract_id);
    if ($this->db->update('ic_contratos', $data_for_update)) {
      $this->get_next_payment_for_contract($contract_id);
      return true;
    } else {
      return false;
    }
  }

  public function create_payments($contract_id,$data,$context){
    $contract_date = new DateTime($data['fecha']);
    $next_payment_date = $contract_date;
    $duration = $data['duracion'];
    $concepto = "Instalación";
    $settings = $this->settings_model->get_settings();
    $split_day = $settings['split_day'];
    $day = $contract_date->format('d');
    $pago = $data['mensualidad'];

    $i = 0;

    for ($i; $i < $duration + 1; $i++) {
      if($i > 0) $concepto = "mensualidad";
      if($i == 1) {
        if($day > 15 && $day <= $split_day){
          $pago = $data['mensualidad'] / 2;
        }
      }else{
        $pago = $data['mensualidad'];
      }

      $new_data = [
        'id_contrato' => $contract_id,
        'id_servicio' => $data['id_servicio'],
        'fecha_pago'  => null,
        'concepto'    => $concepto,
        'cuota'       => $pago,
        'mora'        => 0,
        'total'       => $pago,
        'estado'      => "no pagado",
        'fecha_limite'=> $next_payment_date->format("Y-m-d")
      ];

      $this->payment_model->add($new_data);

      if($i == 0){
        $next_payment_date = get_first_date($next_payment_date);
      }else{
        $next_payment_date = get_next_date($next_payment_date);
      }
    }
  }

  public function payments_up_to_date($data){
    $contract_id  = $data['id_contrato'];
    $this->db->trans_start();
    $this->clear_payments($data['id_contrato']);

    $data_payment = [
      'id_empleado'   => get_user_data()['user_id'],
      'estado'        => 'pagado',
      'fecha_pago'    => date('Y-m-d'),
      'complete_date' => date('Y-m-d H:i:s')
    ];

    $this->db->where('id_contrato', $contract_id);
    $this->db->where("id_pago <= '".$data['last_payment_id']."'",'' ,false);
    $this->db->update('ic_pagos', $data_payment);

    $debt = $this->get_debt_of($contract_id);

    $data_contract = [
      'monto_pagado'  => $debt['monto_pagado'],
      'ultimo_pago'   => date('Y-m-d'),
      'estado'        => ($debt['monto_pagado'] == $debt['monto_total']) ? 'saldado' : 'activo'
    ];
    $this->update($data_contract, $contract_id, false);
    $this->db->trans_complete();
    if($this->db->trans_status() === false){
        $this->db->trans_rollback();
        return false;
    }else{
        return true;
    }
  }


  private function clear_payments($contract_id){
    $data_payment = [
      'id_empleado'   => null,
      'estado'        => 'no pagado',
      'fecha_pago'    => null,
      'complete_date' => null
    ];

    $this->db->where('id_contrato', $contract_id);
    $this->db->update('ic_pagos', $data_payment);

    $data_contract = [
      'monto_pagado'  => 0.00,
      'ultimo_pago'   => null,
      'estado'        => 'activo'
    ];

    $this->db->where('id_contrato', $contract_id);
    $this->db->update('ic_contratos', $data_contract);
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

  public function get_all_of_client($id_cliente, $json = false){
    $this->db->select('v_contratos.*, ic_servicios.nombre as nombre_seguro, ic_servicios.mensualidad as mensualidad_seguro',false);
    $this->db->where('id_cliente',$id_cliente);
    $this->db->order_by('id_contrato');
    $this->db->join('ic_servicios','extras_fijos=ic_servicios.id_servicio','LEFT');
    if ($result = $this->db->get('v_contratos')){
      if (!$json) {
        echo make_contract_table($result->result_array(),0);
      } else {
        return $result->result();
      }
    }
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

  public function get_contract($id, $field = false){
    if ($field) {
      $this->db->select($field);
    } else {
      $this->db->select('ic_contratos.*', false);
    }
    $this->db->select('ic_servicios.nombre as nombre_seguro, ic_servicios.mensualidad as mensualidad_seguro',false);
    $this->db->where('id_contrato', $id);
    $this->db->join('ic_servicios','extras_fijos=ic_servicios.id_servicio','LEFT');
    return $this->db->get('ic_contratos')->row_array();
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

  public function cancel_contract($data_pago, $data_contrato, $current_contract, $data_cancel){

    $update_contract = array(
      'codigo'        => '',
      'estado'        => 'cancelado',
      'ultimo_pago'   => $data_contrato['ultimo_pago'],
      'proximo_pago'  => null,
    );

    $this->db->select('estado');
    $this->db->where('id_contrato',$data_contrato['id_contrato']);
    $estado = $this->db->get('ic_contratos')->row_array()['estado'];

    if($estado != 'activo'){
      return ['message' => "Este contrato ya ha sido cancelado o Saldado"];
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
        return false;
      } else{
        $this->check_is_active_client($current_contract);
        return true;
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
    } elseif ($contract['proximo_pago'] >= date('Y-m-d') and $contract['proximo_pago'] != null){
      $this->db->where('id_cliente',$current_contract['id_cliente']);
      $this->db->update('ic_clientes',array('estado' => 'activo'));
    }else {
      $this->db->where('id_cliente',$current_contract['id_cliente']);
      $this->db->update('ic_clientes',array('estado' => 'mora'));

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
      $estado = "activo";
    }
    return $estado;
  }
}
