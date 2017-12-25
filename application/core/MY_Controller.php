<?php
class MY_Controller extends CI_Controller {
  protected $res;

  public function __construct(){
    parent::__construct();
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
}
