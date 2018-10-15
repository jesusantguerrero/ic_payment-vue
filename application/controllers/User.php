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
          $this->set_message('No pudo guardarse el usuario');
          break;
        case 1:
          $this->set_message('Usuario guardado con exito');
          break;
        case 3:
          $this->set_message('Este usuario ya existe');
          break;
      }
    }
    $this->response_json();
  }

	public function update($id){

    $data = $this->get_post_data('data');
    $current_user =  $this->my_auth->get_user_data();
    if ($data && $id && $current_user['type'] == 0) {
      $result =	$this->user_model->update_user($data, $id);
      if ($result) {
        $this->set_message('Usuario actualizado con exito');
      } else {
        $this->set_message('Error al actualizar el usuario', 'error');
      }
      $this->response_json();
    }
	}

	public function update_field(){

    $data = $this->get_post_data('data');
    if ($data) {
      $credentials = ['id' => $data['user_id'], 'password' => $data['password']];

      $this->res['is_correct'] = $this->user_model->update_field($data['field'], $credentials, $data['value']);
      if ($this->res['is_correct']) {
        $this->set_message('Datos actualizados con exito', 'success');
      } else {
        $this->set_message('Error al actualizar', 'error');
      }
      $this->response_json();
    }
	}

	public function change_state(){
		$id = $this->get_post_data('user_id');
		if ($id) {
      $user = $this->user_model->get_user($id);
      $logged_user =  $this->my_auth->get_user_data();

      if ($user['type'] == 0 && $logged_user['nickname'] == $user['nickname']) {
        $this->set_message('Usted el administrador logeado, no se puede desactivar a si mismo', 'info');
      } else {
        $active = !$user['active'];
        $result = $this->user_model->update_user(['active' => $active], $id);
        if ($result && $active) {
          $this->set_message('Usuario activado', 'success');
        } else {
          $this->set_message('Usuario desactivado', 'success');
        }
      }
      $this->response_json();
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
          $this->set_message('Usuario Eliminado con exito');
          break;
        case 2:
          $this->set_message('Este usuario tiene transacciones relacionadas, solo se desactivará', 'info');
          break;
        default:
          $this->set_message('Error al eliminar el usuario', 'error');
          break;
      }
    } else {
      $this->set_message('Accion desabilitada para demo');
    }
    $this->response_json();
	}

	public function confirm_password(){
    $data = $this->get_post_data('data');
    if ($data) {
      $user_id  = $data['user_id'];
      $password = $data['current_password'];
      $this->res['is_correct'] = $this->my_auth->confirm_password($user_id, $password);
       if ($this->res['is_correct']) {
        $this->set_message('Contraseña confirmada');
      } else {
        $this->set_message('Contraseña incorrecta', 'error');
      }
      $this->response_json();
    }
  }

	public function update_password(){
    $data = $this->get_post_data('data');
    if ($data && $data['current_password'] != 'demo') {
      $user_id 					= $data['user_id'];
      $current_password = $data['current_password'];
      $new_password 		= $data['new_password'];
      $this->res['is_correct'] = $this->user_model->update_password($user_id, $current_password, $new_password);

      if ($this->res['is_correct']) {
        $this->set_message('Contraseña guardada con exito');
      } else {
        $this->set_memssage('Error al guardar la contraseña', 'error');
      }
      $this->response_json();
    }
    $this->set_message('Accion desabilitada para el usuario demo', 'info');
    $this->response_json();
	}
}
