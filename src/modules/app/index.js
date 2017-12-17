import Vue from 'vue';
import axios from 'axios';
import Toasted from 'vue-toasted';
import globals from './../sharedComponents/globals';
import utils from './../sharedComponents/utils';
import PettyCashModal from './components/PettyCashModal.vue';
import MessageModal from './components/MessageModal.vue';
import TicketModal from './components/TicketModal.vue';
import Store from './store/index';

// Vue.component('admin-section', () => import('./../administrador/adminSection.vue'));

window.appStore = new Store();
window.appBus = new Vue();

globals(Vue, Toasted, axios);

export default new Vue({
  el: '#app',
  components: {
    'message-modal': MessageModal,
    'petty-cash-modal': PettyCashModal,
    'ticket-modal': TicketModal
  },

  data: {
    store: window.appStore
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
            this.store.pettyCashTransactionEmpty();
            this.getSaldo();
            window.appBus.$emit('transaction');
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
  }
});
