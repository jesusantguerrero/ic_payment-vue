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
      case "cuenta":
        acountHandlers();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbHMuanMiLCJmdW5jdGlvbnMuanMiLCJiYXNlLmpzIiwiY29udHJvbGxlcnMuanMiLCJhamF4LmpzIiwiYWpheDIuanMiLCJjaWVycmVDYWphLmpzIiwiZXh0cmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2paQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzNkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDemtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImZvb3QyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBCQVNFX1VSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBcIi9cIjtcclxuaWYoQkFTRV9VUkwuaW5jbHVkZXMoXCJsb2NhbGhvc3RcIikgfHwgQkFTRV9VUkwuaW5jbHVkZXMoJ25ncm9rLmlvJykpe1xyXG4gIEJBU0VfVVJMICs9ICdpY3BheW1lbnQvJztcclxufVxyXG5cclxudmFyIE1FU1NBR0VfU1VDQ0VTUyA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZG9uZV9hbGw8L2k+JztcclxudmFyIE1FU1NBR0VfRVJST1IgICA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZXJyb3Jfb3V0bGluZTwvaT4nO1xyXG52YXIgTUVTU0FHRV9JTkZPICAgID0gJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5pbmZvX291dGxpbmU8L2k+JztcclxudmFyIFNVTU1FUl9TS1kgICAgICA9ICcjMUZBMUQwJ1xyXG52YXIgYnVzQXZlcmlhICAgICAgID0gbmV3IFZ1ZSgpO1xyXG5cclxuLyoqXHJcbiAqIENvbm5lY3QgQW5kIFNlbmRcclxuICogQ29uZWN0YSBhbCBzZXJ2aWRvciB2aWEgYWpheCB5IG11ZXN0cmEgZWwgbWVuc2FqZSBkZSByZXNwdWVzdGFcclxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVcmwgYSBkb25kZSBzZSB2YSBhIG1hbmRhciBsYSBlbCBmb3JtdWxhcmlvLCBzaW4gbGEgYmFzZV91cmxcclxuICogQHBhcmFtIHtib29sZWFufSBpc19tZXNzYWdlIFNpIHNlIGVzcGVyYSB1biBtZW5zYWplIG8gbm8gY29tbyByZXNwdWVzdGEgXHJcbiAqIEBwYXJhbSB7Y2FsbGJhY2t9IHJlY29nbml6ZUVsZW1lbnRzIEZ1bmNpb24gcGFyYSByZWNvbm9jZXIgbG9zIGVsZW1lbnRvcyBhdXRvZ2VuZXJhZG9zXHJcbiAqIEBwYXJhbSB7P2NhbGxiYWNrfSBhY3Rpb24gY2FsbGJhY2sgcXVlIHJlY2liZSBsb3MgZGF0b3MgZGVzZGUgZWwgc2Vydmlkb3IgcGFyYSBoYWNlciBhbGdvIGNvbiBlbGxvc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybSBmb3JtdWxhcmlvIGEgc2VyIGVudmlhZG8gYWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtjYWxsYmFja30gY2FsbGJhY2sgZnVuY2lvbiBhIHNlciBlamVjdXRhZGEgZGVzcHVlcyBxdWUgdG9kbyBzZSBjdW1wbGEsIGNvbW8gZ2V0IHVzZXJzXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGxvYWRpbmcgZnVuY3Rpb24gZm9yIGxvYWRpbmdcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBjb25uZWN0QW5kU2VuZCh1cmwsaXNfbWVzc2FnZSxyZWNvZ25pemVFbGVtZW50cyxhY3Rpb24sZm9ybSxjYWxsYmFjayxsb2FkaW5nKXtcclxuICBpZighbG9hZGluZykgbG9hZGluZyA9IGxpbmVMb2FkXHJcbiAgdmFyIGNvbm5lY3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPyBuZXcgWE1MSHR0cFJlcXVlc3QoKSA6IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyBcclxuICAgIGNvbm5lY3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNvbm5lY3QucmVhZHlTdGF0ZSA9PSA0ICYmIGNvbm5lY3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYobG9hZGluZylsb2FkaW5nKHRydWUpO1xyXG4gICAgICAgICAgaWYgKGFjdGlvbiAhPSBudWxsKSAge1xyXG4gICAgICAgICAgICAgIGFjdGlvbihjb25uZWN0LnJlc3BvbnNlVGV4dCxyZWNvZ25pemVFbGVtZW50cyk7ICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoaXNfbWVzc2FnZSl7XHJcbiAgICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoY29ubmVjdC5yZXNwb25zZVRleHQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihjYWxsYmFjayAhPSBudWxsKWNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgZWxzZSBpZiAoY29ubmVjdC5yZWFkeVN0YXRlICE9IDQpIHtcclxuICAgICAgICAgIGlmKGxvYWRpbmcpbG9hZGluZyhmYWxzZSk7ICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3Qub3BlbihcIlBPU1RcIixCQVNFX1VSTCArIHVybCwgdHJ1ZSk7XHJcbiAgICBjb25uZWN0LnNldFJlcXVlc3RIZWFkZXIoXCJjb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICBjb25uZWN0LnNlbmQoZm9ybSk7XHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogICAgICAgICBGdW5jaW9uZXMgZGUgbWVuc2FqZXMgeSBub3RpZmljYWNpb25lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vKipcclxuICogRGlzcGxheSBNZXNzYWdlXHJcbiAqIE11ZXN0cmEgdW5hIG5vdGlmaWNhY2lvbiBkZWwgcmVzdWx0YWRvIGRlIGxhIGNvbnN1bHRhXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIHN0cmluZyB0byBiZSBkaXNwbGF5ZWQgXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZGlzcGxheU1lc3NhZ2UobWVzc2FnZSl7XHJcbiAgdmFyIGNvbG9yID0gXCJyZ2JhKDEwMiwxODcsMTA2LDEpXCI7XHJcbiAgdmFyIHRvYXN0LHNwYW47XHJcblxyXG4gICAgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0VSUk9SKSl7XHJcbiAgICAgIGNvbG9yID0gXCJyZ2JhKDI0NCw2Nyw1NCwxKVwiO1xyXG4gICAgfWVsc2UgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0lORk8pKXtcclxuICAgICAgY29sb3IgPSBcInJnYmEoMiwxMzYsMjA5LDEpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgPSAkKFwiLnRvYXN0XCIpXHJcbiAgICBzcGFuID0gdG9hc3QuZmluZChcInNwYW5cIikuaHRtbChtZXNzYWdlKTtcclxuICAgIHNwYW4uY3NzKHtiYWNrZ3JvdW5kOmNvbG9yfSk7XHJcbiAgICB0b2FzdC5jc3Moe2Rpc3BsYXk6XCJmbGV4XCJ9KTtcclxuICAgIFxyXG4gICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjFcIn0sNTAwLGZ1bmN0aW9uKCl7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjBcIn0pO1xyXG4gICAgICAgIHRvYXN0LmNzcyh7ZGlzcGxheTpcIm5vbmVcIn0pO1xyXG4gICAgICB9LCAyMDAwKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5QWxlcnQodGl0bGUsbWVzc2FnZSx0eXBlKXtcclxuICBpZighdGl0bGUpIHRpdGxlID0gXCJSZXZpc2VcIjtcclxuICBpZighbWVzc2FnZSkgbWVzc2FnZSA9IFwiQXNlZ3VyYXRlIGRlIGxsZW5hciB0b2RvcyBsb3MgY2FtcG9zXCJcclxuICBpZighdHlwZSkgdHlwZSA9IFwiZXJyb3JcIlxyXG4gIHN3YWwoe1xyXG4gICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIHRleHQ6IG1lc3NhZ2UsXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bicsXHJcbiAgICAgIGJ1dHRvbnNTdHlsaW5nOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICBmdWNuaW9uZXMgcGFyYSBMbGVuYXIgdGFibGFzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogTGxlbmEgbGEgdGFibGEgYWN0dWFsIGNvbiBsb3MgZGF0b3MgcXVlIHZpZW5lbiBkZWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtzdHJpbmd9ICRjb250ZW50IEVsIGh0bWwgY29uIGxvcyBkYXRvcyBhIHNlciBtb3N0cmFkb3MsIHZpZW5lbiBzaWVtcHJlIGRlc2RlIGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEVsIGNhbGxiYWNrIHBhcmEgcmVjb25vY2VyIGEgbG9zIG51ZXZvcyBpdGVtc1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZnVuY3Rpb24gZmlsbEN1cnJlbnRUYWJsZSgkY29udGVudCxjYWxsYmFjayx0YWJsZUlEKXtcclxuICB2YXIgJHRhYmxlXHJcbiAgJChcImh0bWxcIikucmVtb3ZlQ2xhc3MoXCJncl9faWNwYXltZW50LXNvZnRfY29tXCIpXHJcbiAgaWYodGFibGVJRCAhPSB1bmRlZmluZWQpe1xyXG4gICAgJHRhYmxlID0gJCgnIycrdGFibGVJRCArIFwiIHRib2R5XCIpO1xyXG4gIH1lbHNle1xyXG4gICAgJHRhYmxlID0gJCgnW2NsYXNzKj1cInQtXCJdIHRib2R5Jyk7XHJcbiAgfVxyXG4gICR0YWJsZS5odG1sKCRjb250ZW50KTtcclxuICBpZihjYWxsYmFjaykgY2FsbGJhY2soKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExsZW5hIGxhIHRhYmxhIGNsaWVudGVzIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2xpZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2spe1xyXG4gIGZpbGxDdXJyZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2ssXCJ0LWNsaWVudHNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMbGVuYSBsYSB0YWJsYSBjYWphIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2FqYVRhYmxlKCRjb250ZW50LGNhbGxiYWNrKXtcclxuICBmaWxsQ3VycmVudFRhYmxlKCRjb250ZW50LGNhbGxiYWNrLFwiY2FqYVwiKTtcclxuICBpZihjYWxsYmFjayljYWxsYmFjaygpO1xyXG59XHJcbi8qKlxyXG4gKiBMbGVuYSBsYSBMaXN0YSBkZSBwYWdvcy9ub3RpZmljYWNpb25lcyBjb24gbG9zIGRhdG9zIHF1ZSB2aWVuZW4gZGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSAkY29udGVudCBFbCBodG1sIGNvbiBsb3MgZGF0b3MgYSBzZXIgbW9zdHJhZG9zLCB2aWVuZW4gc2llbXByZSBkZXNkZSBlbCBzZXJ2aWRvclxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBFbCBjYWxsYmFjayBwYXJhIHJlY29ub2NlciBhIGxvcyBudWV2b3MgaXRlbXNcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBmaWxsUGF5bWVudHNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIubGlzdC1uZXh0cGF5bWVudHNcIik7XHJcbiAgJGNvbnRhaW5lci5odG1sKCRjb250ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbEF2ZXJpYXNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIjYXZlcmlhcy1saXN0XCIpO1xyXG4gICRjb250YWluZXIuaHRtbCgkY29udGVudCk7XHJcbiAgYnVzQXZlcmlhLiRlbWl0KCd0aWNrZXRzLWxpc3RlZCcsMSk7XHJcbiAgY2FsbGJhY2soKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbGxJbnN0YWxsYXRpb25zTGlzdCgkY29udGVudCxjYWxsYmFjayl7XHJcbiAgdmFyICRjb250YWluZXIgPSAkKFwiI2luc3RhbGxhdGlvbnMtbGlzdFwiKTtcclxuICAkY29udGFpbmVyLmh0bWwoJGNvbnRlbnQpO1xyXG4gIGNhbGxiYWNrKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VDb250cmFjdExpc3QocmVzcG9uc2UsY2FsbGJhY2spe1xyXG4gIGlmKHJlc3BvbnNlICE9IFwibmFkYVwiKXtcclxuICAgIHZhciBjb250cmFjdHMgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcclxuICAgIHZhciB2YWx1ZSxzZXJ2aWNlLGVxdWlwbWVudCxlTWFjLHJvdXRlcixyTWFjLGNvZGU7XHJcbiAgICB2YXIgc2VsZWN0Q29udHJhY3QgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKTtcclxuICAgIHZhciBlbGVtZW50ID0gXCI8b3B0aW9uIHZhbHVlPScnPi0tU2VsZWNjaW9uYS0tPC9vcHRpb24+XCI7XHJcbiAgICB2YXIgY2xpZW50ZSA9IGNvbnRyYWN0cy5jbGllbnRlO1xyXG4gICAgdmFyIGNvbnRyYWN0SWQgPSAnJ1xyXG4gICAgaWYoY3VycmVudFBhZ2UgIT0gJ2RldGFsbGVzJyAmJiBjdXJyZW50UGFnZSAhPSAnaG9tZScpe1xyXG4gICAgICBjb250cmFjdElkID0gY29udHJhY3RUYWJsZS5nZXRJZCgpO1xyXG4gICAgfWVsc2UgaWYoIGN1cnJlbnRQYWdlICE9ICdob21lJyl7XHJcbiAgICAgIGNvbnRyYWN0SWQgPSBkZXRhaWxzQ29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpLmlkX2NvbnRyYXRvXHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250cmFjdHMuY29udHJhdG9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhbHVlICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJpZF9jb250cmF0b1wiXTtcclxuICAgICAgc2VydmljZSAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcInNlcnZpY2lvXCJdO1xyXG4gICAgICBlcXVpcG1lbnQgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wibm9tYnJlX2VxdWlwb1wiXTtcclxuICAgICAgcm91dGVyICAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcInJvdXRlclwiXTtcclxuICAgICAgZU1hYyAgICAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcIm1hY19lcXVpcG9cIl07XHJcbiAgICAgIHJNYWMgICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJtYWNfcm91dGVyXCJdO1xyXG4gICAgICBjb2RlICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJjb2RpZ29cIl07XHJcbiAgICAgIGVsZW1lbnQgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIiArIHZhbHVlICsgXCInIGRhdGEtc2VydmljZT0nXCIrc2VydmljZStcIicgIGRhdGEtZXF1aXBtZW50PSdcIitlcXVpcG1lbnQrXCInICBkYXRhLWUtbWFjPSdcIitlTWFjK1wiJ1wiO1xyXG4gICAgICBlbGVtZW50ICs9IFwiIGRhdGEtcm91dGVyPSdcIityb3V0ZXIrXCInICBkYXRhLXItbWFjPSdcIityTWFjK1wiJyBkYXRhLWNvZGU9J1wiK2NvZGUrXCInPlwiO1xyXG4gICAgICBlbGVtZW50ICs9IHZhbHVlICtcIjwvb3B0aW9uPlwiOyAgXHJcbiAgICB9XHJcbiAgICBzZWxlY3RDb250cmFjdC5odG1sKGVsZW1lbnQpO1xyXG4gICAgc2VsZWN0Q29udHJhY3QudmFsKGNvbnRyYWN0SWQpLmNoYW5nZSgpO1xyXG4gICAgJChcIiNleHRyYS1jbGllbnQtbmFtZVwiKS52YWwoY2xpZW50ZVsnbm9tYnJlcyddICsgXCIgXCIgKyBjbGllbnRlWydhcGVsbGlkb3MnXSk7XHJcblxyXG4gIH1lbHNle1xyXG4gICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArIFwiIEVzdGUgY2xpZW50ZSBubyBleGlzdGUgcmV2aXNlIHN1IGNlZHVsYSBwb3IgZmF2b3JcIik7XHJcbiAgfSBcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJUYm9keShvYmplY0lkKXtcclxuICAkKG9iamVjSWQpLmh0bWwoXCJcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VQYXltZW50TGlzdChyZXNwb25zZSxjYWxsYmFjayl7XHJcbiAgdmFyIHNlbGVjdFBheVVudGlsID0gJCgnI3NlbGVjdC1wYXktdW50aWwnKTtcclxuICBzZWxlY3RQYXlVbnRpbC5odG1sKHJlc3BvbnNlKTtcclxuICBzZWxlY3RQYXlVbnRpbC5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gIHNlbGVjdFBheVVudGlsLmNoYW5nZSgpO1xyXG4gIGlmKGNhbGxiYWNrKWNhbGxiYWNrKCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogaXNFbXB0eVxyXG4gKiBWZXJpZmljYSBzaSBsb3MgdmFsb3JlcyBkYWRvcyBlc3RhbiB2YWNpb3MgbyBzb24gbnVsb3MgXHJcbiAqIEBwYXJhbSB7QXJyYXkuIDwgc3RyaW5nfSB2YWx1ZXNcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWVzLGlzX251bSl7XHJcbiAgZm9yKHZhciBpID0gMCA7IGkgPCB2YWx1ZXMubGVuZ3RoIDsgaSsrKXtcclxuICAgIGlmICh2YWx1ZXNbaV0gPT0gbnVsbCB8fCB2YWx1ZXNbaV0gPT0gXCJcIil7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2FsZG8obW9uZXkpe1xyXG4gIG1vbmV5ID0gXCJSRCQgXCIrIEN1cnJlbmN5Rm9ybWF0KG1vbmV5KVxyXG4gICQoXCIuY3VycmVudC1zYWxkb1wiKS50ZXh0KG1vbmV5KTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVDb3VudCgkY29udGVudCl7XHJcbiAgJChcIi50b3RhbC1yb3dzXCIpLmh0bWwoJGNvbnRlbnQpO1xyXG59XHJcbi8vICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcclxuLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlciBwYXNzd29yZHMgdmFsaWRhdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4vLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbi8vICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcclxuLy9cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTW9kYWwoJG1vZGFsSWQpe1xyXG4gIHZhciAkdXNlclBhc3N3b3JkID0gJCgkbW9kYWxJZCsnIC5wYXNzd29yZCcpO1xyXG4gIHZhciAkdXNlclBhc3N3b3JkQ29uZmlybSA9ICQoJG1vZGFsSWQrJyAucGFzc3dvcmQtY29uZmlybScpO1xyXG4gIHZhciAkc2F2ZUJ1dHRvbiA9ICQoJG1vZGFsSWQrJyAuc2F2ZScpO1xyXG4gIFxyXG4gICR1c2VyUGFzc3dvcmRDb25maXJtLm9uKCdibHVyIGtleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVUd28oJHVzZXJQYXNzd29yZCwkdXNlclBhc3N3b3JkQ29uZmlybSwkc2F2ZUJ1dHRvbik7XHJcbiAgfSk7XHJcbiAgJHNhdmVCdXR0b24ub24oJ2NsaWNrJyxjbGVhckZvcm0oJG1vZGFsSWQpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVUd28oJGZpcnN0T2JqZWN0LCRzZWNvbmRPYmplY3QsJGJ1dHRvbil7XHJcbiAgICBpZigkc2Vjb25kT2JqZWN0LnZhbCgpID09ICRmaXJzdE9iamVjdC52YWwoKSAmJiAkc2Vjb25kT2JqZWN0LnZhbCgpICE9IFwiXCIpe1xyXG4gICAgICByZXBsYWNlQ2xhc3MoJGZpcnN0T2JqZWN0LnBhcmVudCgpLFwiaGFzLWVycm9yXCIsXCJoYXMtc3VjY2Vzc1wiKTtcclxuICAgICAgcmVwbGFjZUNsYXNzKCRzZWNvbmRPYmplY3QucGFyZW50KCksXCJoYXMtZXJyb3JcIixcImhhcy1zdWNjZXNzXCIpO1xyXG4gICAgICAkYnV0dG9uLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiLFwiXCIpO1xyXG5cclxuICAgIH1lbHNle1xyXG4gICAgICAgcmVwbGFjZUNsYXNzKCRmaXJzdE9iamVjdC5wYXJlbnQoKSxcImhhcy1zdWNjZXNzXCIsXCJoYXMtZXJyb3JcIik7XHJcbiAgICAgICByZXBsYWNlQ2xhc3MoJHNlY29uZE9iamVjdC5wYXJlbnQoKSxcImhhcy1zdWNjZXNzXCIsXCJoYXMtZXJyb3JcIik7XHJcbiAgICAgICAkYnV0dG9uLmF0dHIoXCJkaXNhYmxlZFwiLFwiXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVRoaXMoKXtcclxuICB2YXIgJHVzZXJQYXNzd29yZCA9ICQoJy5wYXNzd29yZCcpO1xyXG4gIHZhciAkdXNlclBhc3N3b3JkQ29uZmlybSA9ICQoJy5wYXNzd29yZC1jb25maXJtJyk7XHJcbiAgdmFyICRzYXZlQnV0dG9uID0gJCgnLnNhdmUnKTtcclxuICBcclxuICAkdXNlclBhc3N3b3JkLm9uKCdibHVyIGtleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVUd28oJHVzZXJQYXNzd29yZCwkdXNlclBhc3N3b3JkQ29uZmlybSwkc2F2ZUJ1dHRvbik7XHJcbiAgfSk7XHJcbiAgJHVzZXJQYXNzd29yZENvbmZpcm0ub24oJ2JsdXIga2V5dXAnLGZ1bmN0aW9uKCl7XHJcbiAgICB2YWxpZGF0ZVR3bygkdXNlclBhc3N3b3JkLCR1c2VyUGFzc3dvcmRDb25maXJtLCRzYXZlQnV0dG9uKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJGb3JtKG1vZGFsSWQpe1xyXG4gICQobW9kYWxJZCArIFwiIGlucHV0XCIpLnZhbChcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBkZWxldGVWYWxpZGF0aW9uKCRpbnB1dEVsZW1lbnQsIHRleHQsICRidXR0b25Ub0FjdGl2ZSl7XHJcbiAgdmFyIGlubmVyVGV4dDtcclxuICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gIHZhciBzZWxmICA9IHRoaXM7XHJcbiAgdmFyIHdhcm5pbmcgPSAkKCcjY2FuY2VsLWNvbnRyYWN0LW1vZGFsIC5hbGVydCcpO1xyXG5cclxuICAkaW5wdXRFbGVtZW50Lm9uKFwia2V5dXBcIixmdW5jdGlvbihlKXtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBpbm5lclRleHQgPSAkKHRoaXMpLnZhbCgpIFxyXG4gICAgaWYoaW5uZXJUZXh0LnRvTG93ZXJDYXNlKCkgPT0gc2VsZi50ZXh0LnRvTG93ZXJDYXNlKCkpe1xyXG4gICAgICAkYnV0dG9uVG9BY3RpdmUucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICB3YXJuaW5nLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgJGJ1dHRvblRvQWN0aXZlLmF0dHIoXCJkaXNhYmxlZFwiLFwiXCIpO1xyXG4gICAgICB3YXJuaW5nLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdW5jaW9uZXMgZGUgdXRpbGVyaWEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbi8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vL1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJlcGxhY2VDbGFzcygkb2JqZWN0LG9sZENsYXNzLG5ld0NsYXNzKXtcclxuICAgJG9iamVjdC5hZGRDbGFzcyhuZXdDbGFzcyk7XHJcbiAgICRvYmplY3QucmVtb3ZlQ2xhc3Mob2xkQ2xhc3MpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VTZXJ2aWNlQ2FyZENsaWNrYWJsZSgpe1xyXG4gICAgdmFyIHNlcnZpY2VDYXJkICAgICAgPSAkKFwiLnNlcnZpY2UtY2FyZFwiKTtcclxuICAgIHZhciBidG5QcmludENvbnRyYWN0ID0gJCgnI2J0bi1wcmludC1yZXF1aXJlbWVudCcpO1xyXG5cclxuICAgIHNlcnZpY2VDYXJkLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciAkdGhpcyAgICAgICA9ICQodGhpcyk7XHJcbiAgICAgIHZhciBzZXJ2aWNlX2lkICA9ICR0aGlzLmF0dHIoJ2RhdGEtaWQnKTsgXHJcbiAgICAgIHZhciBwYXltZW50ICAgICA9ICR0aGlzLmF0dHIoJ2RhdGEtcGF5bWVudCcpO1xyXG4gICAgICB2YXIgcmVhbExpbmsgICAgPSBidG5QcmludENvbnRyYWN0LmF0dHIoJ2RhdGEtaHJlZicpXHJcbiAgICAgIFxyXG4gICAgICBzZXJ2aWNlQ2FyZC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgIGJ0blByaW50Q29udHJhY3QuYXR0cihcImhyZWZcIixyZWFsTGluayArIFwiL1wiICsgc2VydmljZV9pZCk7XHJcbiAgICAgICQoJyNjb250cmFjdC1jbGllbnQtcGF5bWVudCcpLnZhbChwYXltZW50KVxyXG4gICAgfSlcclxufVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgVmVyaWZ5IFJvd3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5mdW5jdGlvbiB2ZXJpZnlDb250cmFjdFN0YXR1cygpe1xyXG4gICQoXCIudGQtZXN0YWRvXCIpLmVhY2goZnVuY3Rpb24oaSx2YWx1ZSl7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdmFyIHRleHQgPSAkdGhpcy50ZXh0KCkudHJpbSgpO1xyXG4gICAgaWYodGV4dCA9PSBcImFjdGl2b1wiKXtcclxuICAgICAgJHRoaXMuY3NzKHtjb2xvcjpcImdyZWVuXCJ9KVxyXG4gICAgfWVsc2UgaWYodGV4dCA9PSBcInNhbGRhZG9cIil7XHJcbiAgICAgICR0aGlzLnBhcmVudHMoXCJ0clwiKS5jc3Moe2JhY2tncm91bmQ6XCJyZ2JhKDIyLDI1NSwwLC4zKVwiLGNvbG9yOlwiIzU1NVwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlcmlmeUNsaWVudFN0YXR1cygpe1xyXG4gICAkKFwidGRcIikuZWFjaChmdW5jdGlvbihpLHZhbHVlKXtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICB2YXIgdGV4dCA9ICR0aGlzLnRleHQoKS50cmltKCk7XHJcbiAgICBpZih0ZXh0ID09IFwibm8gYWN0aXZvXCIpe1xyXG4gICAgICAkdGhpcy5jc3Moe2NvbG9yOlwicmdiYSgyMDAsMCwwLC43KVwifSlcclxuICAgIH1lbHNlIGlmKHRleHQgPT0gXCJhY3Rpdm9cIil7XHJcbiAgICAgICR0aGlzLmNzcyh7Y29sb3I6XCJncmVlblwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICAgICAgICAgICAgICAgICBMb2FkZXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5mdW5jdGlvbiBoZWF2eUxvYWQoc3RvcCl7XHJcbiAgaWYoIXN0b3Ape1xyXG4gICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cImhlYXZ5LWxvYWRlciBhY3RpdmVcIj4nXHJcbiAgICAgICAgaHRtbCArPSAgICc8ZGl2IGNsYXNzPVwiY2lyY2xlLWxvYWRcIj48L2Rpdj4nXHJcbiAgICAgICAgaHRtbCArPSAgICc8ZGl2IGNsYXNzPVwibWVzc2FnZVwiPlByZXBhcmFuZG8gbG9zIGRhdG9zPC9kaXY+J1xyXG4gICAgICAgIGh0bWwgKz0gJzwvZGl2PidcclxuICAgICQoXCJib2R5XCIpLmFwcGVuZChodG1sKVxyXG4gICAgJChcImJvZHlcIikuY3NzKHtvdmVyZmxvdzpcImhpZGRlblwifSk7XHJcbiAgICB2YXIgbWVzc2FnZSA9ICQoXCIuaGVhdnktbG9hZGVyIC5tZXNzYWdlXCIpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBtZXNzYWdlLnRleHQoXCJDb25maWd1cmFuZG8uLi5cIik7XHJcbiAgICB9LDQwMDApXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIkNhc2kgVGVybWluYW1vcyAuLi5cIik7XHJcbiAgICB9LDgwMDApXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIlRlcm1pbmFuZG8gZWwgcHJvY2VzbyAuLi5cIik7XHJcbiAgICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gICAgfSwxNTAwMClcclxuICB9ZWxzZXtcclxuICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlTG9hZGVyKCl7XHJcbiAgICB2YXIgbG9hZGVyID0gJChcIi5oZWF2eS1sb2FkZXJcIik7XHJcbiAgICBsb2FkZXIucmVtb3ZlKCk7XHJcbiAgICAkKFwiYm9keVwiKS5jc3Moe292ZXJmbG93OlwiYXV0b1wifSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaW5lTG9hZChzdG9wKSB7XHJcbiAgaWYoIXN0b3Ape1xyXG4gICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxyXG4gICAgICB9KTtcclxuICB9ZWxzZXtcclxuICAgICQoXCIubG9hZGVyXCIpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcclxuICB9XHJcbn0iLCIvLyBmdW5jaW9uZXMgZGUgYm9vdHN0cmFwXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKClcclxufSk7XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVBhc3N3b3JkKHBhc3N3b3JkKXtcclxuICB2YXIgZXhwcmVzc2lvbiA9ICcnO1xyXG4gIHZhciBoYXNfbG93ZXJjYXNlID0gZmFsc2U7XHJcbiAgdmFyIGhhc191cHBlcmNhc2UgPSBmYWxzZTtcclxuICB2YXIgaGFzX2RpZ2l0ID0gJy8qXFxkJztcclxuXHJcbiAgaWYocGFzc3dvcmQubGVuZ3RoID4gOCkgYWxlcnQoXCJtYXlvciBhIDhcIilcclxuICBpZigvXFxkLy50ZXN0KHBhc3N3b3JkKSlhbGVydChcInRpZW5lIGRpZ2l0b1wiKVxyXG4gIGlmKC9bYS16XS8udGVzdChwYXNzd29yZCkpYWxlcnQoXCJ0aWVuZSBtaW5pc2N1bGFzXCIpXHJcbiAgaWYoL1tBLVpdLy50ZXN0KHBhc3N3b3JkKSkgYWxlcnQoJ3RpZW5lIG1heXVzY3VsYXMnKVxyXG59IiwiJChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGN1cnJlbnRQYWdlID0gJChcInRpdGxlXCIpLnRleHQoKS5zcGxpdChcIiBcIik7XHJcbiAgY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZVs0XS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICBcclxuICBpZiAoY3VycmVudFBhZ2UgPT0gXCJhZG1pbmlzdHJhZG9yXCIpIHtcclxuICAgIG5ld1VzZXJGb3JtKCk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRlKCk7XHJcbiAgYWRtaW5GdW5jdGlvbnMoKTtcclxuICB1c2VySW5mb1RpcCgpO1xyXG4gIG1ha2VTZXJ2aWNlQ2FyZENsaWNrYWJsZSgpO1xyXG4gIFxyXG4gIGlmIChjdXJyZW50UGFnZSA9PSBcImRldGFsbGVzXCIgfHwgY3VycmVudFBhZ2UgIT0gJ251ZXZvX2NvbnRyYXRvJykge1xyXG4gICAgZGV0YWlsc0Z1bmN0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgbm90aWZpY2F0aW9uRnVuY3Rpb25zKCk7XHJcbiAgbmV3Q29udHJhY3RGdW5jdGlvbnMoKTtcclxuICBjaGVja1dpbmRvd1NpemUoKTtcclxuICBcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNoZWNrV2luZG93U2l6ZSgpO1xyXG4gIH0pXHJcblxyXG4gIG9uV2luZG93TG9hZEZ1bmN0aW9ucygpO1xyXG4gIC8qKlxyXG4gICAqIEdldCBEYXRlOlxyXG4gICAqIE9idGllbmUgbGEgZmVjaGEgYWN0dWFsIGFsIHNlZ3VuZG8geSBsYSBtdWVzdHJhIGVuIGxhIHBhbnRhbGxhIGRlIGluaWNpb1xyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcclxuICAgIHZhciAkZGF5ID0gJCgnLmRheScpO1xyXG4gICAgdmFyICRtb250aFllYXIgPSAkKCcubW9udGgteWVhcicpO1xyXG4gICAgdmFyICRkYXlXZWVrID0gJCgnLmRheXdlZWsnKTtcclxuICAgIHZhciAkSG9yYSA9ICQoJy5ob3VyIHNwYW4nKTtcclxuICAgIHZhciBkYXRlLCBkYXksIG1vbnRoLCB5ZWFyLCBzSG91cjtcclxuICAgIHZhciBkYXlzID0gW1wiRG9taW5nb1wiLCBcIkx1bmVzXCIsIFwiTWFydGVzXCIsIFwiTWllcmNvbGVzXCIsIFwiSnVldmVzXCIsIFwiVmllcm5lc1wiLCBcIlNhYmFkb1wiXTtcclxuICAgIHZhciBtb250aHMgPSBbXCJFbmVyb1wiLCBcIkZlYnJlcm9cIiwgXCJNYXJ6b1wiLCBcIkFicmlsXCIsIFwiTWF5b1wiLCBcIkp1bmlvXCIsIFwiSnVsaW9cIiwgXCJBZ29zdG9cIiwgXCJTZXB0aWVtYnJlXCIsIFwiT2N0dWJyZVwiLCBcIk5vdmllbWJyZVwiLCBcIkRpY2llbWJyZVwiXTtcclxuXHJcbiAgICBzZXRJbnRlcnZhbCh1cGRhdGVIb3VyLCAxMDAwKTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVIb3VyKCkge1xyXG4gICAgICBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgc0RhdGUgPSBkYXRlLnRvU3RyaW5nKClcclxuICAgICAgJGRheS50ZXh0KGRhdGUuZ2V0RGF0ZSgpKTtcclxuICAgICAgJG1vbnRoWWVhci50ZXh0KFwiRGUgXCIgKyBtb250aHNbZGF0ZS5nZXRNb250aCgpXSArIFwiIGRlIFwiICsgZGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgJGRheVdlZWsudGV4dChkYXlzW2RhdGUuZ2V0RGF5KCldKTtcclxuXHJcbiAgICAgIHNIb3VyID0gbW9tZW50KCkuZm9ybWF0KCdMVFMnKTtcclxuICAgICAgJEhvcmEuaHRtbChzSG91cik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZG1pbiBGdW5jdGlvbnM6XHJcbiAgICogc2UgZW5jYXJnYSBkZSBlbCBtb3ZpbWllbnRvIGRlIGxvcyBwYW5lbGVzIGVuIGxhIHBhbnRhbGxhICdhZG1pbmlzdHJhZG9yJ1xyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXHJcblxyXG4gIGZ1bmN0aW9uIGFkbWluRnVuY3Rpb25zKCkge1xyXG4gICAgJCgnI2NvbXBhbnktc2VjdGlvbicpLmFuaW1hdGUoe1xyXG4gICAgICBsZWZ0OiBcIjBcIlxyXG4gICAgfSwgMjAwKVxyXG4gICAgJCgnLmFkbWluaXN0cmFkb3IgLmFzaWRlLWJ1dHRvbnMgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgdmFyIGNhcmROYW1lID0gJHRoaXMuYXR0cignaHJlZicpLnNsaWNlKDEpO1xyXG4gICAgICBpZiAoY2FyZE5hbWUgIT0gbnVsbCkge1xyXG4gICAgICAgICQoJy5jb21wYW55LWRldGFpbHMnKS5hbmltYXRlKHtcclxuICAgICAgICAgIGxlZnQ6IFwiLTExMCVcIlxyXG4gICAgICAgIH0sIDIwMClcclxuICAgICAgICAkKCcjJyArIGNhcmROYW1lICsgJy5jb21wYW55LWRldGFpbHMnKS5hbmltYXRlKHtcclxuICAgICAgICAgIGxlZnQ6IFwiMFwiXHJcbiAgICAgICAgfSwgMjAwKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGlmICgkKFwiI2Fjb3VudC1zZWN0aW9uXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgJCgnI2Fjb3VudC1zZWN0aW9uJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgbGVmdDogXCIwXCJcclxuICAgICAgfSwgMjAwKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbmV3IFVzZXIgRm9ybTpcclxuICAgKiB2YWlkYSBsYXMgY29udHJhc2XDsWFzIGVuIGxvcyBmb3JtdWxhcmlvcyBkZSBsb3MgdXN1YXJpb3NcclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqL1xyXG5cclxuICBmdW5jdGlvbiBuZXdVc2VyRm9ybSgpIHtcclxuICAgIHZhbGlkYXRlTW9kYWwoXCIjbmV3LXVzZXItbW9kYWxcIik7XHJcbiAgICB2YWxpZGF0ZU1vZGFsKFwiI3VwZGF0ZS11c2VyLW1vZGFsXCIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlciBJbmZvIFRpcFxyXG4gICAqIGhhY2UgdW4gdG9nZ2xlIGVuIGxhIHZpc2liaWxpZGFkIGRlIGxhIGluZm8gZGVsIHVzdWFyaW9cclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqL1xyXG5cclxuICBmdW5jdGlvbiB1c2VySW5mb1RpcCgpIHtcclxuICAgIHZhciBpbmZvVGlwID0gJChcIi51c2VyLWluZm8tdGlwXCIpO1xyXG4gICAgdmFyIHByb2ZpbGVQaWN0dXJlID0gJChcIi5wcm9maWxlLXBpY3R1cmVcIik7XHJcbiAgICB2YXIgYnRuTW9yZSA9ICQoXCIuYnRuLW1vcmVcIik7XHJcblxyXG4gICAgYnRuTW9yZS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBpbmZvVGlwLnRvZ2dsZUNsYXNzKFwidmlzaWJsZVwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gbmV3Q29udHJhY3RGdW5jdGlvbnMoKSB7XHJcbiAgdmFyIGJ0blByaW50Q29udHJhY3QgPSAkKFwiI2J0bi1wcmludC1jb250cmFjdFwiKTtcclxuICB2YXIgZG9jdW1lbnQgPSAkKFwiLm5vdGUtaXRlbVwiKTtcclxuICB2YXIgcmFkaW9BY3RpdmF0ZUNvbnRyYWN0ID0gJChcIiNyYWRpby1uZXctY29udHJhY3RcIik7XHJcbiAgdmFyIHJhZGlvRGlzYWJsZUNvbnRyYWN0ID0gJChcIiNyYWRpby1qdXN0LXJlcXVpcmVtZW50XCIpO1xyXG4gIHZhciBjb250cmFjdENvbnRyb2xzID0gJChcIi5jb250cmFjdC1jb250cm9sc1wiKTtcclxuICB2YXIgcmVxdWlyZW1lbnRDb250cm9scyA9ICQoXCIucmVxdWlyZW1lbnQtY29udHJvbHNcIik7XHJcblxyXG4gIHJhZGlvQWN0aXZhdGVDb250cmFjdC5wYXJlbnRzKFwibGFiZWxcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgYWN0aXZhdGVDb250cmFjdE1vZGUoKTtcclxuXHJcbiAgfSk7XHJcblxyXG4gIHJhZGlvRGlzYWJsZUNvbnRyYWN0LnBhcmVudHMoXCJsYWJlbFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBkaXNhYmxlQ29udHJhY3RNb2RlKClcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gYWN0aXZhdGVDb250cmFjdE1vZGUoJGJ0bikge1xyXG4gICAgcmFkaW9EaXNhYmxlQ29udHJhY3RcclxuICAgICAgLnJlbW92ZUF0dHIoXCJjaGVja2VkXCIsIFwiXCIpXHJcbiAgICAgIC5odG1sKFwiXCIpXHJcbiAgICByYWRpb0FjdGl2YXRlQ29udHJhY3RcclxuICAgICAgLmF0dHIoXCJjaGVja2VkXCIsIFwiXCIpXHJcbiAgICAgIC5odG1sKFwiJiMxMDAwNDtcIilcclxuICAgIGRvY3VtZW50LnJlbW92ZUNsYXNzKFwicHJpbnQtcmVxdWlyZW1lbnRcIik7XHJcbiAgICBjb250cmFjdENvbnRyb2xzLnJlbW92ZUNsYXNzKFwiaGlkZVwiKVxyXG4gICAgcmVxdWlyZW1lbnRDb250cm9scy5hZGRDbGFzcyhcImhpZGVcIilcclxuXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkaXNhYmxlQ29udHJhY3RNb2RlKCRidG4pIHtcclxuICAgIHJhZGlvQWN0aXZhdGVDb250cmFjdFxyXG4gICAgICAucmVtb3ZlQXR0cihcImNoZWNrZWRcIiwgXCJcIilcclxuICAgICAgLmh0bWwoXCJcIilcclxuICAgIHJhZGlvRGlzYWJsZUNvbnRyYWN0XHJcbiAgICAgIC5hdHRyKFwiY2hlY2tlZFwiLCBcIlwiKVxyXG4gICAgICAuaHRtbChcIiYjMTAwMDQ7XCIpXHJcbiAgICBkb2N1bWVudC5hZGRDbGFzcyhcInByaW50LXJlcXVpcmVtZW50XCIpO1xyXG4gICAgcmVxdWlyZW1lbnRDb250cm9scy5yZW1vdmVDbGFzcyhcImhpZGVcIilcclxuICAgIGNvbnRyYWN0Q29udHJvbHMuYWRkQ2xhc3MoXCJoaWRlXCIpXHJcbiAgfVxyXG59XHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWxzIEZ1bmN0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuJCgnI3NlYXJjaC1jbGllbnQtbW9kYWwnKS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gIHZhciBidXR0b24gPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpO1xyXG4gIGNsaWVudFRhYmxlLmluaXQoKTtcclxuICB2YXIgdGl0bGUgPSBidXR0b24uZmluZCgnLnNlY3Rpb24tdGl0bGUnKS50ZXh0KCk7XHJcbiAgaWYgKCF0aXRsZSkgdGl0bGUgPSBcIkJ1c2NhciBDbGllbnRlXCJcclxuICBpZiAodGl0bGUudG9Mb3dlckNhc2UoKS50cmltKCkgPT0gXCJyZWdpc3RyYXIgcGFnb1wiKSB7XHJcbiAgICBidXR0b25UZXh0ID0gXCJpciBhIFBhZ29zXCJcclxuICB9IGVsc2Uge1xyXG4gICAgYnV0dG9uVGV4dCA9IFwiTnVldm8gQ29udHJhdG9cIlxyXG4gIH1cclxuXHJcbiAgdmFyIG1vZGFsID0gJCh0aGlzKVxyXG4gIG1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLnRleHQodGl0bGUpXHJcbiAgbW9kYWwuZmluZCgnLm1vZGFsLWZvb3RlciAuc2F2ZScpLnRleHQoYnV0dG9uVGV4dClcclxuICBtb2RhbC5maW5kKCd0Ym9keScpLmh0bWwoJycpXHJcbn0pXHJcblxyXG4kKCcjdXBkYXRlLWNvbnRyYWN0LW1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAkKFwiI3NlbGVjdC1jb250cmFjdC1zZWN0b3JcIikuY2hhbmdlKCk7XHJcbn0pXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogICAgICAgICAgICAgIG90aGVyIGZ1bmN0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgKiBcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5mdW5jdGlvbiBkZXRhaWxzRnVuY3Rpb25zKCkge1xyXG4gIHZhciBzbWFsbEJ1dHRvbnNTZWxlY3QgPSAkKCcuYnRuLXNtYWxsJyk7XHJcbiAgdmFyIHRhYnMgPSB7XHJcbiAgICBjb250cmFjdENvbnRyb2xzOiBbXCIjY29udHJhY3RzXCIsIFwiI21vbnRoLWFuZC1kYXRlXCIsIFwiI3JlY29ubmVjdC1zZXJ2aWNlXCIsICcjZXh0cmEtY29udHJhY3QnLCAnI2V4dHJhLXNlcnZpY2UnLCAnI2V4dHJhLWV4dGVuc2lvbicsICcjZXh0cmEtdXBncmFkZSddLFxyXG4gICAgcGF5bWVudENvbnRyb2xzOiBbXCIjcGF5bWVudHNcIiwgXCIjZGV0YWxsZXMtZGUtcGFnb1wiLCBcIiNkZXNjdWVudG9zXCJdXHJcbiAgfVxyXG5cclxuICAkKCdbcm9sZT1cInRhYlwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKVxyXG5cclxuICAgIGlmIChjb21wYXJlKGhyZWYsIHRhYnMucGF5bWVudENvbnRyb2xzKSkge1xyXG4gICAgICAkKFwiLnBheW1lbnQtY29udHJvbHNcIikuYWRkQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChcIi5wYXltZW50LWNvbnRyb2xzXCIpLnJlbW92ZUNsYXNzKFwidmlzaWJsZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29tcGFyZShocmVmLCB0YWJzLmNvbnRyYWN0Q29udHJvbHMpKSB7XHJcbiAgICAgICQoXCIuY29udHJhY3QtY29udHJvbHNcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKFwiLmNvbnRyYWN0LWNvbnRyb2xzXCIpLmFkZENsYXNzKFwiaGlkZVwiKVxyXG4gICAgfVxyXG4gICAgZ2V0VGFiQ29udHJvbHMoJCh0aGlzKSk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5idG4tc21hbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBzbWFsbEJ1dHRvbnNTZWxlY3QucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG4gIH0pXHJcblxyXG4gIGZ1bmN0aW9uIGNvbXBhcmUodmFsdWUsIHBvc2libGVWYWx1ZXMpIHtcclxuICAgIHZhciByZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgcG9zaWJsZVZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uICh0aGVWYWx1ZSkge1xyXG4gICAgICBpZiAodmFsdWUgPT0gdGhlVmFsdWUpIHtcclxuICAgICAgICByZXR1cm5WYWx1ZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRhYkNvbnRyb2xzKCR0aGlzKSB7XHJcbiAgdmFyIGNvbnRyb2xzID0gJHRoaXMuYXR0cihcImFyaWEtY29udHJvbHNcIik7XHJcbiAgJChcIi5keW5hbWljLWNvbnRyb2xzXCIpLnRleHQoY29udHJvbHMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBub3RpZmljYXRpb25GdW5jdGlvbnMoKSB7XHJcbiAgdmFyIGJ0bkF2ZXJpYXMgPSAkKFwiI2J0bi1zZWUtYXZlcmlhc1wiKTtcclxuICB2YXIgYnRuUGFnb3MgPSAkKFwiI2J0bi1zZWUtcGFnb3NcIik7XHJcbiAgdmFyIGJ0bkNhamFDaGljYSA9ICQoJyNidG4tc2VlLWNhamEnKTtcclxuICB2YXIgYnRuRGV1ZG9yZXMgPSAkKFwiI2J0bi1zZWUtZGV1ZG9yZXNcIilcclxuICB2YXIgYnRuRGF5SW5jb21lcyA9ICQoXCIjYnRuLXNlZS1kYXktaW5jb21lc1wiKVxyXG4gIHZhciBsYXlvdXRDb250YWluZXIgPSAkKFwiLmxheW91dC1jb250YWluZXJcIik7XHJcblxyXG4gIGJ0bkF2ZXJpYXMub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgbGF5b3V0Q29udGFpbmVyLmFuaW1hdGUoe1xyXG4gICAgICBsZWZ0OiBcIi0xMDAlXCJcclxuICAgIH0sIDIwMCk7XHJcbiAgfSk7XHJcblxyXG4gIGJ0blBhZ29zLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGxheW91dENvbnRhaW5lci5hbmltYXRlKHtcclxuICAgICAgbGVmdDogXCIwXCJcclxuICAgIH0sIDIwMCk7XHJcbiAgfSk7XHJcblxyXG4gIGJ0bkRldWRvcmVzLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGxheW91dENvbnRhaW5lci5hbmltYXRlKHtcclxuICAgICAgbGVmdDogXCItMjAwJVwiXHJcbiAgICB9LCAyMDApO1xyXG4gIH0pO1xyXG5cclxuICBidG5EYXlJbmNvbWVzLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGxheW91dENvbnRhaW5lci5hbmltYXRlKHtcclxuICAgICAgbGVmdDogXCItMzAwJVwiXHJcbiAgICB9LCAyMDApO1xyXG4gIH0pO1xyXG59XHJcblxyXG4kKFwiI3NlbGVjdC1leHRyYS1zZXJ2aWNlXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyICR0aGlzID0gJCgoXCIjc2VsZWN0LWV4dHJhLXNlcnZpY2UgOnNlbGVjdGVkXCIpKTtcclxuICB2YXIgY29zdCA9ICR0aGlzLmF0dHIoXCJkYXRhLXBheW1lbnRcIik7XHJcblxyXG4gICQoXCIjZXh0cmEtc2VydmljZS1jb3N0XCIpLnZhbChjb3N0KVxyXG59KTtcclxuXHJcbiQoXCIjZXh0cmEtY2xpZW50LWNvbnRyYWN0XCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyICR0aGlzID0gJCgoXCIjZXh0cmEtY2xpZW50LWNvbnRyYWN0IDpzZWxlY3RlZFwiKSk7XHJcblxyXG4gICQoXCIjZXh0cmEtY29udHJhY3Qtc2VydmljZVwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtc2VydmljZVwiKSk7XHJcbiAgJChcIiNleHRyYS1lcXVpcG9cIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWVxdWlwbWVudFwiKSk7XHJcbiAgJChcIiNleHRyYS1yb3V0ZXJcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLXJvdXRlclwiKSk7XHJcbiAgJChcIiNleHRyYS1lLW1hY1wiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtZS1tYWNcIikpO1xyXG4gICQoXCIjZXh0cmEtci1tYWNcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLXItbWFjXCIpKTtcclxuICAkKFwiI2V4dHJhLWNvZGVcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWNvZGVcIikpO1xyXG59KTtcclxuXHJcbiQoXCIuY29sdW1ucy1yaWdodFwiKS5yZW1vdmVDbGFzcyhcInB1bGwtcmlnaHRcIik7XHJcblxyXG4kKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyICR0aGlzID0gJCgoXCIjc2VsZWN0LWNvbnRyYWN0LWNvZGUgOnNlbGVjdGVkXCIpKTtcclxuICAkKFwiI2NvbnRyYWN0LWlwXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1pcC1maW5hbFwiKSk7XHJcbiAgJChcIiN1LWNvbnRyYWN0LWlwXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1pcC1maW5hbFwiKSk7XHJcblxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrV2luZG93U2l6ZSgpIHtcclxuICB2YXIgd2lkdGggPSB3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGg7XHJcbiAgdmFyIGJyYW5kTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5icmFuZCBzcGFuJyk7XHJcblxyXG4gIGlmICh3aWR0aCA8PSAxMTAwKSB7XHJcbiAgICBicmFuZE5hbWUudGV4dENvbnRlbnQgPSBcIlBcIjtcclxuICB9IGVsc2Uge1xyXG4gICAgYnJhbmROYW1lLnRleHRDb250ZW50ID0gXCJQYXltZW50XCI7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBvbldpbmRvd0xvYWRGdW5jdGlvbnMoKXtcclxuICAkKCdib2R5Jykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgIHBvc2l0aW9uID0gJCgnYm9keScpLnNjcm9sbFRvcCgpXHJcbiAgICBtb3ZhYmxlTmF2ID0gJCgnLmFzaWRlLW5hdi1jb250YWluZXIsIC5hc2lkZS13aWRlLWxlZnQnKVxyXG4gICAgaWYgKHBvc2l0aW9uID49IDUwKSB7XHJcbiAgICAgIGlmKCFtb3ZhYmxlTmF2Lmhhc0NsYXNzKCdtb3ZlZCcpKVxyXG4gICAgICAgIG1vdmFibGVOYXYuYWRkQ2xhc3MoJ21vdmVkJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1vdmFibGVOYXYucmVtb3ZlQ2xhc3MoJ21vdmVkJylcclxuICAgIH1cclxuICB9KVxyXG59XHJcbiIsInZhciBVc2VycyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBuaWNrLCBwYXNzd29yZCwgbmFtZSwgbGFzdG5hbWUsIGRuaSwgdHlwZSwgaXNfZW1wdHk7XHJcblxyXG4gICAgbmljayAgICAgID0gJChcIiN1c2VyLW5pY2tuYW1lXCIpLnZhbCgpO1xyXG4gICAgcGFzc3dvcmQgID0gJChcIiN1c2VyLXBhc3N3b3JkXCIpLnZhbCgpO1xyXG4gICAgbmFtZSAgICAgID0gJChcIiN1c2VyLW5hbWVcIikudmFsKCk7XHJcbiAgICBsYXN0bmFtZSAgPSAkKFwiI3VzZXItbGFzdG5hbWVcIikudmFsKCk7XHJcbiAgICBkbmkgICAgICAgPSBnZXRWYWwoJChcIiN1c2VyLWRuaVwiKSk7XHJcbiAgICB0eXBlICAgICAgPSAkKFwiI3VzZXItdHlwZVwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtuaWNrLCBwYXNzd29yZCwgbmFtZSwgbGFzdG5hbWUsIGRuaSwgdHlwZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ25pY2tuYW1lPScgKyBuaWNrICsgXCImcGFzc3dvcmQ9XCIgKyBwYXNzd29yZCArIFwiJm5hbWU9XCIgKyBuYW1lICsgXCImbGFzdG5hbWU9XCIgKyBsYXN0bmFtZTtcclxuICAgICAgZm9ybSArPSBcIiZkbmk9XCIgKyBkbmkgKyBcIiZ0eXBlPVwiICsgdHlwZTtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJ1c2VyL2FkZG5ld1wiLCB0cnVlLCBpbml0QWRtaW5IYW5kbGVycywgbnVsbCwgZm9ybSwgVXNlcnMuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgbmljaywgcGFzc3dvcmQsIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGU7XHJcblxyXG4gICAgbmljayAgICAgPSAkKFwiI2Utbmlja25hbWVcIikudmFsKCk7XHJcbiAgICBuYW1lICAgICA9ICQoXCIjZS1uYW1lXCIpLnZhbCgpO1xyXG4gICAgbGFzdG5hbWUgPSAkKFwiI2UtbGFzdG5hbWVcIikudmFsKCk7XHJcbiAgICBkbmkgICAgICA9ICQoXCIjZS1kbmlcIikudmFsKCk7XHJcbiAgICB0eXBlICAgICA9ICQoXCIjZS10eXBlXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW25pY2ssIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGVdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICduaWNrbmFtZT0nICsgbmljayArIFwiJm5hbWU9XCIgKyBuYW1lICsgXCImbGFzdG5hbWU9XCIgKyBsYXN0bmFtZTtcclxuICAgICAgZm9ybSArPSBcIiZkbmk9XCIgKyBkbmkgKyBcIiZ0eXBlPVwiICsgdHlwZTtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJ1c2VyL3VwZGF0ZVwiLCB0cnVlLCBpbml0QWRtaW5IYW5kbGVycywgbnVsbCwgZm9ybSwgVXNlcnMuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxlPXVzZXJzXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgndXNlci9nZXR1c2VycycsIGZhbHNlLCBpbml0QWRtaW5IYW5kbGVycywgdXNlclRhYmxlLnJlZnJlc2gsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIGRlbGV0ZTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidXNlcl9pZD1cIiArIGlkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3VzZXIvZGVsZXRldXNlcicsIHRydWUsIGluaXRBZG1pbkhhbmRsZXJzLCBudWxsLCBmb3JtLCBVc2Vycy5nZXRBbGwpO1xyXG4gIH0sXHJcblxyXG4gIGNvbmZpcm1QYXNzd29yZDogZnVuY3Rpb24odXNlcklkLGN1cnJlbnRQYXNzd29yZCkge1xyXG4gICAgdmFyIGZvcm0gPSAndXNlcl9pZD0nKyB1c2VySWQgKycmY3VycmVudF9wYXNzd29yZD0nICsgY3VycmVudFBhc3N3b3JkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3VzZXIvY29uZmlybV9wYXNzd29yZCcsIGZhbHNlLCBmYWxzZSwgcHJvY2Vzc0NvbmZpcm1EYXRhLCBmb3JtLCBudWxsLCBudWxsKTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0NvbmZpcm1EYXRhKHJlc3BvbnNlKSB7XHJcbiAgICAgIHZhciBuZXdQYXNzd29yZCAgICAgICAgID0gJChcIiNhY291bnQtbmV3LXBhc3N3b3JkXCIpO1xyXG4gICAgICB2YXIgbmV3UGFzc3dvcmRDb25maXJtICA9ICQoXCIjYWNvdW50LWNvbmZpcm0tbmV3LXBhc3N3b3JkXCIpO1xyXG4gICAgICBcclxuICAgICAgaWYgKHJlc3BvbnNlID09IDEpIHsgICAgICBcclxuICAgICAgICBuZXdQYXNzd29yZC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIG5ld1Bhc3N3b3JkQ29uZmlybS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHZhbGlkYXRlVGhpcygpO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBuZXdQYXNzd29yZC5hdHRyKCdkaXNhYmxlZCcsdHJ1ZSk7XHJcbiAgICAgICAgbmV3UGFzc3dvcmRDb25maXJtLmF0dHIoJ2Rpc2FibGVkJyx0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVBhc3N3b3JkOiBmdW5jdGlvbih1c2VySWQsY3VycmVudFBhc3N3b3JkLG5ld1Bhc3N3b3JkKXtcclxuICAgIHZhciBmb3JtID0gJ3VzZXJfaWQ9JysgdXNlcklkICArIFwiJmN1cnJlbnRfcGFzc3dvcmQ9XCIrIGN1cnJlbnRQYXNzd29yZCArJyZuZXdfcGFzc3dvcmQ9JyArIG5ld1Bhc3N3b3JkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3VzZXIvdXBkYXRlX3Bhc3N3b3JkJywgZmFsc2UsIGZhbHNlLCBVc2Vycy5wYXNzd29yZENoYW5nZWQsIGZvcm0sIG51bGwsaGVhdnlMb2FkKTtcclxuICB9LFxyXG5cclxuICBwYXNzd29yZENoYW5nZWQ6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgIGlmKHJlc3BvbnNlPT0xKXtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9TVUNDRVNTICsgJ0NvbnRyYXNlw7FhIENhbWJpYWRhIGNvbiBleGl0bycpXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IEJBU0VfVVJMICsgJ2FwcC9sb2dvdXQnXHJcbiAgICAgIH0sMzAwMCkgICAgICBcclxuICAgIH1lbHNle1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0VSUk9SICsgJyBFcnJvciBhbCBjYW1iaWFyIGRlIGNvbnRyYXNlw7FhLCByZXZpc2UgbGEgY29udHJhc2XDsWEgYWN0dWFsJylcclxuICAgIH1cclxuICAgICAgXHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ2xpZW50cyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICB2YXIgZm9ybSwgbm9tYnJlcywgYXBlbGxpZG9zLCBjZWR1bGEsIGNlbHVsYXIsIHByb3ZpbmNpYSwgc2VjdG9yLCBjYWxsZSwgY2FzYSwgdGVsZWZvbm8sXHJcbiAgICAgICBsdWdhclRyYWJham8sIHRlbFRyYWJham8sIGluZ3Jlc29zLCBmZWNoYVJlZ2lzdHJvLCBlc3RhZG87XHJcblxyXG4gICAgbm9tYnJlcyAgICAgICA9ICQoXCIjY2xpZW50LW5hbWVcIikudmFsKCk7XHJcbiAgICBhcGVsbGlkb3MgICAgID0gJChcIiNjbGllbnQtbGFzdG5hbWVcIikudmFsKCk7XHJcbiAgICBjZWR1bGEgICAgICAgID0gZ2V0VmFsKCQoXCIjY2xpZW50LWRuaVwiKSk7XHJcbiAgICBjZWx1bGFyICAgICAgID0gZ2V0VmFsKCQoXCIjY2xpZW50LXBob25lXCIpKTtcclxuICAgIHByb3ZpbmNpYSAgICAgPSAkKFwiI2NsaWVudC1wcm92aW5jaWFcIikudmFsKCk7XHJcbiAgICBzZWN0b3IgICAgICAgID0gJChcIiNjbGllbnQtc2VjdG9yXCIpLnZhbCgpO1xyXG4gICAgY2FsbGUgICAgICAgICA9ICQoXCIjY2xpZW50LXN0cmVldFwiKS52YWwoKTtcclxuICAgIGNhc2EgICAgICAgICAgPSAkKCcjY2xpZW50LWhvdXNlJykudmFsKCk7XHJcbiAgICB0ZWxlZm9ubyAgICAgID0gZ2V0VmFsKCQoJyNjbGllbnQtdGVsZXBob25lJykpO1xyXG4gICAgbHVnYXJUcmFiYWpvICA9ICQoJyNjbGllbnQtam9iJykudmFsKCk7XHJcbiAgICB0ZWxUcmFiYWpvICAgID0gZ2V0VmFsKCQoJyNjbGllbnQtam9iLXRlbGVwaG9uZScpKTtcclxuICAgIGluZ3Jlc29zICAgICAgPSAkKCcjY2xpZW50LXNhbGFyeScpLnZhbCgpO1xyXG4gICAgZmVjaGFSZWdpc3RybyA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7O1xyXG4gICAgZXN0YWRvICAgICAgICA9IFwibm8gYWN0aXZvXCI7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbbm9tYnJlcywgYXBlbGxpZG9zLCBjZWR1bGEsIGNlbHVsYXIsIHByb3ZpbmNpYSwgc2VjdG9yLCBjYWxsZSwgY2FzYSwgdGVsZWZvbm9dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdub21icmVzPScgKyBub21icmVzICsgXCImYXBlbGxpZG9zPVwiICsgYXBlbGxpZG9zICsgXCImY2VkdWxhPVwiICsgY2VkdWxhICsgXCImY2VsdWxhcj1cIiArIGNlbHVsYXI7XHJcbiAgICAgIGZvcm0gKz0gXCImcHJvdmluY2lhPVwiICsgcHJvdmluY2lhICsgXCImc2VjdG9yPVwiICsgc2VjdG9yICsgXCImY2FsbGU9XCIgKyBjYWxsZSArIFwiJmNhc2E9XCIgKyBjYXNhICsgXCImdGVsZWZvbm89XCIgKyB0ZWxlZm9ubztcclxuICAgICAgZm9ybSArPSBcIiZsdWdhcl90cmFiYWpvPVwiICsgbHVnYXJUcmFiYWpvICsgXCImdGVsX3RyYWJham89XCIgKyB0ZWxUcmFiYWpvICsgXCImaW5ncmVzb3M9XCIgKyBpbmdyZXNvcyArIFwiJmZlY2hhX3JlZ2lzdHJvPVwiICsgZmVjaGFSZWdpc3RybztcclxuICAgICAgZm9ybSArPSBcIiZlc3RhZG89XCIgKyBlc3RhZG8gKyBcIiZ0YWJsYT1jbGllbnRlc1wiO1xyXG5cclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2FkZFwiLCB0cnVlLCBpbml0Q2xpZW50SGFuZGxlcnMsIG51bGwsIGZvcm0sIENsaWVudHMuZ2V0QWxsKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNsaWVudGVzXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgaW5pdENsaWVudEhhbmRsZXJzLCBjbGllbnRUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBnZXRPbmU6IGZ1bmN0aW9uIChpZCwgcmVjZWl2ZXIpIHtcclxuICAgIGZvcm0gPSBcInRhYmxhPWNsaWVudGVzJmlkPVwiICsgaWQ7XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvZ2V0b25lXCIsIGZhbHNlLCBpbml0Q2xpZW50SGFuZGxlcnMsIHJlY2VpdmVyLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHJlY2VpdmVGb3JFZGl0OiBmdW5jdGlvbiAoY29udGVudCkge1xyXG4gICAgdmFyIGNsaWVudCAgICAgICAgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgdGhpcy5pZCAgICAgICAgICAgID0gY2xpZW50WydpZF9jbGllbnRlJ107XHJcbiAgICB2YXIgJG5vbWJyZXMgICAgICA9ICQoXCIjdS1jbGllbnQtbmFtZVwiKTtcclxuICAgIHZhciAkYXBlbGxpZG9zICAgID0gJChcIiN1LWNsaWVudC1sYXN0bmFtZVwiKTtcclxuICAgIHZhciAkY2VkdWxhICAgICAgID0gJChcIiN1LWNsaWVudC1kbmlcIik7XHJcbiAgICB2YXIgJGNlbHVsYXIgICAgICA9ICQoXCIjdS1jbGllbnQtcGhvbmVcIik7XHJcbiAgICB2YXIgJHByb3ZpbmNpYSAgICA9ICQoXCIjdS1jbGllbnQtcHJvdmluY2lhXCIpO1xyXG4gICAgdmFyICRzZWN0b3IgICAgICAgPSAkKFwiI3UtY2xpZW50LXNlY3RvclwiKTtcclxuICAgIHZhciAkY2FsbGUgICAgICAgID0gJChcIiN1LWNsaWVudC1zdHJlZXRcIik7XHJcbiAgICB2YXIgJGNhc2EgICAgICAgICA9ICQoJyN1LWNsaWVudC1ob3VzZScpO1xyXG4gICAgdmFyICR0ZWxlZm9ubyAgICAgPSAkKCcjdS1jbGllbnQtdGVsZXBob25lJyk7XHJcbiAgICB2YXIgJGx1Z2FyVHJhYmFqbyA9ICQoJyN1LWNsaWVudC1qb2InKTtcclxuICAgIHZhciAkdGVsVHJhYmFqbyAgID0gJCgnI3UtY2xpZW50LWpvYi10ZWxlcGhvbmUnKTtcclxuICAgIHZhciAkaW5ncmVzb3MgICAgID0gJCgnI3UtY2xpZW50LXNhbGFyeScpO1xyXG5cclxuICAgICRub21icmVzLnZhbChjbGllbnRbJ25vbWJyZXMnXSk7XHJcbiAgICAkYXBlbGxpZG9zLnZhbChjbGllbnRbJ2FwZWxsaWRvcyddKVxyXG4gICAgJGNlZHVsYS52YWwoY2xpZW50WydjZWR1bGEnXSlcclxuICAgICRjZWx1bGFyLnZhbChjbGllbnRbJ2NlbHVsYXInXSlcclxuICAgICRwcm92aW5jaWEudmFsKGNsaWVudFsncHJvdmluY2lhJ10pXHJcbiAgICAkc2VjdG9yLnZhbChjbGllbnRbJ3NlY3RvciddKVxyXG4gICAgJGNhbGxlLnZhbChjbGllbnRbJ2NhbGxlJ10pXHJcbiAgICAkY2FzYS52YWwoY2xpZW50WydjYXNhJ10pXHJcbiAgICAkdGVsZWZvbm8udmFsKGNsaWVudFsndGVsZWZvbm8nXSlcclxuICAgICRsdWdhclRyYWJham8udmFsKGNsaWVudFsnbHVnYXJfdHJhYmFqbyddKVxyXG4gICAgJHRlbFRyYWJham8udmFsKGNsaWVudFsndGVsX3RyYWJham8nXSlcclxuICAgICRpbmdyZXNvcy52YWwoY2xpZW50WydzYWxhcmlvJ10pXHJcblxyXG4gICAgJChcIiN1cGRhdGUtY2xpZW50LW1vZGFsXCIpLm1vZGFsKCk7XHJcbiAgICAkKFwiI2J0bi11cGRhdGUtY2xpZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdXBkYXRlQ2xpZW50KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDbGllbnQoKSB7XHJcbiAgICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoWyRub21icmVzLnZhbCgpLCAkYXBlbGxpZG9zLnZhbCgpLCAkY2VkdWxhLnZhbCgpLCAkY2VsdWxhci52YWwoKSwgJHByb3ZpbmNpYS52YWwoKSwgJHNlY3Rvci52YWwoKSwgJGNhbGxlLnZhbCgpLFxyXG4gICAgICAgICRjYXNhLnZhbCgpLCAkdGVsZWZvbm8udmFsKClcclxuICAgICAgXSk7XHJcblxyXG4gICAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgICAgZm9ybSA9ICdpZD0nICsgaWQgKyAnJm5vbWJyZXM9JyArICRub21icmVzLnZhbCgpICsgXCImYXBlbGxpZG9zPVwiICsgJGFwZWxsaWRvcy52YWwoKSArIFwiJmNlZHVsYT1cIiArIGdldFZhbCgkY2VkdWxhKTtcclxuICAgICAgICBmb3JtICs9IFwiJmNlbHVsYXI9XCIgKyBnZXRWYWwoJGNlbHVsYXIpICsgXCImcHJvdmluY2lhPVwiICsgJHByb3ZpbmNpYS52YWwoKSArIFwiJnNlY3Rvcj1cIiArICRzZWN0b3IudmFsKCkgKyBcIiZjYWxsZT1cIiArICRjYWxsZS52YWwoKTtcclxuICAgICAgICBmb3JtICs9IFwiJmNhc2E9XCIgKyAkY2FzYS52YWwoKSArIFwiJnRlbGVmb25vPVwiICsgZ2V0VmFsKCR0ZWxlZm9ubykgKyBcIiZsdWdhcl90cmFiYWpvPVwiICsgJGx1Z2FyVHJhYmFqby52YWwoKSArIFwiJnRlbF90cmFiYWpvID1cIjtcclxuICAgICAgICBmb3JtICs9IGdldFZhbCgkdGVsVHJhYmFqbykgKyBcIiZ0YWJsYT1jbGllbnRlc1wiO1xyXG4gICAgICAgIGZvcm0gKz0gXCImaW5ncmVzb3M9XCIgKyAkaW5ncmVzb3MudmFsKCk7XHJcblxyXG4gICAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgaW5pdENsaWVudEhhbmRsZXJzLCBudWxsLCBmb3JtLCBDbGllbnRzLmdldEFsbCk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzYXZlT2JzZXJ2YXRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgb2JzZXJ2YXRpb25zLGlkQ2xpZW50ZTtcclxuIFxyXG4gICAgb2JzZXJ2YXRpb25zID0gJChcIiN0ZXh0LW9ic2VydmF0aW9uc1wiKS52YWwoKTtcclxuICAgIGlkQ2xpZW50ZSAgICA9ICQoXCIjZGV0YWlsLWNsaWVudC1pZFwiKS52YWwoKTtcclxuIFxyXG4gICAgZm9ybSA9ICdvYnNlcnZhY2lvbmVzPScgKyBvYnNlcnZhdGlvbnMgKyBcIiZ0YWJsYT1vYnNlcnZhY2lvbmVzJmlkX2NsaWVudGU9XCIgKyBpZENsaWVudGU7XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwpXHJcbiAgfSxcclxuICBcclxuICB1cGRhdGVTdGF0ZTogZnVuY3Rpb24gKGNsaWVudCkge1xyXG4gICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGNsaWVudCkrICcmbW9kdWxlPWNsaWVudGVzJmFjdGlvbj11cGRhdGUnO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRqc29uJyx0cnVlLG51bGwsbnVsbCxmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBHZW5lcmFscyA9IHtcclxuICBkZWxldGVSb3c6IGZ1bmN0aW9uIChpZCwgdGFibGEpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1cIiArIHRhYmxhICsgXCImaWQ9XCIgKyBpZDtcclxuICAgIHZhciBoYW5kbGVycywgY2FsbGJhY2s7XHJcbiAgICBzd2l0Y2ggKHRhYmxhKSB7XHJcbiAgICAgIGNhc2UgJ2NsaWVudGVzJzpcclxuICAgICAgICBjYWxsYmFjayA9IENsaWVudHMuZ2V0QWxsO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzZXJ2aWNpb3MnOlxyXG4gICAgICAgIGNhbGxiYWNrID0gU2VydmljZXMuZ2V0QWxsO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZGVsZXRlJywgdHJ1ZSxudWxsLCBudWxsLCBmb3JtLCBjYWxsYmFjayk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBTZWFyY2ggbWFuZGEgdW4gbWVuc2FqZSBhbCBzZXJ2aWRvciBkZSBsb3MgdmFsb3JlcyBhIGJ1c2NhclxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IGVsIHZhbG9yIGEgc2VyIGJ1c2NhZG9cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGJUYWJsZSBub21icmUgZGUgbGEgdGFibGEgZG9uZGUgc2UgZGVzZWEgY29uc3VsdGFyIGVuIGxhIGJhc2UgZGUgZGF0b3NcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmaWxsVGFibGVGdW5jdGlvbiBmdW5jaW9uIGRlIGxsZW5hZG8gZGUgdGFibGEgZG9uZGUgc2UgbW9zdHJhcmFuIGxvcyByZXN1bHRhZG9zIFxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXJGdW5jdGlvbiBmdW5jaW9uIHJlaW5pY2lvIGRlIGxvcyBlbGVtZW50b3MgZW4gbG9zIGhhbmRsZXJzIFxyXG4gICAqL1xyXG4gIFxyXG4gIHNlYXJjaDogZnVuY3Rpb24gKHRleHQsIGRiVGFibGUsIGZpbGxUYWJsZUZ1bmN0aW9uLCBoYW5kbGVyRnVuY3Rpb24pIHtcclxuICAgIGlmIChoYW5kbGVyRnVuY3Rpb24gPT0gdW5kZWZpbmVkKSBoYW5kbGVyRnVuY3Rpb24gPSBpbml0Q2xpZW50SGFuZGxlcnM7XHJcbiAgICBpZiAoZmlsbFRhYmxlRnVuY3Rpb24gPT0gdW5kZWZpbmVkKSBmaWxsVGFibGVGdW5jdGlvbiA9IGZpbGxDdXJyZW50VGFibGU7XHJcbiAgICB2YXIgd29yZCA9IHRleHQ7XHJcbiAgICBpZiAod29yZCAhPSBudWxsIHx8IHdvcmQgIT0gXCJcIikge1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9XCIgKyBkYlRhYmxlICsgXCImd29yZD1cIiArIHdvcmQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3NlYXJjaCcsIGZhbHNlLCBoYW5kbGVyRnVuY3Rpb24sIGZpbGxUYWJsZUZ1bmN0aW9uLCBmb3JtLCBudWxsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjb3VudF90YWJsZTogZnVuY3Rpb24gKHRhYmxlKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9XCIgKyB0YWJsZTtcclxuICAgIHZhciB1cGRhdGVGdW5jdGlvbiA9IHVwZGF0ZUNvdW50O1xyXG4gICAgaWYgKHRhYmxlID09ICdjYWphJykgdXBkYXRlRnVuY3Rpb24gPSB1cGRhdGVDYWphQ291bnRcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2NvdW50JywgZmFsc2UsIG51bGwsIHVwZGF0ZUZ1bmN0aW9uLCBmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBTZXJ2aWNlcyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBuYW1lLCBkZXNjcmlwdGlvbiwgcGF5bWVudCwgdHlwZTtcclxuXHJcbiAgICBuYW1lICAgICAgICA9ICQoXCIjc2VydmljZS1uYW1lXCIpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKFwiI3NlcnZpY2UtZGVzY3JpcHRpb25cIikudmFsKCk7XHJcbiAgICBwYXltZW50ICAgICA9ICQoXCIjc2VydmljZS1tb250aGx5LXBheW1lbnRcIikudmFsKCk7XHJcbiAgICB0eXBlICAgICAgICA9ICQoXCIjc2VydmljZS10eXBlXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW25hbWUsIGRlc2NyaXB0aW9uLCBwYXltZW50LCB0eXBlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbm9tYnJlPScgKyBuYW1lICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbiArIFwiJm1lbnN1YWxpZGFkPVwiICsgcGF5bWVudCArIFwiJnRpcG89XCIgKyB0eXBlO1xyXG4gICAgICBmb3JtICs9IFwiJnRhYmxhPXNlcnZpY2lvc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvYWRkXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFNlcnZpY2VzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPXNlcnZpY2lvc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIHNlcnZpY2VUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBpZCwgbmFtZSwgZGVzY3JpcHRpb24sIHBheW1lbnQsIHR5cGU7XHJcblxyXG4gICAgaWQgICAgICAgICAgPSAkKCcjdS1zZXJ2aWNlLWlkJykudmFsKCk7XHJcbiAgICBuYW1lICAgICAgICA9ICQoJyN1LXNlcnZpY2UtbmFtZScpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKCcjdS1zZXJ2aWNlLWRlc2NyaXB0aW9uJykudmFsKCk7XHJcbiAgICBwYXltZW50ICAgICA9ICQoJyN1LXNlcnZpY2UtbW9udGhseS1wYXltZW50JykudmFsKCk7XHJcbiAgICB0eXBlICAgICAgICA9ICQoJyN1LXNlcnZpY2UtdHlwZScpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2lkLCBuYW1lLCBkZXNjcmlwdGlvbiwgcGF5bWVudCwgdHlwZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX3NlcnZpY2lvPScgKyBpZCArIFwiJm5vbWJyZT1cIiArIG5hbWUgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uICsgXCImbWVuc3VhbGlkYWQ9XCIgKyBwYXltZW50O1xyXG4gICAgICBmb3JtICs9IFwiJnRpcG89XCIgKyB0eXBlICsgXCImdGFibGE9c2VydmljaW9zXCI7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgU2VydmljZXMuZ2V0QWxsLGhlYXZ5TG9hZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxudmFyIENvbnRyYWN0cyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uIGFkZE5ld0NvbnRyYWN0KCkge1xyXG4gICAgdmFyIGZvcm0sIHRhYmxlLCBjbGllbnRfaWQsIHVzZXJfaWQsIHNlcnZpY2VfaWQsIGNvZGUsIGNvbnRyYWN0X2RhdGUsIHBheW1lbnQsIGR1cmF0aW9uLFxyXG4gICAgICBlcXVpcG1lbnQsIGVNYWMsIHJvdXRlciwgck1hYywgdG90YWwsIG5leHRQYXltZW50LCBtb2RlbCwgaXA7XHJcblxyXG4gICAgY2xpZW50X2lkICAgICA9ICQoXCIjY29udHJhY3QtY2xpZW50LWlkXCIpLnZhbCgpO1xyXG4gICAgdXNlcl9pZCAgICAgICA9ICQoXCIjY29udHJhY3QtdXNlci1pZFwiKS52YWwoKTtcclxuICAgIHNlcnZpY2VfaWQgICAgPSAkKFwiLnNlcnZpY2UtY2FyZC5zZWxlY3RlZFwiKS5hdHRyKCdkYXRhLWlkJyk7XHJcbiAgICBjb250cmFjdF9kYXRlID0gJCgnI2NvbnRyYWN0LWNsaWVudC1kYXRlJykudmFsKCk7XHJcbiAgICBkdXJhdGlvbiAgICAgID0gJCgnI2NvbnRyYWN0LWNsaWVudC1tb250aHMnKS52YWwoKTtcclxuICAgIGVxdWlwbWVudCAgICAgPSAkKCcjY29udHJhY3QtZXF1aXBtZW50JykudmFsKCk7XHJcbiAgICBlTWFjICAgICAgICAgID0gJCgnI2NvbnRyYWN0LWUtbWFjJykudmFsKCk7XHJcbiAgICByb3V0ZXIgICAgICAgID0gJCgnI2NvbnRyYWN0LXJvdXRlcicpLnZhbCgpO1xyXG4gICAgck1hYyAgICAgICAgICA9ICQoJyNjb250cmFjdC1yLW1hYycpLnZhbCgpO1xyXG4gICAgbW9kZWwgICAgICAgICA9ICQoJyNjb250cmFjdC1lcXVpcG1lbnQtbW9kZWwnKS52YWwoKTtcclxuICAgIGlwICAgICAgICAgICAgPSAkKCcjY29udHJhY3QtaXAnKS52YWwoKTtcclxuICAgIGNvZGUgICAgICAgICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpLnZhbCgpO1xyXG5cclxuICAgIHBheW1lbnQgPSAkKFwiI2NvbnRyYWN0LWNsaWVudC1wYXltZW50XCIpLnZhbCgpO1xyXG4gICAgbmV4dFBheW1lbnQgPSBtb21lbnQoY29udHJhY3RfZGF0ZSkuYWRkKDEsICdtb250aHMnKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtjbGllbnRfaWQsIHVzZXJfaWQsIHNlcnZpY2VfaWQsIGNvbnRyYWN0X2RhdGUsIGR1cmF0aW9uXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIHRvdGFsID0gKE51bWJlcihkdXJhdGlvbikgKyAxKSAqIE51bWJlcihwYXltZW50KTtcclxuICAgICAgZm9ybSA9ICdpZF9lbXBsZWFkbz0nICsgdXNlcl9pZCArIFwiJmlkX2NsaWVudGU9XCIgKyBjbGllbnRfaWQgKyBcIiZpZF9zZXJ2aWNpbz1cIiArIHNlcnZpY2VfaWQgKyBcIiZjb2RpZ289XCIgKyBjb2RlICsgXCImZmVjaGE9XCIgKyBjb250cmFjdF9kYXRlO1xyXG4gICAgICBmb3JtICs9IFwiJmR1cmFjaW9uPVwiICsgZHVyYXRpb24gKyBcIiZtb250b190b3RhbD1cIiArIHRvdGFsICsgXCImbW9udG9fcGFnYWRvPTAmdWx0aW1vX3BhZ289bnVsbFwiO1xyXG4gICAgICBmb3JtICs9IFwiJm1lbnN1YWxpZGFkPVwiICsgcGF5bWVudCArIFwiJnByb3hpbW9fcGFnbz1cIiArIG5leHRQYXltZW50ICsgXCImZXN0YWRvPWFjdGl2byZ0YWJsYT1jb250cmF0b3NcIjtcclxuICAgICAgZm9ybSArPSBcIiZub21icmVfZXF1aXBvPVwiICsgZXF1aXBtZW50ICsgXCImbWFjX2VxdWlwbz1cIiArIGVNYWMgKyBcIiZyb3V0ZXI9XCIgKyByb3V0ZXIgKyBcIiZtYWNfcm91dGVyPVwiICsgck1hYztcclxuICAgICAgZm9ybSArPSBcIiZtb2RlbG89XCIgKyBtb2RlbCArIFwiJmlwPVwiICsgaXA7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9hZGRcIiwgbnVsbCwgbnVsbCwgQ29udHJhY3RzLmdldExhc3QsIGZvcm0sIG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNvbnRyYXRvc1wiO1xyXG4gICAgdmFyIGNhbGxiYWNrID0gbnVsbFxyXG4gICAgdmFyIHJlZnJlc2ggPSBjb250cmFjdFRhYmxlLnJlZnJlc2g7XHJcbiAgICBpZiAoY29udHJhY3RUYWJsZS5lbCA9PSAnZGV0YWxsZXMnKSB7XHJcbiAgICAgIGNhbGxiYWNrID0gUGF5bWVudHMuZ2V0QWxsKClcclxuICAgICAgcmVmcmVzaCA9IG51bGxcclxuICAgIH1cclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCByZWZyZXNoLCBmb3JtLCBjYWxsYmFjayk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0TGFzdDogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAkKFwiI2J0bi1zYXZlLWNvbnRyYWN0XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgICQoXCIjYnRuLXByaW50LWNvbnRyYWN0XCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgIGlmKGRhdGEudGFibGFfcGFnb3Mpe1xyXG4gICAgICBtYWtlUGF5bWVudExpc3QoZGF0YS50YWJsYV9wYWdvcyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY2FsbEV4dHJhOiBmdW5jdGlvbihjb250ZXh0KSB7XHJcbiAgICB2YXIgcm93XHJcbiAgICBpZiAoY29udGV4dCA9PSBcImRldGFpbHNcIil7XHJcbiAgICAgIHJvdyA9IGRldGFpbHNDb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcm93ID0gY29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAocm93KSB7XHJcbiAgICAgICQoXCIjZXh0cmEtY2xpZW50LWRuaVwiKS52YWwocm93LmNlZHVsYSk7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRBbGxPZkNsaWVudChyb3cuY2VkdWxhKTtcclxuICAgICAgJCgnI2FkZC1leHRyYS1tb2RhbCcpLm1vZGFsKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiU2VsZWNjaW9uZSBlbCBjb25yYXRvIHByaW1lcm9cIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjYW5jZWw6IGZ1bmN0aW9uKHJvdyxjYWxsYmFjaykge1xyXG4gICAgdmFyIGlzX3BlbmFsdHkgPSBmYWxzZTtcclxuICAgIHZhciByZWFzb24gICAgID0gJChcIiNjYW5jZWxhdGlvbi1yZWFzb25cIikudmFsKCk7XHJcbiAgICB2YXIgY2hlY2tlZCAgICA9ICQoXCIjY2hlY2stcGVuYWx0eTpjaGVja2VkXCIpLmxlbmd0aDtcclxuICAgIHZhciBmb3JtLCBmZWNoYTtcclxuICAgIGNvbnNvbGUubG9nKHJvdylcclxuICAgIGlmKHJvdy5pZCl7XHJcbiAgICAgIGlmIChjaGVja2VkID4gMCkge1xyXG4gICAgICAgIGlzX3BlbmFsdHkgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGZlY2hhID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgcm93LmlkICsgJyZmZWNoYT0nICsgZmVjaGEgKyAnJmlkX2NsaWVudGU9JyArIHJvdy5pZF9jbGllbnRlO1xyXG4gICAgICBmb3JtICs9IFwiJm1vdGl2bz1cIiArIHJlYXNvbiArIFwiJnBlbmFsaWRhZD1cIiArIGlzX3BlbmFsdHk7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2NhbmNlbCcsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIGNhbGxiYWNrKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0VSUk9SICtcIiBObyBoYXkgY29udHJhdG8gc2VsZWNjaW9uYWRvXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldE9uZTogZnVuY3Rpb24oaWRfY29udHJhdG8sIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1jb250cmF0b3MmaWRfY29udHJhdG89XCIgKyBpZF9jb250cmF0bztcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRvbmVcIiwgZmFsc2UsIG51bGwsIHJlY2VpdmVyLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHJlY2lldmU6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgIHZhciBjb250cmFjdCAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB0aGlzLmlkX2NvbnRyYXRvID0gY29udHJhY3RbJ2lkX2NvbnRyYXRvJ107XHJcbiAgICB2YXIgJGVxdWlwbyAgICAgPSAkKFwiI3UtY29udHJhY3QtZXF1aXBtZW50XCIpO1xyXG4gICAgdmFyICRtYWNFcXVpcG8gID0gJChcIiN1LWNvbnRyYWN0LWUtbWFjXCIpO1xyXG4gICAgdmFyICRyb3V0ZXIgICAgID0gJChcIiN1LWNvbnRyYWN0LXJvdXRlclwiKTtcclxuICAgIHZhciAkbWFjUm91dGVyICA9ICQoXCIjdS1jb250cmFjdC1yLW1hY1wiKTtcclxuICAgIHZhciAkbW9kZWxvICAgICA9ICQoXCIjdS1jb250cmFjdC1tb2RlbG9cIik7XHJcbiAgICB2YXIgJGNvZGlnbyAgICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpO1xyXG4gICAgdmFyICRpc0NoYW5nZUlwID0gJChcIiNjaGVjay1jaGFuZ2UtaXBcIik7XHJcbiAgICB2YXIgJGlwICAgICAgICAgPSAkKFwiI3UtY29udHJhY3QtaXBcIik7XHJcblxyXG4gICAgJGVxdWlwby52YWwoY29udHJhY3RbJ25vbWJyZV9lcXVpcG8nXSk7XHJcbiAgICAkbWFjRXF1aXBvLnZhbChjb250cmFjdFsnbWFjX2VxdWlwbyddKTtcclxuICAgICRyb3V0ZXIudmFsKGNvbnRyYWN0Wydyb3V0ZXInXSk7XHJcbiAgICAkbWFjUm91dGVyLnZhbChjb250cmFjdFsnbWFjX3JvdXRlciddKTtcclxuICAgICRtb2RlbG8udmFsKGNvbnRyYWN0Wydtb2RlbG8nXSk7XHJcbiAgICAkaXAudmFsKGNvbnRyYWN0WydpcCddKTtcclxuXHJcbiAgICAvLyAkKFwiI3VwZGF0ZS1jb250cmFjdC1tb2RhbCBzZWxlY3RcIikudmFsKCcnKVxyXG4gICAgJChcIiN1cGRhdGUtY29udHJhY3QtbW9kYWxcIikubW9kYWwoKTtcclxuICAgICQoXCIjdXBkYXRlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHVwZGF0ZUNvbnRyYWN0KGlkX2NvbnRyYXRvKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRyYWN0KGlkX2NvbnRyYXRvKSB7XHJcbiAgICAgIHZhciBjaGVja2VkID0gJChcIiNjaGVjay1jaGFuZ2UtaXA6Y2hlY2tlZFwiKS5sZW5ndGg7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGlkX2NvbnRyYXRvICsgJyZub21icmVfZXF1aXBvPScgKyAkZXF1aXBvLnZhbCgpICsgXCImbWFjX2VxdWlwbz1cIiArICRtYWNFcXVpcG8udmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImcm91dGVyPVwiICsgJHJvdXRlci52YWwoKSArIFwiJm1hY19yb3V0ZXI9XCIgKyAkbWFjUm91dGVyLnZhbCgpO1xyXG4gICAgICBmb3JtICs9IFwiJm1vZGVsbz1cIiArICRtb2RlbG8udmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImdGFibGE9Y29udHJhdG9zXCI7XHJcbiAgICAgIGlmIChjaGVja2VkID4gMCkge1xyXG4gICAgICAgIGZvcm0gKz0gXCImaXA9XCIgKyAkaXAudmFsKCkgKyBcIiZjb2RpZ289XCIgKyAkY29kaWdvLnZhbCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0SXBMaXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VjdGlvbl9pZCA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0LXNlY3RvclwiKS52YWwoKTtcclxuICAgIHZhciBmb3JtID0gXCJpZF9zZWNjaW9uPVwiICsgc2VjdGlvbl9pZCArIFwiJnRhYmxhPWlwX2xpc3RcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRhbGxcIiwgZmFsc2UsIG51bGwsIG1ha2VJcExpc3QsIGZvcm0sIG51bGwpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VJcExpc3QoY29udGVudCkge1xyXG4gICAgICAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpLmh0bWwoY29udGVudCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYnRuRXh0cmFQcmVzc2VkOiBmdW5jdGlvbiAoJHRoaXMpIHtcclxuICAgIHZhciBidXR0b25JZCA9ICR0aGlzLnRleHQoKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBzd2l0Y2ggKGJ1dHRvbklkKSB7XHJcbiAgICAgIGNhc2UgXCJtZWpvcmFyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLnVwZ3JhZGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImV4dGVuZGVyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLmV4dGVuZCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZ3VhcmRhclwiOlxyXG4gICAgICAgIENvbnRyYWN0cy5hZGRFeHRyYSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZ3JhZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBzZWxlY3RlZFNlcnZpY2UsIHNlcnZpY2VJZCwgYW1vdW50O1xyXG5cclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIHNlbGVjdGVkU2VydmljZSA9ICQoXCIuc2VydmljZS1jYXJkLnNlbGVjdGVkXCIpO1xyXG4gICAgc2VydmljZUlkID0gc2VsZWN0ZWRTZXJ2aWNlLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgYW1vdW50ID0gc2VsZWN0ZWRTZXJ2aWNlLmF0dHIoXCJkYXRhLXBheW1lbnRcIik7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCwgc2VydmljZUlkLCBhbW91bnRdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgY29udHJhY3RJZCArIFwiJmlkX3NlcnZpY2lvPVwiICsgc2VydmljZUlkICsgXCImY3VvdGE9XCIgKyBhbW91bnQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZ3JhZGUnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZWNvbm5lY3Q6IGZ1bmN0aW9uIChjb250cmFjdElkLGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgZm9ybSwgc2VsZWN0ZWRTZXJ2aWNlLCBzZXJ2aWNlSWQsIGR1cmF0aW9uLCBkYXRlLHNlbmQsIGlzX2VtcHR5LGluZm87XHJcblxyXG4gICAgc2VsZWN0ZWRTZXJ2aWNlID0gJChcIi5zZXJ2aWNlLWNhcmQuc2VsZWN0ZWRcIik7XHJcbiAgICBzZXJ2aWNlSWQgPSBzZWxlY3RlZFNlcnZpY2UuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICBkdXJhdGlvbiAgPSAkKFwiI3JlY29ubmVjdGlvbi1tb250aHNcIikudmFsKCk7XHJcbiAgICBkYXRlID0gJChcIiNyZWNvbm5lY3Rpb24tZGF0ZVwiKS52YWwoKVxyXG4gICAgaXNfZW1wdHkgPSBpc0VtcHR5KFtjb250cmFjdElkLHNlcnZpY2VJZCxkYXRlLGR1cmF0aW9uXSk7XHJcbiAgICBpZighaXNfZW1wdHkpe1xyXG4gICAgICBpbmZvID0ge1xyXG4gICAgICAgICdpZF9jb250cmF0byc6IGNvbnRyYWN0SWQsXHJcbiAgICAgICAgJ2ZlY2hhJzogZGF0ZSxcclxuICAgICAgICAnaWRfc2VydmljaW8nOiBzZXJ2aWNlSWQsXHJcbiAgICAgICAgJ2R1cmFjaW9uJzogZHVyYXRpb25cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9ybSA9IFwiZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KGluZm8pO1xyXG4gICAgICBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArIFwiY29udHJhY3QvcmVjb25uZWN0XCIsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIGRpc3BsYXlNZXNzYWdlKHJlcy5kYXRhLm1lbnNhamUpO1xyXG4gICAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgICAgICQoXCIjYnRuLXJlY29ubmVjdFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgJChcIi5yZWNvbm5lY3QtY2FsbGVyXCIpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgaWYoY2FsbGJhY2spXHJcbiAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIHN3YWwoXCJMbGVuZSB0b2RvcyBsb3MgY2FtcG9zXCIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYWRkRXh0cmE6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBleHRyYVNlcnZpY2UsIHNlcnZpY2VDb3N0LCBlcXVpcG1lbnQsIGVNYWMsIHJvdXRlciwgck1hYyxwYXltZW50TW9kZTtcclxuXHJcbiAgICBjb250cmFjdElkID0gJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICBzZXJ2aWNlQ29zdCA9ICQoXCIjZXh0cmEtc2VydmljZS1jb3N0XCIpLnZhbCgpO1xyXG4gICAgZXh0cmFTZXJ2aWNlID0gJChcIiNzZWxlY3QtZXh0cmEtc2VydmljZVwiKS52YWwoKTtcclxuICAgIGVxdWlwbWVudCA9ICQoXCIjZXh0cmEtZXF1aXBvXCIpLnZhbCgpO1xyXG4gICAgZU1hYyA9ICQoXCIjZXh0cmEtZS1tYWNcIikudmFsKCk7XHJcbiAgICByb3V0ZXIgPSAkKFwiI2V4dHJhLXJvdXRlclwiKS52YWwoKTtcclxuICAgIHJNYWMgPSAkKFwiI2V4dHJhLXItbWFjXCIpLnZhbCgpO1xyXG4gICAgcGF5bWVudE1vZGUgPSAkKFwiI3NlbGVjdC1wYXltZW50LW1vZGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCwgZXh0cmFTZXJ2aWNlLCBzZXJ2aWNlQ29zdCxwYXltZW50TW9kZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyBjb250cmFjdElkICsgXCImY29zdG9fc2VydmljaW89XCIgKyBzZXJ2aWNlQ29zdCArIFwiJm5vbWJyZV9zZXJ2aWNpbz1cIiArIGV4dHJhU2VydmljZTtcclxuICAgICAgZm9ybSArPSAnJm5vbWJyZV9lcXVpcG89JyArIGVxdWlwbWVudCArIFwiJm1hY19lcXVpcG89XCIgKyBlTWFjICsgXCImcm91dGVyPVwiICsgcm91dGVyICsgXCImbWFjX3JvdXRlcj1cIiArIHJNYWM7XHJcbiAgICAgIGZvcm0gKz0gJyZtb2RvX3BhZ289JyArIHBheW1lbnRNb2RlO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9hZGRleHRyYScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBleHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBkdXJhdGlvbjtcclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIGR1cmF0aW9uID0gJChcIiNleHRyYS1leHRlbnNpb24tbW9udGhzXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2R1cmF0aW9uLCBjb250cmFjdElkXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGNvbnRyYWN0SWQgKyBcIiZkdXJhY2lvbj1cIiArIGR1cmF0aW9uO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9leHRlbmRfY29udHJhY3QnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGxPZkNsaWVudDogZnVuY3Rpb24oZG5pKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwiZG5pPVwiICsgZG5pO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2RhdGFfZm9yX2V4dHJhXCIsIGZhbHNlLCBudWxsLCBtYWtlQ29udHJhY3RMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICAvLyBOb3RlOiBsbyBzaWVudG8sIGRlIGFxdWkgZW4gYWRlbGFudGUgdXNvIGF4aW9zLCBlcyBtdWNobyBtYXMgY29tb2RvXHJcblxyXG4gIHN1c3BlbmQ6IGZ1bmN0aW9uIChjb250cmFjdElkLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeSh7aWRfY29udHJhdG86IGNvbnRyYWN0SWR9KVxyXG4gICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2NvbnRyYWN0L3N1c3BlbmQnLGZvcm0pO1xyXG4gICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgIHZhciBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgQ29udHJhY3RzLmdldEFsbCgpO1xyXG4gICAgICBpZihjYWxsYmFjaylcclxuICAgICAgICBjYWxsYmFjaygpXHJcbiAgICB9KVxyXG4gICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG52YXIgUGF5bWVudHMgPSB7XHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaWQgPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIGlmIChpZCAhPSBudWxsKSB7XHJcbiAgICAgIHZhciBmb3JtID0gXCJ0YWJsYT1wYWdvcyZpZD1cIiArIGlkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgcGF5bWVudFRhYmxlLnJlZnJlc2gsIGZvcm0sIFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgdmFyIGRhdGUgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICB2YXIgaWRfY29udHJhdG8gPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPXBhZ29zJmlkPVwiICsgaWQgKyBcIiZlc3RhZG89cGFnYWRvJmZlY2hhX3BhZ289XCIgKyBkYXRlICsgXCImaWRfY29udHJhdG89XCIgKyBpZF9jb250cmF0bztcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBzYXZlQWJvbm9zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgb2JzZXJ2YXRpb25zLCBhYm9ubyRpbnB1dEFib25vLCR0ZXh0QWJvbm8sY29udHJhY3RJZDtcclxuXHJcbiAgICAkdGV4dEFib25vICAgPSAkKCcjdGV4dC1hYm9uby1kZXRhaWwnKTtcclxuICAgIG9ic2VydmF0aW9ucyA9ICR0ZXh0QWJvbm8udmFsKCk7XHJcbiAgICBjb250cmFjdElkICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgICRpbnB1dEFib25vICA9ICQoXCIjaW5wdXQtYWJvbm9cIik7XHJcbiAgICBhYm9ubyAgICAgICAgPSAkaW5wdXRBYm9uby52YWwoKTtcclxuXHJcbiAgICBmb3JtID0gJ29ic2VydmFjaW9uZXM9JyArIG9ic2VydmF0aW9ucyArIFwiJmFib25vcz1cIiArIGFib25vO1xyXG4gICAgZm9ybSArPSBcIiZjb250cmF0b19hYm9ubz1cIitjb250cmFjdElkK1wiJnRhYmxhPWFib25vc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpXHJcbiAgICAkaW5wdXRBYm9uby52YWwoJycpXHJcbiAgfSxcclxuXHJcbiAgc2F2ZUV4dHJhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAncHJvY2Vzcy8nKVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVVudGlsOiBmdW5jdGlvbihjb250cmFjdElkLGxhc3RQYXltZW50SWQpe1xyXG4gICAgdmFyIGlkX2NvbnRyYXRvID0gJChcIiNzZWxlY3QtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9cGFnb3NfYWxfZGlhJmlkX3VsdGltb19wYWdvPVwiICsgbGFzdFBheW1lbnRJZCArIFwiJmVzdGFkbz1wYWdhZG8maWRfY29udHJhdG89XCIgKyBjb250cmFjdElkO1xyXG4gICAgdmFyIGhhbmRsZXJzLCBjYWxsYmFjaztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwsIGhlYXZ5TG9hZCk7XHJcbiAgfSxcclxuICAgIFxyXG4gIHJlbW92ZVBheW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWRlc2hhY2VyX3BhZ28maWRfcGFnbz1cIiArIGlkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBjb250cmFjdFJlZnJlc2g6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaWRfY2xpZW50ZSA9ICQoJyNkZXRhaWwtY2xpZW50LWlkJykudmFsKClcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jb250cmF0b3NfY2xpZW50ZSZpZD1cIiArIGlkX2NsaWVudGU7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgZGV0YWlsc0NvbnRyYWN0VGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0T25lOiBmdW5jdGlvbihpZF9wYWdvLCByZWNlaXZlcikge1xyXG4gICAgZm9ybSA9IFwidGFibGE9cGFnb3MmaWRfcGFnbz1cIiArIGlkX3BhZ287XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvZ2V0b25lXCIsIGZhbHNlLCBudWxsLCByZWNlaXZlciwgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICByZWNlaXZlRm9yRWRpdDogZnVuY3Rpb24oY29udGVudCl7XHJcbiAgICB2YXIgZGF0YSAgICAgICAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB2YXIgcGFnbyAgICAgICAgICA9IGRhdGEucGFnb1xyXG4gICAgdmFyIHNldHRpbmdzICAgICAgPSBkYXRhLnNldHRpbmdzO1xyXG4gICAgdGhpcy5pZF9jb250cmF0byAgPSBwYWdvWydpZF9jb250cmF0byddO1xyXG4gICAgdGhpcy5pZF9wYWdvICAgICAgPSBwYWdvWydpZF9wYWdvJ11cclxuICAgIHZhciAkY29uY2VwdG8gICAgID0gJChcIiNwYXltZW50LWNvbmNlcHRcIik7XHJcbiAgICB2YXIgJGZlY2hhTGltaXRlICA9ICQoXCIjcGF5bWVudC1saW1pdC1kYXRlXCIpO1xyXG4gICAgdmFyICRzZXJ2aWNpb3NFeHRyYSA9ICQoXCIjcGF5bWVudC1leHRyYS1zZXJ2aWNlc1wiKTtcclxuICAgIHZhciAkY3VvdGEgICAgICAgID0gJChcIiNwYXltZW50LWN1b3RhXCIpO1xyXG4gICAgdmFyICRtb3JhICAgICAgICAgPSAkKFwiI3BheW1lbnQtbW9yYVwiKTtcclxuICAgIHZhciAkZXh0cmEgICAgICAgID0gJChcIiNwYXltZW50LWV4dHJhXCIpO1xyXG4gICAgdmFyICR0b3RhbCAgICAgICAgPSAkKFwiI3BheW1lbnQtdG90YWxcIik7XHJcbiAgICB2YXIgJGRlc2N1ZW50byAgICA9ICQoXCIjcGF5bWVudC1kaXNjb3VudC1hbW91bnRcIik7XHJcbiAgICB2YXIgJHJhem9uICAgICAgICA9ICQoXCIjcGF5bWVudC1kaXNjb3VudC1yZWFzb25cIik7XHJcbiAgICB2YXIgJG1vZGFsICAgICAgICA9ICQoXCIjYWR2YW5jZWQtcGF5bWVudFwiKTtcclxuICAgIHZhciAkY01vcmEgICAgICAgID0gJChcIiNjX21vcmFcIik7XHJcbiAgICB2YXIgJGNSZWNvbmV4aW9uICA9ICQoXCIjY19yZWNvbmV4aW9uXCIpO1xyXG5cclxuICAgICRjb25jZXB0by52YWwocGFnb1snY29uY2VwdG8nXSk7XHJcbiAgICAkZmVjaGFMaW1pdGUudmFsKHBhZ29bJ2ZlY2hhX2xpbWl0ZSddKTtcclxuICAgICRjdW90YS52YWwocGFnb1snY3VvdGEnXSk7XHJcbiAgICAkbW9yYS52YWwocGFnb1snbW9yYSddKTtcclxuICAgICRleHRyYS52YWwocGFnb1snbW9udG9fZXh0cmEnXSk7XHJcbiAgICAkdG90YWwudmFsKHBhZ29bJ3RvdGFsJ10pO1xyXG4gICAgJHNlcnZpY2lvc0V4dHJhLnZhbChwYWdvWydkZXRhbGxlc19leHRyYSddKTtcclxuICAgIGludGVyYWN0aXZlU3VtKCk7XHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCk7XHJcblxyXG4gICAgJG1vZGFsLm9uKCdoaWRlLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG4gICAgICAkbW9kYWwuZmluZCgnaW5wdXQnKS52YWwoJycpXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocGFnb1snbW9yYSddID4gMCkge1xyXG4gICAgICAkY01vcmEuaUNoZWNrKCdjaGVjaycpOyAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGNNb3JhLmlDaGVjaygndW5jaGVjaycpOyBcclxuICAgIH1cclxuXHJcbiAgICBpZiAocGFnb1snZGV0YWxsZXNfZXh0cmEnXS5pbmNsdWRlcygnUmVjb25leGlvbicpKSB7XHJcbiAgICAgICRjUmVjb25leGlvbi5pQ2hlY2soJ2NoZWNrJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkY1JlY29uZXhpb24uaUNoZWNrKCd1bmNoZWNrJyk7ICAgICBcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1hcHBseS1kaXNjb3VudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBpZiAoJGRlc2N1ZW50by52YWwoKSA+IDApIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIlNlZ3VybyBkZSBxdWUgcXVpZXJlIGFwbGljYXIgZXN0ZSBkZXNjdWVudG8gZGUgXCIgKyAkZGVzY3VlbnRvLnZhbCgpICsgXCI/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBhcHBseSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFwcGx5KCk7XHJcbiAgICAgIH0gXHJcbiAgICB9KTtcclxuXHJcbiAgICAkY01vcmEub24oJ2lmQ2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIG1vcmEgPSBwYWdvWydjdW90YSddICogc2V0dGluZ3NbJ2NhcmdvX21vcmEnXSAvIDEwMDtcclxuICAgICAgJG1vcmEudmFsKG1vcmEpLnRyaWdnZXIoJ2tleXVwJyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJGNSZWNvbmV4aW9uLm9uKCdpZkNoZWNrZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICRleHRyYS52YWwoc2V0dGluZ3NbJ3JlY29uZXhpb24nXSkudHJpZ2dlcigna2V5dXAnKTtcclxuICAgICAgJHNlcnZpY2lvc0V4dHJhLnZhbCgnUmVjb25leGlvbicpO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgJGNNb3JhLm9uKCdpZlVuY2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJG1vcmEudmFsKDApLnRyaWdnZXIoJ2tleXVwJyk7XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICAkY1JlY29uZXhpb24ub24oJ2lmVW5jaGVja2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkZXh0cmEudmFsKDApLnRyaWdnZXIoJ2tleXVwJyk7XHJcbiAgICAgICRzZXJ2aWNpb3NFeHRyYS52YWwoJycpO1xyXG4gICAgfSlcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gYXBwbHkgKCkge1xyXG4gICAgICBhcHBseURpc2NvdW50KGlkX3BhZ28pO1xyXG4gICAgICAkbW9kYWwuaGlkZSgpO1xyXG4gICAgICAkbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgICAgICQoJy5tb2RhbC1iYWNrZHJvcCcpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGx5RGlzY291bnQoaWRfcGFnbykge1xyXG4gICAgICB2YXIgZGF0ZSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgIGZvcm0gPSAnaWRfcGFnbz0nICsgaWRfcGFnbyArICcmaWRfY29udHJhdG89JyArIGlkX2NvbnRyYXRvICsgXCImY3VvdGE9XCIgKyAkY3VvdGEudmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImbW9yYT1cIiArICRtb3JhLnZhbCgpICsgXCImbW9udG9fZXh0cmE9XCIgKyAkZXh0cmEudmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImdG90YWw9XCIgKyAkdG90YWwudmFsKCkgKyAnJmRlc2N1ZW50bz0nICsgJGRlc2N1ZW50by52YWwoKSArICcmcmF6b25fZGVzY3VlbnRvPScgKyRyYXpvbi52YWwoKTtcclxuICAgICAgZm9ybSArPSAnJmZlY2hhX3BhZ289JyArIGRhdGUgKyAnJmRldGFsbGVzX2V4dHJhPScgKyAkc2VydmljaW9zRXh0cmEudmFsKCkgKyBcIiZ0YWJsYT1kaXNjb3VudF9wYWdvc1wiO1xyXG5cclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpO1xyXG4gICAgICAkbW9kYWwuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGludGVyYWN0aXZlU3VtKCl7XHJcbiAgICAgICQoJy5wYXltZW50LXN1bWFuZG9zJykub24oJ2tleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgICAgICRjdW90YS52YWwocGFnb1snY3VvdGEnXSAtICRkZXNjdWVudG8udmFsKCkpO1xyXG4gICAgICAgIHZhciBzdW1hID0gTnVtYmVyKCRjdW90YS52YWwoKSkgKyBOdW1iZXIoJG1vcmEudmFsKCkpICsgTnVtYmVyKCRleHRyYS52YWwoKSk7XHJcbiAgICAgICAgJHRvdGFsLnZhbChOdW1iZXIoc3VtYSkpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbn1cclxuXHJcbnZhciBEYW1hZ2VzID0ge1xyXG4gIFxyXG4gIGFkZDogZnVuY3Rpb24gKGlkQ2xpZW50ZSkge1xyXG4gICAgdmFyIGZvcm0sIGRlc2NyaXB0aW9uO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKFwiI2EtZGVzY3JpcHRpb25cIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbaWRDbGllbnRlLCBkZXNjcmlwdGlvbl0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX2NsaWVudGU9JyArIGlkQ2xpZW50ZSArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb24gKyBcIiZ0YWJsYT1hdmVyaWFzXCI7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9hZGRcIiwgdHJ1ZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBudWxsLCBmb3JtLCBEYW1hZ2VzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICAgICQoJyNuZXctYXZlcmlhLW1vZGFsJykuZmluZCgnaW5wdXQsdGV4dGFyZWEnKS52YWwoXCJcIik7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhdHVzID0gJChcIiNhdmVyaWFzLXZpZXctbW9kZVwiKS52YWwoKTtcclxuICAgICQoXCIucHJlc2VudGFkb1wiKS50ZXh0KHN0YXR1cyk7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9YXZlcmlhcyZlc3RhZG89XCIgKyBzdGF0dXM7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBmaWxsQXZlcmlhc0xpc3QsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCRpZF9hdmVyaWEpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1hdmVyaWFzJmlkX2F2ZXJpYT1cIiArICRpZF9hdmVyaWE7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIERhbWFnZXMuZ2V0QWxsKTtcclxuICB9XHJcblxyXG59XHJcblxyXG52YXIgSW5zdGFsbGF0aW9ucyA9IHtcclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGF0dXMgPSAkKFwiI2luc3RhbGxhdGlvbnMtdmlldy1tb2RlXCIpLnZhbCgpO1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWluc3RhbGFjaW9uZXMmZXN0YWRvPVwiICsgc3RhdHVzO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIGluaXRHbG9iYWxIYW5kbGVycywgZmlsbEluc3RhbGxhdGlvbnNMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgkaWRfcGFnbykge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWluc3RhbGFjaW9uZXMmaWRfcGFnbz1cIiArICRpZF9wYWdvO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBudWxsLCBmb3JtLCBJbnN0YWxsYXRpb25zLmdldEFsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ2FqYSA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBhbW91bnQsIGRlc2NyaXB0aW9uLCBpc19lbXB0eTtcclxuXHJcbiAgICBhbW91bnQgPSAkKFwiI2NhamEtYS1hbW91bnRcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjY2FqYS1hLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG4gICAgZm9ybSA9IFwiZW50cmFkYT1cIiArIGFtb3VudCArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb24gKyBcIiZ0YWJsYT1jYWphXCI7XHJcbiAgICBpc19lbXB0eSA9IGlzRW1wdHkoW2Ftb3VudCwgZGVzY3JpcHRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvYWRkJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ2FqYS5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZXRpcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBhbW91bnQsIGRlc2NyaXB0aW9uLCBpc19lbXB0eTtcclxuXHJcbiAgICBhbW91bnQgPSAkKFwiI2NhamEtci1hbW91bnRcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjY2FqYS1yLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG4gICAgZm9ybSA9IFwic2FsaWRhPVwiICsgYW1vdW50ICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbjtcclxuICAgIGlzX2VtcHR5ID0gaXNFbXB0eShbYW1vdW50LCBkZXNjcmlwdGlvbl0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvcmV0aXJlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ2FqYS5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jYWphXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRBbGwnLCBmYWxzZSwgbnVsbCwgY2FqYVRhYmxlLnJlZnJlc2gsIGZvcm0sIENhamEuZ2V0U2FsZG8pO1xyXG4gIH0sXHJcblxyXG4gIGdldFNhbGRvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2FqYVwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0b25lJywgZmFsc2UsIG51bGwsIHVwZGF0ZVNhbGRvLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICRkYXRlU2VhcmNoID0gJChcIiNjYWphLWRhdGVcIik7XHJcbiAgICB2YXIgJHVzZXJTZWFyY2ggPSAkKFwiI2NhamEtdXNlclwiKTtcclxuICAgIHZhciBkYXRlID0gKCRkYXRlU2VhcmNoLnZhbCgpKSA/ICRkYXRlU2VhcmNoLnZhbCgpIDogJyUnO1xyXG4gICAgdmFyIHVzZXJJZCA9ICgkdXNlclNlYXJjaC52YWwoKSkgPyAkdXNlclNlYXJjaC52YWwoKSA6ICclJztcclxuXHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2FqYSZpZF9lbXBsZWFkbz1cIiArIHVzZXJJZCArIFwiJmZlY2hhPVwiICsgZGF0ZTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3NlYXJjaCcsIGZhbHNlLCBudWxsLCBjYWphVGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ29tcGFueSA9IHtcclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLFxyXG4gICAgY29tcGFueU5hbWUgPSAkKFwiI2NvbXBhbnktbmFtZVwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlTdGF0ZW1lbnQgPSAkKFwiI2NvbXBhbnktc3RhdGVtZW50XCIpLnZhbCgpLFxyXG4gICAgY29tcGFueVBob25lMSA9IGdldFZhbCgkKFwiI2NvbXBhbnktcGhvbmUxXCIpKSxcclxuICAgIGNvbXBhbnlEaXJlY3Rpb24gPSAkKFwiI2NvbXBhbnktZGlyZWN0aW9uXCIpLnZhbCgpLFxyXG4gICAgY29tcGFueURlc2NyaXB0aW9uID0gJChcIiNjb21wYW55LWRlc2NyaXB0aW9uXCIpLnZhbCgpLFxyXG4gICAgY29tcGFueVBob25lMiA9IGdldFZhbCgkKFwiI2NvbXBhbnktcGhvbmUyXCIpKVxyXG5cclxuICAgIGZvcm0gPSAnbm9tYnJlPScgKyBjb21wYW55TmFtZSArICcmbGVtYT0nICsgY29tcGFueVN0YXRlbWVudCArICcmZGVzY3JpcGNpb249JyArIGNvbXBhbnlEZXNjcmlwdGlvbiArIFwiJmRpcmVjY2lvbj1cIlxyXG4gICAgZm9ybSArPSBjb21wYW55RGlyZWN0aW9uICsgXCImdGVsZWZvbm8xPVwiICsgY29tcGFueVBob25lMSArIFwiJnRlbGVmb25vcz1cIiArIGNvbXBhbnlQaG9uZTIgKyBcIiZ0YWJsYT1lbXByZXNhXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBTZXR0aW5ncyA9IHtcclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLFxyXG4gICAgc2V0dGluZ3NDYXJnb01vcmEgPSAkKFwiI3NldHRpbmdzLW1vcmFcIikudmFsKCksXHJcbiAgICBzZXR0aW5nc0ZlY2hhQ29ydGUgPSAkKFwiI3NldHRpbmdzLWZlY2hhLWNvcnRlXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NSZWNvbmV4aW9uID0gJChcIiNzZXR0aW5ncy1yZWNvbmV4aW9uXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NQZW5hbGl6YWNpb25DYW5jZWxhY2lvbiA9ICQoXCIjc2V0dGluZ3MtcGVuYWxpemFjaW9uLWNhbmNlbGFjaW9uXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NNZXNlc1BvckRlZmVjdG8gPSAkKFwiI3NldHRpbmdzLW1lc2VzLXBvci1kZWZlY3RvXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NTcGxpdERheSA9ICQoXCIjc2V0dGluZ3Mtc3BsaXQtZGF5XCIpLnZhbCgpO1xyXG5cclxuICAgIGZvcm0gPSAnY2FyZ29fbW9yYT0nICsgc2V0dGluZ3NDYXJnb01vcmEgKyAnJmZlY2hhX2NvcnRlPScgKyBzZXR0aW5nc0ZlY2hhQ29ydGUgKyAnJnJlY29uZXhpb249JyArIHNldHRpbmdzUmVjb25leGlvbjtcclxuICAgIGZvcm0gKz0gJyZwZW5hbGl6YWNpb25fY2FuY2VsYWNpb249JyArIHNldHRpbmdzUGVuYWxpemFjaW9uQ2FuY2VsYWNpb24gKyAnJm1lc2VzX3Bvcl9kZWZlY3RvPScgKyBzZXR0aW5nc01lc2VzUG9yRGVmZWN0bztcclxuICAgIGZvcm0gKz0gJyZzcGxpdF9kYXk9JyArIHNldHRpbmdzU3BsaXREYXkgKyAnJnRhYmxhPXNldHRpbmdzJztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIFNlY3Rpb25zID0geyBcclxuICBhZGQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgc3dhbC5zZXREZWZhdWx0cyh7XHJcbiAgICAgIGlucHV0OiAndGV4dCcsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnTmV4dCAmcmFycjsnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBhbmltYXRpb246IGZhbHNlLFxyXG4gICAgICBwcm9ncmVzc1N0ZXBzOiBbJzEnLCAnMicsICczJ11cclxuICAgIH0pXHJcblxyXG4gICAgdmFyIHN0ZXBzID0gW3tcclxuICAgICAgICB0aXRsZTogJ05vbWJyZSBkZWwgc2VjdG9yJ1xyXG4gICAgICB9LFxyXG4gICAgICAnQ29kaWdvIGRlbCBTZWN0b3InLFxyXG4gICAgXVxyXG5cclxuICAgIHN3YWwucXVldWUoc3RlcHMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICBzd2FsLnJlc2V0RGVmYXVsdHMoKVxyXG4gICAgICBzYXZlKHJlc3VsdClcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNhdmUocmVzdWx0KXtcclxuICAgICAgdmFyIGZvcm07XHJcbiAgICAgIHZhciBub21icmUgPSByZXN1bHRbMF07XHJcbiAgICAgIHZhciBjb2RpZ29BcmVhID0gcmVzdWx0WzFdLFxyXG5cclxuICAgICAgZm9ybSA9IFwibm9tYnJlPVwiK25vbWJyZStcIiZjb2RpZ29fYXJlYT1cIitjb2RpZ29BcmVhO1xyXG4gICAgICBmb3JtICs9IFwiJnRhYmxhPXNlY2Npb25lc1wiXHJcbiAgICAgXHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKXtcclxuICAgICAgICAgaWYoY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvYWRkJywgdHJ1ZSwgZmFsc2UsIG51bGwsIGZvcm0sU2VjdGlvbnMuZ2V0QWxsLGhlYXZ5TG9hZCkpe1xyXG4gICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRJcHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGlkID0gJChcIiNzZWxlY3Qtc2VjdG9yXCIpLnZhbCgpO1xyXG4gICAgJCgnLnByaW50LXRhYmxlJykuYXR0cignaHJlZicsIEJBU0VfVVJMICsgJ3Byb2Nlc3MvZ2V0cmVwb3J0L3NlY2Npb25lcy8nICsgaWQpO1xyXG4gICAgXHJcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9aXBzJmlkPVwiICsgaWQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBzZWN0aW9uVGFibGUucmVmcmVzaCwgZm9ybSxudWxsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPXNlY2Npb25lc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIGZpbGxTZWxlY3QsIGZvcm0saGVhdnlMb2FkKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmaWxsU2VsZWN0KGNvbnRlbnQpe1xyXG4gICAgICAkKFwiI3NlbGVjdC1zZWN0b3JcIikuaHRtbChjb250ZW50KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGVJcFN0YXRlOiBmdW5jdGlvbiAoSVApIHtcclxuICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShJUCkgKyAnJmV4dHJhX2luZm89JyArIEpTT04uc3RyaW5naWZ5KHttb2R1bGU6ICdpcCd9KTtcclxuICAgICAgYXhpb3MucG9zdChCQVNFX1VSTCArICdwcm9jZXNzL2F4aW9zdXBkYXRlJywgZm9ybSlcclxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UocmVzLmRhdGEubWVuc2FqZSk7XHJcbiAgICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG52YXIgRXh0cmFzID0ge1xyXG4gIHJlbW92ZTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgaWRfY2xpZW50ZSwgc2VuZDtcclxuICAgIFxyXG4gICAgaWRfY2xpZW50ZSA9ICQoJyNkZXRhaWwtY2xpZW50LWlkJykudmFsKClcclxuICAgIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeSh7aWQ6IGlkLGlkX2NsaWVudGU6IGlkX2NsaWVudGV9KTtcclxuICAgIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2V4dHJhL2RlbGV0ZV9leHRyYScsIGZvcm0pO1xyXG4gICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSk7XHJcbiAgICAgIGV4dHJhVGFibGUucmVmcmVzaChkYXRhLmV4dHJhcyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbn0iLCIgIHZhciBjdXJyZW50UGFnZSA9ICQoXCJ0aXRsZVwiKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xyXG4gIGN1cnJlbnRQYWdlID0gY3VycmVudFBhZ2VbNF0udG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgdmFyIHJhbiA9IGZhbHNlO1xyXG5cclxuICBmdW5jdGlvbiBpbml0Q29tcG9uZW50cygpIHtcclxuICAgIHN3aXRjaCAoY3VycmVudFBhZ2UpIHtcclxuICAgICAgY2FzZSBcImhvbWVcIjpcclxuICAgICAgICBpbml0Q2xpZW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImFkbWluaXN0cmFkb3JcIjpcclxuICAgICAgICBpbml0QWRtaW5IYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiY2xpZW50ZXNcIjpcclxuICAgICAgICBpbml0Q2xpZW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNlcnZpY2lvc1wiOlxyXG4gICAgICAgIGluaXRTZXJ2aWNlc0hhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJudWV2b19jb250cmF0b1wiOlxyXG4gICAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICAgICAgQ29udHJhY3RzLmdldElwTGlzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZGV0YWxsZXNcIjpcclxuICAgICAgICBpbml0UGF5bWVudHNIYW5kbGVycygpO1xyXG4gICAgICAgIGRldGFpbEhhbmRsZXJzKCk7XHJcbiAgICAgICAgaW5pdENvbnRyYWN0SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImNvbnRyYXRvc1wiOlxyXG4gICAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICAgICAgaW5pdENsaWVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJjdWVudGFcIjpcclxuICAgICAgICBhY291bnRIYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic2VjY2lvbmVzXCI6XHJcbiAgICAgICAgc2VjdGlvbkhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzZWNjaW9uZXMyXCI6XHJcbiAgICAgICAgc2VjdGlvbkhhbmRsZXJzKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2hlcmUnKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDYWphSGFuZGxlcnMoKTtcclxuICAgIGluaXRHbG9iYWxIYW5kbGVycygpO1xyXG4gIH1cclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgIGdsb2JhbHMgaGFuZGxlcnMgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICBmdW5jdGlvbiBpbml0R2xvYmFsSGFuZGxlcnMoKSB7XHJcblxyXG4gICAgdmFyIGF2ZXJpYUNsaWVudERuaSA9ICQoXCIjYS1jbGllbnQtZG5pXCIpO1xyXG5cclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnbm90aWZpY2FjaW9uZXMnKSB7XHJcbiAgICAgIEdlbmVyYWxzLmNvdW50X3RhYmxlKFwiYXZlcmlhc1wiKTtcclxuXHJcbiAgICAgICQoXCIjYXZlcmlhcy12aWV3LW1vZGVcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBEYW1hZ2VzLmdldEFsbCgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoXCIjaW5zdGFsbGF0aW9ucy12aWV3LW1vZGVcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBJbnN0YWxsYXRpb25zLmdldEFsbCgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJ3Rib2R5JykuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiBcInRhYmxlLXJvdy1ncm91cFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnY29udHJhdG9zJykge1xyXG4gICAgICBpbml0Q29udHJhY3RIYW5kbGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhdmVyaWFDbGllbnQgPSAkKFwiI2EtY2xpZW50XCIpLnNlbGVjdDIoe1xyXG4gICAgICBkcm9wZG93blBhcmVudDogJCgnI25ldy1hdmVyaWEtbW9kYWwnKSxcclxuICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgYWpheDoge1xyXG4gICAgICAgIHVybDogQkFTRV9VUkwgKyAncHJvY2Vzcy9zZWFyY2gnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgZGVsYXk6IDI1MCxcclxuICAgICAgICBkYXRhOiBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBxOiBwYXJhbXMudGVybSxcclxuICAgICAgICAgICAgdGFibGE6ICdjbGllbnRlc19wYXJhX2F2ZXJpYXMnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJvY2Vzc1Jlc3VsdHM6IGZ1bmN0aW9uIChkYXRhLCBwYXJhbXMpIHtcclxuICAgICAgICAgIHBhcmFtcy5wYWdlID0gcGFyYW1zLnBhZ2UgfHwgMVxyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdWx0czogZGF0YS5pdGVtcyxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgIG1vcmU6IChwYXJhbXMucGFnZSAqIDMwKSA8IGRhdGEudG90YWxfY291bnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWF2ZXJpYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBEYW1hZ2VzLmFkZChhdmVyaWFDbGllbnQudmFsKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5idG4tdXBkYXRlLWF2ZXJpYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWRfYXZlcmlhID0gJCh0aGlzKS5wYXJlbnRzKCcuYXZlcmlhLWl0ZW0nKS5maW5kKCcuY29kZScpXHJcbiAgICAgIGlkX2F2ZXJpYSA9IGlkX2F2ZXJpYS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICBEYW1hZ2VzLnVwZGF0ZShpZF9hdmVyaWEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5idG4tdXBkYXRlLWluc3RhbGxhdGlvblwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWRfcGFnbyA9ICQodGhpcykucGFyZW50cygnLmF2ZXJpYS1pdGVtJykuZmluZCgnLmNvZGUnKTtcclxuICAgICAgaWRfcGFnbyA9IGlkX3BhZ28udGV4dCgpLnRyaW0oKTtcclxuICAgICAgSW5zdGFsbGF0aW9ucy51cGRhdGUoaWRfcGFnbyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2V4dHJhLWNvbnRyb2xzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbnRyYWN0cy5idG5FeHRyYVByZXNzZWQoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2V4dHJhLWNsaWVudC1kbmlcIikub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICB2YXIga2V5ID0gZS53aGljaDtcclxuICAgICAgdmFyIGRuaSA9ICQodGhpcykudmFsKClcclxuICAgICAgaWYgKGtleSA9PSAxMykge1xyXG4gICAgICAgIENvbnRyYWN0cy5nZXRBbGxPZkNsaWVudChkbmkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgYWRtaW4gaGFuZGxlcnMgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0QWRtaW5IYW5kbGVycygpIHtcclxuICAgIHVzZXJUYWJsZS5pbml0KCk7XHJcbiAgICAkKFwiI2J0bi1zYXZlLXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgVXNlcnMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBVc2Vycy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIuZGVsZXRlLXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgJHJvdyA9ICQodGhpcykucGFyZW50cyhcInRyXCIpO1xyXG4gICAgICB2YXIgaWQgPSAkcm93LmZpbmQoJy51c2VyLWlkJykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgdmFyIHJvdyA9IHVzZXJUYWJsZS5nZXRSb3coaWQpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgIHRleHQ6IFwiRGVzZWEgRWxpbWluYXIgYWwgVXN1YXJpbyBcIiArIHJvdy5ub21icmVzICsgXCIgXCIgKyByb3cuYXBlbGxpZG9zICsgXCI/XCIsXHJcbiAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFVzZXJzLmRlbGV0ZShpZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5lZGl0LXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdXNlci1pZCcpO1xyXG4gICAgICB2YXIgcm93ID0gdXNlclRhYmxlLmdldFJvdyhpZCk7XHJcblxyXG5cclxuICAgICAgJChcIiNlLW5pY2tuYW1lXCIpLnZhbChyb3cubmljayk7XHJcbiAgICAgICQoXCIjZS1uYW1lXCIpLnZhbChyb3cubm9tYnJlcyk7XHJcbiAgICAgICQoXCIjZS1sYXN0bmFtZVwiKS52YWwocm93LmFwZWxsaWRvcyk7XHJcbiAgICAgICQoXCIjZS1kbmlcIikudmFsKHJvdy5jZWR1bGEpO1xyXG4gICAgICAkKFwiI2UtdHlwZVwiKS52YWwocm93LnRpcG9fY29kaWdvKTtcclxuICAgICAgJCgnI3VwZGF0ZS11c2VyLW1vZGFsJykubW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjdXBkYXRlLWNvbXBhbnktZGF0YVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbXBhbnkudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtc2V0dGluZ3NcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBTZXR0aW5ncy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgIEluaXQgY2FqYSAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICBmdW5jdGlvbiBpbml0Q2FqYUhhbmRsZXJzKCkge1xyXG4gICAgaWYgKGN1cnJlbnRQYWdlID09ICdhZG1pbmlzdHJhZG9yJykge1xyXG4gICAgICBjYWphVGFibGUuaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgdmFyIGJ0bkFkZE1vbmV5ID0gJChcIiNidG4tYWRkLW1vbmV5XCIpO1xyXG4gICAgdmFyIGJ0blJldGlyZU1vbmV5ID0gJChcIiNidG4tcmV0aXJlLW1vbmV5XCIpO1xyXG4gICAgdmFyIHVzZXJTZWFyY2ggPSAkKFwiI2NhamEtdXNlclwiKTtcclxuICAgIHZhciBkYXRlU2VhcmNoID0gJChcIiNjYWphLWRhdGVcIik7XHJcblxyXG4gICAgYnRuQWRkTW9uZXkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJ0blJldGlyZU1vbmV5Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENhamEucmV0aXJlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRlU2VhcmNoLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDYWphLnNlYXJjaCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdXNlclNlYXJjaC5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5zZWFyY2goKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgY2xpZW50IEhhbmRsZXJzICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0Q2xpZW50SGFuZGxlcnMoKSB7XHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2NsaWVudGVzJykge1xyXG4gICAgICBjbGllbnRUYWJsZS5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1jbGllbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2xpZW50cy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjdXBkYXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBpZCA9IGNsaWVudFRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIENsaWVudHMuZ2V0T25lKGlkLCBDbGllbnRzLnJlY2VpdmVGb3JFZGl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjbGllbnQtc2VhcmNoZXJcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJjbGllbnRlc1wiLCBjbGllbnRUYWJsZS5yZWZyZXNoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjY2xpZW50LXNlYXJjaGVyLW5ld2NvbnRyYWN0XCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgaWYgKCFpc0VtcHR5KFt0ZXh0XSkpIHtcclxuICAgICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJjbGllbnRlc1wiLCBjbGllbnRUYWJsZS5yZWZyZXNoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhclRib2R5KFwiLmxvYmJ5LXJlc3VsdHNcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZGVsZXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciByb3cgPSBjbGllbnRUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBFbGltaW5hciBhbChsYSkgQ2xpZW50ZSBcIiArIHJvdy5ub21icmVzICsgXCIgXCIgKyByb3cuYXBlbGxpZG9zICsgXCI/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIEdlbmVyYWxzLmRlbGV0ZVJvdyhyb3cuaWQsIFwiY2xpZW50ZXNcIilcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgSW5pdCBTZXJ2aWNlcyBIYW5kbGVycyAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGluaXRTZXJ2aWNlc0hhbmRsZXJzKCkge1xyXG4gICAgc2VydmljZVRhYmxlLmluaXQoKTtcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VydmljZXMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2RlbGV0ZS1zZXJ2aWNlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gc2VydmljZVRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgRWxpbWluYXIgIGVsIFNlcnZpY2lvP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBHZW5lcmFscy5kZWxldGVSb3coaWQsIFwic2VydmljaW9zXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2VkaXQtc2VydmljZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciByb3cgPSBzZXJ2aWNlVGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuXHJcbiAgICAgICQoJyN1LXNlcnZpY2UtaWQnKS52YWwocm93LmlkKTtcclxuICAgICAgJCgnI3Utc2VydmljZS1uYW1lJykudmFsKHJvdy5ub21icmUpO1xyXG4gICAgICAkKCcjdS1zZXJ2aWNlLWRlc2NyaXB0aW9uJykudmFsKHJvdy5kZXNjcmlwY2lvbik7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtbW9udGhseS1wYXltZW50JykudmFsKE51bWJlcihyb3cubWVuc3VhbGlkYWQucmVwbGFjZShcIlJEJCBcIiwgJycpKSk7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtdHlwZScpLnZhbChyb3cudGlwbyk7XHJcbiAgICAgICQoJyN1cGRhdGUtc2VydmljZS1tb2RhbCcpLm1vZGFsKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tdXBkYXRlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VydmljZXMudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3NlcnZpY2Utc2VhcmNoZXJcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJzZXJ2aWNpb3NcIiwgc2VydmljZVRhYmxlLnJlZnJlc2gsIGluaXRTZXJ2aWNlc0hhbmRsZXJzKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBJbml0IENvbnRyYWN0IEhhbmRsZXJzICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gaW5pdENvbnRyYWN0SGFuZGxlcnMoKSB7XHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2NvbnRyYXRvcycpIHtcclxuICAgICAgY29udHJhY3RUYWJsZS5pbml0KCk7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRBbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbnRyYWN0cy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLWFkZC1leHRyYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbnRyYWN0cy5jYWxsRXh0cmEoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjY29udHJhY3Qtc2VhcmNoZXJcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJ2X2NvbnRyYXRvc1wiLCBjb250cmFjdFRhYmxlLnJlZnJlc2gsIG51bGwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tY2FuY2VsLWNvbnRyYWN0LCAjYnRuLWRldGFpbC1jYW5jZWwtY29udHJhY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgcm93LCBjYWxsYmFja1xyXG4gICAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2NvbnRyYXRvcycpIHtcclxuICAgICAgICByb3cgPSBjb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBDb250cmFjdHMuZ2V0QWxsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvdyA9IGRldGFpbHNDb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgICAgcm93LmlkID0gcm93LmlkX2NvbnRyYXRvO1xyXG4gICAgICAgIHJvdy5pZF9jbGllbnRlID0gJCgnI2RhdGFpbC1jbGllbnQtaWQnKS52YWwoKTtcclxuICAgICAgICByb3cuY2xpZW50ZSA9ICQoJyNkZXRhaWwtY2xpZW50LW5hbWUnKS52YWwoKTtcclxuICAgICAgICBjYWxsYmFjayA9IFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgICQoXCIuY2FuY2VsLW5hbWVcIikudGV4dChyb3cuY2xpZW50ZSk7XHJcbiAgICAgICAgdmFyICRpbnB1dEVsZW1lbnQgPSAkKFwiLmNvbmZpcm1lZC1kYXRhXCIpO1xyXG4gICAgICAgIHZhciAkYnV0dG9uVG9BY3RpdmUgPSAkKFwiI2NhbmNlbC1wZXJtYW5lbnRseVwiKTtcclxuXHJcbiAgICAgICAgZGVsZXRlVmFsaWRhdGlvbigkaW5wdXRFbGVtZW50LCByb3cuY2xpZW50ZSwgJGJ1dHRvblRvQWN0aXZlKTtcclxuICAgICAgICAkKFwiI2NhbmNlbC1wcmludFwiKS5hdHRyKFwiaHJlZlwiLCBCQVNFX1VSTCArICdwcm9jZXNzL2dldGNhbmNlbGNvbnRyYWN0LycgKyByb3cuaWQpO1xyXG5cclxuICAgICAgICAkKFwiI2NhbmNlbC1jb250cmFjdC1tb2RhbFwiKS5tb2RhbCgpO1xyXG5cclxuICAgICAgICAkYnV0dG9uVG9BY3RpdmUub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBDb250cmFjdHMuY2FuY2VsKHJvdywgY2FsbGJhY2spXHJcbiAgICAgICAgICAkYnV0dG9uVG9BY3RpdmUuYXR0cignZGlzYWJsZScpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICRpbnB1dEVsZW1lbnQudmFsKCcnKTtcclxuICAgICAgICAkKCcjY2FuY2VsLWNvbnRyYWN0LW1vZGFsIC5hbGVydCcpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgJGJ1dHRvblRvQWN0aXZlLmF0dHIoJ2Rpc2FibGVkJywgJycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3YWwoXCJEZWJlcyBzZWxlY2Npb25hciB1biBjb250cmF0b1wiKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1zdXNwZW5kLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHJvdyA9IGNvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgU3VzcGVuZGVyIGVsIGNvbnRyYXRvIGRlIFwiICsgcm93LmNsaWVudGUgKyBcIiA/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8nLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgQ29udHJhY3RzLnN1c3BlbmQocm93LmlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFwiRGViZSBzZWxlY2Npb25hciB1biBjb250cmF0b1wiKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtY29udHJhY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBjb250cmFjdFRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIENvbnRyYWN0cy5nZXRPbmUoaWQsIENvbnRyYWN0cy5yZWNpZXZlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNzZWxlY3QtY29udHJhY3Qtc2VjdG9yXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb250cmFjdHMuZ2V0SXBMaXN0KCk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJyNzZWxlY3QtcGF5LXVudGlsJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQoJyNzZWxlY3QtcGF5LXVudGlsIDpzZWxlY3RlZCcpO1xyXG4gICAgICB2YXIgY29udHJhY3RJZCA9ICR0aGlzLmF0dHIoJ2RhdGEtY29udHJhY3QnKTtcclxuICAgICAgdmFyIGxhc3RQYXltZW50SWQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBQYXltZW50cy51cGRhdGVVbnRpbChjb250cmFjdElkLCBsYXN0UGF5bWVudElkKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgUGF5bWVudHMgIEhhbmRsZXJzICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgZnVuY3Rpb24gaW5pdFBheW1lbnRzSGFuZGxlcnMoKSB7XHJcbiAgICBwYXltZW50VGFibGUuaW5pdCgpO1xyXG4gICAgZXh0cmFUYWJsZS5pbml0KCk7XHJcbiAgICBpZiAoIXJhbikge1xyXG4gICAgICBQYXltZW50cy5nZXRBbGwoKTtcclxuICAgICAgcmFuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1wYXlcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gcGF5bWVudFRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIFBheW1lbnRzLnVwZGF0ZShpZCk7XHJcbiAgICAgICAgdXBkYXRlX21vZGUoaWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFRPRE86IE1FU1NBR0UgU2VsZWN0IGEgcGF5bWVudFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgUGF5bWVudHMuZ2V0QWxsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3BheW1lbnQtZGV0YWlsLWJveFwiKS5jb2xsYXBzZSgpXHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlX21vZGUoaWQpIHtcclxuICAgICAgdmFyIG1vZGUgPSAkKCcucGF5bWVudC1tb2RlLnNlbGVjdGVkJykudGV4dCgpO1xyXG4gICAgICB2YXIgZXh0cmFJbmZvID0ge1xyXG4gICAgICAgIGlkOiBpZC50b1N0cmluZygpLFxyXG4gICAgICAgIG1vZHVsZTogJ3BhZ29zJ1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBmb3JtID0gJ2RhdGE9JyArIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICB0aXBvOiBtb2RlXHJcbiAgICAgIH0pICsgJyZleHRyYV9pbmZvPScgKyBKU09OLnN0cmluZ2lmeShleHRyYUluZm8pO1xyXG5cclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ3Byb2Nlc3MvYXhpb3N1cGRhdGUnLCBmb3JtKVxyXG4gICAgICBzZW5kLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgLy9UT0RPOiBzb21ldGhpbmcgd2hpdGggdGhhdCAvIGFsZ28gY29uIGVzdG9cclxuICAgICAgfSk7XHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgICBkZXRhaWwgSGFuZGxlcnMgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBkZXRhaWxIYW5kbGVycygpIHtcclxuXHJcbiAgICB2YXIgJGNsaWVudE5hbWUgPSAkKCcjZGV0YWlsLWNsaWVudC1uYW1lJyk7XHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1vYnNlcnZhdGlvbnNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgUGF5bWVudHMuc2F2ZUFib25vcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2J0bi1zYXZlLXJlYWwtb2JzZXJ2YXRpb25zJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2xpZW50cy5zYXZlT2JzZXJ2YXRpb25zKCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGRldGFpbHNDb250cmFjdFRhYmxlLmluaXQoKTtcclxuXHJcbiAgICAkKFwiI2J0bi1kZXRhaWwtc3VzcGVuZC1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciByb3cgPSBkZXRhaWxzQ29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBTdXNwZW5kZXIgZWwgY29udHJhdG8gZGUgXCIgKyAkY2xpZW50TmFtZS52YWwoKSArIFwiID9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybycsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBDb250cmFjdHMuc3VzcGVuZChyb3cuaWRfY29udHJhdG8sIFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcIkRlYmUgc2VsZWNjaW9uYXIgdW4gY29udHJhdG9cIilcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tY2FsbC1yZWNvbm5lY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG4gICAgICB2YXIgcm93ID0gZGV0YWlsc0NvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgICQoXCIjcmVjb25uZWN0LW1vZGFsXCIpLm1vZGFsKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcIkRlYmUgc2VsZWNjaW9uYXIgdW4gY29udHJhdG8gcHJpbWVyb1wiKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAkKFwiI2J0bi1yZWNvbm5lY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG4gICAgICB2YXIgcm93ID0gZGV0YWlsc0NvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIENvbnRyYWN0cy5yZWNvbm5lY3Qocm93LmlkX2NvbnRyYXRvLCBQYXltZW50cy5jb250cmFjdFJlZnJlc2gpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgICQoJyNidG4tY2FsbC1leHRyYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGNvbnRleHQgPSAnZGV0YWlscyc7XHJcbiAgICAgIENvbnRyYWN0cy5jYWxsRXh0cmEoY29udGV4dCk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWNvdW50SGFuZGxlcnMoKSB7XHJcbiAgICB2YXIgJHVzZXJJZCA9ICQoXCIjYWNvdW50LXVzZXItaWRcIilcclxuICAgIHZhciAkY3VycmVudFBhc3N3b3JkID0gJChcIiNhY291bnQtY3VycmVudC1wYXNzd29yZFwiKVxyXG4gICAgdmFyICRidG5VcGRhdGVVc2VyID0gJChcIiN1cGRhdGUtdXNlci1kYXRhXCIpO1xyXG4gICAgdmFyICRuZXdQYXNzd29yZCA9ICQoXCIjYWNvdW50LW5ldy1wYXNzd29yZFwiKTtcclxuXHJcbiAgICAkKFwiI2Fjb3VudC1jdXJyZW50LXBhc3N3b3JkXCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFVzZXJzLmNvbmZpcm1QYXNzd29yZCgkdXNlcklkLnZhbCgpLCAkY3VycmVudFBhc3N3b3JkLnZhbCgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRidG5VcGRhdGVVc2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgVXNlcnMudXBkYXRlUGFzc3dvcmQoJHVzZXJJZC52YWwoKSwgJGN1cnJlbnRQYXNzd29yZC52YWwoKSwgJG5ld1Bhc3N3b3JkLnZhbCgpKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNlY3Rpb25IYW5kbGVycygpIHtcclxuICAgIGlmICghcmFuKSB7XHJcbiAgICAgIHNlY3Rpb25UYWJsZS5pbml0KCk7XHJcbiAgICAgIFNlY3Rpb25zLmdldElwcygpO1xyXG4gICAgICByYW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLWFkZC1zZWN0aW9uXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBTZWN0aW9ucy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjc2VsZWN0LXNlY3RvclwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VjdGlvbnMuZ2V0SXBzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gICQoZnVuY3Rpb24gKCkge1xyXG4gICAgaW5pdENvbXBvbmVudHMoKVxyXG4gIH0pOyIsInZhciByYW4gPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIGxvZ2luSGFuZGxlcnMoKSB7XHJcblxyXG4gICQoXCIjc2VuZC1jcmVkZW50aWFsc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIFNlc3Npb24ubG9naW4oKTtcclxuICB9KTtcclxuXHJcbiAgJChcIiN1c2VyLWlucHV0XCIpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBsb2dpbkxpYnJhcnkuc2VuZFRvTG9naW4oZSlcclxuICB9KVxyXG5cclxuICAkKFwiI3Bhc3N3b3JkLWlucHV0XCIpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBsb2dpbkxpYnJhcnkuc2VuZFRvTG9naW4oZSlcclxuICB9KVxyXG5cclxuICAkKFwiYVtocmVmXVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsb2dpbkxpYnJhcnkubG9hZGluZygpO1xyXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciB0YXJnZXQgPSAkdGhpcy5hdHRyKCd0YXJnZXQnKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtcclxuICAgICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIDMwMDApXHJcbiAgICB9Y2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxudmFyIFNlc3Npb24gPSB7XHJcbiAgbG9naW46IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHVzZXIgICAgID0gJChcIiN1c2VyLWlucHV0XCIpLnZhbCgpO1xyXG4gICAgdmFyIHBhc3N3b3JkID0gJChcIiNwYXNzd29yZC1pbnB1dFwiKS52YWwoKTtcclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW3VzZXIsIHBhc3N3b3JkXSlcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgdmFyIGZvcm0gPSAndXNlcj0nICsgdXNlciArICcmcGFzc3dvcmQ9JyArIHBhc3N3b3JkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgnYXBwL2xvZ2luJywgZmFsc2UsIGZhbHNlLCBTZXNzaW9uLnByb2Nlc3NMb2dpbkRhdGEsIGZvcm0sIG51bGwsIGxvZ2luTGlicmFyeS5sb2FkaW5nKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArIFwiIExMZW5lIHRvZG9zIGxvcyBjYW1wb3MgaW5kaWNhZG9zIHBhcmEgaW5ncmVzYXJcIilcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBwcm9jZXNzTG9naW5EYXRhOiBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgaWYgKHJlc3BvbnNlID09IHRydWUpIHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBCQVNFX1VSTCArICdhcHAvYWRtaW4vJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogXCJub25lXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfSU5GTyArIFwiIFVzdWFyaW8geSBDb250cmFzZcOxYSBubyB2YWxpZG9zXCIpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbnZhciBsb2dpbkxpYnJhcnkgPSB7XHJcbiAgbG9hZGluZzogZnVuY3Rpb24oc3RvcCkge1xyXG4gICAgaWYoIXN0b3Ape1xyXG4gICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCJcclxuICAgICAgICB9KTtcclxuICAgIH1lbHNle1xyXG4gICAgICAkKFwiLmxvYWRlclwiKS5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBcclxuICBzZW5kVG9Mb2dpbjogZnVuY3Rpb24oZSkge1xyXG4gICAga2V5ID0gZS53aGljaFxyXG4gICAgaWYgKGtleSA9PSAxMykge1xyXG4gICAgICBTZXNzaW9uLmxvZ2luKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICBsb2dpbkhhbmRsZXJzKCk7XHJcbn0pIiwiICBmdW5jdGlvbiBpc0N1cnJlbnRQYWdlKHBhZ2VOYW1lKXtcclxuICAgIGlmKGdldEN1cnJlbnRQYWdlKCkgPT0gcGFnZU5hbWUpe1xyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSAgXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRDdXJyZW50UGFnZSgpe1xyXG4gICAgdmFyIGN1cnJlbnRQYWdlID0gJChcInRpdGxlXCIpLnRleHQoKS5zcGxpdChcIiBcIik7XHJcbiAgICBjdXJyZW50UGFnZSA9IGN1cnJlbnRQYWdlWzRdLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlO1xyXG4gIH1cclxuXHJcbiAgaWYoaXNDdXJyZW50UGFnZShcImNpZXJyZVwiKSB8fCBpc0N1cnJlbnRQYWdlKFwiY2llcnJlMlwiKSl7XHJcbiAgICBjaWVycmVDYWphRnVuY3Rpb25zKCk7XHJcbiAgfVxyXG5cclxuICBpZihpc0N1cnJlbnRQYWdlKFwicmVwb3J0ZXNcIikpe1xyXG4gICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiAgICBzY3JpcHQuc3JjID0gQkFTRV9VUkwgKyBcImFzc2V0cy9qcy9taW4vcmVwb3J0ZXMubWluLmpzP3ZlcnNpb249NC4wLjIyXCI7XHJcbiAgICAkKFwiYm9keVwiKS5hcHBlbmQoc2NyaXB0KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNpZXJyZUNhamFGdW5jdGlvbnMoKXtcclxuICAgIFxyXG4gICAgdmFyIHRvdGFsZXMgPSB7XHJcbiAgICAgICAgICB0b3RhbDE6IDAsXHJcbiAgICAgICAgICB0b3RhbDU6IDAsXHJcbiAgICAgICAgICB0b3RhbDEwOiAwLFxyXG4gICAgICAgICAgdG90YWwyMDogMCxcclxuICAgICAgICAgIHRvdGFsMjU6IDAsXHJcbiAgICAgICAgICB0b3RhbDUwOiAwLFxyXG4gICAgICAgICAgdG90YWwxMDA6IDAsXHJcbiAgICAgICAgICB0b3RhbDIwMDogMCxcclxuICAgICAgICAgIHRvdGFsNTAwOiAwLFxyXG4gICAgICAgICAgdG90YWwxMDAwOiAwLFxyXG4gICAgICAgICAgdG90YWwyMDAwOiAwXHJcbiAgICAgICAgfVxyXG5cclxuICAgIHZhciBnYXN0byAgID0ge1xyXG4gICAgICAgICdmZWNoYSc6ICcnLFxyXG4gICAgICAgICdkZXNjcmlwY2lvbic6ICcnLFxyXG4gICAgICAgICdtb250byc6ICcnLFxyXG4gICAgICB9XHJcblxyXG4gICAgdmFyIGdhc3RvcyAgPSBbe2ZlY2hhOiBub3coKSxkZXNjcmlwY2lvbjpcImhvbGFcIixtb250bzogMjAwMCwgaWRfZ2FzdG86IDF9XVxyXG4gICAgdmFyIGF1dG9yICAgPSAkKCcjYXV0b3ItY2llcnJlJykudGV4dCgpLnRyaW0oKVxyXG5cclxuICAgIHZhciBhcHBDaWVycmUgPSBuZXcgVnVlKHtcclxuICAgICAgZWw6ICcjYXBwLWNpZXJyZScsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBpc0hpZGU6IGZhbHNlLFxyXG4gICAgICAgIGZlY2hhOiBub3coKSxcclxuICAgICAgICBkYXRhX2NpZXJyZTp7XHJcbiAgICAgICAgICBhdXRvcjogYXV0b3IsXHJcbiAgICAgICAgICBwYWdvc19mYWN0dXJhczogMCxcclxuICAgICAgICAgIHBhZ29zX2V4dHJhczogMCxcclxuICAgICAgICAgIHBhZ29zX2VmZWN0aXZvOiAwLFxyXG4gICAgICAgICAgcGFnb3NfYmFuY286IDAsXHJcbiAgICAgICAgICB0b3RhbF9pbmdyZXNvczogMCxcclxuICAgICAgICAgIGVmZWN0aXZvX2NhamE6IDAsXHJcbiAgICAgICAgICB0b3RhbF9kZXNjdWFkcmU6IDAsXHJcbiAgICAgICAgICB0b3RhbF9nYXN0b3M6IDAsXHJcbiAgICAgICAgICBiYW5jbzogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udGVvOnRvdGFsZXMsXHJcbiAgICAgICAgc3VtYTogMCxcclxuICAgICAgICBnYXN0bzogZ2FzdG8sXHJcbiAgICAgICAgZ2FzdG9zOiBnYXN0b3NcclxuICAgICAgfSxcclxuXHJcbiAgICAgIG1vdW50ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0R2FzdG9zKCk7XHJcbiAgICAgICAgdGhpcy5zZXRJbmdyZXNvcygpO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCcud2lsbC1sb2FkJykuY3NzKHt2aXNpYmlsaXR5OlwidmlzaWJsZVwifSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICBjdXJyZW5jeUZvcm1hdDogZnVuY3Rpb24obnVtYmVyKXtcclxuICAgICAgICAgIHJldHVybiBDdXJyZW5jeUZvcm1hdChudW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIG1ldGhvZHM6e1xyXG4gICAgICAgIGNoYW5nZVRvdGFsOiBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIHZhciB1bml0ID0gZS5zcmNFbGVtZW50LmF0dHJpYnV0ZXNbJ2RhdGEtdW5pdCddLnZhbHVlXHJcbiAgICAgICAgICB2YXIgY2FudGlkYWQgPSBlLnNyY0VsZW1lbnQudmFsdWVcclxuICAgICAgICAgIHZhciB0b3RhbCA9IGNhbnRpZGFkICogdW5pdFxyXG4gICAgICAgICAgdG90YWxlc1sndG90YWwnKyB1bml0XSA9IGNhbnRpZGFkICogdW5pdCAqIDEuMDAgICAgXHJcbiAgICAgICAgfSwgXHJcblxyXG4gICAgICAgIGFkZEdhc3RvOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICB2YXIgZ2FzdG8gPSB0aGlzLmdhc3RvO1xyXG4gICAgICAgICAgZ2FzdG8uZmVjaGEgPSBub3coKTtcclxuICAgICAgICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShnYXN0byk7XHJcbiAgICAgICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoIEJBU0VfVVJMICsgJ2NhamEvYWRkX2dhc3RvJyxmb3JtKVxyXG4gICAgICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhXHJcbiAgICAgICAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSlcclxuICAgICAgICAgICAgYXBwQ2llcnJlLmZpbGxHYXN0b3MoZGF0YS5nYXN0b3MsXCJub3JtYWxcIilcclxuICAgICAgICAgICAgYXBwQ2llcnJlLnNldEdhc3RvVG90YWwoZGF0YS50b3RhbF9nYXN0b3MpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbEdhc3RvczogZnVuY3Rpb24oZ2FzdG9zX3NlcnZpZG9yLG1vZGUpe1xyXG4gICAgICAgICAgaWYobW9kZSA9PSBcImdyb3VwXCIpe1xyXG4gICAgICAgICAgICBpZihnYXN0b3Nfc2Vydmlkb3IgIT0gbnVsbCB8fCBnYXN0b3Nfc2Vydmlkb3IubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgYXBwQ2llcnJlLmdhc3RvcyA9IGdhc3Rvc19zZXJ2aWRvcjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgYXBwQ2llcnJlLmdhc3RvcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYXBwQ2llcnJlLmdhc3Rvcy5wdXNoKEpTT04ucGFyc2UoZ2FzdG9zX3NlcnZpZG9yKVswXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0R2FzdG9Ub3RhbDogZnVuY3Rpb24odG90YWxHYXN0b3Mpe1xyXG4gICAgICAgICAgdGhpcy5kYXRhX2NpZXJyZS50b3RhbF9nYXN0b3MgPSB0b3RhbEdhc3Rvc1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldEdhc3RvOiBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIHZhciBnYXN0byA9IHRoaXMuZ2FzdG87XHJcbiAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZ2FzdG8pO1xyXG4gICAgICAgICAgY29ubmVjdEFuZFNlbmQoJ2NhamEvZ2V0X2dhc3RvJyxmYWxzZSxudWxsLGFwcENpZXJyZS5maWxsR2FzdG9zLGZvcm0sbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVsZXRlR2FzdG86IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICB2YXIgY2FsbGVyID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICBpZihjYWxsZXIubG9jYWxuYW1lID09IFwiaVwiKXtcclxuICAgICAgICAgICAgY2FsbGVyID0gY2FsbGVyLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgaWQgPSBjYWxsZXIuYXR0cmlidXRlc1snZGF0YS1pZCddLnZhbHVlXHJcbiAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgICAgdGV4dDogXCJTZWd1cm8gZGUgcXVlIHF1aWVyZSBlbGltaW5hciBlc3RlIGdhc3RvP1wiLFxyXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KHtpZDogaWQsIGZlY2hhOm5vdygpfSlcclxuICAgICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2NhamEvZGVsZXRlX2dhc3RvJyxmb3JtKVxyXG4gICAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSlcclxuICAgICAgICAgICAgICBhcHBDaWVycmUuZmlsbEdhc3RvcyhkYXRhLmdhc3RvcyxcImdyb3VwXCIpXHJcbiAgICAgICAgICAgICAgYXBwQ2llcnJlLnNldEdhc3RvVG90YWwoZGF0YS50b3RhbF9nYXN0b3MpIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pOyAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldEdhc3RvczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciBkYXRhID0ge2ZlY2hhOiBub3coKX1cclxuICAgICAgICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShkYXRhKVxyXG4gICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdjYWphL2dldF9nYXN0b3MnLGZvcm0pXHJcbiAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKVxyXG4gICAgICAgICAgICBhcHBDaWVycmUuZmlsbEdhc3RvcyhkYXRhLmdhc3RvcyxcImdyb3VwXCIpXHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5zZXRHYXN0b1RvdGFsKGRhdGEudG90YWxfZ2FzdG9zKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0SW5ncmVzb3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgZm9ybSA9ICdkYXRhPScgKyBKU09OLnN0cmluZ2lmeSh7ZmVjaGE6IG5vdygpfSlcclxuICAgICAgICAgIHZhciBzZWxmID0gdGhpcy5kYXRhX2NpZXJyZTtcclxuICAgICAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnY2FqYS9nZXRfaW5ncmVzb3MnLGZvcm0pXHJcbiAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgc2VsZi5wYWdvc19mYWN0dXJhcyA9IGRhdGEucGFnb3NfZmFjdHVyYXM7XHJcbiAgICAgICAgICAgIHNlbGYucGFnb3NfZXh0cmFzID0gZGF0YS5wYWdvc19leHRyYXM7XHJcbiAgICAgICAgICAgIHNlbGYucGFnb3NfZWZlY3Rpdm8gPSBkYXRhLnBhZ29zX2VmZWN0aXZvO1xyXG4gICAgICAgICAgICBzZWxmLnBhZ29zX2JhbmNvID0gZGF0YS5wYWdvc19iYW5jbztcclxuICAgICAgICAgICAgc2VsZi50b3RhbF9pbmdyZXNvcyA9IHBhcnNlRmxvYXQoZGF0YS5wYWdvc19mYWN0dXJhcykgKyBwYXJzZUZsb2F0KHNlbGYucGFnb3NfZXh0cmFzKTtcclxuICAgICAgICAgICAgc2VsZi50b3RhbF9kZXNjdWFkcmUgPSAtIHNlbGYucGFnb3NfZWZlY3Rpdm8gKyBzZWxmLmVmZWN0aXZvX2NhamE7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjZXJyYXJDYWphOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHNlbGYgICA9IHRoaXM7XHJcbiAgICAgICAgICB2YXIgY2llcnJlID0gdGhpcy5kYXRhX2NpZXJyZTtcclxuICAgICAgICAgIHdpbmRvdy5jaWVycmUgPSBjaWVycmU7XHJcbiAgICAgICAgICBpZihjaWVycmUudG90YWxfZGVzY3VhZHJlICE9IDApe1xyXG4gICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgICAgIHRleHQ6IFwiSGF5IHVuIGRlc2N1YWRyZSBlbiBsYSBjYWphLCBxdWllcmUgaGFjZXIgZWwgY2llcnJlIGRlIHRvZG9zIG1vZG9zP1wiLFxyXG4gICAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnU2knLFxyXG4gICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdObydcclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIHNlbGYuY2VycmFyKGNpZXJyZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzZWxmLmNlcnJhcihjaWVycmUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNlcnJhcjogZnVuY3Rpb24oY2llcnJlKXtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgY2llcnJlLmZlY2hhID0gbm93KCk7XHJcbiAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoY2llcnJlKTtcclxuICAgICAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnY2FqYS9hZGRfY2llcnJlJyxmb3JtKVxyXG4gICAgICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhXHJcbiAgICAgICAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSlcclxuICAgICAgICAgICAgc2VsZi5pc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBhcHBTdW1tYXJ5Vmlldy5pc0hpZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYXBwU3VtbWFyeVZpZXcuY2llcnJlID0gY2llcnJlO1xyXG4gICAgICAgICAgICAkKFwiI2FwcC1jaWVycmVcIikuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgJChcIi50b3AtbmF2XCIpLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICQoXCIjcHJpbnQtdmlld1wiKS5jc3Moe3Zpc2liaWxpdHk6IFwidmlzaWJsZVwifSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgY29tcHV0ZWQ6e1xyXG4gICAgICAgIGdldFRvdGFsOiBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIHZhciB0ID0gdG90YWxlcztcclxuICAgICAgICAgIHZhciBzZWxmID0gdGhpcy5kYXRhX2NpZXJyZTtcclxuICAgICAgICAgIHZhciBzdW1hID0gc3VtYXIoW3QudG90YWwxLHQudG90YWw1LHQudG90YWwxMCwgdC50b3RhbDIwLCB0LnRvdGFsMjUsIHQudG90YWw1MCwgdC50b3RhbDEwMCwgdC50b3RhbDIwMCwgdC50b3RhbDUwMCwgdC50b3RhbDEwMDAsIHQudG90YWwyMDAwXSk7XHJcbiAgICAgICAgICB0aGlzLnN1bWEgPSBzdW1hO1xyXG4gICAgICAgICAgc2VsZi5lZmVjdGl2b19jYWphID0gc3VtYS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgc2VsZi50b3RhbF9kZXNjdWFkcmUgPSBwYXJzZUZsb2F0KC1zZWxmLnBhZ29zX2VmZWN0aXZvKSArIHBhcnNlRmxvYXQoc2VsZi5lZmVjdGl2b19jYWphKTtcclxuICAgICAgICAgIHNlbGYuYmFuY28gPSBwYXJzZUZsb2F0KHNlbGYucGFnb3NfYmFuY28pICsgcGFyc2VGbG9hdChzZWxmLnBhZ29zX2VmZWN0aXZvKSAtIHBhcnNlRmxvYXQoc2VsZi50b3RhbF9nYXN0b3MpICsgcGFyc2VGbG9hdChzZWxmLnRvdGFsX2Rlc2N1YWRyZSlcclxuICAgICAgICAgIHJldHVybiB0aGlzLnN1bWE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVjaW1hbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgZmllbGRzID0gW1wicGFnb3NfZmFjdHVyYXNcIixcInBhZ29zX2V4dHJhXCIsXCJwYWdvc19lZmVjdGl2b1wiLFwicGFnb3NfYmFuY29cIixcInRvdGFsX2luZ3Jlc29zXCIsXCJlZmVjdGl2b19jYWphXCIsXCJ0b3RhbF9kZXNjdWFkcmVcIixcInRvdGFsX2dhc3RvXCIsXCJiYW5jb1wiXTtcclxuICAgICAgICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YV9jaWVycmVbZmllbGRdID0gdGhpcy5kYXRhX2NpZXJyZVtmaWVsZF0udG9GaXhlZCgyKVxyXG4gICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHdpbmRvdy5hcHBDaWVycmUgPSBhcHBDaWVycmU7XHJcbiAgICBmdW5jdGlvbiBzdW1hciAodmFsb3Jlcyl7XHJcbiAgICAgIHZhciBzdW1hID0gMDtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWxvcmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc3VtYSArPSBwYXJzZUZsb2F0KHZhbG9yZXNbaV0pOyBcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3VtYTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBub3coKXtcclxuICAgICAgcmV0dXJuIG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBWdWUuY29tcG9uZW50KCdzdW1tYXJ5LXByaW50LXZpZXcnLHtcclxuICAgIHRlbXBsYXRlOiAnXFxcclxuICAgIDxkaXYgY2xhc3M9XCJwcmludC1jb250YWluZXJcIj5cXFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiX19oZWFkZXJcIj5cXFxyXG4gICAgICA8aDIgY2xhc3M9XCJfX3RpdGxlIHQtY2VudGVyXCI+IHt7dGl0bGV9fTwvaDI+XFxcclxuICAgICAgPC9kaXY+XFxcclxuICAgICAgPGRpdiBjbGFzcz1cIl9fYm9keVwiPlxcXHJcbiAgICAgIDxwcmludGVhYmxlPjwvcHJpbnRlYWJsZT5cXFxyXG4gICAgICA8L2Rpdj5cXFxyXG4gICAgPGRpdj5cXFxyXG4gICAgXFxcclxuICAgICcsXHJcbiAgICBwcm9wczpbJ3NvbWV2YWx1ZSddLFxyXG4gICAgbWV0aG9kczp7XHJcbiAgICAgIGdvQmFjazogZnVuY3Rpb24oKXtcclxuICAgICAgICBhcHBTdW1tYXJ5Vmlldy5pc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgIHdpbmRvdy5hcHBDaWVycmUuaXNIaWRlID0gZmFsc2U7XHJcbiAgICAgICAgc2VsZi5pc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgICQoXCIudG9wLW5hdlwiKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICQoXCIjYXBwLWNpZXJyZVwiKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGF0YTogZnVuY3Rpb24oKXtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBiYWNrOiB7bGluazpcInNvbWVsaW5rXCIsdGV4dDpcInZvbHZlciBhIGNpZXJyZVwifSxcclxuICAgICAgICBmb3dhcmQ6IHtsaW5rOiBCQVNFX1VSTCArIFwiYXBwL2xvZ291dFwiLHRleHQ6XCJjZXJyYXIgc2Vzc2lvblwifSxcclxuICAgICAgICB0aXRsZTpcIlJlc3VtZW4gZGUgY2llcnJlIGRlIGhveVwiLFxyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIHZhciBhcHBTdW1tYXJ5VmlldyA9IG5ldyBWdWUoe1xyXG4gICAgZWw6IFwiI3ByaW50LXZpZXdcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgaXNIaWRlOiB0cnVlLFxyXG4gICAgICBiYWNrOiB7bGluazpcInNvbWVsaW5rXCIsdGV4dDpcInZvbHZlciBhIGNpZXJyZVwifSxcclxuICAgICAgZm93YXJkOiB7bGluazogQkFTRV9VUkwgKyBcImFwcC9sb2dvdXRcIix0ZXh0OlwiY2VycmFyIHNlc3Npb25cIn0sXHJcbiAgICAgIGNpZXJyZTp7XHJcbiAgICAgICAgICBhdXRvcjogJycsXHJcbiAgICAgICAgICBwYWdvc19mYWN0dXJhczogMCxcclxuICAgICAgICAgIHBhZ29zX2V4dHJhczogMCxcclxuICAgICAgICAgIHBhZ29zX2VmZWN0aXZvOiAwLFxyXG4gICAgICAgICAgcGFnb3NfYmFuY286IDAsXHJcbiAgICAgICAgICB0b3RhbF9pbmdyZXNvczogMCxcclxuICAgICAgICAgIGVmZWN0aXZvX2NhamE6IDAsXHJcbiAgICAgICAgICB0b3RhbF9kZXNjdWFkcmU6IDAsXHJcbiAgICAgICAgICB0b3RhbF9nYXN0b3M6IDAsXHJcbiAgICAgICAgICBiYW5jbzogMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBmaWx0ZXJzOiB7XHJcbiAgICAgIGN1cnJlbmN5Rm9ybWF0OiBmdW5jdGlvbihudW1iZXIpe1xyXG4gICAgICAgIHJldHVybiBcIlJEJCBcIisgQ3VycmVuY3lGb3JtYXQobnVtYmVyKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIHNwYW5pc2hEYXRlRm9ybWF0OiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICBtb21lbnQubG9jYWxlKCdlcy1ETycpO1xyXG4gICAgICAgIHJldHVybiBtb21lbnQoZGF0ZSkuZm9ybWF0KCdkZGRkIEREIFtkZV0gTU1NTSBbZGVsXSBZWVlZJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6e1xyXG4gICAgICBnb0JhY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYXBwU3VtbWFyeVZpZXcuaXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICB3aW5kb3cuYXBwQ2llcnJlLmlzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuaXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICAkKFwiLnRvcC1uYXZcIikucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAkKFwiI2FwcC1jaWVycmVcIikucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgfSxcclxuICAgICAgcHJpbnQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcHJpbnQoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSkiLCJ2YXIgbGlzdEV4dHJhcyA9ICcnO1xyXG52YXIgcmVjaWJvUmVzZXQgPSB7XHJcbiAgaWRfcGFnbzogMCxcclxuICBpZF9jb250cmF0bzogMCxcclxuICBpZF9zZXJ2aWNpbzogMCxcclxuICBpZF9lbXBsZWFkbzogMCxcclxuICBmZWNoYV9wYWdvIDogJycsXHJcbiAgY29uY2VwdG8gOiAnZXh0cmEnLFxyXG4gIGRldGFsbGVzX2V4dHJhIDogJycsXHJcbiAgY3VvdGE6ICcnLFxyXG4gIG1vcmEgOiAnJyxcclxuICBtb250b19leHRyYTogJycsXHJcbiAgdG90YWw6ICcnLFxyXG4gIGVzdGFkbzogJycsXHJcbiAgZmVjaGFfbGltaXRlOiAnJyxcclxuICBjb21wbGV0ZV9kYXRlIDogJycsXHJcbiAgZGVzY3VlbnRvOiAnJyxcclxuICByYXpvbl9kZXNjdWVudG86ICcnLFxyXG4gIGRldWRhOiAnJyxcclxuICBhYm9ub19hOiAnJyxcclxuICB0aXBvOiAnJyxcclxuICBnZW5lcmFkbzogJydcclxufVxyXG5cclxudmFyIGFwcFBhZ29FeHRyYSA9IG5ldyBWdWUoe1xyXG4gIGVsOiBcIiNhcHAtcGFnby1leHRyYVwiLFxyXG4gIGRhdGE6IHtcclxuICAgIHJlY2libzp7XHJcbiAgICAgICBpZF9wYWdvOiAwLFxyXG4gICAgICAgaWRfY29udHJhdG86IDAsXHJcbiAgICAgICBpZF9zZXJ2aWNpbzogMCxcclxuICAgICAgIGlkX2VtcGxlYWRvOiAwLFxyXG4gICAgICAgZmVjaGFfcGFnbyA6ICdkZC9tbS95eXl5JyxcclxuICAgICAgIGNvbmNlcHRvIDogJ2V4dHJhJyxcclxuICAgICAgIGRldGFsbGVzX2V4dHJhIDogJycsXHJcbiAgICAgICBjdW90YTogJycsXHJcbiAgICAgICBtb3JhIDogJycsXHJcbiAgICAgICBtb250b19leHRyYTogJycsXHJcbiAgICAgICB0b3RhbDogJycsXHJcbiAgICAgICBlc3RhZG86ICcnLFxyXG4gICAgICAgZmVjaGFfbGltaXRlOiAnJyxcclxuICAgICAgIGNvbXBsZXRlX2RhdGUgOiAnJyxcclxuICAgICAgIGRlc2N1ZW50bzogJycsXHJcbiAgICAgICByYXpvbl9kZXNjdWVudG86ICcnLFxyXG4gICAgICAgZGV1ZGE6ICcnLFxyXG4gICAgICAgYWJvbm9fYTogJycsXHJcbiAgICAgICB0aXBvOiAnJyxcclxuICAgICAgIGdlbmVyYWRvOiAnJ1xyXG4gICAgfSxcclxuXHJcbiAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgIGV4dHJhOntcclxuICAgICAgXCJjb250cm9sc1wiOiAnJyxcclxuICAgICAgXCJpZF9leHRyYVwiOiAnJyxcclxuICAgICAgXCJpZF9zZXJ2aWNpb1wiOiAnJyxcclxuICAgICAgXCJjaGVja2JveFwiOiAnJyxcclxuICAgICAgXCJmZWNoYVwiOiAnJyxcclxuICAgICAgXCJjb25jZXB0b1wiOiAnJyxcclxuICAgICAgXCJ1bHRpbW9fcGFnb1wiOiAnJyxcclxuICAgICAgXCJtb250b19wYWdhZG9cIjogJycsXHJcbiAgICAgIFwibW9udG9fdG90YWxcIjogJycsXHJcbiAgICAgIFwiZXN0YWRvXCI6ICcnXHJcbiAgICB9LFxyXG4gICAgZmlyc3RDb250cm9sczoge1xyXG4gICAgICBoaWRlOiBmYWxzZVxyXG4gICAgfSxcclxuICB9LFxyXG4gIGZpbHRlcnM6IHtcclxuXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgdXJsX3JlY2libzogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gQkFTRV9VUkwgKyAncHJvY2Vzcy9nZXRyZWNpYm8vJyArIHRoaXMucmVjaWJvLmlkX3BhZ287XHJcbiAgICB9LFxyXG5cclxuICAgIGhpZGVfcmVjaWJvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmKHRoaXMucmVjaWJvLmVzdGFkbyA9PSBcInBhZ2Fkb1wiKXtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICAgcmV0dXJuIHRoaXMuaGlkZV9yZWNpYm8gPSB0cnVlO1xyXG4gICAgICBcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBtZXRob2RzOntcclxuXHJcbiAgICBnb0JhY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZXh0cmFUYWJsZS5lbC5wYXJlbnRzKFwiLmJvb3RzdHJhcC10YWJsZVwiKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlXHJcbiAgICAgIHRoaXMuZXh0cmEgPSB7Y29uY2VwdG86ICcnfVxyXG4gICAgICBleHRyYVRhYmxlLnJlZnJlc2gobGlzdEV4dHJhcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdlbmVyYXRlUGF5bWVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgZm9ybSA9ICdkYXRhPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmV4dHJhKTtcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdleHRyYS9nZW5lcmF0ZV9leHRyYV9wYXltZW50Jyxmb3JtKTtcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpO1xyXG4gICAgICAgIHNlbGVjdEV4dHJhUGF5bWVudC5odG1sKGRhdGEucGFnb3MpLmNoYW5nZSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIFxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRQYXltZW50OiBmdW5jdGlvbiAoaWRfcGFnbykge1xyXG4gICAgICB2YXIgZm9ybSA9IFwiZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KHtpZF9wYWdvOiBpZF9wYWdvfSk7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoIEJBU0VfVVJMICsgJ2V4dHJhL2dldF9wYXltZW50Jyxmb3JtKTtcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YSBcclxuICAgICAgICBpZihkYXRhLnJlY2libyl7XHJcbiAgICAgICAgICBzZWxmLnJlY2libyA9IGRhdGEucmVjaWJvXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhcHBseVBheW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIHZhciByZWNpYm8gPSB0aGlzLnJlY2lib1xyXG4gICAgICB2YXIgaW5mbyA9IHtcclxuICAgICAgICBpZF9leHRyYTogcmVjaWJvLmlkX2V4dHJhLFxyXG4gICAgICAgIGlkX3BhZ286IHJlY2liby5pZF9wYWdvXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgIGNvbmNlcHRvOiAnZXh0cmEgLScsIFxyXG4gICAgICAgIGRldGFsbGVzX2V4dHJhOiByZWNpYm8uZGV0YWxsZXNfZXh0cmEsXHJcbiAgICAgICAgZmVjaGFfcGFnbzogcmVjaWJvLmZlY2hhX3BhZ28sXHJcbiAgICAgICAgY3VvdGE6IHJlY2liby5jdW90YSxcclxuICAgICAgICB0b3RhbDogcmVjaWJvLmN1b3RhLFxyXG4gICAgICAgIGVzdGFkbzogJ3BhZ2FkbycsXHJcbiAgICAgICAgdGlwbzogcmVjaWJvLnRpcG8sXHJcbiAgICAgICAgZ2VuZXJhZG86IHRydWVcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShkYXRhKSArICcmaW5mbz0nKyBKU09OLnN0cmluZ2lmeShpbmZvKVxyXG4gICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAnZXh0cmEvYXBwbHlfcGF5bWVudCcsZm9ybSlcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgbGlzdEV4dHJhcyA9IGRhdGEuZXh0cmFzO1xyXG4gICAgICAgIHNlbGYuZ2V0UGF5bWVudHMoc2VsZi5leHRyYS5pZF9leHRyYSk7XHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgfSlcclxuICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgZ2V0UGF5bWVudHM6IGZ1bmN0aW9uIChpZF9leHRyYSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgIHZhciBmb3JtID0gXCJkYXRhPVwiKyBKU09OLnN0cmluZ2lmeSh7aWRfZXh0cmE6IGlkX2V4dHJhfSlcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2V4dHJhL2dldF9leHRyYV9wYXltZW50X29mJywgZm9ybSlcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICBpZighZGF0YS5wYWdvcyl7XHJcbiAgICAgICAgICBzZWxmLnJlY2libyA9IHJlY2lib1Jlc2V0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGVjdEV4dHJhUGF5bWVudC5odG1sKGRhdGEucGFnb3MpLmNoYW5nZSgpXHJcblxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVQYXltZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgdmFyIHJlY2libyA9IHRoaXMucmVjaWJvXHJcbiAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICdpZF9leHRyYSc6IHJlY2liby5pZF9leHRyYSxcclxuICAgICAgICAnaWRfcGFnbyc6IHJlY2liby5pZF9wYWdvXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2V4dHJhL2RlbGV0ZV9wYXltZW50Jyxmb3JtKVxyXG4gICAgICBzZW5kLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpO1xyXG4gICAgICAgIHNlbGYuZ2V0UGF5bWVudHMoc2VsZi5leHRyYS5pZF9leHRyYSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuYnVzLiRvbigncm93LXNlbGVjdGVkJyxmdW5jdGlvbiAocm93KSB7XHJcbiAgZXh0cmFUYWJsZS5lbC5wYXJlbnRzKFwiLmJvb3RzdHJhcC10YWJsZVwiKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgYXBwUGFnb0V4dHJhLnZpc2libGUgPSB0cnVlXHJcbiAgYXBwUGFnb0V4dHJhLmV4dHJhID0gcm93XHJcbiAgbGlzdEV4dHJhcyA9IGV4dHJhVGFibGUuZWwuZmluZCgndGJvZHknKS5odG1sKCk7XHJcbiAgYXBwUGFnb0V4dHJhLmdldFBheW1lbnRzKHJvdy5pZF9leHRyYSk7XHJcbn0pXHJcblxyXG52YXIgc2VsZWN0RXh0cmFQYXltZW50ID0gJChcIiNzZWxlY3QtZXh0cmEtcGF5bWVudFwiKTtcclxuc2VsZWN0RXh0cmFQYXltZW50Lm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGlkX3BhZ28gPSBzZWxlY3RFeHRyYVBheW1lbnQudmFsKClcclxuICBhcHBQYWdvRXh0cmEuZ2V0UGF5bWVudChpZF9wYWdvKVxyXG59KSJdfQ==
