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
    $this->db->order_by('id_cierre','DESC');
    if($id_cierre = $this->db->get('ic_caja_mayor',1)):
      $id_cierre  = $id_cierre->row_array()['id_cierre'];
    endif;
    if(!$id_cierre){
      if($this->db->insert('ic_caja_mayor',$data)){
        $response['mensaje'] =  MESSAGE_SUCCESS." Cierre exitoso"  ;
      }else{
        $response['mensaje'] = MESSAGE_ERROR." error al agregar el cierre";
      }
    }else{
      $response['mensaje'] = MESSAGE_ERROR." El cierre del dia ya ha sido realizado";
    }
    echo json_encode($response);

  }

  public function get_cierres($text, $first_date = null, $second_date = null) {
    $first_date = ($first_date) ? $first_date :  $this->get_first_close_date();
    $second_date = ($second_date) ? $second_date : date('Y-m-d');
    $where = "fecha between '$first_date' and '$second_date'";

    $this->db->order_by("fecha DESC");
    $this->db->where($where,'',false);
    $this->db->like('autor',$text);

    if ($result = $this->db->get('ic_caja_mayor')) {
      $result = $result->result_array();
      $_SESSION['cierres_last_call'] = $result;

      $acum = $this->db->where($where,'',false)
              ->like('autor',$text)
              ->select_sum('pagos_facturas')
              ->select_sum('pagos_extras')
              ->select_sum('pagos_efectivo')
              ->select_sum('pagos_banco')
              ->select_sum('total_ingresos')
              ->select_sum('efectivo_caja')
              ->select_sum('total_descuadre')
              ->select_sum('total_gastos')
              ->select_sum('banco')
              ->get('ic_caja_mayor',1);

      $totals = $acum->row_array();
      $acum = array_values($totals);
      $totals = array_merge($totals,array('first_date' => $first_date, 'second_date' => $second_date));
      $_SESSION['cierres_last_total'] = $totals;

      $fields = [
        table_field('id_cierre'),
        table_field('fecha','','date'),
        table_field('pagos_facturas','','currency'),
        table_field('pagos_extras','','currency'),
        table_field('pagos_efectivo','','currency'),
        table_field('pagos_banco','','currency'),
        table_field('total_ingresos','','currency'),
        table_field('efectivo_caja','','currency'),
        table_field('total_descuadre','text-danger','currency'),
        table_field('total_gastos','text-danger','currency'),
        table_field('banco','text-primary','currency'),
        table_field('autor')
      ];

      $result = make_simple_table($result,0,$fields);
      return ['content' => $result, 'acum' => $acum];
    }
  }

  public function cierres_report($type = null) {
    if($_SESSION['expenses_last_call']){
      if (!$type) {
        $header = ['No.','Fecha','P. Factura', 'P. Extras','P. Efectivo', 'P. Banco', 'Total Ingresos', 'Efe Caja', 'Descuadre','Gastos','Banco','Autor'];
        $fields = ['fecha', 'pagos_facturas', 'pagos_extras', 'pagos_efectivo','pagos_banco','total_ingresos','efectivo_caja','total_descuadre','total_gastos','banco','autor'];
        $result = $_SESSION['cierres_last_call'];
        make_general_report($result,"Reporte de Cierres de Caja",$this,$fields, $header);
      } else {
        return $_SESSION['cierres_last_total'];

      }
    }
  }



  public function get_last_cierre(){
    $this->db->select("pagos_facturas as pago_de_facturas,
    pagos_extras as pagos_de_extras,
    total_ingresos as total_de_ingresos,
    pagos_banco as pagos_via_banco,
    pagos_efectivo as pagos_en_efectivo,
    efectivo_caja as dinero_real_en_caja,
    total_descuadre,
    total_gastos,
    banco,
    autor,
    fecha");
    $this->db->order_by('id_cierre','DESC');

    if($result = $this->db->get('ic_caja_mayor',1)):
      $result = $result->result_array()[0];
      $response['autor']  = $result['autor'];
      $response['fecha']  = date_spanish_format($result['fecha']);
      $response['cierre'] = $result;
      unset($result['autor']);
      unset($result['fecha']);
      $response['labels'] = array_keys($result);
      $response['values'] = array_values($result);
    else:
      $response['autor'] = 'n/a';
      $response['fecha'] = 'n/a';
      $response['labels'] = 'n/a';
      $response['values'] = 'n/a';
    endif;
      echo json_encode($response);
  }

  public function get_first_close_date(){
    $this->db->select('fecha');
    $this->db->order_by('id_cierre');
    if($result = $this->db->get('ic_caja_mayor',1)){
      $date = $result->row_array()['fecha'];
      return $date;
    }
  }

  public function get_last_close_date(){
    $this->db->select('fecha');
    $this->db->order_by('id_cierre','DESC');
    if($result = $this->db->get('ic_caja_mayor',1)){
      $date = $result->row_array()['fecha'];
      return $date;
    }
  }

  public function update_cierre($data,$id_cierre){
    $this->db->where('id_cierre',$id_cierre);
    if($this->db->update('ic_caja_mayor',$data)){
      $response['mensaje'] =  MESSAGE_SUCCESS." Cierre Actualizado"  ;
    }else{
      $response['mensaje'] = MESSAGE_ERROR." error al agregar el cierre"  ;
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
      $data['id_empleado'] = $this->id_empleado;

    if($this->db->insert('ic_gastos',$data)){
      $response['mensaje'] =  MESSAGE_SUCCESS." Gasto agregado";
      $response['gastos']  = $this->mostrar_ultimo_gasto($data['fecha']);
      $response['total_gastos'] = $this->get_total_gastos_of($data['fecha']);
      echo json_encode($response);
    }else{
      echo MESSAGE_ERROR." error al agregar este gasto"  ;
    }
  }

  //TODO: unir esta y la de reporte en uno

  public function mostrar_gastos($fecha, $mode="normal"){
    $this->db->where('fecha',$fecha);
    $result = $this->db->get('ic_gastos');
    if($mode == "normal"){
      return json_encode($result->result_array());
    }else if($mode == "full"){
      $response['mensaje']      =  MESSAGE_INFO." Mostrando Gastos";
      $response['gastos']       = $result->result_array();
      $response['total_gastos'] = $this->get_total_gastos_of($fecha);
      echo json_encode($response);
    }else{
      return $result->result_array();
    }
  }

  // TODO:

    public function get_expenses($text, $first_date = '2001-01-01', $second_date = null) {
      $second_date = ($second_date) ? $second_date : date('Y-m-d');
      $where = "fecha between '$first_date' and '$second_date'";

      $this->db->select("ic_gastos.*, concat(ic_users.name, ' ', ic_users.lastname) as autor",false);
      $this->db->order_by("fecha DESC, id_gasto DESC");
      $this->db->where($where,'',false);
      $this->db->like('descripcion',$text);
      $this->db->or_like("concat(ic_users.name, ' ', ic_users.lastname)",$text);
      $this->db->join('ic_users','ic_gastos.id_empleado = ic_users.user_id','left');

      if ($result = $this->db->get('ic_gastos')) {
        $result = $result->result_array();
        $_SESSION['expenses_last_call'] = $result;

        $acum = $this->db->where($where,'',false)
                ->like('descripcion',$text)
                ->or_like("concat(ic_users.name, ' ', ic_users.lastname)",$text)
                ->select_sum('monto','total')
                ->join('ic_users','ic_gastos.id_empleado = ic_users.user_id','left')
                ->get('ic_gastos',1);
        $acum = $acum->row_array()['total'];
        $_SESSION['expenses_last_total'] = $acum;

        $fields = [
          table_field('id_gasto'),
          table_field('fecha','','date'),
          table_field('descripcion'),
          table_field('monto','','currency'),
          table_field('autor'),
        ];

        $result = make_simple_table($result,0,$fields);
        return ['content' => $result, 'acum' => $acum];
      }
    }

    public function expenses_report() {
      if($_SESSION['expenses_last_call']){
        $header = ['No.','Fecha','Descripcion', 'Monto','Autor'];
        $fields = ['fecha', 'descripcion', 'monto', 'autor'];
        $result = $_SESSION['expenses_last_call'];
        $acum   = $_SESSION['expenses_last_total'];
        $extra  = "<div class='ganancia-total gasto-total'>TOTAL: RD$ ".CurrencyFormat($acum)."<div>";
        echo make_general_report($result,"Reporte de Gastos",$this,$fields, $header, $extra);
      }
    }

  //

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

  public function get_ingresos($fecha, $tipo, $not_in = null){
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

  public function get_extras_or_recibos($fecha,$mode = null){
    $tabla = 'ic_pagos';
    $where = array('fecha'=> $fecha);
    $this->db->where("fecha_pago= '$fecha' and estado= 'pagado'");
    if($mode == "facturas"){
      $this->db->where('id_extra',null);
    }else{
      $this->db->where('id_extra > 0');
    }
    $this->db->select_sum('total');

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

  // report related
  public function get_row_by_month($row, $year) {
    // $sql    = "SELECT sum(banco) as banco FROM ic_caja_mayor WHERE year(fecha) = year(now()) and monthname(fecha)= '$month'";
    // $result = $this->db->query($sql);
    $this->db->select("sum($row) as $row, month(fecha) as mes ", false);
    $this->db->where("year(fecha) = '$year'",'' ,false);
    $this->db->group_by('mes');
    if ($result = $this->db->get('ic_caja_mayor')) {
      return $result->result_array();
    } else {
      var_dump($this->db->last_query());
    }
  }

}
