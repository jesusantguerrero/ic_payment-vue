<div class="screen reports row">
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

  <div class="col-md-9">
    <div class="row shortcuts-container data-card-container">
      <div class="small-data-card"><i class="material-icons">trending_up</i><span class="data"><?php $this->client_model->count_clients(); ?></span> <span>Clientes</span> </div>
      <div class="small-data-card"><i class="material-icons">timeline</i>5 contratos</div>
      <div class="small-data-card"><i class="material-icons">equalizer</i>6 clientes activos</div>   
    </div>
    <h4>Ingresos Este Año</h4>
    <div class="graphics chart" id="mychart"></div>
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
      <div id="services-chart">

      </div>
    </div>
    
  </div>

  <script>
     google.charts.load('current', {'packages':['line','corechart']});
     google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Meses');
      data.addColumn('number', 'Ingresos');

     

      var options = {
        chart: {
          title: ' '
        },
        width: '100%',
        height: '100%',
        animation:{
          "duration": 3000,         
          "easing": 'out',
          "startup": true,
        }
      };

       data.addRows([
        ['Ene',  37.8],
        ['Feb',  30.9],
        ['Mar',  25.4],
        ['Abr',  11.7],
        ['May',  11.9],
        ['Jun',   8.8],
        ['Jul',   7.6],
        ['Ago',  12.3],
        ['Sep',  12.3],
        ['Oct',  12.3],
        ['Nov',  12.3],
        ['Dic',  12.3]
      ]);

      var chart = new google.charts.Line(document.getElementById('mychart'));
      chart.draw(data,options);
      drawChart2();
      function drawChart2() {
        var servicesData = google.visualization.arrayToDataTable([
          ['Servicios', 'Clientes'],
          ['Bronce',     11],
          ['Plata',      2],
          ['Oro',  2]
        ]);

        var options = {
          title: ' ',
          pieHole: 0.7,
          width: '100%',
          height: '100%',
          colors:["dodgerblue","#07f","#08f"]
        };

        var chart2 = new google.visualization.PieChart(document.getElementById('services-chart'));
        chart2.draw(servicesData, options);
      }
    }
  </script>

   <script type="text/javascript">
      
    </script>


</div>