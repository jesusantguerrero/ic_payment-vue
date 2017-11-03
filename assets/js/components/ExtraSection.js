var extraSection = new Vue({
  el: '#extra-section',
  data: {
    content: '',
    filterValue: '',
    tableId: '#extra-table-full'
  },
  mounted: function () {
    if (currentPage == 'extras') {
      this.getData();
    }
  },
  methods: {
    filter: function(e) {
      filterBSTable(this.tableId,this.filterValue);
    },
    
    getData: function () {
      var self = this;
      axios.post(BASE_URL + 'extra/get_all')
      .then(function (res) {
        self.fillTable(res.data.content);
      })
    },

    fillTable: function (content) {
      fillBSTable('#extra-table-full', content)
    }
  }
});

function fillBSTable(tableId, content) {
  var $table = $(tableId);
  $table.bootstrapTable('destroy');
  $table.find('tbody').html(content);
  $table.bootstrapTable();
  $('.pull-right.search').addClass('hide')
  $table.find('tbody').css({display:"table-row-group"});
  $table.addClass('innertable');

}

function filterBSTable(tableId,state) {
  $(tableId).bootstrapTable('filterBy',{
    estado: state
  });
}
