<template lang="pug">
  .wide-chart
    ReportChartYearNavigator(@change="getRevenue", title="Ganancias / Gastos", display="true")
    ReportChart(data-class="graphics chart" id="chart-revenue" data-id="chart-revenue", :data="incomes.values", :labels="months", :config="chartConfig.incomes", :ownDataset="dataset")
</template>

<script>
  import ReportChart from './ReportChart.vue';
  import ReportChartYearNavigator from './ReportChartYearNavigator.vue';
  import utils from './../../sharedComponents/utils';
  import Colors from './../../sharedComponents/charts/ChartColors';

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
            money: true
          }
        },
        months: utils.dates.months
      };
    },

    computed: {
      dataset() {
        return [{
          label: 'Gastos',
          backgroundColor: Colors.red,
          borderColor: Colors.red,
          data: this.expenses.values,
          fill: false,
        }, {
          label: 'Banco(Ganancias)',
          fill: false,
          backgroundColor: Colors.blue,
          borderColor: Colors.blue,
          data: this.incomes.values,
        }];
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

