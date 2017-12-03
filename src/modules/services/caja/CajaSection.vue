<template>
  <div class="company-details" id="caja-section">
    <h3 class="section-title"> Caja Chica -
      <small> saldo actual:
        <span class="current-saldo"></span>
      </small>
    </h3>

    <div class="searcher-container main-toolbar" id="caja-toolbar">
      <div class="input-group search">
        <div class="input-group-addon">
          <i class="material-icons">search</i>
        </div>
        <input type="text" class="form-control searcher" placeholder=" descripcion">
      </div>
      <div class="input-group search">
        <div class="input-group-addon">
          <i class="material-icons">person_pin</i>
        </div>
        <select name="" class="form-control" v-model="searchOptions.user">
          {{ userList }}
        </select>
      </div>
      <div class="input-group search">
        <div class="input-group-addon">
          <i class="material-icons">event</i>
        </div>
        <input type="date" class="form-control caja-for-date" v-model="searchOptions.firstDate" placeholder="Fecha">
      </div>
      <div class="pull-right">
        <button class="btn btn-primary icon" data-toggle="modal" data-target="#retire-money-modal">
          <i class="material-icons">remove</i>
        </button>
      </div>
      <div class="pull-right">
        <button class="btn btn-primary icon" data-toggle="modal" data-target="#add-money-modal">
          <i class="material-icons mi__single">add</i>
        </button>
      </div>
    </div>

    <table class="table t-users" id="caja" data-sort-name="order" data-minimum-count-columns="2" data-show-pagination-switch="false"
      data-search="true" data-toolbar="#caja-toolbar" data-pagination="true" data-unique-id="id" data-page-size="5"
      data-page-list="[5,10,50, 100]" data-show-footer="false" data-striped="false">
      <thead>
        <tr>
          <th data-field="id" class="hide">COD</th>
          <th data-field="fecha">Fecha</th>
          <th data-field="descripcion">Descripcion</th>
          <th data-field="ingreso">Ingreso</th>
          <th data-field="salida">Salida</th>
          <th data-field="saldo">Saldo de Caja</th>
          <th data-field="autor">Hecha Por</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>

</template>


<script>
  import handler from './handlers';
  import cajaTable from './cajaTable';

  export default {
    data() {
      return {
        cajaTable: cajaTable,
        searchOptions: {
          firstDate: '',
          secondDate: '',
          user: '',
        },
        userList: ''
      }
    },

    mounted() {
      this.cajaTable = cajaTable;
      if (currentPage === 'administrador') {
        this.cajaTable.init();
        this.getAll();
      }
      handler(this);
    },

    methods: {
      getAll() {
        const self = this;
        const form = 'tabla=caja';
        this.send('getAll', form)
          .then((res) => {
            self.cajaTable.refresh(res.data);
            self.getSaldo();
          });
      },

      getSaldo() {
        const form = 'tabla=caja';
        this.send('getone', form)
          .then((res) => {
            updateSaldo(res.data);
          });
      },

      search() {
        const self = this;
        const form = `tabla=caja&id_empleado=${searchOptions.user}&fecha=${searchOptions.firstDate}`;
        this.send('search', form)
          .then((res) => {
            self.cajaTable.refresh(res.data);
          });
      },

      send(endpoint, data) {
        return axios.post(`${BASE_URL}process/${endpoint}`, data);
      },

      add() {
        const self = this;
        const amount = $('#caja-a-amount').val();
        const description = $('#caja-a-description').val();
        const form = `entrada=${amount}&descripcion=${description}&tabla=caja`;
        const empty = isEmpty([amount, description]);

        if (!empty) {
          this.send('add', form)
            .then((res) => {
              displayMessage(res.data);
              self.getAll();
            });
        } else {
          displayAlert('Revise', 'LLene todos los campos por favor', 'error');
        }
      },

      retire() {
        const self = this;
        const amount = $('#caja-r-amount').val();
        const description = $('#caja-r-description').val();
        const form = `salida=${amount}&descripcion=${description}`;
        const empty = isEmpty([amount, description]);

        if (!empty) {
          this.send('retire', form)
            .then((res) => {
              displayMessage(res.data);
              console.log(self);
              self.gatAll();
            });
        } else {
          displayAlert('Revise', 'LLene todos los campos por favor', 'error');
        }
      },
    }
  }

</script>
