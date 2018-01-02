<template lang="pug">
.modal.fade(tabindex="-1" role="dialog" id="contract-reconnect-modal")
  .modal-dialog.modal-lg(role="document")
    .modal-content
      .modal-header
        button(type="button" class="close" data-dismiss="modal" aria-label="Close"): span(aria-hidden="true") &times;
        h4.modal-title Reconectar
      .modal-body
        .wrapper
          ul.nav.nav-tabs(role="tablist")
            li(role="presentation" class="active"): a(href="#month-and-date" aria-controls="extender" role="tab" data-toggle="tab") Meses y Fecha
            li(role="presentation"): a(href="#reconnect-service" aria-controls="Mejorar" role="tab" data-toggle="tab") Tipo de Servicio

          .tab-content
            .tab-pane.fade.in.active#month-and-date(role="tabpanel")
              form
                .row
                  .col-md-6
                    .form-group
                      label(for="client-job") Meses de extension
                      input(type="number", class="form-control", id="reconnection-months", v-model="reconnectData.duracion")
                  .col-md-6
                    .form-group
                      label(for="client-job") Fecha
                      input(type="date" class="form-control" id="reconnection-date", v-model="reconnectData.fecha")

            .tab-pane.fade.in#reconnect-service(role="tabpanel")
              h4 Seleccione Plan:
              InternetPlans(@selected="selectService")

      .modal-footer
        button(type="button" class="btn" data-dismiss="modal" tabindex="9") Cancelar
        button(type="button" class="btn save" id="btn-reconnect" tabindex="10", @click="reconnect") Reconectar


</template>

<script>
  import InternetPlans from './../../sharedComponents/InternetPlans.vue';
  import utils from './../../sharedComponents/utils';

  export default {
    components: {
      InternetPlans
    },
    props: {
      contract: {
        type: Object
      }
    },

    data() {
      return {
        saved: false,
        reconnectData: {
          fecha: '',
          id_servicio: null,
          duracion: 12
        }
      };
    },

    mounted() {
      $('#contract-reconnect-modal').on('hide.bs.modal', () => {
        this.$emit('dimiss');
        this.emptyModal();
      });
    },

    methods: {
      emitChange() {
        this.$emit('save');
      },

      reconnect() {
        if (this.contract.id) {
          const { reconnectData } = this;
          const empty = utils.isEmpty(this.reconnectData);
          reconnectData.id_contrato = this.contract.id;

          if (!empty) {
            this.$http.post('contract/reconnect', this.getDataForm(reconnectData))
              .then((res) => {
                this.showMessage(res.data.message);
                this.emitChange();
              })
              .catch((err) => {
                this.$toasted.error(err);
              });
          } else {
            this.$toasted.info('Llene todos los campos');
          }
        }
      },

      selectService(item) {
        this.reconnectData.id_servicio = item.id_servicio;
      },

      emptyModal() {
        this.reconnectData.fecha = '';
      },
    },
  };
</script>

