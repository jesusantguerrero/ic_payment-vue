<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("user_model");
		$this->load->model("client_model");
		$this->load->model("service_model");
		$this->load->model("contract_model");
		$this->load->model("payment_model");
		$this->load->helper('modals');
	}

	public function index($page = 'login'){
		if ($page == 'login'):	
			$data['title'] = $page;	
			$this->load->view('_pages/'.$page,$data);
		else:
			echo "Hola mundo";
		endif;
	
	}
	
	public function admin($page = 'home'){
		if(isset($_SESSION['user_data'])){
			if(($page == "administrador" || $page == "reportes") && $_SESSION['user_data']['type'] > 0){
				redirect(base_url('app/admin/home'));
			}
			
			$tooltip = $this->load->view('_layouts/headertooltip','',true);
			$data['title'] = $page;
			$data['tooltip'] =$tooltip;
			$this->load->view('_layouts/header',$data);
			$this->load->view('_pages/'.$page);

			$modals = get_modals($page);
			if($modals != FALSE){
				foreach ($modals as $modal) {
					$this->load->view($modal);
				}
			}
			$this->load->view('_layouts/footer');
		}else{
			echo "usted no puede permanecer aqui";
		}
		
	}

	public function login(){
  	$nickname = $this->input->post('user-input');
  	$password = $this->input->post('password-input');

   	$is_correct = $this->user_model->login($nickname,$password);
		 if($is_correct){
				redirect(base_url('app/admin/home'));
		 }else{
				$this->index();
		 }
  }

	public function logout(){
    session_unset($_SESSION['user_data']);
    session_destroy();
    redirect(base_url());
  }



}