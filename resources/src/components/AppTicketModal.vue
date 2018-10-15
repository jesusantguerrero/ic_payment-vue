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
                .form-group
                  label(for="service-description") Id Contrato
                  select(class="form-control", v-model="ticket.id_contrato")
                    option(v-for="contract of contractList", :key="contract.id_contrato", :value="contract.id_contrato") {{ contract.id_contrato}}

        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-save-averia", @click="addTicket") Guardar
</template>

<script>
  import utils from './../modules/sharedComponents/utils';
  import SelectClient from './../modules/sharedComponents/SelectClient.vue';

  const ticket = {
    descripcion: '',
    id_cliente: '',
    id_contrato: '',
  };

  export default {
    components: {
      SelectClient
    },

    data() {
      return {
        ticket: { ...ticket },
        searchEndpoint: `${baseURL}/clients/get_clients/dropdown`,
        emptySelect: false,
        contractList: []
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
        this.getContracts();
      },

      ticketEmpty() {
        this.ticket = { ...ticket };
        this.emptySelect = !this.emptySelect;
        this.contractList = [];
      },

      getContracts() {
        this.$http.get(`contract/get_contracts/${this.ticket.id_cliente}/dropdown`)
          .then((res) => {
            this.contractList = res.data.contracts;
            const len = res.data.contracts.length;
            if (len) {
              this.ticket.id_contrato = this.contractList[len - 1].id_contrato;
            }
          });
      },
    }
  };
</script>

