var serviceTable = {
  init: function(page){
    var self = this;
    this.el = $('#t-services');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    if(page){
      self.el.bootstrapTable('selectPage',page);
    }
    self.el.addClass('innertable');

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
  }

}