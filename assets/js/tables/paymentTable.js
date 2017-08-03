var paymentTable = {
  init: function(page,row){
    this.el = $('#t-pagos');
    this.el.bootstrapTable();
    this.el.addClass('innertable');
    
    if(page,row){
      var id = row.id_contrato;
      if(id == paymentTable.getRow().id_contrato)
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
    var data = this.el.bootstrapTable('getData');
    return data[0];

  },

  refresh: function(content,callback){
    var options = paymentTable.el.bootstrapTable('getOptions');
    var row     = paymentTable.getRow();

    paymentTable.el.bootstrapTable('destroy');
    paymentTable.el.find('tbody').html(content);
    paymentTable.init(options.pageNumber, row);
    if(callback)
       callback;
  },   
}

var detailsContractTable = {
  init: function(){
    this.el = $("#d-contracts");
    this.el.bootstrapTable();
    this.el.addClass('innertable');
    
  },

  getSelectedRow: function(){
    var self = this;
    return self.el.bootstrapTable('getSelections')[0]
  },


  refresh: function(content,callback){
    var options = paymentTable.el.bootstrapTable('getOptions');
    var row     = paymentTable.getRow();

    paymentTable.el.bootstrapTable('destroy');
    paymentTable.el.find('tbody').html(content);
    paymentTable.init();
    if(callback)
       callback;
  }   
}