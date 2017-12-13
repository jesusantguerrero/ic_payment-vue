<template lang="pug">
  .modal.fade(tabindex="-1", role="dialog", id="ticket-modal")
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
                  select(class="form-control", id="a-client")
                    option(value="0") Escriba el nombre del cliente
                .form-group
                  label(for="service-description") Descripción
                  textarea(class="form-control", cols="30", rows="5", id="a-description")
        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-save-averia") Guardar
</template>

<script>
  import 'select2';
  import utils from './../../sharedComponents/utils';

  export default {
    mounted() {
      this.initSelect2();
    },

    data() {
      return {
        ticket: {
          descripcion: '',
          id_cliente: '',
        }
      };
    },

    methods: {
      initSelect2() {
        const ticketClient = $('#a-client').select2({
          dropdownParent: $('#new-averia-modal'),
          width: '100%',
          ajax: {
            url: `${BASE_URL}process/search`,
            dataType: 'json',
            delay: 250,
            data(params) {
              return {
                q: params.term,
                tabla: 'clientes_para_averias'
              };
            },

            processResults(data, params) {
              params.page = params.page || 1;
              return {
                results: data.items,
                pagination: {
                  more: (params.page * 30) < data.total_count
                }
              };
            },
            cache: true
          }
        });

        ticketClient.on('select2:select', (e) => {
          this.id_cliente = e.params.data.id;
        });
      },

      addTicket() {
        const empty = utils.isEmpty(this.ticket);
        if (!empty) {
          this.$http.post('api/averias/add_ticket', this.getDataForm(this.ticket))
            .then((res) => {
              this.showMessage(res.data.message);
              this.$emit('newTicket');
              this.ticketEmpty();
            });
        } else {
          this.$toasted.error('Revise: LLene todos los campos por favor');
        }
      },

      ticketEmpty() {
        this.ticket = {
          descripcion: '',
          id_cliente: '',
        };
      }
    }
  };
</script>

