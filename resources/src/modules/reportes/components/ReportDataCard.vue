<template lang="pug">
  .row.shortcuts-container.data-card-container
    ReportDataCardItem(:data="totalClients", title="Clientes", icon="supervisor_account")
    ReportDataCardItem(:data="activeContracts", title="Contratos", icon="description", :detail="{ title: 'Reporte Contratos', link: '/test'}")
    ReportDataCardItem(:data="activeClients", title="Clientes Activos", icon="supervisor_account")
    ReportDataCardItem(:data="debtors", title="Clientes Mora", icon="schedule")
    ReportDataCardItem(:data="suspended", title="Suspendidos", icon="report_problem")

</template>

<script>
  import ReportDataCardItem from './ReportDataCardItem.vue';

  export default {
    components: {
      ReportDataCardItem
    },

    data() {
      return {
        clients: null,
        contracts: null
      };
    },

    computed: {
      activeClients() {
        if (this.clients) {
          const theItem = this.clients.filter(item => (item.estado === 'activo'));
          return (theItem[0]) ? theItem[0].count : 0;
        }
        return 0;
      },

      debtors() {
        if (this.clients) {
          const theItem = this.clients.filter(item => (item.estado === 'mora'));
          return (theItem[0]) ? theItem[0].count : 0;
        }
        return 0;
      },

      suspended() {
        if (this.clients) {
          const theItem = this.clients.filter(item => (item.estado === 'suspendido'));
          return (theItem[0]) ? theItem[0].count : 0;
        }
        return 0;
      },

      totalClients() {
        if (this.clients) {
          const total = this.clients.reduce((sum, item) => sum += Number(item.count), 0);
          return total;
        }
        return 0;
      },

      activeContracts() {
        return this.contracts;
      }
    },

    mounted() {
      this.getGeneralStatistics();
    },

    methods: {
      getGeneralStatistics() {
        this.$http.get('report/general_statistics')
          .then((res) => {
            const generals = res.data;
            this.clients = generals.clients;
            this.contracts = generals.contracts;
          });
      }
    },

  };
</script>

