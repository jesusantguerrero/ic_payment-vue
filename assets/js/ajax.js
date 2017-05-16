$(function(){
initHandlers();
initClientHandlers();

function initHandlers(){
  count_users();

  $("#btn-save-user").on('click',function(e){
    e.stopImmediatePropagation();
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
  });

    new initPagination("#t-users","users",paginate);
}

function initClientHandlers(){
  $("#btn-save-client").on('click',function(){
    addNewClient();
  })
}


/********************************************************
 *                CRUD para la tabla usuarios           *
 *                                                      *
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
    connectAndSend("user/addnew",true,initHandlers,null,form,getUsers);
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
  
  var is_empty = isEmpty([nick,password,name,lastname,dni,type]);
  if(!is_empty){
    form = 'nickname=' + nick + "&password=" + password+ "&name=" + name + "&lastname=" + lastname;
    form += "&dni=" + dni+ "&type=" +type;
    connectAndSend("user/update",true,initHandlers,null,form,getUsers) 
  }else{

    alert("LLene todos los campos por favor " + count);
  }
} 

function getUsers(){
  var form = "table=users";
  connectAndSend('user/getusers',false,initHandlers,fillUserTable,form,null);
}

function deleteUser(id){
  var form = "user_id=" + id;
  connectAndSend('user/deleteuser',true,initHandlers,null,form,getUsers);
}

function count_users(){
  var form = "table=users";
  connectAndSend('user/countusers',false,initHandlers,updateCount,form,null);
}

function paginate(offset,perpage,tableName){
  var form = "table="+ tableName +"&offset="+offset+"&perpage="+perpage;
  connectAndSend('user/paginate',false,initHandlers,fillUserTable,form,null);
}

/********************************************************
 *                CRUD para la tabla Clientes           *
 *                                                      *
 ********************************************************/
function addNewClient(){
  
  var form,response, result, nombres,apellidos,cedula,celular,provincia,sector,calle,casa,telefono,
      lugarTrabajo,telTrabajo,ingresos,fechaRegistro,estado;

  nombres        = $("#client-name").val();
  apellidos      = $("#client-lastname").val();
  cedula         = $("#client-dni").val();
  celular        = $("#client-phone").val();
  provincia      = $("#client-provincia").val();
  sector         = $("#client-sector").val();
  calle          = $("#client-street").val();
  casa           = $('#client-house').val();
  telefono       = $('#client-telephone').val();
  lugarTrabajo  = $('#client-job').val();
  telTrabajo    = $('#client-job-telephone').val();
  ingresos       = $('#client-salary').val();
  fechaRegistro = getNow();
  estado = "no activo";

  var is_empty = isEmpty([nombres,apellidos,cedula,celular,provincia,sector,calle,casa,telefono]);
  if(!is_empty){   
    form = 'nombres=' + nombres + "&apellidos=" + apellidos + "&cedula=" + cedula + "&celular=" + celular;
    form += "&provincia=" + provincia + "&sector=" + sector + "&calle=" + calle + "&casa=" + casa + "&telefono=" + telefono;
    form += "&lugar_trabajo=" + lugarTrabajo + "&tel_trabajo"+ telTrabajo + "&ingresos=" + ingresos + "&fecha_registro=" + fechaRegistro;
    form += "&estado=" + estado +"&tabla=clientes";
    
    connectAndSend("process/add",true,initClientHandlers,null,form,getUsers);

  }else{
    alert("LLene los campos requeridos por favor");
  }
} 

$()

});






