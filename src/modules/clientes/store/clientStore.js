export default class ClientStore {
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
        title: 'id',
        class: 'hide'
      },
      {
        field: 'nombres',
        title: 'Nombres',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'apellidos',
        title: 'Apellidos',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'cedula',
        title: 'Cedula',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'celular',
        title: 'Celular',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'estado',
        title: 'Estado',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'estadoreal',
        title: 'Estado Real',
        class: 'hide',
        align: 'center',
        valign:	'middle'
      },
      {
        field: 'nombre_completo',
        title: 'Nombre Completo',
        class: 'hide'
      },
    ];
  }
}
