
var configMessage = {
  email: '',
  password: '',
  device_id: '',
  country_code: '',
  send_at: '1 second',
  expires_at: '1 hour'
}

var configMessagesForm = new Vue({
  el: '#message-settings-section',
  data: {
    config: configMessage
  },
  mounted: function () {
    this.getConfig()
  },

  methods: {
    confirmPhone: function () {},

    getConfig: function () {
      var send
      var self = this;
      send = axios.get(BASE_URL + 'messages/get_config')
      send.then(function (res) {
        if(res.data.config){
          self.config = res.data.config
        }
      })
      send.catch(function (error) {
        console.log(error)
      })
    },

    saveSettings: function (e) {
      var config, form, send
      config = this.config

      form = 'data=' + JSON.stringify(config)
      send = axios.post(BASE_URL + 'messages/save_config', form)
      send.then(function (res) {
        displayMessage(res.data.mensaje)
      })
      send.catch(function (err) {
        console.log(err)
      })
    }
  }
})

var sendMessageApp = new Vue({
  el: '#send-message-modal',

  data: {
    hide_clients: true,
    hide_numbers: true,

    message_data: {
      tipo: '',
      clientes: '',
      numeros: '',
      mensaje: ''
    }
  },

  mounted: function () {
    this.initSelect2()
  },

  computed: {
    letters_count: function () {
      return this.message_data.mensaje.length
    }
  },

  methods: {
    sendMessage: function () {
      var form, send

      if (!isEmpty([this.message_data.tipo, this.message_data.mensaje])) {
        form = 'data=' + JSON.stringify(this.message_data)
        send = axios.post(BASE_URL + 'messages/send_message', form)
        send.then(function (res) {
          displayMessage(res.data.mensaje)
        })
        send.catch(function (err) {
          console.log(err)
        })

      } else {
        swal('Campos Requeridos', 'Por favor selecciones el tipo de mensaje y escriba su mensaje')
      }
    },

    initSelect2: function () {
      var self = this
      var options = {
        dropdownParent: $('#send-message-modal')
      }

      var selectMessageType = $('#message-type')
      selectMessageType.select2(options)
      var selectClientsForMessage = $('#clients-for-message').select2({
        dropdownParent: $('#send-message-modal'),
        ajax: {
          url: BASE_URL + 'messages/search_clients',
          dataType: 'json',
          delay: 250,
          data: function (params) {
            return {
              q: params.term,
              page: params.page
            }
          },

          processResults: function (data, params) {
            params.page = params.page || 1
            return {
              results: data.items,
              pagination: {
                more: (params.page * 30) < data.total_count
              }
            }
          },
          cache: true
        }
      })

      var selects = {
        clients: selectClientsForMessage,
        messageType: selectMessageType
      }
      this.selec2Liteners(selects)
    },

    selec2Liteners: function (selects) {
      var self = this
      selects.messageType.on('select2:select', function (e) {
        var select = e.params.data.element
        var attributes = select.attributes
        var tipo = e.params.data.id
        self.message_data.tipo = tipo

        if (tipo == 'otros') {
          self.hide_clients = true
          self.hide_numbers = false
        } else if (tipo == 'personalizado') {
          self.hide_numbers = true
          self.hide_clients = false
        } else {
          self.hide_clients = true
          self.hide_numbers = true
        }
      })

      selects.messageType.select2('val','mora');

      selects.clients.on('select2:select', function (e) {
        var clientes = selects.clients.select2('data')
        var items = [];
        for (var i = 0; i < clientes.length; i++) {
          items.push({
            'nombre_completo': clientes[i].text,
            'celular': clientes[i].id
          })
        }
        self.message_data.clientes = items
      })
    }
  }
})