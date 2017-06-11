$(function(){
loginHandlers();

function loginHandlers(){
  $("#send-credentials").on('click',function(e){
    e.stopImmediatePropagation();
    login();
  });

  $("#user-input").on('keydown',function(e){
    sendToLogin(e)
    
  })

  $("#password-input").on('keydown',function(e){
    sendToLogin(e)
  })
}


function login(){
  var user      = $("#user-input").val();
  var password  = $("#password-input").val();
  var is_empty  = isEmpty([user,password])
  if(!is_empty){
     var form = 'user='+user+'&password='+password;
     connectAndSend('app/login',false,false,processLoginData,form,null,loading)
  }else{
    $(".validation").text("Completa los campos");
  }
 
}

function loading(){
  $(".loader").css({display:"block"});
}

function processLoginData(response){
  if(response == true){
    window.location.href = BASE_URL + 'app/admin/';
  }else{
    $(".loader").css({display:"none"});
    $(".validation").text(response);
  }
}

function sendToLogin(e){
   e.stopImmediatePropagation();
    key = e.which
    console.log(key);
    if(key == 13){
      login();
    }
}



});