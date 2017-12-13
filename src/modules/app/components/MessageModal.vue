<template lang="pug">
  .modal.fade(tabindex="-1", role="dialog", id="send-message-modal")
    .modal-dialog(role="document")
      .modal-content
        .modal-header
          button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-title Enviar Mensaje
        div
        .modal-body
          form
            .row
              .col-md-12
                input(type="text", class="form-control hidden", id="averias-client-id")
                .form-group
                  label(for="user-nickname") Tipo de Mensaje
                  select(type="text", style="width: 100%; border-radius:0;", id="message-type")
                    option(:value="type.val", v-for="type of message_types") {{type.text }}

                .form-group(:class="{hide: hide_clients}")
                  label(for="message-clients") Clientes
                  select(type="text",id="clients-for-message", style="width: 100%; border-radius:0;", multiple ="miltiple")
                    option(value="0") clientes/clientes

                .form-group(:class="{hide: hide_numbers}")
                  label(for="user-nickname") Numero(s)
                  input(type="text", class="form-control", id="message-phone", v-model="message_data.numeros")

                .form-group
                  label(for="service-description") Mensaje
                  textarea(class="form-control", cols="30", rows="5", id="message-text", v-model="message_data.mensaje")
                  p Caracteres utilizados <span class="text-primary-color"> {{letters_count}} </span>
                  p El limite por minimensajes son 160 caracteres

        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-send-message", @click.stop.prevent='sendMessage') enviar

</template>

<script>
  import 'select2';
  import utils from './../../sharedComponents/utils';

  export default {
    data() {
      return {
        hide_clients: true,
        hide_numbers: true,
        message_data: {
          tipo: '',
          clientes: '',
          numeros: '',
          mensaje: ''
        },
        message_types: [
          { val: 'mora', text: 'Morosos' },
          { val: 'suspendido', text: 'Suspendidos' },
          { val: 'activo', text: 'Activo' },
          { val: 'no activo', text: 'No Activo' },
          { val: 'personalizado', text: 'Personalizado' },
          { val: 'otros', text: 'Otros' }
        ]
      };
    },

    mounted() {
      this.initSelect2();
    },

    computed: {
      letters_count() {
        return this.message_data.mensaje.length;
      }
    },

    methods: {
      sendMessage() {
        const newMessage = [
          this.message_data.tipo,
          this.message_data.mensaje
        ];
        const empty = utils.isEmpty(newMessage);
        if (!empty) {
          this.$http.post('messages/send_message', this.getDataForm(this.message_data))
            .then((res) => {
              this.showMessage(res.data.menssage);
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        } else {
          this.$toasted.info('Campos Requerido : Por favor selecciones el tipo de mensaje y escriba su mensaje');
        }
      },

      initSelect2() {
        const options = {
          dropdownParent: $('#send-message-modal')
        };

        const selectMessageType = $('#message-type');
        selectMessageType.select2(options);

        const selectClientsForMessage = $('#clients-for-message').select2({
          dropdownParent: $('#send-message-modal'),
          ajax: {
            url: `${baseURL}messages/search_clients`,
            dataType: 'json',
            delay: 250,
            data(params) {
              return {
                q: params.term,
                page: params.page
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

        const selects = {
          clients: selectClientsForMessage,
          messageType: selectMessageType
        };
        this.selec2Liteners(selects);
      },

      selec2Liteners(selects) {
        const self = this;

        selects.messageType.on('select2:select', (e) => {
          const tipo = e.params.data.id;
          console.log('here we are');
          self.message_data.tipo = tipo;

          if (tipo === 'otros') {
            self.hide_clients = true;
            self.hide_numbers = false;
          } else if (tipo === 'personalizado') {
            self.hide_numbers = true;
            self.hide_clients = false;
          } else {
            self.hide_clients = true;
            self.hide_numbers = true;
          }
        });

        selects.messageType.select2('val', 'mora');

        selects.clients.on('select2:select', () => {
          const clientes = selects.clients.select2('data');
          const items = [];
          for (let i = 0; i < clientes.length; i += 1) {
            items.push({
              nombre_completo: clientes[i].text,
              celular: clientes[i].id
            });
          }
          self.message_data.clientes = items;
        });
      }
    }
  };
</script>
