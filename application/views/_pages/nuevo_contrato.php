<div class="screen  row">

  <?php 
    $client_data = get_client_data();
    
  ?>
  <div class="col-md-5 col-md-offset-1">
    <h3 class="part-title">Nuevo Contrato</h3>
    <form action="" class="contract-form">
      <div class="input-group">
        <span class="input-group-addon" id="basic-addon1">Cliente</span>
        <input type="text" class="form-control" aria-describedby="basic-addon1" value="<?php echo $client_data['nombre_completo']?>" disabled>
      </div>
      <div class="input-group">
        <span class="input-group-addon" id="basic-addon1">Cedula</span>
        <input type="text" class="form-control" aria-describedby="basic-addon1" value="<?php echo $client_data['cedula'] ?>" disabled>
      </div>
      <div class="col-md-6">
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1">Provincia</span>
          <input type="text" class="form-control" aria-describedby="basic-addon1" value="<?php echo $client_data['provincia'] ?>"disabled>
        </div>
      </div>
      <div class="col-md-6">
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1">Sector</span>
          <input type="text" class="form-control" aria-describedby="basic-addon1" value="<?php echo $client_data['sector'] ?>" disabled>
        </div>
      </div>
      <div class="col-md-6">
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1">Calle</span>
          <input type="text" class="form-control" aria-describedby="basic-addon1" value="<?php echo $client_data['calle'] ?>"disabled>
        </div>
      </div>
      <div class="col-md-6">
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1">Casa #</span>
          <input type="text" class="form-control" aria-describedby="basic-addon1" value="<?php echo $client_data['casa'] ?>" disabled>
        </div>
      </div>
      <h4>Servicios</h4>
      <div class="row shortcuts-container for-services">
        <?php $this->service_model->get_services_shortcuts(); ?>
      </div>
      <h4>Detalles de servicio</h4>

      <div class="row">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Mensualidad</span>
            <input type="text" class="form-control" id="contract-client-payment" tabindex="7">
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Meses</span>
            <input type="number" class="form-control" id="contract-client-months" tabindex="7">
          </div>
        </div>
      </div>
      
      <div class="col-md-8 without">
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1">Fecha</span>
          <input type="date" class="form-control" id="contract-client-date" tabindex="7">
        </div>
      </div>
     
      
  </div>
  </form>


  <div class="col-md-6 ">
    <div class="centered-container">
      <div class="note-item note">
        <div class="preview"> 
          <div class="falseDoc"></div>
        </div>
      </div>

      <div class="row-container">
        <button class="btn">Guardar</button>
        <button class="btn">Imprimir</button>
      </div>
    </div>
    
  </div>
<script>
  makeLines()
  
  function makeLines(){
    var lineas = " "
  
  for(var i = 1; i < 10; i++){
    lineas += `<div class="lineas num${i}"><span></span></div>`
  }
  $(".falseDoc").html(lineas) 
  }
</script>

</div>