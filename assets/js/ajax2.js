$("#btn-update-settings").on('click',function(e){
  e.preventDefault();
  updateSettings();
});

/********************************************************
*                     Extra Functions                            
*                                                       *
********************************************************/

$("#extra-controls").on('click',function(){
  btnExtraPressed($(this));
});

$("#extra-client-dni").on('keydown',function(e){
  var key = e.which;
  var dni = $(this).val()
  if(key == 13){
    getContracts(dni);
  }
});

function btnExtraPressed($this){
  var buttonId = $this.text().trim().toLowerCase();
  console.log(buttonId);
  
  switch (buttonId) {
    case "mejorar":
        upgradeContract();
      break;
  
    default:
      break;
  }
}

function upgradeContract(){
  var form, contractId,selectedService,serviceId, amount;

  contractId        = $("#extra-client-contract").val();
  selectedService   = $(".service-card.selected");
  serviceId         = selectedService.attr("data-id");
  amount            = selectedService.attr("data-payment");
  
  var is_empty = isEmpty([contractId,serviceId, amount]);
  if(!is_empty){
    form = 'id_contrato=' + contractId + "&id_servicio=" + serviceId + "&cuota=" + amount;
    connectAndSend('process/upgrade',true,null,null,form,null)
  }else{
    alert("asegurate de llenar todos los datos y seleccionar el servicio");
  }
}

function getContracts(dni){
  var form = "dni="+ dni;
  connectAndSend("process/data_for_extra",false,null,makeContracList,form,null);
}




/********************************************************
*                 empresa y settings                            
*                                                       *
********************************************************/

function updateCompanyData(){

}

function updateSettings(){
  var form,
      settingsCargoMora =$("#settings-mora").val(),
      settingsFechaCorte=$("#settings-fecha-corte").val(),
      settingsAperturaCaja=$("#settings-apertura-caja").val(),
      settingsPenalizacionCancelacion=$("#settings-penalizacion-cancelacion").val(),
      settingsMesesPorDefecto=$("#settings-meses-por-defecto").val();

  form = 'cargo_mora=' + settingsCargoMora + '&fecha_corte=' + settingsFechaCorte + '&apertura_caja=' + settingsAperturaCaja;
  form += '&penalizacion_cancelacion=' + settingsPenalizacionCancelacion + '&meses_por_defecto=' + settingsMesesPorDefecto;
  form += '&tabla=settings';

  connectAndSend('process/update',true,null,null,form,null);  
}