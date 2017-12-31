import handler from './handlers';

export default class contracts {

  constructor() {
    this.ran = false;
    handler(this);
    if (currentPage === 'nuevo_contrato') {
      Contracts.getIpList();
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
}
