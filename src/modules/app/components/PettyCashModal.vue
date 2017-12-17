<template lang="pug">
  .modal.fade#petty-cash-modal(tabindex="-1", role="dialog")
    .modal-dialog(role="document")
      .modal-content
        .modal-header
          button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-title {{ modalTitle }} - Caja Chica
        .modal-body
          form
            .row
              .col-md-12
                .form-group(v-if="modalMode == 'add' || modalMode == 'edit'")
                  label(for="#petty-cash-amount") Cantidad Entrada
                  input.form-control#petty-cash-add(type="number", v-model="transaction.entrada")
                .form-group(v-if="modalMode == 'retire' || modalMode == 'edit'")
                  label(for="#petty-cash-amount") Cantidad Retiro
                  input.form-control#petty-cash-retire(type="number", v-model="transaction.salida")
              .col-md-12
                .form-group
                  label(for="petty-cash-description") Descripción
                  textarea.form-control#petty-cash-description(cols="30", rows="5", v-model="transaction.descripcion")
        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-petty-cash__save", @click="save") Guardar
</template>

<script>
  export default {
    props: {
      transaction: {
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
        this.$emit('save');
      }
    },

    computed: {
      modalTitle() {
        return (this.modalMode === 'add') ? 'Registrar Entrada' : 'Registrar Salida';
      }
    }
  };
</script>
