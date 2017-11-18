var BASE_URL = window.location.origin + "/";
if(BASE_URL.includes("localhost") || BASE_URL.includes('ngrok.io')){
  BASE_URL += 'icpayment/';
}

var MESSAGE_SUCCESS = '<i class="material-icons">done_all</i>';
var MESSAGE_ERROR   = '<i class="material-icons">error_outline</i>';
var MESSAGE_INFO    = '<i class="material-icons">info_outline</i>';
var SUMMER_SKY      = '#1FA1D0'
try {
  var busAveria       = new Vue();
} catch(err) {
  displayMessage(' no vue');
}

/**
 * Connect And Send
 * Conecta al servidor via ajax y muestra el mensaje de respuesta
 * @param {string} url Url a donde se va a mandar la el formulario, sin la base_url
 * @param {boolean} is_message Si se espera un mensaje o no como respuesta 
 * @param {callback} recognizeElements Funcion para reconocer los elementos autogenerados
 * @param {?callback} action callback que recibe los datos desde el servidor para hacer algo con ellos
 * @param {string} form formulario a ser enviado al servidor
 * @param {callback} callback funcion a ser ejecutada despues que todo se cumpla, como get users
 * @param {function} loading function for loading
 * @return {void}
 */

function connectAndSend(url,is_message,recognizeElements,action,form,callback,loading){
  if(!loading) loading = lineLoad
  var connect = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); 
    connect.onreadystatechange = function() {
        
        if (connect.readyState == 4 && connect.status == 200) {
          if(loading)loading(true);
          if (action != null)  {
              action(connect.responseText,recognizeElements);          
          }
          else{
            if(is_message){
              displayMessage(connect.responseText);                            
            }              
          }
          if(callback != null)callback();
        } 

        else if (connect.readyState != 4) {
          if(loading)loading(false);      
        }
    }

    connect.open("POST",BASE_URL + url, true);
    connect.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    connect.send(form);
}
/********************************************************
*         Funciones de mensajes y notificaciones                            
*                                                       *
********************************************************/
/**
 * Display Message
 * Muestra una notificacion del resultado de la consulta
 * @param {string} message string to be displayed 
 * @return {void}
 */

function displayMessage(message){
  var color = "rgba(102,187,106,1)";
  var toast,span;

    if(message.includes(MESSAGE_ERROR)){
      color = "rgba(244,67,54,1)";
    }else if(message.includes(MESSAGE_INFO)){
      color = "rgba(2,136,209,1)";
    }

    toast = $(".toast")
    span = toast.find("span").html(message);
    span.css({background:color});
    toast.css({display:"flex"});
    
    toast.animate({opacity:"1"},500,function(){
      setTimeout(function() {
        toast.animate({opacity:"0"});
        toast.css({display:"none"});
      }, 2000);
    });
}

function displayAlert(title,message,type){
  if(!title) title = "Revise";
  if(!message) message = "Asegurate de llenar todos los campos"
  if(!type) type = "error"
  swal({
      title: title,
      text: message,
      type: type,
      confirmButtonClass: 'btn',
      buttonsStyling: false
    });
}

/********************************************************
*        fucniones para Llenar tablas                                        
*                                                       *
********************************************************/

/**
 * Llena la tabla actual con los datos que vienen del servidor
 * @param {string} $content El html con los datos a ser mostrados, vienen siempre desde el servidor
 * @param {function} callback El callback para reconocer a los nuevos items
 * @return {void}
 */
function fillCurrentTable($content,callback,tableID){
  var $table
  $("html").removeClass("gr__icpayment-soft_com")
  if(tableID != undefined){
    $table = $('#'+tableID + " tbody");
  }else{
    $table = $('[class*="t-"] tbody');
  }
  $table.html($content);
  if(callback) callback();
}

/**
 * Llena la tabla clientes utilizando la funcion fillCurrentTable pasandole la tabla clientes como valor
 * @return {void}
 */
function fillClientTable($content,callback){
  fillCurrentTable($content,callback,"t-clients");
}

/**
 * Llena la tabla caja utilizando la funcion fillCurrentTable pasandole la tabla clientes como valor
 * @return {void}
 */
function fillCajaTable($content,callback){
  fillCurrentTable($content,callback,"caja");
  if(callback)callback();
}
/**
 * Llena la Lista de pagos/notificaciones con los datos que vienen del servidor
 * @param {string} $content El html con los datos a ser mostrados, vienen siempre desde el servidor
 * @param {function} callback El callback para reconocer a los nuevos items
 * @return {void}
 */

function fillPaymentsList($content,callback){
  var $container = $(".list-nextpayments");
  $container.html($content);
}

function fillAveriasList($content,callback){
  var $container = $("#averias-list");
  $container.html($content);
  busAveria.$emit('tickets-listed',1);
  callback();

}

function fillInstallationsList($content,callback){
  var $container = $("#installations-list");
  $container.html($content);
  callback();
}

function makeContractList(response,callback){
  if(response != "nada"){
    var contracts = JSON.parse(response);
    var value,service,equipment,eMac,router,rMac,code;
    var selectContract = $("#extra-client-contract");
    var element = "<option value=''>--Selecciona--</option>";
    var cliente = contracts.cliente;
    var contractId = ''
    if(currentPage != 'detalles' && currentPage != 'home'){
      contractId = contractTable.getId();
    }else if( currentPage != 'home'){
      contractId = detailsContractTable.getSelectedRow().id_contrato
    }

    for (var i = 0; i < contracts.contratos.length; i++) {
      value     = contracts.contratos[i]["id_contrato"];
      service   = contracts.contratos[i]["servicio"];
      equipment = contracts.contratos[i]["nombre_equipo"];
      router    = contracts.contratos[i]["router"];
      eMac      = contracts.contratos[i]["mac_equipo"];
      rMac      = contracts.contratos[i]["mac_router"];
      code     = contracts.contratos[i]["codigo"];
      element += "<option value='" + value + "' data-service='"+service+"'  data-equipment='"+equipment+"'  data-e-mac='"+eMac+"'";
      element += " data-router='"+router+"'  data-r-mac='"+rMac+"' data-code='"+code+"'>";
      element += value +"</option>";  
    }
    selectContract.html(element);
    selectContract.val(contractId).change();
    $("#extra-client-name").val(cliente['nombres'] + " " + cliente['apellidos']);

  }else{
    displayMessage(MESSAGE_ERROR + " Este cliente no existe revise su cedula por favor");
  } 
}

function clearTbody(objecId){
  $(objecId).html("");
}

function makePaymentList(response,callback){
  var selectPayUntil = $('#select-pay-until');
  selectPayUntil.html(response);
  selectPayUntil.parent().removeClass('hide');
  selectPayUntil.change();
  if(callback)callback();
}


/**
 * isEmpty
 * Verifica si los valores dados estan vacios o son nulos 
 * @param {Array. < string} values
 * @return {boolean}
 */
function isEmpty(values,is_num){
  for(var i = 0 ; i < values.length ; i++){
    if (values[i] == null || values[i] == ""){
      return true;
    } 
  }
  return false;
}


function updateSaldo(money){
  money = "RD$ "+ CurrencyFormat(money)
  $(".current-saldo").text(money);
}
function updateCount($content){
  $(".total-rows").html($content);
}
// +-----------------------------------------------------------------------------------------------------------------------------+
// |                                                     User passwords validations                                              |
// |                                                                                                                             |
// +-----------------------------------------------------------------------------------------------------------------------------+
//

function validateModal($modalId){
  var $userPassword = $($modalId+' .password');
  var $userPasswordConfirm = $($modalId+' .password-confirm');
  var $saveButton = $($modalId+' .save');
  
  $userPasswordConfirm.on('blur keyup',function(){
    validateTwo($userPassword,$userPasswordConfirm,$saveButton);
  });
  $saveButton.on('click',clearForm($modalId));
}

function validateTwo($firstObject,$secondObject,$button){
    if($secondObject.val() == $firstObject.val() && $secondObject.val() != ""){
      replaceClass($firstObject.parent(),"has-error","has-success");
      replaceClass($secondObject.parent(),"has-error","has-success");
      $button.removeAttr("disabled","");

    }else{
       replaceClass($firstObject.parent(),"has-success","has-error");
       replaceClass($secondObject.parent(),"has-success","has-error");
       $button.attr("disabled","");
    }
}

function validateThis(){
  var $userPassword = $('.password');
  var $userPasswordConfirm = $('.password-confirm');
  var $saveButton = $('.save');
  
  $userPassword.on('blur keyup',function(){
    validateTwo($userPassword,$userPasswordConfirm,$saveButton);
  });
  $userPasswordConfirm.on('blur keyup',function(){
    validateTwo($userPassword,$userPasswordConfirm,$saveButton);
  });
}

function clearForm(modalId){
  $(modalId + " input").val("");
}
function deleteValidation($inputElement, text, $buttonToActive){
  var innerText;
  this.text = text;
  var self  = this;
  var warning = $('#cancel-contract-modal .alert');

  $inputElement.on("keyup",function(e){
    e.stopImmediatePropagation();
    innerText = $(this).val() 
    if(innerText.toLowerCase() == self.text.toLowerCase()){
      $buttonToActive.removeAttr("disabled");
      warning.addClass('hide');
    }else{
      $buttonToActive.attr("disabled","");
      warning.removeClass('hide');
    }
  })
}

// +-----------------------------------------------------------------------------------------------------------------------------+
// |                                                     Funciones de utileria                                                   |
// |                                                                                                                             |
// +-----------------------------------------------------------------------------------------------------------------------------+
//


function replaceClass($object,oldClass,newClass){
   $object.addClass(newClass);
   $object.removeClass(oldClass)
}

function makeServiceCardClickable(){
    var serviceCard      = $(".service-card");
    var btnPrintContract = $('#btn-print-requirement');

    serviceCard.on('click',function(e){
      e.stopImmediatePropagation();
      var $this       = $(this);
      var service_id  = $this.attr('data-id'); 
      var payment     = $this.attr('data-payment');
      var realLink    = btnPrintContract.attr('data-href')
      
      serviceCard.removeClass('selected');
      $this.addClass('selected');
      btnPrintContract.attr("href",realLink + "/" + service_id);
      $('#contract-client-payment').val(payment)
    })
}
/********************************************************
*                          Verify Rows                            
*                                                       *
********************************************************/


function verifyContractStatus(){
  $(".td-estado").each(function(i,value){
    var $this = $(this);
    var text = $this.text().trim();
    if(text == "activo"){
      $this.css({color:"green"})
    }else if(text == "saldado"){
      $this.parents("tr").css({background:"rgba(22,255,0,.3)",color:"#555"});
    }
  });
}

function verifyClientStatus(){
   $("td").each(function(i,value){
    var $this = $(this);
    var text = $this.text().trim();
    if(text == "no activo"){
      $this.css({color:"rgba(200,0,0,.7)"})
    }else if(text == "activo"){
      $this.css({color:"green"});
    }
  });
}

/********************************************************
*                       Loaders                            
*                                                       *
********************************************************/

function heavyLoad(stop){
  if(!stop){
    var html = '<div class="heavy-loader active">'
        html +=   '<div class="circle-load"></div>'
        html +=   '<div class="message">Preparando los datos</div>'
        html += '</div>'
    $("body").append(html)
    $("body").css({overflow:"hidden"});
    var message = $(".heavy-loader .message");
    setTimeout(function(){
      message.text("Configurando...");
    },4000)
    setTimeout(function(){
      message.text("Casi Terminamos ...");
    },8000)
    setTimeout(function(){
      message.text("Terminando el proceso ...");
      removeLoader();
    },15000)
  }else{
    removeLoader();
  }

  function removeLoader(){
    var loader = $(".heavy-loader");
    loader.remove();
    $("body").css({overflow:"auto"});
  }
}

function lineLoad(stop) {
  if(!stop){
     $(".loader").css({
      display: "block"
      });
  }else{
    $(".loader").css({display: "none"});
  }
}
$(function () {
  var currentPage = $("title").text().split(" ");
  currentPage = currentPage[4].toLowerCase().trim();
  
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
  /**
   * Get Date:
   * Obtiene la fecha actual al segundo y la muestra en la pantalla de inicio
   * @return {void}
   */
  function getDate() {
    var $day = $('.day');
    var $monthYear = $('.month-year');
    var $dayWeek = $('.dayweek');
    var $Hora = $('.hour span');
    var date, day, month, year, sHour;
    var days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    setInterval(updateHour, 1000);

    function updateHour() {
      date = new Date();
      sDate = date.toString()
      $day.text(date.getDate());
      $monthYear.text("De " + months[date.getMonth()] + " de " + date.getFullYear());
      $dayWeek.text(days[date.getDay()]);

      sHour = moment().format('LTS');
      $Hora.html(sHour);
    }
  }

  /**
   * Admin Functions:
   * se encarga de el movimiento de los paneles en la pantalla 'administrador'
   * @return {void}
   */

  function adminFunctions() {
    $('#company-section').animate({
      left: "0"
    }, 200)
    $('.administrador .aside-buttons a').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      var cardName = $this.attr('href').slice(1);
      if (cardName != null) {
        $('.company-details').animate({
          left: "-110%"
        }, 200)
        $('#' + cardName + '.company-details').animate({
          left: "0"
        }, 200)
      }
    })

    if ($("#acount-section").length > 0) {
      $('#acount-section').animate({
        left: "0"
      }, 200)
    }
  }

  /**
   * new User Form:
   * vaida las contraseñas en los formularios de los usuarios
   * @return {void}
   */

  function newUserForm() {
    validateModal("#new-user-modal");
    validateModal("#update-user-modal");
  }

  /**
   * User Info Tip
   * hace un toggle en la visibilidad de la info del usuario
   * @return {void}
   */

  function userInfoTip() {
    var infoTip = $(".user-info-tip");
    var profilePicture = $(".profile-picture");
    var btnMore = $(".btn-more");

    btnMore.on('click', function (e) {
      infoTip.toggleClass("visible");
    });
  }

});

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

$('#update-contract-modal').on('show.bs.modal', function (event) {
  $("#select-contract-sector").change();
})
/*********************************************************
 *              other functions                          * 
 *                                                       *
 ********************************************************/

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
}

function getTabControls($this) {
  var controls = $this.attr("aria-controls");
  $(".dynamic-controls").text(controls);
}

function notificationFunctions() {
  var btnAverias = $("#btn-see-averias");
  var btnPagos = $("#btn-see-pagos");
  var btnCajaChica = $('#btn-see-caja');
  var btnDeudores = $("#btn-see-deudores")
  var btnDayIncomes = $("#btn-see-day-incomes")
  var layoutContainer = $(".layout-container");

  btnAverias.on('click', function () {
    layoutContainer.animate({
      left: "-100%"
    }, 200);
  });

  btnPagos.on('click', function () {
    layoutContainer.animate({
      left: "0"
    }, 200);
  });

  btnDeudores.on('click', function () {
    layoutContainer.animate({
      left: "-200%"
    }, 200);
  });

  btnDayIncomes.on('click', function () {
    layoutContainer.animate({
      left: "-300%"
    }, 200);
  });
}

$("#select-extra-service").on('change', function () {
  var $this = $(("#select-extra-service :selected"));
  var cost = $this.attr("data-payment");

  $("#extra-service-cost").val(cost)
});

$("#extra-client-contract").on('change', function () {
  var $this = $(("#extra-client-contract :selected"));

  $("#extra-contract-service").val($this.attr("data-service"));
  $("#extra-equipo").val($this.attr("data-equipment"));
  $("#extra-router").val($this.attr("data-router"));
  $("#extra-e-mac").val($this.attr("data-e-mac"));
  $("#extra-r-mac").val($this.attr("data-r-mac"));
  $("#extra-code").val($this.attr("data-code"));
});

$(".columns-right").removeClass("pull-right");

$("#select-contract-code").on('change', function () {
  var $this = $(("#select-contract-code :selected"));
  $("#contract-ip").val($this.attr("data-ip-final"));
  $("#u-contract-ip").val($this.attr("data-ip-final"));

});

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

var Users = {
  add: function () {
    var form, nick, password, name, lastname, dni, type, is_empty;

    nick      = $("#user-nickname").val();
    password  = $("#user-password").val();
    name      = $("#user-name").val();
    lastname  = $("#user-lastname").val();
    dni       = getVal($("#user-dni"));
    type      = $("#user-type").val();

    var is_empty = isEmpty([nick, password, name, lastname, dni, type]);
    if (!is_empty) {
      form = 'nickname=' + nick + "&password=" + password + "&name=" + name + "&lastname=" + lastname;
      form += "&dni=" + dni + "&type=" + type;
      connectAndSend("user/addnew", true, initAdminHandlers, null, form, Users.getAll);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  update: function () {
    var form, nick, password, name, lastname, dni, type;

    nick     = $("#e-nickname").val();
    name     = $("#e-name").val();
    lastname = $("#e-lastname").val();
    dni      = $("#e-dni").val();
    type     = $("#e-type").val();

    var is_empty = isEmpty([nick, name, lastname, dni, type]);
    if (!is_empty) {
      form = 'nickname=' + nick + "&name=" + name + "&lastname=" + lastname;
      form += "&dni=" + dni + "&type=" + type;
      connectAndSend("user/update", true, initAdminHandlers, null, form, Users.getAll);
    } else {
       displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  getAll: function () {
    var form = "table=users";
    connectAndSend('user/getusers', false, initAdminHandlers, userTable.refresh, form, null);
  },

  delete: function (id) {
    var form = "user_id=" + id;
    connectAndSend('user/deleteuser', true, initAdminHandlers, null, form, Users.getAll);
  },
  //TODO: Deprecated init

  confirmPassword: function(userId,currentPassword) {
    var form = 'user_id='+ userId +'&current_password=' + currentPassword;
    connectAndSend('user/confirm_password', false, false, processConfirmData, form, null, null);
    
    function processConfirmData(response) {
      var newPassword         = $("#acount-new-password");
      var newPasswordConfirm  = $("#acount-confirm-new-password");
      
      if (response == 1) {      
        newPassword.removeAttr('disabled');
        newPasswordConfirm.removeAttr('disabled');
        validateThis();
      }else{
        newPassword.attr('disabled',true);
        newPasswordConfirm.attr('disabled',true);
      }
    }
  },

  updatePassword: function(userId,currentPassword,newPassword){
    var form = 'user_id='+ userId  + "&current_password="+ currentPassword +'&new_password=' + newPassword;
    connectAndSend('user/update_password', false, false, Users.passwordChanged, form, null,heavyLoad);
  },

  passwordChanged: function(response){
    if(response==1){
      displayMessage(MESSAGE_SUCCESS + 'Contraseña Cambiada con exito')
      setTimeout(function(){
        window.location.href = BASE_URL + 'app/logout'
      },3000)      
    }else{
      displayMessage(MESSAGE_ERROR + ' Error al cambiar de contraseña, revise la contraseña actual')
    }
      
  }

  //TODO: deprecated end
}

var Clients = {
  add: function () {
    var form, nombres, apellidos, cedula, celular, provincia, sector, calle, casa,detallesDireccion,
        telefono,lugarTrabajo, telTrabajo, ingresos, fechaRegistro, estado;

    nombres            = $("#client-name").val();
    apellidos          = $("#client-lastname").val();
    cedula             = getVal($("#client-dni"));
    celular            = getVal($("#client-phone"));
    provincia          = $("#client-provincia").val();
    sector             = $("#client-sector").val();
    calle              = $("#client-street").val();
    casa               = $('#client-house').val();
    detallesDireccion  = $('#client-direction-details').val();
    telefono           = getVal($('#client-telephone'));
    lugarTrabajo       = $('#client-job').val();
    telTrabajo         = getVal($('#client-job-telephone'));
    ingresos           = $('#client-salary').val();
    fechaRegistro      = moment().format("YYYY-MM-DD");
    estado             = "no activo";

    var is_empty = isEmpty([nombres, apellidos, cedula, celular, provincia, sector, calle, casa, telefono]);
    if (!is_empty) {
      form = 'nombres=' + nombres + "&apellidos=" + apellidos + "&cedula=" + cedula + "&celular=" + celular;
      form += "&provincia=" + provincia + "&sector=" + sector + "&calle=" + calle + "&casa=" + casa + "&telefono=" + telefono;
      form += "&lugar_trabajo=" + lugarTrabajo + "&tel_trabajo=" + telTrabajo + "&ingresos=" + ingresos + "&fecha_registro=" + fechaRegistro;
      form += "&estado=" + estado + "&detalles_direccion=" + detallesDireccion  + "&tabla=clientes";

      connectAndSend("process/add", true, initClientHandlers, null, form, Clients.getAll);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  getAll: function () {
    var form = "tabla=clientes";
    connectAndSend('process/getall', false, initClientHandlers, clientTable.refresh, form, null);
  },

  getOne: function (id, receiver) {
    form = "tabla=clientes&id=" + id;
    connectAndSend("process/getone", false, initClientHandlers, receiver, form, null)
  },

  receiveForEdit: function (content) {
    var client            = JSON.parse(content);
    this.id                = client['id_cliente'];
    var $nombres           = $("#u-client-name");
    var $apellidos         = $("#u-client-lastname");
    var $cedula            = $("#u-client-dni");
    var $celular           = $("#u-client-phone");
    var $provincia         = $("#u-client-provincia");
    var $sector            = $("#u-client-sector");
    var $calle             = $("#u-client-street");
    var $casa              = $('#u-client-house');
    var $detallesDireccion = $('#u-client-direction-details');
    var $telefono          = $('#u-client-telephone');
    var $lugarTrabajo      = $('#u-client-job');
    var $telTrabajo        = $('#u-client-job-telephone');
    var $ingresos          = $('#u-client-salary');

    $nombres.val(client['nombres']);
    $apellidos.val(client['apellidos']);
    $cedula.val(client['cedula']);
    $celular.val(client['celular']);
    $provincia.val(client['provincia']);
    $sector.val(client['sector']);
    $calle.val(client['calle']);
    $casa.val(client['casa']);
    $detallesDireccion.val(client['detalles_direccion']);
    $telefono.val(client['telefono']);
    $lugarTrabajo.val(client['lugar_trabajo']);
    $telTrabajo.val(client['tel_trabajo']);
    $ingresos.val(client['salario']);

    $("#update-client-modal").modal();
    $("#btn-update-client").on('click', function () {
      updateClient();
    });

    function updateClient() {
      var is_empty = isEmpty([$nombres.val(), $apellidos.val(), $cedula.val(), $celular.val(), $provincia.val(), $sector.val(), $calle.val(),
        $casa.val(), $telefono.val()
      ]);

      if (!is_empty) {
        form = 'id=' + id + '&nombres=' + $nombres.val() + "&apellidos=" + $apellidos.val() + "&cedula=" + getVal($cedula);
        form += "&celular=" + getVal($celular) + "&provincia=" + $provincia.val() + "&sector=" + $sector.val() + "&calle=" + $calle.val();
        form += "&casa=" + $casa.val()+ "&detalles_direccion=" + $detallesDireccion.val()  + "&telefono=" + getVal($telefono) + "&lugar_trabajo=" + $lugarTrabajo.val() + "&tel_trabajo=";
        form += getVal($telTrabajo) + "&tabla=clientes";
        form += "&ingresos=" + $ingresos.val();

        connectAndSend("process/update", true, initClientHandlers, null, form, Clients.getAll);

      } else {
        displayAlert("Revise", "LLene todos los campos por favor", "error");
      }
    }
  },

  saveObservations: function () {
    var form, observations,idCliente;
 
    observations = $("#text-observations").val();
    idCliente    = $("#detail-client-id").val();
 
    form = 'observaciones=' + observations + "&tabla=observaciones&id_cliente=" + idCliente;
    connectAndSend("process/update", true, null, null, form, null)
  },
  
  updateState: function (client) {
    form = 'data='+ JSON.stringify(client)+ '&module=clientes&action=update';
      connectAndSend('process/getjson',true,null,null,form, null);
  }
}

var Generals = {
  deleteRow: function (id, tabla) {
    var form = "tabla=" + tabla + "&id=" + id;
    var handlers, callback;
    switch (tabla) {
      case 'clientes':
        callback = Clients.getAll;
        break;
      case 'servicios':
        callback = Services.getAll;
        break;
    }
    connectAndSend('process/delete', true,null, null, form, callback);
  },
  /**
   * Search manda un mensaje al servidor de los valores a buscar
   * @param {string} text el valor a ser buscado
   * @param {string} dbTable nombre de la tabla donde se desea consultar en la base de datos
   * @param {function} fillTableFunction funcion de llenado de tabla donde se mostraran los resultados 
   * @param {function} handlerFunction funcion reinicio de los elementos en los handlers 
   */
  
  search: function (text, dbTable, fillTableFunction, handlerFunction) {
    if (handlerFunction == undefined) handlerFunction = initClientHandlers;
    if (fillTableFunction == undefined) fillTableFunction = fillCurrentTable;
    var word = text;
    if (word != null || word != "") {
      var form = "tabla=" + dbTable + "&word=" + word;
      connectAndSend('process/search', false, handlerFunction, fillTableFunction, form, null);
    }
  },

  count_table: function (table) {
    var form = "tabla=" + table;
    var updateFunction = updateCount;
    if (table == 'caja') updateFunction = updateCajaCount
    connectAndSend('process/count', false, null, updateFunction, form, null);
  }
}

var Services = {
  add: function () {
    var form, name, description, payment, type;

    name        = $("#service-name").val();
    description = $("#service-description").val();
    payment     = $("#service-monthly-payment").val();
    type        = $("#service-type").val();

    var is_empty = isEmpty([name, description, payment, type]);
    if (!is_empty) {
      form = 'nombre=' + name + "&descripcion=" + description + "&mensualidad=" + payment + "&tipo=" + type;
      form += "&tabla=servicios";
      connectAndSend("process/add", true, null, null, form, Services.getAll);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  getAll: function () {
    var form = "tabla=servicios";
    connectAndSend('process/getall', false, null, serviceTable.refresh, form, null);
  },

  update: function () {
    var form, id, name, description, payment, type;

    id          = $('#u-service-id').val();
    name        = $('#u-service-name').val();
    description = $('#u-service-description').val();
    payment     = $('#u-service-monthly-payment').val();
    type        = $('#u-service-type').val();

    var is_empty = isEmpty([id, name, description, payment, type]);
    if (!is_empty) {
      form = 'id_servicio=' + id + "&nombre=" + name + "&descripcion=" + description + "&mensualidad=" + payment;
      form += "&tipo=" + type + "&tabla=servicios";
      connectAndSend("process/update", true, null, null, form, Services.getAll,heavyLoad);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  }
}

var Contracts = {
  add: function addNewContract() {
    var form, table, client_id, user_id, service_id, code, contract_date, payment, duration,
      equipment, eMac, router, rMac, total, nextPayment, model, ip;

    client_id     = $("#contract-client-id").val();
    user_id       = $("#contract-user-id").val();
    service_id    = $(".service-card.selected").attr('data-id');
    contract_date = $('#contract-client-date').val();
    duration      = $('#contract-client-months').val();
    equipment     = $('#contract-equipment').val();
    eMac          = $('#contract-e-mac').val();
    router        = $('#contract-router').val();
    rMac          = $('#contract-r-mac').val();
    model         = $('#contract-equipment-model').val();
    ip            = $('#contract-ip').val();
    code          = $("#select-contract-code").val();

    payment = $("#contract-client-payment").val();
    nextPayment = moment(contract_date).add(1, 'months').format('YYYY-MM-DD');

    var is_empty = isEmpty([client_id, user_id, service_id, contract_date, duration]);
    if (!is_empty) {
      total = (Number(duration) + 1) * Number(payment);
      form = 'id_empleado=' + user_id + "&id_cliente=" + client_id + "&id_servicio=" + service_id + "&codigo=" + code + "&fecha=" + contract_date;
      form += "&duracion=" + duration + "&monto_total=" + total + "&monto_pagado=0&ultimo_pago=null";
      form += "&mensualidad=" + payment + "&proximo_pago=" + nextPayment + "&estado=activo&tabla=contratos";
      form += "&nombre_equipo=" + equipment + "&mac_equipo=" + eMac + "&router=" + router + "&mac_router=" + rMac;
      form += "&modelo=" + model + "&ip=" + ip;
      connectAndSend("process/add", null, null, Contracts.getLast, form, null);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  getAll: function() {
    var form = "tabla=contratos";
    var callback = null
    var refresh = contractTable.refresh;
    if (contractTable.el == 'detalles') {
      callback = Payments.getAll()
      refresh = null
    }
    connectAndSend('process/getall', false, null, refresh, form, callback);
  },

  getLast: function(data) {
    data = JSON.parse(data);
    displayMessage(data.mensaje)
    $("#btn-save-contract").attr("disabled", "");
    $("#btn-print-contract").removeAttr("disabled");
    if(data.tabla_pagos){
      makePaymentList(data.tabla_pagos);
    }
  },

  callExtra: function(context) {
    var row
    if (context == "details"){
      row = detailsContractTable.getSelectedRow();
    }else{
      row = contractTable.getSelectedRow();
    }
    
    if (row) {
      $("#extra-client-dni").val(row.cedula);
      Contracts.getAllOfClient(row.cedula);
      $('#add-extra-modal').modal();
    } else {
       displayAlert("Revise", "Seleccione el conrato primero", "error");
    }
  },

  cancel: function(row,callback) {
    var is_penalty = false;
    var reason     = $("#cancelation-reason").val();
    var checked    = $("#check-penalty:checked").length;
    var form, fecha;
    console.log(row)
    if(row.id){
      if (checked > 0) {
        is_penalty = true;
      }
      fecha = moment().format("YYYY-MM-DD");
      form = 'id_contrato=' + row.id + '&fecha=' + fecha + '&id_cliente=' + row.id_cliente;
      form += "&motivo=" + reason + "&penalidad=" + is_penalty;
      connectAndSend('process/cancel', true, null, null, form, callback);
    }else{
      displayMessage(MESSAGE_ERROR +" No hay contrato seleccionado");
    }
  },

  getOne: function(id_contrato, receiver) {
    form = "tabla=contratos&id_contrato=" + id_contrato;
    connectAndSend("process/getone", false, null, receiver, form, null)
  },

  recieve: function(content) {
    var contract    = JSON.parse(content);
    this.id_contrato = contract['id_contrato'];
    var $equipo     = $("#u-contract-equipment");
    var $macEquipo  = $("#u-contract-e-mac");
    var $router     = $("#u-contract-router");
    var $macRouter  = $("#u-contract-r-mac");
    var $modelo     = $("#u-contract-modelo");
    var $codigo     = $("#select-contract-code");
    var $isChangeIp = $("#check-change-ip");
    var $ip         = $("#u-contract-ip");

    $equipo.val(contract['nombre_equipo']);
    $macEquipo.val(contract['mac_equipo']);
    $router.val(contract['router']);
    $macRouter.val(contract['mac_router']);
    $modelo.val(contract['modelo']);
    $ip.val(contract['ip']);

    // $("#update-contract-modal select").val('')
    $("#update-contract-modal").modal();
    $("#update-contract").on('click', function (e) {
      e.stopImmediatePropagation();
      updateContract(id_contrato);
    });

    function updateContract(id_contrato) {
      var checked = $("#check-change-ip:checked").length;
      form = 'id_contrato=' + id_contrato + '&nombre_equipo=' + $equipo.val() + "&mac_equipo=" + $macEquipo.val();
      form += "&router=" + $router.val() + "&mac_router=" + $macRouter.val();
      form += "&modelo=" + $modelo.val();
      form += "&tabla=contratos";
      if (checked > 0) {
        form += "&ip=" + $ip.val() + "&codigo=" + $codigo.val();
      }
      connectAndSend("process/update", true, null, null, form, Contracts.getAll);
    }
  },

  getIpList: function () {
    var section_id = $("#select-contract-sector").val();
    var form = "id_seccion=" + section_id + "&tabla=ip_list";
    connectAndSend("process/getall", false, null, makeIpList, form, null);

    function makeIpList(content) {
      $("#select-contract-code").html(content);
    }
  },

  btnExtraPressed: function ($this) {
    var buttonId = $this.text().trim().toLowerCase();

    switch (buttonId) {
      case "mejorar":
        Contracts.upgrade();
        break;
      case "extender":
        Contracts.extend();
        break;
      case "guardar":
        Contracts.addExtra();
        break;
    }
  },

  upgrade: function () {
    var form, contractId, selectedService, serviceId, amount;

    contractId = $("#extra-client-contract").val();
    selectedService = $(".service-card.selected");
    serviceId = selectedService.attr("data-id");
    amount = selectedService.attr("data-payment");

    var is_empty = isEmpty([contractId, serviceId, amount]);
    if (!is_empty) {
      form = 'id_contrato=' + contractId + "&id_servicio=" + serviceId + "&cuota=" + amount;
      connectAndSend('process/upgrade', true, initGlobalHandlers, null, form, Contracts.getAll)
    } else {
      displayAlert("Revise", "asegurate de llenar todos los datos y seleccionar el servicio", "info");
    }
  },

  reconnect: function (contractId,callback) {
    var form, selectedService, serviceId, duration, date,send, is_empty,info;

    selectedService = $(".service-card.selected");
    serviceId = selectedService.attr("data-id");
    duration  = $("#reconnection-months").val();
    date = $("#reconnection-date").val()
    is_empty = isEmpty([contractId,serviceId,date,duration]);
    if(!is_empty){
      info = {
        'id_contrato': contractId,
        'fecha': date,
        'id_servicio': serviceId,
        'duracion': duration
      }

      form = "data=" + JSON.stringify(info);
      send = axios.post(BASE_URL + "contract/reconnect",form);
      send.then(function(res){
        displayMessage(res.data.mensaje);
        Payments.getAll();
        $("#btn-reconnect").removeAttr("disabled");
        $(".reconnect-caller").removeClass('visible');
        if(callback)
          callback()
      })
      send.catch(function(err){
        console.log(err);
      })
    }else{
      swal("Llene todos los campos")
    }
  },

  addExtra: function () {
    var form, contractId, extraService, serviceCost, equipment, eMac, router, rMac,paymentMode;

    contractId = $("#extra-client-contract").val();
    serviceCost = $("#extra-service-cost").val();
    extraService = $("#select-extra-service").val();
    equipment = $("#extra-equipo").val();
    eMac = $("#extra-e-mac").val();
    router = $("#extra-router").val();
    rMac = $("#extra-r-mac").val();
    paymentMode = $("#select-payment-mode").val();

    var is_empty = isEmpty([contractId, extraService, serviceCost,paymentMode]);
    if (!is_empty) {
      form = 'id_contrato=' + contractId + "&costo_servicio=" + serviceCost + "&nombre_servicio=" + extraService;
      form += '&nombre_equipo=' + equipment + "&mac_equipo=" + eMac + "&router=" + router + "&mac_router=" + rMac;
      form += '&modo_pago=' + paymentMode;
      connectAndSend('process/addextra', true, initGlobalHandlers, null, form, Contracts.getAll);
    } else {
      displayAlert("revise", "asegurate de llenar todos los datos y seleccionar el servicio", "info");
    }
  },

  extend: function () {
    var form, contractId, duration;
    contractId = $("#extra-client-contract").val();
    duration = $("#extra-extension-months").val();

    var is_empty = isEmpty([duration, contractId]);
    if (!is_empty) {
      form = 'id_contrato=' + contractId + "&duracion=" + duration;
      connectAndSend('process/extend_contract', true, initGlobalHandlers, null, form, Contracts.getAll)
    } else {
      displayAlert("revise", "asegurate de llenar todos los datos y seleccionar el servicio", "info");
    }
  },

  getAllOfClient: function(dni) {
    var form = "dni=" + dni;
    connectAndSend("process/data_for_extra", false, null, makeContractList, form, null);
  },

  // Note: lo siento, de aqui en adelante uso axios, es mucho mas comodo

  suspend: function (contractId, callback) {
    var form = "data=" + JSON.stringify({id_contrato: contractId})
    var send = axios.post(BASE_URL + 'contract/suspend',form);
    send.then(function(res){
      var data = res.data
      displayMessage(data.mensaje);
      Contracts.getAll();
      if(callback)
        callback()
    })
    send.catch(function(error){
      console.log(error);
    })
  }
}

var Payments = {
  getAll: function () {
    var id = $("#select-contract").val();
    if (id != null) {
      var form = "tabla=pagos&id=" + id;
      connectAndSend('process/getall', false, null, paymentTable.refresh, form, Payments.contractRefresh);
    }
  },

  update: function (id) {
      var date = moment().format("YYYY-MM-DD");
      var id_contrato = $("#select-contract").val();
      var form = "tabla=pagos&id=" + id + "&estado=pagado&fecha_pago=" + date + "&id_contrato=" + id_contrato;
      connectAndSend('process/update', true, null, null, form, Payments.getAll);
  },

  saveAbonos: function () {
    var form, observations, abono$inputAbono,$textAbono,contractId;

    $textAbono   = $('#text-abono-detail');
    observations = $textAbono.val();
    contractId   = $("#select-contract").val();
    $inputAbono  = $("#input-abono");
    abono        = $inputAbono.val();

    form = 'observaciones=' + observations + "&abonos=" + abono;
    form += "&contrato_abono="+contractId+"&tabla=abonos";
    connectAndSend("process/update", true, null, null, form, Payments.getAll)
    $inputAbono.val('')
  },

  saveExtra: function () {
    var send = axios.post(BASE_URL + 'process/')
  },

  updateUntil: function(contractId,lastPaymentId){
    var id_contrato = $("#select-contract").val();
    var form = "tabla=pagos_al_dia&id_ultimo_pago=" + lastPaymentId + "&estado=pagado&id_contrato=" + contractId;
    var handlers, callback;
    connectAndSend('process/update', true, null, null, form, null, heavyLoad);
  },
    
  removePayment: function (id) {
    var form = "tabla=deshacer_pago&id_pago=" + id;
    connectAndSend('process/update', true, null, null, form, Payments.getAll);
  },

  contractRefresh: function(){
    var id_cliente = $('#detail-client-id').val()
    var form = "tabla=contratos_cliente&id=" + id_cliente;
    connectAndSend('process/getall', false, null, detailsContractTable.refresh, form, null);
  },

  getOne: function(id_pago, receiver) {
    form = "tabla=pagos&id_pago=" + id_pago;
    connectAndSend("process/getone", false, null, receiver, form, null)
  },

  receiveForEdit: function(content){
    var data          = JSON.parse(content);
    var pago          = data.pago
    var settings      = data.settings;
    this.id_contrato  = pago['id_contrato'];
    this.id_pago      = pago['id_pago']
    var $concepto     = $("#payment-concept");
    var $fechaLimite  = $("#payment-limit-date");
    var $serviciosExtra = $("#payment-extra-services");
    var $cuota        = $("#payment-cuota");
    var $mora         = $("#payment-mora");
    var $extra        = $("#payment-extra");
    var $total        = $("#payment-total");
    var $descuento    = $("#payment-discount-amount");
    var $razon        = $("#payment-discount-reason");
    var $modal        = $("#advanced-payment");
    var $cMora        = $("#c_mora");
    var $cReconexion  = $("#c_reconexion");

    $concepto.val(pago['concepto']);
    $fechaLimite.val(pago['fecha_limite']);
    $cuota.val(pago['cuota']);
    $mora.val(pago['mora']);
    $extra.val(pago['monto_extra']);
    $total.val(pago['total']);
    $serviciosExtra.val(pago['detalles_extra']);
    interactiveSum();

    $modal.modal();

    $modal.on('hide.bs.modal',function(){
      $modal.find('input').val('')
    });

    if (pago['mora'] > 0) {
      $cMora.iCheck('check');      
    } else {
      $cMora.iCheck('uncheck'); 
    }
    
    if (pago['detalles_extra'].includes('Reconexion')) {
      $cReconexion.iCheck('check');
    } else {
      $cReconexion.iCheck('uncheck');     
    }

    $("#btn-apply-discount").on('click', function (e) {
      e.stopImmediatePropagation();
      if ($descuento.val() > 0) {
        swal({
          title: 'Está Seguro?',
          text: "Seguro de que quiere aplicar este descuento de " + $descuento.val() + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
          apply();
        });
      } else {
        apply();
      } 
    });

    $cMora.on('ifChecked', function () {
      var mora = pago['cuota'] * settings['cargo_mora'] / 100;
      $mora.val(mora).trigger('keyup');
    });
    
    $cReconexion.on('ifChecked', function () {
      $extra.val(settings['reconexion']).trigger('keyup');
      $serviciosExtra.val('Reconexion');
    })
    
    $cMora.on('ifUnchecked', function () {
      $mora.val(0).trigger('keyup');
    })
    
    $cReconexion.on('ifUnchecked', function () {
      $extra.val(0).trigger('keyup');
      $serviciosExtra.val('');
    })


    function apply () {
      applyDiscount(id_pago);
      $modal.hide();
      $modal.modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }

    function applyDiscount(id_pago) {
      var date = moment().format("YYYY-MM-DD");
      form = 'id_pago=' + id_pago + '&id_contrato=' + id_contrato + "&cuota=" + $cuota.val();
      form += "&mora=" + $mora.val() + "&monto_extra=" + $extra.val();
      form += "&total=" + $total.val() + '&descuento=' + $descuento.val() + '&razon_descuento=' +$razon.val();
      form += '&fecha_pago=' + date + '&detalles_extra=' + $serviciosExtra.val() + "&tabla=discount_pagos";

      connectAndSend("process/update", true, null, null, form, Payments.getAll);
      $modal.hide();
    }

    function interactiveSum(){
      $('.payment-sumandos').on('keyup',function(){
        $cuota.val(pago['cuota'] - $descuento.val());
        var suma = Number($cuota.val()) + Number($mora.val()) + Number($extra.val());
        $total.val(Number(suma))
      })
    }
  },

}

var Damages = {
  
  add: function (idCliente) {
    var form, description;
    description = $("#a-description").val();

    var is_empty = isEmpty([idCliente, description]);
    if (!is_empty) {
      form = 'id_cliente=' + idCliente + "&descripcion=" + description + "&tabla=averias";
      connectAndSend("process/add", true, initGlobalHandlers, null, form, Damages.getAll);
    } else {
       displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
    $('#new-averia-modal').find('input,textarea').val("");
  },

  getAll: function () {
    var status = $("#averias-view-mode").val();
    $(".presentado").text(status);
    var form = "tabla=averias&estado=" + status;
    connectAndSend('process/getall', false, initGlobalHandlers, fillAveriasList, form, null);
  },

  update: function ($id_averia) {
    var form = "tabla=averias&id_averia=" + $id_averia;
    connectAndSend('process/update', true, initGlobalHandlers, null, form, Damages.getAll);
  }

}

var Installations = {
  getAll: function () {
    var status = $("#installations-view-mode").val();
    var form = "tabla=instalaciones&estado=" + status;
    connectAndSend('process/getall', false, initGlobalHandlers, fillInstallationsList, form, null);
  },

  update: function ($id_pago) {
    var form = "tabla=instalaciones&id_pago=" + $id_pago;
    connectAndSend('process/update', true, initGlobalHandlers, null, form, Installations.getAll);
  }
}

var Caja = {
  add: function () {
    var form, amount, description, is_empty;

    amount = $("#caja-a-amount").val();
    description = $("#caja-a-description").val();
    form = "entrada=" + amount + "&descripcion=" + description + "&tabla=caja";
    is_empty = isEmpty([amount, description]);
    if (!is_empty) {
      connectAndSend('process/add', true, null, null, form, Caja.getAll);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  retire: function () {
    var form, amount, description, is_empty;

    amount = $("#caja-r-amount").val();
    description = $("#caja-r-description").val();
    form = "salida=" + amount + "&descripcion=" + description;
    is_empty = isEmpty([amount, description]);
    if (!is_empty) {
       connectAndSend('process/retire', true, null, null, form, Caja.getAll);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  getAll: function () {
    var form = "tabla=caja";
    connectAndSend('process/getAll', false, null, cajaTable.refresh, form, Caja.getSaldo);
  },

  getSaldo: function () {
    var form = "tabla=caja";
    connectAndSend('process/getone', false, null, updateSaldo, form, null)
  },

  search: function () {
    var $dateSearch = $("#caja-date");
    var $userSearch = $("#caja-user");
    var date = ($dateSearch.val()) ? $dateSearch.val() : '%';
    var userId = ($userSearch.val()) ? $userSearch.val() : '%';

    var form = "tabla=caja&id_empleado=" + userId + "&fecha=" + date;
    connectAndSend('process/search', false, null, cajaTable.refresh, form, null);
  }
}

var Company = {
  update: function () {
    var form,
    companyName = $("#company-name").val(),
    companyStatement = $("#company-statement").val(),
    companyPhone1 = getVal($("#company-phone1")),
    companyDirection = $("#company-direction").val(),
    companyDescription = $("#company-description").val(),
    companyPhone2 = getVal($("#company-phone2"))

    form = 'nombre=' + companyName + '&lema=' + companyStatement + '&descripcion=' + companyDescription + "&direccion="
    form += companyDirection + "&telefono1=" + companyPhone1 + "&telefonos=" + companyPhone2 + "&tabla=empresa";
    connectAndSend('process/update', true, null, null, form, null);
  }
}

var Settings = {
  update: function () {
    var form,
    settingsCargoMora = $("#settings-mora").val(),
    settingsFechaCorte = $("#settings-fecha-corte").val(),
    settingsReconexion = $("#settings-reconexion").val(),
    settingsPenalizacionCancelacion = $("#settings-penalizacion-cancelacion").val(),
    settingsMesesPorDefecto = $("#settings-meses-por-defecto").val(),
    settingsSplitDay = $("#settings-split-day").val();

    form = 'cargo_mora=' + settingsCargoMora + '&fecha_corte=' + settingsFechaCorte + '&reconexion=' + settingsReconexion;
    form += '&penalizacion_cancelacion=' + settingsPenalizacionCancelacion + '&meses_por_defecto=' + settingsMesesPorDefecto;
    form += '&split_day=' + settingsSplitDay + '&tabla=settings';
    connectAndSend('process/update', true, null, null, form, null);
  }
}

var Sections = { 
  add: function() {
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3']
    })

    var steps = [{
        title: 'Nombre del sector'
      },
      'Codigo del Sector',
    ]

    swal.queue(steps).then(function (result) {
      swal.resetDefaults()
      save(result)
    });

    function save(result){
      var form;
      var nombre = result[0];
      var codigoArea = result[1],

      form = "nombre="+nombre+"&codigo_area="+codigoArea;
      form += "&tabla=secciones"
     
      return new Promise(function(resolve){
         if(connectAndSend('process/add', true, false, null, form,Sections.getAll,heavyLoad)){
           return resolve();
         }
      })
    }
  },

  getIps: function() {
    var id = $("#select-sector").val();
    $('.print-table').attr('href', BASE_URL + 'process/getreport/secciones/' + id);
    
    if (id != null) {
      var form = "tabla=ips&id=" + id;
      connectAndSend('process/getall', false, null, sectionTable.refresh, form,null);
    }
  },

  getAll: function() {
    var form = "tabla=secciones";
    connectAndSend('process/getall', false, null, fillSelect, form,heavyLoad);

    function fillSelect(content){
      $("#select-sector").html(content);
    }
  },

  updateIpState: function (IP) {
    form = 'data='+ JSON.stringify(IP) + '&extra_info=' + JSON.stringify({module: 'ip'});
      axios.post(BASE_URL + 'process/axiosupdate', form)
      .then(function(res) {
        displayMessage(res.data.mensaje);
      })
  }
}

var Extras = {
  remove: function (id) {
    var id_cliente, send;
    
    id_cliente = $('#detail-client-id').val()
    form = "data=" + JSON.stringify({id: id,id_cliente: id_cliente});
    send = axios.post(BASE_URL + 'extra/delete_extra', form);
    send.then(function(res){
      var data = res.data;
      displayMessage(data.mensaje);
      extraTable.refresh(data.extras);
    });
    
    send.catch(function(error){
      console.log(error);
    });

  }
}
  var currentPage = $("title").text().split(" ");
  currentPage = currentPage[4].toLowerCase().trim();
  var ran = false;

  function initComponents() {
    switch (currentPage) {
      case "home":
        initClientHandlers();
        break;
      case "administrador":
        initAdminHandlers();
        break;
      case "clientes":
        initClientHandlers();
        break;
      case "servicios":
        initServicesHandlers();
        break;
      case "nuevo_contrato":
        initContractHandlers();
        Contracts.getIpList();
        break;
      case "detalles":
        initPaymentsHandlers();
        detailHandlers();
        initContractHandlers();
        break;
      case "contratos":
        initContractHandlers();
        initClientHandlers();
        break;
      case "secciones":
        sectionHandlers();
        break;
      case "secciones2":
        sectionHandlers();
        console.log('here')
        break;
    }

    initCajaHandlers();
    initGlobalHandlers();
  }

  // **************************************************     globals handlers       *****************************
  function initGlobalHandlers() {

    var averiaClientDni = $("#a-client-dni");

    if (currentPage == 'notificaciones') {
      Generals.count_table("averias");

      $("#averias-view-mode").on('change', function (e) {
        e.stopImmediatePropagation();
        Damages.getAll();
      });

      $("#installations-view-mode").on('change', function (e) {
        e.stopImmediatePropagation();
        Installations.getAll();
      });

      $('tbody').css({
        display: "table-row-group"
      });
    }

    if (currentPage == 'contratos') {
      initContractHandlers();
    }

    var averiaClient = $("#a-client").select2({
      dropdownParent: $('#new-averia-modal'),
      width: '100%',
      ajax: {
        url: BASE_URL + 'process/search',
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            q: params.term,
            tabla: 'clientes_para_averias'
          }
        },

        processResults: function (data, params) {
          params.page = params.page || 1
          return {
            results: data.items,
            pagination: {
              more: (params.page * 30) < data.total_count
            }
          }
        },
        cache: true
      }
    })

    $("#btn-save-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      Damages.add(averiaClient.val());
    });

    $(".btn-update-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      var id_averia = $(this).parents('.averia-item').find('.code')
      id_averia = id_averia.text().trim();
      Damages.update(id_averia);
    });

    $(".btn-update-installation").on('click', function (e) {
      e.stopImmediatePropagation();
      var id_pago = $(this).parents('.averia-item').find('.code');
      id_pago = id_pago.text().trim();
      Installations.update(id_pago);
    });

    $("#extra-controls").on('click', function (e) {
      e.stopImmediatePropagation();
      Contracts.btnExtraPressed($(this));
    });

    $("#extra-client-dni").on('keydown', function (e) {
      var key = e.which;
      var dni = $(this).val()
      if (key == 13) {
        Contracts.getAllOfClient(dni);
      }
    });

  }

  //***************************************************     admin handlers          ***************************** */
  function initAdminHandlers() {
    userTable.init();
    $("#btn-save-user").on('click', function (e) {
      e.stopImmediatePropagation();
      Users.add();
    });

    $("#btn-update-user").on('click', function (e) {
      e.stopImmediatePropagation();
      Users.update();
    });

    $("#update-company-data").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      Company.update();
    });

    $("#btn-update-settings").on('click', function (e) {
      e.preventDefault();
      Settings.update();
    });

  }
  //***************************************************     Init caja          ***************************** */

  function initCajaHandlers() {
    if (currentPage == 'administrador') {
      cajaTable.init();
    }
    var btnAddMoney = $("#btn-add-money");
    var btnRetireMoney = $("#btn-retire-money");
    var userSearch = $("#caja-user");
    var dateSearch = $("#caja-date");

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

  //***************************************************  Init client Handlers      ***************************** */
  function initClientHandlers() {
    if (currentPage == 'clientes') {
      clientTable.init();
    }

    $("#btn-save-client").on('click', function (e) {
      e.stopImmediatePropagation();
      Clients.add();
    });

    $("#update-client").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var id = clientTable.getId();
      if (id) {
        Clients.getOne(id, Clients.receiveForEdit);
      }
    });

    $("#client-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      Generals.search(text, "clientes", clientTable.refresh);
    });

    $("#client-searcher-newcontract").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      if (!isEmpty([text])) {
        Generals.search(text, "clientes", clientTable.refresh);
      } else {
        clearTbody(".lobby-results");
      }
    });

    $("#delete-client").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var row = clientTable.getSelectedRow();
      if (row) {
        swal({
          title: 'Está Seguro?',
          text: "Desea Eliminar al(la) Cliente " + row.nombres + " " + row.apellidos + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function () {
          Generals.deleteRow(row.id, "clientes")
        });
      }
    });

  }
  //***************************************************  Init Services Handlers    ***************************** */
  function initServicesHandlers() {
    serviceTable.init();

    $("#btn-save-service").on('click', function (e) {
      e.stopImmediatePropagation();
      Services.add();
    });

    $("#delete-service").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var id = serviceTable.getId();
      if (id) {
        swal({
          title: 'Está Seguro?',
          text: "Desea Eliminar  el Servicio?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function () {
          Generals.deleteRow(id, "servicios");
        });
      }
    });

    $("#edit-service").on('click', function (e) {
      e.preventDefault();
      var row = serviceTable.getSelectedRow();

      $('#u-service-id').val(row.id);
      $('#u-service-name').val(row.nombre);
      $('#u-service-description').val(row.descripcion);
      $('#u-service-monthly-payment').val(Number(row.mensualidad.replace("RD$ ", '')));
      $('#u-service-type').val(row.tipo);
      $('#update-service-modal').modal();

    });

    $("#btn-update-service").on('click', function (e) {
      e.stopImmediatePropagation();
      Services.update();
    });

    $("#service-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      Generals.search(text, "servicios", serviceTable.refresh, initServicesHandlers);
    });


  }
  //***************************************************  Init Contract Handlers    ***************************** */
  function initContractHandlers() {
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

    $("#contract-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      Generals.search(text, "v_contratos", contractTable.refresh, null);
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
  //***************************************************  Init Payments  Handlers   ***************************** */

  function initPaymentsHandlers() {
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
        // TODO: MESSAGE Select a payment
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
      send.then(function (response) {
        //TODO: something whith that / algo con esto
      });
      send.catch(function () {
        console.error(error);
      });
    }
  }
  //***************************************************      detail Handlers       ***************************** */
  function detailHandlers() {

    var $clientName = $('#detail-client-name');

    $("#btn-save-observations").on('click', function (e) {
      e.stopImmediatePropagation();
      Payments.saveAbonos();
    });

    $('#btn-save-real-observations').on('click', function (e) {
      e.stopImmediatePropagation();
      Clients.saveObservations();
    })

    detailsContractTable.init();

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

  function sectionHandlers() {
    if (!ran) {
      sectionTable.init();
      Sections.getIps();
      ran = true;
    }

    $("#btn-add-section").on('click', function (e) {
      e.preventDefault()
      e.stopImmediatePropagation();
      Sections.add();
    });

    $("#select-sector").on('change', function (e) {
      e.stopImmediatePropagation();
      Sections.getIps();
    });
  }

  $(function () {
    initComponents()
  });
var ran = false;

function loginHandlers() {

  $("#send-credentials").on('click', function (e) {
    e.stopImmediatePropagation();
    Session.login();
  });

  $("#user-input").on('keydown', function (e) {
    e.stopImmediatePropagation();
    loginLibrary.sendToLogin(e)
  })

  $("#password-input").on('keydown', function (e) {
    e.stopImmediatePropagation();
    loginLibrary.sendToLogin(e)
  })

  $("a[href]").on('click', function () {
    loginLibrary.loading();
    var $this = $(this);
    try {
      var target = $this.attr('target');
      setTimeout(function () {
        $(".loader").css({
          display: "none"
        });
      }, 3000)
    }catch (error) {
      throw error
    }
  })
}

var Session = {
  login: function() {
    var user     = $("#user-input").val();
    var password = $("#password-input").val();
    var is_empty = isEmpty([user, password])
    if (!is_empty) {
      var form = 'user=' + user + '&password=' + password;
      connectAndSend('app/login', false, false, Session.processLoginData, form, null, loginLibrary.loading)
    } else {
      displayMessage(MESSAGE_ERROR + " LLene todos los campos indicados para ingresar")
    }
  },

  processLoginData: function(response) {
    if (response == true) {
      window.location.href = BASE_URL + 'app/admin/';
    } else {
      $(".loader").css({
        display: "none"
      });
      displayMessage(MESSAGE_INFO + " Usuario y Contraseña no validos")
    }
  }
}
var loginLibrary = {
  loading: function(stop) {
    if(!stop){
       $(".loader").css({
        display: "block"
        });
    }else{
      $(".loader").css({display: "none"});
    }
  },
  
  sendToLogin: function(e) {
    key = e.which
    if (key == 13) {
      Session.login();
    }
  }
}

$(function () {
  loginHandlers();
})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbHMuanMiLCJiYXNlLmpzIiwiY29udHJvbGxlcnMuanMiLCJhamF4LmpzIiwiYWpheDIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImZvb3QyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBCQVNFX1VSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBcIi9cIjtcclxuaWYoQkFTRV9VUkwuaW5jbHVkZXMoXCJsb2NhbGhvc3RcIikgfHwgQkFTRV9VUkwuaW5jbHVkZXMoJ25ncm9rLmlvJykpe1xyXG4gIEJBU0VfVVJMICs9ICdpY3BheW1lbnQvJztcclxufVxyXG5cclxudmFyIE1FU1NBR0VfU1VDQ0VTUyA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZG9uZV9hbGw8L2k+JztcclxudmFyIE1FU1NBR0VfRVJST1IgICA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZXJyb3Jfb3V0bGluZTwvaT4nO1xyXG52YXIgTUVTU0FHRV9JTkZPICAgID0gJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5pbmZvX291dGxpbmU8L2k+JztcclxudmFyIFNVTU1FUl9TS1kgICAgICA9ICcjMUZBMUQwJ1xyXG50cnkge1xyXG4gIHZhciBidXNBdmVyaWEgICAgICAgPSBuZXcgVnVlKCk7XHJcbn0gY2F0Y2goZXJyKSB7XHJcbiAgZGlzcGxheU1lc3NhZ2UoJyBubyB2dWUnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbm5lY3QgQW5kIFNlbmRcclxuICogQ29uZWN0YSBhbCBzZXJ2aWRvciB2aWEgYWpheCB5IG11ZXN0cmEgZWwgbWVuc2FqZSBkZSByZXNwdWVzdGFcclxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVcmwgYSBkb25kZSBzZSB2YSBhIG1hbmRhciBsYSBlbCBmb3JtdWxhcmlvLCBzaW4gbGEgYmFzZV91cmxcclxuICogQHBhcmFtIHtib29sZWFufSBpc19tZXNzYWdlIFNpIHNlIGVzcGVyYSB1biBtZW5zYWplIG8gbm8gY29tbyByZXNwdWVzdGEgXHJcbiAqIEBwYXJhbSB7Y2FsbGJhY2t9IHJlY29nbml6ZUVsZW1lbnRzIEZ1bmNpb24gcGFyYSByZWNvbm9jZXIgbG9zIGVsZW1lbnRvcyBhdXRvZ2VuZXJhZG9zXHJcbiAqIEBwYXJhbSB7P2NhbGxiYWNrfSBhY3Rpb24gY2FsbGJhY2sgcXVlIHJlY2liZSBsb3MgZGF0b3MgZGVzZGUgZWwgc2Vydmlkb3IgcGFyYSBoYWNlciBhbGdvIGNvbiBlbGxvc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybSBmb3JtdWxhcmlvIGEgc2VyIGVudmlhZG8gYWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtjYWxsYmFja30gY2FsbGJhY2sgZnVuY2lvbiBhIHNlciBlamVjdXRhZGEgZGVzcHVlcyBxdWUgdG9kbyBzZSBjdW1wbGEsIGNvbW8gZ2V0IHVzZXJzXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGxvYWRpbmcgZnVuY3Rpb24gZm9yIGxvYWRpbmdcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBjb25uZWN0QW5kU2VuZCh1cmwsaXNfbWVzc2FnZSxyZWNvZ25pemVFbGVtZW50cyxhY3Rpb24sZm9ybSxjYWxsYmFjayxsb2FkaW5nKXtcclxuICBpZighbG9hZGluZykgbG9hZGluZyA9IGxpbmVMb2FkXHJcbiAgdmFyIGNvbm5lY3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPyBuZXcgWE1MSHR0cFJlcXVlc3QoKSA6IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyBcclxuICAgIGNvbm5lY3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNvbm5lY3QucmVhZHlTdGF0ZSA9PSA0ICYmIGNvbm5lY3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYobG9hZGluZylsb2FkaW5nKHRydWUpO1xyXG4gICAgICAgICAgaWYgKGFjdGlvbiAhPSBudWxsKSAge1xyXG4gICAgICAgICAgICAgIGFjdGlvbihjb25uZWN0LnJlc3BvbnNlVGV4dCxyZWNvZ25pemVFbGVtZW50cyk7ICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoaXNfbWVzc2FnZSl7XHJcbiAgICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoY29ubmVjdC5yZXNwb25zZVRleHQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihjYWxsYmFjayAhPSBudWxsKWNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgZWxzZSBpZiAoY29ubmVjdC5yZWFkeVN0YXRlICE9IDQpIHtcclxuICAgICAgICAgIGlmKGxvYWRpbmcpbG9hZGluZyhmYWxzZSk7ICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3Qub3BlbihcIlBPU1RcIixCQVNFX1VSTCArIHVybCwgdHJ1ZSk7XHJcbiAgICBjb25uZWN0LnNldFJlcXVlc3RIZWFkZXIoXCJjb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICBjb25uZWN0LnNlbmQoZm9ybSk7XHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogICAgICAgICBGdW5jaW9uZXMgZGUgbWVuc2FqZXMgeSBub3RpZmljYWNpb25lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vKipcclxuICogRGlzcGxheSBNZXNzYWdlXHJcbiAqIE11ZXN0cmEgdW5hIG5vdGlmaWNhY2lvbiBkZWwgcmVzdWx0YWRvIGRlIGxhIGNvbnN1bHRhXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIHN0cmluZyB0byBiZSBkaXNwbGF5ZWQgXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZGlzcGxheU1lc3NhZ2UobWVzc2FnZSl7XHJcbiAgdmFyIGNvbG9yID0gXCJyZ2JhKDEwMiwxODcsMTA2LDEpXCI7XHJcbiAgdmFyIHRvYXN0LHNwYW47XHJcblxyXG4gICAgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0VSUk9SKSl7XHJcbiAgICAgIGNvbG9yID0gXCJyZ2JhKDI0NCw2Nyw1NCwxKVwiO1xyXG4gICAgfWVsc2UgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0lORk8pKXtcclxuICAgICAgY29sb3IgPSBcInJnYmEoMiwxMzYsMjA5LDEpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgPSAkKFwiLnRvYXN0XCIpXHJcbiAgICBzcGFuID0gdG9hc3QuZmluZChcInNwYW5cIikuaHRtbChtZXNzYWdlKTtcclxuICAgIHNwYW4uY3NzKHtiYWNrZ3JvdW5kOmNvbG9yfSk7XHJcbiAgICB0b2FzdC5jc3Moe2Rpc3BsYXk6XCJmbGV4XCJ9KTtcclxuICAgIFxyXG4gICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjFcIn0sNTAwLGZ1bmN0aW9uKCl7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjBcIn0pO1xyXG4gICAgICAgIHRvYXN0LmNzcyh7ZGlzcGxheTpcIm5vbmVcIn0pO1xyXG4gICAgICB9LCAyMDAwKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5QWxlcnQodGl0bGUsbWVzc2FnZSx0eXBlKXtcclxuICBpZighdGl0bGUpIHRpdGxlID0gXCJSZXZpc2VcIjtcclxuICBpZighbWVzc2FnZSkgbWVzc2FnZSA9IFwiQXNlZ3VyYXRlIGRlIGxsZW5hciB0b2RvcyBsb3MgY2FtcG9zXCJcclxuICBpZighdHlwZSkgdHlwZSA9IFwiZXJyb3JcIlxyXG4gIHN3YWwoe1xyXG4gICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIHRleHQ6IG1lc3NhZ2UsXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bicsXHJcbiAgICAgIGJ1dHRvbnNTdHlsaW5nOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICBmdWNuaW9uZXMgcGFyYSBMbGVuYXIgdGFibGFzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogTGxlbmEgbGEgdGFibGEgYWN0dWFsIGNvbiBsb3MgZGF0b3MgcXVlIHZpZW5lbiBkZWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtzdHJpbmd9ICRjb250ZW50IEVsIGh0bWwgY29uIGxvcyBkYXRvcyBhIHNlciBtb3N0cmFkb3MsIHZpZW5lbiBzaWVtcHJlIGRlc2RlIGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEVsIGNhbGxiYWNrIHBhcmEgcmVjb25vY2VyIGEgbG9zIG51ZXZvcyBpdGVtc1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZnVuY3Rpb24gZmlsbEN1cnJlbnRUYWJsZSgkY29udGVudCxjYWxsYmFjayx0YWJsZUlEKXtcclxuICB2YXIgJHRhYmxlXHJcbiAgJChcImh0bWxcIikucmVtb3ZlQ2xhc3MoXCJncl9faWNwYXltZW50LXNvZnRfY29tXCIpXHJcbiAgaWYodGFibGVJRCAhPSB1bmRlZmluZWQpe1xyXG4gICAgJHRhYmxlID0gJCgnIycrdGFibGVJRCArIFwiIHRib2R5XCIpO1xyXG4gIH1lbHNle1xyXG4gICAgJHRhYmxlID0gJCgnW2NsYXNzKj1cInQtXCJdIHRib2R5Jyk7XHJcbiAgfVxyXG4gICR0YWJsZS5odG1sKCRjb250ZW50KTtcclxuICBpZihjYWxsYmFjaykgY2FsbGJhY2soKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExsZW5hIGxhIHRhYmxhIGNsaWVudGVzIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2xpZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2spe1xyXG4gIGZpbGxDdXJyZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2ssXCJ0LWNsaWVudHNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMbGVuYSBsYSB0YWJsYSBjYWphIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2FqYVRhYmxlKCRjb250ZW50LGNhbGxiYWNrKXtcclxuICBmaWxsQ3VycmVudFRhYmxlKCRjb250ZW50LGNhbGxiYWNrLFwiY2FqYVwiKTtcclxuICBpZihjYWxsYmFjayljYWxsYmFjaygpO1xyXG59XHJcbi8qKlxyXG4gKiBMbGVuYSBsYSBMaXN0YSBkZSBwYWdvcy9ub3RpZmljYWNpb25lcyBjb24gbG9zIGRhdG9zIHF1ZSB2aWVuZW4gZGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSAkY29udGVudCBFbCBodG1sIGNvbiBsb3MgZGF0b3MgYSBzZXIgbW9zdHJhZG9zLCB2aWVuZW4gc2llbXByZSBkZXNkZSBlbCBzZXJ2aWRvclxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBFbCBjYWxsYmFjayBwYXJhIHJlY29ub2NlciBhIGxvcyBudWV2b3MgaXRlbXNcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBmaWxsUGF5bWVudHNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIubGlzdC1uZXh0cGF5bWVudHNcIik7XHJcbiAgJGNvbnRhaW5lci5odG1sKCRjb250ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbEF2ZXJpYXNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIjYXZlcmlhcy1saXN0XCIpO1xyXG4gICRjb250YWluZXIuaHRtbCgkY29udGVudCk7XHJcbiAgYnVzQXZlcmlhLiRlbWl0KCd0aWNrZXRzLWxpc3RlZCcsMSk7XHJcbiAgY2FsbGJhY2soKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbGxJbnN0YWxsYXRpb25zTGlzdCgkY29udGVudCxjYWxsYmFjayl7XHJcbiAgdmFyICRjb250YWluZXIgPSAkKFwiI2luc3RhbGxhdGlvbnMtbGlzdFwiKTtcclxuICAkY29udGFpbmVyLmh0bWwoJGNvbnRlbnQpO1xyXG4gIGNhbGxiYWNrKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VDb250cmFjdExpc3QocmVzcG9uc2UsY2FsbGJhY2spe1xyXG4gIGlmKHJlc3BvbnNlICE9IFwibmFkYVwiKXtcclxuICAgIHZhciBjb250cmFjdHMgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcclxuICAgIHZhciB2YWx1ZSxzZXJ2aWNlLGVxdWlwbWVudCxlTWFjLHJvdXRlcixyTWFjLGNvZGU7XHJcbiAgICB2YXIgc2VsZWN0Q29udHJhY3QgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKTtcclxuICAgIHZhciBlbGVtZW50ID0gXCI8b3B0aW9uIHZhbHVlPScnPi0tU2VsZWNjaW9uYS0tPC9vcHRpb24+XCI7XHJcbiAgICB2YXIgY2xpZW50ZSA9IGNvbnRyYWN0cy5jbGllbnRlO1xyXG4gICAgdmFyIGNvbnRyYWN0SWQgPSAnJ1xyXG4gICAgaWYoY3VycmVudFBhZ2UgIT0gJ2RldGFsbGVzJyAmJiBjdXJyZW50UGFnZSAhPSAnaG9tZScpe1xyXG4gICAgICBjb250cmFjdElkID0gY29udHJhY3RUYWJsZS5nZXRJZCgpO1xyXG4gICAgfWVsc2UgaWYoIGN1cnJlbnRQYWdlICE9ICdob21lJyl7XHJcbiAgICAgIGNvbnRyYWN0SWQgPSBkZXRhaWxzQ29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpLmlkX2NvbnRyYXRvXHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250cmFjdHMuY29udHJhdG9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhbHVlICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJpZF9jb250cmF0b1wiXTtcclxuICAgICAgc2VydmljZSAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcInNlcnZpY2lvXCJdO1xyXG4gICAgICBlcXVpcG1lbnQgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wibm9tYnJlX2VxdWlwb1wiXTtcclxuICAgICAgcm91dGVyICAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcInJvdXRlclwiXTtcclxuICAgICAgZU1hYyAgICAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcIm1hY19lcXVpcG9cIl07XHJcbiAgICAgIHJNYWMgICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJtYWNfcm91dGVyXCJdO1xyXG4gICAgICBjb2RlICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJjb2RpZ29cIl07XHJcbiAgICAgIGVsZW1lbnQgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIiArIHZhbHVlICsgXCInIGRhdGEtc2VydmljZT0nXCIrc2VydmljZStcIicgIGRhdGEtZXF1aXBtZW50PSdcIitlcXVpcG1lbnQrXCInICBkYXRhLWUtbWFjPSdcIitlTWFjK1wiJ1wiO1xyXG4gICAgICBlbGVtZW50ICs9IFwiIGRhdGEtcm91dGVyPSdcIityb3V0ZXIrXCInICBkYXRhLXItbWFjPSdcIityTWFjK1wiJyBkYXRhLWNvZGU9J1wiK2NvZGUrXCInPlwiO1xyXG4gICAgICBlbGVtZW50ICs9IHZhbHVlICtcIjwvb3B0aW9uPlwiOyAgXHJcbiAgICB9XHJcbiAgICBzZWxlY3RDb250cmFjdC5odG1sKGVsZW1lbnQpO1xyXG4gICAgc2VsZWN0Q29udHJhY3QudmFsKGNvbnRyYWN0SWQpLmNoYW5nZSgpO1xyXG4gICAgJChcIiNleHRyYS1jbGllbnQtbmFtZVwiKS52YWwoY2xpZW50ZVsnbm9tYnJlcyddICsgXCIgXCIgKyBjbGllbnRlWydhcGVsbGlkb3MnXSk7XHJcblxyXG4gIH1lbHNle1xyXG4gICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArIFwiIEVzdGUgY2xpZW50ZSBubyBleGlzdGUgcmV2aXNlIHN1IGNlZHVsYSBwb3IgZmF2b3JcIik7XHJcbiAgfSBcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJUYm9keShvYmplY0lkKXtcclxuICAkKG9iamVjSWQpLmh0bWwoXCJcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VQYXltZW50TGlzdChyZXNwb25zZSxjYWxsYmFjayl7XHJcbiAgdmFyIHNlbGVjdFBheVVudGlsID0gJCgnI3NlbGVjdC1wYXktdW50aWwnKTtcclxuICBzZWxlY3RQYXlVbnRpbC5odG1sKHJlc3BvbnNlKTtcclxuICBzZWxlY3RQYXlVbnRpbC5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gIHNlbGVjdFBheVVudGlsLmNoYW5nZSgpO1xyXG4gIGlmKGNhbGxiYWNrKWNhbGxiYWNrKCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogaXNFbXB0eVxyXG4gKiBWZXJpZmljYSBzaSBsb3MgdmFsb3JlcyBkYWRvcyBlc3RhbiB2YWNpb3MgbyBzb24gbnVsb3MgXHJcbiAqIEBwYXJhbSB7QXJyYXkuIDwgc3RyaW5nfSB2YWx1ZXNcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWVzLGlzX251bSl7XHJcbiAgZm9yKHZhciBpID0gMCA7IGkgPCB2YWx1ZXMubGVuZ3RoIDsgaSsrKXtcclxuICAgIGlmICh2YWx1ZXNbaV0gPT0gbnVsbCB8fCB2YWx1ZXNbaV0gPT0gXCJcIil7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2FsZG8obW9uZXkpe1xyXG4gIG1vbmV5ID0gXCJSRCQgXCIrIEN1cnJlbmN5Rm9ybWF0KG1vbmV5KVxyXG4gICQoXCIuY3VycmVudC1zYWxkb1wiKS50ZXh0KG1vbmV5KTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVDb3VudCgkY29udGVudCl7XHJcbiAgJChcIi50b3RhbC1yb3dzXCIpLmh0bWwoJGNvbnRlbnQpO1xyXG59XHJcbi8vICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcclxuLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlciBwYXNzd29yZHMgdmFsaWRhdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4vLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbi8vICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcclxuLy9cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTW9kYWwoJG1vZGFsSWQpe1xyXG4gIHZhciAkdXNlclBhc3N3b3JkID0gJCgkbW9kYWxJZCsnIC5wYXNzd29yZCcpO1xyXG4gIHZhciAkdXNlclBhc3N3b3JkQ29uZmlybSA9ICQoJG1vZGFsSWQrJyAucGFzc3dvcmQtY29uZmlybScpO1xyXG4gIHZhciAkc2F2ZUJ1dHRvbiA9ICQoJG1vZGFsSWQrJyAuc2F2ZScpO1xyXG4gIFxyXG4gICR1c2VyUGFzc3dvcmRDb25maXJtLm9uKCdibHVyIGtleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVUd28oJHVzZXJQYXNzd29yZCwkdXNlclBhc3N3b3JkQ29uZmlybSwkc2F2ZUJ1dHRvbik7XHJcbiAgfSk7XHJcbiAgJHNhdmVCdXR0b24ub24oJ2NsaWNrJyxjbGVhckZvcm0oJG1vZGFsSWQpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVUd28oJGZpcnN0T2JqZWN0LCRzZWNvbmRPYmplY3QsJGJ1dHRvbil7XHJcbiAgICBpZigkc2Vjb25kT2JqZWN0LnZhbCgpID09ICRmaXJzdE9iamVjdC52YWwoKSAmJiAkc2Vjb25kT2JqZWN0LnZhbCgpICE9IFwiXCIpe1xyXG4gICAgICByZXBsYWNlQ2xhc3MoJGZpcnN0T2JqZWN0LnBhcmVudCgpLFwiaGFzLWVycm9yXCIsXCJoYXMtc3VjY2Vzc1wiKTtcclxuICAgICAgcmVwbGFjZUNsYXNzKCRzZWNvbmRPYmplY3QucGFyZW50KCksXCJoYXMtZXJyb3JcIixcImhhcy1zdWNjZXNzXCIpO1xyXG4gICAgICAkYnV0dG9uLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiLFwiXCIpO1xyXG5cclxuICAgIH1lbHNle1xyXG4gICAgICAgcmVwbGFjZUNsYXNzKCRmaXJzdE9iamVjdC5wYXJlbnQoKSxcImhhcy1zdWNjZXNzXCIsXCJoYXMtZXJyb3JcIik7XHJcbiAgICAgICByZXBsYWNlQ2xhc3MoJHNlY29uZE9iamVjdC5wYXJlbnQoKSxcImhhcy1zdWNjZXNzXCIsXCJoYXMtZXJyb3JcIik7XHJcbiAgICAgICAkYnV0dG9uLmF0dHIoXCJkaXNhYmxlZFwiLFwiXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVRoaXMoKXtcclxuICB2YXIgJHVzZXJQYXNzd29yZCA9ICQoJy5wYXNzd29yZCcpO1xyXG4gIHZhciAkdXNlclBhc3N3b3JkQ29uZmlybSA9ICQoJy5wYXNzd29yZC1jb25maXJtJyk7XHJcbiAgdmFyICRzYXZlQnV0dG9uID0gJCgnLnNhdmUnKTtcclxuICBcclxuICAkdXNlclBhc3N3b3JkLm9uKCdibHVyIGtleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVUd28oJHVzZXJQYXNzd29yZCwkdXNlclBhc3N3b3JkQ29uZmlybSwkc2F2ZUJ1dHRvbik7XHJcbiAgfSk7XHJcbiAgJHVzZXJQYXNzd29yZENvbmZpcm0ub24oJ2JsdXIga2V5dXAnLGZ1bmN0aW9uKCl7XHJcbiAgICB2YWxpZGF0ZVR3bygkdXNlclBhc3N3b3JkLCR1c2VyUGFzc3dvcmRDb25maXJtLCRzYXZlQnV0dG9uKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJGb3JtKG1vZGFsSWQpe1xyXG4gICQobW9kYWxJZCArIFwiIGlucHV0XCIpLnZhbChcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBkZWxldGVWYWxpZGF0aW9uKCRpbnB1dEVsZW1lbnQsIHRleHQsICRidXR0b25Ub0FjdGl2ZSl7XHJcbiAgdmFyIGlubmVyVGV4dDtcclxuICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gIHZhciBzZWxmICA9IHRoaXM7XHJcbiAgdmFyIHdhcm5pbmcgPSAkKCcjY2FuY2VsLWNvbnRyYWN0LW1vZGFsIC5hbGVydCcpO1xyXG5cclxuICAkaW5wdXRFbGVtZW50Lm9uKFwia2V5dXBcIixmdW5jdGlvbihlKXtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBpbm5lclRleHQgPSAkKHRoaXMpLnZhbCgpIFxyXG4gICAgaWYoaW5uZXJUZXh0LnRvTG93ZXJDYXNlKCkgPT0gc2VsZi50ZXh0LnRvTG93ZXJDYXNlKCkpe1xyXG4gICAgICAkYnV0dG9uVG9BY3RpdmUucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICB3YXJuaW5nLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgJGJ1dHRvblRvQWN0aXZlLmF0dHIoXCJkaXNhYmxlZFwiLFwiXCIpO1xyXG4gICAgICB3YXJuaW5nLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdW5jaW9uZXMgZGUgdXRpbGVyaWEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbi8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vL1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJlcGxhY2VDbGFzcygkb2JqZWN0LG9sZENsYXNzLG5ld0NsYXNzKXtcclxuICAgJG9iamVjdC5hZGRDbGFzcyhuZXdDbGFzcyk7XHJcbiAgICRvYmplY3QucmVtb3ZlQ2xhc3Mob2xkQ2xhc3MpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VTZXJ2aWNlQ2FyZENsaWNrYWJsZSgpe1xyXG4gICAgdmFyIHNlcnZpY2VDYXJkICAgICAgPSAkKFwiLnNlcnZpY2UtY2FyZFwiKTtcclxuICAgIHZhciBidG5QcmludENvbnRyYWN0ID0gJCgnI2J0bi1wcmludC1yZXF1aXJlbWVudCcpO1xyXG5cclxuICAgIHNlcnZpY2VDYXJkLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciAkdGhpcyAgICAgICA9ICQodGhpcyk7XHJcbiAgICAgIHZhciBzZXJ2aWNlX2lkICA9ICR0aGlzLmF0dHIoJ2RhdGEtaWQnKTsgXHJcbiAgICAgIHZhciBwYXltZW50ICAgICA9ICR0aGlzLmF0dHIoJ2RhdGEtcGF5bWVudCcpO1xyXG4gICAgICB2YXIgcmVhbExpbmsgICAgPSBidG5QcmludENvbnRyYWN0LmF0dHIoJ2RhdGEtaHJlZicpXHJcbiAgICAgIFxyXG4gICAgICBzZXJ2aWNlQ2FyZC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgIGJ0blByaW50Q29udHJhY3QuYXR0cihcImhyZWZcIixyZWFsTGluayArIFwiL1wiICsgc2VydmljZV9pZCk7XHJcbiAgICAgICQoJyNjb250cmFjdC1jbGllbnQtcGF5bWVudCcpLnZhbChwYXltZW50KVxyXG4gICAgfSlcclxufVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgVmVyaWZ5IFJvd3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5mdW5jdGlvbiB2ZXJpZnlDb250cmFjdFN0YXR1cygpe1xyXG4gICQoXCIudGQtZXN0YWRvXCIpLmVhY2goZnVuY3Rpb24oaSx2YWx1ZSl7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdmFyIHRleHQgPSAkdGhpcy50ZXh0KCkudHJpbSgpO1xyXG4gICAgaWYodGV4dCA9PSBcImFjdGl2b1wiKXtcclxuICAgICAgJHRoaXMuY3NzKHtjb2xvcjpcImdyZWVuXCJ9KVxyXG4gICAgfWVsc2UgaWYodGV4dCA9PSBcInNhbGRhZG9cIil7XHJcbiAgICAgICR0aGlzLnBhcmVudHMoXCJ0clwiKS5jc3Moe2JhY2tncm91bmQ6XCJyZ2JhKDIyLDI1NSwwLC4zKVwiLGNvbG9yOlwiIzU1NVwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlcmlmeUNsaWVudFN0YXR1cygpe1xyXG4gICAkKFwidGRcIikuZWFjaChmdW5jdGlvbihpLHZhbHVlKXtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICB2YXIgdGV4dCA9ICR0aGlzLnRleHQoKS50cmltKCk7XHJcbiAgICBpZih0ZXh0ID09IFwibm8gYWN0aXZvXCIpe1xyXG4gICAgICAkdGhpcy5jc3Moe2NvbG9yOlwicmdiYSgyMDAsMCwwLC43KVwifSlcclxuICAgIH1lbHNlIGlmKHRleHQgPT0gXCJhY3Rpdm9cIil7XHJcbiAgICAgICR0aGlzLmNzcyh7Y29sb3I6XCJncmVlblwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICAgICAgICAgICAgICAgICBMb2FkZXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5mdW5jdGlvbiBoZWF2eUxvYWQoc3RvcCl7XHJcbiAgaWYoIXN0b3Ape1xyXG4gICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cImhlYXZ5LWxvYWRlciBhY3RpdmVcIj4nXHJcbiAgICAgICAgaHRtbCArPSAgICc8ZGl2IGNsYXNzPVwiY2lyY2xlLWxvYWRcIj48L2Rpdj4nXHJcbiAgICAgICAgaHRtbCArPSAgICc8ZGl2IGNsYXNzPVwibWVzc2FnZVwiPlByZXBhcmFuZG8gbG9zIGRhdG9zPC9kaXY+J1xyXG4gICAgICAgIGh0bWwgKz0gJzwvZGl2PidcclxuICAgICQoXCJib2R5XCIpLmFwcGVuZChodG1sKVxyXG4gICAgJChcImJvZHlcIikuY3NzKHtvdmVyZmxvdzpcImhpZGRlblwifSk7XHJcbiAgICB2YXIgbWVzc2FnZSA9ICQoXCIuaGVhdnktbG9hZGVyIC5tZXNzYWdlXCIpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBtZXNzYWdlLnRleHQoXCJDb25maWd1cmFuZG8uLi5cIik7XHJcbiAgICB9LDQwMDApXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIkNhc2kgVGVybWluYW1vcyAuLi5cIik7XHJcbiAgICB9LDgwMDApXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIlRlcm1pbmFuZG8gZWwgcHJvY2VzbyAuLi5cIik7XHJcbiAgICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gICAgfSwxNTAwMClcclxuICB9ZWxzZXtcclxuICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlTG9hZGVyKCl7XHJcbiAgICB2YXIgbG9hZGVyID0gJChcIi5oZWF2eS1sb2FkZXJcIik7XHJcbiAgICBsb2FkZXIucmVtb3ZlKCk7XHJcbiAgICAkKFwiYm9keVwiKS5jc3Moe292ZXJmbG93OlwiYXV0b1wifSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaW5lTG9hZChzdG9wKSB7XHJcbiAgaWYoIXN0b3Ape1xyXG4gICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxyXG4gICAgICB9KTtcclxuICB9ZWxzZXtcclxuICAgICQoXCIubG9hZGVyXCIpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcclxuICB9XHJcbn0iLCIkKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgY3VycmVudFBhZ2UgPSAkKFwidGl0bGVcIikudGV4dCgpLnNwbGl0KFwiIFwiKTtcclxuICBjdXJyZW50UGFnZSA9IGN1cnJlbnRQYWdlWzRdLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gIFxyXG4gIGlmIChjdXJyZW50UGFnZSA9PSBcImFkbWluaXN0cmFkb3JcIikge1xyXG4gICAgbmV3VXNlckZvcm0oKTtcclxuICB9XHJcblxyXG4gIGdldERhdGUoKTtcclxuICBhZG1pbkZ1bmN0aW9ucygpO1xyXG4gIHVzZXJJbmZvVGlwKCk7XHJcbiAgbWFrZVNlcnZpY2VDYXJkQ2xpY2thYmxlKCk7XHJcbiAgXHJcbiAgaWYgKGN1cnJlbnRQYWdlID09IFwiZGV0YWxsZXNcIiB8fCBjdXJyZW50UGFnZSAhPSAnbnVldm9fY29udHJhdG8nKSB7XHJcbiAgICBkZXRhaWxzRnVuY3Rpb25zKCk7XHJcbiAgfVxyXG5cclxuICBub3RpZmljYXRpb25GdW5jdGlvbnMoKTtcclxuICBuZXdDb250cmFjdEZ1bmN0aW9ucygpO1xyXG4gIGNoZWNrV2luZG93U2l6ZSgpO1xyXG4gIFxyXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2hlY2tXaW5kb3dTaXplKCk7XHJcbiAgfSlcclxuXHJcbiAgb25XaW5kb3dMb2FkRnVuY3Rpb25zKCk7XHJcbiAgLyoqXHJcbiAgICogR2V0IERhdGU6XHJcbiAgICogT2J0aWVuZSBsYSBmZWNoYSBhY3R1YWwgYWwgc2VndW5kbyB5IGxhIG11ZXN0cmEgZW4gbGEgcGFudGFsbGEgZGUgaW5pY2lvXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKi9cclxuICBmdW5jdGlvbiBnZXREYXRlKCkge1xyXG4gICAgdmFyICRkYXkgPSAkKCcuZGF5Jyk7XHJcbiAgICB2YXIgJG1vbnRoWWVhciA9ICQoJy5tb250aC15ZWFyJyk7XHJcbiAgICB2YXIgJGRheVdlZWsgPSAkKCcuZGF5d2VlaycpO1xyXG4gICAgdmFyICRIb3JhID0gJCgnLmhvdXIgc3BhbicpO1xyXG4gICAgdmFyIGRhdGUsIGRheSwgbW9udGgsIHllYXIsIHNIb3VyO1xyXG4gICAgdmFyIGRheXMgPSBbXCJEb21pbmdvXCIsIFwiTHVuZXNcIiwgXCJNYXJ0ZXNcIiwgXCJNaWVyY29sZXNcIiwgXCJKdWV2ZXNcIiwgXCJWaWVybmVzXCIsIFwiU2FiYWRvXCJdO1xyXG4gICAgdmFyIG1vbnRocyA9IFtcIkVuZXJvXCIsIFwiRmVicmVyb1wiLCBcIk1hcnpvXCIsIFwiQWJyaWxcIiwgXCJNYXlvXCIsIFwiSnVuaW9cIiwgXCJKdWxpb1wiLCBcIkFnb3N0b1wiLCBcIlNlcHRpZW1icmVcIiwgXCJPY3R1YnJlXCIsIFwiTm92aWVtYnJlXCIsIFwiRGljaWVtYnJlXCJdO1xyXG5cclxuICAgIHNldEludGVydmFsKHVwZGF0ZUhvdXIsIDEwMDApO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUhvdXIoKSB7XHJcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBzRGF0ZSA9IGRhdGUudG9TdHJpbmcoKVxyXG4gICAgICAkZGF5LnRleHQoZGF0ZS5nZXREYXRlKCkpO1xyXG4gICAgICAkbW9udGhZZWFyLnRleHQoXCJEZSBcIiArIG1vbnRoc1tkYXRlLmdldE1vbnRoKCldICsgXCIgZGUgXCIgKyBkYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAkZGF5V2Vlay50ZXh0KGRheXNbZGF0ZS5nZXREYXkoKV0pO1xyXG5cclxuICAgICAgc0hvdXIgPSBtb21lbnQoKS5mb3JtYXQoJ0xUUycpO1xyXG4gICAgICAkSG9yYS5odG1sKHNIb3VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkbWluIEZ1bmN0aW9uczpcclxuICAgKiBzZSBlbmNhcmdhIGRlIGVsIG1vdmltaWVudG8gZGUgbG9zIHBhbmVsZXMgZW4gbGEgcGFudGFsbGEgJ2FkbWluaXN0cmFkb3InXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKi9cclxuXHJcbiAgZnVuY3Rpb24gYWRtaW5GdW5jdGlvbnMoKSB7XHJcbiAgICAkKCcjY29tcGFueS1zZWN0aW9uJykuYW5pbWF0ZSh7XHJcbiAgICAgIGxlZnQ6IFwiMFwiXHJcbiAgICB9LCAyMDApXHJcbiAgICAkKCcuYWRtaW5pc3RyYWRvciAuYXNpZGUtYnV0dG9ucyBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICB2YXIgY2FyZE5hbWUgPSAkdGhpcy5hdHRyKCdocmVmJykuc2xpY2UoMSk7XHJcbiAgICAgIGlmIChjYXJkTmFtZSAhPSBudWxsKSB7XHJcbiAgICAgICAgJCgnLmNvbXBhbnktZGV0YWlscycpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgbGVmdDogXCItMTEwJVwiXHJcbiAgICAgICAgfSwgMjAwKVxyXG4gICAgICAgICQoJyMnICsgY2FyZE5hbWUgKyAnLmNvbXBhbnktZGV0YWlscycpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgbGVmdDogXCIwXCJcclxuICAgICAgICB9LCAyMDApXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgaWYgKCQoXCIjYWNvdW50LXNlY3Rpb25cIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAkKCcjYWNvdW50LXNlY3Rpb24nKS5hbmltYXRlKHtcclxuICAgICAgICBsZWZ0OiBcIjBcIlxyXG4gICAgICB9LCAyMDApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBuZXcgVXNlciBGb3JtOlxyXG4gICAqIHZhaWRhIGxhcyBjb250cmFzZcOxYXMgZW4gbG9zIGZvcm11bGFyaW9zIGRlIGxvcyB1c3Vhcmlvc1xyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXHJcblxyXG4gIGZ1bmN0aW9uIG5ld1VzZXJGb3JtKCkge1xyXG4gICAgdmFsaWRhdGVNb2RhbChcIiNuZXctdXNlci1tb2RhbFwiKTtcclxuICAgIHZhbGlkYXRlTW9kYWwoXCIjdXBkYXRlLXVzZXItbW9kYWxcIik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VyIEluZm8gVGlwXHJcbiAgICogaGFjZSB1biB0b2dnbGUgZW4gbGEgdmlzaWJpbGlkYWQgZGUgbGEgaW5mbyBkZWwgdXN1YXJpb1xyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXHJcblxyXG4gIGZ1bmN0aW9uIHVzZXJJbmZvVGlwKCkge1xyXG4gICAgdmFyIGluZm9UaXAgPSAkKFwiLnVzZXItaW5mby10aXBcIik7XHJcbiAgICB2YXIgcHJvZmlsZVBpY3R1cmUgPSAkKFwiLnByb2ZpbGUtcGljdHVyZVwiKTtcclxuICAgIHZhciBidG5Nb3JlID0gJChcIi5idG4tbW9yZVwiKTtcclxuXHJcbiAgICBidG5Nb3JlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGluZm9UaXAudG9nZ2xlQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5mdW5jdGlvbiBuZXdDb250cmFjdEZ1bmN0aW9ucygpIHtcclxuICB2YXIgYnRuUHJpbnRDb250cmFjdCA9ICQoXCIjYnRuLXByaW50LWNvbnRyYWN0XCIpO1xyXG4gIHZhciBkb2N1bWVudCA9ICQoXCIubm90ZS1pdGVtXCIpO1xyXG4gIHZhciByYWRpb0FjdGl2YXRlQ29udHJhY3QgPSAkKFwiI3JhZGlvLW5ldy1jb250cmFjdFwiKTtcclxuICB2YXIgcmFkaW9EaXNhYmxlQ29udHJhY3QgPSAkKFwiI3JhZGlvLWp1c3QtcmVxdWlyZW1lbnRcIik7XHJcbiAgdmFyIGNvbnRyYWN0Q29udHJvbHMgPSAkKFwiLmNvbnRyYWN0LWNvbnRyb2xzXCIpO1xyXG4gIHZhciByZXF1aXJlbWVudENvbnRyb2xzID0gJChcIi5yZXF1aXJlbWVudC1jb250cm9sc1wiKTtcclxuXHJcbiAgcmFkaW9BY3RpdmF0ZUNvbnRyYWN0LnBhcmVudHMoXCJsYWJlbFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBhY3RpdmF0ZUNvbnRyYWN0TW9kZSgpO1xyXG5cclxuICB9KTtcclxuXHJcbiAgcmFkaW9EaXNhYmxlQ29udHJhY3QucGFyZW50cyhcImxhYmVsXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGRpc2FibGVDb250cmFjdE1vZGUoKVxyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBhY3RpdmF0ZUNvbnRyYWN0TW9kZSgkYnRuKSB7XHJcbiAgICByYWRpb0Rpc2FibGVDb250cmFjdFxyXG4gICAgICAucmVtb3ZlQXR0cihcImNoZWNrZWRcIiwgXCJcIilcclxuICAgICAgLmh0bWwoXCJcIilcclxuICAgIHJhZGlvQWN0aXZhdGVDb250cmFjdFxyXG4gICAgICAuYXR0cihcImNoZWNrZWRcIiwgXCJcIilcclxuICAgICAgLmh0bWwoXCImIzEwMDA0O1wiKVxyXG4gICAgZG9jdW1lbnQucmVtb3ZlQ2xhc3MoXCJwcmludC1yZXF1aXJlbWVudFwiKTtcclxuICAgIGNvbnRyYWN0Q29udHJvbHMucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpXHJcbiAgICByZXF1aXJlbWVudENvbnRyb2xzLmFkZENsYXNzKFwiaGlkZVwiKVxyXG5cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRpc2FibGVDb250cmFjdE1vZGUoJGJ0bikge1xyXG4gICAgcmFkaW9BY3RpdmF0ZUNvbnRyYWN0XHJcbiAgICAgIC5yZW1vdmVBdHRyKFwiY2hlY2tlZFwiLCBcIlwiKVxyXG4gICAgICAuaHRtbChcIlwiKVxyXG4gICAgcmFkaW9EaXNhYmxlQ29udHJhY3RcclxuICAgICAgLmF0dHIoXCJjaGVja2VkXCIsIFwiXCIpXHJcbiAgICAgIC5odG1sKFwiJiMxMDAwNDtcIilcclxuICAgIGRvY3VtZW50LmFkZENsYXNzKFwicHJpbnQtcmVxdWlyZW1lbnRcIik7XHJcbiAgICByZXF1aXJlbWVudENvbnRyb2xzLnJlbW92ZUNsYXNzKFwiaGlkZVwiKVxyXG4gICAgY29udHJhY3RDb250cm9scy5hZGRDbGFzcyhcImhpZGVcIilcclxuICB9XHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RhbHMgRnVuY3Rpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG4kKCcjc2VhcmNoLWNsaWVudC1tb2RhbCcpLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgdmFyIGJ1dHRvbiA9ICQoZXZlbnQucmVsYXRlZFRhcmdldCk7XHJcbiAgY2xpZW50VGFibGUuaW5pdCgpO1xyXG4gIHZhciB0aXRsZSA9IGJ1dHRvbi5maW5kKCcuc2VjdGlvbi10aXRsZScpLnRleHQoKTtcclxuICBpZiAoIXRpdGxlKSB0aXRsZSA9IFwiQnVzY2FyIENsaWVudGVcIlxyXG4gIGlmICh0aXRsZS50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PSBcInJlZ2lzdHJhciBwYWdvXCIpIHtcclxuICAgIGJ1dHRvblRleHQgPSBcImlyIGEgUGFnb3NcIlxyXG4gIH0gZWxzZSB7XHJcbiAgICBidXR0b25UZXh0ID0gXCJOdWV2byBDb250cmF0b1wiXHJcbiAgfVxyXG5cclxuICB2YXIgbW9kYWwgPSAkKHRoaXMpXHJcbiAgbW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykudGV4dCh0aXRsZSlcclxuICBtb2RhbC5maW5kKCcubW9kYWwtZm9vdGVyIC5zYXZlJykudGV4dChidXR0b25UZXh0KVxyXG4gIG1vZGFsLmZpbmQoJ3Rib2R5JykuaHRtbCgnJylcclxufSlcclxuXHJcbiQoJyN1cGRhdGUtY29udHJhY3QtbW9kYWwnKS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICQoXCIjc2VsZWN0LWNvbnRyYWN0LXNlY3RvclwiKS5jaGFuZ2UoKTtcclxufSlcclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiAgICAgICAgICAgICAgb3RoZXIgZnVuY3Rpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAqIFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmZ1bmN0aW9uIGRldGFpbHNGdW5jdGlvbnMoKSB7XHJcbiAgdmFyIHNtYWxsQnV0dG9uc1NlbGVjdCA9ICQoJy5idG4tc21hbGwnKTtcclxuICB2YXIgdGFicyA9IHtcclxuICAgIGNvbnRyYWN0Q29udHJvbHM6IFtcIiNjb250cmFjdHNcIiwgXCIjbW9udGgtYW5kLWRhdGVcIiwgXCIjcmVjb25uZWN0LXNlcnZpY2VcIiwgJyNleHRyYS1jb250cmFjdCcsICcjZXh0cmEtc2VydmljZScsICcjZXh0cmEtZXh0ZW5zaW9uJywgJyNleHRyYS11cGdyYWRlJ10sXHJcbiAgICBwYXltZW50Q29udHJvbHM6IFtcIiNwYXltZW50c1wiLCBcIiNkZXRhbGxlcy1kZS1wYWdvXCIsIFwiI2Rlc2N1ZW50b3NcIl1cclxuICB9XHJcblxyXG4gICQoJ1tyb2xlPVwidGFiXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpXHJcblxyXG4gICAgaWYgKGNvbXBhcmUoaHJlZiwgdGFicy5wYXltZW50Q29udHJvbHMpKSB7XHJcbiAgICAgICQoXCIucGF5bWVudC1jb250cm9sc1wiKS5hZGRDbGFzcyhcInZpc2libGVcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKFwiLnBheW1lbnQtY29udHJvbHNcIikucmVtb3ZlQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb21wYXJlKGhyZWYsIHRhYnMuY29udHJhY3RDb250cm9scykpIHtcclxuICAgICAgJChcIi5jb250cmFjdC1jb250cm9sc1wiKS5yZW1vdmVDbGFzcyhcImhpZGVcIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoXCIuY29udHJhY3QtY29udHJvbHNcIikuYWRkQ2xhc3MoXCJoaWRlXCIpXHJcbiAgICB9XHJcbiAgICBnZXRUYWJDb250cm9scygkKHRoaXMpKTtcclxuICB9KTtcclxuXHJcbiAgJCgnLmJ0bi1zbWFsbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHNtYWxsQnV0dG9uc1NlbGVjdC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgfSlcclxuXHJcbiAgZnVuY3Rpb24gY29tcGFyZSh2YWx1ZSwgcG9zaWJsZVZhbHVlcykge1xyXG4gICAgdmFyIHJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICBwb3NpYmxlVmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKHRoZVZhbHVlKSB7XHJcbiAgICAgIGlmICh2YWx1ZSA9PSB0aGVWYWx1ZSkge1xyXG4gICAgICAgIHJldHVyblZhbHVlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGFiQ29udHJvbHMoJHRoaXMpIHtcclxuICB2YXIgY29udHJvbHMgPSAkdGhpcy5hdHRyKFwiYXJpYS1jb250cm9sc1wiKTtcclxuICAkKFwiLmR5bmFtaWMtY29udHJvbHNcIikudGV4dChjb250cm9scyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vdGlmaWNhdGlvbkZ1bmN0aW9ucygpIHtcclxuICB2YXIgYnRuQXZlcmlhcyA9ICQoXCIjYnRuLXNlZS1hdmVyaWFzXCIpO1xyXG4gIHZhciBidG5QYWdvcyA9ICQoXCIjYnRuLXNlZS1wYWdvc1wiKTtcclxuICB2YXIgYnRuQ2FqYUNoaWNhID0gJCgnI2J0bi1zZWUtY2FqYScpO1xyXG4gIHZhciBidG5EZXVkb3JlcyA9ICQoXCIjYnRuLXNlZS1kZXVkb3Jlc1wiKVxyXG4gIHZhciBidG5EYXlJbmNvbWVzID0gJChcIiNidG4tc2VlLWRheS1pbmNvbWVzXCIpXHJcbiAgdmFyIGxheW91dENvbnRhaW5lciA9ICQoXCIubGF5b3V0LWNvbnRhaW5lclwiKTtcclxuXHJcbiAgYnRuQXZlcmlhcy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7XHJcbiAgICAgIGxlZnQ6IFwiLTEwMCVcIlxyXG4gICAgfSwgMjAwKTtcclxuICB9KTtcclxuXHJcbiAgYnRuUGFnb3Mub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgbGF5b3V0Q29udGFpbmVyLmFuaW1hdGUoe1xyXG4gICAgICBsZWZ0OiBcIjBcIlxyXG4gICAgfSwgMjAwKTtcclxuICB9KTtcclxuXHJcbiAgYnRuRGV1ZG9yZXMub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgbGF5b3V0Q29udGFpbmVyLmFuaW1hdGUoe1xyXG4gICAgICBsZWZ0OiBcIi0yMDAlXCJcclxuICAgIH0sIDIwMCk7XHJcbiAgfSk7XHJcblxyXG4gIGJ0bkRheUluY29tZXMub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgbGF5b3V0Q29udGFpbmVyLmFuaW1hdGUoe1xyXG4gICAgICBsZWZ0OiBcIi0zMDAlXCJcclxuICAgIH0sIDIwMCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbiQoXCIjc2VsZWN0LWV4dHJhLXNlcnZpY2VcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICB2YXIgJHRoaXMgPSAkKChcIiNzZWxlY3QtZXh0cmEtc2VydmljZSA6c2VsZWN0ZWRcIikpO1xyXG4gIHZhciBjb3N0ID0gJHRoaXMuYXR0cihcImRhdGEtcGF5bWVudFwiKTtcclxuXHJcbiAgJChcIiNleHRyYS1zZXJ2aWNlLWNvc3RcIikudmFsKGNvc3QpXHJcbn0pO1xyXG5cclxuJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICB2YXIgJHRoaXMgPSAkKChcIiNleHRyYS1jbGllbnQtY29udHJhY3QgOnNlbGVjdGVkXCIpKTtcclxuXHJcbiAgJChcIiNleHRyYS1jb250cmFjdC1zZXJ2aWNlXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1zZXJ2aWNlXCIpKTtcclxuICAkKFwiI2V4dHJhLWVxdWlwb1wiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtZXF1aXBtZW50XCIpKTtcclxuICAkKFwiI2V4dHJhLXJvdXRlclwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtcm91dGVyXCIpKTtcclxuICAkKFwiI2V4dHJhLWUtbWFjXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1lLW1hY1wiKSk7XHJcbiAgJChcIiNleHRyYS1yLW1hY1wiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtci1tYWNcIikpO1xyXG4gICQoXCIjZXh0cmEtY29kZVwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtY29kZVwiKSk7XHJcbn0pO1xyXG5cclxuJChcIi5jb2x1bW5zLXJpZ2h0XCIpLnJlbW92ZUNsYXNzKFwicHVsbC1yaWdodFwiKTtcclxuXHJcbiQoXCIjc2VsZWN0LWNvbnRyYWN0LWNvZGVcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICB2YXIgJHRoaXMgPSAkKChcIiNzZWxlY3QtY29udHJhY3QtY29kZSA6c2VsZWN0ZWRcIikpO1xyXG4gICQoXCIjY29udHJhY3QtaXBcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWlwLWZpbmFsXCIpKTtcclxuICAkKFwiI3UtY29udHJhY3QtaXBcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWlwLWZpbmFsXCIpKTtcclxuXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY2hlY2tXaW5kb3dTaXplKCkge1xyXG4gIHZhciB3aWR0aCA9IHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aDtcclxuICB2YXIgYnJhbmROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJyYW5kIHNwYW4nKTtcclxuXHJcbiAgaWYgKHdpZHRoIDw9IDExMDApIHtcclxuICAgIGJyYW5kTmFtZS50ZXh0Q29udGVudCA9IFwiUFwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBicmFuZE5hbWUudGV4dENvbnRlbnQgPSBcIlBheW1lbnRcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uV2luZG93TG9hZEZ1bmN0aW9ucygpe1xyXG4gICQoJ2JvZHknKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgcG9zaXRpb24gPSAkKCdib2R5Jykuc2Nyb2xsVG9wKClcclxuICAgIG1vdmFibGVOYXYgPSAkKCcuYXNpZGUtbmF2LWNvbnRhaW5lciwgLmFzaWRlLXdpZGUtbGVmdCcpXHJcbiAgICBpZiAocG9zaXRpb24gPj0gNTApIHtcclxuICAgICAgaWYoIW1vdmFibGVOYXYuaGFzQ2xhc3MoJ21vdmVkJykpXHJcbiAgICAgICAgbW92YWJsZU5hdi5hZGRDbGFzcygnbW92ZWQnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbW92YWJsZU5hdi5yZW1vdmVDbGFzcygnbW92ZWQnKVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuIiwidmFyIFVzZXJzID0ge1xyXG4gIGFkZDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG5pY2ssIHBhc3N3b3JkLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlLCBpc19lbXB0eTtcclxuXHJcbiAgICBuaWNrICAgICAgPSAkKFwiI3VzZXItbmlja25hbWVcIikudmFsKCk7XHJcbiAgICBwYXNzd29yZCAgPSAkKFwiI3VzZXItcGFzc3dvcmRcIikudmFsKCk7XHJcbiAgICBuYW1lICAgICAgPSAkKFwiI3VzZXItbmFtZVwiKS52YWwoKTtcclxuICAgIGxhc3RuYW1lICA9ICQoXCIjdXNlci1sYXN0bmFtZVwiKS52YWwoKTtcclxuICAgIGRuaSAgICAgICA9IGdldFZhbCgkKFwiI3VzZXItZG5pXCIpKTtcclxuICAgIHR5cGUgICAgICA9ICQoXCIjdXNlci10eXBlXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW25pY2ssIHBhc3N3b3JkLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbmlja25hbWU9JyArIG5pY2sgKyBcIiZwYXNzd29yZD1cIiArIHBhc3N3b3JkICsgXCImbmFtZT1cIiArIG5hbWUgKyBcIiZsYXN0bmFtZT1cIiArIGxhc3RuYW1lO1xyXG4gICAgICBmb3JtICs9IFwiJmRuaT1cIiArIGRuaSArIFwiJnR5cGU9XCIgKyB0eXBlO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInVzZXIvYWRkbmV3XCIsIHRydWUsIGluaXRBZG1pbkhhbmRsZXJzLCBudWxsLCBmb3JtLCBVc2Vycy5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBuaWNrLCBwYXNzd29yZCwgbmFtZSwgbGFzdG5hbWUsIGRuaSwgdHlwZTtcclxuXHJcbiAgICBuaWNrICAgICA9ICQoXCIjZS1uaWNrbmFtZVwiKS52YWwoKTtcclxuICAgIG5hbWUgICAgID0gJChcIiNlLW5hbWVcIikudmFsKCk7XHJcbiAgICBsYXN0bmFtZSA9ICQoXCIjZS1sYXN0bmFtZVwiKS52YWwoKTtcclxuICAgIGRuaSAgICAgID0gJChcIiNlLWRuaVwiKS52YWwoKTtcclxuICAgIHR5cGUgICAgID0gJChcIiNlLXR5cGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbbmljaywgbmFtZSwgbGFzdG5hbWUsIGRuaSwgdHlwZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ25pY2tuYW1lPScgKyBuaWNrICsgXCImbmFtZT1cIiArIG5hbWUgKyBcIiZsYXN0bmFtZT1cIiArIGxhc3RuYW1lO1xyXG4gICAgICBmb3JtICs9IFwiJmRuaT1cIiArIGRuaSArIFwiJnR5cGU9XCIgKyB0eXBlO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInVzZXIvdXBkYXRlXCIsIHRydWUsIGluaXRBZG1pbkhhbmRsZXJzLCBudWxsLCBmb3JtLCBVc2Vycy5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGU9dXNlcnNcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL2dldHVzZXJzJywgZmFsc2UsIGluaXRBZG1pbkhhbmRsZXJzLCB1c2VyVGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZGVsZXRlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBmb3JtID0gXCJ1c2VyX2lkPVwiICsgaWQ7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgndXNlci9kZWxldGV1c2VyJywgdHJ1ZSwgaW5pdEFkbWluSGFuZGxlcnMsIG51bGwsIGZvcm0sIFVzZXJzLmdldEFsbCk7XHJcbiAgfSxcclxuICAvL1RPRE86IERlcHJlY2F0ZWQgaW5pdFxyXG5cclxuICBjb25maXJtUGFzc3dvcmQ6IGZ1bmN0aW9uKHVzZXJJZCxjdXJyZW50UGFzc3dvcmQpIHtcclxuICAgIHZhciBmb3JtID0gJ3VzZXJfaWQ9JysgdXNlcklkICsnJmN1cnJlbnRfcGFzc3dvcmQ9JyArIGN1cnJlbnRQYXNzd29yZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL2NvbmZpcm1fcGFzc3dvcmQnLCBmYWxzZSwgZmFsc2UsIHByb2Nlc3NDb25maXJtRGF0YSwgZm9ybSwgbnVsbCwgbnVsbCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHByb2Nlc3NDb25maXJtRGF0YShyZXNwb25zZSkge1xyXG4gICAgICB2YXIgbmV3UGFzc3dvcmQgICAgICAgICA9ICQoXCIjYWNvdW50LW5ldy1wYXNzd29yZFwiKTtcclxuICAgICAgdmFyIG5ld1Bhc3N3b3JkQ29uZmlybSAgPSAkKFwiI2Fjb3VudC1jb25maXJtLW5ldy1wYXNzd29yZFwiKTtcclxuICAgICAgXHJcbiAgICAgIGlmIChyZXNwb25zZSA9PSAxKSB7ICAgICAgXHJcbiAgICAgICAgbmV3UGFzc3dvcmQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICBuZXdQYXNzd29yZENvbmZpcm0ucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICB2YWxpZGF0ZVRoaXMoKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgbmV3UGFzc3dvcmQuYXR0cignZGlzYWJsZWQnLHRydWUpO1xyXG4gICAgICAgIG5ld1Bhc3N3b3JkQ29uZmlybS5hdHRyKCdkaXNhYmxlZCcsdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGVQYXNzd29yZDogZnVuY3Rpb24odXNlcklkLGN1cnJlbnRQYXNzd29yZCxuZXdQYXNzd29yZCl7XHJcbiAgICB2YXIgZm9ybSA9ICd1c2VyX2lkPScrIHVzZXJJZCAgKyBcIiZjdXJyZW50X3Bhc3N3b3JkPVwiKyBjdXJyZW50UGFzc3dvcmQgKycmbmV3X3Bhc3N3b3JkPScgKyBuZXdQYXNzd29yZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL3VwZGF0ZV9wYXNzd29yZCcsIGZhbHNlLCBmYWxzZSwgVXNlcnMucGFzc3dvcmRDaGFuZ2VkLCBmb3JtLCBudWxsLGhlYXZ5TG9hZCk7XHJcbiAgfSxcclxuXHJcbiAgcGFzc3dvcmRDaGFuZ2VkOiBmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICBpZihyZXNwb25zZT09MSl7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfU1VDQ0VTUyArICdDb250cmFzZcOxYSBDYW1iaWFkYSBjb24gZXhpdG8nKVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBCQVNFX1VSTCArICdhcHAvbG9nb3V0J1xyXG4gICAgICB9LDMwMDApICAgICAgXHJcbiAgICB9ZWxzZXtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArICcgRXJyb3IgYWwgY2FtYmlhciBkZSBjb250cmFzZcOxYSwgcmV2aXNlIGxhIGNvbnRyYXNlw7FhIGFjdHVhbCcpXHJcbiAgICB9XHJcbiAgICAgIFxyXG4gIH1cclxuXHJcbiAgLy9UT0RPOiBkZXByZWNhdGVkIGVuZFxyXG59XHJcblxyXG52YXIgQ2xpZW50cyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBub21icmVzLCBhcGVsbGlkb3MsIGNlZHVsYSwgY2VsdWxhciwgcHJvdmluY2lhLCBzZWN0b3IsIGNhbGxlLCBjYXNhLGRldGFsbGVzRGlyZWNjaW9uLFxyXG4gICAgICAgIHRlbGVmb25vLGx1Z2FyVHJhYmFqbywgdGVsVHJhYmFqbywgaW5ncmVzb3MsIGZlY2hhUmVnaXN0cm8sIGVzdGFkbztcclxuXHJcbiAgICBub21icmVzICAgICAgICAgICAgPSAkKFwiI2NsaWVudC1uYW1lXCIpLnZhbCgpO1xyXG4gICAgYXBlbGxpZG9zICAgICAgICAgID0gJChcIiNjbGllbnQtbGFzdG5hbWVcIikudmFsKCk7XHJcbiAgICBjZWR1bGEgICAgICAgICAgICAgPSBnZXRWYWwoJChcIiNjbGllbnQtZG5pXCIpKTtcclxuICAgIGNlbHVsYXIgICAgICAgICAgICA9IGdldFZhbCgkKFwiI2NsaWVudC1waG9uZVwiKSk7XHJcbiAgICBwcm92aW5jaWEgICAgICAgICAgPSAkKFwiI2NsaWVudC1wcm92aW5jaWFcIikudmFsKCk7XHJcbiAgICBzZWN0b3IgICAgICAgICAgICAgPSAkKFwiI2NsaWVudC1zZWN0b3JcIikudmFsKCk7XHJcbiAgICBjYWxsZSAgICAgICAgICAgICAgPSAkKFwiI2NsaWVudC1zdHJlZXRcIikudmFsKCk7XHJcbiAgICBjYXNhICAgICAgICAgICAgICAgPSAkKCcjY2xpZW50LWhvdXNlJykudmFsKCk7XHJcbiAgICBkZXRhbGxlc0RpcmVjY2lvbiAgPSAkKCcjY2xpZW50LWRpcmVjdGlvbi1kZXRhaWxzJykudmFsKCk7XHJcbiAgICB0ZWxlZm9ubyAgICAgICAgICAgPSBnZXRWYWwoJCgnI2NsaWVudC10ZWxlcGhvbmUnKSk7XHJcbiAgICBsdWdhclRyYWJham8gICAgICAgPSAkKCcjY2xpZW50LWpvYicpLnZhbCgpO1xyXG4gICAgdGVsVHJhYmFqbyAgICAgICAgID0gZ2V0VmFsKCQoJyNjbGllbnQtam9iLXRlbGVwaG9uZScpKTtcclxuICAgIGluZ3Jlc29zICAgICAgICAgICA9ICQoJyNjbGllbnQtc2FsYXJ5JykudmFsKCk7XHJcbiAgICBmZWNoYVJlZ2lzdHJvICAgICAgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgZXN0YWRvICAgICAgICAgICAgID0gXCJubyBhY3Rpdm9cIjtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtub21icmVzLCBhcGVsbGlkb3MsIGNlZHVsYSwgY2VsdWxhciwgcHJvdmluY2lhLCBzZWN0b3IsIGNhbGxlLCBjYXNhLCB0ZWxlZm9ub10pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ25vbWJyZXM9JyArIG5vbWJyZXMgKyBcIiZhcGVsbGlkb3M9XCIgKyBhcGVsbGlkb3MgKyBcIiZjZWR1bGE9XCIgKyBjZWR1bGEgKyBcIiZjZWx1bGFyPVwiICsgY2VsdWxhcjtcclxuICAgICAgZm9ybSArPSBcIiZwcm92aW5jaWE9XCIgKyBwcm92aW5jaWEgKyBcIiZzZWN0b3I9XCIgKyBzZWN0b3IgKyBcIiZjYWxsZT1cIiArIGNhbGxlICsgXCImY2FzYT1cIiArIGNhc2EgKyBcIiZ0ZWxlZm9ubz1cIiArIHRlbGVmb25vO1xyXG4gICAgICBmb3JtICs9IFwiJmx1Z2FyX3RyYWJham89XCIgKyBsdWdhclRyYWJham8gKyBcIiZ0ZWxfdHJhYmFqbz1cIiArIHRlbFRyYWJham8gKyBcIiZpbmdyZXNvcz1cIiArIGluZ3Jlc29zICsgXCImZmVjaGFfcmVnaXN0cm89XCIgKyBmZWNoYVJlZ2lzdHJvO1xyXG4gICAgICBmb3JtICs9IFwiJmVzdGFkbz1cIiArIGVzdGFkbyArIFwiJmRldGFsbGVzX2RpcmVjY2lvbj1cIiArIGRldGFsbGVzRGlyZWNjaW9uICArIFwiJnRhYmxhPWNsaWVudGVzXCI7XHJcblxyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvYWRkXCIsIHRydWUsIGluaXRDbGllbnRIYW5kbGVycywgbnVsbCwgZm9ybSwgQ2xpZW50cy5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jbGllbnRlc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIGluaXRDbGllbnRIYW5kbGVycywgY2xpZW50VGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0T25lOiBmdW5jdGlvbiAoaWQsIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1jbGllbnRlcyZpZD1cIiArIGlkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2dldG9uZVwiLCBmYWxzZSwgaW5pdENsaWVudEhhbmRsZXJzLCByZWNlaXZlciwgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICByZWNlaXZlRm9yRWRpdDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgIHZhciBjbGllbnQgICAgICAgICAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB0aGlzLmlkICAgICAgICAgICAgICAgID0gY2xpZW50WydpZF9jbGllbnRlJ107XHJcbiAgICB2YXIgJG5vbWJyZXMgICAgICAgICAgID0gJChcIiN1LWNsaWVudC1uYW1lXCIpO1xyXG4gICAgdmFyICRhcGVsbGlkb3MgICAgICAgICA9ICQoXCIjdS1jbGllbnQtbGFzdG5hbWVcIik7XHJcbiAgICB2YXIgJGNlZHVsYSAgICAgICAgICAgID0gJChcIiN1LWNsaWVudC1kbmlcIik7XHJcbiAgICB2YXIgJGNlbHVsYXIgICAgICAgICAgID0gJChcIiN1LWNsaWVudC1waG9uZVwiKTtcclxuICAgIHZhciAkcHJvdmluY2lhICAgICAgICAgPSAkKFwiI3UtY2xpZW50LXByb3ZpbmNpYVwiKTtcclxuICAgIHZhciAkc2VjdG9yICAgICAgICAgICAgPSAkKFwiI3UtY2xpZW50LXNlY3RvclwiKTtcclxuICAgIHZhciAkY2FsbGUgICAgICAgICAgICAgPSAkKFwiI3UtY2xpZW50LXN0cmVldFwiKTtcclxuICAgIHZhciAkY2FzYSAgICAgICAgICAgICAgPSAkKCcjdS1jbGllbnQtaG91c2UnKTtcclxuICAgIHZhciAkZGV0YWxsZXNEaXJlY2Npb24gPSAkKCcjdS1jbGllbnQtZGlyZWN0aW9uLWRldGFpbHMnKTtcclxuICAgIHZhciAkdGVsZWZvbm8gICAgICAgICAgPSAkKCcjdS1jbGllbnQtdGVsZXBob25lJyk7XHJcbiAgICB2YXIgJGx1Z2FyVHJhYmFqbyAgICAgID0gJCgnI3UtY2xpZW50LWpvYicpO1xyXG4gICAgdmFyICR0ZWxUcmFiYWpvICAgICAgICA9ICQoJyN1LWNsaWVudC1qb2ItdGVsZXBob25lJyk7XHJcbiAgICB2YXIgJGluZ3Jlc29zICAgICAgICAgID0gJCgnI3UtY2xpZW50LXNhbGFyeScpO1xyXG5cclxuICAgICRub21icmVzLnZhbChjbGllbnRbJ25vbWJyZXMnXSk7XHJcbiAgICAkYXBlbGxpZG9zLnZhbChjbGllbnRbJ2FwZWxsaWRvcyddKTtcclxuICAgICRjZWR1bGEudmFsKGNsaWVudFsnY2VkdWxhJ10pO1xyXG4gICAgJGNlbHVsYXIudmFsKGNsaWVudFsnY2VsdWxhciddKTtcclxuICAgICRwcm92aW5jaWEudmFsKGNsaWVudFsncHJvdmluY2lhJ10pO1xyXG4gICAgJHNlY3Rvci52YWwoY2xpZW50WydzZWN0b3InXSk7XHJcbiAgICAkY2FsbGUudmFsKGNsaWVudFsnY2FsbGUnXSk7XHJcbiAgICAkY2FzYS52YWwoY2xpZW50WydjYXNhJ10pO1xyXG4gICAgJGRldGFsbGVzRGlyZWNjaW9uLnZhbChjbGllbnRbJ2RldGFsbGVzX2RpcmVjY2lvbiddKTtcclxuICAgICR0ZWxlZm9uby52YWwoY2xpZW50Wyd0ZWxlZm9ubyddKTtcclxuICAgICRsdWdhclRyYWJham8udmFsKGNsaWVudFsnbHVnYXJfdHJhYmFqbyddKTtcclxuICAgICR0ZWxUcmFiYWpvLnZhbChjbGllbnRbJ3RlbF90cmFiYWpvJ10pO1xyXG4gICAgJGluZ3Jlc29zLnZhbChjbGllbnRbJ3NhbGFyaW8nXSk7XHJcblxyXG4gICAgJChcIiN1cGRhdGUtY2xpZW50LW1vZGFsXCIpLm1vZGFsKCk7XHJcbiAgICAkKFwiI2J0bi11cGRhdGUtY2xpZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdXBkYXRlQ2xpZW50KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDbGllbnQoKSB7XHJcbiAgICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoWyRub21icmVzLnZhbCgpLCAkYXBlbGxpZG9zLnZhbCgpLCAkY2VkdWxhLnZhbCgpLCAkY2VsdWxhci52YWwoKSwgJHByb3ZpbmNpYS52YWwoKSwgJHNlY3Rvci52YWwoKSwgJGNhbGxlLnZhbCgpLFxyXG4gICAgICAgICRjYXNhLnZhbCgpLCAkdGVsZWZvbm8udmFsKClcclxuICAgICAgXSk7XHJcblxyXG4gICAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgICAgZm9ybSA9ICdpZD0nICsgaWQgKyAnJm5vbWJyZXM9JyArICRub21icmVzLnZhbCgpICsgXCImYXBlbGxpZG9zPVwiICsgJGFwZWxsaWRvcy52YWwoKSArIFwiJmNlZHVsYT1cIiArIGdldFZhbCgkY2VkdWxhKTtcclxuICAgICAgICBmb3JtICs9IFwiJmNlbHVsYXI9XCIgKyBnZXRWYWwoJGNlbHVsYXIpICsgXCImcHJvdmluY2lhPVwiICsgJHByb3ZpbmNpYS52YWwoKSArIFwiJnNlY3Rvcj1cIiArICRzZWN0b3IudmFsKCkgKyBcIiZjYWxsZT1cIiArICRjYWxsZS52YWwoKTtcclxuICAgICAgICBmb3JtICs9IFwiJmNhc2E9XCIgKyAkY2FzYS52YWwoKSsgXCImZGV0YWxsZXNfZGlyZWNjaW9uPVwiICsgJGRldGFsbGVzRGlyZWNjaW9uLnZhbCgpICArIFwiJnRlbGVmb25vPVwiICsgZ2V0VmFsKCR0ZWxlZm9ubykgKyBcIiZsdWdhcl90cmFiYWpvPVwiICsgJGx1Z2FyVHJhYmFqby52YWwoKSArIFwiJnRlbF90cmFiYWpvPVwiO1xyXG4gICAgICAgIGZvcm0gKz0gZ2V0VmFsKCR0ZWxUcmFiYWpvKSArIFwiJnRhYmxhPWNsaWVudGVzXCI7XHJcbiAgICAgICAgZm9ybSArPSBcIiZpbmdyZXNvcz1cIiArICRpbmdyZXNvcy52YWwoKTtcclxuXHJcbiAgICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBpbml0Q2xpZW50SGFuZGxlcnMsIG51bGwsIGZvcm0sIENsaWVudHMuZ2V0QWxsKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNhdmVPYnNlcnZhdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBvYnNlcnZhdGlvbnMsaWRDbGllbnRlO1xyXG4gXHJcbiAgICBvYnNlcnZhdGlvbnMgPSAkKFwiI3RleHQtb2JzZXJ2YXRpb25zXCIpLnZhbCgpO1xyXG4gICAgaWRDbGllbnRlICAgID0gJChcIiNkZXRhaWwtY2xpZW50LWlkXCIpLnZhbCgpO1xyXG4gXHJcbiAgICBmb3JtID0gJ29ic2VydmFjaW9uZXM9JyArIG9ic2VydmF0aW9ucyArIFwiJnRhYmxhPW9ic2VydmFjaW9uZXMmaWRfY2xpZW50ZT1cIiArIGlkQ2xpZW50ZTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbClcclxuICB9LFxyXG4gIFxyXG4gIHVwZGF0ZVN0YXRlOiBmdW5jdGlvbiAoY2xpZW50KSB7XHJcbiAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoY2xpZW50KSsgJyZtb2R1bGU9Y2xpZW50ZXMmYWN0aW9uPXVwZGF0ZSc7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGpzb24nLHRydWUsbnVsbCxudWxsLGZvcm0sIG51bGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIEdlbmVyYWxzID0ge1xyXG4gIGRlbGV0ZVJvdzogZnVuY3Rpb24gKGlkLCB0YWJsYSkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPVwiICsgdGFibGEgKyBcIiZpZD1cIiArIGlkO1xyXG4gICAgdmFyIGhhbmRsZXJzLCBjYWxsYmFjaztcclxuICAgIHN3aXRjaCAodGFibGEpIHtcclxuICAgICAgY2FzZSAnY2xpZW50ZXMnOlxyXG4gICAgICAgIGNhbGxiYWNrID0gQ2xpZW50cy5nZXRBbGw7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3NlcnZpY2lvcyc6XHJcbiAgICAgICAgY2FsbGJhY2sgPSBTZXJ2aWNlcy5nZXRBbGw7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9kZWxldGUnLCB0cnVlLG51bGwsIG51bGwsIGZvcm0sIGNhbGxiYWNrKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBtYW5kYSB1biBtZW5zYWplIGFsIHNlcnZpZG9yIGRlIGxvcyB2YWxvcmVzIGEgYnVzY2FyXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgZWwgdmFsb3IgYSBzZXIgYnVzY2Fkb1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYlRhYmxlIG5vbWJyZSBkZSBsYSB0YWJsYSBkb25kZSBzZSBkZXNlYSBjb25zdWx0YXIgZW4gbGEgYmFzZSBkZSBkYXRvc1xyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZpbGxUYWJsZUZ1bmN0aW9uIGZ1bmNpb24gZGUgbGxlbmFkbyBkZSB0YWJsYSBkb25kZSBzZSBtb3N0cmFyYW4gbG9zIHJlc3VsdGFkb3MgXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gaGFuZGxlckZ1bmN0aW9uIGZ1bmNpb24gcmVpbmljaW8gZGUgbG9zIGVsZW1lbnRvcyBlbiBsb3MgaGFuZGxlcnMgXHJcbiAgICovXHJcbiAgXHJcbiAgc2VhcmNoOiBmdW5jdGlvbiAodGV4dCwgZGJUYWJsZSwgZmlsbFRhYmxlRnVuY3Rpb24sIGhhbmRsZXJGdW5jdGlvbikge1xyXG4gICAgaWYgKGhhbmRsZXJGdW5jdGlvbiA9PSB1bmRlZmluZWQpIGhhbmRsZXJGdW5jdGlvbiA9IGluaXRDbGllbnRIYW5kbGVycztcclxuICAgIGlmIChmaWxsVGFibGVGdW5jdGlvbiA9PSB1bmRlZmluZWQpIGZpbGxUYWJsZUZ1bmN0aW9uID0gZmlsbEN1cnJlbnRUYWJsZTtcclxuICAgIHZhciB3b3JkID0gdGV4dDtcclxuICAgIGlmICh3b3JkICE9IG51bGwgfHwgd29yZCAhPSBcIlwiKSB7XHJcbiAgICAgIHZhciBmb3JtID0gXCJ0YWJsYT1cIiArIGRiVGFibGUgKyBcIiZ3b3JkPVwiICsgd29yZDtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3Mvc2VhcmNoJywgZmFsc2UsIGhhbmRsZXJGdW5jdGlvbiwgZmlsbFRhYmxlRnVuY3Rpb24sIGZvcm0sIG51bGwpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvdW50X3RhYmxlOiBmdW5jdGlvbiAodGFibGUpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1cIiArIHRhYmxlO1xyXG4gICAgdmFyIHVwZGF0ZUZ1bmN0aW9uID0gdXBkYXRlQ291bnQ7XHJcbiAgICBpZiAodGFibGUgPT0gJ2NhamEnKSB1cGRhdGVGdW5jdGlvbiA9IHVwZGF0ZUNhamFDb3VudFxyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvY291bnQnLCBmYWxzZSwgbnVsbCwgdXBkYXRlRnVuY3Rpb24sIGZvcm0sIG51bGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIFNlcnZpY2VzID0ge1xyXG4gIGFkZDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG5hbWUsIGRlc2NyaXB0aW9uLCBwYXltZW50LCB0eXBlO1xyXG5cclxuICAgIG5hbWUgICAgICAgID0gJChcIiNzZXJ2aWNlLW5hbWVcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjc2VydmljZS1kZXNjcmlwdGlvblwiKS52YWwoKTtcclxuICAgIHBheW1lbnQgICAgID0gJChcIiNzZXJ2aWNlLW1vbnRobHktcGF5bWVudFwiKS52YWwoKTtcclxuICAgIHR5cGUgICAgICAgID0gJChcIiNzZXJ2aWNlLXR5cGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbbmFtZSwgZGVzY3JpcHRpb24sIHBheW1lbnQsIHR5cGVdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdub21icmU9JyArIG5hbWUgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uICsgXCImbWVuc3VhbGlkYWQ9XCIgKyBwYXltZW50ICsgXCImdGlwbz1cIiArIHR5cGU7XHJcbiAgICAgIGZvcm0gKz0gXCImdGFibGE9c2VydmljaW9zXCI7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9hZGRcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgU2VydmljZXMuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9c2VydmljaW9zXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgc2VydmljZVRhYmxlLnJlZnJlc2gsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIGlkLCBuYW1lLCBkZXNjcmlwdGlvbiwgcGF5bWVudCwgdHlwZTtcclxuXHJcbiAgICBpZCAgICAgICAgICA9ICQoJyN1LXNlcnZpY2UtaWQnKS52YWwoKTtcclxuICAgIG5hbWUgICAgICAgID0gJCgnI3Utc2VydmljZS1uYW1lJykudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoJyN1LXNlcnZpY2UtZGVzY3JpcHRpb24nKS52YWwoKTtcclxuICAgIHBheW1lbnQgICAgID0gJCgnI3Utc2VydmljZS1tb250aGx5LXBheW1lbnQnKS52YWwoKTtcclxuICAgIHR5cGUgICAgICAgID0gJCgnI3Utc2VydmljZS10eXBlJykudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBwYXltZW50LCB0eXBlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfc2VydmljaW89JyArIGlkICsgXCImbm9tYnJlPVwiICsgbmFtZSArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb24gKyBcIiZtZW5zdWFsaWRhZD1cIiArIHBheW1lbnQ7XHJcbiAgICAgIGZvcm0gKz0gXCImdGlwbz1cIiArIHR5cGUgKyBcIiZ0YWJsYT1zZXJ2aWNpb3NcIjtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBTZXJ2aWNlcy5nZXRBbGwsaGVhdnlMb2FkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ29udHJhY3RzID0ge1xyXG4gIGFkZDogZnVuY3Rpb24gYWRkTmV3Q29udHJhY3QoKSB7XHJcbiAgICB2YXIgZm9ybSwgdGFibGUsIGNsaWVudF9pZCwgdXNlcl9pZCwgc2VydmljZV9pZCwgY29kZSwgY29udHJhY3RfZGF0ZSwgcGF5bWVudCwgZHVyYXRpb24sXHJcbiAgICAgIGVxdWlwbWVudCwgZU1hYywgcm91dGVyLCByTWFjLCB0b3RhbCwgbmV4dFBheW1lbnQsIG1vZGVsLCBpcDtcclxuXHJcbiAgICBjbGllbnRfaWQgICAgID0gJChcIiNjb250cmFjdC1jbGllbnQtaWRcIikudmFsKCk7XHJcbiAgICB1c2VyX2lkICAgICAgID0gJChcIiNjb250cmFjdC11c2VyLWlkXCIpLnZhbCgpO1xyXG4gICAgc2VydmljZV9pZCAgICA9ICQoXCIuc2VydmljZS1jYXJkLnNlbGVjdGVkXCIpLmF0dHIoJ2RhdGEtaWQnKTtcclxuICAgIGNvbnRyYWN0X2RhdGUgPSAkKCcjY29udHJhY3QtY2xpZW50LWRhdGUnKS52YWwoKTtcclxuICAgIGR1cmF0aW9uICAgICAgPSAkKCcjY29udHJhY3QtY2xpZW50LW1vbnRocycpLnZhbCgpO1xyXG4gICAgZXF1aXBtZW50ICAgICA9ICQoJyNjb250cmFjdC1lcXVpcG1lbnQnKS52YWwoKTtcclxuICAgIGVNYWMgICAgICAgICAgPSAkKCcjY29udHJhY3QtZS1tYWMnKS52YWwoKTtcclxuICAgIHJvdXRlciAgICAgICAgPSAkKCcjY29udHJhY3Qtcm91dGVyJykudmFsKCk7XHJcbiAgICByTWFjICAgICAgICAgID0gJCgnI2NvbnRyYWN0LXItbWFjJykudmFsKCk7XHJcbiAgICBtb2RlbCAgICAgICAgID0gJCgnI2NvbnRyYWN0LWVxdWlwbWVudC1tb2RlbCcpLnZhbCgpO1xyXG4gICAgaXAgICAgICAgICAgICA9ICQoJyNjb250cmFjdC1pcCcpLnZhbCgpO1xyXG4gICAgY29kZSAgICAgICAgICA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0LWNvZGVcIikudmFsKCk7XHJcblxyXG4gICAgcGF5bWVudCA9ICQoXCIjY29udHJhY3QtY2xpZW50LXBheW1lbnRcIikudmFsKCk7XHJcbiAgICBuZXh0UGF5bWVudCA9IG1vbWVudChjb250cmFjdF9kYXRlKS5hZGQoMSwgJ21vbnRocycpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2NsaWVudF9pZCwgdXNlcl9pZCwgc2VydmljZV9pZCwgY29udHJhY3RfZGF0ZSwgZHVyYXRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgdG90YWwgPSAoTnVtYmVyKGR1cmF0aW9uKSArIDEpICogTnVtYmVyKHBheW1lbnQpO1xyXG4gICAgICBmb3JtID0gJ2lkX2VtcGxlYWRvPScgKyB1c2VyX2lkICsgXCImaWRfY2xpZW50ZT1cIiArIGNsaWVudF9pZCArIFwiJmlkX3NlcnZpY2lvPVwiICsgc2VydmljZV9pZCArIFwiJmNvZGlnbz1cIiArIGNvZGUgKyBcIiZmZWNoYT1cIiArIGNvbnRyYWN0X2RhdGU7XHJcbiAgICAgIGZvcm0gKz0gXCImZHVyYWNpb249XCIgKyBkdXJhdGlvbiArIFwiJm1vbnRvX3RvdGFsPVwiICsgdG90YWwgKyBcIiZtb250b19wYWdhZG89MCZ1bHRpbW9fcGFnbz1udWxsXCI7XHJcbiAgICAgIGZvcm0gKz0gXCImbWVuc3VhbGlkYWQ9XCIgKyBwYXltZW50ICsgXCImcHJveGltb19wYWdvPVwiICsgbmV4dFBheW1lbnQgKyBcIiZlc3RhZG89YWN0aXZvJnRhYmxhPWNvbnRyYXRvc1wiO1xyXG4gICAgICBmb3JtICs9IFwiJm5vbWJyZV9lcXVpcG89XCIgKyBlcXVpcG1lbnQgKyBcIiZtYWNfZXF1aXBvPVwiICsgZU1hYyArIFwiJnJvdXRlcj1cIiArIHJvdXRlciArIFwiJm1hY19yb3V0ZXI9XCIgKyByTWFjO1xyXG4gICAgICBmb3JtICs9IFwiJm1vZGVsbz1cIiArIG1vZGVsICsgXCImaXA9XCIgKyBpcDtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2FkZFwiLCBudWxsLCBudWxsLCBDb250cmFjdHMuZ2V0TGFzdCwgZm9ybSwgbnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y29udHJhdG9zXCI7XHJcbiAgICB2YXIgY2FsbGJhY2sgPSBudWxsXHJcbiAgICB2YXIgcmVmcmVzaCA9IGNvbnRyYWN0VGFibGUucmVmcmVzaDtcclxuICAgIGlmIChjb250cmFjdFRhYmxlLmVsID09ICdkZXRhbGxlcycpIHtcclxuICAgICAgY2FsbGJhY2sgPSBQYXltZW50cy5nZXRBbGwoKVxyXG4gICAgICByZWZyZXNoID0gbnVsbFxyXG4gICAgfVxyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIHJlZnJlc2gsIGZvcm0sIGNhbGxiYWNrKTtcclxuICB9LFxyXG5cclxuICBnZXRMYXN0OiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSlcclxuICAgICQoXCIjYnRuLXNhdmUtY29udHJhY3RcIikuYXR0cihcImRpc2FibGVkXCIsIFwiXCIpO1xyXG4gICAgJChcIiNidG4tcHJpbnQtY29udHJhY3RcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgaWYoZGF0YS50YWJsYV9wYWdvcyl7XHJcbiAgICAgIG1ha2VQYXltZW50TGlzdChkYXRhLnRhYmxhX3BhZ29zKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjYWxsRXh0cmE6IGZ1bmN0aW9uKGNvbnRleHQpIHtcclxuICAgIHZhciByb3dcclxuICAgIGlmIChjb250ZXh0ID09IFwiZGV0YWlsc1wiKXtcclxuICAgICAgcm93ID0gZGV0YWlsc0NvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgIH1lbHNle1xyXG4gICAgICByb3cgPSBjb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmIChyb3cpIHtcclxuICAgICAgJChcIiNleHRyYS1jbGllbnQtZG5pXCIpLnZhbChyb3cuY2VkdWxhKTtcclxuICAgICAgQ29udHJhY3RzLmdldEFsbE9mQ2xpZW50KHJvdy5jZWR1bGEpO1xyXG4gICAgICAkKCcjYWRkLWV4dHJhLW1vZGFsJykubW9kYWwoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJTZWxlY2Npb25lIGVsIGNvbnJhdG8gcHJpbWVyb1wiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNhbmNlbDogZnVuY3Rpb24ocm93LGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgaXNfcGVuYWx0eSA9IGZhbHNlO1xyXG4gICAgdmFyIHJlYXNvbiAgICAgPSAkKFwiI2NhbmNlbGF0aW9uLXJlYXNvblwiKS52YWwoKTtcclxuICAgIHZhciBjaGVja2VkICAgID0gJChcIiNjaGVjay1wZW5hbHR5OmNoZWNrZWRcIikubGVuZ3RoO1xyXG4gICAgdmFyIGZvcm0sIGZlY2hhO1xyXG4gICAgY29uc29sZS5sb2cocm93KVxyXG4gICAgaWYocm93LmlkKXtcclxuICAgICAgaWYgKGNoZWNrZWQgPiAwKSB7XHJcbiAgICAgICAgaXNfcGVuYWx0eSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZmVjaGEgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyByb3cuaWQgKyAnJmZlY2hhPScgKyBmZWNoYSArICcmaWRfY2xpZW50ZT0nICsgcm93LmlkX2NsaWVudGU7XHJcbiAgICAgIGZvcm0gKz0gXCImbW90aXZvPVwiICsgcmVhc29uICsgXCImcGVuYWxpZGFkPVwiICsgaXNfcGVuYWx0eTtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvY2FuY2VsJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgY2FsbGJhY2spO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfRVJST1IgK1wiIE5vIGhheSBjb250cmF0byBzZWxlY2Npb25hZG9cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0T25lOiBmdW5jdGlvbihpZF9jb250cmF0bywgcmVjZWl2ZXIpIHtcclxuICAgIGZvcm0gPSBcInRhYmxhPWNvbnRyYXRvcyZpZF9jb250cmF0bz1cIiArIGlkX2NvbnRyYXRvO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2dldG9uZVwiLCBmYWxzZSwgbnVsbCwgcmVjZWl2ZXIsIGZvcm0sIG51bGwpXHJcbiAgfSxcclxuXHJcbiAgcmVjaWV2ZTogZnVuY3Rpb24oY29udGVudCkge1xyXG4gICAgdmFyIGNvbnRyYWN0ICAgID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgIHRoaXMuaWRfY29udHJhdG8gPSBjb250cmFjdFsnaWRfY29udHJhdG8nXTtcclxuICAgIHZhciAkZXF1aXBvICAgICA9ICQoXCIjdS1jb250cmFjdC1lcXVpcG1lbnRcIik7XHJcbiAgICB2YXIgJG1hY0VxdWlwbyAgPSAkKFwiI3UtY29udHJhY3QtZS1tYWNcIik7XHJcbiAgICB2YXIgJHJvdXRlciAgICAgPSAkKFwiI3UtY29udHJhY3Qtcm91dGVyXCIpO1xyXG4gICAgdmFyICRtYWNSb3V0ZXIgID0gJChcIiN1LWNvbnRyYWN0LXItbWFjXCIpO1xyXG4gICAgdmFyICRtb2RlbG8gICAgID0gJChcIiN1LWNvbnRyYWN0LW1vZGVsb1wiKTtcclxuICAgIHZhciAkY29kaWdvICAgICA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0LWNvZGVcIik7XHJcbiAgICB2YXIgJGlzQ2hhbmdlSXAgPSAkKFwiI2NoZWNrLWNoYW5nZS1pcFwiKTtcclxuICAgIHZhciAkaXAgICAgICAgICA9ICQoXCIjdS1jb250cmFjdC1pcFwiKTtcclxuXHJcbiAgICAkZXF1aXBvLnZhbChjb250cmFjdFsnbm9tYnJlX2VxdWlwbyddKTtcclxuICAgICRtYWNFcXVpcG8udmFsKGNvbnRyYWN0WydtYWNfZXF1aXBvJ10pO1xyXG4gICAgJHJvdXRlci52YWwoY29udHJhY3RbJ3JvdXRlciddKTtcclxuICAgICRtYWNSb3V0ZXIudmFsKGNvbnRyYWN0WydtYWNfcm91dGVyJ10pO1xyXG4gICAgJG1vZGVsby52YWwoY29udHJhY3RbJ21vZGVsbyddKTtcclxuICAgICRpcC52YWwoY29udHJhY3RbJ2lwJ10pO1xyXG5cclxuICAgIC8vICQoXCIjdXBkYXRlLWNvbnRyYWN0LW1vZGFsIHNlbGVjdFwiKS52YWwoJycpXHJcbiAgICAkKFwiI3VwZGF0ZS1jb250cmFjdC1tb2RhbFwiKS5tb2RhbCgpO1xyXG4gICAgJChcIiN1cGRhdGUtY29udHJhY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdXBkYXRlQ29udHJhY3QoaWRfY29udHJhdG8pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29udHJhY3QoaWRfY29udHJhdG8pIHtcclxuICAgICAgdmFyIGNoZWNrZWQgPSAkKFwiI2NoZWNrLWNoYW5nZS1pcDpjaGVja2VkXCIpLmxlbmd0aDtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgaWRfY29udHJhdG8gKyAnJm5vbWJyZV9lcXVpcG89JyArICRlcXVpcG8udmFsKCkgKyBcIiZtYWNfZXF1aXBvPVwiICsgJG1hY0VxdWlwby52YWwoKTtcclxuICAgICAgZm9ybSArPSBcIiZyb3V0ZXI9XCIgKyAkcm91dGVyLnZhbCgpICsgXCImbWFjX3JvdXRlcj1cIiArICRtYWNSb3V0ZXIudmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImbW9kZWxvPVwiICsgJG1vZGVsby52YWwoKTtcclxuICAgICAgZm9ybSArPSBcIiZ0YWJsYT1jb250cmF0b3NcIjtcclxuICAgICAgaWYgKGNoZWNrZWQgPiAwKSB7XHJcbiAgICAgICAgZm9ybSArPSBcIiZpcD1cIiArICRpcC52YWwoKSArIFwiJmNvZGlnbz1cIiArICRjb2RpZ28udmFsKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBDb250cmFjdHMuZ2V0QWxsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRJcExpc3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWN0aW9uX2lkID0gJChcIiNzZWxlY3QtY29udHJhY3Qtc2VjdG9yXCIpLnZhbCgpO1xyXG4gICAgdmFyIGZvcm0gPSBcImlkX3NlY2Npb249XCIgKyBzZWN0aW9uX2lkICsgXCImdGFibGE9aXBfbGlzdFwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2dldGFsbFwiLCBmYWxzZSwgbnVsbCwgbWFrZUlwTGlzdCwgZm9ybSwgbnVsbCk7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFrZUlwTGlzdChjb250ZW50KSB7XHJcbiAgICAgICQoXCIjc2VsZWN0LWNvbnRyYWN0LWNvZGVcIikuaHRtbChjb250ZW50KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBidG5FeHRyYVByZXNzZWQ6IGZ1bmN0aW9uICgkdGhpcykge1xyXG4gICAgdmFyIGJ1dHRvbklkID0gJHRoaXMudGV4dCgpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIHN3aXRjaCAoYnV0dG9uSWQpIHtcclxuICAgICAgY2FzZSBcIm1lam9yYXJcIjpcclxuICAgICAgICBDb250cmFjdHMudXBncmFkZSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZXh0ZW5kZXJcIjpcclxuICAgICAgICBDb250cmFjdHMuZXh0ZW5kKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJndWFyZGFyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLmFkZEV4dHJhKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBncmFkZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIGNvbnRyYWN0SWQsIHNlbGVjdGVkU2VydmljZSwgc2VydmljZUlkLCBhbW91bnQ7XHJcblxyXG4gICAgY29udHJhY3RJZCA9ICQoXCIjZXh0cmEtY2xpZW50LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgc2VsZWN0ZWRTZXJ2aWNlID0gJChcIi5zZXJ2aWNlLWNhcmQuc2VsZWN0ZWRcIik7XHJcbiAgICBzZXJ2aWNlSWQgPSBzZWxlY3RlZFNlcnZpY2UuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICBhbW91bnQgPSBzZWxlY3RlZFNlcnZpY2UuYXR0cihcImRhdGEtcGF5bWVudFwiKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtjb250cmFjdElkLCBzZXJ2aWNlSWQsIGFtb3VudF0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyBjb250cmFjdElkICsgXCImaWRfc2VydmljaW89XCIgKyBzZXJ2aWNlSWQgKyBcIiZjdW90YT1cIiArIGFtb3VudDtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBncmFkZScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcImFzZWd1cmF0ZSBkZSBsbGVuYXIgdG9kb3MgbG9zIGRhdG9zIHkgc2VsZWNjaW9uYXIgZWwgc2VydmljaW9cIiwgXCJpbmZvXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHJlY29ubmVjdDogZnVuY3Rpb24gKGNvbnRyYWN0SWQsY2FsbGJhY2spIHtcclxuICAgIHZhciBmb3JtLCBzZWxlY3RlZFNlcnZpY2UsIHNlcnZpY2VJZCwgZHVyYXRpb24sIGRhdGUsc2VuZCwgaXNfZW1wdHksaW5mbztcclxuXHJcbiAgICBzZWxlY3RlZFNlcnZpY2UgPSAkKFwiLnNlcnZpY2UtY2FyZC5zZWxlY3RlZFwiKTtcclxuICAgIHNlcnZpY2VJZCA9IHNlbGVjdGVkU2VydmljZS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgIGR1cmF0aW9uICA9ICQoXCIjcmVjb25uZWN0aW9uLW1vbnRoc1wiKS52YWwoKTtcclxuICAgIGRhdGUgPSAkKFwiI3JlY29ubmVjdGlvbi1kYXRlXCIpLnZhbCgpXHJcbiAgICBpc19lbXB0eSA9IGlzRW1wdHkoW2NvbnRyYWN0SWQsc2VydmljZUlkLGRhdGUsZHVyYXRpb25dKTtcclxuICAgIGlmKCFpc19lbXB0eSl7XHJcbiAgICAgIGluZm8gPSB7XHJcbiAgICAgICAgJ2lkX2NvbnRyYXRvJzogY29udHJhY3RJZCxcclxuICAgICAgICAnZmVjaGEnOiBkYXRlLFxyXG4gICAgICAgICdpZF9zZXJ2aWNpbyc6IHNlcnZpY2VJZCxcclxuICAgICAgICAnZHVyYWNpb24nOiBkdXJhdGlvblxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3JtID0gXCJkYXRhPVwiICsgSlNPTi5zdHJpbmdpZnkoaW5mbyk7XHJcbiAgICAgIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgXCJjb250cmFjdC9yZWNvbm5lY3RcIixmb3JtKTtcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UocmVzLmRhdGEubWVuc2FqZSk7XHJcbiAgICAgICAgUGF5bWVudHMuZ2V0QWxsKCk7XHJcbiAgICAgICAgJChcIiNidG4tcmVjb25uZWN0XCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAkKFwiLnJlY29ubmVjdC1jYWxsZXJcIikucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcclxuICAgICAgICBpZihjYWxsYmFjaylcclxuICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgfSlcclxuICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pXHJcbiAgICB9ZWxzZXtcclxuICAgICAgc3dhbChcIkxsZW5lIHRvZG9zIGxvcyBjYW1wb3NcIilcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhZGRFeHRyYTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIGNvbnRyYWN0SWQsIGV4dHJhU2VydmljZSwgc2VydmljZUNvc3QsIGVxdWlwbWVudCwgZU1hYywgcm91dGVyLCByTWFjLHBheW1lbnRNb2RlO1xyXG5cclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIHNlcnZpY2VDb3N0ID0gJChcIiNleHRyYS1zZXJ2aWNlLWNvc3RcIikudmFsKCk7XHJcbiAgICBleHRyYVNlcnZpY2UgPSAkKFwiI3NlbGVjdC1leHRyYS1zZXJ2aWNlXCIpLnZhbCgpO1xyXG4gICAgZXF1aXBtZW50ID0gJChcIiNleHRyYS1lcXVpcG9cIikudmFsKCk7XHJcbiAgICBlTWFjID0gJChcIiNleHRyYS1lLW1hY1wiKS52YWwoKTtcclxuICAgIHJvdXRlciA9ICQoXCIjZXh0cmEtcm91dGVyXCIpLnZhbCgpO1xyXG4gICAgck1hYyA9ICQoXCIjZXh0cmEtci1tYWNcIikudmFsKCk7XHJcbiAgICBwYXltZW50TW9kZSA9ICQoXCIjc2VsZWN0LXBheW1lbnQtbW9kZVwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtjb250cmFjdElkLCBleHRyYVNlcnZpY2UsIHNlcnZpY2VDb3N0LHBheW1lbnRNb2RlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGNvbnRyYWN0SWQgKyBcIiZjb3N0b19zZXJ2aWNpbz1cIiArIHNlcnZpY2VDb3N0ICsgXCImbm9tYnJlX3NlcnZpY2lvPVwiICsgZXh0cmFTZXJ2aWNlO1xyXG4gICAgICBmb3JtICs9ICcmbm9tYnJlX2VxdWlwbz0nICsgZXF1aXBtZW50ICsgXCImbWFjX2VxdWlwbz1cIiArIGVNYWMgKyBcIiZyb3V0ZXI9XCIgKyByb3V0ZXIgKyBcIiZtYWNfcm91dGVyPVwiICsgck1hYztcclxuICAgICAgZm9ybSArPSAnJm1vZG9fcGFnbz0nICsgcGF5bWVudE1vZGU7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2FkZGV4dHJhJywgdHJ1ZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBudWxsLCBmb3JtLCBDb250cmFjdHMuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcInJldmlzZVwiLCBcImFzZWd1cmF0ZSBkZSBsbGVuYXIgdG9kb3MgbG9zIGRhdG9zIHkgc2VsZWNjaW9uYXIgZWwgc2VydmljaW9cIiwgXCJpbmZvXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGV4dGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIGNvbnRyYWN0SWQsIGR1cmF0aW9uO1xyXG4gICAgY29udHJhY3RJZCA9ICQoXCIjZXh0cmEtY2xpZW50LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgZHVyYXRpb24gPSAkKFwiI2V4dHJhLWV4dGVuc2lvbi1tb250aHNcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbZHVyYXRpb24sIGNvbnRyYWN0SWRdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgY29udHJhY3RJZCArIFwiJmR1cmFjaW9uPVwiICsgZHVyYXRpb247XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2V4dGVuZF9jb250cmFjdCcsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcInJldmlzZVwiLCBcImFzZWd1cmF0ZSBkZSBsbGVuYXIgdG9kb3MgbG9zIGRhdG9zIHkgc2VsZWNjaW9uYXIgZWwgc2VydmljaW9cIiwgXCJpbmZvXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEFsbE9mQ2xpZW50OiBmdW5jdGlvbihkbmkpIHtcclxuICAgIHZhciBmb3JtID0gXCJkbmk9XCIgKyBkbmk7XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvZGF0YV9mb3JfZXh0cmFcIiwgZmFsc2UsIG51bGwsIG1ha2VDb250cmFjdExpc3QsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIC8vIE5vdGU6IGxvIHNpZW50bywgZGUgYXF1aSBlbiBhZGVsYW50ZSB1c28gYXhpb3MsIGVzIG11Y2hvIG1hcyBjb21vZG9cclxuXHJcbiAgc3VzcGVuZDogZnVuY3Rpb24gKGNvbnRyYWN0SWQsIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwiZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KHtpZF9jb250cmF0bzogY29udHJhY3RJZH0pXHJcbiAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAnY29udHJhY3Qvc3VzcGVuZCcsZm9ybSk7XHJcbiAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpO1xyXG4gICAgICBDb250cmFjdHMuZ2V0QWxsKCk7XHJcbiAgICAgIGlmKGNhbGxiYWNrKVxyXG4gICAgICAgIGNhbGxiYWNrKClcclxuICAgIH0pXHJcbiAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbnZhciBQYXltZW50cyA9IHtcclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpZCA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgaWYgKGlkICE9IG51bGwpIHtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPXBhZ29zJmlkPVwiICsgaWQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBwYXltZW50VGFibGUucmVmcmVzaCwgZm9ybSwgUGF5bWVudHMuY29udHJhY3RSZWZyZXNoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICB2YXIgZGF0ZSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgIHZhciBpZF9jb250cmF0byA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9cGFnb3MmaWQ9XCIgKyBpZCArIFwiJmVzdGFkbz1wYWdhZG8mZmVjaGFfcGFnbz1cIiArIGRhdGUgKyBcIiZpZF9jb250cmF0bz1cIiArIGlkX2NvbnRyYXRvO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpO1xyXG4gIH0sXHJcblxyXG4gIHNhdmVBYm9ub3M6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBvYnNlcnZhdGlvbnMsIGFib25vJGlucHV0QWJvbm8sJHRleHRBYm9ubyxjb250cmFjdElkO1xyXG5cclxuICAgICR0ZXh0QWJvbm8gICA9ICQoJyN0ZXh0LWFib25vLWRldGFpbCcpO1xyXG4gICAgb2JzZXJ2YXRpb25zID0gJHRleHRBYm9uby52YWwoKTtcclxuICAgIGNvbnRyYWN0SWQgICA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgJGlucHV0QWJvbm8gID0gJChcIiNpbnB1dC1hYm9ub1wiKTtcclxuICAgIGFib25vICAgICAgICA9ICRpbnB1dEFib25vLnZhbCgpO1xyXG5cclxuICAgIGZvcm0gPSAnb2JzZXJ2YWNpb25lcz0nICsgb2JzZXJ2YXRpb25zICsgXCImYWJvbm9zPVwiICsgYWJvbm87XHJcbiAgICBmb3JtICs9IFwiJmNvbnRyYXRvX2Fib25vPVwiK2NvbnRyYWN0SWQrXCImdGFibGE9YWJvbm9zXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFBheW1lbnRzLmdldEFsbClcclxuICAgICRpbnB1dEFib25vLnZhbCgnJylcclxuICB9LFxyXG5cclxuICBzYXZlRXh0cmE6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdwcm9jZXNzLycpXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlVW50aWw6IGZ1bmN0aW9uKGNvbnRyYWN0SWQsbGFzdFBheW1lbnRJZCl7XHJcbiAgICB2YXIgaWRfY29udHJhdG8gPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1wYWdvc19hbF9kaWEmaWRfdWx0aW1vX3BhZ289XCIgKyBsYXN0UGF5bWVudElkICsgXCImZXN0YWRvPXBhZ2FkbyZpZF9jb250cmF0bz1cIiArIGNvbnRyYWN0SWQ7XHJcbiAgICB2YXIgaGFuZGxlcnMsIGNhbGxiYWNrO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbCwgaGVhdnlMb2FkKTtcclxuICB9LFxyXG4gICAgXHJcbiAgcmVtb3ZlUGF5bWVudDogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9ZGVzaGFjZXJfcGFnbyZpZF9wYWdvPVwiICsgaWQ7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpO1xyXG4gIH0sXHJcblxyXG4gIGNvbnRyYWN0UmVmcmVzaDogZnVuY3Rpb24oKXtcclxuICAgIHZhciBpZF9jbGllbnRlID0gJCgnI2RldGFpbC1jbGllbnQtaWQnKS52YWwoKVxyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNvbnRyYXRvc19jbGllbnRlJmlkPVwiICsgaWRfY2xpZW50ZTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBkZXRhaWxzQ29udHJhY3RUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBnZXRPbmU6IGZ1bmN0aW9uKGlkX3BhZ28sIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1wYWdvcyZpZF9wYWdvPVwiICsgaWRfcGFnbztcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRvbmVcIiwgZmFsc2UsIG51bGwsIHJlY2VpdmVyLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHJlY2VpdmVGb3JFZGl0OiBmdW5jdGlvbihjb250ZW50KXtcclxuICAgIHZhciBkYXRhICAgICAgICAgID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgIHZhciBwYWdvICAgICAgICAgID0gZGF0YS5wYWdvXHJcbiAgICB2YXIgc2V0dGluZ3MgICAgICA9IGRhdGEuc2V0dGluZ3M7XHJcbiAgICB0aGlzLmlkX2NvbnRyYXRvICA9IHBhZ29bJ2lkX2NvbnRyYXRvJ107XHJcbiAgICB0aGlzLmlkX3BhZ28gICAgICA9IHBhZ29bJ2lkX3BhZ28nXVxyXG4gICAgdmFyICRjb25jZXB0byAgICAgPSAkKFwiI3BheW1lbnQtY29uY2VwdFwiKTtcclxuICAgIHZhciAkZmVjaGFMaW1pdGUgID0gJChcIiNwYXltZW50LWxpbWl0LWRhdGVcIik7XHJcbiAgICB2YXIgJHNlcnZpY2lvc0V4dHJhID0gJChcIiNwYXltZW50LWV4dHJhLXNlcnZpY2VzXCIpO1xyXG4gICAgdmFyICRjdW90YSAgICAgICAgPSAkKFwiI3BheW1lbnQtY3VvdGFcIik7XHJcbiAgICB2YXIgJG1vcmEgICAgICAgICA9ICQoXCIjcGF5bWVudC1tb3JhXCIpO1xyXG4gICAgdmFyICRleHRyYSAgICAgICAgPSAkKFwiI3BheW1lbnQtZXh0cmFcIik7XHJcbiAgICB2YXIgJHRvdGFsICAgICAgICA9ICQoXCIjcGF5bWVudC10b3RhbFwiKTtcclxuICAgIHZhciAkZGVzY3VlbnRvICAgID0gJChcIiNwYXltZW50LWRpc2NvdW50LWFtb3VudFwiKTtcclxuICAgIHZhciAkcmF6b24gICAgICAgID0gJChcIiNwYXltZW50LWRpc2NvdW50LXJlYXNvblwiKTtcclxuICAgIHZhciAkbW9kYWwgICAgICAgID0gJChcIiNhZHZhbmNlZC1wYXltZW50XCIpO1xyXG4gICAgdmFyICRjTW9yYSAgICAgICAgPSAkKFwiI2NfbW9yYVwiKTtcclxuICAgIHZhciAkY1JlY29uZXhpb24gID0gJChcIiNjX3JlY29uZXhpb25cIik7XHJcblxyXG4gICAgJGNvbmNlcHRvLnZhbChwYWdvWydjb25jZXB0byddKTtcclxuICAgICRmZWNoYUxpbWl0ZS52YWwocGFnb1snZmVjaGFfbGltaXRlJ10pO1xyXG4gICAgJGN1b3RhLnZhbChwYWdvWydjdW90YSddKTtcclxuICAgICRtb3JhLnZhbChwYWdvWydtb3JhJ10pO1xyXG4gICAgJGV4dHJhLnZhbChwYWdvWydtb250b19leHRyYSddKTtcclxuICAgICR0b3RhbC52YWwocGFnb1sndG90YWwnXSk7XHJcbiAgICAkc2VydmljaW9zRXh0cmEudmFsKHBhZ29bJ2RldGFsbGVzX2V4dHJhJ10pO1xyXG4gICAgaW50ZXJhY3RpdmVTdW0oKTtcclxuXHJcbiAgICAkbW9kYWwubW9kYWwoKTtcclxuXHJcbiAgICAkbW9kYWwub24oJ2hpZGUuYnMubW9kYWwnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICRtb2RhbC5maW5kKCdpbnB1dCcpLnZhbCgnJylcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChwYWdvWydtb3JhJ10gPiAwKSB7XHJcbiAgICAgICRjTW9yYS5pQ2hlY2soJ2NoZWNrJyk7ICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkY01vcmEuaUNoZWNrKCd1bmNoZWNrJyk7IFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAocGFnb1snZGV0YWxsZXNfZXh0cmEnXS5pbmNsdWRlcygnUmVjb25leGlvbicpKSB7XHJcbiAgICAgICRjUmVjb25leGlvbi5pQ2hlY2soJ2NoZWNrJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkY1JlY29uZXhpb24uaUNoZWNrKCd1bmNoZWNrJyk7ICAgICBcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1hcHBseS1kaXNjb3VudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBpZiAoJGRlc2N1ZW50by52YWwoKSA+IDApIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIlNlZ3VybyBkZSBxdWUgcXVpZXJlIGFwbGljYXIgZXN0ZSBkZXNjdWVudG8gZGUgXCIgKyAkZGVzY3VlbnRvLnZhbCgpICsgXCI/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBhcHBseSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFwcGx5KCk7XHJcbiAgICAgIH0gXHJcbiAgICB9KTtcclxuXHJcbiAgICAkY01vcmEub24oJ2lmQ2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIG1vcmEgPSBwYWdvWydjdW90YSddICogc2V0dGluZ3NbJ2NhcmdvX21vcmEnXSAvIDEwMDtcclxuICAgICAgJG1vcmEudmFsKG1vcmEpLnRyaWdnZXIoJ2tleXVwJyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJGNSZWNvbmV4aW9uLm9uKCdpZkNoZWNrZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICRleHRyYS52YWwoc2V0dGluZ3NbJ3JlY29uZXhpb24nXSkudHJpZ2dlcigna2V5dXAnKTtcclxuICAgICAgJHNlcnZpY2lvc0V4dHJhLnZhbCgnUmVjb25leGlvbicpO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgJGNNb3JhLm9uKCdpZlVuY2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJG1vcmEudmFsKDApLnRyaWdnZXIoJ2tleXVwJyk7XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICAkY1JlY29uZXhpb24ub24oJ2lmVW5jaGVja2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkZXh0cmEudmFsKDApLnRyaWdnZXIoJ2tleXVwJyk7XHJcbiAgICAgICRzZXJ2aWNpb3NFeHRyYS52YWwoJycpO1xyXG4gICAgfSlcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gYXBwbHkgKCkge1xyXG4gICAgICBhcHBseURpc2NvdW50KGlkX3BhZ28pO1xyXG4gICAgICAkbW9kYWwuaGlkZSgpO1xyXG4gICAgICAkbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgICAgICQoJy5tb2RhbC1iYWNrZHJvcCcpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGx5RGlzY291bnQoaWRfcGFnbykge1xyXG4gICAgICB2YXIgZGF0ZSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgIGZvcm0gPSAnaWRfcGFnbz0nICsgaWRfcGFnbyArICcmaWRfY29udHJhdG89JyArIGlkX2NvbnRyYXRvICsgXCImY3VvdGE9XCIgKyAkY3VvdGEudmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImbW9yYT1cIiArICRtb3JhLnZhbCgpICsgXCImbW9udG9fZXh0cmE9XCIgKyAkZXh0cmEudmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImdG90YWw9XCIgKyAkdG90YWwudmFsKCkgKyAnJmRlc2N1ZW50bz0nICsgJGRlc2N1ZW50by52YWwoKSArICcmcmF6b25fZGVzY3VlbnRvPScgKyRyYXpvbi52YWwoKTtcclxuICAgICAgZm9ybSArPSAnJmZlY2hhX3BhZ289JyArIGRhdGUgKyAnJmRldGFsbGVzX2V4dHJhPScgKyAkc2VydmljaW9zRXh0cmEudmFsKCkgKyBcIiZ0YWJsYT1kaXNjb3VudF9wYWdvc1wiO1xyXG5cclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpO1xyXG4gICAgICAkbW9kYWwuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGludGVyYWN0aXZlU3VtKCl7XHJcbiAgICAgICQoJy5wYXltZW50LXN1bWFuZG9zJykub24oJ2tleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgICAgICRjdW90YS52YWwocGFnb1snY3VvdGEnXSAtICRkZXNjdWVudG8udmFsKCkpO1xyXG4gICAgICAgIHZhciBzdW1hID0gTnVtYmVyKCRjdW90YS52YWwoKSkgKyBOdW1iZXIoJG1vcmEudmFsKCkpICsgTnVtYmVyKCRleHRyYS52YWwoKSk7XHJcbiAgICAgICAgJHRvdGFsLnZhbChOdW1iZXIoc3VtYSkpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbn1cclxuXHJcbnZhciBEYW1hZ2VzID0ge1xyXG4gIFxyXG4gIGFkZDogZnVuY3Rpb24gKGlkQ2xpZW50ZSkge1xyXG4gICAgdmFyIGZvcm0sIGRlc2NyaXB0aW9uO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKFwiI2EtZGVzY3JpcHRpb25cIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbaWRDbGllbnRlLCBkZXNjcmlwdGlvbl0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX2NsaWVudGU9JyArIGlkQ2xpZW50ZSArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb24gKyBcIiZ0YWJsYT1hdmVyaWFzXCI7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9hZGRcIiwgdHJ1ZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBudWxsLCBmb3JtLCBEYW1hZ2VzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICAgICQoJyNuZXctYXZlcmlhLW1vZGFsJykuZmluZCgnaW5wdXQsdGV4dGFyZWEnKS52YWwoXCJcIik7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhdHVzID0gJChcIiNhdmVyaWFzLXZpZXctbW9kZVwiKS52YWwoKTtcclxuICAgICQoXCIucHJlc2VudGFkb1wiKS50ZXh0KHN0YXR1cyk7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9YXZlcmlhcyZlc3RhZG89XCIgKyBzdGF0dXM7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBmaWxsQXZlcmlhc0xpc3QsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCRpZF9hdmVyaWEpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1hdmVyaWFzJmlkX2F2ZXJpYT1cIiArICRpZF9hdmVyaWE7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIERhbWFnZXMuZ2V0QWxsKTtcclxuICB9XHJcblxyXG59XHJcblxyXG52YXIgSW5zdGFsbGF0aW9ucyA9IHtcclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGF0dXMgPSAkKFwiI2luc3RhbGxhdGlvbnMtdmlldy1tb2RlXCIpLnZhbCgpO1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWluc3RhbGFjaW9uZXMmZXN0YWRvPVwiICsgc3RhdHVzO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIGluaXRHbG9iYWxIYW5kbGVycywgZmlsbEluc3RhbGxhdGlvbnNMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgkaWRfcGFnbykge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWluc3RhbGFjaW9uZXMmaWRfcGFnbz1cIiArICRpZF9wYWdvO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBudWxsLCBmb3JtLCBJbnN0YWxsYXRpb25zLmdldEFsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ2FqYSA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBhbW91bnQsIGRlc2NyaXB0aW9uLCBpc19lbXB0eTtcclxuXHJcbiAgICBhbW91bnQgPSAkKFwiI2NhamEtYS1hbW91bnRcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjY2FqYS1hLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG4gICAgZm9ybSA9IFwiZW50cmFkYT1cIiArIGFtb3VudCArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb24gKyBcIiZ0YWJsYT1jYWphXCI7XHJcbiAgICBpc19lbXB0eSA9IGlzRW1wdHkoW2Ftb3VudCwgZGVzY3JpcHRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvYWRkJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ2FqYS5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZXRpcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBhbW91bnQsIGRlc2NyaXB0aW9uLCBpc19lbXB0eTtcclxuXHJcbiAgICBhbW91bnQgPSAkKFwiI2NhamEtci1hbW91bnRcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjY2FqYS1yLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG4gICAgZm9ybSA9IFwic2FsaWRhPVwiICsgYW1vdW50ICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbjtcclxuICAgIGlzX2VtcHR5ID0gaXNFbXB0eShbYW1vdW50LCBkZXNjcmlwdGlvbl0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvcmV0aXJlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ2FqYS5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jYWphXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRBbGwnLCBmYWxzZSwgbnVsbCwgY2FqYVRhYmxlLnJlZnJlc2gsIGZvcm0sIENhamEuZ2V0U2FsZG8pO1xyXG4gIH0sXHJcblxyXG4gIGdldFNhbGRvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2FqYVwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0b25lJywgZmFsc2UsIG51bGwsIHVwZGF0ZVNhbGRvLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICRkYXRlU2VhcmNoID0gJChcIiNjYWphLWRhdGVcIik7XHJcbiAgICB2YXIgJHVzZXJTZWFyY2ggPSAkKFwiI2NhamEtdXNlclwiKTtcclxuICAgIHZhciBkYXRlID0gKCRkYXRlU2VhcmNoLnZhbCgpKSA/ICRkYXRlU2VhcmNoLnZhbCgpIDogJyUnO1xyXG4gICAgdmFyIHVzZXJJZCA9ICgkdXNlclNlYXJjaC52YWwoKSkgPyAkdXNlclNlYXJjaC52YWwoKSA6ICclJztcclxuXHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2FqYSZpZF9lbXBsZWFkbz1cIiArIHVzZXJJZCArIFwiJmZlY2hhPVwiICsgZGF0ZTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3NlYXJjaCcsIGZhbHNlLCBudWxsLCBjYWphVGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ29tcGFueSA9IHtcclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLFxyXG4gICAgY29tcGFueU5hbWUgPSAkKFwiI2NvbXBhbnktbmFtZVwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlTdGF0ZW1lbnQgPSAkKFwiI2NvbXBhbnktc3RhdGVtZW50XCIpLnZhbCgpLFxyXG4gICAgY29tcGFueVBob25lMSA9IGdldFZhbCgkKFwiI2NvbXBhbnktcGhvbmUxXCIpKSxcclxuICAgIGNvbXBhbnlEaXJlY3Rpb24gPSAkKFwiI2NvbXBhbnktZGlyZWN0aW9uXCIpLnZhbCgpLFxyXG4gICAgY29tcGFueURlc2NyaXB0aW9uID0gJChcIiNjb21wYW55LWRlc2NyaXB0aW9uXCIpLnZhbCgpLFxyXG4gICAgY29tcGFueVBob25lMiA9IGdldFZhbCgkKFwiI2NvbXBhbnktcGhvbmUyXCIpKVxyXG5cclxuICAgIGZvcm0gPSAnbm9tYnJlPScgKyBjb21wYW55TmFtZSArICcmbGVtYT0nICsgY29tcGFueVN0YXRlbWVudCArICcmZGVzY3JpcGNpb249JyArIGNvbXBhbnlEZXNjcmlwdGlvbiArIFwiJmRpcmVjY2lvbj1cIlxyXG4gICAgZm9ybSArPSBjb21wYW55RGlyZWN0aW9uICsgXCImdGVsZWZvbm8xPVwiICsgY29tcGFueVBob25lMSArIFwiJnRlbGVmb25vcz1cIiArIGNvbXBhbnlQaG9uZTIgKyBcIiZ0YWJsYT1lbXByZXNhXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBTZXR0aW5ncyA9IHtcclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLFxyXG4gICAgc2V0dGluZ3NDYXJnb01vcmEgPSAkKFwiI3NldHRpbmdzLW1vcmFcIikudmFsKCksXHJcbiAgICBzZXR0aW5nc0ZlY2hhQ29ydGUgPSAkKFwiI3NldHRpbmdzLWZlY2hhLWNvcnRlXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NSZWNvbmV4aW9uID0gJChcIiNzZXR0aW5ncy1yZWNvbmV4aW9uXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NQZW5hbGl6YWNpb25DYW5jZWxhY2lvbiA9ICQoXCIjc2V0dGluZ3MtcGVuYWxpemFjaW9uLWNhbmNlbGFjaW9uXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NNZXNlc1BvckRlZmVjdG8gPSAkKFwiI3NldHRpbmdzLW1lc2VzLXBvci1kZWZlY3RvXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NTcGxpdERheSA9ICQoXCIjc2V0dGluZ3Mtc3BsaXQtZGF5XCIpLnZhbCgpO1xyXG5cclxuICAgIGZvcm0gPSAnY2FyZ29fbW9yYT0nICsgc2V0dGluZ3NDYXJnb01vcmEgKyAnJmZlY2hhX2NvcnRlPScgKyBzZXR0aW5nc0ZlY2hhQ29ydGUgKyAnJnJlY29uZXhpb249JyArIHNldHRpbmdzUmVjb25leGlvbjtcclxuICAgIGZvcm0gKz0gJyZwZW5hbGl6YWNpb25fY2FuY2VsYWNpb249JyArIHNldHRpbmdzUGVuYWxpemFjaW9uQ2FuY2VsYWNpb24gKyAnJm1lc2VzX3Bvcl9kZWZlY3RvPScgKyBzZXR0aW5nc01lc2VzUG9yRGVmZWN0bztcclxuICAgIGZvcm0gKz0gJyZzcGxpdF9kYXk9JyArIHNldHRpbmdzU3BsaXREYXkgKyAnJnRhYmxhPXNldHRpbmdzJztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIFNlY3Rpb25zID0geyBcclxuICBhZGQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgc3dhbC5zZXREZWZhdWx0cyh7XHJcbiAgICAgIGlucHV0OiAndGV4dCcsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnTmV4dCAmcmFycjsnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBhbmltYXRpb246IGZhbHNlLFxyXG4gICAgICBwcm9ncmVzc1N0ZXBzOiBbJzEnLCAnMicsICczJ11cclxuICAgIH0pXHJcblxyXG4gICAgdmFyIHN0ZXBzID0gW3tcclxuICAgICAgICB0aXRsZTogJ05vbWJyZSBkZWwgc2VjdG9yJ1xyXG4gICAgICB9LFxyXG4gICAgICAnQ29kaWdvIGRlbCBTZWN0b3InLFxyXG4gICAgXVxyXG5cclxuICAgIHN3YWwucXVldWUoc3RlcHMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICBzd2FsLnJlc2V0RGVmYXVsdHMoKVxyXG4gICAgICBzYXZlKHJlc3VsdClcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNhdmUocmVzdWx0KXtcclxuICAgICAgdmFyIGZvcm07XHJcbiAgICAgIHZhciBub21icmUgPSByZXN1bHRbMF07XHJcbiAgICAgIHZhciBjb2RpZ29BcmVhID0gcmVzdWx0WzFdLFxyXG5cclxuICAgICAgZm9ybSA9IFwibm9tYnJlPVwiK25vbWJyZStcIiZjb2RpZ29fYXJlYT1cIitjb2RpZ29BcmVhO1xyXG4gICAgICBmb3JtICs9IFwiJnRhYmxhPXNlY2Npb25lc1wiXHJcbiAgICAgXHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKXtcclxuICAgICAgICAgaWYoY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvYWRkJywgdHJ1ZSwgZmFsc2UsIG51bGwsIGZvcm0sU2VjdGlvbnMuZ2V0QWxsLGhlYXZ5TG9hZCkpe1xyXG4gICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRJcHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGlkID0gJChcIiNzZWxlY3Qtc2VjdG9yXCIpLnZhbCgpO1xyXG4gICAgJCgnLnByaW50LXRhYmxlJykuYXR0cignaHJlZicsIEJBU0VfVVJMICsgJ3Byb2Nlc3MvZ2V0cmVwb3J0L3NlY2Npb25lcy8nICsgaWQpO1xyXG4gICAgXHJcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9aXBzJmlkPVwiICsgaWQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBzZWN0aW9uVGFibGUucmVmcmVzaCwgZm9ybSxudWxsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPXNlY2Npb25lc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIGZpbGxTZWxlY3QsIGZvcm0saGVhdnlMb2FkKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmaWxsU2VsZWN0KGNvbnRlbnQpe1xyXG4gICAgICAkKFwiI3NlbGVjdC1zZWN0b3JcIikuaHRtbChjb250ZW50KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGVJcFN0YXRlOiBmdW5jdGlvbiAoSVApIHtcclxuICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShJUCkgKyAnJmV4dHJhX2luZm89JyArIEpTT04uc3RyaW5naWZ5KHttb2R1bGU6ICdpcCd9KTtcclxuICAgICAgYXhpb3MucG9zdChCQVNFX1VSTCArICdwcm9jZXNzL2F4aW9zdXBkYXRlJywgZm9ybSlcclxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UocmVzLmRhdGEubWVuc2FqZSk7XHJcbiAgICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG52YXIgRXh0cmFzID0ge1xyXG4gIHJlbW92ZTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgaWRfY2xpZW50ZSwgc2VuZDtcclxuICAgIFxyXG4gICAgaWRfY2xpZW50ZSA9ICQoJyNkZXRhaWwtY2xpZW50LWlkJykudmFsKClcclxuICAgIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeSh7aWQ6IGlkLGlkX2NsaWVudGU6IGlkX2NsaWVudGV9KTtcclxuICAgIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2V4dHJhL2RlbGV0ZV9leHRyYScsIGZvcm0pO1xyXG4gICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSk7XHJcbiAgICAgIGV4dHJhVGFibGUucmVmcmVzaChkYXRhLmV4dHJhcyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbn0iLCIgIHZhciBjdXJyZW50UGFnZSA9ICQoXCJ0aXRsZVwiKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xyXG4gIGN1cnJlbnRQYWdlID0gY3VycmVudFBhZ2VbNF0udG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgdmFyIHJhbiA9IGZhbHNlO1xyXG5cclxuICBmdW5jdGlvbiBpbml0Q29tcG9uZW50cygpIHtcclxuICAgIHN3aXRjaCAoY3VycmVudFBhZ2UpIHtcclxuICAgICAgY2FzZSBcImhvbWVcIjpcclxuICAgICAgICBpbml0Q2xpZW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImFkbWluaXN0cmFkb3JcIjpcclxuICAgICAgICBpbml0QWRtaW5IYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiY2xpZW50ZXNcIjpcclxuICAgICAgICBpbml0Q2xpZW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNlcnZpY2lvc1wiOlxyXG4gICAgICAgIGluaXRTZXJ2aWNlc0hhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJudWV2b19jb250cmF0b1wiOlxyXG4gICAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICAgICAgQ29udHJhY3RzLmdldElwTGlzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZGV0YWxsZXNcIjpcclxuICAgICAgICBpbml0UGF5bWVudHNIYW5kbGVycygpO1xyXG4gICAgICAgIGRldGFpbEhhbmRsZXJzKCk7XHJcbiAgICAgICAgaW5pdENvbnRyYWN0SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImNvbnRyYXRvc1wiOlxyXG4gICAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICAgICAgaW5pdENsaWVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzZWNjaW9uZXNcIjpcclxuICAgICAgICBzZWN0aW9uSGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNlY2Npb25lczJcIjpcclxuICAgICAgICBzZWN0aW9uSGFuZGxlcnMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnaGVyZScpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENhamFIYW5kbGVycygpO1xyXG4gICAgaW5pdEdsb2JhbEhhbmRsZXJzKCk7XHJcbiAgfVxyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgZ2xvYmFscyBoYW5kbGVycyAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gIGZ1bmN0aW9uIGluaXRHbG9iYWxIYW5kbGVycygpIHtcclxuXHJcbiAgICB2YXIgYXZlcmlhQ2xpZW50RG5pID0gJChcIiNhLWNsaWVudC1kbmlcIik7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRQYWdlID09ICdub3RpZmljYWNpb25lcycpIHtcclxuICAgICAgR2VuZXJhbHMuY291bnRfdGFibGUoXCJhdmVyaWFzXCIpO1xyXG5cclxuICAgICAgJChcIiNhdmVyaWFzLXZpZXctbW9kZVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIERhbWFnZXMuZ2V0QWxsKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJChcIiNpbnN0YWxsYXRpb25zLXZpZXctbW9kZVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIEluc3RhbGxhdGlvbnMuZ2V0QWxsKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJCgndGJvZHknKS5jc3Moe1xyXG4gICAgICAgIGRpc3BsYXk6IFwidGFibGUtcm93LWdyb3VwXCJcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1cnJlbnRQYWdlID09ICdjb250cmF0b3MnKSB7XHJcbiAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGF2ZXJpYUNsaWVudCA9ICQoXCIjYS1jbGllbnRcIikuc2VsZWN0Mih7XHJcbiAgICAgIGRyb3Bkb3duUGFyZW50OiAkKCcjbmV3LWF2ZXJpYS1tb2RhbCcpLFxyXG4gICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICBhamF4OiB7XHJcbiAgICAgICAgdXJsOiBCQVNFX1VSTCArICdwcm9jZXNzL3NlYXJjaCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBkZWxheTogMjUwLFxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHE6IHBhcmFtcy50ZXJtLFxyXG4gICAgICAgICAgICB0YWJsYTogJ2NsaWVudGVzX3BhcmFfYXZlcmlhcydcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwcm9jZXNzUmVzdWx0czogZnVuY3Rpb24gKGRhdGEsIHBhcmFtcykge1xyXG4gICAgICAgICAgcGFyYW1zLnBhZ2UgPSBwYXJhbXMucGFnZSB8fCAxXHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN1bHRzOiBkYXRhLml0ZW1zLFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgbW9yZTogKHBhcmFtcy5wYWdlICogMzApIDwgZGF0YS50b3RhbF9jb3VudFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYWNoZTogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgICQoXCIjYnRuLXNhdmUtYXZlcmlhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIERhbWFnZXMuYWRkKGF2ZXJpYUNsaWVudC52YWwoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmJ0bi11cGRhdGUtYXZlcmlhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBpZF9hdmVyaWEgPSAkKHRoaXMpLnBhcmVudHMoJy5hdmVyaWEtaXRlbScpLmZpbmQoJy5jb2RlJylcclxuICAgICAgaWRfYXZlcmlhID0gaWRfYXZlcmlhLnRleHQoKS50cmltKCk7XHJcbiAgICAgIERhbWFnZXMudXBkYXRlKGlkX2F2ZXJpYSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmJ0bi11cGRhdGUtaW5zdGFsbGF0aW9uXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBpZF9wYWdvID0gJCh0aGlzKS5wYXJlbnRzKCcuYXZlcmlhLWl0ZW0nKS5maW5kKCcuY29kZScpO1xyXG4gICAgICBpZF9wYWdvID0gaWRfcGFnby50ZXh0KCkudHJpbSgpO1xyXG4gICAgICBJbnN0YWxsYXRpb25zLnVwZGF0ZShpZF9wYWdvKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZXh0cmEtY29udHJvbHNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ29udHJhY3RzLmJ0bkV4dHJhUHJlc3NlZCgkKHRoaXMpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZXh0cmEtY2xpZW50LWRuaVwiKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHZhciBrZXkgPSBlLndoaWNoO1xyXG4gICAgICB2YXIgZG5pID0gJCh0aGlzKS52YWwoKVxyXG4gICAgICBpZiAoa2V5ID09IDEzKSB7XHJcbiAgICAgICAgQ29udHJhY3RzLmdldEFsbE9mQ2xpZW50KGRuaSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICAgICBhZG1pbiBoYW5kbGVycyAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGluaXRBZG1pbkhhbmRsZXJzKCkge1xyXG4gICAgdXNlclRhYmxlLmluaXQoKTtcclxuICAgICQoXCIjYnRuLXNhdmUtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBVc2Vycy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLXVwZGF0ZS11c2VyXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFVzZXJzLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiN1cGRhdGUtY29tcGFueS1kYXRhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ29tcGFueS51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLXVwZGF0ZS1zZXR0aW5nc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIFNldHRpbmdzLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgSW5pdCBjYWphICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gIGZ1bmN0aW9uIGluaXRDYWphSGFuZGxlcnMoKSB7XHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2FkbWluaXN0cmFkb3InKSB7XHJcbiAgICAgIGNhamFUYWJsZS5pbml0KCk7XHJcbiAgICB9XHJcbiAgICB2YXIgYnRuQWRkTW9uZXkgPSAkKFwiI2J0bi1hZGQtbW9uZXlcIik7XHJcbiAgICB2YXIgYnRuUmV0aXJlTW9uZXkgPSAkKFwiI2J0bi1yZXRpcmUtbW9uZXlcIik7XHJcbiAgICB2YXIgdXNlclNlYXJjaCA9ICQoXCIjY2FqYS11c2VyXCIpO1xyXG4gICAgdmFyIGRhdGVTZWFyY2ggPSAkKFwiI2NhamEtZGF0ZVwiKTtcclxuXHJcbiAgICBidG5BZGRNb25leS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDYWphLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYnRuUmV0aXJlTW9uZXkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5yZXRpcmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGVTZWFyY2gub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENhamEuc2VhcmNoKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB1c2VyU2VhcmNoLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDYWphLnNlYXJjaCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgSW5pdCBjbGllbnQgSGFuZGxlcnMgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGluaXRDbGllbnRIYW5kbGVycygpIHtcclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnY2xpZW50ZXMnKSB7XHJcbiAgICAgIGNsaWVudFRhYmxlLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDbGllbnRzLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiN1cGRhdGUtY2xpZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gY2xpZW50VGFibGUuZ2V0SWQoKTtcclxuICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgQ2xpZW50cy5nZXRPbmUoaWQsIENsaWVudHMucmVjZWl2ZUZvckVkaXQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2NsaWVudC1zZWFyY2hlclwiKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgdGV4dCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgIEdlbmVyYWxzLnNlYXJjaCh0ZXh0LCBcImNsaWVudGVzXCIsIGNsaWVudFRhYmxlLnJlZnJlc2gpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjbGllbnQtc2VhcmNoZXItbmV3Y29udHJhY3RcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBpZiAoIWlzRW1wdHkoW3RleHRdKSkge1xyXG4gICAgICAgIEdlbmVyYWxzLnNlYXJjaCh0ZXh0LCBcImNsaWVudGVzXCIsIGNsaWVudFRhYmxlLnJlZnJlc2gpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFyVGJvZHkoXCIubG9iYnktcmVzdWx0c1wiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNkZWxldGUtY2xpZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHJvdyA9IGNsaWVudFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIkRlc2VhIEVsaW1pbmFyIGFsKGxhKSBDbGllbnRlIFwiICsgcm93Lm5vbWJyZXMgKyBcIiBcIiArIHJvdy5hcGVsbGlkb3MgKyBcIj9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgR2VuZXJhbHMuZGVsZXRlUm93KHJvdy5pZCwgXCJjbGllbnRlc1wiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBJbml0IFNlcnZpY2VzIEhhbmRsZXJzICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gaW5pdFNlcnZpY2VzSGFuZGxlcnMoKSB7XHJcbiAgICBzZXJ2aWNlVGFibGUuaW5pdCgpO1xyXG5cclxuICAgICQoXCIjYnRuLXNhdmUtc2VydmljZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBTZXJ2aWNlcy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZGVsZXRlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBzZXJ2aWNlVGFibGUuZ2V0SWQoKTtcclxuICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBFbGltaW5hciAgZWwgU2VydmljaW8/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIEdlbmVyYWxzLmRlbGV0ZVJvdyhpZCwgXCJzZXJ2aWNpb3NcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZWRpdC1zZXJ2aWNlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyIHJvdyA9IHNlcnZpY2VUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG5cclxuICAgICAgJCgnI3Utc2VydmljZS1pZCcpLnZhbChyb3cuaWQpO1xyXG4gICAgICAkKCcjdS1zZXJ2aWNlLW5hbWUnKS52YWwocm93Lm5vbWJyZSk7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtZGVzY3JpcHRpb24nKS52YWwocm93LmRlc2NyaXBjaW9uKTtcclxuICAgICAgJCgnI3Utc2VydmljZS1tb250aGx5LXBheW1lbnQnKS52YWwoTnVtYmVyKHJvdy5tZW5zdWFsaWRhZC5yZXBsYWNlKFwiUkQkIFwiLCAnJykpKTtcclxuICAgICAgJCgnI3Utc2VydmljZS10eXBlJykudmFsKHJvdy50aXBvKTtcclxuICAgICAgJCgnI3VwZGF0ZS1zZXJ2aWNlLW1vZGFsJykubW9kYWwoKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtc2VydmljZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBTZXJ2aWNlcy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjc2VydmljZS1zZWFyY2hlclwiKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgdGV4dCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgIEdlbmVyYWxzLnNlYXJjaCh0ZXh0LCBcInNlcnZpY2lvc1wiLCBzZXJ2aWNlVGFibGUucmVmcmVzaCwgaW5pdFNlcnZpY2VzSGFuZGxlcnMpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgQ29udHJhY3QgSGFuZGxlcnMgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0Q29udHJhY3RIYW5kbGVycygpIHtcclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnY29udHJhdG9zJykge1xyXG4gICAgICBjb250cmFjdFRhYmxlLmluaXQoKTtcclxuICAgICAgQ29udHJhY3RzLmdldEFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLXNhdmUtY29udHJhY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ29udHJhY3RzLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tYWRkLWV4dHJhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ29udHJhY3RzLmNhbGxFeHRyYSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjb250cmFjdC1zZWFyY2hlclwiKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgdGV4dCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgIEdlbmVyYWxzLnNlYXJjaCh0ZXh0LCBcInZfY29udHJhdG9zXCIsIGNvbnRyYWN0VGFibGUucmVmcmVzaCwgbnVsbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1jYW5jZWwtY29udHJhY3QsICNidG4tZGV0YWlsLWNhbmNlbC1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciByb3csIGNhbGxiYWNrXHJcbiAgICAgIGlmIChjdXJyZW50UGFnZSA9PSAnY29udHJhdG9zJykge1xyXG4gICAgICAgIHJvdyA9IGNvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgICBjYWxsYmFjayA9IENvbnRyYWN0cy5nZXRBbGw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcm93ID0gZGV0YWlsc0NvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgICByb3cuaWQgPSByb3cuaWRfY29udHJhdG87XHJcbiAgICAgICAgcm93LmlkX2NsaWVudGUgPSAkKCcjZGF0YWlsLWNsaWVudC1pZCcpLnZhbCgpO1xyXG4gICAgICAgIHJvdy5jbGllbnRlID0gJCgnI2RldGFpbC1jbGllbnQtbmFtZScpLnZhbCgpO1xyXG4gICAgICAgIGNhbGxiYWNrID0gUGF5bWVudHMuY29udHJhY3RSZWZyZXNoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgJChcIi5jYW5jZWwtbmFtZVwiKS50ZXh0KHJvdy5jbGllbnRlKTtcclxuICAgICAgICB2YXIgJGlucHV0RWxlbWVudCA9ICQoXCIuY29uZmlybWVkLWRhdGFcIik7XHJcbiAgICAgICAgdmFyICRidXR0b25Ub0FjdGl2ZSA9ICQoXCIjY2FuY2VsLXBlcm1hbmVudGx5XCIpO1xyXG5cclxuICAgICAgICBkZWxldGVWYWxpZGF0aW9uKCRpbnB1dEVsZW1lbnQsIHJvdy5jbGllbnRlLCAkYnV0dG9uVG9BY3RpdmUpO1xyXG4gICAgICAgICQoXCIjY2FuY2VsLXByaW50XCIpLmF0dHIoXCJocmVmXCIsIEJBU0VfVVJMICsgJ3Byb2Nlc3MvZ2V0Y2FuY2VsY29udHJhY3QvJyArIHJvdy5pZCk7XHJcblxyXG4gICAgICAgICQoXCIjY2FuY2VsLWNvbnRyYWN0LW1vZGFsXCIpLm1vZGFsKCk7XHJcblxyXG4gICAgICAgICRidXR0b25Ub0FjdGl2ZS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIENvbnRyYWN0cy5jYW5jZWwocm93LCBjYWxsYmFjaylcclxuICAgICAgICAgICRidXR0b25Ub0FjdGl2ZS5hdHRyKCdkaXNhYmxlJyk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJGlucHV0RWxlbWVudC52YWwoJycpO1xyXG4gICAgICAgICQoJyNjYW5jZWwtY29udHJhY3QtbW9kYWwgLmFsZXJ0JykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAkYnV0dG9uVG9BY3RpdmUuYXR0cignZGlzYWJsZWQnLCAnJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcIkRlYmVzIHNlbGVjY2lvbmFyIHVuIGNvbnRyYXRvXCIpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLXN1c3BlbmQtY29udHJhY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgcm93ID0gY29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBTdXNwZW5kZXIgZWwgY29udHJhdG8gZGUgXCIgKyByb3cuY2xpZW50ZSArIFwiID9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybycsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBDb250cmFjdHMuc3VzcGVuZChyb3cuaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3YWwoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIGNvbnRyYXRvXCIpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLXVwZGF0ZS1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBpZCA9IGNvbnRyYWN0VGFibGUuZ2V0SWQoKTtcclxuICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgQ29udHJhY3RzLmdldE9uZShpZCwgQ29udHJhY3RzLnJlY2lldmUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3NlbGVjdC1jb250cmFjdC1zZWN0b3JcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRJcExpc3QoKTtcclxuICAgIH0pXHJcblxyXG4gICAgJCgnI3NlbGVjdC1wYXktdW50aWwnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyICR0aGlzID0gJCgnI3NlbGVjdC1wYXktdW50aWwgOnNlbGVjdGVkJyk7XHJcbiAgICAgIHZhciBjb250cmFjdElkID0gJHRoaXMuYXR0cignZGF0YS1jb250cmFjdCcpO1xyXG4gICAgICB2YXIgbGFzdFBheW1lbnRJZCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgIFBheW1lbnRzLnVwZGF0ZVVudGlsKGNvbnRyYWN0SWQsIGxhc3RQYXltZW50SWQpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgSW5pdCBQYXltZW50cyAgSGFuZGxlcnMgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICBmdW5jdGlvbiBpbml0UGF5bWVudHNIYW5kbGVycygpIHtcclxuICAgIHBheW1lbnRUYWJsZS5pbml0KCk7XHJcbiAgICBleHRyYVRhYmxlLmluaXQoKTtcclxuICAgIGlmICghcmFuKSB7XHJcbiAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgICByYW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLXBheVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBwYXltZW50VGFibGUuZ2V0SWQoKTtcclxuICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgUGF5bWVudHMudXBkYXRlKGlkKTtcclxuICAgICAgICB1cGRhdGVfbW9kZShpZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVE9ETzogTUVTU0FHRSBTZWxlY3QgYSBwYXltZW50XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBQYXltZW50cy5nZXRBbGwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjcGF5bWVudC1kZXRhaWwtYm94XCIpLmNvbGxhcHNlKClcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVfbW9kZShpZCkge1xyXG4gICAgICB2YXIgbW9kZSA9ICQoJy5wYXltZW50LW1vZGUuc2VsZWN0ZWQnKS50ZXh0KCk7XHJcbiAgICAgIHZhciBleHRyYUluZm8gPSB7XHJcbiAgICAgICAgaWQ6IGlkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgbW9kdWxlOiAncGFnb3MnXHJcbiAgICAgIH1cclxuICAgICAgdmFyIGZvcm0gPSAnZGF0YT0nICsgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIHRpcG86IG1vZGVcclxuICAgICAgfSkgKyAnJmV4dHJhX2luZm89JyArIEpTT04uc3RyaW5naWZ5KGV4dHJhSW5mbyk7XHJcblxyXG4gICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAncHJvY2Vzcy9heGlvc3VwZGF0ZScsIGZvcm0pXHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAvL1RPRE86IHNvbWV0aGluZyB3aGl0aCB0aGF0IC8gYWxnbyBjb24gZXN0b1xyXG4gICAgICB9KTtcclxuICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgIGRldGFpbCBIYW5kbGVycyAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGRldGFpbEhhbmRsZXJzKCkge1xyXG5cclxuICAgIHZhciAkY2xpZW50TmFtZSA9ICQoJyNkZXRhaWwtY2xpZW50LW5hbWUnKTtcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLW9ic2VydmF0aW9uc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBQYXltZW50cy5zYXZlQWJvbm9zKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjYnRuLXNhdmUtcmVhbC1vYnNlcnZhdGlvbnMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDbGllbnRzLnNhdmVPYnNlcnZhdGlvbnMoKTtcclxuICAgIH0pXHJcblxyXG4gICAgZGV0YWlsc0NvbnRyYWN0VGFibGUuaW5pdCgpO1xyXG5cclxuICAgICQoXCIjYnRuLWRldGFpbC1zdXNwZW5kLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHJvdyA9IGRldGFpbHNDb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIkRlc2VhIFN1c3BlbmRlciBlbCBjb250cmF0byBkZSBcIiArICRjbGllbnROYW1lLnZhbCgpICsgXCIgP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIENvbnRyYWN0cy5zdXNwZW5kKHJvdy5pZF9jb250cmF0bywgUGF5bWVudHMuY29udHJhY3RSZWZyZXNoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFwiRGViZSBzZWxlY2Npb25hciB1biBjb250cmF0b1wiKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1jYWxsLXJlY29ubmVjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXHJcbiAgICAgIHZhciByb3cgPSBkZXRhaWxzQ29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgJChcIiNyZWNvbm5lY3QtbW9kYWxcIikubW9kYWwoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFwiRGViZSBzZWxlY2Npb25hciB1biBjb250cmF0byBwcmltZXJvXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgICQoXCIjYnRuLXJlY29ubmVjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXHJcbiAgICAgIHZhciByb3cgPSBkZXRhaWxzQ29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgQ29udHJhY3RzLnJlY29ubmVjdChyb3cuaWRfY29udHJhdG8sIFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgJCgnI2J0bi1jYWxsLWV4dHJhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgY29udGV4dCA9ICdkZXRhaWxzJztcclxuICAgICAgQ29udHJhY3RzLmNhbGxFeHRyYShjb250ZXh0KTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZWN0aW9uSGFuZGxlcnMoKSB7XHJcbiAgICBpZiAoIXJhbikge1xyXG4gICAgICBzZWN0aW9uVGFibGUuaW5pdCgpO1xyXG4gICAgICBTZWN0aW9ucy5nZXRJcHMoKTtcclxuICAgICAgcmFuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1hZGQtc2VjdGlvblwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VjdGlvbnMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3NlbGVjdC1zZWN0b3JcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFNlY3Rpb25zLmdldElwcygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAkKGZ1bmN0aW9uICgpIHtcclxuICAgIGluaXRDb21wb25lbnRzKClcclxuICB9KTsiLCJ2YXIgcmFuID0gZmFsc2U7XHJcblxyXG5mdW5jdGlvbiBsb2dpbkhhbmRsZXJzKCkge1xyXG5cclxuICAkKFwiI3NlbmQtY3JlZGVudGlhbHNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBTZXNzaW9uLmxvZ2luKCk7XHJcbiAgfSk7XHJcblxyXG4gICQoXCIjdXNlci1pbnB1dFwiKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgbG9naW5MaWJyYXJ5LnNlbmRUb0xvZ2luKGUpXHJcbiAgfSlcclxuXHJcbiAgJChcIiNwYXNzd29yZC1pbnB1dFwiKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgbG9naW5MaWJyYXJ5LnNlbmRUb0xvZ2luKGUpXHJcbiAgfSlcclxuXHJcbiAgJChcImFbaHJlZl1cIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgbG9naW5MaWJyYXJ5LmxvYWRpbmcoKTtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgdGFyZ2V0ID0gJHRoaXMuYXR0cigndGFyZ2V0Jyk7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCAzMDAwKVxyXG4gICAgfWNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvclxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbnZhciBTZXNzaW9uID0ge1xyXG4gIGxvZ2luOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB1c2VyICAgICA9ICQoXCIjdXNlci1pbnB1dFwiKS52YWwoKTtcclxuICAgIHZhciBwYXNzd29yZCA9ICQoXCIjcGFzc3dvcmQtaW5wdXRcIikudmFsKCk7XHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFt1c2VyLCBwYXNzd29yZF0pXHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIHZhciBmb3JtID0gJ3VzZXI9JyArIHVzZXIgKyAnJnBhc3N3b3JkPScgKyBwYXNzd29yZDtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ2FwcC9sb2dpbicsIGZhbHNlLCBmYWxzZSwgU2Vzc2lvbi5wcm9jZXNzTG9naW5EYXRhLCBmb3JtLCBudWxsLCBsb2dpbkxpYnJhcnkubG9hZGluZylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfRVJST1IgKyBcIiBMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIGluZGljYWRvcyBwYXJhIGluZ3Jlc2FyXCIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcHJvY2Vzc0xvZ2luRGF0YTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgIGlmIChyZXNwb25zZSA9PSB0cnVlKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gQkFTRV9VUkwgKyAnYXBwL2FkbWluLyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKFwiLmxvYWRlclwiKS5jc3Moe1xyXG4gICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXHJcbiAgICAgIH0pO1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0lORk8gKyBcIiBVc3VhcmlvIHkgQ29udHJhc2XDsWEgbm8gdmFsaWRvc1wiKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG52YXIgbG9naW5MaWJyYXJ5ID0ge1xyXG4gIGxvYWRpbmc6IGZ1bmN0aW9uKHN0b3ApIHtcclxuICAgIGlmKCFzdG9wKXtcclxuICAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogXCJibG9ja1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgXHJcbiAgc2VuZFRvTG9naW46IGZ1bmN0aW9uKGUpIHtcclxuICAgIGtleSA9IGUud2hpY2hcclxuICAgIGlmIChrZXkgPT0gMTMpIHtcclxuICAgICAgU2Vzc2lvbi5sb2dpbigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgbG9naW5IYW5kbGVycygpO1xyXG59KSJdfQ==
