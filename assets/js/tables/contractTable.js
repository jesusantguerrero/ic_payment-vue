var contractTable = {
  init: function(){
    var self = this;
    this.el = $('#t-contracts');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    self.el.addClass('innertable');
    contractTable.detectClicks();
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
    contractTable.el.bootstrapTable('destroy');
    contractTable.el.find('tbody').html(content);
    contractTable.init();
    if(callback)
       callback();
  },

  detectClicks: function(){
    
    var btnPayView     = $("#btn-pay-view");
    var btnSeeInDetail = $("#btn-see-in-detail");
    var btnSeeContract = $("#btn-see-contract");

    this.el.on('check.bs.table',function(){
      var row= contractTable.getSelectedRow();
      btnPayView.attr('href',BASE_URL + 'process/details/'+ row.id_cliente + "/pagos");
      btnSeeInDetail.attr('href',BASE_URL + 'process/details/'+ row.id_cliente);
      btnSeeContract.attr('href',BASE_URL + 'process/getrequirements/' + row.id + '/contrato');
    });

    this.el.on('uncheck.bs.table',function(){
      btnPayView.attr('href','#');
      btnSeeInDetail.attr('href','#');
      btnSeeContract.attr('href','#');
    }); 
  }
}