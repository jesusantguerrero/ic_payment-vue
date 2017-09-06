var appPagoExtra = new Vue({
  el: "#app-pago-extra",
  data: {
    recibo:{
       id_pago: 0,
       id_contrato: 0,
       id_servicio: 0,
       id_empleado: 0,
       fecha_pago : 'dd/mm/yyyy',
       concepto : 'extra',
       detalles_extra : '',
       cuota: '',
       mora : '',
       monto_extra: '',
       total: '',
       estado: '',
       fecha_limite: '',
       complete_date : '',
       descuento: '',
       razon_descuento: '',
       deuda: '',
       abono_a: '',
       tipo: '',
       generado: ''
    },

    visible: false,
    extra:{
      "controls": '',
      "id_extra": '',
      "id_servicio": '',
      "checkbox": '',
      "fecha": '',
      "concepto": '',
      "ultimo_pago": '',
      "monto_pagado": '',
      "monto_total": '',
      "estado": ''
    },
    firstControls: {
      hide: false
    },
    secondControls: {
      hide: true
    }
  },
  filters: {

  },
  methods:{
    putInstance: function(){

    },
    goBack: function () {
      extraTable.el.parents(".bootstrap-table").removeClass("hide");
      appPagoExtra.visible = false
      appPagoExtra.extra = {concepto: ''}
    },

    generatePayment: function () {
      var form = 'data=' + JSON.stringify(this.extra);
      var send = axios.post( BASE_URL + 'extra/generate_extra_payment',form);
      send.then(function(res){
        var data = res.data;
        displayMessage(data.mensaje);
        selectExtraPayment.html(data.pagos);
      });
      send.catch(function(){
        
      })
    },

    getPayment: function (id_pago) {
      var form = "data=" + JSON.stringify({id_pago: id_pago});
      var self = this
      var send = axios.post( BASE_URL + 'extra/get_payment',form);
      send.then(function(res){
        var data = res.data 
        self.recibo = data.recibo
      })
    },

    applyPayment: function () {
      var self = this
      var recibo = this.recibo
      var info = {
        id_extra: recibo.id_extra,
        id_pago: recibo.id_pago
      }

      var data = {
        concepto: recibo.concepto, 
        detalles_extra: recibo.detalles_extra,
        fecha_pago: recibo.fecha_pago,
        cuota: recibo.cuota,
        total: recibo.cuota,
        estado: 'pagado',
        tipo: recibo.tipo,
        generado: true
      }

      var form = 'data='+ JSON.stringify(data) + '&info='+ JSON.stringify(info)
      var send = axios.post(BASE_URL + 'extra/apply_payment',form)
      send.then(function (res) {
        var data = res.data
        displayMessage(data.mensaje);
        extraTable.refresh(data.extras);
        self.goBack();
      })
      send.catch(function(error){
        console.log(error);
      })
    },

    getPayments: function (id_extra) {
      var form = "data="+ JSON.stringify({id_extra: id_extra})
      var send = axios.post(BASE_URL + 'extra/get_extra_payment_of', form)
      send.then(function(res){
        var data = res.data;
        selectExtraPayment.html(data.pagos).change()
      })
    },

    deletePayment: function () {
      var self = this;
      var recibo = this.recibo
      var data = {
        'id_extra': recibo.id_extra,
        'id_pago': recibo.id_pago
      }

      var form = 'data='+ JSON.stringify(data)
      var send = axios.post(BASE_URL + 'extra/delete_payment',form)
      send.then(function (res) {
        var data = res.data
        displayMessage(data.mensaje);
        extraTable.refresh(data.extras);
        self.getPayments(extra.id_extra);
        extraTable.el.parents(".bootstrap-table").addClass("hide");
      })
      send.catch(function(error){
        console.log(error);
      })
    }
  }

});


bus.$on('row-selected',function (row) {
  extraTable.el.parents(".bootstrap-table").addClass("hide");
  appPagoExtra.visible = true
  appPagoExtra.extra = row

  appPagoExtra.getPayments(row.id_extra);
})

var selectExtraPayment = $("#select-extra-payment");
selectExtraPayment.on('change',function(){
  var id_pago = selectExtraPayment.val()
  appPagoExtra.getPayment(id_pago)
})