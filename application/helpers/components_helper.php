<?php
/**
* Payment Plus
*@author Jesus Guerrero
*@copyright Copyright (c) 2018 Jesus Guerrero
*@version 1.0.0
*
*/

defined('BASEPATH') OR exit('No direct script access allowed');
if ( ! function_exists('make_user_table')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table
  */

  function make_user_table($data,$start_at){
    $types = array("Administrador","Secretaria(o)","Otro");
    $cont = $start_at + 1;
    $html_text = " ";
    foreach ($data as $line) {
        if ($line['active']) {
          $button_text  = 'Activo';
          $btn_class = 'btn-primary';
        } else {
          $button_text  =  'Desactivado';
          $btn_class = 'btn-danger';
        }
        $html_text .= "
        <tr>
          <td>".$cont."</td>
          <td class='user-id hide'>".$line['user_id']."</td>
          <td>".$line['nickname']."</td>
          <td>".$line['name']."</td>
          <td>".$line['lastname']."</td>
          <td>".dni_format($line['dni'])."</td>
          <td>".$types[$line['type']]."</td>
          <td><button data-active='{$line['active']}' class='btn-change-state $btn_class'>{$button_text}</button></td>
          <td class='hide'>".$line['type']."</td>
          <td>
            <i class='material-icons btn-action edit-user'>edit</i>
            <i class='material-icons btn-action delete-user'>delete</i>
            <i class='material-icons btn-action display-user'>find_in_page</i>
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

        $state = verify_state($line['estado'], $posible_states);
        $html_text .= "<tr>
        <td>".$cont."</td>
        <td class='hide'></td>
        <td class='id_cliente hide'>". $line['id_cliente']. "</td>
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
          <td class='documents'>";
          $html_text .="<a  target='printframe' title='imprimir contrato' href='".base_url('contract/get_requirements/'.$line['id_contrato'])."/contrato'><i class='material-icons'>description</i></a>";
          if($line['estado'] == 'cancelado'):
            $html_text .="<a target='printframe' title='cancelacion de contrato' href='".base_url('contract/get_cancel_contract/'.$line['id_contrato'])."' class='error'><i class='material-icons'>description</i></a>";
          elseif ($line['estado'] == 'saldado'):
            $html_text .="<a target='_blank' title='Termino de contrato' href='".base_url('contract/get_cancel_contract/'.$line['id_contrato'])."/true' class='text-success'><i class='material-icons'>description</i></a>";
          endif;
          if ($line['extras_fijos']):
            $html_text .= "<i class='material-icons text-primary' title='{$line['nombre_seguro']} {$line['mensualidad_seguro']}'>lock</i>";
          endif;
          $html_text.="</td>
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
  $posible_states = [
    'done'      => 'activo',
    'error'     => 'no activo',
    'process'   => '',
    'saldado'   => 'saldado',
    'cancelado' => 'cancelado',
    'mora'      => 'mora',
    'suspendido'=> 'suspendido',
    'exonerado' => 'exonerado',
    'en corte'  => 'en corte'
  ];

  foreach ($data as $line) {
     $state = verify_state($line['estado'],$posible_states);
     $url = base_url()."app/details/{$line['id_cliente']}/extras";

     $row_class = ($state['row_class'] == 'active') ? '' : $state['row_class'];
      $html_text .= "<tr class='$row_class'>";

      if ($full) {
        $html_text .= "<td><a href='{$url}'><i class='material-icons'>search</i></a></td>";
      }else {
        $html_text .= "
          <td>
            <i class='material-icons btn-action delete-extra'>delete</i>
            <i class='material-icons btn-action pay-extra'>payment</i>
          </td>";
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
         <td class='codigo'><a target='printframe' title='cancelacion de contrato' href='".base_url('contract/get_cancel_contract/'.$line['id_contrato'])."' class='error'><i class='material-icons'>description</i></a></td>
       </tr>";
   }
   return $html_text;
 }
}

if ( ! function_exists('make_petty_cash_table')){

  function make_petty_cash_table($data){
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
        <td>
          <i class='material-icons btn-action edit-transaction'>edit</i>
          <i class='material-icons btn-action delete-transaction'>delete</i>
          <i class='material-icons btn-action display-transaction'>find_in_page</i>
        </td>
      </tr>";
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

function make_users_list($data){
    $html_text = "<option value='0'> Todos </option>";
    foreach ($data as $line) {
      $html_text .= "<option value='".$line['user_id']."'>".$line['name']." ".$line['lastname']."</option>";
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
        <td>
          <i class='material-icons btn-action delete-payment'>delete</i>
          <i class='material-icons btn-action pay-payment'>payment</i>
        </td>
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
          $html_text .="<a  target='printframe' href='".base_url('payment/get_receipt/'.$line['id_pago'])."'><i class='material-icons'>description</i></a>";
          endif;
        $html_text .="</td>
        <td> class='hide'".$line['id_contrato']."</td>
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

function make_simple_table ($data, $start_at, $fields) {
  $html_text = " ";

  foreach ($data as $line) {
    $html_text .= "<tr>";

    foreach ($fields as $field) {
      $html_text .= table_cell($field,$line);
    }
    $html_text .= "</tr>";
  }
  return $html_text;
}

function table_cell($field, $row) {
  $text = $row[$field['name']];

  switch($field['type']){
    case 'phone':
      $text = phone_format($text);
      break;
    case 'date':
      $text =  date_spanish_format($text);
      break;
    case 'currency':
      $text = "RD$ ".CurrencyFormat($text);
      break;
  }

  return "<td class='{$field['classes']}'>{$text}</td>";
}

function table_field($name, $classes = null, $type = 'text') {
  return [
    'name'   => $name,
    'classes' => $classes,
    'type'    => $type
  ];
}
