webpackJsonp([1],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__userTable__ = __webpack_require__(102);



class users {
  constructor() {
    Object(__WEBPACK_IMPORTED_MODULE_0__handlers__["a" /* default */])(this);
    this.userTable = new __WEBPACK_IMPORTED_MODULE_1__userTable__["a" /* default */](this);
    this.userTable.init();
  }

  add() {
    const self = this;
    const nick = $('#user-nickname').val();
    const password = $('#user-password').val();
    const name = $('#user-name').val();
    const lastname = $('#user-lastname').val();
    const dni = getVal($('#user-dni'));
    const type = $('#user-type').val();
    const empty = isEmpty([nick, password, name, lastname, dni, type]);

    if (!empty) {
      const form = `nickname=${nick}&password=${password}&name=${name}&lastname=${lastname}&dni=${dni}&type=${type}`;
      this.send('add', form)
        .then((res) => {
          displayMessage(res.data);
          self.getAll();
        });
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
  }

  update() {
    const nick = $('#e-nickname').val();
    const name = $('#e-name').val();
    const lastname = $('#e-lastname').val();
    const dni = $('#e-dni').val();
    const type = $('#e-type').val();
    const empty = isEmpty([nick, name, lastname, dni, type]);
    const self = this;

    if (!empty) {
      const form = `nickname=${nick}&name=${name}&lastname=${lastname}&dni=${dni}&type=${type}`;
      this.send('update', form)
        .then(() => {
          self.getAll();
        });
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
  }

  getAll() {
    const form = 'table=users';
    const self = this;
    this.send('get_users', form)
      .then((res) => {
        self.userTable.refresh(res.data);
      });
  }

  delete(id) {
    const self = this;
    const form = `user_id=${id}`;
    this.send('delete_user', form)
      .then((res) => {
        displayMessage(res.data);
        self.getAll();
      });
  }

  changeState(id) {
    const self = this;
    const form = `user_id=${id}`;
    this.send('change_state', form)
      .then(() => {
        self.getAll();
      });
  }

  send(endpoint, data) {
    return axios.post(`${BASE_URL}user/${endpoint}`, data);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = users;



/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((Users) => {
  $('#btn-save-user').on('click', (e) => {
    e.stopImmediatePropagation();
    Users.add();
  });

  $('#btn-update-user').on('click', (e) => {
    e.stopImmediatePropagation();
    Users.update();
  });
});


/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class userTable {
  constructor(Users) {
    this.Users = Users;
  }

  init(page) {
    const self = this;
    this.el = $('#t-users');
    this.el.bootstrapTable();
    this.el.find('tbody').css({
      display: 'table-row-group'
    });

    this.el.addClass('innertable');
    this.clickEvents();

    if (page) {
      this.el.bootstrapTable('selectPage', page);
    }

    this.el.on('all.bs.table', () => {
      self.clickEvents();
    });
  }

  getSelectedRow() {
    return this.el.bootstrapTable('getSelections')[0];
  }

  getId() {
    return $.map(this.el.bootstrapTable('getSelections'), row => row.id);
  }

  getRow(id) {
    const data = this.el.bootstrapTable('getRowByUniqueId', id);
    return data;
  }

  refresh(content, callback) {
    const options = this.el.bootstrapTable('getOptions');

    this.el.bootstrapTable('destroy');
    this.el.find('tbody').html(content);
    this.init(options.pageNumber);
    if (callback) { callback(); }
  }

  clickEvents() {
    const self = this;
    $('.delete-user').on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const $row = $(this).parents('tr');
      const id = $row.find('.user-id').text().trim();
      const row = self.getRow(id);
      swal({
        title: 'Está Seguro?',
        text: `Desea Eliminar al Usuario ${row.nombres} ${row.apellidos}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Estoy Seguro!',
        cancelButtonText: 'Cancelar'
      }).then(() => {
        self.Users.delete(id);
      });
    });

    $('.btn-change-state').on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const $row = $(this).parents('tr');
      const id = $row.find('.user-id').text().trim();
      const row = self.getRow(id);
      self.Users.changeState(id);
    });

    $('.edit-user').on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const id = $(this).attr('data-user-id');
      const row = self.getRow(id);

      $('#e-nickname').val(row.nick);
      $('#e-name').val(row.nombres);
      $('#e-lastname').val(row.apellidos);
      $('#e-dni').val(row.cedula);
      $('#e-type').val(row.tipo_codigo);
      $('#update-user-modal').modal();
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = userTable;



/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__damages__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__installations__ = __webpack_require__(19);



class notifications {
  constructor() {
    console.log('here');
    console.log(__WEBPACK_IMPORTED_MODULE_0__damages__["a" /* default */]);
    console.log(__WEBPACK_IMPORTED_MODULE_1__installations__["a" /* default */]);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = notifications;



/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((Clients,Contracts, Payments) => {
      var $clientName = $('#detail-client-name');

      $("#btn-save-observations").on('click', function (e) {
        e.stopImmediatePropagation();
        Payments.saveAbonos();
      });

      $('#btn-save-real-observations').on('click', function (e) {
        e.stopImmediatePropagation();
        Clients.saveObservations();
      })

      detailsContractTable.init();

      $("#btn-detail-suspend-contract").on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var row = detailsContractTable.getSelectedRow();
        if (row) {
          swal({
            title: 'Está Seguro?',
            text: "Desea Suspender el contrato de " + $clientName.val() + " ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Estoy Seguro',
            cancelButtonText: 'Cancelar'
          }).then(function () {
            Contracts.suspend(row.id_contrato, Payments.contractRefresh);
          });
        } else {
          swal("Debe seleccionar un contrato")
        }
      });

      $("#btn-call-reconnect").on('click', function (e) {
        e.stopImmediatePropagation()
        var row = detailsContractTable.getSelectedRow();
        if (row) {
          $("#reconnect-modal").modal();
        } else {
          swal("Debe seleccionar un contrato primero");
        }
      })

      $("#btn-reconnect").on('click', function (e) {
        e.stopImmediatePropagation()
        var row = detailsContractTable.getSelectedRow();
        if (row) {
          Contracts.reconnect(row.id_contrato, Payments.contractRefresh);
        }
      })

      $('#btn-call-extra').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var context = 'details';
        Contracts.callExtra(context);
      })
    });


/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  add(idCliente) {
    const description = $('#a-description').val();

    const empty = isEmpty([idCliente, description]);
    if (!empty) {
      const form = `id_cliente=${idCliente}&descripcion=${description}&tabla=averias`;
      connectAndSend('process/add', true, initGlobalHandlers, null, form, Damages.getAll);
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
    $('#new-averia-modal').find('input,textarea').val('');
  },

  getAll() {
    const status = $('#averias-view-mode').val();
    $('.presentado').text(status);
    const form = `tabla=averias&estado=${status}`;
    connectAndSend('process/getall', false, initGlobalHandlers, fillAveriasList, form, null);
  },

  update($idAveria) {
    const form = `tabla=averias&id_averia=${$idAveria}`;
    connectAndSend('process/update', true, initGlobalHandlers, null, form, Damages.getAll);
  }
});


/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  getAll() {
    const status = $('#installations-view-mode').val();
    const form = `tabla=instalaciones&estado=${status}`;
    connectAndSend('process/getall', false, initGlobalHandlers, fillInstallationsList, form, null);
  },

  update($idPago) {
    const form = `tabla=instalaciones&id_pago=${$idPago}`;
    connectAndSend('process/update', true, initGlobalHandlers, null, form, Installations.getAll);
  }
});


/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clients__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__generals__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contracts__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__payments__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__company__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sections__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__users__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__notificaciones__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__details_handlers__ = __webpack_require__(104);












const cGenerals = new __WEBPACK_IMPORTED_MODULE_1__generals__["a" /* default */]();

function initComponents() {
  switch (currentPage) {
    case 'home': {
      const cClients = new __WEBPACK_IMPORTED_MODULE_0__clients__["a" /* default */]();
    }
      break;
    case 'administrador': {
      const cCompany = new __WEBPACK_IMPORTED_MODULE_5__company__["a" /* default */]();
      const cSettings = new __WEBPACK_IMPORTED_MODULE_6__settings__["a" /* default */]();
      const cUsers = new __WEBPACK_IMPORTED_MODULE_8__users__["a" /* default */]();
    }
      break;
    case 'clientes': {
      const cClients = new __WEBPACK_IMPORTED_MODULE_0__clients__["a" /* default */]();
    }
      break;
    case 'servicios': {
      const cServices = new __WEBPACK_IMPORTED_MODULE_2__services__["a" /* default */]();
    }
      break;
    case 'notificaciones': {
      const cNotifications = new __WEBPACK_IMPORTED_MODULE_9__notificaciones__["a" /* default */]();
    }
      break;
    case 'secciones': {
      const cSections = new __WEBPACK_IMPORTED_MODULE_7__sections__["a" /* default */]();
    }
      break;
    case 'nuevo_contrato': {
      const nContracts = new __WEBPACK_IMPORTED_MODULE_3__contracts__["a" /* default */]();
    }
      break;
    case 'detalles': {
      const dClients = new __WEBPACK_IMPORTED_MODULE_0__clients__["a" /* default */]();
      const dPayments = new __WEBPACK_IMPORTED_MODULE_4__payments__["a" /* default */]();
      const dContracts = new __WEBPACK_IMPORTED_MODULE_3__contracts__["a" /* default */]();
      Object(__WEBPACK_IMPORTED_MODULE_10__details_handlers__["a" /* default */])(dClients, dContracts, dPayments);
    }
      break;
    case 'contratos': {
      const cContracts = new __WEBPACK_IMPORTED_MODULE_3__contracts__["a" /* default */]();
      const cClients = new __WEBPACK_IMPORTED_MODULE_0__clients__["a" /* default */]();
      break;
    }
    default:
      break;
  }
}

$(() => {
  initComponents();
});


/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers__ = __webpack_require__(85);


class clients {
  constructor() {
    Object(__WEBPACK_IMPORTED_MODULE_0__handlers__["a" /* default */])(this);
    console.log('aqui en clientes');
  }

  add() {
    const self = this;
    const nombres = $('#client-name').val();
    const apellidos = $('#client-lastname').val();
    const cedula = getVal($('#client-dni'));
    const celular = getVal($('#client-phone'));
    const provincia = $('#client-provincia').val();
    const sector = $('#client-sector').val();
    const calle = $('#client-street').val();
    const casa = $('#client-house').val();
    const detallesDireccion = $('#client-direction-details').val();
    const telefono = getVal($('#client-telephone'));
    const lugarTrabajo = $('#client-job').val();
    const telTrabajo = getVal($('#client-job-telephone'));
    const ingresos = $('#client-salary').val();
    const fechaRegistro = moment().format('YYYY-MM-DD');
    const estado = 'no activo';
    let form;

    const empty = isEmpty([nombres, apellidos, cedula, celular, provincia, sector, calle,
      casa, telefono]);

    if (!empty) {
      form = `nombres=${nombres}&apellidos=${apellidos}&cedula=${cedula}&celular=${celular}`;
      form += `&provincia=${provincia}&sector=${sector}&calle=${calle}&casa=${casa}&telefono=${telefono}`;
      form += `&lugar_trabajo=${lugarTrabajo}&tel_trabajo=${telTrabajo}&ingresos=${ingresos}&fecha_registro=${fechaRegistro}`;
      form += `&estado=${estado}&detalles_direccion=${detallesDireccion}&tabla=clientes`;

      this.send('add', form);
      then((res) => {
        self.getAll();
        displayMessage(res.data);
      });
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
  }

  getAll() {
    const form = 'tabla=clientes';
    this.send('getall', form)
      .then((res) => {
        clientTable.refresh(res.data);
      });
  }

  getOne(id) {
    const self = this;
    const form = `tabla=clientes&id=${id}`;
    this.send('getone', form)
      .then((res) => {
        self.receiveForEdit(res.data);
      });
  }

  delete(id) {
    const form = `tabla=clientes&id=${id}`;
    const self = this;
    this.send('process/delete', form)
      .then((res) => {
        displayMessage(res.data);
        self.getAll();
      });
  }

  search(word) {
    const form = `tabla=clientes&word=${word}`;
    this.send('search', form);
    then((res) => {
      fillCurrentTable(res.data);
    });
  }

  receiveForEdit(content) {
    const client = JSON.parse(content);
    this.id = client.id_cliente;
    const $nombres = $('#u-client-name');
    const $apellidos = $('#u-client-lastname');
    const $cedula = $('#u-client-dni');
    const $celular = $('#u-client-phone');
    const $provincia = $('#u-client-provincia');
    const $sector = $('#u-client-sector');
    const $calle = $('#u-client-street');
    const $casa = $('#u-client-house');
    const $detallesDireccion = $('#u-client-direction-details');
    const $telefono = $('#u-client-telephone');
    const $lugarTrabajo = $('#u-client-job');
    const $telTrabajo = $('#u-client-job-telephone');
    const $ingresos = $('#u-client-salary');

    $nombres.val(client.nombres);
    $apellidos.val(client.apellidos);
    $cedula.val(client.cedula);
    $celular.val(client.celular);
    $provincia.val(client.provincia);
    $sector.val(client.sector);
    $calle.val(client.calle);
    $casa.val(client.casa);
    $detallesDireccion.val(client.detalles_direccion);
    $telefono.val(client.telefono);
    $lugarTrabajo.val(client.lugar_trabajo);
    $telTrabajo.val(client.tel_trabajo);
    $ingresos.val(client.salario);

    function updateClient() {
      const self = this;
      const empty = isEmpty([$nombres.val(), $apellidos.val(), $cedula.val(), $celular.val(),
        $provincia.val(), $sector.val(), $calle.val(), $casa.val(), $telefono.val()
      ]);

      if (!empty) {
        form = `id=${id}&nombres=${$nombres.val()}&apellidos=${$apellidos.val()}&cedula=${getVal($cedula)}`;
        form += `&celular=${getVal($celular)}&provincia=${$provincia.val()}&sector=${$sector.val()}&calle=${$calle.val()}`;
        form += `&casa=${$casa.val()}&detalles_direccion=${$detallesDireccion.val()}&telefono=${getVal($telefono)}&lugar_trabajo=${$lugarTrabajo.val()}&tel_trabajo=`;
        form += `${getVal($telTrabajo)}&tabla=clientes`;
        form += `&ingresos=${$ingresos.val()}`;

        this.send('update', form);
        then((res) => {
          self.getAll();
          displayMessage(res.data);
        });
      } else {
        displayAlert('Revise', 'LLene todos los campos por favor', 'error');
      }
    }

    $('#update-client-modal').modal();
    $('#btn-update-client').on('click', () => {
      updateClient();
    });
  }

  saveObservations() {
    const observations = $('#text-observations').val();
    const idCliente = $('#detail-client-id').val();
    const form = `observaciones=${observations}&tabla=observaciones&id_cliente=${idCliente}`;

    this.send('update', form);
    then((res) => {
      displayMessage(res.data);
    });
  }

  updateState(client) {
    const form = `data=${JSON.stringify(client)}&module=clientes&action=update`;
    this.send('getjson', form);
    then((res) => {
      displayMessage(res.data);
    });
  }

  send(endpoint, data) {
    return axios.post(`${BASE_URL}process/${endpoint}`, data);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = clients;



/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((Clients) => {
  if (currentPage == 'clientes') {
    clientTable.init();
  }

  $('#btn-save-client').on('click', (e) => {
    e.stopImmediatePropagation();
    Clients.add();
  });

  $('#update-client').on('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const id = clientTable.getId();
    if (id) {
      Clients.getOne(id, Clients.receiveForEdit);
    }
  });

  $('#client-searcher').on('keyup', function (e) {
    e.stopImmediatePropagation();
    const text = $(this).val();
    Clients.search(text);
  });

  $('#client-searcher-newcontract').on('keyup', function (e) {
    e.stopImmediatePropagation();
    const text = $(this).val();
    if (!isEmpty([text])) {
      Clients.search(text);
    } else {
      clearTbody('.lobby-results');
    }
  });

  $('#delete-client').on('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const row = clientTable.getSelectedRow();
    if (row) {
      swal({
        title: 'Está Seguro?',
        text: `Desea Eliminar al(la) Cliente ${row.nombres} ${row.apellidos}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Estoy Seguro!',
        cancelButtonText: 'Cancelar'
      }).then(() => Clients.deleteRow(row.id));
    }
  });
});


/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers__ = __webpack_require__(87);


class generals {
  constructor() {
    Object(__WEBPACK_IMPORTED_MODULE_0__handlers__["a" /* default */])(this);
  }


  static search(text, dbTable, fillTableFunction, handlerFunction) {
    if (handlerFunction === undefined) handlerFunction = initClientHandlers;
    if (fillTableFunction === undefined) fillTableFunction = fillCurrentTable;
    const word = text;
    if (word != null || word !== '') {
      const form = `tabla=${dbTable}&word=${word}`;
      connectAndSend('process/search', false, handlerFunction, fillTableFunction, form, null);
    }
  }

  static countTable(table) {
    const form = `tabla=${table}`;
    let updateFunction = updateCount;
    if (table === 'caja') updateFunction = updateCajaCount;
    connectAndSend('process/count', false, null, updateFunction, form, null);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = generals;



/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notificaciones_damages__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notificaciones_installations__ = __webpack_require__(19);



/* harmony default export */ __webpack_exports__["a"] = ((Generals) => {
  function initGlobalHandlers() {
    const averiaClientDni = $("#a-client-dni");

    if (currentPage == 'notificaciones') {

      Generals.count_table("averias");

      $("#averias-view-mode").on('change', function (e) {
        e.stopImmediatePropagation();
        __WEBPACK_IMPORTED_MODULE_0__notificaciones_damages__["a" /* default */].getAll();
      });

      $("#installations-view-mode").on('change', function (e) {
        e.stopImmediatePropagation();
        __WEBPACK_IMPORTED_MODULE_1__notificaciones_installations__["a" /* default */].getAll();
      });

      $('tbody').css({
        display: "table-row-group"
      });
    }

    var averiaClient = $("#a-client").select2({
      dropdownParent: $('#new-averia-modal'),
      width: '100%',
      ajax: {
        url: BASE_URL + 'process/search',
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            q: params.term,
            tabla: 'clientes_para_averias'
          }
        },

        processResults: function (data, params) {
          params.page = params.page || 1
          return {
            results: data.items,
            pagination: {
              more: (params.page * 30) < data.total_count
            }
          }
        },
        cache: true
      }
    })

    $("#btn-save-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      __WEBPACK_IMPORTED_MODULE_0__notificaciones_damages__["a" /* default */].add(averiaClient.val());
    });

    $(".btn-update-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      var id_averia = $(this).parents('.averia-item').find('.code')
      id_averia = id_averia.text().trim();
      __WEBPACK_IMPORTED_MODULE_0__notificaciones_damages__["a" /* default */].update(id_averia);
    });

    $(".btn-update-installation").on('click', function (e) {
      e.stopImmediatePropagation();
      var id_pago = $(this).parents('.averia-item').find('.code');
      id_pago = id_pago.text().trim();
      __WEBPACK_IMPORTED_MODULE_1__notificaciones_installations__["a" /* default */].update(id_pago);
    });

    $("#extra-controls").on('click', function (e) {
      const Contracts = new contracts();

      e.stopImmediatePropagation();
      Contracts.btnExtraPressed($(this));
    });

    $("#extra-client-dni").on('keydown', function (e) {
      const Contracts = new contracts();

      var key = e.which;
      var dni = $(this).val()
      if (key == 13) {
        Contracts.getAllOfClient(dni);
      }
    });

  }
});


/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers__ = __webpack_require__(89);


class services {
  constructor() {
    Object(__WEBPACK_IMPORTED_MODULE_0__handlers__["a" /* default */])(this);
  }

  add() {
    var form, name, description, payment, type;

    name        = $("#service-name").val();
    description = $("#service-description").val();
    payment     = $("#service-monthly-payment").val();
    type        = $("#service-type").val();

    var is_empty = isEmpty([name, description, payment, type]);
    if (!is_empty) {
      form = 'nombre=' + name + "&descripcion=" + description + "&mensualidad=" + payment + "&tipo=" + type;
      form += "&tabla=servicios";
      connectAndSend("process/add", true, null, null, form, Services.getAll);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  }

  getAll () {
    var form = "tabla=servicios";
    connectAndSend('process/getall', false, null, serviceTable.refresh, form, null);
  }

  update () {
    var form, id, name, description, payment, type;

    id          = $('#u-service-id').val();
    name        = $('#u-service-name').val();
    description = $('#u-service-description').val();
    payment     = $('#u-service-monthly-payment').val();
    type        = $('#u-service-type').val();

    var is_empty = isEmpty([id, name, description, payment, type]);
    if (!is_empty) {
      form = 'id_servicio=' + id + "&nombre=" + name + "&descripcion=" + description + "&mensualidad=" + payment;
      form += "&tipo=" + type + "&tabla=servicios";
      connectAndSend("process/update", true, null, null, form, Services.getAll,heavyLoad);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = services;



/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((Services) => {
    serviceTable.init();

    $("#btn-save-service").on('click', function (e) {
      e.stopImmediatePropagation();
      Services.add();
    });

    $("#delete-service").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var id = serviceTable.getId();
      if (id) {
        swal({
          title: 'Está Seguro?',
          text: "Desea Eliminar  el Servicio?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function () {
          Generals.deleteRow(id, "servicios");
        });
      }
    });

    $("#edit-service").on('click', function (e) {
      e.preventDefault();
      var row = serviceTable.getSelectedRow();

      $('#u-service-id').val(row.id);
      $('#u-service-name').val(row.nombre);
      $('#u-service-description').val(row.descripcion);
      $('#u-service-monthly-payment').val(Number(row.mensualidad.replace("RD$ ", '')));
      $('#u-service-type').val(row.tipo);
      $('#update-service-modal').modal();

    });

    $("#btn-update-service").on('click', function (e) {
      e.stopImmediatePropagation();
      Services.update();
    });
});


/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers__ = __webpack_require__(91);

//TODO: change to axios:


class contracts {
  constructor() {
    this.ran = false
    Object(__WEBPACK_IMPORTED_MODULE_0__handlers__["a" /* default */])(this);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = contracts;



/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((Contracts) => {
  if (currentPage == 'contratos') {
    contractTable.init();
    Contracts.getAll();
  }

  $("#btn-save-contract").on('click', function (e) {
    e.stopImmediatePropagation();
    Contracts.add();
  });

  $("#btn-add-extra").on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    Contracts.callExtra();
  });

  $("#btn-cancel-contract, #btn-detail-cancel-contract").on('click', function (e) {
    e.preventDefault();
    var row, callback
    if (currentPage == 'contratos') {
      row = contractTable.getSelectedRow();
      callback = Contracts.getAll;
    } else {
      row = detailsContractTable.getSelectedRow();
      row.id = row.id_contrato;
      row.id_cliente = $('#datail-client-id').val();
      row.cliente = $('#detail-client-name').val();
      callback = Payments.contractRefresh;
    }

    if (row) {
      $(".cancel-name").text(row.cliente);
      var $inputElement = $(".confirmed-data");
      var $buttonToActive = $("#cancel-permanently");

      deleteValidation($inputElement, row.cliente, $buttonToActive);
      $("#cancel-print").attr("href", BASE_URL + 'process/getcancelcontract/' + row.id);

      $("#cancel-contract-modal").modal();

      $buttonToActive.on('click', function (e) {
        e.stopImmediatePropagation();
        Contracts.cancel(row, callback)
        $buttonToActive.attr('disable');
      })

      $inputElement.val('');
      $('#cancel-contract-modal .alert').removeClass('hide');
      $buttonToActive.attr('disabled', '');
    } else {
      swal("Debes seleccionar un contrato")
    }
  });

  $("#btn-suspend-contract").on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var row = contractTable.getSelectedRow();
    if (row) {
      swal({
        title: 'Está Seguro?',
        text: "Desea Suspender el contrato de " + row.cliente + " ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Estoy Seguro',
        cancelButtonText: 'Cancelar'
      }).then(function () {
        Contracts.suspend(row.id);
      });
    } else {
      swal("Debe seleccionar un contrato")
    }
  });

  $("#btn-update-contract").on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var id = contractTable.getId();
    if (id) {
      Contracts.getOne(id, Contracts.recieve);
    }
  });

  $("#select-contract-sector").on('change', function (e) {
    e.stopImmediatePropagation();
    Contracts.getIpList();
  })

  $('#select-pay-until').on('change', function (e) {
    e.stopImmediatePropagation();
    var $this = $('#select-pay-until :selected');
    var contractId = $this.attr('data-contract');
    var lastPaymentId = $(this).val();
    Payments.updateUntil(contractId, lastPaymentId);
  });
});


/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers__ = __webpack_require__(93);


class payments {
  constructor() {
    this.ran = false;
    this.hasChanged = false;
    Object(__WEBPACK_IMPORTED_MODULE_0__handlers__["a" /* default */])(this);
  }

  getAll() {
    const id = $('#select-contract').val();
    if (id != null) {
      const form = `tabla=pagos&id=${id}`;
      connectAndSend('process/getall', false, null, paymentTable.refresh, form, Payments.contractRefresh);
    }
  }

  update(id) {
    const date = moment().format('YYYY-MM-DD');
    const idContrato = $('#select-contract').val();
    const form = `tabla=pagos&id=${id}&estado=pagado&fecha_pago=${date}&id_contrato=${idContrato}`;
    connectAndSend('process/update', true, null, null, form, Payments.getAll);
  }

  saveAbonos() {
    const $textAbono = $('#text-abono-detail');
    const observations = $textAbono.val();
    const contractId = $('#select-contract').val();
    const $inputAbono = $('#input-abono');
    const abono = $inputAbono.val();

    const form = `observaciones=${observations}&abonos=${abono}&contrato_abono=${contractId}&tabla=abonos`;
    connectAndSend('process/update', true, null, null, form, Payments.getAll);
    $inputAbono.val('');
  }

  saveExtra() {
    axios.post(`${BASE_URL}process/`);
  }

  updateUntil(contractId, lastPaymentId) {
    const form = `tabla=pagos_al_dia&id_ultimo_pago=${lastPaymentId}&estado=pagado&id_contrato=${contractId}`;
    connectAndSend('process/update', true, null, null, form, null, heavyLoad);
  }

  removePayment(id) {
    const form = `tabla=deshacer_pago&id_pago=${id}`;
    connectAndSend('process/update', true, null, null, form, Payments.getAll);
  }

  contractRefresh() {
    const idCliente = $('#detail-client-id').val();
    const form = `tabla=contratos_cliente&id=${idCliente}`;
    connectAndSend('process/getall', false, null, detailsContractTable.refresh, form, null);
  }

  getOne(idPago) {
    const self = this;
    const form = `tabla=pagos&id_pago=${idPago}`;
    axios.post(`${BASE_URL}process/getone`, form)
      .then((res) => {
        self.receiveForEdit(res.data);
      });
  }

  receiveForEdit(data) {
    const self = Payments;
    const { pago, settings } = data;
    self.idContrato = pago.id_contrato;
    self.idPago = pago.id_pago;
    const $concepto = $('#payment-concept');
    const $fechaLimite = $('#payment-limit-date');
    const $serviciosExtra = $('#payment-extra-services');
    const $cuota = $('#payment-cuota');
    const $mora = $('#payment-mora');
    const $extra = $('#payment-extra');
    const $total = $('#payment-total');
    const $descuento = $('#payment-discount-amount');
    const $razon = $('#payment-discount-reason');
    const $modal = $('#advanced-payment');
    const $cMora = $('#c_mora');
    const $cReconexion = $('#c_reconexion');


    function applyDiscount(idPago) {
      const date = moment().format('YYYY-MM-DD');
      const form = `id_pago=${idPago}&id_contrato=${self.idContrato}&cuota=${$cuota.val()}
        &mora=${$mora.val()}&monto_extra=${$extra.val()}
        &total=${$total.val()}&descuento=${$descuento.val()}&razon_descuento=${$razon.val()}
        &fecha_pago=${date}&detalles_extra=${$serviciosExtra.val()}&tabla=discount_pagos`;

      connectAndSend('process/update', true, null, null, form, Payments.getAll);
      $modal.hide();
    }

    function apply() {
      applyDiscount(self.idPago);
      $modal.hide();
      $modal.modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }

    function interactiveSum() {
      $('.payment-sumandos').on('keyup', () => {
        $cuota.val(pago.cuota - $descuento.val());
        const suma = Number($cuota.val()) + Number($mora.val()) + Number($extra.val());
        $total.val(Number(suma));
      });
    }

    $concepto.val(pago.concepto);
    $fechaLimite.val(pago.fecha_limite);
    $cuota.val(pago.cuota);
    $mora.val(pago.mora);
    $extra.val(pago.monto_extra);
    $total.val(pago.total);
    $serviciosExtra.val(pago.detalles_extra);
    interactiveSum();

    $modal.modal();

    if (pago.mora > 0) {
      $cMora.iCheck('check');
      Payments.hasChanged = true;
    } else {
      $cMora.iCheck('uncheck');
      Payments.hasChanged = true;
    }

    if (pago.detalles_extra.includes('Reconexion')) {
      $cReconexion.iCheck('check');
      Payments.hasChanged = true;
    } else {
      $cReconexion.iCheck('uncheck');
      Payments.hasChanged = true;
    }


    $('#btn-apply-discount').on('click', (e) => {
      e.stopImmediatePropagation();
      if ($descuento.val() > 0) {
        swal({
          title: 'Está Seguro?',
          text: `Seguro de que quiere aplicar este descuento de ${$descuento.val()}?`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(() => {
          apply();
        });
      } else {
        apply();
      }
    });

    if (!this.ran) {
      this.ran = true;
      $modal.on('hide.bs.modal', () => {
        $modal.find('input').val('');
      });

      $cMora.on('ifChecked', () => {
        const mora = (pago.cuota * settings.cargo_mora) / 100;
        Payments.setMora(mora, self.idPago)
          .then(() => {
            self.getOne(self.idPago, self.receiveForEdit);
          });
      });

      $cReconexion.on('ifChecked', () => {
        Payments.setExtra(0, self.idPago)
          .then(() => {
            self.getOne(self.idPago, self.receiveForEdit);
          });
      });

      $cMora.on('ifUnchecked', () => {
        Payments.setMora(0, self.idPago)
          .then(() => {
            self.getOne(self.idPago, self.receiveForEdit);
          });
      });

      $cReconexion.on('ifUnchecked', () => {
        Payments.deleteExtra(0, self.idPago)
          .then(() => {
            self.getOne(self.idPago, self.receiveForEdit);
          });
      });

      $modal.on('hide.bs.modal', () => {
        if (Payments.hasChanged) {
          Payments.hasChanged = false;
          Payments.getAll();
        }
      });
    }
  }

  deleteExtra(key, idPago) {
    const form = `data=${JSON.stringify({ key, id_pago: idPago })}`;
    return axios.post(`${BASE_URL}payment/delete_extra`, form)
      .then((res) => {
        displayMessage(res.data.mensaje);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setExtra(key, idPago) {
    const form = `data=${JSON.stringify({ key, id_pago: idPago })}`;
    return axios.post(`${BASE_URL}payment/set_extra`, form)
      .then((res) => {
        displayMessage(res.data.mensaje);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setMora(mora, idPago) {
    const form = `data=${JSON.stringify({ mora, id_pago: idPago })}`;
    return axios.post(`${BASE_URL}payment/set_mora`, form)
      .then((res) => {
        displayMessage(res.data.mensaje);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = payments;



/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

function updateMode(id) {
  const mode = $('.payment-mode.selected').text();
  const extraInfo = {
    id: id.toString(),
    module: 'pagos'
  };
  const form = `data=${JSON.stringify({
    tipo: mode
  })}&extra_info=${JSON.stringify(extraInfo)}`;

  axios.post(`${BASE_URL}process/axiosupdate`, form);
}

/* harmony default export */ __webpack_exports__["a"] = ((Payments) => {
  paymentTable.init();
  extraTable.init();
  if (!Payments.ran) {
    Payments.getAll();
    Payments.ran = true;
  }

  $('#btn-pay').on('click', (e) => {
    e.stopImmediatePropagation();
    const id = paymentTable.getId();
    if (id) {
      Payments.update(id);
      updateMode(id);
    } else {
      displayMessage(`${MESSAGE_INFO} Debes seleccionar un pago`);
    }
  });

  $('#select-contract').on('change', (e) => {
    e.stopImmediatePropagation();
    Payments.getAll();
  });

  $('#payment-detail-box').collapse();
});


/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers__ = __webpack_require__(95);


class company {
  constructor() {
    Object(__WEBPACK_IMPORTED_MODULE_0__handlers__["a" /* default */])(this);
  }

  update() {
    const companyName = $('#company-name').val();
    const companyStatement = $('#company-statement').val();
    const companyPhone1 = getVal($('#company-phone1'));
    const companyDirection = $('#company-direction').val();
    const companyDescription = $('#company-description').val();
    const companyPhone2 = getVal($('#company-phone2'));

    const form = `nombre=${companyName}&lema=${companyStatement}&descripcion=${companyDescription}&direccion=
    ${companyDirection}&telefono1=${companyPhone1}&telefonos=${companyPhone2}&tabla=empresa`;

    axios.post(`${BASE_URL}process/update`, form)
      .then((res) => {
        displayMessage(res.data);
      });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = company;



/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((Company) => {
  $("#update-company-data").on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    Company.update();
  });
});


/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers__ = __webpack_require__(97);


class settings {
  constructor() {
    Object(__WEBPACK_IMPORTED_MODULE_0__handlers__["a" /* default */])(this);
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = settings;



/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((settings) => {
  $("#btn-update-settings").on('click', function (e) {
    e.preventDefault();
    settings.update();
  });
});


/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers__ = __webpack_require__(99);

class sections {
  constructor() {
    this.ran = false;
    Object(__WEBPACK_IMPORTED_MODULE_0__handlers__["a" /* default */])(this);
  }
  add() {
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3']
    });

    const steps = [{
      title: 'Nombre del sector'
    },
    'Codigo del Sector',
    ];

    swal.queue(steps).then(function (result) {
      swal.resetDefaults();
      self.save(result);
    });
  }

  save() {
    const self = this;
    const nombre = result[0];
    const codigoArea = result[1];

    const form = `nombre=${nombre}&codigo_area=${codigoArea}&tabla=secciones`;

    heavyLoad(true);
    return new Promise(resolve => this.send('add', form)
      .then((res) => {
        self.getAll();
        heavyLoad(false);
        displayMessage(res.data);
        return resolve();
      }));
  }

  getIps() {
    const id = $('#select-sector').val();
    $('.print-table').attr('href', `${BASE_URL}process/getreport/secciones/${id}`);

    if (id != null) {
      const form = `tabla=ips&id=${id}`;
      this.send('getall', form)
        .then((res) => {
          sectionTable.refresh(res.data);
        });
    }
  }

  getAll() {
    const self = this;
    const form = 'tabla=secciones';

    heavyLoad(true);
    this.send('getall', form)
      .then((res) => {
        heavyLoad(false);
        self.fillSelect(res.data);
      });
  }

  updateIpState(IP) {
    const form = `data=${JSON.stringify(IP)}&extra_info=${JSON.stringify({
      module: 'ip'
    })}`;
    this.send('axiosupdate', form)
      .then(function (res) {
        displayMessage(res.data.mensaje);
      });
  }

  send(endpoint, data) {
    return axios.post(`${BASE_URL}process/${endpoint}`, data);
  }

  fillSelect(content) {
    $('#select-sector').html(content);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = sections;



/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((Sections) => {
  if (!ran) {
    sectionTable.init();
    Sections.getIps();
    ran = true;
  }

  $('#btn-add-section').on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    Sections.add();
  });

  $('#select-sector').on('change', function (e) {
    e.stopImmediatePropagation();
    Sections.getIps();
  });
});


/***/ })

},[83]);
//# sourceMappingURL=all.js.map