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
        $type = "Secretaria(o)";
      }

      $user['fullname'] = $fullname;
      $user['typestr'] = $type;
      $user['password'] = '';

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
        <td> RD$ ".CurrencyFormat($line['monto_pagado'])."</td>
        <td> RD$ ".CurrencyFormat($line['monto_total'])."</td>
        <td class='td-estado'>".$line['estado']."</td>
      </tr>";
     $cont+=1;
    }

    return $html_text;
  }
}

if ( ! function_exists('make_main_contract_table')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_main_contract_table($data,$start_at){
    $cont = $start_at + 1;
    $html_text = " "; 
    foreach ($data as $line) {
        $html_text .= "<tr>
        <td class='id_contrato'>".$line['id_contrato']."</td>
        <td class='codigo'>".$line['codigo']."</td>
        <td class='th-client 'data-id-cliente='".$line['id_cliente']."' data-cedula='".$line['cedula']."'>".$line['cliente']."</td>
        <td>".$line['fecha']."</td>
        <td>".$line['servicio']."</td>
        <td>".$line['duracion']."</td>
        <td>".$line['ultimo_pago']."</td>
        <td>".$line['proximo_pago']."</td>
        <td> RD$ ". CurrencyFormat($line['monto_pagado'])."</td>
        <td> RD$ ".CurrencyFormat($line['monto_total'])."</td>
      </tr>";
     $cont+=1;
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
      $color = 'red';
        switch ($line['estado']) {
          case 'en proceso':
            $icono = 'av_timer';
            $color = '#f60';
            break;
          case 'reparado':
            $icono = 'check_box';
            $color = 'green';
            break;
        }
        $html_text .= "<div class='averia-item'>
            <div class='top-row'>
              <div class='code'>".$line['id_averia']."</div>
              <div class='info'><span class='client-name'>".$line['cliente']."</span><span class='client-direction'>::".$line['direccion']."</span></div>
              <button class='btn-update-averia'>Actualizar</button>
            </div>
            <div class='description'>
              <div class='date'>".$line['fecha']."</div>
              <div class='title-item'>Averia :</div>
              <div class='text'>".$line['descripcion']."</div>
            </div>
            <div class='status-bar'><span class='status' style='color: $color'><i class='material-icons'>$icono</i><span>".$line['estado']."</span></span></div>
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
              <div class='code'>".$line['id_pago']."</div>
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
        $html_text .= $line['id_contrato']." ".$line['fecha']."</option>";
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
        <td>RD$ ".CurrencyFormat($line['cuota'])."</td>
        <td>RD$ ".CurrencyFormat($line['mora'])."</td>
        <td>RD$ ".CurrencyFormat($line['monto_extra'])."</td>
        <td>RD$ ".CurrencyFormat($line['total'])."</td>
        <td>".$line['fecha_pago']."</td>
        <td class='td-estado'>".$line['estado']."</td>
        <td>".$line['fecha_limite']."</td>
        <td class='id_pago' data-id='".$line['id_pago']."'>";
          if($line['fecha_pago'] != null):
          $html_text .="<a  target='_blank' href='".base_url('process/getrecibo/'.$line['id_pago'])."'><i class='material-icons'>description</i></a>";
          endif;
        $html_text .="</td>
      </tr>";
     $cont+=1;
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
        $html_text .= 
        "<tr>
        <td>".$cont."</td>
        <td>". $line['id_pago']."</td>
        <td>".$line['id_contrato']."</td>
        <td>".$line['cliente']."</td>
        <td>".$line['servicio']."</td>
        <td>".$line['concepto']."</td>
        <td> RD$ ".CurrencyFormat($line['total'])."</td>
        <td>".$line['fecha']."</td>
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

function set_last_query($lastquery){
  $_SESSION['lastquery'] = $lastquery;
}

function get_last_query(){
  return $_SESSION['lastquery'];
}

function set_to_session($lastquery){
  $_SESSION['id_contrato'] = $lastquery;
}

function get_from_session(){
  return $_SESSION['id_contrato'];
}


function set_last_page($lastquery){
  $_SESSION['lastpage'] = $lastquery;
}

function get_last_page(){
  return $_SESSION['lastpage'];
}

function authenticate(){
  if(!isset($_SESSION['user_data'])){
		redirect(base_url());
	}
}
function auth_user_type($type){
  if($_SESSION['user_data']['type'] = $type){
    return true;
  }
  return false;
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