if (isCurrentPage("informes")) {
  (function(){
    var closeReport = new Vue({
      el: '#cierres',
      data: {
       table: '',
       tableHTML: '',
       hasTotals: false,
       totals: false,
       between: {
         first_date: '',
         second_date: '',
         text: ''
       }
      },

      mounted: function () {
        if (currentPage == 'informes') {
          this.getReport();
        }
      },

      filters: {
        currencyFormat: function(number){
          return "RD$ "+ CurrencyFormat(number);
        },
      },

      methods: {
        getReport: function () {
          var self = this;
          var form = 'data=' + JSON.stringify(this.between)
          axios.post(BASE_URL + 'caja/get_cierres/true', form)
          .then(function (res) {
            self.fillTable(res.data.content);
            self.hasTotals = true;
            self.totals    = res.data.acum;
          })
        },

        fillTable: function(content) {
          fillBSTable('#cierres-table', content);
        }
      }
    })
  })()
}
