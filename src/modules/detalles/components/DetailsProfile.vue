<template>
  <form action="" class="watch-in-detail special">
    <div class="row">


      <div class="col-md-6">
        <div class="input-group col-md-4">
          <span class="input-group-addon" id="addon">ID</span>
          <input type="text" id="detail-client-id" class="form-control small-id" value="<?php echo $client_data['id_cliente'] ?>" disabled>
        </div>
        <div class="input-group">
          <span class="input-group-addon" id="addon">Nombre</span>
          <input type="text" class="form-control" id="detail-client-name" value="<?php echo $nombre_completo; ?>" disabled>
        </div>

        <div class="input-group">
          <span class="input-group-addon" id="addon">Fecha de Registro</span>
          <input type="text" class="form-control" value="<?php  echo $client_data['fecha_registro']?>" disabled>
        </div>
        <h4 class="placeholder"> ...</h4>
        <h4>Dirección</h4>
        <div class="input-group">
          <span class="input-group-addon" id="addon">Provincia</span>
          <input type="text" class="form-control" value="<?php  echo $client_data['provincia']?>" disabled>


        </div>
        <div class="input-group">
          <span class="input-group-addon" id="addon">Sector</span>
          <input class="form-control" value="<?php  echo $client_data['sector']?>" disabled="6">
        </div>
        <div class="input-group">
          <span class="input-group-addon" id="addon">Telefono</span>
          <input type="tel" class="form-control" value="<?php  echo phone_format($client_data['telefono'])?>" disabled>
        </div>
      </div>

      <div class="col-md-6">
        <h4 class="placeholder-lg"> ...</h4>
        <div class="input-group">
          <span class="input-group-addon" id="addon">Cedula</span>
          <input type="text" class="form-control" value="<?php  echo dni_format($client_data['cedula'])?>" disabled>
        </div>
        <div class="input-group">
          <span class="input-group-addon" id="addon">Celular</span>
          <input type="tel" class="form-control" value="<?php  echo phone_format($client_data['celular'])?>" disabled>
        </div>
        <h4 class="placeholder"> ...</h4>
        <h4 class="placeholder"> ...</h4>
        <div class="input-group">
          <span class="input-group-addon" id="addon">Calle</span>
          <input type="text" class="form-control" value="<?php  echo $client_data['calle']?>" disabled>
        </div>

        <div class="input-group">
          <span class="input-group-addon" id="addon">Casa #</span>
          <input type="text" class="form-control" value="<?php  echo $client_data['casa']?>" disabled>
        </div>
      </div>
    </div>
  </form>
</template>
