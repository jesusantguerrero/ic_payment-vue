if (isCurrentPage("informes")) {
  (function(){
    var expensesReport = new Vue({
      el: '#gastos',
      data: {
       table: '',
       tableHTML: '',
       total: '',
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
          axios.post(BASE_URL + 'caja/get_gastos/true', form)
          .then(function (res) {
            self.fillTable(res.data.content)
            self.total = res.data.acum;
          })
        },
    
        fillTable: function(content) {
          fillBSTable('#gastos-table', content);
        }
      }
    })
  })()
}
