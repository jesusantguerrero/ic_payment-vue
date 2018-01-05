import handlers from './handlers';

export default class payments {
  constructor() {
    this.ran = false;
    this.hasChanged = false;
    handlers(this);
  }

  update(id) {
    const date = moment().format('YYYY-MM-DD');
    const idContrato = $('#select-contract').val();
    const form = `tabla=pagos&id=${id}&estado=pagado&fecha_pago=${date}&id_contrato=${idContrato}`;
    connectAndSend('process/update', true, null, null, form, Payments.getAll);
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

  saveExtra() {
    axios.post(`${BASE_URL}process/`);
  }

  contractRefresh() {
    const idCliente = $('#detail-client-id').val();
    const form = `tabla=contratos_cliente&id=${idCliente}`;
    connectAndSend('process/getall', false, null, detailsContractTable.refresh, form, null);
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

    function apply() {
      applyDiscount(self.idPago);
      $modal.hide();
      $modal.modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }

    function interactiveSum() {
      $('.payment-sumandos').on('keyup', () => {
        $cuota.val(pago.cuota - $descuento.val());
        const suma = Number($cuota.val()) + Number($mora.val()) + Number($extra.val());
        $total.val(Number(suma));
      });
    }

    $concepto.val(pago.concepto);
    $fechaLimite.val(pago.fecha_limite);
    $cuota.val(pago.cuota);
    $mora.val(pago.mora);
    $extra.val(pago.monto_extra);
    $total.val(pago.total);
    $serviciosExtra.val(pago.detalles_extra);
    interactiveSum();

    $modal.modal();

    if (pago.mora > 0) {
      $cMora.iCheck('check');
      Payments.hasChanged = true;
    } else {
      $cMora.iCheck('uncheck');
      Payments.hasChanged = true;
    }

    if (pago.detalles_extra.includes('Reconexion')) {
      $cReconexion.iCheck('check');
      Payments.hasChanged = true;
    } else {
      $cReconexion.iCheck('uncheck');
      Payments.hasChanged = true;
    }


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

    if (!this.ran) {
      this.ran = true;
      $modal.on('hide.bs.modal', () => {
        $modal.find('input').val('');
      });

      $cMora.on('ifChecked', () => {
        const mora = (pago.cuota * settings.cargo_mora) / 100;
        Payments.setMora(mora, self.idPago)
          .then(() => {
            self.getOne(self.idPago, self.receiveForEdit);
          });
      });

      $cReconexion.on('ifChecked', () => {
        Payments.setExtra(0, self.idPago)
          .then(() => {
            self.getOne(self.idPago, self.receiveForEdit);
          });
      });

      $cMora.on('ifUnchecked', () => {
        Payments.setMora(0, self.idPago)
          .then(() => {
            self.getOne(self.idPago, self.receiveForEdit);
          });
      });

      $cReconexion.on('ifUnchecked', () => {
        Payments.deleteExtra(0, self.idPago)
          .then(() => {
            self.getOne(self.idPago, self.receiveForEdit);
          });
      });

      $modal.on('hide.bs.modal', () => {
        if (Payments.hasChanged) {
          Payments.hasChanged = false;
          Payments.getAll();
        }
      });
    }
  }

  setMora(mora, idPago) {
    const form = `data=${JSON.stringify({ mora, id_pago: idPago })}`;
    return axios.post(`${BASE_URL}payment/set_mora`, form)
      .then((res) => {
        displayMessage(res.data.mensaje);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
