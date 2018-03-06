<?php

class Ticket extends MY_Controller {
  public function __construct() {
    parent::__construct();
    $this->load->model('ticket_model');
    $this->load->model('comment_model');
    $this->load->model('contract_model');
    $this->my_auth->authenticate();
  }

  public function search() {
    $data = json_decode($this->input->post('data'),true);
    $res['tickets'] = $this->ticket_model->search($data['text'],$data['state']);
    $res['count'] = count($res['tickets']);
    $this->response_json($res);
  }

  public function add_ticket() {

    if ($data = $this->get_post_data('data')) {

      if ($result = $this->ticket_model->add($data)) {
        $this->set_message('Nueva averia agregada');

        $contract = $this->contract_model->get_contract_view($data['id_contrato']);
        $this->event->trigger('ticket', 1, $contract, " Descripcion: {$data['descripcion']}");

      } else {
        $this->set_message('Error al agregar averia', 'error');
      }
      $this->response_json();

    }
  }

  public function get_ticket(){
    $data = json_decode($this->input->post('data'),true);
    $response['ticket']   = $this->ticket_model->get_ticket($data['id_averia']);
    $response['comments'] = $this->comment_model->get_comments($data['id_averia']);
    echo json_encode($response);
  }

  public function update_ticket(){
    $data = json_decode($this->input->post('data'), true);
    $id_averia = $data['id_averia'];
    unset($data['id_averia']);
    $this->set_message("No se pudieron guardar los cambios, error");

    if ($this->ticket_model->update_all($id_averia, $data)) {
      $this->set_message("Cambios Guardados");
      $ticket = $this->ticket_model->get_ticket($data['id_averia']);
      $this->event->trigger('ticket', 2, $ticket, " nuevo estado: {$ticket['estado']}");
    }
    $this->response_json();
  }

  public function update_ticket_state() {
    if ($data = $this->get_post_data('data')) {
      if ($this->ticket_model->update($data['id_averia'])) {
        $this->set_message('Estado de averia cambiado');

        $ticket = $this->ticket_model->get_ticket($data['id_averia']);
        $this->event->trigger('ticket', 2, $ticket, " nuevo estado: {$ticket['estado']}");
      } else {
        $this->set_message('error al cambiar estado', 'error');
      }
      $this->response_json();
    }
  }

  public function delete_ticket(){

  }

  // comments

  public function add_comment(){
    $response['mensaje'] = MESSAGE_ERROR.' No se pudo agregar el reporte';
    $user    = $this->my_auth->get_user_data();
    $comment = json_decode($this->input->post('data'),true);
    $comment = array_merge($comment,["id_empleado" => $user['user_id']]);

    if ($this->comment_model->add_comment($comment)) {
      $this->set_message('reporte agregado');
    }

     $this->response_json();
  }

  public function get_comments(){
    $data = json_decode($this->input->post('data'),true);
    $response['comments'] = $this->comment_model->get_comments($data['id_averia']);
    echo json_encode($response);
  }

  public function delete_comment(){
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
