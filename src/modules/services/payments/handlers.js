export default (Payments) => {
  paymentTable.init();
  extraTable.init();
  if (!ran) {
    Payments.getAll();
    ran = true;
  }

  $("#btn-pay").on('click', function (e) {
    e.stopImmediatePropagation();
    var id = paymentTable.getId();
    if (id) {
      Payments.update(id);
      update_mode(id);
    } else {
      displayMessage(MESSAGE_INFO + ' Debes seleccionar un pago');
    }
  });

  $("#select-contract").on('change', function (e) {
    e.stopImmediatePropagation();
    Payments.getAll();
  });

  $("#payment-detail-box").collapse()

  function update_mode(id) {
    var mode = $('.payment-mode.selected').text();
    var extraInfo = {
      id: id.toString(),
      module: 'pagos'
    }
    var form = 'data=' + JSON.stringify({
      tipo: mode
    }) + '&extra_info=' + JSON.stringify(extraInfo);

    var send = axios.post(BASE_URL + 'process/axiosupdate', form)
  }
}
