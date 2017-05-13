$("#btn-save-user").on('click',addNewUser);







/********************************************************
 *                CRUD para la tabla usuario            *
 * 
 ********************************************************/

function addNewUser(){
  console.log('hola estoy agregando al usuario');
  
  var form,response, result, nick,password,name, lastname, dni, type;

  nick      = $("#user-nickname").val();
  password  = $("#user-password").val();
  name      = $("#user-name").val();
  lastname  = $("#user-lastname").val();
  dni       = $("#user-dni").val();
  type      = $("#user-type").val();

  form = 'nickname=' + nick + "&password=" + password+ "&name=" + name + "&lastname=" + lastname;
  form += "&dni=" + dni+ "&type=" +type;

   connectAndSend("user/addnew",true,null,form)
  
} 



function connectAndSend(url,is_message,urlOnFail,form){
  var connect;
  connect = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    connect.onreadystatechange = function() {
        if (connect.readyState == 4 && connect.status == 200) {
            if (connect.responseText == true) {
              if(urlOnFail != null){
                window.location.href = BASE_URL + urlOnFail;
              }
               alert("Esto es genial y tenemos texto!!");
              
            }else{
              if(is_message){
                 displayMessage(connect.responseText);
                
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
  var toast = $(".toast")
  toast.find("span").text(message);
  toast.css({display:"flex"});
  toast.animate({opacity:"1"},500,function(){
    setTimeout(function() {
      toast.animate({opacity:"0"});
      toast.css({display:"none"});
    }, 2000);
  });
  
}