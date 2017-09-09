var configMessage = {
  email: '',
  password: '',
  device_id: '',
  countryCode: '',
  send_at: '',
  expires_at: ''
}

var gatewayPath = 'http://smsgateway.me/api/v3/devices/view/[id]'

var configMessagesForm = new Vue({
  el: '#message-settings-section',
  data: {
    config: configMessage
  },
  methods:{
    confirmPhone: function () {
      var config, deviceUrl, send
      config = this.config

      if(!isEmpty([config.email, config.password, config.device_id])){
        devicesUrl = gatewayPath.replace('[id]', config.device_id)
        send = axios.get(devicesUrl,{email: config.email, password: config.password})
        send.then(function (res) {
          console.log(res)
        })
        send.catch(function (err) {
          console.log(err)
        })

      }else{
        swal('Campos Requeridos','Por favor llene los campos correo electronico, contrasenia y id telefono para verificar')
      }
    },

    saveSettings: function (e) {
      console.log(e)
      this.confirmPhone()
    }
  }
})