var activo      = '<i class="material-icons">fiber_smart_record</i> Activo'; 
var noActivo    = '<i class="material-icons">remove_circle_outline</i> No Activo';
var suspendido  = '<i class="material-icons">report_problem</i> Suspendido';
var enCorte     = '<i class="material-icons">signal_wifi_off</i> En Corte';
var mora        = '<i class="material-icons">timer</i> Mora';
var exonerado   = '<i class="material-icons">local_offer</i> Exonerado';
var filtros     = [[activo,noActivo],activo,noActivo];
var estadosiconos = {
  'activo' : {text: activo,class: 'done'},
  'no activo': {text: noActivo, class: 'error'},
  'en corte':  {text: enCorte,class: 'en-corte'},
  'mora': {text: mora, class: 'mora'},
  'suspendido': {text: suspendido,class: 'suspendido'},
  'exonerado': {text: exonerado,class: 'exonerado'}
}
var estados = ['activo','no activo','en corte','mora','suspendido','exonerado'];
var selectState = "<select>"
estados.forEach(function(estado) {
  selectState += "<option value='"+estado+"'>"+estado+"</value>"
  }, this);
selectState +="<select>"

// My Objects
 
var clientTable = {

  init: function(page){
    var self = this;
    this.el = $('#t-clients');
    this.$filter = $('.filter');
    this.el.bootstrapTable();
    this.customSearch();
    this.el.find('tbody').css({display:"table-row-group"});
    self.el.addClass('innertable');
    this.$filter.change();
    if(page){
      self.el.bootstrapTable('selectPage',page);
    }
    clientTable.detectClicks();
    this.el.on('all.bs.table', function (name,param) {
       clientTable.changeStates();
    });
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
  },

  changeStates: function () {
    $(".estado-cliente").on('click',function(e){
      e.stopImmediatePropagation();
      var select = $(selectState);
      var $this = $(this);
      var state;
      var id = $this.parent().find('.id_cliente').text().trim();
      $this.html(select);
      select.focus();

      select.on('change blur',function(e){ 
        state = select.val()
        $this.html(estadosiconos[state].text)
        $this.removeClass(" done error en-corte exonerado mora suspendido");
        $this.addClass(estadosiconos[state].class);
        Clients.updateState({'id':id,'estado':state});
      });

      select.on('click',function(e){ 
        e.stopImmediatePropagation();
        
      })
    })
  },

  customSearch: function () {
    $('.pull-right.search').addClass('hide')
    var $inputSearch = $('.search input');
    var $printTable = $('.print-table');
    this.$filter = $('.filter');
    var self = this

    $inputSearch.on('click', function (e) {
      var $this = $(this).parent();
      $this.addClass('focus')
    });

    $inputSearch.on('blur', function (e) {
      var $this = $(this).parent();
      $this.removeClass('focus');
    });

    this.$filter.on('change', function (e) {
      var _filtro = $(this).val(); 
      var _status = _filtro;

      if(_filtro == 'todo'){
        _filtro = estados;
        _status = '';  
      }
      $printTable.attr('href', BASE_URL + 'process/getreport/clientes/' + _status);
      self.applyFilter(_filtro);
    })
  },

  applyFilter: function(filter) {
    this.el.bootstrapTable('filterBy',{
      estadoreal: filter
    })
  }
 
}
 window.getHeight = function () {
    var h =  450;
    return h;
  }