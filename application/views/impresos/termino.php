<?php
if(isset($_SESSION['requirement_info'])):
    $info           = $_SESSION['requirement_info'];
    $cliente        = $info['cliente'];
    $contrato       = $info['contrato'];
    $pago           = $info['pago'];
    $user_data      = $this->my_auth->get_user_data();
    $settings       = $this->settings_model->get_settings();
    $company        = $this->company_model->get_company();
?>


<!--*******************************************************************************************
                                      Contrato

***********************************************************************************************-->

<div class="document-body">
  <div class="cabecera">
   <img class="logo-recibo" src="<?php echo base_url('assets/uploads/').$company['logo'] ?>" alt="">
    <div class="company-name">
      <h2 class="company-oficial-name">
        <?php echo $company['nombre'] ?>
      </h2>
      <p class="company-statement">
        <?php echo $company['lema'] ?>
      </p>
      <p class="company-direction">
        <?php echo $company['direccion'] ?>
      </p>
      <p class="company-tel">Tel.:
        <?php echo phone_format($company['telefono1'])." ". phone_format($company['telefonos'])?>
      </p>
      <p></p>
    </div>
    <div class="left-box">
      <p>
        <b class="">Fecha: </b>
        <span class="fecha"></span>
      </p>
      <p>
        <b class="">Contrato No.:
          <?php echo $contrato['id_contrato'] ?>
        </b>
      </p>
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
          <textarea class="form-control" cols="30" rows="2" readonly="readonly">
            <?php echo $contrato['cliente'] ?>
          </textarea>
        </div>
      </div>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Cedula:</label>
          <input type="text" class="form-control line-input cedula" id="" value="<?php echo dni_format($contrato['cedula']) ?>">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Direccion:</label>
          <textarea class="form-control " cols="30" rows="3" id="direction" readonly="readonly"><?php echo $contrato['direccion'] ?>
          </textarea>
        </div>
      </div>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Celular:</label>
          <input type="text" class="form-control line-input celular" value="<?php echo phone_format($cliente['celular'])?>">
        </div>
        <div class="form-group print">
          <label for="">Telefono:</label>
          <input type="text" class="form-control line-input telefono" value="<?php echo phone_format($cliente['telefono'])?>">
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
            Finalicion De contrato
          </textarea>
        </div>
        <div class="form-group print">
          <label for="">Inicio:</label>
          <input type="text" class="form-control line-input" value="<?php echo $contrato['fecha'] ?>">
        </div>
      </div>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Penalidad:</label>
          <input type="text" class="form-control line-input" value="no aplica">
        </div>
        <div class="form-group print">
          <label for="">Monto:</label>
          <input type="text" class="form-control line-input" value="no aplica">
        </div>
        <div class="form-group print">
          <label for="">Termino:</label>
          <input type="text" class="form-control line-input" value="<?php echo $contrato['ultimo_pago'] ?>">
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
          <textarea class="form-control" cols="30" rows="2" readonly="readonly">
            <?php echo $user_data['fullname'] ?>
          </textarea>
        </div>
        <div class="form-group print">
          <label for="">Posicion:</label>
          <textarea class="form-control" cols="30" rows="2" readonly="readonly">
            <?php echo $user_data['typestr'] ?>
          </textarea>
        </div>
      </div>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Cedula:</label>
          <input type="text" class="form-control line-input" value="<?php echo dni_format($user_data['dni'])?>">
        </div>
      </div>
    </div>
    <div class="row">
      <h4>
        <u>Firmas:</u>
      </h4>
      <div class="col-xs-6 ">
        <hr>
        <p class="t-center">secretaria:</p>
      </div>
      <div class="col-xs-6 center-row">
        <hr>
        <p class="t-center">Cliente:</p>
      </div>
    </div>

  </div>
  <br>
  <br>
  <div class="pie-pagina">
    <p>
      <small>
        <b>** El contrato ha sido terminado por un acuerdo de ambas partes de manera cordial **</b>
      </small>
    </p>
  </div>
  <h1 class="titulo-lateral">Termino de
    <span>Contrato</span>
  </h1>
</div>

<script>
  var now = moment()
  var fecha = now.format("DD-MM-YYYY");
  var hora = now.format("LTS");

  $(".fecha-reporte").text("Fecha: " + fecha);
  $(".fecha").text(fecha);

  print();
</script>
<?php
  endif;
 ?>
