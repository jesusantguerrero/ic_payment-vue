var contractTable = {
  init: function(){
    var self = this;
    this.el = $('#t-contracts');
    this.el.bootstrapTable({
        sortName: "id",
        minimumCountColumns: "2", 
        pagination: "true", 
        idField:"id", 
        pageSize:"5",
        pageList: "[5]", 
        showFooter: false,
        clickToSelect: "true",
        singleSelect: "true",
        stripped: false,
        columns:[
          {
            title:"Cod",
            field:"id",
            sortable: true,
            titleTooltip: "codigo",
          },
          {
            checkbox: true,
            field: "checkbox",
            class:  "hide"
          },
          {
            title: "IP",
            titleTooltip: "codigo corto de ip",
            field: "ip"
          },{
            title: "Cliente",
            field: "cliente",
            titleTooltip: "Nombre del cliente"
          },{
            title: "Fecha Inicio",
            field: "fecha_inicio",
            titleTooltip: "Fecha de inicio del contrato"
          },{
            title: "Servicio",
            field: "servicio",
            titleTooltip: "servicio"
          },{
            title: "Meses",
            field: "meses",
            titleTooltip: "Duracion en meses del contrato"
          },{
            title: "Ultimo Pago",
            field: "fecha_inicio",
            titleTooltip: "Fecha del ultimo pago"
          },{
            title: "Proximo Pago",
            field: "proximo_pago",
            titleTooltip: "Fecha del Proximo Pago"
          },{
            title: "Monto Pagado",
            field: "monto_pagado",
            titleTooltip: "Monto pagado del contrato"
          },{
            title: "Monto Total",
            field: "monto_total",
            titleTooltip: "Monto Total"
          },{
            title: "ID Cliente",
            field: "id_cliente",
            class: "hide"
          },{
            title: "cedula",
            field: "cedula",
            class: "hide"
          }
        ]
    });
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