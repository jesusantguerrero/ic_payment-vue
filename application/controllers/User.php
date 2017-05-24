<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("user_model");
	}

	public function addnew(){ 
		$data = $_POST; 
   	$result = $this->user_model->add_new_user($data);
	}

	public function update(){
		$data = $_POST;
		$result =	$this->user_model->update_user($data);
		echo $result;
	}

	public function getusers(){
		$this->user_model->get_all_users();
	}

	 public function paginate(){
		$offset = $_POST['offset'];
		$perpage = $_POST['perpage'];
		$table = $_POST['table'];
		if($offset == 1) $offset = 0;
		if($table == "users"):
			$this->user_model->get_users_paginate($offset,$perpage);
		endif;
	 }

	public function deleteuser(){
		$id = $_POST['user_id'];
		$this->user_model->delete_user($id);
	}



}