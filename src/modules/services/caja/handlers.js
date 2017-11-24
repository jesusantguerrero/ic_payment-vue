export default (Caja) => {
    if (currentPage == 'administrador') {
      cajaTable.init();
    }

    var btnAddMoney    = $("#btn-add-money");
    var btnRetireMoney = $("#btn-retire-money");
    var userSearch     = $("#caja-user");
    var dateSearch     = $("#caja-date");

    btnAddMoney.on('click', function (e) {
      e.stopImmediatePropagation();
      Caja.add();
    });

    btnRetireMoney.on('click', function (e) {
      e.stopImmediatePropagation();
      Caja.retire();
    });

    dateSearch.on('change', function (e) {
      e.stopImmediatePropagation();
      Caja.search();
    });

    userSearch.on('change', function (e) {
      e.stopImmediatePropagation();
      Caja.search();
    });
}
