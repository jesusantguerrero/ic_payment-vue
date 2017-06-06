<?php 
  if(isset($_SESSION['requirement_info'])):
    $info = $_SESSION['requirement_info'];
    $cliente = $info['cliente'];
    $contrato = $info['contrato'];
    $user_data = get_user_data();

?>

<div class="document-body">
  <div class="cabecera">
    <img class="logo-recibo" src="<?php echo base_url('assets/img/icsservice_logo.svg') ?>" alt="">
    <div class="company-name">
      <h2>ICS Service</h2>
      <p>Compañia Dominicana de Internet ICS</p>
      <p> Edificio Moana 2do Nivel. C/ Maria Teresa eq. Avenida Santa Rosa.</p>
      <p></p>
    </div>
    <div class="left-box">
      <p><b class="">Contrato No.: <?php echo $contrato['id_contrato'] ?></b></p>
      <p><b class="">Fecha cont.: <?php echo $contrato['fecha'] ?></b></p>
    </div>
  </div>


  <div class="cuerpo cuerpo-documento">
     <p class="line">1- Compañia dominicana de internet ICS, Registro Nacional de contribuyente numero </span></p><br>
     <h3><u>Datos Del Representante:</u></h3>
    <p class="line"> <span class="text-main normal">Representante:</span> <span class="text-placeholder t-center"><?php echo $user_data['fullname'] ?> </span></p>
    <p class="line"><span class="text-main md">Posicion:</span> <span class="text-placeholder md t-center"><?php echo $user_data['typestr'] ?> </span>
      <span class="text-main center large">Cedula de identidad:</span><span class="text-placeholder t-center"><?php echo $user_data['dni'] ?>  </span></p>
    <p class="line"> Quien en lo adelante del Contrato adjunto se denomina "La Compañia".</p>
  </div>
  
  <div class="section">
    <h3><u>Datos Del Cliente:</u></h3>

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

    <p class="line">La cual en lo adelante del contrato adjunto se denomirá "El Cliente"</p>
  </div>


</div>

<div class="document-body">
  <div class="cabecera">
    <img class="logo-recibo" src="<?php echo base_url('assets/img/icsservice_logo.svg') ?>" alt="">
    <div class="company-name">
      <h2>ICS Service</h2>
      <p>Compañia Dominicana de Internet ICS</p>
      <p> Edificio Moana 2do Nivel. C/ Maria Teresa eq. Avenida Santa Rosa.</p>
      <p></p>
    </div>
    <div class="left-box">
      <h4 class="fecha-reporte">Fecha: </h4>
    </div>
  </div>


  <div class="cuerpo cuerpo-documento">
    <h4>Datos Personales:</h4>

    <div class="form-group print">
      <label for="">Cliente:</label>
      <input type="text" class="form-control line-input cliente" id="" >
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
      <input type="checkbox" value=" Block">  <label for="checkbox"> Block</label>
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





<div class="document-body">
  <div class="cabecera">
    <img class="logo-recibo" src="<?php echo base_url('assets/img/icsservice_logo.svg') ?>" alt="">
    <div class="company-name">
      <h2>ICS Service</h2>
      <p>Compañia Dominicana de Internet ICS</p>
      <p> Edificio Moana 2do Nivel. C/ Maria Teresa eq. Avenida Santa Rosa.</p>
      <p></p>
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
  </div>
  <div class="section">
    <h4>Departamento Tecnico:</h4>
    <div class="form-group print">
      <label for="">Código:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
      <label for="">Servicio:</label>
      <input type="text" class="form-control line-input servicio" id="">
      <label for="">Velocidad:</label>
      <input type="text" class="form-control line-input velocidad" id="">
    </div>
    <div class="form-group print">
      <label for="">Equipo:</label>
      <input type="text" class="form-control line-input equipo" id="">
      <label for="">Mac:</label>
      <input type="text" class="form-control line-input mac_equipo" id="">
    </div>
    <div class="form-group print">
      <label for="">Modelo:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
      <label for="">Router:</label>
      <input type="text" class="form-control line-input router" id="">
      <label for="">Mac:</label>
      <input type="text" class="form-control line-input mac_router" id="">
    </div>

  </div>
  <div class="section">
    <h4>Confirmación de instalación:</h4>
    <div class="form-group print">
      <label for="">Firma Tecnico:</label>
      <input type="text" class="form-control line-input lg" id="">
      <label for="">Nombre:</label>
      <input type="text" class="form-control line-input lg" id="">
    </div>
    <div class="form-group print">
      <label for="">Fecha:</label>
      <input type="text" class="form-control line-input lg" id="">
      <label for="" class="large">Firma del Cliente:</label>
      <input type="text" class="form-control line-input lg" id="">
    </div>
  </div>

  <h1 class="titulo-lateral">Orden de <span>Servicio</span></h1>

</div>

<script>
  //print();
  var now = moment()
  var fecha = now.format("DD-MM-YYYY");
  var hora = now.format("LTS");
   
  $(".fecha-reporte").text("Fecha: " + fecha);
  $(".hora-reporte").text('Hora: ' + hora)
  
  $('input.cliente').val("<?php echo $contrato['cliente']?>");
  $('input.cedula').val("<?php echo $contrato['cedula']?>");
  $('input.celular').val("<?php echo $cliente['celular']?>");
  $('input.provincia').val("<?php echo $cliente['provincia']?>");
  $('input.sector').val("<?php echo $cliente['sector']?>");
  $('input.calle').val("<?php echo $cliente['calle']?>");
  $('input.casa').val("<?php echo $cliente['casa']?>");
  $('input.fecha').val("<?php echo $contrato['fecha']?>");
  $('input.servicio').val("<?php echo $contrato['servicio']?>");
  $('input.fecha').val("<?php echo $contrato['fecha']?>");
  $('input.equipo').val("<?php echo $contrato['nombre_equipo']?>");
  $('input.mac_equipo').val("<?php echo $contrato['mac_equipo']?>");
  $('input.router').val("<?php echo $contrato['router']?>");
  $('input.mac_router').val("<?php echo $contrato['mac_router']?>");
    
</script>
<?php 
  endif;
 ?>
