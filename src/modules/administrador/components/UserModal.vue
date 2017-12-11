<template lang="pug">
  .modal.fade(tabindex="-1", role="dialog", id="user-modal")
    .modal-dialog(role="document")
      .modal-content
        .modal-header
          button.close(data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-titleNuevo Usuario
        .modal-body
          form
            .row
              .col-md-6
                .form-group
                  label(for="user-nickname") Usuario
                  input.form-control#user-nickname(type="text", v-model="user.nickname")
                .form-group
                  label(for="user-password") Contraseña
                  input.form-control#user-password(type="password", v-model="user.password")
                .form-group
                  label(for="user-password-confirm") confirmar contraseña
                  input.form-control#user-password-confirm(type="password", v-model="validation.password_confirm")
                .form-group
                  label(for="user-type") Tipo de usuario
                  select.form-control#user-type(v-model="user.type")
                    option(v-for="type of userTypes",value="type.val") {{ type.text }}
              .col-md-6
                .form-group
                  label(for="user-name") Nombres
                  input.form-control#user-name(type="text", v-model="user-name")
                .form-group
                  label(for="user-lastname") Apellidos
                  input.form-control#user-lastname(type="text", v-model="user.lastname")
                .form-group
                  label(for="user-dni") Cedula(sin guiones)
                  input.form-control#user-model(type="text", v-model="user.dni")
              .col-md-12
                  label(for="user-email")
                  input.form-control#user-email(type="email", v-model="user.email")
      .modal-footer
        button(type="button", data-dismiss="modal").btn Cancelar
        button(type="button").btn.save#btn-save-user Guardar
</template>

<script>
  export default {
    props: {
      user: {
        type: Object
      },
      validation: {
        type: Object
      },
      userTypes: {
        type: Array
      }
    },

    methods: {

    },

    computed: {

    }
  }
</script>

