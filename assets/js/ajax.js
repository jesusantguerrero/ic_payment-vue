$(function(){

});
$()

initHandlers();

function initHandlers(){
  $("#btn-save-user").on('click',function(e){
    e.stopPropagation();
    addNewUser();
  });

   $("#btn-update-user").on('click',function(e){
    e.stopPropagation();
    updateUser();
  });

  $(".delete-user").on('click',function(e){
    e.preventDefault();
    var $row = $(this).parents("tr");
    var id = $row.find('.user-id').text().trim()
    var is_delete = window.confirm("Está seguro de que desea Eliminar al usuario "+ $row.find("td:nth(3)").text() + "?");
    if(is_delete){
      deleteUser(id);
    }
  });

  $(".edit-user").on('click',function(e){
    e.preventDefault();
    var $row = $(this).parents("tr");
    var cell = $row.find('td');
    var inputs = $("#update-user-modal input");
    inputs.eq(0).val(cell.eq(2).text());
    inputs.eq(3).val(cell.eq(3).text());
    inputs.eq(4).val(cell.eq(4).text());
    inputs.eq(5).val(cell.eq(5).text());

    $('#update-user-modal').modal();
  })
}

/********************************************************
 *                CRUD para la tabla usuario            *
 * 
 ********************************************************/

function addNewUser(){
  
  var form,response, result, nick,password,name, lastname, dni, type,is_empty;

  nick      = $("#user-nickname").val();
  password  = $("#user-password").val();
  name      = $("#user-name").val();
  lastname  = $("#user-lastname").val();
  dni       = $("#user-dni").val();
  type      = $("#user-type").val();
  
  var is_empty = isEmpty([nick,password,name,lastname,dni,type]);
  if(!is_empty){
    form = 'nickname=' + nick + "&password=" + password+ "&name=" + name + "&lastname=" + lastname;
    form += "&dni=" + dni+ "&type=" +type;
    connectAndSend("user/addnew",true,null,form,getUsers);
  }else{
    alert("LLene todos los campos por favor");
  }



} 

function updateUser(){
  
  var form,response, result, nick,password,name, lastname, dni, type;

  nick      = $("#e-nickname").val();
  password  = $("#e-password").val();
  name      = $("#e-name").val();
  lastname  = $("#e-lastname").val();
  dni       = $("#e-dni").val();
  type      = $("#e-type").val();

  form = 'nickname=' + nick + "&password=" + password+ "&name=" + name + "&lastname=" + lastname;
  form += "&dni=" + dni+ "&type=" +type;

   connectAndSend("user/update",true,null,form,getUsers) 
} 

function getUsers(){
  var form = "table=users";
  connectAndSend('user/getusers',false,fillUserTable,form,null);
}

function deleteUser(id){
  var form = "user_id=" + id;
  connectAndSend('user/deleteuser',true,null,form,getUsers);
}






// mis funciones

function connectAndSend(url,is_message,action,form,callback){
  var ran = false
  var connect;
  connect = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    connect.onreadystatechange = function() {
        if (connect.readyState == 4 && connect.status == 200) {
            if (action != null) {
                action(connect.responseText)
            }else{
              if(is_message && !ran){
                 displayMessage(connect.responseText);
                 console.log(connect.responseText);
                 
                 ran = true;
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


function fillUserTable($content){
  var $tbodyUsers = $(".t-users-body");
  $tbodyUsers.html($content);
  initHandlers();
}

function isEmpty(values){
  for(var i = 0 ; i < values.length ; i++){
    if (values[i] == null || values[i] == ""){
      return true;
    } 
  }
  return false;
}



