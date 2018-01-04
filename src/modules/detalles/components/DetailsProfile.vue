<template lang="pug">
  form.watch-in-detail.special
    .row
      .col-md-6
        .input-group.col-md-4
          span.input-group-addon ID
          input.form-control(:value="client.id_cliente", disabled="true")
        .input-group
          span.input-group-addon Nombre
          input.form-control(:value="fullname", disabled="true")

        .input-group
          span.input-group-addon Fecha de Registro
          input.form-control(:value="client.fecha_registro", disabled="true")

        h4.placeholder ...
        h4 Dirección
        .input-group
          span.input-group-addon Provincia
          input.form-control(:value="client.provincia", disabled="true")
        .input-group
          span.input-group-addon Sector
          input.form-control(:value="client.sector", disabled="true")
        .input-group
          span.input-group-addon Telefono
          input(type="tel", class="form-control", :value="client.telefono", disabled="true")

      .col-md-6
        h4.placeholder-lg ...
        .input-group
          span.input-group-addon Cedula
          input(type="text", class="form-control", :value="client.cedula", role="cedula", disabled="true")
        .input-group
          span.input-group-addon Celular
          input(type="tel", class="form-control", :value="client.celular", disabled="true")
        h4.placeholder ...
        h4.placeholder ...
        .input-group
          span.input-group-addon Calle
          input(type="text", class="form-control", :value="client.calle", disabled="true")

        .input-group
          span.input-group-addon Casa #
          input(type="text", class="form-control", :value="client.casa", disabled="true")
      .col-md-12
        .form-group
          textarea.form-control( rows="5" required="required") {{ client.detalles_direccion }}

</template>

<script>
  import InputMask from 'inputmask';
  import utils from './../../sharedComponents/utils';

  export default {
    props: {
      client: {
        type: Object,
        required: true
      },
      fullname: {
        type: String,
        required: true
      }
    },

    mounted() {
      utils.startInputMask(InputMask);
    }
  };
</script>
