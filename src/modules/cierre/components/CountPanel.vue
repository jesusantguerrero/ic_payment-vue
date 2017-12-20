<template lang="pug">
    .tab-pane.active.fade.in#cuadre-primario(role="tabpanel")
      form.tabla-dinero
        .form-group.row
          label(class="col-sm-2 col-form-label") Tipo de Moneda
          .col-sm-4
            label(class="col-sm-2 col-form-label") Cantidad

          .col-sm-4
            label(class="col-sm-2 col-form-label") Total

        .form-group.row(:key="currency.unit", v-for="currency of currencyUnits")

          label(class="col-sm-2 col-form-label") {{ currency.type}} RD$ {{ currency.unit }}
          .col-sm-4
            input(type="number", class="form-control", :data-unit="currency.unit", @keyup="changeTotal")
          .col-sm-4
            input(type="number", class="form-control", v-model="store.currency[`total${currency.unit}`]" disabled)

        .form-group.row
          label.col-sm-2.col-form-label(for="total-efectivo-caja") Total en efectivo
          .col-sm-4
          .col-sm-4
            input.form-control#total-efectivo-caja(type="number", :value="total" disabled)

</template>

<script>
  export default {
    props: {
      store: {
        type: Object,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },

    data() {
      return {
        currencyUnits: [
          { type: 'monedas', unit: '1' },
          { type: 'monedas', unit: '5' },
          { type: 'monedas', unit: '10' },
          { type: 'billetes', unit: '20' },
          { type: 'monedas', unit: '25' },
          { type: 'billetes', unit: '50' },
          { type: 'billetes', unit: '100' },
          { type: 'billetes', unit: '200' },
          { type: 'billetes', unit: '500' },
          { type: 'billetes', unit: '1000' },
          { type: 'billetes', unit: '2000' },
        ]
      };
    },

    methods: {
      changeTotal(e) {
        const unit = e.srcElement.attributes['data-unit'].value;
        const cantidad = e.srcElement.value;
        const value = cantidad * unit * 1.00;
        this.store.setUnitValue(unit, value);
      },
    }
  };
</script>

