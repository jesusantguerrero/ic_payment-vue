/**
 * IC Payment globals
 * 
 * @author Jesus Guerrero Alvarez
 * 13 mayo de 2017
 * 
 */

const BASE_URL = 'http://localhost/ic/'

/**
 * Connect And Send
 * Conecta al servidor via ajax y muestra el mensaje de respuesta
 * @param {string} url Url a donde se va a mandar la el formulario, sin la base_url
 * @param {boolean} is_message Si se espera un mensaje o no como respuesta 
 * @param {callback} recognizeElements Funcion para reconocer los elementos autogenerados
 * @param {?callback} action if you dont want a message you receive a table with that you put this table somewhere(can be null)
 * @param {string} form data of the form to be send to the server
 * @param {callback} callback function to be executed after al this maybe getusers()
 * @return {void}
 */

function connectAndSend(url,is_message,recognizeElements,action,form,callback){
  var connect;
  connect = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    connect.onreadystatechange = function() {
        if (connect.readyState == 4 && connect.status == 200) {
            if (action != null) {
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
  var error = "&#10006;";
  var success= "&#10004;";
  var color = "#08ff20";
  var toast,span;

  if(message.includes(error)){
    color = "#ff0330"
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
 * Llena la tabla de usuarios con los datos que vienen del servidor
 * @param {string} $content the html data to be displayed it comes always from an server response
 * @param {function} callback the callback to recognize the new items
 * @return {void}
 */
function fillUserTable($content,callback){
  var $tbodyUsers = $(".t-users-body");
  $tbodyUsers.html($content);
  callback();
}

/**
 * Llena la tabla de clientes con los datos que vienen del servidor
 * @param {string} $content the html data to be displayed it comes always from an server response
 * @param {function} callback the callback to recognize the new items
 * @return {void}
 */
function fillClientsTable($content,callback){
  var $tbodyUsers = $(".t-clients tbody");
  $tbodyUsers.html($content);
  callback();
}

/**
 * isEmpty
 * Verifica si los valores dados estan vacios o son nulos 
 * @param {Array. < string} values
 * @return {boolean}
 */
function isEmpty(values){
  for(var i = 0 ; i < values.length ; i++){
    if (values[i] == null || values[i] == ""){
      console.log(values[i] + "is empty");
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
 * get Pagination Data: if the table is a paginated one this function return the information related with that
 * retorna los datos de paginacion colocados al pie de la tabla
 * @param {string} tableId 
 * @return {{perpage: number,$maxLimit: HTMLElement,$minLimit: HTMLElement,previous:number,next:number,min:number,max: number,total:number}}
 * 
 */
function getPaginationData(tableId){
  var perpage = $(tableId + " .per-page").val();
  var $maxLimit = $(tableId + " .max-limit");
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

  return {"perpage":perpage,"min":min,"max":max,"previous":previous,"next":next,"$maxLimit":$maxLimit,"$minLimit":$minLimit, "total":total}
}

/**
 * init Pagination: make a table paginatable
 * mi metodo de paginacion propio habilita las funciones next, y previous
 * @constructor
 * @param {string} tableId Id de la <table> de la vista
 * @param {string} serverTable Tabla de la base de datos a paginar
 * @param {function} paginate La funcion paginate como parametro
 * @param {string} fillTableFunction La funcion correspondiente que llena la <table> de la vista
 * @return {void}
 */
function initPagination(tableId,serverTable,paginate,fillTableFunction){
  $(tableId + " .next-page").on('click',function(e){
    e.stopImmediatePropagation()

    var pagination = getPaginationData(tableId);
    if(pagination.max < pagination.total){
      paginate(pagination.max ,pagination.perpage,serverTable,fillTableFunction);
      pagination.$maxLimit.text(pagination.max + pagination.perpage);
      pagination.$minLimit.text(pagination.min + pagination.perpage);
    }
    

  });

  $(tableId + " .previous-page").on('click',function(e){
    e.stopImmediatePropagation()
    var pagination = getPaginationData(tableId);
    if(pagination.min != 1){
      pagination.$maxLimit.text(pagination.max - pagination.perpage);
      pagination.$minLimit.text(pagination.min - pagination.perpage);
      paginate(pagination.min - pagination.perpage,pagination.perpage,serverTable,fillTableFunction);
    }
  });

  $(tableId + " .per-page").on('change',function(e){
    e.stopImmediatePropagation();
    var pagination = getPaginationData(tableId)
    pagination.$maxLimit.text(pagination.perpage);
    pagination.$minLimit.text(pagination.min);
    paginate(pagination.min,pagination.perpage,serverTable,fillTableFunction);

  })
}


function updateCount($content){
  $("t-users .total-rows").html($content);
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


