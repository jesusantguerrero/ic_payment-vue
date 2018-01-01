<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Payment_model extends CI_MODEL{

  public $id_pago = null;
  public $id_contrato;
  public $id_empleado = null;
  public $id_servicio = null;
  public $fecha_pago;
  public $concepto;
  public $detalles_extra ="";
  public $cuota;
  public $mora;
  public $monto_extra = 0;
  public $total;
  public $estado;
  public $fecha_limite;

  public function __construct(){
    parent::__construct();

    $this->load->helper('lib_helper');
    $this->load->model('contract_model');
  }

  private function organize_data($data, $mode){

    if($mode == "full"){
      $this->id_pago = $data['id_pago'];
    }
    if(isset($data['id_empleado'])){
      $this->id_empleado = $data['id_empleado'];
      $this->deuda   = $data['deuda'];
      $this->abono_a = $data['abono_a'];
      $this->detalles_extra = $data['detalles_extra'];
    }
    $this->id_contrato  = $data['id_contrato'];
    $this->id_servicio  = $data['id_servicio'];
    $this->fecha_pago   = $data['fecha_pago'];
    $this->concepto     = $data['concepto'];
    $this->cuota        = $data['cuota'];
    $this->mora         = $data['mora'];
    $this->total        = $data['total'];
    $this->estado       = $data['estado'];
    $this->fecha_limite = $data['fecha_limite'];
  }

  public function add($data){
    $this->organize_data($data,"normal");
      if($this->db->insert('ic_pagos',$this)){
        return true;
      }else{
        return false;
      }
  }

  public function get_payment($id, $as_receipt = false) {
    $table = ($as_receipt) ? "v_recibos" : "ic_pagos";
    $this->db->where('id_pago', $id);
    if ($result = $this->db->get($table)) {
      return $result->row_array();
    }
  }

  public function update($new_payment, $id_pago){
    $where = array('id_pago' => $id_pago);
    if($this->db->update('ic_pagos', $new_payment, $where)){
      return true;
    }
    return false;
  }

  public function check_for_update($id_pago){
    $sql = "SELECT estado from ic_pagos where id_pago =".$id_pago;
    $result = $this->db->query($sql);
    $result = $result->row_array()['estado'];
    if($result == "no pagado"){
        $this->update('complete_date','now()',false);
        if (!$pago['generado']) {
          $this->check_extras_fijos($id_pago);
        }
        return true;
      }else{
       return false;
    }

  }

  // Contract related options
  public function get_payments_of_contract($id_contrato, $mode= false){
    if ($mode == 'list') {
      $this->db->select("id_pago,id_contrato, monthname(fecha_limite) as mes, year(fecha_limite) as anio");
    } else if ($mode == 'table') {
      $this->db->order_by('-fecha_pago DESC,fecha_limite,complete_date','',false);
    }
    $this->db->where('id_contrato',$id_contrato);
    if ($result = $this->db->get("ic_pagos")) {
      if ($mode == 'table') {
        return make_payment_table($result->result_array(),0);
      }
      return $result->result_array();
    }
  }

  public function get_next_payment_of($id_contrato){
    $sql = "SELECT * FROM ic_pagos WHERE id_contrato = $id_contrato AND estado='no pagado' order by id_pago limit 1";
    $result = $this->db->query($sql);
    if($result){
      return $result->row_array();
    }else{
      return 0;
    }
  }

  public function count_unpaid_per_contract($id_contrato){
    $this->db->where('id_contrato',$id_contrato);
    $this->db->where('estado','no pagado');
    $result = $this->db->count_all_results('ic_pagos');
    if ($result){
      return $result;
    } else{
    return 0;
    }
  }

  public function count_of_contract($id_contrato = null){
    if($id_contrato == null){
      $id_contrato = $_SESSION['last_payment_id'];
    }
    $this->db->where('id_contrato',$id_contrato);
    $result = $this->db->count_all_results('ic_pagos');
    if($result){
      return $result;
    }else{
      return 0;
    }
  }

  public function get_last_pay_of($id_contrato){
    $sql = "SELECT * FROM ic_pagos WHERE id_contrato = $id_contrato and concepto not like '%abono%' order by id_pago desc limit 1";
    $result = $this->db->query($sql);
    if($result){
      return $result->row_array();
    }else{
      return 0;
    }
  }

  public function get_unpaid_per_contract($id_contrato){
    $this->db->where('id_contrato',$id_contrato);
    $this->db->where('estado','no pagado');
    $result = $this->db->get('ic_pagos');
    if($result){
      return $result->result_array();
    }
  }

  // Extra column related

  public function get_extras($id_pago, $get_values = false) {
    $pago = $this->get_payment($id_pago);
    if ($pago['servicios_adicionales']) {
      $extras = json_decode($pago["servicios_adicionales"],1);
      if (!$get_values) {
        return $extras;
      } else {
        $total_extras = 0;
        $string_detalles = "";
        $detalles_extras = [];

        foreach ($extras as $key => $extra) {
          $total_extras += $extra['precio'];
          $string_detalles .= "{$extra["servicio"]} -- ";
          array_push($detalles_extras, $extra);
        }

        return ["total" => $total_extras, "detalles" => $string_detalles, "array" => $detalles_extras];
      }
    }
  }

  public function save_extras($extras, $id_pago){
    $extras = json_encode($extras);
    return $this->update(["servicios_adicionales" => $extras], $id_pago);
  }

  public function set_extra($new_extra, $id_pago) { // [ id_extra => ["servicio" => 'reconexion', "precio => 2000]]
    $extras = $this->get_extras($id_pago);
    if (!$extras){
      $extras = $new_extra;
    } else {
      $key = join('',array_keys($new_extra));
      $extras[$key] = $new_extra[$key];
    }
    return $this->save_extras($extras, $id_pago);
  }

  public function delete_extra($key, $id_pago) {
    $extras = $this->get_extras($id_pago);
    if ($extras && null !== $extras[$key]) {
      unset($extras[$key]);
      if (count($extras) > 0) {
        return $this->save_extras($extras, $id_pago);
      } else {
        return $this->update(["servicios_adicionales" => null], $id_pago);
      }
    }
  }

  public function check_extras_fijos($id_pago, $id_contrato = false) {
    if (!$id_contrato) {
      $id_contrato = $this->get_payment($id_pago)['id_contrato'];
    }
    $pago = $this->get_payment($id_pago);
    $contract = $this->contract_model->get_contract($id_contrato);

    if ($contract['extras_fijos'] && $pago['abono_a'] == null && $pago['estado'] == "no pagado") {
      $this->set_extra([
        $contract['extras_fijos'] => [
          "servicio" => $contract['nombre_seguro'],
          "precio" => $contract['mensualidad_seguro']
        ]
      ], $id_pago);

      $this->reorganize_values($id_pago);
    }
  }

  public function reorganize_values($id_pago){
    $pago = $this->get_payment($id_pago);
    $extras = $this->get_extras($pago['id_pago'], true);

    $updated_data = array(
      'total'          => $pago['cuota'] + $extras['total'] + $pago['mora'],
      'monto_extra'    => $extras['total'],
      'detalles_extra' => $extras['detalles']
    );

    $this->update($updated_data, $pago['id_pago']);
  }


// Grafic Related Options

  public function month_income($month, $year){
    $sql = "SELECT sum(total) FROM v_recibos WHERE year(fecha_pago)= $year and month(fecha_pago)=$month";
    $result = $this->db->query($sql);
    $result = $result->row_array()['sum(total)'];
    if($result){
      return $result;
    }else{
      return 0;
    }
  }

  public function get_incomes_by_month($year){
    $result = array();
    for ($i=1; $i <= 12 ; $i++) {
      $value = $this->month_income($i, $year);
      array_push($result, $value);
    }
    $total = array_sum($result);
    return ['values' => $result, 'total' => $total];
  }

  public function day_income(){
    $now = date('Y-m-d');
    $sql = "SELECT sum(total) FROM v_recibos WHERE fecha_pago = '$now'";
    $result = $this->db->query($sql);
    $result->row_array()['sum(total)'];
    if ($result != null){
      return $result->row_array()['sum(total)'];
    }else{
      return 0;
    }
  }

  public function weekday_income($day){
    $sql = "SELECT sum(total) FROM v_recibos WHERE dayname(fecha_pago)='$day' and yearweek(fecha_pago) = yearweek(now())";
    $result = $this->db->query($sql);
    $result->row_array()['sum(total)'];
    if ($result != null){
      return $result->row_array()['sum(total)'];
    }else{
      return 0;
    }
  }

  public function get_moras_view($mode = 'normal'){
    if($mode == "group"){
      $result = $this->db->group_by('cliente');
    }
    $result = $this->db->get('v_morosos');
    return $result->result_array();
  }

  public function get_next_payments($expression = array('expression' => "1",'unit' => "MONTH")){
    $sql = "SELECT * FROM v_proximos_pagos WHERE fecha_limite BETWEEN now() and  adddate(now(), INTERVAL ".$expression["expression"]." ".$expression["unit"].")";
    if($result = $this->db->query($sql)):
      $result = $result->result_array();
      $result = make_next_payments_list($result);
      echo $result;
    else:
      echo " Error";
    endif;
  }

  public function get_moras_home(){
    $sql = "SELECT * FROM v_pagos_pendientes";
    $result = $this->db->query($sql)->result_array();
    $result = make_next_payments_list($result);
    echo $result;
  }

  public function get_sum_monto_total_of($id_contrato){
    $this->db->where('id_contrato',$id_contrato);
    $this->db->select_sum('cuota');
    $monto_total = $this->db->get('ic_pagos',1)->row_array()['cuota'];
    return $monto_total;

  }

}
