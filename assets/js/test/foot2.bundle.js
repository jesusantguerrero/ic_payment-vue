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
    var contractId = contractTable.getId();

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

function fillClientFields(response,callback){
  if(response != "nada"){ 
    var cliente = JSON.parse(response);
    $("#averias-client-id").val(cliente['id_cliente']);
    $("#a-client").val(cliente['nombres'] + " " + cliente['apellidos'])
  }else{
    displayMessage(MESSAGE_ERROR + " Este cliente no existe revise su cedula por favor");
  }
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
  $inputElement.on("keyup",function(e){
    e.stopImmediatePropagation();
    innerText = $(this).val() 
    if(innerText.toLowerCase() == self.text.toLowerCase()){
      $buttonToActive.removeAttr("disabled");

    }else{
      $buttonToActive.attr("disabled","");
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

  $('[role="tab"]').on('click',function(){
    var href = $(this).attr("href")
    if(href == "#payments" ||href == "#detalles_de_pago" || href == "#descuento" || href == "#month-and-date" || href == "#reconnect-service") {
      $(".payment-controls").addClass("visible");
    }else{
      $(".payment-controls").removeClass("visible");
    }

    if(href == "#contracts"){
      $(".contract-controls").addClass("visible")
    }else{
      $(".contract-controls")
    }


    getTabControls($(this));
  });

  $('.btn-small').on('click',function(){
    smallButtonsSelect.removeClass('selected');
    $(this).addClass('selected');
  })
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

  callExtra: function() {
    var row = contractTable.getSelectedRow();
    if (row) {
      $("#extra-client-dni").val(row.cedula);
      Contracts.getAllOfClient(row.cedula);
      $('#add-extra-modal').modal();
    } else {
       displayAlert("Revise", "Seleccione el conrato primero", "error");
    }
  },

  cancel: function() {
    var row        = contractTable.getSelectedRow()
    var is_penalty = false;
    var reason     = $("#cancelation-reason").val();
    var checked    = $("#check-penalty:checked").length;
    var form, fecha;
    if(row.id){
      if (checked > 0) {
        is_penalty = true;
      }
      fecha = moment().format("YYYY-MM-DD");
      form = 'id_contrato=' + row.id + '&fecha=' + fecha + '&id_cliente=' + row.id_cliente;
      form += "&motivo=" + reason + "&penalidad=" + is_penalty;
      connectAndSend('process/cancel', true, null, null, form, Contracts.getAll);
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

  reconnect: function () {
    var form, contractId, selectedService, serviceId, duration, date,send, is_empty,info;

    contractId = $("#select-contract").val();
    selectedService = $(".service-card.selected");
    serviceId = selectedService.attr("data-id");
    duration  = $("#reconnection-months").val();
    date = $("#reconnection-date").val()

    is_empty = isEmpty([contractId,serviceId,date,duration]);
    console.log("service id" + serviceId + " duration " + duration + " date" + date + " contract "+ contractId )
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
  suspend: function (id_contrato) {
    form = "data=" + JSON.stringify({id_contrato:id_contrato})
    var send = axios.post(BASE_URL + 'contract/suspend',form);
    send.then(function(res){
      var data = res.data
      displayMessage(data.mensaje);
      Contracts.getAll();
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

    // function applyDiscount(id_pago) {
    //   var date = moment().format("YYYY-MM-DD");
    //   form = 'id_pago=' + id_pago + '&id_contrato=' + id_contrato + "&cuota=" + $cuota.val();
    //   form += "&mora=" + $mora.val() + "&monto_extra=" + $extra.val();
    //   form += "&total=" + $total.val() + '&descuento=' + $descuento.val() + '&razon_descuento=' +$razon.val() + '&fecha_pago=' + date ;
    //   form += "&tabla=discount_pagos";
    //   connectAndSend("process/update", true, null, null, form, Payments.getAll);
    //   $modal.hide();
    // }

    // function interactiveSum(){
    //   $('.payment-sumandos').on('keyup',function(){
    //     $cuota.val(pago['cuota'] - $descuento.val());
    //     var suma = Number($cuota.val()) + Number($mora.val()) + Number($extra.val());
    //     $total.val(Number(suma))
    //   })
    // }
  }
  
}

var Damages = {
  add: function () {
    var form, idCliente, description;
    idCliente = $("#averias-client-id").val();
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
  
  function initComponents(){
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

      $('tbody').css({display:"table-row-group"});
    }

    if (currentPage == 'contratos') {
     initContractHandlers();
    }

    $("#btn-save-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      Damages.add();
    });

    averiaClientDni.on('keyup', function (e) {
      if (isComplete(averiaClientDni)) {
        var dni = getVal(averiaClientDni);
        Clients.getOne(dni,fillClientFields)
      }else{
        $('#a-client').val('');
      }
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

    $("#extra-controls").on('click',function(e){
      e.stopImmediatePropagation();
      Contracts.btnExtraPressed($(this));
    });

    $("#extra-client-dni").on('keydown',function(e){
      var key = e.which;
      var dni = $(this).val()
      if(key == 13){
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
          text: "Desea Eliminar al Usuario " + row.nombres +" "+ row.apellidos + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
           Users.delete(id);
        });
    });

    $(".edit-user").on('click', function (e) {
      e.preventDefault();
      var id  = $(this).attr('data-user-id');
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

    $("#btn-update-settings").on('click',function(e){
        e.preventDefault();
        Settings.update();
    });

    // some globals handlers

    $("#btn-save-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      Damages.add()
    });

  }
  //***************************************************     Init caja          ***************************** */
  
  function initCajaHandlers() {
    if (currentPage == 'administrador') {
      cajaTable.init();
    }



    var btnAddMoney     = $("#btn-add-money");
    var btnRetireMoney  = $("#btn-retire-money");
    var userSearch      = $("#caja-user");
    var dateSearch      = $("#caja-date");

    btnAddMoney.on('click', function (e) {
      e.stopImmediatePropagation();
      Caja.add();
    });

    btnRetireMoney.on('click', function (e) {
      e.stopImmediatePropagation();
      Caja.retire();
    });

    dateSearch.on('change',function(e){
      e.stopImmediatePropagation();
      Caja.search();
    });

    userSearch.on('change',function(e){
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
        }).then(function(){
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
        }).then(function(){
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
      $('#u-service-monthly-payment').val(Number(row.mensualidad.replace("RD$ ",'')));
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
      Generals.search(text, "servicios", serviceTable.refresh,initServicesHandlers);
    });


  }
  //***************************************************  Init Contract Handlers    ***************************** */
  function initContractHandlers() {
    contractTable.init();
    Contracts.getAll();
    
    $("#btn-save-contract").on('click', function (e) {
      e.stopImmediatePropagation();
      Contracts.add();
    });

    $("#btn-add-extra").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      Contracts.callExtra();
    });
    var cont = 0;

    $("#contract-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      Generals.search(text, "v_contratos", contractTable.refresh,null);
    });

    $("#btn-cancel-contract").on('click', function (e) {
      e.preventDefault();
      var row = contractTable.getSelectedRow();
      if (row) {
        $(".cancel-name").text(row.cliente);
        var $inputElement   = $(".confirmed-data");
        var $buttonToActive = $("#cancel-permanently");

        deleteValidation($inputElement,row.cliente, $buttonToActive);
        $("#cancel-print").attr("href",BASE_URL + 'process/getcancelcontract/'+ row.id_cliente + "/" + row.id);

        $("#cancel-contract-modal").modal();
        $buttonToActive.on('click', function (e) {
          e.stopImmediatePropagation();
          Contracts.cancel()
          $buttonToActive.attr('disable');
        })

        $inputElement.val('');
        $buttonToActive.attr('disabled', '');
      }else{
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
          text: "Desea Suspender el contrato de " + row.cliente +" ?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
           Contracts.suspend(row.id);
        });
       }else{
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

    $("#select-contract-sector").on('change',function(e){
      e.stopImmediatePropagation();
      Contracts.getIpList();
    })

    $('#select-pay-until').on('change', function(e){
      e.stopImmediatePropagation();
      var $this         = $('#select-pay-until :selected');
      var contractId    = $this.attr('data-contract');
      var lastPaymentId = $(this).val();
      Payments.updateUntil(contractId,lastPaymentId);
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
      if(id) {
        Payments.update(id);
        update_mode(id);
      }else{
        // TODO: MESSAGE Select a payment
      }
    }); 

    $("#select-contract").on('change', function (e) {
      e.stopImmediatePropagation();
      Payments.getAll();
    });

    $("#btn-reconnect").on('click',function(e) {
      e.stopImmediatePropagation()
      Contracts.reconnect()
    })

    $("#payment-detail-box").collapse()

    function update_mode(id){
      var mode = $('.payment-mode.selected').text();
      var extraInfo = {id: id.toString(),module:'pagos'}
      var form = 'data='+JSON.stringify({tipo: mode})+'&extra_info='+JSON.stringify(extraInfo);

      var send = axios.post( BASE_URL + 'process/axiosupdate',form)
      send.then(function(response){
        //TODO: something whith that / algo con esto
      });
      send.catch(function(){
        console.log(error);
      });
    }
  }
  //***************************************************      detail Handlers       ***************************** */
  function detailHandlers() {
    $("#btn-save-observations").on('click', function (e) {
      e.stopImmediatePropagation();
      Payments.saveAbonos();
    });

    $('#btn-save-real-observations').on('click',function(e){
      e.stopImmediatePropagation();
      Clients.saveObservations();
    })

    detailsContractTable.init();

  }

  function acountHandlers(){
    var $userId          = $("#acount-user-id")
    var $currentPassword = $("#acount-current-password")
    var $btnUpdateUser    = $("#update-user-data");
    var $newPassword      = $("#acount-new-password");

    $("#acount-current-password").on('keyup',function(e){
      e.stopImmediatePropagation();    
      Users.confirmPassword($userId.val(),$currentPassword.val());
    });

    $btnUpdateUser.on('click',function(e){
      e.preventDefault()
      e.stopImmediatePropagation();
      Users.updatePassword($userId.val(),$currentPassword.val(),$newPassword.val())
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbHMuanMiLCJmdW5jdGlvbnMuanMiLCJiYXNlLmpzIiwiY29udHJvbGxlcnMuanMiLCJhamF4LmpzIiwiYWpheDIuanMiLCJjaWVycmVDYWphLmpzIiwiZXh0cmFzLmpzIiwiYWRtaW5sdGUubWluLmpzIiwianF1ZXJ5LmlucHV0bWFzay5qcyIsImljaGVjay5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNTdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMWxEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImZvb3QyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBCQVNFX1VSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBcIi9cIjtcclxuaWYoQkFTRV9VUkwuaW5jbHVkZXMoXCJsb2NhbGhvc3RcIikgfHwgQkFTRV9VUkwuaW5jbHVkZXMoJ25ncm9rLmlvJykpe1xyXG4gIEJBU0VfVVJMICs9ICdpY3BheW1lbnQvJztcclxufVxyXG5cclxudmFyIE1FU1NBR0VfU1VDQ0VTUyA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZG9uZV9hbGw8L2k+JztcclxudmFyIE1FU1NBR0VfRVJST1IgICA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZXJyb3Jfb3V0bGluZTwvaT4nO1xyXG52YXIgTUVTU0FHRV9JTkZPICAgID0gJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5pbmZvX291dGxpbmU8L2k+JztcclxudmFyIFNVTU1FUl9TS1kgICAgICA9ICcjMUZBMUQwJ1xyXG5cclxuLyoqXHJcbiAqIENvbm5lY3QgQW5kIFNlbmRcclxuICogQ29uZWN0YSBhbCBzZXJ2aWRvciB2aWEgYWpheCB5IG11ZXN0cmEgZWwgbWVuc2FqZSBkZSByZXNwdWVzdGFcclxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVcmwgYSBkb25kZSBzZSB2YSBhIG1hbmRhciBsYSBlbCBmb3JtdWxhcmlvLCBzaW4gbGEgYmFzZV91cmxcclxuICogQHBhcmFtIHtib29sZWFufSBpc19tZXNzYWdlIFNpIHNlIGVzcGVyYSB1biBtZW5zYWplIG8gbm8gY29tbyByZXNwdWVzdGEgXHJcbiAqIEBwYXJhbSB7Y2FsbGJhY2t9IHJlY29nbml6ZUVsZW1lbnRzIEZ1bmNpb24gcGFyYSByZWNvbm9jZXIgbG9zIGVsZW1lbnRvcyBhdXRvZ2VuZXJhZG9zXHJcbiAqIEBwYXJhbSB7P2NhbGxiYWNrfSBhY3Rpb24gY2FsbGJhY2sgcXVlIHJlY2liZSBsb3MgZGF0b3MgZGVzZGUgZWwgc2Vydmlkb3IgcGFyYSBoYWNlciBhbGdvIGNvbiBlbGxvc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybSBmb3JtdWxhcmlvIGEgc2VyIGVudmlhZG8gYWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtjYWxsYmFja30gY2FsbGJhY2sgZnVuY2lvbiBhIHNlciBlamVjdXRhZGEgZGVzcHVlcyBxdWUgdG9kbyBzZSBjdW1wbGEsIGNvbW8gZ2V0IHVzZXJzXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGxvYWRpbmcgZnVuY3Rpb24gZm9yIGxvYWRpbmdcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBjb25uZWN0QW5kU2VuZCh1cmwsaXNfbWVzc2FnZSxyZWNvZ25pemVFbGVtZW50cyxhY3Rpb24sZm9ybSxjYWxsYmFjayxsb2FkaW5nKXtcclxuICBpZighbG9hZGluZykgbG9hZGluZyA9IGxpbmVMb2FkXHJcbiAgdmFyIGNvbm5lY3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPyBuZXcgWE1MSHR0cFJlcXVlc3QoKSA6IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyBcclxuICAgIGNvbm5lY3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNvbm5lY3QucmVhZHlTdGF0ZSA9PSA0ICYmIGNvbm5lY3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYobG9hZGluZylsb2FkaW5nKHRydWUpO1xyXG4gICAgICAgICAgaWYgKGFjdGlvbiAhPSBudWxsKSAge1xyXG4gICAgICAgICAgICAgIGFjdGlvbihjb25uZWN0LnJlc3BvbnNlVGV4dCxyZWNvZ25pemVFbGVtZW50cyk7ICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoaXNfbWVzc2FnZSl7XHJcbiAgICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoY29ubmVjdC5yZXNwb25zZVRleHQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihjYWxsYmFjayAhPSBudWxsKWNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgZWxzZSBpZiAoY29ubmVjdC5yZWFkeVN0YXRlICE9IDQpIHtcclxuICAgICAgICAgIGlmKGxvYWRpbmcpbG9hZGluZyhmYWxzZSk7ICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3Qub3BlbihcIlBPU1RcIixCQVNFX1VSTCArIHVybCwgdHJ1ZSk7XHJcbiAgICBjb25uZWN0LnNldFJlcXVlc3RIZWFkZXIoXCJjb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICBjb25uZWN0LnNlbmQoZm9ybSk7XHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogICAgICAgICBGdW5jaW9uZXMgZGUgbWVuc2FqZXMgeSBub3RpZmljYWNpb25lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vKipcclxuICogRGlzcGxheSBNZXNzYWdlXHJcbiAqIE11ZXN0cmEgdW5hIG5vdGlmaWNhY2lvbiBkZWwgcmVzdWx0YWRvIGRlIGxhIGNvbnN1bHRhXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIHN0cmluZyB0byBiZSBkaXNwbGF5ZWQgXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZGlzcGxheU1lc3NhZ2UobWVzc2FnZSl7XHJcbiAgdmFyIGNvbG9yID0gXCJyZ2JhKDEwMiwxODcsMTA2LDEpXCI7XHJcbiAgdmFyIHRvYXN0LHNwYW47XHJcblxyXG4gICAgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0VSUk9SKSl7XHJcbiAgICAgIGNvbG9yID0gXCJyZ2JhKDI0NCw2Nyw1NCwxKVwiO1xyXG4gICAgfWVsc2UgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0lORk8pKXtcclxuICAgICAgY29sb3IgPSBcInJnYmEoMiwxMzYsMjA5LDEpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgPSAkKFwiLnRvYXN0XCIpXHJcbiAgICBzcGFuID0gdG9hc3QuZmluZChcInNwYW5cIikuaHRtbChtZXNzYWdlKTtcclxuICAgIHNwYW4uY3NzKHtiYWNrZ3JvdW5kOmNvbG9yfSk7XHJcbiAgICB0b2FzdC5jc3Moe2Rpc3BsYXk6XCJmbGV4XCJ9KTtcclxuICAgIFxyXG4gICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjFcIn0sNTAwLGZ1bmN0aW9uKCl7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjBcIn0pO1xyXG4gICAgICAgIHRvYXN0LmNzcyh7ZGlzcGxheTpcIm5vbmVcIn0pO1xyXG4gICAgICB9LCAyMDAwKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5QWxlcnQodGl0bGUsbWVzc2FnZSx0eXBlKXtcclxuICBpZighdGl0bGUpIHRpdGxlID0gXCJSZXZpc2VcIjtcclxuICBpZighbWVzc2FnZSkgbWVzc2FnZSA9IFwiQXNlZ3VyYXRlIGRlIGxsZW5hciB0b2RvcyBsb3MgY2FtcG9zXCJcclxuICBpZighdHlwZSkgdHlwZSA9IFwiZXJyb3JcIlxyXG4gIHN3YWwoe1xyXG4gICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIHRleHQ6IG1lc3NhZ2UsXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bicsXHJcbiAgICAgIGJ1dHRvbnNTdHlsaW5nOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICBmdWNuaW9uZXMgcGFyYSBMbGVuYXIgdGFibGFzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogTGxlbmEgbGEgdGFibGEgYWN0dWFsIGNvbiBsb3MgZGF0b3MgcXVlIHZpZW5lbiBkZWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtzdHJpbmd9ICRjb250ZW50IEVsIGh0bWwgY29uIGxvcyBkYXRvcyBhIHNlciBtb3N0cmFkb3MsIHZpZW5lbiBzaWVtcHJlIGRlc2RlIGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEVsIGNhbGxiYWNrIHBhcmEgcmVjb25vY2VyIGEgbG9zIG51ZXZvcyBpdGVtc1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZnVuY3Rpb24gZmlsbEN1cnJlbnRUYWJsZSgkY29udGVudCxjYWxsYmFjayx0YWJsZUlEKXtcclxuICB2YXIgJHRhYmxlXHJcbiAgJChcImh0bWxcIikucmVtb3ZlQ2xhc3MoXCJncl9faWNwYXltZW50LXNvZnRfY29tXCIpXHJcbiAgaWYodGFibGVJRCAhPSB1bmRlZmluZWQpe1xyXG4gICAgJHRhYmxlID0gJCgnIycrdGFibGVJRCArIFwiIHRib2R5XCIpO1xyXG4gIH1lbHNle1xyXG4gICAgJHRhYmxlID0gJCgnW2NsYXNzKj1cInQtXCJdIHRib2R5Jyk7XHJcbiAgfVxyXG4gICR0YWJsZS5odG1sKCRjb250ZW50KTtcclxuICBpZihjYWxsYmFjaykgY2FsbGJhY2soKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExsZW5hIGxhIHRhYmxhIGNsaWVudGVzIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2xpZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2spe1xyXG4gIGZpbGxDdXJyZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2ssXCJ0LWNsaWVudHNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMbGVuYSBsYSB0YWJsYSBjYWphIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2FqYVRhYmxlKCRjb250ZW50LGNhbGxiYWNrKXtcclxuICBmaWxsQ3VycmVudFRhYmxlKCRjb250ZW50LGNhbGxiYWNrLFwiY2FqYVwiKTtcclxuICBpZihjYWxsYmFjayljYWxsYmFjaygpO1xyXG59XHJcbi8qKlxyXG4gKiBMbGVuYSBsYSBMaXN0YSBkZSBwYWdvcy9ub3RpZmljYWNpb25lcyBjb24gbG9zIGRhdG9zIHF1ZSB2aWVuZW4gZGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSAkY29udGVudCBFbCBodG1sIGNvbiBsb3MgZGF0b3MgYSBzZXIgbW9zdHJhZG9zLCB2aWVuZW4gc2llbXByZSBkZXNkZSBlbCBzZXJ2aWRvclxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBFbCBjYWxsYmFjayBwYXJhIHJlY29ub2NlciBhIGxvcyBudWV2b3MgaXRlbXNcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBmaWxsUGF5bWVudHNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIubGlzdC1uZXh0cGF5bWVudHNcIik7XHJcbiAgJGNvbnRhaW5lci5odG1sKCRjb250ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbEF2ZXJpYXNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIjYXZlcmlhcy1saXN0XCIpO1xyXG4gICRjb250YWluZXIuaHRtbCgkY29udGVudCk7XHJcbiAgY2FsbGJhY2soKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbEluc3RhbGxhdGlvbnNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIjaW5zdGFsbGF0aW9ucy1saXN0XCIpO1xyXG4gICRjb250YWluZXIuaHRtbCgkY29udGVudCk7XHJcbiAgY2FsbGJhY2soKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUNvbnRyYWN0TGlzdChyZXNwb25zZSxjYWxsYmFjayl7XHJcbiAgaWYocmVzcG9uc2UgIT0gXCJuYWRhXCIpe1xyXG4gICAgXHJcbiAgICB2YXIgY29udHJhY3RzID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcbiAgICB2YXIgdmFsdWUsc2VydmljZSxlcXVpcG1lbnQsZU1hYyxyb3V0ZXIsck1hYyxjb2RlO1xyXG4gICAgdmFyIHNlbGVjdENvbnRyYWN0ID0gJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIik7XHJcbiAgICB2YXIgZWxlbWVudCA9IFwiPG9wdGlvbiB2YWx1ZT0nJz4tLVNlbGVjY2lvbmEtLTwvb3B0aW9uPlwiO1xyXG4gICAgdmFyIGNsaWVudGUgPSBjb250cmFjdHMuY2xpZW50ZTtcclxuICAgIHZhciBjb250cmFjdElkID0gY29udHJhY3RUYWJsZS5nZXRJZCgpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udHJhY3RzLmNvbnRyYXRvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YWx1ZSAgICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wiaWRfY29udHJhdG9cIl07XHJcbiAgICAgIHNlcnZpY2UgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJzZXJ2aWNpb1wiXTtcclxuICAgICAgZXF1aXBtZW50ID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcIm5vbWJyZV9lcXVpcG9cIl07XHJcbiAgICAgIHJvdXRlciAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJyb3V0ZXJcIl07XHJcbiAgICAgIGVNYWMgICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJtYWNfZXF1aXBvXCJdO1xyXG4gICAgICByTWFjICAgICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wibWFjX3JvdXRlclwiXTtcclxuICAgICAgY29kZSAgICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wiY29kaWdvXCJdO1xyXG4gICAgICBlbGVtZW50ICs9IFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyB2YWx1ZSArIFwiJyBkYXRhLXNlcnZpY2U9J1wiK3NlcnZpY2UrXCInICBkYXRhLWVxdWlwbWVudD0nXCIrZXF1aXBtZW50K1wiJyAgZGF0YS1lLW1hYz0nXCIrZU1hYytcIidcIjtcclxuICAgICAgZWxlbWVudCArPSBcIiBkYXRhLXJvdXRlcj0nXCIrcm91dGVyK1wiJyAgZGF0YS1yLW1hYz0nXCIrck1hYytcIicgZGF0YS1jb2RlPSdcIitjb2RlK1wiJz5cIjtcclxuICAgICAgZWxlbWVudCArPSB2YWx1ZSArXCI8L29wdGlvbj5cIjsgIFxyXG4gICAgfVxyXG4gICAgc2VsZWN0Q29udHJhY3QuaHRtbChlbGVtZW50KTtcclxuICAgIHNlbGVjdENvbnRyYWN0LnZhbChjb250cmFjdElkKS5jaGFuZ2UoKTtcclxuICAgICQoXCIjZXh0cmEtY2xpZW50LW5hbWVcIikudmFsKGNsaWVudGVbJ25vbWJyZXMnXSArIFwiIFwiICsgY2xpZW50ZVsnYXBlbGxpZG9zJ10pO1xyXG5cclxuICB9ZWxzZXtcclxuICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfRVJST1IgKyBcIiBFc3RlIGNsaWVudGUgbm8gZXhpc3RlIHJldmlzZSBzdSBjZWR1bGEgcG9yIGZhdm9yXCIpO1xyXG4gIH0gXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyVGJvZHkob2JqZWNJZCl7XHJcbiAgJChvYmplY0lkKS5odG1sKFwiXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWxsQ2xpZW50RmllbGRzKHJlc3BvbnNlLGNhbGxiYWNrKXtcclxuICBpZihyZXNwb25zZSAhPSBcIm5hZGFcIil7IFxyXG4gICAgdmFyIGNsaWVudGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcclxuICAgICQoXCIjYXZlcmlhcy1jbGllbnQtaWRcIikudmFsKGNsaWVudGVbJ2lkX2NsaWVudGUnXSk7XHJcbiAgICAkKFwiI2EtY2xpZW50XCIpLnZhbChjbGllbnRlWydub21icmVzJ10gKyBcIiBcIiArIGNsaWVudGVbJ2FwZWxsaWRvcyddKVxyXG4gIH1lbHNle1xyXG4gICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArIFwiIEVzdGUgY2xpZW50ZSBubyBleGlzdGUgcmV2aXNlIHN1IGNlZHVsYSBwb3IgZmF2b3JcIik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlUGF5bWVudExpc3QocmVzcG9uc2UsY2FsbGJhY2spe1xyXG4gIHZhciBzZWxlY3RQYXlVbnRpbCA9ICQoJyNzZWxlY3QtcGF5LXVudGlsJyk7XHJcbiAgc2VsZWN0UGF5VW50aWwuaHRtbChyZXNwb25zZSk7XHJcbiAgc2VsZWN0UGF5VW50aWwucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICBzZWxlY3RQYXlVbnRpbC5jaGFuZ2UoKTtcclxuICBpZihjYWxsYmFjayljYWxsYmFjaygpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIGlzRW1wdHlcclxuICogVmVyaWZpY2Egc2kgbG9zIHZhbG9yZXMgZGFkb3MgZXN0YW4gdmFjaW9zIG8gc29uIG51bG9zIFxyXG4gKiBAcGFyYW0ge0FycmF5LiA8IHN0cmluZ30gdmFsdWVzXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0VtcHR5KHZhbHVlcyxpc19udW0pe1xyXG4gIGZvcih2YXIgaSA9IDAgOyBpIDwgdmFsdWVzLmxlbmd0aCA7IGkrKyl7XHJcbiAgICBpZiAodmFsdWVzW2ldID09IG51bGwgfHwgdmFsdWVzW2ldID09IFwiXCIpe1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gXHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNhbGRvKG1vbmV5KXtcclxuICBtb25leSA9IFwiUkQkIFwiKyBDdXJyZW5jeUZvcm1hdChtb25leSlcclxuICAkKFwiLmN1cnJlbnQtc2FsZG9cIikudGV4dChtb25leSk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlQ291bnQoJGNvbnRlbnQpe1xyXG4gICQoXCIudG90YWwtcm93c1wiKS5odG1sKCRjb250ZW50KTtcclxufVxyXG4vLyArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXHJcbi8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXIgcGFzc3dvcmRzIHZhbGlkYXRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4vLyArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXHJcbi8vXHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGFsKCRtb2RhbElkKXtcclxuICB2YXIgJHVzZXJQYXNzd29yZCA9ICQoJG1vZGFsSWQrJyAucGFzc3dvcmQnKTtcclxuICB2YXIgJHVzZXJQYXNzd29yZENvbmZpcm0gPSAkKCRtb2RhbElkKycgLnBhc3N3b3JkLWNvbmZpcm0nKTtcclxuICB2YXIgJHNhdmVCdXR0b24gPSAkKCRtb2RhbElkKycgLnNhdmUnKTtcclxuICBcclxuICAkdXNlclBhc3N3b3JkQ29uZmlybS5vbignYmx1ciBrZXl1cCcsZnVuY3Rpb24oKXtcclxuICAgIHZhbGlkYXRlVHdvKCR1c2VyUGFzc3dvcmQsJHVzZXJQYXNzd29yZENvbmZpcm0sJHNhdmVCdXR0b24pO1xyXG4gIH0pO1xyXG4gICRzYXZlQnV0dG9uLm9uKCdjbGljaycsY2xlYXJGb3JtKCRtb2RhbElkKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlVHdvKCRmaXJzdE9iamVjdCwkc2Vjb25kT2JqZWN0LCRidXR0b24pe1xyXG4gICAgaWYoJHNlY29uZE9iamVjdC52YWwoKSA9PSAkZmlyc3RPYmplY3QudmFsKCkgJiYgJHNlY29uZE9iamVjdC52YWwoKSAhPSBcIlwiKXtcclxuICAgICAgcmVwbGFjZUNsYXNzKCRmaXJzdE9iamVjdC5wYXJlbnQoKSxcImhhcy1lcnJvclwiLFwiaGFzLXN1Y2Nlc3NcIik7XHJcbiAgICAgIHJlcGxhY2VDbGFzcygkc2Vjb25kT2JqZWN0LnBhcmVudCgpLFwiaGFzLWVycm9yXCIsXCJoYXMtc3VjY2Vzc1wiKTtcclxuICAgICAgJGJ1dHRvbi5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIixcIlwiKTtcclxuXHJcbiAgICB9ZWxzZXtcclxuICAgICAgIHJlcGxhY2VDbGFzcygkZmlyc3RPYmplY3QucGFyZW50KCksXCJoYXMtc3VjY2Vzc1wiLFwiaGFzLWVycm9yXCIpO1xyXG4gICAgICAgcmVwbGFjZUNsYXNzKCRzZWNvbmRPYmplY3QucGFyZW50KCksXCJoYXMtc3VjY2Vzc1wiLFwiaGFzLWVycm9yXCIpO1xyXG4gICAgICAgJGJ1dHRvbi5hdHRyKFwiZGlzYWJsZWRcIixcIlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVUaGlzKCl7XHJcbiAgdmFyICR1c2VyUGFzc3dvcmQgPSAkKCcucGFzc3dvcmQnKTtcclxuICB2YXIgJHVzZXJQYXNzd29yZENvbmZpcm0gPSAkKCcucGFzc3dvcmQtY29uZmlybScpO1xyXG4gIHZhciAkc2F2ZUJ1dHRvbiA9ICQoJy5zYXZlJyk7XHJcbiAgXHJcbiAgJHVzZXJQYXNzd29yZC5vbignYmx1ciBrZXl1cCcsZnVuY3Rpb24oKXtcclxuICAgIHZhbGlkYXRlVHdvKCR1c2VyUGFzc3dvcmQsJHVzZXJQYXNzd29yZENvbmZpcm0sJHNhdmVCdXR0b24pO1xyXG4gIH0pO1xyXG4gICR1c2VyUGFzc3dvcmRDb25maXJtLm9uKCdibHVyIGtleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVUd28oJHVzZXJQYXNzd29yZCwkdXNlclBhc3N3b3JkQ29uZmlybSwkc2F2ZUJ1dHRvbik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyRm9ybShtb2RhbElkKXtcclxuICAkKG1vZGFsSWQgKyBcIiBpbnB1dFwiKS52YWwoXCJcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVZhbGlkYXRpb24oJGlucHV0RWxlbWVudCwgdGV4dCwgJGJ1dHRvblRvQWN0aXZlKXtcclxuICB2YXIgaW5uZXJUZXh0O1xyXG4gIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgdmFyIHNlbGYgID0gdGhpcztcclxuICAkaW5wdXRFbGVtZW50Lm9uKFwia2V5dXBcIixmdW5jdGlvbihlKXtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBpbm5lclRleHQgPSAkKHRoaXMpLnZhbCgpIFxyXG4gICAgaWYoaW5uZXJUZXh0LnRvTG93ZXJDYXNlKCkgPT0gc2VsZi50ZXh0LnRvTG93ZXJDYXNlKCkpe1xyXG4gICAgICAkYnV0dG9uVG9BY3RpdmUucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG5cclxuICAgIH1lbHNle1xyXG4gICAgICAkYnV0dG9uVG9BY3RpdmUuYXR0cihcImRpc2FibGVkXCIsXCJcIik7XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdW5jaW9uZXMgZGUgdXRpbGVyaWEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbi8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vL1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJlcGxhY2VDbGFzcygkb2JqZWN0LG9sZENsYXNzLG5ld0NsYXNzKXtcclxuICAgJG9iamVjdC5hZGRDbGFzcyhuZXdDbGFzcyk7XHJcbiAgICRvYmplY3QucmVtb3ZlQ2xhc3Mob2xkQ2xhc3MpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VTZXJ2aWNlQ2FyZENsaWNrYWJsZSgpe1xyXG4gICAgdmFyIHNlcnZpY2VDYXJkICAgICAgPSAkKFwiLnNlcnZpY2UtY2FyZFwiKTtcclxuICAgIHZhciBidG5QcmludENvbnRyYWN0ID0gJCgnI2J0bi1wcmludC1yZXF1aXJlbWVudCcpO1xyXG5cclxuICAgIHNlcnZpY2VDYXJkLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciAkdGhpcyAgICAgICA9ICQodGhpcyk7XHJcbiAgICAgIHZhciBzZXJ2aWNlX2lkICA9ICR0aGlzLmF0dHIoJ2RhdGEtaWQnKTsgXHJcbiAgICAgIHZhciBwYXltZW50ICAgICA9ICR0aGlzLmF0dHIoJ2RhdGEtcGF5bWVudCcpO1xyXG4gICAgICB2YXIgcmVhbExpbmsgICAgPSBidG5QcmludENvbnRyYWN0LmF0dHIoJ2RhdGEtaHJlZicpXHJcbiAgICAgIFxyXG4gICAgICBzZXJ2aWNlQ2FyZC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgIGJ0blByaW50Q29udHJhY3QuYXR0cihcImhyZWZcIixyZWFsTGluayArIFwiL1wiICsgc2VydmljZV9pZCk7XHJcbiAgICAgICQoJyNjb250cmFjdC1jbGllbnQtcGF5bWVudCcpLnZhbChwYXltZW50KVxyXG4gICAgfSlcclxufVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgVmVyaWZ5IFJvd3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5mdW5jdGlvbiB2ZXJpZnlDb250cmFjdFN0YXR1cygpe1xyXG4gICQoXCIudGQtZXN0YWRvXCIpLmVhY2goZnVuY3Rpb24oaSx2YWx1ZSl7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdmFyIHRleHQgPSAkdGhpcy50ZXh0KCkudHJpbSgpO1xyXG4gICAgaWYodGV4dCA9PSBcImFjdGl2b1wiKXtcclxuICAgICAgJHRoaXMuY3NzKHtjb2xvcjpcImdyZWVuXCJ9KVxyXG4gICAgfWVsc2UgaWYodGV4dCA9PSBcInNhbGRhZG9cIil7XHJcbiAgICAgICR0aGlzLnBhcmVudHMoXCJ0clwiKS5jc3Moe2JhY2tncm91bmQ6XCJyZ2JhKDIyLDI1NSwwLC4zKVwiLGNvbG9yOlwiIzU1NVwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlcmlmeUNsaWVudFN0YXR1cygpe1xyXG4gICAkKFwidGRcIikuZWFjaChmdW5jdGlvbihpLHZhbHVlKXtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICB2YXIgdGV4dCA9ICR0aGlzLnRleHQoKS50cmltKCk7XHJcbiAgICBpZih0ZXh0ID09IFwibm8gYWN0aXZvXCIpe1xyXG4gICAgICAkdGhpcy5jc3Moe2NvbG9yOlwicmdiYSgyMDAsMCwwLC43KVwifSlcclxuICAgIH1lbHNlIGlmKHRleHQgPT0gXCJhY3Rpdm9cIil7XHJcbiAgICAgICR0aGlzLmNzcyh7Y29sb3I6XCJncmVlblwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICAgICAgICAgICAgICAgICBMb2FkZXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5mdW5jdGlvbiBoZWF2eUxvYWQoc3RvcCl7XHJcbiAgaWYoIXN0b3Ape1xyXG4gICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cImhlYXZ5LWxvYWRlciBhY3RpdmVcIj4nXHJcbiAgICAgICAgaHRtbCArPSAgICc8ZGl2IGNsYXNzPVwiY2lyY2xlLWxvYWRcIj48L2Rpdj4nXHJcbiAgICAgICAgaHRtbCArPSAgICc8ZGl2IGNsYXNzPVwibWVzc2FnZVwiPlByZXBhcmFuZG8gbG9zIGRhdG9zPC9kaXY+J1xyXG4gICAgICAgIGh0bWwgKz0gJzwvZGl2PidcclxuICAgICQoXCJib2R5XCIpLmFwcGVuZChodG1sKVxyXG4gICAgJChcImJvZHlcIikuY3NzKHtvdmVyZmxvdzpcImhpZGRlblwifSk7XHJcbiAgICB2YXIgbWVzc2FnZSA9ICQoXCIuaGVhdnktbG9hZGVyIC5tZXNzYWdlXCIpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBtZXNzYWdlLnRleHQoXCJDb25maWd1cmFuZG8uLi5cIik7XHJcbiAgICB9LDQwMDApXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIkNhc2kgVGVybWluYW1vcyAuLi5cIik7XHJcbiAgICB9LDgwMDApXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIlRlcm1pbmFuZG8gZWwgcHJvY2VzbyAuLi5cIik7XHJcbiAgICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gICAgfSwxNTAwMClcclxuICB9ZWxzZXtcclxuICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlTG9hZGVyKCl7XHJcbiAgICB2YXIgbG9hZGVyID0gJChcIi5oZWF2eS1sb2FkZXJcIik7XHJcbiAgICBsb2FkZXIucmVtb3ZlKCk7XHJcbiAgICAkKFwiYm9keVwiKS5jc3Moe292ZXJmbG93OlwiYXV0b1wifSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaW5lTG9hZChzdG9wKSB7XHJcbiAgaWYoIXN0b3Ape1xyXG4gICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxyXG4gICAgICB9KTtcclxuICB9ZWxzZXtcclxuICAgICQoXCIubG9hZGVyXCIpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcclxuICB9XHJcbn0iLCIvLyBmdW5jaW9uZXMgZGUgYm9vdHN0cmFwXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKClcclxufSk7XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVBhc3N3b3JkKHBhc3N3b3JkKXtcclxuICB2YXIgZXhwcmVzc2lvbiA9ICcnO1xyXG4gIHZhciBoYXNfbG93ZXJjYXNlID0gZmFsc2U7XHJcbiAgdmFyIGhhc191cHBlcmNhc2UgPSBmYWxzZTtcclxuICB2YXIgaGFzX2RpZ2l0ID0gJy8qXFxkJztcclxuXHJcbiAgaWYocGFzc3dvcmQubGVuZ3RoID4gOCkgYWxlcnQoXCJtYXlvciBhIDhcIilcclxuICBpZigvXFxkLy50ZXN0KHBhc3N3b3JkKSlhbGVydChcInRpZW5lIGRpZ2l0b1wiKVxyXG4gIGlmKC9bYS16XS8udGVzdChwYXNzd29yZCkpYWxlcnQoXCJ0aWVuZSBtaW5pc2N1bGFzXCIpXHJcbiAgaWYoL1tBLVpdLy50ZXN0KHBhc3N3b3JkKSkgYWxlcnQoJ3RpZW5lIG1heXVzY3VsYXMnKVxyXG59IiwiJChmdW5jdGlvbigpe1xyXG4gIHZhciBjdXJyZW50UGFnZSA9ICQoXCJ0aXRsZVwiKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xyXG4gIGN1cnJlbnRQYWdlICAgPSBjdXJyZW50UGFnZVs0XS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICBpZihjdXJyZW50UGFnZSA9PSBcImFkbWluaXN0cmFkb3JcIikge1xyXG4gICAgbmV3VXNlckZvcm0oKTtcclxuICB9XHJcbiAgZ2V0RGF0ZSgpO1xyXG4gIGFkbWluRnVuY3Rpb25zKCk7XHJcbiAgdXNlckluZm9UaXAoKTtcclxuICBtYWtlU2VydmljZUNhcmRDbGlja2FibGUoKTtcclxuICBkZXRhaWxzRnVuY3Rpb25zKCk7XHJcbiAgbm90aWZpY2F0aW9uRnVuY3Rpb25zKCk7XHJcbiAgbmV3Q29udHJhY3RGdW5jdGlvbnMoKTtcclxuICBjaGVja1dpbmRvd1NpemUoKTtcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsZnVuY3Rpb24oKXtcclxuICAgIGNoZWNrV2luZG93U2l6ZSgpO1xyXG4gIH0pXHJcbiAgXHJcbi8qKlxyXG4gKiBHZXQgRGF0ZTpcclxuICogT2J0aWVuZSBsYSBmZWNoYSBhY3R1YWwgYWwgc2VndW5kbyB5IGxhIG11ZXN0cmEgZW4gbGEgcGFudGFsbGEgZGUgaW5pY2lvXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXREYXRlKCl7XHJcbiAgdmFyICRkYXkgPSAkKCcuZGF5Jyk7XHJcbiAgdmFyICRtb250aFllYXIgPSAkKCcubW9udGgteWVhcicpO1xyXG4gIHZhciAkZGF5V2VlayA9ICQoJy5kYXl3ZWVrJyk7XHJcbiAgdmFyICRIb3JhID0gJCgnLmhvdXIgc3BhbicpO1xyXG4gIHZhciBkYXRlLGRheSxtb250aCx5ZWFyLHNIb3VyO1xyXG4gIHZhciBkYXlzID0gW1wiRG9taW5nb1wiLFwiTHVuZXNcIixcIk1hcnRlc1wiLFwiTWllcmNvbGVzXCIsXCJKdWV2ZXNcIixcIlZpZXJuZXNcIixcIlNhYmFkb1wiXTtcclxuICB2YXIgbW9udGhzID0gW1wiRW5lcm9cIixcIkZlYnJlcm9cIixcIk1hcnpvXCIsXCJBYnJpbFwiLFwiTWF5b1wiLFwiSnVuaW9cIixcIkp1bGlvXCIsXCJBZ29zdG9cIixcIlNlcHRpZW1icmVcIixcIk9jdHVicmVcIixcIk5vdmllbWJyZVwiLFwiRGljaWVtYnJlXCJdO1xyXG5cclxuICBzZXRJbnRlcnZhbCh1cGRhdGVIb3VyLDEwMDApO1xyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVIb3VyKCl7XHJcbiAgICBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIHNEYXRlID0gZGF0ZS50b1N0cmluZygpXHJcbiAgICAkZGF5LnRleHQoZGF0ZS5nZXREYXRlKCkpO1xyXG4gICAgJG1vbnRoWWVhci50ZXh0KFwiRGUgXCIgKyBtb250aHNbZGF0ZS5nZXRNb250aCgpXSArIFwiIGRlIFwiICsgZGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICRkYXlXZWVrLnRleHQoZGF5c1tkYXRlLmdldERheSgpXSk7XHJcbiAgICBcclxuICAgIHNIb3VyID0gbW9tZW50KCkuZm9ybWF0KCdMVFMnKTtcclxuICAgICAkSG9yYS5odG1sKHNIb3VyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZG1pbiBGdW5jdGlvbnM6XHJcbiAqIHNlIGVuY2FyZ2EgZGUgZWwgbW92aW1pZW50byBkZSBsb3MgcGFuZWxlcyBlbiBsYSBwYW50YWxsYSAnYWRtaW5pc3RyYWRvcidcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBhZG1pbkZ1bmN0aW9ucygpe1xyXG4gICQoJyNjb21wYW55LXNlY3Rpb24nKS5hbmltYXRlKHtsZWZ0OlwiMFwifSwyMDApXHJcbiAgJCgnLmFkbWluaXN0cmFkb3IgLmFzaWRlLWJ1dHRvbnMgYScpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdmFyIGNhcmROYW1lID0gJHRoaXMuYXR0cignaHJlZicpLnNsaWNlKDEpO1xyXG4gICAgaWYoY2FyZE5hbWUgIT0gbnVsbCl7XHJcbiAgICAgICQoJy5jb21wYW55LWRldGFpbHMnKS5hbmltYXRlKHtsZWZ0OlwiLTExMCVcIn0sMjAwKVxyXG4gICAgICAkKCcjJytjYXJkTmFtZSsnLmNvbXBhbnktZGV0YWlscycpLmFuaW1hdGUoe2xlZnQ6XCIwXCJ9LDIwMClcclxuICAgIH0gIFxyXG4gIH0pXHJcblxyXG4gIGlmKCQoXCIjYWNvdW50LXNlY3Rpb25cIikubGVuZ3RoID4gMCl7XHJcbiAgICAkKCcjYWNvdW50LXNlY3Rpb24nKS5hbmltYXRlKHtsZWZ0OlwiMFwifSwyMDApXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogbmV3IFVzZXIgRm9ybTpcclxuICogdmFpZGEgbGFzIGNvbnRyYXNlw7FhcyBlbiBsb3MgZm9ybXVsYXJpb3MgZGUgbG9zIHVzdWFyaW9zXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBuZXdVc2VyRm9ybSgpe1xyXG4gIHZhbGlkYXRlTW9kYWwoXCIjbmV3LXVzZXItbW9kYWxcIik7XHJcbiAgdmFsaWRhdGVNb2RhbChcIiN1cGRhdGUtdXNlci1tb2RhbFwiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZXIgSW5mbyBUaXBcclxuICogaGFjZSB1biB0b2dnbGUgZW4gbGEgdmlzaWJpbGlkYWQgZGUgbGEgaW5mbyBkZWwgdXN1YXJpb1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZnVuY3Rpb24gdXNlckluZm9UaXAoKXtcclxuICB2YXIgaW5mb1RpcCA9ICQoXCIudXNlci1pbmZvLXRpcFwiKTtcclxuICB2YXIgcHJvZmlsZVBpY3R1cmUgPSAkKFwiLnByb2ZpbGUtcGljdHVyZVwiKTtcclxuICB2YXIgYnRuTW9yZSA9ICQoXCIuYnRuLW1vcmVcIik7XHJcblxyXG4gIGJ0bk1vcmUub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgIGluZm9UaXAudG9nZ2xlQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG4gIH0pO1xyXG59XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gbmV3Q29udHJhY3RGdW5jdGlvbnMoKXtcclxuICB2YXIgYnRuUHJpbnRDb250cmFjdCA9ICQoXCIjYnRuLXByaW50LWNvbnRyYWN0XCIpO1xyXG4gIHZhciBkb2N1bWVudCA9ICQoXCIubm90ZS1pdGVtXCIpO1xyXG4gIHZhciByYWRpb0FjdGl2YXRlQ29udHJhY3QgPSAkKFwiI3JhZGlvLW5ldy1jb250cmFjdFwiKTtcclxuICB2YXIgcmFkaW9EaXNhYmxlQ29udHJhY3QgPSAkKFwiI3JhZGlvLWp1c3QtcmVxdWlyZW1lbnRcIik7XHJcbiAgdmFyIGNvbnRyYWN0Q29udHJvbHMgPSAkKFwiLmNvbnRyYWN0LWNvbnRyb2xzXCIpO1xyXG4gIHZhciByZXF1aXJlbWVudENvbnRyb2xzID0gJChcIi5yZXF1aXJlbWVudC1jb250cm9sc1wiKTtcclxuXHJcbiAgcmFkaW9BY3RpdmF0ZUNvbnRyYWN0LnBhcmVudHMoXCJsYWJlbFwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgIGFjdGl2YXRlQ29udHJhY3RNb2RlKCk7IFxyXG5cclxuICB9KTtcclxuXHJcbiAgcmFkaW9EaXNhYmxlQ29udHJhY3QucGFyZW50cyhcImxhYmVsXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGRpc2FibGVDb250cmFjdE1vZGUoKVxyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBhY3RpdmF0ZUNvbnRyYWN0TW9kZSgkYnRuKXtcclxuICAgIHJhZGlvRGlzYWJsZUNvbnRyYWN0XHJcbiAgICAgIC5yZW1vdmVBdHRyKFwiY2hlY2tlZFwiLFwiXCIpXHJcbiAgICAgIC5odG1sKFwiXCIpXHJcbiAgICByYWRpb0FjdGl2YXRlQ29udHJhY3RcclxuICAgICAgLmF0dHIoXCJjaGVja2VkXCIsXCJcIilcclxuICAgICAgLmh0bWwoXCImIzEwMDA0O1wiKVxyXG4gICAgZG9jdW1lbnQucmVtb3ZlQ2xhc3MoXCJwcmludC1yZXF1aXJlbWVudFwiKTtcclxuICAgIGNvbnRyYWN0Q29udHJvbHMucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpXHJcbiAgICByZXF1aXJlbWVudENvbnRyb2xzLmFkZENsYXNzKFwiaGlkZVwiKVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkaXNhYmxlQ29udHJhY3RNb2RlKCRidG4pe1xyXG4gICAgcmFkaW9BY3RpdmF0ZUNvbnRyYWN0XHJcbiAgICAgIC5yZW1vdmVBdHRyKFwiY2hlY2tlZFwiLFwiXCIpXHJcbiAgICAgIC5odG1sKFwiXCIpXHJcbiAgICByYWRpb0Rpc2FibGVDb250cmFjdFxyXG4gICAgICAuYXR0cihcImNoZWNrZWRcIixcIlwiKVxyXG4gICAgICAuaHRtbChcIiYjMTAwMDQ7XCIpXHJcbiAgICBkb2N1bWVudC5hZGRDbGFzcyhcInByaW50LXJlcXVpcmVtZW50XCIpO1xyXG4gICAgcmVxdWlyZW1lbnRDb250cm9scy5yZW1vdmVDbGFzcyhcImhpZGVcIilcclxuICAgIGNvbnRyYWN0Q29udHJvbHMuYWRkQ2xhc3MoXCJoaWRlXCIpXHJcbiAgfVxyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWxzIEZ1bmN0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbiQoJyNzZWFyY2gtY2xpZW50LW1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICB2YXIgYnV0dG9uID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KTtcclxuICBjbGllbnRUYWJsZS5pbml0KCk7XHJcbiAgdmFyIHRpdGxlID0gYnV0dG9uLmZpbmQoJy5zZWN0aW9uLXRpdGxlJykudGV4dCgpO1xyXG4gIGlmKCF0aXRsZSkgdGl0bGUgPSBcIkJ1c2NhciBDbGllbnRlXCJcclxuICBpZih0aXRsZS50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PSBcInJlZ2lzdHJhciBwYWdvXCIpe1xyXG4gICAgYnV0dG9uVGV4dCA9IFwiaXIgYSBQYWdvc1wiXHJcbiAgfWVsc2V7XHJcbiAgICBidXR0b25UZXh0ID0gXCJOdWV2byBDb250cmF0b1wiXHJcbiAgfVxyXG4gIFxyXG4gIHZhciBtb2RhbCA9ICQodGhpcylcclxuICBtb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS50ZXh0KHRpdGxlKVxyXG4gIG1vZGFsLmZpbmQoJy5tb2RhbC1mb290ZXIgLnNhdmUnKS50ZXh0KGJ1dHRvblRleHQpXHJcbiAgbW9kYWwuZmluZCgndGJvZHknKS5odG1sKCcnKVxyXG59KVxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgb3RoZXIgZnVuY3Rpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5mdW5jdGlvbiBkZXRhaWxzRnVuY3Rpb25zKCl7XHJcbiAgdmFyIHNtYWxsQnV0dG9uc1NlbGVjdCA9ICQoJy5idG4tc21hbGwnKTtcclxuXHJcbiAgJCgnW3JvbGU9XCJ0YWJcIl0nKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIilcclxuICAgIGlmKGhyZWYgPT0gXCIjcGF5bWVudHNcIiB8fGhyZWYgPT0gXCIjZGV0YWxsZXNfZGVfcGFnb1wiIHx8IGhyZWYgPT0gXCIjZGVzY3VlbnRvXCIgfHwgaHJlZiA9PSBcIiNtb250aC1hbmQtZGF0ZVwiIHx8IGhyZWYgPT0gXCIjcmVjb25uZWN0LXNlcnZpY2VcIikge1xyXG4gICAgICAkKFwiLnBheW1lbnQtY29udHJvbHNcIikuYWRkQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICQoXCIucGF5bWVudC1jb250cm9sc1wiKS5yZW1vdmVDbGFzcyhcInZpc2libGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoaHJlZiA9PSBcIiNjb250cmFjdHNcIil7XHJcbiAgICAgICQoXCIuY29udHJhY3QtY29udHJvbHNcIikuYWRkQ2xhc3MoXCJ2aXNpYmxlXCIpXHJcbiAgICB9ZWxzZXtcclxuICAgICAgJChcIi5jb250cmFjdC1jb250cm9sc1wiKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRUYWJDb250cm9scygkKHRoaXMpKTtcclxuICB9KTtcclxuXHJcbiAgJCgnLmJ0bi1zbWFsbCcpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIHNtYWxsQnV0dG9uc1NlbGVjdC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGFiQ29udHJvbHMoJHRoaXMpe1xyXG4gIHZhciBjb250cm9scyA9ICR0aGlzLmF0dHIoXCJhcmlhLWNvbnRyb2xzXCIpO1xyXG4gICQoXCIuZHluYW1pYy1jb250cm9sc1wiKS50ZXh0KGNvbnRyb2xzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm90aWZpY2F0aW9uRnVuY3Rpb25zKCl7XHJcbiAgdmFyIGJ0bkF2ZXJpYXMgICAgICA9ICQoXCIjYnRuLXNlZS1hdmVyaWFzXCIpO1xyXG4gIHZhciBidG5QYWdvcyAgICAgICAgPSAkKFwiI2J0bi1zZWUtcGFnb3NcIik7XHJcbiAgdmFyIGJ0bkNhamFDaGljYSAgICA9ICQoJyNidG4tc2VlLWNhamEnKTtcclxuICB2YXIgYnRuRGV1ZG9yZXMgICAgID0gJChcIiNidG4tc2VlLWRldWRvcmVzXCIpXHJcbiAgdmFyIGJ0bkRheUluY29tZXMgICA9ICQoXCIjYnRuLXNlZS1kYXktaW5jb21lc1wiKVxyXG4gIHZhciBsYXlvdXRDb250YWluZXIgPSAkKFwiLmxheW91dC1jb250YWluZXJcIik7XHJcblxyXG4gIGJ0bkF2ZXJpYXMub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgbGF5b3V0Q29udGFpbmVyLmFuaW1hdGUoe2xlZnQ6XCItMTAwJVwifSwyMDApO1xyXG4gIH0pO1xyXG5cclxuICBidG5QYWdvcy5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7bGVmdDpcIjBcIn0sMjAwKTtcclxuICB9KTtcclxuXHJcbiAgYnRuRGV1ZG9yZXMub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgbGF5b3V0Q29udGFpbmVyLmFuaW1hdGUoe2xlZnQ6XCItMjAwJVwifSwyMDApO1xyXG4gIH0pO1xyXG5cclxuICAgYnRuRGF5SW5jb21lcy5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7bGVmdDpcIi0zMDAlXCJ9LDIwMCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbiQoXCIjc2VsZWN0LWV4dHJhLXNlcnZpY2VcIikub24oJ2NoYW5nZScsZnVuY3Rpb24oKXtcclxuICB2YXIgJHRoaXMgPSAkKChcIiNzZWxlY3QtZXh0cmEtc2VydmljZSA6c2VsZWN0ZWRcIikpO1xyXG4gIHZhciBjb3N0ID0gJHRoaXMuYXR0cihcImRhdGEtcGF5bWVudFwiKTtcclxuICBcclxuICAkKFwiI2V4dHJhLXNlcnZpY2UtY29zdFwiKS52YWwoY29zdClcclxufSk7XHJcblxyXG4kKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS5vbignY2hhbmdlJyxmdW5jdGlvbigpe1xyXG4gIHZhciAkdGhpcyA9ICQoKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdCA6c2VsZWN0ZWRcIikpO1xyXG4gIFxyXG4gICQoXCIjZXh0cmEtY29udHJhY3Qtc2VydmljZVwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtc2VydmljZVwiKSk7XHJcbiAgJChcIiNleHRyYS1lcXVpcG9cIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWVxdWlwbWVudFwiKSk7XHJcbiAgJChcIiNleHRyYS1yb3V0ZXJcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLXJvdXRlclwiKSk7XHJcbiAgJChcIiNleHRyYS1lLW1hY1wiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtZS1tYWNcIikpO1xyXG4gICQoXCIjZXh0cmEtci1tYWNcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLXItbWFjXCIpKTtcclxuICAkKFwiI2V4dHJhLWNvZGVcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWNvZGVcIikpO1xyXG59KTtcclxuXHJcbiQoXCIuY29sdW1ucy1yaWdodFwiKS5yZW1vdmVDbGFzcyhcInB1bGwtcmlnaHRcIik7XHJcblxyXG4kKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XHJcbiAgdmFyICR0aGlzID0gJCgoXCIjc2VsZWN0LWNvbnRyYWN0LWNvZGUgOnNlbGVjdGVkXCIpKTtcclxuICAkKFwiI2NvbnRyYWN0LWlwXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1pcC1maW5hbFwiKSk7XHJcbiAgJChcIiN1LWNvbnRyYWN0LWlwXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1pcC1maW5hbFwiKSk7XHJcbiBcclxufSk7XHJcblxyXG5mdW5jdGlvbiBjaGVja1dpbmRvd1NpemUoKSB7XHJcbiAgdmFyIHdpZHRoID0gd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoO1xyXG4gIHZhciBicmFuZE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnJhbmQgc3BhbicpO1xyXG4gIFxyXG4gIGlmKHdpZHRoIDw9IDExMDApe1xyXG4gICAgYnJhbmROYW1lLnRleHRDb250ZW50ID0gXCJQXCI7XHJcbiAgfWVsc2V7XHJcbiAgICBicmFuZE5hbWUudGV4dENvbnRlbnQgPSBcIlBheW1lbnRcIjtcclxuICB9XHJcbn1cclxuXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gIHBvc2l0aW9uID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpXHJcbiAgbW92YWJsZU5hdiA9ICQoJy5hc2lkZS1uYXYtY29udGFpbmVyLCAuYXNpZGUtd2lkZS1sZWZ0JylcclxuXHJcbiAgaWYocG9zaXRpb24gPj0gNTApe1xyXG4gICAgbW92YWJsZU5hdi5hZGRDbGFzcygnbW92ZWQnKVxyXG4gIH1lbHNle1xyXG4gICAgbW92YWJsZU5hdi5yZW1vdmVDbGFzcygnbW92ZWQnKVxyXG4gIH1cclxufSkiLCJ2YXIgVXNlcnMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgbmljaywgcGFzc3dvcmQsIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGUsIGlzX2VtcHR5O1xyXG5cclxuICAgIG5pY2sgICAgICA9ICQoXCIjdXNlci1uaWNrbmFtZVwiKS52YWwoKTtcclxuICAgIHBhc3N3b3JkICA9ICQoXCIjdXNlci1wYXNzd29yZFwiKS52YWwoKTtcclxuICAgIG5hbWUgICAgICA9ICQoXCIjdXNlci1uYW1lXCIpLnZhbCgpO1xyXG4gICAgbGFzdG5hbWUgID0gJChcIiN1c2VyLWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgZG5pICAgICAgID0gZ2V0VmFsKCQoXCIjdXNlci1kbmlcIikpO1xyXG4gICAgdHlwZSAgICAgID0gJChcIiN1c2VyLXR5cGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbbmljaywgcGFzc3dvcmQsIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGVdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICduaWNrbmFtZT0nICsgbmljayArIFwiJnBhc3N3b3JkPVwiICsgcGFzc3dvcmQgKyBcIiZuYW1lPVwiICsgbmFtZSArIFwiJmxhc3RuYW1lPVwiICsgbGFzdG5hbWU7XHJcbiAgICAgIGZvcm0gKz0gXCImZG5pPVwiICsgZG5pICsgXCImdHlwZT1cIiArIHR5cGU7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwidXNlci9hZGRuZXdcIiwgdHJ1ZSwgaW5pdEFkbWluSGFuZGxlcnMsIG51bGwsIGZvcm0sIFVzZXJzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG5pY2ssIHBhc3N3b3JkLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlO1xyXG5cclxuICAgIG5pY2sgICAgID0gJChcIiNlLW5pY2tuYW1lXCIpLnZhbCgpO1xyXG4gICAgbmFtZSAgICAgPSAkKFwiI2UtbmFtZVwiKS52YWwoKTtcclxuICAgIGxhc3RuYW1lID0gJChcIiNlLWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgZG5pICAgICAgPSAkKFwiI2UtZG5pXCIpLnZhbCgpO1xyXG4gICAgdHlwZSAgICAgPSAkKFwiI2UtdHlwZVwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtuaWNrLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbmlja25hbWU9JyArIG5pY2sgKyBcIiZuYW1lPVwiICsgbmFtZSArIFwiJmxhc3RuYW1lPVwiICsgbGFzdG5hbWU7XHJcbiAgICAgIGZvcm0gKz0gXCImZG5pPVwiICsgZG5pICsgXCImdHlwZT1cIiArIHR5cGU7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwidXNlci91cGRhdGVcIiwgdHJ1ZSwgaW5pdEFkbWluSGFuZGxlcnMsIG51bGwsIGZvcm0sIFVzZXJzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsZT11c2Vyc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3VzZXIvZ2V0dXNlcnMnLCBmYWxzZSwgaW5pdEFkbWluSGFuZGxlcnMsIHVzZXJUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBkZWxldGU6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInVzZXJfaWQ9XCIgKyBpZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL2RlbGV0ZXVzZXInLCB0cnVlLCBpbml0QWRtaW5IYW5kbGVycywgbnVsbCwgZm9ybSwgVXNlcnMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBjb25maXJtUGFzc3dvcmQ6IGZ1bmN0aW9uKHVzZXJJZCxjdXJyZW50UGFzc3dvcmQpIHtcclxuICAgIHZhciBmb3JtID0gJ3VzZXJfaWQ9JysgdXNlcklkICsnJmN1cnJlbnRfcGFzc3dvcmQ9JyArIGN1cnJlbnRQYXNzd29yZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL2NvbmZpcm1fcGFzc3dvcmQnLCBmYWxzZSwgZmFsc2UsIHByb2Nlc3NDb25maXJtRGF0YSwgZm9ybSwgbnVsbCwgbnVsbCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHByb2Nlc3NDb25maXJtRGF0YShyZXNwb25zZSkge1xyXG4gICAgICB2YXIgbmV3UGFzc3dvcmQgICAgICAgICA9ICQoXCIjYWNvdW50LW5ldy1wYXNzd29yZFwiKTtcclxuICAgICAgdmFyIG5ld1Bhc3N3b3JkQ29uZmlybSAgPSAkKFwiI2Fjb3VudC1jb25maXJtLW5ldy1wYXNzd29yZFwiKTtcclxuICAgICAgXHJcbiAgICAgIGlmIChyZXNwb25zZSA9PSAxKSB7ICAgICAgXHJcbiAgICAgICAgbmV3UGFzc3dvcmQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICBuZXdQYXNzd29yZENvbmZpcm0ucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICB2YWxpZGF0ZVRoaXMoKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgbmV3UGFzc3dvcmQuYXR0cignZGlzYWJsZWQnLHRydWUpO1xyXG4gICAgICAgIG5ld1Bhc3N3b3JkQ29uZmlybS5hdHRyKCdkaXNhYmxlZCcsdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGVQYXNzd29yZDogZnVuY3Rpb24odXNlcklkLGN1cnJlbnRQYXNzd29yZCxuZXdQYXNzd29yZCl7XHJcbiAgICB2YXIgZm9ybSA9ICd1c2VyX2lkPScrIHVzZXJJZCAgKyBcIiZjdXJyZW50X3Bhc3N3b3JkPVwiKyBjdXJyZW50UGFzc3dvcmQgKycmbmV3X3Bhc3N3b3JkPScgKyBuZXdQYXNzd29yZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL3VwZGF0ZV9wYXNzd29yZCcsIGZhbHNlLCBmYWxzZSwgVXNlcnMucGFzc3dvcmRDaGFuZ2VkLCBmb3JtLCBudWxsLGhlYXZ5TG9hZCk7XHJcbiAgfSxcclxuXHJcbiAgcGFzc3dvcmRDaGFuZ2VkOiBmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICBpZihyZXNwb25zZT09MSl7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfU1VDQ0VTUyArICdDb250cmFzZcOxYSBDYW1iaWFkYSBjb24gZXhpdG8nKVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBCQVNFX1VSTCArICdhcHAvbG9nb3V0J1xyXG4gICAgICB9LDMwMDApICAgICAgXHJcbiAgICB9ZWxzZXtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArICcgRXJyb3IgYWwgY2FtYmlhciBkZSBjb250cmFzZcOxYSwgcmV2aXNlIGxhIGNvbnRyYXNlw7FhIGFjdHVhbCcpXHJcbiAgICB9XHJcbiAgICAgIFxyXG4gIH1cclxufVxyXG5cclxudmFyIENsaWVudHMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgdmFyIGZvcm0sIG5vbWJyZXMsIGFwZWxsaWRvcywgY2VkdWxhLCBjZWx1bGFyLCBwcm92aW5jaWEsIHNlY3RvciwgY2FsbGUsIGNhc2EsIHRlbGVmb25vLFxyXG4gICAgICAgbHVnYXJUcmFiYWpvLCB0ZWxUcmFiYWpvLCBpbmdyZXNvcywgZmVjaGFSZWdpc3RybywgZXN0YWRvO1xyXG5cclxuICAgIG5vbWJyZXMgICAgICAgPSAkKFwiI2NsaWVudC1uYW1lXCIpLnZhbCgpO1xyXG4gICAgYXBlbGxpZG9zICAgICA9ICQoXCIjY2xpZW50LWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgY2VkdWxhICAgICAgICA9IGdldFZhbCgkKFwiI2NsaWVudC1kbmlcIikpO1xyXG4gICAgY2VsdWxhciAgICAgICA9IGdldFZhbCgkKFwiI2NsaWVudC1waG9uZVwiKSk7XHJcbiAgICBwcm92aW5jaWEgICAgID0gJChcIiNjbGllbnQtcHJvdmluY2lhXCIpLnZhbCgpO1xyXG4gICAgc2VjdG9yICAgICAgICA9ICQoXCIjY2xpZW50LXNlY3RvclwiKS52YWwoKTtcclxuICAgIGNhbGxlICAgICAgICAgPSAkKFwiI2NsaWVudC1zdHJlZXRcIikudmFsKCk7XHJcbiAgICBjYXNhICAgICAgICAgID0gJCgnI2NsaWVudC1ob3VzZScpLnZhbCgpO1xyXG4gICAgdGVsZWZvbm8gICAgICA9IGdldFZhbCgkKCcjY2xpZW50LXRlbGVwaG9uZScpKTtcclxuICAgIGx1Z2FyVHJhYmFqbyAgPSAkKCcjY2xpZW50LWpvYicpLnZhbCgpO1xyXG4gICAgdGVsVHJhYmFqbyAgICA9IGdldFZhbCgkKCcjY2xpZW50LWpvYi10ZWxlcGhvbmUnKSk7XHJcbiAgICBpbmdyZXNvcyAgICAgID0gJCgnI2NsaWVudC1zYWxhcnknKS52YWwoKTtcclxuICAgIGZlY2hhUmVnaXN0cm8gPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpOztcclxuICAgIGVzdGFkbyAgICAgICAgPSBcIm5vIGFjdGl2b1wiO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW25vbWJyZXMsIGFwZWxsaWRvcywgY2VkdWxhLCBjZWx1bGFyLCBwcm92aW5jaWEsIHNlY3RvciwgY2FsbGUsIGNhc2EsIHRlbGVmb25vXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbm9tYnJlcz0nICsgbm9tYnJlcyArIFwiJmFwZWxsaWRvcz1cIiArIGFwZWxsaWRvcyArIFwiJmNlZHVsYT1cIiArIGNlZHVsYSArIFwiJmNlbHVsYXI9XCIgKyBjZWx1bGFyO1xyXG4gICAgICBmb3JtICs9IFwiJnByb3ZpbmNpYT1cIiArIHByb3ZpbmNpYSArIFwiJnNlY3Rvcj1cIiArIHNlY3RvciArIFwiJmNhbGxlPVwiICsgY2FsbGUgKyBcIiZjYXNhPVwiICsgY2FzYSArIFwiJnRlbGVmb25vPVwiICsgdGVsZWZvbm87XHJcbiAgICAgIGZvcm0gKz0gXCImbHVnYXJfdHJhYmFqbz1cIiArIGx1Z2FyVHJhYmFqbyArIFwiJnRlbF90cmFiYWpvPVwiICsgdGVsVHJhYmFqbyArIFwiJmluZ3Jlc29zPVwiICsgaW5ncmVzb3MgKyBcIiZmZWNoYV9yZWdpc3Rybz1cIiArIGZlY2hhUmVnaXN0cm87XHJcbiAgICAgIGZvcm0gKz0gXCImZXN0YWRvPVwiICsgZXN0YWRvICsgXCImdGFibGE9Y2xpZW50ZXNcIjtcclxuXHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9hZGRcIiwgdHJ1ZSwgaW5pdENsaWVudEhhbmRsZXJzLCBudWxsLCBmb3JtLCBDbGllbnRzLmdldEFsbCk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jbGllbnRlc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIGluaXRDbGllbnRIYW5kbGVycywgY2xpZW50VGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0T25lOiBmdW5jdGlvbiAoaWQsIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1jbGllbnRlcyZpZD1cIiArIGlkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2dldG9uZVwiLCBmYWxzZSwgaW5pdENsaWVudEhhbmRsZXJzLCByZWNlaXZlciwgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICByZWNlaXZlRm9yRWRpdDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgIHZhciBjbGllbnQgICAgICAgID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgIHRoaXMuaWQgICAgICAgICAgICA9IGNsaWVudFsnaWRfY2xpZW50ZSddO1xyXG4gICAgdmFyICRub21icmVzICAgICAgPSAkKFwiI3UtY2xpZW50LW5hbWVcIik7XHJcbiAgICB2YXIgJGFwZWxsaWRvcyAgICA9ICQoXCIjdS1jbGllbnQtbGFzdG5hbWVcIik7XHJcbiAgICB2YXIgJGNlZHVsYSAgICAgICA9ICQoXCIjdS1jbGllbnQtZG5pXCIpO1xyXG4gICAgdmFyICRjZWx1bGFyICAgICAgPSAkKFwiI3UtY2xpZW50LXBob25lXCIpO1xyXG4gICAgdmFyICRwcm92aW5jaWEgICAgPSAkKFwiI3UtY2xpZW50LXByb3ZpbmNpYVwiKTtcclxuICAgIHZhciAkc2VjdG9yICAgICAgID0gJChcIiN1LWNsaWVudC1zZWN0b3JcIik7XHJcbiAgICB2YXIgJGNhbGxlICAgICAgICA9ICQoXCIjdS1jbGllbnQtc3RyZWV0XCIpO1xyXG4gICAgdmFyICRjYXNhICAgICAgICAgPSAkKCcjdS1jbGllbnQtaG91c2UnKTtcclxuICAgIHZhciAkdGVsZWZvbm8gICAgID0gJCgnI3UtY2xpZW50LXRlbGVwaG9uZScpO1xyXG4gICAgdmFyICRsdWdhclRyYWJham8gPSAkKCcjdS1jbGllbnQtam9iJyk7XHJcbiAgICB2YXIgJHRlbFRyYWJham8gICA9ICQoJyN1LWNsaWVudC1qb2ItdGVsZXBob25lJyk7XHJcbiAgICB2YXIgJGluZ3Jlc29zICAgICA9ICQoJyN1LWNsaWVudC1zYWxhcnknKTtcclxuXHJcbiAgICAkbm9tYnJlcy52YWwoY2xpZW50Wydub21icmVzJ10pO1xyXG4gICAgJGFwZWxsaWRvcy52YWwoY2xpZW50WydhcGVsbGlkb3MnXSlcclxuICAgICRjZWR1bGEudmFsKGNsaWVudFsnY2VkdWxhJ10pXHJcbiAgICAkY2VsdWxhci52YWwoY2xpZW50WydjZWx1bGFyJ10pXHJcbiAgICAkcHJvdmluY2lhLnZhbChjbGllbnRbJ3Byb3ZpbmNpYSddKVxyXG4gICAgJHNlY3Rvci52YWwoY2xpZW50WydzZWN0b3InXSlcclxuICAgICRjYWxsZS52YWwoY2xpZW50WydjYWxsZSddKVxyXG4gICAgJGNhc2EudmFsKGNsaWVudFsnY2FzYSddKVxyXG4gICAgJHRlbGVmb25vLnZhbChjbGllbnRbJ3RlbGVmb25vJ10pXHJcbiAgICAkbHVnYXJUcmFiYWpvLnZhbChjbGllbnRbJ2x1Z2FyX3RyYWJham8nXSlcclxuICAgICR0ZWxUcmFiYWpvLnZhbChjbGllbnRbJ3RlbF90cmFiYWpvJ10pXHJcbiAgICAkaW5ncmVzb3MudmFsKGNsaWVudFsnc2FsYXJpbyddKVxyXG5cclxuICAgICQoXCIjdXBkYXRlLWNsaWVudC1tb2RhbFwiKS5tb2RhbCgpO1xyXG4gICAgJChcIiNidG4tdXBkYXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHVwZGF0ZUNsaWVudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2xpZW50KCkge1xyXG4gICAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFskbm9tYnJlcy52YWwoKSwgJGFwZWxsaWRvcy52YWwoKSwgJGNlZHVsYS52YWwoKSwgJGNlbHVsYXIudmFsKCksICRwcm92aW5jaWEudmFsKCksICRzZWN0b3IudmFsKCksICRjYWxsZS52YWwoKSxcclxuICAgICAgICAkY2FzYS52YWwoKSwgJHRlbGVmb25vLnZhbCgpXHJcbiAgICAgIF0pO1xyXG5cclxuICAgICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICAgIGZvcm0gPSAnaWQ9JyArIGlkICsgJyZub21icmVzPScgKyAkbm9tYnJlcy52YWwoKSArIFwiJmFwZWxsaWRvcz1cIiArICRhcGVsbGlkb3MudmFsKCkgKyBcIiZjZWR1bGE9XCIgKyBnZXRWYWwoJGNlZHVsYSk7XHJcbiAgICAgICAgZm9ybSArPSBcIiZjZWx1bGFyPVwiICsgZ2V0VmFsKCRjZWx1bGFyKSArIFwiJnByb3ZpbmNpYT1cIiArICRwcm92aW5jaWEudmFsKCkgKyBcIiZzZWN0b3I9XCIgKyAkc2VjdG9yLnZhbCgpICsgXCImY2FsbGU9XCIgKyAkY2FsbGUudmFsKCk7XHJcbiAgICAgICAgZm9ybSArPSBcIiZjYXNhPVwiICsgJGNhc2EudmFsKCkgKyBcIiZ0ZWxlZm9ubz1cIiArIGdldFZhbCgkdGVsZWZvbm8pICsgXCImbHVnYXJfdHJhYmFqbz1cIiArICRsdWdhclRyYWJham8udmFsKCkgKyBcIiZ0ZWxfdHJhYmFqbyA9XCI7XHJcbiAgICAgICAgZm9ybSArPSBnZXRWYWwoJHRlbFRyYWJham8pICsgXCImdGFibGE9Y2xpZW50ZXNcIjtcclxuICAgICAgICBmb3JtICs9IFwiJmluZ3Jlc29zPVwiICsgJGluZ3Jlc29zLnZhbCgpO1xyXG5cclxuICAgICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIGluaXRDbGllbnRIYW5kbGVycywgbnVsbCwgZm9ybSwgQ2xpZW50cy5nZXRBbGwpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2F2ZU9ic2VydmF0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG9ic2VydmF0aW9ucyxpZENsaWVudGU7XHJcbiBcclxuICAgIG9ic2VydmF0aW9ucyA9ICQoXCIjdGV4dC1vYnNlcnZhdGlvbnNcIikudmFsKCk7XHJcbiAgICBpZENsaWVudGUgICAgPSAkKFwiI2RldGFpbC1jbGllbnQtaWRcIikudmFsKCk7XHJcbiBcclxuICAgIGZvcm0gPSAnb2JzZXJ2YWNpb25lcz0nICsgb2JzZXJ2YXRpb25zICsgXCImdGFibGE9b2JzZXJ2YWNpb25lcyZpZF9jbGllbnRlPVwiICsgaWRDbGllbnRlO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcbiAgXHJcbiAgdXBkYXRlU3RhdGU6IGZ1bmN0aW9uIChjbGllbnQpIHtcclxuICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShjbGllbnQpKyAnJm1vZHVsZT1jbGllbnRlcyZhY3Rpb249dXBkYXRlJztcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0anNvbicsdHJ1ZSxudWxsLG51bGwsZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgR2VuZXJhbHMgPSB7XHJcbiAgZGVsZXRlUm93OiBmdW5jdGlvbiAoaWQsIHRhYmxhKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9XCIgKyB0YWJsYSArIFwiJmlkPVwiICsgaWQ7XHJcbiAgICB2YXIgaGFuZGxlcnMsIGNhbGxiYWNrO1xyXG4gICAgc3dpdGNoICh0YWJsYSkge1xyXG4gICAgICBjYXNlICdjbGllbnRlcyc6XHJcbiAgICAgICAgY2FsbGJhY2sgPSBDbGllbnRzLmdldEFsbDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc2VydmljaW9zJzpcclxuICAgICAgICBjYWxsYmFjayA9IFNlcnZpY2VzLmdldEFsbDtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2RlbGV0ZScsIHRydWUsbnVsbCwgbnVsbCwgZm9ybSwgY2FsbGJhY2spO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIG1hbmRhIHVuIG1lbnNhamUgYWwgc2Vydmlkb3IgZGUgbG9zIHZhbG9yZXMgYSBidXNjYXJcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBlbCB2YWxvciBhIHNlciBidXNjYWRvXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRiVGFibGUgbm9tYnJlIGRlIGxhIHRhYmxhIGRvbmRlIHNlIGRlc2VhIGNvbnN1bHRhciBlbiBsYSBiYXNlIGRlIGRhdG9zXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZmlsbFRhYmxlRnVuY3Rpb24gZnVuY2lvbiBkZSBsbGVuYWRvIGRlIHRhYmxhIGRvbmRlIHNlIG1vc3RyYXJhbiBsb3MgcmVzdWx0YWRvcyBcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGVyRnVuY3Rpb24gZnVuY2lvbiByZWluaWNpbyBkZSBsb3MgZWxlbWVudG9zIGVuIGxvcyBoYW5kbGVycyBcclxuICAgKi9cclxuICBcclxuICBzZWFyY2g6IGZ1bmN0aW9uICh0ZXh0LCBkYlRhYmxlLCBmaWxsVGFibGVGdW5jdGlvbiwgaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgICBpZiAoaGFuZGxlckZ1bmN0aW9uID09IHVuZGVmaW5lZCkgaGFuZGxlckZ1bmN0aW9uID0gaW5pdENsaWVudEhhbmRsZXJzO1xyXG4gICAgaWYgKGZpbGxUYWJsZUZ1bmN0aW9uID09IHVuZGVmaW5lZCkgZmlsbFRhYmxlRnVuY3Rpb24gPSBmaWxsQ3VycmVudFRhYmxlO1xyXG4gICAgdmFyIHdvcmQgPSB0ZXh0O1xyXG4gICAgaWYgKHdvcmQgIT0gbnVsbCB8fCB3b3JkICE9IFwiXCIpIHtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPVwiICsgZGJUYWJsZSArIFwiJndvcmQ9XCIgKyB3b3JkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9zZWFyY2gnLCBmYWxzZSwgaGFuZGxlckZ1bmN0aW9uLCBmaWxsVGFibGVGdW5jdGlvbiwgZm9ybSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY291bnRfdGFibGU6IGZ1bmN0aW9uICh0YWJsZSkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPVwiICsgdGFibGU7XHJcbiAgICB2YXIgdXBkYXRlRnVuY3Rpb24gPSB1cGRhdGVDb3VudDtcclxuICAgIGlmICh0YWJsZSA9PSAnY2FqYScpIHVwZGF0ZUZ1bmN0aW9uID0gdXBkYXRlQ2FqYUNvdW50XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9jb3VudCcsIGZhbHNlLCBudWxsLCB1cGRhdGVGdW5jdGlvbiwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgU2VydmljZXMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgbmFtZSwgZGVzY3JpcHRpb24sIHBheW1lbnQsIHR5cGU7XHJcblxyXG4gICAgbmFtZSAgICAgICAgPSAkKFwiI3NlcnZpY2UtbmFtZVwiKS52YWwoKTtcclxuICAgIGRlc2NyaXB0aW9uID0gJChcIiNzZXJ2aWNlLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG4gICAgcGF5bWVudCAgICAgPSAkKFwiI3NlcnZpY2UtbW9udGhseS1wYXltZW50XCIpLnZhbCgpO1xyXG4gICAgdHlwZSAgICAgICAgPSAkKFwiI3NlcnZpY2UtdHlwZVwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtuYW1lLCBkZXNjcmlwdGlvbiwgcGF5bWVudCwgdHlwZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ25vbWJyZT0nICsgbmFtZSArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb24gKyBcIiZtZW5zdWFsaWRhZD1cIiArIHBheW1lbnQgKyBcIiZ0aXBvPVwiICsgdHlwZTtcclxuICAgICAgZm9ybSArPSBcIiZ0YWJsYT1zZXJ2aWNpb3NcIjtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2FkZFwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBTZXJ2aWNlcy5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1zZXJ2aWNpb3NcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBzZXJ2aWNlVGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBwYXltZW50LCB0eXBlO1xyXG5cclxuICAgIGlkICAgICAgICAgID0gJCgnI3Utc2VydmljZS1pZCcpLnZhbCgpO1xyXG4gICAgbmFtZSAgICAgICAgPSAkKCcjdS1zZXJ2aWNlLW5hbWUnKS52YWwoKTtcclxuICAgIGRlc2NyaXB0aW9uID0gJCgnI3Utc2VydmljZS1kZXNjcmlwdGlvbicpLnZhbCgpO1xyXG4gICAgcGF5bWVudCAgICAgPSAkKCcjdS1zZXJ2aWNlLW1vbnRobHktcGF5bWVudCcpLnZhbCgpO1xyXG4gICAgdHlwZSAgICAgICAgPSAkKCcjdS1zZXJ2aWNlLXR5cGUnKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtpZCwgbmFtZSwgZGVzY3JpcHRpb24sIHBheW1lbnQsIHR5cGVdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9zZXJ2aWNpbz0nICsgaWQgKyBcIiZub21icmU9XCIgKyBuYW1lICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbiArIFwiJm1lbnN1YWxpZGFkPVwiICsgcGF5bWVudDtcclxuICAgICAgZm9ybSArPSBcIiZ0aXBvPVwiICsgdHlwZSArIFwiJnRhYmxhPXNlcnZpY2lvc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFNlcnZpY2VzLmdldEFsbCxoZWF2eUxvYWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbnZhciBDb250cmFjdHMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiBhZGROZXdDb250cmFjdCgpIHtcclxuICAgIHZhciBmb3JtLCB0YWJsZSwgY2xpZW50X2lkLCB1c2VyX2lkLCBzZXJ2aWNlX2lkLCBjb2RlLCBjb250cmFjdF9kYXRlLCBwYXltZW50LCBkdXJhdGlvbixcclxuICAgICAgZXF1aXBtZW50LCBlTWFjLCByb3V0ZXIsIHJNYWMsIHRvdGFsLCBuZXh0UGF5bWVudCwgbW9kZWwsIGlwO1xyXG5cclxuICAgIGNsaWVudF9pZCAgICAgPSAkKFwiI2NvbnRyYWN0LWNsaWVudC1pZFwiKS52YWwoKTtcclxuICAgIHVzZXJfaWQgICAgICAgPSAkKFwiI2NvbnRyYWN0LXVzZXItaWRcIikudmFsKCk7XHJcbiAgICBzZXJ2aWNlX2lkICAgID0gJChcIi5zZXJ2aWNlLWNhcmQuc2VsZWN0ZWRcIikuYXR0cignZGF0YS1pZCcpO1xyXG4gICAgY29udHJhY3RfZGF0ZSA9ICQoJyNjb250cmFjdC1jbGllbnQtZGF0ZScpLnZhbCgpO1xyXG4gICAgZHVyYXRpb24gICAgICA9ICQoJyNjb250cmFjdC1jbGllbnQtbW9udGhzJykudmFsKCk7XHJcbiAgICBlcXVpcG1lbnQgICAgID0gJCgnI2NvbnRyYWN0LWVxdWlwbWVudCcpLnZhbCgpO1xyXG4gICAgZU1hYyAgICAgICAgICA9ICQoJyNjb250cmFjdC1lLW1hYycpLnZhbCgpO1xyXG4gICAgcm91dGVyICAgICAgICA9ICQoJyNjb250cmFjdC1yb3V0ZXInKS52YWwoKTtcclxuICAgIHJNYWMgICAgICAgICAgPSAkKCcjY29udHJhY3Qtci1tYWMnKS52YWwoKTtcclxuICAgIG1vZGVsICAgICAgICAgPSAkKCcjY29udHJhY3QtZXF1aXBtZW50LW1vZGVsJykudmFsKCk7XHJcbiAgICBpcCAgICAgICAgICAgID0gJCgnI2NvbnRyYWN0LWlwJykudmFsKCk7XHJcbiAgICBjb2RlICAgICAgICAgID0gJChcIiNzZWxlY3QtY29udHJhY3QtY29kZVwiKS52YWwoKTtcclxuXHJcbiAgICBwYXltZW50ID0gJChcIiNjb250cmFjdC1jbGllbnQtcGF5bWVudFwiKS52YWwoKTtcclxuICAgIG5leHRQYXltZW50ID0gbW9tZW50KGNvbnRyYWN0X2RhdGUpLmFkZCgxLCAnbW9udGhzJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY2xpZW50X2lkLCB1c2VyX2lkLCBzZXJ2aWNlX2lkLCBjb250cmFjdF9kYXRlLCBkdXJhdGlvbl0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICB0b3RhbCA9IChOdW1iZXIoZHVyYXRpb24pICsgMSkgKiBOdW1iZXIocGF5bWVudCk7XHJcbiAgICAgIGZvcm0gPSAnaWRfZW1wbGVhZG89JyArIHVzZXJfaWQgKyBcIiZpZF9jbGllbnRlPVwiICsgY2xpZW50X2lkICsgXCImaWRfc2VydmljaW89XCIgKyBzZXJ2aWNlX2lkICsgXCImY29kaWdvPVwiICsgY29kZSArIFwiJmZlY2hhPVwiICsgY29udHJhY3RfZGF0ZTtcclxuICAgICAgZm9ybSArPSBcIiZkdXJhY2lvbj1cIiArIGR1cmF0aW9uICsgXCImbW9udG9fdG90YWw9XCIgKyB0b3RhbCArIFwiJm1vbnRvX3BhZ2Fkbz0wJnVsdGltb19wYWdvPW51bGxcIjtcclxuICAgICAgZm9ybSArPSBcIiZtZW5zdWFsaWRhZD1cIiArIHBheW1lbnQgKyBcIiZwcm94aW1vX3BhZ289XCIgKyBuZXh0UGF5bWVudCArIFwiJmVzdGFkbz1hY3Rpdm8mdGFibGE9Y29udHJhdG9zXCI7XHJcbiAgICAgIGZvcm0gKz0gXCImbm9tYnJlX2VxdWlwbz1cIiArIGVxdWlwbWVudCArIFwiJm1hY19lcXVpcG89XCIgKyBlTWFjICsgXCImcm91dGVyPVwiICsgcm91dGVyICsgXCImbWFjX3JvdXRlcj1cIiArIHJNYWM7XHJcbiAgICAgIGZvcm0gKz0gXCImbW9kZWxvPVwiICsgbW9kZWwgKyBcIiZpcD1cIiArIGlwO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvYWRkXCIsIG51bGwsIG51bGwsIENvbnRyYWN0cy5nZXRMYXN0LCBmb3JtLCBudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZXh0ZW5kOiBmdW5jdGlvbihpZENvbnRyYXRvKSB7XHJcbiAgICB2YXIgZm9ybTtcclxuICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGlkQ29udHJhdG9yO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2V4dGVuZFwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNvbnRyYXRvc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIGNvbnRyYWN0VGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0TGFzdDogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEubWVuc2FqZSk7XHJcbiAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAkKFwiI2J0bi1zYXZlLWNvbnRyYWN0XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgICQoXCIjYnRuLXByaW50LWNvbnRyYWN0XCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgIGlmKGRhdGEudGFibGFfcGFnb3Mpe1xyXG4gICAgICBtYWtlUGF5bWVudExpc3QoZGF0YS50YWJsYV9wYWdvcyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY2FsbEV4dHJhOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciByb3cgPSBjb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICBpZiAocm93KSB7XHJcbiAgICAgICQoXCIjZXh0cmEtY2xpZW50LWRuaVwiKS52YWwocm93LmNlZHVsYSk7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRBbGxPZkNsaWVudChyb3cuY2VkdWxhKTtcclxuICAgICAgJCgnI2FkZC1leHRyYS1tb2RhbCcpLm1vZGFsKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiU2VsZWNjaW9uZSBlbCBjb25yYXRvIHByaW1lcm9cIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJvdyAgICAgICAgPSBjb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KClcclxuICAgIHZhciBpc19wZW5hbHR5ID0gZmFsc2U7XHJcbiAgICB2YXIgcmVhc29uICAgICA9ICQoXCIjY2FuY2VsYXRpb24tcmVhc29uXCIpLnZhbCgpO1xyXG4gICAgdmFyIGNoZWNrZWQgICAgPSAkKFwiI2NoZWNrLXBlbmFsdHk6Y2hlY2tlZFwiKS5sZW5ndGg7XHJcbiAgICB2YXIgZm9ybSwgZmVjaGE7XHJcbiAgICBpZihyb3cuaWQpe1xyXG4gICAgICBpZiAoY2hlY2tlZCA+IDApIHtcclxuICAgICAgICBpc19wZW5hbHR5ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBmZWNoYSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIHJvdy5pZCArICcmZmVjaGE9JyArIGZlY2hhICsgJyZpZF9jbGllbnRlPScgKyByb3cuaWRfY2xpZW50ZTtcclxuICAgICAgZm9ybSArPSBcIiZtb3Rpdm89XCIgKyByZWFzb24gKyBcIiZwZW5hbGlkYWQ9XCIgKyBpc19wZW5hbHR5O1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9jYW5jZWwnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBDb250cmFjdHMuZ2V0QWxsKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0VSUk9SICtcIiBObyBoYXkgY29udHJhdG8gc2VsZWNjaW9uYWRvXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldE9uZTogZnVuY3Rpb24oaWRfY29udHJhdG8sIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1jb250cmF0b3MmaWRfY29udHJhdG89XCIgKyBpZF9jb250cmF0bztcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRvbmVcIiwgZmFsc2UsIG51bGwsIHJlY2VpdmVyLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHJlY2lldmU6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgIHZhciBjb250cmFjdCAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB0aGlzLmlkX2NvbnRyYXRvID0gY29udHJhY3RbJ2lkX2NvbnRyYXRvJ107XHJcbiAgICB2YXIgJGVxdWlwbyAgICAgPSAkKFwiI3UtY29udHJhY3QtZXF1aXBtZW50XCIpO1xyXG4gICAgdmFyICRtYWNFcXVpcG8gID0gJChcIiN1LWNvbnRyYWN0LWUtbWFjXCIpO1xyXG4gICAgdmFyICRyb3V0ZXIgICAgID0gJChcIiN1LWNvbnRyYWN0LXJvdXRlclwiKTtcclxuICAgIHZhciAkbWFjUm91dGVyICA9ICQoXCIjdS1jb250cmFjdC1yLW1hY1wiKTtcclxuICAgIHZhciAkbW9kZWxvICAgICA9ICQoXCIjdS1jb250cmFjdC1tb2RlbG9cIik7XHJcbiAgICB2YXIgJGNvZGlnbyAgICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpO1xyXG4gICAgdmFyICRpc0NoYW5nZUlwID0gJChcIiNjaGVjay1jaGFuZ2UtaXBcIik7XHJcbiAgICB2YXIgJGlwICAgICAgICAgPSAkKFwiI3UtY29udHJhY3QtaXBcIik7XHJcblxyXG4gICAgJGVxdWlwby52YWwoY29udHJhY3RbJ25vbWJyZV9lcXVpcG8nXSk7XHJcbiAgICAkbWFjRXF1aXBvLnZhbChjb250cmFjdFsnbWFjX2VxdWlwbyddKTtcclxuICAgICRyb3V0ZXIudmFsKGNvbnRyYWN0Wydyb3V0ZXInXSk7XHJcbiAgICAkbWFjUm91dGVyLnZhbChjb250cmFjdFsnbWFjX3JvdXRlciddKTtcclxuICAgICRtb2RlbG8udmFsKGNvbnRyYWN0Wydtb2RlbG8nXSk7XHJcbiAgICAkaXAudmFsKGNvbnRyYWN0WydpcCddKTtcclxuXHJcbiAgICAvLyAkKFwiI3VwZGF0ZS1jb250cmFjdC1tb2RhbCBzZWxlY3RcIikudmFsKCcnKVxyXG4gICAgJChcIiN1cGRhdGUtY29udHJhY3QtbW9kYWxcIikubW9kYWwoKTtcclxuICAgICQoXCIjdXBkYXRlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHVwZGF0ZUNvbnRyYWN0KGlkX2NvbnRyYXRvKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRyYWN0KGlkX2NvbnRyYXRvKSB7XHJcbiAgICAgIHZhciBjaGVja2VkID0gJChcIiNjaGVjay1jaGFuZ2UtaXA6Y2hlY2tlZFwiKS5sZW5ndGg7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGlkX2NvbnRyYXRvICsgJyZub21icmVfZXF1aXBvPScgKyAkZXF1aXBvLnZhbCgpICsgXCImbWFjX2VxdWlwbz1cIiArICRtYWNFcXVpcG8udmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImcm91dGVyPVwiICsgJHJvdXRlci52YWwoKSArIFwiJm1hY19yb3V0ZXI9XCIgKyAkbWFjUm91dGVyLnZhbCgpO1xyXG4gICAgICBmb3JtICs9IFwiJm1vZGVsbz1cIiArICRtb2RlbG8udmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImdGFibGE9Y29udHJhdG9zXCI7XHJcbiAgICAgIGlmIChjaGVja2VkID4gMCkge1xyXG4gICAgICAgIGZvcm0gKz0gXCImaXA9XCIgKyAkaXAudmFsKCkgKyBcIiZjb2RpZ289XCIgKyAkY29kaWdvLnZhbCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0SXBMaXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VjdGlvbl9pZCA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0LXNlY3RvclwiKS52YWwoKTtcclxuICAgIHZhciBmb3JtID0gXCJpZF9zZWNjaW9uPVwiICsgc2VjdGlvbl9pZCArIFwiJnRhYmxhPWlwX2xpc3RcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRhbGxcIiwgZmFsc2UsIG51bGwsIG1ha2VJcExpc3QsIGZvcm0sIG51bGwpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VJcExpc3QoY29udGVudCkge1xyXG4gICAgICAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpLmh0bWwoY29udGVudCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYnRuRXh0cmFQcmVzc2VkOiBmdW5jdGlvbiAoJHRoaXMpIHtcclxuICAgIHZhciBidXR0b25JZCA9ICR0aGlzLnRleHQoKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBzd2l0Y2ggKGJ1dHRvbklkKSB7XHJcbiAgICAgIGNhc2UgXCJtZWpvcmFyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLnVwZ3JhZGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImV4dGVuZGVyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLmV4dGVuZCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZ3VhcmRhclwiOlxyXG4gICAgICAgIENvbnRyYWN0cy5hZGRFeHRyYSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZ3JhZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBzZWxlY3RlZFNlcnZpY2UsIHNlcnZpY2VJZCwgYW1vdW50O1xyXG5cclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIHNlbGVjdGVkU2VydmljZSA9ICQoXCIuc2VydmljZS1jYXJkLnNlbGVjdGVkXCIpO1xyXG4gICAgc2VydmljZUlkID0gc2VsZWN0ZWRTZXJ2aWNlLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgYW1vdW50ID0gc2VsZWN0ZWRTZXJ2aWNlLmF0dHIoXCJkYXRhLXBheW1lbnRcIik7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCwgc2VydmljZUlkLCBhbW91bnRdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgY29udHJhY3RJZCArIFwiJmlkX3NlcnZpY2lvPVwiICsgc2VydmljZUlkICsgXCImY3VvdGE9XCIgKyBhbW91bnQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZ3JhZGUnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZWNvbm5lY3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBzZWxlY3RlZFNlcnZpY2UsIHNlcnZpY2VJZCwgZHVyYXRpb24sIGRhdGUsc2VuZCwgaXNfZW1wdHksaW5mbztcclxuXHJcbiAgICBjb250cmFjdElkID0gJChcIiNzZWxlY3QtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICBzZWxlY3RlZFNlcnZpY2UgPSAkKFwiLnNlcnZpY2UtY2FyZC5zZWxlY3RlZFwiKTtcclxuICAgIHNlcnZpY2VJZCA9IHNlbGVjdGVkU2VydmljZS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgIGR1cmF0aW9uICA9ICQoXCIjcmVjb25uZWN0aW9uLW1vbnRoc1wiKS52YWwoKTtcclxuICAgIGRhdGUgPSAkKFwiI3JlY29ubmVjdGlvbi1kYXRlXCIpLnZhbCgpXHJcblxyXG4gICAgaXNfZW1wdHkgPSBpc0VtcHR5KFtjb250cmFjdElkLHNlcnZpY2VJZCxkYXRlLGR1cmF0aW9uXSk7XHJcbiAgICBjb25zb2xlLmxvZyhcInNlcnZpY2UgaWRcIiArIHNlcnZpY2VJZCArIFwiIGR1cmF0aW9uIFwiICsgZHVyYXRpb24gKyBcIiBkYXRlXCIgKyBkYXRlICsgXCIgY29udHJhY3QgXCIrIGNvbnRyYWN0SWQgKVxyXG4gICAgaWYoIWlzX2VtcHR5KXtcclxuICAgICAgaW5mbyA9IHtcclxuICAgICAgICAnaWRfY29udHJhdG8nOiBjb250cmFjdElkLFxyXG4gICAgICAgICdmZWNoYSc6IGRhdGUsXHJcbiAgICAgICAgJ2lkX3NlcnZpY2lvJzogc2VydmljZUlkLFxyXG4gICAgICAgICdkdXJhY2lvbic6IGR1cmF0aW9uXHJcbiAgICAgIH1cclxuICAgICAgZm9ybSA9IFwiZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KGluZm8pO1xyXG4gICAgICBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArIFwiY29udHJhY3QvcmVjb25uZWN0XCIsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIGRpc3BsYXlNZXNzYWdlKHJlcy5kYXRhLm1lbnNhamUpO1xyXG4gICAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgICAgICQoXCIjYnRuLXJlY29ubmVjdFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgJChcIi5yZWNvbm5lY3QtY2FsbGVyXCIpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIHN3YWwoXCJMbGVuZSB0b2RvcyBsb3MgY2FtcG9zXCIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYWRkRXh0cmE6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBleHRyYVNlcnZpY2UsIHNlcnZpY2VDb3N0LCBlcXVpcG1lbnQsIGVNYWMsIHJvdXRlciwgck1hYyxwYXltZW50TW9kZTtcclxuXHJcbiAgICBjb250cmFjdElkID0gJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICBzZXJ2aWNlQ29zdCA9ICQoXCIjZXh0cmEtc2VydmljZS1jb3N0XCIpLnZhbCgpO1xyXG4gICAgZXh0cmFTZXJ2aWNlID0gJChcIiNzZWxlY3QtZXh0cmEtc2VydmljZVwiKS52YWwoKTtcclxuICAgIGVxdWlwbWVudCA9ICQoXCIjZXh0cmEtZXF1aXBvXCIpLnZhbCgpO1xyXG4gICAgZU1hYyA9ICQoXCIjZXh0cmEtZS1tYWNcIikudmFsKCk7XHJcbiAgICByb3V0ZXIgPSAkKFwiI2V4dHJhLXJvdXRlclwiKS52YWwoKTtcclxuICAgIHJNYWMgPSAkKFwiI2V4dHJhLXItbWFjXCIpLnZhbCgpO1xyXG4gICAgcGF5bWVudE1vZGUgPSAkKFwiI3NlbGVjdC1wYXltZW50LW1vZGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCwgZXh0cmFTZXJ2aWNlLCBzZXJ2aWNlQ29zdCxwYXltZW50TW9kZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyBjb250cmFjdElkICsgXCImY29zdG9fc2VydmljaW89XCIgKyBzZXJ2aWNlQ29zdCArIFwiJm5vbWJyZV9zZXJ2aWNpbz1cIiArIGV4dHJhU2VydmljZTtcclxuICAgICAgZm9ybSArPSAnJm5vbWJyZV9lcXVpcG89JyArIGVxdWlwbWVudCArIFwiJm1hY19lcXVpcG89XCIgKyBlTWFjICsgXCImcm91dGVyPVwiICsgcm91dGVyICsgXCImbWFjX3JvdXRlcj1cIiArIHJNYWM7XHJcbiAgICAgIGZvcm0gKz0gJyZtb2RvX3BhZ289JyArIHBheW1lbnRNb2RlO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9hZGRleHRyYScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBleHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBkdXJhdGlvbjtcclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIGR1cmF0aW9uID0gJChcIiNleHRyYS1leHRlbnNpb24tbW9udGhzXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2R1cmF0aW9uLCBjb250cmFjdElkXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGNvbnRyYWN0SWQgKyBcIiZkdXJhY2lvbj1cIiArIGR1cmF0aW9uO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9leHRlbmRfY29udHJhY3QnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGxPZkNsaWVudDogZnVuY3Rpb24oZG5pKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwiZG5pPVwiICsgZG5pO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2RhdGFfZm9yX2V4dHJhXCIsIGZhbHNlLCBudWxsLCBtYWtlQ29udHJhY3RMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICAvLyBOb3RlOiBsbyBzaWVudG8sIGRlIGFxdWkgZW4gYWRlbGFudGUgdXNvIGF4aW9zLCBlcyBtdWNobyBtYXMgY29tb2RvXHJcbiAgc3VzcGVuZDogZnVuY3Rpb24gKGlkX2NvbnRyYXRvKSB7XHJcbiAgICBmb3JtID0gXCJkYXRhPVwiICsgSlNPTi5zdHJpbmdpZnkoe2lkX2NvbnRyYXRvOmlkX2NvbnRyYXRvfSlcclxuICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdjb250cmFjdC9zdXNwZW5kJyxmb3JtKTtcclxuICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSk7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRBbGwoKTtcclxuICAgIH0pXHJcbiAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbnZhciBQYXltZW50cyA9IHtcclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpZCA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgaWYgKGlkICE9IG51bGwpIHtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPXBhZ29zJmlkPVwiICsgaWQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBwYXltZW50VGFibGUucmVmcmVzaCwgZm9ybSwgUGF5bWVudHMuY29udHJhY3RSZWZyZXNoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICB2YXIgZGF0ZSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgIHZhciBpZF9jb250cmF0byA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9cGFnb3MmaWQ9XCIgKyBpZCArIFwiJmVzdGFkbz1wYWdhZG8mZmVjaGFfcGFnbz1cIiArIGRhdGUgKyBcIiZpZF9jb250cmF0bz1cIiArIGlkX2NvbnRyYXRvO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpO1xyXG4gIH0sXHJcblxyXG4gIHNhdmVBYm9ub3M6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBvYnNlcnZhdGlvbnMsIGFib25vJGlucHV0QWJvbm8sJHRleHRBYm9ubyxjb250cmFjdElkO1xyXG5cclxuICAgICR0ZXh0QWJvbm8gICA9ICQoJyN0ZXh0LWFib25vLWRldGFpbCcpO1xyXG4gICAgb2JzZXJ2YXRpb25zID0gJHRleHRBYm9uby52YWwoKTtcclxuICAgIGNvbnRyYWN0SWQgICA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgJGlucHV0QWJvbm8gID0gJChcIiNpbnB1dC1hYm9ub1wiKTtcclxuICAgIGFib25vICAgICAgICA9ICRpbnB1dEFib25vLnZhbCgpO1xyXG5cclxuICAgIGZvcm0gPSAnb2JzZXJ2YWNpb25lcz0nICsgb2JzZXJ2YXRpb25zICsgXCImYWJvbm9zPVwiICsgYWJvbm87XHJcbiAgICBmb3JtICs9IFwiJmNvbnRyYXRvX2Fib25vPVwiK2NvbnRyYWN0SWQrXCImdGFibGE9YWJvbm9zXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFBheW1lbnRzLmdldEFsbClcclxuICAgICRpbnB1dEFib25vLnZhbCgnJylcclxuICB9LFxyXG5cclxuICBzYXZlRXh0cmE6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdwcm9jZXNzLycpXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlVW50aWw6IGZ1bmN0aW9uKGNvbnRyYWN0SWQsbGFzdFBheW1lbnRJZCl7XHJcbiAgICB2YXIgaWRfY29udHJhdG8gPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1wYWdvc19hbF9kaWEmaWRfdWx0aW1vX3BhZ289XCIgKyBsYXN0UGF5bWVudElkICsgXCImZXN0YWRvPXBhZ2FkbyZpZF9jb250cmF0bz1cIiArIGNvbnRyYWN0SWQ7XHJcbiAgICB2YXIgaGFuZGxlcnMsIGNhbGxiYWNrO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbCwgaGVhdnlMb2FkKTtcclxuICB9LFxyXG4gICAgXHJcbiAgcmVtb3ZlUGF5bWVudDogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9ZGVzaGFjZXJfcGFnbyZpZF9wYWdvPVwiICsgaWQ7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpO1xyXG4gIH0sXHJcblxyXG4gIGNvbnRyYWN0UmVmcmVzaDogZnVuY3Rpb24oKXtcclxuICAgIHZhciBpZF9jbGllbnRlID0gJCgnI2RldGFpbC1jbGllbnQtaWQnKS52YWwoKVxyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNvbnRyYXRvc19jbGllbnRlJmlkPVwiICsgaWRfY2xpZW50ZTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBkZXRhaWxzQ29udHJhY3RUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBnZXRPbmU6IGZ1bmN0aW9uKGlkX3BhZ28sIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1wYWdvcyZpZF9wYWdvPVwiICsgaWRfcGFnbztcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRvbmVcIiwgZmFsc2UsIG51bGwsIHJlY2VpdmVyLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHJlY2VpdmVGb3JFZGl0OiBmdW5jdGlvbihjb250ZW50KXtcclxuICAgIHZhciBwYWdvICAgICAgICAgID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgIHRoaXMuaWRfY29udHJhdG8gID0gcGFnb1snaWRfY29udHJhdG8nXTtcclxuICAgIHRoaXMuaWRfcGFnbyAgICAgPSBwYWdvWydpZF9wYWdvJ11cclxuICAgIHZhciAkY29uY2VwdG8gICAgID0gJChcIiNwYXltZW50LWNvbmNlcHRcIik7XHJcbiAgICB2YXIgJGZlY2hhTGltaXRlICA9ICQoXCIjcGF5bWVudC1saW1pdC1kYXRlXCIpO1xyXG4gICAgdmFyICRjdW90YSAgICAgICAgPSAkKFwiI3BheW1lbnQtY3VvdGFcIik7XHJcbiAgICB2YXIgJG1vcmEgICAgICAgICA9ICQoXCIjcGF5bWVudC1tb3JhXCIpO1xyXG4gICAgdmFyICRleHRyYSAgICAgICAgPSAkKFwiI3BheW1lbnQtZXh0cmFcIik7XHJcbiAgICB2YXIgJHRvdGFsICAgICAgICA9ICQoXCIjcGF5bWVudC10b3RhbFwiKTtcclxuICAgIHZhciAkZGVzY3VlbnRvICAgID0gJChcIiNwYXltZW50LWRpc2NvdW50LWFtb3VudFwiKTtcclxuICAgIHZhciAkcmF6b24gICAgICAgID0gJChcIiNwYXltZW50LWRpc2NvdW50LXJlYXNvblwiKTtcclxuICAgIHZhciAkbW9kYWwgICAgICAgID0gJChcIiNhZHZhbmNlZC1wYXltZW50XCIpO1xyXG5cclxuICAgICRjb25jZXB0by52YWwocGFnb1snY29uY2VwdG8nXSk7XHJcbiAgICAkZmVjaGFMaW1pdGUudmFsKHBhZ29bJ2ZlY2hhX2xpbWl0ZSddKTtcclxuICAgICRjdW90YS52YWwocGFnb1snY3VvdGEnXSk7XHJcbiAgICAkbW9yYS52YWwocGFnb1snbW9yYSddKTtcclxuICAgICRleHRyYS52YWwocGFnb1snbW9udG9fZXh0cmEnXSk7XHJcbiAgICAkdG90YWwudmFsKHBhZ29bJ3RvdGFsJ10pO1xyXG4gICAgaW50ZXJhY3RpdmVTdW0oKTtcclxuXHJcbiAgICAkbW9kYWwubW9kYWwoKTtcclxuICAgICRtb2RhbC5vbignaGlkZS5icy5tb2RhbCcsZnVuY3Rpb24oKXtcclxuICAgICAgJG1vZGFsLmZpbmQoJ2lucHV0JykudmFsKCcnKVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI2J0bi1hcHBseS1kaXNjb3VudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIlNlZ3VybyBkZSBxdWUgcXVpZXJlIGFwbGljYXIgZXN0ZSBkZXNjdWVudG8gZGUgXCIgKyAkZGVzY3VlbnRvLnZhbCgpICsgXCI/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBhcHBseURpc2NvdW50KGlkX3BhZ28pO1xyXG4gICAgICAgICAgJG1vZGFsLmhpZGUoKTtcclxuICAgICAgICAgICRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgICAgICAgICAkKCcubW9kYWwtYmFja2Ryb3AnKS5yZW1vdmUoKTtcclxuIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwbHlEaXNjb3VudChpZF9wYWdvKSB7XHJcbiAgICAgIHZhciBkYXRlID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgZm9ybSA9ICdpZF9wYWdvPScgKyBpZF9wYWdvICsgJyZpZF9jb250cmF0bz0nICsgaWRfY29udHJhdG8gKyBcIiZjdW90YT1cIiArICRjdW90YS52YWwoKTtcclxuICAgICAgZm9ybSArPSBcIiZtb3JhPVwiICsgJG1vcmEudmFsKCkgKyBcIiZtb250b19leHRyYT1cIiArICRleHRyYS52YWwoKTtcclxuICAgICAgZm9ybSArPSBcIiZ0b3RhbD1cIiArICR0b3RhbC52YWwoKSArICcmZGVzY3VlbnRvPScgKyAkZGVzY3VlbnRvLnZhbCgpICsgJyZyYXpvbl9kZXNjdWVudG89JyArJHJhem9uLnZhbCgpICsgJyZmZWNoYV9wYWdvPScgKyBkYXRlIDtcclxuICAgICAgZm9ybSArPSBcIiZ0YWJsYT1kaXNjb3VudF9wYWdvc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFBheW1lbnRzLmdldEFsbCk7XHJcbiAgICAgICRtb2RhbC5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW50ZXJhY3RpdmVTdW0oKXtcclxuICAgICAgJCgnLnBheW1lbnQtc3VtYW5kb3MnKS5vbigna2V5dXAnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJGN1b3RhLnZhbChwYWdvWydjdW90YSddIC0gJGRlc2N1ZW50by52YWwoKSk7XHJcbiAgICAgICAgdmFyIHN1bWEgPSBOdW1iZXIoJGN1b3RhLnZhbCgpKSArIE51bWJlcigkbW9yYS52YWwoKSkgKyBOdW1iZXIoJGV4dHJhLnZhbCgpKTtcclxuICAgICAgICAkdG90YWwudmFsKE51bWJlcihzdW1hKSlcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBlZGl0OiBmdW5jdGlvbihjb250ZW50KXtcclxuICAgIHZhciBwYWdvICAgICAgICAgID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgIHRoaXMuaWRfY29udHJhdG8gID0gcGFnb1snaWRfY29udHJhdG8nXTtcclxuICAgIHRoaXMuaWRfcGFnbyAgICAgID0gcGFnb1snaWRfcGFnbyddXHJcbiAgICB2YXIgJG1vZGFsICAgICAgICA9ICQoJyNlZGl0LXBheW1lbnQtbW9kYWwnKSBcclxuICAgIGNvbnNvbGUubG9nKHBhZ28pXHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCk7XHJcblxyXG4gICAgJG1vZGFsLm9uKCdoaWRlLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG4gICAgICAkbW9kYWwuZmluZCgnaW5wdXQnKS52YWwoJycpXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWVkaXRlZC1wYXltZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiU2VndXJvIGRlIHF1ZSBxdWllcmUgYXBsaWNhciBlc3RlIGRlc2N1ZW50byBkZSBcIiArICRkZXNjdWVudG8udmFsKCkgKyBcIj9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGFwcGx5RGlzY291bnQoaWRfcGFnbyk7XHJcbiAgICAgICAgICAkbW9kYWwuaGlkZSgpO1xyXG4gICAgICAgICAgJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICAgICAgICAgICQoJy5tb2RhbC1iYWNrZHJvcCcpLnJlbW92ZSgpO1xyXG4gXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBmdW5jdGlvbiBhcHBseURpc2NvdW50KGlkX3BhZ28pIHtcclxuICAgIC8vICAgdmFyIGRhdGUgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgLy8gICBmb3JtID0gJ2lkX3BhZ289JyArIGlkX3BhZ28gKyAnJmlkX2NvbnRyYXRvPScgKyBpZF9jb250cmF0byArIFwiJmN1b3RhPVwiICsgJGN1b3RhLnZhbCgpO1xyXG4gICAgLy8gICBmb3JtICs9IFwiJm1vcmE9XCIgKyAkbW9yYS52YWwoKSArIFwiJm1vbnRvX2V4dHJhPVwiICsgJGV4dHJhLnZhbCgpO1xyXG4gICAgLy8gICBmb3JtICs9IFwiJnRvdGFsPVwiICsgJHRvdGFsLnZhbCgpICsgJyZkZXNjdWVudG89JyArICRkZXNjdWVudG8udmFsKCkgKyAnJnJhem9uX2Rlc2N1ZW50bz0nICskcmF6b24udmFsKCkgKyAnJmZlY2hhX3BhZ289JyArIGRhdGUgO1xyXG4gICAgLy8gICBmb3JtICs9IFwiJnRhYmxhPWRpc2NvdW50X3BhZ29zXCI7XHJcbiAgICAvLyAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICAgIC8vICAgJG1vZGFsLmhpZGUoKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBmdW5jdGlvbiBpbnRlcmFjdGl2ZVN1bSgpe1xyXG4gICAgLy8gICAkKCcucGF5bWVudC1zdW1hbmRvcycpLm9uKCdrZXl1cCcsZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICAkY3VvdGEudmFsKHBhZ29bJ2N1b3RhJ10gLSAkZGVzY3VlbnRvLnZhbCgpKTtcclxuICAgIC8vICAgICB2YXIgc3VtYSA9IE51bWJlcigkY3VvdGEudmFsKCkpICsgTnVtYmVyKCRtb3JhLnZhbCgpKSArIE51bWJlcigkZXh0cmEudmFsKCkpO1xyXG4gICAgLy8gICAgICR0b3RhbC52YWwoTnVtYmVyKHN1bWEpKVxyXG4gICAgLy8gICB9KVxyXG4gICAgLy8gfVxyXG4gIH1cclxuICBcclxufVxyXG5cclxudmFyIERhbWFnZXMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgaWRDbGllbnRlLCBkZXNjcmlwdGlvbjtcclxuICAgIGlkQ2xpZW50ZSA9ICQoXCIjYXZlcmlhcy1jbGllbnQtaWRcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjYS1kZXNjcmlwdGlvblwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtpZENsaWVudGUsIGRlc2NyaXB0aW9uXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY2xpZW50ZT0nICsgaWRDbGllbnRlICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbiArIFwiJnRhYmxhPWF2ZXJpYXNcIjtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2FkZFwiLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIERhbWFnZXMuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gICAgJCgnI25ldy1hdmVyaWEtbW9kYWwnKS5maW5kKCdpbnB1dCx0ZXh0YXJlYScpLnZhbChcIlwiKTtcclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGF0dXMgPSAkKFwiI2F2ZXJpYXMtdmlldy1tb2RlXCIpLnZhbCgpO1xyXG4gICAgJChcIi5wcmVzZW50YWRvXCIpLnRleHQoc3RhdHVzKTtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1hdmVyaWFzJmVzdGFkbz1cIiArIHN0YXR1cztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBpbml0R2xvYmFsSGFuZGxlcnMsIGZpbGxBdmVyaWFzTGlzdCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoJGlkX2F2ZXJpYSkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWF2ZXJpYXMmaWRfYXZlcmlhPVwiICsgJGlkX2F2ZXJpYTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgRGFtYWdlcy5nZXRBbGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIEluc3RhbGxhdGlvbnMgPSB7XHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhdHVzID0gJChcIiNpbnN0YWxsYXRpb25zLXZpZXctbW9kZVwiKS52YWwoKTtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1pbnN0YWxhY2lvbmVzJmVzdGFkbz1cIiArIHN0YXR1cztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBpbml0R2xvYmFsSGFuZGxlcnMsIGZpbGxJbnN0YWxsYXRpb25zTGlzdCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoJGlkX3BhZ28pIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1pbnN0YWxhY2lvbmVzJmlkX3BhZ289XCIgKyAkaWRfcGFnbztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgSW5zdGFsbGF0aW9ucy5nZXRBbGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIENhamEgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgYW1vdW50LCBkZXNjcmlwdGlvbiwgaXNfZW1wdHk7XHJcblxyXG4gICAgYW1vdW50ID0gJChcIiNjYWphLWEtYW1vdW50XCIpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKFwiI2NhamEtYS1kZXNjcmlwdGlvblwiKS52YWwoKTtcclxuICAgIGZvcm0gPSBcImVudHJhZGE9XCIgKyBhbW91bnQgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uICsgXCImdGFibGE9Y2FqYVwiO1xyXG4gICAgaXNfZW1wdHkgPSBpc0VtcHR5KFthbW91bnQsIGRlc2NyaXB0aW9uXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2FkZCcsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIENhamEuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcmV0aXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgYW1vdW50LCBkZXNjcmlwdGlvbiwgaXNfZW1wdHk7XHJcblxyXG4gICAgYW1vdW50ID0gJChcIiNjYWphLXItYW1vdW50XCIpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKFwiI2NhamEtci1kZXNjcmlwdGlvblwiKS52YWwoKTtcclxuICAgIGZvcm0gPSBcInNhbGlkYT1cIiArIGFtb3VudCArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb247XHJcbiAgICBpc19lbXB0eSA9IGlzRW1wdHkoW2Ftb3VudCwgZGVzY3JpcHRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3JldGlyZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIENhamEuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2FqYVwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0QWxsJywgZmFsc2UsIG51bGwsIGNhamFUYWJsZS5yZWZyZXNoLCBmb3JtLCBDYWphLmdldFNhbGRvKTtcclxuICB9LFxyXG5cclxuICBnZXRTYWxkbzogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNhamFcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldG9uZScsIGZhbHNlLCBudWxsLCB1cGRhdGVTYWxkbywgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICBzZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciAkZGF0ZVNlYXJjaCA9ICQoXCIjY2FqYS1kYXRlXCIpO1xyXG4gICAgdmFyICR1c2VyU2VhcmNoID0gJChcIiNjYWphLXVzZXJcIik7XHJcbiAgICB2YXIgZGF0ZSA9ICgkZGF0ZVNlYXJjaC52YWwoKSkgPyAkZGF0ZVNlYXJjaC52YWwoKSA6ICclJztcclxuICAgIHZhciB1c2VySWQgPSAoJHVzZXJTZWFyY2gudmFsKCkpID8gJHVzZXJTZWFyY2gudmFsKCkgOiAnJSc7XHJcblxyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNhamEmaWRfZW1wbGVhZG89XCIgKyB1c2VySWQgKyBcIiZmZWNoYT1cIiArIGRhdGU7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9zZWFyY2gnLCBmYWxzZSwgbnVsbCwgY2FqYVRhYmxlLnJlZnJlc2gsIGZvcm0sIG51bGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIENvbXBhbnkgPSB7XHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSxcclxuICAgIGNvbXBhbnlOYW1lID0gJChcIiNjb21wYW55LW5hbWVcIikudmFsKCksXHJcbiAgICBjb21wYW55U3RhdGVtZW50ID0gJChcIiNjb21wYW55LXN0YXRlbWVudFwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlQaG9uZTEgPSBnZXRWYWwoJChcIiNjb21wYW55LXBob25lMVwiKSksXHJcbiAgICBjb21wYW55RGlyZWN0aW9uID0gJChcIiNjb21wYW55LWRpcmVjdGlvblwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlEZXNjcmlwdGlvbiA9ICQoXCIjY29tcGFueS1kZXNjcmlwdGlvblwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlQaG9uZTIgPSBnZXRWYWwoJChcIiNjb21wYW55LXBob25lMlwiKSlcclxuXHJcbiAgICBmb3JtID0gJ25vbWJyZT0nICsgY29tcGFueU5hbWUgKyAnJmxlbWE9JyArIGNvbXBhbnlTdGF0ZW1lbnQgKyAnJmRlc2NyaXBjaW9uPScgKyBjb21wYW55RGVzY3JpcHRpb24gKyBcIiZkaXJlY2Npb249XCJcclxuICAgIGZvcm0gKz0gY29tcGFueURpcmVjdGlvbiArIFwiJnRlbGVmb25vMT1cIiArIGNvbXBhbnlQaG9uZTEgKyBcIiZ0ZWxlZm9ub3M9XCIgKyBjb21wYW55UGhvbmUyICsgXCImdGFibGE9ZW1wcmVzYVwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgU2V0dGluZ3MgPSB7XHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSxcclxuICAgIHNldHRpbmdzQ2FyZ29Nb3JhID0gJChcIiNzZXR0aW5ncy1tb3JhXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NGZWNoYUNvcnRlID0gJChcIiNzZXR0aW5ncy1mZWNoYS1jb3J0ZVwiKS52YWwoKSxcclxuICAgIHNldHRpbmdzQXBlcnR1cmFDYWphID0gJChcIiNzZXR0aW5ncy1hcGVydHVyYS1jYWphXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NQZW5hbGl6YWNpb25DYW5jZWxhY2lvbiA9ICQoXCIjc2V0dGluZ3MtcGVuYWxpemFjaW9uLWNhbmNlbGFjaW9uXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NNZXNlc1BvckRlZmVjdG8gPSAkKFwiI3NldHRpbmdzLW1lc2VzLXBvci1kZWZlY3RvXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NTcGxpdERheSA9ICQoXCIjc2V0dGluZ3Mtc3BsaXQtZGF5XCIpLnZhbCgpO1xyXG5cclxuICAgIGZvcm0gPSAnY2FyZ29fbW9yYT0nICsgc2V0dGluZ3NDYXJnb01vcmEgKyAnJmZlY2hhX2NvcnRlPScgKyBzZXR0aW5nc0ZlY2hhQ29ydGUgKyAnJmFwZXJ0dXJhX2NhamE9JyArIHNldHRpbmdzQXBlcnR1cmFDYWphO1xyXG4gICAgZm9ybSArPSAnJnBlbmFsaXphY2lvbl9jYW5jZWxhY2lvbj0nICsgc2V0dGluZ3NQZW5hbGl6YWNpb25DYW5jZWxhY2lvbiArICcmbWVzZXNfcG9yX2RlZmVjdG89JyArIHNldHRpbmdzTWVzZXNQb3JEZWZlY3RvO1xyXG4gICAgZm9ybSArPSAnJnNwbGl0X2RheT0nICsgc2V0dGluZ3NTcGxpdERheSArICcmdGFibGE9c2V0dGluZ3MnO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgU2VjdGlvbnMgPSB7IFxyXG4gIGFkZDogZnVuY3Rpb24oKSB7XHJcbiAgICBzd2FsLnNldERlZmF1bHRzKHtcclxuICAgICAgaW5wdXQ6ICd0ZXh0JyxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdOZXh0ICZyYXJyOycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICAgIHByb2dyZXNzU3RlcHM6IFsnMScsICcyJywgJzMnXVxyXG4gICAgfSlcclxuXHJcbiAgICB2YXIgc3RlcHMgPSBbe1xyXG4gICAgICAgIHRpdGxlOiAnTm9tYnJlIGRlbCBzZWN0b3InXHJcbiAgICAgIH0sXHJcbiAgICAgICdDb2RpZ28gZGVsIFNlY3RvcicsXHJcbiAgICBdXHJcblxyXG4gICAgc3dhbC5xdWV1ZShzdGVwcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgIHN3YWwucmVzZXREZWZhdWx0cygpXHJcbiAgICAgIHNhdmUocmVzdWx0KVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2F2ZShyZXN1bHQpe1xyXG4gICAgICB2YXIgZm9ybTtcclxuICAgICAgdmFyIG5vbWJyZSA9IHJlc3VsdFswXTtcclxuICAgICAgdmFyIGNvZGlnb0FyZWEgPSByZXN1bHRbMV0sXHJcblxyXG4gICAgICBmb3JtID0gXCJub21icmU9XCIrbm9tYnJlK1wiJmNvZGlnb19hcmVhPVwiK2NvZGlnb0FyZWE7XHJcbiAgICAgIGZvcm0gKz0gXCImdGFibGE9c2VjY2lvbmVzXCJcclxuICAgICBcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpe1xyXG4gICAgICAgICBpZihjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9hZGQnLCB0cnVlLCBmYWxzZSwgbnVsbCwgZm9ybSxTZWN0aW9ucy5nZXRBbGwsaGVhdnlMb2FkKSl7XHJcbiAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldElwczogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaWQgPSAkKFwiI3NlbGVjdC1zZWN0b3JcIikudmFsKCk7XHJcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9aXBzJmlkPVwiICsgaWQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBTZWN0aW9ucy5yZW9yZGVyVGFibGUsIGZvcm0sbnVsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcmVvcmRlclRhYmxlOiBmdW5jdGlvbihjb250ZW50KXtcclxuICAgIHZhciB0YWJsZSA9ICQoXCIjdC1zZWN0aW9uc1wiKTtcclxuICAgIHRhYmxlLmJvb3RzdHJhcFRhYmxlKCdkZXN0cm95Jyk7XHJcbiAgICAkKFwiI3Qtc2VjdGlvbnMgdGJvZHlcIikuaHRtbChjb250ZW50KTtcclxuICAgIHRhYmxlLmJvb3RzdHJhcFRhYmxlKCk7XHJcbiAgICB0YWJsZS5maW5kKCd0Ym9keScpLmNzcyh7ZGlzcGxheTpcInRhYmxlLXJvdy1ncm91cFwifSk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPXNlY2Npb25lc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgZmlsbFNlbGVjdCwgZm9ybSxoZWF2eUxvYWQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZpbGxTZWxlY3QoY29udGVudCl7XHJcbiAgICAgICQoXCIjc2VsZWN0LXNlY3RvclwiKS5odG1sKGNvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgJHRhYmxlID0gJChcIiN0LXNlY3Rpb25zXCIpO1xyXG4gICAgdmFyICRidG5QcmludCA9ICQoXCIjYnRuLXByaW50LXNlY3Rpb25zXCIpO1xyXG4gICAgdmFyICRzZWxlY3RTdGF0ZSA9ICQoXCIjZmlsdGVyLXNlY3Rpb25zXCIpO1xyXG4gICAgXHJcblxyXG4gICAgJHNlbGVjdFN0YXRlLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBmaWx0ZXIgPSAkKHRoaXMpLnZhbCgpXHJcbiAgICAgIGlmKGZpbHRlci5pbmNsdWRlcyhcIl1cIikpXHJcbiAgICAgICAgZmlsdGVyID0gWydvY3VwYWRvJywnZGlzcG9uaWJsZSddXHJcbiAgICAgIGNvbnNvbGUubG9nKGZpbHRlcilcclxuXHJcbiAgICAgICR0YWJsZS5ib290c3RyYXBUYWJsZSgnZmlsdGVyQnknLHtcclxuICAgICAgICBlc3RhZG86ICBmaWx0ZXJcclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgJGJ0blByaW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIHByaW50KCk7XHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxuXHJcbnZhciBFeHRyYXMgPSB7XHJcbiAgcmVtb3ZlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBpZF9jbGllbnRlLCBzZW5kO1xyXG4gICAgXHJcbiAgICBpZF9jbGllbnRlID0gJCgnI2RldGFpbC1jbGllbnQtaWQnKS52YWwoKVxyXG4gICAgZm9ybSA9IFwiZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KHtpZDogaWQsaWRfY2xpZW50ZTogaWRfY2xpZW50ZX0pO1xyXG4gICAgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAnZXh0cmEvZGVsZXRlX2V4dHJhJywgZm9ybSk7XHJcbiAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgZXh0cmFUYWJsZS5yZWZyZXNoKGRhdGEuZXh0cmFzKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxufSIsIiAgdmFyIGN1cnJlbnRQYWdlID0gJChcInRpdGxlXCIpLnRleHQoKS5zcGxpdChcIiBcIik7XHJcbiAgY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZVs0XS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICB2YXIgcmFuID0gZmFsc2U7XHJcbiAgXHJcbiAgZnVuY3Rpb24gaW5pdENvbXBvbmVudHMoKXtcclxuICAgIHN3aXRjaCAoY3VycmVudFBhZ2UpIHtcclxuICAgICAgY2FzZSBcImhvbWVcIjpcclxuICAgICAgICBpbml0Q2xpZW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImFkbWluaXN0cmFkb3JcIjpcclxuICAgICAgICBpbml0QWRtaW5IYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiY2xpZW50ZXNcIjpcclxuICAgICAgICBpbml0Q2xpZW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNlcnZpY2lvc1wiOlxyXG4gICAgICAgIGluaXRTZXJ2aWNlc0hhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJudWV2b19jb250cmF0b1wiOlxyXG4gICAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICAgICAgQ29udHJhY3RzLmdldElwTGlzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZGV0YWxsZXNcIjpcclxuICAgICAgICBpbml0UGF5bWVudHNIYW5kbGVycygpO1xyXG4gICAgICAgIGRldGFpbEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJjb250cmF0b3NcIjpcclxuICAgICAgICBpbml0Q29udHJhY3RIYW5kbGVycygpO1xyXG4gICAgICAgIGluaXRDbGllbnRIYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiY3VlbnRhXCI6XHJcbiAgICAgICAgYWNvdW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNlY2Npb25lc1wiOlxyXG4gICAgICAgIHNlY3Rpb25IYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDYWphSGFuZGxlcnMoKTtcclxuICAgIGluaXRHbG9iYWxIYW5kbGVycygpO1xyXG4gIH1cclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgIGdsb2JhbHMgaGFuZGxlcnMgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICBmdW5jdGlvbiBpbml0R2xvYmFsSGFuZGxlcnMoKSB7XHJcbiAgICB2YXIgYXZlcmlhQ2xpZW50RG5pID0gJChcIiNhLWNsaWVudC1kbmlcIik7XHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ25vdGlmaWNhY2lvbmVzJykge1xyXG4gICAgICAgIEdlbmVyYWxzLmNvdW50X3RhYmxlKFwiYXZlcmlhc1wiKTtcclxuXHJcbiAgICAgICQoXCIjYXZlcmlhcy12aWV3LW1vZGVcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBEYW1hZ2VzLmdldEFsbCgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICAkKFwiI2luc3RhbGxhdGlvbnMtdmlldy1tb2RlXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgSW5zdGFsbGF0aW9ucy5nZXRBbGwoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCd0Ym9keScpLmNzcyh7ZGlzcGxheTpcInRhYmxlLXJvdy1ncm91cFwifSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1cnJlbnRQYWdlID09ICdjb250cmF0b3MnKSB7XHJcbiAgICAgaW5pdENvbnRyYWN0SGFuZGxlcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWF2ZXJpYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBEYW1hZ2VzLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYXZlcmlhQ2xpZW50RG5pLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGlmIChpc0NvbXBsZXRlKGF2ZXJpYUNsaWVudERuaSkpIHtcclxuICAgICAgICB2YXIgZG5pID0gZ2V0VmFsKGF2ZXJpYUNsaWVudERuaSk7XHJcbiAgICAgICAgQ2xpZW50cy5nZXRPbmUoZG5pLGZpbGxDbGllbnRGaWVsZHMpXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICQoJyNhLWNsaWVudCcpLnZhbCgnJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIuYnRuLXVwZGF0ZS1hdmVyaWFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkX2F2ZXJpYSA9ICQodGhpcykucGFyZW50cygnLmF2ZXJpYS1pdGVtJykuZmluZCgnLmNvZGUnKVxyXG4gICAgICBpZF9hdmVyaWEgPSBpZF9hdmVyaWEudGV4dCgpLnRyaW0oKTtcclxuICAgICAgRGFtYWdlcy51cGRhdGUoaWRfYXZlcmlhKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKFwiLmJ0bi11cGRhdGUtaW5zdGFsbGF0aW9uXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBpZF9wYWdvID0gJCh0aGlzKS5wYXJlbnRzKCcuYXZlcmlhLWl0ZW0nKS5maW5kKCcuY29kZScpO1xyXG4gICAgICBpZF9wYWdvID0gaWRfcGFnby50ZXh0KCkudHJpbSgpO1xyXG4gICAgICBJbnN0YWxsYXRpb25zLnVwZGF0ZShpZF9wYWdvKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZXh0cmEtY29udHJvbHNcIikub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ29udHJhY3RzLmJ0bkV4dHJhUHJlc3NlZCgkKHRoaXMpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZXh0cmEtY2xpZW50LWRuaVwiKS5vbigna2V5ZG93bicsZnVuY3Rpb24oZSl7XHJcbiAgICAgIHZhciBrZXkgPSBlLndoaWNoO1xyXG4gICAgICB2YXIgZG5pID0gJCh0aGlzKS52YWwoKVxyXG4gICAgICBpZihrZXkgPT0gMTMpe1xyXG4gICAgICAgIENvbnRyYWN0cy5nZXRBbGxPZkNsaWVudChkbmkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgYWRtaW4gaGFuZGxlcnMgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0QWRtaW5IYW5kbGVycygpIHtcclxuICAgIHVzZXJUYWJsZS5pbml0KCk7XHJcbiAgICAkKFwiI2J0bi1zYXZlLXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgVXNlcnMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBVc2Vycy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIuZGVsZXRlLXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgJHJvdyA9ICQodGhpcykucGFyZW50cyhcInRyXCIpO1xyXG4gICAgICB2YXIgaWQgPSAkcm93LmZpbmQoJy51c2VyLWlkJykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgdmFyIHJvdyA9IHVzZXJUYWJsZS5nZXRSb3coaWQpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIkRlc2VhIEVsaW1pbmFyIGFsIFVzdWFyaW8gXCIgKyByb3cubm9tYnJlcyArXCIgXCIrIHJvdy5hcGVsbGlkb3MgKyBcIj9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICBVc2Vycy5kZWxldGUoaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5lZGl0LXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgaWQgID0gJCh0aGlzKS5hdHRyKCdkYXRhLXVzZXItaWQnKTtcclxuICAgICAgdmFyIHJvdyA9IHVzZXJUYWJsZS5nZXRSb3coaWQpO1xyXG4gICAgICBcclxuXHJcbiAgICAgICQoXCIjZS1uaWNrbmFtZVwiKS52YWwocm93Lm5pY2spO1xyXG4gICAgICAkKFwiI2UtbmFtZVwiKS52YWwocm93Lm5vbWJyZXMpO1xyXG4gICAgICAkKFwiI2UtbGFzdG5hbWVcIikudmFsKHJvdy5hcGVsbGlkb3MpO1xyXG4gICAgICAkKFwiI2UtZG5pXCIpLnZhbChyb3cuY2VkdWxhKTtcclxuICAgICAgJChcIiNlLXR5cGVcIikudmFsKHJvdy50aXBvX2NvZGlnbyk7XHJcbiAgICAgICQoJyN1cGRhdGUtdXNlci1tb2RhbCcpLm1vZGFsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3VwZGF0ZS1jb21wYW55LWRhdGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb21wYW55LnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tdXBkYXRlLXNldHRpbmdzXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIFNldHRpbmdzLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gc29tZSBnbG9iYWxzIGhhbmRsZXJzXHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1hdmVyaWFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgRGFtYWdlcy5hZGQoKVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgSW5pdCBjYWphICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgXHJcbiAgZnVuY3Rpb24gaW5pdENhamFIYW5kbGVycygpIHtcclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnYWRtaW5pc3RyYWRvcicpIHtcclxuICAgICAgY2FqYVRhYmxlLmluaXQoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHZhciBidG5BZGRNb25leSAgICAgPSAkKFwiI2J0bi1hZGQtbW9uZXlcIik7XHJcbiAgICB2YXIgYnRuUmV0aXJlTW9uZXkgID0gJChcIiNidG4tcmV0aXJlLW1vbmV5XCIpO1xyXG4gICAgdmFyIHVzZXJTZWFyY2ggICAgICA9ICQoXCIjY2FqYS11c2VyXCIpO1xyXG4gICAgdmFyIGRhdGVTZWFyY2ggICAgICA9ICQoXCIjY2FqYS1kYXRlXCIpO1xyXG5cclxuICAgIGJ0bkFkZE1vbmV5Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENhamEuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBidG5SZXRpcmVNb25leS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDYWphLnJldGlyZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGF0ZVNlYXJjaC5vbignY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5zZWFyY2goKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHVzZXJTZWFyY2gub24oJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENhamEuc2VhcmNoKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBJbml0IGNsaWVudCBIYW5kbGVycyAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gaW5pdENsaWVudEhhbmRsZXJzKCkge1xyXG4gICAgaWYgKGN1cnJlbnRQYWdlID09ICdjbGllbnRlcycpIHtcclxuICAgICAgY2xpZW50VGFibGUuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLXNhdmUtY2xpZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENsaWVudHMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3VwZGF0ZS1jbGllbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBjbGllbnRUYWJsZS5nZXRJZCgpO1xyXG4gICAgICBpZiAoaWQpIHtcclxuICAgICAgICBDbGllbnRzLmdldE9uZShpZCwgQ2xpZW50cy5yZWNlaXZlRm9yRWRpdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjY2xpZW50LXNlYXJjaGVyXCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgR2VuZXJhbHMuc2VhcmNoKHRleHQsIFwiY2xpZW50ZXNcIiwgY2xpZW50VGFibGUucmVmcmVzaCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2NsaWVudC1zZWFyY2hlci1uZXdjb250cmFjdFwiKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgdGV4dCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgIGlmICghaXNFbXB0eShbdGV4dF0pKSB7XHJcbiAgICAgICAgR2VuZXJhbHMuc2VhcmNoKHRleHQsIFwiY2xpZW50ZXNcIiwgY2xpZW50VGFibGUucmVmcmVzaCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xlYXJUYm9keShcIi5sb2JieS1yZXN1bHRzXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2RlbGV0ZS1jbGllbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgcm93ID0gY2xpZW50VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgRWxpbWluYXIgYWwobGEpIENsaWVudGUgXCIgKyByb3cubm9tYnJlcyArIFwiIFwiICsgcm93LmFwZWxsaWRvcyArIFwiP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgIEdlbmVyYWxzLmRlbGV0ZVJvdyhyb3cuaWQsIFwiY2xpZW50ZXNcIilcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgSW5pdCBTZXJ2aWNlcyBIYW5kbGVycyAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGluaXRTZXJ2aWNlc0hhbmRsZXJzKCkge1xyXG4gICAgc2VydmljZVRhYmxlLmluaXQoKTtcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VydmljZXMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2RlbGV0ZS1zZXJ2aWNlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gc2VydmljZVRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgRWxpbWluYXIgIGVsIFNlcnZpY2lvP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgIEdlbmVyYWxzLmRlbGV0ZVJvdyhpZCwgXCJzZXJ2aWNpb3NcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZWRpdC1zZXJ2aWNlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyIHJvdyA9IHNlcnZpY2VUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG5cclxuICAgICAgJCgnI3Utc2VydmljZS1pZCcpLnZhbChyb3cuaWQpO1xyXG4gICAgICAkKCcjdS1zZXJ2aWNlLW5hbWUnKS52YWwocm93Lm5vbWJyZSk7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtZGVzY3JpcHRpb24nKS52YWwocm93LmRlc2NyaXBjaW9uKTtcclxuICAgICAgJCgnI3Utc2VydmljZS1tb250aGx5LXBheW1lbnQnKS52YWwoTnVtYmVyKHJvdy5tZW5zdWFsaWRhZC5yZXBsYWNlKFwiUkQkIFwiLCcnKSkpO1xyXG4gICAgICAkKCcjdS1zZXJ2aWNlLXR5cGUnKS52YWwocm93LnRpcG8pO1xyXG4gICAgICAkKCcjdXBkYXRlLXNlcnZpY2UtbW9kYWwnKS5tb2RhbCgpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLXVwZGF0ZS1zZXJ2aWNlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFNlcnZpY2VzLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNzZXJ2aWNlLXNlYXJjaGVyXCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgR2VuZXJhbHMuc2VhcmNoKHRleHQsIFwic2VydmljaW9zXCIsIHNlcnZpY2VUYWJsZS5yZWZyZXNoLGluaXRTZXJ2aWNlc0hhbmRsZXJzKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBJbml0IENvbnRyYWN0IEhhbmRsZXJzICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gaW5pdENvbnRyYWN0SGFuZGxlcnMoKSB7XHJcbiAgICBjb250cmFjdFRhYmxlLmluaXQoKTtcclxuICAgIENvbnRyYWN0cy5nZXRBbGwoKTtcclxuICAgIFxyXG4gICAgJChcIiNidG4tc2F2ZS1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb250cmFjdHMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1hZGQtZXh0cmFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb250cmFjdHMuY2FsbEV4dHJhKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBjb250ID0gMDtcclxuXHJcbiAgICAkKFwiI2NvbnRyYWN0LXNlYXJjaGVyXCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgR2VuZXJhbHMuc2VhcmNoKHRleHQsIFwidl9jb250cmF0b3NcIiwgY29udHJhY3RUYWJsZS5yZWZyZXNoLG51bGwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tY2FuY2VsLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyIHJvdyA9IGNvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgICQoXCIuY2FuY2VsLW5hbWVcIikudGV4dChyb3cuY2xpZW50ZSk7XHJcbiAgICAgICAgdmFyICRpbnB1dEVsZW1lbnQgICA9ICQoXCIuY29uZmlybWVkLWRhdGFcIik7XHJcbiAgICAgICAgdmFyICRidXR0b25Ub0FjdGl2ZSA9ICQoXCIjY2FuY2VsLXBlcm1hbmVudGx5XCIpO1xyXG5cclxuICAgICAgICBkZWxldGVWYWxpZGF0aW9uKCRpbnB1dEVsZW1lbnQscm93LmNsaWVudGUsICRidXR0b25Ub0FjdGl2ZSk7XHJcbiAgICAgICAgJChcIiNjYW5jZWwtcHJpbnRcIikuYXR0cihcImhyZWZcIixCQVNFX1VSTCArICdwcm9jZXNzL2dldGNhbmNlbGNvbnRyYWN0LycrIHJvdy5pZF9jbGllbnRlICsgXCIvXCIgKyByb3cuaWQpO1xyXG5cclxuICAgICAgICAkKFwiI2NhbmNlbC1jb250cmFjdC1tb2RhbFwiKS5tb2RhbCgpO1xyXG4gICAgICAgICRidXR0b25Ub0FjdGl2ZS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIENvbnRyYWN0cy5jYW5jZWwoKVxyXG4gICAgICAgICAgJGJ1dHRvblRvQWN0aXZlLmF0dHIoJ2Rpc2FibGUnKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkaW5wdXRFbGVtZW50LnZhbCgnJyk7XHJcbiAgICAgICAgJGJ1dHRvblRvQWN0aXZlLmF0dHIoJ2Rpc2FibGVkJywgJycpO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBzd2FsKFwiRGViZXMgc2VsZWNjaW9uYXIgdW4gY29udHJhdG9cIilcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tc3VzcGVuZC1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICB2YXIgcm93ID0gY29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgU3VzcGVuZGVyIGVsIGNvbnRyYXRvIGRlIFwiICsgcm93LmNsaWVudGUgK1wiID9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICBDb250cmFjdHMuc3VzcGVuZChyb3cuaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgIHN3YWwoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIGNvbnRyYXRvXCIpXHJcbiAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tdXBkYXRlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gY29udHJhY3RUYWJsZS5nZXRJZCgpO1xyXG4gICAgICBpZiAoaWQpIHtcclxuICAgICAgICBDb250cmFjdHMuZ2V0T25lKGlkLCBDb250cmFjdHMucmVjaWV2ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjc2VsZWN0LWNvbnRyYWN0LXNlY3RvclwiKS5vbignY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ29udHJhY3RzLmdldElwTGlzdCgpO1xyXG4gICAgfSlcclxuXHJcbiAgICAkKCcjc2VsZWN0LXBheS11bnRpbCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyICR0aGlzICAgICAgICAgPSAkKCcjc2VsZWN0LXBheS11bnRpbCA6c2VsZWN0ZWQnKTtcclxuICAgICAgdmFyIGNvbnRyYWN0SWQgICAgPSAkdGhpcy5hdHRyKCdkYXRhLWNvbnRyYWN0Jyk7XHJcbiAgICAgIHZhciBsYXN0UGF5bWVudElkID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgUGF5bWVudHMudXBkYXRlVW50aWwoY29udHJhY3RJZCxsYXN0UGF5bWVudElkKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgUGF5bWVudHMgIEhhbmRsZXJzICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBcclxuICBmdW5jdGlvbiBpbml0UGF5bWVudHNIYW5kbGVycygpIHtcclxuICAgIHBheW1lbnRUYWJsZS5pbml0KCk7XHJcbiAgICBleHRyYVRhYmxlLmluaXQoKTtcclxuICAgIGlmICghcmFuKSB7XHJcbiAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgICByYW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLXBheVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBwYXltZW50VGFibGUuZ2V0SWQoKTtcclxuICAgICAgaWYoaWQpIHtcclxuICAgICAgICBQYXltZW50cy51cGRhdGUoaWQpO1xyXG4gICAgICAgIHVwZGF0ZV9tb2RlKGlkKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gVE9ETzogTUVTU0FHRSBTZWxlY3QgYSBwYXltZW50XHJcbiAgICAgIH1cclxuICAgIH0pOyBcclxuXHJcbiAgICAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgUGF5bWVudHMuZ2V0QWxsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1yZWNvbm5lY3RcIikub24oJ2NsaWNrJyxmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcclxuICAgICAgQ29udHJhY3RzLnJlY29ubmVjdCgpXHJcbiAgICB9KVxyXG5cclxuICAgICQoXCIjcGF5bWVudC1kZXRhaWwtYm94XCIpLmNvbGxhcHNlKClcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVfbW9kZShpZCl7XHJcbiAgICAgIHZhciBtb2RlID0gJCgnLnBheW1lbnQtbW9kZS5zZWxlY3RlZCcpLnRleHQoKTtcclxuICAgICAgdmFyIGV4dHJhSW5mbyA9IHtpZDogaWQudG9TdHJpbmcoKSxtb2R1bGU6J3BhZ29zJ31cclxuICAgICAgdmFyIGZvcm0gPSAnZGF0YT0nK0pTT04uc3RyaW5naWZ5KHt0aXBvOiBtb2RlfSkrJyZleHRyYV9pbmZvPScrSlNPTi5zdHJpbmdpZnkoZXh0cmFJbmZvKTtcclxuXHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAncHJvY2Vzcy9heGlvc3VwZGF0ZScsZm9ybSlcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAvL1RPRE86IHNvbWV0aGluZyB3aGl0aCB0aGF0IC8gYWxnbyBjb24gZXN0b1xyXG4gICAgICB9KTtcclxuICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICAgICAgZGV0YWlsIEhhbmRsZXJzICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gZGV0YWlsSGFuZGxlcnMoKSB7XHJcbiAgICAkKFwiI2J0bi1zYXZlLW9ic2VydmF0aW9uc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBQYXltZW50cy5zYXZlQWJvbm9zKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjYnRuLXNhdmUtcmVhbC1vYnNlcnZhdGlvbnMnKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDbGllbnRzLnNhdmVPYnNlcnZhdGlvbnMoKTtcclxuICAgIH0pXHJcblxyXG4gICAgZGV0YWlsc0NvbnRyYWN0VGFibGUuaW5pdCgpO1xyXG5cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFjb3VudEhhbmRsZXJzKCl7XHJcbiAgICB2YXIgJHVzZXJJZCAgICAgICAgICA9ICQoXCIjYWNvdW50LXVzZXItaWRcIilcclxuICAgIHZhciAkY3VycmVudFBhc3N3b3JkID0gJChcIiNhY291bnQtY3VycmVudC1wYXNzd29yZFwiKVxyXG4gICAgdmFyICRidG5VcGRhdGVVc2VyICAgID0gJChcIiN1cGRhdGUtdXNlci1kYXRhXCIpO1xyXG4gICAgdmFyICRuZXdQYXNzd29yZCAgICAgID0gJChcIiNhY291bnQtbmV3LXBhc3N3b3JkXCIpO1xyXG5cclxuICAgICQoXCIjYWNvdW50LWN1cnJlbnQtcGFzc3dvcmRcIikub24oJ2tleXVwJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTsgICAgXHJcbiAgICAgIFVzZXJzLmNvbmZpcm1QYXNzd29yZCgkdXNlcklkLnZhbCgpLCRjdXJyZW50UGFzc3dvcmQudmFsKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJGJ0blVwZGF0ZVVzZXIub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFVzZXJzLnVwZGF0ZVBhc3N3b3JkKCR1c2VySWQudmFsKCksJGN1cnJlbnRQYXNzd29yZC52YWwoKSwkbmV3UGFzc3dvcmQudmFsKCkpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2VjdGlvbkhhbmRsZXJzKCkge1xyXG4gICAgaWYgKCFyYW4pIHtcclxuICAgICAgU2VjdGlvbnMuaW5pdCgpXHJcbiAgICAgIFNlY3Rpb25zLmdldElwcygpO1xyXG4gICAgICByYW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLWFkZC1zZWN0aW9uXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFNlY3Rpb25zLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgICQoXCIjc2VsZWN0LXNlY3RvclwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VjdGlvbnMuZ2V0SXBzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gICQoZnVuY3Rpb24gKCkge1xyXG4gICAgaW5pdENvbXBvbmVudHMoKVxyXG4gIH0pOyIsInZhciByYW4gPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIGxvZ2luSGFuZGxlcnMoKSB7XHJcblxyXG4gICQoXCIjc2VuZC1jcmVkZW50aWFsc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIFNlc3Npb24ubG9naW4oKTtcclxuICB9KTtcclxuXHJcbiAgJChcIiN1c2VyLWlucHV0XCIpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBsb2dpbkxpYnJhcnkuc2VuZFRvTG9naW4oZSlcclxuICB9KVxyXG5cclxuICAkKFwiI3Bhc3N3b3JkLWlucHV0XCIpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBsb2dpbkxpYnJhcnkuc2VuZFRvTG9naW4oZSlcclxuICB9KVxyXG5cclxuICAkKFwiYVtocmVmXVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsb2dpbkxpYnJhcnkubG9hZGluZygpO1xyXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciB0YXJnZXQgPSAkdGhpcy5hdHRyKCd0YXJnZXQnKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtcclxuICAgICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIDMwMDApXHJcbiAgICB9Y2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxudmFyIFNlc3Npb24gPSB7XHJcbiAgbG9naW46IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHVzZXIgICAgID0gJChcIiN1c2VyLWlucHV0XCIpLnZhbCgpO1xyXG4gICAgdmFyIHBhc3N3b3JkID0gJChcIiNwYXNzd29yZC1pbnB1dFwiKS52YWwoKTtcclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW3VzZXIsIHBhc3N3b3JkXSlcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgdmFyIGZvcm0gPSAndXNlcj0nICsgdXNlciArICcmcGFzc3dvcmQ9JyArIHBhc3N3b3JkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgnYXBwL2xvZ2luJywgZmFsc2UsIGZhbHNlLCBTZXNzaW9uLnByb2Nlc3NMb2dpbkRhdGEsIGZvcm0sIG51bGwsIGxvZ2luTGlicmFyeS5sb2FkaW5nKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArIFwiIExMZW5lIHRvZG9zIGxvcyBjYW1wb3MgaW5kaWNhZG9zIHBhcmEgaW5ncmVzYXJcIilcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBwcm9jZXNzTG9naW5EYXRhOiBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgaWYgKHJlc3BvbnNlID09IHRydWUpIHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBCQVNFX1VSTCArICdhcHAvYWRtaW4vJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogXCJub25lXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfSU5GTyArIFwiIFVzdWFyaW8geSBDb250cmFzZcOxYSBubyB2YWxpZG9zXCIpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG52YXIgbG9naW5MaWJyYXJ5ID0ge1xyXG4gIGxvYWRpbmc6IGZ1bmN0aW9uKHN0b3ApIHtcclxuICAgIGlmKCFzdG9wKXtcclxuICAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogXCJibG9ja1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgXHJcbiAgc2VuZFRvTG9naW46IGZ1bmN0aW9uKGUpIHtcclxuICAgIGtleSA9IGUud2hpY2hcclxuICAgIGlmIChrZXkgPT0gMTMpIHtcclxuICAgICAgU2Vzc2lvbi5sb2dpbigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgbG9naW5IYW5kbGVycygpO1xyXG59KSIsIiAgZnVuY3Rpb24gaXNDdXJyZW50UGFnZShwYWdlTmFtZSl7XHJcbiAgICBpZihnZXRDdXJyZW50UGFnZSgpID09IHBhZ2VOYW1lKXtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gIFxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFBhZ2UoKXtcclxuICAgIHZhciBjdXJyZW50UGFnZSA9ICQoXCJ0aXRsZVwiKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xyXG4gICAgY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZVs0XS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICAgIHJldHVybiBjdXJyZW50UGFnZTtcclxuICB9XHJcblxyXG4gIGlmKGlzQ3VycmVudFBhZ2UoXCJjaWVycmVcIikgfHwgaXNDdXJyZW50UGFnZShcImNpZXJyZTJcIikpe1xyXG4gICAgY2llcnJlQ2FqYUZ1bmN0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgaWYoaXNDdXJyZW50UGFnZShcInJlcG9ydGVzXCIpKXtcclxuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gICAgc2NyaXB0LnNyYyA9IEJBU0VfVVJMICsgXCJhc3NldHMvanMvbWluL3JlcG9ydGVzLm1pbi5qcz92ZXJzaW9uPTQuMC4yMlwiO1xyXG4gICAgJChcImJvZHlcIikuYXBwZW5kKHNjcmlwdCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjaWVycmVDYWphRnVuY3Rpb25zKCl7XHJcbiAgICB2YXIgdG90YWxlcyA9IHtcclxuICAgICAgICAgIHRvdGFsMTogMCxcclxuICAgICAgICAgIHRvdGFsNTogMCxcclxuICAgICAgICAgIHRvdGFsMTA6IDAsXHJcbiAgICAgICAgICB0b3RhbDIwOiAwLFxyXG4gICAgICAgICAgdG90YWwyNTogMCxcclxuICAgICAgICAgIHRvdGFsNTA6IDAsXHJcbiAgICAgICAgICB0b3RhbDEwMDogMCxcclxuICAgICAgICAgIHRvdGFsMjAwOiAwLFxyXG4gICAgICAgICAgdG90YWw1MDA6IDAsXHJcbiAgICAgICAgICB0b3RhbDEwMDA6IDAsXHJcbiAgICAgICAgICB0b3RhbDIwMDA6IDBcclxuICAgICAgICB9XHJcblxyXG4gICAgdmFyIGdhc3RvICAgPSB7XHJcbiAgICAgICAgJ2ZlY2hhJzogJycsXHJcbiAgICAgICAgJ2Rlc2NyaXBjaW9uJzogJycsXHJcbiAgICAgICAgJ21vbnRvJzogJycsXHJcbiAgICAgIH1cclxuICAgIHZhciBnYXN0b3MgID0gW3tmZWNoYTogbm93KCksZGVzY3JpcGNpb246XCJob2xhXCIsbW9udG86IDIwMDAsIGlkX2dhc3RvOiAxfV1cclxuICAgIHZhciBhdXRvciAgID0gJCgnI2F1dG9yLWNpZXJyZScpLnRleHQoKS50cmltKClcclxuXHJcbiAgICB2YXIgYXBwQ2llcnJlID0gbmV3IFZ1ZSh7XHJcbiAgICAgIGVsOiAnI2FwcC1jaWVycmUnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgaXNIaWRlOiBmYWxzZSxcclxuICAgICAgICBmZWNoYTogbm93KCksXHJcbiAgICAgICAgZGF0YV9jaWVycmU6e1xyXG4gICAgICAgICAgYXV0b3I6IGF1dG9yLFxyXG4gICAgICAgICAgcGFnb3NfZmFjdHVyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19leHRyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19lZmVjdGl2bzogMCxcclxuICAgICAgICAgIHBhZ29zX2JhbmNvOiAwLFxyXG4gICAgICAgICAgdG90YWxfaW5ncmVzb3M6IDAsXHJcbiAgICAgICAgICBlZmVjdGl2b19jYWphOiAwLFxyXG4gICAgICAgICAgdG90YWxfZGVzY3VhZHJlOiAwLFxyXG4gICAgICAgICAgdG90YWxfZ2FzdG9zOiAwLFxyXG4gICAgICAgICAgYmFuY286IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRlbzp0b3RhbGVzLFxyXG4gICAgICAgIHN1bWE6IDAsXHJcbiAgICAgICAgZ2FzdG86IGdhc3RvLFxyXG4gICAgICAgIGdhc3RvczogZ2FzdG9zXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBtb3VudGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmdldEdhc3RvcygpO1xyXG4gICAgICAgIHRoaXMuc2V0SW5ncmVzb3MoKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLndpbGwtbG9hZCcpLmNzcyh7dmlzaWJpbGl0eTpcInZpc2libGVcIn0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgY3VycmVuY3lGb3JtYXQ6IGZ1bmN0aW9uKG51bWJlcil7XHJcbiAgICAgICAgICByZXR1cm4gQ3VycmVuY3lGb3JtYXQobnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBtZXRob2RzOntcclxuICAgICAgICBjaGFuZ2VUb3RhbDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICB2YXIgdW5pdCA9IGUuc3JjRWxlbWVudC5hdHRyaWJ1dGVzWydkYXRhLXVuaXQnXS52YWx1ZVxyXG4gICAgICAgICAgdmFyIGNhbnRpZGFkID0gZS5zcmNFbGVtZW50LnZhbHVlXHJcbiAgICAgICAgICB2YXIgdG90YWwgPSBjYW50aWRhZCAqIHVuaXRcclxuICAgICAgICAgIHRvdGFsZXNbJ3RvdGFsJysgdW5pdF0gPSBjYW50aWRhZCAqIHVuaXQgKiAxLjAwICAgIFxyXG4gICAgICAgIH0sIFxyXG5cclxuICAgICAgICBhZGRHYXN0bzogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgdmFyIGdhc3RvID0gdGhpcy5nYXN0bztcclxuICAgICAgICAgIGdhc3RvLmZlY2hhID0gbm93KCk7XHJcbiAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZ2FzdG8pO1xyXG4gICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdjYWphL2FkZF9nYXN0bycsZm9ybSlcclxuICAgICAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5maWxsR2FzdG9zKGRhdGEuZ2FzdG9zLFwibm9ybWFsXCIpXHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5zZXRHYXN0b1RvdGFsKGRhdGEudG90YWxfZ2FzdG9zKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpbGxHYXN0b3M6IGZ1bmN0aW9uKGdhc3Rvc19zZXJ2aWRvcixtb2RlKXtcclxuICAgICAgICAgIGlmKG1vZGUgPT0gXCJncm91cFwiKXtcclxuICAgICAgICAgICAgaWYoZ2FzdG9zX3NlcnZpZG9yICE9IG51bGwgfHwgZ2FzdG9zX3NlcnZpZG9yLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFtnYXN0b3Nfc2Vydmlkb3JdKTtcclxuICAgICAgICAgICAgICBhcHBDaWVycmUuZ2FzdG9zID0gZ2FzdG9zX3NlcnZpZG9yO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBhcHBDaWVycmUuZ2FzdG9zID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhcHBDaWVycmUuZ2FzdG9zLnB1c2goSlNPTi5wYXJzZShnYXN0b3Nfc2Vydmlkb3IpWzBdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRHYXN0b1RvdGFsOiBmdW5jdGlvbih0b3RhbEdhc3Rvcyl7XHJcbiAgICAgICAgICB0aGlzLmRhdGFfY2llcnJlLnRvdGFsX2dhc3RvcyA9IHRvdGFsR2FzdG9zXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0R2FzdG86IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgdmFyIGdhc3RvID0gdGhpcy5nYXN0bztcclxuICAgICAgICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShnYXN0byk7XHJcbiAgICAgICAgICBjb25uZWN0QW5kU2VuZCgnY2FqYS9nZXRfZ2FzdG8nLGZhbHNlLG51bGwsYXBwQ2llcnJlLmZpbGxHYXN0b3MsZm9ybSxudWxsLCBudWxsKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWxldGVHYXN0bzogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgIHZhciBjYWxsZXIgPSBlLnRhcmdldDtcclxuICAgICAgICAgIGlmKGNhbGxlci5sb2NhbG5hbWUgPT0gXCJpXCIpe1xyXG4gICAgICAgICAgICBjYWxsZXIgPSBjYWxsZXIucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBpZCA9IGNhbGxlci5hdHRyaWJ1dGVzWydkYXRhLWlkJ10udmFsdWVcclxuICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgICB0ZXh0OiBcIlNlZ3VybyBkZSBxdWUgcXVpZXJlIGVsaW1pbmFyIGVzdGUgZ2FzdG8/XCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoe2lkOiBpZCwgZmVjaGE6bm93KCl9KVxyXG4gICAgICAgICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAnY2FqYS9kZWxldGVfZ2FzdG8nLGZvcm0pXHJcbiAgICAgICAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhXHJcbiAgICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKVxyXG4gICAgICAgICAgICAgIGFwcENpZXJyZS5maWxsR2FzdG9zKGRhdGEuZ2FzdG9zLFwiZ3JvdXBcIilcclxuICAgICAgICAgICAgICBhcHBDaWVycmUuc2V0R2FzdG9Ub3RhbChkYXRhLnRvdGFsX2dhc3RvcykgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7ICAgICAgXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0R2FzdG9zOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIGRhdGEgPSB7ZmVjaGE6IG5vdygpfVxyXG4gICAgICAgICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoIEJBU0VfVVJMICsgJ2NhamEvZ2V0X2dhc3RvcycsZm9ybSlcclxuICAgICAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5maWxsR2FzdG9zKGRhdGEuZ2FzdG9zLFwiZ3JvdXBcIilcclxuICAgICAgICAgICAgYXBwQ2llcnJlLnNldEdhc3RvVG90YWwoZGF0YS50b3RhbF9nYXN0b3MpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRJbmdyZXNvczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciBmb3JtID0gJ2RhdGE9JyArIEpTT04uc3RyaW5naWZ5KHtmZWNoYTogbm93KCl9KVxyXG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLmRhdGFfY2llcnJlO1xyXG4gICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdjYWphL2dldF9pbmdyZXNvcycsZm9ybSlcclxuICAgICAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICBzZWxmLnBhZ29zX2ZhY3R1cmFzID0gZGF0YS5wYWdvc19mYWN0dXJhcztcclxuICAgICAgICAgICAgc2VsZi5wYWdvc19leHRyYXMgPSBkYXRhLnBhZ29zX2V4dHJhcztcclxuICAgICAgICAgICAgc2VsZi5wYWdvc19lZmVjdGl2byA9IGRhdGEucGFnb3NfZWZlY3Rpdm87XHJcbiAgICAgICAgICAgIHNlbGYucGFnb3NfYmFuY28gPSBkYXRhLnBhZ29zX2JhbmNvO1xyXG4gICAgICAgICAgICBzZWxmLnRvdGFsX2luZ3Jlc29zID0gcGFyc2VGbG9hdChkYXRhLnBhZ29zX2ZhY3R1cmFzKSArIHBhcnNlRmxvYXQoc2VsZi5wYWdvc19leHRyYXMpO1xyXG4gICAgICAgICAgICBzZWxmLnRvdGFsX2Rlc2N1YWRyZSA9IC0gc2VsZi5wYWdvc19lZmVjdGl2byArIHNlbGYuZWZlY3Rpdm9fY2FqYTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNlcnJhckNhamE6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgc2VsZiAgID0gdGhpcztcclxuICAgICAgICAgIHZhciBjaWVycmUgPSB0aGlzLmRhdGFfY2llcnJlO1xyXG4gICAgICAgICAgd2luZG93LmNpZXJyZSA9IGNpZXJyZTtcclxuICAgICAgICAgIGlmKGNpZXJyZS50b3RhbF9kZXNjdWFkcmUgIT0gMCl7XHJcbiAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICAgICAgdGV4dDogXCJIYXkgdW4gZGVzY3VhZHJlIGVuIGxhIGNhamEsIHF1aWVyZSBoYWNlciBlbCBjaWVycmUgZGUgdG9kb3MgbW9kb3M/XCIsXHJcbiAgICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdTaScsXHJcbiAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ05vJ1xyXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgc2VsZi5jZXJyYXIoY2llcnJlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNlbGYuY2VycmFyKGNpZXJyZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2VycmFyOiBmdW5jdGlvbihjaWVycmUpe1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBjaWVycmUuZmVjaGEgPSBub3coKTtcclxuICAgICAgICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShjaWVycmUpO1xyXG4gICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdjYWphL2FkZF9jaWVycmUnLGZvcm0pXHJcbiAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKVxyXG4gICAgICAgICAgICBzZWxmLmlzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGFwcFN1bW1hcnlWaWV3LmlzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhcHBTdW1tYXJ5Vmlldy5jaWVycmUgPSBjaWVycmU7XHJcbiAgICAgICAgICAgICQoXCIjYXBwLWNpZXJyZVwiKS5hZGRDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICAgICAkKFwiLnRvcC1uYXZcIikuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgJChcIiNwcmludC12aWV3XCIpLmNzcyh7dmlzaWJpbGl0eTogXCJ2aXNpYmxlXCJ9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBjb21wdXRlZDp7XHJcbiAgICAgICAgZ2V0VG90YWw6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgdmFyIHQgPSB0b3RhbGVzO1xyXG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLmRhdGFfY2llcnJlO1xyXG4gICAgICAgICAgdmFyIHN1bWEgPSBzdW1hcihbdC50b3RhbDEsdC50b3RhbDUsdC50b3RhbDEwLCB0LnRvdGFsMjAsIHQudG90YWwyNSwgdC50b3RhbDUwLCB0LnRvdGFsMTAwLCB0LnRvdGFsMjAwLCB0LnRvdGFsNTAwLCB0LnRvdGFsMTAwMCwgdC50b3RhbDIwMDBdKTtcclxuICAgICAgICAgIHRoaXMuc3VtYSA9IHN1bWE7XHJcbiAgICAgICAgICBzZWxmLmVmZWN0aXZvX2NhamEgPSBzdW1hLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICBzZWxmLnRvdGFsX2Rlc2N1YWRyZSA9IHBhcnNlRmxvYXQoLXNlbGYucGFnb3NfZWZlY3Rpdm8pICsgcGFyc2VGbG9hdChzZWxmLmVmZWN0aXZvX2NhamEpO1xyXG4gICAgICAgICAgc2VsZi5iYW5jbyA9IHBhcnNlRmxvYXQoc2VsZi5wYWdvc19iYW5jbykgKyBwYXJzZUZsb2F0KHNlbGYucGFnb3NfZWZlY3Rpdm8pIC0gcGFyc2VGbG9hdChzZWxmLnRvdGFsX2dhc3RvcykgKyBwYXJzZUZsb2F0KHNlbGYudG90YWxfZGVzY3VhZHJlKVxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3VtYTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWNpbWFsczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciBmaWVsZHMgPSBbXCJwYWdvc19mYWN0dXJhc1wiLFwicGFnb3NfZXh0cmFcIixcInBhZ29zX2VmZWN0aXZvXCIsXCJwYWdvc19iYW5jb1wiLFwidG90YWxfaW5ncmVzb3NcIixcImVmZWN0aXZvX2NhamFcIixcInRvdGFsX2Rlc2N1YWRyZVwiLFwidG90YWxfZ2FzdG9cIixcImJhbmNvXCJdO1xyXG4gICAgICAgICAgZmllbGRzLmZvckVhY2goZnVuY3Rpb24oZmllbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhX2NpZXJyZVtmaWVsZF0gPSB0aGlzLmRhdGFfY2llcnJlW2ZpZWxkXS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgd2luZG93LmFwcENpZXJyZSA9IGFwcENpZXJyZTtcclxuICAgIGZ1bmN0aW9uIHN1bWFyICh2YWxvcmVzKXtcclxuICAgICAgdmFyIHN1bWEgPSAwO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbG9yZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzdW1hICs9IHBhcnNlRmxvYXQodmFsb3Jlc1tpXSk7IFxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdW1hO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5vdygpe1xyXG4gICAgICByZXR1cm4gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgVnVlLmNvbXBvbmVudCgnc3VtbWFyeS1wcmludC12aWV3Jyx7XHJcbiAgICB0ZW1wbGF0ZTogJ1xcXHJcbiAgICA8ZGl2IGNsYXNzPVwicHJpbnQtY29udGFpbmVyXCI+XFxcclxuICAgICAgPGRpdiBjbGFzcz1cIl9faGVhZGVyXCI+XFxcclxuICAgICAgPGgyIGNsYXNzPVwiX190aXRsZSB0LWNlbnRlclwiPiB7e3RpdGxlfX08L2gyPlxcXHJcbiAgICAgIDwvZGl2PlxcXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJfX2JvZHlcIj5cXFxyXG4gICAgICA8cHJpbnRlYWJsZT48L3ByaW50ZWFibGU+XFxcclxuICAgICAgPC9kaXY+XFxcclxuICAgIDxkaXY+XFxcclxuICAgIFxcXHJcbiAgICAnLFxyXG4gICAgcHJvcHM6Wydzb21ldmFsdWUnXSxcclxuICAgIG1ldGhvZHM6e1xyXG4gICAgICBnb0JhY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYXBwU3VtbWFyeVZpZXcuaXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICB3aW5kb3cuYXBwQ2llcnJlLmlzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuaXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICAkKFwiLnRvcC1uYXZcIikucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAkKFwiI2FwcC1jaWVycmVcIikucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhdGE6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYmFjazoge2xpbms6XCJzb21lbGlua1wiLHRleHQ6XCJ2b2x2ZXIgYSBjaWVycmVcIn0sXHJcbiAgICAgICAgZm93YXJkOiB7bGluazogQkFTRV9VUkwgKyBcImFwcC9sb2dvdXRcIix0ZXh0OlwiY2VycmFyIHNlc3Npb25cIn0sXHJcbiAgICAgICAgdGl0bGU6XCJSZXN1bWVuIGRlIGNpZXJyZSBkZSBob3lcIixcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICB2YXIgYXBwU3VtbWFyeVZpZXcgPSBuZXcgVnVlKHtcclxuICAgIGVsOiBcIiNwcmludC12aWV3XCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGlzSGlkZTogdHJ1ZSxcclxuICAgICAgYmFjazoge2xpbms6XCJzb21lbGlua1wiLHRleHQ6XCJ2b2x2ZXIgYSBjaWVycmVcIn0sXHJcbiAgICAgIGZvd2FyZDoge2xpbms6IEJBU0VfVVJMICsgXCJhcHAvbG9nb3V0XCIsdGV4dDpcImNlcnJhciBzZXNzaW9uXCJ9LFxyXG4gICAgICBjaWVycmU6e1xyXG4gICAgICAgICAgYXV0b3I6ICcnLFxyXG4gICAgICAgICAgcGFnb3NfZmFjdHVyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19leHRyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19lZmVjdGl2bzogMCxcclxuICAgICAgICAgIHBhZ29zX2JhbmNvOiAwLFxyXG4gICAgICAgICAgdG90YWxfaW5ncmVzb3M6IDAsXHJcbiAgICAgICAgICBlZmVjdGl2b19jYWphOiAwLFxyXG4gICAgICAgICAgdG90YWxfZGVzY3VhZHJlOiAwLFxyXG4gICAgICAgICAgdG90YWxfZ2FzdG9zOiAwLFxyXG4gICAgICAgICAgYmFuY286IDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZmlsdGVyczoge1xyXG4gICAgICBjdXJyZW5jeUZvcm1hdDogZnVuY3Rpb24obnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gXCJSRCQgXCIrIEN1cnJlbmN5Rm9ybWF0KG51bWJlcik7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBzcGFuaXNoRGF0ZUZvcm1hdDogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgbW9tZW50LmxvY2FsZSgnZXMtRE8nKTtcclxuICAgICAgICByZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdCgnZGRkZCBERCBbZGVdIE1NTU0gW2RlbF0gWVlZWScpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOntcclxuICAgICAgZ29CYWNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGFwcFN1bW1hcnlWaWV3LmlzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgd2luZG93LmFwcENpZXJyZS5pc0hpZGUgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLmlzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgJChcIi50b3AtbmF2XCIpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgJChcIiNhcHAtY2llcnJlXCIpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHByaW50OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHByaW50KClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pIiwidmFyIGxpc3RFeHRyYXMgPSAnJztcclxudmFyIHJlY2lib1Jlc2V0ID0ge1xyXG4gIGlkX3BhZ286IDAsXHJcbiAgaWRfY29udHJhdG86IDAsXHJcbiAgaWRfc2VydmljaW86IDAsXHJcbiAgaWRfZW1wbGVhZG86IDAsXHJcbiAgZmVjaGFfcGFnbyA6ICcnLFxyXG4gIGNvbmNlcHRvIDogJ2V4dHJhJyxcclxuICBkZXRhbGxlc19leHRyYSA6ICcnLFxyXG4gIGN1b3RhOiAnJyxcclxuICBtb3JhIDogJycsXHJcbiAgbW9udG9fZXh0cmE6ICcnLFxyXG4gIHRvdGFsOiAnJyxcclxuICBlc3RhZG86ICcnLFxyXG4gIGZlY2hhX2xpbWl0ZTogJycsXHJcbiAgY29tcGxldGVfZGF0ZSA6ICcnLFxyXG4gIGRlc2N1ZW50bzogJycsXHJcbiAgcmF6b25fZGVzY3VlbnRvOiAnJyxcclxuICBkZXVkYTogJycsXHJcbiAgYWJvbm9fYTogJycsXHJcbiAgdGlwbzogJycsXHJcbiAgZ2VuZXJhZG86ICcnXHJcbn1cclxuXHJcbnZhciBhcHBQYWdvRXh0cmEgPSBuZXcgVnVlKHtcclxuICBlbDogXCIjYXBwLXBhZ28tZXh0cmFcIixcclxuICBkYXRhOiB7XHJcbiAgICByZWNpYm86e1xyXG4gICAgICAgaWRfcGFnbzogMCxcclxuICAgICAgIGlkX2NvbnRyYXRvOiAwLFxyXG4gICAgICAgaWRfc2VydmljaW86IDAsXHJcbiAgICAgICBpZF9lbXBsZWFkbzogMCxcclxuICAgICAgIGZlY2hhX3BhZ28gOiAnZGQvbW0veXl5eScsXHJcbiAgICAgICBjb25jZXB0byA6ICdleHRyYScsXHJcbiAgICAgICBkZXRhbGxlc19leHRyYSA6ICcnLFxyXG4gICAgICAgY3VvdGE6ICcnLFxyXG4gICAgICAgbW9yYSA6ICcnLFxyXG4gICAgICAgbW9udG9fZXh0cmE6ICcnLFxyXG4gICAgICAgdG90YWw6ICcnLFxyXG4gICAgICAgZXN0YWRvOiAnJyxcclxuICAgICAgIGZlY2hhX2xpbWl0ZTogJycsXHJcbiAgICAgICBjb21wbGV0ZV9kYXRlIDogJycsXHJcbiAgICAgICBkZXNjdWVudG86ICcnLFxyXG4gICAgICAgcmF6b25fZGVzY3VlbnRvOiAnJyxcclxuICAgICAgIGRldWRhOiAnJyxcclxuICAgICAgIGFib25vX2E6ICcnLFxyXG4gICAgICAgdGlwbzogJycsXHJcbiAgICAgICBnZW5lcmFkbzogJydcclxuICAgIH0sXHJcblxyXG4gICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICBleHRyYTp7XHJcbiAgICAgIFwiY29udHJvbHNcIjogJycsXHJcbiAgICAgIFwiaWRfZXh0cmFcIjogJycsXHJcbiAgICAgIFwiaWRfc2VydmljaW9cIjogJycsXHJcbiAgICAgIFwiY2hlY2tib3hcIjogJycsXHJcbiAgICAgIFwiZmVjaGFcIjogJycsXHJcbiAgICAgIFwiY29uY2VwdG9cIjogJycsXHJcbiAgICAgIFwidWx0aW1vX3BhZ29cIjogJycsXHJcbiAgICAgIFwibW9udG9fcGFnYWRvXCI6ICcnLFxyXG4gICAgICBcIm1vbnRvX3RvdGFsXCI6ICcnLFxyXG4gICAgICBcImVzdGFkb1wiOiAnJ1xyXG4gICAgfSxcclxuICAgIGZpcnN0Q29udHJvbHM6IHtcclxuICAgICAgaGlkZTogZmFsc2VcclxuICAgIH0sXHJcbiAgfSxcclxuICBmaWx0ZXJzOiB7XHJcblxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIHVybF9yZWNpYm86IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIEJBU0VfVVJMICsgJ3Byb2Nlc3MvZ2V0cmVjaWJvLycgKyB0aGlzLnJlY2liby5pZF9wYWdvO1xyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlX3JlY2libzogZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZih0aGlzLnJlY2liby5lc3RhZG8gPT0gXCJwYWdhZG9cIil7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgIHJldHVybiB0aGlzLmhpZGVfcmVjaWJvID0gdHJ1ZTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbWV0aG9kczp7XHJcblxyXG4gICAgZ29CYWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGV4dHJhVGFibGUuZWwucGFyZW50cyhcIi5ib290c3RyYXAtdGFibGVcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICB0aGlzLnZpc2libGUgPSBmYWxzZVxyXG4gICAgICB0aGlzLmV4dHJhID0ge2NvbmNlcHRvOiAnJ31cclxuICAgICAgZXh0cmFUYWJsZS5yZWZyZXNoKGxpc3RFeHRyYXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZVBheW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGZvcm0gPSAnZGF0YT0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5leHRyYSk7XHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnZXh0cmEvZ2VuZXJhdGVfZXh0cmFfcGF5bWVudCcsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgICBzZWxlY3RFeHRyYVBheW1lbnQuaHRtbChkYXRhLnBhZ29zKS5jaGFuZ2UoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICBcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UGF5bWVudDogZnVuY3Rpb24gKGlkX3BhZ28pIHtcclxuICAgICAgdmFyIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeSh7aWRfcGFnbzogaWRfcGFnb30pO1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdleHRyYS9nZXRfcGF5bWVudCcsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEgXHJcbiAgICAgICAgaWYoZGF0YS5yZWNpYm8pe1xyXG4gICAgICAgICAgc2VsZi5yZWNpYm8gPSBkYXRhLnJlY2lib1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXBwbHlQYXltZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICB2YXIgcmVjaWJvID0gdGhpcy5yZWNpYm9cclxuICAgICAgdmFyIGluZm8gPSB7XHJcbiAgICAgICAgaWRfZXh0cmE6IHJlY2liby5pZF9leHRyYSxcclxuICAgICAgICBpZF9wYWdvOiByZWNpYm8uaWRfcGFnb1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICBjb25jZXB0bzogJ2V4dHJhIC0nLCBcclxuICAgICAgICBkZXRhbGxlc19leHRyYTogcmVjaWJvLmRldGFsbGVzX2V4dHJhLFxyXG4gICAgICAgIGZlY2hhX3BhZ286IHJlY2liby5mZWNoYV9wYWdvLFxyXG4gICAgICAgIGN1b3RhOiByZWNpYm8uY3VvdGEsXHJcbiAgICAgICAgdG90YWw6IHJlY2liby5jdW90YSxcclxuICAgICAgICBlc3RhZG86ICdwYWdhZG8nLFxyXG4gICAgICAgIHRpcG86IHJlY2liby50aXBvLFxyXG4gICAgICAgIGdlbmVyYWRvOiB0cnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZGF0YSkgKyAnJmluZm89JysgSlNPTi5zdHJpbmdpZnkoaW5mbylcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2V4dHJhL2FwcGx5X3BheW1lbnQnLGZvcm0pXHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgIGxpc3RFeHRyYXMgPSBkYXRhLmV4dHJhcztcclxuICAgICAgICBzZWxmLmdldFBheW1lbnRzKHNlbGYuZXh0cmEuaWRfZXh0cmEpO1xyXG4gICAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGdldFBheW1lbnRzOiBmdW5jdGlvbiAoaWRfZXh0cmEpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICB2YXIgZm9ybSA9IFwiZGF0YT1cIisgSlNPTi5zdHJpbmdpZnkoe2lkX2V4dHJhOiBpZF9leHRyYX0pXHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdleHRyYS9nZXRfZXh0cmFfcGF5bWVudF9vZicsIGZvcm0pXHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgICAgaWYoIWRhdGEucGFnb3Mpe1xyXG4gICAgICAgICAgc2VsZi5yZWNpYm8gPSByZWNpYm9SZXNldFxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxlY3RFeHRyYVBheW1lbnQuaHRtbChkYXRhLnBhZ29zKS5jaGFuZ2UoKVxyXG5cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlUGF5bWVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgIHZhciByZWNpYm8gPSB0aGlzLnJlY2lib1xyXG4gICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAnaWRfZXh0cmEnOiByZWNpYm8uaWRfZXh0cmEsXHJcbiAgICAgICAgJ2lkX3BhZ28nOiByZWNpYm8uaWRfcGFnb1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdleHRyYS9kZWxldGVfcGF5bWVudCcsZm9ybSlcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgICBzZWxmLmdldFBheW1lbnRzKHNlbGYuZXh0cmEuaWRfZXh0cmEpO1xyXG4gICAgICB9KVxyXG4gICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuYnVzLiRvbigncm93LXNlbGVjdGVkJyxmdW5jdGlvbiAocm93KSB7XHJcbiAgZXh0cmFUYWJsZS5lbC5wYXJlbnRzKFwiLmJvb3RzdHJhcC10YWJsZVwiKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgYXBwUGFnb0V4dHJhLnZpc2libGUgPSB0cnVlXHJcbiAgYXBwUGFnb0V4dHJhLmV4dHJhID0gcm93XHJcbiAgbGlzdEV4dHJhcyA9IGV4dHJhVGFibGUuZWwuZmluZCgndGJvZHknKS5odG1sKCk7XHJcbiAgYXBwUGFnb0V4dHJhLmdldFBheW1lbnRzKHJvdy5pZF9leHRyYSk7XHJcbn0pXHJcblxyXG52YXIgc2VsZWN0RXh0cmFQYXltZW50ID0gJChcIiNzZWxlY3QtZXh0cmEtcGF5bWVudFwiKTtcclxuc2VsZWN0RXh0cmFQYXltZW50Lm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGlkX3BhZ28gPSBzZWxlY3RFeHRyYVBheW1lbnQudmFsKClcclxuICBhcHBQYWdvRXh0cmEuZ2V0UGF5bWVudChpZF9wYWdvKVxyXG59KSIsIi8qISBBZG1pbkxURSBhcHAuanNcbiogPT09PT09PT09PT09PT09PVxuKiBNYWluIEpTIGFwcGxpY2F0aW9uIGZpbGUgZm9yIEFkbWluTFRFIHYyLiBUaGlzIGZpbGVcbiogc2hvdWxkIGJlIGluY2x1ZGVkIGluIGFsbCBwYWdlcy4gSXQgY29udHJvbHMgc29tZSBsYXlvdXRcbiogb3B0aW9ucyBhbmQgaW1wbGVtZW50cyBleGNsdXNpdmUgQWRtaW5MVEUgcGx1Z2lucy5cbipcbiogQEF1dGhvciAgQWxtc2FlZWQgU3R1ZGlvXG4qIEBTdXBwb3J0IDxodHRwczovL3d3dy5hbG1zYWVlZHN0dWRpby5jb20+XG4qIEBFbWFpbCAgIDxhYmR1bGxhaEBhbG1zYWVlZHN0dWRpby5jb20+XG4qIEB2ZXJzaW9uIDIuNC4wXG4qIEByZXBvc2l0b3J5IGdpdDovL2dpdGh1Yi5jb20vYWxtYXNhZWVkMjAxMC9BZG1pbkxURS5naXRcbiogQGxpY2Vuc2UgTUlUIDxodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUPlxuKi9cbmlmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBqUXVlcnkpdGhyb3cgbmV3IEVycm9yKFwiQWRtaW5MVEUgcmVxdWlyZXMgalF1ZXJ5XCIpOytmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZT1hKHRoaXMpLGY9ZS5kYXRhKGMpO2lmKCFmKXt2YXIgaD1hLmV4dGVuZCh7fSxkLGUuZGF0YSgpLFwib2JqZWN0XCI9PXR5cGVvZiBiJiZiKTtlLmRhdGEoYyxmPW5ldyBnKGgpKX1pZihcInN0cmluZ1wiPT10eXBlb2YgYil7aWYodm9pZCAwPT09ZltiXSl0aHJvdyBuZXcgRXJyb3IoXCJObyBtZXRob2QgbmFtZWQgXCIrYik7ZltiXSgpfX0pfXZhciBjPVwibHRlLmxheW91dFwiLGQ9e3NsaW1zY3JvbGw6ITAscmVzZXRIZWlnaHQ6ITB9LGU9e3dyYXBwZXI6XCIud3JhcHBlclwiLGNvbnRlbnRXcmFwcGVyOlwiLmNvbnRlbnQtd3JhcHBlclwiLGxheW91dEJveGVkOlwiLmxheW91dC1ib3hlZFwiLG1haW5Gb290ZXI6XCIubWFpbi1mb290ZXJcIixtYWluSGVhZGVyOlwiLm1haW4taGVhZGVyXCIsc2lkZWJhcjpcIi5zaWRlYmFyXCIsY29udHJvbFNpZGViYXI6XCIuY29udHJvbC1zaWRlYmFyXCIsZml4ZWQ6XCIuZml4ZWRcIixzaWRlYmFyTWVudTpcIi5zaWRlYmFyLW1lbnVcIixsb2dvOlwiLm1haW4taGVhZGVyIC5sb2dvXCJ9LGY9e2ZpeGVkOlwiZml4ZWRcIixob2xkVHJhbnNpdGlvbjpcImhvbGQtdHJhbnNpdGlvblwifSxnPWZ1bmN0aW9uKGEpe3RoaXMub3B0aW9ucz1hLHRoaXMuYmluZGVkUmVzaXplPSExLHRoaXMuYWN0aXZhdGUoKX07Zy5wcm90b3R5cGUuYWN0aXZhdGU9ZnVuY3Rpb24oKXt0aGlzLmZpeCgpLHRoaXMuZml4U2lkZWJhcigpLGEoXCJib2R5XCIpLnJlbW92ZUNsYXNzKGYuaG9sZFRyYW5zaXRpb24pLHRoaXMub3B0aW9ucy5yZXNldEhlaWdodCYmYShcImJvZHksIGh0bWwsIFwiK2Uud3JhcHBlcikuY3NzKHtoZWlnaHQ6XCJhdXRvXCIsXCJtaW4taGVpZ2h0XCI6XCIxMDAlXCJ9KSx0aGlzLmJpbmRlZFJlc2l6ZXx8KGEod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXt0aGlzLmZpeCgpLHRoaXMuZml4U2lkZWJhcigpLGEoZS5sb2dvK1wiLCBcIitlLnNpZGViYXIpLm9uZShcIndlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmRcIixmdW5jdGlvbigpe3RoaXMuZml4KCksdGhpcy5maXhTaWRlYmFyKCl9LmJpbmQodGhpcykpfS5iaW5kKHRoaXMpKSx0aGlzLmJpbmRlZFJlc2l6ZT0hMCksYShlLnNpZGViYXJNZW51KS5vbihcImV4cGFuZGVkLnRyZWVcIixmdW5jdGlvbigpe3RoaXMuZml4KCksdGhpcy5maXhTaWRlYmFyKCl9LmJpbmQodGhpcykpLGEoZS5zaWRlYmFyTWVudSkub24oXCJjb2xsYXBzZWQudHJlZVwiLGZ1bmN0aW9uKCl7dGhpcy5maXgoKSx0aGlzLmZpeFNpZGViYXIoKX0uYmluZCh0aGlzKSl9LGcucHJvdG90eXBlLmZpeD1mdW5jdGlvbigpe2EoZS5sYXlvdXRCb3hlZCtcIiA+IFwiK2Uud3JhcHBlcikuY3NzKFwib3ZlcmZsb3dcIixcImhpZGRlblwiKTt2YXIgYj1hKGUubWFpbkZvb3Rlcikub3V0ZXJIZWlnaHQoKXx8MCxjPWEoZS5tYWluSGVhZGVyKS5vdXRlckhlaWdodCgpK2IsZD1hKHdpbmRvdykuaGVpZ2h0KCksZz1hKGUuc2lkZWJhcikuaGVpZ2h0KCl8fDA7aWYoYShcImJvZHlcIikuaGFzQ2xhc3MoZi5maXhlZCkpYShlLmNvbnRlbnRXcmFwcGVyKS5jc3MoXCJtaW4taGVpZ2h0XCIsZC1iKTtlbHNle3ZhciBoO2Q+PWc/KGEoZS5jb250ZW50V3JhcHBlcikuY3NzKFwibWluLWhlaWdodFwiLGQtYyksaD1kLWMpOihhKGUuY29udGVudFdyYXBwZXIpLmNzcyhcIm1pbi1oZWlnaHRcIixnKSxoPWcpO3ZhciBpPWEoZS5jb250cm9sU2lkZWJhcik7dm9pZCAwIT09aSYmaS5oZWlnaHQoKT5oJiZhKGUuY29udGVudFdyYXBwZXIpLmNzcyhcIm1pbi1oZWlnaHRcIixpLmhlaWdodCgpKX19LGcucHJvdG90eXBlLmZpeFNpZGViYXI9ZnVuY3Rpb24oKXtpZighYShcImJvZHlcIikuaGFzQ2xhc3MoZi5maXhlZCkpcmV0dXJuIHZvaWQodm9pZCAwIT09YS5mbi5zbGltU2Nyb2xsJiZhKGUuc2lkZWJhcikuc2xpbVNjcm9sbCh7ZGVzdHJveTohMH0pLmhlaWdodChcImF1dG9cIikpO3RoaXMub3B0aW9ucy5zbGltc2Nyb2xsJiZ2b2lkIDAhPT1hLmZuLnNsaW1TY3JvbGwmJihhKGUuc2lkZWJhcikuc2xpbVNjcm9sbCh7ZGVzdHJveTohMH0pLmhlaWdodChcImF1dG9cIiksYShlLnNpZGViYXIpLnNsaW1TY3JvbGwoe2hlaWdodDphKHdpbmRvdykuaGVpZ2h0KCktYShlLm1haW5IZWFkZXIpLmhlaWdodCgpK1wicHhcIixjb2xvcjpcInJnYmEoMCwwLDAsMC4yKVwiLHNpemU6XCIzcHhcIn0pKX07dmFyIGg9YS5mbi5sYXlvdXQ7YS5mbi5sYXlvdXQ9YixhLmZuLmxheW91dC5Db25zdHVjdG9yPWcsYS5mbi5sYXlvdXQubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLmxheW91dD1oLHRoaXN9LGEod2luZG93KS5vbihcImxvYWRcIixmdW5jdGlvbigpe2IuY2FsbChhKFwiYm9keVwiKSl9KX0oalF1ZXJ5KSxmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZT1hKHRoaXMpLGY9ZS5kYXRhKGMpO2lmKCFmKXt2YXIgZz1hLmV4dGVuZCh7fSxkLGUuZGF0YSgpLFwib2JqZWN0XCI9PXR5cGVvZiBiJiZiKTtlLmRhdGEoYyxmPW5ldyBoKGcpKX1cInRvZ2dsZVwiPT1iJiZmLnRvZ2dsZSgpfSl9dmFyIGM9XCJsdGUucHVzaG1lbnVcIixkPXtjb2xsYXBzZVNjcmVlblNpemU6NzY3LGV4cGFuZE9uSG92ZXI6ITEsZXhwYW5kVHJhbnNpdGlvbkRlbGF5OjIwMH0sZT17Y29sbGFwc2VkOlwiLnNpZGViYXItY29sbGFwc2VcIixvcGVuOlwiLnNpZGViYXItb3BlblwiLG1haW5TaWRlYmFyOlwiLm1haW4tc2lkZWJhclwiLGNvbnRlbnRXcmFwcGVyOlwiLmNvbnRlbnQtd3JhcHBlclwiLHNlYXJjaElucHV0OlwiLnNpZGViYXItZm9ybSAuZm9ybS1jb250cm9sXCIsYnV0dG9uOidbZGF0YS10b2dnbGU9XCJwdXNoLW1lbnVcIl0nLG1pbmk6XCIuc2lkZWJhci1taW5pXCIsZXhwYW5kZWQ6XCIuc2lkZWJhci1leHBhbmRlZC1vbi1ob3ZlclwiLGxheW91dEZpeGVkOlwiLmZpeGVkXCJ9LGY9e2NvbGxhcHNlZDpcInNpZGViYXItY29sbGFwc2VcIixvcGVuOlwic2lkZWJhci1vcGVuXCIsbWluaTpcInNpZGViYXItbWluaVwiLGV4cGFuZGVkOlwic2lkZWJhci1leHBhbmRlZC1vbi1ob3ZlclwiLGV4cGFuZEZlYXR1cmU6XCJzaWRlYmFyLW1pbmktZXhwYW5kLWZlYXR1cmVcIixsYXlvdXRGaXhlZDpcImZpeGVkXCJ9LGc9e2V4cGFuZGVkOlwiZXhwYW5kZWQucHVzaE1lbnVcIixjb2xsYXBzZWQ6XCJjb2xsYXBzZWQucHVzaE1lbnVcIn0saD1mdW5jdGlvbihhKXt0aGlzLm9wdGlvbnM9YSx0aGlzLmluaXQoKX07aC5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpeyh0aGlzLm9wdGlvbnMuZXhwYW5kT25Ib3Zlcnx8YShcImJvZHlcIikuaXMoZS5taW5pK2UubGF5b3V0Rml4ZWQpKSYmKHRoaXMuZXhwYW5kT25Ib3ZlcigpLGEoXCJib2R5XCIpLmFkZENsYXNzKGYuZXhwYW5kRmVhdHVyZSkpLGEoZS5jb250ZW50V3JhcHBlcikuY2xpY2soZnVuY3Rpb24oKXthKHdpbmRvdykud2lkdGgoKTw9dGhpcy5vcHRpb25zLmNvbGxhcHNlU2NyZWVuU2l6ZSYmYShcImJvZHlcIikuaGFzQ2xhc3MoZi5vcGVuKSYmdGhpcy5jbG9zZSgpfS5iaW5kKHRoaXMpKSxhKGUuc2VhcmNoSW5wdXQpLmNsaWNrKGZ1bmN0aW9uKGEpe2Euc3RvcFByb3BhZ2F0aW9uKCl9KX0saC5wcm90b3R5cGUudG9nZ2xlPWZ1bmN0aW9uKCl7dmFyIGI9YSh3aW5kb3cpLndpZHRoKCksYz0hYShcImJvZHlcIikuaGFzQ2xhc3MoZi5jb2xsYXBzZWQpO2I8PXRoaXMub3B0aW9ucy5jb2xsYXBzZVNjcmVlblNpemUmJihjPWEoXCJib2R5XCIpLmhhc0NsYXNzKGYub3BlbikpLGM/dGhpcy5jbG9zZSgpOnRoaXMub3BlbigpfSxoLnByb3RvdHlwZS5vcGVuPWZ1bmN0aW9uKCl7YSh3aW5kb3cpLndpZHRoKCk+dGhpcy5vcHRpb25zLmNvbGxhcHNlU2NyZWVuU2l6ZT9hKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhmLmNvbGxhcHNlZCkudHJpZ2dlcihhLkV2ZW50KGcuZXhwYW5kZWQpKTphKFwiYm9keVwiKS5hZGRDbGFzcyhmLm9wZW4pLnRyaWdnZXIoYS5FdmVudChnLmV4cGFuZGVkKSl9LGgucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKCl7YSh3aW5kb3cpLndpZHRoKCk+dGhpcy5vcHRpb25zLmNvbGxhcHNlU2NyZWVuU2l6ZT9hKFwiYm9keVwiKS5hZGRDbGFzcyhmLmNvbGxhcHNlZCkudHJpZ2dlcihhLkV2ZW50KGcuY29sbGFwc2VkKSk6YShcImJvZHlcIikucmVtb3ZlQ2xhc3MoZi5vcGVuK1wiIFwiK2YuY29sbGFwc2VkKS50cmlnZ2VyKGEuRXZlbnQoZy5jb2xsYXBzZWQpKX0saC5wcm90b3R5cGUuZXhwYW5kT25Ib3Zlcj1mdW5jdGlvbigpe2EoZS5tYWluU2lkZWJhcikuaG92ZXIoZnVuY3Rpb24oKXthKFwiYm9keVwiKS5pcyhlLm1pbmkrZS5jb2xsYXBzZWQpJiZhKHdpbmRvdykud2lkdGgoKT50aGlzLm9wdGlvbnMuY29sbGFwc2VTY3JlZW5TaXplJiZ0aGlzLmV4cGFuZCgpfS5iaW5kKHRoaXMpLGZ1bmN0aW9uKCl7YShcImJvZHlcIikuaXMoZS5leHBhbmRlZCkmJnRoaXMuY29sbGFwc2UoKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLmV4cGFuZD1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXthKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhmLmNvbGxhcHNlZCkuYWRkQ2xhc3MoZi5leHBhbmRlZCl9LHRoaXMub3B0aW9ucy5leHBhbmRUcmFuc2l0aW9uRGVsYXkpfSxoLnByb3RvdHlwZS5jb2xsYXBzZT1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXthKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhmLmV4cGFuZGVkKS5hZGRDbGFzcyhmLmNvbGxhcHNlZCl9LHRoaXMub3B0aW9ucy5leHBhbmRUcmFuc2l0aW9uRGVsYXkpfTt2YXIgaT1hLmZuLnB1c2hNZW51O2EuZm4ucHVzaE1lbnU9YixhLmZuLnB1c2hNZW51LkNvbnN0cnVjdG9yPWgsYS5mbi5wdXNoTWVudS5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4ucHVzaE1lbnU9aSx0aGlzfSxhKGRvY3VtZW50KS5vbihcImNsaWNrXCIsZS5idXR0b24sZnVuY3Rpb24oYyl7Yy5wcmV2ZW50RGVmYXVsdCgpLGIuY2FsbChhKHRoaXMpLFwidG9nZ2xlXCIpfSksYSh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7Yi5jYWxsKGEoZS5idXR0b24pKX0pfShqUXVlcnkpLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyk7aWYoIWUuZGF0YShjKSl7dmFyIGY9YS5leHRlbmQoe30sZCxlLmRhdGEoKSxcIm9iamVjdFwiPT10eXBlb2YgYiYmYik7ZS5kYXRhKGMsbmV3IGgoZSxmKSl9fSl9dmFyIGM9XCJsdGUudHJlZVwiLGQ9e2FuaW1hdGlvblNwZWVkOjUwMCxhY2NvcmRpb246ITAsZm9sbG93TGluazohMSx0cmlnZ2VyOlwiLnRyZWV2aWV3IGFcIn0sZT17dHJlZTpcIi50cmVlXCIsdHJlZXZpZXc6XCIudHJlZXZpZXdcIix0cmVldmlld01lbnU6XCIudHJlZXZpZXctbWVudVwiLG9wZW46XCIubWVudS1vcGVuLCAuYWN0aXZlXCIsbGk6XCJsaVwiLGRhdGE6J1tkYXRhLXdpZGdldD1cInRyZWVcIl0nLGFjdGl2ZTpcIi5hY3RpdmVcIn0sZj17b3BlbjpcIm1lbnUtb3BlblwiLHRyZWU6XCJ0cmVlXCJ9LGc9e2NvbGxhcHNlZDpcImNvbGxhcHNlZC50cmVlXCIsZXhwYW5kZWQ6XCJleHBhbmRlZC50cmVlXCJ9LGg9ZnVuY3Rpb24oYixjKXt0aGlzLmVsZW1lbnQ9Yix0aGlzLm9wdGlvbnM9YyxhKHRoaXMuZWxlbWVudCkuYWRkQ2xhc3MoZi50cmVlKSxhKGUudHJlZXZpZXcrZS5hY3RpdmUsdGhpcy5lbGVtZW50KS5hZGRDbGFzcyhmLm9wZW4pLHRoaXMuX3NldFVwTGlzdGVuZXJzKCl9O2gucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihhLGIpe3ZhciBjPWEubmV4dChlLnRyZWV2aWV3TWVudSksZD1hLnBhcmVudCgpLGc9ZC5oYXNDbGFzcyhmLm9wZW4pO2QuaXMoZS50cmVldmlldykmJih0aGlzLm9wdGlvbnMuZm9sbG93TGluayYmXCIjXCIhPWEuYXR0cihcImhyZWZcIil8fGIucHJldmVudERlZmF1bHQoKSxnP3RoaXMuY29sbGFwc2UoYyxkKTp0aGlzLmV4cGFuZChjLGQpKX0saC5wcm90b3R5cGUuZXhwYW5kPWZ1bmN0aW9uKGIsYyl7dmFyIGQ9YS5FdmVudChnLmV4cGFuZGVkKTtpZih0aGlzLm9wdGlvbnMuYWNjb3JkaW9uKXt2YXIgaD1jLnNpYmxpbmdzKGUub3BlbiksaT1oLmNoaWxkcmVuKGUudHJlZXZpZXdNZW51KTt0aGlzLmNvbGxhcHNlKGksaCl9Yy5hZGRDbGFzcyhmLm9wZW4pLGIuc2xpZGVEb3duKHRoaXMub3B0aW9ucy5hbmltYXRpb25TcGVlZCxmdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS50cmlnZ2VyKGQpfS5iaW5kKHRoaXMpKX0saC5wcm90b3R5cGUuY29sbGFwc2U9ZnVuY3Rpb24oYixjKXt2YXIgZD1hLkV2ZW50KGcuY29sbGFwc2VkKTtiLmZpbmQoZS5vcGVuKS5yZW1vdmVDbGFzcyhmLm9wZW4pLGMucmVtb3ZlQ2xhc3MoZi5vcGVuKSxiLnNsaWRlVXAodGhpcy5vcHRpb25zLmFuaW1hdGlvblNwZWVkLGZ1bmN0aW9uKCl7Yi5maW5kKGUub3BlbitcIiA+IFwiK2UudHJlZXZpZXcpLnNsaWRlVXAoKSxhKHRoaXMuZWxlbWVudCkudHJpZ2dlcihkKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLl9zZXRVcExpc3RlbmVycz1mdW5jdGlvbigpe3ZhciBiPXRoaXM7YSh0aGlzLmVsZW1lbnQpLm9uKFwiY2xpY2tcIix0aGlzLm9wdGlvbnMudHJpZ2dlcixmdW5jdGlvbihjKXtiLnRvZ2dsZShhKHRoaXMpLGMpfSl9O3ZhciBpPWEuZm4udHJlZTthLmZuLnRyZWU9YixhLmZuLnRyZWUuQ29uc3RydWN0b3I9aCxhLmZuLnRyZWUubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLnRyZWU9aSx0aGlzfSxhKHdpbmRvdykub24oXCJsb2FkXCIsZnVuY3Rpb24oKXthKGUuZGF0YSkuZWFjaChmdW5jdGlvbigpe2IuY2FsbChhKHRoaXMpKX0pfSl9KGpRdWVyeSksZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9YSh0aGlzKSxmPWUuZGF0YShjKTtpZighZil7dmFyIGc9YS5leHRlbmQoe30sZCxlLmRhdGEoKSxcIm9iamVjdFwiPT10eXBlb2YgYiYmYik7ZS5kYXRhKGMsZj1uZXcgaChlLGcpKX1cInN0cmluZ1wiPT10eXBlb2YgYiYmZi50b2dnbGUoKX0pfXZhciBjPVwibHRlLmNvbnRyb2xzaWRlYmFyXCIsZD17c2xpZGU6ITB9LGU9e3NpZGViYXI6XCIuY29udHJvbC1zaWRlYmFyXCIsZGF0YTonW2RhdGEtdG9nZ2xlPVwiY29udHJvbC1zaWRlYmFyXCJdJyxvcGVuOlwiLmNvbnRyb2wtc2lkZWJhci1vcGVuXCIsYmc6XCIuY29udHJvbC1zaWRlYmFyLWJnXCIsd3JhcHBlcjpcIi53cmFwcGVyXCIsY29udGVudDpcIi5jb250ZW50LXdyYXBwZXJcIixib3hlZDpcIi5sYXlvdXQtYm94ZWRcIn0sZj17b3BlbjpcImNvbnRyb2wtc2lkZWJhci1vcGVuXCIsZml4ZWQ6XCJmaXhlZFwifSxnPXtjb2xsYXBzZWQ6XCJjb2xsYXBzZWQuY29udHJvbHNpZGViYXJcIixleHBhbmRlZDpcImV4cGFuZGVkLmNvbnRyb2xzaWRlYmFyXCJ9LGg9ZnVuY3Rpb24oYSxiKXt0aGlzLmVsZW1lbnQ9YSx0aGlzLm9wdGlvbnM9Yix0aGlzLmhhc0JpbmRlZFJlc2l6ZT0hMSx0aGlzLmluaXQoKX07aC5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS5pcyhlLmRhdGEpfHxhKHRoaXMpLm9uKFwiY2xpY2tcIix0aGlzLnRvZ2dsZSksdGhpcy5maXgoKSxhKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7dGhpcy5maXgoKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihiKXtiJiZiLnByZXZlbnREZWZhdWx0KCksdGhpcy5maXgoKSxhKGUuc2lkZWJhcikuaXMoZS5vcGVuKXx8YShcImJvZHlcIikuaXMoZS5vcGVuKT90aGlzLmNvbGxhcHNlKCk6dGhpcy5leHBhbmQoKX0saC5wcm90b3R5cGUuZXhwYW5kPWZ1bmN0aW9uKCl7dGhpcy5vcHRpb25zLnNsaWRlP2EoZS5zaWRlYmFyKS5hZGRDbGFzcyhmLm9wZW4pOmEoXCJib2R5XCIpLmFkZENsYXNzKGYub3BlbiksYSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoYS5FdmVudChnLmV4cGFuZGVkKSl9LGgucHJvdG90eXBlLmNvbGxhcHNlPWZ1bmN0aW9uKCl7YShcImJvZHksIFwiK2Uuc2lkZWJhcikucmVtb3ZlQ2xhc3MoZi5vcGVuKSxhKHRoaXMuZWxlbWVudCkudHJpZ2dlcihhLkV2ZW50KGcuY29sbGFwc2VkKSl9LGgucHJvdG90eXBlLmZpeD1mdW5jdGlvbigpe2EoXCJib2R5XCIpLmlzKGUuYm94ZWQpJiZ0aGlzLl9maXhGb3JCb3hlZChhKGUuYmcpKX0saC5wcm90b3R5cGUuX2ZpeEZvckJveGVkPWZ1bmN0aW9uKGIpe2IuY3NzKHtwb3NpdGlvbjpcImFic29sdXRlXCIsaGVpZ2h0OmEoZS53cmFwcGVyKS5oZWlnaHQoKX0pfTt2YXIgaT1hLmZuLmNvbnRyb2xTaWRlYmFyO2EuZm4uY29udHJvbFNpZGViYXI9YixhLmZuLmNvbnRyb2xTaWRlYmFyLkNvbnN0cnVjdG9yPWgsYS5mbi5jb250cm9sU2lkZWJhci5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4uY29udHJvbFNpZGViYXI9aSx0aGlzfSxhKGRvY3VtZW50KS5vbihcImNsaWNrXCIsZS5kYXRhLGZ1bmN0aW9uKGMpe2MmJmMucHJldmVudERlZmF1bHQoKSxiLmNhbGwoYSh0aGlzKSxcInRvZ2dsZVwiKX0pfShqUXVlcnkpLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyksZj1lLmRhdGEoYyk7aWYoIWYpe3ZhciBnPWEuZXh0ZW5kKHt9LGQsZS5kYXRhKCksXCJvYmplY3RcIj09dHlwZW9mIGImJmIpO2UuZGF0YShjLGY9bmV3IGgoZSxnKSl9aWYoXCJzdHJpbmdcIj09dHlwZW9mIGIpe2lmKHZvaWQgMD09PWZbYl0pdGhyb3cgbmV3IEVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFwiK2IpO2ZbYl0oKX19KX12YXIgYz1cImx0ZS5ib3h3aWRnZXRcIixkPXthbmltYXRpb25TcGVlZDo1MDAsY29sbGFwc2VUcmlnZ2VyOidbZGF0YS13aWRnZXQ9XCJjb2xsYXBzZVwiXScscmVtb3ZlVHJpZ2dlcjonW2RhdGEtd2lkZ2V0PVwicmVtb3ZlXCJdJyxjb2xsYXBzZUljb246XCJmYS1taW51c1wiLGV4cGFuZEljb246XCJmYS1wbHVzXCIscmVtb3ZlSWNvbjpcImZhLXRpbWVzXCJ9LGU9e2RhdGE6XCIuYm94XCIsY29sbGFwc2VkOlwiLmNvbGxhcHNlZC1ib3hcIixib2R5OlwiLmJveC1ib2R5XCIsZm9vdGVyOlwiLmJveC1mb290ZXJcIix0b29sczpcIi5ib3gtdG9vbHNcIn0sZj17Y29sbGFwc2VkOlwiY29sbGFwc2VkLWJveFwifSxnPXtjb2xsYXBzZWQ6XCJjb2xsYXBzZWQuYm94d2lkZ2V0XCIsZXhwYW5kZWQ6XCJleHBhbmRlZC5ib3h3aWRnZXRcIixyZW1vdmVkOlwicmVtb3ZlZC5ib3h3aWRnZXRcIn0saD1mdW5jdGlvbihhLGIpe3RoaXMuZWxlbWVudD1hLHRoaXMub3B0aW9ucz1iLHRoaXMuX3NldFVwTGlzdGVuZXJzKCl9O2gucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS5pcyhlLmNvbGxhcHNlZCk/dGhpcy5leHBhbmQoKTp0aGlzLmNvbGxhcHNlKCl9LGgucHJvdG90eXBlLmV4cGFuZD1mdW5jdGlvbigpe3ZhciBiPWEuRXZlbnQoZy5leHBhbmRlZCksYz10aGlzLm9wdGlvbnMuY29sbGFwc2VJY29uLGQ9dGhpcy5vcHRpb25zLmV4cGFuZEljb247YSh0aGlzLmVsZW1lbnQpLnJlbW92ZUNsYXNzKGYuY29sbGFwc2VkKSxhKHRoaXMuZWxlbWVudCkuZmluZChlLnRvb2xzKS5maW5kKFwiLlwiK2QpLnJlbW92ZUNsYXNzKGQpLmFkZENsYXNzKGMpLGEodGhpcy5lbGVtZW50KS5maW5kKGUuYm9keStcIiwgXCIrZS5mb290ZXIpLnNsaWRlRG93bih0aGlzLm9wdGlvbnMuYW5pbWF0aW9uU3BlZWQsZnVuY3Rpb24oKXthKHRoaXMuZWxlbWVudCkudHJpZ2dlcihiKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLmNvbGxhcHNlPWZ1bmN0aW9uKCl7dmFyIGI9YS5FdmVudChnLmNvbGxhcHNlZCksYz10aGlzLm9wdGlvbnMuY29sbGFwc2VJY29uLGQ9dGhpcy5vcHRpb25zLmV4cGFuZEljb247YSh0aGlzLmVsZW1lbnQpLmZpbmQoZS50b29scykuZmluZChcIi5cIitjKS5yZW1vdmVDbGFzcyhjKS5hZGRDbGFzcyhkKSxhKHRoaXMuZWxlbWVudCkuZmluZChlLmJvZHkrXCIsIFwiK2UuZm9vdGVyKS5zbGlkZVVwKHRoaXMub3B0aW9ucy5hbmltYXRpb25TcGVlZCxmdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS5hZGRDbGFzcyhmLmNvbGxhcHNlZCksYSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoYil9LmJpbmQodGhpcykpfSxoLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24oKXt2YXIgYj1hLkV2ZW50KGcucmVtb3ZlZCk7YSh0aGlzLmVsZW1lbnQpLnNsaWRlVXAodGhpcy5vcHRpb25zLmFuaW1hdGlvblNwZWVkLGZ1bmN0aW9uKCl7YSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoYiksYSh0aGlzLmVsZW1lbnQpLnJlbW92ZSgpfS5iaW5kKHRoaXMpKX0saC5wcm90b3R5cGUuX3NldFVwTGlzdGVuZXJzPWZ1bmN0aW9uKCl7dmFyIGI9dGhpczthKHRoaXMuZWxlbWVudCkub24oXCJjbGlja1wiLHRoaXMub3B0aW9ucy5jb2xsYXBzZVRyaWdnZXIsZnVuY3Rpb24oYSl7YSYmYS5wcmV2ZW50RGVmYXVsdCgpLGIudG9nZ2xlKCl9KSxhKHRoaXMuZWxlbWVudCkub24oXCJjbGlja1wiLHRoaXMub3B0aW9ucy5yZW1vdmVUcmlnZ2VyLGZ1bmN0aW9uKGEpe2EmJmEucHJldmVudERlZmF1bHQoKSxiLnJlbW92ZSgpfSl9O3ZhciBpPWEuZm4uYm94V2lkZ2V0O2EuZm4uYm94V2lkZ2V0PWIsYS5mbi5ib3hXaWRnZXQuQ29uc3RydWN0b3I9aCxhLmZuLmJveFdpZGdldC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4uYm94V2lkZ2V0PWksdGhpc30sYSh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7YShlLmRhdGEpLmVhY2goZnVuY3Rpb24oKXtiLmNhbGwoYSh0aGlzKSl9KX0pfShqUXVlcnkpLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyksZj1lLmRhdGEoYyk7aWYoIWYpe3ZhciBoPWEuZXh0ZW5kKHt9LGQsZS5kYXRhKCksXCJvYmplY3RcIj09dHlwZW9mIGImJmIpO2UuZGF0YShjLGY9bmV3IGcoZSxoKSl9aWYoXCJzdHJpbmdcIj09dHlwZW9mIGYpe2lmKHZvaWQgMD09PWZbYl0pdGhyb3cgbmV3IEVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFwiK2IpO2ZbYl0oKX19KX12YXIgYz1cImx0ZS50b2RvbGlzdFwiLGQ9e2lDaGVjazohMSxvbkNoZWNrOmZ1bmN0aW9uKCl7fSxvblVuQ2hlY2s6ZnVuY3Rpb24oKXt9fSxlPXtkYXRhOidbZGF0YS13aWRnZXQ9XCJ0b2RvLWxpc3RcIl0nfSxmPXtkb25lOlwiZG9uZVwifSxnPWZ1bmN0aW9uKGEsYil7dGhpcy5lbGVtZW50PWEsdGhpcy5vcHRpb25zPWIsdGhpcy5fc2V0VXBMaXN0ZW5lcnMoKX07Zy5wcm90b3R5cGUudG9nZ2xlPWZ1bmN0aW9uKGEpe2lmKGEucGFyZW50cyhlLmxpKS5maXJzdCgpLnRvZ2dsZUNsYXNzKGYuZG9uZSksIWEucHJvcChcImNoZWNrZWRcIikpcmV0dXJuIHZvaWQgdGhpcy51bkNoZWNrKGEpO3RoaXMuY2hlY2soYSl9LGcucHJvdG90eXBlLmNoZWNrPWZ1bmN0aW9uKGEpe3RoaXMub3B0aW9ucy5vbkNoZWNrLmNhbGwoYSl9LGcucHJvdG90eXBlLnVuQ2hlY2s9ZnVuY3Rpb24oYSl7dGhpcy5vcHRpb25zLm9uVW5DaGVjay5jYWxsKGEpfSxnLnByb3RvdHlwZS5fc2V0VXBMaXN0ZW5lcnM9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2EodGhpcy5lbGVtZW50KS5vbihcImNoYW5nZSBpZkNoYW5nZWRcIixcImlucHV0OmNoZWNrYm94XCIsZnVuY3Rpb24oKXtiLnRvZ2dsZShhKHRoaXMpKX0pfTt2YXIgaD1hLmZuLnRvZG9MaXN0O2EuZm4udG9kb0xpc3Q9YixhLmZuLnRvZG9MaXN0LkNvbnN0cnVjdG9yPWcsYS5mbi50b2RvTGlzdC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4udG9kb0xpc3Q9aCx0aGlzfSxhKHdpbmRvdykub24oXCJsb2FkXCIsZnVuY3Rpb24oKXthKGUuZGF0YSkuZWFjaChmdW5jdGlvbigpe2IuY2FsbChhKHRoaXMpKX0pfSl9KGpRdWVyeSksZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGQ9YSh0aGlzKSxlPWQuZGF0YShjKTtlfHxkLmRhdGEoYyxlPW5ldyBmKGQpKSxcInN0cmluZ1wiPT10eXBlb2YgYiYmZS50b2dnbGUoZCl9KX12YXIgYz1cImx0ZS5kaXJlY3RjaGF0XCIsZD17ZGF0YTonW2RhdGEtd2lkZ2V0PVwiY2hhdC1wYW5lLXRvZ2dsZVwiXScsYm94OlwiLmRpcmVjdC1jaGF0XCJ9LGU9e29wZW46XCJkaXJlY3QtY2hhdC1jb250YWN0cy1vcGVuXCJ9LGY9ZnVuY3Rpb24oYSl7dGhpcy5lbGVtZW50PWF9O2YucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihhKXthLnBhcmVudHMoZC5ib3gpLmZpcnN0KCkudG9nZ2xlQ2xhc3MoZS5vcGVuKX07dmFyIGc9YS5mbi5kaXJlY3RDaGF0O2EuZm4uZGlyZWN0Q2hhdD1iLGEuZm4uZGlyZWN0Q2hhdC5Db25zdHJ1Y3Rvcj1mLGEuZm4uZGlyZWN0Q2hhdC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4uZGlyZWN0Q2hhdD1nLHRoaXN9LGEoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixkLmRhdGEsZnVuY3Rpb24oYyl7YyYmYy5wcmV2ZW50RGVmYXVsdCgpLGIuY2FsbChhKHRoaXMpLFwidG9nZ2xlXCIpfSl9KGpRdWVyeSk7IiwiLyoqXHJcbiogQGxpY2Vuc2UgSW5wdXQgTWFzayBwbHVnaW4gZm9yIGpxdWVyeVxyXG4qIGh0dHA6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9qcXVlcnkuaW5wdXRtYXNrXHJcbiogQ29weXJpZ2h0IChjKSAyMDEwIC0gMjAxNCBSb2JpbiBIZXJib3RzXHJcbiogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIChodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocClcclxuKiBWZXJzaW9uOiAwLjAuMFxyXG4qL1xyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIGlmICgkLmZuLmlucHV0bWFzayA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy9oZWxwZXIgZnVuY3Rpb25zICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGlzSW5wdXRFdmVudFN1cHBvcnRlZChldmVudE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSxcclxuICAgICAgICAgICAgZXZlbnROYW1lID0gJ29uJyArIGV2ZW50TmFtZSxcclxuICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSAoZXZlbnROYW1lIGluIGVsKTtcclxuICAgICAgICAgICAgaWYgKCFpc1N1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGV2ZW50TmFtZSwgJ3JldHVybjsnKTtcclxuICAgICAgICAgICAgICAgIGlzU3VwcG9ydGVkID0gdHlwZW9mIGVsW2V2ZW50TmFtZV0gPT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBpc1N1cHBvcnRlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZUFsaWFzKGFsaWFzU3RyLCBvcHRpb25zLCBvcHRzKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGlhc0RlZmluaXRpb24gPSBvcHRzLmFsaWFzZXNbYWxpYXNTdHJdO1xyXG4gICAgICAgICAgICBpZiAoYWxpYXNEZWZpbml0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxpYXNEZWZpbml0aW9uLmFsaWFzKSByZXNvbHZlQWxpYXMoYWxpYXNEZWZpbml0aW9uLmFsaWFzLCB1bmRlZmluZWQsIG9wdHMpOyAvL2FsaWFzIGlzIGFub3RoZXIgYWxpYXNcclxuICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIG9wdHMsIGFsaWFzRGVmaW5pdGlvbik7ICAvL21lcmdlIGFsaWFzIGRlZmluaXRpb24gaW4gdGhlIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIG9wdHMsIG9wdGlvbnMpOyAgLy9yZWFwcGx5IGV4dHJhIGdpdmVuIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVNYXNrU2V0cyhvcHRzKSB7XHJcbiAgICAgICAgICAgIHZhciBtcyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgZ2VubWFza3MgPSBbXTsgLy91c2VkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIG1hc2tzIHRoYXQgd2hlcmUgcHJvY2Vzc2VkLCB0byBhdm9pZCBkdXBsaWNhdGVzXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1hc2tUZW1wbGF0ZShtYXNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5udW1lcmljSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrID0gbWFzay5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGVzY2FwZWQgPSBmYWxzZSwgb3V0Q291bnQgPSAwLCBncmVlZHkgPSBvcHRzLmdyZWVkeSwgcmVwZWF0ID0gb3B0cy5yZXBlYXQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVwZWF0ID09IFwiKlwiKSBncmVlZHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vaWYgKGdyZWVkeSA9PSB0cnVlICYmIG9wdHMucGxhY2Vob2xkZXIgPT0gXCJcIikgb3B0cy5wbGFjZWhvbGRlciA9IFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hc2subGVuZ3RoID09IDEgJiYgZ3JlZWR5ID09IGZhbHNlICYmIHJlcGVhdCAhPSAwKSB7IG9wdHMucGxhY2Vob2xkZXIgPSBcIlwiOyB9IC8vaGlkZSBwbGFjZWhvbGRlciB3aXRoIHNpbmdsZSBub24tZ3JlZWR5IG1hc2tcclxuICAgICAgICAgICAgICAgIHZhciBzaW5nbGVNYXNrID0gJC5tYXAobWFzay5zcGxpdChcIlwiKSwgZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG91dEVsZW0gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBvcHRzLmVzY2FwZUNoYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChlbGVtZW50ICE9IG9wdHMub3B0aW9uYWxtYXJrZXIuc3RhcnQgJiYgZWxlbWVudCAhPSBvcHRzLm9wdGlvbmFsbWFya2VyLmVuZCkgfHwgZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFza2RlZiA9IG9wdHMuZGVmaW5pdGlvbnNbZWxlbWVudF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXNrZGVmICYmICFlc2NhcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1hc2tkZWYuY2FyZGluYWxpdHk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dEVsZW0ucHVzaChvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgob3V0Q291bnQgKyBpKSAlIG9wdHMucGxhY2Vob2xkZXIubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRFbGVtLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0Q291bnQgKz0gb3V0RWxlbS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRFbGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYWxsb2NhdGUgcmVwZXRpdGlvbnNcclxuICAgICAgICAgICAgICAgIHZhciByZXBlYXRlZE1hc2sgPSBzaW5nbGVNYXNrLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHJlcGVhdCAmJiBncmVlZHk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdGVkTWFzayA9IHJlcGVhdGVkTWFzay5jb25jYXQoc2luZ2xlTWFzay5zbGljZSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBcIm1hc2tcIjogcmVwZWF0ZWRNYXNrLCBcInJlcGVhdFwiOiByZXBlYXQsIFwiZ3JlZWR5XCI6IGdyZWVkeSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGVzdCBkZWZpbml0aW9uID0+IHtmbjogUmVnRXhwL2Z1bmN0aW9uLCBjYXJkaW5hbGl0eTogaW50LCBvcHRpb25hbGl0eTogYm9vbCwgbmV3QmxvY2tNYXJrZXI6IGJvb2wsIG9mZnNldDogaW50LCBjYXNpbmc6IG51bGwvdXBwZXIvbG93ZXIsIGRlZjogZGVmaW5pdGlvblN5bWJvbH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VGVzdGluZ0NoYWluKG1hc2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRzLm51bWVyaWNJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2sgPSBtYXNrLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNPcHRpb25hbCA9IGZhbHNlLCBlc2NhcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3QmxvY2tNYXJrZXIgPSBmYWxzZTsgLy9pbmRpY2F0ZXMgd2hldGVyIHRoZSBiZWdpbi9lbmRpbmcgb2YgYSBibG9jayBzaG91bGQgYmUgaW5kaWNhdGVkXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQubWFwKG1hc2suc3BsaXQoXCJcIiksIGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvdXRFbGVtID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09IG9wdHMuZXNjYXBlQ2hhcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT0gb3B0cy5vcHRpb25hbG1hcmtlci5zdGFydCAmJiAhZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc09wdGlvbmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbGVtZW50ID09IG9wdHMub3B0aW9uYWxtYXJrZXIuZW5kICYmICFlc2NhcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3B0aW9uYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tkZWYgPSBvcHRzLmRlZmluaXRpb25zW2VsZW1lbnRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFza2RlZiAmJiAhZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZhbGlkYXRvcnMgPSBtYXNrZGVmW1wicHJldmFsaWRhdG9yXCJdLCBwcmV2YWxpZGF0b3JzTCA9IHByZXZhbGlkYXRvcnMgPyBwcmV2YWxpZGF0b3JzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG1hc2tkZWYuY2FyZGluYWxpdHk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2YWxpZGF0b3IgPSBwcmV2YWxpZGF0b3JzTCA+PSBpID8gcHJldmFsaWRhdG9yc1tpIC0gMV0gOiBbXSwgdmFsaWRhdG9yID0gcHJldmFsaWRhdG9yW1widmFsaWRhdG9yXCJdLCBjYXJkaW5hbGl0eSA9IHByZXZhbGlkYXRvcltcImNhcmRpbmFsaXR5XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dEVsZW0ucHVzaCh7IGZuOiB2YWxpZGF0b3IgPyB0eXBlb2YgdmFsaWRhdG9yID09ICdzdHJpbmcnID8gbmV3IFJlZ0V4cCh2YWxpZGF0b3IpIDogbmV3IGZ1bmN0aW9uICgpIHsgdGhpcy50ZXN0ID0gdmFsaWRhdG9yOyB9IDogbmV3IFJlZ0V4cChcIi5cIiksIGNhcmRpbmFsaXR5OiBjYXJkaW5hbGl0eSA/IGNhcmRpbmFsaXR5IDogMSwgb3B0aW9uYWxpdHk6IGlzT3B0aW9uYWwsIG5ld0Jsb2NrTWFya2VyOiBpc09wdGlvbmFsID09IHRydWUgPyBuZXdCbG9ja01hcmtlciA6IGZhbHNlLCBvZmZzZXQ6IDAsIGNhc2luZzogbWFza2RlZltcImNhc2luZ1wiXSwgZGVmOiBtYXNrZGVmW1wiZGVmaW5pdGlvblN5bWJvbFwiXSB8fCBlbGVtZW50IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsID09IHRydWUpIC8vcmVzZXQgbmV3QmxvY2tNYXJrZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dEVsZW0ucHVzaCh7IGZuOiBtYXNrZGVmLnZhbGlkYXRvciA/IHR5cGVvZiBtYXNrZGVmLnZhbGlkYXRvciA9PSAnc3RyaW5nJyA/IG5ldyBSZWdFeHAobWFza2RlZi52YWxpZGF0b3IpIDogbmV3IGZ1bmN0aW9uICgpIHsgdGhpcy50ZXN0ID0gbWFza2RlZi52YWxpZGF0b3I7IH0gOiBuZXcgUmVnRXhwKFwiLlwiKSwgY2FyZGluYWxpdHk6IG1hc2tkZWYuY2FyZGluYWxpdHksIG9wdGlvbmFsaXR5OiBpc09wdGlvbmFsLCBuZXdCbG9ja01hcmtlcjogbmV3QmxvY2tNYXJrZXIsIG9mZnNldDogMCwgY2FzaW5nOiBtYXNrZGVmW1wiY2FzaW5nXCJdLCBkZWY6IG1hc2tkZWZbXCJkZWZpbml0aW9uU3ltYm9sXCJdIHx8IGVsZW1lbnQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRFbGVtLnB1c2goeyBmbjogbnVsbCwgY2FyZGluYWxpdHk6IDAsIG9wdGlvbmFsaXR5OiBpc09wdGlvbmFsLCBuZXdCbG9ja01hcmtlcjogbmV3QmxvY2tNYXJrZXIsIG9mZnNldDogMCwgY2FzaW5nOiBudWxsLCBkZWY6IGVsZW1lbnQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXNldCBuZXdCbG9ja01hcmtlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdCbG9ja01hcmtlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0RWxlbTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXJrT3B0aW9uYWwobWFza1BhcnQpIHsgLy9uZWVkZWQgZm9yIHRoZSBjbGVhck9wdGlvbmFsVGFpbCBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5vcHRpb25hbG1hcmtlci5zdGFydCArIG1hc2tQYXJ0ICsgb3B0cy5vcHRpb25hbG1hcmtlci5lbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gc3BsaXRGaXJzdE9wdGlvbmFsRW5kUGFydChtYXNrUGFydCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbmFsU3RhcnRNYXJrZXJzID0gMCwgb3B0aW9uYWxFbmRNYXJrZXJzID0gMCwgbXBsID0gbWFza1BhcnQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtcGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXNrUGFydC5jaGFyQXQoaSkgPT0gb3B0cy5vcHRpb25hbG1hcmtlci5zdGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbFN0YXJ0TWFya2VycysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BhcnQuY2hhckF0KGkpID09IG9wdHMub3B0aW9uYWxtYXJrZXIuZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsRW5kTWFya2VycysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uYWxTdGFydE1hcmtlcnMgPiAwICYmIG9wdGlvbmFsU3RhcnRNYXJrZXJzID09IG9wdGlvbmFsRW5kTWFya2VycylcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFza1BhcnRzID0gW21hc2tQYXJ0LnN1YnN0cmluZygwLCBpKV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IG1wbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tQYXJ0cy5wdXNoKG1hc2tQYXJ0LnN1YnN0cmluZyhpICsgMSwgbXBsKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFza1BhcnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwbGl0Rmlyc3RPcHRpb25hbFN0YXJ0UGFydChtYXNrUGFydCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1wbCA9IG1hc2tQYXJ0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BhcnQuY2hhckF0KGkpID09IG9wdHMub3B0aW9uYWxtYXJrZXIuc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG1hc2tQYXJ0cyA9IFttYXNrUGFydC5zdWJzdHJpbmcoMCwgaSldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCBtcGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrUGFydHMucHVzaChtYXNrUGFydC5zdWJzdHJpbmcoaSArIDEsIG1wbCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tQYXJ0cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZU1hc2sobWFza1ByZWZpeCwgbWFza1BhcnQsIG1ldGFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFza1BhcnRzID0gc3BsaXRGaXJzdE9wdGlvbmFsRW5kUGFydChtYXNrUGFydCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3TWFzaywgbWFza1RlbXBsYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtYXNrcyA9IHNwbGl0Rmlyc3RPcHRpb25hbFN0YXJ0UGFydChtYXNrUGFydHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hc2tzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdNYXNrID0gbWFza1ByZWZpeCArIG1hc2tzWzBdICsgbWFya09wdGlvbmFsKG1hc2tzWzFdKSArIChtYXNrUGFydHMubGVuZ3RoID4gMSA/IG1hc2tQYXJ0c1sxXSA6IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkobmV3TWFzaywgZ2VubWFza3MpID09IC0xICYmIG5ld01hc2sgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5tYXNrcy5wdXNoKG5ld01hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrVGVtcGxhdGUgPSBnZXRNYXNrVGVtcGxhdGUobmV3TWFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXNrXCI6IG5ld01hc2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9idWZmZXJcIjogbWFza1RlbXBsYXRlW1wibWFza1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnVmZmVyXCI6IG1hc2tUZW1wbGF0ZVtcIm1hc2tcIl0uc2xpY2UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGVzdHNcIjogZ2V0VGVzdGluZ0NoYWluKG5ld01hc2spLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXN0VmFsaWRQb3NpdGlvblwiOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ3JlZWR5XCI6IG1hc2tUZW1wbGF0ZVtcImdyZWVkeVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IG1hc2tUZW1wbGF0ZVtcInJlcGVhdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGFcIjogbWV0YWRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld01hc2sgPSBtYXNrUHJlZml4ICsgbWFza3NbMF0gKyAobWFza1BhcnRzLmxlbmd0aCA+IDEgPyBtYXNrUGFydHNbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KG5ld01hc2ssIGdlbm1hc2tzKSA9PSAtMSAmJiBuZXdNYXNrICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VubWFza3MucHVzaChuZXdNYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza1RlbXBsYXRlID0gZ2V0TWFza1RlbXBsYXRlKG5ld01hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWFza1wiOiBuZXdNYXNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfYnVmZmVyXCI6IG1hc2tUZW1wbGF0ZVtcIm1hc2tcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJ1ZmZlclwiOiBtYXNrVGVtcGxhdGVbXCJtYXNrXCJdLnNsaWNlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlc3RzXCI6IGdldFRlc3RpbmdDaGFpbihuZXdNYXNrKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdFZhbGlkUG9zaXRpb25cIjogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdyZWVkeVwiOiBtYXNrVGVtcGxhdGVbXCJncmVlZHlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcGVhdFwiOiBtYXNrVGVtcGxhdGVbXCJyZXBlYXRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFkYXRhXCI6IG1ldGFkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3BsaXRGaXJzdE9wdGlvbmFsU3RhcnRQYXJ0KG1hc2tzWzFdKS5sZW5ndGggPiAxKSB7IC8vb3B0aW9uYWwgY29udGFpbnMgYW5vdGhlciBvcHRpb25hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZU1hc2sobWFza1ByZWZpeCArIG1hc2tzWzBdLCBtYXNrc1sxXSArIG1hc2tQYXJ0c1sxXSwgbWV0YWRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BhcnRzLmxlbmd0aCA+IDEgJiYgc3BsaXRGaXJzdE9wdGlvbmFsU3RhcnRQYXJ0KG1hc2tQYXJ0c1sxXSkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZU1hc2sobWFza1ByZWZpeCArIG1hc2tzWzBdICsgbWFya09wdGlvbmFsKG1hc2tzWzFdKSwgbWFza1BhcnRzWzFdLCBtZXRhZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlTWFzayhtYXNrUHJlZml4ICsgbWFza3NbMF0sIG1hc2tQYXJ0c1sxXSwgbWV0YWRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld01hc2sgPSBtYXNrUHJlZml4ICsgbWFza1BhcnRzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkobmV3TWFzaywgZ2VubWFza3MpID09IC0xICYmIG5ld01hc2sgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5tYXNrcy5wdXNoKG5ld01hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrVGVtcGxhdGUgPSBnZXRNYXNrVGVtcGxhdGUobmV3TWFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXNrXCI6IG5ld01hc2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9idWZmZXJcIjogbWFza1RlbXBsYXRlW1wibWFza1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnVmZmVyXCI6IG1hc2tUZW1wbGF0ZVtcIm1hc2tcIl0uc2xpY2UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGVzdHNcIjogZ2V0VGVzdGluZ0NoYWluKG5ld01hc2spLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXN0VmFsaWRQb3NpdGlvblwiOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ3JlZWR5XCI6IG1hc2tUZW1wbGF0ZVtcImdyZWVkeVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IG1hc2tUZW1wbGF0ZVtcInJlcGVhdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGFcIjogbWV0YWRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihvcHRzLm1hc2spKSB7IC8vYWxsb3cgbWFzayB0byBiZSBhIHByZXByb2Nlc3NpbmcgZm4gLSBzaG91bGQgcmV0dXJuIGEgdmFsaWQgbWFza1xyXG4gICAgICAgICAgICAgICAgb3B0cy5tYXNrID0gb3B0cy5tYXNrLmNhbGwodGhpcywgb3B0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQuaXNBcnJheShvcHRzLm1hc2spKSB7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2gob3B0cy5tYXNrLCBmdW5jdGlvbiAobmR4LCBtc2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobXNrW1wibWFza1wiXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVNYXNrKFwiXCIsIG1za1tcIm1hc2tcIl0udG9TdHJpbmcoKSwgbXNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVNYXNrKFwiXCIsIG1zay50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgZ2VuZXJhdGVNYXNrKFwiXCIsIG9wdHMubWFzay50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvcHRzLmdyZWVkeSA/IG1zIDogbXMuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYVtcIm1hc2tcIl0ubGVuZ3RoIC0gYltcIm1hc2tcIl0ubGVuZ3RoOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtc2llMTAgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKG5ldyBSZWdFeHAoXCJtc2llIDEwXCIsIFwiaVwiKSkgIT09IG51bGwsXHJcbiAgICAgICAgICAgIGlwaG9uZSA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gobmV3IFJlZ0V4cChcImlwaG9uZVwiLCBcImlcIikpICE9PSBudWxsLFxyXG4gICAgICAgICAgICBhbmRyb2lkID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaChuZXcgUmVnRXhwKFwiYW5kcm9pZC4qc2FmYXJpLipcIiwgXCJpXCIpKSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgYW5kcm9pZGNocm9tZSA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gobmV3IFJlZ0V4cChcImFuZHJvaWQuKmNocm9tZS4qXCIsIFwiaVwiKSkgIT09IG51bGwsXHJcbiAgICAgICAgICAgIHBhc3RlRXZlbnQgPSBpc0lucHV0RXZlbnRTdXBwb3J0ZWQoJ3Bhc3RlJykgPyAncGFzdGUnIDogaXNJbnB1dEV2ZW50U3VwcG9ydGVkKCdpbnB1dCcpID8gJ2lucHV0JyA6IFwicHJvcGVydHljaGFuZ2VcIjtcclxuXHJcblxyXG4gICAgICAgIC8vbWFza2luZyBzY29wZVxyXG4gICAgICAgIC8vYWN0aW9uT2JqIGRlZmluaXRpb24gc2VlIGJlbG93XHJcbiAgICAgICAgZnVuY3Rpb24gbWFza1Njb3BlKG1hc2tzZXRzLCBhY3RpdmVNYXNrc2V0SW5kZXgsIG9wdHMsIGFjdGlvbk9iaikge1xyXG4gICAgICAgICAgICB2YXIgaXNSVEwgPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlT25Gb2N1cyA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpLFxyXG4gICAgICAgICAgICAgICAgJGVsLCBjaHJvbWVWYWx1ZU9uSW5wdXQsXHJcbiAgICAgICAgICAgICAgICBza2lwS2V5UHJlc3NFdmVudCA9IGZhbHNlLCAvL1NhZmFyaSA1LjEueCAtIG1vZGFsIGRpYWxvZyBmaXJlcyBrZXlwcmVzcyB0d2ljZSB3b3JrYXJvdW5kXHJcbiAgICAgICAgICAgICAgICBza2lwSW5wdXRFdmVudCA9IGZhbHNlLCAvL3NraXAgd2hlbiB0cmlnZ2VyZWQgZnJvbSB3aXRoaW4gaW5wdXRtYXNrXHJcbiAgICAgICAgICAgICAgICBpZ25vcmFibGUgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL21hc2tzZXQgaGVscGVyZnVuY3Rpb25zXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRBY3RpdmVNYXNrU2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2ZVRlc3RzKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEFjdGl2ZU1hc2tTZXQoKVsndGVzdHMnXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlTWFza1NldCgpWydfYnVmZmVyJ107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2ZUJ1ZmZlcigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRBY3RpdmVNYXNrU2V0KClbJ2J1ZmZlciddO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpc1ZhbGlkKHBvcywgYywgc3RyaWN0KSB7IC8vc3RyaWN0IHRydWUgfiBubyBjb3JyZWN0aW9uIG9yIGF1dG9maWxsXHJcbiAgICAgICAgICAgICAgICBzdHJpY3QgPSBzdHJpY3QgPT09IHRydWU7IC8vYWx3YXlzIHNldCBhIHZhbHVlIHRvIHN0cmljdCB0byBwcmV2ZW50IHBvc3NpYmxlIHN0cmFuZ2UgYmVoYXZpb3IgaW4gdGhlIGV4dGVuc2lvbnMgXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gX2lzVmFsaWQocG9zaXRpb24sIGFjdGl2ZU1hc2tzZXQsIGMsIHN0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0UG9zID0gZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvc2l0aW9uKSwgbG9vcGVuZCA9IGMgPyAxIDogMCwgY2hycyA9ICcnLCBidWZmZXIgPSBhY3RpdmVNYXNrc2V0W1wiYnVmZmVyXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBhY3RpdmVNYXNrc2V0Wyd0ZXN0cyddW3Rlc3RQb3NdLmNhcmRpbmFsaXR5OyBpID4gbG9vcGVuZDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocnMgKz0gZ2V0QnVmZmVyRWxlbWVudChidWZmZXIsIHRlc3RQb3MgLSAoaSAtIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocnMgKz0gYztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGlzIGZhbHNlIG9yIGEganNvbiBvYmplY3QgPT4geyBwb3M6ID8/LCBjOiA/P30gb3IgdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmVNYXNrc2V0Wyd0ZXN0cyddW3Rlc3RQb3NdLmZuICE9IG51bGwgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0Wyd0ZXN0cyddW3Rlc3RQb3NdLmZuLnRlc3QoY2hycywgYnVmZmVyLCBwb3NpdGlvbiwgc3RyaWN0LCBvcHRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChjID09IGdldEJ1ZmZlckVsZW1lbnQoYWN0aXZlTWFza3NldFsnX2J1ZmZlciddLCBwb3NpdGlvbiwgdHJ1ZSkgfHwgYyA9PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJyZWZyZXNoXCI6IHRydWUsIGM6IGdldEJ1ZmZlckVsZW1lbnQoYWN0aXZlTWFza3NldFsnX2J1ZmZlciddLCBwb3NpdGlvbiwgdHJ1ZSksIHBvczogcG9zaXRpb24gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBQb3N0UHJvY2Vzc1Jlc3VsdHMobWFza0ZvcndhcmRzLCByZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhc1ZhbGlkQWN0dWFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3VsdHMsIGZ1bmN0aW9uIChuZHgsIHJzbHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzVmFsaWRBY3R1YWwgPSAkLmluQXJyYXkocnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSwgbWFza0ZvcndhcmRzKSA9PSAtMSAmJiByc2x0W1wicmVzdWx0XCJdICE9PSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1ZhbGlkQWN0dWFsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1ZhbGlkQWN0dWFsKSB7IC8vc3RyaXAgbWFza2ZvcndhcmRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSAkLm1hcChyZXN1bHRzLCBmdW5jdGlvbiAocnNsdCwgbmR4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KHJzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl0sIG1hc2tGb3J3YXJkcykgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnNsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV1bXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IGFjdHVhbExWUDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy9rZWVwIG1hc2tmb3J3YXJkcyB3aXRoIHRoZSBsZWFzdCBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb3dlc3RQb3MgPSAtMSwgbG93ZXN0SW5kZXggPSAtMSwgcnNsdFZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gocmVzdWx0cywgZnVuY3Rpb24gKG5keCwgcnNsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdLCBtYXNrRm9yd2FyZHMpICE9IC0xICYmIHJzbHRbXCJyZXN1bHRcIl0gIT09IGZhbHNlICYgKGxvd2VzdFBvcyA9PSAtMSB8fCBsb3dlc3RQb3MgPiByc2x0W1wicmVzdWx0XCJdW1wicG9zXCJdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdFBvcyA9IHJzbHRbXCJyZXN1bHRcIl1bXCJwb3NcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXN0SW5kZXggPSByc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9ICQubWFwKHJlc3VsdHMsIGZ1bmN0aW9uIChyc2x0LCBuZHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkocnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSwgbWFza0ZvcndhcmRzKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyc2x0W1wicmVzdWx0XCJdW1wicG9zXCJdID09IGxvd2VzdFBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnNsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJzbHRbXCJyZXN1bHRcIl0gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBwb3M7IGkgPCBsb3dlc3RQb3M7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnNsdFZhbGlkID0gX2lzVmFsaWQoaSwgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV0sIG1hc2tzZXRzW2xvd2VzdEluZGV4XVtcImJ1ZmZlclwiXVtpXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNsdFZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBsb3dlc3RQb3MgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wiYnVmZmVyXCJdLCBpLCBtYXNrc2V0c1tsb3dlc3RJbmRleF1bXCJidWZmZXJcIl1baV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxzbyBjaGVjayBjaGVjayBmb3IgdGhlIGxvd2VzdHBvcyB3aXRoIHRoZSBuZXcgaW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnNsdFZhbGlkID0gX2lzVmFsaWQobG93ZXN0UG9zLCBtYXNrc2V0c1tyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdXSwgYywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyc2x0VmFsaWQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wiYnVmZmVyXCJdLCBsb3dlc3RQb3MsIGMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV1bXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IGxvd2VzdFBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibmR4IFwiICsgcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSArIFwiIHZhbGlkYXRlIFwiICsgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV1bXCJidWZmZXJcIl0uam9pbignJykgKyBcIiBsdiBcIiArIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dWydsYXN0VmFsaWRQb3NpdGlvbiddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJzbHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBfaXNWYWxpZChwb3MsIGdldEFjdGl2ZU1hc2tTZXQoKSwgYywgc3RyaWN0KTsgLy9vbmx5IGNoZWNrIHZhbGlkaXR5IGluIGN1cnJlbnQgbWFzayB3aGVuIHZhbGlkYXRpbmcgc3RyaWN0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7IFwicG9zXCI6IHBvcyB9OyAvL2Fsd2F5cyB0YWtlIGEgcG9zc2libGUgY29ycmVjdGVkIG1hc2twb3NpdGlvbiBpbnRvIGFjY291bnRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0cyA9IFtdLCByZXN1bHQgPSBmYWxzZSwgY3VycmVudEFjdGl2ZU1hc2tzZXRJbmRleCA9IGFjdGl2ZU1hc2tzZXRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBhY3R1YWxCdWZmZXIgPSBnZXRBY3RpdmVCdWZmZXIoKS5zbGljZSgpLCBhY3R1YWxMVlAgPSBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSxcclxuICAgICAgICAgICAgICAgICAgICBhY3R1YWxQcmV2aW91cyA9IHNlZWtQcmV2aW91cyhwb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tGb3J3YXJkcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUpID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFza1BvcyA9IHBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGx2cCA9IGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJzbHRWYWxpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGx2cCA9PSBhY3R1YWxMVlApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobWFza1BvcyAtIGFjdHVhbExWUCkgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGx2cCA9PSAtMSA/IDAgOiBsdnA7IGkgPCBtYXNrUG9zOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnNsdFZhbGlkID0gX2lzVmFsaWQoaSwgZ2V0QWN0aXZlTWFza1NldCgpLCBhY3R1YWxCdWZmZXJbaV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNsdFZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KGdldEFjdGl2ZUJ1ZmZlcigpLCBpLCBhY3R1YWxCdWZmZXJbaV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJzbHRWYWxpZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJzbHRWYWxpZCA9IHsgXCJwb3NcIjogaSB9OyAvL2Fsd2F5cyB0YWtlIGEgcG9zc2libGUgY29ycmVjdGVkIG1hc2twb3NpdGlvbiBpbnRvIGFjY291bnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdWYWxpZFBvc2l0aW9uID0gcnNsdFZhbGlkLnBvcyB8fCBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSA8IG5ld1ZhbGlkUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddID0gbmV3VmFsaWRQb3NpdGlvbjsgLy9zZXQgbmV3IHBvc2l0aW9uIGZyb20gaXNWYWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kb2VzIHRoZSBpbnB1dCBtYXRjaCBvbiBhIGZ1cnRoZXIgcG9zaXRpb24/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTWFzayhtYXNrUG9zKSAmJiAhX2lzVmFsaWQobWFza1BvcywgZ2V0QWN0aXZlTWFza1NldCgpLCBjLCBzdHJpY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heEZvcndhcmQgPSBzZWVrTmV4dChtYXNrUG9zKSAtIG1hc2tQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZncgPSAwOyBmdyA8IG1heEZvcndhcmQ7IGZ3KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc1ZhbGlkKCsrbWFza1BvcywgZ2V0QWN0aXZlTWFza1NldCgpLCBjLCBzdHJpY3QpICE9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrRm9yd2FyZHMucHVzaChhY3RpdmVNYXNrc2V0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ21hc2tmb3J3YXJkICcgKyBhY3RpdmVNYXNrc2V0SW5kZXggKyBcIiBwb3MgXCIgKyBwb3MgKyBcIiBtYXNrUG9zIFwiICsgbWFza1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVNYXNrU2V0KClbJ2xhc3RWYWxpZFBvc2l0aW9uJ10gPj0gYWN0dWFsTFZQIHx8IGFjdGl2ZU1hc2tzZXRJbmRleCA9PSBjdXJyZW50QWN0aXZlTWFza3NldEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BvcyA+PSAwICYmIG1hc2tQb3MgPCBnZXRNYXNrTGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfaXNWYWxpZChtYXNrUG9zLCBnZXRBY3RpdmVNYXNrU2V0KCksIGMsIHN0cmljdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geyBcInBvc1wiOiBtYXNrUG9zIH07IC8vYWx3YXlzIHRha2UgYSBwb3NzaWJsZSBjb3JyZWN0ZWQgbWFza3Bvc2l0aW9uIGludG8gYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdWYWxpZFBvc2l0aW9uID0gcmVzdWx0LnBvcyB8fCBtYXNrUG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddIDwgbmV3VmFsaWRQb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSA9IG5ld1ZhbGlkUG9zaXRpb247IC8vc2V0IG5ldyBwb3NpdGlvbiBmcm9tIGlzVmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBvcyBcIiArIHBvcyArIFwiIG5keCBcIiArIGFjdGl2ZU1hc2tzZXRJbmRleCArIFwiIHZhbGlkYXRlIFwiICsgZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykgKyBcIiBsdiBcIiArIGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHsgXCJhY3RpdmVNYXNrc2V0SW5kZXhcIjogaW5kZXgsIFwicmVzdWx0XCI6IHJlc3VsdCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gY3VycmVudEFjdGl2ZU1hc2tzZXRJbmRleDsgLy9yZXNldCBhY3RpdmVNYXNrc2V0SW5kZXhcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zdFByb2Nlc3NSZXN1bHRzKG1hc2tGb3J3YXJkcywgcmVzdWx0cyk7IC8vcmV0dXJuIHJlc3VsdHMgb2YgdGhlIG11bHRpcGxlIG1hc2sgdmFsaWRhdGlvbnNcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZGV0ZXJtaW5lQWN0aXZlTWFza3NldEluZGV4KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRNYXNrc2V0SW5kZXggPSBhY3RpdmVNYXNrc2V0SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFZhbGlkID0geyBcImFjdGl2ZU1hc2tzZXRJbmRleFwiOiAwLCBcImxhc3RWYWxpZFBvc2l0aW9uXCI6IC0xLCBcIm5leHRcIjogLTEgfTtcclxuICAgICAgICAgICAgICAgICQuZWFjaChtYXNrc2V0cywgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddID4gaGlnaGVzdFZhbGlkWydsYXN0VmFsaWRQb3NpdGlvbiddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoZXN0VmFsaWRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl0gPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZFtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFZhbGlkW1wibmV4dFwiXSA9IHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddID09IGhpZ2hlc3RWYWxpZFsnbGFzdFZhbGlkUG9zaXRpb24nXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGhpZ2hlc3RWYWxpZFsnbmV4dCddID09IC0xIHx8IGhpZ2hlc3RWYWxpZFsnbmV4dCddID4gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFZhbGlkW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBnZXRBY3RpdmVNYXNrU2V0KClbJ2xhc3RWYWxpZFBvc2l0aW9uJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoZXN0VmFsaWRbXCJuZXh0XCJdID0gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGhpZ2hlc3RWYWxpZFtcImxhc3RWYWxpZFBvc2l0aW9uXCJdICE9IC0xICYmIG1hc2tzZXRzW2N1cnJlbnRNYXNrc2V0SW5kZXhdW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPT0gaGlnaGVzdFZhbGlkW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPyBjdXJyZW50TWFza3NldEluZGV4IDogaGlnaGVzdFZhbGlkW1wiYWN0aXZlTWFza3NldEluZGV4XCJdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRNYXNrc2V0SW5kZXggIT0gYWN0aXZlTWFza3NldEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJCdWZmZXIoZ2V0QWN0aXZlQnVmZmVyKCksIHNlZWtOZXh0KGhpZ2hlc3RWYWxpZFtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSwgZ2V0TWFza0xlbmd0aCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJ3cml0ZU91dEJ1ZmZlclwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkZWwuZGF0YSgnX2lucHV0bWFzaycpWydhY3RpdmVNYXNrc2V0SW5kZXgnXSA9IGFjdGl2ZU1hc2tzZXRJbmRleDsgLy9zdG9yZSB0aGUgYWN0aXZlTWFza3NldEluZGV4XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzTWFzayhwb3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZXN0UG9zID0gZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IGdldEFjdGl2ZVRlc3RzKClbdGVzdFBvc107XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlc3QgIT0gdW5kZWZpbmVkID8gdGVzdC5mbiA6IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBkZXRlcm1pbmVUZXN0UG9zaXRpb24ocG9zKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zICUgZ2V0QWN0aXZlVGVzdHMoKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1hc2tMZW5ndGgoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5nZXRNYXNrTGVuZ3RoKGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCksIGdldEFjdGl2ZU1hc2tTZXQoKVsnZ3JlZWR5J10sIGdldEFjdGl2ZU1hc2tTZXQoKVsncmVwZWF0J10sIGdldEFjdGl2ZUJ1ZmZlcigpLCBvcHRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9wb3M6IGZyb20gcG9zaXRpb25cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlZWtOZXh0KHBvcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hc2tMID0gZ2V0TWFza0xlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvcyA+PSBtYXNrTCkgcmV0dXJuIG1hc2tMO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCsrcG9zaXRpb24gPCBtYXNrTCAmJiAhaXNNYXNrKHBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3BvczogZnJvbSBwb3NpdGlvblxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2Vla1ByZXZpb3VzKHBvcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IDApIHJldHVybiAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlICgtLXBvc2l0aW9uID4gMCAmJiAhaXNNYXNrKHBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgcG9zaXRpb24sIGVsZW1lbnQsIGF1dG9QcmVwYXJlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXV0b1ByZXBhcmUpIHBvc2l0aW9uID0gcHJlcGFyZUJ1ZmZlcihidWZmZXIsIHBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IGdldEFjdGl2ZVRlc3RzKClbZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvc2l0aW9uKV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbSAhPSB1bmRlZmluZWQgJiYgdGVzdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRlc3QuY2FzaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1cHBlclwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW1lbnQudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibG93ZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtZW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW3Bvc2l0aW9uXSA9IGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBwb3NpdGlvbiwgYXV0b1ByZXBhcmUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdXRvUHJlcGFyZSkgcG9zaXRpb24gPSBwcmVwYXJlQnVmZmVyKGJ1ZmZlciwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcltwb3NpdGlvbl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vbmVlZGVkIHRvIGhhbmRsZSB0aGUgbm9uLWdyZWVkeSBtYXNrIHJlcGV0aXRpb25zXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwcmVwYXJlQnVmZmVyKGJ1ZmZlciwgcG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBqO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGJ1ZmZlcltwb3NpdGlvbl0gPT0gdW5kZWZpbmVkICYmIGJ1ZmZlci5sZW5ndGggPCBnZXRNYXNrTGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKVtqXSAhPT0gdW5kZWZpbmVkKSB7IC8vYWRkIGEgbmV3IGJ1ZmZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIucHVzaChnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpW2orK10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHdyaXRlQnVmZmVyKGlucHV0LCBidWZmZXIsIGNhcmV0UG9zKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQoYnVmZmVyLmpvaW4oJycpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYXJldFBvcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgY2FyZXRQb3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhckJ1ZmZlcihidWZmZXIsIHN0YXJ0LCBlbmQsIHN0cmlwTm9tYXNrcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0LCBtYXNrTCA9IGdldE1hc2tMZW5ndGgoKSA7IGkgPCBlbmQgJiYgaSA8IG1hc2tMOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaXBOb21hc2tzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNNYXNrKGkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIGksIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgaSwgZ2V0QnVmZmVyRWxlbWVudChnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKCksIGksIHRydWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0UmVUYXJnZXRQbGFjZUhvbGRlcihidWZmZXIsIHBvcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlc3RQb3MgPSBkZXRlcm1pbmVUZXN0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIHNldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBwb3MsIGdldEJ1ZmZlckVsZW1lbnQoZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKSwgdGVzdFBvcykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQbGFjZUhvbGRlcihwb3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdChwb3MgJSBvcHRzLnBsYWNlaG9sZGVyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrVmFsKGlucHV0LCB3cml0ZU91dCwgc3RyaWN0LCBucHR2bCwgaW50ZWxsaUNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRWYWx1ZSA9IG5wdHZsICE9IHVuZGVmaW5lZCA/IG5wdHZsLnNsaWNlKCkgOiB0cnVuY2F0ZUlucHV0KGlucHV0Ll92YWx1ZUdldCgpKS5zcGxpdCgnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKG1zKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wiYnVmZmVyXCJdID0gbXNbXCJfYnVmZmVyXCJdLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXNbXCJwXCJdID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyaWN0ICE9PSB0cnVlKSBhY3RpdmVNYXNrc2V0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdyaXRlT3V0KSBpbnB1dC5fdmFsdWVTZXQoXCJcIik7IC8vaW5pdGlhbCBjbGVhclxyXG4gICAgICAgICAgICAgICAgdmFyIG1sID0gZ2V0TWFza0xlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKGlucHV0VmFsdWUsIGZ1bmN0aW9uIChuZHgsIGNoYXJDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludGVsbGlDaGVjayA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IGdldEFjdGl2ZU1hc2tTZXQoKVtcInBcIl0sIGx2cCA9IHAgPT0gLTEgPyBwIDogc2Vla1ByZXZpb3VzKHApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gbHZwID09IC0xID8gbmR4IDogc2Vla05leHQobHZwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShjaGFyQ29kZSwgZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5zbGljZShsdnAgKyAxLCBwb3MpKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cHJlc3NFdmVudC5jYWxsKGlucHV0LCB1bmRlZmluZWQsIHRydWUsIGNoYXJDb2RlLmNoYXJDb2RlQXQoMCksIHdyaXRlT3V0LCBzdHJpY3QsIG5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlwcmVzc0V2ZW50LmNhbGwoaW5wdXQsIHVuZGVmaW5lZCwgdHJ1ZSwgY2hhckNvZGUuY2hhckNvZGVBdCgwKSwgd3JpdGVPdXQsIHN0cmljdCwgbmR4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyaWN0ID09PSB0cnVlICYmIGdldEFjdGl2ZU1hc2tTZXQoKVtcInBcIl0gIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IHNlZWtQcmV2aW91cyhnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZXNjYXBlUmVnZXgoc3RyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5pbnB1dG1hc2suZXNjYXBlUmVnZXguY2FsbCh0aGlzLCBzdHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0cnVuY2F0ZUlucHV0KGlucHV0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dFZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChcIihcIiArIGVzY2FwZVJlZ2V4KGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykpICsgXCIpKiRcIiksIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhck9wdGlvbmFsVGFpbChpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpLCB0bXBCdWZmZXIgPSBidWZmZXIuc2xpY2UoKSwgdGVzdFBvcywgcG9zO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcG9zID0gdG1wQnVmZmVyLmxlbmd0aCAtIDE7IHBvcyA+PSAwOyBwb3MtLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0UG9zID0gZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZVRlc3RzKClbdGVzdFBvc10ub3B0aW9uYWxpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc01hc2socG9zKSB8fCAhaXNWYWxpZChwb3MsIGJ1ZmZlcltwb3NdLCB0cnVlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcEJ1ZmZlci5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihpbnB1dCwgdG1wQnVmZmVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdW5tYXNrZWR2YWx1ZSgkaW5wdXQsIHNraXBEYXRlcGlja2VyQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVUZXN0cygpICYmIChza2lwRGF0ZXBpY2tlckNoZWNrID09PSB0cnVlIHx8ICEkaW5wdXQuaGFzQ2xhc3MoJ2hhc0RhdGVwaWNrZXInKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NoZWNrVmFsKGlucHV0LCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVtVmFsdWUgPSAkLm1hcChnZXRBY3RpdmVCdWZmZXIoKSwgZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc01hc2soaW5kZXgpICYmIGlzVmFsaWQoaW5kZXgsIGVsZW1lbnQsIHRydWUpID8gZWxlbWVudCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVubWFza2VkVmFsdWUgPSAoaXNSVEwgPyB1bVZhbHVlLnJldmVyc2UoKSA6IHVtVmFsdWUpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLm9uVW5NYXNrICE9IHVuZGVmaW5lZCA/IG9wdHMub25Vbk1hc2suY2FsbCh0aGlzLCBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSwgdW5tYXNrZWRWYWx1ZSkgOiB1bm1hc2tlZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGlucHV0WzBdLl92YWx1ZUdldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBUcmFuc2xhdGVQb3NpdGlvbihwb3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1JUTCAmJiB0eXBlb2YgcG9zID09ICdudW1iZXInICYmICghb3B0cy5ncmVlZHkgfHwgb3B0cy5wbGFjZWhvbGRlciAhPSBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiZmZyTGdodCA9IGdldEFjdGl2ZUJ1ZmZlcigpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBwb3MgPSBiZmZyTGdodCAtIHBvcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3M7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhcmV0KGlucHV0LCBiZWdpbiwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbnB0ID0gaW5wdXQuanF1ZXJ5ICYmIGlucHV0Lmxlbmd0aCA+IDAgPyBpbnB1dFswXSA6IGlucHV0LCByYW5nZTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmVnaW4gPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBiZWdpbiA9IFRyYW5zbGF0ZVBvc2l0aW9uKGJlZ2luKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBUcmFuc2xhdGVQb3NpdGlvbihlbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghJChpbnB1dCkuaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSAodHlwZW9mIGVuZCA9PSAnbnVtYmVyJykgPyBlbmQgOiBiZWdpbjtcclxuICAgICAgICAgICAgICAgICAgICBucHQuc2Nyb2xsTGVmdCA9IG5wdC5zY3JvbGxXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5pbnNlcnRNb2RlID09IGZhbHNlICYmIGJlZ2luID09IGVuZCkgZW5kKys7IC8vc2V0IHZpc3VhbGl6YXRpb24gZm9yIGluc2VydC9vdmVyd3JpdGUgbW9kZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChucHQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0LnNlbGVjdGlvblN0YXJ0ID0gYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5zZWxlY3Rpb25FbmQgPSBhbmRyb2lkID8gYmVnaW4gOiBlbmQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobnB0LmNyZWF0ZVRleHRSYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG5wdC5jcmVhdGVUZXh0UmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghJChpbnB1dCkuaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgXCJiZWdpblwiOiAwLCBcImVuZFwiOiAwIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChucHQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW4gPSBucHQuc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IG5wdC5zZWxlY3Rpb25FbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luID0gMCAtIHJhbmdlLmR1cGxpY2F0ZSgpLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLTEwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IGJlZ2luICsgcmFuZ2UudGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlZ2luID0gVHJhbnNsYXRlUG9zaXRpb24oYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IFRyYW5zbGF0ZVBvc2l0aW9uKGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgXCJiZWdpblwiOiBiZWdpbiwgXCJlbmRcIjogZW5kIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzQ29tcGxldGUoYnVmZmVyKSB7IC8vcmV0dXJuIHRydWUgLyBmYWxzZSAvIHVuZGVmaW5lZCAocmVwZWF0ICopXHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5yZXBlYXQgPT0gXCIqXCIpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29tcGxldGUgPSBmYWxzZSwgaGlnaGVzdFZhbGlkUG9zaXRpb24gPSAwLCBjdXJyZW50QWN0aXZlTWFza3NldEluZGV4ID0gYWN0aXZlTWFza3NldEluZGV4O1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKG1zKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IG5keDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFtbCA9IHNlZWtQcmV2aW91cyhnZXRNYXNrTGVuZ3RoKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXNbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA+PSBoaWdoZXN0VmFsaWRQb3NpdGlvbiAmJiBtc1tcImxhc3RWYWxpZFBvc2l0aW9uXCJdID09IGFtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1zQ29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gYW1sOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFzayA9IGlzTWFzayhpKSwgdGVzdFBvcyA9IGRldGVybWluZVRlc3RQb3NpdGlvbihpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG1hc2sgJiYgKGJ1ZmZlcltpXSA9PSB1bmRlZmluZWQgfHwgYnVmZmVyW2ldID09IGdldFBsYWNlSG9sZGVyKGkpKSkgfHwgKCFtYXNrICYmIGJ1ZmZlcltpXSAhPSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpW3Rlc3RQb3NdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc0NvbXBsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gY29tcGxldGUgfHwgbXNDb21wbGV0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkgLy9icmVhayBsb29wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZFBvc2l0aW9uID0gbXNbXCJsYXN0VmFsaWRQb3NpdGlvblwiXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGN1cnJlbnRBY3RpdmVNYXNrc2V0SW5kZXg7IC8vcmVzZXQgYWN0aXZlTWFza3NldFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpc1NlbGVjdGlvbihiZWdpbiwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNSVEwgPyAoYmVnaW4gLSBlbmQpID4gMSB8fCAoKGJlZ2luIC0gZW5kKSA9PSAxICYmIG9wdHMuaW5zZXJ0TW9kZSkgOlxyXG4gICAgICAgICAgICAgICAgICAgIChlbmQgLSBiZWdpbikgPiAxIHx8ICgoZW5kIC0gYmVnaW4pID09IDEgJiYgb3B0cy5pbnNlcnRNb2RlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAgICAgICAgICAgZnVuY3Rpb24gaW5zdGFsbEV2ZW50UnVsZXIobnB0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRzID0gJC5fZGF0YShucHQpLmV2ZW50cztcclxuXHJcbiAgICAgICAgICAgICAgICAkLmVhY2goZXZlbnRzLCBmdW5jdGlvbiAoZXZlbnRUeXBlLCBldmVudEhhbmRsZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGV2ZW50SGFuZGxlcnMsIGZ1bmN0aW9uIChuZHgsIGV2ZW50SGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyLm5hbWVzcGFjZSA9PSBcImlucHV0bWFza1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyLnR5cGUgIT0gXCJzZXR2YWx1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSBldmVudEhhbmRsZXIuaGFuZGxlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIuaGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWRPbmx5IHx8IHRoaXMuZGlzYWJsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwYXRjaFZhbHVlUHJvcGVydHkobnB0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVQcm9wZXJ0eTtcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlUHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5wdCwgXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVByb3BlcnR5ICYmIHZhbHVlUHJvcGVydHkuZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFucHQuX3ZhbHVlR2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZUdldCA9IHZhbHVlUHJvcGVydHkuZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVTZXQgPSB2YWx1ZVByb3BlcnR5LnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0Ll92YWx1ZUdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1JUTCA/IHZhbHVlR2V0LmNhbGwodGhpcykuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKSA6IHZhbHVlR2V0LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5fdmFsdWVTZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0LmNhbGwodGhpcywgaXNSVEwgPyB2YWx1ZS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5wdCwgXCJ2YWx1ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHNlbGYgPSAkKHRoaXMpLCBpbnB1dERhdGEgPSAkKHRoaXMpLmRhdGEoJ19pbnB1dG1hc2snKSwgbWFza3NldHMgPSBpbnB1dERhdGFbJ21hc2tzZXRzJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGlucHV0RGF0YVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0RGF0YSAmJiBpbnB1dERhdGFbJ29wdHMnXS5hdXRvVW5tYXNrID8gJHNlbGYuaW5wdXRtYXNrKCd1bm1hc2tlZHZhbHVlJykgOiB2YWx1ZUdldC5jYWxsKHRoaXMpICE9IG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ19idWZmZXInXS5qb2luKCcnKSA/IHZhbHVlR2V0LmNhbGwodGhpcykgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0LmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ3NldHZhbHVlLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgbnB0Ll9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnB0Ll92YWx1ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVHZXQgPSBucHQuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVTZXQgPSBucHQuX19sb29rdXBTZXR0ZXJfXyhcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX3ZhbHVlR2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzUlRMID8gdmFsdWVHZXQuY2FsbCh0aGlzKS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogdmFsdWVHZXQuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0Ll92YWx1ZVNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXQuY2FsbCh0aGlzLCBpc1JUTCA/IHZhbHVlLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX19kZWZpbmVHZXR0ZXJfXyhcInZhbHVlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkc2VsZiA9ICQodGhpcyksIGlucHV0RGF0YSA9ICQodGhpcykuZGF0YSgnX2lucHV0bWFzaycpLCBtYXNrc2V0cyA9IGlucHV0RGF0YVsnbWFza3NldHMnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSBpbnB1dERhdGFbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0RGF0YSAmJiBpbnB1dERhdGFbJ29wdHMnXS5hdXRvVW5tYXNrID8gJHNlbGYuaW5wdXRtYXNrKCd1bm1hc2tlZHZhbHVlJykgOiB2YWx1ZUdldC5jYWxsKHRoaXMpICE9IG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ19idWZmZXInXS5qb2luKCcnKSA/IHZhbHVlR2V0LmNhbGwodGhpcykgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5fX2RlZmluZVNldHRlcl9fKFwidmFsdWVcIiwgZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldC5jYWxsKHRoaXMsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ3NldHZhbHVlLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnB0Ll92YWx1ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX3ZhbHVlR2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNSVEwgPyB0aGlzLnZhbHVlLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiB0aGlzLnZhbHVlOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX3ZhbHVlU2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7IHRoaXMudmFsdWUgPSBpc1JUTCA/IHZhbHVlLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiB2YWx1ZTsgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQudmFsSG9va3MudGV4dCA9PSB1bmRlZmluZWQgfHwgJC52YWxIb29rcy50ZXh0LmlucHV0bWFza3BhdGNoICE9IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlR2V0ID0gJC52YWxIb29rcy50ZXh0ICYmICQudmFsSG9va3MudGV4dC5nZXQgPyAkLnZhbEhvb2tzLnRleHQuZ2V0IDogZnVuY3Rpb24gKGVsZW0pIHsgcmV0dXJuIGVsZW0udmFsdWU7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVNldCA9ICQudmFsSG9va3MudGV4dCAmJiAkLnZhbEhvb2tzLnRleHQuc2V0ID8gJC52YWxIb29rcy50ZXh0LnNldCA6IGZ1bmN0aW9uIChlbGVtLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXh0ZW5kKCQudmFsSG9va3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbS5kYXRhKCdfaW5wdXRtYXNrJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbS5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXS5hdXRvVW5tYXNrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkZWxlbS5pbnB1dG1hc2soJ3VubWFza2VkdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWx1ZUdldChlbGVtKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhID0gJGVsZW0uZGF0YSgnX2lucHV0bWFzaycpLCBtYXNrc2V0cyA9IGlucHV0RGF0YVsnbWFza3NldHMnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5wdXREYXRhWydhY3RpdmVNYXNrc2V0SW5kZXgnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICE9IG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ19idWZmZXInXS5qb2luKCcnKSA/IHJlc3VsdCA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuIHZhbHVlR2V0KGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoZWxlbSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtID0gJChlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlU2V0KGVsZW0sIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGVtLmRhdGEoJ19pbnB1dG1hc2snKSkgJGVsZW0udHJpZ2dlckhhbmRsZXIoJ3NldHZhbHVlLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRtYXNrcGF0Y2g6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3NoaWZ0IGNoYXJzIHRvIGxlZnQgZnJvbSBzdGFydCB0byBlbmQgYW5kIHB1dCBjIGF0IGVuZCBwb3NpdGlvbiBpZiBkZWZpbmVkXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzaGlmdEwoc3RhcnQsIGVuZCwgYywgbWFza0p1bXBzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gZ2V0QWN0aXZlQnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFza0p1bXBzICE9PSBmYWxzZSkgLy9qdW1waW5nIG92ZXIgbm9ubWFzayBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghaXNNYXNrKHN0YXJ0KSAmJiBzdGFydCAtIDEgPj0gMCkgc3RhcnQtLTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZCAmJiBpIDwgZ2V0TWFza0xlbmd0aCgpIDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTWFzayhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZVRhcmdldFBsYWNlSG9sZGVyKGJ1ZmZlciwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqID0gc2Vla05leHQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwID0gZ2V0QnVmZmVyRWxlbWVudChidWZmZXIsIGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocCAhPSBnZXRQbGFjZUhvbGRlcihqKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPCBnZXRNYXNrTGVuZ3RoKCkgJiYgaXNWYWxpZChpLCBwLCB0cnVlKSAhPT0gZmFsc2UgJiYgZ2V0QWN0aXZlVGVzdHMoKVtkZXRlcm1pbmVUZXN0UG9zaXRpb24oaSldLmRlZiA9PSBnZXRBY3RpdmVUZXN0cygpW2RldGVybWluZVRlc3RQb3NpdGlvbihqKV0uZGVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIGksIHAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXNrKGkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlVGFyZ2V0UGxhY2VIb2xkZXIoYnVmZmVyLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIHNlZWtQcmV2aW91cyhlbmQpLCBjKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpW1wiZ3JlZWR5XCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYnVmZmVyID0gdHJ1bmNhdGVJbnB1dChidWZmZXIuam9pbignJykpLnNwbGl0KCcnKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gdHJidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBibCA9IGJ1ZmZlci5sZW5ndGg7IGkgPCBibDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltpXSA9IHRyYnVmZmVyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCA9PSAwKSBnZXRBY3RpdmVNYXNrU2V0KClbXCJidWZmZXJcIl0gPSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnQ7IC8vcmV0dXJuIHRoZSB1c2VkIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNoaWZ0UihzdGFydCwgZW5kLCBjKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gZ2V0QWN0aXZlQnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QnVmZmVyRWxlbWVudChidWZmZXIsIHN0YXJ0LCB0cnVlKSAhPSBnZXRQbGFjZUhvbGRlcihzdGFydCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gc2Vla1ByZXZpb3VzKGVuZCkgOyBpID4gc3RhcnQgJiYgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTWFzayhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSBzZWVrUHJldmlvdXMoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ICE9IGdldFBsYWNlSG9sZGVyKGopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQoaiwgdCwgdHJ1ZSkgIT09IGZhbHNlICYmIGdldEFjdGl2ZVRlc3RzKClbZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKGkpXS5kZWYgPT0gZ2V0QWN0aXZlVGVzdHMoKVtkZXRlcm1pbmVUZXN0UG9zaXRpb24oaildLmRlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgaSwgdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlVGFyZ2V0UGxhY2VIb2xkZXIoYnVmZmVyLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IC8vZWxzZSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZVRhcmdldFBsYWNlSG9sZGVyKGJ1ZmZlciwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGMgIT0gdW5kZWZpbmVkICYmIGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBzdGFydCkgPT0gZ2V0UGxhY2VIb2xkZXIoc3RhcnQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHNldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBzdGFydCwgYyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoQmVmb3JlID0gYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVNYXNrU2V0KClbXCJncmVlZHlcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHJidWZmZXIgPSB0cnVuY2F0ZUlucHV0KGJ1ZmZlci5qb2luKCcnKSkuc3BsaXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSB0cmJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGJsID0gYnVmZmVyLmxlbmd0aDsgaSA8IGJsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyW2ldID0gdHJidWZmZXJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoID09IDApIGdldEFjdGl2ZU1hc2tTZXQoKVtcImJ1ZmZlclwiXSA9IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBlbmQgLSAobGVuZ3RoQmVmb3JlIC0gYnVmZmVyLmxlbmd0aCk7IC8vcmV0dXJuIG5ldyBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBIYW5kbGVSZW1vdmUoaW5wdXQsIGssIHBvcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMubnVtZXJpY0lucHV0IHx8IGlzUlRMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBvcHRzLmtleUNvZGUuREVMRVRFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5rZXlDb2RlLkRFTEVURTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1JUTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZCA9IHBvcy5lbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA9IHBlbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpc1NlbGVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9zLmJlZ2luID09IHBvcy5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zQmVnaW4gPSBrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UgPyBwb3MuYmVnaW4gLSAxIDogcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmlzTnVtZXJpYyAmJiBvcHRzLnJhZGl4UG9pbnQgIT0gXCJcIiAmJiBnZXRBY3RpdmVCdWZmZXIoKVtwb3NCZWdpbl0gPT0gb3B0cy5yYWRpeFBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA9IChnZXRBY3RpdmVCdWZmZXIoKS5sZW5ndGggLSAxID09IHBvc0JlZ2luKSAvKiByYWRpeFBvaW50IGlzIGxhdGVzdD8gZGVsZXRlIGl0ICovID8gcG9zLmJlZ2luIDogayA9PSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFID8gcG9zQmVnaW4gOiBzZWVrTmV4dChwb3NCZWdpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPT0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luLS07XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuREVMRVRFKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MuZW5kKys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcy5lbmQgLSBwb3MuYmVnaW4gPT0gMSAmJiAhb3B0cy5pbnNlcnRNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoayA9PSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MuYmVnaW4tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhckJ1ZmZlcihnZXRBY3RpdmVCdWZmZXIoKSwgcG9zLmJlZ2luLCBwb3MuZW5kKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbWwgPSBnZXRNYXNrTGVuZ3RoKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5ncmVlZHkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGlmdEwocG9zLmJlZ2luLCBtbCwgdW5kZWZpbmVkLCAhaXNSVEwgJiYgKGsgPT0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRSAmJiAhaXNTZWxlY3Rpb24pKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld3BvcyA9IHBvcy5iZWdpbjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gcG9zLmJlZ2luOyBpIDwgcG9zLmVuZDsgaSsrKSB7IC8vc2Vla25leHQgdG8gc2tpcCBwbGFjZWhvbGRlcnMgYXQgc3RhcnQgaW4gc2VsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc01hc2soaSkgfHwgIWlzU2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3cG9zID0gc2hpZnRMKHBvcy5iZWdpbiwgbWwsIHVuZGVmaW5lZCwgIWlzUlRMICYmIChrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UgJiYgIWlzU2VsZWN0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNTZWxlY3Rpb24pIHBvcy5iZWdpbiA9IG5ld3BvcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBmaXJzdE1hc2tQb3MgPSBzZWVrTmV4dCgtMSk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckJ1ZmZlcihnZXRBY3RpdmVCdWZmZXIoKSwgcG9zLmJlZ2luLCBwb3MuZW5kLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrVmFsKGlucHV0LCBmYWxzZSwgbWFza3NldHNbMV0gPT0gdW5kZWZpbmVkIHx8IGZpcnN0TWFza1BvcyA+PSBwb3MuZW5kLCBnZXRBY3RpdmVCdWZmZXIoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddIDwgZmlyc3RNYXNrUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdID0gZmlyc3RNYXNrUG9zO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdID0gcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBrZXlkb3duRXZlbnQoZSkge1xyXG4gICAgICAgICAgICAgICAgLy9TYWZhcmkgNS4xLnggLSBtb2RhbCBkaWFsb2cgZmlyZXMga2V5cHJlc3MgdHdpY2Ugd29ya2Fyb3VuZFxyXG4gICAgICAgICAgICAgICAgc2tpcEtleVByZXNzRXZlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsICRpbnB1dCA9ICQoaW5wdXQpLCBrID0gZS5rZXlDb2RlLCBwb3MgPSBjYXJldChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9iYWNrc3BhY2UsIGRlbGV0ZSwgYW5kIGVzY2FwZSBnZXQgc3BlY2lhbCB0cmVhdG1lbnRcclxuICAgICAgICAgICAgICAgIGlmIChrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UgfHwgayA9PSBvcHRzLmtleUNvZGUuREVMRVRFIHx8IChpcGhvbmUgJiYgayA9PSAxMjcpIHx8IGUuY3RybEtleSAmJiBrID09IDg4KSB7IC8vYmFja3NwYWNlL2RlbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy9zdG9wIGRlZmF1bHQgYWN0aW9uIGJ1dCBhbGxvdyBwcm9wYWdhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09IDg4KSB2YWx1ZU9uRm9jdXMgPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICBIYW5kbGVSZW1vdmUoaW5wdXQsIGssIHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0ZXJtaW5lQWN0aXZlTWFza3NldEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGdldEFjdGl2ZUJ1ZmZlcigpLCBnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuX3ZhbHVlR2V0KCkgPT0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5qb2luKCcnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoJ2NsZWFyZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1Rvb2x0aXApIHsgLy91cGRhdGUgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucHJvcChcInRpdGxlXCIsIGdldEFjdGl2ZU1hc2tTZXQoKVtcIm1hc2tcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuRU5EIHx8IGsgPT0gb3B0cy5rZXlDb2RlLlBBR0VfRE9XTikgeyAvL3doZW4gRU5EIG9yIFBBR0VfRE9XTiBwcmVzc2VkIHNldCBwb3NpdGlvbiBhdCBsYXN0bWF0Y2hcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zID0gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuaW5zZXJ0TW9kZSAmJiBjYXJldFBvcyA9PSBnZXRNYXNrTGVuZ3RoKCkgJiYgIWUuc2hpZnRLZXkpIGNhcmV0UG9zLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBlLnNoaWZ0S2V5ID8gcG9zLmJlZ2luIDogY2FyZXRQb3MsIGNhcmV0UG9zKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGsgPT0gb3B0cy5rZXlDb2RlLkhPTUUgJiYgIWUuc2hpZnRLZXkpIHx8IGsgPT0gb3B0cy5rZXlDb2RlLlBBR0VfVVApIHsgLy9Ib21lIG9yIHBhZ2VfdXBcclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgMCwgZS5zaGlmdEtleSA/IHBvcy5iZWdpbiA6IDApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChrID09IG9wdHMua2V5Q29kZS5FU0NBUEUgfHwgKGsgPT0gOTAgJiYgZS5jdHJsS2V5KSkgeyAvL2VzY2FwZSAmJiB1bmRvXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWwoaW5wdXQsIHRydWUsIGZhbHNlLCB2YWx1ZU9uRm9jdXMuc3BsaXQoJycpKTtcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuSU5TRVJUICYmICEoZS5zaGlmdEtleSB8fCBlLmN0cmxLZXkpKSB7IC8vaW5zZXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5pbnNlcnRNb2RlID0gIW9wdHMuaW5zZXJ0TW9kZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgIW9wdHMuaW5zZXJ0TW9kZSAmJiBwb3MuYmVnaW4gPT0gZ2V0TWFza0xlbmd0aCgpID8gcG9zLmJlZ2luIC0gMSA6IHBvcy5iZWdpbik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMuaW5zZXJ0TW9kZSA9PSBmYWxzZSAmJiAhZS5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09IG9wdHMua2V5Q29kZS5SSUdIVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBjYXJldFBvcy5iZWdpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuTEVGVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBjYXJldFBvcy5iZWdpbiAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRDYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRzLm9uS2V5RG93bi5jYWxsKHRoaXMsIGUsIGdldEFjdGl2ZUJ1ZmZlcigpLCBvcHRzKSA9PT0gdHJ1ZSkgLy9leHRyYSBzdHVmZiB0byBleGVjdXRlIG9uIGtleWRvd25cclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgY3VycmVudENhcmV0UG9zLmJlZ2luLCBjdXJyZW50Q2FyZXRQb3MuZW5kKTtcclxuICAgICAgICAgICAgICAgIGlnbm9yYWJsZSA9ICQuaW5BcnJheShrLCBvcHRzLmlnbm9yYWJsZXMpICE9IC0xO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24ga2V5cHJlc3NFdmVudChlLCBjaGVja3ZhbCwgaywgd3JpdGVPdXQsIHN0cmljdCwgbmR4KSB7XHJcbiAgICAgICAgICAgICAgICAvL1NhZmFyaSA1LjEueCAtIG1vZGFsIGRpYWxvZyBmaXJlcyBrZXlwcmVzcyB0d2ljZSB3b3JrYXJvdW5kXHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PSB1bmRlZmluZWQgJiYgc2tpcEtleVByZXNzRXZlbnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNraXBLZXlQcmVzc0V2ZW50ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLCAkaW5wdXQgPSAkKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgayA9IGNoZWNrdmFsID8gayA6IChlLndoaWNoIHx8IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2t2YWwgIT09IHRydWUgJiYgKCEoZS5jdHJsS2V5ICYmIGUuYWx0S2V5KSAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSB8fCBpZ25vcmFibGUpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NwZWNpYWwgdHJlYXQgdGhlIGRlY2ltYWwgc2VwYXJhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja3ZhbCAhPT0gdHJ1ZSAmJiBrID09IDQ2ICYmIGUuc2hpZnRLZXkgPT0gZmFsc2UgJiYgb3B0cy5yYWRpeFBvaW50ID09IFwiLFwiKSBrID0gNDQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zLCByZXN1bHRzLCByZXN1bHQsIGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2t2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwY2FyZXQgPSBzdHJpY3QgPyBuZHggOiBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSB7IGJlZ2luOiBwY2FyZXQsIGVuZDogcGNhcmV0IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBjYXJldChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2hvdWxkIHdlIGNsZWFyIGEgcG9zc2libGUgc2VsZWN0aW9uPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzU2xjdG4gPSBpc1NlbGVjdGlvbihwb3MuYmVnaW4sIHBvcy5lbmQpLCByZWRldGVybWluZUxWUCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbEluZGV4ID0gYWN0aXZlTWFza3NldEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNTbGN0bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5pdGlhbEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBsbW50KSB7IC8vaW5pdCB1bmRvYnVmZmVyIGZvciByZWNvdmVyeSB3aGVuIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGxtbnQpID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gbmR4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJ1bmRvQnVmZmVyXCJdID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIYW5kbGVSZW1vdmUoaW5wdXQsIG9wdHMua2V5Q29kZS5ERUxFVEUsIHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuaW5zZXJ0TW9kZSkgeyAvL3ByZXNlcnZlIHNvbWUgc3BhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gobWFza3NldHMsIGZ1bmN0aW9uIChuZHgsIGxtbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAobG1udCkgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gbmR4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnRSKHBvcy5iZWdpbiwgZ2V0TWFza0xlbmd0aCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSBpbml0aWFsSW5kZXg7IC8vcmVzdG9yZSBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXhQb3NpdGlvbiA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuaXNOdW1lcmljICYmIGNoZWNrdmFsICE9PSB0cnVlICYmIHJhZGl4UG9zaXRpb24gIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmdyZWVkeSAmJiBwb3MuYmVnaW4gPD0gcmFkaXhQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA9IHNlZWtQcmV2aW91cyhwb3MuYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT0gb3B0cy5yYWRpeFBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luID0gcmFkaXhQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MuZW5kID0gcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBpc1ZhbGlkKHAsIGMsIHN0cmljdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJpY3QgPT09IHRydWUpIHJlc3VsdHMgPSBbeyBcImFjdGl2ZU1hc2tzZXRJbmRleFwiOiBhY3RpdmVNYXNrc2V0SW5kZXgsIFwicmVzdWx0XCI6IHJlc3VsdHMgfV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXN1bHRzLCBmdW5jdGlvbiAoaW5kZXgsIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gcmVzdWx0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wid3JpdGVPdXRCdWZmZXJcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5wID0gcmVzdWx0W1wicmVzdWx0XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5wICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZyZXNoID0gZmFsc2UsIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChucCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoID0gbnBbXCJyZWZyZXNoXCJdOyAvL29ubHkgcmV3cml0ZSBidWZmZXIgZnJvbSBpc1ZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBucC5wb3MgIT0gdW5kZWZpbmVkID8gbnAucG9zIDogcDsgLy9zZXQgbmV3IHBvc2l0aW9uIGZyb20gaXNWYWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gbnAuYyAhPSB1bmRlZmluZWQgPyBucC5jIDogYzsgLy9zZXQgbmV3IGNoYXIgZnJvbSBpc1ZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWZyZXNoICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmluc2VydE1vZGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RVbm1hc2tlZFBvc2l0aW9uID0gZ2V0TWFza0xlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJmckNsb25lID0gYnVmZmVyLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZ2V0QnVmZmVyRWxlbWVudChiZnJDbG9uZSwgbGFzdFVubWFza2VkUG9zaXRpb24sIHRydWUpICE9IGdldFBsYWNlSG9sZGVyKGxhc3RVbm1hc2tlZFBvc2l0aW9uKSAmJiBsYXN0VW5tYXNrZWRQb3NpdGlvbiA+PSBwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFVubWFza2VkUG9zaXRpb24gPSBsYXN0VW5tYXNrZWRQb3NpdGlvbiA9PSAwID8gLTEgOiBzZWVrUHJldmlvdXMobGFzdFVubWFza2VkUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RVbm1hc2tlZFBvc2l0aW9uID49IHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdFIocCwgZ2V0TWFza0xlbmd0aCgpLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NoaWZ0IHRoZSBsdnAgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGx2cCA9IGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdLCBubHZwID0gc2Vla05leHQobHZwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmx2cCAhPSBnZXRNYXNrTGVuZ3RoKCkgJiYgbHZwID49IHAgJiYgKGdldEJ1ZmZlckVsZW1lbnQoZ2V0QWN0aXZlQnVmZmVyKCksIG5sdnAsIHRydWUpICE9IGdldFBsYWNlSG9sZGVyKG5sdnApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IG5sdnA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGdldEFjdGl2ZU1hc2tTZXQoKVtcIndyaXRlT3V0QnVmZmVyXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgcCwgYywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID09IC0xIHx8IG1pbmltYWxGb3J3YXJkUG9zaXRpb24gPiBzZWVrTmV4dChwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW1hbEZvcndhcmRQb3NpdGlvbiA9IHNlZWtOZXh0KHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0UG9zID0gcCA8IGdldE1hc2tMZW5ndGgoKSA/IHAgKyAxIDogcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pbmltYWxGb3J3YXJkUG9zaXRpb24gPT0gLTEgfHwgbWluaW1hbEZvcndhcmRQb3NpdGlvbiA+IG5leHRQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltYWxGb3J3YXJkUG9zaXRpb24gPSBuZXh0UG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID4gZ2V0QWN0aXZlTWFza1NldCgpW1wicFwiXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wicFwiXSA9IG1pbmltYWxGb3J3YXJkUG9zaXRpb247IC8vbmVlZGVkIGZvciBjaGVja3ZhbCBzdHJpY3QgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmljdCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5pdGlhbEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0ZXJtaW5lQWN0aXZlTWFza3NldEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdyaXRlT3V0ICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3VsdHMsIGZ1bmN0aW9uIChuZHgsIHJzbHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSA9PSBhY3RpdmVNYXNrc2V0SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcnNsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IG9wdHMub25LZXlWYWxpZGF0aW9uLmNhbGwoc2VsZiwgcmVzdWx0W1wicmVzdWx0XCJdLCBvcHRzKTsgfSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVtcIndyaXRlT3V0QnVmZmVyXCJdICYmIHJlc3VsdFtcInJlc3VsdFwiXSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0NhcmV0UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja3ZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZXRQb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLm51bWVyaWNJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAgPiByYWRpeFBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZXRQb3NpdGlvbiA9IHNlZWtQcmV2aW91cyhtaW5pbWFsRm9yd2FyZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PSBvcHRzLnJhZGl4UG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJldFBvc2l0aW9uID0gbWluaW1hbEZvcndhcmRQb3NpdGlvbiAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgbmV3Q2FyZXRQb3NpdGlvbiA9IHNlZWtQcmV2aW91cyhtaW5pbWFsRm9yd2FyZFBvc2l0aW9uIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJldFBvc2l0aW9uID0gbWluaW1hbEZvcndhcmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlciwgbmV3Q2FyZXRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja3ZhbCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IC8vdGltZW91dCBuZWVkZWQgZm9yIElFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGUoYnVmZmVyKSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwSW5wdXRFdmVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1NsY3RuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVtcImJ1ZmZlclwiXSA9IGdldEFjdGl2ZU1hc2tTZXQoKVtcInVuZG9CdWZmZXJcIl0uc3BsaXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1Rvb2x0aXApIHsgLy91cGRhdGUgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnByb3AoXCJ0aXRsZVwiLCBnZXRBY3RpdmVNYXNrU2V0KClbXCJtYXNrXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9uZWVkZWQgZm9yIElFOCBhbmQgYmVsb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQgPyBlLnByZXZlbnREZWZhdWx0KCkgOiBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBrZXl1cEV2ZW50KGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLCBpbnB1dCA9IHRoaXMsIGsgPSBlLmtleUNvZGUsIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhbmRyb2lkY2hyb21lICYmIGsgPT0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaHJvbWVWYWx1ZU9uSW5wdXQgPT0gaW5wdXQuX3ZhbHVlR2V0KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleWRvd25FdmVudC5jYWxsKHRoaXMsIGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9wdHMub25LZXlVcC5jYWxsKHRoaXMsIGUsIGJ1ZmZlciwgb3B0cyk7IC8vZXh0cmEgc3R1ZmYgdG8gZXhlY3V0ZSBvbiBrZXl1cFxyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT0gb3B0cy5rZXlDb2RlLlRBQiAmJiBvcHRzLnNob3dNYXNrT25Gb2N1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkaW5wdXQuaGFzQ2xhc3MoJ2ZvY3VzLmlucHV0bWFzaycpICYmIGlucHV0Ll92YWx1ZUdldCgpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVPbkZvY3VzID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIuam9pbignJykgPT0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5qb2luKCcnKSAmJiAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBidWZmZXIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgVHJhbnNsYXRlUG9zaXRpb24oMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIFRyYW5zbGF0ZVBvc2l0aW9uKDApLCBUcmFuc2xhdGVQb3NpdGlvbihnZXRNYXNrTGVuZ3RoKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlucHV0RXZlbnQoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNraXBJbnB1dEV2ZW50ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcElucHV0RXZlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsICRpbnB1dCA9ICQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNocm9tZVZhbHVlT25JbnB1dCA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tWYWwoaW5wdXQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QWN0aXZlQnVmZmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGUoZ2V0QWN0aXZlQnVmZmVyKCkpID09PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwiY29tcGxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAkaW5wdXQuY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbWFzayhlbCkge1xyXG4gICAgICAgICAgICAgICAgJGVsID0gJChlbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGVsLmlzKFwiOmlucHV0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdG9yZSB0ZXN0cyAmIG9yaWdpbmFsIGJ1ZmZlciBpbiB0aGUgaW5wdXQgZWxlbWVudCAtIHVzZWQgdG8gZ2V0IHRoZSB1bm1hc2tlZCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICRlbC5kYXRhKCdfaW5wdXRtYXNrJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFza3NldHMnOiBtYXNrc2V0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FjdGl2ZU1hc2tzZXRJbmRleCc6IGFjdGl2ZU1hc2tzZXRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ29wdHMnOiBvcHRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnaXNSVEwnOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3Nob3cgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dUb29sdGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5wcm9wKFwidGl0bGVcIiwgZ2V0QWN0aXZlTWFza1NldCgpW1wibWFza1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2NvcnJlY3QgZ3JlZWR5IHNldHRpbmcgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpWydncmVlZHknXSA9IGdldEFjdGl2ZU1hc2tTZXQoKVsnZ3JlZWR5J10gPyBnZXRBY3RpdmVNYXNrU2V0KClbJ2dyZWVkeSddIDogZ2V0QWN0aXZlTWFza1NldCgpWydyZXBlYXQnXSA9PSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2hhbmRsZSBtYXhsZW5ndGggYXR0cmlidXRlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbC5hdHRyKFwibWF4TGVuZ3RoXCIpICE9IG51bGwpIC8vb25seSB3aGVuIHRoZSBhdHRyaWJ1dGUgaXMgc2V0XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4TGVuZ3RoID0gJGVsLnByb3AoJ21heExlbmd0aCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF4TGVuZ3RoID4gLTEpIHsgLy9oYW5kbGUgKi1yZXBlYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChtYXNrc2V0cywgZnVuY3Rpb24gKG5keCwgbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChtcykgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXNbXCJyZXBlYXRcIl0gPT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wicmVwZWF0XCJdID0gbWF4TGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldE1hc2tMZW5ndGgoKSA+PSBtYXhMZW5ndGggJiYgbWF4TGVuZ3RoID4gLTEpIHsgLy9GRiBzZXRzIG5vIGRlZmluZWQgbWF4IGxlbmd0aCB0byAtMSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXhMZW5ndGggPCBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLmxlbmd0aCkgZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5sZW5ndGggPSBtYXhMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydncmVlZHknXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVsncmVwZWF0J10gPSBNYXRoLnJvdW5kKG1heExlbmd0aCAvIGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC5wcm9wKCdtYXhMZW5ndGgnLCBnZXRNYXNrTGVuZ3RoKCkgKiAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0Y2hWYWx1ZVByb3BlcnR5KGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMubnVtZXJpY0lucHV0KSBvcHRzLmlzTnVtZXJpYyA9IG9wdHMubnVtZXJpY0lucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5kaXIgPT0gXCJydGxcIiB8fCAob3B0cy5udW1lcmljSW5wdXQgJiYgb3B0cy5yaWdodEFsaWduTnVtZXJpY3MpIHx8IChvcHRzLmlzTnVtZXJpYyAmJiBvcHRzLnJpZ2h0QWxpZ25OdW1lcmljcykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5jc3MoXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5kaXIgPT0gXCJydGxcIiB8fCBvcHRzLm51bWVyaWNJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5kaXIgPSBcImx0clwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwucmVtb3ZlQXR0cihcImRpclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0RGF0YSA9ICRlbC5kYXRhKCdfaW5wdXRtYXNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YVsnaXNSVEwnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5kYXRhKCdfaW5wdXRtYXNrJywgaW5wdXREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSVEwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy91bmJpbmQgYWxsIGV2ZW50cyAtIHRvIG1ha2Ugc3VyZSB0aGF0IG5vIG90aGVyIG1hc2sgd2lsbCBpbnRlcmZlcmUgd2hlbiByZS1tYXNraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLnVuYmluZChcIi5pbnB1dG1hc2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2JpbmQgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLmNsb3Nlc3QoJ2Zvcm0nKS5iaW5kKFwic3VibWl0XCIsIGZ1bmN0aW9uICgpIHsgLy90cmlnZ2VyIGNoYW5nZSBvbiBzdWJtaXQgaWYgYW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZU9uRm9jdXMgIT0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC5jaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoJ3Jlc2V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC50cmlnZ2VyKFwic2V0dmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRlbC5iaW5kKFwibW91c2VlbnRlci5pbnB1dG1hc2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISRpbnB1dC5oYXNDbGFzcygnZm9jdXMuaW5wdXRtYXNrJykgJiYgb3B0cy5zaG93TWFza09uSG92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5fdmFsdWVHZXQoKSAhPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKGlucHV0LCBnZXRBY3RpdmVCdWZmZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKFwiYmx1ci5pbnB1dG1hc2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzLCBucHRWYWx1ZSA9IGlucHV0Ll92YWx1ZUdldCgpLCBidWZmZXIgPSBnZXRBY3RpdmVCdWZmZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnJlbW92ZUNsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlT25Gb2N1cyAhPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzICYmIG5wdFZhbHVlICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnB0VmFsdWUgPT0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5qb2luKCcnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IC8vY2xlYXJvdXQgb3B0aW9uYWwgdGFpbCBvZiB0aGUgbWFza1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyT3B0aW9uYWxUYWlsKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21wbGV0ZShidWZmZXIpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJpbmNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY2xlYXJJbmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChtcykgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNbXCJidWZmZXJcIl0gPSBtc1tcIl9idWZmZXJcIl0uc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll92YWx1ZVNldCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZChcImZvY3VzLmlucHV0bWFza1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLCBpbnB1dCA9IHRoaXMsIG5wdFZhbHVlID0gaW5wdXQuX3ZhbHVlR2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dNYXNrT25Gb2N1cyAmJiAhJGlucHV0Lmhhc0NsYXNzKCdmb2N1cy5pbnB1dG1hc2snKSAmJiAoIW9wdHMuc2hvd01hc2tPbkhvdmVyIHx8IChvcHRzLnNob3dNYXNrT25Ib3ZlciAmJiBucHRWYWx1ZSA9PSAnJykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuX3ZhbHVlR2V0KCkgIT0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QWN0aXZlQnVmZmVyKCksIHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmFkZENsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVPbkZvY3VzID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZChcIm1vdXNlbGVhdmUuaW5wdXRtYXNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyksIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJGlucHV0Lmhhc0NsYXNzKCdmb2N1cy5pbnB1dG1hc2snKSAmJiBpbnB1dC5fdmFsdWVHZXQoKSAhPSAkaW5wdXQuYXR0cihcInBsYWNlaG9sZGVyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Ll92YWx1ZUdldCgpID09IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykgfHwgaW5wdXQuX3ZhbHVlR2V0KCkgPT0gJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll92YWx1ZVNldCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IC8vY2xlYXJvdXQgb3B0aW9uYWwgdGFpbCBvZiB0aGUgbWFza1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhck9wdGlvbmFsVGFpbChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZChcImNsaWNrLmlucHV0bWFza1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkQ2FyZXQgPSBjYXJldChpbnB1dCksIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2FyZXQuYmVnaW4gPT0gc2VsZWN0ZWRDYXJldC5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xpY2tQb3NpdGlvbiA9IGlzUlRMID8gVHJhbnNsYXRlUG9zaXRpb24oc2VsZWN0ZWRDYXJldC5iZWdpbikgOiBzZWxlY3RlZENhcmV0LmJlZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsdnAgPSBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmlzTnVtZXJpYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UG9zaXRpb24gPSBvcHRzLnNraXBSYWRpeERhbmNlID09PSBmYWxzZSAmJiBvcHRzLnJhZGl4UG9pbnQgIT0gXCJcIiAmJiAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBidWZmZXIpICE9IC0xID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLm51bWVyaWNJbnB1dCA/IHNlZWtOZXh0KCQuaW5BcnJheShvcHRzLnJhZGl4UG9pbnQsIGJ1ZmZlcikpIDogJC5pbkFycmF5KG9wdHMucmFkaXhQb2ludCwgYnVmZmVyKSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vla05leHQobHZwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UG9zaXRpb24gPSBzZWVrTmV4dChsdnApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tQb3NpdGlvbiA8IGxhc3RQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXNrKGNsaWNrUG9zaXRpb24pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIGNsaWNrUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGNhcmV0KGlucHV0LCBzZWVrTmV4dChjbGlja1Bvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBsYXN0UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKCdkYmxjbGljay5pbnB1dG1hc2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIDAsIHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQocGFzdGVFdmVudCArIFwiLmlucHV0bWFzayBkcmFnZHJvcC5pbnB1dG1hc2sgZHJvcC5pbnB1dG1hc2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNraXBJbnB1dEV2ZW50ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwSW5wdXRFdmVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcywgJGlucHV0ID0gJChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Bhc3RlIGV2ZW50IGZvciBJRTggYW5kIGxvd2VyIEkgZ3Vlc3MgOy0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gXCJwcm9wZXJ0eWNoYW5nZVwiICYmIGlucHV0Ll92YWx1ZUdldCgpLmxlbmd0aCA8PSBnZXRNYXNrTGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhc3RlVmFsdWUgPSBvcHRzLm9uQmVmb3JlUGFzdGUgIT0gdW5kZWZpbmVkID8gb3B0cy5vbkJlZm9yZVBhc3RlLmNhbGwodGhpcywgaW5wdXQuX3ZhbHVlR2V0KCkpIDogaW5wdXQuX3ZhbHVlR2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1ZhbChpbnB1dCwgdHJ1ZSwgZmFsc2UsIHBhc3RlVmFsdWUuc3BsaXQoJycpLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBsZXRlKGdldEFjdGl2ZUJ1ZmZlcigpKSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudHJpZ2dlcihcImNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoJ3NldHZhbHVlLmlucHV0bWFzaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWwoaW5wdXQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZU9uRm9jdXMgPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Ll92YWx1ZUdldCgpID09IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoJ2NvbXBsZXRlLmlucHV0bWFzaycsIG9wdHMub25jb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgICkuYmluZCgnaW5jb21wbGV0ZS5pbnB1dG1hc2snLCBvcHRzLm9uaW5jb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgICkuYmluZCgnY2xlYXJlZC5pbnB1dG1hc2snLCBvcHRzLm9uY2xlYXJlZFxyXG4gICAgICAgICAgICAgICAgICAgICkuYmluZChcImtleXVwLmlucHV0bWFza1wiLCBrZXl1cEV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZHJvaWRjaHJvbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmJpbmQoXCJpbnB1dC5pbnB1dG1hc2tcIiwgaW5wdXRFdmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmJpbmQoXCJrZXlkb3duLmlucHV0bWFza1wiLCBrZXlkb3duRXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKS5iaW5kKFwia2V5cHJlc3MuaW5wdXRtYXNrXCIsIGtleXByZXNzRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1zaWUxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmJpbmQoXCJpbnB1dC5pbnB1dG1hc2tcIiwgaW5wdXRFdmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vYXBwbHkgbWFza1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsKGVsLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVPbkZvY3VzID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV3JhcCBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluIGEgdHJ5L2NhdGNoIGJsb2NrIHNpbmNlIElFOSB0aHJvdyBcIlVuc3BlY2lmaWVkIGVycm9yXCIgaWYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpcyB1bmRlZmluZWQgd2hlbiB3ZSBhcmUgaW4gYW4gSUZyYW1lLlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQgPT09IGVsKSB7IC8vcG9zaXRpb24gdGhlIGNhcmV0IHdoZW4gaW4gZm9jdXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoZWwsIHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSA9PSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oJycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5fdmFsdWVTZXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJPcHRpb25hbFRhaWwoZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoZWwsIGdldEFjdGl2ZUJ1ZmZlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbGxFdmVudFJ1bGVyKGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9hY3Rpb24gb2JqZWN0XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25PYmogIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbk9ialtcImFjdGlvblwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpc0NvbXBsZXRlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc0NvbXBsZXRlKGFjdGlvbk9ialtcImJ1ZmZlclwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVubWFza2VkdmFsdWVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSVEwgPSBhY3Rpb25PYmpbXCIkaW5wdXRcIl0uZGF0YSgnX2lucHV0bWFzaycpWydpc1JUTCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5tYXNrZWR2YWx1ZShhY3Rpb25PYmpbXCIkaW5wdXRcIl0sIGFjdGlvbk9ialtcInNraXBEYXRlcGlja2VyQ2hlY2tcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtYXNrXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2soYWN0aW9uT2JqW1wiZWxcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZm9ybWF0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbCA9ICQoe30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwuZGF0YSgnX2lucHV0bWFzaycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXNrc2V0cyc6IG1hc2tzZXRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FjdGl2ZU1hc2tzZXRJbmRleCc6IGFjdGl2ZU1hc2tzZXRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRzJzogb3B0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpc1JUTCc6IG9wdHMubnVtZXJpY0lucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5udW1lcmljSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuaXNOdW1lcmljID0gb3B0cy5udW1lcmljSW5wdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JUTCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsKCRlbCwgZmFsc2UsIGZhbHNlLCBhY3Rpb25PYmpbXCJ2YWx1ZVwiXS5zcGxpdCgnJyksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgJC5pbnB1dG1hc2sgPSB7XHJcbiAgICAgICAgICAgIC8vb3B0aW9ucyBkZWZhdWx0XHJcbiAgICAgICAgICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJfXCIsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25hbG1hcmtlcjogeyBzdGFydDogXCJbXCIsIGVuZDogXCJdXCIgfSxcclxuICAgICAgICAgICAgICAgIHF1YW50aWZpZXJtYXJrZXI6IHsgc3RhcnQ6IFwie1wiLCBlbmQ6IFwifVwiIH0sXHJcbiAgICAgICAgICAgICAgICBncm91cG1hcmtlcjogeyBzdGFydDogXCIoXCIsIGVuZDogXCIpXCIgfSxcclxuICAgICAgICAgICAgICAgIGVzY2FwZUNoYXI6IFwiXFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgbWFzazogbnVsbCxcclxuICAgICAgICAgICAgICAgIG9uY29tcGxldGU6ICQubm9vcCwgLy9leGVjdXRlcyB3aGVuIHRoZSBtYXNrIGlzIGNvbXBsZXRlXHJcbiAgICAgICAgICAgICAgICBvbmluY29tcGxldGU6ICQubm9vcCwgLy9leGVjdXRlcyB3aGVuIHRoZSBtYXNrIGlzIGluY29tcGxldGUgYW5kIGZvY3VzIGlzIGxvc3RcclxuICAgICAgICAgICAgICAgIG9uY2xlYXJlZDogJC5ub29wLCAvL2V4ZWN1dGVzIHdoZW4gdGhlIG1hc2sgaXMgY2xlYXJlZFxyXG4gICAgICAgICAgICAgICAgcmVwZWF0OiAwLCAvL3JlcGV0aXRpb25zIG9mIHRoZSBtYXNrOiAqIH4gZm9yZXZlciwgb3RoZXJ3aXNlIHNwZWNpZnkgYW4gaW50ZWdlclxyXG4gICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlLCAvL3RydWU6IGFsbG9jYXRlZCBidWZmZXIgZm9yIHRoZSBtYXNrIGFuZCByZXBldGl0aW9ucyAtIGZhbHNlOiBhbGxvY2F0ZSBvbmx5IGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgYXV0b1VubWFzazogZmFsc2UsIC8vYXV0b21hdGljYWxseSB1bm1hc2sgd2hlbiByZXRyaWV2aW5nIHRoZSB2YWx1ZSB3aXRoICQuZm4udmFsIG9yIHZhbHVlIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIF9fbG9va3VwR2V0dGVyX18gb3IgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICBjbGVhck1hc2tPbkxvc3RGb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGluc2VydE1vZGU6IHRydWUsIC8vaW5zZXJ0IHRoZSBpbnB1dCBvciBvdmVyd3JpdGUgdGhlIGlucHV0XHJcbiAgICAgICAgICAgICAgICBjbGVhckluY29tcGxldGU6IGZhbHNlLCAvL2NsZWFyIHRoZSBpbmNvbXBsZXRlIGlucHV0IG9uIGJsdXJcclxuICAgICAgICAgICAgICAgIGFsaWFzZXM6IHt9LCAvL2FsaWFzZXMgZGVmaW5pdGlvbnMgPT4gc2VlIGpxdWVyeS5pbnB1dG1hc2suZXh0ZW5zaW9ucy5qc1xyXG4gICAgICAgICAgICAgICAgb25LZXlVcDogJC5ub29wLCAvL292ZXJyaWRlIHRvIGltcGxlbWVudCBhdXRvY29tcGxldGUgb24gY2VydGFpbiBrZXlzIGZvciBleGFtcGxlXHJcbiAgICAgICAgICAgICAgICBvbktleURvd246ICQubm9vcCwgLy9vdmVycmlkZSB0byBpbXBsZW1lbnQgYXV0b2NvbXBsZXRlIG9uIGNlcnRhaW4ga2V5cyBmb3IgZXhhbXBsZVxyXG4gICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogdW5kZWZpbmVkLCAvL2V4ZWN1dGVzIGJlZm9yZSBtYXNraW5nIHRoZSBwYXN0ZWQgdmFsdWUgdG8gYWxsb3cgcHJlcHJvY2Vzc2luZyBvZiB0aGUgcGFzdGVkIHZhbHVlLiAgYXJncyA9PiBwYXN0ZWRWYWx1ZSA9PiByZXR1cm4gcHJvY2Vzc2VkVmFsdWVcclxuICAgICAgICAgICAgICAgIG9uVW5NYXNrOiB1bmRlZmluZWQsIC8vZXhlY3V0ZXMgYWZ0ZXIgdW5tYXNraW5nIHRvIGFsbG93IHBvc3Rwcm9jZXNzaW5nIG9mIHRoZSB1bm1hc2tlZHZhbHVlLiAgYXJncyA9PiBtYXNrZWRWYWx1ZSwgdW5tYXNrZWRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgc2hvd01hc2tPbkZvY3VzOiB0cnVlLCAvL3Nob3cgdGhlIG1hc2stcGxhY2Vob2xkZXIgd2hlbiB0aGUgaW5wdXQgaGFzIGZvY3VzXHJcbiAgICAgICAgICAgICAgICBzaG93TWFza09uSG92ZXI6IHRydWUsIC8vc2hvdyB0aGUgbWFzay1wbGFjZWhvbGRlciB3aGVuIGhvdmVyaW5nIHRoZSBlbXB0eSBpbnB1dFxyXG4gICAgICAgICAgICAgICAgb25LZXlWYWxpZGF0aW9uOiAkLm5vb3AsIC8vZXhlY3V0ZXMgb24gZXZlcnkga2V5LXByZXNzIHdpdGggdGhlIHJlc3VsdCBvZiBpc1ZhbGlkLiBQYXJhbXM6IHJlc3VsdCwgb3B0c1xyXG4gICAgICAgICAgICAgICAgc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlcjogXCIgXCIsIC8vYSBjaGFyYWN0ZXIgd2hpY2ggY2FuIGJlIHVzZWQgdG8gc2tpcCBhbiBvcHRpb25hbCBwYXJ0IG9mIGEgbWFza1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2x0aXA6IGZhbHNlLCAvL3Nob3cgdGhlIGFjdGl2ZW1hc2sgYXMgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgbnVtZXJpY0lucHV0OiBmYWxzZSwgLy9udW1lcmljSW5wdXQgaW5wdXQgZGlyZWN0aW9uIHN0eWxlIChpbnB1dCBzaGlmdHMgdG8gdGhlIGxlZnQgd2hpbGUgaG9sZGluZyB0aGUgY2FyZXQgcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAvL251bWVyaWMgYmFzaWMgcHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAgaXNOdW1lcmljOiBmYWxzZSwgLy9lbmFibGUgbnVtZXJpYyBmZWF0dXJlc1xyXG4gICAgICAgICAgICAgICAgcmFkaXhQb2ludDogXCJcIiwgLy9cIi5cIiwgLy8gfCBcIixcIlxyXG4gICAgICAgICAgICAgICAgc2tpcFJhZGl4RGFuY2U6IGZhbHNlLCAvL2Rpc2FibGUgcmFkaXhwb2ludCBjYXJldCBwb3NpdGlvbmluZ1xyXG4gICAgICAgICAgICAgICAgcmlnaHRBbGlnbk51bWVyaWNzOiB0cnVlLCAvL2FsaWduIG51bWVyaWNzIHRvIHRoZSByaWdodFxyXG4gICAgICAgICAgICAgICAgLy9udW1lcmljIGJhc2ljIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJzknOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05XVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2EnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbQS1aYS16XFx1MDQxMC1cXHUwNDRGXFx1MDQwMVxcdTA0NTFdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAnKic6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIltBLVphLXpcXHUwNDEwLVxcdTA0NEZcXHUwNDAxXFx1MDQ1MTAtOV1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAga2V5Q29kZToge1xyXG4gICAgICAgICAgICAgICAgICAgIEFMVDogMTgsIEJBQ0tTUEFDRTogOCwgQ0FQU19MT0NLOiAyMCwgQ09NTUE6IDE4OCwgQ09NTUFORDogOTEsIENPTU1BTkRfTEVGVDogOTEsIENPTU1BTkRfUklHSFQ6IDkzLCBDT05UUk9MOiAxNywgREVMRVRFOiA0NiwgRE9XTjogNDAsIEVORDogMzUsIEVOVEVSOiAxMywgRVNDQVBFOiAyNywgSE9NRTogMzYsIElOU0VSVDogNDUsIExFRlQ6IDM3LCBNRU5VOiA5MywgTlVNUEFEX0FERDogMTA3LCBOVU1QQURfREVDSU1BTDogMTEwLCBOVU1QQURfRElWSURFOiAxMTEsIE5VTVBBRF9FTlRFUjogMTA4LFxyXG4gICAgICAgICAgICAgICAgICAgIE5VTVBBRF9NVUxUSVBMWTogMTA2LCBOVU1QQURfU1VCVFJBQ1Q6IDEwOSwgUEFHRV9ET1dOOiAzNCwgUEFHRV9VUDogMzMsIFBFUklPRDogMTkwLCBSSUdIVDogMzksIFNISUZUOiAxNiwgU1BBQ0U6IDMyLCBUQUI6IDksIFVQOiAzOCwgV0lORE9XUzogOTFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvL3NwZWNpZnkga2V5Y29kZXMgd2hpY2ggc2hvdWxkIG5vdCBiZSBjb25zaWRlcmVkIGluIHRoZSBrZXlwcmVzcyBldmVudCwgb3RoZXJ3aXNlIHRoZSBwcmV2ZW50RGVmYXVsdCB3aWxsIHN0b3AgdGhlaXIgZGVmYXVsdCBiZWhhdmlvciBlc3BlY2lhbGx5IGluIEZGXHJcbiAgICAgICAgICAgICAgICBpZ25vcmFibGVzOiBbOCwgOSwgMTMsIDE5LCAyNywgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLCA0NSwgNDYsIDkzLCAxMTIsIDExMywgMTE0LCAxMTUsIDExNiwgMTE3LCAxMTgsIDExOSwgMTIwLCAxMjEsIDEyMiwgMTIzXSxcclxuICAgICAgICAgICAgICAgIGdldE1hc2tMZW5ndGg6IGZ1bmN0aW9uIChidWZmZXIsIGdyZWVkeSwgcmVwZWF0LCBjdXJyZW50QnVmZmVyLCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWRMZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZ3JlZWR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXBlYXQgPT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRMZW5ndGggPSBjdXJyZW50QnVmZmVyLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVwZWF0ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZExlbmd0aCArPSAoYnVmZmVyLmxlbmd0aCAqIChyZXBlYXQgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVzY2FwZVJlZ2V4OiBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BlY2lhbHMgPSBbJy8nLCAnLicsICcqJywgJysnLCAnPycsICd8JywgJygnLCAnKScsICdbJywgJ10nLCAneycsICd9JywgJ1xcXFwnXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKCcoXFxcXCcgKyBzcGVjaWFscy5qb2luKCd8XFxcXCcpICsgJyknLCAnZ2ltJyksICdcXFxcJDEnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRzID0gJC5leHRlbmQodHJ1ZSwge30sICQuaW5wdXRtYXNrLmRlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmVBbGlhcyhvcHRzLmFsaWFzLCBvcHRpb25zLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXNrU2NvcGUoZ2VuZXJhdGVNYXNrU2V0cyhvcHRzKSwgMCwgb3B0cywgeyBcImFjdGlvblwiOiBcImZvcm1hdFwiLCBcInZhbHVlXCI6IHZhbHVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJC5mbi5pbnB1dG1hc2sgPSBmdW5jdGlvbiAoZm4sIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIG9wdHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5pbnB1dG1hc2suZGVmYXVsdHMsIG9wdGlvbnMpLFxyXG4gICAgICAgICAgICAgICAgbWFza3NldHMsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChmbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtYXNrXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzb2x2ZSBwb3NzaWJsZSBhbGlhc2VzIGdpdmVuIGJ5IG9wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUFsaWFzKG9wdHMuYWxpYXMsIG9wdGlvbnMsIG9wdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IGdlbmVyYXRlTWFza1NldHMob3B0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXNrc2V0cy5sZW5ndGggPT0gMCkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrU2NvcGUoJC5leHRlbmQodHJ1ZSwge30sIG1hc2tzZXRzKSwgMCwgb3B0cywgeyBcImFjdGlvblwiOiBcIm1hc2tcIiwgXCJlbFwiOiB0aGlzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidW5tYXNrZWR2YWx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHMgPSAkaW5wdXQuZGF0YSgnX2lucHV0bWFzaycpWydtYXNrc2V0cyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzID0gJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKVsnb3B0cyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tTY29wZShtYXNrc2V0cywgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCB7IFwiYWN0aW9uXCI6IFwidW5tYXNrZWR2YWx1ZVwiLCBcIiRpbnB1dFwiOiAkaW5wdXQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gJGlucHV0LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZW1vdmVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9ICRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJylbJ21hc2tzZXRzJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cyA9ICRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3dyaXRlb3V0IHRoZSB1bm1hc2tlZHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuX3ZhbHVlU2V0KG1hc2tTY29wZShtYXNrc2V0cywgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCB7IFwiYWN0aW9uXCI6IFwidW5tYXNrZWR2YWx1ZVwiLCBcIiRpbnB1dFwiOiAkaW5wdXQsIFwic2tpcERhdGVwaWNrZXJDaGVja1wiOiB0cnVlIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NsZWFyIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucmVtb3ZlRGF0YSgnX2lucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdW5iaW5kIGFsbCBldmVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudW5iaW5kKFwiLmlucHV0bWFza1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucmVtb3ZlQ2xhc3MoJ2ZvY3VzLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzdG9yZSB0aGUgdmFsdWUgcHJvcGVydHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVQcm9wZXJ0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaW5wdXQsIFwidmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlUHJvcGVydHkgJiYgdmFsdWVQcm9wZXJ0eS5nZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Ll92YWx1ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGlucHV0LCBcInZhbHVlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGlucHV0Ll92YWx1ZUdldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IGlucHV0Ll92YWx1ZVNldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgaW5wdXQuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5fdmFsdWVHZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll9fZGVmaW5lR2V0dGVyX18oXCJ2YWx1ZVwiLCBpbnB1dC5fdmFsdWVHZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuX19kZWZpbmVTZXR0ZXJfXyhcInZhbHVlXCIsIGlucHV0Ll92YWx1ZVNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHsgLy90cnkgY2F0Y2ggbmVlZGVkIGZvciBJRTcgYXMgaXQgZG9lcyBub3Qgc3VwcG9ydHMgZGVsZXRpbmcgZm5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnB1dC5fdmFsdWVHZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnB1dC5fdmFsdWVTZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVHZXQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll92YWx1ZVNldCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImdldGVtcHR5bWFza1wiOiAvL3JldHVybiB0aGUgZGVmYXVsdCAoZW1wdHkpIG1hc2sgdmFsdWUsIHVzZWZ1bGwgZm9yIHNldHRpbmcgdGhlIGRlZmF1bHQgdmFsdWUgaW4gdmFsaWRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhKCdfaW5wdXRtYXNrJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ21hc2tzZXRzJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSB0aGlzLmRhdGEoJ19pbnB1dG1hc2snKVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFza3NldHNbYWN0aXZlTWFza3NldEluZGV4XVsnX2J1ZmZlciddLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImhhc01hc2tlZFZhbHVlXCI6IC8vY2hlY2sgd2hldGVyIHRoZSByZXR1cm5lZCB2YWx1ZSBpcyBtYXNrZWQgb3Igbm90OyBjdXJyZW50bHkgb25seSB3b3JrcyByZWxpYWJsZSB3aGVuIHVzaW5nIGpxdWVyeS52YWwgZm4gdG8gcmV0cmlldmUgdGhlIHZhbHVlIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJykgPyAhdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXS5hdXRvVW5tYXNrIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlzQ29tcGxldGVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHMgPSB0aGlzLmRhdGEoJ19pbnB1dG1hc2snKVsnbWFza3NldHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tTY29wZShtYXNrc2V0cywgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCB7IFwiYWN0aW9uXCI6IFwiaXNDb21wbGV0ZVwiLCBcImJ1ZmZlclwiOiB0aGlzWzBdLl92YWx1ZUdldCgpLnNwbGl0KCcnKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZ2V0bWV0YWRhdGFcIjogLy9yZXR1cm4gbWFzayBtZXRhZGF0YSBpZiBleGlzdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YSgnX2lucHV0bWFzaycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IHRoaXMuZGF0YSgnX2lucHV0bWFzaycpWydtYXNrc2V0cyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ21ldGFkYXRhJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgdGhlIGZuIGlzIGFuIGFsaWFzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzb2x2ZUFsaWFzKGZuLCBvcHRpb25zLCBvcHRzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tYXliZSBmbiBpcyBhIG1hc2sgc28gd2UgdHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NldCBtYXNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLm1hc2sgPSBmbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IGdlbmVyYXRlTWFza1NldHMob3B0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXNrc2V0cy5sZW5ndGggPT0gMCkgeyByZXR1cm4gdGhpczsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tTY29wZSgkLmV4dGVuZCh0cnVlLCB7fSwgbWFza3NldHMpLCBhY3RpdmVNYXNrc2V0SW5kZXgsIG9wdHMsIHsgXCJhY3Rpb25cIjogXCJtYXNrXCIsIFwiZWxcIjogdGhpcyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZm4gPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgb3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmlucHV0bWFzay5kZWZhdWx0cywgZm4pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc29sdmVBbGlhcyhvcHRzLmFsaWFzLCBmbiwgb3B0cyk7IC8vcmVzb2x2ZSBhbGlhc2VzXHJcbiAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IGdlbmVyYXRlTWFza1NldHMob3B0cyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFza3NldHMubGVuZ3RoID09IDApIHsgcmV0dXJuIHRoaXM7IH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tTY29wZSgkLmV4dGVuZCh0cnVlLCB7fSwgbWFza3NldHMpLCBhY3RpdmVNYXNrc2V0SW5kZXgsIG9wdHMsIHsgXCJhY3Rpb25cIjogXCJtYXNrXCIsIFwiZWxcIjogdGhpcyB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZuID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy9sb29rIGZvciBkYXRhLWlucHV0bWFzayBhdHJpYnV0ZSAtIHRoZSBhdHRyaWJ1dGUgc2hvdWxkIG9ubHkgY29udGFpbiBvcHRpcG5zXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ck9wdGlvbnMgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlucHV0bWFza1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ck9wdGlvbnMgJiYgYXR0ck9wdGlvbnMgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck9wdGlvbnMgPSBhdHRyT3B0aW9ucy5yZXBsYWNlKG5ldyBSZWdFeHAoXCInXCIsIFwiZ1wiKSwgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YW9wdGlvbnMgPSAkLnBhcnNlSlNPTihcIntcIiArIGF0dHJPcHRpb25zICsgXCJ9XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgZGF0YW9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmlucHV0bWFzay5kZWZhdWx0cywgZGF0YW9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUFsaWFzKG9wdHMuYWxpYXMsIGRhdGFvcHRpb25zLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuYWxpYXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmlucHV0bWFzayhvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHsgfSAvL25lZWQgYSBtb3JlIHJlbGF4IHBhcnNlSlNPTlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSkoalF1ZXJ5KTtcclxuIiwiLyohIGlDaGVjayB2MS4wLjEgYnkgRGFtaXIgU3VsdGFub3YsIGh0dHA6Ly9naXQuaW8vYXJsemVBLCBNSVQgTGljZW5zZWQgKi9cbihmdW5jdGlvbihoKXtmdW5jdGlvbiBGKGEsYixkKXt2YXIgYz1hWzBdLGU9L2VyLy50ZXN0KGQpP206L2JsLy50ZXN0KGQpP3M6bCxmPWQ9PUg/e2NoZWNrZWQ6Y1tsXSxkaXNhYmxlZDpjW3NdLGluZGV0ZXJtaW5hdGU6XCJ0cnVlXCI9PWEuYXR0cihtKXx8XCJmYWxzZVwiPT1hLmF0dHIodyl9OmNbZV07aWYoL14oY2h8ZGl8aW4pLy50ZXN0KGQpJiYhZilEKGEsZSk7ZWxzZSBpZigvXih1bnxlbnxkZSkvLnRlc3QoZCkmJmYpdChhLGUpO2Vsc2UgaWYoZD09SClmb3IoZSBpbiBmKWZbZV0/RChhLGUsITApOnQoYSxlLCEwKTtlbHNlIGlmKCFifHxcInRvZ2dsZVwiPT1kKXtpZighYilhW3BdKFwiaWZDbGlja2VkXCIpO2Y/Y1tuXSE9PXUmJnQoYSxlKTpEKGEsZSl9fWZ1bmN0aW9uIEQoYSxiLGQpe3ZhciBjPWFbMF0sZT1hLnBhcmVudCgpLGY9Yj09bCxBPWI9PW0sQj1iPT1zLEs9QT93OmY/RTpcImVuYWJsZWRcIixwPWsoYSxLK3goY1tuXSkpLE49ayhhLGIreChjW25dKSk7aWYoITAhPT1jW2JdKXtpZighZCYmXG5iPT1sJiZjW25dPT11JiZjLm5hbWUpe3ZhciBDPWEuY2xvc2VzdChcImZvcm1cIikscj0naW5wdXRbbmFtZT1cIicrYy5uYW1lKydcIl0nLHI9Qy5sZW5ndGg/Qy5maW5kKHIpOmgocik7ci5lYWNoKGZ1bmN0aW9uKCl7dGhpcyE9PWMmJmgodGhpcykuZGF0YShxKSYmdChoKHRoaXMpLGIpfSl9QT8oY1tiXT0hMCxjW2xdJiZ0KGEsbCxcImZvcmNlXCIpKTooZHx8KGNbYl09ITApLGYmJmNbbV0mJnQoYSxtLCExKSk7TChhLGYsYixkKX1jW3NdJiZrKGEseSwhMCkmJmUuZmluZChcIi5cIitJKS5jc3MoeSxcImRlZmF1bHRcIik7ZVt2XShOfHxrKGEsYil8fFwiXCIpO0I/ZS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLFwidHJ1ZVwiKTplLmF0dHIoXCJhcmlhLWNoZWNrZWRcIixBP1wibWl4ZWRcIjpcInRydWVcIik7ZVt6XShwfHxrKGEsSyl8fFwiXCIpfWZ1bmN0aW9uIHQoYSxiLGQpe3ZhciBjPWFbMF0sZT1hLnBhcmVudCgpLGY9Yj09bCxoPWI9PW0scT1iPT1zLHA9aD93OmY/RTpcImVuYWJsZWRcIix0PWsoYSxwK3goY1tuXSkpLFxudT1rKGEsYit4KGNbbl0pKTtpZighMSE9PWNbYl0pe2lmKGh8fCFkfHxcImZvcmNlXCI9PWQpY1tiXT0hMTtMKGEsZixwLGQpfSFjW3NdJiZrKGEseSwhMCkmJmUuZmluZChcIi5cIitJKS5jc3MoeSxcInBvaW50ZXJcIik7ZVt6XSh1fHxrKGEsYil8fFwiXCIpO3E/ZS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLFwiZmFsc2VcIik6ZS5hdHRyKFwiYXJpYS1jaGVja2VkXCIsXCJmYWxzZVwiKTtlW3ZdKHR8fGsoYSxwKXx8XCJcIil9ZnVuY3Rpb24gTShhLGIpe2lmKGEuZGF0YShxKSl7YS5wYXJlbnQoKS5odG1sKGEuYXR0cihcInN0eWxlXCIsYS5kYXRhKHEpLnN8fFwiXCIpKTtpZihiKWFbcF0oYik7YS5vZmYoXCIuaVwiKS51bndyYXAoKTtoKEcrJ1tmb3I9XCInK2FbMF0uaWQrJ1wiXScpLmFkZChhLmNsb3Nlc3QoRykpLm9mZihcIi5pXCIpfX1mdW5jdGlvbiBrKGEsYixkKXtpZihhLmRhdGEocSkpcmV0dXJuIGEuZGF0YShxKS5vW2IrKGQ/XCJcIjpcIkNsYXNzXCIpXX1mdW5jdGlvbiB4KGEpe3JldHVybiBhLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK1xuYS5zbGljZSgxKX1mdW5jdGlvbiBMKGEsYixkLGMpe2lmKCFjKXtpZihiKWFbcF0oXCJpZlRvZ2dsZWRcIik7YVtwXShcImlmQ2hhbmdlZFwiKVtwXShcImlmXCIreChkKSl9fXZhciBxPVwiaUNoZWNrXCIsST1xK1wiLWhlbHBlclwiLHU9XCJyYWRpb1wiLGw9XCJjaGVja2VkXCIsRT1cInVuXCIrbCxzPVwiZGlzYWJsZWRcIix3PVwiZGV0ZXJtaW5hdGVcIixtPVwiaW5cIit3LEg9XCJ1cGRhdGVcIixuPVwidHlwZVwiLHY9XCJhZGRDbGFzc1wiLHo9XCJyZW1vdmVDbGFzc1wiLHA9XCJ0cmlnZ2VyXCIsRz1cImxhYmVsXCIseT1cImN1cnNvclwiLEo9L2lwYWR8aXBob25lfGlwb2R8YW5kcm9pZHxibGFja2JlcnJ5fHdpbmRvd3MgcGhvbmV8b3BlcmEgbWluaXxzaWxrL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtoLmZuW3FdPWZ1bmN0aW9uKGEsYil7dmFyIGQ9J2lucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cIicrdSsnXCJdJyxjPWgoKSxlPWZ1bmN0aW9uKGEpe2EuZWFjaChmdW5jdGlvbigpe3ZhciBhPWgodGhpcyk7Yz1hLmlzKGQpP1xuYy5hZGQoYSk6Yy5hZGQoYS5maW5kKGQpKX0pfTtpZigvXihjaGVja3x1bmNoZWNrfHRvZ2dsZXxpbmRldGVybWluYXRlfGRldGVybWluYXRlfGRpc2FibGV8ZW5hYmxlfHVwZGF0ZXxkZXN0cm95KSQvaS50ZXN0KGEpKXJldHVybiBhPWEudG9Mb3dlckNhc2UoKSxlKHRoaXMpLGMuZWFjaChmdW5jdGlvbigpe3ZhciBjPWgodGhpcyk7XCJkZXN0cm95XCI9PWE/TShjLFwiaWZEZXN0cm95ZWRcIik6RihjLCEwLGEpO2guaXNGdW5jdGlvbihiKSYmYigpfSk7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGEmJmEpcmV0dXJuIHRoaXM7dmFyIGY9aC5leHRlbmQoe2NoZWNrZWRDbGFzczpsLGRpc2FibGVkQ2xhc3M6cyxpbmRldGVybWluYXRlQ2xhc3M6bSxsYWJlbEhvdmVyOiEwLGFyaWE6ITF9LGEpLGs9Zi5oYW5kbGUsQj1mLmhvdmVyQ2xhc3N8fFwiaG92ZXJcIix4PWYuZm9jdXNDbGFzc3x8XCJmb2N1c1wiLHc9Zi5hY3RpdmVDbGFzc3x8XCJhY3RpdmVcIix5PSEhZi5sYWJlbEhvdmVyLEM9Zi5sYWJlbEhvdmVyQ2xhc3N8fFxuXCJob3ZlclwiLHI9KFwiXCIrZi5pbmNyZWFzZUFyZWEpLnJlcGxhY2UoXCIlXCIsXCJcIil8MDtpZihcImNoZWNrYm94XCI9PWt8fGs9PXUpZD0naW5wdXRbdHlwZT1cIicraysnXCJdJzstNTA+ciYmKHI9LTUwKTtlKHRoaXMpO3JldHVybiBjLmVhY2goZnVuY3Rpb24oKXt2YXIgYT1oKHRoaXMpO00oYSk7dmFyIGM9dGhpcyxiPWMuaWQsZT0tcitcIiVcIixkPTEwMCsyKnIrXCIlXCIsZD17cG9zaXRpb246XCJhYnNvbHV0ZVwiLHRvcDplLGxlZnQ6ZSxkaXNwbGF5OlwiYmxvY2tcIix3aWR0aDpkLGhlaWdodDpkLG1hcmdpbjowLHBhZGRpbmc6MCxiYWNrZ3JvdW5kOlwiI2ZmZlwiLGJvcmRlcjowLG9wYWNpdHk6MH0sZT1KP3twb3NpdGlvbjpcImFic29sdXRlXCIsdmlzaWJpbGl0eTpcImhpZGRlblwifTpyP2Q6e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIixvcGFjaXR5OjB9LGs9XCJjaGVja2JveFwiPT1jW25dP2YuY2hlY2tib3hDbGFzc3x8XCJpY2hlY2tib3hcIjpmLnJhZGlvQ2xhc3N8fFwiaVwiK3UsbT1oKEcrJ1tmb3I9XCInK2IrJ1wiXScpLmFkZChhLmNsb3Nlc3QoRykpLFxuQT0hIWYuYXJpYSxFPXErXCItXCIrTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikucmVwbGFjZShcIjAuXCIsXCJcIiksZz0nPGRpdiBjbGFzcz1cIicraysnXCIgJysoQT8ncm9sZT1cIicrY1tuXSsnXCIgJzpcIlwiKTttLmxlbmd0aCYmQSYmbS5lYWNoKGZ1bmN0aW9uKCl7Zys9J2FyaWEtbGFiZWxsZWRieT1cIic7dGhpcy5pZD9nKz10aGlzLmlkOih0aGlzLmlkPUUsZys9RSk7Zys9J1wiJ30pO2c9YS53cmFwKGcrXCIvPlwiKVtwXShcImlmQ3JlYXRlZFwiKS5wYXJlbnQoKS5hcHBlbmQoZi5pbnNlcnQpO2Q9aCgnPGlucyBjbGFzcz1cIicrSSsnXCIvPicpLmNzcyhkKS5hcHBlbmRUbyhnKTthLmRhdGEocSx7bzpmLHM6YS5hdHRyKFwic3R5bGVcIil9KS5jc3MoZSk7Zi5pbmhlcml0Q2xhc3MmJmdbdl0oYy5jbGFzc05hbWV8fFwiXCIpO2YuaW5oZXJpdElEJiZiJiZnLmF0dHIoXCJpZFwiLHErXCItXCIrYik7XCJzdGF0aWNcIj09Zy5jc3MoXCJwb3NpdGlvblwiKSYmZy5jc3MoXCJwb3NpdGlvblwiLFwicmVsYXRpdmVcIik7RihhLCEwLEgpO1xuaWYobS5sZW5ndGgpbS5vbihcImNsaWNrLmkgbW91c2VvdmVyLmkgbW91c2VvdXQuaSB0b3VjaGJlZ2luLmkgdG91Y2hlbmQuaVwiLGZ1bmN0aW9uKGIpe3ZhciBkPWJbbl0sZT1oKHRoaXMpO2lmKCFjW3NdKXtpZihcImNsaWNrXCI9PWQpe2lmKGgoYi50YXJnZXQpLmlzKFwiYVwiKSlyZXR1cm47RihhLCExLCEwKX1lbHNlIHkmJigvdXR8bmQvLnRlc3QoZCk/KGdbel0oQiksZVt6XShDKSk6KGdbdl0oQiksZVt2XShDKSkpO2lmKEopYi5zdG9wUHJvcGFnYXRpb24oKTtlbHNlIHJldHVybiExfX0pO2Eub24oXCJjbGljay5pIGZvY3VzLmkgYmx1ci5pIGtleXVwLmkga2V5ZG93bi5pIGtleXByZXNzLmlcIixmdW5jdGlvbihiKXt2YXIgZD1iW25dO2I9Yi5rZXlDb2RlO2lmKFwiY2xpY2tcIj09ZClyZXR1cm4hMTtpZihcImtleWRvd25cIj09ZCYmMzI9PWIpcmV0dXJuIGNbbl09PXUmJmNbbF18fChjW2xdP3QoYSxsKTpEKGEsbCkpLCExO2lmKFwia2V5dXBcIj09ZCYmY1tuXT09dSkhY1tsXSYmRChhLGwpO2Vsc2UgaWYoL3VzfHVyLy50ZXN0KGQpKWdbXCJibHVyXCI9PVxuZD96OnZdKHgpfSk7ZC5vbihcImNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlb3ZlciBtb3VzZW91dCB0b3VjaGJlZ2luLmkgdG91Y2hlbmQuaVwiLGZ1bmN0aW9uKGIpe3ZhciBkPWJbbl0sZT0vd258dXAvLnRlc3QoZCk/dzpCO2lmKCFjW3NdKXtpZihcImNsaWNrXCI9PWQpRihhLCExLCEwKTtlbHNle2lmKC93bnxlcnxpbi8udGVzdChkKSlnW3ZdKGUpO2Vsc2UgZ1t6XShlK1wiIFwiK3cpO2lmKG0ubGVuZ3RoJiZ5JiZlPT1CKW1bL3V0fG5kLy50ZXN0KGQpP3o6dl0oQyl9aWYoSiliLnN0b3BQcm9wYWdhdGlvbigpO2Vsc2UgcmV0dXJuITF9fSl9KX19KSh3aW5kb3cualF1ZXJ5fHx3aW5kb3cuWmVwdG8pO1xuIl19
