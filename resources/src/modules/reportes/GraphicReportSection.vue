<template lang="pug">
  .row
    .col-md-9
      ReportDataCards
      ul.nav.nav-tabs(role="tablist")
        li(role="presentation" class="active"): a(href="#ingresos" aria-controls="home" role="tab" data-toggle="tab") Ingresos
        li(role="presentation"): a(href="#pagos" aria-controls="profile" role="tab" data-toggle="tab") Instalaciones
        li(role="presentation"): a(href="#balance" aria-controls="messages" role="tab" data-toggle="tab") Balance
        li(role="presentation"): a(href="#closing" aria-controls="messages" role="tab" data-toggle="tab") Ganancias

      .tab-content
        .tab-pane.active.fade.in(role="tabpanel", id="ingresos")
          .wide-chart
            ReportChartYearNavigator(@change="getIncomes")
            ChartCard(data-class="graphics chart" id="chart-incomes" data-id="chart-incomes", :data="incomes.values", :labels="months", :config="chartConfig.incomes")

        .tab-pane.fade.in#pagos(role="tabpanel")
          .wide-chart
            canvas(class="graphics chart" id="installations-chart")

        .tab-pane.fade.in#balance(role="tabpanel")
          .wide-chart
            canvas(class="graphics chart" id="balance-chart")

        .tab-pane.fade.in#closing(role="tabpanel")
          .wide-chart
            canvas(class="graphics chart" id="ganancias-chart")

          .wide-chart.hide
            canvas(class="graphics chart" id="ganancias-semana-chart")
          .wide-chart
            canvas(class="graphics chart" id="ganancias-mes-chart")



</template>

<script>
  import ReportDataCard from './components/ReportDataCard.vue';
  import ReportChartYearNavigator from './components/ReportChartYearNavigator.vue';
  import ChartCard from './../sharedComponents/ChartCard.vue';
  import utils from './../sharedComponents/utils';


  export default {
    props: {
      appStore: {
        type: Object,
        required: true
      }
    },
    components: {
      ReportDataCard,
      ChartCard,
      ReportChartYearNavigator
    },

    data() {
      const { months } = utils.dates;

      return {
        dayIncome: 0.00,
        incomes: {
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          total: 0.00
        },
        chartConfig: {
          incomes: {
            title: 'Ingresos',
            type: 'line'
          }
        },
        clients: null,
        constracts: null,
        months
      };
    },

    mounted() {
      this.getIncomes();
    },

    methods: {
      getIncomes(year) {
        const incomesYear = year || new Date().getFullYear();
        this.$http.get(`report/incomes_year/${incomesYear}`)
          .then((res) => {
            this.incomes = res.data.incomes;
          });
      },
    }
  };
</script>
