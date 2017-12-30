<?php
  if($info):
    $user_data = get_user_data();
    $settings  = $this->settings_model->get_settings();
    $company   = $this->company_model->get_company();

    function report_row($title, $value, $col_width = 6, $class= '') {
      echo "<div class='row $class'>
              <div class='col-xs-$col_width'><p><b>$title:</b></p></div>
              <div class='col-xs-$col_width'><p><i>RD$ ".currencyFormat($value)."</i></p></div>
            </div>";
    }

    function repeat($val, $times) {
      $result = '<small>';
      for ($i = 0; $i < $times; $i++) {
        $result.= $val;
      }
      echo $result . "</small>";
    }
?>

<div class="document-body">
  <div class="cabecera">
    <img class="logo-recibo" src="<?php echo base_url('assets/uploads/').$empresa['logo'] ?>" alt="">
    <div class="company-name">
      <h2 class="company-oficial-name">ICS Service</h2>
      <p class="company-statement">Compañia Dominicana de Internet ICS</p>
      <p class="company-direction"> Edificio Moana 2do Nivel. C/ Maria Teresa eq. Avenida Santa Rosa.</p>
      <p class="company-numbers"></p>
    </div>
    <div class="left-box">
      <h3 class="">Periodo </h4>
        <p class="fecha-reporte">Inicio: <?php echo date_spanish_format($info['first_date'])?> </p>
        <p class="fecha-reporte">Final:  <?php echo date_spanish_format($info['second_date']) ?> </p>
    </div>
  </div>


  <div class="cuerpo cuerpo-documento" style="padding-top: 10px">
    <h3>Detalles de ingresos:</h3>
    <div class="row">
      <div class="col-xs-6 col-6">
        <h5><b><u>Por Razon:</u></b></h5>
         <?php  report_row("Pagos de Factura", $info['pagos_facturas'])?>
         <?php  report_row("Pagos extras", $info['pagos_extras'])?>
         <?php  repeat('=',90) ?>
         <?php  report_row("Total de Ingresos", $info['total_ingresos'])?>
      </div>

      <div class="col-xs-6 col-6">
        <h5><b><u>Por Tipo de Pago:</u></b></h5>
        <?php  report_row("Pagos Via Banco", $info['pagos_banco'])?>
        <?php report_row("Pagos Efectivo", $info['pagos_efectivo'])?>
      </div>
    </div>

    <br>

    <h3>Detalle de Cuadre:</h3>
    <?php  report_row("Efectivo Segun Sistema", $info['pagos_efectivo'])?>
    <?php  report_row("Efectivo Reportado en Caja", $info['efectivo_caja'])?>
    <?php  repeat('=',66) ?>
    <?php  report_row("Descuadre", $info['total_descuadre'])?>

    <h3>Ganancias y Gastos:</h3>
    <?php  report_row("Total de Ingresos", $info['total_ingresos'])?>
    <?php  report_row("Total de Gastos", $info['total_gastos'], 6,'text-danger')?>
    <?php  report_row("Total de Descuadre", $info['total_descuadre'], 6,'text-danger')?>
    <?php  repeat('=',66) ?>
    <?php  report_row("Ganancia(Banco)", $info['banco'])?>

  <h1 class="titulo-lateral">Reporte de
    <span>Cierre</span>
  </h1>
</div>
<br>
<div class="pie-pagina">
    <p>
      <small>
        <?php echo "** Este reporte abarca las fechas de ".date_spanish_format($info['first_date'])." hasta ".date_spanish_format($info['second_date']).", y fue impreso el <span class='fecha'></span>**";?>
      </small>
    </p>

<script>
  var now = moment()
  var fecha = now.format("DD-MM-YYYY");
  var hora = now.format("LTS");

  $(".fecha").text("Fecha: " + fecha);
  $(".hora-reporte").text("Hora: " + hora);

  $(".company-oficial-name").text("<?php echo $company['nombre'] ?>");
  $(".company-statement").text("<?php echo $company['descripcion'] ?>");
  $(".company-direction").text("<?php echo $company['direccion']  ?>");
  $(".company-numbers").text("<?php echo "Tel.: ".phone_format($company['telefono1'])."".phone_format($company["telefonos"])?>");
  print()
</script>
<?php
    endif;
  ?>
