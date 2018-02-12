<template lang="pug">
  .screen.clients.row
    .left-navigation.col-md-2
      .aside-nav-container
        .left-navigation__header
          h3.left-navigation__header-text {{ title }}
        ul.aside-nav
          li.aside-buttons
            a(href="#" data-toggle="modal", data-target="#service-modal")
              i.material-icons person_add
              | Nuevo Servicio
          li.aside-buttons
            a(href="#" id="update-service", data-toggle="modal", @click.prevent="getService")
              i.material-icons edit
              | Editar Servicio
          li.aside-buttons
            a(href="" id="delete-service", @click.prevent="deleteService")
              i.material-icons delete
              | Eliminar Servicio
          li.aside-buttons
            a(href="" id="get-service-details")
              i.material-icons find_in_page
              | Ver Detalles

    .main-content.col-md-10
      #service-table-container
        .searcher-container.main-toolbar#service-toolbar
          .input-group.search
            .input-group-addon: i.material-icons search
            input.form-control.searcher(type="text" placeholder="Buscar servicio")
          .pull-right
            a.btn.icon.print-table(target="_blank" href="process/getreport/services'"): i.material-icons print
          .pull-right
            select#service-filter.form-group.filter.btn.btn-primary
              option(:value="option.id", v-for="option of options") {{ option.text }}
        DataTable(ids="service-table", :parentId="parentId", :data="services", :cols="cols", :toolbar="toolbar", :options="tableOptions", @check-uncheck="listen")
    ServiceModal(:store="store", :service="store.service", :modal-mode="store.serviceMode" @save="addUpdate")

</template>

<script>
  import swal from 'sweetalert2';
  import utils from './../sharedComponents/utils';
  import DataTable from './../sharedComponents/DataTable.vue';
  import ServiceModal from './components/ServiceModal.vue';
  import Store from './store/ServiceStore';

  export default {
    components: {
      DataTable,
      ServiceModal
    },

    mounted() {
      this.getServices();
      utils.spyLeftNavigation();
    },

    data() {
      const store = new Store();
      return {
        store,
        title: 'Servicios',
        parentId: '#service-table-container',
        toolbar: '#service-toolbar',
        services: '',
        tableOptions: {
          pageSize: 200,
          pageList: [50, 100, 200, 500, 1000],
          states: ['internet', 'reparacion', 'seguro'],
          stateField: 'tipo'
        },
        selectedService: null,
        options: [
          { id: 'todo', text: 'Todos' },
          { id: 'internet', text: 'Internet' },
          { id: 'reparacion', text: 'Reparacion' },
          { id: 'seguro', text: 'seguro' },
        ]
      };
    },

    computed: {
      cols() {
        return this.store.columns;
      }
    },

    methods: {
      addUpdate() {
        const { service } = this.store;
        const empty = utils.isEmpty(service);
        if (!empty) {
          this.$http.post(`service/${this.store.serviceMode}`, this.getDataForm(service))
            .then((res) => {
              this.getServices();
              this.showMessage(res.data.message);
              if (res.data.message.type === 'success') {
                $('#service-modal').modal('hide');
              }
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        } else {
          this.$toasted.info('LLene todos los campos por favor');
        }
      },

      getServices() {
        this.$http.post('service/get_services')
          .then((res) => {
            this.services = res.data.services;
          });
      },

      getService() {
        const service = this.selectedService;
        if (service) {
          this.$http.post('service/get_service', this.getDataForm({ id: service.id }))
            .then((res) => {
              this.store.setService(res.data.service);
              this.store.setServiceMode('update');
              $('#service-modal').modal();
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        } else {
          this.$toasted.info('seleccione un servicio primero');
        }
      },

      listen(name, row) {
        this.selectedService = row;
      },

      deleteService() {
        const self = this;

        function sendDelete(id) {
          self.$http.post('service/delete', self.getDataForm({ id }))
            .then((res) => {
              self.showMessage(res.data.message);
              if (res.data.message.type === 'success') {
                self.selectedService = null;
              }
              self.getServices();
            });
        }
        if (this.selectedService) {
          const service = this.selectedService;
          swal({
            title: 'Eliminar Servicio',
            text: `¿Está seguro de querer eliminar a ${service.nombre}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
              sendDelete(service.id);
            }
          });
        } else {
          this.$toasted.info('seleccione un servicio primero');
        }
      },
    }
  };
</script>
