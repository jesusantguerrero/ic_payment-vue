
export default class clients {
  constructor() {

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
}
