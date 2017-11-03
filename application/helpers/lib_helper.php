<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/

defined('BASEPATH') OR exit('No direct script access allowed');


if( !function_exists('get_user_data')){
  function get_user_data(){
    if(isset($_SESSION['user_data'])){
      $user = $_SESSION['user_data'];
      $fullname = $user['name']." ".$user['lastname'];
      if($user['type'] == 0){
        $type = "Administrador";
      }else{
        $type = "Secretaria(o)";
      }

      $user['fullname'] = $fullname;
      $user['typestr'] = $type;
      $user['password'] = '';

      return $user;
    }
  }
}

function get_client_data(){
    if(isset($_SESSION['client_data'])){
      $client_data = $_SESSION['client_data'];
      $client_data['nombre_completo'] = $client_data['nombres']." ".$client_data['apellidos'];
      $client_data['iniciales'] =  $client_data['nombres'][0].$client_data['apellidos'][0];
      return $client_data;
    }else{
      return 'nada';
    }
}

function CurrencyFormat($number){
   $decimalplaces = 2;
   $decimalcharacter = '.';
   $thousandseparater = ',';
   return number_format($number,$decimalplaces,$decimalcharacter,$thousandseparater);
}

function number_to_words($number){
  $formatter = new \NumberFormatter('es', \NumberFormatter::SPELLOUT);
  return $formatter->format($number) . "\n";
}

function authenticate(){
  if(!isset($_SESSION['user_data'])){
		redirect(base_url());
	}
}

function auth_user_type($type){
  if($_SESSION['user_data']['type'] == $type){
    return true;
  }
  return false;
}

function get_role($type){
  $roles = ['admnistrador','secretaria(o)','tecnico'];
  return $roles[$type];
}

function auth_user_type_for_pages($page,$type,$redirect){
  $forbiden_sections[1] = array("administrador","reportes",'secciones','informes');

  if(in_array($page,$forbiden_sections[$type]) && auth_user_type($type)){
    if($redirect){
      redirect($redirect);
    }
    return true;
  }
  return false;
}

function phone_format($tel){
  if(strlen($tel) == 10){
    return "(".substr($tel,0,3).")  ".substr($tel,3,3)."-".substr($tel,6,4);
  }
  return $tel;
}

function dni_format($dni){
  if(strlen($dni) == 11){
    return substr($dni,0,3)."-".substr($dni,3,7)."-".substr($dni,10);
  }
  return $dni;
}

function is_marked($estado,$comparison){
   $class['text']  = $estado;
   $class['class'] ='';

    if($estado== $comparison){
      $class['text'] = "&#10004;";
      $class['class'] = "done";
    }
  return $class;
}

function verify_state($state,$posible_states){
 $classes  = array(
    "done" => ['icon' => ACTIVO,'class' =>'active'],
    "error"=> ['icon' => INACTIVO,'class'=> "fail"],
    "process"=> ['icon'=> '','class'=>'process'],
    'saldado'=> ['icon'=>'','class'=>'marked'],
    'cancelado'=> ['icon'=>'','class'=>'cancel'],
    'mora'=> ['icon'=>MORA,'class'=> 'mora'],
    'suspendido'=> ['icon'=>SUSPENDIDO,'class'=>'suspendido'],
    'exonerado'=> ['icon'=>EXONERADO,'class'=>'exonerado'],
    'en corte'=> ['icon'=>EN_CORTE,'class'=>'en-corte']
    );
 
  foreach($posible_states as $key => $value) {
    if(trim($state) == $value){
      return array(
        'text'      => str_replace('%icon%',$classes[$key]['icon'],ICON)." ".$state,
        'class'     => str_replace(" ","-",$key),
        'row_class' => $classes[$key]['class']
      );
    }
  }
}

function date_spanish_format($english_date){
  if($english_date and $english_date != '0000-00-00'){
    $new_date = date('d M. Y',strtotime($english_date));
    $new_date = str_replace($GLOBALS['months_eng'],$GLOBALS['months_esp'],$new_date);
    return $new_date;
  }
  return '';
}

function is_abono($concept){
  if(str_contains('abono',$concept)){
    return $concept;
  }
  return '';
}

function str_contains($word_to_search,$string){

  if(strpos($string,$word_to_search) !== FALSE){
    return TRUE;
  }
  return FALSE;
}

function get_manifest(){
  $manifest = file_get_contents(base_url('assets/js/dist/assets/js/dist/manifest.json'));
  $manifest = json_decode($manifest, true);
  var_dump($manifest);

}