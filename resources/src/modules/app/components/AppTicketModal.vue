<template lang="pug">
  .modal.fade(tabindex="-1", role="dialog", id="app-ticket-modal")
    .modal-dialog(role="document")
      .modal-content
        .modal-header
          button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-title Agregar Averia
        .modal-body
          form
            .row
              .col-md-12
                .form-group
                  label(for="user-nickname") Cliente
                  SelectClient(the-id="ticket-client-id", parent-id="#app-ticket-modal",:endpoint="searchEndpoint", @select="setClientId", :empty="emptySelect")
                .form-group
                  label(for="service-description") Descripción
                  textarea(class="form-control", cols="30", rows="5", id="a-description", v-model="ticket.descripcion")
        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-save-averia", @click="addTicket") Guardar
</template>

<script>
  import utils from './../../sharedComponents/utils';
  import SelectClient from './../../sharedComponents/SelectClient.vue';

  export default {
    components: {
      SelectClient
    },

    data() {
      return {
        ticket: {
          descripcion: '',
          id_cliente: '',
        },
        searchEndpoint: `${baseURL}/clients/get_clients/dropdown`,
        emptySelect: false
      };
    },

    methods: {
      addTicket() {
        const empty = utils.isEmpty(this.ticket);
        if (!empty) {
          this.$http.post('api/ticket/add_ticket', this.getDataForm(this.ticket))
            .then((res) => {
              this.showMessage(res.data.message);
              this.$emit('newTicket');
              this.ticketEmpty();
              window.appBus.$emit('ticket-list.search');
            });
        } else {
          this.$toasted.error('Revise: LLene todos los campos por favor');
        }
      },

      setClientId(data) {
        this.ticket.id_cliente = data.id;
      },

      ticketEmpty() {
        this.ticket = {
          descripcion: '',
          id_cliente: '',
        };
        this.emptySelect = !this.emptySelect;
      }
    }
  };
</script>

