<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends MY_Controller {

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
		$this->load->model("extra_model");
    $this->load->model("cancelations_model");
    $this->load->library('parser');
    $this->load->library('twig');

		update_moras($this);
		generar_facturas_mes($this);

 }

	public function index(){
		if(!isset($_SESSION['user_data'])){
			redirect(base_url('app/login'));
    } else {
			redirect(base_url('app/admin/home'));
    }
  }

  public function login($page = 'login') {
    if (!isset($_SESSION['user_data'])) {
      $data  = $this->define_data($page);
      $this->parser->parse('pages/login',$data);
    } else {
      redirect(base_url('app/admin/home'));
    }
  }

	public function admin($page = 'home'){
		authenticate();
    auth_user_type_for_pages($page, 1, base_url('app/admin/home'));

    $data  = $this->define_data($page);
    $data['user'] = get_user_data();
    $data['notifications'] = $this->report_model->count_moras_view();
    $data['left_navigation_header'] = $this->load->view('layouts/left_navigation_header', $page, true);

    $this->twig->display('layouts/header', $data);
    $this->load->view("pages/$page", $data);
    $this->load_modals($page);
		$this->parser->parse('layouts/footer', $data);
  }

	public function imprimir($page){
		authenticate();
		$data['title'] = $page;
		$info = '';

		if ($page == 'cierre') {
			$this->load->model('caja_mayor');
			$info['info'] = $this->caja_mayor->cierres_report('summary');
		}

		$this->load->view('layouts/header_impresos',$data);
		$this->load->view("impresos/$page",$info);
	}

  private function load_modals($page){
    $modals = get_modals($page);
		if($modals != FALSE){
			foreach ($modals as $modal) {
				$this->load->view($modal);
			}
    }
  }

  private function define_data($title, $js = [] , $css = [])
  {
    $jsFiles = [];
    $cssFiles = [];
    $js = array_merge($js,['manifest','vendor', $title]);
    $css = array_merge($css,['secundaryCss.min', '5-others/square/frontend.min', 'main.min']);
    $assets   = 'assets/';

    foreach ($js as $filename) {
      array_push($jsFiles, ['link' => base_url()."{$assets}js/{$filename}.js"]);
    }

    foreach ($css as $filename) {
      array_push($cssFiles,['link' => base_url()."{$assets}css/{$filename}.css"]);
    }

    return [
      'title'=> $title,
      'css'  => $cssFiles,
      'js'   => $jsFiles,
      'url' => base_url()
    ];
  }
}
