<template lang="pug">
  .wrapper
    .form-group.details-forms
      h5 Escribe los detalles de este abono
      textarea(name="", id="text-abono-detail", class="form-control", rows="5", required="required")

      h5 Control de abono de mes:

      .input-group
        .input-group-addon RD$
        input(type="number", class="form-control", id="input-abono", value="")
        .input-group-addon Pesos

    .form-group
      .col-sm-2.col-sm-offset-10
        button(type="submit" class="btn btn-primary" id="btn-save-observations") Guardar
</template>
