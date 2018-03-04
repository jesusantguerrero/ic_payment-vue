<?php
class MY_Controller extends CI_Controller {
  protected $res;

  public function __construct(){
    parent::__construct();
    $this->load->model('user_model');
    $this->load->model('event_model');
    $this->load->library('MY_Auth', ['user_model' => $this->user_model]);
    $this->load->library('Event', ['event_model' => $this->event_model, 'context' => $this]);
  }

  protected function get_post_data($field = null){
		if ($field) {
			return json_decode($this->input->post($field), true);
		}else {
			return $this->input->post();
		}
	}

	protected function do_upload($dir, $filename) {
		$config = [
			"upload_path" => "./assets/uploads/$dir/",
			"allowed_types" => "svg|png|jpg",
			"max_size" => 200
		];

		$this->load->library('upload', $config);

		if (!$this->upload->do_upload($filename)) {
      return ['error' => $this->upload->display_errors()];
    } else {
			return ['success' => $this->upload->data()];
    }
  }

  protected function response_json($data = null) {
    if (!$data) {
      echo json_encode($this->res);
      return;
    }
    echo json_encode($data);
  }

  protected function set_message($text = '', $type = 'success') {
    $this->res['message'] = ['type' => $type, 'text' => $text];
  }

  protected function is_day_closed() {
    $ci =& get_instance();
    $ci->load->model('caja_mayor');
    $last_close_date = $ci->caja_mayor->get_last_close_date();
    $today = date('Y-m-d');
    if ($last_close_date == $today){
      return true;
    }
  }
}
