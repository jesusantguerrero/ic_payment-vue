<template lang="pug">
  .wrapper
    .left-navigation.administrador.col-md-2
      .aside-nav
        li.aside-buttons
          a(href="#", @click.prevent="slide('company')") <i class="material-icons">description</i> Empresa
        .aside-buttons
          a(href="#user-section") <i class="material-icons">person_pin</i> Usuarios
        .aside-buttons
          a(href="#caja-section") <i class="material-icons">move_to_inbox</i> Caja Chica
        .aside-buttons
          a(href="#", @click.prevent="slide('settings')") <i class="material-icons">settings</i> Ajustes
        .aside-buttons
          a(href="#message-settings-section") <i class="material-icons">phonelink_setup</i> Ajustes de Mensajes

    .main-content.col-md-10
      .section-player
        companySection(:company="store.company", :store="store", v-if="mode == 'company'")
        .company-details#settings-section(v-if="mode == 'settings'")
          h3.section-title Ajustes del Programa
          form
            .row
              .col-md-6
                .form-group
                  label(for="company-name") Monto de la mora
                  .input-group
                    .input-group-addon
                      i.material-icons &percnt;
                    input(type="number").form-control#settings-mora

                .form-group
                  label(for="company-phrase") Fecha de Corte
                  .input-group
                    .input-group-addon
                      i.material-icons event
                    input(type="number").form-control#settings-fecha-corte

                .form-group
                  label(for="company-phone1") Monto de Reconexion
                  .input-group
                    .input-group-addon
                      i.material-icons attach_money
                    input(type="number").form-control#settings-reconexion

              .col-md-6
                .form-group
                  label(for="company-name") Penalizacion Por Cancelacion:
                  .input-group
                    .input-group-addon
                      i.material-icons &percnt;
                    input(type="number").form-control#settings-penalizacion-cancelacion

                .form-group
                  label(for="company-name") Meses Por defecto de un contrato:
                  .input-group
                    .input-group-addon
                      i.material-icons event_note
                    input(type="number").form-control#settings-meses-por-defecto

                .form-group
                  label(for="company-name") Split Day
                  .input-group
                    .input-group-addon
                      i.material-icons
                    input(type="number").form-control#settings-split-day

                .right
                  input#btn-update-settings(type="submit", value="Guardar Datos")

</template>

<script>
  import companySection from "./components/companySection";
  import usersSection from "./components/usersSection";
  import cajaSection from "../services/caja/CajaSection";
  import messageForm from "./components/messageForm";
  import Store from "./store/adminStore"

  export default {
    components: {
      companySection,
      usersSection,
      cajaSection,
      messageForm,
    },
    mounted(){
      console.log(this.store);
    },

    data(){
      const store = new Store('admin');

      return {
        store,
        mode: 'company'
      }
    },

    methods: {
      slide(mode) {
        this.mode = mode;
      }
    }
  }
</script>

