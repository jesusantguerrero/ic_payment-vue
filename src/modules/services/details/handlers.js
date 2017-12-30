export default (Clients,Contracts, Payments) => {
      var $clientName = $('#detail-client-name');

      $("#btn-save-observations").on('click', function (e) {
        e.stopImmediatePropagation();
        Payments.saveAbonos();
      });


      $("#btn-detail-suspend-contract").on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var row = detailsContractTable.getSelectedRow();
        if (row) {
          swal({
            title: 'Está Seguro?',
            text: "Desea Suspender el contrato de " + $clientName.val() + " ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Estoy Seguro',
            cancelButtonText: 'Cancelar'
          }).then(function () {
            Contracts.suspend(row.id_contrato, Payments.contractRefresh);
          });
        } else {
          swal("Debe seleccionar un contrato")
        }
      });

      $("#btn-call-reconnect").on('click', function (e) {
        e.stopImmediatePropagation()
        var row = detailsContractTable.getSelectedRow();
        if (row) {
          $("#reconnect-modal").modal();
        } else {
          swal("Debe seleccionar un contrato primero");
        }
      })

      $("#btn-reconnect").on('click', function (e) {
        e.stopImmediatePropagation()
        var row = detailsContractTable.getSelectedRow();
        if (row) {
          Contracts.reconnect(row.id_contrato, Payments.contractRefresh);
        }
      })

      $('#btn-call-extra').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var context = 'details';
        Contracts.callExtra(context);
      })
    }
