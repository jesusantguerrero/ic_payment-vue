export default (Contracts) => {
  if (currentPage == 'contratos') {
    contractTable.init();
    Contracts.getAll();
  }

  $("#btn-save-contract").on('click', function (e) {
    e.stopImmediatePropagation();
    Contracts.add();
  });

  $("#btn-add-extra").on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    Contracts.callExtra();
  });

  $("#btn-cancel-contract, #btn-detail-cancel-contract").on('click', function (e) {
    e.preventDefault();
    var row, callback
    if (currentPage == 'contratos') {
      row = contractTable.getSelectedRow();
      callback = Contracts.getAll;
    } else {
      row = detailsContractTable.getSelectedRow();
      row.id = row.id_contrato;
      row.id_cliente = $('#datail-client-id').val();
      row.cliente = $('#detail-client-name').val();
      callback = Payments.contractRefresh;
    }

    if (row) {
      $(".cancel-name").text(row.cliente);
      var $inputElement = $(".confirmed-data");
      var $buttonToActive = $("#cancel-permanently");

      deleteValidation($inputElement, row.cliente, $buttonToActive);
      $("#cancel-print").attr("href", BASE_URL + 'process/getcancelcontract/' + row.id);

      $("#cancel-contract-modal").modal();

      $buttonToActive.on('click', function (e) {
        e.stopImmediatePropagation();
        Contracts.cancel(row, callback)
        $buttonToActive.attr('disable');
      })

      $inputElement.val('');
      $('#cancel-contract-modal .alert').removeClass('hide');
      $buttonToActive.attr('disabled', '');
    } else {
      swal("Debes seleccionar un contrato")
    }
  });

  $("#btn-suspend-contract").on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var row = contractTable.getSelectedRow();
    if (row) {
      swal({
        title: 'Está Seguro?',
        text: "Desea Suspender el contrato de " + row.cliente + " ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Estoy Seguro',
        cancelButtonText: 'Cancelar'
      }).then(function () {
        Contracts.suspend(row.id);
      });
    } else {
      swal("Debe seleccionar un contrato")
    }
  });

  $("#btn-update-contract").on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var id = contractTable.getId();
    if (id) {
      Contracts.getOne(id, Contracts.recieve);
    }
  });

  $("#select-contract-sector").on('change', function (e) {
    e.stopImmediatePropagation();
    Contracts.getIpList();
  })

  $('#select-pay-until').on('change', function (e) {
    e.stopImmediatePropagation();
    var $this = $('#select-pay-until :selected');
    var contractId = $this.attr('data-contract');
    var lastPaymentId = $(this).val();
    Payments.updateUntil(contractId, lastPaymentId);
  });
}
