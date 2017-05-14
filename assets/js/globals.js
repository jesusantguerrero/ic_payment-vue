/**
 * IC Payment globals
 * 
 * @author Jesus Guerrero Alvarez
 * 13 mayo de 2017
 * 
 */

BASE_URL = "localhost/ic/"
/**
 * connectAndSend
 * conecta al servidor
 */

function connectAndSend(url,is_message,inithandlers,action,form,callback){
  var connect;
  connect = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    connect.onreadystatechange = function() {
        if (connect.readyState == 4 && connect.status == 200) {
            if (action != null) {
                action(connect.responseText,inithandlers);
            }else{
              if(is_message){
                 displayMessage(connect.responseText);
                 if(callback != null)callback();           
              }
               
            }
        } else if (connect.readyState != 4) {

        }
    }
    connect.open("POST",'http://localhost/ic/' + url, true);
    connect.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    connect.send(form);
}
/**
 * Display Message
 * Muestra una notificacion del resultado de la consulta
 */
function displayMessage(message){
  var error = "&#10006;";
  var success= "&#10004;";
  var color = "#02ff20";
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


function fillUserTable($content,callback){
  var $tbodyUsers = $(".t-users-body");
  $tbodyUsers.html($content);
  callback();
}

function isEmpty(values){
  for(var i = 0 ; i < values.length ; i++){
    if (values[i] == null || values[i] == ""){
      return true;
    } 
  }
  return false;
}

function getPaginationData(){
  var perpage = $("#per-page").val();
  var $maxLimit = $(".max-limit");
  var $minLimit = $(".min-limit");
  var previous = Number($minLimit.text());
  var next = Number($maxLimit.text());
  var min = previous;
  var max = next;
  perpage = Number(perpage);
  next = next + perpage;
  previous = previous + perpage;

  return {"perpage":perpage,"min":min,"max":max,"previous":previous,"next":next,"$maxLimit":$maxLimit,"$minLimit":$minLimit}
}

function updateCount($content,callback){
  $(".total-rows").html($content);
}

// Validaciones pata la ventana de usuario


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