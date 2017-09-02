<div class="screen reports row">

  <?php 
  $ingresos      = $this->payment_model->get_incomes_per_month(); 
  $salidas       = $this->caja_chica_model->get_transactions_per_month('salida');
  $entradas      = $this->caja_chica_model->get_transactions_per_month('entrada');
  $balances      = $this->caja_chica_model->get_balance_per_month();
  $services      = $this->contract_view_model->get_statics_of_services();
  $installations = $this->report_model->get_installations_per_month();
  
 ?>
  <div class="col-md-9">
    <div class="row shortcuts-container data-card-container">
      <div class="small-data-card"><i class="material-icons">trending_up</i><span class="data"><?php $this->client_model->count_all_clients(); ?></span>        <span>Clientes</span> </div>
      <div class="small-data-card"><i class="material-icons">timeline</i><span class="data"><?php $this->contract_model->get_active_contracts(); ?></span>        <span>contratos</span>
        <div class="card-detail">
          <a href="<?php echo base_url('process/print_page') ?>" class="cover-links">Reporte Tecnico</a>
        </div>
      </div>
      <div class="small-data-card"><i class="material-icons">equalizer</i><span class="data"><?php $this->contract_model->get_active_clients(); ?></span>        <span> clientes activos</span></div>
    </div>
    <!-- main tab -->
    <div>

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#ingresos" aria-controls="home" role="tab" data-toggle="tab">Ingresos Este Año</a></li>
        <li role="presentation"><a href="#pagos" aria-controls="profile" role="tab" data-toggle="tab">Instalaciones</a></li>
        <li role="presentation"><a href="#balance" aria-controls="messages" role="tab" data-toggle="tab">Balance</a></li>
        <li role="presentation"><a href="#ganancias" aria-controls="messages" role="tab" data-toggle="tab">Ganancias y Cierres</a></li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="ingresos">
          <div class="wide-chart">
            <canvas class="graphics chart" id="mychart"></canvas>
          </div>
          <h4 class="t-right">RD$<span> <?php echo CurrencyFormat($this->payment_model->year_income()); ?> Pesos</span></h4>
        </div>
        <div role="tabpanel" class="tab-pane" id="pagos">
          <div class="wide-chart">
            <canvas class="graphics chart" id="installations-chart"></canvas>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane" id="balance">
          <div class="wide-chart">
            <canvas class="graphics chart" id="balance-chart"></canvas>
          </div>
        </div>

        <div role="tabpanel" class="tab-pane" id="ganancias">
          <div class="wide-chart">
            <canvas class="graphics chart" id="ganancias-chart"></canvas>
          </div>
          <h4 class="t-center no-print hide"> Cierre en detalle</h4>
          <div class="factura-body hide" id="app-vista-detalle">
             <input class="form-control" type="date">
            <div class="cabecera">
              <div class="company-name">
                <h4 class="company-oficial-name t-center">ICS Service</h4>
                <p></p>
              </div>
              <p class="fecha-reporte">Fecha:{{cierre.fecha}}</p>
              <p><b class="hora-reporte">Autor {{cierre.autor}}</b></p>
          </div>
          <div class="concepto"><h4>Cierre de Caja</h4></div>
  
          <div class="cuerpo">
          <p><b>Total de ingresos:</b><span class="right">{{cierre.total_de_ingresos | currencyFormat}}</span></p>
              <p><b>Pagos via Banco: </b><span class="right">{{cierre.pagos_via_banco | currencyFormat}}<span></p>
          <p><b>Pagos en efectivo: </b><span class="right">{{cierre.pagos_en_efectivo | currencyFormat}}<span></p>
          <p><b>Efectivo en caja: </b><span class="right">{{cierre.dinero_real_en_caja | currencyFormat}}<span></p>
          <p><b>Total Descuadre: </b><span class="right">{{cierre.total_descuadre | currencyFormat}}<span></p>
          <p><b>Banco(Ganancia): </b><span class="right">{{cierre.banco | currencyFormat}}<span></p>
          </div>
          <div class="pie-pagina">
	        	<p class="t-center"><a href="#" @click.prevent="print">Imprimir</a></p>
          </div>
          </div>
          <h4 class="t-center no-print hide"> Ultima semana</h4>
          <div class="wide-chart hide">
            <canvas class="graphics chart" id="ganancias-semana-chart"></canvas>
          </div>
          <div class="wide-chart">
            <canvas class="graphics chart" id="ganancias-mes-chart"></canvas>
          </div>
        </div>
      </div>

    </div>

    <!-- end of main tab-->

  </div>
  <div class="col-md-3 right-panel">
    <div>

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#general" aria-controls="home" role="tab" data-toggle="tab">General</a></li>
        <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Semana</a></li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="general">
          <div class="today-data">
            <h5>Ventas de hoy</h5>
            <p> <a target="_blank" href="<?php echo base_url('process/getreport/payment/today') ?>">
              <span class="amount">RD$ <?php echo CurrencyFormat($this->payment_model->day_income("today")) ?></span></a>
              </p>
            </div>
            <div>
              <h5>Clientes Por Servicios</h5>
              <p></p>
              <div class="normal-chart">
                <canvas id="services-chart"></canvas>
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="profile">
            <h5>Ingesos esta semana</h5>
            <p></p>
            <div class="normal-chart">
              <canvas class="little-chart" id="week-chart"></canvas>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script>
    var ingresos = <?php echo json_encode($ingresos)?>;
    var salidas = <?php echo json_encode($salidas) ?>;
    var entradas = <?php echo json_encode($entradas)?>;
    var balances = <?php echo json_encode($balances)?>;
    var services = <?php echo json_encode($services)?>;
    var instalaciones = <?php echo json_encode($installations)?>;
    var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre",
      "Noviembre", "Diciembre"
    ];
    drawChart();
    weekChart();
    servicesChart();
    balanceChart();
    installationsChart();


    function drawChart() {
      var $chartIngresos = $("#mychart");
      var data = {
        labels: months,
        datasets: [{
          label: "Ingresos",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(3,169,244 ,.6)",
          borderColor: "rgba(3,169,244 ,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "dodgerblue",
          pointBackgroundColor: "dodgerblue",
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#0077ff",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: ingresos,
          spanGaps: false,
        }]
      }
      var options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              callback: function (label, index, labels) {
                return "RD$ " + CurrencyFormat(label);
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return "RD$ " + CurrencyFormat(tooltipItem.yLabel);
            }
          }
        }
      }

      var chartIngresos = new Chart($chartIngresos, {
        type: 'line',
        data: data,
        options: options
      });

    }

    function weekChart() {
      var canvas = $("#week-chart");
      var chartOptions = {
        type: 'bar',
        data: {
          labels: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
          datasets: [{
            label: 'ingresos',
            data: [
              <?php echo $this->payment_model->weekday_income("domingo") ?>,
              <?php echo $this->payment_model->weekday_income("lunes") ?>,
              <?php echo $this->payment_model->weekday_income("martes") ?>,
              <?php echo $this->payment_model->weekday_income("miercoles") ?>,
              <?php echo $this->payment_model->weekday_income("jueves") ?>,
              <?php echo $this->payment_model->weekday_income("viernes") ?>,
              <?php echo $this->payment_model->weekday_income("sabado") ?>
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                callback: function (label, index, labels) {
                  return "RD$ " + CurrencyFormat(label);
                }
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                return "RD$ " + CurrencyFormat(tooltipItem.yLabel);
              }
            }
          }
        }
      };
      var mychart = new Chart(canvas, chartOptions);
    }

    function servicesChart() {
      var canvas = $("#services-chart");
      var data = {
        labels: services.nombres,
        datasets: [{
          label: "Clientes",
          fill: true,
          backgroundColor: ["rgba(3,169,244 ,1)", "rgba(3,169,244 ,.8)", "rgba(3,169,244 ,.6)",
            "rgba(3,169,244 ,.4)"
          ],
          borderColor: "rgba(3,169,244 ,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "#555",
          pointBackgroundColor: "dodgerblue",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "dodgerblue",
          pointHoverBorderColor: "#555",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: services.valores,
          spanGaps: false,
        }]
      }
      var options = {
        responsive: true,
        maintainAspectRatio: false
      };
      var myPieChart = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: options
      });
    }

    function balanceChart() {
      var canvas = $("#balance-chart");
      var chartOptions = {
        type: 'bar',
        data: {
          labels: months,
          datasets: [{
              label: 'Entradas',
              data: entradas,
              backgroundColor: 'rgba(37,211,102 ,1)',
              borderWidth: 1
            },
            {
              label: 'Gastos',
              data: salidas,
              backgroundColor: 'rgba(221,75,57 ,1)',
              borderWidth: 1
            },
            {
              label: 'Balance Restante en Caja Chica',
              data: balances,
              backgroundColor: 'rgba(3,169,244 ,1)',
              borderWidth: 1
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          barValueSpacing: 20,
          scales: {
            yAxes: [{
              ticks: {
                callback: function (label, index, labels) {
                  return "RD$ " + CurrencyFormat(label);
                }
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                return "RD$ " + CurrencyFormat(tooltipItem.yLabel);
              }
            }
          }
        }
      };
      var mychart = new Chart(canvas, chartOptions);
    }

    function installationsChart() {
      var $canvas = $("#installations-chart");
      var data = {
        labels: months,
        datasets: [{
          label: "Instalaciones Por Mes",
          borderColor: "rgba(3,169,244 ,1)",
          backgroundColor: 'rgba(3,169,244 ,.7)',
          borderWidth: 1,
          data: instalaciones
        }]
      }

      var options = {
        responsive: true,
        maintainAspectRatio: false
      }

      var mychart = new Chart($canvas, {
        type: 'bar',
        data: data,
        options: options
      });
    }
  </script>

  <script type="text/javascript"></script>


</div>