<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2018 Jesus Guerrero
*@version 1.0.0
*
*/

defined('BASEPATH') OR exit('No direct script access allowed');


function make_ips_table($data,$start_at){
  $state_class = [
      'disponible' => 'text-success',
      'ocupado'    => 'text-danger',
      'sectorial'  => 'text-primary'
  ];

  $cont = $start_at + 1;
  $html_text = " ";
  foreach ($data as $line) {
      $estado = $line['estado'];
      $html_text .=  "<tr>
                        <td>".$cont."</td>
                        <td></td>
                        <td>{$line['seccion']}</td>
                        <td>{$line['codigo']}</td>
                        <td>{$line['ip_final']}</td>
                        <td class='{$state_class[$estado]} estado-ip'>{$estado}</td>
                        <td> <button class='btn-change-ip' data-code='{$line['codigo']}'> cambiar </button> </td>
                       </tr>";
   $cont+=1;
  }
  return $html_text;
}

function make_ips_list($data){
    $html_text = "<option value=''> - codigo - </option>";
    foreach ($data as $row) {
        $html_text .= "<option value='".$row['codigo']."' data-ip-final='".$row['ip_final']."'>";
        $html_text .= $row['codigo']."</option>";
    }
    return $html_text;
}
