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
 * conecta al servidor via ajax y muestra el mensaje de respuesta
 * @param {string} url url to send the action, without the base url
 * @param {boolean} is_message if you want to display the message
 * @param {callback} recognizeElements function to recognise the new auto generated elements
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
 * Fill User Table: do exactly that
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
 * isEmpty: verify that any value passed as parameter is empty or null 
 * @param {Array. < string} values
 * @return {boolean}
 */
function isEmpty(values){
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
 * get Pagination Data: if the table is a paginated one this funtion return the information related with that
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
 * @constructor
 * @param {string} tableId
 * @return {void}
 */
function initPagination(tableId,serverTable,paginate){
  console.log(document.querySelector(tableId + " .next-page"));
  
  $(tableId + " .next-page").on('click',function(e){
    e.stopImmediatePropagation()

    var pagination = getPaginationData(tableId);
    if(pagination.max < pagination.total){
      paginate(pagination.max ,pagination.perpage,serverTable);
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
      paginate(pagination.min - pagination.perpage,pagination.perpage,serverTable);
    }
  });

  $(tableId + " .per-page").on('change',function(e){
    e.stopImmediatePropagation();
    var pagination = getPaginationData(tableId)
    pagination.$maxLimit.text(pagination.perpage);
    pagination.$minLimit.text(pagination.min);
    paginate(pagination.min,pagination.perpage,serverTable);

  })
}


function updateCount($content,callback){
  $(".total-rows").html($content);
}


// +-----------------------------------------------------------------------------------------------------------------------------+
// |                                                     User passwords validations                                              |
// |                                                                                                                             |
// +-----------------------------------------------------------------------------------------------------------------------------+
//


function validateModal($modalId){
  var $userPassword = $('#'+$modalId+' .password');
  var $userPasswordConfirm = $('#'+$modalId+' .password-confirm');
  var $saveButton = $('#'+ $modalId+' .save');
  
  $userPasswordConfirm.on('blur',function(){
    validateTwo($userPassword,$userPasswordConfirm,$saveButton);
  });
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

function replaceClass($object,oldClass,newClass){
   $object.addClass(newClass);
   $object.removeClass(oldClass)
}