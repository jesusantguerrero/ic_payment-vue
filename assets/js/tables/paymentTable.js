var paymentTable = {
  init: function(page,row){
    this.el = $('#t-pagos');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    this.el.addClass('innertable');
    this.detailBox = $('#payment-detail-box');
    this.detailBox.hide()
    
    if(page,row){
      var id = row.id_contrato;
      if(id == paymentTable.getRow().id_contrato)
        this.el.bootstrapTable('selectPage',page);
    }

    this.el.on('click-row.bs.table',function(event,row,$el,field){
      event.stopImmediatePropagation();
      var self = paymentTable;
      $(".payment-mode").removeClass("selected");
      if(!$el.hasClass('selected') && row.estado == "no pagado"){
        self.detailBox.show();
        self.detailBox.collapse();
      }else{
         self.detailBox.hide();
      }
    })

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
    
    var controls = {
      'cancel': 'btn-detail-cancel-contract',
      'suspend': 'btn-detail-suspend-contract',
      'reconnect': 'btn-call-reconnect',
      'extra': 'btn-call-extra'
    }
    
    this.el.on('click-row.bs.table',function(event,row,$el,field){
      event.stopImmediatePropagation();
      var self = detailsContractTable;
      $(".payment-mode").removeClass("selected");
      console.log(row.estado)
      if(!$el.hasClass('selected')){
        switch (row.estado) {
          case 'saldado':
            self.activeButtons([controls.reconnect, controls.extra])
            break;
          case 'activo':
            self.activeButtons([controls.cancel,controls.suspend, controls.extra])
            break;
          case 'cancelado':
            self.activeButtons([controls.reconnect])
            break;
          case 'suspendido':
            self.activeButtons([controls.reconnect, controls.cancel])
            break;
        }
      }else{
         self.desactiveButtons('icon')
      }
    })
    
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
  },
  
  activeButtons: function (buttonsId,btnClass) {
    this.desactiveButtons('icon');
    buttonsId.forEach( function (button) {
      $('#'+button).removeAttr('disabled');
    }, this);
  },

  desactiveButtons: function(btnClass){
    $('.contract-controls .' + btnClass).attr('disabled','');
  }
}

var bus = new Vue()

var extraTable = {
  init: function(page,row){
    this.el = $('#t-extras');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    this.el.addClass('innertable');
    this.detailBox = $('#payment-detail-box');
    this.detailBox.hide()
    
    if(page,row){
      var id = row.id_contrato;
      if(id == extraTable.getRow().id_contrato)
        this.el.bootstrapTable('selectPage',page);
    }

    this.el.on('click-row.bs.table',function(event,row,$el,field){
      event.stopImmediatePropagation();
      var self = extraTable;
      $(".payment-mode").removeClass("selected");
      
      if(!$el.hasClass('selected')){
        bus.$emit('row-selected',row);
      }
    })

    extraTable.clickEvents();
    this.el.on('all.bs.table',function(name,args){
      extraTable.clickEvents()
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
    var options = extraTable.el.bootstrapTable('getOptions');
    var row     = extraTable.getRow();

    extraTable.el.bootstrapTable('destroy');
    extraTable.el.find('tbody').html(content);
    extraTable.init(options.pageNumber, row);
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
      var id = $(this).attr('data-id-pago').trim();
      if (id) {
        Payments.getOne(id, Payments.receiveForEdit);
      }
    });

    $(".extra-delete").on('click',function(e) {
      e.preventDefault()
      e.stopImmediatePropagation();
      var id = $(this).attr('data-id-extra').trim();
      if (id) {
         swal({
          title: 'Está Seguro?',
          text: "Seguro de que quiere deshacer servicio extra?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          'cancelButtonText': 'Cancelar'
        }).then(function(){
          Extras.remove(id);
        });
      }
    });

  }
}