<?php 
  $user_data = get_user_data();
  $settings = $this->settings_model->get_settings();
  $company = $this->company_model->get_empresa();
?>


<!--*******************************************************************************************
                                      Contrato

***********************************************************************************************-->

<div class="document-body">
  <div class="cabecera">
    <img class="logo-recibo" src="<?php echo base_url('assets/img/icsservice_logo.svg') ?>" alt="">
    <div class="company-name">
      <h2 class="company-oficial-name">ICS Service</h2>
      <p class="company-statement">Compañia Dominicana de Internet ICS</p>
      <p class="company-direction"> Edificio Moana 2do Nivel. C/ Maria Teresa eq. Avenida Santa Rosa.</p>
      <p></p>
    </div>
    <div class="left-box">
      <p><b class="">Contrato No.: </b></p>
      <p><b class="">Fecha cont.: </b></p>
    </div>
  </div>
  <div class="cuerpo cuerpo-documento contrato">

    <div class="row">
      <h4>
        <u>Datos Del Cliente:</u>
      </h4>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Cliente:</label>
          <textarea class="form-control" cols="30" rows="2" readonly="readonly"><?php echo $contrato['cliente'] ?></textarea>
        </div>
        <div class="form-group print">
          <label for="">Tel.:</label>
          <input type="text" class="form-control line-input celular" id="">
        </div>
      </div>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Cedula:</label>
          <input type="text" class="form-control line-input cedula" id="">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Direccion:</label>
          <textarea class="form-control " cols="30" rows="3" id="direction" readonly="readonly"><?php echo $contrato['direccion']?>
          </textarea>
        </div>
      </div>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Celular:</label>
          <input type="text" class="form-control line-input celular" id="">
        </div>
        <div class="form-group print">
          <label for="">Telefono:</label>
          <input type="text" class="form-control line-input telefono" id="">
        </div>
      </div>
    </div>
    <div class="row">
      <h4>
        <u>Detalles :</u>
      </h4>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Motivo:</label>
          <textarea class="form-control " cols="30" rows="3" id="direction" readonly="readonly">
          </textarea>
        </div>
      </div>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Penalidad:</label>
          <input type="text" class="form-control line-input" value="">
        </div>
        <div class="form-group print">
          <label for="">Monto:</label>
          <input type="text" class="form-control line-input" value="">
        </div>
        <div class="form-group print">
          <label for="">fecha:</label>
          <input type="text" class="form-control line-input" value="">
        </div>
      </div>
    </div>
    <div class="row">
      <h4>
        <u>Datos del Representante:</u>
      </h4>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Nombre:</label>
          <textarea class="form-control" cols="30" rows="2" readonly="readonly"><?php echo $user_data['fullname'] ?></textarea>
        </div>
        <div class="form-group print">
          <label for="">Posicion:</label>
          <input type="text" class="form-control line-input" value="<?php echo $user_data['typestr'] ?>">
        </div>
      </div>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Cedula:</label>
          <input type="text" class="form-control line-input" value="<?php echo $user_data['dni'] ?>">
        </div>
      </div>
    </div>
    <div class="row">
    <h4><u>Firmas:</u></h4>
    <div class="col-xs-12">
      <div class="form-group print">
      <label for="">secretaria:</label>
      <input type="text" class="form-control line-input lg" id="">
      <label for="">Cliente:</label>
      <input type="text" class="form-control line-input lg" id="">
    </div>
    </div>
   
  </div>
  </div>
  


  <div class="pie-pagina">
    <br><br>
    <p class="super-small"><small><b>** El cliente está en el derecho de cancelar el contrato de manera unilateral antes del termino del mismo, esto sujeto a un coste del 50% del total del contrato acordado **</b></small></p>
  </div>
  <h1 class="titulo-lateral">Cancelacion de <span>Contrato</span></h1>
</div>
<footer></footer>

<script>
  var now = moment()
  var fecha = now.format("DD-MM-YYYY");
  var hora = now.format("LTS");

  $(".fecha-reporte").text("Fecha: " + fecha);
  $(".hora-reporte").text('Hora: ' + hora);

 
</script>
<?php 
   
?>