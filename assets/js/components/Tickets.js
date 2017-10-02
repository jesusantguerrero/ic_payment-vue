$(function () {

  var ticketListView = new Vue({
    el: '#averias-list-view',
    data: {
      dataSearch: {
        text: '',
        state: 'por reparar',
      },
      tickets: [],
      hide: false
    },

    mounted: function () {
      this.itemClickListener();
      var self = this
      busAveria.$on('tickets-listed', function () {
        self.itemClickListener()
      });
    },

    methods: {
      search: function () {
        var form = 'data=' + JSON.stringify(this.dataSearch);
        var send = axios.post(BASE_URL + 'api/averias/search', form);

        send.then(function (res) {
          this.fillAveriasList(res.data);
        })
        send.catch(function () {
          console.error(res.data.mensaje);
        })

      },

      fillAveriasList: function ($content) {
        $('#averia-item-list').html($content);
        ticketListView.itemClickListener();
      },

      itemClickListener: function () {
        $('.averia-item').on('click', function () {
          var id_averia = $(this).find('.code').text().trim();
          ticketView.getTicket(id_averia);
        })
      }
    }

  })

  var emptyTicket = {
    "id_averia": "",
    "id_cliente": "",
    "cliente": "",
    "direccion": "",
    "descripcion": "",
    "celular": "",
    "fecha": "",
    "estado": "",
    "fecha_reparacion": "",
    "codigo": '',
  }
  var ticketView = new Vue({
    el: '#ticket-view',

    data: {
      classes: {
        hide: true
      },
      comments: [],
      ticket: emptyTicket
    },

    mounted: function () {},

    methods: {
      getTicket: function (id_averia) {
        var form = 'data=' + JSON.stringify({
          id_averia: id_averia
        })
        var send = axios.post(BASE_URL + 'api/averias/get_averia', form);

        send.then(function (res) {
          var data = res.data;
          $('#ticket-view').removeClass('invisible');
          ticketView.classes.hide = false;
          ticketListView.hide = true;
          ticketView.ticket = data.ticket;
          ticketView.comments = data.comments;
        })
      },

      quit: function () {
        this.ticket = null;
        this.comments = null;
        this.hide = true;
        ticketListView.hide = false;
      },

      print: function () {
        print();
      },

      addComment: function () {

      },

      deleteComment: function () {

      },

      editComment: function () {

      },

      editTicket: function () {

      },

      deleteTicket: function () {
        console.info('deleted');
      }
    }
  })

})()