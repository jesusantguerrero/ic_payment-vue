var sectionTable = {
  init: function(){
    var self = this;
    this.el = $('#t-sections');
    this.$filter = $('.filter');
    this.el.bootstrapTable();
    this.customSearch();
    this.el.find('tbody').css({display:"table-row-group"});
    this.el.addClass('innertable');
    this.detectClicks();
    this.el.on('all.bs.table', function (name, param) {
      self.changeStates();
      self.loadingEvents();
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
    sectionTable.el.bootstrapTable('destroy');
    sectionTable.el.find('tbody').html(content);
    sectionTable.init();
    if(callback) callback();
  },

  updateCell: function(uniqueId, cellName, value, className) {
    var data = sectionTable.el.bootstrapTable('getData');
    var sel = sectionTable.el.bootstrapTable('getRowByUniqueId','40/2');
    var i = data.indexOf(sel);
    this.el.bootstrapTable('updateCell',{index: i, field: cellName, value: value})
  },

  loadingEvents: function() {
    this.el.on('pre-body.bs.table',function () {
       //TODO: LOAD EVENTS
    });
    this.el.on('post-body.bs.table',function () {
      //TODO: LOAD EVENTS
    });
  },

  detectClicks: function(){ 
    this.el.on('check.bs.table',function(){
      var row= sectionTable.getSelectedRow();
    });

    this.el.on('uncheck.bs.table',function(){
     // TODO: check events
    }); 
  },

  customSearch: function () {
    $('.pull-right.search').addClass('hide')
    console.log('here is the custom search')
    var $inputSearch = $('.search input');
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
      _filtro = _filtro.split(' ');
      self.applyFilter(_filtro);
      console.log(_filtro);
    })
  },

  changeStates: function () {
    var STATES = {
      ocupado: 'text-danger',
      disponible: 'text-success',
      sectorial: 'text-primary'
    }
    var STATES_KEYS = Object.keys(STATES)
    var ipSelectState = "<select>"
    STATES_KEYS.forEach(function(estado) {
      ipSelectState += "<option value='"+estado+"'>"+estado+"</value>"
    });
    ipSelectState +="<select>"

    $(".btn-change-ip").on('click',function(e){
      e.stopImmediatePropagation();
      var select = $(ipSelectState);
      var $this = $(this);
      var colEstado = $this.parents('tr').find('.estado-ip')
      var state;
      var code = $this.attr('data-code').trim();
      var text = colEstado.text();
      colEstado.html(select);
      select.focus();
      select.val(text);

      select.on('change blur',function(e){ 
        state = select.val();
        colEstado.html(state);
        colEstado.removeClass("text-danger text-success text-primary");
        colEstado.addClass(STATES[state]);
        Sections.updateIpState({'codigo':code,'estado':state});
        sectionTable.updateCell(code, 'estado', state)
      });

      select.on('click',function(e){ 
        e.stopImmediatePropagation() 
      })

    })
  },

  applyFilter: function(filter) {
    this.el.bootstrapTable('filterBy',{
      estado: filter
    })
  }
}