<template lang="pug">
  .screen.clients.row
    .left-navigation.col-md-2
      .aside-nav-container
        .left-navigation__header
          h3.left-navigation__header-text {{ title }}
        ul.aside-nav
          li.aside-buttons
            a(href="#" data-toggle="modal", data-target="#client-modal")
              i.material-icons person_add
              | Nuevo Cliente
          li.aside-buttons
            a(href="#" id="update-client", data-toggle="modal", @click.prevent="getClient")
              i.material-icons edit
              | Editar Cliente
          li.aside-buttons
            a(href="" id="delete-client", @click.prevent="deleteClient")
              i.material-icons delete
              | Eliminar Cliente
          li.aside-buttons
            a(href="" id="get-details", @click.prevent="sendTo('details')")
              i.material-icons find_in_page
              | Ver Detalles
          li.aside-buttons
            a(href="" id="client-new-contract", @click.prevent="sendTo('admin/nuevo_contrato')")
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
        DataTable(ids="client-table", :parentId="parentId", :data="clients", :cols="cols", :toolbar="toolbar", :options="tableOptions", @check-uncheck="listen", @cell-clicked="stateChanges")
    ClientModal(:store="store", :client="store.client", :modal-mode="store.clientMode" @save="getClients")

</template>

<script>
  import swal from 'sweetalert2';
  import utils from './../sharedComponents/utils';
  import DataTable from './../sharedComponents/DataTable.vue';
  import ClientModal from './components/ClientModal.vue';
  import ClientStore from './store/clientStore';

  export default {
    components: {
      DataTable,
      ClientModal
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
        selectedClient: null,
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
      },

      getClient() {
        const client = this.selectedClient;
        if (client) {
          this.$http.post('clients/get_client', this.getDataForm({ id: client.id }))
            .then((res) => {
              this.store.setClient(res.data.client);
              this.store.setClientMode('update');
              $('#client-modal').modal();
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        } else {
          this.$toasted.info('seleccione un cliente primero');
        }
      },

      listen(name, row) {
        this.selectedClient = row;
      },

      deleteClient() {
        const self = this;
        function sendDelete(id) {
          self.$http.post('clients/delete', self.getDataForm({ id }))
            .then((res) => {
              self.showMessage(res.data.message);
              if (res.data.message.type === 'success') {
                self.selectedClient = null;
              }
              self.getClients();
            });
        }
        if (this.selectedClient) {
          const client = this.selectedClient;
          swal({
            title: 'Eliminar Cliente',
            text: `¿Está seguro de querer eliminar a ${client.nombres} ${client.apellidos}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
              sendDelete(client.id);
            }
          });
        } else {
          this.$toasted.info('seleccione un cliente primero');
        }
      },

      sendTo(endpoint, param = '') {
        const client = this.selectedClient;
        if (client) {
          window.location.href = `${baseURL}app/${endpoint}/${client.id}/${param}`;
        } else {
          this.$toasted.info('seleccione un cliente primero');
        }
      },

      updateState(id, state) {
        const form = {
          id,
          row: 'estado',
          value: state
        };
        this.$http.post('clients/update_row', this.getDataForm(form))
          .then((res) => {
            this.getClients();
            this.showMessage(res.data.message);
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      },

      stateChanges(name, args) {
        const self = this;
        const { options } = this;
        const theOptions = options.map(option => ((option.key !== 'todo') ? `<option value='${option.key}'> ${option.key}</value>` : ''));
        const selectState = `<select>${theOptions.join('')}</select>`;
        const select = $(selectState);
        const $this = args[3];
        const row = args[2];
        let state = row.estadoreal;

        $this.html(select);
        select.focus();
        select.val(state);
        select.on('change blur', () => {
          state = select.val();
          $this.html(state);
          $this.removeClass('text-danger text-success text-primary');
          self.updateState(row.id, state);
        });
        select.on('click', (event) => {
          event.stopImmediatePropagation();
        });
      }
    }
  };
</script>

