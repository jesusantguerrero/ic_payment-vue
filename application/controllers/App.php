<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("user_model");
	}

	public function index($page = 'login')
	{
		if ($page == 'login'):	
			$data['title'] = $page;	
			$this->load->view('_pages/'.$page,$data);
		else:
			echo "Hola mundo";
		endif;
	
	}
	
	public function admin($page = 'home'){
		$data['title'] = $page;
		$this->load->view('_layouts/header',$data);
		$this->load->view('_pages/'.$page);
		$this->load->view('_layouts/footer');
	}


}