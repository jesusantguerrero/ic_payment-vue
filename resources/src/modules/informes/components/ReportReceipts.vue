<template lang="pug">
  .wrapper
    .searcher-container.main-toolbar#receipts-toolbar
      .input-group.search
        .input-group-addon: i.material-icons search
        input(type="text" class="form-control searcher" @keypress.enter="getReport" placeholder="cliente")
      .input-group.search-item
        .input-group-addon: i.material-icons event
        input(type="date" class="form-control caja-for-date" v-model="between.first_date" @change="getReport" placeholder="Fecha")
      .input-group.search-item
        .input-group-addon: i.material-icons event
        input(type="date" class="form-control caja-for-date" v-model="between.second_date" @change="getReport" placeholder="Fecha")
      .pull-right
        a(target="_blank" href="report/get_report/recibos" class="btn icon print-table"): i.material-icons print

    table(data-toggle="table" id="receipt-table"
      class="innertable table general-table"
      data-sort-name="num"
      data-sort-order="asc"
      data-search="true"
      data-minimum-count-columns="2"
      data-toolbar="#receipts-toolbar"
      data-pagination="true"
      data-id-field="contract"
      data-page-size="500"
      data-page-list="[100,200,500, 1000, 2000, 5000, 8000]"
      data-show-footer="false")
      thead
        tr
          th(data-field="num" data-sortable="true") Num
          th(data-field="payment" data-sortable="true" class="hide") Pago
          th(data-field="contract" data-sortable="true") Cont
          th(data-field="client" data-sortable="true") Cliente
          th(data-field="service" data-sortable="true") Servicio
          th(data-field="concept" data-sortable="true") Concepto
          th(data-field="total" data-sortable="true") Total
          th(data-field="fecha" data-sortable="true") Fecha
          th(data-field="hours" data-sortable="true") Hora
      tbody
    .mini-card.total: h4 Total : {{ total | currencyFormat }}
</template>

<script>
  import SimpleTable from './SimpleTable';

  export default {
    data() {
      return {
        table: '',
        between: {
          first_date: '',
          second_date: '',
          text: '',
        },
        total: 0.00
      };
    },

    mounted() {
      this.getReport();
    },

    methods: {
      getReport() {
        this.$http.post('payment/get_receipts', this.getDataForm(this.between))
          .then((res) => {
            SimpleTable.fillBSTable('#receipt-table', res.data.content);
            this.total = res.data.total;
          });
      }
    }
  };
</script>
