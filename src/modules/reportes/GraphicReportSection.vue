<template lang="pug">
  .row
    .col-md-9
      .row.shortcuts-container.data-card-container
        ReportDataCard(data="9", title="Clientes", icon="person")
        ReportDataCard(data="9", title="Contratos", icon="person", :detail="{ title: 'Reporte Contratos', link: '#'}")
        ReportDataCard(data="9", title="Clientes Activos", icon="person")

      ul.nav.nav-tabs(role="tablist")
        li(role="presentation" class="active"): a(href="#ingresos" aria-controls="home" role="tab" data-toggle="tab") Ingresos Este Año
        li(role="presentation"): a(href="#pagos" aria-controls="profile" role="tab" data-toggle="tab") Instalaciones
        li(role="presentation"): a(href="#balance" aria-controls="messages" role="tab" data-toggle="tab") Balance
        li(role="presentation"): a(href="#closing" aria-controls="messages" role="tab" data-toggle="tab") Ganancias y Cierres

      .tab-content
        .tab-pane.active.fade.in(role="tabpanel", id="ingresos")
          .wide-chart
            ReportChartYearNavigator(@change="getIncomes")
            ChartCard(data-class="graphics chart" id="chart-incomes" data-id="chart-incomes", :data="incomes.values", :labels="months")

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


    .col-md-3.right-panel
      div
        ul.nav.nav-tabs(role="tablist")
          li(role="presentation" class="active"): a(href="#general" aria-controls="home" role="tab" data-toggle="tab") General
          li(role="presentation"): a(href="#week" aria-controls="week" role="tab" data-toggle="tab") Semana

        .tab-content
          .tab-pane.fade.in.active#general(role="tabpanel")
            .today-data
              h5 Ventas de hoy
              p
                a(target="printframe" href="<?php echo base_url('process/getreport/payment/today') ?>")
                span(class="amount") RD$ {{ appStore.dayIncome | currencyFormat }}

              div
                h5 Clientes Por Servicios
                p
                .normal-chart
                  canvas(id="services-chart")

          .tab-pane.fade.in#week(role="tabpanel")
            h5 Ingesos esta semana
            .normal-chart
              canvas(class="little-chart" id="week-chart")
</template>

<script>
  import ReportDataCard from './components/ReportDataCard';
  import ReportChartYearNavigator from './components/ReportChartYearNavigator';
  import ChartCard from './../sharedComponents/ChartCard';
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
