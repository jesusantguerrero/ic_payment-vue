<?php

  class Event {
    private $session;
    private $user;
    private $ci;

    public function __construct($event_model) {
      $this->user = $_SESSION['user_data'];
      $this->event_model = $event_model['event_model'];
      $this->context = $event_model['context'];
    }

    public function register($user_id, $message_type, $description, $link) {
      
      $event = [
        'id_usuario'    => $user_id ? $user_id : $this->user['user_id'],
        'tipo'          => $message_type,
        'descripcion'   => $description,
        'titulo_enlace' => $link[0],
        'enlace'        => $link[1],
      ];

      return $this->event_model->add($event);
    }

    public function trigger($event_name, $type, $params, $event_message='') {
      $params['event_type'] = $type;
      $params['event_message'] = $event_message;
      call_user_func([$this, $event_name."_event"], $type, $params);
    }

    public function client_event($type, $params) {
      $link = ['cliente', "app/admin/detalles/{$params['id_cliente']}/"];
      $name = strtoupper($params['nombres']." ".$params['apellidos']);
      
      $this->register(null, $type, "cliente $name {$params['event_message']}", $link);
    }

    public function client_link($params) {
      return 'link';
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
