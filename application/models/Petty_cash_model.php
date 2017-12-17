<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Petty_cash_model extends CI_MODEL{

  private $user_id;
  private $table;
  private $view;

  public function __construct(){
    parent::__construct();
    $this->table = 'ic_caja_chica';
    $this->view = 'v_caja';

    if(isset($_SESSION['user_data'])){
      $this->user_id = $_SESSION['user_data']['user_id'];
    }

  }

  private function order_data($data) {
    return [
      'id'   => null,
      'id_empleado' => $this->user_id,
      'descripcion' => $data['descripcion'],
      'entrada'     => $data['entrada'],
      'salida'      => 0,
    ];
  }

  public function add_transaction($data){
    $saldo_actual = $this->get_balance();
    $rows = $this->order_data($data);
    return $this->db->insert($this->table, $rows);
  }

  public function edit_transaction($data, $id) {
    $this->db->where('id', $id);
    return $this->db->update($this->table);
  }

  public function delete_transaction($id) {
    $this->db->where('id', $id);
    return $this->db->delete($this->table);
  }

  public function get_rows($user_id = '', $start = ''){
    $this->db->like('id_empleado',$user_id);
    if ($start !== '') {
      $this->db->where("date(fecha) == '$start'", false);
    }
    $result = $this->db->get($this->view);
    return make_petty_cash_table($result->result_array());
  }

  public function get_balance(){
    $this->db->select('sum(entrada) as ingresos, sum(salida) as salidas', false);
    if($balance = $this->db->get($this->table, 1)):
     $balance = $balance->row_array();
     return $balance['ingresos'] - $balance['salidas'];
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
