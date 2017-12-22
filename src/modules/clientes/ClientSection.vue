<template lang="pug">
  .wrapper
    .left-navigation.col-md-2
      .aside-nav-container
        .left-navigation__header
          h3.left-navigation__header-text {{ title }}
        ul.aside-nav
          li.aside-buttons
            a(href="#" data-toggle="modal" data-target="#new-client-modal")
              i.material-icons person_add
              | Nuevo Cliente
          li.aside-buttons
            a(href="#" id="update-client" data-toggle="modal" data-target="#update-client-modal")
              i.material-icons edit
              | Editar Cliente
          li.aside-buttons
            a(href="" id="delete-client")
              i.material-icons delete
              | Eliminar Cliente
          li.aside-buttons
            a(href="" id="get-details")
              i.material-icons find_in_page
              | Ver Detalles
          li.aside-buttons
            a(href="" id="client-new-contract")
              i.material-icons description
              | Nuevo Contrato

    .main-content.col-md-10
      #client-table-container
        .searcher-container.main-toolbar#client-toolbar
          .input-group.search
            .input-group-addon: i.material-icons search
            input.form-control.searcher(type="text" placeholder="Busque cliente por cedula, nombre, apellidos o id")
          .pull-right
            a.btn.icon.print-table(target="_blank" href="process/getreport/clientes'"): i.material-icons print
          .pull-right
            select#client-filter.form-group.filter.btn.btn-primary
              option(:value="option.key", v-for="option of options") {{ option.text }}
        DataTable(ids="client-table", :parentId="parentId", :data="clients", :cols="cols", :toolbar="toolbar", :options="tableOptions")

</template>

<script>
  import DataTable from './../sharedComponents/DataTable.vue';
  import utils from './../sharedComponents/utils';
  import ClientStore from './store/clientStore';

  export default {
    components: {
      DataTable
    },
    mounted() {
      this.getClients();
      utils.spyLeftNavigation();
    },
    data() {
      const store = new ClientStore();
      return {
        store,
        title: 'Clientes',
        parentId: '#client-table-container',
        toolbar: '#client-toolbar',
        clients: '',
        tableOptions: {
          pageSize: 200,
          pageList: [50, 100, 200, 500, 1000],
          states: ['no activo', 'activo', 'suspendido', 'mora'],
          stateField: 'estadoreal'
        },
        options: [
          { key: 'todo', text: 'Todos' },
          { key: 'no activo', text: 'No Activos' },
          { key: 'activo', text: 'Activos' },
          { key: 'suspendido', text: 'Suspendidos' },
          { key: 'mora', text: 'Mora' },
        ]
      };
    },

    computed: {
      cols() {
        return this.store.columns;
      }
    },

    methods: {
      getClients() {
        this.$http.post('clients/get_clients')
          .then((res) => {
            this.clients = res.data.clients;
          });
      }
    }
  };
</script>

