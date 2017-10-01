var ticketListView = new Vue({
  el: '#averias-list-view',
  data: {
    dataSearch: {
      text: '',
      state: 'por reparar'
    },

    tickets: []
  },
  methods: {
    search: function () {
      var form = 'data='+ JSON.stringify(this.dataSearch);
      var send = axios.post(BASE_URL + 'api/averias/search',form);

      send.then(function (res) {
        fillAveriasList(res.data);
      })
      send.catch(function () {
        console.error(res.data.mensaje);
      })

    },
  }
})

var ticketView = new Vue({
  el: '#ticket-view',
  methods: {
    getTicket: function () {

    }
  }
})