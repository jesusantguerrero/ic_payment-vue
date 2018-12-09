<?php
/**
* Payment Plus
*@author Jesus Guerrero
*@copyright Copyright (c) 2018 Jesus Guerrero
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Section_model extends CI_MODEL{

  // public $id = null;
  public $last_check_moras;

  public function __construct(){
    parent::__construct();

  }

  // funciones para las secciones
  public function add($data){
    $row = array(
      'id_seccion'         => null,
      'nombre'             => $data['nombre'],
      'codigo_area'        => $data['codigo_area'],
      'registros_posibles' => 250
    );

    $this->db->where('nombre',$data['nombre']);
    $this->db->or_where('codigo_area',$data['codigo_area']);
    $result = $this->db->get('ic_secciones')->result_array();
    if(count($result) > 0){
      return -1;
    }else{
        $result = $this->db->insert('ic_secciones',$row);
      if($result):
        return 1;
      else:
        return 0;
      endif;
    }

  }

  public function get_sections($mode){
    $this->db->select('id_seccion as id, concat(nombre, " | ", codigo_area) as text', false);
    if ($result = $this->db->get('ic_secciones')){
      return $result->result();
    } else {
      var_dump($this->db->last_query());
    }
  }

  public function get_section_id($codigo_area){
    $this->db->where('codigo_area',$codigo_area);
    $result = $this->db->get('ic_secciones',1);
    $result = $result->row_array()['id_seccion'];
    return $result;
  }


  // funciones para las ips
  public function add_ip($row){
     if($this->db->insert('ic_ips', $row)){
      }else{
        echo " Error";
      }
  }

  public function get_all_of_section($section_id, $estado = ''){
    $this->db->where('id_seccion',$section_id);
    if ($estado != '') {
      $this->db->like('estado', $estado, 'both');
    }
    if($result = $this->db->get('v_ips')){
      return make_ips_table($result->result_array(),0);
    }
  }

  public function get_ip_list_of_section($section_id){
    $this->db->select('codigo as id, ip_final as ip', false);
    $this->db->where('id_seccion', $section_id);
    $this->db->where('estado', 'disponible');
    if($result = $this->db->get('v_ips')){
      return $result->result_array();
    }
  }

  public function update_ip_state($codigo, $state){
    $this->db->where('codigo',$codigo)->select('id_ip');
    $result = $this->db->get('v_ips',1);
    $id_ip = $result->row_array()['id_ip'];

    $this->db->where('id_ip',$id_ip);
    return $this->db->update('ic_ips',array('estado' => $state));
  }

}
