<template lang="pug">
  .modal.fade#service-modal(tabindex="-1", role="dialog")
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
                  label(for="#service-name") Nombre de Servicio
                  input.form-control#service-name(type="text", v-model="service.nombre")
                .form-group
                  label(for="#service-description") Descripción
                  textarea.form-control#service-description(type="number", v-model="service.descripcion", cols="30", rows="5")
                .form-group
                  label(for="#service-price") Mensualidad
                  input.form-control#service-price(type="number", v-model="service.mensualidad")
                .form-group
                  label(for="#service-type") Tipo de Servicio
                  select.form-control#service-type(v-model="service.tipo")
                    option(:value="option.id", v-for="option of options") {{ option.text }}
              .col-md-12
        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-sector__save", @click="save") Guardar
</template>

<script>
  export default {
    props: {
      service: {
        type: Object,
        required: true
      },
      modalMode: {
        type: String,
        required: true
      },
      store: {
        type: Object,
        required: true,
      }
    },

    data() {
      return {
        options: [
          { id: 'internet', text: 'Internet' },
          { id: 'reparacion', text: 'Reparacion' },
          { id: 'seguro', text: 'Seguro' },
        ]
      };
    },

    mounted() {
      $('#service-modal').on('hide.bs.modal', () => {
        this.store.serviceEmpty();
        this.store.setServiceMode('add');
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
            title = 'Nuevo Servicio';
            break;
          case 'edit':
            title = `Editar ${service.nombre}`;
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
