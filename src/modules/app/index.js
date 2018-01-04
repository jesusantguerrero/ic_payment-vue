import Vue from 'vue';
import axios from 'axios';
import Toasted from 'vue-toasted';
import jquery from 'jquery';
import globals from './../sharedComponents/globals';
import utils from './../sharedComponents/utils';
import PettyCashModal from './components/PettyCashModal';
import MessageModal from './components/MessageModal';
import TicketModal from './components/TicketModal';
import Store from './store/AppStore';

window.jQuery = jquery;
window.$ = jquery;
/* eslint-disable import/first */
import 'bootstrap';

window.appStore = new Store();
window.appBus = new Vue();
globals(Vue, Toasted, axios);

Vue.component(
  'HomeSection',
  () => import(/* webpackChunkName: "home" */ './../home/HomeSection')
);

Vue.component(
  'AdminSection',
  () => import(/* webpackChunkName: "administrador" */'./../administrador/AdminSection')
);

Vue.component(
  'AcountSection',
  () => import(/* webpackChunkName: "cuenta" */ './../cuenta/AcountSection')
);

Vue.component(
  'CashDeskSection',
  () => import(/* webpackChunkName: "cierre */ './../cierre/CashDeskSection')
);

Vue.component(
  'ClientSection',
  () => import(/* webpackChunkName: "cliente" */ './../clientes/ClientSection')
);

Vue.component(
  'ExtraSection',
  () => import(/* webpackChunkName = "extras" */ './../extras/ExtraSection')
);

Vue.component(
  'RouterSection',
  () => import(/* webpackChunkName: "secciones" */ './../secciones/RouterSection')
);

Vue.component(
  'ServiceSection',
  () => import(/* webpackChunkFileName: "servicios" */ './../servicios/ServiceSection')
);

Vue.component(
  'ContractSection',
  () => import(/* webpackChunkName: "contratos" */ './../contratos/ContractSection')
);

Vue.component(
  'NewContractSection',
  () => import(/* webpackChunkName: "nuevo_contrato" */ './../nuevo_contrato/NewContractSection')
);

Vue.component(
  'DetailsSection',
  () => import(/* webpackChunkName: "detalles" */ './../detalles/DetailsSection')
);

Vue.component(
  'GraphicReportSection',
  () => import(/* webpackChunkName: "reportes" */ './../reportes/GraphicReportSection')
);

export default new Vue({
  el: '#app',
  components: {
    'message-modal': MessageModal,
    'petty-cash-modal': PettyCashModal,
    'ticket-modal': TicketModal,
  },

  data: {
    store: window.appStore
  },

  mounted() {
    this.getCompany();
    this.getUser();
    this.getSaldo();
    this.getDayIncome();
  },

  methods: {
    openPettyCash(mode) {
      this.store.setPettyCashMode(mode);
    },

    saveTransaction() {
      const empty = utils.isEmpty(this.store.pettyCashTransaction);
      if (!empty) {
        this.$http.post(`petty_cash/${this.store.pettyCashMode}`, this.getDataForm(this.store.pettyCashTransaction))
          .then((res) => {
            this.showMessage(res.data.message);
            if (res.data.message.type === 'success') {
              this.store.pettyCashTransactionEmpty();
              $('#petty-cash-modal').modal('hide');
            }
            this.getSaldo();
            window.appBus.$emit('transaction');
            if (this.store.pettyCashMode === 'edit') {
              $('#petty-cash-modal').modal('hide');
            }
          });
      } else {
        this.$toasted.error('Revise y LLene todos los campos por favor');
      }
    },

    getSaldo() {
      this.$http.get('petty_cash/get_balance')
        .then((res) => {
          this.store.setPettyCashBalance(res.data);
        });
    },

    getCompany() {
      this.$http.get('company/get')
        .then((res) => {
          this.store.setCompany(res.data);
        });
    },

    getDayIncome() {
      this.$http.get('report/get_day_income')
        .then((res) => {
          this.store.setDayIncome(res.data.income);
        });
    },

    getUser() {
      this.$http.get('user/get_user')
        .then((res) => {
          this.store.setUser(res.data.user);
        });
    }

  }
});
