<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/
defined('BASEPATH') OR exit('No direct script access allowed');

class Section_model extends CI_MODEL{
  
  // public $id = null;
  public $last_check_moras;

  public function __construct(){
    parent::__construct();
    $this->load->database();
  }

  // funciones para las secciones
  public function add($data){
    $row = array(
      'id_seccion'         => null,
      'nombre'             => $data['nombre'],
      'codigo_area'        => $data['codigo_area'],
      'registros_posibles' => $data['registros_posibles']
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

  public function get_sections_dropdown(){
    $result = $this->db->get('ic_secciones');
    $result = make_section_dropdown($result->result_array(),0);
    echo $result;
  } 

  public function get_section_id($codigo_area){
    $this->db->where('codigo_area',$codigo_area);
    $result = $this->db->get('ic_secciones',1);
    $result = $result->row_array()['id_seccion'];
    return $result;
  }



  // funciones para las ips

  public function add_ip($row){
    
     if($this->db->insert('ic_ips',$row)){
        
      }else{
        echo $this->db->last_query();
      } 
  }

  public function get_all_of_section($section_id,$estado = ''){
    $this->db->where('id_seccion',$section_id);
    $this->db->like('estado',$estado,'both');
    $result = $this->db->get('v_ips');
    if($result){
      $result = $result->result_array();
      echo  make_ips_table($result,0);
    }
    
  }  

  public function get_ip_list_of_section($section_id){
    $this->db->where('id_seccion',$section_id);
    $this->db->where('estado','disponible');
    $result = $this->db->get('v_ips');
    if($result){
      $result = $result->result_array();
      echo  make_ips_list($result)."hola";
    }
  }

  public function update_ip_state($codigo,$state){
    $this->db->where('codigo',$codigo)->select('id_ip');
    $result = $this->db->get('v_ips',1);
    $id_ip = $result->row_array()['id_ip'];
    
    $this->db->where('id_ip',$id_ip);
    $this->db->update('ic_ips',array('estado' => $state));
  }

}