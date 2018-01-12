<?php
 class Report extends MY_Controller {
    public function __construct() {
      parent::__construct();
      $this->load->model('payment_model');
      $this->load->model('report_model');
      $this->my_auth->authenticate();
    }

    // graphic report related

    public function incomes_year($year = null) {
      $year = ($year ? $year :date('Y'));
      $res['incomes'] = $this->payment_model->get_incomes_by_month($year);
      $this->response_json($res);
    }

    public function petty_cash_year($year = null) {
      $salidas       = $this->caja_chica_model->get_transactions_per_month('salida');
      $entradas      = $this->caja_chica_model->get_transactions_per_month('entrada');
      $balances      = $this->caja_chica_model->get_balance_per_month();
    }

    public function installations_year($year = null) {
      $res['installations'] = $this->report_model->get_installations_by_month($year);
      $this->response_json($res);
    }

    public function damages_year($year = null) {

    }

    public function cash_desk_year($year = null){
      $this->load->model('caja_mayor');

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

    public function get_day_income() {
      $income = $this->payment_model->day_income('today');
      $res['income'] = ($income ? $income : 0.00);
      $this->response_json($res);
    }

    public function last_week_incomes() {
      $incomes = [];

      for ($i=0; $i < 7; $i++) {
        array_push($incomes, $this->payment_model->get_weekday_income($i));
      }

      $res['values'] = $incomes;
      $res['total'] = array_sum($incomes);
      $this->response_json($res);
    }

    private function get_months($arr) {
      $months = [];
      foreach ($arr as $item) {
        array_push($months, $item['mes']);
      }
      return $months;
    }

    public function get_general_statistics() {
      $this->load->model('client_model');
      $this->load->model('contract_view_model');

      $res['clients']   = $this->client_model->count_all();
      $res['contracts'] = $this->contract_view_model->count_contracts();
      $this->response_json($res);
    }

    // home page

    public function get_next_payments() {
      $res['nextPayments'] = $this->payment_model->get_next_payments();
      $this->response_json($res);
    }

    public function get_debtors() {
      $res['debtors'] = $this->payment_model->get_debtors();
      $this->response_json($res);
    }

    // document related

    public function get_print_report($table,$type = 'nada'){
      switch ($table) {
        case 'payment':
            $this->report_model->get_payments_report($type);
          break;
        case 'recibos':
            $this->report_model->get_receipts_report();
            break;
        case 'installations':
            $this->report_model->get_installations(true);
          break;
        case 'deudores':
            $this->report_model->get_moras_view(true);
          break;
        case 'tickets':
            $this->report_model->get_tickets_report();
          break;
        case 'clientes':
          $type = str_replace('%20',' ',$type);
          $this->report_model->get_client_report($type);
          break;
        case 'secciones':
          $type = str_replace('%20',' ',$type);
          $this->report_model->get_sections_report($type);
          break;
        case 'retiros':
          $this->cancelations_model->print_report();
          break;
        case 'gastos':
          $this->load->model('caja_mayor');
          $this->caja_mayor->expenses_report();
          break;
        case 'cierres':
          $this->load->model('caja_mayor');
          $this->caja_mayor->cierres_report();
          break;
      }
        redirect(base_url('app/imprimir/reporte'));

    }

 }
