<template lang="pug">
  .row.shortcuts-container.data-card-container
    ReportDataCardItem(data="9", title="Clientes", icon="person")
    ReportDataCardItem(data="9", title="Contratos", icon="person", :detail="{ title: 'Reporte Contratos', link: '#'}")
    ReportDataCardItem(:data="activeClients.count", title="Clientes Activos", icon="person")
    ReportDataCardItem(data="9", title="Clientes Mora", icon="person")
    ReportDataCardItem(data="9", title="Clientes Suspendidos", icon="person")

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
        const theItem = this.clients.map((item) => {
          if (item.estado === 'activo') {
            return item;
          }
          return '';
        });

        return theItem[0] || { count: 0 };
      },

      totalClients() {
        return 9;
      },

      activeContracts() {
        return 9;
      }
    },

    mounted() {
      this.getGeneralStatistics();
    },

    methods: {
      getGeneralStatistics() {
        this.$http.get('report/general_statistics')
          .then((res) => {
            const generals = res.data.general_statistics;
            this.clients = generals.clients;
            this.contracts = generals.contracts;
          });
      }
    }
  };
</script>

