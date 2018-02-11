<template lang="pug">
  .screen.reports
    .row
      .col-md-12
        ReportDataCard
    .row
      .col-md-8
        .report-card
          ul.nav.nav-tabs(role="tablist")
            li(role="presentation" class="active"): a(href="#ingresos" aria-controls="home" role="tab" data-toggle="tab") Ingresos
            li(role="presentation"): a(href="#pagos" aria-controls="profile" role="tab" data-toggle="tab") Instalaciones
            li(role="presentation"): a(href="#balance" aria-controls="messages" role="tab" data-toggle="tab") Balance
            li(role="presentation"): a(href="#closing" aria-controls="messages" role="tab" data-toggle="tab") Ganancias

          .tab-content
            .tab-pane.active.fade.in(role="tabpanel", id="ingresos")
              .wide-chart
                ReportChartYearNavigator(@change="getIncomes", title="Ingresos Netos", display="true")
                ReportChart(data-class="graphics chart" id="chart-incomes" data-id="chart-incomes", :data="incomes.values", :labels="months", :config="chartConfig.incomes")

            .tab-pane.fade.in#pagos(role="tabpanel")
              .wide-chart
                ReportChartYearNavigator(@change="getInstallations", title="Instalaciones", display="true")
                ReportChart(data-class="graphics chart" id="chart-installations" data-id="chart-installations", :data="installations.values", :labels="months", :config="chartConfig.installations")

            .tab-pane.fade.in#balance(role="tabpanel")
              ReportChartPettyCash

            .tab-pane.fade.in#closing(role="tabpanel")
              ReportChartCardRevenue

      .col-md-4
        .report-card
          ul.nav.nav-tabs(role="tablist")
            li(role="presentation" class="active"): a(href="#generals" aria-controls="generals" role="tab" data-toggle="tab") Generales

          .tab-content
            .tab-pane.active.fade.in(role="tabpanel", id="ingresos")
              .wide-chart
                ReportChartYearNavigator(title="Ingresos Semana")
                ReportChart(data-class="graphics chart" id="chart-week-incomes" data-id="chart-week-incomes", :data="weekIncomes.values", :labels="days", :config="chartConfig.weekIncomes")

              .wide-chart
                ReportChartYearNavigator(@change="getInstallations", title="Servicios")
                ReportChart(data-class="graphics chart" id="chart-installations" data-id="chart-installations", :data="installations.values", :labels="months", :config="chartConfig.installations")
            .tab-pane.fade.in#pagos(role="tabpanel")
              .wide-chart
                ReportChartYearNavigator(@change="getInstallations", display="true")
                ReportChart(data-class="graphics chart" id="chart-installations" data-id="chart-installations", :data="installations.values", :labels="months", :config="chartConfig.installations")
    br
    .row
      .col-md-8
        .report-card
          ul.nav.nav-tabs(role="tablist")
            li(role="presentation" class="active"): a(href="#expenses" aria-controls="home" role="tab" data-toggle="tab") Gastos
            li(role="presentation"): a(href="#closes" aria-controls="profile" role="tab" data-toggle="tab") Cierres
            li(role="presentation"): a(href="#historic" aria-controls="messages" role="tab" data-toggle="tab") Historico

          .tab-content
            .tab-pane.active.fade.in(role="tabpanel", id="expenses")
              ReportTableExpenses
            .tab-pane.fade.in#closes(role="tabpanel")

            .tab-pane.fade.in#historic(role="tabpanel")

      .col-md-4
        .report-card.bg-primary.justify-content-center
            h3.title Balance en Caja Chica
            h2.current-saldo RD$ {{ store.pettyCashBalance | currencyFormat }}

            h3.title Ganancias del dia
            h2.current-saldo RD$ {{ store.dayIncome | currencyFormat }}


</template>

<script>
  import ReportDataCard from './components/ReportDataCard.vue';
  import ReportChart from './components/ReportChart.vue';
  import ReportChartYearNavigator from './components/ReportChartYearNavigator.vue';
  import ReportChartCardRevenue from './components/ReportChartCardRevenue.vue';
  import ReportChartPettyCash from './components/ReportChartPettyCash.vue';
  import ReportTableExpenses from './../informes/components/ReportExpenses.vue';

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
      ReportChartYearNavigator,
      ReportChartCardRevenue,
      ReportChartPettyCash,
      ReportTableExpenses
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
        days,
        store: appStore
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
