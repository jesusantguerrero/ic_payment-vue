<template lang="pug">
  .row
    .col-md-12
      ReportDataCard
      .col-md-8
        ul.nav.nav-tabs(role="tablist")
          li(role="presentation" class="active"): a(href="#ingresos" aria-controls="home" role="tab" data-toggle="tab") Ingresos
          li(role="presentation"): a(href="#pagos" aria-controls="profile" role="tab" data-toggle="tab") Instalaciones
          li(role="presentation"): a(href="#balance" aria-controls="messages" role="tab" data-toggle="tab") Balance
          li(role="presentation"): a(href="#closing" aria-controls="messages" role="tab" data-toggle="tab") Ganancias

        .tab-content
          .tab-pane.active.fade.in(role="tabpanel", id="ingresos")
            .wide-chart
              ReportChartYearNavigator(@change="getIncomes", title="Ingresos Netos")
              ReportChart(data-class="graphics chart" id="chart-incomes" data-id="chart-incomes", :data="incomes.values", :labels="months", :config="chartConfig.incomes")

          .tab-pane.fade.in#pagos(role="tabpanel")
            .wide-chart
              ReportChartYearNavigator(@change="getInstallations", title="Instalaciones")
              ReportChart(data-class="graphics chart" id="chart-installations" data-id="chart-installations", :data="installations.values", :labels="months", :config="chartConfig.installations")

          .tab-pane.fade.in#balance(role="tabpanel")
            .wide-chart

          .tab-pane.fade.in#closing(role="tabpanel")
            .wide-chart

            .wide-chart

      .col-md-4
        ul.nav.nav-tabs(role="tablist")
          li(role="presentation" class="active"): a(href="#generals" aria-controls="generals" role="tab" data-toggle="tab") Generales

        .tab-content
          .tab-pane.active.fade.in(role="tabpanel", id="ingresos")
            .wide-chart
              ReportChartYearNavigator(title="Semana")
              ReportChart(data-class="graphics chart" id="chart-week-incomes" data-id="chart-week-incomes", :data="weekIncomes.values", :labels="days", :config="chartConfig.weekIncomes")

            .wide-chart
              ReportChartYearNavigator(@change="getInstallations", title="Servicios")
              ReportChart(data-class="graphics chart" id="chart-installations" data-id="chart-installations", :data="installations.values", :labels="months", :config="chartConfig.installations")
          .tab-pane.fade.in#pagos(role="tabpanel")
            .wide-chart
              ReportChartYearNavigator(@change="getInstallations", :display="!display")
              ReportChart(data-class="graphics chart" id="chart-installations" data-id="chart-installations", :data="installations.values", :labels="months", :config="chartConfig.installations")



</template>

<script>
  import ReportDataCard from './components/ReportDataCard.vue';
  import ReportChart from './components/ReportChart.vue';
  import ReportChartYearNavigator from './components/ReportChartYearNavigator.vue';
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
      ReportChart,
      ReportChartYearNavigator
    },

    data() {
      const { months } = utils.dates;
      const { days } = utils.dates;

      return {
        display: true,
        dayIncome: 0.00,
        incomes: {
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          total: 0.00
        },
        installations: {
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          total: 0.00
        },

        weekIncomes: {
          values: [0, 0, 0, 0, 0, 0, 0],
          total: 0.00
        },

        chartConfig: {
          incomes: {
            title: 'Ingresos',
            type: 'line',
            money: true
          },
          installations: {
            title: 'Instalaciones',
            type: 'bar'
          },
          weekIncomes: {
            title: 'Ingresos',
            type: 'bar'
          }
        },
        months,
        days
      };
    },

    mounted() {
      this.getIncomes();
      this.getInstallations();
      this.getWeekIncomes();
    },

    methods: {
      getIncomes(year) {
        const incomesYear = year || new Date().getFullYear();
        this.$http.get(`report/incomes_year/${incomesYear}`)
          .then((res) => {
            this.incomes = res.data.incomes;
          });
      },

      getInstallations(year) {
        const installationsYear = year || new Date().getFullYear();
        this.$http.get(`report/installations_year/${installationsYear}`)
          .then((res) => {
            this.installations = res.data.installations;
          });
      },

      getWeekIncomes() {
        this.$http.get('report/last_week_incomes/')
          .then((res) => {
            this.weekIncomes = res.data.week_incomes;
          });
      }
    }
  };
</script>
