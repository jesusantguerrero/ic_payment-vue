<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MY_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("user_model");
	}

	public function add(){
		authenticate();
    $data 	= $this->get_post_data();
    if ($data) {
      $result = $this->user_model->add_new_user($data);
    }
	}

	public function update(){
		authenticate();
    $data = $this->get_post_data();
    if ($data) {
      $id 	= (isset($data['nickname'])) ? $data['nickname'] : $data['user_id'];
      unset($data['user_id']);
      unset($data['nickname']);
      $result =	$this->user_model->update_user($data,$id);
      echo $result;
    }
	}

	public function update_field(){
		authenticate();
    $data = $this->get_post_data('data');
    if ($data) {
      $credentials = ['id' => $data['user_id'], 'password' => $data['password']];

      $res['is_correct'] = $this->user_model->update_field($data['field'], $credentials, $data['value']);
      if ($res['is_correct']) {
        $res['message'] = ['type' => 'success', 'text' => 'Datos actualizados con exito'];
      } else {
        $res['message'] = ['type' => 'error', 'text' => 'Error al actualizar'];
      }
      $this->response_json($res);
    }
	}

	public function change_state(){
		authenticate();
		$id = $this->get_post_data('user_id');
		if ($id) {
			$user = $this->user_model->get_user($id);
			$active = !$user['active'];
			$this->user_model->update_user(['active' => $active], $id);
		}
	}

	public function get_users(){
		authenticate();
		$this->user_model->get_all_users();
	}

	public function get_user(){
		authenticate();
		$user = get_user_data();
    $user['role'] = get_role($user['type']);
    $res['user'] = $user;
		$this->response_json($res);
	}

	public function delete_user(){
		authenticate();
    $id = $this->get_post_data('user_id');
    if ($id) {
      $this->user_model->delete_user($id);
    }
	}

	public function confirm_password(){
		authenticate();
    $data     = $this->get_post_data('data');
    if ($data) {
      $user_id  = $data['user_id'];
      $password = $data['current_password'];
      $res['is_correct'] = $this->user_model->confirm_password($user_id, $password);
       if ($res['is_correct']) {
        $res['message'] = ['type' => 'success', 'text' => 'Contraseña confirmada'];
      } else {
        $res['message'] = ['type' => 'error', 'text' => 'Contraseña incorrecta'];
      }
      $this->response_json($res);
    }
  }

	public function update_password(){
		authenticate();
    $data = $this->get_post_data('data');

    if ($data) {
      $user_id 					= $data['user_id'];
      $current_password = $data['current_password'];
      $new_password 		= $data['new_password'];
      $res['is_correct'] = $this->user_model->update_password($user_id,$current_password,$new_password);

      if ($res['is_correct']) {
        $res['message']  = ['type' => 'success', 'text' => 'Contraseña guardada con exito'];
      } else {
        $res['message']  = ['type' => 'error', 'text' => 'Error al guardar la contraseña'];
      }
      $this->response_json($res);
    }
	}
}
