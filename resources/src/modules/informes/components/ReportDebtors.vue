<template lang="pug">
  .fixed-wrapper
    .searcher-container.main-toolbar#debtors-toolbar
      .input-group.search
        .input-group-addon: i.material-icons search
        input(type="text" class="form-control searcher" placeholder="cliente")
      .pull-right
        a(target="_blank" href="report/get_report/recibos" class="btn icon print-table"): i.material-icons print

    table(data-toggle="table" id="debtors-table"
      class="innertable table general-table"
      data-search="true"
      data-minimum-count-columns="2"
      data-toolbar="#debtors-toolbar"
      data-pagination="true"
      data-id-field="id_gasto"
      data-page-size="500"
      data-page-list="[100,200,500, 1000, 2000, 5000, 8000]"
      data-show-footer="false")
      thead
        tr
          th(data-field="contrato" data-sortable="true") Contrato
          th(data-field="cliente" data-sortable="true") Cliente
          th(data-field="celular" data-sortable="true") Celular
          th(data-field="cuota" data-sortable="true") Cuota
          th(data-field="mora" data-sortable="true") Mora
          th(data-field="extra" data-sortable="true") Extra
          th(data-field="total" data-sortable="true") Total
          th(data-field="pagos_pendiente" data-sortable="true") Pagos Pendientes
          th(data-field="meses" data-sortable="true") Meses
      tbody

</template>

<script>
  import SimpleTable from './SimpleTable';

  export default {
    mounted() {
      this.getReport();
    },

    methods: {
      getReport() {
        this.$http.get('report/get_debtors/table')
          .then((res) => {
            SimpleTable.fillBSTable('#debtors-table', res.data.debtors);
          });
      }
    }
  };
</script>
