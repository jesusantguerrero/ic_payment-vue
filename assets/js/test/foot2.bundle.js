var BASE_URL = window.location.origin + "/";
if(BASE_URL.includes("localhost") || BASE_URL.includes('ngrok.io')){
  BASE_URL += 'icpayment/';
}

var MESSAGE_SUCCESS = '<i class="material-icons">done_all</i>';
var MESSAGE_ERROR   = '<i class="material-icons">error_outline</i>';
var MESSAGE_INFO    = '<i class="material-icons">info_outline</i>';
var SUMMER_SKY      = '#1FA1D0'
var busAveria       = new Vue();

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
    var contractId 
    if(currentPage != 'detalles'){
      contractId = contractTable.getId();
    }else{
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
// funciones de bootstrap
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

function validatePassword(password){
  var expression = '';
  var has_lowercase = false;
  var has_uppercase = false;
  var has_digit = '/*\d';

  if(password.length > 8) alert("mayor a 8")
  if(/\d/.test(password))alert("tiene digito")
  if(/[a-z]/.test(password))alert("tiene minisculas")
  if(/[A-Z]/.test(password)) alert('tiene mayusculas')
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
  
  if (currentPage == "detalles") {
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
     var form, nombres, apellidos, cedula, celular, provincia, sector, calle, casa, telefono,
       lugarTrabajo, telTrabajo, ingresos, fechaRegistro, estado;

    nombres       = $("#client-name").val();
    apellidos     = $("#client-lastname").val();
    cedula        = getVal($("#client-dni"));
    celular       = getVal($("#client-phone"));
    provincia     = $("#client-provincia").val();
    sector        = $("#client-sector").val();
    calle         = $("#client-street").val();
    casa          = $('#client-house').val();
    telefono      = getVal($('#client-telephone'));
    lugarTrabajo  = $('#client-job').val();
    telTrabajo    = getVal($('#client-job-telephone'));
    ingresos      = $('#client-salary').val();
    fechaRegistro = moment().format("YYYY-MM-DD");;
    estado        = "no activo";

    var is_empty = isEmpty([nombres, apellidos, cedula, celular, provincia, sector, calle, casa, telefono]);
    if (!is_empty) {
      form = 'nombres=' + nombres + "&apellidos=" + apellidos + "&cedula=" + cedula + "&celular=" + celular;
      form += "&provincia=" + provincia + "&sector=" + sector + "&calle=" + calle + "&casa=" + casa + "&telefono=" + telefono;
      form += "&lugar_trabajo=" + lugarTrabajo + "&tel_trabajo=" + telTrabajo + "&ingresos=" + ingresos + "&fecha_registro=" + fechaRegistro;
      form += "&estado=" + estado + "&tabla=clientes";

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
    var client        = JSON.parse(content);
    this.id            = client['id_cliente'];
    var $nombres      = $("#u-client-name");
    var $apellidos    = $("#u-client-lastname");
    var $cedula       = $("#u-client-dni");
    var $celular      = $("#u-client-phone");
    var $provincia    = $("#u-client-provincia");
    var $sector       = $("#u-client-sector");
    var $calle        = $("#u-client-street");
    var $casa         = $('#u-client-house');
    var $telefono     = $('#u-client-telephone');
    var $lugarTrabajo = $('#u-client-job');
    var $telTrabajo   = $('#u-client-job-telephone');
    var $ingresos     = $('#u-client-salary');

    $nombres.val(client['nombres']);
    $apellidos.val(client['apellidos'])
    $cedula.val(client['cedula'])
    $celular.val(client['celular'])
    $provincia.val(client['provincia'])
    $sector.val(client['sector'])
    $calle.val(client['calle'])
    $casa.val(client['casa'])
    $telefono.val(client['telefono'])
    $lugarTrabajo.val(client['lugar_trabajo'])
    $telTrabajo.val(client['tel_trabajo'])
    $ingresos.val(client['salario'])

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
        form += "&casa=" + $casa.val() + "&telefono=" + getVal($telefono) + "&lugar_trabajo=" + $lugarTrabajo.val() + "&tel_trabajo =";
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

  extend: function(idContrato) {
    var form;
    form = 'id_contrato=' + idContrator;
    connectAndSend("process/extend", true, null, null, form, null);
  },

  getAll: function() {
    var form = "tabla=contratos";
    connectAndSend('process/getall', false, null, contractTable.refresh, form, null);
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
      $cMora.parent().addClass('cheked');
    } else {
      $cMora.parent().removeClass('checked');
    }

    if (pago['detalles_extra'].includes('reconexion')) {
      $cReconexion.parent().addClass('checked');
    } else {
      $cReconexion.parent().removeClass('checked');
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
    if (id != null) {
      var form = "tabla=ips&id=" + id;
      connectAndSend('process/getall', false, null, Sections.reorderTable, form,null);
    }
  },

  reorderTable: function(content){
    var table = $("#t-sections");
    table.bootstrapTable('destroy');
    $("#t-sections tbody").html(content);
    table.bootstrapTable();
    table.find('tbody').css({display:"table-row-group"});
  },

  getAll: function() {
      var form = "tabla=secciones";
      connectAndSend('process/getall', false, null, fillSelect, form,heavyLoad);

    function fillSelect(content){
      $("#select-sector").html(content);
    }
  },

  init: function(){
    var $table = $("#t-sections");
    var $btnPrint = $("#btn-print-sections");
    var $selectState = $("#filter-sections");
    

    $selectState.on('change',function(){
      var filter = $(this).val()
      if(filter.includes("]"))
        filter = ['ocupado','disponible']

      $table.bootstrapTable('filterBy',{
        estado:  filter
      })
    })

    $btnPrint.on('click', function(){
      print();
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
      case "cuenta":
        acountHandlers();
        break;
      case "secciones":
        sectionHandlers();
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
    if(currentPage == 'contratos'){
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
      console.log('hello world');
        if(currentPage == 'contratos'){
          row = contractTable.getSelectedRow();
          callback = Contracts.getAll;
        }else{
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
          console.log(row)
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
        console.log(error);
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
      if(row){
        $("#reconnect-modal").modal();
      }else{
        swal("Debe seleccionar un contrato primero");
      }
    })

    $("#btn-reconnect").on('click', function (e) {
      e.stopImmediatePropagation()
      var row = detailsContractTable.getSelectedRow();
      if(row){
        Contracts.reconnect(row.id_contrato,Payments.contractRefresh);
      }
    })

    $('#btn-call-extra').on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var context = 'details';
      Contracts.callExtra(context);
    })
  }

  function acountHandlers() {
    var $userId = $("#acount-user-id")
    var $currentPassword = $("#acount-current-password")
    var $btnUpdateUser = $("#update-user-data");
    var $newPassword = $("#acount-new-password");

    $("#acount-current-password").on('keyup', function (e) {
      e.stopImmediatePropagation();
      Users.confirmPassword($userId.val(), $currentPassword.val());
    });

    $btnUpdateUser.on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      Users.updatePassword($userId.val(), $currentPassword.val(), $newPassword.val())
    })
  }

  function sectionHandlers() {
    if (!ran) {
      Sections.init()
      Sections.getIps();
      ran = true;
    }

    $("#btn-add-section").on('click', function (e) {
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
  function isCurrentPage(pageName){
    if(getCurrentPage() == pageName){
      return true
    }  
    return false;
  }

  function getCurrentPage(){
    var currentPage = $("title").text().split(" ");
    currentPage = currentPage[4].toLowerCase().trim();
    return currentPage;
  }

  if(isCurrentPage("cierre") || isCurrentPage("cierre2")){
    cierreCajaFunctions();
  }

  if(isCurrentPage("reportes")){
    var script = document.createElement("script");
    script.src = BASE_URL + "assets/js/min/reportes.min.js?version=4.0.22";
    $("body").append(script);
  }

  function cierreCajaFunctions(){
    
    var totales = {
          total1: 0,
          total5: 0,
          total10: 0,
          total20: 0,
          total25: 0,
          total50: 0,
          total100: 0,
          total200: 0,
          total500: 0,
          total1000: 0,
          total2000: 0
        }

    var gasto   = {
        'fecha': '',
        'descripcion': '',
        'monto': '',
      }

    var gastos  = [{fecha: now(),descripcion:"hola",monto: 2000, id_gasto: 1}]
    var autor   = $('#autor-cierre').text().trim()

    var appCierre = new Vue({
      el: '#app-cierre',
      data: {
        isHide: false,
        fecha: now(),
        data_cierre:{
          autor: autor,
          pagos_facturas: 0,
          pagos_extras: 0,
          pagos_efectivo: 0,
          pagos_banco: 0,
          total_ingresos: 0,
          efectivo_caja: 0,
          total_descuadre: 0,
          total_gastos: 0,
          banco: 0
        },
        conteo:totales,
        suma: 0,
        gasto: gasto,
        gastos: gastos
      },

      mounted: function() {
        this.getGastos();
        this.setIngresos();
      },

      created: function(){
        $('.will-load').css({visibility:"visible"})
      },

      filters: {
        currencyFormat: function(number){
          return CurrencyFormat(number);
        }
      },

      methods:{
        changeTotal: function(e){
          var unit = e.srcElement.attributes['data-unit'].value
          var cantidad = e.srcElement.value
          var total = cantidad * unit
          totales['total'+ unit] = cantidad * unit * 1.00    
        }, 

        addGasto: function(e) {
          var gasto = this.gasto;
          gasto.fecha = now();
          form = 'data='+ JSON.stringify(gasto);
          var send = axios.post( BASE_URL + 'caja/add_gasto',form)
          send.then(function(response){
            var data = response.data
            displayMessage(data.mensaje)
            appCierre.fillGastos(data.gastos,"normal")
            appCierre.setGastoTotal(data.total_gastos)
          });
          send.catch(function(){
            console.log(error);
          });
        },

        fillGastos: function(gastos_servidor,mode){
          if(mode == "group"){
            if(gastos_servidor != null || gastos_servidor.length > 0){
              appCierre.gastos = gastos_servidor;
            }else{
              appCierre.gastos = [];
            }
          }else{
            appCierre.gastos.push(JSON.parse(gastos_servidor)[0]);
          }
        },

        setGastoTotal: function(totalGastos){
          this.data_cierre.total_gastos = totalGastos
        },

        getGasto: function(e){
          var gasto = this.gasto;
          form = 'data='+ JSON.stringify(gasto);
          connectAndSend('caja/get_gasto',false,null,appCierre.fillGastos,form,null, null);
        },

        deleteGasto: function(e){
          console.log(e);
          var caller = e.target;
          if(caller.localname == "i"){
            caller = caller.parentElement;
          }
          var id = caller.attributes['data-id'].value
          swal({
            title: 'Está Seguro?',
            text: "Seguro de que quiere eliminar este gasto?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Estoy Seguro!',
            cancelButtonText: 'Cancelar'
          }).then(function(){
            form = 'data='+ JSON.stringify({id: id, fecha:now()})
            var send = axios.post(BASE_URL + 'caja/delete_gasto',form)
            send.then(function(response){
              var data = response.data
              displayMessage(data.mensaje)
              appCierre.fillGastos(data.gastos,"group")
              appCierre.setGastoTotal(data.total_gastos) 
            });
            send.catch(function(error){

            });
          });      
        },

        getGastos: function(){
          var data = {fecha: now()}
          form = 'data='+ JSON.stringify(data)
          var send = axios.post( BASE_URL + 'caja/get_gastos',form)
          send.then(function(response){
            var data = response.data
            displayMessage(data.mensaje)
            appCierre.fillGastos(data.gastos,"group")
            appCierre.setGastoTotal(data.total_gastos)
          });
          send.catch(function(){
            console.log(error);
          })
        },

        setIngresos: function(){
          var form = 'data=' + JSON.stringify({fecha: now()})
          var self = this.data_cierre;
          var send = axios.post( BASE_URL + 'caja/get_ingresos',form)
          send.then(function(response){
            var data = response.data
            self.pagos_facturas = data.pagos_facturas;
            self.pagos_extras = data.pagos_extras;
            self.pagos_efectivo = data.pagos_efectivo;
            self.pagos_banco = data.pagos_banco;
            self.total_ingresos = parseFloat(data.pagos_facturas) + parseFloat(self.pagos_extras);
            self.total_descuadre = - self.pagos_efectivo + self.efectivo_caja;
          });
          send.catch(function(){
            console.log(error);
          })
        },

        cerrarCaja: function(){
          var self   = this;
          var cierre = this.data_cierre;
          window.cierre = cierre;
          if(cierre.total_descuadre != 0){
            swal({
              title: 'Está Seguro?',
              text: "Hay un descuadre en la caja, quiere hacer el cierre de todos modos?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Si',
              cancelButtonText: 'No'
            }).then(function(){
              self.cerrar(cierre)
            })
          }else{
            self.cerrar(cierre);
          }
        },

        cerrar: function(cierre){
          
          cierre.fecha = now();
          form = 'data='+ JSON.stringify(cierre);
          var send = axios.post( BASE_URL + 'caja/add_cierre',form)
          send.then(function(response){
            var data = response.data
            displayMessage(data.mensaje)
            self.isHide = true;
            appSummaryView.isHide = false;
            appSummaryView.cierre = cierre;
            $("#app-cierre").addClass('hide');
            $(".top-nav").addClass('hide');
            $("#print-view").css({visibility: "visible"})
            
          });
          send.catch(function(){
            console.log(error);
          });
        }
      },

      computed:{
        getTotal: function(e){
          var t = totales;
          var self = this.data_cierre;
          var suma = sumar([t.total1,t.total5,t.total10, t.total20, t.total25, t.total50, t.total100, t.total200, t.total500, t.total1000, t.total2000]);
          this.suma = suma;
          self.efectivo_caja = suma.toFixed(2);
          self.total_descuadre = parseFloat(-self.pagos_efectivo) + parseFloat(self.efectivo_caja);
          self.banco = parseFloat(self.pagos_banco) + parseFloat(self.pagos_efectivo) - parseFloat(self.total_gastos) + parseFloat(self.total_descuadre)
          return this.suma;
        },

        decimals: function(){
          var fields = ["pagos_facturas","pagos_extra","pagos_efectivo","pagos_banco","total_ingresos","efectivo_caja","total_descuadre","total_gasto","banco"];
          fields.forEach(function(field) {
            this.data_cierre[field] = this.data_cierre[field].toFixed(2)
          }, this);
        }
      }
    })

    window.appCierre = appCierre;
    function sumar (valores){
      var suma = 0;
      for (var i = 0; i < valores.length; i++) {
        suma += parseFloat(valores[i]); 
      }
      return suma;
    }

    function now(){
      return moment().format("YYYY-MM-DD");
    }
  }

  Vue.component('summary-print-view',{
    template: '\
    <div class="print-container">\
      <div class="__header">\
      <h2 class="__title t-center"> {{title}}</h2>\
      </div>\
      <div class="__body">\
      <printeable></printeable>\
      </div>\
    <div>\
    \
    ',
    props:['somevalue'],
    methods:{
      goBack: function(){
        appSummaryView.isHide = true;
        window.appCierre.isHide = false;
        self.isHide = true;
        $(".top-nav").removeClass('hide');
        $("#app-cierre").removeClass('hide');
      }
    },
    data: function(){
      return {
        back: {link:"somelink",text:"volver a cierre"},
        foward: {link: BASE_URL + "app/logout",text:"cerrar session"},
        title:"Resumen de cierre de hoy",

      }
    }
  })

  var appSummaryView = new Vue({
    el: "#print-view",
    data: {
      isHide: true,
      back: {link:"somelink",text:"volver a cierre"},
      foward: {link: BASE_URL + "app/logout",text:"cerrar session"},
      cierre:{
          autor: '',
          pagos_facturas: 0,
          pagos_extras: 0,
          pagos_efectivo: 0,
          pagos_banco: 0,
          total_ingresos: 0,
          efectivo_caja: 0,
          total_descuadre: 0,
          total_gastos: 0,
          banco: 0
        }
    },
    filters: {
      currencyFormat: function(number){
        return "RD$ "+ CurrencyFormat(number);
      },

      spanishDateFormat: function(date){
        moment.locale('es-DO');
        return moment(date).format('dddd DD [de] MMMM [del] YYYY')
      }
    },
    methods:{
      goBack: function(){
        appSummaryView.isHide = true;
        window.appCierre.isHide = false;
        self.isHide = true;
        $(".top-nav").removeClass('hide');
        $("#app-cierre").removeClass('hide');
      },
      print: function(){
        print()
      }
    }
  })
var listExtras = '';
var reciboReset = {
  id_pago: 0,
  id_contrato: 0,
  id_servicio: 0,
  id_empleado: 0,
  fecha_pago : '',
  concepto : 'extra',
  detalles_extra : '',
  cuota: '',
  mora : '',
  monto_extra: '',
  total: '',
  estado: '',
  fecha_limite: '',
  complete_date : '',
  descuento: '',
  razon_descuento: '',
  deuda: '',
  abono_a: '',
  tipo: '',
  generado: ''
}

var appPagoExtra = new Vue({
  el: "#app-pago-extra",
  data: {
    recibo:{
       id_pago: 0,
       id_contrato: 0,
       id_servicio: 0,
       id_empleado: 0,
       fecha_pago : 'dd/mm/yyyy',
       concepto : 'extra',
       detalles_extra : '',
       cuota: '',
       mora : '',
       monto_extra: '',
       total: '',
       estado: '',
       fecha_limite: '',
       complete_date : '',
       descuento: '',
       razon_descuento: '',
       deuda: '',
       abono_a: '',
       tipo: '',
       generado: ''
    },

    visible: false,
    extra:{
      "controls": '',
      "id_extra": '',
      "id_servicio": '',
      "checkbox": '',
      "fecha": '',
      "concepto": '',
      "ultimo_pago": '',
      "monto_pagado": '',
      "monto_total": '',
      "estado": ''
    },
    firstControls: {
      hide: false
    },
  },
  filters: {

  },
  computed: {
    url_recibo: function () {
      return BASE_URL + 'process/getrecibo/' + this.recibo.id_pago;
    },

    hide_recibo: function () {
      if(this.recibo.estado == "pagado"){
        return false
      }
       return this.hide_recibo = true;
      
    }
  },

  methods:{

    goBack: function () {
      extraTable.el.parents(".bootstrap-table").removeClass("hide");
      this.visible = false
      this.extra = {concepto: ''}
      extraTable.refresh(listExtras);
    },

    generatePayment: function () {
      var form = 'data=' + JSON.stringify(this.extra);
      var send = axios.post( BASE_URL + 'extra/generate_extra_payment',form);
      send.then(function(res){
        var data = res.data;
        displayMessage(data.mensaje);
        selectExtraPayment.html(data.pagos).change();
      });
      send.catch(function(){
        
      })
    },

    getPayment: function (id_pago) {
      var form = "data=" + JSON.stringify({id_pago: id_pago});
      var self = this
      var send = axios.post( BASE_URL + 'extra/get_payment',form);
      send.then(function(res){
        var data = res.data 
        if(data.recibo){
          self.recibo = data.recibo
        }
      })
    },

    applyPayment: function () {
      var self = this
      var recibo = this.recibo
      var info = {
        id_extra: recibo.id_extra,
        id_pago: recibo.id_pago
      }

      var data = {
        concepto: 'extra -', 
        detalles_extra: recibo.detalles_extra,
        fecha_pago: recibo.fecha_pago,
        cuota: recibo.cuota,
        total: recibo.cuota,
        estado: 'pagado',
        tipo: recibo.tipo,
        generado: true
      }

      var form = 'data='+ JSON.stringify(data) + '&info='+ JSON.stringify(info)
      var send = axios.post(BASE_URL + 'extra/apply_payment',form)
      send.then(function (res) {
        var data = res.data
        listExtras = data.extras;
        self.getPayments(self.extra.id_extra);
        displayMessage(data.mensaje);
      })
      send.catch(function(error){
        console.log(error);
      })
    },
    
    getPayments: function (id_extra) {
      var self = this;
      var form = "data="+ JSON.stringify({id_extra: id_extra})
      var send = axios.post(BASE_URL + 'extra/get_extra_payment_of', form)
      send.then(function(res){
        var data = res.data;
        if(!data.pagos){
          self.recibo = reciboReset
        }
        selectExtraPayment.html(data.pagos).change()

      })
    },

    deletePayment: function () {
      var self = this;
      var recibo = this.recibo
      var data = {
        'id_extra': recibo.id_extra,
        'id_pago': recibo.id_pago
      }

      var form = 'data='+ JSON.stringify(data)
      var send = axios.post(BASE_URL + 'extra/delete_payment',form)
      send.then(function (res) {
        var data = res.data
        displayMessage(data.mensaje);
        self.getPayments(self.extra.id_extra);
      })
      send.catch(function(error){
        console.log(error);
      })
    }
  }
});

bus.$on('row-selected',function (row) {
  extraTable.el.parents(".bootstrap-table").addClass("hide");
  appPagoExtra.visible = true
  appPagoExtra.extra = row
  listExtras = extraTable.el.find('tbody').html();
  appPagoExtra.getPayments(row.id_extra);
})

var selectExtraPayment = $("#select-extra-payment");
selectExtraPayment.on('change',function(){
  var id_pago = selectExtraPayment.val()
  appPagoExtra.getPayment(id_pago)
})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbHMuanMiLCJmdW5jdGlvbnMuanMiLCJiYXNlLmpzIiwiY29udHJvbGxlcnMuanMiLCJhamF4LmpzIiwiYWpheDIuanMiLCJjaWVycmVDYWphLmpzIiwiZXh0cmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2paQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdGtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImZvb3QyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBCQVNFX1VSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBcIi9cIjtcclxuaWYoQkFTRV9VUkwuaW5jbHVkZXMoXCJsb2NhbGhvc3RcIikgfHwgQkFTRV9VUkwuaW5jbHVkZXMoJ25ncm9rLmlvJykpe1xyXG4gIEJBU0VfVVJMICs9ICdpY3BheW1lbnQvJztcclxufVxyXG5cclxudmFyIE1FU1NBR0VfU1VDQ0VTUyA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZG9uZV9hbGw8L2k+JztcclxudmFyIE1FU1NBR0VfRVJST1IgICA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZXJyb3Jfb3V0bGluZTwvaT4nO1xyXG52YXIgTUVTU0FHRV9JTkZPICAgID0gJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5pbmZvX291dGxpbmU8L2k+JztcclxudmFyIFNVTU1FUl9TS1kgICAgICA9ICcjMUZBMUQwJ1xyXG52YXIgYnVzQXZlcmlhICAgICAgID0gbmV3IFZ1ZSgpO1xyXG5cclxuLyoqXHJcbiAqIENvbm5lY3QgQW5kIFNlbmRcclxuICogQ29uZWN0YSBhbCBzZXJ2aWRvciB2aWEgYWpheCB5IG11ZXN0cmEgZWwgbWVuc2FqZSBkZSByZXNwdWVzdGFcclxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVcmwgYSBkb25kZSBzZSB2YSBhIG1hbmRhciBsYSBlbCBmb3JtdWxhcmlvLCBzaW4gbGEgYmFzZV91cmxcclxuICogQHBhcmFtIHtib29sZWFufSBpc19tZXNzYWdlIFNpIHNlIGVzcGVyYSB1biBtZW5zYWplIG8gbm8gY29tbyByZXNwdWVzdGEgXHJcbiAqIEBwYXJhbSB7Y2FsbGJhY2t9IHJlY29nbml6ZUVsZW1lbnRzIEZ1bmNpb24gcGFyYSByZWNvbm9jZXIgbG9zIGVsZW1lbnRvcyBhdXRvZ2VuZXJhZG9zXHJcbiAqIEBwYXJhbSB7P2NhbGxiYWNrfSBhY3Rpb24gY2FsbGJhY2sgcXVlIHJlY2liZSBsb3MgZGF0b3MgZGVzZGUgZWwgc2Vydmlkb3IgcGFyYSBoYWNlciBhbGdvIGNvbiBlbGxvc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybSBmb3JtdWxhcmlvIGEgc2VyIGVudmlhZG8gYWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtjYWxsYmFja30gY2FsbGJhY2sgZnVuY2lvbiBhIHNlciBlamVjdXRhZGEgZGVzcHVlcyBxdWUgdG9kbyBzZSBjdW1wbGEsIGNvbW8gZ2V0IHVzZXJzXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGxvYWRpbmcgZnVuY3Rpb24gZm9yIGxvYWRpbmdcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBjb25uZWN0QW5kU2VuZCh1cmwsaXNfbWVzc2FnZSxyZWNvZ25pemVFbGVtZW50cyxhY3Rpb24sZm9ybSxjYWxsYmFjayxsb2FkaW5nKXtcclxuICBpZighbG9hZGluZykgbG9hZGluZyA9IGxpbmVMb2FkXHJcbiAgdmFyIGNvbm5lY3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPyBuZXcgWE1MSHR0cFJlcXVlc3QoKSA6IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyBcclxuICAgIGNvbm5lY3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNvbm5lY3QucmVhZHlTdGF0ZSA9PSA0ICYmIGNvbm5lY3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYobG9hZGluZylsb2FkaW5nKHRydWUpO1xyXG4gICAgICAgICAgaWYgKGFjdGlvbiAhPSBudWxsKSAge1xyXG4gICAgICAgICAgICAgIGFjdGlvbihjb25uZWN0LnJlc3BvbnNlVGV4dCxyZWNvZ25pemVFbGVtZW50cyk7ICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoaXNfbWVzc2FnZSl7XHJcbiAgICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoY29ubmVjdC5yZXNwb25zZVRleHQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihjYWxsYmFjayAhPSBudWxsKWNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgZWxzZSBpZiAoY29ubmVjdC5yZWFkeVN0YXRlICE9IDQpIHtcclxuICAgICAgICAgIGlmKGxvYWRpbmcpbG9hZGluZyhmYWxzZSk7ICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3Qub3BlbihcIlBPU1RcIixCQVNFX1VSTCArIHVybCwgdHJ1ZSk7XHJcbiAgICBjb25uZWN0LnNldFJlcXVlc3RIZWFkZXIoXCJjb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICBjb25uZWN0LnNlbmQoZm9ybSk7XHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogICAgICAgICBGdW5jaW9uZXMgZGUgbWVuc2FqZXMgeSBub3RpZmljYWNpb25lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vKipcclxuICogRGlzcGxheSBNZXNzYWdlXHJcbiAqIE11ZXN0cmEgdW5hIG5vdGlmaWNhY2lvbiBkZWwgcmVzdWx0YWRvIGRlIGxhIGNvbnN1bHRhXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIHN0cmluZyB0byBiZSBkaXNwbGF5ZWQgXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZGlzcGxheU1lc3NhZ2UobWVzc2FnZSl7XHJcbiAgdmFyIGNvbG9yID0gXCJyZ2JhKDEwMiwxODcsMTA2LDEpXCI7XHJcbiAgdmFyIHRvYXN0LHNwYW47XHJcblxyXG4gICAgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0VSUk9SKSl7XHJcbiAgICAgIGNvbG9yID0gXCJyZ2JhKDI0NCw2Nyw1NCwxKVwiO1xyXG4gICAgfWVsc2UgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0lORk8pKXtcclxuICAgICAgY29sb3IgPSBcInJnYmEoMiwxMzYsMjA5LDEpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgPSAkKFwiLnRvYXN0XCIpXHJcbiAgICBzcGFuID0gdG9hc3QuZmluZChcInNwYW5cIikuaHRtbChtZXNzYWdlKTtcclxuICAgIHNwYW4uY3NzKHtiYWNrZ3JvdW5kOmNvbG9yfSk7XHJcbiAgICB0b2FzdC5jc3Moe2Rpc3BsYXk6XCJmbGV4XCJ9KTtcclxuICAgIFxyXG4gICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjFcIn0sNTAwLGZ1bmN0aW9uKCl7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjBcIn0pO1xyXG4gICAgICAgIHRvYXN0LmNzcyh7ZGlzcGxheTpcIm5vbmVcIn0pO1xyXG4gICAgICB9LCAyMDAwKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5QWxlcnQodGl0bGUsbWVzc2FnZSx0eXBlKXtcclxuICBpZighdGl0bGUpIHRpdGxlID0gXCJSZXZpc2VcIjtcclxuICBpZighbWVzc2FnZSkgbWVzc2FnZSA9IFwiQXNlZ3VyYXRlIGRlIGxsZW5hciB0b2RvcyBsb3MgY2FtcG9zXCJcclxuICBpZighdHlwZSkgdHlwZSA9IFwiZXJyb3JcIlxyXG4gIHN3YWwoe1xyXG4gICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIHRleHQ6IG1lc3NhZ2UsXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bicsXHJcbiAgICAgIGJ1dHRvbnNTdHlsaW5nOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICBmdWNuaW9uZXMgcGFyYSBMbGVuYXIgdGFibGFzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogTGxlbmEgbGEgdGFibGEgYWN0dWFsIGNvbiBsb3MgZGF0b3MgcXVlIHZpZW5lbiBkZWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtzdHJpbmd9ICRjb250ZW50IEVsIGh0bWwgY29uIGxvcyBkYXRvcyBhIHNlciBtb3N0cmFkb3MsIHZpZW5lbiBzaWVtcHJlIGRlc2RlIGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEVsIGNhbGxiYWNrIHBhcmEgcmVjb25vY2VyIGEgbG9zIG51ZXZvcyBpdGVtc1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZnVuY3Rpb24gZmlsbEN1cnJlbnRUYWJsZSgkY29udGVudCxjYWxsYmFjayx0YWJsZUlEKXtcclxuICB2YXIgJHRhYmxlXHJcbiAgJChcImh0bWxcIikucmVtb3ZlQ2xhc3MoXCJncl9faWNwYXltZW50LXNvZnRfY29tXCIpXHJcbiAgaWYodGFibGVJRCAhPSB1bmRlZmluZWQpe1xyXG4gICAgJHRhYmxlID0gJCgnIycrdGFibGVJRCArIFwiIHRib2R5XCIpO1xyXG4gIH1lbHNle1xyXG4gICAgJHRhYmxlID0gJCgnW2NsYXNzKj1cInQtXCJdIHRib2R5Jyk7XHJcbiAgfVxyXG4gICR0YWJsZS5odG1sKCRjb250ZW50KTtcclxuICBpZihjYWxsYmFjaykgY2FsbGJhY2soKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExsZW5hIGxhIHRhYmxhIGNsaWVudGVzIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2xpZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2spe1xyXG4gIGZpbGxDdXJyZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2ssXCJ0LWNsaWVudHNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMbGVuYSBsYSB0YWJsYSBjYWphIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2FqYVRhYmxlKCRjb250ZW50LGNhbGxiYWNrKXtcclxuICBmaWxsQ3VycmVudFRhYmxlKCRjb250ZW50LGNhbGxiYWNrLFwiY2FqYVwiKTtcclxuICBpZihjYWxsYmFjayljYWxsYmFjaygpO1xyXG59XHJcbi8qKlxyXG4gKiBMbGVuYSBsYSBMaXN0YSBkZSBwYWdvcy9ub3RpZmljYWNpb25lcyBjb24gbG9zIGRhdG9zIHF1ZSB2aWVuZW4gZGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSAkY29udGVudCBFbCBodG1sIGNvbiBsb3MgZGF0b3MgYSBzZXIgbW9zdHJhZG9zLCB2aWVuZW4gc2llbXByZSBkZXNkZSBlbCBzZXJ2aWRvclxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBFbCBjYWxsYmFjayBwYXJhIHJlY29ub2NlciBhIGxvcyBudWV2b3MgaXRlbXNcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBmaWxsUGF5bWVudHNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIubGlzdC1uZXh0cGF5bWVudHNcIik7XHJcbiAgJGNvbnRhaW5lci5odG1sKCRjb250ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbEF2ZXJpYXNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIjYXZlcmlhcy1saXN0XCIpO1xyXG4gICRjb250YWluZXIuaHRtbCgkY29udGVudCk7XHJcbiAgYnVzQXZlcmlhLiRlbWl0KCd0aWNrZXRzLWxpc3RlZCcsMSk7XHJcbiAgY2FsbGJhY2soKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbGxJbnN0YWxsYXRpb25zTGlzdCgkY29udGVudCxjYWxsYmFjayl7XHJcbiAgdmFyICRjb250YWluZXIgPSAkKFwiI2luc3RhbGxhdGlvbnMtbGlzdFwiKTtcclxuICAkY29udGFpbmVyLmh0bWwoJGNvbnRlbnQpO1xyXG4gIGNhbGxiYWNrKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VDb250cmFjdExpc3QocmVzcG9uc2UsY2FsbGJhY2spe1xyXG4gIGlmKHJlc3BvbnNlICE9IFwibmFkYVwiKXtcclxuICAgIHZhciBjb250cmFjdHMgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcclxuICAgIHZhciB2YWx1ZSxzZXJ2aWNlLGVxdWlwbWVudCxlTWFjLHJvdXRlcixyTWFjLGNvZGU7XHJcbiAgICB2YXIgc2VsZWN0Q29udHJhY3QgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKTtcclxuICAgIHZhciBlbGVtZW50ID0gXCI8b3B0aW9uIHZhbHVlPScnPi0tU2VsZWNjaW9uYS0tPC9vcHRpb24+XCI7XHJcbiAgICB2YXIgY2xpZW50ZSA9IGNvbnRyYWN0cy5jbGllbnRlO1xyXG4gICAgdmFyIGNvbnRyYWN0SWQgXHJcbiAgICBpZihjdXJyZW50UGFnZSAhPSAnZGV0YWxsZXMnKXtcclxuICAgICAgY29udHJhY3RJZCA9IGNvbnRyYWN0VGFibGUuZ2V0SWQoKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBjb250cmFjdElkID0gZGV0YWlsc0NvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKS5pZF9jb250cmF0b1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udHJhY3RzLmNvbnRyYXRvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YWx1ZSAgICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wiaWRfY29udHJhdG9cIl07XHJcbiAgICAgIHNlcnZpY2UgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJzZXJ2aWNpb1wiXTtcclxuICAgICAgZXF1aXBtZW50ID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcIm5vbWJyZV9lcXVpcG9cIl07XHJcbiAgICAgIHJvdXRlciAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJyb3V0ZXJcIl07XHJcbiAgICAgIGVNYWMgICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJtYWNfZXF1aXBvXCJdO1xyXG4gICAgICByTWFjICAgICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wibWFjX3JvdXRlclwiXTtcclxuICAgICAgY29kZSAgICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wiY29kaWdvXCJdO1xyXG4gICAgICBlbGVtZW50ICs9IFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyB2YWx1ZSArIFwiJyBkYXRhLXNlcnZpY2U9J1wiK3NlcnZpY2UrXCInICBkYXRhLWVxdWlwbWVudD0nXCIrZXF1aXBtZW50K1wiJyAgZGF0YS1lLW1hYz0nXCIrZU1hYytcIidcIjtcclxuICAgICAgZWxlbWVudCArPSBcIiBkYXRhLXJvdXRlcj0nXCIrcm91dGVyK1wiJyAgZGF0YS1yLW1hYz0nXCIrck1hYytcIicgZGF0YS1jb2RlPSdcIitjb2RlK1wiJz5cIjtcclxuICAgICAgZWxlbWVudCArPSB2YWx1ZSArXCI8L29wdGlvbj5cIjsgIFxyXG4gICAgfVxyXG4gICAgc2VsZWN0Q29udHJhY3QuaHRtbChlbGVtZW50KTtcclxuICAgIHNlbGVjdENvbnRyYWN0LnZhbChjb250cmFjdElkKS5jaGFuZ2UoKTtcclxuICAgICQoXCIjZXh0cmEtY2xpZW50LW5hbWVcIikudmFsKGNsaWVudGVbJ25vbWJyZXMnXSArIFwiIFwiICsgY2xpZW50ZVsnYXBlbGxpZG9zJ10pO1xyXG5cclxuICB9ZWxzZXtcclxuICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfRVJST1IgKyBcIiBFc3RlIGNsaWVudGUgbm8gZXhpc3RlIHJldmlzZSBzdSBjZWR1bGEgcG9yIGZhdm9yXCIpO1xyXG4gIH0gXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyVGJvZHkob2JqZWNJZCl7XHJcbiAgJChvYmplY0lkKS5odG1sKFwiXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlUGF5bWVudExpc3QocmVzcG9uc2UsY2FsbGJhY2spe1xyXG4gIHZhciBzZWxlY3RQYXlVbnRpbCA9ICQoJyNzZWxlY3QtcGF5LXVudGlsJyk7XHJcbiAgc2VsZWN0UGF5VW50aWwuaHRtbChyZXNwb25zZSk7XHJcbiAgc2VsZWN0UGF5VW50aWwucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICBzZWxlY3RQYXlVbnRpbC5jaGFuZ2UoKTtcclxuICBpZihjYWxsYmFjayljYWxsYmFjaygpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIGlzRW1wdHlcclxuICogVmVyaWZpY2Egc2kgbG9zIHZhbG9yZXMgZGFkb3MgZXN0YW4gdmFjaW9zIG8gc29uIG51bG9zIFxyXG4gKiBAcGFyYW0ge0FycmF5LiA8IHN0cmluZ30gdmFsdWVzXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0VtcHR5KHZhbHVlcyxpc19udW0pe1xyXG4gIGZvcih2YXIgaSA9IDAgOyBpIDwgdmFsdWVzLmxlbmd0aCA7IGkrKyl7XHJcbiAgICBpZiAodmFsdWVzW2ldID09IG51bGwgfHwgdmFsdWVzW2ldID09IFwiXCIpe1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gXHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNhbGRvKG1vbmV5KXtcclxuICBtb25leSA9IFwiUkQkIFwiKyBDdXJyZW5jeUZvcm1hdChtb25leSlcclxuICAkKFwiLmN1cnJlbnQtc2FsZG9cIikudGV4dChtb25leSk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlQ291bnQoJGNvbnRlbnQpe1xyXG4gICQoXCIudG90YWwtcm93c1wiKS5odG1sKCRjb250ZW50KTtcclxufVxyXG4vLyArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXHJcbi8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXIgcGFzc3dvcmRzIHZhbGlkYXRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4vLyArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXHJcbi8vXHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGFsKCRtb2RhbElkKXtcclxuICB2YXIgJHVzZXJQYXNzd29yZCA9ICQoJG1vZGFsSWQrJyAucGFzc3dvcmQnKTtcclxuICB2YXIgJHVzZXJQYXNzd29yZENvbmZpcm0gPSAkKCRtb2RhbElkKycgLnBhc3N3b3JkLWNvbmZpcm0nKTtcclxuICB2YXIgJHNhdmVCdXR0b24gPSAkKCRtb2RhbElkKycgLnNhdmUnKTtcclxuICBcclxuICAkdXNlclBhc3N3b3JkQ29uZmlybS5vbignYmx1ciBrZXl1cCcsZnVuY3Rpb24oKXtcclxuICAgIHZhbGlkYXRlVHdvKCR1c2VyUGFzc3dvcmQsJHVzZXJQYXNzd29yZENvbmZpcm0sJHNhdmVCdXR0b24pO1xyXG4gIH0pO1xyXG4gICRzYXZlQnV0dG9uLm9uKCdjbGljaycsY2xlYXJGb3JtKCRtb2RhbElkKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlVHdvKCRmaXJzdE9iamVjdCwkc2Vjb25kT2JqZWN0LCRidXR0b24pe1xyXG4gICAgaWYoJHNlY29uZE9iamVjdC52YWwoKSA9PSAkZmlyc3RPYmplY3QudmFsKCkgJiYgJHNlY29uZE9iamVjdC52YWwoKSAhPSBcIlwiKXtcclxuICAgICAgcmVwbGFjZUNsYXNzKCRmaXJzdE9iamVjdC5wYXJlbnQoKSxcImhhcy1lcnJvclwiLFwiaGFzLXN1Y2Nlc3NcIik7XHJcbiAgICAgIHJlcGxhY2VDbGFzcygkc2Vjb25kT2JqZWN0LnBhcmVudCgpLFwiaGFzLWVycm9yXCIsXCJoYXMtc3VjY2Vzc1wiKTtcclxuICAgICAgJGJ1dHRvbi5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIixcIlwiKTtcclxuXHJcbiAgICB9ZWxzZXtcclxuICAgICAgIHJlcGxhY2VDbGFzcygkZmlyc3RPYmplY3QucGFyZW50KCksXCJoYXMtc3VjY2Vzc1wiLFwiaGFzLWVycm9yXCIpO1xyXG4gICAgICAgcmVwbGFjZUNsYXNzKCRzZWNvbmRPYmplY3QucGFyZW50KCksXCJoYXMtc3VjY2Vzc1wiLFwiaGFzLWVycm9yXCIpO1xyXG4gICAgICAgJGJ1dHRvbi5hdHRyKFwiZGlzYWJsZWRcIixcIlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVUaGlzKCl7XHJcbiAgdmFyICR1c2VyUGFzc3dvcmQgPSAkKCcucGFzc3dvcmQnKTtcclxuICB2YXIgJHVzZXJQYXNzd29yZENvbmZpcm0gPSAkKCcucGFzc3dvcmQtY29uZmlybScpO1xyXG4gIHZhciAkc2F2ZUJ1dHRvbiA9ICQoJy5zYXZlJyk7XHJcbiAgXHJcbiAgJHVzZXJQYXNzd29yZC5vbignYmx1ciBrZXl1cCcsZnVuY3Rpb24oKXtcclxuICAgIHZhbGlkYXRlVHdvKCR1c2VyUGFzc3dvcmQsJHVzZXJQYXNzd29yZENvbmZpcm0sJHNhdmVCdXR0b24pO1xyXG4gIH0pO1xyXG4gICR1c2VyUGFzc3dvcmRDb25maXJtLm9uKCdibHVyIGtleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVUd28oJHVzZXJQYXNzd29yZCwkdXNlclBhc3N3b3JkQ29uZmlybSwkc2F2ZUJ1dHRvbik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyRm9ybShtb2RhbElkKXtcclxuICAkKG1vZGFsSWQgKyBcIiBpbnB1dFwiKS52YWwoXCJcIik7XHJcbn1cclxuZnVuY3Rpb24gZGVsZXRlVmFsaWRhdGlvbigkaW5wdXRFbGVtZW50LCB0ZXh0LCAkYnV0dG9uVG9BY3RpdmUpe1xyXG4gIHZhciBpbm5lclRleHQ7XHJcbiAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICB2YXIgc2VsZiAgPSB0aGlzO1xyXG4gIHZhciB3YXJuaW5nID0gJCgnI2NhbmNlbC1jb250cmFjdC1tb2RhbCAuYWxlcnQnKTtcclxuXHJcbiAgJGlucHV0RWxlbWVudC5vbihcImtleXVwXCIsZnVuY3Rpb24oZSl7XHJcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgaW5uZXJUZXh0ID0gJCh0aGlzKS52YWwoKSBcclxuICAgIGlmKGlubmVyVGV4dC50b0xvd2VyQ2FzZSgpID09IHNlbGYudGV4dC50b0xvd2VyQ2FzZSgpKXtcclxuICAgICAgJGJ1dHRvblRvQWN0aXZlLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgd2FybmluZy5hZGRDbGFzcygnaGlkZScpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICRidXR0b25Ub0FjdGl2ZS5hdHRyKFwiZGlzYWJsZWRcIixcIlwiKTtcclxuICAgICAgd2FybmluZy5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcclxuLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRnVuY2lvbmVzIGRlIHV0aWxlcmlhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4vLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbi8vICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcclxuLy9cclxuXHJcblxyXG5mdW5jdGlvbiByZXBsYWNlQ2xhc3MoJG9iamVjdCxvbGRDbGFzcyxuZXdDbGFzcyl7XHJcbiAgICRvYmplY3QuYWRkQ2xhc3MobmV3Q2xhc3MpO1xyXG4gICAkb2JqZWN0LnJlbW92ZUNsYXNzKG9sZENsYXNzKVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlU2VydmljZUNhcmRDbGlja2FibGUoKXtcclxuICAgIHZhciBzZXJ2aWNlQ2FyZCAgICAgID0gJChcIi5zZXJ2aWNlLWNhcmRcIik7XHJcbiAgICB2YXIgYnRuUHJpbnRDb250cmFjdCA9ICQoJyNidG4tcHJpbnQtcmVxdWlyZW1lbnQnKTtcclxuXHJcbiAgICBzZXJ2aWNlQ2FyZC5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgJHRoaXMgICAgICAgPSAkKHRoaXMpO1xyXG4gICAgICB2YXIgc2VydmljZV9pZCAgPSAkdGhpcy5hdHRyKCdkYXRhLWlkJyk7IFxyXG4gICAgICB2YXIgcGF5bWVudCAgICAgPSAkdGhpcy5hdHRyKCdkYXRhLXBheW1lbnQnKTtcclxuICAgICAgdmFyIHJlYWxMaW5rICAgID0gYnRuUHJpbnRDb250cmFjdC5hdHRyKCdkYXRhLWhyZWYnKVxyXG4gICAgICBcclxuICAgICAgc2VydmljZUNhcmQucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICR0aGlzLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICBidG5QcmludENvbnRyYWN0LmF0dHIoXCJocmVmXCIscmVhbExpbmsgKyBcIi9cIiArIHNlcnZpY2VfaWQpO1xyXG4gICAgICAkKCcjY29udHJhY3QtY2xpZW50LXBheW1lbnQnKS52YWwocGF5bWVudClcclxuICAgIH0pXHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgIFZlcmlmeSBSb3dzICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuZnVuY3Rpb24gdmVyaWZ5Q29udHJhY3RTdGF0dXMoKXtcclxuICAkKFwiLnRkLWVzdGFkb1wiKS5lYWNoKGZ1bmN0aW9uKGksdmFsdWUpe1xyXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgIHZhciB0ZXh0ID0gJHRoaXMudGV4dCgpLnRyaW0oKTtcclxuICAgIGlmKHRleHQgPT0gXCJhY3Rpdm9cIil7XHJcbiAgICAgICR0aGlzLmNzcyh7Y29sb3I6XCJncmVlblwifSlcclxuICAgIH1lbHNlIGlmKHRleHQgPT0gXCJzYWxkYWRvXCIpe1xyXG4gICAgICAkdGhpcy5wYXJlbnRzKFwidHJcIikuY3NzKHtiYWNrZ3JvdW5kOlwicmdiYSgyMiwyNTUsMCwuMylcIixjb2xvcjpcIiM1NTVcIn0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2ZXJpZnlDbGllbnRTdGF0dXMoKXtcclxuICAgJChcInRkXCIpLmVhY2goZnVuY3Rpb24oaSx2YWx1ZSl7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdmFyIHRleHQgPSAkdGhpcy50ZXh0KCkudHJpbSgpO1xyXG4gICAgaWYodGV4dCA9PSBcIm5vIGFjdGl2b1wiKXtcclxuICAgICAgJHRoaXMuY3NzKHtjb2xvcjpcInJnYmEoMjAwLDAsMCwuNylcIn0pXHJcbiAgICB9ZWxzZSBpZih0ZXh0ID09IFwiYWN0aXZvXCIpe1xyXG4gICAgICAkdGhpcy5jc3Moe2NvbG9yOlwiZ3JlZW5cIn0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgICAgICAgICAgTG9hZGVycyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZnVuY3Rpb24gaGVhdnlMb2FkKHN0b3Ape1xyXG4gIGlmKCFzdG9wKXtcclxuICAgIHZhciBodG1sID0gJzxkaXYgY2xhc3M9XCJoZWF2eS1sb2FkZXIgYWN0aXZlXCI+J1xyXG4gICAgICAgIGh0bWwgKz0gICAnPGRpdiBjbGFzcz1cImNpcmNsZS1sb2FkXCI+PC9kaXY+J1xyXG4gICAgICAgIGh0bWwgKz0gICAnPGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj5QcmVwYXJhbmRvIGxvcyBkYXRvczwvZGl2PidcclxuICAgICAgICBodG1sICs9ICc8L2Rpdj4nXHJcbiAgICAkKFwiYm9keVwiKS5hcHBlbmQoaHRtbClcclxuICAgICQoXCJib2R5XCIpLmNzcyh7b3ZlcmZsb3c6XCJoaWRkZW5cIn0pO1xyXG4gICAgdmFyIG1lc3NhZ2UgPSAkKFwiLmhlYXZ5LWxvYWRlciAubWVzc2FnZVwiKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgbWVzc2FnZS50ZXh0KFwiQ29uZmlndXJhbmRvLi4uXCIpO1xyXG4gICAgfSw0MDAwKVxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBtZXNzYWdlLnRleHQoXCJDYXNpIFRlcm1pbmFtb3MgLi4uXCIpO1xyXG4gICAgfSw4MDAwKVxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBtZXNzYWdlLnRleHQoXCJUZXJtaW5hbmRvIGVsIHByb2Nlc28gLi4uXCIpO1xyXG4gICAgICByZW1vdmVMb2FkZXIoKTtcclxuICAgIH0sMTUwMDApXHJcbiAgfWVsc2V7XHJcbiAgICByZW1vdmVMb2FkZXIoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZUxvYWRlcigpe1xyXG4gICAgdmFyIGxvYWRlciA9ICQoXCIuaGVhdnktbG9hZGVyXCIpO1xyXG4gICAgbG9hZGVyLnJlbW92ZSgpO1xyXG4gICAgJChcImJvZHlcIikuY3NzKHtvdmVyZmxvdzpcImF1dG9cIn0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGluZUxvYWQoc3RvcCkge1xyXG4gIGlmKCFzdG9wKXtcclxuICAgICAkKFwiLmxvYWRlclwiKS5jc3Moe1xyXG4gICAgICBkaXNwbGF5OiBcImJsb2NrXCJcclxuICAgICAgfSk7XHJcbiAgfWVsc2V7XHJcbiAgICAkKFwiLmxvYWRlclwiKS5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XHJcbiAgfVxyXG59IiwiLy8gZnVuY2lvbmVzIGRlIGJvb3RzdHJhcFxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVQYXNzd29yZChwYXNzd29yZCl7XHJcbiAgdmFyIGV4cHJlc3Npb24gPSAnJztcclxuICB2YXIgaGFzX2xvd2VyY2FzZSA9IGZhbHNlO1xyXG4gIHZhciBoYXNfdXBwZXJjYXNlID0gZmFsc2U7XHJcbiAgdmFyIGhhc19kaWdpdCA9ICcvKlxcZCc7XHJcblxyXG4gIGlmKHBhc3N3b3JkLmxlbmd0aCA+IDgpIGFsZXJ0KFwibWF5b3IgYSA4XCIpXHJcbiAgaWYoL1xcZC8udGVzdChwYXNzd29yZCkpYWxlcnQoXCJ0aWVuZSBkaWdpdG9cIilcclxuICBpZigvW2Etel0vLnRlc3QocGFzc3dvcmQpKWFsZXJ0KFwidGllbmUgbWluaXNjdWxhc1wiKVxyXG4gIGlmKC9bQS1aXS8udGVzdChwYXNzd29yZCkpIGFsZXJ0KCd0aWVuZSBtYXl1c2N1bGFzJylcclxufSIsIiQoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBjdXJyZW50UGFnZSA9ICQoXCJ0aXRsZVwiKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xyXG4gIGN1cnJlbnRQYWdlID0gY3VycmVudFBhZ2VbNF0udG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgXHJcbiAgaWYgKGN1cnJlbnRQYWdlID09IFwiYWRtaW5pc3RyYWRvclwiKSB7XHJcbiAgICBuZXdVc2VyRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0ZSgpO1xyXG4gIGFkbWluRnVuY3Rpb25zKCk7XHJcbiAgdXNlckluZm9UaXAoKTtcclxuICBtYWtlU2VydmljZUNhcmRDbGlja2FibGUoKTtcclxuICBcclxuICBpZiAoY3VycmVudFBhZ2UgPT0gXCJkZXRhbGxlc1wiKSB7XHJcbiAgICBkZXRhaWxzRnVuY3Rpb25zKCk7XHJcbiAgfVxyXG5cclxuICBub3RpZmljYXRpb25GdW5jdGlvbnMoKTtcclxuICBuZXdDb250cmFjdEZ1bmN0aW9ucygpO1xyXG4gIGNoZWNrV2luZG93U2l6ZSgpO1xyXG4gIFxyXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2hlY2tXaW5kb3dTaXplKCk7XHJcbiAgfSlcclxuXHJcbiAgb25XaW5kb3dMb2FkRnVuY3Rpb25zKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBEYXRlOlxyXG4gICAqIE9idGllbmUgbGEgZmVjaGEgYWN0dWFsIGFsIHNlZ3VuZG8geSBsYSBtdWVzdHJhIGVuIGxhIHBhbnRhbGxhIGRlIGluaWNpb1xyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcclxuICAgIHZhciAkZGF5ID0gJCgnLmRheScpO1xyXG4gICAgdmFyICRtb250aFllYXIgPSAkKCcubW9udGgteWVhcicpO1xyXG4gICAgdmFyICRkYXlXZWVrID0gJCgnLmRheXdlZWsnKTtcclxuICAgIHZhciAkSG9yYSA9ICQoJy5ob3VyIHNwYW4nKTtcclxuICAgIHZhciBkYXRlLCBkYXksIG1vbnRoLCB5ZWFyLCBzSG91cjtcclxuICAgIHZhciBkYXlzID0gW1wiRG9taW5nb1wiLCBcIkx1bmVzXCIsIFwiTWFydGVzXCIsIFwiTWllcmNvbGVzXCIsIFwiSnVldmVzXCIsIFwiVmllcm5lc1wiLCBcIlNhYmFkb1wiXTtcclxuICAgIHZhciBtb250aHMgPSBbXCJFbmVyb1wiLCBcIkZlYnJlcm9cIiwgXCJNYXJ6b1wiLCBcIkFicmlsXCIsIFwiTWF5b1wiLCBcIkp1bmlvXCIsIFwiSnVsaW9cIiwgXCJBZ29zdG9cIiwgXCJTZXB0aWVtYnJlXCIsIFwiT2N0dWJyZVwiLCBcIk5vdmllbWJyZVwiLCBcIkRpY2llbWJyZVwiXTtcclxuXHJcbiAgICBzZXRJbnRlcnZhbCh1cGRhdGVIb3VyLCAxMDAwKTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVIb3VyKCkge1xyXG4gICAgICBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgc0RhdGUgPSBkYXRlLnRvU3RyaW5nKClcclxuICAgICAgJGRheS50ZXh0KGRhdGUuZ2V0RGF0ZSgpKTtcclxuICAgICAgJG1vbnRoWWVhci50ZXh0KFwiRGUgXCIgKyBtb250aHNbZGF0ZS5nZXRNb250aCgpXSArIFwiIGRlIFwiICsgZGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgJGRheVdlZWsudGV4dChkYXlzW2RhdGUuZ2V0RGF5KCldKTtcclxuXHJcbiAgICAgIHNIb3VyID0gbW9tZW50KCkuZm9ybWF0KCdMVFMnKTtcclxuICAgICAgJEhvcmEuaHRtbChzSG91cik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZG1pbiBGdW5jdGlvbnM6XHJcbiAgICogc2UgZW5jYXJnYSBkZSBlbCBtb3ZpbWllbnRvIGRlIGxvcyBwYW5lbGVzIGVuIGxhIHBhbnRhbGxhICdhZG1pbmlzdHJhZG9yJ1xyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXHJcblxyXG4gIGZ1bmN0aW9uIGFkbWluRnVuY3Rpb25zKCkge1xyXG4gICAgJCgnI2NvbXBhbnktc2VjdGlvbicpLmFuaW1hdGUoe1xyXG4gICAgICBsZWZ0OiBcIjBcIlxyXG4gICAgfSwgMjAwKVxyXG4gICAgJCgnLmFkbWluaXN0cmFkb3IgLmFzaWRlLWJ1dHRvbnMgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgdmFyIGNhcmROYW1lID0gJHRoaXMuYXR0cignaHJlZicpLnNsaWNlKDEpO1xyXG4gICAgICBpZiAoY2FyZE5hbWUgIT0gbnVsbCkge1xyXG4gICAgICAgICQoJy5jb21wYW55LWRldGFpbHMnKS5hbmltYXRlKHtcclxuICAgICAgICAgIGxlZnQ6IFwiLTExMCVcIlxyXG4gICAgICAgIH0sIDIwMClcclxuICAgICAgICAkKCcjJyArIGNhcmROYW1lICsgJy5jb21wYW55LWRldGFpbHMnKS5hbmltYXRlKHtcclxuICAgICAgICAgIGxlZnQ6IFwiMFwiXHJcbiAgICAgICAgfSwgMjAwKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGlmICgkKFwiI2Fjb3VudC1zZWN0aW9uXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgJCgnI2Fjb3VudC1zZWN0aW9uJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgbGVmdDogXCIwXCJcclxuICAgICAgfSwgMjAwKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbmV3IFVzZXIgRm9ybTpcclxuICAgKiB2YWlkYSBsYXMgY29udHJhc2XDsWFzIGVuIGxvcyBmb3JtdWxhcmlvcyBkZSBsb3MgdXN1YXJpb3NcclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqL1xyXG5cclxuICBmdW5jdGlvbiBuZXdVc2VyRm9ybSgpIHtcclxuICAgIHZhbGlkYXRlTW9kYWwoXCIjbmV3LXVzZXItbW9kYWxcIik7XHJcbiAgICB2YWxpZGF0ZU1vZGFsKFwiI3VwZGF0ZS11c2VyLW1vZGFsXCIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlciBJbmZvIFRpcFxyXG4gICAqIGhhY2UgdW4gdG9nZ2xlIGVuIGxhIHZpc2liaWxpZGFkIGRlIGxhIGluZm8gZGVsIHVzdWFyaW9cclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqL1xyXG5cclxuICBmdW5jdGlvbiB1c2VySW5mb1RpcCgpIHtcclxuICAgIHZhciBpbmZvVGlwID0gJChcIi51c2VyLWluZm8tdGlwXCIpO1xyXG4gICAgdmFyIHByb2ZpbGVQaWN0dXJlID0gJChcIi5wcm9maWxlLXBpY3R1cmVcIik7XHJcbiAgICB2YXIgYnRuTW9yZSA9ICQoXCIuYnRuLW1vcmVcIik7XHJcblxyXG4gICAgYnRuTW9yZS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBpbmZvVGlwLnRvZ2dsZUNsYXNzKFwidmlzaWJsZVwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gbmV3Q29udHJhY3RGdW5jdGlvbnMoKSB7XHJcbiAgdmFyIGJ0blByaW50Q29udHJhY3QgPSAkKFwiI2J0bi1wcmludC1jb250cmFjdFwiKTtcclxuICB2YXIgZG9jdW1lbnQgPSAkKFwiLm5vdGUtaXRlbVwiKTtcclxuICB2YXIgcmFkaW9BY3RpdmF0ZUNvbnRyYWN0ID0gJChcIiNyYWRpby1uZXctY29udHJhY3RcIik7XHJcbiAgdmFyIHJhZGlvRGlzYWJsZUNvbnRyYWN0ID0gJChcIiNyYWRpby1qdXN0LXJlcXVpcmVtZW50XCIpO1xyXG4gIHZhciBjb250cmFjdENvbnRyb2xzID0gJChcIi5jb250cmFjdC1jb250cm9sc1wiKTtcclxuICB2YXIgcmVxdWlyZW1lbnRDb250cm9scyA9ICQoXCIucmVxdWlyZW1lbnQtY29udHJvbHNcIik7XHJcblxyXG4gIHJhZGlvQWN0aXZhdGVDb250cmFjdC5wYXJlbnRzKFwibGFiZWxcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgYWN0aXZhdGVDb250cmFjdE1vZGUoKTtcclxuXHJcbiAgfSk7XHJcblxyXG4gIHJhZGlvRGlzYWJsZUNvbnRyYWN0LnBhcmVudHMoXCJsYWJlbFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBkaXNhYmxlQ29udHJhY3RNb2RlKClcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gYWN0aXZhdGVDb250cmFjdE1vZGUoJGJ0bikge1xyXG4gICAgcmFkaW9EaXNhYmxlQ29udHJhY3RcclxuICAgICAgLnJlbW92ZUF0dHIoXCJjaGVja2VkXCIsIFwiXCIpXHJcbiAgICAgIC5odG1sKFwiXCIpXHJcbiAgICByYWRpb0FjdGl2YXRlQ29udHJhY3RcclxuICAgICAgLmF0dHIoXCJjaGVja2VkXCIsIFwiXCIpXHJcbiAgICAgIC5odG1sKFwiJiMxMDAwNDtcIilcclxuICAgIGRvY3VtZW50LnJlbW92ZUNsYXNzKFwicHJpbnQtcmVxdWlyZW1lbnRcIik7XHJcbiAgICBjb250cmFjdENvbnRyb2xzLnJlbW92ZUNsYXNzKFwiaGlkZVwiKVxyXG4gICAgcmVxdWlyZW1lbnRDb250cm9scy5hZGRDbGFzcyhcImhpZGVcIilcclxuXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkaXNhYmxlQ29udHJhY3RNb2RlKCRidG4pIHtcclxuICAgIHJhZGlvQWN0aXZhdGVDb250cmFjdFxyXG4gICAgICAucmVtb3ZlQXR0cihcImNoZWNrZWRcIiwgXCJcIilcclxuICAgICAgLmh0bWwoXCJcIilcclxuICAgIHJhZGlvRGlzYWJsZUNvbnRyYWN0XHJcbiAgICAgIC5hdHRyKFwiY2hlY2tlZFwiLCBcIlwiKVxyXG4gICAgICAuaHRtbChcIiYjMTAwMDQ7XCIpXHJcbiAgICBkb2N1bWVudC5hZGRDbGFzcyhcInByaW50LXJlcXVpcmVtZW50XCIpO1xyXG4gICAgcmVxdWlyZW1lbnRDb250cm9scy5yZW1vdmVDbGFzcyhcImhpZGVcIilcclxuICAgIGNvbnRyYWN0Q29udHJvbHMuYWRkQ2xhc3MoXCJoaWRlXCIpXHJcbiAgfVxyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgIE1vZGFscyBGdW5jdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbiQoJyNzZWFyY2gtY2xpZW50LW1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICB2YXIgYnV0dG9uID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KTtcclxuICBjbGllbnRUYWJsZS5pbml0KCk7XHJcbiAgdmFyIHRpdGxlID0gYnV0dG9uLmZpbmQoJy5zZWN0aW9uLXRpdGxlJykudGV4dCgpO1xyXG4gIGlmICghdGl0bGUpIHRpdGxlID0gXCJCdXNjYXIgQ2xpZW50ZVwiXHJcbiAgaWYgKHRpdGxlLnRvTG93ZXJDYXNlKCkudHJpbSgpID09IFwicmVnaXN0cmFyIHBhZ29cIikge1xyXG4gICAgYnV0dG9uVGV4dCA9IFwiaXIgYSBQYWdvc1wiXHJcbiAgfSBlbHNlIHtcclxuICAgIGJ1dHRvblRleHQgPSBcIk51ZXZvIENvbnRyYXRvXCJcclxuICB9XHJcblxyXG4gIHZhciBtb2RhbCA9ICQodGhpcylcclxuICBtb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS50ZXh0KHRpdGxlKVxyXG4gIG1vZGFsLmZpbmQoJy5tb2RhbC1mb290ZXIgLnNhdmUnKS50ZXh0KGJ1dHRvblRleHQpXHJcbiAgbW9kYWwuZmluZCgndGJvZHknKS5odG1sKCcnKVxyXG59KVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqICAgICAgICAgICAgICBvdGhlciBmdW5jdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICogXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZnVuY3Rpb24gZGV0YWlsc0Z1bmN0aW9ucygpIHtcclxuICB2YXIgc21hbGxCdXR0b25zU2VsZWN0ID0gJCgnLmJ0bi1zbWFsbCcpO1xyXG4gIHZhciB0YWJzID0ge1xyXG4gICAgY29udHJhY3RDb250cm9sczogW1wiI2NvbnRyYWN0c1wiLCBcIiNtb250aC1hbmQtZGF0ZVwiLCBcIiNyZWNvbm5lY3Qtc2VydmljZVwiLCAnI2V4dHJhLWNvbnRyYWN0JywgJyNleHRyYS1zZXJ2aWNlJywgJyNleHRyYS1leHRlbnNpb24nLCAnI2V4dHJhLXVwZ3JhZGUnXSxcclxuICAgIHBheW1lbnRDb250cm9sczogW1wiI3BheW1lbnRzXCIsIFwiI2RldGFsbGVzLWRlLXBhZ29cIiwgXCIjZGVzY3VlbnRvc1wiXVxyXG4gIH1cclxuXHJcbiAgJCgnW3JvbGU9XCJ0YWJcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIilcclxuXHJcbiAgICBpZiAoY29tcGFyZShocmVmLCB0YWJzLnBheW1lbnRDb250cm9scykpIHtcclxuICAgICAgJChcIi5wYXltZW50LWNvbnRyb2xzXCIpLmFkZENsYXNzKFwidmlzaWJsZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoXCIucGF5bWVudC1jb250cm9sc1wiKS5yZW1vdmVDbGFzcyhcInZpc2libGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbXBhcmUoaHJlZiwgdGFicy5jb250cmFjdENvbnRyb2xzKSkge1xyXG4gICAgICAkKFwiLmNvbnRyYWN0LWNvbnRyb2xzXCIpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChcIi5jb250cmFjdC1jb250cm9sc1wiKS5hZGRDbGFzcyhcImhpZGVcIilcclxuICAgIH1cclxuICAgIGdldFRhYkNvbnRyb2xzKCQodGhpcykpO1xyXG4gIH0pO1xyXG5cclxuICAkKCcuYnRuLXNtYWxsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgc21hbGxCdXR0b25zU2VsZWN0LnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICB9KVxyXG5cclxuICBmdW5jdGlvbiBjb21wYXJlKHZhbHVlLCBwb3NpYmxlVmFsdWVzKSB7XHJcbiAgICB2YXIgcmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgIHBvc2libGVWYWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAodGhlVmFsdWUpIHtcclxuICAgICAgaWYgKHZhbHVlID09IHRoZVZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUYWJDb250cm9scygkdGhpcykge1xyXG4gIHZhciBjb250cm9scyA9ICR0aGlzLmF0dHIoXCJhcmlhLWNvbnRyb2xzXCIpO1xyXG4gICQoXCIuZHluYW1pYy1jb250cm9sc1wiKS50ZXh0KGNvbnRyb2xzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm90aWZpY2F0aW9uRnVuY3Rpb25zKCkge1xyXG4gIHZhciBidG5BdmVyaWFzID0gJChcIiNidG4tc2VlLWF2ZXJpYXNcIik7XHJcbiAgdmFyIGJ0blBhZ29zID0gJChcIiNidG4tc2VlLXBhZ29zXCIpO1xyXG4gIHZhciBidG5DYWphQ2hpY2EgPSAkKCcjYnRuLXNlZS1jYWphJyk7XHJcbiAgdmFyIGJ0bkRldWRvcmVzID0gJChcIiNidG4tc2VlLWRldWRvcmVzXCIpXHJcbiAgdmFyIGJ0bkRheUluY29tZXMgPSAkKFwiI2J0bi1zZWUtZGF5LWluY29tZXNcIilcclxuICB2YXIgbGF5b3V0Q29udGFpbmVyID0gJChcIi5sYXlvdXQtY29udGFpbmVyXCIpO1xyXG5cclxuICBidG5BdmVyaWFzLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGxheW91dENvbnRhaW5lci5hbmltYXRlKHtcclxuICAgICAgbGVmdDogXCItMTAwJVwiXHJcbiAgICB9LCAyMDApO1xyXG4gIH0pO1xyXG5cclxuICBidG5QYWdvcy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7XHJcbiAgICAgIGxlZnQ6IFwiMFwiXHJcbiAgICB9LCAyMDApO1xyXG4gIH0pO1xyXG5cclxuICBidG5EZXVkb3Jlcy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7XHJcbiAgICAgIGxlZnQ6IFwiLTIwMCVcIlxyXG4gICAgfSwgMjAwKTtcclxuICB9KTtcclxuXHJcbiAgYnRuRGF5SW5jb21lcy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7XHJcbiAgICAgIGxlZnQ6IFwiLTMwMCVcIlxyXG4gICAgfSwgMjAwKTtcclxuICB9KTtcclxufVxyXG5cclxuJChcIiNzZWxlY3QtZXh0cmEtc2VydmljZVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gIHZhciAkdGhpcyA9ICQoKFwiI3NlbGVjdC1leHRyYS1zZXJ2aWNlIDpzZWxlY3RlZFwiKSk7XHJcbiAgdmFyIGNvc3QgPSAkdGhpcy5hdHRyKFwiZGF0YS1wYXltZW50XCIpO1xyXG5cclxuICAkKFwiI2V4dHJhLXNlcnZpY2UtY29zdFwiKS52YWwoY29zdClcclxufSk7XHJcblxyXG4kKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gIHZhciAkdGhpcyA9ICQoKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdCA6c2VsZWN0ZWRcIikpO1xyXG5cclxuICAkKFwiI2V4dHJhLWNvbnRyYWN0LXNlcnZpY2VcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLXNlcnZpY2VcIikpO1xyXG4gICQoXCIjZXh0cmEtZXF1aXBvXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1lcXVpcG1lbnRcIikpO1xyXG4gICQoXCIjZXh0cmEtcm91dGVyXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1yb3V0ZXJcIikpO1xyXG4gICQoXCIjZXh0cmEtZS1tYWNcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWUtbWFjXCIpKTtcclxuICAkKFwiI2V4dHJhLXItbWFjXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1yLW1hY1wiKSk7XHJcbiAgJChcIiNleHRyYS1jb2RlXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1jb2RlXCIpKTtcclxufSk7XHJcblxyXG4kKFwiLmNvbHVtbnMtcmlnaHRcIikucmVtb3ZlQ2xhc3MoXCJwdWxsLXJpZ2h0XCIpO1xyXG5cclxuJChcIiNzZWxlY3QtY29udHJhY3QtY29kZVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gIHZhciAkdGhpcyA9ICQoKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlIDpzZWxlY3RlZFwiKSk7XHJcbiAgJChcIiNjb250cmFjdC1pcFwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtaXAtZmluYWxcIikpO1xyXG4gICQoXCIjdS1jb250cmFjdC1pcFwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtaXAtZmluYWxcIikpO1xyXG5cclxufSk7XHJcblxyXG5mdW5jdGlvbiBjaGVja1dpbmRvd1NpemUoKSB7XHJcbiAgdmFyIHdpZHRoID0gd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoO1xyXG4gIHZhciBicmFuZE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnJhbmQgc3BhbicpO1xyXG5cclxuICBpZiAod2lkdGggPD0gMTEwMCkge1xyXG4gICAgYnJhbmROYW1lLnRleHRDb250ZW50ID0gXCJQXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIGJyYW5kTmFtZS50ZXh0Q29udGVudCA9IFwiUGF5bWVudFwiO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gb25XaW5kb3dMb2FkRnVuY3Rpb25zKCl7XHJcbiAgJCgnYm9keScpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICBwb3NpdGlvbiA9ICQoJ2JvZHknKS5zY3JvbGxUb3AoKVxyXG4gICAgbW92YWJsZU5hdiA9ICQoJy5hc2lkZS1uYXYtY29udGFpbmVyLCAuYXNpZGUtd2lkZS1sZWZ0JylcclxuICAgIGlmIChwb3NpdGlvbiA+PSA1MCkge1xyXG4gICAgICBpZighbW92YWJsZU5hdi5oYXNDbGFzcygnbW92ZWQnKSlcclxuICAgICAgICBtb3ZhYmxlTmF2LmFkZENsYXNzKCdtb3ZlZCcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtb3ZhYmxlTmF2LnJlbW92ZUNsYXNzKCdtb3ZlZCcpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG4iLCJ2YXIgVXNlcnMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgbmljaywgcGFzc3dvcmQsIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGUsIGlzX2VtcHR5O1xyXG5cclxuICAgIG5pY2sgICAgICA9ICQoXCIjdXNlci1uaWNrbmFtZVwiKS52YWwoKTtcclxuICAgIHBhc3N3b3JkICA9ICQoXCIjdXNlci1wYXNzd29yZFwiKS52YWwoKTtcclxuICAgIG5hbWUgICAgICA9ICQoXCIjdXNlci1uYW1lXCIpLnZhbCgpO1xyXG4gICAgbGFzdG5hbWUgID0gJChcIiN1c2VyLWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgZG5pICAgICAgID0gZ2V0VmFsKCQoXCIjdXNlci1kbmlcIikpO1xyXG4gICAgdHlwZSAgICAgID0gJChcIiN1c2VyLXR5cGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbbmljaywgcGFzc3dvcmQsIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGVdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICduaWNrbmFtZT0nICsgbmljayArIFwiJnBhc3N3b3JkPVwiICsgcGFzc3dvcmQgKyBcIiZuYW1lPVwiICsgbmFtZSArIFwiJmxhc3RuYW1lPVwiICsgbGFzdG5hbWU7XHJcbiAgICAgIGZvcm0gKz0gXCImZG5pPVwiICsgZG5pICsgXCImdHlwZT1cIiArIHR5cGU7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwidXNlci9hZGRuZXdcIiwgdHJ1ZSwgaW5pdEFkbWluSGFuZGxlcnMsIG51bGwsIGZvcm0sIFVzZXJzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG5pY2ssIHBhc3N3b3JkLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlO1xyXG5cclxuICAgIG5pY2sgICAgID0gJChcIiNlLW5pY2tuYW1lXCIpLnZhbCgpO1xyXG4gICAgbmFtZSAgICAgPSAkKFwiI2UtbmFtZVwiKS52YWwoKTtcclxuICAgIGxhc3RuYW1lID0gJChcIiNlLWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgZG5pICAgICAgPSAkKFwiI2UtZG5pXCIpLnZhbCgpO1xyXG4gICAgdHlwZSAgICAgPSAkKFwiI2UtdHlwZVwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtuaWNrLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbmlja25hbWU9JyArIG5pY2sgKyBcIiZuYW1lPVwiICsgbmFtZSArIFwiJmxhc3RuYW1lPVwiICsgbGFzdG5hbWU7XHJcbiAgICAgIGZvcm0gKz0gXCImZG5pPVwiICsgZG5pICsgXCImdHlwZT1cIiArIHR5cGU7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwidXNlci91cGRhdGVcIiwgdHJ1ZSwgaW5pdEFkbWluSGFuZGxlcnMsIG51bGwsIGZvcm0sIFVzZXJzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsZT11c2Vyc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3VzZXIvZ2V0dXNlcnMnLCBmYWxzZSwgaW5pdEFkbWluSGFuZGxlcnMsIHVzZXJUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBkZWxldGU6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInVzZXJfaWQ9XCIgKyBpZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL2RlbGV0ZXVzZXInLCB0cnVlLCBpbml0QWRtaW5IYW5kbGVycywgbnVsbCwgZm9ybSwgVXNlcnMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBjb25maXJtUGFzc3dvcmQ6IGZ1bmN0aW9uKHVzZXJJZCxjdXJyZW50UGFzc3dvcmQpIHtcclxuICAgIHZhciBmb3JtID0gJ3VzZXJfaWQ9JysgdXNlcklkICsnJmN1cnJlbnRfcGFzc3dvcmQ9JyArIGN1cnJlbnRQYXNzd29yZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL2NvbmZpcm1fcGFzc3dvcmQnLCBmYWxzZSwgZmFsc2UsIHByb2Nlc3NDb25maXJtRGF0YSwgZm9ybSwgbnVsbCwgbnVsbCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHByb2Nlc3NDb25maXJtRGF0YShyZXNwb25zZSkge1xyXG4gICAgICB2YXIgbmV3UGFzc3dvcmQgICAgICAgICA9ICQoXCIjYWNvdW50LW5ldy1wYXNzd29yZFwiKTtcclxuICAgICAgdmFyIG5ld1Bhc3N3b3JkQ29uZmlybSAgPSAkKFwiI2Fjb3VudC1jb25maXJtLW5ldy1wYXNzd29yZFwiKTtcclxuICAgICAgXHJcbiAgICAgIGlmIChyZXNwb25zZSA9PSAxKSB7ICAgICAgXHJcbiAgICAgICAgbmV3UGFzc3dvcmQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICBuZXdQYXNzd29yZENvbmZpcm0ucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICB2YWxpZGF0ZVRoaXMoKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgbmV3UGFzc3dvcmQuYXR0cignZGlzYWJsZWQnLHRydWUpO1xyXG4gICAgICAgIG5ld1Bhc3N3b3JkQ29uZmlybS5hdHRyKCdkaXNhYmxlZCcsdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGVQYXNzd29yZDogZnVuY3Rpb24odXNlcklkLGN1cnJlbnRQYXNzd29yZCxuZXdQYXNzd29yZCl7XHJcbiAgICB2YXIgZm9ybSA9ICd1c2VyX2lkPScrIHVzZXJJZCAgKyBcIiZjdXJyZW50X3Bhc3N3b3JkPVwiKyBjdXJyZW50UGFzc3dvcmQgKycmbmV3X3Bhc3N3b3JkPScgKyBuZXdQYXNzd29yZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL3VwZGF0ZV9wYXNzd29yZCcsIGZhbHNlLCBmYWxzZSwgVXNlcnMucGFzc3dvcmRDaGFuZ2VkLCBmb3JtLCBudWxsLGhlYXZ5TG9hZCk7XHJcbiAgfSxcclxuXHJcbiAgcGFzc3dvcmRDaGFuZ2VkOiBmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICBpZihyZXNwb25zZT09MSl7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfU1VDQ0VTUyArICdDb250cmFzZcOxYSBDYW1iaWFkYSBjb24gZXhpdG8nKVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBCQVNFX1VSTCArICdhcHAvbG9nb3V0J1xyXG4gICAgICB9LDMwMDApICAgICAgXHJcbiAgICB9ZWxzZXtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArICcgRXJyb3IgYWwgY2FtYmlhciBkZSBjb250cmFzZcOxYSwgcmV2aXNlIGxhIGNvbnRyYXNlw7FhIGFjdHVhbCcpXHJcbiAgICB9XHJcbiAgICAgIFxyXG4gIH1cclxufVxyXG5cclxudmFyIENsaWVudHMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgdmFyIGZvcm0sIG5vbWJyZXMsIGFwZWxsaWRvcywgY2VkdWxhLCBjZWx1bGFyLCBwcm92aW5jaWEsIHNlY3RvciwgY2FsbGUsIGNhc2EsIHRlbGVmb25vLFxyXG4gICAgICAgbHVnYXJUcmFiYWpvLCB0ZWxUcmFiYWpvLCBpbmdyZXNvcywgZmVjaGFSZWdpc3RybywgZXN0YWRvO1xyXG5cclxuICAgIG5vbWJyZXMgICAgICAgPSAkKFwiI2NsaWVudC1uYW1lXCIpLnZhbCgpO1xyXG4gICAgYXBlbGxpZG9zICAgICA9ICQoXCIjY2xpZW50LWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgY2VkdWxhICAgICAgICA9IGdldFZhbCgkKFwiI2NsaWVudC1kbmlcIikpO1xyXG4gICAgY2VsdWxhciAgICAgICA9IGdldFZhbCgkKFwiI2NsaWVudC1waG9uZVwiKSk7XHJcbiAgICBwcm92aW5jaWEgICAgID0gJChcIiNjbGllbnQtcHJvdmluY2lhXCIpLnZhbCgpO1xyXG4gICAgc2VjdG9yICAgICAgICA9ICQoXCIjY2xpZW50LXNlY3RvclwiKS52YWwoKTtcclxuICAgIGNhbGxlICAgICAgICAgPSAkKFwiI2NsaWVudC1zdHJlZXRcIikudmFsKCk7XHJcbiAgICBjYXNhICAgICAgICAgID0gJCgnI2NsaWVudC1ob3VzZScpLnZhbCgpO1xyXG4gICAgdGVsZWZvbm8gICAgICA9IGdldFZhbCgkKCcjY2xpZW50LXRlbGVwaG9uZScpKTtcclxuICAgIGx1Z2FyVHJhYmFqbyAgPSAkKCcjY2xpZW50LWpvYicpLnZhbCgpO1xyXG4gICAgdGVsVHJhYmFqbyAgICA9IGdldFZhbCgkKCcjY2xpZW50LWpvYi10ZWxlcGhvbmUnKSk7XHJcbiAgICBpbmdyZXNvcyAgICAgID0gJCgnI2NsaWVudC1zYWxhcnknKS52YWwoKTtcclxuICAgIGZlY2hhUmVnaXN0cm8gPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpOztcclxuICAgIGVzdGFkbyAgICAgICAgPSBcIm5vIGFjdGl2b1wiO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW25vbWJyZXMsIGFwZWxsaWRvcywgY2VkdWxhLCBjZWx1bGFyLCBwcm92aW5jaWEsIHNlY3RvciwgY2FsbGUsIGNhc2EsIHRlbGVmb25vXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbm9tYnJlcz0nICsgbm9tYnJlcyArIFwiJmFwZWxsaWRvcz1cIiArIGFwZWxsaWRvcyArIFwiJmNlZHVsYT1cIiArIGNlZHVsYSArIFwiJmNlbHVsYXI9XCIgKyBjZWx1bGFyO1xyXG4gICAgICBmb3JtICs9IFwiJnByb3ZpbmNpYT1cIiArIHByb3ZpbmNpYSArIFwiJnNlY3Rvcj1cIiArIHNlY3RvciArIFwiJmNhbGxlPVwiICsgY2FsbGUgKyBcIiZjYXNhPVwiICsgY2FzYSArIFwiJnRlbGVmb25vPVwiICsgdGVsZWZvbm87XHJcbiAgICAgIGZvcm0gKz0gXCImbHVnYXJfdHJhYmFqbz1cIiArIGx1Z2FyVHJhYmFqbyArIFwiJnRlbF90cmFiYWpvPVwiICsgdGVsVHJhYmFqbyArIFwiJmluZ3Jlc29zPVwiICsgaW5ncmVzb3MgKyBcIiZmZWNoYV9yZWdpc3Rybz1cIiArIGZlY2hhUmVnaXN0cm87XHJcbiAgICAgIGZvcm0gKz0gXCImZXN0YWRvPVwiICsgZXN0YWRvICsgXCImdGFibGE9Y2xpZW50ZXNcIjtcclxuXHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9hZGRcIiwgdHJ1ZSwgaW5pdENsaWVudEhhbmRsZXJzLCBudWxsLCBmb3JtLCBDbGllbnRzLmdldEFsbCk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jbGllbnRlc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIGluaXRDbGllbnRIYW5kbGVycywgY2xpZW50VGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0T25lOiBmdW5jdGlvbiAoaWQsIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1jbGllbnRlcyZpZD1cIiArIGlkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2dldG9uZVwiLCBmYWxzZSwgaW5pdENsaWVudEhhbmRsZXJzLCByZWNlaXZlciwgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICByZWNlaXZlRm9yRWRpdDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgIHZhciBjbGllbnQgICAgICAgID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgIHRoaXMuaWQgICAgICAgICAgICA9IGNsaWVudFsnaWRfY2xpZW50ZSddO1xyXG4gICAgdmFyICRub21icmVzICAgICAgPSAkKFwiI3UtY2xpZW50LW5hbWVcIik7XHJcbiAgICB2YXIgJGFwZWxsaWRvcyAgICA9ICQoXCIjdS1jbGllbnQtbGFzdG5hbWVcIik7XHJcbiAgICB2YXIgJGNlZHVsYSAgICAgICA9ICQoXCIjdS1jbGllbnQtZG5pXCIpO1xyXG4gICAgdmFyICRjZWx1bGFyICAgICAgPSAkKFwiI3UtY2xpZW50LXBob25lXCIpO1xyXG4gICAgdmFyICRwcm92aW5jaWEgICAgPSAkKFwiI3UtY2xpZW50LXByb3ZpbmNpYVwiKTtcclxuICAgIHZhciAkc2VjdG9yICAgICAgID0gJChcIiN1LWNsaWVudC1zZWN0b3JcIik7XHJcbiAgICB2YXIgJGNhbGxlICAgICAgICA9ICQoXCIjdS1jbGllbnQtc3RyZWV0XCIpO1xyXG4gICAgdmFyICRjYXNhICAgICAgICAgPSAkKCcjdS1jbGllbnQtaG91c2UnKTtcclxuICAgIHZhciAkdGVsZWZvbm8gICAgID0gJCgnI3UtY2xpZW50LXRlbGVwaG9uZScpO1xyXG4gICAgdmFyICRsdWdhclRyYWJham8gPSAkKCcjdS1jbGllbnQtam9iJyk7XHJcbiAgICB2YXIgJHRlbFRyYWJham8gICA9ICQoJyN1LWNsaWVudC1qb2ItdGVsZXBob25lJyk7XHJcbiAgICB2YXIgJGluZ3Jlc29zICAgICA9ICQoJyN1LWNsaWVudC1zYWxhcnknKTtcclxuXHJcbiAgICAkbm9tYnJlcy52YWwoY2xpZW50Wydub21icmVzJ10pO1xyXG4gICAgJGFwZWxsaWRvcy52YWwoY2xpZW50WydhcGVsbGlkb3MnXSlcclxuICAgICRjZWR1bGEudmFsKGNsaWVudFsnY2VkdWxhJ10pXHJcbiAgICAkY2VsdWxhci52YWwoY2xpZW50WydjZWx1bGFyJ10pXHJcbiAgICAkcHJvdmluY2lhLnZhbChjbGllbnRbJ3Byb3ZpbmNpYSddKVxyXG4gICAgJHNlY3Rvci52YWwoY2xpZW50WydzZWN0b3InXSlcclxuICAgICRjYWxsZS52YWwoY2xpZW50WydjYWxsZSddKVxyXG4gICAgJGNhc2EudmFsKGNsaWVudFsnY2FzYSddKVxyXG4gICAgJHRlbGVmb25vLnZhbChjbGllbnRbJ3RlbGVmb25vJ10pXHJcbiAgICAkbHVnYXJUcmFiYWpvLnZhbChjbGllbnRbJ2x1Z2FyX3RyYWJham8nXSlcclxuICAgICR0ZWxUcmFiYWpvLnZhbChjbGllbnRbJ3RlbF90cmFiYWpvJ10pXHJcbiAgICAkaW5ncmVzb3MudmFsKGNsaWVudFsnc2FsYXJpbyddKVxyXG5cclxuICAgICQoXCIjdXBkYXRlLWNsaWVudC1tb2RhbFwiKS5tb2RhbCgpO1xyXG4gICAgJChcIiNidG4tdXBkYXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHVwZGF0ZUNsaWVudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2xpZW50KCkge1xyXG4gICAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFskbm9tYnJlcy52YWwoKSwgJGFwZWxsaWRvcy52YWwoKSwgJGNlZHVsYS52YWwoKSwgJGNlbHVsYXIudmFsKCksICRwcm92aW5jaWEudmFsKCksICRzZWN0b3IudmFsKCksICRjYWxsZS52YWwoKSxcclxuICAgICAgICAkY2FzYS52YWwoKSwgJHRlbGVmb25vLnZhbCgpXHJcbiAgICAgIF0pO1xyXG5cclxuICAgICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICAgIGZvcm0gPSAnaWQ9JyArIGlkICsgJyZub21icmVzPScgKyAkbm9tYnJlcy52YWwoKSArIFwiJmFwZWxsaWRvcz1cIiArICRhcGVsbGlkb3MudmFsKCkgKyBcIiZjZWR1bGE9XCIgKyBnZXRWYWwoJGNlZHVsYSk7XHJcbiAgICAgICAgZm9ybSArPSBcIiZjZWx1bGFyPVwiICsgZ2V0VmFsKCRjZWx1bGFyKSArIFwiJnByb3ZpbmNpYT1cIiArICRwcm92aW5jaWEudmFsKCkgKyBcIiZzZWN0b3I9XCIgKyAkc2VjdG9yLnZhbCgpICsgXCImY2FsbGU9XCIgKyAkY2FsbGUudmFsKCk7XHJcbiAgICAgICAgZm9ybSArPSBcIiZjYXNhPVwiICsgJGNhc2EudmFsKCkgKyBcIiZ0ZWxlZm9ubz1cIiArIGdldFZhbCgkdGVsZWZvbm8pICsgXCImbHVnYXJfdHJhYmFqbz1cIiArICRsdWdhclRyYWJham8udmFsKCkgKyBcIiZ0ZWxfdHJhYmFqbyA9XCI7XHJcbiAgICAgICAgZm9ybSArPSBnZXRWYWwoJHRlbFRyYWJham8pICsgXCImdGFibGE9Y2xpZW50ZXNcIjtcclxuICAgICAgICBmb3JtICs9IFwiJmluZ3Jlc29zPVwiICsgJGluZ3Jlc29zLnZhbCgpO1xyXG5cclxuICAgICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIGluaXRDbGllbnRIYW5kbGVycywgbnVsbCwgZm9ybSwgQ2xpZW50cy5nZXRBbGwpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2F2ZU9ic2VydmF0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG9ic2VydmF0aW9ucyxpZENsaWVudGU7XHJcbiBcclxuICAgIG9ic2VydmF0aW9ucyA9ICQoXCIjdGV4dC1vYnNlcnZhdGlvbnNcIikudmFsKCk7XHJcbiAgICBpZENsaWVudGUgICAgPSAkKFwiI2RldGFpbC1jbGllbnQtaWRcIikudmFsKCk7XHJcbiBcclxuICAgIGZvcm0gPSAnb2JzZXJ2YWNpb25lcz0nICsgb2JzZXJ2YXRpb25zICsgXCImdGFibGE9b2JzZXJ2YWNpb25lcyZpZF9jbGllbnRlPVwiICsgaWRDbGllbnRlO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcbiAgXHJcbiAgdXBkYXRlU3RhdGU6IGZ1bmN0aW9uIChjbGllbnQpIHtcclxuICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShjbGllbnQpKyAnJm1vZHVsZT1jbGllbnRlcyZhY3Rpb249dXBkYXRlJztcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0anNvbicsdHJ1ZSxudWxsLG51bGwsZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgR2VuZXJhbHMgPSB7XHJcbiAgZGVsZXRlUm93OiBmdW5jdGlvbiAoaWQsIHRhYmxhKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9XCIgKyB0YWJsYSArIFwiJmlkPVwiICsgaWQ7XHJcbiAgICB2YXIgaGFuZGxlcnMsIGNhbGxiYWNrO1xyXG4gICAgc3dpdGNoICh0YWJsYSkge1xyXG4gICAgICBjYXNlICdjbGllbnRlcyc6XHJcbiAgICAgICAgY2FsbGJhY2sgPSBDbGllbnRzLmdldEFsbDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc2VydmljaW9zJzpcclxuICAgICAgICBjYWxsYmFjayA9IFNlcnZpY2VzLmdldEFsbDtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2RlbGV0ZScsIHRydWUsbnVsbCwgbnVsbCwgZm9ybSwgY2FsbGJhY2spO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIG1hbmRhIHVuIG1lbnNhamUgYWwgc2Vydmlkb3IgZGUgbG9zIHZhbG9yZXMgYSBidXNjYXJcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBlbCB2YWxvciBhIHNlciBidXNjYWRvXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRiVGFibGUgbm9tYnJlIGRlIGxhIHRhYmxhIGRvbmRlIHNlIGRlc2VhIGNvbnN1bHRhciBlbiBsYSBiYXNlIGRlIGRhdG9zXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZmlsbFRhYmxlRnVuY3Rpb24gZnVuY2lvbiBkZSBsbGVuYWRvIGRlIHRhYmxhIGRvbmRlIHNlIG1vc3RyYXJhbiBsb3MgcmVzdWx0YWRvcyBcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGVyRnVuY3Rpb24gZnVuY2lvbiByZWluaWNpbyBkZSBsb3MgZWxlbWVudG9zIGVuIGxvcyBoYW5kbGVycyBcclxuICAgKi9cclxuICBcclxuICBzZWFyY2g6IGZ1bmN0aW9uICh0ZXh0LCBkYlRhYmxlLCBmaWxsVGFibGVGdW5jdGlvbiwgaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgICBpZiAoaGFuZGxlckZ1bmN0aW9uID09IHVuZGVmaW5lZCkgaGFuZGxlckZ1bmN0aW9uID0gaW5pdENsaWVudEhhbmRsZXJzO1xyXG4gICAgaWYgKGZpbGxUYWJsZUZ1bmN0aW9uID09IHVuZGVmaW5lZCkgZmlsbFRhYmxlRnVuY3Rpb24gPSBmaWxsQ3VycmVudFRhYmxlO1xyXG4gICAgdmFyIHdvcmQgPSB0ZXh0O1xyXG4gICAgaWYgKHdvcmQgIT0gbnVsbCB8fCB3b3JkICE9IFwiXCIpIHtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPVwiICsgZGJUYWJsZSArIFwiJndvcmQ9XCIgKyB3b3JkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9zZWFyY2gnLCBmYWxzZSwgaGFuZGxlckZ1bmN0aW9uLCBmaWxsVGFibGVGdW5jdGlvbiwgZm9ybSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY291bnRfdGFibGU6IGZ1bmN0aW9uICh0YWJsZSkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPVwiICsgdGFibGU7XHJcbiAgICB2YXIgdXBkYXRlRnVuY3Rpb24gPSB1cGRhdGVDb3VudDtcclxuICAgIGlmICh0YWJsZSA9PSAnY2FqYScpIHVwZGF0ZUZ1bmN0aW9uID0gdXBkYXRlQ2FqYUNvdW50XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9jb3VudCcsIGZhbHNlLCBudWxsLCB1cGRhdGVGdW5jdGlvbiwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgU2VydmljZXMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgbmFtZSwgZGVzY3JpcHRpb24sIHBheW1lbnQsIHR5cGU7XHJcblxyXG4gICAgbmFtZSAgICAgICAgPSAkKFwiI3NlcnZpY2UtbmFtZVwiKS52YWwoKTtcclxuICAgIGRlc2NyaXB0aW9uID0gJChcIiNzZXJ2aWNlLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG4gICAgcGF5bWVudCAgICAgPSAkKFwiI3NlcnZpY2UtbW9udGhseS1wYXltZW50XCIpLnZhbCgpO1xyXG4gICAgdHlwZSAgICAgICAgPSAkKFwiI3NlcnZpY2UtdHlwZVwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtuYW1lLCBkZXNjcmlwdGlvbiwgcGF5bWVudCwgdHlwZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ25vbWJyZT0nICsgbmFtZSArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb24gKyBcIiZtZW5zdWFsaWRhZD1cIiArIHBheW1lbnQgKyBcIiZ0aXBvPVwiICsgdHlwZTtcclxuICAgICAgZm9ybSArPSBcIiZ0YWJsYT1zZXJ2aWNpb3NcIjtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2FkZFwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBTZXJ2aWNlcy5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1zZXJ2aWNpb3NcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBzZXJ2aWNlVGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBwYXltZW50LCB0eXBlO1xyXG5cclxuICAgIGlkICAgICAgICAgID0gJCgnI3Utc2VydmljZS1pZCcpLnZhbCgpO1xyXG4gICAgbmFtZSAgICAgICAgPSAkKCcjdS1zZXJ2aWNlLW5hbWUnKS52YWwoKTtcclxuICAgIGRlc2NyaXB0aW9uID0gJCgnI3Utc2VydmljZS1kZXNjcmlwdGlvbicpLnZhbCgpO1xyXG4gICAgcGF5bWVudCAgICAgPSAkKCcjdS1zZXJ2aWNlLW1vbnRobHktcGF5bWVudCcpLnZhbCgpO1xyXG4gICAgdHlwZSAgICAgICAgPSAkKCcjdS1zZXJ2aWNlLXR5cGUnKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtpZCwgbmFtZSwgZGVzY3JpcHRpb24sIHBheW1lbnQsIHR5cGVdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9zZXJ2aWNpbz0nICsgaWQgKyBcIiZub21icmU9XCIgKyBuYW1lICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbiArIFwiJm1lbnN1YWxpZGFkPVwiICsgcGF5bWVudDtcclxuICAgICAgZm9ybSArPSBcIiZ0aXBvPVwiICsgdHlwZSArIFwiJnRhYmxhPXNlcnZpY2lvc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFNlcnZpY2VzLmdldEFsbCxoZWF2eUxvYWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbnZhciBDb250cmFjdHMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiBhZGROZXdDb250cmFjdCgpIHtcclxuICAgIHZhciBmb3JtLCB0YWJsZSwgY2xpZW50X2lkLCB1c2VyX2lkLCBzZXJ2aWNlX2lkLCBjb2RlLCBjb250cmFjdF9kYXRlLCBwYXltZW50LCBkdXJhdGlvbixcclxuICAgICAgZXF1aXBtZW50LCBlTWFjLCByb3V0ZXIsIHJNYWMsIHRvdGFsLCBuZXh0UGF5bWVudCwgbW9kZWwsIGlwO1xyXG5cclxuICAgIGNsaWVudF9pZCAgICAgPSAkKFwiI2NvbnRyYWN0LWNsaWVudC1pZFwiKS52YWwoKTtcclxuICAgIHVzZXJfaWQgICAgICAgPSAkKFwiI2NvbnRyYWN0LXVzZXItaWRcIikudmFsKCk7XHJcbiAgICBzZXJ2aWNlX2lkICAgID0gJChcIi5zZXJ2aWNlLWNhcmQuc2VsZWN0ZWRcIikuYXR0cignZGF0YS1pZCcpO1xyXG4gICAgY29udHJhY3RfZGF0ZSA9ICQoJyNjb250cmFjdC1jbGllbnQtZGF0ZScpLnZhbCgpO1xyXG4gICAgZHVyYXRpb24gICAgICA9ICQoJyNjb250cmFjdC1jbGllbnQtbW9udGhzJykudmFsKCk7XHJcbiAgICBlcXVpcG1lbnQgICAgID0gJCgnI2NvbnRyYWN0LWVxdWlwbWVudCcpLnZhbCgpO1xyXG4gICAgZU1hYyAgICAgICAgICA9ICQoJyNjb250cmFjdC1lLW1hYycpLnZhbCgpO1xyXG4gICAgcm91dGVyICAgICAgICA9ICQoJyNjb250cmFjdC1yb3V0ZXInKS52YWwoKTtcclxuICAgIHJNYWMgICAgICAgICAgPSAkKCcjY29udHJhY3Qtci1tYWMnKS52YWwoKTtcclxuICAgIG1vZGVsICAgICAgICAgPSAkKCcjY29udHJhY3QtZXF1aXBtZW50LW1vZGVsJykudmFsKCk7XHJcbiAgICBpcCAgICAgICAgICAgID0gJCgnI2NvbnRyYWN0LWlwJykudmFsKCk7XHJcbiAgICBjb2RlICAgICAgICAgID0gJChcIiNzZWxlY3QtY29udHJhY3QtY29kZVwiKS52YWwoKTtcclxuXHJcbiAgICBwYXltZW50ID0gJChcIiNjb250cmFjdC1jbGllbnQtcGF5bWVudFwiKS52YWwoKTtcclxuICAgIG5leHRQYXltZW50ID0gbW9tZW50KGNvbnRyYWN0X2RhdGUpLmFkZCgxLCAnbW9udGhzJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY2xpZW50X2lkLCB1c2VyX2lkLCBzZXJ2aWNlX2lkLCBjb250cmFjdF9kYXRlLCBkdXJhdGlvbl0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICB0b3RhbCA9IChOdW1iZXIoZHVyYXRpb24pICsgMSkgKiBOdW1iZXIocGF5bWVudCk7XHJcbiAgICAgIGZvcm0gPSAnaWRfZW1wbGVhZG89JyArIHVzZXJfaWQgKyBcIiZpZF9jbGllbnRlPVwiICsgY2xpZW50X2lkICsgXCImaWRfc2VydmljaW89XCIgKyBzZXJ2aWNlX2lkICsgXCImY29kaWdvPVwiICsgY29kZSArIFwiJmZlY2hhPVwiICsgY29udHJhY3RfZGF0ZTtcclxuICAgICAgZm9ybSArPSBcIiZkdXJhY2lvbj1cIiArIGR1cmF0aW9uICsgXCImbW9udG9fdG90YWw9XCIgKyB0b3RhbCArIFwiJm1vbnRvX3BhZ2Fkbz0wJnVsdGltb19wYWdvPW51bGxcIjtcclxuICAgICAgZm9ybSArPSBcIiZtZW5zdWFsaWRhZD1cIiArIHBheW1lbnQgKyBcIiZwcm94aW1vX3BhZ289XCIgKyBuZXh0UGF5bWVudCArIFwiJmVzdGFkbz1hY3Rpdm8mdGFibGE9Y29udHJhdG9zXCI7XHJcbiAgICAgIGZvcm0gKz0gXCImbm9tYnJlX2VxdWlwbz1cIiArIGVxdWlwbWVudCArIFwiJm1hY19lcXVpcG89XCIgKyBlTWFjICsgXCImcm91dGVyPVwiICsgcm91dGVyICsgXCImbWFjX3JvdXRlcj1cIiArIHJNYWM7XHJcbiAgICAgIGZvcm0gKz0gXCImbW9kZWxvPVwiICsgbW9kZWwgKyBcIiZpcD1cIiArIGlwO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvYWRkXCIsIG51bGwsIG51bGwsIENvbnRyYWN0cy5nZXRMYXN0LCBmb3JtLCBudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZXh0ZW5kOiBmdW5jdGlvbihpZENvbnRyYXRvKSB7XHJcbiAgICB2YXIgZm9ybTtcclxuICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGlkQ29udHJhdG9yO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2V4dGVuZFwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNvbnRyYXRvc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIGNvbnRyYWN0VGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0TGFzdDogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAkKFwiI2J0bi1zYXZlLWNvbnRyYWN0XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgICQoXCIjYnRuLXByaW50LWNvbnRyYWN0XCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgIGlmKGRhdGEudGFibGFfcGFnb3Mpe1xyXG4gICAgICBtYWtlUGF5bWVudExpc3QoZGF0YS50YWJsYV9wYWdvcyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY2FsbEV4dHJhOiBmdW5jdGlvbihjb250ZXh0KSB7XHJcbiAgICB2YXIgcm93XHJcbiAgICBpZiAoY29udGV4dCA9PSBcImRldGFpbHNcIil7XHJcbiAgICAgIHJvdyA9IGRldGFpbHNDb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcm93ID0gY29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAocm93KSB7XHJcbiAgICAgICQoXCIjZXh0cmEtY2xpZW50LWRuaVwiKS52YWwocm93LmNlZHVsYSk7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRBbGxPZkNsaWVudChyb3cuY2VkdWxhKTtcclxuICAgICAgJCgnI2FkZC1leHRyYS1tb2RhbCcpLm1vZGFsKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiU2VsZWNjaW9uZSBlbCBjb25yYXRvIHByaW1lcm9cIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjYW5jZWw6IGZ1bmN0aW9uKHJvdyxjYWxsYmFjaykge1xyXG4gICAgdmFyIGlzX3BlbmFsdHkgPSBmYWxzZTtcclxuICAgIHZhciByZWFzb24gICAgID0gJChcIiNjYW5jZWxhdGlvbi1yZWFzb25cIikudmFsKCk7XHJcbiAgICB2YXIgY2hlY2tlZCAgICA9ICQoXCIjY2hlY2stcGVuYWx0eTpjaGVja2VkXCIpLmxlbmd0aDtcclxuICAgIHZhciBmb3JtLCBmZWNoYTtcclxuICAgIGNvbnNvbGUubG9nKHJvdylcclxuICAgIGlmKHJvdy5pZCl7XHJcbiAgICAgIGlmIChjaGVja2VkID4gMCkge1xyXG4gICAgICAgIGlzX3BlbmFsdHkgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGZlY2hhID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgcm93LmlkICsgJyZmZWNoYT0nICsgZmVjaGEgKyAnJmlkX2NsaWVudGU9JyArIHJvdy5pZF9jbGllbnRlO1xyXG4gICAgICBmb3JtICs9IFwiJm1vdGl2bz1cIiArIHJlYXNvbiArIFwiJnBlbmFsaWRhZD1cIiArIGlzX3BlbmFsdHk7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2NhbmNlbCcsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIGNhbGxiYWNrKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0VSUk9SICtcIiBObyBoYXkgY29udHJhdG8gc2VsZWNjaW9uYWRvXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldE9uZTogZnVuY3Rpb24oaWRfY29udHJhdG8sIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1jb250cmF0b3MmaWRfY29udHJhdG89XCIgKyBpZF9jb250cmF0bztcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRvbmVcIiwgZmFsc2UsIG51bGwsIHJlY2VpdmVyLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHJlY2lldmU6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgIHZhciBjb250cmFjdCAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB0aGlzLmlkX2NvbnRyYXRvID0gY29udHJhY3RbJ2lkX2NvbnRyYXRvJ107XHJcbiAgICB2YXIgJGVxdWlwbyAgICAgPSAkKFwiI3UtY29udHJhY3QtZXF1aXBtZW50XCIpO1xyXG4gICAgdmFyICRtYWNFcXVpcG8gID0gJChcIiN1LWNvbnRyYWN0LWUtbWFjXCIpO1xyXG4gICAgdmFyICRyb3V0ZXIgICAgID0gJChcIiN1LWNvbnRyYWN0LXJvdXRlclwiKTtcclxuICAgIHZhciAkbWFjUm91dGVyICA9ICQoXCIjdS1jb250cmFjdC1yLW1hY1wiKTtcclxuICAgIHZhciAkbW9kZWxvICAgICA9ICQoXCIjdS1jb250cmFjdC1tb2RlbG9cIik7XHJcbiAgICB2YXIgJGNvZGlnbyAgICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpO1xyXG4gICAgdmFyICRpc0NoYW5nZUlwID0gJChcIiNjaGVjay1jaGFuZ2UtaXBcIik7XHJcbiAgICB2YXIgJGlwICAgICAgICAgPSAkKFwiI3UtY29udHJhY3QtaXBcIik7XHJcblxyXG4gICAgJGVxdWlwby52YWwoY29udHJhY3RbJ25vbWJyZV9lcXVpcG8nXSk7XHJcbiAgICAkbWFjRXF1aXBvLnZhbChjb250cmFjdFsnbWFjX2VxdWlwbyddKTtcclxuICAgICRyb3V0ZXIudmFsKGNvbnRyYWN0Wydyb3V0ZXInXSk7XHJcbiAgICAkbWFjUm91dGVyLnZhbChjb250cmFjdFsnbWFjX3JvdXRlciddKTtcclxuICAgICRtb2RlbG8udmFsKGNvbnRyYWN0Wydtb2RlbG8nXSk7XHJcbiAgICAkaXAudmFsKGNvbnRyYWN0WydpcCddKTtcclxuXHJcbiAgICAvLyAkKFwiI3VwZGF0ZS1jb250cmFjdC1tb2RhbCBzZWxlY3RcIikudmFsKCcnKVxyXG4gICAgJChcIiN1cGRhdGUtY29udHJhY3QtbW9kYWxcIikubW9kYWwoKTtcclxuICAgICQoXCIjdXBkYXRlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHVwZGF0ZUNvbnRyYWN0KGlkX2NvbnRyYXRvKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRyYWN0KGlkX2NvbnRyYXRvKSB7XHJcbiAgICAgIHZhciBjaGVja2VkID0gJChcIiNjaGVjay1jaGFuZ2UtaXA6Y2hlY2tlZFwiKS5sZW5ndGg7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGlkX2NvbnRyYXRvICsgJyZub21icmVfZXF1aXBvPScgKyAkZXF1aXBvLnZhbCgpICsgXCImbWFjX2VxdWlwbz1cIiArICRtYWNFcXVpcG8udmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImcm91dGVyPVwiICsgJHJvdXRlci52YWwoKSArIFwiJm1hY19yb3V0ZXI9XCIgKyAkbWFjUm91dGVyLnZhbCgpO1xyXG4gICAgICBmb3JtICs9IFwiJm1vZGVsbz1cIiArICRtb2RlbG8udmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImdGFibGE9Y29udHJhdG9zXCI7XHJcbiAgICAgIGlmIChjaGVja2VkID4gMCkge1xyXG4gICAgICAgIGZvcm0gKz0gXCImaXA9XCIgKyAkaXAudmFsKCkgKyBcIiZjb2RpZ289XCIgKyAkY29kaWdvLnZhbCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0SXBMaXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VjdGlvbl9pZCA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0LXNlY3RvclwiKS52YWwoKTtcclxuICAgIHZhciBmb3JtID0gXCJpZF9zZWNjaW9uPVwiICsgc2VjdGlvbl9pZCArIFwiJnRhYmxhPWlwX2xpc3RcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRhbGxcIiwgZmFsc2UsIG51bGwsIG1ha2VJcExpc3QsIGZvcm0sIG51bGwpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VJcExpc3QoY29udGVudCkge1xyXG4gICAgICAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpLmh0bWwoY29udGVudCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYnRuRXh0cmFQcmVzc2VkOiBmdW5jdGlvbiAoJHRoaXMpIHtcclxuICAgIHZhciBidXR0b25JZCA9ICR0aGlzLnRleHQoKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBzd2l0Y2ggKGJ1dHRvbklkKSB7XHJcbiAgICAgIGNhc2UgXCJtZWpvcmFyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLnVwZ3JhZGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImV4dGVuZGVyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLmV4dGVuZCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZ3VhcmRhclwiOlxyXG4gICAgICAgIENvbnRyYWN0cy5hZGRFeHRyYSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZ3JhZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBzZWxlY3RlZFNlcnZpY2UsIHNlcnZpY2VJZCwgYW1vdW50O1xyXG5cclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIHNlbGVjdGVkU2VydmljZSA9ICQoXCIuc2VydmljZS1jYXJkLnNlbGVjdGVkXCIpO1xyXG4gICAgc2VydmljZUlkID0gc2VsZWN0ZWRTZXJ2aWNlLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgYW1vdW50ID0gc2VsZWN0ZWRTZXJ2aWNlLmF0dHIoXCJkYXRhLXBheW1lbnRcIik7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCwgc2VydmljZUlkLCBhbW91bnRdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgY29udHJhY3RJZCArIFwiJmlkX3NlcnZpY2lvPVwiICsgc2VydmljZUlkICsgXCImY3VvdGE9XCIgKyBhbW91bnQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZ3JhZGUnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZWNvbm5lY3Q6IGZ1bmN0aW9uIChjb250cmFjdElkLGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgZm9ybSwgc2VsZWN0ZWRTZXJ2aWNlLCBzZXJ2aWNlSWQsIGR1cmF0aW9uLCBkYXRlLHNlbmQsIGlzX2VtcHR5LGluZm87XHJcblxyXG4gICAgc2VsZWN0ZWRTZXJ2aWNlID0gJChcIi5zZXJ2aWNlLWNhcmQuc2VsZWN0ZWRcIik7XHJcbiAgICBzZXJ2aWNlSWQgPSBzZWxlY3RlZFNlcnZpY2UuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICBkdXJhdGlvbiAgPSAkKFwiI3JlY29ubmVjdGlvbi1tb250aHNcIikudmFsKCk7XHJcbiAgICBkYXRlID0gJChcIiNyZWNvbm5lY3Rpb24tZGF0ZVwiKS52YWwoKVxyXG4gICAgaXNfZW1wdHkgPSBpc0VtcHR5KFtjb250cmFjdElkLHNlcnZpY2VJZCxkYXRlLGR1cmF0aW9uXSk7XHJcbiAgICBpZighaXNfZW1wdHkpe1xyXG4gICAgICBpbmZvID0ge1xyXG4gICAgICAgICdpZF9jb250cmF0byc6IGNvbnRyYWN0SWQsXHJcbiAgICAgICAgJ2ZlY2hhJzogZGF0ZSxcclxuICAgICAgICAnaWRfc2VydmljaW8nOiBzZXJ2aWNlSWQsXHJcbiAgICAgICAgJ2R1cmFjaW9uJzogZHVyYXRpb25cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9ybSA9IFwiZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KGluZm8pO1xyXG4gICAgICBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArIFwiY29udHJhY3QvcmVjb25uZWN0XCIsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIGRpc3BsYXlNZXNzYWdlKHJlcy5kYXRhLm1lbnNhamUpO1xyXG4gICAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgICAgICQoXCIjYnRuLXJlY29ubmVjdFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgJChcIi5yZWNvbm5lY3QtY2FsbGVyXCIpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgaWYoY2FsbGJhY2spXHJcbiAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIHN3YWwoXCJMbGVuZSB0b2RvcyBsb3MgY2FtcG9zXCIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYWRkRXh0cmE6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBleHRyYVNlcnZpY2UsIHNlcnZpY2VDb3N0LCBlcXVpcG1lbnQsIGVNYWMsIHJvdXRlciwgck1hYyxwYXltZW50TW9kZTtcclxuXHJcbiAgICBjb250cmFjdElkID0gJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICBzZXJ2aWNlQ29zdCA9ICQoXCIjZXh0cmEtc2VydmljZS1jb3N0XCIpLnZhbCgpO1xyXG4gICAgZXh0cmFTZXJ2aWNlID0gJChcIiNzZWxlY3QtZXh0cmEtc2VydmljZVwiKS52YWwoKTtcclxuICAgIGVxdWlwbWVudCA9ICQoXCIjZXh0cmEtZXF1aXBvXCIpLnZhbCgpO1xyXG4gICAgZU1hYyA9ICQoXCIjZXh0cmEtZS1tYWNcIikudmFsKCk7XHJcbiAgICByb3V0ZXIgPSAkKFwiI2V4dHJhLXJvdXRlclwiKS52YWwoKTtcclxuICAgIHJNYWMgPSAkKFwiI2V4dHJhLXItbWFjXCIpLnZhbCgpO1xyXG4gICAgcGF5bWVudE1vZGUgPSAkKFwiI3NlbGVjdC1wYXltZW50LW1vZGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCwgZXh0cmFTZXJ2aWNlLCBzZXJ2aWNlQ29zdCxwYXltZW50TW9kZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyBjb250cmFjdElkICsgXCImY29zdG9fc2VydmljaW89XCIgKyBzZXJ2aWNlQ29zdCArIFwiJm5vbWJyZV9zZXJ2aWNpbz1cIiArIGV4dHJhU2VydmljZTtcclxuICAgICAgZm9ybSArPSAnJm5vbWJyZV9lcXVpcG89JyArIGVxdWlwbWVudCArIFwiJm1hY19lcXVpcG89XCIgKyBlTWFjICsgXCImcm91dGVyPVwiICsgcm91dGVyICsgXCImbWFjX3JvdXRlcj1cIiArIHJNYWM7XHJcbiAgICAgIGZvcm0gKz0gJyZtb2RvX3BhZ289JyArIHBheW1lbnRNb2RlO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9hZGRleHRyYScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBleHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBkdXJhdGlvbjtcclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIGR1cmF0aW9uID0gJChcIiNleHRyYS1leHRlbnNpb24tbW9udGhzXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2R1cmF0aW9uLCBjb250cmFjdElkXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGNvbnRyYWN0SWQgKyBcIiZkdXJhY2lvbj1cIiArIGR1cmF0aW9uO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9leHRlbmRfY29udHJhY3QnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGxPZkNsaWVudDogZnVuY3Rpb24oZG5pKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwiZG5pPVwiICsgZG5pO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2RhdGFfZm9yX2V4dHJhXCIsIGZhbHNlLCBudWxsLCBtYWtlQ29udHJhY3RMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICAvLyBOb3RlOiBsbyBzaWVudG8sIGRlIGFxdWkgZW4gYWRlbGFudGUgdXNvIGF4aW9zLCBlcyBtdWNobyBtYXMgY29tb2RvXHJcblxyXG4gIHN1c3BlbmQ6IGZ1bmN0aW9uIChjb250cmFjdElkLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeSh7aWRfY29udHJhdG86IGNvbnRyYWN0SWR9KVxyXG4gICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2NvbnRyYWN0L3N1c3BlbmQnLGZvcm0pO1xyXG4gICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgIHZhciBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgQ29udHJhY3RzLmdldEFsbCgpO1xyXG4gICAgICBpZihjYWxsYmFjaylcclxuICAgICAgICBjYWxsYmFjaygpXHJcbiAgICB9KVxyXG4gICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG52YXIgUGF5bWVudHMgPSB7XHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaWQgPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIGlmIChpZCAhPSBudWxsKSB7XHJcbiAgICAgIHZhciBmb3JtID0gXCJ0YWJsYT1wYWdvcyZpZD1cIiArIGlkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgcGF5bWVudFRhYmxlLnJlZnJlc2gsIGZvcm0sIFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgdmFyIGRhdGUgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICB2YXIgaWRfY29udHJhdG8gPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPXBhZ29zJmlkPVwiICsgaWQgKyBcIiZlc3RhZG89cGFnYWRvJmZlY2hhX3BhZ289XCIgKyBkYXRlICsgXCImaWRfY29udHJhdG89XCIgKyBpZF9jb250cmF0bztcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBzYXZlQWJvbm9zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgb2JzZXJ2YXRpb25zLCBhYm9ubyRpbnB1dEFib25vLCR0ZXh0QWJvbm8sY29udHJhY3RJZDtcclxuXHJcbiAgICAkdGV4dEFib25vICAgPSAkKCcjdGV4dC1hYm9uby1kZXRhaWwnKTtcclxuICAgIG9ic2VydmF0aW9ucyA9ICR0ZXh0QWJvbm8udmFsKCk7XHJcbiAgICBjb250cmFjdElkICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgICRpbnB1dEFib25vICA9ICQoXCIjaW5wdXQtYWJvbm9cIik7XHJcbiAgICBhYm9ubyAgICAgICAgPSAkaW5wdXRBYm9uby52YWwoKTtcclxuXHJcbiAgICBmb3JtID0gJ29ic2VydmFjaW9uZXM9JyArIG9ic2VydmF0aW9ucyArIFwiJmFib25vcz1cIiArIGFib25vO1xyXG4gICAgZm9ybSArPSBcIiZjb250cmF0b19hYm9ubz1cIitjb250cmFjdElkK1wiJnRhYmxhPWFib25vc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpXHJcbiAgICAkaW5wdXRBYm9uby52YWwoJycpXHJcbiAgfSxcclxuXHJcbiAgc2F2ZUV4dHJhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAncHJvY2Vzcy8nKVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVVudGlsOiBmdW5jdGlvbihjb250cmFjdElkLGxhc3RQYXltZW50SWQpe1xyXG4gICAgdmFyIGlkX2NvbnRyYXRvID0gJChcIiNzZWxlY3QtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9cGFnb3NfYWxfZGlhJmlkX3VsdGltb19wYWdvPVwiICsgbGFzdFBheW1lbnRJZCArIFwiJmVzdGFkbz1wYWdhZG8maWRfY29udHJhdG89XCIgKyBjb250cmFjdElkO1xyXG4gICAgdmFyIGhhbmRsZXJzLCBjYWxsYmFjaztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwsIGhlYXZ5TG9hZCk7XHJcbiAgfSxcclxuICAgIFxyXG4gIHJlbW92ZVBheW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWRlc2hhY2VyX3BhZ28maWRfcGFnbz1cIiArIGlkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBjb250cmFjdFJlZnJlc2g6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaWRfY2xpZW50ZSA9ICQoJyNkZXRhaWwtY2xpZW50LWlkJykudmFsKClcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jb250cmF0b3NfY2xpZW50ZSZpZD1cIiArIGlkX2NsaWVudGU7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgZGV0YWlsc0NvbnRyYWN0VGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0T25lOiBmdW5jdGlvbihpZF9wYWdvLCByZWNlaXZlcikge1xyXG4gICAgZm9ybSA9IFwidGFibGE9cGFnb3MmaWRfcGFnbz1cIiArIGlkX3BhZ287XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvZ2V0b25lXCIsIGZhbHNlLCBudWxsLCByZWNlaXZlciwgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICByZWNlaXZlRm9yRWRpdDogZnVuY3Rpb24oY29udGVudCl7XHJcbiAgICB2YXIgZGF0YSAgICAgICAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB2YXIgcGFnbyAgICAgICAgICA9IGRhdGEucGFnb1xyXG4gICAgdmFyIHNldHRpbmdzICAgICAgPSBkYXRhLnNldHRpbmdzO1xyXG4gICAgdGhpcy5pZF9jb250cmF0byAgPSBwYWdvWydpZF9jb250cmF0byddO1xyXG4gICAgdGhpcy5pZF9wYWdvICAgICAgPSBwYWdvWydpZF9wYWdvJ11cclxuICAgIHZhciAkY29uY2VwdG8gICAgID0gJChcIiNwYXltZW50LWNvbmNlcHRcIik7XHJcbiAgICB2YXIgJGZlY2hhTGltaXRlICA9ICQoXCIjcGF5bWVudC1saW1pdC1kYXRlXCIpO1xyXG4gICAgdmFyICRzZXJ2aWNpb3NFeHRyYSA9ICQoXCIjcGF5bWVudC1leHRyYS1zZXJ2aWNlc1wiKTtcclxuICAgIHZhciAkY3VvdGEgICAgICAgID0gJChcIiNwYXltZW50LWN1b3RhXCIpO1xyXG4gICAgdmFyICRtb3JhICAgICAgICAgPSAkKFwiI3BheW1lbnQtbW9yYVwiKTtcclxuICAgIHZhciAkZXh0cmEgICAgICAgID0gJChcIiNwYXltZW50LWV4dHJhXCIpO1xyXG4gICAgdmFyICR0b3RhbCAgICAgICAgPSAkKFwiI3BheW1lbnQtdG90YWxcIik7XHJcbiAgICB2YXIgJGRlc2N1ZW50byAgICA9ICQoXCIjcGF5bWVudC1kaXNjb3VudC1hbW91bnRcIik7XHJcbiAgICB2YXIgJHJhem9uICAgICAgICA9ICQoXCIjcGF5bWVudC1kaXNjb3VudC1yZWFzb25cIik7XHJcbiAgICB2YXIgJG1vZGFsICAgICAgICA9ICQoXCIjYWR2YW5jZWQtcGF5bWVudFwiKTtcclxuICAgIHZhciAkY01vcmEgICAgICAgID0gJChcIiNjX21vcmFcIik7XHJcbiAgICB2YXIgJGNSZWNvbmV4aW9uICA9ICQoXCIjY19yZWNvbmV4aW9uXCIpO1xyXG5cclxuICAgICRjb25jZXB0by52YWwocGFnb1snY29uY2VwdG8nXSk7XHJcbiAgICAkZmVjaGFMaW1pdGUudmFsKHBhZ29bJ2ZlY2hhX2xpbWl0ZSddKTtcclxuICAgICRjdW90YS52YWwocGFnb1snY3VvdGEnXSk7XHJcbiAgICAkbW9yYS52YWwocGFnb1snbW9yYSddKTtcclxuICAgICRleHRyYS52YWwocGFnb1snbW9udG9fZXh0cmEnXSk7XHJcbiAgICAkdG90YWwudmFsKHBhZ29bJ3RvdGFsJ10pO1xyXG4gICAgJHNlcnZpY2lvc0V4dHJhLnZhbChwYWdvWydkZXRhbGxlc19leHRyYSddKTtcclxuICAgIGludGVyYWN0aXZlU3VtKCk7XHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCk7XHJcblxyXG4gICAgJG1vZGFsLm9uKCdoaWRlLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG4gICAgICAkbW9kYWwuZmluZCgnaW5wdXQnKS52YWwoJycpXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocGFnb1snbW9yYSddID4gMCkge1xyXG4gICAgICAkY01vcmEucGFyZW50KCkuYWRkQ2xhc3MoJ2NoZWtlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGNNb3JhLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhZ29bJ2RldGFsbGVzX2V4dHJhJ10uaW5jbHVkZXMoJ3JlY29uZXhpb24nKSkge1xyXG4gICAgICAkY1JlY29uZXhpb24ucGFyZW50KCkuYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICRjUmVjb25leGlvbi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLWFwcGx5LWRpc2NvdW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGlmICgkZGVzY3VlbnRvLnZhbCgpID4gMCkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiU2VndXJvIGRlIHF1ZSBxdWllcmUgYXBsaWNhciBlc3RlIGRlc2N1ZW50byBkZSBcIiArICRkZXNjdWVudG8udmFsKCkgKyBcIj9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGFwcGx5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXBwbHkoKTtcclxuICAgICAgfSBcclxuICAgIH0pO1xyXG5cclxuICAgICRjTW9yYS5vbignaWZDaGVja2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgbW9yYSA9IHBhZ29bJ2N1b3RhJ10gKiBzZXR0aW5nc1snY2FyZ29fbW9yYSddIC8gMTAwO1xyXG4gICAgICAkbW9yYS52YWwobW9yYSkudHJpZ2dlcigna2V5dXAnKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkY1JlY29uZXhpb24ub24oJ2lmQ2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJGV4dHJhLnZhbChzZXR0aW5nc1sncmVjb25leGlvbiddKS50cmlnZ2VyKCdrZXl1cCcpO1xyXG4gICAgICAkc2VydmljaW9zRXh0cmEudmFsKCdSZWNvbmV4aW9uJyk7XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICAkY01vcmEub24oJ2lmVW5jaGVja2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkbW9yYS52YWwoMCkudHJpZ2dlcigna2V5dXAnKTtcclxuICAgIH0pXHJcbiAgICBcclxuICAgICRjUmVjb25leGlvbi5vbignaWZVbmNoZWNrZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICRleHRyYS52YWwoMCkudHJpZ2dlcigna2V5dXAnKTtcclxuICAgICAgJHNlcnZpY2lvc0V4dHJhLnZhbCgnJyk7XHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBhcHBseSAoKSB7XHJcbiAgICAgIGFwcGx5RGlzY291bnQoaWRfcGFnbyk7XHJcbiAgICAgICRtb2RhbC5oaWRlKCk7XHJcbiAgICAgICRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICAgICAgJCgnLm1vZGFsLWJhY2tkcm9wJykucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwbHlEaXNjb3VudChpZF9wYWdvKSB7XHJcbiAgICAgIHZhciBkYXRlID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgZm9ybSA9ICdpZF9wYWdvPScgKyBpZF9wYWdvICsgJyZpZF9jb250cmF0bz0nICsgaWRfY29udHJhdG8gKyBcIiZjdW90YT1cIiArICRjdW90YS52YWwoKTtcclxuICAgICAgZm9ybSArPSBcIiZtb3JhPVwiICsgJG1vcmEudmFsKCkgKyBcIiZtb250b19leHRyYT1cIiArICRleHRyYS52YWwoKTtcclxuICAgICAgZm9ybSArPSBcIiZ0b3RhbD1cIiArICR0b3RhbC52YWwoKSArICcmZGVzY3VlbnRvPScgKyAkZGVzY3VlbnRvLnZhbCgpICsgJyZyYXpvbl9kZXNjdWVudG89JyArJHJhem9uLnZhbCgpO1xyXG4gICAgICBmb3JtICs9ICcmZmVjaGFfcGFnbz0nICsgZGF0ZSArICcmZGV0YWxsZXNfZXh0cmE9JyArICRzZXJ2aWNpb3NFeHRyYS52YWwoKSArIFwiJnRhYmxhPWRpc2NvdW50X3BhZ29zXCI7XHJcblxyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFBheW1lbnRzLmdldEFsbCk7XHJcbiAgICAgICRtb2RhbC5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW50ZXJhY3RpdmVTdW0oKXtcclxuICAgICAgJCgnLnBheW1lbnQtc3VtYW5kb3MnKS5vbigna2V5dXAnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJGN1b3RhLnZhbChwYWdvWydjdW90YSddIC0gJGRlc2N1ZW50by52YWwoKSk7XHJcbiAgICAgICAgdmFyIHN1bWEgPSBOdW1iZXIoJGN1b3RhLnZhbCgpKSArIE51bWJlcigkbW9yYS52YWwoKSkgKyBOdW1iZXIoJGV4dHJhLnZhbCgpKTtcclxuICAgICAgICAkdG90YWwudmFsKE51bWJlcihzdW1hKSlcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG5cclxufVxyXG5cclxudmFyIERhbWFnZXMgPSB7XHJcbiAgXHJcbiAgYWRkOiBmdW5jdGlvbiAoaWRDbGllbnRlKSB7XHJcbiAgICB2YXIgZm9ybSwgZGVzY3JpcHRpb247XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjYS1kZXNjcmlwdGlvblwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtpZENsaWVudGUsIGRlc2NyaXB0aW9uXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY2xpZW50ZT0nICsgaWRDbGllbnRlICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbiArIFwiJnRhYmxhPWF2ZXJpYXNcIjtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2FkZFwiLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIERhbWFnZXMuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gICAgJCgnI25ldy1hdmVyaWEtbW9kYWwnKS5maW5kKCdpbnB1dCx0ZXh0YXJlYScpLnZhbChcIlwiKTtcclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGF0dXMgPSAkKFwiI2F2ZXJpYXMtdmlldy1tb2RlXCIpLnZhbCgpO1xyXG4gICAgJChcIi5wcmVzZW50YWRvXCIpLnRleHQoc3RhdHVzKTtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1hdmVyaWFzJmVzdGFkbz1cIiArIHN0YXR1cztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBpbml0R2xvYmFsSGFuZGxlcnMsIGZpbGxBdmVyaWFzTGlzdCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoJGlkX2F2ZXJpYSkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWF2ZXJpYXMmaWRfYXZlcmlhPVwiICsgJGlkX2F2ZXJpYTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgRGFtYWdlcy5nZXRBbGwpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbnZhciBJbnN0YWxsYXRpb25zID0ge1xyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXR1cyA9ICQoXCIjaW5zdGFsbGF0aW9ucy12aWV3LW1vZGVcIikudmFsKCk7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9aW5zdGFsYWNpb25lcyZlc3RhZG89XCIgKyBzdGF0dXM7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBmaWxsSW5zdGFsbGF0aW9uc0xpc3QsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCRpZF9wYWdvKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9aW5zdGFsYWNpb25lcyZpZF9wYWdvPVwiICsgJGlkX3BhZ287XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIEluc3RhbGxhdGlvbnMuZ2V0QWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBDYWphID0ge1xyXG4gIGFkZDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIGFtb3VudCwgZGVzY3JpcHRpb24sIGlzX2VtcHR5O1xyXG5cclxuICAgIGFtb3VudCA9ICQoXCIjY2FqYS1hLWFtb3VudFwiKS52YWwoKTtcclxuICAgIGRlc2NyaXB0aW9uID0gJChcIiNjYWphLWEtZGVzY3JpcHRpb25cIikudmFsKCk7XHJcbiAgICBmb3JtID0gXCJlbnRyYWRhPVwiICsgYW1vdW50ICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbiArIFwiJnRhYmxhPWNhamFcIjtcclxuICAgIGlzX2VtcHR5ID0gaXNFbXB0eShbYW1vdW50LCBkZXNjcmlwdGlvbl0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9hZGQnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBDYWphLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHJldGlyZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIGFtb3VudCwgZGVzY3JpcHRpb24sIGlzX2VtcHR5O1xyXG5cclxuICAgIGFtb3VudCA9ICQoXCIjY2FqYS1yLWFtb3VudFwiKS52YWwoKTtcclxuICAgIGRlc2NyaXB0aW9uID0gJChcIiNjYWphLXItZGVzY3JpcHRpb25cIikudmFsKCk7XHJcbiAgICBmb3JtID0gXCJzYWxpZGE9XCIgKyBhbW91bnQgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uO1xyXG4gICAgaXNfZW1wdHkgPSBpc0VtcHR5KFthbW91bnQsIGRlc2NyaXB0aW9uXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9yZXRpcmUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBDYWphLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNhamFcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldEFsbCcsIGZhbHNlLCBudWxsLCBjYWphVGFibGUucmVmcmVzaCwgZm9ybSwgQ2FqYS5nZXRTYWxkbyk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0U2FsZG86IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jYWphXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRvbmUnLCBmYWxzZSwgbnVsbCwgdXBkYXRlU2FsZG8sIGZvcm0sIG51bGwpXHJcbiAgfSxcclxuXHJcbiAgc2VhcmNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgJGRhdGVTZWFyY2ggPSAkKFwiI2NhamEtZGF0ZVwiKTtcclxuICAgIHZhciAkdXNlclNlYXJjaCA9ICQoXCIjY2FqYS11c2VyXCIpO1xyXG4gICAgdmFyIGRhdGUgPSAoJGRhdGVTZWFyY2gudmFsKCkpID8gJGRhdGVTZWFyY2gudmFsKCkgOiAnJSc7XHJcbiAgICB2YXIgdXNlcklkID0gKCR1c2VyU2VhcmNoLnZhbCgpKSA/ICR1c2VyU2VhcmNoLnZhbCgpIDogJyUnO1xyXG5cclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jYWphJmlkX2VtcGxlYWRvPVwiICsgdXNlcklkICsgXCImZmVjaGE9XCIgKyBkYXRlO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3Mvc2VhcmNoJywgZmFsc2UsIG51bGwsIGNhamFUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBDb21wYW55ID0ge1xyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sXHJcbiAgICBjb21wYW55TmFtZSA9ICQoXCIjY29tcGFueS1uYW1lXCIpLnZhbCgpLFxyXG4gICAgY29tcGFueVN0YXRlbWVudCA9ICQoXCIjY29tcGFueS1zdGF0ZW1lbnRcIikudmFsKCksXHJcbiAgICBjb21wYW55UGhvbmUxID0gZ2V0VmFsKCQoXCIjY29tcGFueS1waG9uZTFcIikpLFxyXG4gICAgY29tcGFueURpcmVjdGlvbiA9ICQoXCIjY29tcGFueS1kaXJlY3Rpb25cIikudmFsKCksXHJcbiAgICBjb21wYW55RGVzY3JpcHRpb24gPSAkKFwiI2NvbXBhbnktZGVzY3JpcHRpb25cIikudmFsKCksXHJcbiAgICBjb21wYW55UGhvbmUyID0gZ2V0VmFsKCQoXCIjY29tcGFueS1waG9uZTJcIikpXHJcblxyXG4gICAgZm9ybSA9ICdub21icmU9JyArIGNvbXBhbnlOYW1lICsgJyZsZW1hPScgKyBjb21wYW55U3RhdGVtZW50ICsgJyZkZXNjcmlwY2lvbj0nICsgY29tcGFueURlc2NyaXB0aW9uICsgXCImZGlyZWNjaW9uPVwiXHJcbiAgICBmb3JtICs9IGNvbXBhbnlEaXJlY3Rpb24gKyBcIiZ0ZWxlZm9ubzE9XCIgKyBjb21wYW55UGhvbmUxICsgXCImdGVsZWZvbm9zPVwiICsgY29tcGFueVBob25lMiArIFwiJnRhYmxhPWVtcHJlc2FcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIFNldHRpbmdzID0ge1xyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sXHJcbiAgICBzZXR0aW5nc0NhcmdvTW9yYSA9ICQoXCIjc2V0dGluZ3MtbW9yYVwiKS52YWwoKSxcclxuICAgIHNldHRpbmdzRmVjaGFDb3J0ZSA9ICQoXCIjc2V0dGluZ3MtZmVjaGEtY29ydGVcIikudmFsKCksXHJcbiAgICBzZXR0aW5nc1JlY29uZXhpb24gPSAkKFwiI3NldHRpbmdzLXJlY29uZXhpb25cIikudmFsKCksXHJcbiAgICBzZXR0aW5nc1BlbmFsaXphY2lvbkNhbmNlbGFjaW9uID0gJChcIiNzZXR0aW5ncy1wZW5hbGl6YWNpb24tY2FuY2VsYWNpb25cIikudmFsKCksXHJcbiAgICBzZXR0aW5nc01lc2VzUG9yRGVmZWN0byA9ICQoXCIjc2V0dGluZ3MtbWVzZXMtcG9yLWRlZmVjdG9cIikudmFsKCksXHJcbiAgICBzZXR0aW5nc1NwbGl0RGF5ID0gJChcIiNzZXR0aW5ncy1zcGxpdC1kYXlcIikudmFsKCk7XHJcblxyXG4gICAgZm9ybSA9ICdjYXJnb19tb3JhPScgKyBzZXR0aW5nc0NhcmdvTW9yYSArICcmZmVjaGFfY29ydGU9JyArIHNldHRpbmdzRmVjaGFDb3J0ZSArICcmcmVjb25leGlvbj0nICsgc2V0dGluZ3NSZWNvbmV4aW9uO1xyXG4gICAgZm9ybSArPSAnJnBlbmFsaXphY2lvbl9jYW5jZWxhY2lvbj0nICsgc2V0dGluZ3NQZW5hbGl6YWNpb25DYW5jZWxhY2lvbiArICcmbWVzZXNfcG9yX2RlZmVjdG89JyArIHNldHRpbmdzTWVzZXNQb3JEZWZlY3RvO1xyXG4gICAgZm9ybSArPSAnJnNwbGl0X2RheT0nICsgc2V0dGluZ3NTcGxpdERheSArICcmdGFibGE9c2V0dGluZ3MnO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgU2VjdGlvbnMgPSB7IFxyXG4gIGFkZDogZnVuY3Rpb24oKSB7XHJcbiAgICBzd2FsLnNldERlZmF1bHRzKHtcclxuICAgICAgaW5wdXQ6ICd0ZXh0JyxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdOZXh0ICZyYXJyOycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICAgIHByb2dyZXNzU3RlcHM6IFsnMScsICcyJywgJzMnXVxyXG4gICAgfSlcclxuXHJcbiAgICB2YXIgc3RlcHMgPSBbe1xyXG4gICAgICAgIHRpdGxlOiAnTm9tYnJlIGRlbCBzZWN0b3InXHJcbiAgICAgIH0sXHJcbiAgICAgICdDb2RpZ28gZGVsIFNlY3RvcicsXHJcbiAgICBdXHJcblxyXG4gICAgc3dhbC5xdWV1ZShzdGVwcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgIHN3YWwucmVzZXREZWZhdWx0cygpXHJcbiAgICAgIHNhdmUocmVzdWx0KVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2F2ZShyZXN1bHQpe1xyXG4gICAgICB2YXIgZm9ybTtcclxuICAgICAgdmFyIG5vbWJyZSA9IHJlc3VsdFswXTtcclxuICAgICAgdmFyIGNvZGlnb0FyZWEgPSByZXN1bHRbMV0sXHJcblxyXG4gICAgICBmb3JtID0gXCJub21icmU9XCIrbm9tYnJlK1wiJmNvZGlnb19hcmVhPVwiK2NvZGlnb0FyZWE7XHJcbiAgICAgIGZvcm0gKz0gXCImdGFibGE9c2VjY2lvbmVzXCJcclxuICAgICBcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpe1xyXG4gICAgICAgICBpZihjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9hZGQnLCB0cnVlLCBmYWxzZSwgbnVsbCwgZm9ybSxTZWN0aW9ucy5nZXRBbGwsaGVhdnlMb2FkKSl7XHJcbiAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldElwczogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaWQgPSAkKFwiI3NlbGVjdC1zZWN0b3JcIikudmFsKCk7XHJcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9aXBzJmlkPVwiICsgaWQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBTZWN0aW9ucy5yZW9yZGVyVGFibGUsIGZvcm0sbnVsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcmVvcmRlclRhYmxlOiBmdW5jdGlvbihjb250ZW50KXtcclxuICAgIHZhciB0YWJsZSA9ICQoXCIjdC1zZWN0aW9uc1wiKTtcclxuICAgIHRhYmxlLmJvb3RzdHJhcFRhYmxlKCdkZXN0cm95Jyk7XHJcbiAgICAkKFwiI3Qtc2VjdGlvbnMgdGJvZHlcIikuaHRtbChjb250ZW50KTtcclxuICAgIHRhYmxlLmJvb3RzdHJhcFRhYmxlKCk7XHJcbiAgICB0YWJsZS5maW5kKCd0Ym9keScpLmNzcyh7ZGlzcGxheTpcInRhYmxlLXJvdy1ncm91cFwifSk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPXNlY2Npb25lc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgZmlsbFNlbGVjdCwgZm9ybSxoZWF2eUxvYWQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZpbGxTZWxlY3QoY29udGVudCl7XHJcbiAgICAgICQoXCIjc2VsZWN0LXNlY3RvclwiKS5odG1sKGNvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgJHRhYmxlID0gJChcIiN0LXNlY3Rpb25zXCIpO1xyXG4gICAgdmFyICRidG5QcmludCA9ICQoXCIjYnRuLXByaW50LXNlY3Rpb25zXCIpO1xyXG4gICAgdmFyICRzZWxlY3RTdGF0ZSA9ICQoXCIjZmlsdGVyLXNlY3Rpb25zXCIpO1xyXG4gICAgXHJcblxyXG4gICAgJHNlbGVjdFN0YXRlLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBmaWx0ZXIgPSAkKHRoaXMpLnZhbCgpXHJcbiAgICAgIGlmKGZpbHRlci5pbmNsdWRlcyhcIl1cIikpXHJcbiAgICAgICAgZmlsdGVyID0gWydvY3VwYWRvJywnZGlzcG9uaWJsZSddXHJcblxyXG4gICAgICAkdGFibGUuYm9vdHN0cmFwVGFibGUoJ2ZpbHRlckJ5Jyx7XHJcbiAgICAgICAgZXN0YWRvOiAgZmlsdGVyXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgICRidG5QcmludC5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICBwcmludCgpO1xyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59XHJcblxyXG52YXIgRXh0cmFzID0ge1xyXG4gIHJlbW92ZTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgaWRfY2xpZW50ZSwgc2VuZDtcclxuICAgIFxyXG4gICAgaWRfY2xpZW50ZSA9ICQoJyNkZXRhaWwtY2xpZW50LWlkJykudmFsKClcclxuICAgIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeSh7aWQ6IGlkLGlkX2NsaWVudGU6IGlkX2NsaWVudGV9KTtcclxuICAgIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2V4dHJhL2RlbGV0ZV9leHRyYScsIGZvcm0pO1xyXG4gICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSk7XHJcbiAgICAgIGV4dHJhVGFibGUucmVmcmVzaChkYXRhLmV4dHJhcyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbn0iLCIgIHZhciBjdXJyZW50UGFnZSA9ICQoXCJ0aXRsZVwiKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xyXG4gIGN1cnJlbnRQYWdlID0gY3VycmVudFBhZ2VbNF0udG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgdmFyIHJhbiA9IGZhbHNlO1xyXG5cclxuICBmdW5jdGlvbiBpbml0Q29tcG9uZW50cygpIHtcclxuICAgIHN3aXRjaCAoY3VycmVudFBhZ2UpIHtcclxuICAgICAgY2FzZSBcImhvbWVcIjpcclxuICAgICAgICBpbml0Q2xpZW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImFkbWluaXN0cmFkb3JcIjpcclxuICAgICAgICBpbml0QWRtaW5IYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiY2xpZW50ZXNcIjpcclxuICAgICAgICBpbml0Q2xpZW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNlcnZpY2lvc1wiOlxyXG4gICAgICAgIGluaXRTZXJ2aWNlc0hhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJudWV2b19jb250cmF0b1wiOlxyXG4gICAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICAgICAgQ29udHJhY3RzLmdldElwTGlzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZGV0YWxsZXNcIjpcclxuICAgICAgICBpbml0UGF5bWVudHNIYW5kbGVycygpO1xyXG4gICAgICAgIGRldGFpbEhhbmRsZXJzKCk7XHJcbiAgICAgICAgaW5pdENvbnRyYWN0SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImNvbnRyYXRvc1wiOlxyXG4gICAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICAgICAgaW5pdENsaWVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJjdWVudGFcIjpcclxuICAgICAgICBhY291bnRIYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic2VjY2lvbmVzXCI6XHJcbiAgICAgICAgc2VjdGlvbkhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENhamFIYW5kbGVycygpO1xyXG4gICAgaW5pdEdsb2JhbEhhbmRsZXJzKCk7XHJcbiAgfVxyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgZ2xvYmFscyBoYW5kbGVycyAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gIGZ1bmN0aW9uIGluaXRHbG9iYWxIYW5kbGVycygpIHtcclxuICAgIFxyXG4gICAgdmFyIGF2ZXJpYUNsaWVudERuaSA9ICQoXCIjYS1jbGllbnQtZG5pXCIpO1xyXG5cclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnbm90aWZpY2FjaW9uZXMnKSB7XHJcbiAgICAgIEdlbmVyYWxzLmNvdW50X3RhYmxlKFwiYXZlcmlhc1wiKTtcclxuXHJcbiAgICAgICQoXCIjYXZlcmlhcy12aWV3LW1vZGVcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBEYW1hZ2VzLmdldEFsbCgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoXCIjaW5zdGFsbGF0aW9ucy12aWV3LW1vZGVcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBJbnN0YWxsYXRpb25zLmdldEFsbCgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJ3Rib2R5JykuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiBcInRhYmxlLXJvdy1ncm91cFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnY29udHJhdG9zJykge1xyXG4gICAgICBpbml0Q29udHJhY3RIYW5kbGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhdmVyaWFDbGllbnQgPSAkKFwiI2EtY2xpZW50XCIpLnNlbGVjdDIoe1xyXG4gICAgICBkcm9wZG93blBhcmVudDogJCgnI25ldy1hdmVyaWEtbW9kYWwnKSxcclxuICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgYWpheDoge1xyXG4gICAgICAgIHVybDogQkFTRV9VUkwgKyAncHJvY2Vzcy9zZWFyY2gnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgZGVsYXk6IDI1MCxcclxuICAgICAgICBkYXRhOiBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBxOiBwYXJhbXMudGVybSxcclxuICAgICAgICAgICAgdGFibGE6ICdjbGllbnRlc19wYXJhX2F2ZXJpYXMnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJvY2Vzc1Jlc3VsdHM6IGZ1bmN0aW9uIChkYXRhLCBwYXJhbXMpIHtcclxuICAgICAgICAgIHBhcmFtcy5wYWdlID0gcGFyYW1zLnBhZ2UgfHwgMVxyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdWx0czogZGF0YS5pdGVtcyxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgIG1vcmU6IChwYXJhbXMucGFnZSAqIDMwKSA8IGRhdGEudG90YWxfY291bnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWF2ZXJpYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBEYW1hZ2VzLmFkZChhdmVyaWFDbGllbnQudmFsKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICQoXCIuYnRuLXVwZGF0ZS1hdmVyaWFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICB2YXIgaWRfYXZlcmlhID0gJCh0aGlzKS5wYXJlbnRzKCcuYXZlcmlhLWl0ZW0nKS5maW5kKCcuY29kZScpXHJcbiAgICBpZF9hdmVyaWEgPSBpZF9hdmVyaWEudGV4dCgpLnRyaW0oKTtcclxuICAgIERhbWFnZXMudXBkYXRlKGlkX2F2ZXJpYSk7XHJcbiAgfSk7XHJcblxyXG4gICQoXCIuYnRuLXVwZGF0ZS1pbnN0YWxsYXRpb25cIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICB2YXIgaWRfcGFnbyA9ICQodGhpcykucGFyZW50cygnLmF2ZXJpYS1pdGVtJykuZmluZCgnLmNvZGUnKTtcclxuICAgIGlkX3BhZ28gPSBpZF9wYWdvLnRleHQoKS50cmltKCk7XHJcbiAgICBJbnN0YWxsYXRpb25zLnVwZGF0ZShpZF9wYWdvKTtcclxuICB9KTtcclxuXHJcbiAgJChcIiNleHRyYS1jb250cm9sc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIENvbnRyYWN0cy5idG5FeHRyYVByZXNzZWQoJCh0aGlzKSk7XHJcbiAgfSk7XHJcblxyXG4gICQoXCIjZXh0cmEtY2xpZW50LWRuaVwiKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICB2YXIga2V5ID0gZS53aGljaDtcclxuICAgIHZhciBkbmkgPSAkKHRoaXMpLnZhbCgpXHJcbiAgICBpZiAoa2V5ID09IDEzKSB7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRBbGxPZkNsaWVudChkbmkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICAgICBhZG1pbiBoYW5kbGVycyAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGluaXRBZG1pbkhhbmRsZXJzKCkge1xyXG4gICAgdXNlclRhYmxlLmluaXQoKTtcclxuICAgICQoXCIjYnRuLXNhdmUtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBVc2Vycy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLXVwZGF0ZS11c2VyXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFVzZXJzLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5kZWxldGUtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciAkcm93ID0gJCh0aGlzKS5wYXJlbnRzKFwidHJcIik7XHJcbiAgICAgIHZhciBpZCA9ICRyb3cuZmluZCgnLnVzZXItaWQnKS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICB2YXIgcm93ID0gdXNlclRhYmxlLmdldFJvdyhpZCk7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgdGV4dDogXCJEZXNlYSBFbGltaW5hciBhbCBVc3VhcmlvIFwiICsgcm93Lm5vbWJyZXMgKyBcIiBcIiArIHJvdy5hcGVsbGlkb3MgKyBcIj9cIixcclxuICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVXNlcnMuZGVsZXRlKGlkKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmVkaXQtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignZGF0YS11c2VyLWlkJyk7XHJcbiAgICAgIHZhciByb3cgPSB1c2VyVGFibGUuZ2V0Um93KGlkKTtcclxuXHJcblxyXG4gICAgICAkKFwiI2Utbmlja25hbWVcIikudmFsKHJvdy5uaWNrKTtcclxuICAgICAgJChcIiNlLW5hbWVcIikudmFsKHJvdy5ub21icmVzKTtcclxuICAgICAgJChcIiNlLWxhc3RuYW1lXCIpLnZhbChyb3cuYXBlbGxpZG9zKTtcclxuICAgICAgJChcIiNlLWRuaVwiKS52YWwocm93LmNlZHVsYSk7XHJcbiAgICAgICQoXCIjZS10eXBlXCIpLnZhbChyb3cudGlwb19jb2RpZ28pO1xyXG4gICAgICAkKCcjdXBkYXRlLXVzZXItbW9kYWwnKS5tb2RhbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiN1cGRhdGUtY29tcGFueS1kYXRhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ29tcGFueS51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLXVwZGF0ZS1zZXR0aW5nc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIFNldHRpbmdzLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgSW5pdCBjYWphICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gIGZ1bmN0aW9uIGluaXRDYWphSGFuZGxlcnMoKSB7XHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2FkbWluaXN0cmFkb3InKSB7XHJcbiAgICAgIGNhamFUYWJsZS5pbml0KCk7XHJcbiAgICB9XHJcbiAgICB2YXIgYnRuQWRkTW9uZXkgPSAkKFwiI2J0bi1hZGQtbW9uZXlcIik7XHJcbiAgICB2YXIgYnRuUmV0aXJlTW9uZXkgPSAkKFwiI2J0bi1yZXRpcmUtbW9uZXlcIik7XHJcbiAgICB2YXIgdXNlclNlYXJjaCA9ICQoXCIjY2FqYS11c2VyXCIpO1xyXG4gICAgdmFyIGRhdGVTZWFyY2ggPSAkKFwiI2NhamEtZGF0ZVwiKTtcclxuXHJcbiAgICBidG5BZGRNb25leS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDYWphLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYnRuUmV0aXJlTW9uZXkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5yZXRpcmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGVTZWFyY2gub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENhamEuc2VhcmNoKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB1c2VyU2VhcmNoLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDYWphLnNlYXJjaCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgSW5pdCBjbGllbnQgSGFuZGxlcnMgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGluaXRDbGllbnRIYW5kbGVycygpIHtcclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnY2xpZW50ZXMnKSB7XHJcbiAgICAgIGNsaWVudFRhYmxlLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDbGllbnRzLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiN1cGRhdGUtY2xpZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gY2xpZW50VGFibGUuZ2V0SWQoKTtcclxuICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgQ2xpZW50cy5nZXRPbmUoaWQsIENsaWVudHMucmVjZWl2ZUZvckVkaXQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2NsaWVudC1zZWFyY2hlclwiKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgdGV4dCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgIEdlbmVyYWxzLnNlYXJjaCh0ZXh0LCBcImNsaWVudGVzXCIsIGNsaWVudFRhYmxlLnJlZnJlc2gpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjbGllbnQtc2VhcmNoZXItbmV3Y29udHJhY3RcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBpZiAoIWlzRW1wdHkoW3RleHRdKSkge1xyXG4gICAgICAgIEdlbmVyYWxzLnNlYXJjaCh0ZXh0LCBcImNsaWVudGVzXCIsIGNsaWVudFRhYmxlLnJlZnJlc2gpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFyVGJvZHkoXCIubG9iYnktcmVzdWx0c1wiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNkZWxldGUtY2xpZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHJvdyA9IGNsaWVudFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIkRlc2VhIEVsaW1pbmFyIGFsKGxhKSBDbGllbnRlIFwiICsgcm93Lm5vbWJyZXMgKyBcIiBcIiArIHJvdy5hcGVsbGlkb3MgKyBcIj9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgR2VuZXJhbHMuZGVsZXRlUm93KHJvdy5pZCwgXCJjbGllbnRlc1wiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBJbml0IFNlcnZpY2VzIEhhbmRsZXJzICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gaW5pdFNlcnZpY2VzSGFuZGxlcnMoKSB7XHJcbiAgICBzZXJ2aWNlVGFibGUuaW5pdCgpO1xyXG5cclxuICAgICQoXCIjYnRuLXNhdmUtc2VydmljZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBTZXJ2aWNlcy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZGVsZXRlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBzZXJ2aWNlVGFibGUuZ2V0SWQoKTtcclxuICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBFbGltaW5hciAgZWwgU2VydmljaW8/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIEdlbmVyYWxzLmRlbGV0ZVJvdyhpZCwgXCJzZXJ2aWNpb3NcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZWRpdC1zZXJ2aWNlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyIHJvdyA9IHNlcnZpY2VUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG5cclxuICAgICAgJCgnI3Utc2VydmljZS1pZCcpLnZhbChyb3cuaWQpO1xyXG4gICAgICAkKCcjdS1zZXJ2aWNlLW5hbWUnKS52YWwocm93Lm5vbWJyZSk7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtZGVzY3JpcHRpb24nKS52YWwocm93LmRlc2NyaXBjaW9uKTtcclxuICAgICAgJCgnI3Utc2VydmljZS1tb250aGx5LXBheW1lbnQnKS52YWwoTnVtYmVyKHJvdy5tZW5zdWFsaWRhZC5yZXBsYWNlKFwiUkQkIFwiLCAnJykpKTtcclxuICAgICAgJCgnI3Utc2VydmljZS10eXBlJykudmFsKHJvdy50aXBvKTtcclxuICAgICAgJCgnI3VwZGF0ZS1zZXJ2aWNlLW1vZGFsJykubW9kYWwoKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtc2VydmljZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBTZXJ2aWNlcy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjc2VydmljZS1zZWFyY2hlclwiKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgdGV4dCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgIEdlbmVyYWxzLnNlYXJjaCh0ZXh0LCBcInNlcnZpY2lvc1wiLCBzZXJ2aWNlVGFibGUucmVmcmVzaCwgaW5pdFNlcnZpY2VzSGFuZGxlcnMpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgQ29udHJhY3QgSGFuZGxlcnMgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0Q29udHJhY3RIYW5kbGVycygpIHtcclxuICAgIGlmKGN1cnJlbnRQYWdlID09ICdjb250cmF0b3MnKXtcclxuICAgICAgY29udHJhY3RUYWJsZS5pbml0KCk7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRBbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbnRyYWN0cy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLWFkZC1leHRyYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbnRyYWN0cy5jYWxsRXh0cmEoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKFwiI2NvbnRyYWN0LXNlYXJjaGVyXCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgR2VuZXJhbHMuc2VhcmNoKHRleHQsIFwidl9jb250cmF0b3NcIiwgY29udHJhY3RUYWJsZS5yZWZyZXNoLCBudWxsKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLWNhbmNlbC1jb250cmFjdCwgI2J0bi1kZXRhaWwtY2FuY2VsLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyIHJvdywgY2FsbGJhY2sgXHJcbiAgICAgIGNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCcpO1xyXG4gICAgICAgIGlmKGN1cnJlbnRQYWdlID09ICdjb250cmF0b3MnKXtcclxuICAgICAgICAgIHJvdyA9IGNvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgICAgIGNhbGxiYWNrID0gQ29udHJhY3RzLmdldEFsbDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHJvdyA9IGRldGFpbHNDb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgICAgICByb3cuaWQgPSByb3cuaWRfY29udHJhdG87XHJcbiAgICAgICAgICByb3cuaWRfY2xpZW50ZSA9ICQoJyNkYXRhaWwtY2xpZW50LWlkJykudmFsKCk7XHJcbiAgICAgICAgICByb3cuY2xpZW50ZSA9ICQoJyNkZXRhaWwtY2xpZW50LW5hbWUnKS52YWwoKTtcclxuICAgICAgICAgIGNhbGxiYWNrID0gUGF5bWVudHMuY29udHJhY3RSZWZyZXNoO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICAkKFwiLmNhbmNlbC1uYW1lXCIpLnRleHQocm93LmNsaWVudGUpO1xyXG4gICAgICAgIHZhciAkaW5wdXRFbGVtZW50ID0gJChcIi5jb25maXJtZWQtZGF0YVwiKTtcclxuICAgICAgICB2YXIgJGJ1dHRvblRvQWN0aXZlID0gJChcIiNjYW5jZWwtcGVybWFuZW50bHlcIik7XHJcblxyXG4gICAgICAgIGRlbGV0ZVZhbGlkYXRpb24oJGlucHV0RWxlbWVudCwgcm93LmNsaWVudGUsICRidXR0b25Ub0FjdGl2ZSk7XHJcbiAgICAgICAgJChcIiNjYW5jZWwtcHJpbnRcIikuYXR0cihcImhyZWZcIiwgQkFTRV9VUkwgKyAncHJvY2Vzcy9nZXRjYW5jZWxjb250cmFjdC8nICsgcm93LmlkKTtcclxuXHJcbiAgICAgICAgJChcIiNjYW5jZWwtY29udHJhY3QtbW9kYWxcIikubW9kYWwoKTtcclxuICAgICAgICBcclxuICAgICAgICAkYnV0dG9uVG9BY3RpdmUub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyb3cpXHJcbiAgICAgICAgICBDb250cmFjdHMuY2FuY2VsKHJvdywgY2FsbGJhY2spXHJcbiAgICAgICAgICAkYnV0dG9uVG9BY3RpdmUuYXR0cignZGlzYWJsZScpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICRpbnB1dEVsZW1lbnQudmFsKCcnKTtcclxuICAgICAgICAkKCcjY2FuY2VsLWNvbnRyYWN0LW1vZGFsIC5hbGVydCcpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgJGJ1dHRvblRvQWN0aXZlLmF0dHIoJ2Rpc2FibGVkJywgJycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3YWwoXCJEZWJlcyBzZWxlY2Npb25hciB1biBjb250cmF0b1wiKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1zdXNwZW5kLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHJvdyA9IGNvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgU3VzcGVuZGVyIGVsIGNvbnRyYXRvIGRlIFwiICsgcm93LmNsaWVudGUgKyBcIiA/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8nLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgQ29udHJhY3RzLnN1c3BlbmQocm93LmlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFwiRGViZSBzZWxlY2Npb25hciB1biBjb250cmF0b1wiKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtY29udHJhY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBjb250cmFjdFRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIENvbnRyYWN0cy5nZXRPbmUoaWQsIENvbnRyYWN0cy5yZWNpZXZlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNzZWxlY3QtY29udHJhY3Qtc2VjdG9yXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb250cmFjdHMuZ2V0SXBMaXN0KCk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJyNzZWxlY3QtcGF5LXVudGlsJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQoJyNzZWxlY3QtcGF5LXVudGlsIDpzZWxlY3RlZCcpO1xyXG4gICAgICB2YXIgY29udHJhY3RJZCA9ICR0aGlzLmF0dHIoJ2RhdGEtY29udHJhY3QnKTtcclxuICAgICAgdmFyIGxhc3RQYXltZW50SWQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBQYXltZW50cy51cGRhdGVVbnRpbChjb250cmFjdElkLCBsYXN0UGF5bWVudElkKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBJbml0IFBheW1lbnRzICBIYW5kbGVycyAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gIGZ1bmN0aW9uIGluaXRQYXltZW50c0hhbmRsZXJzKCkge1xyXG4gICAgcGF5bWVudFRhYmxlLmluaXQoKTtcclxuICAgIGV4dHJhVGFibGUuaW5pdCgpO1xyXG4gICAgaWYgKCFyYW4pIHtcclxuICAgICAgUGF5bWVudHMuZ2V0QWxsKCk7XHJcbiAgICAgIHJhbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNidG4tcGF5XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBpZCA9IHBheW1lbnRUYWJsZS5nZXRJZCgpO1xyXG4gICAgICBpZiAoaWQpIHtcclxuICAgICAgICBQYXltZW50cy51cGRhdGUoaWQpO1xyXG4gICAgICAgIHVwZGF0ZV9tb2RlKGlkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUT0RPOiBNRVNTQUdFIFNlbGVjdCBhIHBheW1lbnRcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNzZWxlY3QtY29udHJhY3RcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNwYXltZW50LWRldGFpbC1ib3hcIikuY29sbGFwc2UoKVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9tb2RlKGlkKSB7XHJcbiAgICAgIHZhciBtb2RlID0gJCgnLnBheW1lbnQtbW9kZS5zZWxlY3RlZCcpLnRleHQoKTtcclxuICAgICAgdmFyIGV4dHJhSW5mbyA9IHtcclxuICAgICAgICBpZDogaWQudG9TdHJpbmcoKSxcclxuICAgICAgICBtb2R1bGU6ICdwYWdvcydcclxuICAgICAgfVxyXG4gICAgICB2YXIgZm9ybSA9ICdkYXRhPScgKyBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgdGlwbzogbW9kZVxyXG4gICAgICB9KSArICcmZXh0cmFfaW5mbz0nICsgSlNPTi5zdHJpbmdpZnkoZXh0cmFJbmZvKTtcclxuXHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdwcm9jZXNzL2F4aW9zdXBkYXRlJywgZm9ybSlcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIC8vVE9ETzogc29tZXRoaW5nIHdoaXRoIHRoYXQgLyBhbGdvIGNvbiBlc3RvXHJcbiAgICAgIH0pO1xyXG4gICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgIGRldGFpbCBIYW5kbGVycyAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGRldGFpbEhhbmRsZXJzKCkge1xyXG5cclxuICAgIHZhciAkY2xpZW50TmFtZSA9ICQoJyNkZXRhaWwtY2xpZW50LW5hbWUnKTtcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLW9ic2VydmF0aW9uc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBQYXltZW50cy5zYXZlQWJvbm9zKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjYnRuLXNhdmUtcmVhbC1vYnNlcnZhdGlvbnMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDbGllbnRzLnNhdmVPYnNlcnZhdGlvbnMoKTtcclxuICAgIH0pXHJcblxyXG4gICAgZGV0YWlsc0NvbnRyYWN0VGFibGUuaW5pdCgpO1xyXG5cclxuICAgICQoXCIjYnRuLWRldGFpbC1zdXNwZW5kLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHJvdyA9IGRldGFpbHNDb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIkRlc2VhIFN1c3BlbmRlciBlbCBjb250cmF0byBkZSBcIiArICRjbGllbnROYW1lLnZhbCgpICsgXCIgP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIENvbnRyYWN0cy5zdXNwZW5kKHJvdy5pZF9jb250cmF0bywgUGF5bWVudHMuY29udHJhY3RSZWZyZXNoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFwiRGViZSBzZWxlY2Npb25hciB1biBjb250cmF0b1wiKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1jYWxsLXJlY29ubmVjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXHJcbiAgICAgIHZhciByb3cgPSBkZXRhaWxzQ29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZihyb3cpe1xyXG4gICAgICAgICQoXCIjcmVjb25uZWN0LW1vZGFsXCIpLm1vZGFsKCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHN3YWwoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIGNvbnRyYXRvIHByaW1lcm9cIik7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgJChcIiNidG4tcmVjb25uZWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcclxuICAgICAgdmFyIHJvdyA9IGRldGFpbHNDb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgIGlmKHJvdyl7XHJcbiAgICAgICAgQ29udHJhY3RzLnJlY29ubmVjdChyb3cuaWRfY29udHJhdG8sUGF5bWVudHMuY29udHJhY3RSZWZyZXNoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAkKCcjYnRuLWNhbGwtZXh0cmEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBjb250ZXh0ID0gJ2RldGFpbHMnO1xyXG4gICAgICBDb250cmFjdHMuY2FsbEV4dHJhKGNvbnRleHQpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFjb3VudEhhbmRsZXJzKCkge1xyXG4gICAgdmFyICR1c2VySWQgPSAkKFwiI2Fjb3VudC11c2VyLWlkXCIpXHJcbiAgICB2YXIgJGN1cnJlbnRQYXNzd29yZCA9ICQoXCIjYWNvdW50LWN1cnJlbnQtcGFzc3dvcmRcIilcclxuICAgIHZhciAkYnRuVXBkYXRlVXNlciA9ICQoXCIjdXBkYXRlLXVzZXItZGF0YVwiKTtcclxuICAgIHZhciAkbmV3UGFzc3dvcmQgPSAkKFwiI2Fjb3VudC1uZXctcGFzc3dvcmRcIik7XHJcblxyXG4gICAgJChcIiNhY291bnQtY3VycmVudC1wYXNzd29yZFwiKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBVc2Vycy5jb25maXJtUGFzc3dvcmQoJHVzZXJJZC52YWwoKSwgJGN1cnJlbnRQYXNzd29yZC52YWwoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkYnRuVXBkYXRlVXNlci5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFVzZXJzLnVwZGF0ZVBhc3N3b3JkKCR1c2VySWQudmFsKCksICRjdXJyZW50UGFzc3dvcmQudmFsKCksICRuZXdQYXNzd29yZC52YWwoKSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZWN0aW9uSGFuZGxlcnMoKSB7XHJcbiAgICBpZiAoIXJhbikge1xyXG4gICAgICBTZWN0aW9ucy5pbml0KClcclxuICAgICAgU2VjdGlvbnMuZ2V0SXBzKCk7XHJcbiAgICAgIHJhbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNidG4tYWRkLXNlY3Rpb25cIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VjdGlvbnMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3NlbGVjdC1zZWN0b3JcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFNlY3Rpb25zLmdldElwcygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAkKGZ1bmN0aW9uICgpIHtcclxuICAgIGluaXRDb21wb25lbnRzKClcclxuICB9KTsiLCJ2YXIgcmFuID0gZmFsc2U7XHJcblxyXG5mdW5jdGlvbiBsb2dpbkhhbmRsZXJzKCkge1xyXG5cclxuICAkKFwiI3NlbmQtY3JlZGVudGlhbHNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBTZXNzaW9uLmxvZ2luKCk7XHJcbiAgfSk7XHJcblxyXG4gICQoXCIjdXNlci1pbnB1dFwiKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgbG9naW5MaWJyYXJ5LnNlbmRUb0xvZ2luKGUpXHJcbiAgfSlcclxuXHJcbiAgJChcIiNwYXNzd29yZC1pbnB1dFwiKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgbG9naW5MaWJyYXJ5LnNlbmRUb0xvZ2luKGUpXHJcbiAgfSlcclxuXHJcbiAgJChcImFbaHJlZl1cIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgbG9naW5MaWJyYXJ5LmxvYWRpbmcoKTtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgdGFyZ2V0ID0gJHRoaXMuYXR0cigndGFyZ2V0Jyk7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCAzMDAwKVxyXG4gICAgfWNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvclxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbnZhciBTZXNzaW9uID0ge1xyXG4gIGxvZ2luOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB1c2VyICAgICA9ICQoXCIjdXNlci1pbnB1dFwiKS52YWwoKTtcclxuICAgIHZhciBwYXNzd29yZCA9ICQoXCIjcGFzc3dvcmQtaW5wdXRcIikudmFsKCk7XHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFt1c2VyLCBwYXNzd29yZF0pXHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIHZhciBmb3JtID0gJ3VzZXI9JyArIHVzZXIgKyAnJnBhc3N3b3JkPScgKyBwYXNzd29yZDtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ2FwcC9sb2dpbicsIGZhbHNlLCBmYWxzZSwgU2Vzc2lvbi5wcm9jZXNzTG9naW5EYXRhLCBmb3JtLCBudWxsLCBsb2dpbkxpYnJhcnkubG9hZGluZylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfRVJST1IgKyBcIiBMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIGluZGljYWRvcyBwYXJhIGluZ3Jlc2FyXCIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcHJvY2Vzc0xvZ2luRGF0YTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgIGlmIChyZXNwb25zZSA9PSB0cnVlKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gQkFTRV9VUkwgKyAnYXBwL2FkbWluLyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKFwiLmxvYWRlclwiKS5jc3Moe1xyXG4gICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXHJcbiAgICAgIH0pO1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0lORk8gKyBcIiBVc3VhcmlvIHkgQ29udHJhc2XDsWEgbm8gdmFsaWRvc1wiKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG52YXIgbG9naW5MaWJyYXJ5ID0ge1xyXG4gIGxvYWRpbmc6IGZ1bmN0aW9uKHN0b3ApIHtcclxuICAgIGlmKCFzdG9wKXtcclxuICAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogXCJibG9ja1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgXHJcbiAgc2VuZFRvTG9naW46IGZ1bmN0aW9uKGUpIHtcclxuICAgIGtleSA9IGUud2hpY2hcclxuICAgIGlmIChrZXkgPT0gMTMpIHtcclxuICAgICAgU2Vzc2lvbi5sb2dpbigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgbG9naW5IYW5kbGVycygpO1xyXG59KSIsIiAgZnVuY3Rpb24gaXNDdXJyZW50UGFnZShwYWdlTmFtZSl7XHJcbiAgICBpZihnZXRDdXJyZW50UGFnZSgpID09IHBhZ2VOYW1lKXtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gIFxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFBhZ2UoKXtcclxuICAgIHZhciBjdXJyZW50UGFnZSA9ICQoXCJ0aXRsZVwiKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xyXG4gICAgY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZVs0XS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICAgIHJldHVybiBjdXJyZW50UGFnZTtcclxuICB9XHJcblxyXG4gIGlmKGlzQ3VycmVudFBhZ2UoXCJjaWVycmVcIikgfHwgaXNDdXJyZW50UGFnZShcImNpZXJyZTJcIikpe1xyXG4gICAgY2llcnJlQ2FqYUZ1bmN0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgaWYoaXNDdXJyZW50UGFnZShcInJlcG9ydGVzXCIpKXtcclxuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gICAgc2NyaXB0LnNyYyA9IEJBU0VfVVJMICsgXCJhc3NldHMvanMvbWluL3JlcG9ydGVzLm1pbi5qcz92ZXJzaW9uPTQuMC4yMlwiO1xyXG4gICAgJChcImJvZHlcIikuYXBwZW5kKHNjcmlwdCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjaWVycmVDYWphRnVuY3Rpb25zKCl7XHJcbiAgICBcclxuICAgIHZhciB0b3RhbGVzID0ge1xyXG4gICAgICAgICAgdG90YWwxOiAwLFxyXG4gICAgICAgICAgdG90YWw1OiAwLFxyXG4gICAgICAgICAgdG90YWwxMDogMCxcclxuICAgICAgICAgIHRvdGFsMjA6IDAsXHJcbiAgICAgICAgICB0b3RhbDI1OiAwLFxyXG4gICAgICAgICAgdG90YWw1MDogMCxcclxuICAgICAgICAgIHRvdGFsMTAwOiAwLFxyXG4gICAgICAgICAgdG90YWwyMDA6IDAsXHJcbiAgICAgICAgICB0b3RhbDUwMDogMCxcclxuICAgICAgICAgIHRvdGFsMTAwMDogMCxcclxuICAgICAgICAgIHRvdGFsMjAwMDogMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB2YXIgZ2FzdG8gICA9IHtcclxuICAgICAgICAnZmVjaGEnOiAnJyxcclxuICAgICAgICAnZGVzY3JpcGNpb24nOiAnJyxcclxuICAgICAgICAnbW9udG8nOiAnJyxcclxuICAgICAgfVxyXG5cclxuICAgIHZhciBnYXN0b3MgID0gW3tmZWNoYTogbm93KCksZGVzY3JpcGNpb246XCJob2xhXCIsbW9udG86IDIwMDAsIGlkX2dhc3RvOiAxfV1cclxuICAgIHZhciBhdXRvciAgID0gJCgnI2F1dG9yLWNpZXJyZScpLnRleHQoKS50cmltKClcclxuXHJcbiAgICB2YXIgYXBwQ2llcnJlID0gbmV3IFZ1ZSh7XHJcbiAgICAgIGVsOiAnI2FwcC1jaWVycmUnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgaXNIaWRlOiBmYWxzZSxcclxuICAgICAgICBmZWNoYTogbm93KCksXHJcbiAgICAgICAgZGF0YV9jaWVycmU6e1xyXG4gICAgICAgICAgYXV0b3I6IGF1dG9yLFxyXG4gICAgICAgICAgcGFnb3NfZmFjdHVyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19leHRyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19lZmVjdGl2bzogMCxcclxuICAgICAgICAgIHBhZ29zX2JhbmNvOiAwLFxyXG4gICAgICAgICAgdG90YWxfaW5ncmVzb3M6IDAsXHJcbiAgICAgICAgICBlZmVjdGl2b19jYWphOiAwLFxyXG4gICAgICAgICAgdG90YWxfZGVzY3VhZHJlOiAwLFxyXG4gICAgICAgICAgdG90YWxfZ2FzdG9zOiAwLFxyXG4gICAgICAgICAgYmFuY286IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRlbzp0b3RhbGVzLFxyXG4gICAgICAgIHN1bWE6IDAsXHJcbiAgICAgICAgZ2FzdG86IGdhc3RvLFxyXG4gICAgICAgIGdhc3RvczogZ2FzdG9zXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBtb3VudGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmdldEdhc3RvcygpO1xyXG4gICAgICAgIHRoaXMuc2V0SW5ncmVzb3MoKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLndpbGwtbG9hZCcpLmNzcyh7dmlzaWJpbGl0eTpcInZpc2libGVcIn0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgY3VycmVuY3lGb3JtYXQ6IGZ1bmN0aW9uKG51bWJlcil7XHJcbiAgICAgICAgICByZXR1cm4gQ3VycmVuY3lGb3JtYXQobnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBtZXRob2RzOntcclxuICAgICAgICBjaGFuZ2VUb3RhbDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICB2YXIgdW5pdCA9IGUuc3JjRWxlbWVudC5hdHRyaWJ1dGVzWydkYXRhLXVuaXQnXS52YWx1ZVxyXG4gICAgICAgICAgdmFyIGNhbnRpZGFkID0gZS5zcmNFbGVtZW50LnZhbHVlXHJcbiAgICAgICAgICB2YXIgdG90YWwgPSBjYW50aWRhZCAqIHVuaXRcclxuICAgICAgICAgIHRvdGFsZXNbJ3RvdGFsJysgdW5pdF0gPSBjYW50aWRhZCAqIHVuaXQgKiAxLjAwICAgIFxyXG4gICAgICAgIH0sIFxyXG5cclxuICAgICAgICBhZGRHYXN0bzogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgdmFyIGdhc3RvID0gdGhpcy5nYXN0bztcclxuICAgICAgICAgIGdhc3RvLmZlY2hhID0gbm93KCk7XHJcbiAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZ2FzdG8pO1xyXG4gICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdjYWphL2FkZF9nYXN0bycsZm9ybSlcclxuICAgICAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5maWxsR2FzdG9zKGRhdGEuZ2FzdG9zLFwibm9ybWFsXCIpXHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5zZXRHYXN0b1RvdGFsKGRhdGEudG90YWxfZ2FzdG9zKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpbGxHYXN0b3M6IGZ1bmN0aW9uKGdhc3Rvc19zZXJ2aWRvcixtb2RlKXtcclxuICAgICAgICAgIGlmKG1vZGUgPT0gXCJncm91cFwiKXtcclxuICAgICAgICAgICAgaWYoZ2FzdG9zX3NlcnZpZG9yICE9IG51bGwgfHwgZ2FzdG9zX3NlcnZpZG9yLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgIGFwcENpZXJyZS5nYXN0b3MgPSBnYXN0b3Nfc2Vydmlkb3I7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGFwcENpZXJyZS5nYXN0b3MgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5nYXN0b3MucHVzaChKU09OLnBhcnNlKGdhc3Rvc19zZXJ2aWRvcilbMF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldEdhc3RvVG90YWw6IGZ1bmN0aW9uKHRvdGFsR2FzdG9zKXtcclxuICAgICAgICAgIHRoaXMuZGF0YV9jaWVycmUudG90YWxfZ2FzdG9zID0gdG90YWxHYXN0b3NcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRHYXN0bzogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICB2YXIgZ2FzdG8gPSB0aGlzLmdhc3RvO1xyXG4gICAgICAgICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGdhc3RvKTtcclxuICAgICAgICAgIGNvbm5lY3RBbmRTZW5kKCdjYWphL2dldF9nYXN0bycsZmFsc2UsbnVsbCxhcHBDaWVycmUuZmlsbEdhc3Rvcyxmb3JtLG51bGwsIG51bGwpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRlbGV0ZUdhc3RvOiBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgdmFyIGNhbGxlciA9IGUudGFyZ2V0O1xyXG4gICAgICAgICAgaWYoY2FsbGVyLmxvY2FsbmFtZSA9PSBcImlcIil7XHJcbiAgICAgICAgICAgIGNhbGxlciA9IGNhbGxlci5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIGlkID0gY2FsbGVyLmF0dHJpYnV0ZXNbJ2RhdGEtaWQnXS52YWx1ZVxyXG4gICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiU2VndXJvIGRlIHF1ZSBxdWllcmUgZWxpbWluYXIgZXN0ZSBnYXN0bz9cIixcclxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeSh7aWQ6IGlkLCBmZWNoYTpub3coKX0pXHJcbiAgICAgICAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdjYWphL2RlbGV0ZV9nYXN0bycsZm9ybSlcclxuICAgICAgICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAgICAgICAgICAgYXBwQ2llcnJlLmZpbGxHYXN0b3MoZGF0YS5nYXN0b3MsXCJncm91cFwiKVxyXG4gICAgICAgICAgICAgIGFwcENpZXJyZS5zZXRHYXN0b1RvdGFsKGRhdGEudG90YWxfZ2FzdG9zKSBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTsgICAgICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRHYXN0b3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgZGF0YSA9IHtmZWNoYTogbm93KCl9XHJcbiAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnY2FqYS9nZXRfZ2FzdG9zJyxmb3JtKVxyXG4gICAgICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhXHJcbiAgICAgICAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSlcclxuICAgICAgICAgICAgYXBwQ2llcnJlLmZpbGxHYXN0b3MoZGF0YS5nYXN0b3MsXCJncm91cFwiKVxyXG4gICAgICAgICAgICBhcHBDaWVycmUuc2V0R2FzdG9Ub3RhbChkYXRhLnRvdGFsX2dhc3RvcylcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldEluZ3Jlc29zOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIGZvcm0gPSAnZGF0YT0nICsgSlNPTi5zdHJpbmdpZnkoe2ZlY2hhOiBub3coKX0pXHJcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMuZGF0YV9jaWVycmU7XHJcbiAgICAgICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoIEJBU0VfVVJMICsgJ2NhamEvZ2V0X2luZ3Jlc29zJyxmb3JtKVxyXG4gICAgICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhXHJcbiAgICAgICAgICAgIHNlbGYucGFnb3NfZmFjdHVyYXMgPSBkYXRhLnBhZ29zX2ZhY3R1cmFzO1xyXG4gICAgICAgICAgICBzZWxmLnBhZ29zX2V4dHJhcyA9IGRhdGEucGFnb3NfZXh0cmFzO1xyXG4gICAgICAgICAgICBzZWxmLnBhZ29zX2VmZWN0aXZvID0gZGF0YS5wYWdvc19lZmVjdGl2bztcclxuICAgICAgICAgICAgc2VsZi5wYWdvc19iYW5jbyA9IGRhdGEucGFnb3NfYmFuY287XHJcbiAgICAgICAgICAgIHNlbGYudG90YWxfaW5ncmVzb3MgPSBwYXJzZUZsb2F0KGRhdGEucGFnb3NfZmFjdHVyYXMpICsgcGFyc2VGbG9hdChzZWxmLnBhZ29zX2V4dHJhcyk7XHJcbiAgICAgICAgICAgIHNlbGYudG90YWxfZGVzY3VhZHJlID0gLSBzZWxmLnBhZ29zX2VmZWN0aXZvICsgc2VsZi5lZmVjdGl2b19jYWphO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2VycmFyQ2FqYTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciBzZWxmICAgPSB0aGlzO1xyXG4gICAgICAgICAgdmFyIGNpZXJyZSA9IHRoaXMuZGF0YV9jaWVycmU7XHJcbiAgICAgICAgICB3aW5kb3cuY2llcnJlID0gY2llcnJlO1xyXG4gICAgICAgICAgaWYoY2llcnJlLnRvdGFsX2Rlc2N1YWRyZSAhPSAwKXtcclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgICAgICB0ZXh0OiBcIkhheSB1biBkZXNjdWFkcmUgZW4gbGEgY2FqYSwgcXVpZXJlIGhhY2VyIGVsIGNpZXJyZSBkZSB0b2RvcyBtb2Rvcz9cIixcclxuICAgICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1NpJyxcclxuICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnTm8nXHJcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICBzZWxmLmNlcnJhcihjaWVycmUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc2VsZi5jZXJyYXIoY2llcnJlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjZXJyYXI6IGZ1bmN0aW9uKGNpZXJyZSl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGNpZXJyZS5mZWNoYSA9IG5vdygpO1xyXG4gICAgICAgICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGNpZXJyZSk7XHJcbiAgICAgICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoIEJBU0VfVVJMICsgJ2NhamEvYWRkX2NpZXJyZScsZm9ybSlcclxuICAgICAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAgICAgICAgIHNlbGYuaXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgYXBwU3VtbWFyeVZpZXcuaXNIaWRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGFwcFN1bW1hcnlWaWV3LmNpZXJyZSA9IGNpZXJyZTtcclxuICAgICAgICAgICAgJChcIiNhcHAtY2llcnJlXCIpLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICQoXCIudG9wLW5hdlwiKS5hZGRDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICAgICAkKFwiI3ByaW50LXZpZXdcIikuY3NzKHt2aXNpYmlsaXR5OiBcInZpc2libGVcIn0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIGNvbXB1dGVkOntcclxuICAgICAgICBnZXRUb3RhbDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICB2YXIgdCA9IHRvdGFsZXM7XHJcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMuZGF0YV9jaWVycmU7XHJcbiAgICAgICAgICB2YXIgc3VtYSA9IHN1bWFyKFt0LnRvdGFsMSx0LnRvdGFsNSx0LnRvdGFsMTAsIHQudG90YWwyMCwgdC50b3RhbDI1LCB0LnRvdGFsNTAsIHQudG90YWwxMDAsIHQudG90YWwyMDAsIHQudG90YWw1MDAsIHQudG90YWwxMDAwLCB0LnRvdGFsMjAwMF0pO1xyXG4gICAgICAgICAgdGhpcy5zdW1hID0gc3VtYTtcclxuICAgICAgICAgIHNlbGYuZWZlY3Rpdm9fY2FqYSA9IHN1bWEudG9GaXhlZCgyKTtcclxuICAgICAgICAgIHNlbGYudG90YWxfZGVzY3VhZHJlID0gcGFyc2VGbG9hdCgtc2VsZi5wYWdvc19lZmVjdGl2bykgKyBwYXJzZUZsb2F0KHNlbGYuZWZlY3Rpdm9fY2FqYSk7XHJcbiAgICAgICAgICBzZWxmLmJhbmNvID0gcGFyc2VGbG9hdChzZWxmLnBhZ29zX2JhbmNvKSArIHBhcnNlRmxvYXQoc2VsZi5wYWdvc19lZmVjdGl2bykgLSBwYXJzZUZsb2F0KHNlbGYudG90YWxfZ2FzdG9zKSArIHBhcnNlRmxvYXQoc2VsZi50b3RhbF9kZXNjdWFkcmUpXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5zdW1hO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRlY2ltYWxzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIGZpZWxkcyA9IFtcInBhZ29zX2ZhY3R1cmFzXCIsXCJwYWdvc19leHRyYVwiLFwicGFnb3NfZWZlY3Rpdm9cIixcInBhZ29zX2JhbmNvXCIsXCJ0b3RhbF9pbmdyZXNvc1wiLFwiZWZlY3Rpdm9fY2FqYVwiLFwidG90YWxfZGVzY3VhZHJlXCIsXCJ0b3RhbF9nYXN0b1wiLFwiYmFuY29cIl07XHJcbiAgICAgICAgICBmaWVsZHMuZm9yRWFjaChmdW5jdGlvbihmaWVsZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFfY2llcnJlW2ZpZWxkXSA9IHRoaXMuZGF0YV9jaWVycmVbZmllbGRdLnRvRml4ZWQoMilcclxuICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICB3aW5kb3cuYXBwQ2llcnJlID0gYXBwQ2llcnJlO1xyXG4gICAgZnVuY3Rpb24gc3VtYXIgKHZhbG9yZXMpe1xyXG4gICAgICB2YXIgc3VtYSA9IDA7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsb3Jlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHN1bWEgKz0gcGFyc2VGbG9hdCh2YWxvcmVzW2ldKTsgXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN1bWE7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm93KCl7XHJcbiAgICAgIHJldHVybiBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgVnVlLmNvbXBvbmVudCgnc3VtbWFyeS1wcmludC12aWV3Jyx7XHJcbiAgICB0ZW1wbGF0ZTogJ1xcXHJcbiAgICA8ZGl2IGNsYXNzPVwicHJpbnQtY29udGFpbmVyXCI+XFxcclxuICAgICAgPGRpdiBjbGFzcz1cIl9faGVhZGVyXCI+XFxcclxuICAgICAgPGgyIGNsYXNzPVwiX190aXRsZSB0LWNlbnRlclwiPiB7e3RpdGxlfX08L2gyPlxcXHJcbiAgICAgIDwvZGl2PlxcXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJfX2JvZHlcIj5cXFxyXG4gICAgICA8cHJpbnRlYWJsZT48L3ByaW50ZWFibGU+XFxcclxuICAgICAgPC9kaXY+XFxcclxuICAgIDxkaXY+XFxcclxuICAgIFxcXHJcbiAgICAnLFxyXG4gICAgcHJvcHM6Wydzb21ldmFsdWUnXSxcclxuICAgIG1ldGhvZHM6e1xyXG4gICAgICBnb0JhY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYXBwU3VtbWFyeVZpZXcuaXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICB3aW5kb3cuYXBwQ2llcnJlLmlzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuaXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICAkKFwiLnRvcC1uYXZcIikucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAkKFwiI2FwcC1jaWVycmVcIikucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhdGE6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYmFjazoge2xpbms6XCJzb21lbGlua1wiLHRleHQ6XCJ2b2x2ZXIgYSBjaWVycmVcIn0sXHJcbiAgICAgICAgZm93YXJkOiB7bGluazogQkFTRV9VUkwgKyBcImFwcC9sb2dvdXRcIix0ZXh0OlwiY2VycmFyIHNlc3Npb25cIn0sXHJcbiAgICAgICAgdGl0bGU6XCJSZXN1bWVuIGRlIGNpZXJyZSBkZSBob3lcIixcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICB2YXIgYXBwU3VtbWFyeVZpZXcgPSBuZXcgVnVlKHtcclxuICAgIGVsOiBcIiNwcmludC12aWV3XCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGlzSGlkZTogdHJ1ZSxcclxuICAgICAgYmFjazoge2xpbms6XCJzb21lbGlua1wiLHRleHQ6XCJ2b2x2ZXIgYSBjaWVycmVcIn0sXHJcbiAgICAgIGZvd2FyZDoge2xpbms6IEJBU0VfVVJMICsgXCJhcHAvbG9nb3V0XCIsdGV4dDpcImNlcnJhciBzZXNzaW9uXCJ9LFxyXG4gICAgICBjaWVycmU6e1xyXG4gICAgICAgICAgYXV0b3I6ICcnLFxyXG4gICAgICAgICAgcGFnb3NfZmFjdHVyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19leHRyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19lZmVjdGl2bzogMCxcclxuICAgICAgICAgIHBhZ29zX2JhbmNvOiAwLFxyXG4gICAgICAgICAgdG90YWxfaW5ncmVzb3M6IDAsXHJcbiAgICAgICAgICBlZmVjdGl2b19jYWphOiAwLFxyXG4gICAgICAgICAgdG90YWxfZGVzY3VhZHJlOiAwLFxyXG4gICAgICAgICAgdG90YWxfZ2FzdG9zOiAwLFxyXG4gICAgICAgICAgYmFuY286IDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZmlsdGVyczoge1xyXG4gICAgICBjdXJyZW5jeUZvcm1hdDogZnVuY3Rpb24obnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gXCJSRCQgXCIrIEN1cnJlbmN5Rm9ybWF0KG51bWJlcik7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBzcGFuaXNoRGF0ZUZvcm1hdDogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgbW9tZW50LmxvY2FsZSgnZXMtRE8nKTtcclxuICAgICAgICByZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdCgnZGRkZCBERCBbZGVdIE1NTU0gW2RlbF0gWVlZWScpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOntcclxuICAgICAgZ29CYWNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGFwcFN1bW1hcnlWaWV3LmlzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgd2luZG93LmFwcENpZXJyZS5pc0hpZGUgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLmlzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgJChcIi50b3AtbmF2XCIpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgJChcIiNhcHAtY2llcnJlXCIpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHByaW50OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHByaW50KClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pIiwidmFyIGxpc3RFeHRyYXMgPSAnJztcclxudmFyIHJlY2lib1Jlc2V0ID0ge1xyXG4gIGlkX3BhZ286IDAsXHJcbiAgaWRfY29udHJhdG86IDAsXHJcbiAgaWRfc2VydmljaW86IDAsXHJcbiAgaWRfZW1wbGVhZG86IDAsXHJcbiAgZmVjaGFfcGFnbyA6ICcnLFxyXG4gIGNvbmNlcHRvIDogJ2V4dHJhJyxcclxuICBkZXRhbGxlc19leHRyYSA6ICcnLFxyXG4gIGN1b3RhOiAnJyxcclxuICBtb3JhIDogJycsXHJcbiAgbW9udG9fZXh0cmE6ICcnLFxyXG4gIHRvdGFsOiAnJyxcclxuICBlc3RhZG86ICcnLFxyXG4gIGZlY2hhX2xpbWl0ZTogJycsXHJcbiAgY29tcGxldGVfZGF0ZSA6ICcnLFxyXG4gIGRlc2N1ZW50bzogJycsXHJcbiAgcmF6b25fZGVzY3VlbnRvOiAnJyxcclxuICBkZXVkYTogJycsXHJcbiAgYWJvbm9fYTogJycsXHJcbiAgdGlwbzogJycsXHJcbiAgZ2VuZXJhZG86ICcnXHJcbn1cclxuXHJcbnZhciBhcHBQYWdvRXh0cmEgPSBuZXcgVnVlKHtcclxuICBlbDogXCIjYXBwLXBhZ28tZXh0cmFcIixcclxuICBkYXRhOiB7XHJcbiAgICByZWNpYm86e1xyXG4gICAgICAgaWRfcGFnbzogMCxcclxuICAgICAgIGlkX2NvbnRyYXRvOiAwLFxyXG4gICAgICAgaWRfc2VydmljaW86IDAsXHJcbiAgICAgICBpZF9lbXBsZWFkbzogMCxcclxuICAgICAgIGZlY2hhX3BhZ28gOiAnZGQvbW0veXl5eScsXHJcbiAgICAgICBjb25jZXB0byA6ICdleHRyYScsXHJcbiAgICAgICBkZXRhbGxlc19leHRyYSA6ICcnLFxyXG4gICAgICAgY3VvdGE6ICcnLFxyXG4gICAgICAgbW9yYSA6ICcnLFxyXG4gICAgICAgbW9udG9fZXh0cmE6ICcnLFxyXG4gICAgICAgdG90YWw6ICcnLFxyXG4gICAgICAgZXN0YWRvOiAnJyxcclxuICAgICAgIGZlY2hhX2xpbWl0ZTogJycsXHJcbiAgICAgICBjb21wbGV0ZV9kYXRlIDogJycsXHJcbiAgICAgICBkZXNjdWVudG86ICcnLFxyXG4gICAgICAgcmF6b25fZGVzY3VlbnRvOiAnJyxcclxuICAgICAgIGRldWRhOiAnJyxcclxuICAgICAgIGFib25vX2E6ICcnLFxyXG4gICAgICAgdGlwbzogJycsXHJcbiAgICAgICBnZW5lcmFkbzogJydcclxuICAgIH0sXHJcblxyXG4gICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICBleHRyYTp7XHJcbiAgICAgIFwiY29udHJvbHNcIjogJycsXHJcbiAgICAgIFwiaWRfZXh0cmFcIjogJycsXHJcbiAgICAgIFwiaWRfc2VydmljaW9cIjogJycsXHJcbiAgICAgIFwiY2hlY2tib3hcIjogJycsXHJcbiAgICAgIFwiZmVjaGFcIjogJycsXHJcbiAgICAgIFwiY29uY2VwdG9cIjogJycsXHJcbiAgICAgIFwidWx0aW1vX3BhZ29cIjogJycsXHJcbiAgICAgIFwibW9udG9fcGFnYWRvXCI6ICcnLFxyXG4gICAgICBcIm1vbnRvX3RvdGFsXCI6ICcnLFxyXG4gICAgICBcImVzdGFkb1wiOiAnJ1xyXG4gICAgfSxcclxuICAgIGZpcnN0Q29udHJvbHM6IHtcclxuICAgICAgaGlkZTogZmFsc2VcclxuICAgIH0sXHJcbiAgfSxcclxuICBmaWx0ZXJzOiB7XHJcblxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIHVybF9yZWNpYm86IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIEJBU0VfVVJMICsgJ3Byb2Nlc3MvZ2V0cmVjaWJvLycgKyB0aGlzLnJlY2liby5pZF9wYWdvO1xyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlX3JlY2libzogZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZih0aGlzLnJlY2liby5lc3RhZG8gPT0gXCJwYWdhZG9cIil7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgIHJldHVybiB0aGlzLmhpZGVfcmVjaWJvID0gdHJ1ZTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbWV0aG9kczp7XHJcblxyXG4gICAgZ29CYWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGV4dHJhVGFibGUuZWwucGFyZW50cyhcIi5ib290c3RyYXAtdGFibGVcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICB0aGlzLnZpc2libGUgPSBmYWxzZVxyXG4gICAgICB0aGlzLmV4dHJhID0ge2NvbmNlcHRvOiAnJ31cclxuICAgICAgZXh0cmFUYWJsZS5yZWZyZXNoKGxpc3RFeHRyYXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZVBheW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGZvcm0gPSAnZGF0YT0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5leHRyYSk7XHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnZXh0cmEvZ2VuZXJhdGVfZXh0cmFfcGF5bWVudCcsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgICBzZWxlY3RFeHRyYVBheW1lbnQuaHRtbChkYXRhLnBhZ29zKS5jaGFuZ2UoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICBcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UGF5bWVudDogZnVuY3Rpb24gKGlkX3BhZ28pIHtcclxuICAgICAgdmFyIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeSh7aWRfcGFnbzogaWRfcGFnb30pO1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdleHRyYS9nZXRfcGF5bWVudCcsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEgXHJcbiAgICAgICAgaWYoZGF0YS5yZWNpYm8pe1xyXG4gICAgICAgICAgc2VsZi5yZWNpYm8gPSBkYXRhLnJlY2lib1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXBwbHlQYXltZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICB2YXIgcmVjaWJvID0gdGhpcy5yZWNpYm9cclxuICAgICAgdmFyIGluZm8gPSB7XHJcbiAgICAgICAgaWRfZXh0cmE6IHJlY2liby5pZF9leHRyYSxcclxuICAgICAgICBpZF9wYWdvOiByZWNpYm8uaWRfcGFnb1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICBjb25jZXB0bzogJ2V4dHJhIC0nLCBcclxuICAgICAgICBkZXRhbGxlc19leHRyYTogcmVjaWJvLmRldGFsbGVzX2V4dHJhLFxyXG4gICAgICAgIGZlY2hhX3BhZ286IHJlY2liby5mZWNoYV9wYWdvLFxyXG4gICAgICAgIGN1b3RhOiByZWNpYm8uY3VvdGEsXHJcbiAgICAgICAgdG90YWw6IHJlY2liby5jdW90YSxcclxuICAgICAgICBlc3RhZG86ICdwYWdhZG8nLFxyXG4gICAgICAgIHRpcG86IHJlY2liby50aXBvLFxyXG4gICAgICAgIGdlbmVyYWRvOiB0cnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZGF0YSkgKyAnJmluZm89JysgSlNPTi5zdHJpbmdpZnkoaW5mbylcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2V4dHJhL2FwcGx5X3BheW1lbnQnLGZvcm0pXHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgIGxpc3RFeHRyYXMgPSBkYXRhLmV4dHJhcztcclxuICAgICAgICBzZWxmLmdldFBheW1lbnRzKHNlbGYuZXh0cmEuaWRfZXh0cmEpO1xyXG4gICAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGdldFBheW1lbnRzOiBmdW5jdGlvbiAoaWRfZXh0cmEpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICB2YXIgZm9ybSA9IFwiZGF0YT1cIisgSlNPTi5zdHJpbmdpZnkoe2lkX2V4dHJhOiBpZF9leHRyYX0pXHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdleHRyYS9nZXRfZXh0cmFfcGF5bWVudF9vZicsIGZvcm0pXHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgICAgaWYoIWRhdGEucGFnb3Mpe1xyXG4gICAgICAgICAgc2VsZi5yZWNpYm8gPSByZWNpYm9SZXNldFxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxlY3RFeHRyYVBheW1lbnQuaHRtbChkYXRhLnBhZ29zKS5jaGFuZ2UoKVxyXG5cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlUGF5bWVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgIHZhciByZWNpYm8gPSB0aGlzLnJlY2lib1xyXG4gICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAnaWRfZXh0cmEnOiByZWNpYm8uaWRfZXh0cmEsXHJcbiAgICAgICAgJ2lkX3BhZ28nOiByZWNpYm8uaWRfcGFnb1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdleHRyYS9kZWxldGVfcGF5bWVudCcsZm9ybSlcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgICBzZWxmLmdldFBheW1lbnRzKHNlbGYuZXh0cmEuaWRfZXh0cmEpO1xyXG4gICAgICB9KVxyXG4gICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbmJ1cy4kb24oJ3Jvdy1zZWxlY3RlZCcsZnVuY3Rpb24gKHJvdykge1xyXG4gIGV4dHJhVGFibGUuZWwucGFyZW50cyhcIi5ib290c3RyYXAtdGFibGVcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gIGFwcFBhZ29FeHRyYS52aXNpYmxlID0gdHJ1ZVxyXG4gIGFwcFBhZ29FeHRyYS5leHRyYSA9IHJvd1xyXG4gIGxpc3RFeHRyYXMgPSBleHRyYVRhYmxlLmVsLmZpbmQoJ3Rib2R5JykuaHRtbCgpO1xyXG4gIGFwcFBhZ29FeHRyYS5nZXRQYXltZW50cyhyb3cuaWRfZXh0cmEpO1xyXG59KVxyXG5cclxudmFyIHNlbGVjdEV4dHJhUGF5bWVudCA9ICQoXCIjc2VsZWN0LWV4dHJhLXBheW1lbnRcIik7XHJcbnNlbGVjdEV4dHJhUGF5bWVudC5vbignY2hhbmdlJyxmdW5jdGlvbigpe1xyXG4gIHZhciBpZF9wYWdvID0gc2VsZWN0RXh0cmFQYXltZW50LnZhbCgpXHJcbiAgYXBwUGFnb0V4dHJhLmdldFBheW1lbnQoaWRfcGFnbylcclxufSkiXX0=
