/**
 * IC Payment globals
 * 
 * @author Jesus Guerrero Alvarez
 * 13 mayo de 2017
 * 
 */

const BASE_URL = 'http://localhost/ic/'
const MESSAGE_SUCCESS = '<i class="material-icons">done_all</i>'
const MESSAGE_ERROR = '<i class="material-icons">error_outline</i>'
const MESSAGE_INFO = '<i class="material-icons">info_outline</i>'



/**
 * Connect And Send
 * Conecta al servidor via ajax y muestra el mensaje de respuesta
 * @param {string} url Url a donde se va a mandar la el formulario, sin la base_url
 * @param {boolean} is_message Si se espera un mensaje o no como respuesta 
 * @param {callback} recognizeElements Funcion para reconocer los elementos autogenerados
 * @param {?callback} action callback que recibe los datos desde el servidor para hacer algo con ellos
 * @param {string} form formulario a ser enviado al servidor
 * @param {callback} callback funcion a ser ejecutada despues que todo se cumpla, como get users
 * @return {void}
 */

function connectAndSend(url,is_message,recognizeElements,action,form,callback){
  var connect = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
   var contador = 0;
   
    connect.onreadystatechange = function() {
        if (connect.readyState == 4 && connect.status == 200) {
            if (action != null)  {
                action(connect.responseText,recognizeElements);
            }else{
              if(is_message){
                 displayMessage(connect.responseText);
                 if(callback != null)callback();           
              }              
            }
        } else if (connect.readyState != 4) {

        }
    }
    connect.open("POST",BASE_URL + url, true);
    connect.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    connect.send(form);
}

/**
 * Display Message
 * Muestra una notificacion del resultado de la consulta
 * @param {string} message string to be displayed 
 * @return {void}
 */

function displayMessage(message){
  var color = "#08ff20";
  var toast,span;

  if(message.includes(MESSAGE_ERROR)){
    color = "#ff0330";
  }else if(message.includes(MESSAGE_INFO)){
    color = "dodgerblue";
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
}
/**
 * Llena la Lista de pagos/notificaciones con los datos que vienen del servidor
 * @param {string} $content El html con los datos a ser mostrados, vienen siempre desde el servidor
 * @param {function} callback El callback para reconocer a los nuevos items
 * @return {void}
 */

function fillPaymentsList($content,callback){
  var $tbodyUsers = $(".list-nextpayments");
  $tbodyUsers.html($content);

}

function makeContracList(response,callback){
  if(response != "nada"){
    
    var contracts = JSON.parse(response);
    var value,service,equipment,eMac,router,rMac;
    var element = "<option value=''>--Selecciona--</option>";
    var cliente = contracts.cliente;
    for (var i = 0; i < contracts.contratos.length; i++) {
      value     = contracts.contratos[i]["id_contrato"];
      service   = contracts.contratos[i]["servicio"];
      equipment = contracts.contratos[i]["nombre_equipo"];
      router    = contracts.contratos[i]["router"];
      eMac      = contracts.contratos[i]["mac_equipo"];
      rMac      = contracts.contratos[i]["mac_router"];
      element += "<option value='" + value + "' data-service='"+service+"'  data-equipment='"+equipment+"'  data-e-mac='"+eMac+"'";
      element += " data-router='"+router+"'  data-r-mac='"+rMac+"'>";
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
//
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
  let pagination = getPaginationData(tableId);
  if (pagination.total <= 5) pagination.$maxLimitVisible.text(pagination.total);
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
      paginate(pagination.min - pagination.perpage,pagination.perpage,serverTable);
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
  
  $userPasswordConfirm.on('blur',function(){
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

function clearForm(modalId){
  $(modalId + " input").val("");
}

function replaceClass($object,oldClass,newClass){
   $object.addClass(newClass);
   $object.removeClass(oldClass)
}

function deleteValidation($inputElement,$buttonToActive){
  var innerText;
  $inputElement.on("keyup",function(e){
    e.stopImmediatePropagation();
    innerText = $(this).val() 
    var text = $('tr.selected').find(".th-client").text().trim();
    console.log('texto:' + innerText + " = " + text);
    
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

function getNow(){
  var year, month,day,date,now;

  date = new Date();
  year = date.getFullYear();
  month = date.getMonth();
  day = date.getDate();

  now = year + "-" + month + "-" + day;
  return now;
}

/********************************************************
*                     Row Selection Functions                            
*                                                       *
********************************************************/

function makeRowsClickable(){
   $("tbody tr").on('click',function(e){
    e.stopImmediatePropagation();
    var $this,id, btnGoNewContract,btnNewContract,btnGetDetails;
    $this = $(this);

    $('tbody tr').removeClass('selected');
    $this.toggleClass('selected');
 
    id = $this.find('.id_cliente').text().trim();
    btnGetDetails = $("#get-details");
    btnNewContract = $("#client-new-contract");
    btnGoNewContract = $("#go-new-contract");

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
  });

}
function contractRows($this){
  var id_contrato,id_cliente;

  id_contrato = $this.find(".id_contrato").text().trim();
  id_cliente = $this.find('.th-client').attr("data-id-cliente");
  

  $("#btn-pay").attr('href',BASE_URL + 'process/details/'+ id_cliente + "/pagos");
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


