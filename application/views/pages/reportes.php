<div class="screen reports row">


  <div class="col-md-9">
    <div class="row shortcuts-container data-card-container">
      <div class="small-data-card"><i class="material-icons">trending_up</i><span class="data"><?php $this->client_model->count_all_clients(); ?></span>        <span>Clientes</span> </div>
      <div class="small-data-card"><i class="material-icons">timeline</i><span class="data"><?php $this->contract_model->get_active_contracts(); ?></span>        contratos</div>
      <div class="small-data-card"><i class="material-icons">equalizer</i><span class="data"><?php $this->contract_model->get_active_clients(); ?></span>        clientes activos</div>
    </div>
    <!-- main tab -->
    <div>

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#ingresos" aria-controls="home" role="tab" data-toggle="tab">Ingresos Este Año: RD$<span> <?php echo CurrencyFormat($this->payment_model->year_income()); ?> Pesos</span></a></li>
        <li role="presentation"><a href="#pagos" aria-controls="profile" role="tab" data-toggle="tab">Pagos</a></li>
        <li role="presentation"><a href="#balance" aria-controls="messages" role="tab" data-toggle="tab">Balance</a></li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="ingresos">
          <div class="wide-chart">
            <canvas class="graphics chart" id="mychart"></canvas>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane" id="pagos">...</div>
        <div role="tabpanel" class="tab-pane" id="balance">...</div>
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
        <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Mas</a></li>
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
        <div role="tabpanel" class="tab-pane" id="messages">...</div>
      </div>

    </div>
  </div>

</div>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script>
  drawChart();
  weekChart();
  servicesChart();
  <?php 
      $month_incomes;
      for ($i=1; $i <= 12 ; $i++) { 
        $month_incomes[$i] = $this->payment_model->month_income($i);
      }
    ?>

  function drawChart() {
    var $chartIngresos = $("#mychart");
    var data = {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
      ],
      datasets: [{
        label: "Ingresos",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(0,200,255,0.1)",
        borderColor: "dodgerblue",
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
        data: [
          <?php foreach ($month_incomes as $value) {
            if($value == null){
              echo 0 .",";
            }
            else{
              echo strval($value).", ";
            }
          } ?>
        ],
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
        labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
        datasets: [{
          label: 'ingresos',
          data: [
            <?php echo $this->payment_model->weekday_income("monday") ?>,
            <?php echo $this->payment_model->weekday_income("tuesday") ?>,
            <?php echo $this->payment_model->weekday_income("wednesday") ?>,
            <?php echo $this->payment_model->weekday_income("thursday") ?>,
            <?php echo $this->payment_model->weekday_income("friday") ?>,
            <?php echo $this->payment_model->weekday_income("saturday") ?>,
            <?php echo $this->payment_model->weekday_income("sunday") ?>
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
      labels: ["Bronce", "Plata", "Oro"],
      datasets: [{
        label: "Clientes",
        fill: true,
        backgroundColor: ["rgba(0,200,255,0.1)", "rgba(0,200,255,0.4)", "rgba(0,200,255,0.7)"],
        borderColor: "#fff",
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
        data: [10, 50, 80],
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
</script>

<script type="text/javascript"></script>


</div>