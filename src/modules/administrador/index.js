import Vue from 'vue';
import adminSection from './adminSection.vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted);

Vue.mixin({
  methods: {
    showMessage(message) {
      this.$toasted.show(message);
    },

    getDataForm(object) {
      return `data=${JSON.stringify(object)}`
    }
  }
})


export default new Vue({
  el: '#administrador',
  components: {
    adminSection
  }
});
