<?php 
  $reporte = get_report();
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
<script>
 //print();

 var now = moment()
 var fecha = now.format("DD-MM-YYYY");
 var hora = now.format("LTS");
 $(".fecha-reporte").text("Fecha: " + fecha);
 $(".hora-reporte").text('Hora: ' + hora)

</script>
