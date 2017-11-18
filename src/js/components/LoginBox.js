var sessionForm = new Vue({
  el: '.login-box',
  data: {
    credentials: {
      user: '',
      password: '',
      csrf_token_name: ''
    },
    email: ''
  },

  methods: {
    login: function () {
      if (!isEmpty([this.credentials.user, this.credentials.password])) {
        this.doLogin()
      } else {
        displayMessage(MESSAGE_ERROR + " LLene todos los campos indicados para ingresar")
      }
    },

    doLogin() {
      const form = `data=${JSON.stringify(this.credentials)}`
      axios.post(BASE_URL + 'app/login',form)

      .then(function(res){
        if (res.data == true) {
          window.location.href = BASE_URL + 'app/admin/';
        } else {
          displayMessage(MESSAGE_INFO + " Usuario y Contraseña no validos")
        }
      })

      .catch(function(err){
        console.error(err)
      })
    },

    resetPassword(){
      axios.post(BASE_URL + 'user/reset_password', {
        email: email
      })
      .then(function(res){
        displayMessage(res.data.message)
      })
      .catch(function(err){
        console.error(err)
      })
    }
  }
})
