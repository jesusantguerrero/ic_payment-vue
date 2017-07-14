  var currentPage = $("title").text().split(" ");
  currentPage = currentPage[4].toLowerCase().trim();
  var ran = false;
  
  function initComponents(){
    switch (currentPage) {
      case "home":
        initClientHandlers();
        break;
      case "administrador":
        initAdminHandlers();
        break;
      case "clientes":
        initClientHandlers();
        break;
      case "servicios":
        initServicesHandlers();
        break;
      case "nuevo_contrato":
        initContractHandlers();
        getIpList();
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
    initGlobalHandlers()
  }

  // **************************************************     globals handlers       *****************************
  function initGlobalHandlers() {
    console.log("cargados")
    if (currentPage == 'notificaciones') {
      Generals.count_table("averias");

      $("#averias-view-mode").on('change', function (e) {
        e.stopImmediatePropagation();
        Damages.getAll();
      });

       $("#installations-view-mode").on('change', function (e) {
        e.stopImmediatePropagation();
        Installations.getAll();
      });

    }

    if (currentPage == 'contratos') {
     initContractHandlers();
    }

    $("#btn-save-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      Damages.add();
    });

    $("#a-client-dni").on('keydown', function (e) {
      var key = e.which;
      var dni = $(this).val()
      if (key == 13) {
        Clients.getOne(dni,fillClientFields)
      }
    });

    $(".btn-update-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      var id_averia = $(this).parents('.averia-item').find('.code')
      id_averia = id_averia.text().trim();
      Damages.update(id_averia);
    });
    
    $(".btn-update-installation").on('click', function (e) {
      e.stopImmediatePropagation();
      var id_pago = $(this).parents('.averia-item').find('.code');
      id_pago = id_pago.text().trim();
      Installations.update(id_pago);
    });

    $("#extra-controls").on('click',function(e){
      e.stopImmediatePropagation();
      Contracts.btnExtraPressed($(this));
    });

    $("#extra-client-dni").on('keydown',function(e){
      var key = e.which;
      var dni = $(this).val()
      if(key == 13){
        Contracts.getAllOfClient(dni);
      }
    });

  }

  //***************************************************     Init Handlers          ***************************** */
  function initAdminHandlers() {
    initPagination("#t-users", "users", Generals.paginate);

    $("#btn-save-user").on('click', function (e) {
      e.stopImmediatePropagation();
      Users.add();
    });

    $("#btn-update-user").on('click', function (e) {
      e.stopImmediatePropagation();
      Users.update();
    });

    $(".delete-user").on('click', function (e) {
      e.preventDefault();
      var $row = $(this).parents("tr");
      var id = $row.find('.user-id').text().trim();
      swal({
          title: 'Está Seguro?',
          text: "Desea Eliminar al Usuario " + $row.find("td:nth(3)").text()  + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          confirmButtonBackground: SUMMER_SKY
        }).then(function(){
           Users.delete(id);
        });
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
      Company.update();
    });

    $("#btn-update-settings").on('click',function(e){
        e.preventDefault();
        Settings.update();
    });

    // some globals handlers

    $("#btn-save-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      Damages.add()
    });

  }
  //***************************************************     Init caja          ***************************** */
  
  function initCajaHandlers() {
    if (currentPage == 'administrador') {
      initPagination("#caja", "caja", Generals.paginate);
      Generals.count_table('caja');
    }
    var btnAddMoney     = $("#btn-add-money");
    var btnRetireMoney  = $("#btn-retire-money");
    var userSearch      = $("#caja-user");
    var dateSearch      = $("#caja-date");

    btnAddMoney.on('click', function (e) {
      e.stopImmediatePropagation();
      Caja.add();
    });

    btnRetireMoney.on('click', function (e) {
      e.stopImmediatePropagation();
      Caja.retire;
    });

    dateSearch.on('change',function(e){
      e.stopImmediatePropagation();
      Caja.search();
    });

    userSearch.on('change',function(e){
      e.stopImmediatePropagation();
      Caja.search();
    });
  }

  //***************************************************  Init client Handlers      ***************************** */
  function initClientHandlers() {
    if (currentPage == 'clientes') {
      count_table("clientes");
      initPagination("#t-clients", "clientes", Generals.paginate);
    }

    makeRowsClickable();
    verifyClientStatus();

    $("#btn-save-client").on('click', function (e) {
      e.stopImmediatePropagation();
      Clients.add();
    });

    $("#update-client").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var $row = $("tr.selected");
      if ($row) {
        var id = $row.find('.id_cliente').text().trim();
        Clients.getOne(id, recieveClientForEdit);
      }
    });

    $("#client-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      Generals.search(text, "clientes", fillCurrentTable);
    });

    $("#client-searcher-newcontract").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      if (!isEmpty([text])) {
        Generals.search(text, "clientes", fillClientTable);
      } else {
        clearTbody(".lobby-results");
      }
    });

    $("#delete-client").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var $row = $("tr.selected");
      if ($row.length > 0) {
        var id = $row.find('.id_cliente').text().trim();
        swal({
          title: 'Está Seguro?',
          text: "Desea Eliminar al(la) Cliente " + $row.find("td:nth(2)").text() + " " + $row.find("td:nth(3)").text() + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          confirmButtonBackground: SUMMER_SKY
        }).then(function(){
           Generals.deleteRow(id, "clientes")
        });
      }
    });

  }
  //***************************************************  Init Services Handlers    ***************************** */
  function initServicesHandlers() {
    count_table("servicios");
    initPagination("#t-services", "servicios", Generals.paginate);
    makeRowsClickable();

    $("#btn-save-service").on('click', function (e) {
      e.stopImmediatePropagation();
      Services.add();
    });

    $("#delete-service").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var $row = $("tr.selected");
      if ($row.length > 0  ) {
        var id = $row.find('.id_servicio').text().trim();
        swal({
          title: 'Está Seguro?',
          text: "Desea Eliminar  Este Servicio?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          confirmButtonBackground: SUMMER_SKY
        }).then(function(){
           Generals.deleteRow(id, "servicios");
        });
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
      Services.update();
    });

     $("#service-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      Generals.search(text, "servicios", fillCurrentTable,initServicesHandlers);
    });
  }
  //***************************************************  Init Contract Handlers    ***************************** */
  function initContractHandlers() {
    count_table('contratos');
    initPagination("#t-contracts", "v_contratos", Generals.paginate);
    makeRowsClickable();

    $("#btn-save-contract").on('click', function (e) {
      e.stopImmediatePropagation();
      Contracts.add();
    });

    $("#btn-add-extra").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      Contracts.callExtra();
    });
    var cont = 0;

    $("#contract-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      Generals.search(text, "v_contratos", fillCurrentTable,initContractHandlers);
    });

    $("#btn-cancel-contract").on('click', function (e) {
      e.preventDefault();
      var $row = $("tr.selected");
      var cells = $row.find("td");

      if ($row != undefined) {
        $(".cancel-name").text(cells.eq(2).text());
        var $inputElement = $(".confirmed-data");
        var $buttonToActive = $("#cancel-permanently");
        var contractId  = $row.find(".id_contrato").text().trim();
        var clientId    = $row.find(".th-client").attr("data-id-cliente");

        deleteValidation($inputElement, $buttonToActive);
        $("#cancel-print").attr("href",BASE_URL + 'process/getcancelcontract/'+ clientId + "/" + contractId);

        $("#cancel-contract-modal").modal();
        $buttonToActive.on('click', function (e) {
          e.stopImmediatePropagation();
          Contracts.cancel()
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
        Contracts.getOne(id, Clients.recieve);
      }
    });

    $("#select-contract-sector").on('change',function(e){
      e.stopImmediatePropagation();
      Contracts.getIpList();
    })

  }

  //***************************************************  Init Payments  Handlers   ***************************** */
  function initPaymentsHandlers() {
    if (!ran) {
      getPayments();
      ran = true;
    }

    verifyPaymentStatus();
    initPagination('#t-pagos', 'pagos_por_contrato', Generals.paginate);
    count_table("pagos_por_contratos");


    $("#btn-pay").on('click', function (e) {
      e.stopImmediatePropagation();
      var $row = $("tr.selected");
      if ($row) {
        var id = $row.find('.id_pago').attr("data-id").trim();
        Payments.update(id);
      }
    });

    $("#select-contract").on('change', function (e) {
      e.stopImmediatePropagation();
      Payments.getAll();
    });

    makeRowsClickable();
  }

  //***************************************************      detail Handlers       ***************************** */
  function detailHandlers() {
    $("#btn-save-observations").on('click', function (e) {
      e.stopImmediatePropagation();
      Clients.saveObservations()
    })

    $(".abono-value").on('click', function (e) {
      e.stopImmediatePropagation();
      Clients.saveObservations(true);
    })

  }

  $(function () {
    initComponents()
    console.log("corrio esta vaina")
  });