<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/

$client_details;

defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('make_table'))
{
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_table($data,$start_at){
    $types = array("Administrador","Secretaria(o)","Otro");
    $cont = $start_at + 1;
    $html_text="";
    foreach ($data as $line) {
        $html_text .= "<tr>
        <td>".$cont."</td>
        <td class='user-id'>".$line['user_id']."</td>
        <td>".$line['nickname']."</td>
        <td>".$line['name']."</td>
        <td>".$line['lastname']."</td>
        <td>".$line['dni']."</td>
        <td>".$types[$line['type']]."</td>
        <td><button>Actualizar</button></td>
        <td>
          <a href=''><i class='material-icons edit-user'>edit</i></a>
          <a href=''><i class='material-icons delete-user'>delete</i></a>
          <a href=''><i class='material-icons display-user'>find_in_page</i></a>
        </td>
      </tr>";
     $cont+=1;
    }

    return $html_text;
  }
}

if( !function_exists('get_user_data')){

  
  function get_user_data(){
    if(isset($_SESSION['user_data'])){
      $user = $_SESSION['user_data'];
      $fullname = $user['name']." ".$user['lastname'];
      if($user['type'] == 0){
        $type = "Administrador";
      }else{
        $type = "Secretaria";
      }

      $user['fullname'] = $fullname;
      $user['typestr'] = $type;

      return $user;
    }
  }
}



if ( ! function_exists('make_client_table'))
{
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_client_table($data,$start_at){
    $cont = $start_at + 1;
    $html_text="";
    foreach ($data as $line) {
        $html_text .= "<tr>
        <td>".$cont."</td>
        <td class='id_cliente'>".$line['id_cliente']."</td>
        <td>".$line['nombres']."</td>
        <td>".$line['apellidos']."</td>
        <td>".$line['cedula']."</td>
        <td>".$line['celular']."</td>
        <td>".$line['estado']."</td>
      </tr>";
     $cont+=1;
    }

    return $html_text;
  }
}

if ( ! function_exists('make_service_table'))
{
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_service_table($data,$start_at){
    $cont = $start_at + 1;
    $html_text="";
    foreach ($data as $line) {
        $html_text .= "<tr>
        <td>".$cont."</td>
        <td class='id_servicio'>".$line['id_servicio']."</td>
        <td>".$line['nombre']."</td>
        <td>".$line['descripcion']."</td>
        <td>RD$ ".$line['mensualidad']."</td>
        <td>".$line['tipo']."</td>
      </tr>";
     $cont+=1;
    }

    return $html_text;
  }
}

function get_client_data(){
    if(isset($_SESSION['client_data'])){
      $client_data = $_SESSION['client_data'];
      return $client_data;
    }else{
      return 'nada';
    }
  }
