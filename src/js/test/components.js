"use strict";

function isCurrentPage(pageName) {
  if (getCurrentPage() == pageName) {
    return true;
  }
  return false;
}

function getCurrentPage() {
  var currentPage = $("title").text().split(" ");
  currentPage = currentPage[4].toLowerCase().trim();
  return currentPage;
}

function fillBSTable(tableId, content) {
  var $table = $(tableId);
  $table.bootstrapTable('destroy');
  $table.find('tbody').html(content);
  $table.bootstrapTable();
  $('.pull-right.search').addClass('hide');
  $table.find('tbody').css({ display: "table-row-group" });
  $table.addClass('innertable');
}

function filterBSTable(tableId, state) {
  $(tableId).bootstrapTable('filterBy', {
    estado: state
  });
}
'use strict';

if (isCurrentPage("cuenta")) {
  (function () {
    var acountView = new Vue({
      el: '#acount-section',
      data: {
        user: {
          user_id: '',
          nickname: '',
          name: '',
          lastname: '',
          dni: '',
          type: '',
          email: ''
        },
        isChangePassword: false,
        currentPassword: '',
        newPassword: '',
        passwordConfirm: '',
        states: {
          'has-error': false,
          'has-success': false,
          button: true
        }

      },

      mounted: function mounted() {
        if (currentPage == 'cuenta') {
          this.getUser();
        }
      },

      methods: {
        getUser: function getUser() {
          var self = this;
          var user_id = $('#acount-user-id').val();
          var form = 'data=' + JSON.stringify({
            user_id: user_id
          });

          axios.post(BASE_URL + 'user/get_user', form).then(function (res) {
            var user = res.data.user;
            user['fullname'] = user.name + ' ' + user.lastname;
            self.user = user;
          });
        },

        updateInfo: function updateInfo() {
          if (this.isChangePassword) {
            this.changePassword();
          } else {
            this.changeEmail();
          }
        },

        changePassword: function changePassword() {
          if (this.states['has-success']) {
            var form = 'data=' + JSON.stringify({
              user_id: this.user.user_id,
              current_password: this.currentPassword,
              new_password: this.newPassword
            });

            axios.post(BASE_URL + 'user/update_password', form).then(function (res) {
              displayMessage(res.data.message);
              window.location = BASE_URL + 'app/logut';
            });
          } else {
            displayMessage("Las contraseñas no conciden");
          }
        },

        changeEmail: function changeEmail() {
          var self = this;
          var user = this.user;

          swal({
            'title': 'Contraseña',
            'input': 'password'
          }).then(function (password) {
            var form = 'data=' + JSON.stringify({
              'user_id': user.user_id,
              'password': password,
              'field': 'email',
              'value': user.email
            });

            axios.post(BASE_URL + 'user/update_field', form).then(function (res) {
              displayMessage(res.data.message);
            });
          });
        },

        confirmPasswordServer: function confirmPasswordServer(password) {
          var form = 'data=' + JSON.stringify({
            user_id: this.user.user_id,
            current_password: password
          });

          return new Promise(function (resolve, reject) {
            axios.post(BASE_URL + 'user/confirm_password', form).then(function (res) {
              resolve(res.data.is_correct);
            });
          });
        },

        confirmPassword: function confirmPassword() {
          var self = this;
          this.confirmPasswordServer(this.currentPassword).then(function (is_correct) {
            self.isChangePassword = is_correct;
          });
        },

        checkPassword: function checkPassword() {
          if (this.newPassword == this.passwordConfirm && this.changePassword) {
            this.setStates(true, false);
            this.states.button = true;
          } else if (this.changePassword) {
            this.setStates(false, true);
            this.states.button = false;
          } else {
            this.setStates(false, false);
          }
        },

        setStates: function setStates(success, error) {
          this.states['has-success'] = success;
          this.states['has-error'] = error;
        }
      }

    });
  })();
}
'use strict';

if (isCurrentPage("cierre")) {
  (function () {
    var totales = {
      total1: 0,
      total5: 0,
      total10: 0,
      total20: 0,
      total25: 0,
      total50: 0,
      total100: 0,
      total200: 0,
      total500: 0,
      total1000: 0,
      total2000: 0
    };

    var gasto = {
      'fecha': '',
      'descripcion': '',
      'monto': ''
    };

    var gastos = [{
      fecha: now(),
      descripcion: "hola",
      monto: 2000,
      id_gasto: 1
    }];
    var autor = $('#autor-cierre').text().trim();

    var appCierre = new Vue({
      el: '#app-cierre',
      data: {
        isHide: false,
        fecha: now(),
        data_cierre: {
          autor: autor,
          pagos_facturas: 0,
          pagos_extras: 0,
          pagos_efectivo: 0,
          pagos_banco: 0,
          total_ingresos: 0,
          efectivo_caja: 0,
          total_descuadre: 0,
          total_gastos: 0,
          banco: 0
        },
        conteo: totales,
        suma: 0,
        gasto: gasto,
        gastos: gastos
      },

      mounted: function mounted() {
        this.getGastos();
        this.setIngresos();
      },

      created: function created() {
        $('.will-load').css({
          visibility: "visible"
        });
      },

      filters: {
        currencyFormat: function currencyFormat(number) {
          return CurrencyFormat(number);
        }
      },

      methods: {
        changeTotal: function changeTotal(e) {
          var unit = e.srcElement.attributes['data-unit'].value;
          var cantidad = e.srcElement.value;
          var total = cantidad * unit;
          totales['total' + unit] = cantidad * unit * 1.00;
        },

        addGasto: function addGasto(e) {
          var gasto = this.gasto;
          gasto.fecha = now();
          var form = 'data=' + JSON.stringify(gasto);
          var send = axios.post(BASE_URL + 'caja/add_gasto', form);
          send.then(function (response) {
            var data = response.data;
            displayMessage(data.mensaje);
            appCierre.fillGastos(data.gastos, "normal");
            appCierre.setGastoTotal(data.total_gastos);
          });
          send.catch(function () {
            console.log(error);
          });
        },

        fillGastos: function fillGastos(gastos_servidor, mode) {
          if (mode == "group") {
            if (gastos_servidor != null || gastos_servidor.length > 0) {
              appCierre.gastos = gastos_servidor;
            } else {
              appCierre.gastos = [];
            }
          } else {
            appCierre.gastos.push(JSON.parse(gastos_servidor)[0]);
          }
        },

        setGastoTotal: function setGastoTotal(totalGastos) {
          this.data_cierre.total_gastos = totalGastos;
        },

        getGasto: function getGasto(e) {
          var gasto = this.gasto;
          var form = 'data=' + JSON.stringify(gasto);
          connectAndSend('caja/get_gasto', false, null, appCierre.fillGastos, form, null, null);
        },

        deleteGasto: function deleteGasto(e) {
          var caller = e.target;
          if (caller.localname == "i") {
            caller = caller.parentElement;
          }
          var id = caller.attributes['data-id'].value;
          swal({
            title: 'Está Seguro?',
            text: "Seguro de que quiere eliminar este gasto?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Estoy Seguro!',
            cancelButtonText: 'Cancelar'
          }).then(function () {
            var form = 'data=' + JSON.stringify({
              id: id,
              fecha: now()
            });
            var send = axios.post(BASE_URL + 'caja/delete_gasto', form);
            send.then(function (response) {
              var data = response.data;
              displayMessage(data.mensaje);
              appCierre.fillGastos(data.gastos, "group");
              appCierre.setGastoTotal(data.total_gastos);
            });
            send.catch(function (error) {});
          });
        },

        getGastos: function getGastos() {
          var data = {
            fecha: now()
          };
          var form = 'data=' + JSON.stringify(data);
          var send = axios.post(BASE_URL + 'caja/get_gastos', form);
          send.then(function (response) {
            var data = response.data;
            displayMessage(data.mensaje);
            appCierre.fillGastos(data.gastos, "group");
            appCierre.setGastoTotal(data.total_gastos);
          });
          send.catch(function () {
            console.log(error);
          });
        },

        setIngresos: function setIngresos() {
          var form = 'data=' + JSON.stringify({
            fecha: now()
          });
          var self = this.data_cierre;
          var send = axios.post(BASE_URL + 'caja/get_ingresos', form);
          send.then(function (response) {
            var data = response.data;
            self.pagos_facturas = data.pagos_facturas;
            self.pagos_extras = data.pagos_extras;
            self.pagos_efectivo = data.pagos_efectivo;
            self.pagos_banco = data.pagos_banco;
            self.total_ingresos = parseFloat(data.pagos_facturas) + parseFloat(self.pagos_extras);
            self.total_descuadre = -self.pagos_efectivo + self.efectivo_caja;
          });
          send.catch(function () {
            console.log(error);
          });
        },

        cerrarCaja: function cerrarCaja() {
          var self = this;
          var cierre = this.data_cierre;
          window.cierre = cierre;
          if (cierre.total_descuadre != 0) {
            swal({
              title: 'Está Seguro?',
              text: "Hay un descuadre en la caja, quiere hacer el cierre de todos modos?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Si',
              cancelButtonText: 'No'
            }).then(function () {
              self.cerrar(cierre);
            });
          } else {
            self.cerrar(cierre);
          }
        },

        cerrar: function cerrar(cierre) {

          cierre.fecha = now();
          var form = 'data=' + JSON.stringify(cierre);
          var send = axios.post(BASE_URL + 'caja/add_cierre', form);
          send.then(function (response) {
            var data = response.data;
            displayMessage(data.mensaje);
            self.isHide = true;
            appSummaryView.isHide = false;
            appSummaryView.cierre = cierre;
            $("#app-cierre").addClass('hide');
            $(".top-nav").addClass('hide');
            $("#print-view").css({
              visibility: "visible"
            });
          });
          send.catch(function () {
            console.log(error);
          });
        }
      },

      computed: {
        getTotal: function getTotal(e) {
          var t = totales;
          var self = this.data_cierre;
          var suma = sumar([t.total1, t.total5, t.total10, t.total20, t.total25, t.total50, t.total100, t.total200, t.total500, t.total1000, t.total2000]);
          this.suma = suma;
          self.efectivo_caja = suma.toFixed(2);
          self.total_descuadre = parseFloat(-self.pagos_efectivo) + parseFloat(self.efectivo_caja);
          self.banco = parseFloat(self.pagos_banco) + parseFloat(self.pagos_efectivo) - parseFloat(self.total_gastos) + parseFloat(self.total_descuadre);
          return this.suma;
        },

        decimals: function decimals() {
          var fields = ["pagos_facturas", "pagos_extra", "pagos_efectivo", "pagos_banco", "total_ingresos", "efectivo_caja", "total_descuadre", "total_gasto", "banco"];
          fields.forEach(function (field) {
            this.data_cierre[field] = this.data_cierre[field].toFixed(2);
          }, this);
        }
      }
    });

    function sumar(valores) {
      var suma = 0;
      for (var i = 0; i < valores.length; i++) {
        suma += parseFloat(valores[i]);
      }
      return suma;
    }

    function now() {
      return moment().format("YYYY-MM-DD");
    }

    var appSummaryView = new Vue({
      el: "#print-view",
      data: {
        isHide: true,
        back: {
          link: "somelink",
          text: "volver a cierre"
        },
        foward: {
          link: BASE_URL + "app/logout",
          text: "cerrar session"
        },
        cierre: {
          autor: '',
          pagos_facturas: 0,
          pagos_extras: 0,
          pagos_efectivo: 0,
          pagos_banco: 0,
          total_ingresos: 0,
          efectivo_caja: 0,
          total_descuadre: 0,
          total_gastos: 0,
          banco: 0
        }
      },
      filters: {
        currencyFormat: function currencyFormat(number) {
          return "RD$ " + CurrencyFormat(number);
        },

        spanishDateFormat: function spanishDateFormat(date) {
          moment.locale('es-DO');
          return moment(date).format('dddd DD [de] MMMM [del] YYYY');
        }
      },
      methods: {
        goBack: function goBack() {
          appSummaryView.isHide = true;
          appCierre.isHide = false;
          self.isHide = true;
          $(".top-nav").removeClass('hide');
          $("#app-cierre").removeClass('hide');
        },
        print: function (_print) {
          function print() {
            return _print.apply(this, arguments);
          }

          print.toString = function () {
            return _print.toString();
          };

          return print;
        }(function () {
          print();
        })
      }
    });
  })();
}
'use strict';

if (isCurrentPage("informes")) {
  (function () {
    var closeReport = new Vue({
      el: '#cierres',
      data: {
        table: '',
        tableHTML: '',
        hasTotals: false,
        totals: false,
        between: {
          first_date: '',
          second_date: '',
          text: ''
        }
      },

      mounted: function mounted() {
        if (currentPage == 'informes') {
          this.getReport();
        }
      },

      filters: {
        currencyFormat: function currencyFormat(number) {
          return "RD$ " + CurrencyFormat(number);
        }
      },

      methods: {
        getReport: function getReport() {
          var self = this;
          var form = 'data=' + JSON.stringify(this.between);
          axios.post(BASE_URL + 'caja/get_cierres/true', form).then(function (res) {
            self.fillTable(res.data.content);
            self.hasTotals = true;
            self.totals = res.data.acum;
          });
        },

        fillTable: function fillTable(content) {
          fillBSTable('#cierres-table', content);
        }
      }
    });
  })();
}
'use strict';

if (isCurrentPage("informes")) {
  (function () {
    var expensesReport = new Vue({
      el: '#gastos',
      data: {
        table: '',
        tableHTML: '',
        total: '',
        between: {
          first_date: '',
          second_date: '',
          text: ''
        }
      },

      mounted: function mounted() {
        if (currentPage == 'informes') {
          this.getReport();
        }
      },

      filters: {
        currencyFormat: function currencyFormat(number) {
          return "RD$ " + CurrencyFormat(number);
        }
      },

      methods: {
        getReport: function getReport() {
          var self = this;
          var form = 'data=' + JSON.stringify(this.between);
          axios.post(BASE_URL + 'caja/get_gastos/true', form).then(function (res) {
            self.fillTable(res.data.content);
            self.total = res.data.acum;
          });
        },

        fillTable: function fillTable(content) {
          fillBSTable('#gastos-table', content);
        }
      }
    });
  })();
}
'use strict';

if (isCurrentPage("detalles")) {
  (function () {
    var listExtras = '';
    var reciboReset = {
      id_pago: 0,
      id_contrato: 0,
      id_servicio: 0,
      id_empleado: 0,
      fecha_pago: '',
      concepto: 'extra',
      detalles_extra: '',
      cuota: '',
      mora: '',
      monto_extra: '',
      total: '',
      estado: '',
      fecha_limite: '',
      complete_date: '',
      descuento: '',
      razon_descuento: '',
      deuda: '',
      abono_a: '',
      tipo: '',
      generado: ''
    };

    var appPagoExtra = new Vue({
      el: "#app-pago-extra",
      data: {
        recibo: {
          id_pago: 0,
          id_contrato: 0,
          id_servicio: 0,
          id_empleado: 0,
          fecha_pago: 'dd/mm/yyyy',
          concepto: 'extra',
          detalles_extra: '',
          cuota: '',
          mora: '',
          monto_extra: '',
          total: '',
          estado: '',
          fecha_limite: '',
          complete_date: '',
          descuento: '',
          razon_descuento: '',
          deuda: '',
          abono_a: '',
          tipo: '',
          generado: ''
        },

        visible: false,
        pagado: false,
        extra: {
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
        }
      },
      filters: {},
      computed: {
        url_recibo: function url_recibo() {
          return BASE_URL + 'process/getrecibo/' + this.recibo.id_pago;
        },

        hide_recibo: function hide_recibo() {
          if (this.recibo.estado == "pagado") {
            return false;
          }
          return this.hide_recibo = true;
        },

        isPagado: function isPagado() {
          this.pagado = this.recibo.estado == 'pagado';
          return this.pagado;
        }
      },

      methods: {

        goBack: function goBack() {
          extraTable.el.parents(".bootstrap-table").removeClass("hide");
          this.visible = false;
          this.extra = { concepto: '' };
          extraTable.refresh(listExtras);
        },

        generatePayment: function generatePayment() {
          if (this.pagado || this.recibo.id_pago == 0) {
            var form = 'data=' + JSON.stringify(this.extra);
            var send = axios.post(BASE_URL + 'extra/generate_extra_payment', form);
            send.then(function (res) {
              var data = res.data;
              displayMessage(data.mensaje);
              selectExtraPayment.html(data.pagos).change();
            });
            send.catch(function () {});
          } else {
            displayMessage(MESSAGE_INFO + ' Debe realizar este pago antes de crear uno nuevo');
          }
        },

        getPayment: function getPayment(id_pago) {
          var form = "data=" + JSON.stringify({ id_pago: id_pago });
          var self = this;
          var send = axios.post(BASE_URL + 'extra/get_payment', form);
          send.then(function (res) {
            var data = res.data;
            if (data.recibo) {
              self.recibo = data.recibo;
            }
          });
        },

        applyPayment: function applyPayment() {
          if (this.recibo.id_pago != 0) {
            this.sender('extra/apply_payment');
          } else {
            displayMessage(MESSAGE_INFO + ' Debe generar un pago primero');
          }
        },

        editPayment: function editPayment() {
          this.sender('extra/edit_payment');
        },

        sender: function sender(endpoint) {
          var self = this;
          var preparedData = this.prepareData();
          var info = preparedData.info;
          var data = preparedData.data;

          var form = 'data=' + JSON.stringify(data) + '&info=' + JSON.stringify(info);
          var send = axios.post(BASE_URL + endpoint, form);

          send.then(function (res) {
            var data = res.data;
            if (data.extras) {
              listExtras = data.extras;
            }

            if (data.mensaje) {
              displayMessage(data.mensaje);
            }

            self.getPayments(self.extra.id_extra);
          });

          send.catch(function (error) {
            console.log(error);
          });
        },

        prepareData: function prepareData(recibo) {
          var recibo = this.recibo;

          var data = {
            concepto: 'extra -',
            detalles_extra: recibo.detalles_extra,
            fecha_pago: recibo.fecha_pago,
            cuota: recibo.cuota,
            total: recibo.cuota,
            estado: 'pagado',
            tipo: recibo.tipo,
            generado: true
          };

          var info = {
            id_extra: recibo.id_extra,
            id_pago: recibo.id_pago
          };

          return { data: data, info: info };
        },

        getPayments: function getPayments(id_extra) {
          var self = this;
          var form = "data=" + JSON.stringify({ id_extra: id_extra });
          var send = axios.post(BASE_URL + 'extra/get_extra_payment_of', form);
          send.then(function (res) {
            var data = res.data;

            if (!data.pagos) {
              self.recibo = reciboReset;
            }

            selectExtraPayment.html(data.pagos).change();
          });
        },

        deletePayment: function deletePayment() {
          var self = this;
          var recibo = this.recibo;
          var data = {
            'id_extra': recibo.id_extra,
            'id_pago': recibo.id_pago
          };

          var form = 'data=' + JSON.stringify(data);
          var send = axios.post(BASE_URL + 'extra/delete_payment', form);

          send.then(function (res) {
            var data = res.data;
            displayMessage(data.mensaje);
            self.getPayments(self.extra.id_extra);
          });
          send.catch(function (error) {
            console.log(error);
          });
        }
      }
    });

    bus.$on('row-selected', function (row) {
      extraTable.el.parents(".bootstrap-table").addClass("hide");
      appPagoExtra.visible = true;
      appPagoExtra.extra = row;
      listExtras = extraTable.el.find('tbody').html();
      appPagoExtra.getPayments(row.id_extra);
    });

    var selectExtraPayment = $("#select-extra-payment");
    selectExtraPayment.on('change', function () {
      var id_pago = selectExtraPayment.val();
      appPagoExtra.getPayment(id_pago);
    });
  })();
}
'use strict';

if (isCurrentPage("extras")) {
  (function () {
    var extraSection = new Vue({
      el: '#extra-section',
      data: {
        content: '',
        search: {
          text: '',
          state: 'activo'
        },
        totales: {
          pagado: 0,
          pendiente: 0,
          total_vendido: 0
        },
        tableId: '#extra-table-full'
      },
      mounted: function mounted() {
        if (currentPage == 'extras') {
          this.getData();
        }
      },

      filters: {
        currencyFormat: function currencyFormat(number) {
          return "RD$ " + CurrencyFormat(number);
        }
      },

      methods: {
        filter: function filter(e) {
          filterBSTable(this.tableId, this.filterValue);
        },

        getData: function getData() {
          var self = this;
          var form = 'data=' + JSON.stringify(this.search);
          axios.post(BASE_URL + 'extra/get_all', form).then(function (res) {
            self.fillTable(res.data.content);
            self.totales = res.data.totales;
          });
        },

        fillTable: function fillTable(content) {
          fillBSTable('#extra-table-full', content);
        }
      }
    });
  })();
}
'use strict';

if (isCurrentPage("administrador")) {
  (function () {
    var configMessage = {
      email: '',
      password: '',
      device_id: '',
      country_code: '',
      send_at: '1 second',
      expires_at: '1 hour'
    };

    var configMessagesForm = new Vue({
      el: '#message-settings-section',
      data: {
        config: configMessage
      },

      mounted: function mounted() {
        if (currentPage == 'administrador') this.getConfig();
      },

      methods: {
        confirmPhone: function confirmPhone() {},

        getConfig: function getConfig() {
          var send;
          var self = this;
          send = axios.get(BASE_URL + 'messages/get_config');
          send.then(function (res) {
            if (res.data.config) {
              self.config = res.data.config;
            }
          });
          send.catch(function (error) {
            console.log(error);
          });
        },

        saveSettings: function saveSettings(e) {
          var config, form, send;
          config = this.config;

          form = 'data=' + JSON.stringify(config);
          send = axios.post(BASE_URL + 'messages/save_config', form);
          send.then(function (res) {
            displayMessage(res.data.mensaje);
          });
          send.catch(function (err) {
            console.log(err);
          });
        }
      }
    });

    var sendMessageApp = new Vue({
      el: '#send-message-modal',

      data: {
        hide_clients: true,
        hide_numbers: true,

        message_data: {
          tipo: '',
          clientes: '',
          numeros: '',
          mensaje: ''
        }
      },

      mounted: function mounted() {
        this.initSelect2();
      },

      computed: {
        letters_count: function letters_count() {
          return this.message_data.mensaje.length;
        }
      },

      methods: {
        sendMessage: function sendMessage() {
          var form, send;

          if (!isEmpty([this.message_data.tipo, this.message_data.mensaje])) {
            form = 'data=' + JSON.stringify(this.message_data);
            send = axios.post(BASE_URL + 'messages/send_message', form);
            send.then(function (res) {
              displayMessage(res.data.mensaje);
            });
            send.catch(function (err) {
              console.log(err);
            });
          } else {
            swal('Campos Requeridos', 'Por favor selecciones el tipo de mensaje y escriba su mensaje');
          }
        },

        initSelect2: function initSelect2() {
          var self = this;
          var options = {
            dropdownParent: $('#send-message-modal')
          };

          var selectMessageType = $('#message-type');
          selectMessageType.select2(options);
          var selectClientsForMessage = $('#clients-for-message').select2({
            dropdownParent: $('#send-message-modal'),
            ajax: {
              url: BASE_URL + 'messages/search_clients',
              dataType: 'json',
              delay: 250,
              data: function data(params) {
                return {
                  q: params.term,
                  page: params.page
                };
              },

              processResults: function processResults(data, params) {
                params.page = params.page || 1;
                return {
                  results: data.items,
                  pagination: {
                    more: params.page * 30 < data.total_count
                  }
                };
              },
              cache: true
            }
          });

          var selects = {
            clients: selectClientsForMessage,
            messageType: selectMessageType
          };
          this.selec2Liteners(selects);
        },

        selec2Liteners: function selec2Liteners(selects) {
          var self = this;
          selects.messageType.on('select2:select', function (e) {
            var select = e.params.data.element;
            var attributes = select.attributes;
            var tipo = e.params.data.id;
            self.message_data.tipo = tipo;

            if (tipo == 'otros') {
              self.hide_clients = true;
              self.hide_numbers = false;
            } else if (tipo == 'personalizado') {
              self.hide_numbers = true;
              self.hide_clients = false;
            } else {
              self.hide_clients = true;
              self.hide_numbers = true;
            }
          });

          selects.messageType.select2('val', 'mora');

          selects.clients.on('select2:select', function (e) {
            var clientes = selects.clients.select2('data');
            var items = [];
            for (var i = 0; i < clientes.length; i++) {
              items.push({
                'nombre_completo': clientes[i].text,
                'celular': clientes[i].id
              });
            }
            self.message_data.clientes = items;
          });
        }
      }
    });
  })();
}
'use strict';

if (isCurrentPage("notificaciones")) {
  (function () {
    var paymentsReport = new Vue({
      el: '#recibos',
      data: {
        table: '',
        tableHTML: '',
        total: '',
        between: {
          first_date: '',
          second_date: '',
          text: ''
        }
      },
      mounted: function mounted() {
        if (currentPage == 'notificaciones') {
          this.getReport();
        }
      },
      filters: {
        currencyFormat: function currencyFormat(number) {
          return "RD$ " + CurrencyFormat(number);
        }
      },

      methods: {
        getReport: function getReport() {
          var self = this;
          var form = 'data=' + JSON.stringify(this.between);
          axios.post(BASE_URL + 'payment/get_receipts/', form).then(function (res) {
            self.fillTable(res.data.content);
            self.total = res.data.acum;
          });
        },

        fillTable: function fillTable(content) {
          var $table = $('#receipts-table');
          $table.bootstrapTable('destroy');
          $table.find('tbody').html(content);
          $table.bootstrapTable();
          $table.find('tbody').css({ display: "table-row-group" });
        }
      }
    });
  })();
}
'use strict';

if (isCurrentPage("reportes")) {
  (function () {
    if (currentPage == 'reportes') {
      fetchReportData();
    }
    function fetchReportData() {
      var send = axios.get(BASE_URL + 'caja/get_last_cierre');
      send.then(function (response) {
        cajaWeekChart(response.data);
        appVistaDetalle.cierre = response.data.cierre;
      });
      send.catch(function (error) {});

      var form = "data=" + JSON.stringify({ year: moment().format("YYYY") });
      var send2 = axios.post(BASE_URL + 'caja/get_year_info', form);
      send2.then(function (res) {
        var gastos = res.data.gastos;
        var ganancias = res.data.ganancias;
        yearChart(gastos, ganancias);
      });
    }

    window.chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    };
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    var colors = {
      green: 'rgba(0,230,118 ,1)',
      blueGreen: 'rgba(29,233,182 ,1)',
      blue7: 'rgba(25,118,210 ,1)',
      lightBlue6: 'rgba(3,155,229 ,1)',
      red3: 'rgba(229,115,115 ,1)',
      deepOrange4: 'rgba(255,112,67 ,1)'
    };

    function cajaWeekChart(data) {
      var canvas = $("#ganancias-chart");
      var chartOptions = {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: "Valores",
            data: data.values,
            backgroundColor: [colors.lightBlue6, colors.lightBlue6, colors.blue7, window.chartColors.blue, window.chartColors.green, colors.blueGreen, window.chartColors.red, window.chartColors.red, window.chartColors.blue]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                callback: function callback(label, index, labels) {
                  if (label == '' || label == null) label = 0;
                  return "RD$ " + CurrencyFormat(label);
                }
              }
            }],
            xAxes: [{
              ticks: {
                callback: function callback(label, index, labels) {
                  return label.replace(/_/g, " ");
                }
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function label(tooltipItem, data) {
                return "RD$ " + CurrencyFormat(tooltipItem.yLabel);
              }
            }
          },
          title: {
            display: true,
            text: "Datos del ultimo cierre. hecho por " + data.autor + " el dia " + data.fecha
          }
        }
      };
      var mychart = new Chart(canvas, chartOptions);
    }

    function yearChart(gastos, ganancias) {
      var $canvas = $("#ganancias-mes-chart");
      var data = {
        labels: meses,
        datasets: [{
          label: "Gastos",
          backgroundColor: window.chartColors.red,
          borderColor: window.chartColors.red,
          data: gastos,
          fill: false
        }, {
          label: "Banco(Ganancias)",
          fill: false,
          backgroundColor: window.chartColors.blue,
          borderColor: window.chartColors.blue,
          data: ganancias
        }]
      };

      var options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              callback: function callback(label, index, labels) {
                return "RD$ " + CurrencyFormat(label);
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function label(tooltipItem, data) {
              return "RD$ " + CurrencyFormat(tooltipItem.yLabel);
            }
          }
        },
        title: {
          display: true,
          text: "Registros de cierre Este ultimo año"
        }
      };

      var chart = new Chart($canvas, {
        type: 'line',
        data: data,
        options: options
      });
    }

    var cierre = {
      autor: "",
      banco: 0,
      dinero_real_en_caja: 0,
      fecha: '',
      pago_de_facturas: 0,
      pagos_de_extras: 0,
      pagos_en_efectivo: 0,
      pagos_via_banco: 0,
      total_de_ingresos: 0,
      total_descuadre: 0 };

    var appVistaDetalle = new Vue({
      el: '#app-vista-detalle',
      data: {
        cierre: cierre
      },

      filters: {
        currencyFormat: function currencyFormat(number) {
          return "RD$ " + CurrencyFormat(number);
        }
      },
      methods: {
        print: function (_print) {
          function print() {
            return _print.apply(this, arguments);
          }

          print.toString = function () {
            return _print.toString();
          };

          return print;
        }(function () {
          print();
        })
      }
    });
  })();
}
'use strict';

if (isCurrentPage("notificaciones")) {
  (function () {
    var RetirementReport = new Vue({
      el: '#retiros',
      data: {
        table: '',
        tableHTML: '',
        between: {
          first_date: '',
          second_date: ''
        }
      },
      mounted: function mounted() {
        if (currentPage == 'notificaciones') {
          this.getReport();
        }
      },

      methods: {
        getReport: function getReport() {
          var self = this;
          var form = 'data=' + JSON.stringify(this.between);
          axios.post(BASE_URL + 'contract/getCancelations/', form).then(function (res) {
            self.fillTable(res.data.content);
          });
        },

        fillTable: function fillTable(content) {
          var $table = $('#cancelation-table');
          $table.bootstrapTable('destroy');
          $table.find('tbody').html(content);
          $table.bootstrapTable();
          $table.find('tbody').css({
            display: "table-row-group"
          });
        }
      }
    });
  })();
}
'use strict';

if (isCurrentPage("notificaciones")) {
  (function () {
    var ticketListView = new Vue({
      el: '#averias-list-view',
      data: {
        dataSearch: {
          text: '',
          state: 'por reparar'
        },
        tickets: [],
        hide: false
      },

      mounted: function mounted() {
        this.itemClickListener();
        var self = this;
        busAveria.$on('tickets-listed', function () {
          self.itemClickListener();
        });
      },

      methods: {
        search: function search() {
          var self = this;
          var form = 'data=' + JSON.stringify(this.dataSearch);
          var send = axios.post(BASE_URL + 'api/averias/search', form);

          send.then(function (res) {
            self.fillAveriasList(res.data);
          });

          send.catch(function () {
            console.error(res.data.mensaje);
          });
        },

        fillAveriasList: function fillAveriasList($content) {
          $('#averias-list').html($content);
          ticketListView.itemClickListener();
        },

        itemClickListener: function itemClickListener() {
          $('#averias-list-view .averia-item').on('click', function () {
            var id_averia = $(this).find('.code').text().trim();
            ticketView.getTicket(id_averia);
          });
        }
      }
    });

    var emptyTicket = {
      "id_averia": "",
      "id_cliente": "",
      "cliente": "",
      "direccion": "",
      "descripcion": "",
      "celular": "",
      "fecha": "",
      "estado": "",
      "fecha_reparacion": "",
      "tecnico": "",
      "codigo": ''
    };

    var ticketView = new Vue({
      el: '#ticket-view',

      data: {
        classes: {
          hide: true
        },
        mode: {
          newComment: false,
          edit: false
        },
        new_comment: '',
        comments: [],
        ticket: emptyTicket
      },
      created: function created() {
        $('#ticket-view').removeClass('invisible');
      },

      methods: {
        getTicket: function getTicket(id_averia) {
          var form = 'data=' + JSON.stringify({
            id_averia: id_averia
          });
          var send = axios.post(BASE_URL + 'api/averias/get_averia', form);

          send.then(function (res) {
            var data = res.data;
            ticketView.classes.hide = false;
            ticketListView.hide = true;
            ticketView.ticket = data.ticket;
            ticketView.comments = data.comments;
          });
        },

        quit: function quit() {
          this.ticket = emptyTicket;
          this.comments = null;
          this.classes.hide = true;
          this.closeCommentMode();
          ticketListView.hide = false;
        },

        print: function (_print) {
          function print() {
            return _print.apply(this, arguments);
          }

          print.toString = function () {
            return _print.toString();
          };

          return print;
        }(function () {
          print();
        }),

        startComment: function startComment() {
          this.mode.newComment = true;
        },

        addComment: function addComment() {
          var form = getForm({
            id_averia: this.ticket.id_averia,
            descripcion: this.new_comment
          });
          var send = axios.post(BASE_URL + 'api/averias/add_comment', form);
          var self = this;
          send.then(function (res) {
            self.getComments();
            self.closeCommentMode();
            displayMessage(res.data.mensaje);
          });
        },

        _deleteComment: function _deleteComment(e) {
          var commentItem = e.target.parentNode.parentNode;
          var idComment = e.target.parentNode.attributes['data-id'].value;
          var self = this;
          commentItem.classList.add('to-delete');

          swal({
            title: 'Está Seguro?',
            text: "Seguro de que eliminar este reporte?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then(function () {
            self.deleteComment(idComment);
            commentItem.classList.remove('to-delete');
          }).catch(function () {
            commentItem.classList.remove('to-delete');
          });
        },

        deleteComment: function deleteComment(idComment) {
          var self = this;
          var form = getForm({
            id_reporte: idComment
          });
          var send = axios.post(BASE_URL + 'api/averias/delete_comment', form);

          send.then(function (res) {
            self.getComments();
            displayMessage(res.data.mensaje);
          });
        },

        editComment: function editComment() {},

        closeCommentMode: function closeCommentMode() {
          this.mode.newComment = false;
          this.new_comment = '';
        },

        getComments: function getComments() {
          var form = getForm({
            id_averia: this.ticket.id_averia
          });
          var send = axios.post(BASE_URL + 'api/averias/get_comments', form);
          var self = this;
          send.then(function (res) {
            self.comments = res.data.comments;
          });
        },

        updateDescription: function updateDescription() {
          this.updateTicket(['id_averia', 'descripcion', 'tecnico', 'estado', 'fecha_reparacion']);
        },

        updateState: function updateState() {
          if (this.ticket.estado == 'por reparar') {
            this.ticket.fecha_reparacion = '';
          } else {
            this.ticket.fecha_reparacion = moment().format('YYYY-MM-DD');
          }
        },

        updateTicket: function updateTicket(fields) {
          this.closeEditMode();
          var form = getForm(this.getFields(fields));
          var send = axios.post(BASE_URL + 'api/averias/update_averia', form);

          send.then(function (res) {
            ticketListView.search();
            displayMessage(res.data.mensaje);
          });
        },

        deleteTicket: function deleteTicket() {
          console.info('deleted');
        },

        closeEditMode: function closeEditMode() {
          this.mode.edit = false;
        },

        enterEditMode: function enterEditMode() {
          this.mode.edit = true;
        },

        getFields: function getFields(fields) {
          var selectedFields = {};
          var self = this;
          fields.forEach(function (field) {
            selectedFields[field] = self.ticket[field];
          }, this);

          return selectedFields;
        }

      }
    });

    function getForm(object) {
      return "data=" + JSON.stringify(object);
    }
  })();
}