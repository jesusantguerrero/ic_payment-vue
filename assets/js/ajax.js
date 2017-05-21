$(function(){

var currentPage = $("title").text().split(" ");
currentPage = currentPage[4].toLowerCase().trim();

switch (currentPage) {
  case "home":
    initClientHandlers();
    break;
  case "administrador":
    initHandlers();
    break;
  case "clientes":
    initClientHandlers();
    break;
  case "servicios":
    initServicesHandlers();
    break;
  case "nuevo_contrato":
    initContractHandlers();
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
        deleteRow(id,"clientes");
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

  $("#delete-service").on('click',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var $row = $("tr.selected");
    if($row){
      var id = $row.find('.id_servicio').text().trim();
      var is_delete = window.confirm("Está seguro de que desea Eliminar al(la) Cliente " + $row.find("td:nth(2)").text()+ " "+ $row.find("td:nth(3)").text() + "?");
      if(is_delete){
        deleteRow(id,"servicios");
      }
    }
    
  });

  $("#edit-service").on('click',function(e){
    e.preventDefault();
    var $row = $("tr.selected");
    var cells = $row.find('td');
    var inputs = $("#update-service-modal input");
    $('#u-service-id').val(cells.eq(1).text());
    $('#u-service-name').val(cells.eq(2).text());
    $('#u-service-description').val(cells.eq(3).text());
    $('#u-service-monthly-payment').val(Number(cells.eq(4).text().slice(3)));
    $('#u-service-type').val(cells.eq(5).text());

    $('#update-service-modal').modal();
  });

  $("#btn-update-service").on('click',function(e){
    e.stopImmediatePropagation();
    updateService();
  });

}

function initContractHandlers(){

  $("#btn-save-contract").on('click',function(e){
    e.stopImmediatePropagation();
    addNewContract();
  });
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

/********************************************************
 *                Delete General                        *
 *                                                      *
 ********************************************************/

function deleteRow(id,tabla){
  var form = "tabla="+tabla+"&id=" + id;
  var handlers,callback;
  switch (tabla) {
    case 'clientes':
      handlers = initClientHandlers;
      callback = getClients;
      break;
    case 'servicios':
      handlers = initServicesHandlers;
      callback = getServices;
      break;
  
    default:
      break;
  } 
  connectAndSend('process/delete',true,handlers,null,form,callback);
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

function updateService(){
  
  var form, id,name, description, payment, type;

  id = $('#u-service-id').val();
  name = $('#u-service-name').val();
  description = $('#u-service-description').val();
  payment = $('#u-service-monthly-payment').val();
  type = $('#u-service-type').val();
  
  var is_empty = isEmpty([id,name,description,payment,type]);
  if(!is_empty){
    form = 'id_servicio=' + id + "&nombre=" + name+ "&descripcion=" + description + "&mensualidad=" + payment;
    form += "&tipo=" +type + "&tabla=servicios";
    connectAndSend("process/update",true,initServicesHandlers,null,form,getServices); 
  }else{
    alert("LLene todos los campos por favor ");
  }
}

/********************************************************
 *                CRUD para la tabla Contratos          *
 *                                                      *
 ********************************************************/

function addNewContract(){
  var form, table,client_id, user_id,service_id, contract_date ,payment, duration, observations,total,nextPayment;

  client_id = $("#contract-client-id").val();
  user_id = $("#contract-user-id").val();
  service_id = $(".service-card.selected").attr('data-id');
  contract_date = $('#contract-client-date').val();
  duration = $('#contract-client-months').val();
  observations = $('#contract-observations').val();
  payment = $("#contract-client-payment").val();
  nextPayment = moment(contract_date).add(1,'months').format('YYYY-MM-DD');
  


  var is_empty = isEmpty([client_id, user_id, service_id, contract_date, duration]);
  if(!is_empty){   
    total = Number(duration) * Number(payment);
    form  = 'id_empleado=' + user_id + "&id_cliente=" + client_id + "&id_servicio=" + service_id + "&fecha=" + contract_date;
    form += "&duracion=" + duration + "&observaciones=" + observations + "&monto_total=" + total + "&monto_pagado=0&ultimo_pago=null";
    form += "&proximo_pago="+nextPayment+"&estado=activo&tabla=contratos";   
    connectAndSend("process/add",true,initClientHandlers,null,form,null); 
    
  }else{
    alert("LLene los campos requeridos por favor");
  }
}


});






