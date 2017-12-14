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
    return $this->db->insert('ic_caja_chica',$rows);
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
    return $this->db->insert('ic_caja_chica',$rows);

  }


  public function get_rows(){
    $result = $this->db->get('v_caja');
    echo make_caja_table($result->result_array());
  }

  public function search_in_rows($id_empleado = '%',$fecha = '%'){
    $mydatabase = $this->db;
    $sql = "SELECT * FROM v_caja WHERE id_empleado like".$mydatabase->escape($id_empleado)." AND date(fecha) like ".$mydatabase->escape($fecha);
    if($result = $this->db->query($sql)){
      $result = make_caja_table($result->result_array());
      echo $result;
    }else{
      echo " Error";
    }

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
