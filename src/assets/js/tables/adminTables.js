
var cajaTable = {
  init: function(page){
    this.el = $("#caja");
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    this.el.addClass('innertable');

    if(page){
      this.el.bootstrapTable('selectPage',page);
    }
  },

  getSelectedRow: function(){
    return this.el.bootstrapTable('getSelections')[0]
  },

  refresh: function(content,callback){
    var options = cajaTable.el.bootstrapTable('getOptions');

    cajaTable.el.bootstrapTable('destroy');
    cajaTable.el.find('tbody').html(content);
    cajaTable.init(options.PageNumber);
    if(callback)
       callback();
  }
}

