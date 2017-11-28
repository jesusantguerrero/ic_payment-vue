
function updateMode(id) {
  const mode = $('.payment-mode.selected').text();
  const extraInfo = {
    id: id.toString(),
    module: 'pagos'
  };
  const form = `data=${JSON.stringify({
    tipo: mode
  })}&extra_info=${JSON.stringify(extraInfo)}`;

  axios.post(`${BASE_URL}process/axiosupdate`, form);
}

export default (Payments) => {
  paymentTable.init();
  extraTable.init();
  if (!Payments.ran) {
    Payments.getAll();
    Payments.ran = true;
  }

  $('#btn-pay').on('click', (e) => {
    e.stopImmediatePropagation();
    const id = paymentTable.getId();
    if (id) {
      Payments.update(id);
      updateMode(id);
    } else {
      displayMessage(`${MESSAGE_INFO} Debes seleccionar un pago`);
    }
  });

  $('#select-contract').on('change', (e) => {
    e.stopImmediatePropagation();
    Payments.getAll();
  });

  $('#payment-detail-box').collapse();
};
