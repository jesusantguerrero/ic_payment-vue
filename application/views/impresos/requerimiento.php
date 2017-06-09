<?php 
  if(isset($_SESSION['requirement_info'])):
    $info = $_SESSION['requirement_info'];
    $cliente = $info['cliente'];
    $contrato = $info['contrato'];
    $user_data = get_user_data();
    $settings = $this->settings_model->get_settings();

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
      <h4>
        <u>Direccion de factura:</u>
      </h4>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Direccion:</label>
           <textarea  class="form-control "cols="30" rows="3"  id="direction" readonly="readonly"><?php echo $contrato['direccion']?>
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
        <u>Informacion de servicio:</u>
      </h4>
      <div class="col-md-6 col-xs-6">
        <div class="form-group print">
          <label for="">Cod:</label>
           <input type="text" class="form-control line-input " value="<?php echo $contrato['id_contrato'] ?>">
        </div>
        <div class="form-group print">
          <label for="">Plan:</label>
           <input type="text" class="form-control line-input " value="<?php echo $contrato['servicio'] ?>">
        </div>
        <div class="form-group print">
          <label for="">Mesualidad:</label>
          <input type="text" class="form-control line-input" value="<?php echo "RD$ ".CurrencyFormat($contrato['cuota']) ?>">
        </div>
        <div class="form-group print">
          <label for="">Dia de Pagos:</label>
          <input type="text" class="form-control line-input" value="30 de cada mes">
        </div>
      </div>
      <div class="col-md-6 col-xs-6">
         <div class="form-group print">
          <label for="">Duracion:</label>
          <input type="text" class="form-control line-input" value="<?php echo $contrato['duracion']." Meses" ?>">
        </div>
        <div class="form-group print">
          <label for="">Mora:</label>
          <input type="text" class="form-control line-input" value="<?php echo $settings['cargo_mora'] ?> %">
        </div>
        <div class="form-group print">
          <label for="">Hasta:</label>
          <input type="text" class="form-control line-input" value="<?php echo $settings['fecha_corte']?> de cada mes">
        </div>
        <div class="form-group print">
          <label for="">Proximo Pago:</label>
          <input type="text" class="form-control line-input" value="<?php echo $contrato['proximo_pago']?>">
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
        <div class="form-group print">
          <label for="">Fecha:</label>
          <input type="text" class="form-control line-input" value="">
        </div>
      </div>
    </div>
  </div>
  <div class="pie-pagina">
    <small><b>** Importante Leer el contrato adjunto y firmar esta hoja **</b></small>
     <p class="super-small"><small><b>** El cliente está en el derecho de cancelar el contrato de manera unilateral antes del termino del mismo, esto sujeto a un coste del 50% del total del contrato acordado **</b></small></p>
  </div>
   <h1 class="titulo-lateral">Solicitud de <span>Contrato</span></h1>
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
    $('input.celular').val("<?php echo $cliente['telefono']?>");
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
    $(".line-input").attr('readonly', 'readonly');
  </script>
  <?php 
  endif;
 ?>