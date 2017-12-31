export default class ContractStore {
  constructor() {
    this.columns = [
      {
        field: 'id',
        title: 'COD',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'checkbox',
        checkbox: true,
        class: 'hide'
      },
      {
        field: 'ip',
        title: 'IP',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'cliente',
        title: 'Cliente',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'fecha_inicio',
        title: 'Fecha Inicio',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'servicio',
        title: 'Servicio',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'meses',
        title: 'Meses',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'ultimo_pago',
        title: 'Ultimo Pago',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'proximo_pago',
        title: 'Proximo Pago',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'monto_pagado',
        title: 'Monto Pagado',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'monto_total',
        title: 'Monto Total',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'estado',
        title: 'Proximo Pago',
        align: 'center',
        valign:	'middle',
        class:	'hide',
      },
      {
        field: 'id_cliente',
        title: 'ID Cliente',
        align: 'center',
        valign:	'middle',
        class: 'hide'
      },
      {
        field: 'cedula',
        title: 'cedula',
        align: 'center',
        valign:	'middle',
        class: 'hide'
      },
    ];
    this.contractMode = 'add';
    this.contract = {
      id_cliente: '',
      id_servicio: '',
      codigo: '',
      fecha: '',
      duracion: '',
      mensualidad: '',
      nombre_equipo: '',
      mac_equipo: '',
      router: '',
      mac_router: '',
      modelo: '',
      ip: ''
    };
  }

  setContractMode(mode) {
    this.contractMode = mode;
  }

  setContract(contract) {
    this.contract = contract;
  }

  contractEmpty() {
    this.contract = {
      id_cliente: '',
      id_servicio: '',
      codigo: '',
      fecha: '',
      duracion: '',
      mensualidad: '',
      nombre_equipo: '',
      mac_equipo: '',
      router: '',
      mac_router: '',
      modelo: '',
      ip: ''
    };
  }
}
