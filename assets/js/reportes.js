console.log("hello");

var send = axios.get(BASE_URL + 'caja/get_last_cierre')
send.then(function(response){
  cajaWeekChart(response.data)
})
send.catch(function(error){

})

function cajaWeekChart(data) {
    var canvas = $("#ganancias-chart");
    var chartOptions = {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: "Datos del ultimo cierre. hecho por " + data.autor + " el dia "+data.fecha,
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
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