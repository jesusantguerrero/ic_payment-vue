<?php defined('BASEPATH') OR exit('No direct script access allowed');

use Firebase\FirebaseLib;

class firebase {
  private $config;
  private $firebase;
  public function __contruct(){
  
    $this->config = [
      'apiKey' =>"AIzaSyA8MtTyS8Ua0gw_XMnM-ed5jUqcnv08nUw",
      'authDomain'=> "icpayment-878f1.firebaseapp.com",
      'databaseURL'=> "https://icpayment-878f1.firebaseio.com",
      'projectId'=> "icpayment-878f1",
      'storageBucket'=> "icpayment-878f1.appspot.com",
      'messagingSenderId' => "448219393140"
    ];

    $this->firebase = new Firebase($config['databaseURL'],$cofig['apiKey']);

  }

  function update($path,$data){
    $this->firebase->update($path,$data);
  }

  function get($path){
    $data = $this->firebase->get($path);
    return $data;
  }



}