import handlers from './handlers';

export default class services {
  constructor() {
    handlers(this);
  }

  add() {
    const name = $('#service-name').val();
    const description = $('#service-description').val();
    const payment = $('#service-monthly-payment').val();
    const type = $('#service-type').val();

    const empty = isEmpty([name, description, payment, type]);
    if (!empty) {
      form = `nombre=${name}&descripcion=${description}&mensualidad=${payment}&tipo=${type}`;
      form += '&tabla=servicios';
      connectAndSend('process/add', true, null, null, form, Services.getAll);
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
  }

  getAll() {
    const form = 'tabla=servicios';
    connectAndSend('process/getall', false, null, serviceTable.refresh, form, null);
  }

  update() {
    const id = $('#u-service-id').val();
    const name = $('#u-service-name').val();
    const description = $('#u-service-description').val();
    const payment = $('#u-service-monthly-payment').val();
    const type = $('#u-service-type').val();

    const empty = isEmpty([id, name, description, payment, type]);
    if (!empty) {
      form = `id_servicio=${id}&nombre=${name }&descripcion=${description}&mensualidad=${payment}`;
      form += `&tipo=${type}&tabla=servicios`;
      connectAndSend('process/update', true, null, null, form, Services.getAll, heavyLoad);
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
  }
}
