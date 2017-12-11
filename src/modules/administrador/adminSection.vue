<template lang="pug">
  .wrapper
    .left-navigation.administrador.col-md-2
      .aside-nav
        li.aside-buttons
          a(href="#", @click.prevent="slide('company')") <i class="material-icons">description</i> Empresa
        .aside-buttons
          a(href="#", @click.prevent="slide('users')") <i class="material-icons">person_pin</i> Usuarios
        .aside-buttons
          a(href="#caja-section") <i class="material-icons">move_to_inbox</i> Caja Chica
        .aside-buttons
          a(href="#", @click.prevent="slide('settings')") <i class="material-icons">settings</i> Ajustes
        .aside-buttons
          a(href="#", @click.prevent="slide('message_settings')") <i class="material-icons">phonelink_setup</i> Ajustes de Mensajes

    .main-content.col-md-10
      .section-player
        CompanySection(:company="store.company", :store="store", v-if="mode == 'company'")
        UsersSection(:store="store", v-if="mode == 'users'")
        SettingsSection(:company="store.company", v-if="mode == 'settings'")
        MessageSettings(:company="store.company", v-if="mode == 'message_settings'")
</template>

<script>
  import CompanySection from "./components/CompanySection";
  import UsersSection from "./components/UsersSection";
  import CajaSection from "../services/caja/CajaSection";
  import MessageSettings from "./components/MessageSettings";
  import SettingsSection from "./components/SettingsSection";
  import Store from "./store/adminStore"

  export default {
    components: {
      CompanySection,
      UsersSection,
      CajaSection,
      SettingsSection,
      MessageSettings
    },
    mounted(){
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

