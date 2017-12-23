import Vue from 'vue';
import axios from 'axios';
import Toasted from 'vue-toasted';
import globals from './../sharedComponents/globals';
import utils from './../sharedComponents/utils';
import PettyCashModal from './components/PettyCashModal.vue';
import MessageModal from './components/MessageModal.vue';
import TicketModal from './components/TicketModal.vue';
import Store from './store/appStore';

window.jQuery = $;
/* eslint-disable import/first */
import 'bootstrap';

window.appStore = new Store();
window.appBus = new Vue();

globals(Vue, Toasted, axios);

Vue.component(
  /* webpackChunkName: "home" */ 'HomeSection',
  (resolve) => { require(['./../home/HomeSection'], resolve); }
);

Vue.component(
  /* webpackChunkName: "administrador" */ 'AdminSection',
  (resolve) => { require(['./../administrador/adminSection'], resolve); }
);

Vue.component(
  /* webpackChunkName: "cuenta" */ 'AcountSection',
  (resolve) => { require(['./../cuenta/AcountSection'], resolve); }
);

Vue.component(
  /* webpackChunkName: "cierre */ 'CashDeskSection',
  (resolve) => { require(['./../cierre/CashDeskSection'], resolve); }
);

Vue.component(
  /* webpackChunkName: "cliente" */ 'ClientSection',
  (resolve) => { require(['./../clientes/ClientSection'], resolve); }
);

Vue.component(
  /* webpackChunkName: "extras */ 'ExtraSection',
  (resolve) => { require(['./../extras/ExtraSection'], resolve); }
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
      const self = this;
      this.$http.get('company/get')
        .then((res) => {
          self.store.setCompany(res.data);
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
