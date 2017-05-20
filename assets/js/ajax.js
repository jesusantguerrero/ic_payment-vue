$(function(){

var currentPage = $("title").text().split(" ");
currentPage = currentPage[4].toLowerCase().trim();
console.log(currentPage);

switch (currentPage) {
  case "administrador":
    initHandlers();
    console.log('administrador iniciado');
    
    break;
  case "clientes":
    initClientHandlers();
    console.log('clientes iniciados');
    break;
  case "servicios":
    initServicesHandlers();
    console.log('servicios iniciasdos');
    break;
  default:
    break;
}


function initHandlers(){
  count_table("users");

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

    initPagination("#t-users","users",paginate);
}

function initClientHandlers(){
  count_table("clientes");

  $("#btn-save-client").on('click',function(e){
    e.stopImmediatePropagation();
    addNewClient();
  });

  initPagination("#t-clients","clientes",paginate);

  makeRowsClickable();

  $("td").each(function(i,value){
    var $this = $(this);
    var text = $this.text().trim();
    if(text == "no activo"){
      $this.css({color:"rgba(200,0,0,.7)"})
    }else if(text == "activo"){
      $this.css({color:"green"});
    }
  })

  $("#client-searcher").on('keyup',function(e){
    e.stopImmediatePropagation();
    searchClient();
  });

  $("#delete-client").on('click',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var $row = $("tr.selected");
    if($row){
      var id = $row.find('.id_cliente').text().trim();
      var is_delete = window.confirm("Está seguro de que desea Eliminar al(la) Cliente " + $row.find("td:nth(2)").text()+ " "+ $row.find("td:nth(3)").text() + "?");
      if(is_delete){
        deleteClient(id);
      }
    }
    
  });

}

function initServicesHandlers(){
  count_table("servicios");
   
  $("#btn-save-service").on('click',function(e){
    e.stopImmediatePropagation();
    addNewService();
  });

  makeRowsClickable();

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
  connectAndSend('user/getusers',false,initHandlers,fillCurrentTable,form,null);
}

function deleteUser(id){
  var form = "user_id=" + id;
  connectAndSend('user/deleteuser',true,initHandlers,null,form,getUsers);
}

function count_table(table){
  var form = "tabla=" + table;
  connectAndSend('process/count',false,null,updateCount,form,null);
}

function paginate(offset,perpage,tableName){
  path = "user/";
  if(tableName != "user"){
    path = "process/";
  }
  var form = "table="+ tableName +"&offset="+offset+"&perpage="+perpage;
  connectAndSend(path+'paginate',false,initHandlers,fillCurrentTable,form,null);
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
    
    connectAndSend("process/add",true,initClientHandlers,null,form,getClients);

  }else{
    alert("LLene los campos requeridos por favor");
  }
} 

function getClients(){
  var form = "tabla=clientes";
  connectAndSend('process/getall',false,initClientHandlers,fillCurrentTable,form,null);
}

function searchClient(){
  var word = $("#client-searcher").val()
  if (word != null || word != ""){
    var form = "tabla=clientes&word="+word;
    connectAndSend('process/search',false,initClientHandlers,fillCurrentTable,form,null);
  }
  
}

function deleteClient(id){
  var form = "tabla=clientes&id=" + id;
  connectAndSend('process/delete',true,initClientHandlers,null,form,getClients);
};


/********************************************************
 *                CRUD para la tabla Servicios          *
 *                                                      *
 ********************************************************/

function addNewService(){
  
  var form, name,description, payment, type;

  name         = $("#service-name").val();
  description  = $("#service-description").val();
  payment      = $("#service-monthly-payment").val();
  type         = $("#service-type").val();
  
  var is_empty = isEmpty([name,description,payment,type]);
  if(!is_empty){
    form = 'nombre=' + name + "&descripcion=" + description + "&mensualidad=" + payment + "&tipo=" + type;
    form += "&tabla=servicios";
    connectAndSend("process/add",true,initServicesHandlers,null,form,getServices);
  }else{
    alert("LLene todos los campos por favor");
  }
}

function getServices(){
  var form = "tabla=servicios";
  connectAndSend('process/getall',false,initServicesHandlers,fillCurrentTable,form,null);
} 


});






