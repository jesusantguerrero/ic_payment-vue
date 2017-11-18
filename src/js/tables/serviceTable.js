var serviceTable = {
  init: function(page){
    var self = this;
    this.el = $('#t-services');
    this.$filter = $('.filter');
    this.el.bootstrapTable();
    this.customSearch();
    this.el.find('tbody').css({display:"table-row-group"});
    if(page){
      self.el.bootstrapTable('selectPage',page);
    }
    self.el.addClass('innertable');
    this.tipos = ['reparacion','internet'];
    this.$filter.change();

  },

  getSelectedRow: function(){
    var self = this;
    return self.el.bootstrapTable('getSelections')[0]
  },

  getId: function(){
    var self = this;
    return $.map(self.el.bootstrapTable('getSelections'),function(row){
      return row.id;
    });
  },

  refresh: function(content,callback){
    var options = serviceTable.el.bootstrapTable('getOptions');

    serviceTable.el.bootstrapTable('destroy');
    serviceTable.el.find('tbody').html(content);
    serviceTable.init(options.pageNumber);
    if(callback)
       callback;
  },

  customSearch: function () {
    $('.pull-right.search').addClass('hide')
    var $inputSearch = $('.search input');
    this.$filter = $('.filter');
    var self = this

    $inputSearch.on('click', function (e) {
      var $this = $(this).parent();
      $this.addClass('focus')
    });

    $inputSearch.on('blur', function (e) {
      var $this = $(this).parent();
      $this.removeClass('focus');
    });

    this.$filter.on('change', function (e) {
      var _filtro = $(this).val(); 
      if(_filtro == 'todo'){
        _filtro = self.tipos;
      }
      self.applyFilter(_filtro);
    })
  },

  applyFilter: function(filter) {
    this.el.bootstrapTable('filterBy',{
      tipo: filter
    })
  }



}