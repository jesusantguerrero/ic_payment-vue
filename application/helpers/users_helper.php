<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('make_table'))
{

  function make_table($data,$start_at){
    $types = array("Administrador","Trabajador");
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
