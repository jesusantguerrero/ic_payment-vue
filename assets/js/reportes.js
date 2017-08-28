console.log("hello");

var send = axios.get(BASE_URL + 'caja/get_last_cierre')
send.then(function(response){
  cajaWeekChart(response.data)
})
send.catch(function(error){

})

var colors = {
  green: 'rgba(0,230,118 ,1)',
  blueGreen: 'rgba(29,233,182 ,1)',
  blue7:'rgba(25,118,210 ,1)',
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
          label: "Datos del ultimo cierre. hecho por " + data.autor + " el dia "+data.fecha,
          data: data.values,
          backgroundColor: [colors.lightBlue6,colors.lightBlue6,colors.blue7,colors.lightBlue6,colors.green,colors.blueGreen,colors.deepOrange4,colors.blue7],
          borderColor: 'rgba(54, 162, 235, 1)',
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
                if(label == '' || label == null)label = 0;
                return "RD$ " + CurrencyFormat(label);
              }
            }
          }],
          xAxes: [{
            ticks:{
              callback: function(label, index, labels){
                return label.replace(/_/g," ");
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