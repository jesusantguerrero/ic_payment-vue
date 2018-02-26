<?php

  class Event {
    private $session;
    private $user;
    private $ci;

    public function __construct($user_model) {
      $this->ci =& get_instace();
      $this->session = $_SESSION;
      $this->user_model = $user_model['user_model'];
    }

    public function register($nickname, $password, $mode = 'admin') {

    }

    public function delete($user_id, $password) {

    }

    public function free_space() {

    }

    public function user_link($client_id) {

    }

    public function receipt_link($payment_id) {

    }

    public function contract_link($contract_id, $type) {

    }

    public function ticket_link($client_id) {

    }

  }
