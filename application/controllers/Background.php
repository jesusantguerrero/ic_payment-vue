<?php
class Background extends CI_Controller{
  public function __construct() {
    parent::__construct();
    $this->load->model('settings_model');
    $this->load->model('payment_model');
  }

  public function start_atrigger() {
    $this->load->library('MY_Atrigger');
    // $this->my_atrigger->start_job(base_url('background/grettings'));
  }

  public function start() {
    $this->backgroundPost(base_url('background/run_update_moras'));
  }

  public function run_update_moras() {
    $this->generate_month_payments();
    $this->update_moras();
  }

  private function update_moras() {
    $today = date('Y-m-d');
    $settings = $this->settings_model->get_settings();

    $next_check = $settings['next_check'];
    if ($next_check == $today) {
      $moras = $this->payment_model->get_moras_view("group");
      $this->update_state_moras($moras, $this);
      if ($moras) {
        $data = $this->payment_model->get_moras_view();
        if(date('d') == $settings['fecha_corte'] + 1){
          $this->prepare_moras($data, $settings);
          $this->suspension_automatica();
        }
      }
      $result = $this->settings_model->update('last_check_moras', $today);
    }
  }

  private function prepare_moras($data, $settings) {
    foreach ($data as $pago) {
      $fecha = date($pago['fecha_limite']);
      $cuota = get_cuota($pago['id_contrato'], $this);
      $total = $pago['total'];
      $mora  = ($settings['cargo_mora'] / 100) * $cuota;
      $this->payment_model->set_extra([0 => ["servicio" => "Reconexion", "precio"=> $settings['reconexion']]], $pago['id_pago']);
      $extras = $this->payment_model->get_extras($pago['id_pago'], true);

      $total = $pago['cuota'] + $extras['total'] + $mora;

      $updated_data = array(
        'mora'    => $mora,
        'total'   => $total,
        'monto_extra' => $extras['total'],
        'detalles_extra' => $extras['detalles']
      );

      $result = $this->payment_model->update($updated_data, $pago['id_pago']);
    }
  }

  private function update_state_moras($data){
    foreach ($data as $pago) {
      if($pago['estado_cliente'] != 'activo'){
        $estado = $pago['estado_cliente'];
      } else {
        $estado = 'mora';
      }

      $this->db->where('id_cliente',$pago['id_cliente']);
      $this->db->update('ic_clientes',array('estado'=> $estado));
    }
  }

  private function suspension_automatica() {
    $this->db->where('pagos_generados >= 3','',false);
    $contratos = $this->db->get('v_pagos_generados')->result_array();
    foreach ($contratos as $contrato) {
      if($contrato['pagos_generados'] >= 3){
        suspender_contrato($contrato['contrato'],$contrato['id_cliente'], $this);
      }
    }
  }

  private function backgroundPost($url){
    $parts=parse_url($url);

    $fp = fsockopen($parts['host'],
            isset($parts['port'])?$parts['port']:80,
            $errno, $errstr, 30);

    if (!$fp) {
        return false;
    } else {
        $out = "POST ".$parts['path']." HTTP/1.1\r\n";
        $out.= "Host: ".$parts['host']."\r\n";
        $out.= "Content-Type: application/x-www-form-urlencoded\r\n";
        $out.= "Connection: Close\r\n\r\n";
        if (isset($parts['query'])) $out.= $parts['query'];

        fwrite($fp, $out);
        fclose($fp);
        return true;
    }
  }

  private function generate_month_payments() {
    $settings = $this->settings_model->get_settings();
    $hoy = date('Y-m-d');
    $generacion_factura = $settings['dia_generacion_factura'];

    if (date('d') == $generacion_factura && $hoy != $settings['ultima_generacion_factura']) {
      $this->db->select('id_pago, id_contrato');
      $this->db->where("(cast(fecha_limite as date) < cast(curdate() as date) or
                        (date_format(curdate(), '%d') = '$generacion_factura' and date_format(fecha_limite, '%m-%Y') = date_format(now(), '%m-%Y')))",'', false);
      $this->db->where('estado', 'no pagado');
      $this->db->where('generado', false);
      $this->db->where('id_extra is null && abono_a is null','', false);
      if ($pagos = $this->db->get('ic_pagos')) {

        $pagos = $pagos->result_array();
        foreach ($pagos as $pago) {
          $this->payment_model->update(['generado' => 1 ], $pago['id_pago']);
          $this->payment_model->check_extras_fijos($pago['id_pago'], $pago['id_contrato']);
        }
        $this->settings_model->update('ultima_generacion_factura', $hoy);
      }
    } else {
          var_dump($this->db->last_query());
    }
  }
}
