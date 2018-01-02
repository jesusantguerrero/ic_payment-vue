<<<<<<< HEAD
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Extra extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("extra_model");
		$this->load->model("payment_model");
	}

	public function delete_extra(){
		authenticate();
		$data = json_decode($_POST['data'],true);
		$this->extra_model->delete_extra($data);
	}

	public function get_extra_payment_of(){
		authenticate();
		if ($_POST){
			if(isset($_POST['data'])){
				$data = json_decode($_POST['data'],true);
			}else{
				$data = json_decode($_POST,true);
			}
			
				$res['pagos'] = $this->extra_model->get_all_of_extra($data['id_extra']);
				echo json_encode($res);
		}			
	}

	public function get_all() {
		authenticate();	
		$data = json_decode($_POST['data'],true);
		$res = $this->extra_model->get_all($data['state'], $data['text']);
		echo json_encode($res);
	}

	public function get_payment(){
		authenticate();		
		$data = json_decode($_POST['data'],true);
		$res["recibo"] = $this->payment_model->get_payment($data["id_pago"]);
		echo json_encode($res);
	}
	
	public function apply_payment(){
		authenticate();		
		$data = json_decode($_POST['data'],true);
		$info = json_decode($_POST['info'],true);
		if (!$this->payment_model->check_for_update($info['id_pago'])){
			$res['mensaje'] = MESSAGE_INFO.' Este pago ya ha sido realizado';
			echo json_encode($res);
		} else {
			$this->extra_model->apply_payment($data,$info);
		}
	}

	public function edit_payment() {
		authenticate();		
		$data = json_decode($_POST['data'],true);
		$info = json_decode($_POST['info'],true);
		if (!$this->payment_model->check_for_update($info['id_pago']) && $data){
			 $this->extra_model->apply_payment($data,$info);
		}
	}
	
	public function delete_payment(){
		authenticate();		
		$data = json_decode($_POST['data'],true);
		$this->extra_model->delete_payment($data);
	}
	
	public function generate_extra_payment(){
		authenticate();		
		$data = json_decode($_POST['data'],true);
		$this->extra_model->generate_extra_payment($data);
	}

	public function has_extra() {
		authenticate();		
		$data = json_decode($_POST['data'],true);
		$res  = $this->extra_model->has_extra($data['id_cliente']);
		echo json_encode($res);
	}

}
=======
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Extra extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model("extra_model");
		$this->load->model("payment_model");
	}

	public function delete_extra(){
		authenticate();
		$data = json_decode($_POST['data'],true);
		$this->extra_model->delete_extra($data);
	}

	public function get_extra_payment_of(){
		authenticate();
		if ($_POST){
			if(isset($_POST['data'])){
				$data = json_decode($_POST['data'],true);
			}else{
				$data = json_decode($_POST,true);
			}

				$res['pagos'] = $this->extra_model->get_all_of_extra($data['id_extra']);
				echo json_encode($res);
		}
	}

	public function get_all($client_id = null) {
		authenticate();
		$data = $this->get_post_data('data');
    if (!$client_id) {
      $res = $this->extra_model->get_all($data['state'], $data['text']);
    } else {
      $res['extras'] = $this->extra_model->get_all_of_client($client_id);
    }
    $this->response_json($res);
	}

	public function get_payment(){
		authenticate();
		$data = json_decode($_POST['data'],true);
		$res["recibo"] = $this->payment_model->get_payment($data["id_pago"]);
		echo json_encode($res);
	}

	public function apply_payment(){
		authenticate();
		$data = json_decode($_POST['data'],true);
		$info = json_decode($_POST['info'],true);
		if (!$this->payment_model->check_for_update($info['id_pago'])){
			$res['mensaje'] = MESSAGE_INFO.' Este pago ya ha sido realizado';
			echo json_encode($res);
		} else {
			$this->extra_model->apply_payment($data,$info);
		}
	}

	public function edit_payment() {
		authenticate();
		$data = json_decode($_POST['data'],true);
		$info = json_decode($_POST['info'],true);
		if (!$this->payment_model->check_for_update($info['id_pago']) && $data){
			 $this->extra_model->apply_payment($data,$info);
		}
	}

	public function delete_payment(){
		authenticate();
		$data = json_decode($_POST['data'],true);
		$this->extra_model->delete_payment($data);
	}

	public function generate_extra_payment(){
		authenticate();
		$data = json_decode($_POST['data'],true);
		$this->extra_model->generate_extra_payment($data);
	}

	public function has_extra() {
		authenticate();
		$data = json_decode($_POST['data'],true);
		$res  = $this->extra_model->has_extra($data['id_cliente']);
		echo json_encode($res);
	}

}
>>>>>>> feature/enviroments
