<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/

defined('BASEPATH') OR exit('No direct script access allowed');


if ( ! function_exists('make_payment_report')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_payment_report($data,$concept,$context){
    $cont = 0 + 1;
    $context->table->set_heading("Num","Pago","Cont","Cliente","Servicio","Concepto","Total","Hora"); 

    foreach ($data as $line) {
      $hora = new DATETIME($line['complete_date']);
      $context->table->add_row($cont,
      $line['id_pago'],
      $line['id_contrato'],
      $line['cliente'],
      $line['servicio'],
      $line['concepto'],
      "RD$ ".CurrencyFormat($line['total']),
      $hora->format('g:i a'));

     $cont+=1;
    }

    $html_text = $context->table->generate();
    $more['total'] = $context->report_model->get_total_payments("date(now())");
    $html_text .= "<div class='ganancia-total'>TOTAL DEL DIA: RD$ ".CurrencyFormat($more['total'])."<div>";
    set_report($html_text,$concept,$more);
   
  }
}

if ( ! function_exists('make_payment_report')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_payment_report($data,$concept,$context){
    $cont = 0 + 1;
    $context->table->set_heading("Num","Pago","Cont","Cliente","Servicio","Concepto","Total","Hora"); 

    foreach ($data as $line) {
      $hora = new DATETIME($line['complete_date']);
      $context->table->add_row($cont,
      $line['id_pago'],
      $line['id_contrato'],
      $line['cliente'],
      $line['servicio'],
      $line['concepto'],
      "RD$ ".CurrencyFormat($line['total']),
      $hora->format('g:i a'));

     $cont+=1;
    }

    $html_text = $context->table->generate();
    $more['total'] = $context->report_model->get_total_payments("date(now())");
    $html_text .= "<div class='ganancia-total'>TOTAL DEL DIA: RD$ ".CurrencyFormat($more['total'])."<div>";
    set_report($html_text,$concept,$more);
   
  }
}

if ( ! function_exists('make_installation_report')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  * @param boolean true para imprimir y false para no imprimir xD
  *@return string the tbody with rows of a table 
  */ 

  function make_installation_report($data,$concept,$context,$for_print){
    $cont = 0 + 1;
    $context->table->set_heading("Num","Cliente","Direccion","Celular","Fecha de Requerimiento","Servicio"); 

    foreach ($data as $line) {
      $context->table->add_row($cont,
      $line['cliente'],
      $line['direccion'],
      $line['celular'],
      $line['fecha'],
      $line['servicio']);

     $cont+=1;
    }

    $html_text = $context->table->generate();
    if($for_print):
      set_report($html_text,$concept,$more);
    else:
      return $html_text;
    endif;
  }
}

if( ! function_exists('set_report')){
  function set_report($report_body,$concept,$more,$context){
     $_SESSION['reporte'] = array('cuerpo' => $report_body, 'concepto' => $concept, 'mas' => $more);
  }

}

if( ! function_exists('get_report')){
 function get_report(){
    return $_SESSION['reporte'];
  }

}

if( ! function_exists('erase_report')){
  function erase_report(){
    session_unset($_SESSION['reporte']);
  }
}
  

  

  