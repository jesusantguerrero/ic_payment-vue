<template lang="pug">
  .wide-chart
    ReportChartYearNavigator(@change="getRevenue", title="Ganancias / Gastos")
    ReportChart(data-class="graphics chart" id="chart-revenue" data-id="chart-revenue", :data="incomes.values", :labels="months", :config="chartConfig.incomes", :ownDataset="dataset")
</template>

<script>
  import ReportChart from './ReportChart.vue';
  import ReportChartYearNavigator from './ReportChartYearNavigator.vue';
  import utils from './../../sharedComponents/utils';

  window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  export default {
    props: {
      data: Object
    },
    components: {
      ReportChart,
      ReportChartYearNavigator
    },

    data() {
      return {
        incomes: {
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          total: 0.00
        },

        expenses: {
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          total: 0.00
        },

        chartConfig: {
          incomes: {
            title: 'Ingresos',
            type: 'line',
            money: true,
          }
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                callback(label) {
                  if (label == '' || label == null) label = 0;
                  return `RD$ ${utils.currencyFormat(label)}`;
                }
              }
            }],
            xAxes: [{
              ticks: {
                callback(label) {
                  return label.replace(/_/g, ' ');
                }
              }
            }]
          },
          tooltips: {
            callbacks: {
              label(tooltipItem) {
                return `RD$ ${utils.currencyFormat(tooltipItem.yLabel)}`;
              }
            }
          },
          title: {
            display: true,
            text: `Datos del ultimo cierre. hecho por ${this.data.autor} el dia ${this.data.fecha}`
          }
        }
      };
    },

    computed: {
      dataset() {
        return {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [{
              label: 'Valores',
              data: data.values,
              backgroundColor: [colors.lightBlue6, colors.lightBlue6, colors.blue7, window.chartColors.blue, window.chartColors.green, colors.blueGreen, window.chartColors.red, window.chartColors.red, window.chartColors.blue],
            }]
          }
        };
      }
    },

    mounted() {
      this.getRevenue();
    },

    methods: {
      getRevenue(year) {
        const theYear = year || new Date().getFullYear();
        this.$http.get(`report/cash_desk_year/${theYear}`)
          .then((res) => {
            this.expenses = res.data.expenses;
            this.incomes = res.data.incomes;
          });
      }
    }
  };
</script>

