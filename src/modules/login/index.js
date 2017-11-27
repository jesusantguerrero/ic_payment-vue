import Vue from 'vue';
import jQuery from 'jquery';
import Service from './service/loginService';

window.$ = jQuery;
window.jQuery = jQuery;

export default new Vue({
  el: '.login-box',
  data: {
    credentials: {
      user: '',
      password: '',
      email: '',
      reset_toke: '',
      csrf_token_name: ''
    },
  },

  mounted() {
    const options = {
      endpoint: `${this.$el.dataset.endpoint}app/`
    };
    this.service = new Service(options);
  },

  methods: {
    login() {
      if (!isEmpty([this.credentials.user, this.credentials.password])) {
        this.doLogin();
      } else {
        displayMessage(`${MESSAGE_ERROR} LLene todos los campos indicados para ingresar`);
      }
    },

    doLogin() {
      this.service.doLogin(this.credentials)
        .then((res) => {
          if (res.data === true) {
            window.location.href = `${BASE_URL}'app/admin/`;
          } else {
            displayMessage(`${MESSAGE_INFO}Usuario y Contraseña no validos`);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    sendResetEmail() {
      this.service.emailResetPassword()
        .then((res) => {
          displayMessage(res.data.message);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    resetPassword() {
      this.service.resetPassword()
        .then((res) => {
          displayMessage(res.data.message);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }


});
