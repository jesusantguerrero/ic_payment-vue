<template lang="pug">
  .tab-pane.fade.in#registro-gastos(role="tabpanel")
    form
      .row
        .col-md-6
          .form-group
            label(for="cient-sector") Descripcion
            input.form-control(v-model="gasto.descripcion", tabindex="6")

        .col-md-6
          .form-group
            label(for="client-street")
            .input-group.normal-height
              input.form-control(type="number", v-model="gasto.monto" tabindex="6")
              span.input-group-btn
                button.btn.btn-secondary.icon(type="button", @click="addExpense"): i.material-icons add
      .row
        h4.col-md-12.col-lg-12 Gastos
      .row
        .col-md-12
          ul.list-group.lista-gastos
            li.list-group-item(:key="gasto.id_gasto", v-for="gasto in gastos") {{ gasto.descripcion }}<span class="money">RD$ {{gasto.monto}}</span>
              i.material-icons.list-action(:data-id="gasto.id_gasto", @click.prevent.stop="deleteExpense") delete
</template>

<script>
  import utils from './../../sharedComponents/utils';

  const gasto = {
    fecha: '',
    descripcion: '',
    monto: '',
  };

  const gastos = [{
    fecha: utils.now(),
    descripcion: 'hola',
    monto: 2000,
    id_gasto: 1
  }];

  export default {
    props: {
      setTotalExpenses: Function
    },
    data() {
      return {
        gasto,
        gastos
      };
    },

    mounted() {
      this.getExpenses();
    },

    methods: {

      addExpense() {
        this.gasto.fecha = utils.now();
        this.$http.post('caja/add_expense', this.getDataForm(this.gasto))
          .then((res) => {
            this.showMessage(res.data.message);
            this.getExpenses();
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      },

      fillExpenses(serverExpenses, mode) {
        if (mode === 'group') {
          if (serverExpenses != null || serverExpenses.length > 0) {
            this.gastos = serverExpenses;
          } else {
            this.gastos = [];
          }
        } else {
          this.gastos.push(JSON.parse(serverExpenses)[0]);
        }
      },

      getExpense() {
        const form = { idGasto: this.gasto };
        this.$http.get('caja/get_expense', getDataForm(form))
          .then((res) => {
            this.fillExpenses(res.data);
          });
      },

      deleteExpense(e) {
        let caller = e.target;
        if (caller.localname === 'i') {
          caller = caller.parentElement;
        }
        const id = caller.attributes['data-id'].value;
        this.deleteConfirmation('Está Seguro?', 'Seguro de que quiere eliminar este gasto?')
          .then((result) => {
            if (result.value) {
              this.sendDelete(id);
            }
          });
      },

      sendDelete(id) {
        const form = {
          id,
          fecha: utils.now()
        };

        this.$http.post('caja/delete_expense', this.getDataForm(form))
          .then((res) => {
            this.showMessage(res.data.menssage);
            this.getExpenses();
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      },

      getExpenses() {
        this.$http.post('caja/get_expenses', this.getDataForm({ fecha: utils.now() }))
          .then((res) => {
            this.fillExpenses(res.data.gastos, 'group');
            this.setTotalExpenses(res.data.total_gastos);
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      },
    }
  };
</script>

