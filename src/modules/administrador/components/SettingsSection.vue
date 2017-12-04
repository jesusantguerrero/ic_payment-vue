<template lang="pug">
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
                i.material-icons event_note
              input(type="number").form-control#settings-split-day

          .right
            input#btn-update-settings(type="submit", value="Guardar Datos")
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
      }
    },

    methods: {
      update() {
        const from = 'data' = JSON.stringify(this.settings);

        axios.post(`${baseURL}settings/update`, form)
          .then((res) => {
            displayMessage(res.data);
          });
      }
    }
  }
</script>

