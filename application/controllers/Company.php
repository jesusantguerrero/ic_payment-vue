<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Company extends MY_Controller
{
  public function __construct() {
    parent::__construct();
    $this->load->model('company_model');
  }

  public function upload() {
    authenticate();
    $this->do_upload('company')
  } 

}