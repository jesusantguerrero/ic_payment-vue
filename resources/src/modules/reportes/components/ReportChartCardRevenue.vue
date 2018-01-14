<template lang="pug">

</template>

<script>
  import utils from './../../sharedComponents/utils';

  export default {
    props: {
      data: Object
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
        }
      };
    },

    computed: {
      dataset() {
        return {
          labels: utils.dates.months,
          datasets: [{
            label: 'Gastos',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: this.expenses,
            fill: false,
          }, {
            label: 'Banco(Ganancias)',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: this.incomes,
          }]
        };
      }
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

