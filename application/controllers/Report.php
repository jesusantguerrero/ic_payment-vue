<?php
 class Report extends MY_Controller {
    public function __construct() {
      parent::__construct();
      $this->load->model('payment_model');
      $this->load->model('report_model');
      $this->load->model('petty_cash_model');
      $this->my_auth->authenticate();
    }

    #region graphic report related

    public function incomes_year($year = null) {
      $year = ($year ? $year :date('Y'));
      $res['incomes'] = $this->payment_model->get_incomes_by_month($year);
      $this->response_json($res);
    }

    public function last_week_incomes() {
      $incomes = [];

      for ($i=0; $i < 7; $i++) {
        array_push($incomes, $this->payment_model->weekday_income($i));
      }

      $res['week_incomes']['values'] = $incomes;
      $res['week_incomes']['total'] = array_sum($incomes);
      $this->response_json($res);
    }

    public function get_day_income() {
      $income = $this->payment_model->day_income('today');
      $res['income'] = ($income ? $income : 0.00);
      $this->response_json($res);
    }

    #endregion

    #region petty cash and cash desk
    public function petty_cash_year($year = null) {
      $year = ($year ? $year : date('Y'));
      $res['incomes']   = $this->petty_cash_model->get_transactions_per_month('salida', $year);
      $res['expenses']  = $this->petty_cash_model->get_transactions_per_month('entrada', $year);
      $this->response_json($res);
    }


    public function cash_desk_year($year = null){
      $this->load->model('caja_mayor');
      $year = ($year ? $year : date('Y'));

      $res['incomes']   = $this->caja_mayor->get_row_by_month('banco', $year);
      $res['expenses']  = $this->caja_mayor->get_row_by_month('total_gastos', $year);
      $this->response_json($res);
    }
    #endregion

    #region installations , cancelations and damages
    public function installations_year($year = null) {
      $res['installations'] = $this->report_model->get_installations_by_month($year);
      $this->response_json($res);
    }

    public function damages_year($year = null) {

    }
    #endregion

    #region services and generals
    public function services_state() {
      $services      = $this->contract_view_model->get_statics_of_services();
    }




    public function general_statistics() {
      $this->load->model('client_model');
      $this->load->model('contract_view_model');

      $res['clients']   = $this->client_model->count_all();
      $res['contracts'] = $this->contract_view_model->count_contracts();
      $this->response_json($res);
    }
    #endregion

    #region home page

    public function get_next_payments() {
      $res['nextPayments'] = $this->payment_model->get_next_payments();
      $this->response_json($res);
    }

    public function get_debtors($mode = null) {
      if ($mode == 'table') {
        $res['debtors'] = $this->report_model->get_debtors_view();
      } else {
        $res['debtors'] = $this->payment_model->get_debtors();
      }
      $this->response_json($res);
    }
    #endregion

    #region document related
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
            $this->report_model->get_debtors_view(true);
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
    #endregion

 }
