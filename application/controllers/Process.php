<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Process extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("client_model");
	}

	public function add(){ 
		$data = $_POST;
		$tabla = $_POST['tabla'];

		if($tabla == "clientes"){
			$result = $this->client_model->add($data);
		} 
   	
		
	}

	public function update(){
		$data = $_POST;
		$result =	$this->user_model->update_user($data);
		echo $result;
	}

	public function getall(){
		$tabla = $_POST['tabla'];
		if($tabla == "clientes"){
			$result = $this->client_model->get_all_clients();
		} 
	}

	public function paginate(){
		$offset = $_POST['offset'];
		$perpage = $_POST['perpage'];
		$table = $_POST['table'];
		if($offset == 1) $offset = 0;
		if($table == "clientes"):
			$this->client_model->get_clients_paginate($offset,$perpage);
		endif;
	}

	public function deleteuser(){
		$id = $_POST['user_id'];
		$this->user_model->delete_user($id);
	}

	public function countusers(){
		$this->user_model->count_users();
	}

}