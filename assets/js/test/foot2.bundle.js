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

    $(".delete-user").on('click', function (e) {
      e.preventDefault();
      var $row = $(this).parents("tr");
      var id = $row.find('.user-id').text().trim();
      var row = userTable.getRow(id);
      swal({
        title: 'Está Seguro?',
        text: "Desea Eliminar al Usuario " + row.nombres + " " + row.apellidos + "?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Estoy Seguro!',
        cancelButtonText: 'Cancelar'
      }).then(function () {
        Users.delete(id);
      });
    });

    $(".edit-user").on('click', function (e) {
      e.preventDefault();
      var id = $(this).attr('data-user-id');
      var row = userTable.getRow(id);


      $("#e-nickname").val(row.nick);
      $("#e-name").val(row.nombres);
      $("#e-lastname").val(row.apellidos);
      $("#e-dni").val(row.cedula);
      $("#e-type").val(row.tipo_codigo);
      $('#update-user-modal').modal();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbHMuanMiLCJiYXNlLmpzIiwiY29udHJvbGxlcnMuanMiLCJhamF4LmpzIiwiYWpheDIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3NkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcGpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZm9vdDIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEJBU0VfVVJMID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIFwiL1wiO1xyXG5pZihCQVNFX1VSTC5pbmNsdWRlcyhcImxvY2FsaG9zdFwiKSB8fCBCQVNFX1VSTC5pbmNsdWRlcygnbmdyb2suaW8nKSl7XHJcbiAgQkFTRV9VUkwgKz0gJ2ljcGF5bWVudC8nO1xyXG59XHJcblxyXG52YXIgTUVTU0FHRV9TVUNDRVNTID0gJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5kb25lX2FsbDwvaT4nO1xyXG52YXIgTUVTU0FHRV9FUlJPUiAgID0gJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5lcnJvcl9vdXRsaW5lPC9pPic7XHJcbnZhciBNRVNTQUdFX0lORk8gICAgPSAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmluZm9fb3V0bGluZTwvaT4nO1xyXG52YXIgU1VNTUVSX1NLWSAgICAgID0gJyMxRkExRDAnXHJcbnRyeSB7XHJcbiAgdmFyIGJ1c0F2ZXJpYSAgICAgICA9IG5ldyBWdWUoKTtcclxufSBjYXRjaChlcnIpIHtcclxuICBkaXNwbGF5TWVzc2FnZSgnIG5vIHZ1ZScpO1xyXG59XHJcblxyXG4vKipcclxuICogQ29ubmVjdCBBbmQgU2VuZFxyXG4gKiBDb25lY3RhIGFsIHNlcnZpZG9yIHZpYSBhamF4IHkgbXVlc3RyYSBlbCBtZW5zYWplIGRlIHJlc3B1ZXN0YVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVybCBhIGRvbmRlIHNlIHZhIGEgbWFuZGFyIGxhIGVsIGZvcm11bGFyaW8sIHNpbiBsYSBiYXNlX3VybFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzX21lc3NhZ2UgU2kgc2UgZXNwZXJhIHVuIG1lbnNhamUgbyBubyBjb21vIHJlc3B1ZXN0YSBcclxuICogQHBhcmFtIHtjYWxsYmFja30gcmVjb2duaXplRWxlbWVudHMgRnVuY2lvbiBwYXJhIHJlY29ub2NlciBsb3MgZWxlbWVudG9zIGF1dG9nZW5lcmFkb3NcclxuICogQHBhcmFtIHs/Y2FsbGJhY2t9IGFjdGlvbiBjYWxsYmFjayBxdWUgcmVjaWJlIGxvcyBkYXRvcyBkZXNkZSBlbCBzZXJ2aWRvciBwYXJhIGhhY2VyIGFsZ28gY29uIGVsbG9zXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtIGZvcm11bGFyaW8gYSBzZXIgZW52aWFkbyBhbCBzZXJ2aWRvclxyXG4gKiBAcGFyYW0ge2NhbGxiYWNrfSBjYWxsYmFjayBmdW5jaW9uIGEgc2VyIGVqZWN1dGFkYSBkZXNwdWVzIHF1ZSB0b2RvIHNlIGN1bXBsYSwgY29tbyBnZXQgdXNlcnNcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gbG9hZGluZyBmdW5jdGlvbiBmb3IgbG9hZGluZ1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGNvbm5lY3RBbmRTZW5kKHVybCxpc19tZXNzYWdlLHJlY29nbml6ZUVsZW1lbnRzLGFjdGlvbixmb3JtLGNhbGxiYWNrLGxvYWRpbmcpe1xyXG4gIGlmKCFsb2FkaW5nKSBsb2FkaW5nID0gbGluZUxvYWRcclxuICB2YXIgY29ubmVjdCA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA/IG5ldyBYTUxIdHRwUmVxdWVzdCgpIDogbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7IFxyXG4gICAgY29ubmVjdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY29ubmVjdC5yZWFkeVN0YXRlID09IDQgJiYgY29ubmVjdC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICBpZihsb2FkaW5nKWxvYWRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICBpZiAoYWN0aW9uICE9IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgYWN0aW9uKGNvbm5lY3QucmVzcG9uc2VUZXh0LHJlY29nbml6ZUVsZW1lbnRzKTsgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZihpc19tZXNzYWdlKXtcclxuICAgICAgICAgICAgICBkaXNwbGF5TWVzc2FnZShjb25uZWN0LnJlc3BvbnNlVGV4dCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKGNhbGxiYWNrICE9IG51bGwpY2FsbGJhY2soKTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBlbHNlIGlmIChjb25uZWN0LnJlYWR5U3RhdGUgIT0gNCkge1xyXG4gICAgICAgICAgaWYobG9hZGluZylsb2FkaW5nKGZhbHNlKTsgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29ubmVjdC5vcGVuKFwiUE9TVFwiLEJBU0VfVVJMICsgdXJsLCB0cnVlKTtcclxuICAgIGNvbm5lY3Quc2V0UmVxdWVzdEhlYWRlcihcImNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcclxuICAgIGNvbm5lY3Quc2VuZChmb3JtKTtcclxufVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgIEZ1bmNpb25lcyBkZSBtZW5zYWplcyB5IG5vdGlmaWNhY2lvbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbi8qKlxyXG4gKiBEaXNwbGF5IE1lc3NhZ2VcclxuICogTXVlc3RyYSB1bmEgbm90aWZpY2FjaW9uIGRlbCByZXN1bHRhZG8gZGUgbGEgY29uc3VsdGFcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2Ugc3RyaW5nIHRvIGJlIGRpc3BsYXllZCBcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5TWVzc2FnZShtZXNzYWdlKXtcclxuICB2YXIgY29sb3IgPSBcInJnYmEoMTAyLDE4NywxMDYsMSlcIjtcclxuICB2YXIgdG9hc3Qsc3BhbjtcclxuXHJcbiAgICBpZihtZXNzYWdlLmluY2x1ZGVzKE1FU1NBR0VfRVJST1IpKXtcclxuICAgICAgY29sb3IgPSBcInJnYmEoMjQ0LDY3LDU0LDEpXCI7XHJcbiAgICB9ZWxzZSBpZihtZXNzYWdlLmluY2x1ZGVzKE1FU1NBR0VfSU5GTykpe1xyXG4gICAgICBjb2xvciA9IFwicmdiYSgyLDEzNiwyMDksMSlcIjtcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdCA9ICQoXCIudG9hc3RcIilcclxuICAgIHNwYW4gPSB0b2FzdC5maW5kKFwic3BhblwiKS5odG1sKG1lc3NhZ2UpO1xyXG4gICAgc3Bhbi5jc3Moe2JhY2tncm91bmQ6Y29sb3J9KTtcclxuICAgIHRvYXN0LmNzcyh7ZGlzcGxheTpcImZsZXhcIn0pO1xyXG4gICAgXHJcbiAgICB0b2FzdC5hbmltYXRlKHtvcGFjaXR5OlwiMVwifSw1MDAsZnVuY3Rpb24oKXtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICB0b2FzdC5hbmltYXRlKHtvcGFjaXR5OlwiMFwifSk7XHJcbiAgICAgICAgdG9hc3QuY3NzKHtkaXNwbGF5Olwibm9uZVwifSk7XHJcbiAgICAgIH0sIDIwMDApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlBbGVydCh0aXRsZSxtZXNzYWdlLHR5cGUpe1xyXG4gIGlmKCF0aXRsZSkgdGl0bGUgPSBcIlJldmlzZVwiO1xyXG4gIGlmKCFtZXNzYWdlKSBtZXNzYWdlID0gXCJBc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBjYW1wb3NcIlxyXG4gIGlmKCF0eXBlKSB0eXBlID0gXCJlcnJvclwiXHJcbiAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgdGV4dDogbWVzc2FnZSxcclxuICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiAnYnRuJyxcclxuICAgICAgYnV0dG9uc1N0eWxpbmc6IGZhbHNlXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogICAgICAgIGZ1Y25pb25lcyBwYXJhIExsZW5hciB0YWJsYXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBMbGVuYSBsYSB0YWJsYSBhY3R1YWwgY29uIGxvcyBkYXRvcyBxdWUgdmllbmVuIGRlbCBzZXJ2aWRvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gJGNvbnRlbnQgRWwgaHRtbCBjb24gbG9zIGRhdG9zIGEgc2VyIG1vc3RyYWRvcywgdmllbmVuIHNpZW1wcmUgZGVzZGUgZWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgRWwgY2FsbGJhY2sgcGFyYSByZWNvbm9jZXIgYSBsb3MgbnVldm9zIGl0ZW1zXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ3VycmVudFRhYmxlKCRjb250ZW50LGNhbGxiYWNrLHRhYmxlSUQpe1xyXG4gIHZhciAkdGFibGVcclxuICAkKFwiaHRtbFwiKS5yZW1vdmVDbGFzcyhcImdyX19pY3BheW1lbnQtc29mdF9jb21cIilcclxuICBpZih0YWJsZUlEICE9IHVuZGVmaW5lZCl7XHJcbiAgICAkdGFibGUgPSAkKCcjJyt0YWJsZUlEICsgXCIgdGJvZHlcIik7XHJcbiAgfWVsc2V7XHJcbiAgICAkdGFibGUgPSAkKCdbY2xhc3MqPVwidC1cIl0gdGJvZHknKTtcclxuICB9XHJcbiAgJHRhYmxlLmh0bWwoJGNvbnRlbnQpO1xyXG4gIGlmKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG59XHJcblxyXG4vKipcclxuICogTGxlbmEgbGEgdGFibGEgY2xpZW50ZXMgdXRpbGl6YW5kbyBsYSBmdW5jaW9uIGZpbGxDdXJyZW50VGFibGUgcGFzYW5kb2xlIGxhIHRhYmxhIGNsaWVudGVzIGNvbW8gdmFsb3JcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbmZ1bmN0aW9uIGZpbGxDbGllbnRUYWJsZSgkY29udGVudCxjYWxsYmFjayl7XHJcbiAgZmlsbEN1cnJlbnRUYWJsZSgkY29udGVudCxjYWxsYmFjayxcInQtY2xpZW50c1wiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExsZW5hIGxhIHRhYmxhIGNhamEgdXRpbGl6YW5kbyBsYSBmdW5jaW9uIGZpbGxDdXJyZW50VGFibGUgcGFzYW5kb2xlIGxhIHRhYmxhIGNsaWVudGVzIGNvbW8gdmFsb3JcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbmZ1bmN0aW9uIGZpbGxDYWphVGFibGUoJGNvbnRlbnQsY2FsbGJhY2spe1xyXG4gIGZpbGxDdXJyZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2ssXCJjYWphXCIpO1xyXG4gIGlmKGNhbGxiYWNrKWNhbGxiYWNrKCk7XHJcbn1cclxuLyoqXHJcbiAqIExsZW5hIGxhIExpc3RhIGRlIHBhZ29zL25vdGlmaWNhY2lvbmVzIGNvbiBsb3MgZGF0b3MgcXVlIHZpZW5lbiBkZWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtzdHJpbmd9ICRjb250ZW50IEVsIGh0bWwgY29uIGxvcyBkYXRvcyBhIHNlciBtb3N0cmFkb3MsIHZpZW5lbiBzaWVtcHJlIGRlc2RlIGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEVsIGNhbGxiYWNrIHBhcmEgcmVjb25vY2VyIGEgbG9zIG51ZXZvcyBpdGVtc1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGZpbGxQYXltZW50c0xpc3QoJGNvbnRlbnQsY2FsbGJhY2spe1xyXG4gIHZhciAkY29udGFpbmVyID0gJChcIi5saXN0LW5leHRwYXltZW50c1wiKTtcclxuICAkY29udGFpbmVyLmh0bWwoJGNvbnRlbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWxsQXZlcmlhc0xpc3QoJGNvbnRlbnQsY2FsbGJhY2spe1xyXG4gIHZhciAkY29udGFpbmVyID0gJChcIiNhdmVyaWFzLWxpc3RcIik7XHJcbiAgJGNvbnRhaW5lci5odG1sKCRjb250ZW50KTtcclxuICBidXNBdmVyaWEuJGVtaXQoJ3RpY2tldHMtbGlzdGVkJywxKTtcclxuICBjYWxsYmFjaygpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbEluc3RhbGxhdGlvbnNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIjaW5zdGFsbGF0aW9ucy1saXN0XCIpO1xyXG4gICRjb250YWluZXIuaHRtbCgkY29udGVudCk7XHJcbiAgY2FsbGJhY2soKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUNvbnRyYWN0TGlzdChyZXNwb25zZSxjYWxsYmFjayl7XHJcbiAgaWYocmVzcG9uc2UgIT0gXCJuYWRhXCIpe1xyXG4gICAgdmFyIGNvbnRyYWN0cyA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG4gICAgdmFyIHZhbHVlLHNlcnZpY2UsZXF1aXBtZW50LGVNYWMscm91dGVyLHJNYWMsY29kZTtcclxuICAgIHZhciBzZWxlY3RDb250cmFjdCA9ICQoXCIjZXh0cmEtY2xpZW50LWNvbnRyYWN0XCIpO1xyXG4gICAgdmFyIGVsZW1lbnQgPSBcIjxvcHRpb24gdmFsdWU9Jyc+LS1TZWxlY2Npb25hLS08L29wdGlvbj5cIjtcclxuICAgIHZhciBjbGllbnRlID0gY29udHJhY3RzLmNsaWVudGU7XHJcbiAgICB2YXIgY29udHJhY3RJZCA9ICcnXHJcbiAgICBpZihjdXJyZW50UGFnZSAhPSAnZGV0YWxsZXMnICYmIGN1cnJlbnRQYWdlICE9ICdob21lJyl7XHJcbiAgICAgIGNvbnRyYWN0SWQgPSBjb250cmFjdFRhYmxlLmdldElkKCk7XHJcbiAgICB9ZWxzZSBpZiggY3VycmVudFBhZ2UgIT0gJ2hvbWUnKXtcclxuICAgICAgY29udHJhY3RJZCA9IGRldGFpbHNDb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCkuaWRfY29udHJhdG9cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRyYWN0cy5jb250cmF0b3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFsdWUgICAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcImlkX2NvbnRyYXRvXCJdO1xyXG4gICAgICBzZXJ2aWNlICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wic2VydmljaW9cIl07XHJcbiAgICAgIGVxdWlwbWVudCA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJub21icmVfZXF1aXBvXCJdO1xyXG4gICAgICByb3V0ZXIgICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wicm91dGVyXCJdO1xyXG4gICAgICBlTWFjICAgICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wibWFjX2VxdWlwb1wiXTtcclxuICAgICAgck1hYyAgICAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcIm1hY19yb3V0ZXJcIl07XHJcbiAgICAgIGNvZGUgICAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcImNvZGlnb1wiXTtcclxuICAgICAgZWxlbWVudCArPSBcIjxvcHRpb24gdmFsdWU9J1wiICsgdmFsdWUgKyBcIicgZGF0YS1zZXJ2aWNlPSdcIitzZXJ2aWNlK1wiJyAgZGF0YS1lcXVpcG1lbnQ9J1wiK2VxdWlwbWVudCtcIicgIGRhdGEtZS1tYWM9J1wiK2VNYWMrXCInXCI7XHJcbiAgICAgIGVsZW1lbnQgKz0gXCIgZGF0YS1yb3V0ZXI9J1wiK3JvdXRlcitcIicgIGRhdGEtci1tYWM9J1wiK3JNYWMrXCInIGRhdGEtY29kZT0nXCIrY29kZStcIic+XCI7XHJcbiAgICAgIGVsZW1lbnQgKz0gdmFsdWUgK1wiPC9vcHRpb24+XCI7ICBcclxuICAgIH1cclxuICAgIHNlbGVjdENvbnRyYWN0Lmh0bWwoZWxlbWVudCk7XHJcbiAgICBzZWxlY3RDb250cmFjdC52YWwoY29udHJhY3RJZCkuY2hhbmdlKCk7XHJcbiAgICAkKFwiI2V4dHJhLWNsaWVudC1uYW1lXCIpLnZhbChjbGllbnRlWydub21icmVzJ10gKyBcIiBcIiArIGNsaWVudGVbJ2FwZWxsaWRvcyddKTtcclxuXHJcbiAgfWVsc2V7XHJcbiAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0VSUk9SICsgXCIgRXN0ZSBjbGllbnRlIG5vIGV4aXN0ZSByZXZpc2Ugc3UgY2VkdWxhIHBvciBmYXZvclwiKTtcclxuICB9IFxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhclRib2R5KG9iamVjSWQpe1xyXG4gICQob2JqZWNJZCkuaHRtbChcIlwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVBheW1lbnRMaXN0KHJlc3BvbnNlLGNhbGxiYWNrKXtcclxuICB2YXIgc2VsZWN0UGF5VW50aWwgPSAkKCcjc2VsZWN0LXBheS11bnRpbCcpO1xyXG4gIHNlbGVjdFBheVVudGlsLmh0bWwocmVzcG9uc2UpO1xyXG4gIHNlbGVjdFBheVVudGlsLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgc2VsZWN0UGF5VW50aWwuY2hhbmdlKCk7XHJcbiAgaWYoY2FsbGJhY2spY2FsbGJhY2soKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBpc0VtcHR5XHJcbiAqIFZlcmlmaWNhIHNpIGxvcyB2YWxvcmVzIGRhZG9zIGVzdGFuIHZhY2lvcyBvIHNvbiBudWxvcyBcclxuICogQHBhcmFtIHtBcnJheS4gPCBzdHJpbmd9IHZhbHVlc1xyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZXMsaXNfbnVtKXtcclxuICBmb3IodmFyIGkgPSAwIDsgaSA8IHZhbHVlcy5sZW5ndGggOyBpKyspe1xyXG4gICAgaWYgKHZhbHVlc1tpXSA9PSBudWxsIHx8IHZhbHVlc1tpXSA9PSBcIlwiKXtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IFxyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTYWxkbyhtb25leSl7XHJcbiAgbW9uZXkgPSBcIlJEJCBcIisgQ3VycmVuY3lGb3JtYXQobW9uZXkpXHJcbiAgJChcIi5jdXJyZW50LXNhbGRvXCIpLnRleHQobW9uZXkpO1xyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZUNvdW50KCRjb250ZW50KXtcclxuICAkKFwiLnRvdGFsLXJvd3NcIikuaHRtbCgkY29udGVudCk7XHJcbn1cclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VyIHBhc3N3b3JkcyB2YWxpZGF0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbi8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vL1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVNb2RhbCgkbW9kYWxJZCl7XHJcbiAgdmFyICR1c2VyUGFzc3dvcmQgPSAkKCRtb2RhbElkKycgLnBhc3N3b3JkJyk7XHJcbiAgdmFyICR1c2VyUGFzc3dvcmRDb25maXJtID0gJCgkbW9kYWxJZCsnIC5wYXNzd29yZC1jb25maXJtJyk7XHJcbiAgdmFyICRzYXZlQnV0dG9uID0gJCgkbW9kYWxJZCsnIC5zYXZlJyk7XHJcbiAgXHJcbiAgJHVzZXJQYXNzd29yZENvbmZpcm0ub24oJ2JsdXIga2V5dXAnLGZ1bmN0aW9uKCl7XHJcbiAgICB2YWxpZGF0ZVR3bygkdXNlclBhc3N3b3JkLCR1c2VyUGFzc3dvcmRDb25maXJtLCRzYXZlQnV0dG9uKTtcclxuICB9KTtcclxuICAkc2F2ZUJ1dHRvbi5vbignY2xpY2snLGNsZWFyRm9ybSgkbW9kYWxJZCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVR3bygkZmlyc3RPYmplY3QsJHNlY29uZE9iamVjdCwkYnV0dG9uKXtcclxuICAgIGlmKCRzZWNvbmRPYmplY3QudmFsKCkgPT0gJGZpcnN0T2JqZWN0LnZhbCgpICYmICRzZWNvbmRPYmplY3QudmFsKCkgIT0gXCJcIil7XHJcbiAgICAgIHJlcGxhY2VDbGFzcygkZmlyc3RPYmplY3QucGFyZW50KCksXCJoYXMtZXJyb3JcIixcImhhcy1zdWNjZXNzXCIpO1xyXG4gICAgICByZXBsYWNlQ2xhc3MoJHNlY29uZE9iamVjdC5wYXJlbnQoKSxcImhhcy1lcnJvclwiLFwiaGFzLXN1Y2Nlc3NcIik7XHJcbiAgICAgICRidXR0b24ucmVtb3ZlQXR0cihcImRpc2FibGVkXCIsXCJcIik7XHJcblxyXG4gICAgfWVsc2V7XHJcbiAgICAgICByZXBsYWNlQ2xhc3MoJGZpcnN0T2JqZWN0LnBhcmVudCgpLFwiaGFzLXN1Y2Nlc3NcIixcImhhcy1lcnJvclwiKTtcclxuICAgICAgIHJlcGxhY2VDbGFzcygkc2Vjb25kT2JqZWN0LnBhcmVudCgpLFwiaGFzLXN1Y2Nlc3NcIixcImhhcy1lcnJvclwiKTtcclxuICAgICAgICRidXR0b24uYXR0cihcImRpc2FibGVkXCIsXCJcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlVGhpcygpe1xyXG4gIHZhciAkdXNlclBhc3N3b3JkID0gJCgnLnBhc3N3b3JkJyk7XHJcbiAgdmFyICR1c2VyUGFzc3dvcmRDb25maXJtID0gJCgnLnBhc3N3b3JkLWNvbmZpcm0nKTtcclxuICB2YXIgJHNhdmVCdXR0b24gPSAkKCcuc2F2ZScpO1xyXG4gIFxyXG4gICR1c2VyUGFzc3dvcmQub24oJ2JsdXIga2V5dXAnLGZ1bmN0aW9uKCl7XHJcbiAgICB2YWxpZGF0ZVR3bygkdXNlclBhc3N3b3JkLCR1c2VyUGFzc3dvcmRDb25maXJtLCRzYXZlQnV0dG9uKTtcclxuICB9KTtcclxuICAkdXNlclBhc3N3b3JkQ29uZmlybS5vbignYmx1ciBrZXl1cCcsZnVuY3Rpb24oKXtcclxuICAgIHZhbGlkYXRlVHdvKCR1c2VyUGFzc3dvcmQsJHVzZXJQYXNzd29yZENvbmZpcm0sJHNhdmVCdXR0b24pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckZvcm0obW9kYWxJZCl7XHJcbiAgJChtb2RhbElkICsgXCIgaW5wdXRcIikudmFsKFwiXCIpO1xyXG59XHJcbmZ1bmN0aW9uIGRlbGV0ZVZhbGlkYXRpb24oJGlucHV0RWxlbWVudCwgdGV4dCwgJGJ1dHRvblRvQWN0aXZlKXtcclxuICB2YXIgaW5uZXJUZXh0O1xyXG4gIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgdmFyIHNlbGYgID0gdGhpcztcclxuICB2YXIgd2FybmluZyA9ICQoJyNjYW5jZWwtY29udHJhY3QtbW9kYWwgLmFsZXJ0Jyk7XHJcblxyXG4gICRpbnB1dEVsZW1lbnQub24oXCJrZXl1cFwiLGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIGlubmVyVGV4dCA9ICQodGhpcykudmFsKCkgXHJcbiAgICBpZihpbm5lclRleHQudG9Mb3dlckNhc2UoKSA9PSBzZWxmLnRleHQudG9Mb3dlckNhc2UoKSl7XHJcbiAgICAgICRidXR0b25Ub0FjdGl2ZS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgIHdhcm5pbmcuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAkYnV0dG9uVG9BY3RpdmUuYXR0cihcImRpc2FibGVkXCIsXCJcIik7XHJcbiAgICAgIHdhcm5pbmcucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG4vLyArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXHJcbi8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1bmNpb25lcyBkZSB1dGlsZXJpYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4vLyArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXHJcbi8vXHJcblxyXG5cclxuZnVuY3Rpb24gcmVwbGFjZUNsYXNzKCRvYmplY3Qsb2xkQ2xhc3MsbmV3Q2xhc3Mpe1xyXG4gICAkb2JqZWN0LmFkZENsYXNzKG5ld0NsYXNzKTtcclxuICAgJG9iamVjdC5yZW1vdmVDbGFzcyhvbGRDbGFzcylcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVNlcnZpY2VDYXJkQ2xpY2thYmxlKCl7XHJcbiAgICB2YXIgc2VydmljZUNhcmQgICAgICA9ICQoXCIuc2VydmljZS1jYXJkXCIpO1xyXG4gICAgdmFyIGJ0blByaW50Q29udHJhY3QgPSAkKCcjYnRuLXByaW50LXJlcXVpcmVtZW50Jyk7XHJcblxyXG4gICAgc2VydmljZUNhcmQub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyICR0aGlzICAgICAgID0gJCh0aGlzKTtcclxuICAgICAgdmFyIHNlcnZpY2VfaWQgID0gJHRoaXMuYXR0cignZGF0YS1pZCcpOyBcclxuICAgICAgdmFyIHBheW1lbnQgICAgID0gJHRoaXMuYXR0cignZGF0YS1wYXltZW50Jyk7XHJcbiAgICAgIHZhciByZWFsTGluayAgICA9IGJ0blByaW50Q29udHJhY3QuYXR0cignZGF0YS1ocmVmJylcclxuICAgICAgXHJcbiAgICAgIHNlcnZpY2VDYXJkLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAkdGhpcy5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgYnRuUHJpbnRDb250cmFjdC5hdHRyKFwiaHJlZlwiLHJlYWxMaW5rICsgXCIvXCIgKyBzZXJ2aWNlX2lkKTtcclxuICAgICAgJCgnI2NvbnRyYWN0LWNsaWVudC1wYXltZW50JykudmFsKHBheW1lbnQpXHJcbiAgICB9KVxyXG59XHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICBWZXJpZnkgUm93cyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbmZ1bmN0aW9uIHZlcmlmeUNvbnRyYWN0U3RhdHVzKCl7XHJcbiAgJChcIi50ZC1lc3RhZG9cIikuZWFjaChmdW5jdGlvbihpLHZhbHVlKXtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICB2YXIgdGV4dCA9ICR0aGlzLnRleHQoKS50cmltKCk7XHJcbiAgICBpZih0ZXh0ID09IFwiYWN0aXZvXCIpe1xyXG4gICAgICAkdGhpcy5jc3Moe2NvbG9yOlwiZ3JlZW5cIn0pXHJcbiAgICB9ZWxzZSBpZih0ZXh0ID09IFwic2FsZGFkb1wiKXtcclxuICAgICAgJHRoaXMucGFyZW50cyhcInRyXCIpLmNzcyh7YmFja2dyb3VuZDpcInJnYmEoMjIsMjU1LDAsLjMpXCIsY29sb3I6XCIjNTU1XCJ9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdmVyaWZ5Q2xpZW50U3RhdHVzKCl7XHJcbiAgICQoXCJ0ZFwiKS5lYWNoKGZ1bmN0aW9uKGksdmFsdWUpe1xyXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgIHZhciB0ZXh0ID0gJHRoaXMudGV4dCgpLnRyaW0oKTtcclxuICAgIGlmKHRleHQgPT0gXCJubyBhY3Rpdm9cIil7XHJcbiAgICAgICR0aGlzLmNzcyh7Y29sb3I6XCJyZ2JhKDIwMCwwLDAsLjcpXCJ9KVxyXG4gICAgfWVsc2UgaWYodGV4dCA9PSBcImFjdGl2b1wiKXtcclxuICAgICAgJHRoaXMuY3NzKHtjb2xvcjpcImdyZWVuXCJ9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogICAgICAgICAgICAgICAgICAgICAgIExvYWRlcnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmZ1bmN0aW9uIGhlYXZ5TG9hZChzdG9wKXtcclxuICBpZighc3RvcCl7XHJcbiAgICB2YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVwiaGVhdnktbG9hZGVyIGFjdGl2ZVwiPidcclxuICAgICAgICBodG1sICs9ICAgJzxkaXYgY2xhc3M9XCJjaXJjbGUtbG9hZFwiPjwvZGl2PidcclxuICAgICAgICBodG1sICs9ICAgJzxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+UHJlcGFyYW5kbyBsb3MgZGF0b3M8L2Rpdj4nXHJcbiAgICAgICAgaHRtbCArPSAnPC9kaXY+J1xyXG4gICAgJChcImJvZHlcIikuYXBwZW5kKGh0bWwpXHJcbiAgICAkKFwiYm9keVwiKS5jc3Moe292ZXJmbG93OlwiaGlkZGVuXCJ9KTtcclxuICAgIHZhciBtZXNzYWdlID0gJChcIi5oZWF2eS1sb2FkZXIgLm1lc3NhZ2VcIik7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIkNvbmZpZ3VyYW5kby4uLlwiKTtcclxuICAgIH0sNDAwMClcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgbWVzc2FnZS50ZXh0KFwiQ2FzaSBUZXJtaW5hbW9zIC4uLlwiKTtcclxuICAgIH0sODAwMClcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgbWVzc2FnZS50ZXh0KFwiVGVybWluYW5kbyBlbCBwcm9jZXNvIC4uLlwiKTtcclxuICAgICAgcmVtb3ZlTG9hZGVyKCk7XHJcbiAgICB9LDE1MDAwKVxyXG4gIH1lbHNle1xyXG4gICAgcmVtb3ZlTG9hZGVyKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmVMb2FkZXIoKXtcclxuICAgIHZhciBsb2FkZXIgPSAkKFwiLmhlYXZ5LWxvYWRlclwiKTtcclxuICAgIGxvYWRlci5yZW1vdmUoKTtcclxuICAgICQoXCJib2R5XCIpLmNzcyh7b3ZlcmZsb3c6XCJhdXRvXCJ9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpbmVMb2FkKHN0b3ApIHtcclxuICBpZighc3RvcCl7XHJcbiAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtcclxuICAgICAgZGlzcGxheTogXCJibG9ja1wiXHJcbiAgICAgIH0pO1xyXG4gIH1lbHNle1xyXG4gICAgJChcIi5sb2FkZXJcIikuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xyXG4gIH1cclxufSIsIiQoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBjdXJyZW50UGFnZSA9ICQoXCJ0aXRsZVwiKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xyXG4gIGN1cnJlbnRQYWdlID0gY3VycmVudFBhZ2VbNF0udG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgXHJcbiAgaWYgKGN1cnJlbnRQYWdlID09IFwiYWRtaW5pc3RyYWRvclwiKSB7XHJcbiAgICBuZXdVc2VyRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0ZSgpO1xyXG4gIGFkbWluRnVuY3Rpb25zKCk7XHJcbiAgdXNlckluZm9UaXAoKTtcclxuICBtYWtlU2VydmljZUNhcmRDbGlja2FibGUoKTtcclxuICBcclxuICBpZiAoY3VycmVudFBhZ2UgPT0gXCJkZXRhbGxlc1wiIHx8IGN1cnJlbnRQYWdlICE9ICdudWV2b19jb250cmF0bycpIHtcclxuICAgIGRldGFpbHNGdW5jdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIG5vdGlmaWNhdGlvbkZ1bmN0aW9ucygpO1xyXG4gIG5ld0NvbnRyYWN0RnVuY3Rpb25zKCk7XHJcbiAgY2hlY2tXaW5kb3dTaXplKCk7XHJcbiAgXHJcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjaGVja1dpbmRvd1NpemUoKTtcclxuICB9KVxyXG5cclxuICBvbldpbmRvd0xvYWRGdW5jdGlvbnMoKTtcclxuICAvKipcclxuICAgKiBHZXQgRGF0ZTpcclxuICAgKiBPYnRpZW5lIGxhIGZlY2hhIGFjdHVhbCBhbCBzZWd1bmRvIHkgbGEgbXVlc3RyYSBlbiBsYSBwYW50YWxsYSBkZSBpbmljaW9cclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGdldERhdGUoKSB7XHJcbiAgICB2YXIgJGRheSA9ICQoJy5kYXknKTtcclxuICAgIHZhciAkbW9udGhZZWFyID0gJCgnLm1vbnRoLXllYXInKTtcclxuICAgIHZhciAkZGF5V2VlayA9ICQoJy5kYXl3ZWVrJyk7XHJcbiAgICB2YXIgJEhvcmEgPSAkKCcuaG91ciBzcGFuJyk7XHJcbiAgICB2YXIgZGF0ZSwgZGF5LCBtb250aCwgeWVhciwgc0hvdXI7XHJcbiAgICB2YXIgZGF5cyA9IFtcIkRvbWluZ29cIiwgXCJMdW5lc1wiLCBcIk1hcnRlc1wiLCBcIk1pZXJjb2xlc1wiLCBcIkp1ZXZlc1wiLCBcIlZpZXJuZXNcIiwgXCJTYWJhZG9cIl07XHJcbiAgICB2YXIgbW9udGhzID0gW1wiRW5lcm9cIiwgXCJGZWJyZXJvXCIsIFwiTWFyem9cIiwgXCJBYnJpbFwiLCBcIk1heW9cIiwgXCJKdW5pb1wiLCBcIkp1bGlvXCIsIFwiQWdvc3RvXCIsIFwiU2VwdGllbWJyZVwiLCBcIk9jdHVicmVcIiwgXCJOb3ZpZW1icmVcIiwgXCJEaWNpZW1icmVcIl07XHJcblxyXG4gICAgc2V0SW50ZXJ2YWwodXBkYXRlSG91ciwgMTAwMCk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlSG91cigpIHtcclxuICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIHNEYXRlID0gZGF0ZS50b1N0cmluZygpXHJcbiAgICAgICRkYXkudGV4dChkYXRlLmdldERhdGUoKSk7XHJcbiAgICAgICRtb250aFllYXIudGV4dChcIkRlIFwiICsgbW9udGhzW2RhdGUuZ2V0TW9udGgoKV0gKyBcIiBkZSBcIiArIGRhdGUuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICRkYXlXZWVrLnRleHQoZGF5c1tkYXRlLmdldERheSgpXSk7XHJcblxyXG4gICAgICBzSG91ciA9IG1vbWVudCgpLmZvcm1hdCgnTFRTJyk7XHJcbiAgICAgICRIb3JhLmh0bWwoc0hvdXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRtaW4gRnVuY3Rpb25zOlxyXG4gICAqIHNlIGVuY2FyZ2EgZGUgZWwgbW92aW1pZW50byBkZSBsb3MgcGFuZWxlcyBlbiBsYSBwYW50YWxsYSAnYWRtaW5pc3RyYWRvcidcclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqL1xyXG5cclxuICBmdW5jdGlvbiBhZG1pbkZ1bmN0aW9ucygpIHtcclxuICAgICQoJyNjb21wYW55LXNlY3Rpb24nKS5hbmltYXRlKHtcclxuICAgICAgbGVmdDogXCIwXCJcclxuICAgIH0sIDIwMClcclxuICAgICQoJy5hZG1pbmlzdHJhZG9yIC5hc2lkZS1idXR0b25zIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgIHZhciBjYXJkTmFtZSA9ICR0aGlzLmF0dHIoJ2hyZWYnKS5zbGljZSgxKTtcclxuICAgICAgaWYgKGNhcmROYW1lICE9IG51bGwpIHtcclxuICAgICAgICAkKCcuY29tcGFueS1kZXRhaWxzJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBsZWZ0OiBcIi0xMTAlXCJcclxuICAgICAgICB9LCAyMDApXHJcbiAgICAgICAgJCgnIycgKyBjYXJkTmFtZSArICcuY29tcGFueS1kZXRhaWxzJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBsZWZ0OiBcIjBcIlxyXG4gICAgICAgIH0sIDIwMClcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBpZiAoJChcIiNhY291bnQtc2VjdGlvblwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICQoJyNhY291bnQtc2VjdGlvbicpLmFuaW1hdGUoe1xyXG4gICAgICAgIGxlZnQ6IFwiMFwiXHJcbiAgICAgIH0sIDIwMClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIG5ldyBVc2VyIEZvcm06XHJcbiAgICogdmFpZGEgbGFzIGNvbnRyYXNlw7FhcyBlbiBsb3MgZm9ybXVsYXJpb3MgZGUgbG9zIHVzdWFyaW9zXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKi9cclxuXHJcbiAgZnVuY3Rpb24gbmV3VXNlckZvcm0oKSB7XHJcbiAgICB2YWxpZGF0ZU1vZGFsKFwiI25ldy11c2VyLW1vZGFsXCIpO1xyXG4gICAgdmFsaWRhdGVNb2RhbChcIiN1cGRhdGUtdXNlci1tb2RhbFwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZXIgSW5mbyBUaXBcclxuICAgKiBoYWNlIHVuIHRvZ2dsZSBlbiBsYSB2aXNpYmlsaWRhZCBkZSBsYSBpbmZvIGRlbCB1c3VhcmlvXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKi9cclxuXHJcbiAgZnVuY3Rpb24gdXNlckluZm9UaXAoKSB7XHJcbiAgICB2YXIgaW5mb1RpcCA9ICQoXCIudXNlci1pbmZvLXRpcFwiKTtcclxuICAgIHZhciBwcm9maWxlUGljdHVyZSA9ICQoXCIucHJvZmlsZS1waWN0dXJlXCIpO1xyXG4gICAgdmFyIGJ0bk1vcmUgPSAkKFwiLmJ0bi1tb3JlXCIpO1xyXG5cclxuICAgIGJ0bk1vcmUub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgaW5mb1RpcC50b2dnbGVDbGFzcyhcInZpc2libGVcIik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIG5ld0NvbnRyYWN0RnVuY3Rpb25zKCkge1xyXG4gIHZhciBidG5QcmludENvbnRyYWN0ID0gJChcIiNidG4tcHJpbnQtY29udHJhY3RcIik7XHJcbiAgdmFyIGRvY3VtZW50ID0gJChcIi5ub3RlLWl0ZW1cIik7XHJcbiAgdmFyIHJhZGlvQWN0aXZhdGVDb250cmFjdCA9ICQoXCIjcmFkaW8tbmV3LWNvbnRyYWN0XCIpO1xyXG4gIHZhciByYWRpb0Rpc2FibGVDb250cmFjdCA9ICQoXCIjcmFkaW8tanVzdC1yZXF1aXJlbWVudFwiKTtcclxuICB2YXIgY29udHJhY3RDb250cm9scyA9ICQoXCIuY29udHJhY3QtY29udHJvbHNcIik7XHJcbiAgdmFyIHJlcXVpcmVtZW50Q29udHJvbHMgPSAkKFwiLnJlcXVpcmVtZW50LWNvbnRyb2xzXCIpO1xyXG5cclxuICByYWRpb0FjdGl2YXRlQ29udHJhY3QucGFyZW50cyhcImxhYmVsXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGFjdGl2YXRlQ29udHJhY3RNb2RlKCk7XHJcblxyXG4gIH0pO1xyXG5cclxuICByYWRpb0Rpc2FibGVDb250cmFjdC5wYXJlbnRzKFwibGFiZWxcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgZGlzYWJsZUNvbnRyYWN0TW9kZSgpXHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIGFjdGl2YXRlQ29udHJhY3RNb2RlKCRidG4pIHtcclxuICAgIHJhZGlvRGlzYWJsZUNvbnRyYWN0XHJcbiAgICAgIC5yZW1vdmVBdHRyKFwiY2hlY2tlZFwiLCBcIlwiKVxyXG4gICAgICAuaHRtbChcIlwiKVxyXG4gICAgcmFkaW9BY3RpdmF0ZUNvbnRyYWN0XHJcbiAgICAgIC5hdHRyKFwiY2hlY2tlZFwiLCBcIlwiKVxyXG4gICAgICAuaHRtbChcIiYjMTAwMDQ7XCIpXHJcbiAgICBkb2N1bWVudC5yZW1vdmVDbGFzcyhcInByaW50LXJlcXVpcmVtZW50XCIpO1xyXG4gICAgY29udHJhY3RDb250cm9scy5yZW1vdmVDbGFzcyhcImhpZGVcIilcclxuICAgIHJlcXVpcmVtZW50Q29udHJvbHMuYWRkQ2xhc3MoXCJoaWRlXCIpXHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGlzYWJsZUNvbnRyYWN0TW9kZSgkYnRuKSB7XHJcbiAgICByYWRpb0FjdGl2YXRlQ29udHJhY3RcclxuICAgICAgLnJlbW92ZUF0dHIoXCJjaGVja2VkXCIsIFwiXCIpXHJcbiAgICAgIC5odG1sKFwiXCIpXHJcbiAgICByYWRpb0Rpc2FibGVDb250cmFjdFxyXG4gICAgICAuYXR0cihcImNoZWNrZWRcIiwgXCJcIilcclxuICAgICAgLmh0bWwoXCImIzEwMDA0O1wiKVxyXG4gICAgZG9jdW1lbnQuYWRkQ2xhc3MoXCJwcmludC1yZXF1aXJlbWVudFwiKTtcclxuICAgIHJlcXVpcmVtZW50Q29udHJvbHMucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpXHJcbiAgICBjb250cmFjdENvbnRyb2xzLmFkZENsYXNzKFwiaGlkZVwiKVxyXG4gIH1cclxufVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgIE1vZGFscyBGdW5jdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbiQoJyNzZWFyY2gtY2xpZW50LW1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICB2YXIgYnV0dG9uID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KTtcclxuICBjbGllbnRUYWJsZS5pbml0KCk7XHJcbiAgdmFyIHRpdGxlID0gYnV0dG9uLmZpbmQoJy5zZWN0aW9uLXRpdGxlJykudGV4dCgpO1xyXG4gIGlmICghdGl0bGUpIHRpdGxlID0gXCJCdXNjYXIgQ2xpZW50ZVwiXHJcbiAgaWYgKHRpdGxlLnRvTG93ZXJDYXNlKCkudHJpbSgpID09IFwicmVnaXN0cmFyIHBhZ29cIikge1xyXG4gICAgYnV0dG9uVGV4dCA9IFwiaXIgYSBQYWdvc1wiXHJcbiAgfSBlbHNlIHtcclxuICAgIGJ1dHRvblRleHQgPSBcIk51ZXZvIENvbnRyYXRvXCJcclxuICB9XHJcblxyXG4gIHZhciBtb2RhbCA9ICQodGhpcylcclxuICBtb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS50ZXh0KHRpdGxlKVxyXG4gIG1vZGFsLmZpbmQoJy5tb2RhbC1mb290ZXIgLnNhdmUnKS50ZXh0KGJ1dHRvblRleHQpXHJcbiAgbW9kYWwuZmluZCgndGJvZHknKS5odG1sKCcnKVxyXG59KVxyXG5cclxuJCgnI3VwZGF0ZS1jb250cmFjdC1tb2RhbCcpLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgJChcIiNzZWxlY3QtY29udHJhY3Qtc2VjdG9yXCIpLmNoYW5nZSgpO1xyXG59KVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqICAgICAgICAgICAgICBvdGhlciBmdW5jdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICogXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZnVuY3Rpb24gZGV0YWlsc0Z1bmN0aW9ucygpIHtcclxuICB2YXIgc21hbGxCdXR0b25zU2VsZWN0ID0gJCgnLmJ0bi1zbWFsbCcpO1xyXG4gIHZhciB0YWJzID0ge1xyXG4gICAgY29udHJhY3RDb250cm9sczogW1wiI2NvbnRyYWN0c1wiLCBcIiNtb250aC1hbmQtZGF0ZVwiLCBcIiNyZWNvbm5lY3Qtc2VydmljZVwiLCAnI2V4dHJhLWNvbnRyYWN0JywgJyNleHRyYS1zZXJ2aWNlJywgJyNleHRyYS1leHRlbnNpb24nLCAnI2V4dHJhLXVwZ3JhZGUnXSxcclxuICAgIHBheW1lbnRDb250cm9sczogW1wiI3BheW1lbnRzXCIsIFwiI2RldGFsbGVzLWRlLXBhZ29cIiwgXCIjZGVzY3VlbnRvc1wiXVxyXG4gIH1cclxuXHJcbiAgJCgnW3JvbGU9XCJ0YWJcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIilcclxuXHJcbiAgICBpZiAoY29tcGFyZShocmVmLCB0YWJzLnBheW1lbnRDb250cm9scykpIHtcclxuICAgICAgJChcIi5wYXltZW50LWNvbnRyb2xzXCIpLmFkZENsYXNzKFwidmlzaWJsZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoXCIucGF5bWVudC1jb250cm9sc1wiKS5yZW1vdmVDbGFzcyhcInZpc2libGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbXBhcmUoaHJlZiwgdGFicy5jb250cmFjdENvbnRyb2xzKSkge1xyXG4gICAgICAkKFwiLmNvbnRyYWN0LWNvbnRyb2xzXCIpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChcIi5jb250cmFjdC1jb250cm9sc1wiKS5hZGRDbGFzcyhcImhpZGVcIilcclxuICAgIH1cclxuICAgIGdldFRhYkNvbnRyb2xzKCQodGhpcykpO1xyXG4gIH0pO1xyXG5cclxuICAkKCcuYnRuLXNtYWxsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgc21hbGxCdXR0b25zU2VsZWN0LnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICB9KVxyXG5cclxuICBmdW5jdGlvbiBjb21wYXJlKHZhbHVlLCBwb3NpYmxlVmFsdWVzKSB7XHJcbiAgICB2YXIgcmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgIHBvc2libGVWYWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAodGhlVmFsdWUpIHtcclxuICAgICAgaWYgKHZhbHVlID09IHRoZVZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUYWJDb250cm9scygkdGhpcykge1xyXG4gIHZhciBjb250cm9scyA9ICR0aGlzLmF0dHIoXCJhcmlhLWNvbnRyb2xzXCIpO1xyXG4gICQoXCIuZHluYW1pYy1jb250cm9sc1wiKS50ZXh0KGNvbnRyb2xzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm90aWZpY2F0aW9uRnVuY3Rpb25zKCkge1xyXG4gIHZhciBidG5BdmVyaWFzID0gJChcIiNidG4tc2VlLWF2ZXJpYXNcIik7XHJcbiAgdmFyIGJ0blBhZ29zID0gJChcIiNidG4tc2VlLXBhZ29zXCIpO1xyXG4gIHZhciBidG5DYWphQ2hpY2EgPSAkKCcjYnRuLXNlZS1jYWphJyk7XHJcbiAgdmFyIGJ0bkRldWRvcmVzID0gJChcIiNidG4tc2VlLWRldWRvcmVzXCIpXHJcbiAgdmFyIGJ0bkRheUluY29tZXMgPSAkKFwiI2J0bi1zZWUtZGF5LWluY29tZXNcIilcclxuICB2YXIgbGF5b3V0Q29udGFpbmVyID0gJChcIi5sYXlvdXQtY29udGFpbmVyXCIpO1xyXG5cclxuICBidG5BdmVyaWFzLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGxheW91dENvbnRhaW5lci5hbmltYXRlKHtcclxuICAgICAgbGVmdDogXCItMTAwJVwiXHJcbiAgICB9LCAyMDApO1xyXG4gIH0pO1xyXG5cclxuICBidG5QYWdvcy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7XHJcbiAgICAgIGxlZnQ6IFwiMFwiXHJcbiAgICB9LCAyMDApO1xyXG4gIH0pO1xyXG5cclxuICBidG5EZXVkb3Jlcy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7XHJcbiAgICAgIGxlZnQ6IFwiLTIwMCVcIlxyXG4gICAgfSwgMjAwKTtcclxuICB9KTtcclxuXHJcbiAgYnRuRGF5SW5jb21lcy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7XHJcbiAgICAgIGxlZnQ6IFwiLTMwMCVcIlxyXG4gICAgfSwgMjAwKTtcclxuICB9KTtcclxufVxyXG5cclxuJChcIiNzZWxlY3QtZXh0cmEtc2VydmljZVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gIHZhciAkdGhpcyA9ICQoKFwiI3NlbGVjdC1leHRyYS1zZXJ2aWNlIDpzZWxlY3RlZFwiKSk7XHJcbiAgdmFyIGNvc3QgPSAkdGhpcy5hdHRyKFwiZGF0YS1wYXltZW50XCIpO1xyXG5cclxuICAkKFwiI2V4dHJhLXNlcnZpY2UtY29zdFwiKS52YWwoY29zdClcclxufSk7XHJcblxyXG4kKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gIHZhciAkdGhpcyA9ICQoKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdCA6c2VsZWN0ZWRcIikpO1xyXG5cclxuICAkKFwiI2V4dHJhLWNvbnRyYWN0LXNlcnZpY2VcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLXNlcnZpY2VcIikpO1xyXG4gICQoXCIjZXh0cmEtZXF1aXBvXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1lcXVpcG1lbnRcIikpO1xyXG4gICQoXCIjZXh0cmEtcm91dGVyXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1yb3V0ZXJcIikpO1xyXG4gICQoXCIjZXh0cmEtZS1tYWNcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWUtbWFjXCIpKTtcclxuICAkKFwiI2V4dHJhLXItbWFjXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1yLW1hY1wiKSk7XHJcbiAgJChcIiNleHRyYS1jb2RlXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1jb2RlXCIpKTtcclxufSk7XHJcblxyXG4kKFwiLmNvbHVtbnMtcmlnaHRcIikucmVtb3ZlQ2xhc3MoXCJwdWxsLXJpZ2h0XCIpO1xyXG5cclxuJChcIiNzZWxlY3QtY29udHJhY3QtY29kZVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gIHZhciAkdGhpcyA9ICQoKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlIDpzZWxlY3RlZFwiKSk7XHJcbiAgJChcIiNjb250cmFjdC1pcFwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtaXAtZmluYWxcIikpO1xyXG4gICQoXCIjdS1jb250cmFjdC1pcFwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtaXAtZmluYWxcIikpO1xyXG5cclxufSk7XHJcblxyXG5mdW5jdGlvbiBjaGVja1dpbmRvd1NpemUoKSB7XHJcbiAgdmFyIHdpZHRoID0gd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoO1xyXG4gIHZhciBicmFuZE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnJhbmQgc3BhbicpO1xyXG5cclxuICBpZiAod2lkdGggPD0gMTEwMCkge1xyXG4gICAgYnJhbmROYW1lLnRleHRDb250ZW50ID0gXCJQXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIGJyYW5kTmFtZS50ZXh0Q29udGVudCA9IFwiUGF5bWVudFwiO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gb25XaW5kb3dMb2FkRnVuY3Rpb25zKCl7XHJcbiAgJCgnYm9keScpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICBwb3NpdGlvbiA9ICQoJ2JvZHknKS5zY3JvbGxUb3AoKVxyXG4gICAgbW92YWJsZU5hdiA9ICQoJy5hc2lkZS1uYXYtY29udGFpbmVyLCAuYXNpZGUtd2lkZS1sZWZ0JylcclxuICAgIGlmIChwb3NpdGlvbiA+PSA1MCkge1xyXG4gICAgICBpZighbW92YWJsZU5hdi5oYXNDbGFzcygnbW92ZWQnKSlcclxuICAgICAgICBtb3ZhYmxlTmF2LmFkZENsYXNzKCdtb3ZlZCcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtb3ZhYmxlTmF2LnJlbW92ZUNsYXNzKCdtb3ZlZCcpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG4iLCJ2YXIgVXNlcnMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgbmljaywgcGFzc3dvcmQsIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGUsIGlzX2VtcHR5O1xyXG5cclxuICAgIG5pY2sgICAgICA9ICQoXCIjdXNlci1uaWNrbmFtZVwiKS52YWwoKTtcclxuICAgIHBhc3N3b3JkICA9ICQoXCIjdXNlci1wYXNzd29yZFwiKS52YWwoKTtcclxuICAgIG5hbWUgICAgICA9ICQoXCIjdXNlci1uYW1lXCIpLnZhbCgpO1xyXG4gICAgbGFzdG5hbWUgID0gJChcIiN1c2VyLWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgZG5pICAgICAgID0gZ2V0VmFsKCQoXCIjdXNlci1kbmlcIikpO1xyXG4gICAgdHlwZSAgICAgID0gJChcIiN1c2VyLXR5cGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbbmljaywgcGFzc3dvcmQsIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGVdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICduaWNrbmFtZT0nICsgbmljayArIFwiJnBhc3N3b3JkPVwiICsgcGFzc3dvcmQgKyBcIiZuYW1lPVwiICsgbmFtZSArIFwiJmxhc3RuYW1lPVwiICsgbGFzdG5hbWU7XHJcbiAgICAgIGZvcm0gKz0gXCImZG5pPVwiICsgZG5pICsgXCImdHlwZT1cIiArIHR5cGU7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwidXNlci9hZGRuZXdcIiwgdHJ1ZSwgaW5pdEFkbWluSGFuZGxlcnMsIG51bGwsIGZvcm0sIFVzZXJzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG5pY2ssIHBhc3N3b3JkLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlO1xyXG5cclxuICAgIG5pY2sgICAgID0gJChcIiNlLW5pY2tuYW1lXCIpLnZhbCgpO1xyXG4gICAgbmFtZSAgICAgPSAkKFwiI2UtbmFtZVwiKS52YWwoKTtcclxuICAgIGxhc3RuYW1lID0gJChcIiNlLWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgZG5pICAgICAgPSAkKFwiI2UtZG5pXCIpLnZhbCgpO1xyXG4gICAgdHlwZSAgICAgPSAkKFwiI2UtdHlwZVwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtuaWNrLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbmlja25hbWU9JyArIG5pY2sgKyBcIiZuYW1lPVwiICsgbmFtZSArIFwiJmxhc3RuYW1lPVwiICsgbGFzdG5hbWU7XHJcbiAgICAgIGZvcm0gKz0gXCImZG5pPVwiICsgZG5pICsgXCImdHlwZT1cIiArIHR5cGU7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwidXNlci91cGRhdGVcIiwgdHJ1ZSwgaW5pdEFkbWluSGFuZGxlcnMsIG51bGwsIGZvcm0sIFVzZXJzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsZT11c2Vyc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3VzZXIvZ2V0dXNlcnMnLCBmYWxzZSwgaW5pdEFkbWluSGFuZGxlcnMsIHVzZXJUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBkZWxldGU6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInVzZXJfaWQ9XCIgKyBpZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL2RlbGV0ZXVzZXInLCB0cnVlLCBpbml0QWRtaW5IYW5kbGVycywgbnVsbCwgZm9ybSwgVXNlcnMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBjb25maXJtUGFzc3dvcmQ6IGZ1bmN0aW9uKHVzZXJJZCxjdXJyZW50UGFzc3dvcmQpIHtcclxuICAgIHZhciBmb3JtID0gJ3VzZXJfaWQ9JysgdXNlcklkICsnJmN1cnJlbnRfcGFzc3dvcmQ9JyArIGN1cnJlbnRQYXNzd29yZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL2NvbmZpcm1fcGFzc3dvcmQnLCBmYWxzZSwgZmFsc2UsIHByb2Nlc3NDb25maXJtRGF0YSwgZm9ybSwgbnVsbCwgbnVsbCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHByb2Nlc3NDb25maXJtRGF0YShyZXNwb25zZSkge1xyXG4gICAgICB2YXIgbmV3UGFzc3dvcmQgICAgICAgICA9ICQoXCIjYWNvdW50LW5ldy1wYXNzd29yZFwiKTtcclxuICAgICAgdmFyIG5ld1Bhc3N3b3JkQ29uZmlybSAgPSAkKFwiI2Fjb3VudC1jb25maXJtLW5ldy1wYXNzd29yZFwiKTtcclxuICAgICAgXHJcbiAgICAgIGlmIChyZXNwb25zZSA9PSAxKSB7ICAgICAgXHJcbiAgICAgICAgbmV3UGFzc3dvcmQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICBuZXdQYXNzd29yZENvbmZpcm0ucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICB2YWxpZGF0ZVRoaXMoKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgbmV3UGFzc3dvcmQuYXR0cignZGlzYWJsZWQnLHRydWUpO1xyXG4gICAgICAgIG5ld1Bhc3N3b3JkQ29uZmlybS5hdHRyKCdkaXNhYmxlZCcsdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGVQYXNzd29yZDogZnVuY3Rpb24odXNlcklkLGN1cnJlbnRQYXNzd29yZCxuZXdQYXNzd29yZCl7XHJcbiAgICB2YXIgZm9ybSA9ICd1c2VyX2lkPScrIHVzZXJJZCAgKyBcIiZjdXJyZW50X3Bhc3N3b3JkPVwiKyBjdXJyZW50UGFzc3dvcmQgKycmbmV3X3Bhc3N3b3JkPScgKyBuZXdQYXNzd29yZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL3VwZGF0ZV9wYXNzd29yZCcsIGZhbHNlLCBmYWxzZSwgVXNlcnMucGFzc3dvcmRDaGFuZ2VkLCBmb3JtLCBudWxsLGhlYXZ5TG9hZCk7XHJcbiAgfSxcclxuXHJcbiAgcGFzc3dvcmRDaGFuZ2VkOiBmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICBpZihyZXNwb25zZT09MSl7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfU1VDQ0VTUyArICdDb250cmFzZcOxYSBDYW1iaWFkYSBjb24gZXhpdG8nKVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBCQVNFX1VSTCArICdhcHAvbG9nb3V0J1xyXG4gICAgICB9LDMwMDApICAgICAgXHJcbiAgICB9ZWxzZXtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArICcgRXJyb3IgYWwgY2FtYmlhciBkZSBjb250cmFzZcOxYSwgcmV2aXNlIGxhIGNvbnRyYXNlw7FhIGFjdHVhbCcpXHJcbiAgICB9XHJcbiAgICAgIFxyXG4gIH1cclxufVxyXG5cclxudmFyIENsaWVudHMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgbm9tYnJlcywgYXBlbGxpZG9zLCBjZWR1bGEsIGNlbHVsYXIsIHByb3ZpbmNpYSwgc2VjdG9yLCBjYWxsZSwgY2FzYSxkZXRhbGxlc0RpcmVjY2lvbixcclxuICAgICAgICB0ZWxlZm9ubyxsdWdhclRyYWJham8sIHRlbFRyYWJham8sIGluZ3Jlc29zLCBmZWNoYVJlZ2lzdHJvLCBlc3RhZG87XHJcblxyXG4gICAgbm9tYnJlcyAgICAgICAgICAgID0gJChcIiNjbGllbnQtbmFtZVwiKS52YWwoKTtcclxuICAgIGFwZWxsaWRvcyAgICAgICAgICA9ICQoXCIjY2xpZW50LWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgY2VkdWxhICAgICAgICAgICAgID0gZ2V0VmFsKCQoXCIjY2xpZW50LWRuaVwiKSk7XHJcbiAgICBjZWx1bGFyICAgICAgICAgICAgPSBnZXRWYWwoJChcIiNjbGllbnQtcGhvbmVcIikpO1xyXG4gICAgcHJvdmluY2lhICAgICAgICAgID0gJChcIiNjbGllbnQtcHJvdmluY2lhXCIpLnZhbCgpO1xyXG4gICAgc2VjdG9yICAgICAgICAgICAgID0gJChcIiNjbGllbnQtc2VjdG9yXCIpLnZhbCgpO1xyXG4gICAgY2FsbGUgICAgICAgICAgICAgID0gJChcIiNjbGllbnQtc3RyZWV0XCIpLnZhbCgpO1xyXG4gICAgY2FzYSAgICAgICAgICAgICAgID0gJCgnI2NsaWVudC1ob3VzZScpLnZhbCgpO1xyXG4gICAgZGV0YWxsZXNEaXJlY2Npb24gID0gJCgnI2NsaWVudC1kaXJlY3Rpb24tZGV0YWlscycpLnZhbCgpO1xyXG4gICAgdGVsZWZvbm8gICAgICAgICAgID0gZ2V0VmFsKCQoJyNjbGllbnQtdGVsZXBob25lJykpO1xyXG4gICAgbHVnYXJUcmFiYWpvICAgICAgID0gJCgnI2NsaWVudC1qb2InKS52YWwoKTtcclxuICAgIHRlbFRyYWJham8gICAgICAgICA9IGdldFZhbCgkKCcjY2xpZW50LWpvYi10ZWxlcGhvbmUnKSk7XHJcbiAgICBpbmdyZXNvcyAgICAgICAgICAgPSAkKCcjY2xpZW50LXNhbGFyeScpLnZhbCgpO1xyXG4gICAgZmVjaGFSZWdpc3RybyAgICAgID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgIGVzdGFkbyAgICAgICAgICAgICA9IFwibm8gYWN0aXZvXCI7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbbm9tYnJlcywgYXBlbGxpZG9zLCBjZWR1bGEsIGNlbHVsYXIsIHByb3ZpbmNpYSwgc2VjdG9yLCBjYWxsZSwgY2FzYSwgdGVsZWZvbm9dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdub21icmVzPScgKyBub21icmVzICsgXCImYXBlbGxpZG9zPVwiICsgYXBlbGxpZG9zICsgXCImY2VkdWxhPVwiICsgY2VkdWxhICsgXCImY2VsdWxhcj1cIiArIGNlbHVsYXI7XHJcbiAgICAgIGZvcm0gKz0gXCImcHJvdmluY2lhPVwiICsgcHJvdmluY2lhICsgXCImc2VjdG9yPVwiICsgc2VjdG9yICsgXCImY2FsbGU9XCIgKyBjYWxsZSArIFwiJmNhc2E9XCIgKyBjYXNhICsgXCImdGVsZWZvbm89XCIgKyB0ZWxlZm9ubztcclxuICAgICAgZm9ybSArPSBcIiZsdWdhcl90cmFiYWpvPVwiICsgbHVnYXJUcmFiYWpvICsgXCImdGVsX3RyYWJham89XCIgKyB0ZWxUcmFiYWpvICsgXCImaW5ncmVzb3M9XCIgKyBpbmdyZXNvcyArIFwiJmZlY2hhX3JlZ2lzdHJvPVwiICsgZmVjaGFSZWdpc3RybztcclxuICAgICAgZm9ybSArPSBcIiZlc3RhZG89XCIgKyBlc3RhZG8gKyBcIiZkZXRhbGxlc19kaXJlY2Npb249XCIgKyBkZXRhbGxlc0RpcmVjY2lvbiAgKyBcIiZ0YWJsYT1jbGllbnRlc1wiO1xyXG5cclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2FkZFwiLCB0cnVlLCBpbml0Q2xpZW50SGFuZGxlcnMsIG51bGwsIGZvcm0sIENsaWVudHMuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2xpZW50ZXNcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBpbml0Q2xpZW50SGFuZGxlcnMsIGNsaWVudFRhYmxlLnJlZnJlc2gsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIGdldE9uZTogZnVuY3Rpb24gKGlkLCByZWNlaXZlcikge1xyXG4gICAgZm9ybSA9IFwidGFibGE9Y2xpZW50ZXMmaWQ9XCIgKyBpZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRvbmVcIiwgZmFsc2UsIGluaXRDbGllbnRIYW5kbGVycywgcmVjZWl2ZXIsIGZvcm0sIG51bGwpXHJcbiAgfSxcclxuXHJcbiAgcmVjZWl2ZUZvckVkaXQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XHJcbiAgICB2YXIgY2xpZW50ICAgICAgICAgICAgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgdGhpcy5pZCAgICAgICAgICAgICAgICA9IGNsaWVudFsnaWRfY2xpZW50ZSddO1xyXG4gICAgdmFyICRub21icmVzICAgICAgICAgICA9ICQoXCIjdS1jbGllbnQtbmFtZVwiKTtcclxuICAgIHZhciAkYXBlbGxpZG9zICAgICAgICAgPSAkKFwiI3UtY2xpZW50LWxhc3RuYW1lXCIpO1xyXG4gICAgdmFyICRjZWR1bGEgICAgICAgICAgICA9ICQoXCIjdS1jbGllbnQtZG5pXCIpO1xyXG4gICAgdmFyICRjZWx1bGFyICAgICAgICAgICA9ICQoXCIjdS1jbGllbnQtcGhvbmVcIik7XHJcbiAgICB2YXIgJHByb3ZpbmNpYSAgICAgICAgID0gJChcIiN1LWNsaWVudC1wcm92aW5jaWFcIik7XHJcbiAgICB2YXIgJHNlY3RvciAgICAgICAgICAgID0gJChcIiN1LWNsaWVudC1zZWN0b3JcIik7XHJcbiAgICB2YXIgJGNhbGxlICAgICAgICAgICAgID0gJChcIiN1LWNsaWVudC1zdHJlZXRcIik7XHJcbiAgICB2YXIgJGNhc2EgICAgICAgICAgICAgID0gJCgnI3UtY2xpZW50LWhvdXNlJyk7XHJcbiAgICB2YXIgJGRldGFsbGVzRGlyZWNjaW9uID0gJCgnI3UtY2xpZW50LWRpcmVjdGlvbi1kZXRhaWxzJyk7XHJcbiAgICB2YXIgJHRlbGVmb25vICAgICAgICAgID0gJCgnI3UtY2xpZW50LXRlbGVwaG9uZScpO1xyXG4gICAgdmFyICRsdWdhclRyYWJham8gICAgICA9ICQoJyN1LWNsaWVudC1qb2InKTtcclxuICAgIHZhciAkdGVsVHJhYmFqbyAgICAgICAgPSAkKCcjdS1jbGllbnQtam9iLXRlbGVwaG9uZScpO1xyXG4gICAgdmFyICRpbmdyZXNvcyAgICAgICAgICA9ICQoJyN1LWNsaWVudC1zYWxhcnknKTtcclxuXHJcbiAgICAkbm9tYnJlcy52YWwoY2xpZW50Wydub21icmVzJ10pO1xyXG4gICAgJGFwZWxsaWRvcy52YWwoY2xpZW50WydhcGVsbGlkb3MnXSk7XHJcbiAgICAkY2VkdWxhLnZhbChjbGllbnRbJ2NlZHVsYSddKTtcclxuICAgICRjZWx1bGFyLnZhbChjbGllbnRbJ2NlbHVsYXInXSk7XHJcbiAgICAkcHJvdmluY2lhLnZhbChjbGllbnRbJ3Byb3ZpbmNpYSddKTtcclxuICAgICRzZWN0b3IudmFsKGNsaWVudFsnc2VjdG9yJ10pO1xyXG4gICAgJGNhbGxlLnZhbChjbGllbnRbJ2NhbGxlJ10pO1xyXG4gICAgJGNhc2EudmFsKGNsaWVudFsnY2FzYSddKTtcclxuICAgICRkZXRhbGxlc0RpcmVjY2lvbi52YWwoY2xpZW50WydkZXRhbGxlc19kaXJlY2Npb24nXSk7XHJcbiAgICAkdGVsZWZvbm8udmFsKGNsaWVudFsndGVsZWZvbm8nXSk7XHJcbiAgICAkbHVnYXJUcmFiYWpvLnZhbChjbGllbnRbJ2x1Z2FyX3RyYWJham8nXSk7XHJcbiAgICAkdGVsVHJhYmFqby52YWwoY2xpZW50Wyd0ZWxfdHJhYmFqbyddKTtcclxuICAgICRpbmdyZXNvcy52YWwoY2xpZW50WydzYWxhcmlvJ10pO1xyXG5cclxuICAgICQoXCIjdXBkYXRlLWNsaWVudC1tb2RhbFwiKS5tb2RhbCgpO1xyXG4gICAgJChcIiNidG4tdXBkYXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHVwZGF0ZUNsaWVudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2xpZW50KCkge1xyXG4gICAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFskbm9tYnJlcy52YWwoKSwgJGFwZWxsaWRvcy52YWwoKSwgJGNlZHVsYS52YWwoKSwgJGNlbHVsYXIudmFsKCksICRwcm92aW5jaWEudmFsKCksICRzZWN0b3IudmFsKCksICRjYWxsZS52YWwoKSxcclxuICAgICAgICAkY2FzYS52YWwoKSwgJHRlbGVmb25vLnZhbCgpXHJcbiAgICAgIF0pO1xyXG5cclxuICAgICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICAgIGZvcm0gPSAnaWQ9JyArIGlkICsgJyZub21icmVzPScgKyAkbm9tYnJlcy52YWwoKSArIFwiJmFwZWxsaWRvcz1cIiArICRhcGVsbGlkb3MudmFsKCkgKyBcIiZjZWR1bGE9XCIgKyBnZXRWYWwoJGNlZHVsYSk7XHJcbiAgICAgICAgZm9ybSArPSBcIiZjZWx1bGFyPVwiICsgZ2V0VmFsKCRjZWx1bGFyKSArIFwiJnByb3ZpbmNpYT1cIiArICRwcm92aW5jaWEudmFsKCkgKyBcIiZzZWN0b3I9XCIgKyAkc2VjdG9yLnZhbCgpICsgXCImY2FsbGU9XCIgKyAkY2FsbGUudmFsKCk7XHJcbiAgICAgICAgZm9ybSArPSBcIiZjYXNhPVwiICsgJGNhc2EudmFsKCkrIFwiJmRldGFsbGVzX2RpcmVjY2lvbj1cIiArICRkZXRhbGxlc0RpcmVjY2lvbi52YWwoKSAgKyBcIiZ0ZWxlZm9ubz1cIiArIGdldFZhbCgkdGVsZWZvbm8pICsgXCImbHVnYXJfdHJhYmFqbz1cIiArICRsdWdhclRyYWJham8udmFsKCkgKyBcIiZ0ZWxfdHJhYmFqbz1cIjtcclxuICAgICAgICBmb3JtICs9IGdldFZhbCgkdGVsVHJhYmFqbykgKyBcIiZ0YWJsYT1jbGllbnRlc1wiO1xyXG4gICAgICAgIGZvcm0gKz0gXCImaW5ncmVzb3M9XCIgKyAkaW5ncmVzb3MudmFsKCk7XHJcblxyXG4gICAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgaW5pdENsaWVudEhhbmRsZXJzLCBudWxsLCBmb3JtLCBDbGllbnRzLmdldEFsbCk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzYXZlT2JzZXJ2YXRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgb2JzZXJ2YXRpb25zLGlkQ2xpZW50ZTtcclxuIFxyXG4gICAgb2JzZXJ2YXRpb25zID0gJChcIiN0ZXh0LW9ic2VydmF0aW9uc1wiKS52YWwoKTtcclxuICAgIGlkQ2xpZW50ZSAgICA9ICQoXCIjZGV0YWlsLWNsaWVudC1pZFwiKS52YWwoKTtcclxuIFxyXG4gICAgZm9ybSA9ICdvYnNlcnZhY2lvbmVzPScgKyBvYnNlcnZhdGlvbnMgKyBcIiZ0YWJsYT1vYnNlcnZhY2lvbmVzJmlkX2NsaWVudGU9XCIgKyBpZENsaWVudGU7XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwpXHJcbiAgfSxcclxuICBcclxuICB1cGRhdGVTdGF0ZTogZnVuY3Rpb24gKGNsaWVudCkge1xyXG4gICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGNsaWVudCkrICcmbW9kdWxlPWNsaWVudGVzJmFjdGlvbj11cGRhdGUnO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRqc29uJyx0cnVlLG51bGwsbnVsbCxmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBHZW5lcmFscyA9IHtcclxuICBkZWxldGVSb3c6IGZ1bmN0aW9uIChpZCwgdGFibGEpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1cIiArIHRhYmxhICsgXCImaWQ9XCIgKyBpZDtcclxuICAgIHZhciBoYW5kbGVycywgY2FsbGJhY2s7XHJcbiAgICBzd2l0Y2ggKHRhYmxhKSB7XHJcbiAgICAgIGNhc2UgJ2NsaWVudGVzJzpcclxuICAgICAgICBjYWxsYmFjayA9IENsaWVudHMuZ2V0QWxsO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzZXJ2aWNpb3MnOlxyXG4gICAgICAgIGNhbGxiYWNrID0gU2VydmljZXMuZ2V0QWxsO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZGVsZXRlJywgdHJ1ZSxudWxsLCBudWxsLCBmb3JtLCBjYWxsYmFjayk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBTZWFyY2ggbWFuZGEgdW4gbWVuc2FqZSBhbCBzZXJ2aWRvciBkZSBsb3MgdmFsb3JlcyBhIGJ1c2NhclxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IGVsIHZhbG9yIGEgc2VyIGJ1c2NhZG9cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGJUYWJsZSBub21icmUgZGUgbGEgdGFibGEgZG9uZGUgc2UgZGVzZWEgY29uc3VsdGFyIGVuIGxhIGJhc2UgZGUgZGF0b3NcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmaWxsVGFibGVGdW5jdGlvbiBmdW5jaW9uIGRlIGxsZW5hZG8gZGUgdGFibGEgZG9uZGUgc2UgbW9zdHJhcmFuIGxvcyByZXN1bHRhZG9zIFxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXJGdW5jdGlvbiBmdW5jaW9uIHJlaW5pY2lvIGRlIGxvcyBlbGVtZW50b3MgZW4gbG9zIGhhbmRsZXJzIFxyXG4gICAqL1xyXG4gIFxyXG4gIHNlYXJjaDogZnVuY3Rpb24gKHRleHQsIGRiVGFibGUsIGZpbGxUYWJsZUZ1bmN0aW9uLCBoYW5kbGVyRnVuY3Rpb24pIHtcclxuICAgIGlmIChoYW5kbGVyRnVuY3Rpb24gPT0gdW5kZWZpbmVkKSBoYW5kbGVyRnVuY3Rpb24gPSBpbml0Q2xpZW50SGFuZGxlcnM7XHJcbiAgICBpZiAoZmlsbFRhYmxlRnVuY3Rpb24gPT0gdW5kZWZpbmVkKSBmaWxsVGFibGVGdW5jdGlvbiA9IGZpbGxDdXJyZW50VGFibGU7XHJcbiAgICB2YXIgd29yZCA9IHRleHQ7XHJcbiAgICBpZiAod29yZCAhPSBudWxsIHx8IHdvcmQgIT0gXCJcIikge1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9XCIgKyBkYlRhYmxlICsgXCImd29yZD1cIiArIHdvcmQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3NlYXJjaCcsIGZhbHNlLCBoYW5kbGVyRnVuY3Rpb24sIGZpbGxUYWJsZUZ1bmN0aW9uLCBmb3JtLCBudWxsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjb3VudF90YWJsZTogZnVuY3Rpb24gKHRhYmxlKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9XCIgKyB0YWJsZTtcclxuICAgIHZhciB1cGRhdGVGdW5jdGlvbiA9IHVwZGF0ZUNvdW50O1xyXG4gICAgaWYgKHRhYmxlID09ICdjYWphJykgdXBkYXRlRnVuY3Rpb24gPSB1cGRhdGVDYWphQ291bnRcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2NvdW50JywgZmFsc2UsIG51bGwsIHVwZGF0ZUZ1bmN0aW9uLCBmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBTZXJ2aWNlcyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBuYW1lLCBkZXNjcmlwdGlvbiwgcGF5bWVudCwgdHlwZTtcclxuXHJcbiAgICBuYW1lICAgICAgICA9ICQoXCIjc2VydmljZS1uYW1lXCIpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKFwiI3NlcnZpY2UtZGVzY3JpcHRpb25cIikudmFsKCk7XHJcbiAgICBwYXltZW50ICAgICA9ICQoXCIjc2VydmljZS1tb250aGx5LXBheW1lbnRcIikudmFsKCk7XHJcbiAgICB0eXBlICAgICAgICA9ICQoXCIjc2VydmljZS10eXBlXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW25hbWUsIGRlc2NyaXB0aW9uLCBwYXltZW50LCB0eXBlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbm9tYnJlPScgKyBuYW1lICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbiArIFwiJm1lbnN1YWxpZGFkPVwiICsgcGF5bWVudCArIFwiJnRpcG89XCIgKyB0eXBlO1xyXG4gICAgICBmb3JtICs9IFwiJnRhYmxhPXNlcnZpY2lvc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvYWRkXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFNlcnZpY2VzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPXNlcnZpY2lvc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIHNlcnZpY2VUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBpZCwgbmFtZSwgZGVzY3JpcHRpb24sIHBheW1lbnQsIHR5cGU7XHJcblxyXG4gICAgaWQgICAgICAgICAgPSAkKCcjdS1zZXJ2aWNlLWlkJykudmFsKCk7XHJcbiAgICBuYW1lICAgICAgICA9ICQoJyN1LXNlcnZpY2UtbmFtZScpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKCcjdS1zZXJ2aWNlLWRlc2NyaXB0aW9uJykudmFsKCk7XHJcbiAgICBwYXltZW50ICAgICA9ICQoJyN1LXNlcnZpY2UtbW9udGhseS1wYXltZW50JykudmFsKCk7XHJcbiAgICB0eXBlICAgICAgICA9ICQoJyN1LXNlcnZpY2UtdHlwZScpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2lkLCBuYW1lLCBkZXNjcmlwdGlvbiwgcGF5bWVudCwgdHlwZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX3NlcnZpY2lvPScgKyBpZCArIFwiJm5vbWJyZT1cIiArIG5hbWUgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uICsgXCImbWVuc3VhbGlkYWQ9XCIgKyBwYXltZW50O1xyXG4gICAgICBmb3JtICs9IFwiJnRpcG89XCIgKyB0eXBlICsgXCImdGFibGE9c2VydmljaW9zXCI7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgU2VydmljZXMuZ2V0QWxsLGhlYXZ5TG9hZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxudmFyIENvbnRyYWN0cyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uIGFkZE5ld0NvbnRyYWN0KCkge1xyXG4gICAgdmFyIGZvcm0sIHRhYmxlLCBjbGllbnRfaWQsIHVzZXJfaWQsIHNlcnZpY2VfaWQsIGNvZGUsIGNvbnRyYWN0X2RhdGUsIHBheW1lbnQsIGR1cmF0aW9uLFxyXG4gICAgICBlcXVpcG1lbnQsIGVNYWMsIHJvdXRlciwgck1hYywgdG90YWwsIG5leHRQYXltZW50LCBtb2RlbCwgaXA7XHJcblxyXG4gICAgY2xpZW50X2lkICAgICA9ICQoXCIjY29udHJhY3QtY2xpZW50LWlkXCIpLnZhbCgpO1xyXG4gICAgdXNlcl9pZCAgICAgICA9ICQoXCIjY29udHJhY3QtdXNlci1pZFwiKS52YWwoKTtcclxuICAgIHNlcnZpY2VfaWQgICAgPSAkKFwiLnNlcnZpY2UtY2FyZC5zZWxlY3RlZFwiKS5hdHRyKCdkYXRhLWlkJyk7XHJcbiAgICBjb250cmFjdF9kYXRlID0gJCgnI2NvbnRyYWN0LWNsaWVudC1kYXRlJykudmFsKCk7XHJcbiAgICBkdXJhdGlvbiAgICAgID0gJCgnI2NvbnRyYWN0LWNsaWVudC1tb250aHMnKS52YWwoKTtcclxuICAgIGVxdWlwbWVudCAgICAgPSAkKCcjY29udHJhY3QtZXF1aXBtZW50JykudmFsKCk7XHJcbiAgICBlTWFjICAgICAgICAgID0gJCgnI2NvbnRyYWN0LWUtbWFjJykudmFsKCk7XHJcbiAgICByb3V0ZXIgICAgICAgID0gJCgnI2NvbnRyYWN0LXJvdXRlcicpLnZhbCgpO1xyXG4gICAgck1hYyAgICAgICAgICA9ICQoJyNjb250cmFjdC1yLW1hYycpLnZhbCgpO1xyXG4gICAgbW9kZWwgICAgICAgICA9ICQoJyNjb250cmFjdC1lcXVpcG1lbnQtbW9kZWwnKS52YWwoKTtcclxuICAgIGlwICAgICAgICAgICAgPSAkKCcjY29udHJhY3QtaXAnKS52YWwoKTtcclxuICAgIGNvZGUgICAgICAgICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpLnZhbCgpO1xyXG5cclxuICAgIHBheW1lbnQgPSAkKFwiI2NvbnRyYWN0LWNsaWVudC1wYXltZW50XCIpLnZhbCgpO1xyXG4gICAgbmV4dFBheW1lbnQgPSBtb21lbnQoY29udHJhY3RfZGF0ZSkuYWRkKDEsICdtb250aHMnKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtjbGllbnRfaWQsIHVzZXJfaWQsIHNlcnZpY2VfaWQsIGNvbnRyYWN0X2RhdGUsIGR1cmF0aW9uXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIHRvdGFsID0gKE51bWJlcihkdXJhdGlvbikgKyAxKSAqIE51bWJlcihwYXltZW50KTtcclxuICAgICAgZm9ybSA9ICdpZF9lbXBsZWFkbz0nICsgdXNlcl9pZCArIFwiJmlkX2NsaWVudGU9XCIgKyBjbGllbnRfaWQgKyBcIiZpZF9zZXJ2aWNpbz1cIiArIHNlcnZpY2VfaWQgKyBcIiZjb2RpZ289XCIgKyBjb2RlICsgXCImZmVjaGE9XCIgKyBjb250cmFjdF9kYXRlO1xyXG4gICAgICBmb3JtICs9IFwiJmR1cmFjaW9uPVwiICsgZHVyYXRpb24gKyBcIiZtb250b190b3RhbD1cIiArIHRvdGFsICsgXCImbW9udG9fcGFnYWRvPTAmdWx0aW1vX3BhZ289bnVsbFwiO1xyXG4gICAgICBmb3JtICs9IFwiJm1lbnN1YWxpZGFkPVwiICsgcGF5bWVudCArIFwiJnByb3hpbW9fcGFnbz1cIiArIG5leHRQYXltZW50ICsgXCImZXN0YWRvPWFjdGl2byZ0YWJsYT1jb250cmF0b3NcIjtcclxuICAgICAgZm9ybSArPSBcIiZub21icmVfZXF1aXBvPVwiICsgZXF1aXBtZW50ICsgXCImbWFjX2VxdWlwbz1cIiArIGVNYWMgKyBcIiZyb3V0ZXI9XCIgKyByb3V0ZXIgKyBcIiZtYWNfcm91dGVyPVwiICsgck1hYztcclxuICAgICAgZm9ybSArPSBcIiZtb2RlbG89XCIgKyBtb2RlbCArIFwiJmlwPVwiICsgaXA7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9hZGRcIiwgbnVsbCwgbnVsbCwgQ29udHJhY3RzLmdldExhc3QsIGZvcm0sIG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNvbnRyYXRvc1wiO1xyXG4gICAgdmFyIGNhbGxiYWNrID0gbnVsbFxyXG4gICAgdmFyIHJlZnJlc2ggPSBjb250cmFjdFRhYmxlLnJlZnJlc2g7XHJcbiAgICBpZiAoY29udHJhY3RUYWJsZS5lbCA9PSAnZGV0YWxsZXMnKSB7XHJcbiAgICAgIGNhbGxiYWNrID0gUGF5bWVudHMuZ2V0QWxsKClcclxuICAgICAgcmVmcmVzaCA9IG51bGxcclxuICAgIH1cclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCByZWZyZXNoLCBmb3JtLCBjYWxsYmFjayk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0TGFzdDogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAkKFwiI2J0bi1zYXZlLWNvbnRyYWN0XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgICQoXCIjYnRuLXByaW50LWNvbnRyYWN0XCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgIGlmKGRhdGEudGFibGFfcGFnb3Mpe1xyXG4gICAgICBtYWtlUGF5bWVudExpc3QoZGF0YS50YWJsYV9wYWdvcyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY2FsbEV4dHJhOiBmdW5jdGlvbihjb250ZXh0KSB7XHJcbiAgICB2YXIgcm93XHJcbiAgICBpZiAoY29udGV4dCA9PSBcImRldGFpbHNcIil7XHJcbiAgICAgIHJvdyA9IGRldGFpbHNDb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcm93ID0gY29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAocm93KSB7XHJcbiAgICAgICQoXCIjZXh0cmEtY2xpZW50LWRuaVwiKS52YWwocm93LmNlZHVsYSk7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRBbGxPZkNsaWVudChyb3cuY2VkdWxhKTtcclxuICAgICAgJCgnI2FkZC1leHRyYS1tb2RhbCcpLm1vZGFsKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiU2VsZWNjaW9uZSBlbCBjb25yYXRvIHByaW1lcm9cIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjYW5jZWw6IGZ1bmN0aW9uKHJvdyxjYWxsYmFjaykge1xyXG4gICAgdmFyIGlzX3BlbmFsdHkgPSBmYWxzZTtcclxuICAgIHZhciByZWFzb24gICAgID0gJChcIiNjYW5jZWxhdGlvbi1yZWFzb25cIikudmFsKCk7XHJcbiAgICB2YXIgY2hlY2tlZCAgICA9ICQoXCIjY2hlY2stcGVuYWx0eTpjaGVja2VkXCIpLmxlbmd0aDtcclxuICAgIHZhciBmb3JtLCBmZWNoYTtcclxuICAgIGNvbnNvbGUubG9nKHJvdylcclxuICAgIGlmKHJvdy5pZCl7XHJcbiAgICAgIGlmIChjaGVja2VkID4gMCkge1xyXG4gICAgICAgIGlzX3BlbmFsdHkgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGZlY2hhID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgcm93LmlkICsgJyZmZWNoYT0nICsgZmVjaGEgKyAnJmlkX2NsaWVudGU9JyArIHJvdy5pZF9jbGllbnRlO1xyXG4gICAgICBmb3JtICs9IFwiJm1vdGl2bz1cIiArIHJlYXNvbiArIFwiJnBlbmFsaWRhZD1cIiArIGlzX3BlbmFsdHk7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2NhbmNlbCcsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIGNhbGxiYWNrKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0VSUk9SICtcIiBObyBoYXkgY29udHJhdG8gc2VsZWNjaW9uYWRvXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldE9uZTogZnVuY3Rpb24oaWRfY29udHJhdG8sIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1jb250cmF0b3MmaWRfY29udHJhdG89XCIgKyBpZF9jb250cmF0bztcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRvbmVcIiwgZmFsc2UsIG51bGwsIHJlY2VpdmVyLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHJlY2lldmU6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgIHZhciBjb250cmFjdCAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB0aGlzLmlkX2NvbnRyYXRvID0gY29udHJhY3RbJ2lkX2NvbnRyYXRvJ107XHJcbiAgICB2YXIgJGVxdWlwbyAgICAgPSAkKFwiI3UtY29udHJhY3QtZXF1aXBtZW50XCIpO1xyXG4gICAgdmFyICRtYWNFcXVpcG8gID0gJChcIiN1LWNvbnRyYWN0LWUtbWFjXCIpO1xyXG4gICAgdmFyICRyb3V0ZXIgICAgID0gJChcIiN1LWNvbnRyYWN0LXJvdXRlclwiKTtcclxuICAgIHZhciAkbWFjUm91dGVyICA9ICQoXCIjdS1jb250cmFjdC1yLW1hY1wiKTtcclxuICAgIHZhciAkbW9kZWxvICAgICA9ICQoXCIjdS1jb250cmFjdC1tb2RlbG9cIik7XHJcbiAgICB2YXIgJGNvZGlnbyAgICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpO1xyXG4gICAgdmFyICRpc0NoYW5nZUlwID0gJChcIiNjaGVjay1jaGFuZ2UtaXBcIik7XHJcbiAgICB2YXIgJGlwICAgICAgICAgPSAkKFwiI3UtY29udHJhY3QtaXBcIik7XHJcblxyXG4gICAgJGVxdWlwby52YWwoY29udHJhY3RbJ25vbWJyZV9lcXVpcG8nXSk7XHJcbiAgICAkbWFjRXF1aXBvLnZhbChjb250cmFjdFsnbWFjX2VxdWlwbyddKTtcclxuICAgICRyb3V0ZXIudmFsKGNvbnRyYWN0Wydyb3V0ZXInXSk7XHJcbiAgICAkbWFjUm91dGVyLnZhbChjb250cmFjdFsnbWFjX3JvdXRlciddKTtcclxuICAgICRtb2RlbG8udmFsKGNvbnRyYWN0Wydtb2RlbG8nXSk7XHJcbiAgICAkaXAudmFsKGNvbnRyYWN0WydpcCddKTtcclxuXHJcbiAgICAvLyAkKFwiI3VwZGF0ZS1jb250cmFjdC1tb2RhbCBzZWxlY3RcIikudmFsKCcnKVxyXG4gICAgJChcIiN1cGRhdGUtY29udHJhY3QtbW9kYWxcIikubW9kYWwoKTtcclxuICAgICQoXCIjdXBkYXRlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHVwZGF0ZUNvbnRyYWN0KGlkX2NvbnRyYXRvKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRyYWN0KGlkX2NvbnRyYXRvKSB7XHJcbiAgICAgIHZhciBjaGVja2VkID0gJChcIiNjaGVjay1jaGFuZ2UtaXA6Y2hlY2tlZFwiKS5sZW5ndGg7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGlkX2NvbnRyYXRvICsgJyZub21icmVfZXF1aXBvPScgKyAkZXF1aXBvLnZhbCgpICsgXCImbWFjX2VxdWlwbz1cIiArICRtYWNFcXVpcG8udmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImcm91dGVyPVwiICsgJHJvdXRlci52YWwoKSArIFwiJm1hY19yb3V0ZXI9XCIgKyAkbWFjUm91dGVyLnZhbCgpO1xyXG4gICAgICBmb3JtICs9IFwiJm1vZGVsbz1cIiArICRtb2RlbG8udmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImdGFibGE9Y29udHJhdG9zXCI7XHJcbiAgICAgIGlmIChjaGVja2VkID4gMCkge1xyXG4gICAgICAgIGZvcm0gKz0gXCImaXA9XCIgKyAkaXAudmFsKCkgKyBcIiZjb2RpZ289XCIgKyAkY29kaWdvLnZhbCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0SXBMaXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VjdGlvbl9pZCA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0LXNlY3RvclwiKS52YWwoKTtcclxuICAgIHZhciBmb3JtID0gXCJpZF9zZWNjaW9uPVwiICsgc2VjdGlvbl9pZCArIFwiJnRhYmxhPWlwX2xpc3RcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRhbGxcIiwgZmFsc2UsIG51bGwsIG1ha2VJcExpc3QsIGZvcm0sIG51bGwpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VJcExpc3QoY29udGVudCkge1xyXG4gICAgICAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpLmh0bWwoY29udGVudCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYnRuRXh0cmFQcmVzc2VkOiBmdW5jdGlvbiAoJHRoaXMpIHtcclxuICAgIHZhciBidXR0b25JZCA9ICR0aGlzLnRleHQoKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBzd2l0Y2ggKGJ1dHRvbklkKSB7XHJcbiAgICAgIGNhc2UgXCJtZWpvcmFyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLnVwZ3JhZGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImV4dGVuZGVyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLmV4dGVuZCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZ3VhcmRhclwiOlxyXG4gICAgICAgIENvbnRyYWN0cy5hZGRFeHRyYSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZ3JhZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBzZWxlY3RlZFNlcnZpY2UsIHNlcnZpY2VJZCwgYW1vdW50O1xyXG5cclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIHNlbGVjdGVkU2VydmljZSA9ICQoXCIuc2VydmljZS1jYXJkLnNlbGVjdGVkXCIpO1xyXG4gICAgc2VydmljZUlkID0gc2VsZWN0ZWRTZXJ2aWNlLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgYW1vdW50ID0gc2VsZWN0ZWRTZXJ2aWNlLmF0dHIoXCJkYXRhLXBheW1lbnRcIik7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCwgc2VydmljZUlkLCBhbW91bnRdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgY29udHJhY3RJZCArIFwiJmlkX3NlcnZpY2lvPVwiICsgc2VydmljZUlkICsgXCImY3VvdGE9XCIgKyBhbW91bnQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZ3JhZGUnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZWNvbm5lY3Q6IGZ1bmN0aW9uIChjb250cmFjdElkLGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgZm9ybSwgc2VsZWN0ZWRTZXJ2aWNlLCBzZXJ2aWNlSWQsIGR1cmF0aW9uLCBkYXRlLHNlbmQsIGlzX2VtcHR5LGluZm87XHJcblxyXG4gICAgc2VsZWN0ZWRTZXJ2aWNlID0gJChcIi5zZXJ2aWNlLWNhcmQuc2VsZWN0ZWRcIik7XHJcbiAgICBzZXJ2aWNlSWQgPSBzZWxlY3RlZFNlcnZpY2UuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICBkdXJhdGlvbiAgPSAkKFwiI3JlY29ubmVjdGlvbi1tb250aHNcIikudmFsKCk7XHJcbiAgICBkYXRlID0gJChcIiNyZWNvbm5lY3Rpb24tZGF0ZVwiKS52YWwoKVxyXG4gICAgaXNfZW1wdHkgPSBpc0VtcHR5KFtjb250cmFjdElkLHNlcnZpY2VJZCxkYXRlLGR1cmF0aW9uXSk7XHJcbiAgICBpZighaXNfZW1wdHkpe1xyXG4gICAgICBpbmZvID0ge1xyXG4gICAgICAgICdpZF9jb250cmF0byc6IGNvbnRyYWN0SWQsXHJcbiAgICAgICAgJ2ZlY2hhJzogZGF0ZSxcclxuICAgICAgICAnaWRfc2VydmljaW8nOiBzZXJ2aWNlSWQsXHJcbiAgICAgICAgJ2R1cmFjaW9uJzogZHVyYXRpb25cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9ybSA9IFwiZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KGluZm8pO1xyXG4gICAgICBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArIFwiY29udHJhY3QvcmVjb25uZWN0XCIsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIGRpc3BsYXlNZXNzYWdlKHJlcy5kYXRhLm1lbnNhamUpO1xyXG4gICAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgICAgICQoXCIjYnRuLXJlY29ubmVjdFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgJChcIi5yZWNvbm5lY3QtY2FsbGVyXCIpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgaWYoY2FsbGJhY2spXHJcbiAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIHN3YWwoXCJMbGVuZSB0b2RvcyBsb3MgY2FtcG9zXCIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYWRkRXh0cmE6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBleHRyYVNlcnZpY2UsIHNlcnZpY2VDb3N0LCBlcXVpcG1lbnQsIGVNYWMsIHJvdXRlciwgck1hYyxwYXltZW50TW9kZTtcclxuXHJcbiAgICBjb250cmFjdElkID0gJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICBzZXJ2aWNlQ29zdCA9ICQoXCIjZXh0cmEtc2VydmljZS1jb3N0XCIpLnZhbCgpO1xyXG4gICAgZXh0cmFTZXJ2aWNlID0gJChcIiNzZWxlY3QtZXh0cmEtc2VydmljZVwiKS52YWwoKTtcclxuICAgIGVxdWlwbWVudCA9ICQoXCIjZXh0cmEtZXF1aXBvXCIpLnZhbCgpO1xyXG4gICAgZU1hYyA9ICQoXCIjZXh0cmEtZS1tYWNcIikudmFsKCk7XHJcbiAgICByb3V0ZXIgPSAkKFwiI2V4dHJhLXJvdXRlclwiKS52YWwoKTtcclxuICAgIHJNYWMgPSAkKFwiI2V4dHJhLXItbWFjXCIpLnZhbCgpO1xyXG4gICAgcGF5bWVudE1vZGUgPSAkKFwiI3NlbGVjdC1wYXltZW50LW1vZGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCwgZXh0cmFTZXJ2aWNlLCBzZXJ2aWNlQ29zdCxwYXltZW50TW9kZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyBjb250cmFjdElkICsgXCImY29zdG9fc2VydmljaW89XCIgKyBzZXJ2aWNlQ29zdCArIFwiJm5vbWJyZV9zZXJ2aWNpbz1cIiArIGV4dHJhU2VydmljZTtcclxuICAgICAgZm9ybSArPSAnJm5vbWJyZV9lcXVpcG89JyArIGVxdWlwbWVudCArIFwiJm1hY19lcXVpcG89XCIgKyBlTWFjICsgXCImcm91dGVyPVwiICsgcm91dGVyICsgXCImbWFjX3JvdXRlcj1cIiArIHJNYWM7XHJcbiAgICAgIGZvcm0gKz0gJyZtb2RvX3BhZ289JyArIHBheW1lbnRNb2RlO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9hZGRleHRyYScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBleHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBkdXJhdGlvbjtcclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIGR1cmF0aW9uID0gJChcIiNleHRyYS1leHRlbnNpb24tbW9udGhzXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2R1cmF0aW9uLCBjb250cmFjdElkXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGNvbnRyYWN0SWQgKyBcIiZkdXJhY2lvbj1cIiArIGR1cmF0aW9uO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9leHRlbmRfY29udHJhY3QnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGxPZkNsaWVudDogZnVuY3Rpb24oZG5pKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwiZG5pPVwiICsgZG5pO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2RhdGFfZm9yX2V4dHJhXCIsIGZhbHNlLCBudWxsLCBtYWtlQ29udHJhY3RMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICAvLyBOb3RlOiBsbyBzaWVudG8sIGRlIGFxdWkgZW4gYWRlbGFudGUgdXNvIGF4aW9zLCBlcyBtdWNobyBtYXMgY29tb2RvXHJcblxyXG4gIHN1c3BlbmQ6IGZ1bmN0aW9uIChjb250cmFjdElkLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeSh7aWRfY29udHJhdG86IGNvbnRyYWN0SWR9KVxyXG4gICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2NvbnRyYWN0L3N1c3BlbmQnLGZvcm0pO1xyXG4gICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgIHZhciBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgQ29udHJhY3RzLmdldEFsbCgpO1xyXG4gICAgICBpZihjYWxsYmFjaylcclxuICAgICAgICBjYWxsYmFjaygpXHJcbiAgICB9KVxyXG4gICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG52YXIgUGF5bWVudHMgPSB7XHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaWQgPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIGlmIChpZCAhPSBudWxsKSB7XHJcbiAgICAgIHZhciBmb3JtID0gXCJ0YWJsYT1wYWdvcyZpZD1cIiArIGlkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgcGF5bWVudFRhYmxlLnJlZnJlc2gsIGZvcm0sIFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgdmFyIGRhdGUgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICB2YXIgaWRfY29udHJhdG8gPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPXBhZ29zJmlkPVwiICsgaWQgKyBcIiZlc3RhZG89cGFnYWRvJmZlY2hhX3BhZ289XCIgKyBkYXRlICsgXCImaWRfY29udHJhdG89XCIgKyBpZF9jb250cmF0bztcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBzYXZlQWJvbm9zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgb2JzZXJ2YXRpb25zLCBhYm9ubyRpbnB1dEFib25vLCR0ZXh0QWJvbm8sY29udHJhY3RJZDtcclxuXHJcbiAgICAkdGV4dEFib25vICAgPSAkKCcjdGV4dC1hYm9uby1kZXRhaWwnKTtcclxuICAgIG9ic2VydmF0aW9ucyA9ICR0ZXh0QWJvbm8udmFsKCk7XHJcbiAgICBjb250cmFjdElkICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgICRpbnB1dEFib25vICA9ICQoXCIjaW5wdXQtYWJvbm9cIik7XHJcbiAgICBhYm9ubyAgICAgICAgPSAkaW5wdXRBYm9uby52YWwoKTtcclxuXHJcbiAgICBmb3JtID0gJ29ic2VydmFjaW9uZXM9JyArIG9ic2VydmF0aW9ucyArIFwiJmFib25vcz1cIiArIGFib25vO1xyXG4gICAgZm9ybSArPSBcIiZjb250cmF0b19hYm9ubz1cIitjb250cmFjdElkK1wiJnRhYmxhPWFib25vc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpXHJcbiAgICAkaW5wdXRBYm9uby52YWwoJycpXHJcbiAgfSxcclxuXHJcbiAgc2F2ZUV4dHJhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAncHJvY2Vzcy8nKVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVVudGlsOiBmdW5jdGlvbihjb250cmFjdElkLGxhc3RQYXltZW50SWQpe1xyXG4gICAgdmFyIGlkX2NvbnRyYXRvID0gJChcIiNzZWxlY3QtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9cGFnb3NfYWxfZGlhJmlkX3VsdGltb19wYWdvPVwiICsgbGFzdFBheW1lbnRJZCArIFwiJmVzdGFkbz1wYWdhZG8maWRfY29udHJhdG89XCIgKyBjb250cmFjdElkO1xyXG4gICAgdmFyIGhhbmRsZXJzLCBjYWxsYmFjaztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwsIGhlYXZ5TG9hZCk7XHJcbiAgfSxcclxuICAgIFxyXG4gIHJlbW92ZVBheW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWRlc2hhY2VyX3BhZ28maWRfcGFnbz1cIiArIGlkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBjb250cmFjdFJlZnJlc2g6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaWRfY2xpZW50ZSA9ICQoJyNkZXRhaWwtY2xpZW50LWlkJykudmFsKClcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jb250cmF0b3NfY2xpZW50ZSZpZD1cIiArIGlkX2NsaWVudGU7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgZGV0YWlsc0NvbnRyYWN0VGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0T25lOiBmdW5jdGlvbihpZF9wYWdvLCByZWNlaXZlcikge1xyXG4gICAgZm9ybSA9IFwidGFibGE9cGFnb3MmaWRfcGFnbz1cIiArIGlkX3BhZ287XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvZ2V0b25lXCIsIGZhbHNlLCBudWxsLCByZWNlaXZlciwgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICByZWNlaXZlRm9yRWRpdDogZnVuY3Rpb24oY29udGVudCl7XHJcbiAgICB2YXIgZGF0YSAgICAgICAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB2YXIgcGFnbyAgICAgICAgICA9IGRhdGEucGFnb1xyXG4gICAgdmFyIHNldHRpbmdzICAgICAgPSBkYXRhLnNldHRpbmdzO1xyXG4gICAgdGhpcy5pZF9jb250cmF0byAgPSBwYWdvWydpZF9jb250cmF0byddO1xyXG4gICAgdGhpcy5pZF9wYWdvICAgICAgPSBwYWdvWydpZF9wYWdvJ11cclxuICAgIHZhciAkY29uY2VwdG8gICAgID0gJChcIiNwYXltZW50LWNvbmNlcHRcIik7XHJcbiAgICB2YXIgJGZlY2hhTGltaXRlICA9ICQoXCIjcGF5bWVudC1saW1pdC1kYXRlXCIpO1xyXG4gICAgdmFyICRzZXJ2aWNpb3NFeHRyYSA9ICQoXCIjcGF5bWVudC1leHRyYS1zZXJ2aWNlc1wiKTtcclxuICAgIHZhciAkY3VvdGEgICAgICAgID0gJChcIiNwYXltZW50LWN1b3RhXCIpO1xyXG4gICAgdmFyICRtb3JhICAgICAgICAgPSAkKFwiI3BheW1lbnQtbW9yYVwiKTtcclxuICAgIHZhciAkZXh0cmEgICAgICAgID0gJChcIiNwYXltZW50LWV4dHJhXCIpO1xyXG4gICAgdmFyICR0b3RhbCAgICAgICAgPSAkKFwiI3BheW1lbnQtdG90YWxcIik7XHJcbiAgICB2YXIgJGRlc2N1ZW50byAgICA9ICQoXCIjcGF5bWVudC1kaXNjb3VudC1hbW91bnRcIik7XHJcbiAgICB2YXIgJHJhem9uICAgICAgICA9ICQoXCIjcGF5bWVudC1kaXNjb3VudC1yZWFzb25cIik7XHJcbiAgICB2YXIgJG1vZGFsICAgICAgICA9ICQoXCIjYWR2YW5jZWQtcGF5bWVudFwiKTtcclxuICAgIHZhciAkY01vcmEgICAgICAgID0gJChcIiNjX21vcmFcIik7XHJcbiAgICB2YXIgJGNSZWNvbmV4aW9uICA9ICQoXCIjY19yZWNvbmV4aW9uXCIpO1xyXG5cclxuICAgICRjb25jZXB0by52YWwocGFnb1snY29uY2VwdG8nXSk7XHJcbiAgICAkZmVjaGFMaW1pdGUudmFsKHBhZ29bJ2ZlY2hhX2xpbWl0ZSddKTtcclxuICAgICRjdW90YS52YWwocGFnb1snY3VvdGEnXSk7XHJcbiAgICAkbW9yYS52YWwocGFnb1snbW9yYSddKTtcclxuICAgICRleHRyYS52YWwocGFnb1snbW9udG9fZXh0cmEnXSk7XHJcbiAgICAkdG90YWwudmFsKHBhZ29bJ3RvdGFsJ10pO1xyXG4gICAgJHNlcnZpY2lvc0V4dHJhLnZhbChwYWdvWydkZXRhbGxlc19leHRyYSddKTtcclxuICAgIGludGVyYWN0aXZlU3VtKCk7XHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCk7XHJcblxyXG4gICAgJG1vZGFsLm9uKCdoaWRlLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG4gICAgICAkbW9kYWwuZmluZCgnaW5wdXQnKS52YWwoJycpXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocGFnb1snbW9yYSddID4gMCkge1xyXG4gICAgICAkY01vcmEuaUNoZWNrKCdjaGVjaycpOyAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGNNb3JhLmlDaGVjaygndW5jaGVjaycpOyBcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHBhZ29bJ2RldGFsbGVzX2V4dHJhJ10uaW5jbHVkZXMoJ1JlY29uZXhpb24nKSkge1xyXG4gICAgICAkY1JlY29uZXhpb24uaUNoZWNrKCdjaGVjaycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGNSZWNvbmV4aW9uLmlDaGVjaygndW5jaGVjaycpOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNidG4tYXBwbHktZGlzY291bnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgaWYgKCRkZXNjdWVudG8udmFsKCkgPiAwKSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJTZWd1cm8gZGUgcXVlIHF1aWVyZSBhcGxpY2FyIGVzdGUgZGVzY3VlbnRvIGRlIFwiICsgJGRlc2N1ZW50by52YWwoKSArIFwiP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgYXBwbHkoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhcHBseSgpO1xyXG4gICAgICB9IFxyXG4gICAgfSk7XHJcblxyXG4gICAgJGNNb3JhLm9uKCdpZkNoZWNrZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBtb3JhID0gcGFnb1snY3VvdGEnXSAqIHNldHRpbmdzWydjYXJnb19tb3JhJ10gLyAxMDA7XHJcbiAgICAgICRtb3JhLnZhbChtb3JhKS50cmlnZ2VyKCdrZXl1cCcpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICRjUmVjb25leGlvbi5vbignaWZDaGVja2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkZXh0cmEudmFsKHNldHRpbmdzWydyZWNvbmV4aW9uJ10pLnRyaWdnZXIoJ2tleXVwJyk7XHJcbiAgICAgICRzZXJ2aWNpb3NFeHRyYS52YWwoJ1JlY29uZXhpb24nKTtcclxuICAgIH0pXHJcbiAgICBcclxuICAgICRjTW9yYS5vbignaWZVbmNoZWNrZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICRtb3JhLnZhbCgwKS50cmlnZ2VyKCdrZXl1cCcpO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgJGNSZWNvbmV4aW9uLm9uKCdpZlVuY2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJGV4dHJhLnZhbCgwKS50cmlnZ2VyKCdrZXl1cCcpO1xyXG4gICAgICAkc2VydmljaW9zRXh0cmEudmFsKCcnKTtcclxuICAgIH0pXHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGx5ICgpIHtcclxuICAgICAgYXBwbHlEaXNjb3VudChpZF9wYWdvKTtcclxuICAgICAgJG1vZGFsLmhpZGUoKTtcclxuICAgICAgJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgICAkKCcubW9kYWwtYmFja2Ryb3AnKS5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhcHBseURpc2NvdW50KGlkX3BhZ28pIHtcclxuICAgICAgdmFyIGRhdGUgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICBmb3JtID0gJ2lkX3BhZ289JyArIGlkX3BhZ28gKyAnJmlkX2NvbnRyYXRvPScgKyBpZF9jb250cmF0byArIFwiJmN1b3RhPVwiICsgJGN1b3RhLnZhbCgpO1xyXG4gICAgICBmb3JtICs9IFwiJm1vcmE9XCIgKyAkbW9yYS52YWwoKSArIFwiJm1vbnRvX2V4dHJhPVwiICsgJGV4dHJhLnZhbCgpO1xyXG4gICAgICBmb3JtICs9IFwiJnRvdGFsPVwiICsgJHRvdGFsLnZhbCgpICsgJyZkZXNjdWVudG89JyArICRkZXNjdWVudG8udmFsKCkgKyAnJnJhem9uX2Rlc2N1ZW50bz0nICskcmF6b24udmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gJyZmZWNoYV9wYWdvPScgKyBkYXRlICsgJyZkZXRhbGxlc19leHRyYT0nICsgJHNlcnZpY2lvc0V4dHJhLnZhbCgpICsgXCImdGFibGE9ZGlzY291bnRfcGFnb3NcIjtcclxuXHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICAgICAgJG1vZGFsLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbnRlcmFjdGl2ZVN1bSgpe1xyXG4gICAgICAkKCcucGF5bWVudC1zdW1hbmRvcycpLm9uKCdrZXl1cCcsZnVuY3Rpb24oKXtcclxuICAgICAgICAkY3VvdGEudmFsKHBhZ29bJ2N1b3RhJ10gLSAkZGVzY3VlbnRvLnZhbCgpKTtcclxuICAgICAgICB2YXIgc3VtYSA9IE51bWJlcigkY3VvdGEudmFsKCkpICsgTnVtYmVyKCRtb3JhLnZhbCgpKSArIE51bWJlcigkZXh0cmEudmFsKCkpO1xyXG4gICAgICAgICR0b3RhbC52YWwoTnVtYmVyKHN1bWEpKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG59XHJcblxyXG52YXIgRGFtYWdlcyA9IHtcclxuICBcclxuICBhZGQ6IGZ1bmN0aW9uIChpZENsaWVudGUpIHtcclxuICAgIHZhciBmb3JtLCBkZXNjcmlwdGlvbjtcclxuICAgIGRlc2NyaXB0aW9uID0gJChcIiNhLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2lkQ2xpZW50ZSwgZGVzY3JpcHRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9jbGllbnRlPScgKyBpZENsaWVudGUgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uICsgXCImdGFibGE9YXZlcmlhc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvYWRkXCIsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgRGFtYWdlcy5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgICAkKCcjbmV3LWF2ZXJpYS1tb2RhbCcpLmZpbmQoJ2lucHV0LHRleHRhcmVhJykudmFsKFwiXCIpO1xyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXR1cyA9ICQoXCIjYXZlcmlhcy12aWV3LW1vZGVcIikudmFsKCk7XHJcbiAgICAkKFwiLnByZXNlbnRhZG9cIikudGV4dChzdGF0dXMpO1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWF2ZXJpYXMmZXN0YWRvPVwiICsgc3RhdHVzO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIGluaXRHbG9iYWxIYW5kbGVycywgZmlsbEF2ZXJpYXNMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgkaWRfYXZlcmlhKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9YXZlcmlhcyZpZF9hdmVyaWE9XCIgKyAkaWRfYXZlcmlhO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBudWxsLCBmb3JtLCBEYW1hZ2VzLmdldEFsbCk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxudmFyIEluc3RhbGxhdGlvbnMgPSB7XHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhdHVzID0gJChcIiNpbnN0YWxsYXRpb25zLXZpZXctbW9kZVwiKS52YWwoKTtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1pbnN0YWxhY2lvbmVzJmVzdGFkbz1cIiArIHN0YXR1cztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBpbml0R2xvYmFsSGFuZGxlcnMsIGZpbGxJbnN0YWxsYXRpb25zTGlzdCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoJGlkX3BhZ28pIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1pbnN0YWxhY2lvbmVzJmlkX3BhZ289XCIgKyAkaWRfcGFnbztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgSW5zdGFsbGF0aW9ucy5nZXRBbGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIENhamEgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgYW1vdW50LCBkZXNjcmlwdGlvbiwgaXNfZW1wdHk7XHJcblxyXG4gICAgYW1vdW50ID0gJChcIiNjYWphLWEtYW1vdW50XCIpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKFwiI2NhamEtYS1kZXNjcmlwdGlvblwiKS52YWwoKTtcclxuICAgIGZvcm0gPSBcImVudHJhZGE9XCIgKyBhbW91bnQgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uICsgXCImdGFibGE9Y2FqYVwiO1xyXG4gICAgaXNfZW1wdHkgPSBpc0VtcHR5KFthbW91bnQsIGRlc2NyaXB0aW9uXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2FkZCcsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIENhamEuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcmV0aXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgYW1vdW50LCBkZXNjcmlwdGlvbiwgaXNfZW1wdHk7XHJcblxyXG4gICAgYW1vdW50ID0gJChcIiNjYWphLXItYW1vdW50XCIpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKFwiI2NhamEtci1kZXNjcmlwdGlvblwiKS52YWwoKTtcclxuICAgIGZvcm0gPSBcInNhbGlkYT1cIiArIGFtb3VudCArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb247XHJcbiAgICBpc19lbXB0eSA9IGlzRW1wdHkoW2Ftb3VudCwgZGVzY3JpcHRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3JldGlyZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIENhamEuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2FqYVwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0QWxsJywgZmFsc2UsIG51bGwsIGNhamFUYWJsZS5yZWZyZXNoLCBmb3JtLCBDYWphLmdldFNhbGRvKTtcclxuICB9LFxyXG5cclxuICBnZXRTYWxkbzogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNhamFcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldG9uZScsIGZhbHNlLCBudWxsLCB1cGRhdGVTYWxkbywgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICBzZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciAkZGF0ZVNlYXJjaCA9ICQoXCIjY2FqYS1kYXRlXCIpO1xyXG4gICAgdmFyICR1c2VyU2VhcmNoID0gJChcIiNjYWphLXVzZXJcIik7XHJcbiAgICB2YXIgZGF0ZSA9ICgkZGF0ZVNlYXJjaC52YWwoKSkgPyAkZGF0ZVNlYXJjaC52YWwoKSA6ICclJztcclxuICAgIHZhciB1c2VySWQgPSAoJHVzZXJTZWFyY2gudmFsKCkpID8gJHVzZXJTZWFyY2gudmFsKCkgOiAnJSc7XHJcblxyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNhamEmaWRfZW1wbGVhZG89XCIgKyB1c2VySWQgKyBcIiZmZWNoYT1cIiArIGRhdGU7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9zZWFyY2gnLCBmYWxzZSwgbnVsbCwgY2FqYVRhYmxlLnJlZnJlc2gsIGZvcm0sIG51bGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIENvbXBhbnkgPSB7XHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSxcclxuICAgIGNvbXBhbnlOYW1lID0gJChcIiNjb21wYW55LW5hbWVcIikudmFsKCksXHJcbiAgICBjb21wYW55U3RhdGVtZW50ID0gJChcIiNjb21wYW55LXN0YXRlbWVudFwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlQaG9uZTEgPSBnZXRWYWwoJChcIiNjb21wYW55LXBob25lMVwiKSksXHJcbiAgICBjb21wYW55RGlyZWN0aW9uID0gJChcIiNjb21wYW55LWRpcmVjdGlvblwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlEZXNjcmlwdGlvbiA9ICQoXCIjY29tcGFueS1kZXNjcmlwdGlvblwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlQaG9uZTIgPSBnZXRWYWwoJChcIiNjb21wYW55LXBob25lMlwiKSlcclxuXHJcbiAgICBmb3JtID0gJ25vbWJyZT0nICsgY29tcGFueU5hbWUgKyAnJmxlbWE9JyArIGNvbXBhbnlTdGF0ZW1lbnQgKyAnJmRlc2NyaXBjaW9uPScgKyBjb21wYW55RGVzY3JpcHRpb24gKyBcIiZkaXJlY2Npb249XCJcclxuICAgIGZvcm0gKz0gY29tcGFueURpcmVjdGlvbiArIFwiJnRlbGVmb25vMT1cIiArIGNvbXBhbnlQaG9uZTEgKyBcIiZ0ZWxlZm9ub3M9XCIgKyBjb21wYW55UGhvbmUyICsgXCImdGFibGE9ZW1wcmVzYVwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgU2V0dGluZ3MgPSB7XHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSxcclxuICAgIHNldHRpbmdzQ2FyZ29Nb3JhID0gJChcIiNzZXR0aW5ncy1tb3JhXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NGZWNoYUNvcnRlID0gJChcIiNzZXR0aW5ncy1mZWNoYS1jb3J0ZVwiKS52YWwoKSxcclxuICAgIHNldHRpbmdzUmVjb25leGlvbiA9ICQoXCIjc2V0dGluZ3MtcmVjb25leGlvblwiKS52YWwoKSxcclxuICAgIHNldHRpbmdzUGVuYWxpemFjaW9uQ2FuY2VsYWNpb24gPSAkKFwiI3NldHRpbmdzLXBlbmFsaXphY2lvbi1jYW5jZWxhY2lvblwiKS52YWwoKSxcclxuICAgIHNldHRpbmdzTWVzZXNQb3JEZWZlY3RvID0gJChcIiNzZXR0aW5ncy1tZXNlcy1wb3ItZGVmZWN0b1wiKS52YWwoKSxcclxuICAgIHNldHRpbmdzU3BsaXREYXkgPSAkKFwiI3NldHRpbmdzLXNwbGl0LWRheVwiKS52YWwoKTtcclxuXHJcbiAgICBmb3JtID0gJ2NhcmdvX21vcmE9JyArIHNldHRpbmdzQ2FyZ29Nb3JhICsgJyZmZWNoYV9jb3J0ZT0nICsgc2V0dGluZ3NGZWNoYUNvcnRlICsgJyZyZWNvbmV4aW9uPScgKyBzZXR0aW5nc1JlY29uZXhpb247XHJcbiAgICBmb3JtICs9ICcmcGVuYWxpemFjaW9uX2NhbmNlbGFjaW9uPScgKyBzZXR0aW5nc1BlbmFsaXphY2lvbkNhbmNlbGFjaW9uICsgJyZtZXNlc19wb3JfZGVmZWN0bz0nICsgc2V0dGluZ3NNZXNlc1BvckRlZmVjdG87XHJcbiAgICBmb3JtICs9ICcmc3BsaXRfZGF5PScgKyBzZXR0aW5nc1NwbGl0RGF5ICsgJyZ0YWJsYT1zZXR0aW5ncyc7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBTZWN0aW9ucyA9IHsgXHJcbiAgYWRkOiBmdW5jdGlvbigpIHtcclxuICAgIHN3YWwuc2V0RGVmYXVsdHMoe1xyXG4gICAgICBpbnB1dDogJ3RleHQnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ05leHQgJnJhcnI7JyxcclxuICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcclxuICAgICAgcHJvZ3Jlc3NTdGVwczogWycxJywgJzInLCAnMyddXHJcbiAgICB9KVxyXG5cclxuICAgIHZhciBzdGVwcyA9IFt7XHJcbiAgICAgICAgdGl0bGU6ICdOb21icmUgZGVsIHNlY3RvcidcclxuICAgICAgfSxcclxuICAgICAgJ0NvZGlnbyBkZWwgU2VjdG9yJyxcclxuICAgIF1cclxuXHJcbiAgICBzd2FsLnF1ZXVlKHN0ZXBzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgc3dhbC5yZXNldERlZmF1bHRzKClcclxuICAgICAgc2F2ZShyZXN1bHQpXHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzYXZlKHJlc3VsdCl7XHJcbiAgICAgIHZhciBmb3JtO1xyXG4gICAgICB2YXIgbm9tYnJlID0gcmVzdWx0WzBdO1xyXG4gICAgICB2YXIgY29kaWdvQXJlYSA9IHJlc3VsdFsxXSxcclxuXHJcbiAgICAgIGZvcm0gPSBcIm5vbWJyZT1cIitub21icmUrXCImY29kaWdvX2FyZWE9XCIrY29kaWdvQXJlYTtcclxuICAgICAgZm9ybSArPSBcIiZ0YWJsYT1zZWNjaW9uZXNcIlxyXG4gICAgIFxyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSl7XHJcbiAgICAgICAgIGlmKGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2FkZCcsIHRydWUsIGZhbHNlLCBudWxsLCBmb3JtLFNlY3Rpb25zLmdldEFsbCxoZWF2eUxvYWQpKXtcclxuICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0SXBzOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpZCA9ICQoXCIjc2VsZWN0LXNlY3RvclwiKS52YWwoKTtcclxuICAgICQoJy5wcmludC10YWJsZScpLmF0dHIoJ2hyZWYnLCBCQVNFX1VSTCArICdwcm9jZXNzL2dldHJlcG9ydC9zZWNjaW9uZXMvJyArIGlkKTtcclxuICAgIFxyXG4gICAgaWYgKGlkICE9IG51bGwpIHtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPWlwcyZpZD1cIiArIGlkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgc2VjdGlvblRhYmxlLnJlZnJlc2gsIGZvcm0sbnVsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1zZWNjaW9uZXNcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBmaWxsU2VsZWN0LCBmb3JtLGhlYXZ5TG9hZCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZmlsbFNlbGVjdChjb250ZW50KXtcclxuICAgICAgJChcIiNzZWxlY3Qtc2VjdG9yXCIpLmh0bWwoY29udGVudCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlSXBTdGF0ZTogZnVuY3Rpb24gKElQKSB7XHJcbiAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoSVApICsgJyZleHRyYV9pbmZvPScgKyBKU09OLnN0cmluZ2lmeSh7bW9kdWxlOiAnaXAnfSk7XHJcbiAgICAgIGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAncHJvY2Vzcy9heGlvc3VwZGF0ZScsIGZvcm0pXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGRpc3BsYXlNZXNzYWdlKHJlcy5kYXRhLm1lbnNhamUpO1xyXG4gICAgICB9KVxyXG4gIH1cclxufVxyXG5cclxudmFyIEV4dHJhcyA9IHtcclxuICByZW1vdmU6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGlkX2NsaWVudGUsIHNlbmQ7XHJcbiAgICBcclxuICAgIGlkX2NsaWVudGUgPSAkKCcjZGV0YWlsLWNsaWVudC1pZCcpLnZhbCgpXHJcbiAgICBmb3JtID0gXCJkYXRhPVwiICsgSlNPTi5zdHJpbmdpZnkoe2lkOiBpZCxpZF9jbGllbnRlOiBpZF9jbGllbnRlfSk7XHJcbiAgICBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdleHRyYS9kZWxldGVfZXh0cmEnLCBmb3JtKTtcclxuICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhO1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpO1xyXG4gICAgICBleHRyYVRhYmxlLnJlZnJlc2goZGF0YS5leHRyYXMpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG59IiwiICB2YXIgY3VycmVudFBhZ2UgPSAkKFwidGl0bGVcIikudGV4dCgpLnNwbGl0KFwiIFwiKTtcclxuICBjdXJyZW50UGFnZSA9IGN1cnJlbnRQYWdlWzRdLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gIHZhciByYW4gPSBmYWxzZTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdENvbXBvbmVudHMoKSB7XHJcbiAgICBzd2l0Y2ggKGN1cnJlbnRQYWdlKSB7XHJcbiAgICAgIGNhc2UgXCJob21lXCI6XHJcbiAgICAgICAgaW5pdENsaWVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJhZG1pbmlzdHJhZG9yXCI6XHJcbiAgICAgICAgaW5pdEFkbWluSGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImNsaWVudGVzXCI6XHJcbiAgICAgICAgaW5pdENsaWVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzZXJ2aWNpb3NcIjpcclxuICAgICAgICBpbml0U2VydmljZXNIYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibnVldm9fY29udHJhdG9cIjpcclxuICAgICAgICBpbml0Q29udHJhY3RIYW5kbGVycygpO1xyXG4gICAgICAgIENvbnRyYWN0cy5nZXRJcExpc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImRldGFsbGVzXCI6XHJcbiAgICAgICAgaW5pdFBheW1lbnRzSGFuZGxlcnMoKTtcclxuICAgICAgICBkZXRhaWxIYW5kbGVycygpO1xyXG4gICAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJjb250cmF0b3NcIjpcclxuICAgICAgICBpbml0Q29udHJhY3RIYW5kbGVycygpO1xyXG4gICAgICAgIGluaXRDbGllbnRIYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic2VjY2lvbmVzXCI6XHJcbiAgICAgICAgc2VjdGlvbkhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzZWNjaW9uZXMyXCI6XHJcbiAgICAgICAgc2VjdGlvbkhhbmRsZXJzKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2hlcmUnKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDYWphSGFuZGxlcnMoKTtcclxuICAgIGluaXRHbG9iYWxIYW5kbGVycygpO1xyXG4gIH1cclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgIGdsb2JhbHMgaGFuZGxlcnMgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICBmdW5jdGlvbiBpbml0R2xvYmFsSGFuZGxlcnMoKSB7XHJcblxyXG4gICAgdmFyIGF2ZXJpYUNsaWVudERuaSA9ICQoXCIjYS1jbGllbnQtZG5pXCIpO1xyXG5cclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnbm90aWZpY2FjaW9uZXMnKSB7XHJcbiAgICAgIEdlbmVyYWxzLmNvdW50X3RhYmxlKFwiYXZlcmlhc1wiKTtcclxuXHJcbiAgICAgICQoXCIjYXZlcmlhcy12aWV3LW1vZGVcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBEYW1hZ2VzLmdldEFsbCgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoXCIjaW5zdGFsbGF0aW9ucy12aWV3LW1vZGVcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBJbnN0YWxsYXRpb25zLmdldEFsbCgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJ3Rib2R5JykuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiBcInRhYmxlLXJvdy1ncm91cFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnY29udHJhdG9zJykge1xyXG4gICAgICBpbml0Q29udHJhY3RIYW5kbGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhdmVyaWFDbGllbnQgPSAkKFwiI2EtY2xpZW50XCIpLnNlbGVjdDIoe1xyXG4gICAgICBkcm9wZG93blBhcmVudDogJCgnI25ldy1hdmVyaWEtbW9kYWwnKSxcclxuICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgYWpheDoge1xyXG4gICAgICAgIHVybDogQkFTRV9VUkwgKyAncHJvY2Vzcy9zZWFyY2gnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgZGVsYXk6IDI1MCxcclxuICAgICAgICBkYXRhOiBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBxOiBwYXJhbXMudGVybSxcclxuICAgICAgICAgICAgdGFibGE6ICdjbGllbnRlc19wYXJhX2F2ZXJpYXMnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJvY2Vzc1Jlc3VsdHM6IGZ1bmN0aW9uIChkYXRhLCBwYXJhbXMpIHtcclxuICAgICAgICAgIHBhcmFtcy5wYWdlID0gcGFyYW1zLnBhZ2UgfHwgMVxyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdWx0czogZGF0YS5pdGVtcyxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgIG1vcmU6IChwYXJhbXMucGFnZSAqIDMwKSA8IGRhdGEudG90YWxfY291bnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWF2ZXJpYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBEYW1hZ2VzLmFkZChhdmVyaWFDbGllbnQudmFsKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5idG4tdXBkYXRlLWF2ZXJpYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWRfYXZlcmlhID0gJCh0aGlzKS5wYXJlbnRzKCcuYXZlcmlhLWl0ZW0nKS5maW5kKCcuY29kZScpXHJcbiAgICAgIGlkX2F2ZXJpYSA9IGlkX2F2ZXJpYS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICBEYW1hZ2VzLnVwZGF0ZShpZF9hdmVyaWEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5idG4tdXBkYXRlLWluc3RhbGxhdGlvblwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWRfcGFnbyA9ICQodGhpcykucGFyZW50cygnLmF2ZXJpYS1pdGVtJykuZmluZCgnLmNvZGUnKTtcclxuICAgICAgaWRfcGFnbyA9IGlkX3BhZ28udGV4dCgpLnRyaW0oKTtcclxuICAgICAgSW5zdGFsbGF0aW9ucy51cGRhdGUoaWRfcGFnbyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2V4dHJhLWNvbnRyb2xzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbnRyYWN0cy5idG5FeHRyYVByZXNzZWQoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2V4dHJhLWNsaWVudC1kbmlcIikub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICB2YXIga2V5ID0gZS53aGljaDtcclxuICAgICAgdmFyIGRuaSA9ICQodGhpcykudmFsKClcclxuICAgICAgaWYgKGtleSA9PSAxMykge1xyXG4gICAgICAgIENvbnRyYWN0cy5nZXRBbGxPZkNsaWVudChkbmkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgYWRtaW4gaGFuZGxlcnMgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0QWRtaW5IYW5kbGVycygpIHtcclxuICAgIHVzZXJUYWJsZS5pbml0KCk7XHJcbiAgICAkKFwiI2J0bi1zYXZlLXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgVXNlcnMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBVc2Vycy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIuZGVsZXRlLXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgJHJvdyA9ICQodGhpcykucGFyZW50cyhcInRyXCIpO1xyXG4gICAgICB2YXIgaWQgPSAkcm93LmZpbmQoJy51c2VyLWlkJykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgdmFyIHJvdyA9IHVzZXJUYWJsZS5nZXRSb3coaWQpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgIHRleHQ6IFwiRGVzZWEgRWxpbWluYXIgYWwgVXN1YXJpbyBcIiArIHJvdy5ub21icmVzICsgXCIgXCIgKyByb3cuYXBlbGxpZG9zICsgXCI/XCIsXHJcbiAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFVzZXJzLmRlbGV0ZShpZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5lZGl0LXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdXNlci1pZCcpO1xyXG4gICAgICB2YXIgcm93ID0gdXNlclRhYmxlLmdldFJvdyhpZCk7XHJcblxyXG5cclxuICAgICAgJChcIiNlLW5pY2tuYW1lXCIpLnZhbChyb3cubmljayk7XHJcbiAgICAgICQoXCIjZS1uYW1lXCIpLnZhbChyb3cubm9tYnJlcyk7XHJcbiAgICAgICQoXCIjZS1sYXN0bmFtZVwiKS52YWwocm93LmFwZWxsaWRvcyk7XHJcbiAgICAgICQoXCIjZS1kbmlcIikudmFsKHJvdy5jZWR1bGEpO1xyXG4gICAgICAkKFwiI2UtdHlwZVwiKS52YWwocm93LnRpcG9fY29kaWdvKTtcclxuICAgICAgJCgnI3VwZGF0ZS11c2VyLW1vZGFsJykubW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjdXBkYXRlLWNvbXBhbnktZGF0YVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbXBhbnkudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtc2V0dGluZ3NcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBTZXR0aW5ncy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgIEluaXQgY2FqYSAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICBmdW5jdGlvbiBpbml0Q2FqYUhhbmRsZXJzKCkge1xyXG4gICAgaWYgKGN1cnJlbnRQYWdlID09ICdhZG1pbmlzdHJhZG9yJykge1xyXG4gICAgICBjYWphVGFibGUuaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgdmFyIGJ0bkFkZE1vbmV5ID0gJChcIiNidG4tYWRkLW1vbmV5XCIpO1xyXG4gICAgdmFyIGJ0blJldGlyZU1vbmV5ID0gJChcIiNidG4tcmV0aXJlLW1vbmV5XCIpO1xyXG4gICAgdmFyIHVzZXJTZWFyY2ggPSAkKFwiI2NhamEtdXNlclwiKTtcclxuICAgIHZhciBkYXRlU2VhcmNoID0gJChcIiNjYWphLWRhdGVcIik7XHJcblxyXG4gICAgYnRuQWRkTW9uZXkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJ0blJldGlyZU1vbmV5Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENhamEucmV0aXJlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRlU2VhcmNoLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDYWphLnNlYXJjaCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdXNlclNlYXJjaC5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5zZWFyY2goKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgY2xpZW50IEhhbmRsZXJzICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0Q2xpZW50SGFuZGxlcnMoKSB7XHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2NsaWVudGVzJykge1xyXG4gICAgICBjbGllbnRUYWJsZS5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1jbGllbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2xpZW50cy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjdXBkYXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBpZCA9IGNsaWVudFRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIENsaWVudHMuZ2V0T25lKGlkLCBDbGllbnRzLnJlY2VpdmVGb3JFZGl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjbGllbnQtc2VhcmNoZXJcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJjbGllbnRlc1wiLCBjbGllbnRUYWJsZS5yZWZyZXNoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjY2xpZW50LXNlYXJjaGVyLW5ld2NvbnRyYWN0XCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgaWYgKCFpc0VtcHR5KFt0ZXh0XSkpIHtcclxuICAgICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJjbGllbnRlc1wiLCBjbGllbnRUYWJsZS5yZWZyZXNoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhclRib2R5KFwiLmxvYmJ5LXJlc3VsdHNcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZGVsZXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciByb3cgPSBjbGllbnRUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBFbGltaW5hciBhbChsYSkgQ2xpZW50ZSBcIiArIHJvdy5ub21icmVzICsgXCIgXCIgKyByb3cuYXBlbGxpZG9zICsgXCI/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIEdlbmVyYWxzLmRlbGV0ZVJvdyhyb3cuaWQsIFwiY2xpZW50ZXNcIilcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgSW5pdCBTZXJ2aWNlcyBIYW5kbGVycyAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGluaXRTZXJ2aWNlc0hhbmRsZXJzKCkge1xyXG4gICAgc2VydmljZVRhYmxlLmluaXQoKTtcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VydmljZXMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2RlbGV0ZS1zZXJ2aWNlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gc2VydmljZVRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgRWxpbWluYXIgIGVsIFNlcnZpY2lvP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBHZW5lcmFscy5kZWxldGVSb3coaWQsIFwic2VydmljaW9zXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2VkaXQtc2VydmljZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciByb3cgPSBzZXJ2aWNlVGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuXHJcbiAgICAgICQoJyN1LXNlcnZpY2UtaWQnKS52YWwocm93LmlkKTtcclxuICAgICAgJCgnI3Utc2VydmljZS1uYW1lJykudmFsKHJvdy5ub21icmUpO1xyXG4gICAgICAkKCcjdS1zZXJ2aWNlLWRlc2NyaXB0aW9uJykudmFsKHJvdy5kZXNjcmlwY2lvbik7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtbW9udGhseS1wYXltZW50JykudmFsKE51bWJlcihyb3cubWVuc3VhbGlkYWQucmVwbGFjZShcIlJEJCBcIiwgJycpKSk7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtdHlwZScpLnZhbChyb3cudGlwbyk7XHJcbiAgICAgICQoJyN1cGRhdGUtc2VydmljZS1tb2RhbCcpLm1vZGFsKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tdXBkYXRlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VydmljZXMudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3NlcnZpY2Utc2VhcmNoZXJcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJzZXJ2aWNpb3NcIiwgc2VydmljZVRhYmxlLnJlZnJlc2gsIGluaXRTZXJ2aWNlc0hhbmRsZXJzKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBJbml0IENvbnRyYWN0IEhhbmRsZXJzICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gaW5pdENvbnRyYWN0SGFuZGxlcnMoKSB7XHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2NvbnRyYXRvcycpIHtcclxuICAgICAgY29udHJhY3RUYWJsZS5pbml0KCk7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRBbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbnRyYWN0cy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLWFkZC1leHRyYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbnRyYWN0cy5jYWxsRXh0cmEoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjY29udHJhY3Qtc2VhcmNoZXJcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJ2X2NvbnRyYXRvc1wiLCBjb250cmFjdFRhYmxlLnJlZnJlc2gsIG51bGwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tY2FuY2VsLWNvbnRyYWN0LCAjYnRuLWRldGFpbC1jYW5jZWwtY29udHJhY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgcm93LCBjYWxsYmFja1xyXG4gICAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2NvbnRyYXRvcycpIHtcclxuICAgICAgICByb3cgPSBjb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBDb250cmFjdHMuZ2V0QWxsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvdyA9IGRldGFpbHNDb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgICAgcm93LmlkID0gcm93LmlkX2NvbnRyYXRvO1xyXG4gICAgICAgIHJvdy5pZF9jbGllbnRlID0gJCgnI2RhdGFpbC1jbGllbnQtaWQnKS52YWwoKTtcclxuICAgICAgICByb3cuY2xpZW50ZSA9ICQoJyNkZXRhaWwtY2xpZW50LW5hbWUnKS52YWwoKTtcclxuICAgICAgICBjYWxsYmFjayA9IFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgICQoXCIuY2FuY2VsLW5hbWVcIikudGV4dChyb3cuY2xpZW50ZSk7XHJcbiAgICAgICAgdmFyICRpbnB1dEVsZW1lbnQgPSAkKFwiLmNvbmZpcm1lZC1kYXRhXCIpO1xyXG4gICAgICAgIHZhciAkYnV0dG9uVG9BY3RpdmUgPSAkKFwiI2NhbmNlbC1wZXJtYW5lbnRseVwiKTtcclxuXHJcbiAgICAgICAgZGVsZXRlVmFsaWRhdGlvbigkaW5wdXRFbGVtZW50LCByb3cuY2xpZW50ZSwgJGJ1dHRvblRvQWN0aXZlKTtcclxuICAgICAgICAkKFwiI2NhbmNlbC1wcmludFwiKS5hdHRyKFwiaHJlZlwiLCBCQVNFX1VSTCArICdwcm9jZXNzL2dldGNhbmNlbGNvbnRyYWN0LycgKyByb3cuaWQpO1xyXG5cclxuICAgICAgICAkKFwiI2NhbmNlbC1jb250cmFjdC1tb2RhbFwiKS5tb2RhbCgpO1xyXG5cclxuICAgICAgICAkYnV0dG9uVG9BY3RpdmUub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBDb250cmFjdHMuY2FuY2VsKHJvdywgY2FsbGJhY2spXHJcbiAgICAgICAgICAkYnV0dG9uVG9BY3RpdmUuYXR0cignZGlzYWJsZScpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICRpbnB1dEVsZW1lbnQudmFsKCcnKTtcclxuICAgICAgICAkKCcjY2FuY2VsLWNvbnRyYWN0LW1vZGFsIC5hbGVydCcpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgJGJ1dHRvblRvQWN0aXZlLmF0dHIoJ2Rpc2FibGVkJywgJycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3YWwoXCJEZWJlcyBzZWxlY2Npb25hciB1biBjb250cmF0b1wiKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1zdXNwZW5kLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHJvdyA9IGNvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgU3VzcGVuZGVyIGVsIGNvbnRyYXRvIGRlIFwiICsgcm93LmNsaWVudGUgKyBcIiA/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8nLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgQ29udHJhY3RzLnN1c3BlbmQocm93LmlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFwiRGViZSBzZWxlY2Npb25hciB1biBjb250cmF0b1wiKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtY29udHJhY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBjb250cmFjdFRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIENvbnRyYWN0cy5nZXRPbmUoaWQsIENvbnRyYWN0cy5yZWNpZXZlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNzZWxlY3QtY29udHJhY3Qtc2VjdG9yXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb250cmFjdHMuZ2V0SXBMaXN0KCk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJyNzZWxlY3QtcGF5LXVudGlsJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQoJyNzZWxlY3QtcGF5LXVudGlsIDpzZWxlY3RlZCcpO1xyXG4gICAgICB2YXIgY29udHJhY3RJZCA9ICR0aGlzLmF0dHIoJ2RhdGEtY29udHJhY3QnKTtcclxuICAgICAgdmFyIGxhc3RQYXltZW50SWQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBQYXltZW50cy51cGRhdGVVbnRpbChjb250cmFjdElkLCBsYXN0UGF5bWVudElkKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgUGF5bWVudHMgIEhhbmRsZXJzICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgZnVuY3Rpb24gaW5pdFBheW1lbnRzSGFuZGxlcnMoKSB7XHJcbiAgICBwYXltZW50VGFibGUuaW5pdCgpO1xyXG4gICAgZXh0cmFUYWJsZS5pbml0KCk7XHJcbiAgICBpZiAoIXJhbikge1xyXG4gICAgICBQYXltZW50cy5nZXRBbGwoKTtcclxuICAgICAgcmFuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1wYXlcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gcGF5bWVudFRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIFBheW1lbnRzLnVwZGF0ZShpZCk7XHJcbiAgICAgICAgdXBkYXRlX21vZGUoaWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFRPRE86IE1FU1NBR0UgU2VsZWN0IGEgcGF5bWVudFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgUGF5bWVudHMuZ2V0QWxsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3BheW1lbnQtZGV0YWlsLWJveFwiKS5jb2xsYXBzZSgpXHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlX21vZGUoaWQpIHtcclxuICAgICAgdmFyIG1vZGUgPSAkKCcucGF5bWVudC1tb2RlLnNlbGVjdGVkJykudGV4dCgpO1xyXG4gICAgICB2YXIgZXh0cmFJbmZvID0ge1xyXG4gICAgICAgIGlkOiBpZC50b1N0cmluZygpLFxyXG4gICAgICAgIG1vZHVsZTogJ3BhZ29zJ1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBmb3JtID0gJ2RhdGE9JyArIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICB0aXBvOiBtb2RlXHJcbiAgICAgIH0pICsgJyZleHRyYV9pbmZvPScgKyBKU09OLnN0cmluZ2lmeShleHRyYUluZm8pO1xyXG5cclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ3Byb2Nlc3MvYXhpb3N1cGRhdGUnLCBmb3JtKVxyXG4gICAgICBzZW5kLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgLy9UT0RPOiBzb21ldGhpbmcgd2hpdGggdGhhdCAvIGFsZ28gY29uIGVzdG9cclxuICAgICAgfSk7XHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgICBkZXRhaWwgSGFuZGxlcnMgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBkZXRhaWxIYW5kbGVycygpIHtcclxuXHJcbiAgICB2YXIgJGNsaWVudE5hbWUgPSAkKCcjZGV0YWlsLWNsaWVudC1uYW1lJyk7XHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1vYnNlcnZhdGlvbnNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgUGF5bWVudHMuc2F2ZUFib25vcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2J0bi1zYXZlLXJlYWwtb2JzZXJ2YXRpb25zJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2xpZW50cy5zYXZlT2JzZXJ2YXRpb25zKCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGRldGFpbHNDb250cmFjdFRhYmxlLmluaXQoKTtcclxuXHJcbiAgICAkKFwiI2J0bi1kZXRhaWwtc3VzcGVuZC1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciByb3cgPSBkZXRhaWxzQ29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBTdXNwZW5kZXIgZWwgY29udHJhdG8gZGUgXCIgKyAkY2xpZW50TmFtZS52YWwoKSArIFwiID9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybycsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBDb250cmFjdHMuc3VzcGVuZChyb3cuaWRfY29udHJhdG8sIFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcIkRlYmUgc2VsZWNjaW9uYXIgdW4gY29udHJhdG9cIilcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tY2FsbC1yZWNvbm5lY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG4gICAgICB2YXIgcm93ID0gZGV0YWlsc0NvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgICQoXCIjcmVjb25uZWN0LW1vZGFsXCIpLm1vZGFsKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcIkRlYmUgc2VsZWNjaW9uYXIgdW4gY29udHJhdG8gcHJpbWVyb1wiKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAkKFwiI2J0bi1yZWNvbm5lY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG4gICAgICB2YXIgcm93ID0gZGV0YWlsc0NvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIENvbnRyYWN0cy5yZWNvbm5lY3Qocm93LmlkX2NvbnRyYXRvLCBQYXltZW50cy5jb250cmFjdFJlZnJlc2gpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgICQoJyNidG4tY2FsbC1leHRyYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGNvbnRleHQgPSAnZGV0YWlscyc7XHJcbiAgICAgIENvbnRyYWN0cy5jYWxsRXh0cmEoY29udGV4dCk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2VjdGlvbkhhbmRsZXJzKCkge1xyXG4gICAgaWYgKCFyYW4pIHtcclxuICAgICAgc2VjdGlvblRhYmxlLmluaXQoKTtcclxuICAgICAgU2VjdGlvbnMuZ2V0SXBzKCk7XHJcbiAgICAgIHJhbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNidG4tYWRkLXNlY3Rpb25cIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFNlY3Rpb25zLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNzZWxlY3Qtc2VjdG9yXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBTZWN0aW9ucy5nZXRJcHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICBpbml0Q29tcG9uZW50cygpXHJcbiAgfSk7IiwidmFyIHJhbiA9IGZhbHNlO1xyXG5cclxuZnVuY3Rpb24gbG9naW5IYW5kbGVycygpIHtcclxuXHJcbiAgJChcIiNzZW5kLWNyZWRlbnRpYWxzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgU2Vzc2lvbi5sb2dpbigpO1xyXG4gIH0pO1xyXG5cclxuICAkKFwiI3VzZXItaW5wdXRcIikub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIGxvZ2luTGlicmFyeS5zZW5kVG9Mb2dpbihlKVxyXG4gIH0pXHJcblxyXG4gICQoXCIjcGFzc3dvcmQtaW5wdXRcIikub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIGxvZ2luTGlicmFyeS5zZW5kVG9Mb2dpbihlKVxyXG4gIH0pXHJcblxyXG4gICQoXCJhW2hyZWZdXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGxvZ2luTGlicmFyeS5sb2FkaW5nKCk7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIHRhcmdldCA9ICR0aGlzLmF0dHIoJ3RhcmdldCcpO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLmxvYWRlclwiKS5jc3Moe1xyXG4gICAgICAgICAgZGlzcGxheTogXCJub25lXCJcclxuICAgICAgICB9KTtcclxuICAgICAgfSwgMzAwMClcclxuICAgIH1jYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhyb3cgZXJyb3JcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG52YXIgU2Vzc2lvbiA9IHtcclxuICBsb2dpbjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdXNlciAgICAgPSAkKFwiI3VzZXItaW5wdXRcIikudmFsKCk7XHJcbiAgICB2YXIgcGFzc3dvcmQgPSAkKFwiI3Bhc3N3b3JkLWlucHV0XCIpLnZhbCgpO1xyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbdXNlciwgcGFzc3dvcmRdKVxyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICB2YXIgZm9ybSA9ICd1c2VyPScgKyB1c2VyICsgJyZwYXNzd29yZD0nICsgcGFzc3dvcmQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdhcHAvbG9naW4nLCBmYWxzZSwgZmFsc2UsIFNlc3Npb24ucHJvY2Vzc0xvZ2luRGF0YSwgZm9ybSwgbnVsbCwgbG9naW5MaWJyYXJ5LmxvYWRpbmcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0VSUk9SICsgXCIgTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBpbmRpY2Fkb3MgcGFyYSBpbmdyZXNhclwiKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHByb2Nlc3NMb2dpbkRhdGE6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICBpZiAocmVzcG9uc2UgPT0gdHJ1ZSkge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IEJBU0VfVVJMICsgJ2FwcC9hZG1pbi8nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIlxyXG4gICAgICB9KTtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9JTkZPICsgXCIgVXN1YXJpbyB5IENvbnRyYXNlw7FhIG5vIHZhbGlkb3NcIilcclxuICAgIH1cclxuICB9XHJcbn1cclxudmFyIGxvZ2luTGlicmFyeSA9IHtcclxuICBsb2FkaW5nOiBmdW5jdGlvbihzdG9wKSB7XHJcbiAgICBpZighc3RvcCl7XHJcbiAgICAgICAkKFwiLmxvYWRlclwiKS5jc3Moe1xyXG4gICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIFxyXG4gIHNlbmRUb0xvZ2luOiBmdW5jdGlvbihlKSB7XHJcbiAgICBrZXkgPSBlLndoaWNoXHJcbiAgICBpZiAoa2V5ID09IDEzKSB7XHJcbiAgICAgIFNlc3Npb24ubG9naW4oKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gIGxvZ2luSGFuZGxlcnMoKTtcclxufSkiXX0=
