var paymentTable = {
  init: function(page,row){
    this.el = $('#t-pagos');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    this.el.addClass('innertable');
    
    if(page,row){
      var id = row.id_contrato;
      if(id == paymentTable.getRow().id_contrato)
        this.el.bootstrapTable('selectPage',page);
    }
    paymentTable.clickEvents();
    this.el.on('all.bs.table',function(name,args){
      paymentTable.clickEvents()
    })
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
       callback();
  },  
  
  filter: function(value, type){
    if(type == 'estado'){
      this.el.bootstrapTable('filterBy',{
        estado: value
      });
    }else{
      hoy = moment().format("YYYY-MM-DD")
      this.el.bootstrapTable('filterBy',{
        fecha_limite: []
      });

    }
    
  },

  clickEvents: function(){
    $(".payment-advanced").on('click',function(e) {
      e.preventDefault()
      e.stopImmediatePropagation();
      console.log('yo si funciono')
      var id = $(this).attr('data-id-pago').trim();
      if (id) {
        Payments.getOne(id, Payments.receiveForEdit);
      }
    });

    $(".payment-delete").on('click',function(e) {
      e.preventDefault()
      e.stopImmediatePropagation();
      var id = $(this).attr('data-id-pago').trim();
      if (id) {
         swal({
          title: 'Está Seguro?',
          text: "Seguro de que quiere deshacer este pago?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          'cancelButtonText': 'Cancelar'
        }).then(function(){
          Payments.removePayment(id);
        });
      }
    });

  }
}

var detailsContractTable = {
  init: function(page){
    this.el = $("#d-contracts");
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
    var options = detailsContractTable.el.bootstrapTable('getOptions');
    detailsContractTable.el.bootstrapTable('destroy');
    detailsContractTable.el.find('tbody').html(content);
    detailsContractTable.init(options.pageNumber);
    if(callback)
       callback();
  }   
}