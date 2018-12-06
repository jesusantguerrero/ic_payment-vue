<template lang="pug">
  .screen.clients.row
    .left-navigation.col-md-2
      .aside-nav-container
        .left-navigation__header
          h3.left-navigation__header-text {{ title }}
        ul.aside-nav
          li.aside-buttons
            a(href="" id="make-payment", @click.prevent="sendTo('new_contract')")
              i.material-icons monetization_on
              | Registrar Pago

    .main-content.col-md-10
      #extra-table-container
        .searcher-container.main-toolbar#extra-toolbar
          .input-group.search
            .input-group-addon: i.material-icons search
            input.form-control.searcher(type="text" placeholder="Buscar por cliente",v-model="search.text", @keypress.enter.stop="getExtras")
          .pull-right
            a.btn.icon.print-table(target="_blank" href="process/getreport/clientes'"): i.material-icons print
          .pull-right
            select#client-filter.form-group.filter.btn.btn-primary
              option(:value="option.key", v-for="option of options") {{ option.text }}
        DataTable(ids="extra-table", :parentId="parentId", :data="content", :cols="cols", :toolbar="toolbar", :options="tableOptions")
        .mini-card.total
          h5 Vendido : {{totales.total_vendido || 0 | currencyFormat}}
          h5.text-success Pagado : RD$ {{totales.pagado || 0 | currencyFormat}}
          h5 --------------------
          h5.text-danger Pendiente : RD$ {{totales.pendiente || 0 | currencyFormat}}
</template>

<script>
  import DataTable from './../sharedComponents/DataTable.vue';
  import utils from './../sharedComponents/utils';
  import Store from './store/ExtraStore';

  const store = new Store();

  export default {
    components: {
      DataTable
    },
    mounted() {
      this.getExtras();
      utils.spyLeftNavigation();
    },
    data() {
      return {
        title: 'Extras',
        parentId: '#extra-table-container',
        toolbar: '#extra-toolbar',
        content: '',
        options: [
          { key: 'todo', text: 'Todos' },
          { key: 'saldado', text: 'Saldados' },
          { key: 'activo', text: 'Activos' }
        ],
        tableOptions: {
          pageSize: 200,
          pageList: [50, 100, 200, 500, 1000],
          states: ['saldado', 'activo'],
          stateField: 'estado'
        },
        search: {
          text: '',
          state: 'activo'
        },
        totales: {
          pagado: 0,
          pendiente: 0,
          total_vendido: 0
        },
        tableId: '#extra-table-full'
      };
    },
    methods: {
      getExtras() {
        this.$http.post('extra/get_all', this.getDataForm(this.search))
          .then((res) => {
            this.content = res.data.content;
            this.totales = res.data.totales;
          });
      },
    },

    computed: {
      cols() {
        return store.colunms;
      }
    }
  };
</script>
