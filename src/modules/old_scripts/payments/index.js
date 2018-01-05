import handlers from './handlers';

export default class payments {
  constructor() {
    this.ran = false;
    this.hasChanged = false;
    handlers(this);
  }

  saveAbonos() {
    const $textAbono = $('#text-abono-detail');
    const observations = $textAbono.val();
    const contractId = $('#select-contract').val();
    const $inputAbono = $('#input-abono');
    const abono = $inputAbono.val();

    const form = `observaciones=${observations}&abonos=${abono}&contrato_abono=${contractId}&tabla=abonos`;
    connectAndSend('process/update', true, null, null, form, Payments.getAll);
    $inputAbono.val('');
  }


  receiveForEdit(data) {
    function applyDiscount(idPago) {
      const date = moment().format('YYYY-MM-DD');
      const form = `id_pago=${idPago}&id_contrato=${self.idContrato}&cuota=${$cuota.val()}
        &mora=${$mora.val()}&monto_extra=${$extra.val()}
        &total=${$total.val()}&descuento=${$descuento.val()}&razon_descuento=${$razon.val()}
        &fecha_pago=${date}&detalles_extra=${$serviciosExtra.val()}&tabla=discount_pagos`;

      connectAndSend('process/update', true, null, null, form, Payments.getAll);
      $modal.hide();
    }

    $modal.modal();
    $('#btn-apply-discount').on('click', (e) => {
      e.stopImmediatePropagation();
      if ($descuento.val() > 0) {
        swal({
          title: 'Está Seguro?',
          text: `Seguro de que quiere aplicar este descuento de ${$descuento.val()}?`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(() => {
          apply();
        });
      } else {
        apply();
      }
    });


}
