$(function () {

  if (currentPage == "administrador") {
    newUserForm();
  }

  getDate();
  adminFunctions();
  userInfoTip();
  makeServiceCardClickable();

  if (currentPage == "detalles" || currentPage != 'nuevo_contrato') {
    detailsFunctions();
  }

  notificationFunctions();
  newContractFunctions();
  checkWindowSize();

  $(window).on('resize', function () {
    checkWindowSize();
  })

  onWindowLoadFunctions();

});


// TODO: Move -- Mover a modulo de nuevo_contrato
function newContractFunctions() {
  var btnPrintContract = $("#btn-print-contract");
  var document = $(".note-item");
  var radioActivateContract = $("#radio-new-contract");
  var radioDisableContract = $("#radio-just-requirement");
  var contractControls = $(".contract-controls");
  var requirementControls = $(".requirement-controls");

  radioActivateContract.parents("label").on('click', function () {
    activateContractMode();

  });

  radioDisableContract.parents("label").on('click', function () {
    disableContractMode()
  });

  function activateContractMode($btn) {
    radioDisableContract
      .removeAttr("checked", "")
      .html("")
    radioActivateContract
      .attr("checked", "")
      .html("&#10004;")
    document.removeClass("print-requirement");
    contractControls.removeClass("hide")
    requirementControls.addClass("hide")

  }

  function disableContractMode($btn) {
    radioActivateContract
      .removeAttr("checked", "")
      .html("")
    radioDisableContract
      .attr("checked", "")
      .html("&#10004;")
    document.addClass("print-requirement");
    requirementControls.removeClass("hide")
    contractControls.addClass("hide")
  }
}
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
  var smallButtonsSelect = $('.btn-small');
  var tabs = {
    contractControls: ["#contracts", "#month-and-date", "#reconnect-service", '#extra-contract', '#extra-service', '#extra-extension', '#extra-upgrade'],
    paymentControls: ["#payments", "#detalles-de-pago", "#descuentos"]
  }

  $('[role="tab"]').on('click', function () {
    var href = $(this).attr("href")

    if (compare(href, tabs.paymentControls)) {
      $(".payment-controls").addClass("visible");
    } else {
      $(".payment-controls").removeClass("visible");
    }

    if (compare(href, tabs.contractControls)) {
      $(".contract-controls").removeClass("hide")
    } else {
      $(".contract-controls").addClass("hide")
    }
    getTabControls($(this));
  });

  $('.btn-small').on('click', function () {
    smallButtonsSelect.removeClass('selected');
    $(this).addClass('selected');
  })

  function compare(value, posibleValues) {
    var returnValue = false;
    posibleValues.forEach(function (theValue) {
      if (value == theValue) {
        returnValue = true;
      }
    }, this);

    return returnValue;
  }

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

// TODO: Move -- Poner como mixing es utilizado en detalles y clientes, servicios, contratos, extras
function checkWindowSize() {
  var width = window.screen.availWidth;
  var brandName = document.querySelector('.brand span');

  if (width <= 1100) {
    brandName.textContent = "P";
  } else {
    brandName.textContent = "Payment";
  }
}

function onWindowLoadFunctions(){
  $('body').scroll(function () {
    position = $('body').scrollTop()
    movableNav = $('.aside-nav-container, .aside-wide-left')
    if (position >= 50) {
      if(!movableNav.hasClass('moved'))
        movableNav.addClass('moved')
    } else {
      movableNav.removeClass('moved')
    }
  })
}
