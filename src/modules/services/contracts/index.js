
export default class contracts {

  constructor() {
    this.ran = false;
    handler(this);
    if (currentPage === 'nuevo_contrato') {
      Contracts.getIpList();
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
}
