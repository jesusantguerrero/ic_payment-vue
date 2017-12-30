<template lang="pug">
  .wrapper
    .left-navigation.col-md-2
      .aside-nav-container
        .left-navigation__header
          h3.left-navigation__header-text {{ title }}
        ul.aside-nav
          li.aside-buttons
            a(href="#" data-toggle="modal", data-target="#search-client-modal")
              i.material-icons description
              | Nuevo Contrato
          li.aside-buttons
            a(href="#" id="update-contract", data-toggle="modal", @click.prevent="getContract")
              i.material-icons edit
              | Editar Contrato
          li.aside-buttons
            a(href="" id="cancel-contract", @click.prevent="cancelContract")
              i.material-icons delete
              | Cancelar Contrato
          li.aside-buttons
            a(href="" id="suspend-contract", @click.prevent="suspendContract")
              i.material-icons report_problem
              | Suspender Contrato
          li.aside-buttons
            a(href="" id="get-details", @click.prevent="sendTo('details')")
              i.material-icons monetization_on
              | Registrar Pago
          li.aside-buttons
            a(href="" id="contract-extra", @click.prevent="sendTo('new_contract')")
              i.material-icons more
              | Extras

    .main-content.col-md-10
      #contract-table-container
        .searcher-container.main-toolbar#contract-toolbar
          .input-group.search
            .input-group-addon: i.material-icons search
            input.form-control.searcher(type="text" placeholder="Buscar contrato")
          .pull-right
            a.btn.icon.print-table(target="_blank" href="#"): i.material-icons print
          .pull-right
            select#contract-filter.form-group.filter.btn.btn-primary
              option(:value="option.key", v-for="option of options") {{ option.text }}
        DataTable(ids="contract-table", :parentId="parentId", :data="contracts", :cols="cols", :toolbar="toolbar", :options="tableOptions", @check-uncheck="listen", @cell-clicked="stateChanges")
    ContractModal(:store="store", :contract="store.contract", :modal-mode="store.contractMode" @save="getContracts")

</template>

<script>
  import swal from 'sweetalert2';
  import DataTable from './../sharedComponents/DataTable.vue';
  import utils from './../sharedComponents/utils';
  import ContractModal from './components/ContractModal.vue';
  import ContractStore from './store/contractStore';

  export default {
    components: {
      DataTable,
      ContractModal
    },

    mounted() {
      this.getContracts();
      utils.spyLeftNavigation();
    },

    data() {
      const store = new ContractStore();
      return {
        store,
        title: 'Contratos',
        parentId: '#contract-table-container',
        toolbar: '#contract-toolbar',
        contracts: '',
        tableOptions: {
          pageSize: 200,
          pageList: [50, 100, 200, 500, 1000],
          states: ['activo', 'saldado', 'suspendido', 'cancelado'],
          stateField: 'estado'
        },
        selectedContract: null,
        options: [
          { key: 'activo', text: 'Activos' },
          { key: 'saldado', text: 'Saldados' },
          { key: 'suspendido', text: 'Suspendidos' },
          { key: 'cancelado', text: 'Cancelados' },
        ]
      };
    },

    computed: {
      cols() {
        return this.store.columns;
      }
    },

    methods: {
      getContracts() {
        this.$http.post('contract/get_contracts')
          .then((res) => {
            this.contracts = res.data.contracts;
          });
      },

      getContract() {
        const contract = this.selectedContract;
        if (contract) {
          this.$http.post('contract/get_contract', this.getDataForm({ id: contract.id }))
            .then((res) => {
              this.store.setContract(res.data.contract);
              this.store.setContractMode('update');
              $('#contract-modal').modal();
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        } else {
          this.$toasted.info('seleccione un contrato primero');
        }
      },

      listen(name, row) {
        this.selectedContract = row;
      },

      cancelContract() {
        const self = this;

        function sendCancel(id) {
          self.$http.post('contract/cancel', self.getDataForm({ id }))
            .then((res) => {
              self.showMessage(res.data.message);
              if (res.data.message.type === 'success') {
                self.selectedContract = null;
              }
              self.getContracts();
            });
        }
        if (this.selectedcontract) {
          const contract = this.selectedContract;
          swal({
            title: 'Cancelar Contrato',
            text: `¿Está seguro de querer cancelar el contrato a ${contract.cliente}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
              sendCancel(contract.id);
            }
          });
        } else {
          this.$toasted.info('seleccione un contrato primero');
        }
      },

      sendTo(endpoint, param) {
        const contract = this.selectedContract;
        if (contract) {
          window.location.href = `${baseURL}/app/${endpoint}/${contract.id}/${param}`;
        } else {
          this.$toasted.info('seleccione un contrato primero');
        }
      },

      suspend(id, state) {
        const form = {
          id,
          row: 'estado',
          value: state
        };
        this.$http.post('contract/suspend', this.getDataForm(form))
          .then((res) => {
            this.getcontracts();
            this.showMessage(res.data.message);
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      },
    }
  };
</script>

