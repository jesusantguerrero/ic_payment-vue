$(function(){

var Validations = function(){};
getDate();
adminFunctions();
console.log("La base cargada")

function getDate(){
  var $Fecha = $('.date span');
  var $Hora = $('.hour span');
  var date,sDate,sHour;

  setInterval(updateHour,1000);

  function updateHour(){
    date = new Date();
    sDate = date.toString()
    $Fecha.text(sDate.slice(0,15));
    sHour = sDate.slice(16,22) + "<span class='seconds'>" + sDate.slice(22,24) + "</span>";
    $Hora.html(sHour);
  }
}


function adminFunctions(){
  $('#company-section').animate({left:"0"},200)
  $('.aside-buttons a').on('click',function(e){
    e.preventDefault();
    var $this = $(this);
    var cardName = $this.attr('href').slice(1);

    $('.company-details').animate({left:"-110%"},200)
    $('#'+cardName+'.company-details').animate({left:"0"},200)
    console.log("hola " + cardName);   
  })
}


function newUserForm(){
  var $userPassword = $('#user-password');
  var $userPasswordConfirm = $('#user-password-confirm')
  
  $userPasswordConfirm.on('blur',function(){
    validateTwo($userPassword,$userPasswordConfirm);
  });
}


function replaceClass($object,oldClass,newClass){
   $object.addClass(newClass);
   $object.removeClass(oldClass)

}

function validateTwo($firstObject,$secondObject){
    if($secondObject.val() == $firstObject.val()){
      replaceClass($firstObject.parent(),"has-error","has-success")
      replaceClass($secondObject.parent(),"has-error","has-success")
    }else{
       replaceClass($firstObject.parent(),"has-success","has-error")
       replaceClass($secondObject.parent(),"has-success","has-error")
    }
  }

$('#caller-user').on('click',function(){
  newUserForm();
});

});

