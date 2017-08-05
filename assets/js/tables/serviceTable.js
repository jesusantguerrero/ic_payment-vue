var serviceTable = {

  init: function(){
    var self = this;
    this.el = $('#t-services');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
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
    serviceTable.el.bootstrapTable('destroy');
    serviceTable.el.find('tbody').html(content);
    serviceTable.init();
    if(callback)
       callback;
  }

}