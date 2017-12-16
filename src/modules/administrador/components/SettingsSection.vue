<template lang="pug">
  .company-details#settings-section
    h3.section-title Ajustes del Programa
    form
      .row
        .col-md-6
          .form-group
            label(for="company-name") Monto de la mora
            input(type="number", v-model="settings.cargo_mora").form-control

          .form-group
            label(for="company-phrase") Fecha de Corte
            input(type="number", v-model="settings.fecha_corte").form-control

          .form-group
            label(for="company-phone1") Monto de Reconexion
            input(type="number", v-model="settings.reconexion").form-control

        .col-md-6
          .form-group
            label(for="company-name") Penalizacion Por Cancelacion:
            input(type="number", v-model="settings.penalizacion_cancelacion").form-control

          .form-group
            label(for="company-name") Meses Por defecto de un contrato:
            input(type="number", v-model="settings.meses_por_defecto").form-control

          .form-group
            label(for="company-name") Split Day
            input(type="number", v-model="settings.split_day").form-control

          .right
            input#btn-update-settings(type="submit", @click.prevent="update", value="Guardar Datos")
</template>


<script>
  export default {
    data() {
      return {
        settings: {
          cargo_mora: '',
          fecha_corte: '',
          reconexion: '',
          split_day: '',
          penalizacion_cancelacion: '',
          meses_por_defecto: '',
        }
      };
    },

    mounted() {
      this.getSettings();
    },

    methods: {
      update() {
        const self = this;
        this.$http.post('settings/update', this.getDataForm(this.settings))
          .then((res) => {
            self.showMessage(res.data.message);
          });
      },

      getSettings() {
        const self = this;
        this.$http.get('settings/get')
          .then((res) => {
            self.settings = res.data;
          });
      }
    }
  };
</script>

