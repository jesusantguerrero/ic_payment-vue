console.log("hello");

var send = axios.get(BASE_URL + 'caja/get_last_cierre')
send.then(function (response) {
  cajaWeekChart(response.data);
  appVistaDetalle.cierre = response.data.cierre;
})
send.catch(function (error) {

})

var form = "data="+ JSON.stringify({year:moment().format("YYYY")})
var send2 = axios.post(BASE_URL + 'caja/get_year_info',form)
send2.then(function(res){
  var gastos    = res.data.gastos;
  var ganancias = res.data.ganancias;
  yearChart(gastos,ganancias);
})

window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var colors = {
  green: 'rgba(0,230,118 ,1)',
  blueGreen: 'rgba(29,233,182 ,1)',
  blue7: 'rgba(25,118,210 ,1)',
  lightBlue6: 'rgba(3,155,229 ,1)',
  red3: 'rgba(229,115,115 ,1)',
  deepOrange4: 'rgba(255,112,67 ,1)'
}

function cajaWeekChart(data) {
  var canvas = $("#ganancias-chart");
  var chartOptions = {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: "Valores",
        data: data.values,
        backgroundColor: [colors.lightBlue6, colors.lightBlue6, colors.blue7, colors.lightBlue6, colors.green, colors.blueGreen, window.chartColors.red, colors.blue7],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            callback: function (label, index, labels) {
              if (label == '' || label == null) label = 0;
              return "RD$ " + CurrencyFormat(label);
            }
          }
        }],
        xAxes: [{
          ticks: {
            callback: function (label, index, labels) {
              return label.replace(/_/g, " ");
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
      },
      title: {
        display: true,
        text: "Datos del ultimo cierre. hecho por " + data.autor + " el dia " + data.fecha
      }
    }
  };
  var mychart = new Chart(canvas, chartOptions);
}

function yearChart(gastos,ganancias) {
  var $canvas = $("#ganancias-mes-chart");
  var data = {
      labels: meses,
      datasets: [{
        label: "Gastos",
        backgroundColor: window.chartColors.red,
        borderColor: window.chartColors.red,
        data: gastos,
        fill: false,
      }, {
        label: "Banco(Ganancias)",
        fill: false,
        backgroundColor: window.chartColors.blue,
        borderColor: window.chartColors.blue,
        data: ganancias,
      }]
    };

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
      },
      title: {
        display: true,
        text: "Registros de cierre Este ultimo año"
      }
    }

  var chart = new Chart($canvas, {
    type: 'line',
    data: data,
    options: options
  });

}

var cierre = { 
  autor: "",
  banco: 0,
  dinero_real_en_caja: 0,
  fecha : '',
  pago_de_facturas: 0,
  pagos_de_extras: 0,
  pagos_en_efectivo:0,
  pagos_via_banco:0,
  total_de_ingresos: 0,
  total_descuadre:0 }

var appVistaDetalle = new Vue({
  el: '#app-vista-detalle',
  data: {
    cierre: cierre,
  },

  filters: {
    currencyFormat: function(number){
      return "RD$ "+ CurrencyFormat(number);
    }
  },
  methods:{
    print: function(){
      print()
    }
  }
})