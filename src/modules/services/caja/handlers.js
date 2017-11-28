export default (Caja) => {
  const btnAddMoney = $('#btn-add-money');
  const btnRetireMoney = $('#btn-retire-money');
  const userSearch = $('#caja-user');
  const dateSearch = $('#caja-date');

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
};
