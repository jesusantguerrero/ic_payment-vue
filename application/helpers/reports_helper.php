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


if ( ! function_exists('make_payment_report')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_payment_report($data,$concept,$context){
    $cont = 0 + 1;
    $context->table->set_heading("Num","Pago","Cont","Cliente","Servicio","Total","Hora"); 

    foreach ($data as $line) {

    $context->table->add_row($cont,
      $line['id_pago'],
      $line['id_contrato'],
      $line['cliente'],
      $line['servicio'],
      "RD$ ".CurrencyFormat($line['total']),
      $line['hora']);

     $cont+=1;
    }

    $html_text = $context->table->generate();
    set_report_in_memory($html_text,$concept);
   
  }


  function set_report_in_memory($report_body,$concept){
     $_SESSION['reporte'] =array('cuerpo' => $report_body, 'concepto' => $concept);
  }

  function get_report_in_memory(){
    return $_SESSION['reporte'];
  }

  function erase_report_in_memory(){
    echo "hola";
  }

}
