<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_MODEL{

  //vars 


  //constructor

  public function __construct(){
    parent::__construct();

    
  }


  public function showClients(){
    $this->load->database();
    $query = $this->db->query("select id,dni,nombres,apellidos,fecha_registro from clientes");
    $this->db->close();
    $result = $query->result_array();

    echo $this->clientTable($result);  
    
  }

  public function clientTable($data){
    $html_table = " ";
    $html_table .= "<table class='table'>";
    $html_table .= "<th>ID</th> <th>Cedula</th> <th>Nombres</th> <th>Apellidos</th> <th>Fecha Registro</th>";

      foreach($data as $row){
        $html_table .= "<tr>";
      foreach($row as $data){
        $html_table .= "<td>". $data . "</td>";
      }
        $html_table .= "</tr>";

      }
    $html_table .= "</table>";

    return $html_table;
  }


  //functions
}