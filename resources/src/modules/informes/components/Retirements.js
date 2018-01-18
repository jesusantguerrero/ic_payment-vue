export default {
  data() {
    return {
      table: '',
      tableHTML: '',
      between: {
        first_date: '',
        second_date: ''
      }
    }
  },
  mounted: function () {
    if (currentPage == 'notificaciones') {
      this.getReport();
    }
  },

  methods: {
    getReport() {
      var self = this;
      var form = 'data=' + JSON.stringify(this.between)
      axios.post(BASE_URL + 'contract/getCancelations/', form)
        .then(function (res) {
          self.fillTable(res.data.content)
        })
    },

    fillTable(content) {
      var $table = $('#cancelation-table')
      $table.bootstrapTable('destroy');
      $table.find('tbody').html(content);
      $table.bootstrapTable();
      $table.find('tbody').css({
        display: "table-row-group"
      });
    }
  }
}
