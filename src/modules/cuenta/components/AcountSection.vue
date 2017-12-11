<template lang="pug">
    .company-details#acount-form
      h3 Detalles de la Cuenta
      form
        .row
          .col-md-6
            .form-group
              label Nombre de Usuario
              input.form-control(type="text", v-model="user.nickname" disabled = "true")

            .form-group
              label Contraseña actual
              input.form-control(type="password", v-model="currentPassword", @keypress.prevent.enter="confirmPassword")

            .form-group(:class="states", v-if="isChangePassword")
              label Nueva Contraseña
              input.form-control(type="password", v-model="newPassword", @keyup="checkPassword")

            .form-group(:class="states", v-if="isChangePassword")
              label Confirmar Nueva Contraseña
              input.form-control(type="password",v-model="passwordConfirm", @keyup="checkPassword")

            h4(v-if="!isChangePassword", class="text-primary") Para cambiar la contraseña escriba su contraseña actual y presione enter

          .col-md-6
            .form-group.hide
              label COD
              input.form-control(type="text", v-model="user.user_id", disabled = "true")

            .form-group
              label Email
              input.form-control(type="email", v-model="user.email")

            .form-group
              label Nombre
              input.form-control(type="text", v-model="user.fullname", disabled = "true")

            .form-group
              label Tipo de Cuenta
              input.form-control(type="text", v-model="user.role", disabled = "true")

            .form-group
              label Cedula(sin guiones)
              input.form-control(type="text", v-model="user.dni" disabled = "true")

            .right
              input.form-control(type="submit", value="Guardar Datos", @click.prevent="updateInfo")
</template>


<script>
  import swal from 'sweetalert2';

  export default {
    name: 'AcountSection',
    data() {
      return {
        user: {
          user_id: '',
          nickname: '',
          name: '',
          lastname: '',
          dni: '',
          type: '',
          email: ''
        },
        isChangePassword: false,
        currentPassword: '',
        newPassword: '',
        passwordConfirm: '',
        states: {
          'has-error': false,
          'has-success': false,
          button: true,
        }
      }
    },

    mounted() {
      this.getUser();
    },

    methods: {
      getUser() {
        const self = this;
        this.$http.get('user/get_user')
          .then((res) => {
            const { user } = res.data;
            user.fullname = `${user.name} ${user.lastname}`;
            self.user = user;
          });
      },

      updateInfo() {
        if (this.isChangePassword) {
          this.changePassword();
        } else {
          this.changeEmail();
        }
      },

      changePassword() {
        const self = this;
        if (this.states['has-success']) {
          const data = {
            user_id: this.user.user_id,
            current_password: this.currentPassword,
            new_password: this.newPassword
          }
          const form = `data=${JSON.stringify(data)}`;
          this.$http.post('user/update_password', form)
          .then((res) => {
            self.showMessage(res.data.message);
            window.location = `${baseURL}app/logout`;
          })
        } else {
          this.$toasted.error("Las contraseñas no conciden");
        }
      },

      changeEmail() {
        const self = this
        const user = this.user

        swal({
          title: 'Contraseña',
          input: 'password',
        })
        .then((password) => {
          const form = 'data=' + JSON.stringify({
            'user_id': user.user_id,
            'password': password,
            'field': 'email',
            'value': user.email
          });

          self.$http.post('user/update_field', form)
          .then((res) => {
            self.showMessage(res.data.message);
          })
        })
      },

      confirmPasswordServer(password) {
        const self = this;
        const form = 'data=' + JSON.stringify({
          user_id: this.user.user_id,
          current_password: password
        });

        return new Promise((resolve, reject) => {
          self.$http.post('user/confirm_password', form)
          .then((res) => {
            self.showMessage(res.data.message);
            resolve(res.data.is_correct);
          })
        })
      },

      confirmPassword() {
        const self = this;
        this.confirmPasswordServer(this.currentPassword)
        .then((isCorrect) =>{
          self.isChangePassword = isCorrect;
        })
      },

      checkPassword() {
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

      setStates(success, error) {
        this.states['has-success'] = success;
        this.states['has-error'] = error;
      },
    }
  }
</script>
