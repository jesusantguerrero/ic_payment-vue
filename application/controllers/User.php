<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("user_model");
	}

	public function addnew(){
		authenticate(); 
		$data = $_POST; 
   	$result = $this->user_model->add_new_user($data);
	}

	public function update(){
		authenticate();
		$data = $this->input->post();
		$id = (isset($data['nickname'])) ? $data['nickname'] : $data['user_id'];
		unset($data['user_id']);
		unset($data['nickname']);
		$result =	$this->user_model->update_user($data,$id);
		echo $result;
	}

	public function getusers(){
		authenticate();
		$this->user_model->get_all_users();
	}

	public function get_user(){
		authenticate();
		$data = json_decode($this->input->post('data'), true);
		if($data) {
			$user = $this->user_model->get_user($data['user_id']);
			if ($user) {
				unset($user['password']);
				$user['role'] = get_role($user['type']);
			}
			$response['user'] = $user; 
			echo json_encode($response);
		}
	}

	public function deleteuser(){
		authenticate();
		$id = $_POST['user_id'];
		$this->user_model->delete_user($id);
	}

	public function confirm_password(){
		authenticate();
		$data = json_decode($this->input->post('data'), true);
  	$user_id  = $data['user_id'];
  	$password = $data['current_password'];

   	$response['is_correct'] = $this->user_model->confirm_password($user_id,$password);
		echo json_encode($response); 
  }

	public function update_password(){
		authenticate();
  	$user_id 					= $_POST['user_id'];
  	$current_password = $_POST['current_password'];
		$new_password 		= $_POST['new_password'];
   	$response['is_correct'] = $this->user_model->update_password($user_id,$current_password,$new_password);
		
		$response['message']  = ($response['is_correct']) ? MESSAGE_SUCCESS ." Contraseña guardada con exito" 
																											: MESSAGE_ERROR. " No pudo Guardarse la contraseña";
		 echo json_encode($response); 
  }

}