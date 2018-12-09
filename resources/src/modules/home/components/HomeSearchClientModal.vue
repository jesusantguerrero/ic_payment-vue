<template lang="pug">
  .modal.fade(tabindex="-1", role="dialog", id="search-client-modal")
    .modal-dialog.modal-lg(role="document")
      .modal-content
        .modal-header
          button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-title Buscar Cliente
        .modal-body
          SelectClient(the-id="client-id", parent-id="#search-client-modal",:endpoint="searchEndpoint", v-model="selectedClient")
        .modal-footer
          button(type="button" class="btn" data-dismiss="modal") Cancelar
          button(type="button" class="btn save" id="btn-see-payments" @click.stop.prevent='goToClient') Ver Pagos

</template>

<script>
  import SelectClient from './../../sharedComponents/SelectClient.vue';
  import ClientStore from './../../clientes/store/clientStore';

  export default {
    components: {
      SelectClient
    },

    data() {
      const clientStore = new ClientStore();

      return {
        searchEndpoint: '/clients/get_clients/dropdown',
        tableOptions: {
          pageSize: 5
        },
        clientStore,
        selectedClient: null,
        search: '',
        placeholder: 'Busque cliente por cedula, nombre, apellidos o id',

        cols: clientStore.columns
      };
    },

    methods: {
      goToClient() {
        if (this.selectedClient) {
          this.$router.push(`/detalles/${this.selectedClient.id}/payments`);
        } else {
          this.$toasted.error('Seleccione un cliente primero por favor');
        }
      },
    }
  };
</script>
