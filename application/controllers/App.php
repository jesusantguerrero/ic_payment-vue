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
		$this->load->helpers('modals','users');
		$this->load->helper(array('report','payment'));
		
		update_moras($this);
		
		
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
		if(isset($_SESSION['user_data'])){
			if(($page == "administrador" || $page == "reportes") && $_SESSION['user_data']['type'] > 0){
				redirect(base_url('app/admin/home'));
			}	
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
		}else{
			echo "usted no puede permanecer aqui".$GLOBALS['lastCheckedForMoras'];
		}
		
	}

	public function imprimir($page){
		if(isset($_SESSION['user_data'])){
			$data['title'] = $page;
			$this->load->view('layouts/header_impresos',$data);
			$this->load->view('impresos/'.$page);
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