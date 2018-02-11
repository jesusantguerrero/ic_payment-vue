<?php

  class MY_Auth {
    private $session;
    private $user;

    public function __construct($user_model) {
      $this->session = $_SESSION;
      $this->user_model = $user_model['user_model'];
    }

    public function login($nickname, $password, $mode = 'admin') {
      $user = $this->user_model->get_user($nickname);
      if ($user) {
        if (password_verify($password, $user['password']) && $user['active']) {
          $_SESSION['user_data'] = $user;
          $_SESSION['user_data']['password'] = '';
          $this->user_model->update_user(['last_login' => date('Y-m-d H:i:s')], $user['user_id'], false);
          return true;
        }
      }
    }

    public function confirm_password($user_id, $password) {
      $user = $this->user_model->get_user($user_id);
      if ($user) {
        if(password_verify($password, $user['password'])){
          return true;
        }
      }
    }

    public function logout() {
      session_unset($this->session['user_data']);
      session_destroy();
      redirect(base_url());
    }

    public function get_user_data() {
      if(isset($this->session['user_data'])) {
        $user = $this->session['user_data'];
        $fullname = $user['name']." ".$user['lastname'];
        if($user['type'] == 0){
          $type = "Administrador";
        }else{
          $type = "Secretaria(o)";
        }

        $user['fullname'] = $fullname;
        $user['typestr'] = $type;
        $user['password'] = '';

        return $user;
      }
    }

    public function isLoged() {
      return (bool) isset($this->session['user_data']);
    }

    public function authenticate() {
      if(!$this->isLoged()){
        redirect(base_url());
        return;
      }
    }

    public function resetPassword() {
      // TODO: next version
    }

    public function getToken() {
      // TODO: next version
    }

    public function has_permission($page, $type, $redirect = null) {
      $forbiden_sections[1] = ["administrador", "reportes", 'secciones', 'informes'];
      if(in_array($page,$forbiden_sections[$type]) && $this->current_user_type($type)){
        if($redirect){
          redirect($redirect);
        }
        return true;
      }
      return false;
    }


    public function current_user_type($type){
      if($this->session['user_data']['type'] == $type){
        return true;
      }
      return false;
    }

    public function get_role($type){
      $roles = ['admnistrador', 'secretaria(o)', 'tecnico'];
      return $roles[$type];
    }

    private function hash($password) {
      return password_hash($password, PASSWORD_DEFAULT);
    }

  }
