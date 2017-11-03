<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/

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
          <td class='user-id hide'>".$line['user_id']."</td>
          <td>".$line['nickname']."</td>
          <td>".$line['name']."</td>
          <td>".$line['lastname']."</td>
          <td>".dni_format($line['dni'])."</td>
          <td>".$types[$line['type']]."</td>
          <td><button>Actualizar</button></td>
          <td class='hide'>".$line['type']."</td>
          <td>
            <a href=''><i class='material-icons edit-user'' data-user-id='".$line['user_id']."'>edit</i></a>
            <a href=''><i class='material-icons delete-user'>delete</i></a>
            <a href=''><i class='material-icons display-user'>find_in_page</i></a>
          </td>
        </tr>";
        $cont+=1;
      }
      return $html_text;
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
    $state = '';
    $posible_states = array(
      'done'      => 'activo',
      'error'     => 'no activo',
      'process'   => '',
      'saldado'   => '',
      'cancelado' => '',
      'mora'      => 'mora',
      'suspendido'=> 'suspendido',
      'exonerado' => 'exonerado',
      'en corte'  => 'en corte'
    );

    foreach ($data as $line) {

        $state = verify_state($line['estado'],$posible_states);
        $html_text .= "<tr>
        <td>".$cont."</td>
        <td class='hide'></td>
        <td class='id_cliente hide'>".$line['id_cliente']."</td>
        <td>".$line['nombres']."</td>
        <td>".$line['apellidos']."</td>
        <td>".dni_format($line['cedula'])."</td>
        <td>".phone_format($line['celular'])."</td>
        <td data-value='{$line['estado']}' class='{$state['class']} estado-cliente'>".$state['text']."</td>
        <td class='hide'>".$line['estado']."</td>
        <td>".$line['nombres']." ".$line['apellidos']."</td>
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
        <td class='hide'></td>
        <td class='id_servicio hide'>".$line['id_servicio']."</td>
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
   
    $html_text = " "; 
    $state = '';
    $row_class = '';
    $posible_states = array(
      'done'      => 'activo',
      'error'     => 'no activo',
      'process'   => '',
      'saldado'   => 'saldado',
      'cancelado' => 'cancelado',
      'mora'      => 'mora',
      'suspendido'=> 'suspendido',
      'exonerado' => 'exonerado',
      'en corte'  => 'en corte'
    );

    foreach ($data as $line) {
       $state = verify_state($line['estado'],$posible_states);
       $row_class = ($state['row_class'] == 'active') ? '' : $state['row_class'];
        $html_text .= "<tr class='$row_class'>
        <td class='id_contrato'>".$line['id_contrato']."</td>
        <td class='codigo'>".$line['codigo']."</td>
        <td class='hide'></td>
        <td>".date_spanish_format($line['fecha'])."</td>
        <td>".$line['duracion']."</td>
        <td>".date_spanish_format($line['ultimo_pago'])."</td>
        <td>".date_spanish_format($line['proximo_pago'])."</td>
        <td> RD$ ".CurrencyFormat($line['monto_pagado'])."</td>
        <td> RD$ ".CurrencyFormat($line['monto_total'])."</td>
        <td class='{$state['class']}'>".$line['estado']."</td>
        <td class='actions'>";
        $html_text .="<a  target='printframe' title='imprimir contrato' href='".base_url('process/getrequirements/'.$line['id_contrato'])."/contrato'><i class='material-icons'>description</i></a>";
        if($line['estado'] == 'cancelado'):
          $html_text .="<a target='printframe' title='cancelacion de contrato' href='".base_url('process/getcancelcontract/'.$line['id_contrato'])."' class='error'><i class='material-icons'>description</i></a>";
        elseif ($line['estado'] == 'saldado'):
          $html_text .="<a target='_blank' title='Termino de contrato' href='".base_url('process/getcancelcontract/'.$line['id_contrato'])."/true' class='text-success'><i class='material-icons'>description</i></a>"; 
        endif;
        $html_text.="</td>
        <td class='hide'>".$line['id_cliente']."</td>
        <td class='hide'>".$line['cedula']."</td>
      </tr>";
    }

    return $html_text;
  }
}

if ( ! function_exists('make_main_contract_table')){
  function make_main_contract_table($data,$start_at){
    $html_text = " "; 
    foreach ($data as $line) {
        $html_text .= 
        "<tr>
          <td class='id_contrato'>".$line['id_contrato']."</td>
          <td class='hide'></td>
          <td class='codigo'>".$line['codigo']."</td>
          <td class='th-client'>".$line['cliente']."</td>
          <td>".date_spanish_format($line['fecha'])."</td>
          <td>".$line['servicio']."</td>
          <td>".$line['duracion']."</td>
          <td>".date_spanish_format($line['ultimo_pago'])."</td>
          <td>".date_spanish_format($line['proximo_pago'])."</td>
          <td> RD$ ".CurrencyFormat($line['monto_pagado'])."</td>
          <td> RD$ ".CurrencyFormat($line['monto_total'])."</td>
          <td>". $line['estado']."</td>
          <td class='hide'>".$line['id_cliente']."</td>
          <td class='hide'>".$line['cedula']."</td>
        </tr>";
    }
    return $html_text;
  }
}


function make_extra_table($data,$start_at, $full = false){
  $html_text = " "; 
  $state = '';
  $row_class = '';
  $posible_states = array(
    'done'      => 'activo',
    'error'     => 'no activo',
    'process'   => '',
    'saldado'   => 'saldado',
    'cancelado' => 'cancelado',
    'mora'      => 'mora',
    'suspendido'=> 'suspendido',
    'exonerado' => 'exonerado',
    'en corte'  => 'en corte'
  );

  foreach ($data as $line) {
     $state = verify_state($line['estado'],$posible_states);
     $url = base_url()."process/details/{$line['id_cliente']}/extras";

     $row_class = ($state['row_class'] == 'active') ? '' : $state['row_class'];
      $html_text .= "<tr class='$row_class'>";

      if ($full) {
        $html_text .= "<td><a href='{$url}'><i class='material-icons'>search</i></a></td>";
      }else {
        $html_text .= "<td><a href='#' class='extra-delete' data-id-extra='".$line['id_extra']."'><i class='material-icons'>delete</i></a></td>";
      }

      $html_text .= "<td class='id_extra hide'>".$line['id_extra']."</td>
        <td class='id_servicio hide'>".$line['id_servicio']."</td>";

      if ($full == true) {
        $html_text .= "<td><a href='{$url}'>".$line['cliente']."</a></td>";
      }

      $html_text .= "<td class='hide'></td>
        <td>".date_spanish_format($line['fecha'])."</td>
        <td>".$line['servicio']."</td>
        <td>".date_spanish_format($line['ultimo_pago'])."</td>
        <td class='text-success'> RD$ ".CurrencyFormat($line['monto_pagado'])."</td>
        <td class='text-danger'> RD$ ".CurrencyFormat($line['deuda'])."</td>
        <td> RD$ ".CurrencyFormat($line['monto_total'])."</td>
        <td class='{$state['class']}'>".$line['estado']."</td>
      </tr>";
  }

  return $html_text;
}

if ( ! function_exists('make_cancelations_table')){
 function make_cancelations_table($data,$start_at){
   $html_text = " "; 
   foreach ($data as $line) {
       $html_text .= 
       "<tr>
         <td class='id_contrato'>".$line['id_contrato']."</td>
         <td class='th-client'>".$line['cliente']."</td>
         <td class='codigo'>".$line['direccion']."</td>
         <td >".phone_format($line['celular'])."</td>
         <td>".date_spanish_format($line['ultimo_pago'])."</td>
         <td class='codigo'>".$line['motivo']."</td>
         <td class='codigo'>".$line['ip']."</td>
         <td class='codigo'><a target='printframe' title='cancelacion de contrato' href='".base_url('process/getcancelcontract/'.$line['id_contrato'])."' class='error'><i class='material-icons'>description</i></a></td>
       </tr>";
   }
   return $html_text;
 }
}

if ( ! function_exists('make_caja_table')){

  function make_caja_table($data){
    $html_text = " "; 
    foreach ($data as $line) {
        $html_text .= "<tr>
        <td>".$line['id']."</td>
        <td>".$line['fecha']."</td>
        <td>".$line['descripcion']."</td>
        <td>RD$ ".CurrencyFormat($line['entrada'])."</td>
        <td>RD$ ".CurrencyFormat($line['salida'])."</td>
        <td>RD$ ".CurrencyFormat($line['saldo_actual'])."</td>
        <td>".$line['autor']."</td>
      </tr>";
    }

    return $html_text;
  }
}

if ( ! function_exists('make_averias_list')){

  function make_averias_list($data){
    $html_text = " "; 
    foreach ($data as $line) {
      $icono = 'check_box_outline_blank';
      $color = '#dF0a00';
      $fecha_class = 'hide';
        switch ($line['estado']) {
          case 'reparado':
            $icono = 'check_box';
            $color = '#1FD1A8';
            $fecha_class = '';
            break;
        }
        $html_text .= "<div class='averia-item'>
            <div class='top-row'>
              <div class='code'>".$line['id_averia']."</div>
              <div class='info'><span class='client-name'>".$line['cliente']. "</span><span class='client-direction'>::".$line['direccion']."</span> </span><span class='client-direction'>".
                "  <b>Celular: </b>".phone_format($line['celular'])."</span></div>
              <button class='btn-update-averia'>Actualizar</button> 
            </div>
            <div class='description'>
            <div class='text'>". ucfirst($line['descripcion'])."</div>
            </div>
            <div class='status-bar'>
              <span><i class='material-icons'>event</i> Fecha de Reporte: ".$line['fecha']."</span>
              <span class='$fecha_class' style='color:#06f'><i class='material-icons'>event</i> Fecha de Reparacion:".$line['fecha_reparacion']." </span>
              <span class='status' style='color: $color'><i class='material-icons'>$icono</i>". $line['estado']."</span></div>
            </div>";
    }

    return $html_text;
  }
}

if ( ! function_exists('make_installations_list')){

  function make_installations_list($data){
    $html_text = " "; 
    foreach ($data as $line) {
      $icono = 'check_box_outline_blank';
      $color = 'red';
        switch ($line['estado_instalacion']) {
          case 'en proceso':
            $icono = 'av_timer';
            $color = '#f60';
            break;
          case 'instalado':
            $icono = 'check_box';
            $color = 'green';
            break;
        }
        $html_text .= "<div class='averia-item'>
            <div class='top-row'>
              <div class='code'>".$line['id_contrato']."</div>
              <div class='info'><span class='client-name'>".$line['cliente']."</span><span class='client-direction'>::".$line['direccion']."</span></div>
              <button class='btn-update-installation'>Actualizar</button>
            </div>
            <div class='description'>
              <div class='date'>".$line['fecha']."</div>
              <div class='title-item'>Servicio :</div>
              <div class='text'>".$line['servicio']."</div>
            </div>
            <div class='status-bar'><span class='status' style='color: $color'><i class='material-icons'>$icono</i><span>".$line['estado_instalacion']."</span></span></div>
            </div>";
    }

    return $html_text;
  }
}


function make_contract_dropdown($data){
    $html_text = " "; 
    foreach ($data as $line) {
        $html_text .= "<option value='".$line['id_contrato']."'>";
        $html_text .= $line['id_contrato']."</option>";
    }
    return $html_text;
}

function make_other_services_dropdown($data){
    $html_text = " "; 
    foreach ($data as $line) {
        $html_text .= "<option value='".$line['nombre']."' data-payment='".$line['mensualidad']."'>";
        $html_text .= $line['nombre']."</option>";
    }
    return $html_text;
}

function make_users_list($data){
    $html_text = "<option value='%'> Todos </option>"; 
    foreach ($data as $line) {
      $html_text .= "<option value='".$line['user_id']."'>".$line['name']." ".$line['lastname']."</option>";
    }
    return $html_text;
}

function make_payment_list($data){
    $html_text = "";
    $count = 1;
    foreach ($data as $line) {
      $html_text .= "<option value='".$line['id_pago']."' data-contract='".$line['id_contrato']."' data-count='".$count."'>";
      $html_text .= $line['mes']."/".$line['anio']."</option>";
      $count++;
    }
    return $html_text;
}

function make_extra_payment_list($data){
  $html_text = "";
  foreach ($data as $line) {
    $html_text .= "<option value='{$line['id_pago']}' data-extra='{$line['id_extra']}'>";
    $html_text .= "{$line['concepto']}</option>";
  }
  return $html_text;
}

function make_next_payments_list($data){
  $html_text = " ";
  $link;
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
                        <div class='payment-month'>".$row['mes']."</div>
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
    $html_text = " "; 
    foreach ($data as $line) {
        $state = is_marked($line['estado'],'pagado');
        $is_abono = is_abono($line['concepto']);

        $html_text .= "<tr>
        <td><a href='#' class='payment-delete' data-id-pago='".$line['id_pago']."'><i class='material-icons'>delete</i></a></td>
        <td class='hide'>".$line['id_pago']."</td>
        <td class='hide'></td>
        <td class='$is_abono'>".$line['concepto']."</td>
        <td>RD$ ".CurrencyFormat($line['cuota'])."</td>
        <td>RD$ ".CurrencyFormat($line['mora'])."</td>
        <td>RD$ ".CurrencyFormat($line['monto_extra'])."</td>
        <td>RD$ ".CurrencyFormat($line['total'])."</td>
        <td class='{$state['class']}'>".date_spanish_format($line['fecha_pago'])."</td>
        <td class='{$state['class']}'>".$state['text']."</td>
        <td>".date_spanish_format($line['fecha_limite'])."</td>
        <td>";
          if($line['fecha_pago'] != null):
          $html_text .="<a  target='printframe' href='".base_url('process/getrecibo/'.$line['id_pago'])."'><i class='material-icons'>description</i></a>";
          endif;
        $html_text .="</td>
        <td> class='hide'".$line['id_contrato']."</td>
        <td><a href='#' class='payment-advanced' data-id-pago='".$line['id_pago']."'><i class='material-icons'>add</i></a></td>
        </tr>";
    }

    return $html_text;
  }
}

if ( ! function_exists('make_recibos_table')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_recibos_table($data,$start_at){
    $cont = $start_at + 1;
    $html_text = " "; 
    foreach ($data as $line) {
        $hora = new DATETIME($line['complete_date']);
        if(str_contains('abono',$line['concepto_real'])){
          $line['concepto'] = str_replace("Pago de",'Abono a',$line['concepto']);
        }
        if(str_contains('Cancelación',$line['concepto_real'])){
          $line['concepto'] = str_replace("Pago de",'Cancelación - ',$line['concepto']);
        }
      
        $html_text .= 
        "<tr>
        <td>".$cont."</td>
        <td>". $line['id_pago']."</td>
        <td>".$line['id_contrato']."</td>
        <td>".$line['cliente']."</td>
        <td>".$line['servicio']."</td>
        <td>".$line['concepto']."</td>
        <td> RD$ ".CurrencyFormat($line['total'])."</td>
        <td>".date_spanish_format($line['fecha'])."</td>
        <td>".$hora->format('g:i a')."</td>";
        $html_text .="</tr>";
     $cont+=1;
    }

    return $html_text;
  }
}
if ( ! function_exists('make_moras_history_table')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_moras_history_table($data,$start_at){
    $cont = $start_at + 1;
    $html_text = " "; 
    foreach ($data as $line) {
        $hora = new DATETIME($line['complete_date']);
        $html_text .= 
        "<tr>
        <td>".$cont."</td>
        <td>". $line['codigo']."</td>
        <td>".$line['cliente']."</td>
        <td>".$line['celular']."</td>
        <td> RD$ ".CurrencyFormat($line['cuota'])."</td>
        <td> RD$ ".CurrencyFormat($line['mora'])."</td>
        <td> RD$ ".CurrencyFormat($line['monto_extra'])."</td>
        <td> RD$ ".CurrencyFormat($line['total'])."</td>
        <td>".$line['fecha_limite']."</td>";
        $html_text .="</tr>";
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


// utils functions
if( !function_exists('get_user_data')){
  function get_user_data(){
    if(isset($_SESSION['user_data'])){
      $user = $_SESSION['user_data'];
      $fullname = $user['name']." ".$user['lastname'];
      if($user['type'] == 0){
        $type = "Administrador";
      }else{
        $type = "Secretaria(o)";
      }

      $user['fullname'] = $fullname;
      $user['typestr'] = $type;
      $user['password'] = '';

      return $user;
    }
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

function CurrencyFormat($number){
   $decimalplaces = 2;
   $decimalcharacter = '.';
   $thousandseparater = ',';
   return number_format($number,$decimalplaces,$decimalcharacter,$thousandseparater);
}

function number_to_words($number){
  $formatter = new \NumberFormatter('es', \NumberFormatter::SPELLOUT);
  return $formatter->format($number) . "\n";
}

function authenticate(){
  if(!isset($_SESSION['user_data'])){
		redirect(base_url());
	}
}

function auth_user_type($type){
  if($_SESSION['user_data']['type'] == $type){
    return true;
  }
  return false;
}

function get_role($type){
  $roles = ['admnistrador','secretaria(o)','tecnico'];
  return $roles[$type];
}

function auth_user_type_for_pages($page,$type,$redirect){
  $forbiden_sections[1] = array("administrador","reportes",'secciones');

  if(in_array($page,$forbiden_sections[$type]) && auth_user_type($type)){
    if($redirect){
      redirect($redirect);
    }
    return true;
  }
  return false;
}

function phone_format($tel){
  if(strlen($tel) == 10){
    return "(".substr($tel,0,3).")  ".substr($tel,3,3)."-".substr($tel,6,4);
  }
  return $tel;
}

function dni_format($dni){
  if(strlen($dni) == 11){
    return substr($dni,0,3)."-".substr($dni,3,7)."-".substr($dni,10);
  }
  return $dni;
}

function is_marked($estado,$comparison){
   $class['text']  = $estado;
   $class['class'] ='';

    if($estado== $comparison){
      $class['text'] = "&#10004;";
      $class['class'] = "done";
    }
  return $class;
}

function verify_state($state,$posible_states){
 $classes  = array(
    "done" => ['icon' => ACTIVO,'class' =>'active'],
    "error"=> ['icon' => INACTIVO,'class'=> "fail"],
    "process"=> ['icon'=> '','class'=>'process'],
    'saldado'=> ['icon'=>'','class'=>'marked'],
    'cancelado'=> ['icon'=>'','class'=>'cancel'],
    'mora'=> ['icon'=>MORA,'class'=> 'mora'],
    'suspendido'=> ['icon'=>SUSPENDIDO,'class'=>'suspendido'],
    'exonerado'=> ['icon'=>EXONERADO,'class'=>'exonerado'],
    'en corte'=> ['icon'=>EN_CORTE,'class'=>'en-corte']
    );
 
  foreach($posible_states as $key => $value) {
    if(trim($state) == $value){
      return array(
        'text'      => str_replace('%icon%',$classes[$key]['icon'],ICON)." ".$state,
        'class'     => str_replace(" ","-",$key),
        'row_class' => $classes[$key]['class']
      );
    }
  }
}

function date_spanish_format($english_date){
  if($english_date and $english_date != '0000-00-00'){
    $new_date = date('d M. Y',strtotime($english_date));
    $new_date = str_replace($GLOBALS['months_eng'],$GLOBALS['months_esp'],$new_date);
    return $new_date;
  }
  return '';
}

function is_abono($concept){
  if(str_contains('abono',$concept)){
    return $concept;
  }
  return '';
}

function str_contains($word_to_search,$string){

  if(strpos($string,$word_to_search) !== FALSE){
    return TRUE;
  }
  return FALSE;
}

function get_manifest(){
  $manifest = file_get_contents(base_url('assets/js/dist/assets/js/dist/manifest.json'));
  $manifest = json_decode($manifest, true);
  var_dump($manifest);

}