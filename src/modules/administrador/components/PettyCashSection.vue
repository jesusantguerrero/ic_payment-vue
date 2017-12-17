<template lang="pug">
  .company-details#petty-cash-section
    h3.section-title Caja Chica - <small> saldo actual: <span class="current-saldo">RD$ {{store.pettyCashBalance | currencyFormat }}</span> </small>
    #petty-cash-container
      .searcher-container.main-toolbar#petty-cash-toolbar
        .input-group.search
          .input-group-addon: i.material-icons search
          input(type="text", placeholder=" descripcion").form-control.searcher
        .input-group.search
          .input-group-addon: i.material-icons person_pin
          select(name="" , class="form-control", v-model="searchOptions.user" v-html="userList")
        .input-group.search
          .input-group-addon: i.material-icons event
          input(type="date", class="form-control caja-for-date", v-model="searchOptions.firstDate", placeholder="Fecha")
        .pull-right
          button(class="btn btn-primary icon", data-toggle="modal", data-target="#retire-money-modal"): i.material-icons remove
        .pull-right
          button.btn.btn-primary.icon(data-toggle="modal", data-target="#add-money-modal"): i.material-icons.mi__single add
      DataTable(ids="petty-cash-table",:parentId="parentId", :data="transactions", :cols="cols", :toolbar="toolbar", :options="tableOptions")
</template>

<script>
  import swal from 'sweetalert2';
  import DataTable from './../../sharedComponents/DataTable.vue';

  const store = window.appStore;

  export default {
    components: {
      DataTable
    },
    data() {
      return {
        searchOptions: {
          firstDate: '',
          secondDate: '',
          user: '',
        },
        parentId: '#petty-cash-container',
        toolbar: '#petty-cash-toolbar',
        transactions: '',
        userList: '',
        tableOptions: {
          pageSize: 5,
          pageList: [10, 20, 50, 100, 2000]
        },
        store
      };
    },

    created() {
      const self = this;
      window.appBus.$on('transaction', () => {
        self.getTransactions();
      });
      this.getTransactions();
      this.getUserList();
    },
    methods: {
      getTransactions() {
        const self = this;
        this.$http.get('petty_cash/get_transactions')
          .then((res) => {
            self.transactions = res.data.transactions;
            self.store.setPettyCashBalance(res.data.balance);
          });
      },

      getTransaction(id) {
        this.$http.get(`petty_cash/get_trasaction/${id}`)
          .then((res) => {
            this.store.setPettyCashTransaction(res.data.transaction);
            this.store.setPettyCashMode('edit');
          })
          .catch(() => {
            this.$toasted.error('Error al obtener usuario');
          });
      },

      search() {
        const self = this;
        this.$http.post('petty_cash/search', this.getDataform(this.searchOptions))
          .then((res) => {
            self.transactions = res.data.transactions;
          });
      },

      delete(id, date) {
        const self = this;

        function sendDelete() {
          const form = { id, date };
          self.$http.post('petty_cash/delete', self.getDataForm(form))
            .then((res) => {
              self.showMessage(res.data.message);
              self.getTransactions();
            });
        }

        swal({
          title: 'Eliminar Transacción',
          text: '¿Estas seguro de querer eliminar esta transacción?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            sendDelete();
          }
        });
      },

      getUserList() {
        this.$http.get('user/get_users/dropdown')
          .then((res) => {
            this.userList = res.data;
            this.searchOptions.user = 'todos';
          });
      }
    },

    computed: {
      cols() {
        const pettyCashEvents = {
          'click .delete-transaction': (e, value, row) => {
            this.delete(row.id, row.fecha);
          },
        };

        return [
          {
            title: 'COD',
            field: 'id',
            align: 'center',
            valign:	'middle',
            sortable:	true,
            class:	'hide'
          },
          {
            title: 'Fecha',
            field: 'fecha',
            align: 'center',
            valign:	'middle',
            sortable:	true,
          },
          {
            title: 'Descripcion',
            field: 'descripcion',
            align: 'center',
            valign: 'middle',
            sortable: true
          },
          {
            title: 'Ingreso',
            field: 'ingreso',
            align: 'center',
            valign: 'middle',
            sortable: true
          },
          {
            title: 'Salida',
            field: 'salida',
            align: 'center',
            valign: 'middle',
            sortable: true
          },
          {
            title: 'Saldo',
            field: 'saldo',
            align: 'center',
            valign: 'middle',
            sortable: true
          },
          {
            title: 'Hecho Por',
            field: 'autor',
            align: 'center',
            valign: 'middle',
            sortable: false
          },
          {
            title: 'Acciones',
            field: 'acciones',
            align: 'center',
            valign: 'middle',
            sortable: false,
            events: pettyCashEvents
          }
        ];
      }
    }
  };

</script>
