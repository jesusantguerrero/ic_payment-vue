$(function () {
  if (currentPage == "detalles" || currentPage != 'nuevo_contrato') {
    detailsFunctions();
  }
  checkWindowSize();

  $(window).on('resize', function () {
    checkWindowSize();
  })

  onWindowLoadFunctions();

});



/********************************************************
 *                          Modals Functions
 *                                                       *
 ********************************************************/

 // TODO: Move -- mover a modulo de cliente, componente modal

$('#search-client-modal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  clientTable.init();
  var title = button.find('.section-title').text();
  if (!title) title = "Buscar Cliente"
  if (title.toLowerCase().trim() == "registrar pago") {
    buttonText = "ir a Pagos"
  } else {
    buttonText = "Nuevo Contrato"
  }

  var modal = $(this)
  modal.find('.modal-title').text(title)
  modal.find('.modal-footer .save').text(buttonText)
  modal.find('tbody').html('')
})

// TODO: Move -- mover a modulo de contratos, componente update contract
$('#update-contract-modal').on('show.bs.modal', function (event) {
  $("#select-contract-sector").change();
})
/*********************************************************
 *              other functions                          *
 *                                                       *
 ********************************************************/
// TODO: move -- usado en detalles y nuevo_contrato
function detailsFunctions() {
  function getTabControls($this) {
    var controls = $this.attr("aria-controls");
    $(".dynamic-controls").text(controls);
  }
}

//TODO: warning se usa en dos modals buscar la la manera de pasar a Contracts object de controllers
$("#select-contract-code").on('change', function () {
  var $this = $(("#select-contract-code :selected"));
  $("#contract-ip").val($this.attr("data-ip-final"));
  $("#u-contract-ip").val($this.attr("data-ip-final"));

});
//TODO: end warning
