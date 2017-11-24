import handlers from './handlers';

export default class payments {
  constructor() {
    this.ran = false;
    this.hasChanged = false;
    handlers(this)
  }

  getAll() {
    var id = $("#select-contract").val();
    if (id != null) {
      var form = "tabla=pagos&id=" + id;
      connectAndSend('process/getall', false, null, paymentTable.refresh, form, Payments.contractRefresh);
    }
  }

  update(id) {
      var date = moment().format("YYYY-MM-DD");
      var id_contrato = $("#select-contract").val();
      var form = "tabla=pagos&id=" + id + "&estado=pagado&fecha_pago=" + date + "&id_contrato=" + id_contrato;
      connectAndSend('process/update', true, null, null, form, Payments.getAll);
  }

  saveAbonos () {
    var form, observations, abono$inputAbono,$textAbono,contractId;

    $textAbono   = $('#text-abono-detail');
    observations = $textAbono.val();
    contractId   = $("#select-contract").val();
    $inputAbono  = $("#input-abono");
    abono        = $inputAbono.val();

    form = 'observaciones=' + observations + "&abonos=" + abono;
    form += "&contrato_abono="+contractId+"&tabla=abonos";
    connectAndSend("process/update", true, null, null, form, Payments.getAll)
    $inputAbono.val('')
  }

  saveExtra () {
    var send = axios.post(BASE_URL + 'process/')
  }

  updateUntil (contractId,lastPaymentId){
    var id_contrato = $("#select-contract").val();
    var form = "tabla=pagos_al_dia&id_ultimo_pago=" + lastPaymentId + "&estado=pagado&id_contrato=" + contractId;
    var handlers, callback;
    connectAndSend('process/update', true, null, null, form, null, heavyLoad);
  }

  removePayment (id) {
    var form = "tabla=deshacer_pago&id_pago=" + id;
    connectAndSend('process/update', true, null, null, form, Payments.getAll);
  }

  contractRefresh(){
    var id_cliente = $('#detail-client-id').val()
    var form = "tabla=contratos_cliente&id=" + id_cliente;
    connectAndSend('process/getall', false, null, detailsContractTable.refresh, form, null);
  }

  getOne(id_pago, receiver) {
    var self = this;
    var form = "tabla=pagos&id_pago=" + id_pago;
    axios.post(BASE_URL + 'process/getone', form)
    .then(function(res){
      self.receiveForEdit(res.data);
    })
  }

  receiveForEdit(data){
    var self          = Payments;
    var pago          = data.pago
    var settings      = data.settings;
    self.idContrato   = pago['id_contrato'];
    self.idPago       = pago['id_pago'];
    var $concepto     = $("#payment-concept");
    var $fechaLimite  = $("#payment-limit-date");
    var $serviciosExtra = $("#payment-extra-services");
    var $cuota        = $("#payment-cuota");
    var $mora         = $("#payment-mora");
    var $extra        = $("#payment-extra");
    var $total        = $("#payment-total");
    var $descuento    = $("#payment-discount-amount");
    var $razon        = $("#payment-discount-reason");
    var $modal        = $("#advanced-payment");
    var $cMora        = $("#c_mora");
    var $cReconexion  = $("#c_reconexion");

    $concepto.val(pago['concepto']);
    $fechaLimite.val(pago['fecha_limite']);
    $cuota.val(pago['cuota']);
    $mora.val(pago['mora']);
    $extra.val(pago['monto_extra']);
    $total.val(pago['total']);
    $serviciosExtra.val(pago['detalles_extra']);
    interactiveSum();

    $modal.modal();

    if (pago['mora'] > 0) {
      $cMora.iCheck('check');
      Payments.hasChanged = true
    } else {
      $cMora.iCheck('uncheck');
      Payments.hasChanged = true;
    }

    if (pago['detalles_extra'].includes('Reconexion')) {
      $cReconexion.iCheck('check');
      Payments.hasChanged = true
    } else {
      $cReconexion.iCheck('uncheck');
      Payments.hasChanged = true
    }

    $("#btn-apply-discount").on('click', function (e) {
      e.stopImmediatePropagation();
      if ($descuento.val() > 0) {
        swal({
          title: 'Está Seguro?',
          text: "Seguro de que quiere aplicar este descuento de " + $descuento.val() + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
          apply();
        });
      } else {
        apply();
      }
    });

    if (!this.ran) {
      this.ran = true
      $modal.on('hide.bs.modal',function(){
        $modal.find('input').val('')
      });

      $cMora.on('ifChecked', function () {
        var mora = pago['cuota'] * settings['cargo_mora'] / 100;
        Payments.setMora(mora, self.idPago)
        .then( function(){
          self.getOne(self.idPago, self.receiveForEdit);
        })
      });

      $cReconexion.on('ifChecked', function () {
        Payments.setExtra(0, self.idPago)
        .then( function(){
          self.getOne(self.idPago, self.receiveForEdit);
        })
      })

      $cMora.on('ifUnchecked', function () {
        Payments.setMora(0, self.idPago)
        .then( function(){
          self.getOne(self.idPago, self.receiveForEdit);
        })
      })

      $cReconexion.on('ifUnchecked', function () {
        Payments.deleteExtra(0, self.idPago)
        .then( function(){
          self.getOne(self.idPago, self.receiveForEdit);
        })
      })

      $modal.on('hide.bs.modal', function (e) {
        if (Payments.hasChanged) {
          Payments.hasChanged = false
          Payments.getAll()
        }
      })
    }

    function apply () {
      applyDiscount(self.idPago);
      $modal.hide();
      $modal.modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }

    function applyDiscount(id_pago) {
      var date = moment().format("YYYY-MM-DD");
      form = 'id_pago=' + self.idPago + '&id_contrato=' + self.idContrato + "&cuota=" + $cuota.val();
      form += "&mora=" + $mora.val() + "&monto_extra=" + $extra.val();
      form += "&total=" + $total.val() + '&descuento=' + $descuento.val() + '&razon_descuento=' +$razon.val();
      form += '&fecha_pago=' + date + '&detalles_extra=' + $serviciosExtra.val() + "&tabla=discount_pagos";

      connectAndSend("process/update", true, null, null, form, Payments.getAll);
      $modal.hide();
    }

    function interactiveSum(){
      $('.payment-sumandos').on('keyup',function(){
        $cuota.val(pago['cuota'] - $descuento.val());
        var suma = Number($cuota.val()) + Number($mora.val()) + Number($extra.val());
        $total.val(Number(suma))
      })
    }
  }

  deleteExtra(key, idPago) {
    var self = this
    var form = "data=" + JSON.stringify({key: key,id_pago: idPago})
    return axios.post(BASE_URL + 'payment/delete_extra',form)
    .then(function(res){
      displayMessage(res.data.mensaje);
    })
    .catch(function(error){
      console.log(error);
    })
  }

  setExtra(key, idPago) {
    var self = this
    var form = "data=" + JSON.stringify({key: key, id_pago: idPago})
    return axios.post(BASE_URL + 'payment/set_extra',form)
    .then(function(res){
      displayMessage(res.data.mensaje);
    })
    .catch(function(error){
      console.log(error);
    })
  }

  setMora(mora, idPago) {
    var self = this
    var form = "data=" + JSON.stringify({mora: mora, id_pago: idPago})
    return axios.post(BASE_URL + 'payment/set_mora',form)
    .then(function(res){
      displayMessage(res.data.mensaje);
    })
    .catch(function(error){
      console.log(error);
    })
  }
}
