<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends MY_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model("user_model");
		$this->load->model("client_model");
		$this->load->model("settings_model");
		$this->load->model("company_model");
		$this->load->model("report_model");
    $this->load->library('parser');
    $this->load->library('twig');

		// update_moras($this);
		// generar_facturas_mes($this);
 }

	public function index() {
		if(!$this->my_auth->isLoged()){
			redirect(base_url('app/login'));
    } else {
			redirect(base_url('app/admin/home'));
    }
  }

  public function login($page = 'login') {
    if (!$this->my_auth->isLoged()) {
      $data  = $this->define_data($page, ['login']);
      $this->parser->parse('pages/login',$data);
    } else {
      redirect(base_url('app/admin/home'));
    }
  }

	public function admin($page = 'home', $params = null) {
		 $this->my_auth->authenticate();
     $this->my_auth->has_permission($page, 1, base_url('app/admin/home'));
    $data = $this->get_global_data($page, $params);

    echo $this->twig->render('layouts/header', $data);
    echo $this->twig->render("pages/".$page, $data);
		$this->parser->parse('layouts/footer', $data);
  }

  public function details($id, $active_window = "payments") {
		 $this->my_auth->authenticate();
    $params = [
      'id' => $id,
      'active_window' => $active_window
    ];

    $this->admin('detalles', $params);
	}

	public function imprimir($page) {
		 $this->my_auth->authenticate();
		$data['title'] = $page;
		$info = '';

		if ($page == 'cierre') {
			$this->load->model('caja_mayor');
			$info['info'] = $this->caja_mayor->cierres_report('summary');
		}

		$this->load->view('layouts/header_impresos',$data);
		$this->load->view("impresos/$page",$info);
	}

  private function get_global_data($page, $params) {
    $data  = $this->define_data($page, ['app'], ['app']);
    $data['user'] =  $this->my_auth->get_user_data();
    $data['company'] = $this->company_model->get_company();
    $data['notifications'] = $this->report_model->count_moras_view();
    $data['params'] = $params;
    return $data;
  }

  private function define_data($title, $js = [] , $css = []) {
    $jsFiles = [];
    $cssFiles = [];
    $js  = array_merge(['lib/pace.min','manifest','vendor'], $js);
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
