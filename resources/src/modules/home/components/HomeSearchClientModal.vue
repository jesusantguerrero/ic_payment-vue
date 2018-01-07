<template lang="pug">
  .modal.fade(tabindex="-1", role="dialog", id="search-client-modal")
    .modal-dialog.modal-lg(role="document")
      .modal-content
        .modal-header
          button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-title Buscar Cliente
        .modal-body
          SelectClient(the-id="client-id", parent-id="#search-client-modal",:endpoint="searchEndpoint", @select="goToClient")

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
        searchEndpoint: `${baseURL}/clients/get_clients/dropdown`,
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
      goToClient(data) {
        window.location.href = `${baseURL}app/details/${data.id}`;
      },
    }
  };
</script>
