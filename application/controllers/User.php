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
		$data = $_POST;
		$result =	$this->user_model->update_user($data);
		echo $result;
	}

	public function getusers(){
		authenticate();
		$this->user_model->get_all_users();
	}

	 public function paginate(){
		authenticate();
		$offset = $_POST['offset'];
		$perpage = $_POST['perpage'];
		$table = $_POST['table'];
		if($offset == 1) $offset = 0;
		if($table == "users"):
			$this->user_model->get_users_paginate($offset,$perpage);
		endif;
	 }

	public function deleteuser(){
		authenticate();
		$id = $_POST['user_id'];
		$this->user_model->delete_user($id);
	}

	public function confirm_password(){
		authenticate();
  	$user_id = $_POST['user_id'];
  	$password = $_POST['current_password'];

   	$is_correct = $this->user_model->confirm_password($user_id,$password);
		 if($is_correct){
			 echo true;
		 }
	
  }



}