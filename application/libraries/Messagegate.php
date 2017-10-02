<?php defined('BASEPATH') OR exit('No direct script access allowed');

require(APPPATH . 'libraries/third/SmsGateway.php');

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
      $default_message = $data['mensaje'];
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

  private function send_many($clientes,$default_message,$message_settings){
    $email = $message_settings['email'];
    $password = $message_settings['password'];
    $country_id = $message_settings['country_id'];
    $device_id = $message_settings['device_id'];
    $smsgate = new SmsGateway($email,$password);
    $options = $this->options;
    
    $interval = 0;
    $data = array();

    foreach ($clientes as $Cliente => $index) {
      if($index % 10 == 0) $interval += 1;
      $client =  $Cliente['nombre_completo'];
      $this->reemplazo[0] = $client;
      $item = [
        'device' => $device_id,
        'number' => '+'.$country_id . $Cliente['celular'],
        'message' => str_replace(['[cliente]','[empresa]','[lema]'],$this->reemplazo,$default_message) ,
        'send_at' => strtotime("+ $interval minute"),
        'expire_at' => $options['expire_at']
      ];      
      array_push($data, $item);
    }
    try {
      return $smsgate->sendManyMessages($data);
    } catch (Exception $e) {
      return "{'response':false,'status':0, 'message':'{$e->message}'}";
    }
  }

  private function send_many_test($clientes,$default_message,$message_settings){
    $email = $message_settings['email'];
    $password = $message_settings['password'];
    $country_id = $message_settings['country_id'];
    $device_id = $message_settings['device_id'];
    $smsgate = new SmsGateway($email,$password);
    $options = $this->options;
    
    $data = array();
    $margin = 0;
    for ($i=0; $i < 30; $i++) {
      if($i % 10 == 0) $margin += 1;
      
      $item = [
        'device' => $device_id,
        'number' => '+18293271958',
        'message' => str_replace(['[cliente]','[empresa]','[lema]'],$this->reemplazo,"prueba no $i") ,
        'send_at' => strtotime("+ $margin minute"),
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