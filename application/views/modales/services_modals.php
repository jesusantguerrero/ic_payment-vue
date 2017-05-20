<!--*********************************************************************
*
*                                New Service Modal
*
**************************************************************************-->

<div class="modal fade" tabindex="-1" role="dialog" id="new-service-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Agregar Servicio</h4>
      </div>
      <div class="modal-body">

        <form action="">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="user-nickname">Nombre del Servicio</label>
                <input type="text" class="form-control" id="service-name"  >
              </div>
              <div class="form-group">
                <label for="user-password">Descripción</label>
                <textarea  class="form-control "cols="30" rows="5"  id="service-description" >
               </textarea>
              </div>
          
              <div class="form-group">
                <label for="user-password-confirm">Mensualidad</label>
                <input type="number" class="form-control " id="service-monthly-payment" >
              </div>
              <div class="form-group">
                <label for="user-type">Tipo de Servicio</label>
                <select class="form-control" id="service-type">
                <option value="internet">Internet</option>
                <option value="reparacion">Reparación</option>
              </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn save" id="btn-save-service">Guardar</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->


<!--*********************************************************************
*
*                                 Update User Modal
*
**************************************************************************-->


<div class="modal fade" tabindex="-1" role="dialog" id="update-service-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Editar Servicio</h4>
      </div>
      <div class="modal-body">

        <form action="">
          <div class="row">
            <div class="col-md-12">
            <div class="form-group">
                <label for="user-nickname">ID</label>
                <input type="text" class="form-control" id="u-service-id" disabled>
              </div>
              <div class="form-group">
                <label for="user-nickname">Nombre del Servicio</label>
                <input type="text" class="form-control" id="u-service-name"  >
              </div>
              <div class="form-group">
                <label for="user-password">Descripción</label>
                <textarea  class="form-control "cols="30" rows="5"  id="u-service-description" >
               </textarea>
              </div>
          
              <div class="form-group">
                <label for="user-password-confirm">Mensualidad</label>
                <input type="number" class="form-control " id="u-service-monthly-payment" >
              </div>
              <div class="form-group">
                <label for="user-type">Tipo de Servicio</label>
                <select class="form-control" id="u-service-type">
                <option value="internet">Internet</option>
                <option value="reparacion">Reparación</option>
              </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn save" id="btn-update-service">Guardar</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->