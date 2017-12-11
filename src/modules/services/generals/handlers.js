import Damages from './../notificaciones/damages';
import Installations from './../notificaciones/installations';

export default (Generals) => {
  if (currentPage === 'notificaciones') {
    Generals.count_table('averias');

    $('#averias-view-mode').on('change', (e) => {
      e.stopImmediatePropagation();
      Damages.getAll();
    });

    $('#installations-view-mode').on('change', (e) => {
      e.stopImmediatePropagation();
      Installations.getAll();
    });

    $('tbody').css({
      display: 'table-row-group'
    });
  }

  const averiaClient = $('#a-client').select2({
    dropdownParent: $('#new-averia-modal'),
    width: '100%',
    ajax: {
      url: `${BASE_URL}process/search`,
      dataType: 'json',
      delay: 250,
      data(params) {
        return {
          q: params.term,
          tabla: 'clientes_para_averias'
        };
      },

      processResults(data, params) {
        params.page = params.page || 1;
        return {
          results: data.items,
          pagination: {
            more: (params.page * 30) < data.total_count
          }
        };
      },
      cache: true
    }
  });

  $('#btn-save-averia').on('click', (e) => {
    e.stopImmediatePropagation();
    Damages.add(averiaClient.val());
  });

  $('.btn-update-averia').on('click', function (e) {
    e.stopImmediatePropagation();
    const idAveria = $(this).parents('.averia-item').find('.code').text()
      .trim();
    Damages.update(idAveria);
  });

  $('.btn-update-installation').on('click', function (e) {
    e.stopImmediatePropagation();
    const idPago = $(this).parents('.averia-item').find('.code').text()
      .trim();
    Installations.update(idPago);
  });

  $('#extra-controls').on('click', function (e) {
    const Contracts = new contracts();

    e.stopImmediatePropagation();
    Contracts.btnExtraPressed($(this));
  });

  $('#extra-client-dni').on('keydown', function (e) {
    const Contracts = new contracts();

    const key = e.which;
    const dni = $(this).val();
    if (key === 13) {
      Contracts.getAllOfClient(dni);
    }
  });
};
