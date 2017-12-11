<template lang="pug">
  .modal.fade(tabindex="-1", role="dialog", id="new-user-modal")
    .modal-dialog(role="document")
      .modal-content
        .modal-header
          button.close(data-dismiss="modal", aria-label="Close", type="button"): span(aria-hidden="true") &times;
          h4.modal-titleNuevo Usuario
        .modal-body
          form
            .row
              .col-md-6
                .form-group
                  label(for="user-nickname") Usuario
                  input(type="text", class="form-control", id="user-nickname", placeholder="jguerrero")
                .form-group
                  label(for="user-password") Contraseña
                  input(type="password", class="form-control password", id="user-password", placeholder="contraseña")
                .form-group
                  label(for="user-password-confirm") confirmar contraseña
                  input(type="password", class="form-control password-confirm", id="user-password-confirm", placeholder="contraseña")
                .form-group
                  label(for="user-type") Tipo de usuario
                  select(class="form-control", id="user-type")
                    option(value="0") Administrador
                    option(value="1") Secretaria(o)
              .col-md-6
                .form-group
                  label(for="user-name") Nombres
                  input(type="text", class="form-control", id="user-name", placeholder="Jesus Ant.")
                .form-group
                  label(for="user-lastname") Apellidos
                  input(type="text", class="form-control", id="user-lastname", placeholder="Guerrero Alvarez")
                .form-group
                  label(for="user-dni") Cedula(sin guiones)
                  input(type="text", class="form-control", id="user-dni")
      .modal-footer
        button(type="button", data-dismiss="modal").btn Cancelar
        button(type="button").btn.save#btn-save-user Guardar
</template>

<script>
  export default {

  }
</script>

