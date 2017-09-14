<?php 
  $recibo = null;
  if(isset($_SESSION['recibo_info'])):
    $recibo = $_SESSION['recibo_info'];
    $mensualidad = 'Mensualidad';
    $extras = "Extras";
    $mora = 'Mora';
    $company = $this->company_model->get_empresa();
    if($recibo['concepto'] != 'instalacion' and $recibo['concepto'] != 'abono' and !str_contains("extra", $recibo['concepto'])){
      $fecha = new DATETIME($recibo['fecha_limite']);
      $fecha = $fecha->format('F');
      $recibo['concepto'] = 'Correspondiente al Mes de '.str_replace($GLOBALS['full_months_eng'],$GLOBALS['full_months_esp'],$fecha);
    }else if(str_contains('extra',$recibo['concepto'])){
      $recibo['concepto'] = 'Pago Extra para '. $recibo['servicio'];
      $mensualidad = 'Pago';
      $recibo['monto_extra'] = $recibo['deuda'];
      $extras = "Deuda";
      $recibo['mora'] = 0;
    }
?>

<div class="recibo-body">
  <div class="cabecera">
    <img class="logo-recibo" src="<?php echo base_url('assets/img/ic_payment.png') ?>" alt="">
    <div class="company-name">
      <h2 class="company-oficial-name">ICS Service</h2>
      <p class="company-statement">Compañia Dominicana de Internet ICS</p>
      <p class="company-direction"> </p>
      <p class="company-numbers"></p>

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
  <p class="line">
    <span class="text-main">Detalle:</span>
    <span class="text-placeholder"><?php echo $recibo['servicio']."-".$recibo['detalles_extra']?></span></span>
  </p>
  <p class="line"> 
    <span class="text-main">Suma:</span> 
    <span class="text-placeholder"><?php echo strtoupper(number_to_words($recibo['total'])). "PESOS" ?></span></p>
  <p> 
    <span class="text-main"><?php echo $mensualidad ?>:</span> 
    <span class="text-placeholder md"> RD$ <?php echo CurrencyFormat($recibo['mensualidad'] + $recibo['descuento']) ?></span>
    <span class="text-main center"><?php echo $mora ?>:</span>
    <span class="text-placeholder md"> RD$ <?php echo CurrencyFormat($recibo['mora']) ?> </span>
    <span class="text-main center"><?php  echo $extras ?></span>
    <span class="text-placeholder md"> RD$ <?php echo CurrencyFormat($recibo['monto_extra']) ?></span>
  </p>
  <?php if($recibo['descuento'] > 0): ?>
    <p class="line"> 
      <span class="text-main">Descuento:</span> 
      <span class="text-placeholder"><i>RD$ <?php echo CurrencyFormat($recibo['descuento'])?></i></span></span>
    </p>
    <p class="line"> 
      <span class="text-main">Por:</span> 
      <span class="text-placeholder"><?php echo $recibo['razon_descuento'] ?></span>
    </p>
  <?php endif; ?>
  <p>
    <span class="text-main">Vendedor:</span>
    <span class="text-placeholder lg"><?php echo $recibo['empleado'] ?></span>
    <span class="text-main center">Total:</span>
    <span class="text-placeholder md" > RD$<?php echo CurrencyFormat($recibo['total']) ?></span>
  </p>
  </div>
  <div class="pie-pagina">
    <small>**Verifique su recibo valor no reembolsable**</small>
  </div>
</div>
<script>
    $(".company-oficial-name").text("<?php echo $company['nombre'] ?>");
    $(".company-statement").text("<?php echo $company['descripcion'] ?>");
    $(".company-direction").text("<?php echo $company['direccion'] ?>");
    $(".company-numbers").text("<?php echo "Tel.: ".phone_format($company['telefono1'])." ".phone_format($company["telefonos"])?>");
    print();
</script>
<?php 
  else:
    echo "No existe ese recibo";
  endif;
 ?>