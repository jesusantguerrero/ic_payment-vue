<template>
  <div>
    <div class="row welcome-screen" v-if="!closed">
      <div class="col-md-8 col-xs-12 main-card">
        <div class="tab-content-cierre">
          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#cuadre-primario" aria-controls="cuadre-primario" role="tab" data-toggle="tab">Cuadre Primario</a></li>
            <li role="presentation"><a href="#registro-gastos" aria-controls="registro-gastos" role="tab" data-toggle="tab">Registro de Gastos</a></li>
            <li role="presentation"><a href="#cuadre-final" aria-controls="cuadre-final" role="tab" data-toggle="tab">Cuadre Final</a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <count-panel :store="store" :total="getTotal"></count-panel>
            <expenses-panel :set-total-expenses="setTotalExpenses"></expenses-panel>

            <div role="tabpanel" class="tab-pane fade in" id="cuadre-final">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="client-job">Ingresos Totales</label>
                      <input type="number" class="form-control" v-model="totalIncomes" disabled>
                    </div>
                    <div class="form-group">
                      <label for="client-salary">Gastos Totales</label>
                      <input type="number" class="form-control password" v-model="closingData.total_gastos" disabled>
                    </div>
                    <div class="form-group">
                      <label for="client-job-number">Ganacia(Banco)</label>
                      <input type="number" class="form-control" v-model="closingData.banco" disabled>
                    </div>
                  </div>

                  <div class="col-md-6 t-center">
                    <h5>Fecha: <span id="fecha-cierre v-cloack"> {{ fecha }} </span></h5>
                    <h5>Autor <span id="autor-cierre"> {{ appStore.currentUser.fullname }} </span></h5>
                    <button class="btn" @click.prevent="closeCashDeskCaja"> Cerrar Caja </button>
                  </div>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>


      <div class="col-md-4 col-xs-12 details-card" v-if="!closed">
        <div class="layout-container">
          <div class="day-income-layer">
            <h3 class="card-title" data-toggle="modal" data-target="#notification-view">Ingresos en Efectivo</h3>
            <div class="list-repair centered-container">


              <a target="printframe" href="<?php echo base_url('process/getreport/payment/today') ?>">
                <h2 class="current-saldo v-cloack"> RD$ {{ closingData.pagos_efectivo | currencyFormat}}</h2>
              </a>
              <br>
              <h4 data-toggle="modal" data-target="#caja-mayor-modal" class="special-caller"><i class="material-icons">lock_open</i>Dinero Real en Caja</h4>
              <h2 class="current-saldo my-caja v-cloack"> RD$ {{ total | currencyFormat }} </h2>
            </div>
          </div>
          <div class="pagos-layer">

          </div>
          <div class="averias-layer">

          </div>
          <div class="deudores-layer">

          </div>
        </div>
      </div>

    </div>

    <div class="row home-options-container" v-if="!closed">
      <div class="col-md-8 hidden-xs shortcuts-container">

        <div class="col-md-4 shortcut" id="caller-new-client" data-toggle="popover" data-container="body" data-placement="right" title="Pagos de Factura" data-content="Los pagos de mensualidad que hacen los clientes">
          <p class="section-title">Pagos de factura</p>
          <p class="v-cloack">RD$ {{closingData.pagos_facturas | currencyFormat}}</p>
        </div>

        <div class="col-md-4 shortcut" data-toggle="popover" data-container="body" data-placement="right" title="Pagos Extras" data-content="Los pagos a los servicios extras que hacen los clientes">
          <p class="section-title">Pagos Extras</p>
          <p class="v-cloack">RD$ {{closingData.pagos_extras | currencyFormat}}</p>
        </div>

        <div class="col-md-4 shortcut" data-toggle="popover" data-container="body" data-placement="right" title="Pagos Via Banco" data-content="Los pagos del <b>total de ingresos</b> que se hacen via banco">
          <p class="section-title">Pagos Via Banco</p>
          <p class="v-cloack">RD$ {{ closingData.pagos_banco | currencyFormat}}</p>
        </div>

        <div class="col-md-4 shortcut" id="caller-new-client" data-toggle="popover" data-container="body" data-placement="right"
          title="Total de Ingresos" data-content="Es la suma de los <b>pagos extras</b> y <b>pagos de factura</b>">
          <p class="section-title">Total Ingresos</p>
          <p class="v-cloack">RD$ {{ totalIncomes | currencyFormat}}</p>
        </div>

      </div>

      <div class="col-md-4 clock-card">
        <h4 class="card-title t-center">Diferencia</h4>
        <h4 class="t-center v-cloack"> RD$ {{ closingData.total_descuadre }} </h4>
      </div>

    </div>

    <closing-summary v-if="closed" :app-store="appStore" :cierre="closingData"></closing-summary>
  </div>
</template>


<script>
  import utils from './../sharedComponents/utils';
  import ClosingSummary from './components/ClosingSummary.vue';
  import ExpensesPanel from './components/ExpensesPanel.vue';
  import CountPanel from './components/CountPanel.vue';
  import CashDeskStore from './store/CashDeskStore';

  const store = new CashDeskStore();

  export default {
    name: 'cash-desk-section',
    components: {
      ClosingSummary,
      ExpensesPanel,
      CountPanel
    },

    props: {
      appStore: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        closed: false,
        fecha: utils.now(),
        closingData: {
          autor: `${appStore.currentUser.name} ${appStore.currentUser.lastname}`,
          pagos_facturas: 0,
          pagos_extras: 0,
          pagos_efectivo: 0,
          pagos_banco: 0,
          total_ingresos: 0,
          efectivo_caja: 0,
          total_descuadre: 0,
          total_gastos: 0,
          banco: 0
        },
        store,
        sum: 0
      };
    },

    mounted() {
      this.setIngresos();
    },

    created() {
      $('.v-cloack').css({
        visibility: 'visible'
      });
    },

    methods: {
      setIngresos() {
        const { closingData } = this;
        const form = {
          fecha: utils.now()
        };

        this.$http.post(`${baseURL}caja/get_ingresos`, this.getDataForm(form))
          .then((res) => {
            const { data } = res;
            closingData.pagos_facturas = data.pagos_facturas;
            closingData.pagos_extras = data.pagos_extras;
            closingData.pagos_efectivo = data.pagos_efectivo;
            closingData.pagos_banco = data.pagos_banco;
            closingData.total_ingresos = parseFloat(data.pagos_efectivo) + parseFloat(self.pagos_banco);
            closingData.total_descuadre = -self.pagos_efectivo + self.efectivo_caja;
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      },

      setTotalExpenses(totalGastos) {
        this.closingData.total_gastos = totalGastos;
      },

      closeCashDeskCaja() {
        const { closingData } = this;
        if (closingData.total_descuadre !== 0) {
          this.deleteConfirmation('Está Seguro?', 'Hay un descuadre en la caja, quiere hacer el cierre de todos modos?')
            .then((result) => {
              if (result.value) {
                this.close(this.closingData);
              }
            });
        } else {
          this.close(this.closingData);
        }
      },

      close(closingData) {
        closingData.fecha = utils.now();
        this.$http.post('caja/add_cierre', this.getDataForm(closingData))
          .then((res) => {
            this.showMessage(res.data.message);
            this.closed = true;
            $('.top-nav').addClass('hide');
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      }
    },

    computed: {
      getTotal() {
        const closing = this.closingData;
        this.total = utils.sum(store.currency);
        closing.efectivo_caja = this.total.toFixed(2);
        closing.total_descuadre = parseFloat(-closing.pagos_efectivo) + parseFloat(closing.efectivo_caja);
        closing.banco = (parseFloat(closing.pagos_banco) + parseFloat(closing.pagos_efectivo)) - (parseFloat(closing.total_gastos) - parseFloat(closing.total_descuadre));
        return this.total;
      },

      decimals() {
        const fields = ['pagos_facturas', 'pagos_extra', 'pagos_efectivo', 'pagos_banco', 'total_ingresos', 'efectivo_caja', 'total_descuadre', 'total_gasto', 'banco'];
        fields.forEach((field) => {
          this.closingData[field] = this.closingData[field].toFixed(2);
        }, this);
      },

      totalIncomes() {
        const close = this.closingData;
        const totalIncomes = utils.sum([close.pagos_banco, close.pagos_efectivo]);
        this.closingData.total_ingresos = totalIncomes;
        return totalIncomes;
      }
    }
};

</script>
