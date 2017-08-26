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
  }

  /**
  *
  *@param array $data array with the data of the user
  *@param string $mode "normal" for save it in an insert, "full" to storage all the data
  *@return void
  */

  function organize_data($data,$mode){

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
        
      }else{
        echo " Error";
      } 
  }

  public function check_for_update($id_pago){
    $sql = "SELECT estado from ic_pagos where id_pago =".$id_pago;
    $result = $this->db->query($sql);
    $result = $result->row_array()['estado'];
    if($result == "no pagado"){
        return true;
      }else{
       return false;
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

  public function update($new_payment,$id_pago){
    $where = array('id_pago' => $id_pago);
    $this->db->update('ic_pagos',$new_payment,$where);
  }
  

  public function count_unpaid_per_contract($id_contrato){
    $this->db->where('id_contrato',$id_contrato);
    $this->db->where('estado','no pagado');
    $result = $this->db->count_all_results('ic_pagos');
    if($result){
      return $result;
    }else{
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
    $sql = "SELECT * FROM ic_pagos WHERE id_contrato = $id_contrato order by id_pago desc limit 1";
    $result = $this->db->query($sql);
    if($result){
      return $result->row_array();
    }else{
      return 0;
    }
  }

  public function get_all_of_contract($id){
    $this->db->where('id_contrato',$id);
    $this->db->order_by('-fecha_pago DESC,fecha_limite,complete_date','',false);
    if($result = $this->db->get('ic_pagos')){
      echo make_payment_table($result->result_array(),0);
    }
  } 

  public function get_payments_of_contract($id){
    $sql = "SELECT * FROM ic_pagos WHERE id_contrato = $id";
    $result = $this->db->query($sql);
    if($result){
      $result = $result->result_array();
      return $result;
    }
  }   

  public function list_all_of_contract($id_contrato){
    $this->db->select("id_pago,id_contrato, monthname(fecha_limite) as mes, year(fecha_limite) as anio");
    $this->db->where('id_contrato',$id_contrato);
    if($result = $this->db->get("ic_pagos")){
      $result = make_payment_list($result->result_array());
      echo $result;
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

  public function year_income(){
    $sql = "SELECT sum(total) FROM v_recibos WHERE year(fecha_pago)=year(now())";
    $result = $this->db->query($sql);
    $result = $result->row_array()['sum(total)'];
    if($result){
      return $result;
    }else{
      return 0;
    }
  }

  public function month_income($mes){
    $sql = "SELECT sum(total) FROM v_recibos WHERE year(fecha_pago)=year(now()) and month(fecha_pago)=$mes";
    $result = $this->db->query($sql);
    $result = $result->row_array()['sum(total)'];
    if($result){
      return $result;
    }else{
      return 0;
    }
  }

  public function get_incomes_per_month(){
    $resultado_por_mes = array();
    
    for ($i=1; $i <= 12 ; $i++) { 
      $value = $this->month_income($i);
      
      array_push($resultado_por_mes,$value);
    }
    return $resultado_por_mes;
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
      $result = $this->db->group_by('cliente')->select('id_cliente')->get('v_morosos');
    }else{
      $result = $this->db->get('v_morosos');
    }
    return $result->result_array(); 
  }

  public function update_moras($updated_data){
    $sql = " UPDATE ic_pagos SET mora ='".$updated_data['mora']."',total ='".$updated_data['total']."'";
    $sql .= "WHERE id_pago=".$updated_data['id_pago'];
    if($this->db->query($sql)){
    }else{
      echo "algo anda mal";
    }
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

  public function get_recibo($id){
    $sql = "SELECT * FROM v_recibos WHERE id_pago = $id";
    $result = $this->db->query($sql)->row_array();
    return $result;
  }

  public function get_payment($id){
    $sql = "SELECT * FROM ic_pagos WHERE id_pago = $id";
    $result = $this->db->query($sql)->row_array();
    return $result;
  }

  //functions
}