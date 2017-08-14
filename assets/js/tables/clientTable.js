var clientTable = {

  init: function(page){
    var self = this;
    this.el = $('#t-clients');
    this.el.bootstrapTable()
    this.el.find('tbody').css({display:"table-row-group"});
    self.el.addClass('innertable');
    if(page){
      self.el.bootstrapTable('selectPage',page);
    }
    clientTable.detectClicks();
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
    var options = clientTable.el.bootstrapTable('getOptions');

    clientTable.el.bootstrapTable('destroy');
    clientTable.el.find('tbody').html(content);
    clientTable.init(options.pageNumber);
    if(callback)
       callback;
  },

  detectClicks: function(){
    var btnGetDetails     = $("#get-details");
    var btnNewContract    = $("#client-new-contract");
    var btnGoNewContract  = $("#go-new-contract");

    this.el.on('check.bs.table',function(){
      var id = clientTable.getId()
      btnGetDetails.attr('href',BASE_URL + 'process/details/'+ id);
      btnNewContract.attr('href',BASE_URL + 'process/newcontract/'+ id);
      
      // buscador
      if(btnGoNewContract){
        if(btnGoNewContract.text().toLowerCase() == "ir a pagos"){
          btnGoNewContract.attr('href',BASE_URL + 'process/details/'+ id + "/pagos");
        }else{
          btnGoNewContract.attr('href',BASE_URL + 'process/newcontract/'+ id);
        }
      }
    });

    this.el.on('uncheck.bs.table',function(){
      btnGetDetails.attr('href','#');
      btnNewContract.attr('href','#');
      btnGoNewContract.attr('href','#');
    }); 
  }
}
 window.getHeight = function () {
    var h =  450;
    return h;
  }