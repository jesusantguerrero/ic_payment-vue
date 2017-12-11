
// TODO: change to axios:

import handler from './handlers';

export default class contracts {
  constructor() {
    this.ran = false;
    handler(this);
    if (currentPage === 'nuevo_contrato') {
      Contracts.getIpList();
    }
  }

  add() {
    const clientId = $('#contract-client-id').val();
    const userId = $('#contract-user-id').val();
    const serviceId = $('.service-card.selected').attr('data-id');
    const contractDate = $('#contract-client-date').val();
    const duration = $('#contract-client-months').val();
    const equipment = $('#contract-equipment').val();
    const eMac = $('#contract-e-mac').val();
    const router = $('#contract-router').val();
    const rMac = $('#contract-r-mac').val();
    const model = $('#contract-equipment-model').val();
    const ip = $('#contract-ip').val();
    const code = $('#select-contract-code').val();

    payment = $('#contract-client-payment').val();
    nextPayment = moment(contract_date).add(1, 'months').format('YYYY-MM-DD');

    const empty = isEmpty([clientId, userId, serviceId, contractDate, duration]);
    if (!empty) {
      total = (Number(duration) + 1) * Number(payment);
      form = `id_empleado=${userId}&id_cliente=${clientId}&id_servicio=${serviceId}&codigo=${code}&fecha=${contractDate}`;
      form += `&duracion=${duration}&monto_total=${total}&monto_pagado=0&ultimo_pago=null`;
      form += `&mensualidad=${payment}&proximo_pago=${nextPayment}&estado=activo&tabla=contratos`;
      form += `&nombre_equipo=${equipment}&mac_equipo=${eMac}&router=${router}&mac_router=${rMac}`;
      form += `&modelo=${model}&ip=${ip}`;
      connectAndSend('process/add', null, null, Contracts.getLast, form, null);
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
  }

  getAll() {
    const form = 'tabla=contratos';
    let callback = null;
    let { refresh } = contractTable;
    if (contractTable.el === 'detalles') {
      callback = Payments.getAll();
      refresh = null;
    }
    connectAndSend('process/getall', false, null, refresh, form, callback);
  }

  getLast(res) {
    data = JSON.parse(res);
    displayMessage(data.mensaje);
    $('#btn-save-contract').attr('disabled', '');
    $('#btn-print-contract').removeAttr('disabled');
    if (data.tabla_pagos) {
      makePaymentList(data.tabla_pagos);
    }
  }

  callExtra(context) {
    let row;
    this.dropDownEvents();
    if (context === 'details') {
      row = detailsContractTable.getSelectedRow();
    } else {
      row = contractTable.getSelectedRow();
    }
    if (row) {
      this.inputExtraClientDni.val(row.cedula);
      Contracts.getAllOfClient(row.cedula);
      $('#add-extra-modal').modal();
    } else {
      displayAlert('Revise', 'Seleccione el conrato primero', 'error');
    }
  }

  cancel(row, callback) {
    let isPenalty = false;
    const reason = $('#cancelation-reason').val();
    const checked = $('#check-penalty:checked').length;
    if (row.id) {
      if (checked > 0) {
        isPenalty = true;
      }
      const fecha = moment().format('YYYY-MM-DD');
      const form = `id_contrato=${row.id}&fecha=${fecha}&id_cliente=${row.id_cliente}
      &motivo=${reason}&penalidad=${isPenalty}`;
      connectAndSend('process/cancel', true, null, null, form, callback);
    } else {
      displayMessage(`${MESSAGE_ERROR} No hay contrato seleccionado`);
    }
  }

  getOne(idContrato, receiver) {
    form = `tabla=contratos&id_contrato=${idContrato}`;
    connectAndSend('process/getone', false, null, receiver, form, null);
  }

  recieve(content) {
    const contract = JSON.parse(content);
    this.idContrato = contract.id_contrato;
    const $equipo = $('#u-contract-equipment');
    const $macEquipo = $('#u-contract-e-mac');
    const $router = $('#u-contract-router');
    const $macRouter = $('#u-contract-r-mac');
    const $modelo = $('#u-contract-modelo');
    const $codigo = $('#select-contract-code');
    const $ip = $('#u-contract-ip');

    $equipo.val(contract.nombre_equipo);
    $macEquipo.val(contract.mac_equipo);
    $router.val(contract.router);
    $macRouter.val(contract.mac_router);
    $modelo.val(contract.modelo);
    $ip.val(contract.ip);

    // $("#update-contract-modal select").val('')
    function updateContract(idContrato) {
      const checked = $('#check-change-ip:checked').length;
      form = `id_contrato=${idContrato}&nombre_equipo=${$equipo.val()}&mac_equipo=${$macEquipo.val()}`;
      form += `&router=${$router.val()}&mac_router=${$macRouter.val()}`;
      form += `&modelo=${$modelo.val()}`;
      form += '&tabla=contratos';
      if (checked > 0) {
        form += `&ip=${$ip.val()}&codigo=${$codigo.val()}`;
      }
      connectAndSend('process/update', true, null, null, form, Contracts.getAll);
    }

    $('#update-contract-modal').modal();
    $('#update-contract').on('click', (e) => {
      e.stopImmediatePropagation();
      updateContract(idContrato);
    });
  }

  getIpList() {
    function makeIpList(content) {
      $('#select-contract-code').html(content);
    }

    const sectionId = $('#select-contract-sector').val();
    const form = `id_seccion=${sectionId}&tabla=ip_list`;
    connectAndSend('process/getall', false, null, makeIpList, form, null);
  }

  btnExtraPressed($this) {
    const buttonId = $this.text().trim().toLowerCase();
    const clientDni = this.inputExtraClientDni.val().replace(/[-]/g, ' ');

    switch (buttonId) {
      case 'mejorar':
        Contracts.upgrade();
        break;
      case 'extender':
        Contracts.extend();
        break;
      case 'guardar':
        Contracts.addExtra();
        break;
      default:
        // do nothing
    }
    this.getAllOfClient(clientDni)
      .then((res) => {
        console.log(res.data);
        console.log(' aqui en la promesa');
      });
  }

  upgrade() {
    const contractId = $('#extra-client-contract').val();
    const selectedService = $('.service-card.selected');
    const serviceId = selectedService.attr('data-id');
    const amount = selectedService.attr('data-payment');

    const empty = isEmpty([contractId, serviceId, amount]);
    if (!empty) {
      const form = `id_contrato=${contractId}&id_servicio=${serviceId}&cuota=${amount}`;
      connectAndSend('process/upgrade', true, initGlobalHandlers, null, form, Contracts.getAll);
    } else {
      displayAlert('Revise', 'asegurate de llenar todos los datos y seleccionar el servicio', 'info');
    }
  }

  reconnect(contractId, callback) {
    const selectedService = $('.service-card.selected');
    const serviceId = selectedService.attr('data-id');
    const duration = $('#reconnection-months').val();
    const date = $('#reconnection-date').val();
    const empty = isEmpty([contractId, serviceId, date, duration]);

    if (!empty) {
      info = {
        id_contrato: contractId,
        fecha: date,
        id_servicio: serviceId,
        duracion: duration
      };

      const form = `data=${JSON.stringify(info)}`;
      axios.post(`${BASE_URL}contract/reconnect`, form)
        .then((res) => {
          displayMessage(res.data.mensaje);
          Payments.getAll();
          $('#btn-reconnect').removeAttr('disabled');
          $('.reconnect-caller').removeClass('visible');
          if (callback) { callback(); }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      swal('Llene todos los campos');
    }
  }

  addExtra() {
    const contractId = $('#extra-client-contract').val();
    const serviceCost = $('#extra-service-cost').val();
    const extraService = $('#select-extra-service').val();
    const equipment = $('#extra-equipo').val();
    const eMac = $('#extra-e-mac').val();
    const router = $('#extra-router').val();
    const rMac = $('#extra-r-mac').val();
    const paymentMode = $('#select-payment-mode').val();

    const empty = isEmpty([contractId, extraService, serviceCost, paymentMode]);
    if (!empty) {
      const form = `id_contrato=${contractId}&costo_servicio=${serviceCost}&nombre_servicio=${extraService}
      &nombre_equipo=${equipment}&mac_equipo=${eMac}&router=${router}&mac_router=${rMac}
      &modo_pago=${paymentMode}`;
      connectAndSend('process/addextra', true, initGlobalHandlers, null, form, Contracts.getAll);
    } else {
      displayAlert('revise', 'asegurate de llenar todos los datos y seleccionar el servicio', 'info');
    }
  }

  extend() {
    const contractId = $('#extra-client-contract').val();
    const duration = $('#extra-extension-months').val();

    const empty = isEmpty([duration, contractId]);
    if (!empty) {
      const form = `id_contrato=${contractId}&duracion=${duration}`;
      connectAndSend('process/extend_contract', true, initGlobalHandlers, null, form, Contracts.getAll);
    } else {
      displayAlert('revise', 'asegurate de llenar todos los datos y seleccionar el servicio', 'info');
    }
  }

  getAllOfClient(dni) {
    const form = `dni=${dni}`;
    const self = this;

    return axios.post(`${BASE_URL}process/data_for_extra`, form)
      .then((res) => {
        self.makeContractList(res.data);
      })
      .catch(() => {});
  }

  suspend(contractId, callback) {
    const form = `data=${JSON.stringify({ id_contrato: contractId })}`;

    axios.post(`${BASE_URL}contract/suspend`, form)
      .then((res) => {
        const { data } = res;
        displayMessage(data.mensaje);
        Contracts.getAll();
        if (callback) { callback(); }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExtra(contractId) {
    const self = this;

    function sendDelete() {
      const form = `data=${JSON.stringify({ id_contrato: contractId })}`;
      axios.post(`${BASE_URL}contract/delete_extra`, form)
        .then((res) => {
          displayMessage(res.data.mensaje);
        })
        .catch((error) => {
          displayMessage(error.toString());
        });
    }

    swal({
      title: 'Está Seguro?',
      text: 'Seguro que desea eliminar el seguro a este contrato?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then(() => {
        sendDelete();
        self.inputContracEnsurance.val('');
      });
  }

  // UTILS

  makeContractList(response) {
    if (response) {
      let element = "<option value=''>--Selecciona--</option>";
      const { cliente, contratos } = response.cliente;
      let contractId;

      if (currentPage !== 'detalles' && currentPage !== 'home') {
        contractId = contractTable.getId();
      } else if (currentPage !== 'home') {
        contractId = detailsContractTable.getSelectedRow().idContrato;
      }

      for (let i = 0; i < contratos.length; i += 1) {
        const value = contratos[i].id_contrato;
        const service = contratos[i].servicio;
        const equipment = contratos[i].nombre_equipo;
        const { router } = contratos[i];
        const eMac = contratos[i].mac_equipo;
        const rMac = contratos[i].mac_router;
        const code = contratos[i].codigo;
        const ensuranceName = contratos[i].nombre_seguro;
        const ensuranceCost = contratos[i].mensualidad_seguro;

        element += `<option value='${value}' data-service='${service}'  data-equipment='${equipment}'  data-e-mac='${eMac}'`;
        element += ` data-router='${router}'  data-r-mac='${rMac}' data-code='${code}' data-ensurance='${ensuranceName}- RD$ ${CurrencyFormat(ensuranceCost)}'>`;
        element += `${value}</option>`;
      }

      this.selectExtraClientContract.html(element);
      this.selectExtraClientContract.val(contractId).change();

      $('#extra-client-name').val(`${cliente.nombres} ${cliente.apellidos}`);
    } else {
      displayMessage(`${MESSAGE_ERROR} Este cliente no existe revise su cedula por favor`);
    }
  }

  dropDownEvents() {
    if (!this.ran) {
      const self = this;
      this.ran = true;
      this.selectExtraService = $('#select-extra-service');
      this.selectExtraClientContract = $('#extra-client-contract');
      this.btnDeleteExtra = $('#delete-extra');
      this.inputContracEnsurance = $('#contract-ensurance');
      this.inputExtraClientDni = $('#extra-client-dni');

      this.selectExtraService.on('change', () => {
        const data = $(('#select-extra-service :selected')).data();
        $('#extra-service-cost').val(data.payment);
      });

      this.selectExtraClientContract.on('change', () => {
        const data = $('#extra-client-contract :selected').data();
        $('#extra-contract-service').val(data.service);
        $('#extra-equipo').val(data.equipment);
        $('#extra-router').val(data.router);
        $('#extra-e-mac').val(data.eMac);
        $('#extra-r-mac').val(data.rMac);
        $('#extra-code').val(data.code);
        if (!data.ensurance.includes('null')) {
          self.inputContracEnsurance.val(data.ensurance);
        }
      });

      this.btnDeleteExtra.on('click', () => {
        const id = self.selectExtraClientContract.val();
        self.deleteExtra(id);
      });
    }
  }
}
