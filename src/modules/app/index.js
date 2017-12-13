import Vue from 'vue';
import axios from 'axios';
import Toasted from 'vue-toasted';
import globals from './../sharedComponents/globals';
// import PettyCashModal from './components/PettyCashModal.vue';
import MessageModal from './components/MessageModal.vue';
import TicketModal from './components/TicketModal.vue';
import Store from './store/index';

const store = new Store();
globals(Vue, Toasted, axios);

export default new Vue({
  el: '#app',
  components: {
    // 'petty-cash-modal': PettyCashModal
    'message-modal': MessageModal,
    'ticket-modal': TicketModal
  },

  data: {
    store,
    pettyCashMode: 'retire'
  },

  methods: {
    openPettyCash(mode) {
      this.pettyCashMode = mode;
      $('#petty-cash-modal').modal();
    },

    addMoney() {
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

    retireMoney() {
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

    getSaldo() {
      const form = 'tabla=caja';
      this.send('getone', form)
        .then((res) => {
          updateSaldo(res.data);
        });
    },
  }
});
