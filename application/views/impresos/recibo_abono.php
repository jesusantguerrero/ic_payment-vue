<?php 
  $recibo = null;
  if(isset($_SESSION['recibo_info'])):
    $recibo    = $_SESSION['recibo_info'];
    $company   = $this->company_model->get_empresa();
    $antes     = $recibo['deuda'] + $recibo['total'];
    $deuda     = $recibo['deuda'];  
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
      <p><b>Contrato: </b><span><?php echo $recibo['id_contrato'] ?></span></p>
      <p><b>Cliente : </b><span><?php echo $recibo['cliente'] ?></span></p>
    </div>
  </div>
  <div class="concepto"> <h4><?php echo ucfirst($recibo['concepto']) ?></h4></div>
  <div class="cuerpo">
  <p class="line"> <span class="text-main">Detalle:</span> <span class="text-placeholder"><?php echo $recibo['detalles_extra']?></span></span></p>
  <p><span class="text-main">Suma:</span><span class="text-placeholder lg"> <?php echo strtoupper(number_to_words($recibo['total'])). "PESOS" ?></span>
    <span class="text-main center">RD$: </span><span class="text-placeholder md" > <?php echo CurrencyFormat($recibo['total']) ?></span></p>
  <p><span class="text-main">Antes:</span><span class="text-placeholder lg"> RD$ <?php echo CurrencyFormat($antes) ?></span>
    <span class="text-main center">Deuda:</span><span class="text-placeholder md" > RD$<?php echo CurrencyFormat($deuda) ?></span></p>
  <p><span class="text-main">Caja:</span><span class="text-placeholder lg" > <?php echo $recibo['empleado'] ?></span>
      <span class="text-main center">Fecha Pago:</span><span class="text-placeholder md"> <?php echo $recibo['fecha_limite'] ?></span></p>
  </div>
  <div class="pie-pagina">
    <br><br>
    <small><small>*Verifique su recibo valor no reembolsable / La deuda es correspondiente al mes al que se abonó*</small>
  </div>
</div>


<script>
    $(".company-oficial-name").text("<?php echo $company['nombre'] ?>");
    $(".company-statement").text("<?php echo $company['descripcion'] ?>");
    $(".company-direction").text("<?php echo $company['direccion'] ?>");
    $(".company-numbers").text("<?php echo "Tel.: ".phone_format($company['telefono1'])." ".phone_format($company["telefonos"])?>");
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