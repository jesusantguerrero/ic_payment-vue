$(function(){
var currentPage = $("title").text().split(" ");
currentPage = currentPage[4].toLowerCase().trim();
var ran = false;

switch (currentPage) {
  case "home":
    initClientHandlers();
    console.log('Clientes handlers');
    
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
  case "detalles":
    initPaymentsHandlers();
    detailHandlers();
    verifyContractStatus();
    break;
  case "contratos":
    initContractHandlers();
    initClientHandlers();
    verifyContractStatus();
    break;
  default:
    break;
}
//***************************************************  Init Admin Handlers       ***************************** */
function initAdminHandlers(){
  $("#btn-see-deudores").on('click',function(){
    changeNotification("Lista De Deudores","money_off");
    getPendents();
  });

  $("#next-payment-select").on('change',function(){
    changeNotification("Proximos Pagos","notifications_active");
    var expression = $(this).val();
    getNextPayments(expression);
  });


  function changeNotification(title,icon){
    var $detailsCard = $(".details-card");
    var $title = $detailsCard.find('.card-title');
    var $placeImage = $detailsCard.find(".placeholder-icon");
    var htmlText = "<i class='material-icons icon-placeholder'>"+icon+"</i>";

    $title.text(title);
    $placeImage.html(htmlText);
  }
}
//***************************************************     Init Handlers          ***************************** */
function initHandlers(){
  initPagination("#t-users","users",paginate);

  $("#btn-save-user").on('click',function(e){
    e.stopImmediatePropagation();
    addNewUser();
  });

  $("#btn-update-user").on('click',function(e){
    e.stopImmediatePropagation();
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
    $("#e-nickname").val(cell.eq(2).text());
    $("#e-name").val(cell.eq(3).text());
    $("#e-lastname").val(cell.eq(4).text());
    $("#e-dni").val(cell.eq(5).text());

    $('#update-user-modal').modal();
  });

  $("#update-company-data").on('click',function(e){
    e.stopImmediatePropagation();
    updateCompanyData();
  });
 
}
//***************************************************  Init client Handlers      ***************************** */
function initClientHandlers(){
  count_table("clientes");
  initAdminHandlers()

  $("#btn-save-client").on('click',function(e){
    e.stopImmediatePropagation();
    addNewClient();
  });

  $("#update-client").on('click',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var $row = $("tr.selected");
    if($row){
      var id = $row.find('.id_cliente').text().trim();
      getClient(id);
    }
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
  });

  $("#client-searcher").on('keyup',function(e){
    e.stopImmediatePropagation();
    var text = $(this).val();
    search(text,"clientes",fillCurrentTable); 
  });
  
  $("#client-searcher-newcontract").on('keyup',function(e){
    e.stopImmediatePropagation();
    var text = $(this).val();
    if(!isEmpty([text])){
      search(text,"clientes",fillClientTable);
    }else{
      clearTbody(".lobby-results");
    }
    
    
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
//***************************************************  Init Services Handlers    ***************************** */
function initServicesHandlers(){
  count_table("servicios");
  initPagination("#t-services","servicios",paginate);
   
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
//***************************************************  Init Contract Handlers    ***************************** */
function initContractHandlers(){
  initPagination("#t-contracts","v_contratos",paginate);

  $("#btn-save-contract").on('click',function(e){
    e.stopImmediatePropagation();
    addNewContract();
  });

  $("#btn-add-extra").on('click',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    callExtra();
  });

  $("#contract-searcher").on('keyup',function(e){
    e.stopImmediatePropagation();
    var text = $(this).val();
    search(text,"v_contratos",fillCurrentTable); 
  });

  $("#btn-cancel-contract").on('click',function(e){
    e.preventDefault();
    var $row = $("tr.selected");
    var cells = $row.find("td");

    if($row != undefined){
      $(".cancel-name").text(cells.eq(1).text());
      var $inputElement = $(".confirmed-data");
      var $buttonToActive = $("#cancel-permanently");
      var text = $row.find(".th-client").text().trim();
      var contractId = $row.find(".id_contrato").text().trim();
      var clientId = $row.find(".th-client").attr("data-id-cliente");
      deleteValidation($inputElement,text,$buttonToActive);

      $("#cancel-contract-modal").modal();
      $buttonToActive.on('click',function(){
        cancelContract(contractId,clientId);
      })
    }
    
  });
}
//***************************************************  Init Payments  Handlers   ***************************** */
function initPaymentsHandlers(){

  if(!ran){
    getPayments();
    ran = true;
  }
  
  verifyPaymentStatus();
  count_table("pagos_por_contratos");
  initPagination('#t-pagos','pagos_por_contrato',paginate);

  $("#btn-pay").on('click',function(e){
    e.stopImmediatePropagation();
    var $row = $("tr.selected");
    if($row){
      var id = $row.find('.id_pago').attr("data-id").trim();
      updatePayment(id);  
    }
    
  });

  $("#select-contract").on('change',function(e){
    e.stopImmediatePropagation();
    getPayments();
  });

  makeRowsClickable();
  
}
//***************************************************      detail Handlers       ***************************** */
function detailHandlers(){
  $("#btn-save-observations").on('click',function(e){
    e.stopImmediatePropagation();
    saveObservations()
  })

  $(".abono-value").on('click',function(e){
    e.stopImmediatePropagation();
    saveObservations(true);
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
  name      = $("#e-name").val();
  lastname  = $("#e-lastname").val();
  dni       = $("#e-dni").val();
  type      = $("#e-type").val();
  
  var is_empty = isEmpty([nick,name,lastname,dni,type]);
  if(!is_empty){
    form = 'nickname=' + nick + "&name=" + name + "&lastname=" + lastname;
    form += "&dni=" + dni+ "&type=" +type;
    connectAndSend("user/update",true,initHandlers,null,form,getUsers) 
  }else{

    alert("LLene todos los campos por favor");
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

// ******************* Company Crud *************************

function updateCompanyData(){
  
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
    form += "&lugar_trabajo=" + lugarTrabajo + "&tel_trabajo="+ telTrabajo + "&ingresos=" + ingresos + "&fecha_registro=" + fechaRegistro;
    form += "&estado=" + estado +"&tabla=clientes";
    
    connectAndSend("process/add",true,initClientHandlers,null,form,getClientsLastPage);

  }else{
    alert("LLene los campos requeridos por favor");
  }
} 

function getClients(){
  var form = "tabla=clientes";
  connectAndSend('process/getall',false,initClientHandlers,fillCurrentTable,form,null);
}

function getClientsLastPage(){
  var form = "tabla=clientes";
  connectAndSend('process/lastpage',false,initClientHandlers,fillCurrentTable,form,null); 
}

/**
 * Search manda un mensaje al servidor de los valores a buscar
 * @param {string} text el valor a ser buscado
 * @param {string} dbTable nombre de la tabla donde se desea consultar en la base de datos
 * @param {function} fillTableFunction funcion de llenado de tabla donde se mostraran los resultados 
 */
function search(text,dbTable,fillTableFunction){
  if(fillTableFunction == undefined) fillTableFunction = fillCurrentTable;
  var word = text;
  if (word != null || word != ""){
    var form = "tabla="+dbTable+"&word="+word;   
    connectAndSend('process/search',false,initClientHandlers,fillTableFunction,form,null);
  }
}

function getClient(id){
  form="tabla=clientes&id=" + id;
  connectAndSend("process/getone",false,initClientHandlers,recieveClient,form,null)
}

function recieveClient(content){
  var client = $.parseXML(content);
  var client = $(client);
  var id = client.find("id").text();
  var $nombres        = $("#u-client-name");
  var $apellidos      = $("#u-client-lastname");
  var $cedula         = $("#u-client-dni");
  var $celular        = $("#u-client-phone");
  var $provincia      = $("#u-client-provincia");
  var $sector         = $("#u-client-sector");
  var $calle          = $("#u-client-street");
  var $casa           = $('#u-client-house');
  var $telefono       = $('#u-client-telephone');
  var $lugarTrabajo   = $('#u-client-job');
  var $telTrabajo     = $('#u-client-job-telephone');
  var $ingresos       = $('#u-client-salary');

  $nombres.val(client.find("name").text());      
  $apellidos.val(client.find("lastname").text())     
  $cedula.val(client.find("dni").text())         
  $celular.val(client.find("cellphone").text())       
  $provincia.val(client.find("province").text())      
  $sector.val(client.find("sector").text())         
  $calle.val(client.find("street").text())          
  $casa.val(client.find("house").text())           
  $telefono.val(client.find("telephone").text())       
  $lugarTrabajo.val(client.find("job").text())  
  $telTrabajo.val(client.find("jobphone").text())     
  $ingresos.val(client.find("salary").text())

  $("#update-client-modal").modal();    

  $("#btn-update-client").on('click',function(){
    updateClient();
  });

  function updateClient(){
    var is_empty = isEmpty([$nombres.val(),$apellidos.val(),$cedula.val(),$celular.val(),$provincia.val(),$sector.val(),$calle.val(),
                    $casa.val(),$telefono.val()]);
    if(!is_empty){   
      form  = 'id='+ id + '&nombres=' + $nombres.val() + "&apellidos=" + $apellidos.val() + "&cedula=" + $cedula.val();
      form += "&celular=" + $celular.val() + "&provincia=" + $provincia.val() + "&sector=" + $sector.val() + "&calle=" + $calle.val();
      form += "&casa=" + $casa.val() + "&telefono=" + $telefono.val() + "&lugar_trabajo=" + $lugarTrabajo.val() +"&tel_trabajo =";
      form += "&ingresos=" + $ingresos.val();
      form += $telTrabajo.val()+"&tabla=clientes";
    
      connectAndSend("process/update",true,initClientHandlers,null,form,getClients);

    }else{
      alert("LLene los campos requeridos por favor");
    }
  } 
}

function saveObservations(abonoWatched){
  var form, observations,abono,idCliente,$inputAbono,abonoValue;

  observations = $("#text-observations").val();
  $inputAbono = $("#input-abono"); 
  abono = (abonoWatched) ? 0 : $inputAbono.val();
  idCliente = $("#detail-client-id").val();
  abonoValue = $(".abono-value");

   if(abonoWatched != undefined){
    $inputAbono.val(abono);
    $(".abono-box").removeClass("have-abono");
    abonoWatched = 1;
  }else{
    $inputAbono.attr("disabled");
    $(".abono-box").addClass("have-abono");
    abonoWatched = 0;
  }

  form = 'observaciones=' + observations+ "&abonos=" + abono +"&id_cliente="+idCliente +"&modo=" + abonoWatched;
  form += "&tabla=observaciones";
  connectAndSend("process/update",true,initPaymentsHandlers,null,form,null) 
  

  abonoValue.find("input").val("RD$ " + CurrencyFormat(abono));
}

/********************************************************
 *                 Ajax Generales                       *
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

function paginate(offset,perpage,tableName){
  var path = "user/";
  var handlers;
  if(tableName != "users"){
    path = "process/";
  }
  
  switch (tableName) {
    case "users":
      handlers = initHandlers;
      break;
    case "clientes":
      handlers = initClientHandlers;
      break;
    case "servicios":
      handlers = initServicesHandlers;
      break;
    case "v_contratos":
      handlers = initContractHandlers;
      break;
    case "pagos_por_contrato":
      handlers = initPaymentsHandlers;
    
      
      break;
    default:
      break;
  }
  var form = "table="+ tableName +"&offset="+offset+"&perpage="+perpage;
  connectAndSend(path+'paginate',false,handlers,fillCurrentTable,form,null);
}


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
  var form, table,client_id, user_id,service_id, contract_date ,payment, duration,equipment,eMac,router,rMac,total,nextPayment;

  client_id = $("#contract-client-id").val();
  user_id = $("#contract-user-id").val();
  service_id = $(".service-card.selected").attr('data-id');
  contract_date = $('#contract-client-date').val();
  duration = $('#contract-client-months').val();
  equipment = $('#contract-equipment').val();
  eMac = $('#contract-e-mac').val();
  router= $('#contract-router').val();
  rMac= $('#contract-r-mac').val();  

  payment = $("#contract-client-payment").val();
  nextPayment = moment(contract_date).add(1,'months').format('YYYY-MM-DD');

  var is_empty = isEmpty([client_id, user_id, service_id, contract_date, duration]);
  if(!is_empty){   
    total = (Number(duration) + 1) * Number(payment);
    form  = 'id_empleado=' + user_id + "&id_cliente=" + client_id + "&id_servicio=" + service_id + "&fecha=" + contract_date;
    form += "&duracion=" + duration + "&monto_total=" + total + "&monto_pagado=0&ultimo_pago=null";
    form += "&mensualidad="+ payment+ "&proximo_pago="+nextPayment+"&estado=activo&tabla=contratos";
    form += "&nombre_equipo="+ equipment + "&mac_equipo=" + eMac + "&router=" + router + "&mac_router=" + rMac;   
    connectAndSend("process/add",true,initClientHandlers,null,form,null);    
  }else{
    alert("LLene los campos requeridos por favor");
  }
}

function extendContract(idContrato){
  var form;
  form  = 'id_contrato=' + idContrator;   
  connectAndSend("process/extend",true,initContractHandlers,null,form,null);    
}

function getLastContract(){
  form = "toget=lastcontract"
  connectAndSend("process/getId",false,initContractHandlers,contractSaved,null);  
}

function contractSaved(id){
  $("#btn-save-contract").attr("disabled","");
  $("#btn-print-contract").removeAttr("disabled");
  $("#btn-print-contract").attr("href","");
  alert(id)
}

function callExtra(){
  var $row = $("tr.selected");
  if($row != undefined){
    var cells = $row.find('td');
   
    $("#extra-client-contract").val(cells.eq(0).text());
    $("#extra-client-name").val(cells.eq(1).text());
    $("#extra-contract-service").val(cells.eq(3).text());
    $("#extra-").val(cells.eq(5).text());
    $('#add-extra-modal').modal();
  }else{
    alert("Seleccione el contrato primero")
  }
  

}

function cancelContract(contractId,clientId){
  var form,fecha;

  fecha = moment().format("YYYY-MM-DD");
  
  form = 'id_contrato=' + contractId + '&fecha=' + fecha + '&id_cliente=' + clientId;
  connectAndSend('process/cancel',true,null,null,form,null)
}

/********************************************************
 *                CRUD para la tabla Pago               *
 *                                                      *
 ********************************************************/

function getPayments(){
  var id = $("#select-contract").val();
  if(id != null ){
    var form = "tabla=pagos&id=" + id;
  connectAndSend('process/getall',false,initPaymentsHandlers,fillCurrentTable,form,null);
  }  
}

function getPaymentsLastPage(){
  var form = "tabla=pagos";
  connectAndSend('process/lastpage',false,initPaymentsHandlers,fillCurrentTable,form,null); 
}


function updatePayment(id){
  var abono = $("#input-abono").val();
  if(abono == 0){
     var date = moment().format("YYYY-MM-DD");
    var id_contrato = $("#select-contract").val();
    var form = "tabla=pagos&id=" + id + "&estado=pagado&fecha_pago="+ date + "&id_contrato="+ id_contrato;
    console.log(form)
    var handlers,callback; 
    connectAndSend('process/update',true,initPaymentsHandlers,null,form,getPaymentsLastPage);
  }else{
    alert("has click en la zona roja de abono para confirmar que le viste antes de registrar el pago");
  }
 
};

/********************************************************
*                          Home Getters                            
*                                                       *
********************************************************/
// function getNextPayments(expression){
//     console.log(expression);
//     expression = expression.split(" ");
//     console.log(expression);
//     var variable = " hola"
    
//   var form = "tabla=v_proximos_pagos&expression=" + expression[0] + "&unit=" + expression[1];
//   connectAndSend('process/getall',false,null,fillPaymentsList,form,null);
// }

// function getPendents(expression){

    
//   var form = "tabla=v_pagos_pendientes";
//   connectAndSend('process/getall',false,null,fillPaymentsList,form,null);
// }
});








