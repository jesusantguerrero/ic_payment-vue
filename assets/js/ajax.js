function getContracts(dni) {
  var form = "dni=" + dni;
  connectAndSend("process/data_for_extra", false, null, makeContracList, form, null);
}


$(function () {
  var currentPage = $("title").text().split(" ");
  currentPage = currentPage[4].toLowerCase().trim();
  var ran = false;
  switch (currentPage) {
    case "home":
      initClientHandlers();
      break;
    case "administrador":
      initHandlers();
      break;
    case "clientes":
      initClientHandlers();
      break;
    case "servicios":
      initServicesHandlers();
      break;
    case "nuevo_contrato":
      initContractHandlers();
      break;
    case "detalles":
      initPaymentsHandlers();
      detailHandlers();
      verifyContractStatus();
      break;
    case "contratos":
      initContractHandlers();
      initClientHandlers();
      verifyContractStatus();
      break;
    default:
      break;
  }
  initCajaHandlers();
  initGlobalHandlers();
  // **************************************************     globals handlers       *****************************
  function initGlobalHandlers() {
    if (currentPage == 'notificaciones') {

      count_table("averias");

      $("#averias-view-mode").on('change', function (e) {
        e.stopImmediatePropagation();
        getAverias();

      });
    }
    if (currentPage == 'contratos') {

     initContractHandlers();
    }

    $("#btn-save-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      addAveria();
    });

    $("#a-client-dni").on('keydown', function (e) {
      var key = e.which;
      var dni = $(this).val()
      if (key == 13) {
        getClient(dni, fillClientFields);
      }
    });

    $(".btn-update-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      var id_averia = $(this).parents('.averia-item').find('.code')
      id_averia = id_averia.text().trim();
      updateAverias(id_averia);
    });

    $("#extra-controls").on('click',function(e){
      e.stopImmediatePropagation();
      btnExtraPressed($(this));
    });

    $("#extra-client-dni").on('keydown',function(e){
      var key = e.which;
      var dni = $(this).val()
      if(key == 13){
        getContracts(dni);
      }
    });


  }
  //***************************************************     Init Handlers          ***************************** */
  function initHandlers() {
    initPagination("#t-users", "users", paginate);

    $("#btn-save-user").on('click', function (e) {
      e.stopImmediatePropagation();
      addNewUser();
    });

    $("#btn-update-user").on('click', function (e) {
      e.stopImmediatePropagation();
      updateUser();
    });

    $(".delete-user").on('click', function (e) {
      e.preventDefault();
      var $row = $(this).parents("tr");
      var id = $row.find('.user-id').text().trim()
      var is_delete = window.confirm("Está seguro de que desea Eliminar al usuario " + $row.find("td:nth(3)").text() + "?");
      if (is_delete) {
        deleteUser(id);
      }
    });

    $(".edit-user").on('click', function (e) {
      e.preventDefault();
      var $row = $(this).parents("tr");
      var cell = $row.find('td');
      $("#e-nickname").val(cell.eq(2).text());
      $("#e-name").val(cell.eq(3).text());
      $("#e-lastname").val(cell.eq(4).text());
      $("#e-dni").val(cell.eq(5).text());

      $('#update-user-modal').modal();
    });

    $("#update-company-data").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      updateCompanyData();
    });

    // some globals handlers

    $("#btn-save-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      addAveria();
    });

  }
  //***************************************************     Init caja          ***************************** */
  function initCajaHandlers() {
    if (currentPage == 'administrador') {
      initPagination("#caja", "caja", paginate);
      count_table('caja');
    }
    var btnAddMoney = $("#btn-add-money");
    var btnRetireMoney = $("#btn-retire-money");
    var userSearch = $("#caja-user");
    var dateSearch = $("#caja-date");

    btnAddMoney.on('click', function (e) {
      e.stopImmediatePropagation();
      addAmount();
    });

    btnRetireMoney.on('click', function (e) {
      e.stopImmediatePropagation();
      addAmountRetirement();
    });

    dateSearch.on('change',function(e){
      e.stopImmediatePropagation();
      searchInCaja();
    });

    userSearch.on('change',function(e){
      e.stopImmediatePropagation();
      searchInCaja();
    });
  }

  //***************************************************  Init client Handlers      ***************************** */
  function initClientHandlers() {
    if (currentPage == 'clientes') {
      count_table("clientes");
      initPagination("#t-clients", "clientes", paginate);
    }
    makeRowsClickable();
    verifyClientStatus();

    $("#btn-save-client").on('click', function (e) {
      e.stopImmediatePropagation();
      addNewClient();
    });

    $("#update-client").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var $row = $("tr.selected");
      if ($row) {
        var id = $row.find('.id_cliente').text().trim();
        getClient(id, recieveClientForEdit);
      }
    });

    $("#client-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      search(text, "clientes", fillCurrentTable);
    });

    $("#client-searcher-newcontract").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      if (!isEmpty([text])) {
        search(text, "clientes", fillClientTable);
      } else {
        clearTbody(".lobby-results");
      }
    });

    $("#delete-client").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var $row = $("tr.selected");
      if ($row) {
        var id = $row.find('.id_cliente').text().trim();
        swal({
          title: 'Está Seguro?',
          text: "Desea Eliminar al(la) Cliente " + $row.find("td:nth(2)").text() + " " + $row.find("td:nth(3)").text() + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          confirmButtonBackground: SUMMER_SKY
        }).then(function(){
           deleteRow(id, "clientes")
        });
      }
    });
  }
  //***************************************************  Init Services Handlers    ***************************** */
  function initServicesHandlers() {
    count_table("servicios");
    initPagination("#t-services", "servicios", paginate);
    makeRowsClickable();

    $("#btn-save-service").on('click', function (e) {
      e.stopImmediatePropagation();
      addNewService();
    });

    $("#delete-service").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var $row = $("tr.selected");
      if ($row) {
        var id = $row.find('.id_servicio').text().trim();
        var is_delete = window.confirm("Está seguro de que desea Eliminar al(la) Cliente " + $row.find("td:nth(2)").text() + " " + $row.find("td:nth(3)").text() + "?");
        if (is_delete) {
          deleteRow(id, "servicios");
        }
      }

    });

    $("#edit-service").on('click', function (e) {
      e.preventDefault();
      var $row = $("tr.selected");
      var cells = $row.find('td');
      var inputs = $("#update-service-modal input");
      $('#u-service-id').val(cells.eq(1).text());
      $('#u-service-name').val(cells.eq(2).text());
      $('#u-service-description').val(cells.eq(3).text());
      $('#u-service-monthly-payment').val(Number(cells.eq(4).text().slice(3)));
      $('#u-service-type').val(cells.eq(5).text());

      $('#update-service-modal').modal();
    });

    $("#btn-update-service").on('click', function (e) {
      e.stopImmediatePropagation();
      updateService();
    });

  }
  //***************************************************  Init Contract Handlers    ***************************** */
  function initContractHandlers() {
    count_table('contratos');
    initPagination("#t-contracts", "v_contratos", paginate);
    makeRowsClickable();

    $("#btn-save-contract").on('click', function (e) {
      e.stopImmediatePropagation();
      addNewContract();
    });

    $("#btn-add-extra").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      callExtra();
    });
    var cont = 0;

    $("#contract-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      search(text, "v_contratos", fillCurrentTable,initContractHandlers);
    });

    $("#btn-cancel-contract").on('click', function (e) {
      e.preventDefault();
      var $row = $("tr.selected");
      var cells = $row.find("td");

      if ($row != undefined) {
        $(".cancel-name").text(cells.eq(1).text());

        var $inputElement = $(".confirmed-data");
        var $buttonToActive = $("#cancel-permanently");
        deleteValidation($inputElement, $buttonToActive);

        $("#cancel-contract-modal").modal();
        $buttonToActive.on('click', function () {
          cancelContract();
        })

        $inputElement.val('');
        $buttonToActive.attr('disabled', '');
      }

    });

    $("#btn-update-contract").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var $row = $("tr.selected");
      if ($row) {
        var id = $row.find('.id_contrato').text().trim();
        getContract(id, recieveContractForEdit);
      }
    });

  }
  //***************************************************  Init Payments  Handlers   ***************************** */
  function initPaymentsHandlers() {

    if (!ran) {
      getPayments();
      ran = true;
    }

    verifyPaymentStatus();
    initPagination('#t-pagos', 'pagos_por_contrato', paginate);
    count_table("pagos_por_contratos");


    $("#btn-pay").on('click', function (e) {
      e.stopImmediatePropagation();
      var $row = $("tr.selected");
      if ($row) {
        var id = $row.find('.id_pago').attr("data-id").trim();
        updatePayment(id);
      }

    });

    $("#select-contract").on('change', function (e) {
      e.stopImmediatePropagation();
      getPayments();
    });

    makeRowsClickable();
  }
  //***************************************************      detail Handlers       ***************************** */
  function detailHandlers() {
    $("#btn-save-observations").on('click', function (e) {
      e.stopImmediatePropagation();
      saveObservations()
    })

    $(".abono-value").on('click', function (e) {
      e.stopImmediatePropagation();
      saveObservations(true);
    })

  }


  /********************************************************
   *                CRUD para la tabla usuarios           *
   *                                                      *
   ********************************************************/

  function addNewUser() {

    var form, response, result, nick, password, name, lastname, dni, type, is_empty;

    nick = $("#user-nickname").val();
    password = $("#user-password").val();
    name = $("#user-name").val();
    lastname = $("#user-lastname").val();
    dni = $("#user-dni").val();
    type = $("#user-type").val();

    var is_empty = isEmpty([nick, password, name, lastname, dni, type]);
    if (!is_empty) {
      form = 'nickname=' + nick + "&password=" + password + "&name=" + name + "&lastname=" + lastname;
      form += "&dni=" + dni + "&type=" + type;
      connectAndSend("user/addnew", true, initHandlers, null, form, getUsers);
    } else {
      displayAlert("Revise","LLene todos los campos por favor","error");
    }
  }

  function updateUser() {

    var form, response, result, nick, password, name, lastname, dni, type;

    nick = $("#e-nickname").val();
    name = $("#e-name").val();
    lastname = $("#e-lastname").val();
    dni = $("#e-dni").val();
    type = $("#e-type").val();

    var is_empty = isEmpty([nick, name, lastname, dni, type]);
    if (!is_empty) {
      form = 'nickname=' + nick + "&name=" + name + "&lastname=" + lastname;
      form += "&dni=" + dni + "&type=" + type;
      connectAndSend("user/update", true, initHandlers, null, form, getUsers)
    } else {

      displayAlert("Revise","LLene todos los campos por favor","error");
    }
  }

  function getUsers() {
    var form = "table=users";
    connectAndSend('user/getusers', false, initHandlers, fillCurrentTable, form, null);
  }

  function deleteUser(id) {
    var form = "user_id=" + id;
    connectAndSend('user/deleteuser', true, initHandlers, null, form, getUsers);
  }

  function count_table(table) {
    var form = "tabla=" + table;
    var updateFunction = updateCount;
    if (table == 'caja') updateFunction = updateCajaCount
    connectAndSend('process/count', false, null, updateFunction, form, null);
  }

  /********************************************************
   *                CRUD para la tabla Clientes           *
   *                                                      *
   ********************************************************/

  function addNewClient() {

    var form, nombres, apellidos, cedula, celular, provincia, sector, calle, casa, telefono,
      lugarTrabajo, telTrabajo, ingresos, fechaRegistro, estado;

    nombres = $("#client-name").val();
    apellidos = $("#client-lastname").val();
    cedula = $("#client-dni").val();
    celular = $("#client-phone").val();
    provincia = $("#client-provincia").val();
    sector = $("#client-sector").val();
    calle = $("#client-street").val();
    casa = $('#client-house').val();
    telefono = $('#client-telephone').val();
    lugarTrabajo = $('#client-job').val();
    telTrabajo = $('#client-job-telephone').val();
    ingresos = $('#client-salary').val();
    fechaRegistro = getNow();
    estado = "no activo";

    var is_empty = isEmpty([nombres, apellidos, cedula, celular, provincia, sector, calle, casa, telefono]);
    if (!is_empty) {
      form = 'nombres=' + nombres + "&apellidos=" + apellidos + "&cedula=" + cedula + "&celular=" + celular;
      form += "&provincia=" + provincia + "&sector=" + sector + "&calle=" + calle + "&casa=" + casa + "&telefono=" + telefono;
      form += "&lugar_trabajo=" + lugarTrabajo + "&tel_trabajo=" + telTrabajo + "&ingresos=" + ingresos + "&fecha_registro=" + fechaRegistro;
      form += "&estado=" + estado + "&tabla=clientes";

      connectAndSend("process/add", true, initClientHandlers, null, form, getClientsLastPage);

    } else {
     displayAlert("Revise","LLene todos los campos por favor","error");
    }
  }

  function getClients() {
    var form = "tabla=clientes";
    connectAndSend('process/getall', false, initClientHandlers, fillCurrentTable, form, null);
  }

  function getClientsLastPage() {
    var form = "tabla=clientes";
    connectAndSend('process/lastpage', false, initClientHandlers, fillCurrentTable, form, null);
  }
  /**
   * Get Client: obtiene un cliente y sus datos a partir de una cedula o id
   * @param {integer} id 
   * @param {*} receiver funcion que recibe la respuesta de servidor
   */

  function getClient(id, receiver) {
    form = "tabla=clientes&id=" + id;
    connectAndSend("process/getone", false, initClientHandlers, receiver, form, null)
  }

  function recieveClientForEdit(content) {
    var client = JSON.parse(content);
    var id = client['id_cliente'];
    var $nombres = $("#u-client-name");
    var $apellidos = $("#u-client-lastname");
    var $cedula = $("#u-client-dni");
    var $celular = $("#u-client-phone");
    var $provincia = $("#u-client-provincia");
    var $sector = $("#u-client-sector");
    var $calle = $("#u-client-street");
    var $casa = $('#u-client-house');
    var $telefono = $('#u-client-telephone');
    var $lugarTrabajo = $('#u-client-job');
    var $telTrabajo = $('#u-client-job-telephone');
    var $ingresos = $('#u-client-salary');

    $nombres.val(client['nombres']);
    $apellidos.val(client['apellidos'])
    $cedula.val(client['cedula'])
    $celular.val(client['celular'])
    $provincia.val(client['provincia'])
    $sector.val(client['sector'])
    $calle.val(client['calle'])
    $casa.val(client['casa'])
    $telefono.val(client['telefono'])
    $lugarTrabajo.val(client['lugar_trabajo'])
    $telTrabajo.val(client['tel_trabajo'])
    $ingresos.val(client['salario'])

    $("#update-client-modal").modal();

    $("#btn-update-client").on('click', function () {
      updateClient();
    });

    function updateClient() {
      var is_empty = isEmpty([$nombres.val(), $apellidos.val(), $cedula.val(), $celular.val(), $provincia.val(), $sector.val(), $calle.val(),
        $casa.val(), $telefono.val()
      ]);
      if (!is_empty) {
        form = 'id=' + id + '&nombres=' + $nombres.val() + "&apellidos=" + $apellidos.val() + "&cedula=" + $cedula.val();
        form += "&celular=" + $celular.val() + "&provincia=" + $provincia.val() + "&sector=" + $sector.val() + "&calle=" + $calle.val();
        form += "&casa=" + $casa.val() + "&telefono=" + $telefono.val() + "&lugar_trabajo=" + $lugarTrabajo.val() + "&tel_trabajo =";
        form += "&ingresos=" + $ingresos.val();
        form += $telTrabajo.val() + "&tabla=clientes";

        connectAndSend("process/update", true, initClientHandlers, null, form, getClients);

      } else {
        displayAlert("Revise","LLene todos los campos por favor","error");
      }
    }
  }


  function saveObservations(abonoWatched) {
    var form, observations, abono, idCliente, $inputAbono, abonoValue;

    observations = $("#text-observations").val();
    $inputAbono = $("#input-abono");
    abono = (abonoWatched) ? 0 : $inputAbono.val();
    idCliente = $("#detail-client-id").val();
    abonoValue = $(".abono-value");

    if (abonoWatched != undefined) {
      $inputAbono.val(abono);
      $(".abono-box").removeClass("have-abono");
      abonoWatched = 1;
    } else {
      $inputAbono.attr("disabled");
      $(".abono-box").addClass("have-abono");
      abonoWatched = 0;
    }

    form = 'observaciones=' + observations + "&abonos=" + abono + "&id_cliente=" + idCliente + "&modo=" + abonoWatched;
    form += "&tabla=observaciones";
    connectAndSend("process/update", true, initPaymentsHandlers, null, form, null)


    abonoValue.find("input").val("RD$ " + CurrencyFormat(abono));
  }

  /********************************************************
   *                 Ajax Generales                       *
   *                                                      *
   ********************************************************/

  function deleteRow(id, tabla) {
    var form = "tabla=" + tabla + "&id=" + id;
    var handlers, callback;
    switch (tabla) {
      case 'clientes':
        handlers = initClientHandlers;
        callback = getClients;
        break;
      case 'servicios':
        handlers = initServicesHandlers;
        callback = getServices;
        break;

      default:
        break;
    }
    connectAndSend('process/delete', true, handlers, null, form, callback);
  };

  function paginate(offset, perpage, tableName) {
    var path = "user/";
    var handlers;
    if (tableName != "users") {
      path = "process/";
    }
    tableFill = fillCurrentTable;

    switch (tableName) {
      case "users":
        handlers = initHandlers;
        break;
      case "clientes":
        handlers = initClientHandlers;
        break;
      case "servicios":
        handlers = initServicesHandlers;
        break;
      case "v_contratos":
        handlers = initContractHandlers;
        break;
      case "pagos_por_contrato":
        handlers = initPaymentsHandlers;
        break;
      case "caja":
        handlers = initCajaHandlers;
        tableFill = fillCajaTable
        break;
      default:
        break;
    }
    var form = "table=" + tableName + "&offset=" + offset + "&perpage=" + perpage;
    connectAndSend(path + 'paginate', false, handlers, tableFill, form, null);
  }

  /**
   * Search manda un mensaje al servidor de los valores a buscar
   * @param {string} text el valor a ser buscado
   * @param {string} dbTable nombre de la tabla donde se desea consultar en la base de datos
   * @param {function} fillTableFunction funcion de llenado de tabla donde se mostraran los resultados 
   * @param {function} handlerFunction funcion reinicio de los elementos en los handlers 
   */
  function search(text, dbTable, fillTableFunction,handlerFunction) {
    if (handlerFunction   == undefined) handlerFunction = initClientHandlers;
    if (fillTableFunction == undefined) fillTableFunction = fillCurrentTable;
    var word = text;
    if (word != null || word != "") {
      var form = "tabla=" + dbTable + "&word=" + word;
      connectAndSend('process/search', false, handlerFunction, fillTableFunction, form, null);
    }
  }


  /********************************************************
   *                CRUD para la tabla Servicios          *
   *                                                      *
   ********************************************************/

  function addNewService() {

    var form, name, description, payment, type;

    name = $("#service-name").val();
    description = $("#service-description").val();
    payment = $("#service-monthly-payment").val();
    type = $("#service-type").val();

    var is_empty = isEmpty([name, description, payment, type]);
    if (!is_empty) {
      form = 'nombre=' + name + "&descripcion=" + description + "&mensualidad=" + payment + "&tipo=" + type;
      form += "&tabla=servicios";
      connectAndSend("process/add", true, initServicesHandlers, null, form, getServices);
    } else {
      displayAlert("Revise","LLene todos los campos por favor","error");
    }
  }

  function getServices() {
    var form = "tabla=servicios";
    connectAndSend('process/getall', false, initServicesHandlers, fillCurrentTable, form, null);
  }

  function updateService() {

    var form, id, name, description, payment, type;

    id = $('#u-service-id').val();
    name = $('#u-service-name').val();
    description = $('#u-service-description').val();
    payment = $('#u-service-monthly-payment').val();
    type = $('#u-service-type').val();

    var is_empty = isEmpty([id, name, description, payment, type]);
    if (!is_empty) {
      form = 'id_servicio=' + id + "&nombre=" + name + "&descripcion=" + description + "&mensualidad=" + payment;
      form += "&tipo=" + type + "&tabla=servicios";
      connectAndSend("process/update", true, initServicesHandlers, null, form, getServices);
    } else {
      displayAlert("Revise","LLene todos los campos por favor","error");
    }
  }

  /********************************************************
   *                CRUD para la tabla Contratos          *
   *                                                      *
   ********************************************************/

  function addNewContract() {
    var form, table, client_id, user_id, service_id, contract_date, payment, duration,
        equipment, eMac, router, rMac, total, nextPayment,model,ip;

    client_id = $("#contract-client-id").val();
    user_id = $("#contract-user-id").val();
    service_id = $(".service-card.selected").attr('data-id');
    contract_date = $('#contract-client-date').val();
    duration = $('#contract-client-months').val();
    equipment = $('#contract-equipment').val();
    eMac = $('#contract-e-mac').val();
    router = $('#contract-router').val();
    rMac = $('#contract-r-mac').val();
    model = $('#contract-equipment-model').val();
    ip = $('#contract-ip').val();

    payment = $("#contract-client-payment").val();
    nextPayment = moment(contract_date).add(1, 'months').format('YYYY-MM-DD');

    var is_empty = isEmpty([client_id, user_id, service_id, contract_date, duration]);
    if (!is_empty) {
      total = (Number(duration) + 1) * Number(payment);
      form = 'id_empleado=' + user_id + "&id_cliente=" + client_id + "&id_servicio=" + service_id + "&fecha=" + contract_date;
      form += "&duracion=" + duration + "&monto_total=" + total + "&monto_pagado=0&ultimo_pago=null";
      form += "&mensualidad=" + payment + "&proximo_pago=" + nextPayment + "&estado=activo&tabla=contratos";
      form += "&nombre_equipo=" + equipment + "&mac_equipo=" + eMac + "&router=" + router + "&mac_router=" + rMac;
      form += "&modelo="+model+"&ip="+ip;
      connectAndSend("process/add", true, null, null, form, contractSaved);
    } else {
      displayAlert("Revise","LLene todos los campos por favor","error");
    }
  }


  function extendContract(idContrato) {
    var form;
    form = 'id_contrato=' + idContrator;
    connectAndSend("process/extend", true, initContractHandlers, null, form, null);
  }

  function getContractsLastPage() {
    var form = "tabla=contratos";
    connectAndSend('process/lastpage', false, initContractHandlers, fillCurrentTable, form, null);
  }


  function contractSaved(id) {
    $("#btn-save-contract").attr("disabled", "");
    $("#btn-print-contract").removeAttr("disabled");
  }

  function callExtra() {
    var $row = $("tr.selected");
    if ($row != undefined) {
      var client = $row.find('td.th-client');
      var dni = client.attr("data-cedula");

      $("#extra-client-dni").val(dni);
      getContracts(dni);
      $('#add-extra-modal').modal();
    } else {
     displayAlert("Revise","Seleccione el conrato primero","error");
    }
  }

  function cancelContract() {
    var $row = $("tr.selected");
    var contractId = $row.find(".id_contrato").text().trim();
    var clientId = $row.find(".th-client").attr("data-id-cliente");
    var form, fecha;

    fecha = moment().format("YYYY-MM-DD");

    form = 'id_contrato=' + contractId + '&fecha=' + fecha + '&id_cliente=' + clientId;
    connectAndSend('process/cancel', true, null, null, form, getContractsLastPage)
  }

  function getContract(id_contrato, receiver) {
    form = "tabla=contratos&id_contrato=" + id_contrato;
    connectAndSend("process/getone", false, initContractHandlers, receiver, form, null)
  }

  function recieveContractForEdit(content) {
    var contract     = JSON.parse(content);
    var id_contrato  = contract['id_contrato'];
    var $equipo      = $("#u-contract-equipment");
    var $macEquipo   = $("#u-contract-e-mac");
    var $router      = $("#u-contract-router");
    var $macRouter   = $("#u-contract-r-mac");
    var $modelo      = $("#u-contract-modelo");
    var $ip          = $("#u-contract-ip");
    

    $equipo.val(contract['nombre_equipo']);
    $macEquipo.val(contract['mac_equipo']);
    $router.val(contract['router']);
    $macRouter.val(contract['mac_router']);
    $modelo.val(contract['modelo']);
    $ip.val(contract['ip']);

    $("#update-contract-modal").modal();

    $("#update-contract").on('click', function (e) {
      e.stopImmediatePropagation();
      updateContract();
    });

    function updateContract() {

      form = 'id_contrato=' + id_contrato + '&nombre_equipo=' + $equipo.val() + "&mac_equipo=" + $macEquipo.val();
      form += "&router=" + $router.val() + "&mac_router=" + $macRouter.val();
      form += "&modelo=" + $modelo.val() + "&ip=" + $ip.val();
      form += "&tabla=contratos";

      connectAndSend("process/update", true, initContractHandlers, null, form, getContractsLastPage);
    }
  }

  /********************************************************
   *                CRUD para la tabla Pago               *
   *                                                      *
   ********************************************************/

  function getPayments() {
    var id = $("#select-contract").val();
    if (id != null) {
      var form = "tabla=pagos&id=" + id;
      connectAndSend('process/getall', false, initPaymentsHandlers, fillCurrentTable, form, null);
    }
  }

  function getPaymentsLastPage() {
    var form = "tabla=pagos";
    connectAndSend('process/lastpage', false, initPaymentsHandlers, fillCurrentTable, form, null);
  }


  function updatePayment(id) {
    var abono = $("#input-abono").val();
    if (abono == 0) {
      var date = moment().format("YYYY-MM-DD");
      var id_contrato = $("#select-contract").val();
      var form = "tabla=pagos&id=" + id + "&estado=pagado&fecha_pago=" + date + "&id_contrato=" + id_contrato;
      var handlers, callback;
      connectAndSend('process/update', true, initPaymentsHandlers, null, form, getPaymentsLastPage);
    } else {
      displayAlert("Favor Leer","has click en la zona roja de abono para confirmar que le viste antes de registrar el pago","info");
    }

  };

  /********************************************************
   *                          averias                            
   *                                                       *
   ********************************************************/
  function addAveria() {

    var form, idCliente, description;

    idCliente = $("#averias-client-id").val();
    description = $("#a-description").val();

    var is_empty = isEmpty([idCliente, description]);
    if (!is_empty) {
      form = 'id_cliente=' + idCliente + "&descripcion=" + description + "&tabla=averias";
      connectAndSend("process/add", true, initGlobalHandlers, null, form, getAverias);
    } else {
      displayAlert("Revise","LLene todos los campos por favor","error");
    }
    $('#new-averia-modal').find('input,textarea').val("");
  }

  function getAverias() {
    var status = $("#averias-view-mode").val();
    $(".presentado").text(status);
    var form = "tabla=averias&estado=" + status;
    connectAndSend('process/getall', false, initGlobalHandlers, fillAveriasList, form, null);
  }

  function updateAverias($id_averia) {
    var form = "tabla=averias&id_averia=" + $id_averia;
    connectAndSend('process/update', true, initGlobalHandlers, null, form, getAverias);
  }

  /********************************************************
   *                   Caja Chica                           
   *                                                       *
   ********************************************************/

  function addAmount() {
    var form, amount, description, is_empty;

    amount = $("#caja-a-amount").val();
    description = $("#caja-a-description").val();
    form = "entrada=" + amount + "&descripcion=" + description + "&tabla=caja";
    is_empty = isEmpty([amount, description]);
    if (!is_empty) {
      connectAndSend('process/add', true, initCajaHandlers, null, form, getCajaLastPage);
    } else {
      displayAlert("Revise","LLene todos los campos por favor","error");
    }
  }

  function addAmountRetirement() {
    var form, amount, description, is_empty;

    amount = $("#caja-r-amount").val();
    description = $("#caja-r-description").val();
    form = "salida=" + amount + "&descripcion=" + description;
    is_empty = isEmpty([amount, description]);
    if (!is_empty) {
      connectAndSend('process/retire', true, initCajaHandlers, null, form, getCajaLastPage);
    } else {
      displayAlert("Revise","LLene todos los campos por favor","error");
    }
  }

  function getCajaLastPage() {
    var form = "tabla=caja";
    connectAndSend('process/lastpage', false, initCajaHandlers, fillCajaTable, form, getSaldo);
  }

  function getSaldo(){
    var form = "tabla=caja";
    connectAndSend('process/getone',false,initCajaHandlers,updateSaldo,form,null)
  }

  $("#btn-update-settings").on('click',function(e){
    e.preventDefault();
    updateSettings();
  });

  function searchInCaja() {
    var $dateSearch = $("#caja-date");
    var $userSearch = $("#caja-user");
    var date = ($dateSearch.val()) ? $dateSearch.val() : '%';
    var userId= ($userSearch.val()) ? $userSearch.val() : '%';

    var form = "tabla=caja&id_empleado=" + userId + "&fecha=" + date;
    connectAndSend('process/search', false, initCajaHandlers, fillCajaTable, form, null);
  }


/********************************************************
*                     Extra Functions                            
*                                                       *
********************************************************/


function btnExtraPressed($this){
  var buttonId = $this.text().trim().toLowerCase();
  
  switch (buttonId) {
    case "mejorar":
        upgradeContract();
      break;
    case "extender":
        extendContract();
      break;
    case "guardar":
        addExtra();
      break;
  
    default:
      break;
  }
}

function upgradeContract(){
  var form, contractId,selectedService,serviceId, amount;

  contractId        = $("#extra-client-contract").val();
  selectedService   = $(".service-card.selected");
  serviceId         = selectedService.attr("data-id");
  amount            = selectedService.attr("data-payment");
  
  var is_empty = isEmpty([contractId,serviceId, amount]);
  if(!is_empty){
    form = 'id_contrato=' + contractId + "&id_servicio=" + serviceId + "&cuota=" + amount;
    connectAndSend('process/upgrade',true,initGlobalHandlers,null,form,null)
  }else{
    displayAlert("Revise","asegurate de llenar todos los datos y seleccionar el servicio","info");
  }
}

function addExtra(){
  var form, contractId,extraService,serviceCost, equipment,eMac,router,rMac;

  contractId        = $("#extra-client-contract").val();
  serviceCost       = $("#extra-service-cost").val();
  extraService      = $("#select-extra-service").val();
  equipment         = $("#extra-equipo").val();
  eMac              = $("#extra-e-mac").val();
  router            = $("#extra-router").val();
  rMac              = $("#extra-r-mac").val();
  
  var is_empty = isEmpty([contractId,extraService,serviceCost, equipment,eMac,router,rMac]);
  if(!is_empty){
     form = 'id_contrato=' + contractId + "&costo_servicio=" + serviceCost + "&nombre_servicio=" + extraService;
     form += '&nombre_equipo=' + equipment + "&mac_equipo=" + eMac + "&router=" + router + "&mac_router=" + rMac;
    connectAndSend('process/addextra',true,initGlobalHandlers,null,form,getContractsLastPage);
  }else{
    displayAlert("revise","asegurate de llenar todos los datos y seleccionar el servicio","info");
  }
}
function extendContract(){
  var form, contractId,duration;
  contractId = $("#extra-client-contract").val();
  duration   = $("#extra-extension-months").val();
  
  var is_empty = isEmpty([duration,contractId]);
  if(!is_empty){
    form = 'id_contrato=' + contractId + "&duracion=" + duration;
    connectAndSend('process/extend_contract',true,initGlobalHandlers,null,form,getContractsLastPage)
  }else{
    displayAlert("revise","asegurate de llenar todos los datos y seleccionar el servicio","info");
  }
}

/********************************************************
*                 empresa y settings                            
*                                                       *
********************************************************/

function updateCompanyData(){
  var form,
      companyName        =$("#company-name").val(),
      companyStatement   =$("#company-statement").val(),
      companyPhone1      =$("#company-phone1").val(),
      companyDirection   =$("#company-direction").val(),
      companyDescription =$("#company-description").val(),
      companyPhone2      =$("#company-phone2").val()

  form = 'nombre='+companyName+'&lema='+companyStatement+'&descripcion='+companyDescription+"&direccion="
  form += companyDirection+"&telefono1="+companyPhone1+"&telefonos="+companyPhone2+"&tabla=empresa";
  connectAndSend('process/update',true,null,null,form,null);
}

function updateSettings(){
  var form,
      settingsCargoMora                =$("#settings-mora").val(),
      settingsFechaCorte               =$("#settings-fecha-corte").val(),
      settingsAperturaCaja             =$("#settings-apertura-caja").val(),
      settingsPenalizacionCancelacion  =$("#settings-penalizacion-cancelacion").val(),
      settingsMesesPorDefecto          = $("#settings-meses-por-defecto").val(),
      settingsSplitDay                 = $("#settings-split-day").val();

  form = 'cargo_mora=' + settingsCargoMora + '&fecha_corte=' + settingsFechaCorte + '&apertura_caja=' + settingsAperturaCaja;
  form += '&penalizacion_cancelacion=' + settingsPenalizacionCancelacion + '&meses_por_defecto=' + settingsMesesPorDefecto;
  form += '&split_day='+settingsSplitDay+'&tabla=settings';
  connectAndSend('process/update',true,null,null,form,null);  
}


});