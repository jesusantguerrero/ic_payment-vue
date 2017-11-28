var BASE_URL = window.location.origin + "/";
if(BASE_URL.includes("localhost") || BASE_URL.includes('ngrok.io')){
  BASE_URL += 'icpayment/';
}


var currentPage = $('title').text().split(' ');
currentPage = currentPage[4].toLowerCase().trim();

var MESSAGE_SUCCESS = '<i class="material-icons">done_all</i>';
var MESSAGE_ERROR   = '<i class="material-icons">error_outline</i>';
var MESSAGE_INFO    = '<i class="material-icons">info_outline</i>';
var SUMMER_SKY      = '#1FA1D0';

try {
  var busAveria       = new Vue();
} catch(err) {

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
function isEmpty(values,is_num) {
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
