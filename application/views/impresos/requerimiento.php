<?php 

  if(isset($_SESSION['requirement_info'])):
    $info      = $_SESSION['requirement_info'];
    $cliente   = $info['cliente'];
    $servicio  = $info['servicio'];
    $user_data = get_user_data();
    $settings  = $this->settings_model->get_settings();
    $company   = $this->company_model->get_company();

?>

<div class="document-body">
  <div class="cabecera">
    <img class="logo-recibo" src="<?php echo base_url('assets/uploads/').$company['logo'] ?>" alt="">
    <div class="company-name">
      <h2 class="company-oficial-name">ICS Service</h2>
      <p class="company-statement">Compañia Dominicana de Internet ICS</p>
      <p class="company-direction"> Edificio Moana 2do Nivel. C/ Maria Teresa eq. Avenida Santa Rosa.</p>
      <p class="company-numbers"></p>
    </div>
    <div class="left-box">
      <h4 class="fecha-reporte">Fecha: </h4>
    </div>
  </div>

  <div class="cuerpo cuerpo-documento">
    <h4>Datos Personales:</h4>

    <div class="form-group print">
      <label for="">Cliente:</label>
      <input type="text" class="form-control line-input cliente" id="">
    </div>
    <div class="form-group print">
      <label for="">Cedula:</label>
      <input type="text" class="form-control line-input cedula" id="">
      <label for="">Tel.:</label>
      <input type="text" class="form-control line-input celular" id="">
    </div>
    <div class="form-group print">
      <label for="">Provincia:</label>
      <input type="text" class="form-control line-input provincia" id="">
      <label for="">Sector:</label>
      <input type="text" class="form-control line-input sector" id="">
    </div>
    <div class="form-group print">

      <label for="">Calle:</label>
      <input type="text" class="form-control line-input calle" id="">
      <label for="">Casa:</label>
      <input type="text" class="form-control line-input sm casa" id="">
    </div>
    <div class="form-group print">
      <label for="">Asignación:</label>
      <input type="text" class="form-control line-input fecha" id="">
    </div>
    <div class="form-group print">
      <label for="">Casa:</label>
      <input type="checkbox" value=" Madera"> <label for="checkbox"> Madera</label>
      <input type="checkbox" value=" Block"> <label for="checkbox"> Block</label>
    </div>
  </div>
  <div class="section">
    <h4>Detalles del Servicio:</h4>
    <div class="form-group print">
      <label for="">Servicio:</label>
      <input type="text" class="form-control line-input servicio" id="">
      <label for="">Velocidad:</label>
      <input type="text" class="form-control line-input velocidad" id="">
    </div>
  </div>
  <div class="section">
    <h4>Otros detalles de direccion:</h4>
    <div class="form-group print">
      <label for="" class="large">Entrando por:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
      <label for="" class="large">Cerca de:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
  </div>

  <h1 class="titulo-lateral">Requerimiento de <span>Contrato</span></h1>
</div>
<footer></footer>

<script>
  var now = moment()
  var fecha = now.format("DD-MM-YYYY");
  var hora = now.format("LTS");

  $(".fecha-reporte").text("Fecha: " + fecha);
  $(".hora-reporte").text("Hora: " + hora);

  $('input.cliente').val("<?php echo $cliente['nombres'].' '.$cliente['apellidos']; ?>");
  $('input.cedula').val("<?php echo dni_format($cliente['cedula'])?>");
  $('input.celular').val("<?php echo phone_format($cliente['celular'])?>");
  $('input.celular').val("<?php echo phone_format($cliente['telefono'])?>");
  $('input.provincia').val("<?php echo $cliente['provincia']?>");
  $('input.sector').val("<?php echo $cliente['sector']?>");
  $('input.calle').val("<?php echo $cliente['calle']?>");
  $('input.casa').val("<?php echo $cliente['casa']?>");
  $('input.fecha').val(fecha);
  $('input.servicio').val("<?php echo $servicio['nombre'] ?>");
  $('input.fecha').val(fecha);
  $('input.velocidad').val("<?php echo $servicio['descripcion'] ?>");
  $(".line-input").attr('readonly', 'readonly');
  $(".company-oficial-name").text("<?php echo $company['nombre'] ?>");
  $(".company-statement").text("<?php echo $company['descripcion'] ?>");
  $(".company-direction").text("<?php echo $company['direccion']  ?>");
  $(".company-numbers").text("<?php echo "Tel.: ".phone_format($company['telefono1'])." ".phone_format($company["telefonos"])?>");
  print();
</script>
<?php 
    endif;
  ?>