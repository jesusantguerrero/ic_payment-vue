<template lang="pug">
  .modal.fade(tabindex="-1", role="dialog", id="search-client-modal")
    .modal-dialog.modal-lg(role="document")
      .modal-content
        .modal-header
          button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-title Nuevo Contrato
        .modal-body
            #search-client-container
              .searcher-container.main-toolbar#search-client-toolbar(style="margin-bottom: 0")
                .input-group.search(style="width: 100%; margin-bottom: 5px")
                  .input-group-addon: i.material-icons search
                  input.form-control.searcher#client-searcher(type="text",v-model="search", @keyup="getClients", :placeholder="placeholder")

              DataTable(ids="search-client-table", :parentId="parentId", :data="clients", :cols="cols", :toolbar="toolbar", :options="tableOptions")
        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-send-message", @click.stop.prevent='sendMessage') enviar

</template>

<script>
  import DataTable from './../../sharedComponents/DataTable.vue';
  import ClientStore from './../../clientes/store/clientStore';

  export default {
    components: {
      DataTable
    },

    data() {
      const clientStore = new ClientStore();

      return {
        parentId: '#search-client-container',
        toolbar: '#search-client-toolbar',
        clients: '',
        tableOptions: {
          pageSize: 5
        },
        clientStore,
        search: '',
        placeholder: 'Busque cliente por cedula, nombre, apellidos o id',

        cols: clientStore.columns
      };
    },

    methods: {
      getClients() {
        const data = { word: this.search };
        this.$http.post('clients/get_clients/search', this.getDataForm(data))
          .then((res) => {
            this.clients = res.data.clients;
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      }
    }
  };
</script>
