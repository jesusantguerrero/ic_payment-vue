<template lang="pug">
  .wrapper
    .left-navigation.administrador.col-md-2
      .aside-nav
        li.aside-buttons
          a(href="#company", @click.prevent="slide('company')") <i class="material-icons">description</i> Empresa
        .aside-buttons
          a(href="#users", @click.prevent="slide('users')") <i class="material-icons">person_pin</i> Usuarios
        .aside-buttons
          a(href="#petty-cash", @click.prevent="slide('petty-cash')") <i class="material-icons">move_to_inbox</i> Caja Chica
        .aside-buttons
          a(href="#settings", @click.prevent="slide('settings')") <i class="material-icons">settings</i> Ajustes
        .aside-buttons
          a(href="#message_settings", @click.prevent="slide('message_settings')") <i class="material-icons">phonelink_setup</i> Ajustes de Mensajes

    .main-content.col-md-10
      .section-player
        CompanySection(:company="store.company", :store="store", v-if="mode == 'company'")
        UsersSection(:store="store", v-if="mode == 'users'")
        PettyCashSection(v-if="mode == 'petty-cash'")
        SettingsSection(:company="store.company", v-if="mode == 'settings'")
        MessageSettings(:company="store.company", v-if="mode == 'message_settings'")
</template>

<script>
  import CompanySection from './components/CompanySection.vue';
  import UsersSection from './components/UsersSection.vue';
  import PettyCashSection from './components/PettyCashSection.vue';
  import MessageSettings from './components/MessageSettings.vue';
  import SettingsSection from './components/SettingsSection.vue';
  import Store from './store/adminStore';

  export default {
    components: {
      CompanySection,
      UsersSection,
      PettyCashSection,
      SettingsSection,
      MessageSettings
    },
    mounted() {
    },

    data() {
      const store = new Store('admin');

      return {
        store,
        mode: 'company'
      };
    },

    methods: {
      slide(mode) {
        this.mode = mode;
      }
    }
  };
</script>

