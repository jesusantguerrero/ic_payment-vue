<?php 

class Averias extends CI_Controller {
  public function __construct() {
    parent::__construct();
    $this->load->model('averia_model');
  }
  
  public function search() {
    authenticate();
    $data = json_decode($this->input->post('data'),true);
    $averias = $this->averia_model->search($data['text'],$data['state']);
    
    echo json_encode($averias);
  }
  
  public function get_averia(){
    authenticate();
    $data = json_decode($this->input->post('data'),true);
    $response['ticket'] = $this->averia_model->get_averia($data['id_averia']); 
    //TODO: $response['comments'] = $this->comments_model->get_comments($id_averia);
    echo json_encode($response);
  }

  public function update_averia(){

  }

  public function delete_averia(){

  }

  // comments

  public function add_comment(){

  }

  public function get_comments(){

  }

  public function delete_comment(){

  }

  public function update_comment(){

  }

}