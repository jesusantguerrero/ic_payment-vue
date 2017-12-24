<template lang="pug">
  .wrapper
    .left-navigation.col-md-2
      .aside-nav-container
        .left-navigation__header
          h3.left-navigation__header-text {{ title }}
        ul.aside-nav
          li.aside-buttons
            a(href="" id="make-payment",data-toggle="modal", data-target="#router-modal")
              i.material-icons add
              | Agregar Seccion

    .main-content.col-md-10
      #extra-table-container
        .searcher-container.main-toolbar#extra-toolbar
          .input-group.search
            .input-group-addon: i.material-icons search
            input.form-control.searcher(type="text" placeholder="Buscar",v-model="search.text")
          .pull-right
            a.btn.icon.print-table(target="_blank", :href="reportUrl"): i.material-icons print
          .pull-right
            select#select-sector.btn.btn-primary(v-model="selectedId", @change="getIps")
              option(:value="section.id", v-for="section of sections") {{ section.text }}
          .pull-right
            select#client-filter.form-group.filter.btn.btn-primary
              option(:value="option.key", v-for="option of options") {{ option.text }}
        DataTable(ids="extra-table", :parentId="parentId", :data="content", :cols="cols", :toolbar="toolbar", :options="tableOptions")
        RouterModal(:sector="sector", :modal-mode="modalMode", @save="save")
</template>

<script>
  import RouterModal from './components/RouterModal.vue';
  import DataTable from './../sharedComponents/DataTable.vue';
  import utils from './../sharedComponents/utils';
  import Progress from './../sharedComponents/Progress';

  const heavyLoad = new Progress('heavy');

  export default {
    components: {
      DataTable,
      RouterModal
    },
    mounted() {
      this.getSectionList();
      utils.spyLeftNavigation();
    },
    data() {
      return {
        title: 'Secciones',
        parentId: '#extra-table-container',
        toolbar: '#extra-toolbar',
        content: '',
        selectedId: '',
        modalMode: 'add',
        options: [
          { key: 'todo', text: 'Todos' },
          { key: 'ocupado', text: 'Ocupadas' },
          { key: 'disponible', text: 'Disponibles' },
          { key: 'sectorial', text: 'Sectoriales' }
        ],
        sections: [],
        sector: {
          nombre: '',
          codigo_area: ''
        },
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
      save() {
        const empty = utils.isEmpty(this.sector);
        if (!empty) {
          heavyLoad.play();
          this.$http.post(`section/${this.modalMode}`, this.getDataForm(this.sector))
            .then((res) => {
              this.showMessage(res.data.message);
              if (res.data.message.type === 'success') {
                this.sectorEmpty();
                $('#router-modal').modal('hide');
              }
              heavyLoad.stop();
              this.getIps();
              window.appBus.$emit('transaction');
              if (this.modalMode === 'edit') {
                $('#router-modal').modal('hide');
              }
            })
            .catch((err) => {
              heavyLoad.stop();
              this.$toasted.error(err);
            });
        } else {
          this.$toasted.error('Revise y LLene todos los campos por favor');
        }
      },

      getIps() {
        heavyLoad.play();
        if (this.selectedId) {
          this.$http.post('section/get_ips', this.getDataForm({ id_section: this.selectedId }))
            .then((res) => {
              heavyLoad.stop();
              heavyLoad.stop();
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

      sectorEmpty() {
        this.sectorEmpty = {
          nombre: '',
          codigo_area: ''
        };
      },

      getSectionList() {
        heavyLoad.play();
        this.$http.get('section/get_sections/list')
          .then((res) => {
            this.sections = res.data.sections;
            this.selectedId = this.sections[0].id;
            this.getIps();
            heavyLoad.stop();
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
