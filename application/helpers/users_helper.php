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

if ( ! function_exists('make_table')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_table($data,$start_at){
    $types = array("Administrador","Secretaria(o)","Otro");
    $cont = $start_at + 1;
    $html_text = " ";
    foreach ($data as $line) {
        $html_text .= "
        <tr>
          <td>".$cont."</td>
          <td class='user-id'>".$line['user_id']."</td>
          <td>".$line['nickname']."</td>
          <td>".$line['name']."</td>
          <td>".$line['lastname']."</td>
          <td>".$line['dni']."</td>
          <td>".$types[$line['type']]."</td>
          <td><button>Actualizar</button></td>
          <td>
            <a href=''><i class='material-icons edit-user'>edit</i></a>
            <a href=''><i class='material-icons delete-user'>delete</i></a>
            <a href=''><i class='material-icons display-user'>find_in_page</i></a>
          </td>
        </tr>";
        $cont+=1;
      }
      return $html_text;
  }
}

if( !function_exists('get_user_data')){

  
  function get_user_data(){
    if(isset($_SESSION['user_data'])){
      $user = $_SESSION['user_data'];
      $fullname = $user['name']." ".$user['lastname'];
      if($user['type'] == 0){
        $type = "Administrador";
      }else{
        $type = "Secretaria";
      }

      $user['fullname'] = $fullname;
      $user['typestr'] = $type;

      return $user;
    }
  }
}

if ( ! function_exists('make_client_table')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_client_table($data,$start_at){
    $cont = $start_at + 1;
    $html_text = " "; 
    foreach ($data as $line) {
        $html_text .= "<tr>
        <td>".$cont."</td>
        <td class='id_cliente'>".$line['id_cliente']."</td>
        <td>".$line['nombres']."</td>
        <td>".$line['apellidos']."</td>
        <td>".$line['cedula']."</td>
        <td>".$line['celular']."</td>
        <td>".$line['estado']."</td>
      </tr>";
     $cont+=1;
    }

    return $html_text;
  }
}

if ( ! function_exists('make_service_table')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_service_table($data,$start_at){
    $cont = $start_at + 1;
    $html_text="";
    foreach ($data as $line) {
        $html_text .= "<tr>
        <td>".$cont."</td>
        <td class='id_servicio'>".$line['id_servicio']."</td>
        <td>".$line['nombre']."</td>
        <td>".$line['descripcion']."</td>
        <td>RD$ ".$line['mensualidad']."</td>
        <td>".$line['tipo']."</td>
      </tr>";
     $cont+=1;
    }

    return $html_text;
  }
}

if ( ! function_exists('make_contract_table')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_contract_table($data,$start_at){
    $cont = $start_at + 1;
    $html_text = " "; 
    foreach ($data as $line) {
        $html_text .= "<tr>
        <td class='id_contrato'>".$line['id_contrato']."</td>
        <td>".$line['fecha']."</td>
        <td>".$line['duracion']."</td>
        <td>".$line['ultimo_pago']."</td>
        <td>".$line['proximo_pago']."</td>
        <td>".$line['monto_pagado']."</td>
        <td>".$line['monto_total']."</td>
        <td class='td-estado'>".$line['estado']."</td>
      </tr>";
     $cont+=1;
    }

    return $html_text;
  }
}

function make_contract_dropdown($data){
    $html_text = " "; 
    foreach ($data as $line) {
        $html_text .= "<option value='".$line['id_contrato']."'>";
        $html_text .= $line['id_contrato']." ".$line['fecha']."</option>";
    }
    return $html_text;
}

function make_next_payments_list($data){
  $html_text = " ";
  $link;
  $months = $GLOBALS['spanish_months'];
  foreach ($data as $row) {
    $link = base_url('process/details/'.$row['id_cliente'].'/pagos');
    $total =CurrencyFormat($row['total']);
    $html_text .= "<a href='{$link}'><div class='payment-item'>
                    <div class='left-part'>
                        <div class='item-profile'>
                             <i class='material-icons'>person</i>
                        </div>
                    </div>
                    <div class='main-part'>
                        <div class='nombre'>{$row['cliente']}</div>
                        <div class='concepto'>{$row['concepto']}</div>
                        <div class='monto'>RD$ {$total}</div>
                    </div>
                     <div class='right-part'>
                        <div class='payment-day'>{$row['dia']}</div>
                        <div class='payment-month'>".$months[$row['mes']]."</div>
                    </div>
                    
                </div></a>";
  }
  return $html_text;
}

if ( ! function_exists('make_payment_table')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_payment_table($data,$start_at){
    $cont = $start_at + 1;
    $html_text = " "; 
    foreach ($data as $line) {
        $html_text .= "<tr>
        <td>".$line['concepto']."</td>
        <td>".$line['cuota']."</td>
        <td>".$line['mora']."</td>
        <td>".$line['total']."</td>
        <td>".$line['fecha_pago']."</td>
        <td class='td-estado'>".$line['estado']."</td>
        <td>".$line['fecha_limite']."</td>
        <td class='id_pago' data-id='".$line['id_pago']."'>";
          if($line['fecha_pago'] != null):
          $html_text .="<a  href='".base_url('process/getrecibo/'.$line['id_pago'])."'><i class='material-icons'>receipt</i></a>";
          endif;
        $html_text .="</td>
      </tr>";
     $cont+=1;
    }

    return $html_text;
  }
}
if ( ! function_exists('make_service_shortcuts')){
  /**
  * create a shortcut for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_service_shortcuts($data){
    $html_text="";
    foreach ($data as $line) {
        $html_text .= "
        <div class='service-card  shortcut' data-id='".$line['id_servicio']."'
          data-payment='".$line['mensualidad']."'><i class='material-icons'>rss_feed</i>".$line['nombre']."</div>";
    }

    return $html_text;
  }
}

function get_client_data(){
    if(isset($_SESSION['client_data'])){
      $client_data = $_SESSION['client_data'];
      $client_data['nombre_completo'] = $client_data['nombres']." ".$client_data['apellidos'];
      $client_data['iniciales'] =  $client_data['nombres'][0].$client_data['apellidos'][0];
      return $client_data;
    }else{
      return 'nada';
    }
}


if ( ! function_exists('create_payments')){
  /**
  * Genera los pagos de un contrato automaticamente
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function create_payments($id,$data,$context){
    $time_zone = new DateTimeZone('America/Santo_Domingo');
    $contract_date = new DateTime($data['fecha']);
    $next_payment_date = $contract_date;
    $one_month = new DateInterval('P1M');
    $duration = $data['duracion'];
    $concepto = "Instalación";
    
    for ($i=0; $i < $duration + 1; $i++) {
      if($i > 0) $concepto = $i."º pago de mensualidad"; 
      $new_data = array(
        'id_contrato' => $id,
        'fecha_pago'  => null,
        'concepto'    => $concepto,
        'cuota'       => $data['mensualidad'],
        'mora'        => 0,
        'total'       => $data['mensualidad'],
        'estado'      => "no pagado",
        'fecha_limite'=> $next_payment_date->format("Y-m-d")
      );
      $context->payment_model->add($new_data);
      $next_payment_date->add($one_month);
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

  function refresh_contract($id,$context,$data_pago){
    $time_zone = new DateTimeZone('America/Santo_Domingo');
    $one_month = new DateInterval('P1M');
    $dateYMD = null;
    $contract = $context->contract_model->get_contract_view($id);
    $monto_pagado = $contract['monto_pagado'] + $contract['cuota'];
    $next_payment_date = new DateTime($contract['proximo_pago']);
    if($monto_pagado == $contract['monto_total']){
      $estado = "saldado";
      $next_payment_date = null;
    }else{
      $estado = "activo";
      $next_payment_date->add($one_month);
      $dateYMD = $next_payment_date->format("Y-m-d");
    }
    
    $data_contract = array(
      'id_contrato'   => $id,
      'monto_pagado'  => $monto_pagado,
      'ultimo_pago'   => $data_pago['fecha_pago'],
      'proximo_pago'  => $dateYMD,
      'estado'        => $estado
    );
      $context->contract_model->refresh_contract($data_pago,$data_contract,$contract);
      
    
  }
}

function CurrencyFormat($number){
   $decimalplaces = 2;
   $decimalcharacter = '.';
   $thousandseparater = ',';
   return number_format($number,$decimalplaces,$decimalcharacter,$thousandseparater);
}

function client_to_xml_format($data){
        $client = "<client>
        <id>".$data['id_cliente']."</id>
        <name>".$data['nombres']."</name>
        <lastname>".$data['apellidos']."</lastname>
        <dni>".$data['cedula']."</dni>
        <province>".$data['provincia']."</province>
        <sector>".$data['sector']."</sector>
        <street>".$data['calle']."</street>
        <house>".$data['casa']."</house>
        <telephone>".$data['telefono']."</telephone>
        <cellphone>".$data['celular']."</cellphone>
        <job>".$data['lugar_trabajo']."</job>
        <jobphone>".$data['tel_trabajo']."</jobphone>
        <salary>".$data['ingresos']."</salary>
      </client>";
    
    return $client;
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
    echo $result;
  }
  
		 
}

function prepare_moras($data,$context){
  foreach ($data as $line) {
    $fecha = date($line['fecha_limite']);
    $cuota = $line['cuota'];
    $mora = $line['mora'];
    $monto_extra = $line['monto_extra'];
    $total = $line['total'];
    $mora = 200.00;
    $total = $cuota + $monto_extra + $mora;
    $updated_data = array(
      'id_pago' => $line['id_pago'],
      'mora'    => $mora,
      'total'   => $total
    );
    $context->payment_model->update_moras($updated_data);
  }
}
function set_last_query($lastquery){
  $_SESSION['lastquery'] = $lastquery;
}

function get_last_query(){
  return $_SESSION['lastquery'];
}