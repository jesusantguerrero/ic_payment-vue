export default class userTable {
  constructor(Users) {
    this.Users = Users;
  }

  init(page) {
    const self = this;
    this.el = $('#t-users');
    this.el.bootstrapTable();
    this.el.find('tbody').css({
      display: 'table-row-group'
    });

    this.el.addClass('innertable');
    this.clickEvents();

    if (page) {
      this.el.bootstrapTable('selectPage', page);
    }

    this.el.on('all.bs.table', () => {
      self.clickEvents();
    });
  }

  getSelectedRow() {
    return this.el.bootstrapTable('getSelections')[0];
  }

  getId() {
    return $.map(this.el.bootstrapTable('getSelections'), row => row.id);
  }

  getRow(id) {
    const data = this.el.bootstrapTable('getRowByUniqueId', id);
    return data;
  }

  refresh(content, callback) {
    const options = this.el.bootstrapTable('getOptions');

    this.el.bootstrapTable('destroy');
    this.el.find('tbody').html(content);
    this.init(options.pageNumber);
    if (callback) { callback(); }
  }

  clickEvents() {
    const self = this;
    $('.delete-user').on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const $row = $(this).parents('tr');
      const id = $row.find('.user-id').text().trim();
      const row = self.getRow(id);
      swal({
        title: 'Está Seguro?',
        text: `Desea Eliminar al Usuario ${row.nombres} ${row.apellidos}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Estoy Seguro!',
        cancelButtonText: 'Cancelar'
      }).then(() => {
        self.Users.delete(id);
      });
    });

    $('.btn-change-state').on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const $row = $(this).parents('tr');
      const id = $row.find('.user-id').text().trim();
      const row = self.getRow(id);
      self.Users.changeState(id);
    });

    $('.edit-user').on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const id = $(this).attr('data-user-id');
      const row = self.getRow(id);

      $('#e-nickname').val(row.nick);
      $('#e-name').val(row.nombres);
      $('#e-lastname').val(row.apellidos);
      $('#e-dni').val(row.cedula);
      $('#e-type').val(row.tipo_codigo);
      $('#update-user-modal').modal();
    });
  }
}
