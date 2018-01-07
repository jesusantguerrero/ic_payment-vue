<template lang="pug">
  .modal.fade#router-modal(tabindex="-1", role="dialog")
    .modal-dialog(role="document")
      .modal-content
        .modal-header
          button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-title {{ modalTitle }}
        .modal-body
          form
            .row
              .col-md-12
                .form-group
                  label(for="#sector-name") Nombre Sector
                  input.form-control#secto-name(type="text", v-model="sector.nombre", placeholder="nombre sector")
                .form-group
                  label(for="#sector-code") Codigo
                  input.form-control#sector-code(type="number", v-model="sector.codigo_area", placeholder="41")
              .col-md-12
        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-sector__save", @click="save") Guardar
</template>

<script>
  export default {
    props: {
      sector: {
        type: Object
      },
      modalMode: {
        type: String
      }
    },

    mounted() {
      $('#router-modal').on('hide.bs.modal', () => {
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
        let title;

        switch (this.modalMode) {
          case 'add':
            title = 'Nuevo Sector';
            break;
          case 'edit':
            title = 'Editar Sector';
            break;
          default:
          // nothing
            break;
        }
        return title;
      }
    }
  };
</script>
