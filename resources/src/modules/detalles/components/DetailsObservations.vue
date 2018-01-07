<template lang="pug">
  .wrapper.col-md-12
    .form-group.details-form
      h5 Escribe las observaciones para este cliente
      textarea.form-control#text-observations(rows="5" required="required", v-model="client.observaciones")
    .form-group
      .col-sm-2.col-sm-offset-10
        button.btn.btn-primary#btn-save-observations(@click="saveObservation") Guardar
</template>

<script>
  export default {
    props: {
      client: {
        type: Object,
        required: true
      },
      saveObservation: {
        type: Function,
        required: true
      }
    }
  };
</script>
