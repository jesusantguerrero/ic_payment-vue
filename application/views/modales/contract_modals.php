<?php 
  $settings = $this->settings_model->get_settings();
 ?>
<!--*********************************************************************
*
*                                 Extra modal
*
**************************************************************************-->
<div class="modal fade" tabindex="-1" role="dialog" id="add-extra-modal">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Servicio Extra</h4>
      </div>
      <div class="modal-body">
        <div>
          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#extra-contract" aria-controls="Guardar" role="tab" data-toggle="tab">Contrato</a></li>
            <li role="presentation"><a href="#extra-service" aria-controls="guardar" role="tab" data-toggle="tab">Servicio</a></li>
            <li role="presentation"><a href="#extra-extension" aria-controls="extender" role="tab" data-toggle="tab">Extender Contrato</a></li>
            <li role="presentation"><a href="#extra-upgrade" aria-controls="Mejorar" role="tab" data-toggle="tab">Mejorar Contrato</a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active fade in" id="extra-contract">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Datos Del Contrato</h4>
                    <div class="form-group">
                      <label for="client-name">Cedula</label>
                      <input type="text" class="form-control" id="extra-client-dni" tabindex="1">
                    </div>
                    <div class="form-group">
                      <label for="client-dni">Cliente</label>
                      <input type="text" class="form-control" id="extra-client-name" tabindex="3" disabled>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h4 class="placeholder">... </h4>
                    <div class="form-group">
                      <label for="client-lastname">Codigo del contrato</label>
                      <select type="text" class="form-control" id="extra-client-contract" tabindex="2">
                        <option value="">--Selecciona--</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="client-phone">Servicio</label>
                      <input type="text" class="form-control" id="extra-contract-service" tabindex="4" disabled>
                    </div>

                  </div>
                </div>
              </form>
            </div>

            <!--Direction pane-->
            <div role="tabpanel" class="tab-pane fade in" id="extra-service">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Dirección</h4>
                    <div class="form-group">
                      <label for="client-provincia">Servicio</label>               
                      <select class="form-control" id="select-extra-service">
                        <option value="">--Seleccione--</option>
                        <?php $this->service_model->get_services_dropdown(); ?>
                      </select>
                    </div>
                     <div class="form-group">
                      <label for="cient-sector">Equipo</label>
                      <input class="form-control" id="extra-equipo" tabindex="6">
                    </div>
                    <div class="form-group">
                      <label for="cient-sector">Router</label>
                      <input class="form-control" id="extra-router" tabindex="6">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h4 class="placeholder"> ...</h4>
                    <div class="form-group">
                      <label for="client-street">Costo</label>
                      <input type="text" class="form-control" id="extra-service-cost" tabindex="6">
                    </div>

                    <div class="form-group">
                      <label for="client-house">Mac</label>
                      <input type="text" class="form-control" id="extra-e-mac" tabindex="7">
                    </div>
                    <div class="form-group">
                      <label for="client-house">Mac</label>
                      <input type="text" class="form-control" id="extra-r-mac" tabindex="7">
                    </div>
                  </div>
                </div>
              </form>

            </div>
            <!--end of direction pane-->

            <div role="tabpanel" class="tab-pane fade in" id="extra-extension">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="client-job">Meses de extension</label>
                      <input type="number" class="form-control" id="extra-extension-months" value="<?php echo $settings['meses_por_defecto'] ?>">
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <!-- end of pane -->
            <div role="tabpanel" class="tab-pane fade in" id="extra-upgrade">
              
              <h4>Seleccione Plan: </h4>
              <div class="row shortcuts-container for-services">
                <?php $this->service_model->get_services_shortcuts(); ?>
              </div>
              
                
            </div>
            <!-- end of pane-->

          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal" tabindex="9">Cancelar</button>
        <button type="button" class="btn save dynamic-controls" id="extra-controls" tabindex="10">Guardar<button/>       
      </div>
      
      

    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<!--*********************************************************************
*
*                                 Cancel Contract Modal
*
**************************************************************************-->
<div class="modal fade" tabindex="-1" role="dialog" id="cancel-contract-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Estas seguro?</h4>
      </div>
        
        <div class="alert alert-danger">
          <strong>Por favor!</strong> Leer esto
        </div>
        
      <div class="modal-body">
        <p>Esta accion no tiene marcha atras si cancelas el contrato se tendra que crear otro en caso de que sea una equivocació
        asi que asegurate de que realmente quieres cancelar el contrato de <b class="cancel-name">Contrato</b></p>

        <p>Para asegurarnos, escribe el nombre del cliente</p>
        
        <div class="form-group">
          <input type="text" class="form-control confirmed-data" id="" placeholder="nombre del cliente">
        </div>
        
        
        
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn save" id="cancel-permanently" tabindex="10" disabled>Cancelar Contrato<button/>       
      </div>
      
      

    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<!--*********************************************************************
*
*                                 Extra modal
*
**************************************************************************-->
<div class="modal fade" tabindex="-1" role="dialog" id="update-contract-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Editar Contrato</h4>
      </div>
      <div class="modal-body">
        <form action="">
          <div class="row">
            <div class="col-md-6">
                     <div class="form-group">
                      <label for="cient-sector">Equipo</label>
                      <input class="form-control" id="u-contract-equipment" tabindex="1">
                    </div>
                    <div class="form-group">
                      <label for="cient-sector">Modelo</label>
                      <input class="form-control" id="u-contract-modelo" tabindex="3">
                    </div>
                    <div class="form-group">
                      <label for="cient-sector">Router</label>
                      <input class="form-control" id="u-contract-router" tabindex="5">
                    </div>
            </div>
            <div class="col-md-6">
                    <div class="form-group">
                      <label for="client-house">Mac del Equipo</label>
                      <input type="text" class="form-control" id="u-contract-e-mac" tabindex="2">
                    </div>
                    <div class="form-group">
                      <label for="cient-sector">IP</label>
                      <input class="form-control" id="u-contract-ip" tabindex="4">
                    </div>
                    <div class="form-group">
                      <label for="client-house">Mac del Router</label>
                      <input type="text" class="form-control" id="u-contract-r-mac" tabindex="6">
                    </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal" tabindex="8">Cancelar</button>
        <button type="button" class="btn save dynamic-controls" id="update-contract" tabindex="7">Guardar<button/>       
      </div>
      
      

    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
