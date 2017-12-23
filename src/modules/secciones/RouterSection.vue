<template lang="pug">
  .wrapper
    .left-navigation.col-md-2
      .aside-nav-container
        .left-navigation__header
          h3.left-navigation__header-text {{ title }}
        ul.aside-nav
          li.aside-buttons
            a(href="" id="make-payment", @click.prevent="add")
              i.material-icons add
              | Agregar Seccion

    .main-content.col-md-10
      #extra-table-container
        .searcher-container.main-toolbar#extra-toolbar
          .input-group.search
            .input-group-addon: i.material-icons search
            input.form-control.searcher(type="text" placeholder="Buscar por cliente",v-model="search.text")
          .pull-right
            a.btn.icon.print-table(target="_blank", :href="reportUrl"): i.material-icons print
          .pull-right
            select#select-sector.btn.btn-primary(v-model="selectedId")
              option(:value="section.key", v-for="section of sections") {{ option.text }}
          .pull-right
            select#client-filter.form-group.filter.btn.btn-primary
              option(:value="option.key", v-for="option of options") {{ option.text }}
        DataTable(ids="extra-table", :parentId="parentId", :data="content", :cols="cols", :toolbar="toolbar", :options="tableOptions")
        .mini-card.total
</template>

<script>
  import DataTable from './../sharedComponents/DataTable.vue';
  import utils from './../sharedComponents/utils';

  export default {
    components: {
      DataTable
    },
    mounted() {
      this.getSectionList();
      this.getIps();
      utils.spyLeftNavigation();
    },
    data() {
      return {
        title: 'Extras',
        parentId: '#extra-table-container',
        toolbar: '#extra-toolbar',
        content: '',
        selectedId: '',
        options: [
          { key: 'todo', text: 'Todos' },
          { key: 'ocupado', text: 'Ocupadas' },
          { key: 'disponible', text: 'Disponibles' },
          { key: 'sectorial', text: 'Sectoriales' }
        ],
        sections: [],
        tableOptions: {
          pageSize: 200,
          pageList: [50, 100, 200, 500, 1000],
          states: ['ocupado', 'disponible', 'sectorial'],
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
      add() {
        swal.setDefaults({
          input: 'text',
          confirmButtonText: 'Next &rarr;',
          showCancelButton: true,
          animation: false,
          progressSteps: ['1', '2', '3']
        });

        const steps = [{
          title: 'Nombre del sector'
        },
        'Codigo del Sector',
        ];

        swal.queue(steps).then((result) => {
          swal.resetDefaults();
          self.save(result);
        });
      },

      save() {
        const self = this;
        const nombre = result[0];
        const codigoArea = result[1];
        const form = {
          nombre,
          codigo_area: codigoArea
        };

        utils.heavyLoad(true);
        return new Promise(resolve => this.$http.post('section/add', this.getDataForm(form))
          .then((res) => {
            self.getIps();
            this.showMessage(res.data.message);
            utils.heavyLoad(false);
            return resolve();
          }));
      },

      getIps() {
        if (this.selectedId) {
          this.send('section/get_ips', this.getDataForm({ id_section: this.selectedId }))
            .then((res) => {
              this.content = res.data.ips;
            });
        }
      },

      updateIpState(IP) {
        const form = `data=${JSON.stringify(IP)}&extra_info=${JSON.stringify({
          module: 'ip'
        })}`;
        this.send('axiosupdate', form)
          .then((res) => {
            displayMessage(res.data.mensaje);
          });
      },

      send(endpoint, data) {
        return axios.post(`${BASE_URL}process/${endpoint}`, data);
      },

      getSectionList() {
        utils.heavyLoad(true);
        this.$http.get('section/get_sections/list')
          .then((res) => {
            this.sections = res.data.sections;
            utils.heavyLoad(false);
          });
      }
    },
    computed: {
      reportUrl() {
        return `${baseURL}process/getreport/secciones/${this.selectedId}`;
      },
      cols() {
        return [
          {
            field: 'num',
            title: 'No.',
            valign: 'middle',
            align: 'center',
            sortable: 'true'
          },
          {
            checkbox: true,
            field: 'checkbox',
            title: '',
            valign: 'middle',
            align: 'center',
            class: 'hide'
          },
          {
            field: 'sector',
            title: 'Sector',
            valign: 'middle',
            align: 'center',
            class: 'hide'
          },
          {
            field: 'codigo',
            title: 'Codigo',
            valign: 'middle',
            align: 'center',
            class: 'hide'
          },
          {
            field: 'ip',
            title: 'Direccion IP',
            valign: 'middle',
            align: 'center'
          },
          {
            field: 'estado',
            title: 'Estado',
            valign: 'middle',
            align: 'center'
          },
          {
            field: 'acciones',
            title: 'Acciones',
            valign: 'middle',
            align: 'center'
          },
        ];
      }
    }
  };
</script>
