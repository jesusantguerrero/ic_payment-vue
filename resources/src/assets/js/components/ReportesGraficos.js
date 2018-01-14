
    if (currentPage == 'reportes'){
      fetchReportData();
    }

    function fetchReportData() {
      var send = axios.get(BASE_URL + 'caja/get_last_cierre')
      send.then(function (response) {
        cajaWeekChart(response.data);
        appVistaDetalle.cierre = response.data.cierre;
      })
      send.catch(function (error) {

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
            backgroundColor: [colors.lightBlue6, colors.lightBlue6, colors.blue7, window.chartColors.blue,window.chartColors.green, colors.blueGreen, window.chartColors.red,window.chartColors.red,  window.chartColors.blue],
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
