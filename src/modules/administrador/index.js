import Vue from 'vue';
import adminSection from './adminSection.vue';
import Toasted from 'vue-toasted';

const options = {
  theme: "primary",
  position: "top-right",
  duration : 5000
}

Vue.use(Toasted, options);

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
