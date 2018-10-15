<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/

defined('BASEPATH') OR exit('No direct script access allowed');


if (! function_exists('cancel_payment')){

  function cancel_payment($payment_id,$context){
    $payment   = $context->payment_model->get_payment($payment_id);
    $contract  = $context->contract_model->get_contract_view($payment['id_contrato']);

    if(!str_contains('abono',$payment['concepto'])){

      $data_payment = [
        'estado'      => 'no pagado',
        'fecha_pago'  => null
      ];

      $context->payment_model->update($data_payment,$payment_id);

      $context->db->where('id_contrato',$payment['id_contrato'])
        ->where('estado','pagado')
        ->select('fecha_pago')
        ->order_by('fecha_pago','DESC');

      $last_pay_date = $context->db->get('ic_pagos',1)->row_array()['fecha_pago'];

      $data_contract = [
        'ultimo_pago'   => $last_pay_date,
        'proximo_pago'  => $payment['fecha_limite'],
        'estado'        => 'activo'
      ];

      $contract_debt = $context->contract_model->get_debt_of($payment['id_contrato']);
      $data_contract = array_merge($data_contract, $contract_debt);
      return $context->contract_model->update($data_contract,$payment['id_contrato']);

    }else{
      return cancel_abono($payment,$contract,$context);
    }
  }
}

if (! function_exists('set_abono')){

  function set_abono($data,$context){
    $date      = date('Y-m-d');
    $payment   = $context->payment_model->get_next_payment_of($data['contrato_abono']);
    $contract  = $context->contract_model->get_contract_view($data['contrato_abono']);

    if($payment and ($data['cuota'] < $payment['cuota']) and ($data['cuota'] > 0)) {
      $user_id = $_SESSION['user_data']['user_id'];
      $to_pay = new DATETIME($payment['fecha_limite']);
      $to_pay = str_replace($GLOBALS['full_months_eng'],$GLOBALS['full_months_esp'],$to_pay->format('F'));

      $data_abono = [
        'id_contrato'    => $data['contrato_abono'],
        'id_servicio'    => $payment['id_servicio'],
        'fecha_pago'     => $date,
        'concepto'       => "abono ($to_pay)",
        'detalles_extra' => $data['descripcion'],
        'cuota'          => $data['cuota'],
        'mora'           => 0,
        'total'          => $data['cuota'],
        'estado'         => 'pagado',
        'id_empleado'    => $user_id,
        'fecha_limite'   => $date,
        'deuda'          => $payment['total'] - $data['cuota'],
        'abono_a'        => $payment['id_pago']
      ];

      $context->db->trans_start();

     $id_abono = $context->payment_model->add($data_abono);
      $new_cuota = $payment['cuota'] - $data['cuota'];

      $updated_payment = [
        'cuota'  => $new_cuota,
        'total'  => $payment['mora'] + $payment['monto_extra'] + $new_cuota
      ];

      $context->payment_model->update($updated_payment, $payment['id_pago']);

      $data_contract = ['ultimo_pago'=> $date];
      $contract_debt = $context->contract_model->get_debt_of($contract['id_contrato']);
      $data_contract = array_merge($data_contract, $contract_debt);
      $data_contract['estado'] = $context->contract_model->get_status_for($contract, $contract_debt);

      $context->contract_model->update($data_contract,$contract['id_contrato']);
      $context->db->trans_complete();

      if($context->db->trans_status() === false){
        $context->db->trans_rollback();
        return false;
      } else {
        return $id_abono;
      }
    }else{
      return 'bigger';
    }
  }
}

if (! function_exists('cancel_abono')){

  function cancel_abono($abono,$contract,$context){
    $abono_owner = $context->payment_model->get_payment($abono['abono_a']);
    $total = $abono['total'];

    if($abono_owner['estado'] != 'pagado'){

      $context->db->query('delete from ic_pagos where id_pago='.$abono['id_pago']);
      $last_payment = $context->payment_model->get_last_paid($abono['id_contrato']);

      $new_cuota = $abono_owner['cuota'] + $total;

      $updated_payment = [
        'cuota'   => $new_cuota,
        'total'   => $abono_owner['mora'] + $abono_owner['monto_extra'] + $new_cuota
      ];

      $context->payment_model->update($updated_payment,$abono_owner['id_pago']);

      $data_contract = ['ultimo_pago'   => $last_payment['fecha_pago']];
      $contract_debt = $context->contract_model->get_debt_of($contract['id_contrato']);
      $data_contract = array_merge($data_contract,$contract_debt);
      $data_contract['estado'] = $context->contract_model->get_status_for($contract,$contract_debt);

      return $context->contract_model->update($data_contract,$contract['id_contrato']);
    }else{
      return ['message' => 'El pago al que pertenecia este abono se realizó, este abono ya no puede ser eliminado'];
    }

  }
}

function payment_discount($data, $context){
  $data_pago = [
    'id'          => $data['id_pago'],
    'estado'      => 'pagado',
    'fecha_pago'  => $data['fecha_pago'],
    'id_contrato' => $data['id_contrato']
  ];

  $data_discount = [
    'cuota'           => $data['cuota'],
    'mora'            => $data['mora'],
    'monto_extra'     => $data['monto_extra'],
    'total'           => $data['total'],
    'descuento'       => $data['descuento'],
    'detalles_extra'  => $data['detalles_extra'],
    'razon_descuento' => $data['razon_descuento']
  ];

  $context->payment_model->update($data_discount,$data['id_pago']);

	$context->db->where('id_contrato',$data['id_contrato']);
	$context->db->select_sum('cuota');
	$suma = $context->db->get('ic_pagos');
	$suma = $suma->row_array()['cuota'];
	$context->db->where('id_contrato',$data['id_contrato']);
	$context->db->update('ic_contratos',array('monto_total' => $suma));

  refresh_contract($data['id_contrato'], $data_pago);
}

// contract relaed functions

if (! function_exists('cancel_contract')){

  function cancel_contract($context, $data_cancel){

    $user_id = $_SESSION['user_data']['user_id'];
    $contract_id = $data_cancel['id_contrato'];
    $contract = $context->contract_model->get_contract_view($contract_id);
    $settings = $context->settings_model->get_settings();
    $date = date('Y-m-d');

    if($data_cancel['penalidad'] == "true"){
      $penalizacion = ($settings['penalizacion_cancelacion'] / 100) * ($contract['cuota'] * 12);
    }else{
      $penalizacion = 0;
    }

    $monto_total = $contract['monto_pagado'] + $penalizacion;

    $data_contract = [
      'id_contrato'   => $contract_id,
      'monto_total'   => $monto_total,
      'monto_pagado'  => $monto_total,
      'proximo_pago'  => null,
      'ultimo_pago'   => $date
    ];

    $data_pago = [
        'id_contrato' => $data_cancel['id_contrato'],
        'id_empleado' => $user_id,
        'id_servicio' => $contract['id_servicio'],
        'fecha_pago'  => $date,
        'concepto'    => 'Cancelación de Contrato',
        'cuota'       => $penalizacion,
        'mora'        => 0,
        'total'       => $penalizacion,
        'estado'      => "pagado",
        'fecha_limite'=> $date
    ];

    $data_cancel_to_save = [
      'id_contrato' => $data_cancel['id_contrato'],
      'motivo'      => $data_cancel['motivo']
    ];

    return $context->contract_model->cancel_contract($data_pago, $data_contract, $contract, $data_cancel_to_save);
  }
}

function extend_contract($data, $context){
    $contract_id = $data['id_contrato'];

    $last_payment = $context->payment_model->get_last_paid($contract_id);
    $next_payment_date = new DateTime($last_payment['fecha_limite']);
    $next_payment_date = get_next_date($next_payment_date);
    $contract = $context->contract_model->get_contract_view($contract_id);
    $num_pago = $context->payment_model->count_of_contract($contract_id);
    $duration = $num_pago + $data['duracion'] - 1;

    $new_data = array(
      'duracion'       => $duration,
      'monto_total'    => $contract['monto_total'] + ($data['duracion'] * $contract['cuota']),
      'estado'         => 'activo'
    );

    $is_saved = $context->contract_model->update($new_data,$contract_id);
    if($is_saved){
      for ($i= $num_pago; $i <= $duration; $i++) {
        if($i > 0) $concepto = "mensualidad";
        $new_data = array(
          'id_contrato' => $contract_id,
          'id_servicio' => $contract['id_servicio'],
          'fecha_pago'  => null,
          'concepto'    => $concepto,
          'cuota'       => $contract['cuota'],
          'mora'        => 0,
          'total'       => $contract['cuota'],
          'estado'      => "no pagado",
          'fecha_limite'=> $next_payment_date->format("Y-m-d")
        );
        $context->payment_model->add($new_data);
        $next_payment_date = get_next_date($next_payment_date);
      }
    }
}

function reconnect_contract($data, $context){
  // {id_contrato, fecha, id_servicio, duracon, ip}
  $contract = $context->contract_model->get_contract_view($data['id_contrato']);
  $service = $context->service_model->get_service($data['id_servicio']);
  $duration = $contract['duracion'] + $data['duracion'];

  $payment_data = array(
    'mensualidad' => $service['mensualidad'],
    'duracion'    => $data['duracion'],
    'id_servicio' => $data['id_servicio'],
    'fecha'       => $data['fecha']
  );

  $context->contract_model->create_payments($data['id_contrato'], $payment_data);
  $context->client_model->update_client('activo', 'estado', $contract['id_cliente']);
  $monto_total  = $context->payment_model->get_sum_monto_total_of($data['id_contrato']);

  $new_data_contract = array(
    'duracion'           => $duration,
    'monto_total'        => $monto_total,
    'estado'             => 'activo',
    'id_servicio'        => $data['id_servicio'],
    'estado_instalacion' => 'por instalar',
  );

  $context->contract_model->update($new_data_contract,$data['id_contrato']);
}


function suspender_contrato($id_contrato,$id_cliente,$context){
  generar_facturas_contrato($id_contrato,$context);
  $date = date('Y-m-d');

  $context->db->trans_start();
  $context->contract_model->update(['estado' => 'suspendido'],$id_contrato);
  $context->db->where('id_cliente',$id_cliente);
  $context->db->update('ic_clientes',['estado' => 'suspendido','suspension_date' => $date]);

  //borrando los pagos y actualizando la deuda
  $context->db->where('estado ="no pagado" and generado = false')
  ->where('id_contrato',$id_contrato)
  ->delete('ic_pagos');

  $suma = $context->db->where('id_contrato',$id_contrato)
          ->select_sum('cuota')
          ->get('ic_pagos')->row_array()['cuota'];

  $context->contract_model->update(['monto_total' => $suma],$id_contrato);
  $context->db->trans_complete();

  if($context->db->trans_status() === false){
     $context->db->trans_rollback();
     return false;
  }else{
    return true;
  }
}

function generar_facturas_contrato($id_contrato, $context){
  $context->db->where('contrato',$id_contrato);
  $contrato = $context->db->get('v_pagos_generados')->row_array();

  $context->db->select('id_pago,estado');
  $pagos = $context->db->where('id_contrato',$contrato['contrato'])
  ->where('fecha_limite < current_date()')
  ->get('ic_pagos')->result_array();

  foreach ($pagos as $pago) {
    if($contrato['pagos_generados'] < 3){
      $context->payment_model->update(['generado' => true],$pago['id_pago']);
      if($pago['estado'] == 'no pagado')$contrato['pagos_generados'] += 1;
    }
  }
}

// dates helper functions

function get_next_date($date){
  $one_month = new DateInterval('P1M');
    switch ($date->format('m')) {
      case '01':
        $date = getForFebruary($date);
        break;
      case '02':
        $date = getForMarch($date);
        break;
      default:
        $date->add($one_month);
        break;
    }
    return $date;
}

function getForFebruary($date){
  $year = $date->format('Y');
  $month = '02';
  $day = $date->format('d');
  if($day > 28) $day = '28';
  $newdate = "$year-$month-$day";

  return new DateTime($newdate);
}

function getForMarch($date){
  $year = $date->format('Y');
  $month = '03';
  $day = $date->format('d');
  if($day == 28) $day = '30';
  $newdate = "$year-$month-$day";

  return new DateTime($newdate);
}

function get_first_date($date){
  $ci =& get_instance();
  $settings = $ci->settings_model->get_settings();
  $split_day = $settings['split_day'];

  $year = $date->format('Y');
  $month = $date->format('m');
  $day = $date->format('d');
  $old_day = $day;
  $newdate;
  if($month != 2):
    $day = '30';
  else:
    $day = '28';
  endif;
  $newdate = "$year-$month-$day";
  $newdate = new DateTime($newdate);
  if($old_day > $split_day){
    $newdate = get_next_date($newdate);
  }
  return $newdate;
}

function get_cuota($id_contrato,$context){
  $context->db->where('id_contrato',$id_contrato)
  ->select('cuota');
  $cuota = $context->db->get('v_contratos',1)->row_array()['cuota'];
  return $cuota;
}

function get_settings(){
  $ci =& get_instance();
  $settings = $ci->db->get('ic_settings',1);
  return $settings->row_array();
}

function format_date($normal_date) {
  $date = new DATETIME($normal_date);
  return $date = $date->format('Y-m-d');
}
