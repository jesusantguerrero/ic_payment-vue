<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Report_model extends CI_MODEL{

  public function __construct(){
    parent::__construct();

    $this->load->library('table');

  }


  public function get_payments_report($status){
    $select = "
    id_contrato,
    cliente,
    group_concat(monthname(fecha_limite)) as concepto,
    sum(total) as total,
    complete_date,
    fecha_pago";
    $this->db->select($select,true);
    $this->db->where('date(fecha_pago)',date('Y-m-d'),true);
    $this->db->group_by('cliente');
    $this->db->order_by('complete_date');
    if($result = $this->db->get('v_recibos')):
      $result = $result->result_array();
      make_payment_report($result,"Reporte De Pagos Del Dia",$this);
    else:
      echo " Error";
    endif;
  }

  public function get_receipts($text,$first_date = '2001-01-01', $second_date = null){
    $second_date = ($second_date) ? $second_date : date('Y-m-d');
    $where = "fecha_pago between '$first_date' and '$second_date'";

    $this->db->select("id_pago,id_contrato,cliente,concat('Pago de ',monthname(fecha_limite)) as concepto,concepto as concepto_real, servicio ,total, complete_date,date(fecha_pago) as fecha,time(complete_date) as hora");
    $this->db->order_by("fecha_pago DESC, hora DESC");
    $this->db->where($where,'',false);
    $this->db->like('cliente',$text);
    $result = $this->db->get("v_recibos");

    if ($result){
      $result = $result->result_array();
      $_SESSION['receipts_last_call'] = $result;
      $acum = $this->db->where($where,'',false)->like('cliente',$text)->select_sum('total','total')->get('v_recibos',1);
      $acum = $acum->row_array()['total'];
      $_SESSION['receipt_last_total'] = $acum;
      $result = make_recibos_table($result,0);
      return ['content' => $result, 'acum' => $acum];
    }
  }

  public function get_receipts_report() {
      if($_SESSION['receipts_last_call']){
        $header = ['No.','Contrato','Cliente','Servicio', 'Concepto', 'Total','Fecha'];
        $fields = ['id_contrato','cliente', 'servicio', 'concepto','total', 'fecha'];
        $result = $_SESSION['receipts_last_call'];
        $acum   = $_SESSION['receipt_last_total'];
        $extra  = "<div class='ganancia-total'>TOTAL: RD$ ".CurrencyFormat($acum)."<div>";
        echo make_general_report($result,"Reporte de Pagos",$this,$fields, $header, $extra);
      }
  }

  public  function get_total_payments($date){
    $sql = "SELECT SUM(total) as total from v_recibos where fecha_pago = $date";
    if($result = $this->db->query($sql)):
      $result = $result->row_array()['total'];
      return $result;
    else:
      echo " Error";
    endif;
  }

  public function get_total_abonos(){
    $sql = "select SUM(abonos) as all_abonos from ic_clientes where abonos > 0";
    if($result = $this->db->query($sql)){
      $result = $result->row_array()['all_abonos'];
      return $result;
    }else{
      echo 0;
    }
  }

  public function get_abonos_report($is_print = true){
    $sql = "SELECT * from ic_clientes where abonos > 0";
    if($result = $this->db->query($sql)){
      $result = $result->result_array();
      make_abonos_report($result,"Reporte de Abonos",$this,$is_print);
    }else{
      echo " Error";
    }
  }

  public function get_installations($is_print = true){
    $this->db->where('estado_instalacion','por instalar');
    $this->db->order_by('fecha','DESC');
    $result = $this->db->get('v_instalaciones');
    if($result){
      $result = $result->result_array();
      echo make_installation_report($result,"Instalaciones del Dia",$this,$is_print);
    }
  }

  public function get_moras_view($is_print = false){
    $sql = "
    id_contrato,
    codigo,
    ip_final,
    id_cliente,
    cliente,
    celular,
    group_concat(concepto) as concepto,
    group_concat(detalles_extra) as detalles_extra,
    sum(cuota) as cuota,
    sum(mora) as mora,
    sum(monto_extra) as monto_extra,
    sum(total) as total,
    count(id_pago) as pagos_pendientes,
    group_concat(monthname(fecha_limite)) as meses";

    $this->db->select($sql,true);
    $this->db->where_not_in('estado_cliente','suspendido');
    $this->db->group_by('cliente');
    $this->db->order_by('id_contrato');
    $result = $this->db->get('v_morosos');
    if($result){
      $result = $result->result_array();
      if (!$is_print){
        echo make_moras_report_smart($result,"Clientes Con Moras",$this,$is_print);
      }else{
        echo make_moras_report($result,"Clientes Moras",$this,$is_print);

      }
    }
  }

  # Instalaciones

  public function count_installations(){
    $this->db->where('estado_instalacion','por instalar');
    $result = $this->db->count_all_results('v_instalaciones');
    if($result){
     return $result;
    }else{
      return 0;
    }
  }

  public function get_installations_per_month(){
    $resultado_por_mes = array();

    for ($i=1; $i <= 12 ; $i++) {
      $sql = "SELECT count(*) from v_instalaciones where year(fecha) = year(now()) and month(fecha)= $i";
      $result = $this->db->query($sql)->row_array()["count(*)"];
      if($result){
        $value = $result;
      }else{
        $value = "0";
      }
      array_push($resultado_por_mes,$value);
    }
    return $resultado_por_mes;
  }

  public function get_installations_list($status='por instalar'){
    if($status != 'todos'){
      $this->db->where('estado_instalacion',$status);
    }
    $this->db->order_by('fecha','DESC');
    $result = $this->db->get('v_instalaciones');
    if($result and count($result) > 0){
      $result = make_installations_list($result->result_array());
      echo $result;
    }else{
      echo "<h3>No hay Datos Para Esta Busqueda</h3>";
    }

  }

  public function update_installation($id_contrato){
    $this->db->where('id_contrato',$id_contrato);
    $result = $this->db->get('v_instalaciones',1);
    $status = $result->row_array()['estado_instalacion'];
    switch ($status) {
      case 'por instalar':
        $status = 'instalado';
        break;
      default:
       $status =  'por instalar';
    }
    $this->db->where('id_contrato',$id_contrato);
    if($this->db->update('ic_contratos',array("estado_instalacion" => $status))){
      echo MESSAGE_SUCCESS." Estado de la instalacion cambiado a ". $status;
    }

  }

  public function count_moras_view(){
    $this->db->group_by('cliente');
    $this->db->order_by('id_contrato');
    $this->db->where_not_in('estado_cliente','suspendido');
    $result = $this->db->count_all_results('v_morosos');
    if($result){
     return $result;
    }else{
      return 0;
    }
  }

  public function get_tickets_report($is_print = true){
    $this->db->select('v_averias.* , v_contratos.codigo',false);
    $this->db->where('v_averias.estado','por reparar');
    $this->db->join('v_contratos','id_cliente','LEFT');
    $this->db->order_by('fecha', 'DESC');
    $result = $this->db->get('v_averias');
     if($result){
      $result = $result->result_array();
      echo make_averias_report($result," Reporte De Averias",$this,$is_print);
    }else{
      //echo var_dump($this->db->last_query());
    }
  }

  public function get_sections_report($section_id){
    $this->db->where('id_seccion',$section_id);
    $result = $this->db->get('v_ips');
     if($result){
      $result = $result->result_array();
      $header = ['Numero','Sector','Codigo', 'Direccion IP', 'Estado'];
      $fields = ['seccion','codigo', 'ip_final', 'estado'];
      echo make_general_report($result," Reporte De IP's",$this,$fields, $header);
    }else{
      //echo var_dump($this->db->last_query());
    }
  }

  # Moras

  public function get_history($is_print = false){
    $result = $this->db->get('v_historial_moras');
    if($result){
      $result = $result->result_array();
      echo make_moras_history_table($result," Historico de Moras",$this,$is_print);
    }
  }

  public function get_client_report($status){
    $db = $this->db;

    $db->select('cli.*, co.codigo',false);
    $db->from('ic_clientes cli');

    if ($status == "nada") {
      $status = "";
      $db->like('cli.estado',$status);
    }else{
      $db->where('cli.estado',$status);
    }
    $db->join('ic_contratos co','id_cliente','left');

    if ($result = $db->get()) {
      echo make_clients_report($result->result_array(),"Clientes en estado {$status}",$this,true);
    }
  }

}
