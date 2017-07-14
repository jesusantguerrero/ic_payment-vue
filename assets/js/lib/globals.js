var BASE_URL = 'http://localhost/ic/';
var MESSAGE_SUCCESS = '<i class="material-icons">done_all</i>';
var MESSAGE_ERROR = '<i class="material-icons">error_outline</i>';
var MESSAGE_INFO = '<i class="material-icons">info_outline</i>';
var SUMMER_SKY = '#1FA1D0'

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

  console.log(message)

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
  if(tableID != undefined){
    $table = $('#'+tableID + " tbody");
  }else{
    $table = $("[class*='t-'] tbody");
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
// +-----------------------------------------------------------------------------------------------------------------------------+
// |                                                     Pagination Related Funtions                                             |
// |                                                                                                                             |
// +-----------------------------------------------------------------------------------------------------------------------------+

/**
 * get Pagination Data: Devuelve la información del pie de la tabla relacionada con la paginación
 * @param {string} tableId 
 * @return {{perpage: number,$maxLimit: HTMLElement,$minLimit: HTMLElement,$maxLimitVisible: HTMLElement,previous:number,next:number,min:number,max: number,total:number}}
 * 
 */
function getPaginationData(tableId){
  var perpage = $(tableId + " .per-page").val();
  var $maxLimit = $(tableId + " .max-limit");
  var $maxLimitVisible = $(tableId + " .max-limit-visible");
  var $minLimit = $(tableId + " .min-limit");
  var $totalRows = $(tableId + " .total-rows");
  var total = $(tableId + " .total-rows").text();
  var previous = Number($minLimit.text());
  var next = Number($maxLimit.text());
  var min = previous;
  var max = next;
  total = Number(total)
  perpage = Number(perpage);
  next = next + perpage;
  previous = previous + perpage;

  return {"perpage": perpage,
          "min": min,
          "max": max,
          "previous": previous,
          "next":next,
          "$maxLimit": $maxLimit,
          "$maxLimitVisible": $maxLimitVisible,
          "$minLimit": $minLimit,
          "$totalRows": $totalRows,
          "total": total
        }
}

/**
 * init Pagination: make a table paginatable
 * mi metodo de paginacion propio habilita las funciones next, y previous
 * @constructor
 * @param {string} tableId Id de la <table> de la vista example '#t-table'
 * @param {string} serverTable Tabla de la base de datos a paginar
 * @param {function} paginate La funcion paginate como parametro
 * @return {void}
 */
function initPagination(tableId,serverTable,paginate){ 
   var pagination = getPaginationData(tableId);
   var $total = pagination.$totalRows;
  setTimeout(function(){
    if (Number($total.text()) <= 5) pagination.$maxLimitVisible.text(Number($total.text()));
  },2000) 
  $(tableId + " .next-page").on('click',function(e){
    e.stopImmediatePropagation()

    var pagination = getPaginationData(tableId);
    if(pagination.max < pagination.total){
      var nextMax = pagination.max + pagination.perpage;
      paginate(pagination.max ,pagination.perpage,serverTable);
      if(nextMax > pagination.total){
        pagination.$maxLimitVisible.text(pagination.total);
      }else{
        pagination.$maxLimitVisible.text(nextMax);
      } 
      pagination.$maxLimit.text(pagination.max + pagination.perpage); 
      pagination.$minLimit.text(pagination.min + pagination.perpage);
    }
  });

  $(tableId + " .previous-page").on('click',function(e){
    e.stopImmediatePropagation()
    var pagination = getPaginationData(tableId);
    if(pagination.min != 1){
      var previousMax = pagination.max - pagination.perpage;
      pagination.$maxLimit.text(previousMax);
      pagination.$maxLimitVisible.text(previousMax);
      pagination.$minLimit.text(pagination.min - pagination.perpage);
      paginate(pagination.min - pagination.perpage - 1,pagination.perpage,serverTable);
    }
  });

  $(tableId + " .per-page").on('change',function(e){
    e.stopImmediatePropagation();
    var pagination = getPaginationData(tableId)
    pagination.$maxLimit.text(pagination.perpage);
    if(pagination.perpage > pagination.total){
      pagination.$maxLimitVisible.text(pagination.total);
    }else{
      pagination.$maxLimitVisible.text(pagination.perpage);
    }
    
    pagination.$minLimit.text(pagination.min);
    paginate(pagination.min,pagination.perpage,serverTable);
  })
}

function updateSaldo(money){
  money = "RD$ "+ CurrencyFormat(money)
  $(".current-saldo").text(money);
}

function updateCount($content){
  $(".total-rows").html($content);
}

function updateCajaCount($content){
  $("#caja .total-rows").html($content);
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

function deleteValidation($inputElement,$buttonToActive){
  var innerText;
  $inputElement.on("keyup",function(e){
    e.stopImmediatePropagation();
    innerText = $(this).val() 
    var text = $('tr.selected').find(".th-client").text().trim();
    
    if(innerText == text){
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



/********************************************************
*                     Row Selection Functions                            
*                                                       *
********************************************************/

function makeRowsClickable(){
   $("tbody tr").on('click',function(e){
    e.stopImmediatePropagation();
    var $this,id, btnGoNewContract,btnNewContract,btnGetDetails;
    btnGetDetails     = $("#get-details");
    btnNewContract    = $("#client-new-contract");
    btnGoNewContract  = $("#go-new-contract");

    $this = $(this);

    if($this.hasClass('selected')){
       $('tbody tr').removeClass('selected');
        btnGetDetails.attr("href","");
        btnNewContract.attr("href","");
        btnGoNewContract.attr("href","");

    }else{
      $('tbody tr').removeClass('selected');
      $this.toggleClass('selected');
 
    id = $this.find('.id_cliente').text().trim();
    

    if(btnGetDetails)btnGetDetails.attr('href',BASE_URL + 'process/details/'+ id);
    if(btnNewContract)btnNewContract.attr('href',BASE_URL + 'process/newcontract/'+ id);
    if(btnGoNewContract){
      if(btnGoNewContract.text().toLowerCase() == "ir a pagos"){
        btnGoNewContract.attr('href',BASE_URL + 'process/details/'+ id + "/pagos");
      }else{
        btnGoNewContract.attr('href',BASE_URL + 'process/newcontract/'+ id);
      }
      
    }

    contractRows($this);
    }
    
  });

}
function contractRows($this){
  var id_contrato,id_cliente;

  id_contrato = $this.find(".id_contrato").text().trim();
  id_cliente = $this.find('.th-client').attr("data-id-cliente");
  

  $("#btn-pay-view").attr('href',BASE_URL + 'process/details/'+ id_cliente + "/pagos");
  $("#btn-see-in-detail").attr('href',BASE_URL + 'process/details/'+ id_cliente);
  //btnCancelarContrato.attr('data-id-cliente',id_cliente);
  //btnEditarContrato.attr('data-id-cliente',id_cliente);

}

function makeServiceCardClickable(){
    var serviceCard = $(".service-card");
    serviceCard.on('click',function(e){
      e.stopImmediatePropagation();
      var $this = $(this);
      var payment = $this.attr('data-payment');
      serviceCard.removeClass('selected');
      $this.addClass('selected');
      
      $('#contract-client-payment').val(payment)
    })
}

/********************************************************
*                          Verify Rows                            
*                                                       *
********************************************************/
function verifyPaymentStatus(){
  $(".td-estado").each(function(i,value){
    var $this = $(this);
    var text = $this.text().trim();
    if(text == "no pagado"){
      $this.css({color:"rgba(200,0,0,.7)"})
    }else if(text == "pagado"){
      $this.parents("tr").css({background:"rgba(22,255,0,.3)",color:"#999"});
    }
  });
}

function verifyContractStatus(){
  $(".td-estado").each(function(i,value){
    var $this = $(this);
    var text = $this.text().trim();
    if(text == "activo"){
      $this.css({color:"green"})
    }else if(text == "saldado"){
      $this.parents("tr").css({background:"rgba(22,255,0,.3)",color:"#999"});
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
        html +=   '<div class="message">Creando la sección</div>'
        html += '</div>'
    $("body").append(html)
    $("body").css({overflow:"hidden"});
    var message = $(".heavy-loader .message");
    setTimeout(function(){
      message.text("Configurando Sección...")
    },4000)
    setTimeout(function(){
      message.text("Creando las nuevas ips...")
    },8000)
    setTimeout(function(){
      message.text("Terminando el proceso ...")
    },15000)
  }else{
    var loader = $(".heavy-loader");
    loader.remove();
    $("body").css({overflow:"auto"})
  }
}