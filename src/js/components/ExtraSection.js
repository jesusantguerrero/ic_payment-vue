var extraSection = new Vue({
  el: '#extra-section',
  data: {
    content: '',
    search: {
      text: '',
      state: 'activo'
    },
    totales: {
      pagado: 0,
      pendiente: 0,
      total_vendido: 0
    },
    tableId: '#extra-table-full'
  },
  mounted: function () {
    if (currentPage == 'extras') {
      this.getData();
    }
  },

  filters: {
    currencyFormat: function(number){
      return "RD$ "+ CurrencyFormat(number);
    },
  },
  
  methods: {
    filter: function(e) {
      filterBSTable(this.tableId,this.filterValue);
    },
    
    getData: function () {
      var self = this;
      var form = 'data=' + JSON.stringify(this.search)
      axios.post(BASE_URL + 'extra/get_all',form)
      .then(function (res) {
        self.fillTable(res.data.content);
        self.totales = res.data.totales;
      })
    },

    fillTable: function (content) {
      fillBSTable('#extra-table-full', content)
    }
  }
});
