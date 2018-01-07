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
        AdminCompanySection(:company="store.company", :store="store", v-if="mode == 'company'")
        AdminUserSection(:store="store", v-if="mode == 'users'")
        AdminPettyCashSection(v-if="mode == 'petty-cash'")
        AdminSettingsSection(:company="store.company", v-if="mode == 'settings'")
        AdminMessageSettings(:company="store.company", v-if="mode == 'message_settings'")
</template>

<script>
  import AdminCompanySection from './components/AdminCompanySection.vue';
  import AdminUserSection from './components/AdminUserSection.vue';
  import AdminPettyCashSection from './components/AdminPettyCashSection.vue';
  import AdminMessageSettings from './components/AdminMessageSettings.vue';
  import AdminSettingsSection from './components/AdminSettingsSection.vue';
  import AdminStore from './store/AdminStore';

  export default {
    name: 'admin-section',
    components: {
      AdminCompanySection,
      AdminUserSection,
      AdminPettyCashSection,
      AdminSettingsSection,
      AdminMessageSettings
    },
    mounted() {
    },

    data() {
      const store = new AdminStore();
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

