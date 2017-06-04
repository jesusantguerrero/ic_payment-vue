<?php 
  $recibo = null;
  if(isset($_SESSION['recibo_info'])):
    $recibo = $_SESSION['recibo_info'];
?>

<div class="recibo-body">
  <div class="cabecera">
    <img class="logo-recibo" src="<?php echo base_url('assets/img/icsservice_logo.svg') ?>" alt="">
    <div class="company-name">
      <h2>ICS Service</h2>
      <p>Compañia Dominicana de Internet ICS</p>
      <p> Edificio Moana 2do Nivel. C/ Maria Teresa eq. Avenida Santa Rosa.</p>
      <p></p>
    </div>
    <div class="left-box"> 
      <h4 class="fecha-recibo">Fecha: <?php echo $recibo['fecha_pago'] ?></h4>
      <p><b>Recibo  :</b> <span><?php echo $recibo['id_pago'] ?></span></p>
      <p><b>Contrato: </b><span><?php echo $recibo['id_contrato'] ?></span></p>
      <p><b>Cliente : </b><span><?php echo $recibo['cliente'] ?></span></p>
    </div>
  </div>
  <div class="concepto"> <h4><?php echo $recibo['concepto'] ?></h4></div>
  <div class="cuerpo">
  <p class="line"> <span class="text-main">Detalle:</span> <span class="text-placeholder"><?php echo $recibo['concepto'] ?></span></p>
   <p class="line"> <span class="text-main">Servicio:</span> <span class="text-placeholder"><?php echo $recibo['servicio'].$recibo['detalles_extra']?></span></p>
  <p> <span class="text-main">Mensualidad:</span> <span class="text-placeholder md"> RD$ <?php echo CurrencyFormat($recibo['mensualidad']) ?></span>
  <span class="text-main center">Mora:</span><span class="text-placeholder md"> RD$ <?php echo CurrencyFormat($recibo['mora']) ?> </span>
  <span class="text-main center">Extras:</span><span class="text-placeholder md"> RD$ <?php echo CurrencyFormat($recibo['monto_extra']) ?></span></p>
  <p><span class="text-main">Vendedor:</span><span class="text-placeholder lg"><?php echo $recibo['empleado'] ?></span>
    <span class="text-main center">Total:</span><span class="text-placeholder md" > RD$<?php echo CurrencyFormat($recibo['total']) ?></span></p>
  </div>
  <div class="pie-pagina">
    <small>**Verifique su recibo valor no reembolsable**</small>
  </div>
</div>
<script>
 print();

</script>
<?php 
  else:
    echo "No existe ese recibo";
  endif;

 ?>