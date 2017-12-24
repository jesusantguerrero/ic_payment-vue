export default class ServiceStore {
  constructor() {
    this.columns = [
      {
        field: 'orden',
        title: 'No.',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'checkbox',
        checkbox: true,
        class: 'hide'
      },
      {
        field: 'id',
        title: 'ID #',
        class: 'hide',
      },
      {
        field: 'nombre',
        title: 'Nombre',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'descripcion',
        title: 'Descripción',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'mensualidad',
        title: 'Mensualidad(o Precio)',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'tipo',
        title: 'Tipo',
        align: 'center',
        valign:	'middle'
      },
    ];

    this.serviceMode = 'add';
    this.service = {
      nombre: '',
      descripcion: '',
      mensualidad: '',
      tipo: '',
    };
  }

  setServiceMode(mode) {
    this.serviceMode = mode;
  }

  setService(service) {
    this.service = service;
  }

  serviceEmpty() {
    this.service = {
      nombre: '',
      descripcion: '',
      mensualidad: '',
      tipo: '',
    };
  }
}
