export default (Clients) => {
  if (currentPage == 'clientes') {
    clientTable.init();
  }

  $('#btn-save-client').on('click', function (e) {
    e.stopImmediatePropagation();
    Clients.add();
  });

  $('#update-client').on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const id = clientTable.getId();
    if (id) {
      Clients.getOne(id, Clients.receiveForEdit);
    }
  });

  $('#client-searcher').on('keyup', function (e) {
    e.stopImmediatePropagation();
    let text = $(this).val();
    Clients.search(text);
  });

  $('#client-searcher-newcontract').on('keyup', function (e) {
    e.stopImmediatePropagation();
    let text = $(this).val();
    if (!isEmpty([text])) {
      Clients.search(text);
    } else {
      clearTbody('.lobby-results');
    }
  });

  $('#delete-client').on('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const row = clientTable.getSelectedRow();
    if (row) {
      swal({
        title: 'Está Seguro?',
        text: `Desea Eliminar al(la) Cliente ${row.nombres} ${row.apellidos}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Estoy Seguro!',
        cancelButtonText: 'Cancelar'
      }).then(function () {
        cGenerals.deleteRow(row.id, 'clientes')
      });
    }
  });
};
