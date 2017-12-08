<template>
  <div class="company-details" id="message-settings-section">
    <h3 class="section-title"> Ajustes de Mensajes</h3>
    <form action="">
      <div class="row">

        <div class="col-md-6">
          <div class="form-group">
            <label for="company-name">Correo Electronico</label>
            <div class="input-group">
              <div class="input-group-addon">
                <i class="material-icons">email</i>
              </div>
              <input type="email" class="form-control" v-model="config.email">
            </div>
          </div>

          <div class="form-group">
            <label for="company-phrase">Codigo Pais</label>
            <div class="input-group">
              <div class="input-group-addon">
                <i class="material-icons">settings_phone</i>
              </div>
              <select name="" class="form-control" v-model="config.country_id">
                <option value="1">RD (+1)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="company-phone1">ID Telefono</label>
            <div class="input-group">
              <div class="input-group-addon">
                <i class="material-icons">phone</i>
              </div>
              <input type="number" class="form-control" v-model="config.device_id">
            </div>
          </div>
        </div>

        <div class="col-md-6">

          <div class="form-group">
            <label for="company-name">Contraseña</label>
            <div class="input-group">
              <div class="input-group-addon">
                <i class="material-icons">lock_outline</i>
              </div>
              <input type="password" class="form-control" v-model="config.password">
            </div>
          </div>

          <div class="form-group">
            <label for="company-name">Margen Entre Mensajes</label>
            <div class="input-group">
              <div class="input-group-addon">
                <i class="material-icons">access_time</i>
              </div>
              <input type="number" class="form-control" v-model="config.start_at">
            </div>
          </div>

          <div class="form-group">
            <label for="company-name">Tiempo de Expiracion</label>
            <div class="input-group">
              <div class="input-group-addon">
                <i class="material-icons">access_time</i>
              </div>
              <input type="number" class="form-control" v-model="config.expires_at">
            </div>
          </div>

          <div class="right">
            <input type="submit" value="Revisar" @click.prevent.stop="saveSettings">
          </div>

        </div>
      </div>
    </form>
  </div>
</template>

<script>
  const configMessage = {
    email: '',
    password: '',
    device_id: '',
    country_code: '',
    send_at: '1 second',
    expires_at: '1 hour'
  }

  export default {
    data() {
      return{
        config: configMessage
      }
    },

    created() {
      this.getConfig()
    },

    methods: {
      getConfig() {
        const self = this;
        this.$http.get(`messages/get_config`)
          .then((res) => {
            if (res.data.config) {
              self.config = res.data.config
            }
          })
          .catch((error) => {
             self.$toast.error(error)
          })
      },

      saveSettings(e) {
        const self = this
        this.$http.post(`messages/save_config`, this.getDataForm(this.config))
          .then((res) => {
            self.showMessage(res.data.menssage);
          })
          .catch((err) => {
            self.$toast.error(err);
          })
      }
    }
  }

</script>
