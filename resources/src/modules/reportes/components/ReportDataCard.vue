<template lang="pug">
  .row.shortcuts-container.data-card-container
    ReportDataCardItem(data="9", title="Clientes", icon="person")
    ReportDataCardItem(data="9", title="Contratos", icon="person", :detail="{ title: 'Reporte Contratos', link: '#'}")
    ReportDataCardItem(data="9", title="Clientes Activos", icon="person")

</template>

<script>
  import ReportDataCardItem from './ReportDataCardItem.vue';

  export default {
    components: {
      ReportDataCardItem
    },

    props: {
      store: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        clients: null,
        contracts: null
      };
    },

    computed: {
      activeClients() {
        return 9;
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

