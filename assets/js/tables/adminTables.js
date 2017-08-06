var userTable = {
  init: function(page){
    this.el = $('#t-users');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    this.el.addClass('innertable');

    if(page){
      this.el.bootstrapTable('selectPage',page);
    }
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

  getRow: function(id){
    var data = this.el.bootstrapTable('getRowByUniqueId',id);
    return data;
  },

  refresh: function(content,callback){
    var options = userTable.el.bootstrapTable('getOptions');

    userTable.el.bootstrapTable('destroy');
    userTable.el.find('tbody').html(content);
    userTable.init(options.pageNumber);
    if(callback)
       callback();
  },   
}

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
    var self = this;
    return self.el.bootstrapTable('getSelections')[0]
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

