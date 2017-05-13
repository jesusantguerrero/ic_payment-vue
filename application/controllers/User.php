<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("user_model");
	}

	public function addnew()
	{ 
		 $data = array(
			'nickname' 	=>	$_POST['nickname'],
   		'password' 	=> 	$_POST['password'],
			'name' 			=> 	$_POST['name'],
			'lastname'	=> 	$_POST['lastname'],
			'dni'				=> 	$_POST['dni'],
			'type'			=> 	$_POST['type'],
		);
   	
   	$resultado = $this->user_model->add_new_user($data);
		echo $resultado;
		
	
	}
}