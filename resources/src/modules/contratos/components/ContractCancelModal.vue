<template lang="pug">
.modal.fade(tabindex="-1" role="dialog" id="contract-cancel-modal")
  .modal-dialog(role="document")
    .modal-content
      .modal-header
        button(type="button" class="close" data-dismiss="modal" aria-label="Close"): span(aria-hidden="true") &times;
        h4.modal-title Estas seguro?

      .modal-body
        .alert.alert-info(v-if="penalty")
          p penalidad activada
        .form-group
          label(for="u-service-description") Motivo
          textarea(class="form-control", cols="30", rows="5", id="cancelation-reason", v-model="motivo")

        .form-group
          label(for="check-penalty") Aplica Penalidad?
          br
          input.form-control#check-penalty(type="checkbox", :checked="penalty", @change="changeMode")
      .modal-footer
        a(:href="cancelationLink" target="printframe" class="btn" id="cancel-print", v-if="saved") Imprimir
        button(type="button" class="btn save" id="cancel-permanently" tabindex="10", @click.prevent="cancelContract") Cancelar Contrato


</template>

<script>
  import swal from 'sweetalert2';

  export default {
    props: {
      contract: {
        type: Object
      }
    },
    data() {
      return {
        motivo: '',
        penalty: false,
        saved: false
      };
    },
    computed: {
      cancelationLink() {
        return `${baseURL}process/getcancelcontract/${conract.id}`;
      }
    },

    mounted() {
      $('#contract-cancel-modal').on('hide.bs.modal', () => {
        this.$emit('dimiss');
        this.emptyModal();
      });
    },

    methods: {
      emitChange() {
        this.$emit('save');
      },

      cancelContract() {
        const self = this;
        const form = {
          id_contrato: this.contract.id,
          id_cliente: this.contract.id_cliente,
          motivo: this.motivo,
          penalidad: this.penalty
        };

        function sendCancel() {
          self.$http.post('contract/cancel', self.getDataForm(form))
            .then((res) => {
              if (res.data.message.type === 'success') {
                self.saved = true;
              }
              self.showMessage(res.data.message);
            });
        }

        if (this.contract) {
          swal({
            title: 'Cancelar Contrato',
            text: `¿Está seguro de querer cancelar el contrato a ${this.contract.cliente}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value) {
              sendCancel();
            }
          });
        } else {
          this.$toasted.info('seleccione un contrato primero');
        }
      },

      emptyModal() {
        this.motivo = '';
        this.penalty = false;
        this.saved = false;
      },

      changeMode() {
        this.penalty = !this.penalty;
      }
    },
  };
</script>
