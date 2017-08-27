<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Caja_mayor extends CI_MODEL{

  private $id_empleado;
  
  public function __construct(){
    parent::__construct();
     
    if(isset($_SESSION['user_data'])){
      $this->id_empleado = $_SESSION['user_data']['user_id'];
    }
    
  }

  public function add_cierre($data){
    $this->db->select('id_cierre');
    $this->db->where('fecha',$data['fecha']);
    $id_cierre = $this->db->count_all_results('ic_caja_mayor');
    if(!$id_cierre){
      if($this->db->insert('ic_caja_mayor',$data)){
        $response['mensaje'] =  MESSAGE_SUCCESS." Cierre exitoso";
      }else{
        $response['mensaje'] = MESSAGE_ERROR." error al agregar el cierre".$this->db->last_query();
      }
      echo json_encode($response);
    }else{
      $this->update_cierre($data,$id_cierre);
    }
    
  }

  public function update_cierre($data,$id_cierre){
    $this->db->where('id_cierre',$id_cierre);
    if($this->db->update('ic_caja_mayor',$data)){
      $response['mensaje'] =  MESSAGE_SUCCESS." Cierre Actualizado";
    }else{
      $response['mensaje'] = MESSAGE_ERROR." error al agregar el cierre".$this->db->last_query();
    }
    echo json_encode($response);
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
      echo MESSAGE_ERROR." hubo un error en la transaccion:". " Error";
    }  
  }

  public function add_gasto($data){
    if($this->db->insert('ic_gastos',$data)){
      $response['mensaje'] =  MESSAGE_SUCCESS." Gasto agregado";
      $response['gastos']  = $this->mostrar_ultimo_gasto($data['fecha']);
      $response['total_gastos'] = $this->get_total_gastos_of($data['fecha']);
      echo json_encode($response);
    }else{
      echo MESSAGE_ERROR." error al agregar este gasto".$this->db->last_query();
    }
  }

  public function mostrar_gastos($fecha,$mode="normal"){
    $this->db->where('fecha',$fecha);
    $result = $this->db->get('ic_gastos');
    if($mode == "normal"){
      return json_encode($result->result_array());
    }else if($mode == "full"){
      $response['mensaje'] =  MESSAGE_INFO." Mostrando Gastos";
      $response['gastos']  = $result->result_array();
      $response['total_gastos'] = $this->get_total_gastos_of($fecha);
      echo json_encode($response);
    }else{
      return $result->result_array();
    }
  }

  public function mostrar_ultimo_gasto($fecha){
    $this->db->where('fecha',$fecha);
    $this->db->order_by('id_gasto',"DESC");
    $result = $this->db->get('ic_gastos',1);
    return json_encode($result->result_array());
  }

  public function get_total_gastos_of($fecha){
    $this->db->where('fecha',$fecha);
    $this->db->select_sum('monto');
    $result = $this->db->get('ic_gastos',1);
    if($result){
      $result = $result->row_array()['monto'];
      if(!$result){
        return 0;
      }
      return $result;
    }else{
      return 0;
    }
  }

  public function delete_gasto($data){
    $this->db->delete('ic_gastos',array('id_gasto' => $data['id']));
    $response['mensaje'] =  MESSAGE_SUCCESS." Gasto eliminado";
    $response['gastos']  = $this->mostrar_gastos($data['fecha'],"after_delete");
    $response['total_gastos'] = $this->get_total_gastos_of($data['fecha']);
    echo json_encode($response);
  }

  public function mostrar_monedas(){
    $result = $this->db->get('ic_monedas');
    echo json_encode($result->result_array());
  }

  public function get_ingresos($fecha,$tipo,$not_in = null){
    $tabla = 'v_recibos';
    $where = array('fecha'=> $fecha);
    $this->db->where("fecha_pago = '$fecha' and tipo = '$tipo'");
    $this->db->where_not_in('tipo',$not_in);
    $this->db->select_sum('total');

    if($ingreso = $this->db->get($tabla,1) and $ingreso != null){
      $ingreso =  $ingreso->row_array()['total'];
      if($ingreso != null ){
        return $ingreso;
      }
      return "0";
    }else{
      return '0';
    }
  }

  public function get_extras_or_recibos($fecha,$concepto,$not_in = null){
    $tabla = 'ic_pagos';
    $where = array('fecha'=> $fecha);
    $this->db->where("fecha_pago= '$fecha' and estado= 'pagado' and concepto like '%$concepto%'")
    ->where_not_in('concepto',$not_in)
    ->select_sum('total');
    
    if($ingreso = $this->db->get($tabla,1) and $ingreso != null){
      $ingreso = $ingreso->row_array()['total'];
      if($ingreso != null){
        return $ingreso;
      }
      return 0;
    }else{
      return 0;
    }
  }



}