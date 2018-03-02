<?php

  class Event {
    private $session;
    private $user;
    private $ci;

    public function __construct($user_model) {
      $this->ci =& get_instace();
      $this->session = $_SESSION;
      $this->event_model = $event_model['event_model'];
    }

    public function register($user_id, $message_type, $password, $description, $link_type, $params) {
      
      $event = [
        'id_usuario'  => $user_id,
        'tipo'        => $type,
        'descripcion' => $description,
        'enlace' => call_user_func($link_type, $params)
      ];

      $this->event_model->add($event);
    }

    public function user_link($params) {
      return "{$params['user_id']}";
    }

    public function receipt_link($params) { // ['payment_id' => $id]

    }

    public function contract_link($contract_id, $type) { // ['contract_id => $id, 'type' => $type]

    }

    public function ticket_link($client_id) { // ['client_id' => $id]

    }

    public function free_space() {

    }

  }
