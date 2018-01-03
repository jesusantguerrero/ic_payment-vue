import utils from './utils';

export default (Vue, Toasted, axios) => {
  const options = {
    theme: 'primary',
    position: 'top-right',
    duration: 5000
  };

  Vue.use(Toasted, options);

  Vue.mixin({
    mounted() {
      window.document.onreadystatechange = () => {
        this.quitSplash();
      };
    },

    methods: {
      showMessage(message) {
        this.$toasted[message.type](message.text);
      },

      getDataForm(object) {
        return `data=${JSON.stringify(object)}`;
      },

      quitSplash() {
        const state = document.readyState;
        const splash = document.querySelector('.splash-screen');
        if (state === 'complete') {
          splash.classList.add('hide');
          document.querySelector('header').classList.remove('loading');
        }
      }
    },

    filters: {
      currencyFormat(number) {
        return utils.CurrencyFormat(number);
      }
    }
  });

  const $http = axios.create({
    baseURL
  });

  Vue.prototype.$http = $http;
};
