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
    var element = "<option value=''>--Selecciona--</option>";
    var cliente = contracts.cliente;
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
    $("#extra-client-contract").html(element);
    $("#extra-client-name").val(cliente['nombres'] + " " + cliente['apellidos'])
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
    if(href == "#payments" ||href == "#detalles_de_pago" || href == "#descuento" || href == "#month-and-date" || href == "#reconect-service") {
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
    var form, contractId, extraService, serviceCost, equipment, eMac, router, rMac;

    contractId = $("#extra-client-contract").val();
    serviceCost = $("#extra-service-cost").val();
    extraService = $("#select-extra-service").val();
    equipment = $("#extra-equipo").val();
    eMac = $("#extra-e-mac").val();
    router = $("#extra-router").val();
    rMac = $("#extra-r-mac").val();

    var is_empty = isEmpty([contractId, extraService, serviceCost]);
    if (!is_empty) {
      form = 'id_contrato=' + contractId + "&costo_servicio=" + serviceCost + "&nombre_servicio=" + extraService;
      form += '&nombre_equipo=' + equipment + "&mac_equipo=" + eMac + "&router=" + router + "&mac_router=" + rMac;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbHMuanMiLCJmdW5jdGlvbnMuanMiLCJiYXNlLmpzIiwiY29udHJvbGxlcnMuanMiLCJhamF4LmpzIiwiYWpheDIuanMiLCJjaWVycmVDYWphLmpzIiwiYWRtaW5sdGUubWluLmpzIiwianF1ZXJ5LmlucHV0bWFzay5qcyIsImljaGVjay5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzU0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJmb290Mi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQkFTRV9VUkwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgXCIvXCI7XHJcbmlmKEJBU0VfVVJMLmluY2x1ZGVzKFwibG9jYWxob3N0XCIpIHx8IEJBU0VfVVJMLmluY2x1ZGVzKCduZ3Jvay5pbycpKXtcclxuICBCQVNFX1VSTCArPSAnaWNwYXltZW50Lyc7XHJcbn1cclxuXHJcbnZhciBNRVNTQUdFX1NVQ0NFU1MgPSAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmRvbmVfYWxsPC9pPic7XHJcbnZhciBNRVNTQUdFX0VSUk9SICAgPSAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmVycm9yX291dGxpbmU8L2k+JztcclxudmFyIE1FU1NBR0VfSU5GTyAgICA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+aW5mb19vdXRsaW5lPC9pPic7XHJcbnZhciBTVU1NRVJfU0tZICAgICAgPSAnIzFGQTFEMCdcclxuXHJcbi8qKlxyXG4gKiBDb25uZWN0IEFuZCBTZW5kXHJcbiAqIENvbmVjdGEgYWwgc2Vydmlkb3IgdmlhIGFqYXggeSBtdWVzdHJhIGVsIG1lbnNhamUgZGUgcmVzcHVlc3RhXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVXJsIGEgZG9uZGUgc2UgdmEgYSBtYW5kYXIgbGEgZWwgZm9ybXVsYXJpbywgc2luIGxhIGJhc2VfdXJsXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNfbWVzc2FnZSBTaSBzZSBlc3BlcmEgdW4gbWVuc2FqZSBvIG5vIGNvbW8gcmVzcHVlc3RhIFxyXG4gKiBAcGFyYW0ge2NhbGxiYWNrfSByZWNvZ25pemVFbGVtZW50cyBGdW5jaW9uIHBhcmEgcmVjb25vY2VyIGxvcyBlbGVtZW50b3MgYXV0b2dlbmVyYWRvc1xyXG4gKiBAcGFyYW0gez9jYWxsYmFja30gYWN0aW9uIGNhbGxiYWNrIHF1ZSByZWNpYmUgbG9zIGRhdG9zIGRlc2RlIGVsIHNlcnZpZG9yIHBhcmEgaGFjZXIgYWxnbyBjb24gZWxsb3NcclxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm0gZm9ybXVsYXJpbyBhIHNlciBlbnZpYWRvIGFsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7Y2FsbGJhY2t9IGNhbGxiYWNrIGZ1bmNpb24gYSBzZXIgZWplY3V0YWRhIGRlc3B1ZXMgcXVlIHRvZG8gc2UgY3VtcGxhLCBjb21vIGdldCB1c2Vyc1xyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBsb2FkaW5nIGZ1bmN0aW9uIGZvciBsb2FkaW5nXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gY29ubmVjdEFuZFNlbmQodXJsLGlzX21lc3NhZ2UscmVjb2duaXplRWxlbWVudHMsYWN0aW9uLGZvcm0sY2FsbGJhY2ssbG9hZGluZyl7XHJcbiAgaWYoIWxvYWRpbmcpIGxvYWRpbmcgPSBsaW5lTG9hZFxyXG4gIHZhciBjb25uZWN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0ID8gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgOiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTsgXHJcbiAgICBjb25uZWN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjb25uZWN0LnJlYWR5U3RhdGUgPT0gNCAmJiBjb25uZWN0LnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgIGlmKGxvYWRpbmcpbG9hZGluZyh0cnVlKTtcclxuICAgICAgICAgIGlmIChhY3Rpb24gIT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICBhY3Rpb24oY29ubmVjdC5yZXNwb25zZVRleHQscmVjb2duaXplRWxlbWVudHMpOyAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKGlzX21lc3NhZ2Upe1xyXG4gICAgICAgICAgICAgIGRpc3BsYXlNZXNzYWdlKGNvbm5lY3QucmVzcG9uc2VUZXh0KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoY2FsbGJhY2sgIT0gbnVsbCljYWxsYmFjaygpO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGVsc2UgaWYgKGNvbm5lY3QucmVhZHlTdGF0ZSAhPSA0KSB7XHJcbiAgICAgICAgICBpZihsb2FkaW5nKWxvYWRpbmcoZmFsc2UpOyAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0Lm9wZW4oXCJQT1NUXCIsQkFTRV9VUkwgKyB1cmwsIHRydWUpO1xyXG4gICAgY29ubmVjdC5zZXRSZXF1ZXN0SGVhZGVyKFwiY29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xyXG4gICAgY29ubmVjdC5zZW5kKGZvcm0pO1xyXG59XHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICAgRnVuY2lvbmVzIGRlIG1lbnNhamVzIHkgbm90aWZpY2FjaW9uZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuLyoqXHJcbiAqIERpc3BsYXkgTWVzc2FnZVxyXG4gKiBNdWVzdHJhIHVuYSBub3RpZmljYWNpb24gZGVsIHJlc3VsdGFkbyBkZSBsYSBjb25zdWx0YVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBzdHJpbmcgdG8gYmUgZGlzcGxheWVkIFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlNZXNzYWdlKG1lc3NhZ2Upe1xyXG4gIHZhciBjb2xvciA9IFwicmdiYSgxMDIsMTg3LDEwNiwxKVwiO1xyXG4gIHZhciB0b2FzdCxzcGFuO1xyXG5cclxuICAgIGlmKG1lc3NhZ2UuaW5jbHVkZXMoTUVTU0FHRV9FUlJPUikpe1xyXG4gICAgICBjb2xvciA9IFwicmdiYSgyNDQsNjcsNTQsMSlcIjtcclxuICAgIH1lbHNlIGlmKG1lc3NhZ2UuaW5jbHVkZXMoTUVTU0FHRV9JTkZPKSl7XHJcbiAgICAgIGNvbG9yID0gXCJyZ2JhKDIsMTM2LDIwOSwxKVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0ID0gJChcIi50b2FzdFwiKVxyXG4gICAgc3BhbiA9IHRvYXN0LmZpbmQoXCJzcGFuXCIpLmh0bWwobWVzc2FnZSk7XHJcbiAgICBzcGFuLmNzcyh7YmFja2dyb3VuZDpjb2xvcn0pO1xyXG4gICAgdG9hc3QuY3NzKHtkaXNwbGF5OlwiZmxleFwifSk7XHJcbiAgICBcclxuICAgIHRvYXN0LmFuaW1hdGUoe29wYWNpdHk6XCIxXCJ9LDUwMCxmdW5jdGlvbigpe1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRvYXN0LmFuaW1hdGUoe29wYWNpdHk6XCIwXCJ9KTtcclxuICAgICAgICB0b2FzdC5jc3Moe2Rpc3BsYXk6XCJub25lXCJ9KTtcclxuICAgICAgfSwgMjAwMCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheUFsZXJ0KHRpdGxlLG1lc3NhZ2UsdHlwZSl7XHJcbiAgaWYoIXRpdGxlKSB0aXRsZSA9IFwiUmV2aXNlXCI7XHJcbiAgaWYoIW1lc3NhZ2UpIG1lc3NhZ2UgPSBcIkFzZWd1cmF0ZSBkZSBsbGVuYXIgdG9kb3MgbG9zIGNhbXBvc1wiXHJcbiAgaWYoIXR5cGUpIHR5cGUgPSBcImVycm9yXCJcclxuICBzd2FsKHtcclxuICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICB0ZXh0OiBtZXNzYWdlLFxyXG4gICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ2xhc3M6ICdidG4nLFxyXG4gICAgICBidXR0b25zU3R5bGluZzogZmFsc2VcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgZnVjbmlvbmVzIHBhcmEgTGxlbmFyIHRhYmxhcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIExsZW5hIGxhIHRhYmxhIGFjdHVhbCBjb24gbG9zIGRhdG9zIHF1ZSB2aWVuZW4gZGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSAkY29udGVudCBFbCBodG1sIGNvbiBsb3MgZGF0b3MgYSBzZXIgbW9zdHJhZG9zLCB2aWVuZW4gc2llbXByZSBkZXNkZSBlbCBzZXJ2aWRvclxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBFbCBjYWxsYmFjayBwYXJhIHJlY29ub2NlciBhIGxvcyBudWV2b3MgaXRlbXNcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbmZ1bmN0aW9uIGZpbGxDdXJyZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2ssdGFibGVJRCl7XHJcbiAgdmFyICR0YWJsZVxyXG4gICQoXCJodG1sXCIpLnJlbW92ZUNsYXNzKFwiZ3JfX2ljcGF5bWVudC1zb2Z0X2NvbVwiKVxyXG4gIGlmKHRhYmxlSUQgIT0gdW5kZWZpbmVkKXtcclxuICAgICR0YWJsZSA9ICQoJyMnK3RhYmxlSUQgKyBcIiB0Ym9keVwiKTtcclxuICB9ZWxzZXtcclxuICAgICR0YWJsZSA9ICQoJ1tjbGFzcyo9XCJ0LVwiXSB0Ym9keScpO1xyXG4gIH1cclxuICAkdGFibGUuaHRtbCgkY29udGVudCk7XHJcbiAgaWYoY2FsbGJhY2spIGNhbGxiYWNrKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMbGVuYSBsYSB0YWJsYSBjbGllbnRlcyB1dGlsaXphbmRvIGxhIGZ1bmNpb24gZmlsbEN1cnJlbnRUYWJsZSBwYXNhbmRvbGUgbGEgdGFibGEgY2xpZW50ZXMgY29tbyB2YWxvclxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZnVuY3Rpb24gZmlsbENsaWVudFRhYmxlKCRjb250ZW50LGNhbGxiYWNrKXtcclxuICBmaWxsQ3VycmVudFRhYmxlKCRjb250ZW50LGNhbGxiYWNrLFwidC1jbGllbnRzXCIpO1xyXG59XHJcblxyXG4vKipcclxuICogTGxlbmEgbGEgdGFibGEgY2FqYSB1dGlsaXphbmRvIGxhIGZ1bmNpb24gZmlsbEN1cnJlbnRUYWJsZSBwYXNhbmRvbGUgbGEgdGFibGEgY2xpZW50ZXMgY29tbyB2YWxvclxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZnVuY3Rpb24gZmlsbENhamFUYWJsZSgkY29udGVudCxjYWxsYmFjayl7XHJcbiAgZmlsbEN1cnJlbnRUYWJsZSgkY29udGVudCxjYWxsYmFjayxcImNhamFcIik7XHJcbiAgaWYoY2FsbGJhY2spY2FsbGJhY2soKTtcclxufVxyXG4vKipcclxuICogTGxlbmEgbGEgTGlzdGEgZGUgcGFnb3Mvbm90aWZpY2FjaW9uZXMgY29uIGxvcyBkYXRvcyBxdWUgdmllbmVuIGRlbCBzZXJ2aWRvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gJGNvbnRlbnQgRWwgaHRtbCBjb24gbG9zIGRhdG9zIGEgc2VyIG1vc3RyYWRvcywgdmllbmVuIHNpZW1wcmUgZGVzZGUgZWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgRWwgY2FsbGJhY2sgcGFyYSByZWNvbm9jZXIgYSBsb3MgbnVldm9zIGl0ZW1zXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZmlsbFBheW1lbnRzTGlzdCgkY29udGVudCxjYWxsYmFjayl7XHJcbiAgdmFyICRjb250YWluZXIgPSAkKFwiLmxpc3QtbmV4dHBheW1lbnRzXCIpO1xyXG4gICRjb250YWluZXIuaHRtbCgkY29udGVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbGxBdmVyaWFzTGlzdCgkY29udGVudCxjYWxsYmFjayl7XHJcbiAgdmFyICRjb250YWluZXIgPSAkKFwiI2F2ZXJpYXMtbGlzdFwiKTtcclxuICAkY29udGFpbmVyLmh0bWwoJGNvbnRlbnQpO1xyXG4gIGNhbGxiYWNrKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbGxJbnN0YWxsYXRpb25zTGlzdCgkY29udGVudCxjYWxsYmFjayl7XHJcbiAgdmFyICRjb250YWluZXIgPSAkKFwiI2luc3RhbGxhdGlvbnMtbGlzdFwiKTtcclxuICAkY29udGFpbmVyLmh0bWwoJGNvbnRlbnQpO1xyXG4gIGNhbGxiYWNrKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VDb250cmFjdExpc3QocmVzcG9uc2UsY2FsbGJhY2spe1xyXG4gIGlmKHJlc3BvbnNlICE9IFwibmFkYVwiKXtcclxuICAgIFxyXG4gICAgdmFyIGNvbnRyYWN0cyA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG4gICAgdmFyIHZhbHVlLHNlcnZpY2UsZXF1aXBtZW50LGVNYWMscm91dGVyLHJNYWMsY29kZTtcclxuICAgIHZhciBlbGVtZW50ID0gXCI8b3B0aW9uIHZhbHVlPScnPi0tU2VsZWNjaW9uYS0tPC9vcHRpb24+XCI7XHJcbiAgICB2YXIgY2xpZW50ZSA9IGNvbnRyYWN0cy5jbGllbnRlO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250cmFjdHMuY29udHJhdG9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhbHVlICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJpZF9jb250cmF0b1wiXTtcclxuICAgICAgc2VydmljZSAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcInNlcnZpY2lvXCJdO1xyXG4gICAgICBlcXVpcG1lbnQgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wibm9tYnJlX2VxdWlwb1wiXTtcclxuICAgICAgcm91dGVyICAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcInJvdXRlclwiXTtcclxuICAgICAgZU1hYyAgICAgID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcIm1hY19lcXVpcG9cIl07XHJcbiAgICAgIHJNYWMgICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJtYWNfcm91dGVyXCJdO1xyXG4gICAgICBjb2RlICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJjb2RpZ29cIl07XHJcbiAgICAgIGVsZW1lbnQgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIiArIHZhbHVlICsgXCInIGRhdGEtc2VydmljZT0nXCIrc2VydmljZStcIicgIGRhdGEtZXF1aXBtZW50PSdcIitlcXVpcG1lbnQrXCInICBkYXRhLWUtbWFjPSdcIitlTWFjK1wiJ1wiO1xyXG4gICAgICBlbGVtZW50ICs9IFwiIGRhdGEtcm91dGVyPSdcIityb3V0ZXIrXCInICBkYXRhLXItbWFjPSdcIityTWFjK1wiJyBkYXRhLWNvZGU9J1wiK2NvZGUrXCInPlwiO1xyXG4gICAgICBlbGVtZW50ICs9IHZhbHVlICtcIjwvb3B0aW9uPlwiOyAgXHJcbiAgICB9XHJcbiAgICAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS5odG1sKGVsZW1lbnQpO1xyXG4gICAgJChcIiNleHRyYS1jbGllbnQtbmFtZVwiKS52YWwoY2xpZW50ZVsnbm9tYnJlcyddICsgXCIgXCIgKyBjbGllbnRlWydhcGVsbGlkb3MnXSlcclxuICB9ZWxzZXtcclxuICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfRVJST1IgKyBcIiBFc3RlIGNsaWVudGUgbm8gZXhpc3RlIHJldmlzZSBzdSBjZWR1bGEgcG9yIGZhdm9yXCIpO1xyXG4gIH1cclxuICBcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJUYm9keShvYmplY0lkKXtcclxuICAkKG9iamVjSWQpLmh0bWwoXCJcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbGxDbGllbnRGaWVsZHMocmVzcG9uc2UsY2FsbGJhY2spe1xyXG4gIGlmKHJlc3BvbnNlICE9IFwibmFkYVwiKXsgXHJcbiAgICB2YXIgY2xpZW50ZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG4gICAgJChcIiNhdmVyaWFzLWNsaWVudC1pZFwiKS52YWwoY2xpZW50ZVsnaWRfY2xpZW50ZSddKTtcclxuICAgICQoXCIjYS1jbGllbnRcIikudmFsKGNsaWVudGVbJ25vbWJyZXMnXSArIFwiIFwiICsgY2xpZW50ZVsnYXBlbGxpZG9zJ10pXHJcbiAgfWVsc2V7XHJcbiAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0VSUk9SICsgXCIgRXN0ZSBjbGllbnRlIG5vIGV4aXN0ZSByZXZpc2Ugc3UgY2VkdWxhIHBvciBmYXZvclwiKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VQYXltZW50TGlzdChyZXNwb25zZSxjYWxsYmFjayl7XHJcbiAgdmFyIHNlbGVjdFBheVVudGlsID0gJCgnI3NlbGVjdC1wYXktdW50aWwnKTtcclxuICBzZWxlY3RQYXlVbnRpbC5odG1sKHJlc3BvbnNlKTtcclxuICBzZWxlY3RQYXlVbnRpbC5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gIHNlbGVjdFBheVVudGlsLmNoYW5nZSgpO1xyXG4gIGlmKGNhbGxiYWNrKWNhbGxiYWNrKCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogaXNFbXB0eVxyXG4gKiBWZXJpZmljYSBzaSBsb3MgdmFsb3JlcyBkYWRvcyBlc3RhbiB2YWNpb3MgbyBzb24gbnVsb3MgXHJcbiAqIEBwYXJhbSB7QXJyYXkuIDwgc3RyaW5nfSB2YWx1ZXNcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWVzLGlzX251bSl7XHJcbiAgZm9yKHZhciBpID0gMCA7IGkgPCB2YWx1ZXMubGVuZ3RoIDsgaSsrKXtcclxuICAgIGlmICh2YWx1ZXNbaV0gPT0gbnVsbCB8fCB2YWx1ZXNbaV0gPT0gXCJcIil7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2FsZG8obW9uZXkpe1xyXG4gIG1vbmV5ID0gXCJSRCQgXCIrIEN1cnJlbmN5Rm9ybWF0KG1vbmV5KVxyXG4gICQoXCIuY3VycmVudC1zYWxkb1wiKS50ZXh0KG1vbmV5KTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVDb3VudCgkY29udGVudCl7XHJcbiAgJChcIi50b3RhbC1yb3dzXCIpLmh0bWwoJGNvbnRlbnQpO1xyXG59XHJcbi8vICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcclxuLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlciBwYXNzd29yZHMgdmFsaWRhdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4vLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbi8vICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcclxuLy9cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTW9kYWwoJG1vZGFsSWQpe1xyXG4gIHZhciAkdXNlclBhc3N3b3JkID0gJCgkbW9kYWxJZCsnIC5wYXNzd29yZCcpO1xyXG4gIHZhciAkdXNlclBhc3N3b3JkQ29uZmlybSA9ICQoJG1vZGFsSWQrJyAucGFzc3dvcmQtY29uZmlybScpO1xyXG4gIHZhciAkc2F2ZUJ1dHRvbiA9ICQoJG1vZGFsSWQrJyAuc2F2ZScpO1xyXG4gIFxyXG4gICR1c2VyUGFzc3dvcmRDb25maXJtLm9uKCdibHVyIGtleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVUd28oJHVzZXJQYXNzd29yZCwkdXNlclBhc3N3b3JkQ29uZmlybSwkc2F2ZUJ1dHRvbik7XHJcbiAgfSk7XHJcbiAgJHNhdmVCdXR0b24ub24oJ2NsaWNrJyxjbGVhckZvcm0oJG1vZGFsSWQpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVUd28oJGZpcnN0T2JqZWN0LCRzZWNvbmRPYmplY3QsJGJ1dHRvbil7XHJcbiAgICBpZigkc2Vjb25kT2JqZWN0LnZhbCgpID09ICRmaXJzdE9iamVjdC52YWwoKSAmJiAkc2Vjb25kT2JqZWN0LnZhbCgpICE9IFwiXCIpe1xyXG4gICAgICByZXBsYWNlQ2xhc3MoJGZpcnN0T2JqZWN0LnBhcmVudCgpLFwiaGFzLWVycm9yXCIsXCJoYXMtc3VjY2Vzc1wiKTtcclxuICAgICAgcmVwbGFjZUNsYXNzKCRzZWNvbmRPYmplY3QucGFyZW50KCksXCJoYXMtZXJyb3JcIixcImhhcy1zdWNjZXNzXCIpO1xyXG4gICAgICAkYnV0dG9uLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiLFwiXCIpO1xyXG5cclxuICAgIH1lbHNle1xyXG4gICAgICAgcmVwbGFjZUNsYXNzKCRmaXJzdE9iamVjdC5wYXJlbnQoKSxcImhhcy1zdWNjZXNzXCIsXCJoYXMtZXJyb3JcIik7XHJcbiAgICAgICByZXBsYWNlQ2xhc3MoJHNlY29uZE9iamVjdC5wYXJlbnQoKSxcImhhcy1zdWNjZXNzXCIsXCJoYXMtZXJyb3JcIik7XHJcbiAgICAgICAkYnV0dG9uLmF0dHIoXCJkaXNhYmxlZFwiLFwiXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVRoaXMoKXtcclxuICB2YXIgJHVzZXJQYXNzd29yZCA9ICQoJy5wYXNzd29yZCcpO1xyXG4gIHZhciAkdXNlclBhc3N3b3JkQ29uZmlybSA9ICQoJy5wYXNzd29yZC1jb25maXJtJyk7XHJcbiAgdmFyICRzYXZlQnV0dG9uID0gJCgnLnNhdmUnKTtcclxuICBcclxuICAkdXNlclBhc3N3b3JkLm9uKCdibHVyIGtleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVUd28oJHVzZXJQYXNzd29yZCwkdXNlclBhc3N3b3JkQ29uZmlybSwkc2F2ZUJ1dHRvbik7XHJcbiAgfSk7XHJcbiAgJHVzZXJQYXNzd29yZENvbmZpcm0ub24oJ2JsdXIga2V5dXAnLGZ1bmN0aW9uKCl7XHJcbiAgICB2YWxpZGF0ZVR3bygkdXNlclBhc3N3b3JkLCR1c2VyUGFzc3dvcmRDb25maXJtLCRzYXZlQnV0dG9uKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJGb3JtKG1vZGFsSWQpe1xyXG4gICQobW9kYWxJZCArIFwiIGlucHV0XCIpLnZhbChcIlwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlVmFsaWRhdGlvbigkaW5wdXRFbGVtZW50LCB0ZXh0LCAkYnV0dG9uVG9BY3RpdmUpe1xyXG4gIHZhciBpbm5lclRleHQ7XHJcbiAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICB2YXIgc2VsZiAgPSB0aGlzO1xyXG4gICRpbnB1dEVsZW1lbnQub24oXCJrZXl1cFwiLGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIGlubmVyVGV4dCA9ICQodGhpcykudmFsKCkgXHJcbiAgICBpZihpbm5lclRleHQudG9Mb3dlckNhc2UoKSA9PSBzZWxmLnRleHQudG9Mb3dlckNhc2UoKSl7XHJcbiAgICAgICRidXR0b25Ub0FjdGl2ZS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcblxyXG4gICAgfWVsc2V7XHJcbiAgICAgICRidXR0b25Ub0FjdGl2ZS5hdHRyKFwiZGlzYWJsZWRcIixcIlwiKTtcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG4vLyArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXHJcbi8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1bmNpb25lcyBkZSB1dGlsZXJpYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4vLyArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXHJcbi8vXHJcblxyXG5cclxuZnVuY3Rpb24gcmVwbGFjZUNsYXNzKCRvYmplY3Qsb2xkQ2xhc3MsbmV3Q2xhc3Mpe1xyXG4gICAkb2JqZWN0LmFkZENsYXNzKG5ld0NsYXNzKTtcclxuICAgJG9iamVjdC5yZW1vdmVDbGFzcyhvbGRDbGFzcylcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVNlcnZpY2VDYXJkQ2xpY2thYmxlKCl7XHJcbiAgICB2YXIgc2VydmljZUNhcmQgICAgICA9ICQoXCIuc2VydmljZS1jYXJkXCIpO1xyXG4gICAgdmFyIGJ0blByaW50Q29udHJhY3QgPSAkKCcjYnRuLXByaW50LXJlcXVpcmVtZW50Jyk7XHJcblxyXG4gICAgc2VydmljZUNhcmQub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyICR0aGlzICAgICAgID0gJCh0aGlzKTtcclxuICAgICAgdmFyIHNlcnZpY2VfaWQgID0gJHRoaXMuYXR0cignZGF0YS1pZCcpOyBcclxuICAgICAgdmFyIHBheW1lbnQgICAgID0gJHRoaXMuYXR0cignZGF0YS1wYXltZW50Jyk7XHJcbiAgICAgIHZhciByZWFsTGluayAgICA9IGJ0blByaW50Q29udHJhY3QuYXR0cignZGF0YS1ocmVmJylcclxuICAgICAgXHJcbiAgICAgIHNlcnZpY2VDYXJkLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAkdGhpcy5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgYnRuUHJpbnRDb250cmFjdC5hdHRyKFwiaHJlZlwiLHJlYWxMaW5rICsgXCIvXCIgKyBzZXJ2aWNlX2lkKTtcclxuICAgICAgJCgnI2NvbnRyYWN0LWNsaWVudC1wYXltZW50JykudmFsKHBheW1lbnQpXHJcbiAgICB9KVxyXG59XHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICBWZXJpZnkgUm93cyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbmZ1bmN0aW9uIHZlcmlmeUNvbnRyYWN0U3RhdHVzKCl7XHJcbiAgJChcIi50ZC1lc3RhZG9cIikuZWFjaChmdW5jdGlvbihpLHZhbHVlKXtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICB2YXIgdGV4dCA9ICR0aGlzLnRleHQoKS50cmltKCk7XHJcbiAgICBpZih0ZXh0ID09IFwiYWN0aXZvXCIpe1xyXG4gICAgICAkdGhpcy5jc3Moe2NvbG9yOlwiZ3JlZW5cIn0pXHJcbiAgICB9ZWxzZSBpZih0ZXh0ID09IFwic2FsZGFkb1wiKXtcclxuICAgICAgJHRoaXMucGFyZW50cyhcInRyXCIpLmNzcyh7YmFja2dyb3VuZDpcInJnYmEoMjIsMjU1LDAsLjMpXCIsY29sb3I6XCIjNTU1XCJ9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdmVyaWZ5Q2xpZW50U3RhdHVzKCl7XHJcbiAgICQoXCJ0ZFwiKS5lYWNoKGZ1bmN0aW9uKGksdmFsdWUpe1xyXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgIHZhciB0ZXh0ID0gJHRoaXMudGV4dCgpLnRyaW0oKTtcclxuICAgIGlmKHRleHQgPT0gXCJubyBhY3Rpdm9cIil7XHJcbiAgICAgICR0aGlzLmNzcyh7Y29sb3I6XCJyZ2JhKDIwMCwwLDAsLjcpXCJ9KVxyXG4gICAgfWVsc2UgaWYodGV4dCA9PSBcImFjdGl2b1wiKXtcclxuICAgICAgJHRoaXMuY3NzKHtjb2xvcjpcImdyZWVuXCJ9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogICAgICAgICAgICAgICAgICAgICAgIExvYWRlcnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmZ1bmN0aW9uIGhlYXZ5TG9hZChzdG9wKXtcclxuICBpZighc3RvcCl7XHJcbiAgICB2YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVwiaGVhdnktbG9hZGVyIGFjdGl2ZVwiPidcclxuICAgICAgICBodG1sICs9ICAgJzxkaXYgY2xhc3M9XCJjaXJjbGUtbG9hZFwiPjwvZGl2PidcclxuICAgICAgICBodG1sICs9ICAgJzxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+UHJlcGFyYW5kbyBsb3MgZGF0b3M8L2Rpdj4nXHJcbiAgICAgICAgaHRtbCArPSAnPC9kaXY+J1xyXG4gICAgJChcImJvZHlcIikuYXBwZW5kKGh0bWwpXHJcbiAgICAkKFwiYm9keVwiKS5jc3Moe292ZXJmbG93OlwiaGlkZGVuXCJ9KTtcclxuICAgIHZhciBtZXNzYWdlID0gJChcIi5oZWF2eS1sb2FkZXIgLm1lc3NhZ2VcIik7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIkNvbmZpZ3VyYW5kby4uLlwiKTtcclxuICAgIH0sNDAwMClcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgbWVzc2FnZS50ZXh0KFwiQ2FzaSBUZXJtaW5hbW9zIC4uLlwiKTtcclxuICAgIH0sODAwMClcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgbWVzc2FnZS50ZXh0KFwiVGVybWluYW5kbyBlbCBwcm9jZXNvIC4uLlwiKTtcclxuICAgICAgcmVtb3ZlTG9hZGVyKCk7XHJcbiAgICB9LDE1MDAwKVxyXG4gIH1lbHNle1xyXG4gICAgcmVtb3ZlTG9hZGVyKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmVMb2FkZXIoKXtcclxuICAgIHZhciBsb2FkZXIgPSAkKFwiLmhlYXZ5LWxvYWRlclwiKTtcclxuICAgIGxvYWRlci5yZW1vdmUoKTtcclxuICAgICQoXCJib2R5XCIpLmNzcyh7b3ZlcmZsb3c6XCJhdXRvXCJ9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpbmVMb2FkKHN0b3ApIHtcclxuICBpZighc3RvcCl7XHJcbiAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtcclxuICAgICAgZGlzcGxheTogXCJibG9ja1wiXHJcbiAgICAgIH0pO1xyXG4gIH1lbHNle1xyXG4gICAgJChcIi5sb2FkZXJcIikuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xyXG4gIH1cclxufSIsIi8vIGZ1bmNpb25lcyBkZSBib290c3RyYXBcclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlUGFzc3dvcmQocGFzc3dvcmQpe1xyXG4gIHZhciBleHByZXNzaW9uID0gJyc7XHJcbiAgdmFyIGhhc19sb3dlcmNhc2UgPSBmYWxzZTtcclxuICB2YXIgaGFzX3VwcGVyY2FzZSA9IGZhbHNlO1xyXG4gIHZhciBoYXNfZGlnaXQgPSAnLypcXGQnO1xyXG5cclxuICBpZihwYXNzd29yZC5sZW5ndGggPiA4KSBhbGVydChcIm1heW9yIGEgOFwiKVxyXG4gIGlmKC9cXGQvLnRlc3QocGFzc3dvcmQpKWFsZXJ0KFwidGllbmUgZGlnaXRvXCIpXHJcbiAgaWYoL1thLXpdLy50ZXN0KHBhc3N3b3JkKSlhbGVydChcInRpZW5lIG1pbmlzY3VsYXNcIilcclxuICBpZigvW0EtWl0vLnRlc3QocGFzc3dvcmQpKSBhbGVydCgndGllbmUgbWF5dXNjdWxhcycpXHJcbn0iLCIkKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGN1cnJlbnRQYWdlID0gJChcInRpdGxlXCIpLnRleHQoKS5zcGxpdChcIiBcIik7XHJcbiAgY3VycmVudFBhZ2UgICA9IGN1cnJlbnRQYWdlWzRdLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gIGlmKGN1cnJlbnRQYWdlID09IFwiYWRtaW5pc3RyYWRvclwiKSB7XHJcbiAgICBuZXdVc2VyRm9ybSgpO1xyXG4gIH1cclxuICBnZXREYXRlKCk7XHJcbiAgYWRtaW5GdW5jdGlvbnMoKTtcclxuICB1c2VySW5mb1RpcCgpO1xyXG4gIG1ha2VTZXJ2aWNlQ2FyZENsaWNrYWJsZSgpO1xyXG4gIGRldGFpbHNGdW5jdGlvbnMoKTtcclxuICBub3RpZmljYXRpb25GdW5jdGlvbnMoKTtcclxuICBuZXdDb250cmFjdEZ1bmN0aW9ucygpO1xyXG4gIGNoZWNrV2luZG93U2l6ZSgpO1xyXG4gICQod2luZG93KS5vbigncmVzaXplJyxmdW5jdGlvbigpe1xyXG4gICAgY2hlY2tXaW5kb3dTaXplKCk7XHJcbiAgfSlcclxuICBcclxuLyoqXHJcbiAqIEdldCBEYXRlOlxyXG4gKiBPYnRpZW5lIGxhIGZlY2hhIGFjdHVhbCBhbCBzZWd1bmRvIHkgbGEgbXVlc3RyYSBlbiBsYSBwYW50YWxsYSBkZSBpbmljaW9cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbmZ1bmN0aW9uIGdldERhdGUoKXtcclxuICB2YXIgJGRheSA9ICQoJy5kYXknKTtcclxuICB2YXIgJG1vbnRoWWVhciA9ICQoJy5tb250aC15ZWFyJyk7XHJcbiAgdmFyICRkYXlXZWVrID0gJCgnLmRheXdlZWsnKTtcclxuICB2YXIgJEhvcmEgPSAkKCcuaG91ciBzcGFuJyk7XHJcbiAgdmFyIGRhdGUsZGF5LG1vbnRoLHllYXIsc0hvdXI7XHJcbiAgdmFyIGRheXMgPSBbXCJEb21pbmdvXCIsXCJMdW5lc1wiLFwiTWFydGVzXCIsXCJNaWVyY29sZXNcIixcIkp1ZXZlc1wiLFwiVmllcm5lc1wiLFwiU2FiYWRvXCJdO1xyXG4gIHZhciBtb250aHMgPSBbXCJFbmVyb1wiLFwiRmVicmVyb1wiLFwiTWFyem9cIixcIkFicmlsXCIsXCJNYXlvXCIsXCJKdW5pb1wiLFwiSnVsaW9cIixcIkFnb3N0b1wiLFwiU2VwdGllbWJyZVwiLFwiT2N0dWJyZVwiLFwiTm92aWVtYnJlXCIsXCJEaWNpZW1icmVcIl07XHJcblxyXG4gIHNldEludGVydmFsKHVwZGF0ZUhvdXIsMTAwMCk7XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUhvdXIoKXtcclxuICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgc0RhdGUgPSBkYXRlLnRvU3RyaW5nKClcclxuICAgICRkYXkudGV4dChkYXRlLmdldERhdGUoKSk7XHJcbiAgICAkbW9udGhZZWFyLnRleHQoXCJEZSBcIiArIG1vbnRoc1tkYXRlLmdldE1vbnRoKCldICsgXCIgZGUgXCIgKyBkYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgJGRheVdlZWsudGV4dChkYXlzW2RhdGUuZ2V0RGF5KCldKTtcclxuICAgIFxyXG4gICAgc0hvdXIgPSBtb21lbnQoKS5mb3JtYXQoJ0xUUycpO1xyXG4gICAgICRIb3JhLmh0bWwoc0hvdXIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFkbWluIEZ1bmN0aW9uczpcclxuICogc2UgZW5jYXJnYSBkZSBlbCBtb3ZpbWllbnRvIGRlIGxvcyBwYW5lbGVzIGVuIGxhIHBhbnRhbGxhICdhZG1pbmlzdHJhZG9yJ1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGFkbWluRnVuY3Rpb25zKCl7XHJcbiAgJCgnI2NvbXBhbnktc2VjdGlvbicpLmFuaW1hdGUoe2xlZnQ6XCIwXCJ9LDIwMClcclxuICAkKCcuYWRtaW5pc3RyYWRvciAuYXNpZGUtYnV0dG9ucyBhJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICB2YXIgY2FyZE5hbWUgPSAkdGhpcy5hdHRyKCdocmVmJykuc2xpY2UoMSk7XHJcbiAgICBpZihjYXJkTmFtZSAhPSBudWxsKXtcclxuICAgICAgJCgnLmNvbXBhbnktZGV0YWlscycpLmFuaW1hdGUoe2xlZnQ6XCItMTEwJVwifSwyMDApXHJcbiAgICAgICQoJyMnK2NhcmROYW1lKycuY29tcGFueS1kZXRhaWxzJykuYW5pbWF0ZSh7bGVmdDpcIjBcIn0sMjAwKVxyXG4gICAgfSAgXHJcbiAgfSlcclxuXHJcbiAgaWYoJChcIiNhY291bnQtc2VjdGlvblwiKS5sZW5ndGggPiAwKXtcclxuICAgICQoJyNhY291bnQtc2VjdGlvbicpLmFuaW1hdGUoe2xlZnQ6XCIwXCJ9LDIwMClcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBuZXcgVXNlciBGb3JtOlxyXG4gKiB2YWlkYSBsYXMgY29udHJhc2XDsWFzIGVuIGxvcyBmb3JtdWxhcmlvcyBkZSBsb3MgdXN1YXJpb3NcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbmZ1bmN0aW9uIG5ld1VzZXJGb3JtKCl7XHJcbiAgdmFsaWRhdGVNb2RhbChcIiNuZXctdXNlci1tb2RhbFwiKTtcclxuICB2YWxpZGF0ZU1vZGFsKFwiI3VwZGF0ZS11c2VyLW1vZGFsXCIpO1xyXG59XHJcblxyXG4vKipcclxuICogVXNlciBJbmZvIFRpcFxyXG4gKiBoYWNlIHVuIHRvZ2dsZSBlbiBsYSB2aXNpYmlsaWRhZCBkZSBsYSBpbmZvIGRlbCB1c3VhcmlvXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiB1c2VySW5mb1RpcCgpe1xyXG4gIHZhciBpbmZvVGlwID0gJChcIi51c2VyLWluZm8tdGlwXCIpO1xyXG4gIHZhciBwcm9maWxlUGljdHVyZSA9ICQoXCIucHJvZmlsZS1waWN0dXJlXCIpO1xyXG4gIHZhciBidG5Nb3JlID0gJChcIi5idG4tbW9yZVwiKTtcclxuXHJcbiAgYnRuTW9yZS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgaW5mb1RpcC50b2dnbGVDbGFzcyhcInZpc2libGVcIik7XHJcbiAgfSk7XHJcbn1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBuZXdDb250cmFjdEZ1bmN0aW9ucygpe1xyXG4gIHZhciBidG5QcmludENvbnRyYWN0ID0gJChcIiNidG4tcHJpbnQtY29udHJhY3RcIik7XHJcbiAgdmFyIGRvY3VtZW50ID0gJChcIi5ub3RlLWl0ZW1cIik7XHJcbiAgdmFyIHJhZGlvQWN0aXZhdGVDb250cmFjdCA9ICQoXCIjcmFkaW8tbmV3LWNvbnRyYWN0XCIpO1xyXG4gIHZhciByYWRpb0Rpc2FibGVDb250cmFjdCA9ICQoXCIjcmFkaW8tanVzdC1yZXF1aXJlbWVudFwiKTtcclxuICB2YXIgY29udHJhY3RDb250cm9scyA9ICQoXCIuY29udHJhY3QtY29udHJvbHNcIik7XHJcbiAgdmFyIHJlcXVpcmVtZW50Q29udHJvbHMgPSAkKFwiLnJlcXVpcmVtZW50LWNvbnRyb2xzXCIpO1xyXG5cclxuICByYWRpb0FjdGl2YXRlQ29udHJhY3QucGFyZW50cyhcImxhYmVsXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgYWN0aXZhdGVDb250cmFjdE1vZGUoKTsgXHJcblxyXG4gIH0pO1xyXG5cclxuICByYWRpb0Rpc2FibGVDb250cmFjdC5wYXJlbnRzKFwibGFiZWxcIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgZGlzYWJsZUNvbnRyYWN0TW9kZSgpXHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIGFjdGl2YXRlQ29udHJhY3RNb2RlKCRidG4pe1xyXG4gICAgcmFkaW9EaXNhYmxlQ29udHJhY3RcclxuICAgICAgLnJlbW92ZUF0dHIoXCJjaGVja2VkXCIsXCJcIilcclxuICAgICAgLmh0bWwoXCJcIilcclxuICAgIHJhZGlvQWN0aXZhdGVDb250cmFjdFxyXG4gICAgICAuYXR0cihcImNoZWNrZWRcIixcIlwiKVxyXG4gICAgICAuaHRtbChcIiYjMTAwMDQ7XCIpXHJcbiAgICBkb2N1bWVudC5yZW1vdmVDbGFzcyhcInByaW50LXJlcXVpcmVtZW50XCIpO1xyXG4gICAgY29udHJhY3RDb250cm9scy5yZW1vdmVDbGFzcyhcImhpZGVcIilcclxuICAgIHJlcXVpcmVtZW50Q29udHJvbHMuYWRkQ2xhc3MoXCJoaWRlXCIpXHJcbiAgICBcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRpc2FibGVDb250cmFjdE1vZGUoJGJ0bil7XHJcbiAgICByYWRpb0FjdGl2YXRlQ29udHJhY3RcclxuICAgICAgLnJlbW92ZUF0dHIoXCJjaGVja2VkXCIsXCJcIilcclxuICAgICAgLmh0bWwoXCJcIilcclxuICAgIHJhZGlvRGlzYWJsZUNvbnRyYWN0XHJcbiAgICAgIC5hdHRyKFwiY2hlY2tlZFwiLFwiXCIpXHJcbiAgICAgIC5odG1sKFwiJiMxMDAwNDtcIilcclxuICAgIGRvY3VtZW50LmFkZENsYXNzKFwicHJpbnQtcmVxdWlyZW1lbnRcIik7XHJcbiAgICByZXF1aXJlbWVudENvbnRyb2xzLnJlbW92ZUNsYXNzKFwiaGlkZVwiKVxyXG4gICAgY29udHJhY3RDb250cm9scy5hZGRDbGFzcyhcImhpZGVcIilcclxuICB9XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RhbHMgRnVuY3Rpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuJCgnI3NlYXJjaC1jbGllbnQtbW9kYWwnKS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gIHZhciBidXR0b24gPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpO1xyXG4gIGNsaWVudFRhYmxlLmluaXQoKTtcclxuICB2YXIgdGl0bGUgPSBidXR0b24uZmluZCgnLnNlY3Rpb24tdGl0bGUnKS50ZXh0KCk7XHJcbiAgaWYoIXRpdGxlKSB0aXRsZSA9IFwiQnVzY2FyIENsaWVudGVcIlxyXG4gIGlmKHRpdGxlLnRvTG93ZXJDYXNlKCkudHJpbSgpID09IFwicmVnaXN0cmFyIHBhZ29cIil7XHJcbiAgICBidXR0b25UZXh0ID0gXCJpciBhIFBhZ29zXCJcclxuICB9ZWxzZXtcclxuICAgIGJ1dHRvblRleHQgPSBcIk51ZXZvIENvbnRyYXRvXCJcclxuICB9XHJcbiAgXHJcbiAgdmFyIG1vZGFsID0gJCh0aGlzKVxyXG4gIG1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLnRleHQodGl0bGUpXHJcbiAgbW9kYWwuZmluZCgnLm1vZGFsLWZvb3RlciAuc2F2ZScpLnRleHQoYnV0dG9uVGV4dClcclxuICBtb2RhbC5maW5kKCd0Ym9keScpLmh0bWwoJycpXHJcbn0pXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICAgICAgICBvdGhlciBmdW5jdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmZ1bmN0aW9uIGRldGFpbHNGdW5jdGlvbnMoKXtcclxuICB2YXIgc21hbGxCdXR0b25zU2VsZWN0ID0gJCgnLmJ0bi1zbWFsbCcpO1xyXG5cclxuICAkKCdbcm9sZT1cInRhYlwiXScpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIHZhciBocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKVxyXG4gICAgaWYoaHJlZiA9PSBcIiNwYXltZW50c1wiIHx8aHJlZiA9PSBcIiNkZXRhbGxlc19kZV9wYWdvXCIgfHwgaHJlZiA9PSBcIiNkZXNjdWVudG9cIiB8fCBocmVmID09IFwiI21vbnRoLWFuZC1kYXRlXCIgfHwgaHJlZiA9PSBcIiNyZWNvbmVjdC1zZXJ2aWNlXCIpIHtcclxuICAgICAgJChcIi5wYXltZW50LWNvbnRyb2xzXCIpLmFkZENsYXNzKFwidmlzaWJsZVwiKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAkKFwiLnBheW1lbnQtY29udHJvbHNcIikucmVtb3ZlQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGhyZWYgPT0gXCIjY29udHJhY3RzXCIpe1xyXG4gICAgICAkKFwiLmNvbnRyYWN0LWNvbnRyb2xzXCIpLmFkZENsYXNzKFwidmlzaWJsZVwiKVxyXG4gICAgfWVsc2V7XHJcbiAgICAgICQoXCIuY29udHJhY3QtY29udHJvbHNcIilcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0VGFiQ29udHJvbHMoJCh0aGlzKSk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5idG4tc21hbGwnKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICBzbWFsbEJ1dHRvbnNTZWxlY3QucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRhYkNvbnRyb2xzKCR0aGlzKXtcclxuICB2YXIgY29udHJvbHMgPSAkdGhpcy5hdHRyKFwiYXJpYS1jb250cm9sc1wiKTtcclxuICAkKFwiLmR5bmFtaWMtY29udHJvbHNcIikudGV4dChjb250cm9scyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vdGlmaWNhdGlvbkZ1bmN0aW9ucygpe1xyXG4gIHZhciBidG5BdmVyaWFzICAgICAgPSAkKFwiI2J0bi1zZWUtYXZlcmlhc1wiKTtcclxuICB2YXIgYnRuUGFnb3MgICAgICAgID0gJChcIiNidG4tc2VlLXBhZ29zXCIpO1xyXG4gIHZhciBidG5DYWphQ2hpY2EgICAgPSAkKCcjYnRuLXNlZS1jYWphJyk7XHJcbiAgdmFyIGJ0bkRldWRvcmVzICAgICA9ICQoXCIjYnRuLXNlZS1kZXVkb3Jlc1wiKVxyXG4gIHZhciBidG5EYXlJbmNvbWVzICAgPSAkKFwiI2J0bi1zZWUtZGF5LWluY29tZXNcIilcclxuICB2YXIgbGF5b3V0Q29udGFpbmVyID0gJChcIi5sYXlvdXQtY29udGFpbmVyXCIpO1xyXG5cclxuICBidG5BdmVyaWFzLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGxheW91dENvbnRhaW5lci5hbmltYXRlKHtsZWZ0OlwiLTEwMCVcIn0sMjAwKTtcclxuICB9KTtcclxuXHJcbiAgYnRuUGFnb3Mub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgbGF5b3V0Q29udGFpbmVyLmFuaW1hdGUoe2xlZnQ6XCIwXCJ9LDIwMCk7XHJcbiAgfSk7XHJcblxyXG4gIGJ0bkRldWRvcmVzLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGxheW91dENvbnRhaW5lci5hbmltYXRlKHtsZWZ0OlwiLTIwMCVcIn0sMjAwKTtcclxuICB9KTtcclxuXHJcbiAgIGJ0bkRheUluY29tZXMub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgbGF5b3V0Q29udGFpbmVyLmFuaW1hdGUoe2xlZnQ6XCItMzAwJVwifSwyMDApO1xyXG4gIH0pO1xyXG59XHJcblxyXG4kKFwiI3NlbGVjdC1leHRyYS1zZXJ2aWNlXCIpLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XHJcbiAgdmFyICR0aGlzID0gJCgoXCIjc2VsZWN0LWV4dHJhLXNlcnZpY2UgOnNlbGVjdGVkXCIpKTtcclxuICB2YXIgY29zdCA9ICR0aGlzLmF0dHIoXCJkYXRhLXBheW1lbnRcIik7XHJcbiAgXHJcbiAgJChcIiNleHRyYS1zZXJ2aWNlLWNvc3RcIikudmFsKGNvc3QpXHJcbn0pO1xyXG5cclxuJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIikub24oJ2NoYW5nZScsZnVuY3Rpb24oKXtcclxuICB2YXIgJHRoaXMgPSAkKChcIiNleHRyYS1jbGllbnQtY29udHJhY3QgOnNlbGVjdGVkXCIpKTtcclxuICBcclxuICAkKFwiI2V4dHJhLWNvbnRyYWN0LXNlcnZpY2VcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLXNlcnZpY2VcIikpO1xyXG4gICQoXCIjZXh0cmEtZXF1aXBvXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1lcXVpcG1lbnRcIikpO1xyXG4gICQoXCIjZXh0cmEtcm91dGVyXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1yb3V0ZXJcIikpO1xyXG4gICQoXCIjZXh0cmEtZS1tYWNcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWUtbWFjXCIpKTtcclxuICAkKFwiI2V4dHJhLXItbWFjXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1yLW1hY1wiKSk7XHJcbiAgJChcIiNleHRyYS1jb2RlXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1jb2RlXCIpKTtcclxufSk7XHJcblxyXG4kKFwiLmNvbHVtbnMtcmlnaHRcIikucmVtb3ZlQ2xhc3MoXCJwdWxsLXJpZ2h0XCIpO1xyXG5cclxuJChcIiNzZWxlY3QtY29udHJhY3QtY29kZVwiKS5vbignY2hhbmdlJyxmdW5jdGlvbigpe1xyXG4gIHZhciAkdGhpcyA9ICQoKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlIDpzZWxlY3RlZFwiKSk7XHJcbiAgJChcIiNjb250cmFjdC1pcFwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtaXAtZmluYWxcIikpO1xyXG4gICQoXCIjdS1jb250cmFjdC1pcFwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtaXAtZmluYWxcIikpO1xyXG4gXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY2hlY2tXaW5kb3dTaXplKCkge1xyXG4gIHZhciB3aWR0aCA9IHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aDtcclxuICB2YXIgYnJhbmROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJyYW5kIHNwYW4nKTtcclxuICBcclxuICBpZih3aWR0aCA8PSAxMTAwKXtcclxuICAgIGJyYW5kTmFtZS50ZXh0Q29udGVudCA9IFwiUFwiO1xyXG4gIH1lbHNle1xyXG4gICAgYnJhbmROYW1lLnRleHRDb250ZW50ID0gXCJQYXltZW50XCI7XHJcbiAgfVxyXG59XHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICBwb3NpdGlvbiA9ICQod2luZG93KS5zY3JvbGxUb3AoKVxyXG4gIG1vdmFibGVOYXYgPSAkKCcuYXNpZGUtbmF2LWNvbnRhaW5lciwgLmFzaWRlLXdpZGUtbGVmdCcpXHJcblxyXG4gIGlmKHBvc2l0aW9uID49IDUwKXtcclxuICAgIG1vdmFibGVOYXYuYWRkQ2xhc3MoJ21vdmVkJylcclxuICB9ZWxzZXtcclxuICAgIG1vdmFibGVOYXYucmVtb3ZlQ2xhc3MoJ21vdmVkJylcclxuICB9XHJcbn0pIiwidmFyIFVzZXJzID0ge1xyXG4gIGFkZDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG5pY2ssIHBhc3N3b3JkLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlLCBpc19lbXB0eTtcclxuXHJcbiAgICBuaWNrICAgICAgPSAkKFwiI3VzZXItbmlja25hbWVcIikudmFsKCk7XHJcbiAgICBwYXNzd29yZCAgPSAkKFwiI3VzZXItcGFzc3dvcmRcIikudmFsKCk7XHJcbiAgICBuYW1lICAgICAgPSAkKFwiI3VzZXItbmFtZVwiKS52YWwoKTtcclxuICAgIGxhc3RuYW1lICA9ICQoXCIjdXNlci1sYXN0bmFtZVwiKS52YWwoKTtcclxuICAgIGRuaSAgICAgICA9IGdldFZhbCgkKFwiI3VzZXItZG5pXCIpKTtcclxuICAgIHR5cGUgICAgICA9ICQoXCIjdXNlci10eXBlXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW25pY2ssIHBhc3N3b3JkLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbmlja25hbWU9JyArIG5pY2sgKyBcIiZwYXNzd29yZD1cIiArIHBhc3N3b3JkICsgXCImbmFtZT1cIiArIG5hbWUgKyBcIiZsYXN0bmFtZT1cIiArIGxhc3RuYW1lO1xyXG4gICAgICBmb3JtICs9IFwiJmRuaT1cIiArIGRuaSArIFwiJnR5cGU9XCIgKyB0eXBlO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInVzZXIvYWRkbmV3XCIsIHRydWUsIGluaXRBZG1pbkhhbmRsZXJzLCBudWxsLCBmb3JtLCBVc2Vycy5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBuaWNrLCBwYXNzd29yZCwgbmFtZSwgbGFzdG5hbWUsIGRuaSwgdHlwZTtcclxuXHJcbiAgICBuaWNrICAgICA9ICQoXCIjZS1uaWNrbmFtZVwiKS52YWwoKTtcclxuICAgIG5hbWUgICAgID0gJChcIiNlLW5hbWVcIikudmFsKCk7XHJcbiAgICBsYXN0bmFtZSA9ICQoXCIjZS1sYXN0bmFtZVwiKS52YWwoKTtcclxuICAgIGRuaSAgICAgID0gJChcIiNlLWRuaVwiKS52YWwoKTtcclxuICAgIHR5cGUgICAgID0gJChcIiNlLXR5cGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbbmljaywgbmFtZSwgbGFzdG5hbWUsIGRuaSwgdHlwZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ25pY2tuYW1lPScgKyBuaWNrICsgXCImbmFtZT1cIiArIG5hbWUgKyBcIiZsYXN0bmFtZT1cIiArIGxhc3RuYW1lO1xyXG4gICAgICBmb3JtICs9IFwiJmRuaT1cIiArIGRuaSArIFwiJnR5cGU9XCIgKyB0eXBlO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInVzZXIvdXBkYXRlXCIsIHRydWUsIGluaXRBZG1pbkhhbmRsZXJzLCBudWxsLCBmb3JtLCBVc2Vycy5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGU9dXNlcnNcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL2dldHVzZXJzJywgZmFsc2UsIGluaXRBZG1pbkhhbmRsZXJzLCB1c2VyVGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZGVsZXRlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBmb3JtID0gXCJ1c2VyX2lkPVwiICsgaWQ7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgndXNlci9kZWxldGV1c2VyJywgdHJ1ZSwgaW5pdEFkbWluSGFuZGxlcnMsIG51bGwsIGZvcm0sIFVzZXJzLmdldEFsbCk7XHJcbiAgfSxcclxuXHJcbiAgY29uZmlybVBhc3N3b3JkOiBmdW5jdGlvbih1c2VySWQsY3VycmVudFBhc3N3b3JkKSB7XHJcbiAgICB2YXIgZm9ybSA9ICd1c2VyX2lkPScrIHVzZXJJZCArJyZjdXJyZW50X3Bhc3N3b3JkPScgKyBjdXJyZW50UGFzc3dvcmQ7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgndXNlci9jb25maXJtX3Bhc3N3b3JkJywgZmFsc2UsIGZhbHNlLCBwcm9jZXNzQ29uZmlybURhdGEsIGZvcm0sIG51bGwsIG51bGwpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBwcm9jZXNzQ29uZmlybURhdGEocmVzcG9uc2UpIHtcclxuICAgICAgdmFyIG5ld1Bhc3N3b3JkICAgICAgICAgPSAkKFwiI2Fjb3VudC1uZXctcGFzc3dvcmRcIik7XHJcbiAgICAgIHZhciBuZXdQYXNzd29yZENvbmZpcm0gID0gJChcIiNhY291bnQtY29uZmlybS1uZXctcGFzc3dvcmRcIik7XHJcbiAgICAgIFxyXG4gICAgICBpZiAocmVzcG9uc2UgPT0gMSkgeyAgICAgIFxyXG4gICAgICAgIG5ld1Bhc3N3b3JkLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgbmV3UGFzc3dvcmRDb25maXJtLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgdmFsaWRhdGVUaGlzKCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIG5ld1Bhc3N3b3JkLmF0dHIoJ2Rpc2FibGVkJyx0cnVlKTtcclxuICAgICAgICBuZXdQYXNzd29yZENvbmZpcm0uYXR0cignZGlzYWJsZWQnLHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlUGFzc3dvcmQ6IGZ1bmN0aW9uKHVzZXJJZCxjdXJyZW50UGFzc3dvcmQsbmV3UGFzc3dvcmQpe1xyXG4gICAgdmFyIGZvcm0gPSAndXNlcl9pZD0nKyB1c2VySWQgICsgXCImY3VycmVudF9wYXNzd29yZD1cIisgY3VycmVudFBhc3N3b3JkICsnJm5ld19wYXNzd29yZD0nICsgbmV3UGFzc3dvcmQ7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgndXNlci91cGRhdGVfcGFzc3dvcmQnLCBmYWxzZSwgZmFsc2UsIFVzZXJzLnBhc3N3b3JkQ2hhbmdlZCwgZm9ybSwgbnVsbCxoZWF2eUxvYWQpO1xyXG4gIH0sXHJcblxyXG4gIHBhc3N3b3JkQ2hhbmdlZDogZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgaWYocmVzcG9uc2U9PTEpe1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX1NVQ0NFU1MgKyAnQ29udHJhc2XDsWEgQ2FtYmlhZGEgY29uIGV4aXRvJylcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gQkFTRV9VUkwgKyAnYXBwL2xvZ291dCdcclxuICAgICAgfSwzMDAwKSAgICAgIFxyXG4gICAgfWVsc2V7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfRVJST1IgKyAnIEVycm9yIGFsIGNhbWJpYXIgZGUgY29udHJhc2XDsWEsIHJldmlzZSBsYSBjb250cmFzZcOxYSBhY3R1YWwnKVxyXG4gICAgfVxyXG4gICAgICBcclxuICB9XHJcbn1cclxuXHJcbnZhciBDbGllbnRzID0ge1xyXG4gIGFkZDogZnVuY3Rpb24gKCkge1xyXG4gICAgIHZhciBmb3JtLCBub21icmVzLCBhcGVsbGlkb3MsIGNlZHVsYSwgY2VsdWxhciwgcHJvdmluY2lhLCBzZWN0b3IsIGNhbGxlLCBjYXNhLCB0ZWxlZm9ubyxcclxuICAgICAgIGx1Z2FyVHJhYmFqbywgdGVsVHJhYmFqbywgaW5ncmVzb3MsIGZlY2hhUmVnaXN0cm8sIGVzdGFkbztcclxuXHJcbiAgICBub21icmVzICAgICAgID0gJChcIiNjbGllbnQtbmFtZVwiKS52YWwoKTtcclxuICAgIGFwZWxsaWRvcyAgICAgPSAkKFwiI2NsaWVudC1sYXN0bmFtZVwiKS52YWwoKTtcclxuICAgIGNlZHVsYSAgICAgICAgPSBnZXRWYWwoJChcIiNjbGllbnQtZG5pXCIpKTtcclxuICAgIGNlbHVsYXIgICAgICAgPSBnZXRWYWwoJChcIiNjbGllbnQtcGhvbmVcIikpO1xyXG4gICAgcHJvdmluY2lhICAgICA9ICQoXCIjY2xpZW50LXByb3ZpbmNpYVwiKS52YWwoKTtcclxuICAgIHNlY3RvciAgICAgICAgPSAkKFwiI2NsaWVudC1zZWN0b3JcIikudmFsKCk7XHJcbiAgICBjYWxsZSAgICAgICAgID0gJChcIiNjbGllbnQtc3RyZWV0XCIpLnZhbCgpO1xyXG4gICAgY2FzYSAgICAgICAgICA9ICQoJyNjbGllbnQtaG91c2UnKS52YWwoKTtcclxuICAgIHRlbGVmb25vICAgICAgPSBnZXRWYWwoJCgnI2NsaWVudC10ZWxlcGhvbmUnKSk7XHJcbiAgICBsdWdhclRyYWJham8gID0gJCgnI2NsaWVudC1qb2InKS52YWwoKTtcclxuICAgIHRlbFRyYWJham8gICAgPSBnZXRWYWwoJCgnI2NsaWVudC1qb2ItdGVsZXBob25lJykpO1xyXG4gICAgaW5ncmVzb3MgICAgICA9ICQoJyNjbGllbnQtc2FsYXJ5JykudmFsKCk7XHJcbiAgICBmZWNoYVJlZ2lzdHJvID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTs7XHJcbiAgICBlc3RhZG8gICAgICAgID0gXCJubyBhY3Rpdm9cIjtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtub21icmVzLCBhcGVsbGlkb3MsIGNlZHVsYSwgY2VsdWxhciwgcHJvdmluY2lhLCBzZWN0b3IsIGNhbGxlLCBjYXNhLCB0ZWxlZm9ub10pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ25vbWJyZXM9JyArIG5vbWJyZXMgKyBcIiZhcGVsbGlkb3M9XCIgKyBhcGVsbGlkb3MgKyBcIiZjZWR1bGE9XCIgKyBjZWR1bGEgKyBcIiZjZWx1bGFyPVwiICsgY2VsdWxhcjtcclxuICAgICAgZm9ybSArPSBcIiZwcm92aW5jaWE9XCIgKyBwcm92aW5jaWEgKyBcIiZzZWN0b3I9XCIgKyBzZWN0b3IgKyBcIiZjYWxsZT1cIiArIGNhbGxlICsgXCImY2FzYT1cIiArIGNhc2EgKyBcIiZ0ZWxlZm9ubz1cIiArIHRlbGVmb25vO1xyXG4gICAgICBmb3JtICs9IFwiJmx1Z2FyX3RyYWJham89XCIgKyBsdWdhclRyYWJham8gKyBcIiZ0ZWxfdHJhYmFqbz1cIiArIHRlbFRyYWJham8gKyBcIiZpbmdyZXNvcz1cIiArIGluZ3Jlc29zICsgXCImZmVjaGFfcmVnaXN0cm89XCIgKyBmZWNoYVJlZ2lzdHJvO1xyXG4gICAgICBmb3JtICs9IFwiJmVzdGFkbz1cIiArIGVzdGFkbyArIFwiJnRhYmxhPWNsaWVudGVzXCI7XHJcblxyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvYWRkXCIsIHRydWUsIGluaXRDbGllbnRIYW5kbGVycywgbnVsbCwgZm9ybSwgQ2xpZW50cy5nZXRBbGwpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2xpZW50ZXNcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBpbml0Q2xpZW50SGFuZGxlcnMsIGNsaWVudFRhYmxlLnJlZnJlc2gsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIGdldE9uZTogZnVuY3Rpb24gKGlkLCByZWNlaXZlcikge1xyXG4gICAgZm9ybSA9IFwidGFibGE9Y2xpZW50ZXMmaWQ9XCIgKyBpZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRvbmVcIiwgZmFsc2UsIGluaXRDbGllbnRIYW5kbGVycywgcmVjZWl2ZXIsIGZvcm0sIG51bGwpXHJcbiAgfSxcclxuXHJcbiAgcmVjZWl2ZUZvckVkaXQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XHJcbiAgICB2YXIgY2xpZW50ICAgICAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB0aGlzLmlkICAgICAgICAgICAgPSBjbGllbnRbJ2lkX2NsaWVudGUnXTtcclxuICAgIHZhciAkbm9tYnJlcyAgICAgID0gJChcIiN1LWNsaWVudC1uYW1lXCIpO1xyXG4gICAgdmFyICRhcGVsbGlkb3MgICAgPSAkKFwiI3UtY2xpZW50LWxhc3RuYW1lXCIpO1xyXG4gICAgdmFyICRjZWR1bGEgICAgICAgPSAkKFwiI3UtY2xpZW50LWRuaVwiKTtcclxuICAgIHZhciAkY2VsdWxhciAgICAgID0gJChcIiN1LWNsaWVudC1waG9uZVwiKTtcclxuICAgIHZhciAkcHJvdmluY2lhICAgID0gJChcIiN1LWNsaWVudC1wcm92aW5jaWFcIik7XHJcbiAgICB2YXIgJHNlY3RvciAgICAgICA9ICQoXCIjdS1jbGllbnQtc2VjdG9yXCIpO1xyXG4gICAgdmFyICRjYWxsZSAgICAgICAgPSAkKFwiI3UtY2xpZW50LXN0cmVldFwiKTtcclxuICAgIHZhciAkY2FzYSAgICAgICAgID0gJCgnI3UtY2xpZW50LWhvdXNlJyk7XHJcbiAgICB2YXIgJHRlbGVmb25vICAgICA9ICQoJyN1LWNsaWVudC10ZWxlcGhvbmUnKTtcclxuICAgIHZhciAkbHVnYXJUcmFiYWpvID0gJCgnI3UtY2xpZW50LWpvYicpO1xyXG4gICAgdmFyICR0ZWxUcmFiYWpvICAgPSAkKCcjdS1jbGllbnQtam9iLXRlbGVwaG9uZScpO1xyXG4gICAgdmFyICRpbmdyZXNvcyAgICAgPSAkKCcjdS1jbGllbnQtc2FsYXJ5Jyk7XHJcblxyXG4gICAgJG5vbWJyZXMudmFsKGNsaWVudFsnbm9tYnJlcyddKTtcclxuICAgICRhcGVsbGlkb3MudmFsKGNsaWVudFsnYXBlbGxpZG9zJ10pXHJcbiAgICAkY2VkdWxhLnZhbChjbGllbnRbJ2NlZHVsYSddKVxyXG4gICAgJGNlbHVsYXIudmFsKGNsaWVudFsnY2VsdWxhciddKVxyXG4gICAgJHByb3ZpbmNpYS52YWwoY2xpZW50Wydwcm92aW5jaWEnXSlcclxuICAgICRzZWN0b3IudmFsKGNsaWVudFsnc2VjdG9yJ10pXHJcbiAgICAkY2FsbGUudmFsKGNsaWVudFsnY2FsbGUnXSlcclxuICAgICRjYXNhLnZhbChjbGllbnRbJ2Nhc2EnXSlcclxuICAgICR0ZWxlZm9uby52YWwoY2xpZW50Wyd0ZWxlZm9ubyddKVxyXG4gICAgJGx1Z2FyVHJhYmFqby52YWwoY2xpZW50WydsdWdhcl90cmFiYWpvJ10pXHJcbiAgICAkdGVsVHJhYmFqby52YWwoY2xpZW50Wyd0ZWxfdHJhYmFqbyddKVxyXG4gICAgJGluZ3Jlc29zLnZhbChjbGllbnRbJ3NhbGFyaW8nXSlcclxuXHJcbiAgICAkKFwiI3VwZGF0ZS1jbGllbnQtbW9kYWxcIikubW9kYWwoKTtcclxuICAgICQoXCIjYnRuLXVwZGF0ZS1jbGllbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICB1cGRhdGVDbGllbnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNsaWVudCgpIHtcclxuICAgICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbJG5vbWJyZXMudmFsKCksICRhcGVsbGlkb3MudmFsKCksICRjZWR1bGEudmFsKCksICRjZWx1bGFyLnZhbCgpLCAkcHJvdmluY2lhLnZhbCgpLCAkc2VjdG9yLnZhbCgpLCAkY2FsbGUudmFsKCksXHJcbiAgICAgICAgJGNhc2EudmFsKCksICR0ZWxlZm9uby52YWwoKVxyXG4gICAgICBdKTtcclxuXHJcbiAgICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgICBmb3JtID0gJ2lkPScgKyBpZCArICcmbm9tYnJlcz0nICsgJG5vbWJyZXMudmFsKCkgKyBcIiZhcGVsbGlkb3M9XCIgKyAkYXBlbGxpZG9zLnZhbCgpICsgXCImY2VkdWxhPVwiICsgZ2V0VmFsKCRjZWR1bGEpO1xyXG4gICAgICAgIGZvcm0gKz0gXCImY2VsdWxhcj1cIiArIGdldFZhbCgkY2VsdWxhcikgKyBcIiZwcm92aW5jaWE9XCIgKyAkcHJvdmluY2lhLnZhbCgpICsgXCImc2VjdG9yPVwiICsgJHNlY3Rvci52YWwoKSArIFwiJmNhbGxlPVwiICsgJGNhbGxlLnZhbCgpO1xyXG4gICAgICAgIGZvcm0gKz0gXCImY2FzYT1cIiArICRjYXNhLnZhbCgpICsgXCImdGVsZWZvbm89XCIgKyBnZXRWYWwoJHRlbGVmb25vKSArIFwiJmx1Z2FyX3RyYWJham89XCIgKyAkbHVnYXJUcmFiYWpvLnZhbCgpICsgXCImdGVsX3RyYWJham8gPVwiO1xyXG4gICAgICAgIGZvcm0gKz0gZ2V0VmFsKCR0ZWxUcmFiYWpvKSArIFwiJnRhYmxhPWNsaWVudGVzXCI7XHJcbiAgICAgICAgZm9ybSArPSBcIiZpbmdyZXNvcz1cIiArICRpbmdyZXNvcy52YWwoKTtcclxuXHJcbiAgICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBpbml0Q2xpZW50SGFuZGxlcnMsIG51bGwsIGZvcm0sIENsaWVudHMuZ2V0QWxsKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNhdmVPYnNlcnZhdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBvYnNlcnZhdGlvbnMsaWRDbGllbnRlO1xyXG4gXHJcbiAgICBvYnNlcnZhdGlvbnMgPSAkKFwiI3RleHQtb2JzZXJ2YXRpb25zXCIpLnZhbCgpO1xyXG4gICAgaWRDbGllbnRlICAgID0gJChcIiNkZXRhaWwtY2xpZW50LWlkXCIpLnZhbCgpO1xyXG4gXHJcbiAgICBmb3JtID0gJ29ic2VydmFjaW9uZXM9JyArIG9ic2VydmF0aW9ucyArIFwiJnRhYmxhPW9ic2VydmFjaW9uZXMmaWRfY2xpZW50ZT1cIiArIGlkQ2xpZW50ZTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbClcclxuICB9LFxyXG4gIFxyXG4gIHVwZGF0ZVN0YXRlOiBmdW5jdGlvbiAoY2xpZW50KSB7XHJcbiAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoY2xpZW50KSsgJyZtb2R1bGU9Y2xpZW50ZXMmYWN0aW9uPXVwZGF0ZSc7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGpzb24nLHRydWUsbnVsbCxudWxsLGZvcm0sIG51bGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIEdlbmVyYWxzID0ge1xyXG4gIGRlbGV0ZVJvdzogZnVuY3Rpb24gKGlkLCB0YWJsYSkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPVwiICsgdGFibGEgKyBcIiZpZD1cIiArIGlkO1xyXG4gICAgdmFyIGhhbmRsZXJzLCBjYWxsYmFjaztcclxuICAgIHN3aXRjaCAodGFibGEpIHtcclxuICAgICAgY2FzZSAnY2xpZW50ZXMnOlxyXG4gICAgICAgIGNhbGxiYWNrID0gQ2xpZW50cy5nZXRBbGw7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3NlcnZpY2lvcyc6XHJcbiAgICAgICAgY2FsbGJhY2sgPSBTZXJ2aWNlcy5nZXRBbGw7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9kZWxldGUnLCB0cnVlLG51bGwsIG51bGwsIGZvcm0sIGNhbGxiYWNrKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBtYW5kYSB1biBtZW5zYWplIGFsIHNlcnZpZG9yIGRlIGxvcyB2YWxvcmVzIGEgYnVzY2FyXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgZWwgdmFsb3IgYSBzZXIgYnVzY2Fkb1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYlRhYmxlIG5vbWJyZSBkZSBsYSB0YWJsYSBkb25kZSBzZSBkZXNlYSBjb25zdWx0YXIgZW4gbGEgYmFzZSBkZSBkYXRvc1xyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZpbGxUYWJsZUZ1bmN0aW9uIGZ1bmNpb24gZGUgbGxlbmFkbyBkZSB0YWJsYSBkb25kZSBzZSBtb3N0cmFyYW4gbG9zIHJlc3VsdGFkb3MgXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gaGFuZGxlckZ1bmN0aW9uIGZ1bmNpb24gcmVpbmljaW8gZGUgbG9zIGVsZW1lbnRvcyBlbiBsb3MgaGFuZGxlcnMgXHJcbiAgICovXHJcbiAgXHJcbiAgc2VhcmNoOiBmdW5jdGlvbiAodGV4dCwgZGJUYWJsZSwgZmlsbFRhYmxlRnVuY3Rpb24sIGhhbmRsZXJGdW5jdGlvbikge1xyXG4gICAgaWYgKGhhbmRsZXJGdW5jdGlvbiA9PSB1bmRlZmluZWQpIGhhbmRsZXJGdW5jdGlvbiA9IGluaXRDbGllbnRIYW5kbGVycztcclxuICAgIGlmIChmaWxsVGFibGVGdW5jdGlvbiA9PSB1bmRlZmluZWQpIGZpbGxUYWJsZUZ1bmN0aW9uID0gZmlsbEN1cnJlbnRUYWJsZTtcclxuICAgIHZhciB3b3JkID0gdGV4dDtcclxuICAgIGlmICh3b3JkICE9IG51bGwgfHwgd29yZCAhPSBcIlwiKSB7XHJcbiAgICAgIHZhciBmb3JtID0gXCJ0YWJsYT1cIiArIGRiVGFibGUgKyBcIiZ3b3JkPVwiICsgd29yZDtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3Mvc2VhcmNoJywgZmFsc2UsIGhhbmRsZXJGdW5jdGlvbiwgZmlsbFRhYmxlRnVuY3Rpb24sIGZvcm0sIG51bGwpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvdW50X3RhYmxlOiBmdW5jdGlvbiAodGFibGUpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1cIiArIHRhYmxlO1xyXG4gICAgdmFyIHVwZGF0ZUZ1bmN0aW9uID0gdXBkYXRlQ291bnQ7XHJcbiAgICBpZiAodGFibGUgPT0gJ2NhamEnKSB1cGRhdGVGdW5jdGlvbiA9IHVwZGF0ZUNhamFDb3VudFxyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvY291bnQnLCBmYWxzZSwgbnVsbCwgdXBkYXRlRnVuY3Rpb24sIGZvcm0sIG51bGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIFNlcnZpY2VzID0ge1xyXG4gIGFkZDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG5hbWUsIGRlc2NyaXB0aW9uLCBwYXltZW50LCB0eXBlO1xyXG5cclxuICAgIG5hbWUgICAgICAgID0gJChcIiNzZXJ2aWNlLW5hbWVcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjc2VydmljZS1kZXNjcmlwdGlvblwiKS52YWwoKTtcclxuICAgIHBheW1lbnQgICAgID0gJChcIiNzZXJ2aWNlLW1vbnRobHktcGF5bWVudFwiKS52YWwoKTtcclxuICAgIHR5cGUgICAgICAgID0gJChcIiNzZXJ2aWNlLXR5cGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbbmFtZSwgZGVzY3JpcHRpb24sIHBheW1lbnQsIHR5cGVdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdub21icmU9JyArIG5hbWUgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uICsgXCImbWVuc3VhbGlkYWQ9XCIgKyBwYXltZW50ICsgXCImdGlwbz1cIiArIHR5cGU7XHJcbiAgICAgIGZvcm0gKz0gXCImdGFibGE9c2VydmljaW9zXCI7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9hZGRcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgU2VydmljZXMuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9c2VydmljaW9zXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgc2VydmljZVRhYmxlLnJlZnJlc2gsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIGlkLCBuYW1lLCBkZXNjcmlwdGlvbiwgcGF5bWVudCwgdHlwZTtcclxuXHJcbiAgICBpZCAgICAgICAgICA9ICQoJyN1LXNlcnZpY2UtaWQnKS52YWwoKTtcclxuICAgIG5hbWUgICAgICAgID0gJCgnI3Utc2VydmljZS1uYW1lJykudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoJyN1LXNlcnZpY2UtZGVzY3JpcHRpb24nKS52YWwoKTtcclxuICAgIHBheW1lbnQgICAgID0gJCgnI3Utc2VydmljZS1tb250aGx5LXBheW1lbnQnKS52YWwoKTtcclxuICAgIHR5cGUgICAgICAgID0gJCgnI3Utc2VydmljZS10eXBlJykudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBwYXltZW50LCB0eXBlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfc2VydmljaW89JyArIGlkICsgXCImbm9tYnJlPVwiICsgbmFtZSArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb24gKyBcIiZtZW5zdWFsaWRhZD1cIiArIHBheW1lbnQ7XHJcbiAgICAgIGZvcm0gKz0gXCImdGlwbz1cIiArIHR5cGUgKyBcIiZ0YWJsYT1zZXJ2aWNpb3NcIjtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBTZXJ2aWNlcy5nZXRBbGwsaGVhdnlMb2FkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ29udHJhY3RzID0ge1xyXG4gIGFkZDogZnVuY3Rpb24gYWRkTmV3Q29udHJhY3QoKSB7XHJcbiAgICB2YXIgZm9ybSwgdGFibGUsIGNsaWVudF9pZCwgdXNlcl9pZCwgc2VydmljZV9pZCwgY29kZSwgY29udHJhY3RfZGF0ZSwgcGF5bWVudCwgZHVyYXRpb24sXHJcbiAgICAgIGVxdWlwbWVudCwgZU1hYywgcm91dGVyLCByTWFjLCB0b3RhbCwgbmV4dFBheW1lbnQsIG1vZGVsLCBpcDtcclxuXHJcbiAgICBjbGllbnRfaWQgICAgID0gJChcIiNjb250cmFjdC1jbGllbnQtaWRcIikudmFsKCk7XHJcbiAgICB1c2VyX2lkICAgICAgID0gJChcIiNjb250cmFjdC11c2VyLWlkXCIpLnZhbCgpO1xyXG4gICAgc2VydmljZV9pZCAgICA9ICQoXCIuc2VydmljZS1jYXJkLnNlbGVjdGVkXCIpLmF0dHIoJ2RhdGEtaWQnKTtcclxuICAgIGNvbnRyYWN0X2RhdGUgPSAkKCcjY29udHJhY3QtY2xpZW50LWRhdGUnKS52YWwoKTtcclxuICAgIGR1cmF0aW9uICAgICAgPSAkKCcjY29udHJhY3QtY2xpZW50LW1vbnRocycpLnZhbCgpO1xyXG4gICAgZXF1aXBtZW50ICAgICA9ICQoJyNjb250cmFjdC1lcXVpcG1lbnQnKS52YWwoKTtcclxuICAgIGVNYWMgICAgICAgICAgPSAkKCcjY29udHJhY3QtZS1tYWMnKS52YWwoKTtcclxuICAgIHJvdXRlciAgICAgICAgPSAkKCcjY29udHJhY3Qtcm91dGVyJykudmFsKCk7XHJcbiAgICByTWFjICAgICAgICAgID0gJCgnI2NvbnRyYWN0LXItbWFjJykudmFsKCk7XHJcbiAgICBtb2RlbCAgICAgICAgID0gJCgnI2NvbnRyYWN0LWVxdWlwbWVudC1tb2RlbCcpLnZhbCgpO1xyXG4gICAgaXAgICAgICAgICAgICA9ICQoJyNjb250cmFjdC1pcCcpLnZhbCgpO1xyXG4gICAgY29kZSAgICAgICAgICA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0LWNvZGVcIikudmFsKCk7XHJcblxyXG4gICAgcGF5bWVudCA9ICQoXCIjY29udHJhY3QtY2xpZW50LXBheW1lbnRcIikudmFsKCk7XHJcbiAgICBuZXh0UGF5bWVudCA9IG1vbWVudChjb250cmFjdF9kYXRlKS5hZGQoMSwgJ21vbnRocycpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2NsaWVudF9pZCwgdXNlcl9pZCwgc2VydmljZV9pZCwgY29udHJhY3RfZGF0ZSwgZHVyYXRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgdG90YWwgPSAoTnVtYmVyKGR1cmF0aW9uKSArIDEpICogTnVtYmVyKHBheW1lbnQpO1xyXG4gICAgICBmb3JtID0gJ2lkX2VtcGxlYWRvPScgKyB1c2VyX2lkICsgXCImaWRfY2xpZW50ZT1cIiArIGNsaWVudF9pZCArIFwiJmlkX3NlcnZpY2lvPVwiICsgc2VydmljZV9pZCArIFwiJmNvZGlnbz1cIiArIGNvZGUgKyBcIiZmZWNoYT1cIiArIGNvbnRyYWN0X2RhdGU7XHJcbiAgICAgIGZvcm0gKz0gXCImZHVyYWNpb249XCIgKyBkdXJhdGlvbiArIFwiJm1vbnRvX3RvdGFsPVwiICsgdG90YWwgKyBcIiZtb250b19wYWdhZG89MCZ1bHRpbW9fcGFnbz1udWxsXCI7XHJcbiAgICAgIGZvcm0gKz0gXCImbWVuc3VhbGlkYWQ9XCIgKyBwYXltZW50ICsgXCImcHJveGltb19wYWdvPVwiICsgbmV4dFBheW1lbnQgKyBcIiZlc3RhZG89YWN0aXZvJnRhYmxhPWNvbnRyYXRvc1wiO1xyXG4gICAgICBmb3JtICs9IFwiJm5vbWJyZV9lcXVpcG89XCIgKyBlcXVpcG1lbnQgKyBcIiZtYWNfZXF1aXBvPVwiICsgZU1hYyArIFwiJnJvdXRlcj1cIiArIHJvdXRlciArIFwiJm1hY19yb3V0ZXI9XCIgKyByTWFjO1xyXG4gICAgICBmb3JtICs9IFwiJm1vZGVsbz1cIiArIG1vZGVsICsgXCImaXA9XCIgKyBpcDtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2FkZFwiLCBudWxsLCBudWxsLCBDb250cmFjdHMuZ2V0TGFzdCwgZm9ybSwgbnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGV4dGVuZDogZnVuY3Rpb24oaWRDb250cmF0bykge1xyXG4gICAgdmFyIGZvcm07XHJcbiAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyBpZENvbnRyYXRvcjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9leHRlbmRcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jb250cmF0b3NcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBjb250cmFjdFRhYmxlLnJlZnJlc2gsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIGdldExhc3Q6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhLm1lbnNhamUpO1xyXG4gICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKVxyXG4gICAgJChcIiNidG4tc2F2ZS1jb250cmFjdFwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJcIik7XHJcbiAgICAkKFwiI2J0bi1wcmludC1jb250cmFjdFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICBpZihkYXRhLnRhYmxhX3BhZ29zKXtcclxuICAgICAgbWFrZVBheW1lbnRMaXN0KGRhdGEudGFibGFfcGFnb3MpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNhbGxFeHRyYTogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcm93ID0gY29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgaWYgKHJvdykge1xyXG4gICAgICAkKFwiI2V4dHJhLWNsaWVudC1kbmlcIikudmFsKHJvdy5jZWR1bGEpO1xyXG4gICAgICBDb250cmFjdHMuZ2V0QWxsT2ZDbGllbnQocm93LmNlZHVsYSk7XHJcbiAgICAgICQoJyNhZGQtZXh0cmEtbW9kYWwnKS5tb2RhbCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIlNlbGVjY2lvbmUgZWwgY29ucmF0byBwcmltZXJvXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY2FuY2VsOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciByb3cgICAgICAgID0gY29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpXHJcbiAgICB2YXIgaXNfcGVuYWx0eSA9IGZhbHNlO1xyXG4gICAgdmFyIHJlYXNvbiAgICAgPSAkKFwiI2NhbmNlbGF0aW9uLXJlYXNvblwiKS52YWwoKTtcclxuICAgIHZhciBjaGVja2VkICAgID0gJChcIiNjaGVjay1wZW5hbHR5OmNoZWNrZWRcIikubGVuZ3RoO1xyXG4gICAgdmFyIGZvcm0sIGZlY2hhO1xyXG4gICAgaWYocm93LmlkKXtcclxuICAgICAgaWYgKGNoZWNrZWQgPiAwKSB7XHJcbiAgICAgICAgaXNfcGVuYWx0eSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZmVjaGEgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyByb3cuaWQgKyAnJmZlY2hhPScgKyBmZWNoYSArICcmaWRfY2xpZW50ZT0nICsgcm93LmlkX2NsaWVudGU7XHJcbiAgICAgIGZvcm0gKz0gXCImbW90aXZvPVwiICsgcmVhc29uICsgXCImcGVuYWxpZGFkPVwiICsgaXNfcGVuYWx0eTtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvY2FuY2VsJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArXCIgTm8gaGF5IGNvbnRyYXRvIHNlbGVjY2lvbmFkb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRPbmU6IGZ1bmN0aW9uKGlkX2NvbnRyYXRvLCByZWNlaXZlcikge1xyXG4gICAgZm9ybSA9IFwidGFibGE9Y29udHJhdG9zJmlkX2NvbnRyYXRvPVwiICsgaWRfY29udHJhdG87XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvZ2V0b25lXCIsIGZhbHNlLCBudWxsLCByZWNlaXZlciwgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICByZWNpZXZlOiBmdW5jdGlvbihjb250ZW50KSB7XHJcbiAgICB2YXIgY29udHJhY3QgICAgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgdGhpcy5pZF9jb250cmF0byA9IGNvbnRyYWN0WydpZF9jb250cmF0byddO1xyXG4gICAgdmFyICRlcXVpcG8gICAgID0gJChcIiN1LWNvbnRyYWN0LWVxdWlwbWVudFwiKTtcclxuICAgIHZhciAkbWFjRXF1aXBvICA9ICQoXCIjdS1jb250cmFjdC1lLW1hY1wiKTtcclxuICAgIHZhciAkcm91dGVyICAgICA9ICQoXCIjdS1jb250cmFjdC1yb3V0ZXJcIik7XHJcbiAgICB2YXIgJG1hY1JvdXRlciAgPSAkKFwiI3UtY29udHJhY3Qtci1tYWNcIik7XHJcbiAgICB2YXIgJG1vZGVsbyAgICAgPSAkKFwiI3UtY29udHJhY3QtbW9kZWxvXCIpO1xyXG4gICAgdmFyICRjb2RpZ28gICAgID0gJChcIiNzZWxlY3QtY29udHJhY3QtY29kZVwiKTtcclxuICAgIHZhciAkaXNDaGFuZ2VJcCA9ICQoXCIjY2hlY2stY2hhbmdlLWlwXCIpO1xyXG4gICAgdmFyICRpcCAgICAgICAgID0gJChcIiN1LWNvbnRyYWN0LWlwXCIpO1xyXG5cclxuICAgICRlcXVpcG8udmFsKGNvbnRyYWN0Wydub21icmVfZXF1aXBvJ10pO1xyXG4gICAgJG1hY0VxdWlwby52YWwoY29udHJhY3RbJ21hY19lcXVpcG8nXSk7XHJcbiAgICAkcm91dGVyLnZhbChjb250cmFjdFsncm91dGVyJ10pO1xyXG4gICAgJG1hY1JvdXRlci52YWwoY29udHJhY3RbJ21hY19yb3V0ZXInXSk7XHJcbiAgICAkbW9kZWxvLnZhbChjb250cmFjdFsnbW9kZWxvJ10pO1xyXG4gICAgJGlwLnZhbChjb250cmFjdFsnaXAnXSk7XHJcblxyXG4gICAgLy8gJChcIiN1cGRhdGUtY29udHJhY3QtbW9kYWwgc2VsZWN0XCIpLnZhbCgnJylcclxuICAgICQoXCIjdXBkYXRlLWNvbnRyYWN0LW1vZGFsXCIpLm1vZGFsKCk7XHJcbiAgICAkKFwiI3VwZGF0ZS1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB1cGRhdGVDb250cmFjdChpZF9jb250cmF0byk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDb250cmFjdChpZF9jb250cmF0bykge1xyXG4gICAgICB2YXIgY2hlY2tlZCA9ICQoXCIjY2hlY2stY2hhbmdlLWlwOmNoZWNrZWRcIikubGVuZ3RoO1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyBpZF9jb250cmF0byArICcmbm9tYnJlX2VxdWlwbz0nICsgJGVxdWlwby52YWwoKSArIFwiJm1hY19lcXVpcG89XCIgKyAkbWFjRXF1aXBvLnZhbCgpO1xyXG4gICAgICBmb3JtICs9IFwiJnJvdXRlcj1cIiArICRyb3V0ZXIudmFsKCkgKyBcIiZtYWNfcm91dGVyPVwiICsgJG1hY1JvdXRlci52YWwoKTtcclxuICAgICAgZm9ybSArPSBcIiZtb2RlbG89XCIgKyAkbW9kZWxvLnZhbCgpO1xyXG4gICAgICBmb3JtICs9IFwiJnRhYmxhPWNvbnRyYXRvc1wiO1xyXG4gICAgICBpZiAoY2hlY2tlZCA+IDApIHtcclxuICAgICAgICBmb3JtICs9IFwiJmlwPVwiICsgJGlwLnZhbCgpICsgXCImY29kaWdvPVwiICsgJGNvZGlnby52YWwoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldElwTGlzdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlY3Rpb25faWQgPSAkKFwiI3NlbGVjdC1jb250cmFjdC1zZWN0b3JcIikudmFsKCk7XHJcbiAgICB2YXIgZm9ybSA9IFwiaWRfc2VjY2lvbj1cIiArIHNlY3Rpb25faWQgKyBcIiZ0YWJsYT1pcF9saXN0XCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvZ2V0YWxsXCIsIGZhbHNlLCBudWxsLCBtYWtlSXBMaXN0LCBmb3JtLCBudWxsKTtcclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlSXBMaXN0KGNvbnRlbnQpIHtcclxuICAgICAgJChcIiNzZWxlY3QtY29udHJhY3QtY29kZVwiKS5odG1sKGNvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGJ0bkV4dHJhUHJlc3NlZDogZnVuY3Rpb24gKCR0aGlzKSB7XHJcbiAgICB2YXIgYnV0dG9uSWQgPSAkdGhpcy50ZXh0KCkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgc3dpdGNoIChidXR0b25JZCkge1xyXG4gICAgICBjYXNlIFwibWVqb3JhclwiOlxyXG4gICAgICAgIENvbnRyYWN0cy51cGdyYWRlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJleHRlbmRlclwiOlxyXG4gICAgICAgIENvbnRyYWN0cy5leHRlbmQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImd1YXJkYXJcIjpcclxuICAgICAgICBDb250cmFjdHMuYWRkRXh0cmEoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGdyYWRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgY29udHJhY3RJZCwgc2VsZWN0ZWRTZXJ2aWNlLCBzZXJ2aWNlSWQsIGFtb3VudDtcclxuXHJcbiAgICBjb250cmFjdElkID0gJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICBzZWxlY3RlZFNlcnZpY2UgPSAkKFwiLnNlcnZpY2UtY2FyZC5zZWxlY3RlZFwiKTtcclxuICAgIHNlcnZpY2VJZCA9IHNlbGVjdGVkU2VydmljZS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgIGFtb3VudCA9IHNlbGVjdGVkU2VydmljZS5hdHRyKFwiZGF0YS1wYXltZW50XCIpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2NvbnRyYWN0SWQsIHNlcnZpY2VJZCwgYW1vdW50XSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGNvbnRyYWN0SWQgKyBcIiZpZF9zZXJ2aWNpbz1cIiArIHNlcnZpY2VJZCArIFwiJmN1b3RhPVwiICsgYW1vdW50O1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGdyYWRlJywgdHJ1ZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBudWxsLCBmb3JtLCBDb250cmFjdHMuZ2V0QWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiYXNlZ3VyYXRlIGRlIGxsZW5hciB0b2RvcyBsb3MgZGF0b3MgeSBzZWxlY2Npb25hciBlbCBzZXJ2aWNpb1wiLCBcImluZm9cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcmVjb25uZWN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgY29udHJhY3RJZCwgc2VsZWN0ZWRTZXJ2aWNlLCBzZXJ2aWNlSWQsIGR1cmF0aW9uLCBkYXRlLHNlbmQsIGlzX2VtcHR5LGluZm87XHJcblxyXG4gICAgY29udHJhY3RJZCA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgc2VsZWN0ZWRTZXJ2aWNlID0gJChcIi5zZXJ2aWNlLWNhcmQuc2VsZWN0ZWRcIik7XHJcbiAgICBzZXJ2aWNlSWQgPSBzZWxlY3RlZFNlcnZpY2UuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICBkdXJhdGlvbiAgPSAkKFwiI3JlY29ubmVjdGlvbi1tb250aHNcIikudmFsKCk7XHJcbiAgICBkYXRlID0gJChcIiNyZWNvbm5lY3Rpb24tZGF0ZVwiKS52YWwoKVxyXG5cclxuICAgIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCxzZXJ2aWNlSWQsZGF0ZSxkdXJhdGlvbl0pO1xyXG4gICAgY29uc29sZS5sb2coXCJzZXJ2aWNlIGlkXCIgKyBzZXJ2aWNlSWQgKyBcIiBkdXJhdGlvbiBcIiArIGR1cmF0aW9uICsgXCIgZGF0ZVwiICsgZGF0ZSArIFwiIGNvbnRyYWN0IFwiKyBjb250cmFjdElkIClcclxuICAgIGlmKCFpc19lbXB0eSl7XHJcbiAgICAgIGluZm8gPSB7XHJcbiAgICAgICAgJ2lkX2NvbnRyYXRvJzogY29udHJhY3RJZCxcclxuICAgICAgICAnZmVjaGEnOiBkYXRlLFxyXG4gICAgICAgICdpZF9zZXJ2aWNpbyc6IHNlcnZpY2VJZCxcclxuICAgICAgICAnZHVyYWNpb24nOiBkdXJhdGlvblxyXG4gICAgICB9XHJcbiAgICAgIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeShpbmZvKTtcclxuICAgICAgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyBcImNvbnRyYWN0L3JlY29ubmVjdFwiLGZvcm0pO1xyXG4gICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICBkaXNwbGF5TWVzc2FnZShyZXMuZGF0YS5tZW5zYWplKTtcclxuICAgICAgICBQYXltZW50cy5nZXRBbGwoKTtcclxuICAgICAgICAkKFwiI2J0bi1yZWNvbm5lY3RcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICQoXCIucmVjb25uZWN0LWNhbGxlclwiKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xyXG4gICAgICAgIFxyXG4gICAgICB9KVxyXG4gICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSlcclxuICAgIH1lbHNle1xyXG4gICAgICBzd2FsKFwiTGxlbmUgdG9kb3MgbG9zIGNhbXBvc1wiKVxyXG4gICAgfVxyXG4gICBcclxuXHJcbiAgfSxcclxuXHJcbiAgYWRkRXh0cmE6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBleHRyYVNlcnZpY2UsIHNlcnZpY2VDb3N0LCBlcXVpcG1lbnQsIGVNYWMsIHJvdXRlciwgck1hYztcclxuXHJcbiAgICBjb250cmFjdElkID0gJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICBzZXJ2aWNlQ29zdCA9ICQoXCIjZXh0cmEtc2VydmljZS1jb3N0XCIpLnZhbCgpO1xyXG4gICAgZXh0cmFTZXJ2aWNlID0gJChcIiNzZWxlY3QtZXh0cmEtc2VydmljZVwiKS52YWwoKTtcclxuICAgIGVxdWlwbWVudCA9ICQoXCIjZXh0cmEtZXF1aXBvXCIpLnZhbCgpO1xyXG4gICAgZU1hYyA9ICQoXCIjZXh0cmEtZS1tYWNcIikudmFsKCk7XHJcbiAgICByb3V0ZXIgPSAkKFwiI2V4dHJhLXJvdXRlclwiKS52YWwoKTtcclxuICAgIHJNYWMgPSAkKFwiI2V4dHJhLXItbWFjXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2NvbnRyYWN0SWQsIGV4dHJhU2VydmljZSwgc2VydmljZUNvc3RdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgY29udHJhY3RJZCArIFwiJmNvc3RvX3NlcnZpY2lvPVwiICsgc2VydmljZUNvc3QgKyBcIiZub21icmVfc2VydmljaW89XCIgKyBleHRyYVNlcnZpY2U7XHJcbiAgICAgIGZvcm0gKz0gJyZub21icmVfZXF1aXBvPScgKyBlcXVpcG1lbnQgKyBcIiZtYWNfZXF1aXBvPVwiICsgZU1hYyArIFwiJnJvdXRlcj1cIiArIHJvdXRlciArIFwiJm1hY19yb3V0ZXI9XCIgKyByTWFjO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9hZGRleHRyYScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBleHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBkdXJhdGlvbjtcclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIGR1cmF0aW9uID0gJChcIiNleHRyYS1leHRlbnNpb24tbW9udGhzXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2R1cmF0aW9uLCBjb250cmFjdElkXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGNvbnRyYWN0SWQgKyBcIiZkdXJhY2lvbj1cIiArIGR1cmF0aW9uO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9leHRlbmRfY29udHJhY3QnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGxPZkNsaWVudDogZnVuY3Rpb24oZG5pKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwiZG5pPVwiICsgZG5pO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2RhdGFfZm9yX2V4dHJhXCIsIGZhbHNlLCBudWxsLCBtYWtlQ29udHJhY3RMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG4gIC8vIE5vdGU6IGxvIHNpZW50bywgZGUgYXF1aSBlbiBhZGVsYW50ZSB1c28gYXhpb3MsIGVzIG11Y2hvIG1hcyBjb21vZG9cclxuICBzdXNwZW5kOiBmdW5jdGlvbiAoaWRfY29udHJhdG8pIHtcclxuICAgIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeSh7aWRfY29udHJhdG86aWRfY29udHJhdG99KVxyXG4gICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2NvbnRyYWN0L3N1c3BlbmQnLGZvcm0pO1xyXG4gICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgIHZhciBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgQ29udHJhY3RzLmdldEFsbCgpO1xyXG4gICAgfSlcclxuICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxudmFyIFBheW1lbnRzID0ge1xyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGlkID0gJChcIiNzZWxlY3QtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9cGFnb3MmaWQ9XCIgKyBpZDtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIHBheW1lbnRUYWJsZS5yZWZyZXNoLCBmb3JtLCBQYXltZW50cy5jb250cmFjdFJlZnJlc2gpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgIHZhciBkYXRlID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgdmFyIGlkX2NvbnRyYXRvID0gJChcIiNzZWxlY3QtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICAgIHZhciBmb3JtID0gXCJ0YWJsYT1wYWdvcyZpZD1cIiArIGlkICsgXCImZXN0YWRvPXBhZ2FkbyZmZWNoYV9wYWdvPVwiICsgZGF0ZSArIFwiJmlkX2NvbnRyYXRvPVwiICsgaWRfY29udHJhdG87XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFBheW1lbnRzLmdldEFsbCk7XHJcbiAgfSxcclxuXHJcbiAgc2F2ZUFib25vczogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG9ic2VydmF0aW9ucywgYWJvbm8kaW5wdXRBYm9ubywkdGV4dEFib25vLGNvbnRyYWN0SWQ7XHJcblxyXG4gICAgJHRleHRBYm9ubyAgID0gJCgnI3RleHQtYWJvbm8tZGV0YWlsJyk7XHJcbiAgICBvYnNlcnZhdGlvbnMgPSAkdGV4dEFib25vLnZhbCgpO1xyXG4gICAgY29udHJhY3RJZCAgID0gJChcIiNzZWxlY3QtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICAkaW5wdXRBYm9ubyAgPSAkKFwiI2lucHV0LWFib25vXCIpO1xyXG4gICAgYWJvbm8gICAgICAgID0gJGlucHV0QWJvbm8udmFsKCk7XHJcblxyXG4gICAgZm9ybSA9ICdvYnNlcnZhY2lvbmVzPScgKyBvYnNlcnZhdGlvbnMgKyBcIiZhYm9ub3M9XCIgKyBhYm9ubztcclxuICAgIGZvcm0gKz0gXCImY29udHJhdG9fYWJvbm89XCIrY29udHJhY3RJZCtcIiZ0YWJsYT1hYm9ub3NcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKVxyXG4gICAgJGlucHV0QWJvbm8udmFsKCcnKVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVVudGlsOiBmdW5jdGlvbihjb250cmFjdElkLGxhc3RQYXltZW50SWQpe1xyXG4gICAgdmFyIGlkX2NvbnRyYXRvID0gJChcIiNzZWxlY3QtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9cGFnb3NfYWxfZGlhJmlkX3VsdGltb19wYWdvPVwiICsgbGFzdFBheW1lbnRJZCArIFwiJmVzdGFkbz1wYWdhZG8maWRfY29udHJhdG89XCIgKyBjb250cmFjdElkO1xyXG4gICAgdmFyIGhhbmRsZXJzLCBjYWxsYmFjaztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIG51bGwsIGhlYXZ5TG9hZCk7XHJcbiAgfSxcclxuICAgIFxyXG4gIHJlbW92ZVBheW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWRlc2hhY2VyX3BhZ28maWRfcGFnbz1cIiArIGlkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBjb250cmFjdFJlZnJlc2g6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaWRfY2xpZW50ZSA9ICQoJyNkZXRhaWwtY2xpZW50LWlkJykudmFsKClcclxuICAgICB2YXIgZm9ybSA9IFwidGFibGE9Y29udHJhdG9zX2NsaWVudGUmaWQ9XCIgKyBpZF9jbGllbnRlO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIGRldGFpbHNDb250cmFjdFRhYmxlLnJlZnJlc2gsIGZvcm0sIG51bGwpO1xyXG4gIH0sXHJcblxyXG4gIGdldE9uZTogZnVuY3Rpb24oaWRfcGFnbywgcmVjZWl2ZXIpIHtcclxuICAgIGZvcm0gPSBcInRhYmxhPXBhZ29zJmlkX3BhZ289XCIgKyBpZF9wYWdvO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2dldG9uZVwiLCBmYWxzZSwgbnVsbCwgcmVjZWl2ZXIsIGZvcm0sIG51bGwpXHJcbiAgfSxcclxuXHJcbiAgcmVjZWl2ZUZvckVkaXQ6IGZ1bmN0aW9uKGNvbnRlbnQpe1xyXG4gICAgdmFyIHBhZ28gICAgICAgICAgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgdGhpcy5pZF9jb250cmF0byAgPSBwYWdvWydpZF9jb250cmF0byddO1xyXG4gICAgdGhpcy5pZF9wYWdvICAgICA9IHBhZ29bJ2lkX3BhZ28nXVxyXG4gICAgdmFyICRjb25jZXB0byAgICAgPSAkKFwiI3BheW1lbnQtY29uY2VwdFwiKTtcclxuICAgIHZhciAkZmVjaGFMaW1pdGUgID0gJChcIiNwYXltZW50LWxpbWl0LWRhdGVcIik7XHJcbiAgICB2YXIgJGN1b3RhICAgICAgICA9ICQoXCIjcGF5bWVudC1jdW90YVwiKTtcclxuICAgIHZhciAkbW9yYSAgICAgICAgID0gJChcIiNwYXltZW50LW1vcmFcIik7XHJcbiAgICB2YXIgJGV4dHJhICAgICAgICA9ICQoXCIjcGF5bWVudC1leHRyYVwiKTtcclxuICAgIHZhciAkdG90YWwgICAgICAgID0gJChcIiNwYXltZW50LXRvdGFsXCIpO1xyXG4gICAgdmFyICRkZXNjdWVudG8gICAgPSAkKFwiI3BheW1lbnQtZGlzY291bnQtYW1vdW50XCIpO1xyXG4gICAgdmFyICRyYXpvbiAgICAgICAgPSAkKFwiI3BheW1lbnQtZGlzY291bnQtcmVhc29uXCIpO1xyXG4gICAgdmFyICRtb2RhbCAgICAgICAgPSAkKFwiI2FkdmFuY2VkLXBheW1lbnRcIik7XHJcblxyXG4gICAgJGNvbmNlcHRvLnZhbChwYWdvWydjb25jZXB0byddKTtcclxuICAgICRmZWNoYUxpbWl0ZS52YWwocGFnb1snZmVjaGFfbGltaXRlJ10pO1xyXG4gICAgJGN1b3RhLnZhbChwYWdvWydjdW90YSddKTtcclxuICAgICRtb3JhLnZhbChwYWdvWydtb3JhJ10pO1xyXG4gICAgJGV4dHJhLnZhbChwYWdvWydtb250b19leHRyYSddKTtcclxuICAgICR0b3RhbC52YWwocGFnb1sndG90YWwnXSk7XHJcbiAgICBpbnRlcmFjdGl2ZVN1bSgpO1xyXG5cclxuICAgICRtb2RhbC5tb2RhbCgpO1xyXG4gICAgJG1vZGFsLm9uKCdoaWRlLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG4gICAgICAkbW9kYWwuZmluZCgnaW5wdXQnKS52YWwoJycpXHJcbiAgICB9KTtcclxuICAgICQoXCIjYnRuLWFwcGx5LWRpc2NvdW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiU2VndXJvIGRlIHF1ZSBxdWllcmUgYXBsaWNhciBlc3RlIGRlc2N1ZW50byBkZSBcIiArICRkZXNjdWVudG8udmFsKCkgKyBcIj9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGFwcGx5RGlzY291bnQoaWRfcGFnbyk7XHJcbiAgICAgICAgICAkbW9kYWwuaGlkZSgpO1xyXG4gICAgICAgICAgJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICAgICAgICAgICQoJy5tb2RhbC1iYWNrZHJvcCcpLnJlbW92ZSgpO1xyXG4gXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBhcHBseURpc2NvdW50KGlkX3BhZ28pIHtcclxuICAgICAgdmFyIGRhdGUgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICBmb3JtID0gJ2lkX3BhZ289JyArIGlkX3BhZ28gKyAnJmlkX2NvbnRyYXRvPScgKyBpZF9jb250cmF0byArIFwiJmN1b3RhPVwiICsgJGN1b3RhLnZhbCgpO1xyXG4gICAgICBmb3JtICs9IFwiJm1vcmE9XCIgKyAkbW9yYS52YWwoKSArIFwiJm1vbnRvX2V4dHJhPVwiICsgJGV4dHJhLnZhbCgpO1xyXG4gICAgICBmb3JtICs9IFwiJnRvdGFsPVwiICsgJHRvdGFsLnZhbCgpICsgJyZkZXNjdWVudG89JyArICRkZXNjdWVudG8udmFsKCkgKyAnJnJhem9uX2Rlc2N1ZW50bz0nICskcmF6b24udmFsKCkgKyAnJmZlY2hhX3BhZ289JyArIGRhdGUgO1xyXG4gICAgICBmb3JtICs9IFwiJnRhYmxhPWRpc2NvdW50X3BhZ29zXCI7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICAgICAgJG1vZGFsLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbnRlcmFjdGl2ZVN1bSgpe1xyXG4gICAgICAkKCcucGF5bWVudC1zdW1hbmRvcycpLm9uKCdrZXl1cCcsZnVuY3Rpb24oKXtcclxuICAgICAgICAkY3VvdGEudmFsKHBhZ29bJ2N1b3RhJ10gLSAkZGVzY3VlbnRvLnZhbCgpKTtcclxuICAgICAgICB2YXIgc3VtYSA9IE51bWJlcigkY3VvdGEudmFsKCkpICsgTnVtYmVyKCRtb3JhLnZhbCgpKSArIE51bWJlcigkZXh0cmEudmFsKCkpO1xyXG4gICAgICAgICR0b3RhbC52YWwoTnVtYmVyKHN1bWEpKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGVkaXQ6IGZ1bmN0aW9uKGNvbnRlbnQpe1xyXG4gICAgdmFyIHBhZ28gICAgICAgICAgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgdGhpcy5pZF9jb250cmF0byAgPSBwYWdvWydpZF9jb250cmF0byddO1xyXG4gICAgdGhpcy5pZF9wYWdvICAgICAgPSBwYWdvWydpZF9wYWdvJ11cclxuICAgIHZhciAkbW9kYWwgICAgICAgID0gJCgnI2VkaXQtcGF5bWVudC1tb2RhbCcpIFxyXG4gICAgY29uc29sZS5sb2cocGFnbylcclxuXHJcbiAgICAkbW9kYWwubW9kYWwoKTtcclxuXHJcbiAgICAkbW9kYWwub24oJ2hpZGUuYnMubW9kYWwnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICRtb2RhbC5maW5kKCdpbnB1dCcpLnZhbCgnJylcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLXNhdmUtZWRpdGVkLXBheW1lbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJTZWd1cm8gZGUgcXVlIHF1aWVyZSBhcGxpY2FyIGVzdGUgZGVzY3VlbnRvIGRlIFwiICsgJGRlc2N1ZW50by52YWwoKSArIFwiP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgYXBwbHlEaXNjb3VudChpZF9wYWdvKTtcclxuICAgICAgICAgICRtb2RhbC5oaWRlKCk7XHJcbiAgICAgICAgICAkbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgICAgICAgJCgnLm1vZGFsLWJhY2tkcm9wJykucmVtb3ZlKCk7XHJcbiBcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGZ1bmN0aW9uIGFwcGx5RGlzY291bnQoaWRfcGFnbykge1xyXG4gICAgLy8gICB2YXIgZGF0ZSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAvLyAgIGZvcm0gPSAnaWRfcGFnbz0nICsgaWRfcGFnbyArICcmaWRfY29udHJhdG89JyArIGlkX2NvbnRyYXRvICsgXCImY3VvdGE9XCIgKyAkY3VvdGEudmFsKCk7XHJcbiAgICAvLyAgIGZvcm0gKz0gXCImbW9yYT1cIiArICRtb3JhLnZhbCgpICsgXCImbW9udG9fZXh0cmE9XCIgKyAkZXh0cmEudmFsKCk7XHJcbiAgICAvLyAgIGZvcm0gKz0gXCImdG90YWw9XCIgKyAkdG90YWwudmFsKCkgKyAnJmRlc2N1ZW50bz0nICsgJGRlc2N1ZW50by52YWwoKSArICcmcmF6b25fZGVzY3VlbnRvPScgKyRyYXpvbi52YWwoKSArICcmZmVjaGFfcGFnbz0nICsgZGF0ZSA7XHJcbiAgICAvLyAgIGZvcm0gKz0gXCImdGFibGE9ZGlzY291bnRfcGFnb3NcIjtcclxuICAgIC8vICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpO1xyXG4gICAgLy8gICAkbW9kYWwuaGlkZSgpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGZ1bmN0aW9uIGludGVyYWN0aXZlU3VtKCl7XHJcbiAgICAvLyAgICQoJy5wYXltZW50LXN1bWFuZG9zJykub24oJ2tleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgICRjdW90YS52YWwocGFnb1snY3VvdGEnXSAtICRkZXNjdWVudG8udmFsKCkpO1xyXG4gICAgLy8gICAgIHZhciBzdW1hID0gTnVtYmVyKCRjdW90YS52YWwoKSkgKyBOdW1iZXIoJG1vcmEudmFsKCkpICsgTnVtYmVyKCRleHRyYS52YWwoKSk7XHJcbiAgICAvLyAgICAgJHRvdGFsLnZhbChOdW1iZXIoc3VtYSkpXHJcbiAgICAvLyAgIH0pXHJcbiAgICAvLyB9XHJcbiAgfVxyXG4gIFxyXG59XHJcblxyXG52YXIgRGFtYWdlcyA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBpZENsaWVudGUsIGRlc2NyaXB0aW9uO1xyXG4gICAgaWRDbGllbnRlID0gJChcIiNhdmVyaWFzLWNsaWVudC1pZFwiKS52YWwoKTtcclxuICAgIGRlc2NyaXB0aW9uID0gJChcIiNhLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2lkQ2xpZW50ZSwgZGVzY3JpcHRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9jbGllbnRlPScgKyBpZENsaWVudGUgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uICsgXCImdGFibGE9YXZlcmlhc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvYWRkXCIsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgRGFtYWdlcy5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgICAkKCcjbmV3LWF2ZXJpYS1tb2RhbCcpLmZpbmQoJ2lucHV0LHRleHRhcmVhJykudmFsKFwiXCIpO1xyXG4gIH0sXHJcblxyXG4gIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXR1cyA9ICQoXCIjYXZlcmlhcy12aWV3LW1vZGVcIikudmFsKCk7XHJcbiAgICAkKFwiLnByZXNlbnRhZG9cIikudGV4dChzdGF0dXMpO1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWF2ZXJpYXMmZXN0YWRvPVwiICsgc3RhdHVzO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIGluaXRHbG9iYWxIYW5kbGVycywgZmlsbEF2ZXJpYXNMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgkaWRfYXZlcmlhKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9YXZlcmlhcyZpZF9hdmVyaWE9XCIgKyAkaWRfYXZlcmlhO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBudWxsLCBmb3JtLCBEYW1hZ2VzLmdldEFsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgSW5zdGFsbGF0aW9ucyA9IHtcclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGF0dXMgPSAkKFwiI2luc3RhbGxhdGlvbnMtdmlldy1tb2RlXCIpLnZhbCgpO1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWluc3RhbGFjaW9uZXMmZXN0YWRvPVwiICsgc3RhdHVzO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIGluaXRHbG9iYWxIYW5kbGVycywgZmlsbEluc3RhbGxhdGlvbnNMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uICgkaWRfcGFnbykge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWluc3RhbGFjaW9uZXMmaWRfcGFnbz1cIiArICRpZF9wYWdvO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgaW5pdEdsb2JhbEhhbmRsZXJzLCBudWxsLCBmb3JtLCBJbnN0YWxsYXRpb25zLmdldEFsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ2FqYSA9IHtcclxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBhbW91bnQsIGRlc2NyaXB0aW9uLCBpc19lbXB0eTtcclxuXHJcbiAgICBhbW91bnQgPSAkKFwiI2NhamEtYS1hbW91bnRcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjY2FqYS1hLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG4gICAgZm9ybSA9IFwiZW50cmFkYT1cIiArIGFtb3VudCArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb24gKyBcIiZ0YWJsYT1jYWphXCI7XHJcbiAgICBpc19lbXB0eSA9IGlzRW1wdHkoW2Ftb3VudCwgZGVzY3JpcHRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvYWRkJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ2FqYS5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZXRpcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBhbW91bnQsIGRlc2NyaXB0aW9uLCBpc19lbXB0eTtcclxuXHJcbiAgICBhbW91bnQgPSAkKFwiI2NhamEtci1hbW91bnRcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjY2FqYS1yLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG4gICAgZm9ybSA9IFwic2FsaWRhPVwiICsgYW1vdW50ICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbjtcclxuICAgIGlzX2VtcHR5ID0gaXNFbXB0eShbYW1vdW50LCBkZXNjcmlwdGlvbl0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvcmV0aXJlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ2FqYS5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jYWphXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRBbGwnLCBmYWxzZSwgbnVsbCwgY2FqYVRhYmxlLnJlZnJlc2gsIGZvcm0sIENhamEuZ2V0U2FsZG8pO1xyXG4gIH0sXHJcblxyXG4gIGdldFNhbGRvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2FqYVwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0b25lJywgZmFsc2UsIG51bGwsIHVwZGF0ZVNhbGRvLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICRkYXRlU2VhcmNoID0gJChcIiNjYWphLWRhdGVcIik7XHJcbiAgICB2YXIgJHVzZXJTZWFyY2ggPSAkKFwiI2NhamEtdXNlclwiKTtcclxuICAgIHZhciBkYXRlID0gKCRkYXRlU2VhcmNoLnZhbCgpKSA/ICRkYXRlU2VhcmNoLnZhbCgpIDogJyUnO1xyXG4gICAgdmFyIHVzZXJJZCA9ICgkdXNlclNlYXJjaC52YWwoKSkgPyAkdXNlclNlYXJjaC52YWwoKSA6ICclJztcclxuXHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2FqYSZpZF9lbXBsZWFkbz1cIiArIHVzZXJJZCArIFwiJmZlY2hhPVwiICsgZGF0ZTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3NlYXJjaCcsIGZhbHNlLCBudWxsLCBjYWphVGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgQ29tcGFueSA9IHtcclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLFxyXG4gICAgY29tcGFueU5hbWUgPSAkKFwiI2NvbXBhbnktbmFtZVwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlTdGF0ZW1lbnQgPSAkKFwiI2NvbXBhbnktc3RhdGVtZW50XCIpLnZhbCgpLFxyXG4gICAgY29tcGFueVBob25lMSA9IGdldFZhbCgkKFwiI2NvbXBhbnktcGhvbmUxXCIpKSxcclxuICAgIGNvbXBhbnlEaXJlY3Rpb24gPSAkKFwiI2NvbXBhbnktZGlyZWN0aW9uXCIpLnZhbCgpLFxyXG4gICAgY29tcGFueURlc2NyaXB0aW9uID0gJChcIiNjb21wYW55LWRlc2NyaXB0aW9uXCIpLnZhbCgpLFxyXG4gICAgY29tcGFueVBob25lMiA9IGdldFZhbCgkKFwiI2NvbXBhbnktcGhvbmUyXCIpKVxyXG5cclxuICAgIGZvcm0gPSAnbm9tYnJlPScgKyBjb21wYW55TmFtZSArICcmbGVtYT0nICsgY29tcGFueVN0YXRlbWVudCArICcmZGVzY3JpcGNpb249JyArIGNvbXBhbnlEZXNjcmlwdGlvbiArIFwiJmRpcmVjY2lvbj1cIlxyXG4gICAgZm9ybSArPSBjb21wYW55RGlyZWN0aW9uICsgXCImdGVsZWZvbm8xPVwiICsgY29tcGFueVBob25lMSArIFwiJnRlbGVmb25vcz1cIiArIGNvbXBhbnlQaG9uZTIgKyBcIiZ0YWJsYT1lbXByZXNhXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBTZXR0aW5ncyA9IHtcclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLFxyXG4gICAgc2V0dGluZ3NDYXJnb01vcmEgPSAkKFwiI3NldHRpbmdzLW1vcmFcIikudmFsKCksXHJcbiAgICBzZXR0aW5nc0ZlY2hhQ29ydGUgPSAkKFwiI3NldHRpbmdzLWZlY2hhLWNvcnRlXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NBcGVydHVyYUNhamEgPSAkKFwiI3NldHRpbmdzLWFwZXJ0dXJhLWNhamFcIikudmFsKCksXHJcbiAgICBzZXR0aW5nc1BlbmFsaXphY2lvbkNhbmNlbGFjaW9uID0gJChcIiNzZXR0aW5ncy1wZW5hbGl6YWNpb24tY2FuY2VsYWNpb25cIikudmFsKCksXHJcbiAgICBzZXR0aW5nc01lc2VzUG9yRGVmZWN0byA9ICQoXCIjc2V0dGluZ3MtbWVzZXMtcG9yLWRlZmVjdG9cIikudmFsKCksXHJcbiAgICBzZXR0aW5nc1NwbGl0RGF5ID0gJChcIiNzZXR0aW5ncy1zcGxpdC1kYXlcIikudmFsKCk7XHJcblxyXG4gICAgZm9ybSA9ICdjYXJnb19tb3JhPScgKyBzZXR0aW5nc0NhcmdvTW9yYSArICcmZmVjaGFfY29ydGU9JyArIHNldHRpbmdzRmVjaGFDb3J0ZSArICcmYXBlcnR1cmFfY2FqYT0nICsgc2V0dGluZ3NBcGVydHVyYUNhamE7XHJcbiAgICBmb3JtICs9ICcmcGVuYWxpemFjaW9uX2NhbmNlbGFjaW9uPScgKyBzZXR0aW5nc1BlbmFsaXphY2lvbkNhbmNlbGFjaW9uICsgJyZtZXNlc19wb3JfZGVmZWN0bz0nICsgc2V0dGluZ3NNZXNlc1BvckRlZmVjdG87XHJcbiAgICBmb3JtICs9ICcmc3BsaXRfZGF5PScgKyBzZXR0aW5nc1NwbGl0RGF5ICsgJyZ0YWJsYT1zZXR0aW5ncyc7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBTZWN0aW9ucyA9IHsgXHJcbiAgYWRkOiBmdW5jdGlvbigpIHtcclxuICAgIHN3YWwuc2V0RGVmYXVsdHMoe1xyXG4gICAgICBpbnB1dDogJ3RleHQnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ05leHQgJnJhcnI7JyxcclxuICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcclxuICAgICAgcHJvZ3Jlc3NTdGVwczogWycxJywgJzInLCAnMyddXHJcbiAgICB9KVxyXG5cclxuICAgIHZhciBzdGVwcyA9IFt7XHJcbiAgICAgICAgdGl0bGU6ICdOb21icmUgZGVsIHNlY3RvcidcclxuICAgICAgfSxcclxuICAgICAgJ0NvZGlnbyBkZWwgU2VjdG9yJyxcclxuICAgIF1cclxuXHJcbiAgICBzd2FsLnF1ZXVlKHN0ZXBzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgc3dhbC5yZXNldERlZmF1bHRzKClcclxuICAgICAgc2F2ZShyZXN1bHQpXHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzYXZlKHJlc3VsdCl7XHJcbiAgICAgIHZhciBmb3JtO1xyXG4gICAgICB2YXIgbm9tYnJlID0gcmVzdWx0WzBdO1xyXG4gICAgICB2YXIgY29kaWdvQXJlYSA9IHJlc3VsdFsxXSxcclxuXHJcbiAgICAgIGZvcm0gPSBcIm5vbWJyZT1cIitub21icmUrXCImY29kaWdvX2FyZWE9XCIrY29kaWdvQXJlYTtcclxuICAgICAgZm9ybSArPSBcIiZ0YWJsYT1zZWNjaW9uZXNcIlxyXG4gICAgIFxyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSl7XHJcbiAgICAgICAgIGlmKGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2FkZCcsIHRydWUsIGZhbHNlLCBudWxsLCBmb3JtLFNlY3Rpb25zLmdldEFsbCxoZWF2eUxvYWQpKXtcclxuICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0SXBzOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpZCA9ICQoXCIjc2VsZWN0LXNlY3RvclwiKS52YWwoKTtcclxuICAgIGlmIChpZCAhPSBudWxsKSB7XHJcbiAgICAgIHZhciBmb3JtID0gXCJ0YWJsYT1pcHMmaWQ9XCIgKyBpZDtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIFNlY3Rpb25zLnJlb3JkZXJUYWJsZSwgZm9ybSxudWxsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZW9yZGVyVGFibGU6IGZ1bmN0aW9uKGNvbnRlbnQpe1xyXG4gICAgdmFyIHRhYmxlID0gJChcIiN0LXNlY3Rpb25zXCIpO1xyXG4gICAgdGFibGUuYm9vdHN0cmFwVGFibGUoJ2Rlc3Ryb3knKTtcclxuICAgICQoXCIjdC1zZWN0aW9ucyB0Ym9keVwiKS5odG1sKGNvbnRlbnQpO1xyXG4gICAgdGFibGUuYm9vdHN0cmFwVGFibGUoKTtcclxuICAgIHRhYmxlLmZpbmQoJ3Rib2R5JykuY3NzKHtkaXNwbGF5OlwidGFibGUtcm93LWdyb3VwXCJ9KTtcclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9c2VjY2lvbmVzXCI7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBmaWxsU2VsZWN0LCBmb3JtLGhlYXZ5TG9hZCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZmlsbFNlbGVjdChjb250ZW50KXtcclxuICAgICAgJChcIiNzZWxlY3Qtc2VjdG9yXCIpLmh0bWwoY29udGVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiICB2YXIgY3VycmVudFBhZ2UgPSAkKFwidGl0bGVcIikudGV4dCgpLnNwbGl0KFwiIFwiKTtcclxuICBjdXJyZW50UGFnZSA9IGN1cnJlbnRQYWdlWzRdLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gIHZhciByYW4gPSBmYWxzZTtcclxuICBcclxuICBmdW5jdGlvbiBpbml0Q29tcG9uZW50cygpe1xyXG4gICAgc3dpdGNoIChjdXJyZW50UGFnZSkge1xyXG4gICAgICBjYXNlIFwiaG9tZVwiOlxyXG4gICAgICAgIGluaXRDbGllbnRIYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiYWRtaW5pc3RyYWRvclwiOlxyXG4gICAgICAgIGluaXRBZG1pbkhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJjbGllbnRlc1wiOlxyXG4gICAgICAgIGluaXRDbGllbnRIYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic2VydmljaW9zXCI6XHJcbiAgICAgICAgaW5pdFNlcnZpY2VzSGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIm51ZXZvX2NvbnRyYXRvXCI6XHJcbiAgICAgICAgaW5pdENvbnRyYWN0SGFuZGxlcnMoKTtcclxuICAgICAgICBDb250cmFjdHMuZ2V0SXBMaXN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJkZXRhbGxlc1wiOlxyXG4gICAgICAgIGluaXRQYXltZW50c0hhbmRsZXJzKCk7XHJcbiAgICAgICAgZGV0YWlsSGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImNvbnRyYXRvc1wiOlxyXG4gICAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICAgICAgaW5pdENsaWVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJjdWVudGFcIjpcclxuICAgICAgICBhY291bnRIYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic2VjY2lvbmVzXCI6XHJcbiAgICAgICAgc2VjdGlvbkhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENhamFIYW5kbGVycygpO1xyXG4gICAgaW5pdEdsb2JhbEhhbmRsZXJzKCk7XHJcbiAgfVxyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgZ2xvYmFscyBoYW5kbGVycyAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gIGZ1bmN0aW9uIGluaXRHbG9iYWxIYW5kbGVycygpIHtcclxuICAgIHZhciBhdmVyaWFDbGllbnREbmkgPSAkKFwiI2EtY2xpZW50LWRuaVwiKTtcclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnbm90aWZpY2FjaW9uZXMnKSB7XHJcbiAgICAgICAgR2VuZXJhbHMuY291bnRfdGFibGUoXCJhdmVyaWFzXCIpO1xyXG5cclxuICAgICAgJChcIiNhdmVyaWFzLXZpZXctbW9kZVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIERhbWFnZXMuZ2V0QWxsKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgICQoXCIjaW5zdGFsbGF0aW9ucy12aWV3LW1vZGVcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBJbnN0YWxsYXRpb25zLmdldEFsbCgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJ3Rib2R5JykuY3NzKHtkaXNwbGF5OlwidGFibGUtcm93LWdyb3VwXCJ9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2NvbnRyYXRvcycpIHtcclxuICAgICBpbml0Q29udHJhY3RIYW5kbGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLXNhdmUtYXZlcmlhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIERhbWFnZXMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhdmVyaWFDbGllbnREbmkub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgaWYgKGlzQ29tcGxldGUoYXZlcmlhQ2xpZW50RG5pKSkge1xyXG4gICAgICAgIHZhciBkbmkgPSBnZXRWYWwoYXZlcmlhQ2xpZW50RG5pKTtcclxuICAgICAgICBDbGllbnRzLmdldE9uZShkbmksZmlsbENsaWVudEZpZWxkcylcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgJCgnI2EtY2xpZW50JykudmFsKCcnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5idG4tdXBkYXRlLWF2ZXJpYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWRfYXZlcmlhID0gJCh0aGlzKS5wYXJlbnRzKCcuYXZlcmlhLWl0ZW0nKS5maW5kKCcuY29kZScpXHJcbiAgICAgIGlkX2F2ZXJpYSA9IGlkX2F2ZXJpYS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICBEYW1hZ2VzLnVwZGF0ZShpZF9hdmVyaWEpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoXCIuYnRuLXVwZGF0ZS1pbnN0YWxsYXRpb25cIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkX3BhZ28gPSAkKHRoaXMpLnBhcmVudHMoJy5hdmVyaWEtaXRlbScpLmZpbmQoJy5jb2RlJyk7XHJcbiAgICAgIGlkX3BhZ28gPSBpZF9wYWdvLnRleHQoKS50cmltKCk7XHJcbiAgICAgIEluc3RhbGxhdGlvbnMudXBkYXRlKGlkX3BhZ28pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNleHRyYS1jb250cm9sc1wiKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb250cmFjdHMuYnRuRXh0cmFQcmVzc2VkKCQodGhpcykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNleHRyYS1jbGllbnQtZG5pXCIpLm9uKCdrZXlkb3duJyxmdW5jdGlvbihlKXtcclxuICAgICAgdmFyIGtleSA9IGUud2hpY2g7XHJcbiAgICAgIHZhciBkbmkgPSAkKHRoaXMpLnZhbCgpXHJcbiAgICAgIGlmKGtleSA9PSAxMyl7XHJcbiAgICAgICAgQ29udHJhY3RzLmdldEFsbE9mQ2xpZW50KGRuaSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICAgICBhZG1pbiBoYW5kbGVycyAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGluaXRBZG1pbkhhbmRsZXJzKCkge1xyXG4gICAgdXNlclRhYmxlLmluaXQoKTtcclxuICAgICQoXCIjYnRuLXNhdmUtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBVc2Vycy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLXVwZGF0ZS11c2VyXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFVzZXJzLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5kZWxldGUtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciAkcm93ID0gJCh0aGlzKS5wYXJlbnRzKFwidHJcIik7XHJcbiAgICAgIHZhciBpZCA9ICRyb3cuZmluZCgnLnVzZXItaWQnKS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICB2YXIgcm93ID0gdXNlclRhYmxlLmdldFJvdyhpZCk7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgRWxpbWluYXIgYWwgVXN1YXJpbyBcIiArIHJvdy5ub21icmVzICtcIiBcIisgcm93LmFwZWxsaWRvcyArIFwiP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgIFVzZXJzLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmVkaXQtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciBpZCAgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdXNlci1pZCcpO1xyXG4gICAgICB2YXIgcm93ID0gdXNlclRhYmxlLmdldFJvdyhpZCk7XHJcbiAgICAgIFxyXG5cclxuICAgICAgJChcIiNlLW5pY2tuYW1lXCIpLnZhbChyb3cubmljayk7XHJcbiAgICAgICQoXCIjZS1uYW1lXCIpLnZhbChyb3cubm9tYnJlcyk7XHJcbiAgICAgICQoXCIjZS1sYXN0bmFtZVwiKS52YWwocm93LmFwZWxsaWRvcyk7XHJcbiAgICAgICQoXCIjZS1kbmlcIikudmFsKHJvdy5jZWR1bGEpO1xyXG4gICAgICAkKFwiI2UtdHlwZVwiKS52YWwocm93LnRpcG9fY29kaWdvKTtcclxuICAgICAgJCgnI3VwZGF0ZS11c2VyLW1vZGFsJykubW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjdXBkYXRlLWNvbXBhbnktZGF0YVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbXBhbnkudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtc2V0dGluZ3NcIikub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgU2V0dGluZ3MudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzb21lIGdsb2JhbHMgaGFuZGxlcnNcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWF2ZXJpYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBEYW1hZ2VzLmFkZCgpXHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICAgICBJbml0IGNhamEgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBcclxuICBmdW5jdGlvbiBpbml0Q2FqYUhhbmRsZXJzKCkge1xyXG4gICAgaWYgKGN1cnJlbnRQYWdlID09ICdhZG1pbmlzdHJhZG9yJykge1xyXG4gICAgICBjYWphVGFibGUuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgdmFyIGJ0bkFkZE1vbmV5ICAgICA9ICQoXCIjYnRuLWFkZC1tb25leVwiKTtcclxuICAgIHZhciBidG5SZXRpcmVNb25leSAgPSAkKFwiI2J0bi1yZXRpcmUtbW9uZXlcIik7XHJcbiAgICB2YXIgdXNlclNlYXJjaCAgICAgID0gJChcIiNjYWphLXVzZXJcIik7XHJcbiAgICB2YXIgZGF0ZVNlYXJjaCAgICAgID0gJChcIiNjYWphLWRhdGVcIik7XHJcblxyXG4gICAgYnRuQWRkTW9uZXkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJ0blJldGlyZU1vbmV5Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENhamEucmV0aXJlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRlU2VhcmNoLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDYWphLnNlYXJjaCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdXNlclNlYXJjaC5vbignY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5zZWFyY2goKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgY2xpZW50IEhhbmRsZXJzICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0Q2xpZW50SGFuZGxlcnMoKSB7XHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ2NsaWVudGVzJykge1xyXG4gICAgICBjbGllbnRUYWJsZS5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1jbGllbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2xpZW50cy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjdXBkYXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBpZCA9IGNsaWVudFRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIENsaWVudHMuZ2V0T25lKGlkLCBDbGllbnRzLnJlY2VpdmVGb3JFZGl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjbGllbnQtc2VhcmNoZXJcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJjbGllbnRlc1wiLCBjbGllbnRUYWJsZS5yZWZyZXNoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjY2xpZW50LXNlYXJjaGVyLW5ld2NvbnRyYWN0XCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgaWYgKCFpc0VtcHR5KFt0ZXh0XSkpIHtcclxuICAgICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJjbGllbnRlc1wiLCBjbGllbnRUYWJsZS5yZWZyZXNoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhclRib2R5KFwiLmxvYmJ5LXJlc3VsdHNcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZGVsZXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciByb3cgPSBjbGllbnRUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBFbGltaW5hciBhbChsYSkgQ2xpZW50ZSBcIiArIHJvdy5ub21icmVzICsgXCIgXCIgKyByb3cuYXBlbGxpZG9zICsgXCI/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgR2VuZXJhbHMuZGVsZXRlUm93KHJvdy5pZCwgXCJjbGllbnRlc1wiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBJbml0IFNlcnZpY2VzIEhhbmRsZXJzICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gaW5pdFNlcnZpY2VzSGFuZGxlcnMoKSB7XHJcbiAgICBzZXJ2aWNlVGFibGUuaW5pdCgpO1xyXG5cclxuICAgICQoXCIjYnRuLXNhdmUtc2VydmljZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBTZXJ2aWNlcy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZGVsZXRlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBzZXJ2aWNlVGFibGUuZ2V0SWQoKTtcclxuICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBFbGltaW5hciAgZWwgU2VydmljaW8/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgR2VuZXJhbHMuZGVsZXRlUm93KGlkLCBcInNlcnZpY2lvc1wiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNlZGl0LXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgcm93ID0gc2VydmljZVRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcblxyXG4gICAgICAkKCcjdS1zZXJ2aWNlLWlkJykudmFsKHJvdy5pZCk7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtbmFtZScpLnZhbChyb3cubm9tYnJlKTtcclxuICAgICAgJCgnI3Utc2VydmljZS1kZXNjcmlwdGlvbicpLnZhbChyb3cuZGVzY3JpcGNpb24pO1xyXG4gICAgICAkKCcjdS1zZXJ2aWNlLW1vbnRobHktcGF5bWVudCcpLnZhbChOdW1iZXIocm93Lm1lbnN1YWxpZGFkLnJlcGxhY2UoXCJSRCQgXCIsJycpKSk7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtdHlwZScpLnZhbChyb3cudGlwbyk7XHJcbiAgICAgICQoJyN1cGRhdGUtc2VydmljZS1tb2RhbCcpLm1vZGFsKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tdXBkYXRlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VydmljZXMudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3NlcnZpY2Utc2VhcmNoZXJcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJzZXJ2aWNpb3NcIiwgc2VydmljZVRhYmxlLnJlZnJlc2gsaW5pdFNlcnZpY2VzSGFuZGxlcnMpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgQ29udHJhY3QgSGFuZGxlcnMgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0Q29udHJhY3RIYW5kbGVycygpIHtcclxuICAgIGNvbnRyYWN0VGFibGUuaW5pdCgpO1xyXG4gICAgQ29udHJhY3RzLmdldEFsbCgpO1xyXG4gICAgXHJcbiAgICAkKFwiI2J0bi1zYXZlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbnRyYWN0cy5hZGQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLWFkZC1leHRyYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENvbnRyYWN0cy5jYWxsRXh0cmEoKTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGNvbnQgPSAwO1xyXG5cclxuICAgICQoXCIjY29udHJhY3Qtc2VhcmNoZXJcIikub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBHZW5lcmFscy5zZWFyY2godGV4dCwgXCJ2X2NvbnRyYXRvc1wiLCBjb250cmFjdFRhYmxlLnJlZnJlc2gsbnVsbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1jYW5jZWwtY29udHJhY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgcm93ID0gY29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgJChcIi5jYW5jZWwtbmFtZVwiKS50ZXh0KHJvdy5jbGllbnRlKTtcclxuICAgICAgICB2YXIgJGlucHV0RWxlbWVudCAgID0gJChcIi5jb25maXJtZWQtZGF0YVwiKTtcclxuICAgICAgICB2YXIgJGJ1dHRvblRvQWN0aXZlID0gJChcIiNjYW5jZWwtcGVybWFuZW50bHlcIik7XHJcblxyXG4gICAgICAgIGRlbGV0ZVZhbGlkYXRpb24oJGlucHV0RWxlbWVudCxyb3cuY2xpZW50ZSwgJGJ1dHRvblRvQWN0aXZlKTtcclxuICAgICAgICAkKFwiI2NhbmNlbC1wcmludFwiKS5hdHRyKFwiaHJlZlwiLEJBU0VfVVJMICsgJ3Byb2Nlc3MvZ2V0Y2FuY2VsY29udHJhY3QvJysgcm93LmlkX2NsaWVudGUgKyBcIi9cIiArIHJvdy5pZCk7XHJcblxyXG4gICAgICAgICQoXCIjY2FuY2VsLWNvbnRyYWN0LW1vZGFsXCIpLm1vZGFsKCk7XHJcbiAgICAgICAgJGJ1dHRvblRvQWN0aXZlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgQ29udHJhY3RzLmNhbmNlbCgpXHJcbiAgICAgICAgICAkYnV0dG9uVG9BY3RpdmUuYXR0cignZGlzYWJsZScpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICRpbnB1dEVsZW1lbnQudmFsKCcnKTtcclxuICAgICAgICAkYnV0dG9uVG9BY3RpdmUuYXR0cignZGlzYWJsZWQnLCAnJyk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHN3YWwoXCJEZWJlcyBzZWxlY2Npb25hciB1biBjb250cmF0b1wiKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1zdXNwZW5kLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgIHZhciByb3cgPSBjb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJEZXNlYSBTdXNwZW5kZXIgZWwgY29udHJhdG8gZGUgXCIgKyByb3cuY2xpZW50ZSArXCIgP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgIENvbnRyYWN0cy5zdXNwZW5kKHJvdy5pZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICB9ZWxzZXtcclxuICAgICAgICAgc3dhbChcIkRlYmUgc2VsZWNjaW9uYXIgdW4gY29udHJhdG9cIilcclxuICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtY29udHJhY3RcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBjb250cmFjdFRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIENvbnRyYWN0cy5nZXRPbmUoaWQsIENvbnRyYWN0cy5yZWNpZXZlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNzZWxlY3QtY29udHJhY3Qtc2VjdG9yXCIpLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb250cmFjdHMuZ2V0SXBMaXN0KCk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJyNzZWxlY3QtcGF5LXVudGlsJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgJHRoaXMgICAgICAgICA9ICQoJyNzZWxlY3QtcGF5LXVudGlsIDpzZWxlY3RlZCcpO1xyXG4gICAgICB2YXIgY29udHJhY3RJZCAgICA9ICR0aGlzLmF0dHIoJ2RhdGEtY29udHJhY3QnKTtcclxuICAgICAgdmFyIGxhc3RQYXltZW50SWQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICBQYXltZW50cy51cGRhdGVVbnRpbChjb250cmFjdElkLGxhc3RQYXltZW50SWQpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgUGF5bWVudHMgIEhhbmRsZXJzICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0UGF5bWVudHNIYW5kbGVycygpIHtcclxuICAgIHBheW1lbnRUYWJsZS5pbml0KCk7XHJcbiAgICBpZiAoIXJhbikge1xyXG4gICAgICBQYXltZW50cy5nZXRBbGwoKTtcclxuICAgICAgcmFuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1wYXlcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gcGF5bWVudFRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmKGlkKSB7XHJcbiAgICAgICAgUGF5bWVudHMudXBkYXRlKGlkKTtcclxuICAgICAgICB1cGRhdGVfbW9kZShpZCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIC8vIFRPRE86IE1FU1NBR0UgU2VsZWN0IGEgcGF5bWVudFxyXG4gICAgICB9XHJcbiAgICB9KTsgXHJcblxyXG4gICAgJChcIiNzZWxlY3QtY29udHJhY3RcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tcmVjb25uZWN0XCIpLm9uKCdjbGljaycsZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXHJcbiAgICAgIENvbnRyYWN0cy5yZWNvbm5lY3QoKVxyXG4gICAgfSlcclxuXHJcbiAgICAkKFwiI3BheW1lbnQtZGV0YWlsLWJveFwiKS5jb2xsYXBzZSgpXHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlX21vZGUoaWQpe1xyXG4gICAgICB2YXIgbW9kZSA9ICQoJy5wYXltZW50LW1vZGUuc2VsZWN0ZWQnKS50ZXh0KCk7XHJcbiAgICAgIHZhciBleHRyYUluZm8gPSB7aWQ6IGlkLnRvU3RyaW5nKCksbW9kdWxlOidwYWdvcyd9XHJcbiAgICAgIHZhciBmb3JtID0gJ2RhdGE9JytKU09OLnN0cmluZ2lmeSh7dGlwbzogbW9kZX0pKycmZXh0cmFfaW5mbz0nK0pTT04uc3RyaW5naWZ5KGV4dHJhSW5mbyk7XHJcblxyXG4gICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoIEJBU0VfVVJMICsgJ3Byb2Nlc3MvYXhpb3N1cGRhdGUnLGZvcm0pXHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgLy9UT0RPOiBzb21ldGhpbmcgd2hpdGggdGhhdCAvIGFsZ28gY29uIGVzdG9cclxuICAgICAgfSk7XHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgIGRldGFpbCBIYW5kbGVycyAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGRldGFpbEhhbmRsZXJzKCkge1xyXG4gICAgJChcIiNidG4tc2F2ZS1vYnNlcnZhdGlvbnNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgUGF5bWVudHMuc2F2ZUFib25vcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2J0bi1zYXZlLXJlYWwtb2JzZXJ2YXRpb25zJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2xpZW50cy5zYXZlT2JzZXJ2YXRpb25zKCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGRldGFpbHNDb250cmFjdFRhYmxlLmluaXQoKTtcclxuXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhY291bnRIYW5kbGVycygpe1xyXG4gICAgdmFyICR1c2VySWQgICAgICAgICAgPSAkKFwiI2Fjb3VudC11c2VyLWlkXCIpXHJcbiAgICB2YXIgJGN1cnJlbnRQYXNzd29yZCA9ICQoXCIjYWNvdW50LWN1cnJlbnQtcGFzc3dvcmRcIilcclxuICAgIHZhciAkYnRuVXBkYXRlVXNlciAgICA9ICQoXCIjdXBkYXRlLXVzZXItZGF0YVwiKTtcclxuICAgIHZhciAkbmV3UGFzc3dvcmQgICAgICA9ICQoXCIjYWNvdW50LW5ldy1wYXNzd29yZFwiKTtcclxuXHJcbiAgICAkKFwiI2Fjb3VudC1jdXJyZW50LXBhc3N3b3JkXCIpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7ICAgIFxyXG4gICAgICBVc2Vycy5jb25maXJtUGFzc3dvcmQoJHVzZXJJZC52YWwoKSwkY3VycmVudFBhc3N3b3JkLnZhbCgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRidG5VcGRhdGVVc2VyLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBVc2Vycy51cGRhdGVQYXNzd29yZCgkdXNlcklkLnZhbCgpLCRjdXJyZW50UGFzc3dvcmQudmFsKCksJG5ld1Bhc3N3b3JkLnZhbCgpKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNlY3Rpb25IYW5kbGVycygpIHtcclxuICAgIGlmICghcmFuKSB7XHJcbiAgICAgIFNlY3Rpb25zLmdldElwcygpO1xyXG4gICAgICByYW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLWFkZC1zZWN0aW9uXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFNlY3Rpb25zLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgICQoXCIjc2VsZWN0LXNlY3RvclwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VjdGlvbnMuZ2V0SXBzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gICQoZnVuY3Rpb24gKCkge1xyXG4gICAgaW5pdENvbXBvbmVudHMoKVxyXG4gIH0pOyIsInZhciByYW4gPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIGxvZ2luSGFuZGxlcnMoKSB7XHJcblxyXG4gICQoXCIjc2VuZC1jcmVkZW50aWFsc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIFNlc3Npb24ubG9naW4oKTtcclxuICB9KTtcclxuXHJcbiAgJChcIiN1c2VyLWlucHV0XCIpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBsb2dpbkxpYnJhcnkuc2VuZFRvTG9naW4oZSlcclxuICB9KVxyXG5cclxuICAkKFwiI3Bhc3N3b3JkLWlucHV0XCIpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBsb2dpbkxpYnJhcnkuc2VuZFRvTG9naW4oZSlcclxuICB9KVxyXG5cclxuICAkKFwiYVtocmVmXVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsb2dpbkxpYnJhcnkubG9hZGluZygpO1xyXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciB0YXJnZXQgPSAkdGhpcy5hdHRyKCd0YXJnZXQnKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtcclxuICAgICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIDMwMDApXHJcbiAgICB9Y2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxudmFyIFNlc3Npb24gPSB7XHJcbiAgbG9naW46IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHVzZXIgICAgID0gJChcIiN1c2VyLWlucHV0XCIpLnZhbCgpO1xyXG4gICAgdmFyIHBhc3N3b3JkID0gJChcIiNwYXNzd29yZC1pbnB1dFwiKS52YWwoKTtcclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW3VzZXIsIHBhc3N3b3JkXSlcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgdmFyIGZvcm0gPSAndXNlcj0nICsgdXNlciArICcmcGFzc3dvcmQ9JyArIHBhc3N3b3JkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgnYXBwL2xvZ2luJywgZmFsc2UsIGZhbHNlLCBTZXNzaW9uLnByb2Nlc3NMb2dpbkRhdGEsIGZvcm0sIG51bGwsIGxvZ2luTGlicmFyeS5sb2FkaW5nKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArIFwiIExMZW5lIHRvZG9zIGxvcyBjYW1wb3MgaW5kaWNhZG9zIHBhcmEgaW5ncmVzYXJcIilcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBwcm9jZXNzTG9naW5EYXRhOiBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgaWYgKHJlc3BvbnNlID09IHRydWUpIHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBCQVNFX1VSTCArICdhcHAvYWRtaW4vJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogXCJub25lXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfSU5GTyArIFwiIFVzdWFyaW8geSBDb250cmFzZcOxYSBubyB2YWxpZG9zXCIpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG52YXIgbG9naW5MaWJyYXJ5ID0ge1xyXG4gIGxvYWRpbmc6IGZ1bmN0aW9uKHN0b3ApIHtcclxuICAgIGlmKCFzdG9wKXtcclxuICAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogXCJibG9ja1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgXHJcbiAgc2VuZFRvTG9naW46IGZ1bmN0aW9uKGUpIHtcclxuICAgIGtleSA9IGUud2hpY2hcclxuICAgIGlmIChrZXkgPT0gMTMpIHtcclxuICAgICAgU2Vzc2lvbi5sb2dpbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gIGxvZ2luSGFuZGxlcnMoKTtcclxufSkiLCIgIGZ1bmN0aW9uIGlzQ3VycmVudFBhZ2UocGFnZU5hbWUpe1xyXG4gICAgaWYoZ2V0Q3VycmVudFBhZ2UoKSA9PSBwYWdlTmFtZSl7XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9ICBcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRQYWdlKCl7XHJcbiAgICB2YXIgY3VycmVudFBhZ2UgPSAkKFwidGl0bGVcIikudGV4dCgpLnNwbGl0KFwiIFwiKTtcclxuICAgIGN1cnJlbnRQYWdlID0gY3VycmVudFBhZ2VbNF0udG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgICByZXR1cm4gY3VycmVudFBhZ2U7XHJcbiAgfVxyXG5cclxuICBpZihpc0N1cnJlbnRQYWdlKFwiY2llcnJlXCIpIHx8IGlzQ3VycmVudFBhZ2UoXCJjaWVycmUyXCIpKXtcclxuICAgIGNpZXJyZUNhamFGdW5jdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIGlmKGlzQ3VycmVudFBhZ2UoXCJyZXBvcnRlc1wiKSl7XHJcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICAgIHNjcmlwdC5zcmMgPSBCQVNFX1VSTCArIFwiYXNzZXRzL2pzL21pbi9yZXBvcnRlcy5taW4uanM/dmVyc2lvbj00LjAuMjJcIjtcclxuICAgICQoXCJib2R5XCIpLmFwcGVuZChzY3JpcHQpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2llcnJlQ2FqYUZ1bmN0aW9ucygpe1xyXG4gICAgdmFyIHRvdGFsZXMgPSB7XHJcbiAgICAgICAgICB0b3RhbDE6IDAsXHJcbiAgICAgICAgICB0b3RhbDU6IDAsXHJcbiAgICAgICAgICB0b3RhbDEwOiAwLFxyXG4gICAgICAgICAgdG90YWwyMDogMCxcclxuICAgICAgICAgIHRvdGFsMjU6IDAsXHJcbiAgICAgICAgICB0b3RhbDUwOiAwLFxyXG4gICAgICAgICAgdG90YWwxMDA6IDAsXHJcbiAgICAgICAgICB0b3RhbDIwMDogMCxcclxuICAgICAgICAgIHRvdGFsNTAwOiAwLFxyXG4gICAgICAgICAgdG90YWwxMDAwOiAwLFxyXG4gICAgICAgICAgdG90YWwyMDAwOiAwXHJcbiAgICAgICAgfVxyXG5cclxuICAgIHZhciBnYXN0byAgID0ge1xyXG4gICAgICAgICdmZWNoYSc6ICcnLFxyXG4gICAgICAgICdkZXNjcmlwY2lvbic6ICcnLFxyXG4gICAgICAgICdtb250byc6ICcnLFxyXG4gICAgICB9XHJcbiAgICB2YXIgZ2FzdG9zICA9IFt7ZmVjaGE6IG5vdygpLGRlc2NyaXBjaW9uOlwiaG9sYVwiLG1vbnRvOiAyMDAwLCBpZF9nYXN0bzogMX1dXHJcbiAgICB2YXIgYXV0b3IgICA9ICQoJyNhdXRvci1jaWVycmUnKS50ZXh0KCkudHJpbSgpXHJcblxyXG4gICAgdmFyIGFwcENpZXJyZSA9IG5ldyBWdWUoe1xyXG4gICAgICBlbDogJyNhcHAtY2llcnJlJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGlzSGlkZTogZmFsc2UsXHJcbiAgICAgICAgZmVjaGE6IG5vdygpLFxyXG4gICAgICAgIGRhdGFfY2llcnJlOntcclxuICAgICAgICAgIGF1dG9yOiBhdXRvcixcclxuICAgICAgICAgIHBhZ29zX2ZhY3R1cmFzOiAwLFxyXG4gICAgICAgICAgcGFnb3NfZXh0cmFzOiAwLFxyXG4gICAgICAgICAgcGFnb3NfZWZlY3Rpdm86IDAsXHJcbiAgICAgICAgICBwYWdvc19iYW5jbzogMCxcclxuICAgICAgICAgIHRvdGFsX2luZ3Jlc29zOiAwLFxyXG4gICAgICAgICAgZWZlY3Rpdm9fY2FqYTogMCxcclxuICAgICAgICAgIHRvdGFsX2Rlc2N1YWRyZTogMCxcclxuICAgICAgICAgIHRvdGFsX2dhc3RvczogMCxcclxuICAgICAgICAgIGJhbmNvOiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250ZW86dG90YWxlcyxcclxuICAgICAgICBzdW1hOiAwLFxyXG4gICAgICAgIGdhc3RvOiBnYXN0byxcclxuICAgICAgICBnYXN0b3M6IGdhc3Rvc1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgbW91bnRlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5nZXRHYXN0b3MoKTtcclxuICAgICAgICB0aGlzLnNldEluZ3Jlc29zKCk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBjcmVhdGVkOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJy53aWxsLWxvYWQnKS5jc3Moe3Zpc2liaWxpdHk6XCJ2aXNpYmxlXCJ9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgIGN1cnJlbmN5Rm9ybWF0OiBmdW5jdGlvbihudW1iZXIpe1xyXG4gICAgICAgICAgcmV0dXJuIEN1cnJlbmN5Rm9ybWF0KG51bWJlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgbWV0aG9kczp7XHJcbiAgICAgICAgY2hhbmdlVG90YWw6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgdmFyIHVuaXQgPSBlLnNyY0VsZW1lbnQuYXR0cmlidXRlc1snZGF0YS11bml0J10udmFsdWVcclxuICAgICAgICAgIHZhciBjYW50aWRhZCA9IGUuc3JjRWxlbWVudC52YWx1ZVxyXG4gICAgICAgICAgdmFyIHRvdGFsID0gY2FudGlkYWQgKiB1bml0XHJcbiAgICAgICAgICB0b3RhbGVzWyd0b3RhbCcrIHVuaXRdID0gY2FudGlkYWQgKiB1bml0ICogMS4wMCAgICBcclxuICAgICAgICB9LCBcclxuXHJcbiAgICAgICAgYWRkR2FzdG86IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIHZhciBnYXN0byA9IHRoaXMuZ2FzdG87XHJcbiAgICAgICAgICBnYXN0by5mZWNoYSA9IG5vdygpO1xyXG4gICAgICAgICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGdhc3RvKTtcclxuICAgICAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnY2FqYS9hZGRfZ2FzdG8nLGZvcm0pXHJcbiAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKVxyXG4gICAgICAgICAgICBhcHBDaWVycmUuZmlsbEdhc3RvcyhkYXRhLmdhc3RvcyxcIm5vcm1hbFwiKVxyXG4gICAgICAgICAgICBhcHBDaWVycmUuc2V0R2FzdG9Ub3RhbChkYXRhLnRvdGFsX2dhc3RvcylcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmaWxsR2FzdG9zOiBmdW5jdGlvbihnYXN0b3Nfc2Vydmlkb3IsbW9kZSl7XHJcbiAgICAgICAgICBpZihtb2RlID09IFwiZ3JvdXBcIil7XHJcbiAgICAgICAgICAgIGlmKGdhc3Rvc19zZXJ2aWRvciAhPSBudWxsIHx8IGdhc3Rvc19zZXJ2aWRvci5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhbZ2FzdG9zX3NlcnZpZG9yXSk7XHJcbiAgICAgICAgICAgICAgYXBwQ2llcnJlLmdhc3RvcyA9IGdhc3Rvc19zZXJ2aWRvcjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgYXBwQ2llcnJlLmdhc3RvcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYXBwQ2llcnJlLmdhc3Rvcy5wdXNoKEpTT04ucGFyc2UoZ2FzdG9zX3NlcnZpZG9yKVswXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0R2FzdG9Ub3RhbDogZnVuY3Rpb24odG90YWxHYXN0b3Mpe1xyXG4gICAgICAgICAgdGhpcy5kYXRhX2NpZXJyZS50b3RhbF9nYXN0b3MgPSB0b3RhbEdhc3Rvc1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldEdhc3RvOiBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIHZhciBnYXN0byA9IHRoaXMuZ2FzdG87XHJcbiAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZ2FzdG8pO1xyXG4gICAgICAgICAgY29ubmVjdEFuZFNlbmQoJ2NhamEvZ2V0X2dhc3RvJyxmYWxzZSxudWxsLGFwcENpZXJyZS5maWxsR2FzdG9zLGZvcm0sbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVsZXRlR2FzdG86IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICB2YXIgY2FsbGVyID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICBpZihjYWxsZXIubG9jYWxuYW1lID09IFwiaVwiKXtcclxuICAgICAgICAgICAgY2FsbGVyID0gY2FsbGVyLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgaWQgPSBjYWxsZXIuYXR0cmlidXRlc1snZGF0YS1pZCddLnZhbHVlXHJcbiAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgICAgdGV4dDogXCJTZWd1cm8gZGUgcXVlIHF1aWVyZSBlbGltaW5hciBlc3RlIGdhc3RvP1wiLFxyXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KHtpZDogaWQsIGZlY2hhOm5vdygpfSlcclxuICAgICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2NhamEvZGVsZXRlX2dhc3RvJyxmb3JtKVxyXG4gICAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSlcclxuICAgICAgICAgICAgICBhcHBDaWVycmUuZmlsbEdhc3RvcyhkYXRhLmdhc3RvcyxcImdyb3VwXCIpXHJcbiAgICAgICAgICAgICAgYXBwQ2llcnJlLnNldEdhc3RvVG90YWwoZGF0YS50b3RhbF9nYXN0b3MpIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pOyAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldEdhc3RvczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciBkYXRhID0ge2ZlY2hhOiBub3coKX1cclxuICAgICAgICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShkYXRhKVxyXG4gICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdjYWphL2dldF9nYXN0b3MnLGZvcm0pXHJcbiAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKVxyXG4gICAgICAgICAgICBhcHBDaWVycmUuZmlsbEdhc3RvcyhkYXRhLmdhc3RvcyxcImdyb3VwXCIpXHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5zZXRHYXN0b1RvdGFsKGRhdGEudG90YWxfZ2FzdG9zKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0SW5ncmVzb3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgZm9ybSA9ICdkYXRhPScgKyBKU09OLnN0cmluZ2lmeSh7ZmVjaGE6IG5vdygpfSlcclxuICAgICAgICAgIHZhciBzZWxmID0gdGhpcy5kYXRhX2NpZXJyZTtcclxuICAgICAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnY2FqYS9nZXRfaW5ncmVzb3MnLGZvcm0pXHJcbiAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgc2VsZi5wYWdvc19mYWN0dXJhcyA9IGRhdGEucGFnb3NfZmFjdHVyYXM7XHJcbiAgICAgICAgICAgIHNlbGYucGFnb3NfZXh0cmFzID0gZGF0YS5wYWdvc19leHRyYXM7XHJcbiAgICAgICAgICAgIHNlbGYucGFnb3NfZWZlY3Rpdm8gPSBkYXRhLnBhZ29zX2VmZWN0aXZvO1xyXG4gICAgICAgICAgICBzZWxmLnBhZ29zX2JhbmNvID0gZGF0YS5wYWdvc19iYW5jbztcclxuICAgICAgICAgICAgc2VsZi50b3RhbF9pbmdyZXNvcyA9IHBhcnNlRmxvYXQoZGF0YS5wYWdvc19mYWN0dXJhcykgKyBwYXJzZUZsb2F0KHNlbGYucGFnb3NfZXh0cmFzKTtcclxuICAgICAgICAgICAgc2VsZi50b3RhbF9kZXNjdWFkcmUgPSAtIHNlbGYucGFnb3NfZWZlY3Rpdm8gKyBzZWxmLmVmZWN0aXZvX2NhamE7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjZXJyYXJDYWphOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHNlbGYgICA9IHRoaXM7XHJcbiAgICAgICAgICB2YXIgY2llcnJlID0gdGhpcy5kYXRhX2NpZXJyZTtcclxuICAgICAgICAgIHdpbmRvdy5jaWVycmUgPSBjaWVycmU7XHJcbiAgICAgICAgICBpZihjaWVycmUudG90YWxfZGVzY3VhZHJlICE9IDApe1xyXG4gICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgICAgIHRleHQ6IFwiSGF5IHVuIGRlc2N1YWRyZSBlbiBsYSBjYWphLCBxdWllcmUgaGFjZXIgZWwgY2llcnJlIGRlIHRvZG9zIG1vZG9zP1wiLFxyXG4gICAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnU2knLFxyXG4gICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdObydcclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIHNlbGYuY2VycmFyKGNpZXJyZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzZWxmLmNlcnJhcihjaWVycmUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNlcnJhcjogZnVuY3Rpb24oY2llcnJlKXtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgY2llcnJlLmZlY2hhID0gbm93KCk7XHJcbiAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoY2llcnJlKTtcclxuICAgICAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnY2FqYS9hZGRfY2llcnJlJyxmb3JtKVxyXG4gICAgICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhXHJcbiAgICAgICAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSlcclxuICAgICAgICAgICAgc2VsZi5pc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBhcHBTdW1tYXJ5Vmlldy5pc0hpZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYXBwU3VtbWFyeVZpZXcuY2llcnJlID0gY2llcnJlO1xyXG4gICAgICAgICAgICAkKFwiI2FwcC1jaWVycmVcIikuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgJChcIi50b3AtbmF2XCIpLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICQoXCIjcHJpbnQtdmlld1wiKS5jc3Moe3Zpc2liaWxpdHk6IFwidmlzaWJsZVwifSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgY29tcHV0ZWQ6e1xyXG4gICAgICAgIGdldFRvdGFsOiBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIHZhciB0ID0gdG90YWxlcztcclxuICAgICAgICAgIHZhciBzZWxmID0gdGhpcy5kYXRhX2NpZXJyZTtcclxuICAgICAgICAgIHZhciBzdW1hID0gc3VtYXIoW3QudG90YWwxLHQudG90YWw1LHQudG90YWwxMCwgdC50b3RhbDIwLCB0LnRvdGFsMjUsIHQudG90YWw1MCwgdC50b3RhbDEwMCwgdC50b3RhbDIwMCwgdC50b3RhbDUwMCwgdC50b3RhbDEwMDAsIHQudG90YWwyMDAwXSk7XHJcbiAgICAgICAgICB0aGlzLnN1bWEgPSBzdW1hO1xyXG4gICAgICAgICAgc2VsZi5lZmVjdGl2b19jYWphID0gc3VtYS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgc2VsZi50b3RhbF9kZXNjdWFkcmUgPSBwYXJzZUZsb2F0KC1zZWxmLnBhZ29zX2VmZWN0aXZvKSArIHBhcnNlRmxvYXQoc2VsZi5lZmVjdGl2b19jYWphKTtcclxuICAgICAgICAgIHNlbGYuYmFuY28gPSBwYXJzZUZsb2F0KHNlbGYucGFnb3NfYmFuY28pICsgcGFyc2VGbG9hdChzZWxmLnBhZ29zX2VmZWN0aXZvKSAtIHBhcnNlRmxvYXQoc2VsZi50b3RhbF9nYXN0b3MpICsgcGFyc2VGbG9hdChzZWxmLnRvdGFsX2Rlc2N1YWRyZSlcclxuICAgICAgICAgIHJldHVybiB0aGlzLnN1bWE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVjaW1hbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgZmllbGRzID0gW1wicGFnb3NfZmFjdHVyYXNcIixcInBhZ29zX2V4dHJhXCIsXCJwYWdvc19lZmVjdGl2b1wiLFwicGFnb3NfYmFuY29cIixcInRvdGFsX2luZ3Jlc29zXCIsXCJlZmVjdGl2b19jYWphXCIsXCJ0b3RhbF9kZXNjdWFkcmVcIixcInRvdGFsX2dhc3RvXCIsXCJiYW5jb1wiXTtcclxuICAgICAgICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YV9jaWVycmVbZmllbGRdID0gdGhpcy5kYXRhX2NpZXJyZVtmaWVsZF0udG9GaXhlZCgyKVxyXG4gICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHdpbmRvdy5hcHBDaWVycmUgPSBhcHBDaWVycmU7XHJcbiAgICBmdW5jdGlvbiBzdW1hciAodmFsb3Jlcyl7XHJcbiAgICAgIHZhciBzdW1hID0gMDtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWxvcmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc3VtYSArPSBwYXJzZUZsb2F0KHZhbG9yZXNbaV0pOyBcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3VtYTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBub3coKXtcclxuICAgICAgcmV0dXJuIG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFZ1ZS5jb21wb25lbnQoJ3N1bW1hcnktcHJpbnQtdmlldycse1xyXG4gICAgdGVtcGxhdGU6ICdcXFxyXG4gICAgPGRpdiBjbGFzcz1cInByaW50LWNvbnRhaW5lclwiPlxcXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJfX2hlYWRlclwiPlxcXHJcbiAgICAgIDxoMiBjbGFzcz1cIl9fdGl0bGUgdC1jZW50ZXJcIj4ge3t0aXRsZX19PC9oMj5cXFxyXG4gICAgICA8L2Rpdj5cXFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiX19ib2R5XCI+XFxcclxuICAgICAgPHByaW50ZWFibGU+PC9wcmludGVhYmxlPlxcXHJcbiAgICAgIDwvZGl2PlxcXHJcbiAgICA8ZGl2PlxcXHJcbiAgICBcXFxyXG4gICAgJyxcclxuICAgIHByb3BzOlsnc29tZXZhbHVlJ10sXHJcbiAgICBtZXRob2RzOntcclxuICAgICAgZ29CYWNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGFwcFN1bW1hcnlWaWV3LmlzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgd2luZG93LmFwcENpZXJyZS5pc0hpZGUgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLmlzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgJChcIi50b3AtbmF2XCIpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgJChcIiNhcHAtY2llcnJlXCIpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYXRhOiBmdW5jdGlvbigpe1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGJhY2s6IHtsaW5rOlwic29tZWxpbmtcIix0ZXh0Olwidm9sdmVyIGEgY2llcnJlXCJ9LFxyXG4gICAgICAgIGZvd2FyZDoge2xpbms6IEJBU0VfVVJMICsgXCJhcHAvbG9nb3V0XCIsdGV4dDpcImNlcnJhciBzZXNzaW9uXCJ9LFxyXG4gICAgICAgIHRpdGxlOlwiUmVzdW1lbiBkZSBjaWVycmUgZGUgaG95XCIsXHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgdmFyIGFwcFN1bW1hcnlWaWV3ID0gbmV3IFZ1ZSh7XHJcbiAgICBlbDogXCIjcHJpbnQtdmlld1wiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBpc0hpZGU6IHRydWUsXHJcbiAgICAgIGJhY2s6IHtsaW5rOlwic29tZWxpbmtcIix0ZXh0Olwidm9sdmVyIGEgY2llcnJlXCJ9LFxyXG4gICAgICBmb3dhcmQ6IHtsaW5rOiBCQVNFX1VSTCArIFwiYXBwL2xvZ291dFwiLHRleHQ6XCJjZXJyYXIgc2Vzc2lvblwifSxcclxuICAgICAgY2llcnJlOntcclxuICAgICAgICAgIGF1dG9yOiAnJyxcclxuICAgICAgICAgIHBhZ29zX2ZhY3R1cmFzOiAwLFxyXG4gICAgICAgICAgcGFnb3NfZXh0cmFzOiAwLFxyXG4gICAgICAgICAgcGFnb3NfZWZlY3Rpdm86IDAsXHJcbiAgICAgICAgICBwYWdvc19iYW5jbzogMCxcclxuICAgICAgICAgIHRvdGFsX2luZ3Jlc29zOiAwLFxyXG4gICAgICAgICAgZWZlY3Rpdm9fY2FqYTogMCxcclxuICAgICAgICAgIHRvdGFsX2Rlc2N1YWRyZTogMCxcclxuICAgICAgICAgIHRvdGFsX2dhc3RvczogMCxcclxuICAgICAgICAgIGJhbmNvOiAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGZpbHRlcnM6IHtcclxuICAgICAgY3VycmVuY3lGb3JtYXQ6IGZ1bmN0aW9uKG51bWJlcil7XHJcbiAgICAgICAgcmV0dXJuIFwiUkQkIFwiKyBDdXJyZW5jeUZvcm1hdChudW1iZXIpO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgc3BhbmlzaERhdGVGb3JtYXQ6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgIG1vbWVudC5sb2NhbGUoJ2VzLURPJyk7XHJcbiAgICAgICAgcmV0dXJuIG1vbWVudChkYXRlKS5mb3JtYXQoJ2RkZGQgREQgW2RlXSBNTU1NIFtkZWxdIFlZWVknKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczp7XHJcbiAgICAgIGdvQmFjazogZnVuY3Rpb24oKXtcclxuICAgICAgICBhcHBTdW1tYXJ5Vmlldy5pc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgIHdpbmRvdy5hcHBDaWVycmUuaXNIaWRlID0gZmFsc2U7XHJcbiAgICAgICAgc2VsZi5pc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgICQoXCIudG9wLW5hdlwiKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICQoXCIjYXBwLWNpZXJyZVwiKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgICB9LFxyXG4gICAgICBwcmludDogZnVuY3Rpb24oKXtcclxuICAgICAgICBwcmludCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KSIsIi8qISBBZG1pbkxURSBhcHAuanNcbiogPT09PT09PT09PT09PT09PVxuKiBNYWluIEpTIGFwcGxpY2F0aW9uIGZpbGUgZm9yIEFkbWluTFRFIHYyLiBUaGlzIGZpbGVcbiogc2hvdWxkIGJlIGluY2x1ZGVkIGluIGFsbCBwYWdlcy4gSXQgY29udHJvbHMgc29tZSBsYXlvdXRcbiogb3B0aW9ucyBhbmQgaW1wbGVtZW50cyBleGNsdXNpdmUgQWRtaW5MVEUgcGx1Z2lucy5cbipcbiogQEF1dGhvciAgQWxtc2FlZWQgU3R1ZGlvXG4qIEBTdXBwb3J0IDxodHRwczovL3d3dy5hbG1zYWVlZHN0dWRpby5jb20+XG4qIEBFbWFpbCAgIDxhYmR1bGxhaEBhbG1zYWVlZHN0dWRpby5jb20+XG4qIEB2ZXJzaW9uIDIuNC4wXG4qIEByZXBvc2l0b3J5IGdpdDovL2dpdGh1Yi5jb20vYWxtYXNhZWVkMjAxMC9BZG1pbkxURS5naXRcbiogQGxpY2Vuc2UgTUlUIDxodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUPlxuKi9cbmlmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBqUXVlcnkpdGhyb3cgbmV3IEVycm9yKFwiQWRtaW5MVEUgcmVxdWlyZXMgalF1ZXJ5XCIpOytmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZT1hKHRoaXMpLGY9ZS5kYXRhKGMpO2lmKCFmKXt2YXIgaD1hLmV4dGVuZCh7fSxkLGUuZGF0YSgpLFwib2JqZWN0XCI9PXR5cGVvZiBiJiZiKTtlLmRhdGEoYyxmPW5ldyBnKGgpKX1pZihcInN0cmluZ1wiPT10eXBlb2YgYil7aWYodm9pZCAwPT09ZltiXSl0aHJvdyBuZXcgRXJyb3IoXCJObyBtZXRob2QgbmFtZWQgXCIrYik7ZltiXSgpfX0pfXZhciBjPVwibHRlLmxheW91dFwiLGQ9e3NsaW1zY3JvbGw6ITAscmVzZXRIZWlnaHQ6ITB9LGU9e3dyYXBwZXI6XCIud3JhcHBlclwiLGNvbnRlbnRXcmFwcGVyOlwiLmNvbnRlbnQtd3JhcHBlclwiLGxheW91dEJveGVkOlwiLmxheW91dC1ib3hlZFwiLG1haW5Gb290ZXI6XCIubWFpbi1mb290ZXJcIixtYWluSGVhZGVyOlwiLm1haW4taGVhZGVyXCIsc2lkZWJhcjpcIi5zaWRlYmFyXCIsY29udHJvbFNpZGViYXI6XCIuY29udHJvbC1zaWRlYmFyXCIsZml4ZWQ6XCIuZml4ZWRcIixzaWRlYmFyTWVudTpcIi5zaWRlYmFyLW1lbnVcIixsb2dvOlwiLm1haW4taGVhZGVyIC5sb2dvXCJ9LGY9e2ZpeGVkOlwiZml4ZWRcIixob2xkVHJhbnNpdGlvbjpcImhvbGQtdHJhbnNpdGlvblwifSxnPWZ1bmN0aW9uKGEpe3RoaXMub3B0aW9ucz1hLHRoaXMuYmluZGVkUmVzaXplPSExLHRoaXMuYWN0aXZhdGUoKX07Zy5wcm90b3R5cGUuYWN0aXZhdGU9ZnVuY3Rpb24oKXt0aGlzLmZpeCgpLHRoaXMuZml4U2lkZWJhcigpLGEoXCJib2R5XCIpLnJlbW92ZUNsYXNzKGYuaG9sZFRyYW5zaXRpb24pLHRoaXMub3B0aW9ucy5yZXNldEhlaWdodCYmYShcImJvZHksIGh0bWwsIFwiK2Uud3JhcHBlcikuY3NzKHtoZWlnaHQ6XCJhdXRvXCIsXCJtaW4taGVpZ2h0XCI6XCIxMDAlXCJ9KSx0aGlzLmJpbmRlZFJlc2l6ZXx8KGEod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXt0aGlzLmZpeCgpLHRoaXMuZml4U2lkZWJhcigpLGEoZS5sb2dvK1wiLCBcIitlLnNpZGViYXIpLm9uZShcIndlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmRcIixmdW5jdGlvbigpe3RoaXMuZml4KCksdGhpcy5maXhTaWRlYmFyKCl9LmJpbmQodGhpcykpfS5iaW5kKHRoaXMpKSx0aGlzLmJpbmRlZFJlc2l6ZT0hMCksYShlLnNpZGViYXJNZW51KS5vbihcImV4cGFuZGVkLnRyZWVcIixmdW5jdGlvbigpe3RoaXMuZml4KCksdGhpcy5maXhTaWRlYmFyKCl9LmJpbmQodGhpcykpLGEoZS5zaWRlYmFyTWVudSkub24oXCJjb2xsYXBzZWQudHJlZVwiLGZ1bmN0aW9uKCl7dGhpcy5maXgoKSx0aGlzLmZpeFNpZGViYXIoKX0uYmluZCh0aGlzKSl9LGcucHJvdG90eXBlLmZpeD1mdW5jdGlvbigpe2EoZS5sYXlvdXRCb3hlZCtcIiA+IFwiK2Uud3JhcHBlcikuY3NzKFwib3ZlcmZsb3dcIixcImhpZGRlblwiKTt2YXIgYj1hKGUubWFpbkZvb3Rlcikub3V0ZXJIZWlnaHQoKXx8MCxjPWEoZS5tYWluSGVhZGVyKS5vdXRlckhlaWdodCgpK2IsZD1hKHdpbmRvdykuaGVpZ2h0KCksZz1hKGUuc2lkZWJhcikuaGVpZ2h0KCl8fDA7aWYoYShcImJvZHlcIikuaGFzQ2xhc3MoZi5maXhlZCkpYShlLmNvbnRlbnRXcmFwcGVyKS5jc3MoXCJtaW4taGVpZ2h0XCIsZC1iKTtlbHNle3ZhciBoO2Q+PWc/KGEoZS5jb250ZW50V3JhcHBlcikuY3NzKFwibWluLWhlaWdodFwiLGQtYyksaD1kLWMpOihhKGUuY29udGVudFdyYXBwZXIpLmNzcyhcIm1pbi1oZWlnaHRcIixnKSxoPWcpO3ZhciBpPWEoZS5jb250cm9sU2lkZWJhcik7dm9pZCAwIT09aSYmaS5oZWlnaHQoKT5oJiZhKGUuY29udGVudFdyYXBwZXIpLmNzcyhcIm1pbi1oZWlnaHRcIixpLmhlaWdodCgpKX19LGcucHJvdG90eXBlLmZpeFNpZGViYXI9ZnVuY3Rpb24oKXtpZighYShcImJvZHlcIikuaGFzQ2xhc3MoZi5maXhlZCkpcmV0dXJuIHZvaWQodm9pZCAwIT09YS5mbi5zbGltU2Nyb2xsJiZhKGUuc2lkZWJhcikuc2xpbVNjcm9sbCh7ZGVzdHJveTohMH0pLmhlaWdodChcImF1dG9cIikpO3RoaXMub3B0aW9ucy5zbGltc2Nyb2xsJiZ2b2lkIDAhPT1hLmZuLnNsaW1TY3JvbGwmJihhKGUuc2lkZWJhcikuc2xpbVNjcm9sbCh7ZGVzdHJveTohMH0pLmhlaWdodChcImF1dG9cIiksYShlLnNpZGViYXIpLnNsaW1TY3JvbGwoe2hlaWdodDphKHdpbmRvdykuaGVpZ2h0KCktYShlLm1haW5IZWFkZXIpLmhlaWdodCgpK1wicHhcIixjb2xvcjpcInJnYmEoMCwwLDAsMC4yKVwiLHNpemU6XCIzcHhcIn0pKX07dmFyIGg9YS5mbi5sYXlvdXQ7YS5mbi5sYXlvdXQ9YixhLmZuLmxheW91dC5Db25zdHVjdG9yPWcsYS5mbi5sYXlvdXQubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLmxheW91dD1oLHRoaXN9LGEod2luZG93KS5vbihcImxvYWRcIixmdW5jdGlvbigpe2IuY2FsbChhKFwiYm9keVwiKSl9KX0oalF1ZXJ5KSxmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZT1hKHRoaXMpLGY9ZS5kYXRhKGMpO2lmKCFmKXt2YXIgZz1hLmV4dGVuZCh7fSxkLGUuZGF0YSgpLFwib2JqZWN0XCI9PXR5cGVvZiBiJiZiKTtlLmRhdGEoYyxmPW5ldyBoKGcpKX1cInRvZ2dsZVwiPT1iJiZmLnRvZ2dsZSgpfSl9dmFyIGM9XCJsdGUucHVzaG1lbnVcIixkPXtjb2xsYXBzZVNjcmVlblNpemU6NzY3LGV4cGFuZE9uSG92ZXI6ITEsZXhwYW5kVHJhbnNpdGlvbkRlbGF5OjIwMH0sZT17Y29sbGFwc2VkOlwiLnNpZGViYXItY29sbGFwc2VcIixvcGVuOlwiLnNpZGViYXItb3BlblwiLG1haW5TaWRlYmFyOlwiLm1haW4tc2lkZWJhclwiLGNvbnRlbnRXcmFwcGVyOlwiLmNvbnRlbnQtd3JhcHBlclwiLHNlYXJjaElucHV0OlwiLnNpZGViYXItZm9ybSAuZm9ybS1jb250cm9sXCIsYnV0dG9uOidbZGF0YS10b2dnbGU9XCJwdXNoLW1lbnVcIl0nLG1pbmk6XCIuc2lkZWJhci1taW5pXCIsZXhwYW5kZWQ6XCIuc2lkZWJhci1leHBhbmRlZC1vbi1ob3ZlclwiLGxheW91dEZpeGVkOlwiLmZpeGVkXCJ9LGY9e2NvbGxhcHNlZDpcInNpZGViYXItY29sbGFwc2VcIixvcGVuOlwic2lkZWJhci1vcGVuXCIsbWluaTpcInNpZGViYXItbWluaVwiLGV4cGFuZGVkOlwic2lkZWJhci1leHBhbmRlZC1vbi1ob3ZlclwiLGV4cGFuZEZlYXR1cmU6XCJzaWRlYmFyLW1pbmktZXhwYW5kLWZlYXR1cmVcIixsYXlvdXRGaXhlZDpcImZpeGVkXCJ9LGc9e2V4cGFuZGVkOlwiZXhwYW5kZWQucHVzaE1lbnVcIixjb2xsYXBzZWQ6XCJjb2xsYXBzZWQucHVzaE1lbnVcIn0saD1mdW5jdGlvbihhKXt0aGlzLm9wdGlvbnM9YSx0aGlzLmluaXQoKX07aC5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpeyh0aGlzLm9wdGlvbnMuZXhwYW5kT25Ib3Zlcnx8YShcImJvZHlcIikuaXMoZS5taW5pK2UubGF5b3V0Rml4ZWQpKSYmKHRoaXMuZXhwYW5kT25Ib3ZlcigpLGEoXCJib2R5XCIpLmFkZENsYXNzKGYuZXhwYW5kRmVhdHVyZSkpLGEoZS5jb250ZW50V3JhcHBlcikuY2xpY2soZnVuY3Rpb24oKXthKHdpbmRvdykud2lkdGgoKTw9dGhpcy5vcHRpb25zLmNvbGxhcHNlU2NyZWVuU2l6ZSYmYShcImJvZHlcIikuaGFzQ2xhc3MoZi5vcGVuKSYmdGhpcy5jbG9zZSgpfS5iaW5kKHRoaXMpKSxhKGUuc2VhcmNoSW5wdXQpLmNsaWNrKGZ1bmN0aW9uKGEpe2Euc3RvcFByb3BhZ2F0aW9uKCl9KX0saC5wcm90b3R5cGUudG9nZ2xlPWZ1bmN0aW9uKCl7dmFyIGI9YSh3aW5kb3cpLndpZHRoKCksYz0hYShcImJvZHlcIikuaGFzQ2xhc3MoZi5jb2xsYXBzZWQpO2I8PXRoaXMub3B0aW9ucy5jb2xsYXBzZVNjcmVlblNpemUmJihjPWEoXCJib2R5XCIpLmhhc0NsYXNzKGYub3BlbikpLGM/dGhpcy5jbG9zZSgpOnRoaXMub3BlbigpfSxoLnByb3RvdHlwZS5vcGVuPWZ1bmN0aW9uKCl7YSh3aW5kb3cpLndpZHRoKCk+dGhpcy5vcHRpb25zLmNvbGxhcHNlU2NyZWVuU2l6ZT9hKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhmLmNvbGxhcHNlZCkudHJpZ2dlcihhLkV2ZW50KGcuZXhwYW5kZWQpKTphKFwiYm9keVwiKS5hZGRDbGFzcyhmLm9wZW4pLnRyaWdnZXIoYS5FdmVudChnLmV4cGFuZGVkKSl9LGgucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKCl7YSh3aW5kb3cpLndpZHRoKCk+dGhpcy5vcHRpb25zLmNvbGxhcHNlU2NyZWVuU2l6ZT9hKFwiYm9keVwiKS5hZGRDbGFzcyhmLmNvbGxhcHNlZCkudHJpZ2dlcihhLkV2ZW50KGcuY29sbGFwc2VkKSk6YShcImJvZHlcIikucmVtb3ZlQ2xhc3MoZi5vcGVuK1wiIFwiK2YuY29sbGFwc2VkKS50cmlnZ2VyKGEuRXZlbnQoZy5jb2xsYXBzZWQpKX0saC5wcm90b3R5cGUuZXhwYW5kT25Ib3Zlcj1mdW5jdGlvbigpe2EoZS5tYWluU2lkZWJhcikuaG92ZXIoZnVuY3Rpb24oKXthKFwiYm9keVwiKS5pcyhlLm1pbmkrZS5jb2xsYXBzZWQpJiZhKHdpbmRvdykud2lkdGgoKT50aGlzLm9wdGlvbnMuY29sbGFwc2VTY3JlZW5TaXplJiZ0aGlzLmV4cGFuZCgpfS5iaW5kKHRoaXMpLGZ1bmN0aW9uKCl7YShcImJvZHlcIikuaXMoZS5leHBhbmRlZCkmJnRoaXMuY29sbGFwc2UoKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLmV4cGFuZD1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXthKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhmLmNvbGxhcHNlZCkuYWRkQ2xhc3MoZi5leHBhbmRlZCl9LHRoaXMub3B0aW9ucy5leHBhbmRUcmFuc2l0aW9uRGVsYXkpfSxoLnByb3RvdHlwZS5jb2xsYXBzZT1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXthKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhmLmV4cGFuZGVkKS5hZGRDbGFzcyhmLmNvbGxhcHNlZCl9LHRoaXMub3B0aW9ucy5leHBhbmRUcmFuc2l0aW9uRGVsYXkpfTt2YXIgaT1hLmZuLnB1c2hNZW51O2EuZm4ucHVzaE1lbnU9YixhLmZuLnB1c2hNZW51LkNvbnN0cnVjdG9yPWgsYS5mbi5wdXNoTWVudS5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4ucHVzaE1lbnU9aSx0aGlzfSxhKGRvY3VtZW50KS5vbihcImNsaWNrXCIsZS5idXR0b24sZnVuY3Rpb24oYyl7Yy5wcmV2ZW50RGVmYXVsdCgpLGIuY2FsbChhKHRoaXMpLFwidG9nZ2xlXCIpfSksYSh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7Yi5jYWxsKGEoZS5idXR0b24pKX0pfShqUXVlcnkpLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyk7aWYoIWUuZGF0YShjKSl7dmFyIGY9YS5leHRlbmQoe30sZCxlLmRhdGEoKSxcIm9iamVjdFwiPT10eXBlb2YgYiYmYik7ZS5kYXRhKGMsbmV3IGgoZSxmKSl9fSl9dmFyIGM9XCJsdGUudHJlZVwiLGQ9e2FuaW1hdGlvblNwZWVkOjUwMCxhY2NvcmRpb246ITAsZm9sbG93TGluazohMSx0cmlnZ2VyOlwiLnRyZWV2aWV3IGFcIn0sZT17dHJlZTpcIi50cmVlXCIsdHJlZXZpZXc6XCIudHJlZXZpZXdcIix0cmVldmlld01lbnU6XCIudHJlZXZpZXctbWVudVwiLG9wZW46XCIubWVudS1vcGVuLCAuYWN0aXZlXCIsbGk6XCJsaVwiLGRhdGE6J1tkYXRhLXdpZGdldD1cInRyZWVcIl0nLGFjdGl2ZTpcIi5hY3RpdmVcIn0sZj17b3BlbjpcIm1lbnUtb3BlblwiLHRyZWU6XCJ0cmVlXCJ9LGc9e2NvbGxhcHNlZDpcImNvbGxhcHNlZC50cmVlXCIsZXhwYW5kZWQ6XCJleHBhbmRlZC50cmVlXCJ9LGg9ZnVuY3Rpb24oYixjKXt0aGlzLmVsZW1lbnQ9Yix0aGlzLm9wdGlvbnM9YyxhKHRoaXMuZWxlbWVudCkuYWRkQ2xhc3MoZi50cmVlKSxhKGUudHJlZXZpZXcrZS5hY3RpdmUsdGhpcy5lbGVtZW50KS5hZGRDbGFzcyhmLm9wZW4pLHRoaXMuX3NldFVwTGlzdGVuZXJzKCl9O2gucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihhLGIpe3ZhciBjPWEubmV4dChlLnRyZWV2aWV3TWVudSksZD1hLnBhcmVudCgpLGc9ZC5oYXNDbGFzcyhmLm9wZW4pO2QuaXMoZS50cmVldmlldykmJih0aGlzLm9wdGlvbnMuZm9sbG93TGluayYmXCIjXCIhPWEuYXR0cihcImhyZWZcIil8fGIucHJldmVudERlZmF1bHQoKSxnP3RoaXMuY29sbGFwc2UoYyxkKTp0aGlzLmV4cGFuZChjLGQpKX0saC5wcm90b3R5cGUuZXhwYW5kPWZ1bmN0aW9uKGIsYyl7dmFyIGQ9YS5FdmVudChnLmV4cGFuZGVkKTtpZih0aGlzLm9wdGlvbnMuYWNjb3JkaW9uKXt2YXIgaD1jLnNpYmxpbmdzKGUub3BlbiksaT1oLmNoaWxkcmVuKGUudHJlZXZpZXdNZW51KTt0aGlzLmNvbGxhcHNlKGksaCl9Yy5hZGRDbGFzcyhmLm9wZW4pLGIuc2xpZGVEb3duKHRoaXMub3B0aW9ucy5hbmltYXRpb25TcGVlZCxmdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS50cmlnZ2VyKGQpfS5iaW5kKHRoaXMpKX0saC5wcm90b3R5cGUuY29sbGFwc2U9ZnVuY3Rpb24oYixjKXt2YXIgZD1hLkV2ZW50KGcuY29sbGFwc2VkKTtiLmZpbmQoZS5vcGVuKS5yZW1vdmVDbGFzcyhmLm9wZW4pLGMucmVtb3ZlQ2xhc3MoZi5vcGVuKSxiLnNsaWRlVXAodGhpcy5vcHRpb25zLmFuaW1hdGlvblNwZWVkLGZ1bmN0aW9uKCl7Yi5maW5kKGUub3BlbitcIiA+IFwiK2UudHJlZXZpZXcpLnNsaWRlVXAoKSxhKHRoaXMuZWxlbWVudCkudHJpZ2dlcihkKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLl9zZXRVcExpc3RlbmVycz1mdW5jdGlvbigpe3ZhciBiPXRoaXM7YSh0aGlzLmVsZW1lbnQpLm9uKFwiY2xpY2tcIix0aGlzLm9wdGlvbnMudHJpZ2dlcixmdW5jdGlvbihjKXtiLnRvZ2dsZShhKHRoaXMpLGMpfSl9O3ZhciBpPWEuZm4udHJlZTthLmZuLnRyZWU9YixhLmZuLnRyZWUuQ29uc3RydWN0b3I9aCxhLmZuLnRyZWUubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLnRyZWU9aSx0aGlzfSxhKHdpbmRvdykub24oXCJsb2FkXCIsZnVuY3Rpb24oKXthKGUuZGF0YSkuZWFjaChmdW5jdGlvbigpe2IuY2FsbChhKHRoaXMpKX0pfSl9KGpRdWVyeSksZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9YSh0aGlzKSxmPWUuZGF0YShjKTtpZighZil7dmFyIGc9YS5leHRlbmQoe30sZCxlLmRhdGEoKSxcIm9iamVjdFwiPT10eXBlb2YgYiYmYik7ZS5kYXRhKGMsZj1uZXcgaChlLGcpKX1cInN0cmluZ1wiPT10eXBlb2YgYiYmZi50b2dnbGUoKX0pfXZhciBjPVwibHRlLmNvbnRyb2xzaWRlYmFyXCIsZD17c2xpZGU6ITB9LGU9e3NpZGViYXI6XCIuY29udHJvbC1zaWRlYmFyXCIsZGF0YTonW2RhdGEtdG9nZ2xlPVwiY29udHJvbC1zaWRlYmFyXCJdJyxvcGVuOlwiLmNvbnRyb2wtc2lkZWJhci1vcGVuXCIsYmc6XCIuY29udHJvbC1zaWRlYmFyLWJnXCIsd3JhcHBlcjpcIi53cmFwcGVyXCIsY29udGVudDpcIi5jb250ZW50LXdyYXBwZXJcIixib3hlZDpcIi5sYXlvdXQtYm94ZWRcIn0sZj17b3BlbjpcImNvbnRyb2wtc2lkZWJhci1vcGVuXCIsZml4ZWQ6XCJmaXhlZFwifSxnPXtjb2xsYXBzZWQ6XCJjb2xsYXBzZWQuY29udHJvbHNpZGViYXJcIixleHBhbmRlZDpcImV4cGFuZGVkLmNvbnRyb2xzaWRlYmFyXCJ9LGg9ZnVuY3Rpb24oYSxiKXt0aGlzLmVsZW1lbnQ9YSx0aGlzLm9wdGlvbnM9Yix0aGlzLmhhc0JpbmRlZFJlc2l6ZT0hMSx0aGlzLmluaXQoKX07aC5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS5pcyhlLmRhdGEpfHxhKHRoaXMpLm9uKFwiY2xpY2tcIix0aGlzLnRvZ2dsZSksdGhpcy5maXgoKSxhKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7dGhpcy5maXgoKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihiKXtiJiZiLnByZXZlbnREZWZhdWx0KCksdGhpcy5maXgoKSxhKGUuc2lkZWJhcikuaXMoZS5vcGVuKXx8YShcImJvZHlcIikuaXMoZS5vcGVuKT90aGlzLmNvbGxhcHNlKCk6dGhpcy5leHBhbmQoKX0saC5wcm90b3R5cGUuZXhwYW5kPWZ1bmN0aW9uKCl7dGhpcy5vcHRpb25zLnNsaWRlP2EoZS5zaWRlYmFyKS5hZGRDbGFzcyhmLm9wZW4pOmEoXCJib2R5XCIpLmFkZENsYXNzKGYub3BlbiksYSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoYS5FdmVudChnLmV4cGFuZGVkKSl9LGgucHJvdG90eXBlLmNvbGxhcHNlPWZ1bmN0aW9uKCl7YShcImJvZHksIFwiK2Uuc2lkZWJhcikucmVtb3ZlQ2xhc3MoZi5vcGVuKSxhKHRoaXMuZWxlbWVudCkudHJpZ2dlcihhLkV2ZW50KGcuY29sbGFwc2VkKSl9LGgucHJvdG90eXBlLmZpeD1mdW5jdGlvbigpe2EoXCJib2R5XCIpLmlzKGUuYm94ZWQpJiZ0aGlzLl9maXhGb3JCb3hlZChhKGUuYmcpKX0saC5wcm90b3R5cGUuX2ZpeEZvckJveGVkPWZ1bmN0aW9uKGIpe2IuY3NzKHtwb3NpdGlvbjpcImFic29sdXRlXCIsaGVpZ2h0OmEoZS53cmFwcGVyKS5oZWlnaHQoKX0pfTt2YXIgaT1hLmZuLmNvbnRyb2xTaWRlYmFyO2EuZm4uY29udHJvbFNpZGViYXI9YixhLmZuLmNvbnRyb2xTaWRlYmFyLkNvbnN0cnVjdG9yPWgsYS5mbi5jb250cm9sU2lkZWJhci5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4uY29udHJvbFNpZGViYXI9aSx0aGlzfSxhKGRvY3VtZW50KS5vbihcImNsaWNrXCIsZS5kYXRhLGZ1bmN0aW9uKGMpe2MmJmMucHJldmVudERlZmF1bHQoKSxiLmNhbGwoYSh0aGlzKSxcInRvZ2dsZVwiKX0pfShqUXVlcnkpLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyksZj1lLmRhdGEoYyk7aWYoIWYpe3ZhciBnPWEuZXh0ZW5kKHt9LGQsZS5kYXRhKCksXCJvYmplY3RcIj09dHlwZW9mIGImJmIpO2UuZGF0YShjLGY9bmV3IGgoZSxnKSl9aWYoXCJzdHJpbmdcIj09dHlwZW9mIGIpe2lmKHZvaWQgMD09PWZbYl0pdGhyb3cgbmV3IEVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFwiK2IpO2ZbYl0oKX19KX12YXIgYz1cImx0ZS5ib3h3aWRnZXRcIixkPXthbmltYXRpb25TcGVlZDo1MDAsY29sbGFwc2VUcmlnZ2VyOidbZGF0YS13aWRnZXQ9XCJjb2xsYXBzZVwiXScscmVtb3ZlVHJpZ2dlcjonW2RhdGEtd2lkZ2V0PVwicmVtb3ZlXCJdJyxjb2xsYXBzZUljb246XCJmYS1taW51c1wiLGV4cGFuZEljb246XCJmYS1wbHVzXCIscmVtb3ZlSWNvbjpcImZhLXRpbWVzXCJ9LGU9e2RhdGE6XCIuYm94XCIsY29sbGFwc2VkOlwiLmNvbGxhcHNlZC1ib3hcIixib2R5OlwiLmJveC1ib2R5XCIsZm9vdGVyOlwiLmJveC1mb290ZXJcIix0b29sczpcIi5ib3gtdG9vbHNcIn0sZj17Y29sbGFwc2VkOlwiY29sbGFwc2VkLWJveFwifSxnPXtjb2xsYXBzZWQ6XCJjb2xsYXBzZWQuYm94d2lkZ2V0XCIsZXhwYW5kZWQ6XCJleHBhbmRlZC5ib3h3aWRnZXRcIixyZW1vdmVkOlwicmVtb3ZlZC5ib3h3aWRnZXRcIn0saD1mdW5jdGlvbihhLGIpe3RoaXMuZWxlbWVudD1hLHRoaXMub3B0aW9ucz1iLHRoaXMuX3NldFVwTGlzdGVuZXJzKCl9O2gucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS5pcyhlLmNvbGxhcHNlZCk/dGhpcy5leHBhbmQoKTp0aGlzLmNvbGxhcHNlKCl9LGgucHJvdG90eXBlLmV4cGFuZD1mdW5jdGlvbigpe3ZhciBiPWEuRXZlbnQoZy5leHBhbmRlZCksYz10aGlzLm9wdGlvbnMuY29sbGFwc2VJY29uLGQ9dGhpcy5vcHRpb25zLmV4cGFuZEljb247YSh0aGlzLmVsZW1lbnQpLnJlbW92ZUNsYXNzKGYuY29sbGFwc2VkKSxhKHRoaXMuZWxlbWVudCkuZmluZChlLnRvb2xzKS5maW5kKFwiLlwiK2QpLnJlbW92ZUNsYXNzKGQpLmFkZENsYXNzKGMpLGEodGhpcy5lbGVtZW50KS5maW5kKGUuYm9keStcIiwgXCIrZS5mb290ZXIpLnNsaWRlRG93bih0aGlzLm9wdGlvbnMuYW5pbWF0aW9uU3BlZWQsZnVuY3Rpb24oKXthKHRoaXMuZWxlbWVudCkudHJpZ2dlcihiKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLmNvbGxhcHNlPWZ1bmN0aW9uKCl7dmFyIGI9YS5FdmVudChnLmNvbGxhcHNlZCksYz10aGlzLm9wdGlvbnMuY29sbGFwc2VJY29uLGQ9dGhpcy5vcHRpb25zLmV4cGFuZEljb247YSh0aGlzLmVsZW1lbnQpLmZpbmQoZS50b29scykuZmluZChcIi5cIitjKS5yZW1vdmVDbGFzcyhjKS5hZGRDbGFzcyhkKSxhKHRoaXMuZWxlbWVudCkuZmluZChlLmJvZHkrXCIsIFwiK2UuZm9vdGVyKS5zbGlkZVVwKHRoaXMub3B0aW9ucy5hbmltYXRpb25TcGVlZCxmdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS5hZGRDbGFzcyhmLmNvbGxhcHNlZCksYSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoYil9LmJpbmQodGhpcykpfSxoLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24oKXt2YXIgYj1hLkV2ZW50KGcucmVtb3ZlZCk7YSh0aGlzLmVsZW1lbnQpLnNsaWRlVXAodGhpcy5vcHRpb25zLmFuaW1hdGlvblNwZWVkLGZ1bmN0aW9uKCl7YSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoYiksYSh0aGlzLmVsZW1lbnQpLnJlbW92ZSgpfS5iaW5kKHRoaXMpKX0saC5wcm90b3R5cGUuX3NldFVwTGlzdGVuZXJzPWZ1bmN0aW9uKCl7dmFyIGI9dGhpczthKHRoaXMuZWxlbWVudCkub24oXCJjbGlja1wiLHRoaXMub3B0aW9ucy5jb2xsYXBzZVRyaWdnZXIsZnVuY3Rpb24oYSl7YSYmYS5wcmV2ZW50RGVmYXVsdCgpLGIudG9nZ2xlKCl9KSxhKHRoaXMuZWxlbWVudCkub24oXCJjbGlja1wiLHRoaXMub3B0aW9ucy5yZW1vdmVUcmlnZ2VyLGZ1bmN0aW9uKGEpe2EmJmEucHJldmVudERlZmF1bHQoKSxiLnJlbW92ZSgpfSl9O3ZhciBpPWEuZm4uYm94V2lkZ2V0O2EuZm4uYm94V2lkZ2V0PWIsYS5mbi5ib3hXaWRnZXQuQ29uc3RydWN0b3I9aCxhLmZuLmJveFdpZGdldC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4uYm94V2lkZ2V0PWksdGhpc30sYSh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7YShlLmRhdGEpLmVhY2goZnVuY3Rpb24oKXtiLmNhbGwoYSh0aGlzKSl9KX0pfShqUXVlcnkpLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyksZj1lLmRhdGEoYyk7aWYoIWYpe3ZhciBoPWEuZXh0ZW5kKHt9LGQsZS5kYXRhKCksXCJvYmplY3RcIj09dHlwZW9mIGImJmIpO2UuZGF0YShjLGY9bmV3IGcoZSxoKSl9aWYoXCJzdHJpbmdcIj09dHlwZW9mIGYpe2lmKHZvaWQgMD09PWZbYl0pdGhyb3cgbmV3IEVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFwiK2IpO2ZbYl0oKX19KX12YXIgYz1cImx0ZS50b2RvbGlzdFwiLGQ9e2lDaGVjazohMSxvbkNoZWNrOmZ1bmN0aW9uKCl7fSxvblVuQ2hlY2s6ZnVuY3Rpb24oKXt9fSxlPXtkYXRhOidbZGF0YS13aWRnZXQ9XCJ0b2RvLWxpc3RcIl0nfSxmPXtkb25lOlwiZG9uZVwifSxnPWZ1bmN0aW9uKGEsYil7dGhpcy5lbGVtZW50PWEsdGhpcy5vcHRpb25zPWIsdGhpcy5fc2V0VXBMaXN0ZW5lcnMoKX07Zy5wcm90b3R5cGUudG9nZ2xlPWZ1bmN0aW9uKGEpe2lmKGEucGFyZW50cyhlLmxpKS5maXJzdCgpLnRvZ2dsZUNsYXNzKGYuZG9uZSksIWEucHJvcChcImNoZWNrZWRcIikpcmV0dXJuIHZvaWQgdGhpcy51bkNoZWNrKGEpO3RoaXMuY2hlY2soYSl9LGcucHJvdG90eXBlLmNoZWNrPWZ1bmN0aW9uKGEpe3RoaXMub3B0aW9ucy5vbkNoZWNrLmNhbGwoYSl9LGcucHJvdG90eXBlLnVuQ2hlY2s9ZnVuY3Rpb24oYSl7dGhpcy5vcHRpb25zLm9uVW5DaGVjay5jYWxsKGEpfSxnLnByb3RvdHlwZS5fc2V0VXBMaXN0ZW5lcnM9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2EodGhpcy5lbGVtZW50KS5vbihcImNoYW5nZSBpZkNoYW5nZWRcIixcImlucHV0OmNoZWNrYm94XCIsZnVuY3Rpb24oKXtiLnRvZ2dsZShhKHRoaXMpKX0pfTt2YXIgaD1hLmZuLnRvZG9MaXN0O2EuZm4udG9kb0xpc3Q9YixhLmZuLnRvZG9MaXN0LkNvbnN0cnVjdG9yPWcsYS5mbi50b2RvTGlzdC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4udG9kb0xpc3Q9aCx0aGlzfSxhKHdpbmRvdykub24oXCJsb2FkXCIsZnVuY3Rpb24oKXthKGUuZGF0YSkuZWFjaChmdW5jdGlvbigpe2IuY2FsbChhKHRoaXMpKX0pfSl9KGpRdWVyeSksZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGQ9YSh0aGlzKSxlPWQuZGF0YShjKTtlfHxkLmRhdGEoYyxlPW5ldyBmKGQpKSxcInN0cmluZ1wiPT10eXBlb2YgYiYmZS50b2dnbGUoZCl9KX12YXIgYz1cImx0ZS5kaXJlY3RjaGF0XCIsZD17ZGF0YTonW2RhdGEtd2lkZ2V0PVwiY2hhdC1wYW5lLXRvZ2dsZVwiXScsYm94OlwiLmRpcmVjdC1jaGF0XCJ9LGU9e29wZW46XCJkaXJlY3QtY2hhdC1jb250YWN0cy1vcGVuXCJ9LGY9ZnVuY3Rpb24oYSl7dGhpcy5lbGVtZW50PWF9O2YucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihhKXthLnBhcmVudHMoZC5ib3gpLmZpcnN0KCkudG9nZ2xlQ2xhc3MoZS5vcGVuKX07dmFyIGc9YS5mbi5kaXJlY3RDaGF0O2EuZm4uZGlyZWN0Q2hhdD1iLGEuZm4uZGlyZWN0Q2hhdC5Db25zdHJ1Y3Rvcj1mLGEuZm4uZGlyZWN0Q2hhdC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4uZGlyZWN0Q2hhdD1nLHRoaXN9LGEoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixkLmRhdGEsZnVuY3Rpb24oYyl7YyYmYy5wcmV2ZW50RGVmYXVsdCgpLGIuY2FsbChhKHRoaXMpLFwidG9nZ2xlXCIpfSl9KGpRdWVyeSk7IiwiLyoqXHJcbiogQGxpY2Vuc2UgSW5wdXQgTWFzayBwbHVnaW4gZm9yIGpxdWVyeVxyXG4qIGh0dHA6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9qcXVlcnkuaW5wdXRtYXNrXHJcbiogQ29weXJpZ2h0IChjKSAyMDEwIC0gMjAxNCBSb2JpbiBIZXJib3RzXHJcbiogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIChodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocClcclxuKiBWZXJzaW9uOiAwLjAuMFxyXG4qL1xyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIGlmICgkLmZuLmlucHV0bWFzayA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy9oZWxwZXIgZnVuY3Rpb25zICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGlzSW5wdXRFdmVudFN1cHBvcnRlZChldmVudE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSxcclxuICAgICAgICAgICAgZXZlbnROYW1lID0gJ29uJyArIGV2ZW50TmFtZSxcclxuICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSAoZXZlbnROYW1lIGluIGVsKTtcclxuICAgICAgICAgICAgaWYgKCFpc1N1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGV2ZW50TmFtZSwgJ3JldHVybjsnKTtcclxuICAgICAgICAgICAgICAgIGlzU3VwcG9ydGVkID0gdHlwZW9mIGVsW2V2ZW50TmFtZV0gPT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBpc1N1cHBvcnRlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZUFsaWFzKGFsaWFzU3RyLCBvcHRpb25zLCBvcHRzKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGlhc0RlZmluaXRpb24gPSBvcHRzLmFsaWFzZXNbYWxpYXNTdHJdO1xyXG4gICAgICAgICAgICBpZiAoYWxpYXNEZWZpbml0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxpYXNEZWZpbml0aW9uLmFsaWFzKSByZXNvbHZlQWxpYXMoYWxpYXNEZWZpbml0aW9uLmFsaWFzLCB1bmRlZmluZWQsIG9wdHMpOyAvL2FsaWFzIGlzIGFub3RoZXIgYWxpYXNcclxuICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIG9wdHMsIGFsaWFzRGVmaW5pdGlvbik7ICAvL21lcmdlIGFsaWFzIGRlZmluaXRpb24gaW4gdGhlIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIG9wdHMsIG9wdGlvbnMpOyAgLy9yZWFwcGx5IGV4dHJhIGdpdmVuIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVNYXNrU2V0cyhvcHRzKSB7XHJcbiAgICAgICAgICAgIHZhciBtcyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgZ2VubWFza3MgPSBbXTsgLy91c2VkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIG1hc2tzIHRoYXQgd2hlcmUgcHJvY2Vzc2VkLCB0byBhdm9pZCBkdXBsaWNhdGVzXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1hc2tUZW1wbGF0ZShtYXNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5udW1lcmljSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrID0gbWFzay5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGVzY2FwZWQgPSBmYWxzZSwgb3V0Q291bnQgPSAwLCBncmVlZHkgPSBvcHRzLmdyZWVkeSwgcmVwZWF0ID0gb3B0cy5yZXBlYXQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVwZWF0ID09IFwiKlwiKSBncmVlZHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vaWYgKGdyZWVkeSA9PSB0cnVlICYmIG9wdHMucGxhY2Vob2xkZXIgPT0gXCJcIikgb3B0cy5wbGFjZWhvbGRlciA9IFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hc2subGVuZ3RoID09IDEgJiYgZ3JlZWR5ID09IGZhbHNlICYmIHJlcGVhdCAhPSAwKSB7IG9wdHMucGxhY2Vob2xkZXIgPSBcIlwiOyB9IC8vaGlkZSBwbGFjZWhvbGRlciB3aXRoIHNpbmdsZSBub24tZ3JlZWR5IG1hc2tcclxuICAgICAgICAgICAgICAgIHZhciBzaW5nbGVNYXNrID0gJC5tYXAobWFzay5zcGxpdChcIlwiKSwgZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG91dEVsZW0gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBvcHRzLmVzY2FwZUNoYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChlbGVtZW50ICE9IG9wdHMub3B0aW9uYWxtYXJrZXIuc3RhcnQgJiYgZWxlbWVudCAhPSBvcHRzLm9wdGlvbmFsbWFya2VyLmVuZCkgfHwgZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFza2RlZiA9IG9wdHMuZGVmaW5pdGlvbnNbZWxlbWVudF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXNrZGVmICYmICFlc2NhcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1hc2tkZWYuY2FyZGluYWxpdHk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dEVsZW0ucHVzaChvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgob3V0Q291bnQgKyBpKSAlIG9wdHMucGxhY2Vob2xkZXIubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRFbGVtLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0Q291bnQgKz0gb3V0RWxlbS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRFbGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYWxsb2NhdGUgcmVwZXRpdGlvbnNcclxuICAgICAgICAgICAgICAgIHZhciByZXBlYXRlZE1hc2sgPSBzaW5nbGVNYXNrLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHJlcGVhdCAmJiBncmVlZHk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdGVkTWFzayA9IHJlcGVhdGVkTWFzay5jb25jYXQoc2luZ2xlTWFzay5zbGljZSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBcIm1hc2tcIjogcmVwZWF0ZWRNYXNrLCBcInJlcGVhdFwiOiByZXBlYXQsIFwiZ3JlZWR5XCI6IGdyZWVkeSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGVzdCBkZWZpbml0aW9uID0+IHtmbjogUmVnRXhwL2Z1bmN0aW9uLCBjYXJkaW5hbGl0eTogaW50LCBvcHRpb25hbGl0eTogYm9vbCwgbmV3QmxvY2tNYXJrZXI6IGJvb2wsIG9mZnNldDogaW50LCBjYXNpbmc6IG51bGwvdXBwZXIvbG93ZXIsIGRlZjogZGVmaW5pdGlvblN5bWJvbH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VGVzdGluZ0NoYWluKG1hc2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRzLm51bWVyaWNJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2sgPSBtYXNrLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNPcHRpb25hbCA9IGZhbHNlLCBlc2NhcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3QmxvY2tNYXJrZXIgPSBmYWxzZTsgLy9pbmRpY2F0ZXMgd2hldGVyIHRoZSBiZWdpbi9lbmRpbmcgb2YgYSBibG9jayBzaG91bGQgYmUgaW5kaWNhdGVkXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQubWFwKG1hc2suc3BsaXQoXCJcIiksIGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvdXRFbGVtID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09IG9wdHMuZXNjYXBlQ2hhcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT0gb3B0cy5vcHRpb25hbG1hcmtlci5zdGFydCAmJiAhZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc09wdGlvbmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbGVtZW50ID09IG9wdHMub3B0aW9uYWxtYXJrZXIuZW5kICYmICFlc2NhcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3B0aW9uYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tkZWYgPSBvcHRzLmRlZmluaXRpb25zW2VsZW1lbnRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFza2RlZiAmJiAhZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZhbGlkYXRvcnMgPSBtYXNrZGVmW1wicHJldmFsaWRhdG9yXCJdLCBwcmV2YWxpZGF0b3JzTCA9IHByZXZhbGlkYXRvcnMgPyBwcmV2YWxpZGF0b3JzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG1hc2tkZWYuY2FyZGluYWxpdHk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2YWxpZGF0b3IgPSBwcmV2YWxpZGF0b3JzTCA+PSBpID8gcHJldmFsaWRhdG9yc1tpIC0gMV0gOiBbXSwgdmFsaWRhdG9yID0gcHJldmFsaWRhdG9yW1widmFsaWRhdG9yXCJdLCBjYXJkaW5hbGl0eSA9IHByZXZhbGlkYXRvcltcImNhcmRpbmFsaXR5XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dEVsZW0ucHVzaCh7IGZuOiB2YWxpZGF0b3IgPyB0eXBlb2YgdmFsaWRhdG9yID09ICdzdHJpbmcnID8gbmV3IFJlZ0V4cCh2YWxpZGF0b3IpIDogbmV3IGZ1bmN0aW9uICgpIHsgdGhpcy50ZXN0ID0gdmFsaWRhdG9yOyB9IDogbmV3IFJlZ0V4cChcIi5cIiksIGNhcmRpbmFsaXR5OiBjYXJkaW5hbGl0eSA/IGNhcmRpbmFsaXR5IDogMSwgb3B0aW9uYWxpdHk6IGlzT3B0aW9uYWwsIG5ld0Jsb2NrTWFya2VyOiBpc09wdGlvbmFsID09IHRydWUgPyBuZXdCbG9ja01hcmtlciA6IGZhbHNlLCBvZmZzZXQ6IDAsIGNhc2luZzogbWFza2RlZltcImNhc2luZ1wiXSwgZGVmOiBtYXNrZGVmW1wiZGVmaW5pdGlvblN5bWJvbFwiXSB8fCBlbGVtZW50IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsID09IHRydWUpIC8vcmVzZXQgbmV3QmxvY2tNYXJrZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dEVsZW0ucHVzaCh7IGZuOiBtYXNrZGVmLnZhbGlkYXRvciA/IHR5cGVvZiBtYXNrZGVmLnZhbGlkYXRvciA9PSAnc3RyaW5nJyA/IG5ldyBSZWdFeHAobWFza2RlZi52YWxpZGF0b3IpIDogbmV3IGZ1bmN0aW9uICgpIHsgdGhpcy50ZXN0ID0gbWFza2RlZi52YWxpZGF0b3I7IH0gOiBuZXcgUmVnRXhwKFwiLlwiKSwgY2FyZGluYWxpdHk6IG1hc2tkZWYuY2FyZGluYWxpdHksIG9wdGlvbmFsaXR5OiBpc09wdGlvbmFsLCBuZXdCbG9ja01hcmtlcjogbmV3QmxvY2tNYXJrZXIsIG9mZnNldDogMCwgY2FzaW5nOiBtYXNrZGVmW1wiY2FzaW5nXCJdLCBkZWY6IG1hc2tkZWZbXCJkZWZpbml0aW9uU3ltYm9sXCJdIHx8IGVsZW1lbnQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRFbGVtLnB1c2goeyBmbjogbnVsbCwgY2FyZGluYWxpdHk6IDAsIG9wdGlvbmFsaXR5OiBpc09wdGlvbmFsLCBuZXdCbG9ja01hcmtlcjogbmV3QmxvY2tNYXJrZXIsIG9mZnNldDogMCwgY2FzaW5nOiBudWxsLCBkZWY6IGVsZW1lbnQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXNldCBuZXdCbG9ja01hcmtlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdCbG9ja01hcmtlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0RWxlbTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXJrT3B0aW9uYWwobWFza1BhcnQpIHsgLy9uZWVkZWQgZm9yIHRoZSBjbGVhck9wdGlvbmFsVGFpbCBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5vcHRpb25hbG1hcmtlci5zdGFydCArIG1hc2tQYXJ0ICsgb3B0cy5vcHRpb25hbG1hcmtlci5lbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gc3BsaXRGaXJzdE9wdGlvbmFsRW5kUGFydChtYXNrUGFydCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbmFsU3RhcnRNYXJrZXJzID0gMCwgb3B0aW9uYWxFbmRNYXJrZXJzID0gMCwgbXBsID0gbWFza1BhcnQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtcGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXNrUGFydC5jaGFyQXQoaSkgPT0gb3B0cy5vcHRpb25hbG1hcmtlci5zdGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbFN0YXJ0TWFya2VycysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BhcnQuY2hhckF0KGkpID09IG9wdHMub3B0aW9uYWxtYXJrZXIuZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsRW5kTWFya2VycysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uYWxTdGFydE1hcmtlcnMgPiAwICYmIG9wdGlvbmFsU3RhcnRNYXJrZXJzID09IG9wdGlvbmFsRW5kTWFya2VycylcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFza1BhcnRzID0gW21hc2tQYXJ0LnN1YnN0cmluZygwLCBpKV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IG1wbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tQYXJ0cy5wdXNoKG1hc2tQYXJ0LnN1YnN0cmluZyhpICsgMSwgbXBsKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFza1BhcnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwbGl0Rmlyc3RPcHRpb25hbFN0YXJ0UGFydChtYXNrUGFydCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1wbCA9IG1hc2tQYXJ0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BhcnQuY2hhckF0KGkpID09IG9wdHMub3B0aW9uYWxtYXJrZXIuc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG1hc2tQYXJ0cyA9IFttYXNrUGFydC5zdWJzdHJpbmcoMCwgaSldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCBtcGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrUGFydHMucHVzaChtYXNrUGFydC5zdWJzdHJpbmcoaSArIDEsIG1wbCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tQYXJ0cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZU1hc2sobWFza1ByZWZpeCwgbWFza1BhcnQsIG1ldGFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFza1BhcnRzID0gc3BsaXRGaXJzdE9wdGlvbmFsRW5kUGFydChtYXNrUGFydCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3TWFzaywgbWFza1RlbXBsYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtYXNrcyA9IHNwbGl0Rmlyc3RPcHRpb25hbFN0YXJ0UGFydChtYXNrUGFydHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hc2tzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdNYXNrID0gbWFza1ByZWZpeCArIG1hc2tzWzBdICsgbWFya09wdGlvbmFsKG1hc2tzWzFdKSArIChtYXNrUGFydHMubGVuZ3RoID4gMSA/IG1hc2tQYXJ0c1sxXSA6IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkobmV3TWFzaywgZ2VubWFza3MpID09IC0xICYmIG5ld01hc2sgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5tYXNrcy5wdXNoKG5ld01hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrVGVtcGxhdGUgPSBnZXRNYXNrVGVtcGxhdGUobmV3TWFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXNrXCI6IG5ld01hc2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9idWZmZXJcIjogbWFza1RlbXBsYXRlW1wibWFza1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnVmZmVyXCI6IG1hc2tUZW1wbGF0ZVtcIm1hc2tcIl0uc2xpY2UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGVzdHNcIjogZ2V0VGVzdGluZ0NoYWluKG5ld01hc2spLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXN0VmFsaWRQb3NpdGlvblwiOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ3JlZWR5XCI6IG1hc2tUZW1wbGF0ZVtcImdyZWVkeVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IG1hc2tUZW1wbGF0ZVtcInJlcGVhdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGFcIjogbWV0YWRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld01hc2sgPSBtYXNrUHJlZml4ICsgbWFza3NbMF0gKyAobWFza1BhcnRzLmxlbmd0aCA+IDEgPyBtYXNrUGFydHNbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KG5ld01hc2ssIGdlbm1hc2tzKSA9PSAtMSAmJiBuZXdNYXNrICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VubWFza3MucHVzaChuZXdNYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza1RlbXBsYXRlID0gZ2V0TWFza1RlbXBsYXRlKG5ld01hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWFza1wiOiBuZXdNYXNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfYnVmZmVyXCI6IG1hc2tUZW1wbGF0ZVtcIm1hc2tcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJ1ZmZlclwiOiBtYXNrVGVtcGxhdGVbXCJtYXNrXCJdLnNsaWNlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlc3RzXCI6IGdldFRlc3RpbmdDaGFpbihuZXdNYXNrKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdFZhbGlkUG9zaXRpb25cIjogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdyZWVkeVwiOiBtYXNrVGVtcGxhdGVbXCJncmVlZHlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcGVhdFwiOiBtYXNrVGVtcGxhdGVbXCJyZXBlYXRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFkYXRhXCI6IG1ldGFkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3BsaXRGaXJzdE9wdGlvbmFsU3RhcnRQYXJ0KG1hc2tzWzFdKS5sZW5ndGggPiAxKSB7IC8vb3B0aW9uYWwgY29udGFpbnMgYW5vdGhlciBvcHRpb25hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZU1hc2sobWFza1ByZWZpeCArIG1hc2tzWzBdLCBtYXNrc1sxXSArIG1hc2tQYXJ0c1sxXSwgbWV0YWRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BhcnRzLmxlbmd0aCA+IDEgJiYgc3BsaXRGaXJzdE9wdGlvbmFsU3RhcnRQYXJ0KG1hc2tQYXJ0c1sxXSkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZU1hc2sobWFza1ByZWZpeCArIG1hc2tzWzBdICsgbWFya09wdGlvbmFsKG1hc2tzWzFdKSwgbWFza1BhcnRzWzFdLCBtZXRhZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlTWFzayhtYXNrUHJlZml4ICsgbWFza3NbMF0sIG1hc2tQYXJ0c1sxXSwgbWV0YWRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld01hc2sgPSBtYXNrUHJlZml4ICsgbWFza1BhcnRzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkobmV3TWFzaywgZ2VubWFza3MpID09IC0xICYmIG5ld01hc2sgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5tYXNrcy5wdXNoKG5ld01hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrVGVtcGxhdGUgPSBnZXRNYXNrVGVtcGxhdGUobmV3TWFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXNrXCI6IG5ld01hc2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9idWZmZXJcIjogbWFza1RlbXBsYXRlW1wibWFza1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnVmZmVyXCI6IG1hc2tUZW1wbGF0ZVtcIm1hc2tcIl0uc2xpY2UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGVzdHNcIjogZ2V0VGVzdGluZ0NoYWluKG5ld01hc2spLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXN0VmFsaWRQb3NpdGlvblwiOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ3JlZWR5XCI6IG1hc2tUZW1wbGF0ZVtcImdyZWVkeVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IG1hc2tUZW1wbGF0ZVtcInJlcGVhdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGFcIjogbWV0YWRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihvcHRzLm1hc2spKSB7IC8vYWxsb3cgbWFzayB0byBiZSBhIHByZXByb2Nlc3NpbmcgZm4gLSBzaG91bGQgcmV0dXJuIGEgdmFsaWQgbWFza1xyXG4gICAgICAgICAgICAgICAgb3B0cy5tYXNrID0gb3B0cy5tYXNrLmNhbGwodGhpcywgb3B0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQuaXNBcnJheShvcHRzLm1hc2spKSB7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2gob3B0cy5tYXNrLCBmdW5jdGlvbiAobmR4LCBtc2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobXNrW1wibWFza1wiXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVNYXNrKFwiXCIsIG1za1tcIm1hc2tcIl0udG9TdHJpbmcoKSwgbXNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVNYXNrKFwiXCIsIG1zay50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgZ2VuZXJhdGVNYXNrKFwiXCIsIG9wdHMubWFzay50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvcHRzLmdyZWVkeSA/IG1zIDogbXMuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYVtcIm1hc2tcIl0ubGVuZ3RoIC0gYltcIm1hc2tcIl0ubGVuZ3RoOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtc2llMTAgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKG5ldyBSZWdFeHAoXCJtc2llIDEwXCIsIFwiaVwiKSkgIT09IG51bGwsXHJcbiAgICAgICAgICAgIGlwaG9uZSA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gobmV3IFJlZ0V4cChcImlwaG9uZVwiLCBcImlcIikpICE9PSBudWxsLFxyXG4gICAgICAgICAgICBhbmRyb2lkID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaChuZXcgUmVnRXhwKFwiYW5kcm9pZC4qc2FmYXJpLipcIiwgXCJpXCIpKSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgYW5kcm9pZGNocm9tZSA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gobmV3IFJlZ0V4cChcImFuZHJvaWQuKmNocm9tZS4qXCIsIFwiaVwiKSkgIT09IG51bGwsXHJcbiAgICAgICAgICAgIHBhc3RlRXZlbnQgPSBpc0lucHV0RXZlbnRTdXBwb3J0ZWQoJ3Bhc3RlJykgPyAncGFzdGUnIDogaXNJbnB1dEV2ZW50U3VwcG9ydGVkKCdpbnB1dCcpID8gJ2lucHV0JyA6IFwicHJvcGVydHljaGFuZ2VcIjtcclxuXHJcblxyXG4gICAgICAgIC8vbWFza2luZyBzY29wZVxyXG4gICAgICAgIC8vYWN0aW9uT2JqIGRlZmluaXRpb24gc2VlIGJlbG93XHJcbiAgICAgICAgZnVuY3Rpb24gbWFza1Njb3BlKG1hc2tzZXRzLCBhY3RpdmVNYXNrc2V0SW5kZXgsIG9wdHMsIGFjdGlvbk9iaikge1xyXG4gICAgICAgICAgICB2YXIgaXNSVEwgPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlT25Gb2N1cyA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpLFxyXG4gICAgICAgICAgICAgICAgJGVsLCBjaHJvbWVWYWx1ZU9uSW5wdXQsXHJcbiAgICAgICAgICAgICAgICBza2lwS2V5UHJlc3NFdmVudCA9IGZhbHNlLCAvL1NhZmFyaSA1LjEueCAtIG1vZGFsIGRpYWxvZyBmaXJlcyBrZXlwcmVzcyB0d2ljZSB3b3JrYXJvdW5kXHJcbiAgICAgICAgICAgICAgICBza2lwSW5wdXRFdmVudCA9IGZhbHNlLCAvL3NraXAgd2hlbiB0cmlnZ2VyZWQgZnJvbSB3aXRoaW4gaW5wdXRtYXNrXHJcbiAgICAgICAgICAgICAgICBpZ25vcmFibGUgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL21hc2tzZXQgaGVscGVyZnVuY3Rpb25zXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRBY3RpdmVNYXNrU2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2ZVRlc3RzKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEFjdGl2ZU1hc2tTZXQoKVsndGVzdHMnXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlTWFza1NldCgpWydfYnVmZmVyJ107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2ZUJ1ZmZlcigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRBY3RpdmVNYXNrU2V0KClbJ2J1ZmZlciddO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpc1ZhbGlkKHBvcywgYywgc3RyaWN0KSB7IC8vc3RyaWN0IHRydWUgfiBubyBjb3JyZWN0aW9uIG9yIGF1dG9maWxsXHJcbiAgICAgICAgICAgICAgICBzdHJpY3QgPSBzdHJpY3QgPT09IHRydWU7IC8vYWx3YXlzIHNldCBhIHZhbHVlIHRvIHN0cmljdCB0byBwcmV2ZW50IHBvc3NpYmxlIHN0cmFuZ2UgYmVoYXZpb3IgaW4gdGhlIGV4dGVuc2lvbnMgXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gX2lzVmFsaWQocG9zaXRpb24sIGFjdGl2ZU1hc2tzZXQsIGMsIHN0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0UG9zID0gZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvc2l0aW9uKSwgbG9vcGVuZCA9IGMgPyAxIDogMCwgY2hycyA9ICcnLCBidWZmZXIgPSBhY3RpdmVNYXNrc2V0W1wiYnVmZmVyXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBhY3RpdmVNYXNrc2V0Wyd0ZXN0cyddW3Rlc3RQb3NdLmNhcmRpbmFsaXR5OyBpID4gbG9vcGVuZDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocnMgKz0gZ2V0QnVmZmVyRWxlbWVudChidWZmZXIsIHRlc3RQb3MgLSAoaSAtIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocnMgKz0gYztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGlzIGZhbHNlIG9yIGEganNvbiBvYmplY3QgPT4geyBwb3M6ID8/LCBjOiA/P30gb3IgdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmVNYXNrc2V0Wyd0ZXN0cyddW3Rlc3RQb3NdLmZuICE9IG51bGwgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0Wyd0ZXN0cyddW3Rlc3RQb3NdLmZuLnRlc3QoY2hycywgYnVmZmVyLCBwb3NpdGlvbiwgc3RyaWN0LCBvcHRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChjID09IGdldEJ1ZmZlckVsZW1lbnQoYWN0aXZlTWFza3NldFsnX2J1ZmZlciddLCBwb3NpdGlvbiwgdHJ1ZSkgfHwgYyA9PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJyZWZyZXNoXCI6IHRydWUsIGM6IGdldEJ1ZmZlckVsZW1lbnQoYWN0aXZlTWFza3NldFsnX2J1ZmZlciddLCBwb3NpdGlvbiwgdHJ1ZSksIHBvczogcG9zaXRpb24gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBQb3N0UHJvY2Vzc1Jlc3VsdHMobWFza0ZvcndhcmRzLCByZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhc1ZhbGlkQWN0dWFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3VsdHMsIGZ1bmN0aW9uIChuZHgsIHJzbHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzVmFsaWRBY3R1YWwgPSAkLmluQXJyYXkocnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSwgbWFza0ZvcndhcmRzKSA9PSAtMSAmJiByc2x0W1wicmVzdWx0XCJdICE9PSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1ZhbGlkQWN0dWFsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1ZhbGlkQWN0dWFsKSB7IC8vc3RyaXAgbWFza2ZvcndhcmRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSAkLm1hcChyZXN1bHRzLCBmdW5jdGlvbiAocnNsdCwgbmR4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KHJzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl0sIG1hc2tGb3J3YXJkcykgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnNsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV1bXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IGFjdHVhbExWUDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy9rZWVwIG1hc2tmb3J3YXJkcyB3aXRoIHRoZSBsZWFzdCBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb3dlc3RQb3MgPSAtMSwgbG93ZXN0SW5kZXggPSAtMSwgcnNsdFZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gocmVzdWx0cywgZnVuY3Rpb24gKG5keCwgcnNsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdLCBtYXNrRm9yd2FyZHMpICE9IC0xICYmIHJzbHRbXCJyZXN1bHRcIl0gIT09IGZhbHNlICYgKGxvd2VzdFBvcyA9PSAtMSB8fCBsb3dlc3RQb3MgPiByc2x0W1wicmVzdWx0XCJdW1wicG9zXCJdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdFBvcyA9IHJzbHRbXCJyZXN1bHRcIl1bXCJwb3NcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXN0SW5kZXggPSByc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9ICQubWFwKHJlc3VsdHMsIGZ1bmN0aW9uIChyc2x0LCBuZHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkocnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSwgbWFza0ZvcndhcmRzKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyc2x0W1wicmVzdWx0XCJdW1wicG9zXCJdID09IGxvd2VzdFBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnNsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJzbHRbXCJyZXN1bHRcIl0gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBwb3M7IGkgPCBsb3dlc3RQb3M7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnNsdFZhbGlkID0gX2lzVmFsaWQoaSwgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV0sIG1hc2tzZXRzW2xvd2VzdEluZGV4XVtcImJ1ZmZlclwiXVtpXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNsdFZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBsb3dlc3RQb3MgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wiYnVmZmVyXCJdLCBpLCBtYXNrc2V0c1tsb3dlc3RJbmRleF1bXCJidWZmZXJcIl1baV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxzbyBjaGVjayBjaGVjayBmb3IgdGhlIGxvd2VzdHBvcyB3aXRoIHRoZSBuZXcgaW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnNsdFZhbGlkID0gX2lzVmFsaWQobG93ZXN0UG9zLCBtYXNrc2V0c1tyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdXSwgYywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyc2x0VmFsaWQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wiYnVmZmVyXCJdLCBsb3dlc3RQb3MsIGMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV1bXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IGxvd2VzdFBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibmR4IFwiICsgcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSArIFwiIHZhbGlkYXRlIFwiICsgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV1bXCJidWZmZXJcIl0uam9pbignJykgKyBcIiBsdiBcIiArIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dWydsYXN0VmFsaWRQb3NpdGlvbiddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJzbHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBfaXNWYWxpZChwb3MsIGdldEFjdGl2ZU1hc2tTZXQoKSwgYywgc3RyaWN0KTsgLy9vbmx5IGNoZWNrIHZhbGlkaXR5IGluIGN1cnJlbnQgbWFzayB3aGVuIHZhbGlkYXRpbmcgc3RyaWN0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7IFwicG9zXCI6IHBvcyB9OyAvL2Fsd2F5cyB0YWtlIGEgcG9zc2libGUgY29ycmVjdGVkIG1hc2twb3NpdGlvbiBpbnRvIGFjY291bnRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0cyA9IFtdLCByZXN1bHQgPSBmYWxzZSwgY3VycmVudEFjdGl2ZU1hc2tzZXRJbmRleCA9IGFjdGl2ZU1hc2tzZXRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBhY3R1YWxCdWZmZXIgPSBnZXRBY3RpdmVCdWZmZXIoKS5zbGljZSgpLCBhY3R1YWxMVlAgPSBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSxcclxuICAgICAgICAgICAgICAgICAgICBhY3R1YWxQcmV2aW91cyA9IHNlZWtQcmV2aW91cyhwb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tGb3J3YXJkcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUpID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFza1BvcyA9IHBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGx2cCA9IGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJzbHRWYWxpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGx2cCA9PSBhY3R1YWxMVlApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobWFza1BvcyAtIGFjdHVhbExWUCkgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGx2cCA9PSAtMSA/IDAgOiBsdnA7IGkgPCBtYXNrUG9zOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnNsdFZhbGlkID0gX2lzVmFsaWQoaSwgZ2V0QWN0aXZlTWFza1NldCgpLCBhY3R1YWxCdWZmZXJbaV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNsdFZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KGdldEFjdGl2ZUJ1ZmZlcigpLCBpLCBhY3R1YWxCdWZmZXJbaV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJzbHRWYWxpZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJzbHRWYWxpZCA9IHsgXCJwb3NcIjogaSB9OyAvL2Fsd2F5cyB0YWtlIGEgcG9zc2libGUgY29ycmVjdGVkIG1hc2twb3NpdGlvbiBpbnRvIGFjY291bnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdWYWxpZFBvc2l0aW9uID0gcnNsdFZhbGlkLnBvcyB8fCBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSA8IG5ld1ZhbGlkUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddID0gbmV3VmFsaWRQb3NpdGlvbjsgLy9zZXQgbmV3IHBvc2l0aW9uIGZyb20gaXNWYWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kb2VzIHRoZSBpbnB1dCBtYXRjaCBvbiBhIGZ1cnRoZXIgcG9zaXRpb24/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTWFzayhtYXNrUG9zKSAmJiAhX2lzVmFsaWQobWFza1BvcywgZ2V0QWN0aXZlTWFza1NldCgpLCBjLCBzdHJpY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heEZvcndhcmQgPSBzZWVrTmV4dChtYXNrUG9zKSAtIG1hc2tQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZncgPSAwOyBmdyA8IG1heEZvcndhcmQ7IGZ3KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc1ZhbGlkKCsrbWFza1BvcywgZ2V0QWN0aXZlTWFza1NldCgpLCBjLCBzdHJpY3QpICE9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrRm9yd2FyZHMucHVzaChhY3RpdmVNYXNrc2V0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ21hc2tmb3J3YXJkICcgKyBhY3RpdmVNYXNrc2V0SW5kZXggKyBcIiBwb3MgXCIgKyBwb3MgKyBcIiBtYXNrUG9zIFwiICsgbWFza1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVNYXNrU2V0KClbJ2xhc3RWYWxpZFBvc2l0aW9uJ10gPj0gYWN0dWFsTFZQIHx8IGFjdGl2ZU1hc2tzZXRJbmRleCA9PSBjdXJyZW50QWN0aXZlTWFza3NldEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BvcyA+PSAwICYmIG1hc2tQb3MgPCBnZXRNYXNrTGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfaXNWYWxpZChtYXNrUG9zLCBnZXRBY3RpdmVNYXNrU2V0KCksIGMsIHN0cmljdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geyBcInBvc1wiOiBtYXNrUG9zIH07IC8vYWx3YXlzIHRha2UgYSBwb3NzaWJsZSBjb3JyZWN0ZWQgbWFza3Bvc2l0aW9uIGludG8gYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdWYWxpZFBvc2l0aW9uID0gcmVzdWx0LnBvcyB8fCBtYXNrUG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddIDwgbmV3VmFsaWRQb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSA9IG5ld1ZhbGlkUG9zaXRpb247IC8vc2V0IG5ldyBwb3NpdGlvbiBmcm9tIGlzVmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBvcyBcIiArIHBvcyArIFwiIG5keCBcIiArIGFjdGl2ZU1hc2tzZXRJbmRleCArIFwiIHZhbGlkYXRlIFwiICsgZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykgKyBcIiBsdiBcIiArIGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHsgXCJhY3RpdmVNYXNrc2V0SW5kZXhcIjogaW5kZXgsIFwicmVzdWx0XCI6IHJlc3VsdCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gY3VycmVudEFjdGl2ZU1hc2tzZXRJbmRleDsgLy9yZXNldCBhY3RpdmVNYXNrc2V0SW5kZXhcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zdFByb2Nlc3NSZXN1bHRzKG1hc2tGb3J3YXJkcywgcmVzdWx0cyk7IC8vcmV0dXJuIHJlc3VsdHMgb2YgdGhlIG11bHRpcGxlIG1hc2sgdmFsaWRhdGlvbnNcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZGV0ZXJtaW5lQWN0aXZlTWFza3NldEluZGV4KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRNYXNrc2V0SW5kZXggPSBhY3RpdmVNYXNrc2V0SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFZhbGlkID0geyBcImFjdGl2ZU1hc2tzZXRJbmRleFwiOiAwLCBcImxhc3RWYWxpZFBvc2l0aW9uXCI6IC0xLCBcIm5leHRcIjogLTEgfTtcclxuICAgICAgICAgICAgICAgICQuZWFjaChtYXNrc2V0cywgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddID4gaGlnaGVzdFZhbGlkWydsYXN0VmFsaWRQb3NpdGlvbiddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoZXN0VmFsaWRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl0gPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZFtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFZhbGlkW1wibmV4dFwiXSA9IHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddID09IGhpZ2hlc3RWYWxpZFsnbGFzdFZhbGlkUG9zaXRpb24nXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGhpZ2hlc3RWYWxpZFsnbmV4dCddID09IC0xIHx8IGhpZ2hlc3RWYWxpZFsnbmV4dCddID4gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFZhbGlkW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBnZXRBY3RpdmVNYXNrU2V0KClbJ2xhc3RWYWxpZFBvc2l0aW9uJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoZXN0VmFsaWRbXCJuZXh0XCJdID0gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGhpZ2hlc3RWYWxpZFtcImxhc3RWYWxpZFBvc2l0aW9uXCJdICE9IC0xICYmIG1hc2tzZXRzW2N1cnJlbnRNYXNrc2V0SW5kZXhdW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPT0gaGlnaGVzdFZhbGlkW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPyBjdXJyZW50TWFza3NldEluZGV4IDogaGlnaGVzdFZhbGlkW1wiYWN0aXZlTWFza3NldEluZGV4XCJdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRNYXNrc2V0SW5kZXggIT0gYWN0aXZlTWFza3NldEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJCdWZmZXIoZ2V0QWN0aXZlQnVmZmVyKCksIHNlZWtOZXh0KGhpZ2hlc3RWYWxpZFtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSwgZ2V0TWFza0xlbmd0aCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJ3cml0ZU91dEJ1ZmZlclwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkZWwuZGF0YSgnX2lucHV0bWFzaycpWydhY3RpdmVNYXNrc2V0SW5kZXgnXSA9IGFjdGl2ZU1hc2tzZXRJbmRleDsgLy9zdG9yZSB0aGUgYWN0aXZlTWFza3NldEluZGV4XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzTWFzayhwb3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZXN0UG9zID0gZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IGdldEFjdGl2ZVRlc3RzKClbdGVzdFBvc107XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlc3QgIT0gdW5kZWZpbmVkID8gdGVzdC5mbiA6IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBkZXRlcm1pbmVUZXN0UG9zaXRpb24ocG9zKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zICUgZ2V0QWN0aXZlVGVzdHMoKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1hc2tMZW5ndGgoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5nZXRNYXNrTGVuZ3RoKGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCksIGdldEFjdGl2ZU1hc2tTZXQoKVsnZ3JlZWR5J10sIGdldEFjdGl2ZU1hc2tTZXQoKVsncmVwZWF0J10sIGdldEFjdGl2ZUJ1ZmZlcigpLCBvcHRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9wb3M6IGZyb20gcG9zaXRpb25cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlZWtOZXh0KHBvcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hc2tMID0gZ2V0TWFza0xlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvcyA+PSBtYXNrTCkgcmV0dXJuIG1hc2tMO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCsrcG9zaXRpb24gPCBtYXNrTCAmJiAhaXNNYXNrKHBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3BvczogZnJvbSBwb3NpdGlvblxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2Vla1ByZXZpb3VzKHBvcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IDApIHJldHVybiAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlICgtLXBvc2l0aW9uID4gMCAmJiAhaXNNYXNrKHBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgcG9zaXRpb24sIGVsZW1lbnQsIGF1dG9QcmVwYXJlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXV0b1ByZXBhcmUpIHBvc2l0aW9uID0gcHJlcGFyZUJ1ZmZlcihidWZmZXIsIHBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IGdldEFjdGl2ZVRlc3RzKClbZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvc2l0aW9uKV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbSAhPSB1bmRlZmluZWQgJiYgdGVzdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRlc3QuY2FzaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1cHBlclwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW1lbnQudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibG93ZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtZW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW3Bvc2l0aW9uXSA9IGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBwb3NpdGlvbiwgYXV0b1ByZXBhcmUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdXRvUHJlcGFyZSkgcG9zaXRpb24gPSBwcmVwYXJlQnVmZmVyKGJ1ZmZlciwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcltwb3NpdGlvbl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vbmVlZGVkIHRvIGhhbmRsZSB0aGUgbm9uLWdyZWVkeSBtYXNrIHJlcGV0aXRpb25zXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwcmVwYXJlQnVmZmVyKGJ1ZmZlciwgcG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBqO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGJ1ZmZlcltwb3NpdGlvbl0gPT0gdW5kZWZpbmVkICYmIGJ1ZmZlci5sZW5ndGggPCBnZXRNYXNrTGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKVtqXSAhPT0gdW5kZWZpbmVkKSB7IC8vYWRkIGEgbmV3IGJ1ZmZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIucHVzaChnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpW2orK10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHdyaXRlQnVmZmVyKGlucHV0LCBidWZmZXIsIGNhcmV0UG9zKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQoYnVmZmVyLmpvaW4oJycpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYXJldFBvcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgY2FyZXRQb3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhckJ1ZmZlcihidWZmZXIsIHN0YXJ0LCBlbmQsIHN0cmlwTm9tYXNrcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0LCBtYXNrTCA9IGdldE1hc2tMZW5ndGgoKSA7IGkgPCBlbmQgJiYgaSA8IG1hc2tMOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaXBOb21hc2tzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNNYXNrKGkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIGksIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgaSwgZ2V0QnVmZmVyRWxlbWVudChnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKCksIGksIHRydWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0UmVUYXJnZXRQbGFjZUhvbGRlcihidWZmZXIsIHBvcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlc3RQb3MgPSBkZXRlcm1pbmVUZXN0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIHNldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBwb3MsIGdldEJ1ZmZlckVsZW1lbnQoZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKSwgdGVzdFBvcykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQbGFjZUhvbGRlcihwb3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdChwb3MgJSBvcHRzLnBsYWNlaG9sZGVyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrVmFsKGlucHV0LCB3cml0ZU91dCwgc3RyaWN0LCBucHR2bCwgaW50ZWxsaUNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRWYWx1ZSA9IG5wdHZsICE9IHVuZGVmaW5lZCA/IG5wdHZsLnNsaWNlKCkgOiB0cnVuY2F0ZUlucHV0KGlucHV0Ll92YWx1ZUdldCgpKS5zcGxpdCgnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKG1zKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wiYnVmZmVyXCJdID0gbXNbXCJfYnVmZmVyXCJdLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXNbXCJwXCJdID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyaWN0ICE9PSB0cnVlKSBhY3RpdmVNYXNrc2V0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdyaXRlT3V0KSBpbnB1dC5fdmFsdWVTZXQoXCJcIik7IC8vaW5pdGlhbCBjbGVhclxyXG4gICAgICAgICAgICAgICAgdmFyIG1sID0gZ2V0TWFza0xlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKGlucHV0VmFsdWUsIGZ1bmN0aW9uIChuZHgsIGNoYXJDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludGVsbGlDaGVjayA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IGdldEFjdGl2ZU1hc2tTZXQoKVtcInBcIl0sIGx2cCA9IHAgPT0gLTEgPyBwIDogc2Vla1ByZXZpb3VzKHApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gbHZwID09IC0xID8gbmR4IDogc2Vla05leHQobHZwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShjaGFyQ29kZSwgZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5zbGljZShsdnAgKyAxLCBwb3MpKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cHJlc3NFdmVudC5jYWxsKGlucHV0LCB1bmRlZmluZWQsIHRydWUsIGNoYXJDb2RlLmNoYXJDb2RlQXQoMCksIHdyaXRlT3V0LCBzdHJpY3QsIG5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlwcmVzc0V2ZW50LmNhbGwoaW5wdXQsIHVuZGVmaW5lZCwgdHJ1ZSwgY2hhckNvZGUuY2hhckNvZGVBdCgwKSwgd3JpdGVPdXQsIHN0cmljdCwgbmR4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyaWN0ID09PSB0cnVlICYmIGdldEFjdGl2ZU1hc2tTZXQoKVtcInBcIl0gIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IHNlZWtQcmV2aW91cyhnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZXNjYXBlUmVnZXgoc3RyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5pbnB1dG1hc2suZXNjYXBlUmVnZXguY2FsbCh0aGlzLCBzdHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0cnVuY2F0ZUlucHV0KGlucHV0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dFZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChcIihcIiArIGVzY2FwZVJlZ2V4KGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykpICsgXCIpKiRcIiksIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhck9wdGlvbmFsVGFpbChpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpLCB0bXBCdWZmZXIgPSBidWZmZXIuc2xpY2UoKSwgdGVzdFBvcywgcG9zO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcG9zID0gdG1wQnVmZmVyLmxlbmd0aCAtIDE7IHBvcyA+PSAwOyBwb3MtLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0UG9zID0gZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZVRlc3RzKClbdGVzdFBvc10ub3B0aW9uYWxpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc01hc2socG9zKSB8fCAhaXNWYWxpZChwb3MsIGJ1ZmZlcltwb3NdLCB0cnVlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcEJ1ZmZlci5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihpbnB1dCwgdG1wQnVmZmVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdW5tYXNrZWR2YWx1ZSgkaW5wdXQsIHNraXBEYXRlcGlja2VyQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVUZXN0cygpICYmIChza2lwRGF0ZXBpY2tlckNoZWNrID09PSB0cnVlIHx8ICEkaW5wdXQuaGFzQ2xhc3MoJ2hhc0RhdGVwaWNrZXInKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NoZWNrVmFsKGlucHV0LCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVtVmFsdWUgPSAkLm1hcChnZXRBY3RpdmVCdWZmZXIoKSwgZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc01hc2soaW5kZXgpICYmIGlzVmFsaWQoaW5kZXgsIGVsZW1lbnQsIHRydWUpID8gZWxlbWVudCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVubWFza2VkVmFsdWUgPSAoaXNSVEwgPyB1bVZhbHVlLnJldmVyc2UoKSA6IHVtVmFsdWUpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLm9uVW5NYXNrICE9IHVuZGVmaW5lZCA/IG9wdHMub25Vbk1hc2suY2FsbCh0aGlzLCBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSwgdW5tYXNrZWRWYWx1ZSkgOiB1bm1hc2tlZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGlucHV0WzBdLl92YWx1ZUdldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBUcmFuc2xhdGVQb3NpdGlvbihwb3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1JUTCAmJiB0eXBlb2YgcG9zID09ICdudW1iZXInICYmICghb3B0cy5ncmVlZHkgfHwgb3B0cy5wbGFjZWhvbGRlciAhPSBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiZmZyTGdodCA9IGdldEFjdGl2ZUJ1ZmZlcigpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBwb3MgPSBiZmZyTGdodCAtIHBvcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3M7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhcmV0KGlucHV0LCBiZWdpbiwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbnB0ID0gaW5wdXQuanF1ZXJ5ICYmIGlucHV0Lmxlbmd0aCA+IDAgPyBpbnB1dFswXSA6IGlucHV0LCByYW5nZTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmVnaW4gPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBiZWdpbiA9IFRyYW5zbGF0ZVBvc2l0aW9uKGJlZ2luKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBUcmFuc2xhdGVQb3NpdGlvbihlbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghJChpbnB1dCkuaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSAodHlwZW9mIGVuZCA9PSAnbnVtYmVyJykgPyBlbmQgOiBiZWdpbjtcclxuICAgICAgICAgICAgICAgICAgICBucHQuc2Nyb2xsTGVmdCA9IG5wdC5zY3JvbGxXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5pbnNlcnRNb2RlID09IGZhbHNlICYmIGJlZ2luID09IGVuZCkgZW5kKys7IC8vc2V0IHZpc3VhbGl6YXRpb24gZm9yIGluc2VydC9vdmVyd3JpdGUgbW9kZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChucHQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0LnNlbGVjdGlvblN0YXJ0ID0gYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5zZWxlY3Rpb25FbmQgPSBhbmRyb2lkID8gYmVnaW4gOiBlbmQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobnB0LmNyZWF0ZVRleHRSYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG5wdC5jcmVhdGVUZXh0UmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghJChpbnB1dCkuaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgXCJiZWdpblwiOiAwLCBcImVuZFwiOiAwIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChucHQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW4gPSBucHQuc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IG5wdC5zZWxlY3Rpb25FbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luID0gMCAtIHJhbmdlLmR1cGxpY2F0ZSgpLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLTEwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IGJlZ2luICsgcmFuZ2UudGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlZ2luID0gVHJhbnNsYXRlUG9zaXRpb24oYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IFRyYW5zbGF0ZVBvc2l0aW9uKGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgXCJiZWdpblwiOiBiZWdpbiwgXCJlbmRcIjogZW5kIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzQ29tcGxldGUoYnVmZmVyKSB7IC8vcmV0dXJuIHRydWUgLyBmYWxzZSAvIHVuZGVmaW5lZCAocmVwZWF0ICopXHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5yZXBlYXQgPT0gXCIqXCIpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29tcGxldGUgPSBmYWxzZSwgaGlnaGVzdFZhbGlkUG9zaXRpb24gPSAwLCBjdXJyZW50QWN0aXZlTWFza3NldEluZGV4ID0gYWN0aXZlTWFza3NldEluZGV4O1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKG1zKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IG5keDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFtbCA9IHNlZWtQcmV2aW91cyhnZXRNYXNrTGVuZ3RoKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXNbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA+PSBoaWdoZXN0VmFsaWRQb3NpdGlvbiAmJiBtc1tcImxhc3RWYWxpZFBvc2l0aW9uXCJdID09IGFtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1zQ29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gYW1sOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFzayA9IGlzTWFzayhpKSwgdGVzdFBvcyA9IGRldGVybWluZVRlc3RQb3NpdGlvbihpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG1hc2sgJiYgKGJ1ZmZlcltpXSA9PSB1bmRlZmluZWQgfHwgYnVmZmVyW2ldID09IGdldFBsYWNlSG9sZGVyKGkpKSkgfHwgKCFtYXNrICYmIGJ1ZmZlcltpXSAhPSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpW3Rlc3RQb3NdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc0NvbXBsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gY29tcGxldGUgfHwgbXNDb21wbGV0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkgLy9icmVhayBsb29wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZFBvc2l0aW9uID0gbXNbXCJsYXN0VmFsaWRQb3NpdGlvblwiXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGN1cnJlbnRBY3RpdmVNYXNrc2V0SW5kZXg7IC8vcmVzZXQgYWN0aXZlTWFza3NldFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpc1NlbGVjdGlvbihiZWdpbiwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNSVEwgPyAoYmVnaW4gLSBlbmQpID4gMSB8fCAoKGJlZ2luIC0gZW5kKSA9PSAxICYmIG9wdHMuaW5zZXJ0TW9kZSkgOlxyXG4gICAgICAgICAgICAgICAgICAgIChlbmQgLSBiZWdpbikgPiAxIHx8ICgoZW5kIC0gYmVnaW4pID09IDEgJiYgb3B0cy5pbnNlcnRNb2RlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAgICAgICAgICAgZnVuY3Rpb24gaW5zdGFsbEV2ZW50UnVsZXIobnB0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRzID0gJC5fZGF0YShucHQpLmV2ZW50cztcclxuXHJcbiAgICAgICAgICAgICAgICAkLmVhY2goZXZlbnRzLCBmdW5jdGlvbiAoZXZlbnRUeXBlLCBldmVudEhhbmRsZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGV2ZW50SGFuZGxlcnMsIGZ1bmN0aW9uIChuZHgsIGV2ZW50SGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyLm5hbWVzcGFjZSA9PSBcImlucHV0bWFza1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyLnR5cGUgIT0gXCJzZXR2YWx1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSBldmVudEhhbmRsZXIuaGFuZGxlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIuaGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWRPbmx5IHx8IHRoaXMuZGlzYWJsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwYXRjaFZhbHVlUHJvcGVydHkobnB0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVQcm9wZXJ0eTtcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlUHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5wdCwgXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVByb3BlcnR5ICYmIHZhbHVlUHJvcGVydHkuZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFucHQuX3ZhbHVlR2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZUdldCA9IHZhbHVlUHJvcGVydHkuZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVTZXQgPSB2YWx1ZVByb3BlcnR5LnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0Ll92YWx1ZUdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1JUTCA/IHZhbHVlR2V0LmNhbGwodGhpcykuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKSA6IHZhbHVlR2V0LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5fdmFsdWVTZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0LmNhbGwodGhpcywgaXNSVEwgPyB2YWx1ZS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5wdCwgXCJ2YWx1ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHNlbGYgPSAkKHRoaXMpLCBpbnB1dERhdGEgPSAkKHRoaXMpLmRhdGEoJ19pbnB1dG1hc2snKSwgbWFza3NldHMgPSBpbnB1dERhdGFbJ21hc2tzZXRzJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGlucHV0RGF0YVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0RGF0YSAmJiBpbnB1dERhdGFbJ29wdHMnXS5hdXRvVW5tYXNrID8gJHNlbGYuaW5wdXRtYXNrKCd1bm1hc2tlZHZhbHVlJykgOiB2YWx1ZUdldC5jYWxsKHRoaXMpICE9IG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ19idWZmZXInXS5qb2luKCcnKSA/IHZhbHVlR2V0LmNhbGwodGhpcykgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0LmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ3NldHZhbHVlLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgbnB0Ll9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnB0Ll92YWx1ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVHZXQgPSBucHQuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVTZXQgPSBucHQuX19sb29rdXBTZXR0ZXJfXyhcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX3ZhbHVlR2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzUlRMID8gdmFsdWVHZXQuY2FsbCh0aGlzKS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogdmFsdWVHZXQuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0Ll92YWx1ZVNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXQuY2FsbCh0aGlzLCBpc1JUTCA/IHZhbHVlLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX19kZWZpbmVHZXR0ZXJfXyhcInZhbHVlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkc2VsZiA9ICQodGhpcyksIGlucHV0RGF0YSA9ICQodGhpcykuZGF0YSgnX2lucHV0bWFzaycpLCBtYXNrc2V0cyA9IGlucHV0RGF0YVsnbWFza3NldHMnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSBpbnB1dERhdGFbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0RGF0YSAmJiBpbnB1dERhdGFbJ29wdHMnXS5hdXRvVW5tYXNrID8gJHNlbGYuaW5wdXRtYXNrKCd1bm1hc2tlZHZhbHVlJykgOiB2YWx1ZUdldC5jYWxsKHRoaXMpICE9IG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ19idWZmZXInXS5qb2luKCcnKSA/IHZhbHVlR2V0LmNhbGwodGhpcykgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5fX2RlZmluZVNldHRlcl9fKFwidmFsdWVcIiwgZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldC5jYWxsKHRoaXMsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ3NldHZhbHVlLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnB0Ll92YWx1ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX3ZhbHVlR2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNSVEwgPyB0aGlzLnZhbHVlLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiB0aGlzLnZhbHVlOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX3ZhbHVlU2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7IHRoaXMudmFsdWUgPSBpc1JUTCA/IHZhbHVlLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiB2YWx1ZTsgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQudmFsSG9va3MudGV4dCA9PSB1bmRlZmluZWQgfHwgJC52YWxIb29rcy50ZXh0LmlucHV0bWFza3BhdGNoICE9IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlR2V0ID0gJC52YWxIb29rcy50ZXh0ICYmICQudmFsSG9va3MudGV4dC5nZXQgPyAkLnZhbEhvb2tzLnRleHQuZ2V0IDogZnVuY3Rpb24gKGVsZW0pIHsgcmV0dXJuIGVsZW0udmFsdWU7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVNldCA9ICQudmFsSG9va3MudGV4dCAmJiAkLnZhbEhvb2tzLnRleHQuc2V0ID8gJC52YWxIb29rcy50ZXh0LnNldCA6IGZ1bmN0aW9uIChlbGVtLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXh0ZW5kKCQudmFsSG9va3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbS5kYXRhKCdfaW5wdXRtYXNrJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbS5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXS5hdXRvVW5tYXNrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkZWxlbS5pbnB1dG1hc2soJ3VubWFza2VkdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWx1ZUdldChlbGVtKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhID0gJGVsZW0uZGF0YSgnX2lucHV0bWFzaycpLCBtYXNrc2V0cyA9IGlucHV0RGF0YVsnbWFza3NldHMnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5wdXREYXRhWydhY3RpdmVNYXNrc2V0SW5kZXgnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICE9IG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ19idWZmZXInXS5qb2luKCcnKSA/IHJlc3VsdCA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuIHZhbHVlR2V0KGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoZWxlbSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtID0gJChlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlU2V0KGVsZW0sIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGVtLmRhdGEoJ19pbnB1dG1hc2snKSkgJGVsZW0udHJpZ2dlckhhbmRsZXIoJ3NldHZhbHVlLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRtYXNrcGF0Y2g6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3NoaWZ0IGNoYXJzIHRvIGxlZnQgZnJvbSBzdGFydCB0byBlbmQgYW5kIHB1dCBjIGF0IGVuZCBwb3NpdGlvbiBpZiBkZWZpbmVkXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzaGlmdEwoc3RhcnQsIGVuZCwgYywgbWFza0p1bXBzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gZ2V0QWN0aXZlQnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFza0p1bXBzICE9PSBmYWxzZSkgLy9qdW1waW5nIG92ZXIgbm9ubWFzayBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghaXNNYXNrKHN0YXJ0KSAmJiBzdGFydCAtIDEgPj0gMCkgc3RhcnQtLTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZCAmJiBpIDwgZ2V0TWFza0xlbmd0aCgpIDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTWFzayhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZVRhcmdldFBsYWNlSG9sZGVyKGJ1ZmZlciwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqID0gc2Vla05leHQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwID0gZ2V0QnVmZmVyRWxlbWVudChidWZmZXIsIGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocCAhPSBnZXRQbGFjZUhvbGRlcihqKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPCBnZXRNYXNrTGVuZ3RoKCkgJiYgaXNWYWxpZChpLCBwLCB0cnVlKSAhPT0gZmFsc2UgJiYgZ2V0QWN0aXZlVGVzdHMoKVtkZXRlcm1pbmVUZXN0UG9zaXRpb24oaSldLmRlZiA9PSBnZXRBY3RpdmVUZXN0cygpW2RldGVybWluZVRlc3RQb3NpdGlvbihqKV0uZGVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIGksIHAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXNrKGkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlVGFyZ2V0UGxhY2VIb2xkZXIoYnVmZmVyLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIHNlZWtQcmV2aW91cyhlbmQpLCBjKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpW1wiZ3JlZWR5XCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYnVmZmVyID0gdHJ1bmNhdGVJbnB1dChidWZmZXIuam9pbignJykpLnNwbGl0KCcnKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gdHJidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBibCA9IGJ1ZmZlci5sZW5ndGg7IGkgPCBibDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltpXSA9IHRyYnVmZmVyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCA9PSAwKSBnZXRBY3RpdmVNYXNrU2V0KClbXCJidWZmZXJcIl0gPSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnQ7IC8vcmV0dXJuIHRoZSB1c2VkIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNoaWZ0UihzdGFydCwgZW5kLCBjKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gZ2V0QWN0aXZlQnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QnVmZmVyRWxlbWVudChidWZmZXIsIHN0YXJ0LCB0cnVlKSAhPSBnZXRQbGFjZUhvbGRlcihzdGFydCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gc2Vla1ByZXZpb3VzKGVuZCkgOyBpID4gc3RhcnQgJiYgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTWFzayhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSBzZWVrUHJldmlvdXMoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ICE9IGdldFBsYWNlSG9sZGVyKGopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQoaiwgdCwgdHJ1ZSkgIT09IGZhbHNlICYmIGdldEFjdGl2ZVRlc3RzKClbZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKGkpXS5kZWYgPT0gZ2V0QWN0aXZlVGVzdHMoKVtkZXRlcm1pbmVUZXN0UG9zaXRpb24oaildLmRlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgaSwgdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlVGFyZ2V0UGxhY2VIb2xkZXIoYnVmZmVyLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IC8vZWxzZSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZVRhcmdldFBsYWNlSG9sZGVyKGJ1ZmZlciwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGMgIT0gdW5kZWZpbmVkICYmIGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBzdGFydCkgPT0gZ2V0UGxhY2VIb2xkZXIoc3RhcnQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHNldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBzdGFydCwgYyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoQmVmb3JlID0gYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVNYXNrU2V0KClbXCJncmVlZHlcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHJidWZmZXIgPSB0cnVuY2F0ZUlucHV0KGJ1ZmZlci5qb2luKCcnKSkuc3BsaXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSB0cmJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGJsID0gYnVmZmVyLmxlbmd0aDsgaSA8IGJsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyW2ldID0gdHJidWZmZXJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoID09IDApIGdldEFjdGl2ZU1hc2tTZXQoKVtcImJ1ZmZlclwiXSA9IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBlbmQgLSAobGVuZ3RoQmVmb3JlIC0gYnVmZmVyLmxlbmd0aCk7IC8vcmV0dXJuIG5ldyBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBIYW5kbGVSZW1vdmUoaW5wdXQsIGssIHBvcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMubnVtZXJpY0lucHV0IHx8IGlzUlRMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBvcHRzLmtleUNvZGUuREVMRVRFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5rZXlDb2RlLkRFTEVURTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1JUTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZCA9IHBvcy5lbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA9IHBlbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpc1NlbGVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9zLmJlZ2luID09IHBvcy5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zQmVnaW4gPSBrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UgPyBwb3MuYmVnaW4gLSAxIDogcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmlzTnVtZXJpYyAmJiBvcHRzLnJhZGl4UG9pbnQgIT0gXCJcIiAmJiBnZXRBY3RpdmVCdWZmZXIoKVtwb3NCZWdpbl0gPT0gb3B0cy5yYWRpeFBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA9IChnZXRBY3RpdmVCdWZmZXIoKS5sZW5ndGggLSAxID09IHBvc0JlZ2luKSAvKiByYWRpeFBvaW50IGlzIGxhdGVzdD8gZGVsZXRlIGl0ICovID8gcG9zLmJlZ2luIDogayA9PSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFID8gcG9zQmVnaW4gOiBzZWVrTmV4dChwb3NCZWdpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPT0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luLS07XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuREVMRVRFKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MuZW5kKys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcy5lbmQgLSBwb3MuYmVnaW4gPT0gMSAmJiAhb3B0cy5pbnNlcnRNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoayA9PSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MuYmVnaW4tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhckJ1ZmZlcihnZXRBY3RpdmVCdWZmZXIoKSwgcG9zLmJlZ2luLCBwb3MuZW5kKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbWwgPSBnZXRNYXNrTGVuZ3RoKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5ncmVlZHkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGlmdEwocG9zLmJlZ2luLCBtbCwgdW5kZWZpbmVkLCAhaXNSVEwgJiYgKGsgPT0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRSAmJiAhaXNTZWxlY3Rpb24pKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld3BvcyA9IHBvcy5iZWdpbjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gcG9zLmJlZ2luOyBpIDwgcG9zLmVuZDsgaSsrKSB7IC8vc2Vla25leHQgdG8gc2tpcCBwbGFjZWhvbGRlcnMgYXQgc3RhcnQgaW4gc2VsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc01hc2soaSkgfHwgIWlzU2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3cG9zID0gc2hpZnRMKHBvcy5iZWdpbiwgbWwsIHVuZGVmaW5lZCwgIWlzUlRMICYmIChrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UgJiYgIWlzU2VsZWN0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNTZWxlY3Rpb24pIHBvcy5iZWdpbiA9IG5ld3BvcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBmaXJzdE1hc2tQb3MgPSBzZWVrTmV4dCgtMSk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckJ1ZmZlcihnZXRBY3RpdmVCdWZmZXIoKSwgcG9zLmJlZ2luLCBwb3MuZW5kLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrVmFsKGlucHV0LCBmYWxzZSwgbWFza3NldHNbMV0gPT0gdW5kZWZpbmVkIHx8IGZpcnN0TWFza1BvcyA+PSBwb3MuZW5kLCBnZXRBY3RpdmVCdWZmZXIoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddIDwgZmlyc3RNYXNrUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdID0gZmlyc3RNYXNrUG9zO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdID0gcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBrZXlkb3duRXZlbnQoZSkge1xyXG4gICAgICAgICAgICAgICAgLy9TYWZhcmkgNS4xLnggLSBtb2RhbCBkaWFsb2cgZmlyZXMga2V5cHJlc3MgdHdpY2Ugd29ya2Fyb3VuZFxyXG4gICAgICAgICAgICAgICAgc2tpcEtleVByZXNzRXZlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsICRpbnB1dCA9ICQoaW5wdXQpLCBrID0gZS5rZXlDb2RlLCBwb3MgPSBjYXJldChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9iYWNrc3BhY2UsIGRlbGV0ZSwgYW5kIGVzY2FwZSBnZXQgc3BlY2lhbCB0cmVhdG1lbnRcclxuICAgICAgICAgICAgICAgIGlmIChrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UgfHwgayA9PSBvcHRzLmtleUNvZGUuREVMRVRFIHx8IChpcGhvbmUgJiYgayA9PSAxMjcpIHx8IGUuY3RybEtleSAmJiBrID09IDg4KSB7IC8vYmFja3NwYWNlL2RlbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy9zdG9wIGRlZmF1bHQgYWN0aW9uIGJ1dCBhbGxvdyBwcm9wYWdhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09IDg4KSB2YWx1ZU9uRm9jdXMgPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICBIYW5kbGVSZW1vdmUoaW5wdXQsIGssIHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0ZXJtaW5lQWN0aXZlTWFza3NldEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGdldEFjdGl2ZUJ1ZmZlcigpLCBnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuX3ZhbHVlR2V0KCkgPT0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5qb2luKCcnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoJ2NsZWFyZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1Rvb2x0aXApIHsgLy91cGRhdGUgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucHJvcChcInRpdGxlXCIsIGdldEFjdGl2ZU1hc2tTZXQoKVtcIm1hc2tcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuRU5EIHx8IGsgPT0gb3B0cy5rZXlDb2RlLlBBR0VfRE9XTikgeyAvL3doZW4gRU5EIG9yIFBBR0VfRE9XTiBwcmVzc2VkIHNldCBwb3NpdGlvbiBhdCBsYXN0bWF0Y2hcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zID0gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuaW5zZXJ0TW9kZSAmJiBjYXJldFBvcyA9PSBnZXRNYXNrTGVuZ3RoKCkgJiYgIWUuc2hpZnRLZXkpIGNhcmV0UG9zLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBlLnNoaWZ0S2V5ID8gcG9zLmJlZ2luIDogY2FyZXRQb3MsIGNhcmV0UG9zKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGsgPT0gb3B0cy5rZXlDb2RlLkhPTUUgJiYgIWUuc2hpZnRLZXkpIHx8IGsgPT0gb3B0cy5rZXlDb2RlLlBBR0VfVVApIHsgLy9Ib21lIG9yIHBhZ2VfdXBcclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgMCwgZS5zaGlmdEtleSA/IHBvcy5iZWdpbiA6IDApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChrID09IG9wdHMua2V5Q29kZS5FU0NBUEUgfHwgKGsgPT0gOTAgJiYgZS5jdHJsS2V5KSkgeyAvL2VzY2FwZSAmJiB1bmRvXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWwoaW5wdXQsIHRydWUsIGZhbHNlLCB2YWx1ZU9uRm9jdXMuc3BsaXQoJycpKTtcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuSU5TRVJUICYmICEoZS5zaGlmdEtleSB8fCBlLmN0cmxLZXkpKSB7IC8vaW5zZXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5pbnNlcnRNb2RlID0gIW9wdHMuaW5zZXJ0TW9kZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgIW9wdHMuaW5zZXJ0TW9kZSAmJiBwb3MuYmVnaW4gPT0gZ2V0TWFza0xlbmd0aCgpID8gcG9zLmJlZ2luIC0gMSA6IHBvcy5iZWdpbik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMuaW5zZXJ0TW9kZSA9PSBmYWxzZSAmJiAhZS5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09IG9wdHMua2V5Q29kZS5SSUdIVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBjYXJldFBvcy5iZWdpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuTEVGVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBjYXJldFBvcy5iZWdpbiAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRDYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRzLm9uS2V5RG93bi5jYWxsKHRoaXMsIGUsIGdldEFjdGl2ZUJ1ZmZlcigpLCBvcHRzKSA9PT0gdHJ1ZSkgLy9leHRyYSBzdHVmZiB0byBleGVjdXRlIG9uIGtleWRvd25cclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgY3VycmVudENhcmV0UG9zLmJlZ2luLCBjdXJyZW50Q2FyZXRQb3MuZW5kKTtcclxuICAgICAgICAgICAgICAgIGlnbm9yYWJsZSA9ICQuaW5BcnJheShrLCBvcHRzLmlnbm9yYWJsZXMpICE9IC0xO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24ga2V5cHJlc3NFdmVudChlLCBjaGVja3ZhbCwgaywgd3JpdGVPdXQsIHN0cmljdCwgbmR4KSB7XHJcbiAgICAgICAgICAgICAgICAvL1NhZmFyaSA1LjEueCAtIG1vZGFsIGRpYWxvZyBmaXJlcyBrZXlwcmVzcyB0d2ljZSB3b3JrYXJvdW5kXHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PSB1bmRlZmluZWQgJiYgc2tpcEtleVByZXNzRXZlbnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNraXBLZXlQcmVzc0V2ZW50ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLCAkaW5wdXQgPSAkKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgayA9IGNoZWNrdmFsID8gayA6IChlLndoaWNoIHx8IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2t2YWwgIT09IHRydWUgJiYgKCEoZS5jdHJsS2V5ICYmIGUuYWx0S2V5KSAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSB8fCBpZ25vcmFibGUpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NwZWNpYWwgdHJlYXQgdGhlIGRlY2ltYWwgc2VwYXJhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja3ZhbCAhPT0gdHJ1ZSAmJiBrID09IDQ2ICYmIGUuc2hpZnRLZXkgPT0gZmFsc2UgJiYgb3B0cy5yYWRpeFBvaW50ID09IFwiLFwiKSBrID0gNDQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zLCByZXN1bHRzLCByZXN1bHQsIGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2t2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwY2FyZXQgPSBzdHJpY3QgPyBuZHggOiBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSB7IGJlZ2luOiBwY2FyZXQsIGVuZDogcGNhcmV0IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBjYXJldChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2hvdWxkIHdlIGNsZWFyIGEgcG9zc2libGUgc2VsZWN0aW9uPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzU2xjdG4gPSBpc1NlbGVjdGlvbihwb3MuYmVnaW4sIHBvcy5lbmQpLCByZWRldGVybWluZUxWUCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbEluZGV4ID0gYWN0aXZlTWFza3NldEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNTbGN0bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5pdGlhbEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBsbW50KSB7IC8vaW5pdCB1bmRvYnVmZmVyIGZvciByZWNvdmVyeSB3aGVuIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGxtbnQpID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gbmR4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJ1bmRvQnVmZmVyXCJdID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIYW5kbGVSZW1vdmUoaW5wdXQsIG9wdHMua2V5Q29kZS5ERUxFVEUsIHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuaW5zZXJ0TW9kZSkgeyAvL3ByZXNlcnZlIHNvbWUgc3BhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gobWFza3NldHMsIGZ1bmN0aW9uIChuZHgsIGxtbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAobG1udCkgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gbmR4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnRSKHBvcy5iZWdpbiwgZ2V0TWFza0xlbmd0aCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSBpbml0aWFsSW5kZXg7IC8vcmVzdG9yZSBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXhQb3NpdGlvbiA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuaXNOdW1lcmljICYmIGNoZWNrdmFsICE9PSB0cnVlICYmIHJhZGl4UG9zaXRpb24gIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmdyZWVkeSAmJiBwb3MuYmVnaW4gPD0gcmFkaXhQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA9IHNlZWtQcmV2aW91cyhwb3MuYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT0gb3B0cy5yYWRpeFBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luID0gcmFkaXhQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MuZW5kID0gcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBpc1ZhbGlkKHAsIGMsIHN0cmljdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJpY3QgPT09IHRydWUpIHJlc3VsdHMgPSBbeyBcImFjdGl2ZU1hc2tzZXRJbmRleFwiOiBhY3RpdmVNYXNrc2V0SW5kZXgsIFwicmVzdWx0XCI6IHJlc3VsdHMgfV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXN1bHRzLCBmdW5jdGlvbiAoaW5kZXgsIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gcmVzdWx0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wid3JpdGVPdXRCdWZmZXJcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5wID0gcmVzdWx0W1wicmVzdWx0XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5wICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZyZXNoID0gZmFsc2UsIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChucCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoID0gbnBbXCJyZWZyZXNoXCJdOyAvL29ubHkgcmV3cml0ZSBidWZmZXIgZnJvbSBpc1ZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBucC5wb3MgIT0gdW5kZWZpbmVkID8gbnAucG9zIDogcDsgLy9zZXQgbmV3IHBvc2l0aW9uIGZyb20gaXNWYWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gbnAuYyAhPSB1bmRlZmluZWQgPyBucC5jIDogYzsgLy9zZXQgbmV3IGNoYXIgZnJvbSBpc1ZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWZyZXNoICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmluc2VydE1vZGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RVbm1hc2tlZFBvc2l0aW9uID0gZ2V0TWFza0xlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJmckNsb25lID0gYnVmZmVyLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZ2V0QnVmZmVyRWxlbWVudChiZnJDbG9uZSwgbGFzdFVubWFza2VkUG9zaXRpb24sIHRydWUpICE9IGdldFBsYWNlSG9sZGVyKGxhc3RVbm1hc2tlZFBvc2l0aW9uKSAmJiBsYXN0VW5tYXNrZWRQb3NpdGlvbiA+PSBwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFVubWFza2VkUG9zaXRpb24gPSBsYXN0VW5tYXNrZWRQb3NpdGlvbiA9PSAwID8gLTEgOiBzZWVrUHJldmlvdXMobGFzdFVubWFza2VkUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RVbm1hc2tlZFBvc2l0aW9uID49IHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdFIocCwgZ2V0TWFza0xlbmd0aCgpLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NoaWZ0IHRoZSBsdnAgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGx2cCA9IGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdLCBubHZwID0gc2Vla05leHQobHZwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmx2cCAhPSBnZXRNYXNrTGVuZ3RoKCkgJiYgbHZwID49IHAgJiYgKGdldEJ1ZmZlckVsZW1lbnQoZ2V0QWN0aXZlQnVmZmVyKCksIG5sdnAsIHRydWUpICE9IGdldFBsYWNlSG9sZGVyKG5sdnApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IG5sdnA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGdldEFjdGl2ZU1hc2tTZXQoKVtcIndyaXRlT3V0QnVmZmVyXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgcCwgYywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID09IC0xIHx8IG1pbmltYWxGb3J3YXJkUG9zaXRpb24gPiBzZWVrTmV4dChwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW1hbEZvcndhcmRQb3NpdGlvbiA9IHNlZWtOZXh0KHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0UG9zID0gcCA8IGdldE1hc2tMZW5ndGgoKSA/IHAgKyAxIDogcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pbmltYWxGb3J3YXJkUG9zaXRpb24gPT0gLTEgfHwgbWluaW1hbEZvcndhcmRQb3NpdGlvbiA+IG5leHRQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltYWxGb3J3YXJkUG9zaXRpb24gPSBuZXh0UG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID4gZ2V0QWN0aXZlTWFza1NldCgpW1wicFwiXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wicFwiXSA9IG1pbmltYWxGb3J3YXJkUG9zaXRpb247IC8vbmVlZGVkIGZvciBjaGVja3ZhbCBzdHJpY3QgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmljdCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5pdGlhbEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0ZXJtaW5lQWN0aXZlTWFza3NldEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdyaXRlT3V0ICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3VsdHMsIGZ1bmN0aW9uIChuZHgsIHJzbHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSA9PSBhY3RpdmVNYXNrc2V0SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcnNsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IG9wdHMub25LZXlWYWxpZGF0aW9uLmNhbGwoc2VsZiwgcmVzdWx0W1wicmVzdWx0XCJdLCBvcHRzKTsgfSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVtcIndyaXRlT3V0QnVmZmVyXCJdICYmIHJlc3VsdFtcInJlc3VsdFwiXSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0NhcmV0UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja3ZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZXRQb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLm51bWVyaWNJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAgPiByYWRpeFBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZXRQb3NpdGlvbiA9IHNlZWtQcmV2aW91cyhtaW5pbWFsRm9yd2FyZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PSBvcHRzLnJhZGl4UG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJldFBvc2l0aW9uID0gbWluaW1hbEZvcndhcmRQb3NpdGlvbiAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgbmV3Q2FyZXRQb3NpdGlvbiA9IHNlZWtQcmV2aW91cyhtaW5pbWFsRm9yd2FyZFBvc2l0aW9uIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJldFBvc2l0aW9uID0gbWluaW1hbEZvcndhcmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlciwgbmV3Q2FyZXRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja3ZhbCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IC8vdGltZW91dCBuZWVkZWQgZm9yIElFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGUoYnVmZmVyKSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwSW5wdXRFdmVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1NsY3RuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVtcImJ1ZmZlclwiXSA9IGdldEFjdGl2ZU1hc2tTZXQoKVtcInVuZG9CdWZmZXJcIl0uc3BsaXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1Rvb2x0aXApIHsgLy91cGRhdGUgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnByb3AoXCJ0aXRsZVwiLCBnZXRBY3RpdmVNYXNrU2V0KClbXCJtYXNrXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9uZWVkZWQgZm9yIElFOCBhbmQgYmVsb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQgPyBlLnByZXZlbnREZWZhdWx0KCkgOiBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBrZXl1cEV2ZW50KGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLCBpbnB1dCA9IHRoaXMsIGsgPSBlLmtleUNvZGUsIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhbmRyb2lkY2hyb21lICYmIGsgPT0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaHJvbWVWYWx1ZU9uSW5wdXQgPT0gaW5wdXQuX3ZhbHVlR2V0KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleWRvd25FdmVudC5jYWxsKHRoaXMsIGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9wdHMub25LZXlVcC5jYWxsKHRoaXMsIGUsIGJ1ZmZlciwgb3B0cyk7IC8vZXh0cmEgc3R1ZmYgdG8gZXhlY3V0ZSBvbiBrZXl1cFxyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT0gb3B0cy5rZXlDb2RlLlRBQiAmJiBvcHRzLnNob3dNYXNrT25Gb2N1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkaW5wdXQuaGFzQ2xhc3MoJ2ZvY3VzLmlucHV0bWFzaycpICYmIGlucHV0Ll92YWx1ZUdldCgpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVPbkZvY3VzID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIuam9pbignJykgPT0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5qb2luKCcnKSAmJiAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBidWZmZXIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgVHJhbnNsYXRlUG9zaXRpb24oMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIFRyYW5zbGF0ZVBvc2l0aW9uKDApLCBUcmFuc2xhdGVQb3NpdGlvbihnZXRNYXNrTGVuZ3RoKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlucHV0RXZlbnQoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNraXBJbnB1dEV2ZW50ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcElucHV0RXZlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsICRpbnB1dCA9ICQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNocm9tZVZhbHVlT25JbnB1dCA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tWYWwoaW5wdXQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QWN0aXZlQnVmZmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGUoZ2V0QWN0aXZlQnVmZmVyKCkpID09PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwiY29tcGxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAkaW5wdXQuY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbWFzayhlbCkge1xyXG4gICAgICAgICAgICAgICAgJGVsID0gJChlbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGVsLmlzKFwiOmlucHV0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdG9yZSB0ZXN0cyAmIG9yaWdpbmFsIGJ1ZmZlciBpbiB0aGUgaW5wdXQgZWxlbWVudCAtIHVzZWQgdG8gZ2V0IHRoZSB1bm1hc2tlZCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICRlbC5kYXRhKCdfaW5wdXRtYXNrJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFza3NldHMnOiBtYXNrc2V0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FjdGl2ZU1hc2tzZXRJbmRleCc6IGFjdGl2ZU1hc2tzZXRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ29wdHMnOiBvcHRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnaXNSVEwnOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3Nob3cgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dUb29sdGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5wcm9wKFwidGl0bGVcIiwgZ2V0QWN0aXZlTWFza1NldCgpW1wibWFza1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2NvcnJlY3QgZ3JlZWR5IHNldHRpbmcgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpWydncmVlZHknXSA9IGdldEFjdGl2ZU1hc2tTZXQoKVsnZ3JlZWR5J10gPyBnZXRBY3RpdmVNYXNrU2V0KClbJ2dyZWVkeSddIDogZ2V0QWN0aXZlTWFza1NldCgpWydyZXBlYXQnXSA9PSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2hhbmRsZSBtYXhsZW5ndGggYXR0cmlidXRlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbC5hdHRyKFwibWF4TGVuZ3RoXCIpICE9IG51bGwpIC8vb25seSB3aGVuIHRoZSBhdHRyaWJ1dGUgaXMgc2V0XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4TGVuZ3RoID0gJGVsLnByb3AoJ21heExlbmd0aCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF4TGVuZ3RoID4gLTEpIHsgLy9oYW5kbGUgKi1yZXBlYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChtYXNrc2V0cywgZnVuY3Rpb24gKG5keCwgbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChtcykgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXNbXCJyZXBlYXRcIl0gPT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wicmVwZWF0XCJdID0gbWF4TGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldE1hc2tMZW5ndGgoKSA+PSBtYXhMZW5ndGggJiYgbWF4TGVuZ3RoID4gLTEpIHsgLy9GRiBzZXRzIG5vIGRlZmluZWQgbWF4IGxlbmd0aCB0byAtMSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXhMZW5ndGggPCBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLmxlbmd0aCkgZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5sZW5ndGggPSBtYXhMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydncmVlZHknXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVsncmVwZWF0J10gPSBNYXRoLnJvdW5kKG1heExlbmd0aCAvIGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC5wcm9wKCdtYXhMZW5ndGgnLCBnZXRNYXNrTGVuZ3RoKCkgKiAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0Y2hWYWx1ZVByb3BlcnR5KGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMubnVtZXJpY0lucHV0KSBvcHRzLmlzTnVtZXJpYyA9IG9wdHMubnVtZXJpY0lucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5kaXIgPT0gXCJydGxcIiB8fCAob3B0cy5udW1lcmljSW5wdXQgJiYgb3B0cy5yaWdodEFsaWduTnVtZXJpY3MpIHx8IChvcHRzLmlzTnVtZXJpYyAmJiBvcHRzLnJpZ2h0QWxpZ25OdW1lcmljcykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5jc3MoXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5kaXIgPT0gXCJydGxcIiB8fCBvcHRzLm51bWVyaWNJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5kaXIgPSBcImx0clwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwucmVtb3ZlQXR0cihcImRpclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0RGF0YSA9ICRlbC5kYXRhKCdfaW5wdXRtYXNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YVsnaXNSVEwnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5kYXRhKCdfaW5wdXRtYXNrJywgaW5wdXREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSVEwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy91bmJpbmQgYWxsIGV2ZW50cyAtIHRvIG1ha2Ugc3VyZSB0aGF0IG5vIG90aGVyIG1hc2sgd2lsbCBpbnRlcmZlcmUgd2hlbiByZS1tYXNraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLnVuYmluZChcIi5pbnB1dG1hc2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2JpbmQgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLmNsb3Nlc3QoJ2Zvcm0nKS5iaW5kKFwic3VibWl0XCIsIGZ1bmN0aW9uICgpIHsgLy90cmlnZ2VyIGNoYW5nZSBvbiBzdWJtaXQgaWYgYW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZU9uRm9jdXMgIT0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC5jaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoJ3Jlc2V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC50cmlnZ2VyKFwic2V0dmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRlbC5iaW5kKFwibW91c2VlbnRlci5pbnB1dG1hc2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISRpbnB1dC5oYXNDbGFzcygnZm9jdXMuaW5wdXRtYXNrJykgJiYgb3B0cy5zaG93TWFza09uSG92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5fdmFsdWVHZXQoKSAhPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKGlucHV0LCBnZXRBY3RpdmVCdWZmZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKFwiYmx1ci5pbnB1dG1hc2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzLCBucHRWYWx1ZSA9IGlucHV0Ll92YWx1ZUdldCgpLCBidWZmZXIgPSBnZXRBY3RpdmVCdWZmZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnJlbW92ZUNsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlT25Gb2N1cyAhPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzICYmIG5wdFZhbHVlICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnB0VmFsdWUgPT0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5qb2luKCcnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IC8vY2xlYXJvdXQgb3B0aW9uYWwgdGFpbCBvZiB0aGUgbWFza1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyT3B0aW9uYWxUYWlsKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21wbGV0ZShidWZmZXIpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJpbmNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY2xlYXJJbmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChtcykgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNbXCJidWZmZXJcIl0gPSBtc1tcIl9idWZmZXJcIl0uc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll92YWx1ZVNldCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZChcImZvY3VzLmlucHV0bWFza1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLCBpbnB1dCA9IHRoaXMsIG5wdFZhbHVlID0gaW5wdXQuX3ZhbHVlR2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dNYXNrT25Gb2N1cyAmJiAhJGlucHV0Lmhhc0NsYXNzKCdmb2N1cy5pbnB1dG1hc2snKSAmJiAoIW9wdHMuc2hvd01hc2tPbkhvdmVyIHx8IChvcHRzLnNob3dNYXNrT25Ib3ZlciAmJiBucHRWYWx1ZSA9PSAnJykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuX3ZhbHVlR2V0KCkgIT0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QWN0aXZlQnVmZmVyKCksIHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmFkZENsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVPbkZvY3VzID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZChcIm1vdXNlbGVhdmUuaW5wdXRtYXNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyksIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJGlucHV0Lmhhc0NsYXNzKCdmb2N1cy5pbnB1dG1hc2snKSAmJiBpbnB1dC5fdmFsdWVHZXQoKSAhPSAkaW5wdXQuYXR0cihcInBsYWNlaG9sZGVyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Ll92YWx1ZUdldCgpID09IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykgfHwgaW5wdXQuX3ZhbHVlR2V0KCkgPT0gJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll92YWx1ZVNldCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IC8vY2xlYXJvdXQgb3B0aW9uYWwgdGFpbCBvZiB0aGUgbWFza1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhck9wdGlvbmFsVGFpbChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZChcImNsaWNrLmlucHV0bWFza1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkQ2FyZXQgPSBjYXJldChpbnB1dCksIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2FyZXQuYmVnaW4gPT0gc2VsZWN0ZWRDYXJldC5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xpY2tQb3NpdGlvbiA9IGlzUlRMID8gVHJhbnNsYXRlUG9zaXRpb24oc2VsZWN0ZWRDYXJldC5iZWdpbikgOiBzZWxlY3RlZENhcmV0LmJlZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsdnAgPSBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmlzTnVtZXJpYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UG9zaXRpb24gPSBvcHRzLnNraXBSYWRpeERhbmNlID09PSBmYWxzZSAmJiBvcHRzLnJhZGl4UG9pbnQgIT0gXCJcIiAmJiAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBidWZmZXIpICE9IC0xID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLm51bWVyaWNJbnB1dCA/IHNlZWtOZXh0KCQuaW5BcnJheShvcHRzLnJhZGl4UG9pbnQsIGJ1ZmZlcikpIDogJC5pbkFycmF5KG9wdHMucmFkaXhQb2ludCwgYnVmZmVyKSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vla05leHQobHZwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UG9zaXRpb24gPSBzZWVrTmV4dChsdnApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tQb3NpdGlvbiA8IGxhc3RQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXNrKGNsaWNrUG9zaXRpb24pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIGNsaWNrUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGNhcmV0KGlucHV0LCBzZWVrTmV4dChjbGlja1Bvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBsYXN0UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKCdkYmxjbGljay5pbnB1dG1hc2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIDAsIHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQocGFzdGVFdmVudCArIFwiLmlucHV0bWFzayBkcmFnZHJvcC5pbnB1dG1hc2sgZHJvcC5pbnB1dG1hc2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNraXBJbnB1dEV2ZW50ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwSW5wdXRFdmVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcywgJGlucHV0ID0gJChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Bhc3RlIGV2ZW50IGZvciBJRTggYW5kIGxvd2VyIEkgZ3Vlc3MgOy0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gXCJwcm9wZXJ0eWNoYW5nZVwiICYmIGlucHV0Ll92YWx1ZUdldCgpLmxlbmd0aCA8PSBnZXRNYXNrTGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhc3RlVmFsdWUgPSBvcHRzLm9uQmVmb3JlUGFzdGUgIT0gdW5kZWZpbmVkID8gb3B0cy5vbkJlZm9yZVBhc3RlLmNhbGwodGhpcywgaW5wdXQuX3ZhbHVlR2V0KCkpIDogaW5wdXQuX3ZhbHVlR2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1ZhbChpbnB1dCwgdHJ1ZSwgZmFsc2UsIHBhc3RlVmFsdWUuc3BsaXQoJycpLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBsZXRlKGdldEFjdGl2ZUJ1ZmZlcigpKSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudHJpZ2dlcihcImNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoJ3NldHZhbHVlLmlucHV0bWFzaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWwoaW5wdXQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZU9uRm9jdXMgPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Ll92YWx1ZUdldCgpID09IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoJ2NvbXBsZXRlLmlucHV0bWFzaycsIG9wdHMub25jb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgICkuYmluZCgnaW5jb21wbGV0ZS5pbnB1dG1hc2snLCBvcHRzLm9uaW5jb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgICkuYmluZCgnY2xlYXJlZC5pbnB1dG1hc2snLCBvcHRzLm9uY2xlYXJlZFxyXG4gICAgICAgICAgICAgICAgICAgICkuYmluZChcImtleXVwLmlucHV0bWFza1wiLCBrZXl1cEV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZHJvaWRjaHJvbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmJpbmQoXCJpbnB1dC5pbnB1dG1hc2tcIiwgaW5wdXRFdmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmJpbmQoXCJrZXlkb3duLmlucHV0bWFza1wiLCBrZXlkb3duRXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKS5iaW5kKFwia2V5cHJlc3MuaW5wdXRtYXNrXCIsIGtleXByZXNzRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1zaWUxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmJpbmQoXCJpbnB1dC5pbnB1dG1hc2tcIiwgaW5wdXRFdmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vYXBwbHkgbWFza1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsKGVsLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVPbkZvY3VzID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV3JhcCBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluIGEgdHJ5L2NhdGNoIGJsb2NrIHNpbmNlIElFOSB0aHJvdyBcIlVuc3BlY2lmaWVkIGVycm9yXCIgaWYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpcyB1bmRlZmluZWQgd2hlbiB3ZSBhcmUgaW4gYW4gSUZyYW1lLlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQgPT09IGVsKSB7IC8vcG9zaXRpb24gdGhlIGNhcmV0IHdoZW4gaW4gZm9jdXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoZWwsIHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSA9PSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oJycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5fdmFsdWVTZXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJPcHRpb25hbFRhaWwoZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoZWwsIGdldEFjdGl2ZUJ1ZmZlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbGxFdmVudFJ1bGVyKGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9hY3Rpb24gb2JqZWN0XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25PYmogIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbk9ialtcImFjdGlvblwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpc0NvbXBsZXRlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc0NvbXBsZXRlKGFjdGlvbk9ialtcImJ1ZmZlclwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVubWFza2VkdmFsdWVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSVEwgPSBhY3Rpb25PYmpbXCIkaW5wdXRcIl0uZGF0YSgnX2lucHV0bWFzaycpWydpc1JUTCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5tYXNrZWR2YWx1ZShhY3Rpb25PYmpbXCIkaW5wdXRcIl0sIGFjdGlvbk9ialtcInNraXBEYXRlcGlja2VyQ2hlY2tcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtYXNrXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2soYWN0aW9uT2JqW1wiZWxcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZm9ybWF0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbCA9ICQoe30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwuZGF0YSgnX2lucHV0bWFzaycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXNrc2V0cyc6IG1hc2tzZXRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FjdGl2ZU1hc2tzZXRJbmRleCc6IGFjdGl2ZU1hc2tzZXRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRzJzogb3B0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpc1JUTCc6IG9wdHMubnVtZXJpY0lucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5udW1lcmljSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuaXNOdW1lcmljID0gb3B0cy5udW1lcmljSW5wdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JUTCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsKCRlbCwgZmFsc2UsIGZhbHNlLCBhY3Rpb25PYmpbXCJ2YWx1ZVwiXS5zcGxpdCgnJyksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgJC5pbnB1dG1hc2sgPSB7XHJcbiAgICAgICAgICAgIC8vb3B0aW9ucyBkZWZhdWx0XHJcbiAgICAgICAgICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJfXCIsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25hbG1hcmtlcjogeyBzdGFydDogXCJbXCIsIGVuZDogXCJdXCIgfSxcclxuICAgICAgICAgICAgICAgIHF1YW50aWZpZXJtYXJrZXI6IHsgc3RhcnQ6IFwie1wiLCBlbmQ6IFwifVwiIH0sXHJcbiAgICAgICAgICAgICAgICBncm91cG1hcmtlcjogeyBzdGFydDogXCIoXCIsIGVuZDogXCIpXCIgfSxcclxuICAgICAgICAgICAgICAgIGVzY2FwZUNoYXI6IFwiXFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgbWFzazogbnVsbCxcclxuICAgICAgICAgICAgICAgIG9uY29tcGxldGU6ICQubm9vcCwgLy9leGVjdXRlcyB3aGVuIHRoZSBtYXNrIGlzIGNvbXBsZXRlXHJcbiAgICAgICAgICAgICAgICBvbmluY29tcGxldGU6ICQubm9vcCwgLy9leGVjdXRlcyB3aGVuIHRoZSBtYXNrIGlzIGluY29tcGxldGUgYW5kIGZvY3VzIGlzIGxvc3RcclxuICAgICAgICAgICAgICAgIG9uY2xlYXJlZDogJC5ub29wLCAvL2V4ZWN1dGVzIHdoZW4gdGhlIG1hc2sgaXMgY2xlYXJlZFxyXG4gICAgICAgICAgICAgICAgcmVwZWF0OiAwLCAvL3JlcGV0aXRpb25zIG9mIHRoZSBtYXNrOiAqIH4gZm9yZXZlciwgb3RoZXJ3aXNlIHNwZWNpZnkgYW4gaW50ZWdlclxyXG4gICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlLCAvL3RydWU6IGFsbG9jYXRlZCBidWZmZXIgZm9yIHRoZSBtYXNrIGFuZCByZXBldGl0aW9ucyAtIGZhbHNlOiBhbGxvY2F0ZSBvbmx5IGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgYXV0b1VubWFzazogZmFsc2UsIC8vYXV0b21hdGljYWxseSB1bm1hc2sgd2hlbiByZXRyaWV2aW5nIHRoZSB2YWx1ZSB3aXRoICQuZm4udmFsIG9yIHZhbHVlIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIF9fbG9va3VwR2V0dGVyX18gb3IgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICBjbGVhck1hc2tPbkxvc3RGb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGluc2VydE1vZGU6IHRydWUsIC8vaW5zZXJ0IHRoZSBpbnB1dCBvciBvdmVyd3JpdGUgdGhlIGlucHV0XHJcbiAgICAgICAgICAgICAgICBjbGVhckluY29tcGxldGU6IGZhbHNlLCAvL2NsZWFyIHRoZSBpbmNvbXBsZXRlIGlucHV0IG9uIGJsdXJcclxuICAgICAgICAgICAgICAgIGFsaWFzZXM6IHt9LCAvL2FsaWFzZXMgZGVmaW5pdGlvbnMgPT4gc2VlIGpxdWVyeS5pbnB1dG1hc2suZXh0ZW5zaW9ucy5qc1xyXG4gICAgICAgICAgICAgICAgb25LZXlVcDogJC5ub29wLCAvL292ZXJyaWRlIHRvIGltcGxlbWVudCBhdXRvY29tcGxldGUgb24gY2VydGFpbiBrZXlzIGZvciBleGFtcGxlXHJcbiAgICAgICAgICAgICAgICBvbktleURvd246ICQubm9vcCwgLy9vdmVycmlkZSB0byBpbXBsZW1lbnQgYXV0b2NvbXBsZXRlIG9uIGNlcnRhaW4ga2V5cyBmb3IgZXhhbXBsZVxyXG4gICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogdW5kZWZpbmVkLCAvL2V4ZWN1dGVzIGJlZm9yZSBtYXNraW5nIHRoZSBwYXN0ZWQgdmFsdWUgdG8gYWxsb3cgcHJlcHJvY2Vzc2luZyBvZiB0aGUgcGFzdGVkIHZhbHVlLiAgYXJncyA9PiBwYXN0ZWRWYWx1ZSA9PiByZXR1cm4gcHJvY2Vzc2VkVmFsdWVcclxuICAgICAgICAgICAgICAgIG9uVW5NYXNrOiB1bmRlZmluZWQsIC8vZXhlY3V0ZXMgYWZ0ZXIgdW5tYXNraW5nIHRvIGFsbG93IHBvc3Rwcm9jZXNzaW5nIG9mIHRoZSB1bm1hc2tlZHZhbHVlLiAgYXJncyA9PiBtYXNrZWRWYWx1ZSwgdW5tYXNrZWRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgc2hvd01hc2tPbkZvY3VzOiB0cnVlLCAvL3Nob3cgdGhlIG1hc2stcGxhY2Vob2xkZXIgd2hlbiB0aGUgaW5wdXQgaGFzIGZvY3VzXHJcbiAgICAgICAgICAgICAgICBzaG93TWFza09uSG92ZXI6IHRydWUsIC8vc2hvdyB0aGUgbWFzay1wbGFjZWhvbGRlciB3aGVuIGhvdmVyaW5nIHRoZSBlbXB0eSBpbnB1dFxyXG4gICAgICAgICAgICAgICAgb25LZXlWYWxpZGF0aW9uOiAkLm5vb3AsIC8vZXhlY3V0ZXMgb24gZXZlcnkga2V5LXByZXNzIHdpdGggdGhlIHJlc3VsdCBvZiBpc1ZhbGlkLiBQYXJhbXM6IHJlc3VsdCwgb3B0c1xyXG4gICAgICAgICAgICAgICAgc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlcjogXCIgXCIsIC8vYSBjaGFyYWN0ZXIgd2hpY2ggY2FuIGJlIHVzZWQgdG8gc2tpcCBhbiBvcHRpb25hbCBwYXJ0IG9mIGEgbWFza1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2x0aXA6IGZhbHNlLCAvL3Nob3cgdGhlIGFjdGl2ZW1hc2sgYXMgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgbnVtZXJpY0lucHV0OiBmYWxzZSwgLy9udW1lcmljSW5wdXQgaW5wdXQgZGlyZWN0aW9uIHN0eWxlIChpbnB1dCBzaGlmdHMgdG8gdGhlIGxlZnQgd2hpbGUgaG9sZGluZyB0aGUgY2FyZXQgcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAvL251bWVyaWMgYmFzaWMgcHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAgaXNOdW1lcmljOiBmYWxzZSwgLy9lbmFibGUgbnVtZXJpYyBmZWF0dXJlc1xyXG4gICAgICAgICAgICAgICAgcmFkaXhQb2ludDogXCJcIiwgLy9cIi5cIiwgLy8gfCBcIixcIlxyXG4gICAgICAgICAgICAgICAgc2tpcFJhZGl4RGFuY2U6IGZhbHNlLCAvL2Rpc2FibGUgcmFkaXhwb2ludCBjYXJldCBwb3NpdGlvbmluZ1xyXG4gICAgICAgICAgICAgICAgcmlnaHRBbGlnbk51bWVyaWNzOiB0cnVlLCAvL2FsaWduIG51bWVyaWNzIHRvIHRoZSByaWdodFxyXG4gICAgICAgICAgICAgICAgLy9udW1lcmljIGJhc2ljIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJzknOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05XVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2EnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbQS1aYS16XFx1MDQxMC1cXHUwNDRGXFx1MDQwMVxcdTA0NTFdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAnKic6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIltBLVphLXpcXHUwNDEwLVxcdTA0NEZcXHUwNDAxXFx1MDQ1MTAtOV1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAga2V5Q29kZToge1xyXG4gICAgICAgICAgICAgICAgICAgIEFMVDogMTgsIEJBQ0tTUEFDRTogOCwgQ0FQU19MT0NLOiAyMCwgQ09NTUE6IDE4OCwgQ09NTUFORDogOTEsIENPTU1BTkRfTEVGVDogOTEsIENPTU1BTkRfUklHSFQ6IDkzLCBDT05UUk9MOiAxNywgREVMRVRFOiA0NiwgRE9XTjogNDAsIEVORDogMzUsIEVOVEVSOiAxMywgRVNDQVBFOiAyNywgSE9NRTogMzYsIElOU0VSVDogNDUsIExFRlQ6IDM3LCBNRU5VOiA5MywgTlVNUEFEX0FERDogMTA3LCBOVU1QQURfREVDSU1BTDogMTEwLCBOVU1QQURfRElWSURFOiAxMTEsIE5VTVBBRF9FTlRFUjogMTA4LFxyXG4gICAgICAgICAgICAgICAgICAgIE5VTVBBRF9NVUxUSVBMWTogMTA2LCBOVU1QQURfU1VCVFJBQ1Q6IDEwOSwgUEFHRV9ET1dOOiAzNCwgUEFHRV9VUDogMzMsIFBFUklPRDogMTkwLCBSSUdIVDogMzksIFNISUZUOiAxNiwgU1BBQ0U6IDMyLCBUQUI6IDksIFVQOiAzOCwgV0lORE9XUzogOTFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvL3NwZWNpZnkga2V5Y29kZXMgd2hpY2ggc2hvdWxkIG5vdCBiZSBjb25zaWRlcmVkIGluIHRoZSBrZXlwcmVzcyBldmVudCwgb3RoZXJ3aXNlIHRoZSBwcmV2ZW50RGVmYXVsdCB3aWxsIHN0b3AgdGhlaXIgZGVmYXVsdCBiZWhhdmlvciBlc3BlY2lhbGx5IGluIEZGXHJcbiAgICAgICAgICAgICAgICBpZ25vcmFibGVzOiBbOCwgOSwgMTMsIDE5LCAyNywgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLCA0NSwgNDYsIDkzLCAxMTIsIDExMywgMTE0LCAxMTUsIDExNiwgMTE3LCAxMTgsIDExOSwgMTIwLCAxMjEsIDEyMiwgMTIzXSxcclxuICAgICAgICAgICAgICAgIGdldE1hc2tMZW5ndGg6IGZ1bmN0aW9uIChidWZmZXIsIGdyZWVkeSwgcmVwZWF0LCBjdXJyZW50QnVmZmVyLCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWRMZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZ3JlZWR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXBlYXQgPT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRMZW5ndGggPSBjdXJyZW50QnVmZmVyLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVwZWF0ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZExlbmd0aCArPSAoYnVmZmVyLmxlbmd0aCAqIChyZXBlYXQgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVzY2FwZVJlZ2V4OiBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BlY2lhbHMgPSBbJy8nLCAnLicsICcqJywgJysnLCAnPycsICd8JywgJygnLCAnKScsICdbJywgJ10nLCAneycsICd9JywgJ1xcXFwnXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKCcoXFxcXCcgKyBzcGVjaWFscy5qb2luKCd8XFxcXCcpICsgJyknLCAnZ2ltJyksICdcXFxcJDEnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRzID0gJC5leHRlbmQodHJ1ZSwge30sICQuaW5wdXRtYXNrLmRlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmVBbGlhcyhvcHRzLmFsaWFzLCBvcHRpb25zLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXNrU2NvcGUoZ2VuZXJhdGVNYXNrU2V0cyhvcHRzKSwgMCwgb3B0cywgeyBcImFjdGlvblwiOiBcImZvcm1hdFwiLCBcInZhbHVlXCI6IHZhbHVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJC5mbi5pbnB1dG1hc2sgPSBmdW5jdGlvbiAoZm4sIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIG9wdHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5pbnB1dG1hc2suZGVmYXVsdHMsIG9wdGlvbnMpLFxyXG4gICAgICAgICAgICAgICAgbWFza3NldHMsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChmbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtYXNrXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzb2x2ZSBwb3NzaWJsZSBhbGlhc2VzIGdpdmVuIGJ5IG9wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUFsaWFzKG9wdHMuYWxpYXMsIG9wdGlvbnMsIG9wdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IGdlbmVyYXRlTWFza1NldHMob3B0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXNrc2V0cy5sZW5ndGggPT0gMCkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrU2NvcGUoJC5leHRlbmQodHJ1ZSwge30sIG1hc2tzZXRzKSwgMCwgb3B0cywgeyBcImFjdGlvblwiOiBcIm1hc2tcIiwgXCJlbFwiOiB0aGlzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidW5tYXNrZWR2YWx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHMgPSAkaW5wdXQuZGF0YSgnX2lucHV0bWFzaycpWydtYXNrc2V0cyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzID0gJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKVsnb3B0cyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tTY29wZShtYXNrc2V0cywgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCB7IFwiYWN0aW9uXCI6IFwidW5tYXNrZWR2YWx1ZVwiLCBcIiRpbnB1dFwiOiAkaW5wdXQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gJGlucHV0LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZW1vdmVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9ICRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJylbJ21hc2tzZXRzJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cyA9ICRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3dyaXRlb3V0IHRoZSB1bm1hc2tlZHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuX3ZhbHVlU2V0KG1hc2tTY29wZShtYXNrc2V0cywgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCB7IFwiYWN0aW9uXCI6IFwidW5tYXNrZWR2YWx1ZVwiLCBcIiRpbnB1dFwiOiAkaW5wdXQsIFwic2tpcERhdGVwaWNrZXJDaGVja1wiOiB0cnVlIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NsZWFyIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucmVtb3ZlRGF0YSgnX2lucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdW5iaW5kIGFsbCBldmVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudW5iaW5kKFwiLmlucHV0bWFza1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucmVtb3ZlQ2xhc3MoJ2ZvY3VzLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzdG9yZSB0aGUgdmFsdWUgcHJvcGVydHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVQcm9wZXJ0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaW5wdXQsIFwidmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlUHJvcGVydHkgJiYgdmFsdWVQcm9wZXJ0eS5nZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Ll92YWx1ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGlucHV0LCBcInZhbHVlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGlucHV0Ll92YWx1ZUdldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IGlucHV0Ll92YWx1ZVNldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgaW5wdXQuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5fdmFsdWVHZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll9fZGVmaW5lR2V0dGVyX18oXCJ2YWx1ZVwiLCBpbnB1dC5fdmFsdWVHZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuX19kZWZpbmVTZXR0ZXJfXyhcInZhbHVlXCIsIGlucHV0Ll92YWx1ZVNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHsgLy90cnkgY2F0Y2ggbmVlZGVkIGZvciBJRTcgYXMgaXQgZG9lcyBub3Qgc3VwcG9ydHMgZGVsZXRpbmcgZm5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnB1dC5fdmFsdWVHZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnB1dC5fdmFsdWVTZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVHZXQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll92YWx1ZVNldCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImdldGVtcHR5bWFza1wiOiAvL3JldHVybiB0aGUgZGVmYXVsdCAoZW1wdHkpIG1hc2sgdmFsdWUsIHVzZWZ1bGwgZm9yIHNldHRpbmcgdGhlIGRlZmF1bHQgdmFsdWUgaW4gdmFsaWRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhKCdfaW5wdXRtYXNrJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ21hc2tzZXRzJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSB0aGlzLmRhdGEoJ19pbnB1dG1hc2snKVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFza3NldHNbYWN0aXZlTWFza3NldEluZGV4XVsnX2J1ZmZlciddLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImhhc01hc2tlZFZhbHVlXCI6IC8vY2hlY2sgd2hldGVyIHRoZSByZXR1cm5lZCB2YWx1ZSBpcyBtYXNrZWQgb3Igbm90OyBjdXJyZW50bHkgb25seSB3b3JrcyByZWxpYWJsZSB3aGVuIHVzaW5nIGpxdWVyeS52YWwgZm4gdG8gcmV0cmlldmUgdGhlIHZhbHVlIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJykgPyAhdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXS5hdXRvVW5tYXNrIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlzQ29tcGxldGVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHMgPSB0aGlzLmRhdGEoJ19pbnB1dG1hc2snKVsnbWFza3NldHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tTY29wZShtYXNrc2V0cywgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCB7IFwiYWN0aW9uXCI6IFwiaXNDb21wbGV0ZVwiLCBcImJ1ZmZlclwiOiB0aGlzWzBdLl92YWx1ZUdldCgpLnNwbGl0KCcnKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZ2V0bWV0YWRhdGFcIjogLy9yZXR1cm4gbWFzayBtZXRhZGF0YSBpZiBleGlzdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YSgnX2lucHV0bWFzaycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IHRoaXMuZGF0YSgnX2lucHV0bWFzaycpWydtYXNrc2V0cyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ21ldGFkYXRhJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgdGhlIGZuIGlzIGFuIGFsaWFzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzb2x2ZUFsaWFzKGZuLCBvcHRpb25zLCBvcHRzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tYXliZSBmbiBpcyBhIG1hc2sgc28gd2UgdHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NldCBtYXNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLm1hc2sgPSBmbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IGdlbmVyYXRlTWFza1NldHMob3B0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXNrc2V0cy5sZW5ndGggPT0gMCkgeyByZXR1cm4gdGhpczsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tTY29wZSgkLmV4dGVuZCh0cnVlLCB7fSwgbWFza3NldHMpLCBhY3RpdmVNYXNrc2V0SW5kZXgsIG9wdHMsIHsgXCJhY3Rpb25cIjogXCJtYXNrXCIsIFwiZWxcIjogdGhpcyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZm4gPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgb3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmlucHV0bWFzay5kZWZhdWx0cywgZm4pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc29sdmVBbGlhcyhvcHRzLmFsaWFzLCBmbiwgb3B0cyk7IC8vcmVzb2x2ZSBhbGlhc2VzXHJcbiAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IGdlbmVyYXRlTWFza1NldHMob3B0cyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFza3NldHMubGVuZ3RoID09IDApIHsgcmV0dXJuIHRoaXM7IH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tTY29wZSgkLmV4dGVuZCh0cnVlLCB7fSwgbWFza3NldHMpLCBhY3RpdmVNYXNrc2V0SW5kZXgsIG9wdHMsIHsgXCJhY3Rpb25cIjogXCJtYXNrXCIsIFwiZWxcIjogdGhpcyB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZuID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy9sb29rIGZvciBkYXRhLWlucHV0bWFzayBhdHJpYnV0ZSAtIHRoZSBhdHRyaWJ1dGUgc2hvdWxkIG9ubHkgY29udGFpbiBvcHRpcG5zXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ck9wdGlvbnMgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlucHV0bWFza1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ck9wdGlvbnMgJiYgYXR0ck9wdGlvbnMgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck9wdGlvbnMgPSBhdHRyT3B0aW9ucy5yZXBsYWNlKG5ldyBSZWdFeHAoXCInXCIsIFwiZ1wiKSwgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YW9wdGlvbnMgPSAkLnBhcnNlSlNPTihcIntcIiArIGF0dHJPcHRpb25zICsgXCJ9XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgZGF0YW9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmlucHV0bWFzay5kZWZhdWx0cywgZGF0YW9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUFsaWFzKG9wdHMuYWxpYXMsIGRhdGFvcHRpb25zLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuYWxpYXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmlucHV0bWFzayhvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHsgfSAvL25lZWQgYSBtb3JlIHJlbGF4IHBhcnNlSlNPTlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSkoalF1ZXJ5KTtcclxuIiwiLyohIGlDaGVjayB2MS4wLjEgYnkgRGFtaXIgU3VsdGFub3YsIGh0dHA6Ly9naXQuaW8vYXJsemVBLCBNSVQgTGljZW5zZWQgKi9cbihmdW5jdGlvbihoKXtmdW5jdGlvbiBGKGEsYixkKXt2YXIgYz1hWzBdLGU9L2VyLy50ZXN0KGQpP206L2JsLy50ZXN0KGQpP3M6bCxmPWQ9PUg/e2NoZWNrZWQ6Y1tsXSxkaXNhYmxlZDpjW3NdLGluZGV0ZXJtaW5hdGU6XCJ0cnVlXCI9PWEuYXR0cihtKXx8XCJmYWxzZVwiPT1hLmF0dHIodyl9OmNbZV07aWYoL14oY2h8ZGl8aW4pLy50ZXN0KGQpJiYhZilEKGEsZSk7ZWxzZSBpZigvXih1bnxlbnxkZSkvLnRlc3QoZCkmJmYpdChhLGUpO2Vsc2UgaWYoZD09SClmb3IoZSBpbiBmKWZbZV0/RChhLGUsITApOnQoYSxlLCEwKTtlbHNlIGlmKCFifHxcInRvZ2dsZVwiPT1kKXtpZighYilhW3BdKFwiaWZDbGlja2VkXCIpO2Y/Y1tuXSE9PXUmJnQoYSxlKTpEKGEsZSl9fWZ1bmN0aW9uIEQoYSxiLGQpe3ZhciBjPWFbMF0sZT1hLnBhcmVudCgpLGY9Yj09bCxBPWI9PW0sQj1iPT1zLEs9QT93OmY/RTpcImVuYWJsZWRcIixwPWsoYSxLK3goY1tuXSkpLE49ayhhLGIreChjW25dKSk7aWYoITAhPT1jW2JdKXtpZighZCYmXG5iPT1sJiZjW25dPT11JiZjLm5hbWUpe3ZhciBDPWEuY2xvc2VzdChcImZvcm1cIikscj0naW5wdXRbbmFtZT1cIicrYy5uYW1lKydcIl0nLHI9Qy5sZW5ndGg/Qy5maW5kKHIpOmgocik7ci5lYWNoKGZ1bmN0aW9uKCl7dGhpcyE9PWMmJmgodGhpcykuZGF0YShxKSYmdChoKHRoaXMpLGIpfSl9QT8oY1tiXT0hMCxjW2xdJiZ0KGEsbCxcImZvcmNlXCIpKTooZHx8KGNbYl09ITApLGYmJmNbbV0mJnQoYSxtLCExKSk7TChhLGYsYixkKX1jW3NdJiZrKGEseSwhMCkmJmUuZmluZChcIi5cIitJKS5jc3MoeSxcImRlZmF1bHRcIik7ZVt2XShOfHxrKGEsYil8fFwiXCIpO0I/ZS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLFwidHJ1ZVwiKTplLmF0dHIoXCJhcmlhLWNoZWNrZWRcIixBP1wibWl4ZWRcIjpcInRydWVcIik7ZVt6XShwfHxrKGEsSyl8fFwiXCIpfWZ1bmN0aW9uIHQoYSxiLGQpe3ZhciBjPWFbMF0sZT1hLnBhcmVudCgpLGY9Yj09bCxoPWI9PW0scT1iPT1zLHA9aD93OmY/RTpcImVuYWJsZWRcIix0PWsoYSxwK3goY1tuXSkpLFxudT1rKGEsYit4KGNbbl0pKTtpZighMSE9PWNbYl0pe2lmKGh8fCFkfHxcImZvcmNlXCI9PWQpY1tiXT0hMTtMKGEsZixwLGQpfSFjW3NdJiZrKGEseSwhMCkmJmUuZmluZChcIi5cIitJKS5jc3MoeSxcInBvaW50ZXJcIik7ZVt6XSh1fHxrKGEsYil8fFwiXCIpO3E/ZS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLFwiZmFsc2VcIik6ZS5hdHRyKFwiYXJpYS1jaGVja2VkXCIsXCJmYWxzZVwiKTtlW3ZdKHR8fGsoYSxwKXx8XCJcIil9ZnVuY3Rpb24gTShhLGIpe2lmKGEuZGF0YShxKSl7YS5wYXJlbnQoKS5odG1sKGEuYXR0cihcInN0eWxlXCIsYS5kYXRhKHEpLnN8fFwiXCIpKTtpZihiKWFbcF0oYik7YS5vZmYoXCIuaVwiKS51bndyYXAoKTtoKEcrJ1tmb3I9XCInK2FbMF0uaWQrJ1wiXScpLmFkZChhLmNsb3Nlc3QoRykpLm9mZihcIi5pXCIpfX1mdW5jdGlvbiBrKGEsYixkKXtpZihhLmRhdGEocSkpcmV0dXJuIGEuZGF0YShxKS5vW2IrKGQ/XCJcIjpcIkNsYXNzXCIpXX1mdW5jdGlvbiB4KGEpe3JldHVybiBhLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK1xuYS5zbGljZSgxKX1mdW5jdGlvbiBMKGEsYixkLGMpe2lmKCFjKXtpZihiKWFbcF0oXCJpZlRvZ2dsZWRcIik7YVtwXShcImlmQ2hhbmdlZFwiKVtwXShcImlmXCIreChkKSl9fXZhciBxPVwiaUNoZWNrXCIsST1xK1wiLWhlbHBlclwiLHU9XCJyYWRpb1wiLGw9XCJjaGVja2VkXCIsRT1cInVuXCIrbCxzPVwiZGlzYWJsZWRcIix3PVwiZGV0ZXJtaW5hdGVcIixtPVwiaW5cIit3LEg9XCJ1cGRhdGVcIixuPVwidHlwZVwiLHY9XCJhZGRDbGFzc1wiLHo9XCJyZW1vdmVDbGFzc1wiLHA9XCJ0cmlnZ2VyXCIsRz1cImxhYmVsXCIseT1cImN1cnNvclwiLEo9L2lwYWR8aXBob25lfGlwb2R8YW5kcm9pZHxibGFja2JlcnJ5fHdpbmRvd3MgcGhvbmV8b3BlcmEgbWluaXxzaWxrL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtoLmZuW3FdPWZ1bmN0aW9uKGEsYil7dmFyIGQ9J2lucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cIicrdSsnXCJdJyxjPWgoKSxlPWZ1bmN0aW9uKGEpe2EuZWFjaChmdW5jdGlvbigpe3ZhciBhPWgodGhpcyk7Yz1hLmlzKGQpP1xuYy5hZGQoYSk6Yy5hZGQoYS5maW5kKGQpKX0pfTtpZigvXihjaGVja3x1bmNoZWNrfHRvZ2dsZXxpbmRldGVybWluYXRlfGRldGVybWluYXRlfGRpc2FibGV8ZW5hYmxlfHVwZGF0ZXxkZXN0cm95KSQvaS50ZXN0KGEpKXJldHVybiBhPWEudG9Mb3dlckNhc2UoKSxlKHRoaXMpLGMuZWFjaChmdW5jdGlvbigpe3ZhciBjPWgodGhpcyk7XCJkZXN0cm95XCI9PWE/TShjLFwiaWZEZXN0cm95ZWRcIik6RihjLCEwLGEpO2guaXNGdW5jdGlvbihiKSYmYigpfSk7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGEmJmEpcmV0dXJuIHRoaXM7dmFyIGY9aC5leHRlbmQoe2NoZWNrZWRDbGFzczpsLGRpc2FibGVkQ2xhc3M6cyxpbmRldGVybWluYXRlQ2xhc3M6bSxsYWJlbEhvdmVyOiEwLGFyaWE6ITF9LGEpLGs9Zi5oYW5kbGUsQj1mLmhvdmVyQ2xhc3N8fFwiaG92ZXJcIix4PWYuZm9jdXNDbGFzc3x8XCJmb2N1c1wiLHc9Zi5hY3RpdmVDbGFzc3x8XCJhY3RpdmVcIix5PSEhZi5sYWJlbEhvdmVyLEM9Zi5sYWJlbEhvdmVyQ2xhc3N8fFxuXCJob3ZlclwiLHI9KFwiXCIrZi5pbmNyZWFzZUFyZWEpLnJlcGxhY2UoXCIlXCIsXCJcIil8MDtpZihcImNoZWNrYm94XCI9PWt8fGs9PXUpZD0naW5wdXRbdHlwZT1cIicraysnXCJdJzstNTA+ciYmKHI9LTUwKTtlKHRoaXMpO3JldHVybiBjLmVhY2goZnVuY3Rpb24oKXt2YXIgYT1oKHRoaXMpO00oYSk7dmFyIGM9dGhpcyxiPWMuaWQsZT0tcitcIiVcIixkPTEwMCsyKnIrXCIlXCIsZD17cG9zaXRpb246XCJhYnNvbHV0ZVwiLHRvcDplLGxlZnQ6ZSxkaXNwbGF5OlwiYmxvY2tcIix3aWR0aDpkLGhlaWdodDpkLG1hcmdpbjowLHBhZGRpbmc6MCxiYWNrZ3JvdW5kOlwiI2ZmZlwiLGJvcmRlcjowLG9wYWNpdHk6MH0sZT1KP3twb3NpdGlvbjpcImFic29sdXRlXCIsdmlzaWJpbGl0eTpcImhpZGRlblwifTpyP2Q6e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIixvcGFjaXR5OjB9LGs9XCJjaGVja2JveFwiPT1jW25dP2YuY2hlY2tib3hDbGFzc3x8XCJpY2hlY2tib3hcIjpmLnJhZGlvQ2xhc3N8fFwiaVwiK3UsbT1oKEcrJ1tmb3I9XCInK2IrJ1wiXScpLmFkZChhLmNsb3Nlc3QoRykpLFxuQT0hIWYuYXJpYSxFPXErXCItXCIrTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikucmVwbGFjZShcIjAuXCIsXCJcIiksZz0nPGRpdiBjbGFzcz1cIicraysnXCIgJysoQT8ncm9sZT1cIicrY1tuXSsnXCIgJzpcIlwiKTttLmxlbmd0aCYmQSYmbS5lYWNoKGZ1bmN0aW9uKCl7Zys9J2FyaWEtbGFiZWxsZWRieT1cIic7dGhpcy5pZD9nKz10aGlzLmlkOih0aGlzLmlkPUUsZys9RSk7Zys9J1wiJ30pO2c9YS53cmFwKGcrXCIvPlwiKVtwXShcImlmQ3JlYXRlZFwiKS5wYXJlbnQoKS5hcHBlbmQoZi5pbnNlcnQpO2Q9aCgnPGlucyBjbGFzcz1cIicrSSsnXCIvPicpLmNzcyhkKS5hcHBlbmRUbyhnKTthLmRhdGEocSx7bzpmLHM6YS5hdHRyKFwic3R5bGVcIil9KS5jc3MoZSk7Zi5pbmhlcml0Q2xhc3MmJmdbdl0oYy5jbGFzc05hbWV8fFwiXCIpO2YuaW5oZXJpdElEJiZiJiZnLmF0dHIoXCJpZFwiLHErXCItXCIrYik7XCJzdGF0aWNcIj09Zy5jc3MoXCJwb3NpdGlvblwiKSYmZy5jc3MoXCJwb3NpdGlvblwiLFwicmVsYXRpdmVcIik7RihhLCEwLEgpO1xuaWYobS5sZW5ndGgpbS5vbihcImNsaWNrLmkgbW91c2VvdmVyLmkgbW91c2VvdXQuaSB0b3VjaGJlZ2luLmkgdG91Y2hlbmQuaVwiLGZ1bmN0aW9uKGIpe3ZhciBkPWJbbl0sZT1oKHRoaXMpO2lmKCFjW3NdKXtpZihcImNsaWNrXCI9PWQpe2lmKGgoYi50YXJnZXQpLmlzKFwiYVwiKSlyZXR1cm47RihhLCExLCEwKX1lbHNlIHkmJigvdXR8bmQvLnRlc3QoZCk/KGdbel0oQiksZVt6XShDKSk6KGdbdl0oQiksZVt2XShDKSkpO2lmKEopYi5zdG9wUHJvcGFnYXRpb24oKTtlbHNlIHJldHVybiExfX0pO2Eub24oXCJjbGljay5pIGZvY3VzLmkgYmx1ci5pIGtleXVwLmkga2V5ZG93bi5pIGtleXByZXNzLmlcIixmdW5jdGlvbihiKXt2YXIgZD1iW25dO2I9Yi5rZXlDb2RlO2lmKFwiY2xpY2tcIj09ZClyZXR1cm4hMTtpZihcImtleWRvd25cIj09ZCYmMzI9PWIpcmV0dXJuIGNbbl09PXUmJmNbbF18fChjW2xdP3QoYSxsKTpEKGEsbCkpLCExO2lmKFwia2V5dXBcIj09ZCYmY1tuXT09dSkhY1tsXSYmRChhLGwpO2Vsc2UgaWYoL3VzfHVyLy50ZXN0KGQpKWdbXCJibHVyXCI9PVxuZD96OnZdKHgpfSk7ZC5vbihcImNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlb3ZlciBtb3VzZW91dCB0b3VjaGJlZ2luLmkgdG91Y2hlbmQuaVwiLGZ1bmN0aW9uKGIpe3ZhciBkPWJbbl0sZT0vd258dXAvLnRlc3QoZCk/dzpCO2lmKCFjW3NdKXtpZihcImNsaWNrXCI9PWQpRihhLCExLCEwKTtlbHNle2lmKC93bnxlcnxpbi8udGVzdChkKSlnW3ZdKGUpO2Vsc2UgZ1t6XShlK1wiIFwiK3cpO2lmKG0ubGVuZ3RoJiZ5JiZlPT1CKW1bL3V0fG5kLy50ZXN0KGQpP3o6dl0oQyl9aWYoSiliLnN0b3BQcm9wYWdhdGlvbigpO2Vsc2UgcmV0dXJuITF9fSl9KX19KSh3aW5kb3cualF1ZXJ5fHx3aW5kb3cuWmVwdG8pO1xuIl19
