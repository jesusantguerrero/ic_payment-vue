<template lang="pug">
  .wrapper.col-md-12
    .form-group.details-forms
      h5 Escribe los detalles de este abono
      textarea(name="", id="text-abono-detail", class="form-control", rows="5", v-model="abono.descripcion")

      h5 Control de abono de mes:

      .input-group
        .input-group-addon RD$
        input(type="number", class="form-control", id="input-abono", v-model="abono.cuota")
        .input-group-addon Pesos

    .form-group
      .col-sm-2.col-sm-offset-10
        button(type="submit" class="btn btn-primary" id="btn-save-abono", @click="save") Guardar
</template>

<script>
  import utils from './../../sharedComponents/utils';

  export default {
    props: {
      store: Object
    },
    data() {
      return {
        abono: {
          descripcion: '',
          cuota: '',
          contrato_abono: ''
        }
      };
    },

    methods: {
      save() {
        this.abono.contrato_abono = this.store.selectedContract;
        const empty = utils.isEmpty(this.abono);
        if (!empty) {
          this.$http.post('payment/abono', this.getDataForm(this.abono))
            .then((res) => {
              this.showMessage(res.data.message);
              if (res.data.message.type === 'success') {
                this.emptyAbono();
                window.appBus.$emit('details.save-abono');
              }
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        } else {
          this.$toasted.error('llene todos los campos');
        }
      },

      emptyAbono() {
        this.abono = {
          descripcion: '',
          cuota: '',
          contrato_abono: ''
        };
      }
    }
  };
</script>
