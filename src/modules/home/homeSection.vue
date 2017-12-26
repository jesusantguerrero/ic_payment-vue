<template lang="pug">
  section#home-section
    .row.welcome-screen
      .col-md-8.col-xs-12.main-card
          .row
              .company-data
                  img.company-logo(:src="logo", alt="company-logo", style="width: 170px")
              .welcome-data
                  .row
                      .col-md-6.without-padding
                          h4 {{ store.company.nombre }}
                          h4 Bienvenido {{ store.currentUser.name }}

                      .col-md-5.col-xs-6.date-container
                          p.day {{ date.day }}
                          p.month-year {{ date.monthYear }}
                          span.dayweek {{ date.dayWeek }}

      DetailCards(:store="store")

    .row.home-options-container
      .col-md-8.hidden-xs.shortcuts-container
          .col-md-4.shortcut#caller-new-client(data-toggle="modal", data-target="#new-client-modal")
              i.material-icons person_add
              p.section-title Nuevo Cliente

          .col-md-4.shortcut(data-toggle="modal", @click="sendTo('nuevo_contrato')")
              i.material-icons library_books
              p.section-title Nuevo Contrato

          .col-md-4.shortcut(data-toggle="modal", data-target="#search-client-modal")
              i.material-icons monetization_on
              p.section-title Registrar Pago
          .col-md-4.shortcut#desk-cash-caller(@click="sendTo('cierre')")
              i.material-icons lock_open
              p.section-title Cerrar Caja

      .col-md-4.clock-card
          h3.card-title.t-center Hora
          h4.hour.h3-4.t-center {{ date.hour }}
    SearchClientModal
</template>

<script>
import DetailCards from './components/DetailCards.vue';
import SearchClientModal from './components/SearchClientModal.vue';

const store = window.appStore;


export default {
  name: 'home-section',
  components: {
    DetailCards,
    SearchClientModal
  },
  mounted() {
    this.getDate();
  },
  data() {
    return {
      store,
      date: {
        day: '',
        monthYear: '',
        dayWeek: '',
        hour: ''
      }
    };
  },

  methods: {
    getDate() {
      const self = this;
      const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

      function updateHour() {
        const date = new Date();
        self.date.day = date.getDate();
        self.date.monthYear = `De ${months[date.getMonth()]} de ${date.getFullYear()}`;
        self.date.dayWeek = days[date.getDay()];
        self.date.hour = date.toLocaleTimeString();
      }

      setInterval(updateHour, 1000);
    },

    sendTo(url) {
      window.location.href = `${baseURL}app/admin/${url}`;
    }
  },

  computed: {
    logo() {
      const logo = this.store.company.logo || 'company/default.png';
      return `${baseURL}assets/uploads/${logo}`;
    }
  },
};
</script>
