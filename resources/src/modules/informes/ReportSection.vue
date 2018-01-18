<template lang="pug">
  .col-md-12
    .wrapper
      ul.nav.nav-tabs(role="tablist", id="main-tabs")
        li(role="presentation", :class="{active : activeTab == 'installations'}"): a(href="#installations" aria-controls="installations" role="tab" data-toggle="tab") Instalaciones
        li(role="presentation", :class="{active : activeTab == 'retirements'}"): a(href="#retirements" aria-controls="retirements" role="tab" data-toggle="tab") Retiros
        li(role="presentation", :class="{active : activeTab == 'debtors'}")
          a(href="#debtors" aria-controls="settings" role="tab" data-toggle="tab") Deudores
            span( class="badge")  1
        li(role="presentation", :class="{active : activeTab == 'historic'}"): a(href="#receipts" aria-controls="receipts" role="tab" data-toggle="tab", ) Recibos
        li(role="presentation", :class="{active : activeTab == 'receipts'}"): a(href="#historic" aria-controls="historic" role="tab" data-toggle="tab") Historico Moras
        li(role="presentation", :class="{active : activeTab == 'expenses'}"): a(href="#expenses" aria-controls="expenses" role="tab" data-toggle="tab") Gastos
        li(role="presentation", :class="{active : activeTab == 'closes'}"): a(href="#closes" aria-controls="closes" role="tab" data-toggle="tab") Cierres

      .tab-content
        .tab-pane.fade.in#client(role="tabpanel", :class="{active : activeTab == 'installations'}")
          ReportInstallations
        .tab-pane.fade.in#payments(role="tabpanel", :class="{active : activeTab == 'retirements'}")

        .tab-pane.fade.in#abonos(role="tabpanel", :class="{active : activeTab == 'debtors'}")

        .tab-pane.fade.in#observations(role="tabpanel", :class="{active : activeTab == 'observations'}")

        .tab-pane.fade.in#extras(role="tabpanel", :class="{active : activeTab == 'extras'}")

</template>

<script>
  import ReportInstallations from './components/ReportInstallations.vue';

  export default {
    props: {
      activeWindow: {
        type: String,
        default: 'installations'
      }
    },

    components: {
      ReportInstallations
    },

    data() {
      return {
        activeTab: '',
      };
    },

    mounted() {
      this.activeTab = this.activeWindow;
    },

    computed: {

    },

    methods: {
      changeTab(tabName) {
        this.activeTab = tabName;
      }
    }
  };
</script>
