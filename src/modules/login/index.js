import Vue from 'vue';
import LoginBox from './components/LoginBox';
import Store from './store';
import Service from './service'

const login = new Vue({
  name: 'login',
  components: {
    LoginBox
  },

  data:{
    credentials: store.credentials,
    inputs: {
      login: [
        {label: 'Nombre de Usuario',  type: 'name', name: 'username'},
        {label: 'Contraseña', type: 'password', name: 'password'},
        {label: 'Correo Electronico', type: 'email', name: 'email'},
        {label: 'Token de validación', type: 'password', name: 'validation_token'}
      ],
    },

    buttons: [
      {name: 'Ingresar', action: null},
      {name: 'Enviar', action: null},
      {name: 'Agregar Contraseña', action: null},
    ]
  },

  mounted() {
    this.service = new Service('login')
    this.defineActions();
  },

  methods: {

    login() {
      if (!isEmpty([this.credentials.user, this.credentials.password])) {
        this.doLogin()
      } else {
        displayMessage(MESSAGE_ERROR + " LLene todos los campos indicados para ingresar")
      }
    },

    doLogin() {
      this.service.doLogin(this.credentials)
        .then(function (res) {
          if (res.data == true) {
            window.location.href = `${BASE_URL}'app/admin/`;
          } else {
            displayMessage(`${MESSAGE_INFO}Usuario y Contraseña no validos`);
          }
        })
        .catch(function (err) {
          console.error(err)
        })
    },

    sendResetEmail() {
      this.service.emailResetPassword()
        .then(function (res) {
          displayMessage(res.data.message)
        })
        .catch(function (err) {
          console.error(err)
        })
    },

    resetPassword() {
      this.service.resetPassword()
        .then(function (res) {
          displayMessage(res.data.message)
        })
        .catch(function (err) {
          console.error(err)
        })
    }
  }


})
