import Vue from 'vue';
import jquery from 'jquery';
import globals from './modules/sharedComponents/globals';
import router from './router';
import AppHeader from './components/AppHeader.vue';
import AppMessageModal from './components/AppMessageModal.vue';
import AppPettyCashModal from './components/AppPettyCashModal.vue';
import AppTicketModal from './components/AppTicketModal.vue';
import Store from './store/AppStore';
import utils from './modules/sharedComponents/utils';

window.jQuery = jquery;
window.$ = jquery;
/* eslint-disable import/first */
import 'bootstrap';

window.appStore = new Store();
window.appBus = new Vue();
globals(Vue);

export default new Vue({
  el: '#app',
  router,
  components: {
    'app-message-modal': AppMessageModal,
    'app-petty-cash-modal': AppPettyCashModal,
    'app-ticket-modal': AppTicketModal,
    'app-header': AppHeader,
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
    toggleMenu() {
      window.appBus.$emit('toggle-menu');
    },
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
              $('#app-petty-cash-modal').modal('hide');
            }
            this.getSaldo();
            window.appBus.$emit('transaction');
            if (this.store.pettyCashMode === 'edit') {
              $('#app-petty-cash-modal').modal('hide');
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
