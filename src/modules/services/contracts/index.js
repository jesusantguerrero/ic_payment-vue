
//TODO: change to axios:

import handler from './handlers';
export default class contracts {
  constructor() {
    this.ran = false
    handler(this);
    if (currentPage == "nuevo_contrato") {
      Contracts.getIpList();
    }
  }

  add() {
    var form, table, client_id, user_id, service_id, code, contract_date, payment, duration,
      equipment, eMac, router, rMac, total, nextPayment, model, ip;

    client_id     = $("#contract-client-id").val();
    user_id       = $("#contract-user-id").val();
    service_id    = $(".service-card.selected").attr('data-id');
    contract_date = $('#contract-client-date').val();
    duration      = $('#contract-client-months').val();
    equipment     = $('#contract-equipment').val();
    eMac          = $('#contract-e-mac').val();
    router        = $('#contract-router').val();
    rMac          = $('#contract-r-mac').val();
    model         = $('#contract-equipment-model').val();
    ip            = $('#contract-ip').val();
    code          = $("#select-contract-code").val();

    payment = $("#contract-client-payment").val();
    nextPayment = moment(contract_date).add(1, 'months').format('YYYY-MM-DD');

    var is_empty = isEmpty([client_id, user_id, service_id, contract_date, duration]);
    if (!is_empty) {
      total = (Number(duration) + 1) * Number(payment);
      form = 'id_empleado=' + user_id + "&id_cliente=" + client_id + "&id_servicio=" + service_id + "&codigo=" + code + "&fecha=" + contract_date;
      form += "&duracion=" + duration + "&monto_total=" + total + "&monto_pagado=0&ultimo_pago=null";
      form += "&mensualidad=" + payment + "&proximo_pago=" + nextPayment + "&estado=activo&tabla=contratos";
      form += "&nombre_equipo=" + equipment + "&mac_equipo=" + eMac + "&router=" + router + "&mac_router=" + rMac;
      form += "&modelo=" + model + "&ip=" + ip;
      connectAndSend("process/add", null, null, Contracts.getLast, form, null);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  }

  getAll() {
    var form = "tabla=contratos";
    var callback = null
    var refresh = contractTable.refresh;
    if (contractTable.el == 'detalles') {
      callback = Payments.getAll()
      refresh = null
    }
    connectAndSend('process/getall', false, null, refresh, form, callback);
  }

  getLast(data) {
    data = JSON.parse(data);
    displayMessage(data.mensaje)
    $("#btn-save-contract").attr("disabled", "");
    $("#btn-print-contract").removeAttr("disabled");
    if(data.tabla_pagos){
      makePaymentList(data.tabla_pagos);
    }
  }

  callExtra(context) {
    var row
    this.dropDownEvents();
    if (context == "details"){
      row = detailsContractTable.getSelectedRow();
    }else{
      row = contractTable.getSelectedRow();
    }
    if (row) {
      this.inputExtraClientDni.val(row.cedula);
      Contracts.getAllOfClient(row.cedula);
      $('#add-extra-modal').modal();
    } else {
       displayAlert("Revise", "Seleccione el conrato primero", "error");
    }
  }

  cancel(row,callback) {
    var is_penalty = false;
    var reason     = $("#cancelation-reason").val();
    var checked    = $("#check-penalty:checked").length;
    var form, fecha;
    console.log(row)
    if(row.id){
      if (checked > 0) {
        is_penalty = true;
      }
      fecha = moment().format("YYYY-MM-DD");
      form = 'id_contrato=' + row.id + '&fecha=' + fecha + '&id_cliente=' + row.id_cliente;
      form += "&motivo=" + reason + "&penalidad=" + is_penalty;
      connectAndSend('process/cancel', true, null, null, form, callback);
    }else{
      displayMessage(MESSAGE_ERROR +" No hay contrato seleccionado");
    }
  }

  getOne(id_contrato, receiver) {
    form = "tabla=contratos&id_contrato=" + id_contrato;
    connectAndSend("process/getone", false, null, receiver, form, null)
  }

  recieve(content) {
    var contract    = JSON.parse(content);
    this.id_contrato = contract['id_contrato'];
    var $equipo     = $("#u-contract-equipment");
    var $macEquipo  = $("#u-contract-e-mac");
    var $router     = $("#u-contract-router");
    var $macRouter  = $("#u-contract-r-mac");
    var $modelo     = $("#u-contract-modelo");
    var $codigo     = $("#select-contract-code");
    var $isChangeIp = $("#check-change-ip");
    var $ip         = $("#u-contract-ip");

    $equipo.val(contract['nombre_equipo']);
    $macEquipo.val(contract['mac_equipo']);
    $router.val(contract['router']);
    $macRouter.val(contract['mac_router']);
    $modelo.val(contract['modelo']);
    $ip.val(contract['ip']);

    // $("#update-contract-modal select").val('')
    $("#update-contract-modal").modal();
    $("#update-contract").on('click', function (e) {
      e.stopImmediatePropagation();
      updateContract(id_contrato);
    });

    function updateContract(id_contrato) {
      var checked = $("#check-change-ip:checked").length;
      form = 'id_contrato=' + id_contrato + '&nombre_equipo=' + $equipo.val() + "&mac_equipo=" + $macEquipo.val();
      form += "&router=" + $router.val() + "&mac_router=" + $macRouter.val();
      form += "&modelo=" + $modelo.val();
      form += "&tabla=contratos";
      if (checked > 0) {
        form += "&ip=" + $ip.val() + "&codigo=" + $codigo.val();
      }
      connectAndSend("process/update", true, null, null, form, Contracts.getAll);
    }
  }

  getIpList () {
    var section_id = $("#select-contract-sector").val();
    var form = "id_seccion=" + section_id + "&tabla=ip_list";
    connectAndSend("process/getall", false, null, makeIpList, form, null);

    function makeIpList(content) {
      $("#select-contract-code").html(content);
    }
  }

  btnExtraPressed ($this) {
    var buttonId = $this.text().trim().toLowerCase();
    var contractId = this.selectExtraClientContract.val()
    var clientDni = this.inputExtraClientDni.val().replace(/[-]/g,' ')

    switch (buttonId) {
      case "mejorar":
        Contracts.upgrade();
        break;
      case "extender":
        Contracts.extend();
        break;
      case "guardar":
        Contracts.addExtra();
        break;
    }
    this.getAllOfClient(clientDni)
    .then(function(res){
      console.log(res.data);
      console.log(' aqui en la promesa');
    })

  }

  upgrade () {
    var form, contractId, selectedService, serviceId, amount;

    contractId = $("#extra-client-contract").val();
    selectedService = $(".service-card.selected");
    serviceId = selectedService.attr("data-id");
    amount = selectedService.attr("data-payment");

    var is_empty = isEmpty([contractId, serviceId, amount]);
    if (!is_empty) {
      form = 'id_contrato=' + contractId + "&id_servicio=" + serviceId + "&cuota=" + amount;
      connectAndSend('process/upgrade', true, initGlobalHandlers, null, form, Contracts.getAll)
    } else {
      displayAlert("Revise", "asegurate de llenar todos los datos y seleccionar el servicio", "info");
    }
  }

  reconnect (contractId,callback) {
    var form, selectedService, serviceId, duration, date,send, is_empty,info;

    selectedService = $(".service-card.selected");
    serviceId = selectedService.attr("data-id");
    duration  = $("#reconnection-months").val();
    date = $("#reconnection-date").val()
    is_empty = isEmpty([contractId,serviceId,date,duration]);
    if(!is_empty){
      info = {
        'id_contrato': contractId,
        'fecha': date,
        'id_servicio': serviceId,
        'duracion': duration
      }

      form = "data=" + JSON.stringify(info);
      send = axios.post(BASE_URL + "contract/reconnect",form);
      send.then(function(res){
        displayMessage(res.data.mensaje);
        Payments.getAll();
        $("#btn-reconnect").removeAttr("disabled");
        $(".reconnect-caller").removeClass('visible');
        if(callback)
          callback()
      })
      send.catch(function(err){
        console.log(err);
      })
    }else{
      swal("Llene todos los campos")
    }
  }

  addExtra () {
    var form, contractId, extraService, serviceCost, equipment, eMac, router, rMac,paymentMode;

    contractId = $("#extra-client-contract").val();
    serviceCost = $("#extra-service-cost").val();
    extraService = $("#select-extra-service").val();
    equipment = $("#extra-equipo").val();
    eMac = $("#extra-e-mac").val();
    router = $("#extra-router").val();
    rMac = $("#extra-r-mac").val();
    paymentMode = $("#select-payment-mode").val();

    var is_empty = isEmpty([contractId, extraService, serviceCost,paymentMode]);
    if (!is_empty) {
      form = 'id_contrato=' + contractId + "&costo_servicio=" + serviceCost + "&nombre_servicio=" + extraService;
      form += '&nombre_equipo=' + equipment + "&mac_equipo=" + eMac + "&router=" + router + "&mac_router=" + rMac;
      form += '&modo_pago=' + paymentMode;
      connectAndSend('process/addextra', true, initGlobalHandlers, null, form, Contracts.getAll);
    } else {
      displayAlert("revise", "asegurate de llenar todos los datos y seleccionar el servicio", "info");
    }
  }

  extend () {
    var form, contractId, duration;
    contractId = $("#extra-client-contract").val();
    duration = $("#extra-extension-months").val();

    var is_empty = isEmpty([duration, contractId]);
    if (!is_empty) {
      form = 'id_contrato=' + contractId + "&duracion=" + duration;
      connectAndSend('process/extend_contract', true, initGlobalHandlers, null, form, Contracts.getAll)
    } else {
      displayAlert("revise", "asegurate de llenar todos los datos y seleccionar el servicio", "info");
    }
  }

  getAllOfClient(dni) {
    var form = "dni=" + dni;
    var self = this;

    return axios.post(BASE_URL + 'process/data_for_extra', form)
    .then(function(res){
      self.makeContractList(res.data)
    })
    .catch(function(){})
  }

  suspend (contractId, callback) {
    var form = "data=" + JSON.stringify({id_contrato: contractId})

    axios.post(BASE_URL + 'contract/suspend',form)
    .then(function(res){
      var data = res.data
      displayMessage(data.mensaje);
      Contracts.getAll();
      if(callback)
        callback()
    })
    .catch(function(error){
      console.log(error);
    })
  }

  deleteExtra (contractId) {
    var self = this
    swal({
      title: 'Está Seguro?',
      text: "Seguro que desea eliminar el seguro a este contrato?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
    .then(function(){
      sendDelete(contractId);
      self.inputContracEnsurance.val('');
    })

    function sendDelete(contractId) {
      var form = "data=" + JSON.stringify({id_contrato: contractId})
      axios.post(BASE_URL + 'contract/delete_extra',form)
      .then(function(res){
        displayMessage(res.data.mensaje);
      })
      .catch(function(error){
        console.log(error);
      })
    }
  }

  // UTILS

  makeContractList (response) {
    if (response) {
      var value,service,equipment,eMac,router,rMac,code,ensuranceName,ensuranceCost;
      var element = "<option value=''>--Selecciona--</option>";
      var cliente = response.cliente;
      var contratos = response.contratos;
      var contractId;

      if (currentPage != 'detalles' && currentPage != 'home'){
        contractId = contractTable.getId();
      } else if ( currentPage != 'home'){
        contractId = detailsContractTable.getSelectedRow().id_contrato;
      }

      for (var i = 0 ; i < contratos.length; i++) {
        value         = contratos[i]["id_contrato"];
        service       = contratos[i]["servicio"];
        equipment     = contratos[i]["nombre_equipo"];
        router        = contratos[i]["router"];
        eMac          = contratos[i]["mac_equipo"];
        rMac          = contratos[i]["mac_router"];
        code          = contratos[i]["codigo"];
        ensuranceName     = contratos[i]["nombre_seguro"];
        ensuranceCost = contratos[i]["mensualidad_seguro"];

        element += "<option value='" + value + "' data-service='"+service+"'  data-equipment='"+equipment+"'  data-e-mac='"+eMac+"'";
        element += " data-router='"+router+"'  data-r-mac='"+rMac+"' data-code='"+code+"' data-ensurance='"+ensuranceName+'- RD$ '+ CurrencyFormat(ensuranceCost)+"'>";
        element += value +"</option>";
      }

      this.selectExtraClientContract.html(element);
      this.selectExtraClientContract.val(contractId).change();

      $("#extra-client-name").val(cliente['nombres'] + " " + cliente['apellidos']);

    }else{
      displayMessage(MESSAGE_ERROR + " Este cliente no existe revise su cedula por favor");
    }
  }

  dropDownEvents () {
    if (!this.ran) {
      var self = this
      this.ran = true
      this.selectExtraService = $("#select-extra-service");
      this.selectExtraClientContract = $("#extra-client-contract");
      this.btnDeleteExtra = $("#delete-extra");
      this.inputContracEnsurance = $("#contract-ensurance");
      this.inputExtraClientDni = $("#extra-client-dni");

      this.selectExtraService.on('change', function () {
        var data = $(("#select-extra-service :selected")).data();
        $("#extra-service-cost").val(data['payment'])
      });

      this.selectExtraClientContract.on('change', function () {
        var data = $("#extra-client-contract :selected").data();
        $("#extra-contract-service").val(data["service"]);
        $("#extra-equipo").val(data["equipment"]);
        $("#extra-router").val(data["router"]);
        $("#extra-e-mac").val(data["eMac"]);
        $("#extra-r-mac").val(data["rMac"]);
        $("#extra-code").val(data["code"]);
        if (!data["ensurance"].includes('null')){
          self.inputContracEnsurance.val(data["ensurance"]);
        }
      });

      this.btnDeleteExtra.on('click', function(){
        var id = self.selectExtraClientContract.val()
        self.deleteExtra(id);
      })
    }
  }
}
