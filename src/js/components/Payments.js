if (isCurrentPage("notificaciones")) {
  (function(){
    var paymentsReport = new Vue({
      el: '#recibos',
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
        if (currentPage == 'notificaciones') {
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
          axios.post(BASE_URL + 'payment/get_receipts/', form)
          .then(function (res) {
            self.fillTable(res.data.content)
            self.total = res.data.acum;
          })
        },
    
        fillTable: function(content) {
          var $table = $('#receipts-table')
          $table.bootstrapTable('destroy');
          $table.find('tbody').html(content);
          $table.bootstrapTable();
          $table.find('tbody').css({display:"table-row-group"});
        }
      }
    })
  })()
}
