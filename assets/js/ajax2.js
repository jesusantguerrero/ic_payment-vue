$(function(){
loginHandlers();

function loginHandlers(){
  $("#send-credentials").on('click',function(e){
    e.stopImmediatePropagation();
    login();
  });

  $("#user-input").on('keydown',function(e){
    e.stopImmediatePropagation();
    sendToLogin(e)
    
  })

  $("#password-input").on('keydown',function(e){
    e.stopImmediatePropagation();
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
    swal({
      title: 'Complete los datos',
      text: 'LLene todos los campos indicados para ingresar',
      type: 'error',
    });
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
    swal({
      title: 'Credenciales Incorrectas',
      text: 'Revise los datos ingresados e intente de nuevo',
      type: 'error',
      confirmButtonClass: 'btn',
      buttonsStyling: false
    });
  }
}

function sendToLogin(e){
    key = e.which
    if(key == 13){
      login();
    }
}

$("a[href]").on('click',function(){
  loading();
  var $this = $(this);
  try{
    var target = $this.attr('target');
    setTimeout(function(){
    $(".loader").css({display:"none"});
    },3000)
  }catch(error){

  }
  
})


});