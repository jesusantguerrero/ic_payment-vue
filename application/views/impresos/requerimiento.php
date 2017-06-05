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
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
      <label for="">Cedula:</label>
      <input type="text" class="form-control line-input" id="">
      <label for="">Tel.:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
     <label for="">Provincia:</label>
      <input type="text" class="form-control line-input" id="">
      <label for="">Sector:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
     
      <label for="">Calle:</label>
      <input type="text" class="form-control line-input" id="">
      <label for="">Casa:</label>
      <input type="text" class="form-control line-input sm" id="">
    </div>
     <div class="form-group print">
      <label for="">Asignación:</label>
      <input type="text" class="form-control line-input" id="">
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
      <input type="text" class="form-control line-input" id="">
      <label for="">Velocidad:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
  </div>
  <div class="section">
    <h4>Otros detalles de direccion:</h4>
    <div class="form-group print">
      <label for="">Entrando por:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
      <label for="">Cerca de:</label>
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

    <p class="line"> <span class="text-main">Cliente:</span> <span class="text-placeholder"> </span></p>
    <p class="line"><span class="text-main">Cedula:</span><span class="text-placeholder lg"> </span>
      <span class="text-main center">Tel.:</span><span class="text-placeholder md">  </span></p>
    <p class="line"> <span class="text-main">Direccion:</span> <span class="text-placeholder"> </span></p>
    <p> <span class="text-main">Provincia:</span> <span class="text-placeholder md">   </span>
      <span class="text-main center">Calle:</span><span class="text-placeholder md">   </span>
      <span class="text-main center">Casa:</span><span class="text-placeholder md"> # </span></p>
    <p><span class="text-main">Fecha de Asignacion:</span><span class="text-placeholder lg"> </span></p>
  </div>
  <div class="section">
    <h4>Departamento Tecnico:</h4>
    <p><span class="text-main">Código</span><span class="text-placeholder lg"> </span></p>
    <p class="line"> <span class="text-main">Servicio:</span> <span class="text-placeholder"> </span></p>
    <p class="line"> <span class="text-main">Velocidad:</span> <span class="text-placeholder"> </span></p>
    <p><span class="text-main">Equipo:</span><span class="text-placeholder lg"> </span>
      <span class="text-main center">Mac:</span><span class="text-placeholder md">  </span></p>
    <p class="line"> <span class="text-main">Modelo:</span> <span class="text-placeholder"> </span></p>
    <p><span class="text-main">Router:</span><span class="text-placeholder lg"> </span>
      <span class="text-main center">Mac:</span><span class="text-placeholder md">  </span></p>

    <div class="checkbox">
      <label>
        <input type="checkbox" value="">
        Checkbox
      </label>
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
</script>

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
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
      <label for="">Cedula:</label>
      <input type="text" class="form-control line-input" id="">
      <label for="">Tel.:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
     <label for="">Provincia:</label>
      <input type="text" class="form-control line-input" id="">
      <label for="">Sector:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
     
      <label for="">Calle:</label>
      <input type="text" class="form-control line-input" id="">
      <label for="">Casa:</label>
      <input type="text" class="form-control line-input sm" id="">
    </div>
     <div class="form-group print">
      <label for="">Asignación:</label>
      <input type="text" class="form-control line-input" id="">
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
      <input type="text" class="form-control line-input" id="">
      <label for="">Velocidad:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
      <label for="">Equipo:</label>
      <input type="text" class="form-control line-input" id="">
      <label for="">Mac:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
      <label for="">Modelo:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
      <label for="">Router:</label>
      <input type="text" class="form-control line-input" id="">
      <label for="">Mac:</label>
      <input type="text" class="form-control line-input" id="">
    </div>

  </div>
  <div class="section">
    <h4>Confirmación de instalación:</h4>
    <div class="form-group print">
      <label for="">Firma Tecnico:</label>
      <input type="text" class="form-control line-input" id="">
      <label for="">Nombre:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
    <div class="form-group print">
      <label for="">Fecha:</label>
      <input type="text" class="form-control line-input lg" id="">
      <label for="">Firma del Cliente:</label>
      <input type="text" class="form-control line-input" id="">
    </div>
  </div>

  <h1 class="titulo-lateral">Orden de <span>Servicio</span></h1>

</div>