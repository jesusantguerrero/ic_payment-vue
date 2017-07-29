<?php 
  $recibo = null;
  if(isset($_SESSION['recibo_info'])):
    $recibo = $_SESSION['recibo_info'];
    $company = $this->company_model->get_empresa();
?>

<div class="recibo-body">
  <div class="cabecera">
    <img class="logo-recibo" src="<?php echo base_url('assets/img/icsservice_logo.svg') ?>" alt="">
    <div class="company-name">
      <h2 class="company-oficial-name">ICS Service</h2>
      <p class="company-statement">Compañia Dominicana de Internet ICS</p>
      <p class="company-direction"> </p>
      <p class="company-numbers"></p>

      <p></p>
    </div>
    <div class="left-box"> 
      <h4 class="fecha-recibo">Fecha: </h4>
      <p><b>Cliente : </b><span><?php echo $recibo['nombres']." ".$recibo["apellidos"] ?></span></p>
    </div>
  </div>
  <div class="concepto"> <h4>Abono de Pago</h4></div>
  <div class="cuerpo">
  <p class="line"> <span class="text-main">Detalle:</span> <span class="text-placeholder"><?php echo $recibo['observaciones']?></span></span></p>
  <p class="line"> <span class="text-main">Suma:</span> <span class="text-placeholder"><?php echo strtoupper(number_to_words($recibo['abonos'])). "PESOS" ?></span></p>
  <p><span class="text-main">Vendedor:</span><span class="text-placeholder lg"><?php echo '' ?></span>
    <span class="text-main center">Total:</span><span class="text-placeholder md" > RD$<?php echo CurrencyFormat($recibo['abonos']) ?></span></p>
  </div>
  <div class="pie-pagina">
    <small>**Verifique su recibo valor no reembolsable**</small>
  </div>
</div>
<script>
    $(".company-oficial-name").text("<?php echo $company['nombre'] ?>");
    $(".company-statement").text("<?php echo $company['descripcion'] ?>");
    $(".company-direction").text("<?php echo $company['direccion'] ?>");
    $(".company-numbers").text("<?php echo "Tel.: ".$company['telefono1'].$company["telefonos"]?>");
    var now = moment()
    var fecha = now.format("DD-MM-YYYY");
    var hora = now.format("LTS");

  $(".fecha-recibo").text("Fecha: " + fecha);
  $(".hora-recibo").text("Hora: " + hora);
    print();
</script>
<?php 
  else:
    echo "No existe ese recibo";
  endif;
 ?>