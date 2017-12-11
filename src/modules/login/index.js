import Vue from 'vue';
import axios from 'axios';
import Toasted from 'vue-toasted';
import globals from './../sharedComponents/globals';
import Service from './service/loginService';
import { isEmpty } from './../sharedComponents/utils';

globals(Vue, Toasted, axios);

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
    this.service = new Service();
    this.quitSplash();
  },

  methods: {
    login() {
      if (!isEmpty([this.credentials.user, this.credentials.password])) {
        this.doLogin();
      } else {
        this.$toasted.error('LLene todos los campos indicados para ingresar');
      }
    },

    doLogin() {
      const self = this;
      this.service.doLogin(this.credentials)
        .then((res) => {
          if (res.data.is_correct) {
            window.location.href = `${baseURL}app/admin/`;
          } else {
            self.$toasted.info('Usuario y Contraseña no validos');
          }
        })
        .catch((err) => {
          self.$toasted.error(err);
        });
    },

    sendResetEmail() {
      const self = this;
      this.service.emailResetPassword()
        .then((res) => {
          self.showMessage(res.data.message);
        })
        .catch((err) => {
          self.$toasted.error(err);
        });
    },

    resetPassword() {
      const self = this;
      this.service.resetPassword()
        .then((res) => {
          self.showMessage(res.data.message);
        })
        .catch((err) => {
          self.$toasted.error(err);
        });
    },

    quitSplash() {
      setTimeout(() => {
        document.querySelector('.splash-screen').classList.add('hidden');
      }, 1200);
      setTimeout(() => {
        document.querySelector('.splash-screen').classList.add('hide');
      }, 1201);
    }
  }
});
