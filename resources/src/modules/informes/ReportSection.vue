<template lang="pug">
  .col-md-12
    .wrapper
      ul.nav.nav-tabs(role="tablist", id="main-tabs")
        li(role="presentation", :class="{active : activeTab == 'installations'}"): a(href="#installations" aria-controls="installations" role="tab" data-toggle="tab") Instalaciones
        li(role="presentation", :class="{active : activeTab == 'retirements'}"): a(href="#retirements" aria-controls="retirements" role="tab" data-toggle="tab") Retiros
        li(role="presentation", :class="{active : activeTab == 'debtors'}"): a(href="#debtors" aria-controls="settings" role="tab" data-toggle="tab") Deudores

      .tab-content
        .tab-pane.fade.in#installations(role="tabpanel", :class="{active : activeTab == 'installations'}")
          ReportInstallations

        .tab-pane.fade.in#retirements(role="tabpanel", :class="{active : activeTab == 'retirements'}")
          ReportRetirements

        .tab-pane.fade.in#debtors(role="tabpanel", :class="{active : activeTab == 'debtors'}")


        .tab-pane.fade.in#receipts(role="tabpanel", :class="{active : activeTab == 'receipts'}")
          ReportReceipts

</template>

<script>
  import ReportInstallations from './components/ReportInstallations.vue';
  import ReportRetirements from './components/ReportRetirements.vue';
  import ReportReceipts from './components/ReportReceipts.vue';

  export default {
    props: {
      activeWindow: {
        type: String,
        default: 'installations'
      }
    },

    components: {
      ReportInstallations,
      ReportRetirements,
      ReportReceipts,
      ReportExpenses,
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
