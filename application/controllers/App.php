<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("user_model");
		$this->load->model("client_model");
		$this->load->model("service_model");
		$this->load->model("contract_model");
		$this->load->model("contract_view_model");
		$this->load->model("payment_model");
		$this->load->model("settings_model");
		$this->load->model("company_model");
		$this->load->model("report_model");
		$this->load->model("caja_chica_model");
		$this->load->model("averia_model");
		$this->load->model("section_model");
		
		//update_moras($this);
		
	}

	public function index(){
		if(!isset($_SESSION['user_data'])):	
			$data['title'] = "login";	
			$this->load->view('pages/login',$data);	
		else:
			redirect(base_url('app/admin/home'));
		endif;
	
	}
	
	public function admin($page = 'home'){
		authenticate();
		auth_user_type_for_pages($page,1,base_url('app/admin/home'));
		
		$tooltip = $this->load->view('layouts/headertooltip','',true);
		$data['title'] = $page;
		$data['tooltip'] = $tooltip;
		$this->load->view('layouts/header',$data);
		$this->load->view('pages/' . $page);

		$modals = get_modals($page);
		if($modals != FALSE){
			foreach ($modals as $modal) {
				$this->load->view($modal);
			}
		}
		$this->load->view('layouts/footer');	
	}

	public function imprimir($page){
		authenticate();
		$data['title'] = $page;
		$this->load->view('layouts/header_impresos',$data);
		$this->load->view('impresos/'.$page);
		
	}

	public function login(){
  	$nickname = $_POST['user'];
  	$password = $_POST['password'];

   	$is_correct = $this->user_model->login($nickname,$password);
		 if($is_correct){
			echo $is_correct;
		 }else{
			echo "Sus credenciales han sido incorrectas";
		 }
  }

	public function logout(){
		authenticate();
    session_unset($_SESSION['user_data']);
    session_destroy();
    redirect(base_url());
  }
}