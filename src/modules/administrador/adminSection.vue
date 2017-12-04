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
        CompanySection(:company="store.company", :store="store", v-if="mode == 'company'")
        SettingsSection(:company="store.company", v-if="mode == 'settings'")


</template>

<script>
  import CompanySection from "./components/CompanySection";
  import usersSection from "./components/usersSection";
  import CajaSection from "../services/caja/CajaSection";
  import messageForm from "./components/messageForm";
  import SettingsSection from "./components/SettingsSection";
  import Store from "./store/adminStore"

  export default {
    components: {
      CompanySection,
      usersSection,
      CajaSection,
      messageForm,
      SettingsSection
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

