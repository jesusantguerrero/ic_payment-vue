export default class DetailsStore {
  constructor() {
    this.activeExtras = 0;
    this.paymentColumns = [
      {
        field: 'acciones',
        title: 'acciones',
        valign: 'center',
        align: 'center'
      },
      {
        field: 'id',
        title: 'ID Pago',
        valign: 'center',
        align: 'center',
        class: 'hide'
      },
      {
        field: 'checkbox',
        checkbox: true,
        title: '',
        valign: 'center',
        align: 'center',
        class: 'hide'
      },
      {
        field: 'concepto',
        title: 'Concepto',
        valign: 'center',
        align: 'center'
      },
      {
        field: 'cuota',
        title: 'Cuota',
        valign: 'center',
        align: 'center'
      },
      {
        field: 'mora',
        title: 'Mora',
        valign: 'center',
        align: 'center'
      },
      {
        field: 'extra',
        title: 'Extra',
        valign: 'center',
        align: 'center'
      },
      {
        field: 'monto',
        title: 'Total',
        valign: 'center',
        align: 'center'
      },
      {
        field: 'fecha_pago',
        title: 'Fecha de Pago',
        valign: 'center',
        align: 'center'
      },
      {
        field: 'estado',
        title: 'Estado',
        valign: 'center',
        align: 'center'
      },
      {
        field: 'fecha_limite',
        title: 'Fecha Limite',
        valign: 'center',
        align: 'center'
      },
      {
        field: 'recibo',
        title: 'Recibo',
        valign: 'center',
        align: 'center'
      },
      {
        field: 'id_contrato',
        title: 'id contrato',
        valign: 'center',
        align: 'center',
        class: 'hide'
      }
    ];
  }

  setActiveExtras(extras) {
    this.activeExtras = extras;
  }
}
