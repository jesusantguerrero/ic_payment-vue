<?php
 class Report extends MY_Controller {
    public function __construct() {
      parent::__construct();
    }

    // graphic report related

    public function payments_year($year = null) {
      $ingresos      = $this->payment_model->get_incomonth_per_month();
    }

    public function petty_cash_year($year = null) {
      $salidas       = $this->caja_chica_model->get_transactions_per_month('salida');
      $entradas      = $this->caja_chica_model->get_transactions_per_month('entrada');
      $balances      = $this->caja_chica_model->get_balance_per_month();
    }

    public function installations_year($year = null) {
      $installations = $this->report_model->get_installations_per_month();
    }

    public function damages_year($year = null) {

    }

    public function cash_desk_year($year = null){
      $this->load->model('caja_mayor');
      authenticate();
      $year = ($year ? $year :date('Y'));
      $months = array_values($GLOBALS['spanish_months']);

      $res['incomes'] = $this->caja_mayor->get_row_by_month('banco', $year);
      $res['expenses']  = $this->caja_mayor->get_row_by_month('total_gastos', $year);
      $res['months'] = $this->get_months($res['incomes']);
      $this->response_json($res);
    }

    public function services_state() {
      $services      = $this->contract_view_model->get_statics_of_services();
    }

    private function get_months($arr) {
      $months = [];
      foreach ($arr as $item) {
        array_push($months, $item['mes']);
      }

      return $months;
    }


 }
