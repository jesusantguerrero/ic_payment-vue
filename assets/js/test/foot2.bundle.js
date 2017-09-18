var BASE_URL = window.location.origin + "/";
if(BASE_URL.includes("localhost") || BASE_URL.includes('ngrok.io')){
  BASE_URL += 'icpayment/';
}

var MESSAGE_SUCCESS = '<i class="material-icons">done_all</i>';
var MESSAGE_ERROR   = '<i class="material-icons">error_outline</i>';
var MESSAGE_INFO    = '<i class="material-icons">info_outline</i>';
var SUMMER_SKY      = '#1FA1D0'

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
$(function(){
  var currentPage = $("title").text().split(" ");
  currentPage   = currentPage[4].toLowerCase().trim();
  if(currentPage == "administrador") {
    newUserForm();
  }
  getDate();
  adminFunctions();
  userInfoTip();
  makeServiceCardClickable();
  detailsFunctions();
  notificationFunctions();
  newContractFunctions();
  checkWindowSize();
  $(window).on('resize',function(){
    checkWindowSize();
  })
  
/**
 * Get Date:
 * Obtiene la fecha actual al segundo y la muestra en la pantalla de inicio
 * @return {void}
 */
function getDate(){
  var $day = $('.day');
  var $monthYear = $('.month-year');
  var $dayWeek = $('.dayweek');
  var $Hora = $('.hour span');
  var date,day,month,year,sHour;
  var days = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
  var months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  setInterval(updateHour,1000);

  function updateHour(){
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

function adminFunctions(){
  $('#company-section').animate({left:"0"},200)
  $('.administrador .aside-buttons a').on('click',function(e){
    e.preventDefault();
    var $this = $(this);
    var cardName = $this.attr('href').slice(1);
    if(cardName != null){
      $('.company-details').animate({left:"-110%"},200)
      $('#'+cardName+'.company-details').animate({left:"0"},200)
    }  
  })

  if($("#acount-section").length > 0){
    $('#acount-section').animate({left:"0"},200)
  }
}

/**
 * new User Form:
 * vaida las contraseñas en los formularios de los usuarios
 * @return {void}
 */
function newUserForm(){
  validateModal("#new-user-modal");
  validateModal("#update-user-modal");
}

/**
 * User Info Tip
 * hace un toggle en la visibilidad de la info del usuario
 * @return {void}
 */
function userInfoTip(){
  var infoTip = $(".user-info-tip");
  var profilePicture = $(".profile-picture");
  var btnMore = $(".btn-more");

  btnMore.on('click',function(e){
    infoTip.toggleClass("visible");
  });
}
});

function newContractFunctions(){
  var btnPrintContract = $("#btn-print-contract");
  var document = $(".note-item");
  var radioActivateContract = $("#radio-new-contract");
  var radioDisableContract = $("#radio-just-requirement");
  var contractControls = $(".contract-controls");
  var requirementControls = $(".requirement-controls");

  radioActivateContract.parents("label").on('click',function(){
   activateContractMode(); 

  });

  radioDisableContract.parents("label").on('click',function(){
    disableContractMode()
  });

  function activateContractMode($btn){
    radioDisableContract
      .removeAttr("checked","")
      .html("")
    radioActivateContract
      .attr("checked","")
      .html("&#10004;")
    document.removeClass("print-requirement");
    contractControls.removeClass("hide")
    requirementControls.addClass("hide")
    
  }

  function disableContractMode($btn){
    radioActivateContract
      .removeAttr("checked","")
      .html("")
    radioDisableContract
      .attr("checked","")
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
  if(!title) title = "Buscar Cliente"
  if(title.toLowerCase().trim() == "registrar pago"){
    buttonText = "ir a Pagos"
  }else{
    buttonText = "Nuevo Contrato"
  }
  
  var modal = $(this)
  modal.find('.modal-title').text(title)
  modal.find('.modal-footer .save').text(buttonText)
  modal.find('tbody').html('')
})



/********************************************************
*              other functions                            
*                                                       *
********************************************************/

function detailsFunctions(){
  var smallButtonsSelect = $('.btn-small');
  var tabs = {
    contractControls : ["#contracts","#month-and-date","#reconnect-service",'#extra-contract','#extra-service','#extra-extension','#extra-upgrade'],
    paymentControls: ["#payments", "#detalles_de_pago","#descuento"] 
  }

  $('[role="tab"]').on('click',function(){
    var href = $(this).attr("href")
    
    if(compare(href,tabs.paymentControls)) {
      $(".payment-controls").addClass("visible");
    }else{
      $(".payment-controls").removeClass("visible");
    }

    
    if(compare(href,tabs.contractControls)){
      $(".contract-controls").removeClass("hide")
    }else{
      $(".contract-controls").addClass("hide")
    }

    getTabControls($(this));
  });

  $('.btn-small').on('click',function(){
    smallButtonsSelect.removeClass('selected');
    $(this).addClass('selected');
  })

  function compare(value, posibleValues){
    var returnValue = false;
    posibleValues.forEach( function(theValue) {
      if(value == theValue){
        console.log(value + ' igual a ' + theValue + ' ?');
        returnValue = true;
      }
    }, this);
    
    return returnValue;
  }
}

function getTabControls($this){
  var controls = $this.attr("aria-controls");
  $(".dynamic-controls").text(controls);
}

function notificationFunctions(){
  var btnAverias      = $("#btn-see-averias");
  var btnPagos        = $("#btn-see-pagos");
  var btnCajaChica    = $('#btn-see-caja');
  var btnDeudores     = $("#btn-see-deudores")
  var btnDayIncomes   = $("#btn-see-day-incomes")
  var layoutContainer = $(".layout-container");

  btnAverias.on('click',function(){
    layoutContainer.animate({left:"-100%"},200);
  });

  btnPagos.on('click',function(){
    layoutContainer.animate({left:"0"},200);
  });

  btnDeudores.on('click',function(){
    layoutContainer.animate({left:"-200%"},200);
  });

   btnDayIncomes.on('click',function(){
    layoutContainer.animate({left:"-300%"},200);
  });
}

$("#select-extra-service").on('change',function(){
  var $this = $(("#select-extra-service :selected"));
  var cost = $this.attr("data-payment");
  
  $("#extra-service-cost").val(cost)
});

$("#extra-client-contract").on('change',function(){
  var $this = $(("#extra-client-contract :selected"));
  
  $("#extra-contract-service").val($this.attr("data-service"));
  $("#extra-equipo").val($this.attr("data-equipment"));
  $("#extra-router").val($this.attr("data-router"));
  $("#extra-e-mac").val($this.attr("data-e-mac"));
  $("#extra-r-mac").val($this.attr("data-r-mac"));
  $("#extra-code").val($this.attr("data-code"));
});

$(".columns-right").removeClass("pull-right");

$("#select-contract-code").on('change',function(){
  var $this = $(("#select-contract-code :selected"));
  $("#contract-ip").val($this.attr("data-ip-final"));
  $("#u-contract-ip").val($this.attr("data-ip-final"));
 
});

function checkWindowSize() {
  var width = window.screen.availWidth;
  var brandName = document.querySelector('.brand span');
  
  if(width <= 1100){
    brandName.textContent = "P";
  }else{
    brandName.textContent = "Payment";
  }
}

$(window).scroll(function () {
  position = $(window).scrollTop()
  movableNav = $('.aside-nav-container, .aside-wide-left')

  if(position >= 50){
    movableNav.addClass('moved')
  }else{
    movableNav.removeClass('moved')
  }
})
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
    console.log(data);
    console.log(data.mensaje);
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
    console.log(contractId)
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
    var pago          = JSON.parse(content);
    this.id_contrato  = pago['id_contrato'];
    this.id_pago     = pago['id_pago']
    var $concepto     = $("#payment-concept");
    var $fechaLimite  = $("#payment-limit-date");
    var $cuota        = $("#payment-cuota");
    var $mora         = $("#payment-mora");
    var $extra        = $("#payment-extra");
    var $total        = $("#payment-total");
    var $descuento    = $("#payment-discount-amount");
    var $razon        = $("#payment-discount-reason");
    var $modal        = $("#advanced-payment");

    $concepto.val(pago['concepto']);
    $fechaLimite.val(pago['fecha_limite']);
    $cuota.val(pago['cuota']);
    $mora.val(pago['mora']);
    $extra.val(pago['monto_extra']);
    $total.val(pago['total']);
    interactiveSum();

    $modal.modal();
    $modal.on('hide.bs.modal',function(){
      $modal.find('input').val('')
    });
    $("#btn-apply-discount").on('click', function (e) {
      e.stopImmediatePropagation();
      swal({
          title: 'Está Seguro?',
          text: "Seguro de que quiere aplicar este descuento de " + $descuento.val() + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
          applyDiscount(id_pago);
          $modal.hide();
          $modal.modal('hide');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
 
        });
    });

    function applyDiscount(id_pago) {
      var date = moment().format("YYYY-MM-DD");
      form = 'id_pago=' + id_pago + '&id_contrato=' + id_contrato + "&cuota=" + $cuota.val();
      form += "&mora=" + $mora.val() + "&monto_extra=" + $extra.val();
      form += "&total=" + $total.val() + '&descuento=' + $descuento.val() + '&razon_descuento=' +$razon.val() + '&fecha_pago=' + date ;
      form += "&tabla=discount_pagos";
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

  edit: function(content){
    var pago          = JSON.parse(content);
    this.id_contrato  = pago['id_contrato'];
    this.id_pago      = pago['id_pago']
    var $modal        = $('#edit-payment-modal') 
    console.log(pago)

    $modal.modal();

    $modal.on('hide.bs.modal',function(){
      $modal.find('input').val('')
    });

    $("#btn-save-edited-payment").on('click', function (e) {
      e.stopImmediatePropagation();
      swal({
          title: 'Está Seguro?',
          text: "Seguro de que quiere aplicar este descuento de " + $descuento.val() + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
          applyDiscount(id_pago);
          $modal.hide();
          $modal.modal('hide');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
 
        });
    });
  }
  
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
    settingsAperturaCaja = $("#settings-apertura-caja").val(),
    settingsPenalizacionCancelacion = $("#settings-penalizacion-cancelacion").val(),
    settingsMesesPorDefecto = $("#settings-meses-por-defecto").val(),
    settingsSplitDay = $("#settings-split-day").val();

    form = 'cargo_mora=' + settingsCargoMora + '&fecha_corte=' + settingsFechaCorte + '&apertura_caja=' + settingsAperturaCaja;
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
      console.log(filter)

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
              console.log([gastos_servidor]);
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
/*! AdminLTE app.js
* ================
* Main JS application file for AdminLTE v2. This file
* should be included in all pages. It controls some layout
* options and implements exclusive AdminLTE plugins.
*
* @Author  Almsaeed Studio
* @Support <https://www.almsaeedstudio.com>
* @Email   <abdullah@almsaeedstudio.com>
* @version 2.4.0
* @repository git://github.com/almasaeed2010/AdminLTE.git
* @license MIT <http://opensource.org/licenses/MIT>
*/
if("undefined"==typeof jQuery)throw new Error("AdminLTE requires jQuery");+function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var h=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new g(h))}if("string"==typeof b){if(void 0===f[b])throw new Error("No method named "+b);f[b]()}})}var c="lte.layout",d={slimscroll:!0,resetHeight:!0},e={wrapper:".wrapper",contentWrapper:".content-wrapper",layoutBoxed:".layout-boxed",mainFooter:".main-footer",mainHeader:".main-header",sidebar:".sidebar",controlSidebar:".control-sidebar",fixed:".fixed",sidebarMenu:".sidebar-menu",logo:".main-header .logo"},f={fixed:"fixed",holdTransition:"hold-transition"},g=function(a){this.options=a,this.bindedResize=!1,this.activate()};g.prototype.activate=function(){this.fix(),this.fixSidebar(),a("body").removeClass(f.holdTransition),this.options.resetHeight&&a("body, html, "+e.wrapper).css({height:"auto","min-height":"100%"}),this.bindedResize||(a(window).resize(function(){this.fix(),this.fixSidebar(),a(e.logo+", "+e.sidebar).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){this.fix(),this.fixSidebar()}.bind(this))}.bind(this)),this.bindedResize=!0),a(e.sidebarMenu).on("expanded.tree",function(){this.fix(),this.fixSidebar()}.bind(this)),a(e.sidebarMenu).on("collapsed.tree",function(){this.fix(),this.fixSidebar()}.bind(this))},g.prototype.fix=function(){a(e.layoutBoxed+" > "+e.wrapper).css("overflow","hidden");var b=a(e.mainFooter).outerHeight()||0,c=a(e.mainHeader).outerHeight()+b,d=a(window).height(),g=a(e.sidebar).height()||0;if(a("body").hasClass(f.fixed))a(e.contentWrapper).css("min-height",d-b);else{var h;d>=g?(a(e.contentWrapper).css("min-height",d-c),h=d-c):(a(e.contentWrapper).css("min-height",g),h=g);var i=a(e.controlSidebar);void 0!==i&&i.height()>h&&a(e.contentWrapper).css("min-height",i.height())}},g.prototype.fixSidebar=function(){if(!a("body").hasClass(f.fixed))return void(void 0!==a.fn.slimScroll&&a(e.sidebar).slimScroll({destroy:!0}).height("auto"));this.options.slimscroll&&void 0!==a.fn.slimScroll&&(a(e.sidebar).slimScroll({destroy:!0}).height("auto"),a(e.sidebar).slimScroll({height:a(window).height()-a(e.mainHeader).height()+"px",color:"rgba(0,0,0,0.2)",size:"3px"}))};var h=a.fn.layout;a.fn.layout=b,a.fn.layout.Constuctor=g,a.fn.layout.noConflict=function(){return a.fn.layout=h,this},a(window).on("load",function(){b.call(a("body"))})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var g=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new h(g))}"toggle"==b&&f.toggle()})}var c="lte.pushmenu",d={collapseScreenSize:767,expandOnHover:!1,expandTransitionDelay:200},e={collapsed:".sidebar-collapse",open:".sidebar-open",mainSidebar:".main-sidebar",contentWrapper:".content-wrapper",searchInput:".sidebar-form .form-control",button:'[data-toggle="push-menu"]',mini:".sidebar-mini",expanded:".sidebar-expanded-on-hover",layoutFixed:".fixed"},f={collapsed:"sidebar-collapse",open:"sidebar-open",mini:"sidebar-mini",expanded:"sidebar-expanded-on-hover",expandFeature:"sidebar-mini-expand-feature",layoutFixed:"fixed"},g={expanded:"expanded.pushMenu",collapsed:"collapsed.pushMenu"},h=function(a){this.options=a,this.init()};h.prototype.init=function(){(this.options.expandOnHover||a("body").is(e.mini+e.layoutFixed))&&(this.expandOnHover(),a("body").addClass(f.expandFeature)),a(e.contentWrapper).click(function(){a(window).width()<=this.options.collapseScreenSize&&a("body").hasClass(f.open)&&this.close()}.bind(this)),a(e.searchInput).click(function(a){a.stopPropagation()})},h.prototype.toggle=function(){var b=a(window).width(),c=!a("body").hasClass(f.collapsed);b<=this.options.collapseScreenSize&&(c=a("body").hasClass(f.open)),c?this.close():this.open()},h.prototype.open=function(){a(window).width()>this.options.collapseScreenSize?a("body").removeClass(f.collapsed).trigger(a.Event(g.expanded)):a("body").addClass(f.open).trigger(a.Event(g.expanded))},h.prototype.close=function(){a(window).width()>this.options.collapseScreenSize?a("body").addClass(f.collapsed).trigger(a.Event(g.collapsed)):a("body").removeClass(f.open+" "+f.collapsed).trigger(a.Event(g.collapsed))},h.prototype.expandOnHover=function(){a(e.mainSidebar).hover(function(){a("body").is(e.mini+e.collapsed)&&a(window).width()>this.options.collapseScreenSize&&this.expand()}.bind(this),function(){a("body").is(e.expanded)&&this.collapse()}.bind(this))},h.prototype.expand=function(){setTimeout(function(){a("body").removeClass(f.collapsed).addClass(f.expanded)},this.options.expandTransitionDelay)},h.prototype.collapse=function(){setTimeout(function(){a("body").removeClass(f.expanded).addClass(f.collapsed)},this.options.expandTransitionDelay)};var i=a.fn.pushMenu;a.fn.pushMenu=b,a.fn.pushMenu.Constructor=h,a.fn.pushMenu.noConflict=function(){return a.fn.pushMenu=i,this},a(document).on("click",e.button,function(c){c.preventDefault(),b.call(a(this),"toggle")}),a(window).on("load",function(){b.call(a(e.button))})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this);if(!e.data(c)){var f=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,new h(e,f))}})}var c="lte.tree",d={animationSpeed:500,accordion:!0,followLink:!1,trigger:".treeview a"},e={tree:".tree",treeview:".treeview",treeviewMenu:".treeview-menu",open:".menu-open, .active",li:"li",data:'[data-widget="tree"]',active:".active"},f={open:"menu-open",tree:"tree"},g={collapsed:"collapsed.tree",expanded:"expanded.tree"},h=function(b,c){this.element=b,this.options=c,a(this.element).addClass(f.tree),a(e.treeview+e.active,this.element).addClass(f.open),this._setUpListeners()};h.prototype.toggle=function(a,b){var c=a.next(e.treeviewMenu),d=a.parent(),g=d.hasClass(f.open);d.is(e.treeview)&&(this.options.followLink&&"#"!=a.attr("href")||b.preventDefault(),g?this.collapse(c,d):this.expand(c,d))},h.prototype.expand=function(b,c){var d=a.Event(g.expanded);if(this.options.accordion){var h=c.siblings(e.open),i=h.children(e.treeviewMenu);this.collapse(i,h)}c.addClass(f.open),b.slideDown(this.options.animationSpeed,function(){a(this.element).trigger(d)}.bind(this))},h.prototype.collapse=function(b,c){var d=a.Event(g.collapsed);b.find(e.open).removeClass(f.open),c.removeClass(f.open),b.slideUp(this.options.animationSpeed,function(){b.find(e.open+" > "+e.treeview).slideUp(),a(this.element).trigger(d)}.bind(this))},h.prototype._setUpListeners=function(){var b=this;a(this.element).on("click",this.options.trigger,function(c){b.toggle(a(this),c)})};var i=a.fn.tree;a.fn.tree=b,a.fn.tree.Constructor=h,a.fn.tree.noConflict=function(){return a.fn.tree=i,this},a(window).on("load",function(){a(e.data).each(function(){b.call(a(this))})})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var g=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new h(e,g))}"string"==typeof b&&f.toggle()})}var c="lte.controlsidebar",d={slide:!0},e={sidebar:".control-sidebar",data:'[data-toggle="control-sidebar"]',open:".control-sidebar-open",bg:".control-sidebar-bg",wrapper:".wrapper",content:".content-wrapper",boxed:".layout-boxed"},f={open:"control-sidebar-open",fixed:"fixed"},g={collapsed:"collapsed.controlsidebar",expanded:"expanded.controlsidebar"},h=function(a,b){this.element=a,this.options=b,this.hasBindedResize=!1,this.init()};h.prototype.init=function(){a(this.element).is(e.data)||a(this).on("click",this.toggle),this.fix(),a(window).resize(function(){this.fix()}.bind(this))},h.prototype.toggle=function(b){b&&b.preventDefault(),this.fix(),a(e.sidebar).is(e.open)||a("body").is(e.open)?this.collapse():this.expand()},h.prototype.expand=function(){this.options.slide?a(e.sidebar).addClass(f.open):a("body").addClass(f.open),a(this.element).trigger(a.Event(g.expanded))},h.prototype.collapse=function(){a("body, "+e.sidebar).removeClass(f.open),a(this.element).trigger(a.Event(g.collapsed))},h.prototype.fix=function(){a("body").is(e.boxed)&&this._fixForBoxed(a(e.bg))},h.prototype._fixForBoxed=function(b){b.css({position:"absolute",height:a(e.wrapper).height()})};var i=a.fn.controlSidebar;a.fn.controlSidebar=b,a.fn.controlSidebar.Constructor=h,a.fn.controlSidebar.noConflict=function(){return a.fn.controlSidebar=i,this},a(document).on("click",e.data,function(c){c&&c.preventDefault(),b.call(a(this),"toggle")})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var g=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new h(e,g))}if("string"==typeof b){if(void 0===f[b])throw new Error("No method named "+b);f[b]()}})}var c="lte.boxwidget",d={animationSpeed:500,collapseTrigger:'[data-widget="collapse"]',removeTrigger:'[data-widget="remove"]',collapseIcon:"fa-minus",expandIcon:"fa-plus",removeIcon:"fa-times"},e={data:".box",collapsed:".collapsed-box",body:".box-body",footer:".box-footer",tools:".box-tools"},f={collapsed:"collapsed-box"},g={collapsed:"collapsed.boxwidget",expanded:"expanded.boxwidget",removed:"removed.boxwidget"},h=function(a,b){this.element=a,this.options=b,this._setUpListeners()};h.prototype.toggle=function(){a(this.element).is(e.collapsed)?this.expand():this.collapse()},h.prototype.expand=function(){var b=a.Event(g.expanded),c=this.options.collapseIcon,d=this.options.expandIcon;a(this.element).removeClass(f.collapsed),a(this.element).find(e.tools).find("."+d).removeClass(d).addClass(c),a(this.element).find(e.body+", "+e.footer).slideDown(this.options.animationSpeed,function(){a(this.element).trigger(b)}.bind(this))},h.prototype.collapse=function(){var b=a.Event(g.collapsed),c=this.options.collapseIcon,d=this.options.expandIcon;a(this.element).find(e.tools).find("."+c).removeClass(c).addClass(d),a(this.element).find(e.body+", "+e.footer).slideUp(this.options.animationSpeed,function(){a(this.element).addClass(f.collapsed),a(this.element).trigger(b)}.bind(this))},h.prototype.remove=function(){var b=a.Event(g.removed);a(this.element).slideUp(this.options.animationSpeed,function(){a(this.element).trigger(b),a(this.element).remove()}.bind(this))},h.prototype._setUpListeners=function(){var b=this;a(this.element).on("click",this.options.collapseTrigger,function(a){a&&a.preventDefault(),b.toggle()}),a(this.element).on("click",this.options.removeTrigger,function(a){a&&a.preventDefault(),b.remove()})};var i=a.fn.boxWidget;a.fn.boxWidget=b,a.fn.boxWidget.Constructor=h,a.fn.boxWidget.noConflict=function(){return a.fn.boxWidget=i,this},a(window).on("load",function(){a(e.data).each(function(){b.call(a(this))})})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var h=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new g(e,h))}if("string"==typeof f){if(void 0===f[b])throw new Error("No method named "+b);f[b]()}})}var c="lte.todolist",d={iCheck:!1,onCheck:function(){},onUnCheck:function(){}},e={data:'[data-widget="todo-list"]'},f={done:"done"},g=function(a,b){this.element=a,this.options=b,this._setUpListeners()};g.prototype.toggle=function(a){if(a.parents(e.li).first().toggleClass(f.done),!a.prop("checked"))return void this.unCheck(a);this.check(a)},g.prototype.check=function(a){this.options.onCheck.call(a)},g.prototype.unCheck=function(a){this.options.onUnCheck.call(a)},g.prototype._setUpListeners=function(){var b=this;a(this.element).on("change ifChanged","input:checkbox",function(){b.toggle(a(this))})};var h=a.fn.todoList;a.fn.todoList=b,a.fn.todoList.Constructor=g,a.fn.todoList.noConflict=function(){return a.fn.todoList=h,this},a(window).on("load",function(){a(e.data).each(function(){b.call(a(this))})})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data(c);e||d.data(c,e=new f(d)),"string"==typeof b&&e.toggle(d)})}var c="lte.directchat",d={data:'[data-widget="chat-pane-toggle"]',box:".direct-chat"},e={open:"direct-chat-contacts-open"},f=function(a){this.element=a};f.prototype.toggle=function(a){a.parents(d.box).first().toggleClass(e.open)};var g=a.fn.directChat;a.fn.directChat=b,a.fn.directChat.Constructor=f,a.fn.directChat.noConflict=function(){return a.fn.directChat=g,this},a(document).on("click",d.data,function(c){c&&c.preventDefault(),b.call(a(this),"toggle")})}(jQuery);
/**
* @license Input Mask plugin for jquery
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 0.0.0
*/
(function ($) {
    if ($.fn.inputmask === undefined) {
        //helper functions    
        function isInputEventSupported(eventName) {
            var el = document.createElement('input'),
            eventName = 'on' + eventName,
            isSupported = (eventName in el);
            if (!isSupported) {
                el.setAttribute(eventName, 'return;');
                isSupported = typeof el[eventName] == 'function';
            }
            el = null;
            return isSupported;
        }
        function resolveAlias(aliasStr, options, opts) {
            var aliasDefinition = opts.aliases[aliasStr];
            if (aliasDefinition) {
                if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); //alias is another alias
                $.extend(true, opts, aliasDefinition);  //merge alias definition in the options
                $.extend(true, opts, options);  //reapply extra given options
                return true;
            }
            return false;
        }
        function generateMaskSets(opts) {
            var ms = [];
            var genmasks = []; //used to keep track of the masks that where processed, to avoid duplicates
            function getMaskTemplate(mask) {
                if (opts.numericInput) {
                    mask = mask.split('').reverse().join('');
                }
                var escaped = false, outCount = 0, greedy = opts.greedy, repeat = opts.repeat;
                if (repeat == "*") greedy = false;
                //if (greedy == true && opts.placeholder == "") opts.placeholder = " ";
                if (mask.length == 1 && greedy == false && repeat != 0) { opts.placeholder = ""; } //hide placeholder with single non-greedy mask
                var singleMask = $.map(mask.split(""), function (element, index) {
                    var outElem = [];
                    if (element == opts.escapeChar) {
                        escaped = true;
                    }
                    else if ((element != opts.optionalmarker.start && element != opts.optionalmarker.end) || escaped) {
                        var maskdef = opts.definitions[element];
                        if (maskdef && !escaped) {
                            for (var i = 0; i < maskdef.cardinality; i++) {
                                outElem.push(opts.placeholder.charAt((outCount + i) % opts.placeholder.length));
                            }
                        } else {
                            outElem.push(element);
                            escaped = false;
                        }
                        outCount += outElem.length;
                        return outElem;
                    }
                });

                //allocate repetitions
                var repeatedMask = singleMask.slice();
                for (var i = 1; i < repeat && greedy; i++) {
                    repeatedMask = repeatedMask.concat(singleMask.slice());
                }

                return { "mask": repeatedMask, "repeat": repeat, "greedy": greedy };
            }
            //test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, offset: int, casing: null/upper/lower, def: definitionSymbol}
            function getTestingChain(mask) {
                if (opts.numericInput) {
                    mask = mask.split('').reverse().join('');
                }
                var isOptional = false, escaped = false;
                var newBlockMarker = false; //indicates wheter the begin/ending of a block should be indicated

                return $.map(mask.split(""), function (element, index) {
                    var outElem = [];

                    if (element == opts.escapeChar) {
                        escaped = true;
                    } else if (element == opts.optionalmarker.start && !escaped) {
                        isOptional = true;
                        newBlockMarker = true;
                    }
                    else if (element == opts.optionalmarker.end && !escaped) {
                        isOptional = false;
                        newBlockMarker = true;
                    }
                    else {
                        var maskdef = opts.definitions[element];
                        if (maskdef && !escaped) {
                            var prevalidators = maskdef["prevalidator"], prevalidatorsL = prevalidators ? prevalidators.length : 0;
                            for (var i = 1; i < maskdef.cardinality; i++) {
                                var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator["validator"], cardinality = prevalidator["cardinality"];
                                outElem.push({ fn: validator ? typeof validator == 'string' ? new RegExp(validator) : new function () { this.test = validator; } : new RegExp("."), cardinality: cardinality ? cardinality : 1, optionality: isOptional, newBlockMarker: isOptional == true ? newBlockMarker : false, offset: 0, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element });
                                if (isOptional == true) //reset newBlockMarker
                                    newBlockMarker = false;
                            }
                            outElem.push({ fn: maskdef.validator ? typeof maskdef.validator == 'string' ? new RegExp(maskdef.validator) : new function () { this.test = maskdef.validator; } : new RegExp("."), cardinality: maskdef.cardinality, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element });
                        } else {
                            outElem.push({ fn: null, cardinality: 0, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: null, def: element });
                            escaped = false;
                        }
                        //reset newBlockMarker
                        newBlockMarker = false;
                        return outElem;
                    }
                });
            }
            function markOptional(maskPart) { //needed for the clearOptionalTail functionality
                return opts.optionalmarker.start + maskPart + opts.optionalmarker.end;
            }
            function splitFirstOptionalEndPart(maskPart) {
                var optionalStartMarkers = 0, optionalEndMarkers = 0, mpl = maskPart.length;
                for (var i = 0; i < mpl; i++) {
                    if (maskPart.charAt(i) == opts.optionalmarker.start) {
                        optionalStartMarkers++;
                    }
                    if (maskPart.charAt(i) == opts.optionalmarker.end) {
                        optionalEndMarkers++;
                    }
                    if (optionalStartMarkers > 0 && optionalStartMarkers == optionalEndMarkers)
                        break;
                }
                var maskParts = [maskPart.substring(0, i)];
                if (i < mpl) {
                    maskParts.push(maskPart.substring(i + 1, mpl));
                }
                return maskParts;
            }
            function splitFirstOptionalStartPart(maskPart) {
                var mpl = maskPart.length;
                for (var i = 0; i < mpl; i++) {
                    if (maskPart.charAt(i) == opts.optionalmarker.start) {
                        break;
                    }
                }
                var maskParts = [maskPart.substring(0, i)];
                if (i < mpl) {
                    maskParts.push(maskPart.substring(i + 1, mpl));
                }
                return maskParts;
            }
            function generateMask(maskPrefix, maskPart, metadata) {
                var maskParts = splitFirstOptionalEndPart(maskPart);
                var newMask, maskTemplate;

                var masks = splitFirstOptionalStartPart(maskParts[0]);
                if (masks.length > 1) {
                    newMask = maskPrefix + masks[0] + markOptional(masks[1]) + (maskParts.length > 1 ? maskParts[1] : "");
                    if ($.inArray(newMask, genmasks) == -1 && newMask != "") {
                        genmasks.push(newMask);
                        maskTemplate = getMaskTemplate(newMask);
                        ms.push({
                            "mask": newMask,
                            "_buffer": maskTemplate["mask"],
                            "buffer": maskTemplate["mask"].slice(),
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": -1,
                            "greedy": maskTemplate["greedy"],
                            "repeat": maskTemplate["repeat"],
                            "metadata": metadata
                        });
                    }
                    newMask = maskPrefix + masks[0] + (maskParts.length > 1 ? maskParts[1] : "");
                    if ($.inArray(newMask, genmasks) == -1 && newMask != "") {
                        genmasks.push(newMask);
                        maskTemplate = getMaskTemplate(newMask);
                        ms.push({
                            "mask": newMask,
                            "_buffer": maskTemplate["mask"],
                            "buffer": maskTemplate["mask"].slice(),
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": -1,
                            "greedy": maskTemplate["greedy"],
                            "repeat": maskTemplate["repeat"],
                            "metadata": metadata
                        });
                    }
                    if (splitFirstOptionalStartPart(masks[1]).length > 1) { //optional contains another optional
                        generateMask(maskPrefix + masks[0], masks[1] + maskParts[1], metadata);
                    }
                    if (maskParts.length > 1 && splitFirstOptionalStartPart(maskParts[1]).length > 1) {
                        generateMask(maskPrefix + masks[0] + markOptional(masks[1]), maskParts[1], metadata);
                        generateMask(maskPrefix + masks[0], maskParts[1], metadata);
                    }
                }
                else {
                    newMask = maskPrefix + maskParts;
                    if ($.inArray(newMask, genmasks) == -1 && newMask != "") {
                        genmasks.push(newMask);
                        maskTemplate = getMaskTemplate(newMask);
                        ms.push({
                            "mask": newMask,
                            "_buffer": maskTemplate["mask"],
                            "buffer": maskTemplate["mask"].slice(),
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": -1,
                            "greedy": maskTemplate["greedy"],
                            "repeat": maskTemplate["repeat"],
                            "metadata": metadata
                        });
                    }
                }

            }

            if ($.isFunction(opts.mask)) { //allow mask to be a preprocessing fn - should return a valid mask
                opts.mask = opts.mask.call(this, opts);
            }
            if ($.isArray(opts.mask)) {
                $.each(opts.mask, function (ndx, msk) {
                    if (msk["mask"] != undefined) {
                        generateMask("", msk["mask"].toString(), msk);
                    } else
                        generateMask("", msk.toString());
                });
            } else generateMask("", opts.mask.toString());

            return opts.greedy ? ms : ms.sort(function (a, b) { return a["mask"].length - b["mask"].length; });
        }

        var msie10 = navigator.userAgent.match(new RegExp("msie 10", "i")) !== null,
            iphone = navigator.userAgent.match(new RegExp("iphone", "i")) !== null,
            android = navigator.userAgent.match(new RegExp("android.*safari.*", "i")) !== null,
            androidchrome = navigator.userAgent.match(new RegExp("android.*chrome.*", "i")) !== null,
            pasteEvent = isInputEventSupported('paste') ? 'paste' : isInputEventSupported('input') ? 'input' : "propertychange";


        //masking scope
        //actionObj definition see below
        function maskScope(masksets, activeMasksetIndex, opts, actionObj) {
            var isRTL = false,
                valueOnFocus = getActiveBuffer().join(''),
                $el, chromeValueOnInput,
                skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
                skipInputEvent = false, //skip when triggered from within inputmask
                ignorable = false;


            //maskset helperfunctions

            function getActiveMaskSet() {
                return masksets[activeMasksetIndex];
            }

            function getActiveTests() {
                return getActiveMaskSet()['tests'];
            }

            function getActiveBufferTemplate() {
                return getActiveMaskSet()['_buffer'];
            }

            function getActiveBuffer() {
                return getActiveMaskSet()['buffer'];
            }

            function isValid(pos, c, strict) { //strict true ~ no correction or autofill
                strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions 

                function _isValid(position, activeMaskset, c, strict) {
                    var testPos = determineTestPosition(position), loopend = c ? 1 : 0, chrs = '', buffer = activeMaskset["buffer"];
                    for (var i = activeMaskset['tests'][testPos].cardinality; i > loopend; i--) {
                        chrs += getBufferElement(buffer, testPos - (i - 1));
                    }

                    if (c) {
                        chrs += c;
                    }

                    //return is false or a json object => { pos: ??, c: ??} or true
                    return activeMaskset['tests'][testPos].fn != null ?
                        activeMaskset['tests'][testPos].fn.test(chrs, buffer, position, strict, opts)
                        : (c == getBufferElement(activeMaskset['_buffer'], position, true) || c == opts.skipOptionalPartCharacter) ?
                            { "refresh": true, c: getBufferElement(activeMaskset['_buffer'], position, true), pos: position }
                            : false;
                }

                function PostProcessResults(maskForwards, results) {
                    var hasValidActual = false;
                    $.each(results, function (ndx, rslt) {
                        hasValidActual = $.inArray(rslt["activeMasksetIndex"], maskForwards) == -1 && rslt["result"] !== false;
                        if (hasValidActual) return false;
                    });
                    if (hasValidActual) { //strip maskforwards
                        results = $.map(results, function (rslt, ndx) {
                            if ($.inArray(rslt["activeMasksetIndex"], maskForwards) == -1) {
                                return rslt;
                            } else {
                                masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = actualLVP;
                            }
                        });
                    } else { //keep maskforwards with the least forward
                        var lowestPos = -1, lowestIndex = -1, rsltValid;
                        $.each(results, function (ndx, rslt) {
                            if ($.inArray(rslt["activeMasksetIndex"], maskForwards) != -1 && rslt["result"] !== false & (lowestPos == -1 || lowestPos > rslt["result"]["pos"])) {
                                lowestPos = rslt["result"]["pos"];
                                lowestIndex = rslt["activeMasksetIndex"];
                            }
                        });
                        results = $.map(results, function (rslt, ndx) {
                            if ($.inArray(rslt["activeMasksetIndex"], maskForwards) != -1) {
                                if (rslt["result"]["pos"] == lowestPos) {
                                    return rslt;
                                } else if (rslt["result"] !== false) {
                                    for (var i = pos; i < lowestPos; i++) {
                                        rsltValid = _isValid(i, masksets[rslt["activeMasksetIndex"]], masksets[lowestIndex]["buffer"][i], true);
                                        if (rsltValid === false) {
                                            masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = lowestPos - 1;
                                            break;
                                        } else {
                                            setBufferElement(masksets[rslt["activeMasksetIndex"]]["buffer"], i, masksets[lowestIndex]["buffer"][i], true);
                                            masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = i;
                                        }
                                    }
                                    //also check check for the lowestpos with the new input
                                    rsltValid = _isValid(lowestPos, masksets[rslt["activeMasksetIndex"]], c, true);
                                    if (rsltValid !== false) {
                                        setBufferElement(masksets[rslt["activeMasksetIndex"]]["buffer"], lowestPos, c, true);
                                        masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = lowestPos;
                                    }
                                    //console.log("ndx " + rslt["activeMasksetIndex"] + " validate " + masksets[rslt["activeMasksetIndex"]]["buffer"].join('') + " lv " + masksets[rslt["activeMasksetIndex"]]['lastValidPosition']);
                                    return rslt;
                                }
                            }
                        });
                    }
                    return results;
                }

                if (strict) {
                    var result = _isValid(pos, getActiveMaskSet(), c, strict); //only check validity in current mask when validating strict
                    if (result === true) {
                        result = { "pos": pos }; //always take a possible corrected maskposition into account
                    }
                    return result;
                }

                var results = [], result = false, currentActiveMasksetIndex = activeMasksetIndex,
                    actualBuffer = getActiveBuffer().slice(), actualLVP = getActiveMaskSet()["lastValidPosition"],
                    actualPrevious = seekPrevious(pos),
                    maskForwards = [];
                $.each(masksets, function (index, value) {
                    if (typeof (value) == "object") {
                        activeMasksetIndex = index;

                        var maskPos = pos;
                        var lvp = getActiveMaskSet()['lastValidPosition'],
                            rsltValid;
                        if (lvp == actualLVP) {
                            if ((maskPos - actualLVP) > 1) {
                                for (var i = lvp == -1 ? 0 : lvp; i < maskPos; i++) {
                                    rsltValid = _isValid(i, getActiveMaskSet(), actualBuffer[i], true);
                                    if (rsltValid === false) {
                                        break;
                                    } else {
                                        setBufferElement(getActiveBuffer(), i, actualBuffer[i], true);
                                        if (rsltValid === true) {
                                            rsltValid = { "pos": i }; //always take a possible corrected maskposition into account
                                        }
                                        var newValidPosition = rsltValid.pos || i;
                                        if (getActiveMaskSet()['lastValidPosition'] < newValidPosition)
                                            getActiveMaskSet()['lastValidPosition'] = newValidPosition; //set new position from isValid
                                    }
                                }
                            }
                            //does the input match on a further position?
                            if (!isMask(maskPos) && !_isValid(maskPos, getActiveMaskSet(), c, strict)) {
                                var maxForward = seekNext(maskPos) - maskPos;
                                for (var fw = 0; fw < maxForward; fw++) {
                                    if (_isValid(++maskPos, getActiveMaskSet(), c, strict) !== false)
                                        break;
                                }
                                maskForwards.push(activeMasksetIndex);
                                //console.log('maskforward ' + activeMasksetIndex + " pos " + pos + " maskPos " + maskPos);
                            }
                        }

                        if (getActiveMaskSet()['lastValidPosition'] >= actualLVP || activeMasksetIndex == currentActiveMasksetIndex) {
                            if (maskPos >= 0 && maskPos < getMaskLength()) {
                                result = _isValid(maskPos, getActiveMaskSet(), c, strict);
                                if (result !== false) {
                                    if (result === true) {
                                        result = { "pos": maskPos }; //always take a possible corrected maskposition into account
                                    }
                                    var newValidPosition = result.pos || maskPos;
                                    if (getActiveMaskSet()['lastValidPosition'] < newValidPosition)
                                        getActiveMaskSet()['lastValidPosition'] = newValidPosition; //set new position from isValid
                                }
                                //console.log("pos " + pos + " ndx " + activeMasksetIndex + " validate " + getActiveBuffer().join('') + " lv " + getActiveMaskSet()['lastValidPosition']);
                                results.push({ "activeMasksetIndex": index, "result": result });
                            }
                        }
                    }
                });
                activeMasksetIndex = currentActiveMasksetIndex; //reset activeMasksetIndex

                return PostProcessResults(maskForwards, results); //return results of the multiple mask validations
            }

            function determineActiveMasksetIndex() {
                var currentMasksetIndex = activeMasksetIndex,
                    highestValid = { "activeMasksetIndex": 0, "lastValidPosition": -1, "next": -1 };
                $.each(masksets, function (index, value) {
                    if (typeof (value) == "object") {
                        activeMasksetIndex = index;
                        if (getActiveMaskSet()['lastValidPosition'] > highestValid['lastValidPosition']) {
                            highestValid["activeMasksetIndex"] = index;
                            highestValid["lastValidPosition"] = getActiveMaskSet()['lastValidPosition'];
                            highestValid["next"] = seekNext(getActiveMaskSet()['lastValidPosition']);
                        } else if (getActiveMaskSet()['lastValidPosition'] == highestValid['lastValidPosition'] &&
                            (highestValid['next'] == -1 || highestValid['next'] > seekNext(getActiveMaskSet()['lastValidPosition']))) {
                            highestValid["activeMasksetIndex"] = index;
                            highestValid["lastValidPosition"] = getActiveMaskSet()['lastValidPosition'];
                            highestValid["next"] = seekNext(getActiveMaskSet()['lastValidPosition']);
                        }
                    }
                });

                activeMasksetIndex = highestValid["lastValidPosition"] != -1 && masksets[currentMasksetIndex]["lastValidPosition"] == highestValid["lastValidPosition"] ? currentMasksetIndex : highestValid["activeMasksetIndex"];
                if (currentMasksetIndex != activeMasksetIndex) {
                    clearBuffer(getActiveBuffer(), seekNext(highestValid["lastValidPosition"]), getMaskLength());
                    getActiveMaskSet()["writeOutBuffer"] = true;
                }
                $el.data('_inputmask')['activeMasksetIndex'] = activeMasksetIndex; //store the activeMasksetIndex
            }

            function isMask(pos) {
                var testPos = determineTestPosition(pos);
                var test = getActiveTests()[testPos];

                return test != undefined ? test.fn : false;
            }

            function determineTestPosition(pos) {
                return pos % getActiveTests().length;
            }

            function getMaskLength() {
                return opts.getMaskLength(getActiveBufferTemplate(), getActiveMaskSet()['greedy'], getActiveMaskSet()['repeat'], getActiveBuffer(), opts);
            }

            //pos: from position

            function seekNext(pos) {
                var maskL = getMaskLength();
                if (pos >= maskL) return maskL;
                var position = pos;
                while (++position < maskL && !isMask(position)) {
                }
                return position;
            }

            //pos: from position

            function seekPrevious(pos) {
                var position = pos;
                if (position <= 0) return 0;

                while (--position > 0 && !isMask(position)) {
                }
                return position;
            }

            function setBufferElement(buffer, position, element, autoPrepare) {
                if (autoPrepare) position = prepareBuffer(buffer, position);

                var test = getActiveTests()[determineTestPosition(position)];
                var elem = element;
                if (elem != undefined && test != undefined) {
                    switch (test.casing) {
                        case "upper":
                            elem = element.toUpperCase();
                            break;
                        case "lower":
                            elem = element.toLowerCase();
                            break;
                    }
                }

                buffer[position] = elem;
            }

            function getBufferElement(buffer, position, autoPrepare) {
                if (autoPrepare) position = prepareBuffer(buffer, position);
                return buffer[position];
            }

            //needed to handle the non-greedy mask repetitions

            function prepareBuffer(buffer, position) {
                var j;
                while (buffer[position] == undefined && buffer.length < getMaskLength()) {
                    j = 0;
                    while (getActiveBufferTemplate()[j] !== undefined) { //add a new buffer
                        buffer.push(getActiveBufferTemplate()[j++]);
                    }
                }

                return position;
            }

            function writeBuffer(input, buffer, caretPos) {
                input._valueSet(buffer.join(''));
                if (caretPos != undefined) {
                    caret(input, caretPos);
                }
            }

            function clearBuffer(buffer, start, end, stripNomasks) {
                for (var i = start, maskL = getMaskLength() ; i < end && i < maskL; i++) {
                    if (stripNomasks === true) {
                        if (!isMask(i))
                            setBufferElement(buffer, i, "");
                    } else
                        setBufferElement(buffer, i, getBufferElement(getActiveBufferTemplate().slice(), i, true));
                }
            }

            function setReTargetPlaceHolder(buffer, pos) {
                var testPos = determineTestPosition(pos);
                setBufferElement(buffer, pos, getBufferElement(getActiveBufferTemplate(), testPos));
            }

            function getPlaceHolder(pos) {
                return opts.placeholder.charAt(pos % opts.placeholder.length);
            }

            function checkVal(input, writeOut, strict, nptvl, intelliCheck) {
                var inputValue = nptvl != undefined ? nptvl.slice() : truncateInput(input._valueGet()).split('');

                $.each(masksets, function (ndx, ms) {
                    if (typeof (ms) == "object") {
                        ms["buffer"] = ms["_buffer"].slice();
                        ms["lastValidPosition"] = -1;
                        ms["p"] = -1;
                    }
                });
                if (strict !== true) activeMasksetIndex = 0;
                if (writeOut) input._valueSet(""); //initial clear
                var ml = getMaskLength();
                $.each(inputValue, function (ndx, charCode) {
                    if (intelliCheck === true) {
                        var p = getActiveMaskSet()["p"], lvp = p == -1 ? p : seekPrevious(p),
                            pos = lvp == -1 ? ndx : seekNext(lvp);
                        if ($.inArray(charCode, getActiveBufferTemplate().slice(lvp + 1, pos)) == -1) {
                            keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), writeOut, strict, ndx);
                        }
                    } else {
                        keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), writeOut, strict, ndx);
                    }
                });

                if (strict === true && getActiveMaskSet()["p"] != -1) {
                    getActiveMaskSet()["lastValidPosition"] = seekPrevious(getActiveMaskSet()["p"]);
                }
            }

            function escapeRegex(str) {
                return $.inputmask.escapeRegex.call(this, str);
            }

            function truncateInput(inputValue) {
                return inputValue.replace(new RegExp("(" + escapeRegex(getActiveBufferTemplate().join('')) + ")*$"), "");
            }

            function clearOptionalTail(input) {
                var buffer = getActiveBuffer(), tmpBuffer = buffer.slice(), testPos, pos;
                for (var pos = tmpBuffer.length - 1; pos >= 0; pos--) {
                    var testPos = determineTestPosition(pos);
                    if (getActiveTests()[testPos].optionality) {
                        if (!isMask(pos) || !isValid(pos, buffer[pos], true))
                            tmpBuffer.pop();
                        else break;
                    } else break;
                }
                writeBuffer(input, tmpBuffer);
            }

            function unmaskedvalue($input, skipDatepickerCheck) {
                if (getActiveTests() && (skipDatepickerCheck === true || !$input.hasClass('hasDatepicker'))) {
                    //checkVal(input, false, true);
                    var umValue = $.map(getActiveBuffer(), function (element, index) {
                        return isMask(index) && isValid(index, element, true) ? element : null;
                    });
                    var unmaskedValue = (isRTL ? umValue.reverse() : umValue).join('');
                    return opts.onUnMask != undefined ? opts.onUnMask.call(this, getActiveBuffer().join(''), unmaskedValue) : unmaskedValue;
                } else {
                    return $input[0]._valueGet();
                }
            }

            function TranslatePosition(pos) {
                if (isRTL && typeof pos == 'number' && (!opts.greedy || opts.placeholder != "")) {
                    var bffrLght = getActiveBuffer().length;
                    pos = bffrLght - pos;
                }
                return pos;
            }

            function caret(input, begin, end) {
                var npt = input.jquery && input.length > 0 ? input[0] : input, range;
                if (typeof begin == 'number') {
                    begin = TranslatePosition(begin);
                    end = TranslatePosition(end);
                    if (!$(input).is(':visible')) {
                        return;
                    }
                    end = (typeof end == 'number') ? end : begin;
                    npt.scrollLeft = npt.scrollWidth;
                    if (opts.insertMode == false && begin == end) end++; //set visualization for insert/overwrite mode
                    if (npt.setSelectionRange) {
                        npt.selectionStart = begin;
                        npt.selectionEnd = android ? begin : end;

                    } else if (npt.createTextRange) {
                        range = npt.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', begin);
                        range.select();
                    }
                } else {
                    if (!$(input).is(':visible')) {
                        return { "begin": 0, "end": 0 };
                    }
                    if (npt.setSelectionRange) {
                        begin = npt.selectionStart;
                        end = npt.selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        range = document.selection.createRange();
                        begin = 0 - range.duplicate().moveStart('character', -100000);
                        end = begin + range.text.length;
                    }
                    begin = TranslatePosition(begin);
                    end = TranslatePosition(end);
                    return { "begin": begin, "end": end };
                }
            }

            function isComplete(buffer) { //return true / false / undefined (repeat *)
                if (opts.repeat == "*") return undefined;
                var complete = false, highestValidPosition = 0, currentActiveMasksetIndex = activeMasksetIndex;
                $.each(masksets, function (ndx, ms) {
                    if (typeof (ms) == "object") {
                        activeMasksetIndex = ndx;
                        var aml = seekPrevious(getMaskLength());
                        if (ms["lastValidPosition"] >= highestValidPosition && ms["lastValidPosition"] == aml) {
                            var msComplete = true;
                            for (var i = 0; i <= aml; i++) {
                                var mask = isMask(i), testPos = determineTestPosition(i);
                                if ((mask && (buffer[i] == undefined || buffer[i] == getPlaceHolder(i))) || (!mask && buffer[i] != getActiveBufferTemplate()[testPos])) {
                                    msComplete = false;
                                    break;
                                }
                            }
                            complete = complete || msComplete;
                            if (complete) //break loop
                                return false;
                        }
                        highestValidPosition = ms["lastValidPosition"];
                    }
                });
                activeMasksetIndex = currentActiveMasksetIndex; //reset activeMaskset
                return complete;
            }

            function isSelection(begin, end) {
                return isRTL ? (begin - end) > 1 || ((begin - end) == 1 && opts.insertMode) :
                    (end - begin) > 1 || ((end - begin) == 1 && opts.insertMode);
            }


            //private functions
            function installEventRuler(npt) {
                var events = $._data(npt).events;

                $.each(events, function (eventType, eventHandlers) {
                    $.each(eventHandlers, function (ndx, eventHandler) {
                        if (eventHandler.namespace == "inputmask") {
                            if (eventHandler.type != "setvalue") {
                                var handler = eventHandler.handler;
                                eventHandler.handler = function (e) {
                                    if (this.readOnly || this.disabled)
                                        e.preventDefault;
                                    else
                                        return handler.apply(this, arguments);
                                };
                            }
                        }
                    });
                });
            }

            function patchValueProperty(npt) {
                var valueProperty;
                if (Object.getOwnPropertyDescriptor)
                    valueProperty = Object.getOwnPropertyDescriptor(npt, "value");
                if (valueProperty && valueProperty.get) {
                    if (!npt._valueGet) {
                        var valueGet = valueProperty.get;
                        var valueSet = valueProperty.set;
                        npt._valueGet = function () {
                            return isRTL ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
                        };
                        npt._valueSet = function (value) {
                            valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
                        };

                        Object.defineProperty(npt, "value", {
                            get: function () {
                                var $self = $(this), inputData = $(this).data('_inputmask'), masksets = inputData['masksets'],
                                    activeMasksetIndex = inputData['activeMasksetIndex'];
                                return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : valueGet.call(this) != masksets[activeMasksetIndex]['_buffer'].join('') ? valueGet.call(this) : '';
                            },
                            set: function (value) {
                                valueSet.call(this, value);
                                $(this).triggerHandler('setvalue.inputmask');
                            }
                        });
                    }
                } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                    if (!npt._valueGet) {
                        var valueGet = npt.__lookupGetter__("value");
                        var valueSet = npt.__lookupSetter__("value");
                        npt._valueGet = function () {
                            return isRTL ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
                        };
                        npt._valueSet = function (value) {
                            valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
                        };

                        npt.__defineGetter__("value", function () {
                            var $self = $(this), inputData = $(this).data('_inputmask'), masksets = inputData['masksets'],
                                activeMasksetIndex = inputData['activeMasksetIndex'];
                            return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : valueGet.call(this) != masksets[activeMasksetIndex]['_buffer'].join('') ? valueGet.call(this) : '';
                        });
                        npt.__defineSetter__("value", function (value) {
                            valueSet.call(this, value);
                            $(this).triggerHandler('setvalue.inputmask');
                        });
                    }
                } else {
                    if (!npt._valueGet) {
                        npt._valueGet = function () { return isRTL ? this.value.split('').reverse().join('') : this.value; };
                        npt._valueSet = function (value) { this.value = isRTL ? value.split('').reverse().join('') : value; };
                    }
                    if ($.valHooks.text == undefined || $.valHooks.text.inputmaskpatch != true) {
                        var valueGet = $.valHooks.text && $.valHooks.text.get ? $.valHooks.text.get : function (elem) { return elem.value; };
                        var valueSet = $.valHooks.text && $.valHooks.text.set ? $.valHooks.text.set : function (elem, value) {
                            elem.value = value;
                            return elem;
                        };

                        jQuery.extend($.valHooks, {
                            text: {
                                get: function (elem) {
                                    var $elem = $(elem);
                                    if ($elem.data('_inputmask')) {
                                        if ($elem.data('_inputmask')['opts'].autoUnmask)
                                            return $elem.inputmask('unmaskedvalue');
                                        else {
                                            var result = valueGet(elem),
                                                inputData = $elem.data('_inputmask'), masksets = inputData['masksets'],
                                                activeMasksetIndex = inputData['activeMasksetIndex'];
                                            return result != masksets[activeMasksetIndex]['_buffer'].join('') ? result : '';
                                        }
                                    } else return valueGet(elem);
                                },
                                set: function (elem, value) {
                                    var $elem = $(elem);
                                    var result = valueSet(elem, value);
                                    if ($elem.data('_inputmask')) $elem.triggerHandler('setvalue.inputmask');
                                    return result;
                                },
                                inputmaskpatch: true
                            }
                        });
                    }
                }
            }

            //shift chars to left from start to end and put c at end position if defined

            function shiftL(start, end, c, maskJumps) {
                var buffer = getActiveBuffer();
                if (maskJumps !== false) //jumping over nonmask position
                    while (!isMask(start) && start - 1 >= 0) start--;
                for (var i = start; i < end && i < getMaskLength() ; i++) {
                    if (isMask(i)) {
                        setReTargetPlaceHolder(buffer, i);
                        var j = seekNext(i);
                        var p = getBufferElement(buffer, j);
                        if (p != getPlaceHolder(j)) {
                            if (j < getMaskLength() && isValid(i, p, true) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def) {
                                setBufferElement(buffer, i, p, true);
                            } else {
                                if (isMask(i))
                                    break;
                            }
                        }
                    } else {
                        setReTargetPlaceHolder(buffer, i);
                    }
                }
                if (c != undefined)
                    setBufferElement(buffer, seekPrevious(end), c);

                if (getActiveMaskSet()["greedy"] == false) {
                    var trbuffer = truncateInput(buffer.join('')).split('');
                    buffer.length = trbuffer.length;
                    for (var i = 0, bl = buffer.length; i < bl; i++) {
                        buffer[i] = trbuffer[i];
                    }
                    if (buffer.length == 0) getActiveMaskSet()["buffer"] = getActiveBufferTemplate().slice();
                }
                return start; //return the used start position
            }

            function shiftR(start, end, c) {
                var buffer = getActiveBuffer();
                if (getBufferElement(buffer, start, true) != getPlaceHolder(start)) {
                    for (var i = seekPrevious(end) ; i > start && i >= 0; i--) {
                        if (isMask(i)) {
                            var j = seekPrevious(i);
                            var t = getBufferElement(buffer, j);
                            if (t != getPlaceHolder(j)) {
                                if (isValid(j, t, true) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def) {
                                    setBufferElement(buffer, i, t, true);
                                    setReTargetPlaceHolder(buffer, j);
                                } //else break;
                            }
                        } else
                            setReTargetPlaceHolder(buffer, i);
                    }
                }
                if (c != undefined && getBufferElement(buffer, start) == getPlaceHolder(start))
                    setBufferElement(buffer, start, c);
                var lengthBefore = buffer.length;
                if (getActiveMaskSet()["greedy"] == false) {
                    var trbuffer = truncateInput(buffer.join('')).split('');
                    buffer.length = trbuffer.length;
                    for (var i = 0, bl = buffer.length; i < bl; i++) {
                        buffer[i] = trbuffer[i];
                    }
                    if (buffer.length == 0) getActiveMaskSet()["buffer"] = getActiveBufferTemplate().slice();
                }
                return end - (lengthBefore - buffer.length); //return new start position
            }

            function HandleRemove(input, k, pos) {
                if (opts.numericInput || isRTL) {
                    switch (k) {
                        case opts.keyCode.BACKSPACE:
                            k = opts.keyCode.DELETE;
                            break;
                        case opts.keyCode.DELETE:
                            k = opts.keyCode.BACKSPACE;
                            break;
                    }
                    if (isRTL) {
                        var pend = pos.end;
                        pos.end = pos.begin;
                        pos.begin = pend;
                    }
                }

                var isSelection = true;
                if (pos.begin == pos.end) {
                    var posBegin = k == opts.keyCode.BACKSPACE ? pos.begin - 1 : pos.begin;
                    if (opts.isNumeric && opts.radixPoint != "" && getActiveBuffer()[posBegin] == opts.radixPoint) {
                        pos.begin = (getActiveBuffer().length - 1 == posBegin) /* radixPoint is latest? delete it */ ? pos.begin : k == opts.keyCode.BACKSPACE ? posBegin : seekNext(posBegin);
                        pos.end = pos.begin;
                    }
                    isSelection = false;
                    if (k == opts.keyCode.BACKSPACE)
                        pos.begin--;
                    else if (k == opts.keyCode.DELETE)
                        pos.end++;
                } else if (pos.end - pos.begin == 1 && !opts.insertMode) {
                    isSelection = false;
                    if (k == opts.keyCode.BACKSPACE)
                        pos.begin--;
                }

                clearBuffer(getActiveBuffer(), pos.begin, pos.end);

                var ml = getMaskLength();
                if (opts.greedy == false) {
                    shiftL(pos.begin, ml, undefined, !isRTL && (k == opts.keyCode.BACKSPACE && !isSelection));
                } else {
                    var newpos = pos.begin;
                    for (var i = pos.begin; i < pos.end; i++) { //seeknext to skip placeholders at start in selection
                        if (isMask(i) || !isSelection)
                            newpos = shiftL(pos.begin, ml, undefined, !isRTL && (k == opts.keyCode.BACKSPACE && !isSelection));
                    }
                    if (!isSelection) pos.begin = newpos;
                }
                var firstMaskPos = seekNext(-1);
                clearBuffer(getActiveBuffer(), pos.begin, pos.end, true);
                checkVal(input, false, masksets[1] == undefined || firstMaskPos >= pos.end, getActiveBuffer());
                if (getActiveMaskSet()['lastValidPosition'] < firstMaskPos) {
                    getActiveMaskSet()["lastValidPosition"] = -1;
                    getActiveMaskSet()["p"] = firstMaskPos;
                } else {
                    getActiveMaskSet()["p"] = pos.begin;
                }
            }

            function keydownEvent(e) {
                //Safari 5.1.x - modal dialog fires keypress twice workaround
                skipKeyPressEvent = false;
                var input = this, $input = $(input), k = e.keyCode, pos = caret(input);

                //backspace, delete, and escape get special treatment
                if (k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE || (iphone && k == 127) || e.ctrlKey && k == 88) { //backspace/delete
                    e.preventDefault(); //stop default action but allow propagation
                    if (k == 88) valueOnFocus = getActiveBuffer().join('');
                    HandleRemove(input, k, pos);
                    determineActiveMasksetIndex();
                    writeBuffer(input, getActiveBuffer(), getActiveMaskSet()["p"]);
                    if (input._valueGet() == getActiveBufferTemplate().join(''))
                        $input.trigger('cleared');

                    if (opts.showTooltip) { //update tooltip
                        $input.prop("title", getActiveMaskSet()["mask"]);
                    }
                } else if (k == opts.keyCode.END || k == opts.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
                    setTimeout(function () {
                        var caretPos = seekNext(getActiveMaskSet()["lastValidPosition"]);
                        if (!opts.insertMode && caretPos == getMaskLength() && !e.shiftKey) caretPos--;
                        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
                    }, 0);
                } else if ((k == opts.keyCode.HOME && !e.shiftKey) || k == opts.keyCode.PAGE_UP) { //Home or page_up
                    caret(input, 0, e.shiftKey ? pos.begin : 0);
                } else if (k == opts.keyCode.ESCAPE || (k == 90 && e.ctrlKey)) { //escape && undo
                    checkVal(input, true, false, valueOnFocus.split(''));
                    $input.click();
                } else if (k == opts.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) { //insert
                    opts.insertMode = !opts.insertMode;
                    caret(input, !opts.insertMode && pos.begin == getMaskLength() ? pos.begin - 1 : pos.begin);
                } else if (opts.insertMode == false && !e.shiftKey) {
                    if (k == opts.keyCode.RIGHT) {
                        setTimeout(function () {
                            var caretPos = caret(input);
                            caret(input, caretPos.begin);
                        }, 0);
                    } else if (k == opts.keyCode.LEFT) {
                        setTimeout(function () {
                            var caretPos = caret(input);
                            caret(input, caretPos.begin - 1);
                        }, 0);
                    }
                }

                var currentCaretPos = caret(input);
                if (opts.onKeyDown.call(this, e, getActiveBuffer(), opts) === true) //extra stuff to execute on keydown
                    caret(input, currentCaretPos.begin, currentCaretPos.end);
                ignorable = $.inArray(k, opts.ignorables) != -1;
            }


            function keypressEvent(e, checkval, k, writeOut, strict, ndx) {
                //Safari 5.1.x - modal dialog fires keypress twice workaround
                if (k == undefined && skipKeyPressEvent) return false;
                skipKeyPressEvent = true;

                var input = this, $input = $(input);

                e = e || window.event;
                var k = checkval ? k : (e.which || e.charCode || e.keyCode);

                if (checkval !== true && (!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable))) {
                    return true;
                } else {
                    if (k) {
                        //special treat the decimal separator
                        if (checkval !== true && k == 46 && e.shiftKey == false && opts.radixPoint == ",") k = 44;

                        var pos, results, result, c = String.fromCharCode(k);
                        if (checkval) {
                            var pcaret = strict ? ndx : getActiveMaskSet()["lastValidPosition"] + 1;
                            pos = { begin: pcaret, end: pcaret };
                        } else {
                            pos = caret(input);
                        }

                        //should we clear a possible selection??
                        var isSlctn = isSelection(pos.begin, pos.end), redetermineLVP = false,
                            initialIndex = activeMasksetIndex;
                        if (isSlctn) {
                            activeMasksetIndex = initialIndex;
                            $.each(masksets, function (ndx, lmnt) { //init undobuffer for recovery when not valid
                                if (typeof (lmnt) == "object") {
                                    activeMasksetIndex = ndx;
                                    getActiveMaskSet()["undoBuffer"] = getActiveBuffer().join('');
                                }
                            });
                            HandleRemove(input, opts.keyCode.DELETE, pos);
                            if (!opts.insertMode) { //preserve some space
                                $.each(masksets, function (ndx, lmnt) {
                                    if (typeof (lmnt) == "object") {
                                        activeMasksetIndex = ndx;
                                        shiftR(pos.begin, getMaskLength());
                                        getActiveMaskSet()["lastValidPosition"] = seekNext(getActiveMaskSet()["lastValidPosition"]);
                                    }
                                });
                            }
                            activeMasksetIndex = initialIndex; //restore index
                        }

                        var radixPosition = getActiveBuffer().join('').indexOf(opts.radixPoint);
                        if (opts.isNumeric && checkval !== true && radixPosition != -1) {
                            if (opts.greedy && pos.begin <= radixPosition) {
                                pos.begin = seekPrevious(pos.begin);
                                pos.end = pos.begin;
                            } else if (c == opts.radixPoint) {
                                pos.begin = radixPosition;
                                pos.end = pos.begin;
                            }
                        }


                        var p = pos.begin;
                        results = isValid(p, c, strict);
                        if (strict === true) results = [{ "activeMasksetIndex": activeMasksetIndex, "result": results }];
                        var minimalForwardPosition = -1;
                        $.each(results, function (index, result) {
                            activeMasksetIndex = result["activeMasksetIndex"];
                            getActiveMaskSet()["writeOutBuffer"] = true;
                            var np = result["result"];
                            if (np !== false) {
                                var refresh = false, buffer = getActiveBuffer();
                                if (np !== true) {
                                    refresh = np["refresh"]; //only rewrite buffer from isValid
                                    p = np.pos != undefined ? np.pos : p; //set new position from isValid
                                    c = np.c != undefined ? np.c : c; //set new char from isValid
                                }
                                if (refresh !== true) {
                                    if (opts.insertMode == true) {
                                        var lastUnmaskedPosition = getMaskLength();
                                        var bfrClone = buffer.slice();
                                        while (getBufferElement(bfrClone, lastUnmaskedPosition, true) != getPlaceHolder(lastUnmaskedPosition) && lastUnmaskedPosition >= p) {
                                            lastUnmaskedPosition = lastUnmaskedPosition == 0 ? -1 : seekPrevious(lastUnmaskedPosition);
                                        }
                                        if (lastUnmaskedPosition >= p) {
                                            shiftR(p, getMaskLength(), c);
                                            //shift the lvp if needed
                                            var lvp = getActiveMaskSet()["lastValidPosition"], nlvp = seekNext(lvp);
                                            if (nlvp != getMaskLength() && lvp >= p && (getBufferElement(getActiveBuffer(), nlvp, true) != getPlaceHolder(nlvp))) {
                                                getActiveMaskSet()["lastValidPosition"] = nlvp;
                                            }
                                        } else getActiveMaskSet()["writeOutBuffer"] = false;
                                    } else setBufferElement(buffer, p, c, true);
                                    if (minimalForwardPosition == -1 || minimalForwardPosition > seekNext(p)) {
                                        minimalForwardPosition = seekNext(p);
                                    }
                                } else if (!strict) {
                                    var nextPos = p < getMaskLength() ? p + 1 : p;
                                    if (minimalForwardPosition == -1 || minimalForwardPosition > nextPos) {
                                        minimalForwardPosition = nextPos;
                                    }
                                }
                                if (minimalForwardPosition > getActiveMaskSet()["p"])
                                    getActiveMaskSet()["p"] = minimalForwardPosition; //needed for checkval strict 
                            }
                        });

                        if (strict !== true) {
                            activeMasksetIndex = initialIndex;
                            determineActiveMasksetIndex();
                        }
                        if (writeOut !== false) {
                            $.each(results, function (ndx, rslt) {
                                if (rslt["activeMasksetIndex"] == activeMasksetIndex) {
                                    result = rslt;
                                    return false;
                                }
                            });
                            if (result != undefined) {
                                var self = this;
                                setTimeout(function () { opts.onKeyValidation.call(self, result["result"], opts); }, 0);
                                if (getActiveMaskSet()["writeOutBuffer"] && result["result"] !== false) {
                                    var buffer = getActiveBuffer();

                                    var newCaretPosition;
                                    if (checkval) {
                                        newCaretPosition = undefined;
                                    } else if (opts.numericInput) {
                                        if (p > radixPosition) {
                                            newCaretPosition = seekPrevious(minimalForwardPosition);
                                        } else if (c == opts.radixPoint) {
                                            newCaretPosition = minimalForwardPosition - 1;
                                        } else newCaretPosition = seekPrevious(minimalForwardPosition - 1);
                                    } else {
                                        newCaretPosition = minimalForwardPosition;
                                    }

                                    writeBuffer(input, buffer, newCaretPosition);
                                    if (checkval !== true) {
                                        setTimeout(function () { //timeout needed for IE
                                            if (isComplete(buffer) === true)
                                                $input.trigger("complete");
                                            skipInputEvent = true;
                                            $input.trigger("input");
                                        }, 0);
                                    }
                                } else if (isSlctn) {
                                    getActiveMaskSet()["buffer"] = getActiveMaskSet()["undoBuffer"].split('');
                                }
                            }
                        }

                        if (opts.showTooltip) { //update tooltip
                            $input.prop("title", getActiveMaskSet()["mask"]);
                        }

                        //needed for IE8 and below
                        if (e) e.preventDefault ? e.preventDefault() : e.returnValue = false;
                    }
                }
            }

            function keyupEvent(e) {
                var $input = $(this), input = this, k = e.keyCode, buffer = getActiveBuffer();

                if (androidchrome && k == opts.keyCode.BACKSPACE) {
                    if (chromeValueOnInput == input._valueGet())
                        keydownEvent.call(this, e);
                }

                opts.onKeyUp.call(this, e, buffer, opts); //extra stuff to execute on keyup
                if (k == opts.keyCode.TAB && opts.showMaskOnFocus) {
                    if ($input.hasClass('focus.inputmask') && input._valueGet().length == 0) {
                        buffer = getActiveBufferTemplate().slice();
                        writeBuffer(input, buffer);
                        caret(input, 0);
                        valueOnFocus = getActiveBuffer().join('');
                    } else {
                        writeBuffer(input, buffer);
                        if (buffer.join('') == getActiveBufferTemplate().join('') && $.inArray(opts.radixPoint, buffer) != -1) {
                            caret(input, TranslatePosition(0));
                            $input.click();
                        } else
                            caret(input, TranslatePosition(0), TranslatePosition(getMaskLength()));
                    }
                }
            }

            function inputEvent(e) {
                if (skipInputEvent === true) {
                    skipInputEvent = false;
                    return true;
                }
                var input = this, $input = $(input);

                chromeValueOnInput = getActiveBuffer().join('');
                checkVal(input, false, false);
                writeBuffer(input, getActiveBuffer());
                if (isComplete(getActiveBuffer()) === true)
                    $input.trigger("complete");
                $input.click();
            }

            function mask(el) {
                $el = $(el);
                if ($el.is(":input")) {
                    //store tests & original buffer in the input element - used to get the unmasked value
                    $el.data('_inputmask', {
                        'masksets': masksets,
                        'activeMasksetIndex': activeMasksetIndex,
                        'opts': opts,
                        'isRTL': false
                    });

                    //show tooltip
                    if (opts.showTooltip) {
                        $el.prop("title", getActiveMaskSet()["mask"]);
                    }

                    //correct greedy setting if needed
                    getActiveMaskSet()['greedy'] = getActiveMaskSet()['greedy'] ? getActiveMaskSet()['greedy'] : getActiveMaskSet()['repeat'] == 0;

                    //handle maxlength attribute
                    if ($el.attr("maxLength") != null) //only when the attribute is set
                    {
                        var maxLength = $el.prop('maxLength');
                        if (maxLength > -1) { //handle *-repeat
                            $.each(masksets, function (ndx, ms) {
                                if (typeof (ms) == "object") {
                                    if (ms["repeat"] == "*") {
                                        ms["repeat"] = maxLength;
                                    }
                                }
                            });
                        }
                        if (getMaskLength() >= maxLength && maxLength > -1) { //FF sets no defined max length to -1 
                            if (maxLength < getActiveBufferTemplate().length) getActiveBufferTemplate().length = maxLength;
                            if (getActiveMaskSet()['greedy'] == false) {
                                getActiveMaskSet()['repeat'] = Math.round(maxLength / getActiveBufferTemplate().length);
                            }
                            $el.prop('maxLength', getMaskLength() * 2);
                        }
                    }

                    patchValueProperty(el);

                    if (opts.numericInput) opts.isNumeric = opts.numericInput;
                    if (el.dir == "rtl" || (opts.numericInput && opts.rightAlignNumerics) || (opts.isNumeric && opts.rightAlignNumerics))
                        $el.css("text-align", "right");

                    if (el.dir == "rtl" || opts.numericInput) {
                        el.dir = "ltr";
                        $el.removeAttr("dir");
                        var inputData = $el.data('_inputmask');
                        inputData['isRTL'] = true;
                        $el.data('_inputmask', inputData);
                        isRTL = true;
                    }

                    //unbind all events - to make sure that no other mask will interfere when re-masking
                    $el.unbind(".inputmask");
                    $el.removeClass('focus.inputmask');
                    //bind events
                    $el.closest('form').bind("submit", function () { //trigger change on submit if any
                        if (valueOnFocus != getActiveBuffer().join('')) {
                            $el.change();
                        }
                    }).bind('reset', function () {
                        setTimeout(function () {
                            $el.trigger("setvalue");
                        }, 0);
                    });
                    $el.bind("mouseenter.inputmask", function () {
                        var $input = $(this), input = this;
                        if (!$input.hasClass('focus.inputmask') && opts.showMaskOnHover) {
                            if (input._valueGet() != getActiveBuffer().join('')) {
                                writeBuffer(input, getActiveBuffer());
                            }
                        }
                    }).bind("blur.inputmask", function () {
                        var $input = $(this), input = this, nptValue = input._valueGet(), buffer = getActiveBuffer();
                        $input.removeClass('focus.inputmask');
                        if (valueOnFocus != getActiveBuffer().join('')) {
                            $input.change();
                        }
                        if (opts.clearMaskOnLostFocus && nptValue != '') {
                            if (nptValue == getActiveBufferTemplate().join(''))
                                input._valueSet('');
                            else { //clearout optional tail of the mask
                                clearOptionalTail(input);
                            }
                        }
                        if (isComplete(buffer) === false) {
                            $input.trigger("incomplete");
                            if (opts.clearIncomplete) {
                                $.each(masksets, function (ndx, ms) {
                                    if (typeof (ms) == "object") {
                                        ms["buffer"] = ms["_buffer"].slice();
                                        ms["lastValidPosition"] = -1;
                                    }
                                });
                                activeMasksetIndex = 0;
                                if (opts.clearMaskOnLostFocus)
                                    input._valueSet('');
                                else {
                                    buffer = getActiveBufferTemplate().slice();
                                    writeBuffer(input, buffer);
                                }
                            }
                        }
                    }).bind("focus.inputmask", function () {
                        var $input = $(this), input = this, nptValue = input._valueGet();
                        if (opts.showMaskOnFocus && !$input.hasClass('focus.inputmask') && (!opts.showMaskOnHover || (opts.showMaskOnHover && nptValue == ''))) {
                            if (input._valueGet() != getActiveBuffer().join('')) {
                                writeBuffer(input, getActiveBuffer(), seekNext(getActiveMaskSet()["lastValidPosition"]));
                            }
                        }
                        $input.addClass('focus.inputmask');
                        valueOnFocus = getActiveBuffer().join('');
                    }).bind("mouseleave.inputmask", function () {
                        var $input = $(this), input = this;
                        if (opts.clearMaskOnLostFocus) {
                            if (!$input.hasClass('focus.inputmask') && input._valueGet() != $input.attr("placeholder")) {
                                if (input._valueGet() == getActiveBufferTemplate().join('') || input._valueGet() == '')
                                    input._valueSet('');
                                else { //clearout optional tail of the mask
                                    clearOptionalTail(input);
                                }
                            }
                        }
                    }).bind("click.inputmask", function () {
                        var input = this;
                        setTimeout(function () {
                            var selectedCaret = caret(input), buffer = getActiveBuffer();
                            if (selectedCaret.begin == selectedCaret.end) {
                                var clickPosition = isRTL ? TranslatePosition(selectedCaret.begin) : selectedCaret.begin,
                                    lvp = getActiveMaskSet()["lastValidPosition"],
                                    lastPosition;
                                if (opts.isNumeric) {
                                    lastPosition = opts.skipRadixDance === false && opts.radixPoint != "" && $.inArray(opts.radixPoint, buffer) != -1 ?
                                        (opts.numericInput ? seekNext($.inArray(opts.radixPoint, buffer)) : $.inArray(opts.radixPoint, buffer)) :
                                        seekNext(lvp);
                                } else {
                                    lastPosition = seekNext(lvp);
                                }
                                if (clickPosition < lastPosition) {
                                    if (isMask(clickPosition))
                                        caret(input, clickPosition);
                                    else caret(input, seekNext(clickPosition));
                                } else
                                    caret(input, lastPosition);
                            }
                        }, 0);
                    }).bind('dblclick.inputmask', function () {
                        var input = this;
                        setTimeout(function () {
                            caret(input, 0, seekNext(getActiveMaskSet()["lastValidPosition"]));
                        }, 0);
                    }).bind(pasteEvent + ".inputmask dragdrop.inputmask drop.inputmask", function (e) {
                        if (skipInputEvent === true) {
                            skipInputEvent = false;
                            return true;
                        }
                        var input = this, $input = $(input);

                        //paste event for IE8 and lower I guess ;-)
                        if (e.type == "propertychange" && input._valueGet().length <= getMaskLength()) {
                            return true;
                        }
                        setTimeout(function () {
                            var pasteValue = opts.onBeforePaste != undefined ? opts.onBeforePaste.call(this, input._valueGet()) : input._valueGet();
                            checkVal(input, true, false, pasteValue.split(''), true);
                            if (isComplete(getActiveBuffer()) === true)
                                $input.trigger("complete");
                            $input.click();
                        }, 0);
                    }).bind('setvalue.inputmask', function () {
                        var input = this;
                        checkVal(input, true);
                        valueOnFocus = getActiveBuffer().join('');
                        if (input._valueGet() == getActiveBufferTemplate().join(''))
                            input._valueSet('');
                    }).bind('complete.inputmask', opts.oncomplete
                    ).bind('incomplete.inputmask', opts.onincomplete
                    ).bind('cleared.inputmask', opts.oncleared
                    ).bind("keyup.inputmask", keyupEvent);

                    if (androidchrome) {
                        $el.bind("input.inputmask", inputEvent);
                    } else {
                        $el.bind("keydown.inputmask", keydownEvent
                        ).bind("keypress.inputmask", keypressEvent);
                    }

                    if (msie10)
                        $el.bind("input.inputmask", inputEvent);

                    //apply mask
                    checkVal(el, true, false);
                    valueOnFocus = getActiveBuffer().join('');
                    // Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.
                    var activeElement;
                    try {
                        activeElement = document.activeElement;
                    } catch (e) {
                    }
                    if (activeElement === el) { //position the caret when in focus
                        $el.addClass('focus.inputmask');
                        caret(el, seekNext(getActiveMaskSet()["lastValidPosition"]));
                    } else if (opts.clearMaskOnLostFocus) {
                        if (getActiveBuffer().join('') == getActiveBufferTemplate().join('')) {
                            el._valueSet('');
                        } else {
                            clearOptionalTail(el);
                        }
                    } else {
                        writeBuffer(el, getActiveBuffer());
                    }

                    installEventRuler(el);
                }
            }

            //action object
            if (actionObj != undefined) {
                switch (actionObj["action"]) {
                    case "isComplete":
                        return isComplete(actionObj["buffer"]);
                    case "unmaskedvalue":
                        isRTL = actionObj["$input"].data('_inputmask')['isRTL'];
                        return unmaskedvalue(actionObj["$input"], actionObj["skipDatepickerCheck"]);
                    case "mask":
                        mask(actionObj["el"]);
                        break;
                    case "format":
                        $el = $({});
                        $el.data('_inputmask', {
                            'masksets': masksets,
                            'activeMasksetIndex': activeMasksetIndex,
                            'opts': opts,
                            'isRTL': opts.numericInput
                        });
                        if (opts.numericInput) {
                            opts.isNumeric = opts.numericInput;
                            isRTL = true;
                        }

                        checkVal($el, false, false, actionObj["value"].split(''), true);
                        return getActiveBuffer().join('');
                }
            }
        }
        $.inputmask = {
            //options default
            defaults: {
                placeholder: "_",
                optionalmarker: { start: "[", end: "]" },
                quantifiermarker: { start: "{", end: "}" },
                groupmarker: { start: "(", end: ")" },
                escapeChar: "\\",
                mask: null,
                oncomplete: $.noop, //executes when the mask is complete
                onincomplete: $.noop, //executes when the mask is incomplete and focus is lost
                oncleared: $.noop, //executes when the mask is cleared
                repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
                greedy: true, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
                autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
                clearMaskOnLostFocus: true,
                insertMode: true, //insert the input or overwrite the input
                clearIncomplete: false, //clear the incomplete input on blur
                aliases: {}, //aliases definitions => see jquery.inputmask.extensions.js
                onKeyUp: $.noop, //override to implement autocomplete on certain keys for example
                onKeyDown: $.noop, //override to implement autocomplete on certain keys for example
                onBeforePaste: undefined, //executes before masking the pasted value to allow preprocessing of the pasted value.  args => pastedValue => return processedValue
                onUnMask: undefined, //executes after unmasking to allow postprocessing of the unmaskedvalue.  args => maskedValue, unmaskedValue
                showMaskOnFocus: true, //show the mask-placeholder when the input has focus
                showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
                onKeyValidation: $.noop, //executes on every key-press with the result of isValid. Params: result, opts
                skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
                showTooltip: false, //show the activemask as tooltip
                numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
                //numeric basic properties
                isNumeric: false, //enable numeric features
                radixPoint: "", //".", // | ","
                skipRadixDance: false, //disable radixpoint caret positioning
                rightAlignNumerics: true, //align numerics to the right
                //numeric basic properties
                definitions: {
                    '9': {
                        validator: "[0-9]",
                        cardinality: 1
                    },
                    'a': {
                        validator: "[A-Za-z\u0410-\u044F\u0401\u0451]",
                        cardinality: 1
                    },
                    '*': {
                        validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
                        cardinality: 1
                    }
                },
                keyCode: {
                    ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
                    NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
                },
                //specify keycodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
                getMaskLength: function (buffer, greedy, repeat, currentBuffer, opts) {
                    var calculatedLength = buffer.length;
                    if (!greedy) {
                        if (repeat == "*") {
                            calculatedLength = currentBuffer.length + 1;
                        } else if (repeat > 1) {
                            calculatedLength += (buffer.length * (repeat - 1));
                        }
                    }
                    return calculatedLength;
                }
            },
            escapeRegex: function (str) {
                var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
                return str.replace(new RegExp('(\\' + specials.join('|\\') + ')', 'gim'), '\\$1');
            },
            format: function (value, options) {
                var opts = $.extend(true, {}, $.inputmask.defaults, options);
                resolveAlias(opts.alias, options, opts);
                return maskScope(generateMaskSets(opts), 0, opts, { "action": "format", "value": value });
            }
        };

        $.fn.inputmask = function (fn, options) {
            var opts = $.extend(true, {}, $.inputmask.defaults, options),
                masksets,
                activeMasksetIndex = 0;

            if (typeof fn === "string") {
                switch (fn) {
                    case "mask":
                        //resolve possible aliases given by options
                        resolveAlias(opts.alias, options, opts);
                        masksets = generateMaskSets(opts);
                        if (masksets.length == 0) { return this; }

                        return this.each(function () {
                            maskScope($.extend(true, {}, masksets), 0, opts, { "action": "mask", "el": this });
                        });
                    case "unmaskedvalue":
                        var $input = $(this), input = this;
                        if ($input.data('_inputmask')) {
                            masksets = $input.data('_inputmask')['masksets'];
                            activeMasksetIndex = $input.data('_inputmask')['activeMasksetIndex'];
                            opts = $input.data('_inputmask')['opts'];
                            return maskScope(masksets, activeMasksetIndex, opts, { "action": "unmaskedvalue", "$input": $input });
                        } else return $input.val();
                    case "remove":
                        return this.each(function () {
                            var $input = $(this), input = this;
                            if ($input.data('_inputmask')) {
                                masksets = $input.data('_inputmask')['masksets'];
                                activeMasksetIndex = $input.data('_inputmask')['activeMasksetIndex'];
                                opts = $input.data('_inputmask')['opts'];
                                //writeout the unmaskedvalue
                                input._valueSet(maskScope(masksets, activeMasksetIndex, opts, { "action": "unmaskedvalue", "$input": $input, "skipDatepickerCheck": true }));
                                //clear data
                                $input.removeData('_inputmask');
                                //unbind all events
                                $input.unbind(".inputmask");
                                $input.removeClass('focus.inputmask');
                                //restore the value property
                                var valueProperty;
                                if (Object.getOwnPropertyDescriptor)
                                    valueProperty = Object.getOwnPropertyDescriptor(input, "value");
                                if (valueProperty && valueProperty.get) {
                                    if (input._valueGet) {
                                        Object.defineProperty(input, "value", {
                                            get: input._valueGet,
                                            set: input._valueSet
                                        });
                                    }
                                } else if (document.__lookupGetter__ && input.__lookupGetter__("value")) {
                                    if (input._valueGet) {
                                        input.__defineGetter__("value", input._valueGet);
                                        input.__defineSetter__("value", input._valueSet);
                                    }
                                }
                                try { //try catch needed for IE7 as it does not supports deleting fns
                                    delete input._valueGet;
                                    delete input._valueSet;
                                } catch (e) {
                                    input._valueGet = undefined;
                                    input._valueSet = undefined;

                                }
                            }
                        });
                        break;
                    case "getemptymask": //return the default (empty) mask value, usefull for setting the default value in validation
                        if (this.data('_inputmask')) {
                            masksets = this.data('_inputmask')['masksets'];
                            activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
                            return masksets[activeMasksetIndex]['_buffer'].join('');
                        }
                        else return "";
                    case "hasMaskedValue": //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value 
                        return this.data('_inputmask') ? !this.data('_inputmask')['opts'].autoUnmask : false;
                    case "isComplete":
                        masksets = this.data('_inputmask')['masksets'];
                        activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
                        opts = this.data('_inputmask')['opts'];
                        return maskScope(masksets, activeMasksetIndex, opts, { "action": "isComplete", "buffer": this[0]._valueGet().split('') });
                    case "getmetadata": //return mask metadata if exists
                        if (this.data('_inputmask')) {
                            masksets = this.data('_inputmask')['masksets'];
                            activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
                            return masksets[activeMasksetIndex]['metadata'];
                        }
                        else return undefined;
                    default:
                        //check if the fn is an alias
                        if (!resolveAlias(fn, options, opts)) {
                            //maybe fn is a mask so we try
                            //set mask
                            opts.mask = fn;
                        }
                        masksets = generateMaskSets(opts);
                        if (masksets.length == 0) { return this; }
                        return this.each(function () {
                            maskScope($.extend(true, {}, masksets), activeMasksetIndex, opts, { "action": "mask", "el": this });
                        });

                        break;
                }
            } else if (typeof fn == "object") {
                opts = $.extend(true, {}, $.inputmask.defaults, fn);

                resolveAlias(opts.alias, fn, opts); //resolve aliases
                masksets = generateMaskSets(opts);
                if (masksets.length == 0) { return this; }
                return this.each(function () {
                    maskScope($.extend(true, {}, masksets), activeMasksetIndex, opts, { "action": "mask", "el": this });
                });
            } else if (fn == undefined) {
                //look for data-inputmask atribute - the attribute should only contain optipns
                return this.each(function () {
                    var attrOptions = $(this).attr("data-inputmask");
                    if (attrOptions && attrOptions != "") {
                        try {
                            attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
                            var dataoptions = $.parseJSON("{" + attrOptions + "}");
                            $.extend(true, dataoptions, options);
                            opts = $.extend(true, {}, $.inputmask.defaults, dataoptions);
                            resolveAlias(opts.alias, dataoptions, opts);
                            opts.alias = undefined;
                            $(this).inputmask(opts);
                        } catch (ex) { } //need a more relax parseJSON
                    }
                });
            }
        };
    }
})(jQuery);

/*! iCheck v1.0.1 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
(function(h){function F(a,b,d){var c=a[0],e=/er/.test(d)?m:/bl/.test(d)?s:l,f=d==H?{checked:c[l],disabled:c[s],indeterminate:"true"==a.attr(m)||"false"==a.attr(w)}:c[e];if(/^(ch|di|in)/.test(d)&&!f)D(a,e);else if(/^(un|en|de)/.test(d)&&f)t(a,e);else if(d==H)for(e in f)f[e]?D(a,e,!0):t(a,e,!0);else if(!b||"toggle"==d){if(!b)a[p]("ifClicked");f?c[n]!==u&&t(a,e):D(a,e)}}function D(a,b,d){var c=a[0],e=a.parent(),f=b==l,A=b==m,B=b==s,K=A?w:f?E:"enabled",p=k(a,K+x(c[n])),N=k(a,b+x(c[n]));if(!0!==c[b]){if(!d&&
b==l&&c[n]==u&&c.name){var C=a.closest("form"),r='input[name="'+c.name+'"]',r=C.length?C.find(r):h(r);r.each(function(){this!==c&&h(this).data(q)&&t(h(this),b)})}A?(c[b]=!0,c[l]&&t(a,l,"force")):(d||(c[b]=!0),f&&c[m]&&t(a,m,!1));L(a,f,b,d)}c[s]&&k(a,y,!0)&&e.find("."+I).css(y,"default");e[v](N||k(a,b)||"");B?e.attr("aria-disabled","true"):e.attr("aria-checked",A?"mixed":"true");e[z](p||k(a,K)||"")}function t(a,b,d){var c=a[0],e=a.parent(),f=b==l,h=b==m,q=b==s,p=h?w:f?E:"enabled",t=k(a,p+x(c[n])),
u=k(a,b+x(c[n]));if(!1!==c[b]){if(h||!d||"force"==d)c[b]=!1;L(a,f,p,d)}!c[s]&&k(a,y,!0)&&e.find("."+I).css(y,"pointer");e[z](u||k(a,b)||"");q?e.attr("aria-disabled","false"):e.attr("aria-checked","false");e[v](t||k(a,p)||"")}function M(a,b){if(a.data(q)){a.parent().html(a.attr("style",a.data(q).s||""));if(b)a[p](b);a.off(".i").unwrap();h(G+'[for="'+a[0].id+'"]').add(a.closest(G)).off(".i")}}function k(a,b,d){if(a.data(q))return a.data(q).o[b+(d?"":"Class")]}function x(a){return a.charAt(0).toUpperCase()+
a.slice(1)}function L(a,b,d,c){if(!c){if(b)a[p]("ifToggled");a[p]("ifChanged")[p]("if"+x(d))}}var q="iCheck",I=q+"-helper",u="radio",l="checked",E="un"+l,s="disabled",w="determinate",m="in"+w,H="update",n="type",v="addClass",z="removeClass",p="trigger",G="label",y="cursor",J=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);h.fn[q]=function(a,b){var d='input[type="checkbox"], input[type="'+u+'"]',c=h(),e=function(a){a.each(function(){var a=h(this);c=a.is(d)?
c.add(a):c.add(a.find(d))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a))return a=a.toLowerCase(),e(this),c.each(function(){var c=h(this);"destroy"==a?M(c,"ifDestroyed"):F(c,!0,a);h.isFunction(b)&&b()});if("object"!=typeof a&&a)return this;var f=h.extend({checkedClass:l,disabledClass:s,indeterminateClass:m,labelHover:!0,aria:!1},a),k=f.handle,B=f.hoverClass||"hover",x=f.focusClass||"focus",w=f.activeClass||"active",y=!!f.labelHover,C=f.labelHoverClass||
"hover",r=(""+f.increaseArea).replace("%","")|0;if("checkbox"==k||k==u)d='input[type="'+k+'"]';-50>r&&(r=-50);e(this);return c.each(function(){var a=h(this);M(a);var c=this,b=c.id,e=-r+"%",d=100+2*r+"%",d={position:"absolute",top:e,left:e,display:"block",width:d,height:d,margin:0,padding:0,background:"#fff",border:0,opacity:0},e=J?{position:"absolute",visibility:"hidden"}:r?d:{position:"absolute",opacity:0},k="checkbox"==c[n]?f.checkboxClass||"icheckbox":f.radioClass||"i"+u,m=h(G+'[for="'+b+'"]').add(a.closest(G)),
A=!!f.aria,E=q+"-"+Math.random().toString(36).replace("0.",""),g='<div class="'+k+'" '+(A?'role="'+c[n]+'" ':"");m.length&&A&&m.each(function(){g+='aria-labelledby="';this.id?g+=this.id:(this.id=E,g+=E);g+='"'});g=a.wrap(g+"/>")[p]("ifCreated").parent().append(f.insert);d=h('<ins class="'+I+'"/>').css(d).appendTo(g);a.data(q,{o:f,s:a.attr("style")}).css(e);f.inheritClass&&g[v](c.className||"");f.inheritID&&b&&g.attr("id",q+"-"+b);"static"==g.css("position")&&g.css("position","relative");F(a,!0,H);
if(m.length)m.on("click.i mouseover.i mouseout.i touchbegin.i touchend.i",function(b){var d=b[n],e=h(this);if(!c[s]){if("click"==d){if(h(b.target).is("a"))return;F(a,!1,!0)}else y&&(/ut|nd/.test(d)?(g[z](B),e[z](C)):(g[v](B),e[v](C)));if(J)b.stopPropagation();else return!1}});a.on("click.i focus.i blur.i keyup.i keydown.i keypress.i",function(b){var d=b[n];b=b.keyCode;if("click"==d)return!1;if("keydown"==d&&32==b)return c[n]==u&&c[l]||(c[l]?t(a,l):D(a,l)),!1;if("keyup"==d&&c[n]==u)!c[l]&&D(a,l);else if(/us|ur/.test(d))g["blur"==
d?z:v](x)});d.on("click mousedown mouseup mouseover mouseout touchbegin.i touchend.i",function(b){var d=b[n],e=/wn|up/.test(d)?w:B;if(!c[s]){if("click"==d)F(a,!1,!0);else{if(/wn|er|in/.test(d))g[v](e);else g[z](e+" "+w);if(m.length&&y&&e==B)m[/ut|nd/.test(d)?z:v](C)}if(J)b.stopPropagation();else return!1}})})}})(window.jQuery||window.Zepto);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbHMuanMiLCJmdW5jdGlvbnMuanMiLCJiYXNlLmpzIiwiY29udHJvbGxlcnMuanMiLCJhamF4LmpzIiwiYWpheDIuanMiLCJjaWVycmVDYWphLmpzIiwiZXh0cmFzLmpzIiwiYWRtaW5sdGUubWluLmpzIiwianF1ZXJ5LmlucHV0bWFzay5qcyIsImljaGVjay5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbDdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3prQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDelZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMWxEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImZvb3QyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBCQVNFX1VSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBcIi9cIjtcclxuaWYoQkFTRV9VUkwuaW5jbHVkZXMoXCJsb2NhbGhvc3RcIikgfHwgQkFTRV9VUkwuaW5jbHVkZXMoJ25ncm9rLmlvJykpe1xyXG4gIEJBU0VfVVJMICs9ICdpY3BheW1lbnQvJztcclxufVxyXG5cclxudmFyIE1FU1NBR0VfU1VDQ0VTUyA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZG9uZV9hbGw8L2k+JztcclxudmFyIE1FU1NBR0VfRVJST1IgICA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZXJyb3Jfb3V0bGluZTwvaT4nO1xyXG52YXIgTUVTU0FHRV9JTkZPICAgID0gJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5pbmZvX291dGxpbmU8L2k+JztcclxudmFyIFNVTU1FUl9TS1kgICAgICA9ICcjMUZBMUQwJ1xyXG5cclxuLyoqXHJcbiAqIENvbm5lY3QgQW5kIFNlbmRcclxuICogQ29uZWN0YSBhbCBzZXJ2aWRvciB2aWEgYWpheCB5IG11ZXN0cmEgZWwgbWVuc2FqZSBkZSByZXNwdWVzdGFcclxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVcmwgYSBkb25kZSBzZSB2YSBhIG1hbmRhciBsYSBlbCBmb3JtdWxhcmlvLCBzaW4gbGEgYmFzZV91cmxcclxuICogQHBhcmFtIHtib29sZWFufSBpc19tZXNzYWdlIFNpIHNlIGVzcGVyYSB1biBtZW5zYWplIG8gbm8gY29tbyByZXNwdWVzdGEgXHJcbiAqIEBwYXJhbSB7Y2FsbGJhY2t9IHJlY29nbml6ZUVsZW1lbnRzIEZ1bmNpb24gcGFyYSByZWNvbm9jZXIgbG9zIGVsZW1lbnRvcyBhdXRvZ2VuZXJhZG9zXHJcbiAqIEBwYXJhbSB7P2NhbGxiYWNrfSBhY3Rpb24gY2FsbGJhY2sgcXVlIHJlY2liZSBsb3MgZGF0b3MgZGVzZGUgZWwgc2Vydmlkb3IgcGFyYSBoYWNlciBhbGdvIGNvbiBlbGxvc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybSBmb3JtdWxhcmlvIGEgc2VyIGVudmlhZG8gYWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtjYWxsYmFja30gY2FsbGJhY2sgZnVuY2lvbiBhIHNlciBlamVjdXRhZGEgZGVzcHVlcyBxdWUgdG9kbyBzZSBjdW1wbGEsIGNvbW8gZ2V0IHVzZXJzXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGxvYWRpbmcgZnVuY3Rpb24gZm9yIGxvYWRpbmdcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBjb25uZWN0QW5kU2VuZCh1cmwsaXNfbWVzc2FnZSxyZWNvZ25pemVFbGVtZW50cyxhY3Rpb24sZm9ybSxjYWxsYmFjayxsb2FkaW5nKXtcclxuICBpZighbG9hZGluZykgbG9hZGluZyA9IGxpbmVMb2FkXHJcbiAgdmFyIGNvbm5lY3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPyBuZXcgWE1MSHR0cFJlcXVlc3QoKSA6IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyBcclxuICAgIGNvbm5lY3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNvbm5lY3QucmVhZHlTdGF0ZSA9PSA0ICYmIGNvbm5lY3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYobG9hZGluZylsb2FkaW5nKHRydWUpO1xyXG4gICAgICAgICAgaWYgKGFjdGlvbiAhPSBudWxsKSAge1xyXG4gICAgICAgICAgICAgIGFjdGlvbihjb25uZWN0LnJlc3BvbnNlVGV4dCxyZWNvZ25pemVFbGVtZW50cyk7ICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoaXNfbWVzc2FnZSl7XHJcbiAgICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoY29ubmVjdC5yZXNwb25zZVRleHQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihjYWxsYmFjayAhPSBudWxsKWNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgZWxzZSBpZiAoY29ubmVjdC5yZWFkeVN0YXRlICE9IDQpIHtcclxuICAgICAgICAgIGlmKGxvYWRpbmcpbG9hZGluZyhmYWxzZSk7ICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3Qub3BlbihcIlBPU1RcIixCQVNFX1VSTCArIHVybCwgdHJ1ZSk7XHJcbiAgICBjb25uZWN0LnNldFJlcXVlc3RIZWFkZXIoXCJjb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICBjb25uZWN0LnNlbmQoZm9ybSk7XHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogICAgICAgICBGdW5jaW9uZXMgZGUgbWVuc2FqZXMgeSBub3RpZmljYWNpb25lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vKipcclxuICogRGlzcGxheSBNZXNzYWdlXHJcbiAqIE11ZXN0cmEgdW5hIG5vdGlmaWNhY2lvbiBkZWwgcmVzdWx0YWRvIGRlIGxhIGNvbnN1bHRhXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIHN0cmluZyB0byBiZSBkaXNwbGF5ZWQgXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZGlzcGxheU1lc3NhZ2UobWVzc2FnZSl7XHJcbiAgdmFyIGNvbG9yID0gXCJyZ2JhKDEwMiwxODcsMTA2LDEpXCI7XHJcbiAgdmFyIHRvYXN0LHNwYW47XHJcblxyXG4gICAgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0VSUk9SKSl7XHJcbiAgICAgIGNvbG9yID0gXCJyZ2JhKDI0NCw2Nyw1NCwxKVwiO1xyXG4gICAgfWVsc2UgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0lORk8pKXtcclxuICAgICAgY29sb3IgPSBcInJnYmEoMiwxMzYsMjA5LDEpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgPSAkKFwiLnRvYXN0XCIpXHJcbiAgICBzcGFuID0gdG9hc3QuZmluZChcInNwYW5cIikuaHRtbChtZXNzYWdlKTtcclxuICAgIHNwYW4uY3NzKHtiYWNrZ3JvdW5kOmNvbG9yfSk7XHJcbiAgICB0b2FzdC5jc3Moe2Rpc3BsYXk6XCJmbGV4XCJ9KTtcclxuICAgIFxyXG4gICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjFcIn0sNTAwLGZ1bmN0aW9uKCl7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjBcIn0pO1xyXG4gICAgICAgIHRvYXN0LmNzcyh7ZGlzcGxheTpcIm5vbmVcIn0pO1xyXG4gICAgICB9LCAyMDAwKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5QWxlcnQodGl0bGUsbWVzc2FnZSx0eXBlKXtcclxuICBpZighdGl0bGUpIHRpdGxlID0gXCJSZXZpc2VcIjtcclxuICBpZighbWVzc2FnZSkgbWVzc2FnZSA9IFwiQXNlZ3VyYXRlIGRlIGxsZW5hciB0b2RvcyBsb3MgY2FtcG9zXCJcclxuICBpZighdHlwZSkgdHlwZSA9IFwiZXJyb3JcIlxyXG4gIHN3YWwoe1xyXG4gICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIHRleHQ6IG1lc3NhZ2UsXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bicsXHJcbiAgICAgIGJ1dHRvbnNTdHlsaW5nOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICBmdWNuaW9uZXMgcGFyYSBMbGVuYXIgdGFibGFzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogTGxlbmEgbGEgdGFibGEgYWN0dWFsIGNvbiBsb3MgZGF0b3MgcXVlIHZpZW5lbiBkZWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtzdHJpbmd9ICRjb250ZW50IEVsIGh0bWwgY29uIGxvcyBkYXRvcyBhIHNlciBtb3N0cmFkb3MsIHZpZW5lbiBzaWVtcHJlIGRlc2RlIGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEVsIGNhbGxiYWNrIHBhcmEgcmVjb25vY2VyIGEgbG9zIG51ZXZvcyBpdGVtc1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZnVuY3Rpb24gZmlsbEN1cnJlbnRUYWJsZSgkY29udGVudCxjYWxsYmFjayx0YWJsZUlEKXtcclxuICB2YXIgJHRhYmxlXHJcbiAgJChcImh0bWxcIikucmVtb3ZlQ2xhc3MoXCJncl9faWNwYXltZW50LXNvZnRfY29tXCIpXHJcbiAgaWYodGFibGVJRCAhPSB1bmRlZmluZWQpe1xyXG4gICAgJHRhYmxlID0gJCgnIycrdGFibGVJRCArIFwiIHRib2R5XCIpO1xyXG4gIH1lbHNle1xyXG4gICAgJHRhYmxlID0gJCgnW2NsYXNzKj1cInQtXCJdIHRib2R5Jyk7XHJcbiAgfVxyXG4gICR0YWJsZS5odG1sKCRjb250ZW50KTtcclxuICBpZihjYWxsYmFjaykgY2FsbGJhY2soKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExsZW5hIGxhIHRhYmxhIGNsaWVudGVzIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2xpZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2spe1xyXG4gIGZpbGxDdXJyZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2ssXCJ0LWNsaWVudHNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMbGVuYSBsYSB0YWJsYSBjYWphIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2FqYVRhYmxlKCRjb250ZW50LGNhbGxiYWNrKXtcclxuICBmaWxsQ3VycmVudFRhYmxlKCRjb250ZW50LGNhbGxiYWNrLFwiY2FqYVwiKTtcclxuICBpZihjYWxsYmFjayljYWxsYmFjaygpO1xyXG59XHJcbi8qKlxyXG4gKiBMbGVuYSBsYSBMaXN0YSBkZSBwYWdvcy9ub3RpZmljYWNpb25lcyBjb24gbG9zIGRhdG9zIHF1ZSB2aWVuZW4gZGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSAkY29udGVudCBFbCBodG1sIGNvbiBsb3MgZGF0b3MgYSBzZXIgbW9zdHJhZG9zLCB2aWVuZW4gc2llbXByZSBkZXNkZSBlbCBzZXJ2aWRvclxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBFbCBjYWxsYmFjayBwYXJhIHJlY29ub2NlciBhIGxvcyBudWV2b3MgaXRlbXNcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBmaWxsUGF5bWVudHNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIubGlzdC1uZXh0cGF5bWVudHNcIik7XHJcbiAgJGNvbnRhaW5lci5odG1sKCRjb250ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbEF2ZXJpYXNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIjYXZlcmlhcy1saXN0XCIpO1xyXG4gICRjb250YWluZXIuaHRtbCgkY29udGVudCk7XHJcbiAgY2FsbGJhY2soKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbEluc3RhbGxhdGlvbnNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIjaW5zdGFsbGF0aW9ucy1saXN0XCIpO1xyXG4gICRjb250YWluZXIuaHRtbCgkY29udGVudCk7XHJcbiAgY2FsbGJhY2soKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUNvbnRyYWN0TGlzdChyZXNwb25zZSxjYWxsYmFjayl7XHJcbiAgaWYocmVzcG9uc2UgIT0gXCJuYWRhXCIpe1xyXG4gICAgdmFyIGNvbnRyYWN0cyA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG4gICAgdmFyIHZhbHVlLHNlcnZpY2UsZXF1aXBtZW50LGVNYWMscm91dGVyLHJNYWMsY29kZTtcclxuICAgIHZhciBzZWxlY3RDb250cmFjdCA9ICQoXCIjZXh0cmEtY2xpZW50LWNvbnRyYWN0XCIpO1xyXG4gICAgdmFyIGVsZW1lbnQgPSBcIjxvcHRpb24gdmFsdWU9Jyc+LS1TZWxlY2Npb25hLS08L29wdGlvbj5cIjtcclxuICAgIHZhciBjbGllbnRlID0gY29udHJhY3RzLmNsaWVudGU7XHJcbiAgICB2YXIgY29udHJhY3RJZCBcclxuICAgIGlmKGN1cnJlbnRQYWdlICE9ICdkZXRhbGxlcycpe1xyXG4gICAgICBjb250cmFjdElkID0gY29udHJhY3RUYWJsZS5nZXRJZCgpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIGNvbnRyYWN0SWQgPSBkZXRhaWxzQ29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpLmlkX2NvbnRyYXRvXHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250cmFjdHMuY29udHJhdG9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhbHVlICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJpZF9jb250cmF0b1wiXTtcclxuICAgICAgc2VydmljZSAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcInNlcnZpY2lvXCJdO1xyXG4gICAgICBlcXVpcG1lbnQgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wibm9tYnJlX2VxdWlwb1wiXTtcclxuICAgICAgcm91dGVyICAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcInJvdXRlclwiXTtcclxuICAgICAgZU1hYyAgICAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcIm1hY19lcXVpcG9cIl07XHJcbiAgICAgIHJNYWMgICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJtYWNfcm91dGVyXCJdO1xyXG4gICAgICBjb2RlICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJjb2RpZ29cIl07XHJcbiAgICAgIGVsZW1lbnQgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIiArIHZhbHVlICsgXCInIGRhdGEtc2VydmljZT0nXCIrc2VydmljZStcIicgIGRhdGEtZXF1aXBtZW50PSdcIitlcXVpcG1lbnQrXCInICBkYXRhLWUtbWFjPSdcIitlTWFjK1wiJ1wiO1xyXG4gICAgICBlbGVtZW50ICs9IFwiIGRhdGEtcm91dGVyPSdcIityb3V0ZXIrXCInICBkYXRhLXItbWFjPSdcIityTWFjK1wiJyBkYXRhLWNvZGU9J1wiK2NvZGUrXCInPlwiO1xyXG4gICAgICBlbGVtZW50ICs9IHZhbHVlICtcIjwvb3B0aW9uPlwiOyAgXHJcbiAgICB9XHJcbiAgICBzZWxlY3RDb250cmFjdC5odG1sKGVsZW1lbnQpO1xyXG4gICAgc2VsZWN0Q29udHJhY3QudmFsKGNvbnRyYWN0SWQpLmNoYW5nZSgpO1xyXG4gICAgJChcIiNleHRyYS1jbGllbnQtbmFtZVwiKS52YWwoY2xpZW50ZVsnbm9tYnJlcyddICsgXCIgXCIgKyBjbGllbnRlWydhcGVsbGlkb3MnXSk7XHJcblxyXG4gIH1lbHNle1xyXG4gICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArIFwiIEVzdGUgY2xpZW50ZSBubyBleGlzdGUgcmV2aXNlIHN1IGNlZHVsYSBwb3IgZmF2b3JcIik7XHJcbiAgfSBcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJUYm9keShvYmplY0lkKXtcclxuICAkKG9iamVjSWQpLmh0bWwoXCJcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VQYXltZW50TGlzdChyZXNwb25zZSxjYWxsYmFjayl7XHJcbiAgdmFyIHNlbGVjdFBheVVudGlsID0gJCgnI3NlbGVjdC1wYXktdW50aWwnKTtcclxuICBzZWxlY3RQYXlVbnRpbC5odG1sKHJlc3BvbnNlKTtcclxuICBzZWxlY3RQYXlVbnRpbC5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gIHNlbGVjdFBheVVudGlsLmNoYW5nZSgpO1xyXG4gIGlmKGNhbGxiYWNrKWNhbGxiYWNrKCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogaXNFbXB0eVxyXG4gKiBWZXJpZmljYSBzaSBsb3MgdmFsb3JlcyBkYWRvcyBlc3RhbiB2YWNpb3MgbyBzb24gbnVsb3MgXHJcbiAqIEBwYXJhbSB7QXJyYXkuIDwgc3RyaW5nfSB2YWx1ZXNcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWVzLGlzX251bSl7XHJcbiAgZm9yKHZhciBpID0gMCA7IGkgPCB2YWx1ZXMubGVuZ3RoIDsgaSsrKXtcclxuICAgIGlmICh2YWx1ZXNbaV0gPT0gbnVsbCB8fCB2YWx1ZXNbaV0gPT0gXCJcIil7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2FsZG8obW9uZXkpe1xyXG4gIG1vbmV5ID0gXCJSRCQgXCIrIEN1cnJlbmN5Rm9ybWF0KG1vbmV5KVxyXG4gICQoXCIuY3VycmVudC1zYWxkb1wiKS50ZXh0KG1vbmV5KTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVDb3VudCgkY29udGVudCl7XHJcbiAgJChcIi50b3RhbC1yb3dzXCIpLmh0bWwoJGNvbnRlbnQpO1xyXG59XHJcbi8vICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcclxuLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlciBwYXNzd29yZHMgdmFsaWRhdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4vLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbi8vICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcclxuLy9cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTW9kYWwoJG1vZGFsSWQpe1xyXG4gIHZhciAkdXNlclBhc3N3b3JkID0gJCgkbW9kYWxJZCsnIC5wYXNzd29yZCcpO1xyXG4gIHZhciAkdXNlclBhc3N3b3JkQ29uZmlybSA9ICQoJG1vZGFsSWQrJyAucGFzc3dvcmQtY29uZmlybScpO1xyXG4gIHZhciAkc2F2ZUJ1dHRvbiA9ICQoJG1vZGFsSWQrJyAuc2F2ZScpO1xyXG4gIFxyXG4gICR1c2VyUGFzc3dvcmRDb25maXJtLm9uKCdibHVyIGtleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVUd28oJHVzZXJQYXNzd29yZCwkdXNlclBhc3N3b3JkQ29uZmlybSwkc2F2ZUJ1dHRvbik7XHJcbiAgfSk7XHJcbiAgJHNhdmVCdXR0b24ub24oJ2NsaWNrJyxjbGVhckZvcm0oJG1vZGFsSWQpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVUd28oJGZpcnN0T2JqZWN0LCRzZWNvbmRPYmplY3QsJGJ1dHRvbil7XHJcbiAgICBpZigkc2Vjb25kT2JqZWN0LnZhbCgpID09ICRmaXJzdE9iamVjdC52YWwoKSAmJiAkc2Vjb25kT2JqZWN0LnZhbCgpICE9IFwiXCIpe1xyXG4gICAgICByZXBsYWNlQ2xhc3MoJGZpcnN0T2JqZWN0LnBhcmVudCgpLFwiaGFzLWVycm9yXCIsXCJoYXMtc3VjY2Vzc1wiKTtcclxuICAgICAgcmVwbGFjZUNsYXNzKCRzZWNvbmRPYmplY3QucGFyZW50KCksXCJoYXMtZXJyb3JcIixcImhhcy1zdWNjZXNzXCIpO1xyXG4gICAgICAkYnV0dG9uLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiLFwiXCIpO1xyXG5cclxuICAgIH1lbHNle1xyXG4gICAgICAgcmVwbGFjZUNsYXNzKCRmaXJzdE9iamVjdC5wYXJlbnQoKSxcImhhcy1zdWNjZXNzXCIsXCJoYXMtZXJyb3JcIik7XHJcbiAgICAgICByZXBsYWNlQ2xhc3MoJHNlY29uZE9iamVjdC5wYXJlbnQoKSxcImhhcy1zdWNjZXNzXCIsXCJoYXMtZXJyb3JcIik7XHJcbiAgICAgICAkYnV0dG9uLmF0dHIoXCJkaXNhYmxlZFwiLFwiXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVRoaXMoKXtcclxuICB2YXIgJHVzZXJQYXNzd29yZCA9ICQoJy5wYXNzd29yZCcpO1xyXG4gIHZhciAkdXNlclBhc3N3b3JkQ29uZmlybSA9ICQoJy5wYXNzd29yZC1jb25maXJtJyk7XHJcbiAgdmFyICRzYXZlQnV0dG9uID0gJCgnLnNhdmUnKTtcclxuICBcclxuICAkdXNlclBhc3N3b3JkLm9uKCdibHVyIGtleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVUd28oJHVzZXJQYXNzd29yZCwkdXNlclBhc3N3b3JkQ29uZmlybSwkc2F2ZUJ1dHRvbik7XHJcbiAgfSk7XHJcbiAgJHVzZXJQYXNzd29yZENvbmZpcm0ub24oJ2JsdXIga2V5dXAnLGZ1bmN0aW9uKCl7XHJcbiAgICB2YWxpZGF0ZVR3bygkdXNlclBhc3N3b3JkLCR1c2VyUGFzc3dvcmRDb25maXJtLCRzYXZlQnV0dG9uKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJGb3JtKG1vZGFsSWQpe1xyXG4gICQobW9kYWxJZCArIFwiIGlucHV0XCIpLnZhbChcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBkZWxldGVWYWxpZGF0aW9uKCRpbnB1dEVsZW1lbnQsIHRleHQsICRidXR0b25Ub0FjdGl2ZSl7XHJcbiAgdmFyIGlubmVyVGV4dDtcclxuICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gIHZhciBzZWxmICA9IHRoaXM7XHJcbiAgdmFyIHdhcm5pbmcgPSAkKCcjY2FuY2VsLWNvbnRyYWN0LW1vZGFsIC5hbGVydCcpO1xyXG5cclxuICAkaW5wdXRFbGVtZW50Lm9uKFwia2V5dXBcIixmdW5jdGlvbihlKXtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBpbm5lclRleHQgPSAkKHRoaXMpLnZhbCgpIFxyXG4gICAgaWYoaW5uZXJUZXh0LnRvTG93ZXJDYXNlKCkgPT0gc2VsZi50ZXh0LnRvTG93ZXJDYXNlKCkpe1xyXG4gICAgICAkYnV0dG9uVG9BY3RpdmUucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICB3YXJuaW5nLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgJGJ1dHRvblRvQWN0aXZlLmF0dHIoXCJkaXNhYmxlZFwiLFwiXCIpO1xyXG4gICAgICB3YXJuaW5nLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdW5jaW9uZXMgZGUgdXRpbGVyaWEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbi8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vL1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJlcGxhY2VDbGFzcygkb2JqZWN0LG9sZENsYXNzLG5ld0NsYXNzKXtcclxuICAgJG9iamVjdC5hZGRDbGFzcyhuZXdDbGFzcyk7XHJcbiAgICRvYmplY3QucmVtb3ZlQ2xhc3Mob2xkQ2xhc3MpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VTZXJ2aWNlQ2FyZENsaWNrYWJsZSgpe1xyXG4gICAgdmFyIHNlcnZpY2VDYXJkICAgICAgPSAkKFwiLnNlcnZpY2UtY2FyZFwiKTtcclxuICAgIHZhciBidG5QcmludENvbnRyYWN0ID0gJCgnI2J0bi1wcmludC1yZXF1aXJlbWVudCcpO1xyXG5cclxuICAgIHNlcnZpY2VDYXJkLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciAkdGhpcyAgICAgICA9ICQodGhpcyk7XHJcbiAgICAgIHZhciBzZXJ2aWNlX2lkICA9ICR0aGlzLmF0dHIoJ2RhdGEtaWQnKTsgXHJcbiAgICAgIHZhciBwYXltZW50ICAgICA9ICR0aGlzLmF0dHIoJ2RhdGEtcGF5bWVudCcpO1xyXG4gICAgICB2YXIgcmVhbExpbmsgICAgPSBidG5QcmludENvbnRyYWN0LmF0dHIoJ2RhdGEtaHJlZicpXHJcbiAgICAgIFxyXG4gICAgICBzZXJ2aWNlQ2FyZC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgIGJ0blByaW50Q29udHJhY3QuYXR0cihcImhyZWZcIixyZWFsTGluayArIFwiL1wiICsgc2VydmljZV9pZCk7XHJcbiAgICAgICQoJyNjb250cmFjdC1jbGllbnQtcGF5bWVudCcpLnZhbChwYXltZW50KVxyXG4gICAgfSlcclxufVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgVmVyaWZ5IFJvd3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5mdW5jdGlvbiB2ZXJpZnlDb250cmFjdFN0YXR1cygpe1xyXG4gICQoXCIudGQtZXN0YWRvXCIpLmVhY2goZnVuY3Rpb24oaSx2YWx1ZSl7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdmFyIHRleHQgPSAkdGhpcy50ZXh0KCkudHJpbSgpO1xyXG4gICAgaWYodGV4dCA9PSBcImFjdGl2b1wiKXtcclxuICAgICAgJHRoaXMuY3NzKHtjb2xvcjpcImdyZWVuXCJ9KVxyXG4gICAgfWVsc2UgaWYodGV4dCA9PSBcInNhbGRhZG9cIil7XHJcbiAgICAgICR0aGlzLnBhcmVudHMoXCJ0clwiKS5jc3Moe2JhY2tncm91bmQ6XCJyZ2JhKDIyLDI1NSwwLC4zKVwiLGNvbG9yOlwiIzU1NVwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlcmlmeUNsaWVudFN0YXR1cygpe1xyXG4gICAkKFwidGRcIikuZWFjaChmdW5jdGlvbihpLHZhbHVlKXtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICB2YXIgdGV4dCA9ICR0aGlzLnRleHQoKS50cmltKCk7XHJcbiAgICBpZih0ZXh0ID09IFwibm8gYWN0aXZvXCIpe1xyXG4gICAgICAkdGhpcy5jc3Moe2NvbG9yOlwicmdiYSgyMDAsMCwwLC43KVwifSlcclxuICAgIH1lbHNlIGlmKHRleHQgPT0gXCJhY3Rpdm9cIil7XHJcbiAgICAgICR0aGlzLmNzcyh7Y29sb3I6XCJncmVlblwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICAgICAgICAgICAgICAgICBMb2FkZXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5mdW5jdGlvbiBoZWF2eUxvYWQoc3RvcCl7XHJcbiAgaWYoIXN0b3Ape1xyXG4gICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cImhlYXZ5LWxvYWRlciBhY3RpdmVcIj4nXHJcbiAgICAgICAgaHRtbCArPSAgICc8ZGl2IGNsYXNzPVwiY2lyY2xlLWxvYWRcIj48L2Rpdj4nXHJcbiAgICAgICAgaHRtbCArPSAgICc8ZGl2IGNsYXNzPVwibWVzc2FnZVwiPlByZXBhcmFuZG8gbG9zIGRhdG9zPC9kaXY+J1xyXG4gICAgICAgIGh0bWwgKz0gJzwvZGl2PidcclxuICAgICQoXCJib2R5XCIpLmFwcGVuZChodG1sKVxyXG4gICAgJChcImJvZHlcIikuY3NzKHtvdmVyZmxvdzpcImhpZGRlblwifSk7XHJcbiAgICB2YXIgbWVzc2FnZSA9ICQoXCIuaGVhdnktbG9hZGVyIC5tZXNzYWdlXCIpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBtZXNzYWdlLnRleHQoXCJDb25maWd1cmFuZG8uLi5cIik7XHJcbiAgICB9LDQwMDApXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIkNhc2kgVGVybWluYW1vcyAuLi5cIik7XHJcbiAgICB9LDgwMDApXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIlRlcm1pbmFuZG8gZWwgcHJvY2VzbyAuLi5cIik7XHJcbiAgICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gICAgfSwxNTAwMClcclxuICB9ZWxzZXtcclxuICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlTG9hZGVyKCl7XHJcbiAgICB2YXIgbG9hZGVyID0gJChcIi5oZWF2eS1sb2FkZXJcIik7XHJcbiAgICBsb2FkZXIucmVtb3ZlKCk7XHJcbiAgICAkKFwiYm9keVwiKS5jc3Moe292ZXJmbG93OlwiYXV0b1wifSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaW5lTG9hZChzdG9wKSB7XHJcbiAgaWYoIXN0b3Ape1xyXG4gICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxyXG4gICAgICB9KTtcclxuICB9ZWxzZXtcclxuICAgICQoXCIubG9hZGVyXCIpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcclxuICB9XHJcbn0iLCIvLyBmdW5jaW9uZXMgZGUgYm9vdHN0cmFwXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKClcclxufSk7XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVBhc3N3b3JkKHBhc3N3b3JkKXtcclxuICB2YXIgZXhwcmVzc2lvbiA9ICcnO1xyXG4gIHZhciBoYXNfbG93ZXJjYXNlID0gZmFsc2U7XHJcbiAgdmFyIGhhc191cHBlcmNhc2UgPSBmYWxzZTtcclxuICB2YXIgaGFzX2RpZ2l0ID0gJy8qXFxkJztcclxuXHJcbiAgaWYocGFzc3dvcmQubGVuZ3RoID4gOCkgYWxlcnQoXCJtYXlvciBhIDhcIilcclxuICBpZigvXFxkLy50ZXN0KHBhc3N3b3JkKSlhbGVydChcInRpZW5lIGRpZ2l0b1wiKVxyXG4gIGlmKC9bYS16XS8udGVzdChwYXNzd29yZCkpYWxlcnQoXCJ0aWVuZSBtaW5pc2N1bGFzXCIpXHJcbiAgaWYoL1tBLVpdLy50ZXN0KHBhc3N3b3JkKSkgYWxlcnQoJ3RpZW5lIG1heXVzY3VsYXMnKVxyXG59IiwiJChmdW5jdGlvbigpe1xyXG4gIHZhciBjdXJyZW50UGFnZSA9ICQoXCJ0aXRsZVwiKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xyXG4gIGN1cnJlbnRQYWdlICAgPSBjdXJyZW50UGFnZVs0XS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICBpZihjdXJyZW50UGFnZSA9PSBcImFkbWluaXN0cmFkb3JcIikge1xyXG4gICAgbmV3VXNlckZvcm0oKTtcclxuICB9XHJcbiAgZ2V0RGF0ZSgpO1xyXG4gIGFkbWluRnVuY3Rpb25zKCk7XHJcbiAgdXNlckluZm9UaXAoKTtcclxuICBtYWtlU2VydmljZUNhcmRDbGlja2FibGUoKTtcclxuICBkZXRhaWxzRnVuY3Rpb25zKCk7XHJcbiAgbm90aWZpY2F0aW9uRnVuY3Rpb25zKCk7XHJcbiAgbmV3Q29udHJhY3RGdW5jdGlvbnMoKTtcclxuICBjaGVja1dpbmRvd1NpemUoKTtcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsZnVuY3Rpb24oKXtcclxuICAgIGNoZWNrV2luZG93U2l6ZSgpO1xyXG4gIH0pXHJcbiAgXHJcbi8qKlxyXG4gKiBHZXQgRGF0ZTpcclxuICogT2J0aWVuZSBsYSBmZWNoYSBhY3R1YWwgYWwgc2VndW5kbyB5IGxhIG11ZXN0cmEgZW4gbGEgcGFudGFsbGEgZGUgaW5pY2lvXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXREYXRlKCl7XHJcbiAgdmFyICRkYXkgPSAkKCcuZGF5Jyk7XHJcbiAgdmFyICRtb250aFllYXIgPSAkKCcubW9udGgteWVhcicpO1xyXG4gIHZhciAkZGF5V2VlayA9ICQoJy5kYXl3ZWVrJyk7XHJcbiAgdmFyICRIb3JhID0gJCgnLmhvdXIgc3BhbicpO1xyXG4gIHZhciBkYXRlLGRheSxtb250aCx5ZWFyLHNIb3VyO1xyXG4gIHZhciBkYXlzID0gW1wiRG9taW5nb1wiLFwiTHVuZXNcIixcIk1hcnRlc1wiLFwiTWllcmNvbGVzXCIsXCJKdWV2ZXNcIixcIlZpZXJuZXNcIixcIlNhYmFkb1wiXTtcclxuICB2YXIgbW9udGhzID0gW1wiRW5lcm9cIixcIkZlYnJlcm9cIixcIk1hcnpvXCIsXCJBYnJpbFwiLFwiTWF5b1wiLFwiSnVuaW9cIixcIkp1bGlvXCIsXCJBZ29zdG9cIixcIlNlcHRpZW1icmVcIixcIk9jdHVicmVcIixcIk5vdmllbWJyZVwiLFwiRGljaWVtYnJlXCJdO1xyXG5cclxuICBzZXRJbnRlcnZhbCh1cGRhdGVIb3VyLDEwMDApO1xyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVIb3VyKCl7XHJcbiAgICBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIHNEYXRlID0gZGF0ZS50b1N0cmluZygpXHJcbiAgICAkZGF5LnRleHQoZGF0ZS5nZXREYXRlKCkpO1xyXG4gICAgJG1vbnRoWWVhci50ZXh0KFwiRGUgXCIgKyBtb250aHNbZGF0ZS5nZXRNb250aCgpXSArIFwiIGRlIFwiICsgZGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICRkYXlXZWVrLnRleHQoZGF5c1tkYXRlLmdldERheSgpXSk7XHJcbiAgICBcclxuICAgIHNIb3VyID0gbW9tZW50KCkuZm9ybWF0KCdMVFMnKTtcclxuICAgICAkSG9yYS5odG1sKHNIb3VyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZG1pbiBGdW5jdGlvbnM6XHJcbiAqIHNlIGVuY2FyZ2EgZGUgZWwgbW92aW1pZW50byBkZSBsb3MgcGFuZWxlcyBlbiBsYSBwYW50YWxsYSAnYWRtaW5pc3RyYWRvcidcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBhZG1pbkZ1bmN0aW9ucygpe1xyXG4gICQoJyNjb21wYW55LXNlY3Rpb24nKS5hbmltYXRlKHtsZWZ0OlwiMFwifSwyMDApXHJcbiAgJCgnLmFkbWluaXN0cmFkb3IgLmFzaWRlLWJ1dHRvbnMgYScpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdmFyIGNhcmROYW1lID0gJHRoaXMuYXR0cignaHJlZicpLnNsaWNlKDEpO1xyXG4gICAgaWYoY2FyZE5hbWUgIT0gbnVsbCl7XHJcbiAgICAgICQoJy5jb21wYW55LWRldGFpbHMnKS5hbmltYXRlKHtsZWZ0OlwiLTExMCVcIn0sMjAwKVxyXG4gICAgICAkKCcjJytjYXJkTmFtZSsnLmNvbXBhbnktZGV0YWlscycpLmFuaW1hdGUoe2xlZnQ6XCIwXCJ9LDIwMClcclxuICAgIH0gIFxyXG4gIH0pXHJcblxyXG4gIGlmKCQoXCIjYWNvdW50LXNlY3Rpb25cIikubGVuZ3RoID4gMCl7XHJcbiAgICAkKCcjYWNvdW50LXNlY3Rpb24nKS5hbmltYXRlKHtsZWZ0OlwiMFwifSwyMDApXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogbmV3IFVzZXIgRm9ybTpcclxuICogdmFpZGEgbGFzIGNvbnRyYXNlw7FhcyBlbiBsb3MgZm9ybXVsYXJpb3MgZGUgbG9zIHVzdWFyaW9zXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBuZXdVc2VyRm9ybSgpe1xyXG4gIHZhbGlkYXRlTW9kYWwoXCIjbmV3LXVzZXItbW9kYWxcIik7XHJcbiAgdmFsaWRhdGVNb2RhbChcIiN1cGRhdGUtdXNlci1tb2RhbFwiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZXIgSW5mbyBUaXBcclxuICogaGFjZSB1biB0b2dnbGUgZW4gbGEgdmlzaWJpbGlkYWQgZGUgbGEgaW5mbyBkZWwgdXN1YXJpb1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZnVuY3Rpb24gdXNlckluZm9UaXAoKXtcclxuICB2YXIgaW5mb1RpcCA9ICQoXCIudXNlci1pbmZvLXRpcFwiKTtcclxuICB2YXIgcHJvZmlsZVBpY3R1cmUgPSAkKFwiLnByb2ZpbGUtcGljdHVyZVwiKTtcclxuICB2YXIgYnRuTW9yZSA9ICQoXCIuYnRuLW1vcmVcIik7XHJcblxyXG4gIGJ0bk1vcmUub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgIGluZm9UaXAudG9nZ2xlQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG4gIH0pO1xyXG59XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gbmV3Q29udHJhY3RGdW5jdGlvbnMoKXtcclxuICB2YXIgYnRuUHJpbnRDb250cmFjdCA9ICQoXCIjYnRuLXByaW50LWNvbnRyYWN0XCIpO1xyXG4gIHZhciBkb2N1bWVudCA9ICQoXCIubm90ZS1pdGVtXCIpO1xyXG4gIHZhciByYWRpb0FjdGl2YXRlQ29udHJhY3QgPSAkKFwiI3JhZGlvLW5ldy1jb250cmFjdFwiKTtcclxuICB2YXIgcmFkaW9EaXNhYmxlQ29udHJhY3QgPSAkKFwiI3JhZGlvLWp1c3QtcmVxdWlyZW1lbnRcIik7XHJcbiAgdmFyIGNvbnRyYWN0Q29udHJvbHMgPSAkKFwiLmNvbnRyYWN0LWNvbnRyb2xzXCIpO1xyXG4gIHZhciByZXF1aXJlbWVudENvbnRyb2xzID0gJChcIi5yZXF1aXJlbWVudC1jb250cm9sc1wiKTtcclxuXHJcbiAgcmFkaW9BY3RpdmF0ZUNvbnRyYWN0LnBhcmVudHMoXCJsYWJlbFwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgIGFjdGl2YXRlQ29udHJhY3RNb2RlKCk7IFxyXG5cclxuICB9KTtcclxuXHJcbiAgcmFkaW9EaXNhYmxlQ29udHJhY3QucGFyZW50cyhcImxhYmVsXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGRpc2FibGVDb250cmFjdE1vZGUoKVxyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBhY3RpdmF0ZUNvbnRyYWN0TW9kZSgkYnRuKXtcclxuICAgIHJhZGlvRGlzYWJsZUNvbnRyYWN0XHJcbiAgICAgIC5yZW1vdmVBdHRyKFwiY2hlY2tlZFwiLFwiXCIpXHJcbiAgICAgIC5odG1sKFwiXCIpXHJcbiAgICByYWRpb0FjdGl2YXRlQ29udHJhY3RcclxuICAgICAgLmF0dHIoXCJjaGVja2VkXCIsXCJcIilcclxuICAgICAgLmh0bWwoXCImIzEwMDA0O1wiKVxyXG4gICAgZG9jdW1lbnQucmVtb3ZlQ2xhc3MoXCJwcmludC1yZXF1aXJlbWVudFwiKTtcclxuICAgIGNvbnRyYWN0Q29udHJvbHMucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpXHJcbiAgICByZXF1aXJlbWVudENvbnRyb2xzLmFkZENsYXNzKFwiaGlkZVwiKVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkaXNhYmxlQ29udHJhY3RNb2RlKCRidG4pe1xyXG4gICAgcmFkaW9BY3RpdmF0ZUNvbnRyYWN0XHJcbiAgICAgIC5yZW1vdmVBdHRyKFwiY2hlY2tlZFwiLFwiXCIpXHJcbiAgICAgIC5odG1sKFwiXCIpXHJcbiAgICByYWRpb0Rpc2FibGVDb250cmFjdFxyXG4gICAgICAuYXR0cihcImNoZWNrZWRcIixcIlwiKVxyXG4gICAgICAuaHRtbChcIiYjMTAwMDQ7XCIpXHJcbiAgICBkb2N1bWVudC5hZGRDbGFzcyhcInByaW50LXJlcXVpcmVtZW50XCIpO1xyXG4gICAgcmVxdWlyZW1lbnRDb250cm9scy5yZW1vdmVDbGFzcyhcImhpZGVcIilcclxuICAgIGNvbnRyYWN0Q29udHJvbHMuYWRkQ2xhc3MoXCJoaWRlXCIpXHJcbiAgfVxyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWxzIEZ1bmN0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbiQoJyNzZWFyY2gtY2xpZW50LW1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICB2YXIgYnV0dG9uID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KTtcclxuICBjbGllbnRUYWJsZS5pbml0KCk7XHJcbiAgdmFyIHRpdGxlID0gYnV0dG9uLmZpbmQoJy5zZWN0aW9uLXRpdGxlJykudGV4dCgpO1xyXG4gIGlmKCF0aXRsZSkgdGl0bGUgPSBcIkJ1c2NhciBDbGllbnRlXCJcclxuICBpZih0aXRsZS50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PSBcInJlZ2lzdHJhciBwYWdvXCIpe1xyXG4gICAgYnV0dG9uVGV4dCA9IFwiaXIgYSBQYWdvc1wiXHJcbiAgfWVsc2V7XHJcbiAgICBidXR0b25UZXh0ID0gXCJOdWV2byBDb250cmF0b1wiXHJcbiAgfVxyXG4gIFxyXG4gIHZhciBtb2RhbCA9ICQodGhpcylcclxuICBtb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS50ZXh0KHRpdGxlKVxyXG4gIG1vZGFsLmZpbmQoJy5tb2RhbC1mb290ZXIgLnNhdmUnKS50ZXh0KGJ1dHRvblRleHQpXHJcbiAgbW9kYWwuZmluZCgndGJvZHknKS5odG1sKCcnKVxyXG59KVxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgb3RoZXIgZnVuY3Rpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5mdW5jdGlvbiBkZXRhaWxzRnVuY3Rpb25zKCl7XHJcbiAgdmFyIHNtYWxsQnV0dG9uc1NlbGVjdCA9ICQoJy5idG4tc21hbGwnKTtcclxuICB2YXIgdGFicyA9IHtcclxuICAgIGNvbnRyYWN0Q29udHJvbHMgOiBbXCIjY29udHJhY3RzXCIsXCIjbW9udGgtYW5kLWRhdGVcIixcIiNyZWNvbm5lY3Qtc2VydmljZVwiLCcjZXh0cmEtY29udHJhY3QnLCcjZXh0cmEtc2VydmljZScsJyNleHRyYS1leHRlbnNpb24nLCcjZXh0cmEtdXBncmFkZSddLFxyXG4gICAgcGF5bWVudENvbnRyb2xzOiBbXCIjcGF5bWVudHNcIiwgXCIjZGV0YWxsZXNfZGVfcGFnb1wiLFwiI2Rlc2N1ZW50b1wiXSBcclxuICB9XHJcblxyXG4gICQoJ1tyb2xlPVwidGFiXCJdJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgdmFyIGhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpXHJcbiAgICBcclxuICAgIGlmKGNvbXBhcmUoaHJlZix0YWJzLnBheW1lbnRDb250cm9scykpIHtcclxuICAgICAgJChcIi5wYXltZW50LWNvbnRyb2xzXCIpLmFkZENsYXNzKFwidmlzaWJsZVwiKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAkKFwiLnBheW1lbnQtY29udHJvbHNcIikucmVtb3ZlQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgaWYoY29tcGFyZShocmVmLHRhYnMuY29udHJhY3RDb250cm9scykpe1xyXG4gICAgICAkKFwiLmNvbnRyYWN0LWNvbnRyb2xzXCIpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKVxyXG4gICAgfWVsc2V7XHJcbiAgICAgICQoXCIuY29udHJhY3QtY29udHJvbHNcIikuYWRkQ2xhc3MoXCJoaWRlXCIpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFiQ29udHJvbHMoJCh0aGlzKSk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5idG4tc21hbGwnKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICBzbWFsbEJ1dHRvbnNTZWxlY3QucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG4gIH0pXHJcblxyXG4gIGZ1bmN0aW9uIGNvbXBhcmUodmFsdWUsIHBvc2libGVWYWx1ZXMpe1xyXG4gICAgdmFyIHJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICBwb3NpYmxlVmFsdWVzLmZvckVhY2goIGZ1bmN0aW9uKHRoZVZhbHVlKSB7XHJcbiAgICAgIGlmKHZhbHVlID09IHRoZVZhbHVlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSArICcgaWd1YWwgYSAnICsgdGhlVmFsdWUgKyAnID8nKTtcclxuICAgICAgICByZXR1cm5WYWx1ZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUYWJDb250cm9scygkdGhpcyl7XHJcbiAgdmFyIGNvbnRyb2xzID0gJHRoaXMuYXR0cihcImFyaWEtY29udHJvbHNcIik7XHJcbiAgJChcIi5keW5hbWljLWNvbnRyb2xzXCIpLnRleHQoY29udHJvbHMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBub3RpZmljYXRpb25GdW5jdGlvbnMoKXtcclxuICB2YXIgYnRuQXZlcmlhcyAgICAgID0gJChcIiNidG4tc2VlLWF2ZXJpYXNcIik7XHJcbiAgdmFyIGJ0blBhZ29zICAgICAgICA9ICQoXCIjYnRuLXNlZS1wYWdvc1wiKTtcclxuICB2YXIgYnRuQ2FqYUNoaWNhICAgID0gJCgnI2J0bi1zZWUtY2FqYScpO1xyXG4gIHZhciBidG5EZXVkb3JlcyAgICAgPSAkKFwiI2J0bi1zZWUtZGV1ZG9yZXNcIilcclxuICB2YXIgYnRuRGF5SW5jb21lcyAgID0gJChcIiNidG4tc2VlLWRheS1pbmNvbWVzXCIpXHJcbiAgdmFyIGxheW91dENvbnRhaW5lciA9ICQoXCIubGF5b3V0LWNvbnRhaW5lclwiKTtcclxuXHJcbiAgYnRuQXZlcmlhcy5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7bGVmdDpcIi0xMDAlXCJ9LDIwMCk7XHJcbiAgfSk7XHJcblxyXG4gIGJ0blBhZ29zLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGxheW91dENvbnRhaW5lci5hbmltYXRlKHtsZWZ0OlwiMFwifSwyMDApO1xyXG4gIH0pO1xyXG5cclxuICBidG5EZXVkb3Jlcy5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7bGVmdDpcIi0yMDAlXCJ9LDIwMCk7XHJcbiAgfSk7XHJcblxyXG4gICBidG5EYXlJbmNvbWVzLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGxheW91dENvbnRhaW5lci5hbmltYXRlKHtsZWZ0OlwiLTMwMCVcIn0sMjAwKTtcclxuICB9KTtcclxufVxyXG5cclxuJChcIiNzZWxlY3QtZXh0cmEtc2VydmljZVwiKS5vbignY2hhbmdlJyxmdW5jdGlvbigpe1xyXG4gIHZhciAkdGhpcyA9ICQoKFwiI3NlbGVjdC1leHRyYS1zZXJ2aWNlIDpzZWxlY3RlZFwiKSk7XHJcbiAgdmFyIGNvc3QgPSAkdGhpcy5hdHRyKFwiZGF0YS1wYXltZW50XCIpO1xyXG4gIFxyXG4gICQoXCIjZXh0cmEtc2VydmljZS1jb3N0XCIpLnZhbChjb3N0KVxyXG59KTtcclxuXHJcbiQoXCIjZXh0cmEtY2xpZW50LWNvbnRyYWN0XCIpLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XHJcbiAgdmFyICR0aGlzID0gJCgoXCIjZXh0cmEtY2xpZW50LWNvbnRyYWN0IDpzZWxlY3RlZFwiKSk7XHJcbiAgXHJcbiAgJChcIiNleHRyYS1jb250cmFjdC1zZXJ2aWNlXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1zZXJ2aWNlXCIpKTtcclxuICAkKFwiI2V4dHJhLWVxdWlwb1wiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtZXF1aXBtZW50XCIpKTtcclxuICAkKFwiI2V4dHJhLXJvdXRlclwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtcm91dGVyXCIpKTtcclxuICAkKFwiI2V4dHJhLWUtbWFjXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1lLW1hY1wiKSk7XHJcbiAgJChcIiNleHRyYS1yLW1hY1wiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtci1tYWNcIikpO1xyXG4gICQoXCIjZXh0cmEtY29kZVwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtY29kZVwiKSk7XHJcbn0pO1xyXG5cclxuJChcIi5jb2x1bW5zLXJpZ2h0XCIpLnJlbW92ZUNsYXNzKFwicHVsbC1yaWdodFwiKTtcclxuXHJcbiQoXCIjc2VsZWN0LWNvbnRyYWN0LWNvZGVcIikub24oJ2NoYW5nZScsZnVuY3Rpb24oKXtcclxuICB2YXIgJHRoaXMgPSAkKChcIiNzZWxlY3QtY29udHJhY3QtY29kZSA6c2VsZWN0ZWRcIikpO1xyXG4gICQoXCIjY29udHJhY3QtaXBcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWlwLWZpbmFsXCIpKTtcclxuICAkKFwiI3UtY29udHJhY3QtaXBcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWlwLWZpbmFsXCIpKTtcclxuIFxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrV2luZG93U2l6ZSgpIHtcclxuICB2YXIgd2lkdGggPSB3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGg7XHJcbiAgdmFyIGJyYW5kTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5icmFuZCBzcGFuJyk7XHJcbiAgXHJcbiAgaWYod2lkdGggPD0gMTEwMCl7XHJcbiAgICBicmFuZE5hbWUudGV4dENvbnRlbnQgPSBcIlBcIjtcclxuICB9ZWxzZXtcclxuICAgIGJyYW5kTmFtZS50ZXh0Q29udGVudCA9IFwiUGF5bWVudFwiO1xyXG4gIH1cclxufVxyXG5cclxuJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgcG9zaXRpb24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKClcclxuICBtb3ZhYmxlTmF2ID0gJCgnLmFzaWRlLW5hdi1jb250YWluZXIsIC5hc2lkZS13aWRlLWxlZnQnKVxyXG5cclxuICBpZihwb3NpdGlvbiA+PSA1MCl7XHJcbiAgICBtb3ZhYmxlTmF2LmFkZENsYXNzKCdtb3ZlZCcpXHJcbiAgfWVsc2V7XHJcbiAgICBtb3ZhYmxlTmF2LnJlbW92ZUNsYXNzKCdtb3ZlZCcpXHJcbiAgfVxyXG59KSIsInZhciBVc2VycyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBuaWNrLCBwYXNzd29yZCwgbmFtZSwgbGFzdG5hbWUsIGRuaSwgdHlwZSwgaXNfZW1wdHk7XHJcblxyXG4gICAgbmljayAgICAgID0gJChcIiN1c2VyLW5pY2tuYW1lXCIpLnZhbCgpO1xyXG4gICAgcGFzc3dvcmQgID0gJChcIiN1c2VyLXBhc3N3b3JkXCIpLnZhbCgpO1xyXG4gICAgbmFtZSAgICAgID0gJChcIiN1c2VyLW5hbWVcIikudmFsKCk7XHJcbiAgICBsYXN0bmFtZSAgPSAkKFwiI3VzZXItbGFzdG5hbWVcIikudmFsKCk7XHJcbiAgICBkbmkgICAgICAgPSBnZXRWYWwoJChcIiN1c2VyLWRuaVwiKSk7XHJcbiAgICB0eXBlICAgICAgPSAkKFwiI3VzZXItdHlwZVwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtuaWNrLCBwYXNzd29yZCwgbmFtZSwgbGFzdG5hbWUsIGRuaSwgdHlwZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ25pY2tuYW1lPScgKyBuaWNrICsgXCImcGFzc3dvcmQ9XCIgKyBwYXNzd29yZCArIFwiJm5hbWU9XCIgKyBuYW1lICsgXCImbGFzdG5hbWU9XCIgKyBsYXN0bmFtZTtcclxuICAgICAgZm9ybSArPSBcIiZkbmk9XCIgKyBkbmkgKyBcIiZ0eXBlPVwiICsgdHlwZTtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJ1c2VyL2FkZG5ld1wiLCB0cnVlLCBpbml0QWRtaW5IYW5kbGVycywgbnVsbCwgZm9ybSwgVXNlcnMuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgbmljaywgcGFzc3dvcmQsIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGU7XHJcblxyXG4gICAgbmljayAgICAgPSAkKFwiI2Utbmlja25hbWVcIikudmFsKCk7XHJcbiAgICBuYW1lICAgICA9ICQoXCIjZS1uYW1lXCIpLnZhbCgpO1xyXG4gICAgbGFzdG5hbWUgPSAkKFwiI2UtbGFzdG5hbWVcIikudmFsKCk7XHJcbiAgICBkbmkgICAgICA9ICQoXCIjZS1kbmlcIikudmFsKCk7XHJcbiAgICB0eXBlICAgICA9ICQoXCIjZS10eXBlXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW25pY2ssIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGVdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICduaWNrbmFtZT0nICsgbmljayArIFwiJm5hbWU9XCIgKyBuYW1lICsgXCImbGFzdG5hbWU9XCIgKyBsYXN0bmFtZTtcclxuICAgICAgZm9ybSArPSBcIiZkbmk9XCIgKyBkbmkgKyBcIiZ0eXBlPVwiICsgdHlwZTtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJ1c2VyL3VwZGF0ZVwiLCB0cnVlLCBpbml0QWRtaW5IYW5kbGVycywgbnVsbCwgZm9ybSwgVXNlcnMuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxlPXVzZXJzXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgndXNlci9nZXR1c2VycycsIGZhbHNlLCBpbml0QWRtaW5IYW5kbGVycywgdXNlclRhYmxlLnJlZnJlc2gsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIGRlbGV0ZTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidXNlcl9pZD1cIiArIGlkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3VzZXIvZGVsZXRldXNlcicsIHRydWUsIGluaXRBZG1pbkhhbmRsZXJzLCBudWxsLCBmb3JtLCBVc2Vycy5nZXRBbGwpO1xyXG4gIH0sXHJcblxyXG4gIGNvbmZpcm1QYXNzd29yZDogZnVuY3Rpb24odXNlcklkLGN1cnJlbnRQYXNzd29yZCkge1xyXG4gICAgdmFyIGZvcm0gPSAndXNlcl9pZD0nKyB1c2VySWQgKycmY3VycmVudF9wYXNzd29yZD0nICsgY3VycmVudFBhc3N3b3JkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3VzZXIvY29uZmlybV9wYXNzd29yZCcsIGZhbHNlLCBmYWxzZSwgcHJvY2Vzc0NvbmZpcm1EYXRhLCBmb3JtLCBudWxsLCBudWxsKTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0NvbmZpcm1EYXRhKHJlc3BvbnNlKSB7XHJcbiAgICAgIHZhciBuZXdQYXNzd29yZCAgICAgICAgID0gJChcIiNhY291bnQtbmV3LXBhc3N3b3JkXCIpO1xyXG4gICAgICB2YXIgbmV3UGFzc3dvcmRDb25maXJtICA9ICQoXCIjYWNvdW50LWNvbmZpcm0tbmV3LXBhc3N3b3JkXCIpO1xyXG4gICAgICBcclxuICAgICAgaWYgKHJlc3BvbnNlID09IDEpIHsgICAgICBcclxuICAgICAgICBuZXdQYXNzd29yZC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIG5ld1Bhc3N3b3JkQ29uZmlybS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHZhbGlkYXRlVGhpcygpO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBuZXdQYXNzd29yZC5hdHRyKCdkaXNhYmxlZCcsdHJ1ZSk7XHJcbiAgICAgICAgbmV3UGFzc3dvcmRDb25maXJtLmF0dHIoJ2Rpc2FibGVkJyx0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVBhc3N3b3JkOiBmdW5jdGlvbih1c2VySWQsY3VycmVudFBhc3N3b3JkLG5ld1Bhc3N3b3JkKXtcclxuICAgIHZhciBmb3JtID0gJ3VzZXJfaWQ9JysgdXNlcklkICArIFwiJmN1cnJlbnRfcGFzc3dvcmQ9XCIrIGN1cnJlbnRQYXNzd29yZCArJyZuZXdfcGFzc3dvcmQ9JyArIG5ld1Bhc3N3b3JkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3VzZXIvdXBkYXRlX3Bhc3N3b3JkJywgZmFsc2UsIGZhbHNlLCBVc2Vycy5wYXNzd29yZENoYW5nZWQsIGZvcm0sIG51bGwsaGVhdnlMb2FkKTtcclxuICB9LFxyXG5cclxuICBwYXNzd29yZENoYW5nZWQ6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgIGlmKHJlc3BvbnNlPT0xKXtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9TVUNDRVNTICsgJ0NvbnRyYXNlw7FhIENhbWJpYWRhIGNvbiBleGl0bycpXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IEJBU0VfVVJMICsgJ2FwcC9sb2dvdXQnXHJcbiAgICAgIH0sMzAwMCkgICAgICBcclxuICAgIH1lbHNle1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0VSUk9SICsgJyBFcnJvciBhbCBjYW1iaWFyIGRlIGNvbnRyYXNlw7FhLCByZXZpc2UgbGEgY29udHJhc2XDsWEgYWN0dWFsJylcclxuICAgIH1cclxuICAgICAgXHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ2xpZW50cyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICB2YXIgZm9ybSwgbm9tYnJlcywgYXBlbGxpZG9zLCBjZWR1bGEsIGNlbHVsYXIsIHByb3ZpbmNpYSwgc2VjdG9yLCBjYWxsZSwgY2FzYSwgdGVsZWZvbm8sXHJcbiAgICAgICBsdWdhclRyYWJham8sIHRlbFRyYWJham8sIGluZ3Jlc29zLCBmZWNoYVJlZ2lzdHJvLCBlc3RhZG87XHJcblxyXG4gICAgbm9tYnJlcyAgICAgICA9ICQoXCIjY2xpZW50LW5hbWVcIikudmFsKCk7XHJcbiAgICBhcGVsbGlkb3MgICAgID0gJChcIiNjbGllbnQtbGFzdG5hbWVcIikudmFsKCk7XHJcbiAgICBjZWR1bGEgICAgICAgID0gZ2V0VmFsKCQoXCIjY2xpZW50LWRuaVwiKSk7XHJcbiAgICBjZWx1bGFyICAgICAgID0gZ2V0VmFsKCQoXCIjY2xpZW50LXBob25lXCIpKTtcclxuICAgIHByb3ZpbmNpYSAgICAgPSAkKFwiI2NsaWVudC1wcm92aW5jaWFcIikudmFsKCk7XHJcbiAgICBzZWN0b3IgICAgICAgID0gJChcIiNjbGllbnQtc2VjdG9yXCIpLnZhbCgpO1xyXG4gICAgY2FsbGUgICAgICAgICA9ICQoXCIjY2xpZW50LXN0cmVldFwiKS52YWwoKTtcclxuICAgIGNhc2EgICAgICAgICAgPSAkKCcjY2xpZW50LWhvdXNlJykudmFsKCk7XHJcbiAgICB0ZWxlZm9ubyAgICAgID0gZ2V0VmFsKCQoJyNjbGllbnQtdGVsZXBob25lJykpO1xyXG4gICAgbHVnYXJUcmFiYWpvICA9ICQoJyNjbGllbnQtam9iJykudmFsKCk7XHJcbiAgICB0ZWxUcmFiYWpvICAgID0gZ2V0VmFsKCQoJyNjbGllbnQtam9iLXRlbGVwaG9uZScpKTtcclxuICAgIGluZ3Jlc29zICAgICAgPSAkKCcjY2xpZW50LXNhbGFyeScpLnZhbCgpO1xyXG4gICAgZmVjaGFSZWdpc3RybyA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7O1xyXG4gICAgZXN0YWRvICAgICAgICA9IFwibm8gYWN0aXZvXCI7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbbm9tYnJlcywgYXBlbGxpZG9zLCBjZWR1bGEsIGNlbHVsYXIsIHByb3ZpbmNpYSwgc2VjdG9yLCBjYWxsZSwgY2FzYSwgdGVsZWZvbm9dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdub21icmVzPScgKyBub21icmVzICsgXCImYXBlbGxpZG9zPVwiICsgYXBlbGxpZG9zICsgXCImY2VkdWxhPVwiICsgY2VkdWxhICsgXCImY2VsdWxhcj1cIiArIGNlbHVsYXI7XHJcbiAgICAgIGZvcm0gKz0gXCImcHJvdmluY2lhPVwiICsgcHJvdmluY2lhICsgXCImc2VjdG9yPVwiICsgc2VjdG9yICsgXCImY2FsbGU9XCIgKyBjYWxsZSArIFwiJmNhc2E9XCIgKyBjYXNhICsgXCImdGVsZWZvbm89XCIgKyB0ZWxlZm9ubztcclxuICAgICAgZm9ybSArPSBcIiZsdWdhcl90cmFiYWpvPVwiICsgbHVnYXJUcmFiYWpvICsgXCImdGVsX3RyYWJham89XCIgKyB0ZWxUcmFiYWpvICsgXCImaW5ncmVzb3M9XCIgKyBpbmdyZXNvcyArIFwiJmZlY2hhX3JlZ2lzdHJvPVwiICsgZmVjaGFSZWdpc3RybztcclxuICAgICAgZm9ybSArPSBcIiZlc3RhZG89XCIgKyBlc3RhZG8gKyBcIiZ0YWJsYT1jbGllbnRlc1wiO1xyXG5cclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2FkZFwiLCB0cnVlLCBpbml0Q2xpZW50SGFuZGxlcnMsIG51bGwsIGZvcm0sIENsaWVudHMuZ2V0QWxsKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNsaWVudGVzXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgaW5pdENsaWVudEhhbmRsZXJzLCBjbGllbnRUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBnZXRPbmU6IGZ1bmN0aW9uIChpZCwgcmVjZWl2ZXIpIHtcclxuICAgIGZvcm0gPSBcInRhYmxhPWNsaWVudGVzJmlkPVwiICsgaWQ7XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvZ2V0b25lXCIsIGZhbHNlLCBpbml0Q2xpZW50SGFuZGxlcnMsIHJlY2VpdmVyLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHJlY2VpdmVGb3JFZGl0OiBmdW5jdGlvbiAoY29udGVudCkge1xyXG4gICAgdmFyIGNsaWVudCAgICAgICAgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgdGhpcy5pZCAgICAgICAgICAgID0gY2xpZW50WydpZF9jbGllbnRlJ107XHJcbiAgICB2YXIgJG5vbWJyZXMgICAgICA9ICQoXCIjdS1jbGllbnQtbmFtZVwiKTtcclxuICAgIHZhciAkYXBlbGxpZG9zICAgID0gJChcIiN1LWNsaWVudC1sYXN0bmFtZVwiKTtcclxuICAgIHZhciAkY2VkdWxhICAgICAgID0gJChcIiN1LWNsaWVudC1kbmlcIik7XHJcbiAgICB2YXIgJGNlbHVsYXIgICAgICA9ICQoXCIjdS1jbGllbnQtcGhvbmVcIik7XHJcbiAgICB2YXIgJHByb3ZpbmNpYSAgICA9ICQoXCIjdS1jbGllbnQtcHJvdmluY2lhXCIpO1xyXG4gICAgdmFyICRzZWN0b3IgICAgICAgPSAkKFwiI3UtY2xpZW50LXNlY3RvclwiKTtcclxuICAgIHZhciAkY2FsbGUgICAgICAgID0gJChcIiN1LWNsaWVudC1zdHJlZXRcIik7XHJcbiAgICB2YXIgJGNhc2EgICAgICAgICA9ICQoJyN1LWNsaWVudC1ob3VzZScpO1xyXG4gICAgdmFyICR0ZWxlZm9ubyAgICAgPSAkKCcjdS1jbGllbnQtdGVsZXBob25lJyk7XHJcbiAgICB2YXIgJGx1Z2FyVHJhYmFqbyA9ICQoJyN1LWNsaWVudC1qb2InKTtcclxuICAgIHZhciAkdGVsVHJhYmFqbyAgID0gJCgnI3UtY2xpZW50LWpvYi10ZWxlcGhvbmUnKTtcclxuICAgIHZhciAkaW5ncmVzb3MgICAgID0gJCgnI3UtY2xpZW50LXNhbGFyeScpO1xyXG5cclxuICAgICRub21icmVzLnZhbChjbGllbnRbJ25vbWJyZXMnXSk7XHJcbiAgICAkYXBlbGxpZG9zLnZhbChjbGllbnRbJ2FwZWxsaWRvcyddKVxyXG4gICAgJGNlZHVsYS52YWwoY2xpZW50WydjZWR1bGEnXSlcclxuICAgICRjZWx1bGFyLnZhbChjbGllbnRbJ2NlbHVsYXInXSlcclxuICAgICRwcm92aW5jaWEudmFsKGNsaWVudFsncHJvdmluY2lhJ10pXHJcbiAgICAkc2VjdG9yLnZhbChjbGllbnRbJ3NlY3RvciddKVxyXG4gICAgJGNhbGxlLnZhbChjbGllbnRbJ2NhbGxlJ10pXHJcbiAgICAkY2FzYS52YWwoY2xpZW50WydjYXNhJ10pXHJcbiAgICAkdGVsZWZvbm8udmFsKGNsaWVudFsndGVsZWZvbm8nXSlcclxuICAgICRsdWdhclRyYWJham8udmFsKGNsaWVudFsnbHVnYXJfdHJhYmFqbyddKVxyXG4gICAgJHRlbFRyYWJham8udmFsKGNsaWVudFsndGVsX3RyYWJham8nXSlcclxuICAgICRpbmdyZXNvcy52YWwoY2xpZW50WydzYWxhcmlvJ10pXHJcblxyXG4gICAgJChcIiN1cGRhdGUtY2xpZW50LW1vZGFsXCIpLm1vZGFsKCk7XHJcbiAgICAkKFwiI2J0bi11cGRhdGUtY2xpZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdXBkYXRlQ2xpZW50KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDbGllbnQoKSB7XHJcbiAgICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoWyRub21icmVzLnZhbCgpLCAkYXBlbGxpZG9zLnZhbCgpLCAkY2VkdWxhLnZhbCgpLCAkY2VsdWxhci52YWwoKSwgJHByb3ZpbmNpYS52YWwoKSwgJHNlY3Rvci52YWwoKSwgJGNhbGxlLnZhbCgpLFxyXG4gICAgICAgICRjYXNhLnZhbCgpLCAkdGVsZWZvbm8udmFsKClcclxuICAgICAgXSk7XHJcblxyXG4gICAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgICAgZm9ybSA9ICdpZD0nICsgaWQgKyAnJm5vbWJyZXM9JyArICRub21icmVzLnZhbCgpICsgXCImYXBlbGxpZG9zPVwiICsgJGFwZWxsaWRvcy52YWwoKSArIFwiJmNlZHVsYT1cIiArIGdldFZhbCgkY2VkdWxhKTtcclxuICAgICAgICBmb3JtICs9IFwiJmNlbHVsYXI9XCIgKyBnZXRWYWwoJGNlbHVsYXIpICsgXCImcHJvdmluY2lhPVwiICsgJHByb3ZpbmNpYS52YWwoKSArIFwiJnNlY3Rvcj1cIiArICRzZWN0b3IudmFsKCkgKyBcIiZjYWxsZT1cIiArICRjYWxsZS52YWwoKTtcclxuICAgICAgICBmb3JtICs9IFwiJmNhc2E9XCIgKyAkY2FzYS52YWwoKSArIFwiJnRlbGVmb25vPVwiICsgZ2V0VmFsKCR0ZWxlZm9ubykgKyBcIiZsdWdhcl90cmFiYWpvPVwiICsgJGx1Z2FyVHJhYmFqby52YWwoKSArIFwiJnRlbF90cmFiYWpvID1cIjtcclxuICAgICAgICBmb3JtICs9IGdldFZhbCgkdGVsVHJhYmFqbykgKyBcIiZ0YWJsYT1jbGllbnRlc1wiO1xyXG4gICAgICAgIGZvcm0gKz0gXCImaW5ncmVzb3M9XCIgKyAkaW5ncmVzb3MudmFsKCk7XHJcblxyXG4gICAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgaW5pdENsaWVudEhhbmRsZXJzLCBudWxsLCBmb3JtLCBDbGllbnRzLmdldEFsbCk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzYXZlT2JzZXJ2YXRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgb2JzZXJ2YXRpb25zLGlkQ2xpZW50ZTtcclxuIFxyXG4gICAgb2JzZXJ2YXRpb25zID0gJChcIiN0ZXh0LW9ic2VydmF0aW9uc1wiKS52YWwoKTtcclxuICAgIGlkQ2xpZW50ZSAgICA9ICQoXCIjZGV0YWlsLWNsaWVudC1pZFwiKS52YWwoKTtcclxuIFxyXG4gICAgZm9ybSA9ICdvYnNlcnZhY2lvbmVzPScgKyBvYnNlcnZhdGlvbnMgKyBcIiZ0YWJsYT1vYnNlcnZhY2lvbmVzJmlkX2NsaWVudGU9XCIgKyBpZENsaWVudGU7XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwpXHJcbiAgfSxcclxuICBcclxuICB1cGRhdGVTdGF0ZTogZnVuY3Rpb24gKGNsaWVudCkge1xyXG4gICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGNsaWVudCkrICcmbW9kdWxlPWNsaWVudGVzJmFjdGlvbj11cGRhdGUnO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRqc29uJyx0cnVlLG51bGwsbnVsbCxmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBHZW5lcmFscyA9IHtcclxuICBkZWxldGVSb3c6IGZ1bmN0aW9uIChpZCwgdGFibGEpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1cIiArIHRhYmxhICsgXCImaWQ9XCIgKyBpZDtcclxuICAgIHZhciBoYW5kbGVycywgY2FsbGJhY2s7XHJcbiAgICBzd2l0Y2ggKHRhYmxhKSB7XHJcbiAgICAgIGNhc2UgJ2NsaWVudGVzJzpcclxuICAgICAgICBjYWxsYmFjayA9IENsaWVudHMuZ2V0QWxsO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzZXJ2aWNpb3MnOlxyXG4gICAgICAgIGNhbGxiYWNrID0gU2VydmljZXMuZ2V0QWxsO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZGVsZXRlJywgdHJ1ZSxudWxsLCBudWxsLCBmb3JtLCBjYWxsYmFjayk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBTZWFyY2ggbWFuZGEgdW4gbWVuc2FqZSBhbCBzZXJ2aWRvciBkZSBsb3MgdmFsb3JlcyBhIGJ1c2NhclxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IGVsIHZhbG9yIGEgc2VyIGJ1c2NhZG9cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGJUYWJsZSBub21icmUgZGUgbGEgdGFibGEgZG9uZGUgc2UgZGVzZWEgY29uc3VsdGFyIGVuIGxhIGJhc2UgZGUgZGF0b3NcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmaWxsVGFibGVGdW5jdGlvbiBmdW5jaW9uIGRlIGxsZW5hZG8gZGUgdGFibGEgZG9uZGUgc2UgbW9zdHJhcmFuIGxvcyByZXN1bHRhZG9zIFxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXJGdW5jdGlvbiBmdW5jaW9uIHJlaW5pY2lvIGRlIGxvcyBlbGVtZW50b3MgZW4gbG9zIGhhbmRsZXJzIFxyXG4gICAqL1xyXG4gIFxyXG4gIHNlYXJjaDogZnVuY3Rpb24gKHRleHQsIGRiVGFibGUsIGZpbGxUYWJsZUZ1bmN0aW9uLCBoYW5kbGVyRnVuY3Rpb24pIHtcclxuICAgIGlmIChoYW5kbGVyRnVuY3Rpb24gPT0gdW5kZWZpbmVkKSBoYW5kbGVyRnVuY3Rpb24gPSBpbml0Q2xpZW50SGFuZGxlcnM7XHJcbiAgICBpZiAoZmlsbFRhYmxlRnVuY3Rpb24gPT0gdW5kZWZpbmVkKSBmaWxsVGFibGVGdW5jdGlvbiA9IGZpbGxDdXJyZW50VGFibGU7XHJcbiAgICB2YXIgd29yZCA9IHRleHQ7XHJcbiAgICBpZiAod29yZCAhPSBudWxsIHx8IHdvcmQgIT0gXCJcIikge1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9XCIgKyBkYlRhYmxlICsgXCImd29yZD1cIiArIHdvcmQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3NlYXJjaCcsIGZhbHNlLCBoYW5kbGVyRnVuY3Rpb24sIGZpbGxUYWJsZUZ1bmN0aW9uLCBmb3JtLCBudWxsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjb3VudF90YWJsZTogZnVuY3Rpb24gKHRhYmxlKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9XCIgKyB0YWJsZTtcclxuICAgIHZhciB1cGRhdGVGdW5jdGlvbiA9IHVwZGF0ZUNvdW50O1xyXG4gICAgaWYgKHRhYmxlID09ICdjYWphJykgdXBkYXRlRnVuY3Rpb24gPSB1cGRhdGVDYWphQ291bnRcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2NvdW50JywgZmFsc2UsIG51bGwsIHVwZGF0ZUZ1bmN0aW9uLCBmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBTZXJ2aWNlcyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBuYW1lLCBkZXNjcmlwdGlvbiwgcGF5bWVudCwgdHlwZTtcclxuXHJcbiAgICBuYW1lICAgICAgICA9ICQoXCIjc2VydmljZS1uYW1lXCIpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKFwiI3NlcnZpY2UtZGVzY3JpcHRpb25cIikudmFsKCk7XHJcbiAgICBwYXltZW50ICAgICA9ICQoXCIjc2VydmljZS1tb250aGx5LXBheW1lbnRcIikudmFsKCk7XHJcbiAgICB0eXBlICAgICAgICA9ICQoXCIjc2VydmljZS10eXBlXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW25hbWUsIGRlc2NyaXB0aW9uLCBwYXltZW50LCB0eXBlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbm9tYnJlPScgKyBuYW1lICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbiArIFwiJm1lbnN1YWxpZGFkPVwiICsgcGF5bWVudCArIFwiJnRpcG89XCIgKyB0eXBlO1xyXG4gICAgICBmb3JtICs9IFwiJnRhYmxhPXNlcnZpY2lvc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvYWRkXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFNlcnZpY2VzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPXNlcnZpY2lvc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIHNlcnZpY2VUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBpZCwgbmFtZSwgZGVzY3JpcHRpb24sIHBheW1lbnQsIHR5cGU7XHJcblxyXG4gICAgaWQgICAgICAgICAgPSAkKCcjdS1zZXJ2aWNlLWlkJykudmFsKCk7XHJcbiAgICBuYW1lICAgICAgICA9ICQoJyN1LXNlcnZpY2UtbmFtZScpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKCcjdS1zZXJ2aWNlLWRlc2NyaXB0aW9uJykudmFsKCk7XHJcbiAgICBwYXltZW50ICAgICA9ICQoJyN1LXNlcnZpY2UtbW9udGhseS1wYXltZW50JykudmFsKCk7XHJcbiAgICB0eXBlICAgICAgICA9ICQoJyN1LXNlcnZpY2UtdHlwZScpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2lkLCBuYW1lLCBkZXNjcmlwdGlvbiwgcGF5bWVudCwgdHlwZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX3NlcnZpY2lvPScgKyBpZCArIFwiJm5vbWJyZT1cIiArIG5hbWUgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uICsgXCImbWVuc3VhbGlkYWQ9XCIgKyBwYXltZW50O1xyXG4gICAgICBmb3JtICs9IFwiJnRpcG89XCIgKyB0eXBlICsgXCImdGFibGE9c2VydmljaW9zXCI7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgU2VydmljZXMuZ2V0QWxsLGhlYXZ5TG9hZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxudmFyIENvbnRyYWN0cyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uIGFkZE5ld0NvbnRyYWN0KCkge1xyXG4gICAgdmFyIGZvcm0sIHRhYmxlLCBjbGllbnRfaWQsIHVzZXJfaWQsIHNlcnZpY2VfaWQsIGNvZGUsIGNvbnRyYWN0X2RhdGUsIHBheW1lbnQsIGR1cmF0aW9uLFxyXG4gICAgICBlcXVpcG1lbnQsIGVNYWMsIHJvdXRlciwgck1hYywgdG90YWwsIG5leHRQYXltZW50LCBtb2RlbCwgaXA7XHJcblxyXG4gICAgY2xpZW50X2lkICAgICA9ICQoXCIjY29udHJhY3QtY2xpZW50LWlkXCIpLnZhbCgpO1xyXG4gICAgdXNlcl9pZCAgICAgICA9ICQoXCIjY29udHJhY3QtdXNlci1pZFwiKS52YWwoKTtcclxuICAgIHNlcnZpY2VfaWQgICAgPSAkKFwiLnNlcnZpY2UtY2FyZC5zZWxlY3RlZFwiKS5hdHRyKCdkYXRhLWlkJyk7XHJcbiAgICBjb250cmFjdF9kYXRlID0gJCgnI2NvbnRyYWN0LWNsaWVudC1kYXRlJykudmFsKCk7XHJcbiAgICBkdXJhdGlvbiAgICAgID0gJCgnI2NvbnRyYWN0LWNsaWVudC1tb250aHMnKS52YWwoKTtcclxuICAgIGVxdWlwbWVudCAgICAgPSAkKCcjY29udHJhY3QtZXF1aXBtZW50JykudmFsKCk7XHJcbiAgICBlTWFjICAgICAgICAgID0gJCgnI2NvbnRyYWN0LWUtbWFjJykudmFsKCk7XHJcbiAgICByb3V0ZXIgICAgICAgID0gJCgnI2NvbnRyYWN0LXJvdXRlcicpLnZhbCgpO1xyXG4gICAgck1hYyAgICAgICAgICA9ICQoJyNjb250cmFjdC1yLW1hYycpLnZhbCgpO1xyXG4gICAgbW9kZWwgICAgICAgICA9ICQoJyNjb250cmFjdC1lcXVpcG1lbnQtbW9kZWwnKS52YWwoKTtcclxuICAgIGlwICAgICAgICAgICAgPSAkKCcjY29udHJhY3QtaXAnKS52YWwoKTtcclxuICAgIGNvZGUgICAgICAgICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpLnZhbCgpO1xyXG5cclxuICAgIHBheW1lbnQgPSAkKFwiI2NvbnRyYWN0LWNsaWVudC1wYXltZW50XCIpLnZhbCgpO1xyXG4gICAgbmV4dFBheW1lbnQgPSBtb21lbnQoY29udHJhY3RfZGF0ZSkuYWRkKDEsICdtb250aHMnKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtjbGllbnRfaWQsIHVzZXJfaWQsIHNlcnZpY2VfaWQsIGNvbnRyYWN0X2RhdGUsIGR1cmF0aW9uXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIHRvdGFsID0gKE51bWJlcihkdXJhdGlvbikgKyAxKSAqIE51bWJlcihwYXltZW50KTtcclxuICAgICAgZm9ybSA9ICdpZF9lbXBsZWFkbz0nICsgdXNlcl9pZCArIFwiJmlkX2NsaWVudGU9XCIgKyBjbGllbnRfaWQgKyBcIiZpZF9zZXJ2aWNpbz1cIiArIHNlcnZpY2VfaWQgKyBcIiZjb2RpZ289XCIgKyBjb2RlICsgXCImZmVjaGE9XCIgKyBjb250cmFjdF9kYXRlO1xyXG4gICAgICBmb3JtICs9IFwiJmR1cmFjaW9uPVwiICsgZHVyYXRpb24gKyBcIiZtb250b190b3RhbD1cIiArIHRvdGFsICsgXCImbW9udG9fcGFnYWRvPTAmdWx0aW1vX3BhZ289bnVsbFwiO1xyXG4gICAgICBmb3JtICs9IFwiJm1lbnN1YWxpZGFkPVwiICsgcGF5bWVudCArIFwiJnByb3hpbW9fcGFnbz1cIiArIG5leHRQYXltZW50ICsgXCImZXN0YWRvPWFjdGl2byZ0YWJsYT1jb250cmF0b3NcIjtcclxuICAgICAgZm9ybSArPSBcIiZub21icmVfZXF1aXBvPVwiICsgZXF1aXBtZW50ICsgXCImbWFjX2VxdWlwbz1cIiArIGVNYWMgKyBcIiZyb3V0ZXI9XCIgKyByb3V0ZXIgKyBcIiZtYWNfcm91dGVyPVwiICsgck1hYztcclxuICAgICAgZm9ybSArPSBcIiZtb2RlbG89XCIgKyBtb2RlbCArIFwiJmlwPVwiICsgaXA7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9hZGRcIiwgbnVsbCwgbnVsbCwgQ29udHJhY3RzLmdldExhc3QsIGZvcm0sIG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBleHRlbmQ6IGZ1bmN0aW9uKGlkQ29udHJhdG8pIHtcclxuICAgIHZhciBmb3JtO1xyXG4gICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgaWRDb250cmF0b3I7XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvZXh0ZW5kXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y29udHJhdG9zXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgY29udHJhY3RUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBnZXRMYXN0OiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgY29uc29sZS5sb2coZGF0YS5tZW5zYWplKTtcclxuICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSlcclxuICAgICQoXCIjYnRuLXNhdmUtY29udHJhY3RcIikuYXR0cihcImRpc2FibGVkXCIsIFwiXCIpO1xyXG4gICAgJChcIiNidG4tcHJpbnQtY29udHJhY3RcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgaWYoZGF0YS50YWJsYV9wYWdvcyl7XHJcbiAgICAgIG1ha2VQYXltZW50TGlzdChkYXRhLnRhYmxhX3BhZ29zKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjYWxsRXh0cmE6IGZ1bmN0aW9uKGNvbnRleHQpIHtcclxuICAgIHZhciByb3dcclxuICAgIGlmIChjb250ZXh0ID09IFwiZGV0YWlsc1wiKXtcclxuICAgICAgcm93ID0gZGV0YWlsc0NvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgIH1lbHNle1xyXG4gICAgICByb3cgPSBjb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmIChyb3cpIHtcclxuICAgICAgJChcIiNleHRyYS1jbGllbnQtZG5pXCIpLnZhbChyb3cuY2VkdWxhKTtcclxuICAgICAgQ29udHJhY3RzLmdldEFsbE9mQ2xpZW50KHJvdy5jZWR1bGEpO1xyXG4gICAgICAkKCcjYWRkLWV4dHJhLW1vZGFsJykubW9kYWwoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJTZWxlY2Npb25lIGVsIGNvbnJhdG8gcHJpbWVyb1wiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNhbmNlbDogZnVuY3Rpb24ocm93LGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgaXNfcGVuYWx0eSA9IGZhbHNlO1xyXG4gICAgdmFyIHJlYXNvbiAgICAgPSAkKFwiI2NhbmNlbGF0aW9uLXJlYXNvblwiKS52YWwoKTtcclxuICAgIHZhciBjaGVja2VkICAgID0gJChcIiNjaGVjay1wZW5hbHR5OmNoZWNrZWRcIikubGVuZ3RoO1xyXG4gICAgdmFyIGZvcm0sIGZlY2hhO1xyXG4gICAgY29uc29sZS5sb2cocm93KVxyXG4gICAgaWYocm93LmlkKXtcclxuICAgICAgaWYgKGNoZWNrZWQgPiAwKSB7XHJcbiAgICAgICAgaXNfcGVuYWx0eSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZmVjaGEgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyByb3cuaWQgKyAnJmZlY2hhPScgKyBmZWNoYSArICcmaWRfY2xpZW50ZT0nICsgcm93LmlkX2NsaWVudGU7XHJcbiAgICAgIGZvcm0gKz0gXCImbW90aXZvPVwiICsgcmVhc29uICsgXCImcGVuYWxpZGFkPVwiICsgaXNfcGVuYWx0eTtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvY2FuY2VsJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgY2FsbGJhY2spO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfRVJST1IgK1wiIE5vIGhheSBjb250cmF0byBzZWxlY2Npb25hZG9cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0T25lOiBmdW5jdGlvbihpZF9jb250cmF0bywgcmVjZWl2ZXIpIHtcclxuICAgIGZvcm0gPSBcInRhYmxhPWNvbnRyYXRvcyZpZF9jb250cmF0bz1cIiArIGlkX2NvbnRyYXRvO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2dldG9uZVwiLCBmYWxzZSwgbnVsbCwgcmVjZWl2ZXIsIGZvcm0sIG51bGwpXHJcbiAgfSxcclxuXHJcbiAgcmVjaWV2ZTogZnVuY3Rpb24oY29udGVudCkge1xyXG4gICAgdmFyIGNvbnRyYWN0ICAgID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgIHRoaXMuaWRfY29udHJhdG8gPSBjb250cmFjdFsnaWRfY29udHJhdG8nXTtcclxuICAgIHZhciAkZXF1aXBvICAgICA9ICQoXCIjdS1jb250cmFjdC1lcXVpcG1lbnRcIik7XHJcbiAgICB2YXIgJG1hY0VxdWlwbyAgPSAkKFwiI3UtY29udHJhY3QtZS1tYWNcIik7XHJcbiAgICB2YXIgJHJvdXRlciAgICAgPSAkKFwiI3UtY29udHJhY3Qtcm91dGVyXCIpO1xyXG4gICAgdmFyICRtYWNSb3V0ZXIgID0gJChcIiN1LWNvbnRyYWN0LXItbWFjXCIpO1xyXG4gICAgdmFyICRtb2RlbG8gICAgID0gJChcIiN1LWNvbnRyYWN0LW1vZGVsb1wiKTtcclxuICAgIHZhciAkY29kaWdvICAgICA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0LWNvZGVcIik7XHJcbiAgICB2YXIgJGlzQ2hhbmdlSXAgPSAkKFwiI2NoZWNrLWNoYW5nZS1pcFwiKTtcclxuICAgIHZhciAkaXAgICAgICAgICA9ICQoXCIjdS1jb250cmFjdC1pcFwiKTtcclxuXHJcbiAgICAkZXF1aXBvLnZhbChjb250cmFjdFsnbm9tYnJlX2VxdWlwbyddKTtcclxuICAgICRtYWNFcXVpcG8udmFsKGNvbnRyYWN0WydtYWNfZXF1aXBvJ10pO1xyXG4gICAgJHJvdXRlci52YWwoY29udHJhY3RbJ3JvdXRlciddKTtcclxuICAgICRtYWNSb3V0ZXIudmFsKGNvbnRyYWN0WydtYWNfcm91dGVyJ10pO1xyXG4gICAgJG1vZGVsby52YWwoY29udHJhY3RbJ21vZGVsbyddKTtcclxuICAgICRpcC52YWwoY29udHJhY3RbJ2lwJ10pO1xyXG5cclxuICAgIC8vICQoXCIjdXBkYXRlLWNvbnRyYWN0LW1vZGFsIHNlbGVjdFwiKS52YWwoJycpXHJcbiAgICAkKFwiI3VwZGF0ZS1jb250cmFjdC1tb2RhbFwiKS5tb2RhbCgpO1xyXG4gICAgJChcIiN1cGRhdGUtY29udHJhY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdXBkYXRlQ29udHJhY3QoaWRfY29udHJhdG8pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29udHJhY3QoaWRfY29udHJhdG8pIHtcclxuICAgICAgdmFyIGNoZWNrZWQgPSAkKFwiI2NoZWNrLWNoYW5nZS1pcDpjaGVja2VkXCIpLmxlbmd0aDtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgaWRfY29udHJhdG8gKyAnJm5vbWJyZV9lcXVpcG89JyArICRlcXVpcG8udmFsKCkgKyBcIiZtYWNfZXF1aXBvPVwiICsgJG1hY0VxdWlwby52YWwoKTtcclxuICAgICAgZm9ybSArPSBcIiZyb3V0ZXI9XCIgKyAkcm91dGVyLnZhbCgpICsgXCImbWFjX3JvdXRlcj1cIiArICRtYWNSb3V0ZXIudmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImbW9kZWxvPVwiICsgJG1vZGVsby52YWwoKTtcclxuICAgICAgZm9ybSArPSBcIiZ0YWJsYT1jb250cmF0b3NcIjtcclxuICAgICAgaWYgKGNoZWNrZWQgPiAwKSB7XHJcbiAgICAgICAgZm9ybSArPSBcIiZpcD1cIiArICRpcC52YWwoKSArIFwiJmNvZGlnbz1cIiArICRjb2RpZ28udmFsKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBDb250cmFjdHMuZ2V0QWxsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRJcExpc3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWN0aW9uX2lkID0gJChcIiNzZWxlY3QtY29udHJhY3Qtc2VjdG9yXCIpLnZhbCgpO1xyXG4gICAgdmFyIGZvcm0gPSBcImlkX3NlY2Npb249XCIgKyBzZWN0aW9uX2lkICsgXCImdGFibGE9aXBfbGlzdFwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2dldGFsbFwiLCBmYWxzZSwgbnVsbCwgbWFrZUlwTGlzdCwgZm9ybSwgbnVsbCk7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFrZUlwTGlzdChjb250ZW50KSB7XHJcbiAgICAgICQoXCIjc2VsZWN0LWNvbnRyYWN0LWNvZGVcIikuaHRtbChjb250ZW50KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBidG5FeHRyYVByZXNzZWQ6IGZ1bmN0aW9uICgkdGhpcykge1xyXG4gICAgdmFyIGJ1dHRvbklkID0gJHRoaXMudGV4dCgpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIHN3aXRjaCAoYnV0dG9uSWQpIHtcclxuICAgICAgY2FzZSBcIm1lam9yYXJcIjpcclxuICAgICAgICBDb250cmFjdHMudXBncmFkZSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZXh0ZW5kZXJcIjpcclxuICAgICAgICBDb250cmFjdHMuZXh0ZW5kKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJndWFyZGFyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLmFkZEV4dHJhKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBncmFkZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIGNvbnRyYWN0SWQsIHNlbGVjdGVkU2VydmljZSwgc2VydmljZUlkLCBhbW91bnQ7XHJcblxyXG4gICAgY29udHJhY3RJZCA9ICQoXCIjZXh0cmEtY2xpZW50LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgc2VsZWN0ZWRTZXJ2aWNlID0gJChcIi5zZXJ2aWNlLWNhcmQuc2VsZWN0ZWRcIik7XHJcbiAgICBzZXJ2aWNlSWQgPSBzZWxlY3RlZFNlcnZpY2UuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICBhbW91bnQgPSBzZWxlY3RlZFNlcnZpY2UuYXR0cihcImRhdGEtcGF5bWVudFwiKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtjb250cmFjdElkLCBzZXJ2aWNlSWQsIGFtb3VudF0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyBjb250cmFjdElkICsgXCImaWRfc2VydmljaW89XCIgKyBzZXJ2aWNlSWQgKyBcIiZjdW90YT1cIiArIGFtb3VudDtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBncmFkZScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcImFzZWd1cmF0ZSBkZSBsbGVuYXIgdG9kb3MgbG9zIGRhdG9zIHkgc2VsZWNjaW9uYXIgZWwgc2VydmljaW9cIiwgXCJpbmZvXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHJlY29ubmVjdDogZnVuY3Rpb24gKGNvbnRyYWN0SWQsY2FsbGJhY2spIHtcclxuICAgIHZhciBmb3JtLCBzZWxlY3RlZFNlcnZpY2UsIHNlcnZpY2VJZCwgZHVyYXRpb24sIGRhdGUsc2VuZCwgaXNfZW1wdHksaW5mbztcclxuXHJcbiAgICBzZWxlY3RlZFNlcnZpY2UgPSAkKFwiLnNlcnZpY2UtY2FyZC5zZWxlY3RlZFwiKTtcclxuICAgIHNlcnZpY2VJZCA9IHNlbGVjdGVkU2VydmljZS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgIGR1cmF0aW9uICA9ICQoXCIjcmVjb25uZWN0aW9uLW1vbnRoc1wiKS52YWwoKTtcclxuICAgIGRhdGUgPSAkKFwiI3JlY29ubmVjdGlvbi1kYXRlXCIpLnZhbCgpXHJcbiAgICBjb25zb2xlLmxvZyhjb250cmFjdElkKVxyXG4gICAgaXNfZW1wdHkgPSBpc0VtcHR5KFtjb250cmFjdElkLHNlcnZpY2VJZCxkYXRlLGR1cmF0aW9uXSk7XHJcbiAgICBpZighaXNfZW1wdHkpe1xyXG4gICAgICBpbmZvID0ge1xyXG4gICAgICAgICdpZF9jb250cmF0byc6IGNvbnRyYWN0SWQsXHJcbiAgICAgICAgJ2ZlY2hhJzogZGF0ZSxcclxuICAgICAgICAnaWRfc2VydmljaW8nOiBzZXJ2aWNlSWQsXHJcbiAgICAgICAgJ2R1cmFjaW9uJzogZHVyYXRpb25cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9ybSA9IFwiZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KGluZm8pO1xyXG4gICAgICBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArIFwiY29udHJhY3QvcmVjb25uZWN0XCIsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIGRpc3BsYXlNZXNzYWdlKHJlcy5kYXRhLm1lbnNhamUpO1xyXG4gICAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgICAgICQoXCIjYnRuLXJlY29ubmVjdFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgJChcIi5yZWNvbm5lY3QtY2FsbGVyXCIpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgaWYoY2FsbGJhY2spXHJcbiAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIHN3YWwoXCJMbGVuZSB0b2RvcyBsb3MgY2FtcG9zXCIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYWRkRXh0cmE6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBleHRyYVNlcnZpY2UsIHNlcnZpY2VDb3N0LCBlcXVpcG1lbnQsIGVNYWMsIHJvdXRlciwgck1hYyxwYXltZW50TW9kZTtcclxuXHJcbiAgICBjb250cmFjdElkID0gJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICBzZXJ2aWNlQ29zdCA9ICQoXCIjZXh0cmEtc2VydmljZS1jb3N0XCIpLnZhbCgpO1xyXG4gICAgZXh0cmFTZXJ2aWNlID0gJChcIiNzZWxlY3QtZXh0cmEtc2VydmljZVwiKS52YWwoKTtcclxuICAgIGVxdWlwbWVudCA9ICQoXCIjZXh0cmEtZXF1aXBvXCIpLnZhbCgpO1xyXG4gICAgZU1hYyA9ICQoXCIjZXh0cmEtZS1tYWNcIikudmFsKCk7XHJcbiAgICByb3V0ZXIgPSAkKFwiI2V4dHJhLXJvdXRlclwiKS52YWwoKTtcclxuICAgIHJNYWMgPSAkKFwiI2V4dHJhLXItbWFjXCIpLnZhbCgpO1xyXG4gICAgcGF5bWVudE1vZGUgPSAkKFwiI3NlbGVjdC1wYXltZW50LW1vZGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCwgZXh0cmFTZXJ2aWNlLCBzZXJ2aWNlQ29zdCxwYXltZW50TW9kZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyBjb250cmFjdElkICsgXCImY29zdG9fc2VydmljaW89XCIgKyBzZXJ2aWNlQ29zdCArIFwiJm5vbWJyZV9zZXJ2aWNpbz1cIiArIGV4dHJhU2VydmljZTtcclxuICAgICAgZm9ybSArPSAnJm5vbWJyZV9lcXVpcG89JyArIGVxdWlwbWVudCArIFwiJm1hY19lcXVpcG89XCIgKyBlTWFjICsgXCImcm91dGVyPVwiICsgcm91dGVyICsgXCImbWFjX3JvdXRlcj1cIiArIHJNYWM7XHJcbiAgICAgIGZvcm0gKz0gJyZtb2RvX3BhZ289JyArIHBheW1lbnRNb2RlO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9hZGRleHRyYScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBleHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBkdXJhdGlvbjtcclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIGR1cmF0aW9uID0gJChcIiNleHRyYS1leHRlbnNpb24tbW9udGhzXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2R1cmF0aW9uLCBjb250cmFjdElkXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGNvbnRyYWN0SWQgKyBcIiZkdXJhY2lvbj1cIiArIGR1cmF0aW9uO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9leHRlbmRfY29udHJhY3QnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGxPZkNsaWVudDogZnVuY3Rpb24oZG5pKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwiZG5pPVwiICsgZG5pO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2RhdGFfZm9yX2V4dHJhXCIsIGZhbHNlLCBudWxsLCBtYWtlQ29udHJhY3RMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICAvLyBOb3RlOiBsbyBzaWVudG8sIGRlIGFxdWkgZW4gYWRlbGFudGUgdXNvIGF4aW9zLCBlcyBtdWNobyBtYXMgY29tb2RvXHJcblxyXG4gIHN1c3BlbmQ6IGZ1bmN0aW9uIChjb250cmFjdElkLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeSh7aWRfY29udHJhdG86IGNvbnRyYWN0SWR9KVxyXG4gICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2NvbnRyYWN0L3N1c3BlbmQnLGZvcm0pO1xyXG4gICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgIHZhciBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgQ29udHJhY3RzLmdldEFsbCgpO1xyXG4gICAgICBpZihjYWxsYmFjaylcclxuICAgICAgICBjYWxsYmFjaygpXHJcbiAgICB9KVxyXG4gICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG52YXIgUGF5bWVudHMgPSB7XHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaWQgPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIGlmIChpZCAhPSBudWxsKSB7XHJcbiAgICAgIHZhciBmb3JtID0gXCJ0YWJsYT1wYWdvcyZpZD1cIiArIGlkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgcGF5bWVudFRhYmxlLnJlZnJlc2gsIGZvcm0sIFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgdmFyIGRhdGUgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICB2YXIgaWRfY29udHJhdG8gPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPXBhZ29zJmlkPVwiICsgaWQgKyBcIiZlc3RhZG89cGFnYWRvJmZlY2hhX3BhZ289XCIgKyBkYXRlICsgXCImaWRfY29udHJhdG89XCIgKyBpZF9jb250cmF0bztcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBzYXZlQWJvbm9zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgb2JzZXJ2YXRpb25zLCBhYm9ubyRpbnB1dEFib25vLCR0ZXh0QWJvbm8sY29udHJhY3RJZDtcclxuXHJcbiAgICAkdGV4dEFib25vICAgPSAkKCcjdGV4dC1hYm9uby1kZXRhaWwnKTtcclxuICAgIG9ic2VydmF0aW9ucyA9ICR0ZXh0QWJvbm8udmFsKCk7XHJcbiAgICBjb250cmFjdElkICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgICRpbnB1dEFib25vICA9ICQoXCIjaW5wdXQtYWJvbm9cIik7XHJcbiAgICBhYm9ubyAgICAgICAgPSAkaW5wdXRBYm9uby52YWwoKTtcclxuXHJcbiAgICBmb3JtID0gJ29ic2VydmFjaW9uZXM9JyArIG9ic2VydmF0aW9ucyArIFwiJmFib25vcz1cIiArIGFib25vO1xyXG4gICAgZm9ybSArPSBcIiZjb250cmF0b19hYm9ubz1cIitjb250cmFjdElkK1wiJnRhYmxhPWFib25vc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpXHJcbiAgICAkaW5wdXRBYm9uby52YWwoJycpXHJcbiAgfSxcclxuXHJcbiAgc2F2ZUV4dHJhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAncHJvY2Vzcy8nKVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVVudGlsOiBmdW5jdGlvbihjb250cmFjdElkLGxhc3RQYXltZW50SWQpe1xyXG4gICAgdmFyIGlkX2NvbnRyYXRvID0gJChcIiNzZWxlY3QtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9cGFnb3NfYWxfZGlhJmlkX3VsdGltb19wYWdvPVwiICsgbGFzdFBheW1lbnRJZCArIFwiJmVzdGFkbz1wYWdhZG8maWRfY29udHJhdG89XCIgKyBjb250cmFjdElkO1xyXG4gICAgdmFyIGhhbmRsZXJzLCBjYWxsYmFjaztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwsIGhlYXZ5TG9hZCk7XHJcbiAgfSxcclxuICAgIFxyXG4gIHJlbW92ZVBheW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWRlc2hhY2VyX3BhZ28maWRfcGFnbz1cIiArIGlkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBjb250cmFjdFJlZnJlc2g6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaWRfY2xpZW50ZSA9ICQoJyNkZXRhaWwtY2xpZW50LWlkJykudmFsKClcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jb250cmF0b3NfY2xpZW50ZSZpZD1cIiArIGlkX2NsaWVudGU7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgZGV0YWlsc0NvbnRyYWN0VGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0T25lOiBmdW5jdGlvbihpZF9wYWdvLCByZWNlaXZlcikge1xyXG4gICAgZm9ybSA9IFwidGFibGE9cGFnb3MmaWRfcGFnbz1cIiArIGlkX3BhZ287XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvZ2V0b25lXCIsIGZhbHNlLCBudWxsLCByZWNlaXZlciwgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICByZWNlaXZlRm9yRWRpdDogZnVuY3Rpb24oY29udGVudCl7XHJcbiAgICB2YXIgcGFnbyAgICAgICAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB0aGlzLmlkX2NvbnRyYXRvICA9IHBhZ29bJ2lkX2NvbnRyYXRvJ107XHJcbiAgICB0aGlzLmlkX3BhZ28gICAgID0gcGFnb1snaWRfcGFnbyddXHJcbiAgICB2YXIgJGNvbmNlcHRvICAgICA9ICQoXCIjcGF5bWVudC1jb25jZXB0XCIpO1xyXG4gICAgdmFyICRmZWNoYUxpbWl0ZSAgPSAkKFwiI3BheW1lbnQtbGltaXQtZGF0ZVwiKTtcclxuICAgIHZhciAkY3VvdGEgICAgICAgID0gJChcIiNwYXltZW50LWN1b3RhXCIpO1xyXG4gICAgdmFyICRtb3JhICAgICAgICAgPSAkKFwiI3BheW1lbnQtbW9yYVwiKTtcclxuICAgIHZhciAkZXh0cmEgICAgICAgID0gJChcIiNwYXltZW50LWV4dHJhXCIpO1xyXG4gICAgdmFyICR0b3RhbCAgICAgICAgPSAkKFwiI3BheW1lbnQtdG90YWxcIik7XHJcbiAgICB2YXIgJGRlc2N1ZW50byAgICA9ICQoXCIjcGF5bWVudC1kaXNjb3VudC1hbW91bnRcIik7XHJcbiAgICB2YXIgJHJhem9uICAgICAgICA9ICQoXCIjcGF5bWVudC1kaXNjb3VudC1yZWFzb25cIik7XHJcbiAgICB2YXIgJG1vZGFsICAgICAgICA9ICQoXCIjYWR2YW5jZWQtcGF5bWVudFwiKTtcclxuXHJcbiAgICAkY29uY2VwdG8udmFsKHBhZ29bJ2NvbmNlcHRvJ10pO1xyXG4gICAgJGZlY2hhTGltaXRlLnZhbChwYWdvWydmZWNoYV9saW1pdGUnXSk7XHJcbiAgICAkY3VvdGEudmFsKHBhZ29bJ2N1b3RhJ10pO1xyXG4gICAgJG1vcmEudmFsKHBhZ29bJ21vcmEnXSk7XHJcbiAgICAkZXh0cmEudmFsKHBhZ29bJ21vbnRvX2V4dHJhJ10pO1xyXG4gICAgJHRvdGFsLnZhbChwYWdvWyd0b3RhbCddKTtcclxuICAgIGludGVyYWN0aXZlU3VtKCk7XHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCk7XHJcbiAgICAkbW9kYWwub24oJ2hpZGUuYnMubW9kYWwnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICRtb2RhbC5maW5kKCdpbnB1dCcpLnZhbCgnJylcclxuICAgIH0pO1xyXG4gICAgJChcIiNidG4tYXBwbHktZGlzY291bnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJTZWd1cm8gZGUgcXVlIHF1aWVyZSBhcGxpY2FyIGVzdGUgZGVzY3VlbnRvIGRlIFwiICsgJGRlc2N1ZW50by52YWwoKSArIFwiP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgYXBwbHlEaXNjb3VudChpZF9wYWdvKTtcclxuICAgICAgICAgICRtb2RhbC5oaWRlKCk7XHJcbiAgICAgICAgICAkbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgICAgICAgJCgnLm1vZGFsLWJhY2tkcm9wJykucmVtb3ZlKCk7XHJcbiBcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGx5RGlzY291bnQoaWRfcGFnbykge1xyXG4gICAgICB2YXIgZGF0ZSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgIGZvcm0gPSAnaWRfcGFnbz0nICsgaWRfcGFnbyArICcmaWRfY29udHJhdG89JyArIGlkX2NvbnRyYXRvICsgXCImY3VvdGE9XCIgKyAkY3VvdGEudmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImbW9yYT1cIiArICRtb3JhLnZhbCgpICsgXCImbW9udG9fZXh0cmE9XCIgKyAkZXh0cmEudmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImdG90YWw9XCIgKyAkdG90YWwudmFsKCkgKyAnJmRlc2N1ZW50bz0nICsgJGRlc2N1ZW50by52YWwoKSArICcmcmF6b25fZGVzY3VlbnRvPScgKyRyYXpvbi52YWwoKSArICcmZmVjaGFfcGFnbz0nICsgZGF0ZSA7XHJcbiAgICAgIGZvcm0gKz0gXCImdGFibGE9ZGlzY291bnRfcGFnb3NcIjtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpO1xyXG4gICAgICAkbW9kYWwuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGludGVyYWN0aXZlU3VtKCl7XHJcbiAgICAgICQoJy5wYXltZW50LXN1bWFuZG9zJykub24oJ2tleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgICAgICRjdW90YS52YWwocGFnb1snY3VvdGEnXSAtICRkZXNjdWVudG8udmFsKCkpO1xyXG4gICAgICAgIHZhciBzdW1hID0gTnVtYmVyKCRjdW90YS52YWwoKSkgKyBOdW1iZXIoJG1vcmEudmFsKCkpICsgTnVtYmVyKCRleHRyYS52YWwoKSk7XHJcbiAgICAgICAgJHRvdGFsLnZhbChOdW1iZXIoc3VtYSkpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZWRpdDogZnVuY3Rpb24oY29udGVudCl7XHJcbiAgICB2YXIgcGFnbyAgICAgICAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB0aGlzLmlkX2NvbnRyYXRvICA9IHBhZ29bJ2lkX2NvbnRyYXRvJ107XHJcbiAgICB0aGlzLmlkX3BhZ28gICAgICA9IHBhZ29bJ2lkX3BhZ28nXVxyXG4gICAgdmFyICRtb2RhbCAgICAgICAgPSAkKCcjZWRpdC1wYXltZW50LW1vZGFsJykgXHJcbiAgICBjb25zb2xlLmxvZyhwYWdvKVxyXG5cclxuICAgICRtb2RhbC5tb2RhbCgpO1xyXG5cclxuICAgICRtb2RhbC5vbignaGlkZS5icy5tb2RhbCcsZnVuY3Rpb24oKXtcclxuICAgICAgJG1vZGFsLmZpbmQoJ2lucHV0JykudmFsKCcnKVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1lZGl0ZWQtcGF5bWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIlNlZ3VybyBkZSBxdWUgcXVpZXJlIGFwbGljYXIgZXN0ZSBkZXNjdWVudG8gZGUgXCIgKyAkZGVzY3VlbnRvLnZhbCgpICsgXCI/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBhcHBseURpc2NvdW50KGlkX3BhZ28pO1xyXG4gICAgICAgICAgJG1vZGFsLmhpZGUoKTtcclxuICAgICAgICAgICRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgICAgICAgICAkKCcubW9kYWwtYmFja2Ryb3AnKS5yZW1vdmUoKTtcclxuIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIFxyXG59XHJcblxyXG52YXIgRGFtYWdlcyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uIChpZENsaWVudGUpIHtcclxuICAgIHZhciBmb3JtLCBkZXNjcmlwdGlvbjtcclxuICAgIGRlc2NyaXB0aW9uID0gJChcIiNhLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2lkQ2xpZW50ZSwgZGVzY3JpcHRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9jbGllbnRlPScgKyBpZENsaWVudGUgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uICsgXCImdGFibGE9YXZlcmlhc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvYWRkXCIsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgRGFtYWdlcy5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgICAkKCcjbmV3LWF2ZXJpYS1tb2RhbCcpLmZpbmQoJ2lucHV0LHRleHRhcmVhJykudmFsKFwiXCIpO1xyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXR1cyA9ICQoXCIjYXZlcmlhcy12aWV3LW1vZGVcIikudmFsKCk7XHJcbiAgICAkKFwiLnByZXNlbnRhZG9cIikudGV4dChzdGF0dXMpO1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWF2ZXJpYXMmZXN0YWRvPVwiICsgc3RhdHVzO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIGluaXRHbG9iYWxIYW5kbGVycywgZmlsbEF2ZXJpYXNMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgkaWRfYXZlcmlhKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9YXZlcmlhcyZpZF9hdmVyaWE9XCIgKyAkaWRfYXZlcmlhO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBudWxsLCBmb3JtLCBEYW1hZ2VzLmdldEFsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgSW5zdGFsbGF0aW9ucyA9IHtcclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGF0dXMgPSAkKFwiI2luc3RhbGxhdGlvbnMtdmlldy1tb2RlXCIpLnZhbCgpO1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWluc3RhbGFjaW9uZXMmZXN0YWRvPVwiICsgc3RhdHVzO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIGluaXRHbG9iYWxIYW5kbGVycywgZmlsbEluc3RhbGxhdGlvbnNMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgkaWRfcGFnbykge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWluc3RhbGFjaW9uZXMmaWRfcGFnbz1cIiArICRpZF9wYWdvO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBudWxsLCBmb3JtLCBJbnN0YWxsYXRpb25zLmdldEFsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ2FqYSA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBhbW91bnQsIGRlc2NyaXB0aW9uLCBpc19lbXB0eTtcclxuXHJcbiAgICBhbW91bnQgPSAkKFwiI2NhamEtYS1hbW91bnRcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjY2FqYS1hLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG4gICAgZm9ybSA9IFwiZW50cmFkYT1cIiArIGFtb3VudCArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb24gKyBcIiZ0YWJsYT1jYWphXCI7XHJcbiAgICBpc19lbXB0eSA9IGlzRW1wdHkoW2Ftb3VudCwgZGVzY3JpcHRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvYWRkJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ2FqYS5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZXRpcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBhbW91bnQsIGRlc2NyaXB0aW9uLCBpc19lbXB0eTtcclxuXHJcbiAgICBhbW91bnQgPSAkKFwiI2NhamEtci1hbW91bnRcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjY2FqYS1yLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG4gICAgZm9ybSA9IFwic2FsaWRhPVwiICsgYW1vdW50ICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbjtcclxuICAgIGlzX2VtcHR5ID0gaXNFbXB0eShbYW1vdW50LCBkZXNjcmlwdGlvbl0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvcmV0aXJlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ2FqYS5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jYWphXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRBbGwnLCBmYWxzZSwgbnVsbCwgY2FqYVRhYmxlLnJlZnJlc2gsIGZvcm0sIENhamEuZ2V0U2FsZG8pO1xyXG4gIH0sXHJcblxyXG4gIGdldFNhbGRvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2FqYVwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0b25lJywgZmFsc2UsIG51bGwsIHVwZGF0ZVNhbGRvLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICRkYXRlU2VhcmNoID0gJChcIiNjYWphLWRhdGVcIik7XHJcbiAgICB2YXIgJHVzZXJTZWFyY2ggPSAkKFwiI2NhamEtdXNlclwiKTtcclxuICAgIHZhciBkYXRlID0gKCRkYXRlU2VhcmNoLnZhbCgpKSA/ICRkYXRlU2VhcmNoLnZhbCgpIDogJyUnO1xyXG4gICAgdmFyIHVzZXJJZCA9ICgkdXNlclNlYXJjaC52YWwoKSkgPyAkdXNlclNlYXJjaC52YWwoKSA6ICclJztcclxuXHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2FqYSZpZF9lbXBsZWFkbz1cIiArIHVzZXJJZCArIFwiJmZlY2hhPVwiICsgZGF0ZTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3NlYXJjaCcsIGZhbHNlLCBudWxsLCBjYWphVGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ29tcGFueSA9IHtcclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLFxyXG4gICAgY29tcGFueU5hbWUgPSAkKFwiI2NvbXBhbnktbmFtZVwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlTdGF0ZW1lbnQgPSAkKFwiI2NvbXBhbnktc3RhdGVtZW50XCIpLnZhbCgpLFxyXG4gICAgY29tcGFueVBob25lMSA9IGdldFZhbCgkKFwiI2NvbXBhbnktcGhvbmUxXCIpKSxcclxuICAgIGNvbXBhbnlEaXJlY3Rpb24gPSAkKFwiI2NvbXBhbnktZGlyZWN0aW9uXCIpLnZhbCgpLFxyXG4gICAgY29tcGFueURlc2NyaXB0aW9uID0gJChcIiNjb21wYW55LWRlc2NyaXB0aW9uXCIpLnZhbCgpLFxyXG4gICAgY29tcGFueVBob25lMiA9IGdldFZhbCgkKFwiI2NvbXBhbnktcGhvbmUyXCIpKVxyXG5cclxuICAgIGZvcm0gPSAnbm9tYnJlPScgKyBjb21wYW55TmFtZSArICcmbGVtYT0nICsgY29tcGFueVN0YXRlbWVudCArICcmZGVzY3JpcGNpb249JyArIGNvbXBhbnlEZXNjcmlwdGlvbiArIFwiJmRpcmVjY2lvbj1cIlxyXG4gICAgZm9ybSArPSBjb21wYW55RGlyZWN0aW9uICsgXCImdGVsZWZvbm8xPVwiICsgY29tcGFueVBob25lMSArIFwiJnRlbGVmb25vcz1cIiArIGNvbXBhbnlQaG9uZTIgKyBcIiZ0YWJsYT1lbXByZXNhXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBTZXR0aW5ncyA9IHtcclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLFxyXG4gICAgc2V0dGluZ3NDYXJnb01vcmEgPSAkKFwiI3NldHRpbmdzLW1vcmFcIikudmFsKCksXHJcbiAgICBzZXR0aW5nc0ZlY2hhQ29ydGUgPSAkKFwiI3NldHRpbmdzLWZlY2hhLWNvcnRlXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NBcGVydHVyYUNhamEgPSAkKFwiI3NldHRpbmdzLWFwZXJ0dXJhLWNhamFcIikudmFsKCksXHJcbiAgICBzZXR0aW5nc1BlbmFsaXphY2lvbkNhbmNlbGFjaW9uID0gJChcIiNzZXR0aW5ncy1wZW5hbGl6YWNpb24tY2FuY2VsYWNpb25cIikudmFsKCksXHJcbiAgICBzZXR0aW5nc01lc2VzUG9yRGVmZWN0byA9ICQoXCIjc2V0dGluZ3MtbWVzZXMtcG9yLWRlZmVjdG9cIikudmFsKCksXHJcbiAgICBzZXR0aW5nc1NwbGl0RGF5ID0gJChcIiNzZXR0aW5ncy1zcGxpdC1kYXlcIikudmFsKCk7XHJcblxyXG4gICAgZm9ybSA9ICdjYXJnb19tb3JhPScgKyBzZXR0aW5nc0NhcmdvTW9yYSArICcmZmVjaGFfY29ydGU9JyArIHNldHRpbmdzRmVjaGFDb3J0ZSArICcmYXBlcnR1cmFfY2FqYT0nICsgc2V0dGluZ3NBcGVydHVyYUNhamE7XHJcbiAgICBmb3JtICs9ICcmcGVuYWxpemFjaW9uX2NhbmNlbGFjaW9uPScgKyBzZXR0aW5nc1BlbmFsaXphY2lvbkNhbmNlbGFjaW9uICsgJyZtZXNlc19wb3JfZGVmZWN0bz0nICsgc2V0dGluZ3NNZXNlc1BvckRlZmVjdG87XHJcbiAgICBmb3JtICs9ICcmc3BsaXRfZGF5PScgKyBzZXR0aW5nc1NwbGl0RGF5ICsgJyZ0YWJsYT1zZXR0aW5ncyc7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBTZWN0aW9ucyA9IHsgXHJcbiAgYWRkOiBmdW5jdGlvbigpIHtcclxuICAgIHN3YWwuc2V0RGVmYXVsdHMoe1xyXG4gICAgICBpbnB1dDogJ3RleHQnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ05leHQgJnJhcnI7JyxcclxuICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcclxuICAgICAgcHJvZ3Jlc3NTdGVwczogWycxJywgJzInLCAnMyddXHJcbiAgICB9KVxyXG5cclxuICAgIHZhciBzdGVwcyA9IFt7XHJcbiAgICAgICAgdGl0bGU6ICdOb21icmUgZGVsIHNlY3RvcidcclxuICAgICAgfSxcclxuICAgICAgJ0NvZGlnbyBkZWwgU2VjdG9yJyxcclxuICAgIF1cclxuXHJcbiAgICBzd2FsLnF1ZXVlKHN0ZXBzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgc3dhbC5yZXNldERlZmF1bHRzKClcclxuICAgICAgc2F2ZShyZXN1bHQpXHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzYXZlKHJlc3VsdCl7XHJcbiAgICAgIHZhciBmb3JtO1xyXG4gICAgICB2YXIgbm9tYnJlID0gcmVzdWx0WzBdO1xyXG4gICAgICB2YXIgY29kaWdvQXJlYSA9IHJlc3VsdFsxXSxcclxuXHJcbiAgICAgIGZvcm0gPSBcIm5vbWJyZT1cIitub21icmUrXCImY29kaWdvX2FyZWE9XCIrY29kaWdvQXJlYTtcclxuICAgICAgZm9ybSArPSBcIiZ0YWJsYT1zZWNjaW9uZXNcIlxyXG4gICAgIFxyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSl7XHJcbiAgICAgICAgIGlmKGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2FkZCcsIHRydWUsIGZhbHNlLCBudWxsLCBmb3JtLFNlY3Rpb25zLmdldEFsbCxoZWF2eUxvYWQpKXtcclxuICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0SXBzOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpZCA9ICQoXCIjc2VsZWN0LXNlY3RvclwiKS52YWwoKTtcclxuICAgIGlmIChpZCAhPSBudWxsKSB7XHJcbiAgICAgIHZhciBmb3JtID0gXCJ0YWJsYT1pcHMmaWQ9XCIgKyBpZDtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIFNlY3Rpb25zLnJlb3JkZXJUYWJsZSwgZm9ybSxudWxsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZW9yZGVyVGFibGU6IGZ1bmN0aW9uKGNvbnRlbnQpe1xyXG4gICAgdmFyIHRhYmxlID0gJChcIiN0LXNlY3Rpb25zXCIpO1xyXG4gICAgdGFibGUuYm9vdHN0cmFwVGFibGUoJ2Rlc3Ryb3knKTtcclxuICAgICQoXCIjdC1zZWN0aW9ucyB0Ym9keVwiKS5odG1sKGNvbnRlbnQpO1xyXG4gICAgdGFibGUuYm9vdHN0cmFwVGFibGUoKTtcclxuICAgIHRhYmxlLmZpbmQoJ3Rib2R5JykuY3NzKHtkaXNwbGF5OlwidGFibGUtcm93LWdyb3VwXCJ9KTtcclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9c2VjY2lvbmVzXCI7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBmaWxsU2VsZWN0LCBmb3JtLGhlYXZ5TG9hZCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZmlsbFNlbGVjdChjb250ZW50KXtcclxuICAgICAgJChcIiNzZWxlY3Qtc2VjdG9yXCIpLmh0bWwoY29udGVudCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgIHZhciAkdGFibGUgPSAkKFwiI3Qtc2VjdGlvbnNcIik7XHJcbiAgICB2YXIgJGJ0blByaW50ID0gJChcIiNidG4tcHJpbnQtc2VjdGlvbnNcIik7XHJcbiAgICB2YXIgJHNlbGVjdFN0YXRlID0gJChcIiNmaWx0ZXItc2VjdGlvbnNcIik7XHJcbiAgICBcclxuXHJcbiAgICAkc2VsZWN0U3RhdGUub24oJ2NoYW5nZScsZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIGZpbHRlciA9ICQodGhpcykudmFsKClcclxuICAgICAgaWYoZmlsdGVyLmluY2x1ZGVzKFwiXVwiKSlcclxuICAgICAgICBmaWx0ZXIgPSBbJ29jdXBhZG8nLCdkaXNwb25pYmxlJ11cclxuICAgICAgY29uc29sZS5sb2coZmlsdGVyKVxyXG5cclxuICAgICAgJHRhYmxlLmJvb3RzdHJhcFRhYmxlKCdmaWx0ZXJCeScse1xyXG4gICAgICAgIGVzdGFkbzogIGZpbHRlclxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAkYnRuUHJpbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgcHJpbnQoKTtcclxuICAgIH0pXHJcblxyXG4gIH1cclxufVxyXG5cclxudmFyIEV4dHJhcyA9IHtcclxuICByZW1vdmU6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGlkX2NsaWVudGUsIHNlbmQ7XHJcbiAgICBcclxuICAgIGlkX2NsaWVudGUgPSAkKCcjZGV0YWlsLWNsaWVudC1pZCcpLnZhbCgpXHJcbiAgICBmb3JtID0gXCJkYXRhPVwiICsgSlNPTi5zdHJpbmdpZnkoe2lkOiBpZCxpZF9jbGllbnRlOiBpZF9jbGllbnRlfSk7XHJcbiAgICBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdleHRyYS9kZWxldGVfZXh0cmEnLCBmb3JtKTtcclxuICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhO1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpO1xyXG4gICAgICBleHRyYVRhYmxlLnJlZnJlc2goZGF0YS5leHRyYXMpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG59IiwiICB2YXIgY3VycmVudFBhZ2UgPSAkKFwidGl0bGVcIikudGV4dCgpLnNwbGl0KFwiIFwiKTtcclxuICBjdXJyZW50UGFnZSA9IGN1cnJlbnRQYWdlWzRdLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gIHZhciByYW4gPSBmYWxzZTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdENvbXBvbmVudHMoKSB7XHJcbiAgICBzd2l0Y2ggKGN1cnJlbnRQYWdlKSB7XHJcbiAgICAgIGNhc2UgXCJob21lXCI6XHJcbiAgICAgICAgaW5pdENsaWVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJhZG1pbmlzdHJhZG9yXCI6XHJcbiAgICAgICAgaW5pdEFkbWluSGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImNsaWVudGVzXCI6XHJcbiAgICAgICAgaW5pdENsaWVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzZXJ2aWNpb3NcIjpcclxuICAgICAgICBpbml0U2VydmljZXNIYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibnVldm9fY29udHJhdG9cIjpcclxuICAgICAgICBpbml0Q29udHJhY3RIYW5kbGVycygpO1xyXG4gICAgICAgIENvbnRyYWN0cy5nZXRJcExpc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImRldGFsbGVzXCI6XHJcbiAgICAgICAgaW5pdFBheW1lbnRzSGFuZGxlcnMoKTtcclxuICAgICAgICBkZXRhaWxIYW5kbGVycygpO1xyXG4gICAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJjb250cmF0b3NcIjpcclxuICAgICAgICBpbml0Q29udHJhY3RIYW5kbGVycygpO1xyXG4gICAgICAgIGluaXRDbGllbnRIYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiY3VlbnRhXCI6XHJcbiAgICAgICAgYWNvdW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNlY2Npb25lc1wiOlxyXG4gICAgICAgIHNlY3Rpb25IYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDYWphSGFuZGxlcnMoKTtcclxuICAgIGluaXRHbG9iYWxIYW5kbGVycygpO1xyXG4gIH1cclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgIGdsb2JhbHMgaGFuZGxlcnMgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICBmdW5jdGlvbiBpbml0R2xvYmFsSGFuZGxlcnMoKSB7XHJcbiAgICBcclxuICAgIHZhciBhdmVyaWFDbGllbnREbmkgPSAkKFwiI2EtY2xpZW50LWRuaVwiKTtcclxuXHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ25vdGlmaWNhY2lvbmVzJykge1xyXG4gICAgICBHZW5lcmFscy5jb3VudF90YWJsZShcImF2ZXJpYXNcIik7XHJcblxyXG4gICAgICAkKFwiI2F2ZXJpYXMtdmlldy1tb2RlXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgRGFtYWdlcy5nZXRBbGwoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKFwiI2luc3RhbGxhdGlvbnMtdmlldy1tb2RlXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgSW5zdGFsbGF0aW9ucy5nZXRBbGwoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCd0Ym9keScpLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogXCJ0YWJsZS1yb3ctZ3JvdXBcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2NvbnRyYXRvcycpIHtcclxuICAgICAgaW5pdENvbnRyYWN0SGFuZGxlcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYXZlcmlhQ2xpZW50ID0gJChcIiNhLWNsaWVudFwiKS5zZWxlY3QyKHtcclxuICAgICAgZHJvcGRvd25QYXJlbnQ6ICQoJyNuZXctYXZlcmlhLW1vZGFsJyksXHJcbiAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgIGFqYXg6IHtcclxuICAgICAgICB1cmw6IEJBU0VfVVJMICsgJ3Byb2Nlc3Mvc2VhcmNoJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGRlbGF5OiAyNTAsXHJcbiAgICAgICAgZGF0YTogZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcTogcGFyYW1zLnRlcm0sXHJcbiAgICAgICAgICAgIHRhYmxhOiAnY2xpZW50ZXNfcGFyYV9hdmVyaWFzJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHByb2Nlc3NSZXN1bHRzOiBmdW5jdGlvbiAoZGF0YSwgcGFyYW1zKSB7XHJcbiAgICAgICAgICBwYXJhbXMucGFnZSA9IHBhcmFtcy5wYWdlIHx8IDFcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3VsdHM6IGRhdGEuaXRlbXMsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICBtb3JlOiAocGFyYW1zLnBhZ2UgKiAzMCkgPCBkYXRhLnRvdGFsX2NvdW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhY2hlOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1hdmVyaWFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgRGFtYWdlcy5hZGQoYXZlcmlhQ2xpZW50LnZhbCgpKTtcclxuICAgIH0pO1xyXG5cclxuICAkKFwiLmJ0bi11cGRhdGUtYXZlcmlhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgdmFyIGlkX2F2ZXJpYSA9ICQodGhpcykucGFyZW50cygnLmF2ZXJpYS1pdGVtJykuZmluZCgnLmNvZGUnKVxyXG4gICAgaWRfYXZlcmlhID0gaWRfYXZlcmlhLnRleHQoKS50cmltKCk7XHJcbiAgICBEYW1hZ2VzLnVwZGF0ZShpZF9hdmVyaWEpO1xyXG4gIH0pO1xyXG5cclxuICAkKFwiLmJ0bi11cGRhdGUtaW5zdGFsbGF0aW9uXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgdmFyIGlkX3BhZ28gPSAkKHRoaXMpLnBhcmVudHMoJy5hdmVyaWEtaXRlbScpLmZpbmQoJy5jb2RlJyk7XHJcbiAgICBpZF9wYWdvID0gaWRfcGFnby50ZXh0KCkudHJpbSgpO1xyXG4gICAgSW5zdGFsbGF0aW9ucy51cGRhdGUoaWRfcGFnbyk7XHJcbiAgfSk7XHJcblxyXG4gICQoXCIjZXh0cmEtY29udHJvbHNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBDb250cmFjdHMuYnRuRXh0cmFQcmVzc2VkKCQodGhpcykpO1xyXG4gIH0pO1xyXG5cclxuICAkKFwiI2V4dHJhLWNsaWVudC1kbmlcIikub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgdmFyIGtleSA9IGUud2hpY2g7XHJcbiAgICB2YXIgZG5pID0gJCh0aGlzKS52YWwoKVxyXG4gICAgaWYgKGtleSA9PSAxMykge1xyXG4gICAgICBDb250cmFjdHMuZ2V0QWxsT2ZDbGllbnQoZG5pKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgYWRtaW4gaGFuZGxlcnMgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0QWRtaW5IYW5kbGVycygpIHtcclxuICAgIHVzZXJUYWJsZS5pbml0KCk7XHJcbiAgICAkKFwiI2J0bi1zYXZlLXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgVXNlcnMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBVc2Vycy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIuZGVsZXRlLXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgJHJvdyA9ICQodGhpcykucGFyZW50cyhcInRyXCIpO1xyXG4gICAgICB2YXIgaWQgPSAkcm93LmZpbmQoJy51c2VyLWlkJykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgdmFyIHJvdyA9IHVzZXJUYWJsZS5nZXRSb3coaWQpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgIHRleHQ6IFwiRGVzZWEgRWxpbWluYXIgYWwgVXN1YXJpbyBcIiArIHJvdy5ub21icmVzICsgXCIgXCIgKyByb3cuYXBlbGxpZG9zICsgXCI/XCIsXHJcbiAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFVzZXJzLmRlbGV0ZShpZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5lZGl0LXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdXNlci1pZCcpO1xyXG4gICAgICB2YXIgcm93ID0gdXNlclRhYmxlLmdldFJvdyhpZCk7XHJcblxyXG5cclxuICAgICAgJChcIiNlLW5pY2tuYW1lXCIpLnZhbChyb3cubmljayk7XHJcbiAgICAgICQoXCIjZS1uYW1lXCIpLnZhbChyb3cubm9tYnJlcyk7XHJcbiAgICAgICQoXCIjZS1sYXN0bmFtZVwiKS52YWwocm93LmFwZWxsaWRvcyk7XHJcbiAgICAgICQoXCIjZS1kbmlcIikudmFsKHJvdy5jZWR1bGEpO1xyXG4gICAgICAkKFwiI2UtdHlwZVwiKS52YWwocm93LnRpcG9fY29kaWdvKTtcclxuICAgICAgJCgnI3VwZGF0ZS11c2VyLW1vZGFsJykubW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjdXBkYXRlLWNvbXBhbnktZGF0YVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbXBhbnkudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtc2V0dGluZ3NcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBTZXR0aW5ncy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgIEluaXQgY2FqYSAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICBmdW5jdGlvbiBpbml0Q2FqYUhhbmRsZXJzKCkge1xyXG4gICAgaWYgKGN1cnJlbnRQYWdlID09ICdhZG1pbmlzdHJhZG9yJykge1xyXG4gICAgICBjYWphVGFibGUuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgdmFyIGJ0bkFkZE1vbmV5ID0gJChcIiNidG4tYWRkLW1vbmV5XCIpO1xyXG4gICAgdmFyIGJ0blJldGlyZU1vbmV5ID0gJChcIiNidG4tcmV0aXJlLW1vbmV5XCIpO1xyXG4gICAgdmFyIHVzZXJTZWFyY2ggPSAkKFwiI2NhamEtdXNlclwiKTtcclxuICAgIHZhciBkYXRlU2VhcmNoID0gJChcIiNjYWphLWRhdGVcIik7XHJcblxyXG4gICAgYnRuQWRkTW9uZXkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJ0blJldGlyZU1vbmV5Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENhamEucmV0aXJlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRlU2VhcmNoLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDYWphLnNlYXJjaCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdXNlclNlYXJjaC5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5zZWFyY2goKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgY2xpZW50IEhhbmRsZXJzICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0Q2xpZW50SGFuZGxlcnMoKSB7XHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2NsaWVudGVzJykge1xyXG4gICAgICBjbGllbnRUYWJsZS5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1jbGllbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2xpZW50cy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjdXBkYXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBpZCA9IGNsaWVudFRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIENsaWVudHMuZ2V0T25lKGlkLCBDbGllbnRzLnJlY2VpdmVGb3JFZGl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjbGllbnQtc2VhcmNoZXJcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJjbGllbnRlc1wiLCBjbGllbnRUYWJsZS5yZWZyZXNoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjY2xpZW50LXNlYXJjaGVyLW5ld2NvbnRyYWN0XCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgaWYgKCFpc0VtcHR5KFt0ZXh0XSkpIHtcclxuICAgICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJjbGllbnRlc1wiLCBjbGllbnRUYWJsZS5yZWZyZXNoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhclRib2R5KFwiLmxvYmJ5LXJlc3VsdHNcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZGVsZXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciByb3cgPSBjbGllbnRUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBFbGltaW5hciBhbChsYSkgQ2xpZW50ZSBcIiArIHJvdy5ub21icmVzICsgXCIgXCIgKyByb3cuYXBlbGxpZG9zICsgXCI/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIEdlbmVyYWxzLmRlbGV0ZVJvdyhyb3cuaWQsIFwiY2xpZW50ZXNcIilcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgSW5pdCBTZXJ2aWNlcyBIYW5kbGVycyAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGluaXRTZXJ2aWNlc0hhbmRsZXJzKCkge1xyXG4gICAgc2VydmljZVRhYmxlLmluaXQoKTtcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VydmljZXMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2RlbGV0ZS1zZXJ2aWNlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gc2VydmljZVRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgRWxpbWluYXIgIGVsIFNlcnZpY2lvP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBHZW5lcmFscy5kZWxldGVSb3coaWQsIFwic2VydmljaW9zXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2VkaXQtc2VydmljZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciByb3cgPSBzZXJ2aWNlVGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuXHJcbiAgICAgICQoJyN1LXNlcnZpY2UtaWQnKS52YWwocm93LmlkKTtcclxuICAgICAgJCgnI3Utc2VydmljZS1uYW1lJykudmFsKHJvdy5ub21icmUpO1xyXG4gICAgICAkKCcjdS1zZXJ2aWNlLWRlc2NyaXB0aW9uJykudmFsKHJvdy5kZXNjcmlwY2lvbik7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtbW9udGhseS1wYXltZW50JykudmFsKE51bWJlcihyb3cubWVuc3VhbGlkYWQucmVwbGFjZShcIlJEJCBcIiwgJycpKSk7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtdHlwZScpLnZhbChyb3cudGlwbyk7XHJcbiAgICAgICQoJyN1cGRhdGUtc2VydmljZS1tb2RhbCcpLm1vZGFsKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tdXBkYXRlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VydmljZXMudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3NlcnZpY2Utc2VhcmNoZXJcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJzZXJ2aWNpb3NcIiwgc2VydmljZVRhYmxlLnJlZnJlc2gsIGluaXRTZXJ2aWNlc0hhbmRsZXJzKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBJbml0IENvbnRyYWN0IEhhbmRsZXJzICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gaW5pdENvbnRyYWN0SGFuZGxlcnMoKSB7XHJcbiAgICBpZihjdXJyZW50UGFnZSA9PSAnY29udHJhdG9zJyl7XHJcbiAgICAgIGNvbnRyYWN0VGFibGUuaW5pdCgpO1xyXG4gICAgICBDb250cmFjdHMuZ2V0QWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb250cmFjdHMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1hZGQtZXh0cmFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb250cmFjdHMuY2FsbEV4dHJhKCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJChcIiNjb250cmFjdC1zZWFyY2hlclwiKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgdGV4dCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgIEdlbmVyYWxzLnNlYXJjaCh0ZXh0LCBcInZfY29udHJhdG9zXCIsIGNvbnRyYWN0VGFibGUucmVmcmVzaCwgbnVsbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1jYW5jZWwtY29udHJhY3QsICNidG4tZGV0YWlsLWNhbmNlbC1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciByb3csIGNhbGxiYWNrIFxyXG4gICAgICBjb25zb2xlLmxvZygnaGVsbG8gd29ybGQnKTtcclxuICAgICAgICBpZihjdXJyZW50UGFnZSA9PSAnY29udHJhdG9zJyl7XHJcbiAgICAgICAgICByb3cgPSBjb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgICAgICBjYWxsYmFjayA9IENvbnRyYWN0cy5nZXRBbGw7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICByb3cgPSBkZXRhaWxzQ29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICAgICAgcm93LmlkID0gcm93LmlkX2NvbnRyYXRvO1xyXG4gICAgICAgICAgcm93LmlkX2NsaWVudGUgPSAkKCcjZGF0YWlsLWNsaWVudC1pZCcpLnZhbCgpO1xyXG4gICAgICAgICAgcm93LmNsaWVudGUgPSAkKCcjZGV0YWlsLWNsaWVudC1uYW1lJykudmFsKCk7XHJcbiAgICAgICAgICBjYWxsYmFjayA9IFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaDtcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgJChcIi5jYW5jZWwtbmFtZVwiKS50ZXh0KHJvdy5jbGllbnRlKTtcclxuICAgICAgICB2YXIgJGlucHV0RWxlbWVudCA9ICQoXCIuY29uZmlybWVkLWRhdGFcIik7XHJcbiAgICAgICAgdmFyICRidXR0b25Ub0FjdGl2ZSA9ICQoXCIjY2FuY2VsLXBlcm1hbmVudGx5XCIpO1xyXG5cclxuICAgICAgICBkZWxldGVWYWxpZGF0aW9uKCRpbnB1dEVsZW1lbnQsIHJvdy5jbGllbnRlLCAkYnV0dG9uVG9BY3RpdmUpO1xyXG4gICAgICAgICQoXCIjY2FuY2VsLXByaW50XCIpLmF0dHIoXCJocmVmXCIsIEJBU0VfVVJMICsgJ3Byb2Nlc3MvZ2V0Y2FuY2VsY29udHJhY3QvJyArIHJvdy5pZCk7XHJcblxyXG4gICAgICAgICQoXCIjY2FuY2VsLWNvbnRyYWN0LW1vZGFsXCIpLm1vZGFsKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGJ1dHRvblRvQWN0aXZlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocm93KVxyXG4gICAgICAgICAgQ29udHJhY3RzLmNhbmNlbChyb3csIGNhbGxiYWNrKVxyXG4gICAgICAgICAgJGJ1dHRvblRvQWN0aXZlLmF0dHIoJ2Rpc2FibGUnKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkaW5wdXRFbGVtZW50LnZhbCgnJyk7XHJcbiAgICAgICAgJCgnI2NhbmNlbC1jb250cmFjdC1tb2RhbCAuYWxlcnQnKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICRidXR0b25Ub0FjdGl2ZS5hdHRyKCdkaXNhYmxlZCcsICcnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFwiRGViZXMgc2VsZWNjaW9uYXIgdW4gY29udHJhdG9cIilcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tc3VzcGVuZC1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciByb3cgPSBjb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIkRlc2VhIFN1c3BlbmRlciBlbCBjb250cmF0byBkZSBcIiArIHJvdy5jbGllbnRlICsgXCIgP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIENvbnRyYWN0cy5zdXNwZW5kKHJvdy5pZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcIkRlYmUgc2VsZWNjaW9uYXIgdW4gY29udHJhdG9cIilcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tdXBkYXRlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gY29udHJhY3RUYWJsZS5nZXRJZCgpO1xyXG4gICAgICBpZiAoaWQpIHtcclxuICAgICAgICBDb250cmFjdHMuZ2V0T25lKGlkLCBDb250cmFjdHMucmVjaWV2ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjc2VsZWN0LWNvbnRyYWN0LXNlY3RvclwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ29udHJhY3RzLmdldElwTGlzdCgpO1xyXG4gICAgfSlcclxuXHJcbiAgICAkKCcjc2VsZWN0LXBheS11bnRpbCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgJHRoaXMgPSAkKCcjc2VsZWN0LXBheS11bnRpbCA6c2VsZWN0ZWQnKTtcclxuICAgICAgdmFyIGNvbnRyYWN0SWQgPSAkdGhpcy5hdHRyKCdkYXRhLWNvbnRyYWN0Jyk7XHJcbiAgICAgIHZhciBsYXN0UGF5bWVudElkID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgUGF5bWVudHMudXBkYXRlVW50aWwoY29udHJhY3RJZCwgbGFzdFBheW1lbnRJZCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgSW5pdCBQYXltZW50cyAgSGFuZGxlcnMgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICBmdW5jdGlvbiBpbml0UGF5bWVudHNIYW5kbGVycygpIHtcclxuICAgIHBheW1lbnRUYWJsZS5pbml0KCk7XHJcbiAgICBleHRyYVRhYmxlLmluaXQoKTtcclxuICAgIGlmICghcmFuKSB7XHJcbiAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgICByYW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLXBheVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBwYXltZW50VGFibGUuZ2V0SWQoKTtcclxuICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgUGF5bWVudHMudXBkYXRlKGlkKTtcclxuICAgICAgICB1cGRhdGVfbW9kZShpZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVE9ETzogTUVTU0FHRSBTZWxlY3QgYSBwYXltZW50XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBQYXltZW50cy5nZXRBbGwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjcGF5bWVudC1kZXRhaWwtYm94XCIpLmNvbGxhcHNlKClcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVfbW9kZShpZCkge1xyXG4gICAgICB2YXIgbW9kZSA9ICQoJy5wYXltZW50LW1vZGUuc2VsZWN0ZWQnKS50ZXh0KCk7XHJcbiAgICAgIHZhciBleHRyYUluZm8gPSB7XHJcbiAgICAgICAgaWQ6IGlkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgbW9kdWxlOiAncGFnb3MnXHJcbiAgICAgIH1cclxuICAgICAgdmFyIGZvcm0gPSAnZGF0YT0nICsgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIHRpcG86IG1vZGVcclxuICAgICAgfSkgKyAnJmV4dHJhX2luZm89JyArIEpTT04uc3RyaW5naWZ5KGV4dHJhSW5mbyk7XHJcblxyXG4gICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAncHJvY2Vzcy9heGlvc3VwZGF0ZScsIGZvcm0pXHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAvL1RPRE86IHNvbWV0aGluZyB3aGl0aCB0aGF0IC8gYWxnbyBjb24gZXN0b1xyXG4gICAgICB9KTtcclxuICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgICBkZXRhaWwgSGFuZGxlcnMgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBkZXRhaWxIYW5kbGVycygpIHtcclxuXHJcbiAgICB2YXIgJGNsaWVudE5hbWUgPSAkKCcjZGV0YWlsLWNsaWVudC1uYW1lJyk7XHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1vYnNlcnZhdGlvbnNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgUGF5bWVudHMuc2F2ZUFib25vcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2J0bi1zYXZlLXJlYWwtb2JzZXJ2YXRpb25zJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2xpZW50cy5zYXZlT2JzZXJ2YXRpb25zKCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGRldGFpbHNDb250cmFjdFRhYmxlLmluaXQoKTtcclxuXHJcbiAgICAkKFwiI2J0bi1kZXRhaWwtc3VzcGVuZC1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciByb3cgPSBkZXRhaWxzQ29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBTdXNwZW5kZXIgZWwgY29udHJhdG8gZGUgXCIgKyAkY2xpZW50TmFtZS52YWwoKSArIFwiID9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybycsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBDb250cmFjdHMuc3VzcGVuZChyb3cuaWRfY29udHJhdG8sIFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcIkRlYmUgc2VsZWNjaW9uYXIgdW4gY29udHJhdG9cIilcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tY2FsbC1yZWNvbm5lY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG4gICAgICB2YXIgcm93ID0gZGV0YWlsc0NvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYocm93KXtcclxuICAgICAgICAkKFwiI3JlY29ubmVjdC1tb2RhbFwiKS5tb2RhbCgpO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBzd2FsKFwiRGViZSBzZWxlY2Npb25hciB1biBjb250cmF0byBwcmltZXJvXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgICQoXCIjYnRuLXJlY29ubmVjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXHJcbiAgICAgIHZhciByb3cgPSBkZXRhaWxzQ29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZihyb3cpe1xyXG4gICAgICAgIENvbnRyYWN0cy5yZWNvbm5lY3Qocm93LmlkX2NvbnRyYXRvLFBheW1lbnRzLmNvbnRyYWN0UmVmcmVzaCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgJCgnI2J0bi1jYWxsLWV4dHJhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgY29udGV4dCA9ICdkZXRhaWxzJztcclxuICAgICAgQ29udHJhY3RzLmNhbGxFeHRyYShjb250ZXh0KTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhY291bnRIYW5kbGVycygpIHtcclxuICAgIHZhciAkdXNlcklkID0gJChcIiNhY291bnQtdXNlci1pZFwiKVxyXG4gICAgdmFyICRjdXJyZW50UGFzc3dvcmQgPSAkKFwiI2Fjb3VudC1jdXJyZW50LXBhc3N3b3JkXCIpXHJcbiAgICB2YXIgJGJ0blVwZGF0ZVVzZXIgPSAkKFwiI3VwZGF0ZS11c2VyLWRhdGFcIik7XHJcbiAgICB2YXIgJG5ld1Bhc3N3b3JkID0gJChcIiNhY291bnQtbmV3LXBhc3N3b3JkXCIpO1xyXG5cclxuICAgICQoXCIjYWNvdW50LWN1cnJlbnQtcGFzc3dvcmRcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgVXNlcnMuY29uZmlybVBhc3N3b3JkKCR1c2VySWQudmFsKCksICRjdXJyZW50UGFzc3dvcmQudmFsKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJGJ0blVwZGF0ZVVzZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBVc2Vycy51cGRhdGVQYXNzd29yZCgkdXNlcklkLnZhbCgpLCAkY3VycmVudFBhc3N3b3JkLnZhbCgpLCAkbmV3UGFzc3dvcmQudmFsKCkpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2VjdGlvbkhhbmRsZXJzKCkge1xyXG4gICAgaWYgKCFyYW4pIHtcclxuICAgICAgU2VjdGlvbnMuaW5pdCgpXHJcbiAgICAgIFNlY3Rpb25zLmdldElwcygpO1xyXG4gICAgICByYW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLWFkZC1zZWN0aW9uXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFNlY3Rpb25zLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNzZWxlY3Qtc2VjdG9yXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBTZWN0aW9ucy5nZXRJcHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICBpbml0Q29tcG9uZW50cygpXHJcbiAgfSk7IiwidmFyIHJhbiA9IGZhbHNlO1xyXG5cclxuZnVuY3Rpb24gbG9naW5IYW5kbGVycygpIHtcclxuXHJcbiAgJChcIiNzZW5kLWNyZWRlbnRpYWxzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgU2Vzc2lvbi5sb2dpbigpO1xyXG4gIH0pO1xyXG5cclxuICAkKFwiI3VzZXItaW5wdXRcIikub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIGxvZ2luTGlicmFyeS5zZW5kVG9Mb2dpbihlKVxyXG4gIH0pXHJcblxyXG4gICQoXCIjcGFzc3dvcmQtaW5wdXRcIikub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIGxvZ2luTGlicmFyeS5zZW5kVG9Mb2dpbihlKVxyXG4gIH0pXHJcblxyXG4gICQoXCJhW2hyZWZdXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGxvZ2luTGlicmFyeS5sb2FkaW5nKCk7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIHRhcmdldCA9ICR0aGlzLmF0dHIoJ3RhcmdldCcpO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLmxvYWRlclwiKS5jc3Moe1xyXG4gICAgICAgICAgZGlzcGxheTogXCJub25lXCJcclxuICAgICAgICB9KTtcclxuICAgICAgfSwgMzAwMClcclxuICAgIH1jYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhyb3cgZXJyb3JcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG52YXIgU2Vzc2lvbiA9IHtcclxuICBsb2dpbjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdXNlciAgICAgPSAkKFwiI3VzZXItaW5wdXRcIikudmFsKCk7XHJcbiAgICB2YXIgcGFzc3dvcmQgPSAkKFwiI3Bhc3N3b3JkLWlucHV0XCIpLnZhbCgpO1xyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbdXNlciwgcGFzc3dvcmRdKVxyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICB2YXIgZm9ybSA9ICd1c2VyPScgKyB1c2VyICsgJyZwYXNzd29yZD0nICsgcGFzc3dvcmQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdhcHAvbG9naW4nLCBmYWxzZSwgZmFsc2UsIFNlc3Npb24ucHJvY2Vzc0xvZ2luRGF0YSwgZm9ybSwgbnVsbCwgbG9naW5MaWJyYXJ5LmxvYWRpbmcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0VSUk9SICsgXCIgTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBpbmRpY2Fkb3MgcGFyYSBpbmdyZXNhclwiKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHByb2Nlc3NMb2dpbkRhdGE6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICBpZiAocmVzcG9uc2UgPT0gdHJ1ZSkge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IEJBU0VfVVJMICsgJ2FwcC9hZG1pbi8nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIlxyXG4gICAgICB9KTtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9JTkZPICsgXCIgVXN1YXJpbyB5IENvbnRyYXNlw7FhIG5vIHZhbGlkb3NcIilcclxuICAgIH1cclxuICB9XHJcbn1cclxudmFyIGxvZ2luTGlicmFyeSA9IHtcclxuICBsb2FkaW5nOiBmdW5jdGlvbihzdG9wKSB7XHJcbiAgICBpZighc3RvcCl7XHJcbiAgICAgICAkKFwiLmxvYWRlclwiKS5jc3Moe1xyXG4gICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIFxyXG4gIHNlbmRUb0xvZ2luOiBmdW5jdGlvbihlKSB7XHJcbiAgICBrZXkgPSBlLndoaWNoXHJcbiAgICBpZiAoa2V5ID09IDEzKSB7XHJcbiAgICAgIFNlc3Npb24ubG9naW4oKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gIGxvZ2luSGFuZGxlcnMoKTtcclxufSkiLCIgIGZ1bmN0aW9uIGlzQ3VycmVudFBhZ2UocGFnZU5hbWUpe1xyXG4gICAgaWYoZ2V0Q3VycmVudFBhZ2UoKSA9PSBwYWdlTmFtZSl7XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9ICBcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRQYWdlKCl7XHJcbiAgICB2YXIgY3VycmVudFBhZ2UgPSAkKFwidGl0bGVcIikudGV4dCgpLnNwbGl0KFwiIFwiKTtcclxuICAgIGN1cnJlbnRQYWdlID0gY3VycmVudFBhZ2VbNF0udG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgICByZXR1cm4gY3VycmVudFBhZ2U7XHJcbiAgfVxyXG5cclxuICBpZihpc0N1cnJlbnRQYWdlKFwiY2llcnJlXCIpIHx8IGlzQ3VycmVudFBhZ2UoXCJjaWVycmUyXCIpKXtcclxuICAgIGNpZXJyZUNhamFGdW5jdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIGlmKGlzQ3VycmVudFBhZ2UoXCJyZXBvcnRlc1wiKSl7XHJcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICAgIHNjcmlwdC5zcmMgPSBCQVNFX1VSTCArIFwiYXNzZXRzL2pzL21pbi9yZXBvcnRlcy5taW4uanM/dmVyc2lvbj00LjAuMjJcIjtcclxuICAgICQoXCJib2R5XCIpLmFwcGVuZChzY3JpcHQpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2llcnJlQ2FqYUZ1bmN0aW9ucygpe1xyXG4gICAgXHJcbiAgICB2YXIgdG90YWxlcyA9IHtcclxuICAgICAgICAgIHRvdGFsMTogMCxcclxuICAgICAgICAgIHRvdGFsNTogMCxcclxuICAgICAgICAgIHRvdGFsMTA6IDAsXHJcbiAgICAgICAgICB0b3RhbDIwOiAwLFxyXG4gICAgICAgICAgdG90YWwyNTogMCxcclxuICAgICAgICAgIHRvdGFsNTA6IDAsXHJcbiAgICAgICAgICB0b3RhbDEwMDogMCxcclxuICAgICAgICAgIHRvdGFsMjAwOiAwLFxyXG4gICAgICAgICAgdG90YWw1MDA6IDAsXHJcbiAgICAgICAgICB0b3RhbDEwMDA6IDAsXHJcbiAgICAgICAgICB0b3RhbDIwMDA6IDBcclxuICAgICAgICB9XHJcblxyXG4gICAgdmFyIGdhc3RvICAgPSB7XHJcbiAgICAgICAgJ2ZlY2hhJzogJycsXHJcbiAgICAgICAgJ2Rlc2NyaXBjaW9uJzogJycsXHJcbiAgICAgICAgJ21vbnRvJzogJycsXHJcbiAgICAgIH1cclxuXHJcbiAgICB2YXIgZ2FzdG9zICA9IFt7ZmVjaGE6IG5vdygpLGRlc2NyaXBjaW9uOlwiaG9sYVwiLG1vbnRvOiAyMDAwLCBpZF9nYXN0bzogMX1dXHJcbiAgICB2YXIgYXV0b3IgICA9ICQoJyNhdXRvci1jaWVycmUnKS50ZXh0KCkudHJpbSgpXHJcblxyXG4gICAgdmFyIGFwcENpZXJyZSA9IG5ldyBWdWUoe1xyXG4gICAgICBlbDogJyNhcHAtY2llcnJlJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGlzSGlkZTogZmFsc2UsXHJcbiAgICAgICAgZmVjaGE6IG5vdygpLFxyXG4gICAgICAgIGRhdGFfY2llcnJlOntcclxuICAgICAgICAgIGF1dG9yOiBhdXRvcixcclxuICAgICAgICAgIHBhZ29zX2ZhY3R1cmFzOiAwLFxyXG4gICAgICAgICAgcGFnb3NfZXh0cmFzOiAwLFxyXG4gICAgICAgICAgcGFnb3NfZWZlY3Rpdm86IDAsXHJcbiAgICAgICAgICBwYWdvc19iYW5jbzogMCxcclxuICAgICAgICAgIHRvdGFsX2luZ3Jlc29zOiAwLFxyXG4gICAgICAgICAgZWZlY3Rpdm9fY2FqYTogMCxcclxuICAgICAgICAgIHRvdGFsX2Rlc2N1YWRyZTogMCxcclxuICAgICAgICAgIHRvdGFsX2dhc3RvczogMCxcclxuICAgICAgICAgIGJhbmNvOiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250ZW86dG90YWxlcyxcclxuICAgICAgICBzdW1hOiAwLFxyXG4gICAgICAgIGdhc3RvOiBnYXN0byxcclxuICAgICAgICBnYXN0b3M6IGdhc3Rvc1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgbW91bnRlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5nZXRHYXN0b3MoKTtcclxuICAgICAgICB0aGlzLnNldEluZ3Jlc29zKCk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBjcmVhdGVkOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJy53aWxsLWxvYWQnKS5jc3Moe3Zpc2liaWxpdHk6XCJ2aXNpYmxlXCJ9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgIGN1cnJlbmN5Rm9ybWF0OiBmdW5jdGlvbihudW1iZXIpe1xyXG4gICAgICAgICAgcmV0dXJuIEN1cnJlbmN5Rm9ybWF0KG51bWJlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgbWV0aG9kczp7XHJcbiAgICAgICAgY2hhbmdlVG90YWw6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgdmFyIHVuaXQgPSBlLnNyY0VsZW1lbnQuYXR0cmlidXRlc1snZGF0YS11bml0J10udmFsdWVcclxuICAgICAgICAgIHZhciBjYW50aWRhZCA9IGUuc3JjRWxlbWVudC52YWx1ZVxyXG4gICAgICAgICAgdmFyIHRvdGFsID0gY2FudGlkYWQgKiB1bml0XHJcbiAgICAgICAgICB0b3RhbGVzWyd0b3RhbCcrIHVuaXRdID0gY2FudGlkYWQgKiB1bml0ICogMS4wMCAgICBcclxuICAgICAgICB9LCBcclxuXHJcbiAgICAgICAgYWRkR2FzdG86IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIHZhciBnYXN0byA9IHRoaXMuZ2FzdG87XHJcbiAgICAgICAgICBnYXN0by5mZWNoYSA9IG5vdygpO1xyXG4gICAgICAgICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGdhc3RvKTtcclxuICAgICAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnY2FqYS9hZGRfZ2FzdG8nLGZvcm0pXHJcbiAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKVxyXG4gICAgICAgICAgICBhcHBDaWVycmUuZmlsbEdhc3RvcyhkYXRhLmdhc3RvcyxcIm5vcm1hbFwiKVxyXG4gICAgICAgICAgICBhcHBDaWVycmUuc2V0R2FzdG9Ub3RhbChkYXRhLnRvdGFsX2dhc3RvcylcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmaWxsR2FzdG9zOiBmdW5jdGlvbihnYXN0b3Nfc2Vydmlkb3IsbW9kZSl7XHJcbiAgICAgICAgICBpZihtb2RlID09IFwiZ3JvdXBcIil7XHJcbiAgICAgICAgICAgIGlmKGdhc3Rvc19zZXJ2aWRvciAhPSBudWxsIHx8IGdhc3Rvc19zZXJ2aWRvci5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhbZ2FzdG9zX3NlcnZpZG9yXSk7XHJcbiAgICAgICAgICAgICAgYXBwQ2llcnJlLmdhc3RvcyA9IGdhc3Rvc19zZXJ2aWRvcjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgYXBwQ2llcnJlLmdhc3RvcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYXBwQ2llcnJlLmdhc3Rvcy5wdXNoKEpTT04ucGFyc2UoZ2FzdG9zX3NlcnZpZG9yKVswXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0R2FzdG9Ub3RhbDogZnVuY3Rpb24odG90YWxHYXN0b3Mpe1xyXG4gICAgICAgICAgdGhpcy5kYXRhX2NpZXJyZS50b3RhbF9nYXN0b3MgPSB0b3RhbEdhc3Rvc1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldEdhc3RvOiBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIHZhciBnYXN0byA9IHRoaXMuZ2FzdG87XHJcbiAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZ2FzdG8pO1xyXG4gICAgICAgICAgY29ubmVjdEFuZFNlbmQoJ2NhamEvZ2V0X2dhc3RvJyxmYWxzZSxudWxsLGFwcENpZXJyZS5maWxsR2FzdG9zLGZvcm0sbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVsZXRlR2FzdG86IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICB2YXIgY2FsbGVyID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICBpZihjYWxsZXIubG9jYWxuYW1lID09IFwiaVwiKXtcclxuICAgICAgICAgICAgY2FsbGVyID0gY2FsbGVyLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgaWQgPSBjYWxsZXIuYXR0cmlidXRlc1snZGF0YS1pZCddLnZhbHVlXHJcbiAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgICAgdGV4dDogXCJTZWd1cm8gZGUgcXVlIHF1aWVyZSBlbGltaW5hciBlc3RlIGdhc3RvP1wiLFxyXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KHtpZDogaWQsIGZlY2hhOm5vdygpfSlcclxuICAgICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2NhamEvZGVsZXRlX2dhc3RvJyxmb3JtKVxyXG4gICAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSlcclxuICAgICAgICAgICAgICBhcHBDaWVycmUuZmlsbEdhc3RvcyhkYXRhLmdhc3RvcyxcImdyb3VwXCIpXHJcbiAgICAgICAgICAgICAgYXBwQ2llcnJlLnNldEdhc3RvVG90YWwoZGF0YS50b3RhbF9nYXN0b3MpIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pOyAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldEdhc3RvczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciBkYXRhID0ge2ZlY2hhOiBub3coKX1cclxuICAgICAgICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShkYXRhKVxyXG4gICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdjYWphL2dldF9nYXN0b3MnLGZvcm0pXHJcbiAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKVxyXG4gICAgICAgICAgICBhcHBDaWVycmUuZmlsbEdhc3RvcyhkYXRhLmdhc3RvcyxcImdyb3VwXCIpXHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5zZXRHYXN0b1RvdGFsKGRhdGEudG90YWxfZ2FzdG9zKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0SW5ncmVzb3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgZm9ybSA9ICdkYXRhPScgKyBKU09OLnN0cmluZ2lmeSh7ZmVjaGE6IG5vdygpfSlcclxuICAgICAgICAgIHZhciBzZWxmID0gdGhpcy5kYXRhX2NpZXJyZTtcclxuICAgICAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnY2FqYS9nZXRfaW5ncmVzb3MnLGZvcm0pXHJcbiAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgc2VsZi5wYWdvc19mYWN0dXJhcyA9IGRhdGEucGFnb3NfZmFjdHVyYXM7XHJcbiAgICAgICAgICAgIHNlbGYucGFnb3NfZXh0cmFzID0gZGF0YS5wYWdvc19leHRyYXM7XHJcbiAgICAgICAgICAgIHNlbGYucGFnb3NfZWZlY3Rpdm8gPSBkYXRhLnBhZ29zX2VmZWN0aXZvO1xyXG4gICAgICAgICAgICBzZWxmLnBhZ29zX2JhbmNvID0gZGF0YS5wYWdvc19iYW5jbztcclxuICAgICAgICAgICAgc2VsZi50b3RhbF9pbmdyZXNvcyA9IHBhcnNlRmxvYXQoZGF0YS5wYWdvc19mYWN0dXJhcykgKyBwYXJzZUZsb2F0KHNlbGYucGFnb3NfZXh0cmFzKTtcclxuICAgICAgICAgICAgc2VsZi50b3RhbF9kZXNjdWFkcmUgPSAtIHNlbGYucGFnb3NfZWZlY3Rpdm8gKyBzZWxmLmVmZWN0aXZvX2NhamE7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjZXJyYXJDYWphOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHNlbGYgICA9IHRoaXM7XHJcbiAgICAgICAgICB2YXIgY2llcnJlID0gdGhpcy5kYXRhX2NpZXJyZTtcclxuICAgICAgICAgIHdpbmRvdy5jaWVycmUgPSBjaWVycmU7XHJcbiAgICAgICAgICBpZihjaWVycmUudG90YWxfZGVzY3VhZHJlICE9IDApe1xyXG4gICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgICAgIHRleHQ6IFwiSGF5IHVuIGRlc2N1YWRyZSBlbiBsYSBjYWphLCBxdWllcmUgaGFjZXIgZWwgY2llcnJlIGRlIHRvZG9zIG1vZG9zP1wiLFxyXG4gICAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnU2knLFxyXG4gICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdObydcclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIHNlbGYuY2VycmFyKGNpZXJyZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzZWxmLmNlcnJhcihjaWVycmUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNlcnJhcjogZnVuY3Rpb24oY2llcnJlKXtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgY2llcnJlLmZlY2hhID0gbm93KCk7XHJcbiAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoY2llcnJlKTtcclxuICAgICAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnY2FqYS9hZGRfY2llcnJlJyxmb3JtKVxyXG4gICAgICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhXHJcbiAgICAgICAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSlcclxuICAgICAgICAgICAgc2VsZi5pc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBhcHBTdW1tYXJ5Vmlldy5pc0hpZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYXBwU3VtbWFyeVZpZXcuY2llcnJlID0gY2llcnJlO1xyXG4gICAgICAgICAgICAkKFwiI2FwcC1jaWVycmVcIikuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgJChcIi50b3AtbmF2XCIpLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICQoXCIjcHJpbnQtdmlld1wiKS5jc3Moe3Zpc2liaWxpdHk6IFwidmlzaWJsZVwifSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgY29tcHV0ZWQ6e1xyXG4gICAgICAgIGdldFRvdGFsOiBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIHZhciB0ID0gdG90YWxlcztcclxuICAgICAgICAgIHZhciBzZWxmID0gdGhpcy5kYXRhX2NpZXJyZTtcclxuICAgICAgICAgIHZhciBzdW1hID0gc3VtYXIoW3QudG90YWwxLHQudG90YWw1LHQudG90YWwxMCwgdC50b3RhbDIwLCB0LnRvdGFsMjUsIHQudG90YWw1MCwgdC50b3RhbDEwMCwgdC50b3RhbDIwMCwgdC50b3RhbDUwMCwgdC50b3RhbDEwMDAsIHQudG90YWwyMDAwXSk7XHJcbiAgICAgICAgICB0aGlzLnN1bWEgPSBzdW1hO1xyXG4gICAgICAgICAgc2VsZi5lZmVjdGl2b19jYWphID0gc3VtYS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgc2VsZi50b3RhbF9kZXNjdWFkcmUgPSBwYXJzZUZsb2F0KC1zZWxmLnBhZ29zX2VmZWN0aXZvKSArIHBhcnNlRmxvYXQoc2VsZi5lZmVjdGl2b19jYWphKTtcclxuICAgICAgICAgIHNlbGYuYmFuY28gPSBwYXJzZUZsb2F0KHNlbGYucGFnb3NfYmFuY28pICsgcGFyc2VGbG9hdChzZWxmLnBhZ29zX2VmZWN0aXZvKSAtIHBhcnNlRmxvYXQoc2VsZi50b3RhbF9nYXN0b3MpICsgcGFyc2VGbG9hdChzZWxmLnRvdGFsX2Rlc2N1YWRyZSlcclxuICAgICAgICAgIHJldHVybiB0aGlzLnN1bWE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVjaW1hbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgZmllbGRzID0gW1wicGFnb3NfZmFjdHVyYXNcIixcInBhZ29zX2V4dHJhXCIsXCJwYWdvc19lZmVjdGl2b1wiLFwicGFnb3NfYmFuY29cIixcInRvdGFsX2luZ3Jlc29zXCIsXCJlZmVjdGl2b19jYWphXCIsXCJ0b3RhbF9kZXNjdWFkcmVcIixcInRvdGFsX2dhc3RvXCIsXCJiYW5jb1wiXTtcclxuICAgICAgICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YV9jaWVycmVbZmllbGRdID0gdGhpcy5kYXRhX2NpZXJyZVtmaWVsZF0udG9GaXhlZCgyKVxyXG4gICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHdpbmRvdy5hcHBDaWVycmUgPSBhcHBDaWVycmU7XHJcbiAgICBmdW5jdGlvbiBzdW1hciAodmFsb3Jlcyl7XHJcbiAgICAgIHZhciBzdW1hID0gMDtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWxvcmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc3VtYSArPSBwYXJzZUZsb2F0KHZhbG9yZXNbaV0pOyBcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3VtYTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBub3coKXtcclxuICAgICAgcmV0dXJuIG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBWdWUuY29tcG9uZW50KCdzdW1tYXJ5LXByaW50LXZpZXcnLHtcclxuICAgIHRlbXBsYXRlOiAnXFxcclxuICAgIDxkaXYgY2xhc3M9XCJwcmludC1jb250YWluZXJcIj5cXFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiX19oZWFkZXJcIj5cXFxyXG4gICAgICA8aDIgY2xhc3M9XCJfX3RpdGxlIHQtY2VudGVyXCI+IHt7dGl0bGV9fTwvaDI+XFxcclxuICAgICAgPC9kaXY+XFxcclxuICAgICAgPGRpdiBjbGFzcz1cIl9fYm9keVwiPlxcXHJcbiAgICAgIDxwcmludGVhYmxlPjwvcHJpbnRlYWJsZT5cXFxyXG4gICAgICA8L2Rpdj5cXFxyXG4gICAgPGRpdj5cXFxyXG4gICAgXFxcclxuICAgICcsXHJcbiAgICBwcm9wczpbJ3NvbWV2YWx1ZSddLFxyXG4gICAgbWV0aG9kczp7XHJcbiAgICAgIGdvQmFjazogZnVuY3Rpb24oKXtcclxuICAgICAgICBhcHBTdW1tYXJ5Vmlldy5pc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgIHdpbmRvdy5hcHBDaWVycmUuaXNIaWRlID0gZmFsc2U7XHJcbiAgICAgICAgc2VsZi5pc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgICQoXCIudG9wLW5hdlwiKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICQoXCIjYXBwLWNpZXJyZVwiKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGF0YTogZnVuY3Rpb24oKXtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBiYWNrOiB7bGluazpcInNvbWVsaW5rXCIsdGV4dDpcInZvbHZlciBhIGNpZXJyZVwifSxcclxuICAgICAgICBmb3dhcmQ6IHtsaW5rOiBCQVNFX1VSTCArIFwiYXBwL2xvZ291dFwiLHRleHQ6XCJjZXJyYXIgc2Vzc2lvblwifSxcclxuICAgICAgICB0aXRsZTpcIlJlc3VtZW4gZGUgY2llcnJlIGRlIGhveVwiLFxyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIHZhciBhcHBTdW1tYXJ5VmlldyA9IG5ldyBWdWUoe1xyXG4gICAgZWw6IFwiI3ByaW50LXZpZXdcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgaXNIaWRlOiB0cnVlLFxyXG4gICAgICBiYWNrOiB7bGluazpcInNvbWVsaW5rXCIsdGV4dDpcInZvbHZlciBhIGNpZXJyZVwifSxcclxuICAgICAgZm93YXJkOiB7bGluazogQkFTRV9VUkwgKyBcImFwcC9sb2dvdXRcIix0ZXh0OlwiY2VycmFyIHNlc3Npb25cIn0sXHJcbiAgICAgIGNpZXJyZTp7XHJcbiAgICAgICAgICBhdXRvcjogJycsXHJcbiAgICAgICAgICBwYWdvc19mYWN0dXJhczogMCxcclxuICAgICAgICAgIHBhZ29zX2V4dHJhczogMCxcclxuICAgICAgICAgIHBhZ29zX2VmZWN0aXZvOiAwLFxyXG4gICAgICAgICAgcGFnb3NfYmFuY286IDAsXHJcbiAgICAgICAgICB0b3RhbF9pbmdyZXNvczogMCxcclxuICAgICAgICAgIGVmZWN0aXZvX2NhamE6IDAsXHJcbiAgICAgICAgICB0b3RhbF9kZXNjdWFkcmU6IDAsXHJcbiAgICAgICAgICB0b3RhbF9nYXN0b3M6IDAsXHJcbiAgICAgICAgICBiYW5jbzogMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBmaWx0ZXJzOiB7XHJcbiAgICAgIGN1cnJlbmN5Rm9ybWF0OiBmdW5jdGlvbihudW1iZXIpe1xyXG4gICAgICAgIHJldHVybiBcIlJEJCBcIisgQ3VycmVuY3lGb3JtYXQobnVtYmVyKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIHNwYW5pc2hEYXRlRm9ybWF0OiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICBtb21lbnQubG9jYWxlKCdlcy1ETycpO1xyXG4gICAgICAgIHJldHVybiBtb21lbnQoZGF0ZSkuZm9ybWF0KCdkZGRkIEREIFtkZV0gTU1NTSBbZGVsXSBZWVlZJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6e1xyXG4gICAgICBnb0JhY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYXBwU3VtbWFyeVZpZXcuaXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICB3aW5kb3cuYXBwQ2llcnJlLmlzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuaXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICAkKFwiLnRvcC1uYXZcIikucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAkKFwiI2FwcC1jaWVycmVcIikucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgfSxcclxuICAgICAgcHJpbnQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcHJpbnQoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSkiLCJ2YXIgbGlzdEV4dHJhcyA9ICcnO1xyXG52YXIgcmVjaWJvUmVzZXQgPSB7XHJcbiAgaWRfcGFnbzogMCxcclxuICBpZF9jb250cmF0bzogMCxcclxuICBpZF9zZXJ2aWNpbzogMCxcclxuICBpZF9lbXBsZWFkbzogMCxcclxuICBmZWNoYV9wYWdvIDogJycsXHJcbiAgY29uY2VwdG8gOiAnZXh0cmEnLFxyXG4gIGRldGFsbGVzX2V4dHJhIDogJycsXHJcbiAgY3VvdGE6ICcnLFxyXG4gIG1vcmEgOiAnJyxcclxuICBtb250b19leHRyYTogJycsXHJcbiAgdG90YWw6ICcnLFxyXG4gIGVzdGFkbzogJycsXHJcbiAgZmVjaGFfbGltaXRlOiAnJyxcclxuICBjb21wbGV0ZV9kYXRlIDogJycsXHJcbiAgZGVzY3VlbnRvOiAnJyxcclxuICByYXpvbl9kZXNjdWVudG86ICcnLFxyXG4gIGRldWRhOiAnJyxcclxuICBhYm9ub19hOiAnJyxcclxuICB0aXBvOiAnJyxcclxuICBnZW5lcmFkbzogJydcclxufVxyXG5cclxudmFyIGFwcFBhZ29FeHRyYSA9IG5ldyBWdWUoe1xyXG4gIGVsOiBcIiNhcHAtcGFnby1leHRyYVwiLFxyXG4gIGRhdGE6IHtcclxuICAgIHJlY2libzp7XHJcbiAgICAgICBpZF9wYWdvOiAwLFxyXG4gICAgICAgaWRfY29udHJhdG86IDAsXHJcbiAgICAgICBpZF9zZXJ2aWNpbzogMCxcclxuICAgICAgIGlkX2VtcGxlYWRvOiAwLFxyXG4gICAgICAgZmVjaGFfcGFnbyA6ICdkZC9tbS95eXl5JyxcclxuICAgICAgIGNvbmNlcHRvIDogJ2V4dHJhJyxcclxuICAgICAgIGRldGFsbGVzX2V4dHJhIDogJycsXHJcbiAgICAgICBjdW90YTogJycsXHJcbiAgICAgICBtb3JhIDogJycsXHJcbiAgICAgICBtb250b19leHRyYTogJycsXHJcbiAgICAgICB0b3RhbDogJycsXHJcbiAgICAgICBlc3RhZG86ICcnLFxyXG4gICAgICAgZmVjaGFfbGltaXRlOiAnJyxcclxuICAgICAgIGNvbXBsZXRlX2RhdGUgOiAnJyxcclxuICAgICAgIGRlc2N1ZW50bzogJycsXHJcbiAgICAgICByYXpvbl9kZXNjdWVudG86ICcnLFxyXG4gICAgICAgZGV1ZGE6ICcnLFxyXG4gICAgICAgYWJvbm9fYTogJycsXHJcbiAgICAgICB0aXBvOiAnJyxcclxuICAgICAgIGdlbmVyYWRvOiAnJ1xyXG4gICAgfSxcclxuXHJcbiAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgIGV4dHJhOntcclxuICAgICAgXCJjb250cm9sc1wiOiAnJyxcclxuICAgICAgXCJpZF9leHRyYVwiOiAnJyxcclxuICAgICAgXCJpZF9zZXJ2aWNpb1wiOiAnJyxcclxuICAgICAgXCJjaGVja2JveFwiOiAnJyxcclxuICAgICAgXCJmZWNoYVwiOiAnJyxcclxuICAgICAgXCJjb25jZXB0b1wiOiAnJyxcclxuICAgICAgXCJ1bHRpbW9fcGFnb1wiOiAnJyxcclxuICAgICAgXCJtb250b19wYWdhZG9cIjogJycsXHJcbiAgICAgIFwibW9udG9fdG90YWxcIjogJycsXHJcbiAgICAgIFwiZXN0YWRvXCI6ICcnXHJcbiAgICB9LFxyXG4gICAgZmlyc3RDb250cm9sczoge1xyXG4gICAgICBoaWRlOiBmYWxzZVxyXG4gICAgfSxcclxuICB9LFxyXG4gIGZpbHRlcnM6IHtcclxuXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgdXJsX3JlY2libzogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gQkFTRV9VUkwgKyAncHJvY2Vzcy9nZXRyZWNpYm8vJyArIHRoaXMucmVjaWJvLmlkX3BhZ287XHJcbiAgICB9LFxyXG5cclxuICAgIGhpZGVfcmVjaWJvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmKHRoaXMucmVjaWJvLmVzdGFkbyA9PSBcInBhZ2Fkb1wiKXtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICAgcmV0dXJuIHRoaXMuaGlkZV9yZWNpYm8gPSB0cnVlO1xyXG4gICAgICBcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBtZXRob2RzOntcclxuXHJcbiAgICBnb0JhY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZXh0cmFUYWJsZS5lbC5wYXJlbnRzKFwiLmJvb3RzdHJhcC10YWJsZVwiKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlXHJcbiAgICAgIHRoaXMuZXh0cmEgPSB7Y29uY2VwdG86ICcnfVxyXG4gICAgICBleHRyYVRhYmxlLnJlZnJlc2gobGlzdEV4dHJhcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdlbmVyYXRlUGF5bWVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgZm9ybSA9ICdkYXRhPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmV4dHJhKTtcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdleHRyYS9nZW5lcmF0ZV9leHRyYV9wYXltZW50Jyxmb3JtKTtcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpO1xyXG4gICAgICAgIHNlbGVjdEV4dHJhUGF5bWVudC5odG1sKGRhdGEucGFnb3MpLmNoYW5nZSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIFxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRQYXltZW50OiBmdW5jdGlvbiAoaWRfcGFnbykge1xyXG4gICAgICB2YXIgZm9ybSA9IFwiZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KHtpZF9wYWdvOiBpZF9wYWdvfSk7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoIEJBU0VfVVJMICsgJ2V4dHJhL2dldF9wYXltZW50Jyxmb3JtKTtcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YSBcclxuICAgICAgICBpZihkYXRhLnJlY2libyl7XHJcbiAgICAgICAgICBzZWxmLnJlY2libyA9IGRhdGEucmVjaWJvXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhcHBseVBheW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIHZhciByZWNpYm8gPSB0aGlzLnJlY2lib1xyXG4gICAgICB2YXIgaW5mbyA9IHtcclxuICAgICAgICBpZF9leHRyYTogcmVjaWJvLmlkX2V4dHJhLFxyXG4gICAgICAgIGlkX3BhZ286IHJlY2liby5pZF9wYWdvXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgIGNvbmNlcHRvOiAnZXh0cmEgLScsIFxyXG4gICAgICAgIGRldGFsbGVzX2V4dHJhOiByZWNpYm8uZGV0YWxsZXNfZXh0cmEsXHJcbiAgICAgICAgZmVjaGFfcGFnbzogcmVjaWJvLmZlY2hhX3BhZ28sXHJcbiAgICAgICAgY3VvdGE6IHJlY2liby5jdW90YSxcclxuICAgICAgICB0b3RhbDogcmVjaWJvLmN1b3RhLFxyXG4gICAgICAgIGVzdGFkbzogJ3BhZ2FkbycsXHJcbiAgICAgICAgdGlwbzogcmVjaWJvLnRpcG8sXHJcbiAgICAgICAgZ2VuZXJhZG86IHRydWVcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShkYXRhKSArICcmaW5mbz0nKyBKU09OLnN0cmluZ2lmeShpbmZvKVxyXG4gICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAnZXh0cmEvYXBwbHlfcGF5bWVudCcsZm9ybSlcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgbGlzdEV4dHJhcyA9IGRhdGEuZXh0cmFzO1xyXG4gICAgICAgIHNlbGYuZ2V0UGF5bWVudHMoc2VsZi5leHRyYS5pZF9leHRyYSk7XHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgfSlcclxuICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgZ2V0UGF5bWVudHM6IGZ1bmN0aW9uIChpZF9leHRyYSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgIHZhciBmb3JtID0gXCJkYXRhPVwiKyBKU09OLnN0cmluZ2lmeSh7aWRfZXh0cmE6IGlkX2V4dHJhfSlcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2V4dHJhL2dldF9leHRyYV9wYXltZW50X29mJywgZm9ybSlcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICBpZighZGF0YS5wYWdvcyl7XHJcbiAgICAgICAgICBzZWxmLnJlY2libyA9IHJlY2lib1Jlc2V0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGVjdEV4dHJhUGF5bWVudC5odG1sKGRhdGEucGFnb3MpLmNoYW5nZSgpXHJcblxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVQYXltZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgdmFyIHJlY2libyA9IHRoaXMucmVjaWJvXHJcbiAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICdpZF9leHRyYSc6IHJlY2liby5pZF9leHRyYSxcclxuICAgICAgICAnaWRfcGFnbyc6IHJlY2liby5pZF9wYWdvXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2V4dHJhL2RlbGV0ZV9wYXltZW50Jyxmb3JtKVxyXG4gICAgICBzZW5kLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpO1xyXG4gICAgICAgIHNlbGYuZ2V0UGF5bWVudHMoc2VsZi5leHRyYS5pZF9leHRyYSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG59KTtcclxuXHJcbmJ1cy4kb24oJ3Jvdy1zZWxlY3RlZCcsZnVuY3Rpb24gKHJvdykge1xyXG4gIGV4dHJhVGFibGUuZWwucGFyZW50cyhcIi5ib290c3RyYXAtdGFibGVcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gIGFwcFBhZ29FeHRyYS52aXNpYmxlID0gdHJ1ZVxyXG4gIGFwcFBhZ29FeHRyYS5leHRyYSA9IHJvd1xyXG4gIGxpc3RFeHRyYXMgPSBleHRyYVRhYmxlLmVsLmZpbmQoJ3Rib2R5JykuaHRtbCgpO1xyXG4gIGFwcFBhZ29FeHRyYS5nZXRQYXltZW50cyhyb3cuaWRfZXh0cmEpO1xyXG59KVxyXG5cclxudmFyIHNlbGVjdEV4dHJhUGF5bWVudCA9ICQoXCIjc2VsZWN0LWV4dHJhLXBheW1lbnRcIik7XHJcbnNlbGVjdEV4dHJhUGF5bWVudC5vbignY2hhbmdlJyxmdW5jdGlvbigpe1xyXG4gIHZhciBpZF9wYWdvID0gc2VsZWN0RXh0cmFQYXltZW50LnZhbCgpXHJcbiAgYXBwUGFnb0V4dHJhLmdldFBheW1lbnQoaWRfcGFnbylcclxufSkiLCIvKiEgQWRtaW5MVEUgYXBwLmpzXG4qID09PT09PT09PT09PT09PT1cbiogTWFpbiBKUyBhcHBsaWNhdGlvbiBmaWxlIGZvciBBZG1pbkxURSB2Mi4gVGhpcyBmaWxlXG4qIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBhbGwgcGFnZXMuIEl0IGNvbnRyb2xzIHNvbWUgbGF5b3V0XG4qIG9wdGlvbnMgYW5kIGltcGxlbWVudHMgZXhjbHVzaXZlIEFkbWluTFRFIHBsdWdpbnMuXG4qXG4qIEBBdXRob3IgIEFsbXNhZWVkIFN0dWRpb1xuKiBAU3VwcG9ydCA8aHR0cHM6Ly93d3cuYWxtc2FlZWRzdHVkaW8uY29tPlxuKiBARW1haWwgICA8YWJkdWxsYWhAYWxtc2FlZWRzdHVkaW8uY29tPlxuKiBAdmVyc2lvbiAyLjQuMFxuKiBAcmVwb3NpdG9yeSBnaXQ6Ly9naXRodWIuY29tL2FsbWFzYWVlZDIwMTAvQWRtaW5MVEUuZ2l0XG4qIEBsaWNlbnNlIE1JVCA8aHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVD5cbiovXG5pZihcInVuZGVmaW5lZFwiPT10eXBlb2YgalF1ZXJ5KXRocm93IG5ldyBFcnJvcihcIkFkbWluTFRFIHJlcXVpcmVzIGpRdWVyeVwiKTsrZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9YSh0aGlzKSxmPWUuZGF0YShjKTtpZighZil7dmFyIGg9YS5leHRlbmQoe30sZCxlLmRhdGEoKSxcIm9iamVjdFwiPT10eXBlb2YgYiYmYik7ZS5kYXRhKGMsZj1uZXcgZyhoKSl9aWYoXCJzdHJpbmdcIj09dHlwZW9mIGIpe2lmKHZvaWQgMD09PWZbYl0pdGhyb3cgbmV3IEVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFwiK2IpO2ZbYl0oKX19KX12YXIgYz1cImx0ZS5sYXlvdXRcIixkPXtzbGltc2Nyb2xsOiEwLHJlc2V0SGVpZ2h0OiEwfSxlPXt3cmFwcGVyOlwiLndyYXBwZXJcIixjb250ZW50V3JhcHBlcjpcIi5jb250ZW50LXdyYXBwZXJcIixsYXlvdXRCb3hlZDpcIi5sYXlvdXQtYm94ZWRcIixtYWluRm9vdGVyOlwiLm1haW4tZm9vdGVyXCIsbWFpbkhlYWRlcjpcIi5tYWluLWhlYWRlclwiLHNpZGViYXI6XCIuc2lkZWJhclwiLGNvbnRyb2xTaWRlYmFyOlwiLmNvbnRyb2wtc2lkZWJhclwiLGZpeGVkOlwiLmZpeGVkXCIsc2lkZWJhck1lbnU6XCIuc2lkZWJhci1tZW51XCIsbG9nbzpcIi5tYWluLWhlYWRlciAubG9nb1wifSxmPXtmaXhlZDpcImZpeGVkXCIsaG9sZFRyYW5zaXRpb246XCJob2xkLXRyYW5zaXRpb25cIn0sZz1mdW5jdGlvbihhKXt0aGlzLm9wdGlvbnM9YSx0aGlzLmJpbmRlZFJlc2l6ZT0hMSx0aGlzLmFjdGl2YXRlKCl9O2cucHJvdG90eXBlLmFjdGl2YXRlPWZ1bmN0aW9uKCl7dGhpcy5maXgoKSx0aGlzLmZpeFNpZGViYXIoKSxhKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhmLmhvbGRUcmFuc2l0aW9uKSx0aGlzLm9wdGlvbnMucmVzZXRIZWlnaHQmJmEoXCJib2R5LCBodG1sLCBcIitlLndyYXBwZXIpLmNzcyh7aGVpZ2h0OlwiYXV0b1wiLFwibWluLWhlaWdodFwiOlwiMTAwJVwifSksdGhpcy5iaW5kZWRSZXNpemV8fChhKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7dGhpcy5maXgoKSx0aGlzLmZpeFNpZGViYXIoKSxhKGUubG9nbytcIiwgXCIrZS5zaWRlYmFyKS5vbmUoXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIsZnVuY3Rpb24oKXt0aGlzLmZpeCgpLHRoaXMuZml4U2lkZWJhcigpfS5iaW5kKHRoaXMpKX0uYmluZCh0aGlzKSksdGhpcy5iaW5kZWRSZXNpemU9ITApLGEoZS5zaWRlYmFyTWVudSkub24oXCJleHBhbmRlZC50cmVlXCIsZnVuY3Rpb24oKXt0aGlzLmZpeCgpLHRoaXMuZml4U2lkZWJhcigpfS5iaW5kKHRoaXMpKSxhKGUuc2lkZWJhck1lbnUpLm9uKFwiY29sbGFwc2VkLnRyZWVcIixmdW5jdGlvbigpe3RoaXMuZml4KCksdGhpcy5maXhTaWRlYmFyKCl9LmJpbmQodGhpcykpfSxnLnByb3RvdHlwZS5maXg9ZnVuY3Rpb24oKXthKGUubGF5b3V0Qm94ZWQrXCIgPiBcIitlLndyYXBwZXIpLmNzcyhcIm92ZXJmbG93XCIsXCJoaWRkZW5cIik7dmFyIGI9YShlLm1haW5Gb290ZXIpLm91dGVySGVpZ2h0KCl8fDAsYz1hKGUubWFpbkhlYWRlcikub3V0ZXJIZWlnaHQoKStiLGQ9YSh3aW5kb3cpLmhlaWdodCgpLGc9YShlLnNpZGViYXIpLmhlaWdodCgpfHwwO2lmKGEoXCJib2R5XCIpLmhhc0NsYXNzKGYuZml4ZWQpKWEoZS5jb250ZW50V3JhcHBlcikuY3NzKFwibWluLWhlaWdodFwiLGQtYik7ZWxzZXt2YXIgaDtkPj1nPyhhKGUuY29udGVudFdyYXBwZXIpLmNzcyhcIm1pbi1oZWlnaHRcIixkLWMpLGg9ZC1jKTooYShlLmNvbnRlbnRXcmFwcGVyKS5jc3MoXCJtaW4taGVpZ2h0XCIsZyksaD1nKTt2YXIgaT1hKGUuY29udHJvbFNpZGViYXIpO3ZvaWQgMCE9PWkmJmkuaGVpZ2h0KCk+aCYmYShlLmNvbnRlbnRXcmFwcGVyKS5jc3MoXCJtaW4taGVpZ2h0XCIsaS5oZWlnaHQoKSl9fSxnLnByb3RvdHlwZS5maXhTaWRlYmFyPWZ1bmN0aW9uKCl7aWYoIWEoXCJib2R5XCIpLmhhc0NsYXNzKGYuZml4ZWQpKXJldHVybiB2b2lkKHZvaWQgMCE9PWEuZm4uc2xpbVNjcm9sbCYmYShlLnNpZGViYXIpLnNsaW1TY3JvbGwoe2Rlc3Ryb3k6ITB9KS5oZWlnaHQoXCJhdXRvXCIpKTt0aGlzLm9wdGlvbnMuc2xpbXNjcm9sbCYmdm9pZCAwIT09YS5mbi5zbGltU2Nyb2xsJiYoYShlLnNpZGViYXIpLnNsaW1TY3JvbGwoe2Rlc3Ryb3k6ITB9KS5oZWlnaHQoXCJhdXRvXCIpLGEoZS5zaWRlYmFyKS5zbGltU2Nyb2xsKHtoZWlnaHQ6YSh3aW5kb3cpLmhlaWdodCgpLWEoZS5tYWluSGVhZGVyKS5oZWlnaHQoKStcInB4XCIsY29sb3I6XCJyZ2JhKDAsMCwwLDAuMilcIixzaXplOlwiM3B4XCJ9KSl9O3ZhciBoPWEuZm4ubGF5b3V0O2EuZm4ubGF5b3V0PWIsYS5mbi5sYXlvdXQuQ29uc3R1Y3Rvcj1nLGEuZm4ubGF5b3V0Lm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gYS5mbi5sYXlvdXQ9aCx0aGlzfSxhKHdpbmRvdykub24oXCJsb2FkXCIsZnVuY3Rpb24oKXtiLmNhbGwoYShcImJvZHlcIikpfSl9KGpRdWVyeSksZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9YSh0aGlzKSxmPWUuZGF0YShjKTtpZighZil7dmFyIGc9YS5leHRlbmQoe30sZCxlLmRhdGEoKSxcIm9iamVjdFwiPT10eXBlb2YgYiYmYik7ZS5kYXRhKGMsZj1uZXcgaChnKSl9XCJ0b2dnbGVcIj09YiYmZi50b2dnbGUoKX0pfXZhciBjPVwibHRlLnB1c2htZW51XCIsZD17Y29sbGFwc2VTY3JlZW5TaXplOjc2NyxleHBhbmRPbkhvdmVyOiExLGV4cGFuZFRyYW5zaXRpb25EZWxheToyMDB9LGU9e2NvbGxhcHNlZDpcIi5zaWRlYmFyLWNvbGxhcHNlXCIsb3BlbjpcIi5zaWRlYmFyLW9wZW5cIixtYWluU2lkZWJhcjpcIi5tYWluLXNpZGViYXJcIixjb250ZW50V3JhcHBlcjpcIi5jb250ZW50LXdyYXBwZXJcIixzZWFyY2hJbnB1dDpcIi5zaWRlYmFyLWZvcm0gLmZvcm0tY29udHJvbFwiLGJ1dHRvbjonW2RhdGEtdG9nZ2xlPVwicHVzaC1tZW51XCJdJyxtaW5pOlwiLnNpZGViYXItbWluaVwiLGV4cGFuZGVkOlwiLnNpZGViYXItZXhwYW5kZWQtb24taG92ZXJcIixsYXlvdXRGaXhlZDpcIi5maXhlZFwifSxmPXtjb2xsYXBzZWQ6XCJzaWRlYmFyLWNvbGxhcHNlXCIsb3BlbjpcInNpZGViYXItb3BlblwiLG1pbmk6XCJzaWRlYmFyLW1pbmlcIixleHBhbmRlZDpcInNpZGViYXItZXhwYW5kZWQtb24taG92ZXJcIixleHBhbmRGZWF0dXJlOlwic2lkZWJhci1taW5pLWV4cGFuZC1mZWF0dXJlXCIsbGF5b3V0Rml4ZWQ6XCJmaXhlZFwifSxnPXtleHBhbmRlZDpcImV4cGFuZGVkLnB1c2hNZW51XCIsY29sbGFwc2VkOlwiY29sbGFwc2VkLnB1c2hNZW51XCJ9LGg9ZnVuY3Rpb24oYSl7dGhpcy5vcHRpb25zPWEsdGhpcy5pbml0KCl9O2gucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXsodGhpcy5vcHRpb25zLmV4cGFuZE9uSG92ZXJ8fGEoXCJib2R5XCIpLmlzKGUubWluaStlLmxheW91dEZpeGVkKSkmJih0aGlzLmV4cGFuZE9uSG92ZXIoKSxhKFwiYm9keVwiKS5hZGRDbGFzcyhmLmV4cGFuZEZlYXR1cmUpKSxhKGUuY29udGVudFdyYXBwZXIpLmNsaWNrKGZ1bmN0aW9uKCl7YSh3aW5kb3cpLndpZHRoKCk8PXRoaXMub3B0aW9ucy5jb2xsYXBzZVNjcmVlblNpemUmJmEoXCJib2R5XCIpLmhhc0NsYXNzKGYub3BlbikmJnRoaXMuY2xvc2UoKX0uYmluZCh0aGlzKSksYShlLnNlYXJjaElucHV0KS5jbGljayhmdW5jdGlvbihhKXthLnN0b3BQcm9wYWdhdGlvbigpfSl9LGgucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbigpe3ZhciBiPWEod2luZG93KS53aWR0aCgpLGM9IWEoXCJib2R5XCIpLmhhc0NsYXNzKGYuY29sbGFwc2VkKTtiPD10aGlzLm9wdGlvbnMuY29sbGFwc2VTY3JlZW5TaXplJiYoYz1hKFwiYm9keVwiKS5oYXNDbGFzcyhmLm9wZW4pKSxjP3RoaXMuY2xvc2UoKTp0aGlzLm9wZW4oKX0saC5wcm90b3R5cGUub3Blbj1mdW5jdGlvbigpe2Eod2luZG93KS53aWR0aCgpPnRoaXMub3B0aW9ucy5jb2xsYXBzZVNjcmVlblNpemU/YShcImJvZHlcIikucmVtb3ZlQ2xhc3MoZi5jb2xsYXBzZWQpLnRyaWdnZXIoYS5FdmVudChnLmV4cGFuZGVkKSk6YShcImJvZHlcIikuYWRkQ2xhc3MoZi5vcGVuKS50cmlnZ2VyKGEuRXZlbnQoZy5leHBhbmRlZCkpfSxoLnByb3RvdHlwZS5jbG9zZT1mdW5jdGlvbigpe2Eod2luZG93KS53aWR0aCgpPnRoaXMub3B0aW9ucy5jb2xsYXBzZVNjcmVlblNpemU/YShcImJvZHlcIikuYWRkQ2xhc3MoZi5jb2xsYXBzZWQpLnRyaWdnZXIoYS5FdmVudChnLmNvbGxhcHNlZCkpOmEoXCJib2R5XCIpLnJlbW92ZUNsYXNzKGYub3BlbitcIiBcIitmLmNvbGxhcHNlZCkudHJpZ2dlcihhLkV2ZW50KGcuY29sbGFwc2VkKSl9LGgucHJvdG90eXBlLmV4cGFuZE9uSG92ZXI9ZnVuY3Rpb24oKXthKGUubWFpblNpZGViYXIpLmhvdmVyKGZ1bmN0aW9uKCl7YShcImJvZHlcIikuaXMoZS5taW5pK2UuY29sbGFwc2VkKSYmYSh3aW5kb3cpLndpZHRoKCk+dGhpcy5vcHRpb25zLmNvbGxhcHNlU2NyZWVuU2l6ZSYmdGhpcy5leHBhbmQoKX0uYmluZCh0aGlzKSxmdW5jdGlvbigpe2EoXCJib2R5XCIpLmlzKGUuZXhwYW5kZWQpJiZ0aGlzLmNvbGxhcHNlKCl9LmJpbmQodGhpcykpfSxoLnByb3RvdHlwZS5leHBhbmQ9ZnVuY3Rpb24oKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YShcImJvZHlcIikucmVtb3ZlQ2xhc3MoZi5jb2xsYXBzZWQpLmFkZENsYXNzKGYuZXhwYW5kZWQpfSx0aGlzLm9wdGlvbnMuZXhwYW5kVHJhbnNpdGlvbkRlbGF5KX0saC5wcm90b3R5cGUuY29sbGFwc2U9ZnVuY3Rpb24oKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YShcImJvZHlcIikucmVtb3ZlQ2xhc3MoZi5leHBhbmRlZCkuYWRkQ2xhc3MoZi5jb2xsYXBzZWQpfSx0aGlzLm9wdGlvbnMuZXhwYW5kVHJhbnNpdGlvbkRlbGF5KX07dmFyIGk9YS5mbi5wdXNoTWVudTthLmZuLnB1c2hNZW51PWIsYS5mbi5wdXNoTWVudS5Db25zdHJ1Y3Rvcj1oLGEuZm4ucHVzaE1lbnUubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLnB1c2hNZW51PWksdGhpc30sYShkb2N1bWVudCkub24oXCJjbGlja1wiLGUuYnV0dG9uLGZ1bmN0aW9uKGMpe2MucHJldmVudERlZmF1bHQoKSxiLmNhbGwoYSh0aGlzKSxcInRvZ2dsZVwiKX0pLGEod2luZG93KS5vbihcImxvYWRcIixmdW5jdGlvbigpe2IuY2FsbChhKGUuYnV0dG9uKSl9KX0oalF1ZXJ5KSxmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZT1hKHRoaXMpO2lmKCFlLmRhdGEoYykpe3ZhciBmPWEuZXh0ZW5kKHt9LGQsZS5kYXRhKCksXCJvYmplY3RcIj09dHlwZW9mIGImJmIpO2UuZGF0YShjLG5ldyBoKGUsZikpfX0pfXZhciBjPVwibHRlLnRyZWVcIixkPXthbmltYXRpb25TcGVlZDo1MDAsYWNjb3JkaW9uOiEwLGZvbGxvd0xpbms6ITEsdHJpZ2dlcjpcIi50cmVldmlldyBhXCJ9LGU9e3RyZWU6XCIudHJlZVwiLHRyZWV2aWV3OlwiLnRyZWV2aWV3XCIsdHJlZXZpZXdNZW51OlwiLnRyZWV2aWV3LW1lbnVcIixvcGVuOlwiLm1lbnUtb3BlbiwgLmFjdGl2ZVwiLGxpOlwibGlcIixkYXRhOidbZGF0YS13aWRnZXQ9XCJ0cmVlXCJdJyxhY3RpdmU6XCIuYWN0aXZlXCJ9LGY9e29wZW46XCJtZW51LW9wZW5cIix0cmVlOlwidHJlZVwifSxnPXtjb2xsYXBzZWQ6XCJjb2xsYXBzZWQudHJlZVwiLGV4cGFuZGVkOlwiZXhwYW5kZWQudHJlZVwifSxoPWZ1bmN0aW9uKGIsYyl7dGhpcy5lbGVtZW50PWIsdGhpcy5vcHRpb25zPWMsYSh0aGlzLmVsZW1lbnQpLmFkZENsYXNzKGYudHJlZSksYShlLnRyZWV2aWV3K2UuYWN0aXZlLHRoaXMuZWxlbWVudCkuYWRkQ2xhc3MoZi5vcGVuKSx0aGlzLl9zZXRVcExpc3RlbmVycygpfTtoLnByb3RvdHlwZS50b2dnbGU9ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLm5leHQoZS50cmVldmlld01lbnUpLGQ9YS5wYXJlbnQoKSxnPWQuaGFzQ2xhc3MoZi5vcGVuKTtkLmlzKGUudHJlZXZpZXcpJiYodGhpcy5vcHRpb25zLmZvbGxvd0xpbmsmJlwiI1wiIT1hLmF0dHIoXCJocmVmXCIpfHxiLnByZXZlbnREZWZhdWx0KCksZz90aGlzLmNvbGxhcHNlKGMsZCk6dGhpcy5leHBhbmQoYyxkKSl9LGgucHJvdG90eXBlLmV4cGFuZD1mdW5jdGlvbihiLGMpe3ZhciBkPWEuRXZlbnQoZy5leHBhbmRlZCk7aWYodGhpcy5vcHRpb25zLmFjY29yZGlvbil7dmFyIGg9Yy5zaWJsaW5ncyhlLm9wZW4pLGk9aC5jaGlsZHJlbihlLnRyZWV2aWV3TWVudSk7dGhpcy5jb2xsYXBzZShpLGgpfWMuYWRkQ2xhc3MoZi5vcGVuKSxiLnNsaWRlRG93bih0aGlzLm9wdGlvbnMuYW5pbWF0aW9uU3BlZWQsZnVuY3Rpb24oKXthKHRoaXMuZWxlbWVudCkudHJpZ2dlcihkKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLmNvbGxhcHNlPWZ1bmN0aW9uKGIsYyl7dmFyIGQ9YS5FdmVudChnLmNvbGxhcHNlZCk7Yi5maW5kKGUub3BlbikucmVtb3ZlQ2xhc3MoZi5vcGVuKSxjLnJlbW92ZUNsYXNzKGYub3BlbiksYi5zbGlkZVVwKHRoaXMub3B0aW9ucy5hbmltYXRpb25TcGVlZCxmdW5jdGlvbigpe2IuZmluZChlLm9wZW4rXCIgPiBcIitlLnRyZWV2aWV3KS5zbGlkZVVwKCksYSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoZCl9LmJpbmQodGhpcykpfSxoLnByb3RvdHlwZS5fc2V0VXBMaXN0ZW5lcnM9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2EodGhpcy5lbGVtZW50KS5vbihcImNsaWNrXCIsdGhpcy5vcHRpb25zLnRyaWdnZXIsZnVuY3Rpb24oYyl7Yi50b2dnbGUoYSh0aGlzKSxjKX0pfTt2YXIgaT1hLmZuLnRyZWU7YS5mbi50cmVlPWIsYS5mbi50cmVlLkNvbnN0cnVjdG9yPWgsYS5mbi50cmVlLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gYS5mbi50cmVlPWksdGhpc30sYSh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7YShlLmRhdGEpLmVhY2goZnVuY3Rpb24oKXtiLmNhbGwoYSh0aGlzKSl9KX0pfShqUXVlcnkpLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyksZj1lLmRhdGEoYyk7aWYoIWYpe3ZhciBnPWEuZXh0ZW5kKHt9LGQsZS5kYXRhKCksXCJvYmplY3RcIj09dHlwZW9mIGImJmIpO2UuZGF0YShjLGY9bmV3IGgoZSxnKSl9XCJzdHJpbmdcIj09dHlwZW9mIGImJmYudG9nZ2xlKCl9KX12YXIgYz1cImx0ZS5jb250cm9sc2lkZWJhclwiLGQ9e3NsaWRlOiEwfSxlPXtzaWRlYmFyOlwiLmNvbnRyb2wtc2lkZWJhclwiLGRhdGE6J1tkYXRhLXRvZ2dsZT1cImNvbnRyb2wtc2lkZWJhclwiXScsb3BlbjpcIi5jb250cm9sLXNpZGViYXItb3BlblwiLGJnOlwiLmNvbnRyb2wtc2lkZWJhci1iZ1wiLHdyYXBwZXI6XCIud3JhcHBlclwiLGNvbnRlbnQ6XCIuY29udGVudC13cmFwcGVyXCIsYm94ZWQ6XCIubGF5b3V0LWJveGVkXCJ9LGY9e29wZW46XCJjb250cm9sLXNpZGViYXItb3BlblwiLGZpeGVkOlwiZml4ZWRcIn0sZz17Y29sbGFwc2VkOlwiY29sbGFwc2VkLmNvbnRyb2xzaWRlYmFyXCIsZXhwYW5kZWQ6XCJleHBhbmRlZC5jb250cm9sc2lkZWJhclwifSxoPWZ1bmN0aW9uKGEsYil7dGhpcy5lbGVtZW50PWEsdGhpcy5vcHRpb25zPWIsdGhpcy5oYXNCaW5kZWRSZXNpemU9ITEsdGhpcy5pbml0KCl9O2gucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXthKHRoaXMuZWxlbWVudCkuaXMoZS5kYXRhKXx8YSh0aGlzKS5vbihcImNsaWNrXCIsdGhpcy50b2dnbGUpLHRoaXMuZml4KCksYSh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe3RoaXMuZml4KCl9LmJpbmQodGhpcykpfSxoLnByb3RvdHlwZS50b2dnbGU9ZnVuY3Rpb24oYil7YiYmYi5wcmV2ZW50RGVmYXVsdCgpLHRoaXMuZml4KCksYShlLnNpZGViYXIpLmlzKGUub3Blbil8fGEoXCJib2R5XCIpLmlzKGUub3Blbik/dGhpcy5jb2xsYXBzZSgpOnRoaXMuZXhwYW5kKCl9LGgucHJvdG90eXBlLmV4cGFuZD1mdW5jdGlvbigpe3RoaXMub3B0aW9ucy5zbGlkZT9hKGUuc2lkZWJhcikuYWRkQ2xhc3MoZi5vcGVuKTphKFwiYm9keVwiKS5hZGRDbGFzcyhmLm9wZW4pLGEodGhpcy5lbGVtZW50KS50cmlnZ2VyKGEuRXZlbnQoZy5leHBhbmRlZCkpfSxoLnByb3RvdHlwZS5jb2xsYXBzZT1mdW5jdGlvbigpe2EoXCJib2R5LCBcIitlLnNpZGViYXIpLnJlbW92ZUNsYXNzKGYub3BlbiksYSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoYS5FdmVudChnLmNvbGxhcHNlZCkpfSxoLnByb3RvdHlwZS5maXg9ZnVuY3Rpb24oKXthKFwiYm9keVwiKS5pcyhlLmJveGVkKSYmdGhpcy5fZml4Rm9yQm94ZWQoYShlLmJnKSl9LGgucHJvdG90eXBlLl9maXhGb3JCb3hlZD1mdW5jdGlvbihiKXtiLmNzcyh7cG9zaXRpb246XCJhYnNvbHV0ZVwiLGhlaWdodDphKGUud3JhcHBlcikuaGVpZ2h0KCl9KX07dmFyIGk9YS5mbi5jb250cm9sU2lkZWJhcjthLmZuLmNvbnRyb2xTaWRlYmFyPWIsYS5mbi5jb250cm9sU2lkZWJhci5Db25zdHJ1Y3Rvcj1oLGEuZm4uY29udHJvbFNpZGViYXIubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLmNvbnRyb2xTaWRlYmFyPWksdGhpc30sYShkb2N1bWVudCkub24oXCJjbGlja1wiLGUuZGF0YSxmdW5jdGlvbihjKXtjJiZjLnByZXZlbnREZWZhdWx0KCksYi5jYWxsKGEodGhpcyksXCJ0b2dnbGVcIil9KX0oalF1ZXJ5KSxmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZT1hKHRoaXMpLGY9ZS5kYXRhKGMpO2lmKCFmKXt2YXIgZz1hLmV4dGVuZCh7fSxkLGUuZGF0YSgpLFwib2JqZWN0XCI9PXR5cGVvZiBiJiZiKTtlLmRhdGEoYyxmPW5ldyBoKGUsZykpfWlmKFwic3RyaW5nXCI9PXR5cGVvZiBiKXtpZih2b2lkIDA9PT1mW2JdKXRocm93IG5ldyBFcnJvcihcIk5vIG1ldGhvZCBuYW1lZCBcIitiKTtmW2JdKCl9fSl9dmFyIGM9XCJsdGUuYm94d2lkZ2V0XCIsZD17YW5pbWF0aW9uU3BlZWQ6NTAwLGNvbGxhcHNlVHJpZ2dlcjonW2RhdGEtd2lkZ2V0PVwiY29sbGFwc2VcIl0nLHJlbW92ZVRyaWdnZXI6J1tkYXRhLXdpZGdldD1cInJlbW92ZVwiXScsY29sbGFwc2VJY29uOlwiZmEtbWludXNcIixleHBhbmRJY29uOlwiZmEtcGx1c1wiLHJlbW92ZUljb246XCJmYS10aW1lc1wifSxlPXtkYXRhOlwiLmJveFwiLGNvbGxhcHNlZDpcIi5jb2xsYXBzZWQtYm94XCIsYm9keTpcIi5ib3gtYm9keVwiLGZvb3RlcjpcIi5ib3gtZm9vdGVyXCIsdG9vbHM6XCIuYm94LXRvb2xzXCJ9LGY9e2NvbGxhcHNlZDpcImNvbGxhcHNlZC1ib3hcIn0sZz17Y29sbGFwc2VkOlwiY29sbGFwc2VkLmJveHdpZGdldFwiLGV4cGFuZGVkOlwiZXhwYW5kZWQuYm94d2lkZ2V0XCIscmVtb3ZlZDpcInJlbW92ZWQuYm94d2lkZ2V0XCJ9LGg9ZnVuY3Rpb24oYSxiKXt0aGlzLmVsZW1lbnQ9YSx0aGlzLm9wdGlvbnM9Yix0aGlzLl9zZXRVcExpc3RlbmVycygpfTtoLnByb3RvdHlwZS50b2dnbGU9ZnVuY3Rpb24oKXthKHRoaXMuZWxlbWVudCkuaXMoZS5jb2xsYXBzZWQpP3RoaXMuZXhwYW5kKCk6dGhpcy5jb2xsYXBzZSgpfSxoLnByb3RvdHlwZS5leHBhbmQ9ZnVuY3Rpb24oKXt2YXIgYj1hLkV2ZW50KGcuZXhwYW5kZWQpLGM9dGhpcy5vcHRpb25zLmNvbGxhcHNlSWNvbixkPXRoaXMub3B0aW9ucy5leHBhbmRJY29uO2EodGhpcy5lbGVtZW50KS5yZW1vdmVDbGFzcyhmLmNvbGxhcHNlZCksYSh0aGlzLmVsZW1lbnQpLmZpbmQoZS50b29scykuZmluZChcIi5cIitkKS5yZW1vdmVDbGFzcyhkKS5hZGRDbGFzcyhjKSxhKHRoaXMuZWxlbWVudCkuZmluZChlLmJvZHkrXCIsIFwiK2UuZm9vdGVyKS5zbGlkZURvd24odGhpcy5vcHRpb25zLmFuaW1hdGlvblNwZWVkLGZ1bmN0aW9uKCl7YSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoYil9LmJpbmQodGhpcykpfSxoLnByb3RvdHlwZS5jb2xsYXBzZT1mdW5jdGlvbigpe3ZhciBiPWEuRXZlbnQoZy5jb2xsYXBzZWQpLGM9dGhpcy5vcHRpb25zLmNvbGxhcHNlSWNvbixkPXRoaXMub3B0aW9ucy5leHBhbmRJY29uO2EodGhpcy5lbGVtZW50KS5maW5kKGUudG9vbHMpLmZpbmQoXCIuXCIrYykucmVtb3ZlQ2xhc3MoYykuYWRkQ2xhc3MoZCksYSh0aGlzLmVsZW1lbnQpLmZpbmQoZS5ib2R5K1wiLCBcIitlLmZvb3Rlcikuc2xpZGVVcCh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uU3BlZWQsZnVuY3Rpb24oKXthKHRoaXMuZWxlbWVudCkuYWRkQ2xhc3MoZi5jb2xsYXBzZWQpLGEodGhpcy5lbGVtZW50KS50cmlnZ2VyKGIpfS5iaW5kKHRoaXMpKX0saC5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKCl7dmFyIGI9YS5FdmVudChnLnJlbW92ZWQpO2EodGhpcy5lbGVtZW50KS5zbGlkZVVwKHRoaXMub3B0aW9ucy5hbmltYXRpb25TcGVlZCxmdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS50cmlnZ2VyKGIpLGEodGhpcy5lbGVtZW50KS5yZW1vdmUoKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLl9zZXRVcExpc3RlbmVycz1mdW5jdGlvbigpe3ZhciBiPXRoaXM7YSh0aGlzLmVsZW1lbnQpLm9uKFwiY2xpY2tcIix0aGlzLm9wdGlvbnMuY29sbGFwc2VUcmlnZ2VyLGZ1bmN0aW9uKGEpe2EmJmEucHJldmVudERlZmF1bHQoKSxiLnRvZ2dsZSgpfSksYSh0aGlzLmVsZW1lbnQpLm9uKFwiY2xpY2tcIix0aGlzLm9wdGlvbnMucmVtb3ZlVHJpZ2dlcixmdW5jdGlvbihhKXthJiZhLnByZXZlbnREZWZhdWx0KCksYi5yZW1vdmUoKX0pfTt2YXIgaT1hLmZuLmJveFdpZGdldDthLmZuLmJveFdpZGdldD1iLGEuZm4uYm94V2lkZ2V0LkNvbnN0cnVjdG9yPWgsYS5mbi5ib3hXaWRnZXQubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLmJveFdpZGdldD1pLHRoaXN9LGEod2luZG93KS5vbihcImxvYWRcIixmdW5jdGlvbigpe2EoZS5kYXRhKS5lYWNoKGZ1bmN0aW9uKCl7Yi5jYWxsKGEodGhpcykpfSl9KX0oalF1ZXJ5KSxmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZT1hKHRoaXMpLGY9ZS5kYXRhKGMpO2lmKCFmKXt2YXIgaD1hLmV4dGVuZCh7fSxkLGUuZGF0YSgpLFwib2JqZWN0XCI9PXR5cGVvZiBiJiZiKTtlLmRhdGEoYyxmPW5ldyBnKGUsaCkpfWlmKFwic3RyaW5nXCI9PXR5cGVvZiBmKXtpZih2b2lkIDA9PT1mW2JdKXRocm93IG5ldyBFcnJvcihcIk5vIG1ldGhvZCBuYW1lZCBcIitiKTtmW2JdKCl9fSl9dmFyIGM9XCJsdGUudG9kb2xpc3RcIixkPXtpQ2hlY2s6ITEsb25DaGVjazpmdW5jdGlvbigpe30sb25VbkNoZWNrOmZ1bmN0aW9uKCl7fX0sZT17ZGF0YTonW2RhdGEtd2lkZ2V0PVwidG9kby1saXN0XCJdJ30sZj17ZG9uZTpcImRvbmVcIn0sZz1mdW5jdGlvbihhLGIpe3RoaXMuZWxlbWVudD1hLHRoaXMub3B0aW9ucz1iLHRoaXMuX3NldFVwTGlzdGVuZXJzKCl9O2cucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihhKXtpZihhLnBhcmVudHMoZS5saSkuZmlyc3QoKS50b2dnbGVDbGFzcyhmLmRvbmUpLCFhLnByb3AoXCJjaGVja2VkXCIpKXJldHVybiB2b2lkIHRoaXMudW5DaGVjayhhKTt0aGlzLmNoZWNrKGEpfSxnLnByb3RvdHlwZS5jaGVjaz1mdW5jdGlvbihhKXt0aGlzLm9wdGlvbnMub25DaGVjay5jYWxsKGEpfSxnLnByb3RvdHlwZS51bkNoZWNrPWZ1bmN0aW9uKGEpe3RoaXMub3B0aW9ucy5vblVuQ2hlY2suY2FsbChhKX0sZy5wcm90b3R5cGUuX3NldFVwTGlzdGVuZXJzPWZ1bmN0aW9uKCl7dmFyIGI9dGhpczthKHRoaXMuZWxlbWVudCkub24oXCJjaGFuZ2UgaWZDaGFuZ2VkXCIsXCJpbnB1dDpjaGVja2JveFwiLGZ1bmN0aW9uKCl7Yi50b2dnbGUoYSh0aGlzKSl9KX07dmFyIGg9YS5mbi50b2RvTGlzdDthLmZuLnRvZG9MaXN0PWIsYS5mbi50b2RvTGlzdC5Db25zdHJ1Y3Rvcj1nLGEuZm4udG9kb0xpc3Qubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLnRvZG9MaXN0PWgsdGhpc30sYSh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7YShlLmRhdGEpLmVhY2goZnVuY3Rpb24oKXtiLmNhbGwoYSh0aGlzKSl9KX0pfShqUXVlcnkpLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBkPWEodGhpcyksZT1kLmRhdGEoYyk7ZXx8ZC5kYXRhKGMsZT1uZXcgZihkKSksXCJzdHJpbmdcIj09dHlwZW9mIGImJmUudG9nZ2xlKGQpfSl9dmFyIGM9XCJsdGUuZGlyZWN0Y2hhdFwiLGQ9e2RhdGE6J1tkYXRhLXdpZGdldD1cImNoYXQtcGFuZS10b2dnbGVcIl0nLGJveDpcIi5kaXJlY3QtY2hhdFwifSxlPXtvcGVuOlwiZGlyZWN0LWNoYXQtY29udGFjdHMtb3BlblwifSxmPWZ1bmN0aW9uKGEpe3RoaXMuZWxlbWVudD1hfTtmLnByb3RvdHlwZS50b2dnbGU9ZnVuY3Rpb24oYSl7YS5wYXJlbnRzKGQuYm94KS5maXJzdCgpLnRvZ2dsZUNsYXNzKGUub3Blbil9O3ZhciBnPWEuZm4uZGlyZWN0Q2hhdDthLmZuLmRpcmVjdENoYXQ9YixhLmZuLmRpcmVjdENoYXQuQ29uc3RydWN0b3I9ZixhLmZuLmRpcmVjdENoYXQubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLmRpcmVjdENoYXQ9Zyx0aGlzfSxhKGRvY3VtZW50KS5vbihcImNsaWNrXCIsZC5kYXRhLGZ1bmN0aW9uKGMpe2MmJmMucHJldmVudERlZmF1bHQoKSxiLmNhbGwoYSh0aGlzKSxcInRvZ2dsZVwiKX0pfShqUXVlcnkpOyIsIi8qKlxyXG4qIEBsaWNlbnNlIElucHV0IE1hc2sgcGx1Z2luIGZvciBqcXVlcnlcclxuKiBodHRwOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvanF1ZXJ5LmlucHV0bWFza1xyXG4qIENvcHlyaWdodCAoYykgMjAxMCAtIDIwMTQgUm9iaW4gSGVyYm90c1xyXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHApXHJcbiogVmVyc2lvbjogMC4wLjBcclxuKi9cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBpZiAoJC5mbi5pbnB1dG1hc2sgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vaGVscGVyIGZ1bmN0aW9ucyAgICBcclxuICAgICAgICBmdW5jdGlvbiBpc0lucHV0RXZlbnRTdXBwb3J0ZWQoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JyksXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZSA9ICdvbicgKyBldmVudE5hbWUsXHJcbiAgICAgICAgICAgIGlzU3VwcG9ydGVkID0gKGV2ZW50TmFtZSBpbiBlbCk7XHJcbiAgICAgICAgICAgIGlmICghaXNTdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShldmVudE5hbWUsICdyZXR1cm47Jyk7XHJcbiAgICAgICAgICAgICAgICBpc1N1cHBvcnRlZCA9IHR5cGVvZiBlbFtldmVudE5hbWVdID09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWwgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNTdXBwb3J0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlc29sdmVBbGlhcyhhbGlhc1N0ciwgb3B0aW9ucywgb3B0cykge1xyXG4gICAgICAgICAgICB2YXIgYWxpYXNEZWZpbml0aW9uID0gb3B0cy5hbGlhc2VzW2FsaWFzU3RyXTtcclxuICAgICAgICAgICAgaWYgKGFsaWFzRGVmaW5pdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFsaWFzRGVmaW5pdGlvbi5hbGlhcykgcmVzb2x2ZUFsaWFzKGFsaWFzRGVmaW5pdGlvbi5hbGlhcywgdW5kZWZpbmVkLCBvcHRzKTsgLy9hbGlhcyBpcyBhbm90aGVyIGFsaWFzXHJcbiAgICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCBvcHRzLCBhbGlhc0RlZmluaXRpb24pOyAgLy9tZXJnZSBhbGlhcyBkZWZpbml0aW9uIGluIHRoZSBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCBvcHRzLCBvcHRpb25zKTsgIC8vcmVhcHBseSBleHRyYSBnaXZlbiBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlTWFza1NldHMob3B0cykge1xyXG4gICAgICAgICAgICB2YXIgbXMgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGdlbm1hc2tzID0gW107IC8vdXNlZCB0byBrZWVwIHRyYWNrIG9mIHRoZSBtYXNrcyB0aGF0IHdoZXJlIHByb2Nlc3NlZCwgdG8gYXZvaWQgZHVwbGljYXRlc1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRNYXNrVGVtcGxhdGUobWFzaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMubnVtZXJpY0lucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzayA9IG1hc2suc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBlc2NhcGVkID0gZmFsc2UsIG91dENvdW50ID0gMCwgZ3JlZWR5ID0gb3B0cy5ncmVlZHksIHJlcGVhdCA9IG9wdHMucmVwZWF0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcGVhdCA9PSBcIipcIikgZ3JlZWR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL2lmIChncmVlZHkgPT0gdHJ1ZSAmJiBvcHRzLnBsYWNlaG9sZGVyID09IFwiXCIpIG9wdHMucGxhY2Vob2xkZXIgPSBcIiBcIjtcclxuICAgICAgICAgICAgICAgIGlmIChtYXNrLmxlbmd0aCA9PSAxICYmIGdyZWVkeSA9PSBmYWxzZSAmJiByZXBlYXQgIT0gMCkgeyBvcHRzLnBsYWNlaG9sZGVyID0gXCJcIjsgfSAvL2hpZGUgcGxhY2Vob2xkZXIgd2l0aCBzaW5nbGUgbm9uLWdyZWVkeSBtYXNrXHJcbiAgICAgICAgICAgICAgICB2YXIgc2luZ2xlTWFzayA9ICQubWFwKG1hc2suc3BsaXQoXCJcIiksIGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvdXRFbGVtID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gb3B0cy5lc2NhcGVDaGFyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVzY2FwZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoZWxlbWVudCAhPSBvcHRzLm9wdGlvbmFsbWFya2VyLnN0YXJ0ICYmIGVsZW1lbnQgIT0gb3B0cy5vcHRpb25hbG1hcmtlci5lbmQpIHx8IGVzY2FwZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tkZWYgPSBvcHRzLmRlZmluaXRpb25zW2VsZW1lbnRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFza2RlZiAmJiAhZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXNrZGVmLmNhcmRpbmFsaXR5OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRFbGVtLnB1c2gob3B0cy5wbGFjZWhvbGRlci5jaGFyQXQoKG91dENvdW50ICsgaSkgJSBvcHRzLnBsYWNlaG9sZGVyLmxlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0RWxlbS5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dENvdW50ICs9IG91dEVsZW0ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0RWxlbTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2FsbG9jYXRlIHJlcGV0aXRpb25zXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVwZWF0ZWRNYXNrID0gc2luZ2xlTWFzay5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCByZXBlYXQgJiYgZ3JlZWR5OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByZXBlYXRlZE1hc2sgPSByZXBlYXRlZE1hc2suY29uY2F0KHNpbmdsZU1hc2suc2xpY2UoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgXCJtYXNrXCI6IHJlcGVhdGVkTWFzaywgXCJyZXBlYXRcIjogcmVwZWF0LCBcImdyZWVkeVwiOiBncmVlZHkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3Rlc3QgZGVmaW5pdGlvbiA9PiB7Zm46IFJlZ0V4cC9mdW5jdGlvbiwgY2FyZGluYWxpdHk6IGludCwgb3B0aW9uYWxpdHk6IGJvb2wsIG5ld0Jsb2NrTWFya2VyOiBib29sLCBvZmZzZXQ6IGludCwgY2FzaW5nOiBudWxsL3VwcGVyL2xvd2VyLCBkZWY6IGRlZmluaXRpb25TeW1ib2x9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFRlc3RpbmdDaGFpbihtYXNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5udW1lcmljSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrID0gbWFzay5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGlzT3B0aW9uYWwgPSBmYWxzZSwgZXNjYXBlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0Jsb2NrTWFya2VyID0gZmFsc2U7IC8vaW5kaWNhdGVzIHdoZXRlciB0aGUgYmVnaW4vZW5kaW5nIG9mIGEgYmxvY2sgc2hvdWxkIGJlIGluZGljYXRlZFxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkLm1hcChtYXNrLnNwbGl0KFwiXCIpLCBmdW5jdGlvbiAoZWxlbWVudCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3V0RWxlbSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBvcHRzLmVzY2FwZUNoYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09IG9wdHMub3B0aW9uYWxtYXJrZXIuc3RhcnQgJiYgIWVzY2FwZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPcHRpb25hbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxlbWVudCA9PSBvcHRzLm9wdGlvbmFsbWFya2VyLmVuZCAmJiAhZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc09wdGlvbmFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXNrZGVmID0gb3B0cy5kZWZpbml0aW9uc1tlbGVtZW50XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2tkZWYgJiYgIWVzY2FwZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2YWxpZGF0b3JzID0gbWFza2RlZltcInByZXZhbGlkYXRvclwiXSwgcHJldmFsaWRhdG9yc0wgPSBwcmV2YWxpZGF0b3JzID8gcHJldmFsaWRhdG9ycy5sZW5ndGggOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBtYXNrZGVmLmNhcmRpbmFsaXR5OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJldmFsaWRhdG9yID0gcHJldmFsaWRhdG9yc0wgPj0gaSA/IHByZXZhbGlkYXRvcnNbaSAtIDFdIDogW10sIHZhbGlkYXRvciA9IHByZXZhbGlkYXRvcltcInZhbGlkYXRvclwiXSwgY2FyZGluYWxpdHkgPSBwcmV2YWxpZGF0b3JbXCJjYXJkaW5hbGl0eVwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRFbGVtLnB1c2goeyBmbjogdmFsaWRhdG9yID8gdHlwZW9mIHZhbGlkYXRvciA9PSAnc3RyaW5nJyA/IG5ldyBSZWdFeHAodmFsaWRhdG9yKSA6IG5ldyBmdW5jdGlvbiAoKSB7IHRoaXMudGVzdCA9IHZhbGlkYXRvcjsgfSA6IG5ldyBSZWdFeHAoXCIuXCIpLCBjYXJkaW5hbGl0eTogY2FyZGluYWxpdHkgPyBjYXJkaW5hbGl0eSA6IDEsIG9wdGlvbmFsaXR5OiBpc09wdGlvbmFsLCBuZXdCbG9ja01hcmtlcjogaXNPcHRpb25hbCA9PSB0cnVlID8gbmV3QmxvY2tNYXJrZXIgOiBmYWxzZSwgb2Zmc2V0OiAwLCBjYXNpbmc6IG1hc2tkZWZbXCJjYXNpbmdcIl0sIGRlZjogbWFza2RlZltcImRlZmluaXRpb25TeW1ib2xcIl0gfHwgZWxlbWVudCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNPcHRpb25hbCA9PSB0cnVlKSAvL3Jlc2V0IG5ld0Jsb2NrTWFya2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRFbGVtLnB1c2goeyBmbjogbWFza2RlZi52YWxpZGF0b3IgPyB0eXBlb2YgbWFza2RlZi52YWxpZGF0b3IgPT0gJ3N0cmluZycgPyBuZXcgUmVnRXhwKG1hc2tkZWYudmFsaWRhdG9yKSA6IG5ldyBmdW5jdGlvbiAoKSB7IHRoaXMudGVzdCA9IG1hc2tkZWYudmFsaWRhdG9yOyB9IDogbmV3IFJlZ0V4cChcIi5cIiksIGNhcmRpbmFsaXR5OiBtYXNrZGVmLmNhcmRpbmFsaXR5LCBvcHRpb25hbGl0eTogaXNPcHRpb25hbCwgbmV3QmxvY2tNYXJrZXI6IG5ld0Jsb2NrTWFya2VyLCBvZmZzZXQ6IDAsIGNhc2luZzogbWFza2RlZltcImNhc2luZ1wiXSwgZGVmOiBtYXNrZGVmW1wiZGVmaW5pdGlvblN5bWJvbFwiXSB8fCBlbGVtZW50IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0RWxlbS5wdXNoKHsgZm46IG51bGwsIGNhcmRpbmFsaXR5OiAwLCBvcHRpb25hbGl0eTogaXNPcHRpb25hbCwgbmV3QmxvY2tNYXJrZXI6IG5ld0Jsb2NrTWFya2VyLCBvZmZzZXQ6IDAsIGNhc2luZzogbnVsbCwgZGVmOiBlbGVtZW50IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzZXQgbmV3QmxvY2tNYXJrZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG91dEVsZW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gbWFya09wdGlvbmFsKG1hc2tQYXJ0KSB7IC8vbmVlZGVkIGZvciB0aGUgY2xlYXJPcHRpb25hbFRhaWwgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMub3B0aW9uYWxtYXJrZXIuc3RhcnQgKyBtYXNrUGFydCArIG9wdHMub3B0aW9uYWxtYXJrZXIuZW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwbGl0Rmlyc3RPcHRpb25hbEVuZFBhcnQobWFza1BhcnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRpb25hbFN0YXJ0TWFya2VycyA9IDAsIG9wdGlvbmFsRW5kTWFya2VycyA9IDAsIG1wbCA9IG1hc2tQYXJ0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BhcnQuY2hhckF0KGkpID09IG9wdHMub3B0aW9uYWxtYXJrZXIuc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxTdGFydE1hcmtlcnMrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2tQYXJ0LmNoYXJBdChpKSA9PSBvcHRzLm9wdGlvbmFsbWFya2VyLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbEVuZE1hcmtlcnMrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbmFsU3RhcnRNYXJrZXJzID4gMCAmJiBvcHRpb25hbFN0YXJ0TWFya2VycyA9PSBvcHRpb25hbEVuZE1hcmtlcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG1hc2tQYXJ0cyA9IFttYXNrUGFydC5zdWJzdHJpbmcoMCwgaSldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCBtcGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrUGFydHMucHVzaChtYXNrUGFydC5zdWJzdHJpbmcoaSArIDEsIG1wbCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tQYXJ0cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzcGxpdEZpcnN0T3B0aW9uYWxTdGFydFBhcnQobWFza1BhcnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtcGwgPSBtYXNrUGFydC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1wbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2tQYXJ0LmNoYXJBdChpKSA9PSBvcHRzLm9wdGlvbmFsbWFya2VyLnN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBtYXNrUGFydHMgPSBbbWFza1BhcnQuc3Vic3RyaW5nKDAsIGkpXTtcclxuICAgICAgICAgICAgICAgIGlmIChpIDwgbXBsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFza1BhcnRzLnB1c2gobWFza1BhcnQuc3Vic3RyaW5nKGkgKyAxLCBtcGwpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXNrUGFydHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVNYXNrKG1hc2tQcmVmaXgsIG1hc2tQYXJ0LCBtZXRhZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hc2tQYXJ0cyA9IHNwbGl0Rmlyc3RPcHRpb25hbEVuZFBhcnQobWFza1BhcnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld01hc2ssIG1hc2tUZW1wbGF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbWFza3MgPSBzcGxpdEZpcnN0T3B0aW9uYWxTdGFydFBhcnQobWFza1BhcnRzWzBdKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXNrcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TWFzayA9IG1hc2tQcmVmaXggKyBtYXNrc1swXSArIG1hcmtPcHRpb25hbChtYXNrc1sxXSkgKyAobWFza1BhcnRzLmxlbmd0aCA+IDEgPyBtYXNrUGFydHNbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KG5ld01hc2ssIGdlbm1hc2tzKSA9PSAtMSAmJiBuZXdNYXNrICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VubWFza3MucHVzaChuZXdNYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza1RlbXBsYXRlID0gZ2V0TWFza1RlbXBsYXRlKG5ld01hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWFza1wiOiBuZXdNYXNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfYnVmZmVyXCI6IG1hc2tUZW1wbGF0ZVtcIm1hc2tcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJ1ZmZlclwiOiBtYXNrVGVtcGxhdGVbXCJtYXNrXCJdLnNsaWNlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlc3RzXCI6IGdldFRlc3RpbmdDaGFpbihuZXdNYXNrKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdFZhbGlkUG9zaXRpb25cIjogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdyZWVkeVwiOiBtYXNrVGVtcGxhdGVbXCJncmVlZHlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcGVhdFwiOiBtYXNrVGVtcGxhdGVbXCJyZXBlYXRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFkYXRhXCI6IG1ldGFkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBuZXdNYXNrID0gbWFza1ByZWZpeCArIG1hc2tzWzBdICsgKG1hc2tQYXJ0cy5sZW5ndGggPiAxID8gbWFza1BhcnRzWzFdIDogXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShuZXdNYXNrLCBnZW5tYXNrcykgPT0gLTEgJiYgbmV3TWFzayAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbm1hc2tzLnB1c2gobmV3TWFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tUZW1wbGF0ZSA9IGdldE1hc2tUZW1wbGF0ZShuZXdNYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1hc2tcIjogbmV3TWFzayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2J1ZmZlclwiOiBtYXNrVGVtcGxhdGVbXCJtYXNrXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJidWZmZXJcIjogbWFza1RlbXBsYXRlW1wibWFza1wiXS5zbGljZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXN0c1wiOiBnZXRUZXN0aW5nQ2hhaW4obmV3TWFzayksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhc3RWYWxpZFBvc2l0aW9uXCI6IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJncmVlZHlcIjogbWFza1RlbXBsYXRlW1wiZ3JlZWR5XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXBlYXRcIjogbWFza1RlbXBsYXRlW1wicmVwZWF0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhZGF0YVwiOiBtZXRhZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwbGl0Rmlyc3RPcHRpb25hbFN0YXJ0UGFydChtYXNrc1sxXSkubGVuZ3RoID4gMSkgeyAvL29wdGlvbmFsIGNvbnRhaW5zIGFub3RoZXIgb3B0aW9uYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVNYXNrKG1hc2tQcmVmaXggKyBtYXNrc1swXSwgbWFza3NbMV0gKyBtYXNrUGFydHNbMV0sIG1ldGFkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2tQYXJ0cy5sZW5ndGggPiAxICYmIHNwbGl0Rmlyc3RPcHRpb25hbFN0YXJ0UGFydChtYXNrUGFydHNbMV0pLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVNYXNrKG1hc2tQcmVmaXggKyBtYXNrc1swXSArIG1hcmtPcHRpb25hbChtYXNrc1sxXSksIG1hc2tQYXJ0c1sxXSwgbWV0YWRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZU1hc2sobWFza1ByZWZpeCArIG1hc2tzWzBdLCBtYXNrUGFydHNbMV0sIG1ldGFkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdNYXNrID0gbWFza1ByZWZpeCArIG1hc2tQYXJ0cztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KG5ld01hc2ssIGdlbm1hc2tzKSA9PSAtMSAmJiBuZXdNYXNrICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VubWFza3MucHVzaChuZXdNYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza1RlbXBsYXRlID0gZ2V0TWFza1RlbXBsYXRlKG5ld01hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWFza1wiOiBuZXdNYXNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfYnVmZmVyXCI6IG1hc2tUZW1wbGF0ZVtcIm1hc2tcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJ1ZmZlclwiOiBtYXNrVGVtcGxhdGVbXCJtYXNrXCJdLnNsaWNlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlc3RzXCI6IGdldFRlc3RpbmdDaGFpbihuZXdNYXNrKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdFZhbGlkUG9zaXRpb25cIjogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdyZWVkeVwiOiBtYXNrVGVtcGxhdGVbXCJncmVlZHlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcGVhdFwiOiBtYXNrVGVtcGxhdGVbXCJyZXBlYXRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFkYXRhXCI6IG1ldGFkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24ob3B0cy5tYXNrKSkgeyAvL2FsbG93IG1hc2sgdG8gYmUgYSBwcmVwcm9jZXNzaW5nIGZuIC0gc2hvdWxkIHJldHVybiBhIHZhbGlkIG1hc2tcclxuICAgICAgICAgICAgICAgIG9wdHMubWFzayA9IG9wdHMubWFzay5jYWxsKHRoaXMsIG9wdHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkLmlzQXJyYXkob3B0cy5tYXNrKSkge1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKG9wdHMubWFzaywgZnVuY3Rpb24gKG5keCwgbXNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1za1tcIm1hc2tcIl0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlTWFzayhcIlwiLCBtc2tbXCJtYXNrXCJdLnRvU3RyaW5nKCksIG1zayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlTWFzayhcIlwiLCBtc2sudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGdlbmVyYXRlTWFzayhcIlwiLCBvcHRzLm1hc2sudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb3B0cy5ncmVlZHkgPyBtcyA6IG1zLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGFbXCJtYXNrXCJdLmxlbmd0aCAtIGJbXCJtYXNrXCJdLmxlbmd0aDsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbXNpZTEwID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaChuZXcgUmVnRXhwKFwibXNpZSAxMFwiLCBcImlcIikpICE9PSBudWxsLFxyXG4gICAgICAgICAgICBpcGhvbmUgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKG5ldyBSZWdFeHAoXCJpcGhvbmVcIiwgXCJpXCIpKSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgYW5kcm9pZCA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gobmV3IFJlZ0V4cChcImFuZHJvaWQuKnNhZmFyaS4qXCIsIFwiaVwiKSkgIT09IG51bGwsXHJcbiAgICAgICAgICAgIGFuZHJvaWRjaHJvbWUgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKG5ldyBSZWdFeHAoXCJhbmRyb2lkLipjaHJvbWUuKlwiLCBcImlcIikpICE9PSBudWxsLFxyXG4gICAgICAgICAgICBwYXN0ZUV2ZW50ID0gaXNJbnB1dEV2ZW50U3VwcG9ydGVkKCdwYXN0ZScpID8gJ3Bhc3RlJyA6IGlzSW5wdXRFdmVudFN1cHBvcnRlZCgnaW5wdXQnKSA/ICdpbnB1dCcgOiBcInByb3BlcnR5Y2hhbmdlXCI7XHJcblxyXG5cclxuICAgICAgICAvL21hc2tpbmcgc2NvcGVcclxuICAgICAgICAvL2FjdGlvbk9iaiBkZWZpbml0aW9uIHNlZSBiZWxvd1xyXG4gICAgICAgIGZ1bmN0aW9uIG1hc2tTY29wZShtYXNrc2V0cywgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCBhY3Rpb25PYmopIHtcclxuICAgICAgICAgICAgdmFyIGlzUlRMID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZU9uRm9jdXMgPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSxcclxuICAgICAgICAgICAgICAgICRlbCwgY2hyb21lVmFsdWVPbklucHV0LFxyXG4gICAgICAgICAgICAgICAgc2tpcEtleVByZXNzRXZlbnQgPSBmYWxzZSwgLy9TYWZhcmkgNS4xLnggLSBtb2RhbCBkaWFsb2cgZmlyZXMga2V5cHJlc3MgdHdpY2Ugd29ya2Fyb3VuZFxyXG4gICAgICAgICAgICAgICAgc2tpcElucHV0RXZlbnQgPSBmYWxzZSwgLy9za2lwIHdoZW4gdHJpZ2dlcmVkIGZyb20gd2l0aGluIGlucHV0bWFza1xyXG4gICAgICAgICAgICAgICAgaWdub3JhYmxlID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9tYXNrc2V0IGhlbHBlcmZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZlTWFza1NldCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXNrc2V0c1thY3RpdmVNYXNrc2V0SW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRBY3RpdmVUZXN0cygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRBY3RpdmVNYXNrU2V0KClbJ3Rlc3RzJ107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEFjdGl2ZU1hc2tTZXQoKVsnX2J1ZmZlciddO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRBY3RpdmVCdWZmZXIoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlTWFza1NldCgpWydidWZmZXInXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaXNWYWxpZChwb3MsIGMsIHN0cmljdCkgeyAvL3N0cmljdCB0cnVlIH4gbm8gY29ycmVjdGlvbiBvciBhdXRvZmlsbFxyXG4gICAgICAgICAgICAgICAgc3RyaWN0ID0gc3RyaWN0ID09PSB0cnVlOyAvL2Fsd2F5cyBzZXQgYSB2YWx1ZSB0byBzdHJpY3QgdG8gcHJldmVudCBwb3NzaWJsZSBzdHJhbmdlIGJlaGF2aW9yIGluIHRoZSBleHRlbnNpb25zIFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIF9pc1ZhbGlkKHBvc2l0aW9uLCBhY3RpdmVNYXNrc2V0LCBjLCBzdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdFBvcyA9IGRldGVybWluZVRlc3RQb3NpdGlvbihwb3NpdGlvbiksIGxvb3BlbmQgPSBjID8gMSA6IDAsIGNocnMgPSAnJywgYnVmZmVyID0gYWN0aXZlTWFza3NldFtcImJ1ZmZlclwiXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gYWN0aXZlTWFza3NldFsndGVzdHMnXVt0ZXN0UG9zXS5jYXJkaW5hbGl0eTsgaSA+IGxvb3BlbmQ7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJzICs9IGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCB0ZXN0UG9zIC0gKGkgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJzICs9IGM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBpcyBmYWxzZSBvciBhIGpzb24gb2JqZWN0ID0+IHsgcG9zOiA/PywgYzogPz99IG9yIHRydWVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aXZlTWFza3NldFsndGVzdHMnXVt0ZXN0UG9zXS5mbiAhPSBudWxsID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldFsndGVzdHMnXVt0ZXN0UG9zXS5mbi50ZXN0KGNocnMsIGJ1ZmZlciwgcG9zaXRpb24sIHN0cmljdCwgb3B0cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoYyA9PSBnZXRCdWZmZXJFbGVtZW50KGFjdGl2ZU1hc2tzZXRbJ19idWZmZXInXSwgcG9zaXRpb24sIHRydWUpIHx8IGMgPT0gb3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IFwicmVmcmVzaFwiOiB0cnVlLCBjOiBnZXRCdWZmZXJFbGVtZW50KGFjdGl2ZU1hc2tzZXRbJ19idWZmZXInXSwgcG9zaXRpb24sIHRydWUpLCBwb3M6IHBvc2l0aW9uIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gUG9zdFByb2Nlc3NSZXN1bHRzKG1hc2tGb3J3YXJkcywgcmVzdWx0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoYXNWYWxpZEFjdHVhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXN1bHRzLCBmdW5jdGlvbiAobmR4LCByc2x0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1ZhbGlkQWN0dWFsID0gJC5pbkFycmF5KHJzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl0sIG1hc2tGb3J3YXJkcykgPT0gLTEgJiYgcnNsdFtcInJlc3VsdFwiXSAhPT0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNWYWxpZEFjdHVhbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNWYWxpZEFjdHVhbCkgeyAvL3N0cmlwIG1hc2tmb3J3YXJkc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gJC5tYXAocmVzdWx0cywgZnVuY3Rpb24gKHJzbHQsIG5keCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdLCBtYXNrRm9yd2FyZHMpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJzbHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBhY3R1YWxMVlA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8va2VlcCBtYXNrZm9yd2FyZHMgd2l0aCB0aGUgbGVhc3QgZm9yd2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbG93ZXN0UG9zID0gLTEsIGxvd2VzdEluZGV4ID0gLTEsIHJzbHRWYWxpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3VsdHMsIGZ1bmN0aW9uIChuZHgsIHJzbHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkocnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSwgbWFza0ZvcndhcmRzKSAhPSAtMSAmJiByc2x0W1wicmVzdWx0XCJdICE9PSBmYWxzZSAmIChsb3dlc3RQb3MgPT0gLTEgfHwgbG93ZXN0UG9zID4gcnNsdFtcInJlc3VsdFwiXVtcInBvc1wiXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RQb3MgPSByc2x0W1wicmVzdWx0XCJdW1wicG9zXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdEluZGV4ID0gcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSAkLm1hcChyZXN1bHRzLCBmdW5jdGlvbiAocnNsdCwgbmR4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KHJzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl0sIG1hc2tGb3J3YXJkcykgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNsdFtcInJlc3VsdFwiXVtcInBvc1wiXSA9PSBsb3dlc3RQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJzbHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyc2x0W1wicmVzdWx0XCJdICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gcG9zOyBpIDwgbG93ZXN0UG9zOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJzbHRWYWxpZCA9IF9pc1ZhbGlkKGksIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dLCBtYXNrc2V0c1tsb3dlc3RJbmRleF1bXCJidWZmZXJcIl1baV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJzbHRWYWxpZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0c1tyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdXVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gbG93ZXN0UG9zIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChtYXNrc2V0c1tyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdXVtcImJ1ZmZlclwiXSwgaSwgbWFza3NldHNbbG93ZXN0SW5kZXhdW1wiYnVmZmVyXCJdW2ldLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0c1tyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdXVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Fsc28gY2hlY2sgY2hlY2sgZm9yIHRoZSBsb3dlc3Rwb3Mgd2l0aCB0aGUgbmV3IGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJzbHRWYWxpZCA9IF9pc1ZhbGlkKGxvd2VzdFBvcywgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV0sIGMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNsdFZhbGlkICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChtYXNrc2V0c1tyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdXVtcImJ1ZmZlclwiXSwgbG93ZXN0UG9zLCBjLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBsb3dlc3RQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIm5keCBcIiArIHJzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl0gKyBcIiB2YWxpZGF0ZSBcIiArIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wiYnVmZmVyXCJdLmpvaW4oJycpICsgXCIgbHYgXCIgKyBtYXNrc2V0c1tyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdXVsnbGFzdFZhbGlkUG9zaXRpb24nXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByc2x0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gX2lzVmFsaWQocG9zLCBnZXRBY3RpdmVNYXNrU2V0KCksIGMsIHN0cmljdCk7IC8vb25seSBjaGVjayB2YWxpZGl0eSBpbiBjdXJyZW50IG1hc2sgd2hlbiB2YWxpZGF0aW5nIHN0cmljdFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geyBcInBvc1wiOiBwb3MgfTsgLy9hbHdheXMgdGFrZSBhIHBvc3NpYmxlIGNvcnJlY3RlZCBtYXNrcG9zaXRpb24gaW50byBhY2NvdW50XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSBbXSwgcmVzdWx0ID0gZmFsc2UsIGN1cnJlbnRBY3RpdmVNYXNrc2V0SW5kZXggPSBhY3RpdmVNYXNrc2V0SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0dWFsQnVmZmVyID0gZ2V0QWN0aXZlQnVmZmVyKCkuc2xpY2UoKSwgYWN0dWFsTFZQID0gZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0dWFsUHJldmlvdXMgPSBzZWVrUHJldmlvdXMocG9zKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXNrRm9yd2FyZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICQuZWFjaChtYXNrc2V0cywgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tQb3MgPSBwb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsdnAgPSBnZXRBY3RpdmVNYXNrU2V0KClbJ2xhc3RWYWxpZFBvc2l0aW9uJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByc2x0VmFsaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsdnAgPT0gYWN0dWFsTFZQKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG1hc2tQb3MgLSBhY3R1YWxMVlApID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBsdnAgPT0gLTEgPyAwIDogbHZwOyBpIDwgbWFza1BvczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJzbHRWYWxpZCA9IF9pc1ZhbGlkKGksIGdldEFjdGl2ZU1hc2tTZXQoKSwgYWN0dWFsQnVmZmVyW2ldLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJzbHRWYWxpZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChnZXRBY3RpdmVCdWZmZXIoKSwgaSwgYWN0dWFsQnVmZmVyW2ldLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyc2x0VmFsaWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByc2x0VmFsaWQgPSB7IFwicG9zXCI6IGkgfTsgLy9hbHdheXMgdGFrZSBhIHBvc3NpYmxlIGNvcnJlY3RlZCBtYXNrcG9zaXRpb24gaW50byBhY2NvdW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VmFsaWRQb3NpdGlvbiA9IHJzbHRWYWxpZC5wb3MgfHwgaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVNYXNrU2V0KClbJ2xhc3RWYWxpZFBvc2l0aW9uJ10gPCBuZXdWYWxpZFBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSA9IG5ld1ZhbGlkUG9zaXRpb247IC8vc2V0IG5ldyBwb3NpdGlvbiBmcm9tIGlzVmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZG9lcyB0aGUgaW5wdXQgbWF0Y2ggb24gYSBmdXJ0aGVyIHBvc2l0aW9uP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc01hc2sobWFza1BvcykgJiYgIV9pc1ZhbGlkKG1hc2tQb3MsIGdldEFjdGl2ZU1hc2tTZXQoKSwgYywgc3RyaWN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXhGb3J3YXJkID0gc2Vla05leHQobWFza1BvcykgLSBtYXNrUG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGZ3ID0gMDsgZncgPCBtYXhGb3J3YXJkOyBmdysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaXNWYWxpZCgrK21hc2tQb3MsIGdldEFjdGl2ZU1hc2tTZXQoKSwgYywgc3RyaWN0KSAhPT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza0ZvcndhcmRzLnB1c2goYWN0aXZlTWFza3NldEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdtYXNrZm9yd2FyZCAnICsgYWN0aXZlTWFza3NldEluZGV4ICsgXCIgcG9zIFwiICsgcG9zICsgXCIgbWFza1BvcyBcIiArIG1hc2tQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddID49IGFjdHVhbExWUCB8fCBhY3RpdmVNYXNrc2V0SW5kZXggPT0gY3VycmVudEFjdGl2ZU1hc2tzZXRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2tQb3MgPj0gMCAmJiBtYXNrUG9zIDwgZ2V0TWFza0xlbmd0aCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gX2lzVmFsaWQobWFza1BvcywgZ2V0QWN0aXZlTWFza1NldCgpLCBjLCBzdHJpY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHsgXCJwb3NcIjogbWFza1BvcyB9OyAvL2Fsd2F5cyB0YWtlIGEgcG9zc2libGUgY29ycmVjdGVkIG1hc2twb3NpdGlvbiBpbnRvIGFjY291bnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VmFsaWRQb3NpdGlvbiA9IHJlc3VsdC5wb3MgfHwgbWFza1BvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSA8IG5ld1ZhbGlkUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbJ2xhc3RWYWxpZFBvc2l0aW9uJ10gPSBuZXdWYWxpZFBvc2l0aW9uOyAvL3NldCBuZXcgcG9zaXRpb24gZnJvbSBpc1ZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJwb3MgXCIgKyBwb3MgKyBcIiBuZHggXCIgKyBhY3RpdmVNYXNrc2V0SW5kZXggKyBcIiB2YWxpZGF0ZSBcIiArIGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpICsgXCIgbHYgXCIgKyBnZXRBY3RpdmVNYXNrU2V0KClbJ2xhc3RWYWxpZFBvc2l0aW9uJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7IFwiYWN0aXZlTWFza3NldEluZGV4XCI6IGluZGV4LCBcInJlc3VsdFwiOiByZXN1bHQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGN1cnJlbnRBY3RpdmVNYXNrc2V0SW5kZXg7IC8vcmVzZXQgYWN0aXZlTWFza3NldEluZGV4XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBvc3RQcm9jZXNzUmVzdWx0cyhtYXNrRm9yd2FyZHMsIHJlc3VsdHMpOyAvL3JldHVybiByZXN1bHRzIG9mIHRoZSBtdWx0aXBsZSBtYXNrIHZhbGlkYXRpb25zXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRldGVybWluZUFjdGl2ZU1hc2tzZXRJbmRleCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50TWFza3NldEluZGV4ID0gYWN0aXZlTWFza3NldEluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZCA9IHsgXCJhY3RpdmVNYXNrc2V0SW5kZXhcIjogMCwgXCJsYXN0VmFsaWRQb3NpdGlvblwiOiAtMSwgXCJuZXh0XCI6IC0xIH07XHJcbiAgICAgICAgICAgICAgICAkLmVhY2gobWFza3NldHMsIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSA+IGhpZ2hlc3RWYWxpZFsnbGFzdFZhbGlkUG9zaXRpb24nXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFZhbGlkW1wiYWN0aXZlTWFza3NldEluZGV4XCJdID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoZXN0VmFsaWRbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZFtcIm5leHRcIl0gPSBzZWVrTmV4dChnZXRBY3RpdmVNYXNrU2V0KClbJ2xhc3RWYWxpZFBvc2l0aW9uJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSA9PSBoaWdoZXN0VmFsaWRbJ2xhc3RWYWxpZFBvc2l0aW9uJ10gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChoaWdoZXN0VmFsaWRbJ25leHQnXSA9PSAtMSB8fCBoaWdoZXN0VmFsaWRbJ25leHQnXSA+IHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoZXN0VmFsaWRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl0gPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZFtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFZhbGlkW1wibmV4dFwiXSA9IHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSBoaWdoZXN0VmFsaWRbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSAhPSAtMSAmJiBtYXNrc2V0c1tjdXJyZW50TWFza3NldEluZGV4XVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID09IGhpZ2hlc3RWYWxpZFtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID8gY3VycmVudE1hc2tzZXRJbmRleCA6IGhpZ2hlc3RWYWxpZFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXTtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50TWFza3NldEluZGV4ICE9IGFjdGl2ZU1hc2tzZXRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQnVmZmVyKGdldEFjdGl2ZUJ1ZmZlcigpLCBzZWVrTmV4dChoaWdoZXN0VmFsaWRbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSksIGdldE1hc2tMZW5ndGgoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wid3JpdGVPdXRCdWZmZXJcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJGVsLmRhdGEoJ19pbnB1dG1hc2snKVsnYWN0aXZlTWFza3NldEluZGV4J10gPSBhY3RpdmVNYXNrc2V0SW5kZXg7IC8vc3RvcmUgdGhlIGFjdGl2ZU1hc2tzZXRJbmRleFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpc01hc2socG9zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVzdFBvcyA9IGRldGVybWluZVRlc3RQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlc3QgPSBnZXRBY3RpdmVUZXN0cygpW3Rlc3RQb3NdO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXN0ICE9IHVuZGVmaW5lZCA/IHRlc3QuZm4gOiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvcyAlIGdldEFjdGl2ZVRlc3RzKCkubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRNYXNrTGVuZ3RoKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMuZ2V0TWFza0xlbmd0aChnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLCBnZXRBY3RpdmVNYXNrU2V0KClbJ2dyZWVkeSddLCBnZXRBY3RpdmVNYXNrU2V0KClbJ3JlcGVhdCddLCBnZXRBY3RpdmVCdWZmZXIoKSwgb3B0cyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcG9zOiBmcm9tIHBvc2l0aW9uXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWVrTmV4dChwb3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYXNrTCA9IGdldE1hc2tMZW5ndGgoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwb3MgPj0gbWFza0wpIHJldHVybiBtYXNrTDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHBvcztcclxuICAgICAgICAgICAgICAgIHdoaWxlICgrK3Bvc2l0aW9uIDwgbWFza0wgJiYgIWlzTWFzayhwb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9wb3M6IGZyb20gcG9zaXRpb25cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlZWtQcmV2aW91cyhwb3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHBvcztcclxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8PSAwKSByZXR1cm4gMDtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoLS1wb3NpdGlvbiA+IDAgJiYgIWlzTWFzayhwb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIHBvc2l0aW9uLCBlbGVtZW50LCBhdXRvUHJlcGFyZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGF1dG9QcmVwYXJlKSBwb3NpdGlvbiA9IHByZXBhcmVCdWZmZXIoYnVmZmVyLCBwb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRlc3QgPSBnZXRBY3RpdmVUZXN0cygpW2RldGVybWluZVRlc3RQb3NpdGlvbihwb3NpdGlvbildO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0gIT0gdW5kZWZpbmVkICYmIHRlc3QgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0ZXN0LmNhc2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidXBwZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtZW50LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxvd2VyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbWVudC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltwb3NpdGlvbl0gPSBlbGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgcG9zaXRpb24sIGF1dG9QcmVwYXJlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXV0b1ByZXBhcmUpIHBvc2l0aW9uID0gcHJlcGFyZUJ1ZmZlcihidWZmZXIsIHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXJbcG9zaXRpb25dO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL25lZWRlZCB0byBoYW5kbGUgdGhlIG5vbi1ncmVlZHkgbWFzayByZXBldGl0aW9uc1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcHJlcGFyZUJ1ZmZlcihidWZmZXIsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgajtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChidWZmZXJbcG9zaXRpb25dID09IHVuZGVmaW5lZCAmJiBidWZmZXIubGVuZ3RoIDwgZ2V0TWFza0xlbmd0aCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKClbal0gIT09IHVuZGVmaW5lZCkgeyAvL2FkZCBhIG5ldyBidWZmZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKVtqKytdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB3cml0ZUJ1ZmZlcihpbnB1dCwgYnVmZmVyLCBjYXJldFBvcykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuX3ZhbHVlU2V0KGJ1ZmZlci5qb2luKCcnKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FyZXRQb3MgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIGNhcmV0UG9zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2xlYXJCdWZmZXIoYnVmZmVyLCBzdGFydCwgZW5kLCBzdHJpcE5vbWFza3MpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydCwgbWFza0wgPSBnZXRNYXNrTGVuZ3RoKCkgOyBpIDwgZW5kICYmIGkgPCBtYXNrTDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmlwTm9tYXNrcyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTWFzayhpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBpLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIGksIGdldEJ1ZmZlckVsZW1lbnQoZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5zbGljZSgpLCBpLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFJlVGFyZ2V0UGxhY2VIb2xkZXIoYnVmZmVyLCBwb3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZXN0UG9zID0gZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgcG9zLCBnZXRCdWZmZXJFbGVtZW50KGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCksIHRlc3RQb3MpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UGxhY2VIb2xkZXIocG9zKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5wbGFjZWhvbGRlci5jaGFyQXQocG9zICUgb3B0cy5wbGFjZWhvbGRlci5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja1ZhbChpbnB1dCwgd3JpdGVPdXQsIHN0cmljdCwgbnB0dmwsIGludGVsbGlDaGVjaykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0VmFsdWUgPSBucHR2bCAhPSB1bmRlZmluZWQgPyBucHR2bC5zbGljZSgpIDogdHJ1bmNhdGVJbnB1dChpbnB1dC5fdmFsdWVHZXQoKSkuc3BsaXQoJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICQuZWFjaChtYXNrc2V0cywgZnVuY3Rpb24gKG5keCwgbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChtcykgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtc1tcImJ1ZmZlclwiXSA9IG1zW1wiX2J1ZmZlclwiXS5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtc1tcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wicFwiXSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0cmljdCAhPT0gdHJ1ZSkgYWN0aXZlTWFza3NldEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIGlmICh3cml0ZU91dCkgaW5wdXQuX3ZhbHVlU2V0KFwiXCIpOyAvL2luaXRpYWwgY2xlYXJcclxuICAgICAgICAgICAgICAgIHZhciBtbCA9IGdldE1hc2tMZW5ndGgoKTtcclxuICAgICAgICAgICAgICAgICQuZWFjaChpbnB1dFZhbHVlLCBmdW5jdGlvbiAobmR4LCBjaGFyQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnRlbGxpQ2hlY2sgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdLCBsdnAgPSBwID09IC0xID8gcCA6IHNlZWtQcmV2aW91cyhwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IGx2cCA9PSAtMSA/IG5keCA6IHNlZWtOZXh0KGx2cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkoY2hhckNvZGUsIGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UobHZwICsgMSwgcG9zKSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXByZXNzRXZlbnQuY2FsbChpbnB1dCwgdW5kZWZpbmVkLCB0cnVlLCBjaGFyQ29kZS5jaGFyQ29kZUF0KDApLCB3cml0ZU91dCwgc3RyaWN0LCBuZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5cHJlc3NFdmVudC5jYWxsKGlucHV0LCB1bmRlZmluZWQsIHRydWUsIGNoYXJDb2RlLmNoYXJDb2RlQXQoMCksIHdyaXRlT3V0LCBzdHJpY3QsIG5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0cmljdCA9PT0gdHJ1ZSAmJiBnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBzZWVrUHJldmlvdXMoZ2V0QWN0aXZlTWFza1NldCgpW1wicFwiXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGVzY2FwZVJlZ2V4KHN0cikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuaW5wdXRtYXNrLmVzY2FwZVJlZ2V4LmNhbGwodGhpcywgc3RyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdHJ1bmNhdGVJbnB1dChpbnB1dFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXRWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXCIgKyBlc2NhcGVSZWdleChnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oJycpKSArIFwiKSokXCIpLCBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2xlYXJPcHRpb25hbFRhaWwoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBnZXRBY3RpdmVCdWZmZXIoKSwgdG1wQnVmZmVyID0gYnVmZmVyLnNsaWNlKCksIHRlc3RQb3MsIHBvcztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHBvcyA9IHRtcEJ1ZmZlci5sZW5ndGggLSAxOyBwb3MgPj0gMDsgcG9zLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdFBvcyA9IGRldGVybWluZVRlc3RQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVUZXN0cygpW3Rlc3RQb3NdLm9wdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNNYXNrKHBvcykgfHwgIWlzVmFsaWQocG9zLCBidWZmZXJbcG9zXSwgdHJ1ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBCdWZmZXIucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIHRtcEJ1ZmZlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVubWFza2VkdmFsdWUoJGlucHV0LCBza2lwRGF0ZXBpY2tlckNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlVGVzdHMoKSAmJiAoc2tpcERhdGVwaWNrZXJDaGVjayA9PT0gdHJ1ZSB8fCAhJGlucHV0Lmhhc0NsYXNzKCdoYXNEYXRlcGlja2VyJykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jaGVja1ZhbChpbnB1dCwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1bVZhbHVlID0gJC5tYXAoZ2V0QWN0aXZlQnVmZmVyKCksIGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNNYXNrKGluZGV4KSAmJiBpc1ZhbGlkKGluZGV4LCBlbGVtZW50LCB0cnVlKSA/IGVsZW1lbnQgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1bm1hc2tlZFZhbHVlID0gKGlzUlRMID8gdW1WYWx1ZS5yZXZlcnNlKCkgOiB1bVZhbHVlKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5vblVuTWFzayAhPSB1bmRlZmluZWQgPyBvcHRzLm9uVW5NYXNrLmNhbGwodGhpcywgZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyksIHVubWFza2VkVmFsdWUpIDogdW5tYXNrZWRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRpbnB1dFswXS5fdmFsdWVHZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gVHJhbnNsYXRlUG9zaXRpb24ocG9zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSVEwgJiYgdHlwZW9mIHBvcyA9PSAnbnVtYmVyJyAmJiAoIW9wdHMuZ3JlZWR5IHx8IG9wdHMucGxhY2Vob2xkZXIgIT0gXCJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmZmckxnaHQgPSBnZXRBY3RpdmVCdWZmZXIoKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gYmZmckxnaHQgLSBwb3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjYXJldChpbnB1dCwgYmVnaW4sIGVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5wdCA9IGlucHV0LmpxdWVyeSAmJiBpbnB1dC5sZW5ndGggPiAwID8gaW5wdXRbMF0gOiBpbnB1dCwgcmFuZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJlZ2luID09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVnaW4gPSBUcmFuc2xhdGVQb3NpdGlvbihiZWdpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gVHJhbnNsYXRlUG9zaXRpb24oZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISQoaW5wdXQpLmlzKCc6dmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gKHR5cGVvZiBlbmQgPT0gJ251bWJlcicpID8gZW5kIDogYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgbnB0LnNjcm9sbExlZnQgPSBucHQuc2Nyb2xsV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuaW5zZXJ0TW9kZSA9PSBmYWxzZSAmJiBiZWdpbiA9PSBlbmQpIGVuZCsrOyAvL3NldCB2aXN1YWxpemF0aW9uIGZvciBpbnNlcnQvb3ZlcndyaXRlIG1vZGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAobnB0LnNldFNlbGVjdGlvblJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5zZWxlY3Rpb25TdGFydCA9IGJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuc2VsZWN0aW9uRW5kID0gYW5kcm9pZCA/IGJlZ2luIDogZW5kO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5wdC5jcmVhdGVUZXh0UmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBucHQuY3JlYXRlVGV4dFJhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIGJlZ2luKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISQoaW5wdXQpLmlzKCc6dmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IFwiYmVnaW5cIjogMCwgXCJlbmRcIjogMCB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobnB0LnNldFNlbGVjdGlvblJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luID0gbnB0LnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSBucHQuc2VsZWN0aW9uRW5kO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uICYmIGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbiA9IDAgLSByYW5nZS5kdXBsaWNhdGUoKS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC0xMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSBiZWdpbiArIHJhbmdlLnRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBiZWdpbiA9IFRyYW5zbGF0ZVBvc2l0aW9uKGJlZ2luKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBUcmFuc2xhdGVQb3NpdGlvbihlbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IFwiYmVnaW5cIjogYmVnaW4sIFwiZW5kXCI6IGVuZCB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpc0NvbXBsZXRlKGJ1ZmZlcikgeyAvL3JldHVybiB0cnVlIC8gZmFsc2UgLyB1bmRlZmluZWQgKHJlcGVhdCAqKVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMucmVwZWF0ID09IFwiKlwiKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRlID0gZmFsc2UsIGhpZ2hlc3RWYWxpZFBvc2l0aW9uID0gMCwgY3VycmVudEFjdGl2ZU1hc2tzZXRJbmRleCA9IGFjdGl2ZU1hc2tzZXRJbmRleDtcclxuICAgICAgICAgICAgICAgICQuZWFjaChtYXNrc2V0cywgZnVuY3Rpb24gKG5keCwgbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChtcykgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSBuZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbWwgPSBzZWVrUHJldmlvdXMoZ2V0TWFza0xlbmd0aCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1zW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPj0gaGlnaGVzdFZhbGlkUG9zaXRpb24gJiYgbXNbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9PSBhbWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtc0NvbXBsZXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGFtbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2sgPSBpc01hc2soaSksIHRlc3RQb3MgPSBkZXRlcm1pbmVUZXN0UG9zaXRpb24oaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChtYXNrICYmIChidWZmZXJbaV0gPT0gdW5kZWZpbmVkIHx8IGJ1ZmZlcltpXSA9PSBnZXRQbGFjZUhvbGRlcihpKSkpIHx8ICghbWFzayAmJiBidWZmZXJbaV0gIT0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKVt0ZXN0UG9zXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNDb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSA9IGNvbXBsZXRlIHx8IG1zQ29tcGxldGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUpIC8vYnJlYWsgbG9vcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWdoZXN0VmFsaWRQb3NpdGlvbiA9IG1zW1wibGFzdFZhbGlkUG9zaXRpb25cIl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSBjdXJyZW50QWN0aXZlTWFza3NldEluZGV4OyAvL3Jlc2V0IGFjdGl2ZU1hc2tzZXRcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wbGV0ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaXNTZWxlY3Rpb24oYmVnaW4sIGVuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzUlRMID8gKGJlZ2luIC0gZW5kKSA+IDEgfHwgKChiZWdpbiAtIGVuZCkgPT0gMSAmJiBvcHRzLmluc2VydE1vZGUpIDpcclxuICAgICAgICAgICAgICAgICAgICAoZW5kIC0gYmVnaW4pID4gMSB8fCAoKGVuZCAtIGJlZ2luKSA9PSAxICYmIG9wdHMuaW5zZXJ0TW9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL3ByaXZhdGUgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGluc3RhbGxFdmVudFJ1bGVyKG5wdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50cyA9ICQuX2RhdGEobnB0KS5ldmVudHM7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKGV2ZW50cywgZnVuY3Rpb24gKGV2ZW50VHlwZSwgZXZlbnRIYW5kbGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChldmVudEhhbmRsZXJzLCBmdW5jdGlvbiAobmR4LCBldmVudEhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50SGFuZGxlci5uYW1lc3BhY2UgPT0gXCJpbnB1dG1hc2tcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50SGFuZGxlci50eXBlICE9IFwic2V0dmFsdWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoYW5kbGVyID0gZXZlbnRIYW5kbGVyLmhhbmRsZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyLmhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkT25seSB8fCB0aGlzLmRpc2FibGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcGF0Y2hWYWx1ZVByb3BlcnR5KG5wdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlUHJvcGVydHk7XHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcilcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihucHQsIFwidmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVQcm9wZXJ0eSAmJiB2YWx1ZVByb3BlcnR5LmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnB0Ll92YWx1ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVHZXQgPSB2YWx1ZVByb3BlcnR5LmdldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlU2V0ID0gdmFsdWVQcm9wZXJ0eS5zZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5fdmFsdWVHZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNSVEwgPyB2YWx1ZUdldC5jYWxsKHRoaXMpLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiB2YWx1ZUdldC5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX3ZhbHVlU2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldC5jYWxsKHRoaXMsIGlzUlRMID8gdmFsdWUuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKSA6IHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucHQsIFwidmFsdWVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRzZWxmID0gJCh0aGlzKSwgaW5wdXREYXRhID0gJCh0aGlzKS5kYXRhKCdfaW5wdXRtYXNrJyksIG1hc2tzZXRzID0gaW5wdXREYXRhWydtYXNrc2V0cyddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSBpbnB1dERhdGFbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dERhdGEgJiYgaW5wdXREYXRhWydvcHRzJ10uYXV0b1VubWFzayA/ICRzZWxmLmlucHV0bWFzaygndW5tYXNrZWR2YWx1ZScpIDogdmFsdWVHZXQuY2FsbCh0aGlzKSAhPSBtYXNrc2V0c1thY3RpdmVNYXNrc2V0SW5kZXhdWydfYnVmZmVyJ10uam9pbignJykgPyB2YWx1ZUdldC5jYWxsKHRoaXMpIDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldC5jYWxsKHRoaXMsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdzZXR2YWx1ZS5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5fX2xvb2t1cEdldHRlcl9fICYmIG5wdC5fX2xvb2t1cEdldHRlcl9fKFwidmFsdWVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5wdC5fdmFsdWVHZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlR2V0ID0gbnB0Ll9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlU2V0ID0gbnB0Ll9fbG9va3VwU2V0dGVyX18oXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0Ll92YWx1ZUdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1JUTCA/IHZhbHVlR2V0LmNhbGwodGhpcykuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKSA6IHZhbHVlR2V0LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5fdmFsdWVTZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0LmNhbGwodGhpcywgaXNSVEwgPyB2YWx1ZS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0Ll9fZGVmaW5lR2V0dGVyX18oXCJ2YWx1ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHNlbGYgPSAkKHRoaXMpLCBpbnB1dERhdGEgPSAkKHRoaXMpLmRhdGEoJ19pbnB1dG1hc2snKSwgbWFza3NldHMgPSBpbnB1dERhdGFbJ21hc2tzZXRzJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5wdXREYXRhWydhY3RpdmVNYXNrc2V0SW5kZXgnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dERhdGEgJiYgaW5wdXREYXRhWydvcHRzJ10uYXV0b1VubWFzayA/ICRzZWxmLmlucHV0bWFzaygndW5tYXNrZWR2YWx1ZScpIDogdmFsdWVHZXQuY2FsbCh0aGlzKSAhPSBtYXNrc2V0c1thY3RpdmVNYXNrc2V0SW5kZXhdWydfYnVmZmVyJ10uam9pbignJykgPyB2YWx1ZUdldC5jYWxsKHRoaXMpIDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX19kZWZpbmVTZXR0ZXJfXyhcInZhbHVlXCIsIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXQuY2FsbCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdzZXR2YWx1ZS5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5wdC5fdmFsdWVHZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0Ll92YWx1ZUdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlzUlRMID8gdGhpcy52YWx1ZS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogdGhpcy52YWx1ZTsgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0Ll92YWx1ZVNldCA9IGZ1bmN0aW9uICh2YWx1ZSkgeyB0aGlzLnZhbHVlID0gaXNSVEwgPyB2YWx1ZS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogdmFsdWU7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLnZhbEhvb2tzLnRleHQgPT0gdW5kZWZpbmVkIHx8ICQudmFsSG9va3MudGV4dC5pbnB1dG1hc2twYXRjaCAhPSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZUdldCA9ICQudmFsSG9va3MudGV4dCAmJiAkLnZhbEhvb2tzLnRleHQuZ2V0ID8gJC52YWxIb29rcy50ZXh0LmdldCA6IGZ1bmN0aW9uIChlbGVtKSB7IHJldHVybiBlbGVtLnZhbHVlOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVTZXQgPSAkLnZhbEhvb2tzLnRleHQgJiYgJC52YWxIb29rcy50ZXh0LnNldCA/ICQudmFsSG9va3MudGV4dC5zZXQgOiBmdW5jdGlvbiAoZWxlbSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV4dGVuZCgkLnZhbEhvb2tzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGVsZW0gPSAkKGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZW0uZGF0YSgnX2lucHV0bWFzaycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZW0uZGF0YSgnX2lucHV0bWFzaycpWydvcHRzJ10uYXV0b1VubWFzaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGVsZW0uaW5wdXRtYXNrKCd1bm1hc2tlZHZhbHVlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdmFsdWVHZXQoZWxlbSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YSA9ICRlbGVtLmRhdGEoJ19pbnB1dG1hc2snKSwgbWFza3NldHMgPSBpbnB1dERhdGFbJ21hc2tzZXRzJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGlucHV0RGF0YVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAhPSBtYXNrc2V0c1thY3RpdmVNYXNrc2V0SW5kZXhdWydfYnVmZmVyJ10uam9pbignJykgPyByZXN1bHQgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybiB2YWx1ZUdldChlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGVsZW0sIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWx1ZVNldChlbGVtLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbS5kYXRhKCdfaW5wdXRtYXNrJykpICRlbGVtLnRyaWdnZXJIYW5kbGVyKCdzZXR2YWx1ZS5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0bWFza3BhdGNoOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9zaGlmdCBjaGFycyB0byBsZWZ0IGZyb20gc3RhcnQgdG8gZW5kIGFuZCBwdXQgYyBhdCBlbmQgcG9zaXRpb24gaWYgZGVmaW5lZFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2hpZnRMKHN0YXJ0LCBlbmQsIGMsIG1hc2tKdW1wcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hc2tKdW1wcyAhPT0gZmFsc2UpIC8vanVtcGluZyBvdmVyIG5vbm1hc2sgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWlzTWFzayhzdGFydCkgJiYgc3RhcnQgLSAxID49IDApIHN0YXJ0LS07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQgJiYgaSA8IGdldE1hc2tMZW5ndGgoKSA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01hc2soaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVUYXJnZXRQbGFjZUhvbGRlcihidWZmZXIsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaiA9IHNlZWtOZXh0KGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAgIT0gZ2V0UGxhY2VIb2xkZXIoaikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqIDwgZ2V0TWFza0xlbmd0aCgpICYmIGlzVmFsaWQoaSwgcCwgdHJ1ZSkgIT09IGZhbHNlICYmIGdldEFjdGl2ZVRlc3RzKClbZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKGkpXS5kZWYgPT0gZ2V0QWN0aXZlVGVzdHMoKVtkZXRlcm1pbmVUZXN0UG9zaXRpb24oaildLmRlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBpLCBwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTWFzayhpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZVRhcmdldFBsYWNlSG9sZGVyKGJ1ZmZlciwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGMgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHNldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBzZWVrUHJldmlvdXMoZW5kKSwgYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVtcImdyZWVkeVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmJ1ZmZlciA9IHRydW5jYXRlSW5wdXQoYnVmZmVyLmpvaW4oJycpKS5zcGxpdCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IHRyYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgYmwgPSBidWZmZXIubGVuZ3RoOyBpIDwgYmw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXJbaV0gPSB0cmJ1ZmZlcltpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPT0gMCkgZ2V0QWN0aXZlTWFza1NldCgpW1wiYnVmZmVyXCJdID0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0OyAvL3JldHVybiB0aGUgdXNlZCBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzaGlmdFIoc3RhcnQsIGVuZCwgYykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBzdGFydCwgdHJ1ZSkgIT0gZ2V0UGxhY2VIb2xkZXIoc3RhcnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHNlZWtQcmV2aW91cyhlbmQpIDsgaSA+IHN0YXJ0ICYmIGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc01hc2soaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqID0gc2Vla1ByZXZpb3VzKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBnZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodCAhPSBnZXRQbGFjZUhvbGRlcihqKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkKGosIHQsIHRydWUpICE9PSBmYWxzZSAmJiBnZXRBY3RpdmVUZXN0cygpW2RldGVybWluZVRlc3RQb3NpdGlvbihpKV0uZGVmID09IGdldEFjdGl2ZVRlc3RzKClbZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKGopXS5kZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIGksIHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZVRhcmdldFBsYWNlSG9sZGVyKGJ1ZmZlciwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAvL2Vsc2UgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVUYXJnZXRQbGFjZUhvbGRlcihidWZmZXIsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjICE9IHVuZGVmaW5lZCAmJiBnZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgc3RhcnQpID09IGdldFBsYWNlSG9sZGVyKHN0YXJ0KSlcclxuICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgc3RhcnQsIGMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbmd0aEJlZm9yZSA9IGJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpW1wiZ3JlZWR5XCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYnVmZmVyID0gdHJ1bmNhdGVJbnB1dChidWZmZXIuam9pbignJykpLnNwbGl0KCcnKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gdHJidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBibCA9IGJ1ZmZlci5sZW5ndGg7IGkgPCBibDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltpXSA9IHRyYnVmZmVyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCA9PSAwKSBnZXRBY3RpdmVNYXNrU2V0KClbXCJidWZmZXJcIl0gPSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kIC0gKGxlbmd0aEJlZm9yZSAtIGJ1ZmZlci5sZW5ndGgpOyAvL3JldHVybiBuZXcgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gSGFuZGxlUmVtb3ZlKGlucHV0LCBrLCBwb3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRzLm51bWVyaWNJbnB1dCB8fCBpc1JUTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9wdHMua2V5Q29kZS5CQUNLU1BBQ0U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gb3B0cy5rZXlDb2RlLkRFTEVURTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9wdHMua2V5Q29kZS5ERUxFVEU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNSVEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmQgPSBwb3MuZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MuZW5kID0gcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MuYmVnaW4gPSBwZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNTZWxlY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvcy5iZWdpbiA9PSBwb3MuZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc0JlZ2luID0gayA9PSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFID8gcG9zLmJlZ2luIC0gMSA6IHBvcy5iZWdpbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5pc051bWVyaWMgJiYgb3B0cy5yYWRpeFBvaW50ICE9IFwiXCIgJiYgZ2V0QWN0aXZlQnVmZmVyKClbcG9zQmVnaW5dID09IG9wdHMucmFkaXhQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MuYmVnaW4gPSAoZ2V0QWN0aXZlQnVmZmVyKCkubGVuZ3RoIC0gMSA9PSBwb3NCZWdpbikgLyogcmFkaXhQb2ludCBpcyBsYXRlc3Q/IGRlbGV0ZSBpdCAqLyA/IHBvcy5iZWdpbiA6IGsgPT0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRSA/IHBvc0JlZ2luIDogc2Vla05leHQocG9zQmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MuZW5kID0gcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT0gb3B0cy5rZXlDb2RlLkRFTEVURSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmVuZCsrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3MuZW5kIC0gcG9zLmJlZ2luID09IDEgJiYgIW9wdHMuaW5zZXJ0TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPT0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY2xlYXJCdWZmZXIoZ2V0QWN0aXZlQnVmZmVyKCksIHBvcy5iZWdpbiwgcG9zLmVuZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG1sID0gZ2V0TWFza0xlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuZ3JlZWR5ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hpZnRMKHBvcy5iZWdpbiwgbWwsIHVuZGVmaW5lZCwgIWlzUlRMICYmIChrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UgJiYgIWlzU2VsZWN0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdwb3MgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHBvcy5iZWdpbjsgaSA8IHBvcy5lbmQ7IGkrKykgeyAvL3NlZWtuZXh0IHRvIHNraXAgcGxhY2Vob2xkZXJzIGF0IHN0YXJ0IGluIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXNrKGkpIHx8ICFpc1NlbGVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld3BvcyA9IHNoaWZ0TChwb3MuYmVnaW4sIG1sLCB1bmRlZmluZWQsICFpc1JUTCAmJiAoayA9PSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFICYmICFpc1NlbGVjdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU2VsZWN0aW9uKSBwb3MuYmVnaW4gPSBuZXdwb3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RNYXNrUG9zID0gc2Vla05leHQoLTEpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJCdWZmZXIoZ2V0QWN0aXZlQnVmZmVyKCksIHBvcy5iZWdpbiwgcG9zLmVuZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBjaGVja1ZhbChpbnB1dCwgZmFsc2UsIG1hc2tzZXRzWzFdID09IHVuZGVmaW5lZCB8fCBmaXJzdE1hc2tQb3MgPj0gcG9zLmVuZCwgZ2V0QWN0aXZlQnVmZmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSA8IGZpcnN0TWFza1Bvcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wicFwiXSA9IGZpcnN0TWFza1BvcztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wicFwiXSA9IHBvcy5iZWdpbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24ga2V5ZG93bkV2ZW50KGUpIHtcclxuICAgICAgICAgICAgICAgIC8vU2FmYXJpIDUuMS54IC0gbW9kYWwgZGlhbG9nIGZpcmVzIGtleXByZXNzIHR3aWNlIHdvcmthcm91bmRcclxuICAgICAgICAgICAgICAgIHNraXBLZXlQcmVzc0V2ZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLCAkaW5wdXQgPSAkKGlucHV0KSwgayA9IGUua2V5Q29kZSwgcG9zID0gY2FyZXQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYmFja3NwYWNlLCBkZWxldGUsIGFuZCBlc2NhcGUgZ2V0IHNwZWNpYWwgdHJlYXRtZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFIHx8IGsgPT0gb3B0cy5rZXlDb2RlLkRFTEVURSB8fCAoaXBob25lICYmIGsgPT0gMTI3KSB8fCBlLmN0cmxLZXkgJiYgayA9PSA4OCkgeyAvL2JhY2tzcGFjZS9kZWxldGVcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vc3RvcCBkZWZhdWx0IGFjdGlvbiBidXQgYWxsb3cgcHJvcGFnYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBpZiAoayA9PSA4OCkgdmFsdWVPbkZvY3VzID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgSGFuZGxlUmVtb3ZlKGlucHV0LCBrLCBwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRldGVybWluZUFjdGl2ZU1hc2tzZXRJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKGlucHV0LCBnZXRBY3RpdmVCdWZmZXIoKSwgZ2V0QWN0aXZlTWFza1NldCgpW1wicFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Ll92YWx1ZUdldCgpID09IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKCdjbGVhcmVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dUb29sdGlwKSB7IC8vdXBkYXRlIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnByb3AoXCJ0aXRsZVwiLCBnZXRBY3RpdmVNYXNrU2V0KClbXCJtYXNrXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPT0gb3B0cy5rZXlDb2RlLkVORCB8fCBrID09IG9wdHMua2V5Q29kZS5QQUdFX0RPV04pIHsgLy93aGVuIEVORCBvciBQQUdFX0RPV04gcHJlc3NlZCBzZXQgcG9zaXRpb24gYXQgbGFzdG1hdGNoXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLmluc2VydE1vZGUgJiYgY2FyZXRQb3MgPT0gZ2V0TWFza0xlbmd0aCgpICYmICFlLnNoaWZ0S2V5KSBjYXJldFBvcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgZS5zaGlmdEtleSA/IHBvcy5iZWdpbiA6IGNhcmV0UG9zLCBjYXJldFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChrID09IG9wdHMua2V5Q29kZS5IT01FICYmICFlLnNoaWZ0S2V5KSB8fCBrID09IG9wdHMua2V5Q29kZS5QQUdFX1VQKSB7IC8vSG9tZSBvciBwYWdlX3VwXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIDAsIGUuc2hpZnRLZXkgPyBwb3MuYmVnaW4gOiAwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuRVNDQVBFIHx8IChrID09IDkwICYmIGUuY3RybEtleSkpIHsgLy9lc2NhcGUgJiYgdW5kb1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsKGlucHV0LCB0cnVlLCBmYWxzZSwgdmFsdWVPbkZvY3VzLnNwbGl0KCcnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPT0gb3B0cy5rZXlDb2RlLklOU0VSVCAmJiAhKGUuc2hpZnRLZXkgfHwgZS5jdHJsS2V5KSkgeyAvL2luc2VydFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuaW5zZXJ0TW9kZSA9ICFvcHRzLmluc2VydE1vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsICFvcHRzLmluc2VydE1vZGUgJiYgcG9zLmJlZ2luID09IGdldE1hc2tMZW5ndGgoKSA/IHBvcy5iZWdpbiAtIDEgOiBwb3MuYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLmluc2VydE1vZGUgPT0gZmFsc2UgJiYgIWUuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoayA9PSBvcHRzLmtleUNvZGUuUklHSFQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3MgPSBjYXJldChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgY2FyZXRQb3MuYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPT0gb3B0cy5rZXlDb2RlLkxFRlQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3MgPSBjYXJldChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgY2FyZXRQb3MuYmVnaW4gLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50Q2FyZXRQb3MgPSBjYXJldChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5vbktleURvd24uY2FsbCh0aGlzLCBlLCBnZXRBY3RpdmVCdWZmZXIoKSwgb3B0cykgPT09IHRydWUpIC8vZXh0cmEgc3R1ZmYgdG8gZXhlY3V0ZSBvbiBrZXlkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIGN1cnJlbnRDYXJldFBvcy5iZWdpbiwgY3VycmVudENhcmV0UG9zLmVuZCk7XHJcbiAgICAgICAgICAgICAgICBpZ25vcmFibGUgPSAkLmluQXJyYXkoaywgb3B0cy5pZ25vcmFibGVzKSAhPSAtMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGtleXByZXNzRXZlbnQoZSwgY2hlY2t2YWwsIGssIHdyaXRlT3V0LCBzdHJpY3QsIG5keCkge1xyXG4gICAgICAgICAgICAgICAgLy9TYWZhcmkgNS4xLnggLSBtb2RhbCBkaWFsb2cgZmlyZXMga2V5cHJlc3MgdHdpY2Ugd29ya2Fyb3VuZFxyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT0gdW5kZWZpbmVkICYmIHNraXBLZXlQcmVzc0V2ZW50KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBza2lwS2V5UHJlc3NFdmVudCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcywgJGlucHV0ID0gJChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIGsgPSBjaGVja3ZhbCA/IGsgOiAoZS53aGljaCB8fCBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrdmFsICE9PSB0cnVlICYmICghKGUuY3RybEtleSAmJiBlLmFsdEtleSkgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkgfHwgaWdub3JhYmxlKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zcGVjaWFsIHRyZWF0IHRoZSBkZWNpbWFsIHNlcGFyYXRvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2t2YWwgIT09IHRydWUgJiYgayA9PSA0NiAmJiBlLnNoaWZ0S2V5ID09IGZhbHNlICYmIG9wdHMucmFkaXhQb2ludCA9PSBcIixcIikgayA9IDQ0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcywgcmVzdWx0cywgcmVzdWx0LCBjID0gU3RyaW5nLmZyb21DaGFyQ29kZShrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrdmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGNhcmV0ID0gc3RyaWN0ID8gbmR4IDogZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0geyBiZWdpbjogcGNhcmV0LCBlbmQ6IHBjYXJldCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gY2FyZXQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Nob3VsZCB3ZSBjbGVhciBhIHBvc3NpYmxlIHNlbGVjdGlvbj8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc1NsY3RuID0gaXNTZWxlY3Rpb24ocG9zLmJlZ2luLCBwb3MuZW5kKSwgcmVkZXRlcm1pbmVMVlAgPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxJbmRleCA9IGFjdGl2ZU1hc2tzZXRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzU2xjdG4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGluaXRpYWxJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChtYXNrc2V0cywgZnVuY3Rpb24gKG5keCwgbG1udCkgeyAvL2luaXQgdW5kb2J1ZmZlciBmb3IgcmVjb3Zlcnkgd2hlbiBub3QgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChsbW50KSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IG5keDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1widW5kb0J1ZmZlclwiXSA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGFuZGxlUmVtb3ZlKGlucHV0LCBvcHRzLmtleUNvZGUuREVMRVRFLCBwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLmluc2VydE1vZGUpIHsgLy9wcmVzZXJ2ZSBzb21lIHNwYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBsbW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGxtbnQpID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IG5keDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0Uihwb3MuYmVnaW4sIGdldE1hc2tMZW5ndGgoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5pdGlhbEluZGV4OyAvL3Jlc3RvcmUgaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGl4UG9zaXRpb24gPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKS5pbmRleE9mKG9wdHMucmFkaXhQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmlzTnVtZXJpYyAmJiBjaGVja3ZhbCAhPT0gdHJ1ZSAmJiByYWRpeFBvc2l0aW9uICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5ncmVlZHkgJiYgcG9zLmJlZ2luIDw9IHJhZGl4UG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MuYmVnaW4gPSBzZWVrUHJldmlvdXMocG9zLmJlZ2luKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MuZW5kID0gcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjID09IG9wdHMucmFkaXhQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA9IHJhZGl4UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmVuZCA9IHBvcy5iZWdpbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwID0gcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gaXNWYWxpZChwLCBjLCBzdHJpY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaWN0ID09PSB0cnVlKSByZXN1bHRzID0gW3sgXCJhY3RpdmVNYXNrc2V0SW5kZXhcIjogYWN0aXZlTWFza3NldEluZGV4LCBcInJlc3VsdFwiOiByZXN1bHRzIH1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWluaW1hbEZvcndhcmRQb3NpdGlvbiA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gocmVzdWx0cywgZnVuY3Rpb24gKGluZGV4LCByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IHJlc3VsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVtcIndyaXRlT3V0QnVmZmVyXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBucCA9IHJlc3VsdFtcInJlc3VsdFwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChucCAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmcmVzaCA9IGZhbHNlLCBidWZmZXIgPSBnZXRBY3RpdmVCdWZmZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnAgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaCA9IG5wW1wicmVmcmVzaFwiXTsgLy9vbmx5IHJld3JpdGUgYnVmZmVyIGZyb20gaXNWYWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gbnAucG9zICE9IHVuZGVmaW5lZCA/IG5wLnBvcyA6IHA7IC8vc2V0IG5ldyBwb3NpdGlvbiBmcm9tIGlzVmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IG5wLmMgIT0gdW5kZWZpbmVkID8gbnAuYyA6IGM7IC8vc2V0IG5ldyBjaGFyIGZyb20gaXNWYWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVmcmVzaCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5pbnNlcnRNb2RlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VW5tYXNrZWRQb3NpdGlvbiA9IGdldE1hc2tMZW5ndGgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZnJDbG9uZSA9IGJ1ZmZlci5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGdldEJ1ZmZlckVsZW1lbnQoYmZyQ2xvbmUsIGxhc3RVbm1hc2tlZFBvc2l0aW9uLCB0cnVlKSAhPSBnZXRQbGFjZUhvbGRlcihsYXN0VW5tYXNrZWRQb3NpdGlvbikgJiYgbGFzdFVubWFza2VkUG9zaXRpb24gPj0gcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RVbm1hc2tlZFBvc2l0aW9uID0gbGFzdFVubWFza2VkUG9zaXRpb24gPT0gMCA/IC0xIDogc2Vla1ByZXZpb3VzKGxhc3RVbm1hc2tlZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0VW5tYXNrZWRQb3NpdGlvbiA+PSBwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnRSKHAsIGdldE1hc2tMZW5ndGgoKSwgYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zaGlmdCB0aGUgbHZwIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsdnAgPSBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSwgbmx2cCA9IHNlZWtOZXh0KGx2cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5sdnAgIT0gZ2V0TWFza0xlbmd0aCgpICYmIGx2cCA+PSBwICYmIChnZXRCdWZmZXJFbGVtZW50KGdldEFjdGl2ZUJ1ZmZlcigpLCBubHZwLCB0cnVlKSAhPSBnZXRQbGFjZUhvbGRlcihubHZwKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBubHZwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBnZXRBY3RpdmVNYXNrU2V0KClbXCJ3cml0ZU91dEJ1ZmZlclwiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIHAsIGMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWluaW1hbEZvcndhcmRQb3NpdGlvbiA9PSAtMSB8fCBtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID4gc2Vla05leHQocCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltYWxGb3J3YXJkUG9zaXRpb24gPSBzZWVrTmV4dChwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dFBvcyA9IHAgPCBnZXRNYXNrTGVuZ3RoKCkgPyBwICsgMSA6IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID09IC0xIHx8IG1pbmltYWxGb3J3YXJkUG9zaXRpb24gPiBuZXh0UG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID0gbmV4dFBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWluaW1hbEZvcndhcmRQb3NpdGlvbiA+IGdldEFjdGl2ZU1hc2tTZXQoKVtcInBcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVtcInBcIl0gPSBtaW5pbWFsRm9yd2FyZFBvc2l0aW9uOyAvL25lZWRlZCBmb3IgY2hlY2t2YWwgc3RyaWN0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJpY3QgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGluaXRpYWxJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGVybWluZUFjdGl2ZU1hc2tzZXRJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3cml0ZU91dCAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXN1bHRzLCBmdW5jdGlvbiAobmR4LCByc2x0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl0gPT0gYWN0aXZlTWFza3NldEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJzbHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBvcHRzLm9uS2V5VmFsaWRhdGlvbi5jYWxsKHNlbGYsIHJlc3VsdFtcInJlc3VsdFwiXSwgb3B0cyk7IH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVNYXNrU2V0KClbXCJ3cml0ZU91dEJ1ZmZlclwiXSAmJiByZXN1bHRbXCJyZXN1bHRcIl0gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBnZXRBY3RpdmVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdDYXJldFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2t2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmV0UG9zaXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5udW1lcmljSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwID4gcmFkaXhQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmV0UG9zaXRpb24gPSBzZWVrUHJldmlvdXMobWluaW1hbEZvcndhcmRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT0gb3B0cy5yYWRpeFBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZXRQb3NpdGlvbiA9IG1pbmltYWxGb3J3YXJkUG9zaXRpb24gLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIG5ld0NhcmV0UG9zaXRpb24gPSBzZWVrUHJldmlvdXMobWluaW1hbEZvcndhcmRQb3NpdGlvbiAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZXRQb3NpdGlvbiA9IG1pbmltYWxGb3J3YXJkUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKGlucHV0LCBidWZmZXIsIG5ld0NhcmV0UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2t2YWwgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyAvL3RpbWVvdXQgbmVlZGVkIGZvciBJRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBsZXRlKGJ1ZmZlcikgPT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwiY29tcGxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpcElucHV0RXZlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTbGN0bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJidWZmZXJcIl0gPSBnZXRBY3RpdmVNYXNrU2V0KClbXCJ1bmRvQnVmZmVyXCJdLnNwbGl0KCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dUb29sdGlwKSB7IC8vdXBkYXRlIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5wcm9wKFwidGl0bGVcIiwgZ2V0QWN0aXZlTWFza1NldCgpW1wibWFza1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmVlZGVkIGZvciBJRTggYW5kIGJlbG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0ID8gZS5wcmV2ZW50RGVmYXVsdCgpIDogZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24ga2V5dXBFdmVudChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzLCBrID0gZS5rZXlDb2RlLCBidWZmZXIgPSBnZXRBY3RpdmVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5kcm9pZGNocm9tZSAmJiBrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hyb21lVmFsdWVPbklucHV0ID09IGlucHV0Ll92YWx1ZUdldCgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlkb3duRXZlbnQuY2FsbCh0aGlzLCBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBvcHRzLm9uS2V5VXAuY2FsbCh0aGlzLCBlLCBidWZmZXIsIG9wdHMpOyAvL2V4dHJhIHN0dWZmIHRvIGV4ZWN1dGUgb24ga2V5dXBcclxuICAgICAgICAgICAgICAgIGlmIChrID09IG9wdHMua2V5Q29kZS5UQUIgJiYgb3B0cy5zaG93TWFza09uRm9jdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGlucHV0Lmhhc0NsYXNzKCdmb2N1cy5pbnB1dG1hc2snKSAmJiBpbnB1dC5fdmFsdWVHZXQoKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKGlucHV0LCBidWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlT25Gb2N1cyA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKGlucHV0LCBidWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLmpvaW4oJycpID09IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykgJiYgJC5pbkFycmF5KG9wdHMucmFkaXhQb2ludCwgYnVmZmVyKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIFRyYW5zbGF0ZVBvc2l0aW9uKDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBUcmFuc2xhdGVQb3NpdGlvbigwKSwgVHJhbnNsYXRlUG9zaXRpb24oZ2V0TWFza0xlbmd0aCgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpbnB1dEV2ZW50KGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChza2lwSW5wdXRFdmVudCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNraXBJbnB1dEV2ZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLCAkaW5wdXQgPSAkKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaHJvbWVWYWx1ZU9uSW5wdXQgPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrVmFsKGlucHV0LCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGdldEFjdGl2ZUJ1ZmZlcigpKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0NvbXBsZXRlKGdldEFjdGl2ZUJ1ZmZlcigpKSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQudHJpZ2dlcihcImNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgJGlucHV0LmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hc2soZWwpIHtcclxuICAgICAgICAgICAgICAgICRlbCA9ICQoZWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRlbC5pcyhcIjppbnB1dFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc3RvcmUgdGVzdHMgJiBvcmlnaW5hbCBidWZmZXIgaW4gdGhlIGlucHV0IGVsZW1lbnQgLSB1c2VkIHRvIGdldCB0aGUgdW5tYXNrZWQgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAkZWwuZGF0YSgnX2lucHV0bWFzaycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ21hc2tzZXRzJzogbWFza3NldHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhY3RpdmVNYXNrc2V0SW5kZXgnOiBhY3RpdmVNYXNrc2V0SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdvcHRzJzogb3B0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lzUlRMJzogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaG93IHRvb2x0aXBcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zaG93VG9vbHRpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwucHJvcChcInRpdGxlXCIsIGdldEFjdGl2ZU1hc2tTZXQoKVtcIm1hc2tcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb3JyZWN0IGdyZWVkeSBzZXR0aW5nIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVsnZ3JlZWR5J10gPSBnZXRBY3RpdmVNYXNrU2V0KClbJ2dyZWVkeSddID8gZ2V0QWN0aXZlTWFza1NldCgpWydncmVlZHknXSA6IGdldEFjdGl2ZU1hc2tTZXQoKVsncmVwZWF0J10gPT0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9oYW5kbGUgbWF4bGVuZ3RoIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkZWwuYXR0cihcIm1heExlbmd0aFwiKSAhPSBudWxsKSAvL29ubHkgd2hlbiB0aGUgYXR0cmlidXRlIGlzIHNldFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heExlbmd0aCA9ICRlbC5wcm9wKCdtYXhMZW5ndGgnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1heExlbmd0aCA+IC0xKSB7IC8vaGFuZGxlICotcmVwZWF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gobWFza3NldHMsIGZ1bmN0aW9uIChuZHgsIG1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAobXMpID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1zW1wicmVwZWF0XCJdID09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc1tcInJlcGVhdFwiXSA9IG1heExlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRNYXNrTGVuZ3RoKCkgPj0gbWF4TGVuZ3RoICYmIG1heExlbmd0aCA+IC0xKSB7IC8vRkYgc2V0cyBubyBkZWZpbmVkIG1heCBsZW5ndGggdG8gLTEgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF4TGVuZ3RoIDwgZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5sZW5ndGgpIGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkubGVuZ3RoID0gbWF4TGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVsnZ3JlZWR5J10gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbJ3JlcGVhdCddID0gTWF0aC5yb3VuZChtYXhMZW5ndGggLyBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWwucHJvcCgnbWF4TGVuZ3RoJywgZ2V0TWFza0xlbmd0aCgpICogMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGNoVmFsdWVQcm9wZXJ0eShlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLm51bWVyaWNJbnB1dCkgb3B0cy5pc051bWVyaWMgPSBvcHRzLm51bWVyaWNJbnB1dDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwuZGlyID09IFwicnRsXCIgfHwgKG9wdHMubnVtZXJpY0lucHV0ICYmIG9wdHMucmlnaHRBbGlnbk51bWVyaWNzKSB8fCAob3B0cy5pc051bWVyaWMgJiYgb3B0cy5yaWdodEFsaWduTnVtZXJpY3MpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwuY3NzKFwidGV4dC1hbGlnblwiLCBcInJpZ2h0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwuZGlyID09IFwicnRsXCIgfHwgb3B0cy5udW1lcmljSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuZGlyID0gXCJsdHJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLnJlbW92ZUF0dHIoXCJkaXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dERhdGEgPSAkZWwuZGF0YSgnX2lucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGFbJ2lzUlRMJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwuZGF0YSgnX2lucHV0bWFzaycsIGlucHV0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUlRMID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdW5iaW5kIGFsbCBldmVudHMgLSB0byBtYWtlIHN1cmUgdGhhdCBubyBvdGhlciBtYXNrIHdpbGwgaW50ZXJmZXJlIHdoZW4gcmUtbWFza2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICRlbC51bmJpbmQoXCIuaW5wdXRtYXNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICRlbC5yZW1vdmVDbGFzcygnZm9jdXMuaW5wdXRtYXNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9iaW5kIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICRlbC5jbG9zZXN0KCdmb3JtJykuYmluZChcInN1Ym1pdFwiLCBmdW5jdGlvbiAoKSB7IC8vdHJpZ2dlciBjaGFuZ2Ugb24gc3VibWl0IGlmIGFueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVPbkZvY3VzICE9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWwuY2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKCdyZXNldCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWwudHJpZ2dlcihcInNldHZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkZWwuYmluZChcIm1vdXNlZW50ZXIuaW5wdXRtYXNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyksIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkaW5wdXQuaGFzQ2xhc3MoJ2ZvY3VzLmlucHV0bWFzaycpICYmIG9wdHMuc2hvd01hc2tPbkhvdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuX3ZhbHVlR2V0KCkgIT0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QWN0aXZlQnVmZmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZChcImJsdXIuaW5wdXRtYXNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyksIGlucHV0ID0gdGhpcywgbnB0VmFsdWUgPSBpbnB1dC5fdmFsdWVHZXQoKSwgYnVmZmVyID0gZ2V0QWN0aXZlQnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5yZW1vdmVDbGFzcygnZm9jdXMuaW5wdXRtYXNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZU9uRm9jdXMgIT0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5jaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyAmJiBucHRWYWx1ZSAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5wdFZhbHVlID09IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuX3ZhbHVlU2V0KCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyAvL2NsZWFyb3V0IG9wdGlvbmFsIHRhaWwgb2YgdGhlIG1hc2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhck9wdGlvbmFsVGFpbChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGUoYnVmZmVyKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwiaW5jb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmNsZWFySW5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChtYXNrc2V0cywgZnVuY3Rpb24gKG5keCwgbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAobXMpID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wiYnVmZmVyXCJdID0gbXNbXCJfYnVmZmVyXCJdLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc1tcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKGlucHV0LCBidWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoXCJmb2N1cy5pbnB1dG1hc2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzLCBucHRWYWx1ZSA9IGlucHV0Ll92YWx1ZUdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zaG93TWFza09uRm9jdXMgJiYgISRpbnB1dC5oYXNDbGFzcygnZm9jdXMuaW5wdXRtYXNrJykgJiYgKCFvcHRzLnNob3dNYXNrT25Ib3ZlciB8fCAob3B0cy5zaG93TWFza09uSG92ZXIgJiYgbnB0VmFsdWUgPT0gJycpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Ll92YWx1ZUdldCgpICE9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGdldEFjdGl2ZUJ1ZmZlcigpLCBzZWVrTmV4dChnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5hZGRDbGFzcygnZm9jdXMuaW5wdXRtYXNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlT25Gb2N1cyA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoXCJtb3VzZWxlYXZlLmlucHV0bWFza1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLCBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISRpbnB1dC5oYXNDbGFzcygnZm9jdXMuaW5wdXRtYXNrJykgJiYgaW5wdXQuX3ZhbHVlR2V0KCkgIT0gJGlucHV0LmF0dHIoXCJwbGFjZWhvbGRlclwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5fdmFsdWVHZXQoKSA9PSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oJycpIHx8IGlucHV0Ll92YWx1ZUdldCgpID09ICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyAvL2NsZWFyb3V0IG9wdGlvbmFsIHRhaWwgb2YgdGhlIG1hc2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJPcHRpb25hbFRhaWwoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoXCJjbGljay5pbnB1dG1hc2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZENhcmV0ID0gY2FyZXQoaW5wdXQpLCBidWZmZXIgPSBnZXRBY3RpdmVCdWZmZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZENhcmV0LmJlZ2luID09IHNlbGVjdGVkQ2FyZXQuZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWNrUG9zaXRpb24gPSBpc1JUTCA/IFRyYW5zbGF0ZVBvc2l0aW9uKHNlbGVjdGVkQ2FyZXQuYmVnaW4pIDogc2VsZWN0ZWRDYXJldC5iZWdpbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbHZwID0gZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5pc051bWVyaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBvc2l0aW9uID0gb3B0cy5za2lwUmFkaXhEYW5jZSA9PT0gZmFsc2UgJiYgb3B0cy5yYWRpeFBvaW50ICE9IFwiXCIgJiYgJC5pbkFycmF5KG9wdHMucmFkaXhQb2ludCwgYnVmZmVyKSAhPSAtMSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0cy5udW1lcmljSW5wdXQgPyBzZWVrTmV4dCgkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBidWZmZXIpKSA6ICQuaW5BcnJheShvcHRzLnJhZGl4UG9pbnQsIGJ1ZmZlcikpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZWtOZXh0KGx2cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBvc2l0aW9uID0gc2Vla05leHQobHZwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrUG9zaXRpb24gPCBsYXN0UG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTWFzayhjbGlja1Bvc2l0aW9uKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBjbGlja1Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBjYXJldChpbnB1dCwgc2Vla05leHQoY2xpY2tQb3NpdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgbGFzdFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZCgnZGJsY2xpY2suaW5wdXRtYXNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCAwLCBzZWVrTmV4dChnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKHBhc3RlRXZlbnQgKyBcIi5pbnB1dG1hc2sgZHJhZ2Ryb3AuaW5wdXRtYXNrIGRyb3AuaW5wdXRtYXNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza2lwSW5wdXRFdmVudCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpcElucHV0RXZlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsICRpbnB1dCA9ICQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wYXN0ZSBldmVudCBmb3IgSUU4IGFuZCBsb3dlciBJIGd1ZXNzIDstKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS50eXBlID09IFwicHJvcGVydHljaGFuZ2VcIiAmJiBpbnB1dC5fdmFsdWVHZXQoKS5sZW5ndGggPD0gZ2V0TWFza0xlbmd0aCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXN0ZVZhbHVlID0gb3B0cy5vbkJlZm9yZVBhc3RlICE9IHVuZGVmaW5lZCA/IG9wdHMub25CZWZvcmVQYXN0ZS5jYWxsKHRoaXMsIGlucHV0Ll92YWx1ZUdldCgpKSA6IGlucHV0Ll92YWx1ZUdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWwoaW5wdXQsIHRydWUsIGZhbHNlLCBwYXN0ZVZhbHVlLnNwbGl0KCcnKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21wbGV0ZShnZXRBY3RpdmVCdWZmZXIoKSkgPT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKCdzZXR2YWx1ZS5pbnB1dG1hc2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsKGlucHV0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVPbkZvY3VzID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5fdmFsdWVHZXQoKSA9PSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oJycpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuX3ZhbHVlU2V0KCcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKCdjb21wbGV0ZS5pbnB1dG1hc2snLCBvcHRzLm9uY29tcGxldGVcclxuICAgICAgICAgICAgICAgICAgICApLmJpbmQoJ2luY29tcGxldGUuaW5wdXRtYXNrJywgb3B0cy5vbmluY29tcGxldGVcclxuICAgICAgICAgICAgICAgICAgICApLmJpbmQoJ2NsZWFyZWQuaW5wdXRtYXNrJywgb3B0cy5vbmNsZWFyZWRcclxuICAgICAgICAgICAgICAgICAgICApLmJpbmQoXCJrZXl1cC5pbnB1dG1hc2tcIiwga2V5dXBFdmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmRyb2lkY2hyb21lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5iaW5kKFwiaW5wdXQuaW5wdXRtYXNrXCIsIGlucHV0RXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5iaW5kKFwia2V5ZG93bi5pbnB1dG1hc2tcIiwga2V5ZG93bkV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkuYmluZChcImtleXByZXNzLmlucHV0bWFza1wiLCBrZXlwcmVzc0V2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtc2llMTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5iaW5kKFwiaW5wdXQuaW5wdXRtYXNrXCIsIGlucHV0RXZlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2FwcGx5IG1hc2tcclxuICAgICAgICAgICAgICAgICAgICBjaGVja1ZhbChlbCwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlT25Gb2N1cyA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdyYXAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpbiBhIHRyeS9jYXRjaCBibG9jayBzaW5jZSBJRTkgdGhyb3cgXCJVbnNwZWNpZmllZCBlcnJvclwiIGlmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgaXMgdW5kZWZpbmVkIHdoZW4gd2UgYXJlIGluIGFuIElGcmFtZS5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVFbGVtZW50ID09PSBlbCkgeyAvL3Bvc2l0aW9uIHRoZSBjYXJldCB3aGVuIGluIGZvY3VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5hZGRDbGFzcygnZm9jdXMuaW5wdXRtYXNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGVsLCBzZWVrTmV4dChnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykgPT0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5qb2luKCcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuX3ZhbHVlU2V0KCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyT3B0aW9uYWxUYWlsKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKGVsLCBnZXRBY3RpdmVCdWZmZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbnN0YWxsRXZlbnRSdWxlcihlbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vYWN0aW9uIG9iamVjdFxyXG4gICAgICAgICAgICBpZiAoYWN0aW9uT2JqICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb25PYmpbXCJhY3Rpb25cIl0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaXNDb21wbGV0ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNDb21wbGV0ZShhY3Rpb25PYmpbXCJidWZmZXJcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1bm1hc2tlZHZhbHVlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUlRMID0gYWN0aW9uT2JqW1wiJGlucHV0XCJdLmRhdGEoJ19pbnB1dG1hc2snKVsnaXNSVEwnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVubWFza2VkdmFsdWUoYWN0aW9uT2JqW1wiJGlucHV0XCJdLCBhY3Rpb25PYmpbXCJza2lwRGF0ZXBpY2tlckNoZWNrXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibWFza1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrKGFjdGlvbk9ialtcImVsXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZvcm1hdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwgPSAkKHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmRhdGEoJ19pbnB1dG1hc2snLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFza3NldHMnOiBtYXNrc2V0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhY3RpdmVNYXNrc2V0SW5kZXgnOiBhY3RpdmVNYXNrc2V0SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb3B0cyc6IG9wdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaXNSVEwnOiBvcHRzLm51bWVyaWNJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMubnVtZXJpY0lucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmlzTnVtZXJpYyA9IG9wdHMubnVtZXJpY0lucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSVEwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1ZhbCgkZWwsIGZhbHNlLCBmYWxzZSwgYWN0aW9uT2JqW1widmFsdWVcIl0uc3BsaXQoJycpLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQuaW5wdXRtYXNrID0ge1xyXG4gICAgICAgICAgICAvL29wdGlvbnMgZGVmYXVsdFxyXG4gICAgICAgICAgICBkZWZhdWx0czoge1xyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiX1wiLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uYWxtYXJrZXI6IHsgc3RhcnQ6IFwiW1wiLCBlbmQ6IFwiXVwiIH0sXHJcbiAgICAgICAgICAgICAgICBxdWFudGlmaWVybWFya2VyOiB7IHN0YXJ0OiBcIntcIiwgZW5kOiBcIn1cIiB9LFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBtYXJrZXI6IHsgc3RhcnQ6IFwiKFwiLCBlbmQ6IFwiKVwiIH0sXHJcbiAgICAgICAgICAgICAgICBlc2NhcGVDaGFyOiBcIlxcXFxcIixcclxuICAgICAgICAgICAgICAgIG1hc2s6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBvbmNvbXBsZXRlOiAkLm5vb3AsIC8vZXhlY3V0ZXMgd2hlbiB0aGUgbWFzayBpcyBjb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgb25pbmNvbXBsZXRlOiAkLm5vb3AsIC8vZXhlY3V0ZXMgd2hlbiB0aGUgbWFzayBpcyBpbmNvbXBsZXRlIGFuZCBmb2N1cyBpcyBsb3N0XHJcbiAgICAgICAgICAgICAgICBvbmNsZWFyZWQ6ICQubm9vcCwgLy9leGVjdXRlcyB3aGVuIHRoZSBtYXNrIGlzIGNsZWFyZWRcclxuICAgICAgICAgICAgICAgIHJlcGVhdDogMCwgLy9yZXBldGl0aW9ucyBvZiB0aGUgbWFzazogKiB+IGZvcmV2ZXIsIG90aGVyd2lzZSBzcGVjaWZ5IGFuIGludGVnZXJcclxuICAgICAgICAgICAgICAgIGdyZWVkeTogdHJ1ZSwgLy90cnVlOiBhbGxvY2F0ZWQgYnVmZmVyIGZvciB0aGUgbWFzayBhbmQgcmVwZXRpdGlvbnMgLSBmYWxzZTogYWxsb2NhdGUgb25seSBpZiBuZWVkZWRcclxuICAgICAgICAgICAgICAgIGF1dG9Vbm1hc2s6IGZhbHNlLCAvL2F1dG9tYXRpY2FsbHkgdW5tYXNrIHdoZW4gcmV0cmlldmluZyB0aGUgdmFsdWUgd2l0aCAkLmZuLnZhbCBvciB2YWx1ZSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBfX2xvb2t1cEdldHRlcl9fIG9yIGdldE93blByb3BlcnR5RGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAgY2xlYXJNYXNrT25Mb3N0Rm9jdXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpbnNlcnRNb2RlOiB0cnVlLCAvL2luc2VydCB0aGUgaW5wdXQgb3Igb3ZlcndyaXRlIHRoZSBpbnB1dFxyXG4gICAgICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiBmYWxzZSwgLy9jbGVhciB0aGUgaW5jb21wbGV0ZSBpbnB1dCBvbiBibHVyXHJcbiAgICAgICAgICAgICAgICBhbGlhc2VzOiB7fSwgLy9hbGlhc2VzIGRlZmluaXRpb25zID0+IHNlZSBqcXVlcnkuaW5wdXRtYXNrLmV4dGVuc2lvbnMuanNcclxuICAgICAgICAgICAgICAgIG9uS2V5VXA6ICQubm9vcCwgLy9vdmVycmlkZSB0byBpbXBsZW1lbnQgYXV0b2NvbXBsZXRlIG9uIGNlcnRhaW4ga2V5cyBmb3IgZXhhbXBsZVxyXG4gICAgICAgICAgICAgICAgb25LZXlEb3duOiAkLm5vb3AsIC8vb3ZlcnJpZGUgdG8gaW1wbGVtZW50IGF1dG9jb21wbGV0ZSBvbiBjZXJ0YWluIGtleXMgZm9yIGV4YW1wbGVcclxuICAgICAgICAgICAgICAgIG9uQmVmb3JlUGFzdGU6IHVuZGVmaW5lZCwgLy9leGVjdXRlcyBiZWZvcmUgbWFza2luZyB0aGUgcGFzdGVkIHZhbHVlIHRvIGFsbG93IHByZXByb2Nlc3Npbmcgb2YgdGhlIHBhc3RlZCB2YWx1ZS4gIGFyZ3MgPT4gcGFzdGVkVmFsdWUgPT4gcmV0dXJuIHByb2Nlc3NlZFZhbHVlXHJcbiAgICAgICAgICAgICAgICBvblVuTWFzazogdW5kZWZpbmVkLCAvL2V4ZWN1dGVzIGFmdGVyIHVubWFza2luZyB0byBhbGxvdyBwb3N0cHJvY2Vzc2luZyBvZiB0aGUgdW5tYXNrZWR2YWx1ZS4gIGFyZ3MgPT4gbWFza2VkVmFsdWUsIHVubWFza2VkVmFsdWVcclxuICAgICAgICAgICAgICAgIHNob3dNYXNrT25Gb2N1czogdHJ1ZSwgLy9zaG93IHRoZSBtYXNrLXBsYWNlaG9sZGVyIHdoZW4gdGhlIGlucHV0IGhhcyBmb2N1c1xyXG4gICAgICAgICAgICAgICAgc2hvd01hc2tPbkhvdmVyOiB0cnVlLCAvL3Nob3cgdGhlIG1hc2stcGxhY2Vob2xkZXIgd2hlbiBob3ZlcmluZyB0aGUgZW1wdHkgaW5wdXRcclxuICAgICAgICAgICAgICAgIG9uS2V5VmFsaWRhdGlvbjogJC5ub29wLCAvL2V4ZWN1dGVzIG9uIGV2ZXJ5IGtleS1wcmVzcyB3aXRoIHRoZSByZXN1bHQgb2YgaXNWYWxpZC4gUGFyYW1zOiByZXN1bHQsIG9wdHNcclxuICAgICAgICAgICAgICAgIHNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXI6IFwiIFwiLCAvL2EgY2hhcmFjdGVyIHdoaWNoIGNhbiBiZSB1c2VkIHRvIHNraXAgYW4gb3B0aW9uYWwgcGFydCBvZiBhIG1hc2tcclxuICAgICAgICAgICAgICAgIHNob3dUb29sdGlwOiBmYWxzZSwgLy9zaG93IHRoZSBhY3RpdmVtYXNrIGFzIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgIG51bWVyaWNJbnB1dDogZmFsc2UsIC8vbnVtZXJpY0lucHV0IGlucHV0IGRpcmVjdGlvbiBzdHlsZSAoaW5wdXQgc2hpZnRzIHRvIHRoZSBsZWZ0IHdoaWxlIGhvbGRpbmcgdGhlIGNhcmV0IHBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgLy9udW1lcmljIGJhc2ljIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgIGlzTnVtZXJpYzogZmFsc2UsIC8vZW5hYmxlIG51bWVyaWMgZmVhdHVyZXNcclxuICAgICAgICAgICAgICAgIHJhZGl4UG9pbnQ6IFwiXCIsIC8vXCIuXCIsIC8vIHwgXCIsXCJcclxuICAgICAgICAgICAgICAgIHNraXBSYWRpeERhbmNlOiBmYWxzZSwgLy9kaXNhYmxlIHJhZGl4cG9pbnQgY2FyZXQgcG9zaXRpb25pbmdcclxuICAgICAgICAgICAgICAgIHJpZ2h0QWxpZ25OdW1lcmljczogdHJ1ZSwgLy9hbGlnbiBudW1lcmljcyB0byB0aGUgcmlnaHRcclxuICAgICAgICAgICAgICAgIC8vbnVtZXJpYyBiYXNpYyBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICc5Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOV1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDFcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdhJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiW0EtWmEtelxcdTA0MTAtXFx1MDQ0RlxcdTA0MDFcXHUwNDUxXVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJyonOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbQS1aYS16XFx1MDQxMC1cXHUwNDRGXFx1MDQwMVxcdTA0NTEwLTldXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGtleUNvZGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBBTFQ6IDE4LCBCQUNLU1BBQ0U6IDgsIENBUFNfTE9DSzogMjAsIENPTU1BOiAxODgsIENPTU1BTkQ6IDkxLCBDT01NQU5EX0xFRlQ6IDkxLCBDT01NQU5EX1JJR0hUOiA5MywgQ09OVFJPTDogMTcsIERFTEVURTogNDYsIERPV046IDQwLCBFTkQ6IDM1LCBFTlRFUjogMTMsIEVTQ0FQRTogMjcsIEhPTUU6IDM2LCBJTlNFUlQ6IDQ1LCBMRUZUOiAzNywgTUVOVTogOTMsIE5VTVBBRF9BREQ6IDEwNywgTlVNUEFEX0RFQ0lNQUw6IDExMCwgTlVNUEFEX0RJVklERTogMTExLCBOVU1QQURfRU5URVI6IDEwOCxcclxuICAgICAgICAgICAgICAgICAgICBOVU1QQURfTVVMVElQTFk6IDEwNiwgTlVNUEFEX1NVQlRSQUNUOiAxMDksIFBBR0VfRE9XTjogMzQsIFBBR0VfVVA6IDMzLCBQRVJJT0Q6IDE5MCwgUklHSFQ6IDM5LCBTSElGVDogMTYsIFNQQUNFOiAzMiwgVEFCOiA5LCBVUDogMzgsIFdJTkRPV1M6IDkxXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy9zcGVjaWZ5IGtleWNvZGVzIHdoaWNoIHNob3VsZCBub3QgYmUgY29uc2lkZXJlZCBpbiB0aGUga2V5cHJlc3MgZXZlbnQsIG90aGVyd2lzZSB0aGUgcHJldmVudERlZmF1bHQgd2lsbCBzdG9wIHRoZWlyIGRlZmF1bHQgYmVoYXZpb3IgZXNwZWNpYWxseSBpbiBGRlxyXG4gICAgICAgICAgICAgICAgaWdub3JhYmxlczogWzgsIDksIDEzLCAxOSwgMjcsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MCwgNDUsIDQ2LCA5MywgMTEyLCAxMTMsIDExNCwgMTE1LCAxMTYsIDExNywgMTE4LCAxMTksIDEyMCwgMTIxLCAxMjIsIDEyM10sXHJcbiAgICAgICAgICAgICAgICBnZXRNYXNrTGVuZ3RoOiBmdW5jdGlvbiAoYnVmZmVyLCBncmVlZHksIHJlcGVhdCwgY3VycmVudEJ1ZmZlciwgb3B0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYWxjdWxhdGVkTGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdyZWVkeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVwZWF0ID09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkTGVuZ3RoID0gY3VycmVudEJ1ZmZlci5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcGVhdCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRMZW5ndGggKz0gKGJ1ZmZlci5sZW5ndGggKiAocmVwZWF0IC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxjdWxhdGVkTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlc2NhcGVSZWdleDogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwZWNpYWxzID0gWycvJywgJy4nLCAnKicsICcrJywgJz8nLCAnfCcsICcoJywgJyknLCAnWycsICddJywgJ3snLCAnfScsICdcXFxcJ107XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cCgnKFxcXFwnICsgc3BlY2lhbHMuam9pbignfFxcXFwnKSArICcpJywgJ2dpbScpLCAnXFxcXCQxJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmlucHV0bWFzay5kZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlQWxpYXMob3B0cy5hbGlhcywgb3B0aW9ucywgb3B0cyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFza1Njb3BlKGdlbmVyYXRlTWFza1NldHMob3B0cyksIDAsIG9wdHMsIHsgXCJhY3Rpb25cIjogXCJmb3JtYXRcIiwgXCJ2YWx1ZVwiOiB2YWx1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICQuZm4uaW5wdXRtYXNrID0gZnVuY3Rpb24gKGZuLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRzID0gJC5leHRlbmQodHJ1ZSwge30sICQuaW5wdXRtYXNrLmRlZmF1bHRzLCBvcHRpb25zKSxcclxuICAgICAgICAgICAgICAgIG1hc2tzZXRzLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm4gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZm4pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibWFza1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc29sdmUgcG9zc2libGUgYWxpYXNlcyBnaXZlbiBieSBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVBbGlhcyhvcHRzLmFsaWFzLCBvcHRpb25zLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHMgPSBnZW5lcmF0ZU1hc2tTZXRzKG9wdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFza3NldHMubGVuZ3RoID09IDApIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza1Njb3BlKCQuZXh0ZW5kKHRydWUsIHt9LCBtYXNrc2V0cyksIDAsIG9wdHMsIHsgXCJhY3Rpb25cIjogXCJtYXNrXCIsIFwiZWxcIjogdGhpcyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVubWFza2VkdmFsdWVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyksIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzID0gJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKVsnbWFza3NldHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9ICRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJylbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cyA9ICRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXNrU2NvcGUobWFza3NldHMsIGFjdGl2ZU1hc2tzZXRJbmRleCwgb3B0cywgeyBcImFjdGlvblwiOiBcInVubWFza2VkdmFsdWVcIiwgXCIkaW5wdXRcIjogJGlucHV0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuICRpbnB1dC52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVtb3ZlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyksIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkaW5wdXQuZGF0YSgnX2lucHV0bWFzaycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHMgPSAkaW5wdXQuZGF0YSgnX2lucHV0bWFzaycpWydtYXNrc2V0cyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9ICRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJylbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMgPSAkaW5wdXQuZGF0YSgnX2lucHV0bWFzaycpWydvcHRzJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy93cml0ZW91dCB0aGUgdW5tYXNrZWR2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll92YWx1ZVNldChtYXNrU2NvcGUobWFza3NldHMsIGFjdGl2ZU1hc2tzZXRJbmRleCwgb3B0cywgeyBcImFjdGlvblwiOiBcInVubWFza2VkdmFsdWVcIiwgXCIkaW5wdXRcIjogJGlucHV0LCBcInNraXBEYXRlcGlja2VyQ2hlY2tcIjogdHJ1ZSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jbGVhciBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnJlbW92ZURhdGEoJ19pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VuYmluZCBhbGwgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnVuYmluZChcIi5pbnB1dG1hc2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnJlbW92ZUNsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc3RvcmUgdGhlIHZhbHVlIHByb3BlcnR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlUHJvcGVydHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlUHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGlucHV0LCBcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVByb3BlcnR5ICYmIHZhbHVlUHJvcGVydHkuZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5fdmFsdWVHZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbnB1dCwgXCJ2YWx1ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBpbnB1dC5fdmFsdWVHZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBpbnB1dC5fdmFsdWVTZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5fX2xvb2t1cEdldHRlcl9fICYmIGlucHV0Ll9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuX3ZhbHVlR2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fX2RlZmluZUdldHRlcl9fKFwidmFsdWVcIiwgaW5wdXQuX3ZhbHVlR2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll9fZGVmaW5lU2V0dGVyX18oXCJ2YWx1ZVwiLCBpbnB1dC5fdmFsdWVTZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7IC8vdHJ5IGNhdGNoIG5lZWRlZCBmb3IgSUU3IGFzIGl0IGRvZXMgbm90IHN1cHBvcnRzIGRlbGV0aW5nIGZuc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgaW5wdXQuX3ZhbHVlR2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgaW5wdXQuX3ZhbHVlU2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuX3ZhbHVlR2V0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJnZXRlbXB0eW1hc2tcIjogLy9yZXR1cm4gdGhlIGRlZmF1bHQgKGVtcHR5KSBtYXNrIHZhbHVlLCB1c2VmdWxsIGZvciBzZXR0aW5nIHRoZSBkZWZhdWx0IHZhbHVlIGluIHZhbGlkYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YSgnX2lucHV0bWFzaycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IHRoaXMuZGF0YSgnX2lucHV0bWFzaycpWydtYXNrc2V0cyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ19idWZmZXInXS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJoYXNNYXNrZWRWYWx1ZVwiOiAvL2NoZWNrIHdoZXRlciB0aGUgcmV0dXJuZWQgdmFsdWUgaXMgbWFza2VkIG9yIG5vdDsgY3VycmVudGx5IG9ubHkgd29ya3MgcmVsaWFibGUgd2hlbiB1c2luZyBqcXVlcnkudmFsIGZuIHRvIHJldHJpZXZlIHRoZSB2YWx1ZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YSgnX2lucHV0bWFzaycpID8gIXRoaXMuZGF0YSgnX2lucHV0bWFzaycpWydvcHRzJ10uYXV0b1VubWFzayA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpc0NvbXBsZXRlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ21hc2tzZXRzJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IHRoaXMuZGF0YSgnX2lucHV0bWFzaycpWydhY3RpdmVNYXNrc2V0SW5kZXgnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cyA9IHRoaXMuZGF0YSgnX2lucHV0bWFzaycpWydvcHRzJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXNrU2NvcGUobWFza3NldHMsIGFjdGl2ZU1hc2tzZXRJbmRleCwgb3B0cywgeyBcImFjdGlvblwiOiBcImlzQ29tcGxldGVcIiwgXCJidWZmZXJcIjogdGhpc1swXS5fdmFsdWVHZXQoKS5zcGxpdCgnJykgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImdldG1ldGFkYXRhXCI6IC8vcmV0dXJuIG1hc2sgbWV0YWRhdGEgaWYgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEoJ19pbnB1dG1hc2snKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHMgPSB0aGlzLmRhdGEoJ19pbnB1dG1hc2snKVsnbWFza3NldHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IHRoaXMuZGF0YSgnX2lucHV0bWFzaycpWydhY3RpdmVNYXNrc2V0SW5kZXgnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXNrc2V0c1thY3RpdmVNYXNrc2V0SW5kZXhdWydtZXRhZGF0YSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHRoZSBmbiBpcyBhbiBhbGlhc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc29sdmVBbGlhcyhmbiwgb3B0aW9ucywgb3B0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbWF5YmUgZm4gaXMgYSBtYXNrIHNvIHdlIHRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXQgbWFza1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5tYXNrID0gZm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHMgPSBnZW5lcmF0ZU1hc2tTZXRzKG9wdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFza3NldHMubGVuZ3RoID09IDApIHsgcmV0dXJuIHRoaXM7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrU2NvcGUoJC5leHRlbmQodHJ1ZSwge30sIG1hc2tzZXRzKSwgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCB7IFwiYWN0aW9uXCI6IFwibWFza1wiLCBcImVsXCI6IHRoaXMgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZuID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgIG9wdHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5pbnB1dG1hc2suZGVmYXVsdHMsIGZuKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlQWxpYXMob3B0cy5hbGlhcywgZm4sIG9wdHMpOyAvL3Jlc29sdmUgYWxpYXNlc1xyXG4gICAgICAgICAgICAgICAgbWFza3NldHMgPSBnZW5lcmF0ZU1hc2tTZXRzKG9wdHMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hc2tzZXRzLmxlbmd0aCA9PSAwKSB7IHJldHVybiB0aGlzOyB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrU2NvcGUoJC5leHRlbmQodHJ1ZSwge30sIG1hc2tzZXRzKSwgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCB7IFwiYWN0aW9uXCI6IFwibWFza1wiLCBcImVsXCI6IHRoaXMgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChmbiA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vbG9vayBmb3IgZGF0YS1pbnB1dG1hc2sgYXRyaWJ1dGUgLSB0aGUgYXR0cmlidXRlIHNob3VsZCBvbmx5IGNvbnRhaW4gb3B0aXBuc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHJPcHRpb25zID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pbnB1dG1hc2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJPcHRpb25zICYmIGF0dHJPcHRpb25zICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJPcHRpb25zID0gYXR0ck9wdGlvbnMucmVwbGFjZShuZXcgUmVnRXhwKFwiJ1wiLCBcImdcIiksICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFvcHRpb25zID0gJC5wYXJzZUpTT04oXCJ7XCIgKyBhdHRyT3B0aW9ucyArIFwifVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIGRhdGFvcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5pbnB1dG1hc2suZGVmYXVsdHMsIGRhdGFvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVBbGlhcyhvcHRzLmFsaWFzLCBkYXRhb3B0aW9ucywgb3B0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmFsaWFzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5pbnB1dG1hc2sob3B0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7IH0gLy9uZWVkIGEgbW9yZSByZWxheCBwYXJzZUpTT05cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0pKGpRdWVyeSk7XHJcbiIsIi8qISBpQ2hlY2sgdjEuMC4xIGJ5IERhbWlyIFN1bHRhbm92LCBodHRwOi8vZ2l0LmlvL2FybHplQSwgTUlUIExpY2Vuc2VkICovXG4oZnVuY3Rpb24oaCl7ZnVuY3Rpb24gRihhLGIsZCl7dmFyIGM9YVswXSxlPS9lci8udGVzdChkKT9tOi9ibC8udGVzdChkKT9zOmwsZj1kPT1IP3tjaGVja2VkOmNbbF0sZGlzYWJsZWQ6Y1tzXSxpbmRldGVybWluYXRlOlwidHJ1ZVwiPT1hLmF0dHIobSl8fFwiZmFsc2VcIj09YS5hdHRyKHcpfTpjW2VdO2lmKC9eKGNofGRpfGluKS8udGVzdChkKSYmIWYpRChhLGUpO2Vsc2UgaWYoL14odW58ZW58ZGUpLy50ZXN0KGQpJiZmKXQoYSxlKTtlbHNlIGlmKGQ9PUgpZm9yKGUgaW4gZilmW2VdP0QoYSxlLCEwKTp0KGEsZSwhMCk7ZWxzZSBpZighYnx8XCJ0b2dnbGVcIj09ZCl7aWYoIWIpYVtwXShcImlmQ2xpY2tlZFwiKTtmP2Nbbl0hPT11JiZ0KGEsZSk6RChhLGUpfX1mdW5jdGlvbiBEKGEsYixkKXt2YXIgYz1hWzBdLGU9YS5wYXJlbnQoKSxmPWI9PWwsQT1iPT1tLEI9Yj09cyxLPUE/dzpmP0U6XCJlbmFibGVkXCIscD1rKGEsSyt4KGNbbl0pKSxOPWsoYSxiK3goY1tuXSkpO2lmKCEwIT09Y1tiXSl7aWYoIWQmJlxuYj09bCYmY1tuXT09dSYmYy5uYW1lKXt2YXIgQz1hLmNsb3Nlc3QoXCJmb3JtXCIpLHI9J2lucHV0W25hbWU9XCInK2MubmFtZSsnXCJdJyxyPUMubGVuZ3RoP0MuZmluZChyKTpoKHIpO3IuZWFjaChmdW5jdGlvbigpe3RoaXMhPT1jJiZoKHRoaXMpLmRhdGEocSkmJnQoaCh0aGlzKSxiKX0pfUE/KGNbYl09ITAsY1tsXSYmdChhLGwsXCJmb3JjZVwiKSk6KGR8fChjW2JdPSEwKSxmJiZjW21dJiZ0KGEsbSwhMSkpO0woYSxmLGIsZCl9Y1tzXSYmayhhLHksITApJiZlLmZpbmQoXCIuXCIrSSkuY3NzKHksXCJkZWZhdWx0XCIpO2Vbdl0oTnx8ayhhLGIpfHxcIlwiKTtCP2UuYXR0cihcImFyaWEtZGlzYWJsZWRcIixcInRydWVcIik6ZS5hdHRyKFwiYXJpYS1jaGVja2VkXCIsQT9cIm1peGVkXCI6XCJ0cnVlXCIpO2Vbel0ocHx8ayhhLEspfHxcIlwiKX1mdW5jdGlvbiB0KGEsYixkKXt2YXIgYz1hWzBdLGU9YS5wYXJlbnQoKSxmPWI9PWwsaD1iPT1tLHE9Yj09cyxwPWg/dzpmP0U6XCJlbmFibGVkXCIsdD1rKGEscCt4KGNbbl0pKSxcbnU9ayhhLGIreChjW25dKSk7aWYoITEhPT1jW2JdKXtpZihofHwhZHx8XCJmb3JjZVwiPT1kKWNbYl09ITE7TChhLGYscCxkKX0hY1tzXSYmayhhLHksITApJiZlLmZpbmQoXCIuXCIrSSkuY3NzKHksXCJwb2ludGVyXCIpO2Vbel0odXx8ayhhLGIpfHxcIlwiKTtxP2UuYXR0cihcImFyaWEtZGlzYWJsZWRcIixcImZhbHNlXCIpOmUuYXR0cihcImFyaWEtY2hlY2tlZFwiLFwiZmFsc2VcIik7ZVt2XSh0fHxrKGEscCl8fFwiXCIpfWZ1bmN0aW9uIE0oYSxiKXtpZihhLmRhdGEocSkpe2EucGFyZW50KCkuaHRtbChhLmF0dHIoXCJzdHlsZVwiLGEuZGF0YShxKS5zfHxcIlwiKSk7aWYoYilhW3BdKGIpO2Eub2ZmKFwiLmlcIikudW53cmFwKCk7aChHKydbZm9yPVwiJythWzBdLmlkKydcIl0nKS5hZGQoYS5jbG9zZXN0KEcpKS5vZmYoXCIuaVwiKX19ZnVuY3Rpb24gayhhLGIsZCl7aWYoYS5kYXRhKHEpKXJldHVybiBhLmRhdGEocSkub1tiKyhkP1wiXCI6XCJDbGFzc1wiKV19ZnVuY3Rpb24geChhKXtyZXR1cm4gYS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStcbmEuc2xpY2UoMSl9ZnVuY3Rpb24gTChhLGIsZCxjKXtpZighYyl7aWYoYilhW3BdKFwiaWZUb2dnbGVkXCIpO2FbcF0oXCJpZkNoYW5nZWRcIilbcF0oXCJpZlwiK3goZCkpfX12YXIgcT1cImlDaGVja1wiLEk9cStcIi1oZWxwZXJcIix1PVwicmFkaW9cIixsPVwiY2hlY2tlZFwiLEU9XCJ1blwiK2wscz1cImRpc2FibGVkXCIsdz1cImRldGVybWluYXRlXCIsbT1cImluXCIrdyxIPVwidXBkYXRlXCIsbj1cInR5cGVcIix2PVwiYWRkQ2xhc3NcIix6PVwicmVtb3ZlQ2xhc3NcIixwPVwidHJpZ2dlclwiLEc9XCJsYWJlbFwiLHk9XCJjdXJzb3JcIixKPS9pcGFkfGlwaG9uZXxpcG9kfGFuZHJvaWR8YmxhY2tiZXJyeXx3aW5kb3dzIHBob25lfG9wZXJhIG1pbml8c2lsay9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7aC5mbltxXT1mdW5jdGlvbihhLGIpe3ZhciBkPSdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0sIGlucHV0W3R5cGU9XCInK3UrJ1wiXScsYz1oKCksZT1mdW5jdGlvbihhKXthLmVhY2goZnVuY3Rpb24oKXt2YXIgYT1oKHRoaXMpO2M9YS5pcyhkKT9cbmMuYWRkKGEpOmMuYWRkKGEuZmluZChkKSl9KX07aWYoL14oY2hlY2t8dW5jaGVja3x0b2dnbGV8aW5kZXRlcm1pbmF0ZXxkZXRlcm1pbmF0ZXxkaXNhYmxlfGVuYWJsZXx1cGRhdGV8ZGVzdHJveSkkL2kudGVzdChhKSlyZXR1cm4gYT1hLnRvTG93ZXJDYXNlKCksZSh0aGlzKSxjLmVhY2goZnVuY3Rpb24oKXt2YXIgYz1oKHRoaXMpO1wiZGVzdHJveVwiPT1hP00oYyxcImlmRGVzdHJveWVkXCIpOkYoYywhMCxhKTtoLmlzRnVuY3Rpb24oYikmJmIoKX0pO2lmKFwib2JqZWN0XCIhPXR5cGVvZiBhJiZhKXJldHVybiB0aGlzO3ZhciBmPWguZXh0ZW5kKHtjaGVja2VkQ2xhc3M6bCxkaXNhYmxlZENsYXNzOnMsaW5kZXRlcm1pbmF0ZUNsYXNzOm0sbGFiZWxIb3ZlcjohMCxhcmlhOiExfSxhKSxrPWYuaGFuZGxlLEI9Zi5ob3ZlckNsYXNzfHxcImhvdmVyXCIseD1mLmZvY3VzQ2xhc3N8fFwiZm9jdXNcIix3PWYuYWN0aXZlQ2xhc3N8fFwiYWN0aXZlXCIseT0hIWYubGFiZWxIb3ZlcixDPWYubGFiZWxIb3ZlckNsYXNzfHxcblwiaG92ZXJcIixyPShcIlwiK2YuaW5jcmVhc2VBcmVhKS5yZXBsYWNlKFwiJVwiLFwiXCIpfDA7aWYoXCJjaGVja2JveFwiPT1rfHxrPT11KWQ9J2lucHV0W3R5cGU9XCInK2srJ1wiXSc7LTUwPnImJihyPS01MCk7ZSh0aGlzKTtyZXR1cm4gYy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGE9aCh0aGlzKTtNKGEpO3ZhciBjPXRoaXMsYj1jLmlkLGU9LXIrXCIlXCIsZD0xMDArMipyK1wiJVwiLGQ9e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIix0b3A6ZSxsZWZ0OmUsZGlzcGxheTpcImJsb2NrXCIsd2lkdGg6ZCxoZWlnaHQ6ZCxtYXJnaW46MCxwYWRkaW5nOjAsYmFja2dyb3VuZDpcIiNmZmZcIixib3JkZXI6MCxvcGFjaXR5OjB9LGU9Sj97cG9zaXRpb246XCJhYnNvbHV0ZVwiLHZpc2liaWxpdHk6XCJoaWRkZW5cIn06cj9kOntwb3NpdGlvbjpcImFic29sdXRlXCIsb3BhY2l0eTowfSxrPVwiY2hlY2tib3hcIj09Y1tuXT9mLmNoZWNrYm94Q2xhc3N8fFwiaWNoZWNrYm94XCI6Zi5yYWRpb0NsYXNzfHxcImlcIit1LG09aChHKydbZm9yPVwiJytiKydcIl0nKS5hZGQoYS5jbG9zZXN0KEcpKSxcbkE9ISFmLmFyaWEsRT1xK1wiLVwiK01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnJlcGxhY2UoXCIwLlwiLFwiXCIpLGc9JzxkaXYgY2xhc3M9XCInK2srJ1wiICcrKEE/J3JvbGU9XCInK2Nbbl0rJ1wiICc6XCJcIik7bS5sZW5ndGgmJkEmJm0uZWFjaChmdW5jdGlvbigpe2crPSdhcmlhLWxhYmVsbGVkYnk9XCInO3RoaXMuaWQ/Zys9dGhpcy5pZDoodGhpcy5pZD1FLGcrPUUpO2crPSdcIid9KTtnPWEud3JhcChnK1wiLz5cIilbcF0oXCJpZkNyZWF0ZWRcIikucGFyZW50KCkuYXBwZW5kKGYuaW5zZXJ0KTtkPWgoJzxpbnMgY2xhc3M9XCInK0krJ1wiLz4nKS5jc3MoZCkuYXBwZW5kVG8oZyk7YS5kYXRhKHEse286ZixzOmEuYXR0cihcInN0eWxlXCIpfSkuY3NzKGUpO2YuaW5oZXJpdENsYXNzJiZnW3ZdKGMuY2xhc3NOYW1lfHxcIlwiKTtmLmluaGVyaXRJRCYmYiYmZy5hdHRyKFwiaWRcIixxK1wiLVwiK2IpO1wic3RhdGljXCI9PWcuY3NzKFwicG9zaXRpb25cIikmJmcuY3NzKFwicG9zaXRpb25cIixcInJlbGF0aXZlXCIpO0YoYSwhMCxIKTtcbmlmKG0ubGVuZ3RoKW0ub24oXCJjbGljay5pIG1vdXNlb3Zlci5pIG1vdXNlb3V0LmkgdG91Y2hiZWdpbi5pIHRvdWNoZW5kLmlcIixmdW5jdGlvbihiKXt2YXIgZD1iW25dLGU9aCh0aGlzKTtpZighY1tzXSl7aWYoXCJjbGlja1wiPT1kKXtpZihoKGIudGFyZ2V0KS5pcyhcImFcIikpcmV0dXJuO0YoYSwhMSwhMCl9ZWxzZSB5JiYoL3V0fG5kLy50ZXN0KGQpPyhnW3pdKEIpLGVbel0oQykpOihnW3ZdKEIpLGVbdl0oQykpKTtpZihKKWIuc3RvcFByb3BhZ2F0aW9uKCk7ZWxzZSByZXR1cm4hMX19KTthLm9uKFwiY2xpY2suaSBmb2N1cy5pIGJsdXIuaSBrZXl1cC5pIGtleWRvd24uaSBrZXlwcmVzcy5pXCIsZnVuY3Rpb24oYil7dmFyIGQ9YltuXTtiPWIua2V5Q29kZTtpZihcImNsaWNrXCI9PWQpcmV0dXJuITE7aWYoXCJrZXlkb3duXCI9PWQmJjMyPT1iKXJldHVybiBjW25dPT11JiZjW2xdfHwoY1tsXT90KGEsbCk6RChhLGwpKSwhMTtpZihcImtleXVwXCI9PWQmJmNbbl09PXUpIWNbbF0mJkQoYSxsKTtlbHNlIGlmKC91c3x1ci8udGVzdChkKSlnW1wiYmx1clwiPT1cbmQ/ejp2XSh4KX0pO2Qub24oXCJjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW92ZXIgbW91c2VvdXQgdG91Y2hiZWdpbi5pIHRvdWNoZW5kLmlcIixmdW5jdGlvbihiKXt2YXIgZD1iW25dLGU9L3dufHVwLy50ZXN0KGQpP3c6QjtpZighY1tzXSl7aWYoXCJjbGlja1wiPT1kKUYoYSwhMSwhMCk7ZWxzZXtpZigvd258ZXJ8aW4vLnRlc3QoZCkpZ1t2XShlKTtlbHNlIGdbel0oZStcIiBcIit3KTtpZihtLmxlbmd0aCYmeSYmZT09QiltWy91dHxuZC8udGVzdChkKT96OnZdKEMpfWlmKEopYi5zdG9wUHJvcGFnYXRpb24oKTtlbHNlIHJldHVybiExfX0pfSl9fSkod2luZG93LmpRdWVyeXx8d2luZG93LlplcHRvKTtcbiJdfQ==
