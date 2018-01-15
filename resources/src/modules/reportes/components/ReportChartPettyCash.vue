<template lang="pug">
  .wide-chart
    ReportChartYearNavigator(@change="getPettyCashBalance", title="Caja Chica Entradas / Salidas" display="true")
    ReportChart(data-class="graphics chart" id="chart-balance" data-id="chart-balance", :data="incomes.values", :labels="months", :config="chartConfig.incomes", :ownDataset="dataset")
</template>

<script>
  import ReportChart from './ReportChart.vue';
  import ReportChartYearNavigator from './ReportChartYearNavigator.vue';
  import Colors from './../../sharedComponents/charts/ChartColors';
  import utils from './../../sharedComponents/utils';

  const emptyMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
          values: emptyMonth.slice(),
          total: 0.00
        },

        expenses: {
          values: emptyMonth.slice(),
          total: 0.00
        },

        chartConfig: {
          incomes: {
            title: 'Ingresos',
            type: 'bar',
            money: true,
          }
        },
        months: utils.dates.months
      };
    },

    computed: {
      dataset() {
        return [{
          label: 'Entradas',
          data: this.incomes.values,
          backgroundColor: Colors.blue,
          borderWidth: 1
        },
        {
          label: 'Gastos',
          data: this.expenses.values,
          backgroundColor: Colors.red,
          borderWidth: 1
        }];
      }
    },

    mounted() {
      this.getPettyCashBalance();
    },

    methods: {
      getPettyCashBalance(year) {
        const theYear = year || new Date().getFullYear();
        this.$http.get(`report/petty_cash_year/${theYear}`)
          .then((res) => {
            this.expenses = res.data.expenses;
            this.incomes = res.data.incomes;
          });
      }
    }
  };
</script>

