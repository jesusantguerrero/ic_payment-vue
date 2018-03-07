<?php

  class Event {
    private $session;
    private $user;
    private $ci;

    public function __construct($event_model) {
      $this->user = isset($_SESSION['user_data']) ? $_SESSION['user_data']: [];
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
      $name = $this->get_client($params);
      $this->register(null, $type, "cliente $name {$params['event_message']}", $link);
    }

    public function contract_event($type, $params) {
      $link = ['contrato', "app/admin/detalles/{$params['id_cliente']}/contract"];
      $name = $this->get_client($params);
      $this->register(null, $type, "contrato codigo {$params['id_contrato']} del cliente $name {$params['event_message']}", $link);
    }

    public function service_event($type, $params) {
      $link = ['servicio', "app/admin/servicio"];
      $this->register(null, $type, "servicio: {$params['nombre']} {$params['event_message']}", $link);
    }

    public function ticket_event($type, $params) {
      $link = ['averia', "app/admin/averias"];
      $name = $this->get_client($params);
      $this->register(null, $type, "averia - contrato #{$params['id_contrato']} - cliente $name {$params['event_message']}", $link);
    }

    public function petty_cash_event($type, $params) {
      $link = ['caja chica', "app/admin/"];
      $this->register(null, $type, "{$params['event_message']}", $link);
    }


    public function free_space() {

    }

    public function get_client($params) {
      return (isset($params['cliente'])) ? strtoupper($params['cliente']) : strtoupper($params['nombres']." ".$params['apellidos']);
    }

  }
