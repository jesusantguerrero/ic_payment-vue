<template lang="pug">
  #averias-list-view
    .searcher-container.main-toolbar
      .input-group.search
        .input-group-addon: i.material-icons search
        input.form-control.searcher(type="text", v-model="text", placeholder="Busque averia por cliente")
      .pull-right
        a(target="_blank", :href="printLink", class="btn icon print-table"): i.material-icons print
      .pull-right
        select#averias-view-mode.form-group.filter.btn.btn-primary(v-model="dataSearch.state", @change="search")
          option(value="por instalar") Por Instalar
          option(value="instalado") Instalado
          option(value="todos") Todos
    .averia-item-list#averia-list
      h6 {{ searchResults }}
      InstallationListItem(v-for="installation of installationsCurated", :item="installation", :key="installation.id_contrato", @update="updateInstallationState", type="installation")
</template>

<script>
  import InstallationListItem from './../../averias/components/TicketListItem.vue';

  export default {
    components: {
      InstallationListItem
    },

    data() {
      return {
        dataSearch: {
          state: 'por instalar',
        },
        text: '',
        installationsCurated: [],
        installations: [],
        searching: false
      };
    },

    computed: {
      searchResults() {
        return (this.searching) ? 'Cargando listado de instalaciones ...' : `Resultados: ${this.count} instalaciones`;
      },

      count() {
        return (this.installations) ? this.installationsCurated.length : 0;
      },

      printLink() {
        return `${baseURL}report/get_report/installations`;
      }
    },

    watch: {
      text(val) {
        this.installationsCurated = this.installations.filter(item => (val === '' || item.cliente.includes(val.toUpperCase())));
      }
    },

    mounted() {
      this.search();
    },

    methods: {
      search() {
        this.searching = true;
        this.$http.get(`contract/get_installations/${this.dataSearch.state}`)
          .then((res) => {
            this.setInstallations(res.data.installations);
            this.searching = false;
          })
          .catch(() => {
            this.$toasted.error(res.data.message);
            this.searching = false;
          });
      },

      updateInstallationState(id) {
        this.$http.post(`contract/update_installation_state/${id}`)
          .then((res) => {
            const { message } = res.data;
            this.showMessage(res.data.message);
            if (message.type === 'success') {
              this.search();
            }
          });
      },

      setInstallations(installations) {
        this.installations = installations;
        this.installationsCurated = installations;
      }
    }
  };
</script>
