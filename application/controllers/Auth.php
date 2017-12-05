<?php
  class Auth extends MY_Controller {
    public function __construct() {
      parent::__construct();
      $this->load->model('user_model');
    }

    public function do_login(){
      $data = $this->get_post_data('data');
      if ($data) {
        $user = $data['user'];
        $password = $data['password'];
        $res['is_correct'] = $this->user_model->login($user, $password);
        $this->response_json($res);
      }
    }

    public function do_logout(){
      authenticate();
      session_unset($_SESSION['user_data']);
      session_destroy();
      redirect(base_url());
    }
  }
