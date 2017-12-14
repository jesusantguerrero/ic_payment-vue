import Vue from 'vue';
import axios from 'axios';
import Toasted from 'vue-toasted';
import globals from './../sharedComponents/globals';
import utils from './../sharedComponents/utils';
import PettyCashModal from './components/PettyCashModal.vue';
import MessageModal from './components/MessageModal.vue';
import TicketModal from './components/TicketModal.vue';
import Store from './store/index';

const store = new Store();
globals(Vue, Toasted, axios);

export default new Vue({
  el: '#app',
  components: {
    'message-modal': MessageModal,
    'petty-cash-modal': PettyCashModal,
    'ticket-modal': TicketModal
  },

  data: {
    store,
    pettyCashMode: 'retire'
  },

  methods: {
    openPettyCash(mode) {
      this.pettyCashMode = mode;
    },

    addMoney() {
      const empty = utils.isEmpty(this.store.moneyMovement);
      if (!empty) {
        this.send('petty_cash/add_money', form)
          .then((res) => {
            this.showMessage(res.data.message);
            this.store.moneyMovementEmpty();
            this.getSaldo();
          });
      } else {
        this.$toasted.error('Revise y LLene todos los campos por favor');
      }
    },

    retireMoney() {
      const empty = utils.isEmpty(this.store.moneyMovement);
      if (!empty) {
        this.$http.post('petty_cash/retire_money', this.getDataForm(this.store.moneyMovement))
          .then((res) => {
            this.showMessage(res.data.message);
            this.store.moneyMovementEmpty();
            this.getSaldo();
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
