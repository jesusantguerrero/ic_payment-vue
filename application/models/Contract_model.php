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

  // CRUD

  public function add($data){
    $this->organize_data($data,"normal");
    $this->db->trans_start();
    $this->db->insert('ic_contratos',$this);
    $this->client_model->is_active(true, $data);
    $this->create_payments($contract_id,$data,$this);
    $this->section_model->update_ip_state($data['codigo'],'ocupado');
    $this->update_amount($contract_id);
    $this->db->trans_complete();

    if ($this->db->trans_status()){
      return $this->get_last_contract($data['id_cliente']);
    }
    else{
      $this->db->trans_rollback();
      return false;
    }
  }

  public function get_contract_view($id){
    $this->db->where('id_contrato', $id);
    if($result = $this->db->get('v_contratos')){
      return $result->row_array();
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

  public function get_last_contract($client_id){
    $this->db->select('id_contrato');
    $this->db->where('id_cliente', $client_id);
    $this->db->order_by('id_contrato',"DESC");
    if($result = $this->db->get('ic_contratos',1)){
      return $result->row_array()['id_contrato'];
    }
  }

  public function get_contracts($id_cliente, $json = false){
    $this->db->select('v_contratos.*, ic_servicios.nombre as nombre_seguro, ic_servicios.mensualidad as mensualidad_seguro',false);
    $this->db->where('id_cliente',$id_cliente);
    $this->db->order_by('id_contrato');
    $this->db->join('ic_servicios','extras_fijos=ic_servicios.id_servicio', 'LEFT');
    if ($result = $this->db->get('v_contratos')){
      if (!$json) {
        echo make_contract_table($result->result_array(),0);
      } else {
        return $result->result();
      }
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

  // massive payment related functions

  public function create_payments($contract_id, $data){
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
    $this->update(array('monto_total' => $amount), $contract_id);
  }

  public function get_debt_of($id_contrato){
    $this->db->where('id_contrato', $id_contrato);
    $this->db->select_sum('cuota');
    $to_pay = $this->db->get('ic_pagos',1)->row_array()['cuota'];

    $this->db->where('id_contrato',$id_contrato);
    $this->db->select_sum('mensualidad');
    $paid = $this->db->get('v_recibos',1)->row_array()['mensualidad'];

    return array('monto_pagado' => $paid, 'monto_total' => $to_pay);
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


  //  complex transactions
  public function get_contracts_dropdown($id_cliente){
    $sql = "SELECT * FROM ic_contratos WHERE id_cliente = $id_cliente ORDER BY id_contrato desc";
    $result = $this->db->query($sql);
    $result = make_contract_dropdown($result->result_array(),0);
    echo $result;
  }

  public function refresh_contract($data_pago, $data_contrato, $current_contract){
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

  public function upgrade_contract($data){
    $contract = $this->contract_model->get_contract_view($data['id_contrato']);
    $pagos_restantes = $this->payment_model->count_unpaid_per_contract($data['id_contrato']);
    $monto_total = $contract['monto_pagado'] + ($data['cuota'] * $pagos_restantes);

    $data_contract = array(
      'monto_total'   => $monto_total,
      'id_servicio'   => $data['id_servicio']
    );

    $data_pago = array(
      'id_servicio' => $data['id_servicio'],
      'cuota'       => $data['cuota'],
      'total'       => $data['cuota']
    );

    $this->db->trans_start();
    // updating contract
    $this->db->where('id_contrato', $data['id_contrato']);
    $this->db->update('ic_contratos', $data_contract);

    // updating payments
     $this->db->where('id_contrato', $data['id_contrato']);
     $this->db->where('estado', 'no pagado');
     $this->db->update('ic_pagos', $data_pago);
    $this->db->trans_complete();

    if($this->db->trans_status() === false){
        $this->db->trans_rollback();
        var_dump($this->db->last_query());
        return false;
    } else{
      return true;
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

  public function add_extra_next_payment($data) {

    $contract_id  = $data['id_contrato'];
    $contract     = $context->contract_model->get_contract_view($contract_id);
    $service      = $context->service_model->get_service($data['id_servicio']);
    $next_payment = $context->payment_model->get_next_payment_of($contract_id);

    $this->db->trans_start();
    $context->payment_model->set_extra([$service['id_servicio'] => ["servicio" => $service['nombre'], "precio"=> $service['mensualidad']]], $next_payment['id_pago']);
    $extras  = $context->payment_model->get_extras($next_payment['id_pago'], true);
    $total   =  $next_payment['cuota'] + $next_payment['mora'] + $extras['total'];

    $data_contract = [
      'router'        => $data['router'],
      'mac_router'    => $data['mac_router'],
      'nombre_equipo' => $data['nombre_equipo'],
      'mac_equipo'    => $data['mac_router']
    ];
    $this->db->where('id_contrato', $id_contrato);
    $this->db->update('ic_contratos', $data_contract);

    $data_payment = [
      'detalles_extra' => $extras['detalles'],
      'monto_extra'    => $extras['total'],
      'total'          => $total
    ];
    $this->db->where('id_pago', $next_payment['id_pago']);
    $this->db->update('ic_pagos', $data_payment);

    $this->db->trans_complete();
    if($this->db->trans_status() === false){
      $this->db->trans_rollback();
    } else{
      return ['message' => 'Servicio Extra Agregado'];
    }

  }

  // Cancelation related TODO: make a model for this two functions
  public function get_cancelation($id_contrato){
    $this->db->where('id_contrato',$id_contrato);
    $result = $this->db->get('ic_cancelaciones',1);
    if($result){
      return $result->row_array();
    }
  }

  public function delete_cancelation($contract_id){
    $this->db->where('id_contrato',$contract_id);
    if($this->db->delete('ic_cancelaciones')){
      return true;
    }
    return false;
  }

  // client related
  public function check_is_active_client($current_contract){
    $this->db->where('estado', 'activo');
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

  // section ip related
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
