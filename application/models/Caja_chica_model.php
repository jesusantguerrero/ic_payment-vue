<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Caja_chica_model extends CI_MODEL{

  
  #$id_averia = null;
  #id_cliente 
  #descripcion 
  #fecha
  #estado
  private $id_empleado;
  
  public function __construct(){
    parent::__construct();
    $this->load->database();
    if(isset($_SESSION['user_data'])){
      $this->id_empleado = $_SESSION['user_data']['user_id'];
    }
    
  }

  public function add_money($data){
    $saldo_actual = $this->get_last_saldo();
    $rows = array(
      'id'   => null,
      'id_empleado' => $this->id_empleado,
      'descripcion' => $data['descripcion'],
      'entrada'     => $data['entrada'],
      'salida'      => 0,
      'saldo_actual'=> $saldo_actual + $data['entrada']
    );
    if($this->db->insert('ic_caja_chica',$rows)){
      echo MESSAGE_SUCCESS."Trasacción Realizada con exito";
    }else{
      echo MESSAGE_ERROR." hubo un error en la transaccion:". $this->db->last_query();
    }  
  }

  public function retire_money($data){
    $saldo_actual = $this->get_last_saldo();
    $rows = array(
      'id'   => null,
      'id_empleado' => $this->id_empleado,
      'descripcion' => $data['descripcion'],
      'entrada'     => 0,
      'salida'      => $data['salida'],
      'saldo_actual'=> $saldo_actual - $data['salida']
    );
    if($this->db->insert('ic_caja_chica',$rows)){
      echo MESSAGE_SUCCESS."Trasacción Realizada con exito";
    }else{
      echo MESSAGE_ERROR." hubo un error en la transaccion:". $this->db->last_query();
    }

  }


  public function get_rows(){
    $sql = "SELECT * FROM v_caja";
    set_last_query($sql);
    $sql .= " LIMIT 5";
    set_last_page($sql);
    $result = $this->db->query($sql);
    $result = make_caja_table($result->result_array());
    echo $result;
  }

  public function get_for_print(){
    $result = $this->db->query(get_last_query());
    $result = make_caja_table($result->result_array());
    $style = "th{background:#06f;}";
    $cuerpo ="<HTML>
              <head>
                <TITLE>::. Exportacion de Datos .::</TITLE>
                <link rel='stylesheet' href='".base_url('assets/css/main.css')."'/>
              </head>
              <body>";
    $header = "<table border='1'>
            <thead>            
            <tr>
              <th>COD</th>
              <th>Fecha de Trasaccion</th>
              <th>Descripcion</th>
              <th>Ingreso</th>
              <th>Salida</th>
              <th>Saldo de Caja</th>
              <th>Hecha Por</th>
            </tr>
            </thead>
            <tbody>";
    $footer = "</tbody>
              </table>
              </body>";
    return $cuerpo.$header.$result.$footer;
  }

  public function get_last_saldo(){
    $this->db->select('saldo_actual');
    $this->db->order_by('fecha','DESC');
    if($saldo = $this->db->get('ic_caja_chica',1)):
      return $saldo->row_array()['saldo_actual'];
    else:
      return 0.00;
    endif;
  }

  public function count(){
    $result = $this->db->query(get_last_query());
    $result = $result->result_array();
    if($result){
      return count($result);
    }else{
      return 0;
    }
  }

  public function paginate($offset,$perpage){
    $sql = get_last_query()." LIMIT ".$offset.", ".$perpage;
    set_last_page($sql);
    $result = $this->db->query($sql);
    if($result){
      $result = make_caja_table($result->result_array(),$offset);
      echo $result;
    }else{
      echo $sql;
    } 
  }

  public function last_page(){
    $result = $this->db->query(get_last_page());
    if($result){
      $result = make_caja_table($result->result_array());
      echo $result;
    }  
  } 

  public function get_transactions_per_month($field){
    $resultado_por_mes = array();
    
    for ($i=1; $i <= 12 ; $i++) { 
      $sql = "SELECT sum($field) from ic_caja_chica where year(fecha) = year(now()) and month(fecha)= $i";
      $result = $this->db->query($sql)->row_array()["sum($field)"];
      if($result){
        $value = $result; 
      }else{
        $value = "0";
      }
      array_push($resultado_por_mes,$value);
    }
    return $resultado_por_mes;
  }

  public function get_balance_per_month(){
    $resultado_por_mes = array();
    
    for ($i=1; $i <= 12 ; $i++) { 
      $sql = "SELECT saldo_actual from ic_caja_chica where year(fecha) = year(now()) and month(fecha)= $i order by fecha desc";
      $result = $this->db->query($sql)->row_array()["saldo_actual"];
      if($result){
        $value = $result; 
      }else{
        $value = "0";
      }
      array_push($resultado_por_mes,$value);
    }
    return $resultado_por_mes;
  }
}