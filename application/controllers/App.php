<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends MY_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model("user_model");
		$this->load->model("client_model");
		$this->load->model("settings_model");
		$this->load->model("company_model");
<<<<<<< HEAD
=======
		$this->load->model("report_model");
>>>>>>> feature/enviroments
    $this->load->library('parser');
    $this->load->library('twig');

		// update_moras($this);
		// generar_facturas_mes($this);
 }

	public function index() {
		if(!isset($_SESSION['user_data'])){
			redirect(base_url('app/login'));
    } else {
			redirect(base_url('app/admin/home'));
    }
  }

  public function login($page = 'login') {
    if (!isset($_SESSION['user_data'])) {
      $data  = $this->define_data($page, ['login']);
      $this->parser->parse('pages/login',$data);
    } else {
      redirect(base_url('app/admin/home'));
    }
  }

<<<<<<< HEAD
	public function admin($page = 'home') {
=======
	public function admin($page = 'home', $params = null) {
>>>>>>> feature/enviroments
		authenticate();
    auth_user_type_for_pages($page, 1, base_url('app/admin/home'));

    $data  = $this->define_data($page, ['app']);
    $data['user'] = get_user_data();
    $data['company'] = $this->company_model->get_company();
    $data['notifications'] = $this->report_model->count_moras_view();
<<<<<<< HEAD
=======
    $data['params'] = $params;
>>>>>>> feature/enviroments
    echo $this->twig->render('layouts/header', $data);
    echo $this->twig->render("pages/".$page, $data);
		$this->parser->parse('layouts/footer', $data);
  }

<<<<<<< HEAD
  public function details($id, $active_window = "pagos") {
		authenticate();
		$_SESSION['client_data'] = $this->client_model->get_client($id);
		$this->session->set_flashdata('active_window', $active_window);
    $this->admin('detalles');
=======
  public function details($id, $active_window = "payments") {
		authenticate();
    $params = [
      'id' => $id,
      'active_window' => $active_window
    ];

    $this->admin('detalles', $params);
>>>>>>> feature/enviroments
	}

	public function imprimir($page) {
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

  private function define_data($title, $js = [] , $css = []) {
    $jsFiles = [];
    $cssFiles = [];
    $js  = array_merge(['manifest','vendor'], $js);
    $css = array_merge(['secundaryCss.min', '5-others/square/frontend.min', 'main.min'], $css);
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
