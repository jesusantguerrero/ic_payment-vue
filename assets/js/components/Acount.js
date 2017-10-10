  var acountView = new Vue({
    el: '#acount-section',
    data: {
      user: {
        user_id: '',
        nickname: '',
        name: '',
        lastname: '',
        dni: '',
        type: '',
        'email': ''
      },
      isChangePassword: false,
      currentPassword: '',
      newPassword: '',
      passwordConfirm: '',
      states: {
        'has-error': false,
        'has-succes': false,
        button: true,
      }

    },

    mounted: function () {
      this.getUser();
    },

    methods: {
      getUser: function () {
        var self = this;
        var user_id = $('#acount-user-id').val();
        var form = 'data=' + JSON.stringify({
          user_id: user_id
        });

        axios.post(BASE_URL + 'user/get_user', form)
          .then(function (res) {
            var user = res.data.user;
            user['fullname'] = user.name + ' ' + user.lastname;
            self.user = user;
          })
      },

      updateInfo: function () {
        if (this.isChangePassword) {
          this.changePassword()
        } else {
          this.changeEmail()
        }
      },

      changePassword: function () {
        if (this.states['has-succes']) {
          var form = 'data=' + JSON.stringify({
            user_id: this.user.user_id,
            current_password: this.currentPassword,
            new_password: this.newPassword
          });

          axios.post(BASE_URL + 'user/change_password', form)
            .then(function (res) {
              displayMessage(res.data.message);
            })
        } else {
          displayMessage("Las contraseñas no conciden")
        }
      },

      changeEmail: function () {
        var self = this
        swal({
            'title': 'Contraseña',
            'input': 'password',
            preConfirm: function (password) {
              return self.confirmPasswordServer(password)
            }
          })
          .then(function (is_correct) {
            if (is_correct === true) {
              self.updateEmail()
            } else {
              displayMessage(MESSAGE_ERROR + ' Error');
            }
          })
      },

      confirmPasswordServer: function (password) {
        var form = 'data=' + JSON.stringify({
          user_id: this.user.user_id,
          current_password: password
        });

        return new Promise(function (resolve, reject) {
          axios.post(BASE_URL + 'user/confirm_password', form)
            .then(function (res) {
              resolve(res.data.is_correct);
            })
        })
      },

      confirmPassword: function () {
        var self = this;
        this.confirmPasswordServer(this.currentPassword)
          .then(function (res) {
            self.isChangePassword = res.data.is_correct
          })
      },

      checkPassword: function () {
        if ((this.newPassword == this.passwordConfirm) && this.changePassword) {
          this.setStates(true, false);
          this.states.button = true;
        } else if (this.changePassword) {
          this.setStates(false, true);
          this.states.button = false;
        } else {
          this.setStates(false, false);
        }
      },

      setStates: function (success, error) {
        this.states['has-success'] = success;
        this.states['has-error'] = error;
      },
    },

  })