<?php
  class Auth extends MY_Controller {
    public function __construct() {
      parent::__construct();
    }

    public function do_login(){
      $data = $this->get_post_data('data');
      if ($data) {
        $user = $data['user'];
        $password = $data['password'];
        $res['is_correct'] =  $this->my_auth->login($user, $password);
        $this->response_json($res);
      }
    }

    public function do_logout() {
      $this->my_auth->logout();
    }
  }
