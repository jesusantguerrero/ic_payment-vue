<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Process extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('user_model');
		$this->load->model("client_model");
		$this->load->model("service_model");
	}

	public function add(){ 
		$data = $_POST;
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "clientes":
				$this->client_model->add($data);
				break;
			case "servicios":
				$this->service_model->add($data);
				break;
		}

	}

	public function update(){
		$data = $_POST;
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "clientes":
				$this->client_model->update_client($data);
				break;
			case "servicios":
				$this->service_model->update_service($data);
				break;
		}
	}

	public function getall(){
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case "clientes":
				$this->client_model->get_all_clients();
				break;
			case "servicios":
				$this->service_model->get_all_services();
				break;
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

	public function delete(){
		$id = $_POST['id'];
		$tabla = $_POST['tabla'];

		switch ($tabla) {
			case 'clientes':
				$this->client_model->delete_client($id);
				break;
			case 'servicios':
				$this->service_model->delete_service($id);
				break;
			default:
				# code...
				break;
		}
	}

	public function count(){
		$tabla = $_POST['tabla'];
		switch ($tabla) {
			case 'users':
				$this->user_model->count_users();
				break;
			case 'clientes':
				$this->client_model->count_clients();
				break;
			case 'servicios':
				$this->service_model->count_services();
				break;
			default:
				# code...
				break;
		}
	}

	public function search(){
		$tabla = $_POST['tabla'];
		$word = $_POST['word'];
		if($tabla == "clientes"){
			$result = $this->client_model->search_clients($word);
		} 
	}

	public function details($id){

		$_SESSION['client_data'] = $this->client_model->get_client($id);
		redirect(base_url('app/admin/detalles'));
	}

}