$(function(){
initHandlers();

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

  $(".next-page").on('click',function(e){
    e.stopImmediatePropagation()

    var pagination = getPaginationData()
    getUsersPagination(pagination.max ,pagination.perpage);
    pagination.$maxLimit.text(pagination.max + pagination.perpage);
    pagination.$minLimit.text(pagination.min + pagination.perpage);

  });

   $(".previous-page").on('click',function(e){
    e.stopImmediatePropagation()
    var pagination = getPaginationData()
    pagination.$maxLimit.text(pagination.max - pagination.perpage);
    pagination.$minLimit.text(pagination.min - pagination.perpage);
    getUsersPagination(pagination.min - pagination.perpage,pagination.perpage);

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
    alert("LLene todos los campos por favor");
  }
} 

function getUsers(){
  var form = "table=users";
  connectAndSend('user/getusers',false,initHandlers,fillUserTable,form,null);
}

function getUsersPagination(offset,perpage){
  var form = "table=users&offset="+offset+"&perpage="+perpage;
  connectAndSend('user/getuserspagination',false,initHandlers,fillUserTable,form,null);
}

function deleteUser(id){
  var form = "user_id=" + id;
  connectAndSend('user/deleteuser',true,initHandlers,null,form,getUsers);
}

function count_users(){
  var form = "table=users";
  connectAndSend('user/countusers',false,initHandlers,updateCount,form,null);
}

});
$()




