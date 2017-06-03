<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/

$client_details;

defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('create_payments')){
  /**
  * Genera los pagos de un contrato automaticamente
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function create_payments($contract_id,$data,$context){
    $time_zone = new DateTimeZone('America/Santo_Domingo');
    $contract_date = new DateTime($data['fecha']);
    $next_payment_date = $contract_date;
    $duration = $data['duracion'];
    $concepto = "Instalación";
    
    for ($i=0; $i < $duration + 1; $i++) {
      if($i > 0) $concepto = $i."º pago de mensualidad"; 
      $new_data = array(
        'id_contrato' => $contract_id,
        'id_servicio' => $data['id_servicio'],
        'fecha_pago'  => null,
        'concepto'    => $concepto,
        'cuota'       => $data['mensualidad'],
        'mora'        => 0,
        'total'       => $data['mensualidad'],
        'estado'      => "no pagado",
        'fecha_limite'=> $next_payment_date->format("Y-m-d")
      );
      $context->payment_model->add($new_data);
      if($i == 0){
        $next_payment_date = get_first_date($next_payment_date);
      }else{
        $next_payment_date = get_next_date($next_payment_date);
      }
      
    }
  }
}

if (! function_exists('refresh_contract')){
  /**
  * Actualiza los pagos de un contrato automaticamente
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function refresh_contract($contract_id,$context,$data_pago){
    $time_zone = new DateTimeZone('America/Santo_Domingo');
    $dateYMD = null;

    $contract = $context->contract_model->get_contract_view($contract_id);
    $monto_pagado = $contract['monto_pagado'] + $contract['cuota'];
    $next_payment_date = new DateTime($contract['proximo_pago']);

    if($monto_pagado == $contract['monto_total']){
      $estado = "saldado";
      $next_payment_date = null;
    }else{
      $estado = "activo";
      $next_payment_date = get_next_date($next_payment_date);
      $dateYMD = $next_payment_date->format("Y-m-d");
    }
    
    $data_contract = array(
      'id_contrato'   => $contract_id,
      'monto_pagado'  => $monto_pagado,
      'ultimo_pago'   => $data_pago['fecha_pago'],
      'proximo_pago'  => $dateYMD,
      'estado'        => $estado
    );
      $context->contract_model->refresh_contract($data_pago,$data_contract,$contract); 
  }
}

if (! function_exists('upgrade_contract')){
  /**
  * Actualiza los pagos de un contrato automaticamente
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function upgrade_contract($context,$data_cambio){
    $contract_id = $data_cambio['id_contrato'];
    $contract = $context->contract_model->get_contract_view($contract_id);
    $pagos_restantes = $context->payment_model->count_unpaid_per_contract($contract_id);

    $monto_total = $contract['monto_pagado'] + ($data_cambio['cuota'] * $pagos_restantes);
    
    $data_contract = array(
      'id_contrato'   => $contract_id,
      'monto_total'   => $monto_total,
      'id_servicio'   => $data_cambio['id_servicio']
    );

    $data_pago = array(
      'id_contrato'   => $contract_id,
      'id_servicio'   => $data_cambio['id_servicio'],
      'cuota'         => $data_cambio['cuota'],
      'monto_total'   => $data_cambio['cuota']
    );
      $context->contract_model->upgrade_contract($data_pago,$data_contract); 
  }
}


/**
* Update_moras and Prepare_moras
* update_moras se informa de la ultima vez que corrió la función (ella misma), si fue hoy no hace nada, pero si ha pasado un dia
* se ejecuta prepare_moras que prepara los datos para actualizar los pagos
*
*/

function update_moras($context){ 
  $today = date('Y-m-d');
  $settings = $context->settings_model->get_settings();

  $next_check = $settings['next_check'];
  if($next_check == $today){
    $data = $context->payment_model->get_moras_view();
    if($data){
			prepare_moras($data,$context);
		}
    $result = $context->settings_model->update('last_check_moras',$today);
  }
  
		 
}

function prepare_moras($data,$context){
  foreach ($data as $line) {
    $fecha = date($line['fecha_limite']);
    $cuota = $line['cuota'];
    $mora = $line['mora'];
    $monto_extra = $line['monto_extra'];
    $total = $line['total'];
    $mora = $settings['cargo_mora'];
    $total = $cuota + $monto_extra + $mora;
    $updated_data = array(
      'id_pago' => $line['id_pago'],
      'mora'    => $mora,
      'total'   => $total
    );
    $context->payment_model->update_moras($updated_data);
  }
}

if (! function_exists('cancel_contract')){

  function cancel_contract($context,$data_cancel){
    $id_empleado = $_SESSION['user_data']['user_id'];
    $contract_id = $data_cancel['id_contrato'];
    $contract = $context->contract_model->get_contract_view($contract_id);
    $settings = $context->settings_model->get_settings();
    $penalizacion = ($settings['penalizacion_cancelacion'] / 100) * $contract['monto_total'];

    $monto_total = $contract['monto_pagado'] + $penalizacion;
    
    $data_contract = array(
      'id_contrato'   => $contract_id,
      'monto_total'   => $monto_total,
      'monto_pagado'  => $monto_total,
      'proximo_pago'   => null,
      'ultimo_pago'   => $data_cancel['fecha']
    );

    $data_pago = array(
        'id_contrato' => $data_cancel['id_contrato'],
        'id_empleado' => $id_empleado,
        'id_servicio' => $contract['id_servicio'],
        'fecha_pago'  => $data_cancel['fecha'],
        'concepto'    => 'Cancelación de Contrato',
        'cuota'       => 0,
        'mora'        => 0,
        'total'       => $penalizacion,
        'estado'      => "pagado",
        'fecha_limite'=> $data_cancel['fecha']
    );
    $context->contract_model->cancel_contract($data_pago,$data_contract,$contract); 
  }
}




function extend_contract($data,$context){
    $contract_id = $data['id_contrato'];

    $last_payment = $context->payment_model->get_last_pay_of($contract_id);
    $next_payment_date = new DateTime($last_payment['fecha_limite']);
    $next_payment_date = get_next_date($next_payment_date);
    $contract = $context->contract_model->get_contract_view($contract_id);
    $num_pago = $context->payment_model->count_of_contract($contract_id);
    $duration = $num_pago + $data['duracion'] - 1;

    $new_data = array(
      'duracion'       => $duration,
      'monto_total' =>  $contract['monto_total'] + ($data['duracion'] * $contract['cuota'])
    );  
    $is_saved = $context->contract_model->update($new_data,$contract_id);
    if($is_saved){
      for ($i= $num_pago; $i <= $duration; $i++) {
        if($i > 0) $concepto = $i."º pago de mensualidad"; 
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
  $year = $date->format('Y');
  $month = $date->format('m');
  $day = $date->format('d');
  $newdate;
  if($day <= 15){
    if($month != 2):
      $day = '30';
    else:
      $day = '28';
    endif;
    $newdate = "$year-$month-$day";
    $newdate = new DateTime($newdate);
  }else{
    $newdate = get_next_date($date);
  } 
  return $newdate;
}