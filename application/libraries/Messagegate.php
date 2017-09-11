<?php defined('BASEPATH') OR exit('No direct script access allowed');

include_once(dirname(__FILE__).'/third/SmsGateway.php');

Class Messagegate{

  protected $context;

  public function __construct(){
    $this->context =& get_instance();

    $company = $this->context->company_model->get_empresa();
    $this->reemplazo = array('cliente',$company['nombre'],$company['lema']);
    $this->default_message = "ICS Services: Estimado(a) cliente(a) [cliente] se ha generado su factura del mes. Evite recargo de moras y reconexion. [empresa] \"[lema]\"";
    $this->options = [
      'send_at' => strtotime('+ 5 seconds'),
      'expire_at' => strtotime('+ 1 hour')
    ];
    
  }

  public function send_message($data){

    $message_settings = $this->context->message_model->get_config('message_settings');
    
    if($data['tipo'] == 'otros'){
      return $this->custom_send($data, $message_settings);
    }else{
      $clientes = $this->get_clients($data);
      $default_message = $this->get_default_message($data);
      return $this->send_many($clientes,$default_message,$message_settings);
    }
  }
  
  public function get_device($data){
    $smsgate = new SmsGateway($data['email'], $data['password']);
    return $smsgate->getDevice($data['device_id']);
  }
  
  private function get_clients($data){
    $context = $this->context;
    if($data['tipo'] != 'personalizado'){
      $context->db->select("
      concat(nombres,' ',apellidos) as nombre_completo,
      celular"
      );
      $context->db->where('estado',$data['tipo']);
      $clientes = $context->db->get('ic_clientes')->result_array();
  
    }else{
      $clientes = $data['clientes'];
    }
    return $clientes;
  }

  private function get_default_message($data){
    if($data['tipo'] == 'mora'){ 
      $default_message = $this->default_message;
    }else{
      $default_message = $data['mensaje'];
    }
    return $default_message;
  }

  private function send_many($clientes,$default_message,$message_settings){
    $email = $message_settings['email'];
    $password = $message_settings['password'];
    $country_id = $message_settings['country_id'];
    $device_id = $message_settings['device_id'];
    $smsgate = new SmsGateway($email,$password);
    $options = $this->options;
    
    $data = array();
    foreach ($clientes as $Cliente) {
      
      $client =  $Cliente['nombre_completo'];
      $this->reemplazo[0] = $client;
      $item = [
        'device' => $device_id,
        'number' => '+'.$country_id . $Cliente['celular'],
        'message' => str_replace(['[cliente]','[empresa]','[lema]'],$this->reemplazo,$default_message) ,
        'send_at' => $options['send_at'],
        'expire_at' => $options['expire_at']
      ];
      
      array_push($data, $item);
    }
    
    return $smsgate->sendManyMessages($data);
  }
  
  private function custom_send($data,$message_settings){
    $email = $message_settings['email'];
    $password = $message_settings['password'];
    $country_id = $message_settings['country_id'];
    $device_id = $message_settings['device_id'];
    
    $number = '+'.$country_id . $data['numeros'];
    $options = $this->options;
    $smsgate = new SmsGateway($email,$password);

    return $smsgate->sendMessageToNumber($number, $data['mensaje'], $device_id, $options);
  }
}