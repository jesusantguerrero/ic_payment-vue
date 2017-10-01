<?php 

class Averias extends CI_Controller {
  public function __construct() {
    parent::__construct();
    $this->load->model('averia_model');
  }
  
  public function search() {
    authenticate();
    $data = json_decode($this->input->post('data'),true);
    $averias = $this->averia_model->search($data['text'],$data['status']);

    echo json_encode($averias);
  }
}