<div class="screen clients row">
  <div class="left-navigation col-md-2">
    <ul class="aside-nav">
      <li class="aside-buttons">
        <a href="" data-toggle="modal" data-target="#new-client-modal"><i class="material-icons">chevron_left</i> Atras</a>
      </li>
    </ul>

  </div>
  <?php 
    $client_data = get_client_data();
    $nombre_completo = $client_data['nombres']." ".$client_data['apellidos'];
    $iniciales =  $client_data['nombres'][0].$client_data['apellidos'][0];
  
  
  ?>
  <div class="main-content col-md-10">
    
    <div class="row">
      <div class="col-xs-6 col-md-3">
        <div class="page-header">
          <h3>Detalles del Cliente <small><?php echo $nombre_completo ?></small></h3>
        </div>

        <div class="client-profile">
          <span><?php echo $iniciales ?></span>
        </div>
        <p><i class="material-icons">timeline</i><?php echo $client_data['estado'] ?></p>
        
      </div>
      <div class="col-md-9">
        <div>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Personales</a></li>
            <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Contrato</a></li>
            <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Pagos</a></li>
            <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Observaciones</a></li>
          </ul>
        
          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="home">
              <form action="" class="watch-in-detail">
                <div class="row">
                    <div class="form-group padding">
                      <label for="client-name">ID</label>
                      <input type="text" class="form-control small-id" value="<?php echo $client_data['id_cliente'] ?>" disabled>
                    </div>
                  <div class="col-md-6">
                    
                    <div class="form-group">
                      <label for="client-name">Nombre Completo</label>
                      <input type="text" class="form-control"  value="<?php echo $nombre_completo; ?>" disabled>
                    </div>
                    <div class="form-group">
                      <label for="client-name">Fecha de Registro</label>
                      <input type="text" class="form-control" value="<?php  echo $client_data['fecha_registro']?>" disabled>
                    </div>
                    <h4 class="placeholder"> ...</h4>
                    <h4>Dirección</h4>
                    <div class="form-group">
                      <label for="client-provincia">Provincia</label>
                      <input type="text" class="form-control" value="<?php  echo $client_data['provincia']?>"disabled>
                    

                    </div>
                    <div class="form-group">
                      <label for="cient-sector">Sector</label>
                      <input class="form-control"  value="<?php  echo $client_data['sector']?>"disabled="6">
                    </div>
                    <div class="form-group">
                      <label for="client-telephone">Telefono</label>
                      <input type="tel" class="form-control" value="<?php  echo $client_data['telefono']?>"  disabled>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="client-dni">Cedula</label>
                      <input type="text" class="form-control" value="<?php  echo $client_data['cedula']?>"disabled>
                    </div>
                    <div class="form-group">
                      <label for="client-phone">Celular</label>
                      <input type="text" class="form-control" value="<?php  echo $client_data['celular']?>" disabled>
                    </div>
                    <h4 class="placeholder"> ...</h4>
                    <h4 class="placeholder"> ...</h4>
                    <div class="form-group">
                      <label for="client-street">Calle</label>
                      <input type="text" class="form-control" value="<?php  echo $client_data['calle']?>" disabled>
                    </div>

                    <div class="form-group">
                      <label for="client-house">Casa #</label>
                      <input type="text" class="form-control" value="<?php  echo $client_data['casa']?>" disabled>
                    </div>
                  </div>
                </div>
              </form>
            
            
            </div>


            <!---->
            <div role="tabpanel" class="tab-pane" id="profile">...</div>
            <div role="tabpanel" class="tab-pane" id="messages">...</div>
            <div role="tabpanel" class="tab-pane" id="settings">...</div>
          </div>

        </div>
      
      </div>
    </div>


  </div>


</div>