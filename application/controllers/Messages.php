<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {	
  public function __construct(){
    parent::__construct();
  }
    
  public function send_message(){  
    $this->load->library('messagegate');
    $this->messagegate->send_message();
  }

}