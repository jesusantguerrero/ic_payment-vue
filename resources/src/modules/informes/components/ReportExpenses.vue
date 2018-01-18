<template lang="pug">
  .wrapper
    .searcher-container.main-toolbar#expenses-toolbar
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

    table(data-toggle="table" id="expenses-table"
      class="innertable table general-table"
      data-search="true"
      data-minimum-count-columns="2"
      data-toolbar="#expenses-toolbar"
      data-pagination="true"
      data-id-field="id_gasto"
      data-page-size="500"
      data-page-list="[100,200,500, 1000, 2000, 5000, 8000]"
      data-show-footer="false")
      thead
        tr
          th(data-field="id_gasto" data-sortable="true" data-searchable="false") #Gasto COD
          th(data-field="fecha" data-sortable="true" data-searchable="false") Fecha
          th(data-field="descripcion" data-sortable="true") Descripcion
          th(data-field="monto" data-sortable="true" style="width: 170px" data-searchable="false") Monto
          th(data-field="autor" data-sortable="true") Autor
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
        this.$http.post('caja/get_expenses/true', this.getDataForm(this.between))
          .then((res) => {
            SimpleTable.fillBSTable('#expenses-table', res.data.content);
            this.total = res.data.acum;
          });
      }
    }
  };
</script>
