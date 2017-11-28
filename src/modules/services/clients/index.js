import handler from './handlers';

export default class clients {
  constructor() {
    handler(this);
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
