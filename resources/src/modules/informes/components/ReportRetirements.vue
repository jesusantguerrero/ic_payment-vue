<template lang="pug">
  .wrapper
    .searcher-container.main-toolbar#retiros-toolbar
      .input-group.search
        .input-group-addon: i.material-icons search
        input(type="text" class="form-control searcher"  placeholder="cliente")
      .input-group.search-item
        .input-group-addon: i.material-icons event
        input(type="date" class="form-control caja-for-date" v-model="between.first_date" @change="getReport" placeholder="Fecha")
      .input-group.search-item
        .input-group-addon: i.material-icons event
        input(type="date" class="form-control caja-for-date" v-model="between.second_date" @change="getReport" placeholder="Fecha")
      .pull-right
        a(target="_blank" href="report/get_report/retiros" class="btn icon print-table"): i.material-icons print

    table(data-toggle="table" id="cancelation-table"
      class="innertable table general-table"
      data-sort-name="contract"
      data-sort-order="asc"
      data-search="true"
      data-minimum-count-columns="2"
      data-toolbar="#retiros-toolbar"
      data-pagination="true"
      data-id-field="contract"
      data-page-size="500"
      data-page-list="[100,200,500, 1000, 2000, 5000, 8000]"
      data-show-footer="false")
      thead
        tr
          th(data-field="contract" data-sortable="true") Cont
          th(data-field="client" data-sortable="true") Cliente
          th(data-field="direction" data-sortable="true") Direccion
          th(data-field="phone" data-sortable="true" style="width: 170px") Celular
          th(data-field="retirement" data-sortable="true") Retiro
          th(data-field="reason" data-sortable="true") Motivo
          th(data-field="ip" data-sortable="true") IP
          th(data-field="documents" data-sortable="true") Doc
      tbody
</template>

<script>
  import SimpleTable from './SimpleTable';

  export default {
    data() {
      return {
        table: '',
        between: {
          first_date: '',
          second_date: ''
        }
      };
    },

    mounted() {
      this.getReport();
    },

    methods: {
      getReport() {
        this.$http.post('contract/get_cancelations', this.getDataForm(this.between))
          .then((res) => {
            SimpleTable.fillBSTable('#cancelation-table', res.data.content);
          });
      }
    }
  };
</script>
