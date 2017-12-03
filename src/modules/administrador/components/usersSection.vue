<template lang="pug">
  .company-details#user-section
    h3.section-title Usuarios
      .searcher-container.main-toolbar#user-toolbar
        .input-group.search
          .input-group-addon: i.material-icons search
          input.form-control.searcher(type="text", placeholder=" Busqueda por nombre")
        .pull-right
          button.btn.btn-primary.icon: i.material-icons
        .pull-right
          button.btn.btn-primary.icon#caller-user(data-toggle="modal", data-target="#new-user-modal") Agregar <i class="material-icons">add</i>
      table.table.t-users.t-users(data-sort-name="order", data-minimum-count-columns="2", data-show-pagination-switch="false"
        data-search="true", data-toolbar="#user-toolbar", data-pagination="true", data-unique-id="id", data-page-size="5", data-page-list="[5]"
        data-show-footer="false", data-striped="false")
        thead
          tr
            th(data-field="order") No.
            th(data-field="id" class="hide") COD
            th(data-field="nick") Usuario
            th(data-field="nombres") Nombres
            th(data-field="apellidos") Apellidos
            th(data-field="cedula") Cedula
            th(data-field="tipo") Tipo
            th(data-field="button") Estado
            th(data-field="tipo_codigo" class="hide") Tipo
            th(data-field="acciones") Acciones
        tbody
</template>

<script>
  export default {
    props: {
      name: 'usuarios',
      type: Array,
      required: true
    }
  }
</script>

