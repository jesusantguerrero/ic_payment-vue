import Vue from 'vue';
import axios from 'axios';
import Toasted from 'vue-toasted';
import globals from './../sharedComponents/globals';
import adminSection from './adminSection.vue';

globals(Vue, Toasted, axios);

export default new Vue({
  el: '#administrador',
  components: {
    'admin-section': adminSection
  }
});
