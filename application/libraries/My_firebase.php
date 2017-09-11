<?php defined('BASEPATH') OR exit('No direct script access allowed');

class MY_firebase {
  private $config;
  private $firebase;

  function __construct() {
    $this->root = dirname(__File__) . '/third/';
  }

  function save($filename,$data){
    $file = fopen($this->root . $filename.'.json','w');
    fwrite($file,$data);
    fclose($file);
    return true;
  }

  function read($filename){
    $file =  file_get_contents($this->root . $filename.'.json');
    return json_decode($file,true);
  }

}