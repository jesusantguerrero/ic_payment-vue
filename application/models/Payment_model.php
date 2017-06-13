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
    $this->load->database();
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
        echo $this->db->last_query();
      } 
  }

  public function check_for_update($data){
    $sql = "SELECT estado from ic_pagos where id_pago =".$data['id'];
    $result = $this->db->query($sql);
    $result = $result->row_array()['estado'];
    if($result == "no pagado"){
        return true;
      }else{
        echo MESSAGE_INFO."Este pago ya ha sido realizado";
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
    if($result){
      return $result;
    }else{
      return 0;
    }
  }

  public function count_of_contract($id_contrato = null){
    if($id_contrato == null){
      $id_contrato = get_from_session();
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
    $sql = "SELECT * FROM ic_pagos WHERE id_contrato = $id";
    set_last_query($sql);
    $sql .= " Limit 5";
    set_last_page($sql);
    $result = $this->db->query($sql);
    set_to_session($id);
    if($result){
      $result = make_payment_table($result->result_array(),0);
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

  public function get_payments_paginate($offset,$perpage){
    $sql = get_last_query()." LIMIT ".$offset.", ".$perpage;
    set_last_page($sql);
    $result = $this->db->query($sql);
    if($result){
      $result = make_payment_table($result->result_array(),$offset);
      echo $result;
    }else{
      echo "nada que mostrar";
    } 
  }

  public function last_page(){
    $result = $this->db->query(get_last_page());
    if($result){
      $result = make_payment_table($result->result_array(),0);
      echo $result;
    }  
  } 

  public function year_income(){
    $sql = "SELECT sum(total) FROM ic_pagos WHERE estado= 'pagado' and year(fecha_pago)=year(now())";
    $result = $this->db->query($sql);
    $result = $result->row_array()['sum(total)'];
    if($result){
      return $result;
    }else{
      return 0;
    }
  }

  public function month_income($mes){
    $sql = "SELECT sum(total) FROM ic_pagos WHERE estado= 'pagado' and year(fecha_pago)=year(now()) and month(fecha_pago)=$mes";
    $result = $this->db->query($sql);
    $result->row_array()['sum(total)'];
    if ($result != null){
      return $result->row_array()['sum(total)'];
    }else{
      return 0;
    }
  }

  public function day_income(){
    $sql = "SELECT sum(total) FROM ic_pagos WHERE estado= 'pagado' and day(fecha_pago)=day(now())";
    $result = $this->db->query($sql);
    $result->row_array()['sum(total)'];
    if ($result != null){
      return $result->row_array()['sum(total)'];
    }else{
      return 0;
    }
  }

  public function weekday_income($day){
    $sql = "SELECT sum(total) FROM ic_pagos WHERE estado= 'pagado' and dayname(fecha_pago)='$day' and week(fecha_pago) = week(now())";
    $result = $this->db->query($sql);
    $result->row_array()['sum(total)'];
    if ($result != null){
      return $result->row_array()['sum(total)'];
    }else{
      return 0;
    }
  }

  public function get_moras_view(){
    $sql = "SELECT * FROM v_morosos";
    $result = $this->db->query($sql);
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
      echo $this->db->last_query();
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

  //functions
}