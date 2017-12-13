<template lang="pug">
  .modal.fade#petty-cash(tabindex="-1", role="dialog")
    .modal-dialog(role="document")
      .modal-content
        .modal-header
          button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-title {{ modalTitle }} - Caja Chica
        .modal-body
          form
            .row
              .col-md-12
                .form-group
                  label(for="#petty-cash-amount") Cantidad
                  input.form-control#petty-cash-amount(type="number", v-model="moneyMovement.amount")
              .col-md-12
                .form-group
                  label(for="income-description") Descripción
                  textarea.form-control#petty-cash-description(cols="30", rows="5", v-model="moneyMovement.description")
        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-dayly-box__save", @save="save") Guardar
</template>

<script>
  export default {
    props: {
      moneyMovement: {
        type: Object
      },
      modalMode: {
        type: String
      }
    },

    mounted() {
      $('#petty-cash').on('hide.bs.modal', () => {
        this.$emit('dimiss');
      });
    },

    methods: {
      save() {
        if (this.modalMode === 'add') {
          this.$emit('add');
        } else {
          this.$emit('retire');
        }
      }
    },

    computed: {
      modalTitle() {
        return (this.modalMode === 'add') ? 'Registrar Entrada' : 'Registrar Salida';
      }
    }
  };
</script>
