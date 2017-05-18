$(function(){

getDate();
adminFunctions();
userInfoTip();
newUserForm();

function getDate(){
  var $day = $('.day');
  var $monthYear = $('.month-year');
  var $Hora = $('.hour span');
  var date,day,month,year,sHour;
  var days = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
  var months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  setInterval(updateHour,1000);

  function updateHour(){
    date = new Date();
    sDate = date.toString()
    $day.text(date.getDate());
    $monthYear.text("De " + months[date.getMonth()] + " de " + date.getFullYear());
    sHour = sDate.slice(16,22) + "<span class='seconds'>" + sDate.slice(22,24) + "</span>";
    $Hora.html(sHour);
  }
}


function adminFunctions(){
  $('#company-section').animate({left:"0"},200)
  $('.administrador .aside-buttons a').on('click',function(e){
    e.preventDefault();
    var $this = $(this);
    var cardName = $this.attr('href').slice(1);
    if(cardName != null){
      $('.company-details').animate({left:"-110%"},200)
      $('#'+cardName+'.company-details').animate({left:"0"},200)
    }  
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

