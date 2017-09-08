<?php defined('BASEPATH') OR exit('No direct script access allowed');

include_once(dirname(__FILE__).'/third/SmsGateway.php');

Class Messagegate{

  public function send_message($data){
    $email = "me@jesusantguerrero.com";
    $password = "samielfuerte";
    $countryId = "+1";
    
    $smsgate = new SmsGateway($email,$password);

    $deviceID = '56907';
    $number = $countryId.'8298441674';
    $message = 'ICS Services: Estimado(a) cliente(a)[cliente] se ha generado su factura del mes de [mes] 
    la cual vence en [fecha_limite] evite recargo de moras y reconexion [empresa] [lema]';

    $options = [
      'send_at' => strtotime('+ 5 seconds'),
      'expires_at' => strtotime('+ 1 hour')
    ];

   
      $result = $smsgate->sendMessageToNumber($number,$message,$deviceID,$options);
      if(!isset($result['error'])){
        echo MESSAGE_SUCCESS." Mensaje enviado Correctamente";
      }else{
        echo MESSAGE_ERROR." Su mensaje no pudo ser entregado";
      }
  }

}