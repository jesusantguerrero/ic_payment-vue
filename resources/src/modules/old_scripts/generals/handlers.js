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
};
