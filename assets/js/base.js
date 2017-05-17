$(function(){

getDate();
adminFunctions();
userInfoTip();
newUserForm();

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
  validateModal("#new-user-modal");
  validateModal("#update-user-modal");
}

function userInfoTip(){
  var infoTip = $(".user-info-tip");
  var profilePicture = $(".profile-picture");

  profilePicture.on('click',function(e){
    infoTip.toggleClass("visible");
  });


}

});

