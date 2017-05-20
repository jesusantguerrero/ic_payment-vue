<div class="screen reports row">


  <div class="col-md-9">
    <div class="row shortcuts-container data-card-container">
      <div class="small-data-card"><i class="material-icons">trending_up</i><span class="data"><?php $this->client_model->count_clients(); ?></span> <span>Clientes</span> </div>
      <div class="small-data-card"><i class="material-icons">timeline</i>5 contratos</div>
      <div class="small-data-card"><i class="material-icons">equalizer</i>6 clientes activos</div>   
    </div>
    <h4>Ingresos Este Año</h4>
    <div class="wide-chart">
      <canvas class="graphics chart" id="mychart"></canvas>
    </div>
  </div>
  <div class="col-md-3 right-panel">
    <h4>Detalles Generales</h4>
    <div>
      <h5>Datos de hoy</h5>
      <p></p>
    </div>
    <div>
      <h5>Clientes Por Servicios</h5>
      <p></p>
      <div class="normal-chart">
        <canvas id="services-chart"></canvas>
      </div>   
      <h5>Ingesos esta semana</h5>
      <p></p>
      <div class="normal-chart">
        <canvas class="little-chart" id="week-chart"></canvas> 
       </div> 
    </div>
    
  </div>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script>
    drawChart();
    weekChart();
    servicesChart();
    function drawChart() {
      var $chartIngresos = $("#mychart");
      var data = {
        labels: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
        datasets:[{
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
          data: [10000, 5000, 8000, 8100, 5600, 5500, 4000,8000, 8100, 5600, 5500, 4000],
          spanGaps: false,
        }]
      }
      var options = {
        responsive: true,
        maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                    beginAtZero:true
                }
              }]
            }
          }

      var chartIngresos = new Chart($chartIngresos,{
        type: 'line',
        data: data,
        options: options
      }); 
      
    }

    function weekChart(){
        var canvas = $("#week-chart");
        var chartOptions = {
          type: 'bar',
          data:{
            labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
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
                    beginAtZero:true
                }
              }]
            }
          }
        };
        var mychart = new Chart(canvas,chartOptions);
    }
    
    function servicesChart(){
      var canvas = $("#services-chart");
      var data = {
        labels: ["Bronce","Plata","Oro"],
        datasets:[{
          label: "Clientes",
          fill: true,
          backgroundColor: ["rgba(0,200,255,0.1)","rgba(0,200,255,0.4)","rgba(0,200,255,0.7)"],
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
      var myPieChart = new Chart(canvas,{
        type: 'doughnut',
        data: data,
        options: options
      });
    }
  
  </script>

   <script type="text/javascript"></script>


</div>