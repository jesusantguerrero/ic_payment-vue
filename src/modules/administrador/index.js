import Vue from 'vue';
import axios from 'axios';
import Toasted from 'vue-toasted';
import jQuery from 'jquery';
import adminSection from './adminSection.vue';

window.$ = jQuery;
window.jQuery = jQuery;
window.baseURL = 'https://localhost/icpayment/';


const options = {
  theme: 'primary',
  position: 'top-right',
  duration: 5000
};

Vue.use(Toasted, options);

Vue.mixin({
  methods: {
    showMessage(message) {
      this.$toasted[message.type](message.text);
    },

    getDataForm(object) {
      return `data=${JSON.stringify(object)}`;
    }
  }
});

const $http = axios.create({
  baseURL
});

Vue.prototype.$http = $http;


export default new Vue({
  el: '#administrador',
  components: {
    adminSection
  }
});
