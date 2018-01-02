
    function BarChart() {
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

    function PieChart() {
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

    function MultiBarChart() {
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
