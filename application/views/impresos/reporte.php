<?php 
  $reporte = get_report();
  $company = $this->company_model->get_empresa();
?>
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
      <h4 class="fecha-reporte">Fecha: </h4>
      <p><b class="hora-reporte">Recibo  :</b></p>
    </div>
  </div>
  <div class="concepto"> <h4><?php echo $reporte['concepto'] ?></h4></div>
  
  <div class="cuerpo">
    <?php echo $reporte['cuerpo'] ?>
  </div>
  <div class="pie-pagina">
  </div>
</div>
<script src="<?php echo base_url('assets/js/min/mobileDetect.min.js?version=2.20.0')?>"></script>
<script>
 var now = moment()
 var fecha = now.format("DD-MM-YYYY");
 var hora = now.format("LTS");
 $(".fecha-reporte").text("Fecha: " + fecha);
 $(".hora-reporte").text('Hora: ' + hora)
 $(".company-oficial-name").text("<?php echo $company['nombre'] ?>");
 $(".company-statement").text("<?php echo $company['descripcion'] ?>");
 $(".company-direction").text("<?php echo $company['direccion']  ?>");

  var md = new MobileDetect(window.navigator.userAgent);
  if(!md.mobile() || !md.tablet())
      print();
</script>
 </body>
</html>
