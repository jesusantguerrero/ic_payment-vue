<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Extra_model extends CI_MODEL{
  
  private $id_empleado;

  public function __construct(){
    parent::__construct();
  }

  public function add_extra($data){
    if($this->db->insert('ic_servicios_extra',$data)){
      echo MESSAGE_SUCCESS." extra agregado";
    }else{
      echo MESSAGE_ERROR." error al agregar este gasto";
    }
  }

  public function update_extra($data,$id_extra){
    $this->db->where('id_extra',$id_extra);
    if($this->db->update('ic_servicios_extra',$data)){
      return true;
    }else{
      return false;
    }
  }

  public function delete_extra($data){
    $this->db->delete('ic_servicios_extra',array('id_extra' => $data['id']));
    $response['mensaje'] =  MESSAGE_SUCCESS." Gasto eliminado";
    $response['extras']  = $this->get_all_of_client($data['id_cliente']);
    echo json_encode($response);
  }

  public function get_all_of_client($id_cliente){
    $this->db->where('id_cliente',$id_cliente);
    $result = $this->db->get('ic_servicios_extra');
    return make_extra_table($result->result_array(),0);
  }

  public function generate_extra_payment($data){
    $hoy = date('Y-m-d');
    $id_empleado = $_SESSION['user_data']['user_id'];
    $detalles_extra = 'por editar';

    $data_extra = array(
      'id_extra'    => $data['id_extra'],
      'id_servicio' => $data['id_servicio'],
      'fecha_pago'  => $hoy,
      'concepto'    => "extra ($detalles_extra)",
      'estado'      => 'no pagado',
      'detalles_extra' => $detalles_extra,
      'id_empleado' => $id_empleado,
      'fecha_limite'=> ''
    );

    if($this->db->insert('ic_pagos',$data_extra)){
      $response['mensaje'] = "Pago Generado";
      $response['pagos'] = $this->get_all_of_extra($data['id_extra']);
    }else{
      $response['mensaje'] = "error al guardar pago";
    }
    echo json_encode($response);

  }

  public function delete_generated_payment($id_extra,$data){

  }

  public function get_all_of_extra($id_extra){
    $this->db->where('id_extra',$id_extra);
    $this->db->order_by('id_pago',"DESC");
    $result = $this->db->get('ic_pagos');
    return make_extra_payment_list($result->result_array(),0);
  }

  public function get_extra($id_extra){
    $this->db->where('id_extra',$id_extra);
    $result = $this->db->get('ic_servicios_extra');
    return $result->result_array()[0];
  }

  public function apply_payment($data,$info){
    $extra = $this->get_extra($info['id_extra']);
    
    $this->db->trans_start();
    
    $this->payment_model->update($data,$info['id_pago']);
    $monto_pagado = $this->get_monto_pagado_of($info['id_extra']);
    $deuda = $extra['monto_total'] - $monto_pagado;
    $this->payment_model->update(['deuda' => $deuda],$info['id_pago']);

    if($monto_pagado >= $extra['monto_total']){
      $estado = "saldado";
    }else{
      $estado = "activo";
    }

    $data_extra = array(
      'monto_pagado'  => $monto_pagado,
      'ultimo_pago'   => $data['fecha_pago'],
      'estado'        => $estado
    );

    $this->update_extra($data_extra,$info['id_extra']);
    $this->db->trans_complete();

    if($this->db->trans_status() === false){
      $response['mensaje'] = MESSAGE_ERROR. "No se ha podido registrar el pago";
    }else{
      $response['mensaje'] = MESSAGE_SUCCESS. " Pago realizado con exito";
      $response['extras'] = $this->get_all_of_client($extra['id_cliente']);
    }

    echo json_encode($response);
  }

  public function delete_payment($data){
    $extra = $this->get_extra($data['id_extra']);
    
    $this->db->trans_start();
    
    $this->db->delete('ic_pagos',array('id_pago'=>$data['id_pago']));
    
    $monto_pagado = $this->get_monto_pagado_of($data['id_extra']);
    $ultimo_pago  = $this->get_last_payment_date_of($data['id_extra']);
    
    if($monto_pagado >= $extra['monto_total']){
      $estado = "saldado";
    }else{
      $estado = "activo";
    }
    
    $data_extra = array(
      'monto_pagado'  => $monto_pagado,
      'ultimo_pago'   => $ultimo_pago,
      'estado'        => $estado
    );
    
    $this->update_extra($data_extra,$data['id_extra']);
    $this->db->trans_complete();

    if($this->db->trans_status() === false){
      $response['mensaje'] = MESSAGE_ERROR. " No se ha podido registrar el pago";
    }else{
      $response['mensaje'] = MESSAGE_INFO. " Pago Eliminado con exito";
      $response['extras'] = $this->get_all_of_client($extra['id_cliente']);
    }

    echo json_encode($response);
  }

  public function get_monto_pagado_of($id_extra){
    $this->db->where('id_extra', $id_extra);
    $this->db->select_sum('cuota');
    $monto_pagado = $this->db->get('ic_pagos',1)->row_array()['cuota'];
    return $monto_pagado;
  }

  public function get_last_payment_date_of($id_extra){
    $this->db->where('id_extra',$id_extra)->where('estado','pagado');
    $this->db->select('fecha_pago');
    $this->db->order_by('fecha_pago',"DESC");
    return $this->db->get('ic_pagos',1)->row_array()['fecha_pago'];
  }

}
