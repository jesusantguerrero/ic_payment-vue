<?php 

class Averias extends CI_Controller {
  public function __construct() {
    parent::__construct();
    $this->load->model('averia_model');
    $this->load->model('comment_model');
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
    $response['ticket']   = $this->averia_model->get_averia($data['id_averia']); 
    $response['comments'] = $this->comment_model->get_comments($data['id_averia']);
    echo json_encode($response);
  }

  public function update_averia(){
    authenticate();
    $data = json_decode($this->input->post('data'),true);
    $id_averia = $data['id_averia'];
    unset($data['id_averia']);
    $response['mensaje'] = MESSAGE_ERROR. " No se pudieron guardar los cambios";
    
    if($this->averia_model->update_all($id_averia,$data)){
      $response['mensaje'] = MESSAGE_SUCCESS . "Cambios Guardados";
    }

    echo json_encode($response);
  }

  public function delete_averia(){
    
  }

  // comments

  public function add_comment(){
    authenticate();
    $response['mensaje'] = MESSAGE_ERROR.' No se pudo agregar el reporte';
    $user    = get_user_data();
    $comment = json_decode($this->input->post('data'),true);
    $comment = array_merge($comment,["id_empleado" => $user['user_id']]);

    if ($this->comment_model->add_comment($comment)) {
      $response['mensaje'] = MESSAGE_SUCCESS.' reporte agregado';
    }

    echo json_encode($response);
  }

  public function get_comments(){
    authenticate();
    $data = json_decode($this->input->post('data'),true);
    $response['comments'] = $this->comment_model->get_comments($data['id_averia']);
    echo json_encode($response);
  }

  public function delete_comment(){
    authenticate();
    $response['mensaje'] = MESSAGE_ERROR.' No se pudo borrar el reporte';
    $data = json_decode($this->input->post('data'),true);

    if ($this->comment_model->delete_comment($data['id_reporte'])) {
      $response['mensaje'] = MESSAGE_SUCCESS.' reporte Eliminado';
    }

    echo json_encode($response);
  }

  public function update_comment(){

  }

}