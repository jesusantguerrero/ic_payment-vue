<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MY_Controller {

	public function __construct(){
		parent::__construct();
    $this->load->model("user_model");
    $this->my_auth->authenticate();
	}

	public function add(){

    $data 	= $this->get_post_data('data');
    if ($data) {
      $result = $this->user_model->add_new_user($data);
      switch ($result) {
        case 0:
          $res['message'] = ['type' => 'error', 'text' => 'No pudo guardarse el usuario'];
          break;
        case 1:
          $res['message'] = ['type' => 'success', 'text' => 'Usuario guardado con exito'];
          break;
        case 3:
          $res['message'] = ['type' => 'info', 'text' => 'Este usuario ya existe'];
          break;
      }
    }
    $this->response_json($res);
  }

	public function update($id){

    $data = $this->get_post_data('data');
    $current_user =  $this->my_auth->get_user_data();
    if ($data && $id && $current_user['type'] == 0) {
      $result =	$this->user_model->update_user($data, $id);
      if ($result) {
        $res['message'] = ['type' => 'success', 'text' => 'Usuario actualizado con exito'];
      } else {
        $res['message'] = ['type' => 'error', 'text' => 'Error al actualizar el usuario'];
      }
      $this->response_json($res);
    }
	}

	public function update_field(){

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

		$id = $this->get_post_data('user_id');
		if ($id) {
      $user = $this->user_model->get_user($id);
      $logged_user =  $this->my_auth->get_user_data();

      if ($user['type'] == 0 && $logged_user['nickname'] == $user['nickname']) {
        $res['message'] = ['type' => 'error', 'text' => 'Usted el administrador logeado, no se puede desactivar a si mismo'];
      } else {
        $active = !$user['active'];
        $result = $this->user_model->update_user(['active' => $active], $id);
        if ($result && $active) {
          $res['message'] = ['type' => 'success', 'text' => 'Usuario activado'];
        } else {
          $res['message'] = ['type' => 'success', 'text' => 'Usuario desactivado'];
        }
      }
      $this->response_json($res);
		}
	}

	public function get_users($mode = false){

    $user =  $this->my_auth->get_user_data();
    if ($user['type'] == 0 && !$mode) {
      echo $this->user_model->get_all_users();
    } else if ($mode == 'dropdown') {
      $list = $this->user_model->get_users_list();
      $this->response_json($list);
    }
	}

	public function get_user($id = false){
    if (!$id) {
      $user =  $this->my_auth->get_user_data();
    } else {
      $user = $this->user_model->get_user($id);
      unset($user['password']);
    }
    $user['role'] = $this->my_auth->get_role($user['type']);
    $res['user'] = $user;
		$this->response_json($res);
	}

	public function delete_user(){
    $id = $this->get_post_data('user_id');
    $user =  $this->my_auth->get_user_data();

    if ($id && $user['nickname'] != 'demo') {
      $result = $this->user_model->delete_user($id);
      switch ($result) {
        case 1:
          $res['message'] = ['type' => 'success', 'text' => 'Usuario Eliminado con exito'];
          break;
        case 2:
          $res['message'] = ['type' => 'info', 'text' => 'Este usuario tiene transacciones relacionadas, solo se desactivará'];
          break;
        default:
          $res['message'] = ['type' => 'error', 'text' => 'Error al eliminar el usuario'];
          break;
      }
      $this->response_json($res);
    }
    $this->set_message('Accion desabilitada para demo');
    $this->response_json();
	}

	public function confirm_password(){
    $data = $this->get_post_data('data');
    if ($data) {
      $user_id  = $data['user_id'];
      $password = $data['current_password'];
      $res['is_correct'] = $this->my_auth->confirm_password($user_id, $password);
       if ($res['is_correct']) {
        $res['message'] = ['type' => 'success', 'text' => 'Contraseña confirmada'];
      } else {
        $res['message'] = ['type' => 'error', 'text' => 'Contraseña incorrecta'];
      }
      $this->response_json($res);
    }
  }

	public function update_password(){
    $data = $this->get_post_data('data');
    if ($data && data['current_password'] != 'demo') {
      $user_id 					= $data['user_id'];
      $current_password = $data['current_password'];
      $new_password 		= $data['new_password'];
      $res['is_correct'] = $this->user_model->update_password($user_id, $current_password, $new_password);

      if ($res['is_correct']) {
        $res['message']  = ['type' => 'success', 'text' => 'Contraseña guardada con exito'];
      } else {
        $res['message']  = ['type' => 'error', 'text' => 'Error al guardar la contraseña'];
      }
      $this->response_json($res);
    }
    $this->set_message('Accion desabilitada para el usuario demo', 'info');
    $this->response_json();
	}
}
